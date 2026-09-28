// 2018 Methods Exam 1 Q3b — build f(x) = 2cos(x) + 1 on [0, 2π] from y = cos(x) in steps, on
// VCAA's own grid (x every π/3, y from −2 to 4). Step 2: the 2 doubles every height (arrows) but
// leaves the x-values, the period and the axis crossings alone. Step 3: the +1 lifts everything
// by 1, and the points of y = 2cos(x) at height −1 (where 2cos(x) = −1, part a's equation) land
// exactly on the x-axis, which is why the intercepts are part a's 2π/3 and 4π/3. Step 4: the
// finished sketch, with toggles for the flat tangents at the endpoints (f′ = −2sin x = 0 there)
// and for the "more than one cycle" slip, read here as cos(2x): its four crossings contradict
// part a.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle, Vector,
  useSteps,
} from './kit'

const PI = Math.PI
const TAU = 2 * PI
const THIRDS = ['', 'π/3', '2π/3', 'π', '4π/3', '5π/3', '2π']
const xLab = (v: number) => {
  const k = Math.round(v / (PI / 3))
  return Math.abs(v - (k * PI) / 3) < 1e-6 && k >= 0 && k <= 6 ? THIRDS[k] : ''
}
const GRID = [0, 1, 2, 3, 4, 5, 6].map(k => (k * PI) / 3)

// the curve at each step
const CURVES = [
  (x: number) => Math.cos(x),
  (x: number) => 2 * Math.cos(x),
  (x: number) => 2 * Math.cos(x) + 1,
  (x: number) => 2 * Math.cos(x) + 1,
]
const RULES = ['y = \\cos x', 'y = 2\\cos x', 'y = 2\\cos x + 1', 'f(x) = 2\\cos x + 1']
const RANGES = ['[-1,\\ 1]', '[-2,\\ 2]', '[-1,\\ 3]', '[-1,\\ 3]']
const TOP = [1, 2, 3, 3] // the endpoint height at each step (its tick number is hidden under the label)
const wrong = (x: number) => 2 * Math.cos(2 * x) + 1

