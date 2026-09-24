// 2017 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks).
// f(x) = x/(1 + x³): asymptotes, stationary point, point of inflection, the graph, then
// splitting a solid of revolution into two equal halves. Question text transcribed from
// the original paper; VCAA supplied blank axes for part b. (x from −3 to 3, y from −2 to 2),
// so the sketch is our own matplotlib figure on that grid. Answers verified with sympy and
// scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './spec-2017e2-q1b-graph.png'

const EXAM_AI: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      The majority of students stated the vertical asymptote but significantly fewer stated
      the horizontal asymptote. Various incorrect attempts at partial fraction forms were
      made.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [2, 17, 81],
  average: 1.8,
  comment: (
    <>
      This question was generally answered well. Some students did not give the coordinates
      of the stationary point in the required form.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [10, 77, 13],
  average: 1.0,
  comment: (
    <>
      The majority of students provided the correct inflection point. A common error was to
      erroneously include the point <Katex tex="(0,0)" />, which is another point where{' '}
      <Katex tex="f''(x)=0" />, but it is not a point of inflection as there is no change of
      concavity; <Katex tex="f''(x)" /> does not change sign.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [3, 9, 24, 64],
  average: 2.5,
  comment: (
    <>
      Graphing was generally completed to a reasonable standard. In some cases the shape of
      the graph was poor and the required points were not marked clearly or were not placed
      in the correct position.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [17, 13, 71],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Other equivalent correct forms were presented. A
      common error was a failure to square <Katex tex="f(x)" /> or including{' '}
      <Katex tex="\pi" /> on only one side of the equation above.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      The majority of students who answered Question 1ci. correctly were also able to answer
      this question correctly.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="1+x^3 = 0 \implies x = -1" />,
    reason: <>The denominator vanishes only at <Katex tex="x=-1" />, and the numerator does not, so that is a vertical asymptote. It also fixes the maximal domain <Katex tex="D=R\setminus\{-1\}" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{1+x^3} = \frac{\frac1{x^2}}{\frac1{x^3}+1}" />,
    reason: <>Dividing top and bottom by <Katex tex="x^3" />, the highest power present.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies f(x)\to\frac{0}{0+1}=0" />,
    reason: <>The denominator's degree exceeds the numerator's by <Katex tex="2" />, so the curve flattens onto the <Katex tex="x" />-axis. The report says significantly fewer students stated this one than the vertical asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-1 \text{ and } y=0}" />,
    reason: <>One vertical, one horizontal.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{(1+x^3)(1)-x(3x^2)}{(1+x^3)^2}" />,
    reason: <>Quotient rule.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{1-2x^3}{(1+x^3)^2}}" />,
    reason: <>Numerator: <Katex tex="1+x^3-3x^3=1-2x^3" />.</>,
  },
  {
    working: <Katex display tex="1-2x^3=0 \implies x = \sqrt[3]{\tfrac12}\approx0.7937" />,
    reason: <>A fraction is zero only when its numerator is, and the denominator is a square so it never changes sign — the derivative's sign is entirely the numerator's.</>,
  },
  {
    working: <Katex display tex="f(0.7937\ldots) = \frac{0.7937\ldots}{1.5} \approx 0.5291" />,
    reason: <>Note <Katex tex="x^3=\tfrac12" /> exactly, so the denominator is exactly <Katex tex="\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.79,\ 0.53)}" />,
    reason: <>Two decimal places, as coordinates — the report notes some students did not give the coordinates in the required form.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(d²/dx²(x/(1+x^3)) = 0, x)</Cas>,
    reason: <>This is the technology-active paper, so let the CAS do the second derivative. It gives <Katex tex="f''(x)=\dfrac{6x^2(x^3-2)}{(1+x^3)^3}" />, which is zero at <Katex tex="x=0" /> and <Katex tex="x=\sqrt[3]{2}" />.</>,
  },
  {
    working: <Katex display tex="x=0: \quad f''(x) \text{ does not change sign}" />,
    reason: <>This is the trap. <Katex tex="f''(0)=0" />, but the factor responsible is <Katex tex="x^2" />, which never changes sign — no change of concavity, so no inflection. The report lists including <Katex tex="(0,0)" /> as a common error.</>,
  },
  {
    working: <Katex display tex="x=\sqrt[3]{2}\approx1.2599: \quad f''(x) \text{ changes sign}" />,
    reason: <>Here the factor <Katex tex="x^3-2" /> changes sign (and the denominator is positive for <Katex tex="x>-1" />), so the curve goes from concave down through the maximum to concave up further out.</>,
  },
  {
    working: <Katex display tex="f\!\left(\sqrt[3]{2}\right) = \frac{\sqrt[3]{2}}{1+2} \approx 0.42" />,
    reason: <>Again the cube is exact: <Katex tex="\left(\sqrt[3]2\right)^3=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(1.26,\ 0.42)}" />,
    reason: <>One point of inflection only.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{asymptotes } x=-1,\ y=0" />,
    reason: <>Draw these first, dashed and labelled — they frame everything else.</>,
  },
  {
    working: <Katex display tex="\text{intercept } (0,0)" />,
    reason: <><Katex tex="f(x)=0" /> only when <Katex tex="x=0" />, so the curve meets both axes at the origin and nowhere else.</>,
  },
  {
    working: <Katex display tex="\text{stationary point } (0.79,0.53),\quad \text{inflection } (1.26,0.42)" />,
    reason: <>From parts a.ii. and a.iii. Mark them with coordinates — the question asks for labels.</>,
  },
  {
    working: <Katex display tex="x\to-1^-: f\to+\infty; \qquad x\to-1^+: f\to-\infty" />,
    reason: <>Just left of <Katex tex="-1" />, <Katex tex="1+x^3<0" /> and <Katex tex="x<0" />, so the quotient is positive. Just right, the denominator flips sign. That decides which way each branch runs.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int \bigl(f(x)\bigr)^2 dx" />,
    reason: <>Volume of revolution about the <Katex tex="x" />-axis. The <Katex tex="f(x)" /> must be <em>squared</em> — the report lists forgetting this as a common error.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi\int_0^{a}\bigl(f(x)\bigr)^2 dx = \pi\int_{a}^{3}\bigl(f(x)\bigr)^2 dx}" />,
    reason: <>The two pieces of <Katex tex="S" /> generate equal volumes, so set the two integrals equal. Put <Katex tex="\pi" /> on both sides or neither — including it on one side only is the other flagged error. An equivalent accepted form says the first piece is half the whole: <Katex tex="\int_0^{a}\bigl(f(x)\bigr)^2 dx = \tfrac12\int_0^{3}\bigl(f(x)\bigr)^2 dx" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(∫((x/(1+x³))², x, 0, a) = ∫((x/(1+x³))², x, a, 3), a) | 0&lt;a&lt;3</Cas>,
    reason: <>Straight from part c.i.; the <Katex tex="\pi" /> cancels. Restrict to the given <Katex tex="0<a<3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx 0.98}" />,
    reason: <>Two decimal places. It sits left of centre, which is right: the curve is tallest near <Katex tex="x=0.8" />, so most of the volume is generated early and only a short interval is needed to reach half.</>,
  },
]

