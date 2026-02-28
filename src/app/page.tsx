'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles, BookOpen, Target, BarChart3, Brain,
  ChevronRight, CheckCircle2, Zap, Shield, Users
} from 'lucide-react'

const features = [
  {
    icon: <Brain className="w-5 h-5" />,
    title: 'AI Flashcard Generator',
    desc: 'Type any topic. Claude AI generates a complete, study-ready deck in seconds.',
    color: 'text-accent-DEFAULT',
    glow: 'rgba(167,139,250,0.12)',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Smart Notes',
    desc: 'Write, organise and search your notes with rich markdown support.',
    color: 'text-aurora-cyan',
    glow: 'rgba(34,211,238,0.10)',
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Goal Tracking',
    desc: 'Set academic targets, track progress and build unstoppable momentum.',
    color: 'text-aurora-green',
    glow: 'rgba(74,222,128,0.10)',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Progress Analytics',
    desc: 'Visual streaks, session logs and weekly activity charts.',
    color: 'text-aurora-pink',
    glow: 'rgba(244,114,182,0.10)',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Pomodoro Timer',
    desc: 'Focus sessions with customisable work and break intervals.',
    color: 'text-aurora-yellow',
    glow: 'rgba(251,191,36,0.10)',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'AI Study Assistant',
    desc: 'Ask anything. Get explanations, summaries and study tips instantly.',
    color: 'text-accent-DEFAULT',
    glow: 'rgba(167,139,250,0.12)',
  },
]

const stats = [
  { value: '10K+', label: 'Students' },
  { value: '500K+', label: 'Cards Generated' },
  { value: '98%', label: 'Satisfaction' },
  { value: '4.9★', label: 'Rating' },
]

