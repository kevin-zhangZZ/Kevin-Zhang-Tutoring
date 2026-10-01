import { useId, type ReactNode } from 'react'
import { LIMITS, f1, snapShift, type PPGeometry, type PPState, type Shape } from './model'

type SetFn = (patch: Partial<PPState>) => void

const LABEL = 'text-[12.5px] font-semibold text-gray-500 dark:text-gray-400'
const PILL =
  'min-h-[44px] md:[@media(pointer:fine)]:min-h-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full border bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'

// ------------------------------------------------------------------------------------------------
// Building blocks (the Lesson's per-step controls reuse these)
// ------------------------------------------------------------------------------------------------

/** The picker's buttons: the five base shapes, plus 'circle' (curvy, circle outline) for the
 *  Lesson's step 1, which offers Circle in place of Weird and Curvy. */
export type ShapeChoice = Shape | 'circle'

const SHAPE_ICONS: Record<ShapeChoice, ReactNode> = {
  circle: <circle cx="10" cy="10" r="7" />,
  square: <rect x="4" y="4" width="12" height="12" />,
  triangle: <path d="M2.5 15.5L17.5 13L8 3.5Z" />,
  hexagon: <path d="M17 10L13.5 16.1H6.5L3 10L6.5 3.9H13.5Z" />,
  weird: <path d="M10 2.5L12 7.2L17.2 6.2L14 10.6L16.4 16.2L11 13.6L5.8 17.2L6.6 11.6L2.6 8.4L7.6 7.2Z" />,
  curvy: <path d="M10 3C14 2.5 17.5 5.5 16.5 9.5C15.8 12.5 17 15.5 13 16.8C9.5 18 6.5 16 4.5 13.5C2.5 11 3 7.5 5 5.5C6.5 3.8 8 3.2 10 3Z" />,
}
const SHAPE_NAMES: Record<ShapeChoice, string> = { square: 'Square', triangle: 'Triangle', hexagon: 'Hexagon', weird: 'Weird', curvy: 'Curvy', circle: 'Circle' }

