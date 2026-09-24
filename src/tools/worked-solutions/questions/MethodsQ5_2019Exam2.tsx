// 2019 Mathematical Methods — Exam 2, Question 5 (12 marks).
// f(x) = 1-x³ — the tangent at x = a and where it meets the curve again at P and the axis at
// Q (parts a.–c.), the area of the two shaded regions bounded by f, its tangent, and the axis,
// minimised over a (parts d.–e.), the mirror problem for f⁻¹ (part f.), and the acute angle
// between the two curves' tangents at x = 1 (part g.). The question's own diagram is VCAA's,
// cropped directly from the exam paper and shown in the stem; the graph of f alongside f⁻¹ in
// part f. is this site's own explanatory figure (matplotlib) — parts f. and g. were the two
// worst-answered parts of the whole paper at 95% scoring zero, and the reflection picture is
// what makes f. a two-line problem instead of a fresh integration. Question text transcribed from the
// original paper. Cross-checked against the VCAA examination report and itute's independent
// solutions, and independently re-derived (the area rule and every minimisation confirmed
// exactly by computer algebra). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019e2-q5-tangent-diagram.png'
import inverseSrc from './meth-2019e2-q5-inverse.png'

const EXAM_A: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      This question was done reasonably well. An equation was required. Some students
      substituted <Katex tex="x=a" /> into <Katex tex="y=-3a^2x+2a^3+1" />, giving{' '}
      <Katex tex="y=1-a^3" /> as the equation of the tangent. There appeared to be some
      transcription errors: <Katex tex="y=3a^2x+2a^3+1" /> was sometimes seen.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: <>This question was done reasonably well. There appeared to be some transcription errors: <Katex tex="x=\dfrac{1+2a^2}{3a^2}" /> was sometimes seen.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 15, 57],
  average: 1.3,
  comment: (
    <>
      This question was answered well. Most students were able to equate their tangent line
      with <Katex tex="f(x)" />. Some students gave the answer without showing any working.
      Other students unsuccessfully tried to solve <Katex tex="1+2a^3-3a^2x=f(x)" /> by hand.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [39, 31, 8, 22],
  average: 1.2,
  comment: (
    <>
      A common incorrect definite integral was{' '}
      <Katex tex="\displaystyle\int_{-2a}^{\frac{1+2a^3}{3a^2}}\left(1+2a^3-3a^2x-f(x)\right)dx" /> and{' '}
      <Katex tex="\displaystyle\int_{-2a}^{a}\left(1+2a^3-3a^2x-f(x)\right)dx+\int_{a}^{\frac{1+2a^3}{3a^2}}\left(1+2a^3-3a^2x\right)dx" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [53, 30, 17],
  average: 0.7,
  comment: (
    <>
      Many students knew they needed to solve the derivative equal to zero but gave an
      incorrect minimum. Common incorrect answers were <Katex tex="a=-\tfrac12" /> and{' '}
      <Katex tex="a=\tfrac12" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [95, 1, 4],
  average: 0.1,
  comment: <>This question was not answered well. Many students attempted the second method but were not successful.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [95, 5],
  average: 0.1,
  comment: <>This question was not answered well. Many students did not attempt this question. Some students rounded their answer to <Katex tex="18°" />. An exact answer was required.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -3x^2 \implies f'(a) = -3a^2" />,
    reason: <>The gradient of the tangent is the derivative evaluated at the point of contact.</>,
  },
  {
    working: <Katex display tex="\text{Point of contact: } \bigl(a,\ f(a)\bigr) = \bigl(a,\ 1-a^3\bigr)" />,
    reason: <>Already marked on the given diagram.</>,
  },
  {
    working: <Katex display tex="y-(1-a^3) = -3a^2(x-a)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" />.</>,
  },
  {
    working: <Katex display tex="y = -3a^2x+3a^3+1-a^3" />,
    reason: <>Expand the bracket: <Katex tex="-3a^2\times(-a)=+3a^3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -3a^2x+2a^3+1}" />,
    reason: <>Collect the <Katex tex="a^3" /> terms. Write it as an equation — the report says an equation was required, and notes some students substituted <Katex tex="x=a" />, giving <Katex tex="y=1-a^3" /> as the equation of the tangent.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{At } Q:\ y=0 \implies -3a^2x+2a^3+1=0" />,
    reason: <><Katex tex="Q" /> is where the tangent crosses the horizontal axis, and every point on that axis has <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="3a^2x = 2a^3+1" />,
    reason: <>Moving the <Katex tex="x" /> term across.</>,
  },
  {
    working: <Katex display tex="\boxed{x_Q = \dfrac{2a^3+1}{3a^2}}" />,
    reason: <>Dividing by <Katex tex="3a^2" /> is safe because <Katex tex="0<a<1" />, so <Katex tex="a\ne0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="-3a^2x+2a^3+1 = 1-x^3" />,
    reason: <><Katex tex="P" /> is where the tangent line meets the curve again, so set the two rules equal.</>,
  },
  {
    working: <Katex display tex="x^3-3a^2x+2a^3=0" />,
    reason: <>The <Katex tex="+1" /> on each side cancels. Everything collected on one side gives a cubic in <Katex tex="x" />, with <Katex tex="a" /> along for the ride as a constant.</>,
  },
  {
    working: <Katex display tex="(x-a)^2(x+2a)=0" />,
    reason: <>You already know <Katex tex="x=a" /> is a solution — and because the line is a <em>tangent</em> there, it is a <b>repeated</b> root, so <Katex tex="(x-a)^2" /> must divide the cubic. That leaves a linear factor, and matching the constant term <Katex tex="a^2\times(2a)=2a^3" /> ✓ identifies it as <Katex tex="(x+2a)" />.</>,
  },
  {
    working: <Katex display tex="x=a \text{ (twice, the point of contact)} \quad\text{or}\quad x=-2a" />,
    reason: <>Null factor law. Technology gives the same: solving <Katex tex="1+2a^3-3a^2x=1-x^3" /> for <Katex tex="x" /> returns <Katex tex="x=a" /> and <Katex tex="x=-2a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x_P = -2a}" />,
    reason: <>Negative, since <Katex tex="a>0" /> — which matches the diagram, where <Katex tex="P" /> sits to the left of the <Katex tex="y" />-axis.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{tangent}-f = \left(2a^3+1-3a^2x\right)-\left(1-x^3\right) = (x-a)^2(x+2a)\ \ge 0 \ \text{ for } x\ge-2a" />,
    reason: <>Part c.'s factorisation, reused. A squared factor can't be negative and <Katex tex="x+2a>0" /> to the right of <Katex tex="P" />, so the tangent lies <em>above</em> the curve all the way from <Katex tex="P" /> onwards — touching it only at <Katex tex="x=a" />. That's why the two shaded pieces join up into one continuous strip rather than swapping over at <Katex tex="x=a" />.</>,
  },
  {
    working: <Katex display tex="A = \underbrace{\int_{-2a}^{1}\Bigl[\left(2a^3+1-3a^2x\right)-\left(1-x^3\right)\Bigr]dx}_{\text{lower boundary is the curve}} \;+\; \underbrace{\int_{1}^{x_Q}\left(2a^3+1-3a^2x\right)dx}_{\text{lower boundary is the axis}}" />,
    reason: <>Trace the boundary of the shaded area in the diagram: it starts at <Katex tex="P" />, runs along the tangent to <Katex tex="Q" />, comes back along the <Katex tex="x" />-axis to where the curve cuts it at <Katex tex="x=1" />, then follows the curve back up to <Katex tex="P" />. So the split happens at <Katex tex="x=1" />, where the curve crosses the axis. Left of <Katex tex="1" /> the region's floor is the curve; right of <Katex tex="1" /> the curve has dropped below the axis, so the floor becomes the axis itself.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_{-2a}^{1}\left(x^3-3a^2x+2a^3\right)dx = \left[\dfrac{x^4}{4}-\dfrac{3a^2x^2}{2}+2a^3x\right]_{-2a}^{1}" />
        <Katex display tex="= \left(\dfrac14-\dfrac{3a^2}{2}+2a^3\right)-\left(-6a^4\right) = 6a^4+2a^3-\dfrac{3a^2}{2}+\dfrac14" />
      </>
    ),
    reason: <>At <Katex tex="x=-2a" />: <Katex tex="4a^4-6a^4-4a^4=-6a^4" />.</>,
  },
  {
    working: <Katex display tex="\int_{1}^{x_Q}\left(2a^3+1-3a^2x\right)dx = \dfrac{\left(2a^3-3a^2+1\right)^2}{6a^2}" />,
    reason: <>This piece is just a triangle — base <Katex tex="x_Q-1" />, height the tangent's value at <Katex tex="x=1" />, which is <Katex tex="2a^3-3a^2+1" /> — so <Katex tex="\tfrac12\times\text{base}\times\text{height}" /> gives the same thing without integrating.</>,
  },
  {
    working: <Katex display tex="\boxed{A(a) = \dfrac{80a^6+8a^3-9a^2+2}{12a^2}}" />,
    reason: <>Adding the two pieces over the common denominator <Katex tex="12a^2" />.</>,
  },
  {
    working: <Katex display tex="= \dfrac{20a^4}{3}+\dfrac{2a}{3}-\dfrac34+\dfrac{1}{6a^2}" />,
    reason: <>The same rule, split term by term. This version is worth writing down: part e. needs <Katex tex="A'(a)" />, and differentiating these four simple terms is far easier than quotient-ruling the fraction.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="A(a) = \dfrac{20a^4}{3}+\dfrac{2a}{3}-\dfrac34+\dfrac{1}{6a^2} = \dfrac{20a^4}{3}+\dfrac{2a}{3}-\dfrac34+\dfrac{a^{-2}}{6}" />,
    reason: <>Rewrite the last term as a power of <Katex tex="a" /> so the power rule applies to it.</>,
  },
  {
    working: <Katex display tex="A'(a) = \dfrac{80a^3}{3}+\dfrac23-\dfrac{1}{3a^3}" />,
    reason: <><Katex tex="\tfrac{d}{da}\left(\tfrac{a^{-2}}{6}\right)=\tfrac{-2a^{-3}}{6}=-\tfrac{1}{3a^3}" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{80a^3}{3}+\dfrac23-\dfrac{1}{3a^3}=0 \ \ \bigl|\times 3a^3\bigr. \implies 80a^6+2a^3-1=0" />,
    reason: <>Multiplying through by <Katex tex="3a^3" /> clears both fractions at once.</>,
  },
  {
    working: <Katex display tex="\text{Let } u=a^3: \quad 80u^2+2u-1=0 \implies (10u-1)(8u+1)=0" />,
    reason: <>It's a quadratic in disguise — the powers <Katex tex="a^6" /> and <Katex tex="a^3" /> are the square and the first power of <Katex tex="u=a^3" />.</>,
  },
  {
    working: <Katex display tex="u=\dfrac{1}{10} \quad\text{or}\quad u=-\dfrac18" />,
    reason: <>Null factor law.</>,
  },
  {
    working: <Katex display tex="a^3=-\dfrac18 \implies a=-\dfrac12 \ \text{ — rejected, since } 0<a<1" />,
    reason: <>The report lists <Katex tex="a=-\tfrac12" /> and <Katex tex="a=\tfrac12" /> as common incorrect answers. <Katex tex="a=-\tfrac12" /> does solve <Katex tex="A'(a)=0" />, but it is outside <Katex tex="0<a<1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a^3=\dfrac{1}{10} \implies a=\dfrac{1}{\sqrt[3]{10}} = \dfrac{\sqrt[3]{100}}{10} \approx 0.4642}" />,
    reason: <>Exact form required. Checking it really is a minimum: <Katex tex="A" /> blows up as <Katex tex="a\to0^+" /> (the <Katex tex="\tfrac{1}{6a^2}" /> term) and grows again as <Katex tex="a\to1" />, so the single stationary point in between must be the minimum.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={inverseSrc} alt="Graphs of f and its inverse reflected in the dashed line y = x, with the point (a, 1−a³) on f and its mirror image (1−a³, a) on the inverse" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>The graph of <Katex tex="f^{-1}" /> is the graph of <Katex tex="f" /> reflected in the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="\text{Reflection in } y=x:\quad (p,\ q) \ \longmapsto \ (q,\ p)" />,
    reason: <>It swaps the two coordinates of every point — and it maps the <Katex tex="x" />-axis onto the <Katex tex="y" />-axis.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{graph of } f \ \longmapsto \ \text{graph of } f^{-1}" />
        <Katex display tex="\text{tangent at } x=a \ \longmapsto \ \text{tangent at } x=1-a^3" />
        <Katex display tex="x\text{-axis} \ \longmapsto \ y\text{-axis}" />
      </>
    ),
    reason: <>Every single feature of part d.'s picture has a mirror image in this part's picture. So the new regions are just the old regions flipped over — same shapes, same areas.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{area}(b) = \text{area}(a)" />
        <Katex display tex="\text{where } b=1-a^3" />
      </>
    ),
    reason: <>Reflection doesn't stretch or squash anything, so it preserves area exactly. That means the two optimisation problems are the <em>same</em> problem — whatever <Katex tex="a" /> minimised part e.'s area, its mirror partner <Katex tex="b=1-a^3" /> minimises this one. No new integration is needed.</>,
  },
  {
    working: <Katex display tex="b = 1-a^3 \quad\text{with}\quad a^3=\dfrac{1}{10} \ \text{ (part e)}" />,
    reason: <>The point <Katex tex="\bigl(a,\ 1-a^3\bigr)" /> reflects to <Katex tex="\bigl(1-a^3,\ a\bigr)" />, so the <Katex tex="x" />-coordinate of the new point of contact — which is what <Katex tex="b" /> is — equals <Katex tex="1-a^3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 1-\dfrac{1}{10} = \dfrac{9}{10}}" />,
    reason: <>Notice how little work this needed once the symmetry was spotted. The report's second method sets up the area directly as an integral of the tangent minus <Katex tex="f^{-1}(x)" />, then solves <Katex tex="A'(b)=0" />; it notes many students attempted that method but were not successful.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Tangent to } f \text{ at } x=1: \quad f'(1) = -3(1)^2 = -3" />,
    reason: <>Gradient <Katex tex="-3" />, so this tangent falls steeply.</>,
  },
  {
    working: <Katex display tex="f(0)=1 \implies f^{-1}(1)=0" />,
    reason: <>To work on <Katex tex="f^{-1}" /> at <Katex tex="x=1" />, first find the matching point on <Katex tex="f" />: the input <Katex tex="1" /> for <Katex tex="f^{-1}" /> is an <em>output</em> of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="f'(0) = -3(0)^2 = 0 \implies \text{the tangent to } f \text{ at } x=0 \text{ is horizontal}" />,
    reason: <>The matching point on <Katex tex="f" /> is <Katex tex="(0,1)" />, and its tangent there is flat.</>,
  },
  {
    working: <Katex display tex="\implies \text{the tangent to } f^{-1} \text{ at } x=1 \text{ is vertical}" />,
    reason: <>Reflecting a horizontal line in <Katex tex="y=x" /> produces a vertical one. Equivalently, the inverse-function rule <Katex tex="\left(f^{-1}\right)'(1)=\tfrac{1}{f'(0)}" /> divides by zero — undefined gradient, which is what a vertical line has.</>,
  },
  {
    working: <Katex display tex="\tan\theta = 3 \implies \theta = \tan^{-1}(3) \ \text{ (angle the } f \text{ tangent makes with the horizontal)}" />,
    reason: <>A line of gradient <Katex tex="m" /> makes an angle <Katex tex="\tan^{-1}|m|" /> with the horizontal; the sign only says which way it leans.</>,
  },
  {
    working: <Katex display tex="\text{Required angle} = 90^\circ-\tan^{-1}(3) = \tan^{-1}\!\left(\dfrac13\right)" />,
    reason: <>The second tangent is vertical, i.e. <Katex tex="90^\circ" /> from the horizontal, so the angle between them is what's left over. The two arctans are complementary because <Katex tex="\tan" /> of one is the reciprocal of <Katex tex="\tan" /> of the other.</>,
  },
  {
    working: <Katex display tex="\boxed{\tan^{-1}\!\left(\dfrac13\right) \approx 18.43^\circ}" />,
    reason: <>Exact form — the report says an exact answer was required, and notes some students rounded to <Katex tex="18^\circ" />. In radians this is <Katex tex="\tfrac{\pi}{2}-\tan^{-1}(3)=\tan^{-1}\!\left(\tfrac13\right)" />, the report's form.</>,
  },
]

