// 2015 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 47% correct.
// Given an Argand diagram plotting z1 and the product z1z2, decide which statement about
// their moduli/arguments must hold. Question text transcribed from the original paper; the
// diagram is cropped from the original VCAA exam PDF. Solution is original.
// Audit, Sept 2026: the examiner comment here previously claimed VCAA accepted both B and C;
// the report shades only C and its comment is "Option C simplifies to r2 < 1". The working
// also described z1z2 as being in the first quadrant — it is in the second.
// Review, Oct 2026 (2014–2016 pass): distractor traps for B and E, the principal-argument
// check, and the report-comment equivalence moved into `more`; Concise final row shortened.
// Not a qualifying part (47% correct), so no interactive.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2015-mcq9-argand.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async" src={argandSrc} alt="Argand diagram showing z1 as a point in the first quadrant and z1z2 as a point in the second quadrant, closer to the origin than z1 — from the original 2015 VCAA exam paper" className="w-full max-w-[300px]" />
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
    reason: <>Dividing by <Katex tex="r_1>0" />. So <Katex tex="z_2" /> shrinks <Katex tex="z_1" />, which rules out A (<Katex tex="r_2>1" />).</>,
    more: <>E (<Katex tex="r_1>1" />, 16%) is tempting because <Katex tex="z_1" /> looks far from the origin, but the axes carry no scale — <Katex tex="r_1" /> could be 0.1 or 100 with the same picture. Only the <em>comparison</em> of the two distances is fixed by the diagram.</>,
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z_1z_2) = \theta_1+\theta_2" />,
    reason: <>Argument of a product adds. <Katex tex="z_1z_2" /> is in the second quadrant, so <Katex tex="\tfrac\pi2<\theta_1+\theta_2<\pi" />.</>,
    more: <>The sum of two acute angles is between 0 and <Katex tex="\pi" />, so <Katex tex="\theta_1+\theta_2" /> is already the principal argument — no multiple of <Katex tex="2\pi" /> to adjust for.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\theta_1=60^\circ,\ \theta_2=40^\circ \\ \text{or } &\theta_1=40^\circ,\ \theta_2=60^\circ \end{aligned}" />,
    reason: <>Both put <Katex tex="z_1" /> in the first quadrant and <Katex tex="z_1z_2" /> in the second, as drawn. So the quadrants can't decide which angle is larger: B and D are not <b>necessarily</b> true.</>,
    more: <>B (<Katex tex="\theta_1<\theta_2" />) was the most popular wrong answer (18%). Measuring the picture with a protractor gives roughly <Katex tex="\theta_1\approx59^\circ" /> and <Katex tex="\theta_1+\theta_2\approx124^\circ" />, which suggests <Katex tex="\theta_2\approx65^\circ" /> — but an exam diagram isn't a scale drawing, and "necessarily" asks what <em>must</em> hold. A gap of about <Katex tex="6^\circ" /> is within drawing error; the distance gap is not (<Katex tex="z_1z_2" /> is about half as far out as <Katex tex="z_1" />). All you can rely on is which quadrant each point is in and which point is closer to the origin. The pair <Katex tex="50^\circ,50^\circ" /> also fits, so D (<Katex tex="\theta_1=\theta_2" />) is possible but not forced.</>,
  },
  {
    working: <Katex display tex="\left|\frac{z_1}{z_2}\right| = \frac{r_1}{r_2}" />,
    reason: <>Modulus of a quotient divides.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{r_1}{r_2} > r_1 \iff r_2 < 1}" />,
    reason: <>Matches option <b>C</b>: dividing by <Katex tex="r_2<1" /> makes <Katex tex="r_1" /> bigger, and the diagram guarantees <Katex tex="r_2<1" />.</>,
    more: <>This is the report's one-line comment: option C simplifies to <Katex tex="r_2<1" />. To see the equivalence, divide both sides of <Katex tex="\tfrac{r_1}{r_2}>r_1" /> by <Katex tex="r_1>0" /> to get <Katex tex="\tfrac1{r_2}>1" />, i.e. <Katex tex="r_2<1" />.</>,
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
