// 2020 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 28% correct.
// Composite function f(g(x)) and its range. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 14, D: 50, E: 28 },
  answer: 'E',
  comment: (
    <>
      Options C, D and E have the correct rule but only option E has the correct range. The range must
      include <Katex tex="\tfrac12" /> as <Katex tex="\tfrac12\sin(2x)" /> is a maximum at <Katex tex="x=\tfrac{\pi}{4}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(g(x)) = \frac{\sqrt{g(x)-1}}{g(x)} = \frac{\sqrt{\csc^2(x)-1}}{\csc^2(x)}" />,
    reason: <>Substitute <Katex tex="g(x)=\csc^2(x)" /> into <Katex tex="f(x)=\dfrac{\sqrt{x-1}}{x}" />.</>,
  },
  {
    working: <Katex display tex="\csc^2(x)-1 = \cot^2(x) \;\implies\; \sqrt{\csc^2(x)-1} = |\cot(x)| = \cot(x)" />,
    reason: <>Pythagorean identity; <Katex tex="\cot(x)>0" /> on <Katex tex="0<x<\tfrac{\pi}{2}" />, so the absolute value drops.</>,
  },
  {
    working: <Katex display tex="f(g(x)) = \frac{\cot(x)}{\csc^2(x)} = \frac{\cos(x)/\sin(x)}{1/\sin^2(x)} = \sin(x)\cos(x) = \tfrac12\sin(2x)" />,
    reason: 'Rewrite in terms of sin and cos and simplify — rules out options A and B, which never simplify away the cosec² form.',
  },
  {
    working: <Katex display tex="x\in\big(0,\tfrac{\pi}{2}\big) \;\implies\; 2x\in(0,\pi)" />,
    reason: <>Track the domain through to <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\sin(2x)\in(0,1],\quad \text{with } \sin(2x)=1 \text{ at } x=\tfrac{\pi}{4}\in\big(0,\tfrac{\pi}{2}\big)" />,
    reason: <>On <Katex tex="(0,\pi)" />, <Katex tex="\sin" /> is positive throughout and reaches its maximum of 1 at the midpoint — which <i>is</i> inside the open domain, so the range includes that maximum.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac12\sin(2x) \in \big(0,\tfrac12\big]}" />,
    reason: <>Matches option <b>E</b> exactly — the range is half-open, including <Katex tex="\tfrac12" /> but not <Katex tex="0" />.</>,
  },
]

export default function SpecialistQ4_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = \dfrac{\sqrt{x-1}}{x}" /> over its implied domain and <Katex tex="g(x) = \csc^2(x)" /> for{' '}
          <Katex tex="0<x<\tfrac{\pi}{2}" />.
        </p>
      }
      options={[
        { letter: 'A', content: <>{'f(g(x)) = '}<Katex tex="\csc^2\!\left(\dfrac{\sqrt{x-1}}{x}\right)" />, <Katex tex="[1,\infty)" /></> },
        { letter: 'B', content: <>{'f(g(x)) = '}<Katex tex="\csc^2\!\left(\dfrac{\sqrt{x-1}}{x}\right)" />, <Katex tex="[2,\infty)" /></> },
        { letter: 'C', content: <>{'f(g(x)) = sin(x)cos(x), '}<Katex tex="[-0.5,0.5]\setminus\{0\}" /></> },
        { letter: 'D', content: <>{'f(g(x)) = sin(x)cos(x), '}<Katex tex="\big(0,\tfrac12\big)" /></> },
        { letter: 'E', content: <>{'f(g(x)) = '}<Katex tex="\tfrac12\sin(2x)" />, <Katex tex="\big(0,\tfrac12\big]" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
