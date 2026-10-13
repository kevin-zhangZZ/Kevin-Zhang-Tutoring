// 2016 Methods Exam 2 MCQ 20 (17% correct) — what each of the three transformations does to
// the area. A sample f(x) = (x² + 2)/3 with ∫₀³ f = 5 is built up step by step: reflect in the
// y-axis (area unchanged, now over [−3, 0]), dilate ×3 from the x-axis (area ×3 = 15), translate
// 5 up (adds a 5-by-3 rectangle = 15, total 30). The last step shows the two pieces in different
// colours, because the popular wrong answer (C, 20) added 5 instead of the rectangle's 15.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, StepNav, useSteps } from './kit'

const f = (x: number) => (x * x + 2) / 3
const refl = (x: number) => f(-x)
const dil = (x: number) => 3 * f(-x)
const trans = (x: number) => 3 * f(-x) + 5
const zero = () => 0
const five = () => 5

const TITLES = [
  'Start: y = f(x)',
  'Reflect in the y-axis',
  'Dilate by factor 3 from the x-axis',
  'Translate 5 units up',
]

export default function AreaSteps() {
  const steps = useSteps(4)
  const s = steps.step

  const curve = s === 0 ? f : s === 1 ? refl : s === 2 ? dil : trans
  const prev = s === 1 ? f : s === 2 ? refl : s === 3 ? dil : null
  const from = s === 0 ? 0 : -3
  const to = s === 0 ? 3 : 0

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        A sample <M>f</M> with <M>{'\\int_0^3 f(x)\\,dx = 5'}</M>: the shaded area is <M>5</M>. Any <M>f</M> with this
        integral gives the same final answer. Press Next to apply the transformations one at a time.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        The reflection is a mirror image: the same region, now over <M>[-3, 0]</M>. <b>The area is still 5</b>.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice>
        Every height is tripled while the width stays 3, so <b>the area triples to 15</b>. Stopping here gives
        option B.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Lifting the graph 5 units adds the orange <b>rectangle under it, 5 high and 3 wide</b>: area{' '}
        <M>{'5\\times3 = 15'}</M>, not <M>5</M>. Total <M>15 + 15 = 30</M>. Adding just 5 gives 20, option C, the most
        popular answer.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 4]} y={[-1, 17]} xStep={1} yStep={2} height={380}>
        {s < 3 && <Region top={curve} bottom={zero} from={from} to={to} color={C.f} opacity={0.25} />}
        {s === 3 && (
          <>
            <Region top={trans} bottom={five} from={-3} to={0} color={C.f} opacity={0.25} />
            <Region top={five} bottom={zero} from={-3} to={0} color={C.g} opacity={0.3} />
            <Line.Segment point1={[-3, 5]} point2={[0, 5]} color={C.g} style="dashed" weight={2} />
            <Label at={[-1.5, 2.5]} color={C.g} attach="c">5 × 3 = 15</Label>
            <Label at={[-1.5, 7]} color={C.f} attach="c">15</Label>
          </>
        )}
        {s < 3 && <Label at={[(from + to) / 2, s === 2 ? 2 : 0.7]} color={C.f} attach="c">{s === 2 ? '15' : '5'}</Label>}
        {prev && <Plot.OfX y={prev} domain={[s === 1 ? 0 : -3, s === 1 ? 3 : 0]} color={C.guide} style="dashed" weight={2} />}
        <Plot.OfX y={curve} domain={[from, to]} color={C.f} weight={3} />
        <Line.Segment point1={[from, 0]} point2={[from, curve(from)]} color={C.f} weight={1.5} />
        <Line.Segment point1={[to, 0]} point2={[to, curve(to)]} color={C.f} weight={1.5} />
      </Plane>
      <Controls>
        <StepNav step={s} count={4} onBack={steps.back} onNext={steps.next} />
        <div className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{TITLES[s]}</div>
        <Readouts>
          {s === 0 && <Readout color={C.f} tex="\int_0^3 f(x)\,dx = 5" />}
          {s === 1 && <Readout color={C.f} tex="\int_{-3}^0 f(-x)\,dx = 5" />}
          {s === 2 && <Readout color={C.f} tex="\int_{-3}^0 3f(-x)\,dx = 3\times5 = 15" />}
          {s === 3 && <Readout color={C.f} tex="\text{curve part} = 15" />}
          {s === 3 && <Readout color={C.g} tex="\text{rectangle} = 5\times3 = 15" />}
          {s === 3 && <Readout color={C.good} tex="\int_{-3}^0 g(x)\,dx = 30" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
