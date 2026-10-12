// 2025 Mathematical Methods — Exam 1 Question 4 (4 marks). A discrete distribution whose
// unknown satisfies a quadratic, then a probability and a mean. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [26, 18, 56],
  average: 1.3,
  comment: (
    <>
      This question was a ‘show that’ question. As such, each line of working needed to
      demonstrate a clear, logical and explicit progression, leading to the result provided in the
      question stem. In particular, the probabilities needed to be added together and equated to
      1, a quadratic equation formed and correctly solved. It was not sufficient to verify the
      solutions of <Katex tex="k=10" /> or <Katex tex="k=15" /> by substitution. Some students
      did not form the correct quadratic equation. Some students incorrectly used the formula for{' '}
      <Katex tex="E(X)" /> instead of using the fact that the probabilities must sum to 1.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      This question was well attempted. Common errors included incorrectly using{' '}
      <Katex tex="\Pr(X>1)=1-\Pr(X=0)" /> or{' '}
      <Katex tex="\Pr(X>1)=\Pr(X=1)+\Pr(X=2)+\Pr(X=3)" />, both of which led to the incorrect
      answer <Katex tex="\dfrac{11}{15}" />. Some students incorrectly cancelled{' '}
      <Katex tex="\dfrac{5}{15}" /> to <Katex tex="\dfrac{1}{5}" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: <>This question was well attempted. Some students made arithmetic errors when working with the fractions.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac4k+\frac{2k}{75}+\frac{k}{75}+\frac2k = 1" />,
    reason: <>The probabilities in any distribution sum to 1, which gives an equation in <Katex tex="k" />.</>,
    more: <>The report notes some students used the formula for <Katex tex="\mathrm{E}(X)" /> here instead. Nothing in the question gives a mean, so <Katex tex="\mathrm{E}(X)" /> cannot produce an equation for <Katex tex="k" />. When a table contains an unknown and nothing else is given, the sum-to-1 condition is always the equation to write.</>,
  },
  {
    working: <Katex display tex="\frac6k+\frac{3k}{75} = 1 \implies \frac6k+\frac{k}{25} = 1" />,
    reason: <>Collecting like terms: <Katex tex="\tfrac4k+\tfrac2k=\tfrac6k" /> and <Katex tex="\tfrac{2k}{75}+\tfrac{k}{75}=\tfrac{3k}{75}=\tfrac{k}{25}" />.</>,
  },
  {
    working: <Katex display tex="\times 25k: \quad 150+k^2 = 25k" />,
    reason: <>Multiplying every term by <Katex tex="25k" />, the lowest common denominator, clears the fractions. Allowed because <Katex tex="k>0" />, so <Katex tex="k\neq 0" />.</>,
    more: <>Every term is multiplied, including the 1 on the right: <Katex tex="25k\cdot\tfrac6k=150" />, <Katex tex="25k\cdot\tfrac{k}{25}=k^2" /> and <Katex tex="25k\cdot1=25k" />. Missing a term gives the wrong quadratic; the report notes some students did not form the correct one.</>,
  },
  {
    working: <Katex display tex="k^2-25k+150 = 0 \implies (k-10)(k-15) = 0" />,
    reason: <>Rearranging to <Katex tex="=0" /> and factorising: two numbers multiplying to 150 and adding to <Katex tex="-25" /> are <Katex tex="-10" /> and <Katex tex="-15" />.</>,
    more: <>In a ‘show that’ question, forming <em>and solving</em> this quadratic is what earns the marks. The report says it was not sufficient to substitute <Katex tex="k=10" /> and <Katex tex="k=15" /> back in: that only checks the two values work, not that they are the only ones. If the factors don't come to mind, the quadratic formula gives the same result: <Katex tex="k=\tfrac{25\pm\sqrt{625-600}}{2}=\tfrac{25\pm5}{2}" />, so <Katex tex="k=15" /> or <Katex tex="k=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 10 \ \text{ or } \ k = 15}" />,
    reason: <>Both are positive, as the question requires, so both are kept. As required.</>,
    more: <>Each value also gives a genuine distribution, with every probability between 0 and 1. For <Katex tex="k=10" /> the table is <Katex tex="\tfrac25,\tfrac{4}{15},\tfrac{2}{15},\tfrac15" />; for <Katex tex="k=15" /> it is <Katex tex="\tfrac{4}{15},\tfrac25,\tfrac15,\tfrac{2}{15}" />. That is why the question can offer two answers and then pick one in part b.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="k=15: \quad \Pr(X=x) = \tfrac{4}{15},\ \tfrac{30}{75},\ \tfrac{15}{75},\ \tfrac{2}{15}" />,
    reason: <>Substituting into each entry of the table.</>,
  },
  {
    working: <Katex display tex="= \tfrac{4}{15},\ \tfrac{6}{15},\ \tfrac{3}{15},\ \tfrac{2}{15}" />,
    reason: <>Dividing top and bottom of <Katex tex="\tfrac{30}{75}" /> and <Katex tex="\tfrac{15}{75}" /> by 5 puts every probability over 15. Check: <Katex tex="4+6+3+2=15" /> ✓.</>,
  },
  {
    working: <Katex display tex="\Pr(X>1) = \Pr(X=2)+\Pr(X=3) = \tfrac{3}{15}+\tfrac{2}{15}" />,
    reason: <>Strictly greater than 1 means only <Katex tex="x=2" /> and <Katex tex="x=3" />; <Katex tex="X=1" /> is <em>not</em> included.</>,
    more: <>The report's two common errors, <Katex tex="1-\Pr(X=0)" /> and <Katex tex="\Pr(X=1)+\Pr(X=2)+\Pr(X=3)" />, are both <Katex tex="\Pr(X\geq 1)" />: they include <Katex tex="\Pr(X=1)=\tfrac{6}{15}" /> and give <Katex tex="\tfrac{6+3+2}{15}=\tfrac{11}{15}" />. Before adding, list which values of <Katex tex="x" /> actually satisfy the inequality.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>1) = \tfrac{5}{15} = \tfrac13}" />,
    reason: <>Dividing top and bottom by 5.</>,
    more: <>The report notes some students cancelled <Katex tex="\tfrac{5}{15}" /> to <Katex tex="\tfrac15" />. Dividing the numerator by 5 gives 1 and the denominator by 5 gives 3, so the answer is <Katex tex="\tfrac13" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \sum x\Pr(X=x)" />,
    reason: <>Each value weighted by its probability.</>,
  },
  {
    working: <Katex display tex="= 0\!\left(\tfrac{4}{15}\right)+1\!\left(\tfrac{6}{15}\right)+2\!\left(\tfrac{3}{15}\right)+3\!\left(\tfrac{2}{15}\right)" />,
    reason: <>Substituting each <Katex tex="x" /> and its probability from the table over 15 (part b.i); the <Katex tex="x=0" /> term is 0.</>,
  },
  {
    working: <Katex display tex="= \frac{0+6+6+6}{15} = \frac{18}{15}" />,
    reason: <>Each product is <Katex tex="6/15" />: <Katex tex="1\times6=6" />, <Katex tex="2\times3=6" />, <Katex tex="3\times2=6" /> over the common denominator 15.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = \tfrac65 = 1.2}" />,
    reason: <>Simplifying by dividing top and bottom by 3; as a decimal this is exactly 1.2.</>,
    more: <>The report notes some students made arithmetic errors with the fractions. Writing every probability over 15 first (part b.i) avoids most of them, since each term is just a whole number over 15. A quick check: <Katex tex="\mathrm{E}(X)" /> must lie between 0 and 3, and since <Katex tex="\tfrac{10}{15}" /> of the probability sits at <Katex tex="x=0" /> and <Katex tex="x=1" />, it should be nearer 1 than 3. <Katex tex="\tfrac65" /> fits.</>,
  },
]

