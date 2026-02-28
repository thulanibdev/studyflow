'use client'
import { motion } from "framer-motion"
export default function Page() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ fontFamily: "Syne, sans-serif", background: "linear-gradient(135deg, #f0f0ff 0%, #a78bfa 55%, #22d3ee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Coming Soon
        </h1>
        <p className="text-sm text-[#6e6e9a] mt-1 mb-8">This module is actively being built.</p>
        <div className="card p-10 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="font-bold text-lg mb-2">Feature in Progress</h3>
          <p className="text-[#6e6e9a] text-sm max-w-xs mx-auto">Check back in the next update. Building fast!</p>
        </div>
      </motion.div>
    </div>
  )
}
