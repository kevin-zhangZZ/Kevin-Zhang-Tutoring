// 2024 Mathematical Methods — Exam 1 Question 1 (3 marks). A product rule and a chain rule
// on a logarithm. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
  comment: (
    <>
      This question was well attempted and required students to use the product rule to find
      the derivative. Many students did not tidy up the negative signs in their answer and left
      their answer as <Katex tex="e^x\cos(3x)+-3e^x\sin(3x)" /> or{' '}
      <Katex tex="e^x\cos(3x)+e^x-3\sin(3x)" />. Some students did not use brackets around
      terms and this had the potential to be misinterpreted. Some students altered the argument
      of the sine term and wrote <Katex tex="e^x\cos(3x)-3e^x\sin(x)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 15, 54],
  average: 1.2,
  comment: (
    <>
      This question was well attempted and required students to use the chain rule to find the
      derivative then evaluate the derivative at <Katex tex="x=3" />. Some students did not
      correctly execute the chain rule and omitted the numerator. Some students did not put
      brackets around the quadratic term; this created ambiguity in their solution process
      with the evaluation of the derivative at <Katex tex="x=3" />. A correct answer must
      emerge from correct working.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = e^x\cos(3x)" />,
    reason: <>A product of two functions, each of which needs its own derivative.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = e^x\cos(3x)+e^x\cdot\bigl(-3\sin(3x)\bigr)" />,
    reason: <>Product rule, with a chain rule inside: <Katex tex="\tfrac{d}{dx}\cos(3x)=-3\sin(3x)" />. The argument stays <Katex tex="3x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = e^x\bigl(\cos(3x)-3\sin(3x)\bigr)}" />,
    reason: <>Resolve the "<Katex tex="+\ {-}3" />" into a single minus and factorise. The report notes many students left <Katex tex="e^x\cos(3x)+-3e^x\sin(3x)" /> untidied.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \log_e\left(x^3-3x+2\right)" />,
    reason: <>A log of a function, so the chain rule in its f′/f form.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{3x^2-3}{x^3-3x+2}" />,
    reason: <>Derivative of the inside over the inside. Omitting the numerator — writing just <Katex tex="\tfrac{1}{x^3-3x+2}" /> — the report notes some students omitted it.</>,
  },
  {
    working: <Katex display tex="f'(3) = \frac{3(3)^2-3}{3^3-3(3)+2} = \frac{27-3}{27-9+2}" />,
    reason: <>Brackets around <Katex tex="(3)^2" /> matter: <Katex tex="3\times9=27" />, not <Katex tex="(3\times3)^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(3) = \frac{24}{20} = \frac65}" />,
    reason: <>Cancelling by 4. Equivalently <Katex tex="1.2" />, but the instructions ask for exact values.</>,
  },
]

export default function MethodsQ1_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Let <Katex tex="y=e^x\cos(3x)" />.
            <br />
            Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="f(x)=\log_e\left(x^3-3x+2\right)" />.
            <br />
            Find <Katex tex="f'(3)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
