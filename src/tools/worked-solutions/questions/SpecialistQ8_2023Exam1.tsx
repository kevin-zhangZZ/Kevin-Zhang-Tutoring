// 2023 Specialist Mathematics — Exam 1 Question 8 (4 marks). Proof by induction for the nth
// derivative of x·e^(2x), new to the 2023 study design. Question text transcribed from the
// original paper. Result checked with sympy and against the VCAA examination report.
// Solution is original. Interactive (21% full marks): spec-2023e1-q8-next-derivative — the
// tangent to y = f^(k)(x) has gradient f^(k+1), with a toggle showing f^(k) × f′ failing.
// Concise/Detailed review (Oct 2026): working now states "true for n = 1" and "true for n = k + 1"
// as the report's sample proof does, and labels the inductive step; the index-law trap and the
// report's "differentiated incorrectly" comment are addressed in the `more` of rows 4 and 5.
// Final review: row 4's reason states the target (the formula at n = k + 1) before the algebra,
// row 6's reason says why the lone 2^k lands in the bracket, and repeats were trimmed (Background's
// "differentiate once more" sentence, row 3's second mention of the report's sample proof).

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
    reason: <>For <Katex tex="n=1" /> the left-hand side <Katex tex="f^{(1)}(x)" /> is just <Katex tex="f'(x)" />. Product
      rule with <Katex tex="u=x" /> and <Katex tex="v=e^{2x}" />, so <Katex tex="u'=1" /> and{' '}
      <Katex tex="v'=2e^{2x}" />. Then take out the common factor <Katex tex="e^{2x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Formula at } n=1: \\ &\left(2^1x+1\cdot2^{0}\right)e^{2x} = (2x+1)e^{2x} \\ &\text{so the statement is true for } n=1\end{aligned}" />,
    reason: <>Substitute <Katex tex="n=1" /> into the right-hand side of the formula. It matches the <Katex tex="f'(x)" /> just
      found, so write down that the statement is true for <Katex tex="n=1" />: that sentence is part of the base step.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\textbf{Inductive hypothesis:} \\ &\text{assume true for } n=k, \ k\in Z^+, \\ &\text{i.e. } f^{(k)}(x) = \left(2^kx+k\,2^{k-1}\right)e^{2x}\end{aligned}" />,
    reason: <>Assume the statement holds for some positive integer <Katex tex="k" />, and write out in full what that says:
      it is the expression you differentiate in the next step.</>,
    more: <>The letter changes on purpose: <Katex tex="n" /> stands for every positive integer in the statement you are proving, while{' '}
      <Katex tex="k" /> is one particular value you assume it already works for.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\textbf{Inductive step } (n=k+1): \\ &f^{(k+1)}(x) = \frac{d}{dx}\left[\left(2^kx+k\,2^{k-1}\right)e^{2x}\right]\end{aligned}" />,
    reason: <>The <Katex tex="(k+1)" />th derivative is the derivative of the <Katex tex="k" />th, so differentiate the
      assumed expression for <Katex tex="f^{(k)}(x)" /> once more. The aim is the formula with <Katex tex="n" /> replaced
      by <Katex tex="k+1" />: <Katex tex="\left(2^{k+1}x+(k+1)2^{k}\right)e^{2x}" />.</>,
    more: <>The <Katex tex="(k)" /> in <Katex tex="f^{(k)}" /> is not a power, so{' '}
      <Katex tex="f^{(k+1)}(x)" /> is <em>not</em> <Katex tex="f^{(k)}(x)\times f'(x)" />, the index-law shortcut the
      report says many students used. That product contains <Katex tex="e^{2x}\times e^{2x}=e^{4x}" />, which can never
      match the <Katex tex="e^{2x}" /> in the formula, so it cannot finish the proof.</>,
  },
  {
    working: <Katex display tex="= 2^ke^{2x}+2\left(2^kx+k\,2^{k-1}\right)e^{2x}" />,
    reason: <>Product rule again, with <Katex tex="u=2^kx+k\,2^{k-1}" /> and <Katex tex="v=e^{2x}" />. Here{' '}
      <Katex tex="k" /> is a fixed number, so <Katex tex="2^k" /> and <Katex tex="k\,2^{k-1}" /> are constants:{' '}
      <Katex tex="u'=2^k" /> and <Katex tex="v'=2e^{2x}" />.</>,
    more: <>The report notes that a number of students differentiated incorrectly at this point. Two easy slips: losing
      the factor <Katex tex="2" /> from differentiating <Katex tex="e^{2x}" />, and treating <Katex tex="2^k" /> or{' '}
      <Katex tex="k" /> as if they changed. Only <Katex tex="x" /> varies, so <Katex tex="u" /> is just a straight line
      in <Katex tex="x" /> with gradient <Katex tex="2^k" />, and the constant <Katex tex="k\,2^{k-1}" /> differentiates to{' '}
      <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="= \left(2^{k+1}x+k\,2^{k}+2^{k}\right)e^{2x}" />,
    reason: <>Take out <Katex tex="e^{2x}" /> and use index laws: <Katex tex="2\cdot2^kx=2^{k+1}x" /> and{' '}
      <Katex tex="2\cdot k\,2^{k-1}=k\,2^{k}" />. The first term <Katex tex="2^ke^{2x}" /> also has the factor <Katex tex="e^{2x}" />, so it
      leaves <Katex tex="+2^k" /> inside the bracket.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \left(2^{k+1}x+(k+1)2^{(k+1)-1}\right)e^{2x} \\ &\text{so the statement is true for } n=k+1\end{aligned}" />,
    reason: <>Factorise <Katex tex="k\,2^k+2^k=(k+1)2^k" />, and write <Katex tex="2^k" /> as{' '}
      <Katex tex="2^{(k+1)-1}" /> so the match is plain to see: this is the formula with <Katex tex="n" /> replaced
      by <Katex tex="k+1" />.</>,
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
            The notation: the bracketed number in <Katex tex="f^{(n)}(x)" /> says how many times{' '}
            <Katex tex="f" /> has been differentiated, so <Katex tex="f^{(1)}(x)=f'(x)" />,{' '}
            <Katex tex="f^{(2)}(x)=f''(x)" />, and so on.
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
