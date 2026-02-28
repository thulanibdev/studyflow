'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Bot, User, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  'Explain Newton\'s Laws of Motion simply',
  'Create a 1-week study plan for my exams',
  'What\'s the best way to memorise information?',
  'Summarise the causes of World War 2',
]

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const history = newMessages.slice(-10).map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'chat', message: msg, history: history.slice(0, -1) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err: any) {
      toast.error('Failed to get response')
      setMessages(prev => prev.slice(0, -1))
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Assistant
          </h1>
          <p className="text-[#6e6e9a] text-sm mt-0.5">Ask anything. Powered by Claude.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
              <Sparkles className="w-7 h-7 text-[#a78bfa]" />
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-1">StudyFlow AI</h3>
              <p className="text-sm text-[#6e6e9a]">Ask me anything about your studies.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {STARTERS.map(s => (
                <button key={s} onClick={() => send(s)}
                  className="text-left p-3 rounded-xl text-xs text-[#6e6e9a] transition-all hover:text-[#f0f0ff]"
                  style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'assistant' ? '' : ''}`}
                  style={{ background: m.role === 'assistant' ? 'rgba(167,139,250,0.12)' : 'linear-gradient(135deg,#a78bfa,#7c3aed)', border: m.role === 'assistant' ? '1px solid rgba(167,139,250,0.2)' : 'none' }}>
                  {m.role === 'assistant' ? <Bot className="w-3.5 h-3.5 text-[#a78bfa]" /> : <User className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed`}
                  style={{ background: m.role === 'assistant' ? '#161622' : 'rgba(167,139,250,0.1)', border: `1px solid ${m.role === 'assistant' ? '#1a1a28' : 'rgba(167,139,250,0.15)'}`, color: '#f0f0ff', whiteSpace: 'pre-wrap' }}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.2)' }}>
                  <Bot className="w-3.5 h-3.5 text-[#a78bfa]" />
                </div>
                <div className="px-4 py-3 rounded-2xl flex items-center gap-2" style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#a78bfa', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-3 border-t" style={{ borderColor: '#1a1a28' }}>
        <div className="flex gap-3">
          <input className="input flex-1" placeholder="Ask anything about your studies..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            className="btn-primary px-4 py-2.5 flex items-center gap-2 disabled:opacity-40">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-[#333355] mt-2 text-center">Powered by Claude claude-sonnet-4-20250514</p>
      </div>
    </div>
  )
}
