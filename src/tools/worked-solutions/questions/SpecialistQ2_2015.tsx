// 2015 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 70% correct.
// The range of a product of a linear factor and an arcsin. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
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
    reason: <><Katex tex="\arcsin" /> only accepts inputs in <Katex tex="[-1,1]" />, so this inequality gives the implied domain.</>,
  },
  {
    working: <Katex display tex="0 \le x \le 4" />,
    reason: <>Add 1 to each part, then multiply by 2.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Graph } y=(2-x)\arcsin\!\left(\tfrac x2-1\right),\ 0\le x\le4" />
        <Katex display tex="\text{lowest at } x=0,\,4;\ \text{highest at } x=2" />
      </>
    ),
    reason: <>As the report suggests, graph it on CAS: it rises from the left endpoint to a peak at <Katex tex="x=2" />, then falls back. The next rows find these values exactly.</>,
  },
  {
    working: <Katex display tex="f(0) = 2\arcsin(-1) = 2\times\left(-\tfrac\pi2\right) = -\pi" />,
    reason: <>The left endpoint: <Katex tex="2-x" /> is at its largest and <Katex tex="\arcsin" /> at its most negative.</>,
  },
  {
    working: <Katex display tex="f(4) = (-2)\arcsin(1) = -2\times\tfrac\pi2 = -\pi" />,
    reason: <>The right endpoint: now <Katex tex="2-x" /> is at its most negative and <Katex tex="\arcsin" /> at its largest, so the product is <Katex tex="-\pi" /> again.</>,
    more: (
      <>
        Both endpoints agree because the graph is symmetric about <Katex tex="x=2" />. Check, using <Katex tex="\arcsin(-u)=-\arcsin(u)" />:{' '}
        <Katex tex="f(4-x)=(x-2)\arcsin\!\left(1-\tfrac x2\right)=(2-x)\arcsin\!\left(\tfrac x2-1\right)=f(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f(2) = 0\times\arcsin(0) = 0" />,
    reason: <>The maximum: the two factors always have opposite signs, so <Katex tex="f(x)\le0" />, with <Katex tex="0" /> reached only at <Katex tex="x=2" />.</>,
    more: (
      <>
        For <Katex tex="x<2" />, <Katex tex="2-x>0" /> while{' '}
        <Katex tex="\arcsin\left(\tfrac x2-1\right)<0" />; for <Katex tex="x>2" /> both signs
        flip. To see that nothing goes below <Katex tex="-\pi" />, put{' '}
        <Katex tex="u=\tfrac x2-1\in[-1,1]" />, so <Katex tex="2-x=-2u" /> and{' '}
        <Katex tex="f=-2u\arcsin(u)=-2\,|u|\,|\arcsin(u)|\ge-2\times1\times\tfrac\pi2=-\pi" />.
        Since <Katex tex="f" /> is continuous, it takes every value from <Katex tex="-\pi" /> to{' '}
        <Katex tex="0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{[-\pi,\ 0]}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        Option <b>B</b> is the range of <Katex tex="\arcsin" /> on its own, ignoring the factor{' '}
        <Katex tex="2-x" />. Option <b>C</b> (19%) multiplies that range by{' '}
        <Katex tex="2-x" />, but its endpoints still contain <Katex tex="x" />, so it is not a
        set of numbers at all. Option <b>D</b> is the domain <Katex tex="[0,4]" /> offered back
        as a range. Option <b>E</b> has the right size but the wrong sign: <Katex tex="f" /> is
        never positive.
      </>
    ),
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
