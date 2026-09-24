// 2025 Mathematical Methods — Exam 1 Question 9 (7 marks). A truncus meeting a parabola:
// a difference of squares turns a quartic into two quadratics, and a turning point decides
// how many solutions survive. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [47, 25, 10, 19],
  average: 1.0,
  comment: (
    <>
      This question was not answered well. Many students expanded the expression and formed a
      quartic equation but did not proceed further. Students who took the more efficient approach
      of taking square roots to form two quadratic equations generally reached the correct
      solutions. Many students did not consider <Katex tex="\pm3" /> in their solution process
      and thus simplified the solution process inappropriately. Some students used incorrect null
      factor law interpretations.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [43, 34, 22],
  average: 0.8,
  comment: (
    <>
      There were many ways the answer could be expressed in this question and students were not
      required to give their answer in a particular form. Generally, students who used symmetry
      were able to find the correct <Katex tex="x" />-coordinate. Many students made mistakes when
      combining fractions to find the <Katex tex="y" />-coordinate. Common errors included writing
      the coordinates as{' '}
      <Katex tex="\left(\dfrac{w+1}{2},-\dfrac{\left(w-1^2\right)}{2}\right)" />,{' '}
      <Katex tex="\left(\dfrac{1+w}{2},\dfrac{-1+2w-w^2}{2}\right)" /> or{' '}
      <Katex tex="\left(\dfrac{1+w}{2},-\dfrac{w^2-1}{4}\right)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [94, 3, 4],
  average: 0.1,
  comment: (
    <>
      There were many ways this question could be approached, however very few students made
      significant progress. Those students who approached the solution by forming{' '}
      <Katex tex="(x-w)(x-1)=\pm w" /> and then using a discriminant approach (method 3 as
      described above), usually progressed further towards a complete solution. Some students were
      able to obtain an expanded quartic equation but then did not proceed any further. Few
      students used a <em>hence</em> approach and thus did not identify a connection between the
      turning point and the number of solutions. Those students who were able to demonstrate clear
      mathematical communication skills (listing all the possible solutions, compare them, discuss
      the nature of turning points or discuss the impact of the discriminant on the number of
      solutions) were the most successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="w=-3: \quad \frac{9}{(x-1)^2} = (x+3)^2" />,
    reason: <><Katex tex="w^2=9" /> and <Katex tex="(x-w)^2=(x+3)^2" />.</>,
  },
  {
    working: <Katex display tex="9 = (x+3)^2(x-1)^2 = \bigl[(x+3)(x-1)\bigr]^2" />,
    reason: <>Multiplying by <Katex tex="(x-1)^2" />, which is legitimate because <Katex tex="x\ne1" />. Recognising the perfect square here is what avoids expanding a quartic.</>,
  },
  {
    working: <Katex display tex="(x+3)(x-1) = \pm3" />,
    reason: <>Taking square roots — two quadratics instead of one quartic. The report notes many students did not consider <Katex tex="\pm3" />.</>,
  },
  {
    working: <Katex display tex="x^2+2x-3 = 3 \implies x^2+2x-6 = 0 \implies x = -1\pm\sqrt7" />,
    reason: <>By the quadratic formula: <Katex tex="\tfrac{-2\pm\sqrt{4+24}}{2}" />.</>,
  },
  {
    working: <Katex display tex="x^2+2x-3 = -3 \implies x(x+2) = 0 \implies x = 0 \ \text{ or } \ x = -2" />,
    reason: <>The second case factorises immediately.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2,\ 0,\ -1-\sqrt7,\ -1+\sqrt7}" />,
    reason: <>Four solutions, and none equals 1, so all four are in the domain.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="y = (x-1)(x-w) \ \text{ has zeros at } x=1 \text{ and } x=w" />,
    reason: <>An upward parabola, so its minimum sits midway between them.</>,
  },
  {
    working: <Katex display tex="x = \frac{1+w}{2}" />,
    reason: <>By symmetry. Differentiating <Katex tex="x^2-(1+w)x+w" /> gives the same thing.</>,
  },
  {
    working: <Katex display tex="y = \left(\frac{1+w}{2}-1\right)\left(\frac{1+w}{2}-w\right) = \left(\frac{w-1}{2}\right)\left(\frac{1-w}{2}\right)" />,
    reason: <>The two brackets are negatives of each other — spotting that avoids the fraction arithmetic where the report notes many students made mistakes.</>,
  },
  {
    working: <Katex display tex="= -\frac{(w-1)^2}{4}" />,
    reason: <>A product of the form <Katex tex="t\times(-t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{1+w}{2},\ -\frac{(w-1)^2}{4}\right)}" />,
    reason: <>Any equivalent form was accepted. Note the minimum is always <Katex tex="\le0" />, and equals zero only when <Katex tex="w=1" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{w^2}{(x-1)^2} = (x-w)^2 \implies \bigl[(x-1)(x-w)\bigr]^2 = w^2" />,
    reason: <>The same manipulation as part a., now with a general w.</>,
  },
  {
    working: <Katex display tex="P(x) = w \qquad\text{or}\qquad P(x) = -w, \quad \text{where } P(x) = (x-1)(x-w)" />,
    reason: <>This is the "hence": <Katex tex="P" /> is exactly the parabola whose minimum part b.i. found.</>,
  },
  {
    working: <Katex display tex="w>0 > -\frac{(w-1)^2}{4} \implies P(x) = w \ \text{ always has two solutions}" />,
    reason: <>A horizontal line strictly above the minimum of an upward parabola cuts it twice.</>,
  },
  {
    working: <Katex display tex="\text{three solutions} \iff P(x) = -w \text{ has exactly one} \iff -w = -\frac{(w-1)^2}{4}" />,
    reason: <>Exactly one solution means the line <Katex tex="y=-w" /> is tangent at the vertex.</>,
  },
  {
    working: <Katex display tex="4w = (w-1)^2 \implies w^2-6w+1 = 0" />,
    reason: <>Expanding and collecting.</>,
  },
  {
    working: <Katex display tex="w = \frac{6\pm\sqrt{36-4}}{2} = 3\pm2\sqrt2" />,
    reason: <><Katex tex="\sqrt{32}=4\sqrt2" />. Both roots are positive (<Katex tex="\approx0.17" /> and <Katex tex="\approx5.83" />), so both qualify.</>,
  },
  {
    working: <Katex display tex="\boxed{w = 3-2\sqrt2 \ \text{ or } \ w = 3+2\sqrt2}" />,
    reason: <>No solution is ever <Katex tex="x=1" />, since <Katex tex="P(1)=0\ne\pm w" /> for <Katex tex="w>0" /> — so all three survive the domain restriction.</>,
  },
]

