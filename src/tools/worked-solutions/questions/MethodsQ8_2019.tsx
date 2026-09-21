// 2019 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 71% correct. A binomial
// conditional probability. Question text transcribed from the original paper (no diagram).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 11, C: 71, D: 5, E: 4 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \operatorname{Bi}(80,\ 0.9)" />,
    reason: <>Number of successful hits in <Katex tex="80" /> independent attempts.</>,
  },
  {
    working: <Katex display tex="\Pr(X=74 \mid X\ge70) = \dfrac{\Pr(X=74)}{\Pr(X\ge70)}" />,
    reason: <>Definition of conditional probability, since <Katex tex="\{X=74\}\subset\{X\ge70\}" />.</>,
  },
  {
    working: <Katex display tex="\text{Evaluate by CAS}" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1494}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ8_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An archer can successfully hit a target with a probability of <Katex tex="0.9" />.
            The archer attempts to hit the target <Katex tex="80" /> times. The outcome of each
            attempt is independent of any other attempt.
          </p>
          <p>
            Given that the archer successfully hits the target at least <Katex tex="70" /> times,
            the probability that the archer successfully hits the target exactly{' '}
            <Katex tex="74" /> times, correct to four decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.3635" /> },
        { letter: 'B', content: <Katex tex="0.8266" /> },
        { letter: 'C', content: <Katex tex="0.1494" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.3005" /> },
        { letter: 'E', content: <Katex tex="0.1701" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
