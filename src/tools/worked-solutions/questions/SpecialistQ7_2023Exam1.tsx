// 2023 Specialist Mathematics — Exam 1 Question 7 (4 marks). Surface area of a parametric
// surface of revolution, new to the 2023 study design. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.
// No interactive (2023 widget pass, 31% full marks; re-audited 9 Oct 2026): the report puts the
// lost marks on finding the antiderivative (inspection instead of an explicit substitution) —
// algebra that a picture doesn't fix, so the reasons spell out the substitution and the `more`
// notes show how a guess goes wrong and how to check it. Concise/Detailed (9 Oct): the
// substitution signal sits in row 4's reason; the inspection trap, the alternative
// substitution and the Cartesian route (all from the report) are in `more`.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [17, 24, 13, 15, 31],
  average: 2.2,
  comment: (
    <>
      Depending on how students elected to manipulate the integrand, various substitutions
      would lead to the same result. A small number of students successfully expressed the
      curve in Cartesian form and evaluated an appropriate integral to obtain the correct
      result.
      <br />
      Some students did not use a substitution and instead tried to rely on inspection or
      recognition to find an antiderivative. This approach was not always successful. Doing an
      explicit substitution was the more reliable approach.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_{t_1}^{t_2}y\,\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\;dt" />,
    reason: <>Surface area of revolution about the <Katex tex="x" />-axis in parametric form, from the formula sheet. Each point of the curve traces a circle of radius <Katex tex="y" /> as it rotates, and <Katex tex="y=\sqrt3\,t\ge0" /> for <Katex tex="0\le t\le2" />, so the radius <Katex tex="y" /> is never negative here and goes straight into the formula.</>,
    more: <>The radius is a distance, so the formula really uses <Katex tex="|y|" />. If <Katex tex="y" /> were negative on part of the interval, you would have to split the integral where <Katex tex="y" /> changes sign. Here there is nothing to fix.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{t}{2}, \qquad \frac{dy}{dt} = \sqrt3" />,
    reason: <>From <Katex tex="x=\tfrac{t^2}{4}-1" /> and <Katex tex="y=\sqrt3\,t" />.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^2\sqrt3\,t\,\sqrt{\frac{t^2}{4}+3}\;dt" />,
    reason: <>Terminals <Katex tex="0" /> and <Katex tex="2" /> from <Katex tex="0\le t\le2" />, and <Katex tex="\left(\tfrac t2\right)^2+\left(\sqrt3\right)^2=\tfrac{t^2}{4}+3" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} u = \frac{t^2}{4}+3, \quad \frac{du}{dt} = \frac t2 \\ \implies t\,dt = 2\,du \\ t=0\Rightarrow u=3, \quad t=2\Rightarrow u=4 \end{gathered}" />,
    reason: <>The inside of the root, <Katex tex="\tfrac{t^2}{4}+3" />, has derivative <Katex tex="\tfrac t2" />, and a <Katex tex="t" /> multiplies the root. A multiple of the inside's derivative sitting outside is the signal to substitute <Katex tex="u=" /> the inside, and to change the terminals so the integral is entirely in <Katex tex="u" />.</>,
    more: <>Other substitutions work too; the report notes that various substitutions lead to the same result. For example, <Katex tex="\sqrt{\tfrac{t^2}{4}+3}=\tfrac12\sqrt{t^2+12}" />, and then <Katex tex="u=t^2+12" /> gives <Katex tex="t\,dt=\tfrac12\,du" /> with terminals <Katex tex="12" /> and <Katex tex="16" />.</>,
  },
  {
    working: <Katex display tex="S = 2\sqrt3\,\pi\int_3^4\sqrt u\cdot2\,du = 4\sqrt3\,\pi\left[\frac23u^{3/2}\right]_3^4" />,
    reason: <>The constants <Katex tex="2\pi\times\sqrt3\times2=4\sqrt3\,\pi" /> come out the front, and <Katex tex="\int u^{1/2}\,du=\tfrac23u^{3/2}" />.</>,
    more: <>The report notes that some students skipped the substitution and relied on inspection to find the antiderivative, which was not always successful. The tempting guess is <Katex tex="\tfrac23\left(\tfrac{t^2}{4}+3\right)^{3/2}" />, but differentiating it gives only <Katex tex="\tfrac t2\sqrt{\tfrac{t^2}{4}+3}" />, which is half of the <Katex tex="t\sqrt{\tfrac{t^2}{4}+3}" /> being integrated (the integrand with its constant <Katex tex="\sqrt3" /> set aside), because the chain rule brings out the inside's derivative <Katex tex="\tfrac t2" />. The correct antiderivative is <Katex tex="\tfrac43\left(\tfrac{t^2}{4}+3\right)^{3/2}" />. If you do write one down by inspection, differentiate it to check before you use it.</>,
  },
  {
    working: <Katex display tex="= \frac{8\sqrt3\,\pi}{3}\left(4^{3/2}-3^{3/2}\right) = \frac{8\sqrt3\,\pi}{3}\left(8-3\sqrt3\right)" />,
    reason: <><Katex tex="4\sqrt3\,\pi\times\tfrac23=\tfrac{8\sqrt3\,\pi}{3}" />, and <Katex tex="4^{3/2}=\left(\sqrt4\right)^3=8" />, <Katex tex="3^{3/2}=3\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{3}\left(64\sqrt3-72\right) = \pi\left(\frac{64\sqrt3}{3}-24\right)" />,
    reason: <>Expanding: <Katex tex="8\sqrt3\times8=64\sqrt3" /> and <Katex tex="8\sqrt3\times3\sqrt3=72" />, so the second term is <Katex tex="\tfrac{72}{3}=24" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S = \pi\left(\frac{64\sqrt3}{3}-24\right) \ \text{square units}}" />,
    reason: <>The required form with <Katex tex="a=64" />, <Katex tex="b=3" />, <Katex tex="c=3" />, <Katex tex="d=24" />; about <Katex tex="40.7" />.</>,
    more: <>The report notes that a small number of students used Cartesian form instead, which also makes a good check. From <Katex tex="t=\tfrac{y}{\sqrt3}" />, <Katex tex="x=\tfrac{y^2}{12}-1" />, so <Katex tex="y=2\sqrt3\,\sqrt{x+1}" /> (the positive root, since <Katex tex="y=\sqrt3\,t\ge0" />), with <Katex tex="-1\le x\le0" /> because <Katex tex="t=0" /> and <Katex tex="t=2" /> give <Katex tex="x=-1" /> and <Katex tex="x=0" />. Then <Katex tex="\tfrac{dy}{dx}=\tfrac{\sqrt3}{\sqrt{x+1}}" />, so <Katex tex="1+\left(\tfrac{dy}{dx}\right)^2=\tfrac{x+4}{x+1}" /> and <Katex tex="y\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}=2\sqrt3\,\sqrt{x+4}" />. The Cartesian formula from the formula sheet, <Katex tex="S=2\pi\int_a^b y\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\;dx" />, then gives <Katex tex="S=2\pi\int_{-1}^{0}2\sqrt3\,\sqrt{x+4}\;dx=4\sqrt3\,\pi\left[\tfrac23(x+4)^{3/2}\right]_{-1}^{0}" />, which is <Katex tex="4\sqrt3\,\pi\times\tfrac23\left(8-3\sqrt3\right)" />, the same as above, with no substitution needed.</>,
  },
]

export default function SpecialistQ7_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>The curve defined by the parametric equations</p>
        <Katex display tex="x=\frac{t^2}{4}-1, \ y=\sqrt3\,t, \ \text{where } 0\le t\le2," />
        <p>
          is rotated about the <Katex tex="x" />-axis to form an open hollow surface of
          revolution.
          <br />
          Find the surface area of the surface of revolution.
          <br />
          Give your answer in the form{' '}
          <Katex tex="\pi\left(\dfrac{a\sqrt b}{c}-d\right)" />, where{' '}
          <Katex tex="a,b,c\text{ and }d\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Surface area of revolution arrived with the 2023 study design. Rotating the curve
            sweeps out thin rings: each has circumference <Katex tex="2\pi y" /> and slant
            width equal to a small piece of arc length,{' '}
            <Katex tex="\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />.
            Adding up the rings gives the formula-sheet integral used below.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
