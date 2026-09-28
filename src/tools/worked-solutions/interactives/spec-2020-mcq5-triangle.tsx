// 2020 Specialist Exam 2 MCQ 5 — what 4zz̄/(z + z̄)² means on the Argand plane. Drag z (snapped to
// halves): z̄ is its mirror image, z + z̄ lands on the real axis at 2a (the imaginary parts cancel),
// and zz̄ = |z|². So the expression is (2|z|)²/(2a)² = (|z|/a)², hypotenuse over adjacent squared in
// the right triangle with sides a, b, |z|: sec²θ = 1 + tan²θ = 1 + (b/a)², option A. Under the
// picture the five options are evaluated at the current z. Only A agrees everywhere; C agrees
// whenever Re z = ±½ (then (z + z̄)² = 1), E at z = ±1 + i, D at ±½ ∓ i — each flagged when it
// happens, to show that one test value can't prove two expressions equal. (Coincidences listed by a
// grid scan in Python over the widget's range.)

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, clamp } from './kit'

const A_MAX = 2
const B_MAX = 2.5
const half = (v: number) => Math.round(v * 2) / 2

/** A number for a readout: up to 4 dp, trailing zeros dropped, real minus sign. */
function n(v: number): string {
  const s = (Math.round(v * 10000) / 10000).toString()
  return s.replace('-', '−')
}
/** a + bi as TeX. */
function cx(a: number, b: number): string {
  if (b === 0) return n(a)
  const im = `${Math.abs(b) === 1 ? '' : n(Math.abs(b))}i`
  if (a === 0) return b < 0 ? `-${im}` : im
  return `${n(a)} ${b < 0 ? '-' : '+'} ${im}`
}

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: { letter: Letter; value: (a: number, b: number) => number }[] = [
  { letter: 'A', value: (a, b) => 1 + (b / a) ** 2 },
  { letter: 'B', value: (a, b) => 4 * a * b },
  { letter: 'C', value: (a, b) => 4 * (a * a + b * b) },
  { letter: 'D', value: (a, b) => 4 * (1 + (a + b) ** 2) },
  { letter: 'E', value: (a, b) => (2 * b) / (a * a) },
]

