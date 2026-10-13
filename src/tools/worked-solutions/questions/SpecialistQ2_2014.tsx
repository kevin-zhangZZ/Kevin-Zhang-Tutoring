// 2014 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 71% correct.
// Completing the square to read off an ellipse. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 19, D: 5, E: 71 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Completed square form: <Katex tex="(x-3)^2+2(y+2)^2=1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-6x+2y^2+8y+16 = 0" />,
    reason: <>To read off a centre and semi-axes, we need the form <Katex tex="\tfrac{(x-h)^2}{a^2}+\tfrac{(y-k)^2}{b^2}=1" />: group the <Katex tex="x" /> and <Katex tex="y" /> terms and complete both squares.</>,
  },
  {
    working: <Katex display tex="\left(x^2-6x\right)+2\left(y^2+4y\right)+16 = 0" />,
    reason: <>Factor the 2 out of the <Katex tex="y" /> terms <em>before</em> completing that square.</>,
  },
  {
    working: <Katex display tex="(x-3)^2-9+2\left[(y+2)^2-4\right]+16 = 0" />,
    reason: <>Halve the middle coefficients (<Katex tex="-6\to-3" />, <Katex tex="4\to2" />) and subtract their squares. The <Katex tex="-4" /> is multiplied by 2 when it comes out.</>,
  },
  {
    working: <Katex display tex="(x-3)^2+2(y+2)^2 = 1" />,
    reason: <><Katex tex="-9-8+16=-1" />, so the constant moves across as <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="\frac{(x-3)^2}{1}+\frac{(y+2)^2}{1/2} = 1" />,
    reason: <>Write the 2 as dividing by <Katex tex="\tfrac12" />. Centre <Katex tex="(h,k)=(3,-2)" />: <Katex tex="x-3" /> gives <Katex tex="h=+3" />, and <Katex tex="y+2=y-(-2)" /> gives <Katex tex="k=-2" />.</>,
  },
  {
    working: <Katex display tex="a = 1,\quad b = \sqrt{\tfrac12} = \tfrac{1}{\sqrt2}" />,
    reason: <>Each denominator is a semi-axis squared, so square-root it: <Katex tex="a" /> (under <Katex tex="x" />) is horizontal, <Katex tex="b" /> (under <Katex tex="y" />) is vertical.</>,
    more: (
      <>
        Check: the points <Katex tex="(3\pm1,\,-2)" /> and <Katex tex="\left(3,\,-2\pm\tfrac1{\sqrt2}\right)" /> both satisfy{' '}
        <Katex tex="(x-3)^2+2(y+2)^2=1" />, since <Katex tex="1+0=1" /> and <Katex tex="0+2\cdot\tfrac12=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(3,-2),\quad 1,\quad \tfrac{1}{\sqrt2}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Option C, the most common wrong answer, has the right centre but semi-axes <Katex tex="\tfrac12" /> and 1: it
        uses <Katex tex="\tfrac12" /> without square-rooting it, and attaches it to the wrong axis. The 2 multiplies{' '}
        <Katex tex="(y+2)^2" />, so it squashes the <em>vertical</em> axis. Options A and D flip the signs of the
        centre to <Katex tex="(-3,2)" />; D then repeats C&apos;s error and A reads the coefficient 2 as a length. Option B writes the centre&apos;s
        coordinates in the wrong order.
      </>
    ),
  },
]

export default function SpecialistQ2_2014() {
  return (
    <MCQShell
      question={
        <p>
          The ellipse given by <Katex tex="x^2-6x+2y^2+8y+16=0" /> has centre, length of
          horizontal semi-axis and length of vertical semi-axis respectively of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-3,2),\ 1,\ 2" /> },
        { letter: 'B', content: <Katex tex="(-2,3),\ 1,\ \tfrac1{\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="(3,-2),\ \tfrac12,\ 1" /> },
        { letter: 'D', content: <Katex tex="(-3,2),\ \tfrac12,\ 1" /> },
        { letter: 'E', content: <Katex tex="(3,-2),\ 1,\ \tfrac1{\sqrt2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
