'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ProgressPage() {
  const supabase = createClient()
  const [sessions, setSessions] = useState<any[]>([])
  const [goals, setGoals] = useState<any[]>([])
  const [subject, setSubject] = useState('')
  const [mins, setMins] = useState('')
  const [quality, setQuality] = useState('3')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id)
        Promise.all([
          supabase.from('study_sessions').select('*').eq('user_id', user.id).order('studied_at', { ascending: false }).limit(50),
          supabase.from('goals').select('*').eq('user_id', user.id)
        ]).then(([sessRes, goalRes]) => {
          setSessions(sessRes.data || [])
          setGoals(goalRes.data || [])
        })
      }
    })
  }, [])

  async function logSession() {
    if (!subject.trim() || !mins || !userId) { toast.error('Fill in subject and duration'); return }
    const { data } = await supabase.from('study_sessions')
      .insert({ user_id: userId, subject: subject.trim(), duration_mins: parseInt(mins), quality: parseInt(quality) })
      .select().single()
    setSessions(prev => [data, ...prev])
    setSubject(''); setMins('')
    toast.success(`${mins}m of ${subject} logged! 📊`)
  }

  const totalMins = sessions.reduce((a, s) => a + s.duration_mins, 0)
  const totalHours = (totalMins / 60).toFixed(1)
  const streak = Math.min(sessions.length, 30)
  const goalsHit = goals.filter(g => g.done).length

  const stats = [
    { label: 'Hours', value: totalHours, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
    { label: 'Streak 🔥', value: streak, color: '#4ade80', bg: 'rgba(74,222,128,0.06)' },
    { label: 'Sessions', value: sessions.length, color: '#22d3ee', bg: 'rgba(34,211,238,0.06)' },
    { label: 'Goals Hit', value: goalsHit, color: '#f472b6', bg: 'rgba(244,114,182,0.06)' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Progress
        </h1>
        <p className="text-[#6e6e9a] text-sm mt-1">Track every session. Watch your consistency compound.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="card p-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${s.bg}, transparent 70%)` }} />
            <div className="relative text-3xl font-black mb-1" style={{ fontFamily: 'Syne, sans-serif', color: s.color }}>{s.value}</div>
            <div className="relative text-xs text-[#333355] font-bold uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Weekly bars */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355] mb-4">Weekly Activity</h3>
          <div className="space-y-3">
            {DAYS.map((day, i) => {
              const s = sessions[i]
              const pct = s ? Math.min(100, Math.round(s.duration_mins / 120 * 100)) : 0
              const col = pct > 66 ? '#4ade80' : pct > 33 ? '#a78bfa' : '#1a1a28'
              return (
                <div key={day} className="flex items-center gap-3">
                  <div className="w-8 text-xs text-[#333355] font-bold">{day}</div>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#161622' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: col }} />
                  </div>
                  <div className="w-8 text-right text-xs text-[#333355]">{pct}%</div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Log session */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355] mb-4">Log Session</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Subject</label>
              <input className="input" placeholder="e.g. Mathematics" value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Duration (mins)</label>
                <input className="input" type="number" placeholder="45" min="1" value={mins} onChange={e => setMins(e.target.value)} />
              </div>
              <div>
                <label className="label">Quality</label>
                <select className="input" value={quality} onChange={e => setQuality(e.target.value)}>
                  <option value="1">⭐ Poor</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="4">⭐⭐⭐⭐ Great</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                </select>
              </div>
            </div>
            <button onClick={logSession} className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Log Session
            </button>
          </div>

          {/* Recent */}
          <div className="mt-4 space-y-2 max-h-44 overflow-y-auto">
            {sessions.slice(0, 10).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg text-xs" style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                <span className="flex-1 font-medium truncate">{s.subject}</span>
                <span className="font-mono font-bold text-[#a78bfa]">{s.duration_mins}m</span>
                <span>{'⭐'.repeat(s.quality)}</span>
                <span className="text-[#333355]">{new Date(s.studied_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
