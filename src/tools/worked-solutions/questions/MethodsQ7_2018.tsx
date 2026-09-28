// 2018 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 83% correct. Find k
// from an inverse-function value. Question text transcribed from the original paper; VCAA
// printed no diagram and neither does the stem here (guide §7). Answer checked with sympy;
// B agrees with the report and itute. Solution is original.
// Interactive: meth-2018-mcq7-reflect (slide k: f and f⁻¹ are mirror images in y = x, so f reaches
// (8, 1) at the same k as f⁻¹ reaches (1, 8); a toggle shows the wrong reading f(1) = 8 failing,
// since every f passes through (1, 0)). WrongMethod: reading f⁻¹(1) = 8 as f(1) = 8 (no source —
// the report has no comment on this question).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ReflectWidget = lazyWidget(() => import('../interactives/meth-2018-mcq7-reflect'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 83, C: 8, D: 6, E: 2 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1}(1) = 8 \iff f(8) = 1" />,
    reason: <>How would I know to do this? The question gives a value of <Katex tex="f^{-1}" /> but a rule for <Katex tex="f" />, so turn the statement round. An inverse swaps inputs and outputs (its graph is the reflection of <Katex tex="f" /> in <Katex tex="y=x" />), so the point <Katex tex="(1,8)" /> on <Katex tex="f^{-1}" /> is the point <Katex tex="(8,1)" /> on <Katex tex="f" />. This avoids ever finding <Katex tex="f^{-1}" /> itself.</>,
  },
  {
    working: <Katex display tex="f(8) = k\log_2(8) = 1" />,
    reason: <>Substituting <Katex tex="x=8" /> into the given rule for <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\log_2(8) = 3 \quad \left(2^3 = 8\right)" />,
    reason: <>Read a logarithm as "what power of the base gives this number?". No CAS needed.</>,
  },
  {
    working: <Katex display tex="3k = 1" />,
    reason: <>The equation is now linear in <Katex tex="k" />: divide both sides by <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac13}" />,
    reason: <>Matches option <b>B</b>. Option <b>C</b> <Katex tex="(3)" /> is the value one step before the end: <Katex tex="\log_2(8)" />, or equivalently <Katex tex="\tfrac1k" /> if you go via the inverse rule <Katex tex="f^{-1}(x)=2^{x/k}" /> and stop at <Katex tex="2^{1/k}=8" />. Check: <Katex tex="3k=1" /> means <Katex tex="k=\tfrac13" />, not <Katex tex="3" />.</>,
  },
]

export default function MethodsQ7_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R^+\to R,\ f(x)=k\log_2(x),\ k\in R" />.
          Given that <Katex tex="f^{-1}(1)=8" />, the value of <Katex tex="k" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\dfrac13" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Reading an inverse backwards">
          <p>
            Finding <Katex tex="f^{-1}" /> explicitly here would mean solving{' '}
            <Katex tex="y=k\log_2(x)" /> for <Katex tex="x" /> with an unknown{' '}
            <Katex tex="k" /> still in the way. That is slow, and unnecessary.
          </p>
          <p>
            Instead use the one fact that defines an inverse:{' '}
            <Katex tex="f^{-1}(b)=a" /> says exactly the same thing as{' '}
            <Katex tex="f(a)=b" />. On the graphs, the point <Katex tex="(b,a)" /> on{' '}
            <Katex tex="f^{-1}" /> and the point <Katex tex="(a,b)" /> on <Katex tex="f" /> are
            mirror images in <Katex tex="y=x" />. Flipping the given statement turns an inverse
            problem into a one-line substitution into <Katex tex="f" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why f⁻¹(1) = 8 puts the point (8, 1) on f">
            <ReflectWidget />
          </Explore>
          <WrongMethod
            title="f⁻¹(1) = 8 means f(1) = 8"
            working={
              <>
                <Katex display tex="k\log_2(1) = 8" />
                <Katex display tex="k\times 0 = 8 \quad \text{(no solution)}" />
              </>
            }
          >
            <p>
              This puts the given numbers into <Katex tex="f" /> the wrong way round. In{' '}
              <Katex tex="f^{-1}(1)=8" />, the <Katex tex="1" /> goes <em>into</em> the inverse and{' '}
              <Katex tex="8" /> comes out, so for <Katex tex="f" /> it is the other way:{' '}
              <Katex tex="8" /> goes in and <Katex tex="1" /> comes out. The equation catching you out is the
              giveaway: <Katex tex="\log_2(1)=0" /> for every base, so every <Katex tex="f" /> in this family
              passes through <Katex tex="(1,0)" /> and none can pass through <Katex tex="(1,8)" />. When an
              equation has no solution in a multiple-choice question, re-read the setup before picking an option.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
