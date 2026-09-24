// 2020 Mathematical Methods — Exam 1, Question 2 (3 marks). Two-event probability from a
// Venn diagram, then the same structure with algebraic probabilities. Question text
// transcribed from the original paper (no diagram given). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [47, 53],
  average: 0.5,
  comment: (
    <>
      Students who scored the mark generally used a Venn diagram or a table. The most common
      incorrect answer was <Katex tex="\tfrac{9}{400}" />, obtained by incorrectly assuming
      that the events <Katex tex="F" /> (air filter change) and <Katex tex="O'" /> (without an
      oil change) were independent, thus using{' '}
      <Katex tex="\Pr(F\cap O')=\Pr(F)\times\Pr(O')" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 39, 30],
  average: 1,
  comment: (
    <>
      While many students saw the connection to part a. of the question, many did not set up the
      correct equation or did not correctly transpose their equation to make 'm' the subject.
      Students generally recognised the conditional probability. Many did not go further than
      stating a rule.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(O) = \tfrac{17}{20}, \quad \Pr(F) = \tfrac{3}{20}, \quad \Pr(O\cap F) = \tfrac1{20}" />,
    reason: <>Reading the three given probabilities. A Venn diagram with these three numbers makes the rest immediate.</>,
  },
  {
    working: <Katex display tex="\Pr(F\cap O') = \Pr(F)-\Pr(F\cap O)" />,
    reason: <>The part of <Katex tex="F" /> outside <Katex tex="O" /> is what is left after removing the overlap. The two events are <em>not</em> independent, so multiplying is wrong.</>,
  },
  {
    working: <Katex display tex="= \tfrac3{20}-\tfrac1{20} = \tfrac2{20}" />,
    reason: <>Same denominator, so a straight subtraction.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac1{10} = 0.1}" />,
    reason: <>Simplifying.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(F) = \frac{n}{m+n}, \qquad \Pr(F\cap O) = \frac{1}{m+n}" />,
    reason: <>The same structure as part a., with the numbers replaced by expressions. The report notes students who obtained both marks typically used a Venn diagram or a table.</>,
  },
  {
    working: <Katex display tex="\Pr(F\cap O') = \frac{n}{m+n}-\frac{1}{m+n} = \frac{n-1}{m+n}" />,
    reason: <>Same denominators again, so the subtraction is easy — this is why part a. came first.</>,
  },
  {
    working: <Katex display tex="\frac{n-1}{m+n} = 0.05 = \frac{1}{20}" />,
    reason: <>Writing the decimal as a fraction keeps the algebra exact.</>,
  },
  {
    working: <Katex display tex="20(n-1) = m+n" />,
    reason: <>Cross-multiplying — the transposition the report says caused trouble.</>,
  },
  {
    working: <Katex display tex="20n-20-n = m" />,
    reason: <>Collecting the <Katex tex="n" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 19n-20}" />,
    reason: <>Check with <Katex tex="n=2" />: <Katex tex="m=18" />, and <Katex tex="\tfrac{2-1}{20}=0.05" /> ✓.</>,
  },
]

export default function MethodsQ2_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          A car manufacturer is reviewing the performance of its car model X. It is known that
          at any given six-month service, the probability of model X requiring an oil change
          is <Katex tex="\tfrac{17}{20}" />, the probability of model X requiring an air
          filter change is <Katex tex="\tfrac{3}{20}" /> and the probability of model X
          requiring both is <Katex tex="\tfrac{1}{20}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Venn Diagram"
        marks={1}
        statement={
          <>
            State the probability that at any given six-month service model X will require an
            air filter change without an oil change.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Probability Algebra"
        marks={2}
        statement={
          <>
            The car manufacturer is developing a new model, Y. The production goals are that
            the probability of model Y requiring an oil change at any given six-month service
            will be <Katex tex="\tfrac{m}{m+n}" />, the probability of model Y requiring an
            air filter change will be <Katex tex="\tfrac{n}{m+n}" /> and the probability of
            model Y requiring both will be <Katex tex="\tfrac{1}{m+n}" />, where{' '}
            <Katex tex="m,n\in Z^+" />.
            <br />
            Determine <Katex tex="m" /> in terms of{' '}
            <Katex tex="n" /> if the probability of model Y requiring an air filter change
            without an oil change at any given six-month service is 0.05.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
