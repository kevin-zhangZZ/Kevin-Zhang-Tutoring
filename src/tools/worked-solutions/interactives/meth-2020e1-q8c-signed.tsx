// 2020 Methods Exam 1 Q8c — why the area is MINUS the integral. Sweep the upper terminal t from
// x = a = 1/e: between a and b = 1 every strip of f(x) = x·log_e(x) hangs below the axis, so it
// adds a negative amount and the running integral F(t) − F(1/e) (F from part b.) falls, bottoming
// out at x = b at −0.148 — the area (e² − 3)/(4e²) ≈ 0.148 with a minus sign. Past b the strips are
// positive and cancel the negative ones (the integral is back to 0 at x ≈ 1.508, scipy), which is
// why the region stops at the x-intercept and why an integral is a signed area.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Region,
  Slider, usePlayer,
} from './kit'

const A = 1 / Math.E
const f = (x: number) => x * Math.log(x)
// Part b.'s antiderivative: the running integral from a is F(t) − F(a), exactly.
const F = (x: number) => (x * x * Math.log(x)) / 2 - (x * x) / 4
const AREA = (Math.E ** 2 - 3) / (4 * Math.E ** 2)
const T_MAX = 1.6
const T_ZERO = 1.508 // where the signed integral from a returns to 0
const W = 0.022
const TOL = 0.006

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 4.5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2 } }} />
}

const fmt = (v: number, dp = 3) => v.toFixed(dp).replace('-', '−')

export default function SignedAreaWidget() {
  const [t0, setT] = useState(0.8)
  const player = usePlayer(setT, { min: A, max: T_MAX, seconds: 7 })
  const atB = Math.abs(t0 - 1) < TOL
  const t = atB ? 1 : t0
  const I = F(t) - F(A)
  const ft = f(t)
  const below = t < 1 - TOL / 2
  const stripColor = atB ? C.good : below ? C.bad : C.good
  const s0 = Math.max(A, t - W / 2)
  const s1 = Math.min(T_MAX, t + W / 2)

  let notice
  if (atB) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = b = 1</M> the curve is back on the axis</b>, since <M>\log_e(1) = 0</M>, so the region ends here. The
        integral is <M>{'\\int_{1/e}^{1} f(x)\\,dx \\approx -0.148'}</M>: negative, because every strip in it was below
        the axis. An area can&apos;t be negative, so the area is the negative of the integral:{' '}
        <M>{'-\\int_{1/e}^{1} f(x)\\,dx = \\tfrac{e^2-3}{4e^2} \\approx 0.148'}</M>. Leaving out that minus sign is the
        oversight the report describes.
      </Notice>
    )
  } else if (below) {
    notice = (
      <Notice>
        Between <M>x = a</M> and <M>x = b</M> each strip <b>hangs below the axis</b>: its height{' '}
        <M>f(x) = x\log_e(x)</M> is negative, because <M>x &gt; 0</M> but <M>\log_e(x) &lt; 0</M> for <M>x &lt; 1</M>.
        So every strip adds a negative amount, and the running integral goes <i>down</i> (to{' '}
        <M>\approx {fmt(I)}</M> so far) while the shaded area grows. Press play, or drag <M>t</M> to <M>b = 1</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Past <M>b</M> the strips are above the axis, so they are <b>positive</b> and start cancelling the negative ones:
        the integral has climbed back to <M>\approx {fmt(I)}</M>
        {t > T_ZERO ? ', and has passed 0 even though there is shaded area on both sides' : ''}. An integral adds up
        signed heights; it is not an area. That is why the region stops at the <M>x</M>-intercept <M>b</M>, and why you
        find <M>b</M> before choosing the terminals. Press &ldquo;Stop at b&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, T_MAX]} y={[-0.5, 0.75]} xStep={0.25} yStep={0.25} height={300}>
        <Region top={() => 0} bottom={f} from={A} to={Math.min(t, 1)} color={C.bad} opacity={0.22} />
        <Region top={f} bottom={() => 0} from={1} to={Math.max(1, t)} color={C.good} opacity={0.22} />
        <Line.Segment point1={[A, -0.5]} point2={[A, 0.62]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[A, 0.62]} color={C.guide} attach="n" size={12}>x = a</Label>
        <Plot.OfX y={f} domain={[1e-6, T_MAX]} color={C.f} weight={3} />
        <OpenPoint x={0} y={0} color={C.f} />
        <Polygon points={[[s0, 0], [s1, 0], [s1, ft], [s0, ft]]} color={stripColor} fillOpacity={0.85} weight={1} />
        <Point x={A} y={-A} color={C.ink} />
        <Label at={[A, -A]} attach="sw" size={12}>Q</Label>
        <Point x={1} y={0} color={C.ink} />
        <Label at={[1, 0]} attach="nw" size={12}>b</Label>
        <Label at={[1.45, f(1.45)]} color={C.f} attach="nw">f</Label>
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t0}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={A}
          max={T_MAX}
          step={0.005}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t0)} label="Sweep from a" />
          <ActionButton
            label="Stop at b"
            onClick={() => {
              player.stop()
              setT(1)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={stripColor} tex={`\\text{strip height } f(t) \\approx ${fmt(ft)}`} />
          <Readout tex={`\\int_{1/e}^{${fmt(t, 2)}} f(x)\\,dx = F(${fmt(t, 2)}) - F(\\tfrac1e) \\approx ${fmt(I)}`} />
          {atB && <Readout color={C.good} tex={`\\text{area} = \\tfrac{e^2-3}{4e^2} \\approx ${fmt(AREA)}\\ \\checkmark`} />}
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          <M>{'F(x) = \\tfrac{x^2\\log_e(x)}{2} - \\tfrac{x^2}{4}'}</M> is the antiderivative from part b. The strip is at{' '}
          <M>x = t</M>, the upper terminal.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
