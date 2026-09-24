// 2025 Mathematical Methods — Exam 1 Question 4 (4 marks). A discrete distribution whose
// unknown satisfies a quadratic, then a probability and a mean. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>Every probability distribution sums to 1 — this is the only condition available, and the one the question turns on.</>,
  },
  {
    working: <Katex display tex="\frac6k+\frac{3k}{75} = 1 \implies \frac6k+\frac{k}{25} = 1" />,
    reason: <>Collecting the two pairs of like terms.</>,
  },
  {
    working: <Katex display tex="\times 25k: \quad 150+k^2 = 25k" />,
    reason: <>Clearing the denominators. Legitimate because <Katex tex="k>0" />.</>,
  },
  {
    working: <Katex display tex="k^2-25k+150 = 0 \implies (k-10)(k-15) = 0" />,
    reason: <>Two numbers multiplying to 150 and adding to 25. Forming <em>and solving</em> this equation is the point — the report says it was not sufficient to verify <Katex tex="k=10" /> or <Katex tex="k=15" /> by substitution.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 10 \ \text{ or } \ k = 15}" />,
    reason: <>Both are positive, so both survive. As required.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="k=15: \quad \Pr(X=x) = \tfrac{4}{15},\ \tfrac{30}{75},\ \tfrac{15}{75},\ \tfrac{2}{15}" />,
    reason: <>Substituting into each entry of the table.</>,
  },
  {
    working: <Katex display tex="= \tfrac{4}{15},\ \tfrac{6}{15},\ \tfrac{3}{15},\ \tfrac{2}{15}" />,
    reason: <>Putting everything over 15 makes the rest of the question arithmetic-free. Check: <Katex tex="4+6+3+2=15" /> ✓.</>,
  },
  {
    working: <Katex display tex="\Pr(X>1) = \Pr(X=2)+\Pr(X=3) = \tfrac{3}{15}+\tfrac{2}{15}" />,
    reason: <>Strictly greater than 1, so <Katex tex="X=1" /> is <em>not</em> included. The report's common errors, <Katex tex="1-\Pr(X=0)" /> and adding in <Katex tex="\Pr(X=1)" />, both include it and give <Katex tex="\tfrac{11}{15}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>1) = \tfrac{5}{15} = \tfrac13}" />,
    reason: <>In simplest form.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \sum x\Pr(X=x)" />,
    reason: <>Each value weighted by its probability.</>,
  },
  {
    working: <Katex display tex="= 0\!\left(\tfrac{4}{15}\right)+1\!\left(\tfrac{6}{15}\right)+2\!\left(\tfrac{3}{15}\right)+3\!\left(\tfrac{2}{15}\right)" />,
    reason: <>The <Katex tex="x=0" /> term contributes nothing, which is worth noticing before multiplying it out.</>,
  },
  {
    working: <Katex display tex="= \frac{0+6+6+6}{15} = \frac{18}{15}" />,
    reason: <>Common denominator throughout, so no fraction arithmetic is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = \tfrac65 = 1.2}" />,
    reason: <>Sensible: the distribution is slightly weighted towards the lower values, so a mean a little above 1 is right.</>,
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Only one property of a probability distribution is needed here: the entries sum
            to 1. Setting that up and clearing the denominators gives a quadratic in{' '}
            <Katex tex="k" />, and both of its roots are positive — which is why the question
            can offer two answers.
          </p>
          <p>
            In part b., putting every probability over 15 up front turns the rest into
            counting. The four values become{' '}
            <Katex tex="\tfrac{4}{15},\tfrac{6}{15},\tfrac{3}{15},\tfrac{2}{15}" />, and both
            remaining answers follow without any fraction arithmetic.
          </p>
        </Background>
      </div>

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
