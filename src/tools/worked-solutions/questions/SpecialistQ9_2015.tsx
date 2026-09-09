// 2015 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 47% correct.
// Given an Argand diagram plotting z1 and the product z1z2, decide which statement about
// their moduli/arguments must hold. Question text transcribed from the original paper; the
// diagram is the actual VCAA figure (cropped from the official exam PDF), not a redrawing.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2015-mcq9-argand.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img src={argandSrc} alt="Argand diagram showing z1 and z1z2 as points, both in the first quadrant, with z1z2 closer to the origin than z1 and at a larger argument — from the original 2015 VCAA exam paper" className="w-full max-w-[300px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 18, C: 47, D: 12, E: 16 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      In the diagram, <Katex tex="z_1z_2" /> lies closer to the origin than <Katex tex="z_1" />, and at a
      larger argument — so <Katex tex="r_2<1" /> and <Katex tex="\theta_2>0" />. Both <b>B</b> and <b>C</b>{' '}
      follow from this and were accepted.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: (
      <>
        The diagram shows <Katex tex="z_1" /> and <Katex tex="z_1z_2" />, both in the first quadrant, with{' '}
        <Katex tex="z_1z_2" /> closer to the origin than <Katex tex="z_1" /> but rotated further
        anticlockwise from it.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} |z_1z_2| &= |z_1||z_2| \\ &= r_1r_2 \end{aligned}" />,
    reason: <>Modulus of a product multiplies. Since <Katex tex="z_1z_2" /> is closer to the origin than <Katex tex="z_1" />, i.e. <Katex tex="r_1r_2 < r_1" />.</>,
  },
  {
    working: <Katex display tex="r_1r_2 < r_1 \;\implies\; r_2 < 1" />,
    reason: <>Dividing by <Katex tex="r_1>0" /> — this rules out <b>A</b> (<Katex tex="r_2>1" />) and says nothing about <Katex tex="r_1" /> itself, ruling out <b>E</b>.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z_1z_2) = \theta_1+\theta_2" />,
    reason: 'Argument of a product adds.',
  },
  {
    working: (
      <>
        <Katex display tex="\theta_1+\theta_2 > \theta_1" />
        <Katex display tex="\implies\; \theta_2 > 0" />
      </>
    ),
    reason: <>Since <Katex tex="z_1z_2" /> sits at a larger angle than <Katex tex="z_1" />. This alone doesn't compare <Katex tex="\theta_1" /> and <Katex tex="\theta_2" /> directly, but the diagram's relative positions place <Katex tex="\theta_2>\theta_1" /> — ruling out <b>D</b>.</>,
  },
  {
    working: <Katex display tex="\left|\frac{z_1}{z_2}\right| = \frac{r_1}{r_2}" />,
    reason: <>Since <Katex tex="r_2<1" />, dividing by it only increases a positive quantity.</>,
  },
  {
    working: <Katex display tex="\boxed{r_2<1 \;\implies\; \frac{r_1}{r_2} > r_1 \;\implies\; \left|\frac{z_1}{z_2}\right| > r_1}" />,
    reason: <>Matches option <b>C</b> — necessarily true from <Katex tex="r_2<1" /> alone, regardless of the actual value of <Katex tex="r_1" />.</>,
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
          <p>A statement that is necessarily true is</p>
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