export default function MethodsQ9_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (7 marks)</p>
        <p>Consider the functions</p>
        <div className="py-1">
          <Katex display tex="f:R\setminus\{1\}\to R,\ f(x)=\frac{w^2}{(x-1)^2}" />
          <p className="my-1">and</p>
          <Katex display tex="g:R\to R,\ g(x)=(x-w)^2" />
        </div>
        <p>
          where <Katex tex="w\in R" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            One observation carries the whole question. Clearing the denominator turns{' '}
            <Katex tex="f(x)=g(x)" /> into{' '}
            <Katex tex="\bigl[(x-1)(x-w)\bigr]^2 = w^2" />, a difference of squares. Taking
            square roots replaces a quartic with the pair of quadratics{' '}
            <Katex tex="P(x)=\pm w" />, where <Katex tex="P(x)=(x-1)(x-w)" />.
          </p>
          <p>
            That is also why part b.i. is asked: <Katex tex="P" /> is exactly the parabola
            whose minimum you find there. Counting solutions of{' '}
            <Katex tex="f(x)=g(x)" /> becomes counting where two horizontal lines cut a
            parabola, and three solutions means one of those lines is tangent at the vertex.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Intersections"
        marks={3}
        statement={
          <>
            If <Katex tex="w=-3" />, find the four solutions to <Katex tex="f(x)=g(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Consider the case where <Katex tex="w>0" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Minimum Point"
        marks={2}
        statement={
          <>
            Find, in terms of <Katex tex="w" />, the coordinates of the minimum point of the graph
            of <Katex tex="y=(x-1)(x-w)" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Number of Solutions"
        marks={2}
        statement={
          <>
            Hence, or otherwise, find the positive values of <Katex tex="w" /> for which{' '}
            <Katex tex="f(x)=g(x)" /> has exactly three solutions.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
