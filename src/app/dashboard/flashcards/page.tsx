'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Plus, ChevronLeft, ChevronRight, RotateCcw, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function FlashcardsPage() {
  const supabase = createClient()
  const [decks, setDecks] = useState<any[]>([])
  const [cards, setCards] = useState<any[]>([])
  const [selectedDeck, setSelectedDeck] = useState<any>(null)
  const [deckCards, setDeckCards] = useState<any[]>([])
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [aiTopic, setAiTopic] = useState('')
  const [aiCount, setAiCount] = useState(8)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState('')
  const [newDeck, setNewDeck] = useState('')
  const [newFront, setNewFront] = useState('')
  const [newBack, setNewBack] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) { setUserId(user.id); loadDecks(user.id) }
    })
  }, [])

  async function loadDecks(uid: string) {
    const { data } = await supabase.from('flashcard_decks').select('*, flashcards(count)').eq('user_id', uid).order('created_at', { ascending: false })
    setDecks(data || [])
  }

  async function selectDeck(deck: any) {
    setSelectedDeck(deck)
    const { data } = await supabase.from('flashcards').select('*').eq('deck_id', deck.id)
    setDeckCards(data || [])
    setCardIdx(0); setFlipped(false)
  }

  async function addCard() {
    if (!newDeck || !newFront || !newBack) { toast.error('Fill all fields'); return }
    if (!userId) return
    let deckId: string
    const existing = decks.find(d => d.name === newDeck)
    if (existing) {
      deckId = existing.id
    } else {
      const { data } = await supabase.from('flashcard_decks').insert({ name: newDeck, user_id: userId }).select().single()
      deckId = data.id
    }
    await supabase.from('flashcards').insert({ deck_id: deckId, user_id: userId, front: newFront, back: newBack })
    setNewFront(''); setNewBack('')
    loadDecks(userId)
    if (selectedDeck?.name === newDeck) selectDeck(selectedDeck)
    toast.success('Card added!')
  }

  async function aiGenerate() {
    if (!aiTopic.trim()) { toast.error('Enter a topic'); return }
    if (!userId) return
    setAiLoading(true)
    setAiStatus(`🤖 Claude is generating ${aiCount} flashcards for "${aiTopic}"...`)
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'flashcards', topic: aiTopic, count: aiCount }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const { data: deckData } = await supabase.from('flashcard_decks').insert({ name: aiTopic.length > 40 ? aiTopic.slice(0, 40) + '...' : aiTopic, user_id: userId, ai_generated: true }).select().single()
      const inserts = data.cards.map((c: any) => ({ deck_id: deckData.id, user_id: userId, front: c.front, back: c.back }))
      await supabase.from('flashcards').insert(inserts)
      setAiStatus(`✅ ${data.cards.length} flashcards created! Select the deck below to study.`)
      setAiTopic('')
      loadDecks(userId)
      toast.success(`${data.cards.length} AI cards ready!`)
    } catch (err: any) {
      setAiStatus(`❌ Failed: ${err.message}`)
      toast.error('Generation failed')
    }
    setAiLoading(false)
  }

  async function deleteDeck(deckId: string) {
    if (!confirm('Delete this deck and all cards?')) return
    await supabase.from('flashcard_decks').delete().eq('id', deckId)
    if (selectedDeck?.id === deckId) { setSelectedDeck(null); setDeckCards([]) }
    loadDecks(userId!)
    toast.success('Deck deleted')
  }

  const currentCard = deckCards[cardIdx]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Flashcards
        </h1>
        <p className="text-[#6e6e9a] text-sm mt-1">Build decks manually or generate with AI instantly.</p>
      </motion.div>

      {/* AI Generate */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="card p-6" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'linear-gradient(135deg, #111119, rgba(167,139,250,0.03))' }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#a78bfa]" />
          <span className="font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>AI Generate</span>
          <span className="badge badge-purple text-[10px]">Claude AI</span>
        </div>
        <p className="text-xs text-[#6e6e9a] mb-4">Type any topic and Claude will build a study-ready deck in seconds.</p>
        <div className="flex gap-3 flex-wrap">
          <input className="input flex-1 min-w-[200px]" placeholder="e.g. Photosynthesis, Newton's Laws..." value={aiTopic} onChange={e => setAiTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && aiGenerate()} />
          <select className="input w-28" value={aiCount} onChange={e => setAiCount(+e.target.value)}>
            {[5, 8, 10, 15].map(n => <option key={n} value={n}>{n} cards</option>)}
          </select>
          <button onClick={aiGenerate} disabled={aiLoading} className="btn-primary flex items-center gap-2 px-5">
            <Sparkles className="w-3.5 h-3.5" />
            {aiLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {aiStatus && (
          <div className="mt-3 text-xs p-3 rounded-lg" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.12)', color: '#6e6e9a' }}>
            {aiStatus}
          </div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Create manually */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355] mb-4">Create Manually</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Deck Name</label>
              <input className="input" placeholder="e.g. Biology Chapter 3" value={newDeck} onChange={e => setNewDeck(e.target.value)} />
            </div>
            <div>
              <label className="label">Question (Front)</label>
              <textarea className="input resize-none" rows={2} placeholder="What is photosynthesis?" value={newFront} onChange={e => setNewFront(e.target.value)} />
            </div>
            <div>
              <label className="label">Answer (Back)</label>
              <textarea className="input resize-none" rows={2} placeholder="The process plants use to convert sunlight..." value={newBack} onChange={e => setNewBack(e.target.value)} />
            </div>
            <button onClick={addCard} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
        </motion.div>

        {/* Study mode */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Study Mode</h3>
            <select className="input w-44 text-xs py-1.5" onChange={e => { const d = decks.find(d => d.id === e.target.value); if (d) selectDeck(d) }}>
              <option value="">Choose deck...</option>
              {decks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div className="text-center">
            <div className="text-xs text-[#333355] mb-3 font-mono">
              {deckCards.length ? `${cardIdx + 1} / ${deckCards.length}` : '0 / 0'}
            </div>
            <div onClick={() => setFlipped(!flipped)} className="min-h-36 rounded-2xl flex items-center justify-center p-5 cursor-pointer text-sm font-medium text-center leading-relaxed transition-all duration-200"
              style={{
                background: flipped ? 'linear-gradient(135deg,#a78bfa,#7c3aed)' : '#161622',
                border: `1.5px solid ${flipped ? '#a78bfa' : '#232338'}`,
                boxShadow: flipped ? '0 0 24px rgba(167,139,250,0.2)' : 'none',
                color: flipped ? '#fff' : deckCards.length ? '#f0f0ff' : '#333355',
              }}>
              {currentCard ? (flipped ? currentCard.back : currentCard.front) : (selectedDeck ? 'No cards in this deck' : 'Select a deck above')}
            </div>
            <p className="text-xs text-[#333355] mt-2 mb-4">{currentCard ? (flipped ? 'Click to see question' : 'Click to reveal answer') : ''}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setCardIdx((cardIdx - 1 + deckCards.length) % deckCards.length); setFlipped(false) }} className="btn-ghost text-xs px-4 py-2 flex items-center gap-1.5"><ChevronLeft className="w-3.5 h-3.5" /> Prev</button>
              <button onClick={() => { setFlipped(false); setCardIdx(0) }} className="btn-ghost text-xs px-3 py-2"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setCardIdx((cardIdx + 1) % deckCards.length); setFlipped(false) }} className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">Next <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decks list */}
      {decks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355] mb-4">My Decks</h3>
          <div className="flex flex-wrap gap-2">
            {decks.map(d => (
              <div key={d.id} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer transition-all"
                style={{ background: selectedDeck?.id === d.id ? 'rgba(167,139,250,0.12)' : '#161622', border: `1px solid ${selectedDeck?.id === d.id ? 'rgba(167,139,250,0.25)' : '#1a1a28'}`, color: selectedDeck?.id === d.id ? '#a78bfa' : '#6e6e9a' }}
                onClick={() => selectDeck(d)}>
                <span>🃏</span>
                <span className="font-medium">{d.name}</span>
                {d.ai_generated && <span className="badge badge-purple text-[9px]">AI</span>}
                <button onClick={e => { e.stopPropagation(); deleteDeck(d.id) }} className="text-[#333355] hover:text-[#f87171] transition-colors ml-1">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
