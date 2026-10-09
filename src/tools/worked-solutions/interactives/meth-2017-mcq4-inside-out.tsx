// 2017 Methods Exam 2 MCQ 4 — a composite as two look-ups in a chain. Pick the input (2, 3 or 4)
// and the order (g first, which is f(g(x)), or f first, which is g(f(x))) and watch the value pass
// through the two function "machines", with the cells used lit up in the table of given values.
// Shows why f(g(3)) is worked inside out (g(3) = 2, then f(2) = 5), that doing f first gives
// g(f(3)) = 1 (option A), and that for x = 2 or 4 the chain breaks because g's output is not an
// input of f we know — the range of g has to sit inside the domain of f.

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'

type Fn = 'f' | 'g'
const VALUES: Record<Fn, Record<number, number>> = {
  f: { 2: 5, 3: 4 },
  g: { 2: 5, 3: 2, 4: 1 },
}
const COLS = [1, 2, 3, 4, 5]
const COLOR: Record<Fn, string> = { f: C.f, g: C.g }
const look = (fn: Fn, x: number | null): number | null => (x === null ? null : VALUES[fn][x] ?? null)

function Box({ value, color, faded }: { value: number | null; color?: string; faded?: boolean }) {
  return (
    <div
      className={`w-11 h-11 flex-none rounded-lg border-2 flex items-center justify-center font-display text-[18px] font-bold tabular-nums ${
        faded ? 'border-dashed border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'
      }`}
      style={!faded && color ? { borderColor: color } : undefined}
    >
      {value === null ? '?' : value}
    </div>
  )
}

function Arrow({ fn, broken }: { fn: Fn; broken: boolean }) {
  const color = broken ? C.guide : COLOR[fn]
  return (
    <div className="flex-none flex flex-col items-center w-[64px]">
      <span className="font-display italic font-bold text-[15px] leading-none mb-1" style={{ color }}>
        {fn}
      </span>
      <svg width="64" height="14" viewBox="0 0 64 14" aria-hidden>
        <line x1="2" y1="7" x2="54" y2="7" stroke={color} strokeWidth="2.5" strokeDasharray={broken ? '5 4' : undefined} />
        <polygon points="54,1 63,7 54,13" fill={color} />
      </svg>
    </div>
  )
}

