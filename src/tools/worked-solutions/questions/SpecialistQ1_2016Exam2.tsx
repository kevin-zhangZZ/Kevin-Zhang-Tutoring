// 2016 Specialist Mathematics — Exam 2, Section B, Question 1 (9 marks).
// f(x) = (4 + x² + x³)/x: stationary point, inflection, sketch, (arc length), and setting up
// a volume of revolution about the y-axis. Question text transcribed from the original
// paper; VCAA supplied blank grid axes for part (c), so the sketch below is our own
// matplotlib figure, drawn on the same grid (x from −3 to 3 in halves, y from −14 to 14 in
// twos). Answers verified with scipy. Solution is original.
//
// Parts d.i. and d.ii. (arc length from a Cartesian rule) are no longer on the study design —
// the skip guide lists both — so their statements are shown, marked as such, with no worked
// solution (KZ's decision, Sept 2026).
//
// Interactive (Oct 2026 review; only e. qualifies, 34% full marks): interactives/
// spec-2016e2-q1e-terminals.tsx — a horizontal slice moves up the glass, showing the terminals are
// the heights f(−0.5) = −33/4 and f(−3) = 14/3 of the arc's ends, with a toggle shading what
// −3 to −0.5 used as y-terminals would cover. All values rechecked with sympy/scipy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './spec-2016e2-q1c-graph.png'
import { Explore, lazyWidget } from '../Explore'

const TerminalsWidget = lazyWidget(() => import('../interactives/spec-2016e2-q1e-terminals'))

