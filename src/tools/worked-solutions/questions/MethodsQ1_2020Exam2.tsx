// 2020 Mathematical Methods — Exam 2, Section B Question 1 (11 marks). A quartic with two
// repeated roots, its derivative, the reflection h, and the areas between the two. Question
// text transcribed from the original paper; all four figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2020e2-q1-graph.png'
import fprimeSrc from './meth-2020e2-q1c-fprime.png'
import fhSrc from './meth-2020e2-q1d-fh.png'
import shadedSrc from './meth-2020e2-q1e-shaded.png'

const EXAM_A: SAExaminerStats = {
  marks: [17, 83],
  average: 0.8,
  comment: (
    <>
      Some students assumed <Katex tex="a=\tfrac14" /> in their proof, rather than showing
      it. Others did not substitute <Katex tex="(0,4)" /> into the equation. Some incorrectly
      substituted <Katex tex="(2,0)" /> or <Katex tex="(-2,0)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      Some students tried to expand the function by hand and made algebraic errors. Others did
      not put the expression in the correct form. A common incorrect answer was
      <br />
      <Katex tex="f(x)=\dfrac14x^4-8x^2+16" />
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [16, 84],
  average: 0.8,
  comment: (
    <>
      Some students did not write a rule. An equation was required. Others solved{' '}
      <Katex tex="f'(x)=0" /> for <Katex tex="x" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [19, 26, 55],
  average: 1.4,
  comment: (
    <>
      An exact value was required. Some students found the <Katex tex="x" /> value but did
      not find the minimum gradient. Others wrote the coordinates of the turning point,
      without specifying which value was the minimum gradient.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Most students were able to describe the transformations. Some were not able to provide a
      suitable written description for the transformations or did not have them in the correct
      order. A common incorrect answer was reflected in the <Katex tex="y" />-axis.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: <>Exact values were required.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Some students used <Katex tex="f(x)-h(x)" />. Sometimes <Katex tex="dx" /> was missing or
      the functions were called by other names, such as <Katex tex="g(x)" />, without being
      defined.
      <br />
      There was some poor use of brackets, for example:{' '}
      <Katex tex="\displaystyle2\int_{\sqrt2}^{\sqrt6}h(x)\,dx-\int_{\sqrt2}^{\sqrt6}f(x)\,dx\ne2\int_{\sqrt2}^{\sqrt6}\bigl(h(x)-f(x)\bigr)dx" />.
      <br />
      There was no need to write out the full expressions for <Katex tex="f(x)" /> and{' '}
      <Katex tex="h(x)" />. This often led to transcription errors. Likewise, it was not
      necessary to substitute{' '}
      <Katex tex="h(x)-f(x)=-\tfrac12(x+2)^2(x-2)^2+2=-\tfrac{x^4}{2}+4x^2-6" />. This often led
      to algebraic errors.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Some students gave the response of 2.71. Some students forgot to multiply by 2, giving 1.36
      as the answer.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [71, 6, 23],
  average: 0.5,
  comment: (
    <>
      Some students gave exact values for their answers:{' '}
      <Katex tex="-\sqrt{4+2\sqrt2}\le x\le-\sqrt{4-2\sqrt2},\ \sqrt{4-2\sqrt2}\le x\le\sqrt{4+2\sqrt2}" />.
      <br />
      Others had incorrect inequality signs. Some had extra solutions or only gave the values of{' '}
      <Katex tex="x" /> for when <Katex tex="D=2" /> units.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(0,4) \text{ on the graph} \implies f(0) = 4" />,
    reason: <>The <Katex tex="y" />-intercept is the only labelled point that is not a root, so it is the one that fixes <Katex tex="a" />. Substituting <Katex tex="(\pm2,0)" /> gives <Katex tex="0=0" /> and tells you nothing.</>,
  },
  {
    working: <Katex display tex="a(0+2)^2(0-2)^2 = 4" />,
    reason: <>Substituting into the rule.</>,
  },
  {
    working: <Katex display tex="a(4)(4) = 16a = 4" />,
    reason: <>Both squares are 4.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac14}" />,
    reason: <>As required. Shown, not assumed — the report notes some students assumed <Katex tex="a=\tfrac14" /> in their proof rather than showing it.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^2(x-2)^2 = \bigl[(x+2)(x-2)\bigr]^2" />,
    reason: <>Pairing the brackets first turns this into one difference of squares, then one square — far less error-prone than expanding two quadratics.</>,
  },
  {
    working: <Katex display tex="= \left(x^2-4\right)^2 = x^4-8x^2+16" />,
    reason: <>The middle term is <Katex tex="2\times x^2\times(-4)" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \tfrac14\left(x^4-8x^2+16\right)" />,
    reason: <>The <Katex tex="\tfrac14" /> must be distributed across <em>all three</em> terms — the report's common wrong answer keeps it on the first only.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = \tfrac14x^4-2x^2+4}" />,
    reason: <>So <Katex tex="b=-2" /> and <Katex tex="c=4" />, both integers ✓.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \tfrac14x^4-2x^2+4" />,
    reason: <>Differentiating part b. is much quicker than the product rule on the factorised form.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = x^3-4x}" />,
    reason: <>Or, factorised, <Katex tex="x(x-2)(x+2)" /> — which matches the printed graph's intercepts at <Katex tex="-2" />, <Katex tex="0" /> and <Katex tex="2" />. Write it as a <em>rule</em>, not a solved equation.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{minimise } f'(x) \implies \text{solve } f''(x) = 0" />,
    reason: <>The question asks for the minimum of the <em>derivative</em> graph, so differentiate once more.</>,
  },
  {
    working: <Katex display tex="f''(x) = 3x^2-4 = 0 \implies x = \pm\frac{2}{\sqrt3} = \pm\frac{2\sqrt3}{3}" />,
    reason: <>Only the positive root lies in <Katex tex="(0,2)" />.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\tfrac{2\sqrt3}{3}\right) = \left(\tfrac{2\sqrt3}{3}\right)^3-4\left(\tfrac{2\sqrt3}{3}\right)" />,
    reason: <>Substituting back into <Katex tex="f'" />, not into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac{8\cdot3\sqrt3}{27}-\tfrac{8\sqrt3}{3} = \tfrac{8\sqrt3}{9}-\tfrac{24\sqrt3}{9}" />,
    reason: <><Katex tex="\left(2\sqrt3\right)^3=8\times3\sqrt3=24\sqrt3" />, over <Katex tex="27" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{16\sqrt3}{9}}" />,
    reason: <>An exact value, and a <em>gradient</em> — not a coordinate pair. About <Katex tex="-3.08" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = -f(x)+2" />,
    reason: <>Comparing the rules: <Katex tex="h" /> is <Katex tex="f" /> negated, then lifted by 2.</>,
  },
  {
    working: <Katex display tex="f(x) \to -f(x): \text{ reflection in the } x\text{-axis}" />,
    reason: <>Negating the <em>output</em> flips vertically. Reflecting in the <Katex tex="y" />-axis would negate the input and change nothing here, since <Katex tex="f" /> is even — the report's common error.</>,
  },
  {
    working: <Katex display tex="-f(x) \to -f(x)+2: \text{ translation } 2 \text{ units up}" />,
    reason: <>In this order.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{reflect in the } x\text{-axis, then translate } 2 \text{ units up}}" />,
    reason: <>The other valid order, which the report also gives, is translate 2 units <em>down</em> first, then reflect in the <Katex tex="x" />-axis — reflecting changes the sign of a later shift, so the order and the direction go together.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = h(x) \implies \tfrac14\left(x^2-4\right)^2 = -\tfrac14\left(x^2-4\right)^2+2" />,
    reason: <>Setting the two rules equal.</>,
  },
  {
    working: <Katex display tex="\tfrac12\left(x^2-4\right)^2 = 2 \implies \left(x^2-4\right)^2 = 4" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="x^2-4 = \pm2 \implies x^2 = 6 \text{ or } x^2 = 2" />,
    reason: <>Both signs matter — this is where the four solutions come from.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\sqrt6,\ -\sqrt2,\ \sqrt2,\ \sqrt6}" />,
    reason: <>Exact values, as required. Numerically <Katex tex="\pm1.41" /> and <Katex tex="\pm2.45" />, matching the four crossings in the figure.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{in the shaded regions } h(x) > f(x)" />,
    reason: <>Between <Katex tex="\sqrt2" /> and <Katex tex="\sqrt6" /> the curve <Katex tex="h" /> is on top, so the integrand is <Katex tex="h-f" />, not <Katex tex="f-h" />.</>,
  },
  {
    working: <Katex display tex="\text{both regions are congruent (both functions are even)}" />,
    reason: <>So one integral doubled does the job.</>,
  },
  {
    working: <Katex display tex="\boxed{2\int_{\sqrt2}^{\sqrt6}\bigl(h(x)-f(x)\bigr)dx}" />,
    reason: <>Equivalently <Katex tex="\int_{-\sqrt6}^{-\sqrt2}(h-f)\,dx+\int_{\sqrt2}^{\sqrt6}(h-f)\,dx" />. Keep the brackets around <Katex tex="h(x)-f(x)" />, and there is no need to substitute the rules in — the report notes both led to errors.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">2·∫(h(x) - f(x), x, √2, √6)</Cas>,
    reason: <>Straight from part e.ii.</>,
  },
  {
    working: <Katex display tex="= \frac{112\sqrt2}{15}-\frac{16\sqrt6}{5} = 2.7210\ldots" />,
    reason: <>The exact form, though the question asks only for a decimal.</>,
  },
  {
    working: <Katex display tex="\boxed{2.72}" />,
    reason: <>To two decimal places. The report notes some students forgot to multiply by 2, giving <Katex tex="1.36" />, and some gave <Katex tex="2.71" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="D = |h(x)-f(x)|" />,
    reason: <>Vertical distance, so a magnitude — and the two curves swap over, which is what makes the absolute value necessary.</>,
  },
  {
    working: <Katex display tex="h(x)-f(x) = 2-\tfrac12\left(x^2-4\right)^2" />,
    reason: <>From part e.i.'s algebra.</>,
  },
  {
    working: <Katex display tex="D \le 2 \iff -2 \le 2-\tfrac12\left(x^2-4\right)^2 \le 2" />,
    reason: <>"At most 2 units" is <Katex tex="\le" />, giving a closed interval.</>,
  },
  {
    working: <Katex display tex="\text{right inequality: } \left(x^2-4\right)^2 \ge 0, \text{ always true}" />,
    reason: <>So only the left one bites.</>,
  },
  {
    working: <Katex display tex="\tfrac12\left(x^2-4\right)^2 \le 4 \implies \left|x^2-4\right| \le 2\sqrt2" />,
    reason: <>Taking square roots.</>,
  },
  {
    working: <Katex display tex="4-2\sqrt2 \le x^2 \le 4+2\sqrt2" />,
    reason: <>Which gives two symmetric bands in <Katex tex="x" />, not one.</>,
  },
  {
    working: <Katex display tex="\boxed{-2.61 \le x \le -1.08 \ \text{ and } \ 1.08 \le x \le 2.61}" />,
    reason: <>To two decimal places, from <Katex tex="\pm\sqrt{4\pm2\sqrt2}" />. Only 23% of students scored both marks.</>,
  },
]

