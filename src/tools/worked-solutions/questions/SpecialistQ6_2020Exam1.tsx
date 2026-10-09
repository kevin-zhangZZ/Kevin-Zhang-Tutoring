// 2020 Specialist Mathematics — Exam 1 Question 6 (5 marks). Differentiating an arctan,
// justifying a point of inflection, and sketching the curve with both horizontal
// asymptotes. Question text transcribed from the original paper; the blank axes in part c.'s
// statement are cropped from the original VCAA exam PDF (300 dpi); the part c. sketch is my own
// matplotlib drawing of the answer on VCAA's grid. Answers checked with sympy and against the
// VCAA examination report and itute (which agree). Solution is original. Part b.'s alternative
// argument (the gradient 3/(9(x − 2)² + 1) peaks at x = 2) follows a commenter on Marty Ross's
// "Bad Mathematics" blog, who pointed out that the question's "Hence" suits it better than the
// report's second-derivative sign test; the working follows the report.
// Interactive diagrams (§15): part b. slides a tangent along f above the gradient function f′,
// whose hump peaks at f′(2) = 3, with a live sign table for f″
// (interactives/spec-2020e1-q6b-gradient-peak.tsx); part c. builds the graph from y = arctan(x)
// in three transformations, carrying the asymptotes and centre along, then shows the report's
// too-short sketch (interactives/spec-2020e1-q6c-build.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2020e1-q6c-sketch.png'
import blankAxesSrc from './spec-2020e1-q6c-blank-axes.png'

const GradientPeakWidget = lazyWidget(() => import('../interactives/spec-2020e1-q6b-gradient-peak'))
const BuildWidget = lazyWidget(() => import('../interactives/spec-2020e1-q6c-build'))

