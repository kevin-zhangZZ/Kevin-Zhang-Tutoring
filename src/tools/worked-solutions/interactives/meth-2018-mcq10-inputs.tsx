// 2018 Methods Exam 2 MCQ 10 — f(x + f(x)) = f(2x) compares f at two INPUTS: x + f(x) (orange) and
// 2x (green). Every option is a sloping straight line, and a sloping line never gives two different
// inputs the same height, so the outputs agree exactly when the inputs agree: x + f(x) = 2x, which
// forces f(x) = x. Pick an option and slide x (in twelfths): for C the two inputs are the same point
// for every x; for A and E they meet at one x only (x = 1/2 and x = 1/3), which is why one test value
// can rule an option out but never in; for B they are always 1 apart; for D they meet only at the
// excluded x = 0. Dashed lines carry each input up to the line and across to its output height.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider } from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'

const RULES: Record<Letter, { f: (x: number) => number; tex: string }> = {
  A: { f: x => 1 - x, tex: 'f(x) = 1 - x' },
  B: { f: x => x - 1, tex: 'f(x) = x - 1' },
  C: { f: x => x, tex: 'f(x) = x' },
  D: { f: x => x / 2, tex: 'f(x) = \\tfrac{x}{2}' },
  E: { f: x => (1 - x) / 2, tex: 'f(x) = \\tfrac{1-x}{2}' },
}
const LETTERS: Letter[] = ['A', 'B', 'C', 'D', 'E']
/** Where the two inputs meet, in twelfths of x (null: never). */
const MEET: Record<Letter, number | null> = { A: 6, B: null, C: null, D: 0, E: 4 }

const X0 = -4.5
const X1 = 5.5

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** Exact value as TeX: every quantity here is a multiple of 1/48. */
function frac(v: number): string {
  const n = Math.round(v * 48)
  if (n === 0) return '0'
  const g = gcd(n, 48)
  const p = Math.abs(n) / g
  const q = 48 / g
  const sign = n < 0 ? '-' : ''
  return q === 1 ? `${sign}${p}` : `${sign}\\tfrac{${p}}{${q}}`
}
const fracPlain = (n12: number) => {
  if (n12 === 0) return '0'
  const g = gcd(n12, 12)
  const p = n12 / g
  const q = 12 / g
  return q === 1 ? String(p).replace('-', '−') : `${p}/${q}`.replace('-', '−')
}

