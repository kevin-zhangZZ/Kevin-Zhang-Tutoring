// 2021 Methods Exam 2 Q5g — why the greatest possible minimum of g_a(x) = sin(x/a) + cos(ax) is
// −√2, not −2. Click a = 1 … 5: each graph is drawn over one full period [0, 2aπ] with its lowest
// point (minima −1.414, −1.722, −1.985, −1.981, −1.998, found numerically here and checked with
// scipy) above the red line y = −2. A toggle draws the two waves: at the only trough of sin(x/a) in
// the period, x = 3aπ/2, cos(ax) = cos(3a²π/2) is 0 (odd a) or 1 (even a), never −1, so −2 is a
// bound (part f) that is never reached, and the highest minimum is a = 1's −√2.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, num, tick } from './kit'

const AS = [1, 2, 3, 4, 5]
const Y = 2.3

/** Tick numbers as multiples of π. */
function piTick(v: number): string {
  const k = v / Math.PI
  const r = Math.round(k)
  if (Math.abs(k - r) < 1e-6) return r === 1 ? 'π' : `${r}π`
  const h = Math.round(2 * k)
  if (Math.abs(2 * k - h) < 1e-6) return h === 1 ? 'π/2' : `${h}π/2`
  return ''
}

/** The lowest point of g_a over one period [0, 2aπ]: a dense scan, then golden-section refinement. */
function lowest(a: number): [number, number] {
  const g = (x: number) => Math.sin(x / a) + Math.cos(a * x)
  const L = 2 * a * Math.PI
  const N = 4000 * a
  let bi = 0
  let bv = Infinity
  for (let i = 0; i <= N; i++) {
    const v = g((L * i) / N)
    if (v < bv) {
      bv = v
      bi = i
    }
  }
  let lo = (L * Math.max(0, bi - 1)) / N
  let hi = (L * Math.min(N, bi + 1)) / N
  for (let k = 0; k < 60; k++) {
    const m1 = lo + (hi - lo) * 0.382
    const m2 = lo + (hi - lo) * 0.618
    if (g(m1) < g(m2)) hi = m2
    else lo = m1
  }
  const x = (lo + hi) / 2
  return [x, g(x)]
}

const LOWEST = AS.map(lowest)

export default function GreatestMinimum() {
  const [a, setA] = useState(2)
  const [waves, setWaves] = useState(false)

  const g = (x: number) => Math.sin(x / a) + Math.cos(a * x)
  const L = 2 * a * Math.PI
  const [xMin, yMin] = LOWEST[a - 1]
  const xT = (3 * a * Math.PI) / 2
  const cosT = a % 2 === 0 ? 1 : 0
  const xStep = a === 1 ? Math.PI / 2 : a === 2 ? Math.PI : 2 * Math.PI

  let notice
  if (waves) {
    notice = (
      <Notice>
        In one period the violet wave <M>{'\\sin\\left(\\tfrac xa\\right)'}</M> reaches <M>-1</M> only at{' '}
        <M>{`x = \\tfrac{3a\\pi}{2} = ${piTick(xT)}`}</M>, and there the orange wave is at{' '}
        <M>{`\\cos\\left(\\tfrac{3a^2\\pi}{2}\\right) = ${cosT}`}</M>, never <M>-1</M> (it is 0 for every odd <M>a</M>, 1
        for every even <M>a</M>). The two troughs never line up, so <M>g_a</M> never reaches <M>-2</M>: that is only the
        bound from part f. The answer is the highest of the minima, <M>{'-\\sqrt2'}</M> at <M>a = 1</M>.
      </Notice>
    )
  } else if (a === 1) {
    notice = (
      <Notice tone="good">
        With <M>a = 1</M> both waves have period <M>2\pi</M>: <M>{'g_1(x) = \\sin x + \\cos x'}</M> bottoms out at{' '}
        <M>{'x = \\tfrac{5\\pi}{4}'}</M>, where both parts equal <M>{'-\\tfrac{\\sqrt2}{2}'}</M>, so its minimum is exactly{' '}
        <M>{'-\\sqrt2 \\approx -1.414'}</M>. That is the highest value in the row of minima below; every other <M>a</M>{' '}
        bottoms out lower. So the greatest possible minimum is <M>{'-\\sqrt2'}</M>, given exactly.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With <M>{`a = ${a}`}</M> the minimum is <M>{num(yMin, 3)}</M>
        {a === 2 ? <>, the value from part b (this is <M>f</M>),</> : <>: close to <M>-2</M>, but</>} still above the red
        line. Reaching <M>-2</M> would need <M>{'\\sin\\left(\\tfrac xa\\right) = -1'}</M> and <M>{'\\cos(ax) = -1'}</M> at
        the same <M>x</M>. Turn on &ldquo;Show the two waves&rdquo; to see why that never happens, then click{' '}
        <M>a = 1</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, L]}
        y={[-Y, Y]}
        xStep={xStep}
        yStep={1}
        height={300}
        xLabels={piTick}
        yLabels={v => (Math.abs(v + 2) < 1e-9 ? '' : tick(v))}
      >
        <Line.Segment point1={[0, -2]} point2={[L, -2]} color={C.bad} style="dashed" weight={2} />
        <Label at={[L, -2]} attach="sw" color={C.bad}>y = −2</Label>
        <Line.Segment point1={[0, yMin]} point2={[L, yMin]} color={C.good} style="dashed" weight={1.5} />
        {waves && (
          <>
            <Plot.OfX y={x => Math.sin(x / a)} domain={[0, L]} color={C.violet} weight={2.5} style="dashed" />
            <Plot.OfX y={x => Math.cos(a * x)} domain={[0, L]} color={C.g} weight={1.5} opacity={0.7} />
            <Line.Segment point1={[xT, -Y]} point2={[xT, Y]} color={C.guide} style="dashed" weight={1.5} />
          </>
        )}
        <Plot.OfX y={g} domain={[0, L]} color={C.f} weight={2.5} />
        {waves && (
          <>
            <Point x={xT} y={-1} color={C.violet} />
            <Point x={xT} y={cosT} color={C.g} />
          </>
        )}
        <Point x={xMin} y={yMin} color={C.good} />
      </Plane>
      <Controls>
        <div>
          <div className="text-[12.5px] font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
            Minimum of <Katex tex="g_a" /> for Each <Katex tex="a" /> (Click to Graph)
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {AS.map((v, i) => {
              const on = v === a
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setA(v)}
                  aria-pressed={on}
                  className={`rounded-xl border px-1 py-1.5 text-center transition-colors ${
                    on
                      ? 'border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950/60'
                      : 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-[12px] text-gray-600 dark:text-gray-300">
                    <Katex tex={`a = ${v}`} />
                  </div>
                  <div
                    className={`text-[13px] font-semibold tabular-nums ${
                      v === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {num(LOWEST[i][1], 3)}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        <Buttons>
          <Toggle label="Show the two waves" checked={waves} onChange={setWaves} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.good}
            tex={a === 1 ? '\\min g_1 = -\\sqrt2 \\approx -1.414' : `\\min g_{${a}} \\approx ${num(yMin, 3)}`}
          />
          {waves && <Readout color={C.violet} tex={`\\sin\\left(\\tfrac xa\\right) = -1 \\text{ at } x = ${piTick(xT)}`} />}
          {waves && <Readout color={C.g} tex={`\\cos(ax) = \\cos\\left(\\tfrac{3a^2\\pi}{2}\\right) = ${cosT} \\text{ there}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
