// 2023 Specialist Mathematics — Exam 1 Question 8 (4 marks). Proof by induction for the nth
// derivative of x·e^(2x), new to the 2023 study design. Question text transcribed from the
// original paper. Result checked with sympy and against the VCAA examination report.
// Solution is original. Interactive (21% full marks): spec-2023e1-q8-next-derivative — the
// tangent to y = f^(k)(x) has gradient f^(k+1), with a toggle showing f^(k) × f′ failing.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const NextDerivative = lazyWidget(() => import('../interactives/spec-2023e1-q8-next-derivative'))

const EXAM: SAExaminerStats = {
  marks: [16, 17, 39, 9, 21],
  average: 2.1,
  comment: (
    <>
      Many students were able to begin the proof by showing the base step and making an
      assumption for the <Katex tex="k^{\text{th}}" /> case. Students were then required to
      differentiate <Katex tex="f^{(k)}(x)" /> with respect to <Katex tex="x" /> to show that the{' '}
      <Katex tex="(k+1)^{\text{th}}" /> case followed. A number of students either did not
      differentiate the function or differentiated incorrectly. Many students appeared to be
      thinking of index laws and assumed that <Katex tex="f^{(k+1)}(x)" /> was equal to{' '}
      <Katex tex="f^{(k)}(x)\times f'(x)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\textbf{Base step } (n=1): \\ &f'(x) = e^{2x}+2xe^{2x} = (2x+1)e^{2x}\end{aligned}" />,
    reason: <>Product rule with <Katex tex="u=x" /> and <Katex tex="v=e^{2x}" />, so <Katex tex="u'=1" /> and{' '}
      <Katex tex="v'=2e^{2x}" />. Then take out the common factor <Katex tex="e^{2x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Formula at } n=1: \\ &\left(2^1x+1\cdot2^{0}\right)e^{2x} = (2x+1)e^{2x}\end{aligned}" />,
    reason: <>The two agree, so the statement is true for <Katex tex="n=1" />. Say so explicitly.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\textbf{Inductive hypothesis:} \\ &\text{assume true for } n=k, \ k\in Z^+, \\ &\text{i.e. } f^{(k)}(x) = \left(2^kx+k\,2^{k-1}\right)e^{2x}\end{aligned}" />,
    reason: <>State the assumption in full, as the report&apos;s sample proof does: it is the expression you will differentiate in the next step.</>,
  },
  {
    working: <Katex display tex="f^{(k+1)}(x) = \frac{d}{dx}\left[\left(2^kx+k\,2^{k-1}\right)e^{2x}\right]" />,
    reason: <>The <Katex tex="(k+1)" />th derivative is the derivative of the <Katex tex="k" />th: differentiate the assumed
      expression once more. The <Katex tex="(k)" /> counts differentiations; it is not a power, so{' '}
      <Katex tex="f^{(k+1)}(x)" /> is <em>not</em> <Katex tex="f^{(k)}(x)\times f'(x)" />, which the report notes many students
      assumed.</>,
  },
  {
    working: <Katex display tex="= 2^ke^{2x}+2\left(2^kx+k\,2^{k-1}\right)e^{2x}" />,
    reason: <>Product rule again, with <Katex tex="u=2^kx+k\,2^{k-1}" /> and <Katex tex="v=e^{2x}" />. Here{' '}
      <Katex tex="k" /> is a fixed number, so <Katex tex="2^k" /> and <Katex tex="k\,2^{k-1}" /> are constants:{' '}
      <Katex tex="u'=2^k" /> and <Katex tex="v'=2e^{2x}" />.</>,
  },
  {
    working: <Katex display tex="= \left(2^{k+1}x+k\,2^{k}+2^{k}\right)e^{2x}" />,
    reason: <>Take out <Katex tex="e^{2x}" /> and use index laws: <Katex tex="2\cdot2^kx=2^{k+1}x" /> and{' '}
      <Katex tex="2\cdot k\,2^{k-1}=k\,2^{k}" />. The <Katex tex="2^k" /> from the first term joins them.</>,
  },
  {
    working: <Katex display tex="= \left(2^{k+1}x+(k+1)2^{(k+1)-1}\right)e^{2x}" />,
    reason: <>Factorise <Katex tex="k\,2^k+2^k=(k+1)2^k" />, and write <Katex tex="2^k" /> as{' '}
      <Katex tex="2^{(k+1)-1}" /> so the match is plain to see. This is the formula with <Katex tex="n=k+1" />, so the
      statement is true for <Katex tex="n=k+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{True for } n=1, \text{ and} \\ &\text{true for } n=k \implies \text{true for } n=k+1, \\ &\text{so by mathematical induction} \\ &\text{it is true for all } n\in Z^+.\end{aligned}}" />,
    reason: <>The conclusion is part of the proof: true for <Katex tex="n=1" />, so for <Katex tex="n=2" />, so for{' '}
      <Katex tex="n=3" />, and so on for every positive integer. As required.</>,
  },
]

export default function SpecialistQ8_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>
          A function <Katex tex="f" /> has the rule <Katex tex="f(x)=x\,e^{2x}" />.
          <br />
          Use mathematical induction to prove that{' '}
          <Katex tex="f^{(n)}(x)=\left(2^nx+n\,2^{n-1}\right)e^{2x}" /> for{' '}
          <Katex tex="n\in Z^+" />, where <Katex tex="f^{(n)}(x)" /> represents the{' '}
          <Katex tex="n^{\text{th}}" /> derivative of <Katex tex="f(x)" />. That is,{' '}
          <Katex tex="f(x)" /> has been differentiated <Katex tex="n" /> times.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Proof by induction is new to the 2023 study design, and it has a fixed shape:
            base step, hypothesis, inductive step, conclusion. The base step shows the
            statement is true for <Katex tex="n=1" />; the inductive step shows that whenever it
            is true for some <Katex tex="n=k" />, it is also true for <Katex tex="n=k+1" />.
            Together they give <Katex tex="n=1, 2, 3, \ldots" /> in turn. The report's sample
            proof has all four parts, so write each even when it is a single line.
          </p>
          <p>
            The inductive step here is a single product rule. The one thing to watch is that
            "the next derivative" means <em>differentiate what you assumed</em> — the report
            notes many students assumed <Katex tex="f^{(k+1)}(x)=f^{(k)}(x)\times f'(x)" />, as
            if the <Katex tex="(k)" /> were a power.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title={<>The next derivative is the gradient of this one: <Katex tex="f^{(k+1)}" /> is not <Katex tex="f^{(k)}\times f'" /></>}>
          <NextDerivative />
        </Explore>
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
