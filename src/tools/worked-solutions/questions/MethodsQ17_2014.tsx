// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 17. VCAA examination report: 50% correct.
// When a pair of simultaneous linear equations has no solution. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 50, C: 17, D: 10, E: 8 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="ax-3y = 5, \qquad 3x-ay = 8-a" />,
    reason: <>Each equation is a straight line. "No solution" means the lines never meet: parallel <em>and distinct</em>.</>,
    more: <>Two lines can meet once (different gradients), never (parallel, different intercepts), or everywhere (the same line). So showing the lines are parallel isn't enough: you must then check they aren't the same line.</>,
  },
  {
    working: <Katex display tex="y = \tfrac a3x-\tfrac53, \qquad y = \tfrac3ax-\tfrac{8-a}{a}" />,
    reason: <>Rearrange each into <Katex tex="y=mx+c" /> form to read off the gradients and <Katex tex="y" />-intercepts.</>,
    more: <>Dividing by <Katex tex="a" /> assumes <Katex tex="a\neq0" />. That case is safe to set aside: with <Katex tex="a=0" /> the first line is horizontal and the second vertical, so they meet once.</>,
  },
  {
    working: <Katex display tex="\tfrac a3 = \tfrac3a \implies a^2 = 9 \implies a = 3 \text{ or } a = -3" />,
    reason: <>Parallel means equal gradients. Each value must now be tested: are the lines distinct or the same?</>,
  },
  {
    working: <Katex display tex="a=3:\quad 3x-3y=5 \ \text{ and } \ 3x-3y=5" />,
    reason: <>The same equation twice, since <Katex tex="8-a=5" />. <em>Infinitely many</em> solutions, not none.</>,
  },
  {
    working: <Katex display tex="a=-3:\quad -3x-3y=5 \ \text{ and } \ 3x+3y=11" />,
    reason: <>Multiply the first by <Katex tex="-1" />: <Katex tex="3x+3y=-5" /> against <Katex tex="3x+3y=11" /> — parallel and distinct, so no solution.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -3}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option C (the most common wrong answer, 17%) stops at <Katex tex="a^2=9" /> without testing each value; <Katex tex="a=3" /> gives the same line, so infinitely many solutions. Option A picks that wrong value. Options D and E describe whole sets of <Katex tex="a" />, but for every <Katex tex="a\neq\pm3" /> the gradients differ and the lines meet exactly once. CAS check: <Cas fn="solve">solve(ax-3y=5 and 3x-ay=8-a, &#123;x,y&#125;)</Cas> gives <Katex tex="x=\frac{8}{a+3},\ y=\frac{a-5}{a+3}" />, undefined only at <Katex tex="a=-3" />. That general formula still gives a single point at <Katex tex="a=3" />, hiding the infinitely many solutions there — so test the equal-gradient cases by hand.</>,
  },
]

export default function MethodsQ17_2014() {
  return (
    <MCQShell
      question={
        <p>
          The simultaneous linear equations <Katex tex="ax-3y=5" /> and{' '}
          <Katex tex="3x-ay=8-a" /> have <b>no solution</b> for
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a = 3" /> },
        { letter: 'B', content: <Katex tex="a = -3" />, isAnswer: true },
        { letter: 'C', content: <>both <Katex tex="a=3" /> and <Katex tex="a=-3" /></> },
        { letter: 'D', content: <Katex tex="a \in R\setminus\{3\}" /> },
        { letter: 'E', content: <Katex tex="a \in R\setminus[-3,3]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
