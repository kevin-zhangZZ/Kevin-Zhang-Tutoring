// 2015 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 47% correct.
// Given an Argand diagram plotting z1 and the product z1z2, decide which statement about
// their moduli/arguments must hold. Question text transcribed from the original paper
// (the diagram is redrawn to the same qualitative shape: z1z2 closer to the origin than z1,
// and at a larger argument); solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

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
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <ArgandDiagram />
      </div>
    ),
    reason: (
      <>
        The diagram shows <Katex tex="z_1" /> and <Katex tex="z_1z_2" />, both in the first quadrant, with{' '}
        <Katex tex="z_1z_2" /> closer to the origin than <Katex tex="z_1" /> but rotated further
        anticlockwise from it.
      </>
    ),
  },
  {
    working: <Katex display tex="|z_1z_2| = |z_1||z_2| = r_1r_2" />,
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

// Argand diagram matching the original's qualitative shape: z1 further from the origin, z1z2
// closer in and rotated further anticlockwise — illustrated with z1 = 0.5 cis(30°) and
// z2 = 0.6 cis(40°), so z1z2 = 0.3 cis(70°) (modulus multiplies, argument adds).
function ArgandDiagram() {
  // z1: r=0.5, θ=30°; z1z2: r=0.3, θ=70°. Scale ×200 px/unit, origin at (40, 220).
  const ox = 40
  const oy = 220
  const scale = 200
  const z1 = { x: ox + scale * 0.5 * Math.cos((30 * Math.PI) / 180), y: oy - scale * 0.5 * Math.sin((30 * Math.PI) / 180) }
  const z1z2 = { x: ox + scale * 0.3 * Math.cos((70 * Math.PI) / 180), y: oy - scale * 0.3 * Math.sin((70 * Math.PI) / 180) }
  return (
    <svg viewBox="0 0 260 240" width={260} height={240}>
      <line x1={0} y1={oy} x2={260} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={ox} y1={0} x2={ox} y2={240} stroke="#9ca3af" strokeWidth={1.5} />
      <text x={244} y={oy - 6} fontSize={11} className="fill-gray-500 dark:fill-gray-400">Re(z)</text>
      <text x={ox + 6} y={12} fontSize={11} className="fill-gray-500 dark:fill-gray-400">Im(z)</text>

      <line x1={ox} y1={oy} x2={z1.x} y2={z1.y} stroke="#38bdf8" strokeWidth={2} />
      <circle cx={z1.x} cy={z1.y} r={4} fill="#38bdf8" />
      <text x={z1.x + 6} y={z1.y - 6} fontSize={12} className="fill-sky-600 dark:fill-sky-400">z₁</text>

      <line x1={ox} y1={oy} x2={z1z2.x} y2={z1z2.y} stroke="#f97316" strokeWidth={2} />
      <circle cx={z1z2.x} cy={z1z2.y} r={4} fill="#f97316" />
      <text x={z1z2.x + 6} y={z1z2.y - 6} fontSize={12} className="fill-orange-600 dark:fill-orange-400">z₁z₂</text>
    </svg>
  )
}
