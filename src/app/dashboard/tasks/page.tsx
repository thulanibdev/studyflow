// Tasks page
'use client'
import { motion } from 'framer-motion'
export default function TasksPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Task Board
        </h1>
        <p className="text-[#6e6e9a] text-sm mt-1 mb-8">Manage your assignments and deadlines.</p>
        <div className="card p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <p className="text-[#6e6e9a] text-sm">Full Kanban board — coming in the next sprint.</p>
          <p className="text-xs text-[#333355] mt-1">Track tasks by subject, priority and due date.</p>
        </div>
      </motion.div>
    </div>
  )
}
