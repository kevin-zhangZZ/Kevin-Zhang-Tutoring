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
      This question was done reasonably well. The order of the transformations needed to be
      correct, as well as the wording. A common incorrect answer was 'reflect in the{' '}
      <Katex tex="y" />-axis and then translate 2 units to the left'.
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
      This question was answered well. Some students did not realise that <Katex tex="P" /> and{' '}
      <Katex tex="Q" /> were points on the line <Katex tex="y=x" /> and had different values
      for <Katex tex="x" /> and <Katex tex="y" />. Others substituted their <Katex tex="x" />{' '}
      values back into the equation to find <Katex tex="y" /> and made rounding errors.{' '}
      <Katex tex="Q(4.09,4.10)" /> was sometimes seen.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [65, 6, 29],
  average: 0.6,
  comment: (
    <>
      Some students set up the correct definite integral but did not provide an answer. Others
      did not multiply the definite integral by 2, giving 2.78 as the answer. Some used{' '}
      <Katex tex="\int_{1.27\ldots}^{4.09\ldots}\left(g_1^{-1}-g(x)\right)dx" />, which is
      incorrect. Other students had the correct answer but set up the definite integral
      incorrectly.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [87, 13],
  average: 0.1,
  comment: (
    <>
      This question was not done well. A common incorrect answer was <Katex tex="n=1" />.
    </>
  ),
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
      There were some good attempts at this question. Those students who set up the correct
      definite integral generally gave the correct answer. Some students had incorrect
      terminals of integration. A common incorrect terminal was <Katex tex="x=2.468" />, which
      is the <Katex tex="x" /> value of the point of intersection of the graphs of{' '}
      <Katex tex="h" /> and <Katex tex="y=x" />, not <Katex tex="h_1^{-1}" /> and{' '}
      <Katex tex="h" />.
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
    reason: <>The step the question has already given you.</>,
  },
  {
    working: <Katex display tex="\text{Reflection in the } y\text{-axis} \implies y = \tfrac12f(-x)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="-x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Translation of 2 units in the positive } x \text{ direction} \implies y = \tfrac12f\bigl(-(x-2)\bigr)}" />,
    reason: <>The order matters: reflecting <em>then</em> translating right gives <Katex tex="f(2-x)" />, while translating right then reflecting gives <Katex tex="f(-x-2)" />. Translating 2 <em>left</em> first and then reflecting also works, and since <Katex tex="f" /> is even the report also accepts a translation of 2 units right on its own.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \tfrac12\left(e^{2-x}+e^{x-2}\right)" />,
    reason: <>Writing <Katex tex="f" /> out. This is a catenary: symmetric about <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = \tfrac12\left(-e^{2-x}+e^{x-2}\right) = 0 \implies x = 2" />,
    reason: <>The single turning point, where the two exponentials are equal.</>,
  },
  {
    working: <Katex display tex="g(2) = \tfrac12(1+1) = 1 \implies \text{minimum } (2,\,1)" />,
    reason: <>So the curve decreases to the left of 2 and increases to the right.</>,
  },
  {
    working: <Katex display tex="g_1: [2,\infty)\to R \implies \text{range } [1,\infty)" />,
    reason: <>The strictly increasing branch.</>,
  },
  {
    working: <Katex display tex="\boxed{g_1^{-1}: \ \text{domain } [1,\infty), \ \text{range } [2,\infty)}" />,
    reason: <>Inverting swaps them. The question asks about <Katex tex="g_1^{-1}" />, not <Katex tex="g_1" /> — the report notes the domain and range were often reversed. Either bracket type was accepted, since the maximal domains were not asked for.</>,
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
    reason: <>One on each branch of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{P(1.27,\ 1.27), \quad Q(4.09,\ 4.09)}" />,
    reason: <>Both coordinates are equal because the points are on <Katex tex="y=x" /> — the report notes students who substituted back to find <Katex tex="y" /> made rounding errors, and <Katex tex="Q(4.09,4.10)" /> was sometimes seen.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The region is symmetric about } y=x" />,
    reason: <>The two inverse branches are reflections of <Katex tex="g" />, so the region splits into two congruent halves either side of the line.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{1.27474}^{4.08519}\bigl(x-g(x)\bigr)dx" />,
    reason: <>The half between <Katex tex="y=x" /> and <Katex tex="g" />, doubled. The report notes some students did not multiply by 2, giving <Katex tex="2.78" />.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        2·nInt(x − (e^(2−x)+e^(x−2))/2, x, 1.27474, 4.08519)
      </Cas>
    ),
    reason: <>Using the unrounded terminals from part c.i. Integrating <Katex tex="g_1^{-1}-g" /> instead is incorrect, the report notes — that is not the region shown.</>,
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
    reason: <>By the same argument as part b.</>,
  },
  {
    working: <Katex display tex="h(k) = \tfrac1k(1+1) = \frac2k \implies \text{turning point } \left(k,\ \tfrac2k\right)" />,
    reason: <>As <Katex tex="k" /> varies, this point traces a curve.</>,
  },
  {
    working: <Katex display tex="y = 2x^n \text{ through } \left(k,\tfrac2k\right): \quad \frac2k = 2k^n \implies k^n = k^{-1}" />,
    reason: <>Substituting the turning point into the given family.</>,
  },
  {
    working: <Katex display tex="\boxed{n = -1}" />,
    reason: <>The turning points lie on the hyperbola <Katex tex="y=\tfrac2x" />. The report notes <Katex tex="n=1" /> was a common incorrect answer — that would put them on the line <Katex tex="y=2x" />.</>,
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
    reason: <>Two equations, two unknowns.</>,
  },
  {
    working: <Katex display tex="k = 1.26873\ldots \quad (\text{at } x = 1.8668\ldots)" />,
    reason: <>The value of <Katex tex="k" /> at which <Katex tex="h" /> just touches <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k \approx 1.27}" />,
    reason: <>Two decimal places.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="k=5: \quad h(x) = \tfrac15\left(e^{5-x}+e^{x-5}\right), \quad h_1^{-1}(x) = \log_e\!\left(\tfrac52x+\tfrac12\sqrt{25x^2-4}\right)+5" />,
    reason: <>Substituting into the two given rules.</>,
  },
  {
    working: <Katex display tex="h(x) = h_1^{-1}(x)" />,
    reason: <>The intersections are <em>not</em> on <Katex tex="y=x" /> here — <Katex tex="h" /> is the whole curve, while <Katex tex="h_1" /> is only its right branch, so the usual symmetry argument does not apply.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(5−x)+e^(x−5))/5 = ln(5x/2+√(25x²−4)/2)+5, x)
      </Cas>
    ),
    reason: <>Two roots. The report notes a common incorrect terminal was where <Katex tex="h" /> meets <Katex tex="y=x" /> (it prints <Katex tex="x=2.468" />; solving <Katex tex="h(x)=x" /> gives <Katex tex="x=2.486\ldots" />).</>,
  },
  {
    working: <Katex display tex="x = 1.45091\ldots \ \text{ and } \ x = 8.78157\ldots" />,
    reason: <>The terminals of the enclosed region.</>,
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
    reason: <>Two decimal places.</>,
  },
]

