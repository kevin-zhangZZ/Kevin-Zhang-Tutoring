// 2020 Methods Exam 2 MCQ 19 — test every option at w = 0, 1, …, 20. The orange rings are the true
// q(w) = Pr(W = w), W ~ Bi(20, 5/6), from its own formula; the violet dots are what the chosen option
// gives, and a red × marks each w where the option asks p for something it can't take (p is only
// defined at the whole numbers 0 to 20). A fills every ring; B (33%) and C are defined only at w = 0
// and 20 because they feed p a fraction; D only at w = 20; E (27%) is defined everywhere but its
// values sit near 1 and add to 20. Starts on B, the most popular answer.

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Katex, Label, M, Notice, Plane, Point, Readout, Readouts, Toggle } from './kit'

const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
/** p(x) = Pr(X = x), X ~ Bi(20, 1/6): the number of 6s. */
const p = (x: number) => choose(20, x) * (1 / 6) ** x * (5 / 6) ** (20 - x)
/** The true q(w) = Pr(W = w), W ~ Bi(20, 5/6), from its own formula. */
const q = (w: number) => choose(20, w) * (5 / 6) ** w * (1 / 6) ** (20 - w)
/** p at an input, or null when the input isn't one of the counts 0, 1, …, 20. */
function pAt(x: number): number | null {
  const r = Math.round(x)
  return Math.abs(x - r) < 1e-9 && r >= 0 && r <= 20 ? p(r) : null
}

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: { letter: Letter; tex: string; value: (w: number) => number | null }[] = [
  { letter: 'A', tex: 'p(20-w)', value: w => pAt(20 - w) },
  { letter: 'B', tex: 'p\\left(1-\\tfrac{w}{20}\\right)', value: w => pAt(1 - w / 20) },
  { letter: 'C', tex: 'p\\left(\\tfrac{w}{20}\\right)', value: w => pAt(w / 20) },
  { letter: 'D', tex: 'p(w-20)', value: w => pAt(w - 20) },
  { letter: 'E', tex: '1-p(w)', value: w => 1 - p(w) },
]
const W = Array.from({ length: 21 }, (_, i) => i)

const xTicks = (v: number) => (v > 0 && Math.round(v) % 2 === 0 ? String(Math.round(v)) : '')
// The red × marks sit in their own row below the axis numbers, clear of the orange rings (which are
// flat on the axis for w ≤ 11).
const BELOW = -0.05
const X_ROW = -0.034

