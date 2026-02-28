import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function getGreeting(name: string) {
  const hour = new Date().getHours()
  if (hour < 12) return `Good morning, ${name} ☀️`
  if (hour < 17) return `Good afternoon, ${name} 🌤`
  return `Good evening, ${name} 🌙`
}
