// 2026 Mathematical Methods NHT — Exam 1, Question 2 (3 marks). The NHT report gives sample
// answers only, with no statistics; its note on the question is quoted as the examiner comment.
// A hyperbola y = m/(x + a) + c from its vertical asymptote and two axis intercepts: a from the
// asymptote, then m and c simultaneously. Question text transcribed from the original paper (no
// diagram). Answers checked with sympy and against the VCAA report's sample answer (a = 6,
// m = 36, c = 18). The figure in the Background is this site's own explanatory graph of the
// hyperbola, which VCAA never printed. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2026nhte1-q2-graph.png'

const REPORT: SAExaminerStats = {
  comment: (
    <>
      This question involved using the information given to determine the value of the unknowns <Katex tex="a" />,{' '}
      <Katex tex="m" /> and <Katex tex="c" />. The axial intercepts could be used to set up a pair of simultaneous
      equations that could be solved to find the value of <Katex tex="m" /> and <Katex tex="c" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x+a=0 \text{ at } x=-6 \implies a=6" />,
    reason: <>
      The vertical asymptote is where the denominator is zero, <Katex tex="x=-a" />. It is at <Katex tex="x=-6" />, so{' '}
      <Katex tex="a=6" />.
    </>,
    more: <>Watch the sign: <Katex tex="x+6" /> is zero at <Katex tex="x=-6" />. Writing <Katex tex="a=-6" /> would put the asymptote at <Katex tex="x=6" />.</>,
  },
  {
    working: <Katex display tex="y=\frac{m}{x+6}+c" />,
  },
  {
    working: <Katex display tex="(-8,0):\quad 0=\frac{m}{-2}+c \implies c=\frac m2 \qquad (1)" />,
    reason: <>The <Katex tex="x" />-intercept is a point on the graph: substitute <Katex tex="x=-8" />, <Katex tex="y=0" />. <Katex tex="-8+6=-2" />.</>,
  },
  {
    working: <Katex display tex="(0,24):\quad 24=\frac{m}{6}+c \qquad (2)" />,
    reason: <>The <Katex tex="y" />-intercept: substitute <Katex tex="x=0" />, <Katex tex="y=24" />.</>,
  },
  {
    working: <Katex display tex="\frac m6+\frac m2=24 \implies \frac{2m}{3}=24 \implies m=36" />,
    reason: <>Substitute (1) into (2). <Katex tex="\tfrac m6+\tfrac{3m}6=\tfrac{4m}6=\tfrac{2m}3" />.</>,
  },
  {
    working: <Katex display tex="c=\frac{36}{2}=18" />,
    reason: <>Back into (1).</>,
  },
  {
    working: <Katex display tex="\boxed{a=6,\quad c=18,\quad m=36}" />,
    reason: <>
      All three are integers, as the question requires. Check: <Katex tex="\tfrac{36}{-2}+18=0" /> and{' '}
      <Katex tex="\tfrac{36}{6}+18=24" />.
    </>,
    more: <>
      The horizontal asymptote is <Katex tex="y=c=18" />. The question only says there is one, so it gives no extra
      equation; it is a consistency check: the graph crosses the <Katex tex="y" />-axis at 24, above 18, and reaches 0 at{' '}
      <Katex tex="x=-8" /> on the other side of the vertical asymptote, below 18. That is exactly how a hyperbola with{' '}
      <Katex tex="m>0" /> sits.
    </>,
  },
]

export default function MethodsQ2_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Consider the graph of the function with the rule <Katex tex="y=\dfrac{m}{x+a}+c" />, where{' '}
          <Katex tex="a,c,m\in Z" />.
        </p>
        <p>
          It has an <Katex tex="x" />-intercept <Katex tex="(-8,0)" />, a <Katex tex="y" />-intercept{' '}
          <Katex tex="(0,24)" />, a vertical asymptote <Katex tex="x=-6" /> and a horizontal asymptote.
        </p>
        <p>
          Find the values of <Katex tex="a" />, <Katex tex="c" /> and <Katex tex="m" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            In <Katex tex="y=\tfrac{m}{x+a}+c" /> each letter controls one feature: <Katex tex="a" /> moves the vertical
            asymptote to <Katex tex="x=-a" />, <Katex tex="c" /> moves the horizontal asymptote to <Katex tex="y=c" />, and{' '}
            <Katex tex="m" /> stretches the curve (and flips it if negative). So read off what you can directly, then use the
            two given points for the two unknowns that are left.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="This site's own graph of y = 36/(x + 6) + 18, with dashed asymptotes x = −6 and y = 18: the right branch crosses the y-axis at (0, 24); the left branch crosses the x-axis at (−8, 0)"
              className="w-full max-w-[380px]"
            />
          </div>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
