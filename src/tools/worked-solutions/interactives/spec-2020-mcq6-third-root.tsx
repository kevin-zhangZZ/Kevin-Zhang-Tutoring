// 2020 Specialist Exam 2 MCQ 6 — why the third root has to be −3i. The roots −2 and 3i are fixed;
// drag the third root r = p + qi (snapped to whole numbers) and the cubic (z + 2)(z − 3i)(z − r) is
// expanded live: a = (2 − p) − (3 + q)i, b = (−2p − 3q) + (3p − 2q − 6)i, c = −6q + 6pi (expanded
// with sympy). The imaginary parts (red) vanish together only at r = −3i, the mirror image of 3i in
// the real axis, giving z³ + 2z² + 9z + 18: option C. Seen through the roots: a = −(sum of the
// roots) needs Im r = −3 to cancel the 3i, and c = −(product of the roots) = 6ir needs r purely
// imaginary. A real third root (3 or −3, say) can never cancel the 3i.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, clamp } from './kit'

const R = 4
const n = (v: number) => String(v).replace('-', '−')

/** p + qi as TeX. */
function cx(p: number, q: number): string {
  if (q === 0) return String(p)
  const im = `${Math.abs(q) === 1 ? '' : Math.abs(q)}i`
  if (p === 0) return q < 0 ? `-${im}` : im
  return `${p} ${q < 0 ? '-' : '+'} ${im}`
}

function Coef({ name, re, im }: { name: string; re: number; im: number }) {
  const real = im === 0
  return (
    <div
      className={`rounded-md border px-2 py-1.5 text-center ${
        real
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
          : 'border-rose-200 bg-rose-50/60 text-gray-700 dark:border-rose-900/60 dark:bg-rose-950/20 dark:text-gray-200'
      }`}
    >
      <div className="text-[11.5px] text-gray-500 dark:text-gray-400">
        <i>{name}</i> {real ? '(real ✓)' : '(not real)'}
      </div>
      <div className="text-[13.5px] font-semibold tabular-nums">
        {real ? (
          n(re)
        ) : (
          <>
            {re !== 0 && <>{n(re)} </>}
            <span className="text-rose-600 dark:text-rose-400">
              {re !== 0 ? (im < 0 ? '− ' : '+ ') : im < 0 ? '−' : ''}
              {Math.abs(im) === 1 ? '' : Math.abs(im)}i
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default function ThirdRootWidget() {
  const [r, setR] = useState<[number, number]>([3, 0])
  const [p, q] = r
  const a = { re: 2 - p, im: -3 - q }
  const b = { re: -2 * p - 3 * q, im: 3 * p - 2 * q - 6 }
  const c = { re: -6 * q, im: 6 * p }
  const allReal = a.im === 0 && b.im === 0 && c.im === 0

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (allReal) {
    tone = 'good'
    notice = (
      <>
        <b>Every imaginary part has cancelled:</b> <M>{'P(z) = z^3 + 2z^2 + 9z + 18'}</M>, so <M>a = 2</M>, <M>b = 9</M>,{' '}
        <M>c = 18</M> (option C). The third root is <M>-3i</M>, the mirror image of <M>3i</M> in the real axis, and the pair
        multiplies to <M>{'(z - 3i)(z + 3i) = z^2 + 9'}</M>, with no <M>i</M> left at all. That is the conjugate root theorem: with
        real coefficients, non-real roots come in mirror-image pairs.
      </>
    )
  } else if (q === -3) {
    tone = 'warn'
    notice = (
      <>
        <b>Halfway there.</b> With imaginary part <M>-3</M>, <M>r</M> cancels the <M>3i</M> in the sum of the roots, so{' '}
        <M>{'a = -(-2 + 3i + r)'}</M> is real now. But <M>c</M> is minus the product of the roots,{' '}
        <M>{'c = -(-2)(3i)(r) = 6ir,'}</M> and that is real only when <M>r</M> is purely imaginary. Slide <M>r</M> sideways onto the
        imaginary axis.
      </>
    )
  } else if (p === 0) {
    notice = (
      <>
        <M>r</M> is on the imaginary axis, so <M>{'c = -(-2)(3i)(r) = 6ir'}</M> is real (<M>i</M> times an imaginary number is real).
        But <M>a</M> is minus the sum of the roots, <M>{'a = -(-2 + 3i + r),'}</M> and the <M>3i</M> only cancels if the imaginary
        part of <M>r</M> is <M>-3</M>. Move <M>r</M> up or down the axis.
      </>
    )
  } else if (q === 0) {
    notice = (
      <>
        <M>r</M> is <b>real</b>, and a real root can never cancel the <M>3i</M>: <M>a</M> is minus the sum of the roots,{' '}
        <M>{'-(-2 + 3i + r),'}</M> which keeps its <M>-3i</M> whatever real <M>r</M> you try. So &ldquo;<M>3i</M> is a root, so{' '}
        <M>3</M> or <M>-3</M> is too&rdquo; can&apos;t be right. Drag <M>r</M> around until all three boxes turn green.
      </>
    )
  } else {
    notice = (
      <>
        The red parts are imaginary parts, so this cubic does <b>not</b> have real coefficients and can&apos;t be the{' '}
        <M>P(z)</M> in the question. Two things must happen at once: <M>a = -(-2 + 3i + r)</M> needs the imaginary part of{' '}
        <M>r</M> to be <M>-3</M>, and <M>c = 6ir</M> needs <M>r</M> to be purely imaginary. Find the one spot that does both.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-R, R]} y={[-R, R]} equalScale height={330} xLabel="Re" yLabel="Im">
        {allReal && <Line.Segment point1={[0, 3]} point2={[0, -3]} color={C.good} style="dashed" weight={2} />}
        <Point x={-2} y={0} color={C.ink} />
        <Label at={[-2, 0]} attach="n" gap={9}>−2</Label>
        <Point x={0} y={3} color={C.f} />
        <Label at={[0, 3]} color={C.f} attach="w" gap={9}>3i</Label>
        <Label at={r} color={allReal ? C.good : C.g} attach={p > 0 ? (q > 0 ? 'se' : 'ne') : p < 0 ? (q > 0 ? 'sw' : 'nw') : 'w'} gap={11}>
          {allReal ? 'r = −3i' : 'r'}
        </Label>
        <MovablePoint
          point={r}
          onMove={([x, y]) => setR([clamp(Math.round(x), -R, R), clamp(Math.round(y), -R, R)])}
          color={allReal ? C.good : C.g}
        />
      </Plane>
      <Controls>
        <p className="text-[13px] text-gray-700 dark:text-gray-300">
          Roots <M>-2</M>, <M>3i</M> and <M>{`r = ${cx(p, q)}`}</M> give <M>{'(z+2)(z-3i)(z-r)'}</M>{' '}
          <M>{'= z^3 + az^2 + bz + c'}</M> with
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          <Coef name="a" re={a.re} im={a.im} />
          <Coef name="b" re={b.re} im={b.im} />
          <Coef name="c" re={c.re} im={c.im} />
        </div>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">Drag the orange point r, the third root.</p>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
