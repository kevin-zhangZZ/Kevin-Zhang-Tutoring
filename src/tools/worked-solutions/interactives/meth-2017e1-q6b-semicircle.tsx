// 2017 Methods Exam 1 Q6b — the solutions of (tan θ − 1)(sin²θ − 3cos²θ) = 0 in [0, π] are where
// the top half of the unit circle crosses three lines through O. tan θ − 1 = 0 is y = x, and
// sin²θ = 3cos²θ is y² = 3x², the pair of lines y = ±√3x — the same two lines as part (a)'s
// factors (a difference of two squares). Each line through O crosses the top half exactly once,
// so there are exactly three solutions: π/4, π/3, 2π/3 (the bottom-half crossings 5π/4, 4π/3,
// 5π/3 are outside the domain). A toggle shows the square-root slip tan θ = √3 only: the line
// y = −√3x and the solution 2π/3 are lost, even though sin²θ − 3cos²θ = 0 there.

import { useEffect, useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts,
  Slider, Toggle, clamp, num, usePlayer,
} from './kit'

const STEP = Math.PI / 60 // snap to multiples of π/60 (3°), so π/4, π/3, 2π/3 are hit exactly
const R3 = Math.sqrt(3)
const SOL = [Math.PI / 4, Math.PI / 3, (2 * Math.PI) / 3]
const SOL_TEX = ['\\tfrac{\\pi}{4}', '\\tfrac{\\pi}{3}', '\\tfrac{2\\pi}{3}']
const snap = (t: number) => clamp(Math.round(t / STEP) * STEP, 0, Math.PI)
const zero = (v: number) => Math.abs(v) < 1e-9
const same = (a: number, b: number) => Math.abs(a - b) < 1e-6

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}
function piText(t: number): string {
  const n = Math.round(t / STEP)
  if (n === 0) return '0'
  const g = gcd(n, 60)
  const a = n / g
  const b = 60 / g
  return `${a === 1 ? '' : a}π${b === 1 ? '' : `/${b}`}`
}
function valTex(v: number): string {
  if (zero(v)) return '= 0\\ \\checkmark'
  return `\\approx ${num(v, 2)}`
}

