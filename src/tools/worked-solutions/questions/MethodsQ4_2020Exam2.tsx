// 2020 Mathematical Methods — Exam 2, Section B Question 4 (13 marks). Tangents to
// 2x·e^(1−x²): slope, obtuse angle, a perpendicular pair and their intersection, then two
// chords cutting equal areas. Question text transcribed from the original paper; both
// figures are crops of VCAA's own artwork. Answers checked with scipy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2020e2-q4-graph.png'
import segmentsSrc from './meth-2020e2-q4e-segments.png'

const EXAM_A: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: <>Some students wrote the equation of the tangent instead of its gradient.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: <><Katex tex="63^\circ" /> and <Katex tex="-63^\circ" /> were common incorrect answers.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Some responses contained transcription errors.
      <br />
      Instead of writing <Katex tex="2\left(1-2p^2\right)e^{-p^2+1}" />, some wrote{' '}
      <Katex tex="2\left(1-2p^2\right)e^{-p^2}+1" />.
      <br />
      Brackets were not used well, and some students wrote the equation of the tangent instead
      of its gradient.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [38, 8, 54],
  average: 1.2,
  comment: (
    <>
      Some students solved <Katex tex="2\left(1-2p^2\right)e^{1-p^2}=2" />. Others knew that{' '}
      <Katex tex="m_1m_2=-1" /> but were unable to connect this information to their previous
      answers. <Katex tex="p=0.656" /> was often seen.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [46, 11, 17, 26],
  average: 1.2,
  comment: (
    <>
      Many students successfully found that the point of intersection of the two tangents
      occurred at <Katex tex="x=0.80" /> but then substituted this into <Katex tex="f(x)" />,
      getting the value 2.29 instead of substituting it into one of the two tangent
      equations. Some students managed to find the equation of the tangent at <Katex tex="x=1" />{' '}
      but did not know what to do with this equation. Others rounded too early.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [56, 44],
  average: 0.4,
  comment: (
    <>
      Some students did not write a rule. Others left out <Katex tex="x" />, giving the gradient
      as the final answer: <Katex tex="y=2e^{1-n^2}" />.
      <br />
      A number of students wrote the rule in terms of <Katex tex="f(n)" /> and not{' '}
      <Katex tex="n" />. Other common incorrect answers were: <Katex tex="y=2xe^{1-x^2}" />,{' '}
      <Katex tex="y=2ne^{1-n^2}" /> and <Katex tex="y=2e^{1-x^2}" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: (
    <>
      A rule was required. Some students only wrote down the gradient. Others assumed{' '}
      <Katex tex="f(3)=0" />.
      <br />
      There were a lot of transcription errors: <Katex tex="e^{n^2-8}" /> was often written as{' '}
      <Katex tex="e^{n^2}-8" />. The variable <Katex tex="x" /> sometimes looked like{' '}
      <Katex tex="n" /> and vice versa. Brackets were used poorly. Some students only wrote down
      part of the equation. Students need to make sure they scroll across the screen to ensure
      they identify a complete expression when using technology.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [60, 7, 22, 11],
  average: 0.8,
  comment: (
    <>
      The majority of students who attempted this question were able to correctly set up the
      integrals. However, some were then unable to arrive at the final response. There was no
      need to write out entire expressions. This often led to transcription errors and misuse
      of brackets. Others used areas of triangles:{' '}
      <Katex tex="\displaystyle\int_0^n f(x)\,dx-\frac12nf(n)=\frac12(3-n)\bigl(f(n)-f(3)\bigr)-\int_n^3f(x)\,dx" />,
      which gave <Katex tex="n=1.087" />.
      <br />
      The area from <Katex tex="x=n" /> to <Katex tex="x=3" /> is a trapezium, not a triangle.
      So, the correct formulation is{' '}
      <Katex tex="\displaystyle\int_0^n f(x)\,dx-\frac12nf(n)=\frac12(3-n)\bigl(f(n)+f(3)\bigr)-\int_n^3f(x)\,dx" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 2xe^{1-x^2}" />,
    reason: <>A product: <Katex tex="2x" /> times <Katex tex="e^{1-x^2}" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2e^{1-x^2}+2x\cdot(-2x)e^{1-x^2} = 2\left(1-2x^2\right)e^{1-x^2}" />,
    reason: <>Product rule, with the chain rule supplying the <Katex tex="-2x" />.</>,
  },
  {
    working: <Katex display tex="f'(1) = 2(1-2)e^{0}" />,
    reason: <><Katex tex="e^{1-1}=e^0=1" />, so this is clean by hand.</>,
  },
  {
    working: <Katex display tex="\boxed{-2}" />,
    reason: <>The <em>slope</em>, not the tangent's equation.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\theta = -2" />,
    reason: <>The angle a line makes with the positive horizontal direction has tangent equal to its gradient.</>,
  },
  {
    working: <Katex display tex="\tan^{-1}(-2) = -63.43^\circ" />,
    reason: <>The calculator's principal value — acute and negative, so not the angle asked for.</>,
  },
  {
    working: <Katex display tex="\theta = 180^\circ+(-63.43^\circ) = 116.56\ldots^\circ" />,
    reason: <>Adding <Katex tex="180^\circ" /> lands in the second quadrant, where the obtuse angle lives.</>,
  },
  {
    working: <Katex display tex="\boxed{117^\circ}" />,
    reason: <>To the nearest degree. The report lists <Katex tex="63^\circ" /> and <Katex tex="-63^\circ" /> as common incorrect answers.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2\left(1-2x^2\right)e^{1-x^2} \ \text{ from part a.}" />,
    reason: <>The derivative is already done.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(p) = 2\left(1-2p^2\right)e^{1-p^2}}" />,
    reason: <>Equivalently <Katex tex="\left(2e-4p^2e\right)e^{-p^2}" />. Keep the brackets — <Katex tex="2\left(1-2p^2\right)e^{-p^2+1}" /> is not the same as <Katex tex="2\left(1-2p^2\right)e^{-p^2}+1" />.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="m_1m_2 = -1 \text{ with } m_1 = -2 \implies m_2 = \tfrac12" />,
    reason: <>Perpendicular gradients are negative reciprocals; part a. supplies <Katex tex="m_1" />.</>,
  },
  {
    working: <Katex display tex="2\left(1-2p^2\right)e^{1-p^2} = \tfrac12" />,
    reason: <>Setting the part c. expression equal to <Katex tex="\tfrac12" /> — the report notes some students solved it equal to 2.</>,
  },
  {
    working: <Cas fn="solve">solve(2(1 − 2p²)·e^(1 − p²) = 1/2, p) | 0 ≤ p ≤ 3</Cas>,
    reason: <>Restrict to the given domain; there is one solution there.</>,
  },
  {
    working: <Katex display tex="p = 0.655251\ldots" />,
    reason: <>Store this value — part d.ii. needs its full precision.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.655}" />,
    reason: <>To three decimal places. The report notes <Katex tex="p=0.656" /> was often seen.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{at } x=1: \ f(1) = 2e^0 = 2, \quad m = -2" />,
    reason: <>The point and gradient of the first tangent.</>,
  },
  {
    working: <Katex display tex="y = -2(x-1)+2 = -2x+4" />,
    reason: <>Exact, no rounding needed.</>,
  },
  {
    working: <Katex display tex="\text{at } x=p: \ f(p) = 2.31881\ldots, \quad m = \tfrac12" />,
    reason: <>Using the stored <Katex tex="p=0.655251\ldots" />, not the rounded 0.655.</>,
  },
  {
    working: <Katex display tex="y = \tfrac12(x-p)+f(p) \approx 0.5x+1.9914" />,
    reason: <>The second tangent.</>,
  },
  {
    working: <Cas fn="solve">solve(−2x + 4 = (1/2)(x − p) + f(p), x)</Cas>,
    reason: <>Equating the two tangents.</>,
  },
  {
    working: <Katex display tex="x = 0.80352\ldots \implies y = -2(0.80352\ldots)+4 = 2.39295\ldots" />,
    reason: <>Substitute into a <em>tangent</em>, not into <Katex tex="f" /> — the tangents meet above the curve, so <Katex tex="f(0.80)=2.29" /> is the wrong point.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.80,\ 2.39)}" />,
    reason: <>To two decimal places.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 2(0)e^{1} = 0 \implies \text{the segment starts at the origin}" />,
    reason: <>Which makes the equation a simple <Katex tex="y=mx" />.</>,
  },
  {
    working: <Katex display tex="m = \frac{f(n)-0}{n-0} = \frac{2ne^{1-n^2}}{n}" />,
    reason: <>Rise over run.</>,
  },
  {
    working: <Katex display tex="\boxed{y_1 = 2e^{1-n^2}x}" />,
    reason: <>The <Katex tex="n" /> cancels. A <em>rule</em> in <Katex tex="x" />: dropping the <Katex tex="x" /> leaves only the gradient.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="f(3) = 6e^{1-9} = 6e^{-8}" />,
    reason: <>Small but not zero — the report notes students who assumed <Katex tex="f(3)=0" />.</>,
  },
  {
    working: <Katex display tex="m = \frac{f(3)-f(n)}{3-n} = \frac{2ne^{1-n^2}-6e^{-8}}{n-3}" />,
    reason: <>The same fraction either way up; negating top and bottom just tidies the sign.</>,
  },
  {
    working: <Katex display tex="\boxed{y_2 = \left(\frac{2ne^{1-n^2}-6e^{-8}}{n-3}\right)(x-3)+6e^{-8}}" />,
    reason: <>Point–gradient form through <Katex tex="\bigl(3,f(3)\bigr)" />. Anchoring at <Katex tex="\bigl(n,f(n)\bigr)" /> instead is equally valid.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{on } [0,n]: \ f \text{ lies above the chord } y_1" />,
    reason: <>The curve bulges above its chord there, so that area is <Katex tex="\int_0^n(f-y_1)\,dx" />.</>,
  },
  {
    working: <Katex display tex="\text{on } [n,3]: \ y_2 \text{ lies above } f" />,
    reason: <>Past the peak the curve falls away beneath the chord, so the roles swap: <Katex tex="\int_n^3(y_2-f)\,dx" />.</>,
  },
  {
    working: <Katex display tex="\int_0^n\bigl(f(x)-y_1\bigr)dx = \int_n^3\bigl(y_2-f(x)\bigr)dx" />,
    reason: <>"Equal areas between the function and each line segment".</>,
  },
  {
    working: <Cas fn="solve">solve(∫(f(x) − y1, x, 0, n) = ∫(y2 − f(x), x, n, 3), n) | 1 &lt; n &lt; 3</Cas>,
    reason: <>Define <Katex tex="y_1" /> and <Katex tex="y_2" /> on the CAS first rather than retyping them — the report notes writing out entire expressions often led to transcription errors and misuse of brackets.</>,
  },
  {
    working: <Katex display tex="n = 1.08803\ldots" />,
    reason: <>Inside <Katex tex="1<n<3" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 1.088}" />,
    reason: <>To three decimal places. Treating the second region as a triangle gives 1.087 — it is a trapezium, since <Katex tex="f(3)\ne0" />.</>,
  },
]

