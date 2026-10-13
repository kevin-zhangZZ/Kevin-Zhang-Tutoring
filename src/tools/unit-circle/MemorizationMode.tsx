import { useState, type CSSProperties } from 'react'
import { angles, shiftedAngleTex, type AngleData } from './data'
import Katex from '../../components/Katex'
import { useStoredState, useCoarsePointer } from './storage'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Toggle from '../../components/ui/Toggle'

type AngleRange = 'pos' | 'neg' | 'both'
type ShowValue = 'none' | 'cos' | 'sin' | 'tan'
type View = 'circle' | 'table'

// ── SVG geometry ────────────────────────────────────────────────────────────
const VB = 760          // viewBox size (square)
const CX = 380          // circle center x
const CY = 380          // circle center y
const R  = 220          // circle radius

// Label positions (as fractions of VB, converted to % for CSS)
const LABEL_R    = 254  // angle name label radius
// 45°-family angles (π/4, 3π/4, 5π/4, 7π/4) are between two 15°-gap neighbours,
// so we push their value label further out to prevent overlap.
const TRIG_R_STD = 330  // value radius — standard
const TRIG_R_45  = 360  // value radius — 45° family (pushed out)

// Colours come from CSS variables (index.css): darker in light mode so they read on white.
const VALUE_COLOR: Record<Exclude<ShowValue, 'none'>, string> = {
  cos: 'var(--color-cos)',
  sin: 'var(--color-sin)',
  tan: 'var(--color-tan)',
}

function pct(v: number) { return `${((v / VB) * 100).toFixed(3)}%` }

function getTrigR(piD: number) { return piD === 4 ? TRIG_R_45 : TRIG_R_STD }

// Nudge angle labels off the axis lines for the 4 cardinal angles
function axisNudge(cosN: number, sinN: number): [number, number] {
  const EPS = 0.05
  if (Math.abs(sinN) < EPS) return [0, -18]  // on x-axis → up
  if (Math.abs(cosN) < EPS) return [14,   0] // on y-axis → right
  return [0, 0]
}

function valueTex(a: AngleData, v: Exclude<ShowValue, 'none'>) {
  return v === 'cos' ? a.cosTex : v === 'sin' ? a.sinTex : a.tanTex
}

// ── Main component ──────────────────────────────────────────────────────────

interface Settings {
  view: View
  range: AngleRange
  show: ShowValue
  deg: boolean
}

export default function MemorizationMode() {
  const [settings, setSettings] = useStoredState<Settings>('uc-memorize', { view: 'circle', range: 'pos', show: 'none', deg: false })
  const { view, range, show, deg } = settings
  const set = (patch: Partial<Settings>) => setSettings(s => ({ ...s, ...patch }))
  // The point being explored: hovered, focused or tapped. It stays picked when the pointer leaves.
  const [active, setActive] = useState<number | null>(null)
  const coarse = useCoarsePointer()

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
      {/* Left column on laptops: what the picked angle is, then the settings. */}
      <div className="w-full lg:w-80 lg:flex-none flex flex-col gap-5 lg:sticky lg:top-6">
        {view === 'circle' && (
          <div className="hidden lg:block">
            <AngleDetail index={active} coarse={coarse} />
          </div>
        )}

        {/* Settings: a card on laptops; on phones a compact block with no card, so the circle
            starts on the first screen. */}
        <div className="lg:card lg:p-5 flex flex-wrap lg:flex-col gap-x-5 gap-y-3 lg:gap-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-1.5 lg:mb-2">View</p>
            <SegmentedControl aria-label="View" value={view} onChange={v => set({ view: v })} options={[{ value: 'circle', label: 'Circle' }, { value: 'table', label: 'Table' }]} />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-1.5 lg:mb-2">Angle Range</p>
            <SegmentedControl
              aria-label="Angle range"
              value={range}
              onChange={v => set({ range: v })}
              options={(['pos', 'neg', 'both'] as AngleRange[]).map(opt => ({
                value: opt,
                label: opt === 'pos' ? '[0, 2π]' : opt === 'neg' ? '[−2π, 0]' : '[−2π, 2π]',
              }))}
            />
          </div>

          {view === 'circle' && (
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider mb-1.5 lg:mb-2">Show Values</p>
              <SegmentedControl
                aria-label="Show values"
                value={show}
                onChange={v => set({ show: v })}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'cos', label: 'cos', activeColor: VALUE_COLOR.cos },
                  { value: 'sin', label: 'sin', activeColor: VALUE_COLOR.sin },
                  { value: 'tan', label: 'tan', activeColor: VALUE_COLOR.tan },
                ]}
              />
            </div>
          )}

          <div className="self-end lg:self-auto pb-1 lg:pb-0">
            <Toggle appearance="switch" checked={deg} onChange={v => set({ deg: v })} label="Degrees" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {view === 'circle' ? (
          <>
            <Circle range={range} show={show} deg={deg} active={active} onPick={setActive} />
            {/* Phones and tablets: the picked angle's values sit under the circle. */}
            <div className="lg:hidden -mt-2">
              <AngleDetail index={active} coarse={coarse} />
            </div>
          </>
        ) : <ValueTable range={range} deg={deg} />}
      </div>
    </div>
  )
}