export default function Options() {
  const [letter, setLetter] = useState<Letter>('B')
  const opt = OPTIONS.find(o => o.letter === letter)!
  const vals = W.map(w => opt.value(w))
  const defined = vals.filter(v => v !== null).length
  const sum = vals.reduce<number>((s, v) => s + (v ?? 0), 0)
  const matches = vals.filter((v, w) => v !== null && Math.abs(v - q(w)) < 1e-12).length
  const tall = letter === 'E'
  const top = tall ? 1.1 : 0.3
  // y numbers on the left of the axis (mafs puts them on the right, under the dots near x = 0).
  const yNumbers = tall ? [0.2, 0.4, 0.6, 0.8, 1] : [0.1, 0.2, 0.3]

  const notices: Record<Letter, ReactNode> = {
    A: (
      <Notice tone="good">
        <b>Every ring is filled.</b> <M>p(20 - w)</M> gives a value for all 21 values of <M>w</M>, the values add to 1, and
        each one is the true <M>q(w)</M>: at the peak, <M>q(17) = p(3) \approx 0.238</M>. That&apos;s option A.
      </Notice>
    ),
    B: (
      <Notice tone="warn">
        <M>p</M> takes a <b>number</b> of sixes, a whole number from 0 to 20. B feeds it <M>{'1 - \\tfrac{w}{20}'}</M>, the{' '}
        <b>fraction</b> of rolls that are sixes, which is a whole number only when <M>w = 0</M> or <M>w = 20</M>. At{' '}
        <M>w = 17</M> it asks for <M>p(0.15)</M>, which doesn&apos;t exist. Right idea, wrong scale: multiply the fraction by 20
        and B becomes A. Now try E.
      </Notice>
    ),
    C: (
      <Notice tone="warn">
        C feeds <M>p</M> the fraction of rolls that <i>aren&apos;t</i> sixes, <M>{'\\tfrac{w}{20}'}</M>: the wrong scale and the
        wrong count. Only <M>w = 0</M> and <M>w = 20</M> give whole numbers, and even those miss: at <M>w = 20</M> C gives{' '}
        <M>p(1) \approx 0.104</M>, but <M>q(20) = p(0) \approx 0.026</M>.
      </Notice>
    ),
    D: (
      <Notice tone="warn">
        <M>p(w - 20)</M> asks for a <b>negative</b> number of sixes for every <M>w</M> below 20, so it only means something at{' '}
        <M>w = 20</M>. Replacing <M>x</M> by <M>w - 20</M> slides <M>p</M> 20 units to the right; it doesn&apos;t reflect it.
        The reflection in <M>x = 10</M> is <M>20 - w</M>.
      </Notice>
    ),
    E: (
      <Notice tone="warn">
        <M>1 - p(w)</M> gives a number for every <M>w</M>, but they are all close to 1 and add to 20, so this isn&apos;t a
        probability function (its values would add to 1). &ldquo;Not rolled&rdquo; changes <i>which outcome you count</i>; it
        doesn&apos;t take a complement. <M>1 - p(3) \approx 0.76</M> is the chance of <i>any number of sixes except three</i>, not
        of three non-sixes.
      </Notice>
    ),
  }

  return (
    <div>
      <Buttons>
        {OPTIONS.map(o => (
          <Toggle
            key={o.letter}
            checked={o.letter === letter}
            onChange={() => setLetter(o.letter)}
            label={
              <span className="inline-flex items-center gap-1.5">
                {o.letter}
                <Katex tex={o.tex} />
              </span>
            }
          />
        ))}
      </Buttons>
      <div className="mt-3">
        <Plane
          x={[-1.2, 20]}
          y={[BELOW, top]}
          xStep={1}
          yStep={tall ? 0.1 : 0.05}
          height={290}
          xLabel=""
          yLabel=""
          xLabels={xTicks}
          yLabels={false}
        >
          {yNumbers.map(v => (
            <Label key={v} at={[0, v]} attach="w" size={12} bold={false}>{v.toFixed(1)}</Label>
          ))}
          {W.map(w => (
            <Point key={`q${w}`} x={w} y={q(w)} color={C.g} svgCircleProps={{ r: 6.5, style: { fill: 'none', stroke: C.g, strokeWidth: 2 } }} />
          ))}
          {vals.map((v, w) =>
            v === null ? (
              <Label key={`x${w}`} at={[w, X_ROW]} color={C.bad} attach="c" size={13}>×</Label>
            ) : (
              <Point key={`v${w}`} x={w} y={v} color={C.violet} svgCircleProps={{ r: 4.5 }} />
            ),
          )}
        </Plane>
      </div>
      <Controls>
        <Readouts>
          <Readout color={C.violet} tex={`\\text{${letter} is defined for ${defined} of the 21 values of } w`} />
          <Readout color={C.violet} tex={`\\text{its values add to } ${sum.toFixed(3)}`} />
          <Readout color={C.g} tex={`\\text{it matches } q(w) \\text{ at ${matches} of 21}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Orange rings: the true <Katex tex="q(w)" />. Violet dots: what the option gives. Red <span className="text-red-500">×</span>: the
          option asks <Katex tex="p" /> for something that isn&apos;t a whole number of sixes from 0 to 20.
        </p>
        {notices[letter]}
      </Controls>
    </div>
  )
}
