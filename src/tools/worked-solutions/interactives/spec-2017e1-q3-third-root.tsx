// 2017 Specialist Exam 1 Q3 — where the third root comes from. The conjugate pair 1 ± i fixes the
// quadratic factor z² − 2z + 2; the only free choice is the third root c, i.e. the linear factor
// (z − c). A multiplication grid expands (z² − 2z + 2)(z − c) term by term, colour-coded by power,
// and two checks test the result against the question's pattern z³ + az² + 6z + a: the
// z-coefficient must be 6 and the z² coefficient must equal the constant term (both are a). Only
// c = 2 passes both, giving z³ − 4z² + 6z − 4. It starts at c = 1, the cubic with the same pair
// but third root 1 — which also shows that (1 − i)(1 + i) = 2 is not how the third root is found.

import { useState } from 'react'
import { C, Controls, Katex, M, Notice, Readout, Readouts, Slider } from './kit'

const COL = { 2: C.g, 1: C.f, 0: C.violet } as const

/** A tidy decimal: 2, −0.5 (ASCII minus, for TeX). */
const d = (v: number) => {
  const s = (Math.abs(v) < 1e-9 ? 0 : v).toFixed(2).replace(/\.?0+$/, '')
  return s
}

/** One term k·z^n as TeX, with its own sign (e.g. "-2z^2", "4z", "-4", "z^2"). */
function term(k: number, n: 0 | 1 | 2 | 3): string {
  if (Math.abs(k) < 1e-9) return '0'
  const zs = n === 0 ? '' : n === 1 ? 'z' : `z^${n}`
  if (n > 0 && Math.abs(Math.abs(k) - 1) < 1e-9) return `${k < 0 ? '-' : ''}${zs}`
  return `${d(k)}${zs}`
}

/** z³ + A2 z² + A1 z + A0 as TeX, each coefficient coloured by its power. */
function poly(A2: number, A1: number, A0: number): string {
  const parts: string[] = ['z^3']
  const add = (k: number, n: 1 | 2 | 0) => {
    if (Math.abs(k) < 1e-9) return
    const t = term(Math.abs(k), n)
    parts.push(`${k < 0 ? '-' : '+'} \\textcolor{${COL[n]}}{${t}}`)
  }
  add(A2, 2)
  add(A1, 1)
  add(A0, 0)
  return parts.join(' ')
}

function Cell({ tex, power }: { tex: string; power: 0 | 1 | 2 | 3 }) {
  return (
    <td
      className="border border-gray-200 dark:border-gray-700 px-2 py-1.5 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      style={power === 3 ? undefined : { color: COL[power as 0 | 1 | 2] }}
    >
      <Katex tex={tex} />
    </td>
  )
}

function Head({ tex }: { tex: string }) {
  return (
    <th className="border border-gray-200 dark:border-gray-700 px-2 py-1.5 text-center font-normal bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <Katex tex={tex} />
    </th>
  )
}

export default function ThirdRoot() {
  const [c, setC] = useState(1)
  const A2 = -2 - c
  const A1 = 2 + 2 * c
  const A0 = -2 * c
  const zOk = Math.abs(A1 - 6) < 1e-9
  const aOk = Math.abs(A2 - A0) < 1e-9
  const both = zOk && aOk
  const lin = Math.abs(c) < 1e-9 ? 'z' : `z ${c > 0 ? '-' : '+'} ${d(Math.abs(c))}`

  let notice
  if (both) {
    notice = (
      <Notice tone="good">
        <b>Both checks pass at <M>c = 2</M>.</b> The product is <M>{'z^3 - 4z^2 + 6z - 4'}</M>, exactly the pattern{' '}
        <M>{'z^3 + az^2 + 6z + a'}</M> with <M>a = -4</M>. The <M>z</M>-coefficient alone, <M>2 + 2c = 6</M>, already
        forces <M>c = 2</M> without knowing <M>a</M> first.
      </Notice>
    )
  } else if (Math.abs(c - 1) < 1e-9) {
    notice = (
      <Notice>
        This cubic, <M>{'z^3 - 3z^2 + 4z - 2'}</M>, has the <b>same pair</b> <M>1 \pm i</M>, and <M>(1 - i)(1 + i) = 2</M>{' '}
        here too — yet its third root is <M>1</M>. So multiplying the pair does not give the third root. It also
        fails the question&apos;s pattern: its <M>z</M>-coefficient is <M>4</M>, not <M>6</M>. Slide <M>c</M> until both checks
        turn green.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The pair <M>1 \pm i</M> fixes the factor <M>{'z^2 - 2z + 2'}</M>; the only thing you can change is the third root{' '}
        <M>c</M>. Each grid cell is one term of the expansion, and cells of the same colour collect into one coefficient.
        Slide <M>c</M> until the <M>z</M>-coefficient is <M>6</M> and the <M>{'z^2'}</M> coefficient equals the constant (both
        must be <M>a</M>).
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="text-[14px] text-gray-700 dark:text-gray-200">
          <Katex tex={`(z^2 - 2z + 2)(${lin})`} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="px-2 py-1.5 text-[11px] font-normal text-gray-400 dark:text-gray-500">×</th>
                <Head tex="z^2" />
                <Head tex="-2z" />
                <Head tex="+2" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <Head tex="z" />
                <Cell tex="z^3" power={3} />
                <Cell tex="-2z^2" power={2} />
                <Cell tex="2z" power={1} />
              </tr>
              <tr>
                <Head tex={Math.abs(c) < 1e-9 ? '0' : d(-c)} />
                <Cell tex={term(-c, 2)} power={2} />
                <Cell tex={term(2 * c, 1)} power={1} />
                <Cell tex={term(-2 * c, 0)} power={0} />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-[15px] text-gray-800 dark:text-gray-100">
          <Katex tex={`= ${poly(A2, A1, A0)}`} />
        </div>
      </div>
      <Controls>
        <Slider label="c" value={c} onChange={setC} min={-2} max={5} step={0.5} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout
            color={zOk ? C.good : C.bad}
            tex={`z\\text{-coefficient: } 2 + 2c = ${d(A1)} ${zOk ? '= 6\\ \\checkmark' : '\\ne 6'}`}
          />
          <Readout
            color={aOk ? C.good : C.bad}
            tex={
              aOk
                ? `z^2\\text{ coeff.} = \\text{constant} = ${d(A0)}\\ \\checkmark`
                : `z^2\\text{ coeff.} = ${d(A2)} \\ne ${d(A0)} = \\text{constant}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
