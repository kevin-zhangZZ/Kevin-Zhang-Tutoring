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
        Read how <Katex tex="y" /> is built from <Katex tex="x" />: multiply by <Katex tex="-4" />, add{' '}
        <Katex tex="b" />, raise <Katex tex="a" /> to that power, then add <Katex tex="2" />. To get <Katex tex="x" />{' '}
        back, undo these in reverse order. The <Katex tex="+2" /> was done last, so it comes off first.
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
        Take <Katex tex="\log_a" /> of both sides (base <Katex tex="a" />, to match the base of the power). This undoes
        the power, by the definition <Katex tex="a^{k}=N \iff \log_a(N)=k" />.
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
        Matches option <b>A</b>. Dividing by <Katex tex="4" /> applies to the whole right-hand side, which the bracket
        shows; option D (11%) divides only the <Katex tex="b" />. Option B (14%) has <Katex tex="y+2" />, from moving the{' '}
        <Katex tex="2" /> across with the wrong sign.
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
              gives <Katex tex="y-2" />. Catch it with a point: with <Katex tex="a=2" />, <Katex tex="b=3" />,{' '}
              <Katex tex="x=\tfrac12" /> gives <Katex tex="y=2^1+2=4" />. Option B returns{' '}
              <Katex tex="\tfrac14(3-\log_2 6)\approx0.10" />, not <Katex tex="\tfrac12" />. Or use the asymptote: the answer
              must break down at <Katex tex="y=2" />, and <Katex tex="\log_a(y+2)" /> doesn&apos;t.
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
              <Katex tex="\tfrac14\bigl(b-\log_a(y-2)\bigr)" />, makes it hard to forget. The same point catches it: at{' '}
              <Katex tex="y=4" />, option D gives <Katex tex="\tfrac34-\log_2 2=-\tfrac14" />, not <Katex tex="\tfrac12" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
