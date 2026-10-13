// 2015 Specialist Mathematics — Exam 1, Question 4 (4 marks). The three cube roots of 8i in
// cartesian form, then the same equation translated. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [19, 23, 18, 40],
  average: 1.8,
  comment: (
    <>
      This question was quite well answered by students who used polar form, but not by the
      small number of students who tried to solve the equation in cartesian form. The most
      common errors included finding the incorrect polar form for <Katex tex="8i" /> or
      finding the correct polar form for <Katex tex="8i" /> but making errors in finding the
      other two solutions. Some students who found the correct solutions in polar form either
      left them in polar form or converted them to cartesian form with arithmetical errors.
      Many students assumed that the Conjugate Root Theorem applied. Others tried to use the
      formula for perfect cubes. Some gave factors rather than solutions, and a
      number of students gave only one solution for this cubic.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      Students were expected to recognise that the solutions to Question 4a. needed to be
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
    more: <>Getting this polar form wrong was one of the report's most common errors. Plot the point first: <Katex tex="8i" /> is <Katex tex="(0,8)" />, straight up, so the angle from the positive real axis is a right angle. Solving in cartesian form instead (setting <Katex tex="z=x+yi" /> and expanding <Katex tex="(x+yi)^3" />) leads to a pair of cubic equations in <Katex tex="x" /> and <Katex tex="y" /> — the report notes students who went that way did poorly.</>,
  },
  {
    working: <Katex display tex="z^3 = 8\,\mathrm{cis}\!\left(\tfrac\pi2+2k\pi\right),\ k\in Z" />,
    reason: <><Katex tex="\tfrac\pi2" />, <Katex tex="\tfrac{5\pi}2" />, <Katex tex="\tfrac{9\pi}2" /> are the same point, but divided by 3 they give different angles, so we get three roots, not one.</>,
    more: <>Dividing by 3 turns steps of <Katex tex="2\pi" /> into steps of <Katex tex="\tfrac{2\pi}3" />, which are genuinely different directions. Leaving out the <Katex tex="2k\pi" /> is how students end up with only one solution, which the report notes a number of students gave.</>,
  },
  {
    working: <Katex display tex="z = 2\,\mathrm{cis}\!\left(\tfrac\pi6+\tfrac{2k\pi}3\right)" />,
    reason: <>De Moivre: cube-root the modulus (<Katex tex="\sqrt[3]{8}=2" />) and divide the argument by 3. The three roots are spaced <Katex tex="\tfrac{2\pi}3" /> apart around a circle of radius 2.</>,
  },
  {
    working: <Katex display tex="k=0,1,2:\quad z = 2\,\mathrm{cis}\!\left(\tfrac\pi6\right),\ 2\,\mathrm{cis}\!\left(\tfrac{5\pi}6\right),\ 2\,\mathrm{cis}\!\left(\tfrac{3\pi}2\right)" />,
    reason: <>A cubic has three roots, so take three consecutive values of <Katex tex="k" />.</>,
    more: <>At <Katex tex="k=3" /> the argument is <Katex tex="\tfrac\pi6+2\pi" />, the same point as <Katex tex="k=0" />, so nothing new appears. If you prefer principal arguments, <Katex tex="\tfrac{3\pi}2" /> can be written <Katex tex="-\tfrac\pi2" /> (take <Katex tex="k=-1" /> instead of <Katex tex="k=2" />) — the cartesian answer is the same.</>,
  },
  {
    working: <Katex display tex="2\,\mathrm{cis}\!\left(\tfrac\pi6\right) = 2\!\left(\tfrac{\sqrt3}2+\tfrac12 i\right) = \sqrt3+i" />,
    reason: <>The question asks for cartesian form: <Katex tex="\cos\tfrac\pi6=\tfrac{\sqrt3}2" />, <Katex tex="\sin\tfrac\pi6=\tfrac12" />.</>,
    more: <>The report notes some students left the roots in polar form, or made arithmetic slips converting them to cartesian form.</>,
  },
  {
    working: <Katex display tex="2\,\mathrm{cis}\!\left(\tfrac{5\pi}6\right) = -\sqrt3+i, \qquad 2\,\mathrm{cis}\!\left(\tfrac{3\pi}2\right) = -2i" />,
    reason: <>Same conversion: <Katex tex="\cos\tfrac{5\pi}6=-\tfrac{\sqrt3}2" />, <Katex tex="\sin\tfrac{5\pi}6=\tfrac12" />; <Katex tex="\cos\tfrac{3\pi}2=0" />, <Katex tex="\sin\tfrac{3\pi}2=-1" />.</>,
    more: <>The roots are <em>not</em> a conjugate pair plus a real. The Conjugate Root Theorem needs every coefficient real, and <Katex tex="z^3-8i=0" /> has the non-real coefficient <Katex tex="-8i" />, so it does not apply — the report notes many students assumed it did. The report also notes students who tried the perfect-cubes formula. That route works if done carefully, and makes a good check: <Katex tex="(2i)^3=-8i" />, so <Katex tex="z^3-8i=z^3+(2i)^3=(z+2i)(z^2-2iz-4)" />, and the quadratic formula gives <Katex tex="z=i\pm\sqrt3" />. The easy slip is the sign: it is a <em>sum</em> of cubes, not <Katex tex="z^3-(2i)^3" />. And the question asks for solutions, not factors such as <Katex tex="z-(\sqrt3+i)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = \sqrt3+i,\ -\sqrt3+i,\ -2i}" />,
    reason: <>The three solutions, in cartesian form as asked.</>,
    more: <>A quick check: <Katex tex="(-2i)^3=-8i^3=8i" /> ✓. Also, the roots sum to <Katex tex="0" />: expanding <Katex tex="(z-a)(z-b)(z-c)" /> gives a <Katex tex="z^2" /> coefficient of <Katex tex="-(a+b+c)" />, and <Katex tex="z^3-8i" /> has no <Katex tex="z^2" /> term.</>,
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
    reason: <>Each <Katex tex="z" /> is a part a. root <em>plus</em> <Katex tex="2i" />: add <Katex tex="2i" /> to both sides — a translation two units up.</>,
    more: <>The report notes several students subtracted <Katex tex="2i" />. Geometrically, the part a. roots sit on the circle of radius 2 centred at the origin; the new roots sit on the same-sized circle centred at <Katex tex="2i" />, and <Katex tex="-2i" /> moves up to the origin.</>,
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
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Complex Roots"
        marks={3}
        statement={<>Find all solutions of <Katex tex="z^3=8i" />, <Katex tex="z\in C" />, in cartesian form.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Translated Roots"
        marks={1}
        statement={<>Find all solutions of <Katex tex="(z-2i)^3=8i" />, <Katex tex="z\in C" />, in cartesian form.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Part b. is worth one mark for a cubic equation, which is the signal that it is meant
            to be read off part a. rather than solved from scratch.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
