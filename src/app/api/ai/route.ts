import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { type, topic, count, message, history } = body

  try {
    if (type === 'flashcards') {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Generate exactly ${count || 8} high-quality study flashcards about: "${topic}". Return ONLY a valid JSON array — no markdown, no backticks. Each object must have "front" (question/term) and "back" (answer/definition). Make them genuinely useful for a student revising this topic.`
        }]
      })
      const text = response.content[0].type === 'text' ? response.content[0].text : ''
      const cleaned = text.replace(/```json|```/g, '').trim()
      const cards = JSON.parse(cleaned)
      return NextResponse.json({ cards })
    }

    if (type === 'chat') {
      const messages = [
        ...(history || []),
        { role: 'user' as const, content: message }
      ]
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'You are StudyFlow AI, a helpful academic assistant for students. Help them understand concepts, summarise topics, create study plans, and answer academic questions. Be concise, clear and encouraging. Format responses with markdown when helpful.',
        messages,
      })
      const reply = response.content[0].type === 'text' ? response.content[0].text : ''
      return NextResponse.json({ reply })
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  } catch (err: any) {
    console.error('AI API error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
