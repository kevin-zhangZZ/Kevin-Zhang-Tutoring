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
// Interactives: part b. has a mirror widget (interactives/meth-2019e1-q2b-swap.tsx) — slide P
// along f and watch its reflection P' on f⁻¹, with P's height becoming P''s across-position,
// so ran f = dom f⁻¹ and the missing 0 is visible. Part c. (24% correct) has a slide widget
// (interactives/meth-2019e1-q2c-slide.tsx) — drag the centre of f's asymptote cross onto
// f⁻¹'s and see c = −1/3, d = 1/3, with a toggle drawing the report's sign slip y + d = f(x + c).
// Part a. is pure transposition, so it has no widget; its reflection picture is in part b.
// WrongMethod boxes: a. f⁻¹ read as the reciprocal 1/f (no source: instructive because f is
// itself a reciprocal); c. the sign slip c = 1/3, d = −1/3 (examiner's report).
//
// Part a.'s working now swaps x and y first and frees y by taking reciprocals (the report's
// own route), instead of expanding and collecting; the answer is unchanged.
//
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivations below (confirmed again with sympy). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SwapWidget = lazyWidget(() => import('../interactives/meth-2019e1-q2b-swap'))
const SlideWidget = lazyWidget(() => import('../interactives/meth-2019e1-q2c-slide'))

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
    working: <Katex display tex="\text{Let } y = \dfrac{1}{3x-1}" />,
    reason: <>Write the rule with <Katex tex="y" /> for <Katex tex="f(x)" />, so the next step has something to swap.</>,
  },
  {
    working: <Katex display tex="\text{Inverse: swap } x \text{ and } y\text{:}\quad x = \dfrac{1}{3y-1}" />,
    reason: (
      <>
        The inverse undoes <Katex tex="f" />: every point <Katex tex="(a,b)" /> on <Katex tex="f" /> becomes{' '}
        <Katex tex="(b,a)" /> on <Katex tex="f^{-1}" />, so swapping <Katex tex="x" /> and <Katex tex="y" /> in the
        equation gives the equation of <Katex tex="f^{-1}" />. Write the words &ldquo;swap <Katex tex="x" /> and{' '}
        <Katex tex="y" />&rdquo;: going straight from <Katex tex="y=\tfrac{1}{3x-1}" /> to{' '}
        <Katex tex="x=\tfrac{1}{3y-1}" /> looks as if you claim they are the same equation, which is the kind of
        poor notation the report says held students back.
      </>
    ),
  },
  {
    working: <Katex display tex="3y-1 = \dfrac1x" />,
    reason: (
      <>
        The <Katex tex="y" /> is trapped in a denominator. Take the reciprocal of both sides (neither side can be{' '}
        <Katex tex="0" />): one move frees it, with no expanding or collecting where a transposition slip could
        creep in.
      </>
    ),
  },
  {
    working: <Katex display tex="y = \dfrac{1}{3x}+\dfrac13" />,
    reason: (
      <>
        Add <Katex tex="1" />, then divide <em>every</em> term by <Katex tex="3" />:{' '}
        <Katex tex="\tfrac1x \div 3 = \tfrac{1}{3x}" /> and <Katex tex="1\div 3=\tfrac13" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \dfrac{1}{3x}+\dfrac13 = \dfrac{1+x}{3x}}" />,
    reason: (
      <>
        The question asks for the rule of <Katex tex="f^{-1}" />, so answer with{' '}
        <Katex tex="f^{-1}(x) = " />, not <Katex tex="y=" />. Quick check that it really undoes <Katex tex="f" />:{' '}
        <Katex tex="f(1)=\tfrac12" />, and <Katex tex="f^{-1}\!\left(\tfrac12\right)=\tfrac23+\tfrac13=1" /> ✓.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{dom}(f^{-1}) = \operatorname{ran}(f)" />,
    reason: (
      <>
        <Katex tex="f^{-1}" /> swaps inputs and outputs, so the numbers <Katex tex="f^{-1}" /> accepts are exactly
        the numbers <Katex tex="f" /> can produce. The question is really &ldquo;what is the range of{' '}
        <Katex tex="f" />?&rdquo;
      </>
    ),
  },
  {
    working: <Katex display tex="f:R\setminus\{\tfrac13\}\to R,\ f(x)=\dfrac{1}{3x-1}" />,
    reason: (
      <>
        As <Katex tex="x" /> ranges over all reals except <Katex tex="\tfrac13" />, <Katex tex="3x-1" /> ranges over
        all reals except <Katex tex="0" />, so <Katex tex="f(x)=\tfrac{1}{3x-1}" /> takes every nonzero real value.
        It never equals <Katex tex="0" />, since a fraction with numerator <Katex tex="1" /> is never{' '}
        <Katex tex="0" />. On the graph, that is the horizontal asymptote <Katex tex="y=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\operatorname{dom}(f^{-1}) = R\setminus\{0\}}" />,
    reason: (
      <>
        Consistent with part a.: <Katex tex="\tfrac{1}{3x}+\tfrac13" /> is undefined only at <Katex tex="x=0" />.
        Reading the domain off the rule only works because <Katex tex="f" /> here has its largest possible
        domain. In Question 1, with <Katex tex="f" /> restricted to <Katex tex="\left(\tfrac13,\infty\right)" />, the
        same rule would still accept <Katex tex="x=-5" />, but the range of <Katex tex="f" /> (so the domain of{' '}
        <Katex tex="f^{-1}" />) would be <Katex tex="(0,\infty)" />. Go via the range.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x' = x+c,\quad y' = y+d" />,
    reason: (
      <>
        Read the column vectors one row at a time: the point <Katex tex="(x,y)" /> on <Katex tex="f" /> is sent to{' '}
        <Katex tex="(x',y')" />. Nothing multiplies <Katex tex="x" /> or <Katex tex="y" />, so there is no dilation
        (the report says some students tried dilations): <Katex tex="T" /> is a translation, <Katex tex="c" />{' '}
        across and <Katex tex="d" /> up.
      </>
    ),
  },
  {
    working: <Katex display tex="\implies x = x'-c,\quad y = y'-d" />,
    reason: (
      <>
        The old point satisfies <Katex tex="y=f(x)" />, so to get the equation of the image we need the old{' '}
        <Katex tex="x" /> and <Katex tex="y" /> in terms of the new ones. Solving backwards is where the minus signs
        come from, and it is the step behind the sign errors the report mentions.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} y'-d &= \dfrac{1}{3(x'-c)-1} \\ g(x) &= \dfrac{1}{3(x-c)-1}+d \end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute into <Katex tex="y=\tfrac{1}{3x-1}" />, make <Katex tex="y'" /> the subject, then drop the dashes.
        This is the familiar &ldquo;<Katex tex="c" /> to the right means <Katex tex="x-c" />&rdquo; rule, now with a
        reason behind it.
      </>
    ),
  },
  {
    working: <Katex display tex="\dfrac{1}{3x-3c-1}+d = \dfrac{1}{3x}+\dfrac13" />,
    reason: (
      <>
        Set <Katex tex="g=f^{-1}" />, using part a.&rsquo;s answer in its &ldquo;fraction plus a constant&rdquo;
        form. Two curves of this shape are equal only if their vertical asymptotes match (the denominators are{' '}
        <Katex tex="0" /> at the same <Katex tex="x" />) and their horizontal asymptotes match (the same constant is
        added). So the equation splits into two easy ones.
      </>
    ),
  },
  {
    working: <Katex display tex="3x-3c-1 = 3x \implies c = -\dfrac13" />,
    reason: <>Comparing denominators. The <Katex tex="3x" /> terms cancel, leaving a one-line equation in <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="d = \dfrac13" />,
    reason: <>Comparing the constants added outside the fraction.</>,
  },
  {
    working: <Katex display tex="\boxed{c = -\dfrac13, \qquad d = \dfrac13}" />,
    reason: (
      <>
        So <Katex tex="f" /> slides <Katex tex="\tfrac13" /> <em>left</em> and <Katex tex="\tfrac13" /> <em>up</em>{' '}
        onto its inverse. Two checks: substituting,{' '}
        <Katex tex="f\!\left(x+\tfrac13\right)+\tfrac13 = \tfrac{1}{3x}+\tfrac13" /> ✓; and the asymptote crossing
        of <Katex tex="f" />, <Katex tex="\left(\tfrac13,0\right)" />, moves to{' '}
        <Katex tex="\left(\tfrac13+c,\ d\right) = \left(0,\tfrac13\right)" />, which is where{' '}
        <Katex tex="f^{-1}" />&rsquo;s asymptotes cross ✓.
      </>
    ),
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
        <WrongMethod
          title="f⁻¹ means 1 over f, so f⁻¹(x) = 3x − 1"
          working={<Katex display tex="f^{-1}(x) = \dfrac{1}{f(x)} = 3x-1" />}
        >
          The <Katex tex="-1" /> in <Katex tex="f^{-1}" /> is not a power. <Katex tex="f^{-1}" /> is the function that
          undoes <Katex tex="f" />; the reciprocal would be written <Katex tex="\tfrac{1}{f(x)}" /> or{' '}
          <Katex tex="[f(x)]^{-1}" />. It is especially tempting here because <Katex tex="f" /> is itself a reciprocal.
          Catch it with one point: <Katex tex="f(1)=\tfrac12" />, so <Katex tex="f^{-1}\!\left(\tfrac12\right)" /> must
          be <Katex tex="1" />, but <Katex tex="3\left(\tfrac12\right)-1=\tfrac12" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Domain" marks={1} statement={<>State the domain of <Katex tex="f^{-1}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the range of f becomes the domain of f⁻¹">
          <SwapWidget />
        </Explore>
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
            Why can a translation turn <Katex tex="f" /> into its inverse at all? Both graphs are the
            hyperbola <Katex tex="y=\tfrac{1}{3x}" />, just centred at different points: <Katex tex="f" /> is
            it moved <Katex tex="\tfrac13" /> right, and <Katex tex="f^{-1}(x)=\tfrac{1}{3x}+\tfrac13" /> is it
            moved <Katex tex="\tfrac13" /> up. So a slide from one centre to the other is all it takes.
          </p>
          <p>
            The VCAA report says transformation questions were challenging on this paper,
            "whether they are presented in matrix form (as in Question 2c.) or presented using
            functional notation (as in Question 4b.)" — the two look different on the page but
            ask for exactly the same thinking.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Slide f onto f⁻¹: which way do c and d go?">
          <SlideWidget />
        </Explore>
        <WrongMethod
          title="T adds c to x, so I replace x with x + c (and y with y + d)"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned} y+d &= \dfrac{1}{3(x+c)-1} \\ 3c-1 &= 0,\ -d = \tfrac13 \\ c &= \tfrac13,\ d = -\tfrac13 \end{aligned}"
            />
          }
        >
          This substitutes the new coordinates where the old ones belong, so the curve moves the opposite way
          to <Katex tex="T" />. The algebra matches <Katex tex="f^{-1}" /> perfectly, which is why the slip is
          convincing. But <Katex tex="T" /> with these values moves every point <Katex tex="\tfrac13" /> right and{' '}
          <Katex tex="\tfrac13" /> down, so <Katex tex="f" />&rsquo;s centre <Katex tex="\left(\tfrac13,0\right)" />{' '}
          lands at <Katex tex="\left(\tfrac23,-\tfrac13\right)" />, not at <Katex tex="\left(0,\tfrac13\right)" />.
          Catch it by moving one point, such as the asymptote crossing, with <Katex tex="T" /> itself.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
