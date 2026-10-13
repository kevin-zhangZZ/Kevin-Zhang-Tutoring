// 2016 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 75% correct.
// A scalar resolute equation solved for a parameter. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 10, D: 75, E: 2 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}=\tfrac{10+\alpha^3}{\sqrt{17+\alpha^4}}=\tfrac{74}{\sqrt{273}}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(4)+2(-1)+\alpha\left(\alpha^2\right) = 10+\alpha^3" />,
    reason: <>The scalar resolute is <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}=\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{b}|}" />, so start with the dot product: multiply matching components and add.</>,
    more: <>The <Katex tex="\underset{\sim}{k}" /> components multiply to <Katex tex="\alpha\cdot\alpha^2=\alpha^3" />, which is what makes the equation a cubic divided by the square root of a quartic — awkward to solve by hand, hence the option-checking below.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right| = \sqrt{16+1+\alpha^4} = \sqrt{17+\alpha^4}" />,
    reason: <>The <em>scalar</em> resolute divides by <Katex tex="\left|\underset{\sim}{b}\right|" />, not its square: <Katex tex="\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{b}|^2}" /> is the multiplier of <Katex tex="\underset{\sim}{b}" /> in the vector resolute.</>,
  },
  {
    working: <Katex display tex="\frac{10+\alpha^3}{\sqrt{17+\alpha^4}} = \frac{74}{\sqrt{273}}" />,
    reason: <>Set the scalar resolute equal to the given value. Rather than solving, test the options — one substitution each.</>,
    more: <>Solving on CAS instead (<Cas fn="solve" />, for <Katex tex="\alpha" />) returns <Katex tex="\alpha=4" /> as the only real solution, so testing options loses nothing.</>,
  },
  {
    working: <Katex display tex="\alpha=4: \quad 17+256 = 273 \ \checkmark" />,
    reason: <>Start with the option that makes the denominators match: among 1 to 5, only <Katex tex="\alpha^4=256" /> gives <Katex tex="17+\alpha^4=273" />.</>,
  },
  {
    working: <Katex display tex="10+4^3 = 74 \ \checkmark" />,
    reason: <>And the numerator agrees, so <Katex tex="\alpha=4" /> makes the left side exactly <Katex tex="\tfrac{74}{\sqrt{273}}" />.</>,
    more: <>Both parts must be checked: matching the denominator alone isn't proof, since a different numerator and denominator could still give the same fraction. Here both match, so the equation holds exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = 4}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>The other options give a different value: <Katex tex="\alpha=1,2,3,5" /> make the left side about <Katex tex="2.59,\ 3.13,\ 3.74,\ 5.33" />, while <Katex tex="\tfrac{74}{\sqrt{273}}\approx4.48" />.</>,
  },
]

export default function SpecialistQ11_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let{' '}
            <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}+2\underset{\sim}{j}+\alpha\underset{\sim}{k}" />{' '}
            and{' '}
            <Katex tex="\underset{\sim}{b}=4\underset{\sim}{i}-\underset{\sim}{j}+\alpha^2\underset{\sim}{k}" />
            , where <Katex tex="\alpha" /> is a real constant.
          </p>
          <p>
            If the scalar resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
            <Katex tex="\underset{\sim}{b}" /> is <Katex tex="\dfrac{74}{\sqrt{273}}" />,
            then <Katex tex="\alpha" /> equals
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
