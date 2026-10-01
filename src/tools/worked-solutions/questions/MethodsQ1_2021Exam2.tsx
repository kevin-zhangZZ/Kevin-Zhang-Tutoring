// 2021 Mathematical Methods — Exam 2, Section B Question 1 (14 marks). The open-topped box
// cut from a rectangular sheet: volume, domain, maximum, waste, then the same in terms of h
// and for a square sheet. Question text transcribed from the original paper; both figures
// are crops of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactives: f.ii meth-2021e2-q1fii-two-roots (only one root of V' = 0 is a box; the other
// gives V < 0).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import sheetSrc from './meth-2021e2-q1-sheet.png'
import boxSrc from './meth-2021e2-q1-box.png'

const TwoRootsWidget = lazyWidget(() => import('../interactives/meth-2021e2-q1fii-two-roots'))

const EXAM_A: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well.
      <br />
      Some students could not identify the dimensions correctly. Others used brackets
      incorrectly or omitted brackets, for example: <Katex tex="x\times25-2x\times50-2x" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [58, 42],
  average: 0.4,
  comment: (
    <>
      <Katex tex="(0,25)" /> was often seen. Some students had incorrect brackets, for
      example, <Katex tex="(0,12.5]" />.
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
      <br />
      There were some transcription errors:{' '}
      <Katex tex="x=\tfrac{-25\left(\sqrt3+3\right)}{6}" /> was often seen.
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
      Some students gave the equation, <Katex tex="V=x(h-2x)(2h-2x)" />, and not the
      domain. Others had incorrect brackets. <Katex tex="(0,25h)" /> was sometimes seen.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [42, 13, 12, 33],
  average: 1.4,
  comment: (
    <>
      Many students were able to find the formula, <Katex tex="V=x(h-2x)(2h-2x)" />. Some
      chose the incorrect <Katex tex="x" />-value,{' '}
      <Katex tex="x=\tfrac{h\left(\sqrt3+3\right)}{6}" /> and then gave a negative volume.
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
    working: <Katex display tex="\text{width } h-2x, \quad \text{length } 2h-2x, \quad \text{height } x" />,
    reason: <>A square of side <Katex tex="x" /> is cut from <em>both</em> ends of every side, so the width and the length each lose <Katex tex="2x" />. The flaps that fold up are <Katex tex="x" /> deep, so that is the box's height.</>,
  },
  {
    working: <Katex display tex="h = 25: \ V = x(25-2x)(50-2x)" />,
    reason: <>Volume = length × width × height, with <Katex tex="h=25" /> and so length <Katex tex="2h=50" />. Keep each dimension in its own brackets: the report notes students who left them out.</>,
  },
  {
    working: <Katex display tex="50-2x = 2(25-x)" />,
    reason: <>The target form has a 2 out the front, so take the common factor 2 out of the length. There is no need to expand and refactorise (the report says so).</>,
  },
  {
    working: <Katex display tex="\boxed{V_{\text{box}}(x) = 2x(25-2x)(25-x)}" />,
    reason: <>Move the 2 to the front. <Katex tex="(25-2x)" /> and <Katex tex="(25-x)" /> are <em>different</em> brackets: the width, and half the length. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x > 0 \ \text{ (given)}" />,
    reason: <>Given in the question. <Katex tex="V_{\text{box}}>0" /> means every dimension of the box must be positive.</>,
  },
  {
    working: <Katex display tex="\text{width: } 25-2x > 0 \implies x < 12.5" />,
    reason: <>The width must be positive.</>,
  },
  {
    working: <Katex display tex="\text{length: } 50-2x > 0 \implies x < 25" />,
    reason: <>Already guaranteed by <Katex tex="x<12.5" />: the width runs out first. Using only this condition gives the common wrong answer <Katex tex="(0,25)" />, but at <Katex tex="x=20" /> the width would be <Katex tex="25-40=-15" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 12.5)}" />,
    reason: <>Round brackets at both ends: at <Katex tex="x=0" /> and <Katex tex="x=12.5" /> the volume is 0, and <Katex tex="V_{\text{box}}>0" /> is assumed. So <Katex tex="(0,12.5]" /> is wrong.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = 2x(25-2x)(25-x) = 2x\left(625-75x+2x^2\right)" />,
    reason: <>Expanding first turns <Katex tex="V" /> into a polynomial you can differentiate term by term, with no product rule. <Katex tex="(25-2x)(25-x)=625-25x-50x+2x^2" />.</>,
  },
  {
    working: <Katex display tex="V = 4x^3-150x^2+1250x" />,
    reason: <>Multiply each term by <Katex tex="2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V'(x) = 12x^2-300x+1250}" />,
    reason: <>Differentiate term by term. The constant term is <Katex tex="1250" />, not <Katex tex="12\,500" />: the slip the report names.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="V'(x) = 0: \ 12x^2-300x+1250 = 0" />,
    reason: <>The maximum is at a stationary point, where the gradient <Katex tex="V'(x)" /> is zero.</>,
  },
  {
    working: <Katex display tex="6x^2-150x+625 = 0" />,
    reason: <>Divide by 2 to keep the numbers smaller.</>,
  },
  {
    working: <Katex display tex="x = \frac{150\pm\sqrt{22\,500-15\,000}}{12} = \frac{150\pm50\sqrt3}{12}" />,
    reason: <>Quadratic formula with <Katex tex="a=6" />, <Katex tex="b=-150" />, <Katex tex="c=625" />, and <Katex tex="\sqrt{7500}=\sqrt{2500\times3}=50\sqrt3" />. CAS solve gives the same pair.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{25}{2}\pm\tfrac{25\sqrt3}{6}" />,
    reason: <>Divide each term by 12.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{25}{2}+\tfrac{25\sqrt3}{6} \approx 19.7 \notin (0,\ 12.5)" />,
    reason: <>Reject: it is outside the domain from part b. At this <Katex tex="x" /> the width <Katex tex="25-2x" /> would be about <Katex tex="-14" />, so there is no box. The report notes some students used this <Katex tex="x" />-value to find the volume.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{25}{2}-\tfrac{25\sqrt3}{6} = \tfrac{25\left(3-\sqrt3\right)}{6} \approx 5.28" />,
    reason: <>The only stationary point in <Katex tex="(0,12.5)" />. <Katex tex="V=0" /> at both ends of the domain and <Katex tex="V>0" /> in between, so <Katex tex="V" /> rises to a maximum and falls again, and this stationary point is that maximum. Copy the CAS form carefully: the report often saw <Katex tex="\tfrac{-25(\sqrt3+3)}{6}" />, which is negative.</>,
  },
  {
    working: <Cas fn="fMax">fMax(4x³ − 150x² + 1250x, x) | 0 &lt; x &lt; 12.5</Cas>,
    reason: <>A CAS check: fMax with the domain restriction returns this <Katex tex="x" />-value directly.</>,
  },
  {
    working: <Katex display tex="V\!\left(\tfrac{25\left(3-\sqrt3\right)}{6}\right) = \tfrac{15\,625\sqrt3}{9}" />,
    reason: <>Substitute the <Katex tex="x" />-value into <Katex tex="V" /> (define <Katex tex="V" /> on CAS first). The report says some students found the <Katex tex="x" />-value but not the maximum volume.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered} V_{\max} = \tfrac{15\,625\sqrt3}{9}\ \text{cm}^3 \\ \text{at } x = \tfrac{25\left(3-\sqrt3\right)}{6} \end{gathered}}" />,
    reason: <>The question asks for <em>both</em> the volume and the <Katex tex="x" />-value, and exact values were required. Decimals (about <Katex tex="3007\ \text{cm}^3" /> at <Katex tex="x\approx5.28" />) are only a check.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{waste} = 4x^2 = 4(5)^2 = 100\ \text{cm}^2" />,
    reason: <>Four corner squares of side 5 are cut out.</>,
  },
  {
    working: <Katex display tex="\text{sheet area} = 25\times50 = 1250\ \text{cm}^2" />,
    reason: <>The percentage is of the sheet's <em>area</em>, not the box's volume: the denominator the report says some students got wrong.</>,
  },
  {
    working: <Katex display tex="\frac{100}{1250}\times100\% = \boxed{8\%}" />,
    reason: <>Multiply by 100 to convert: <Katex tex="\tfrac{100}{1250}=0.08" /> is the <em>fraction</em>, and writing "0.08%" loses the mark.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="V = x(h-2x)(2h-2x), \quad x>0" />,
    reason: <>The same construction as part a., with the width left as <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="h-2x > 0 \implies x < \tfrac{h}{2}" />,
    reason: <>The width must be positive. The length <Katex tex="2h-2x" /> stays positive until <Katex tex="x=h" />, so the width runs out first, as in part b.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ \tfrac{h}{2}\right)}" />,
    reason: <>The question asks for the <em>domain</em>, an interval, not the rule for <Katex tex="V" /> (which the report says some students gave). Round brackets because <Katex tex="V=0" /> at both ends. Check: <Katex tex="h=25" /> gives <Katex tex="(0,12.5)" />, part b.'s answer.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="V = x(h-2x)(2h-2x) = 4x^3-6hx^2+2h^2x" />,
    reason: <>Treat <Katex tex="h" /> as a constant: <Katex tex="(h-2x)(2h-2x)=2h^2-6hx+4x^2" />, then multiply by <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="V'(x) = 12x^2-12hx+2h^2 = 0" />,
    reason: <>Differentiate with respect to <Katex tex="x" /> (<Katex tex="h" /> is a constant) and set <Katex tex="V'(x)=0" /> to find the stationary points.</>,
  },
  {
    working: <Katex display tex="6x^2-6hx+h^2 = 0" />,
    reason: <>Divide by 2.</>,
  },
  {
    working: <Katex display tex="x = \frac{6h\pm\sqrt{36h^2-24h^2}}{12} = \frac{h\left(3\pm\sqrt3\right)}{6}" />,
    reason: <>Quadratic formula with <Katex tex="a=6" />, <Katex tex="b=-6h" />, <Katex tex="c=h^2" />. <Katex tex="\sqrt{12h^2}=2\sqrt3\,h" /> because <Katex tex="h>0" />; then divide top and bottom by 2. CAS solve gives the same pair.</>,
  },
  {
    working: <Katex display tex="x = \frac{3+\sqrt3}{6}h \approx 0.789h > \tfrac{h}{2} \ \text{(reject)}" />,
    reason: <>Reject: it is outside the domain from part f.i., and the width <Katex tex="h-2x" /> would be negative. Substituting it gives <Katex tex="V=-\tfrac{\sqrt3\,h^3}{9}" />, the negative volume the report saw. The interactive below shows where it lands.</>,
  },
  {
    working: <Katex display tex="x = \frac{3-\sqrt3}{6}h \approx 0.211h < \tfrac{h}{2} \ \checkmark" />,
    reason: <>The only stationary point in <Katex tex="\left(0,\tfrac h2\right)" />. <Katex tex="V=0" /> at both ends and <Katex tex="V>0" /> in between, so this stationary point is the maximum, exactly as in part d.</>,
  },
  {
    working: <Katex display tex="V\!\left(\tfrac{h\left(3-\sqrt3\right)}{6}\right) = \boxed{\frac{\sqrt3\,h^3}{9}\ \text{cm}^3}" />,
    reason: <>Substitute into <Katex tex="V" /> (CAS). Check against part d.: <Katex tex="h=25" /> gives <Katex tex="\tfrac{15\,625\sqrt3}{9}" /> ✓.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{base } (h-2x) \text{ by } (h-2x), \ \text{height } x" />,
    reason: <>The sheet is now square, side <Katex tex="h" />, so both sides of the base lose <Katex tex="2x" />, and the base is a square.</>,
  },
  {
    working: <Katex display tex="V = x(h-2x)^2, \quad 0 < x < \tfrac{h}{2}" />,
    reason: <>Volume = base area × height. The domain is the same as in part f.i., since the base side <Katex tex="h-2x" /> must be positive. Write the formula and domain down first: they are the start of the "show that".</>,
  },
  {
    working: <Katex display tex="V'(x) = (h-2x)^2+x\cdot2(h-2x)(-2)" />,
    reason: <>Product rule with <Katex tex="u=x" /> and <Katex tex="v=(h-2x)^2" />. The chain rule gives <Katex tex="v'=2(h-2x)\times(-2)" />.</>,
  },
  {
    working: <Katex display tex="= (h-2x)\bigl[(h-2x)-4x\bigr] = (h-2x)(h-6x)" />,
    reason: <>Both terms contain <Katex tex="(h-2x)" />, so take it out as a common factor instead of expanding.</>,
  },
  {
    working: <Katex display tex="V'(x) = 0 \implies x = \tfrac{h}{2} \ \text{ or } \ x = \tfrac{h}{6}" />,
    reason: <>Null factor law.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{h}{2} \notin \left(0,\ \tfrac{h}{2}\right)" />,
    reason: <>Reject: at <Katex tex="x=\tfrac h2" /> the base side <Katex tex="h-2x" /> is 0, so there is no box (<Katex tex="V=0" />). The report says the domain needed to be considered in this question.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{h}{6}}" />,
    reason: <>The only stationary point in the domain. <Katex tex="V=0" /> at both ends of <Katex tex="\left(0,\tfrac h2\right)" /> and <Katex tex="V>0" /> in between, so this stationary point gives the maximum volume. As required.</>,
  },
]

