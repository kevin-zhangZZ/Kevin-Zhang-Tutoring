// Dates for the practice log: ISO day strings (YYYY-MM-DD), shown the Australian way.

export const DAY = 86_400_000
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

/** Whole days since 1970 for an ISO day, for spacing a chart by time. */
export const dayOf = (iso: string) => Date.parse(`${iso}T00:00:00Z`) / DAY

/** Today on this device, as YYYY-MM-DD. */
export function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** "13 Sept", with the year added when it isn't this year. */
export function fmtDate(iso: string, withYear = iso.slice(0, 4) !== today().slice(0, 4)): string {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {}) })
}

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st, 22nd. */
export function nth(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13
  const suffix = teen ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}
