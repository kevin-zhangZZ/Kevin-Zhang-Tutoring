// 2020 Mathematical Methods — Exam 1, Question 7 (8 marks). Tangents from an external point
// to a parabola, then a translation that minimises a distance. Question text transcribed
// from the original paper; the figure is a crop of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report and itute (which agree: a = 4 or −2,
// y = 11x − 11 or y = 1 − x, k = 5/2). Solution is original.
// Interactive diagrams (§15): b.iii drags Q along the parabola until the line PQ and the tangent
// at Q merge, with a live gap showing how far the tangent misses P
// (interactives/meth-2020e1-q7biii-slide.tsx); b.iv shows the tangent through P with gradient
// f′(a) touching once, and the common "gradient = a" line missing or cutting the parabola
// (interactives/meth-2020e1-q7biv-gradient.tsx); c. slides y = f(x − k) with a live
// shortest-distance segment and the "floor" y = 11/4 (interactives/meth-2020e1-q7c-shift.tsx).
// Note on sources for c.: one tutor's video (Dr U) says the closest point of the unshifted graph
// to P is its turning point; it isn't (at k = 0 the closest point is near x ≈ −1.13, distance
// ≈ 3.59, checked with scipy). The solution argues from the floor y = 11/4 instead, which is
// what makes "turning point directly above P" correct.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2020e1-q7-parabola.png'

const SlideWidget = lazyWidget(() => import('../interactives/meth-2020e1-q7biii-slide'))
const GradientWidget = lazyWidget(() => import('../interactives/meth-2020e1-q7biv-gradient'))
const ShiftWidget = lazyWidget(() => import('../interactives/meth-2020e1-q7c-shift'))

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      There were several ways to complete this question. Most students chose to show that the
      point <Katex tex="(1,0)" /> was not on the graph through the use of substitution as
      indicated above. This was a 'show that' question, so those students who simply stated{' '}
      <Katex tex="f(1)=9" /> without explaining the relevance of this were not awarded the mark.
      Some students found the discriminant of the quadratic to be negative or simply stated it
      was negative without evidence but did not relate this to the question.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Many students wrote down an expression for gradient but went no further. Some students
      made algebraic errors, in particular cancellations of <Katex tex="a" /> or dealing with
      negative coefficients.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Most students recognised that an evaluation of the derivative was required. Some students
      incorrectly assumed the question required the equation of the tangent at{' '}
      <Katex tex="x=a" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [56, 14, 31],
  average: 0.8,
  comment: (
    <>
      Students who equated gradients tended to score more highly. Many of those who used the
      "equation of the tangent" method could not form the correct quadratic equation.
    </>
  ),
}

