// 2015 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 43% correct
// (tied for fourth-hardest in the 2014-2016 Specialist Exam 2 papers).
// Reconstruct a hyperbola's equation from its asymptotes and a point on it.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 20, C: 11, D: 43, E: 18 },
  answer: 'D',
  noAnswer: 1,
  comment: 'Options D and E had the correct asymptotes, but (5, 5) satisfied only option D.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{centre } (2,1), \quad \text{asymptote slopes } \pm\tfrac23" />,
    reason: 'The asymptotes of a hyperbola always cross at its centre.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{(y-1)^2}{A} - \frac{(x-2)^2}{B} = 1" />
        <Katex display tex="\implies\; \text{asymptote slopes} = \pm\sqrt{\frac{A}{B}}" />
      </>
    ),
    reason: <>For this orientation (branches opening up/down), the asymptotes are <Katex tex="y-1=\pm\sqrt{A/B}\,(x-2)" />. Need <Katex tex="\sqrt{A/B}=\tfrac23" />, i.e. <Katex tex="A:B = 4:9" /> — check every option's denominators against this ratio.</>,
  },
  {
    working: <Katex display tex="\text{D: } \sqrt{4/9}=\tfrac23 \quad \checkmark \qquad \text{E: } \sqrt{4/9}=\tfrac23 \quad \checkmark" />,
    reason: <>Checking every option's slope this way, only options <b>D</b> and <b>E</b> give <Katex tex="\tfrac23" /> — options A, B and C all give <Katex tex="\sqrt{9/4}=\tfrac32" /> instead. So it comes down to D vs E.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{D:} \ \frac{(5-1)^2}{4}-\frac{(5-2)^2}{9} &= \frac{16}{4}-\frac{9}{9} \\ &= 4-1 \\ &= 3 \ \checkmark \end{aligned}" />,
    reason: <>Test <Katex tex="(5,5)" /> in option D — it must satisfy the equation exactly, matching the RHS of <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{E:} \ \frac{(5-2)^2}{9}-\frac{(5-1)^2}{4} &= \frac{9}{9}-\frac{16}{4} \\ &= 1-4 \\ &= -3 \ \ne 3 \end{aligned}" />,
    reason: <>Test <Katex tex="(5,5)" /> in option E — it fails, since swapping which variable is squared first flips which branch of the hyperbola the point <Katex tex="(5,5)" /> would need to sit on.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(y-1)^2}{4} - \frac{(x-2)^2}{9} = 3}" />,
    reason: <>Only option <b>D</b> has both the correct asymptote gradient and passes through <Katex tex="(5,5)" />.</>,
  },
]

export default function SpecialistQ4_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            The two asymptotes of a particular hyperbola have gradients <Katex tex="\tfrac23" /> and{' '}
            <Katex tex="-\tfrac23" /> respectively and intersect at the point <Katex tex="(2,1)" />. One
            branch of the hyperbola passes through the point <Katex tex="(5,5)" />.
          </p>
          <p className="mt-2">The equation of the hyperbola is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(x-2)^2}{4} - \dfrac{(y-1)^2}{9} = 1" /> },
        { letter: 'B', content: <Katex tex="\dfrac{(x-2)^2}{4} - \dfrac{(y-1)^2}{9} = \dfrac{17}{36}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{(y-1)^2}{9} - \dfrac{(x-2)^2}{4} = \dfrac{17}{36}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{(y-1)^2}{4} - \dfrac{(x-2)^2}{9} = 3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{(x-2)^2}{9} - \dfrac{(y-1)^2}{4} = 3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