export default function Inputs() {
  const [letter, setLetter] = useState<Letter>('A')
  const [n, setN] = useState(18) // x = n/12

  const { f, tex } = RULES[letter]
  const x = n / 12
  const u = x + f(x) // input on the left side
  const v = 2 * x // input on the right side
  const fu = f(u)
  const fv = f(v)
  const same = Math.abs(u - v) < 1e-9
  const uLeft = u < v
  // Labels go in the quadrants the line leaves free: SW/NE for a falling line, NW/SE for a rising one.
  const rising = f(1) > f(0)
  const leftAttach = rising ? 'nw' : 'sw'
  const rightAttach = rising ? 'se' : 'ne'
  // An output on the x-axis (e.g. option A, where f(x + f(x)) = f(1) = 0 always) keeps its label above
  // the axis so it doesn't sit on the tick numbers.
  const onAxis = (y: number) => Math.abs(y) < 0.3
  const uAttach = onAxis(fu) ? (rising ? 'nw' : 'ne') : uLeft ? leftAttach : rightAttach
  const vAttach = onAxis(fv) ? (rising ? 'nw' : 'ne') : uLeft ? rightAttach : leftAttach

  let notice
  if (n === 0) {
    notice = (
      <Notice>
        The property is only claimed for <b>non-zero</b> <M>x</M>, so <M>x = 0</M> tells you nothing. Move <M>x</M>{' '}
        away from <M>0</M>.
      </Notice>
    )
  } else if (letter === 'C') {
    notice = (
      <Notice tone="good">
        For <M>f(x) = x</M>, the orange input <M>x + f(x) = x + x</M> lands exactly on the green input <M>2x</M>,{' '}
        <b>whatever <M>x</M> is</b>. Slide <M>x</M>: the two dots never separate. Same input, so same output, for every{' '}
        <M>x</M>, which is exactly what the property demands.
      </Notice>
    )
  } else if (same) {
    notice = (
      <Notice tone="warn">
        At <M>{`x = ${frac(x)}`}</M> the two inputs happen to coincide, so option {letter} <b>passes this one test</b>.
        Now nudge <M>x</M>: the inputs separate and the outputs split. One value that works proves nothing about a
        &ldquo;for all <M>x</M>&rdquo; property; one value that fails is enough to rule an option out.
      </Notice>
    )
  } else {
    const meet = MEET[letter]
    const extra =
      letter === 'B' ? (
        <>For option B they are <b>always exactly 1 apart</b> (<M>2x - 1</M> and <M>2x</M>), so they never meet.</>
      ) : letter === 'D' ? (
        <>For option D they meet only at <M>x = 0</M>, the one value the question excludes.</>
      ) : (
        <>
          For option {letter} they meet only at <M>{`x = ${frac((meet ?? 0) / 12)}`}</M>. Slide there and see what a
          single lucky test value looks like.
        </>
      )
    notice = (
      <Notice>
        Here the inputs <M>x + f(x)</M> and <M>2x</M> are different numbers, and a sloping line never gives two
        different inputs the same height, so the outputs differ. {extra} Only <M>f(x) = x</M> makes the inputs equal
        for every <M>x</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[X0, X1]} y={[-5, 5]} height={340}>
        <Plot.OfX y={f} domain={[X0, X1]} color={C.f} weight={3} />
        {/* Each input carried up to the line, then across to its output on the y-axis. */}
        <Line.Segment point1={[u, 0]} point2={[u, fu]} color={C.g} style="dashed" weight={2} />
        <Line.Segment point1={[u, fu]} point2={[0, fu]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[v, 0]} point2={[v, fv]} color={C.good} style="dashed" weight={2} />
        <Line.Segment point1={[v, fv]} point2={[0, fv]} color={C.good} style="dashed" weight={1.5} />
        {/* Orange drawn larger and first, so it still shows as a ring when the inputs coincide. */}
        <Point x={u} y={0} color={C.g} svgCircleProps={{ r: same ? 10 : 6 }} />
        <Point x={u} y={fu} color={C.g} svgCircleProps={{ r: same ? 10 : 6 }} />
        <Point x={v} y={0} color={C.good} />
        <Point x={v} y={fv} color={C.good} />
        {same ? (
          <Label at={[v, fv]} attach={v > 2 ? leftAttach : rightAttach} color={C.good}>
            f(x + f(x)) = f(2x)
          </Label>
        ) : (
          <>
            <Label at={[u, fu]} attach={uAttach} color={C.g}>
              f(x + f(x))
            </Label>
            <Label at={[v, fv]} attach={vAttach} color={C.good}>
              f(2x)
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          {LETTERS.map(l => (
            <ActionButton
              key={l}
              label={
                <span className={l === letter ? 'text-sky-600 dark:text-sky-400' : undefined}>
                  {l === letter ? '● ' : ''}Option {l}
                </span>
              }
              onClick={() => setLetter(l)}
            />
          ))}
        </Buttons>
        <Slider label="x" value={n} onChange={setN} min={-18} max={30} step={1} format={fracPlain} />
        <Readouts>
          <Readout color={C.f} tex={tex} />
          <Readout color={C.g} tex={`x + f(x) = ${frac(u)},\\quad f\\bigl(x + f(x)\\bigr) = ${frac(fu)}`} />
          <Readout color={C.good} tex={`2x = ${frac(v)},\\quad f(2x) = ${frac(fv)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