export default function MethodsQ1_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=a(x+2)^2(x-2)^2" />, where{' '}
          <Katex tex="a\in R" />. Part of the graph of <Katex tex="f" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A W-shaped quartic touching the x-axis at (−2, 0) and (2, 0) with a local maximum at (0, 4) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Find Parameter" marks={1} statement={<>Show that <Katex tex="a=\tfrac14" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Expansion"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)=\tfrac14(x+2)^2(x-2)^2" /> in the form{' '}
            <Katex tex="f(x)=\tfrac14x^4+bx^2+c" />, where <Katex tex="b" /> and{' '}
            <Katex tex="c" /> are integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>Part of the graph of the derivative function <Katex tex="f'" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={fprimeSrc}
            alt="A cubic curve labelled f prime, crossing the x-axis at (−2, 0), the origin and (2, 0) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        topic="Derivative"
        marks={1}
        statement={<>Write the rule for <Katex tex="f'" /> in terms of <Katex tex="x" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Minimum Value"
        marks={2}
        statement={
          <>
            Find the minimum value of the graph of <Katex tex="f'" /> on the interval{' '}
            <Katex tex="x\in(0,2)" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=-\tfrac14(x+2)^2(x-2)^2+2" />. Parts
          of the graphs of <Katex tex="f" /> and <Katex tex="h" /> are shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={fhSrc}
            alt="The W-shaped quartic f together with its reflection h, an M-shaped curve, crossing at four points — from the original 2020 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Transformations"
        marks={1}
        statement={
          <>
            Write a sequence of two transformations that map the graph of <Katex tex="f" />{' '}
            onto the graph of <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={shadedSrc}
            alt="The graphs of f and h with the two regions between them shaded, one either side of the y-axis, each between the intersections near x = ±√2 and x = ±√6 — from the original 2020 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.i"
        topic="Intersections"
        marks={1}
        statement={
          <>
            State the values of <Katex tex="x" /> for which the graphs of <Katex tex="f" />{' '}
            and <Katex tex="h" /> intersect.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            Write down a definite integral that will give the total area of the shaded regions
            in the graph above.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="e.iii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Find the total area of the shaded regions in the graph above. Give your answer
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Vertical Distance"
        marks={2}
        statement={
          <>
            Let <Katex tex="D" /> be the vertical distance between the graphs of{' '}
            <Katex tex="f" /> and <Katex tex="h" />.
            <br />
            Find all values of <Katex tex="x" /> for
            which <Katex tex="D" /> is at most 2 units. Give your answers correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
