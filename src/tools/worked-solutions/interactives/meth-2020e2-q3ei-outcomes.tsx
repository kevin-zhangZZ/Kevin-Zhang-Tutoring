// 2020 Methods Exam 2 Q3e.i — "one or more late" is every outcome but one. For n deliveries (1 to 4
// here) every on-time/late sequence is listed with its probability 0.85^(on time) × 0.15^(late),
// grouped by how many are late. "One or more late" is every row except the top one (all on time),
// so its probability is 1 − 0.85ⁿ. The report's common wrong answer, 1 − 0.15ⁿ, removes the bottom
// row (all late) instead: that is the chance that one or more arrive ON time.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type Pick = 'late' | 'allOn' | 'allLate' | 'notAllLate'

const lateCount = (row: boolean[]) => row.filter(Boolean).length

/** Every sequence of n deliveries (true = late), fewest late first. */
function sequences(n: number): boolean[][] {
  const rows = Array.from({ length: 2 ** n }, (_, m) => Array.from({ length: n }, (_, i) => ((m >> (n - 1 - i)) & 1) === 1))
  return rows.sort((a, b) => lateCount(a) - lateCount(b))
}

const PICKS: { id: Pick; label: string; color: string }[] = [
  { id: 'late', label: 'One or more late', color: C.g },
  { id: 'allOn', label: 'All on time', color: C.f },
  { id: 'allLate', label: 'All late', color: C.violet },
  { id: 'notAllLate', label: '1 − 0.15ⁿ', color: C.bad },
]

function inEvent(pick: Pick, late: number, n: number) {
  if (pick === 'late') return late >= 1
  if (pick === 'allOn') return late === 0
  if (pick === 'allLate') return late === n
  return late < n
}

function Delivery({ late }: { late: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className="inline-block w-3.5 h-3.5" role="img" aria-label={late ? 'late' : 'on time'}>
      <circle cx={6} cy={6} r={4.4} fill={late ? 'none' : C.f} stroke={late ? C.g : C.f} strokeWidth={late ? 2.2 : 1.2} />
    </svg>
  )
}

export default function Outcomes() {
  const [n, setN] = useState(3)
  const [pick, setPick] = useState<Pick>('late')
  const rows = sequences(n)
  const color = PICKS.find(p => p.id === pick)!.color
  const lit = rows.filter(r => inEvent(pick, lateCount(r), n))
  const total = lit.reduce((s, r) => s + 0.85 ** (n - lateCount(r)) * 0.15 ** lateCount(r), 0)

  const formula = {
    late: `1 - 0.85^{${n}}`,
    allOn: `0.85^{${n}}`,
    allLate: `0.15^{${n}}`,
    notAllLate: `1 - 0.15^{${n}}`,
  }[pick]

  let notice
  if (pick === 'late') {
    notice = (
      <Notice>
        Every row except the <b>top</b> one has at least one late delivery (a hollow orange ring). You could add all{' '}
        {lit.length} of them, but the rows always add up to 1, so it is quicker to subtract the one row that is left out,
        &ldquo;all on time&rdquo;: <M>{'1 - 0.85^n'}</M>. That works for any <M>n</M>, even when the list is far too long to
        write out. Now press <b>1 − 0.15ⁿ</b> and compare which rows it takes.
      </Notice>
    )
  } else if (pick === 'allOn') {
    notice = (
      <Notice>
        The top row is the only one with <b>no</b> late delivery. The deliveries are independent, so multiply:{' '}
        <M>{'0.85 \\times 0.85 \\times \\cdots = 0.85^n'}</M>. It is the exact opposite (the complement) of &ldquo;one or more
        late&rdquo;: between them, the two events cover every row exactly once.
      </Notice>
    )
  } else if (pick === 'allLate') {
    notice = (
      <Notice>
        The bottom row: every delivery late, <M>{'0.15^n'}</M>, which is tiny. It is <b>not</b> the opposite of &ldquo;one or
        more late&rdquo;: the rows in between have some late deliveries and some on time, and they belong to &ldquo;one or
        more late&rdquo; too.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'1 - 0.15^n'}</M> removes the <b>bottom</b> row (all late) instead of the top one. So it counts every row with at
        least one delivery <b>on time</b>, and it includes the top row, where nothing is late at all. It answers &ldquo;one or
        more arrive on time&rdquo;, the wrong event. The report lists it as a common incorrect answer.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-2">
        Each row is one possible day of <M>n</M> deliveries in order:{' '}
        <span className="whitespace-nowrap"><Delivery late={false} /> on time</span> (probability 0.85),{' '}
        <span className="whitespace-nowrap"><Delivery late /> late</span> (0.15). Its probability is the product along the row.
      </p>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-[12.5px] text-gray-700 dark:text-gray-300">
        {rows.map((r, i) => {
          const late = lateCount(r)
          const on = inEvent(pick, late, n)
          const p = 0.85 ** (n - late) * 0.15 ** late
          const newGroup = i > 0 && lateCount(rows[i - 1]) !== late
          return (
            <div
              key={r.map(Number).join('')}
              className={`flex items-center gap-3 px-3 py-[3px] ${newGroup ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
              style={on ? { background: `${color}26` } : undefined}
            >
              <span className="flex gap-1 w-[76px] flex-none">
                {r.map((isLate, j) => (
                  <Delivery key={j} late={isLate} />
                ))}
              </span>
              <span className={`flex-1 ${on ? 'font-semibold' : 'opacity-60'}`}>{late} late</span>
              <span className={`tabular-nums ${on ? 'font-semibold' : 'opacity-60'}`} style={on ? { color } : undefined}>
                {p.toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>
      <Controls>
        <Slider label="n" value={n} onChange={v => setN(Math.round(v))} min={1} max={4} step={1} format={v => v.toFixed(0)} />
        <Buttons>
          {PICKS.map(p => (
            <Toggle key={p.id} label={p.label} checked={pick === p.id} onChange={() => setPick(p.id)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={color} tex={`${lit.length} \\text{ of } ${rows.length} \\text{ rows: } ${formula} \\approx ${total.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
