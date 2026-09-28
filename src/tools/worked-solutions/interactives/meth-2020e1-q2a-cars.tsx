// 2020 Methods Exam 1 Q2a — why "an air filter change without an oil change" is 3/20 − 1/20.
// Every probability in the question is out of 20, so picture 20 cars at a service: 17 need oil
// (circle O), 3 need an air filter (the orange tags, circle F), and the 1 car that needs both sits
// in the overlap. Four steps build the Venn diagram and the two-way table together, in counts; the
// air-filter-only region holds the 3 tagged cars minus the 1 in the overlap, so
// Pr(F ∩ O′) = 2/20 = 1/10. A toggle tries the report's most common wrong answer,
// Pr(F) × Pr(O′) = 3/20 × 3/20 = 9/400 (0.45 of a car), and shows why it fails: multiplying
// assumes independence, which would put a filter on only 3/20 of the 3 no-oil cars, yet 2 of
// those 3 carry one.
//
// Plain SVG (a Venn diagram has no axes, so no mafs Plane), in a 340 × 196 viewBox that scales to
// the column; the cars are placed by hand inside their regions (checked: every car in O is within
// 84 of O's centre, every car in F within 50 of F's centre, the others outside).

import { useId, useState } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

type Kind = 'oil' | 'both' | 'filter' | 'neither'

const O = { cx: 128, cy: 104, r: 84 }
const F = { cx: 236, cy: 104, r: 50 }

const CARS: { x: number; y: number; kind: Kind }[] = [
  // 16 need oil only: a 4 × 4 block inside O, clear of the overlap.
  ...[81, 107, 133, 159].flatMap(x => [68, 92, 116, 140].map(y => ({ x, y, kind: 'oil' as Kind }))),
  { x: 199, y: 104, kind: 'both' },
  { x: 240, y: 88, kind: 'filter' },
  { x: 256, y: 120, kind: 'filter' },
  { x: 302, y: 62, kind: 'neither' },
]

const STEPS = 4

function Car({ x, y, oil, tag, glow }: { x: number; y: number; oil: boolean; tag: boolean; glow: boolean }) {
  const body = oil ? { fill: C.f } : undefined
  const grey = oil ? undefined : 'fill-gray-300 dark:fill-gray-600'
  return (
    <g>
      {glow && <circle cx={x} cy={y} r={13} fill={C.g} fillOpacity={0.3} />}
      <rect x={x - 4.5} y={y - 6} width={9} height={5} rx={1.8} className={grey} style={body} opacity={0.7} />
      <rect x={x - 8} y={y - 2} width={16} height={6} rx={2} className={grey} style={body} />
      <circle cx={x - 4.5} cy={y + 4.5} r={2} className="fill-gray-700 dark:fill-gray-300" />
      <circle cx={x + 4.5} cy={y + 4.5} r={2} className="fill-gray-700 dark:fill-gray-300" />
      {tag && <circle cx={x + 8} cy={y - 7} r={3.2} fill={C.g} className="stroke-white dark:stroke-gray-900" strokeWidth={1.2} />}
    </g>
  )
}

// The two-way table in counts, filled in as the steps go. [row][col]: rows O, O′, total; columns
// F, F′, total.
const COUNTS = [
  [1, 16, 17],
  [2, 1, 3],
  [3, 17, 20],
]
/** The step at which each cell first appears. */
const SHOWN_AT = [
  [1, 3, 0],
  [2, 3, 0],
  [1, 3, 0],
]