export default function BuildGraph() {
  const { step, next, back } = useSteps(4)
  const [tangents, setTangents] = useState(false)
  const [slip, setSlip] = useState(false)

  const f = CURVES[step]
  const prev = step > 0 && step < 3 ? CURVES[step - 1] : null
  const showSlip = step === 3 && slip

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        Start from <M>{'y=\\cos x'}</M> on <M>{'[0,2\\pi]'}</M>: exactly <b>one full cycle</b>, since its period is{' '}
        <M>{'2\\pi'}</M>. It starts at a maximum <M>{'(0,1)'}</M>, falls to the minimum <M>{'(\\pi,-1)'}</M> and climbs
        back to <M>{'(2\\pi,1)'}</M>, crossing the axis at <M>{'\\tfrac{\\pi}{2}'}</M> and <M>{'\\tfrac{3\\pi}{2}'}</M>.
        Press Next to apply the 2.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        The 2 multiplies the <b>output</b>: a dilation by factor 2 from the <M>x</M>-axis. Every height doubles (purple
        arrows), so the maximum rises to <M>{'(0,2)'}</M> and the minimum drops to <M>{'(\\pi,-2)'}</M>. The{' '}
        <M>x</M>-values don&apos;t change: it is still one cycle, and the crossings stay at <M>{'\\tfrac{\\pi}{2}'}</M>{' '}
        and <M>{'\\tfrac{3\\pi}{2}'}</M>, because <M>{'2\\times 0 = 0'}</M>.
      </Notice>
    )
  } else if (step === 2) {
    notice = (
      <Notice tone="good">
        The +1 lifts every point up 1. Watch the orange line <M>{'y=-1'}</M>: the grey curve <M>{'y=2\\cos x'}</M> meets
        it where <M>{'2\\cos x = -1'}</M>, which is <b>part a&apos;s equation</b>. The lift carries exactly those two
        points onto the <M>x</M>-axis (green arrows), so the new intercepts are <M>{'\\tfrac{2\\pi}{3}'}</M> and{' '}
        <M>{'\\tfrac{4\\pi}{3}'}</M>, not <M>{'\\tfrac{\\pi}{2}'}</M> and <M>{'\\tfrac{3\\pi}{2}'}</M>.
      </Notice>
    )
  } else if (showSlip) {
    notice = (
      <Notice tone="warn">
        The red curve is <M>{'y=2\\cos(2x)+1'}</M>: the 2 read as squeezing the wave sideways, which halves the period and
        fits <b>two cycles</b> in. It crosses the axis four times (<M>{'\\tfrac{\\pi}{3},\\tfrac{2\\pi}{3},\\tfrac{4\\pi}{3},\\tfrac{5\\pi}{3}'}</M>)
        with minimums at <M>{'\\tfrac{\\pi}{2}'}</M> and <M>{'\\tfrac{3\\pi}{2}'}</M>, but part a found only two solutions. When the sketch and part a
        disagree, the sketch is wrong.
      </Notice>
    )
  } else if (tangents) {
    notice = (
      <Notice tone="good">
        <M>{"f'(x) = -2\\sin x"}</M>, and <M>{"f'(0) = f'(2\\pi) = 0"}</M>, so the tangent at each endpoint is horizontal
        (purple). The curve must leave <M>{'(0,3)'}</M> and arrive at <M>{'(2\\pi,3)'}</M> flat, like the top of a hill,
        not at a slant. That is the care with shape at the endpoints that the report says successful students took.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The finished sketch: one cycle, range <M>{'[-1,3]'}</M>, closed endpoints <M>{'(0,3)'}</M> and{' '}
        <M>{'(2\\pi,3)'}</M>, minimum <M>{'(\\pi,-1)'}</M>, and axis crossings at part a&apos;s answers. Turn on
        &ldquo;Tangents at the endpoints&rdquo; to check the shape there, then try the cos(2x) slip.
      </Notice>
    )
  }

  // coordinate labels for the maximum/minimum/endpoints at each step
  const keyLabels: Record<number, [number, number, string, 'ne' | 'nw' | 's' | 'e' | 'w'][]> = {
    0: [[0, 1, '(0, 1)', 'ne'], [PI, -1, '(π, −1)', 's'], [TAU, 1, '(2π, 1)', 'nw']],
    1: [[0, 2, '(0, 2)', 'ne'], [PI, -2, '(π, −2)', 's'], [TAU, 2, '(2π, 2)', 'nw']],
    2: [],
    3: [[0, 3, '(0, 3)', 'ne'], [PI, -1, '(π, −1)', 's'], [TAU, 3, '(2π, 3)', 'nw']],
  }

  return (
    <div>
      <Plane
        x={[0, TAU]}
        y={[-2, 4]}
        xStep={PI / 3}
        yStep={1}
        height={320}
        xLabels={v => (step === 2 && [2, 4].some(k => Math.abs(v - (k * PI) / 3) < 1e-6) ? '' : xLab(v))}
        yLabels={v => (step !== 2 && Math.abs(v - TOP[step]) < 1e-9 ? '' : String(v))}
      >
        {/* the previous step's curve, as a ghost */}
        {prev && <Plot.OfX y={prev} domain={[0, TAU]} color={C.guide} style="dashed" weight={2} />}

        {/* step 2: every height doubles */}
        {step === 1 &&
          GRID.filter(x => Math.abs(Math.cos(x)) > 0.1).map(x => (
            <Vector key={x} tail={[x, Math.cos(x)]} tip={[x, 2 * Math.cos(x)]} color={C.violet} />
          ))}

        {/* step 3: every point up 1; the two at height −1 land on the axis */}
        {step === 2 && (
          <>
            <Line.Segment point1={[0, -1]} point2={[TAU, -1]} color={C.g} style="dashed" weight={2} />
            <Label at={[TAU - 0.05, -1]} color={C.g} attach="nw">y = −1</Label>
            {GRID.map(x => {
              const onAxis = Math.abs(2 * Math.cos(x) + 1) < 1e-9
              return <Vector key={x} tail={[x, 2 * Math.cos(x)]} tip={[x, 2 * Math.cos(x) + 1]} color={onAxis ? C.good : C.violet} />
            })}
            {[(2 * PI) / 3, (4 * PI) / 3].map(x => (
              <Point key={x} x={x} y={-1} color={C.g} />
            ))}
          </>
        )}

        {/* the wrong idea: two cycles */}
        {showSlip && (
          <>
            <Plot.OfX y={wrong} domain={[0, TAU]} color={C.bad} weight={2.5} />
            {[1, 2, 4, 5].map(k => (
              <Point key={k} x={(k * PI) / 3} y={0} color={C.bad} />
            ))}
          </>
        )}

        {/* the flat tangents at the endpoints */}
        {step === 3 && tangents && (
          <>
            <Line.Segment point1={[-0.35, 3]} point2={[1.0, 3]} color={C.violet} weight={3} />
            <Line.Segment point1={[TAU - 1.0, 3]} point2={[TAU + 0.35, 3]} color={C.violet} weight={3} />
          </>
        )}

        <Plot.OfX y={f} domain={[0, TAU]} color={C.f} weight={3} />

        {/* axis crossings */}
        {step < 2 &&
          [PI / 2, (3 * PI) / 2].map((x, i) => (
            <g key={x}>
              <Point x={x} y={0} color={C.f} />
              <Label at={[x, 0]} attach={i === 0 ? 'ne' : 'nw'}>{i === 0 ? 'π/2' : '3π/2'}</Label>
            </g>
          ))}
        {step >= 2 && [(2 * PI) / 3, (4 * PI) / 3].map(x => <Point key={x} x={x} y={0} color={C.good} />)}
        {/* the arrows cover these two tick numbers at step 3, so name the new intercepts above the axis */}
        {step === 2 && (
          <>
            <Label at={[(2 * PI) / 3, 0]} color={C.good} attach="ne">2π/3</Label>
            <Label at={[(4 * PI) / 3, 0]} color={C.good} attach="nw">4π/3</Label>
          </>
        )}

        {/* key points */}
        {step !== 2 && [0, PI, TAU].map(x => <Point key={x} x={x} y={f(x)} color={C.f} />)}
        {keyLabels[step].map(([x, y, text, at]) => (
          <Label key={text} at={[x, y]} attach={at} gap={9}>{text}</Label>
        ))}
      </Plane>
      <Controls>
        <StepNav step={step} count={4} onBack={back} onNext={next} />
        {step === 3 && (
          <Buttons>
            <Toggle label="Tangents at the endpoints" checked={tangents} onChange={setTangents} />
            <Toggle label="Read it as cos(2x)" checked={slip} onChange={setSlip} />
          </Buttons>
        )}
        <Readouts>
          <Readout color={C.f} tex={RULES[step]} />
          <Readout tex={`\\text{range } ${RANGES[step]}`} />
          <Readout tex="\text{period } 2\pi" />
          {showSlip && <Readout color={C.bad} tex="y = 2\cos(2x)+1:\ \text{period } \pi" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
