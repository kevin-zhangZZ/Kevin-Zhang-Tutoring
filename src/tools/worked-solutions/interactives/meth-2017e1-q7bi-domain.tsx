// 2017 Methods Exam 1 Q7b.i — slide c, the right-hand end of g's domain (−∞, c], and watch the
// range of g(x) = x² + 4x + 3 build up on the y-axis. While c ≤ −3 every output of g is ≥ 0, so
// all of them lie in dom f = [0, ∞); the moment c passes the root −3 the parabola dips below the
// x-axis and the range spills below 0. That is why −3 is the largest c. A button jumps to the
// tempting c = −1 (the other root, raised on the ATAR Notes forum): its endpoint output g(−1) = 0
// looks fine, but the domain (−∞, −1] contains the whole dip, down to g(−2) = −1.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const g = (x: number) => x * x + 4 * x + 3
// The view. The domain carries on to −∞ past the left edge.
const XL = -5.5
const XR = 1.5
const YB = -2
const YT = 8.5
// Where g reaches the top of the view, (x + 2)² − 1 = YT, so the curve never runs off it.
const X_TOP_L = -2 - Math.sqrt(YT + 1)
const X_TOP_R = -2 + Math.sqrt(YT + 1)
const C_MIN = -5
const C_MAX = -0.1
// "=" when the 2 dp readout is the exact value (g(−4) = 3), "≈" when it has been rounded.
const rel = (v: number) => (Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? '=' : '\\approx')

