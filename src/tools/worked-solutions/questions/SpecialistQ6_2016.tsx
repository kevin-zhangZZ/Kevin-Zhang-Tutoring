// 2016 Specialist Mathematics — Exam 2, MCQ 6.
// Complex numbers: which statement about the Argand-diagram parallelogram is not true?

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

// Dropbox share link for the tutor's video walkthrough, converted to `raw=1` so the browser
// can stream it directly. Already H.264/AAC in an .mp4 container — only remuxed with
// `-movflags +faststart` for a quicker start, no re-encoding needed.
const VIDEO_SRC =
  'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AA-FsX8SsvcjJVpt9VxnwZw/MCQ6-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 57, D: 15, E: 8 },
  answer: 'C',
  noAnswer: 1,
  comment: <Katex tex="|z_1z_2z_3z_4| = 2\times1\times2\times1 \ne 0" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z_3 = 2\,\mathrm{cis}\!\left(\tfrac{\pi}{3}+\pi\right) = -z_1, \qquad z_4 = \mathrm{cis}\!\left(\tfrac{3\pi}{4}+\pi\right) = -z_2" />,
    reason: (
      <>
        Each point is the opposite of another: same modulus, argument shifted by <Katex tex="\pi" />. So the
        parallelogram is centred at the origin and its diagonals are the segments <Katex tex="z_1z_3" /> and{' '}
        <Katex tex="z_2z_4" />, both passing through <Katex tex="O" />.
      </>
    ),
  },
  {
    working: <Katex display tex="|z_1| = |z_3| = 2, \qquad |z_2| = |z_4| = 1" />,
    reason: <>Every modulus lies between 1 and 2, so <b>E</b> is true.</>,
  },
  {
    working: <Katex display tex="|z_1z_3| = 2|z_1| = 4, \qquad |z_2z_4| = 2|z_2| = 2" />,
    reason: <>Each diagonal is twice the corresponding modulus, giving lengths 4 and 2 — <b>B</b> is true.</>,
  },
  {
    working: <Katex display tex="\arg(z_1) - \arg(z_2) = \frac{\pi}{3} - \frac{3\pi}{4} = -\frac{5\pi}{12}" />,
    reason: <>The diagonals lie along the directions of <Katex tex="z_1" /> and <Katex tex="z_2" />, so the acute angle between them is <Katex tex="\tfrac{5\pi}{12}" /> — <b>A</b> is true.</>,
  },
  {
    working: <Katex display tex="z_1+z_2+z_3+z_4 = z_1+z_2+(-z_1)+(-z_2) = 0" />,
    reason: <>The opposite pairs cancel, so <b>D</b> is true.</>,
  },
  {
    working: <Katex display tex="|z_1z_2z_3z_4| = |z_1||z_2||z_3||z_4| = 2\times1\times2\times1 = 4 \ne 0" />,
    reason: <>The modulus of a product is the product of the moduli. None of the four is zero, so their product cannot be zero.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1z_2z_3z_4 \ne 0}" />,
    reason: <><b>C is not true — that's the answer.</b> (A product of complex numbers is zero only if one of the factors is zero, and here every modulus is 1 or 2.)</>,
  },
]

export default function SpecialistMCQ6() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The points corresponding to the four complex numbers</p>
          <Katex
            display
            tex="z_1 = 2\,\mathrm{cis}\!\left(\dfrac{\pi}{3}\right), \quad z_2 = \mathrm{cis}\!\left(\dfrac{3\pi}{4}\right), \quad z_3 = 2\,\mathrm{cis}\!\left(-\dfrac{2\pi}{3}\right), \quad z_4 = \mathrm{cis}\!\left(-\dfrac{\pi}{4}\right)"
            className="my-2"
          />
          <p>
            are the vertices of a parallelogram in the complex plane. Which one of the following statements is{' '}
            <strong className="text-gray-900 dark:text-white">not</strong> true?
          </p>
        </>
      }
      diagram={<ArgandDiagram />}
      options={[
        { letter: 'A', content: <>The acute angle between the diagonals of the parallelogram is <Katex tex="\tfrac{5\pi}{12}" />.</> },
        { letter: 'B', content: 'The diagonals of the parallelogram have lengths 2 and 4.' },
        { letter: 'C', content: <Katex tex="z_1z_2z_3z_4 = 0" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="z_1 + z_2 + z_3 + z_4 = 0" /> },
        { letter: 'E', content: <><Katex tex="1 \le |z| \le 2" /> for all four of <Katex tex="z_1, z_2, z_3, z_4" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      videoSrc={VIDEO_SRC}
    />
  )
}

// Argand diagram: z1 = 2cis(60°), z2 = cis(135°), z3 = 2cis(-120°), z4 = cis(-45°) —
// plotted on unit-radius-1 and radius-2 circles, diagonals z1–z3 and z2–z4 drawn in orange.
// Auxiliary diameters at every multiple of 30° and 45° (i.e. through π/6, π/4, π/3, ...) other
// than the horizontal/vertical ones already drawn as the main axes — light grey, behind
// everything else, purely to help read off the angles used in the options.
const AUX_ANGLES_DEG = [30, 45, 60, 120, 135, 150]

function ArgandDiagram() {
  return (
    <svg viewBox="0 0 240 240" width={204} height={204}>
      {AUX_ANGLES_DEG.map(deg => {
        const rad = (deg * Math.PI) / 180
        const dx = 112 * Math.cos(rad)
        const dy = 112 * Math.sin(rad)
        return (
          <line
            key={deg}
            x1={120 + dx}
            y1={120 - dy}
            x2={120 - dx}
            y2={120 + dy}
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth={1}
          />
        )
      })}
      <line x1={8} y1={120} x2={232} y2={120} stroke="#7dd3fc" strokeWidth={1.5} />
      <line x1={120} y1={8} x2={120} y2={232} stroke="#7dd3fc" strokeWidth={1.5} />
      <circle cx={120} cy={120} r={45} fill="none" stroke="#7dd3fc" strokeWidth={1.5} />
      <circle cx={120} cy={120} r={90} fill="none" stroke="#7dd3fc" strokeWidth={1.5} />
      <line x1={165} y1={42.06} x2={75} y2={197.94} stroke="#fb923c" strokeWidth={2} />
      <line x1={88.18} y1={88.18} x2={151.82} y2={151.82} stroke="#fb923c" strokeWidth={2} />
      <circle cx={165} cy={42.06} r={4.5} fill="#f97316" />
      <circle cx={88.18} cy={88.18} r={4.5} fill="#f97316" />
      <circle cx={75} cy={197.94} r={4.5} fill="#f97316" />
      <circle cx={151.82} cy={151.82} r={4.5} fill="#f97316" />
      <text x={170} y={38} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z₁</text>
      <text x={56} y={84} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z₂</text>
      <text x={48} y={207} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z₃</text>
      <text x={157} y={165} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z₄</text>
      {/* Angle between rays Oz1 (60°) and Oz2 (135°) — the acute 5π/12 gap between them
          sweeps across the top of the origin, not down toward z4 (that wedge is the
          obtuse 7π/12 supplement instead). */}
      <path d="M 128.5 105.28 A 17 17 0 0 0 107.98 107.98" fill="none" stroke="#ef4444" strokeWidth={1.5} />
      <text x={100} y={90} fontSize={10} className="fill-rose-600 dark:fill-rose-400">5π/12</text>
    </svg>
  )
}
