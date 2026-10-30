// 2025 Specialist NHT — Exam 1, Question 3 (4 marks). The NHT report gives a sample answer only,
// with no statistics. Proof by mathematical induction that 2³ + 4³ + 6³ + … + (2n)³ = 2n²(n + 1)²
// for n ∈ N: base case n = 1, then the inductive step, factorising out 2(k + 1)² and recognising
// k² + 4k + 4 = (k + 2)². Question text transcribed from the original paper (read from a rendered
// page image; the 2025 paper has no text layer). The identity and the inductive-step algebra were
// checked with sympy (and the formula numerically for n = 1 to 19); the solution follows the same
// route as the report's sample answer. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{Let } P(n) \text{ be the statement} \\ &2^3+4^3+\dots+(2n)^3=2n^2(n+1)^2 \end{aligned}" />,
    reason: <>Name the statement, so each step can say which case it is about.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n=1:\quad \text{LHS}&=2^3=8 \\ \text{RHS}&=2\times1^2\times2^2=8 \\ &\therefore P(1)\text{ is true} \end{aligned}" />,
    reason: <><b>Base case.</b> With <Katex tex="n=1" /> the sum has just one term, <Katex tex="(2\times1)^3" />. Evaluate both sides separately and show they agree.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Assume } P(k) \text{ is true for some } k\in N: \\ &2^3+4^3+\dots+(2k)^3=2k^2(k+1)^2 \end{aligned}" />,
    reason: <><b>Inductive hypothesis.</b> Assume the statement for a particular <Katex tex="k" />; we must use it to prove the next case.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Want } P(k+1): \\ &2^3+\dots+(2k)^3+\big(2(k+1)\big)^3 \\ &\quad=2(k+1)^2(k+2)^2 \end{aligned}" />,
    reason: <>Write down the target by replacing <Katex tex="n" /> with <Katex tex="k+1" /> on both sides: <Katex tex="2(k+1)^2\big((k+1)+1\big)^2" />. Knowing where you are heading tells you how to factorise below.</>,
    more: <>The sum for <Katex tex="k+1" /> is the sum for <Katex tex="k" /> plus exactly one new term, the <Katex tex="(k+1)" />th even number cubed, <Katex tex="\big(2(k+1)\big)^3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{LHS of } P(k+1) \\ &= 2^3+\dots+(2k)^3+\big(2(k+1)\big)^3 \\ &=2k^2(k+1)^2+8(k+1)^3 \end{aligned}" />,
    reason: <>Replace the first <Katex tex="k" /> terms with <Katex tex="2k^2(k+1)^2" />, using the inductive hypothesis. This is the step that makes it a proof by induction. The new last term simplifies as <Katex tex="\big(2(k+1)\big)^3=2^3(k+1)^3=8(k+1)^3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &=2(k+1)^2\big(k^2+4(k+1)\big) \\ &=2(k+1)^2\left(k^2+4k+4\right) \end{aligned}" />,
    reason: <>Don&apos;t expand. Both terms share the factor <Katex tex="2(k+1)^2" />, which is also in the target, so take it out: <Katex tex="8(k+1)^3=2(k+1)^2\cdot4(k+1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &=2(k+1)^2(k+2)^2 \\ &=\text{RHS of } P(k+1) \end{aligned}" />,
    reason: <><Katex tex="k^2+4k+4" /> is a perfect square, <Katex tex="(k+2)^2" />. So if <Katex tex="P(k)" /> is true, then <Katex tex="P(k+1)" /> is true.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\text{Since } P(1) \text{ is true and} \\ &P(k)\Rightarrow P(k+1), \text{ by induction} \\ &2^3+4^3+\dots+(2n)^3=2n^2(n+1)^2 \\ &\text{for all } n\in N. \end{aligned}}" />,
    reason: <><b>Conclusion.</b> State it in full: the base case starts the chain and the inductive step carries it from each case to the next. As required.</>,
    more: <>Check a case the proof didn&apos;t touch directly: <Katex tex="n=2" /> gives <Katex tex="8+64=72" /> and <Katex tex="2\times4\times9=72" /> ✓.</>,
  },
]

export default function SpecialistQ3_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (4 marks)</p>
        <p>
          Prove by mathematical induction that <Katex tex="2^3+4^3+6^3+\ldots+(2n)^3=2n^2(n+1)^2" />, where{' '}
          <Katex tex="n\in N" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A proof by induction has four pieces, and each earns marks: define the statement <Katex tex="P(n)" />; prove the{' '}
            <b>base case</b> <Katex tex="P(1)" />; assume <Katex tex="P(k)" /> and use that assumption to prove{' '}
            <Katex tex="P(k+1)" />; then write the conclusion.
          </p>
          <p>
            For a sum, the inductive step always goes the same way: the sum up to <Katex tex="k+1" /> is the sum up to{' '}
            <Katex tex="k" /> plus one new term. Replace the old sum by the assumed formula, then rearrange into the formula
            with <Katex tex="k+1" /> in place of <Katex tex="n" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Take the next term as (2k + 1)³"
          working={<Katex display tex="2k^2(k+1)^2+(2k+1)^3" />}
        >
          The terms are the even numbers cubed, so the next one after <Katex tex="(2k)^3" /> is{' '}
          <Katex tex="(2k+2)^3=\big(2(k+1)\big)^3" />: replace <Katex tex="n" /> by <Katex tex="k+1" /> inside the general
          term, not just add 1 somewhere. With <Katex tex="(2k+1)^3" /> the algebra never reaches{' '}
          <Katex tex="2(k+1)^2(k+2)^2" />, which is the signal that the new term is wrong.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
