// 2020 Methods Exam 1 Q7b.iii — drag Q(a, f(a)) along f(x) = x² + 3x + 5 and compare the two lines
// through it that parts b.i and b.ii are about: the line PQ to P(1, 0) (orange, gradient
// (a² + 3a + 5)/(a − 1)) and the tangent at Q (blue dashed, gradient 2a + 3). The red gap shows
// how far the tangent misses P: it crosses x = 1 at y = −a² + 2a + 8 = −(a − 4)(a + 2), above P
// for −2 < a < 4 and below it outside. At a = −2 and a = 4 the gap closes, the two lines become one
// (green) and the two gradients agree, which is why b.iii equates them. The y-axis is compressed
// (not to scale) so that both tangents, touching at (−2, 3) and (4, 33), fit on one plane.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, num, tick } from './kit'

const f = (x: number) => x * x + 3 * x + 5
const fp = (x: number) => 2 * x + 3
const mPQ = (a: number) => f(a) / (a - 1)
/** Where the tangent at Q crosses the vertical line x = 1 through P: −a² + 2a + 8. */
const tanAt1 = (a: number) => fp(a) * (1 - a) + f(a)

const A_MIN = -4.5
const A_MAX = 4.5
const ROOTS = [-2, 4]
const snap = (a: number) => ROOTS.find(r => Math.abs(a - r) < 0.08) ?? a

// Snap the dragged point to the nearest point of the parabola. The y-axis is squashed about five
// times more than the x-axis, so y differences are scaled down to match what the eye sees.
const SAMPLES = Array.from({ length: 901 }, (_, i) => A_MIN + ((A_MAX - A_MIN) * i) / 900)
function nearestOnF([mx, my]: [number, number]): number {
  let best = SAMPLES[0]
  let bestD = Infinity
  for (const x of SAMPLES) {
    const d = (x - mx) ** 2 + ((f(x) - my) / 5) ** 2
    if (d < bestD) {
      bestD = d
      best = x
    }
  }
  return best
}

