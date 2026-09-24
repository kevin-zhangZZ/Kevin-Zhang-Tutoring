// 2019 Specialist Mathematics — Exam 1, Question 3 (3 marks).
// Chocolate cylinders of fixed radius 0.5 cm and random length (mean 3, sd 0.1) — the expected
// volume, the variance of the volume, and the expected surface area. This is the linear
// functions of a random variable topic: E(aX+b) = aE(X)+b and Var(aX+b) = a²Var(X). Question
// text transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Cross-checked against the VCAA examination report and itute's
// independent solutions — all agree on 3π/4, π²/1600 and 7π/2. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import cylinderSrc from './spec-2019e1-q3-cylinder.png'

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>This question was well done. Occasionally the <Katex tex="\pi" /> was missing from the answer.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      Students could use fractions to find{' '}
      <Katex tex="\operatorname{Var}(V)=\operatorname{Var}\left(\pi r^2h\right)=\dfrac{\pi^2}{16}\times\dfrac{1}{100}=\dfrac{\pi^2}{1600}" />.
      Students who used this approach tended to score more highly than those using decimals, who
      sometimes were not able to evaluate <Katex tex="(\pi\times0.25)^2\times(0.1)^2" /> correctly.
      A number of students omitted the <Katex tex="\pi^2" /> from their answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <>Some students were unable to evaluate <Katex tex="\dfrac{\pi}{2}+3\pi" /> correctly.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi r^2 L = \pi\left(\tfrac12\right)^2 L = \dfrac{\pi}{4}L" />,
    reason: <>Volume of a cylinder, with the radius fixed at <Katex tex="r=0.5=\tfrac12" /> and the length <Katex tex="L" /> the random part. So <Katex tex="V" /> is just a <em>constant multiple</em> of <Katex tex="L" />.</>,
  },
  {
    working: <Katex display tex="E(V) = E\!\left(\dfrac{\pi}{4}L\right) = \dfrac{\pi}{4}E(L) = \dfrac{\pi}{4}\times3" />,
    reason: <>Constants come straight out of an expected value: <Katex tex="E(aL)=aE(L)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{E(V) = \dfrac{3\pi}{4} \text{ cm}^3}" />,
    reason: <>Leave the <Katex tex="\pi" /> in — an exact answer is required, and the report notes it was sometimes dropped. As a decimal this is about <Katex tex="2.36" /> cm³.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(V) = \operatorname{Var}\!\left(\dfrac{\pi}{4}L\right) = \left(\dfrac{\pi}{4}\right)^2\operatorname{Var}(L)" />,
    reason: <>A constant multiplier comes out of a variance <b>squared</b> — this is the step that separates this part from part a., and only 30% of students got it.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(L) = \bigl(\text{sd}(L)\bigr)^2 = \left(\dfrac{1}{10}\right)^2 = \dfrac{1}{100}" />,
    reason: <>The question gives the standard deviation, not the variance, so square it first. Using the fraction <Katex tex="\tfrac{1}{10}" /> rather than <Katex tex="0.1" /> keeps the arithmetic clean.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(V) = \dfrac{\pi^2}{16}\times\dfrac{1}{100}" />,
    reason: <>Substituting. Keep it in fractions — the report notes students using decimals sometimes could not evaluate <Katex tex="(\pi\times0.25)^2\times(0.1)^2" /> correctly.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Var}(V) = \dfrac{\pi^2}{1600} \text{ cm}^6}" />,
    reason: <>Equivalently <Katex tex="0.000625\pi^2" />. Note the <Katex tex="\pi" /> is squared too — and the units are cm⁶, because a variance carries the square of the units of the quantity.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \underbrace{2\pi r^2}_{\text{two circular ends}} + \underbrace{2\pi r L}_{\text{curved surface}}" />,
    reason: <>A solid cylinder's surface is two discs plus the curved side (the side unrolls into a rectangle of width <Katex tex="2\pi r" /> and height <Katex tex="L" />).</>,
  },
  {
    working: <Katex display tex="A = 2\pi\left(\tfrac12\right)^2 + 2\pi\left(\tfrac12\right)L = \dfrac{\pi}{2}+\pi L" />,
    reason: <>Substituting <Katex tex="r=\tfrac12" />. This time <Katex tex="A" /> is a constant multiple of <Katex tex="L" /> <em>plus</em> a constant.</>,
  },
  {
    working: <Katex display tex="E(A) = \dfrac{\pi}{2}+\pi E(L) = \dfrac{\pi}{2}+3\pi" />,
    reason: <>Using <Katex tex="E(aL+b)=aE(L)+b" /> — the added constant simply carries through (unlike in a variance, where it would disappear).</>,
  },
  {
    working: <Katex display tex="\boxed{E(A) = \dfrac{7\pi}{2} \text{ cm}^2}" />,
    reason: <><Katex tex="\tfrac{\pi}{2}+3\pi=\tfrac{\pi}{2}+\tfrac{6\pi}{2}=\tfrac{7\pi}{2}" />, i.e. <Katex tex="3.5\pi \approx 11.0" /> cm². The report notes some students were unable to evaluate this sum correctly, and its general comments list arithmetic in Question 3 as an area of weakness.</>,
  },
]

export default function SpecialistQ3_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p className="mb-3">
          A machine produces chocolate in the form of a continuous cylinder of radius{' '}
          <Katex tex="0.5" /> cm. Smaller cylindrical pieces are cut parallel to its end, as
          shown in the diagram below. The lengths of the pieces vary with a mean of{' '}
          <Katex tex="3" /> cm and a standard deviation of <Katex tex="0.1" /> cm.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={cylinderSrc} alt="A long chocolate cylinder being cut into shorter cylindrical pieces, from the original 2019 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            Only the <b>length</b> varies — the radius is fixed at <Katex tex="0.5" /> cm. So the
            first move in every part is to write the quantity being asked about as a formula in
            the random length <Katex tex="L" />, and then apply the two rules for a linear
            function of a random variable:
          </p>
          <p>
            <Katex tex="E(aL+b) = aE(L)+b" /> &nbsp;and&nbsp;{' '}
            <Katex tex="\operatorname{Var}(aL+b) = a^2\operatorname{Var}(L)" />.
          </p>
          <p>
            The two differ in an important way: a multiplier gets <em>squared</em> in the
            variance, and an added constant vanishes from it entirely (shifting every value by
            the same amount doesn't change how spread out they are).
          </p>
        </Background>
      </div>

      <PartCard letter="a" topic="Expected Value" marks={1} statement={<>Find the expected volume of a piece of chocolate in cm³.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Variance" marks={1} statement={<>Find the variance of the volume of a piece of chocolate in cm⁶.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Expected Value" marks={1} statement={<>Find the expected surface area of a piece of chocolate in cm².</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
