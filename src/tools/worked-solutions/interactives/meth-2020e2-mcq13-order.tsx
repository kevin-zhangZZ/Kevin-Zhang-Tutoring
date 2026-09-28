// 2020 Methods Exam 2 MCQ 13 — the bracket in each option fixes the ORDER of its two steps, and
// the order changes where the graph ends up. Pick an option and play its two steps on y = cos x,
// following the peak P that starts at (0, 1). T(v) = M(v + b) adds b first (translate), then
// multiplies by M (dilate); T(v) = Mv + b dilates first, then translates.
//   A: translate 4 left, then dilate by ½ from the y-axis — P: 0 → −4 → −2, curve y = cos(2x + 4) ✓
//   ½ then 2 left (the report's reading of cos(2(x + 2))) — P: 0 → 0 → −2, the same curve ✓
//   B: dilate by ½, then translate 4 left — P ends at −4, curve y = cos(2x + 8)
//   C: translate 2 left, then dilate by ½ — P ends at −1, curve y = cos(2x + 2)
//   D: translate 2 right, then dilate by 2 — P ends at 4, curve y = cos(x/2 − 2)
//   E: dilate by 2, then translate 2 right — P ends at 2, curve y = cos(x/2 − 1)
// Each step is interpolated from the identity, so at every moment the map is x ↦ mx + c and the
// blue curve is exactly y = cos((x − c)/m), the image of y = cos x under it.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, usePlayer } from './kit'

type Step = { kind: 'translate'; b: number } | { kind: 'dilate'; k: number }
type Route = {
  id: string
  label: string
  steps: [Step, Step]
  /** The option's rule for x′, as the student would expand it. */
  mapTex: string
  /** The graph the option really produces. */
  imageTex: string
  ok: boolean
}

const ROUTES: Route[] = [
  { id: 'A', label: 'A', steps: [{ kind: 'translate', b: -4 }, { kind: 'dilate', k: 0.5 }], mapTex: "x' = \\tfrac12(x-4) = \\tfrac12x-2", imageTex: 'y=\\cos(2x+4)', ok: true },
  { id: 'B', label: 'B', steps: [{ kind: 'dilate', k: 0.5 }, { kind: 'translate', b: -4 }], mapTex: "x' = \\tfrac12x-4", imageTex: 'y=\\cos(2x+8)', ok: false },
  { id: 'C', label: 'C', steps: [{ kind: 'translate', b: -2 }, { kind: 'dilate', k: 0.5 }], mapTex: "x' = \\tfrac12(x-2) = \\tfrac12x-1", imageTex: 'y=\\cos(2x+2)', ok: false },
  { id: 'D', label: 'D', steps: [{ kind: 'translate', b: 2 }, { kind: 'dilate', k: 2 }], mapTex: "x' = 2(x+2) = 2x+4", imageTex: 'y=\\cos\\left(\\tfrac12x-2\\right)', ok: false },
  { id: 'E', label: 'E', steps: [{ kind: 'dilate', k: 2 }, { kind: 'translate', b: 2 }], mapTex: "x' = 2x+2", imageTex: 'y=\\cos\\left(\\tfrac12x-1\\right)', ok: false },
  { id: 'R', label: '½, then 2 left', steps: [{ kind: 'dilate', k: 0.5 }, { kind: 'translate', b: -2 }], mapTex: "x' = \\tfrac12x-2", imageTex: 'y=\\cos(2x+4)', ok: true },
]

/** The map x ↦ mx + c, as [m, c]. */
type Affine = [number, number]

/** Apply a fraction u (0 to 1) of one step after the map mc. */
function apply([m, c]: Affine, step: Step, u: number): Affine {
  if (step.kind === 'translate') return [m, c + step.b * u]
  const k = 1 + (step.k - 1) * u
  return [m * k, c * k]
}

const target = (x: number) => Math.cos(2 * x + 4)

/** Tick numbers on the even integers only: every integer is too crowded at phone width. */
const evenTicks = (v: number) => (Math.round(v) % 2 === 0 && v >= -7 && v <= 5 ? String(Math.round(v)).replace('-', '−') : '')

/** −4, −2.37, 0: whole numbers as integers, otherwise two decimals, with a real minus sign. */
const fmt = (v: number) => {
  const r = Math.round(v)
  const s = Math.abs(v - r) < 0.005 ? String(r) : v.toFixed(2)
  return s === '-0' ? '0' : s.replace('-', '−')
}
/** The same for TeX. */
const tx = (v: number) => fmt(v).replace('−', '-')

