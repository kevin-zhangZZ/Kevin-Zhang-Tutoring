// 2023 Specialist Mathematics — Exam 1 Question 1 (4 marks). Dividing a quadratic over a
// linear to expose an oblique asymptote, then sketching. Question text transcribed from the
// original paper; the sketch is our own matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2023e1-q1b-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Various approaches were seen, including long and
      synthetic division. Some students made algebraic or arithmetic errors in their
      calculations.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 20, 23, 39],
  average: 1.9,
  comment: (
    <>
      The graph needed to have both asymptotes, <Katex tex="x=1" /> and <Katex tex="y=x+2" />,
      correct and labelled. While the axial intercepts did not need to be labelled, the graph
      line needed to pass through the correct points.
      <br />
      Some graphs did not display asymptotic behaviour, retreating from the asymptotes. The
      oblique asymptote <Katex tex="y=x+2" /> was sometimes missing, even when a graph with
      reasonable asymptotic behaviour was drawn.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+x-6 = x(x-1)+2(x-1)-4" />,
    reason: <>Rebuilding the numerator around the factor <Katex tex="(x-1)" />: <Katex tex="x^2-x" /> plus <Katex tex="2x-2" /> gives <Katex tex="x^2+x-2" />, so the remainder is <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="\frac{x^2+x-6}{x-1} = \frac{x(x-1)}{x-1}+\frac{2(x-1)}{x-1}-\frac{4}{x-1}" />,
    reason: <>Splitting the fraction so each piece cancels — long division gives the same three terms.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x+2-\frac{4}{x-1}}" />,
    reason: <>Check by recombining over <Katex tex="x-1" />: <Katex tex="(x+2)(x-1)-4=x^2+x-6" /> ✓. This form is the whole point — the quotient <Katex tex="x+2" /> is the oblique asymptote. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x-1 = 0 \implies x = 1 \ \text{(vertical asymptote)}" />,
    reason: <>The numerator at <Katex tex="x=1" /> is <Katex tex="1+1-6=-4\ne0" />, so it is a genuine asymptote.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{4}{x-1}\to0 \implies y = x+2 \ \text{(oblique asymptote)}" />,
    reason: <>Straight from part a. Both asymptotes must be drawn and labelled with their equations — the report notes the oblique asymptote was sometimes missing.</>,
  },
  {
    working: <Katex display tex="f(x) = 0 \implies x^2+x-6 = (x+3)(x-2) = 0 \implies x = -3,\ 2" />,
    reason: <>One intercept on each branch, which pins down where the curve crosses.</>,
  },
  {
    working: <Katex display tex="f(0) = \frac{-6}{-1} = 6 \implies (0,\,6)" />,
    reason: <>The <Katex tex="y" />-intercept, on the left branch.</>,
  },
  {
    working: <Katex display tex="f'(x) = 1+\frac{4}{(x-1)^2} > 0 \ \text{ for all } x\ne1" />,
    reason: <>No stationary points: each branch rises steadily. That is what forces the shape once the asymptotes are down.</>,
  },
  {
    working: <Katex display tex="x<1: \ -\frac{4}{x-1}>0 \implies \text{the curve lies } \textbf{above} \ y=x+2" />,
    reason: <>And below it for <Katex tex="x>1" />. Each branch must approach the oblique asymptote from its own side and never cross it — the report notes some graphs retreated from the asymptotes.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from about −5.7 to 5.7, y from −5 to 11): two increasing branches either side of the dashed vertical asymptote x = 1, the left branch above the dashed oblique asymptote y = x + 2 passing through (−3, 0) and (0, 6), the right branch below it passing through (2, 0)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Both asymptotes labelled with their equations. The intercepts did not need labels, the report notes, but the curve must pass through them.</>,
  },
]

export default function SpecialistQ1_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (4 marks)</p>
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{x^2+x-6}{x-1}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            A rational function whose numerator is one degree higher than its denominator has
            an <em>oblique</em> asymptote, and division is what reveals it. Part a. does the
            division; part b. is then almost automatic, because{' '}
            <Katex tex="y=x+2-\tfrac{4}{x-1}" /> says in words: "the line{' '}
            <Katex tex="y=x+2" />, pulled away from by an amount that shrinks to nothing".
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Oblique Asymptote"
        marks={1}
        statement={
          <>
            Show that the rule for the function <Katex tex="f" /> can be written as{' '}
            <Katex tex="f(x)=x+2-\dfrac{4}{x-1}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f" /> on the axes below, labelling any
            asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
