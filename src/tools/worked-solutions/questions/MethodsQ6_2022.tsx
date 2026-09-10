// 2022 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 47% correct. Which pair
// of functions is NOT a genuine inverse pair — testing whether each g really is f⁻¹ on f's own
// restricted domain. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 20, C: 47, D: 14, E: 16 },
  answer: 'C',
  comment: (
    <>
      The inverse of <Katex tex="f:(-\infty,0)\to\mathbb{R},\ f(x)=x^2" /> is{' '}
      <Katex tex="f^{-1}:(0,\infty)\to\mathbb{R},\ f^{-1}(x)=-\sqrt x" />, not <Katex tex="g(x)=\sqrt x,\ x>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Check each pair by confirming <Katex tex="f(g(x))=x" /> <i>and</i> that <Katex tex="g" /> actually reverses <Katex tex="f" />'s own restricted domain — not just any square-root-style inverse.</>,
    reason: 'The trap: a function can have the "right shape" for an inverse without matching the original domain restriction.',
  },
  {
    working: <Katex display tex="\text{A: } f(x)=5x+3,\ g(x)=\tfrac{x-3}{5} \;\implies\; f(g(x))=5\cdot\tfrac{x-3}{5}+3=x \ \checkmark" />,
    reason: 'Genuine inverse pair.',
  },
  {
    working: <Katex display tex="\text{B: } f(x)=\tfrac23x+2,\ g(x)=\tfrac32x-3 \;\implies\; f(g(x))=\tfrac23\big(\tfrac32x-3\big)+2=x \ \checkmark" />,
    reason: 'Genuine inverse pair.',
  },
  {
    working: <Katex display tex="\text{C: } f(x)=x^2,\ x<0 \qquad g(x)=\sqrt x,\ x>0" />,
    reason: <>For <Katex tex="x<0" />, <Katex tex="f(x)=x^2" /> takes only <i>negative</i> <Katex tex="x" />-values to positive outputs — its true inverse must return negative values.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = -\sqrt{x},\quad x>0" />,
    reason: <>To undo squaring a negative number, take the negative square root — not the positive one given by <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x)=\sqrt x \neq f^{-1}(x)}" />,
    reason: <>This pair is <b>not</b> genuine inverses — matches option <b>C</b>. (D and E can be checked the same way and both hold up: D is self-inverse, <Katex tex="f(g(x))=1/(1/x)=x" />; E gives <Katex tex="f(g(x))=\log_e(e^{x-1})+1=x" />.)</>,
  },
]

export default function MethodsQ6_2022() {
  return (
    <MCQShell
      question={<p>Which of the pairs of functions below are <b>not</b> inverse functions?</p>}
      options={[
        { letter: 'A', content: <><Katex tex="f(x)=5x+3,\ x\in\mathbb{R}" /><br /><Katex tex="g(x)=\dfrac{x-3}{5},\ x\in\mathbb{R}" /></> },
        { letter: 'B', content: <><Katex tex="f(x)=\tfrac23x+2,\ x\in\mathbb{R}" /><br /><Katex tex="g(x)=\tfrac32x-3,\ x\in\mathbb{R}" /></> },
        { letter: 'C', content: <><Katex tex="f(x)=x^2,\ x<0" /><br /><Katex tex="g(x)=\sqrt x,\ x>0" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="f(x)=\dfrac1x,\ x\neq0" /><br /><Katex tex="g(x)=\dfrac1x,\ x\neq0" /></> },
        { letter: 'E', content: <><Katex tex="f(x)=\log_e(x)+1,\ x>0" /><br /><Katex tex="g(x)=e^{x-1},\ x\in\mathbb{R}" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
