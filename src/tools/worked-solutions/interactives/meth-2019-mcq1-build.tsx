// 2019 Methods Exam 2 MCQ 1 — build f(x) = 3sin(2x/5) − 2 from y = sin x one number at a time,
// tracking the period and range at each step. Step 2 puts the 2/5 inside: the graph stretches
// sideways by 5/2, so a cycle takes 2π ÷ 2/5 = 5π; a red marker at x = 5π/2 (π ÷ 2/5, the period
// in options D and E) shows the curve only half-way through its cycle there. Step 3 stretches up
// by 3 (range [−3, 3], option A's range) without touching the period; step 4 slides down 2 so the
// wave swings 3 either side of the centre line y = −2: range [−5, 1], option B. The previous
// step's curve stays on as a grey dashed ghost so each change is visible.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, useSteps } from './kit'

const PI = Math.PI
const X1 = 17

type Step = {
  f: (x: number) => number
  period: number
  amp: number
  shift: number
  rule: string
  periodTex: string
  rangeTex: string
  periodTxt: string
}

const STEPS: Step[] = [
  {
    f: x => Math.sin(x),
    period: 2 * PI,
    amp: 1,
    shift: 0,
    rule: 'y = \\sin x',
    periodTex: '2\\pi',
    rangeTex: '[-1,\\ 1]',
    periodTxt: '2π',
  },
  {
    f: x => Math.sin((2 * x) / 5),
    period: 5 * PI,
    amp: 1,
    shift: 0,
    rule: 'y = \\sin\\!\\left(\\tfrac{2x}{5}\\right)',
    periodTex: '2\\pi \\div \\tfrac25 = 5\\pi',
    rangeTex: '[-1,\\ 1]',
    periodTxt: '5π',
  },
  {
    f: x => 3 * Math.sin((2 * x) / 5),
    period: 5 * PI,
    amp: 3,
    shift: 0,
    rule: 'y = 3\\sin\\!\\left(\\tfrac{2x}{5}\\right)',
    periodTex: '5\\pi',
    rangeTex: '[-3,\\ 3]',
    periodTxt: '5π',
  },
  {
    f: x => 3 * Math.sin((2 * x) / 5) - 2,
    period: 5 * PI,
    amp: 3,
    shift: -2,
    rule: 'y = 3\\sin\\!\\left(\\tfrac{2x}{5}\\right) - 2',
    periodTex: '5\\pi',
    rangeTex: '[-5,\\ 1]',
    periodTxt: '5π',
  },
]

const piTick = (v: number) => {
  const n = Math.round(v / PI)
  return n === 1 ? 'π' : `${n}π`
}

