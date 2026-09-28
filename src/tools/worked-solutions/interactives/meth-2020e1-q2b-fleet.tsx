// 2020 Methods Exam 1 Q2b — why the equation is m + n = 20(n − 1). Model Y's probabilities all have
// denominator m + n, so picture a fleet of m + n cars at a service: m need oil, n need an air
// filter, 1 needs both, so n − 1 need an air filter only (orange) — and, as the table in the
// working shows, m − 1 need oil only and exactly 1 needs neither. "Probability 0.05 = 1/20" means
// one orange car in every 20 cars, so the fleet must be exactly 20 lots of n − 1. The fleet is drawn
// in rows of 20 with the orange cars placed one per row from the right-hand end: the target is met
// exactly when every row is full and holds one orange car. It starts at model X from part a.
// (m = 17, n = 3: 2 in 20, twice the target); the student adjusts m to find m = 37, changes n, and
// the pairs found (18, 37, 56, 75, 94 for n = 2 … 6) build up the rule m = 19n − 20. Two options
// apply the rule, and the sign slip m = 21n − 20, which always overshoots the fleet by 2n cars.

import { useEffect, useState, type ReactNode } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle, num } from './kit'

type Kind = 'oil' | 'both' | 'filter' | 'neither'
type Mode = 'free' | 'rule' | 'slip'

const N_MIN = 2
const N_MAX = 6
const M_MAX = 110 // the slip rule at n = 6 gives m = 106

const rule = (n: number) => 19 * n - 20
const slip = (n: number) => 21 * n - 20

/** The fleet as cells in rows of 20: the car needing both first, then the one needing neither;
 *  the n − 1 air-filter-only cars placed one per row from the right-hand end (wrapping inwards if
 *  there are more of them than rows); every other car needs oil only. */
function layout(m: number, n: number): Kind[] {
  const total = m + n
  const cells: Kind[] = Array.from({ length: total }, () => 'oil')
  cells[0] = 'both'
  cells[1] = 'neither'
  const rows = Math.ceil(total / 20)
  let left = n - 1
  for (let j = 0; left > 0 && j < 20; j++) {
    for (let r = 0; left > 0 && r < rows; r++) {
      const idx = Math.min(20 * r + 19, total - 1) - j
      if (idx < 20 * r || idx < 2 || cells[idx] !== 'oil') continue
      cells[idx] = 'filter'
      left--
    }
  }
  return cells
}

const CELL: Record<Kind, string> = {
  filter: 'bg-orange-500',
  both: 'bg-gradient-to-br from-sky-500 from-50% to-orange-500 to-50%',
  oil: 'bg-sky-200 dark:bg-sky-800/70',
  neither: 'bg-white border border-gray-400 dark:bg-gray-900 dark:border-gray-500',
}

