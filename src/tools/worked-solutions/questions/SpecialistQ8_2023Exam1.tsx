// 2023 Specialist Mathematics — Exam 1 Question 8 (4 marks). Proof by induction for the nth
// derivative of x·e^(2x), new to the 2023 study design. Question text transcribed from the
// original paper. Result checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [16, 17, 39, 9, 21],
  average: 2.1,
  comment: (
    <>
      Many students were able to show the base step and make an assumption for the{' '}
      <Katex tex="k" />th case. Students were then required to differentiate{' '}
      <Katex tex="f^{(k)}(x)" /> to show that the <Katex tex="(k+1)" />th case followed. A
      number either did not differentiate or differentiated incorrectly. Many students
      appeared to be thinking of index laws and assumed that{' '}
      <Katex tex="f^{(k+1)}(x)" /> was equal to{' '}
      <Katex tex="f^{(k)}(x)\cdot f'(x)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\textbf{Base step } (n=1): \quad f'(x) = e^{2x}+2xe^{2x} = (2x+1)e^{2x}" />,
    reason: 'Product rule on x·e^(2x).',
  },
  {
    working: <Katex display tex="\text{Formula at } n=1: \ \left(2^1x+1\cdot2^{0}\right)e^{2x} = (2x+1)e^{2x} \ \checkmark" />,
    reason: 'The two agree, so the statement holds for n = 1. Say so explicitly.',
  },
  {
    working: <Katex display tex="\textbf{Inductive hypothesis: } \text{assume true for } n=k\ge1, \text{ i.e. } f^{(k)}(x) = \left(2^kx+k\,2^{k-1}\right)e^{2x}" />,
    reason: 'State the assumption in full — an unstated hypothesis costs marks even when the algebra that follows is right.',
  },
  {
    working: <Katex display tex="f^{(k+1)}(x) = \frac{d}{dx}\left[\left(2^kx+k\,2^{k-1}\right)e^{2x}\right]" />,
    reason: <>The next derivative is obtained by <em>differentiating</em> the <Katex tex="k" />th, not by multiplying by <Katex tex="f'(x)" /> — the report's named misconception.</>,
  },
  {
    working: <Katex display tex="= 2^ke^{2x}+2\left(2^kx+k\,2^{k-1}\right)e^{2x}" />,
    reason: <>Product rule again: the first factor differentiates to <Katex tex="2^k" />, and <Katex tex="e^{2x}" /> brings down a 2.</>,
  },
  {
    working: <Katex display tex="= \left(2^{k+1}x+k\,2^{k}+2^{k}\right)e^{2x}" />,
    reason: <><Katex tex="2\cdot2^kx=2^{k+1}x" /> and <Katex tex="2\cdot k2^{k-1}=k2^{k}" />; the stray <Katex tex="2^k" /> from the first term joins them.</>,
  },
  {
    working: <Katex display tex="= \left(2^{k+1}x+(k+1)2^{(k+1)-1}\right)e^{2x}" />,
    reason: <>Factorising <Katex tex="2^k" /> out of <Katex tex="k2^k+2^k" />. This is exactly the formula with <Katex tex="k+1" /> in place of <Katex tex="k" />, which is what had to be shown.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{True for } n=1, \text{ and true for } n=k \implies \text{true for } n=k+1;\ \text{so by induction it holds for all } n\in\mathbb{Z}^+.}" />,
    reason: 'The concluding sentence is part of the proof, not decoration.',
  },
]

export default function SpecialistQ8_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>
          A function <Katex tex="f" /> has the rule <Katex tex="f(x)=xe^{2x}" />. Use
          mathematical induction to prove that{' '}
          <Katex tex="f^{(n)}(x)=\left(2^nx+n\,2^{n-1}\right)e^{2x}" /> for{' '}
          <Katex tex="n\in\mathbb{Z}^+" />, where <Katex tex="f^{(n)}(x)" /> represents the{' '}
          <Katex tex="n" />th derivative of <Katex tex="f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Proof by induction is new to the 2023 study design, and it has a fixed shape:
            base step, hypothesis, inductive step, conclusion. Marks are awarded for the
            structure as much as the algebra, so write all four parts even when one is a
            single line.
          </p>
          <p>
            The inductive step here is a single product rule. The one thing to watch is that
            "the next derivative" means <em>differentiate what you assumed</em> — the report
            found many students multiplying <Katex tex="f^{(k)}" /> by{' '}
            <Katex tex="f'" />, as if derivatives obeyed index laws.
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
