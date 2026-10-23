// 2025 Mathematical Methods NHT — Exam 1, Question 2 (3 marks). The NHT report gives a sample
// answer only, with no statistics; its note on how c, a and b are found is quoted as the examiner
// comment. A cubic g(x) = ax³ + bx² + c through (0, 9) that meets h(x) = x²/4 at (6, 9) with the
// same gradient: c from the y-intercept, then two simultaneous equations for a and b. Question text
// transcribed from the original paper (read from the page images — the 2025 paper has no text
// layer); the graph is cropped from the original VCAA exam PDF. Answers checked with sympy and
// against the VCAA report's sample answer (a = 1/12, b = −1/2, c = 9). Solution is original.

import Katex from '../../../components/Katex'
import { ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2025nhte1-q2-graph.png'

const REPORT: SAExaminerStats = {
  comment: (
    <>
      The value of <Katex tex="c" /> is obtained either by observation of the <Katex tex="y" />-intercept or by evaluation
      of <Katex tex="g(0)" />. In order to find <Katex tex="a" /> and <Katex tex="b" />, students needed to form two
      equations using the point (6, 9), with one involving the derivative.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g(0)=9 &\implies a(0)^3+b(0)^2+c=9 \\ &\implies c=9 \end{aligned}" />,
    reason: <>The graph of <Katex tex="g" /> passes through <Katex tex="(0,9)" />, its <Katex tex="y" />-intercept. Setting <Katex tex="x=0" /> kills every term except <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g(6)=9 &\implies 216a+36b+9=9 \\ &\implies 216a+36b=0 \\ &\implies b=-6a \quad (1)\end{aligned}" />,
    reason: <>Three unknowns need three facts. The second: <Katex tex="g" /> passes through <Katex tex="(6,9)" />. <Katex tex="6^3=216" /> and <Katex tex="6^2=36" />; dividing <Katex tex="216a+36b=0" /> by 36 gives <Katex tex="6a+b=0" />.</>,
  },
  {
    working: <Katex display tex="g'(x)=3ax^2+2bx, \qquad h'(x)=\frac{x}{2}" />,
    reason: <>The third fact is about gradients, so differentiate both functions. <Katex tex="h(x)=\tfrac14x^2" /> gives <Katex tex="h'(x)=\tfrac{2x}{4}=\tfrac x2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g'(6)=h'(6) &\implies 108a+12b=3 \\ &\implies 36a+4b=1 \quad (2)\end{aligned}" />,
    reason: <>&ldquo;The same gradient at this point&rdquo; means the derivatives are equal at <Katex tex="x=6" />: <Katex tex="3a(36)+2b(6)=\tfrac62" />. Divide through by 3.</>,
    more: <>Note what is <em>not</em> used: <Katex tex="g(6)=h(6)" /> on its own just repeats the point <Katex tex="(6,9)" /> (both graphs pass through it). The new information is the matching gradient, so one of the two equations must involve the derivative, as the report says.</>,
  },
  {
    working: <Katex display tex="36a+4(-6a)=1 \implies 12a=1 \implies a=\frac{1}{12}" />,
    reason: <>Substitute (1) into (2).</>,
  },
  {
    working: <Katex display tex="b=-6\times\frac1{12}=-\frac12" />,
    reason: <>Back into (1).</>,
  },
  {
    working: <Katex display tex="\boxed{a=\frac{1}{12},\quad b=-\frac12,\quad c=9}" />,
    reason: <>
      Check: <Katex tex="g(6)=\tfrac{216}{12}-\tfrac{36}{2}+9=18-18+9=9" /> ✓ and{' '}
      <Katex tex="g'(6)=\tfrac{3(36)}{12}-6=9-6=3=h'(6)" /> ✓.
    </>,
    more: <>
      The shape agrees with the graph too: <Katex tex="g'(x)=\tfrac{x^2}{4}-x=\tfrac x4(x-4)" />, so <Katex tex="g" /> has a
      local maximum at <Katex tex="(0,9)" /> and a local minimum at <Katex tex="x=4" />, between the <Katex tex="y" />-axis and{' '}
      <Katex tex="x=6" />, just as the dashed curve is drawn.
    </>,
  },
]

export default function MethodsQ2_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Let
          <br />
          <Katex tex="g:R\to R,\ g(x)=ax^3+bx^2+c" /> where <Katex tex="a,b,c\in R" />
          <br />
          and
          <br />
          <Katex tex="h:R\to R,\ h(x)=\dfrac{x^2}{4}" />
        </p>
        <p>
          The graph of <Katex tex="y=g(x)" /> passes through the point <Katex tex="(0,9)" />.
        </p>
        <p>
          The graphs of <Katex tex="y=g(x)" /> and <Katex tex="y=h(x)" /> pass through the point <Katex tex="(6,9)" /> and have
          the same gradient at this point.
        </p>
        <p>
          The graphs of <Katex tex="y=g(x)" /> and <Katex tex="y=h(x)" /> are shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="From the original 2025 NHT VCAA exam paper: the dashed curve y = g(x) with a local maximum at (0, 9), dipping to a minimum and rising to touch the solid parabola y = h(x) at the marked point (6, 9); the parabola starts at the origin O"
            className="w-full max-w-[380px]"
          />
        </div>
        <p>
          Find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6 flex flex-col gap-4">
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Use g(6) = h(6) as the second equation"
          working={<Katex display tex="216a+36b+9=\frac{36}{4}=9" />}
        >
          That is the same equation as <Katex tex="g(6)=9" />, written a second way, so it gives no new information and{' '}
          <Katex tex="a" /> and <Katex tex="b" /> can&apos;t be separated. Each condition in the stem gives one equation: through{' '}
          <Katex tex="(0,9)" />, through <Katex tex="(6,9)" />, and equal gradients at <Katex tex="x=6" />.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
