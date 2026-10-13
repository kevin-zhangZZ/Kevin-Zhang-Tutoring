// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 21. VCAA examination report: 37% correct.
// Condition on a line and a parabola for them to never intersect, via the discriminant.
// Question text transcribed from the original paper; solution is original.
// Interactive (37% correct): interactives/meth-2015-mcq21-above-or-below.tsx — line vs the tangent of
// the same gradient, showing why the inequality flips with the sign of a (the trap behind option C).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Explore, lazyWidget } from '../Explore'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const AboveOrBelow = lazyWidget(() => import('../interactives/meth-2015-mcq21-above-or-below'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 20, C: 30, D: 37, E: 5 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="mx+c=ax^2" />, <Katex tex="ax^2-mx-c=0" />. The discriminant will be negative for
      no real solutions. Solve <Katex tex="m^2+4ac<0" /> for <Katex tex="c" />.{' '}
      <Katex tex="c<-\tfrac{m^2}{4a},\ a>0" /> and <Katex tex="c>-\tfrac{m^2}{4a},\ a<0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="mx+c = ax^2 \;\implies\; ax^2-mx-c=0" />,
    reason: <>Intersection points satisfy both rules, so set them equal and rearrange into a quadratic in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\Delta = (-m)^2-4(a)(-c) = m^2+4ac" />,
    reason: <>The number of intersections is the number of real solutions, which the discriminant <Katex tex="\Delta" /> decides.</>,
    more: (
      <>
        Careful with the letters: in this quadratic the coefficients are <Katex tex="a" />, <Katex tex="-m" /> and{' '}
        <Katex tex="-c" />, so the <Katex tex="c" /> of the line enters as <Katex tex="-c" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{no intersection} \iff \Delta<0" />
        <Katex display tex="\iff\; m^2+4ac<0 \iff 4ac < -m^2" />
      </>
    ),
    reason: 'No points of intersection means no real solutions, so the discriminant must be negative.',
  },
  {
    working: <Katex display tex="a<0 \;\implies\; c > -\frac{m^2}{4a}" />,
    reason: (
      <>
        Divide by <Katex tex="4a" /> to isolate <Katex tex="c" />. For <Katex tex="a<0" /> this flips the inequality; for{' '}
        <Katex tex="a>0" /> it would not, giving <Katex tex="c<-\tfrac{m^2}{4a}" />.
      </>
    ),
    more: (
      <>
        <p>
          The trap behind C (30%): C has D&apos;s inequality, <Katex tex="c>-\tfrac{m^2}{4a}" />, but pairs it with{' '}
          <Katex tex="a>0" />. When <Katex tex="a>0" />, dividing by <Katex tex="4a" /> keeps the sign, so <Katex tex="c" /> must
          be <em>below</em> <Katex tex="-\tfrac{m^2}{4a}" />. Students who chose C flipped anyway, or matched the flipped
          inequality with the wrong sign of <Katex tex="a" />.
        </p>
        <p>
          What the number means: <Katex tex="y=mx-\tfrac{m^2}{4a}" /> is the line of gradient <Katex tex="m" /> that just
          touches the parabola (<Katex tex="\Delta=0" />). A cap (<Katex tex="a<0" />) is missed by lines <em>above</em> that
          tangent; a cup (<Katex tex="a>0" />) by lines <em>below</em> it.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a<0 \ \text{and} \ c > -\dfrac{m^2}{4a}}" />,
    reason: <>Matches option <b>D</b>. C fails because <Katex tex="a>0" /> needs <Katex tex="c<-\tfrac{m^2}{4a}" /> instead.</>,
    more: (
      <>
        <p>
          &ldquo;For all values &hellip; such that&rdquo; means the condition must give no intersection for <em>every</em>{' '}
          <Katex tex="m" />, <Katex tex="c" />, <Katex tex="a" /> satisfying it, so one counterexample rules an option out.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>A</b>: <Katex tex="a=1,\ c=1,\ m=0" /> gives <Katex tex="\Delta=4>0" /> (the line <Katex tex="y=1" /> cuts{' '}
            <Katex tex="y=x^2" /> twice).
          </li>
          <li>
            <b>B</b>: <Katex tex="a=1,\ c=-1,\ m=3" /> gives <Katex tex="\Delta=9-4=5>0" />. It works for small{' '}
            <Katex tex="m" /> but not for all <Katex tex="m" />.
          </li>
          <li>
            <b>C</b>: <Katex tex="a>0" /> and <Katex tex="c>-\tfrac{m^2}{4a}" /> give <Katex tex="4ac>-m^2" />, so{' '}
            <Katex tex="\Delta>0" /> every time: always <em>two</em> intersections, the opposite of what is asked.
          </li>
          <li>
            <b>E</b>: <Katex tex="a=1,\ c=1,\ m=1" /> gives <Katex tex="\Delta=5>0" />.
          </li>
        </ul>
      </>
    ),
  },
]

export default function MethodsQ21_2015() {
  return (
    <MCQShell
      question={
        <p>
          The graphs of <Katex tex="y=mx+c" /> and <Katex tex="y=ax^2" /> will have no points of
          intersection for all values of <Katex tex="m" />, <Katex tex="c" /> and <Katex tex="a" /> such that
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a>0 \text{ and } c>0" /> },
        { letter: 'B', content: <Katex tex="a>0 \text{ and } c<0" /> },
        { letter: 'C', content: <Katex tex="a>0 \text{ and } c>-\dfrac{m^2}{4a}" /> },
        { letter: 'D', content: <Katex tex="a<0 \text{ and } c>-\dfrac{m^2}{4a}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="m>0 \text{ and } c>0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="A cap is missed from above its tangent, a cup from below">
          <AboveOrBelow />
        </Explore>
      }
    />
  )
}
