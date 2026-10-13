// 2015 Mathematical Methods (CAS) — Exam 1, Question 7 (5 marks).
// A logarithm equation, then an exponential equation that becomes a hidden quadratic.
// Question text transcribed from the original paper (no diagram given). Answers checked
// with sympy and against the VCAA examination report. Solution is original.
// Interactive (Detailed only): Q7b (36% full marks) — the parabola 3a² − 5a − 8 in a = e^t,
// with a t slider showing e^t only ever reaches the positive root. Q7a does not qualify.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const HiddenQuadraticWidget = lazyWidget(() => import('../interactives/meth-2015e1-q7b-hidden-quadratic'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 19, 65],
  average: 1.5,
  comment: <>Many students correctly applied logarithm laws, but others incorrectly cancelled logarithms.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [49, 5, 10, 36],
  average: 1.3,
  comment: (
    <>
      This question was not answered well. Many students were unable to create the quadratic
      equation evolved from manipulating <Katex tex="e^{-t}" />. Many students solved via the
      quadratic formula rather than using simpler factorising techniques. The feasibility of
      only one answer was generally well handled.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\log_2(6-x)-\log_2(4-x) = \log_2\!\left(\frac{6-x}{4-x}\right)" />,
    reason: <>Log law: a difference of logs with the same base is the log of the quotient.</>,
    more: <>The report notes that some students incorrectly cancelled the logarithms; cancelling here would mean writing <Katex tex="(6-x)-(4-x)=2" />. There is no such law: <Katex tex="\log_2A-\log_2B" /> is neither <Katex tex="\log_2(A-B)" /> nor <Katex tex="A-B" />. Combine the logs into one first, then undo that single log.</>,
  },
  {
    working: <Katex display tex="\log_2\!\left(\frac{6-x}{4-x}\right) = 2 \implies \frac{6-x}{4-x} = 2^2" />,
    reason: <>Definition of a logarithm: <Katex tex="\log_2X=2" /> means <Katex tex="X=2^2=4" />.</>,
  },
  {
    working: <Katex display tex="6-x = 4(4-x) = 16-4x" />,
    reason: <>Multiplying through by <Katex tex="4-x" />, which is non-zero since <Katex tex="x<4" />.</>,
  },
  {
    working: <Katex display tex="3x = 10 \implies \boxed{x = \frac{10}{3}}" />,
    reason: <>Check: <Katex tex="\tfrac{10}{3}<4" />, so <Katex tex="6-x" /> and <Katex tex="4-x" /> are both positive and both logs are defined ✓.</>,
    more: <>Substituting back: <Katex tex="6-\tfrac{10}{3}=\tfrac83" /> and <Katex tex="4-\tfrac{10}{3}=\tfrac23" />, whose quotient is 4, and <Katex tex="\log_24=2" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="3e^t = 5+8e^{-t}" />,
    reason: <>Both <Katex tex="e^t" /> and <Katex tex="e^{-t}" /> appear. Multiplying every term by <Katex tex="e^t" /> clears the negative power.</>,
  },
  {
    working: <Katex display tex="3e^{2t}-5e^t-8 = 0" />,
    reason: <>Term by term: <Katex tex="3e^t\cdot e^t=3e^{2t}" />, <Katex tex="5\cdot e^t=5e^t" /> and <Katex tex="8e^{-t}\cdot e^t=8" />; then move everything to one side.</>,
    more: <>The report says many students were unable to create this quadratic. Common slips are multiplying only some of the terms by <Katex tex="e^t" />, or writing <Katex tex="e^t\cdot e^t=e^{t^2}" /> (it is <Katex tex="e^{2t}" />, because powers add). Multiplying by <Katex tex="e^t" /> is safe because it is never zero, so no solutions are gained or lost.</>,
  },
  {
    working: <Katex display tex="\text{let } a = e^t: \quad 3a^2-5a-8 = 0" />,
    reason: <>Since <Katex tex="e^{2t}=(e^t)^2" />, writing <Katex tex="a" /> for <Katex tex="e^t" /> gives an ordinary quadratic.</>,
  },
  {
    working: <Katex display tex="(a+1)(3a-8) = 0 \implies a = -1 \text{ or } a = \frac83" />,
    reason: <>Factorise: <Katex tex="3\times(-8)=-24" />, and <Katex tex="-8" /> and <Katex tex="3" /> multiply to <Katex tex="-24" /> and add to <Katex tex="-5" />, so split <Katex tex="-5a" /> as <Katex tex="-8a+3a" /> and group.</>,
    more: <>Splitting the middle term: <Katex tex="3a^2-8a+3a-8=a(3a-8)+(3a-8)=(a+1)(3a-8)" />. The report notes many students used the quadratic formula rather than simpler factorising. The formula still works, <Katex tex="a=\frac{5\pm\sqrt{25+96}}{6}=\frac{5\pm11}{6}" />, giving the same <Katex tex="\tfrac83" /> and <Katex tex="-1" />, but it is slower and easier to slip in by hand.</>,
  },
  {
    working: <Katex display tex="e^t = -1 \text{ is impossible}" />,
    reason: <>Since <Katex tex="e^t>0" /> for every real <Katex tex="t" />, reject <Katex tex="a=-1" />, and say so in your answer.</>,
    more: <>The report says the feasibility of only one answer was generally well handled. Write the rejection explicitly rather than silently dropping the root, so the marker can see why only one solution exists.</>,
  },
  {
    working: <Katex display tex="e^t = \frac83 \implies \boxed{t = \log_e\!\left(\frac83\right)}" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides. This is Exam 1, so leave the answer exact.</>,
    more: <>Check: <Katex tex="e^t=\tfrac83" /> and <Katex tex="e^{-t}=\tfrac38" />, so <Katex tex="3\times\tfrac83=8" /> and <Katex tex="5+8\times\tfrac38=8" /> ✓.</>,
  },
]

export default function MethodsQ7_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Log Equation"
        marks={2}
        statement={
          <>
            Solve <Katex tex="\log_2(6-x)-\log_2(4-x)=2" /> for <Katex tex="x" />, where{' '}
            <Katex tex="x<4" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Exponential Equation"
        marks={3}
        statement={
          <>
            Solve <Katex tex="3e^t=5+8e^{-t}" /> for <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Spotting a hidden quadratic">
          <p>
            An equation containing <Katex tex="e^{t}" /> and <Katex tex="e^{-t}" /> (or{' '}
            <Katex tex="e^{2t}" /> and <Katex tex="e^{t}" />) is usually a quadratic in
            disguise: once every power is a whole-number power of <Katex tex="e^t" />, call{' '}
            <Katex tex="e^t" /> a single letter and solve the quadratic. Any root that is zero
            or negative must then be rejected, because <Katex tex="e^t" /> is always positive.
          </p>
          <p>
            The same move works for <Katex tex="4^x" /> and <Katex tex="2^x" />, for{' '}
            <Katex tex="\sin^2" /> and <Katex tex="\sin" />, and anywhere else two powers of
            the same base appear.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title={<>Two roots in <Katex tex="a" />, but <Katex tex="e^t" /> can only reach one</>}>
          <HiddenQuadraticWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
