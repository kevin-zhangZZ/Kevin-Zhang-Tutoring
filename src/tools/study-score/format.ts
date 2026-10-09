import type { Subject } from './data'

export const SUBJECT_NAME: Record<Subject, string> = {
  methods: 'Mathematical Methods',
  specialist: 'Specialist Mathematics',
}

/** "top 8%" for the share above a student, finer near the top. */
export function topShare(pct: number): string {
  const above = (1 - pct) * 100
  if (above < 0.1) return 'top 0.1%'
  if (above < 1) return `top ${above.toFixed(1)}%`
  if (above > 99) return 'bottom 1%'
  return `top ${Math.round(above)}%`
}
