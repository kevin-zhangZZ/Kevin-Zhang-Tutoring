// 2022 Specialist Mathematics — Exam 2, Section B Question 6 (9 marks). A one-tailed test on
// a sample mean, the critical value that would leave H0 standing, and the difference of two
// normal variables. Part f. was redacted by VCAA following the Independent Review. Question
// text transcribed from the original paper. Answers checked with scipy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>Some incorrect responses involved hypotheses for a two-tailed test.</>,
}

const EXAM_B: SAExaminerStats = { marks: [22, 78], average: 0.8 }

const EXAM_C: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      Generally well done but some students did not justify their response with reference to
      the <Katex tex="p" /> value.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [40, 60],
  average: 0.7,
  comment: (
    <>
      Students generally responded well to this question. Some transcription errors were
      apparent, giving 14.59 as the answer.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [48, 12, 40],
  average: 0.6,
  comment: (
    <>
      Most students understood that the difference meant that <Katex tex="-3<D<3" />. Some
      students stated a correct conclusion but did not give a reason by referencing the{' '}
      <Katex tex="p" /> value.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \ \mu = 15" />,
    reason: <>The null hypothesis is always the supplier’s claim — the status quo being tested.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \ \mu < 15}" />,
    reason: <>The sample mean 14.94 came in <em>below</em> 15, and the test is stated to be one-tailed, so the alternative points that way. <Katex tex="\mu\ne15" /> would be a two-tailed test — the report notes some responses gave hypotheses for one.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(15,\ \frac{0.25^2}{64}\right), \qquad \mathrm{sd}\left(\bar X\right) = \frac{0.25}{8} = 0.03125" />,
    reason: <>The distribution of the sample <em>mean</em>, not of a single can. Dividing by <Katex tex="\sqrt{64}=8" /> is what makes the test sensitive.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X \le 14.94 \ \middle|\ \mu = 15\right)" />,
    reason: <>The <Katex tex="p" /> value is the chance of a sample this extreme <em>if</em> the claim is true. One tail only, matching <Katex tex="H_1" />.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 14.94, 15, 0.25/8)
      </Cas>
    ),
    reason: <>Or standardise by hand: <Katex tex="z=\tfrac{14.94-15}{0.03125}=-1.92" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.027}" />,
    reason: <>Correct to three decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.027 < 0.05" />,
    reason: <>Compare the p value with the stated significance level. That comparison is the entire argument.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Reject } H_0 \text{: the sample does not support the supplier's claim.}}" />,
    reason: <>A sample mean this low would arise under the claim less than 5% of the time. The reason must cite the <Katex tex="p" /> value — the report notes some students did not justify their response this way.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ stands} \iff p \ge 0.05 \iff \bar x \ge c, \ \text{ where } \Pr\!\left(\bar X<c\right) = 0.05" />,
    reason: <>The critical value: the boundary sample mean whose p value is exactly 0.05.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.05, 15, 0.25/8)
      </Cas>
    ),
    reason: <>Working backwards from the area. By hand: <Katex tex="c=15-1.6449\times0.03125" />.</>,
  },
  {
    working: <Katex display tex="c = 14.9486\ldots" />,
    reason: <>Anything at or above this leaves the null hypothesis standing.</>,
  },
  {
    working: <Katex display tex="\boxed{14.95 \ \text{grams}}" />,
    reason: <>Two decimal places. Note how fine the margin is — the observed 14.94 misses by a hundredth of a gram. (The report notes students who transposed digits and wrote 14.59.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="M_1, M_2 \sim \mathrm{N}\!\left(406,\ 5^2\right) \ \text{ independent}" />,
    reason: <>Two randomly selected filled cans.</>,
  },
  {
    working: <Katex display tex="D = M_1-M_2 \implies \mathrm{E}(D) = 406-406 = 0" />,
    reason: <>The difference of two normal variables is normal, and the means subtract.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(D) = 1^2\mathrm{Var}(M_1)+(-1)^2\mathrm{Var}(M_2) = 25+25 = 50" />,
    reason: <>Variances <strong>add</strong> even for a difference, because the coefficient is squared. <Katex tex="\mathrm{sd}(D)=\sqrt{50}\approx7.07" />.</>,
  },
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“differ by no more than 3”:</p>
        <Katex display tex="|D|\le3 \implies -3\le D\le3" />
      </>
    ),
    reason: <>Either can could be the heavier one, so both tails count.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−3, 3, 0, √50)
      </Cas>
    ),
    reason: <>One call with both terminals.</>,
  },
  {
    working: <Katex display tex="\boxed{0.329}" />,
    reason: <>Three decimal places. Only about a third of pairs are that close — reasonable, since a spread of 7 g dwarfs a 3 g window.</>,
  },
]

export default function SpecialistQ6_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (9 marks)</p>
        <p>
          A company produces soft drinks in aluminium cans.
          <br />
          The company sources empty cans from an external supplier, who claims that the mass
          of aluminium in each can is normally distributed with a mean of 15 grams and a
          standard deviation of 0.25 grams.
          <br />
          A random sample of 64 empty cans was taken and the mean mass of the sample was found
          to be 14.94 grams.
          <br />
          Uncertain about the supplier's claim, the company will conduct a
          one-tailed test at the 5% level of significance. Assume that the standard deviation
          for the test is 0.25 grams.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every hypothesis test in this course runs on the same three lines: the sample mean
            has distribution{' '}
            <Katex tex="\mathrm{N}\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />, the{' '}
            <Katex tex="p" /> value is the probability of a sample at least this extreme
            assuming <Katex tex="H_0" />, and the verdict is a comparison of that number with
            the stated level. Part d. simply runs the last line backwards.
          </p>
          <p>
            Part e. is a different animal — the report's general comments list working with
            random variables that are functions of other variables as an area of weakness: a{' '}
            <em>difference</em> of two random variables, not a sample mean. Its variance is{' '}
            <Katex tex="25+25=50" /> — adding, never subtracting.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Hypotheses"
        marks={1}
        statement={
          <>
            Write down suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> for this
            test.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Find the <Katex tex="p" /> value for the test, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Does the mean mass of the random sample of 64 empty cans support the supplier's
            claim at the 5% level of significance for a one-tailed test? Justify your answer.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            What is the smallest value of the mean mass of the sample of 64 empty cans for{' '}
            <Katex tex="H_0" /> not to be rejected? Give your answer correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The equipment used to package the soft drink weighs each can after the can is filled.
          It is known from past experience that the masses of cans filled with the soft drink
          produced by the company are normally distributed with a mean of 406 grams and a
          standard deviation of 5 grams.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Difference of Normals"
        marks={2}
        statement={
          <>
            What is the probability that the masses of two randomly selected cans of soft drink
            differ by no more than 3 grams? Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">f. (3 marks)</p>
        <p>
          This question has been redacted following the findings of the Independent Review into
          the VCAA's Examination-Setting Policies, Processes and Procedures for the VCE. It
          does not appear in the published paper or the examination report, so there is nothing
          to solve.
        </p>
      </div>
    </div>
  )
}
