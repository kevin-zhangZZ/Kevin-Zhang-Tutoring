// 2023 Mathematical Methods NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with
// no statistics. Probability: a binomial probability, exactly three odd numbers from five dice.
// Question text transcribed from the original paper. Solution is original; the answer B agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}\left(5,\tfrac12\right)" />,
    reason: <>Let <Katex tex="X" /> be the number of dice showing an odd number. Five independent dice, each either odd or not, with the same chance <Katex tex="\tfrac36=\tfrac12" /> of odd (1, 3 or 5) every time: a binomial distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(X=3)=\binom{5}{3}\left(\tfrac12\right)^3\left(\tfrac12\right)^2" />,
    reason: <>Binomial formula <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" />. The <Katex tex="\binom{5}{3}" /> counts which three of the five dice are the odd ones.</>,
    more: <>Each particular arrangement, such as odd-odd-odd-even-even, has the same probability, so multiply that probability by the number of arrangements. On CAS: <Cas fn="binomPdf">binomPdf(5, 0.5, 3)</Cas>.</>,
  },
  {
    working: <Katex display tex="\Pr(X=3)=10\times\frac{1}{32}=\frac{10}{32}" />,
    reason: <>Evaluate: <Katex tex="\binom53=\frac{5!}{3!\,2!}=10" /> arrangements, each with probability{' '}<Katex tex="\left(\tfrac12\right)^3\left(\tfrac12\right)^2=\left(\tfrac12\right)^5=\tfrac{1}{32}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X=3)=0.3125}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>E</b>, <Katex tex="0.03125=\tfrac{1}{32}" />, is the probability of one particular arrangement, leaving out the <Katex tex="\binom53" />. Option <b>C</b>, <Katex tex="0.15625=\tfrac{5}{32}" />, uses 5 arrangements instead of 10 (that is <Katex tex="\Pr(X=1)" /> or <Katex tex="\Pr(X=4)" />). Option <b>A</b>, 0.5, is the chance that a single die is odd. Check: by symmetry <Katex tex="\Pr(X=2)=\Pr(X=3)" />, and those two together are <Katex tex="\tfrac{20}{32}" /> of all outcomes, the most likely values for 5 fair trials ✓.</>,
  },
]

export default function MethodsQ10_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            A person rolls five fair, six-sided dice. The outcome for each of the dice rolls is independent of the outcome for any of the other dice rolls.
          </p>
          <p>
            What is the probability of an odd number landing face up on exactly three dice?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.5" /> },
        { letter: 'B', content: <Katex tex="0.3125" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.15625" /> },
        { letter: 'D', content: <Katex tex="0.03215" /> },
        { letter: 'E', content: <Katex tex="0.03125" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
