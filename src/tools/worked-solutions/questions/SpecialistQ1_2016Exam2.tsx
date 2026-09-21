// 2016 Specialist Mathematics — Exam 2, Section B, Question 1 (9 marks).
// f(x) = (4 + x² + x³)/x: stationary point, inflection, sketch, arc length, and setting up
// a volume of revolution about the y-axis. Question text transcribed from the original
// paper; VCAA supplied blank grid axes for part (c), so the sketch below is our own
// matplotlib figure. Answers verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './spec-2016exam2-q1c-graph.png'

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
      accuracy in the placement of the endpoints. Students generally followed the
      instruction to label particular points but these points were not always plotted with
      appropriate accuracy. Careful attention to the axes scale is required.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      A variety of equivalent correct forms were presented. A common error was an integrand
      containing the square of <Katex tex="f(x)" /> rather than the square of{' '}
      <Katex tex="f'(x)" />. Other errors included incorrect terminals, sign errors within
      the integrand, and expressions that appeared to represent the volume of a solid of
      revolution.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      The majority of students who answered Question 1d.i. correctly were able to answer
      this question correctly.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. A number of students incorrectly gave decimal
      approximations for the value of <Katex tex="b" />. Some students interchanged the
      values of <Katex tex="b" /> and <Katex tex="c" />, but this would only be correct if
      they wrote <Katex tex="a=-\pi" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{4}{x}+x+x^2" />,
    reason: <>Splitting the fraction term by term makes both derivatives easy.</>,
  },
  {
    working: <Katex display tex="f'(x) = -\frac{4}{x^2}+1+2x = \frac{2x^3+x^2-4}{x^2}" />,
    reason: <>Over a common denominator, ready to set the numerator to zero.</>,
  },
  {
    working: <Cas fn="solve">solve(2x³ + x² - 4 = 0, x)</Cas>,
    reason: <>The cubic has one real root. A fraction is zero only when its numerator is.</>,
  },
  {
    working: <Katex display tex="x \approx 1.1134 \implies f(x) \approx 5.9457" />,
    reason: <>Keep the unrounded <Katex tex="x" /> when computing <Katex tex="y" /> — rounding first is the error the report flags in part (b).</>,
  },
  {
    working: <Katex display tex="\boxed{(1.11,\ 5.95)}" />,
    reason: <>Two decimal places, in coordinate form as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = \frac{8}{x^3}+2" />,
    reason: <>Differentiating <Katex tex="f'(x)=-4x^{-2}+1+2x" /> again.</>,
  },
  {
    working: <Katex display tex="\frac{8}{x^3}+2 = 0 \implies x^3 = -4 \implies x = -\sqrt[3]{4}" />,
    reason: <>An exact value, about <Katex tex="-1.5874" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(-\sqrt[3]{4}\right) = \frac{4}{-\sqrt[3]{4}}-\sqrt[3]{4}+\sqrt[3]{16} = -\sqrt[3]{4}" />,
    reason: <>The first and third terms are both <Katex tex="\sqrt[3]{16}" /> in magnitude and cancel — so the point lies exactly on the line <Katex tex="y=x" />, which is why both coordinates are the same.</>,
  },
  {
    working: <Katex display tex="f'' \text{ changes sign at } x=-\sqrt[3]{4}" />,
    reason: <><Katex tex="\tfrac{8}{x^3}" /> passes through <Katex tex="-2" /> there and is continuous nearby, so the concavity really does flip. (At <Katex tex="x=0" /> the function is undefined, so that is not a candidate.)</>,
  },
  {
    working: <Katex display tex="\boxed{(-1.59,\ -1.59)}" />,
    reason: <>The report notes <Katex tex="-1.58" /> appearing as a <Katex tex="y" />-value, from substituting the already-rounded <Katex tex="-1.59" /> instead of the exact <Katex tex="-\sqrt[3]{4}" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x\in[-3,3]\setminus\{0\}" />,
    reason: <>The rule is undefined at <Katex tex="x=0" />, so the graph has two separate branches. Drawing across the gap, or beyond <Katex tex="\pm3" />, costs marks.</>,
  },
  {
    working: <Katex display tex="x\to0^- \implies f\to-\infty; \qquad x\to0^+ \implies f\to+\infty" />,
    reason: <>The <Katex tex="\tfrac4x" /> term dominates near the origin and carries its sign.</>,
  },
  {
    working: <Katex display tex="f(-3) = \tfrac{14}{3}\approx4.67, \qquad f(3) = \tfrac{40}{3}\approx13.33" />,
    reason: <>The two endpoints. The report says inaccurate endpoint placement was a common loss — plot them carefully against the printed scale.</>,
  },
  {
    working: <Katex display tex="\text{label } (1.11,5.95) \text{ and } (-1.59,-1.59)" />,
    reason: <>The question asks explicitly for both, with coordinates.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_a^b\sqrt{1+\left(f'(x)\right)^2}\,dx" />,
    reason: <>The cartesian arc-length formula. It is <Katex tex="f'" /> that gets squared, not <Katex tex="f" /> — the report's main flagged error.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{-3}^{-0.5}\sqrt{1+\left(\frac{2x^3+x^2-4}{x^2}\right)^2}\,dx}" />,
    reason: <>Using <Katex tex="f'" /> from part (a) and the terminals given in the stem. Any equivalent form was accepted.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">nInt(√(1 + ((2x³+x²-4)/x²)²), x, -3, -0.5)</Cas>,
    reason: <>Straight evaluation of part (d)(i).</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 13.18}" />,
    reason: <>Two decimal places. Sensible: the curve runs from <Katex tex="(-3,4.67)" /> to <Katex tex="(-0.5,-8.25)" />, a straight-line distance of about <Katex tex="13.2" /> — and the curve is almost straight over that stretch.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_c^b x^2\,dy" />,
    reason: <>Rotating about the <Katex tex="y" />-axis means slicing horizontally, so the radius is <Katex tex="x" /> and the variable of integration is <Katex tex="y" />. That fixes <Katex tex="a=\pi" />.</>,
  },
  {
    working: <Katex display tex="y = f(-0.5) = -8-0.5+0.25 = -\frac{33}{4}" />,
    reason: <>The lower terminal: the <Katex tex="y" />-value at one end of the rotated arc.</>,
  },
  {
    working: <Katex display tex="y = f(-3) = -\frac43-3+9 = \frac{14}{3}" />,
    reason: <>The upper terminal.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\pi,\quad b=\frac{14}{3},\quad c=-\frac{33}{4}}" />,
    reason: <>Exact values — the report says decimals for <Katex tex="b" /> lost the mark, since Section B requires exact answers unless told otherwise. Swapping <Katex tex="b" /> and <Katex tex="c" /> would need <Katex tex="a=-\pi" /> to compensate.</>,
  },
]

export default function SpecialistQ1_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (9 marks)</p>
        <p>
          Consider <Katex tex="f(x)=\dfrac{4+x^2+x^3}{x}" />,{' '}
          <Katex tex="x\in R\setminus\{0\}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Find the stationary point of the graph of <Katex tex="f" />. Express your answer
            in coordinate form, giving values correct to two decimal places.
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
          <img
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
        marks={1}
        statement={
          <>
            Write down a definite integral, in terms of <Katex tex="x" />, which gives the
            length of the curve to be rotated.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={1}
        statement={<>Find the length of this curve, correct to two decimal places.</>}
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
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
            horizontal instead: the radius is <Katex tex="x" />, the thickness is{' '}
            <Katex tex="dy" />, and the terminals are <Katex tex="y" />-values.
          </p>
          <p>
            So the work here is entirely in converting the given <Katex tex="x" />-interval{' '}
            <Katex tex="[-3,-0.5]" /> into the matching <Katex tex="y" />-interval.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
