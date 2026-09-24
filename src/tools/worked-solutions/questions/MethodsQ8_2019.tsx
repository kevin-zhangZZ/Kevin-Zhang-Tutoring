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
    reason: <>Let <Katex tex="X" /> be the number of hits. Binomial applies: a fixed <Katex tex="80" /> attempts, each a hit or a miss, a constant probability <Katex tex="0.9" />, and (stated) independence.</>,
  },
  {
    working: <Katex display tex="\Pr(X=74 \mid X\ge70) = \dfrac{\Pr\bigl(X=74 \ \cap \ X\ge70\bigr)}{\Pr(X\ge70)}" />,
    reason: <>The conditional probability formula <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />. The word "given" is what signals it.</>,
  },
  {
    working: <Katex display tex="= \dfrac{\Pr(X=74)}{\Pr(X\ge70)}" />,
    reason: <>Hitting exactly <Katex tex="74" /> times <em>already</em> means hitting at least <Katex tex="70" /> times, so the overlap of the two events is simply <Katex tex="X=74" />. This collapse is the whole idea of the question.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(X=74) = \binom{80}{74}(0.9)^{74}(0.1)^{6} \approx 0.12354" />
        <Katex display tex="\Pr(X\ge70) = 1-\Pr(X\le69) \approx 0.82662" />
      </>
    ),
    reason: <>The first from the binomial probability formula (or binomPdf), the second from binomCdf via the complement, since calculators total from the bottom up.</>,
  },
  {
    working: <Katex display tex="\dfrac{0.12354}{0.82662} \approx 0.1494" />,
    reason: <>Dividing, then rounding to four decimal places as asked.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1494}" />,
    reason: <>Matches option <b>C</b>. The distractors are all near-misses: <b>B</b> <Katex tex="(0.8266)" /> is the denominator on its own, <b>D</b> <Katex tex="(0.3005)" /> is <Katex tex="\Pr(X\ge74)" />, and <b>A</b> <Katex tex="(0.3635)" /> is <Katex tex="\Pr(X\ge74\mid X\ge70)" /> — the answer to the question if "exactly" had read "at least".</>,
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
