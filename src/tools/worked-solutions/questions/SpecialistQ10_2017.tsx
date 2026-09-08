// 2017 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 6% correct —
// by far the hardest MCQ in the 2017-2018 Specialist Exam 2 papers.
// Find the inflection point(s) of |f(x)| given properties of f, f' and f''.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 9, C: 45, D: 7, E: 6 },
  answer: 'E',
  noAnswer: 1,
  comment: <>f&Prime;(x) does not change sign at a.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = \frac{(x+a)^2(x-b)}{g(x)}, \qquad g(x)<0 \text{ always}" />,
    reason: <>Dividing by an always-negative <Katex tex="g(x)" /> flips the sign of the numerator — so <Katex tex="\operatorname{sign}\bigl(f''(x)\bigr) = -\operatorname{sign}(x-b)" /> everywhere <Katex tex="x\ne -a" /> (since <Katex tex="(x+a)^2\ge 0" /> never affects the sign).</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{at } x=-a: \ f''(-a)=0, \text{ but } (x+a)^2 \ge 0 \text{ on both sides}" />
        <Katex display tex="\implies\; \text{no sign change}" />
      </>
    ),
    reason: <>A squared factor touches zero without crossing it, so <Katex tex="f''" /> doesn't actually change sign at <Katex tex="x=-a" /> — <b>not</b> an inflection point of <Katex tex="f" /> itself.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{at } x=b: \ (x-b) \text{ goes } -\!\to+" />
        <Katex display tex="\implies\; f''(x) \text{ goes } +\!\to-" />
        <Katex display tex="\implies\; \text{inflection point of } f \text{ at } b" />
      </>
    ),
    reason: <>This is the only place <Katex tex="f''" /> genuinely changes sign, so <Katex tex="f" /> itself has exactly one inflection point, at <Katex tex="x=b" />, where <Katex tex="f(b)=-1" />.</>,
  },
  {
    working: <Katex display tex="f(-a)=-1<0, \qquad f(b)=-1<0" />,
    reason: <>Both given function values at the two candidate points are negative, so near each of them <Katex tex="|f(x)|=-f(x)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="|f(x)|=-f(x) \text{ near } x=-a \text{ and } x=b" />
        <Katex display tex="\implies\; \bigl(|f|\bigr)''=-f''" />
      </>
    ),
    reason: <>Negating a function negates its second derivative too, so <Katex tex="-f''" /> changes sign at exactly the same places <Katex tex="f''" /> does — no new inflection points are created by taking the absolute value here (since <Katex tex="f" /> doesn't cross zero near <Katex tex="-a" /> or <Katex tex="b" />).</>,
  },
  {
    working: <Katex display tex="\boxed{|f(x)| \text{ has its only inflection point at } (b,\,-f(b)) = (b,\,1)}" />,
    reason: <>Since <Katex tex="f''" /> doesn't change sign at <Katex tex="-a" />, neither does <Katex tex="-f''" /> — so <Katex tex="x=-a" /> is not an inflection point of <Katex tex="|f|" /> either. Only <Katex tex="(b,1)" /> qualifies. Matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ10_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A function <Katex tex="f" />, its derivative <Katex tex="f'" /> and its second derivative{' '}
            <Katex tex="f''" /> are defined for <Katex tex="x\in\mathbb{R}" /> with the following properties.
          </p>
          <Katex display tex="f(a)=1,\ f(-a)=-1" className="my-1" />
          <Katex display tex="f(b)=-1,\ f(-b)=1" className="my-1" />
          <Katex display tex="\text{and} \quad f''(x)=\frac{(x+a)^2(x-b)}{g(x)}, \quad \text{where } g(x)<0" className="my-1" />
          <p className="mt-2">The coordinates of any points of inflection of <Katex tex="|f(x)|" /> are</p>
        </>
      }
      options={[
        { letter: 'A', content: <>(<Katex tex="-a" />, 1) and (<Katex tex="b" />, 1)</> },
        { letter: 'B', content: <>(<Katex tex="b" />, −1)</> },
        { letter: 'C', content: <>(<Katex tex="-a" />, −1) and (<Katex tex="b" />, −1)</> },
        { letter: 'D', content: <>(<Katex tex="-a" />, 1)</> },
        { letter: 'E', content: <>(<Katex tex="b" />, 1)</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
