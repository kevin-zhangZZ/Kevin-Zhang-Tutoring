// 2023 Specialist Mathematics — Exam 1 Question 2 (3 marks). The argument of a cube, done
// either by dividing the argument or by expanding. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [38, 14, 11, 37],
  average: 1.5,
  comment: (
    <>
      Some students used graphical approaches or expanded; for example,
      <br />
      <Katex tex="(b-i)^3=b^3-3b+\left(1-3b^2\right)i" />
      <br />
      If <Katex tex="\arg(z)=-\tfrac\pi2" /> then{' '}
      <Katex tex="b^3-3b=0\Rightarrow b=\sqrt3" /> since <Katex tex="b>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\arg\left(z^3\right) = 3\arg(z) \implies \arg\bigl((b-i)^3\bigr) = 3\arg(b-i)" />,
    reason: <>Arguments add under multiplication, so cubing triples the argument.</>,
  },
  {
    working: <Katex display tex="3\arg(b-i) = -\frac\pi2 \implies \arg(b-i) = -\frac\pi6" />,
    reason: <>Dividing by 3. Since <Katex tex="b>0" />, the point <Katex tex="b-i" /> is in the fourth quadrant, so an argument of <Katex tex="-\tfrac\pi6" /> is consistent and no <Katex tex="2\pi" /> adjustment is needed.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac\pi6\right) = \frac{-1}{b} \implies -\frac{1}{\sqrt3} = -\frac1b" />,
    reason: <>The argument's tangent is <Katex tex="\tfrac{\text{Im}}{\text{Re}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \sqrt3}" />,
    reason: <>Positive, as required.</>,
  },
  {
    working: <Katex display tex="\text{Or: } (b-i)^3 = \left(b^3-3b\right)+\left(1-3b^2\right)i" />,
    reason: <>Expanding with the binomial theorem is the alternative route the report mentions.</>,
  },
  {
    working: <Katex display tex="\arg(z) = -\frac\pi2 \implies \mathrm{Re}(z) = 0 \text{ and } \mathrm{Im}(z)<0" />,
    reason: <>A purely negative imaginary number. So <Katex tex="b^3-3b=b\left(b^2-3\right)=0" /> gives <Katex tex="b=\sqrt3" /> (rejecting <Katex tex="b=0" /> and <Katex tex="b=-\sqrt3" />), and then <Katex tex="1-3(3)=-8<0" /> ✓ — the sign check matters, or <Katex tex="+\tfrac\pi2" /> would slip through.</>,
  },
]

export default function SpecialistQ2_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Consider the complex number <Katex tex="z=(b-i)^3" />, where{' '}
          <Katex tex="b\in R^+" />.
          <br />
          Find <Katex tex="b" /> given that{' '}
          <Katex tex="\arg(z)=-\dfrac\pi2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A power of a complex number is a job for polar form, because{' '}
            <Katex tex="\arg\left(z^n\right)=n\arg(z)" /> turns the cube into a division.
            Expanding <Katex tex="(b-i)^3" /> also works and is not much longer here, but it
            needs a sign check at the end that the polar route gets for free.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
