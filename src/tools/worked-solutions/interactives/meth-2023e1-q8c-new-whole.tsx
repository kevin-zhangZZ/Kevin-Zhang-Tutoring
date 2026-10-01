// 2023 Methods Exam 1 Q8c — "already queued for one minute" means T > 1. That condition rules out
// the area left of t = 1, and the area that is left, Pr(T > 1) = 225/256, becomes the new whole;
// the answer is the share of it lying right of t = 2: (9/16)/(225/256) = 16/25. Slide the time
// already waited, a, from 0 (no condition: the answer is just Pr(T > 2) = 9/16) to 2 (answer 1) —
// only the denominator changes. A toggle shows the common misreading T = 1: a strip of zero width,
// so Pr(T = 1) = 0 and the ratio has no value.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (t: number) => (t >= 0 && t <= 4 ? (t * (16 - t * t)) / 64 : 0)
/** Pr(T > x) = 1 − (x²/8 − x⁴/256), from the antiderivative 8t² − t⁴/4 used in the working. */
const tail = (x: number) => 1 - (x * x) / 8 + x ** 4 / 256
const P2 = tail(2) // 9/16
const zero = () => 0
const TOP = 0.41

export default function NewWhole() {
  const [a, setA] = useState(1)
  const [wrong, setWrong] = useState(false)

  const atOne = Math.abs(a - 1) < 0.001
  const atZero = a < 0.025
  const atTwo = a > 1.975
  const aStr = String(parseFloat(a.toFixed(2)))
  const pa = tail(a)
  const ratio = P2 / pa

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        Reading it as <M>{`T = ${aStr}`}</M> asks for the area of a strip of <b>zero width</b>:{' '}
        <M>{`\\Pr(T = ${aStr}) = \\int_{${aStr}}^{${aStr}} f(t)\\,dt = 0`}</M>. For a continuous random variable every
        single value has probability 0, so dividing by it gives no answer. A person who has already queued for{' '}
        {aStr === '1' ? 'one minute' : `${aStr} minutes`} and is still waiting will end up with a total queuing time{' '}
        <b>longer</b> than that, so the condition is <M>{`T > ${aStr}`}</M>. Turn the toggle off to see that region.
      </Notice>
    )
  } else if (atOne) {
    notice = (
      <Notice tone="good">
        <b>This is the question.</b> The grey part, <M>{'t < 1'}</M>, is ruled out: this person has already waited
        longer than that. What can still happen is the shaded area right of <M>t = 1</M>,{' '}
        <M>{'\\Pr(T > 1) = \\int_1^4 f(t)\\,dt \\approx 0.879'}</M> — the new whole. The answer is the orange share of
        it: <M>{'\\Pr(T > 2) \\div \\Pr(T > 1) = \\tfrac{9}{16} \\div \\tfrac{225}{256} = 0.64'}</M>. Slide <M>a</M> to 0 to
        compare with no condition at all.
      </Notice>
    )
  } else if (atZero) {
    notice = (
      <Notice>
        With no time already waited, nothing is ruled out: the whole area under the curve, 1, counts, and the
        probability is just <M>{'\\Pr(T > 2) = \\tfrac{9}{16} \\approx 0.563'}</M>. Slide <M>a</M> back to 1: the
        grey part drops out of the denominator while the orange part stays the same, so the answer goes up.
      </Notice>
    )
  } else if (atTwo) {
    notice = (
      <Notice>
        At <M>a = 2</M> the condition is <M>{'T > 2'}</M> itself, so the blue part has vanished and the orange part
        is the whole: the probability is 1. Notice that the numerator <M>{'\\Pr(T > 2)'}</M> never changed as you
        slid — only the denominator <M>{'\\Pr(T > a)'}</M> did.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Given <M>{`T > ${aStr}`}</M>, the grey part is ruled out and the shaded area right of{' '}
        <M>{`t = ${aStr}`}</M>, <M>{`\\Pr(T > ${aStr}) \\approx ${pa.toFixed(3)}`}</M>, is the new whole. The orange
        part, <M>{'\\Pr(T > 2) = \\tfrac{9}{16}'}</M>, doesn&apos;t move as you slide — only the denominator does. So
        the longer someone has already waited, the likelier a wait of more than 2 minutes. Slide <M>a</M> back to 1
        for the question.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 4.4]} y={[0, 0.42]} xStep={1} yStep={0.1} height={300} xLabel="t" yLabel="" yLabels={false}>
        {!wrong && (
          <>
            <Region top={f} bottom={zero} from={0} to={a} color={C.guide} opacity={0.22} />
            <Region top={f} bottom={zero} from={a} to={2} color={C.f} opacity={0.3} />
            <Region top={f} bottom={zero} from={2} to={4} color={C.g} opacity={0.4} />
          </>
        )}
        <Plot.OfX y={f} domain={[0, 4]} color={C.ink} weight={2.5} />
        <Label at={[3.75, f(3.75)]} attach="ne">f</Label>
        {wrong ? (
          <>
            <Line.Segment point1={[a, 0]} point2={[a, f(a)]} color={C.bad} weight={3} />
            <Label at={[a, Math.max(f(a) / 2, 0.06)]} color={C.bad} attach="e">
              width 0, so area 0
            </Label>
          </>
        ) : (
          <>
            <Line.Segment point1={[2, 0]} point2={[2, TOP]} color={C.g} style="dashed" weight={2} />
            <Label at={[2, TOP]} color={C.g} attach="n">
              t = 2
            </Label>
            {!atTwo && (
              <>
                <Line.Segment point1={[a, 0]} point2={[a, TOP]} color={C.f} style="dashed" weight={2} />
                {a < 1.55 && (
                  <Label at={[a, TOP]} color={C.f} attach={a < 0.5 ? 'ne' : 'n'}>
                    {`t = ${aStr}`}
                  </Label>
                )}
              </>
            )}
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="\text{waited } a" value={a} onChange={setA} min={0} max={2} step={0.05} />
        <Buttons>
          <Toggle
            label={
              <>
                What if it means <M>{`T = ${aStr}`}</M>?
              </>
            }
            checked={wrong}
            onChange={setWrong}
          />
        </Buttons>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex={`\\Pr(T = ${aStr}) = 0`} />
              <Readout color={C.bad} tex={`\\dfrac{\\Pr(T > 2)}{\\Pr(T = ${aStr})} = \\dfrac{9/16}{0}\\ \\text{(undefined)}`} />
            </>
          ) : (
            <>
              <Readout color={C.f} tex={`\\Pr(T > ${aStr}) \\approx ${pa.toFixed(3)}`} />
              <Readout color={C.g} tex={`\\Pr(T > 2) \\approx ${P2.toFixed(3)}`} />
              <Readout
                color={atOne ? C.good : undefined}
                tex={`\\Pr(T > 2 \\mid T > ${aStr}) ${atOne ? '= 0.64 = \\tfrac{16}{25}\\ \\checkmark' : `\\approx ${ratio.toFixed(3)}`}`}
              />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
