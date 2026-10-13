// 2015 Specialist Mathematics — Exam 1, Question 9 (6 marks). Implicit differentiation of an
// ellipse, two tangents, and the acute angle between them. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactive (Detailed only): part c (16% full marks) — the two tangents slid to the origin, showing
// the angle between them as the difference of their inclinations. Parts a and b do not qualify.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const AngleWidget = lazyWidget(() => import('../interactives/spec-2015e1-q9c-angle'))

const EXAM_A: SAExaminerStats = {
  marks: [14, 16, 70],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Most students correctly used the product and chain
      rules. A number of sign errors appeared on the left-hand scale, while some left the
      right-hand side as 9 after differentiating the left-hand scale. Algebraic
      simplification errors were common.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 20, 62],
  average: 1.5,
  comment: (
    <>
      This question was answered well. The most common errors were finding only one equation
      and arithmetic errors in converting one or both equations to the required form.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 6, 16],
  average: 0.4,
  comment: (
    <>
      Most students had little idea of how to proceed with this question. Students were
      expected to apply <Katex tex="\tan(A-B)" /> or use a vector method, but other methods
      were possible. Some correctly applied <Katex tex="\tan(A-B)" /> but made simplification
      errors. There were also some poor attempts to use a vector method. In attempting to
      convert to vectors, sometimes equations such as <Katex tex="y=mx+c" /> became{' '}
      <Katex tex="m\underset{\sim}{i}+c\underset{\sim}{j}" />. Some found the intersection point of the tangents but were unable to progress
      from there. A small number attempted to use the cosine rule, with a few of these being
      successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-xy+\tfrac32y^2 = 9" />,
    reason: <>The curve isn&apos;t in the form <Katex tex="y=f(x)" />, so differentiate both sides with respect to <Katex tex="x" /> implicitly, treating <Katex tex="y" /> as a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}(xy) = y + x\frac{dy}{dx}" />,
    reason: <><Katex tex="xy" /> is a product of two functions of <Katex tex="x" />, so use the product rule: <Katex tex="\tfrac{d}{dx}(x)=1" /> and <Katex tex="\tfrac{d}{dx}(y)=\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\!\left(\tfrac32y^2\right) = 3y\frac{dy}{dx}" />,
    reason: <>Chain rule: differentiate <Katex tex="y^2" /> with respect to <Katex tex="y" />, then multiply by <Katex tex="\tfrac{dy}{dx}" />.</>,
  },
  {
    working: <Katex display tex="2x - y - x\frac{dy}{dx} + 3y\frac{dy}{dx} = 0" />,
    reason: <>Assemble the three terms. The minus sign in front of <Katex tex="xy" /> applies to both product-rule terms; the constant 9 differentiates to 0.</>,
    more: <>These are exactly the two slips the report describes: sign errors on the left-hand side (writing <Katex tex="-y+x\tfrac{dy}{dx}" /> instead of <Katex tex="-y-x\tfrac{dy}{dx}" />), and leaving the right-hand side as 9 after differentiating the left. (The report&apos;s &ldquo;left-hand scale&rdquo; means left-hand side.)</>,
  },
  {
    working: <Katex display tex="(3y-x)\frac{dy}{dx} = y-2x" />,
    reason: <>Keep the <Katex tex="\tfrac{dy}{dx}" /> terms on the left, move <Katex tex="2x-y" /> to the right, and factorise.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{y-2x}{3y-x}}" />,
    reason: <>Divide by <Katex tex="3y-x" />. Equivalently <Katex tex="\tfrac{2x-y}{x-3y}" /> (numerator and denominator multiplied by <Katex tex="-1" />).</>,
    more: <>The report notes algebraic simplification errors were common. A quick check catches most of them: at <Katex tex="(3,0)" />, which is on the curve, this gives <Katex tex="\tfrac{-6}{-3}=2" />, the gradient used in part b.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(3,0):\quad \frac{dy}{dx} = \frac{0-6}{0-3} = 2" />,
    reason: <>Substitute <Katex tex="x=3" />, <Katex tex="y=0" /> into the part a gradient. The point is on the curve: <Katex tex="9-0+0=9" /> ✓.</>,
  },
  {
    working: <Katex display tex="y-0 = 2(x-3)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with <Katex tex="m=2" /> through <Katex tex="(3,0)" />.</>,
  },
  {
    working: <Katex display tex="y = 2x-6" />,
    reason: <>Expanded into the required form <Katex tex="y=ax+b" />.</>,
  },
  {
    working: <Katex display tex="\left(0,\sqrt6\right):\quad \tfrac32\bigl(\sqrt6\bigr)^2 = \tfrac32\times6 = 9 \ \checkmark" />,
    reason: <>The second point is on the curve too (with <Katex tex="x=0" />, only the <Katex tex="\tfrac32y^2" /> term survives).</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{\sqrt6-0}{3\sqrt6-0} = \frac13" />,
    reason: <>Substitute <Katex tex="x=0" />, <Katex tex="y=\sqrt6" /> into the part a gradient; the surds cancel.</>,
  },
  {
    working: <Katex display tex="y-\sqrt6 = \tfrac13(x-0)" />,
    reason: <>Point–gradient form again, with <Katex tex="m=\tfrac13" /> through <Katex tex="\left(0,\sqrt6\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2x-6 \quad\text{and}\quad y = \tfrac13x+\sqrt6}" />,
    reason: <>Both tangents, each in the form <Katex tex="y=ax+b" />. The second point is the <Katex tex="y" />-intercept, so <Katex tex="b=\sqrt6" /> directly.</>,
    more: <>The report says the most common errors were finding only one equation (the question asks for two, with <b>and</b> in bold) and arithmetic errors converting to <Katex tex="y=ax+b" />. Check each answer by substituting its point: <Katex tex="2(3)-6=0" /> ✓ and <Katex tex="\tfrac13(0)+\sqrt6=\sqrt6" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(A) = 2,\qquad \tan(B) = \tfrac13" />,
    reason: <>Let <Katex tex="A" /> and <Katex tex="B" /> be the angles the tangents make with the positive <Katex tex="x" />-axis; each angle&apos;s tangent is the line&apos;s gradient (from part b).</>,
    more: <>A line of gradient <Katex tex="m" /> rises <Katex tex="m" /> for every 1 across, so the angle <Katex tex="\alpha" /> it makes with the positive <Katex tex="x" />-axis has <Katex tex="\tan(\alpha)=\tfrac{m}{1}=m" />. Only the gradients matter here, not where the lines sit: sliding a line sideways or up doesn&apos;t turn it. The report notes some students found the intersection point of the tangents but could not progress from there: the intersection is never needed.</>,
  },
  {
    working: <Katex display tex="\tan(A-B) = \frac{\tan(A)-\tan(B)}{1+\tan(A)\tan(B)}" />,
    reason: <>Both angles are measured from the <Katex tex="x" />-axis, so the angle between the lines is <Katex tex="A-B" />. The <Katex tex="\tan(x-y)" /> formula (formula sheet) gives it from the gradients.</>,
    more: <>Why <Katex tex="A-B" />: the two tangents and the <Katex tex="x" />-axis form a triangle. Its exterior angle <Katex tex="A" /> equals the sum of the two opposite interior angles, <Katex tex="B" /> and the angle between the lines, so that angle is <Katex tex="A-B" />. Neither <Katex tex="A=\arctan(2)" /> nor <Katex tex="B=\arctan\!\left(\tfrac13\right)" /> is an exact value you know (they are about <Katex tex="63.4^\circ" /> and <Katex tex="18.4^\circ" />), so on a technology-free paper you can&apos;t find them separately. Their difference, though, turns out to be exact, and <Katex tex="\tan(A-B)" /> finds it without ever evaluating an inverse tangent.</>,
  },
  {
    working: <Katex display tex="= \frac{2-\tfrac13}{1+2\times\tfrac13} = \frac{\tfrac53}{\tfrac53}" />,
    reason: <>Substitute <Katex tex="\tan(A)=2" /> and <Katex tex="\tan(B)=\tfrac13" />; numerator and denominator are both <Katex tex="\tfrac53" />.</>,
    more: <>The report notes some students applied <Katex tex="\tan(A-B)" /> correctly but made simplification errors. Simplify the top and bottom separately before dividing: <Katex tex="2-\tfrac13=\tfrac53" /> and <Katex tex="1+\tfrac23=\tfrac53" />.</>,
  },
  {
    working: <Katex display tex="\tan(A-B) = 1" />,
    reason: <>Positive, and <Katex tex="A>B" /> (as <Katex tex="2>\tfrac13" />), so <Katex tex="A-B" /> is the acute angle. In general, the acute angle is the one whose tangent is <Katex tex="|\tan(A-B)|" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A-B = \frac\pi4}" />,
    reason: <>The acute angle with tangent 1 is <Katex tex="\tfrac\pi4" />, which is in the form <Katex tex="k\pi" /> with <Katex tex="k=\tfrac14" />.</>,
    more: (
      <>
        <p>
          The report&apos;s other expected method uses vectors. A line of gradient <Katex tex="m" /> has
          direction vector <Katex tex="\underset{\sim}{i}+m\underset{\sim}{j}" /> (1 across, <Katex tex="m" /> up), so
          the tangents have directions <Katex tex="\underset{\sim}{i}+2\underset{\sim}{j}" /> and{' '}
          <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> (3 times <Katex tex="\underset{\sim}{i}+\tfrac13\underset{\sim}{j}" />,
          to clear the fraction). Then
        </p>
        <Katex display tex="\cos(\theta)=\frac{(\underset{\sim}{i}+2\underset{\sim}{j})\cdot(3\underset{\sim}{i}+\underset{\sim}{j})}{\sqrt5\,\sqrt{10}}=\frac{5}{\sqrt{50}}=\frac1{\sqrt2}" />
        <p>
          so <Katex tex="\theta=\tfrac\pi4" /> ✓. The report notes that some students turned{' '}
          <Katex tex="y=mx+c" /> into <Katex tex="m\underset{\sim}{i}+c\underset{\sim}{j}" />. That vector has nothing to
          do with the line&apos;s direction: <Katex tex="c" /> only shifts the line, and the run-and-rise is{' '}
          <Katex tex="1" /> and <Katex tex="m" />, not <Katex tex="m" /> and <Katex tex="c" />. (If the dot product
          had been negative, <Katex tex="\theta" /> would be obtuse and the acute angle <Katex tex="\pi-\theta" />.) The
          report also mentions the cosine rule, which a few used successfully; it is the same calculation. The
          triangle with vertices <Katex tex="(0,0)" />, <Katex tex="(1,2)" /> and <Katex tex="(3,1)" /> has sides{' '}
          <Katex tex="\sqrt5" />, <Katex tex="\sqrt{10}" /> and <Katex tex="\sqrt5" />, so the angle at the origin has{' '}
          <Katex tex="\cos(\theta)=\tfrac{5+10-5}{2\sqrt5\sqrt{10}}=\tfrac1{\sqrt2}" />.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ9_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          Consider the curve represented by <Katex tex="x^2-xy+\tfrac32y^2=9" />.
        </p>

      </div>

      <PartCard
        letter="a"
        topic="Implicit Differentiation"
        marks={2}
        statement={<>Find the gradient of the curve at any point <Katex tex="(x,y)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Lines"
        marks={2}
        statement={
          <>
            Find the equation of the tangent to the curve at the point <Katex tex="(3,0)" />{' '}
            <b>and</b> find the equation of the tangent to the curve at the point{' '}
            <Katex tex="\left(0,\sqrt6\right)" />. Write each equation in the form{' '}
            <Katex tex="y=ax+b" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Angle Between Tangents"
        marks={2}
        statement={
          <>
            Find the acute angle between the tangent to the curve at the point{' '}
            <Katex tex="(3,0)" /> and the tangent to the curve at the point{' '}
            <Katex tex="\left(0,\sqrt6\right)" />. Give your answer in the form{' '}
            <Katex tex="k\pi" />, where <Katex tex="k" /> is a real constant.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            Only 16% of students scored full marks here, and the report notes most students had little idea of how
            to proceed. The plan: turn each gradient into an angle with the <Katex tex="x" />-axis, and subtract.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Only the gradients matter: slide both tangents to the origin">
          <AngleWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
