// 2019 Methods Exam 1 Q6b — where the two binomial terms come from. A box of 12 pegs is drawn as
// 12 tiles, each faulty (probability 1/6, red) or good (5/6, grey), independently. No faulty pegs
// is one arrangement: (5/6)^12. One faulty peg has probability (1/6)(5/6)^11 for each arrangement,
// but the faulty peg can be any of the 12 (tap a tile or press "Move"), and "Show all 12" stacks
// them into a grid with a red diagonal — 12 equal arrangements, so Pr(X = 1) = 12(1/6)(5/6)^11
// = 2(5/6)^11 ≈ 0.269. The report says few students found both terms correctly; dropping the 12
// gives about 0.135 in total instead of 0.381. Values checked in sympy.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Toggle, num } from './kit'

const P0 = (5 / 6) ** 12
const ONE = (1 / 6) * (5 / 6) ** 11
const P1 = 12 * ONE

export default function Arrangements() {
  const [k, setK] = useState<0 | 1>(1)
  const [pos, setPos] = useState(3)
  const [all, setAll] = useState(false)

  const faulty = (i: number) => k === 1 && i === pos
  // This arrangement written peg by peg: the good pegs before the faulty one, the faulty one, the rest.
  const before = pos
  const after = 11 - pos
  const pieces = [
    before > 0 ? `\\left(\\tfrac56\\right)^{${before}}` : '',
    '\\left(\\tfrac16\\right)',
    after > 0 ? `\\left(\\tfrac56\\right)^{${after}}` : '',
  ].join('')

  let notice
  if (k === 0) {
    notice = (
      <Notice>
        No faulty pegs means <b>all 12 pegs are good</b>, each with probability <M>{'\\tfrac56'}</M>, independently,
        so multiply: <M>{'\\Pr(X=0) = \\left(\\tfrac56\\right)^{12} \\approx 0.112'}</M>. There is only one way
        for that to happen, so there&apos;s no coefficient. Now switch to &ldquo;1 faulty&rdquo;.
      </Notice>
    )
  } else if (!all) {
    notice = (
      <Notice>
        One faulty peg (<M>{'\\tfrac16'}</M>) and eleven good ones (<M>{'\\tfrac56'}</M> each): this box has
        probability{' '}
        <span className="whitespace-nowrap">
          <M>{'\\tfrac16\\left(\\tfrac56\\right)^{11} \\approx 0.0224'}</M>.
        </span>{' '}
        But that&apos;s only{' '}
        <b>one arrangement</b>. Tap another peg or press Move: the faulty one could be any of the 12, and every
        arrangement has the same probability. Then turn on &ldquo;Show all 12&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Twelve different boxes, one per row, each with probability <M>{'\\tfrac16\\left(\\tfrac56\\right)^{11}'}</M>.
        Add them: <M>{'\\Pr(X=1) = 12\\left(\\tfrac16\\right)\\left(\\tfrac56\\right)^{11} \\approx 0.269'}</M>. The{' '}
        <M>12</M> is <M>{'\\binom{12}{1}'}</M>, the number of places the faulty peg can sit. Leave it out and this term
        is only <M>0.022</M>, so the total drops to about <M>0.135</M> instead of <M>0.381</M>.
      </Notice>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
        One box of 12 pegs{k === 1 ? ' — tap a peg to make it the faulty one' : ''}
      </p>
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5 mb-2">
        {Array.from({ length: 12 }, (_, i) => {
          const bad = faulty(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (k === 1) setPos(i)
              }}
              className={`min-w-0 rounded-lg border text-center py-1.5 ${
                bad
                  ? 'bg-rose-100 border-rose-300 text-rose-900 dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-100'
                  : 'bg-gray-50 border-gray-200 text-gray-500 dark:bg-gray-800/60 dark:border-gray-700 dark:text-gray-400'
              } ${k === 1 ? 'cursor-pointer hover:border-rose-300 dark:hover:border-rose-800' : 'cursor-default'}`}
            >
              <span className="block text-[10px] font-semibold leading-none mb-1">{bad ? 'Faulty' : 'Good'}</span>
              <span className="block text-[12.5px] leading-none">
                <Katex tex={bad ? '\\tfrac16' : '\\tfrac56'} />
              </span>
            </button>
          )
        })}
      </div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-3">
        {k === 0 ? (
          <>
            This box: <Katex tex={`\\left(\\tfrac56\\right)^{12} \\approx ${num(P0, 4)}`} />
          </>
        ) : (
          <>
            This box: <Katex tex={`${pieces} = \\tfrac16\\left(\\tfrac56\\right)^{11} \\approx ${num(ONE, 4)}`} />
          </>
        )}
      </p>

      {k === 1 && all && (
        <div className="mb-3 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
          <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">All 12 boxes with exactly one faulty peg</p>
          <div className="flex flex-col gap-[3px]">
            {Array.from({ length: 12 }, (_, r) => (
              <button
                key={r}
                type="button"
                onClick={() => setPos(r)}
                className={`flex items-center gap-2 rounded px-1 ${r === pos ? 'bg-rose-50 dark:bg-rose-950/30' : ''}`}
              >
                <span className="flex gap-[2px]">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] ${
                        i === r ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </span>
                <span className="text-[11.5px] tabular-nums text-gray-500 dark:text-gray-400">{num(ONE, 4)}</span>
              </button>
            ))}
          </div>
          <p className="text-[12.5px] text-gray-700 dark:text-gray-200 mt-2">
            <Katex tex={`12 \\times \\tfrac16\\left(\\tfrac56\\right)^{11} = 2\\left(\\tfrac56\\right)^{11} \\approx ${num(P1, 4)}`} />
          </p>
        </div>
      )}

      <Controls>
        <Buttons>
          <Toggle label="0 faulty" checked={k === 0} onChange={() => setK(0)} />
          <Toggle label="1 faulty" checked={k === 1} onChange={() => setK(1)} />
          {k === 1 && <ActionButton label="Move the faulty peg ›" onClick={() => setPos(p => (p + 1) % 12)} />}
          {k === 1 && <Toggle label="Show all 12" checked={all} onChange={setAll} />}
        </Buttons>
        <Readouts>
          <Readout color={k === 0 ? C.g : C.guide} tex={`\\Pr(X=0) = \\left(\\tfrac56\\right)^{12} \\approx ${num(P0, 3)}`} />
          <Readout color={k === 1 ? C.bad : C.guide} tex={`\\Pr(X=1) = 12\\left(\\tfrac16\\right)\\left(\\tfrac56\\right)^{11} \\approx ${num(P1, 3)}`} />
          <Readout color={C.good} tex={`\\Pr(X<2) \\approx ${num(P0 + P1, 3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