const EXAM_A: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: (
    <>
      This question was answered very well. Students needed to demonstrate the use of the
      chain rule to find the (given) answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 66, 9],
  average: 0.8,
  comment: (
    <>
      Most students showed, by using the chain or quotient rules, that{' '}
      <Katex tex="f''(x)=0" /> when <Katex tex="x=2" />. Few students attempted to justify
      that a point of inflection occurred at this point.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 22, 51],
  average: 1.3,
  comment: (
    <>
      Most students sketched a smooth curve with the appropriate shape. The asymptotes{' '}
      <Katex tex="y=\tfrac\pi2" /> and <Katex tex="y=\tfrac{3\pi}{2}" /> as well as the point
      of inflection <Katex tex="(2,\pi)" /> needed to be labelled. The{' '}
      <Katex tex="y" />-intercept was not required.
      <br />
      Students are reminded that when a grid is provided for them to draw their graphs,
      sufficient area should be utilised so that all features of the graph can be shown. Some
      students drew their graphs on such a limited domain that the asymptotic behaviour was not
      shown.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\arctan(u) = \frac{1}{1+u^2}\cdot\frac{du}{dx}" />,
    reason: <>The formula sheet gives <Katex tex="\tfrac{d}{dx}\left(\tan^{-1}(x)\right)=\tfrac{1}{1+x^2}" />, which is for arctan of plain <Katex tex="x" />. Here the input is <Katex tex="3x-6" />, so <Katex tex="f" /> is a composite: arctan of the inner function <Katex tex="u=3x-6" />. The chain rule multiplies by the inner derivative, <Katex tex="\tfrac{du}{dx}=3" />, and that 3 is where the numerator of the given answer comes from.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(x) = \frac{1}{1+(3x-6)^2}\times3" />
        <Katex display tex="= \frac{3}{1+(3x-6)^2}" />
      </>
    ),
    reason: <>The <Katex tex="+\pi" /> is a constant, so it differentiates to 0. Why a factor of 3, in picture terms: <Katex tex="3x-6=3(x-2)" />, and replacing <Katex tex="x" /> by <Katex tex="3x" /> squeezes the graph sideways by a factor of 3, which makes it 3 times as steep everywhere. Shifting it right doesn&apos;t change any gradients.</>,
    more: <>The diagram in part c. shows the squeeze.</>,
  },
  {
    working: <Katex display tex="(3x-6)^2 = 9x^2-36x+36" />,
    reason: <>The given answer has an expanded denominator, so expand the square to connect the two forms.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{3}{9x^2-36x+37}}" />,
    reason: <>Adding the 1 lifts 36 to 37. In a &ldquo;show that&rdquo; the answer is printed in the question, so the marks are for the lines that reach it: the report says students needed to demonstrate the use of the chain rule, and its general comments name this part as the example of presenting sufficient working for a given result. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3\left(9x^2-36x+37\right)^{-1}" />,
    reason: <>&ldquo;Hence&rdquo; means start from part a.&apos;s <Katex tex="f'(x)" /> and differentiate again. Writing it as a power lets you use the chain rule rather than the quotient rule: less to go wrong.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f''(x) = -3\left(9x^2-36x+37\right)^{-2}" />
        <Katex display tex="\times(18x-36)" />
      </>
    ),
    reason: <>Chain rule: bring the power <Katex tex="-1" /> down, lower it to <Katex tex="-2" />, then multiply by the derivative of the inside, <Katex tex="18x-36" />.</>,
  },
  {
    working: <Katex display tex="f''(x) = \frac{-54(x-2)}{\left(9x^2-36x+37\right)^2}" />,
    reason: <>Take 18 out of <Katex tex="18x-36" /> and multiply it by <Katex tex="-3" />. Factorising is the point: it shows at a glance where <Katex tex="f''" /> is zero and what sign it has either side.</>,
  },
  {
    working: <Katex display tex="f''(2) = 0" />,
    reason: <>The numerator is zero at <Katex tex="x=2" />. Necessary, but not enough on its own: it says the concavity <em>might</em> change here, not that it does.</>,
  },
  {
    working: (
      <>
        <Katex display tex="9x^2-36x+37 = 9(x-2)^2+1" />
        <Katex display tex="9(x-2)^2+1 \ge 1 > 0 \ \text{ for all } x" />
      </>
    ),
    reason: <>Completing the square: <Katex tex="9x^2-36x+36=9(x-2)^2" />, plus 1. So the denominator is never zero and, being a square, always positive: it can&apos;t affect the sign. The sign of <Katex tex="f''" /> is the sign of <Katex tex="-54(x-2)" />.</>,
  },
  {
    working: <Katex display tex="x<2: f''(x)>0; \quad x>2: f''(x)<0" />,
    reason: <>For <Katex tex="x<2" />, <Katex tex="x-2" /> is negative, so <Katex tex="-54(x-2)" /> is positive; for <Katex tex="x>2" /> it is negative. Test values agree: <Katex tex="f''(1)=\tfrac{54}{100}=\tfrac{27}{50}>0" /> and <Katex tex="f''(3)=-\tfrac{27}{50}<0" /> (the denominator is <Katex tex="10^2" /> at both). <Katex tex="f''>0" /> means the gradient is increasing (concave up); <Katex tex="f''<0" /> means it is decreasing (concave down).</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{concavity changes at } x=2," />
        <Katex display tex="\boxed{\text{so there is a point of inflection at } x=2}" />
      </>
    ),
    reason: <>This sign change is the justification. The report notes most students showed <Katex tex="f''(x)=0" /> when <Katex tex="x=2" />, but few attempted to justify that a point of inflection occurred there. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \arctan\big(3(x-2)\big)+\pi" />,
    reason: <>Factorise the inside first. Then the graph is <Katex tex="y=\arctan(x)" /> moved three times: a dilation by factor <Katex tex="\tfrac13" /> from the <Katex tex="y" />-axis, a translation 2 units right, and a translation <Katex tex="\pi" /> units up. The shape of <Katex tex="y=\arctan(x)" />, an S between the asymptotes <Katex tex="y=\pm\tfrac\pi2" />, tells you almost everything.</>,
    more: <>The diagram below builds it step by step.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\to\infty: \ \arctan(3x-6)\to\tfrac\pi2" />
        <Katex display tex="\implies y\to\tfrac\pi2+\pi=\tfrac{3\pi}{2}" />
      </>
    ),
    reason: <>Arctan&apos;s outputs never reach <Katex tex="\pm\tfrac\pi2" />; they only approach them as the input grows without bound. As <Katex tex="x\to\infty" />, the input <Katex tex="3x-6\to\infty" /> too, and the <Katex tex="+\pi" /> lifts the limit to <Katex tex="\tfrac{3\pi}{2}" />. The sideways moves can&apos;t change these heights; only the <Katex tex="+\pi" /> does.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\to-\infty: \ \arctan(3x-6)\to-\tfrac\pi2" />
        <Katex display tex="\implies y\to-\tfrac\pi2+\pi=\tfrac\pi2" />
      </>
    ),
    reason: <>The same on the left. So both asymptotes sit above the <Katex tex="x" />-axis, and the whole curve lies strictly between <Katex tex="y=\tfrac\pi2" /> and <Katex tex="y=\tfrac{3\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3}{9(x-2)^2+1} > 0 \ \text{ for all } x" />,
    reason: <>Part a.&apos;s derivative with the square completed as in part b. The gradient is positive everywhere, so the curve rises all the way from one asymptote to the other, steepest at <Katex tex="x=2" /> where <Katex tex="f'(2)=3" />.</>,
  },
  {
    working: <Katex display tex="f(2) = \arctan(0)+\pi = \pi" />,
    reason: <>The point of inflection from part b., which the question asks to be labelled with its coordinates. It is also the centre of the S: because arctan is an odd function, a half-turn about <Katex tex="(2,\pi)" /> maps the curve onto itself, so the rise into <Katex tex="y=\tfrac{3\pi}2" /> on the right mirrors the approach from <Katex tex="y=\tfrac\pi2" /> on the left.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer sketched on VCAA's grid (x from −6 to 6, gridlines every 2; y in steps of π/2): an S-shaped increasing curve rising from the asymptote y = π/2 to the asymptote y = 3π/2, with the point of inflection (2, π) labelled"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>The question asks for three labels: <Katex tex="y=\tfrac\pi2" />, <Katex tex="y=\tfrac{3\pi}{2}" /> and <Katex tex="(2,\pi)" /> (the <Katex tex="y" />-intercept is not required). Use the width of the grid — a curve drawn over only <Katex tex="0\le x\le4" /> never shows the asymptotic behaviour. A check on the shape: the curve crosses the <Katex tex="y" />-axis at <Katex tex="\pi-\arctan 6\approx1.74" />, only just above <Katex tex="\tfrac\pi2\approx1.57" />, and most of its rise happens between <Katex tex="x=1" /> and <Katex tex="x=3" />.</>,
  },
]

