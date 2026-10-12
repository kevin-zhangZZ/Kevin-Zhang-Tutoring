// 2025 Mathematical Methods — Exam 1 Question 9 (7 marks). A truncus meeting a parabola:
// a difference of squares turns a quartic into two quadratics, and a turning point decides
// how many solutions survive. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    reason: <>Multiply both sides by <Katex tex="(x-1)^2" /> (allowed, as <Katex tex="x\ne1" />), then use <Katex tex="a^2b^2=(ab)^2" />.</>,
    more: <>Expanding does work —{' '}
      <Katex tex="x^4+4x^3-2x^2-12x=0" />, which factorises to{' '}
      <Katex tex="x(x+2)(x^2+2x-6)=0" /> — but the report notes many students who expanded did not get any further.</>,
  },
  {
    working: <Katex display tex="(x+3)(x-1) = \pm3" />,
    reason: <>If <Katex tex="A^2=9" /> then <Katex tex="A=3" /> or <Katex tex="A=-3" />. This gives two quadratics instead of one quartic.</>,
    more: <>Keep both signs: dropping <Katex tex="-3" /> loses two of the four solutions, and the report notes many students did not consider <Katex tex="\pm3" />. Equivalently, factorise as a difference of two squares,{' '}
      <Katex tex="\bigl[(x+3)(x-1)-3\bigr]\bigl[(x+3)(x-1)+3\bigr]=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^2+2x-3 &= 3 \\ x^2+2x-6 &= 0 \\ x &= -1\pm\sqrt7 \end{aligned}" />,
    reason: <>Case <Katex tex="+3" />: expand, then the quadratic formula gives <Katex tex="\tfrac{-2\pm\sqrt{4+24}}{2}=\tfrac{-2\pm2\sqrt7}{2}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^2+2x-3 &= -3 \\ x(x+2) &= 0 \\ x = 0 \ &\text{ or } \ x = -2 \end{aligned}" />,
    reason: <>Case <Katex tex="-3" />: the constants cancel, leaving <Katex tex="x^2+2x=0" />, which factorises.</>,
    more: <>The null factor law needs a product equal to <b>zero</b>. A common slip (the report mentions incorrect null factor law interpretations) is to read{' '}
      <Katex tex="(x+3)(x-1)=3" /> as "<Katex tex="x+3=3" /> or <Katex tex="x-1=3" />" — that is invalid. Expand and rearrange to <Katex tex="=0" /> first.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2,\ 0,\ -1-\sqrt7,\ -1+\sqrt7}" />,
    reason: <>Four solutions, and none equals 1, so all four are in the domain.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} y = (x-1)(x-w) \\ \text{zeros at } x=1 \text{ and } x=w \end{gathered}" />,
    reason: <>An upward parabola (the <Katex tex="x^2" /> coefficient is <Katex tex="1" />), so its minimum sits midway between its zeros.</>,
  },
  {
    working: <Katex display tex="x = \frac{1+w}{2}" />,
    reason: <>By symmetry: the average of the zeros <Katex tex="1" /> and <Katex tex="w" />.</>,
    more: <>Alternatively, expand to <Katex tex="y=x^2-(1+w)x+w" /> and solve{' '}
      <Katex tex="\tfrac{dy}{dx}=2x-(1+w)=0" />, or use <Katex tex="x=-\tfrac{b}{2a}" /> — all give the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y &= \left(\frac{1+w}{2}-1\right)\left(\frac{1+w}{2}-w\right) \\ &= \left(\frac{w-1}{2}\right)\left(\frac{1-w}{2}\right) \end{aligned}" />,
    reason: <>Substitute into <Katex tex="y" />, writing each bracket over a common denominator of 2.</>,
    more: <>In detail: <Katex tex="\tfrac{1+w}{2}-1=\tfrac{1+w-2}{2}=\tfrac{w-1}{2}" /> and{' '}
      <Katex tex="\tfrac{1+w}{2}-w=\tfrac{1+w-2w}{2}=\tfrac{1-w}{2}" />. The report notes many students made mistakes combining fractions here.</>,
  },
  {
    working: <Katex display tex="= -\frac{(w-1)^2}{4}" />,
    reason: <>The brackets are negatives of each other, since <Katex tex="1-w=-(w-1)" />; and a half times a half is a quarter.</>,
    more: <>All three errors the report lists come from this line: a denominator of 2 instead of 4 (the first two, though{' '}
      <Katex tex="\tfrac12\times\tfrac12=\tfrac14" />), and <Katex tex="-\tfrac{w^2-1}{4}" />, which treats{' '}
      <Katex tex="(w-1)^2" /> as <Katex tex="w^2-1" /> (it is <Katex tex="w^2-2w+1" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{1+w}{2},\ -\frac{(w-1)^2}{4}\right)}" />,
    reason: <>Any equivalent form is accepted. Note the minimum <Katex tex="y" />-value is always <Katex tex="\le0" /> — part b.ii. uses this.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{w^2}{(x-1)^2} &= (x-w)^2 \\ \bigl[(x-1)(x-w)\bigr]^2 &= w^2 \end{aligned}" />,
    reason: <>The same first step as part a.: multiply by <Katex tex="(x-1)^2" /> and recognise a perfect square.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} P(x) = w \quad\text{or}\quad P(x) = -w, \\ \text{where } P(x) = (x-1)(x-w) \end{gathered}" />,
    reason: <>Square-rooting gives two quadratics. <Katex tex="P" /> is the parabola from b.i. (the "hence"); each asks where it meets a horizontal line, <Katex tex="y=w" /> or <Katex tex="y=-w" />.</>,
    more: <>So each solution is where <Katex tex="y=P(x)" /> meets the line <Katex tex="y=w" /> or the line{' '}
      <Katex tex="y=-w" />. As <Katex tex="w>0" />, the two lines are different, so no solution is counted twice: the total is just the sum of the two counts.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} w>0 \ge -\frac{(w-1)^2}{4} \\ \implies P(x) = w \text{ has two solutions} \end{gathered}" />,
    reason: <>The line <Katex tex="y=w" /> is strictly above the minimum (from b.i.), and such a line cuts an upward parabola twice.</>,
    more: <>Check directly: <Katex tex="x^2-(1+w)x+w=w" /> gives <Katex tex="x\bigl(x-(w+1)\bigr)=0" />, so{' '}
      <Katex tex="x=0" /> or <Katex tex="x=w+1" />, two different values since <Katex tex="w>0" />. So <Katex tex="P(x)=w" /> can never be the equation with just one solution.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{three solutions} \\ \iff P(x) = -w \text{ has one} \\ \iff -w = -\frac{(w-1)^2}{4} \end{gathered}" />,
    reason: <>Two solutions come from <Katex tex="y=w" />, so we need exactly one from <Katex tex="y=-w" />: that line must touch the vertex.</>,
    more: <>The line <Katex tex="y=-w" /> meets the parabola 0 times if it is below the vertex (2 solutions in total), twice if above (4 in total), and once only when it passes through the vertex. Equivalently (the report's discriminant method),{' '}
      <Katex tex="P(x)=-w" /> rearranges to <Katex tex="x^2-(w+1)x+2w=0" />, which has one solution when{' '}
      <Katex tex="\Delta=(w+1)^2-8w=0" /> — the same equation <Katex tex="w^2-6w+1=0" />.</>,
  },
  {
    working: <Katex display tex="4w = (w-1)^2 \implies w^2-6w+1 = 0" />,
    reason: <>Multiply both sides by <Katex tex="-4" />, then expand <Katex tex="(w-1)^2=w^2-2w+1" /> and collect.</>,
  },
  {
    working: <Katex display tex="w = \frac{6\pm\sqrt{36-4}}{2} = 3\pm2\sqrt2" />,
    reason: <><Katex tex="\sqrt{32}=4\sqrt2" />. Both roots are positive (<Katex tex="\approx0.17" /> and <Katex tex="\approx5.83" />), so both qualify.</>,
  },
  {
    working: <Katex display tex="\boxed{w = 3-2\sqrt2 \ \text{ or } \ w = 3+2\sqrt2}" />,
    reason: <>No solution is ever <Katex tex="x=1" />, since <Katex tex="P(1)=0\ne\pm w" /> for <Katex tex="w>0" /> — so all three survive the domain restriction.</>,
    more: <>For either value, the three solutions are <Katex tex="x=0" />, <Katex tex="x=w+1" /> and the vertex{' '}
      <Katex tex="x=\tfrac{1+w}{2}" />.</>,
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

      <DetailOnly>
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
              Part b.i. finds the minimum of exactly this parabola, which is what part b.ii.
              needs.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