export default function SpecialistQ1_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:D\to R" />, <Katex tex="f(x)=\dfrac{x}{1+x^3}" />, where{' '}
          <Katex tex="D" /> is the maximal domain of <Katex tex="f" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Asymptotes"
        marks={1}
        statement={<>Find the equations of any asymptotes of the graph of <Katex tex="f" />.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Stationary Points"
        marks={2}
        statement={
          <>
            Find <Katex tex="f'(x)" /> and state the coordinates of any stationary points of
            the graph of <Katex tex="f" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Find the coordinates of any points of inflection of the graph of{' '}
            <Katex tex="f" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <Background title="Zero second derivative is not enough">
          <p>
            A point of inflection needs the concavity to <em>change</em>, which means{' '}
            <Katex tex="f''" /> must change <em>sign</em> — not merely reach zero. Here{' '}
            <Katex tex="f''(0)=0" /> but the sign is the same on both sides, so{' '}
            <Katex tex="(0,0)" /> is not an inflection point.
          </p>
          <p>
            The quickest check on a CAS is to graph <Katex tex="f''" /> and look for a
            crossing rather than a touch. By hand, test a value either side.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f(x)=\dfrac{x}{1+x^3}" /> from{' '}
            <Katex tex="x=-3" /> to <Katex tex="x=3" />, marking all stationary points, points
            of inflection and intercepts with axes, labelling them with their coordinates.
            Show any asymptotes and label them with their equations.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Graph of y = x/(1+x³) from x = −3 to 3: a branch approaching the x-axis from above on the far left and rising to +∞ at the asymptote x = −1, then a branch coming up from −∞ just right of x = −1 through the origin to a maximum at (0.79, 0.53), an inflection at (1.26, 0.42), and a slow decay back towards y = 0"
            className="w-full max-w-[460px]"
          />
        </div>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The region <Katex tex="S" />, bounded by the graph of <Katex tex="f" />, the{' '}
          <Katex tex="x" />-axis and the line <Katex tex="x=3" />, is rotated about the{' '}
          <Katex tex="x" />-axis to form a solid of revolution. The line{' '}
          <Katex tex="x=a" />, where <Katex tex="0<a<3" />, divides the region{' '}
          <Katex tex="S" /> into two regions such that, when the two regions are rotated about
          the <Katex tex="x" />-axis, they generate solids of equal volume.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Write down an equation involving definite integrals that can be used to determine{' '}
            <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Hence, find the value of <Katex tex="a" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
