// 2018 Methods Exam 2 Q5d–e — why the area under g⁻¹ is "the box minus the area under g".
// g(x) = 81x²(a − x)/(4a⁴) on [0, 2a/3] runs from (0, 0) to P(2a/3, 3/a), so it sits in a box of
// area (2a/3)(3/a) = 2 (part d). Built in three steps: the area under g (1), the box and the
// violet part of it to the left of g (2 − 1 = 1), then the reflection in y = x, which carries the
// violet part exactly onto the region under g⁻¹ from x = 0 to x = g(2a/3) = 3/a. A slider for a
// changes the box's shape but never its area, or the 1 + 1 split.

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider, StepNav, useSteps,
  integrate,
} from './kit'

const gOf = (a: number) => (x: number) => (81 * x * x * (a - x)) / (4 * a ** 4)

/** g is increasing on [0, hi], so its inverse can be found by bisection. */
function inverseOf(g: (x: number) => number, hi: number) {
  return (y: number) => {
    let lo = 0
    let up = hi
    for (let i = 0; i < 40; i++) {
      const m = (lo + up) / 2
      if (g(m) < y) lo = m
      else up = m
    }
    return (lo + up) / 2
  }
}

export default function ReflectBox() {
  const [a, setA] = useState(1.5)
  const { step, setStep, next, back } = useSteps(3)
  const g = gOf(a)
  const W = (2 * a) / 3 // width of g's box
  const H = 3 / a // height of g's box
  const gInv = inverseOf(g, W)
  const under = integrate(g, 0, W)
  const reflected = step === 2

  const notices = [
    <Notice key={0}>
      The sky region is the area under <M>g</M> from <M>0</M> to <M>{'\\tfrac{2a}{3}'}</M>. Unlike{' '}
      <M>{'g^{-1}'}</M>, <M>g</M> has a rule you can integrate, and <M>{'\\int_0^{2a/3} g(x)\\,dx = 1'}</M>: drag{' '}
      <M>a</M> and it never changes. Next: put <M>g</M> in a box.
    </Notice>,
    <Notice key={1}>
      <M>g</M> runs from the origin to <M>{'P\\left(\\tfrac{2a}{3}, \\tfrac{3}{a}\\right)'}</M>, so it fits exactly in a
      box whose area is part d.&apos;s product, <M>{'\\tfrac{2a}{3}\\times\\tfrac3a = 2'}</M>. The curve cuts the box into
      the sky part under <M>g</M> (<M>1</M>) and the violet part to its left (<M>2 - 1 = 1</M>). Next: reflect
      everything in <M>y = x</M>.
    </Notice>,
    <Notice key={2} tone="good">
      Reflecting in <M>y = x</M> swaps every <M>x</M> with its <M>y</M>: <M>g</M> becomes <M>{'g^{-1}'}</M>, the box
      turns on its side, and the <b>violet part lands exactly under <M>{'g^{-1}'}</M></b>, from <M>x = 0</M> to the red
      line <M>{'x = g\\left(\\tfrac{2a}{3}\\right) = \\tfrac3a'}</M>. Reflection keeps area, so the answer is{' '}
      <M>2 - 1 = 1</M>, with no rule for <M>{'g^{-1}'}</M> needed. The sky part under <M>g</M> lands <em>beside</em>{' '}
      <M>{'g^{-1}'}</M>, not under it.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-0.3, 3.4]} y={[-0.3, 3.4]} xStep={1} yStep={1} height={400} equalScale>
        {!reflected && <Region top={g} bottom={() => 0} from={0} to={W} color={C.f} opacity={0.3} />}
        {step === 1 && <Region top={() => H} bottom={g} from={0} to={W} color={C.violet} opacity={0.3} />}
        {step >= 1 && (
          <Polygon
            points={[[0, 0], [W, 0], [W, H], [0, H]]}
            color={reflected ? C.guide : C.ink}
            fillOpacity={0}
            strokeStyle="dashed"
            weight={reflected ? 1 : 2}
          />
        )}
        {reflected && (
          <>
            <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.guide} style="dashed" weight={2} />
            <Region top={() => W} bottom={gInv} from={0} to={H} color={C.f} opacity={0.15} />
            <Region top={gInv} bottom={() => 0} from={0} to={H} color={C.violet} opacity={0.35} />
            <Polygon points={[[0, 0], [H, 0], [H, W], [0, W]]} color={C.ink} fillOpacity={0} strokeStyle="dashed" weight={2} />
            <Line.Segment point1={[H, -0.15]} point2={[H, W + 0.35]} color={C.bad} style="dashed" weight={2} />
            <Plot.Parametric xy={s => [g(s), s]} domain={[0, W]} color={C.g} weight={3} />
            <Point x={H} y={W} color={C.g} />
            <Label at={[H, W + 0.3]} attach="e" color={C.bad}>x = g(2a/3)</Label>
            <Label at={[g(0.55 * W), 0.55 * W]} attach="se" color={C.g}>g⁻¹</Label>
            <Label at={[0.35 * H, 0.12 * W]} attach="c" color={C.violet} bold>1</Label>
            <Label at={[2.6, 2.6]} attach="nw" color={C.guide}>y = x</Label>
            <Label at={[H, W]} attach="e" color={C.g}>(3/a, 2a/3)</Label>
          </>
        )}
        <Plot.OfX
          y={g}
          domain={[0, W]}
          color={C.f}
          weight={reflected ? 2 : 3}
          style={reflected ? 'dashed' : 'solid'}
          opacity={reflected ? 0.6 : 1}
        />
        <Point x={W} y={H} color={C.f} />
        {!reflected && (
          <>
            <Label at={[W, H]} attach="ne" color={C.f}>P(2a/3, 3/a)</Label>
            <Label at={[0.55 * W, g(0.55 * W)]} attach="se" color={C.f}>g</Label>
            <Label at={[0.82 * W, 0.3 * H]} attach="c" color={C.f} bold>1</Label>
          </>
        )}
        {step === 1 && (
          <Label at={[0.14 * W, 0.72 * H]} attach="c" color={C.violet} bold>1</Label>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Slider label="a" value={a} onChange={setA} min={1} max={3} step={0.05} />
        <Readouts>
          {step === 0 && <Readout color={C.f} tex={`\\int_0^{2a/3} g(x)\\,dx \\approx ${under.toFixed(3)}`} />}
          {step >= 1 && (
            <Readout
              tex={`\\text{box} = ${(reflected ? H : W).toFixed(2)}\\times${(reflected ? W : H).toFixed(2)} = ${(W * H).toFixed(2)}`}
            />
          )}
          {step === 1 && <Readout color={C.violet} tex={`\\text{violet} = 2 - ${under.toFixed(3)} = ${(W * H - under).toFixed(3)}`} />}
          {reflected && <Readout color={C.violet} tex={`\\text{area under } g^{-1} = 2 - 1 = ${(W * H - under).toFixed(3)}`} />}
        </Readouts>
        {notices[step]}
        {reflected && (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="self-start text-[12.5px] font-semibold text-sky-700 hover:underline dark:text-sky-300"
          >
            Start again
          </button>
        )}
      </Controls>
    </div>
  )
}
