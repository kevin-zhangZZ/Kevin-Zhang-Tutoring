// 2018 Methods Exam 2 Q4c.iii — why the least n is 39. Bars are Bi(n, 0.1587) against the count
// X. Since P̂ₙ = X/n, the condition P̂ₙ > 1/n is X > 1 for every n: the cut-off never moves in
// count terms, it is always "at least two people". The red bars (X = 0 and X = 1) are the samples
// that fail; as n grows the distribution slides right and the red tail Pr(X ≤ 1) shrinks, first
// dropping below 0.01 at n = 39 (0.01149 at n = 38, 0.00989 at n = 39). A toggle shows the report's
// n = 27 mistake: letting X = 1 count as a success, so only Pr(X = 0) has to drop below 0.01.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const P = 0.1587
const XMAX = 16

function pmf(n: number, k: number) {
  let c = 1
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i
  return c * P ** k * (1 - P) ** (n - k)
}

export default function LeastN() {
  const [n, setN] = useState(20)
  const [mistake, setMistake] = useState(false)

  const bars = Array.from({ length: XMAX + 1 }, (_, k) => pmf(n, k))
  const failTop = mistake ? 0 : 1 // bars 0..failTop fail
  const fail = bars.slice(0, failTop + 1).reduce((a, b) => a + b, 0)
  const ok = fail < 0.01
  const meterMax = 0.05
  const meterPct = Math.min(100, (fail / meterMax) * 100)

  let notice
  if (mistake) {
    notice = (
      <Notice tone="warn">
        This counts <M>X = 1</M> as a success, i.e. it solves <M>{'\\Pr(X\\ge1)>0.99'}</M>. But one person gives{' '}
        <M>{'\\hat P_n = \\tfrac1n'}</M> exactly, which is <b>not greater than</b> <M>{'\\tfrac1n'}</M>. Only{' '}
        <M>{'\\Pr(X=0)'}</M> has to shrink, so it passes <M>0.01</M> much sooner, at <M>n = 27</M>: the report&apos;s
        common wrong answer. Turn this off and find the real least <M>n</M>.
      </Notice>
    )
  } else if (n === 38) {
    notice = (
      <Notice tone="warn">
        <M>{`\\Pr(X\\le1) = ${fail.toFixed(5)}`}</M>: just <b>above</b> <M>0.01</M>, so <M>n = 38</M> is not enough.
        One more person&hellip;
      </Notice>
    )
  } else if (n === 39) {
    notice = (
      <Notice tone="good">
        <M>{`\\Pr(X\\le1) = ${fail.toFixed(5)} < 0.01`}</M> for the first time, so{' '}
        <M>{'\\Pr(\\hat P_n > \\tfrac1n) > 0.99'}</M>. With <M>n = 38</M> failing and <M>n = 39</M> working, the least
        value is <b><M>n = 39</M></b>.
      </Notice>
    )
  } else if (n > 39) {
    notice = (
      <Notice tone="good">
        Any larger sample also works, since the red tail keeps shrinking, but the question asks for the{' '}
        <b>least</b> <M>n</M>. Step back down to <M>38</M> and <M>39</M> to see where it switches.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\hat P_n > \\tfrac1n'}</M> means <M>{'\\tfrac Xn > \\tfrac1n'}</M>, i.e. <b><M>X &gt; 1</M></b>. The cut-off
        stays between <M>X = 1</M> and <M>X = 2</M> whatever <M>n</M> is. The red bars (nobody, or exactly one person) are the samples that
        fail, and they must total under <M>0.01</M>. Increase <M>n</M>: the bars slide right, away from the cut, and
        the red tail shrinks.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.6, XMAX + 1]} y={[0, 0.34]} xStep={2} yStep={0.1} height={290} xLabel="x" yLabel="" xLabels={v => (v < 0 || v > XMAX ? '' : String(Math.round(v)))} yLabels={false}>
        {bars.map((pr, k) => (
          <Polygon
            key={k}
            points={[[k - 0.4, 0], [k + 0.4, 0], [k + 0.4, pr], [k - 0.4, pr]]}
            color={k <= failTop ? C.bad : C.good}
            fillOpacity={k <= failTop ? 0.6 : 0.4}
            weight={1.5}
          />
        ))}
        <Line.Segment point1={[failTop + 0.5, 0]} point2={[failTop + 0.5, 0.32]} color={C.ink} style="dashed" weight={1.5} />
        <Label at={[failTop + 0.5, 0.32]} attach="e" size={12}>
          {mistake ? 'pass: X ≥ 1' : 'pass: X ≥ 2 (p̂ > 1/n)'}
        </Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={12} max={45} step={1} format={v => String(Math.round(v))} />
        <div className="text-[12.5px] text-gray-600 dark:text-gray-300">
          <div className="flex justify-between">
            <span>
              Red tail {mistake ? 'Pr(X = 0)' : 'Pr(X ≤ 1)'} against the 0.01 limit
            </span>
            <span className={ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
              {fail.toFixed(5)} {ok ? '< 0.01 ✓' : '> 0.01 ✗'}
            </span>
          </div>
          <div className="relative mt-1 h-3 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}
              style={{ width: `${meterPct}%` }}
            />
            <div className="absolute inset-y-0 w-0.5 bg-gray-900 dark:bg-white" style={{ left: `${(0.01 / meterMax) * 100}%` }} />
          </div>
          <div className="relative h-4 text-[11px]">
            <span className="absolute -translate-x-1/2" style={{ left: `${(0.01 / meterMax) * 100}%` }}>0.01</span>
            <span className="absolute right-0">0.05+</span>
          </div>
        </div>
        <Buttons>
          <Toggle label="Let X = 1 count as a pass (the n = 27 mistake)" checked={mistake} onChange={setMistake} />
        </Buttons>
        <Readouts>
          <Readout color={C.bad} tex={`${mistake ? '\\Pr(X=0)' : '\\Pr(X\\le1)'} = ${fail.toFixed(5)}`} />
          <Readout color={C.good} tex={`${mistake ? '\\Pr(X\\ge1)' : '\\Pr(X\\ge2)'} = ${(1 - fail).toFixed(5)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
