// 2016 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 61% correct.
// Convert a pair of parametric equations built from cosec and cot into a cartesian relation.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 12, C: 11, D: 4, E: 61 },
  answer: 'E',
  noAnswer: 1,
  comment: <><Katex tex="\dfrac{x}{3}=\mathrm{cosec}^2(t),\ \dfrac{y+1}{4}=\cot(t)" /> then eliminate <Katex tex="t" /></>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x}{3} = \mathrm{cosec}^2(t), \qquad \frac{y+1}{4} = \cot(t)" />,
    reason: <>Isolate the two trig expressions from the given parametric equations.</>,
  },
  {
    working: <Katex display tex="\mathrm{cosec}^2(t) - \cot^2(t) = 1" />,
    reason: <>The Pythagorean identity linking <Katex tex="\mathrm{cosec}" /> and <Katex tex="\cot" />. We have <Katex tex="\mathrm{cosec}^2" /> and <Katex tex="\cot" />, so this identity eliminates <Katex tex="t" />.</>,
    more: <>It comes from dividing <Katex tex="\sin^2(t)+\cos^2(t)=1" /> through by <Katex tex="\sin^2(t)" />, giving <Katex tex="1+\cot^2(t)=\mathrm{cosec}^2(t)" />.</>,
  },
  {
    working: <Katex display tex="\frac{x}{3} - \left(\frac{y+1}{4}\right)^2 = 1" />,
    reason: <>Substitute both expressions in — note <Katex tex="\cot(t)" /> must be <em>squared</em>.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} \left(\frac{y+1}{4}\right)^2 &= \frac{x}{3} - 1 \\ &= \frac{x-3}{3} \end{aligned}" />
        <Katex display tex="\implies\; (y+1)^2 = 16\!\left(\frac{x-3}{3}\right)" />
      </>
    ),
    reason: <>Rearrange to isolate <Katex tex="(y+1)^2" /> (careful: <Katex tex="\tfrac{x}{3}-1=\tfrac{x-3}{3}" />, not <Katex tex="\tfrac{x+3}{3}" />), then multiply through by <Katex tex="16" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(y+1)^2 = \dfrac{16(x-3)}{3}}" />,
    reason: <>Matches option <b>E</b>, a sideways parabola.</>,
    more: (
      <>
        Check: since <Katex tex="\mathrm{cosec}^2(t)\ge1" />, the parametric equations only give <Katex tex="x\ge3" />, and E agrees —
        its left side <Katex tex="(y+1)^2\ge0" /> forces <Katex tex="x-3\ge0" />.
        <br />
        <b>B</b> (12%, the most common wrong answer) has the sign slip <Katex tex="x+3" /> when combining <Katex tex="\tfrac{x}{3}-1" />.{' '}
        <b>A</b> and <b>C</b> both contain <Katex tex="\tfrac{x^2}{9}" />, as if <Katex tex="x" /> were <Katex tex="3\,\mathrm{cosec}(t)" /> —
        but <Katex tex="x" /> is already <Katex tex="3\,\mathrm{cosec}^2(t)" />, so it appears unsquared (C also uses a sum, as if
        the identity were <Katex tex="\sin^2+\cos^2=1" />).{' '}
        <b>D</b> comes from forgetting to square <Katex tex="\cot(t)" />: <Katex tex="\tfrac{x}{3}-\tfrac{y+1}{4}=1" /> multiplied by{' '}
        <Katex tex="12" /> gives <Katex tex="4x-3y=15" />.
      </>
    ),
  },
]

export default function SpecialistQ1_2016() {
  return (
    <MCQShell
      question={
        <p>
          The cartesian equation of the relation given by <Katex tex="x=3\,\mathrm{cosec}^2(t)" /> and{' '}
          <Katex tex="y=4\cot(t)-1" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(y+1)^2}{16} - \dfrac{x^2}{9} = 1" /> },
        { letter: 'B', content: <Katex tex="(y+1)^2 = \dfrac{16(x+3)}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{x^2}{9} + \dfrac{(y+1)^2}{16} = 1" /> },
        { letter: 'D', content: <Katex tex="4x-3y=15" /> },
        { letter: 'E', content: <Katex tex="(y+1)^2 = \dfrac{16(x-3)}{3}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
