// 2019 Methods Exam 2 MCQ 17 — why, without replacement, every second-draw branch has n − 1
// underneath and one fewer of the colour just drawn on top. A live tree for n marbles (k red)
// highlights the two same-colour paths and adds them over the common denominator n(n − 1); the
// five options are evaluated at the same n and k, so the student sees only D agree every time.
// A toggle puts the first marble back, and then option A (the with-replacement answer) agrees
// instead. The Notice warns when the chosen numbers can't separate C from D (k = n − k or
// n − k = k + 1), a trap when testing algebraic options with numbers.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type Q = [bigint, bigint] // numerator, denominator

const big = (v: number) => BigInt(v)
const eq = (p: Q, q: Q) => p[0] * q[1] === q[0] * p[1]
const val = (p: Q) => Number(p[0]) / Number(p[1])
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const choose2 = (n: number) => (n * (n - 1)) / 2

function options(n: number, k: number): { letter: string; q: Q }[] {
  const g = n - k
  return [
    { letter: 'A', q: [big(k * k + g * g), big(n * n)] },
    { letter: 'B', q: [big(k * k + (g - 1) ** 2), big(n * n)] },
    { letter: 'C', q: [big(2 * k * (g - 1)), big(n * (n - 1))] },
    { letter: 'D', q: [big(k * (k - 1) + g * (g - 1)), big(n * (n - 1))] },
    { letter: 'E', q: [big(choose2(n)) * big(k * k) * big(g) ** big(n - 2), big(n) ** big(n)] },
  ]
}

const RED = '#ef4444'
const GREEN = '#16a34a'

/** A stacked fraction in SVG: numerator over a bar over denominator, centred on (x, y). */
function Frac({ x, y, num, den, bold = false, color = 'currentColor' }: { x: number; y: number; num: string; den: string; bold?: boolean; color?: string }) {
  const w = Math.max(num.length, den.length) * 6.6 + 4
  return (
    <g fill={color} fontSize={12} fontWeight={bold ? 700 : 400} textAnchor="middle">
      <text x={x} y={y - 3}>{num}</text>
      <line x1={x - w / 2} x2={x + w / 2} y1={y} y2={y} stroke={color} strokeWidth={1} />
      <text x={x} y={y + 12}>{den}</text>
    </g>
  )
}

