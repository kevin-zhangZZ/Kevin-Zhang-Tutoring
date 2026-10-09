// The app's one on/off control, in two appearances:
//   appearance="switch" — a sliding switch with its label beside it (role="switch",
//     aria-checked). For a standing setting: "Degrees".
//   appearance="chip" (default) — a pill that fills in when on (aria-pressed). For layers you
//     show/hide on a diagram ("Face Names", "Show tangent"), usually several in a row beside
//     one-shot ActionButtons styled like an unpressed chip.
// Both: the whole control (switch + label) is one button, a visible focus ring, a bigger target
// on touch screens, and no knob animation under prefers-reduced-motion.

import type { ReactNode } from 'react'

export interface ToggleProps {
  label: ReactNode
  checked: boolean
  onChange: (v: boolean) => void
  appearance?: 'chip' | 'switch'
  disabled?: boolean
  /** Accessible name when `label` isn't plain text. */
  ariaLabel?: string
  describedBy?: string
  className?: string
}

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

/** Shared with one-shot buttons that sit in a row of chips (kit's ActionButton). */
export const CHIP_BASE = `relative text-[12.5px] font-semibold px-3 py-1.5 [@media(pointer:coarse)]:py-2.5 rounded-full border transition-colors motion-reduce:transition-none after:absolute after:-inset-y-1 after:inset-x-0 disabled:opacity-40 disabled:cursor-not-allowed ${FOCUS}`
export const CHIP_OFF =
  'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
const CHIP_ON = 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-gray-950'

export default function Toggle({ label, checked, onChange, appearance = 'chip', disabled, ariaLabel, describedBy, className = '' }: ToggleProps) {
  if (appearance === 'chip') {
    return (
      <button
        type="button"
        aria-pressed={checked}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`${CHIP_BASE} ${checked ? CHIP_ON : CHIP_OFF} ${className}`}
      >
        {label}
      </button>
    )
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`group relative inline-flex items-center gap-2 py-1 rounded-md select-none after:absolute after:-inset-y-2 after:-inset-x-1 disabled:opacity-40 disabled:cursor-not-allowed ${FOCUS} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative flex-none w-9 h-5 rounded-full transition-colors duration-200 motion-reduce:transition-none ${
          checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-500'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 motion-reduce:transition-none ${checked ? 'translate-x-4' : ''}`}
        />
      </span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  )
}
