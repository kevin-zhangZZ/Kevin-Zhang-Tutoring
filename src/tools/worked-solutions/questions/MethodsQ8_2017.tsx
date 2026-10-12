// 2017 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 64% correct, no written
// comment. Transposing y = a^(b − 4x) + 2 for x. Question text transcribed from the original paper;
// solution is original. Answer A agrees with the report and itute.
// Interactive: meth-2017-mcq8-same-curve (each option x = g(y) is drawn as a curve; only A lies on
// the given graph for every a and b — B is the graph slid down 4, D is too flat, E has asymptote
// y = 0; drag a point along the curve to see each option send y back to the wrong x).
// WrongMethods: option B (+2 moved across with the wrong sign) and option D (only b divided by 4),
// both verified to give exactly those options.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SameCurveWidget = lazyWidget(() => import('../interactives/meth-2017-mcq8-same-curve'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 64, B: 14, C: 6, D: 11, E: 5 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = a^{\,b-4x}+2" />,
    reason: (
      <>
        To get <Katex tex="x" /> back, undo the operations on <Katex tex="x" /> in reverse order. The{' '}
        <Katex tex="+2" /> was done last, so it comes off first.
      </>
    ),
    more: (
      <>
        Read how <Katex tex="y" /> is built from <Katex tex="x" />: multiply by <Katex tex="-4" />, add{' '}
        <Katex tex="b" />, raise <Katex tex="a" /> to that power, then add <Katex tex="2" />. Undoing them in reverse:
        subtract <Katex tex="2" />, take <Katex tex="\log_a" />, subtract <Katex tex="b" />, divide by{' '}
        <Katex tex="-4" />.
      </>
    ),
  },
  {
    working: <Katex display tex="y-2 = a^{\,b-4x}" />,
    reason: <>Subtract <Katex tex="2" /> from both sides. Now the power stands alone, which is what a log needs.</>,
  },
  {
    working: <Katex display tex="\log_a(y-2) = b-4x" />,
    reason: (
      <>
        Take <Katex tex="\log_a" /> of both sides (base <Katex tex="a" /> matches the power) to bring the exponent down:{' '}
        <Katex tex="a^{k}=N \iff \log_a(N)=k" />.
      </>
    ),
  },
  {
    working: <Katex display tex="4x = b-\log_a(y-2)" />,
    reason: (
      <>
        Add <Katex tex="4x" /> and subtract <Katex tex="\log_a(y-2)" /> on both sides, so the <Katex tex="x" /> term is
        positive.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x=\tfrac14\bigl(b-\log_a(y-2)\bigr)}" />,
    reason: (
      <>
        Matches option <b>A</b>. Divide the <em>whole</em> right-hand side by <Katex tex="4" />, which the bracket shows.
      </>
    ),
    more: (
      <>
        Options B (14%) and D (11%) are the two slips in the Common Mistakes below. Option E treats the <Katex tex="+2" /> as part of
        the power, as if <Katex tex="y=a^{\,b-4x+2}" />. Option C has B&apos;s <Katex tex="y+2" /> slip and divides by <Katex tex="4" /> inside the log instead of dividing the whole right side (<Katex tex="b" /> is never divided). A point
        on the curve rules them all out: with <Katex tex="a=2" />, <Katex tex="b=3" />, <Katex tex="x=\tfrac12" /> gives{' '}
        <Katex tex="y=2^1+2=4" />, and only A sends <Katex tex="y=4" /> back to <Katex tex="x=\tfrac12" /> (B gives about{' '}
        <Katex tex="0.10" />, C about <Katex tex="2.42" />, D <Katex tex="-\tfrac14" />, E <Katex tex="\tfrac34" />).
      </>
    ),
  },
]

export default function MethodsQ8_2017() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="y=a^{\,b-4x}+2" />, where <Katex tex="a>0" />, then{' '}
          <Katex tex="x" /> is equal to
        </p>
      }
      background={
        <Background title="Logs undo powers">
          <p>
            <Katex tex="a^{k}=N" /> and <Katex tex="\log_a(N)=k" /> say the same thing (for <Katex tex="a>0" />,{' '}
            <Katex tex="a\ne1" />, <Katex tex="N>0" />). So once a power is on its own on one side, taking{' '}
            <Katex tex="\log_a" /> of both sides brings the exponent down.
          </p>
          <p>
            A quick check on any answer: <Katex tex="a^{\,b-4x}" /> is always positive, so <Katex tex="y=a^{\,b-4x}+2" />{' '}
            only takes values <Katex tex="y>2" />. A correct formula for <Katex tex="x" /> must therefore break down at{' '}
            <Katex tex="y=2" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac14\bigl(b-\log_a(y-2)\bigr)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac14\bigl(b-\log_a(y+2)\bigr)" /> },
        { letter: 'C', content: <Katex tex="b-\log_a\!\left(\tfrac14(y+2)\right)" /> },
        { letter: 'D', content: <Katex tex="\tfrac{b}{4}-\log_a(y-2)" /> },
        { letter: 'E', content: <Katex tex="\tfrac14\bigl(b+2-\log_a(y)\bigr)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="A correct rearrangement draws the same curve">
            <SameCurveWidget />
          </Explore>
          <WrongMethod
            title="Move the +2 across to get y + 2"
            source="14% chose B"
            working={
              <>
                <Katex display tex="y+2=a^{\,b-4x}" />
                <Katex display tex="x=\tfrac14\bigl(b-\log_a(y+2)\bigr)" />
              </>
            }
          >
            <p>
              Taking the <Katex tex="2" /> off the right side means subtracting <Katex tex="2" /> from both sides, which
              gives <Katex tex="y-2" />. It also fails the asymptote check:{' '}
              <Katex tex="\log_a(y+2)" /> doesn&apos;t break down at <Katex tex="y=2" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Divide by 4, but only the b"
            source="11% chose D"
            working={
              <>
                <Katex display tex="4x=b-\log_a(y-2)" />
                <Katex display tex="x=\tfrac{b}{4}-\log_a(y-2)" />
              </>
            }
          >
            <p>
              Dividing by <Katex tex="4" /> divides every term on the right:{' '}
              <Katex tex="x=\tfrac{b}{4}-\tfrac14\log_a(y-2)" />. Writing the bracket,{' '}
              <Katex tex="\tfrac14\bigl(b-\log_a(y-2)\bigr)" />, makes it hard to forget.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
