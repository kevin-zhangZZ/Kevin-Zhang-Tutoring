// 2026 Mathematical Methods NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Functions: which set is not a subset of the general solution of sin(2x) = √3/2. Question
// text transcribed from the original paper. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      The general solution (which can be found by hand or using CAS) is:
      <br />
      <Katex tex="x=\dfrac{\pi}{6}+k\pi" /> or <Katex tex="x=\dfrac{\pi}{3}+k\pi" />, where <Katex tex="k\in Z" />
      <br />
      Looking at each option:
      <br />
      <Katex tex="\left\{\dfrac{-2\pi}{3}+k\pi,\ k\in Z\right\}" /> is equivalent to <Katex tex="\left\{\dfrac{\pi}{3}+k\pi,\ k\in Z\right\}" />, so it is a subset of the general solution.
      <br />
      <Katex tex="\left\{\dfrac{\pi}{3}+2k\pi,\ k\in Z\right\}" /> is a subset of <Katex tex="\left\{\dfrac{\pi}{3}+k\pi,\ k\in Z\right\}" />, so it is a subset of the general solution.
      <br />
      <Katex tex="\left\{\dfrac{5\pi}{6}+k\pi,\ k\in Z\right\}" /> is <b>not</b> a subset of the general solution (notice <Katex tex="\dfrac{5\pi}{6}" /> is not a solution).
      <br />
      <Katex tex="\left\{\dfrac{7\pi}{6}+2k\pi,\ k\in Z\right\}" /> is a subset of <Katex tex="\left\{\dfrac{\pi}{6}+k\pi,\ k\in Z\right\}" />, so it is a subset of the general solution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x=\frac{\pi}{3}+2k\pi\ \text{ or }\ 2x=\frac{2\pi}{3}+2k\pi,\quad k\in Z" />,
    reason: <>Sine is <Katex tex="\tfrac{\sqrt3}{2}" /> at <Katex tex="\tfrac{\pi}{3}" /> (first quadrant) and at <Katex tex="\pi-\tfrac{\pi}{3}=\tfrac{2\pi}{3}" /> (second quadrant), and repeats every <Katex tex="2\pi" />. Solve for the angle <Katex tex="2x" /> first.</>,
    more: <>On CAS, <Cas fn="solve">solve(sin(2x)=√3/2, x)</Cas> returns the same two families, written with an arbitrary integer constant.</>,
  },
  {
    working: <Katex display tex="x=\frac{\pi}{6}+k\pi\ \text{ or }\ x=\frac{\pi}{3}+k\pi,\quad k\in Z" />,
    reason: <>Halve everything, including the <Katex tex="2k\pi" />: the solutions of <Katex tex="\sin(2x)" /> repeat every <Katex tex="\pi" />, its period.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }&-\tfrac{2\pi}{3}+k\pi=\tfrac{\pi}{3}+(k-1)\pi\ \checkmark\\\text{B: }&\tfrac{\pi}{3}+2k\pi\ \text{(even multiples of }\pi)\ \checkmark\\\text{D: }&\tfrac{7\pi}{6}+2k\pi=\tfrac{\pi}{6}+(2k+1)\pi\ \checkmark\end{aligned}" />,
    reason: <>A set is a subset if every member is a solution. A is the whole second family written from a different starting point; B and D pick out every second member of one family.</>,
  },
  {
    working: <Katex display tex="\text{C: }\sin\!\left(2\cdot\tfrac{5\pi}{6}\right)=\sin\!\left(\tfrac{5\pi}{3}\right)=-\tfrac{\sqrt3}{2}\neq\tfrac{\sqrt3}{2}" />,
    reason: <>Just testing one member is enough: <Katex tex="\tfrac{5\pi}{6}" /> is not a solution, so the set can&apos;t be a subset. (These <Katex tex="x" />-values solve <Katex tex="\sin(2x)=-\tfrac{\sqrt3}{2}" /> instead.)</>,
  },
  {
    working: <Katex display tex="\boxed{\left\{\tfrac{5\pi}{6}+k\pi,\ k\in Z\right\}}" />,
    reason: <>Matches option <b>C</b>. Watch the <b>not</b> in the question: the other three options are all genuine subsets.</>,
  },
]

export default function MethodsQ13_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Which set of <i>x</i>-values is <b>not</b> a subset of the general solution to <Katex tex="\sin(2x)=\dfrac{\sqrt3}{2}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left\{\dfrac{-2\pi}{3}+k\pi,\ k\in Z\right\}" /> },
        { letter: 'B', content: <Katex tex="\left\{\dfrac{\pi}{3}+2k\pi,\ k\in Z\right\}" /> },
        { letter: 'C', content: <Katex tex="\left\{\dfrac{5\pi}{6}+k\pi,\ k\in Z\right\}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\left\{\dfrac{7\pi}{6}+2k\pi,\ k\in Z\right\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
