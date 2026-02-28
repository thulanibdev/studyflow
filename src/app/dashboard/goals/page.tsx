'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function GoalsPage() {
  const supabase = createClient()
  const [goals, setGoals] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('This Month')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) { setUserId(user.id); loadGoals(user.id) }
    })
  }, [])

  async function loadGoals(uid: string) {
    const { data } = await supabase.from('goals').select('*').eq('user_id', uid).order('created_at', { ascending: false })
    setGoals(data || [])
    setLoading(false)
  }

  async function addGoal() {
    if (!title.trim() || !userId) { toast.error('Enter a goal'); return }
    const { data } = await supabase.from('goals').insert({ user_id: userId, title: title.trim(), deadline, done: false }).select().single()
    setGoals(prev => [data, ...prev])
    setTitle('')
    toast.success('Goal added! 🎯')
  }

  async function toggleGoal(id: string, done: boolean) {
    await supabase.from('goals').update({ done: !done }).eq('id', id)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !done } : g))
    if (!done) toast.success('Goal crushed! 🔥')
  }

  async function deleteGoal(id: string) {
    await supabase.from('goals').delete().eq('id', id)
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  const active = goals.filter(g => !g.done)
  const done = goals.filter(g => g.done)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Goals
        </h1>
        <p className="text-[#6e6e9a] text-sm mt-1">Set targets. Track them. Crush them.</p>
      </motion.div>

      {/* Add goal */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="card p-5">
        <div className="flex gap-3 flex-wrap">
          <input className="input flex-1 min-w-[200px]" placeholder="e.g. Score 80% in Maths exam..." value={title}
            onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGoal()} />
          <select className="input w-36" value={deadline} onChange={e => setDeadline(e.target.value)}>
            {['Today', 'This Week', 'This Month', 'This Term'].map(d => <option key={d}>{d}</option>)}
          </select>
          <button onClick={addGoal} className="btn-primary flex items-center gap-2 px-5">
            <Plus className="w-4 h-4" /> Add Goal
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Active */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Active Goals</h3>
            <span className="badge badge-purple">{active.length}</span>
          </div>
          {loading ? <div className="text-xs text-[#333355] italic">Loading...</div> :
            active.length === 0 ? <div className="text-xs text-[#333355] italic py-4 text-center">No active goals yet.</div> :
              <div className="space-y-2">
                {active.map(g => (
                  <div key={g.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                    style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                    <button onClick={() => toggleGoal(g.id, g.done)} className="mt-0.5 text-[#333355] hover:text-[#a78bfa] transition-colors shrink-0">
                      <Circle className="w-4 h-4" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-snug">{g.title}</div>
                      <div className="text-xs text-[#333355] mt-0.5 font-semibold">{g.deadline}</div>
                    </div>
                    <button onClick={() => deleteGoal(g.id)} className="text-[#333355] hover:text-[#f87171] transition-colors shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
          }
        </motion.div>

        {/* Completed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Completed</h3>
            <span className="badge badge-green">{done.length}</span>
          </div>
          {done.length === 0 ? <div className="text-xs text-[#333355] italic py-4 text-center">Completed goals appear here.</div> :
            <div className="space-y-2">
              {done.map(g => (
                <div key={g.id} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: '#161622', border: '1px solid #1a1a28', opacity: 0.6 }}>
                  <button onClick={() => toggleGoal(g.id, g.done)} className="mt-0.5 text-[#4ade80] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-through text-[#333355] leading-snug">{g.title}</div>
                    <div className="text-xs text-[#333355] mt-0.5">{g.deadline}</div>
                  </div>
                  <button onClick={() => deleteGoal(g.id)} className="text-[#333355] hover:text-[#f87171] transition-colors shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          }
        </motion.div>
      </div>
    </div>
  )
}
