// 2021 Mathematical Methods — Exam 2, Section B Question 1 (14 marks). The open-topped box
// cut from a rectangular sheet: volume, domain, maximum, waste, then the same in terms of h
// and for a square sheet. Question text transcribed from the original paper; both figures
// are crops of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import sheetSrc from './meth-2021e2-q1-sheet.png'
import boxSrc from './meth-2021e2-q1-box.png'

const EXAM_A: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students could not identify the dimensions
      correctly. Others used brackets incorrectly or omitted brackets, for example{' '}
      <Katex tex="x\times25-2x\times50-2x" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [58, 42],
  average: 0.4,
  comment: (
    <>
      <Katex tex="(0,25)" /> was often seen. Some students had incorrect brackets, for
      example <Katex tex="(0,12.5]" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was well done. Some incorrectly wrote{' '}
      <Katex tex="12x^2-300x+12\,500" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [17, 13, 21, 49],
  average: 2,
  comment: (
    <>
      Exact values were required. Some students found the <Katex tex="x" />-value but did
      not find the maximum volume. Others chose the incorrect <Katex tex="x" />-value,{' '}
      <Katex tex="\tfrac{25\sqrt3}{6}+\tfrac{25}{2}" />, to find the volume.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [35, 19, 46],
  average: 1.1,
  comment: (
    <>
      Some students used volume and not area in the denominator. Many were able to work out
      that 100 cm² was cut out. Some were not able to convert their fraction to a
      percentage: 0.08% was often seen.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [67, 33],
  average: 0.4,
  comment: (
    <>
      Some students gave the equation and not the domain. Others had incorrect brackets.{' '}
      <Katex tex="(0,25h)" /> was sometimes seen.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [42, 13, 12, 33],
  average: 1.4,
  comment: (
    <>
      Many students were able to find the formula{' '}
      <Katex tex="V=x(h-2x)(2h-2x)" />. Some chose the incorrect{' '}
      <Katex tex="x" />-value, <Katex tex="\tfrac{h\left(3+\sqrt3\right)}{6}" />, and then
      gave a negative volume.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [55, 10, 35],
  average: 0.8,
  comment: (
    <>
      Some students were able to find the correct formula <Katex tex="V=x(h-2x)^2" />. Some
      did not show adequate working for a "show that" question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{base dimensions: } (h-2x) \text{ by } (2h-2x), \ \text{height } x" />,
    reason: <>Each dimension loses <Katex tex="x" /> from <em>both</em> ends, hence <Katex tex="-2x" /> twice; the cut squares become the walls, so the height is <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="h = 25: \ V = x(25-2x)(50-2x)" />,
    reason: <>The length is <Katex tex="2h=50" />.</>,
  },
  {
    working: <Katex display tex="50-2x = 2(25-x)" />,
    reason: 'Factoring the 2 out is what turns the expression into the required form.',
  },
  {
    working: <Katex display tex="\boxed{V_{\text{box}}(x) = 2x(25-2x)(25-x)} \ \checkmark" />,
    reason: <>Note <Katex tex="(25-2x)" /> and <Katex tex="(25-x)" /> are <em>different</em> brackets — they come from the width and the halved length.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x > 0 \ \text{ (given)}" />,
    reason: 'A square of zero side is not a cut.',
  },
  {
    working: <Katex display tex="25-2x > 0 \implies x < 12.5" />,
    reason: <>The <em>width</em> is the binding constraint: it runs out first, at <Katex tex="12.5" />, while the length only runs out at 25. That is why <Katex tex="(0,25)" /> is wrong.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 12.5)}" />,
    reason: <>Both ends open, since <Katex tex="V_{\text{box}}>0" /> is assumed and the volume is zero at each end.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = 2x(25-2x)(25-x) = 2x\left(625-75x+2x^2\right)" />,
    reason: 'Expanding the two brackets first is safer than a double product rule.',
  },
  {
    working: <Katex display tex="V = 4x^3-150x^2+1250x" />,
    reason: <>Distributing the <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V' = 12x^2-300x+1250}" />,
    reason: <>The constant term is <Katex tex="1250" />, not <Katex tex="12\,500" /> — the report's named slip.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="12x^2-300x+1250 = 0 \implies 6x^2-150x+625 = 0" />,
    reason: 'Halving keeps the numbers manageable.',
  },
  {
    working: <Katex display tex="x = \frac{150\pm\sqrt{22\,500-15\,000}}{12} = \frac{150\pm50\sqrt3}{12} = \frac{25}{2}\pm\frac{25\sqrt3}{6}" />,
    reason: <><Katex tex="\sqrt{7500}=50\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{25}{2}+\tfrac{25\sqrt3}{6} \approx 19.7 \ \text{ is outside } (0,12.5)" />,
    reason: 'Part b. is what rules it out — using it gives a negative volume, the report\u2019s common error.',
  },
  {
    working: <Katex display tex="x = \tfrac{25}{2}-\tfrac{25\sqrt3}{6} = \tfrac{25\left(3-\sqrt3\right)}{6} \approx 5.28\ \text{cm}" />,
    reason: 'The only stationary point in the domain, so it must be the maximum.',
  },
  {
    working: <Cas fn="fMax">fMax(4x³ − 150x² + 1250x, x) | 0 &lt; x &lt; 12.5</Cas>,
    reason: 'Or read both off the CAS directly.',
  },
  {
    working: <Katex display tex="\boxed{V_{\max} = \frac{15\,625\sqrt3}{9}\ \text{cm}^3 \approx 3007\ \text{cm}^3 \ \text{ at } x = \frac{25\left(3-\sqrt3\right)}{6}}" />,
    reason: <>Exact values were required — and the question asks for <em>both</em> the volume and the <Katex tex="x" /> at which it occurs.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{waste} = 4x^2 = 4(5)^2 = 100\ \text{cm}^2" />,
    reason: 'Four corner squares of side 5.',
  },
  {
    working: <Katex display tex="\text{sheet area} = 25\times50 = 1250\ \text{cm}^2" />,
    reason: <>Area, not volume — the denominator the report says some students got wrong.</>,
  },
  {
    working: <Katex display tex="\frac{100}{1250}\times100\% = \boxed{8\%}" />,
    reason: <>Multiply by 100 to convert: <Katex tex="\tfrac{100}{1250}=0.08" /> is the <em>fraction</em>, and writing "0.08%" loses the mark.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="V = x(h-2x)(2h-2x), \quad x>0" />,
    reason: 'The same construction, with the width left as h.',
  },
  {
    working: <Katex display tex="h-2x > 0 \implies x < \tfrac{h}{2}" />,
    reason: 'Again the width binds before the length.',
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ \tfrac{h}{2}\right)}" />,
    reason: <>The <em>domain</em>, not the rule — a distinction two-thirds of students missed.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="V = x(h-2x)(2h-2x) = 4x^3-6hx^2+2h^2x" />,
    reason: 'Expanding with h as a constant.',
  },
  {
    working: <Katex display tex="V' = 12x^2-12hx+2h^2 = 0 \implies 6x^2-6hx+h^2 = 0" />,
    reason: 'A quadratic in x with h as a parameter.',
  },
  {
    working: <Katex display tex="x = \frac{6h\pm\sqrt{36h^2-24h^2}}{12} = \frac{h\left(3\pm\sqrt3\right)}{6}" />,
    reason: <><Katex tex="\sqrt{12h^2}=2h\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\frac{3-\sqrt3}{6} \approx 0.211 < \tfrac12 \ \checkmark; \qquad \frac{3+\sqrt3}{6} \approx 0.789 > \tfrac12 \ \times" />,
    reason: <>Part f(i)'s domain picks the first root — exactly as <Katex tex="h=25" /> did in part d.</>,
  },
  {
    working: <Katex display tex="V\!\left(\tfrac{h\left(3-\sqrt3\right)}{6}\right) = \boxed{\frac{\sqrt3\,h^3}{9}}" />,
    reason: <>Check against part d.: <Katex tex="h=25" /> gives <Katex tex="\tfrac{15\,625\sqrt3}{9}" /> ✓.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{square sheet: base } (h-2x) \text{ by } (h-2x), \text{ height } x" />,
    reason: <>Both sides are now <Katex tex="h" />, so the base is a square.</>,
  },
  {
    working: <Katex display tex="V = x(h-2x)^2" />,
    reason: 'The formula that must be written down before anything else.',
  },
  {
    working: <Katex display tex="V' = (h-2x)^2+x\cdot2(h-2x)(-2)" />,
    reason: 'Product rule; the chain rule supplies the inner derivative −2.',
  },
  {
    working: <Katex display tex="= (h-2x)\bigl[(h-2x)-4x\bigr] = (h-2x)(h-6x)" />,
    reason: <>Factoring out <Katex tex="(h-2x)" /> avoids expanding a cubic.</>,
  },
  {
    working: <Katex display tex="V' = 0 \implies x = \tfrac{h}{2} \text{ or } x = \tfrac{h}{6}" />,
    reason: <><Katex tex="x=\tfrac h2" /> is the excluded endpoint of the domain <Katex tex="\left(0,\tfrac h2\right)" />, where the box has zero base.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{h}{6}} \ \checkmark" />,
    reason: <>The only stationary point inside the domain, so it gives the maximum. Saying why <Katex tex="\tfrac h2" /> is rejected is part of the "show that".</>,
  },
]

