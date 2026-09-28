// 2017 Methods Exam 1 Q8b — the probability table drawn to scale. The square is the sample space
// (area 1); column A has width Pr(A) = 4p, and the top slice of each column is B. Pr(B | A) = 1/4
// means B is the top quarter of column A, so column A is four blocks of area p. Pr(A | B) = 1/5
// means the overlap is one of B's five blocks, so B has four more p-blocks in column A′. A ∪ B is
// 3 + 1 + 4 = 8 blocks, and "neither" is what is left: 1 − 8p. The slider changes p (0.02 to 1/8,
// where the blocks fill the square); the count of blocks never changes. The toggle redraws B the
// way the report's independence assumption does (a strip of height 5p across both columns): the
// overlap becomes 20p² instead of p, B takes 5p of column A instead of a quarter, and
// (1 − 4p)(1 − 5p) only agrees with 1 − 8p at p = 1/20.

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

const LM = 62
const TM = 40
const W = 320
const H = 250
const VW = LM + W + 36
const VH = TM + H + 32

const NAMED: [number, string][] = [
  [1 / 40, '1/40'],
  [1 / 20, '1/20'],
  [3 / 40, '3/40'],
  [1 / 10, '1/10'],
  [1 / 8, '1/8'],
]
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9
const trim = (v: number, dp = 4) => String(parseFloat(v.toFixed(dp)))
const fmtP = (v: number) => NAMED.find(([x]) => near(v, x))?.[1] ?? trim(v)

