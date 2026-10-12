// 2025 Mathematical Methods — Exam 1 Question 5 (4 marks). A quadratic in e^x, then the
// largest domain restriction that leaves the same function one-to-one. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [14, 25, 61],
  average: 1.5,
  comment: (
    <>
      This question required the solution of a quadratic equation involving exponential terms.
      Most students recognised the quadratic nature of the question and were able to set up,
      factorise and solve correctly. Some students incorrectly discarded the solution{' '}
      <Katex tex="x=\ln(1)" />. Some students did not observe <Katex tex="\log_e(1)=0" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 16, 43],
  average: 1.0,
  comment: (
    <>
      This question involved finding the location of the turning point, either by using calculus
      or symmetry. Although students were generally able to differentiate and set the derivative
      equal to zero, some students made arithmetic errors when factorising, which led to an
      incorrect result of <Katex tex="e^x=8" /> and hence an incorrect value{' '}
      <Katex tex="a=\ln(8)" />. Some students chose to use a substitution and let{' '}
      <Katex tex="a=e^x" />, leading to a solution of <Katex tex="a=4" />. Rather than
      recognising that this meant <Katex tex="e^x=4" />, they then incorrectly concluded that{' '}
      <Katex tex="a=4" /> was the answer to the upper bound of the interval. Students are advised
      to be careful when introducing variables.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="e^{2x} = \left(e^x\right)^2 \implies \text{let } u = e^x" />,
    reason: <>Since <Katex tex="e^{2x}=\left(e^x\right)^2" />, the equation is a quadratic in <Katex tex="e^x" />. Note <Katex tex="u=e^x>0" /> always — the check to apply at the end.</>,
    more: <>The letter <Katex tex="u" /> is optional: the report also factorises directly as <Katex tex="\left(e^x-1\right)\left(e^x-7\right)=0" />, which avoids having to convert back from <Katex tex="u" /> later.</>,
  },
  {
    working: <Katex display tex="u^2-8u+7 = 0 \implies (u-1)(u-7) = 0" />,
    reason: <>Two numbers multiplying to 7 and adding to <Katex tex="-8" />: <Katex tex="-1" /> and <Katex tex="-7" />.</>,
  },
  {
    working: <Katex display tex="u = 1 \ \text{ or } \ u = 7" />,
    reason: <>Both are positive, so neither can be rejected on those grounds.</>,
  },
  {
    working: <Katex display tex="e^x = 1 \implies x = 0; \qquad e^x = 7 \implies x = \log_e(7)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides. Since <Katex tex="\log_e(1)=0" />, <Katex tex="x=0" /> is a genuine solution — don't discard it.</>,
    more: <>The report notes some students incorrectly discarded <Katex tex="x=\ln(1)" />, and some did not simplify it to <Katex tex="0" />. A solution of <Katex tex="0" /> is not a problem; only a negative value of <Katex tex="u=e^x" /> would have to be rejected. Check: <Katex tex="x=0" /> gives <Katex tex="1-8+7=0" />, and <Katex tex="x=\log_e(7)" /> gives <Katex tex="49-56+7=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0 \ \text{ or } \ x = \log_e(7)}" />,
    reason: <>Two solutions.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} g \text{ has an inverse} \\ \iff g \text{ is one-to-one on its domain} \end{gathered}" />,
    reason: <>So <Katex tex="(-\infty,a]" /> must stop at the turning point: past the minimum, <Katex tex="g" /> turns back up and repeats <Katex tex="y" />-values. Hence find the turning point.</>,
  },
  {
    working: <Katex display tex="g'(x) = 2e^{2x}-8e^x = 2e^x\left(e^x-4\right)" />,
    reason: <>Chain rule: the derivative of <Katex tex="e^{2x}" /> is <Katex tex="2e^{2x}" />. Taking out the common factor <Katex tex="2e^x" /> makes the zero easy to find.</>,
    more: (
      <>
        <p>
          The report notes some students made arithmetic errors when factorising and got{' '}
          <Katex tex="e^x=8" />, hence <Katex tex="a=\ln(8)" />. Expand your factorised form to
          check it: <Katex tex="2e^x\left(e^x-4\right)=2e^{2x}-8e^x" /> ✓, whereas{' '}
          <Katex tex="2e^x\left(e^x-8\right)=2e^{2x}-16e^x" /> ✗.
        </p>
        <p className="mt-2">
          Without calculus (the report's other method): with <Katex tex="u=e^x" />,{' '}
          <Katex tex="g=u^2-8u+7=(u-1)(u-7)" />, a parabola in <Katex tex="u" /> with axis of
          symmetry <Katex tex="u=4" />, midway between its roots 1 and 7. Since{' '}
          <Katex tex="e^x" /> is increasing, the minimum of <Katex tex="g" /> occurs where{' '}
          <Katex tex="e^x=4" />.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="2e^x>0 \ \text{always} \implies e^x = 4" />,
    reason: <><Katex tex="2e^x" /> is never zero, so <Katex tex="g'(x)=0" /> only when <Katex tex="e^x-4=0" />.</>,
  },
  {
    working: <Katex display tex="x = \log_e(4)" />,
    reason: <>Take <Katex tex="\log_e" />. The answer is not 4: 4 is the value of <Katex tex="e^x" /> at the turning point, not of <Katex tex="x" />.</>,
    more: <>The report notes some students let <Katex tex="a=e^x" />, found <Katex tex="a=4" /> and gave that as the upper bound, rather than recognising that this meant <Katex tex="e^x=4" />. If you introduce a new letter, give it a name that can't be confused with the one asked for (here <Katex tex="u" />, not <Katex tex="a" />), and convert back at the end.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \log_e(4) \ \left(= 2\log_e(2)\right)}" />,
    reason: <>For <Katex tex="x<\log_e 4" />, <Katex tex="e^x<4" /> so <Katex tex="g'(x)<0" />: <Katex tex="g" /> is strictly decreasing, so one-to-one. The endpoint is included: the minimum value is reached only once.</>,
    more: <>The minimum value is <Katex tex="g(\log_e 4)=4^2-8(4)+7=-9" />. For any <Katex tex="a>\log_e 4" />, a <Katex tex="y" />-value just above <Katex tex="-9" /> would be reached once on each side of the minimum, so <Katex tex="g" /> would fail the horizontal line test.</>,
  },
]

export default function MethodsQ5_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Both parts are quadratics in <Katex tex="e^x" />: let <Katex tex="u=e^x" />, and
              remember to convert back to <Katex tex="x" /> at the end.
            </p>
            <p>
              Part b. is a domain-restriction question in disguise: a function has an inverse
              exactly when it is one-to-one.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Exponential Equation"
        marks={2}
        statement={<>Solve <Katex tex="e^{2x}-8e^x+7=0" /> for <Katex tex="x" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="One-to-One Restriction"
        marks={2}
        statement={
          <>
            Let <Katex tex="g(x)=e^{2x}-8e^x+7" />, where <Katex tex="x\in R" />.
            <br />
            The function <Katex tex="g(x)" /> has exactly one stationary point, a local minimum.
            <br />
            Find the largest value of <Katex tex="a" /> such that when <Katex tex="g" /> is
            restricted to the domain <Katex tex="(-\infty,a]" /> it has an inverse function.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