export default function MethodsQ1_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (14 marks)</p>
        <p>
          A rectangular sheet of cardboard has a width of <Katex tex="h" /> centimetres. Its
          length is twice its width. Squares of side length <Katex tex="x" /> centimetres,
          where <Katex tex="x>0" />, are cut from each of the corners, as shown in the
          diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sheetSrc}
            alt="A rectangle labelled h cm high and 2h cm wide with a small square of side x cm marked at each corner by dashed lines — from the original 2021 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
        <p>
          The sides of this sheet of cardboard are then folded up to make a rectangular box
          with an open top, as shown in the diagram below. Assume that the thickness of the
          cardboard is negligible and that <Katex tex="V_{\text{box}}>0" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={boxSrc}
            alt="An open-topped rectangular box drawn in perspective — from the original 2021 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
        <p>A box is to be made from a sheet of cardboard with <Katex tex="h=25" /> cm.</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Show that the volume, <Katex tex="V_{\text{box}}" />, in cubic centimetres, is
            given by <Katex tex="V_{\text{box}}(x)=2x(25-2x)(25-x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={<>State the domain of <Katex tex="V_{\text{box}}" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Find the derivative of <Katex tex="V_{\text{box}}" /> with respect to{' '}
            <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            Calculate the maximum possible volume of the box and for which value of{' '}
            <Katex tex="x" /> this occurs.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Waste minimisation is a goal when making cardboard boxes. Percentage wasted is
            based on the area of the sheet of cardboard that is cut out before the box is
            made. Find the percentage of the sheet of cardboard that is wasted when{' '}
            <Katex tex="x=5" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Now consider a box made from a rectangular sheet of cardboard where{' '}
          <Katex tex="h>0" /> and the box's length is still twice its width.
        </p>
      </div>

      <PartCard
        letter="f.i"
        marks={1}
        statement={
          <>
            Let <Katex tex="V_{\text{box}}" /> be the function that gives the volume of the
            box. State the domain of <Katex tex="V_{\text{box}}" /> in terms of{' '}
            <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        marks={3}
        statement={
          <>
            Find the maximum volume for any such rectangular box,{' '}
            <Katex tex="V_{\text{box}}" />, in terms of <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="g"
        marks={2}
        statement={
          <>
            Now consider making a box from a square sheet of cardboard with side lengths of{' '}
            <Katex tex="h" /> centimetres. Show that the maximum volume of the box occurs
            when <Katex tex="x=\tfrac{h}{6}" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