export default function Blocks() {
  const [p, setP] = useState(0.075)
  const [indep, setIndep] = useState(false)

  const a = 4 * p // width of column A
  const hA = indep ? 5 * p : 0.25 // B's share of column A
  const hA2 = indep ? 5 * p : (4 * p) / (1 - 4 * p) // B's share of column A′
  const xA1 = LM + a * W
  const xR = LM + W
  const yBA = TM + hA * H
  const yBA2 = TM + hA2 * H
  const yBot = TM + H
  const colW = a * W
  const col2W = xR - xA1
  const blockW = col2W / 4
  const neither = indep ? (1 - 4 * p) * (1 - 5 * p) : 1 - 8 * p
  const atIndep = near(p, 1 / 20)
  const atEighth = near(p, 1 / 8)
  const wrong = indep && !atIndep
  const ansColor = wrong ? C.bad : C.good
  const ansInside = yBot - yBA2 >= 46
  const ansX = xA1 + col2W / 2

  // B's outline: the top slice of both columns.
  const bOutline = [
    [LM, TM],
    [xR, TM],
    [xR, yBA2],
    [xA1, yBA2],
    [xA1, yBA],
    [LM, yBA],
  ]
    .map(pt => pt.join(','))
    .join(' ')

  let notice
  if (indep && atIndep) {
    notice = (
      <Notice tone="good">
        <b>At <M>p = \tfrac1{'{20}'}</M> the two pictures agree.</b> Here <M>5p = \tfrac14</M>, so B really does take the
        same share of both columns, and A and B happen to be independent. It is the only such <M>p</M>: slide away and
        the overlap is no longer <M>p</M>. Part (c)&apos;s condition forces <M>{'p \\le \\tfrac1{40}'}</M>, so there they
        are never independent.
      </Notice>
    )
  } else if (indep) {
    notice = (
      <Notice tone="warn">
        <b>Independence draws B as a strip of the same height, <M>5p</M>, across both columns.</b> Then B takes{' '}
        <M>5p</M> of column A, not the quarter the question gives, and the overlap is{' '}
        <M>{'4p \\times 5p = 20p^2'}</M> instead of <M>p</M>. The product <M>(1-4p)(1-5p)</M> is the area left over in
        this wrong picture. Slide <M>p</M> to <M>\tfrac1{'{20}'}</M> to find the one value where it happens to be right.
      </Notice>
    )
  } else if (atEighth) {
    notice = (
      <Notice tone="good">
        <b>At <M>p = \tfrac18</M> the eight blocks fill the whole square</b>: <M>8p = 1</M>, so{' '}
        <M>{"\\Pr(A'\\cap B') = 0"}</M>. A larger <M>p</M> would make <M>1 - 8p</M> negative, which is why the slider
        stops here.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        B is the top quarter of column A (that is <M>{'\\Pr(B\\mid A) = \\tfrac14'}</M>), so column A is{' '}
        <b>4 blocks</b> of area <M>p</M>. The overlap is 1 of B&apos;s 5 blocks (that is{' '}
        <M>{'\\Pr(A\\mid B) = \\tfrac15'}</M>), so B has <b>4 more blocks</b> in column A′. That makes{' '}
        <M>A \cup B</M> exactly <M>3 + 1 + 4 = 8</M> blocks, and <M>1 - 8p</M> is left for &ldquo;neither&rdquo;. Drag{' '}
        <M>p</M>: the blocks resize but the count never changes. Then turn on &ldquo;Assume independent&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-[460px] mx-auto block" role="img" aria-label="Sample space drawn as a unit square split into the four cells of the probability table">
          {/* The four cells */}
          <rect x={LM} y={TM} width={colW} height={yBA - TM} fill={C.violet} fillOpacity={0.5} />
          <rect x={LM} y={yBA} width={colW} height={yBot - yBA} fill={C.f} fillOpacity={0.26} />
          <rect x={xA1} y={TM} width={col2W} height={yBA2 - TM} fill={C.g} fillOpacity={0.3} />
          <rect x={xA1} y={yBA2} width={col2W} height={Math.max(0, yBot - yBA2)} fill={ansColor} fillOpacity={0.12} />

          {/* Block dividers: every piece of A ∪ B is a whole number of p-blocks */}
          {!indep &&
            [2, 3].map(k => (
              <line key={`a${k}`} x1={LM} x2={xA1} y1={TM + (k * H) / 4} y2={TM + (k * H) / 4} stroke="currentColor" strokeOpacity={0.45} strokeDasharray="4 3" />
            ))}
          {!indep &&
            [1, 2, 3].map(k => (
              <line key={`b${k}`} x1={xA1 + k * blockW} x2={xA1 + k * blockW} y1={TM} y2={yBA2} stroke="currentColor" strokeOpacity={0.45} strokeDasharray="4 3" />
            ))}
          {!indep &&
            colW >= 14 &&
            [0, 1, 2, 3].map(k => (
              <text key={`pa${k}`} x={LM + colW / 2} y={TM + ((k + 0.5) * H) / 4 + 4} fontSize={12} fontWeight={k === 0 ? 800 : 600} textAnchor="middle" fill="currentColor" fontStyle="italic">
                p
              </text>
            ))}
          {!indep &&
            yBA2 - TM >= 15 &&
            [0, 1, 2, 3].map(k => (
              <text key={`pb${k}`} x={xA1 + (k + 0.5) * blockW} y={(TM + yBA2) / 2 + 4} fontSize={12} fontWeight={600} textAnchor="middle" fill="currentColor" fontStyle="italic">
                p
              </text>
            ))}
          {indep && colW >= 34 && yBA - TM >= 16 && (
            <text x={LM + colW / 2} y={(TM + yBA) / 2 + 4} fontSize={12} fontWeight={800} textAnchor="middle" fill={atIndep ? 'currentColor' : C.bad}>
              20p²
            </text>
          )}

          {/* Outlines: the sample space, column A, and B */}
          <rect x={LM} y={TM} width={W} height={H} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} />
          <rect x={LM} y={TM} width={colW} height={H} fill="none" stroke={C.f} strokeWidth={2.6} />
          <polygon points={bOutline} fill="none" stroke={C.g} strokeWidth={2.6} strokeDasharray="7 4" strokeLinejoin="round" />

          {/* Column headers */}
          <text x={LM + colW / 2} y={TM - 10} fontSize={14} fontWeight={800} textAnchor="middle" fill={C.f}>
            {colW >= 62 ? 'A: 4p' : 'A'}
          </text>
          <text x={xA1 + col2W / 2} y={TM - 10} fontSize={14} fontWeight={700} textAnchor="middle" fill="currentColor">
            A′: 1 − 4p
          </text>

          {/* B and B′ on the right edge */}
          <text x={xR + 7} y={yBA2 - TM >= 14 ? (TM + yBA2) / 2 + 5 : TM + 10} fontSize={14} fontWeight={800} fill={C.g}>
            B
          </text>
          {yBot - yBA2 >= 16 && (
            <text x={xR + 7} y={(yBA2 + yBot) / 2 + 5} fontSize={14} fontWeight={700} fill="currentColor" opacity={0.75}>
              B′
            </text>
          )}

          {/* B's share of column A: Pr(B | A) */}
          <path d={`M ${LM - 3} ${TM} H ${LM - 9} V ${yBA} H ${LM - 3}`} fill="none" stroke={wrong ? C.bad : C.violet} strokeWidth={2} />
          <text x={LM - 13} y={(TM + yBA) / 2 - 2} fontSize={15} fontWeight={800} textAnchor="end" fill={wrong ? C.bad : C.violet}>
            {indep ? '5p' : '¼'}
          </text>
          <text x={LM - 13} y={(TM + yBA) / 2 + 13} fontSize={11} fontWeight={600} textAnchor="end" fill={wrong ? C.bad : 'currentColor'}>
            {wrong ? '≠ ¼' : 'of A'}
          </text>

          {/* The answer cell */}
          {ansInside ? (
            <>
              <text x={ansX} y={(yBA2 + yBot) / 2 - 4} fontSize={12} fontWeight={600} textAnchor="middle" fill="currentColor" opacity={0.8}>
                A′ ∩ B′
              </text>
              <text x={ansX} y={(yBA2 + yBot) / 2 + 14} fontSize={14} fontWeight={800} textAnchor="middle" fill={ansColor}>
                {indep ? `(1 − 4p)(1 − 5p) = ${trim(neither)}` : `1 − 8p = ${trim(neither)}`}
              </text>
            </>
          ) : (
            <text x={ansX} y={yBot + 20} fontSize={13} fontWeight={800} textAnchor="middle" fill={ansColor}>
              {`A′ ∩ B′: ${indep ? '(1 − 4p)(1 − 5p)' : '1 − 8p'} = ${trim(neither)}`}
            </text>
          )}
        </svg>
      </div>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0.02} max={0.125} step={0.0025} format={fmtP} />
        <Toggle label="Assume independent" checked={indep} onChange={setIndep} />
        <Readouts>
          {indep ? (
            <>
              <Readout color={wrong ? C.bad : C.good} tex={`\\Pr(A\\cap B)=20p^2=${trim(20 * p * p)}${wrong ? '\\ne p' : '= p'}`} />
              <Readout color={wrong ? C.bad : C.good} tex={`\\Pr(B\\mid A)=5p=${trim(5 * p)}${wrong ? '\\ne\\tfrac14' : ''}`} />
              <Readout color={C.good} tex={`\\text{true: } 1-8p=${trim(1 - 8 * p)}`} />
            </>
          ) : (
            <>
              <Readout color={C.violet} tex="\Pr(B\mid A)=\frac{p}{4p}=\frac14" />
              <Readout color={C.g} tex="\Pr(A\mid B)=\frac{p}{5p}=\frac15" />
              <Readout tex={`\\Pr(A\\cup B)=8p=${trim(8 * p)}`} />
              <Readout color={C.good} tex={`\\Pr(A'\\cap B')=${trim(1 - 8 * p)}`} />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
