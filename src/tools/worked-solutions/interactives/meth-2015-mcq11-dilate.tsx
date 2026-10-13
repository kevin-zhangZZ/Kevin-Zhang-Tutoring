// 2015 Methods Exam 2 MCQ 11 — dilate y = √(8x³ + 1) by factor k from the y-axis and watch it
// against the target y = √(x³ + 1). Every point moves (x, y) → (kx, y): the report's point (1, 3)
// goes to (k, 3) and the endpoint (−½, 0) to (−k/2, 0). The new rule is √((8/k³)x³ + 1), so only
// k = 2 (k³ = 8) lands on the target. Quick buttons for the two popular wrong answers: k = 8
// (option D, 32%: reads the 8 as the factor, gives √(x³/64 + 1), far too flat) and k = ½ (option E,
// 29%: the map from the target back to the original, gives √(64x³ + 1), steeper still).

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector,
} from './kit'

const y1 = (x: number) => Math.sqrt(Math.max(0, 8 * x ** 3 + 1))
const y2 = (x: number) => Math.sqrt(Math.max(0, x ** 3 + 1))
const XMAX = 8.5

/** Tidy TeX for the scale factor k. */
function kTex(k: number): string {
  if (Math.abs(k - 0.5) < 1e-9) return '\\tfrac12'
  if (Math.abs(k - 0.25) < 1e-9) return '\\tfrac14'
  return Number.isInteger(k) ? String(k) : k.toFixed(2)
}

export default function DilateOntoTarget() {
  const [k, setK] = useState(1)
  const near = (v: number) => Math.abs(k - v) < 1e-6
  const coef = 8 / k ** 3
  const coefTex = near(1) ? '8' : near(2) ? '' : near(8) ? '\\tfrac{1}{64}' : near(0.5) ? '64' : coef < 10 ? coef.toFixed(2) : coef.toFixed(1)
  const image = (x: number) => y1(x / k)
  const P: [number, number] = [k, 3]
  const E: [number, number] = [-k / 2, 0]

  let notice
  if (near(1)) {
    notice = (
      <Notice>
        Blue is the original <M>{'y=\\sqrt{8x^3+1}'}</M>; the dashed orange curve is the target. The point <M>(1, 3)</M> is on
        the original. Press &ldquo;k = 2&rdquo;, or drag <M>k</M>, and watch every point move to <M>k</M> times its distance
        from the <M>y</M>-axis.
      </Notice>
    )
  } else if (near(2)) {
    notice = (
      <Notice tone="good">
        <b>A perfect fit.</b> <M>(1, 3)</M> moves to <M>(2, 3)</M> and the endpoint <M>{'\\left(-\\tfrac12, 0\\right)'}</M> to{' '}
        <M>(-1, 0)</M>, both on the target. The rule is <M>{'\\sqrt{8\\left(\\tfrac{x}{2}\\right)^3+1}=\\sqrt{x^3+1}'}</M>: the
        factor 2 is cubed, and <M>{'2^3 = 8'}</M> cancels the 8. Now try option D&apos;s <M>k = 8</M>.
      </Notice>
    )
  } else if (near(8)) {
    notice = (
      <Notice tone="warn">
        <b>Option D overshoots.</b> <M>(1, 3)</M> goes all the way to <M>(8, 3)</M>, and the rule becomes{' '}
        <M>{'\\sqrt{\\tfrac{x^3}{64}+1}'}</M>, because the 8 gets divided by <M>{'8^3'}</M>, not by 8. The 8 sits on{' '}
        <M>{'x^3'}</M>, so the stretch on <M>x</M> only needs to be <M>{'\\sqrt[3]{8} = 2'}</M>. Try option E&apos;s{' '}
        <M>{'k = \\tfrac12'}</M>.
      </Notice>
    )
  } else if (near(0.5)) {
    notice = (
      <Notice tone="warn">
        <b>Option E goes the wrong way.</b> Factor <M>{'\\tfrac12'}</M> squashes the original towards the <M>y</M>-axis, giving{' '}
        <M>{'\\sqrt{64x^3+1}'}</M>, even further from the target. It is the dilation that maps the target <em>back</em> onto
        the original: <M>{'\\sqrt{(2x)^3+1}=\\sqrt{8x^3+1}'}</M>. The question asks for original <M>\to</M> target.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The image is <M>{`y=\\sqrt{${coefTex}x^3+1}`}</M>. It matches the target only when <M>{'\\tfrac{8}{k^3} = 1'}</M>,{' '}
        i.e. <M>k = 2</M>. {k < 2 ? 'Your k is too small: the image is still steeper than the target.' : 'Your k is too big: the image is now flatter than the target.'}
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.5, XMAX]} y={[0, 5]} xStep={1} yStep={1} height={300} label="The original curve dilated by factor k from the y-axis, with the target curve y = √(x³ + 1)">
        <Plot.OfX y={y2} domain={[-1, XMAX]} color={C.g} weight={3} style="dashed" />
        {!near(1) && <Plot.OfX y={y1} domain={[-0.5, XMAX]} color={C.guide} weight={2} style="dashed" />}
        <Plot.OfX y={image} domain={[-k / 2, XMAX]} color={C.f} weight={3} />
        {!near(1) && <Point x={1} y={3} color={C.guide} />}
        {!near(1) && P[0] <= XMAX && <Vector tail={[1, 3]} tip={P} color={C.violet} weight={2} />}
        {P[0] <= XMAX && <Point x={P[0]} y={P[1]} color={near(2) ? C.good : C.violet} />}
        {P[0] <= XMAX && (
          <Label at={P} attach="w" gap={10} color={near(2) ? C.good : C.violet}>
            {`(${k === 1 ? 1 : k.toFixed(k % 1 ? 2 : 0)}, 3)`}
          </Label>
        )}
        {E[0] >= -1.5 && <Point x={E[0]} y={0} color={near(2) ? C.good : C.violet} />}
        <Label at={[2.6, y2(2.6)]} attach="e" gap={8} color={C.g}>target</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={k} onChange={v => setK(Math.round(v * 20) / 20)} min={0.25} max={8} step={0.05} format={v => v.toFixed(2)} />
        <Buttons>
          <ActionButton label="k = 2 (option A)" onClick={() => setK(2)} />
          <ActionButton label="k = 8 (option D)" onClick={() => setK(8)} />
          <ActionButton label="k = ½ (option E)" onClick={() => setK(0.5)} />
          <ActionButton label="Reset" onClick={() => setK(1)} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`y=\\sqrt{8\\left(\\tfrac{x}{${kTex(k)}}\\right)^3+1}=\\sqrt{${coefTex}x^3+1}`} />
          <Readout color={C.violet} tex={`(1,3)\\to(${kTex(k)},\\ 3)`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