const EXAM_BIV: SAExaminerStats = {
  marks: [71, 29],
  average: 0.3,
  comment: (
    <>
      The most common error was students assuming that their value of 'a' was the gradient of
      the line instead of substituting into <Katex tex="f'(a)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [87, 3, 10],
  average: 0.2,
  comment: (
    <>
      Many students used the distance formula and then attempted to differentiate and equate to
      zero (often with limited success due to error in differentiation or algebra). Students who
      used a geometric approach tended to score more highly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(1) = 1^2+3(1)+5 = 9" />,
    reason: <>If <Katex tex="P(1,0)" /> were on the graph, the curve's height at <Katex tex="x=1" /> would be <Katex tex="0" />, the <Katex tex="y" />-coordinate of <Katex tex="P" />. So substitute <Katex tex="P" />'s <Katex tex="x" />-coordinate and compare.</>,
  },
  {
    working: <Katex display tex="f(1) = 9 \ne 0" />,
    reason: <>At <Katex tex="x=1" /> the curve is <Katex tex="9" /> units up, but <Katex tex="P" /> is on the <Katex tex="x" />-axis. This comparison is the argument: the report notes that students who simply stated <Katex tex="f(1)=9" /> without explaining the relevance of this were not awarded the mark.</>,
  },
  {
    working: <Katex display tex="\boxed{P(1,0) \text{ is not on the graph of } y=f(x)}" />,
    reason: <>Another valid route: the discriminant is <Katex tex="3^2-4(1)(5)=-11<0" />, so the parabola never meets the <Katex tex="x" />-axis, and <Katex tex="P" /> is on the <Katex tex="x" />-axis. That route also needs its last sentence: the report notes some students found the discriminant to be negative but did not relate this to the question. As required.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="P(1,0), \qquad Q\bigl(a,f(a)\bigr) = \left(a,\,a^2+3a+5\right)" />,
    reason: <>The two points the line joins. Writing <Katex tex="f(a)" /> out as <Katex tex="a^2+3a+5" /> is what makes the answer &ldquo;in terms of <Katex tex="a" />&rdquo;; the report notes many students wrote down an expression for gradient but went no further.</>,
  },
  {
    working: <Katex display tex="m_{PQ} = \frac{f(a)-0}{a-1}" />,
    reason: <>Rise over run, <Katex tex="\tfrac{y_2-y_1}{x_2-x_1}" />. Whichever point you subtract on top, subtract the same point underneath: <Katex tex="\tfrac{0-f(a)}{1-a}" /> is the same fraction, but mixing the orders flips the sign.</>,
  },
  {
    working: <Katex display tex="\boxed{m_{PQ} = \frac{a^2+3a+5}{a-1}}" />,
    reason: <>Stop here: nothing cancels. You can only cancel a factor of the <em>whole</em> numerator and the <em>whole</em> denominator, and <Katex tex="a-1" /> is not a factor of <Katex tex="a^2+3a+5" />: substituting <Katex tex="a=1" /> gives <Katex tex="9" />, not <Katex tex="0" /> (that is part a. again). The report notes some students cancelled <Katex tex="a" />, or made errors with negative coefficients.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2+3x+5 \implies f'(x) = 2x+3" />,
    reason: <>The slope of the tangent at a point is the gradient of the curve there, which is exactly what the derivative gives. Differentiate term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(a) = 2a+3}" />,
    reason: <>Substitute <Katex tex="x=a" />, since <Katex tex="Q" /> is at <Katex tex="x=a" />. The question asks only for the slope; the report notes some students incorrectly assumed it required the equation of the tangent at <Katex tex="x=a" />. This is a different line from b.i.: the tangent only touches the curve at <Katex tex="Q" />, while <Katex tex="PQ" /> runs from <Katex tex="Q" /> down to <Katex tex="P" />. Usually the two gradients differ; part b.iii. asks when they don't.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{a^2+3a+5}{a-1} = 2a+3" />,
    reason: <>How would you know to do this? Parts b.i. and b.ii. set it up. If the tangent at <Katex tex="Q" /> passes through <Katex tex="P" />, it goes through both <Katex tex="P" /> and <Katex tex="Q" />, and only one line does that: the line <Katex tex="PQ" />. So the tangent <em>is</em> the line <Katex tex="PQ" />, and the gradients from b.i. and b.ii. must be equal (slide <Katex tex="Q" /> in the diagram below to watch the two lines merge). The report notes students who equated gradients tended to score more highly; the alternative, writing the tangent at <Katex tex="x=a" /> and substituting <Katex tex="(1,0)" />, gives <Katex tex="0=(2a+3)(1-a)+a^2+3a+5" />, the same quadratic, but many who used it could not form the correct quadratic equation.</>,
  },
  {
    working: <Katex display tex="a^2+3a+5 = (2a+3)(a-1)" />,
    reason: <>Multiplying both sides by <Katex tex="a-1" />. That is safe because <Katex tex="a\ne1" />: at <Katex tex="a=1" />, <Katex tex="Q" /> would be <Katex tex="(1,9)" />, directly above <Katex tex="P" />, and the vertical line <Katex tex="PQ" /> is no tangent.</>,
  },
  {
    working: <Katex display tex="a^2+3a+5 = 2a^2+a-3" />,
    reason: <>Expanding: <Katex tex="(2a+3)(a-1)=2a^2-2a+3a-3" />.</>,
  },
  {
    working: <Katex display tex="a^2-2a-8 = 0 \implies (a-4)(a+2) = 0" />,
    reason: <>Collecting everything on the right, so that <Katex tex="a^2" /> stays positive, then factorising: two numbers with product <Katex tex="-8" /> and sum <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 4 \quad\text{or}\quad a = -2}" />,
    reason: <>Keep both: nothing restricts <Katex tex="a" />, and the question asks for the <em>values</em>. From a point below a parabola that opens upwards you can draw two tangents, one touching each side. Check in b.i.: <Katex tex="a=4" /> gives <Katex tex="\tfrac{33}{3}=11=2(4)+3" /> ✓, and <Katex tex="a=-2" /> gives <Katex tex="\tfrac{3}{-3}=-1=2(-2)+3" /> ✓.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="a = -2: \quad f'(-2) = 2(-2)+3 = -1" />,
    reason: <>Take either value of <Katex tex="a" /> from b.iii. A line needs a gradient and a point. The gradient is <Katex tex="f'(a)" /> from b.ii., not <Katex tex="a" />: <Katex tex="a" /> is the <Katex tex="x" />-coordinate of the point where the tangent touches, not a slope. The report's most common error was assuming the value of <Katex tex="a" /> was the gradient.</>,
  },
  {
    working: <Katex display tex="y-0 = -1(x-1)" />,
    reason: <>Point–gradient form. The line passes through both <Katex tex="P(1,0)" /> and <Katex tex="Q(-2,3)" />, so either point works; <Katex tex="P" /> is quicker because its <Katex tex="y" />-coordinate is <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 1-x}" />,
    reason: <>Check: it passes through <Katex tex="P" /> (<Katex tex="1-1=0" /> ✓), and it touches the parabola only once: <Katex tex="1-x=x^2+3x+5" /> gives <Katex tex="x^2+4x+4=(x+2)^2=0" />, a double root at <Katex tex="x=-2" />, which is <Katex tex="Q" />. The other tangent, from <Katex tex="a=4" />, has gradient <Katex tex="f'(4)=11" />, giving <Katex tex="y=11x-11" />; either line answers the question.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2x+3 = 0 \implies x = -\tfrac32" />,
    reason: <>Start with the picture: where is the lowest point of the graph? The turning point is where <Katex tex="f'(x)=0" /> (the derivative from b.ii.), and it is a minimum because the parabola opens upwards.</>,
  },
  {
    working: <Katex display tex="f\!\left(-\tfrac32\right) = \tfrac94-\tfrac92+5 = \tfrac{11}4" />,
    reason: <>Its height. (Completing the square, <Katex tex="f(x)=\left(x+\tfrac32\right)^2+\tfrac{11}4" />, gives the turning point <Katex tex="\left(-\tfrac32,\tfrac{11}4\right)" /> in one step.) So every point of the graph is at least <Katex tex="\tfrac{11}4" /> above the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="y=f(x-k)\text{: turning point } \left(-\tfrac32+k,\ \tfrac{11}4\right)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="x-k" /> translates the graph <Katex tex="k" /> units in the positive <Katex tex="x" /> direction (to the right when <Katex tex="k>0" />): the new graph reaches each height <Katex tex="k" /> units further right than <Katex tex="f" /> did. Only the left–right position changes; the shape and the lowest height <Katex tex="\tfrac{11}4" /> stay the same.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{least distance when the turning} \\ \text{point is directly above } P \end{gathered}" />,
    reason: <>Why? <Katex tex="P" /> is on the <Katex tex="x" />-axis, and every point of the translated graph has <Katex tex="y\ge\tfrac{11}4" />, so every point is at least <Katex tex="\tfrac{11}4" /> from <Katex tex="P" />: its height alone is that much. A distance of exactly <Katex tex="\tfrac{11}4" /> needs a point that is at height <Katex tex="\tfrac{11}4" /> (only the turning point) <em>and</em> straight above <Katex tex="P" />. So slide the graph until its turning point is over <Katex tex="P" /> (try it in the diagram below). The report notes students who used a geometric approach tended to score more highly.</>,
  },
  {
    working: <Katex display tex="-\tfrac32+k = 1" />,
    reason: <>The turning point's <Katex tex="x" />-coordinate must equal <Katex tex="P" />'s.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac52}" />,
    reason: <>Sign check: the turning point starts to the left of <Katex tex="P" />, so the graph has to move right, and <Katex tex="k>0" /> ✓. The shortest distance is then <Katex tex="\tfrac{11}4" />, straight up from <Katex tex="P" /> (not asked for). Only 10% of students scored both marks.</>,
  },
]

