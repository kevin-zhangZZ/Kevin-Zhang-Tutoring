// 2016 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 57% correct.
// Complex numbers: which statement about a parallelogram of four points in the complex
// plane is not true? Question text transcribed from the original paper, which has no
// diagram; the Argand diagram in the working is this site's own explanatory graph
// (matplotlib), not something VCAA printed. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2016-mcq6-argand.png'

// Dropbox share link for the tutor's video walkthrough, converted to `raw=1` so the browser
// can stream it directly. Already H.264/AAC in an .mp4 container — only remuxed with
// `-movflags +faststart` for a quicker start, no re-encoding needed.
const VIDEO_SRC =
  'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AO-09XzFUPnoVeMU7QwOY2k/SM%202016/Converted/MCQ/MCQ6-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 57, D: 15, E: 8 },
  answer: 'C',
  noAnswer: 1,
  comment: <Katex tex="|z_1z_2z_3z_4| = 2\times1\times2\times1 \ne 0" />,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={argandSrc}
          alt="Argand diagram (our own): z1 and z3 on the circle of radius 2, z2 and z4 on the circle of radius 1, joined as a parallelogram whose diagonals z1z3 and z2z4 cross at the origin at an angle of 5π/12"
          className="w-full max-w-[300px]"
        />
      </div>
    ),
    reason: <>A quick sketch first (the paper gives none): plot each point from its modulus and argument.</>,
  },
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
    reason: <>Matches option <b>C</b> — the one statement that is not true. A product of complex numbers is zero only if one of the factors is zero, and here every modulus is <Katex tex="1" /> or <Katex tex="2" />.</>,
  },
]

export default function SpecialistQ6_2016() {
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
      options={[
        { letter: 'A', content: <>The acute angle between the diagonals of the parallelogram is <Katex tex="\tfrac{5\pi}{12}" /></> },
        { letter: 'B', content: 'The diagonals of the parallelogram have lengths 2 and 4' },
        { letter: 'C', content: <Katex tex="z_1z_2z_3z_4 = 0" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="z_1 + z_2 + z_3 + z_4 = 0" /> },
        { letter: 'E', content: <><Katex tex="1 \le |z| \le 2" /> for all four of <Katex tex="z_1, z_2, z_3, z_4" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      videoSrc={VIDEO_SRC}
    />
  )
}
