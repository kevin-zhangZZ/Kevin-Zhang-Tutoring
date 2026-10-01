// 2022 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 59% correct.
// Simplifying 1 − 4sin²(x)/(tan²(x)+1). Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 18, C: 7, D: 13, E: 59 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan^2(x)+1 = \sec^2(x) = \frac{1}{\cos^2(x)}" />,
    reason: <>Pythagorean identity: dividing <Katex tex="\sin^2(x)+\cos^2(x)=1" /> through by <Katex tex="\cos^2(x)" /> gives <Katex tex="\tan^2(x)+1=\sec^2(x)" />. A <Katex tex="\tan^2(x)+1" /> in a denominator is the cue to use it, because it turns the whole fraction into sines and cosines.</>,
  },
  {
    working: <Katex display tex="\frac{4\sin^2(x)}{\tan^2(x)+1} = 4\sin^2(x)\cos^2(x)" />,
    reason: <>Dividing by <Katex tex="\tfrac{1}{\cos^2(x)}" /> is the same as multiplying by <Katex tex="\cos^2(x)" />. (The original expression needs <Katex tex="\cos(x)\ne0" /> for <Katex tex="\tan(x)" /> to exist, so this holds wherever it is defined.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 4\sin^2(x)\cos^2(x) &= \big(2\sin(x)\cos(x)\big)^2 \\ &= \sin^2(2x) \end{aligned}" />,
    reason: <>Recognise the double-angle identity <Katex tex="\sin(2x)=2\sin(x)\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="1 - \sin^2(2x)" />,
    reason: <>Substitute back into the original expression.</>,
  },
  {
    working: <Katex display tex="1-\sin^2(2x) = \cos^2(2x)" />,
    reason: <>Pythagorean identity again, <Katex tex="\sin^2(\theta)+\cos^2(\theta)=1" />, this time with <Katex tex="\theta=2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos^2(2x)}" />,
    reason: <>Matches option <b>E</b>. Quick check with <Katex tex="x=0" />: the original expression is <Katex tex="1-\tfrac{0}{0+1}=1" />, and option E gives <Katex tex="\cos^2(0)=1" />. Options A, C and D all give <Katex tex="0" /> at <Katex tex="x=0" /> and option B gives <Katex tex="1-2=-1" />, so substituting one value rules out every other option.</>,
  },
]

export default function SpecialistQ2_2022() {
  return (
    <MCQShell
      question={<p>The expression <Katex tex="1 - \dfrac{4\sin^2(x)}{\tan^2(x)+1}" /> simplifies to</p>}
      options={[
        { letter: 'A', content: <Katex tex="\sin(x)\cos(x)" /> },
        { letter: 'B', content: <Katex tex="1-2\cos^2(2x)" /> },
        { letter: 'C', content: <Katex tex="2\sin(2x)" /> },
        { letter: 'D', content: <Katex tex="2\sin^2(2x)" /> },
        { letter: 'E', content: <Katex tex="\cos^2(2x)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
