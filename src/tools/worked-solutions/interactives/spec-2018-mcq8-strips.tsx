// 2018 Specialist Exam 2 MCQ 8 — a substitution reshapes every strip without changing its area.
// Left: the area under tan²(x)sec²(x) from 0 to π/6, cut into six strips of equal width π/36.
// Right: the same six strips after u = tan(x). Each strip is stretched sideways by about sec²(x)
// (because du/dx = sec²(x)) and squashed in height by the same factor (tan²(x)sec²(x) becomes u²),
// so each area — and the total √3/27 ≈ 0.0642 — is unchanged, and the last strip ends at
// u = tan(π/6) = 1/√3. Buttons swap in option A (u⁴ + u²: the sec²(x) kept in the height, total
// 0.0770) and option D (upper terminal left at π/6, total 0.0478, the cut-off sliver shaded red)
// to show each one failing.

import { useState, type ReactNode } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Slider, integrate } from './kit'

const XB = Math.PI / 6
const UB = 1 / Math.sqrt(3)
const N = 6
const F = (x: number) => Math.tan(x) ** 2 / Math.cos(x) ** 2
const G = (u: number) => u * u
const GA = (u: number) => u ** 4 + u * u
const XS = Array.from({ length: N + 1 }, (_, i) => (i * XB) / N)
const US = XS.map(Math.tan)
const TRUE = Math.sqrt(3) / 27 // 0.06415

type Mode = 'E' | 'A' | 'D'

