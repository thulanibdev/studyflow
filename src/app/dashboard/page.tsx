import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardHome from '@/components/dashboard/DashboardHome'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const [profileRes, goalsRes, sessionsRes, tasksRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('study_sessions').select('*').eq('user_id', user.id).order('studied_at', { ascending: false }).limit(20),
    supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ])

  return (
    <DashboardHome
      user={user}
      profile={profileRes.data}
      goals={goalsRes.data || []}
      sessions={sessionsRes.data || []}
      tasks={tasksRes.data || []}
    />
  )
}
