// 2017 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 78% correct, no written
// comment. Average rate of change of x² − 2x over [1, a]. Question text transcribed from the
// original paper; solution is original. Answer A agrees with the report and itute.
// Interactive: meth-2017-mcq9-chord (slide a: the chord from (1, −1) to (a, f(a)) rises (a − 1)²
// over a run of a − 1, so its gradient is a − 1 and reaches 8 at a = 9; a toggle shows option D's
// f(a) = 8, the height, where the chord's gradient is only 3).
// WrongMethod: option D (solving f(a) = 8) — verified to give a = 4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ChordWidget = lazyWidget(() => import('../interactives/meth-2017-mcq9-chord'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 78, B: 4, C: 6, D: 8, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate} = \frac{f(a)-f(1)}{a-1}" />,
    reason: (
      <>
        Average rate of change is the gradient of the chord joining the endpoints: change in <Katex tex="f" /> over
        change in <Katex tex="x" />. It uses only the two end values, so no derivative is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="f(1)=1-2=-1,\qquad f(a)=a^2-2a" />,
    reason: <>Evaluate <Katex tex="f" /> at each end of the interval.</>,
  },
  {
    working: <Katex display tex="\frac{a^2-2a-(-1)}{a-1} = \frac{a^2-2a+1}{a-1}" />,
    reason: <>Careful with the double negative: <Katex tex="f(1)" /> is negative, so subtracting it adds <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="= \frac{(a-1)^2}{a-1} = a-1" />,
    reason: (
      <>
        <Katex tex="a^2-2a+1" /> is a perfect square, and a factor of <Katex tex="a-1" /> on top is what you&apos;d expect,
        since the numerator is <Katex tex="0" /> when <Katex tex="a=1" />. Cancelling is legitimate because{' '}
        <Katex tex="a>1" />, so <Katex tex="a-1\ne0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="a-1=8 \implies \boxed{a=9}" />,
    reason: (
      <>
        Matches option <b>A</b>. Check: <Katex tex="f(9)=81-18=63" /> and <Katex tex="f(1)=-1" />, so the chord gradient
        is <Katex tex="\tfrac{63-(-1)}{9-1}=\tfrac{64}{8}=8" />. Option D (8%) is <Katex tex="a=4" />, the solution of{' '}
        <Katex tex="f(a)=8" />.
      </>
    ),
  },
]

export default function MethodsQ9_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The average rate of change of the function with the rule{' '}
            <Katex tex="f(x)=x^2-2x" /> over the interval <Katex tex="[1,a]" />, where{' '}
            <Katex tex="a>1" />, is <Katex tex="8" />.
          </p>
          <p>
            The value of <Katex tex="a" /> is
          </p>
        </>
      }
      background={
        <Background title="Three “averages” that are easy to mix up">
          <p>
            <b>Average rate of change</b> over <Katex tex="[p,q]" />: <Katex tex="\frac{f(q)-f(p)}{q-p}" />, the gradient of
            the chord. <b>Instantaneous rate of change</b> at <Katex tex="x" />: <Katex tex="f'(x)" />, the gradient of the
            tangent. <b>Average value</b> over <Katex tex="[p,q]" />: <Katex tex="\frac{1}{q-p}\int_p^q f(x)\,dx" />, an
            average height.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="9" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="8" /> },
        { letter: 'C', content: <Katex tex="7" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="1+\sqrt{2}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Average rate of change is the gradient of a chord">
            <ChordWidget />
          </Explore>
          <WrongMethod
            title="Set f(a) = 8 and solve"
            source="8% chose D"
            working={
              <>
                <Katex display tex="a^2-2a=8" />
                <Katex display tex="(a-4)(a+2)=0 \implies a=4" />
              </>
            }
          >
            <p>
              The <Katex tex="8" /> is a gradient, not a height. <Katex tex="f(4)=8" /> says the curve is at height{' '}
              <Katex tex="8" /> when <Katex tex="x=4" />; the chord from <Katex tex="(1,-1)" /> to <Katex tex="(4,8)" /> has
              gradient <Katex tex="\tfrac93=3" />. A rate of change always has a difference on top and a difference
              underneath: <Katex tex="\frac{f(a)-f(1)}{a-1}" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
