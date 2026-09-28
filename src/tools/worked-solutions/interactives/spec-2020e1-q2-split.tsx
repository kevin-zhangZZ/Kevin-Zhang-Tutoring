// 2020 Specialist Exam 1 Q2 — why splitting (2 − u)/√u into 2u^(−1/2) − u^(1/2) makes the integral
// easy, built up in four steps. (1) The orange region under y = (2 − u)/√u on [1, 2] is the integral
// after the substitution. (2) The split draws two power curves, y = 2/√u (blue) and y = √u (violet);
// at every u the gap between them equals the orange height, so the orange area is the area of the
// gap. (3) The area under 2/√u is one power rule, [4u^(1/2)]₁² = 4√2 − 4 ≈ 1.657, and it must lie
// between the dashed boxes of height √2 and 2. (4) Take away the area under √u, [⅔u^(3/2)]₁² =
// 4√2/3 − ⅔ ≈ 1.219 (between the boxes of height 1 and √2), leaving 8√2/3 − 10/3 ≈ 0.438.
//
// The toggle applies the classic exponent slip — multiplying by the new power instead of dividing —
// and the boxes catch it: √2 − 1 ≈ 0.414 is below the inner box, 3√2 − 3/2 ≈ 2.743 is above the
// outer one, and the total ½ − 2√2 ≈ −2.33 is negative. (The report notes "various errors with
// exponents".)

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider, StepNav, Toggle, tick,
  useSteps,
} from './kit'

const g = (u: number) => (2 - u) / Math.sqrt(u)
const top = (u: number) => 2 / Math.sqrt(u)
const bot = (u: number) => Math.sqrt(u)
const zero = () => 0
const R2 = Math.SQRT2
const AREA_TOP = 4 * R2 - 4 // ≈ 1.657
const AREA_BOT = (2 / 3) * (2 * R2 - 1) // ≈ 1.219
const EXACT = (8 * R2 - 10) / 3 // ≈ 0.438
const WRONG_TOP = R2 - 1 // [u^(1/2)]₁² ≈ 0.414
const WRONG_BOT = 1.5 * (2 * R2 - 1) // [(3/2)u^(3/2)]₁² ≈ 2.743
// Tick numbers only from 1/2 to 2: the ones just outside get cut off at the plane's edges.
const xTicks = (v: number) => (v < 0.49 || v > 2.01 ? '' : tick(v))

/** A dashed box over [1, 2] of the given height, with its height read off the y-axis (the plane's
 *  own tick numbers are off, so these are the only heights labelled). */
function Box({ height, text }: { height: number; text: string }) {
  return (
    <>
      <Polygon points={[[1, 0], [2, 0], [2, height], [1, height]]} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
      <Line.Segment point1={[0, height]} point2={[1, height]} color={C.guide} style="dashed" weight={1} />
      <Label at={[0, height]} attach="w" size={12}>{text}</Label>
    </>
  )
}

