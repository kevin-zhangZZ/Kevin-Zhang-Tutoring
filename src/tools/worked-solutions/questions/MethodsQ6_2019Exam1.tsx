// 2019 Mathematical Methods — Exam 1, Question 6 (3 marks).
// A sample proportion of faulty pegs (part a), then Pr(sample proportion in a box of 12 is
// less than the true proportion 1/6), expressed in the form a(b)ⁿ (part b). Question text
// transcribed from the original paper (no diagram given — purely algebraic). Cross-checked
// against the VCAA examination report and itute's independent solutions — both agree with
// the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1.0,
  comment: <>This question was done well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 29, 12],
  average: 0.6,
  comment: (
    <>
      Most students recognised this as a binomial distribution; however, few managed to
      correctly find the two component expressions. Even fewer successfully managed to
      manipulate these expressions to the format specified by the question. Another common
      error was to apply the standard deviation formula.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{proportion} = \dfrac{\text{faulty}}{\text{sample size}} = \dfrac{8}{41}" />,
    reason: <>Eight faulty pegs out of <Katex tex="41" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{8}{41}}" />,
    reason: <>Leave it as a fraction: the question asks for a proportion and sets no rounding. (<Katex tex="\tfrac{8}{41}\approx0.195" /> — a shade under one peg in five was faulty in this particular sample. Part b. then tells you the company's <em>actual</em> long-run rate is <Katex tex="\tfrac16\approx0.167" />, so this sample happened to run slightly faulty; a sample proportion is an estimate, not the true value.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \operatorname{Bi}\!\left(12,\ \tfrac16\right)" />,
    reason: <>Let <Katex tex="X" /> be the number of faulty pegs in a box of 12 — a box of <Katex tex="\hat P<\tfrac16" /> means fewer than <Katex tex="12\times\tfrac16=2" /> faulty pegs, i.e. <Katex tex="X<2" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\hat P<\tfrac16\right) = \Pr(X<2) = \Pr(X=0)+\Pr(X=1)" />,
    reason: <>Only the counts <Katex tex="0" /> and <Katex tex="1" /> qualify.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \left(\tfrac56\right)^{12}, \qquad \Pr(X=1) = \binom{12}{1}\left(\tfrac16\right)\left(\tfrac56\right)^{11} = 12\left(\tfrac16\right)\left(\tfrac56\right)^{11}" />,
    reason: <>The two binomial terms — the report says few students found both correctly.</>,
  },
  {
    working: <Katex display tex="\Pr(X<2) = \left(\tfrac56\right)^{11}\left[\tfrac56 + 12\left(\tfrac16\right)\right] = \left(\tfrac56\right)^{11}\left[\tfrac56+2\right]" />,
    reason: <>Factor out the common <Katex tex="\left(\tfrac56\right)^{11}" /> from both terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\hat P<\tfrac16\right) = \dfrac{17}{6}\left(\dfrac56\right)^{11}}" />,
    reason: <><Katex tex="\tfrac56+2=\tfrac{17}{6}" />. This matches the required form <Katex tex="a(b)^n" />, with <Katex tex="a=\tfrac{17}{6}" />, <Katex tex="b=\tfrac56" />, <Katex tex="n=11" />.</>,
  },
]

export default function MethodsQ6_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Fred owns a company that produces thousands of pegs each day. He randomly selects 41
          pegs that are produced on one day and finds eight faulty pegs.
        </p>
      </div>

      <PartCard letter="a" topic="Sample Proportion" marks={1} statement={<>What is the proportion of faulty pegs in this sample?</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Pegs are packed each day in boxes. Each box holds 12 pegs. Let <Katex tex="\hat P" />{' '}
            be the random variable that represents the proportion of faulty pegs in a box. The
            actual proportion of faulty pegs produced by the company each day is{' '}
            <Katex tex="\tfrac16" />. Find <Katex tex="\Pr\!\left(\hat P<\tfrac16\right)" />.
            Express your answer in the form <Katex tex="a(b)^n" />, where <Katex tex="a" /> and{' '}
            <Katex tex="b" /> are positive rational numbers and <Katex tex="n" /> is a positive
            integer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
