// 2024 Specialist Mathematics — Exam 1 Question 6 (5 marks). Linear combinations of
// independent normal variables: the sum of three stage times, a weighted cost, then the
// difference of two stages. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students able to find the correct mean and
      variance of the total time required to produce one weed trimmer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [48, 15, 37],
  average: 0.9,
  comment: (
    <>
      Some students did not apply the formula for the variance of a sum of independent and
      identically distributed random variables, frequently forgetting to square either the cost
      values or the standard deviation at each stage. Of those students who correctly applied
      the formula, some made arithmetic errors.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [45, 10, 45],
  average: 1.0,
  comment: (
    <>
      Students needed to find <Katex tex="\Pr\left(W_1-W_2>0\right)" /> or (equivalently){' '}
      <Katex tex="\Pr\left(W_2-W_1<0\right)" />.
      <br />
      This required finding the expected value and the variance (or going directly to the
      standard deviation) of the difference of the two random variables. Using the given result
      allowed the final answer to be obtained. Some arithmetic errors were observed and some
      students gave the correct final answer with little or no evidence of appropriate
      working.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="T = W_1+W_2+W_3" />,
    reason: <>Each stage starts as the previous one ends, so the total time is the plain sum.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 1.0+1.5+2.0 = 4.5 \ \text{hours}" />,
    reason: <>Means always add.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 0.3^2+0.4^2+0.5^2 = 0.09+0.16+0.25" />,
    reason: <><strong>Variances</strong> add, and only because the three times are independent. The table gives standard deviations, so each must be squared first.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = 4.5, \qquad \mathrm{Var}(T) = 0.5}" />,
    reason: <>The question asked for the variance, not the standard deviation — no square root at the end here.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="C = 10W_1+20W_2+15W_3" />,
    reason: <>Cost is a rate in dollars per hour times a number of hours, stage by stage.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(aX) = a^2\,\mathrm{Var}(X)" />,
    reason: <>The rule that does the work: a constant multiplier comes out squared.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(C) = 10^2(0.3)^2+20^2(0.4)^2+15^2(0.5)^2" />,
    reason: <>Both the cost and the standard deviation are squared at each stage — the report notes students frequently forgot to square one or the other.</>,
  },
  {
    working: <Katex display tex="= 100(0.09)+400(0.16)+225(0.25) = 9+64+56.25" />,
    reason: <>Three terms.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Var}(C) = 129.25 \ \text{dollars}^2}" />,
    reason: <>A sanity check: <Katex tex="\mathrm{E}(C)=10(1)+20(1.5)+15(2)=\$70" />, with a standard deviation of <Katex tex="\sqrt{129.25}\approx\$11.37" /> — a plausible spread.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W_2<W_1) = \Pr(W_2-W_1<0)" />,
    reason: <>Comparing two random variables is always a question about their difference.</>,
  },
  {
    working: <Katex display tex="D = W_2-W_1 \ \text{ is normal, as a linear combination of independent normals}" />,
    reason: <>This sentence is part of the working — it is what licenses using the standard normal at the end.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(D) = 1.5-1.0 = 0.5" />,
    reason: <>Means subtract.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(D) = (0.4)^2+(0.3)^2 = 0.25 \implies \mathrm{sd}(D) = 0.5" />,
    reason: <>Variances <em>add</em> even for a difference: <Katex tex="\mathrm{Var}(X-Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)" /> for independent variables. Subtracting them would give 0.07 and the wrong answer.</>,
  },
  {
    working: <Katex display tex="\Pr(D<0) = \Pr\!\left(Z<\frac{0-0.5}{0.5}\right) = \Pr(Z<-1)" />,
    reason: <>Standardising. The deliberately tidy numbers point straight at the given result.</>,
  },
  {
    working: <Katex display tex="\Pr(Z<-1) = \frac{1-\Pr(-1<Z<1)}{2} = \frac{1-0.68}{2}" />,
    reason: <>By symmetry the two tails outside ±1 are equal, so halve what is left over.</>,
  },
  {
    working: <Katex display tex="\boxed{0.16}" />,
    reason: <>Two decimal places, as asked. Sensible: Stage 2 averages half an hour longer than Stage 1, so it is the shorter one only about one time in six.</>,
  },
]

export default function SpecialistQ6_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (5 marks)</p>
        <p>
          The production of a brand of weed trimmer involves three stages, Stage 1, Stage 2
          and Stage 3, which take <Katex tex="W_1" /> hours, <Katex tex="W_2" /> hours and{' '}
          <Katex tex="W_3" /> hours, respectively. Here <Katex tex="W_1" />,{' '}
          <Katex tex="W_2" /> and <Katex tex="W_3" /> are independent random variables, which
          may be assumed to be normally distributed. Assume that Stage 2 starts immediately
          after Stage 1 ends and that Stage 3 starts immediately after Stage 2 ends.
        </p>
        <p>The mean, standard deviation and cost at each stage are shown in the table below.</p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <thead>
              <tr>
                {['Stage', 'Time (h)', 'Mean (h)', 'Standard deviation (h)', 'Cost ($/h)'].map((h) => (
                  <th key={h} className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'W_1', '1.0', '0.3', '10'],
                ['2', 'W_2', '1.5', '0.4', '20'],
                ['3', 'W_3', '2.0', '0.5', '15'],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">{row[0]}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">
                    <Katex tex={row[1]} />
                  </td>
                  {row.slice(2).map((c, i) => (
                    <td key={i} className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            One rule runs through all three parts:{' '}
            <Katex tex="\mathrm{Var}(aX+bY) = a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)" /> for
            independent <Katex tex="X" /> and <Katex tex="Y" />. Everything squares — the
            coefficients and the standard deviations alike — and the coefficients square
            away their signs, so variances add even when the variables are subtracted.
          </p>
          <p>
            Part c. is the one to read carefully. "Stage 2 takes less time than Stage 1" is
            not a statement about either distribution on its own; it is{' '}
            <Katex tex="\Pr(W_2-W_1<0)" />, and the numbers are chosen so that the answer
            lands exactly on the given <Katex tex="\Pr(-1<Z<1)=0.68" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Sum of Normals"
        marks={1}
        statement={<>Find the mean and the variance of the total time to produce one weed trimmer.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Linear Combination"
        marks={2}
        statement={<>Find the variance of the total cost to produce one weed trimmer.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Difference of Normals"
        marks={2}
        statement={
          <>
            If a single weed trimmer is produced, find the probability that the time spent at
            Stage 2 will be less than the time spent at Stage 1.
            <br />
            Give your answer correct to two decimal places.
            <br />
            Use <Katex tex="\Pr(-1<Z<1)=0.68" />, where <Katex tex="Z" /> is the standard normal
            variable with mean 0 and standard deviation 1.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
