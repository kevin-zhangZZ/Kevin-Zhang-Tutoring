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
        <img loading="lazy" decoding="async"
          src={argandSrc}
          alt="Argand diagram (our own): z1 and z3 on the circle of radius 2, z2 and z4 on the circle of radius 1, joined as a parallelogram whose diagonals z1z3 and z2z4 cross at the origin at an angle of 5π/12"
          className="w-full max-w-[300px]"
        />
      </div>
    ),
    reason: <>A quick sketch first (the paper gives none): plot each point from its modulus and argument.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} z_3 &= 2\,\mathrm{cis}\!\left(-\tfrac{2\pi}{3}\right) = 2\,\mathrm{cis}\!\left(\tfrac{\pi}{3}-\pi\right) = -z_1 \\ z_4 &= \mathrm{cis}\!\left(-\tfrac{\pi}{4}\right) = \mathrm{cis}\!\left(\tfrac{3\pi}{4}-\pi\right) = -z_2 \end{aligned}" />,
    reason: <>Each is its partner rotated by <Katex tex="\pi" /> (same modulus), so <Katex tex="z_3=-z_1" /> and <Katex tex="z_4=-z_2" />: the diagonals <Katex tex="z_1z_3" /> and <Katex tex="z_2z_4" /> pass through <Katex tex="O" />.</>,
    more: <>Why these are the diagonals: going round by argument the order is <Katex tex="z_1, z_2, z_3, z_4" />, so <Katex tex="z_1" /> and <Katex tex="z_3" /> are opposite corners, as are <Katex tex="z_2" /> and <Katex tex="z_4" />. Rotating a point by <Katex tex="\pi" /> about the origin multiplies it by <Katex tex="\mathrm{cis}(\pi)=-1" />, so the diagonals bisect each other at <Katex tex="O" /> — the defining property of a parallelogram, centred at the origin.</>,
  },
  {
    working: <Katex display tex="|z_1| = |z_3| = 2, \qquad |z_2| = |z_4| = 1" />,
    reason: <>Every modulus lies between 1 and 2, so <b>E</b> is true.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |z_3-z_1| &= |{-2z_1}| = 2|z_1| = 4 \\ |z_4-z_2| &= |{-2z_2}| = 2|z_2| = 2 \end{aligned}" />,
    reason: <>Each diagonal runs from a point through <Katex tex="O" /> to its opposite, so it is twice that modulus — <b>B</b> is true.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\left|\arg(z_2) - \arg(z_1)\right| \\ &= \frac{3\pi}{4} - \frac{\pi}{3} = \frac{5\pi}{12} \end{aligned}" />,
    reason: <>The diagonals lie along the directions of <Katex tex="z_1" /> and <Katex tex="z_2" />, so the angle between them is the gap in arguments, <Katex tex="\tfrac{5\pi}{12}" /> — acute, so <b>A</b> is true.</>,
    more: <>Two lines crossing make two angles, <Katex tex="\theta" /> and <Katex tex="\pi-\theta" />. Here <Katex tex="\tfrac{5\pi}{12}" /> (75°) is less than <Katex tex="\tfrac{\pi}{2}" />, so it is the acute one; the other is <Katex tex="\tfrac{7\pi}{12}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &z_1+z_2+z_3+z_4 \\ &= z_1+z_2+(-z_1)+(-z_2) = 0 \end{aligned}" />,
    reason: <>The opposite pairs cancel, so <b>D</b> is true.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |z_1z_2z_3z_4| &= |z_1||z_2||z_3||z_4| \\ &= 2\times1\times2\times1 = 4 \ne 0 \end{aligned}" />,
    reason: <>The modulus of a product is the product of the moduli. A product of complex numbers is zero only if a factor is zero.</>,
    more: <>This is the examiner's comment. In fact <Katex tex="z_1z_2z_3z_4=4\,\mathrm{cis}\!\left(\tfrac{\pi}{6}\right)" /> (multiply moduli, add arguments), but you only need its modulus to see it is not zero.</>,
  },
  {
    working: <Katex display tex="\boxed{z_1z_2z_3z_4 \ne 0}" />,
    reason: <>Matches option <b>C</b> — the one statement that is not true.</>,
    more: <>The question asks for the false statement, so the work is checking each option in turn; every wrong answer is a true statement judged false. D (15%) was the most popular: perhaps students expected the sum, like the product, to be non-zero — but as vectors <Katex tex="z_1" /> and <Katex tex="z_3" /> point in exactly opposite directions with equal length, as do <Katex tex="z_2" /> and <Katex tex="z_4" />, so the sum cancels to <Katex tex="0" />. B (13%): 4 and 2 are the diagonals, not the sides — the sides <Katex tex="|z_2-z_1|\approx1.99" /> and <Katex tex="|z_3-z_2|\approx2.46" /> are something else entirely. A (7%): <Katex tex="\tfrac{5\pi}{12}" /> (75°) really is the acute angle, as found above. E (8%): the inequality includes its endpoints, so moduli of exactly 1 and 2 satisfy it.</>,
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
            tex="\begin{gathered} z_1 = 2\,\mathrm{cis}\!\left(\dfrac{\pi}{3}\right), \quad z_2 = \mathrm{cis}\!\left(\dfrac{3\pi}{4}\right), \\ z_3 = 2\,\mathrm{cis}\!\left(-\dfrac{2\pi}{3}\right), \quad z_4 = \mathrm{cis}\!\left(-\dfrac{\pi}{4}\right) \end{gathered}"
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