export default function MarbleTree() {
  const [n, setN] = useState(6)
  const [k, setK] = useState(2)
  const [replace, setReplace] = useState(false)

  const g = n - k
  const d2 = replace ? n : n - 1
  // second-draw numerators: after red, after green
  const rr = replace ? k : k - 1
  const rg = g
  const gr = k
  const gg = replace ? g : g - 1

  const pRR = k * rr
  const pGG = g * gg
  const den = n * d2
  const same: Q = [big(pRR + pGG), big(den)]
  const opts = options(n, k)
  const matches = opts.filter(o => eq(o.q, same)).map(o => o.letter)
  const s = gcd(pRR + pGG, den)

  // tree geometry (each branch fraction sits clear of its line, on the outer side)
  const root: [number, number] = [16, 128]
  const l1R: [number, number] = [110, 70]
  const l1G: [number, number] = [110, 186]
  const leaves = [
    { name: 'RR', y: 34, from: l1R, num: rr, lab: [170, 35], top: `${k}×${rr}`, same: true, c2: RED },
    { name: 'RG', y: 106, from: l1R, num: rg, lab: [170, 107], top: `${k}×${rg}`, same: false, c2: GREEN },
    { name: 'GR', y: 150, from: l1G, num: gr, lab: [170, 151], top: `${g}×${gr}`, same: false, c2: RED },
    { name: 'GG', y: 222, from: l1G, num: gg, lab: [170, 223], top: `${g}×${gg}`, same: true, c2: GREEN },
  ]
  const LX = 232

  let notice
  if (replace) {
    notice = (
      <Notice tone="warn">
        With the first marble put back, the second draw is from the same <M>n</M> marbles, so every branch keeps{' '}
        <M>n</M> underneath: <M>{'\\frac{k^2 + (n-k)^2}{n^2}'}</M>, which is option A. But this question says the first
        marble is <b>not</b> replaced. Turn the toggle off.
      </Notice>
    )
  } else if (matches.length > 1) {
    notice = (
      <Notice tone="warn">
        Careful testing the options with these numbers: option{matches.length > 2 ? 's' : ''} {matches.filter(l => l !== 'D').join(', ')}{' '}
        {matches.length > 2 ? 'give' : 'gives'} the same value as D here,{' '}
        {matches.includes('C') ? 'because there are as many greens as reds, or exactly one more green.' : 'by coincidence.'}
        Numbers like <M>n = 6</M>, <M>k = 2</M> separate them.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        After the first draw there are <M>n - 1</M> marbles left, and the colour just drawn has one fewer: <M>k - 1</M> reds
        after a red, <M>n - k - 1</M> greens after a green. The two green-highlighted paths share the denominator{' '}
        <M>n(n-1)</M>, so their numerators just add. Change <M>n</M> and <M>k</M>: only D agrees every time.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 mb-2" aria-label={`${k} red and ${g} green marbles`}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="inline-block w-4 h-4 rounded-full" style={{ background: i < k ? RED : GREEN }} />
        ))}
        <span className="ml-2 text-[12.5px] text-gray-600 dark:text-gray-300">
          <M>{`n = ${n}`}</M> marbles, <M>{`k = ${k}`}</M> red, <M>{`n - k = ${g}`}</M> green
        </span>
      </div>
      <div className="text-gray-700 dark:text-gray-200">
        <svg viewBox="0 0 340 250" className="w-full max-w-[460px] mx-auto block" role="img" aria-label="Probability tree for two draws; the red-red and green-green paths are highlighted">
          <text x={68} y={12} fontSize={10.5} textAnchor="middle" fill="currentColor" opacity={0.7}>1st draw</text>
          <text x={176} y={12} fontSize={10.5} textAnchor="middle" fill="currentColor" opacity={0.7}>2nd draw</text>
          {/* first-draw branches */}
          {[l1R, l1G].map((to, i) => (
            <line key={i} x1={root[0]} y1={root[1]} x2={to[0] - 10} y2={to[1]} stroke={C.guide} strokeWidth={1.4} />
          ))}
          <Frac x={44} y={92} num={String(k)} den={String(n)} color={RED} bold />
          <Frac x={44} y={166} num={String(g)} den={String(n)} color={GREEN} bold />
          <circle cx={l1R[0]} cy={l1R[1]} r={7} fill={RED} />
          <circle cx={l1G[0]} cy={l1G[1]} r={7} fill={GREEN} />
          {/* second-draw branches */}
          {leaves.map(L => (
            <g key={L.name}>
              <line
                x1={L.from[0] + 8}
                y1={L.from[1]}
                x2={LX - 10}
                y2={L.y}
                stroke={L.same ? C.good : C.guide}
                strokeWidth={L.same ? 2.6 : 1.4}
                strokeLinecap="round"
              />
              <Frac x={L.lab[0]} y={L.lab[1]} num={String(L.num)} den={String(d2)} color={L.c2} bold />
              <circle cx={LX} cy={L.y} r={6} fill={L.c2} />
              <text x={LX + 12} y={L.y + 4} fontSize={11.5} fill="currentColor" fontWeight={L.same ? 700 : 400} opacity={L.same ? 1 : 0.6}>
                {L.name}
              </text>
              <Frac x={LX + 70} y={L.y} num={L.top} den={`${n}×${d2}`} bold={L.same} color={L.same ? C.good : 'currentColor'} />
            </g>
          ))}
        </svg>
      </div>
      <Controls>
        <Slider label="n" value={n} onChange={v => { setN(v); setK(kk => Math.min(kk, v - 1)) }} min={3} max={10} step={1} format={v => String(v)} />
        <Slider label="k" value={k} onChange={v => setK(Math.min(v, n - 1))} min={1} max={n - 1} step={1} format={v => String(v)} />
        <Buttons>
          <Toggle label="Put the first marble back" checked={replace} onChange={setReplace} />
        </Buttons>
        <Readouts>
          <Readout
            color={C.good}
            tex={`\\Pr(\\text{same}) = \\dfrac{${pRR}}{${den}} + \\dfrac{${pGG}}{${den}} = \\dfrac{${pRR + pGG}}{${den}}${s > 1 ? ` = \\dfrac{${(pRR + pGG) / s}}{${den / s}}` : ''}`}
          />
        </Readouts>
        <div className="flex flex-wrap gap-1.5 text-[12.5px]">
          <span className="self-center text-gray-600 dark:text-gray-300">Options at these values:</span>
          {opts.map(o => {
            const hit = matches.includes(o.letter)
            return (
              <span
                key={o.letter}
                className={`rounded-md border px-2 py-0.5 ${hit ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100' : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300'}`}
              >
                <b>{o.letter}</b> <Katex tex={`${val(o.q).toFixed(3)}`} />{hit ? ' ✓' : ''}
              </span>
            )
          })}
        </div>
        {notice}
      </Controls>
    </div>
  )
}