export default function SlideQ() {
  const [a, setA] = useState(2)
  const fa = f(a)
  const t1 = tanAt1(a)
  const same = ROOTS.includes(a)
  const vertical = Math.abs(a - 1) < 0.03
  const between = a > -2 && a < 4

  let notice
  if (a === 4) {
    notice = (
      <Notice tone="good">
        <b>PQ and the tangent at Q are now the same line.</b> Q is <M>(4, 33)</M>, and both gradients are 11:{' '}
        <M>{'\\tfrac{33}{4-1} = 11'}</M> from b.i and <M>2(4) + 3 = 11</M> from b.ii. That is the whole idea of b.iii: a
        tangent that passes through P <i>is</i> the line PQ, so the two gradient formulas must agree. (The red gap was
        the tangent&apos;s height at <M>x = 1</M>, which works out to <M>-a^2 + 2a + 8</M>: zero exactly when{' '}
        <M>a^2 - 2a - 8 = 0</M>.) There is a second point like this. Drag Q over to the left-hand side.
      </Notice>
    )
  } else if (a === -2) {
    notice = (
      <Notice tone="good">
        <b>The same line again, on the other side.</b> Q is <M>(-2, 3)</M>, and both gradients are <M>-1</M>:{' '}
        <M>{'\\tfrac{3}{-2-1} = -1'}</M> and <M>2(-2) + 3 = -1</M>. So two tangents to the parabola pass through P, one
        touching each side. That is why <M>a^2 - 2a - 8 = 0</M> has two roots, and why the question asks for the{' '}
        <i>values</i> of <M>a</M>.
      </Notice>
    )
  } else if (vertical) {
    notice = (
      <Notice>
        Q is directly above P, so the orange line PQ is vertical: its gradient <M>{'\\tfrac{a^2+3a+5}{a-1}'}</M> would
        need a zero denominator. A vertical line is never a tangent to this parabola, so <M>a = 1</M> can&apos;t be an
        answer. That is why multiplying through by <M>a - 1</M> in the working is safe.
      </Notice>
    )
  } else if (between) {
    notice = (
      <Notice>
        The blue tangent at Q crosses <M>x = 1</M> about {num(t1, 1)} units <b>above</b> P (the red gap), so it misses
        P. The orange line PQ does reach P, but it cuts through the parabola, so it isn&apos;t a tangent. Two different
        lines, two different gradients: <M>{`m_{PQ} \\approx ${num(mPQ(a), 1)}`}</M> but{' '}
        <M>{`f'(a) = ${num(fp(a), 1)}`}</M>. Drag Q {a > 1 ? 'further up the right-hand side' : 'further to the left'} and
        watch the gap close.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Now the tangent passes <b>below</b> P: it crosses <M>x = 1</M> at <M>{`y \\approx ${num(t1, 1)}`}</M>. You have gone
        past the place where the gap was zero. Somewhere between here and the last position, the tangent passed exactly
        through P. Slide Q back {a > 4 ? 'down' : 'to the right'} until the two lines merge.
      </Notice>
    )
  }

  const lineColor = same ? C.good : C.g
  return (
    <div>
      <Plane
        x={[-5, 6]}
        y={[-5, 40]}
        xStep={1}
        yStep={5}
        height={340}
        xLabels={v => (Math.abs(v - 1) < 1e-9 || v < -5.5 ? '' : tick(v))}
        yLabels={v => (Math.abs(v % 10) < 1e-9 && v > 15 ? tick(v) : '')}
      >
        <Plot.OfX y={f} domain={[-5.8, 4.95]} color={C.f} weight={3} />
        <Label at={[-5.2, f(-5.2)]} color={C.f} attach="e">f</Label>
        {same ? (
          <Line.ThroughPoints point1={[1, 0]} point2={[a, fa]} color={C.good} weight={3} />
        ) : (
          <>
            <Line.PointSlope point={[a, fa]} slope={fp(a)} color={C.f} style="dashed" weight={2} />
            {vertical ? (
              <Line.Segment point1={[1, -10]} point2={[1, 50]} color={C.g} weight={2.5} />
            ) : (
              <Line.ThroughPoints point1={[1, 0]} point2={[a, fa]} color={C.g} weight={2.5} />
            )}
            {!vertical && <Line.Segment point1={[1, 0]} point2={[1, t1]} color={C.bad} style="dashed" weight={2.5} />}
            {!vertical && <Point x={1} y={t1} color={C.f} />}
          </>
        )}
        <Point x={1} y={0} color={C.ink} />
        <Label at={[1, 0]} attach="s" gap={8}>P</Label>
        <MovablePoint point={[a, fa]} onMove={p => setA(snap(nearestOnF(p)))} color={lineColor} />
        <Label at={[a, fa]} color={lineColor} attach={a >= -1.5 ? 'nw' : 'ne'} gap={16}>Q</Label>
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        Not to scale: the y-axis is squashed so both tangents fit.
      </p>
      <Controls>
        <Slider label="a" value={a} onChange={v => setA(snap(v))} min={A_MIN} max={A_MAX} step={0.01} format={v => num(v)} />
        <Readouts>
          <Readout
            color={lineColor}
            tex={vertical ? 'm_{PQ}\\ \\text{undefined (vertical)}' : `m_{PQ} = \\tfrac{a^2+3a+5}{a-1} ${same ? '=' : '\\approx'} ${num(mPQ(a))}`}
          />
          <Readout color={same ? C.good : C.f} tex={`f'(a) = 2a+3 = ${num(fp(a))}`} />
          {!vertical && (
            <Readout color={same ? C.good : C.bad} tex={`\\text{tangent at } x = 1\\text{: } y ${same ? '=' : '\\approx'} ${num(t1)}`} />
          )}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag Q along the parabola, or use the slider.</p>
        {notice}
      </Controls>
    </div>
  )
}