export default function DomainSlider() {
  const [c, setC] = useState(-4)
  const player = usePlayer(setC, { min: C_MIN, max: C_MAX, seconds: 7 })

  // Lowest output of g on (−∞, c]: the endpoint while we're left of the turning point x = −2,
  // otherwise the turning point itself.
  const lo = c <= -2 ? g(c) : -1
  const xLo = c <= -2 ? c : -2
  const ok = lo > -1e-6
  const atRoot = Math.abs(c + 3) < 0.026
  const atOther = Math.abs(c + 1) < 0.026
  const pastTurn = c > -2

  const jump = (v: number) => {
    player.stop()
    setC(v)
  }

  let notice
  if (atRoot) {
    notice = (
      <Notice tone="good">
        <b><M>c = -3</M>: the domain stops exactly at the root</b>, where <M>g(-3) = 0</M>. Coming in from the left, the
        outputs fall from very large values down to <M>0</M> and no lower, so <M>{'\\text{ran}(g) = [0, \\infty)'}</M>,
        which is exactly <M>{'\\text{dom}(f)'}</M>. Nudge <M>c</M> even slightly to the right and the curve starts to dip
        below the <M>x</M>-axis. So <M>-3</M> is the largest <M>c</M> that works.
      </Notice>
    )
  } else if (atOther) {
    notice = (
      <Notice tone="warn">
        <b><M>c = -1</M>, the other root, is the tempting wrong answer.</b> The endpoint output{' '}
        <M>g(-1) = 0</M> is fine, but the range depends on <i>every</i> <M>x</M> in <M>{'(-\\infty, -1]'}</M>, not just
        the endpoint. That interval contains the whole dip between the roots (the red piece), down to{' '}
        <M>g(-2) = -1</M>. So <M>{'\\text{ran}(g) = [-1, \\infty)'}</M>, and outputs such as <M>-1</M> are not in{' '}
        <M>{'[0, \\infty)'}</M>.
      </Notice>
    )
  } else if (ok) {
    notice = (
      <Notice>
        Every <M>x</M> in <M>{`(-\\infty, ${c.toFixed(2)}]`}</M> is left of the root <M>-3</M>, where the parabola is
        above the <M>x</M>-axis. The smallest output is the endpoint one, <M>{`g(${c.toFixed(2)}) ${rel(lo)} ${lo.toFixed(2)}`}</M>,
        so the whole green range sits inside <M>{'\\text{dom}(f) = [0, \\infty)'}</M>. The question wants the{' '}
        <i>largest</i> <M>c</M>, so keep sliding <M>c</M> to the right. Where does it break?
      </Notice>
    )
  } else if (!pastTurn) {
    notice = (
      <Notice tone="warn">
        <b>Too far.</b> Past <M>x = -3</M> the parabola has dipped below the <M>x</M>-axis (the red piece):{' '}
        <M>{`g(${c.toFixed(2)}) ${rel(lo)} ${lo.toFixed(2)}`}</M>. A negative output is not in{' '}
        <M>{'\\text{dom}(f) = [0, \\infty)'}</M>, so at <M>{`x = ${c.toFixed(2)}`}</M> the value <M>f(g(x))</M> doesn&apos;t exist. Even
        a tiny step past <M>-3</M> does this, so slide back until the red disappears.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Now the domain reaches past the <b>bottom of the dip</b>, the turning point <M>(-2, -1)</M>, so the lowest
        output is <M>g(-2) = -1</M>. The range is <M>{'[-1, \\infty)'}</M>, and every output between <M>-1</M> and{' '}
        <M>0</M> is outside <M>{'\\text{dom}(f)'}</M>. Moving <M>c</M> further right can&apos;t fix that: the red piece
        stays in the domain. Try the button for <M>c = -1</M>.
      </Notice>
    )
  }

  // The curve inside the domain: blue where g ≥ 0, red where g < 0.
  const leftEnd = Math.min(c, -3)
  return (
    <div>
      <Plane x={[XL, XR]} y={[YB, YT]} xStep={1} yStep={2} height={330}>
        {/* Below the x-axis: outputs that f can't take. */}
        <Polygon
          points={[[XL - 1, YB - 1], [XR + 1, YB - 1], [XR + 1, 0], [XL - 1, 0]]}
          color={C.bad}
          fillOpacity={0.07}
          weight={0}
          strokeOpacity={0}
        />
        {/* Low enough to stay clear of the (−2, −1) label, which sits below its point. */}
        <Label at={[XL + 0.05, -1.9]} color={C.bad} attach="e" size={12}>g &lt; 0: not in dom f</Label>

        {/* The full parabola, faint, for reference. */}
        <Plot.OfX y={g} domain={[X_TOP_L, X_TOP_R]} color={C.guide} weight={1.5} style="dashed" opacity={0.7} />

        {/* The part of g actually in its domain (−∞, c]. */}
        <Plot.OfX y={g} domain={[X_TOP_L, leftEnd]} color={C.f} weight={3.5} />
        {c > -3 && <Plot.OfX y={g} domain={[-3, Math.min(c, -1)]} color={C.bad} weight={4} />}
        {c > -1 && <Plot.OfX y={g} domain={[-1, c]} color={C.f} weight={3.5} />}
        <Label at={[-4.55, g(-4.55)]} color={C.f} attach="w">g</Label>

        {/* The domain on the x-axis. */}
        <Line.Segment point1={[XL - 0.3, 0]} point2={[c, 0]} color={C.violet} weight={6} opacity={0.75} />
        <Label at={[XL + 0.05, 0.75]} color={C.violet} attach="e" size={12}>dom g</Label>
        <Line.Segment point1={[c, 0]} point2={[c, g(c)]} color={C.guide} style="dashed" weight={1.5} />

        {/* The range on the y-axis: green for outputs f accepts, red for those it doesn't. */}
        <Line.Segment point1={[0, Math.max(lo, 0)]} point2={[0, YT + 0.3]} color={C.good} weight={7} opacity={0.75} />
        {!ok && <Line.Segment point1={[0, lo]} point2={[0, 0]} color={C.bad} weight={7} opacity={0.85} />}
        <Line.Segment point1={[xLo, lo]} point2={[0, lo]} color={ok ? C.good : C.bad} style="dashed" weight={1.5} />
        <Label at={[0, 7.3]} color={C.good} attach="e" size={12}>ran g</Label>

        {pastTurn && (
          <>
            <Point x={-2} y={-1} color={C.bad} />
            <Label at={[-2, -1]} color={C.bad} attach="s" size={12}>(−2, −1)</Label>
          </>
        )}
        <Point x={c} y={g(c)} color={ok ? C.f : g(c) < 0 ? C.bad : C.f} />
        <Point x={c} y={0} color={C.violet} />
      </Plane>
      <Controls>
        <Slider
          label="c"
          value={c}
          onChange={v => jump(v)}
          min={C_MIN}
          max={C_MAX}
          step={0.05}
          format={v => num(v, 2)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(c)} label="Slide c to the right" />
          <Toggle label="c = −3" checked={atRoot} onChange={() => jump(-3)} />
          <Toggle label="c = −1 (the other root)" checked={atOther} onChange={() => jump(-1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{dom}(g) = (-\\infty,\\ ${c.toFixed(2)}]`} />
          <Readout color={ok ? C.good : C.bad} tex={`\\text{ran}(g) ${rel(lo)} [${(Math.abs(lo) < 5e-3 ? 0 : lo).toFixed(2)},\\ \\infty)`} />
          <Readout
            color={ok ? C.good : C.bad}
            tex={ok ? '\\text{ran}(g) \\subseteq [0, \\infty)\\ \\checkmark' : '\\text{ran}(g) \\not\\subseteq [0, \\infty)'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