export default function MethodsQ1_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (14 marks)</p>
        <p>
          A rectangular sheet of cardboard has a width of <Katex tex="h" /> centimetres. Its
          length is twice its width.
          <br />
          Squares of side length <Katex tex="x" /> centimetres, where <Katex tex="x>0" />, are
          cut from each of the corners, as shown in the diagram below.
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
          with an open top, as shown in the diagram below.
          <br />
          Assume that the thickness of the cardboard is negligible and that{' '}
          <Katex tex="V_{\text{box}}>0" />.
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
        topic="Volume Model"
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
        topic="Domain"
        marks={1}
        statement={<>State the domain of <Katex tex="V_{\text{box}}" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Derivative"
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
        topic="Optimisation"
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
        topic="Percentage Waste"
        marks={2}
        statement={
          <>
            Waste minimisation is a goal when making cardboard boxes.
            <br />
            Percentage wasted is based on the area of the sheet of cardboard that is cut out
            before the box is made.
            <br />
            Find the percentage of the sheet of cardboard that is wasted when{' '}
            <Katex tex="x=5" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Now consider a box made from a rectangular sheet of cardboard where{' '}
          <Katex tex="h>0" /> and the box's length is still twice its width.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Domain"
        marks={1}
        statement={
          <>
            Let <Katex tex="V_{\text{box}}" /> be the function that gives the volume of the
            box.
            <br />
            State the domain of <Katex tex="V_{\text{box}}" /> in terms of{' '}
            <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Optimisation"
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
        <Explore title="Only one root of V′ = 0 is a box: the other is past h/2, where the width is negative">
          <TwoRootsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g"
        topic="Optimisation"
        marks={2}
        statement={
          <>
            Now consider making a box from a square sheet of cardboard with side lengths of{' '}
            <Katex tex="h" /> centimetres.
            <br />
            Show that the maximum volume of the box occurs
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
