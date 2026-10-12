// 2024 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 77% correct.
// Purely imaginary means the real part vanishes — and the imaginary part does not. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 6, C: 5, D: 77 },
  answer: 'D',
  comment: (
    <>
      Substitute <Katex tex="z=3+ki" />
      <br />
      <Katex tex="z^2+4iz+3=(3+ki)^2+4i(3+ki)+3" />
      <br />
      <Katex tex="=-k^2-4k+12+(6k+12)i" />
      <br />
      If purely imaginary then <Katex tex="-k^2-4k+12=0" />
      <br />
      <Katex tex="\therefore k=-6,2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} z^2 &= (3+ki)^2 \\ &= 9+6ki+k^2i^2 \\ &= \left(9-k^2\right)+6ki \end{aligned}" />,
    reason: <>Expand the square. Since <Katex tex="i^2=-1" />, the <Katex tex="k^2" /> term is real and negative.</>,
  },
  {
    working: <Katex display tex="4iz = 4i(3+ki) = 12i+4k i^2 = -4k+12i" />,
    reason: <>Expand, then use <Katex tex="i^2=-1" /> again: <Katex tex="4ki^2=-4k" /> is real.</>,
  },
  {
    working: <Katex display tex="z^2+4iz+3 = \left(12-k^2-4k\right)+(6k+12)i" />,
    reason: <>Add the three terms, collecting real parts <Katex tex="9-k^2-4k+3" /> and imaginary parts <Katex tex="6k+12" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{purely imaginary} \\ &\implies 12-k^2-4k = 0 \\ &\implies k^2+4k-12 = 0 \end{aligned}" />,
    reason: <>Purely imaginary means the real part is zero.</>,
  },
  {
    working: <Katex display tex="(k+6)(k-2) = 0 \implies k = -6 \ \text{ or } \ k = 2" />,
    reason: <>Both make the real part zero, and neither makes the imaginary part <Katex tex="6k+12" /> zero too, so both work.</>,
    more: <>At <Katex tex="k=2" /> the expression is <Katex tex="24i" />, and at <Katex tex="k=-6" /> it is <Katex tex="-24i" />. The check matters because if the imaginary part were also zero, the expression would be <Katex tex="0" />, which is not usually counted as purely imaginary.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 2}" />,
    reason: <>Matches option <b>D</b>; <Katex tex="-6" /> is not an option.</>,
    more: <>The question asks for "a value", the hint that there is more than one. Option <b>A</b> (<Katex tex="-2" />) is likely a sign slip in the <Katex tex="4iz" /> term: taking <Katex tex="4ki^2" /> as <Katex tex="+4k" /> makes the real part <Katex tex="12-k^2+4k" />, whose zeros are <Katex tex="k=6" /> and <Katex tex="k=-2" />. Substituting each option straight into <Katex tex="12-k^2-4k" /> is a quick check: <Katex tex="-2" /> gives 16, <Katex tex="-1" /> gives 15, <Katex tex="1" /> gives 7 and only <Katex tex="2" /> gives 0.</>,
  },
]

export default function SpecialistQ6_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            Let <Katex tex="z=3+ki" /> where <Katex tex="k\in R" />.
          </p>
          <p>
            A value of <Katex tex="k" /> that makes <Katex tex="z^2+4iz+3" /> purely imaginary
            is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-1" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
