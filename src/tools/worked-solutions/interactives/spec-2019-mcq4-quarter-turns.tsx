// 2019 Specialist Exam 2 MCQ 4 — why i^(n!) = 1 for every n ≥ 4. Multiplying by i is a quarter-turn
// anticlockwise, so i^k is 1 turned through k quarter-turns and only the remainder of k on division
// by 4 decides where it lands. Slide n: the exponent n! is split into whole turns plus a remainder,
// the landing point is lit on the unit circle (with the leftover quarter-turns drawn as an arc), and
// the terms so far are laid out as chips with their running total. From n = 4 on, n! has 4 as a
// factor, so the remainder is 0 and every term is 1: the total is (−2 + i) + 97 = 95 + i (option C).
// The toggle swaps the exponent to n, the common wrong idea: then the terms really do cycle
// i, −1, −i, 1 and 100 terms add to 0 (option A, 18%).

import { useState } from 'react'
import { C, Circle, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector } from './kit'

const N_MAX = 10
const fact = (n: number) => {
  let p = 1
  for (let k = 2; k <= n; k++) p *= k
  return p
}
/** i^r for r = 0, 1, 2, 3: as TeX, as a point, as a colour, and as (re, im). */
const TEX = ['1', 'i', '-1', '-i']
const SHOW = ['1', 'i', '−1', '−i']
const PT: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]
const COL = [C.good, C.violet, C.g, C.f]

/** Digits grouped in threes with thin spaces, for TeX. */
const big = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')

/** re + im·i as TeX. */
function cx(re: number, im: number): string {
  if (im === 0) return String(re)
  const imPart = im === 1 ? 'i' : im === -1 ? '-i' : `${im}i`
  if (re === 0) return imPart
  return `${re} ${im < 0 ? '-' : '+'} ${Math.abs(im) === 1 ? '' : Math.abs(im)}i`
}

export default function QuarterTurnsWidget() {
  const [n, setN] = useState(3)
  const [wrong, setWrong] = useState(false)

  const exp = (k: number) => (wrong ? k : fact(k))
  const e = exp(n)
  const q = Math.floor(e / 4)
  const r = e % 4
  const terms = Array.from({ length: n }, (_, j) => exp(j + 1) % 4)
  const re = terms.reduce((s, t) => s + PT[t][0], 0)
  const im = terms.reduce((s, t) => s + PT[t][1], 0)

  // The total after all 100 terms, projected from here.
  const total100 = wrong ? '0' : n >= 4 ? cx(re + (100 - n), im) : null

  const expTex = wrong ? `${n}` : `${n}!`
  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (wrong) {
    tone = 'warn'
    notice = (
      <>
        With exponent <M>n</M> the terms really do cycle <M>{'i,\\ -1,\\ -i,\\ 1'}</M>, and every block of four adds to{' '}
        <M>0</M>, so 100 terms would give <M>0</M> (option A). But the question&apos;s exponents are{' '}
        <M>{'1,\\ 2,\\ 6,\\ 24,\\ 120,\\ \\dots'}</M>, not <M>{'1,\\ 2,\\ 3,\\ 4,\\ 5,\\ \\dots'}</M>. Turn the toggle off and
        compare the chips.
      </>
    )
  } else if (n <= 2) {
    notice = (
      <>
        <M>{'i^k'}</M> is <M>1</M> turned through <M>k</M> quarter-turns, so only the remainder of <M>k</M> after dividing by{' '}
        <M>4</M> matters. The first two exponents are just <M>1</M> and <M>2</M>. Slide on to <M>n = 3</M>, where the
        factorial first bites.
      </>
    )
  } else if (n === 3) {
    notice = (
      <>
        <M>{'3! = 6 = 4 + 2'}</M>: one full turn, then two more quarter-turns, so <M>{'i^{3!} = i^2 = -1'}</M>, not{' '}
        <M>{'i^3 = -i'}</M>. The total so far is <M>{'i - 1 - 1 = -2 + i'}</M>. Now slide to <M>n = 4</M>.
      </>
    )
  } else {
    tone = 'good'
    notice = (
      <>
        From <M>n = 4</M> on, <M>{'n! = n\\times\\cdots\\times 4\\times 3\\times 2\\times 1'}</M> has <M>4</M> as a factor, so
        the exponent is a whole number of full turns and the term lands back on <M>1</M>, every time. The terms never cycle
        again: <M>{'n = 4'}</M> to <M>100</M> gives <M>97</M> ones, so the total is <M>{'(-2 + i) + 97 = 95 + i'}</M>.
      </>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 1.6]} y={[-1.4, 1.4]} equalScale height={250} xLabel="Re" yLabel="Im" labels={false}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} />
        {r > 0 && (
          <Plot.Parametric
            xy={t => [0.45 * Math.cos(t), 0.45 * Math.sin(t)]}
            domain={[0, (r * Math.PI) / 2]}
            color={COL[r]}
            weight={3}
          />
        )}
        <Vector tail={[0, 0]} tip={PT[r]} color={COL[r]} />
        {PT.map((p, j) => (
          <Point key={j} x={p[0]} y={p[1]} color={j === r ? COL[j] : C.guide} />
        ))}
        <Label at={PT[0]} attach="se" color={r === 0 ? COL[0] : C.guide}>1</Label>
        <Label at={PT[1]} attach="ne" color={r === 1 ? COL[1] : C.guide}>i</Label>
        <Label at={PT[2]} attach="nw" color={r === 2 ? COL[2] : C.guide}>−1</Label>
        <Label at={PT[3]} attach="se" color={r === 3 ? COL[3] : C.guide}>−i</Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={N_MAX} step={1} format={v => String(Math.round(v))} />
        <Toggle label={<>Wrong idea: use exponent <M>n</M> instead of <M>n!</M></>} checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`${wrong ? "" : `${expTex} = `}${big(e)} = 4\\times${big(q)} + ${r}`} />
          <Readout tex={`i^{${expTex}} = (i^4)^{${big(q)}}\\cdot i^{${r}} = ${TEX[r]}`} color={COL[r]} />
        </Readouts>
        <div>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-1">
            Terms {wrong ? <M>{'i^1, i^2, \\dots'}</M> : <M>{'i^{1!}, i^{2!}, \\dots'}</M>} up to <M>n</M>
          </p>
          <div className="flex flex-wrap gap-1">
            {terms.map((t, j) => (
              <span
                key={j}
                className="inline-flex min-w-[2.1rem] justify-center rounded-md border-2 px-1.5 py-0.5 text-[13px] font-semibold tabular-nums bg-white dark:bg-gray-900"
                style={{ borderColor: COL[t], color: COL[t] }}
              >
                {SHOW[t]}
              </span>
            ))}
          </div>
        </div>
        <Readouts>
          <Readout tex={`\\text{Sum of the first ${n} ${n === 1 ? 'term' : 'terms'}} = ${cx(re, im)}`} />
          {total100 !== null && <Readout tex={`\\text{Sum of all 100 terms} = ${total100}`} color={wrong ? C.bad : C.good} />}
        </Readouts>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
