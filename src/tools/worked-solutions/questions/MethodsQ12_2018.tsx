// 2018 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 58% correct. The mean
// of a discrete random variable, then a strict inequality against it. Question text and the
// probability table transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 8, C: 13, D: 9, E: 58 },
  answer: 'E',
  noAnswer: 0,
}

const TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[13px] border-collapse">
      <tbody>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5"><Katex tex="x" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="0" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="1" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="2" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="3" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="6" /></td>
        </tr>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5"><Katex tex="\Pr(X=x)" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac14" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{9}{20}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{1}{10}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{1}{20}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{3}{20}" /></td>
        </tr>
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mu = E(X) = \sum x\Pr(X=x)" />,
    reason: <>The mean of a discrete random variable: multiply each value by its probability and add.</>,
  },
  {
    working: <Katex display tex="= 0\!\left(\tfrac14\right) + 1\!\left(\tfrac{9}{20}\right) + 2\!\left(\tfrac{1}{10}\right) + 3\!\left(\tfrac{1}{20}\right) + 6\!\left(\tfrac{3}{20}\right)" />,
    reason: <>Substituting the table. A quick check first: the probabilities sum to <Katex tex="\tfrac{5+9+2+1+3}{20}=1" /> ✓.</>,
  },
  {
    working: <Katex display tex="= \frac{0+9+4+3+18}{20} = \frac{34}{20}" />,
    reason: <>Everything over the common denominator <Katex tex="20" />.</>,
  },
  {
    working: <Katex display tex="\mu = \frac{17}{10}" />,
    reason: <>The mean is <Katex tex="1.7" />. Note it is not one of the values <Katex tex="X" /> can take — that is normal, and it is what makes the next step a clean cut.</>,
  },
  {
    working: <Katex display tex="\Pr(X<1.7) = \Pr(X=0)+\Pr(X=1)" />,
    reason: <>Strictly less than <Katex tex="1.7" />, so the values <Katex tex="0" /> and <Katex tex="1" /> qualify and <Katex tex="2" /> does not. Because <Katex tex="\mu" /> falls between two possible values, the strict and non-strict inequalities happen to agree here — but read the sign anyway, since that is not always true.</>,
  },
  {
    working: <Katex display tex="= \frac14 + \frac{9}{20} = \frac{5}{20}+\frac{9}{20}" />,
    reason: <>Common denominator again.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X<\mu) = \frac{7}{10}}" />,
    reason: <>Matches option <b>E</b>. (<Katex tex="\tfrac{14}{20}=\tfrac{7}{10}=0.7" />.) Option <b>D</b> <Katex tex="\left(\tfrac45=\tfrac{16}{20}\right)" /> adds <Katex tex="\Pr(X=2)" /> as well — that is <Katex tex="\Pr(X\le2)" /> — and option <b>C</b> <Katex tex="\left(\tfrac{17}{20}\right)" /> is <Katex tex="\Pr(X\le3)" />. Option <b>A</b> <Katex tex="\left(\tfrac12\right)" /> assumes the mean splits the distribution in half, which is true of a <em>median</em>, not a mean.</>,
  },
]

export default function MethodsQ12_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The discrete random variable <Katex tex="X" /> has the following probability
            distribution.
          </p>
          {TABLE}
          <p className="mt-3">
            Let <Katex tex="\mu" /> be the mean of <Katex tex="X" />.{' '}
            <Katex tex="\Pr(X<\mu)" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12" /> },
        { letter: 'B', content: <Katex tex="\dfrac14" /> },
        { letter: 'C', content: <Katex tex="\dfrac{17}{20}" /> },
        { letter: 'D', content: <Katex tex="\dfrac45" /> },
        { letter: 'E', content: <Katex tex="\dfrac{7}{10}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Mean is not median">
          <p>
            The lone value <Katex tex="6" /> at the top of the table drags the mean upwards:
            it carries only <Katex tex="15\%" /> of the probability but contributes{' '}
            <Katex tex="\tfrac{18}{20}" /> of the <Katex tex="\tfrac{34}{20}" /> total. That
            is why <Katex tex="\mu=1.7" /> sits well above the most likely value.
          </p>
          <p>
            So <Katex tex="\Pr(X<\mu)" /> has no reason to be <Katex tex="\tfrac12" />. A mean
            balances the distribution by <em>leverage</em>, not by count; only a median splits
            the probability evenly.
          </p>
        </Background>
      }
    />
  )
}