export default function Split() {
  const { step, next, back } = useSteps(4)
  const [u, setU] = useState(1.3)
  const [wrong, setWrong] = useState(false)
  const showWrong = wrong && step >= 2

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        After the substitution the integral is <M>{'\\int_1^2 \\frac{2-u}{\\sqrt u}\\,du'}</M>, the area of this orange
        region. As one fraction it has no antiderivative you know. But its denominator is a <b>single term</b>,{' '}
        <M>{'\\sqrt u'}</M>, so each term on top can be divided by it:{' '}
        <M>{'\\frac{2-u}{\\sqrt u} = \\frac{2}{\\sqrt u} - \\frac{u}{\\sqrt u} = 2u^{-1/2} - u^{1/2}'}</M>. Press Next to
        see what that split looks like.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        The split gives two power curves: <M>{'y = 2u^{-1/2}'}</M> (blue, falling) and <M>{'y = u^{1/2}'}</M> (violet,
        rising). At every <M>u</M> the <b>gap between them is exactly the height of the orange curve</b>: drag{' '}
        <M>u</M> and compare the two thick orange segments. So the orange area equals the area of the gap. The gap
        closes at <M>u = 2</M>, where <M>{'\\tfrac{2}{\\sqrt2} = \\sqrt2'}</M>, just as the orange curve reaches zero there.
      </Notice>
    )
  } else if (step === 2) {
    notice = showWrong ? (
      <Notice tone="warn">
        Multiplying by the new power instead of dividing gives <M>{'2 \\times \\tfrac12 u^{1/2} = u^{1/2}'}</M>, so the
        &ldquo;area&rdquo; would be <span className="whitespace-nowrap"><M>{'\\sqrt2 - 1 \\approx 0.414'}</M>.</span> That is <b>smaller than the inner box</b>{' '}
        <span className="whitespace-nowrap">(<M>{'\\approx 1.414'}</M>),</span> which fits entirely under the curve: impossible. Differentiating{' '}
        <M>{'u^{1/2}'}</M> gives <M>{'\\tfrac12 u^{-1/2}'}</M>, not <M>{'2u^{-1/2}'}</M>. Always check an antiderivative
        by differentiating it.
      </Notice>
    ) : (
      <Notice>
        The gap is (area under the blue curve) minus (area under the violet curve), and each of those is one power
        rule. For <M>{'2u^{-1/2}'}</M>: add 1 to the power to get <M>\tfrac12</M>, then divide by <M>\tfrac12</M>, giving{' '}
        <M>{'4u^{1/2}'}</M>. Check the size: on <M>[1, 2]</M> the blue curve stays between <M>{'\\sqrt2'}</M> and{' '}
        <M>2</M>, so its area must lie between the two dashed boxes, <M>1.414</M> and <M>2</M>. It does.
      </Notice>
    )
  } else {
    notice = showWrong ? (
      <Notice tone="warn">
        With the same slip, <M>{'\\int u^{1/2}\\,du'}</M> becomes <M>{'\\tfrac32 u^{3/2}'}</M> and the &ldquo;area&rdquo;
        is <span className="whitespace-nowrap"><M>{'3\\sqrt2 - \\tfrac32 \\approx 2.743'}</M>.</span> That is <b>bigger than the outer box</b>{' '}
        <span className="whitespace-nowrap">(<M>{'\\approx 1.414'}</M>),</span> which holds the whole violet region. Impossible. The total becomes <M>{'0.414 - 2.743 \\approx -2.33'}</M>, a
        negative answer for a region above the axis. Dividing by <M>\tfrac32</M> means <span className="whitespace-nowrap">multiplying by{' '}
        <M>\tfrac23</M>.</span>
      </Notice>
    ) : (
      <Notice tone="good">
        Now take away the violet area. For <M>{'u^{1/2}'}</M>: add 1 to get <M>\tfrac32</M>, divide by{' '}
        <M>\tfrac32</M>, giving <M>{'\\tfrac23 u^{3/2}'}</M>, and the area is{' '}
        <M>{'\\tfrac{4\\sqrt2}{3} - \\tfrac23 \\approx 1.219'}</M>, between the boxes <M>1</M> and <M>{'\\sqrt2'}</M>. What
        is left of the blue area is the orange gap: <M>{'1.657 - 1.219 \\approx 0.438'}</M>, which is{' '}
        <M>{'\\tfrac{8\\sqrt2}{3} - \\tfrac{10}{3}'}</M>. Try the toggle to see a box catch a wrong power rule.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.3, 2.25]} y={[0, 2.3]} xStep={0.5} yStep={0.5} height={320} xLabel="u" xLabels={xTicks} yLabels={false}>
        {/* Step 1: the single fraction. Step 2: its height reappears as the gap between two curves. */}
        {step <= 1 && <Region top={g} bottom={zero} from={1} to={2} color={C.g} opacity={step === 0 ? 0.3 : 0.12} />}
        {step === 1 && <Region top={top} bottom={bot} from={1} to={2} color={C.g} opacity={0.3} />}

        {/* Steps 3–4: the two power-rule areas, each with the boxes that bound it. */}
        {step === 2 && (
          <>
            <Region top={top} bottom={zero} from={1} to={2} color={C.f} opacity={0.25} />
            <Box height={2} text="2" />
            <Box height={R2} text="√2" />
          </>
        )}
        {step === 3 && (
          <>
            <Region top={bot} bottom={zero} from={1} to={2} color={C.violet} opacity={0.3} />
            <Region top={top} bottom={bot} from={1} to={2} color={C.g} opacity={0.35} />
            <Box height={R2} text="√2" />
            <Box height={1} text="1" />
          </>
        )}

        {step <= 1 && <Plot.OfX y={g} domain={[1, 2]} color={C.g} weight={3} />}
        {step >= 1 && (
          <>
            <Plot.OfX y={top} domain={[0.76, 2.25]} color={C.f} weight={3} />
            <Plot.OfX y={bot} domain={[0, 2.25]} color={C.violet} weight={3} />
            <Label at={[0.85, top(0.85)]} color={C.f} attach="ne">2/√u</Label>
            <Label at={[0.45, bot(0.45)]} color={C.violet} attach="nw">√u</Label>
          </>
        )}
        {step <= 1 && <Label at={[1.45, g(1.45)]} color={C.g} attach="ne">(2 − u)/√u</Label>}

        {/* Step 2: the same length twice, once as a gap and once as a height. */}
        {step === 1 && (
          <>
            <Line.Segment point1={[u, bot(u)]} point2={[u, top(u)]} color={C.g} weight={5} />
            <Line.Segment point1={[u, 0]} point2={[u, g(u)]} color={C.g} weight={5} />
            <Point x={u} y={g(u)} color={C.g} />
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={4} onBack={back} onNext={next} />
        {step === 1 && <Slider label="u" value={u} onChange={setU} min={1} max={2} step={0.01} />}
        {step >= 2 && (
          <div className="flex flex-wrap items-center gap-2">
            <Toggle label="What if I multiply by the new power?" checked={wrong} onChange={setWrong} />
          </div>
        )}
        <Readouts>
          {step === 0 && <Readout color={C.g} tex="\int_1^2 \tfrac{2-u}{\sqrt u}\,du = \;?" />}
          {step === 1 && (
            <>
              <Readout color={C.g} tex={`\\text{gap: } 2u^{-1/2} - u^{1/2} \\approx ${(top(u) - bot(u)).toFixed(3)}`} />
              <Readout color={C.g} tex={`\\text{height: } \\tfrac{2-u}{\\sqrt u} \\approx ${g(u).toFixed(3)}`} />
            </>
          )}
          {step >= 2 &&
            (showWrong ? (
              <Readout
                color={C.bad}
                tex={`\\left[u^{1/2}\\right]_1^2 = \\sqrt2 - 1 \\approx ${WRONG_TOP.toFixed(3)}${step === 2 ? '\\;\\text{(too small)}' : ''}`}
              />
            ) : (
              <Readout color={C.f} tex={`\\left[4u^{1/2}\\right]_1^2 = 4\\sqrt2 - 4 \\approx ${AREA_TOP.toFixed(3)}`} />
            ))}
          {step === 3 &&
            (showWrong ? (
              <Readout color={C.bad} tex={`\\left[\\tfrac32u^{3/2}\\right]_1^2 = 3\\sqrt2 - \\tfrac32 \\approx ${WRONG_BOT.toFixed(3)}\\;\\text{(too big)}`} />
            ) : (
              <Readout color={C.violet} tex={`\\left[\\tfrac23u^{3/2}\\right]_1^2 = \\tfrac{4\\sqrt2}{3} - \\tfrac23 \\approx ${AREA_BOT.toFixed(3)}`} />
            ))}
          {step === 3 &&
            (showWrong ? (
              <Readout color={C.bad} tex={`\\text{total} \\approx ${(WRONG_TOP - WRONG_BOT).toFixed(3)} < 0`} />
            ) : (
              <Readout color={C.good} tex={`\\text{gap} \\approx ${AREA_TOP.toFixed(3)} - ${AREA_BOT.toFixed(3)} \\approx ${EXACT.toFixed(3)}\\ \\checkmark`} />
            ))}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
