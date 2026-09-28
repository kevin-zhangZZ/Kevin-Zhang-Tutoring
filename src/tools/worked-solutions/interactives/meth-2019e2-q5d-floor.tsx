// 2019 Methods Exam 2 Q5d — the shaded area as a sum of vertical strips, drawn for a = 1/2
// (tangent y = 5/4 − 3x/4, P(−1, 2), Q(5/3, 0)). Every strip's ceiling is the tangent; its floor is
// the curve up to x = 1 and the x-axis after it, which is why A(a) needs two integrals split at
// x = 1 (not at x = a). Two toggles replay the examiner's report's two common incorrect integrals:
// "floor = curve all the way to Q" (adds the piece between the axis and the curve below the axis)
// and "split at x = a" (adds the unshaded area under the curve between a and 1).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region, Slider,
  Toggle, integrate, tick, usePlayer,
} from './kit'

const A = 0.5
const f = (x: number) => 1 - x ** 3
const tan = (x: number) => 2 * A ** 3 + 1 - 3 * A * A * x // 5/4 − 3x/4
const XP = -2 * A // −1
const XQ = (2 * A ** 3 + 1) / (3 * A * A) // 5/3
const zero = () => 0
const W = 0.03

type Mode = 'right' | 'curve' | 'atA'

// The floor each method uses. The true floor is the curve until it crosses the axis at x = 1.
const floorOf = (mode: Mode) => (x: number) =>
  mode === 'curve' ? f(x) : x <= (mode === 'atA' ? A : 1) ? f(x) : 0
const trueFloor = floorOf('right')

// Area swept from P to x0 with the chosen floor, integrated piece by piece so the jump in the
// floor doesn't blur the Simpson sum.
function swept(mode: Mode, x0: number) {
  const brk = mode === 'atA' ? A : 1
  const fl = floorOf(mode)
  if (mode === 'curve' || x0 <= brk) return integrate(x => tan(x) - fl(x), XP, x0)
  return integrate(x => tan(x) - f(x), XP, brk) + integrate(x => tan(x), brk, x0)
}

const TOTAL: Record<Mode, string> = {
  right: '\\tfrac{2}{3} \\approx 0.667\\ \\checkmark',
  curve: '\\tfrac{136}{81} \\approx 1.679\\ \\text{(too big)}',
  atA: '\\tfrac{179}{192} \\approx 0.932\\ \\text{(too big)}',
}

