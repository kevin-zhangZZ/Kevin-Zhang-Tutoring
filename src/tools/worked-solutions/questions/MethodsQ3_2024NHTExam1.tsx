// 2024 Mathematical Methods NHT — Exam 1, Question 3 (5 marks). The NHT report gives sample
// answers only, with no statistics; its note on part b. (asymptotes dashed and labelled, smooth
// curves, the base of the logarithm) is quoted as that part's examiner comment. A reflected and
// translated logarithm: maximal domain, sketch, and a double inequality. Question text
// transcribed from the original paper. The part b. sketch is this site's own answer, drawn with
// matplotlib on bare axes like VCAA's (which have no grid or scale). Answers checked with sympy
// and against the VCAA report's sample answers ((−∞, 2); intercepts (0, 3log_e(2)) and (1, 0),
// asymptote x = 2; 2 − e ≤ x ≤ 1). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2024nhte1-q3b-sketch.png'

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      Asymptotes should be marked in as dashed or dotted lines and labelled with their equation. Graph lines should be
      smooth, single stroke constructions and display appropriate asymptotic behaviour. The base of a logarithm needs
      to be given, as <Katex tex="\log(2)" /> without a base, has a different meaning to <Katex tex="\log_e(2)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="2-x>0" />,
    reason: <>A logarithm is only defined for a positive argument, so the expression inside the log must be greater than zero. Nothing else in the rule can fail.</>,
  },
  {
    working: <Katex display tex="\boxed{D=(-\infty,\,2)}" />,
    reason: <>Rearranging, <Katex tex="x<2" />. The endpoint is open: at <Katex tex="x=2" /> the argument is <Katex tex="0" />, and <Katex tex="\log_e(0)" /> is undefined.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Asymptote: } x=2" />,
    reason: <>As <Katex tex="x\to2^-" />, <Katex tex="2-x\to0^+" /> and <Katex tex="\log_e(2-x)\to-\infty" />, so the graph plunges down beside the vertical line <Katex tex="x=2" />. Label it as an equation.</>,
    more: <>The shape: <Katex tex="y=\log_e(x)" /> reflected in the <Katex tex="y" />-axis (giving <Katex tex="\log_e(-x)" />), translated 2 units right (<Katex tex="\log_e(-(x-2))=\log_e(2-x)" />), then dilated by factor 3 from the <Katex tex="x" />-axis. So the asymptote moves from <Katex tex="x=0" /> to <Katex tex="x=2" />, and the curve rises to the left instead of the right.</>,
  },
  {
    working: <Katex display tex="f(0) = 3\log_e(2) \implies \left(0,\,3\log_e(2)\right)" />,
    reason: <>The <Katex tex="y" />-intercept. Keep it exact, with the base <Katex tex="e" /> written in.</>,
    more: <>As the report says, <Katex tex="\log(2)" /> with no base means something different. <Katex tex="3\log_e(2)\approx2.08" />, which helps place the point.</>,
  },
  {
    working: <Katex display tex="3\log_e(2-x)=0 \implies 2-x=1 \implies (1,\,0)" />,
    reason: <>The <Katex tex="x" />-intercept: a log is zero when its argument is 1.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="This site's sketch of y = 3 log_e(2 − x): a smooth curve rising slowly to the left and falling ever more steeply to the right, crossing the y-axis at (0, 3 log_e(2)) and the x-axis at (1, 0), and plunging down beside the dashed vertical asymptote x = 2"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: <>The asymptote dashed and labelled <Katex tex="x=2" />, both intercepts with coordinates, and the curve drawn only for <Katex tex="x<2" />. It is decreasing (the intercepts show it: <Katex tex="f(0)\approx2.08" /> is above <Katex tex="f(1)=0" />), so it rises to the left and falls ever more steeply towards the asymptote without touching it.</>,
    more: <>The left end keeps rising forever (<Katex tex="f(x)\to\infty" /> as <Katex tex="x\to-\infty" />), but slowly: a log curve has no horizontal asymptote, so don&apos;t flatten it out.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}0\le3\log_e(2-x)\le3\\ \iff 0\le\log_e(2-x)\le1\end{gathered}" />,
    reason: <>Divide all three parts by 3.</>,
  },
  {
    working: <Katex display tex="e^0\le2-x\le e^1 \iff 1\le2-x\le e" />,
    reason: <><Katex tex="e^x" /> is increasing, so taking <Katex tex="e" /> to the power of each part keeps the inequalities the same way round.</>,
  },
  {
    working: <Katex display tex="-1\le-x\le e-2 \iff 2-e\le x\le1" />,
    reason: <>Subtract 2, then multiply by <Katex tex="-1" />, which reverses both inequalities.</>,
  },
  {
    working: <Katex display tex="\boxed{2-e\le x\le1}" />,
    reason: <>VCAA also writes this as <Katex tex="[2-e,\,1]" />. Check with the graph: <Katex tex="f(1)=0" /> and <Katex tex="f(2-e)=3\log_e(e)=3" />, and <Katex tex="f" /> is decreasing, so between those <Katex tex="x" />-values it stays between 0 and 3.</>,
    more: <><Katex tex="2-e\approx-0.72" />, so the interval runs from just left of the <Katex tex="y" />-axis to the <Katex tex="x" />-intercept. It lies inside the domain <Katex tex="x<2" />, as it must.</>,
  },
]

export default function MethodsQ3_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f:D\to R,\ f(x)=3\log_e(2-x)" />, where <Katex tex="D" /> is the domain for <Katex tex="f" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Maximal Domain"
        marks={1}
        statement={<>State the maximal domain for <Katex tex="f(x)" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" />, labelling the asymptote with its equation and the axial
            intercepts with their coordinates.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Draw it like log_e(x), rising to the right"
          working={<Katex display tex="\begin{gathered}\text{asymptote } x=0\text{ or } x=-2,\\ \text{curve increasing}\end{gathered}" />}
        >
          The <Katex tex="-x" /> inside the log reflects the graph in a vertical line, so this curve{' '}
          <em>decreases</em>. Check with two values: <Katex tex="f(0)\approx2.08" /> is bigger than{' '}
          <Katex tex="f(1)=0" />. The asymptote is where the argument is zero, <Katex tex="2-x=0" />, so{' '}
          <Katex tex="x=2" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Inequality"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> for which <Katex tex="0\le f(x)\le3" />.
          </>
        }
      >
        <Background>
          <p>
            To undo a log in an inequality, raise <Katex tex="e" /> to each part. Because <Katex tex="e^x" /> is an
            increasing function, this keeps the inequality signs as they are. Multiplying or dividing by a negative
            number is the step that reverses them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
