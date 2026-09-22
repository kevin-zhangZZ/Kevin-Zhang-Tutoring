// 2024 Specialist Mathematics — Exam 1 Question 3 (6 marks). Rewriting a rational function
// in partial-fraction form, then its turning point and a full sketch. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages); the graph is our own drawing of the answer. Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2024e1-q3c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: <>Some students made errors in manipulating the rational functions.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 23, 65],
  average: 1.6,
  comment: (
    <>
      Some students gave the answer with little or no evidence of working. Additional
      incorrect coordinates were sometimes given.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 13, 25, 10],
  average: 1.0,
  comment: (
    <>
      The graph sketching was not done well, and many students gave no clear indication of
      the correct behaviour of the graph. Additional or incorrect asymptotes were submitted,
      and some students with reasonable-looking graphs did not label asymptotes or axis
      intercepts. Some students only drew the right-hand branch.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{let } u = x+1 \implies x-1 = u-2" />,
    reason: 'A substitution turns the rewrite into an expansion, which is far less error-prone than comparing coefficients.',
  },
  {
    working: <Katex display tex="(x-1)^2 = (u-2)^2 = u^2-4u+4" />,
    reason: 'Expanding in the new variable.',
  },
  {
    working: <Katex display tex="f(x) = \frac{u^2-4u+4}{u^2} = 1-\frac4u+\frac{4}{u^2}" />,
    reason: 'Dividing term by term.',
  },
  {
    working: <Katex display tex="\boxed{f(x) = 1-\frac{4}{x+1}+\frac{4}{(x+1)^2}, \quad A=1,\ B=-4,\ C=4}" />,
    reason: <>Substituting <Katex tex="u=x+1" /> back. Check at <Katex tex="x=0" />: <Katex tex="1-4+4=1" />, and <Katex tex="f(0)=\tfrac{1}{1}=1" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 1-4(x+1)^{-1}+4(x+1)^{-2}" />,
    reason: 'Differentiating the part-fraction form avoids the quotient rule entirely.',
  },
  {
    working: <Katex display tex="f'(x) = 4(x+1)^{-2}-8(x+1)^{-3}" />,
    reason: 'Chain rule on each power.',
  },
  {
    working: <Katex display tex="= \frac{4(x+1)-8}{(x+1)^3} = \frac{4x-4}{(x+1)^3}" />,
    reason: 'Over a common denominator.',
  },
  {
    working: <Katex display tex="f'(x) = 0 \implies 4x-4 = 0 \implies x = 1" />,
    reason: <>The denominator never vanishes on the domain, so this is the only stationary point — the question already tells us there is exactly one.</>,
  },
  {
    working: <Katex display tex="f(1) = \frac{(1-1)^2}{(1+1)^2} = 0" />,
    reason: 'Substituting back into the original rule.',
  },
  {
    working: <Katex display tex="\boxed{(1,\ 0)}" />,
    reason: <>A minimum: <Katex tex="f\ge0" /> everywhere, so a zero value has to be the lowest point. That also makes it the <Katex tex="x" />-intercept, which part c. needs.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x+1 = 0 \implies \text{vertical asymptote } x = -1" />,
    reason: 'The one excluded value of the domain.',
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies \frac{4}{x+1},\ \frac{4}{(x+1)^2} \to 0 \implies \text{horizontal asymptote } y = 1" />,
    reason: 'Read straight off the part-fraction form from part a. There are no others — extra asymptotes were a listed error.',
  },
  {
    working: <Katex display tex="\text{intercepts: } (1,0) \text{ from part b., and } f(0) = 1 \implies (0,1)" />,
    reason: <>Both had to be labelled. Note the <Katex tex="y" />-intercept sits <em>on</em> the horizontal asymptote — solving <Katex tex="f(x)=1" /> gives <Katex tex="x=0" />, so the curve crosses <Katex tex="y=1" /> exactly once.</>,
  },
  {
    working: <Katex display tex="x<-1: \quad f(-2)=9,\ f(-3)=4,\ f(-6)=\tfrac{49}{25}\approx2.0" />,
    reason: <>Evaluating a few points is the reliable way to get the left branch right: it falls from <Katex tex="+\infty" /> towards <Katex tex="y=1" /> from <em>above</em> as <Katex tex="x\to-\infty" />. Half the cohort drew only the right branch.</>,
  },
  {
    working: <Katex display tex="x>-1: \quad f\to+\infty \ \text{at } x\to-1^+, \ \text{ down through } (0,1) \text{ to } (1,0), \text{ then up towards } y=1" />,
    reason: <>Always below <Katex tex="y=1" /> after the crossing, since <Katex tex="f(x)<1" /> for all <Katex tex="x>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{see the graph below}}" />,
    reason: 'Asymptotes labelled with their equations and both intercepts with their coordinates, as required.',
  },
]

export default function SpecialistQ3_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (6 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\setminus\{-1\}\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=\dfrac{(x-1)^2}{(x+1)^2}" />. The rule <Katex tex="f(x)" /> can be
          written in the form{' '}
          <Katex tex="f(x)=A+\dfrac{B}{x+1}+\dfrac{C}{(x+1)^2}" />, where{' '}
          <Katex tex="A,B,C\in\mathbb{Z}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Part a. is worth doing properly because it pays for the rest of the question. In
            the form <Katex tex="1-\tfrac{4}{x+1}+\tfrac{4}{(x+1)^2}" /> the horizontal
            asymptote <Katex tex="y=1" /> is visible at a glance, and differentiating two
            powers beats the quotient rule on the original.
          </p>
          <p>
            The graph in part c. has an unusual feature worth noticing: since{' '}
            <Katex tex="f(x)=1" /> has the single solution <Katex tex="x=0" />, the curve{' '}
            <em>crosses</em> its own horizontal asymptote at the <Katex tex="y" />-intercept.
            There is no rule against that — the asymptote only governs behaviour far out.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Show that <Katex tex="A=1" />, <Katex tex="B=-4" /> and <Katex tex="C=4" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            The graph of <Katex tex="f" /> has one turning point. Find the coordinates of this
            turning point.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" />. Label the asymptotes with their
            equations and the axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="Two branches either side of the dashed asymptote x = −1, both approaching the dashed asymptote y = 1 far out; the left branch falls from +∞ towards y = 1, the right branch falls from +∞ through the labelled point (0, 1) to the labelled minimum (1, 0) and then rises back towards y = 1"
            className="w-full max-w-[540px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
