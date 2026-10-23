// 2023 Mathematical Methods NHT — Exam 1, Question 7 (6 marks). The NHT report gives sample
// answers only, with no statistics; its one note beyond the bare answer (part a.: a graph of the
// parabola could be used instead) is quoted as that part's examiner comment. f(x) = log_e(3 + 2x − x²):
// implied domain from a quadratic inequality, the x-coordinate of the local maximum, and the zeros.
// Question text transcribed from the original paper. The graph of the parabola and f in part a.'s
// Background is this site's own explanatory figure (VCAA printed no graph). Answers checked with
// sympy and against the report's sample answers ((−1, 3); x = 1; x = 1 ± √3). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2023nhte1-q7-log-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      Alternatively, a graph of the parabolic inequality <Katex tex="3+2x-x^2>0" /> could be considered.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="3+2x-x^2>0" />,
    reason: <><Katex tex="\log_e" /> is defined only for positive inputs, so the expression inside must be strictly greater than 0.</>,
  },
  {
    working: <Katex display tex="x^2-2x-3<0" />,
    reason: <>Multiply by <Katex tex="-1" /> to get a positive <Katex tex="x^2" /> coefficient, and reverse the inequality sign.</>,
  },
  {
    working: <Katex display tex="(x-3)(x+1)<0" />,
    reason: <>Factorise: two numbers that multiply to <Katex tex="-3" /> and add to <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="-1<x<3" />,
    reason: <>The upward parabola <Katex tex="y=(x-3)(x+1)" /> is negative only between its roots <Katex tex="-1" /> and <Katex tex="3" />.</>,
    more: <>Equivalently, the original downward parabola <Katex tex="y=3+2x-x^2" /> is positive between its roots, the orange arch in the figure above. The report notes that a graph of the parabolic inequality could be used instead of the algebra.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,\,3)}" />,
    reason: <>Round brackets: the endpoints are excluded, since <Katex tex="\log_e(0)" /> is undefined.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=\frac{2-2x}{3+2x-x^2}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{dx}\log_e\bigl(u(x)\bigr)=\tfrac{u'(x)}{u(x)}" />.</>,
  },
  {
    working: <Katex display tex="f'(x)=0\implies2-2x=0\implies x=1" />,
    reason: <>The denominator is positive on the whole domain, so only the numerator can be zero. <Katex tex="x=1" /> lies in <Katex tex="(-1,3)" />.</>,
    more: <>A quicker way for one mark: <Katex tex="\log_e" /> is increasing, so <Katex tex="f" /> is largest exactly where <Katex tex="3+2x-x^2" /> is largest, at the parabola&apos;s turning point, <Katex tex="x=-\tfrac{b}{2a}=-\tfrac{2}{2(-1)}=1" />, midway between the roots <Katex tex="-1" /> and <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=1}" />,
    reason: <>It is a maximum: <Katex tex="f'(x)>0" /> just left of 1 (numerator <Katex tex="2-2x>0" />) and <Katex tex="f'(x)<0" /> just right.</>,
    more: <>The maximum value is <Katex tex="f(1)=\log_e(4)" />, but the question asks only for the <Katex tex="x" />-coordinate.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(3+2x-x^2)=0\implies3+2x-x^2=1" />,
    reason: <><Katex tex="\log_e(a)=0" /> exactly when <Katex tex="a=e^0=1" />.</>,
  },
  {
    working: <Katex display tex="x^2-2x-2=0" />,
    reason: <>Rearrange to a quadratic equal to zero. It doesn&apos;t factorise over the integers, so complete the square (or use the quadratic formula).</>,
  },
  {
    working: <Katex display tex="(x-1)^2-3=0\implies x-1=\pm\sqrt3" />,
    reason: <><Katex tex="x^2-2x=(x-1)^2-1" />, so <Katex tex="x^2-2x-2=(x-1)^2-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=1-\sqrt3\ \text{or}\ x=1+\sqrt3}" />,
    reason: <>Both are in the domain <Katex tex="(-1,3)" />: <Katex tex="1-\sqrt3\approx-0.73" /> and <Katex tex="1+\sqrt3\approx2.73" />, so neither is rejected.</>,
    more: <>They sit symmetrically about <Katex tex="x=1" />, the maximum from part b., as they must: the graph of <Katex tex="f" /> is symmetric about the parabola&apos;s axis.</>,
  },
]

export default function MethodsQ7_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (6 marks)</p>
        <p>
          Let <Katex tex="f(x)=\log_e(3+2x-x^2)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Implied Domain"
        marks={3}
        statement={
          <>
            Find the implied domain of <Katex tex="f" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            The implied (maximal) domain is every <Katex tex="x" /> for which the rule makes sense. For a log, that means
            the input must be positive. Here the input is a downward parabola, so <Katex tex="f" /> exists only where the
            parabola is above the <Katex tex="x" />-axis.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="Our explanatory graph: the orange parabola y = 3 + 2x − x² with maximum (1, 4), above the x-axis between −1 and 3; the blue curve y = log_e(3 + 2x − x²) exists only between dashed asymptotes x = −1 and x = 3, peaks at (1, log_e(4)) and crosses the x-axis at 1 − √3 and 1 + √3"
              className="w-full max-w-[400px]"
            />
          </div>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Flip the parabola but keep the sign"
          working={<Katex display tex="x^2-2x-3>0\implies x<-1\ \text{or}\ x>3" />}
        >
          Multiplying an inequality by a negative number reverses it. This answer is exactly where{' '}
          <Katex tex="3+2x-x^2" /> is <em>negative</em>. Check with a test value: <Katex tex="x=0" /> gives{' '}
          <Katex tex="\log_e(3)" />, which exists, so 0 must be in the domain.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Stationary Points"
        marks={1}
        statement={
          <>
            State the <Katex tex="x" />-coordinate for the local maximum of <Katex tex="f(x)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Log Equations"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="x" /> when <Katex tex="f(x)=0" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