// ── The picked angle, in full: its value in radians and degrees, where it sits, and its ratios ──

const QUADRANT_NOTE = ['All three ratios are positive.', 'Only sin is positive.', 'Only tan is positive.', 'Only cos is positive.']

function quadrantOf(deg: number) {
  return deg % 90 === 0 ? null : Math.floor(deg / 90)
}

function AngleDetail({ index, coarse }: { index: number | null; coarse: boolean }) {
  if (index === null) {
    return (
      <div className="card p-5">
        <p className="font-display text-lg font-bold text-gray-900 dark:text-white">Explore the circle</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {coarse ? 'Tap' : 'Hover over or click'} any point to see its angle drawn: cos along the x-axis, sin up the y-axis, and tan as the gradient of the radius.
        </p>
      </div>
    )
  }
  const a = angles[index]
  const q = quadrantOf(a.deg)
  const rows: Array<[string, string, string]> = [
    ['cos', a.cosTex, VALUE_COLOR.cos],
    ['sin', a.sinTex, VALUE_COLOR.sin],
    ['tan', a.tanTex, VALUE_COLOR.tan],
  ]
  return (
    <div key={index} className="card p-5 uc-fade" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-3xl text-gray-900 dark:text-white"><Katex tex={`\\theta = ${shiftedAngleTex(a.piN, a.piD, 0)}`} /></div>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 tabular-nums">{a.degLabel}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {q === null ? 'On an axis.' : `Quadrant ${q + 1}. ${QUADRANT_NOTE[q]}`}
        {a.piN !== 0 && <> Same point as <Katex tex={shiftedAngleTex(a.piN, a.piD, -1)} />.</>}
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {rows.map(([fn, tex, color]) => (
          <div key={fn} className="rounded-xl bg-gray-50 dark:bg-gray-800/60 px-2 py-2.5 text-center">
            <dt className="text-xs font-semibold" style={{ color }}>{fn} θ</dt>
            <dd className="mt-1 text-lg min-h-[2.4rem] grid place-items-center" style={{ color }}>
              {tex === '\\text{undefined}' ? <span className="text-xs font-semibold">undefined</span> : <Katex tex={tex} />}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {a.tanLabel === 'undef'
          ? <>The <span className="font-semibold" style={{ color: VALUE_COLOR.tan }}>radius</span> is vertical here, so its gradient (tan θ) is undefined.</>
          : <>tan θ is the gradient of the <span className="font-semibold" style={{ color: VALUE_COLOR.tan }}>radius</span> from the origin to the point: <span style={{ color: VALUE_COLOR.sin }}>sin θ</span> ÷ <span style={{ color: VALUE_COLOR.cos }}>cos θ</span>.</>}
      </p>
    </div>
  )
}

// ── Circle view: angle labels always, plus one set of values at a time ──────

function Circle({ range, show, deg, active, onPick }: {
  range: AngleRange; show: ShowValue; deg: boolean; active: number | null; onPick: (i: number) => void
}) {
  const a = active === null ? null : angles[active]
  const px = a ? CX + R * a.cosN : 0, py = a ? CY - R * a.sinN : 0
  // The angle's arc, from the positive x-axis round to the point.
  const AR = 48
  const th = a ? a.rad : 0
  const arc = a && a.rad > 0
    ? `M ${CX + AR} ${CY} A ${AR} ${AR} 0 ${th > Math.PI ? 1 : 0} 0 ${CX + AR * Math.cos(th)} ${CY - AR * Math.sin(th)}`
    : ''
  return (
    // On laptops the circle is sized to the screen height, so all of it fits without scrolling.
    <div className="w-full max-w-3xl lg:max-w-[calc(100vh-150px)] mx-auto">
      {/* Outer padding lets edge labels breathe; tighter on mobile so the circle itself gets
          more of the narrow viewport. */}
      <div className="px-4 py-6 sm:px-12 sm:py-10">
        <div className="relative" style={{ aspectRatio: '1', overflow: 'visible' }}>

          {/* ── SVG layer (circle, axes, the picked angle, points) ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VB} ${VB}`}
            style={{ overflow: 'visible' }}
          >
            {/* Axes */}
            <line x1={40} y1={CY} x2={VB - 40} y2={CY} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
            <line x1={CX} y1={40} x2={CX} y2={VB - 40} stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />

            {/* Circle */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />

            {/* Faint radius spokes */}
            {angles.map((p, i) => (
              <line key={i}
                x1={CX} y1={CY}
                x2={CX + R * p.cosN} y2={CY - R * p.sinN}
                stroke="currentColor" strokeOpacity="0.05" strokeWidth="1"
              />
            ))}

            {/* Connector lines for the pushed-out 45°-family values */}
            {show !== 'none' && angles.filter(p => p.piD === 4).map((p, i) => (
              <line key={i}
                x1={CX + R * p.cosN} y1={CY - R * p.sinN}
                x2={CX + TRIG_R_45 * p.cosN} y2={CY - TRIG_R_45 * p.sinN}
                stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
                strokeDasharray="4 3"
              />
            ))}

            {/* The picked angle: radius, arc, and cos and sin as lengths on the axes. */}
            {a && (
              <g key={active} className="uc-fade" aria-hidden>
                <path d={`M ${CX} ${CY} L ${px} ${py} L ${px} ${CY} Z`} className="fill-blue-500/5 dark:fill-blue-400/10" />
                {arc && <path d={arc} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" className="uc-draw" style={{ '--len': `${AR * th + 2}` } as CSSProperties} />}
                <line x1={CX} y1={CY} x2={px} y2={CY} stroke={VALUE_COLOR.cos} strokeWidth="5" strokeLinecap="round" />
                <line x1={px} y1={CY} x2={px} y2={py} stroke={VALUE_COLOR.sin} strokeWidth="5" strokeLinecap="round" />
                {/* The radius in tan's colour: tan θ is its gradient (rise sin θ over run cos θ). */}
                <line x1={CX} y1={CY} x2={px} y2={py} stroke={VALUE_COLOR.tan} strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* Points: each one picks its angle (hover, focus or tap). */}
            {angles.map((p, i) => {
              const x = CX + R * p.cosN, y = CY - R * p.sinN
              const on = i === active
              return (
                <g
                  key={i}
                  className="uc-pt cursor-pointer outline-none"
                  style={{ '--hover-r': '9px' } as CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.radLabel}, ${p.degLabel}`}
                  aria-pressed={on}
                  onMouseEnter={() => onPick(i)}
                  onFocus={() => onPick(i)}
                  onClick={() => onPick(i)}
                >
                  <circle cx={x} cy={y} r={24} fill="transparent" />
                  <circle cx={x} cy={y} r={on ? 8 : 4.5} className={`uc-dot ${on ? 'fill-blue-600 dark:fill-blue-400' : ''}`} fill={on ? undefined : 'currentColor'} fillOpacity={on ? 1 : 0.7} />
                </g>
              )
            })}
          </svg>

          {/* ── HTML label layer ── */}
          {angles.map((p, i) => {
            const [ndx, ndy] = axisNudge(p.cosN, p.sinN)

            // Angle name label (close to dot)
            const alx = CX + LABEL_R * p.cosN + ndx
            const aly = CY - LABEL_R * p.sinN + ndy

            // Value label (further out; extra-far for the 45° family)
            const tR  = getTrigR(p.piD)
            const tlx = CX + tR * p.cosN + ndx
            const tly = CY - tR * p.sinN + ndy
            const on = i === active

            return (
              <div key={i}>
                {/* Angle / degree label */}
                <div
                  className={`absolute pointer-events-none select-none text-center leading-tight text-[10px] sm:text-[13px] transition-transform duration-200 ${on ? 'font-bold' : ''}`}
                  style={{
                    left: pct(alx), top: pct(aly),
                    transform: `translate(-50%, -50%) scale(${on ? 1.18 : 1})`,
                  }}
                >
                  {range !== 'neg' && (
                    <div className={on ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'} style={{ marginBottom: range === 'both' ? '6px' : undefined }}>
                      <Katex tex={shiftedAngleTex(p.piN, p.piD, 0)} />
                      {/* The 0 point is also the end of a full turn: label it 2π too. */}
                      {p.piN === 0 && (
                        <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[12px]">
                          <Katex tex="2\pi" />
                        </div>
                      )}
                    </div>
                  )}
                  {range !== 'pos' && (
                    <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[12px]">
                      <Katex tex={shiftedAngleTex(p.piN, p.piD, -1)} />
                    </div>
                  )}
                  {deg && (
                    <div className="text-gray-500 dark:text-gray-400 text-[8.5px] sm:text-[11px]">
                      {p.degLabel}
                    </div>
                  )}
                </div>

                {/* One value, in its function's colour */}
                {show !== 'none' && (
                  <div
                    className="absolute pointer-events-none select-none text-center text-[10.5px] sm:text-[13px] font-medium"
                    style={{
                      left: pct(tlx), top: pct(tly),
                      transform: 'translate(-50%, -50%)',
                      lineHeight: '1',
                      color: VALUE_COLOR[show],
                    }}
                  >
                    <Katex tex={valueTex(p, show)} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Table view: every angle with all three values, banded by quadrant ───────

function ValueTable({ range, deg }: { range: AngleRange; deg: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-xl mx-auto lg:mx-0">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold">
            <th scope="col" className="py-2 text-gray-500 dark:text-gray-400 font-semibold">θ</th>
            <th scope="col" className="py-2 font-semibold" style={{ color: VALUE_COLOR.cos }}>cos θ</th>
            <th scope="col" className="py-2 font-semibold" style={{ color: VALUE_COLOR.sin }}>sin θ</th>
            <th scope="col" className="py-2 font-semibold" style={{ color: VALUE_COLOR.tan }}>tan θ</th>
          </tr>
        </thead>
        <tbody>
          {angles.map((a, i) => {
            // Band by quadrant (points on an axis go with the quadrant they start), so the sign pattern shows.
            const band = Math.floor(a.deg / 90) % 2 === 1
            return (
              <tr key={i} className={`${band ? 'bg-gray-50/70 dark:bg-gray-800/30' : ''} ${a.deg % 90 === 0 && i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
                <th scope="row" className="py-1.5 font-normal text-gray-900 dark:text-gray-100">
                  {range !== 'neg' && <Katex tex={shiftedAngleTex(a.piN, a.piD, 0)} />}
                  {range === 'both' && a.piN !== 0 && <span className="text-gray-400"> , </span>}
                  {range !== 'pos' && a.piN !== 0 && <span className={range === 'both' ? 'text-gray-500 dark:text-gray-400' : ''}><Katex tex={shiftedAngleTex(a.piN, a.piD, -1)} /></span>}
                  {range === 'neg' && a.piN === 0 && <Katex tex="0" />}
                  {deg && <span className="block text-[11px] text-gray-500 dark:text-gray-400">{a.degLabel}</span>}
                </th>
                <td className="py-1.5" style={{ color: VALUE_COLOR.cos }}><Katex tex={a.cosTex} /></td>
                <td className="py-1.5" style={{ color: VALUE_COLOR.sin }}><Katex tex={a.sinTex} /></td>
                <td className="py-1.5" style={{ color: VALUE_COLOR.tan }}>{a.tanLabel === 'undef' ? <span className="text-xs">undefined</span> : <Katex tex={a.tanTex} />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
