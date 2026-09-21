// 2015 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 70% correct.
// The range of a product of a linear factor and an arcsin. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 70, B: 3, C: 19, D: 5, E: 3 },
  answer: 'A',
  noAnswer: 0,
  comment: <>Creating a graph using CAS technology was the simplest way to answer this question.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \tfrac x2-1 \le 1" />,
    reason: <>Find the domain first — <Katex tex="\arcsin" /> only accepts inputs in <Katex tex="[-1,1]" />, and the domain is what the endpoints of the range come from.</>,
  },
  {
    working: <Katex display tex="0 \le x \le 4" />,
    reason: <>Adding 1 and doubling. Option D, <Katex tex="[0,4]" />, is this domain offered back as a range.</>,
  },
  {
    working: <Cas fn="fMin">fMin((2-x)·sin⁻¹(x/2 - 1), x) | 0≤x≤4</Cas>,
    reason: <>Graphing the rule over <Katex tex="[0,4]" /> is the fastest route, as the report notes.</>,
  },
  {
    working: <Katex display tex="f(0) = 2\arcsin(-1) = 2\times\left(-\tfrac\pi2\right) = -\pi" />,
    reason: <>The left endpoint. Both factors are at their extremes here.</>,
  },
  {
    working: <Katex display tex="f(4) = (-2)\arcsin(1) = -2\times\tfrac\pi2 = -\pi" />,
    reason: <>The right endpoint gives the same value — the graph is symmetric about <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="f(2) = 0\times\arcsin(0) = 0" />,
    reason: <>And in between the two factors always have opposite signs — for <Katex tex="x<2" />, <Katex tex="2-x>0" /> while <Katex tex="\arcsin\left(\tfrac x2-1\right)<0" />, and vice versa — so <Katex tex="f(x)\le0" /> throughout, with <Katex tex="0" /> reached only at <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[-\pi,\ 0]}" />,
    reason: <>Option A. Option B is the range of <Katex tex="\arcsin" /> on its own, and option C is not a set of numbers at all — its endpoints still contain <Katex tex="x" />.</>,
  },
]

export default function SpecialistQ2_2015() {
  return (
    <MCQShell
      question={
        <p>
          The range of the function with rule{' '}
          <Katex tex="f(x)=(2-x)\arcsin\!\left(\tfrac x2-1\right)" /> is
        </p>
      }
      background={
        <p>
          A range question always starts with the domain. Here the{' '}
          <Katex tex="\arcsin" /> pins the domain down exactly, and once you have it the two
          endpoints and the sign of the product settle the rest.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-\pi,\,0]" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left[-\tfrac\pi2,\,\tfrac\pi2\right]" /> },
        { letter: 'C', content: <Katex tex="\left[-\tfrac{(2-x)\pi}{2},\,\tfrac{(2-x)\pi}{2}\right]" /> },
        { letter: 'D', content: <Katex tex="[0,\,4]" /> },
        { letter: 'E', content: <Katex tex="[0,\,\pi]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
