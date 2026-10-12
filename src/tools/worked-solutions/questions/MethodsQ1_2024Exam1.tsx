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
    reason: <>A product of two functions of <Katex tex="x" />, so use the product rule.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = e^x\cos(3x)+e^x\cdot\bigl(-3\sin(3x)\bigr)" />,
    reason: (
      <>
        Product rule <Katex tex="u'v+uv'" /> with <Katex tex="u=e^x" />,{' '}
        <Katex tex="v=\cos(3x)" />. Chain rule: <Katex tex="\tfrac{d}{dx}\cos(3x)=-3\sin(3x)" />.
      </>
    ),
    more: (
      <>
        The chain rule brings the 3 out in front, but the argument stays <Katex tex="3x" />:
        it is <Katex tex="-3\sin(3x)" />, not <Katex tex="-3\sin(x)" />. The report notes some
        students changed the argument of the sine term in exactly this way.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = e^x\bigl(\cos(3x)-3\sin(3x)\bigr)} " />,
    reason: <>Write "<Katex tex="+\ {-}3" />" as a single minus, then take out the common factor <Katex tex="e^x" />.</>,
    more: (
      <>
        The unfactorised form <Katex tex="e^x\cos(3x)-3e^x\sin(3x)" /> is equally correct. What
        is not acceptable is leaving <Katex tex="e^x\cos(3x)+-3e^x\sin(3x)" />, or dropping
        brackets so it reads <Katex tex="e^x\cos(3x)+e^x-3\sin(3x)" /> (which now says{' '}
        <Katex tex="+\,e^x" /> on its own).
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \log_e\left(x^3-3x+2\right)" />,
    reason: (
      <>
        A log of a function, so the chain rule:{' '}
        <Katex tex="\tfrac{d}{dx}\log_e\bigl(g(x)\bigr)=\tfrac{g'(x)}{g(x)}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = \frac{3x^2-3}{x^3-3x+2}" />,
    reason: <>Here <Katex tex="g(x)=x^3-3x+2" />, so <Katex tex="g'(x)=3x^2-3" /> goes on top.</>,
    more: (
      <>
        The numerator is the chain rule's "derivative of the inside". Writing just{' '}
        <Katex tex="\tfrac{1}{x^3-3x+2}" /> treats it like <Katex tex="\log_e(x)" /> — the
        report notes some students omitted the numerator this way. The report also gives the
        equivalent form <Katex tex="f'(x)=\tfrac{1}{x+2}+\tfrac{2}{x-1}" />. To get it,
        factorise <Katex tex="x^3-3x+2=(x-1)^2(x+2)" />, use log laws to write{' '}
        <Katex tex="f(x)=2\log_e(x-1)+\log_e(x+2)" /> (valid for <Katex tex="x>1" />, which
        includes <Katex tex="x=3" />), then differentiate each log. At <Katex tex="x=3" /> this
        gives <Katex tex="\tfrac15+\tfrac22=\tfrac65" /> too.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(3) = \frac{3(3)^2-3}{3^3-3(3)+2} = \frac{27-3}{27-9+2}" />,
    reason: <>Substitute <Katex tex="x=3" />, bracketing each 3. Square first: <Katex tex="3(3)^2=3\times9=27" />.</>,
    more: (
      <>
        Without the brackets, <Katex tex="3x^2" /> at <Katex tex="x=3" /> is easily misread as{' '}
        <Katex tex="(3\times3)^2=81" />. The report notes that missing brackets around the
        quadratic term created ambiguity in some students' evaluation, and that a correct
        answer must come from correct working.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(3) = \frac{24}{20} = \frac65}" />,
    reason: <>Cancel the common factor 4. Exam 1 answers stay exact, so <Katex tex="\tfrac65" /> rather than <Katex tex="1.2" />.</>,
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
