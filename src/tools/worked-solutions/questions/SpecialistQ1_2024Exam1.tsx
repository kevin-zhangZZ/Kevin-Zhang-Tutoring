// 2024 Specialist Mathematics — Exam 1 Question 1 (4 marks). A cubic over the complex
// numbers: verify a linear factor, solve, then plot the roots on an Argand diagram.
// Question text transcribed from the original paper (2024 papers are image-only, so read
// from rendered pages). The Argand diagram is a crop of VCAA's own artwork (300 dpi), and the
// part c. answer is an SVG overlay on it (never a redrawing). Calibration measured from the
// crop: origin at (876.5, 941), 379.5 px per unit; checked with a PIL composite — the
// calibrated circles of radius 1/3, 2/3, …, 2 and the rays every π/6 lie exactly on VCAA's
// printed ones. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2024e1-q1c-argand.png'

const AX = 876.5
const AY = 941
const R = 379.5
const py = (y: number) => AY - y * R
const ORANGE = '#f97316'
const LABEL = { fontSize: 60, fill: '#c2410c', stroke: 'white', strokeWidth: 12, paintOrder: 'stroke' } as const
const ROOTS = [
  { y: 1, label: 'i' },
  { y: -2 / 3, label: '−2i/3' },
  { y: -1, label: '−i' },
] as const

function ArgandOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async"
          src={argandSrc}
          alt="VCAA's Argand diagram with the answer drawn over it: three points on the imaginary axis, at i on the unit circle, at −2i/3 on the second circle below the origin, and at −i on the unit circle"
          className="w-full block"
        />
        <svg viewBox="0 0 1875 1816" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {ROOTS.map((r) => (
            <g key={r.label}>
              <circle cx={AX} cy={py(r.y)} r={17} fill={ORANGE} />
              <text x={AX + 34} y={py(r.y) + 20} {...LABEL}>{r.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students either finding the correct
      factorisation of the cubic polynomial or showing that{' '}
      <Katex tex="f\left(-\dfrac{2i}{3}\right)=0" />. When evaluating{' '}
      <Katex tex="f\left(-\dfrac{2i}{3}\right)" />, some students made arithmetic errors in
      their calculations and so were ineligible for the mark.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 22, 48],
  average: 1.2,
  comment: (
    <>
      Students typically found the quadratic factor <Katex tex="z^2+1" /> (which may have been
      found in Question 1a and then solved a cubic equation. However, some students neglected to
      show that they were solving an equation and moved directly from the factorised form of
      the polynomial <Katex tex="f(z)" /> to writing down the solutions of{' '}
      <Katex tex="f(z)=0" />.
      <br />
      With the known root <Katex tex="z=-\dfrac{2i}{3}" />, a small number of students tried
      inappropriately to apply the conjugate root theorem.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Students needed to plot the correct solutions to <Katex tex="f(z)=0" /> on the Argand
      diagram. Most students who found the solutions in Question 1b were able to do this quite
      successfully. Some students did not recognise that the radii of the circles on the Argand
      diagram were positive integer multiples of <Katex tex="\dfrac{1}{3}" /> and so did not
      place the point <Katex tex="z=-\dfrac{2i}{3}" /> correctly. Some students, with the
      correct solutions, incorrectly plotted them along the real axis, rather than the
      imaginary axis.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="3z+2i = 0 \implies z = -\frac{2i}{3}" />,
    reason: <>Factor theorem: <Katex tex="3z+2i" /> is a factor exactly when <Katex tex="f" /> is zero at the root of <Katex tex="3z+2i=0" />.</>,
  },
  {
    working: <Katex display tex="\left(-\tfrac{2i}{3}\right)^2 = \frac{4i^2}{9} = -\frac49, \qquad \left(-\tfrac{2i}{3}\right)^3 = \frac{-8i^3}{27} = \frac{8i}{27}" />,
    reason: <>Build the powers first. Since <Katex tex="i^2=-1" /> and <Katex tex="i^3=-i" />, the square is real and negative, the cube <em>positive</em> imaginary.</>,
    more: <>The usual slip is a sign on <Katex tex="i^3" />: <Katex tex="(-1)^3=-1" /> and <Katex tex="i^3=-i" />, so the two minus signs cancel and <Katex tex="\left(-\tfrac{2i}{3}\right)^3=+\tfrac{8i}{27}" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(-\tfrac{2i}{3}\right) = 3\cdot\frac{8i}{27} + 2i\cdot\left(-\frac49\right) + 3\cdot\left(-\frac{2i}{3}\right) + 2i" />,
    reason: <>Substituting into all four terms.</>,
  },
  {
    working: <Katex display tex="= \frac{8i}{9} - \frac{8i}{9} - 2i + 2i = 0" />,
    reason: <>The terms cancel in pairs.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore 3z+2i \text{ is a factor of } f(z)}" />,
    reason: <>Since <Katex tex="f\left(-\tfrac{2i}{3}\right)=0" />, the factor theorem gives the factor. As required.</>,
    more: <>The report accepted either route: showing <Katex tex="f\left(-\tfrac{2i}{3}\right)=0" /> as here, or writing down a correct factorisation, which is the grouping used in part b.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="3z^3+2iz^2+3z+2i = z^2(3z+2i)+1(3z+2i)" />,
    reason: <>Group the first two terms and the last two: each pair contains <Katex tex="3z+2i" />, the factor from part a.</>,
  },
  {
    working: <Katex display tex="= (3z+2i)\left(z^2+1\right)" />,
    reason: <>Take out the common factor <Katex tex="3z+2i" />, leaving the quadratic factor <Katex tex="z^2+1" />.</>,
  },
  {
    working: <Katex display tex="(3z+2i)\left(z^2+1\right) = 0" />,
    reason: <>Set the factorised form equal to zero, then each factor to zero (null factor law).</>,
    more: <>Writing <Katex tex="=0" /> matters. <Katex tex="(3z+2i)(z^2+1)" /> on its own is just <Katex tex="f(z)" /> rewritten; the null factor law only applies once the product is set equal to zero, so jumping from the factorised form to a list of roots skips the step being marked.</>,
  },
  {
    working: <Katex display tex="3z+2i = 0 \implies z = -\tfrac{2}{3}i" />,
    reason: <>The linear factor gives the root already checked in part a.</>,
  },
  {
    working: <Katex display tex="z^2+1 = 0 \implies z^2 = -1 \implies z = \pm i" />,
    reason: <>Over <Katex tex="C" />, <Katex tex="z^2+1=(z-i)(z+i)" />, so the quadratic factor gives two roots.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -\tfrac{2}{3}i, \quad z = i, \quad z = -i}" />,
    reason: <>All three, in Cartesian form <Katex tex="x+yi" /> (here each has <Katex tex="x=0" />).</>,
    more: <>Don't add <Katex tex="+\tfrac{2}{3}i" /> as a "conjugate partner". The conjugate root theorem needs all coefficients real, and here <Katex tex="2i" /> is not, so a root can appear without its conjugate. A cubic has exactly three roots, and the factorisation has found all three.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{all three roots are purely imaginary}" />,
    reason: <>Each has zero real part, so every point sits on the vertical <Katex tex="\text{Im}(z)" /> axis — not the horizontal one.</>,
  },
  {
    working: <Katex display tex="i \to (0,1), \qquad -i \to (0,-1)" />,
    reason: <>These land exactly on the unit circle (radius 1), the third circle out from <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="-\tfrac{2}{3}i \to (0,-\tfrac23)" />,
    reason: <>The printed circles have radii <Katex tex="\tfrac13,\tfrac23,1,\tfrac43,\tfrac53,2" />, so this point sits on the <em>second</em> circle out from <Katex tex="O" /> (radius <Katex tex="\tfrac23" />), on the negative imaginary axis.</>,
  },
  {
    working: <ArgandOverlay />,
    reason: <>Three dots, all on the imaginary (vertical) axis.</>,
    more: <>To place a point on these diagrams, read the ring spacing first: here each ring adds <Katex tex="\tfrac13" />, so <Katex tex="|z|=\tfrac23" /> is two rings out, not one or three. Then check the direction: a purely imaginary number sits straight above or below <Katex tex="O" />, never to the side.</>,
  },
]

export default function SpecialistQ1_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Consider the function with rule <Katex tex="f(z)=3z^3+2iz^2+3z+2i" />, where{' '}
          <Katex tex="z\in C" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The cubic is built to be grouped:{' '}
              <Katex tex="3z^3+2iz^2+3z+2i = z^2(3z+2i)+(3z+2i)" />. Spotting that answers
              parts a and b at once, and it is quicker than the substitution the factor
              theorem asks for.
            </p>
            <p>
              Note that the coefficient <Katex tex="2i" /> is not real; this matters in part b.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Factor Theorem"
        marks={1}
        statement={<>Verify that <Katex tex="3z+2i" /> is a factor of <Katex tex="f(z)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complex Roots"
        marks={2}
        statement={
          <>
            Hence or otherwise, solve the equation <Katex tex="f(z)=0" />.
            <br />
            Give your answers in Cartesian form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Argand Diagram"
        marks={1}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Plot the solutions of <Katex tex="f(z)=0" /> on the Argand diagram below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={argandSrc}
                alt="An Argand diagram with circles centred at the origin of radius 1/3, 2/3, 1, 4/3, 5/3 and 2, and rays from the origin every π/6 — from the original 2024 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