export default function Semicircle() {
  // raw is the continuous value the sweep animates; the picture uses it snapped to π/60
  const [raw, setRaw] = useState(Math.PI / 4)
  const [found, setFound] = useState<boolean[]>([true, false, false])
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setRaw, { min: 0, max: Math.PI, seconds: 8 })
  const t = snap(raw)
  useEffect(() => {
    const i = SOL.findIndex(x => same(x, t))
    if (i >= 0) setFound(f => (f[i] ? f : f.map((b, j) => b || j === i)))
  }, [t])

  const c = Math.cos(t)
  const s = Math.sin(t)
  const vertical = Math.abs(c) < 1e-9
  const tanMinus1 = vertical ? NaN : s / c - 1
  const sq = s * s - 3 * c * c
  const hit = SOL.findIndex(x => same(x, t))
  const onSol = hit >= 0
  const pColor = onSol ? (wrong && hit === 2 ? C.bad : C.good) : C.ink
  const nFound = found.filter(Boolean).length

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        From <M>{'\\tan^2\\theta = 3'}</M>, keeping only <M>{'\\tan\\theta = \\sqrt3'}</M> keeps only the orange line{' '}
        <M>{'y = \\sqrt3x'}</M>. The red line <M>{'y = -\\sqrt3x'}</M> is dropped, and with it <M>{'\\theta = \\tfrac{2\\pi}{3}'}</M>,
        where <M>{'\\sin^2\\theta - 3\\cos^2\\theta = \\tfrac34 - \\tfrac34 = 0'}</M>. Part (a) already listed{' '}
        <M>{'-\\sqrt3'}</M> as a separate value: that is what &ldquo;Hence&rdquo; hands you.
      </Notice>
    )
  } else if (hit === 0) {
    notice = (
      <Notice tone="good">
        <M>{'\\theta = \\tfrac{\\pi}{4}'}</M>: <M>P</M> is on <M>y = x</M>, so <M>{'\\tan\\theta - 1 = 0'}</M> and the whole
        left side is <M>0</M>. The same line meets the bottom half at <M>{'\\tfrac{5\\pi}{4}'}</M>, outside{' '}
        <M>{'0 \\le \\theta \\le \\pi'}</M>. Sweep on to find the other two crossings.
      </Notice>
    )
  } else if (hit === 1) {
    notice = (
      <Notice tone="good">
        <M>{'\\theta = \\tfrac{\\pi}{3}'}</M>: <M>P</M> is on <M>{'y = \\sqrt3x'}</M>, where the factor{' '}
        <M>{'\\sin\\theta - \\sqrt3\\cos\\theta'}</M> is zero, so <M>{'\\sin^2\\theta - 3\\cos^2\\theta = 0'}</M> too. The
        line crosses the bottom half at <M>{'\\tfrac{4\\pi}{3}'}</M>, which is outside the domain.
      </Notice>
    )
  } else if (hit === 2) {
    notice = (
      <Notice tone="good">
        <M>{'\\theta = \\tfrac{2\\pi}{3}'}</M>: <M>P</M> is on <M>{'y = -\\sqrt3x'}</M>, the other half of{' '}
        <M>{'y^2 = 3x^2'}</M>. Rise positive, run negative: <M>{'\\tan\\theta = -\\sqrt3'}</M> in quadrant 2, with
        reference angle <M>{'\\tfrac{\\pi}{3}'}</M>, so <M>{'\\theta = \\pi - \\tfrac{\\pi}{3}'}</M>. This is the solution
        a lost minus sign costs you.
      </Notice>
    )
  } else if (vertical) {
    notice = (
      <Notice>
        At <M>{'\\theta = \\tfrac{\\pi}{2}'}</M>, <M>{'\\tan\\theta'}</M> is undefined, so the left side has no value
        here: <M>{'\\tfrac{\\pi}{2}'}</M> can never be a solution. (Also <M>{'\\sin^2\\theta - 3\\cos^2\\theta = 1'}</M>, not{' '}
        <M>0</M>.)
      </Notice>
    )
  } else if (nFound === 3) {
    notice = (
      <Notice tone="good">
        All three found: <M>{'\\tfrac{\\pi}{4}, \\tfrac{\\pi}{3}, \\tfrac{2\\pi}{3}'}</M>. Three values of{' '}
        <M>{'\\tan\\theta'}</M>, three lines through <M>O</M>, and each line crosses the top half of the circle exactly
        once. Try the toggle to see what the square-root slip loses.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\sin^2\\theta = 3\\cos^2\\theta'}</M> is <M>{'y^2 = 3x^2'}</M> for <M>{'P = (\\cos\\theta, \\sin\\theta)'}</M>:
        the pair of lines <M>{'y = \\pm\\sqrt3x'}</M> from part (a). With <M>y = x</M> from{' '}
        <M>{'\\tan\\theta - 1 = 0'}</M>, the solutions are where the solid top half crosses a dashed line. Sweep{' '}
        <M>\theta</M> from <M>0</M> to <M>\pi</M> and stop on each crossing.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, 1.5]} y={[-1.2, 1.5]} height={340} equalScale labels={false}>
        {/* bottom half: outside the domain */}
        <Plot.Parametric xy={a => [Math.cos(a), Math.sin(a)]} domain={[Math.PI, 2 * Math.PI]} color={C.guide} weight={1.5} style="dashed" />
        <Label at={[0, -1]} color={C.guide} attach="s" gap={8}>not in 0 ≤ θ ≤ π</Label>
        {/* the three lines where the left side is zero */}
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 1]} color={C.f} style="dashed" weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[1, R3]} color={C.g} style="dashed" weight={2} />
        <Line.ThroughPoints point1={[0, 0]} point2={[-1, R3]} color={wrong ? C.bad : C.g} style="dashed" weight={2} />
        <Label at={[1.56, 1.56]} color={C.f} attach="w" gap={10}>y = x</Label>
        <Label at={[0.9, 1.56]} color={C.g} attach="w" gap={8}>y = √3x</Label>
        <Label at={[-0.9, 1.56]} color={wrong ? C.bad : C.g} attach="e" gap={8}>{wrong ? 'dropped' : 'y = −√3x'}</Label>
        {/* top half: the domain 0 ≤ θ ≤ π */}
        <Plot.Parametric xy={a => [Math.cos(a), Math.sin(a)]} domain={[0, Math.PI]} color={C.ink} weight={3} />
        {/* the crossings on the bottom half, outside the domain */}
        {[(5 * Math.PI) / 4, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map(a => (
          <Circle key={a} center={[Math.cos(a), Math.sin(a)]} radius={0.035} color={C.guide} fillOpacity={0} weight={2} />
        ))}
        {/* solutions found so far */}
        {SOL.map((a, i) =>
          found[i] || (wrong && i === 2) ? (
            <Point key={a} x={Math.cos(a)} y={Math.sin(a)} color={wrong && i === 2 ? C.bad : C.good} />
          ) : null,
        )}
        {found[0] && <Label at={[Math.cos(SOL[0]), Math.sin(SOL[0])]} color={C.good} attach="e" gap={9}>π/4</Label>}
        {found[1] && <Label at={[Math.cos(SOL[1]), Math.sin(SOL[1])]} color={C.good} attach="nw" gap={10}>π/3</Label>}
        {(found[2] || wrong) && (
          <Label at={[Math.cos(SOL[2]), Math.sin(SOL[2])]} color={wrong ? C.bad : C.good} attach="w" gap={10}>
            {wrong ? '2π/3 lost' : '2π/3'}
          </Label>
        )}
        <Line.Segment point1={[0, 0]} point2={[c, s]} color={pColor} weight={2.5} />
        <MovablePoint
          point={[c, s]}
          onMove={([px, py]) => {
            player.stop()
            setRaw(py < 0 ? (px >= 0 ? 0 : Math.PI) : Math.atan2(py, px))
          }}
          color={pColor}
        />
      </Plane>
      <Controls>
        <Slider
          label="\theta"
          value={t}
          onChange={v => {
            player.stop()
            setRaw(v)
          }}
          min={0}
          max={Math.PI}
          step={STEP}
          format={piText}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep 0 to π" />
          <Toggle label={<>Solve as <M>{'\\tan\\theta = \\sqrt3'}</M> only</>} checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={vertical ? '\\tan\\theta - 1\\ \\text{undefined}' : `\\tan\\theta - 1 ${valTex(tanMinus1)}`} />
          <Readout color={C.g} tex={`\\sin^2\\theta - 3\\cos^2\\theta ${valTex(sq)}`} />
          {wrong && !vertical && <Readout color={C.bad} tex={`\\tan\\theta - \\sqrt3 ${valTex(s / c - R3)}`} />}
          <Readout tex={`\\text{found ${nFound} of 3${nFound ? ':' : ''}}${nFound ? `\\ ${SOL_TEX.filter((_, i) => found[i]).join(',\\ ')}` : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
