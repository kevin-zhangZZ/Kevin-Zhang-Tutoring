// 2024 Specialist NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with no
// statistics. Complex numbers: use the given discriminant to find the real coefficient a (two
// values), then solve each quadratic over C. Question text transcribed from the original paper.
// Solution is original; the answer A agrees with the report's key (sympy: a = 2 or 18; roots
// (±3 + i)/2 and (±1 + 3i)/6).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Delta=(-ai)^2-4(a)(-5)=-a^2+20a" />,
    reason: <><Katex tex="\Delta=b^2-4ac" /> with <Katex tex="b=-ai" /> and <Katex tex="c=-5" />. Careful with <Katex tex="(-ai)^2=a^2i^2=-a^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}-a^2+20a&=36\\ a^2-20a+36&=0\\ (a-2)(a-18)&=0\end{aligned}" />,
    reason: <>Set the discriminant equal to 36. There are <b>two</b> possible values of <Katex tex="a" />, which is why each option offers two pairs of solutions.</>,
  },
  {
    working: <Katex display tex="z=\frac{ai\pm\sqrt{36}}{2a}=\frac{ai\pm6}{2a}" />,
    reason: <>The quadratic formula, <Katex tex="z=\tfrac{-b\pm\sqrt\Delta}{2a}" />, with <Katex tex="-b=ai" />. Here <Katex tex="\Delta=36" /> is a positive real, so <Katex tex="\sqrt\Delta=6" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a=2:&\quad z=\frac{2i\pm6}{4}=\tfrac12(\pm3+i)\\ a=18:&\quad z=\frac{18i\pm6}{36}=\tfrac16(\pm1+3i)\end{aligned}" />,
    reason: <>Substitute each value of <Katex tex="a" /> and simplify.</>,
    more: <>Check one: <Katex tex="z=\tfrac12(3+i)" /> in <Katex tex="2z^2-2iz-5" />: <Katex tex="2z^2=\tfrac12(8+6i)=4+3i" /> and <Katex tex="2iz=i(3+i)=-1+3i" />, so <Katex tex="4+3i-(-1+3i)-5=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac12(\pm3+i)\ \text{ or }\ \tfrac16(\pm1+3i)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>C</b> is the same working with the sign of <Katex tex="-b" /> slipped, using <Katex tex="z=\tfrac{-ai\pm6}{2a}" />: the imaginary parts come out negative.</>,
  },
]

export default function SpecialistQ5_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          For <Katex tex="z\in C" /> and <Katex tex="a\in R" />, the discriminant of the quadratic equation{' '}
          <Katex tex="az^2-aiz-5=0" /> is <Katex tex="36" />.
          <br />
          The possible solutions for <Katex tex="z" /> to <Katex tex="az^2-aiz-5=0" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac12(\pm3+i)" /> or <Katex tex="\dfrac16(\pm1+3i)" /></>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="\dfrac16(\pm3+i)" /> or <Katex tex="\dfrac12(\pm1+3i)" /></> },
        { letter: 'C', content: <><Katex tex="\dfrac12(\pm3-i)" /> or <Katex tex="\dfrac16(\pm1-3i)" /></> },
        { letter: 'D', content: <><Katex tex="\dfrac16(\pm3-i)" /> or <Katex tex="\dfrac12(\pm1+3i)" /></> },
        { letter: 'E', content: <><Katex tex="\dfrac16(\pm3-i)" /> or <Katex tex="\dfrac12(\pm1-3i)" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
