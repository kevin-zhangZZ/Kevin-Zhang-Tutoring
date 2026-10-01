// 2021 Mathematical Methods — Exam 1 Question 6 (6 marks). A box of doughnuts: a two-way
// count, a conditional probability in terms of an unknown, and an exact sample proportion.
// Question text transcribed from the original paper. Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original. Interactive diagrams (§15): part b.
// slides g to show Box B holding the other 6 − g glazed doughnuts and the tree dividing each count
// by 10, with a toggle for the report's "6 − g as a probability" error
// (interactives/meth-2021e1-q6b-glazed.tsx); part c. draws the distribution of P̂ = X/5 with
// buttons for the report's n = 4 and p = 0.8 errors (interactives/meth-2021e1-q6c-phat.tsx).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GlazedWidget = lazyWidget(() => import('../interactives/meth-2021e1-q6b-glazed'))
const PhatWidget = lazyWidget(() => import('../interactives/meth-2021e1-q6c-phat'))

const EXAM_A: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      Generally, this question was well answered. A common incorrect answer was obtained by
      falsely assuming independence and calculating{' '}
      <Katex tex="\Pr(C\cap G')=\Pr(C)\times\Pr(G')=\tfrac12\times\tfrac{7}{10}=\tfrac{7}{20}" />
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
      <Katex tex="6-g" /> as a probability instead of <Katex tex="\tfrac{6-g}{10}" /> and
      multiplied it by <Katex tex="\tfrac12" />. Those who drew a probability diagram, either a
      tree diagram or Karnaugh table, tended to have better success.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 12, 8, 29],
  average: 1.2,
  comment: (
    <>
      This question was well attempted. Students were generally able to identify the binomial
      distribution with parameters <Katex tex="n=5" />, <Katex tex="p=\tfrac12" />. Brackets,
      or lack thereof, caused a problem for some, but generally students were able to
      manipulate the fractions to obtain <Katex tex="\tfrac{3}{16}" />. Common
      errors involved incorrect identification of parameters as <Katex tex="n=4" /> or{' '}
      <Katex tex="p=0.8" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{with custard} = \tfrac12\times20 = 10" />,
    reason: <>The box holds exactly 20 doughnuts, so turn each fraction into a count. Whole numbers are easier to add and subtract than fractions.</>,
  },
  {
    working: <Katex display tex="\text{glazed, with custard} = \tfrac{1}{10}\times20 = 2" />,
    reason: <>This count comes straight from the third fact.</>,
  },
  {
    working: <Katex display tex="\text{not glazed, with custard} = 10-2 = 8" />,
    reason: <>Every custard doughnut is either glazed or not glazed, so take the 2 glazed ones away from the 10 with custard. The <Katex tex="\tfrac{7}{10}" /> "not glazed" fact is not needed for this part.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(G'\cap C) = \tfrac{8}{20} = \tfrac25}" />,
    reason: (
      <>
        Writing <Katex tex="G" /> for glazed and <Katex tex="C" /> for with custard: 8 of the 20
        equally likely doughnuts. Don&apos;t multiply{' '}
        <Katex tex="\Pr(C)\times\Pr(G')=\tfrac12\times\tfrac{7}{10}=\tfrac{7}{20}" />. Multiplying
        is only valid for independent events, and these are not independent: if they were,{' '}
        <Katex tex="\Pr(G\cap C)" /> would be <Katex tex="\tfrac{3}{10}\times\tfrac12=\tfrac{3}{20}" />,
        but it is given as <Katex tex="\tfrac{1}{10}=\tfrac{2}{20}" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{glazed in the box} = 20-\tfrac{7}{10}\times20 = 20-14 = 6" />,
    reason: <>Seven-tenths of the 20 are not glazed, so 14 are not glazed and 6 are glazed. Moving the doughnuts into new boxes doesn&apos;t change them, so the two new boxes hold these 6 glazed doughnuts between them.</>,
  },
  {
    working: <Katex display tex="\text{Box A has } g \text{ glazed} \implies \text{Box B has } 6-g" />,
    reason: <>The six glazed doughnuts are split between the two boxes — this is the step the report says few students reached. Slide <Katex tex="g" /> in the diagram below to see it.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(A\cap G) = \tfrac12\times\tfrac{g}{10} = \tfrac{g}{20}" />
        <Katex display tex="\Pr(B\cap G) = \tfrac12\times\tfrac{6-g}{10} = \tfrac{6-g}{20}" />
      </>
    ),
    reason: (
      <>
        Let <Katex tex="A" /> and <Katex tex="B" /> be the events that Box <i>A</i> or Box{' '}
        <i>B</i> is chosen, and <Katex tex="G" /> that the doughnut is glazed. On a tree diagram,
        multiply along the branches: first the box (probability <Katex tex="\tfrac12" /> each),
        then a glazed doughnut from that box. Each box holds 10 doughnuts, so its glazed count
        must be divided by 10 to become a probability.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(B\mid G) = \frac{\Pr(B\cap G)}{\Pr(A\cap G)+\Pr(B\cap G)}" />,
    reason: <>Conditional probability is <Katex tex="\Pr(B\mid G)=\frac{\Pr(B\cap G)}{\Pr(G)}" />. A glazed doughnut came from either Box <i>A</i> or Box <i>B</i>, so <Katex tex="\Pr(G)" /> is the sum of the two glazed branches of the tree.</>,
  },
  {
    working: <Katex display tex="= \frac{\tfrac{6-g}{20}}{\tfrac{g}{20}+\tfrac{6-g}{20}} = \frac{\tfrac{6-g}{20}}{\tfrac{6}{20}}" />,
    reason: <>In the denominator the <Katex tex="g" />&apos;s cancel, since <Katex tex="g+(6-g)=6" />. So <Katex tex="\Pr(G)=\tfrac{6}{20}=\tfrac{3}{10}" /> whatever <Katex tex="g" /> is: the same as picking from the original box, where 6 of the 20 are glazed.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(B\mid G) = \frac{6-g}{6}}" />,
    reason: <>Dividing by <Katex tex="\tfrac{6}{20}" /> is multiplying by <Katex tex="\tfrac{20}{6}" />, so the 20s cancel. Equivalently <Katex tex="1-\tfrac g6" />. Check the extremes: <Katex tex="g=0" /> puts all six glazed doughnuts in Box <i>B</i>, giving 1, and <Katex tex="g=6" /> puts them all in Box <i>A</i>, giving 0 ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{5} \text{ where } X \sim \mathrm{Bi}\!\left(5,\tfrac12\right)" />,
    reason: (
      <>
        <Katex tex="X" /> is the number of visitors in the sample who are under 25, and a sample
        proportion is that count divided by the sample size. Each visitor is under 25 with
        probability <Katex tex="\tfrac12" />, and with over a million visitors, picking five
        barely changes that proportion, so the five are independent trials with the same chance:
        binomial. So <Katex tex="n=5" /> (the sample size, not 4) and{' '}
        <Katex tex="p=\tfrac12" /> (the proportion of <em>all</em> visitors under 25). It is
        not <Katex tex="p=0.8" />: 0.8 is a value of <Katex tex="\hat P" /> in the question,
        not the chance that one visitor is under 25.
      </>
    ),
  },
  {
    working: <Katex display tex="\hat P \ge 0.8 \iff \frac{X}{5} \ge 0.8 \iff X \ge 4" />,
    reason: <>Turn the proportion back into a count by multiplying both sides by 5: <Katex tex="0.8\times5=4" />. So at least 4 of the 5 visitors are under 25.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge4) = \Pr(X=4)+\Pr(X=5)" />,
    reason: <>There are only five visitors, so <Katex tex="X" /> can&apos;t be more than 5: <Katex tex="X\ge4" /> means <Katex tex="X=4" /> or <Katex tex="X=5" />, and we add their probabilities.</>,
  },
  {
    working: <Katex display tex="= \binom54\left(\tfrac12\right)^4\left(\tfrac12\right)^1+\binom55\left(\tfrac12\right)^5" />,
    reason: <>The binomial formula <Katex tex="\Pr(X=x)=\binom nx p^x(1-p)^{n-x}" /> with <Katex tex="n=5" /> and <Katex tex="p=1-p=\tfrac12" />. Keep the brackets so each power applies to the whole fraction: every term then carries <Katex tex="\left(\tfrac12\right)^5=\tfrac{1}{32}" />.</>,
  },
  {
    working: <Katex display tex="= 5\times\frac{1}{32}+1\times\frac{1}{32} = \frac{6}{32}" />,
    reason: <><Katex tex="\binom54=5" /> (choose which 4 of the 5 visitors are the ones under 25) and <Katex tex="\binom55=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\hat P\ge0.8\right) = \tfrac{3}{16}}" />,
    reason: <>Divide the top and bottom of <Katex tex="\tfrac{6}{32}" /> by 2. This is the exact binomial probability, which is what "do not use a normal approximation" asks for.</>,
  },
]

