// 2022 Mathematical Methods — Exam 2, Section B Question 5 (9 marks). A composite with an
// unknown outer function f, worked entirely from a table of values. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactives: d meth-2022e2-q5d-same-area (every possible g′ has area −2, so the same
// average −48/π; g′ at the ends says nothing about it); e meth-2022e2-q5e-two-factors (each
// factor of g′ gives two zeros in [0, π]; the next ones are past π). Both audited 9 Oct 2026
// (numbers re-derived with sympy) and kept. Report commentary, checks and the teacher's
// explanations live in each row's `more` (Detailed only); `reason` is what Concise needs.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SameAreaWidget = lazyWidget(() => import('../interactives/meth-2022e2-q5d-same-area'))
const TwoFactorsWidget = lazyWidget(() => import('../interactives/meth-2022e2-q5e-two-factors'))

const EXAM_A: SAExaminerStats = {
  marks: [36, 64],
  average: 0.6,
  comment: (
    <>
      This question was answered well. A common incorrect answer was{' '}
      <Katex tex="g\!\left(\tfrac\pi6\right)=\tfrac{\sqrt3}{2}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: (
    <>
      Some students did not show enough working.{' '}
      <Katex tex="2\cos\!\left(\tfrac\pi3\right)" /> was sometimes ignored.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 8, 41],
  average: 0.9,
  comment: (
    <>
      An equation was required. Some used{' '}
      <Katex tex="\left(\tfrac\pi6,\tfrac{\sqrt3}{2}\right)" /> or{' '}
      <Katex tex="\left(\tfrac\pi6,\tfrac19\right)" />.
      <br />
      Others wrote <Katex tex="y=\tfrac x9-\tfrac{162+\pi}{54}" /> or{' '}
      <Katex tex="y=\tfrac x9-\tfrac{\pi}{36}+3" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [70, 7, 23],
  average: 0.6,
  comment: (
    <>
      Those who used the average value formula were generally successful.
      <br />
      Some students substituted into <Katex tex="g'(x)" />, not <Katex tex="g(x)" />.
      <br />
      <Katex tex="\dfrac{g'\left(\frac\pi6\right)-g'\left(\frac\pi8\right)}{\frac\pi6-\frac\pi8}" /> was
      occasionally seen. <Katex tex="\tfrac{24}{\pi}(3-5)=\tfrac{24}{\pi}-2" /> was a common
      incorrect answer.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [62, 12, 4, 22],
  average: 0.9,
  comment: (
    <>
      Some students were able to find <Katex tex="x=\tfrac\pi4,\tfrac{3\pi}{4}" />. Others
      solved <Katex tex="2\cos(2x)=0" /> or <Katex tex="f'(\sin(2x))=0" /> but not both.
      Some gave values outside the domain.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = f\bigl(\sin(2x)\bigr) \implies g\!\left(\tfrac\pi6\right) = f\!\left(\sin\!\left(\tfrac\pi3\right)\right)" />,
    reason: <>Work from the inside out: substitute <Katex tex="x=\tfrac\pi6" /> into <Katex tex="\sin(2x)" /> first, so <Katex tex="2x=\tfrac\pi3" />.</>,
    more: <>Every part of this question works the same way. <Katex tex="f" /> is unknown, so the only way to get a value of <Katex tex="g" /> (or <Katex tex="g'" />) is to work out the input <Katex tex="\sin(2x)" />, then look up <Katex tex="f" /> (or <Katex tex="f'" />) at that input in the table. The <Katex tex="x" />-values in the question are chosen so that <Katex tex="\sin(2x)" /> lands exactly on a column of the table.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}" />,
    reason: <>Exact value. This is the <em>input</em> to <Katex tex="f" />, not the answer yet.</>,
    more: <>The report notes <Katex tex="g\left(\tfrac\pi6\right)=\tfrac{\sqrt3}{2}" /> as a common incorrect answer. Stopping here gives the value of the inside function <Katex tex="\sin(2x)" />, not of <Katex tex="g" />: <Katex tex="f" /> still has to be applied to it.</>,
  },
  {
    working: <Katex display tex="\boxed{g\!\left(\tfrac\pi6\right) = f\!\left(\tfrac{\sqrt3}{2}\right) = 3}" />,
    reason: <>Read off the table: in the column <Katex tex="x=\tfrac{\sqrt3}{2}" />, the <Katex tex="f(x)" /> row gives <Katex tex="3" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2\cos(2x)\,f'\bigl(\sin(2x)\bigr)" />,
    reason: <>Given in the stem (it is the chain rule applied to <Katex tex="f\bigl(\sin(2x)\bigr)" />).</>,
    more: <>Where it comes from: the chain rule differentiates the outside function and keeps the inside, giving <Katex tex="f'\bigl(\sin(2x)\bigr)" />, then multiplies by the derivative of the inside, <Katex tex="\tfrac{d}{dx}\sin(2x)=2\cos(2x)" />.</>,
  },
  {
    working: <Katex display tex="g'\!\left(\tfrac\pi6\right) = 2\cos\!\left(\tfrac\pi3\right)f'\!\left(\sin\!\left(\tfrac\pi3\right)\right)" />,
    reason: <>Substitute <Katex tex="x=\tfrac\pi6" /> into both factors, so <Katex tex="2x=\tfrac\pi3" /> in each.</>,
    more: <>The report notes that some students did not show enough working and that <Katex tex="2\cos\left(\tfrac\pi3\right)" /> was sometimes ignored. Because <Katex tex="2\cos\left(\tfrac\pi3\right)=1" />, dropping it still lands on <Katex tex="\tfrac19" />. But in a &ldquo;show that&rdquo; the answer is already given, so the mark is for the working: every factor must be substituted and evaluated on the page.</>,
  },
  {
    working: <Katex display tex="= 2\times\tfrac12\times f'\!\left(\tfrac{\sqrt3}{2}\right) = 1\times\tfrac19" />,
    reason: <><Katex tex="\cos\tfrac\pi3=\tfrac12" /> and <Katex tex="\sin\tfrac\pi3=\tfrac{\sqrt3}{2}" />; the table gives <Katex tex="f'\!\left(\tfrac{\sqrt3}{2}\right)=\tfrac19" /> (the <Katex tex="f'(x)" /> row, not the <Katex tex="f(x)" /> row).</>,
  },
  {
    working: <Katex display tex="\boxed{g'\!\left(\tfrac\pi6\right) = \tfrac19}" />,
    reason: <>Both substitutions are written out, as a &ldquo;show that&rdquo; needs. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{point } \left(\tfrac\pi6,\ 3\right), \quad \text{gradient } \tfrac19" />,
    reason: <>The point on <Katex tex="g" /> is <Katex tex="\left(\tfrac\pi6,\ g\left(\tfrac\pi6\right)\right)" />, with <Katex tex="g\left(\tfrac\pi6\right)=3" /> from part a.; the gradient is <Katex tex="g'\left(\tfrac\pi6\right)=\tfrac19" /> from part b.</>,
    more: <>The report notes some used <Katex tex="\left(\tfrac\pi6,\tfrac{\sqrt3}{2}\right)" /> or <Katex tex="\left(\tfrac\pi6,\tfrac19\right)" />. Neither point is on the graph of <Katex tex="g" />: <Katex tex="\tfrac{\sqrt3}{2}" /> is <Katex tex="\sin(2x)" /> at <Katex tex="x=\tfrac\pi6" /> (the input to <Katex tex="f" />, as in part a.), and <Katex tex="\tfrac19" /> is the gradient, not the <Katex tex="y" />-value.</>,
  },
  {
    working: <Katex display tex="y-3 = \tfrac19\left(x-\tfrac\pi6\right)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x}{9}-\frac{\pi}{54}+3}" />,
    reason: <>Expand: <Katex tex="\tfrac{1}{9}\times\tfrac\pi6=\tfrac{\pi}{54}" />, then add 3 to both sides.</>,
    more: <>The report notes that an equation was required, so finish with <Katex tex="y=\dots" />: the point and gradient alone are not the answer. Over a common denominator this is <Katex tex="y=\tfrac x9+\tfrac{162-\pi}{54}" />, since <Katex tex="3=\tfrac{162}{54}" />; the report gives both forms. Take care with the constants. The report lists <Katex tex="y=\tfrac x9-\tfrac{162+\pi}{54}" />, which is <Katex tex="\tfrac x9-3-\tfrac\pi{54}" /> (the 3 has the wrong sign), and <Katex tex="y=\tfrac x9-\tfrac{\pi}{36}+3" />, but <Katex tex="\tfrac19\times\tfrac\pi6" /> is <Katex tex="\tfrac\pi{54}" />, not <Katex tex="\tfrac\pi{36}" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value of } g' = \frac{1}{\tfrac\pi6-\tfrac\pi8}\int_{\pi/8}^{\pi/6}g'(x)\,dx" />,
    reason: <>The average value of a function <Katex tex="h" /> on <Katex tex="[a,b]" /> is <Katex tex="\tfrac{1}{b-a}\int_a^b h(x)\,dx" />; here <Katex tex="h=g'" />.</>,
    more: <>Picture it as the height of the rectangle on <Katex tex="\left[\tfrac\pi8,\tfrac\pi6\right]" /> with the same signed area as the graph of <Katex tex="g'" /> (area above the <Katex tex="x" />-axis counts as positive, below as negative). The report says <Katex tex="\tfrac{g'(\pi/6)-g'(\pi/8)}{\pi/6-\pi/8}" /> was occasionally seen: that is the average <em>rate of change</em> of <Katex tex="g'" />, which uses <Katex tex="g'" /> only at the two ends and is a different quantity.</>,
  },
  {
    working: <Katex display tex="\int_{\pi/8}^{\pi/6}g'(x)\,dx = \Bigl[g(x)\Bigr]_{\pi/8}^{\pi/6} = g\!\left(\tfrac\pi6\right)-g\!\left(\tfrac\pi8\right)" />,
    reason: <><Katex tex="f" /> is unknown, so there is no formula to integrate. But <Katex tex="g" /> is an antiderivative of <Katex tex="g'" />, so the integral is <Katex tex="g" /> (not <Katex tex="g'" />) evaluated at the ends: two table look-ups.</>,
    more: <>The report notes some students substituted into <Katex tex="g'(x)" />, not <Katex tex="g(x)" />. Integrating a derivative undoes it (the fundamental theorem of calculus): <Katex tex="\int_a^b g'(x)\,dx=g(b)-g(a)" />, the total change in <Katex tex="g" />. So the average value of <Katex tex="g'" /> is <Katex tex="\tfrac{g(\pi/6)-g(\pi/8)}{\pi/6-\pi/8}" />, the average rate of change of <Katex tex="g" />: the same shape as the incorrect formula above, but with <Katex tex="g" /> where it had <Katex tex="g'" />.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac\pi8\right) = f\!\left(\sin\!\left(\tfrac\pi4\right)\right) = f\!\left(\tfrac{\sqrt2}{2}\right) = 5" />,
    reason: <>As in part a.: <Katex tex="2\times\tfrac\pi8=\tfrac\pi4" />, <Katex tex="\sin\tfrac\pi4=\tfrac{\sqrt2}{2}" />, then read the <Katex tex="f(x)" /> row in the column <Katex tex="x=\tfrac{\sqrt2}{2}" />. Also <Katex tex="g\left(\tfrac\pi6\right)=3" /> from part a.</>,
  },
  {
    working: <Katex display tex="\tfrac\pi6-\tfrac\pi8 = \tfrac{4\pi-3\pi}{24} = \tfrac{\pi}{24}" />,
    reason: <>The width of the interval, so <Katex tex="\tfrac{1}{\pi/24}=\tfrac{24}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{24}{\pi}(3-5) = -\frac{48}{\pi}}" />,
    reason: <>The <Katex tex="\tfrac{24}{\pi}" /> multiplies the whole bracket: <Katex tex="\tfrac{24}{\pi}\times(-2)" />.</>,
    more: <>The report gives <Katex tex="\tfrac{24}{\pi}(3-5)=\tfrac{24}{\pi}-2" /> as a common incorrect answer: that subtracts 2 instead of multiplying by <Katex tex="-2" />. As a check, <Katex tex="-\tfrac{48}{\pi}\approx-15.3" /> is negative, which makes sense: <Katex tex="g" /> falls from 5 to 3 across the interval, so the total change in <Katex tex="g" /> is negative.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2\cos(2x)\,f'\bigl(\sin(2x)\bigr) = 0" />,
    reason: <>A product is zero when either factor is zero, so solve both cases.</>,
    more: <>The report notes some students solved <Katex tex="2\cos(2x)=0" /> or <Katex tex="f'(\sin(2x))=0" /> but not both. Each factor gives two solutions in <Katex tex="[0,\pi]" />, so solving only one of them finds only two of the four.</>,
  },
  {
    working: <Katex display tex="\text{case 1: } \cos(2x) = 0, \ x\in[0,\pi] \implies 2x = \tfrac\pi2,\ \tfrac{3\pi}{2}" />,
    reason: <>Since <Katex tex="x\in[0,\pi]" />, <Katex tex="2x\in[0,2\pi]" />: one full turn of the unit circle, where cosine is zero at <Katex tex="\tfrac\pi2" /> and <Katex tex="\tfrac{3\pi}{2}" /> only.</>,
  },
  {
    working: <Katex display tex="x = \tfrac\pi4, \ \tfrac{3\pi}{4}" />,
    reason: <>Halve each angle.</>,
    more: <>These are genuine solutions even though <Katex tex="f" /> is unknown: <Katex tex="f" /> is differentiable everywhere, so <Katex tex="f'\bigl(\sin(2x)\bigr)" /> is some number, and zero times a number is zero.</>,
  },
  {
    working: <Katex display tex="\text{case 2: } f'\bigl(\sin(2x)\bigr) = 0 \ \text{ if } \ \sin(2x) = \tfrac{\sqrt2}{2}" />,
    reason: <>The table gives <Katex tex="f'\!\left(\tfrac{\sqrt2}{2}\right)=0" />, the only zero of <Katex tex="f'" /> it shows, so the second factor is zero if its input, <Katex tex="\sin(2x)" />, equals <Katex tex="\tfrac{\sqrt2}{2}" />.</>,
    more: <>The other two columns, <Katex tex="f'\left(\tfrac12\right)=7" /> and <Katex tex="f'\left(\tfrac{\sqrt3}{2}\right)=\tfrac19" />, are not zero, so they give nothing. Because <Katex tex="f" /> is unknown, <Katex tex="f'" /> may have other zeros that the table doesn&rsquo;t show, which is why the question asks for four solutions rather than all of them.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac\pi4,\ \tfrac{3\pi}{4} \implies x = \tfrac\pi8, \ \tfrac{3\pi}{8}" />,
    reason: <>For <Katex tex="2x\in[0,2\pi]" />, sine is <Katex tex="\tfrac{\sqrt2}{2}" /> in the first and second quadrants: <Katex tex="\tfrac\pi4" /> and <Katex tex="\pi-\tfrac\pi4=\tfrac{3\pi}{4}" />. Then halve.</>,
    more: <>The report notes some students gave values outside the domain. The next angles, <Katex tex="2x=\tfrac{9\pi}{4}" /> and <Katex tex="\tfrac{11\pi}{4}" />, are past <Katex tex="2\pi" /> and give <Katex tex="x=\tfrac{9\pi}{8}" /> and <Katex tex="\tfrac{11\pi}{8}" />, both bigger than <Katex tex="\pi" />. Likewise in case 1 the next solution, <Katex tex="x=\tfrac{5\pi}{4}" />, is past <Katex tex="\pi" />. Doubling the domain first, <Katex tex="2x\in[0,2\pi]" />, is what keeps these out.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac\pi8,\ \tfrac\pi4,\ \tfrac{3\pi}{8},\ \tfrac{3\pi}{4}}" />,
    reason: <>Four solutions, all inside <Katex tex="[0,\pi]" />.</>,
  },
]

