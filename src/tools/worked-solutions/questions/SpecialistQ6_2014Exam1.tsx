// 2014 Specialist Mathematics — Exam 1, Question 6 (5 marks). A division identity, then a
// volume of revolution that uses it. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answer checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactive (Detailed only): Q6b, 37% full marks — y² split into the unit rectangle plus the
// partial-fraction strip, with toggles for the cover-up attempt, the "log of the denominator"
// answer and the unsquared integrand.
// Q6a does not qualify (86% full marks).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2014e1-q6-graph.png'
import { Explore, lazyWidget } from '../Explore'

const SplitWidget = lazyWidget(() => import('../interactives/spec-2014e1-q6b-split'))

const EXAM_A: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      This question was answered well, but many students did not know how a verification or
      proof should be set out. Some arguments were not convincing, and some eventually showed
      that <Katex tex="a=a" /> or similar.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 35, 2, 11, 37],
  average: 2.2,
  comment: (
    <>
      Many students did not use the result from Question 6a. Those who used the result from
      Question 6a. generally answered this question well. Those who did not answer this
      question well commonly used partial fractions, incorrectly attempting{' '}
      <Katex tex="\tfrac{x^2}{x^2-4}=\tfrac{A}{x-2}+\tfrac{B}{x+2}" />. Students are reminded
      that it is often necessary or beneficial to use the results from earlier parts of a
      question in the latter parts. Many students performed the division in this part, missing
      the prompt given. Several did not use partial fractions at all, giving the log of the
      denominator as their answer. A number of arithmetic and simplification errors were
      seen. Most students remembered to include <Katex tex="\pi" /> in their integral, but some
      did not square the expression for <Katex tex="y" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{RHS} = 1+\frac{4}{a-4}" />,
    reason: <>Start from one side only and reduce it to the other — that is what makes a verification convincing.</>,
    more: <>Starting from the right-hand side is easier here, because it is the side with something to combine. You could equally start from the left and write <Katex tex="a" /> as <Katex tex="(a-4)+4" />.</>,
  },
  {
    working: <Katex display tex="= \frac{a-4}{a-4}+\frac{4}{a-4}" />,
    reason: <>Write <Katex tex="1" /> over the common denominator <Katex tex="a-4" />.</>,
  },
  {
    working: <Katex display tex="= \frac{a-4+4}{a-4} = \frac{a}{a-4} = \text{LHS} \quad \text{as required}" />,
    reason: <>The <Katex tex="-4" /> and <Katex tex="+4" /> cancel, leaving exactly the left-hand side.</>,
    more: <>The mark is for this unbroken chain of equal expressions from one side to the other. The report notes that some arguments ended at <Katex tex="a=a" />. Working on both sides until they match shows nothing: you can reach a true statement from a false one too.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_3^4 y^2\,dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis makes discs of radius <Katex tex="y" /> (area <Katex tex="\pi y^2" />), stacked from <Katex tex="x=3" /> to <Katex tex="x=4" />.</>,
    more: <>The region runs from the curve down to <Katex tex="y=0" />, so each disc is solid, with no hole. On <Katex tex="[3,4]" /> the curve is above the axis and well clear of its asymptote at <Katex tex="x=2" />, so the integral is a proper one.</>,
  },
  {
    working: <Katex display tex="y = \frac{x}{\sqrt{x^2-4}} \implies y^2 = \frac{x^2}{x^2-4}" />,
    reason: <>Squaring removes the square root, leaving a rational function to integrate.</>,
    more: <>The report says some students did not square <Katex tex="y" />. Integrating <Katex tex="y" /> itself gives <Katex tex="\pi\left(\sqrt{12}-\sqrt5\right)\approx 3.86" />, which is not a volume of anything here.</>,
  },
  {
    working: <Katex display tex="\frac{x^2}{x^2-4} = 1+\frac{4}{x^2-4}" />,
    reason: <>The top and bottom have the same degree, so divide first. Part a with <Katex tex="a=x^2" /> does that division for you.</>,
    more: (
      <>
        This is where most marks were lost. The report says many students tried{' '}
        <Katex tex="\tfrac{x^2}{x^2-4}=\tfrac{A}{x-2}+\tfrac{B}{x+2}" />. That form only fits a fraction whose top has
        lower degree than its bottom. Forcing it and covering up gives <Katex tex="A=1" />,{' '}
        <Katex tex="B=-1" />, i.e. <Katex tex="\tfrac{1}{x-2}-\tfrac{1}{x+2}=\tfrac{4}{x^2-4}" />: the whole{' '}
        <Katex tex="1" /> is lost, and the volume comes out as <Katex tex="\pi\log_e\tfrac53\approx1.60" />. Others did
        the long division themselves (correct, but part a had already done it), or wrote{' '}
        <Katex tex="\log_e(x^2-4)" /> straight away. That only works when the top is the derivative of the bottom, and{' '}
        <Katex tex="x^2" /> is not <Katex tex="2x" /> (it gives <Katex tex="\pi\log_e\tfrac{12}{5}\approx2.75" />). A
        part a that looks unrelated is usually a hint for part b.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{4}{x^2-4} = \frac{4}{(x-2)(x+2)} = \frac{1}{x-2}-\frac{1}{x+2}" />,
    reason: <>Now proper, so write it as <Katex tex="\tfrac{A}{x-2}+\tfrac{B}{x+2}" /> and multiply through: <Katex tex="4=A(x+2)+B(x-2)" />; <Katex tex="x=2" /> gives <Katex tex="A=1" />, <Katex tex="x=-2" /> gives <Katex tex="B=-1" />.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_3^4\left(1+\frac1{x-2}-\frac1{x+2}\right)dx" />,
    reason: <>Three terms, each with a standard antiderivative.</>,
  },
  {
    working: <Katex display tex="= \pi\Bigl[x+\log_e|x-2|-\log_e|x+2|\Bigr]_3^4" />,
    reason: <>Using <Katex tex="\int\tfrac{1}{x-k}\,dx=\log_e|x-k|" />. On <Katex tex="[3,4]" /> both <Katex tex="x-2" /> and <Katex tex="x+2" /> are positive, so the moduli can be dropped.</>,
  },
  {
    working: <Katex display tex="= \pi\Bigl[(4+\log_e2-\log_e6)-(3+\log_e1-\log_e5)\Bigr]" />,
    reason: <>Substituting the terminals: <Katex tex="4\mp2" /> gives <Katex tex="2" /> and <Katex tex="6" />; <Katex tex="3\mp2" /> gives <Katex tex="1" /> and <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="= \pi\left(1+\log_e\!\left(\tfrac{2\times5}{6}\right)\right)" />,
    reason: <>The <Katex tex="x" /> terms give <Katex tex="4-3=1" />; <Katex tex="\log_e1=0" />; and <Katex tex="\log_e2-\log_e6+\log_e5=\log_e\tfrac{2\times5}{6}" />.</>,
    more: <>Watch the sign of <Katex tex="\log_e5" />: it is subtracted inside a bracket that is itself subtracted, so it ends up added. The report mentions arithmetic and simplification errors at this stage.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\left(1+\log_e\!\left(\tfrac53\right)\right)}" />,
    reason: <>Exact, as Exam 1 requires. The answer is in cubic units.</>,
    more: <>Check: this is about <Katex tex="4.75" />. On <Katex tex="[3,4]" />, <Katex tex="y^2" /> falls from <Katex tex="\tfrac95=1.8" /> to <Katex tex="\tfrac43" />, so the volume must lie between <Katex tex="\tfrac{4\pi}{3}\approx4.19" /> and <Katex tex="1.8\pi\approx5.65" />. The graph below shows the <Katex tex="1" /> as a unit rectangle and compares the curves that the wrong methods integrate.</>,
  },
]

export default function SpecialistQ6_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Algebraic Identity"
        marks={1}
        statement={
          <>
            Verify that <Katex tex="\dfrac{a}{a-4}=1+\dfrac{4}{a-4}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Part of the graph of <Katex tex="y=\dfrac{x}{\sqrt{x^2-4}}" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A curve falling steeply from a vertical asymptote at x = 2 and flattening towards y = 1 as x increases past 4 — from the original 2014 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Volume of Revolution"
        marks={4}
        statement={
          <>
            The region enclosed by the graph of <Katex tex="y=\dfrac{x}{\sqrt{x^2-4}}" /> and
            the lines <Katex tex="y=0" />, <Katex tex="x=3" /> and <Katex tex="x=4" /> is
            rotated about the <Katex tex="x" />-axis. Find the volume of the resulting solid
            of revolution.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="The 1 from part a is a whole unit of area — the wrong methods lose it">
          <SplitWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