const EXAM_A: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: (
    <>
      This question was answered very well. A small number of students gave the coordinates
      for the point of inflection rather than the stationary point.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [7, 15, 78],
  average: 1.7,
  comment: (
    <>
      This question was generally answered well. The most common error resulted from
      substituting a rounded <Katex tex="x" /> value, yielding an incorrect{' '}
      <Katex tex="y" /> value of <Katex tex="-1.58" />. Some students left off the negative
      sign of the <Katex tex="y" /> value.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [6, 19, 29, 46],
  average: 2.2,
  comment: (
    <>
      Students missed out on marks for ignoring the domain of the function or a lack of
      accuracy in the placement of the endpoints. Students are advised to use their
      technology as a tool to support the sketching of an accurate graph rather than simply
      copying a roughly correct shape from a screen. Students generally followed the
      instruction to label particular points but these points were not always plotted with
      appropriate accuracy. Careful attention to the axes scale is required.
    </>
  ),
}



const EXAM_E: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      Question 1e. was not answered well. A number of students incorrectly gave decimal
      approximations for the value of <Katex tex="b" />. Students must note and follow the
      general instructions given at the start of Section B. Some students interchanged the
      values of <Katex tex="b" /> and <Katex tex="c" />, but this would only be correct if
      they wrote <Katex tex="a=-\pi" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{4}{x}+x+x^2" />,
    reason: <>Divide each term by <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = -\frac{4}{x^2}+1+2x = \frac{2x^3+x^2-4}{x^2}" />,
    reason: <>A stationary point has <Katex tex="f'(x)=0" />. Over a common denominator, the fraction is zero only when its numerator is.</>,
  },
  {
    working: <Cas fn="solve">solve(2x³ + x² - 4 = 0, x)</Cas>,
    reason: <>The cubic has only one real root, so there is exactly one stationary point.</>,
  },
  {
    working: <Katex display tex="x \approx 1.1134 \implies f(x) \approx 5.9457" />,
    reason: <>Substitute the unrounded <Katex tex="x" /> into <Katex tex="f" />, then round once at the end.</>,
    more: <>Rounding <Katex tex="x" /> first is the error the report flags in part b. It is a local minimum: <Katex tex="f''(x)=\tfrac{8}{x^3}+2" /> (part b) is positive at <Katex tex="x\approx1.11" />. That is the turning point to label in part c.</>,
  },
  {
    working: <Katex display tex="\boxed{(1.11,\ 5.95)}" />,
    reason: <>Two decimal places, in coordinate form as asked.</>,
    more: <>The report notes a few students gave the point of inflection instead. A stationary point is where <Katex tex="f'(x)=0" /> (the graph is flat); an inflection is where the concavity changes, which is part b.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = \frac{8}{x^3}+2" />,
    reason: <>Differentiating <Katex tex="f'(x)=-4x^{-2}+1+2x" /> again.</>,
  },
  {
    working: <Katex display tex="\frac{8}{x^3}+2 = 0 \implies x^3 = -4 \implies x = -\sqrt[3]{4}" />,
    reason: <>An inflection needs <Katex tex="f''(x)=0" />. Keep the exact root, about <Katex tex="-1.5874" />, for the next line.</>,
  },
  {
    working: <Katex display tex="f\!\left(-\sqrt[3]{4}\right) = \frac{4}{-\sqrt[3]{4}}-\sqrt[3]{4}+\sqrt[3]{16} = -\sqrt[3]{4}" />,
    reason: <>Substitute the exact <Katex tex="x" />, not <Katex tex="-1.59" />. The first and third terms, <Katex tex="-\sqrt[3]{16}" /> and <Katex tex="+\sqrt[3]{16}" />, cancel.</>,
    more: <>Since <Katex tex="\tfrac{4}{\sqrt[3]{4}}=\sqrt[3]{\tfrac{64}{4}}=\sqrt[3]{16}" />, and <Katex tex="\left(\sqrt[3]{4}\right)^2=\sqrt[3]{16}" />. So the point lies exactly on the line <Katex tex="y=x" />, which is why both coordinates are the same. On CAS, entering <Katex tex="f(-\sqrt[3]{4})" /> does this in one step.</>,
  },
  {
    working: <Katex display tex="f'' \text{ changes sign at } x=-\sqrt[3]{4}" />,
    reason: <>For <Katex tex="x<-\sqrt[3]{4}" />, <Katex tex="f''>0" />; for <Katex tex="-\sqrt[3]{4}<x<0" />, <Katex tex="f''<0" />. The concavity flips, so it is a genuine inflection.</>,
    more: <>Check with a value each side: <Katex tex="f''(-2)=-1+2=1>0" /> and <Katex tex="f''(-1)=-8+2=-6<0" />. <Katex tex="f''=0" /> alone is not enough, which is why this line is needed. At <Katex tex="x=0" /> the function is undefined, so that is not a candidate.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1.59,\ -1.59)}" />,
    reason: <>Both coordinates to two decimal places, and both negative.</>,
    more: <>The report's most common error was a <Katex tex="y" />-value of <Katex tex="-1.58" />: substituting the rounded <Katex tex="x=-1.59" /> gives <Katex tex="f(-1.59)\approx-1.5776" />, which rounds to <Katex tex="-1.58" />. Rounding happens once, at the end. The report also notes some students dropped the negative sign of <Katex tex="y" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x\in[-3,3]\setminus\{0\}" />,
    reason: <>The rule is undefined at <Katex tex="x=0" />, so the graph has two separate branches. Draw nothing across the gap or beyond <Katex tex="\pm3" />.</>,
    more: <>The report says marks were lost for ignoring the domain. The domain <Katex tex="[-3,3]" /> is closed, so both ends are drawn as closed dots and the curve stops there.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x\to0^- \implies f\to-\infty \\ &x\to0^+ \implies f\to+\infty \end{aligned}" />,
    reason: <>Near <Katex tex="x=0" /> the <Katex tex="\tfrac4x" /> term dominates and carries its sign, so <Katex tex="x=0" /> is a vertical asymptote.</>,
  },
  {
    working: <Katex display tex="f(-3) = \tfrac{14}{3}\approx4.67, \qquad f(3) = \tfrac{40}{3}\approx13.33" />,
    reason: <>The two endpoints, computed so they can be plotted accurately against the printed scale.</>,
    more: <>The report notes marks lost for inaccurate endpoint placement and advises using technology to support an accurate sketch, not copying a rough shape. Graph <Katex tex="f" /> on CAS with the same window as the printed axes (<Katex tex="x" /> from <Katex tex="-3" /> to <Katex tex="3" />, <Katex tex="y" /> from <Katex tex="-14" /> to <Katex tex="14" />), then plot the computed points: the right-hand endpoint sits just below the top gridline, <Katex tex="y=14" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x<0:\ f'(x)<0,\ \ f(-2)=0 \\ &x>0:\ \text{minimum at } (1.11,5.95) \end{aligned}" />,
    reason: <>For <Katex tex="x<0" /> the numerator of <Katex tex="f'" /> is negative, so the left branch falls; <Katex tex="f(-2)=\tfrac{4+4-8}{-2}=0" />. The right branch falls from <Katex tex="+\infty" /> and rises to <Katex tex="\tfrac{40}{3}" />, so its turning point is a minimum.</>,
    more: <>For <Katex tex="x<0" /> the numerator of <Katex tex="f'" />, <Katex tex="2x^3+x^2-4=x^2(2x+1)-4" />, is always negative: for <Katex tex="x\le-\tfrac12" /> the term <Katex tex="x^2(2x+1)" /> is <Katex tex="\le0" />, and for <Katex tex="-\tfrac12<x<0" />, <Katex tex="x^2<\tfrac14" /> and <Katex tex="2x+1<1" />, so it is less than <Katex tex="\tfrac14" />. Either way it is below <Katex tex="4" />. So the left branch is decreasing. For the intercept, set the numerator of <Katex tex="f" />, <Katex tex="x^3+x^2+4" />, to zero and try the factors of <Katex tex="4" />: <Katex tex="x=-2" /> works, and <Katex tex="x^3+x^2+4=(x+2)(x^2-x+2)" />, where the quadratic has no real roots (discriminant <Katex tex="1-8<0" />). So <Katex tex="-2" /> is the only intercept. The left branch is concave up, then concave down after the inflection of part b.</>,
  },
  {
    working: <Katex display tex="\text{label } (1.11,5.95) \text{ and } (-1.59,-1.59)" />,
    reason: <>The question asks explicitly for both, with coordinates, and each dot must sit at its true position on the grid.</>,
    more: <>The report says students generally labelled these points but did not always plot them with appropriate accuracy: <Katex tex="(-1.59,-1.59)" /> sits just left of the gridline <Katex tex="x=-1.5" />, about a fifth of the way up from <Katex tex="y=-2" /> to <Katex tex="0" />.</>,
  },
]



