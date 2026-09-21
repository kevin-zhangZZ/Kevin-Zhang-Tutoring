// 2017 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 62% correct.
// Variance of a three-valued discrete random variable with parameter p. Question text
// transcribed from the original paper; answer verified with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 10, C: 9, D: 62, E: 4 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X)=(-1)p+0(2p)+1(1-3p)" />,
    reason: <>Each value times its probability. Note the probabilities do add to <Katex tex="p+2p+1-3p=1" />, as they must.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X)=1-4p" />,
    reason: <>Simplifying. This is option B — the trap for anyone who stops at the mean.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X^2)=(-1)^2p+0^2(2p)+1^2(1-3p)" />,
    reason: <>Square the <em>values</em>, keep the probabilities. Squaring <Katex tex="-1" /> is what makes this different from the mean.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X^2)=p+1-3p=1-2p" />,
    reason: <>Simplifying.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X)=\mathrm{E}(X^2)-\bigl(\mathrm{E}(X)\bigr)^2 = (1-2p)-(1-4p)^2" />,
    reason: <>The standard formula from the formula sheet.</>,
  },
  {
    working: <Katex display tex="=1-2p-\bigl(1-8p+16p^2\bigr)" />,
    reason: <>Expanding the square. The bracket matters — every term inside it changes sign.</>,
  },
  {
    working: <Katex display tex="\boxed{6p-16p^2}" />,
    reason: <>Option D. Sanity check at <Katex tex="p=\tfrac14" />: the distribution is <Katex tex="\tfrac14,\tfrac12,\tfrac14" /> on <Katex tex="-1,0,1" />, variance <Katex tex="\tfrac12" />, and <Katex tex="6(\tfrac14)-16(\tfrac1{16})=\tfrac32-1=\tfrac12" /> ✓.</>,
  },
]

export default function MethodsQ14_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The random variable <Katex tex="X" /> has the following probability distribution,
            where <Katex tex="0<p<\tfrac13" />.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="text-[13px] tabular-nums border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="x" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="-1" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="0" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="1" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="\Pr(X=x)" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="2p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="1-3p" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The variance of <Katex tex="X" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2p(1-3p)" /> },
        { letter: 'B', content: <Katex tex="1-4p" /> },
        { letter: 'C', content: <Katex tex="(1-3p)^2" /> },
        { letter: 'D', content: <Katex tex="6p-16p^2" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="p(5-9p)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