function Key({ kind, children }: { kind: Kind; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block w-3 h-3 rounded-[3px] ${CELL[kind]}`} />
      <span>{children}</span>
    </span>
  )
}

export default function Fleet() {
  const [n, setN] = useState(3)
  const [m, setM] = useState(17)
  const [mode, setMode] = useState<Mode>('free')
  const [found, setFound] = useState<Record<number, number>>({})

  const total = m + n
  const k = n - 1
  const target = 20 * k
  const exact = total === target
  const p = k / total
  const cells = layout(m, n)
  const full = Math.floor(total / 20)
  const rem = total % 20

  useEffect(() => {
    if (mode === 'free' && exact && found[n] === undefined) setFound(f => ({ ...f, [n]: m }))
  }, [mode, exact, n, m, found])

  const pickN = (v: number) => {
    setN(v)
    if (mode === 'rule') setM(rule(v))
    if (mode === 'slip') setM(slip(v))
  }
  const pickM = (v: number) => {
    setMode('free')
    setM(Math.max(1, Math.min(M_MAX, v)))
  }
  const pickMode = (next: Mode) => {
    const to = mode === next ? 'free' : next
    setMode(to)
    if (to === 'rule') setM(rule(n))
    if (to === 'slip') setM(slip(n))
  }

  const pairs = Object.entries(found)
    .map(([a, b]) => [Number(a), b] as const)
    .sort((a, b) => a[0] - b[0])

  let notice
  if (mode === 'rule') {
    notice = (
      <Notice tone="good">
        <M>m = 19n - 20</M> gives <M>{`m = ${m}`}</M> and a fleet of <M>{`${total} = 20 \\times ${k}`}</M>: one orange car in
        every row of 20, whatever <M>n</M> is. Slide <M>n</M>: one more air-filter car (<M>n</M> up by 1) needs 20 more cars in
        the fleet, itself and 19 more for <M>m</M>. That is the 19 in <M>19n</M>. One equation can&apos;t fix two unknowns, so
        the answer is a relationship between <M>m</M> and <M>n</M>, not a number. (<M>n</M> starts at 2: <M>n = 1</M> would need{' '}
        <M>{'{m = -1}'}</M>.)
      </Notice>
    )
  } else if (mode === 'slip') {
    notice = (
      <Notice tone="warn">
        <M>m = 21n - 20</M> comes from moving <M>n</M> across without changing its sign (<M>20n - 20 = m + n</M>, so{' '}
        <M>m = 20n + n - 20</M>). It gives <M>{`m = ${m}`}</M>, a fleet of {total} instead of {target}:{' '}
        <M>{`\\tfrac{${k}}{${total}} \\approx ${num(p, 3)}`}</M>, not 0.05. The fleet is <M>{`2n = ${2 * n}`}</M> cars too big:
        see the short last row, with no orange car. Testing a small value catches the slip: <M>n = 2</M> gives <M>m = 22</M>{' '}
        and <M>{'\\tfrac{1}{24}'}</M>, not <M>{'\\tfrac{1}{20}'}</M>.
      </Notice>
    )
  } else if (exact) {
    notice = (
      <Notice tone="good">
        <b>One orange car in every row of 20</b>: <M>{`\\tfrac{${k}}{${total}} = \\tfrac{1}{20}`}</M> ✓. The fleet is exactly 20
        lots of the <M>n - 1</M> air-filter-only cars. That is the working&apos;s equation <M>m + n = 20(n - 1)</M>: for{' '}
        <M>{`n = ${n}`}</M> it needs <M>{`m = 20 \\times ${k} - ${n} = ${m}`}</M>.{' '}
        {pairs.length >= 2 ? (
          <>Look at your pairs below: each extra 1 in <M>n</M> adds 19 to <M>m</M>.</>
        ) : (
          <>Now change <M>n</M>: does <M>{`m = ${m}`}</M> still work?</>
        )}
      </Notice>
    )
  } else if (m === 17 && n === 3) {
    notice = (
      <Notice>
        This is <b>model X from part a.</b> (<M>m = 17</M>, <M>n = 3</M>): 20 cars, and 2 need an air filter without oil. That
        is <M>{'\\tfrac{2}{20} = 0.1'}</M>, twice the target 0.05. For 1 in 20, each orange car needs 20 cars in the fleet, so 2
        orange cars need a fleet of 40. <b>Increase <M>m</M></b> (more oil-only cars) until it is.
      </Notice>
    )
  } else if (total < target) {
    notice = (
      <Notice>
        <b>Too few cars.</b> {k} air-filter-only {k === 1 ? 'car needs' : 'cars need'} a fleet of{' '}
        <M>{`20 \\times ${k} = ${target}`}</M> to be 1 in 20, but this fleet has {total}, so{' '}
        <M>{`\\tfrac{${k}}{${total}} \\approx ${num(p, 3)}`}</M>, more than 0.05. <b>Increase <M>m</M></b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Too many cars.</b> {k} air-filter-only {k === 1 ? 'car needs' : 'cars need'} a fleet of{' '}
        <M>{`20 \\times ${k} = ${target}`}</M>, but this one has {total}: there is a row with no orange car, and{' '}
        <M>{`\\tfrac{${k}}{${total}} \\approx ${num(p, 3)}`}</M> is less than 0.05. <b>Decrease <M>m</M></b>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-600 dark:text-gray-300 mb-2">
        <Key kind="filter">air filter only: <M>n-1</M></Key>
        <Key kind="both">both: 1</Key>
        <Key kind="oil">oil only: <M>m-1</M></Key>
        <Key kind="neither">neither: 1</Key>
      </div>
      <div
        className="grid gap-[2px] sm:gap-[3px] max-w-[440px] mx-auto"
        style={{ gridTemplateColumns: 'repeat(20, minmax(0, 1fr))' }}
        role="img"
        aria-label={`A fleet of ${total} cars in rows of 20, ${k} of them needing an air filter only`}
      >
        {cells.map((kind, i) => (
          <div key={i} className={`aspect-square rounded-[3px] ${CELL[kind]}`} />
        ))}
      </div>
      <p className="text-center text-[12px] text-gray-500 dark:text-gray-400 mt-1.5">
        {total} cars = {full} {full === 1 ? 'row' : 'rows'} of 20{rem ? ` + ${rem}` : ''}
      </p>

      <Controls>
        <Slider label="n" value={n} onChange={pickN} min={N_MIN} max={N_MAX} step={1} format={v => String(v)} />
        <Slider label="m" value={m} onChange={pickM} min={1} max={M_MAX} step={1} format={v => String(v)} />
        <Buttons>
          <ActionButton label="m − 1" onClick={() => pickM(m - 1)} />
          <ActionButton label="m + 1" onClick={() => pickM(m + 1)} />
          <Toggle label="Use m = 19n − 20" checked={mode === 'rule'} onChange={() => pickMode('rule')} />
          <Toggle label="What if m = 21n − 20?" checked={mode === 'slip'} onChange={() => pickMode('slip')} />
        </Buttons>
        <Readouts>
          <Readout tex={`m + n = ${total}`} />
          <Readout color={C.g} tex={`n - 1 = ${k}`} />
          <Readout
            color={exact ? C.good : mode === 'slip' ? C.bad : undefined}
            tex={`\\Pr(F\\cap O') = \\tfrac{${k}}{${total}} ${exact ? '= \\tfrac{1}{20}\\ \\checkmark' : (1000 * k) % total === 0 ? `= ${parseFloat(num(p, 3))}` : `\\approx ${num(p, 3)}`}`}
          />
        </Readouts>
        {notice}
        {pairs.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-300">
            <span>Pairs you have found:</span>
            {pairs.map(([a, b]) => (
              <span
                key={a}
                className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 dark:border-emerald-800 dark:bg-emerald-950/40"
              >
                <Katex tex={`n = ${a},\\ m = ${b}`} />
              </span>
            ))}
          </div>
        )}
      </Controls>
    </div>
  )
}
