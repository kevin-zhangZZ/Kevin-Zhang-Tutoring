import { useState } from 'react'
import { angles, shiftedAngleTex } from './data'
import Katex from '../../components/Katex'

type AngleRange = 'pos' | 'neg' | 'both'

// ── SVG geometry ────────────────────────────────────────────────────────────
const VB = 760          // viewBox size (square)
const CX = 380          // circle center x
const CY = 380          // circle center y
const R  = 220          // circle radius

// Label positions (as fractions of VB, converted to % for CSS)
const LABEL_R    = 254  // angle name label radius
// 45°-family angles (π/4, 3π/4, 5π/4, 7π/4) are between two 15°-gap neighbours,
// so we push their trig-value block further out to prevent overlap.
const TRIG_R_STD = 305  // trig values radius — standard
const TRIG_R_45  = 395  // trig values radius — 45° family (pushed out)

const SIN_COLOR = '#e879a0'
const COS_COLOR = '#38bdf8'
const TAN_COLOR = '#34d399'

function pct(v: number) { return `${((v / VB) * 100).toFixed(3)}%` }

function getTrigR(piD: number) { return piD === 4 ? TRIG_R_45 : TRIG_R_STD }

// Nudge angle labels off the axis lines for the 4 cardinal angles
function axisNudge(cosN: number, sinN: number): [number, number] {
  const EPS = 0.05
  if (Math.abs(sinN) < EPS) return [0, -18]  // on x-axis → up
  if (Math.abs(cosN) < EPS) return [14,   0] // on y-axis → right
  return [0, 0]
}

// ── Toggle switch ───────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  accentColor?: string
}

function Toggle({ checked, onChange, label, accentColor }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        role="switch" aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-4' : ''}`} />
      </button>
      <span
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
        style={accentColor && checked ? { color: accentColor } : undefined}
      >
        {label}
      </span>
    </label>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

export default function MemorizationMode() {
  const [range,   setRange]   = useState<AngleRange>('pos')
  const [showSin, setShowSin] = useState(false)
  const [showCos, setShowCos] = useState(false)
  const [showTan, setShowTan] = useState(false)
  const [showDeg, setShowDeg] = useState(false)

  const hasTrig = showSin || showCos || showTan

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Controls */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="flex flex-wrap gap-6 items-start">
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">Angle Range</p>
            <div className="flex gap-1">
              {(['pos', 'neg', 'both'] as AngleRange[]).map(opt => (
                <button key={opt} onClick={() => setRange(opt)}
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

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Show Values</p>
              <button
                onClick={() => { setShowSin(false); setShowCos(false); setShowTan(false); setShowDeg(false) }}
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Hide all
              </button>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              <Toggle checked={showSin} onChange={setShowSin} label="sin" accentColor={SIN_COLOR} />
              <Toggle checked={showCos} onChange={setShowCos} label="cos" accentColor={COS_COLOR} />
              <Toggle checked={showTan} onChange={setShowTan} label="tan" accentColor={TAN_COLOR} />
              <Toggle checked={showDeg} onChange={setShowDeg} label="degrees" />
            </div>
          </div>
        </div>
      </div>

      {/* Circle — SVG for geometry, HTML divs for labels */}
      <div className="w-full max-w-3xl">
        {/* Outer padding lets edge labels breathe */}
        <div className="px-14 py-12">
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

              {/* Connector lines for the pushed-out 45°-family trig blocks */}
              {hasTrig && angles.filter(a => a.piD === 4).map((a, i) => {
                const dotX = CX + R * a.cosN
                const dotY = CY - R * a.sinN
                const [ndx, ndy] = axisNudge(a.cosN, a.sinN)
                const tlx = CX + TRIG_R_45 * a.cosN + ndx
                const tly = CY - TRIG_R_45 * a.sinN + ndy
                return (
                  <line key={i}
                    x1={dotX} y1={dotY} x2={tlx} y2={tly}
                    stroke="currentColor" strokeOpacity="0.12" strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                )
              })}

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

              // Trig values block (further out; extra-far for 45° family)
              const tR  = getTrigR(a.piD)
              const tlx = CX + tR * a.cosN + ndx
              const tly = CY - tR * a.sinN + ndy

              return (
                <div key={i}>
                  {/* Angle / degree label */}
                  <div
                    className="absolute pointer-events-none select-none text-center leading-tight"
                    style={{
                      left: pct(alx), top: pct(aly),
                      transform: 'translate(-50%, -50%)',
                      fontSize: '13px',
                    }}
                  >
                    {range !== 'neg' && (
                      <div className="text-gray-800 dark:text-gray-200">
                        <Katex tex={shiftedAngleTex(a.piN, a.piD, 0)} />
                      </div>
                    )}
                    {range !== 'pos' && (
                      <div className="text-gray-500 dark:text-gray-400" style={{ fontSize: '12px' }}>
                        <Katex tex={shiftedAngleTex(a.piN, a.piD, -1)} />
                      </div>
                    )}
                    {showDeg && (
                      <div className="text-gray-400 dark:text-gray-500" style={{ fontSize: '11px' }}>
                        {a.degLabel}
                      </div>
                    )}
                  </div>

                  {/* Trig values block */}
                  {hasTrig && (
                    <div
                      className="absolute pointer-events-none select-none text-center"
                      style={{
                        left: pct(tlx), top: pct(tly),
                        transform: 'translate(-50%, -50%)',
                        fontSize: '13px',
                        lineHeight: '1',
                      }}
                    >
                      {showCos && (
                        <div style={{ color: COS_COLOR, marginBottom: '4px' }}>
                          <Katex tex={a.cosTex} />
                        </div>
                      )}
                      {showSin && (
                        <div style={{ color: SIN_COLOR, marginBottom: '4px' }}>
                          <Katex tex={a.sinTex} />
                        </div>
                      )}
                      {showTan && (
                        <div style={{ color: TAN_COLOR }}>
                          <Katex tex={a.tanTex} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      {hasTrig && (
        <div className="flex gap-5 text-sm pb-2">
          {showCos && <span style={{ color: COS_COLOR }} className="font-medium">● cos</span>}
          {showSin && <span style={{ color: SIN_COLOR }} className="font-medium">● sin</span>}
          {showTan && <span style={{ color: TAN_COLOR }} className="font-medium">● tan</span>}
        </div>
      )}
    </div>
  )
}
