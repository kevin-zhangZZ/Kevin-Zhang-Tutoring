// 2024 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 68% correct.
// Type II error: the false null that survives the test. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 68, B: 8, C: 8, D: 15 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\Pr\big(\text{Type II error}\big)=\Pr\big(H_0\text{ is not rejected}\,\big|\,H_1\text{ is true}\big)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Type I: reject } H_0 \text{ when } H_0 \text{ is true}" />,
    reason: <>A false alarm: the test finds an effect that isn't there. This is option <b>B</b>.</>,
    more: <>The probability of a type I error is the significance level <Katex tex="\alpha" />: you reject <Katex tex="H_0" /> whenever the <Katex tex="p" />-value falls below <Katex tex="\alpha" />, and if <Katex tex="H_0" /> is true that happens with probability <Katex tex="\alpha" />.</>,
  },
  {
    working: <Katex display tex="\text{Type II: do not reject } H_0 \text{ when } H_0 \text{ is false}" />,
    reason: <>A missed detection: there is a real effect, but the sample wasn't convincing enough to reject <Katex tex="H_0" />.</>,
    more: <>The two errors are the only two ways the decision can disagree with reality. Think of a 2×2 grid of reality against decision: <Katex tex="H_0" /> true and rejected is a type I error; <Katex tex="H_0" /> false and not rejected is a type II error; the other two combinations (true and not rejected, false and rejected) are correct decisions.</>,
  },
  {
    working: <Katex display tex="H_0 \text{ false} \iff H_1 \text{ true}" />,
    reason: <>A test assumes one of the two hypotheses describes reality, so "<Katex tex="H_0" /> is false" means "<Katex tex="H_1" /> is true", as the report writes it.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{array}{c}\text{a null hypothesis is not rejected}\\ \text{when the alternative hypothesis is true}\end{array}}" />,
    reason: <>Matches option <b>A</b>, the type II definition with "<Katex tex="H_0" /> is false" rewritten as "<Katex tex="H_1" /> is true".</>,
    more: <>
      Option <b>B</b> is a type I error. Option <b>C</b> (reject <Katex tex="H_0" /> when <Katex tex="H_1" /> is true) is the <em>correct</em> decision in that situation, not an error at all. Option <b>D</b>, the most popular wrong answer (15%), sounds plausible but "doubtful" is not a state of the world: an error is defined by what is actually true (<Katex tex="H_0" /> true or <Katex tex="H_1" /> true), and every <Katex tex="H_0" /> we test is "doubtful" — that is why we test it. A reliable way to recall the definition is the examiner's version: <Katex tex="\Pr(\text{type II}) = \Pr(H_0 \text{ not rejected} \mid H_1 \text{ true})" />.
    </>,
  },
]

export default function SpecialistQ19_2024() {
  return (
    <MCQShell
      question={<p>When conducting a hypothesis test, a type II error occurs when</p>}
      options={[
        { letter: 'A', content: <>a null hypothesis is not rejected when the alternative hypothesis is true.</>, isAnswer: true },
        { letter: 'B', content: <>a null hypothesis is rejected when it is true.</> },
        { letter: 'C', content: <>a null hypothesis is rejected when the alternative hypothesis is true.</> },
        { letter: 'D', content: <>a null hypothesis is not rejected when it is doubtful.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
