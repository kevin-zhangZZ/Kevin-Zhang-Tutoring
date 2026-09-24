// 2019 Mathematical Methods — Exam 1, Question 2, all three parts. Same rule as Question 1
// but with the wider domain R\{1/3} — find the rule and domain of f⁻¹, then the translation
// that carries f onto f⁻¹. Question text transcribed from the original paper (no diagram
// given).
//
// Part c. writes its transformation in column-vector form, and was left out when this file
// was first written. It is back: the matrix here is the identity, so T is a plain translation
// and the part reduces to ordinary function-transformation work with no matrix algebra in it
// at all. The guide's test (§13.7) is the question's mathematics, not its vocabulary. The
// skip guide records the same reading.
//
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivations below. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 37, 57],
  average: 1.5,
  comment: (
    <>
      This question was well attempted and generally well done; however, in some cases
      progression to the correct answer was hindered by errors with algebraic manipulation
      (transposition) or poor use of notation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: <>In general students knew that the domain of <Katex tex="f^{-1}=\operatorname{range}\text{ of }f" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [76, 24],
  average: 0.3,
  comment: (
    <>
      This question, while well attempted, was not done well. Some students had the incorrect
      sign for <Katex tex="c" /> and <Katex tex="d" />. Other students attempted dilations
      rather than translations as specified by the question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \dfrac{1}{3x-1}" />,
    reason: <>Write the rule with <Katex tex="y" /> for <Katex tex="f(x)" />.</>,
  },
  {
    working: <Katex display tex="y(3x-1) = 1 \;\implies\; 3xy - y = 1 \;\implies\; 3xy = 1+y" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />'s roles — rearrange for <Katex tex="x" /> in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="x = \dfrac{1+y}{3y}" />,
    reason: <>Dividing by <Katex tex="3y" />. The report notes errors in this transposition.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \dfrac{1+x}{3x} = \dfrac13\left(\dfrac1x+1\right)}" />,
    reason: <>Relabel <Katex tex="y\to x" /> for the inverse rule.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{dom}(f^{-1}) = \operatorname{ran}(f)" />,
    reason: <>Standard inverse-function fact.</>,
  },
  {
    working: <Katex display tex="f:R\setminus\{\tfrac13\}\to R,\ f(x)=\dfrac{1}{3x-1}" />,
    reason: <>As <Katex tex="x" /> ranges over all reals except <Katex tex="\tfrac13" />, <Katex tex="3x-1" /> ranges over all reals except <Katex tex="0" />, so <Katex tex="f(x)=\dfrac{1}{3x-1}" /> takes every nonzero real value (and never equals <Katex tex="0" />, since a fraction with numerator <Katex tex="1" /> is never <Katex tex="0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{dom}(f^{-1}) = R\setminus\{0\}}" />,
    reason: <>Consistent with the rule from part a.: <Katex tex="\tfrac{1+x}{3x}" /> is undefined only at <Katex tex="x=0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}x\\y\end{bmatrix} + \begin{bmatrix}c\\d\end{bmatrix} \implies \begin{cases} x' = x+c \\ y' = y+d \end{cases}" />,
    reason: <>Read the column-vector statement one row at a time. There is no dilation or reflection here — the point simply moves <Katex tex="c" /> across and <Katex tex="d" /> up, so <Katex tex="T" /> is a translation and nothing else.</>,
  },
  {
    working: <Katex display tex="g(x) = f(x-c)+d = \dfrac{1}{3(x-c)-1}+d" />,
    reason: <>Applying a translation to a <em>graph</em> reverses the sign on the <Katex tex="x" /> side: moving the curve <Katex tex="c" /> to the right replaces <Katex tex="x" /> by <Katex tex="x-c" />, while the <Katex tex="d" /> is simply added on the outside. The report says some students had the incorrect sign for <Katex tex="c" /> and <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \dfrac{1+x}{3x} = \dfrac{1}{3x}+\dfrac13" />,
    reason: <>Rewriting part a.'s answer as "a hyperbola plus a constant" makes the comparison possible: the target is <Katex tex="\tfrac{1}{3x}" /> shifted up by <Katex tex="\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{1}{3(x-c)-1}+d \;=\; \dfrac{1}{3x}+\dfrac13" />,
    reason: <>Setting <Katex tex="g=f^{-1}" />, as the question requires. Two expressions of this shape match only if their denominators match and their constants match, so the equation splits into two easy ones.</>,
  },
  {
    working: <Katex display tex="3(x-c)-1 = 3x \implies -3c-1 = 0 \implies c = -\dfrac13" />,
    reason: <>Comparing denominators. The <Katex tex="3x" /> terms cancel, leaving a one-line equation in <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="d = \dfrac13" />,
    reason: <>Comparing the constants left outside the fraction.</>,
  },
  {
    working: <Katex display tex="\boxed{c = -\dfrac13, \qquad d = \dfrac13}" />,
    reason: <>So <Katex tex="f" /> becomes its own inverse under a shift of <Katex tex="\tfrac13" /> unit <em>left</em> and <Katex tex="\tfrac13" /> unit <em>up</em>. Worth checking: <Katex tex="f\!\left(x+\tfrac13\right)+\tfrac13 = \dfrac{1}{3x+1-1}+\tfrac13 = \dfrac{1}{3x}+\tfrac13" /> ✓. The negative <Katex tex="c" /> is the sign the report flags — a leftward shift needs <Katex tex="c<0" />.</>,
  },
]

export default function MethodsQ2_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
      </div>

      <PartCard letter="a" topic="Inverse Function" marks={2} statement={<>Let <Katex tex="f:R\setminus\left\{\tfrac13\right\}\to R,\ f(x)=\dfrac{1}{3x-1}" />.<br />Find the rule of <Katex tex="f^{-1}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Domain" marks={1} statement={<>State the domain of <Katex tex="f^{-1}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Transformations"
        marks={1}
        statement={
          <>
            Let <Katex tex="g" /> be the function obtained by applying the transformation{' '}
            <Katex tex="T" /> to the function <Katex tex="f" />, where{' '}
            <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}x\\y\end{bmatrix} + \begin{bmatrix}c\\d\end{bmatrix}" />{' '}
            and <Katex tex="c,d\in R" />. Find the values of <Katex tex="c" /> and{' '}
            <Katex tex="d" /> given that <Katex tex="g=f^{-1}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            The column-vector notation looks like matrix work, but look at what the matrix
            actually is: nothing is being multiplied. <Katex tex="T" /> adds{' '}
            <Katex tex="c" /> to every <Katex tex="x" /> and <Katex tex="d" /> to every{' '}
            <Katex tex="y" />, which is the definition of a translation. Written the way you
            are used to, <Katex tex="g(x) = f(x-c)+d" />.
          </p>
          <p>
            The VCAA report says transformation questions were challenging on this paper,
            "whether they are presented in matrix form (as in Question 2c.) or presented using
            functional notation (as in Question 4b.)" — the two look different on the page but
            ask for exactly the same thinking.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