const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_c^b x^2\,dy" />,
    reason: <>Rotating about the <Katex tex="y" />-axis means slicing horizontally: discs of radius <Katex tex="x" /> and thickness <Katex tex="dy" />, each of volume <Katex tex="\pi x^2\,dy" />. So <Katex tex="a=\pi" />.</>,
  },
  {
    working: <Katex display tex="y = f(-0.5) = -8-0.5+0.25 = -\frac{33}{4}" />,
    reason: <>The terminals are heights, so convert each end of <Katex tex="x\in[-3,-0.5]" /> using <Katex tex="f" />. This is the bottom end, so it gives <Katex tex="c" />.</>,
    more: <>Using <Katex tex="-3" /> and <Katex tex="-0.5" /> themselves as terminals is the natural slip: in a <Katex tex="dy" /> integral they would be read as heights, and cover only a band of the glass. Each end is safe to convert because <Katex tex="f'(x)<0" /> on <Katex tex="[-3,-0.5]" /> (part c): the arc falls steadily, so every height between the two ends meets it exactly once.</>,
  },
  {
    working: <Katex display tex="y = f(-3) = -\frac43-3+9 = \frac{14}{3}" />,
    reason: <>The other end, the top of the glass, so the upper terminal <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\pi,\quad b=\frac{14}{3},\quad c=-\frac{33}{4}}" />,
    reason: <>Exact values, as Section B requires unless told otherwise; <Katex tex="b" /> is the top of the glass, <Katex tex="c" /> the bottom.</>,
    more: <>The report says a number of students gave a decimal for <Katex tex="b" />, which lost the mark: <Katex tex="4.67" /> is only an approximation to <Katex tex="\tfrac{14}{3}" />. Swapping <Katex tex="b" /> and <Katex tex="c" /> reverses the integral, <Katex tex="\int_{14/3}^{-33/4}=-\int_{-33/4}^{14/3}" />, so it is only correct with <Katex tex="a=-\pi" />, as the report says.</>,
  },
]

export default function SpecialistQ1_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (9 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Stationary Point"
        marks={1}
        statement={
          <>
            Find the stationary point of the graph of{' '}
            <Katex tex="f(x)=\dfrac{4+x^2+x^3}{x}" />, <Katex tex="x\in R\setminus\{0\}" />.
            Express your answer in coordinate form, giving values correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Split the fraction first">
          <p>
            <Katex tex="\dfrac{4+x^2+x^3}{x}=\dfrac4x+x+x^2" />. Every part of this question
            — both derivatives, the sketch, the endpoint values — is easier from that form
            than from the quotient.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Find the point of inflection of the graph given in part a. Express your answer in
            coordinate form, giving values correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f(x)=\dfrac{4+x^2+x^3}{x}" /> for{' '}
            <Katex tex="x\in[-3,3]" />, labelling the turning point and the point of
            inflection with their coordinates, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="Graph of y = (4 + x² + x³)/x on [−3, 3]: a left branch falling from (−3, 14/3) through an inflection at (−1.59, −1.59) and down to −∞ at the origin, and a right branch coming down from +∞ to a minimum at (1.11, 5.95) and rising to (3, 40/3)"
            className="w-full max-w-[400px]"
          />
        </div>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A glass is to be modelled by rotating the curve that is the part of the graph where{' '}
          <Katex tex="x\in[-3,-0.5]" /> about the <Katex tex="y" />-axis, to form a solid of
          revolution.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Arc Length"
        marks={1}
        statement={
          <>
            Write down a definite integral, in terms of <Katex tex="x" />, which gives the
            length of the curve to be rotated.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Arc length for a curve given in Cartesian form is no longer on the Specialist
            Mathematics study design (arc length along a vector or parametric curve still is), so
            this part is left without a worked solution. The skip guide lists it as one to skip.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Arc Length"
        marks={1}
        statement={<>Find the length of this curve, correct to two decimal places.</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Finding the length of a curve given in Cartesian form is no longer on the Specialist
            Mathematics study design (arc length along a vector or parametric curve still is), so
            this part is left without a worked solution. The skip guide lists it as one to skip.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="e"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            The volume of the solid formed is given by{' '}
            <Katex tex="V=a\displaystyle\int_c^b x^2\,dy" />. Find the values of{' '}
            <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />. Do not attempt to
            evaluate this integral.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="Rotating about the y-axis">
          <p>
            About the <Katex tex="x" />-axis the slices are vertical and the formula is{' '}
            <Katex tex="\pi\int y^2\,dx" />. About the <Katex tex="y" />-axis they are
            horizontal instead, and the formula becomes <Katex tex="\pi\int x^2\,dy" />: the
            roles of <Katex tex="x" /> and <Katex tex="y" /> swap, terminals included.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="The terminals are the heights of the arc's two ends, not −3 and −0.5">
          <TerminalsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
