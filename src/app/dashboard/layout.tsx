'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Brain, CalendarDays, CheckSquare,
  FileText, Bell, BarChart3, Music, Trophy,
  Target, TrendingUp, CreditCard, LogOut, Settings,
  Menu, X, Sparkles
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/ai', icon: Brain, label: 'AI Assistant', badge: 'AI' },
  { href: '/dashboard/schedule', icon: CalendarDays, label: 'Schedule' },
  { href: '/dashboard/tasks', icon: CheckSquare, label: 'Tasks' },
  { href: '/dashboard/notes', icon: FileText, label: 'Notes' },
  { href: '/dashboard/flashcards', icon: CreditCard, label: 'Flashcards' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/progress', icon: TrendingUp, label: 'Progress' },
  { href: '/dashboard/reminders', icon: Bell, label: 'Reminders' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/achievements', icon: Trophy, label: 'Achievements' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase.from('profiles').select('*').eq('id', user.id).single()
          .then(({ data }) => setProfile(data))
      }
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/')
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#07070d' }}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={cn(
        'fixed lg:relative z-50 lg:z-auto h-full flex flex-col transition-transform duration-300',
        'w-64 shrink-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )} style={{ background: 'linear-gradient(180deg, #0a0a15 0%, #07070d 100%)', borderRight: '1px solid #1a1a28' }}>

        {/* Sidebar edge glow */}
        <div className="absolute right-0 top-0 w-px h-full pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(167,139,250,0.3) 30%, rgba(34,211,238,0.2) 70%, transparent 100%)' }} />

        {/* Logo */}
        <div className="p-5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>SF</div>
            <span className="font-black text-base tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Study<span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Flow</span>
            </span>
          </Link>
          <button className="lg:hidden text-[#333355] hover:text-[#6e6e9a]" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333355] px-3 pt-2 pb-1.5">Main</p>
          {navItems.slice(0, 2).map(item => (
            <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
          ))}
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333355] px-3 pt-3 pb-1.5">Study</p>
          {navItems.slice(2, 8).map(item => (
            <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
          ))}
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333355] px-3 pt-3 pb-1.5">Track</p>
          {navItems.slice(8).map(item => (
            <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t" style={{ borderColor: '#1a1a28' }}>
          <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/[0.02] cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)' }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{displayName}</div>
              <div className="text-xs text-[#333355] truncate">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="text-[#333355] hover:text-[#f87171] transition-colors p-1">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="shrink-0 h-14 flex items-center justify-between px-5 border-b"
          style={{ background: 'rgba(7,7,13,0.85)', backdropFilter: 'blur(24px)', borderColor: '#1a1a28' }}>
          <button className="lg:hidden text-[#6e6e9a] hover:text-[#f0f0ff] transition-colors"
            onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <div className="badge badge-purple text-[10px] hidden sm:flex">
              <Sparkles className="w-2.5 h-2.5" /> Pro
            </div>
            <Link href="/dashboard/settings"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6e6e9a] hover:text-[#f0f0ff] transition-colors"
              style={{ background: '#161622', border: '1px solid #1a1a28' }}>
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function NavLink({ item, pathname, onClick }: { item: typeof navItems[0], pathname: string, onClick: () => void }) {
  const active = pathname === item.href
  return (
    <Link href={item.href} onClick={onClick}
      className={cn('nav-item', active && 'active')}>
      <item.icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
          style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', color: '#fff', letterSpacing: '0.04em' }}>
          {item.badge}
        </span>
      )}
    </Link>
  )
}
