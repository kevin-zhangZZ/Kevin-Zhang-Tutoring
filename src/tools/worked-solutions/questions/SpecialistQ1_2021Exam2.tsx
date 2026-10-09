// 2021 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A rational
// function: partial-fraction form, asymptotes, a sketch, then a parameter that changes how
// many asymptotes and stationary points it has. Question text transcribed from the original
// paper; the sketch is this site's own matplotlib drawing of the answer, on VCAA's grid
// (x −11 to 11, y −6 to 16, gridlines every 1). Answers checked with sympy
// and against the VCAA examination report. Solution is original.
// Interactives: c. spec-2021e2-q1c-window (the calculator window that hides the middle branch),
// d.i. spec-2021e2-q1di-asymptotes (the three ways to lose a vertical asymptote), d.ii.
// spec-2021e2-q1dii-turning-points (the turning points vanish into the hole at k = −5 and k = 3/2).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import sketchSrc from './spec-2021e2-q1c-sketch.png'

const WindowWidget = lazyWidget(() => import('../interactives/spec-2021e2-q1c-window'))
const AsymptotesWidget = lazyWidget(() => import('../interactives/spec-2021e2-q1di-asymptotes'))
const TurningPointsWidget = lazyWidget(() => import('../interactives/spec-2021e2-q1dii-turning-points'))

const EXAM_A: SAExaminerStats = { marks: [21, 79], average: 0.8 }

