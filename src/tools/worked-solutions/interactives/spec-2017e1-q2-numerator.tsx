// 2017 Specialist Exam 1 Q2 — why the irreducible quadratic 1 + x² needs a LINEAR numerator Bx + C.
// Clearing denominators turns the split 1/(x(1+x²)) = A/x + (Bx+C)/(1+x²) into the identity
// 1 = A(1 + x²) + (Bx + C)x, which must hold for EVERY x: the right-hand side (violet) has to lie
// flat on the line y = 1. A(1 + x²) is a parabola, and only the Bx² inside (Bx + C)x can cancel its
// bend. The toggle swaps in the wrong form B/(1 + x²) that the examiner's report names: its piece is
// just Bx, a straight line that can tilt the sum but never flatten it. "Try x = 0 and x = 1" shows
// two substitutions giving A = 1, B = −1, which match at those two points and nowhere else.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

const EPS = 1e-6
const r1 = (v: number) => Math.round(v * 10) / 10
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1))
const signed = (v: number, t: string) => `${v < 0 ? '-' : '+'} ${fmt(Math.abs(v))}${t}`

/** x-values in view where a2·x² + a1·x + a0 = 1 (null means "every x"). */
function matches(a2: number, a1: number, a0: number): number[] | null {
  const c = a0 - 1
  if (Math.abs(a2) < EPS) {
    if (Math.abs(a1) < EPS) return Math.abs(c) < EPS ? null : []
    return [-c / a1]
  }
  const d = a1 * a1 - 4 * a2 * c
  if (d < -EPS) return []
  if (Math.abs(d) < EPS) return [-a1 / (2 * a2)]
  const s = Math.sqrt(d)
  return [(-a1 - s) / (2 * a2), (-a1 + s) / (2 * a2)]
}

