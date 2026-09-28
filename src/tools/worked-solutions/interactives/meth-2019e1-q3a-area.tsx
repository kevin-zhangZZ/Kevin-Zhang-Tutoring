// 2019 Methods Exam 1 Q3a — Pr(H) as an area. The rectangle holds every way Jo's experiment can
// go: across, which coin she picks (each column's width is the chance of picking that coin, 1/3
// each); up, whether it lands heads (the shaded height is Pr(H | that coin)). Each shaded block is
// width × height, which is one head branch of the tree, so Pr(H) is the total shaded area:
// 1/6 + 1/6 + 1/9 = 4/9. The dashed line is that area spread evenly across the full width, i.e.
// the weighted average of the coins' head chances. One toggle groups the two fair columns into the
// tree's 2/3 branch; a wrong-idea toggle treats "biased or unbiased" as 50–50 (5/12). The slider
// changes the biased coin's head chance p: Pr(H) = 1/3 + p/3, always between p and 1/2.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

// Exact fractions, so every label agrees with the working.
type Q = [number, number]
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const q = (n: number, d: number): Q => {
  const g = gcd(n, d) || 1
  return [n / g, d / g]
}
const mul = (a: Q, b: Q) => q(a[0] * b[0], a[1] * b[1])
const add = (a: Q, b: Q) => q(a[0] * b[1] + b[0] * a[1], a[1] * b[1])
const val = (a: Q) => a[0] / a[1]
const tex = (a: Q) => (a[1] === 1 ? `${a[0]}` : `\\tfrac{${a[0]}}{${a[1]}}`)
const txt = (a: Q) => (a[1] === 1 ? `${a[0]}` : `${a[0]}/${a[1]}`)

const HALF: Q = [1, 2]
const LM = 50 // left margin: height ticks
const RM = 60 // right margin: the Pr(H) level label
const TM = 46 // top margin: column names and widths
const BM = 10
const W = 320
const H = 220

type Col = { name: string; w: Q; h: Q; color: string }

