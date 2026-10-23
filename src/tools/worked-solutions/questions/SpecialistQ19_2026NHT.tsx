// 2026 Specialist NHT — Exam 2, MCQ 19. The NHT report gives the answer key and a short comment
// only, with no statistics. Vectors: the line of intersection of two planes; its direction is
// perpendicular to both normals (n₁ × n₂ = i + 3j + 5k), and its point lies on both planes. Question
// text transcribed from the original paper. Solution is original; the answer A agrees with the
// report's key. Checked: A's point satisfies both equations and its direction is perpendicular to
// both normals; B's and D's points lie on both planes but i − 3j + 5k is not perpendicular to
// either normal; C's point gives −1 ≠ 5 in the second plane.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: <>Solve equations simultaneously to find parametric solution.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n}_1=\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k},\qquad\underset{\sim}{n}_2=2\underset{\sim}{i}+\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>The line lies in both planes, so its direction is perpendicular to both normals. The normals come from the coefficients of <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{n}_1\times\underset{\sim}{n}_2&=\big((-2)(-1)-(1)(1)\big)\underset{\sim}{i}\\ &\quad-\big((1)(-1)-(1)(2)\big)\underset{\sim}{j}\\ &\quad+\big((1)(1)-(-2)(2)\big)\underset{\sim}{k}\\ &=\underset{\sim}{i}+3\underset{\sim}{j}+5\underset{\sim}{k}\end{aligned}" />,
    reason: <>The cross product of the two normals is perpendicular to both, so it is a direction vector for the line. Mind the minus sign on the <Katex tex="\underset{\sim}{j}" /> term.</>,
    more: <>Check: <Katex tex="(1,3,5)\cdot(1,-2,1)=1-6+5=0" /> and <Katex tex="(1,3,5)\cdot(2,1,-1)=2+3-5=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(2,-2,-3):\quad&2-2(-2)+(-3)=3\ \checkmark\\ &2(2)+(-2)-(-3)=5\ \checkmark\end{aligned}" />,
    reason: <>That direction rules out <b>B</b> and <b>D</b>, which use <Katex tex="\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}" />. Of <b>A</b> and <b>C</b>, the point must satisfy <em>both</em> plane equations. Option A&apos;s point does.</>,
  },
  {
    working: <Katex display tex="(1,1,4):\quad2(1)+1-4=-1\ne5" />,
    reason: <>Option C&apos;s point lies on the first plane (<Katex tex="1-2+4=3" />) but not the second, so its line is parallel to the true one but not on it.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{r}=2\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}+s(\underset{\sim}{i}+3\underset{\sim}{j}+5\underset{\sim}{k}),\ s\in R}" />,
    reason: <>Matches option <b>A</b>. The report&apos;s route also works: on CAS, <Cas fn="solve">solve(x − 2y + z = 3 and 2x + y − z = 5, {'{'}x, y, z{'}'})</Cas> gives the solutions with one free parameter, a parametric form of the same line.</>,
    more: <>Options <b>B</b> and <b>D</b> are a trap worth noticing: their points <Katex tex="(3,1,2)" /> and <Katex tex="(1,-5,-8)" /> really do lie on both planes, so checking the point alone is not enough. Their direction <Katex tex="\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}" /> is the cross product with the sign of the <Katex tex="\underset{\sim}{j}" /> term slipped, and it fails both dot-product checks.</>,
  },
]

export default function SpecialistQ19_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following vector equations describes the line of intersection of the planes given by{' '}
          <Katex tex="x-2y+z=3" /> and <Katex tex="2x+y-z=5" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\underset{\sim}{r}=2\underset{\sim}{i}-2\underset{\sim}{j}-3\underset{\sim}{k}+s(\underset{\sim}{i}+3\underset{\sim}{j}+5\underset{\sim}{k}),\ s\in R" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\underset{\sim}{r}=3\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}+s(\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}),\ s\in R" /> },
        { letter: 'C', content: <Katex tex="\underset{\sim}{r}=\underset{\sim}{i}+\underset{\sim}{j}+4\underset{\sim}{k}+s(\underset{\sim}{i}+3\underset{\sim}{j}+5\underset{\sim}{k}),\ s\in R" /> },
        { letter: 'D', content: <Katex tex="\underset{\sim}{r}=\underset{\sim}{i}-5\underset{\sim}{j}-8\underset{\sim}{k}+s(\underset{\sim}{i}-3\underset{\sim}{j}+5\underset{\sim}{k}),\ s\in R" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
