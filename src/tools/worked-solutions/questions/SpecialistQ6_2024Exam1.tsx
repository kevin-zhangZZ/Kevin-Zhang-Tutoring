// 2024 Specialist Mathematics — Exam 1 Question 6 (5 marks). Linear combinations of
// independent normal variables: the sum of three stage times, a weighted cost, then the
// difference of two stages. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(T) &= 0.3^2+0.4^2+0.5^2\\ &= 0.09+0.16+0.25\\ &= 0.5\end{aligned}" />,
    reason: <><strong>Variances</strong> add, and only because the three times are independent. The table gives standard deviations, so each must be squared first.</>,
    more: <>Adding the standard deviations instead (<Katex tex="0.3+0.4+0.5=1.2" />) is the slip to avoid: standard deviations never add, only variances do.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = 4.5 \ \text{h}, \qquad \mathrm{Var}(T) = 0.5 \ \text{h}^2}" />,
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
    more: <>The square is there because variance measures squared spread: doubling every time doubles the standard deviation but quadruples the variance.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(C) = 10^2(0.3)^2+20^2(0.4)^2+15^2(0.5)^2" />,
    reason: <>Square both the cost and the standard deviation at each stage; the three terms add because the stages are independent.</>,
    more: <>The report notes students frequently forgot to square either the cost values or the standard deviation. Forgetting to square the costs gives <Katex tex="10(0.09)+20(0.16)+15(0.25)=7.85" />; forgetting to square the standard deviations gives <Katex tex="100(0.3)+400(0.4)+225(0.5)=302.5" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= 100(0.09)+400(0.16)+225(0.25)\\ &= 9+64+56.25\end{aligned}" />,
    reason: <>Evaluate each stage's contribution, then add.</>,
    more: <>The report also mentions arithmetic errors among students who had the right formula. Keeping each stage as a separate term, as here, makes a slip easy to spot.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Var}(C) = 129.25 \ \text{dollars}^2}" />,
    reason: <>The question asks for the variance, so no square root; its units are dollars squared.</>,
    more: <>A sanity check: <Katex tex="\mathrm{E}(C)=10(1)+20(1.5)+15(2)=\$70" />, with a standard deviation of <Katex tex="\sqrt{129.25}\approx\$11.37" /> — a plausible spread.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(W_2<W_1) = \Pr(W_2-W_1<0)" />,
    reason: <>Comparing two random variables is always a question about their difference.</>,
    more: <>The report accepts either order: <Katex tex="\Pr(W_1-W_2>0)" /> is the same event. Either way, the comparison becomes a question about one random variable whose distribution we can find.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&D = W_2-W_1 \ \text{ is normal, as a linear}\\ &\text{combination of independent normals}\end{aligned}" />,
    reason: <>Knowing <Katex tex="D" /> is normal is what lets us standardise it once its mean and standard deviation are found.</>,
    more: <>Write this sentence as part of the working — it is what licenses using the standard normal at the end.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(D) = 1.5-1.0 = 0.5" />,
    reason: <>Means subtract.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(D) &= (0.4)^2+(0.3)^2 = 0.25\\ \implies \mathrm{sd}(D) &= 0.5\end{aligned}" />,
    reason: <>Variances <em>add</em> even for a difference: <Katex tex="\mathrm{Var}(X-Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)" /> for independent variables. Subtracting them would give 0.07 and the wrong answer.</>,
    more: <>Why: <Katex tex="\mathrm{Var}(W_2-W_1)=1^2\,\mathrm{Var}(W_2)+(-1)^2\,\mathrm{Var}(W_1)" />, and <Katex tex="(-1)^2=1" />. Subtracting a random quantity adds uncertainty; it never removes it. As the report says, going directly to the standard deviation, <Katex tex="\sqrt{0.25}=0.5" />, is fine.</>,
  },
  {
    working: <Katex display tex="\Pr(D<0) = \Pr\!\left(Z<\frac{0-0.5}{0.5}\right) = \Pr(Z<-1)" />,
    reason: <>Standardise with <Katex tex="Z=\dfrac{D-\mathrm{E}(D)}{\mathrm{sd}(D)}" />. The tidy numbers land on <Katex tex="-1" />, which is why the question supplies <Katex tex="\Pr(-1<Z<1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(Z<-1) &= \frac{1-\Pr(-1<Z<1)}{2}\\ &= \frac{1-0.68}{2}\\ &= \frac{0.32}{2}\end{aligned}" />,
    reason: <>By symmetry the two tails outside ±1 are equal, so halve what is left over.</>,
  },
  {
    working: <Katex display tex="\boxed{0.16}" />,
    reason: <>Two decimal places, as asked.</>,
    more: <>Sensible: Stage 2 averages half an hour longer than Stage 1, so it is the shorter one only about one time in six. The report notes some students gave the correct answer with little or no working; for 2 marks, show the mean and variance of the difference and the standardisation.</>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              One rule runs through all three parts:{' '}
              <Katex tex="\mathrm{Var}(aX+bY) = a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)" /> for
              independent <Katex tex="X" /> and <Katex tex="Y" />. Everything squares — the
              coefficients and the standard deviations alike.
            </p>
            <p>
              Part c. is the one to read carefully. "Stage 2 takes less time than Stage 1" is
              not a statement about either distribution on its own; it is{' '}
              <Katex tex="\Pr(W_2-W_1<0)" />, a question about one new normal variable, the
              difference.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
