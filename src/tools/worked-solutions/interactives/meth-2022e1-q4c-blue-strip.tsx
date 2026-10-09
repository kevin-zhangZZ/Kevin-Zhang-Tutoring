// 2022 Methods Exam 1 Q4c — an area model of the four draws with Pr(red) = 2/3. Across: the first
// card (blue strip 1/3 wide, red strip 2/3 wide). Down: the eight orders of the next three cards,
// each band as tall as its probability (RRR 8/27 … BBB 1/27, labelled outside the square so they
// read as band heights, not as the areas of the red cells). "Given the first card is blue" means
// keep only the blue strip, so the answer is the shaded fraction of that strip:
// (1/3 × 12/27) ÷ 1/3 = 4/9 — the same 4/9 of the height the matching bands fill in the red strip,
// which is why the condition is irrelevant. Buttons switch to the slips the examiners' report
// names: not dividing by 1/3 (4/27, the whole square), dividing by 1/2 (8/27, a region that takes
// in red-first draws), and taking only Pr(RRB) (4/27, one band of three).

import { useState } from 'react'
import { C, Buttons, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type Mode = 'right' | 'nodiv' | 'half' | 'rrb'

const BLUE = C.f
const RED = '#f43f5e'
// The next three cards, top to bottom, with each order's probability in 27ths: (2/3)^r (1/3)^(3−r).
const SEQS: [string, number][] = [
  ['RRR', 8], ['RRB', 4], ['RBR', 4], ['BRR', 4], ['RBB', 2], ['BRB', 2], ['BBR', 2], ['BBB', 1],
]
const TWO_RED = ['RRB', 'RBR', 'BRR']
const U = 12 // px per 1/27 of height
const H = 27 * U
const W = 270 // whole square width; the blue strip is W/3
const X0 = 46
const Y0 = 26
const LBL = 40 // label column right of the square: each band's height (not a cell's area)
const VW = X0 + W + LBL
const VH = Y0 + H + 22

const OUTLINE: Record<Mode, number> = { right: W / 3, nodiv: W, half: W / 2, rrb: W / 3 }

const READ: Record<Mode, { shaded: string; region: string; result: string }> = {
  right: {
    shaded: '\\text{shaded} = \\tfrac13\\times\\tfrac{12}{27} = \\tfrac{4}{27}',
    region: '\\text{outlined} = \\tfrac13',
    result: '\\tfrac{4}{27}\\div\\tfrac13 = \\tfrac49',
  },
  nodiv: {
    shaded: '\\text{shaded} = \\tfrac13\\times\\tfrac{12}{27} = \\tfrac{4}{27}',
    region: '\\text{outlined} = 1',
    result: '\\tfrac{4}{27}\\div 1 = \\tfrac{4}{27}',
  },
  half: {
    shaded: '\\text{shaded} = \\tfrac13\\times\\tfrac{12}{27} = \\tfrac{4}{27}',
    region: '\\text{outlined} = \\tfrac12',
    result: '\\tfrac{4}{27}\\div\\tfrac12 = \\tfrac{8}{27}',
  },
  rrb: {
    shaded: '\\text{shaded} = \\tfrac13\\times\\tfrac{4}{27} = \\tfrac{4}{81}',
    region: '\\text{outlined} = \\tfrac13',
    result: '\\tfrac{4}{81}\\div\\tfrac13 = \\tfrac{4}{27}',
  },
}

export default function BlueStrip() {
  const [mode, setMode] = useState<Mode>('right')
  const shadedSet = mode === 'rrb' ? ['RRB'] : TWO_RED
  const ok = mode === 'right'
  const outlineColor = mode === 'right' || mode === 'rrb' ? C.good : C.bad

  let y = Y0
  const bands = SEQS.map(([seq, n]) => {
    const top = y
    const h = n * U
    y += h
    const inEvent = TWO_RED.includes(seq)
    return (
      <g key={seq}>
        {/* blue strip: first card blue */}
        <rect
          x={X0}
          y={top}
          width={W / 3}
          height={h}
          fill={shadedSet.includes(seq) ? C.violet : BLUE}
          fillOpacity={shadedSet.includes(seq) ? 0.8 : 0.14}
          className="stroke-white dark:stroke-gray-900"
          strokeWidth={1}
        />
        {/* red strip: first card red — the same bands, faintly marked */}
        <rect
          x={X0 + W / 3}
          y={top}
          width={(2 * W) / 3}
          height={h}
          fill={inEvent ? C.violet : RED}
          fillOpacity={inEvent ? 0.2 : 0.1}
          className="stroke-white dark:stroke-gray-900"
          strokeWidth={1}
        />
        <text x={X0 - 6} y={top + h / 2 + 4} textAnchor="end" fontSize={11} className="fill-gray-600 dark:fill-gray-300">
          {seq}
        </text>
        <text x={X0 + W + 5} y={top + h / 2 + 3.5} textAnchor="start" fontSize={10} className="fill-gray-500 dark:fill-gray-400">
          {n}/27
        </text>
      </g>
    )
  })

  return (
    <div>
      <div className="flex flex-col items-center gap-1">
        <div className="text-[12px] text-gray-500 dark:text-gray-400 text-center max-w-[360px]">
          Across: the <b>first</b> card. Down: the <b>next three</b> cards, each band as tall as its
          probability (heights on the right). Area = probability.
        </div>
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-[360px]" role="img" aria-label="Area model of the first card and the next three cards">
          <text x={X0 + W / 6} y={Y0 - 8} textAnchor="middle" fontSize={11.5} fontWeight={600} fill={BLUE}>
            1st blue
          </text>
          <text x={X0 + (2 * W) / 3} y={Y0 - 8} textAnchor="middle" fontSize={11.5} fontWeight={600} fill={RED}>
            1st red
          </text>
          <text x={X0 - 6} y={Y0 - 8} textAnchor="end" fontSize={10.5} className="fill-gray-500 dark:fill-gray-400">
            next 3
          </text>
          <text x={X0 + W + 5} y={Y0 - 8} textAnchor="start" fontSize={10.5} className="fill-gray-500 dark:fill-gray-400">
            height
          </text>
          {bands}
          <rect x={X0} y={Y0} width={W} height={H} fill="none" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth={1} />
          <line x1={X0 + W / 3} y1={Y0} x2={X0 + W / 3} y2={Y0 + H} className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.5} />
          <text x={X0 + W / 6} y={Y0 + H + 15} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-300">
            width ⅓
          </text>
          <text x={X0 + (2 * W) / 3} y={Y0 + H + 15} textAnchor="middle" fontSize={11} className="fill-gray-600 dark:fill-gray-300">
            width ⅔
          </text>
          <rect
            x={X0 + 1.5}
            y={Y0 + 1.5}
            width={OUTLINE[mode] - 3}
            height={H - 3}
            fill="none"
            stroke={outlineColor}
            strokeWidth={3}
            strokeDasharray={mode === 'nodiv' || mode === 'half' ? '7 4' : undefined}
            rx={2}
          />
        </svg>
      </div>
      <Controls>
        <Buttons>
          <Toggle label="Divide by ⅓" checked={mode === 'right'} onChange={() => setMode('right')} />
          <Toggle label="Don't divide" checked={mode === 'nodiv'} onChange={() => setMode('nodiv')} />
          <Toggle label="Divide by ½" checked={mode === 'half'} onChange={() => setMode('half')} />
          <Toggle label="Shade RRB only" checked={mode === 'rrb'} onChange={() => setMode('rrb')} />
        </Buttons>
        <Readouts>
          <Readout color={C.violet} tex={READ[mode].shaded} />
          <Readout color={outlineColor} tex={READ[mode].region} />
          <Readout color={ok ? C.good : C.bad} tex={READ[mode].result} />
        </Readouts>
        {mode === 'right' && (
          <Notice tone="good">
            Given the first card is blue, only the outlined blue strip can happen, so the answer is the
            fraction of that strip that is shaded: <M>{'\\tfrac{4}{27}\\div\\tfrac13=\\tfrac49'}</M>. The
            shaded bands fill <M>{'\\tfrac{12}{27}=\\tfrac49'}</M> of the strip's height, just like the faint
            bands in the red strip, because the next three cards don't depend on the first — which is why
            plain <M>{'\\binom32\\left(\\tfrac23\\right)^2\\left(\\tfrac13\\right)'}</M> works. Now try the
            other buttons.
          </Notice>
        )}
        {mode === 'nodiv' && (
          <Notice tone="warn">
            Without dividing you get <M>{'\\tfrac{4}{27}'}</M>, the shaded area out of the whole square. That
            is <M>{'\\Pr(\\text{1st blue and two of next three red})'}</M>, not the probability given the
            first card is blue: the whole square still includes every draw that starts with a red card.
            Dividing by <M>{'\\Pr(\\text{1st blue})=\\tfrac13'}</M> keeps only the blue strip.
          </Notice>
        )}
        {mode === 'half' && (
          <Notice tone="warn">
            Dividing by <M>{'\\tfrac12'}</M> treats the outlined half of the square as "first card blue",
            but with this deck the blue strip is only <M>{'\\tfrac13'}</M> wide, so the outline takes in draws
            that start with a red card. <M>{'\\tfrac12'}</M> was <M>{'\\Pr(\\text{blue})'}</M> for the deck
            in part b, not this one.
          </Notice>
        )}
        {mode === 'rrb' && (
          <Notice tone="warn">
            Only one order is shaded. "Exactly two of the next three red" can happen as RRB, RBR or BRR,
            and all three bands are the same height <M>{'\\tfrac{4}{27}'}</M>, so{' '}
            <M>{'\\Pr(RRB)=\\tfrac{4}{27}'}</M> is only a third of the answer. The{' '}
            <M>{'\\binom32=3'}</M> in the binomial counts the three orders. ("Don't divide" also gives{' '}
            <M>{'\\tfrac{4}{27}'}</M>, but that is a different slip: all three orders, with the first card's{' '}
            <M>{'\\tfrac13'}</M> left in.)
          </Notice>
        )}
      </Controls>
    </div>
  )
}