/** Base Shape buttons, plus New Weird Base and the curvy Blob | Circle switch under them. */
export function ShapePicker({ st, set, shapes = ['square', 'triangle', 'hexagon', 'weird', 'curvy'] }: { st: PPState; set: SetFn; shapes?: ShapeChoice[] }) {
  const hasCircle = shapes.includes('circle')
  const isOn = (s: ShapeChoice) =>
    s === 'circle' ? st.shape === 'curvy' && st.outline === 'circle' : s === 'curvy' && hasCircle ? false : st.shape === s
  const pick = (s: ShapeChoice) => set(s === 'circle' ? { shape: 'curvy', outline: 'circle' } : { shape: s })
  const id = useId()
  const cols = shapes.length === 5 ? 'grid-cols-5 lg:grid-cols-3 xl:grid-cols-5' : 'grid-cols-4'
  return (
    <div>
      <div className={`${LABEL} mb-1.5`} id={id}>
        Base Shape
      </div>
      <div className={`grid ${cols} gap-1.5`} role="group" aria-labelledby={id}>
        {shapes.map((s) => {
          const on = isOn(s)
          return (
            <button
              key={s}
              type="button"
              aria-pressed={on}
              onClick={() => pick(s)}
              className={`h-14 rounded-lg border flex flex-col items-center justify-center gap-0.5 ${
                on
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-300'
                  : 'bg-white border-gray-200 text-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                {SHAPE_ICONS[s]}
              </svg>
              <span className="text-[12px] font-semibold">{SHAPE_NAMES[s]}</span>
            </button>
          )
        })}
      </div>
      {st.shape === 'weird' && (
        <div className="mt-2">
          <button type="button" onClick={() => set({ seed: st.seed + 1 })} className={`${PILL} inline-flex items-center gap-1.5`}>
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
              <path d="M13.5 2.5v3h-3" />
            </svg>
            New Weird Base
          </button>
        </div>
      )}
      {st.shape === 'curvy' && !hasCircle && (
        <div className="mt-2 flex items-center gap-3">
          <span className="text-[13px] text-gray-700 dark:text-gray-300" id={id + 'o'}>
            Outline
          </span>
          <Segmented
            labelledBy={id + 'o'}
            className="w-44"
            small
            value={st.outline}
            options={[
              { value: 'blob', label: 'Blob' },
              { value: 'circle', label: 'Circle' },
            ]}
            onChange={(v) => set({ outline: v })}
          />
        </div>
      )}
    </div>
  )
}

/** A segmented switch (grey track, white thumb), aria-pressed buttons. */
export function Segmented<V extends string>({
  value,
  options,
  onChange,
  labelledBy,
  label,
  small = false,
  disabled = false,
  className = '',
}: {
  value: V
  options: { value: V; label: ReactNode }[]
  onChange: (v: V) => void
  labelledBy?: string
  label?: string
  small?: boolean
  disabled?: boolean
  className?: string
}) {
  const cols = options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-1 grid ${cols} ${disabled ? 'opacity-50' : ''} ${className}`}
      role="group"
      aria-labelledby={labelledBy}
      aria-label={label}
    >
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            disabled={disabled}
            onClick={() => onChange(o.value)}
            className={`${small ? 'h-11 md:[@media(pointer:fine)]:h-8 text-[12.5px]' : 'h-11 md:[@media(pointer:fine)]:h-9 text-[13px]'} rounded-md font-semibold disabled:cursor-not-allowed ${
              on ? 'bg-white dark:bg-gray-950 shadow-sm text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Label + value on one row and the slider below (phone, md); one row on lg. */
export function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: ReactNode
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const id = useId()
  return (
    <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[7.5rem_minmax(0,1fr)_3rem] items-center gap-x-3 text-[13px] text-gray-700 dark:text-gray-300">
      <label htmlFor={id} className="order-1">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="pp-slider order-3 col-span-2 lg:order-2 lg:col-span-1 w-full min-w-0 h-11 lg:h-6 cursor-pointer"
      />
      <span className="order-2 lg:order-3 w-12 text-right font-display font-semibold tabular-nums text-gray-800 dark:text-gray-100" aria-hidden="true">
        {display}
      </span>
    </div>
  )
}

/** An on/off pill (aria-pressed). */
export function TogglePill({ on, onClick, disabled = false, describedBy, children }: { on: boolean; onClick: () => void; disabled?: boolean; describedBy?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      aria-describedby={describedBy}
      onClick={onClick}
      className={`min-h-[44px] md:[@media(pointer:fine)]:min-h-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        on
          ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500 dark:text-white'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
      }`}
    >
      {children}
    </button>
  )
}

/** Why Lift Off Top can't be used right now, or null when it can. */
export function liftReason(g: PPGeometry, st: Pick<PPState, 'solid'>): string | null {
  if (g.liftAllowed) return null
  if (st.solid === 'prism') return 'A prism has no top piece to lift. Switch to Pyramid or Both.'
  if (g.atApex) return 'The slice is at the apex, so there’s no top piece. Lower the slice to lift the top off.'
  return 'The slice is the base, so the top piece is the whole solid. Raise the slice to lift the top off.'
}

// ------------------------------------------------------------------------------------------------
// Explore's controls card
// ------------------------------------------------------------------------------------------------

export function ExploreControls({ st, g, set, onReset, className = '' }: { st: PPState; g: PPGeometry; set: SetFn; onReset: () => void; className?: string }) {
  const solidId = useId()
  const reasonId = useId()
  const curvy = st.shape === 'curvy'
  const prismMode = st.solid === 'prism'
  const reason = liftReason(g, st)
  return (
    <section
      id="pp-controls"
      className={`scroll-mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col gap-4 ${className}`}
      aria-label="Controls"
    >
      <div className="flex items-center justify-between">
        <h2 id="pp-controls-title" tabIndex={-1} className={`${LABEL} outline-none`}>
          Controls
        </h2>
        <button type="button" onClick={onReset} className={PILL}>
          Reset
        </button>
      </div>

      <ShapePicker st={st} set={set} />

      <div>
        <div className={`${LABEL} mb-1.5`} id={solidId}>
          Solid
        </div>
        <Segmented
          labelledBy={solidId}
          value={st.solid}
          options={[
            { value: 'pyramid', label: curvy ? 'Cone' : 'Pyramid' },
            { value: 'prism', label: curvy ? 'Cylinder' : 'Prism' },
            { value: 'both', label: 'Both' },
          ]}
          onChange={(v) => set({ solid: v })}
        />
        {st.solid === 'both' && (
          <Segmented
            label="Both layout"
            className="mt-2 max-w-[16rem]"
            small
            value={st.layout}
            options={[
              { value: 'nested', label: 'Nested' },
              { value: 'side', label: 'Side by Side' },
            ]}
            onChange={(v) => set({ layout: v })}
          />
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <SliderRow
          label={
            <>
              Height <i>h</i>
            </>
          }
          value={st.h}
          display={f1(st.h)}
          min={LIMITS.hMin}
          max={LIMITS.hMax}
          step={0.1}
          onChange={(v) => set({ h: v })}
        />
        <SliderRow
          label={st.solid === 'pyramid' ? 'Slide Apex' : st.solid === 'prism' ? 'Shear' : 'Slide Apex / Shear'}
          value={st.s}
          display={f1(st.s)}
          min={-LIMITS.sMax}
          max={LIMITS.sMax}
          step={0.1}
          onChange={(v) => set({ s: snapShift(v) })}
        />
        <SliderRow
          label={
            <>
              Slice Height <i>z</i>
            </>
          }
          value={st.z}
          display={f1(st.z)}
          min={0}
          max={st.h}
          step={0.1}
          onChange={(v) => set({ z: v })}
        />
        <SliderRow
          label="Layers"
          value={st.layers}
          display={st.layers ? String(st.layers) : 'Off'}
          min={0}
          max={LIMITS.layersMax}
          step={1}
          onChange={(v) => set({ layers: Math.round(v) })}
        />
        {st.layers > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:pl-[8.25rem]">
            <Segmented
              label="Layer position"
              className="w-44"
              small
              disabled={prismMode}
              value={st.layerMode}
              options={[
                { value: 'inside', label: 'Inside' },
                { value: 'outside', label: 'Outside' },
              ]}
              onChange={(v) => set({ layerMode: v })}
            />
            <span className="text-[12px] text-gray-500 dark:text-gray-400">
              {prismMode ? (
                <>
                  A prism’s layers are all the same, so the stack is exactly <i>Ah</i>.
                </>
              ) : (
                'Inside steps undercount, outside steps overcount.'
              )}
            </span>
          </div>
        )}
      </div>

      <div>
        <div className={`${LABEL} mb-1.5`}>Extras</div>
        <div className="flex flex-wrap items-center gap-2">
          <TogglePill on={st.slant} onClick={() => set({ slant: !st.slant })}>
            Slant Length
          </TogglePill>
          <TogglePill on={st.lift && g.liftAllowed} disabled={!g.liftAllowed} describedBy={reason ? reasonId : undefined} onClick={() => set({ lift: !st.lift })}>
            Lift Off Top
          </TogglePill>
        </div>
        {reason && (
          <p id={reasonId} className="mt-1.5 text-[12px] text-gray-500 dark:text-gray-400">
            {reason}
          </p>
        )}
      </div>
    </section>
  )
}
