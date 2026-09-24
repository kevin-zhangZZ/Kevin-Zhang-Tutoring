// 2022 Specialist Mathematics — Exam 1 Question 4 (4 marks). A rational integrand that
// splits without partial fractions if you spot the right regrouping. Question text
// transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [21, 6, 7, 29, 36],
  average: 2.5,
  comment: (
    <>
      The appropriate partial fraction decomposition for the integrand was
      <Katex display tex="\frac{3x^2+4x+12}{x\left(x^2+4\right)}\equiv\frac Ax+\frac{Bx+C}{x^2+4}" />
      A small number of students realised that
      <Katex display tex="\begin{aligned}\frac{3x^2+4x+12}{x\left(x^2+4\right)}&=\frac{3x^2+12}{x\left(x^2+4\right)}+\frac{4x}{x\left(x^2+4\right)}\\&=\frac3x+\frac{4}{x^2+4}\end{aligned}" />
      This removed the need to use partial fractions. Many students used elements of both
      the above methods with some initial algebraic work followed by one or more
      applications of partial fractions. Such approaches were inefficient and often resulted
      in students doing significantly more work than would otherwise be required.
      <br />
      A number of students did not include absolute value signs in the logarithmic term or
      failed to include the arbitrary constant in their answer. A small number of students
      integrated <Katex tex="\tfrac{4}{x^2+4}" /> incorrectly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{3x^2+4x+12}{x\left(x^2+4\right)} = \frac{\left(3x^2+12\right)+4x}{x\left(x^2+4\right)}" />,
    reason: <>The trick of the question: <Katex tex="3x^2+12=3\left(x^2+4\right)" />, so part of the numerator is a multiple of a factor already in the denominator.</>,
  },
  {
    working: <Katex display tex="= \frac{3\left(x^2+4\right)}{x\left(x^2+4\right)}+\frac{4x}{x\left(x^2+4\right)} = \frac{3}{x}+\frac{4}{x^2+4}" />,
    reason: <>Each fraction cancels. No partial fractions needed — though setting up <Katex tex="\tfrac Ax+\tfrac{Bx+C}{x^2+4}" /> gives the same <Katex tex="A=3" />, <Katex tex="B=0" />, <Katex tex="C=4" />.</>,
  },
  {
    working: <Katex display tex="\int\frac{3}{x}\,dx = 3\log_e|x|+c_1" />,
    reason: <>The absolute value matters: <Katex tex="x" /> can be negative here, and the report calls out students who dropped it.</>,
  },
  {
    working: <Katex display tex="\int\frac{4}{x^2+4}\,dx = 4\cdot\frac{1}{2}\arctan\!\left(\frac{x}{2}\right)+c_2 = 2\arctan\!\left(\frac{x}{2}\right)+c_2" />,
    reason: <>Formula sheet: <Katex tex="\int\tfrac{1}{a^2+x^2}dx=\tfrac1a\arctan\!\left(\tfrac xa\right)" /> with <Katex tex="a=2" />. The <Katex tex="\tfrac12" /> is easy to lose.</>,
  },
  {
    working: <Katex display tex="\boxed{3\log_e|x|+2\arctan\!\left(\frac{x}{2}\right)+c}" />,
    reason: <>Differentiating back gives <Katex tex="\tfrac3x+2\cdot\tfrac{1}{1+x^2/4}\cdot\tfrac12=\tfrac3x+\tfrac{4}{x^2+4}" />. Include the <Katex tex="+c" /> — the report notes some students failed to.</>,
  },
]

export default function SpecialistQ4_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Find <Katex tex="\displaystyle\int\frac{3x^2+4x+12}{x\left(x^2+4\right)}\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Before reaching for partial fractions, look at the numerator and ask whether any
            part of it is a multiple of a factor of the denominator. Here{' '}
            <Katex tex="3x^2+12" /> is exactly <Katex tex="3\left(x^2+4\right)" />, so
            splitting the numerator does in one line what partial fractions does in five.
            The report notes that mixing the two methods "often resulted in students doing
            significantly more work than would otherwise be required".
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
