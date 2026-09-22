// 2023 Mathematical Methods — Exam 2, Section B Question 5 (11 marks). A catenary built from
// e^x + e^(−x): transformations, two one-to-one branches and their inverses, and a family
// version whose turning point traces a hyperbola. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2023e2-q5-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [18, 48, 35],
  average: 1.2,
  comment: (
    <>
      The order of the transformations needed to be correct, as well as the wording. A common
      incorrect answer was "reflect in the <Katex tex="y" />-axis and then translate 2 units
      to the left".
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 21, 39],
  average: 1.0,
  comment: (
    <>
      Often the domain and range were reversed. Students gave the domain and range of{' '}
      <Katex tex="g_1" />, not <Katex tex="g_1^{-1}" />. Many students appeared to find the
      notation confusing.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Some students did not realise that <Katex tex="P" /> and <Katex tex="Q" /> were points
      on the line <Katex tex="y=x" /> and had different values for <Katex tex="x" /> and{' '}
      <Katex tex="y" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [65, 6, 29],
  average: 0.6,
  comment: (
    <>
      Some students set up the correct definite integral but did not provide an answer. Others
      did not multiply the integral by 2, giving 2.78.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [87, 13],
  average: 0.1,
  comment: <>A common incorrect answer was <Katex tex="n=1" />.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [96, 4],
  average: 0.0,
  comment: <>This question was not done well. Many students did not attempt it.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [86, 2, 12],
  average: 0.3,
  comment: (
    <>
      Those students who set up the correct definite integral generally gave the correct
      answer. A common incorrect terminal was <Katex tex="x=2.468" />, the intersection of{' '}
      <Katex tex="h" /> with <Katex tex="y=x" /> rather than with <Katex tex="h_1^{-1}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \tfrac12f(2-x) = \tfrac12f\bigl(-(x-2)\bigr)" />,
    reason: <>Rewrite the inner expression as <Katex tex="-(x-2)" /> — that makes the reflection and the translation visible separately.</>,
  },
  {
    working: <Katex display tex="\text{Dilation of factor } \tfrac12 \text{ from the } x\text{-axis} \implies y = \tfrac12f(x)" />,
    reason: 'The step the question has already given you.',
  },
  {
    working: <Katex display tex="\text{Reflection in the } y\text{-axis} \implies y = \tfrac12f(-x)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="-x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Translation of 2 units in the positive } x \text{ direction} \implies y = \tfrac12f\bigl(-(x-2)\bigr)}" />,
    reason: <>The order matters: reflecting <em>then</em> translating right gives <Katex tex="f(2-x)" />, while translating right then reflecting gives <Katex tex="f(-x-2)" />. Translating 2 <em>left</em> first and then reflecting also works.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \tfrac12\left(e^{2-x}+e^{x-2}\right)" />,
    reason: <>Writing <Katex tex="f" /> out. This is a catenary: symmetric about <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = \tfrac12\left(-e^{2-x}+e^{x-2}\right) = 0 \implies x = 2" />,
    reason: 'The single turning point, where the two exponentials are equal.',
  },
  {
    working: <Katex display tex="g(2) = \tfrac12(1+1) = 1 \implies \text{minimum } (2,\,1)" />,
    reason: 'So the curve decreases to the left of 2 and increases to the right.',
  },
  {
    working: <Katex display tex="g_1: [2,\infty)\to\mathbb{R} \implies \text{range } [1,\infty)" />,
    reason: 'The strictly increasing branch.',
  },
  {
    working: <Katex display tex="\boxed{g_1^{-1}: \ \text{domain } [1,\infty), \ \text{range } [2,\infty)}" />,
    reason: <>Inverting swaps them. The question asks about <Katex tex="g_1^{-1}" />, not <Katex tex="g_1" /> — reversing the two was the report's main complaint. Either bracket type was accepted, since the maximal domain was not demanded.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="P \text{ and } Q \text{ lie on } y=x" />,
    reason: <>A function and its inverse meet on <Katex tex="y=x" />, and the diagram shows all three curves crossing there.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(2−x)+e^(x−2))/2 = x, x)
      </Cas>
    ),
    reason: <>Solving <Katex tex="g(x)=x" /> — one equation, two roots.</>,
  },
  {
    working: <Katex display tex="x = 1.27474\ldots \ \text{ and } \ x = 4.08519\ldots" />,
    reason: 'Both on the left and right branches respectively.',
  },
  {
    working: <Katex display tex="\boxed{P(1.27,\ 1.27), \quad Q(4.09,\ 4.09)}" />,
    reason: <>Both coordinates are equal because the points are on <Katex tex="y=x" /> — substituting back into <Katex tex="g" /> and rounding separately is what produced the report's <Katex tex="Q(4.09,4.10)" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The region is symmetric about } y=x" />,
    reason: <>The two inverse branches are reflections of <Katex tex="g" />, so the region splits into two congruent halves either side of the line.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{1.27474}^{4.08519}\bigl(x-g(x)\bigr)dx" />,
    reason: <>The half between <Katex tex="y=x" /> and <Katex tex="g" />, doubled. Forgetting the 2 gives <Katex tex="2.78" />, the report's named error.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        2·nInt(x − (e^(2−x)+e^(x−2))/2, x, 1.27474, 4.08519)
      </Cas>
    ),
    reason: <>Using the unrounded terminals from part c.i. Integrating <Katex tex="g_1^{-1}-g" /> instead is incorrect — that is not the region shown.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 5.56 \ \text{square units}}" />,
    reason: <>Two decimal places. The region is a lens roughly <Katex tex="2.8" /> long and <Katex tex="1.4" /> across at its widest, so 5.6 is the right order.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac1kf(k-x) = \tfrac1k\left(e^{k-x}+e^{x-k}\right)" />,
    reason: <>The same shape as <Katex tex="g" />, but with <Katex tex="k" /> in place of 2 both inside and as the dilation factor.</>,
  },
  {
    working: <Katex display tex="h'(x) = \tfrac1k\left(-e^{k-x}+e^{x-k}\right) = 0 \implies x = k" />,
    reason: 'By the same argument as part b.',
  },
  {
    working: <Katex display tex="h(k) = \tfrac1k(1+1) = \frac2k \implies \text{turning point } \left(k,\ \tfrac2k\right)" />,
    reason: <>As <Katex tex="k" /> varies, this point traces a curve.</>,
  },
  {
    working: <Katex display tex="y = 2x^n \text{ through } \left(k,\tfrac2k\right): \quad \frac2k = 2k^n \implies k^n = k^{-1}" />,
    reason: 'Substituting the turning point into the given family.',
  },
  {
    working: <Katex display tex="\boxed{n = -1}" />,
    reason: <>The turning points lie on the hyperbola <Katex tex="y=\tfrac2x" />. The common wrong answer <Katex tex="n=1" /> would put them on the line <Katex tex="y=2x" />, which is the wrong way round.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h_1 \text{ is increasing} \implies h_1 \text{ and } h_1^{-1} \text{ meet on } y=x" />,
    reason: <>So <Katex tex="h" /> reaches <Katex tex="h_1^{-1}" /> exactly when <Katex tex="h(x)=x" /> has a solution.</>,
  },
  {
    working: <Katex display tex="\text{Smallest such } k: \ h(x) = x \ \text{ and } \ h'(x) = 1 \ \text{(tangency)}" />,
    reason: <>Below that value of <Katex tex="k" /> the curve sits entirely above <Katex tex="y=x" /> and the graphs never meet; at the threshold they touch.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(k−x)+e^(x−k))/k = x and (−e^(k−x)+e^(x−k))/k = 1, {'{'}x,k{'}'})
      </Cas>
    ),
    reason: 'Two equations, two unknowns.',
  },
  {
    working: <Katex display tex="k = 1.26873\ldots \quad (\text{at } x = 1.8668\ldots)" />,
    reason: <>Note how close this is to <Katex tex="P" /> in part c.i.: that is the same tangency condition seen from a different angle.</>,
  },
  {
    working: <Katex display tex="\boxed{k \approx 1.27}" />,
    reason: 'Two decimal places.',
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="k=5: \quad h(x) = \tfrac15\left(e^{5-x}+e^{x-5}\right), \quad h_1^{-1}(x) = \log_e\!\left(\tfrac{5x}{2}+\sqrt{\tfrac{25x^2}{4}-1}\right)+5" />,
    reason: 'Substituting into the two given rules.',
  },
  {
    working: <Katex display tex="h(x) = h_1^{-1}(x)" />,
    reason: <>The intersections are <em>not</em> on <Katex tex="y=x" /> here — <Katex tex="h" /> is the whole curve, while <Katex tex="h_1" /> is only its right branch, so the usual symmetry argument does not apply.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(5−x)+e^(x−5))/5 = ln(5x/2+√(25x²/4−1))+5, x)
      </Cas>
    ),
    reason: <>Two roots. The report's named trap is using <Katex tex="x=2.468" />, where <Katex tex="h" /> meets <Katex tex="y=x" /> instead.</>,
  },
  {
    working: <Katex display tex="x = 1.45091\ldots \ \text{ and } \ x = 8.78157\ldots" />,
    reason: 'The terminals of the enclosed region.',
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(h₁⁻¹(x) − h(x), x, 1.45091, 8.78157)
      </Cas>
    ),
    reason: <>The inverse lies above <Katex tex="h" /> throughout: at <Katex tex="x=5" />, <Katex tex="h=0.4" /> while <Katex tex="h_1^{-1}\approx8.22" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 43.91 \ \text{square units}}" />,
    reason: 'Two decimal places.',
  },
]