export default function InsideOut() {
  const [x, setX] = useState(3)
  const [fFirst, setFFirst] = useState(false)

  const first: Fn = fFirst ? 'f' : 'g'
  const second: Fn = first === 'g' ? 'f' : 'g'
  const mid = look(first, x)
  const out = look(second, mid)
  const name = fFirst ? `g(f(${x}))` : `f(g(${x}))`

  const midTex = mid === null ? '\\text{?}' : String(mid)
  const readTex =
    mid === null
      ? `${first}(${x}) \\text{ not given, so } ${name} \\text{ is unknown}`
      : out === null
        ? `${name} = ${second}(${mid}),\\ ${second}(${mid}) \\text{ not given}`
        : `${name} = ${second}(${midTex}) = ${out}`

  // Which table cells the chain uses: [function, column].
  const used: [Fn, number][] = [[first, x]]
  if (mid !== null) used.push([second, mid])
  const isUsed = (fn: Fn, col: number) => used.findIndex(([u, c]) => u === fn && c === col)

  let notice
  if (!fFirst && x === 3) {
    notice = (
      <Notice tone="good">
        Read <M>{'f(g(3))'}</M> from the inside out: <M>g</M> is the letter touching the <M>3</M>, so <M>g</M> acts
        first. <M>{'g(3)=2'}</M>, and that output is fed into <M>f</M>: <M>{'f(2)=5'}</M>. Two letters means two
        look-ups; stopping after the first gives <M>2</M>, option B. Now press <b>Apply f first</b> to see the other order.
      </Notice>
    )
  } else if (fFirst && x === 3) {
    notice = (
      <Notice tone="warn">
        Applying <M>f</M> first gives <M>{'f(3)=4'}</M>, then <M>{'g(4)=1'}</M>: that is <M>{'g(f(3))'}</M>, option A,
        not <M>{'f(g(3))'}</M>. Reading the letters left to right is the wrong order: the function nearest the{' '}
        <M>x</M> goes first. Swapping the order changes the answer, so <M>{'f\\circ g'}</M> and <M>{'g\\circ f'}</M>{' '}
        are different functions.
      </Notice>
    )
  } else if (mid === null) {
    notice = (
      <Notice>
        <M>{`${first}(${x})`}</M> is not one of the given values, so the chain breaks at the very first step. Try{' '}
        <M>x = 3</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`${first}(${x})=${mid}`}</M>, but <M>{`${second}(${mid})`}</M> is not given, so <M>{name}</M> cannot be
        found. The output of the inside function has to be an input the outside function accepts: for{' '}
        <M>{name.replace(String(x), 'x')}</M>, the range of <M>{first}</M> must sit inside the domain of <M>{second}</M>. Of the inputs here only{' '}
        <M>x = 3</M> gets all the way through, which is why the question asks about <M>3</M>.
      </Notice>
    )
  }

  const btn = (v: number) => (
    <button
      key={v}
      type="button"
      onClick={() => setX(v)}
      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
        x === v
          ? 'bg-sky-50 border-sky-400 text-sky-800 dark:bg-sky-950 dark:border-sky-500 dark:text-sky-200'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
      }`}
    >
      x = {v}
    </button>
  )

  return (
    <div>
      <div className="flex items-end justify-center py-3">
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">input</span>
          <Box value={x} color={C.guide} />
        </div>
        <div className="pb-3.5">
          <Arrow fn={first} broken={mid === null} />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">
            <i>{first}</i>({x})
          </span>
          <Box value={mid} color={COLOR[first]} faded={mid === null} />
        </div>
        <div className="pb-3.5">
          <Arrow fn={second} broken={mid === null || out === null} />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">output</span>
          <Box value={out} color={out === null ? undefined : fFirst ? COLOR[second] : C.good} faded={out === null} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="mx-auto text-[14px] border-collapse tabular-nums">
          <tbody>
            <tr>
              <th className="px-2 py-1 text-left font-normal italic text-gray-500 dark:text-gray-400">x</th>
              {COLS.map(c => (
                <td key={c} className="w-10 px-2 py-1 text-center text-gray-500 dark:text-gray-400">
                  {c}
                </td>
              ))}
            </tr>
            {(['f', 'g'] as Fn[]).map(fn => (
              <tr key={fn} className="border-t border-gray-200 dark:border-gray-700">
                <th className="px-2 py-1 text-left font-semibold whitespace-nowrap" style={{ color: COLOR[fn] }}>
                  <i>{fn}</i>(<i>x</i>)
                </th>
                {COLS.map(c => {
                  const v = VALUES[fn][c]
                  const k = isUsed(fn, c)
                  return (
                    <td key={c} className="px-1 py-1 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-7 rounded-md ${
                          v === undefined ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100 font-semibold'
                        } `}
                        style={k >= 0 ? { boxShadow: `0 0 0 2px ${COLOR[fn]}` } : undefined}
                      >
                        {v === undefined ? '—' : v}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-center text-[11.5px] text-gray-500 dark:text-gray-400 mt-1">
          The given values; — means not given. Ringed cells are the look-ups used.
        </p>
      </div>

      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-gray-600 dark:text-gray-300 mr-1">Input:</span>
          {[2, 3, 4].map(btn)}
        </div>
        <Toggle
          label={
            <>
              Apply <i>f</i> first (that is <i>g</i>(<i>f</i>(<i>x</i>)))
            </>
          }
          checked={fFirst}
          onChange={setFFirst}
        />
        <Readouts>
          <Readout color={out === null ? C.guide : fFirst ? COLOR[second] : C.good} tex={readTex} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
