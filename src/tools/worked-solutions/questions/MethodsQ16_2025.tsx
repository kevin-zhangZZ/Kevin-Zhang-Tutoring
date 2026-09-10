// 2025 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 18% correct. This
// year's paper used four options (A–D) rather than five. What must be true of a and b so that
// the derivative of a·ln(bx) has range (0, ∞), across both possible sign cases. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 16, C: 46, D: 18 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      The two cases where <Katex tex="h'" /> has range <Katex tex="(0,\infty)" /> are <Katex tex="a>0,\ b>0" /> or{' '}
      <Katex tex="a<0,\ b<0" />. In both cases, <Katex tex="ab>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = a\log_e(bx) \;\implies\; h'(x) = a\cdot\frac{b}{bx} = \frac{a}{x}" />,
    reason: <>Differentiate — the constant <Katex tex="b" /> cancels out of <Katex tex="h'" /> entirely, but it still controls the <i>domain</i>.</>,
  },
  {
    working: <>Domain requires <Katex tex="bx>0" />: if <Katex tex="b>0" />, domain is <Katex tex="x>0" />; if <Katex tex="b<0" />, domain is <Katex tex="x<0" />.</>,
    reason: <>The sign of <Katex tex="b" /> determines which half-line <Katex tex="h" /> (and so <Katex tex="h'" />) is defined on.</>,
  },
  {
    working: <Katex display tex="\text{Case } b>0\ (x>0):\quad h'(x)=\frac{a}{x}>0 \text{ for all } x>0 \;\implies\; a>0" />,
    reason: <>For <Katex tex="a/x" /> to stay positive with <Katex tex="x>0" /> throughout, need <Katex tex="a>0" />.</>,
  },
  {
    working: <Katex display tex="\text{Case } b<0\ (x<0):\quad h'(x)=\frac{a}{x}>0 \text{ for all } x<0 \;\implies\; a<0" />,
    reason: <>With <Katex tex="x<0" /> throughout, need <Katex tex="a<0" /> for the quotient to stay positive.</>,
  },
  {
    working: <>Both valid cases — <Katex tex="(a>0,b>0)" /> and <Katex tex="(a<0,b<0)" /> — have <Katex tex="a" /> and <Katex tex="b" /> the <b>same sign</b>.</>,
    reason: <>Option C only captures the first case, missing the second — too restrictive to be the thing that <i>must</i> be true.</>,
  },
  {
    working: <Katex display tex="\boxed{ab>0}" />,
    reason: <>The general condition covering both cases — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ16_2025() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="h(x)=a\log_e(bx)" />, where <Katex tex="a,b\in\mathbb{R}\setminus\{0\}" />.
          <br />
          Given that its derivative <Katex tex="h'(x)" /> has range <Katex tex="(0,\infty)" />, which of the
          following must be true?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="a>0" /> only</> },
        { letter: 'B', content: <><Katex tex="a>0" /> and <Katex tex="b<0" /></> },
        { letter: 'C', content: <><Katex tex="a>0" /> and <Katex tex="b>0" /></> },
        { letter: 'D', content: <Katex tex="ab>0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