export default function MethodsQ6_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (6 marks)</p>
        <p>An online shopping site sells boxes of doughnuts.</p>
        <p>A box contains 20 doughnuts. There are only four types of doughnuts in the box. They are:</p>
        <ul className="list-disc pl-6">
          <li>glazed, with custard</li>
          <li>glazed, with no custard</li>
          <li>not glazed, with custard</li>
          <li>not glazed, with no custard.</li>
        </ul>
        <p>It is known that, in the box:</p>
        <ul className="list-disc pl-6">
          <li><Katex tex="\tfrac12" /> of the doughnuts are with custard</li>
          <li><Katex tex="\tfrac{7}{10}" /> of the doughnuts are not glazed</li>
          <li><Katex tex="\tfrac{1}{10}" /> of the doughnuts are glazed, with custard.</li>
        </ul>
      </div>

      <PartCard
        letter="a"
        topic="Two-Way Table"
        marks={1}
        statement={
          <>
            A doughnut is chosen at random from the box.
            <br />
            Find the probability that it is not
            glazed, with custard.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            The 20 doughnuts in the box are randomly allocated to two new boxes, Box <i>A</i> and
            Box <i>B</i>.
            <br />
            Each new box contains 10 doughnuts.
            <br />
            One of the two new boxes is chosen at random and then a doughnut from that box is
            chosen at random.
            <br />
            Let <Katex tex="g" /> be the number of glazed doughnuts in Box <i>A</i>.
            <br />
            Find the probability, in terms of <Katex tex="g" />, that the doughnut comes from Box B
            given that it is glazed.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Box B holds the other 6 − g glazed, and each count must be divided by 10">
          <GlazedWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Sample Proportion"
        marks={3}
        statement={
          <>
            The online shopping site has over one million visitors per day.
            <br />
            It is known that half of these visitors are less than 25 years old.
            <br />
            Let <Katex tex="\hat P" /> be the random variable representing the proportion of
            visitors who are less than 25 years old in a random sample of five visitors.
            <br />
            Find{' '}
            <Katex tex="\Pr\!\left(\hat P\ge0.8\right)" />. Do not use a normal
            approximation.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="0.8 is a value of P̂ on the axis, not a parameter: n = 5 and p = ½">
          <PhatWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
