// 2022 Specialist Mathematics — Exam 2, Section B Question 6 (9 marks). A one-tailed test on
// a sample mean, the critical value that would leave H0 standing, and the difference of two
// normal variables. Part f. was redacted by VCAA following the Independent Review. Question
// text transcribed from the original paper. Answers checked with scipy and against the VCAA
// examination report. Solution is original.
// Review 9 Oct 2026 (Concise/Detailed): no part is under 40% full marks (e. is exactly 40%), so
// no widgets. Report commentary, the standardising alternatives, checks and traps moved into each
// row's `more`; b.'s normCdf row now says what goes in each slot; c.'s more explains why "14.94 < 15"
// is no justification; the Background states the linear-combination rule for e. instead of repeating
// its variance line; e.'s last `more` notes the report's p-value sentence for e. does not fit that part.
// Final review: a.'s H1 reason now gives the concern (lighter cans) rather than just the data; d.'s
// Concise rows no longer use "critical value" undefined; Background no longer repeats b.'s p-value definition.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
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
    working: <Katex display tex="\boxed{H_0: \ \mu = 15}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean mass (in grams) of aluminium in <em>all</em> the supplier’s cans. The null hypothesis states the supplier’s claim, an exact value of <Katex tex="\mu" />.</>,
    more: (
      <>
        Hypotheses are always about the population mean <Katex tex="\mu" />, never about the sample
        mean: 14.94 is already known, so there is nothing to test about it. <Katex tex="H_0" /> pins{' '}
        <Katex tex="\mu" /> to the single value 15 because the <Katex tex="p" /> value in part b. is
        calculated assuming exactly that value.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{H_1: \ \mu < 15}" />,
    reason: <>One-tailed means a single inequality. The concern is that the cans hold <em>less</em> aluminium than claimed (the sample mean 14.94 came in below 15), so <Katex tex="H_1" /> is <Katex tex="\mu<15" />.</>,
    more: (
      <>
        Writing <Katex tex="\mu\ne15" /> would set up a two-tailed test, which is what the report
        notes in some incorrect responses. The stem doesn&rsquo;t say which direction, so the sample
        is the clue. The other one-tailed test, <Katex tex="H_1:\ \mu>15" />, would make no sense
        here: a sample mean below 15 can never be evidence that <Katex tex="\mu" /> is higher (its{' '}
        <Katex tex="p" /> value would be about 0.97).
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(15,\ \frac{0.25^2}{64}\right)" />,
    reason: <>The test is about the mean of 64 cans, so use the distribution of the sample <em>mean</em> <Katex tex="\bar X" />, assuming <Katex tex="H_0" /> is true (<Katex tex="\mu=15" />). Its variance is <Katex tex="\tfrac{\sigma^2}{n}" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\left(\bar X\right) = \frac{0.25}{\sqrt{64}} = 0.03125" />,
    reason: <>The square root of that variance: <Katex tex="\tfrac{\sigma}{\sqrt n}" />.</>,
    more: (
      <>
        The mean of 64 cans varies far less than a single can does: here 8 times less. Using 0.25,
        the standard deviation of a <em>single</em> can, would give <Katex tex="p\approx0.405" />,
        far too big.
      </>
    ),
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X \le 14.94 \ \middle|\ \mu = 15\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a sample mean at least as extreme as the one observed, assuming <Katex tex="H_0" /> is true. <Katex tex="H_1" /> is <Katex tex="\mu<15" />, so “extreme” means <em>low</em>: only the lower tail counts.</>,
    more: (
      <>
        This is where the direction chosen in part a. matters. Had the test been two-tailed (
        <Katex tex="H_1:\ \mu\ne15" />), both tails would count, the <Katex tex="p" /> value would
        double to about 0.055, and that is <em>above</em> 0.05, so the verdict in part c. would
        flip.
      </>
    ),
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 14.94, 15, 0.25/8)
      </Cas>
    ),
    reason: <>The lower tail up to the observed 14.94, with mean 15 and standard deviation <Katex tex="\tfrac{0.25}{8}" /> (the 0.03125 above).</>,
    more: (
      <>
        Equivalently, standardise first: <Katex tex="z=\tfrac{14.94-15}{0.03125}=-1.92" />, then
        find <Katex tex="\Pr(Z\le-1.92)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.027}" />,
    reason: <><Katex tex="p=0.0274\ldots" />, correct to three decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.027 < 0.05" />,
    reason: <>The decision rule: if the <Katex tex="p" /> value is less than the significance level (here 0.05), reject <Katex tex="H_0" />; otherwise do not reject it. This comparison is the justification the question asks for.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{No. As } p < 0.05, \text{ reject } H_0\text{:} \\ \text{the claim is not supported.}\end{gathered}}"
      />
    ),
    reason: <>Rejecting <Katex tex="H_0" /> means the sample is evidence against <Katex tex="\mu=15" />, so it does not support the claim.</>,
    more: (
      <>
        In words: if the claim were true, a sample mean of 14.94 g or lower would turn up only about
        2.7% of the time, which is rarer than the 5% cut-off. An answer such as &ldquo;No, because
        14.94 is less than 15&rdquo; never mentions the <Katex tex="p" /> value, and it is not a
        justification: a random sample can easily come in a little under 15 by chance even when the
        claim is true. The question is whether it is{' '}
        <em>too far</em> under, and the <Katex tex="p" /> value is what measures that.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X < c \ \middle|\ \mu = 15\right) = 0.05" />,
    reason: <><Katex tex="H_0" /> is not rejected when <Katex tex="p\ge0.05" />. The lower the sample mean, the smaller its <Katex tex="p" /> value, so the smallest sample mean that keeps <Katex tex="H_0" /> is the one whose <Katex tex="p" /> value is exactly 0.05. Call it <Katex tex="c" />.</>,
    more: (
      <>
        <Katex tex="c" /> is called the <em>critical value</em>: every sample mean at or above{' '}
        <Katex tex="c" /> keeps <Katex tex="H_0" />, and every one below it is rejected. This is part
        b. run in reverse. There the sample mean was known and the tail area was found; here the tail
        area 0.05 is known and the sample mean is found.
      </>
    ),
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.05, 15, 0.25/8)
      </Cas>
    ),
    reason: <>invNorm works backwards from a lower-tail area to the value. It is the lower tail because <Katex tex="H_1" /> is <Katex tex="\mu<15" />.</>,
    more: (
      <>
        invNorm(0.95, 15, 0.25/8) would give 15.05, the cut-off for the opposite test (
        <Katex tex="H_1:\ \mu>15" />).
      </>
    ),
  },
  {
    working: <Katex display tex="c = 14.9486\ldots" />,
    reason: <>The value of <Katex tex="c" />, before rounding.</>,
    more: (
      <>
        Equivalently, <Katex tex="c=15-1.6449\times0.03125" />, where{' '}
        <Katex tex="\Pr(Z<-1.6449)=0.05" />. Check: <Katex tex="c" /> must lie between the observed
        14.94 (rejected in part c.) and 15 (where <Katex tex="p=0.5" />), and it does.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{14.95 \ \text{grams}}" />,
    reason: <>Correct to two decimal places.</>,
    more: (
      <>
        The margin is narrow: the observed 14.94 falls short of the cut-off by less than a hundredth of
        a gram, which is why <Katex tex="H_0" /> was rejected in part c. The report notes
        transcription errors giving 14.59, which is 14.95 with its two decimal digits swapped. The
        check above catches it: 14.59 is not between 14.94 and 15.
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="M_1, M_2 \sim \mathrm{N}\!\left(406,\ 5^2\right) \ \text{ independent}" />,
    reason: <>Let <Katex tex="M_1" /> and <Katex tex="M_2" /> be the masses (in grams) of the two randomly selected filled cans. Selected at random, so they are independent, which is what lets us add their variances below.</>,
  },
  {
    working: <Katex display tex="D = M_1-M_2 \implies \mathrm{E}(D) = 406-406 = 0" />,
    reason: <>Let <Katex tex="D" /> be the difference. A linear combination of independent normal variables is also normal, and <Katex tex="\mathrm{E}(M_1-M_2)=\mathrm{E}(M_1)-\mathrm{E}(M_2)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(D) &= 1^2\mathrm{Var}(M_1)+(-1)^2\mathrm{Var}(M_2) \\ &= 25+25 = 50\end{aligned}" />,
    reason: <>Variances <strong>add</strong> even for a difference, because each coefficient is squared: <Katex tex="(-1)^2=1" />. So <Katex tex="D\sim\mathrm{N}(0,\,50)" /> and <Katex tex="\mathrm{sd}(D)=\sqrt{50}\approx7.07" />.</>,
    more: (
      <>
        The report&rsquo;s general comments list working with random variables that are functions of
        other variables as an area of weakness, and this line is where that skill is used. Two
        tempting slips: subtracting the variances (<Katex tex="25-25=0" /> would mean any two cans
        have exactly the same mass), and adding the standard deviations (<Katex tex="5+5=10" />,
        which leads to 0.236). Comparing two cans that each vary can only add variability; the
        variation in one never cancels the other&rsquo;s.
      </>
    ),
  },
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“differ by no more than 3”:</p>
        <Katex display tex="|D|\le3 \implies -3\le D\le3" />
      </>
    ),
    reason: <>“Differ by” doesn’t say which can is heavier, so <Katex tex="D" /> can be negative or positive: it must lie within 3 either side of 0.</>,
    more: (
      <>
        For a continuous variable, <Katex tex="\le" /> and <Katex tex="<" /> give the same
        probability, so this is the same as the report&rsquo;s <Katex tex="-3<D<3" />.
      </>
    ),
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−3, 3, 0, √50)
      </Cas>
    ),
    reason: <>One call with both bounds. The last entry is the standard deviation <Katex tex="\sqrt{50}" />, not the variance 50.</>,
    more: <>Entering 50 in that slot would give 0.048.</>,
  },
  {
    working: <Katex display tex="\boxed{0.329}" />,
    reason: <>Correct to three decimal places.</>,
    more: (
      <>
        <p>
          Only about a third of pairs are that close. That is reasonable: differences typically
          spread about 7 g either side of 0, much wider than the ±3 g window.
        </p>
        <p>
          The report&rsquo;s second sentence for this part, about referencing the{' '}
          <Katex tex="p" /> value, does not fit part e.: there is no hypothesis test and no{' '}
          <Katex tex="p" /> value here. It looks like it was meant for another part.
        </p>
      </>
    ),
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a.–d. are one hypothesis test, and it rests on three facts. The sample mean
              has distribution{' '}
              <Katex tex="\mathrm{N}\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />. The{' '}
              <Katex tex="p" /> value is a tail area of that distribution, worked out with{' '}
              <Katex tex="\mu" /> set to the value in <Katex tex="H_0" /> (part b.). The verdict
              comes from comparing that <Katex tex="p" /> value with the stated significance level,
              here 5% (part c.).
            </p>
            <p>
              Part e. is a different kind of question: it is about the difference between two
              individual cans, not a sample mean. The tool is the rule for a linear combination of
              independent random variables:{' '}
              <Katex tex="\mathrm{E}(aX+bY)=a\,\mathrm{E}(X)+b\,\mathrm{E}(Y)" /> and{' '}
              <Katex tex="\mathrm{Var}(aX+bY)=a^2\,\mathrm{Var}(X)+b^2\,\mathrm{Var}(Y)" />, and if{' '}
              <Katex tex="X" /> and <Katex tex="Y" /> are normal, so is <Katex tex="aX+bY" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