function OptionsRow({ a, b, target }: { a: number; b: number; target: number | null }) {
  return (
    <div className="grid grid-cols-5 gap-1.5 text-center text-[12px]">
      {OPTIONS.map(o => {
        const v = target === null ? null : o.value(a, b)
        const same = v !== null && target !== null && Math.abs(v - target) < 1e-9
        return (
          <div
            key={o.letter}
            className={`rounded-md border px-1 py-1 ${
              same
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
            }`}
          >
            <div className="font-semibold">
              {o.letter} {same ? '✓' : ''}
            </div>
            <div className="tabular-nums">{v === null ? '—' : n(v)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function TriangleWidget() {
  const [z, setZ] = useState<[number, number]>([2, 1.5])
  const [a, b] = z
  const mod2 = a * a + b * b
  const value = a === 0 ? null : (4 * mod2) / (2 * a) ** 2
  const coincide = value === null ? [] : OPTIONS.filter(o => o.letter !== 'A' && Math.abs(o.value(a, b) - value) < 1e-9).map(o => o.letter)

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (a === 0) {
    tone = 'warn'
    notice = (
      <>
        <b>z is on the imaginary axis, so <M>{'z + \\bar z = 0'}</M></b>: <M>z</M> and <M>{'\\bar z'}</M> point in exactly opposite
        directions and cancel, and the expression divides by zero. That is why the question says <M>{'a \\in R\\setminus\\{0\\}'}</M>. In
        the triangle, the side next to the angle has shrunk to nothing. Drag z off the axis.
      </>
    )
  } else if (b === 0 && coincide.length === 0) {
    notice = (
      <>
        <b>z is real, so <M>{'\\bar z = z'}</M></b> and the triangle has gone flat: <M>|z| = |a|</M>. The expression is{' '}
        <M>{'\\tfrac{4a^2}{(2a)^2} = 1'}</M>, and option A agrees, since <M>{'\\operatorname{Im}(z) = 0'}</M> gives <M>1 + 0^2 = 1</M>. Now
        lift z off the real axis.
      </>
    )
  } else if (coincide.length > 0) {
    tone = 'warn'
    notice = (
      <>
        <b>Careful: option {coincide.join(' and ')} happens to agree at this z as well.</b>{' '}
        {coincide.includes('C') ? (
          <>
            Here <M>{'\\operatorname{Re}(z) = \\pm\\tfrac12'}</M>, so <M>{'(z + \\bar z)^2 = 1'}</M> and dividing by it changes nothing:{' '}
            <M>{'4z\\bar z'}</M> (option C) comes out the same.{' '}
          </>
        ) : null}
        One test value can&apos;t prove two expressions equal. Move z and {coincide.join(' and ')} {coincide.length > 1 ? 'fall' : 'falls'} away, while A keeps
        agreeing. If you test options by substituting (or on CAS), use an untidy value such as <M>z = 1 + 2i</M>.
      </>
    )
  } else {
    tone = 'good'
    notice = (
      <>
        The green line <M>{'z + \\bar z'}</M> ends at <M>2a</M> on the real axis: the imaginary parts cancel. On top,{' '}
        <M>{'4z\\bar z = 4|z|^2 = (2|z|)^2'}</M>. So the fraction is <M>{'\\left(\\tfrac{|z|}{a}\\right)^2'}</M>, the hypotenuse over the
        adjacent side, squared. That is <M>{'\\sec^2\\theta = 1 + \\tan^2\\theta'}</M>, and <M>{'\\tan\\theta = \\tfrac{b}{a}'}</M>: option A.
        {a < 0 ? (
          <> With z on the left, <M>2a</M> is negative, but it is squared, so only the length <M>|a|</M> matters.</>
        ) : (
          <> Drag z anywhere, even to the left of the imaginary axis: A always agrees.</>
        )}
      </>
    )
  }

  // The angle θ at O between the real axis (on z's side) and z.
  const th1 = Math.atan2(b, a)
  const th0 = a > 0 ? 0 : b >= 0 ? Math.PI : -Math.PI
  const tri: [number, number][] = [
    [0, 0],
    [a, 0],
    [a, b],
  ]

  return (
    <div>
      <Plane x={[-4.5, 4.5]} y={[-3, 3]} equalScale height={330} xLabel="" yLabel="Im" labels={false}>
        {/* "Re" drawn inside the right end (past it, the phone-width padding clips two letters), on the
            opposite side of the axis from the green "z + z̄" label. */}
        <Label at={[4.5, 0]} attach={b >= 0 ? 'n' : 's'} gap={7} size={14} italic>Re</Label>
        {a !== 0 && b !== 0 && <Polygon points={tri} color={C.f} fillOpacity={0.12} weight={0} strokeOpacity={0} />}
        {/* z and its conjugate are directly above and below a, so z + z̄ = 2a. */}
        <Line.Segment point1={[a, b]} point2={[a, -b]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={[a, -b]} color={C.g} style="dashed" weight={2} />
        {a !== 0 && <Line.Segment point1={[0, 0]} point2={[2 * a, 0]} color={C.good} weight={4} />}
        {a !== 0 && <Point x={2 * a} y={0} color={C.good} />}
        <Line.Segment point1={[0, 0]} point2={[a, b]} color={C.f} weight={3} />

        {a !== 0 && b !== 0 && (
          <>
            {/* The angle only fits inside a triangle that isn't too small. */}
            {Math.abs(a) >= 1 && mod2 >= 2 && (
              <>
                <Plot.Parametric xy={t => [0.55 * Math.cos(t), 0.55 * Math.sin(t)]} domain={[Math.min(th0, th1), Math.max(th0, th1)]} color={C.ink} weight={1.5} />
                <Label at={[0.95 * Math.cos((th0 + th1) / 2), 0.95 * Math.sin((th0 + th1) / 2)]} color={C.ink} attach="c" size={12} italic>θ</Label>
              </>
            )}
            <Label at={[a / 2, 0]} color={C.ink} attach={b > 0 ? 's' : 'n'} gap={5} size={12} italic>a</Label>
            <Label at={[a, b / 2]} color={C.ink} attach={a > 0 ? 'e' : 'w'} gap={6} size={12} italic>b</Label>
            <Label at={[a / 2, b / 2]} color={C.f} attach={(a > 0) === (b > 0) ? 'nw' : 'ne'} gap={6} size={12}>|z|</Label>
          </>
        )}
        {a !== 0 && (
          <Label at={[2 * a, 0]} color={C.good} attach={b >= 0 ? 's' : 'n'} gap={9} size={12}>
            z + z̄
          </Label>
        )}
        <Point x={a} y={-b} color={C.g} />
        {b !== 0 && <Label at={[a, -b]} color={C.g} attach={a >= 0 ? 'e' : 'w'} gap={9}>z̄</Label>}
        <Label at={[a, b]} color={C.f} attach={a >= 0 ? 'ne' : 'nw'} gap={10}>z</Label>
        <MovablePoint point={z} onMove={([x, y]) => setZ([clamp(half(x), -A_MAX, A_MAX), clamp(half(y), -B_MAX, B_MAX)])} color={C.f} />
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex={`z = ${cx(a, b)}`} />
          <Readout tex={`z\\bar z = a^2 + b^2 = ${n(mod2)}`} />
          <Readout color={C.good} tex={`(z + \\bar z)^2 = (2a)^2 = ${n(4 * a * a)}`} />
        </Readouts>
        <Readouts>
          <Readout tex={value === null ? '\\dfrac{4z\\bar z}{(z+\\bar z)^2} \\text{ undefined}' : `\\dfrac{4z\\bar z}{(z+\\bar z)^2} = ${n(value)}`} />
          <Readout tex={value === null ? '1 + \\left(\\tfrac{b}{a}\\right)^2 \\text{ undefined}' : `1 + \\left(\\tfrac{b}{a}\\right)^2 = ${n(1 + (b / a) ** 2)}`} />
        </Readouts>
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">Each option at this z (green where it equals the expression):</p>
          <OptionsRow a={a} b={b} target={value} />
        </div>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the blue point z.</p>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
