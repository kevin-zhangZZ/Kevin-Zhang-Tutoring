// 2025 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 91% correct.
// Matching a range to a cosine: read the centre and the amplitude. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 91, D: 2 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="f:R\to R,\ f(x)=9-3\cos(6x)" />
      <br />
      The range is <Katex tex="[-3+9,\ 3+9]=[6,\ 12]" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} y &= k+A\cos(nx) \\ \text{range} &= [k-|A|,\ k+|A|] \end{aligned}" />,
    reason: <>On <Katex tex="R" />, <Katex tex="\cos(nx)" /> takes every value in <Katex tex="[-1,1]" />, so <Katex tex="y" /> runs <Katex tex="|A|" /> either side of <Katex tex="k" />. The <Katex tex="n" /> only changes the period.</>,
    more: <>So the range is fixed by two numbers: the centre <Katex tex="k" /> (the vertical translation) and the amplitude <Katex tex="|A|" />. Each option's <Katex tex="9x" />, <Katex tex="3x" /> or <Katex tex="6x" /> squeezes the graph horizontally but never changes how high or low it goes. The domain matters, though: it is all of <Katex tex="R" /> here, so a full cycle is included and both extremes are reached.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{centre} &= \tfrac{6+12}{2} = 9 \\ \text{amplitude} &= \tfrac{12-6}{2} = 3 \end{aligned}" />,
    reason: <>The centre is the midpoint of the range; the amplitude is half its width.</>,
  },
  {
    working: <Katex display tex="\text{A: } 6\pm3 = [3,9]; \quad \text{B: } 6\pm6 = [0,12]" />,
    reason: <>Both are centred at 6, which is the wrong height.</>,
  },
  {
    working: <Katex display tex="\text{C: } 9\pm3 = [6,12] \ \checkmark; \quad \text{D: } 9\pm6 = [3,15]" />,
    reason: <>Both are centred correctly, but only <b>C</b> has amplitude 3.</>,
  },
  {
    working: <Katex display tex="\boxed{f:R\to R,\ f(x)=9-3\cos(6x)}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>The minus sign in front of the cosine is a reflection in the <Katex tex="x" />-axis: <Katex tex="-3\cos(6x)" /> still runs from <Katex tex="-3" /> to <Katex tex="3" />, so it makes no difference to the range — it only decides whether the curve starts at the bottom or the top. Option <b>B</b>, the most common wrong answer, does reach 12, but with centre 6 and amplitude 6 it also reaches 0; checking only the maximum is not enough.</>,
  },
]

export default function MethodsQ1_2025() {
  return (
    <MCQShell
      question={<p>A function that has a range of <Katex tex="[6,12]" /> is</p>}
      options={[
        { letter: 'A', content: <Katex tex="f:R\to R,\ f(x)=6+3\cos(9x)" /> },
        { letter: 'B', content: <Katex tex="f:R\to R,\ f(x)=6+6\cos(3x)" /> },
        { letter: 'C', content: <Katex tex="f:R\to R,\ f(x)=9-3\cos(6x)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f:R\to R,\ f(x)=9-6\cos(3x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
