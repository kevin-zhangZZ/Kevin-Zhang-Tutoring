// 2025 Specialist Mathematics — Exam 1 Question 9 (6 marks). A rational function that
// cancels to reveal an oblique asymptote and a removable discontinuity. Question text
// transcribed from the original paper; the part c. graph is our own drawing of the answer on
// VCAA's exact grid (−4 to 4 on both axes, gridlines every 0.5). Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './spec-2025e1-q9c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 33, 45],
  average: 1.2,
  comment: (
    <>
      Students needed to be very careful to ensure that their working actually produced the
      required result. Some poor algebraic working was observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: <>This question required a numerical answer.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 16, 18, 16],
  average: 1.0,
  comment: (
    <>
      Students were required to label the asymptotes with their equations. An open circle to
      indicate the point of discontinuity at <Katex tex="(1,-1.5)" /> needed to be shown.
      <br />
      A number of students included an incorrect vertical asymptote <Katex tex="x=1" /> or had
      curves that did not pass through the axis intercepts at <Katex tex="(-2,0)" /> and{' '}
      <Katex tex="(0,0)" />. The point of discontinuity at <Katex tex="(1,-1.5)" /> was often
      missing or was placed incorrectly.
      <br />
      Students who were most successful used a ruler to draw the asymptotes and had graphs that did
      not curve away from the asymptotes.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} x^3+x^2-2x &= x\left(x^2+x-2\right) \\ &= x(x+2)(x-1) \end{aligned}" />,
    reason: <>Factorising the numerator first is what exposes the cancellation.</>,
  },
  {
    working: <Katex display tex="1-x^2 = (1-x)(1+x) = -(x-1)(x+1)" />,
    reason: <>Writing the denominator with <Katex tex="(x-1)" /> rather than <Katex tex="(1-x)" /> makes the shared factor visible, at the cost of one minus sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(x) &= \frac{x(x+2)(x-1)}{-(x-1)(x+1)} \\ &= \frac{-x(x+2)}{x+1} \quad (x\ne1) \end{aligned}" />,
    reason: <>The <Katex tex="(x-1)" /> cancels (allowed, as <Katex tex="x\ne1" /> in the domain), which is why <Katex tex="x=1" /> is a <em>hole</em> rather than an asymptote.</>,
    more: (
      <>
        Watch the minus sign. <Katex tex="(1-x)" /> and <Katex tex="(x-1)" /> are not the same
        factor, so cancelling them as if they were gives{' '}
        <Katex tex="\tfrac{x(x+2)}{x+1} = x+1-\tfrac{1}{x+1}" /> — exactly the negative of the
        required form. If your working lands on the wrong sign, this is almost always where it
        went; do not patch the sign at the end, as the report warns that working must actually
        produce the required result.
      </>
    ),
  },
  {
    working: <Katex display tex="-x(x+2) = -\left(x^2+2x\right) = -\left[(x+1)^2-1\right]" />,
    reason: <>Completing the square so the numerator is written in terms of <Katex tex="(x+1)" />, the denominator, which then divides out exactly.</>,
    more: (
      <>
        The target form tells you what to aim for: the <Katex tex="\tfrac{1}{x+1}" /> means the
        numerator must be rewritten as (multiple of <Katex tex="x+1" />) + constant. Completing
        the square is one way; another is to add and subtract inside the numerator,{' '}
        <Katex tex="-x^2-2x = -x(x+1)-(x+1)+1" />, or to long-divide{' '}
        <Katex tex="-x^2-2x" /> by <Katex tex="x+1" /> (quotient <Katex tex="-x-1" />,
        remainder <Katex tex="1" />). All three reach the same place.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = \frac{-(x+1)^2+1}{x+1} = -(x+1)+\frac{1}{x+1}" />,
    reason: <>Splitting the fraction term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -x-1+\frac{1}{x+1}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g \text{ continuous at } x=1 \iff k = \lim_{x\to1}f(x)" />,
    reason: <>Continuity at <Katex tex="x=1" /> means the value <Katex tex="g(1)=k" /> equals the limit there; for <Katex tex="x\ne1" />, <Katex tex="g(x)=f(x)" />.</>,
    more: (
      <>
        The limit exists only because the factor <Katex tex="(x-1)" /> cancelled in part a. —
        that is what makes the discontinuity at <Katex tex="x=1" /> <em>removable</em>. At{' '}
        <Katex tex="x=-1" /> no value could do the same job, because{' '}
        <Katex tex="f(x)\to\pm\infty" /> there.
      </>
    ),
  },
  {
    working: <Katex display tex="\lim_{x\to1}\left(-x-1+\frac{1}{x+1}\right) = -1-1+\frac12" />,
    reason: <>The form from part a. equals <Katex tex="f(x)" /> near <Katex tex="x=1" /> and is defined at <Katex tex="x=1" />, so the limit is just a substitution.</>,
    more: (
      <>
        Substituting <Katex tex="x=1" /> into the <em>original</em> rule gives{' '}
        <Katex tex="\tfrac00" />, which is meaningless — that is why you use a simplified form.
        The cancelled form <Katex tex="\tfrac{-x(x+2)}{x+1}" /> works equally well:{' '}
        <Katex tex="\tfrac{-1\times3}{2}=-\tfrac32" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{k = -\frac32}" />,
    reason: <>Setting <Katex tex="k=-\tfrac32" /> fills the hole, so <Katex tex="g" /> is continuous at <Katex tex="x=1" />.</>,
    more: (
      <>
        The report notes that a numerical answer was required: stopping at{' '}
        <Katex tex="k=\lim_{x\to1}f(x)" />, or at an unevaluated expression, does not answer the
        question. <Katex tex="-1.5" /> and <Katex tex="-\tfrac32" /> are both fine.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x+1 = 0 \implies \text{vertical asymptote } x = -1" />,
    reason: <>The only vertical asymptote: after the <Katex tex="(x-1)" /> cancelled in part a., <Katex tex="x+1" /> is the only factor left in the denominator.</>,
    more: (
      <>
        The report notes a number of students included an incorrect vertical asymptote{' '}
        <Katex tex="x=1" />. Excluded from the domain is not the same as an asymptote: near{' '}
        <Katex tex="x=1" /> the values stay close to <Katex tex="-\tfrac32" /> (part b.), so
        there is a hole, not a blow-up. Near <Katex tex="x=-1" />, the term{' '}
        <Katex tex="\tfrac{1}{x+1}" /> gives <Katex tex="f\to+\infty" /> from the right and{' '}
        <Katex tex="f\to-\infty" /> from the left.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &x\to\pm\infty \implies \frac{1}{x+1}\to0 \\ &\implies \text{oblique asymptote } y = -x-1 \end{aligned}" />,
    reason: <>In the form from part a., the fraction dies away, leaving the linear part. Label both asymptotes with their equations.</>,
  },
  {
    working: <Katex display tex="f(x) = 0 \implies \frac{1}{x+1} = x+1 \implies (x+1)^2 = 1" />,
    reason: <>Axis intercepts: set the form from part a. to zero, then multiply both sides by <Katex tex="x+1" />.</>,
    more: (
      <>
        The cancelled form from part a. is quicker:{' '}
        <Katex tex="\tfrac{-x(x+2)}{x+1}=0" /> exactly when <Katex tex="x=0" /> or{' '}
        <Katex tex="x=-2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x+1 = \pm1 \implies x = 0 \ \text{ or } \ x = -2" />,
    reason: <>The intercepts are <Katex tex="(0,0)" /> and <Katex tex="(-2,0)" />; since <Katex tex="f(0)=0" />, the origin is also the <Katex tex="y" />-intercept.</>,
    more: (
      <>
        The report notes curves that did not pass through these intercepts. Mark both points
        clearly and make the curve go exactly through them.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = -1-\frac{1}{(x+1)^2} \lt 0" />,
    reason: <>Differentiate the form from part a.; <Katex tex="f'(x)" /> is always negative, so each branch is strictly decreasing with no turning points.</>,
    more: (
      <>
        This fixes the shape. Each branch falls steadily: it comes in along one asymptote and
        goes off along the other, never bending back away from either. The report says the
        most successful graphs did exactly this, and had asymptotes drawn with a ruler.
      </>
    ),
  },
  {
    working: <Katex display tex="x = 1 \text{ is excluded from the domain}, \ f\to-\tfrac32" />,
    reason: <>So draw an open circle at <Katex tex="\left(1,-\tfrac32\right)" />, the height found in part b.</>,
    more: (
      <>
        The report notes the open circle was often missing or placed incorrectly. It sits on the
        right branch, just above the oblique asymptote (which is at <Katex tex="y=-2" /> when{' '}
        <Katex tex="x=1" />), and it must be open, because <Katex tex="f(1)" /> is undefined.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (−4 to 4 on both axes): two branches either side of the dashed vertical asymptote x = −1, both approaching the dashed oblique asymptote y = −x − 1, the left branch crossing the x-axis at −2 and the right branch passing through the origin, with an open circle at (1, −1.5)"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Asymptotes labelled, intercepts marked, open circle shown. As <Katex tex="\tfrac{1}{x+1}>0" /> for <Katex tex="x>-1" />, the right branch lies <em>above</em> <Katex tex="y=-x-1" />; the left branch lies below.</>,
  },
]

export default function SpecialistQ9_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (6 marks)</p>
        <p>
          Let <Katex tex="f:R\setminus\{-1,1\}\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{x^3+x^2-2x}{1-x^2}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The two excluded values behave differently, and the whole question turns on that. At{' '}
              <Katex tex="x=-1" /> the denominator vanishes and the numerator does not, giving
              a genuine vertical asymptote. At <Katex tex="x=1" /> both vanish, the factor
              cancels, and what is left is a <em>hole</em> — no asymptote at all.
            </p>
            <p>
              The form <Katex tex="-x-1+\tfrac{1}{x+1}" /> then hands you the rest: the oblique
              asymptote <Katex tex="y=-x-1" /> is the polynomial part, and the sign of{' '}
              <Katex tex="\tfrac{1}{x+1}" /> tells you which side of it each branch lies on.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Oblique Asymptote"
        marks={2}
        statement={
          <>
            Show that <Katex tex="f(x)" /> can be written in the form{' '}
            <Katex tex="f(x)=-x-1+\dfrac{1}{x+1}" />, for{' '}
            <Katex tex="x\in R\setminus\{-1,1\}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Removable Discontinuity"
        marks={1}
        statement={
          <>
            Consider the function with rule
            <Katex display tex="g(x)=\begin{cases}\dfrac{x^3+x^2-2x}{1-x^2}, & x\in R\setminus\{-1,1\}\\[6pt] k, & x\in\{1\}\end{cases}" />
            Find the value of <Katex tex="k" /> such that the graph of <Katex tex="g" /> is
            continuous at <Katex tex="x=1" />.
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
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes below.
            <br />
            Label the asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
