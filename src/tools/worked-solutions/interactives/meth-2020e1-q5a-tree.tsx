// 2020 Methods Exam 1 Q5a — "three or more" read off a probability tree. Four people, each
// either has the gene (upper branch, 3/5) or doesn't (lower branch, 2/5): 16 paths, each worth
// 3^k 2^(4−k)/625 where k is the number with the gene. Picking an event lights up its paths:
// exactly three is four paths of 54/625 (the one person without the gene can be any of the four —
// that is 4C3 = 4), all four is one path of 81/625, and "three or more" is all five, 297/625.
// The default view is "exactly 3" — the report's common error of finding Pr(X = 3) only — with
// the Notice pointing on to the missing path.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type Pick = 'three' | 'four' | 'atLeast3'

// Tree geometry in the SVG's own units (viewBox 340 wide). Leaves top to bottom, upper branch =
// has the gene; bit (3 − level) of the leaf index is 0 for "has it" and 1 for "doesn't".
const TOP = 30
const ROW = 18.5
const X0 = 30
const DX = 36
const leafY = (i: number) => TOP + i * ROW
const levelX = (l: number) => X0 + l * DX
/** y of the node at `level` whose leaves start at index j·2^(4 − level). */
const nodeY = (level: number, j: number) => {
  const span = 2 ** (4 - level)
  return (leafY(j * span) + leafY(j * span + span - 1)) / 2
}
const has = (leaf: number, person: number) => ((leaf >> (3 - person)) & 1) === 0
const count = (leaf: number) => [0, 1, 2, 3].filter(p => has(leaf, p)).length
/** Numerator over 625 = 5⁴: 3 for each person with the gene, 2 for each without. */
const weight = (leaf: number) => 3 ** count(leaf) * 2 ** (4 - count(leaf))
const LEAVES = Array.from({ length: 16 }, (_, i) => i)

/** A person in the running text, drawn exactly like the dots in the diagram (also used by the
 *  part b. widget). */
export function Dot({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 10 10" className="inline-block w-[0.8em] h-[0.8em] align-[-0.08em]" role="img" aria-label={on ? 'has the gene' : "doesn't have the gene"}>
      <circle cx={5} cy={5} r={3.9} fill={on ? C.f : 'none'} stroke={on ? C.f : C.guide} strokeWidth={1.4} />
    </svg>
  )
}

const inEvent = (pick: Pick, k: number) => (pick === 'three' ? k === 3 : pick === 'four' ? k === 4 : k >= 3)