export default function MethodsQ4_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (13 marks)</p>
        <p>
          The graph of the function <Katex tex="f(x)=2xe^{\left(1-x^2\right)}" />, where{' '}
          <Katex tex="0\le x\le3" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A curve rising from the origin to a peak just after x = 0.7 then decaying towards the x-axis at x = 3 — from the original 2020 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Tangent Gradient"
        marks={1}
        statement={<>Find the slope of the tangent to <Katex tex="f" /> at <Katex tex="x=1" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Angle"
        marks={1}
        statement={
          <>
            Find the obtuse angle that the tangent to <Katex tex="f" /> at <Katex tex="x=1" />{' '}
            makes with the positive direction of the horizontal axis. Give your answer correct
            to the nearest degree.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the slope of the tangent to <Katex tex="f" /> at a point <Katex tex="x=p" />.
            Give your answer in terms of <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Perpendicular Tangents"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="p" /> for which the tangent to <Katex tex="f" /> at{' '}
            <Katex tex="x=1" /> and the tangent to <Katex tex="f" /> at <Katex tex="x=p" />{' '}
            are perpendicular to each other. Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Intersection Point"
        marks={3}
        statement={
          <>
            Hence, find the coordinates of the point where the tangents to the graph of{' '}
            <Katex tex="f" /> at <Katex tex="x=1" /> and <Katex tex="x=p" /> intersect when
            they are perpendicular. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Two line segments connect the points <Katex tex="\bigl(0,f(0)\bigr)" /> and{' '}
          <Katex tex="\bigl(3,f(3)\bigr)" /> to a single point{' '}
          <Katex tex="Q\bigl(n,f(n)\bigr)" />, where <Katex tex="1<n<3" />, as shown in the
          graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={segmentsSrc}
            alt="The same curve with two straight chords joining the origin to Q(n, f(n)) and Q to the point (3, f(3)) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.i"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            The first line segment connects the point <Katex tex="\bigl(0,f(0)\bigr)" /> and
            the point <Katex tex="Q\bigl(n,f(n)\bigr)" />, where <Katex tex="1<n<3" />.
            <br />
            Find the equation of this line segment in terms of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            The second line segment connects the point <Katex tex="Q\bigl(n,f(n)\bigr)" /> and
            the point <Katex tex="\bigl(3,f(3)\bigr)" />, where <Katex tex="1<n<3" />.
            <br />
            Find the equation of this line segment in terms of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="e.iii"
        topic="Equal Areas"
        marks={3}
        statement={
          <>
            Find the value of <Katex tex="n" />, where <Katex tex="1<n<3" />, if there are
            equal areas between the function <Katex tex="f" /> and each line segment. Give
            your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
