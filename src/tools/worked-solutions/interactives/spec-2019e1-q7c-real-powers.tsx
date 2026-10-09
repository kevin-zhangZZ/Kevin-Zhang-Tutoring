// 2019 Specialist Exam 1 Q7c — why (3 − √3 i)ⁿ is real exactly when n = 6k, k ∈ Z.
// z = 3 − √3 i = 2√3 cis(−π/6), so by de Moivre zⁿ = (2√3)ⁿ cis(−nπ/6): each extra factor of z
// turns the point π/6 clockwise, and each ÷ z turns it back π/6 anticlockwise. The clock shows only
// the DIRECTION of zⁿ (its length (2√3)ⁿ is far too large to draw); the orange spiral is the total
// angle turned. The table lays the integers out in rows of 6, so one row is one half-turn and every
// n in the same column points along the same line through the origin. zⁿ is real (sin(−nπ/6) = 0)
// exactly in the 6k column, which includes the negative real axis (z⁶ = −1728) and negative n
// (z⁻⁶ = −1/1728, z⁰ = 1). The toggle shows the wrong idea "real means Arg = 0", i.e. n = 12k, which
// misses n = ±6. The PowersPicture helper below is shared with the part d. widget
// (spec-2019e1-q7d-imaginary-powers.tsx).

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle, Vector, clamp } from './kit'

export const N_MIN = -12
export const N_MAX = 17

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
/** "z⁻⁶"-style name for zⁿ, for labels on the plane. */
export const zName = (n: number) => 'z' + (n === 1 ? '' : String(n).split('').map(c => SUP[c] ?? c).join(''))
/** Integer with a proper minus sign, for table cells. */
export const intText = (v: number) => (v < 0 ? `−${-v}` : String(v))

export const mod = (a: number, m: number) => ((a % m) + m) % m
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/** TeX for (p/q)π in lowest terms, e.g. piTex(-6, 6) = "-\pi", piTex(-4, 6) = "-\tfrac{2\pi}{3}". */
export function piTex(p: number, q: number): string {
  if (p === 0) return '0'
  const g = gcd(p, q)
  let a = p / g
  let b = q / g
  if (b < 0) {
    a = -a
    b = -b
  }
  const sign = a < 0 ? '-' : ''
  const top = Math.abs(a) === 1 ? '\\pi' : `${Math.abs(a)}\\pi`
  return b === 1 ? `${sign}${top}` : `${sign}\\tfrac{${top}}{${b}}`
}

/** Principal argument of zⁿ as a multiple m of π/6, with m in (−6, 6]. */
export function argStep(n: number) {
  let m = mod(-n, 12)
  if (m > 6) m -= 12
  return m
}

/** Exact value of zⁿ when it lies on an axis (n a multiple of 3), else null. */
export function landingTex(n: number): string | null {
  const m = argStep(n)
  if (mod(n, 6) === 0) {
    // (2√3)⁶ = 1728, so zⁿ = (2√3)ⁿ cis(mπ/6) with m = 0 or 6 is ±1728^(n/6).
    const k = n / 6
    const s = m === 6 ? '-' : ''
    if (k === 0) return '1'
    if (k === 1) return `${s}1728`
    if (k === -1) return `${s}\\tfrac{1}{1728}`
    return k > 0 ? `${s}1728^{${k}}` : `${s}\\tfrac{1}{1728^{${-k}}}`
  }
  if (mod(n, 6) === 3) {
    // cis(±π/2) = ±i.
    const s = m === -3 ? '-' : ''
    if (n === 3) return '-24\\sqrt3\\,i'
    if (n === -3) return '\\tfrac{\\sqrt3}{72}\\,i'
    return `${s}\\left(2\\sqrt3\\right)^{${n}}\\,i`
  }
  return null
}

const ATTACH = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se'] as const