export default function Tree() {
  const [pick, setPick] = useState<Pick>('three')
  const lit = LEAVES.filter(i => inEvent(pick, count(i)))
  const total = lit.reduce((s, i) => s + weight(i), 0)

  // Every branch, as [level, index at that level]; a branch is lit if any lit leaf lies below it.
  const branches: { l: number; j: number; on: boolean }[] = []
  for (let l = 1; l <= 4; l++) {
    for (let j = 0; j < 2 ** l; j++) {
      const span = 2 ** (4 - l)
      const on = lit.some(i => i >= j * span && i < (j + 1) * span)
      branches.push({ l, j, on })
    }
  }
  const seg = ({ l, j }: { l: number; j: number }) => ({
    x1: levelX(l - 1),
    y1: nodeY(l - 1, j >> 1),
    x2: levelX(l),
    y2: nodeY(l, j),
  })

  let notice
  if (pick === 'three') {
    notice = (
      <Notice>
        Each orange path has three people with the gene and one without, so it has probability{' '}
        <M>{'\\left(\\tfrac35\\right)^3\\left(\\tfrac25\\right) = \\tfrac{54}{625}'}</M>, whatever the order. The one person
        without the gene can be any of the four, so there are <M>{'\\binom43 = 4'}</M> such paths (choosing three to have it is
        the same as choosing one not to): <M>{'\\Pr(X=3) = 4 \\times \\tfrac{54}{625} = \\tfrac{216}{625}'}</M>. But that is{' '}
        <b>exactly</b> three, and the report lists finding <M>\Pr(X=3)</M> only as a common error. Press &ldquo;3 or more&rdquo;.
      </Notice>
    )
  } else if (pick === 'four') {
    notice = (
      <Notice>
        Only the top path has all four people with the gene:{' '}
        <M>{'\\Pr(X=4) = \\left(\\tfrac35\\right)^4 = \\tfrac{81}{625}'}</M>. In the formula,{' '}
        <M>{'\\binom44 = 1'}</M> (one path) and <M>{'\\left(\\tfrac25\\right)^0 = 1'}</M> (nobody without it), so only{' '}
        <M>{'\\left(\\tfrac35\\right)^4'}</M> is left.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        With only four people, &ldquo;three or more&rdquo; means 3 or 4: the five orange paths. Add them:{' '}
        <M>{'4 \\times 54 + 81 = 297'}</M> out of 625, so <M>{'\\Pr(X \\ge 3) = \\tfrac{297}{625} \\approx 0.475'}</M>. Every
        path is over <M>{'5^4 = 625'}</M> because each of its four branches has denominator 5, which is why the two terms add
        without any fuss.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-2">
        Each fork is one person: the <b>upper</b> branch means they have the gene (probability <M>{'\\tfrac35'}</M>), the{' '}
        <b>lower</b> branch means they don&apos;t (<M>{'\\tfrac25'}</M>). Each path ends with its four people (<Dot on /> has
        it, <Dot on={false} /> doesn&apos;t), how many of them have it, and the path&apos;s probability.
      </p>
      <div className="text-gray-700 dark:text-gray-300">
        <svg viewBox="0 0 340 322" className="w-full max-w-[420px] mx-auto block" role="img" aria-label="Probability tree for four people with 16 paths; the paths in the chosen event are highlighted in orange">
          {['1st', '2nd', '3rd', '4th'].map((t, p) => (
            <text key={t} x={(levelX(p) + levelX(p + 1)) / 2} y={13} fontSize={10.5} textAnchor="middle" fill="currentColor" opacity={0.7}>
              {t}
            </text>
          ))}
          <text x={242} y={13} fontSize={10.5} textAnchor="middle" fill="currentColor" opacity={0.7}>X</text>
          <text x={334} y={13} fontSize={10.5} textAnchor="end" fill="currentColor" opacity={0.7}>prob.</text>
          {branches.filter(b => !b.on).map(b => (
            <line key={`${b.l}-${b.j}`} {...seg(b)} stroke={C.guide} strokeWidth={1.2} strokeOpacity={0.8} />
          ))}
          {branches.filter(b => b.on).map(b => (
            <line key={`${b.l}-${b.j}`} {...seg(b)} stroke={C.g} strokeWidth={2.6} strokeLinecap="round" />
          ))}
          <circle cx={levelX(0)} cy={nodeY(0, 0)} r={3} fill="currentColor" />
          {[0, 1].map(j => (
            <text
              key={j}
              x={(levelX(0) + levelX(1)) / 2 - 7}
              y={(nodeY(0, 0) + nodeY(1, j)) / 2 + 4}
              fontSize={11}
              fontWeight={600}
              textAnchor="end"
              fill="currentColor"
            >
              {j === 0 ? '3/5' : '2/5'}
            </text>
          ))}
          {LEAVES.map(i => {
            const k = count(i)
            const on = inEvent(pick, k)
            const y = leafY(i)
            return (
              <g key={i}>
                {on && <rect x={levelX(4) + 4} y={y - ROW / 2 + 1} width={340 - levelX(4) - 4} height={ROW - 2} rx={4} fill={C.g} fillOpacity={0.14} />}
                {[0, 1, 2, 3].map(p => (
                  <circle
                    key={p}
                    cx={levelX(4) + 13 + p * 11}
                    cy={y}
                    r={3.6}
                    fill={has(i, p) ? C.f : 'none'}
                    stroke={has(i, p) ? C.f : C.guide}
                    strokeWidth={1.3}
                  />
                ))}
                <text x={242} y={y + 4} fontSize={11.5} textAnchor="middle" fill="currentColor" opacity={on ? 1 : 0.55} fontWeight={on ? 700 : 400}>
                  {k}
                </text>
                <text
                  x={334}
                  y={y + 4}
                  fontSize={11.5}
                  textAnchor="end"
                  fill={on ? C.g : 'currentColor'}
                  opacity={on ? 1 : 0.55}
                  fontWeight={on ? 700 : 400}
                >
                  {weight(i)}/625
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <Controls>
        <Buttons>
          <Toggle label="Exactly 3" checked={pick === 'three'} onChange={() => setPick('three')} />
          <Toggle label="All 4" checked={pick === 'four'} onChange={() => setPick('four')} />
          <Toggle label="3 or more" checked={pick === 'atLeast3'} onChange={() => setPick('atLeast3')} />
        </Buttons>
        <Readouts>
          {pick === 'three' && <Readout color={C.g} tex={'\\Pr(X=3) = 4 \\times \\tfrac{54}{625} = \\tfrac{216}{625} \\approx 0.346'} />}
          {pick === 'four' && <Readout color={C.g} tex={'\\Pr(X=4) = 1 \\times \\tfrac{81}{625} \\approx 0.130'} />}
          {pick === 'atLeast3' && <Readout color={C.g} tex={`\\Pr(X \\ge 3) = \\tfrac{216}{625} + \\tfrac{81}{625} = \\tfrac{${total}}{625} \\approx ${(total / 625).toFixed(3)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
