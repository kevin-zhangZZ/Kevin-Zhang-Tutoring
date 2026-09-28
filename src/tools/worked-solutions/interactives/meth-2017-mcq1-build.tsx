// 2017 Methods Exam 2 MCQ 1 — build y = 5sin(2x) − 1 from y = sin(x) one transformation at a
// time. Step by step: the 2 squeezes each wave into half the width (period 2π → π, range
// unchanged), the 5 stretches every height (range [−1, 1] → [−5, 5], period unchanged), and the
// −1 slides the whole band down (range [−6, 4], centred on the midline y = −1). The violet
// bracket is one period; the orange band is the range; the previous curve stays as a grey ghost.

import {
  C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, StepNav, tick, useSteps,
} from './kit'

const PI = Math.PI
const XMIN = -0.5
const XMAX = 2 * PI + 1.3 // margin right of 2π, kept clear of the curve, for the band labels
const XEND = 2 * PI + 0.2 // where the curves stop

type Stage = { a: number; n: number; c: number; tex: string }

const STAGES: Stage[] = [
  { a: 1, n: 1, c: 0, tex: 'y = \\sin(x)' },
  { a: 1, n: 2, c: 0, tex: 'y = \\sin(2x)' },
  { a: 5, n: 2, c: 0, tex: 'y = 5\\sin(2x)' },
  { a: 5, n: 2, c: -1, tex: 'y = 5\\sin(2x) - 1' },
]

/** Axis numbers as multiples of π/2. */
const piHalf = (v: number) => {
  const k = Math.round(v / (PI / 2))
  if (Math.abs(v - (k * PI) / 2) > 1e-6 || k <= 0 || k > 4) return ''
  if (k % 2 === 0) return k === 2 ? 'π' : `${k / 2}π`
  return k === 1 ? 'π/2' : `${k}π/2`
}

const minus = (v: number) => (v < 0 ? `−${-v}` : `${v}`)

export default function BuildSine() {
  const s = useSteps(STAGES.length)
  const { a, n, c, tex } = STAGES[s.step]
  const prev = s.step > 0 ? STAGES[s.step - 1] : null
  const P = (2 * PI) / n
  const lo = c - a
  const hi = c + a
  const yb = Math.max(hi, prev ? prev.c + prev.a : hi) + 0.9 // height of the period bracket, above both curves
  const pTex = n === 1 ? '2\\pi' : '\\pi'

  return (
    <div>
      <Plane
        x={[XMIN, XMAX]}
        y={[-7.6, 7]}
        xStep={PI / 2}
        yStep={1}
        height={340}
        xLabels={piHalf}
        yLabels={v => (v >= -6 && v <= 5 && v !== hi && v !== lo && Math.abs(v - yb) > 0.6 ? tick(v) : '')} // band edges are labelled on the right
      >
        <Region top={() => hi} bottom={() => lo} from={XMIN} to={XMAX} color={C.g} opacity={0.12} />
        <Line.ThroughPoints point1={[0, hi]} point2={[1, hi]} color={C.g} style="dashed" weight={1.5} />
        <Line.ThroughPoints point1={[0, lo]} point2={[1, lo]} color={C.g} style="dashed" weight={1.5} />
        {c !== 0 && <Line.ThroughPoints point1={[0, c]} point2={[1, c]} color={C.guide} style="dashed" weight={1.5} />}
        <Label at={[XMAX - 0.05, hi]} color={C.g} attach="nw" size={12}>{`y = ${minus(hi)}`}</Label>
        <Label at={[XMAX - 0.05, lo]} color={C.g} attach="sw" size={12}>{`y = ${minus(lo)}`}</Label>

        {prev && (
          <Plot.OfX
            y={x => prev.a * Math.sin(prev.n * x) + prev.c}
            domain={[XMIN, XEND]}
            color={C.guide}
            style="dashed"
            weight={2}
          />
        )}
        <Plot.OfX y={x => a * Math.sin(n * x) + c} domain={[XMIN, XEND]} color={C.f} weight={3} />

        <Line.Segment point1={[0, yb]} point2={[P, yb]} color={C.violet} weight={2.5} />
        <Line.Segment point1={[0, yb - 0.3]} point2={[0, yb + 0.3]} color={C.violet} weight={2.5} />
        <Line.Segment point1={[P, yb - 0.3]} point2={[P, yb + 0.3]} color={C.violet} weight={2.5} />
        <Label at={[P / 2, yb]} color={C.violet} attach="n" size={12}>{`one period = ${n === 1 ? '2π' : 'π'}`}</Label>
      </Plane>
      <Controls>
        <StepNav step={s.step} count={STAGES.length} onBack={s.back} onNext={s.next} />
        <Readouts>
          <Readout color={C.f} tex={tex} />
          <Readout color={C.violet} tex={`\\text{period} = \\tfrac{2\\pi}{${n}} = ${pTex}`} />
          <Readout color={C.g} tex={`\\text{range} = [${lo},\\ ${hi}]`} />
        </Readouts>
        {s.step === 0 && (
          <Notice>
            Start from <M>y = \sin(x)</M>: one full wave every <M>2\pi</M> (the violet bracket), trapped in the band
            from <M>-1</M> to <M>1</M> (orange). Each number in <M>5\sin(2x) - 1</M> changes this picture in one way
            only. Press Next and watch which of the two, bracket or band, moves.
          </Notice>
        )}
        {s.step === 1 && (
          <Notice>
            The <M>2</M> is a dilation by factor <M>{'\\tfrac12'}</M> from the <M>y</M>-axis. The input{' '}
            <M>2x</M> reaches <M>2\pi</M> when <M>x</M> is only <M>\pi</M>, so each wave is squeezed into half the
            width: the period halves to <M>\pi</M>. The heights have not changed, so the band is still{' '}
            <M>[-1, 1]</M>.
          </Notice>
        )}
        {s.step === 2 && (
          <Notice>
            The <M>5</M> is a dilation by factor <M>5</M> from the <M>x</M>-axis: every height is multiplied by{' '}
            <M>5</M>, so the band stretches to <M>[-5, 5]</M>. Nothing moved sideways, so the period is still{' '}
            <M>\pi</M>. The number inside the sine controls the period; the number in front controls the height.
          </Notice>
        )}
        {s.step === 3 && (
          <Notice tone="good">
            The <M>-1</M> slides everything down <M>1</M>: the band becomes <M>[-6, 4]</M>, centred on the grey
            dashed midline <M>y = -1</M>, and the period stays <M>\pi</M>. That is option C. The pattern to remember: the range of{' '}
            <M>y = a\sin(nx) + c</M> is <M>[c - a,\ c + a]</M>, the midline plus or minus the amplitude.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
