// 2019 Methods Exam 1 Q2c — the translation T(x, y) = (x + c, y + d) that carries f onto f⁻¹.
// f(x) = 1/(3x − 1) and f⁻¹(x) = 1/(3x) + 1/3 are the same hyperbola 1/(3X) with different
// centres, (1/3, 0) and (0, 1/3), so T only has to move the centre where the asymptotes cross.
// Drag the violet centre (or use the sliders, in sixths): g(x) = f(x − c) + d follows, with the
// arrow (c, d) drawn from f's centre. It lands on f⁻¹ at c = −1/3, d = 1/3. A toggle draws the
// report's sign slip, y + d = f(x + c): that curve always moves opposite to the arrow, and it is
// the one that lands on f⁻¹ when c = 1/3, d = −1/3 — while the real image sits at (2/3, −1/3).

import { useState } from 'react'
import {
  C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, clamp,
} from './kit'

const H = 1 / 3
const X = 2
const EPS = 0.1 // 1/(3·0.1) ≈ 3.3, off the grid
const FAR = 10 // draw well past the grid: on a wide screen the equal-scale plane shows more x

/** y = 1/(3(x − cx)) + cy: the hyperbola 1/(3X) with its centre (asymptote crossing) at (cx, cy). */
function Hyperbola({ cx, cy, color, weight = 3, dashed = false }: { cx: number; cy: number; color: string; weight?: number; dashed?: boolean }) {
  const y = (x: number) => 1 / (3 * (x - cx)) + cy
  const style = dashed ? 'dashed' : 'solid'
  return (
    <>
      <Plot.OfX y={y} domain={[-FAR, cx - EPS]} color={color} weight={weight} style={style} />
      <Plot.OfX y={y} domain={[cx + EPS, FAR]} color={color} weight={weight} style={style} />
    </>
  )
}

const sixths = (v: number) => Math.round(v * 6)
const snap = (v: number) => clamp(sixths(v), -6, 6) / 6
const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q))

/** A multiple of 1/6 as plain text (slider) or TeX, e.g. −1/3. */
function frac(v: number, tex: boolean): string {
  const n = sixths(v)
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), 6)
  const p = Math.abs(n) / g
  const q = 6 / g
  const sign = n < 0 ? (tex ? '-' : '−') : ''
  if (q === 1) return `${sign}${p}`
  return tex ? `${sign}\\tfrac{${p}}{${q}}` : `${sign}${p}/${q}`
}

/** "+ 1/3", "− 1/2", or "" for 0 — a signed term in TeX. */
function term(v: number): string {
  const n = sixths(v)
  if (n === 0) return ''
  return `${n > 0 ? '+' : '-'} ${frac(Math.abs(v), true)}`
}