function CountTable({ step, wrong }: { step: number; wrong: boolean }) {
  const rowHead = ['O', "O'", '\\text{total}']
  const colHead = ['F', "F'", '\\text{total}']
  return (
    <table className="mx-auto border-collapse text-[12.5px] text-gray-700 dark:text-gray-200">
      <thead>
        <tr>
          <th className="px-2 py-1" />
          {colHead.map(h => (
            <th key={h} className="px-3 py-1 font-normal">
              <Katex tex={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {COUNTS.map((row, i) => (
          <tr key={i} className={wrong && i === 1 ? 'bg-red-50 dark:bg-red-950/30' : ''}>
            <td className="px-2 py-1 text-right">
              <Katex tex={rowHead[i]} />
            </td>
            {row.map((v, j) => {
              const hot = i === 1 && j === 0 && step >= 2
              const show = step >= SHOWN_AT[i][j]
              return (
                <td
                  key={j}
                  className={`w-12 px-3 py-1 text-center border border-gray-300 dark:border-gray-700 tabular-nums ${
                    hot ? 'bg-orange-100 dark:bg-orange-900/50 font-bold text-orange-800 dark:text-orange-200' : ''
                  } ${i === 2 || j === 2 ? 'text-gray-500 dark:text-gray-400' : ''}`}
                >
                  {show ? v : ''}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Cars() {
  const steps = useSteps(STEPS)
  const [wrong, setWrong] = useState(false)
  const id = useId().replace(/:/g, '')
  const s = steps.step

  const outsideO = `${id}-out`

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <M>{"\\tfrac{3}{20}\\times\\tfrac{3}{20}=\\tfrac{9}{400}"}</M> is <b>0.45 of a car</b> out of 20, but you can count{' '}
        <b>2 whole cars</b> that need a filter and no oil. Multiplying assumes the events are independent: that the air-filter
        cars are spread evenly, so only <M>{'\\tfrac{3}{20}'}</M> of the 3 no-oil cars (shaded red) would need a filter. In fact{' '}
        <b>2 of those 3</b> do. Needing no oil makes a filter far more likely, so the events are linked, and multiplying gives
        the report&apos;s most common wrong answer. Unless a question says the events are independent, don&apos;t multiply:
        subtract.
      </Notice>
    )
  } else if (s === 0) {
    notice = (
      <Notice>
        Every probability is out of 20, so picture <b>20 cars</b> at a service. <b>17 need an oil change</b>: the blue cars
        inside circle <M>O</M>. That 17 is <i>every</i> car needing oil, including any that also need an air filter. It is a
        total, not &ldquo;oil only&rdquo;. So 3 cars need no oil (row <M>O'</M> of the table). Press Next.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b>3 cars need an air filter</b> (the orange tags, circle <M>F</M>), and <b>1 needs both</b>, so that car sits in the
        overlap. It is one of the 17 <i>and</i> one of the 3. That is the key: the 3 air-filter cars <b>include</b> the one
        that also needs oil.
      </Notice>
    )
  } else if (s === 2) {
    notice = (
      <Notice tone="good">
        &ldquo;An air filter <b>without</b> an oil change&rdquo; is the part of <M>F</M> outside <M>O</M>. Take the 3 tagged
        cars and remove the 1 that also needs oil: <b>3 − 1 = 2 cars</b>. So{' '}
        <M>{"\\Pr(F\\cap O') = \\tfrac{3}{20}-\\tfrac{1}{20} = \\tfrac{2}{20} = \\tfrac{1}{10}"}</M>, the working&apos;s{' '}
        <M>{'\\Pr(F)-\\Pr(F\\cap O)'}</M>. In the table it is the <M>F</M> column: 1 + ? = 3.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The rest of the table follows by subtraction: <b>16</b> need oil only (17 − 1), <b>1</b> needs neither (3 − 2), and{' '}
        <b>17</b> need no filter (20 − 3). Each region of the Venn diagram is one cell of the table: four regions, four cells,
        adding to 20. Now try &ldquo;What if I multiply?&rdquo;
      </Notice>
    )
  }

  return (
    <div>
      <svg viewBox="0 0 340 196" className="w-full max-w-[460px] mx-auto block" role="img" aria-label="Venn diagram of 20 cars: circle O holds the 17 that need an oil change, circle F the 3 that need an air filter, overlapping in 1 car; 2 cars need an air filter only and 1 needs neither">
        <defs>
          <mask id={outsideO}>
            <rect x={0} y={0} width={340} height={196} fill="white" />
            <circle cx={O.cx} cy={O.cy} r={O.r} fill="black" />
          </mask>
        </defs>
        <rect x={4} y={4} width={332} height={188} rx={10} className="fill-white stroke-gray-400 dark:fill-gray-900 dark:stroke-gray-500" strokeWidth={1.2} />
        {wrong && <rect x={4} y={4} width={332} height={188} rx={10} fill={C.bad} fillOpacity={0.12} mask={`url(#${outsideO})`} />}
        <circle cx={O.cx} cy={O.cy} r={O.r} fill={C.f} fillOpacity={0.08} stroke={C.f} strokeWidth={2} />
        {s >= 1 && (
          <>
            <circle cx={F.cx} cy={F.cy} r={F.r} fill={C.g} fillOpacity={0.06} stroke={C.g} strokeWidth={2} />
            {s >= 2 && <circle cx={F.cx} cy={F.cy} r={F.r} fill={C.g} fillOpacity={0.28} mask={`url(#${outsideO})`} />}
          </>
        )}
        {CARS.map((c, i) => (
          <Car
            key={i}
            x={c.x}
            y={c.y}
            oil={c.kind === 'oil' || c.kind === 'both'}
            tag={s >= 1 && (c.kind === 'filter' || c.kind === 'both')}
            glow={s >= 2 && c.kind === 'filter'}
          />
        ))}
        <text x={14} y={22} fontSize={12} fontWeight={700} fill={C.f}>
          O: needs oil
        </text>
        {s >= 1 && (
          <text x={326} y={22} fontSize={12} fontWeight={700} fill={C.g} textAnchor="end">
            F: needs air filter
          </text>
        )}
        {wrong && (
          <text x={326} y={40} fontSize={11} fontWeight={600} fill={C.bad} textAnchor="end">
            O′: no oil, 3 cars
          </text>
        )}
        {s >= 2 && (
          <text x={F.cx + 8} y={174} fontSize={12} fontWeight={700} fill={C.g} textAnchor="middle">
            3 − 1 = 2 cars
          </text>
        )}
        <text x={14} y={184} fontSize={11} className="fill-gray-500 dark:fill-gray-400">
          20 cars
        </text>
      </svg>

      <div className="mt-3">
        <CountTable step={s} wrong={wrong} />
      </div>

      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <StepNav
            step={s}
            count={STEPS}
            onBack={() => {
              setWrong(false)
              steps.back()
            }}
            onNext={() => {
              setWrong(false)
              steps.next()
            }}
          />
          <Buttons>
            <Toggle
              label="What if I multiply?"
              checked={wrong}
              onChange={on => {
                setWrong(on)
                steps.setStep(STEPS - 1)
              }}
            />
          </Buttons>
        </div>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex={"\\Pr(F)\\times\\Pr(O') = \\tfrac{9}{400}"} />
              <Readout color={C.bad} tex={'\\tfrac{9}{400}\\times 20 = 0.45\\text{ car}'} />
              <Readout color={C.g} tex={"\\text{no-oil cars with a filter: } \\tfrac{2}{3}"} />
            </>
          ) : s === 0 ? (
            <>
              <Readout color={C.f} tex={'\\Pr(O) = \\tfrac{17}{20}'} />
              <Readout tex={"\\Pr(O') = \\tfrac{3}{20}"} />
            </>
          ) : s === 1 ? (
            <>
              <Readout color={C.g} tex={'\\Pr(F) = \\tfrac{3}{20}'} />
              <Readout tex={'\\Pr(O\\cap F) = \\tfrac{1}{20}'} />
            </>
          ) : (
            <Readout color={C.g} tex={"\\Pr(F\\cap O') = \\tfrac{2}{20} = \\tfrac{1}{10}"} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