const EXAM_B: SAExaminerStats = {
  marks: [4, 29, 67],
  average: 1.7,
  comment: (
    <>
      The most common error was to give only the vertical asymptotes, leaving out the
      horizontal asymptote.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [24, 32, 23, 22],
  average: 1.5,
  comment: (
    <>
      A significant number of responses did not include the middle branch. Setting the
      calculator screen to match the grid provided would help avoid this error. Many
      responses lacked at least one of the required details such as coordinates of the
      point of inflection or coordinates of one of the axial intercepts. Students need to
      read the question carefully and fully address the requirements of the question.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [58, 36, 6],
  average: 0.5,
  comment: (
    <>
      Very few students gave all three values. Many responses included only one value:{' '}
      <Katex tex="k=-2" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [82, 5, 13],
  average: 0.3,
  comment: (
    <>
      A common error was to include other incorrect values of <Katex tex="k" />. Many
      students left this question blank.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{(2x-3)(x+5)}{(x-1)(x+2)} = \frac{2x^2+7x-15}{x^2+x-2}" />,
    reason: <>The top and bottom are both degree 2, so divide first, the same way you would write <Katex tex="\tfrac73" /> as <Katex tex="2+\tfrac13" />. Expand both products to see the coefficients.</>,
  },
  {
    working: <Katex display tex="2x^2+7x-15 = 2\left(x^2+x-2\right)+5x-11" />,
    reason: <><Katex tex="x^2" /> goes into <Katex tex="2x^2" /> twice, so the quotient is 2. Taking away <Katex tex="2\left(x^2+x-2\right)=2x^2+2x-4" /> leaves the remainder <Katex tex="5x-11" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2+\frac{5x-11}{(x-1)(x+2)}}" />,
    reason: <>So <Katex tex="A=2" />, <Katex tex="B=5" />, <Katex tex="C=-11" />. This form makes the horizontal asymptote in part b. immediate.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x-1)(x+2) = 0 \implies x = 1, \ x = -2" />,
    reason: <>Vertical asymptotes are where the denominator is zero. Neither factor cancels (the numerator is zero only at <Katex tex="x=\tfrac32" /> and <Katex tex="x=-5" />), so both are genuine vertical asymptotes.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty: \ \frac{5x-11}{(x-1)(x+2)}\to0" />,
    reason: <>Use part a.&apos;s form. Degree 1 over degree 2: the bottom grows much faster than the top, so the fraction dies away and <Katex tex="f(x)\to2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1, \quad x = -2, \quad y = 2}" />,
    reason: <>Three asymptotes. The horizontal one is the <Katex tex="A" /> from part a. — the report&apos;s most common error was leaving it out.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{intercepts: } (-5,0), \ \left(\tfrac32,0\right), \ \left(0,\tfrac{15}{2}\right)" />,
    reason: <>The x-intercepts are where the numerator <Katex tex="(2x-3)(x+5)" /> is zero. The y-intercept is <Katex tex="f(0)=\tfrac{(-3)(5)}{(-1)(2)}=\tfrac{15}{2}" />. All three must be labelled: the report notes many sketches were missing a required detail such as one of the intercepts.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{-5x^2+22x+1}{\left(x^2+x-2\right)^2}" />,
    reason: <>On CAS, <Cas fn="define">Define f(x)=(2x−3)(x+5)/((x−1)(x+2))</Cas> (the rest of the part uses it), then <Cas fn="derivative">d/dx(f(x))</Cas>. The denominator is a square, so it is positive: <Katex tex="f'(x)=0" /> only where the numerator is zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &-5x^2+22x+1=0 \\ &x = \frac{11\pm3\sqrt{14}}{5} \\ &x \approx -0.04499 \text{ or } 4.44499 \end{aligned}" />,
    reason: <>The quadratic formula, or <Cas fn="solve">solve(d/dx(f(x))=0, x)</Cas>. Keep the extra decimal places: 4.44499 rounds to 4.44, but rounding to 4.445 first and then again would wrongly give 4.45.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x\approx-0.045&:\ f' \text{ goes } - \text{ to } + \implies \text{min} \\ x\approx4.445&:\ f' \text{ goes } + \text{ to } - \implies \text{max} \end{aligned}" />,
    reason: <>The sign of <Katex tex="f'(x)" /> is the sign of its numerator <Katex tex="-5x^2+22x+1" />, an upside-down parabola: negative outside its two roots and positive between them. So the first point is a minimum, <Katex tex="(-0.04,\ 7.49)" />, at the bottom of the middle branch, and the second is the maximum the question asks for.</>,
  },
  {
    working: <Katex display tex="f(4.44499) = 2.50556 \implies \text{max } (4.44,\ 2.51)" />,
    reason: <>Substitute the unrounded x-value into <Katex tex="f" />, then round both coordinates to two decimal places.</>,
  },
  {
    working: <Katex display tex="f''(x) = 0 \implies x \approx 6.78822 \implies (6.79,\ 2.45)" />,
    reason: <><Cas fn="solve">solve(d²/dx²(f(x))=0, x)</Cas> gives only one real solution, and <Katex tex="f(6.78822)=2.45099" />. The concavity really does change there: the curve is concave down at the maximum but must bend the other way to level off towards <Katex tex="y=2" />, so this is the point of inflection.</>,
  },
  {
    working: <Katex display tex="f(x) = 2 \iff 5x-11=0 \iff x = \tfrac{11}{5}" />,
    reason: <>Using part a.&apos;s form. So the right branch crosses its asymptote <Katex tex="y=2" /> at <Katex tex="x=2.2" />, rises to the maximum, then falls back towards <Katex tex="y=2" /> from above. That is allowed: a graph only has to approach a horizontal asymptote as <Katex tex="x\to\pm\infty" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="On VCAA's grid: three branches of the graph of f with dashed asymptotes x = −2, x = 1 and y = 2; the left branch through (−5, 0), the middle branch a valley with its minimum near (0, 7.5), and the right branch through (1.5, 0) rising to the maximum (4.44, 2.51) with the point of inflection at (6.79, 2.45)"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>Near the vertical asymptotes, the middle branch shoots up to <Katex tex="+\infty" /> at both ends, and the two outer branches go down to <Katex tex="-\infty" />. All three branches must appear — the report notes a significant number of responses left out the middle branch, and that setting the calculator screen to match the grid helps.</>,
    more: <>The interactive below shows why.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g_k(x) = \frac{(2x-3)(x+5)}{(x-k)(x+2)}" />,
    reason: <>Only the <Katex tex="(x-1)" /> factor has changed, to <Katex tex="(x-k)" />.</>,
  },
  {
    working: <Katex display tex="\text{horizontal asymptote } y=2 \text{ for every } k" />,
    reason: <>Top and bottom are both degree 2, so as <Katex tex="x\to\pm\infty" /> the graph approaches the ratio of the leading coefficients, <Katex tex="\tfrac21=2" />. <Katex tex="k" /> doesn&apos;t change that, so this asymptote is always there.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{two asymptotes} \\ &\iff \text{only one vertical asymptote} \end{aligned}" />,
    reason: <>Vertical asymptotes come from the zeros of the denominator, <Katex tex="x=k" /> and <Katex tex="x=-2" />, that don&apos;t cancel. One can be lost in two ways: the two zeros coincide, or <Katex tex="(x-k)" /> cancels with a factor of the numerator. (<Katex tex="x=-2" /> can never cancel: the numerator at <Katex tex="x=-2" /> is <Katex tex="(-7)(3)=-21" />.)</>,
  },
  {
    working: <Katex display tex="k=-2:\ g_k(x) = \frac{(2x-3)(x+5)}{(x+2)^2}" />,
    reason: <>The two zeros coincide: the denominator is now <Katex tex="(x+2)^2" />, so <Katex tex="x=-2" /> is the only vertical asymptote.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} k=\tfrac32:\ g_k(x) &= \frac{2\left(x-\tfrac32\right)(x+5)}{\left(x-\tfrac32\right)(x+2)} \\ &= \frac{2(x+5)}{x+2},\quad x\ne\tfrac32 \end{aligned}" />,
    reason: <><Katex tex="2x-3=2\left(x-\tfrac32\right)" />, so the factor cancels. At <Katex tex="x=\tfrac32" /> the graph now has a hole (one missing point), not an asymptote, leaving just <Katex tex="x=-2" /> and <Katex tex="y=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} k=-5:\ g_k(x) &= \frac{(2x-3)(x+5)}{(x+5)(x+2)} \\ &= \frac{2x-3}{x+2},\quad x\ne-5 \end{aligned}" />,
    reason: <>The same thing with the numerator&apos;s other factor: a hole at <Katex tex="x=-5" />, and again only <Katex tex="x=-2" /> and <Katex tex="y=2" /> remain.</>,
  },
  {
    working: <Katex display tex="\boxed{k = -5, \ -2, \ \tfrac32}" />,
    reason: <>All three. The report notes many responses gave only <Katex tex="k=-2" />: whenever a parameter sits in the denominator, also check whether it can cancel with the numerator.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="g_k'(x) = \frac{-(2k+3)x^2+(30-8k)x+(30-29k)}{(x-k)^2(x+2)^2}" />,
    reason: <>On CAS, <Cas fn="define">Define g(x)=(2x−3)(x+5)/((x−k)(x+2))</Cas> with <Katex tex="k" /> left as a letter, then <Cas fn="derivative">d/dx(g(x))</Cas>. Grouping the numerator by powers of <Katex tex="x" /> shows it is a quadratic in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="-(2k+3)x^2+(30-8k)x+(30-29k) = 0" />,
    reason: <><Katex tex="g_k'(x)=0" /> exactly when this holds: a fraction is zero only when its numerator is, and the denominator is a square, never zero on the domain. So &ldquo;no stationary points&rdquo; means this quadratic has no real solutions — a discriminant question.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Delta &= (30-8k)^2+4(2k+3)(30-29k) \\ &= -168k^2-588k+1260 \\ &= -84(k+5)(2k-3) \end{aligned}" />,
    reason: <><Katex tex="\Delta=b^2-4ac" /> with <Katex tex="a=-(2k+3)" />, <Katex tex="b=30-8k" />, <Katex tex="c=30-29k" />; the two minus signs in <Katex tex="-4ac" /> cancel. Expanding and taking out <Katex tex="-84" /> leaves <Katex tex="2k^2+7k-15=(k+5)(2k-3)" />. CAS can expand and factorise this for you.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{no stationary points} \\ &\iff \Delta<0 \\ &\iff (k+5)(2k-3)>0 \end{aligned}" />,
    reason: <>A quadratic with <Katex tex="\Delta<0" /> has no real solutions. Dividing by <Katex tex="-84" /> flips the inequality. (At <Katex tex="k=-\tfrac32" /> the <Katex tex="x^2" /> term drops out and the equation is linear, with one solution <Katex tex="x=-\tfrac74" />; there <Katex tex="\Delta=1764>0" />, so the test still gives the right result.)</>,
  },
  {
    working: <Katex display tex="\text{more than two asymptotes} \implies k\ne-5,\ -2,\ \tfrac32" />,
    reason: <>These are the part d.i. values. For every other <Katex tex="k" />, neither <Katex tex="x=k" /> nor <Katex tex="x=-2" /> solves the quadratic, so each real solution is a genuine stationary point. At <Katex tex="k=-5" /> and <Katex tex="k=\tfrac32" />, <Katex tex="\Delta=0" /> but the double root is <Katex tex="x=k" />, the hole, so there is no stationary point there either: it is the given condition that rules these two out.</>,
  },
  {
    working: <Katex display tex="\boxed{k < -5 \ \text{ or } \ k > \tfrac32}" />,
    reason: <><Katex tex="(k+5)(2k-3)" /> is an upright parabola in <Katex tex="k" /> with roots <Katex tex="-5" /> and <Katex tex="\tfrac32" />, so it is positive outside the roots. The inequalities are strict: at the endpoints the product is zero, not positive (and the given condition excludes them anyway).</>,
  },
]

