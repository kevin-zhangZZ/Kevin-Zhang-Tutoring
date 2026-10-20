// 2022 Specialist NHT — Exam 1, Question 5 (3 marks). The NHT report gives sample answers only,
// with no statistics. The locus 3|z + i| = |z| is a circle (the points three times as far from 0
// as from −i): substitute z = x + iy, square, and complete the square to get
// x² + (y + 9/8)² = 9/64, centre (0, −9/8), radius 3/8. Question text transcribed from the original
// paper (read from a rendered page image). The Explore widget
// (interactives/spec-2022nhte1-q5-ratio-circle.tsx) lets a point be dragged onto the circle while
// the two distances are read off. Answer checked with sympy and against the report's sample answer
// (centre (0, −9/8), radius 3/8). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RatioWidget = lazyWidget(() => import('../interactives/spec-2022nhte1-q5-ratio-circle'))

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} z&=x+iy \ 3\sqrt{x^2+(y+1)^2}&=\sqrt{x^2+y^2} \end{aligned}" />,
    reason: <><Katex tex="z+i=x+(y+1)i" />, so <Katex tex="|z+i|=\sqrt{x^2+(y+1)^2}" />, and <Katex tex="|z|=\sqrt{x^2+y^2}" />. This is the distance from <Katex tex="z" /> to <Katex tex="-i" /> and the distance from <Katex tex="z" /> to <Katex tex="0" />.</>,
    more: <>Read as distances, the equation says <Katex tex="z" /> is three times as far from <Katex tex="0" /> as from <Katex tex="-i" />. Equal distances (a ratio of 1) would give a straight line, the perpendicular bisector; any other fixed ratio gives a circle, as the algebra will show.</>,
  },
  {
    working: <Katex display tex="9\left(x^2+(y+1)^2\right)=x^2+y^2" />,
    reason: <>Square both sides to remove the square roots. The <Katex tex="3" /> is squared too, giving <Katex tex="9" />.</>,
    more: <>Squaring is safe here: both sides are distances, never negative, so no extra solutions are introduced. Leaving the coefficient as <Katex tex="3" /> instead of <Katex tex="9" /> is the slip to watch for.</>,
  },
  {
    working: <Katex display tex="9x^2+9y^2+18y+9=x^2+y^2" />,
    reason: <>Expand <Katex tex="(y+1)^2=y^2+2y+1" /> and multiply through by 9.</>,
  },
  {
    working: <Katex display tex="8x^2+8y^2+18y+9=0" />,
    reason: <>Collect everything on one side. The <Katex tex="x^2" /> and <Katex tex="y^2" /> coefficients are equal (both 8) with no <Katex tex="xy" /> term, which confirms a circle.</>,
  },
  {
    working: <Katex display tex="x^2+y^2+\frac94y+\frac98=0" />,
    reason: <>Divide by 8, so that <Katex tex="x^2" /> and <Katex tex="y^2" /> have coefficient 1, ready for completing the square.</>,
  },
  {
    working: <Katex display tex="x^2+\left(y+\frac98\right)^2-\frac{81}{64}+\frac98=0" />,
    reason: <>Complete the square in <Katex tex="y" />: half of <Katex tex="\tfrac94" /> is <Katex tex="\tfrac98" />, and <Katex tex="\left(y+\tfrac98\right)^2=y^2+\tfrac94y+\tfrac{81}{64}" />, so subtract <Katex tex="\tfrac{81}{64}" /> to compensate.</>,
  },
  {
    working: <Katex display tex="x^2+\left(y+\frac98\right)^2=\frac{81}{64}-\frac{72}{64}=\frac{9}{64}" />,
    reason: <>Write <Katex tex="\tfrac98=\tfrac{72}{64}" /> and move both constants to the right.</>,
    more: <>The report reaches the same equation one step earlier, as <Katex tex="8x^2+8\left(y+\tfrac98\right)^2=\tfrac98" />, by completing the square before dividing by 8.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{centre }\left(0,-\tfrac98\right),\ \text{radius }\tfrac38}" />,
    reason: <>Compare with <Katex tex="(x-h)^2+(y-k)^2=r^2" />: <Katex tex="h=0" />, <Katex tex="k=-\tfrac98" />, <Katex tex="r=\sqrt{\tfrac9{64}}=\tfrac38" />. As a complex number the centre is <Katex tex="-\tfrac98i" />. Check: the circle crosses the imaginary axis at <Katex tex="-\tfrac34i" /> and <Katex tex="-\tfrac32i" />, and <Katex tex="\left|-\tfrac34i\right|=\tfrac34=3\left|\tfrac14i\right|" /> ✓.</>,
    more: <>The other crossing checks too: <Katex tex="\left|-\tfrac32i\right|=\tfrac32=3\left|-\tfrac12i\right|" /> ✓. The centre is not at <Katex tex="-i" />, the point in the question, but a little past it: don't be tempted to read the centre straight off <Katex tex="|z+i|" />.</>,
  },
]

export default function SpecialistQ5_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (3 marks)</p>
        <p>
          Find the centre and the radius of the circle defined by <Katex tex="3|z+i|=|z|" />,
          where <Katex tex="z\in C" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            <Katex tex="|z-a|" /> is the distance from <Katex tex="z" /> to the point{' '}
            <Katex tex="a" /> on the Argand plane, so <Katex tex="|z+i|=|z-(-i)|" /> is the
            distance to <Katex tex="-i" />. The equation describes every point three times as far
            from <Katex tex="0" /> as from <Katex tex="-i" />.
          </p>
          <p>
            Unlike <Katex tex="|z-a|=r" />, this is not a circle you can read off directly: its
            centre and radius only appear after converting to cartesian form with{' '}
            <Katex tex="z=x+iy" /> and completing the square.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Three times as far from 0 as from −i: why the locus is a circle around −i, but not centred on it">
          <RatioWidget />
        </Explore>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
