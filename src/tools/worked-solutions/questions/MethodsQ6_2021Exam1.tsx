// 2021 Mathematical Methods — Exam 1 Question 6 (6 marks). A box of doughnuts: a two-way
// count, a conditional probability in terms of an unknown, and an exact sample proportion.
// Question text transcribed from the original paper. Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      Generally this question was well answered. A common incorrect answer came from falsely
      assuming independence and calculating{' '}
      <Katex tex="\Pr(C)\times\Pr(G')=\tfrac12\times\tfrac{7}{10}=\tfrac{7}{20}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [78, 11, 11],
  average: 0.4,
  comment: (
    <>
      This question was not well answered. Many students did not use <Katex tex="g" /> as
      stated in the question; few could find <Katex tex="6-g" />. Some used{' '}
      <Katex tex="6-g" /> as a probability instead of <Katex tex="\tfrac{6-g}{10}" />. Those
      who drew a probability diagram, either a tree diagram or a Karnaugh table, tended to
      have better success.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 12, 8, 29],
  average: 1.2,
  comment: (
    <>
      This question was well attempted. Students were generally able to identify the binomial
      distribution with parameters <Katex tex="n=5" />, <Katex tex="p=\tfrac12" />. Common
      errors involved incorrect identification of the parameters as <Katex tex="n=4" /> or{' '}
      <Katex tex="p=0.8" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{with custard} = \tfrac12\times20 = 10" />,
    reason: 'Turning fractions into counts out of 20 makes the two-way table trivial.',
  },
  {
    working: <Katex display tex="\text{glazed, with custard} = \tfrac{1}{10}\times20 = 2" />,
    reason: 'The only cell given directly.',
  },
  {
    working: <Katex display tex="\text{not glazed, with custard} = 10-2 = 8" />,
    reason: <>Of the 10 custard doughnuts, 2 are glazed. The <Katex tex="\tfrac{7}{10}" /> "not glazed" figure is not needed for this part.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr = \tfrac{8}{20} = \tfrac25}" />,
    reason: <>Note this is <em>not</em> <Katex tex="\tfrac12\times\tfrac{7}{10}=\tfrac{7}{20}" /> — glazing and custard are not independent here, which is exactly what the given <Katex tex="\tfrac{1}{10}" /> tells you.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{glazed in the box} = 20-\tfrac{7}{10}\times20 = 20-14 = 6" />,
    reason: <>Seven-tenths are not glazed, so six of the twenty are.</>,
  },
  {
    working: <Katex display tex="\text{Box A has } g \text{ glazed} \implies \text{Box B has } 6-g" />,
    reason: 'The six glazed doughnuts are split between the two boxes — this is the step the report says few students reached.',
  },
  {
    working: <Katex display tex="\Pr(A\cap G) = \tfrac12\times\tfrac{g}{10}, \quad \Pr(B\cap G) = \tfrac12\times\tfrac{6-g}{10}" />,
    reason: <>Each box is chosen with probability <Katex tex="\tfrac12" />, and each holds 10 doughnuts — so the glazed count must be divided by 10 to become a probability.</>,
  },
  {
    working: <Katex display tex="\Pr(B\mid G) = \frac{\Pr(B\cap G)}{\Pr(A\cap G)+\Pr(B\cap G)}" />,
    reason: 'Conditional probability, with the denominator built from the two ways of being glazed.',
  },
  {
    working: <Katex display tex="= \frac{\tfrac{6-g}{20}}{\tfrac{g}{20}+\tfrac{6-g}{20}} = \frac{6-g}{g+(6-g)}" />,
    reason: <>Every <Katex tex="\tfrac{1}{20}" /> cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(B\mid G) = \frac{6-g}{6}}" />,
    reason: <>Equivalently <Katex tex="1-\tfrac g6" />. Sanity check: <Katex tex="g=6" /> puts every glazed doughnut in Box A, giving probability 0 ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{n} \text{ where } X \sim \mathrm{Bi}\!\left(5,\tfrac12\right)" />,
    reason: <>A sample proportion is a count divided by the sample size, so <Katex tex="n=5" /> and <Katex tex="p=\tfrac12" /> — not <Katex tex="p=0.8" />, which is the threshold, not a probability of success.</>,
  },
  {
    working: <Katex display tex="\hat P \ge 0.8 \iff \frac{X}{5} \ge 0.8 \iff X \ge 4" />,
    reason: <>Converting the proportion back to a count: <Katex tex="0.8\times5=4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge4) = \Pr(X=4)+\Pr(X=5)" />,
    reason: <>Only two terms, which is why "do not use a normal approximation" is workable by hand.</>,
  },
  {
    working: <Katex display tex="= \binom54\left(\tfrac12\right)^4\left(\tfrac12\right)+\binom55\left(\tfrac12\right)^5" />,
    reason: <>Every term carries <Katex tex="\left(\tfrac12\right)^5=\tfrac{1}{32}" />, since <Katex tex="p=1-p" />.</>,
  },
  {
    working: <Katex display tex="= \frac{5}{32}+\frac{1}{32} = \frac{6}{32}" />,
    reason: <><Katex tex="\binom54=5" /> and <Katex tex="\binom55=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{3}{16}}" />,
    reason: <>About 0.1875. Exact, as the instruction demands.</>,
  },
]

export default function MethodsQ6_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (6 marks)</p>
        <p>
          An online shopping site sells boxes of doughnuts. A box contains 20 doughnuts.
          There are only four types of doughnuts in the box. They are: glazed, with custard;
          glazed, with no custard; not glazed, with custard; and not glazed, with no custard.
        </p>
        <p>
          It is known that, in the box, <Katex tex="\tfrac12" /> of the doughnuts are with
          custard, <Katex tex="\tfrac{7}{10}" /> of the doughnuts are not glazed, and{' '}
          <Katex tex="\tfrac{1}{10}" /> of the doughnuts are glazed, with custard.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            A doughnut is chosen at random from the box. Find the probability that it is not
            glazed, with custard.
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
            The 20 doughnuts in the box are randomly allocated to two new boxes, Box A and
            Box B. Each new box contains 10 doughnuts. One of the two new boxes is chosen at
            random and then a doughnut from that box is chosen at random. Let{' '}
            <Katex tex="g" /> be the number of glazed doughnuts in Box A. Find the
            probability, in terms of <Katex tex="g" />, that the doughnut comes from Box B
            given that it is glazed.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            The online shopping site has over one million visitors per day. It is known that
            half of these visitors are less than 25 years old. Let <Katex tex="\hat P" /> be
            the random variable representing the proportion of visitors who are less than 25
            years old in a random sample of five visitors. Find{' '}
            <Katex tex="\Pr\!\left(\hat P\ge0.8\right)" />. Do not use a normal
            approximation.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
