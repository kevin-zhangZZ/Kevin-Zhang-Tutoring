// 2016 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 15% of students
// answered this correctly — the hardest MCQ in the 2014-2016 Methods Exam 2 papers.
// Discrete probability distribution with two unknowns; find the range of possible E(X).
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a+b+b+2b+0.2 = 1 \;\implies\; a+4b = 0.8" />,
    reason: 'All probabilities in the table must sum to 1.',
  },
  {
    working: (
      <Katex
        display
        tex="\mathrm{E}(X) = (-1)a + (0)b + (b)(b) + (2b)(2b) + (4)(0.2) = -a+5b^2+0.8"
      />
    ),
    reason: <>Substitute each <Katex tex="x" /> value and its probability into <Katex tex="\mathrm{E}(X)=\sum x\Pr(X=x)" />.</>,
  },
  {
    working: <Katex display tex="a = 0.8-4b \;\implies\; \mathrm{E}(X) = -(0.8-4b)+5b^2+0.8 = 5b^2+4b" />,
    reason: 'Eliminate a using the constraint from the first line, leaving E(X) as a function of b alone.',
  },
  {
    working: <Katex display tex="a\ge 0 \;\implies\; 0.8-4b\ge 0 \;\implies\; b\le 0.2, \qquad b\ge 0" />,
    reason: <>Both <Katex tex="a" /> and <Katex tex="b" /> are probabilities, so both must be <Katex tex="\ge 0" />. This pins down the domain of <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{db}\bigl(5b^2+4b\bigr) = 10b+4 > 0 \quad \text{for all } b\ge 0" />,
    reason: <><Katex tex="\mathrm{E}(X)=5b^2+4b" /> is strictly increasing on <Katex tex="[0,0.2]" />, so its extreme values occur at the endpoints.</>,
  },
  {
    working: <Katex display tex="b=0: \ \mathrm{E}(X)=0 \qquad b=0.2: \ \mathrm{E}(X)=5(0.2)^2+4(0.2)=0.2+0.8=1" />,
  },
  {
    working: <Katex display tex="\boxed{\text{smallest} = 0, \ \text{largest} = 1}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ19_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Consider the discrete probability distribution with random variable <Katex tex="X" /> shown in
            the table below.
          </p>
          <div className="overflow-x-auto">
            <table className="border-collapse text-center text-[13.5px] mx-auto">
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 font-semibold">x</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">−1</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">0</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="b" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="2b" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 font-semibold"><Katex tex="\Pr(X=x)" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="a" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="b" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="b" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="2b" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">0.2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">The smallest and largest possible values of <Katex tex="\mathrm{E}(X)" /> are respectively</p>
        </>
      }
      options={[
        { letter: 'A', content: <>−0.8 and 1</> },
        { letter: 'B', content: <>−0.8 and 1.6</> },
        { letter: 'C', content: <>0 and 2.4</> },
        { letter: 'D', content: <>0.2125 and 1</> },
        { letter: 'E', content: <>0 and 1</>, isAnswer: true },
      ]}
      rows={ROWS}
    />
  )
}