export default function SpecialistQ6_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (5 marks)</p>
        <p>
          Let <Katex tex="f(x)=\arctan(3x-6)+\pi" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Arctan Derivative"
        marks={1}
        statement={<>Show that <Katex tex="f'(x)=\dfrac{3}{9x^2-36x+37}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Hence, show that the graph of <Katex tex="f" /> has a point of inflection at{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="What You Have to Show">
          <p>
            A point of inflection is where the graph changes concavity: from concave up (bending
            upwards like ∪, the gradient increasing, <Katex tex="f''>0" />) to concave down (bending
            downwards like ∩, the gradient decreasing, <Katex tex="f''<0" />), or the other way round.
          </p>
          <p>
            So there are two things to show at <Katex tex="x=2" />: that <Katex tex="f''(2)=0" />,
            and that <Katex tex="f''" /> has opposite signs either side of <Katex tex="x=2" />. The
            first on its own is not enough (see the common mistake below).
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="An inflection point is where the gradient stops rising and starts falling">
          <GradientPeakWidget />
        </Explore>
        {/* In a div so that "Hide answers" mode holds it back with the working: a bare Background
            is always shown, and this one is an answer. */}
        <DetailOnly>
          <div>
          <Background title="Another Way, Straight From Part a">
            <p>
              Complete the square in part a.&apos;s answer:
            </p>
            <Katex display tex="f'(x)=\frac{3}{9(x-2)^2+1}" />
            <p>
              The denominator is 1 at <Katex tex="x=2" /> and bigger everywhere else, so the gradient
              is largest at <Katex tex="x=2" />, where <Katex tex="f'(2)=3" />. As <Katex tex="x" />{' '}
              increases towards 2, <Katex tex="(x-2)^2" /> shrinks, so the gradient rises (concave up);
              past 2 it grows, so the gradient falls (concave down). A gradient that rises to a maximum
              and then falls is a change of concavity, which is the point of inflection. This reads
              the answer straight off part a., which is what &ldquo;Hence&rdquo; suggests; the
              report&apos;s answer uses the sign of <Katex tex="f''" /> instead. Either way, the
              change of concavity has to be stated explicitly.
            </p>
          </Background>
          </div>
        </DetailOnly>
        <WrongMethod
          title="f″(2) = 0, so there is a point of inflection at x = 2"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="f''(x)=\frac{-54(x-2)}{\left(9x^2-36x+37\right)^2}" />
              <Katex display tex="f''(2)=0 \ \therefore \text{ inflection at } x=2" />
            </>
          }
        >
          <p>
            The report notes most students got this far and few attempted to justify that a point
            of inflection occurred. <Katex tex="f''(2)=0" /> only says the curve is momentarily
            straight; it doesn&apos;t say the bending switches direction. For example,{' '}
            <Katex tex="y=(x-2)^4+\pi" /> has <Katex tex="y''=12(x-2)^2" />, which is also 0 at{' '}
            <Katex tex="x=2" />, but it is positive on both sides: that curve is concave up
            throughout, and <Katex tex="(2,\pi)" /> is its minimum, not an inflection.
          </p>
          <p>
            Finish the job by showing the sign of <Katex tex="f''" /> changes: here{' '}
            <Katex tex="-54(x-2)" /> flips from + to − at <Katex tex="x=2" /> while the squared
            denominator stays positive.
          </p>
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes provided below. Label any
            asymptotes with their equations and the point of inflection with its coordinates.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img
                src={blankAxesSrc}
                alt="Blank dashed grid with x from −6 to 6 in steps of 2 and y from −3π/2 to 3π/2 in steps of π/2 — from the original 2020 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Build the graph from y = arctan(x) in three moves, and watch where the asymptotes go">
          <BuildWidget />
        </Explore>
        <WrongMethod title="Sketch just the middle of the curve, say 0 ≤ x ≤ 4" source="Examiner's report">
          <p>
            On that piece the curve rises from about 1.74 to about 4.55 and stops short of both{' '}
            <Katex tex="y=\tfrac\pi2" /> and <Katex tex="y=\tfrac{3\pi}{2}" />, so a marker
            can&apos;t see it approach them. The report says some students drew their graphs on
            such a limited domain that the asymptotic behaviour was not shown. Use the whole grid,
            from <Katex tex="x=-6" /> to <Katex tex="x=6" />: by the edges the curve is within about
            0.1 of each asymptote (step 5 of the diagram above shows both versions).
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