export default function Numerator() {
  const [A, setA] = useState(1)
  const [B, setB] = useState(-0.5)
  const [Cc, setCc] = useState(0)
  const [wrong, setWrong] = useState(false)

  // Right form: A(1+x²) + (Bx + C)x = (A+B)x² + Cx + A.  Wrong form: A(1+x²) + Bx = Ax² + Bx + A.
  const a2 = r1(wrong ? A : A + B)
  const a1 = r1(wrong ? B : Cc)
  const a0 = r1(A)
  const pieceA = (x: number) => A * (1 + x * x)
  const pieceB = (x: number) => (wrong ? B * x : (B * x + Cc) * x)
  const sum = (x: number) => pieceA(x) + pieceB(x)
  const hits = matches(a2, a1, a0)
  const identity = hits === null
  const shown = (hits ?? []).filter(x => Math.abs(x) <= 2.5)
  const sumColor = identity ? C.good : C.violet
  const hitList = shown.map(x => `x = ${fmt(r1(x))}`)

  let notice
  if (!wrong) {
    if (identity) {
      notice = (
        <Notice tone="good">
          <b>The sum lies flat on <M>y = 1</M>: it equals 1 for every <M>x</M>.</b> So <M>A = 1</M>,{' '}
          <M>B = -1</M>, <M>C = 0</M> and <M>{'\\frac{1}{x(1+x^2)} = \\frac1x - \\frac{x}{1+x^2}'}</M>. Now tick
          &ldquo;Constant on top&rdquo; to see why the form <M>{'\\frac{B}{1+x^2}'}</M> can never do this.
        </Notice>
      )
    } else if (Math.abs(a0 - 1) > EPS) {
      notice = (
        <Notice>
          Put <M>x = 0</M> into <M>{'1 = A(1+x^2) + (Bx+C)x'}</M>: both <M>x</M>-terms vanish and it says{' '}
          <M>1 = A</M>. The constant term of the sum must be 1, so set <M>A = 1</M> first.
        </Notice>
      )
    } else if (Math.abs(a2) > EPS) {
      notice = (
        <Notice>
          <M>A = 1</M> fixes the constant, but <M>{'A(1+x^2)'}</M> (sky) is a parabola that bends upward. The only
          term that can cancel an <M>{'x^2'}</M> bend is the <M>{'Bx^2'}</M> inside <M>{'(Bx+C)x'}</M>, which is why
          the numerator over <M>{'1+x^2'}</M> needs an <M>x</M> in it. Drag <M>B</M> until the violet sum stops bending.
          {hitList.length > 0 && (
            <>
              {' '}Right now it equals 1 only at{' '}
              {hitList.map((h, i) => (
                <span key={h}>
                  {i > 0 && ' and '}
                  <M>{h}</M>
                </span>
              ))}{' '}
              (green).
            </>
          )}
        </Notice>
      )
    } else {
      notice = (
        <Notice>
          The bend is gone (<M>A + B = 0</M>), but the <M>Cx</M> term tilts the sum into a sloping line, so it
          equals 1 only at <M>x = 0</M>. Comparing <M>x</M>-coefficients (there is no <M>x</M> on the left):{' '}
          <M>C = 0</M>.
        </Notice>
      )
    }
  } else if (Math.abs(A - 1) < EPS && Math.abs(B + 1) < EPS) {
    notice = (
      <Notice tone="warn">
        Substituting <M>x = 0</M> and <M>x = 1</M> into <M>{'1 = A(1+x^2) + Bx'}</M> gives <M>A = 1</M>,{' '}
        <M>B = -1</M>, and the sum really is 1 at those two <M>x</M>-values (green). But at <M>x = 2</M> it is{' '}
        <M>1 + 4 - 2 = 3</M>. Two substitutions can always be satisfied; an identity must hold for <b>every</b>{' '}
        <M>x</M>, and with this form it never can.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With <M>{'\\frac{B}{1+x^2}'}</M> the second piece is only <M>Bx</M> (orange), a straight line: it can tilt
        the sum but never cancel the <M>{'x^2'}</M> bend. The sum is <M>{'Ax^2 + Bx + A'}</M>, so the{' '}
        <M>{'x^2'}</M> coefficient and the constant are both <M>A</M>: you would need <M>A = 0</M> and{' '}
        <M>A = 1</M> at once. Press &ldquo;Try <M>x = 0</M> and <M>x = 1</M>&rdquo; to see what substituting finds.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 2.5]} y={[-1.2, 4.4]} xStep={1} yStep={1} height={300}>
        <Line.ThroughPoints point1={[0, 1]} point2={[1, 1]} color={C.guide} style="dashed" weight={2.5} />
        <Label at={[-2.45, 1]} attach="ne" color={C.guide}>LHS = 1</Label>
        <Plot.OfX y={pieceA} color={C.f} weight={2} style="dashed" />
        <Plot.OfX y={pieceB} color={C.g} weight={2} style="dashed" />
        <Plot.OfX y={sum} color={sumColor} weight={identity ? 4 : 3} />
        {shown.map((x, i) => (
          <Point key={i} x={x} y={1} color={C.good} />
        ))}
      </Plane>
      <Controls>
        <Slider label="A" value={A} onChange={v => setA(r1(v))} min={-1} max={2} step={0.1} format={fmt} />
        <Slider label="B" value={B} onChange={v => setB(r1(v))} min={-2} max={2} step={0.1} format={fmt} />
        {!wrong && <Slider label="C" value={Cc} onChange={v => setCc(r1(v))} min={-2} max={2} step={0.1} format={fmt} />}
        <Buttons>
          <Toggle label={<>Constant on top: <M>{'\\frac{B}{1+x^2}'}</M></>} checked={wrong} onChange={setWrong} />
          {wrong && (
            <ActionButton
              label={<>Try <M>x = 0</M> and <M>x = 1</M></>}
              onClick={() => {
                setA(1)
                setB(-1)
              }}
            />
          )}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex="A(1+x^2)" />
          <Readout color={C.g} tex={wrong ? 'Bx' : '(Bx+C)\\,x'} />
          <Readout color={sumColor} tex={`\\text{sum} = ${fmt(a2)}x^2 ${signed(a1, 'x')} ${signed(a0, '')}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