export default function MethodsQ5_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (12 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=1-x^3" />. The tangent to the graph of{' '}
          <Katex tex="f" /> at <Katex tex="x=a" />, where <Katex tex="0<a<1" />, intersects the
          graph of <Katex tex="f" /> again at <Katex tex="P" /> and intersects the horizontal
          axis at <Katex tex="Q" />. The shaded regions shown in the diagram below are bounded
          by the graph of <Katex tex="f" />, its tangent at <Katex tex="x=a" /> and the
          horizontal axis.
        </p>
        <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={diagramSrc} alt="Graph of y = f(x) = 1 − x³ with its tangent at (a, 1 − a³), meeting the curve again at P and the x-axis at Q, and the two shaded regions bounded by the curve, the tangent and the x-axis, from the original 2019 VCAA exam paper" className="w-full max-w-[440px]" />
        </div>
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            Everything here is written in terms of the unknown <Katex tex="a" />, which is
            unusual but not harder — treat <Katex tex="a" /> as a fixed number you simply don't
            know yet, and do the ordinary algebra. Parts a.–c. build the picture, d.–e. turn it
            into an optimisation, and f.–g. exploit the fact that an inverse function is
            just a reflection.
          </p>
        </Background>
      </div>

      <PartCard letter="a" topic="Tangent Line" marks={1} statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=a" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Intersections" marks={1} statement={<>Find the <Katex tex="x" />-coordinate of <Katex tex="Q" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Intersections" marks={2} statement={<>Find the <Katex tex="x" />-coordinate of <Katex tex="P" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Key idea: when a <b>tangent</b> meets a curve, the corresponding solution is a{' '}
            <b>repeated root</b> — the line doesn't cross the curve there, it grazes it, which
            algebraically shows up as a factor appearing twice. So the cubic you get here already
            has <Katex tex="(x-a)^2" /> hiding inside it, and only one unknown factor is left to
            find.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="A" /> be the function that determines the total area of the shaded
          regions.
        </p>
      </div>

      <PartCard letter="d" topic="Area Function" marks={3} statement={<>Find the rule of <Katex tex="A" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            The shaded area is bounded by <em>three</em> different things — the curve, the tangent
            and the axis — so no single integral can cover it. The trick is to ask, at each{' '}
            <Katex tex="x" />, "what is the ceiling here, and what is the floor?" The ceiling is
            the tangent throughout. The floor changes at <Katex tex="x=1" />, where the curve
            drops below the axis: before that the floor is the curve, after it the floor is the
            axis. One integral for each stretch.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Optimisation" marks={2} statement={<>Find the value of <Katex tex="a" /> for which <Katex tex="A" /> is a minimum.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the regions bounded by the graph of <Katex tex="f^{-1}" />, the tangent to
          the graph of <Katex tex="f^{-1}" /> at <Katex tex="x=b" />, where{' '}
          <Katex tex="0<b<1" />, and the vertical axis.
        </p>
      </div>

      <PartCard letter="f" topic="Optimisation" marks={2} statement={<>Find the value of <Katex tex="b" /> for which the total area of these regions is a minimum.</>} examinerReport={EXAM_F}>
        <Background>
          <p>
            Read the new set-up next to the old one, item by item: <Katex tex="f" /> becomes{' '}
            <Katex tex="f^{-1}" />, the tangent becomes the tangent to <Katex tex="f^{-1}" />, and
            the <Katex tex="x" />-axis becomes the <Katex tex="y" />-axis. Those are exactly the
            three swaps that a reflection in <Katex tex="y=x" /> performs — so this is part e.'s
            problem seen in a mirror, and it can be answered without integrating anything.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" topic="Angle Between Tangents" marks={1} statement={<>Find the value of the acute angle between the tangent to the graph of <Katex tex="f" /> and the tangent to the graph of <Katex tex="f^{-1}" /> at <Katex tex="x=1" />.</>} examinerReport={EXAM_G}>
        <Background>
          <p>
            To turn gradients into angles, use <Katex tex="\tan\theta=m" />: a line of gradient{' '}
            <Katex tex="m" /> makes an angle <Katex tex="\theta=\tan^{-1}(m)" /> with the positive{' '}
            <Katex tex="x" />-axis. The angle <em>between</em> two lines is then the difference of
            their angles — and if that comes out obtuse, take its supplement to get the acute one.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