export default function MethodsQ7_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (8 marks)</p>
        <p>
          Consider the function <Katex tex="f(x)=x^2+3x+5" /> and the point{' '}
          <Katex tex="P(1,0)" />. Part of the graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An upward parabola labelled f, with its minimum just left of the y-axis and well above the x-axis — from the original 2020 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Point Off Curve"
        marks={1}
        statement={<>Show that point <Katex tex="P" /> is not on the graph of <Katex tex="y=f(x)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Consider a point <Katex tex="Q\bigl(a,f(a)\bigr)" /> to be a point on the graph of{' '}
          <Katex tex="f" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Gradient"
        marks={1}
        statement={
          <>
            Find the slope of the line connecting points <Katex tex="P" /> and{' '}
            <Katex tex="Q" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the slope of the tangent to the graph of <Katex tex="f" /> at point{' '}
            <Katex tex="Q" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Tangent Through Point"
        marks={2}
        statement={
          <>
            Let the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=a" /> pass
            through point <Katex tex="P" />.
            <br />
            Find the values of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
        <Explore title="Slide Q until the line PQ becomes the tangent: the moment the two gradients agree">
          <SlideWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Give the equation of one of the lines passing through point <Katex tex="P" /> that
            is tangent to the graph of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_BIV}
      >
        <WorkingTable rows={ROWS_BIV} />
        <Explore title="The gradient is f′(a), not a: a tangent meets the parabola exactly once">
          <GradientWidget />
        </Explore>
        <WrongMethod
          title="Use the value of a as the gradient"
          source="Examiner's report"
          working={<Katex display tex="a=4: \quad y-0 = 4(x-1) \implies y = 4x-4" />}
        >
          <p>
            <Katex tex="a=4" /> says <em>where</em> the tangent touches (at <Katex tex="x=4" />), not how steep it
            is. The steepness there is <Katex tex="f'(4)=2(4)+3=11" />. A quick check catches the slip: a tangent to a
            parabola meets it exactly once, but <Katex tex="4x-4=x^2+3x+5" /> gives <Katex tex="x^2-x+9=0" />, whose
            discriminant <Katex tex="1-36=-35" /> is negative, so this line never meets the parabola at all. (With{' '}
            <Katex tex="a=-2" />, the line <Katex tex="y=2-2x" /> cuts the parabola twice.)
          </p>
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Minimum Distance"
        marks={2}
        statement={
          <>
            Find the value, <Katex tex="k" />, that gives the shortest possible distance
            between the graph of the function of <Katex tex="y=f(x-k)" /> and point{' '}
            <Katex tex="P" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Slide the parabola: it is closest to P when its lowest point sits directly above P">
          <ShiftWidget />
        </Explore>
        <WrongMethod
          title="Write down the distance formula and differentiate"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="d^2 = (x-1)^2+\left((x-k)^2+3(x-k)+5\right)^2" />
              <Katex display tex="\begin{aligned} \tfrac{d}{dx}\left(d^2\right) &= 2(x-1) \\ &\quad+2\bigl((x-k)^2+3(x-k)+5\bigr) \\ &\quad\times\bigl(2(x-k)+3\bigr) = 0 \end{aligned}" />
            </>
          }
        >
          <p>
            This has two unknowns, <Katex tex="x" /> (which point of the curve) and <Katex tex="k" /> (where the curve
            is), and setting the derivative to zero gives a cubic in <Katex tex="x" /> with <Katex tex="k" /> tangled
            all through it. Even if you solved it, it would only find the closest point for one fixed{' '}
            <Katex tex="k" />; you would still have to find the best <Katex tex="k" />. The report notes many students
            tried this, often with limited success due to errors in differentiation or algebra. When the algebra for a
            2-mark question explodes like this, stop and draw the picture.
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
