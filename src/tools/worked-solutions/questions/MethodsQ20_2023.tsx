// 2023 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 30% correct. Largest
// interval on which both f∘g and g∘f exist, requiring both composite domains to be found and
// intersected. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 19, C: 26, D: 14, E: 9 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="(f\circ g)(x)" /> needs <Katex tex="\sin(x)+\tfrac{1}{\sqrt2}>0" />, giving{' '}
      <Katex tex="x\in\big(-\tfrac{\pi}{4},\tfrac{5\pi}{4}\big)" /> (the branch near 0). <Katex tex="(g\circ f)(x)" />{' '}
      needs <Katex tex="x>-\tfrac{1}{\sqrt2}" /> and <Katex tex="x<e^5-\tfrac{1}{\sqrt2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\log_e\!\left(x+\tfrac{1}{\sqrt2}\right) \qquad g(x)=\sin(x),\ \ x\in(-\infty,5)" />,
    reason: 'Given functions.',
  },
  {
    working: <Katex display tex="(f\circ g)(x) = \log_e\!\left(\sin(x)+\tfrac{1}{\sqrt2}\right)" />,
    reason: <>Requires <Katex tex="\sin(x)+\tfrac{1}{\sqrt2}>0" />, i.e. <Katex tex="\sin(x) > -\tfrac{1}{\sqrt2}" />.</>,
  },
  {
    working: <Katex display tex="\sin(x) = -\tfrac{1}{\sqrt2} \text{ at } x = -\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\ (\text{mod } 2\pi)" />,
    reason: <>Between these two values (the branch containing <Katex tex="x=0" />), <Katex tex="\sin(x)" /> stays above <Katex tex="-\tfrac{1}{\sqrt2}" />.</>,
  },
  {
    working: <Katex display tex="\text{Domain of } f\circ g: \ \ x \in \left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" />,
    reason: 'Open interval, since the inequality is strict.',
  },
  {
    working: <Katex display tex="(g\circ f)(x) = \sin\!\left(\log_e\!\left(x+\tfrac{1}{\sqrt2}\right)\right)" />,
    reason: <>Requires <Katex tex="f(x)" /> to be defined, <i>and</i> its output to lie in <Katex tex="g" />'s domain <Katex tex="(-\infty,5)" />.</>,
  },
  {
    working: <Katex display tex="x+\tfrac{1}{\sqrt2}>0 \;\implies\; x > -\tfrac{1}{\sqrt2}" />,
    reason: 'Domain requirement for the logarithm.',
  },
  {
    working: <Katex display tex="\log_e\!\left(x+\tfrac{1}{\sqrt2}\right) < 5 \;\implies\; x < e^5-\tfrac{1}{\sqrt2}" />,
    reason: <>The output of <Katex tex="f" /> must land inside <Katex tex="g" />'s domain, <Katex tex="(-\infty,5)" />.</>,
  },
  {
    working: <Katex display tex="\text{Domain of } g\circ f: \ \ x \in \left(-\tfrac{1}{\sqrt2},\ e^5-\tfrac{1}{\sqrt2}\right)" />,
    reason: <>Combine the two conditions — note <Katex tex="e^5-\tfrac{1}{\sqrt2}\approx147" /> is far larger than anything from the other domain.</>,
  },
  {
    working: <>Both composites need to exist together, so intersect the two domains. Since <Katex tex="-\tfrac{\pi}{4}\approx-0.785 < -\tfrac{1}{\sqrt2}\approx-0.707" />, and <Katex tex="\tfrac{5\pi}{4}\approx3.93" /> is far smaller than <Katex tex="e^5-\tfrac{1}{\sqrt2}" />.</>,
    reason: <>The tighter bound wins on each side: <Katex tex="-\tfrac{1}{\sqrt2}" /> from <Katex tex="g\circ f" />, and <Katex tex="\tfrac{5\pi}{4}" /> from <Katex tex="f\circ g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)}" />,
    reason: <>Matches option <b>A</b> — open at both ends, since both contributing inequalities were strict.</>,
  },
]

export default function MethodsQ20_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = \log_e\!\left(x+\dfrac{1}{\sqrt2}\right)" />.
          <br />
          Let <Katex tex="g(x)=\sin(x)" /> where <Katex tex="x\in(-\infty,5)" />.
          <br />
          The largest interval of <Katex tex="x" /> values for which <Katex tex="(f\circ g)(x)" /> and{' '}
          <Katex tex="(g\circ f)(x)" /> both exist is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left[-\tfrac{1}{\sqrt2},\ \tfrac{5\pi}{4}\right)" /> },
        { letter: 'C', content: <Katex tex="\left(-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right)" /> },
        { letter: 'D', content: <Katex tex="\left[-\tfrac{\pi}{4},\ \tfrac{5\pi}{4}\right]" /> },
        { letter: 'E', content: <Katex tex="\left[-\tfrac{\pi}{4},\ -\tfrac{1}{\sqrt2}\right]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
