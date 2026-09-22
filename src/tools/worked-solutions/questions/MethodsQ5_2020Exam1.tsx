// 2020 Mathematical Methods — Exam 1, Question 5 (4 marks). A binomial "three or more",
// then a conditional probability in a prescribed algebraic form. Question text transcribed
// from the original paper (no diagram given). Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [33, 38, 29],
  average: 1,
  comment: (
    <>
      Most students recognised use of the binomial distribution, clearly specifying the
      parameters <Katex tex="n=4" /> and <Katex tex="p=\tfrac35" />. Common errors included
      finding <Katex tex="\Pr(X=3)" /> only, use of an incorrect formula, or arithmetic
      errors in evaluation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [60, 31, 10],
  average: 0.5,
  comment: (
    <>
      Students were generally able to identify that conditional probability was involved.
      However, they need to be aware that simply quoting a rule or formula is not sufficient;
      they are required to demonstrate how it is used within the context of the question.
      Many students did not present their answer in the required form.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(4,\tfrac35\right)" />,
    reason: <>Four independent people, each with the gene with probability <Katex tex="\tfrac35" />. State the distribution — the report expects it.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = \Pr(X=3)+\Pr(X=4)" />,
    reason: <>"Three or more" out of four means exactly two cases — not just <Katex tex="X=3" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=3) = \binom43\left(\tfrac35\right)^3\left(\tfrac25\right) = 4\times\tfrac{27}{125}\times\tfrac25 = \tfrac{216}{625}" />,
    reason: <>The binomial formula with <Katex tex="\binom43=4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \left(\tfrac35\right)^4 = \tfrac{81}{625}" />,
    reason: <>Only one way for all four.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge3) = \tfrac{216}{625}+\tfrac{81}{625} = \tfrac{297}{625}}" />,
    reason: <>About <Katex tex="0.475" /> — just under half, which is plausible when each person has probability <Katex tex="0.6" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X=2\mid X\ge1) = \frac{\Pr(X=2\cap X\ge1)}{\Pr(X\ge1)}" />,
    reason: <>The conditional formula. Quoting it is not enough — the report wants both probabilities evaluated.</>,
  },
  {
    working: <Katex display tex="X=2 \implies X\ge1, \quad\text{so}\quad \Pr(X=2\cap X\ge1) = \Pr(X=2)" />,
    reason: <>The smaller event sits inside the larger one.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2) = \binom42\left(\tfrac35\right)^2\left(\tfrac25\right)^2 = \frac{6\times3^2\times2^2}{5^4}" />,
    reason: <>Leaving it in index form is what makes the required answer form fall out.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0) = 1-\left(\tfrac25\right)^4 = \frac{5^4-2^4}{5^4}" />,
    reason: <>The complement, over a common denominator of <Katex tex="5^4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2\mid X\ge1) = \frac{6\times9\times4}{5^4-2^4} = \frac{216}{5^4-2^4}" />,
    reason: <>The <Katex tex="5^4" /> denominators cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{6^3}{5^4-2^4}}" />,
    reason: <>So <Katex tex="a=6" />, <Katex tex="b=5" />, <Katex tex="c=2" />, since <Katex tex="216=6^3" />. Numerically <Katex tex="\tfrac{216}{609}\approx0.355" />.</>,
  },
]

export default function MethodsQ5_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          For a certain population the probability of a person being born with the specific
          gene SPGE1 is <Katex tex="\tfrac35" />. The probability of a person having this gene
          is independent of any other person in the population having this gene.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            In a randomly selected group of four people, what is the probability that three or
            more people have the SPGE1 gene?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            In a randomly selected group of four people, what is the probability that exactly
            two people have the SPGE1 gene, given that at least one of those people has the
            SPGE1 gene? Express your answer in the form{' '}
            <Katex tex="\dfrac{a^3}{b^4-c^4}" />, where <Katex tex="a,b,c\in Z^+" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