export default function MethodsQ5_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (9 marks)</p>
        <p>
          Consider the composite function <Katex tex="g(x)=f\bigl(\sin(2x)\bigr)" />, where
          the function <Katex tex="f(x)" /> is an unknown but differentiable function for all
          values of <Katex tex="x" />.
          <br />
          Use the following table of values for{' '}
          <Katex tex="f" /> and <Katex tex="f'" />.
        </p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                  <Katex tex="x" />
                </td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                  <Katex tex="\tfrac12" />
                </td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                  <Katex tex="\tfrac{\sqrt2}{2}" />
                </td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                  <Katex tex="\tfrac{\sqrt3}{2}" />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                  <Katex tex="f(x)" />
                </td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">−2</td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">5</td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">3</td>
              </tr>
              <tr>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                  <Katex tex="f'(x)" />
                </td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">7</td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">0</td>
                <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                  <Katex tex="\tfrac19" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Composite Function"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="g\!\left(\tfrac\pi6\right)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The derivative of <Katex tex="g" /> with respect to <Katex tex="x" /> is given by{' '}
          <Katex tex="g'(x)=2\cdot\cos(2x)\cdot f'\bigl(\sin(2x)\bigr)" />.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={1}
        statement={
          <>
            Show that <Katex tex="g'\!\left(\tfrac\pi6\right)=\tfrac19" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent Line"
        marks={2}
        statement={
          <>
            Find the equation of the tangent to <Katex tex="g" /> at{' '}
            <Katex tex="x=\tfrac\pi6" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average value of the derivative function <Katex tex="g'(x)" /> between{' '}
            <Katex tex="x=\tfrac\pi8" /> and <Katex tex="x=\tfrac\pi6" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Whatever g′ looks like, its signed area is g(π/6) − g(π/8) = −2, so its average is fixed">
          <SameAreaWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Stationary Points"
        marks={3}
        statement={
          <>
            Find <b>four</b> solutions to the equation <Katex tex="g'(x)=0" /> for the interval{' '}
            <Katex tex="x\in[0,\pi]" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="g′(x) is zero when either factor is — and each factor gives two solutions in [0, π]">
          <TwoFactorsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