export default function SlideOntoInverse() {
  const [c, setC] = useState(0)
  const [d, setD] = useState(1 / 3)
  const [slip, setSlip] = useState(false)

  const nc = sixths(c)
  const nd = sixths(d)
  const matched = nc === -2 && nd === 2
  const slipAnswer = nc === 2 && nd === -2
  const gx = H + c
  const gColor = matched ? C.good : C.violet
  const k = 3 * c + 1 // g(x) = 1/(3x − k) + d
  const gTex = `g(x) = \\frac{1}{3x ${term(-k)}} ${term(d)}`

  let notice
  if (slip) {
    notice = slipAnswer ? (
      <Notice tone="warn">
        The red curve sits right on <M>{'f^{-1}'}</M>, so <M>{'y + d = f(x + c)'}</M> seems to &ldquo;work&rdquo; with{' '}
        <M>{'c = \\tfrac13,\\ d = -\\tfrac13'}</M>. But <M>T</M> moves every point along the violet arrow:{' '}
        <M>{'\\tfrac13'}</M> right and <M>{'\\tfrac13'}</M> down. The real image <M>g</M> is centred at{' '}
        <M>{'\\left(\\tfrac23, -\\tfrac13\\right)'}</M>, nowhere near <M>{'f^{-1}'}</M>.
      </Notice>
    ) : (
      <Notice tone="warn">
        Red dashed is <M>{'y = f(x + c) - d'}</M>, what you get by replacing <M>x</M> with <M>x + c</M> and <M>y</M>{' '}
        with <M>y + d</M>. Its centre is at <M>{'\\left(\\tfrac13 - c,\\ -d\\right)'}</M>, so it always moves{' '}
        <b>opposite</b> to the arrow. Set <M>{'c = \\tfrac13'}</M>, <M>{'d = -\\tfrac13'}</M> to see why that answer is
        so convincing.
      </Notice>
    )
  } else if (matched) {
    notice = (
      <Notice tone="good">
        <M>g</M> lands exactly on <M>{'f^{-1}'}</M>. The centre moved from <M>{'\\left(\\tfrac13, 0\\right)'}</M> to{' '}
        <M>{'\\left(0, \\tfrac13\\right)'}</M>: <M>{'\\tfrac13'}</M> left, so <M>{'c = -\\tfrac13'}</M>, and{' '}
        <M>{'\\tfrac13'}</M> up, so <M>{'d = \\tfrac13'}</M>. In the rule, &ldquo;left&rdquo; shows up as a plus
        inside: <M>{'f\\left(x + \\tfrac13\\right) + \\tfrac13 = \\tfrac{1}{3x} + \\tfrac13'}</M>. Now switch on the
        sign slip.
      </Notice>
    )
  } else if (slipAnswer) {
    notice = (
      <Notice tone="warn">
        <M>{'c = \\tfrac13,\\ d = -\\tfrac13'}</M> is the sign slip. <M>T</M> moves every point <M>{'\\tfrac13'}</M>{' '}
        right and <M>{'\\tfrac13'}</M> down, so the centre goes to <M>{'\\left(\\tfrac23, -\\tfrac13\\right)'}</M>. That
        is the wrong way on both counts.
      </Notice>
    )
  } else if (nd === 2) {
    notice = (
      <Notice>
        <M>{'d = \\tfrac13'}</M> puts the horizontal asymptote of <M>g</M> at <M>{'y = \\tfrac13'}</M>, like{' '}
        <M>{'f^{-1}'}</M>&apos;s. Now the vertical one: <M>g</M>&apos;s is at <M>{'x = \\tfrac13 + c'}</M>, and{' '}
        <M>{'f^{-1}'}</M>&apos;s is the <M>y</M>-axis. Which way must the curve slide, and what sign does that give{' '}
        <M>c</M>? Drag the violet centre to find out.
      </Notice>
    )
  } else if (nc === -2) {
    notice = (
      <Notice>
        <M>{'c = -\\tfrac13'}</M> puts the vertical asymptote of <M>g</M> on the <M>y</M>-axis, like{' '}
        <M>{'f^{-1}'}</M>&apos;s. Now raise or lower it: <M>g</M>&apos;s horizontal asymptote is <M>y = d</M>, and{' '}
        <M>{'f^{-1}'}</M>&apos;s is <M>{'y = \\tfrac13'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>T</M> moves every point of <M>f</M> along the violet arrow: <M>c</M> across and <M>d</M> up. The whole curve
        goes with it, asymptotes included, so just follow the centre where they cross. Drag it from{' '}
        <M>{'\\left(\\tfrac13, 0\\right)'}</M> onto <M>{'f^{-1}'}</M>&apos;s centre <M>{'\\left(0, \\tfrac13\\right)'}</M>.
      </Notice>
    )
  }

  const move = (p: [number, number]) => {
    setC(snap(p[0] - H))
    setD(snap(p[1]))
  }

  return (
    <div>
      <Plane
        x={[-X, X]}
        y={[-X, X]}
        xStep={1 / 3}
        yStep={1 / 3}
        equalScale
        height={360}
        labels={v => (Math.abs(v - Math.round(v)) < 1e-6 ? String(Math.round(v)) : '')}
        xLabels={v => (Math.abs(v - Math.round(v)) < 1e-6 && Math.round(v) !== 1 ? String(Math.round(v)) : '')}
      >
        {/* f and its asymptote x = 1/3 (the other is the x-axis) */}
        <Line.Segment point1={[H, -FAR]} point2={[H, FAR]} color={C.f} style="dashed" weight={1} opacity={0.6} />
        <Hyperbola cx={H} cy={0} color={C.f} />
        {/* f⁻¹ and its asymptote y = 1/3 (the other is the y-axis) */}
        <Line.Segment point1={[-FAR, H]} point2={[FAR, H]} color={C.g} style="dashed" weight={1} opacity={0.6} />
        <Hyperbola cx={0} cy={H} color={C.g} />

        {slip && <Hyperbola cx={H - c} cy={-d} color={C.bad} weight={2.5} dashed />}
        {slip && <Point x={H - c} y={-d} color={C.bad} />}

        {/* g = image of f under T, with its asymptotes */}
        <Line.Segment point1={[gx, -FAR]} point2={[gx, FAR]} color={gColor} style="dashed" weight={1.5} />
        <Line.Segment point1={[-FAR, d]} point2={[FAR, d]} color={gColor} style="dashed" weight={1.5} />
        <Hyperbola cx={gx} cy={d} color={gColor} weight={2.5} />
        {(nc !== 0 || nd !== 0) && <Vector tail={[H, 0]} tip={[gx, d]} color={C.violet} weight={2.5} />}

        <Label at={[1.7, 1 / (3 * (1.7 - H))]} color={C.f} attach="s">f</Label>
        <Label at={[1 / (3 * (-1.9 - H)), -1.9]} color={C.g} attach="w">f⁻¹</Label>
        {!matched && <Label at={[gx - 0.9, d - 1 / 2.7]} color={gColor} attach="s">g</Label>}
        <Point x={H} y={0} color={C.f} />
        <Point x={0} y={H} color={C.g} />
        <Label at={[H, 0]} color={C.f} attach="se">(1/3, 0)</Label>
        <Label at={[0, H]} color={C.g} attach="nw">(0, 1/3)</Label>
        <MovablePoint point={[gx, d]} onMove={move} color={gColor} />
      </Plane>
      <Controls>
        <Slider label="c" value={c} onChange={v => setC(snap(v))} min={-1} max={1} step={1 / 6} format={v => frac(v, false)} />
        <Slider label="d" value={d} onChange={v => setD(snap(v))} min={-1} max={1} step={1 / 6} format={v => frac(v, false)} />
        <Toggle label="Show the sign slip: y + d = f(x + c)" checked={slip} onChange={setSlip} />
        <Readouts>
          <Readout color={gColor} tex={gTex} />
          <Readout color={C.g} tex={'f^{-1}(x) = \\frac{1}{3x} + \\tfrac13'} />
          {slip && <Readout color={C.bad} tex={`\\text{slip: } y = \\frac{1}{3x ${term(3 * c - 1)}} ${term(-d)}`} />}
          {matched && <Readout color={C.good} tex={'g = f^{-1}\\ \\checkmark'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
