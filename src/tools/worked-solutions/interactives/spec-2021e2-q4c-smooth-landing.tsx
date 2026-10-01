// 2021 Specialist Exam 2 Q4c — "joins smoothly" means two conditions at C(16, 4): the path passes
// through C AND its gradient there equals the track's. The slider sets the launch angle θ; u is
// always chosen from equation (1), y(16) = 4, so every launch reaches C — that is u² cos²θ =
// 1254.4 / (16 tan θ − 4). Eliminating u between (1) and (2) gives the path's gradient at C as
// ½ − tan θ, so only one θ meets the downward track (gradient tan 170° = −tan 10° ≈ −0.176) without
// a kink: tan θ = ½ + tan 10°, θ = 34.07°, u = 16.37 (scipy). The toggle draws the tan 10° slope the
// report names as the common error: it rises from C, and "matching" it gives θ ≈ 17.9°, u ≈ 34.3 —
// a car still climbing as it reaches a track that falls away.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const DEG = Math.PI / 180
const T10 = Math.tan(10 * DEG)
const TH_RIGHT = Math.atan(0.5 + T10) / DEG // 34.07°
const TH_WRONG = Math.atan(0.5 - T10) / DEG // 17.94°
const X_END = 21

export default function SmoothLanding() {
  const [thDeg, setThDeg] = useState(22)
  const [wrong, setWrong] = useState(false)
  // Snap onto the matching angle when within 0.4°, so the smooth landing can be hit exactly.
  const thTarget = wrong ? TH_WRONG : TH_RIGHT
  const move = (v: number) => setThDeg(Math.abs(v - thTarget) < 0.4 ? thTarget : v)

  const th = thDeg * DEG
  const t = Math.tan(th)
  // Through C: 4.9·16²/(u² cos²θ) = 16 tanθ − 4, so the path is y = x tanθ − K x².
  const K = (16 * t - 4) / 256
  const u = Math.sqrt(4.9 / (K * Math.cos(th) ** 2))
  const path = (x: number) => x * t - K * x * x
  const m = t - 2 * K * 16 // = ½ − tanθ
  const target = wrong ? T10 : -T10
  const near = Math.abs(thDeg - thTarget) < 1e-6
  const smooth = near && !wrong

  const L = 2.6
  const tanColor = smooth ? C.good : C.g

  let notice
  if (wrong && near) {
    notice = (
      <Notice tone="warn">
        At <M>{'\\theta \\approx 17.9^\\circ'}</M>, <M>{'u \\approx 34.3'}</M> the path does meet the red line without a kink: that is
        what <M>{'m = \\tan 10^\\circ'}</M> produces. But the car is <b>still climbing</b> as it reaches <M>C</M>, and the real
        track (black) drops away at <M>{'10^\\circ'}</M>. A slope going down to the right has a negative gradient,{' '}
        <M>{'\\tan(170^\\circ) = -\\tan(10^\\circ)'}</M>. Turn the toggle off.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        The red dashed line has gradient <M>{'\\tan 10^\\circ \\approx 0.176'}</M>: it <b>rises</b> to the right. The real track
        (black) <b>falls</b> to the right, so its gradient is <M>{'\\tan(170^\\circ) \\approx -0.176'}</M>. Set{' '}
        <M>\theta</M> to about <M>{'18^\\circ'}</M> to see the launch the <M>{'\\tan 10^\\circ'}</M> equation gives.
      </Notice>
    )
  } else if (smooth) {
    notice = (
      <Notice tone="good">
        <b>Smooth.</b> The path passes through <M>C</M> (equation 1) <b>and</b> its gradient there equals the track&apos;s,{' '}
        <M>{'-0.176'}</M> (equation 2): the tangent lies along the track. So <M>{'\\theta \\approx 34^\\circ'}</M> and{' '}
        <M>{'u \\approx 16.4\\ \\text{m s}^{-1}'}</M>. Eliminating <M>u</M> shows the gradient at <M>C</M> is always{' '}
        <M>{'\\tfrac12 - \\tan\\theta'}</M>, so <M>{'\\tan\\theta = \\tfrac12 + \\tan 10^\\circ'}</M>.
      </Notice>
    )
  } else if (thDeg < TH_RIGHT) {
    notice = (
      <Notice>
        Every launch on this slider reaches <M>C</M>: <M>u</M> is chosen from equation (1), so (1) always holds. But at{' '}
        <M>C</M> the car is {m > 0 ? <b>still climbing</b> : <>descending <b>less steeply</b> than the track</>} (gradient{' '}
        <M>{num(m, 3)}</M> against the track&apos;s <M>{'-0.176'}</M>): it meets the track at a kink. Passing through{' '}
        <M>C</M> is only half of &ldquo;smoothly&rdquo;. Increase <M>\theta</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The path still passes through <M>C</M>, but now the car arrives <b>diving more steeply</b> than the track (gradient{' '}
        <M>{num(m, 3)}</M> against <M>{'-0.176'}</M>), so it slams into the slope. Decrease <M>\theta</M> until the orange
        tangent lies along the track.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1, X_END]} y={[-1, 7]} xStep={4} yStep={2} height={300}>
        {/* the end of the ramp BO, leaving O at angle θ */}
        <Line.Segment point1={[-Math.cos(th), -Math.sin(th)]} point2={[0, 0]} color={C.ink} weight={5} />
        {/* the second section of track, sloping DOWN at 10° from C */}
        <Line.Segment point1={[16, 4]} point2={[X_END, 4 - (X_END - 16) * T10]} color={C.ink} weight={5} />
        <Label at={[19, 4 - 3 * T10]} attach="s" gap={14} size={12}>track</Label>
        {wrong && (
          <>
            <Line.Segment point1={[16, 4]} point2={[X_END, 4 + (X_END - 16) * T10]} color={C.bad} weight={3} style="dashed" />
            <Label at={[19.6, 4 + 3.6 * T10]} attach="n" color={C.bad} size={12}>tan 10°</Label>
          </>
        )}
        <Plot.OfX y={path} domain={[0, 16]} color={C.f} weight={3} />
        <Line.Segment point1={[16 - L, 4 - L * m]} point2={[16 + L, 4 + L * m]} color={tanColor} weight={2.5} style="dashed" />
        <Point x={0} y={0} color={C.ink} />
        <Point x={16} y={4} color={smooth ? C.good : C.ink} />
        <Label at={[0, 0]} attach="se">O</Label>
        <Label at={[16, 4]} attach="s">C</Label>
      </Plane>
      <Controls>
        <Slider label="\theta" value={thDeg} onChange={move} min={16} max={55} step={0.1} format={v => `${v.toFixed(1)}°`} />
        <Toggle label="What if the gradient is tan 10°?" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout color={C.f} tex={`u = ${num(u, 1)}\\ \\text{m s}^{-1}`} />
          <Readout tex={`\\text{(1) } y(16) = 4\\ \\checkmark`} />
          <Readout color={tanColor} tex={`\\text{(2) } \\left.\\tfrac{dy}{dx}\\right|_{x=16} = ${num(m, 3)}${smooth ? '\\ \\checkmark' : ''}`} />
          <Readout
            color={wrong ? C.bad : undefined}
            tex={wrong ? `\\tan(10^\\circ) = ${num(target, 3)}` : `\\text{track: } \\tan(170^\\circ) = ${num(target, 3)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