/** The region under f from a to b, as a polygon. */
function under(f: (s: number) => number, a: number, b: number, m = 24): [number, number][] {
  const pts: [number, number][] = [[a, 0]]
  for (let i = 0; i <= m; i++) {
    const s = a + ((b - a) * i) / m
    pts.push([s, f(s)])
  }
  pts.push([b, 0])
  return pts
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
        active
          ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-gray-950'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'
      }`}
    >
      {children}
    </button>
  )
}

const piLabel = (v: number) => (Math.abs(v - XB) < 1e-6 ? 'π/6' : Math.abs(v - XB / 2) < 1e-6 ? 'π/12' : '')
const uLabel = (v: number) => (Math.abs(v - UB) < 1e-6 ? '1/√3' : '')
const yTick = (v: number) => v.toFixed(2)

export default function Strips() {
  const [k, setK] = useState(6)
  const [mode, setMode] = useState<Mode>('E')

  const g = mode === 'A' ? GA : G
  const uEnd = mode === 'D' ? XB : UB
  const i = k - 1
  const xa = XS[i]
  const xb = XS[i + 1]
  const ua = Math.min(US[i], uEnd)
  const ub = Math.min(US[i + 1], uEnd)
  const areaX = integrate(F, xa, xb, 400)
  const areaU = ub > ua ? integrate(g, ua, ub, 400) : 0
  const totalU = integrate(g, 0, uEnd, 2000)
  const xm = (xa + xb) / 2
  const sec2 = 1 / Math.cos(xm) ** 2
  const stripColor = (j: number) => (j === i ? C.g : j % 2 === 0 ? C.f : C.violet)

  let notice
  if (mode === 'E') {
    notice = (
      <Notice>
        Strip {k} is <M>{'\\tfrac{\\pi}{36}'}</M> wide in <M>x</M> but <M>{(ub - ua).toFixed(3)}</M> wide in <M>u</M>:
        stretched by about <M>{`\\sec^2(x) \\approx ${sec2.toFixed(2)}`}</M>, because <M>{'u = \\tan(x)'}</M> grows at
        rate <M>{'\\tfrac{du}{dx} = \\sec^2(x)'}</M>. Its height is divided by that same factor, from{' '}
        <M>{'\\tan^2(x)\\sec^2(x)'}</M> down to <M>{'u^2 = \\tan^2(x)'}</M>, so the area is unchanged. That is all{' '}
        <M>{'\\sec^2(x)\\,dx = du'}</M> says. Slide through the strips, then try options A and D.
      </Notice>
    )
  } else if (mode === 'A') {
    notice = (
      <Notice tone="warn">
        Option A rewrites the whole integrand in <M>u</M>, <M>{'\\tan^2(x)\\sec^2(x) = u^2(1+u^2)'}</M>, but its strips
        still sit on the stretched <M>u</M>-widths. Every strip is now about <M>{'\\sec^2(x)'}</M> times too tall, so
        the total is <M>{totalU.toFixed(4)}</M>, not <M>{TRUE.toFixed(4)}</M>. The <M>{'\\sec^2(x)'}</M> belongs in{' '}
        <M>du</M>, not in the height.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Option D converts the integrand but leaves the top terminal at <M>{'\\tfrac{\\pi}{6} \\approx 0.524'}</M>. The
        strips now live on the <M>u</M>-axis, where the last one ends at{' '}
        <M>{'\\tan\\left(\\tfrac{\\pi}{6}\\right) = \\tfrac{1}{\\sqrt3} \\approx 0.577'}</M>, so D cuts off the red sliver
        of strip 6: <M>{totalU.toFixed(4)}</M> instead of <M>{TRUE.toFixed(4)}</M>. The terminals have to be{' '}
        <M>u</M>-values too.
      </Notice>
    )
  }

  const caption = 'text-[12.5px] text-center text-gray-600 dark:text-gray-400 mb-1'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className={caption}>
            In <M>x</M>: <M>{'\\tan^2(x)\\sec^2(x)'}</M>, <M>{'0 \\le x \\le \\tfrac{\\pi}{6}'}</M>
          </div>
          <Plane x={[0, 0.62]} y={[0, 0.5]} xStep={XB / 2} yStep={0.1} height={240} xLabels={piLabel} yLabels={yTick} xLabel="x" yLabel="">
            {XS.slice(0, N).map((a, j) => (
              <Polygon
                key={j}
                points={under(F, a, XS[j + 1])}
                color={stripColor(j)}
                fillOpacity={j === i ? 0.75 : 0.22}
                weight={1}
              />
            ))}
            <Plot.OfX y={F} domain={[0, 0.62]} color={C.f} weight={2.5} />
          </Plane>
        </div>
        <div>
          <div className={caption}>
            In <M>{'u = \\tan(x)'}</M>: <M>{mode === 'A' ? 'u^4 + u^2' : 'u^2'}</M>,{' '}
            <M>{mode === 'D' ? '0 \\le u \\le \\tfrac{\\pi}{6}' : '0 \\le u \\le \\tfrac{1}{\\sqrt3}'}</M>
          </div>
          <Plane x={[0, 0.62]} y={[0, 0.5]} xStep={UB / 2} yStep={0.1} height={240} xLabels={uLabel} yLabels={yTick} xLabel="u" yLabel="">
            {US.slice(0, N).map((a, j) => {
              const b = Math.min(US[j + 1], uEnd)
              if (b <= a) return null
              return (
                <Polygon
                  key={j}
                  points={under(g, a, b)}
                  color={mode === 'A' ? (j === i ? C.g : C.bad) : stripColor(j)}
                  fillOpacity={j === i ? 0.75 : 0.22}
                  weight={1}
                />
              )
            })}
            <Plot.OfX y={g} domain={[0, 0.62]} color={mode === 'A' ? C.bad : C.f} weight={2.5} />
            {mode === 'A' && <Plot.OfX y={G} domain={[0, 0.62]} color={C.f} weight={1.5} style="dashed" />}
            {mode === 'D' && (
              <>
                <Line.Segment point1={[XB, 0]} point2={[XB, 0.42]} color={C.bad} weight={2} />
                <Label at={[XB, 0.42]} attach="n" color={C.bad} size={12}>
                  π/6
                </Label>
                <Polygon points={under(G, XB, UB, 8)} color={C.bad} fillOpacity={0.35} weight={1.5} />
                <Line.Segment point1={[UB, 0]} point2={[UB, G(UB)]} color={C.good} weight={2} style="dashed" />
              </>
            )}
          </Plane>
        </div>
      </div>
      <Controls>
        <Slider label="\text{strip}" value={k} onChange={v => setK(Math.round(v))} min={1} max={N} step={1} format={v => `${Math.round(v)} of ${N}`} />
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-gray-600 dark:text-gray-400">
          <span>Integral in <M>u</M>:</span>
          <Choice active={mode === 'E'} onClick={() => setMode('E')}>E (correct)</Choice>
          <Choice active={mode === 'A'} onClick={() => setMode('A')}>A: u⁴ + u²</Choice>
          <Choice active={mode === 'D'} onClick={() => setMode('D')}>D: keep π/6</Choice>
        </div>
        <Readouts>
          <Readout color={C.g} tex={`\\text{strip ${k} in } x:\\ ${areaX.toFixed(4)}`} />
          <Readout color={mode === 'E' ? C.g : C.bad} tex={`\\text{strip ${k} in } u:\\ ${areaU.toFixed(4)}`} />
          <Readout color={C.f} tex={`\\int_0^{\\pi/6}\\tan^2(x)\\sec^2(x)\\,dx \\approx ${TRUE.toFixed(4)}`} />
          <Readout color={mode === 'E' ? C.good : C.bad} tex={`\\text{option ${mode}} \\approx ${totalU.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