export default function CoinArea() {
  const [k, setK] = useState(4) // Pr(H | biased) = k/12; the question has k = 4 (1/3)
  const [grouped, setGrouped] = useState(false)
  const [wrong, setWrong] = useState(false)

  const pB = q(k, 12)
  const cols: Col[] = wrong
    ? [
        { name: 'Fair', w: [1, 2], h: HALF, color: C.f },
        { name: 'Biased', w: [1, 2], h: pB, color: C.g },
      ]
    : grouped
      ? [
          { name: 'Fair coins', w: [2, 3], h: HALF, color: C.f },
          { name: 'Biased', w: [1, 3], h: pB, color: C.g },
        ]
      : [
          { name: 'Fair', w: [1, 3], h: HALF, color: C.f },
          { name: 'Fair', w: [1, 3], h: HALF, color: C.f },
          { name: 'Biased', w: [1, 3], h: pB, color: C.g },
        ]
  const areas = cols.map(c => mul(c.w, c.h))
  const total = areas.reduce((s, a) => add(s, a), [0, 1] as Q)
  const level = TM + H * (1 - val(total))
  const lineColor = wrong ? C.bad : C.violet

  let x = LM
  const blocks = cols.map((c, i) => {
    const bx = x
    const bw = val(c.w) * W
    x += bw
    const hp = val(c.h) * H
    const top = TM + H - hp
    return (
      <g key={i}>
        <rect x={bx} y={TM} width={bw} height={H - hp} className="fill-gray-100 dark:fill-gray-800" />
        <rect x={bx} y={top} width={bw} height={hp} fill={c.color} fillOpacity={0.42} />
        <rect x={bx} y={TM} width={bw} height={H} fill="none" stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.2} />
        {H - hp >= 22 && (
          <text x={bx + 7} y={TM + 15} fontSize={11.5} fontWeight={700} fill="currentColor" opacity={0.55}>
            T
          </text>
        )}
        {hp >= 40 && (
          <text x={bx + 7} y={TM + H - 7} fontSize={11.5} fontWeight={700} fill="currentColor" opacity={0.7}>
            H
          </text>
        )}
        {hp >= 18 && (
          <text
            x={bx + bw / 2}
            y={top + hp / 2 + 5}
            fontSize={15}
            fontWeight={800}
            textAnchor="middle"
            fill="currentColor"
            className="stroke-white dark:stroke-gray-900"
            strokeWidth={4}
            paintOrder="stroke"
          >
            {txt(areas[i])}
          </text>
        )}
        <text x={bx + bw / 2} y={TM - 24} fontSize={13} fontWeight={700} textAnchor="middle" fill={c.color}>
          {c.name}
        </text>
        <text
          x={bx + bw / 2}
          y={TM - 8}
          fontSize={11.5}
          fontWeight={600}
          textAnchor="middle"
          fill={wrong ? C.bad : 'currentColor'}
          opacity={wrong ? 1 : 0.75}
        >
          {`width ${txt(c.w)}`}
        </text>
      </g>
    )
  })

  // Height ticks on the left: 1, a fair coin's 1/2, and the biased coin's p.
  const ticks: Q[] = [[1, 1], HALF]
  if (k !== 6 && k !== 0 && k !== 12) ticks.push(pB)
  const hTick = (t: Q) => TM + H * (1 - val(t))

  const fairTex = (c: Col, i: number) => `${tex(c.w)}\\times${tex(c.h)} = ${tex(areas[i])}`
  const fairIdx = 0
  const biasIdx = cols.length - 1
  const sumTex = `\\Pr(H) = ${areas.map(tex).join(' + ')} = ${tex(total)}`

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        &ldquo;Biased or unbiased: two kinds, so <M>{'\\tfrac12'}</M> each&rdquo; makes the two columns equally wide, and the
        shaded area comes to <M>{`${areas.map(tex).join(' + ')} = ${tex(total)}`}</M>. But Jo picks a <b>coin</b>, not a kind of
        coin: two of her three coins are fair, so the fair column must be twice as wide as the biased one. The widths are the
        chances of picking, <M>{'\\tfrac23'}</M> and <M>{'\\tfrac13'}</M>, so they have to count coins.
      </Notice>
    )
  } else if (k !== 4) {
    notice = (
      <Notice>
        With the biased coin at <M>{`\\Pr(H\\mid B) = ${tex(pB)}`}</M>, the shaded area is{' '}
        <M>{`\\tfrac13 + \\tfrac13\\times${tex(pB)} = ${tex(total)}`}</M>. The level line always sits between the biased
        coin&apos;s height and a fair coin&apos;s <M>{'\\tfrac12'}</M>: a mixture of the coins can&apos;t beat its best coin
        or fall below its worst. At <M>{'\\tfrac12'}</M> all three coins are fair and <M>{'\\Pr(H) = \\tfrac12'}</M>; drag back
        to <M>{'\\tfrac13'}</M> for this question.
      </Notice>
    )
  } else if (grouped) {
    notice = (
      <Notice tone="good">
        The two fair columns together are <M>{'\\tfrac23'}</M> wide and <M>{'\\tfrac12'}</M> high:{' '}
        <M>{'\\tfrac23\\times\\tfrac12 = \\tfrac13'}</M>, the same as <M>{'\\tfrac16 + \\tfrac16'}</M>. That is why the working
        can use <M>{'\\Pr(U) = \\tfrac23'}</M>: two of the three equally likely coins are fair. The total is unchanged,{' '}
        <M>{'\\tfrac13 + \\tfrac19 = \\tfrac49'}</M>. Now try the wrong idea.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>The rectangle is every way the experiment can go.</b> Across: which coin Jo picks, each <M>{'\\tfrac13'}</M> wide.
        Up: the shaded height is the chance that coin lands heads. Each shaded block is width <M>\times</M> height, one head
        branch of the tree, so <M>{'\\Pr(H)'}</M> is the total shaded area, <M>{'\\tfrac16 + \\tfrac16 + \\tfrac19 = \\tfrac49'}</M>.
        The dashed line is that area spread evenly: it must land between <M>{'\\tfrac13'}</M> and <M>{'\\tfrac12'}</M>. Try
        grouping the fair coins.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox={`0 0 ${LM + W + RM} ${TM + H + BM}`}
          className="w-full max-w-[460px] mx-auto block"
          role="img"
          aria-label={`A rectangle split into columns, one per coin, with widths equal to the chance of picking each coin; the shaded part of each column is the chance of a head, and the total shaded area is ${txt(total)}`}
        >
          {blocks}
          {grouped && !wrong && (
            <line
              x1={LM + W / 3}
              y1={TM}
              x2={LM + W / 3}
              y2={TM + H}
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeDasharray="3 4"
            />
          )}
          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={LM - 5} y1={hTick(t)} x2={LM} y2={hTick(t)} stroke="currentColor" strokeOpacity={0.6} />
              <text x={LM - 8} y={hTick(t) + 4} fontSize={11.5} fontWeight={600} textAnchor="end" fill="currentColor" opacity={0.8}>
                {txt(t)}
              </text>
            </g>
          ))}
          <text
            x={13}
            y={TM + H / 2}
            fontSize={11.5}
            fontWeight={600}
            textAnchor="middle"
            fill="currentColor"
            opacity={0.7}
            transform={`rotate(-90 13 ${TM + H / 2})`}
          >
            Pr(H | coin)
          </text>
          <line x1={LM} y1={level} x2={LM + W + 4} y2={level} stroke={lineColor} strokeWidth={2.2} strokeDasharray="7 5" />
          <text x={LM + W + 8} y={level - 4} fontSize={11.5} fontWeight={700} fill={lineColor}>
            Pr(H)
          </text>
          <text x={LM + W + 8} y={level + 12} fontSize={13.5} fontWeight={800} fill={lineColor}>
            {txt(total)}
          </text>
        </svg>
      </div>
      <Controls>
        <Readouts>
          <Readout tex={fairTex(cols[fairIdx], fairIdx) + (cols.length === 3 ? '\\text{ each}' : '')} color={C.f} />
          <Readout tex={fairTex(cols[biasIdx], biasIdx)} color={C.g} />
          <Readout tex={sumTex} color={lineColor} />
        </Readouts>
        <Slider label="\Pr(H\mid B)" value={k} onChange={setK} min={0} max={12} step={1} format={v => txt(q(v, 12))} />
        <Buttons>
          <Toggle label="Group the two fair coins" checked={grouped} onChange={setGrouped} />
          <Toggle label={<>Wrong idea: &ldquo;biased or unbiased&rdquo; is 50&ndash;50</>} checked={wrong} onChange={setWrong} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
