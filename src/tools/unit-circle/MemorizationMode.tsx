import { angles, shiftedAngleTex, type AngleData } from './data'
import Katex from '../../components/Katex'
import { useStoredState } from './storage'

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

// ── Toggle switch ───────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        role="switch" aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-4' : ''}`} />
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  )
}

function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T
  options: Array<{ id: T; label: string; color?: string }>
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div className="flex gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 w-fit" role="radiogroup" aria-label={label}>
      {options.map(o => {
        const on = value === o.id
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              on ? 'bg-white dark:bg-gray-900 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            style={on ? { color: o.color ?? undefined } : undefined}
          >
            <span className={on && !o.color ? 'text-gray-900 dark:text-white' : ''}>{o.label}</span>
          </button>
        )
      })}
    </div>
  )
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
      {/* Controls — beside the circle on laptops, above it on phones */}
      <div className="w-full lg:w-72 lg:flex-none bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-wrap lg:flex-col gap-5">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-2">View</p>
          <Segmented label="View" value={view} onChange={v => set({ view: v })} options={[{ id: 'circle', label: 'Circle' }, { id: 'table', label: 'Table' }]} />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-2">Angle Range</p>
          <div className="flex gap-1">
            {(['pos', 'neg', 'both'] as AngleRange[]).map(opt => (
              <button key={opt} onClick={() => set({ range: opt })}
                aria-pressed={range === opt}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  range === opt
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {opt === 'pos' ? '[0, 2π]' : opt === 'neg' ? '[−2π, 0]' : '[−2π, 2π]'}
              </button>
            ))}
          </div>
        </div>

        {view === 'circle' && (
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wider mb-2">Show Values</p>
            <Segmented
              label="Show values"
              value={show}
              onChange={v => set({ show: v })}
              options={[
                { id: 'none', label: 'None' },
                { id: 'cos', label: 'cos', color: VALUE_COLOR.cos },
                { id: 'sin', label: 'sin', color: VALUE_COLOR.sin },
                { id: 'tan', label: 'tan', color: VALUE_COLOR.tan },
              ]}
            />
          </div>
        )}

        <div className="self-end lg:self-auto">
          <Toggle checked={deg} onChange={v => set({ deg: v })} label="Degrees" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {view === 'circle' ? <Circle range={range} show={show} deg={deg} /> : <ValueTable range={range} deg={deg} />}
      </div>
    </div>
  )
}

// ── Circle view: angle labels always, plus one set of values at a time ──────

function Circle({ range, show, deg }: { range: AngleRange; show: ShowValue; deg: boolean }) {
  return (
    // On laptops the circle is sized to the screen height, so all of it fits without scrolling.
    <div className="w-full max-w-3xl lg:max-w-[calc(100vh-170px)] mx-auto">
      {/* Outer padding lets edge labels breathe — tighter on mobile so the
          circle itself gets more of the narrow viewport. */}
      <div className="px-4 py-6 sm:px-12 sm:py-10">
        <div className="relative" style={{ aspectRatio: '1', overflow: 'visible' }}>

          {/* ── SVG layer (circle, axes, dots) ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${VB} ${VB}`}
            style={{ overflow: 'visible' }}
          >
            {/* Axes */}
            <line x1={40} y1={CY} x2={VB - 40} y2={CY} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
            <line x1={CX} y1={40} x2={CX} y2={VB - 40} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />

            {/* Circle */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />

            {/* Faint radius spokes */}
            {angles.map((a, i) => (
              <line key={i}
                x1={CX} y1={CY}
                x2={CX + R * a.cosN} y2={CY - R * a.sinN}
                stroke="currentColor" strokeOpacity="0.05" strokeWidth="1"
              />
            ))}

            {/* Connector lines for the pushed-out 45°-family values */}
            {show !== 'none' && angles.filter(a => a.piD === 4).map((a, i) => (
              <line key={i}
                x1={CX + R * a.cosN} y1={CY - R * a.sinN}
                x2={CX + TRIG_R_45 * a.cosN} y2={CY - TRIG_R_45 * a.sinN}
                stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
                strokeDasharray="4 3"
              />
            ))}

            {/* Dots */}
            {angles.map((a, i) => (
              <circle key={i}
                cx={CX + R * a.cosN} cy={CY - R * a.sinN}
                r={4} fill="currentColor" fillOpacity="0.7"
              />
            ))}
          </svg>

          {/* ── HTML label layer ── */}
          {angles.map((a, i) => {
            const [ndx, ndy] = axisNudge(a.cosN, a.sinN)

            // Angle name label (close to dot)
            const alx = CX + LABEL_R * a.cosN + ndx
            const aly = CY - LABEL_R * a.sinN + ndy

            // Value label (further out; extra-far for the 45° family)
            const tR  = getTrigR(a.piD)
            const tlx = CX + tR * a.cosN + ndx
            const tly = CY - tR * a.sinN + ndy

            return (
              <div key={i}>
                {/* Angle / degree label */}
                <div
                  className="absolute pointer-events-none select-none text-center leading-tight text-[10px] sm:text-[13px]"
                  style={{
                    left: pct(alx), top: pct(aly),
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {range !== 'neg' && (
                    <div className="text-gray-800 dark:text-gray-200" style={{ marginBottom: range === 'both' ? '6px' : undefined }}>
                      <Katex tex={shiftedAngleTex(a.piN, a.piD, 0)} />
                      {/* The 0 point is also the end of a full turn — label it 2π too. */}
                      {a.piN === 0 && (
                        <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[12px]">
                          <Katex tex="2\pi" />
                        </div>
                      )}
                    </div>
                  )}
                  {range !== 'pos' && (
                    <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[12px]">
                      <Katex tex={shiftedAngleTex(a.piN, a.piD, -1)} />
                    </div>
                  )}
                  {deg && (
                    <div className="text-gray-400 dark:text-gray-500 text-[8.5px] sm:text-[11px]">
                      {a.degLabel}
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
                    <Katex tex={valueTex(a, show)} />
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
                  {deg && <span className="block text-[11px] text-gray-400 dark:text-gray-500">{a.degLabel}</span>}
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
