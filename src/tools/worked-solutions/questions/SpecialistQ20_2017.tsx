// 2017 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 77% correct.
// The decision rule for a one-sided test at the 5% level. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 9, C: 77, D: 5, E: 3 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p < \alpha \implies \text{reject } H_0" />,
    reason: <>The decision rule. Here <Katex tex="\alpha=0.05" />. A small <Katex tex="p" />-value means the observed data would be unlikely if <Katex tex="H_0" /> were true, so <Katex tex="H_0" /> goes.</>,
  },
  {
    working: <Katex display tex="\text{A: } p=0.04<0.05" />,
    reason: <>So <Katex tex="H_0" /> <em>should</em> be rejected — A says it should not. False.</>,
  },
  {
    working: <Katex display tex="\text{B: } p=0.06>0.05" />,
    reason: <>Not enough evidence, so <Katex tex="H_0" /> should <em>not</em> be rejected — B says it should. False.</>,
  },
  {
    working: <Katex display tex="\text{C: } p=0.03<0.05 \implies \text{reject } H_0" />,
    reason: <>True.</>,
  },
  {
    working: <Katex display tex="\text{D: } p\ne0.05 \text{ includes, for example, } p=0.01" />,
    reason: <>For any <Katex tex="p<0.05" /> the null hypothesis should be rejected, so "should not be rejected whenever <Katex tex="p\ne0.05" />" is false.</>,
  },
  {
    working: <Katex display tex="\text{E: } p=0.01<0.05" />,
    reason: <>Strong evidence against <Katex tex="H_0" />, so it should be rejected — E says the opposite. False.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: <>Matches option <b>C</b>. The one-sided/two-sided distinction is a red herring here: it changes how <Katex tex="p" /> is <em>calculated</em>, not how it is compared with <Katex tex="\alpha" /> once you have it.</>,
  },
]

export default function SpecialistQ20_2017() {
  return (
    <MCQShell
      question={
        <p>
          In a one-sided statistical test at the <Katex tex="5\%" /> level of significance, it
          would be concluded that
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p=0.04" /></> },
        { letter: 'B', content: <><Katex tex="H_0" /> should be rejected if <Katex tex="p=0.06" /></> },
        { letter: 'C', content: <><Katex tex="H_0" /> should be rejected if <Katex tex="p=0.03" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p\ne0.05" /></> },
        { letter: 'E', content: <><Katex tex="H_0" /> should not be rejected if <Katex tex="p=0.01" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
