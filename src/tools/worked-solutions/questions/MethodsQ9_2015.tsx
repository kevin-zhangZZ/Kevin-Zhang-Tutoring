// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 9. VCAA examination report: 37% correct.
// Find E(X) for a uniform distribution once the unknown upper endpoint is pinned down by the
// total-area-equals-1 condition. Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2015-mcq9-uniform-pdf.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 37, C: 21, D: 15, E: 9 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Solve <Katex tex="\int_2^a\left(\tfrac16\right)dx=1" />, for <Katex tex="a" />,{' '}
      <Katex tex="a=8" />; <Katex tex="\mathrm{E}(X)=\int_2^8\left(\tfrac{x}{6}\right)dx=5" /> or Area of
      the rectangle <Katex tex="=\tfrac16(a-2)=1" />, <Katex tex="a=8" />. Since it is a uniform
      distribution, the expected value is halfway between 2 and 8, which is 5.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_2^a \frac16\,dx = 1" />,
    reason: <>The graph shows a constant density <Katex tex="\tfrac16" /> from <Katex tex="x=2" /> to some unknown <Katex tex="x=a" />, and the total area under any probability density function must equal 1.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{a-2}{6} = 1" />
        <Katex display tex="\implies\; a=8" />
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \mathrm{E}(X) &= \frac{2+8}{2} \\ &= 5 \end{aligned}" />,
    reason: <>For a <em>uniform</em> distribution, the mean is always exactly halfway between the endpoints — no integration needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 5}" />,
    reason: <>Matches option <b>B</b>. Option A (16%) is <Katex tex="a" /> itself, not the mean; option E is the lower endpoint.</>,
  },
]

export default function MethodsQ9_2015() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the probability density function of a continuous random variable,{' '}
          <Katex tex="X" />, is shown below. If <Katex tex="a>2" />, then <Katex tex="\mathrm{E}(X)" /> is
          equal to
        </p>
      }
      diagram={<img src={diagramSrc} alt="Uniform probability density function, constant at 1/6 from x=2 to x=a, from the original 2015 VCAA exam paper" className="w-full max-w-[280px]" />}
      options={[
        { letter: 'A', content: <Katex tex="8" /> },
        { letter: 'B', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
