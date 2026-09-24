// 2015 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 47% correct.
// Given an Argand diagram plotting z1 and the product z1z2, decide which statement about
// their moduli/arguments must hold. Question text transcribed from the original paper; the
// diagram is cropped from the original VCAA exam PDF. Solution is original.
// Audit, Sept 2026: the examiner comment here previously claimed VCAA accepted both B and C;
// the report shades only C and its comment is "Option C simplifies to r2 < 1". The working
// also described z1z2 as being in the first quadrant — it is in the second.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2015-mcq9-argand.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img src={argandSrc} alt="Argand diagram showing z1 as a point in the first quadrant and z1z2 as a point in the second quadrant, closer to the origin than z1 — from the original 2015 VCAA exam paper" className="w-full max-w-[300px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 18, C: 47, D: 12, E: 16 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Option C simplifies to <Katex tex="r_2<1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} |z_1z_2| &= |z_1||z_2| \\ &= r_1r_2 \end{aligned}" />,
    reason: <>Modulus of a product multiplies. In the diagram <Katex tex="z_1z_2" /> is closer to the origin than <Katex tex="z_1" />.</>,
  },
  {
    working: <Katex display tex="r_1r_2 < r_1 \;\implies\; r_2 < 1" />,
    reason: <>Dividing by <Katex tex="r_1>0" />. This rules out A (<Katex tex="r_2>1" />). Nothing in the diagram fixes the size of <Katex tex="r_1" /> itself — there is no scale — so E is not necessarily true either.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z_1z_2) = \theta_1+\theta_2" />,
    reason: <>Argument of a product adds. <Katex tex="z_1" /> is in the first quadrant and <Katex tex="z_1z_2" /> in the second, so <Katex tex="\tfrac\pi2<\theta_1+\theta_2<\pi" />.</>,
  },
  {
    working: <Katex display tex="\theta_1=60^\circ,\ \theta_2=40^\circ \quad\text{or}\quad \theta_1=40^\circ,\ \theta_2=60^\circ" />,
    reason: <>Both give a sum of <Katex tex="100^\circ" />, a second-quadrant product, so the diagram cannot decide which angle is larger: neither B (<Katex tex="\theta_1<\theta_2" />) nor D (<Katex tex="\theta_1=\theta_2" />) is <b>necessarily</b> true.</>,
  },
  {
    working: <Katex display tex="\left|\frac{z_1}{z_2}\right| = \frac{r_1}{r_2}" />,
    reason: <>Modulus of a quotient divides.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{r_1}{r_2} > r_1 \iff r_2 < 1}" />,
    reason: <>Matches option <b>C</b>: dividing a positive number by <Katex tex="r_2<1" /> makes it bigger. This is the report's one-line comment — option C simplifies to <Katex tex="r_2<1" />, which the diagram guarantees. Option B (18%) was the most popular wrong answer.</>,
  },
]

export default function SpecialistQ9_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="z_1 = r_1\,\mathrm{cis}(\theta_1)" /> and <Katex tex="z_2 = r_2\,\mathrm{cis}(\theta_2)" />
            , where <Katex tex="z_1" /> and <Katex tex="z_1z_2" /> are shown in the Argand diagram below;{' '}
            <Katex tex="\theta_1" /> and <Katex tex="\theta_2" /> are acute angles.
          </p>
          <div className="mb-3">{DIAGRAM}</div>
          <p>A statement that is <b>necessarily</b> true is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="r_2 > 1" /> },
        { letter: 'B', content: <Katex tex="\theta_1 < \theta_2" /> },
        { letter: 'C', content: <Katex tex="\left|\dfrac{z_1}{z_2}\right| > r_1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\theta_1 = \theta_2" /> },
        { letter: 'E', content: <Katex tex="r_1 > 1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
