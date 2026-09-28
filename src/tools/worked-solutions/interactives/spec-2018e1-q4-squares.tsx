// 2018 Specialist Exam 1 Q4 — why a coefficient comes out SQUARED in a variance but not in a
// mean. A model X with mean 2 and variance 2 (values 0, 2, 4 with probabilities 1/4, 1/2, 1/4)
// is drawn as its distances from the mean; each distance d is drawn as a d-by-d square, so the
// variance is the probability-weighted average square area. Slide a: every distance scales by
// |a|, so each square's area scales by a^2 and Var(aX) = 2a^2, while the mean just moves to 2a.
// A toggle shows the wrong rule Var(aX) = a Var(X) as rectangles stretched in one direction only
// (and, for negative a, a negative "variance").

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Point, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

type Pt = [number, number]

/** Square (or rectangle) standing on the axis between x0 and x1, height h. */
const box = (x0: number, x1: number, h: number): Pt[] => [[x0, 0], [x1, 0], [x1, h], [x0, h]]

/** 2, -1.5, 0.5 … as plain text / TeX. */
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1)).replace('-', '−')
const tex = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1))
const tex2 = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/0$/, ''))

export default function Squares() {
  const [a, setA] = useState(2)
  const [wrong, setWrong] = useState(false)

  const side = 2 * Math.abs(a) // |aX − E(aX)| for the values X = 0 and X = 4
  const area = side * side // 4a²
  const variance = 2 * a * a
  const mean = 2 * a
  // Deviation of each outer value from the mean: X = 4 gives +2a, X = 0 gives −2a.
  const dev4 = 2 * a
  const dev0 = -2 * a
  const big = Math.abs(a) >= 1
  // Keep the "Pr" labels clear of the wrong-rule rectangles (height 2) when they are shown.
  const prY = wrong && Math.abs(a) > 1 ? (side + 2) / 2 : side / 2

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The dashed red rectangles are what <M>{'\\operatorname{Var}(aX) = a\\operatorname{Var}(X)'}</M> would mean: the
        distance stretched in one direction only. But the distance appears <b>twice</b> in{' '}
        <span className="whitespace-nowrap">
          <M>{'(x-\\mu)^2'}</M>,
        </span>{' '}
        so both sides of the square stretch.
        {a < 0 ? (
          <>
            {' '}With <M>a</M> negative the wrong rule is even worse: <M>{`a\\operatorname{Var}(X) = ${tex(2 * a)}`}</M>, and
            a variance can never be negative.
          </>
        ) : a > 1 ? (
          <>
            {' '}Here the rectangles average <M>{tex2(2 * a)}</M> but the squares average <M>{tex2(variance)}</M>.
          </>
        ) : (
          <> Try <M>a = 2</M> or <M>a = -2</M> to see the two rules split apart.</>
        )}
      </Notice>
    )
  } else if (a === 0) {
    notice = (
      <Notice>
        With <M>a = 0</M>, <M>aX</M> is always <M>0</M>: nothing is spread out, so the squares shrink to nothing and{' '}
        <M>{'\\operatorname{Var}(0X) = 0'}</M>. Slide <M>a</M> back up.
      </Notice>
    )
  } else if (a === 1) {
    notice = (
      <Notice>
        This is <M>X</M> itself. Its values <M>0</M> and <M>4</M> each sit <M>2</M> from the mean, so each square has
        area <M>4</M>. Variance is the probability-weighted average of these squared distances:{' '}
        <M>{'\\tfrac14(4) + \\tfrac12(0) + \\tfrac14(4) = 2'}</M>, matching <M>{'\\operatorname{Var}(X) = 2'}</M>. Now
        try <M>a = 2</M>.
      </Notice>
    )
  } else if (a < 0) {
    notice = (
      <Notice>
        A negative <M>a</M> flips the distribution: the <M>X = 4</M> square (blue) is now on the left. A flipped square
        has the same area, so <M>{`\\operatorname{Var}(${tex(a)}X) = \\operatorname{Var}(${tex(-a)}X) = ${tex2(variance)}`}</M>.
        Variance ignores direction, which is why the rule has <M>{'a^2'}</M>, never negative.
      </Notice>
    )
  } else if (a < 1) {
    notice = (
      <Notice>
        Shrinking by <M>{`a = ${tex(a)}`}</M> shrinks every distance from the mean, so each square&apos;s side shrinks by the
        same factor and its area by <M>{`a^2 = ${tex2(a * a)}`}</M>. The variance is{' '}
        <M>{`${tex2(a * a)} \\times 2 = ${tex2(variance)}`}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Multiplying by <M>{`a = ${tex(a)}`}</M> stretches every distance from the mean by <M>{tex(a)}</M>. Variance
        averages <em>squared</em> distances, so both sides of each square stretch and its area grows by{' '}
        <M>{`a^2 = ${tex2(a * a)}`}</M>: <M>{`\\operatorname{Var}(${tex(a)}X) = ${tex2(a * a)} \\times 2 = ${tex2(variance)}`}</M>.
        The mean only moves to <M>{`2a = ${tex(mean)}`}</M>, with no square. The same happens to <M>bY</M>, giving{' '}
        <M>{'b^2 \\times 4'}</M>.
      </Notice>
    )
  }

  const sq4 = dev4 >= 0 ? box(0, dev4, side) : box(dev4, 0, side)
  const sq0 = dev0 >= 0 ? box(0, dev0, side) : box(dev0, 0, side)
  // The wrong rule: the base stretches by |a| but the height stays at X's own distance, 2.
  const r4 = dev4 >= 0 ? box(0, dev4, 2) : box(dev4, 0, 2)
  const r0 = dev0 >= 0 ? box(0, dev0, 2) : box(dev0, 0, 2)

  return (
    <div>
      <p className="mb-2 text-[12.5px] text-gray-500 dark:text-gray-400">
        Across: each value&apos;s distance from the mean, <M>{'aX - 2a'}</M>. Each distance is drawn as a square with that side.
      </p>
      <Plane
        x={[-6.5, 6.5]}
        y={[-1, 7]}
        equalScale
        height={360}
        xLabel=""
        yLabel=""
        xLabels={v => (v % 2 === 0 ? String(v).replace('-', '−') : '')}
        yLabels={false}
      >
        {a !== 0 && (
          <>
            <Polygon points={sq4} color={C.f} fillOpacity={0.22} weight={2} />
            <Polygon points={sq0} color={C.violet} fillOpacity={0.22} weight={2} />
          </>
        )}
        {wrong && a !== 0 && (
          <>
            <Polygon points={r4} color={C.bad} fillOpacity={0.12} weight={2.5} strokeStyle="dashed" />
            <Polygon points={r0} color={C.bad} fillOpacity={0.12} weight={2.5} strokeStyle="dashed" />
          </>
        )}
        <Point x={dev0} y={0} color={C.violet} />
        <Point x={dev4} y={0} color={C.f} />
        <Point x={0} y={0} color={C.g} />
        <Label at={[0, 0]} attach="s" color={C.g} size={12}>X = 2</Label>
        {big && (
          <>
            <Label at={[dev4 / 2, side]} attach="n" color={C.f} size={12}>X = 4</Label>
            <Label at={[dev0 / 2, side]} attach="n" color={C.violet} size={12}>X = 0</Label>
            <Label at={[dev4 / 2, prY]} attach="c" color={C.f} size={12}>{`Pr ¼`}</Label>
            <Label at={[dev0 / 2, prY]} attach="c" color={C.violet} size={12}>{`Pr ¼`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={-3} max={3} step={0.5} format={fmt} />
        <Buttons>
          <Toggle label="Wrong idea: Var(aX) = a·Var(X)" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`E(aX) = 2a = ${tex(mean)}`} />
          <Readout tex={`\\text{side} = 2|a| = ${tex(side)},\\ \\text{area} = ${tex2(area)}`} />
          <Readout
            color={C.f}
            tex={`\\operatorname{Var}(aX) = \\tfrac14(${tex2(area)}) + \\tfrac12(0) + \\tfrac14(${tex2(area)}) = ${tex2(variance)}`}
          />
          {wrong && <Readout color={C.bad} tex={`a\\operatorname{Var}(X) = 2a = ${tex(2 * a)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