const testimonials = [
  {
    quote: "StudyFlow's AI flashcard generator saved me hours before my final exams. I typed 'Cell Biology' and had 15 perfect cards in 10 seconds.",
    name: 'Amara K.',
    role: 'BSc Biology, UCT',
    avatar: 'AK',
  },
  {
    quote: "The progress tracker keeps me accountable. I've gone from 2 study sessions a week to 5. My grades actually improved.",
    name: 'Liam P.',
    role: 'Engineering, Wits',
    avatar: 'LP',
  },
  {
    quote: "Every other study app felt like homework. StudyFlow actually feels good to open. The design is stunning.",
    name: 'Zoe M.',
    role: 'Law, Stellenbosch',
    avatar: 'ZM',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07070d] text-[#f0f0ff] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#1a1a28]"
        style={{ background: 'rgba(7,7,13,0.85)', backdropFilter: 'blur(24px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>SF</div>
            <span className="font-display font-800 text-lg tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
              Study<span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Flow</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it works', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm font-medium text-[#6e6e9a] hover:text-[#f0f0ff] transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm px-4 py-2">Sign in</Link>
            <Link href="/auth/register" className="btn-primary text-sm px-4 py-2">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Aurora orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(167,139,250,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-40 left-20 w-72 h-72 rounded-full pointer-events-none animate-aurora-shift"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.06), transparent 70%)' }} />
        <div className="absolute top-20 right-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>
            <Sparkles className="w-3 h-3" />
            Powered by Claude AI
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Study smarter.<br />
            <span style={{ background: 'linear-gradient(135deg, #f0f0ff 0%, #a78bfa 45%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Score higher.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#6e6e9a] max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one AI study platform built for serious students.
            Generate flashcards, track goals, manage tasks and get instant AI tutoring — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/register"
              className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base"
              style={{ fontSize: '15px' }}>
              Start studying for free
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/auth/login"
              className="btn-ghost flex items-center gap-2 px-8 py-3.5 text-base"
              style={{ fontSize: '15px' }}>
              Sign in
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                <div className="text-xs text-[#6e6e9a] font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 max-w-5xl mx-auto mt-20">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(167,139,250,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(167,139,250,0.06)' }}>
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#111119', borderBottom: '1px solid #1a1a28' }}>
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex-1 mx-4 px-4 py-1 rounded-md text-xs text-[#333355]" style={{ background: '#0c0c14', border: '1px solid #1a1a28' }}>
                app.studyflow.co.za
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="p-6" style={{ background: '#0c0c14' }}>
              <div className="flex gap-4">
                {/* Sidebar mock */}
                <div className="w-40 shrink-0 space-y-1">
                  {['Dashboard', 'AI Assistant', 'Tasks', 'Notes', 'Flashcards', 'Goals'].map((item, i) => (
                    <div key={item} className="px-3 py-2 rounded-lg text-xs font-medium"
                      style={{ background: i === 0 ? 'rgba(167,139,250,0.12)' : 'transparent', color: i === 0 ? '#a78bfa' : '#333355', border: i === 0 ? '1px solid rgba(167,139,250,0.2)' : '1px solid transparent' }}>
                      {item}
                    </div>
                  ))}
                </div>
                {/* Content mock */}
                <div className="flex-1 space-y-4">
                  <div className="h-7 w-48 rounded-lg" style={{ background: 'linear-gradient(90deg,#1c1c2a,#161622)' }} />
                  <div className="grid grid-cols-4 gap-3">
                    {['#a78bfa','#22d3ee','#4ade80','#f472b6'].map((c, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: '#111119', border: '1px solid #1a1a28' }}>
                        <div className="text-xl font-black" style={{ color: c }}>{['12h','7🔥','23','4'][i]}</div>
                        <div className="h-2 w-12 rounded mt-1" style={{ background: '#1a1a28' }} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-3 space-y-2" style={{ background: '#111119', border: '1px solid #1a1a28' }}>
                      {[70, 45, 90, 30, 60].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="text-xs w-6 text-[#333355]">{['M','T','W','T','F'][i]}</div>
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: '#1a1a28' }}>
                            <div className="h-full rounded-full" style={{ width: `${w}%`, background: 'linear-gradient(90deg,#a78bfa,#22d3ee)' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-3 space-y-2" style={{ background: '#111119', border: '1px solid #1a1a28' }}>
                      {['Calculus HW','Physics Lab','Biology Essay'].map((t, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#6e6e9a]">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ['#a78bfa','#22d3ee','#4ade80'][i] }} />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-purple mb-4 mx-auto">Everything you need</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Built for how <span className="gradient-text">students actually study</span>
            </h2>
            <p className="text-[#6e6e9a] text-lg max-w-xl mx-auto">
              Every feature is designed to reduce friction and maximise your study effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="card p-6 group cursor-default"
                style={{ '--glow': f.glow } as React.CSSProperties}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                  style={{ background: f.glow, border: `1px solid ${f.glow}` }}>
                  <span className={f.color}>{f.icon}</span>
                </div>
                <h3 className="font-bold text-[#f0f0ff] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6e6e9a] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-cyan mb-4 mx-auto">Simple to use</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Up and running in <span className="gradient-text">60 seconds</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up free in seconds. No credit card required.' },
              { step: '02', title: 'Set up your subjects', desc: 'Tell StudyFlow what you\'re studying. It personalises everything for you.' },
              { step: '03', title: 'Start studying smarter', desc: 'Generate flashcards with AI, track your sessions, hit your goals.' },
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
                className="text-center">
                <div className="text-5xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#6e6e9a] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Students <span className="gradient-text">love StudyFlow</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="card p-6">
                <p className="text-sm text-[#6e6e9a] leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-[#6e6e9a]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-green mb-4 mx-auto">Pricing</div>
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Free to start. <span className="gradient-text">Powerful when you need it.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              {
                name: 'Free', price: 'R0', period: 'forever',
                features: ['Unlimited tasks & notes', '10 AI flashcard generations/month', 'Goal tracking', 'Progress analytics', 'Pomodoro timer'],
                cta: 'Get started free', highlight: false,
              },
              {
                name: 'Pro', price: 'R89', period: 'per month',
                features: ['Everything in Free', 'Unlimited AI flashcards', 'AI Study Assistant', 'Priority support', 'Export to PDF', 'Advanced analytics'],
                cta: 'Start free trial', highlight: true,
              },
            ].map((plan) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
                className={`card p-8 relative ${plan.highlight ? 'border-[rgba(167,139,250,0.35)]' : ''}`}
                style={plan.highlight ? { boxShadow: '0 0 40px rgba(167,139,250,0.1), 0 4px 20px rgba(0,0,0,0.85)' } : {}}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-purple text-xs">Most popular</div>
                )}
                <div className="mb-6">
                  <div className="text-sm font-bold text-[#6e6e9a] uppercase tracking-widest mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.price}</span>
                    <span className="text-[#6e6e9a] text-sm">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#6e6e9a]">
                      <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? 'btn-primary' : 'btn-ghost'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card p-12 relative overflow-hidden"
            style={{ border: '1px solid rgba(167,139,250,0.25)', boxShadow: '0 0 60px rgba(167,139,250,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.06), transparent 70%)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                Ready to <span className="gradient-text">level up?</span>
              </h2>
              <p className="text-[#6e6e9a] mb-8 text-lg">Join thousands of students already using StudyFlow to study smarter.</p>
              <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-base">
                Get started free <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a28] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>SF</div>
            <span className="font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>StudyFlow</span>
          </div>
          <p className="text-xs text-[#333355]">© 2026 StudyFlow. Built for students, by students.</p>
          <div className="flex gap-6 text-xs text-[#333355]">
            <a href="#" className="hover:text-[#6e6e9a] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#6e6e9a] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#6e6e9a] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