export default function MethodsQ4_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
        <p>
          The probability distribution for the discrete random variable <Katex tex="X" /> is
          given in the table below, where <Katex tex="k" /> is a positive real number.
        </p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <tbody>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                  <Katex tex="x" />
                </th>
                {[0, 1, 2, 3].map((v) => (
                  <td key={v} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">{v}</td>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal whitespace-nowrap">
                  <Katex tex="\Pr(X=x)" />
                </th>
                {['\\frac{4}{k}', '\\frac{2k}{75}', '\\frac{k}{75}', '\\frac{2}{k}'].map((v, i) => (
                  <td key={i} className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center">
                    <Katex tex={v} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Only one property of a probability distribution is needed here: the entries sum
              to 1. Setting that up and clearing the denominators gives a quadratic in{' '}
              <Katex tex="k" />. Part b. then fixes <Katex tex="k=15" />, and the table becomes an
              ordinary distribution to find a probability and a mean from.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Discrete Distribution"
        marks={2}
        statement={<>Show that <Katex tex="k=10" /> or <Katex tex="k=15" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Let <Katex tex="k=15" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Discrete Distribution"
        marks={1}
        statement={<>Find <Katex tex="\Pr(X>1)" />.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Expected Value" marks={1} statement={<>Find <Katex tex="\mathrm{E}(X)" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
