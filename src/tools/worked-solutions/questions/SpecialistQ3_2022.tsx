// 2022 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 38% correct.
// Which asymptote behaviour a family of rational functions will ALWAYS have. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 5, C: 8, D: 8, E: 38 },
  answer: 'E',
  comment: (
    <>
      If <Katex tex="c=0" />, <Katex tex="y = 1+\dfrac{2x+4}{(x-2)(x+2)} = 1+\dfrac{2}{x-2}" /> so only one vertical
      asymptote in this instance.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{x^2+2x+c}{x^2-4} = \frac{x^2+2x+c}{(x-2)(x+2)}" />,
    reason: 'Numerator and denominator have the same degree, and the denominator factorises into two distinct linear factors.',
  },
  {
    working: <Katex display tex="\text{As } x\to\pm\infty,\ y\to\frac{x^2}{x^2}=1" />,
    reason: <>Leading coefficients are both 1, so a horizontal asymptote at <Katex tex="y=1" /> exists <b>for every value of</b> <Katex tex="c" /> — this part is non-negotiable.</>,
  },
  {
    working: <Katex display tex="\text{Numerator zero at } x=2:\ 4+4+c=0 \;\iff\; c=-8" />,
    reason: <>Check whether the factor <Katex tex="(x-2)" /> can cancel — this happens only for this one specific value of <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\text{Numerator zero at } x=-2:\ 4-4+c=0 \;\iff\; c=0" />,
    reason: <>Similarly, <Katex tex="(x+2)" /> cancels only when <Katex tex="c=0" /> — e.g. exactly the report's example.</>,
  },
  {
    working: <>Since <Katex tex="c" /> cannot equal both <Katex tex="-8" /> and <Katex tex="0" /> at once, at least one of the two factors never cancels.</>,
    reason: <>So a vertical asymptote always survives — sometimes both (generic <Katex tex="c" />), sometimes only one (<Katex tex="c=-8" /> or <Katex tex="c=0" />) — but never zero.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Always: } y=1 \text{ horizontal asymptote, and at least one vertical asymptote}}" />,
    reason: <>Matches option <b>E</b>. Options A and C over-claim (assume 2 vertical asymptotes / assume specifically <Katex tex="x=-2" />, both false for some <Katex tex="c" />); option B is impossible for this form; option D is only true for one specific <Katex tex="c" />, not "always".</>,
  },
]

export default function SpecialistQ3_2022() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{x^2+2x+c}{x^2-4}" />, where <Katex tex="c\in\mathbb{R}" />, will{' '}
          <b>always</b> have
        </p>
      }
      options={[
        { letter: 'A', content: 'two vertical asymptotes and one horizontal asymptote.' },
        { letter: 'B', content: 'two horizontal asymptotes and one vertical asymptote.' },
        { letter: 'C', content: <>a vertical asymptote with equation <Katex tex="x=-2" /> and one horizontal asymptote with equation <Katex tex="y=1" />.</> },
        { letter: 'D', content: <>one horizontal asymptote with equation <Katex tex="y=1" /> and only one vertical asymptote with equation <Katex tex="x=2" />.</> },
        { letter: 'E', content: <>a horizontal asymptote with equation <Katex tex="y=1" /> and at least one vertical asymptote.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