export default function MethodsQ5_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=e^x+e^{-x}" /> and{' '}
          <Katex tex="g:R\to R" />,{' '}
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
        topic="Transformations"
        marks={2}
        statement={
          <>
            <div className="flex flex-col gap-2">
              <p>
                Complete a possible sequence of transformations to map <Katex tex="f" /> to{' '}
                <Katex tex="g" />.
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-1">
                <li>
                  Dilation of factor <Katex tex="\tfrac12" /> from the <Katex tex="x" /> axis.
                </li>
                <li>______________________</li>
                <li>______________________</li>
              </ul>
            </div>
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Two functions <Katex tex="g_1" /> and <Katex tex="g_2" /> are created, both with the
          same rule as <Katex tex="g" /> but with distinct domains, such that{' '}
          <Katex tex="g_1" /> is strictly increasing and <Katex tex="g_2" /> is strictly
          decreasing.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Inverse Function"
        marks={2}
        statement={
          <>Give the domain and range for the inverse of <Katex tex="g_1" />.</>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Shown below is the graph of <Katex tex="g" />, the inverses of <Katex tex="g_1" />{' '}
          and <Katex tex="g_2" />, and the line <Katex tex="y=x" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A U-shaped curve g with the reflections of its two branches in the dotted line y = x: the inverse of g1 arcing up to the right and the inverse of g2 falling away below, meeting g at P and Q on the line y = x — from the original 2023 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
        <p>
          The intersection points between the graphs of <Katex tex="y=x" />,{' '}
          <Katex tex="y=g(x)" /> and the inverses of <Katex tex="g_1" /> and <Katex tex="g_2" />,
          are labelled <Katex tex="P" /> and <Katex tex="Q" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Intersections"
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
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the region bound by the graphs of <Katex tex="g" />, the inverse
            of <Katex tex="g_1" /> and the inverse of <Katex tex="g_2" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h:R\to R" />,{' '}
          <Katex tex="h(x)=\tfrac1kf(k-x)" />, where <Katex tex="k\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Turning Point"
        marks={1}
        statement={
          <>
            The turning point of <Katex tex="h" /> always lies on the graph of the function{' '}
            <Katex tex="y=2x^n" />, where <Katex tex="n" /> is an integer.
            <br />
            Find the value of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h_1:[k,\infty)\to R" />,{' '}
          <Katex tex="h_1(x)=h(x)" />.
          <br />
          The rule for the <b>inverse</b> of <Katex tex="h_1" /> is{' '}
          <Katex tex="y=\log_e\!\left(\dfrac k2x+\dfrac12\sqrt{k^2x^2-4}\right)+k" />
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Intersections"
        marks={1}
        statement={
          <>
            What is the smallest value of <Katex tex="k" /> such that <Katex tex="h" /> will
            intersect with the inverse of <Katex tex="h_1" />?
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          It is possible for the graphs of <Katex tex="h" /> and the inverse of{' '}
          <Katex tex="h_1" /> to intersect twice. This occurs when <Katex tex="k=5" />.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the region bound by the graphs of <Katex tex="h" /> and the inverse
            of <Katex tex="h_1" />, when <Katex tex="k=5" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
