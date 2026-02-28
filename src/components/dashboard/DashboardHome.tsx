'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, Clock, Target, TrendingUp, Brain, Zap, ChevronRight } from 'lucide-react'
import { getGreeting } from '@/lib/utils'

interface Props {
  user: any
  profile: any
  goals: any[]
  sessions: any[]
  tasks: any[]
}

export default function DashboardHome({ user, profile, goals, sessions, tasks }: Props) {
  const name = profile?.full_name || user?.email?.split('@')[0] || 'Student'
  const firstName = name.split(' ')[0]

  const totalMins = sessions.reduce((a: number, s: any) => a + s.duration_mins, 0)
  const totalHours = (totalMins / 60).toFixed(1)
  const streak = Math.min(sessions.length, 30)
  const goalsHit = goals.filter(g => g.done).length
  const pendingTasks = tasks.filter(t => t.status !== 'done').length

  const stats = [
    { label: 'Hours Studied', value: totalHours, color: '#a78bfa', glow: 'rgba(167,139,250,0.08)' },
    { label: 'Day Streak 🔥', value: streak, color: '#4ade80', glow: 'rgba(74,222,128,0.06)' },
    { label: 'Goals Hit', value: goalsHit, color: '#22d3ee', glow: 'rgba(34,211,238,0.06)' },
    { label: 'Pending Tasks', value: pendingTasks, color: '#f472b6', glow: 'rgba(244,114,182,0.06)' },
  ]

  const quickActions = [
    { icon: Brain, label: 'AI Flashcards', desc: 'Generate with Claude AI', href: '/dashboard/flashcards', color: '#a78bfa' },
    { icon: Target, label: 'Add Goal', desc: 'Set a new target', href: '/dashboard/goals', color: '#22d3ee' },
    { icon: Zap, label: 'Start Session', desc: 'Log study time', href: '/dashboard/progress', color: '#4ade80' },
    { icon: CheckCircle2, label: 'Add Task', desc: 'Track your work', href: '/dashboard/tasks', color: '#f472b6' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ── Greeting ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-black tracking-tight mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
          <span style={{ background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {getGreeting(firstName)}
          </span>
        </h1>
        <p className="text-[#6e6e9a] text-sm">
          {sessions.length === 0
            ? "Let's get started — log your first study session today."
            : `You've studied ${totalHours} hours total. Keep building that momentum!`}
        </p>
      </motion.div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card p-5 text-center"
            style={{ '--glow-bg': s.glow } as React.CSSProperties}>
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${s.glow}, transparent 70%)` }} />
            <div className="relative text-3xl font-black mb-1" style={{ fontFamily: 'Syne, sans-serif', color: s.color }}>
              {s.value}
            </div>
            <div className="relative text-xs text-[#333355] font-bold uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#333355] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((a, i) => (
            <Link key={a.label} href={a.href}
              className="card p-4 flex flex-col gap-3 cursor-pointer group hover:border-[#232338]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${a.color}18`, border: `1px solid ${a.color}28` }}>
                <a.icon className="w-4 h-4" style={{ color: a.color }} />
              </div>
              <div>
                <div className="text-sm font-semibold mb-0.5">{a.label}</div>
                <div className="text-xs text-[#333355]">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Two-column: Tasks + Goals ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Recent tasks */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Recent Tasks</h3>
            <Link href="/dashboard/tasks" className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] font-semibold flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {tasks.length === 0 ? (
            <div className="text-xs text-[#333355] italic py-4 text-center">No tasks yet. <Link href="/dashboard/tasks" className="text-[#a78bfa]">Add one →</Link></div>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${task.status === 'done' ? 'bg-[#4ade80]' : task.priority === 'high' ? 'bg-[#f87171]' : task.priority === 'medium' ? 'bg-[#fbbf24]' : 'bg-[#333355]'}`} />
                  <span className={`flex-1 text-sm truncate ${task.status === 'done' ? 'line-through text-[#333355]' : ''}`}>{task.title}</span>
                  {task.subject && <span className="text-xs text-[#333355] shrink-0">{task.subject}</span>}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Goals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Active Goals</h3>
            <Link href="/dashboard/goals" className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] font-semibold flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {goals.filter(g => !g.done).length === 0 ? (
            <div className="text-xs text-[#333355] italic py-4 text-center">No active goals. <Link href="/dashboard/goals" className="text-[#a78bfa]">Set one →</Link></div>
          ) : (
            <div className="space-y-2">
              {goals.filter(g => !g.done).slice(0, 5).map(goal => (
                <div key={goal.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                  <div className="w-2 h-2 rounded-full shrink-0 bg-[#a78bfa]" />
                  <span className="flex-1 text-sm truncate">{goal.title}</span>
                  <span className="text-xs text-[#333355] shrink-0">{goal.deadline}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Recent sessions ── */}
      {sessions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
          className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#333355]">Recent Sessions</h3>
            <Link href="/dashboard/progress" className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] font-semibold flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {sessions.slice(0, 4).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: '#161622', border: '1px solid #1a1a28' }}>
                <Clock className="w-3.5 h-3.5 text-[#333355] shrink-0" />
                <span className="flex-1 text-sm font-medium">{s.subject}</span>
                <span className="text-xs text-[#a78bfa] font-bold font-mono">{s.duration_mins}m</span>
                <span className="text-xs text-[#333355]">{'⭐'.repeat(s.quality)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