export default function Floor() {
  const [x0, setX0] = useState(1.3)
  const [mode, setMode] = useState<Mode>('right')
  const player = usePlayer(setX0, { min: XP, max: XQ, seconds: 7 })

  const fl = floorOf(mode)
  const bottom = fl(x0)
  const ceil = tan(x0)
  const trueBottom = trueFloor(x0)
  const nearA = Math.abs(x0 - A) < 0.03
  const near1 = Math.abs(x0 - 1) < 0.02
  const atEnd = x0 > XQ - 0.005
  const wrongHere = (mode === 'curve' && x0 > 1) || (mode === 'atA' && x0 > A && x0 < 1)
  const floorIsCurve = mode === 'curve' || x0 <= (mode === 'atA' ? A : 1)
  const stripColor = x0 <= 1 ? C.f : C.g
  const s0 = Math.max(XP, x0 - W / 2)
  const s1 = Math.min(XQ, x0 + W / 2)
  const strip = (lo: number, hi: number) => [[s0, lo], [s1, lo], [s1, hi], [s0, hi]] as [number, number][]

  let notice
  if (mode === 'curve' && x0 > 1) {
    notice = (
      <Notice tone="warn">
        This is the report&apos;s first common incorrect integral, <M>{'\\int_{-2a}^{x_Q}\\left(\\text{tangent} - f(x)\\right)dx'}</M>.
        Right of <M>x = 1</M> the curve has gone <b>below</b> the axis, so a strip from the curve up to the tangent also
        takes in the red piece between the axis and the curve. That piece isn&apos;t shaded in the diagram: the region
        stops at the axis. It adds <M>{'\\int_1^{x_Q}(x^3 - 1)\\,dx'}</M>, which is <M>{'\\tfrac{82}{81}'}</M> when <M>{'a = \\tfrac12'}</M>.
      </Notice>
    )
  } else if (mode === 'atA' && x0 > A && x0 < 1) {
    notice = (
      <Notice tone="warn">
        This is the report&apos;s second common incorrect integral: it switches to &ldquo;tangent minus nothing&rdquo; at{' '}
        <M>x = a</M>. But between <M>a</M> and <M>1</M> the curve is still <b>above</b> the axis, so a strip down to the axis
        takes in the red piece <em>under the curve</em>, which is not shaded. It adds{' '}
        <M>{'\\int_a^1 (1 - x^3)\\,dx'}</M>, which is <M>{'\\tfrac{17}{64}'}</M> when <M>{'a = \\tfrac12'}</M>. Nothing about the
        floor changes at <M>x = a</M>; it changes where the curve crosses the axis.
      </Notice>
    )
  } else if (nearA) {
    notice = (
      <Notice>
        At <M>x = a</M> the strip has <b>zero height</b>: the tangent touches the curve here but doesn&apos;t cross it (part
        c.&apos;s double root). The tangent is still the ceiling and the curve is still the floor on both sides, so
        nothing needs splitting at <M>x = a</M>.
      </Notice>
    )
  } else if (near1) {
    notice = (
      <Notice tone="good">
        <b>This is where the floor changes.</b> The curve crosses the <M>x</M>-axis at <M>x = 1</M> (since{' '}
        <M>{'1 - x^3 = 0'}</M>). Left of here the region sits on the curve; right of here it sits on the axis. So the area
        is split into two integrals at <M>x = 1</M>.
      </Notice>
    )
  } else if (atEnd) {
    notice = mode === 'right' ? (
      <Notice tone="good">
        All strips added: <M>{'\\tfrac12 + \\tfrac16 = \\tfrac23'}</M> (the sky piece plus the orange triangle), which is the
        rule <M>{'A(a) = \\frac{80a^6 + 8a^3 - 9a^2 + 2}{12a^2}'}</M> at <M>{'a = \\tfrac12'}</M>. Now switch on a toggle and
        sweep again to see what each of the report&apos;s wrong integrals adds.
      </Notice>
    ) : (
      <Notice tone="warn">
        This method has added strips that aren&apos;t in the shaded region (red), so its total is bigger than the true{' '}
        <M>{'\\tfrac23'}</M>. Turn the toggle off and compare.
      </Notice>
    )
  } else if (x0 < 1) {
    notice = (
      <Notice>
        Left of <M>x = 1</M> each strip runs from the <b>curve</b> up to the <b>tangent</b>, so its height is{' '}
        <M>{'(2a^3 + 1 - 3a^2x) - (1 - x^3)'}</M>. The first integral adds these from <M>P</M> at <M>x = -2a</M> to{' '}
        <M>x = 1</M>. {mode === 'right' ? 'Drag on past x = 1 and watch what the floor does.' : 'Keep sweeping to see where this method goes wrong.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Right of <M>x = 1</M> the curve has dropped below the axis, but the shaded region stops at the axis. So the floor
        is now <M>y = 0</M> and each strip&apos;s height is just the tangent, <M>{'2a^3 + 1 - 3a^2x'}</M>. That&apos;s the
        second integral, from <M>1</M> to <M>{'x_Q'}</M>. Try the toggles to see the report&apos;s two wrong versions.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-1.2, 1.9]}
        y={[-3.75, 2.25]}
        xStep={0.5}
        yStep={1}
        height={380}
        xLabels={v => (Math.abs(v - 1) < 1e-9 || v < -1.2 ? '' : tick(v))}
      >
        {/* the whole true region, faint, so the target is always visible */}
        <Region top={tan} bottom={f} from={XP} to={1} color={C.guide} opacity={0.12} />
        <Region top={tan} bottom={zero} from={1} to={XQ} color={C.guide} opacity={0.12} />
        {/* swept so far */}
        <Region top={tan} bottom={f} from={XP} to={Math.min(x0, 1)} color={C.f} opacity={0.3} />
        <Region top={tan} bottom={zero} from={1} to={x0} color={C.g} opacity={0.3} />
        {mode === 'curve' && <Region top={zero} bottom={f} from={1} to={x0} color={C.bad} opacity={0.3} />}
        {mode === 'atA' && <Region top={f} bottom={zero} from={A} to={Math.min(x0, 1)} color={C.bad} opacity={0.3} />}

        <Plot.OfX y={f} domain={[-1.2, 1.67]} color={C.f} weight={3} />
        <Plot.OfX y={tan} domain={[-1.2, 1.9]} color={C.violet} weight={2.5} />

        {/* the strip at x0: the part that belongs to the region, then any wrongly added part */}
        {Math.abs(ceil - trueBottom) > 1e-3 && (
          <Polygon points={strip(trueBottom, ceil)} color={stripColor} fillOpacity={0.85} weight={1} />
        )}
        {wrongHere && <Polygon points={strip(bottom, trueBottom)} color={C.bad} fillOpacity={0.85} weight={1} />}

        <Point x={XP} y={f(XP)} color={C.ink} />
        <Label at={[XP, f(XP)]} attach="e">P</Label>
        <Point x={A} y={f(A)} color={C.violet} />
        <Label at={[A, f(A)]} color={C.violet} attach="ne">x = a</Label>
        <Point x={XQ} y={0} color={C.ink} />
        <Label at={[XQ, 0]} attach="ne">Q</Label>
        <Point x={1} y={0} color={C.good} />
        <Label at={[1, 0]} color={C.good} attach="nw">x = 1</Label>
        <Label at={[1.45, f(1.45)]} color={C.f} attach="e">f</Label>
        <Label at={[-0.75, tan(-0.75)]} color={C.violet} attach="ne">tangent</Label>
        {mode !== 'curve' && x0 > 1 && <Line.Segment point1={[1, 0]} point2={[XQ, 0]} color={C.g} weight={3} />}
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x0}
          onChange={v => {
            player.stop()
            setX0(v)
          }}
          min={XP}
          max={XQ}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x0)} label="Sweep from P to Q" />
          <Toggle
            label="Floor = curve all the way"
            checked={mode === 'curve'}
            onChange={v => setMode(v ? 'curve' : 'right')}
          />
          <Toggle label="Split at x = a" checked={mode === 'atA'} onChange={v => setMode(v ? 'atA' : 'right')} />
        </Buttons>
        <Readouts>
          <Readout
            color={wrongHere ? C.bad : stripColor}
            tex={floorIsCurve ? `\\text{floor: } y = f(x) = ${bottom.toFixed(3)}` : `\\text{floor: the axis, } y = 0`}
          />
          <Readout tex={`\\text{height} = ${(ceil - bottom).toFixed(3)}`} />
          <Readout
            color={mode === 'right' ? undefined : C.bad}
            tex={atEnd ? `\\text{total} = ${TOTAL[mode]}` : `\\text{area so far} \\approx ${swept(mode, x0).toFixed(3)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