export default function MethodsQ5_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (11 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=e^x+e^{-x}" /> and{' '}
          <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=\tfrac12f(2-x)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            <Katex tex="f(x)=e^x+e^{-x}" /> is an <em>even</em> function — a catenary,
            symmetric about the <Katex tex="y" />-axis with minimum <Katex tex="(0,2)" />.
            That single fact makes part a. slightly generous (a reflection in the{' '}
            <Katex tex="y" />-axis changes nothing), and it makes every later part a question
            about a U-shaped curve with one turning point and two monotone branches.
          </p>
          <p>
            A function and its inverse meet on <Katex tex="y=x" /> — but only when the
            function is increasing. In part f. that fails: <Katex tex="h" /> is the full
            curve while <Katex tex="h_1" /> is only its right branch, so the intersections
            have to be found directly.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Complete a possible sequence of transformations to map <Katex tex="f" /> to{' '}
            <Katex tex="g" />, beginning with a dilation of factor <Katex tex="\tfrac12" />{' '}
            from the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Two functions <Katex tex="g_1" /> and <Katex tex="g_2" /> are created, both with
            the same rule as <Katex tex="g" /> but with distinct domains, such that{' '}
            <Katex tex="g_1" /> is strictly increasing and <Katex tex="g_2" /> is strictly
            decreasing. Give the domain and range for the inverse of <Katex tex="g_1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Shown below is the graph of <Katex tex="g" />, the inverses of <Katex tex="g_1" />{' '}
          and <Katex tex="g_2" />, and the line <Katex tex="y=x" />. The intersection points
          between the graphs of <Katex tex="y=x" />, <Katex tex="y=g(x)" /> and the inverses
          are labelled <Katex tex="P" /> and <Katex tex="Q" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A U-shaped curve g with the reflections of its two branches in the dotted line y = x: the inverse of g1 arcing up to the right and the inverse of g2 falling away below, meeting g at P and Q on the line y = x — from the original 2023 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        marks={1}
        statement={
          <>
            Find the coordinates of <Katex tex="P" /> and <Katex tex="Q" />, correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={2}
        statement={
          <>
            Find the area of the region bound by the graphs of <Katex tex="g" />, the inverse
            of <Katex tex="g_1" /> and the inverse of <Katex tex="g_2" />. Give your answer
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="h(x)=\tfrac1kf(k-x)" />, where <Katex tex="k\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            The turning point of <Katex tex="h" /> always lies on the graph of the function{' '}
            <Katex tex="y=2x^n" />, where <Katex tex="n" /> is an integer. Find the value of{' '}
            <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h_1:[k,\infty)\to\mathbb{R}" />,{' '}
          <Katex tex="h_1(x)=h(x)" />. The rule for the inverse of <Katex tex="h_1" /> is{' '}
          <Katex tex="y=\log_e\!\left(\dfrac{kx}{2}+\sqrt{\dfrac{k^2x^2}{4}-1}\right)+k" />.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            What is the smallest value of <Katex tex="k" /> such that <Katex tex="h" /> will
            intersect with the inverse of <Katex tex="h_1" />? Give your answer correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            It is possible for the graphs of <Katex tex="h" /> and the inverse of{' '}
            <Katex tex="h_1" /> to intersect twice. This occurs when <Katex tex="k=5" />. Find
            the area of the region bound by the graphs of <Katex tex="h" /> and the inverse of{' '}
            <Katex tex="h_1" />, when <Katex tex="k=5" />. Give your answer correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