export default function SpecialistQ1_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
        <p>
          Let <Katex tex="f(x)=\dfrac{(2x-3)(x+5)}{(x-1)(x+2)}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Partial Fractions"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)" /> in the form{' '}
            <Katex tex="A+\dfrac{Bx+C}{(x-1)(x+2)}" />, where <Katex tex="A" />,{' '}
            <Katex tex="B" /> and <Katex tex="C" /> are real constants.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={2}
        statement={<>State the equations of the asymptotes of the graph of <Katex tex="f" />.</>}
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
            Sketch the graph of <Katex tex="f" /> on the set of axes below. Label the
            asymptotes with their equations, and label the maximum turning point and the
            point of inflection with their coordinates, correct to two decimal places. Label
            the intercepts with the coordinate axes.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The default calculator window hides the whole middle branch">
          <WindowWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g_k(x)=\dfrac{(2x-3)(x+5)}{(x-k)(x+2)}" />, where <Katex tex="k" />{' '}
          is a real constant.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Asymptote Count"
        marks={2}
        statement={
          <>
            For what values of <Katex tex="k" /> will the graph of <Katex tex="g_k" /> have
            two asymptotes?
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
        <Explore title="Three ways to lose a vertical asymptote, not just k = −2">
          <AsymptotesWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Stationary Points"
        marks={2}
        statement={
          <>
            Given that the graph of <Katex tex="g_k" /> has more than two asymptotes, for
            what values of <Katex tex="k" /> will the graph of <Katex tex="g_k" /> have no
            stationary points?
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="The turning points squeeze into the hole at k = 3/2 and k = −5, then are gone">
          <TurningPointsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
