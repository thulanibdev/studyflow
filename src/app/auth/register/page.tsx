'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) { toast.error('Please fill in all fields'); return }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
    if (error) toast.error(error.message)
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#07070d' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md w-full p-10 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)' }}>
          <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
        </div>
        <h2 className="text-2xl font-black mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Check your email</h2>
        <p className="text-[#6e6e9a] text-sm mb-8 leading-relaxed">
          We've sent a confirmation link to <strong className="text-[#f0f0ff]">{email}</strong>.
          Click it to activate your account.
        </p>
        <Link href="/auth/login" className="btn-primary block py-3 text-sm">
          Back to sign in
        </Link>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen flex" style={{ background: '#07070d' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(150deg, #060612 0%, #0c1040 50%, #07081a 100%)' }}>
        <div className="absolute top-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full pointer-events-none animate-aurora-shift"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)' }} />
        <div className="absolute bottom-[-60px] left-[-40px] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)' }} />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
            style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>SF</div>
          <span className="text-white font-black text-xl tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>StudyFlow</span>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: 'rgba(255,255,255,0.6)' }}>
            <Sparkles className="w-3 h-3" /> Free forever
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-tight text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Join thousands<br />
            of students<br />
            <span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              studying smarter
            </span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed max-w-sm">
            Create your free account and get access to AI flashcards, goal tracking, and everything else StudyFlow offers.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {['Free to start, always', 'No credit card required', 'AI-powered from day one'].map(f => (
            <div key={f} className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)' }} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <Link href="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-[#6e6e9a] hover:text-[#f0f0ff] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Create account</h2>
            <p className="text-[#6e6e9a] text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#a78bfa] hover:text-[#c4b5fd] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl mb-6 text-sm font-semibold transition-all hover:scale-[1.01]"
            style={{ background: '#161622', border: '1px solid #232338', color: '#f0f0ff' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: '#1a1a28' }} />
            <span className="text-xs text-[#333355] font-medium">or</span>
            <div className="flex-1 h-px" style={{ background: '#1a1a28' }} />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">Full name</label>
              <input className="input" type="text" placeholder="Thulani Billy"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@email.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPass ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333355] hover:text-[#6e6e9a] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm mt-2">
              {loading ? 'Creating account...' : 'Create free account'}
            </button>
            <p className="text-center text-xs text-[#333355]">
              By signing up you agree to our{' '}
              <a href="#" className="hover:text-[#6e6e9a] transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="hover:text-[#6e6e9a] transition-colors">Privacy Policy</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
