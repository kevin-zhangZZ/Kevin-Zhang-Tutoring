// 2025 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Which sequence of transformations
// applied to f does NOT produce g — checking each option by applying its transformations in
// order. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 18, C: 36, D: 21 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Dilating by <Katex tex="a" /> from the <Katex tex="x" />-axis, then <Katex tex="\tfrac12" /> from the{' '}
      <Katex tex="y" />-axis, then translating right gives <Katex tex="f_3(x)=a^{2x-1}\neq a^{2x+2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=a^x \qquad g(x)=a^{2x+2}" />,
    reason: 'The starting function and the target.',
  },
  {
    working: <Katex display tex="\text{Option A: } x\to2x \;\implies\; a^{2x};\quad x\to x+1 \;\implies\; a^{2(x+1)}=a^{2x+2}\ \checkmark" />,
    reason: <>Dilate by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, then translate 1 unit left. Produces <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\text{Option B: } x\to2x \;\implies\; a^{2x};\quad \times a^2 \;\implies\; a^2\cdot a^{2x}=a^{2x+2}\ \checkmark" />,
    reason: <>Dilate by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis, then by <Katex tex="a^2" /> from the <Katex tex="x" />-axis. Produces <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\text{Option C: } \times a \;\implies\; a\cdot a^x=a^{x+1}" />,
    reason: <>Dilate by <Katex tex="a" /> from the <Katex tex="x" />-axis first.</>,
  },
  {
    working: <Katex display tex="x\to2x \;\implies\; a^{2x+1}" />,
    reason: <>Then dilate by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="x\to x-1 \;\implies\; a^{2(x-1)+1} = a^{2x-1}" />,
    reason: 'Then translate 1 unit right.',
  },
  {
    working: <Katex display tex="\boxed{a^{2x-1} \neq a^{2x+2} = g(x)}" />,
    reason: <>This sequence does <b>not</b> produce <Katex tex="g" /> — matches option <b>C</b>. (Option D can be checked the same way and does work: <Katex tex="a^x\to a^{x+3}\to a^{x+2}\to a^{2x+2}" />.)</>,
  },
]

export default function MethodsQ20_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="a>1" />, and consider the functions <Katex tex="f" /> and <Katex tex="g" /> defined
            below.
          </p>
          <p className="mb-2">
            <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=a^x \qquad g:\mathbb{R}\to\mathbb{R},\ g(x)=a^{2x+2}" />
          </p>
          <p>
            Which one of the following sequences of transformations, when applied to <Katex tex="f(x)" />, does{' '}
            <b>not</b> produce <Katex tex="g(x)" />?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the y-axis, then translation by 1 unit in the negative direction of the x-axis</> },
        { letter: 'B', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the y-axis, then dilation by a factor of <Katex tex="a^2" /> from the x-axis</> },
        { letter: 'C', content: <>dilation by a factor of <Katex tex="a" /> from the x-axis, then dilation by a factor of <Katex tex="\tfrac12" /> from the y-axis, then translation by 1 unit in the positive direction of the x-axis</>, isAnswer: true },
        { letter: 'D', content: <>dilation by a factor of <Katex tex="a^3" /> from the x-axis, then translation by 1 unit in the positive direction of the x-axis, then dilation by a factor of <Katex tex="\tfrac12" /> from the y-axis</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
