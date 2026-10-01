// 2023 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 74% correct.
// Perpendicular planes have perpendicular normals. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 74, D: 7, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{n_1} &= 2\underset{\sim}{i}-k\underset{\sim}{j}+3\underset{\sim}{k}\\ \underset{\sim}{n_2} &= 2k\underset{\sim}{i}+3\underset{\sim}{j}-2\underset{\sim}{k}\end{aligned}" />,
    reason: <>In a Cartesian equation <Katex tex="ax+by+cz=d" />, the coefficients <Katex tex="a" />, <Katex tex="b" />, <Katex tex="c" /> are the components of a normal vector — a vector at right angles to the plane. (The number <Katex tex="k" /> in the question has nothing to do with the unit vector <Katex tex="\underset{\sim}{k}" />.)</>,
  },
  {
    working: <Katex display tex="\text{Planes perpendicular} \iff \underset{\sim}{n_1}\cdot\underset{\sim}{n_2} = 0" />,
    reason: <>Each normal sticks straight out of its own plane, so the two planes meet at right angles exactly when their normals do. Two vectors are perpendicular when their dot product is 0.</>,
  },
  {
    working: <Katex display tex="(2)(2k)+(-k)(3)+(3)(-2) = 0" />,
    reason: <>Multiply the matching <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{k}" /> components and add.</>,
  },
  {
    working: <Katex display tex="4k-3k-6 = 0 \implies k-6 = 0" />,
    reason: <>Collect the <Katex tex="k" /> terms: <Katex tex="4k-3k=k" />, so the equation is linear in <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 6}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="(2,-6,3)\cdot(12,3,-2)=24-18-6=0" /> ✓.</>,
  },
]

export default function SpecialistQ18_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            What value of <Katex tex="k" />, where <Katex tex="k\in R" />, will make
            the following planes perpendicular?
          </p>
          <Katex display tex="\begin{aligned}\Pi_1&:\ 2x-ky+3z = 1\\ \Pi_2&:\ 2kx+3y-2z = 4\end{aligned}" />
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="10" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