export default function Build() {
  const { step, next, back } = useSteps(STEPS.length)
  const s = STEPS[step]
  const prev = step > 0 ? STEPS[step - 1] : null
  const top = s.shift + s.amp
  const bot = s.shift - s.amp
  const by = top + 0.5 // height of the period bracket (a half-integer, clear of the y-axis numbers)

  const notices = [
    <Notice key={0}>
      Start from <M>y = \sin x</M>: one full cycle every <M>2\pi</M> (the bracket), and it never leaves{' '}
      <M>{'[-1,\\ 1]'}</M> (the green lines). Each <em>Next</em> puts in one of the three numbers from{' '}
      <M>{'f(x) = 3\\sin\\left(\\tfrac{2x}{5}\\right) - 2'}</M>. Watch which of the period and range it changes.
    </Notice>,
    <Notice key={1}>
      Multiplying <M>x</M> by <M>{'\\tfrac25'}</M> stretches the graph sideways by the reciprocal,{' '}
      <M>{'\\tfrac52'}</M>: the angle <M>{'\\tfrac{2x}{5}'}</M> only reaches <M>2\pi</M> when <M>x = 5\pi</M>, so one
      cycle is <M>5\pi</M> long. The red line is <M>{'\\pi \\div \\tfrac25 = \\tfrac{5\\pi}{2}'}</M>, the period in options D
      and E: there the curve is back on the middle but heading <em>down</em>. That is only half a cycle.
    </Notice>,
    <Notice key={2}>
      The <M>3</M> out the front stretches the graph vertically: the wave now swings <M>3</M> above and <M>3</M> below the{' '}
      <M>x</M>-axis, so the range is <M>{'[-3,\\ 3]'}</M>. The period hasn&apos;t moved (a vertical stretch can&apos;t change how
      long a cycle takes). Stopping here gives option A&apos;s range; press <em>Next</em> for the last number.
    </Notice>,
    <Notice key={3} tone="good">
      Subtracting <M>2</M> slides everything down <M>2</M>. The centre line is now <M>y = -2</M> and the wave still swings{' '}
      <M>3</M> either side: top <M>-2 + 3 = 1</M>, bottom <M>-2 - 3 = -5</M>. Range <M>{'[-5,\\ 1]'}</M>, period still{' '}
      <M>5\pi</M>: option B. Sliding <em>up</em> <M>2</M> by mistake gives <M>{'[-1,\\ 5]'}</M>, option C.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[0, X1]} y={[-6, 4.5]} xStep={PI} yStep={1} height={340} xLabels={piTick}>
        {/* the range: green lines at the top and bottom of the wave */}
        <Line.Segment point1={[0, top]} point2={[X1, top]} color={C.good} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, bot]} point2={[X1, bot]} color={C.good} style="dashed" weight={1.5} />

        {/* centre line after the translation */}
        {s.shift !== 0 && (
          <>
            <Line.Segment point1={[0, s.shift]} point2={[X1, s.shift]} color={C.violet} style="dashed" weight={1.5} />
            <Label at={[1.3, s.shift]} attach="se" color={C.violet} size={12}>centre y = −2</Label>
          </>
        )}

        {prev && <Plot.OfX y={prev.f} domain={[0, X1]} color={C.guide} weight={1.5} style="dashed" />}
        <Plot.OfX y={s.f} domain={[0, X1]} color={C.f} weight={3} />

        {/* amplitude: 3 up to the top, 3 down to the bottom, from the centre line */}
        {s.amp === 3 && (
          <>
            <Line.Segment point1={[(5 * PI) / 4, s.shift]} point2={[(5 * PI) / 4, top]} color={C.g} weight={2.5} />
            <Line.Segment point1={[(15 * PI) / 4, s.shift]} point2={[(15 * PI) / 4, bot]} color={C.g} weight={2.5} />
            <Label at={[(5 * PI) / 4, s.shift + 1.5]} attach="e" color={C.g} size={13}>3</Label>
            <Label at={[(15 * PI) / 4, s.shift - 1.5]} attach="e" color={C.g} size={13}>3</Label>
          </>
        )}

        {/* one period */}
        <Line.Segment point1={[0, by]} point2={[s.period, by]} color={C.ink} weight={1.5} />
        <Line.Segment point1={[0, by - 0.2]} point2={[0, by + 0.2]} color={C.ink} weight={1.5} />
        <Line.Segment point1={[s.period, by - 0.2]} point2={[s.period, by + 0.2]} color={C.ink} weight={1.5} />
        {/* a short bracket (step 1) gets its label off the right end, clear of the y-axis numbers */}
        <Label
          at={s.period < 10 ? [s.period, by] : [s.period / 2, by]}
          attach={s.period < 10 ? 'e' : 'n'}
          size={12}
        >{`one period = ${s.periodTxt}`}</Label>
        <Point x={s.period} y={s.f(s.period)} color={C.good} />

        {/* the π ÷ 2/5 slip: only half a cycle */}
        {step === 1 && (
          <>
            <Line.Segment point1={[(5 * PI) / 2, -1.5]} point2={[(5 * PI) / 2, 1.4]} color={C.bad} style="dashed" weight={2} />
            <Point x={(5 * PI) / 2} y={0} color={C.bad} />
            <Label at={[(5 * PI) / 2, -1.5]} attach="s" color={C.bad} size={12}>5π/2 is only half a cycle</Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={STEPS.length} onBack={back} onNext={next} />
        <Readouts>
          <Readout color={C.f} tex={s.rule} />
          <Readout tex={`\\text{period} = ${s.periodTex}`} />
          <Readout color={C.good} tex={`\\text{range} = ${s.rangeTex}`} />
        </Readouts>
        {notices[step]}
      </Controls>
    </div>
  )
}
