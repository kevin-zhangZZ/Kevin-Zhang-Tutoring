// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 13. VCAA examination report: 42% correct.
// Restricting cos(log_a(x)) so that it is one-to-one. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 13, C: 42, D: 20, E: 11 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="h(x)=\cos\bigl(\log_a(x)\bigr)" />;{' '}
      <Katex tex="\cos\bigl(\log_a(1)\bigr)=\cos(0)=1" />;{' '}
      <Katex tex="\cos\bigl(\log_a\!\left(a^{\pi/2}\right)\bigr)=\cos\!\left(\tfrac\pi2\right)=0" />
      . The domain could be <Katex tex="\left[1,\ a^{\pi/2}\right]" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \log_a(x) \implies h = \cos(u)" />,
    reason: <>Since <Katex tex="a>1" />, <Katex tex="\log_a" /> is increasing, so <Katex tex="h" /> is one-to-one exactly when <Katex tex="\cos" /> is one-to-one on the matching <Katex tex="u" />-interval.</>,
    more: <>Different <Katex tex="x" />-values always give different <Katex tex="u" />-values, so the only way <Katex tex="h" /> can repeat a value is if <Katex tex="\cos" /> repeats one.</>,
  },
  {
    working: <Katex display tex="\cos \text{ is one-to-one on } [0,\pi] \text{ (and on } [-\pi,0])" />,
    reason: <>It is strictly decreasing across <Katex tex="[0,\pi]" />. Any interval with <Katex tex="u=0" /> strictly inside fails, because <Katex tex="\cos(-u)=\cos(u)" />.</>,
  },
  {
    working: <Katex display tex="x = 1 \implies u = \log_a(1) = 0" />,
    reason: <>Only option C starts at <Katex tex="x=1" />, where <Katex tex="u=\log_a(1)=0" /> for every base. Convert its endpoints into <Katex tex="u" />-values.</>,
  },
  {
    working: <Katex display tex="x = a^{\pi/2} \implies u = \log_a\!\left(a^{\pi/2}\right) = \tfrac\pi2" />,
    reason: <>The logarithm and the power undo each other.</>,
  },
  {
    working: <Katex display tex="x\in\left[1,a^{\pi/2}\right] \implies u\in\left[0,\tfrac\pi2\right]" />,
    reason: <>Inside <Katex tex="[0,\pi]" />, so <Katex tex="\cos" /> is strictly decreasing there and <Katex tex="h" /> is one-to-one.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[1,\ a^{\pi/2}\right]}" />,
    reason: <>Matches option <b>C</b>. Every other option includes <Katex tex="u" />-values on both sides of 0.</>,
    more: (
      <>
        Options A, D and E convert to <Katex tex="u\in\left(-\tfrac\pi2,\tfrac\pi2\right)" />,{' '}
        <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right)" /> and{' '}
        <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right]" />. For example{' '}
        <Katex tex="x=a^{-\pi/4}" /> and <Katex tex="x=a^{\pi/4}" /> are in all three, and both
        give <Katex tex="h=\cos\!\left(\tfrac\pi4\right)=\tfrac{\sqrt2}{2}" />. D was the most
        popular wrong answer: leaving one endpoint open does not help, because the repeated
        values come from the two halves either side of <Katex tex="u=0" />. In B,{' '}
        <Katex tex="x\in(0,\pi)" /> gives <Katex tex="u" /> from <Katex tex="-\infty" /> (as{' '}
        <Katex tex="x\to0^+" />) up to <Katex tex="\log_a(\pi)" />, so <Katex tex="\cos" /> goes
        through infinitely many cycles.
      </>
    ),
  },
]

export default function MethodsQ13_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The domain of the function <Katex tex="h" />, where{' '}
            <Katex tex="h(x)=\cos\bigl(\log_a(x)\bigr)" /> and <Katex tex="a" /> is a real
            number greater than 1, is chosen so that <Katex tex="h" /> is a one-to-one
            function.
          </p>
          <p>Which one of the following could be the domain?</p>
        </>
      }
      background={
        <p>
          Strategy: convert each option's endpoints into values of{' '}
          <Katex tex="\log_a(x)" />, then ask whether the cosine is monotonic (only ever
          decreasing, or only ever increasing) across that interval.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(a^{-\pi/2},\,a^{\pi/2}\right)" /> },
        { letter: 'B', content: <Katex tex="(0,\pi)" /> },
        { letter: 'C', content: <Katex tex="\left[1,\,a^{\pi/2}\right]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\left[a^{-\pi/2},\,a^{\pi/2}\right)" /> },
        { letter: 'E', content: <Katex tex="\left[a^{-\pi/2},\,a^{\pi/2}\right]" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
