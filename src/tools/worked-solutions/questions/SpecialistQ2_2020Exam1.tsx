// 2020 Specialist Mathematics — Exam 1 Question 2 (4 marks). A definite integral that a
// linear substitution turns into two power rules. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [26, 14, 17, 16, 28],
  average: 2.1,
  comment: (
    <>
      The most straightforward way to evaluate this integral was to use the linear substitution{' '}
      <Katex tex="u=1-x" /> leading to the integral{' '}
      <Katex tex="\displaystyle-\int_2^1\frac{2-u}{\sqrt u}\,du=\int_1^2\frac{2-u}{\sqrt u}\,du" />
      <br />
      Other substitutions were possible (for example, <Katex tex="u=\sqrt{1-x}" />) but were not
      often carried out correctly by students.
      <br />
      A number of students split the integral into two:{' '}
      <Katex tex="\displaystyle\int_{-1}^0\frac{1}{\sqrt{1-x}}\,dx+\int_{-1}^0\frac{x}{\sqrt{1-x}}\,dx" />.
      <br />
      This does not simplify the problem and a substitution is still required in this case.
      Various errors with exponents and with arithmetic were observed. Students are reminded to include a '<Katex tex="dx" />' or{' '}
      '<Katex tex="du" />' as appropriate in the integral.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 1-x \implies x = 1-u, \quad du = -dx" />,
    reason: <>The awkward part is the <Katex tex="\sqrt{1-x}" /> downstairs, so make that the substitution. Linear, so the rearrangement is easy both ways.</>,
  },
  {
    working: <Katex display tex="1+x = 1+(1-u) = 2-u" />,
    reason: <>Rewriting the numerator in <Katex tex="u" /> too — everything must change variable, including <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="x = -1 \Rightarrow u = 2; \quad x = 0 \Rightarrow u = 1" />,
    reason: <>Change the terminals now and there is no need to substitute back at the end. Note they come out reversed.</>,
  },
  {
    working: <Katex display tex="\int_{-1}^{0}\frac{1+x}{\sqrt{1-x}}\,dx = \int_{2}^{1}\frac{2-u}{\sqrt u}(-du) = \int_{1}^{2}\frac{2-u}{\sqrt u}\,du" />,
    reason: <>The minus sign flips the terminals back into increasing order.</>,
  },
  {
    working: <Katex display tex="= \int_1^2\left(2u^{-1/2}-u^{1/2}\right)du" />,
    reason: <>Splitting over the denominator turns one hard integral into two power rules — this is the step the substitution was for.</>,
  },
  {
    working: <Katex display tex="= \left[4u^{1/2}-\tfrac23u^{3/2}\right]_1^2" />,
    reason: <>Antidifferentiating: <Katex tex="\int 2u^{-1/2}du=4u^{1/2}" /> and <Katex tex="\int u^{1/2}du=\tfrac23u^{3/2}" />.</>,
  },
  {
    working: <Katex display tex="= \left(4\sqrt2-\tfrac23\cdot2\sqrt2\right)-\left(4-\tfrac23\right)" />,
    reason: <><Katex tex="2^{3/2}=2\sqrt2" />. Watch the bracket around the lower terminal.</>,
  },
  {
    working: <Katex display tex="= 4\sqrt2-\tfrac{4\sqrt2}{3}-\tfrac{10}{3} = \tfrac{12\sqrt2-4\sqrt2}{3}-\tfrac{10}{3}" />,
    reason: <>Common denominator 3.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\sqrt2-10}{3}}" />,
    reason: <>In the required form <Katex tex="a\sqrt b+c" /> with <Katex tex="a=\tfrac83" />, <Katex tex="b=2" />, <Katex tex="c=-\tfrac{10}{3}" />. About 0.44.</>,
  },
]

export default function SpecialistQ2_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_{-1}^{0}\frac{1+x}{\sqrt{1-x}}\,dx" />. Give
          your answer in the form <Katex tex="a\sqrt b+c" />, where{' '}
          <Katex tex="a,b,c\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            There is no antiderivative to recognise here, so the whole question is choosing a
            substitution and carrying it through cleanly. The denominator is the only
            difficult feature, so it is the thing to substitute for.
          </p>
          <p>
            Splitting the integral into <Katex tex="\int\frac{1}{\sqrt{1-x}}dx" /> and{' '}
            <Katex tex="\int\frac{x}{\sqrt{1-x}}dx" /> first is a false economy: the second
            piece still needs the same substitution, and you now do the work twice.
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
