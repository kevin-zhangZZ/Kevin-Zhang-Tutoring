// 2016 Mathematical Methods — Exam 1, Question 3 (5 marks).
// Sketch y = 2 + 3/(x − 1), then an area under it. Question text transcribed from the
// original paper; VCAA supplied blank axes, so the finished sketch below is our own
// matplotlib figure. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import hyperbolaSrc from './meth-2016exam1-q3-hyperbola.png'

const EXAM_A: SAExaminerStats = {
  marks: [9, 10, 24, 57],
  average: 2.3,
  comment: (
    <>
      Some well-constructed graphs were presented by students. The highest-scoring graphs
      were clearly labelled with the correct points and equations, as specified by the
      question, and with care taken in showing the asymptotic behaviour of the curve as it
      approached an asymptote. Using a dashed line to represent an asymptote indicated that
      the curve was distinct from its asymptote.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 29, 46],
  average: 1.2,
  comment: (
    <>
      Students were able to identify the required integral; however, many then erred in the
      evaluation of the terminals. A common error occurring as a result of incorrectly
      applying logarithmic laws was a final answer of <Katex tex="4+\log_e(9)" />. Many
      students were unable to recognise that the antiderivative of the reciprocal of{' '}
      <Katex tex="(x-1)" /> involved a logarithmic function. The "<Katex tex="dx" />" was
      often omitted.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x=1 \text{ and } y=2" />,
    reason: <>The denominator vanishes at <Katex tex="x=1" />; as <Katex tex="x\to\pm\infty" /> the fraction dies away and <Katex tex="f\to2" />. Draw both dashed — the report says a dashed line is what shows the curve is distinct from its asymptote.</>,
  },
  {
    working: <Katex display tex="f(0) = 2+\frac{3}{-1} = -1" />,
    reason: <>The <Katex tex="y" />-intercept.</>,
  },
  {
    working: <Katex display tex="2+\frac{3}{x-1} = 0 \implies x-1 = -\frac32" />,
    reason: <>Setting <Katex tex="f(x)=0" /> for the <Katex tex="x" />-intercept.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac12,\,0\right) \text{ and } (0,-1)}" />,
    reason: <>Both intercepts sit on the left branch, which is why that branch is the one that crosses the axes.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)>0 \text{ on } [2,4]" />,
    reason: <>Both terms are positive there, so no absolute values or splitting is needed — the region is entirely above the axis.</>,
  },
  {
    working: <Katex display tex="A = \int_2^4\left(2+\frac{3}{x-1}\right)dx" />,
    reason: <>Area between the curve and the <Katex tex="x" />-axis from <Katex tex="x=2" /> to <Katex tex="x=4" />.</>,
  },
  {
    working: <Katex display tex="= \Bigl[2x+3\log_e(x-1)\Bigr]_2^4" />,
    reason: <>The antiderivative of <Katex tex="\tfrac{1}{x-1}" /> is <Katex tex="\log_e(x-1)" /> — the report says many students did not recognise this.</>,
  },
  {
    working: <Katex display tex="= \bigl(8+3\log_e3\bigr)-\bigl(4+3\log_e1\bigr)" />,
    reason: <><Katex tex="4-1=3" /> at the top, <Katex tex="2-1=1" /> at the bottom, and <Katex tex="\log_e1=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 4+3\log_e(3)}" />,
    reason: <>Equivalently <Katex tex="4+\log_e(27)" />, since <Katex tex="3\log_e3=\log_e3^3" />. Writing <Katex tex="\log_e9" /> instead is the report's flagged log-law slip. About <Katex tex="7.3" />, which matches a strip of width <Katex tex="2" /> under a curve running from <Katex tex="5" /> down to <Katex tex="3" />.</>,
  },
]

export default function MethodsQ3_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f:R\setminus\{1\}\to R" />, where{' '}
          <Katex tex="f(x)=2+\dfrac{3}{x-1}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f" />. Label the axis intercepts with their
            coordinates and label any asymptotes with the appropriate equation.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Reading a hyperbola off its rule">
          <p>
            <Katex tex="y=c+\dfrac{a}{x-b}" /> is the basic hyperbola{' '}
            <Katex tex="y=\tfrac1x" /> dilated by <Katex tex="a" /> and translated{' '}
            <Katex tex="b" /> right and <Katex tex="c" /> up. So the asymptotes are{' '}
            <Katex tex="x=b" /> and <Katex tex="y=c" />, readable straight off the rule with
            no working at all.
          </p>
          <p>
            That leaves only the two intercepts to compute, and they are one line each.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={hyperbolaSrc}
            alt="Graph of y = 2 + 3/(x − 1): two branches either side of the dashed vertical asymptote x = 1, both approaching the dashed horizontal asymptote y = 2, with the left branch crossing the axes at (−1/2, 0) and (0, −1)"
            className="w-full max-w-[400px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graph of <Katex tex="f" />, the lines{' '}
            <Katex tex="x=2" /> and <Katex tex="x=4" />, and the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
