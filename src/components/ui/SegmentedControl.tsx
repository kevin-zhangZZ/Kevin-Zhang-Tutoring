// The app's one segmented control: a grey track with a white "thumb" on the picked option.
//
// Two semantics, chosen by what the control does:
//   variant="buttons" (default) — a single-select setting (subject, sort, detail level…):
//     a role="group" of buttons, the picked one aria-pressed. Tab moves through every option.
//   variant="tabs" — it switches which panel is shown below it: role="tablist" / role="tab"
//     with aria-selected, roving tabIndex and arrow-key movement (onTabKeyDown). Pass `idFor`
//     and `controls` so each tab and its tabpanel can reference each other.
//
// Sizes: "sm" for dense spots (sidebars, toolbars, filter bars), "md" for page headers and
// settings. Radii are concentric (track rounded-lg/xl, thumb rounded-md/lg). On touch screens
// the buttons get extra padding and an invisible hit layer above and below.

import type { CSSProperties, ReactNode } from 'react'
import { onTabKeyDown } from '../../lib/a11y'

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
  /** Accessible name when `label` isn't plain text (or is shortened on phones). */
  ariaLabel?: string
  disabled?: boolean
  title?: string
  /** CSS colour for the label while this option is picked (e.g. the trig-value colours). */
  activeColor?: string
  /** Tailwind text-colour classes that replace the default grey/white label colours in both states. */
  toneClassName?: string
}

interface Props<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (v: T) => void
  size?: 'sm' | 'md'
  variant?: 'buttons' | 'tabs'
  /** Equal-width columns filling the container (otherwise the control hugs its labels). */
  fill?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  title?: string
  /** variant="tabs": the id for each tab button. */
  idFor?: (v: T) => string
  /** variant="tabs": the id of the tabpanel the tabs control. */
  controls?: string
  /** Layout extras for the track (margins, widths, responsive display). */
  className?: string
}

const TRACK = {
  sm: 'gap-0.5 p-0.5 rounded-lg',
  md: 'gap-1 p-1 rounded-xl',
}

const BUTTON = {
  sm: 'py-1 [@media(pointer:coarse)]:py-1.5 rounded-md text-xs after:-inset-y-2',
  md: 'py-1.5 [@media(pointer:coarse)]:py-2 rounded-lg text-sm after:-inset-y-2.5',
}

// Side padding. Filled columns are already wide on big screens, and on a phone the padding is
// what makes a row of short labels overflow, so it shrinks there.
const PAD = {
  sm: { hug: 'px-2.5', fill: 'px-1.5 sm:px-2.5' },
  md: { hug: 'px-3.5', fill: 'px-2 sm:px-3.5' },
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'sm',
  variant = 'buttons',
  fill = false,
  title,
  idFor,
  controls,
  className = '',
  ...aria
}: Props<T>) {
  const tabs = variant === 'tabs'
  return (
    <div
      role={tabs ? 'tablist' : 'group'}
      aria-label={aria['aria-label']}
      aria-labelledby={aria['aria-labelledby']}
      title={title}
      className={`${fill ? 'grid grid-flow-col auto-cols-fr' : 'inline-flex'} bg-gray-100 dark:bg-gray-800 ${TRACK[size]} ${className}`}
    >
      {options.map(o => {
        const on = o.value === value
        const tone =
          o.toneClassName ??
          (on ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200')
        const style: CSSProperties | undefined = on && o.activeColor ? { color: o.activeColor } : undefined
        return (
          <button
            key={o.value}
            type="button"
            {...(tabs
              ? {
                  role: 'tab',
                  id: idFor?.(o.value),
                  'aria-selected': on,
                  'aria-controls': controls,
                  tabIndex: on ? 0 : -1,
                  onKeyDown: onTabKeyDown,
                }
              : { 'aria-pressed': on })}
            aria-label={o.ariaLabel}
            title={o.title}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            style={style}
            className={`relative inline-flex items-center justify-center gap-1.5 font-medium text-center whitespace-nowrap transition-colors motion-reduce:transition-none after:absolute after:inset-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:z-10 disabled:opacity-40 disabled:cursor-not-allowed ${BUTTON[size]} ${PAD[size][fill ? 'fill' : 'hug']} ${
              on ? 'bg-white dark:bg-gray-900 shadow-sm' : ''
            } ${tone}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
