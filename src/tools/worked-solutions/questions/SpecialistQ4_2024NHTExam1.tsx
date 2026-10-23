// 2024 Specialist NHT — Exam 1, Question 4 (3 marks). The NHT report gives sample answers only,
// with no statistics. Intersection of the line r = 4i − 2j + 2k + t(2i − j + 3k) with the plane
// 2x + 3y − z = 6: parametric equations substituted into the plane give t = −3 and the point
// (−2, 1, −7). Question text transcribed from the original paper (read from a rendered page image).
// Answer checked with sympy and against the VCAA report's sample answer, which agrees. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=4+2t,\quad y=-2-t,\quad z=2+3t" />,
    reason: <>Read the parametric equations off the vector equation: each coordinate is the matching component of the point <Katex tex="(4,-2,2)" /> plus <Katex tex="t" /> times the direction vector <Katex tex="(2,-1,3)" />.</>,
  },
  {
    working: <Katex display tex="2(4+2t)+3(-2-t)-(2+3t)=6" />,
    reason: <>The intersection point is on both the line and the plane, so its coordinates (which depend on <Katex tex="t" />) must satisfy the plane&apos;s equation.</>,
    more: <>Watch the minus sign in front of <Katex tex="z" />: it applies to all of <Katex tex="2+3t" />, so keep the brackets.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&8+4t-6-3t-2-3t=6 \\ &\implies -2t=6\implies t=-3\end{aligned}" />,
    reason: <>The constants cancel (<Katex tex="8-6-2=0" />), and the <Katex tex="t" />-terms give <Katex tex="4t-3t-3t=-2t" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x&=4+2(-3)=-2 \\ y&=-2-(-3)=1 \\ z&=2+3(-3)=-7\end{aligned}" />,
    reason: <>Substitute <Katex tex="t=-3" /> back into the line to get the point. <Katex tex="t" /> itself is not the answer: the question asks for coordinates.</>,
  },
  {
    working: <Katex display tex="\boxed{(-2,\,1,\,-7)}" />,
    reason: <>Check it is on the plane: <Katex tex="2(-2)+3(1)-(-7)=-4+3+7=6" /> ✓.</>,
  },
]

export default function SpecialistQ4_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (3 marks)</p>
        <p>
          Find the coordinates of the point where the line given by the equation{' '}
          <Katex tex="\underset{\sim}{r}=4\underset{\sim}{i}-2\underset{\sim}{j}+2\underset{\sim}{k}+t\left(2\underset{\sim}{i}-\underset{\sim}{j}+3\underset{\sim}{k}\right)" />,
          where <Katex tex="t\in R" />, intersects the plane with the equation <Katex tex="2x+3y-z=6" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A line in vector form, <Katex tex="\underset{\sim}{r}=\underset{\sim}{a}+t\underset{\sim}{d}" />, reaches
            every point on it as <Katex tex="t" /> runs through the real numbers. A plane&apos;s Cartesian equation is a
            test a point either passes or fails. So to find where the line meets the plane, write the general point of
            the line in terms of <Katex tex="t" />, put it into the test, and solve for the one value of{' '}
            <Katex tex="t" /> that passes.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
