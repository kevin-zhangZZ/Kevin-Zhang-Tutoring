// 2024 Specialist NHT — Exam 1, Question 7 (4 marks). The NHT report gives sample answers only,
// with no statistics. Surface area of revolution about the y-axis for the parametric curve x = 8t,
// y = t² − 8log_e(t), t ∈ [1, 3]: the expression under the root is a perfect square,
// 64 + (2t − 8/t)² = (2t + 8/t)², and the area is 1600π/3. Question text transcribed from the
// original paper (read from a rendered page image). Answer checked with sympy (exact and numerical
// integration) and against the VCAA report's sample answer, which agrees. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt}=8,\qquad\frac{dy}{dt}=2t-\frac8t" />,
    reason: <>The derivative of <Katex tex="8\log_e(t)" /> is <Katex tex="\tfrac8t" />.</>,
  },
  {
    working: <Katex display tex="S=2\pi\int_1^3 x\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Rotating about the <Katex tex="y" />-axis, each point of the curve sweeps a circle of radius <Katex tex="x" /> (its distance from the <Katex tex="y" />-axis). So the radius in the formula is <Katex tex="x" />, not <Katex tex="y" />.</>,
    more: <>Here <Katex tex="x=8t>0" /> for every <Katex tex="t\in[1,3]" />, so <Katex tex="x" /> is a genuine (positive) radius. Notice <Katex tex="y=t^2-8\log_e(t)" /> is negative for much of the interval (<Katex tex="y(3)=9-8\log_e3\approx0.2" />, <Katex tex="y(2)\approx-1.5" />), which is why using <Katex tex="y" /> as the radius would go badly wrong.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 \\ &=64+\left(2t-\frac8t\right)^2 \\ &=64+4t^2-32+\frac{64}{t^2} \\ &=4t^2+32+\frac{64}{t^2}\end{aligned}" />,
    reason: <>Simplify what is under the square root first. Expand: <Katex tex="\left(2t-\tfrac8t\right)^2=4t^2-2(2t)\left(\tfrac8t\right)+\tfrac{64}{t^2}" />, and the middle term is <Katex tex="-32" />.</>,
  },
  {
    working: <Katex display tex="4t^2+32+\frac{64}{t^2}=\left(2t+\frac8t\right)^2" />,
    reason: <>The key step. Adding <Katex tex="64" /> turned <Katex tex="-32" /> into <Katex tex="+32" />, which is exactly the middle term of <Katex tex="\left(2t+\tfrac8t\right)^2" />. Exam 1 arc-length and surface-area questions are built so that this happens.</>,
  },
  {
    working: <Katex display tex="\sqrt{\left(2t+\frac8t\right)^2}=2t+\frac8t" />,
    reason: <>For <Katex tex="t\in[1,3]" />, <Katex tex="2t+\tfrac8t>0" />, so the square root is the expression itself (no absolute value needed).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}S&=2\pi\int_1^3 8t\left(2t+\frac8t\right)dt \\ &=16\pi\int_1^3\left(2t^2+8\right)dt\end{aligned}" />,
    reason: <>Substitute <Katex tex="x=8t" /> and the simplified root, then take the constant <Katex tex="2\pi\times8=16\pi" /> outside. Expanding, <Katex tex="t\left(2t+\tfrac8t\right)=2t^2+8" />: the <Katex tex="t" /> cancels the <Katex tex="\tfrac1t" />, leaving a polynomial.</>,
  },
  {
    working: <Katex display tex="=16\pi\left[\frac{2t^3}{3}+8t\right]_1^3" />,
    reason: <>Antidifferentiate term by term: <Katex tex="2t^2" /> becomes <Katex tex="\tfrac{2t^3}{3}" /> and <Katex tex="8" /> becomes <Katex tex="8t" />.</>,
  },
  {
    working: <Katex display tex="=16\pi\left[(18+24)-\left(\frac23+8\right)\right]=16\pi\times\frac{100}{3}" />,
    reason: <>Upper terminal minus lower terminal: <Katex tex="42-\tfrac{26}{3}=\tfrac{126-26}{3}=\tfrac{100}3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S=\frac{1600\pi}{3}}" />,
    reason: <>In the form <Katex tex="\tfrac{a\pi}{b}" /> with <Katex tex="a=1600" />, <Katex tex="b=3" />.</>,
    more: <>Magnitude check: the radius runs from 8 to 24 (average about 16), and the curve is about <Katex tex="\int_1^3\left(2t+\tfrac8t\right)dt=8+8\log_e3\approx16.8" /> long, so <Katex tex="S\approx2\pi\times16\times16.8\approx1700" />, close to <Katex tex="\tfrac{1600\pi}3\approx1676" /> ✓.</>,
  },
]

export default function SpecialistQ7_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>
          The curve defined by the parametric equations <Katex tex="x=8t" /> and <Katex tex="y=t^2-8\log_e(t)" />, where{' '}
          <Katex tex="t\in[1,3]" />, is rotated about the <Katex tex="y" />-axis to form a surface of revolution.
        </p>
        <p>
          Find the area of the surface of revolution formed.
          <br />
          Give your answer in the form <Katex tex="\dfrac{a\pi}{b}" /> where <Katex tex="a,b\in Z^+" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Cut the curve into tiny pieces of length <Katex tex="ds=\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,dt" />.
            Rotated about an axis, each piece sweeps out a thin band whose area is its length times the circumference
            of the circle it travels round, <Katex tex="2\pi\times\text{radius}" />. Adding up the bands gives{' '}
            <Katex tex="S=2\pi\int(\text{radius})\,ds" />, where the radius is the distance from the axis of rotation:{' '}
            <Katex tex="x" /> for the <Katex tex="y" />-axis, <Katex tex="y" /> for the <Katex tex="x" />-axis.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Use y as the radius"
          working={<Katex display tex="S=2\pi\int_1^3\left(t^2-8\log_e(t)\right)\left(2t+\frac8t\right)dt" />}
        >
          That is the surface made by rotating about the <b>x</b>-axis. For the <Katex tex="y" />-axis the radius is
          the horizontal distance, <Katex tex="x=8t" />. Here the mistake is also visible from the sign: <Katex tex="y" />{' '}
          is negative for most of the interval, and a radius can&apos;t be negative.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
