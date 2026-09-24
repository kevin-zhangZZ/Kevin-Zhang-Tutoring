// 2024 Mathematical Methods — Exam 1 Question 6 (4 marks). A log equation that becomes a
// cubic, with two roots rejected by the implied domain. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [18, 52, 8, 13, 9],
  average: 1.5,
  comment: (
    <>
      Most students demonstrated a knowledge of the logarithm laws needed to simplify this
      question; however, many did not employ the correct combination of these laws. Of those
      students who were able to use all logarithm laws effectively, many students showed good
      progress in factorising the cubic to find the quadratic factor. Some students did not
      solve the resultant cubic and subsequent quadratic equation correctly. Some students
      incorrectly identified <Katex tex="(x+1)" /> or <Katex tex="x=-1" /> as a
      factor/solution. Although some students were able to find three possible solutions, many
      students overlooked the fact that the domain of this log function must be{' '}
      <Katex tex="x>4" /> and, as a result, did not reject the two invalid solutions. Some
      students managed to engage with the implied domain of the problem.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x-4>0 \ \text{ and } \ x>0 \implies x>4" />,
    reason: <>Write the implied domain down <em>first</em>. Both logarithms need positive arguments, and the stricter condition wins — this is what finishes the question.</>,
  },
  {
    working: <Katex display tex="2\log_3(x-4) = \log_3\left((x-4)^2\right)" />,
    reason: <>The power law. (On the restricted domain <Katex tex="x>4" /> there is no absolute-value subtlety.)</>,
  },
  {
    working: <Katex display tex="\log_3\left((x-4)^2\right)+\log_3(x) = \log_3\left(x(x-4)^2\right) = 2" />,
    reason: <>Then the addition law: logs of the same base add into a single log of a product.</>,
  },
  {
    working: <Katex display tex="x(x-4)^2 = 3^2 = 9" />,
    reason: <>Converting to index form.</>,
  },
  {
    working: <Katex display tex="x^3-8x^2+16x-9 = 0" />,
    reason: <>Expanding <Katex tex="x\left(x^2-8x+16\right)" /> and moving the 9 across.</>,
  },
  {
    working: <Katex display tex="P(1) = 1-8+16-9 = 0 \implies (x-1) \text{ is a factor}" />,
    reason: <>The factor theorem. <Katex tex="P(-1)=-1-8-16-9\ne0" />, so <Katex tex="(x+1)" /> is not a factor — the report notes some students identified it as one.</>,
  },
  {
    working: <Katex display tex="x^3-8x^2+16x-9 = (x-1)\left(x^2-7x+9\right) = 0" />,
    reason: <>Dividing out the known factor.</>,
  },
  {
    working: <Katex display tex="x = 1 \quad\text{or}\quad x = \frac{7\pm\sqrt{49-36}}{2} = \frac{7\pm\sqrt{13}}{2}" />,
    reason: <>Three candidate roots: <Katex tex="1" />, <Katex tex="1.697" /> and <Katex tex="5.303" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{7+\sqrt{13}}{2}}" />,
    reason: <>Only this one exceeds 4. The other two make <Katex tex="\log_3(x-4)" /> undefined, so they must be rejected explicitly — the report notes many students overlooked the domain and did not reject them.</>,
  },
]

export default function MethodsQ6_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (4 marks)</p>
        <p>
          Solve <Katex tex="2\log_3(x-4)+\log_3(x)=2" /> for <Katex tex="x" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Logarithm equations always come with a hidden domain, and this one is designed
            around it: the algebra produces three roots and two of them are impostors. Note
            the domain before you start, so that rejecting them at the end is a one-line step
            rather than an afterthought.
          </p>
          <p>
            The order of the log laws matters too. Apply the power law first{' '}
            (<Katex tex="2\log_3(x-4)=\log_3(x-4)^2" />), then the addition law; doing it the
            other way round produces a different, wrong, cubic.
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
