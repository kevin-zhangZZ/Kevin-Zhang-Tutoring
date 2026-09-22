// 2025 Mathematical Methods — Exam 1 Question 5 (4 marks). A quadratic in e^x, then the
// largest domain restriction that leaves the same function one-to-one. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [14, 25, 61],
  average: 1.5,
  comment: (
    <>
      Most students recognised the quadratic nature of the question and were able to set up,
      factorise and solve correctly. Some students incorrectly discarded the solution{' '}
      <Katex tex="x=0" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 16, 43],
  average: 1.0,
  comment: (
    <>
      Some students made arithmetic errors when factorising. Some students chose to use a
      substitution and let <Katex tex="u=e^x" />, leading to a solution of{' '}
      <Katex tex="u=4" />; rather than recognising that this meant{' '}
      <Katex tex="x=\log_e(4)" />, they incorrectly concluded that 4 was the answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="e^{2x} = \left(e^x\right)^2 \implies \text{let } u = e^x" />,
    reason: <>Recognising the hidden quadratic. Note <Katex tex="u=e^x>0" /> always, which is the check to apply at the end.</>,
  },
  {
    working: <Katex display tex="u^2-8u+7 = 0 \implies (u-1)(u-7) = 0" />,
    reason: 'Two numbers multiplying to 7 and adding to 8.',
  },
  {
    working: <Katex display tex="u = 1 \ \text{ or } \ u = 7" />,
    reason: 'Both are positive, so neither can be rejected on those grounds.',
  },
  {
    working: <Katex display tex="e^x = 1 \implies x = 0; \qquad e^x = 7 \implies x = \log_e(7)" />,
    reason: <>Discarding <Katex tex="x=0" /> was the error the report named — <Katex tex="e^0=1" /> is a perfectly good value.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0 \ \text{ or } \ x = \log_e(7)}" />,
    reason: 'Two solutions.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g \text{ has an inverse} \iff g \text{ is one-to-one on its domain}" />,
    reason: 'So the domain can extend from the left only as far as the turning point, and no further.',
  },
  {
    working: <Katex display tex="g'(x) = 2e^{2x}-8e^x = 2e^x\left(e^x-4\right)" />,
    reason: 'Factorising rather than expanding — this makes the zero immediate.',
  },
  {
    working: <Katex display tex="2e^x>0 \ \text{always} \implies e^x = 4" />,
    reason: 'The only way the derivative can vanish.',
  },
  {
    working: <Katex display tex="x = \log_e(4)" />,
    reason: <>Not 4 — the substitution gives a value of <Katex tex="e^x" />, not of <Katex tex="x" />. This was the trap the examiner singled out.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \log_e(4) \ \left(= 2\log_e(2)\right)}" />,
    reason: <>On <Katex tex="\left(-\infty,\log_e 4\right]" /> the function is strictly decreasing, so one-to-one; any larger <Katex tex="a" /> would include values either side of the minimum and repeat a <Katex tex="y" />-value.</>,
  },
]

export default function MethodsQ5_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Both parts use the substitution <Katex tex="u=e^x" />, and both have the same
            trap at the end: <Katex tex="u" /> is not the answer. In part a.{' '}
            <Katex tex="u=1" /> means <Katex tex="x=0" />, and in part b.{' '}
            <Katex tex="u=4" /> means <Katex tex="x=\log_e(4)" />. Between them those two
            slips account for most of the marks lost.
          </p>
          <p>
            Part b. is a domain-restriction question in disguise. A function has an inverse
            exactly when it is one-to-one, so the largest left-hand domain runs up to — and
            includes — the turning point, and no further.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Solve <Katex tex="e^{2x}-8e^x+7=0" /> for <Katex tex="x" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Let <Katex tex="g(x)=e^{2x}-8e^x+7" />, where <Katex tex="x\in\mathbb{R}" />. The
            function <Katex tex="g(x)" /> has exactly one stationary point, a local minimum.
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
