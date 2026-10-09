// 2023 Mathematical Methods — Exam 1 Question 2 (3 marks). An exponential equation that is
// a hidden quadratic, with one root that must be discarded. Question text transcribed from
// the original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [29, 2, 13, 56],
  average: 2.0,
  comment: (
    <>
      This question required students to solve an exponential equation by treating it as a
      quadratic equation in terms of <Katex tex="e^x" />. The most direct approach was to form
      a quadratic equation set equal to zero, use the null factor law to factorise and then
      solve. Some students chose to use the quadratic formula, albeit not always successfully.
      Most students set up the quadratic equation correctly, however, some students did not
      proceed to factorise and solve. Some students arrived at both <Katex tex="e^x=6" /> or{' '}
      <Katex tex="e^x=-2" /> and then gave <Katex tex="x=\log_e(6)" /> and{' '}
      <Katex tex="x=\log_e(-2)" /> as their solutions without discarding{' '}
      <Katex tex="\log_e(-2)" />. Students need to keep in mind that{' '}
      <Katex tex="\log_e(a)" /> only exists for <Katex tex="a>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="e^{2x}-12 = 4e^x \implies e^{2x}-4e^x-12 = 0" />,
    reason: (
      <>
        Subtract <Katex tex="4e^x" /> from both sides so the right side is <Katex tex="0" /> —
        factorising and the null factor law only work on an equation equal to zero. The terms
        are now <Katex tex="e^{2x}" />, <Katex tex="e^x" /> and a constant: the pattern of a
        quadratic.
      </>
    ),
    more: (
      <>
        Why not take <Katex tex="\log_e" /> of both sides straight away? Because{' '}
        <Katex tex="\log_e" /> does not split over a sum or difference:{' '}
        <Katex tex="\log_e\left(e^{2x}-12\right)" /> is not <Katex tex="2x-\log_e(12)" />. With
        two different powers of <Katex tex="e" /> plus a constant, the way in is the quadratic
        pattern, not logs.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Let } m = e^x: \quad m^2-4m-12 = 0" />,
    reason: (
      <>
        <Katex tex="e^{2x}=\left(e^x\right)^2" /> by the index law{' '}
        <Katex tex="\left(a^p\right)^q=a^{pq}" />, so <Katex tex="e^{2x}=m^2" />. The
        substitution turns the equation into an ordinary quadratic in <Katex tex="m" />.
      </>
    ),
  },
  {
    working: <Katex display tex="(m-6)(m+2) = 0 \implies m = 6 \ \text{ or } \ m = -2" />,
    reason: (
      <>
        Factorise: <Katex tex="-6" /> and <Katex tex="2" /> multiply to <Katex tex="-12" /> and
        add to <Katex tex="-4" />. Then the null factor law: one bracket must equal zero.
      </>
    ),
    more: (
      <>
        Don't stop once the quadratic is written down — the report notes that some students set
        it up correctly but did not go on to factorise and solve. If the factors don't come to
        mind, the quadratic formula gives the same roots,{' '}
        <Katex tex="m=\frac{4\pm\sqrt{16+48}}{2}=\frac{4\pm8}{2}" />, but factorising is quicker
        and safer here: the report notes that students who chose the quadratic formula were not
        always successful with it.
      </>
    ),
  },
  {
    working: <Katex display tex="e^x = 6 \quad\text{or}\quad e^x = -2" />,
    reason: (
      <>
        Replace <Katex tex="m" /> with <Katex tex="e^x" /> again — <Katex tex="m" /> was only a
        stand-in, and the question asks for <Katex tex="x" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&e^x > 0 \text{ for all } x,\\ &\text{so } e^x = -2 \text{ has no solution}\end{aligned}"
      />
    ),
    reason: (
      <>
        The graph of <Katex tex="y=e^x" /> lies entirely above the <Katex tex="x" />-axis (its
        range is <Katex tex="(0,\infty)" />), so <Katex tex="e^x" /> can never equal a negative
        number. Write this line down: it is your reason for discarding the case.
      </>
    ),
    more: (
      <>
        The same fact in log form: <Katex tex="e^x=-2" /> would mean{' '}
        <Katex tex="x=\log_e(-2)" />, and <Katex tex="\log_e(a)" /> only exists for{' '}
        <Katex tex="a>0" />. The report notes some students gave both{' '}
        <Katex tex="x=\log_e(6)" /> and <Katex tex="x=\log_e(-2)" /> as solutions without
        discarding <Katex tex="\log_e(-2)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="e^x = 6 \implies \boxed{x = \log_e(6)}" />,
    reason: (
      <>
        Take <Katex tex="\log_e" /> of both sides: <Katex tex="\log_e" /> undoes{' '}
        <Katex tex="e^x" />, since <Katex tex="\log_e\left(e^x\right)=x" />. This is the only
        solution.
      </>
    ),
    more: (
      <>
        Check in the original equation: if <Katex tex="e^x=6" />, then{' '}
        <Katex tex="e^{2x}=\left(e^x\right)^2=36" />, and <Katex tex="36-12=24=4\times6" /> ✓.
      </>
    ),
  },
]

export default function MethodsQ2_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Solve <Katex tex="e^{2x}-12=4e^x" /> for <Katex tex="x\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Whenever an equation contains only <Katex tex="e^{2x}" />, <Katex tex="e^{x}" /> and
            constants, it is a quadratic in disguise, because{' '}
            <Katex tex="e^{2x}=\left(e^x\right)^2" />: one power is the square of the other. The
            method is always the same: substitute <Katex tex="m=e^x" />, solve the quadratic for{' '}
            <Katex tex="m" />, then set <Katex tex="e^x" /> equal to each root and solve for{' '}
            <Katex tex="x" />. Because <Katex tex="e^x" /> is never zero or negative, a root{' '}
            <Katex tex="m\le0" /> gives no value of <Katex tex="x" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
