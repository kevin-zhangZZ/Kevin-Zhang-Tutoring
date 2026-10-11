// Dates for the practice log: ISO day strings (YYYY-MM-DD), shown the Australian way. Every date
// on the page is written by the formatters here, so a date reads the same in the list, in a
// chart dot's details and on the chart's axis.

export const DAY = 86_400_000

/** Milliseconds at UTC midnight of an ISO day. */
const msOf = (iso: string) => Date.parse(`${iso}T00:00:00Z`)

/** Whole days since 1970 for an ISO day, for spacing a chart by time. */
export const dayOf = (iso: string) => msOf(iso) / DAY

/** Today on this device, as YYYY-MM-DD. */
export function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// ── Formatters ─────────────────────────────────────────────────────────────────────────────

// Made once: building a formatter is the slow part, and toLocaleDateString builds a new one on
// every call. All in UTC, where a day starts (msOf), so no time zone can move a date a day.
const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-AU', { timeZone: 'UTC', ...o })
const DAY_MONTH = fmt({ day: 'numeric', month: 'short' })
const DAY_MONTH_YEAR = fmt({ day: 'numeric', month: 'short', year: 'numeric' })

const otherYear = (iso: string) => iso.slice(0, 4) !== today().slice(0, 4)

/** "13 Sept", with the year added when it isn't this year ("13 Sept 2025"). */
export function fmtDate(iso: string, withYear = otherYear(iso)): string {
  return (withYear ? DAY_MONTH_YEAR : DAY_MONTH).format(msOf(iso))
}

/** The same with a short year, for narrow columns: "13 Sept", or "13 Sept ’25". */
export function fmtDateShort(iso: string): string {
  const d = DAY_MONTH.format(msOf(iso))
  return otherYear(iso) ? `${d} ’${iso.slice(2, 4)}` : d
}

/** A chart axis day (from dayOf): "12 July". */
export const fmtDay = (day: number) => DAY_MONTH.format(day * DAY)

/** A chart axis month (the day it starts): "Sept", or "Jan 2027" with its year. The name is
 *  taken from the day+month formatter, so it's "June" and "July" as in every other date here
 *  (a month-only en-AU formatter says "Jun" and "Jul"). */
export function fmtMonth(day: number, withYear = false): string {
  const ms = day * DAY
  const month = DAY_MONTH.formatToParts(ms).find(p => p.type === 'month')!.value
  return withYear ? `${month} ${new Date(ms).getUTCFullYear()}` : month
}

/** 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st, 22nd. */
export function nth(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13
  const suffix = teen ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'
  return `${n}${suffix}`
}
