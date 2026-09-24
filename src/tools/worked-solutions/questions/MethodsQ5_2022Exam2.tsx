// 2022 Mathematical Methods — Exam 2, Section B Question 5 (9 marks). A composite with an
// unknown inner function, worked entirely from a table of values. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>Double the input first: <Katex tex="2\times\tfrac\pi6=\tfrac\pi3" />.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}" />,
    reason: <>This is the <em>input</em> to <Katex tex="f" />, not the output — the report notes <Katex tex="g\left(\tfrac\pi6\right)=\tfrac{\sqrt3}{2}" /> as a common incorrect answer.</>,
  },
  {
    working: <Katex display tex="\boxed{f\!\left(\tfrac{\sqrt3}{2}\right) = 3}" />,
    reason: <>Read straight off the table's third column.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2\cos(2x)\,f'\bigl(\sin(2x)\bigr)" />,
    reason: <>The chain rule, as given in the stem.</>,
  },
  {
    working: <Katex display tex="g'\!\left(\tfrac\pi6\right) = 2\cos\!\left(\tfrac\pi3\right)f'\!\left(\sin\!\left(\tfrac\pi3\right)\right)" />,
    reason: <>Both factors need evaluating — the report notes <Katex tex="2\cos\left(\tfrac\pi3\right)" /> was sometimes ignored.</>,
  },
  {
    working: <Katex display tex="= 2\times\tfrac12\times f'\!\left(\tfrac{\sqrt3}{2}\right) = 1\times\tfrac19" />,
    reason: <><Katex tex="\cos\tfrac\pi3=\tfrac12" />, and the table gives <Katex tex="f'\!\left(\tfrac{\sqrt3}{2}\right)=\tfrac19" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g'\!\left(\tfrac\pi6\right) = \tfrac19}" />,
    reason: <>Both substitutions must be written out for a "show that". As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{point } \left(\tfrac\pi6,\ 3\right), \quad \text{gradient } \tfrac19" />,
    reason: <>The point comes from part a., the gradient from part b. The report notes some used <Katex tex="\left(\tfrac\pi6,\tfrac19\right)" />.</>,
  },
  {
    working: <Katex display tex="y-3 = \tfrac19\left(x-\tfrac\pi6\right)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x}{9}-\frac{\pi}{54}+3}" />,
    reason: <><Katex tex="\tfrac{1}{9}\times\tfrac\pi6=\tfrac{\pi}{54}" />. An equation, as required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value of } g' = \frac{1}{\tfrac\pi6-\tfrac\pi8}\int_{\pi/8}^{\pi/6}g'(x)\,dx" />,
    reason: <>Average <em>value</em> of the derivative, not the average rate of change of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\int_{\pi/8}^{\pi/6}g'(x)\,dx = g\!\left(\tfrac\pi6\right)-g\!\left(\tfrac\pi8\right)" />,
    reason: <>The fundamental theorem turns the integral into two table look-ups.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac\pi8\right) = f\!\left(\sin\!\left(\tfrac\pi4\right)\right) = f\!\left(\tfrac{\sqrt2}{2}\right) = 5" />,
    reason: <>The middle column of the table.</>,
  },
  {
    working: <Katex display tex="\tfrac\pi6-\tfrac\pi8 = \tfrac{4\pi-3\pi}{24} = \tfrac{\pi}{24}" />,
    reason: <>The width of the interval.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{24}{\pi}(3-5) = -\frac{48}{\pi}}" />,
    reason: <>About <Katex tex="-15.3" />. Negative, since <Katex tex="g" /> falls from 5 to 3 across the interval.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2\cos(2x)\,f'\bigl(\sin(2x)\bigr) = 0" />,
    reason: <>A product is zero when either factor is — both cases must be solved; the report notes some students solved only one.</>,
  },
  {
    working: <Katex display tex="\text{case 1: } \cos(2x) = 0, \ x\in[0,\pi] \implies 2x = \tfrac\pi2,\ \tfrac{3\pi}{2}" />,
    reason: <><Katex tex="2x" /> ranges over <Katex tex="[0,2\pi]" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac\pi4, \ \tfrac{3\pi}{4}" />,
    reason: <>Two solutions from the cosine factor.</>,
  },
  {
    working: <Katex display tex="\text{case 2: } f'\bigl(\sin(2x)\bigr) = 0 \implies \sin(2x) = \tfrac{\sqrt2}{2}" />,
    reason: <>The table gives <Katex tex="f'\!\left(\tfrac{\sqrt2}{2}\right)=0" /> — the only zero of <Katex tex="f'" /> we know about.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac\pi4,\ \tfrac{3\pi}{4} \implies x = \tfrac\pi8, \ \tfrac{3\pi}{8}" />,
    reason: <>Two more solutions.</>,
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
          <Katex tex="g'(x)=2\cos(2x)\,f'\bigl(\sin(2x)\bigr)" />.
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
      </PartCard>

      <PartCard
        letter="e"
        topic="Stationary Points"
        marks={3}
        statement={
          <>
            Find four solutions to the equation <Katex tex="g'(x)=0" /> for the interval{' '}
            <Katex tex="x\in[0,\pi]" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
