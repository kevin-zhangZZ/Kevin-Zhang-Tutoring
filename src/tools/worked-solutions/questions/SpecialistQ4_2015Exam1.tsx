// 2015 Specialist Mathematics — Exam 1, Question 4 (4 marks). The three cube roots of 8i in
// cartesian form, then the same equation translated. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [19, 23, 18, 40],
  average: 1.8,
  comment: (
    <>
      This question was quite well answered by students who used polar form, but not by the
      small number who tried to solve the equation in cartesian form. The most common errors
      included finding the incorrect polar form for <Katex tex="8i" />, or finding the correct
      polar form but making errors in finding the other two solutions. Many students assumed
      that the Conjugate Root Theorem applied. Some gave factors rather than solutions, and a
      number of students gave only one solution for this cubic.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      Students were expected to recognise that the solutions to part a. needed to be
      translated two units up, and so add <Katex tex="2i" />. Several students subtracted{' '}
      <Katex tex="2i" /> from the answers in part a., and a small number tried to solve the
      equation without using their answer to part a.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="8i = 8\,\mathrm{cis}\!\left(\tfrac\pi2\right)" />,
    reason: <>Polar form first. <Katex tex="8i" /> lies on the positive imaginary axis, so its modulus is <Katex tex="8" /> and its argument <Katex tex="\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="z^3 = 8\,\mathrm{cis}\!\left(\tfrac\pi2+2k\pi\right),\ k\in Z" />,
    reason: <>Adding multiples of <Katex tex="2\pi" /> before taking the root is what produces all three solutions rather than one.</>,
  },
  {
    working: <Katex display tex="z = 2\,\mathrm{cis}\!\left(\tfrac\pi6+\tfrac{2k\pi}3\right)" />,
    reason: <>De Moivre: cube-root the modulus (<Katex tex="\sqrt[3]{8}=2" />) and divide the argument by 3. The three roots are spaced <Katex tex="\tfrac{2\pi}3" /> apart around a circle of radius 2.</>,
  },
  {
    working: <Katex display tex="k=0,1,2:\quad z = 2\,\mathrm{cis}\!\left(\tfrac\pi6\right),\ 2\,\mathrm{cis}\!\left(\tfrac{5\pi}6\right),\ 2\,\mathrm{cis}\!\left(\tfrac{3\pi}2\right)" />,
    reason: <>Three values of <Katex tex="k" /> before the arguments start repeating.</>,
  },
  {
    working: <Katex display tex="2\,\mathrm{cis}\!\left(\tfrac\pi6\right) = 2\!\left(\tfrac{\sqrt3}2+\tfrac12 i\right) = \sqrt3+i" />,
    reason: <>Converting to cartesian form, as the question requires.</>,
  },
  {
    working: <Katex display tex="2\,\mathrm{cis}\!\left(\tfrac{5\pi}6\right) = -\sqrt3+i, \qquad 2\,\mathrm{cis}\!\left(\tfrac{3\pi}2\right) = -2i" />,
    reason: <>Note the roots are <em>not</em> a conjugate pair plus a real — the coefficients of this cubic are not all real, so the Conjugate Root Theorem does not apply.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \sqrt3+i,\ -\sqrt3+i,\ -2i}" />,
    reason: <>Check: the three roots sum to <Katex tex="0" />, as they must for <Katex tex="z^3-8i=0" /> (no <Katex tex="z^2" /> term).</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(z-2i)^3 = 8i" />,
    reason: <>The same equation as part a. with <Katex tex="z" /> replaced by <Katex tex="z-2i" />.</>,
  },
  {
    working: <Katex display tex="z-2i = \sqrt3+i,\ -\sqrt3+i,\ -2i" />,
    reason: <>So <Katex tex="z-2i" /> takes exactly the three values found in part a.</>,
  },
  {
    working: <Katex display tex="z = \sqrt3+i+2i,\ -\sqrt3+i+2i,\ -2i+2i" />,
    reason: <><em>Add</em> <Katex tex="2i" /> — a translation two units up in the complex plane. Subtracting it was the common error.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \sqrt3+3i,\ -\sqrt3+3i,\ 0}" />,
    reason: <>The quick check: <Katex tex="z=0" /> gives <Katex tex="(-2i)^3=-8i^3=8i" /> ✓.</>,
  },
]

export default function SpecialistQ4_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Part b. is worth one mark for a cubic equation, which is the signal that it is meant
          to be read off part a. rather than solved from scratch.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={<>Find all solutions of <Katex tex="z^3=8i" />, <Katex tex="z\in C" />, in cartesian form.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={<>Find all solutions of <Katex tex="(z-2i)^3=8i" />, <Katex tex="z\in C" />, in cartesian form.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