/** The clock (direction of zⁿ) beside the table of integers in rows of 6. */
export function PowersPicture({
  n,
  setN,
  target,
  marked,
}: {
  n: number
  setN: (n: number) => void
  target: 'real' | 'imag'
  /** Cells picked out by a wrong rule (red dashed outline). */
  marked?: (k: number) => boolean
}) {
  const col = target === 'real' ? 0 : 3
  const hits = (k: number) => mod(k, 6) === col
  const th = (t: number) => (-t * Math.PI) / 6
  const u = (t: number, r = 1): [number, number] => [r * Math.cos(th(t)), r * Math.sin(th(t))]
  const lo = Math.min(0, n)
  const hi = Math.max(0, n)
  const trail: number[] = []
  for (let k = lo; k <= hi; k++) trail.push(k)
  const on = hits(n)
  const ang = (argStep(n) * Math.PI) / 6
  const attach = ATTACH[mod(Math.round((ang + Math.PI / 8) / (Math.PI / 4)), 8)]

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
      <div className="flex-1 min-w-0">
        {/* "Re" drawn by hand above the axis end: the automatic one sits right of x = 1.7 and is clipped
            when the plane is narrow (desktop, beside the table). */}
        <Plane x={[-1.45, 1.7]} y={[-1.45, 1.45]} equalScale height={320} labels={false} xLabel="" yLabel="Im">
          <Label at={[1.57, 0]} attach="n" size={14} italic>
            Re
          </Label>
          {target === 'real' ? (
            <Line.Segment point1={[-1.3, 0]} point2={[1.3, 0]} color={C.good} weight={5} opacity={0.55} />
          ) : (
            <Line.Segment point1={[0, -1.3]} point2={[0, 1.3]} color={C.good} weight={5} opacity={0.55} />
          )}
          <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
          {Array.from({ length: 12 }, (_, k) => (
            <Circle key={k} center={u(k)} radius={0.025} color={C.guide} fillOpacity={1} weight={1} />
          ))}
          {n !== 0 && <Plot.Parametric xy={t => u(t, 0.26 + 0.022 * Math.abs(t))} domain={[lo, hi]} color={C.g} weight={2.5} />}
          {trail.map(k => (
            <Circle key={k} center={u(k)} radius={0.05} color={hits(k) ? C.good : C.f} fillOpacity={0.6} weight={1} />
          ))}
          <Vector tail={[0, 0]} tip={u(n)} color={on ? C.good : C.f} weight={3.5} />
          <Label at={u(n)} attach={attach} color={on ? C.good : C.f} gap={9}>
            {zName(n)}
          </Label>
        </Plane>
        <p className="mt-1 text-[11.5px] text-gray-500 dark:text-gray-400 leading-snug">
          Direction of <M>{`z^{${n}}`}</M> only: its length <M>{`(2\\sqrt3)^{${n}}`}</M> is far too big (or small) to draw.
          Orange: the total turn.
        </p>
      </div>
      <div className="shrink-0 self-center sm:self-start">
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400 mb-1 text-center">Integers in rows of 6 (one row = a half-turn)</p>
        <table className="border-separate border-spacing-1 text-[12.5px] tabular-nums mx-auto">
          <thead>
            <tr>
              <th />
              {[0, 1, 2, 3, 4, 5].map(c => (
                <th
                  key={c}
                  className={`text-[11px] font-semibold px-0.5 ${c === col ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  {c === 0 ? '6k' : `6k+${c}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[-2, -1, 0, 1, 2].map(k => (
              <tr key={k}>
                <th className="text-[11px] font-normal text-gray-500 dark:text-gray-400 pr-1 whitespace-nowrap text-right">
                  k = {intText(k)}
                </th>
                {[0, 1, 2, 3, 4, 5].map(c => {
                  const v = 6 * k + c
                  const good = hits(v)
                  const cls = [
                    'w-9 h-8 rounded-md font-semibold transition-colors',
                    good
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
                    v === n ? 'ring-2 ring-sky-500' : '',
                    marked?.(v) ? 'outline outline-2 outline-dashed outline-red-500 outline-offset-1' : '',
                  ].join(' ')
                  return (
                    <td key={c} className="p-0">
                      <button type="button" className={cls} onClick={() => setN(v)} aria-label={`n = ${v}`}>
                        {intText(v)}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** Slider plus ×z / ÷z buttons, shared with the part d. widget. */
export function PowerControls({ n, setN }: { n: number; setN: (n: number) => void }) {
  const step = (d: number) => setN(clamp(n + d, N_MIN, N_MAX))
  return (
    <>
      <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={N_MIN} max={N_MAX} step={1} format={v => intText(Math.round(v))} />
      <Buttons>
        <ActionButton label="÷ z  (↺ π/6)" onClick={() => step(-1)} />
        <ActionButton label="× z  (↻ π/6)" onClick={() => step(1)} />
      </Buttons>
    </>
  )
}

/** The two readouts every state shows: the angle turned, and zⁿ by de Moivre. */
export function powerReadouts(n: number) {
  const land = landingTex(n)
  const polar = `z^{${n}} = \\left(2\\sqrt3\\right)^{${n}}\\operatorname{cis}\\left(${piTex(-n, 6)}\\right)`
  return {
    turn: `\\arg\\left(z^{${n}}\\right) = ${n}\\times\\left(-\\tfrac{\\pi}{6}\\right) = ${piTex(-n, 6)}`,
    value: land ? `${polar} = ${land}` : polar,
  }
}

export default function RealPowers() {
  const [n, setN] = useState(6)
  const [wrong, setWrong] = useState(false)
  const real = mod(n, 6) === 0
  const r = powerReadouts(n)
  const land = landingTex(n)
  const zn = `z^{${n}}`

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>&ldquo;Real means the argument is 0&rdquo;</b> solves <M>{'-\\tfrac{n\\pi}{6} = 2k\\pi'}</M>, so <M>n = -12k</M>: only
        the red dashed cells. But the whole green column is real. At <M>n = 6</M> the point has made a half-turn,{' '}
        <M>{'z^6 = 1728\\operatorname{cis}(-\\pi) = -1728'}</M>, and a negative number is still real. Real means on the real
        axis, <em>either</em> side: an argument of any whole number of <M>\pi</M>. Click <M>6</M> and <M>-6</M> in the table.
      </Notice>
    )
  } else if (n === 0) {
    notice = (
      <Notice tone="good">
        <M>{'z^0 = 1'}</M>: no turns at all, so it&apos;s real, and <M>n = 0</M> belongs in the answer (<M>k = 0</M>). Press{' '}
        <b>× z</b> six times, or click <M>6</M> in the table, and count the turns it takes to reach the axis again.
      </Notice>
    )
  } else if (real && n > 0) {
    notice = (
      <Notice tone="good">
        {n === 6 ? (
          <>
            Six turns of <M>{'-\\tfrac{\\pi}{6}'}</M> make <M>-\pi</M>, a half-turn: <M>{`z^6 = 1728\\operatorname{cis}(-\\pi) = -1728`}</M>,
            on the <b>negative</b> real axis, which is still real.
          </>
        ) : (
          <>
            <M>{`${zn} = ${land}`}</M>: after <M>{String(n / 6)}</M> half-turns the point is back on the real axis.
          </>
        )}{' '}
        Every 6 more powers is another half-turn, which keeps it on the real axis: that&apos;s the green <M>6k</M> column. Now
        slide <M>n</M> below <M>0</M>.
      </Notice>
    )
  } else if (real) {
    notice = (
      <Notice tone="good">
        Negative powers turn the other way: each <b>÷ z</b> turns <M>{'\\tfrac{\\pi}{6}'}</M> anticlockwise. <M>{`${zn} = ${land}`}</M> is
        real too, so the answer needs negative <M>k</M> as well: <M>{'n = 6k,\\ k \\in Z'}</M>. Writing <M>n = 6k</M> without
        saying <M>{'k \\in Z'}</M> doesn&apos;t pin this down.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{zn}</M> points at <M>{`\\operatorname{Arg} = ${piTex(argStep(n), 6)}`}</M>, off the real axis, so its imaginary
        part <M>{`\\left(2\\sqrt3\\right)^{${n}}\\sin\\left(${piTex(-n, 6)}\\right)`}</M> isn&apos;t <M>0</M>. Press <b>× z</b> or{' '}
        <b>÷ z</b> until the arrow lands on the green axis, and watch which column of the table it lands in.
      </Notice>
    )
  }

  return (
    <div>
      <PowersPicture n={n} setN={setN} target="real" marked={wrong ? k => mod(k, 12) === 0 : undefined} />
      <Controls>
        <PowerControls n={n} setN={setN} />
        <Toggle label="Wrong idea: real means Arg = 0" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={r.turn} color={C.g} />
          <Readout tex={r.value} color={real ? C.good : C.f} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
