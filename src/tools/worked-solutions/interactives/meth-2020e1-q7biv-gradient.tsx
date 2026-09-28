// 2020 Methods Exam 1 Q7b.iv — the report's most common error was using the value of a as the
// tangent's gradient. Pick a = 4 or a = −2 (from b.iii): the green line through P(1, 0) with
// gradient f′(a) = 2a + 3 touches f(x) = x² + 3x + 5 exactly once, at Q (a double root:
// (x − 4)² = 0 or (x + 2)² = 0). Turn on the mistake and the red line y = a(x − 1) appears: with
// a = 4 it never meets the parabola (x² − x + 9 = 0, Δ = −35); with a = −2 it cuts it twice
// (x² + 5x + 3 = 0, Δ = 13, at x = (−5 ± √13)/2). Each choice of a has its own view, since the two
// points of contact, (4, 33) and (−2, 3), are far apart. Not to scale.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, tick } from './kit'

const f = (x: number) => x * x + 3 * x + 5

type Case = {
  a: 4 | -2
  x: [number, number]
  y: [number, number]
  yStep: number
  m: number
  good: string
  meets: string
  bad: string
  badMeets: string
  /** Where the wrong line meets the parabola (none for a = 4). */
  crossings: number[]
  /** Label positions: the green line, the red line, and the curve's name. */
  goodAt: [number, number]
  badAt: [number, number]
  fAt: number
  fAttach: 'e' | 'sw'
}

const CASES: Record<'4' | '-2', Case> = {
  '4': {
    a: 4,
    x: [-3, 6],
    y: [-5, 40],
    yStep: 5,
    m: 11,
    good: 'y = 11x - 11',
    meets: 'x^2 - 8x + 16 = (x-4)^2 = 0\\text{: touches once}',
    bad: 'y = 4x - 4',
    badMeets: 'x^2 - x + 9 = 0,\\ \\Delta = -35\\text{: misses}',
    crossings: [],
    goodAt: [5 / 11, -6],
    badAt: [5.3, 4 * 5.3 - 4],
    fAt: -2.6,
    fAttach: 'sw',
  },
  '-2': {
    a: -2,
    x: [-5, 3],
    y: [-2, 12],
    yStep: 2,
    m: -1,
    good: 'y = 1 - x',
    meets: 'x^2 + 4x + 4 = (x+2)^2 = 0\\text{: touches once}',
    bad: 'y = 2 - 2x',
    badMeets: 'x^2 + 5x + 3 = 0,\\ \\Delta = 13\\text{: crosses twice}',
    crossings: [(-5 - Math.sqrt(13)) / 2, (-5 + Math.sqrt(13)) / 2],
    goodAt: [-3, 1 + 3],
    badAt: [-3.2, 2 - 2 * -3.2],
    fAt: 0.9,
    fAttach: 'e',
  },
}

export default function GradientNotA() {
  const [which, setWhich] = useState<'4' | '-2'>('4')
  const [wrong, setWrong] = useState(false)
  const c = CASES[which]
  const qa = c.a
  const fa = f(qa)

  let notice
  if (!wrong && qa === 4) {
    notice = (
      <Notice tone="good">
        Q is <M>(4, 33)</M>, and the tangent there has gradient <M>f&apos;(4) = 2(4) + 3 = 11</M>, so the line through P is{' '}
        <M>y = 11(x - 1)</M>. It meets the parabola only at Q: solving <M>11x - 11 = x^2 + 3x + 5</M> gives{' '}
        <M>(x - 4)^2 = 0</M>, a double root. Meeting exactly once is the test of a tangent to a parabola. Now turn on the
        common mistake.
      </Notice>
    )
  } else if (!wrong) {
    notice = (
      <Notice tone="good">
        Q is <M>(-2, 3)</M>, and the gradient there is <M>f&apos;(-2) = 2(-2) + 3 = -1</M>, so the line through P is{' '}
        <M>y = -(x - 1) = 1 - x</M>. It meets the parabola only at Q: <M>1 - x = x^2 + 3x + 5</M> gives{' '}
        <M>(x + 2)^2 = 0</M>. Now turn on the common mistake.
      </Notice>
    )
  } else if (qa === 4) {
    notice = (
      <Notice tone="warn">
        The red line uses <M>a = 4</M> as its gradient: <M>y = 4(x - 1)</M>. It is far too shallow, and it never reaches
        the parabola at all: <M>4x - 4 = x^2 + 3x + 5</M> gives <M>x^2 - x + 9 = 0</M>, and <M>\Delta = -35 &lt; 0</M>.
        The value <M>a = 4</M> says <i>where</i> the tangent touches (at <M>x = 4</M>), not how steep it is. The steepness
        there is <M>f&apos;(4) = 11</M>. Try <M>a = -2</M> as well.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Using <M>a = -2</M> as the gradient gives <M>y = -2(x - 1) = 2 - 2x</M>. It is too steep, so it cuts right through
        the parabola at two points (<M>x^2 + 5x + 3 = 0</M> has <M>\Delta = 13 &gt; 0</M>). A line that crosses a parabola
        twice is not a tangent. The gradient comes from <M>f&apos;(a)</M>, never from <M>a</M> itself.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        key={which}
        x={c.x}
        y={c.y}
        xStep={1}
        yStep={c.yStep}
        height={320}
        xLabels={v => (Math.abs(v - 1) < 1e-9 ? '' : tick(v))}
        yLabels={v => (Math.abs(v % (2 * c.yStep)) < 1e-9 ? tick(v) : '')}
      >
        <Plot.OfX y={f} domain={[c.x[0] - 1, c.x[1] + 1]} color={C.f} weight={3} />
        <Label at={[c.fAt, f(c.fAt)]} color={C.f} attach={c.fAttach}>f</Label>
        <Line.PointSlope point={[1, 0]} slope={c.m} color={C.good} weight={3} />
        <Label at={c.goodAt} color={C.good} attach={qa === 4 ? 'e' : 'sw'} gap={qa === 4 ? 7 : 8}>{c.good.replace(/-/g, '−')}</Label>
        {wrong && (
          <>
            <Line.PointSlope point={[1, 0]} slope={qa} color={C.bad} style="dashed" weight={2.5} />
            <Label at={c.badAt} color={C.bad} attach={qa === 4 ? 'nw' : 'e'}>{c.bad.replace(/-/g, '−')}</Label>
            {c.crossings.map(x => (
              <Point key={x} x={x} y={f(x)} color={C.bad} />
            ))}
          </>
        )}
        <Point x={1} y={0} color={C.ink} />
        <Label at={[1, 0]} attach="s" gap={8}>P</Label>
        <Point x={qa} y={fa} color={C.good} />
        <Label at={[qa, fa]} color={C.good} attach={qa === 4 ? 'nw' : 'sw'} gap={qa === 4 ? 9 : 14}>{qa === 4 ? 'Q(4, 33)' : 'Q(−2, 3)'}</Label>
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">Not to scale.</p>
      <Controls>
        <Buttons>
          <Toggle label="a = 4" checked={which === '4'} onChange={() => setWhich('4')} />
          <Toggle label="a = −2" checked={which === '-2'} onChange={() => setWhich('-2')} />
          <Toggle label="What if I use a as the gradient?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{gradient } f'(${qa}) = ${c.m}\\text{: } ${c.good}`} />
          <Readout color={C.good} tex={c.meets} />
          {wrong && <Readout color={C.bad} tex={`\\text{gradient } {${qa}}\\text{: } ${c.bad}`} />}
          {wrong && <Readout color={C.bad} tex={c.badMeets} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
