// 2025 Specialist Mathematics — Exam 1 Question 8 (5 marks). A real quartic with a given
// complex root: the conjugate pair, the quadratic factor it gives, and the other two roots.
// Question text transcribed from the original paper; the Argand plot is our own drawing of
// the answer on VCAA's exact grid (−4 to 4 on both axes, gridlines every 0.5). Answers checked with sympy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2025e1-q8a-argand.png'

const EXAM_A: SAExaminerStats = {
  marks: [16, 84],
  average: 0.8,
  comment: (
    <>
      Most students correctly placed and labelled the points <Katex tex="z_1" /> and{' '}
      <Katex tex="\overline{z_1}" /> on the Argand plane. A small number of students either placed
      the points incorrectly, labelled the points incorrectly or neglected to label the points.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 20, 61],
  average: 1.4,
  comment: (
    <>
      Most students realised that the complex conjugate of the given solution was also a solution
      to the equation <Katex tex="f(z)=0" />. Some algebraic errors were observed. A number of
      students anticipated Question 8c and gave two quadratic factors; if correct, students were
      not penalised.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 21, 42],
  average: 1.1,
  comment: (
    <>
      The majority of students attempted to find the second quadratic factor and to solve the
      quadratic equation. Students who used comparison of coefficients to find the quadratic factor
      were generally more successful than those who used long or synthetic division. Students who
      completed the square rather than using the quadratic formula to solve the quadratic equation{' '}
      <Katex tex="z^2+2z+5=0" /> were also generally more successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z_1 = 1+2i \to (1,2), \qquad \overline{z_1} = 1-2i \to (1,-2)" />,
    reason: <>The conjugate flips the sign of the imaginary part (a reflection in the real axis), so the two points sit one above the other at <Katex tex="\text{Re}(z)=1" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={argandSrc}
          alt="The answer on VCAA's Argand grid (−4 to 4 on both axes): the point z₁ plotted at 1 + 2i and the point z̄₁ at 1 − 2i, each labelled"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Both points plotted and labelled with their names; an unlabelled point doesn't show which is which.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(z) = z^4+6z^2+25 \ \text{ has real coefficients}" />,
    reason: <>So non-real roots come in conjugate pairs — the fact the whole question rests on.</>,
  },
  {
    working: <Katex display tex="1+2i \text{ a solution} \implies 1-2i \text{ is also a solution}" />,
    reason: <>The conjugate root theorem.</>,
  },
  {
    working: <Katex display tex="\bigl(z-(1+2i)\bigr)\bigl(z-(1-2i)\bigr) = (z-1)^2-(2i)^2" />,
    reason: <>The brackets are <Katex tex="(z-1)-2i" /> and <Katex tex="(z-1)+2i" />, so use <Katex tex="(A-B)(A+B)=A^2-B^2" /> with <Katex tex="A=z-1" />, <Katex tex="B=2i" />.</>,
  },
  {
    working: <Katex display tex="= z^2-2z+1+4" />,
    reason: <><Katex tex="(2i)^2=-4" />, so subtracting it adds 4.</>,
    more: <>Watch this sign — an easy place for the algebraic errors the report mentions: <Katex tex="-(2i)^2 = -(-4) = +4" />, not <Katex tex="-4" />. Writing <Katex tex="z^2-2z-3" /> here would give a factor with real roots <Katex tex="3" /> and <Katex tex="-1" />, which can't be right for a pair of non-real roots.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2-2z+5}" />,
    reason: <>A real quadratic factor, as expected from a conjugate pair.</>,
    more: <>Check: a monic quadratic is <Katex tex="z^2-(\text{sum of roots})z+(\text{product of roots})" />. Here the sum is <Katex tex="(1+2i)+(1-2i)=2" /> and the product is <Katex tex="(1+2i)(1-2i)=1+4=5" />, giving <Katex tex="z^2-2z+5" /> again. The report also notes that students who went on to give both quadratic factors (part c's work) were not penalised, provided both were correct.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="z^4+6z^2+25 = \left(z^2-2z+5\right)\left(z^2+bz+c\right)" />,
    reason: <>Part b's factor times an unknown quadratic. Its leading coefficient is 1 because <Katex tex="z^2 \cdot z^2" /> must give <Katex tex="z^4" />.</>,
    more: <>We find <Katex tex="b" /> and <Katex tex="c" /> by comparing coefficients. The report notes students who did this were generally more successful than those who used long or synthetic division. A quicker route if you spot it: <Katex tex="z^4+6z^2+25 = (z^2+5)^2-(2z)^2" />, a difference of squares that factorises straight to <Katex tex="(z^2-2z+5)(z^2+2z+5)" />.</>,
  },
  {
    working: <Katex display tex="\text{constant: } 5c = 25 \implies c = 5" />,
    reason: <>Constant terms multiply: <Katex tex="5 \times c" /> must equal the quartic's constant, 25.</>,
  },
  {
    working: <Katex display tex="z^3 \text{ term: } b-2 = 0 \implies b = 2" />,
    reason: <>The <Katex tex="z^3" /> terms come from <Katex tex="z^2\cdot bz" /> and <Katex tex="-2z\cdot z^2" />; the quartic has no <Katex tex="z^3" /> term, so they total 0.</>,
  },
  {
    working: <Katex display tex="\text{check } z^2: \ c-2b+5 = 5-4+5 = 6 \ \checkmark" />,
    reason: <>The <Katex tex="z^2" /> terms come from <Katex tex="z^2\cdot c" />, <Katex tex="-2z\cdot bz" /> and <Katex tex="5\cdot z^2" />; they match the quartic's 6, confirming the factorisation.</>,
    more: <>The <Katex tex="z" /> coefficient checks too: <Katex tex="-2c+5b = -10+10 = 0" />, and the quartic has no <Katex tex="z" /> term.</>,
  },
  {
    working: <Katex display tex="f(z) = \left(z^2-2z+5\right)\left(z^2+2z+5\right)" />,
    reason: <>Substituting <Katex tex="b=2" /> and <Katex tex="c=5" />. The remaining solutions are the roots of the second factor.</>,
  },
  {
    working: <Katex display tex="z^2+2z+5 = 0 \implies (z+1)^2 = -4" />,
    reason: <>Completing the square: <Katex tex="z^2+2z+1 = -5+1" />.</>,
    more: <>The report notes students who completed the square were generally more successful than those who used the quadratic formula. The formula works too, <Katex tex="z=\frac{-2\pm\sqrt{4-20}}{2}=\frac{-2\pm 4i}{2}=-1\pm 2i" />, but has more places to slip with signs and <Katex tex="\sqrt{-16}" />.</>,
  },
  {
    working: <Katex display tex="z+1 = \pm 2i" />,
    reason: <>The square roots of <Katex tex="-4" /> are <Katex tex="\pm 2i" />, since <Katex tex="(2i)^2=(-2i)^2=-4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -1+2i \ \text{ and } \ z = -1-2i}" />,
    reason: <>Another conjugate pair, as it must be. With <Katex tex="1\pm2i" />, the four roots are <Katex tex="\pm1\pm2i" />.</>,
    more: <>"Remaining" means the roots other than those already found. The report's answer lists just these two, since <Katex tex="1-2i" /> was already found in part b; mentioning <Katex tex="1-2i" /> again is still mathematically correct. Check: <Katex tex="f" /> only contains even powers, so <Katex tex="f(-z)=f(z)" /> and the negatives of <Katex tex="1\pm2i" /> must also be roots, which is exactly <Katex tex="-1\mp2i" />.</>,
  },
]

export default function SpecialistQ8_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (5 marks)</p>
        <p>
          Consider the function with rule <Katex tex="f(z)=z^4+6z^2+25" />, where{' '}
          <Katex tex="z\in C" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The coefficients are real, so every non-real root drags its conjugate along. One
              given root therefore hands you a second for free, and their product is a real
              quadratic factor — which is the whole of part b.
            </p>
            <p>
              Part c then finds the other quadratic factor and solves it. Geometrically, the
              four roots form a rectangle centred at the origin on the Argand plane.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Argand Diagram"
        marks={1}
        statement={
          <>
            Consider <Katex tex="z_1=1+2i" />.
            <br />
            Plot and label <Katex tex="z_1" /> and <Katex tex="\overline{z_1}" /> on the Argand
            plane below.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conjugate Root"
        marks={2}
        statement={
          <>
            Given that <Katex tex="1+2i" /> is a solution of <Katex tex="f(z)=0" />, find a
            quadratic factor of <Katex tex="f(z)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Factorise Quartic"
        marks={2}
        statement={<>Hence, find all remaining solutions of <Katex tex="f(z)=0" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