function stepWords(step: Step) {
  if (step.kind === 'translate') {
    return (
      <>
        translate {Math.abs(step.b)} {step.b < 0 ? 'left' : 'right'}
      </>
    )
  }
  return (
    <>
      dilate by <M>{step.k === 0.5 ? '\\tfrac12' : String(step.k)}</M> from the <M>y</M>-axis
    </>
  )
}

function stepTex(step: Step) {
  if (step.kind === 'translate') return `x \\mapsto x ${step.b < 0 ? '-' : '+'} ${Math.abs(step.b)}`
  return `x \\mapsto ${step.k === 0.5 ? '\\tfrac12' : String(step.k)}x`
}

export default function Order() {
  const [id, setId] = useState('C')
  const [s, setS] = useState(2)
  const player = usePlayer(setS, { min: 0, max: 2, seconds: 5 })
  const route = ROUTES.find(r => r.id === id) ?? ROUTES[0]
  const [first, second] = route.steps

  const afterFirst = apply([1, 0], first, 1)
  const [m, c] = s <= 1 ? apply([1, 0], first, clamp(s, 0, 1)) : apply(afterFirst, second, clamp(s - 1, 0, 1))
  const image = (x: number) => Math.cos((x - c) / m)
  const p1 = afterFirst[1]
  const done = s > 1.995
  const bracket = route.steps[0].kind === 'translate'

  let path = 'P = (0,\\ 1)'
  if (s > 0.005 && s <= 1) path = `P: (0, 1) \\to (${tx(c)},\\ 1)`
  else if (s > 1) path = `P: (0, 1) \\to (${tx(p1)}, 1) \\to (${tx(c)},\\ 1)`

  let notice
  if (s < 0.005) {
    notice = (
      <Notice>
        {route.id === 'R' ? (
          <>
            The report&apos;s reading of <M>{'\\cos\\bigl(2(x+2)\\bigr)'}</M>: first {stepWords(first)}, then {stepWords(second)}.
          </>
        ) : bracket ? (
          <>
            In option <b>{route.id}</b> the vector is <b>inside</b> the bracket with <M>(x, y)</M>, so it is added first: {stepWords(first)},
            then {stepWords(second)}.
          </>
        ) : (
          <>
            In option <b>{route.id}</b> the matrix multiplies <M>(x, y)</M> first and the vector is added afterwards: {stepWords(first)},
            then {stepWords(second)}.
          </>
        )}{' '}
        Press <b>Play</b> and follow the peak P at <M>(0, 1)</M>. On the dashed target the matching peak is at <M>(-2, 1)</M>, where{' '}
        <M>2x + 4 = 0</M>.
      </Notice>
    )
  } else if (!done && s <= 1) {
    notice =
      first.kind === 'translate' ? (
        <Notice>
          <b>Step 1: {stepWords(first)}.</b> Every point moves the same distance sideways, so the curve keeps its shape. P goes from{' '}
          <M>0</M> to <M>{tx(c)}</M>.
        </Notice>
      ) : (
        <Notice>
          <b>Step 1: {stepWords(first)}.</b> Every <M>x</M>-coordinate is multiplied by <M>{first.k === 0.5 ? '\\tfrac12' : '2'}</M>, so
          points slide {first.k < 1 ? 'towards' : 'away from'} the <M>y</M>-axis and the waves get {first.k < 1 ? 'narrower' : 'wider'}. P
          is <i>on</i> the <M>y</M>-axis (<M>x = 0</M>), so it doesn&apos;t move.
        </Notice>
      )
  } else if (!done) {
    notice =
      second.kind === 'dilate' ? (
        <Notice>
          <b>Step 2: {stepWords(second)}.</b> Now the dilation acts on the curve <i>where it already is</i>: P&apos;s <M>x</M>-coordinate{' '}
          <M>{tx(p1)}</M> is multiplied by <M>{second.k === 0.5 ? '\\tfrac12' : '2'}</M> too, heading for <M>{tx(p1 * second.k)}</M>. A
          shift made before a dilation gets {second.k < 1 ? 'halved' : 'doubled'} by it.
        </Notice>
      ) : (
        <Notice>
          <b>Step 2: {stepWords(second)}.</b> The already-{first.kind === 'dilate' && first.k < 1 ? 'squashed' : 'stretched'} curve slides
          sideways as a whole, so P moves the full {Math.abs(second.b)} units: from <M>{tx(p1)}</M> to <M>{tx(p1 + second.b)}</M>.
        </Notice>
      )
  } else if (route.id === 'A') {
    notice = (
      <Notice tone="good">
        <b>Option A lands exactly on the target.</b> P went <M>0 \to -4 \to -2</M>: the 4 units of shift were halved to 2 by the
        dilation that came after them. The blue curve is <M>{'y = \\cos(2x + 4)'}</M> all the way along, not just at the peak. Now try
        &ldquo;½, then 2 left&rdquo;, the report&apos;s order.
      </Notice>
    )
  } else if (route.id === 'R') {
    notice = (
      <Notice tone="good">
        <b>Same curve as option A.</b> Dilating first leaves P on the <M>y</M>-axis, and then the 2-unit shift is applied at full size:{' '}
        <M>0 \to 0 \to -2</M>. &ldquo;Dilate by <M>\tfrac12</M>, then 2 left&rdquo; and &ldquo;4 left, then dilate by <M>\tfrac12</M>&rdquo;
        are the same transformation. How far you shift depends on whether the squash comes before or after.
      </Notice>
    )
  } else if (route.id === 'C') {
    notice = (
      <Notice tone="warn">
        <b>Option C stops one unit short.</b> Shifting 2 left <i>first</i> and then halving takes P to <M>-1</M>, and the curve is{' '}
        <M>{'y = \\cos(2x + 2)'}</M>, not the target. The <M>+2</M> in <M>{'\\cos\\bigl(2(x+2)\\bigr)'}</M> is the shift that comes{' '}
        <i>after</i> the dilation. To shift first, you need 4 left (option A).
      </Notice>
    )
  } else if (route.id === 'B') {
    notice = (
      <Notice tone="warn">
        <b>Option B overshoots.</b> Halving first and then moving 4 left takes P to <M>-4</M>, and the curve is{' '}
        <M>{'y = \\cos\\bigl(2(x+4)\\bigr) = \\cos(2x + 8)'}</M>. The 4 in <M>2x + 4</M> isn&apos;t the shift: read a shift only once{' '}
        <M>x</M> stands alone in the bracket, <M>{'2(x + 2)'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Option {route.id} stretches instead of squashing.</b> A factor of 2 from the <M>y</M>-axis doubles every <M>x</M>-coordinate,
        so the waves get twice as wide: the curve is <M>{route.imageTex}</M>, with period <M>4\pi</M>. The target{' '}
        <M>{'\\cos(2x+4)'}</M> has period <M>\pi</M>, so the factor must be <M>\tfrac12</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-7, 5]} y={[-1.5, 1.5]} xStep={1} yStep={1} height={250} xLabels={evenTicks} yLabels={false}>
        {s > 0.005 && <Plot.OfX y={Math.cos} domain={[-7, 5]} color={C.guide} weight={1.5} opacity={0.7} />}
        <Plot.OfX y={target} domain={[-7, 5]} color={C.good} weight={2.5} style="dashed" />
        <Plot.OfX y={image} domain={[-7, 5]} color={C.f} weight={3} />
        {s > 0.005 && <Point x={0} y={1} color={C.guide} />}
        {s > 1 && Math.abs(p1) > 0.01 && <Point x={p1} y={1} color={C.guide} />}
        <Point x={-2} y={1} color={C.good} />
        <Point x={c} y={1} color={C.f} />
        <Label at={[c, 1]} color={C.f} attach="ne">P</Label>
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.guide} tex="\text{start: } y=\cos(x)" />
          <Readout color={C.good} tex="\text{target: } y=\cos(2x+4),\ \text{peak } (-2, 1)" />
          <Readout color={C.f} tex="\text{image}" />
        </Readouts>
        <Buttons>
          {ROUTES.map(r => (
            <Toggle
              key={r.id}
              label={r.id === 'R' ? r.label : `Option ${r.label}`}
              checked={r.id === id}
              onChange={() => {
                player.stop()
                setId(r.id)
              }}
            />
          ))}
        </Buttons>
        <Slider
          label="\text{step}"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={2}
          step={0.01}
          format={v => (v < 0.005 ? 'start' : v <= 1 ? 'step 1' : 'step 2')}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(s)} label="Play the two steps" />
        </Buttons>
        <Readouts>
          <Readout tex={route.mapTex} />
          <Readout tex={`1.\\ ${stepTex(first)}, \\quad 2.\\ ${stepTex(second)}`} />
        </Readouts>
        <Readouts>
          <Readout color={C.f} tex={path} />
          {done && <Readout color={route.ok ? C.good : C.bad} tex={`${route.imageTex}\\ ${route.ok ? '\\checkmark' : '\\times'}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
