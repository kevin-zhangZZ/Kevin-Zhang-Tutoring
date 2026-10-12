// 2019 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 89% correct. The
// period and range of a scaled, shifted sine function. Question text transcribed from the
// original paper (no diagram). Solution is original; answer B agrees with the VCAA report and
// itute. Widget: meth-2019-mcq1-build builds the graph from y = sin x one number at a time,
// showing that only the 2/5 changes the period (with the π ÷ 2/5 half-cycle slip of D and E
// marked) and only the 3 and the −2 change the range. The report has no comment on this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BuildWidget = lazyWidget(() => import('../interactives/meth-2019-mcq1-build'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 89, C: 4, D: 4, E: 1 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \underbrace{3}_{\text{amplitude}}\sin\!\left(\underbrace{\tfrac25}_{n}\,x\right)\underbrace{-\,2}_{\text{shift down}}" />,
    reason: <>Each number changes one feature: the <Katex tex="3" /> sets how far the wave swings, <Katex tex="n=\tfrac25" /> sets the cycle length, and the <Katex tex="-2" /> moves the centre line.</>,
  },
  {
    working: <Katex display tex="\text{Period} = \dfrac{2\pi}{n} = \dfrac{2\pi}{2/5} = 2\pi\times\dfrac52 = 5\pi" />,
    reason: <>For <Katex tex="\sin(nx)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />: the angle <Katex tex="\tfrac{2x}{5}" /> completes a full turn of <Katex tex="2\pi" /> when <Katex tex="x=5\pi" />.</>,
    more: <>Because <Katex tex="n=\tfrac25" /> is less than 1, the graph is stretched sideways by <Katex tex="\tfrac52" />, so expect a period longer than <Katex tex="2\pi" />. Dividing by a fraction means multiplying by its reciprocal. The <Katex tex="3" /> and <Katex tex="-2" /> act on the output, so they can&apos;t change the period.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-1\le\sin\!\left(\dfrac{2x}{5}\right)\le1" />
        <Katex display tex="-3\le 3\sin\!\left(\dfrac{2x}{5}\right)\le3" />
        <Katex display tex="-5\le 3\sin\!\left(\dfrac{2x}{5}\right)-2\le1" />
      </>
    ),
    reason: <>Sine always lies between <Katex tex="-1" /> and <Katex tex="1" />; multiplying by <Katex tex="3" /> stretches that to <Katex tex="[-3,3]" />; subtracting <Katex tex="2" /> slides it down to <Katex tex="[-5,1]" />.</>,
    more: <>Equivalently: centre line <Katex tex="y=-2" />, swinging <Katex tex="3" /> either side. The domain is all of <Katex tex="R" />, so the graph reaches both ends of that interval.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 5\pi, \ \text{range} = [-5,1]}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option A&apos;s range <Katex tex="[-3,3]" /> leaves out the vertical shift; option C&apos;s <Katex tex="[-1,5]" /> shifts up <Katex tex="2" /> instead of down. Options D and E have period <Katex tex="\tfrac{5\pi}{2}=\pi\div\tfrac25" />, which uses <Katex tex="\pi" /> where the formula has <Katex tex="2\pi" />.</>,
  },
]

export default function MethodsQ1_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=3\sin\!\left(\dfrac{2x}{5}\right)-2" />. The
          period and range of <Katex tex="f" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="5\pi \text{ and } [-3,3]" /> },
        { letter: 'B', content: <Katex tex="5\pi \text{ and } [-5,1]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="5\pi \text{ and } [-1,5]" /> },
        { letter: 'D', content: <Katex tex="\tfrac{5\pi}{2} \text{ and } [-5,1]" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5\pi}{2} \text{ and } [-3,3]" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Only the 2/5 changes the period; only the 3 and the −2 change the range">
            <BuildWidget />
          </Explore>
          <WrongMethod
            title="The period is π divided by the number in front of x"
            source="4% chose D"
            working={<Katex display tex="\text{Period} = \dfrac{\pi}{2/5} = \dfrac{5\pi}{2} \quad \text{(option D)}" />}
          >
            <p>
              <Katex tex="\tfrac{\pi}{n}" /> is the period of <Katex tex="\tan(nx)" />; for sine and cosine it is{' '}
              <Katex tex="\tfrac{2\pi}{n}" />, because the angle has to turn through a full <Katex tex="2\pi" /> before the
              values repeat. Substituting catches it: at <Katex tex="x=\tfrac{5\pi}{2}" /> the angle is{' '}
              <Katex tex="\tfrac{2x}{5}=\pi" />, and <Katex tex="\sin\pi=0" />. The graph is back on its centre line, but
              heading down where it started heading up: only half a cycle. The angle reaches <Katex tex="2\pi" /> at{' '}
              <Katex tex="x=5\pi" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
