// 2016 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 15% of students
// answered this correctly — the hardest MCQ on this paper.
// Discrete probability distribution with two unknowns; find the range of possible E(X).
// Question text transcribed from the original paper; solution is original.
// Interactive (15% correct): slide b along E(X) = 5b² + 4b and see which b keep every
// probability non-negative; options A, B and C come from b outside [0, 0.2].

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AllowedWidget = lazyWidget(() => import('../interactives/meth-2016-mcq19-allowed-b'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 25, C: 22, D: 20, E: 15 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="a+4b+0.2=1" />
      <br />
      <Katex tex="a+4b=0.8\ldots(1)" />
      <br />
      <Katex tex="\mathrm{E}(X)=-a+5b^2+0.8\ldots(2)" />
      <br />
      Substitute <Katex tex="0.8-4b" /> for <Katex tex="a" /> into (2).
      <br />
      <Katex tex="\mathrm{E}(X)=5b^2+4b,\ 0\le b\le0.2" />, maximum value of <Katex tex="b" />{' '}
      occurs when <Katex tex="a" /> is zero, <Katex tex="4b+0.2=1,\ b=0.2" />
      <br />
      The smallest value for <Katex tex="\mathrm{E}(X)" /> is 0 and the largest value is 1.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="a+b+b+2b+0.2 = 1" />
        <Katex display tex="\implies\; a+4b = 0.8" />
      </>
    ),
    reason: <>The probabilities in the table must sum to <Katex tex="1" />. This links the two unknowns <Katex tex="a" /> and <Katex tex="b" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \mathrm{E}(X) &= (-1)a + (0)b + (b)(b) \\ &\quad + (2b)(2b) + (4)(0.2) \\ &= -a+5b^2+0.8 \end{aligned}"
      />
    ),
    reason: <>Substitute each <Katex tex="x" /> value and its probability into <Katex tex="\mathrm{E}(X)=\sum x\Pr(X=x)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a = 0.8-4b" />
        <Katex display tex="\begin{aligned} \implies\; \mathrm{E}(X) &= -(0.8-4b)+5b^2+0.8 \\ &= 5b^2+4b \end{aligned}" />
      </>
    ),
    reason: <>Eliminate <Katex tex="a" /> using the first line, leaving <Katex tex="\mathrm{E}(X)" /> as a function of <Katex tex="b" /> alone.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a\ge 0" />
        <Katex display tex="\implies\; 0.8-4b\ge 0" />
        <Katex display tex="\implies\; b\le 0.2, \qquad b\ge 0" />
      </>
    ),
    reason: <>Both <Katex tex="a" /> and <Katex tex="b" /> are probabilities, so both must be <Katex tex="\ge 0" />. This pins down the domain of <Katex tex="b" />.</>,
    more: <>This is the step that decides the question. Without <Katex tex="a\ge0" /> and <Katex tex="b\ge0" />, <Katex tex="5b^2+4b" /> has no proper bounds: no largest value at all, and a smallest value that needs a negative probability. Every probability in the table must lie between 0 and 1: <Katex tex="2b\le1" /> and the others hold automatically once <Katex tex="0\le b\le0.2" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{db}\bigl(5b^2+4b\bigr) = 10b+4 > 0 \quad \text{for all } b\ge 0" />,
    reason: <><Katex tex="\mathrm{E}(X)=5b^2+4b" /> is strictly increasing on <Katex tex="[0,0.2]" />, so its extreme values occur at the endpoints.</>,
  },
  {
    working: (
      <>
        <Katex display tex="b=0: \ \mathrm{E}(X)=0" />
        <Katex display tex="\begin{aligned} b=0.2: \ \mathrm{E}(X) &= 5(0.2)^2+4(0.2) \\ &= 0.2+0.8 \\ &= 1 \end{aligned}" />
      </>
    ),
    reason: <>Evaluate <Katex tex="\mathrm{E}(X)" /> at the two ends of <Katex tex="[0,0.2]" />. At <Katex tex="b=0.2" />, <Katex tex="a=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{smallest} = 0, \ \text{largest} = 1}" />,
    reason: <>Matches option <b>E</b>: both values come from <Katex tex="b" /> values that keep every probability <Katex tex="\ge0" />.</>,
    more: <>Options A and B (41% between them) give <Katex tex="-0.8" />, the minimum of <Katex tex="5b^2+4b" /> at <Katex tex="b=-0.4" />, where <Katex tex="\Pr(X=0)=b" /> would be negative. Option C's <Katex tex="2.4" /> is <Katex tex="\mathrm{E}(X)" /> at <Katex tex="b=0.4" />, where <Katex tex="a=0.8-4(0.4)=-0.8" />. B's <Katex tex="1.6" /> and D's <Katex tex="0.2125" /> match no endpoint of the allowed range: <Katex tex="1.6" /> is above the largest value <Katex tex="1" />, and <Katex tex="0.2125" /> is above the smallest value <Katex tex="0" /> (it is <Katex tex="\mathrm{E}(X)" /> at <Katex tex="b=0.05" />, which is allowed but not an end). Checking each option against <Katex tex="[0,1]" /> rules them out. The constraint <Katex tex="a\ge0" /> caps <Katex tex="b" /> at <Katex tex="0.2" />, and so caps <Katex tex="\mathrm{E}(X)" /> at <Katex tex="1" />.</>,
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
      examinerReport={EXAMINER}
      extras={
        <Explore title="E(X) = 5b² + 4b, but only 0 ≤ b ≤ 0.2 gives real probabilities">
          <AllowedWidget />
        </Explore>
      }
    />
  )
}
