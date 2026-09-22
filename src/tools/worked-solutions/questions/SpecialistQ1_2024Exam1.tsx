// 2024 Specialist Mathematics — Exam 1 Question 1 (4 marks). A cubic over the complex
// numbers: verify a linear factor, solve, then plot the roots on an Argand diagram.
// Question text transcribed from the original paper (2024 papers are image-only, so read
// from rendered pages); the Argand plot is our own drawing of the answer. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2024e1-q1c-argand.png'

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students either finding the correct
      factorisation of the cubic or showing that{' '}
      <Katex tex="f\!\left(-\tfrac{2i}{3}\right)=0" />. When evaluating, some students made
      arithmetic errors and so were ineligible for the mark.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 22, 48],
  average: 1.2,
  comment: (
    <>
      Some students neglected to show that they were solving an equation and moved directly
      from the factorised form to writing down the solutions. With the known root{' '}
      <Katex tex="-\tfrac{2i}{3}" />, a small number of students tried inappropriately to
      apply the conjugate root theorem.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Some students did not recognise that the radii of the circles on the Argand diagram
      were positive integer multiples of <Katex tex="\tfrac13" /> and so did not place{' '}
      <Katex tex="-\tfrac{2i}{3}" /> correctly. Some, with the correct solutions, plotted
      them along the real axis rather than the imaginary axis.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="3z+2i = 0 \implies z = -\frac{2i}{3}" />,
    reason: 'The factor theorem: a linear factor is a factor exactly when its root kills the polynomial.',
  },
  {
    working: <Katex display tex="\left(-\tfrac{2i}{3}\right)^2 = \frac{4i^2}{9} = -\frac49, \qquad \left(-\tfrac{2i}{3}\right)^3 = \frac{-8i^3}{27} = \frac{8i}{27}" />,
    reason: <>Building the powers first keeps the arithmetic clean. Note <Katex tex="i^3=-i" />, so the cube is <em>positive</em> imaginary.</>,
  },
  {
    working: <Katex display tex="f\!\left(-\tfrac{2i}{3}\right) = 3\cdot\frac{8i}{27} + 2i\cdot\left(-\frac49\right) + 3\cdot\left(-\frac{2i}{3}\right) + 2i" />,
    reason: 'Substituting into all four terms.',
  },
  {
    working: <Katex display tex="= \frac{8i}{9} - \frac{8i}{9} - 2i + 2i = 0" />,
    reason: 'The terms cancel in pairs.',
  },
  {
    working: <Katex display tex="\boxed{\therefore 3z+2i \text{ is a factor of } f(z)}" />,
    reason: <>Alternatively, group directly: <Katex tex="3z^3+2iz^2+3z+2i = z^2(3z+2i)+(3z+2i)" />, which shows the factor without any substitution at all.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="3z^3+2iz^2+3z+2i = z^2(3z+2i)+1(3z+2i)" />,
    reason: 'Grouping in pairs — the fastest route now that part a. has told us what to look for.',
  },
  {
    working: <Katex display tex="= (3z+2i)\left(z^2+1\right)" />,
    reason: 'The quadratic factor.',
  },
  {
    working: <Katex display tex="(3z+2i)\left(z^2+1\right) = 0" />,
    reason: 'Writing the equation down matters — the examiner noted students who jumped straight to the roots.',
  },
  {
    working: <Katex display tex="z^2+1 = 0 \implies z^2 = -1 \implies z = \pm i" />,
    reason: <>Over <Katex tex="\mathbb{C}" /> this factors as <Katex tex="(z-i)(z+i)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -\tfrac{2}{3}i, \quad z = i, \quad z = -i}" />,
    reason: <>All three in Cartesian form. The conjugate root theorem does <em>not</em> apply here — the coefficients are not all real, which is why <Katex tex="-\tfrac{2}{3}i" /> has no partner <Katex tex="+\tfrac{2}{3}i" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{all three roots are purely imaginary}" />,
    reason: <>Each has zero real part, so every point sits on the vertical <Katex tex="\text{Im}(z)" /> axis — not the horizontal one.</>,
  },
  {
    working: <Katex display tex="i \to (0,1), \qquad -i \to (0,-1)" />,
    reason: 'These land exactly on the unit circle, the third of the six printed circles.',
  },
  {
    working: <Katex display tex="-\tfrac{2}{3}i \to (0,-\tfrac23)" />,
    reason: <>The printed circles have radii <Katex tex="\tfrac13,\tfrac23,1,\tfrac43,\tfrac53,2" />, so this point sits on the <em>second</em> circle down, two thirds of the way to <Katex tex="-i" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{three points on the imaginary axis, as plotted below}}" />,
    reason: 'Reading the circle radii off the diagram is the whole difficulty here — half the cohort lost the mark.',
  },
]

export default function SpecialistQ1_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Consider the function with rule <Katex tex="f(z)=3z^3+2iz^2+3z+2i" />, where{' '}
          <Katex tex="z\in\mathbb{C}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The cubic is built to be grouped:{' '}
            <Katex tex="3z^3+2iz^2+3z+2i = z^2(3z+2i)+(3z+2i)" />. Spotting that answers
            parts a. and b. at once, and it is quicker than the substitution the factor
            theorem asks for.
          </p>
          <p>
            One warning. The coefficients here are <em>not</em> all real, so the conjugate
            root theorem does not apply — a root can appear without its conjugate, and{' '}
            <Katex tex="-\tfrac{2}{3}i" /> does exactly that.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Verify that <Katex tex="3z+2i" /> is a factor of <Katex tex="f(z)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Hence or otherwise, solve the equation <Katex tex="f(z)=0" />. Give your answers
            in Cartesian form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={<>Plot the solutions of <Katex tex="f(z)=0" /> on the Argand diagram.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={argandSrc}
            alt="An Argand diagram with circles of radius one third apart, showing three plotted points on the imaginary axis at i, −2i/3 and −i"
            className="w-full max-w-[380px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
