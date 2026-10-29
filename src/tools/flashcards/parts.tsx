import Katex from '../../components/Katex'
import { toggleStar } from './progress'
import type { Direction, Face } from './data'

// Pieces shared by the Flashcards views.

export type QType = 'mc' | 'tf' | 'write' | 'gap'

export interface Settings {
  groups: string[]
  dir: Direction
  starredOnly: boolean
  testN: number
  testTypes: Record<QType, boolean>
}

export function FaceView({ face, className = '' }: { face: Face; className?: string }) {
  return face.tex !== undefined
    ? <Katex tex={face.tex} className={className} />
    : <span className={className}>{face.text}</span>
}

/** Type size for a face shown big on a card: maths and short words large, a sentence smaller so it reads as one. */
export function bigSize(f: Face) {
  const n = f.text?.length ?? 0
  if (f.tex !== undefined) return f.tex.length > 70 ? 'text-xl sm:text-2xl max-w-full overflow-x-auto' : 'text-3xl sm:text-4xl max-w-full overflow-x-auto'
  return n > 60 ? 'text-lg sm:text-xl leading-snug max-w-[34ch]' : n > 24 ? 'text-2xl sm:text-[1.7rem] leading-snug' : 'text-3xl sm:text-4xl'
}

/** A face is a sentence or a long equation: options holding one go one per row, smaller. */
export const isLong = (f: Face) => (f.text?.length ?? 0) > 40 || (f.tex?.length ?? 0) > 55

/** A thin bar: how far through the pile or round. */
export function Progress({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-[width] duration-300" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">{label}</span>
    </div>
  )
}

/** Mastery as a ring, for the subject tiles. */
export function Ring({ pct, size = 48 }: { pct: number; size?: number }) {
  const r = 19, c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" role="img" aria-label={`${pct}% mastered`} className="flex-none">
      <circle cx="25" cy="25" r={r} fill="none" strokeWidth="5" className="stroke-gray-200 dark:stroke-gray-700" />
      {pct > 0 && <circle cx="25" cy="25" r={r} fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 25 25)" className="stroke-emerald-500 transition-[stroke-dasharray] duration-500" />}
      <text x="25" y="29" textAnchor="middle" className="fill-gray-900 dark:fill-white text-[11px] font-semibold">{pct}%</text>
    </svg>
  )
}

/** Mastery as a bar, for the group rows. */
export function MasteryBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden" aria-hidden>
      <div className="h-full rounded-full bg-emerald-500 transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function StarButton({ id, on }: { id: string; on: boolean }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); toggleStar(id) }}
      aria-pressed={on}
      aria-label={on ? 'Unstar this card' : 'Star this card'}
      title={on ? 'Unstar (S)' : 'Star (S)'}
      className={`relative p-1.5 rounded-lg transition-colors after:absolute after:-inset-1.5 ${on ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600 hover:text-amber-500'}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
        <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />
      </svg>
    </button>
  )
}

export function BackButton({ onClick, label = 'Decks' }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 -ml-2 px-2 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <span aria-hidden>←</span> {label}
    </button>
  )
}

export const primaryBtn = 'px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none text-white text-sm font-semibold rounded-lg active:scale-[0.97] transition-[background-color,transform]'
export const secondaryBtn = 'px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none text-sm font-semibold rounded-lg active:scale-[0.97] transition-[background-color,transform]'

/** Keyboard hint, shown only to pointer-and-keyboard users. */
export function Kbd({ children }: { children: string }) {
  return <kbd className="hidden [@media(pointer:fine)]:inline ml-1.5 px-1 rounded border border-current/30 text-[10px] font-mono opacity-60">{children}</kbd>
}

/** Keydown on the window, ignoring typing in fields and presses a focused button handles itself. */
export function isPlainKey(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey) return false
  const t = e.target
  if (t instanceof HTMLElement && t.closest('input, textarea, select')) return false
  if (t instanceof HTMLButtonElement && (e.key === ' ' || e.key === 'Enter')) return false
  return true
}
