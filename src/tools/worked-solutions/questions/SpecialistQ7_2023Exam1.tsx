// 2023 Specialist Mathematics — Exam 1 Question 7 (4 marks). Surface area of a parametric
// surface of revolution, new to the 2023 study design. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [17, 24, 13, 15, 31],
  average: 2.2,
  comment: (
    <>
      Depending on how students manipulated the integrand, various substitutions would lead to
      the same result. Some students did not use a substitution and instead tried to rely on
      inspection or recognition to find an antiderivative; this was not always successful.
      Doing an explicit substitution was the more reliable approach.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_{t_1}^{t_2}y\,\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\;dt" />,
    reason: 'The parametric form of the surface area of a solid of revolution about the x-axis, from the formula sheet.',
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{t}{2}, \qquad \frac{dy}{dt} = \sqrt3" />,
    reason: <>From <Katex tex="x=\tfrac{t^2}{4}-1" /> and <Katex tex="y=\sqrt3\,t" />.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^2\sqrt3\,t\,\sqrt{\frac{t^2}{4}+3}\;dt" />,
    reason: <><Katex tex="\left(\tfrac t2\right)^2+\left(\sqrt3\right)^2=\tfrac{t^2}{4}+3" />. The extra <Katex tex="t" /> out the front is what makes the substitution work.</>,
  },
  {
    working: <Katex display tex="u = \frac{t^2}{4}+3 \implies \frac{du}{dt} = \frac t2 \implies t\,dt = 2\,du" />,
    reason: <>Terminals: <Katex tex="t=0\Rightarrow u=3" /> and <Katex tex="t=2\Rightarrow u=4" />.</>,
  },
  {
    working: <Katex display tex="S = 2\sqrt3\,\pi\int_3^4\sqrt u\cdot2\,du = 4\sqrt3\,\pi\left[\frac23u^{3/2}\right]_3^4" />,
    reason: <><Katex tex="\int u^{1/2}du=\tfrac23u^{3/2}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{8\sqrt3\,\pi}{3}\left(4^{3/2}-3^{3/2}\right) = \frac{8\sqrt3\,\pi}{3}\left(8-3\sqrt3\right)" />,
    reason: <><Katex tex="4^{3/2}=8" /> and <Katex tex="3^{3/2}=3\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{3}\left(64\sqrt3-24\cdot3\right)\div1 = \pi\left(\frac{64\sqrt3}{3}-24\right)" />,
    reason: <>Expanding: <Katex tex="8\sqrt3\times8=64\sqrt3" /> and <Katex tex="8\sqrt3\times3\sqrt3=72" />, so the second term is <Katex tex="\tfrac{72}{3}=24" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S = \pi\left(\frac{64\sqrt3}{3}-24\right) \ \text{square units}}" />,
    reason: <>The required form with <Katex tex="a=64" />, <Katex tex="b=3" />, <Katex tex="c=3" />, <Katex tex="d=24" />; about <Katex tex="40.7" />.</>,
  },
]

export default function SpecialistQ7_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>
          The curve defined by the parametric equations{' '}
          <Katex tex="x=\dfrac{t^2}{4}-1" />, <Katex tex="y=\sqrt3\,t" />, where{' '}
          <Katex tex="0\le t\le2" />, is rotated about the <Katex tex="x" />-axis to form an
          open hollow surface of revolution.
        </p>
        <p>
          Find the surface area of the surface of revolution. Give your answer in the form{' '}
          <Katex tex="\pi\left(\dfrac{a\sqrt b}{c}-d\right)" />, where{' '}
          <Katex tex="a,b,c,d\in\mathbb{Z}^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Surface area of revolution arrived with the 2023 study design. The parametric
            version is <Katex tex="2\pi\int y\,\sqrt{\dot x^2+\dot y^2}\,dt" /> — the
            circumference of each little ring, times the arc length element.
          </p>
          <p>
            What makes this one work is that <Katex tex="\dot x=\tfrac t2" /> leaves a lone{' '}
            <Katex tex="t" /> multiplying the square root, which is exactly the derivative of
            what is <em>inside</em> it. Write the substitution out rather than trying to spot
            the antiderivative; the report is explicit that guessing went badly.
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
