// 2024 Specialist NHT — Exam 1, Question 3 (3 marks). The NHT report gives sample answers only,
// with no statistics; its one note beyond the bare answer (part a.: verification of the inflection
// points was not required) is quoted as that part's examiner comment. Points of inflection of the
// quartic y = x⁴ − 6x² + 4, (−1, −1) and (1, −1), then where it is concave up (x < −1 or x > 1).
// Question text transcribed from the original paper (read from a rendered page image). Answers
// checked with sympy and against the VCAA report's sample answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>Verification that these points were points of inflection was not required.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx}=4x^3-12x" />,
    reason: <>Differentiate term by term with the power rule; the constant <Katex tex="4" /> differentiates to <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2}=12x^2-12=12(x-1)(x+1)" />,
    reason: <>A point of inflection is where the concavity changes, which needs the second derivative.</>,
  },
  {
    working: <Katex display tex="12(x-1)(x+1)=0\implies x=\pm1" />,
    reason: <>Points of inflection can only occur where <Katex tex="\tfrac{d^2y}{dx^2}=0" />.</>,
    more: <><Katex tex="\tfrac{d^2y}{dx^2}=0" /> alone isn&apos;t enough (for <Katex tex="y=x^4" /> it is zero at <Katex tex="x=0" />, which is a minimum). Here each root is a single factor, so <Katex tex="\tfrac{d^2y}{dx^2}" /> changes sign at both: positive for <Katex tex="x<-1" />, negative between, positive for <Katex tex="x>1" />. So both really are points of inflection. The report notes this check was not required for the mark.</>,
  },
  {
    working: <Katex display tex="x=\pm1:\quad y=1-6+4=-1" />,
    reason: <>The question asks for coordinates, so substitute back into the original function (not the derivative). Both give the same <Katex tex="y" />, because only even powers of <Katex tex="x" /> appear, so <Katex tex="x=-1" /> and <Katex tex="x=1" /> give equal values.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,-1)\ \text{and}\ (1,-1)}" />,
    reason: <>Write both points as coordinate pairs.</>,
    more: <>Symmetry check: those even powers make the graph symmetric about the <Katex tex="y" />-axis, so its inflection points must come as a mirror pair, as these do.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d^2y}{dx^2}=12(x-1)(x+1)>0" />,
    reason: <>Concave up means the gradient is increasing, that is, the second derivative is positive.</>,
  },
  {
    working: <Katex display tex="\boxed{x<-1\ \text{or}\ x>1}" />,
    reason: <>An upward parabola in <Katex tex="x" /> with roots <Katex tex="\pm1" /> is positive outside its roots. VCAA writes this as <Katex tex="x\in(-\infty,-1)\cup(1,\infty)" />, or <Katex tex="x\in R\setminus[-1,1]" />.</>,
    more: <>The endpoints <Katex tex="x=\pm1" /> are excluded: there the second derivative is zero and the concavity is switching over. A quick check: at <Katex tex="x=0" /> the graph has a local maximum (<Katex tex="y=4" />), which is concave down, so <Katex tex="x=0" /> must be outside the answer ✓.</>,
  },
]

export default function SpecialistQ3_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Points of Inflection"
        marks={2}
        statement={<>Find the coordinates of the points of inflection of the graph of <Katex tex="y=x^4-6x^2+4" />.</>}
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            The second derivative measures how the gradient is changing. Where <Katex tex="\tfrac{d^2y}{dx^2}>0" /> the
            gradient is increasing and the curve bends upwards (concave up); where it is negative the curve bends
            downwards (concave down). A point of inflection is where the bending switches over, so the second
            derivative is zero there <b>and</b> changes sign.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Concavity"
        marks={1}
        statement={
          <>
            Hence, or otherwise, find all values of <Katex tex="x" /> for which the graph of{' '}
            <Katex tex="y=x^4-6x^2+4" /> is concave up.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
