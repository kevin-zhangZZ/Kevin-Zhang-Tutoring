// 2018 Specialist Mathematics — Exam 2, Section B, Question 6 (8 marks). A one-tailed
// hypothesis test on the mean height of water buffaloes, then the rejection boundary, the
// probability of a Type II error, and a confidence interval. Question text transcribed from
// the original paper (VCAA printed no diagram for this question). Answers checked with
// scipy and against the VCAA examination report and itute. Solution is original.
//
// Part e: the exact boundary is invNorm(0.05, 150, 15/√50) = 146.5107…, which rounds to 146.51,
// but a sample mean of exactly 146.51 has p = 0.04996 < 0.05 (still, just, rejected), so the
// smallest two-decimal value NOT rejected is 146.52. The report accepted both. Part f: 0.2382
// (exact boundary), 0.2383 (146.51) and 0.2368 (146.52) all round to 0.24.
//
// Interactives: c. slide the sample size n and watch the spread of X̄ and the p value shrink
// (n = 1 is the σ = 15 slip); e. drag the observed x̄ until the verdict flips at 146.51, with a
// two-tailed toggle; f. two worlds: the cut-off fixed under μ = 150, the chance of keeping H₀
// read off the true μ = 145 curve, with simulated samples; g. slide the confidence level and
// watch the interval widen past 150. WrongMethod boxes: a. two-tailed H₁ (report); c. σ = 15 in
// normCdf; e. splitting the 5% between two tails; f. staying on μ = 150, and taking the area on
// the wrong side of the cut-off; g. the 95% interval (report).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const SpreadWidget = lazyWidget(() => import('../interactives/spec-2018e2-q6c-spread'))
const BoundaryWidget = lazyWidget(() => import('../interactives/spec-2018e2-q6e-boundary'))
const TwoWorldsWidget = lazyWidget(() => import('../interactives/spec-2018e2-q6f-two-worlds'))
const ConfidenceWidget = lazyWidget(() => import('../interactives/spec-2018e2-q6g-confidence'))

const EXAM_A: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      The question was answered well. Common errors included: poor notation such as{' '}
      <Katex tex="H_0=150" /> or similar, and not understanding the nature of a one-tailed
      test, evidenced by answers such as <Katex tex="H_1:\mu\ne150" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: <>This question was generally well answered. A variety of correct, exact forms were accepted.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [22, 18, 60],
  average: 1.4,
  comment: (
    <>
      Most students obtained the correct value of <Katex tex="p" />. A small number of these
      did not write <Katex tex="p" /> to the required four decimal places. Some students
      inappropriately used calculator syntax in place of correct working or notation. Students
      must take care with notation as some responses incorrectly stated that{' '}
      <Katex tex="p=\Pr(X<145\mid\mu=150)" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Most students were able to draw the appropriate conclusion. Some students did not
      supply a reason for their conclusion as required by the question. Occasional errors
      caused some students to miss out on the mark. For example, some responses incorrectly
      stated that <Katex tex="0.0092>0.05" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: <>In this instance, both values above were accepted.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [89, 11],
  average: 0.1,
  comment: <>Only a small number of students attempted this question.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      While many students answered this correctly and concisely, arithmetic errors caused
      some students to miss out on the mark. Some students appeared to use a{' '}
      <Katex tex="95\%" /> confidence interval rather than the required{' '}
      <Katex tex="99\%" /> confidence interval. It is important for students to read
      questions carefully.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \mu = 150" />,
    reason: <>The null hypothesis is the claim being tested, written about the <em>population</em> mean <Katex tex="\mu" />. It is never about <Katex tex="\overline{X}" /> or the sample&apos;s <Katex tex="145" />, and never a bare number: the report names <Katex tex="H_0=150" /> as poor notation.</>,
  },
  {
    working: <Katex display tex="\boxed{H_0: \mu = 150 \qquad H_1: \mu < 150}" />,
    reason: <>How do I know which way <Katex tex="H_1" /> points? The question says <em>one-tailed</em>, so <Katex tex="H_1" /> uses <Katex tex="<" /> or <Katex tex=">" />, not <Katex tex="\ne" />. The rangers&apos; sample came out <em>below</em> the claim (<Katex tex="145<150" />), so the suspicion being tested is that the true mean is lower. The report notes answers such as <Katex tex="H_1:\mu\ne150" />, which is two-tailed.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{sd}\!\left(\overline{X}\right) = \frac{\sigma}{\sqrt n} = \frac{15}{\sqrt{50}}" />,
    reason: <>The question asks about <Katex tex="\overline{X}" />, the <em>average</em> of <Katex tex="50" /> heights, not one buffalo&apos;s height. In an average, tall and short animals partly cancel, so it varies less than a single height: <Katex tex="\operatorname{Var}(\overline{X})=\frac{\sigma^2}{n}" />, so <Katex tex="\operatorname{sd}(\overline{X})=\frac{\sigma}{\sqrt n}" /> (formula sheet).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{\sqrt{50}} = \frac{3}{\sqrt2} = \frac{3\sqrt2}{2} \approx 2.1213}" />,
    reason: <>Any of these exact forms is accepted. Much smaller than the population&apos;s <Katex tex="15" /> cm, which is why a <Katex tex="5" /> cm gap turns out to be significant.</>,
    more: <>The interactive in part c. shows this.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\!\left(\overline{X} \le 145 \mid \mu = 150\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a result at least this extreme <em>assuming <Katex tex="H_0" /> is true</em>. &ldquo;At least this extreme&rdquo; means in the direction of <Katex tex="H_1" />, so here: <Katex tex="145" /> or lower. One tail only, because <Katex tex="H_1" /> is one-sided, so no doubling. Write this expression down, with <Katex tex="\overline{X}" /> rather than <Katex tex="X" />: the report notes calculator syntax offered in its place, and <Katex tex="\Pr(X<145\mid\mu=150)" /> written by mistake.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 145, 150, 15/√50)</Cas>,
    reason: <>The last argument is the standard deviation of the <em>sample mean</em> from part b., not the population&apos;s <Katex tex="15" />. If your working for c. never uses part b., ask why part b. was there.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0092}" />,
    reason: <>Four decimal places, as asked. (<Katex tex="145" /> sits about <Katex tex="2.36" /> standard deviations of <Katex tex="\overline{X}" /> below <Katex tex="150" />, so a <Katex tex="p" /> just under <Katex tex="1\%" /> is the right size.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.0092 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level. The comparison <em>is</em> the reason: the report says some students did not supply one, and some wrote <Katex tex="0.0092>0.05" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Reject } H_0 \text{ at the } 5\% \text{ level}}" />,
    reason: <>In context: there is evidence that the mean height of mature water buffaloes is less than the claimed <Katex tex="150" /> cm. If the mean really were <Katex tex="150" />, a sample mean this low would happen less than once in a hundred samples.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ not rejected} \iff p \ge 0.05" />,
    reason: <>How would I know what to calculate? &ldquo;Smallest sample mean for <Katex tex="H_0" /> not to be rejected&rdquo; asks for the edge of the rejection region. Low sample means are the extreme ones here (<Katex tex="H_1:\mu<150" />), so <Katex tex="p" /> grows as <Katex tex="\overline{x}" /> grows, and the verdict flips where <Katex tex="p = 0.05" /> exactly.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\overline{X} < c \mid \mu=150\right) = 0.05" />,
    reason: <>Call the boundary <Katex tex="c" />. All <Katex tex="5\%" /> goes in the lower tail, with no halving, because the test is one-tailed.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.05, 150, 15/√50)</Cas>,
    reason: <>Running the distribution backwards: given the area (<Katex tex="0.05" />), find where it ends. This gives <Katex tex="c = 146.5107\ldots" />, i.e. <Katex tex="150-1.6449\times\tfrac{15}{\sqrt{50}}" />: about <Katex tex="1.645" /> standard deviations of <Katex tex="\overline{X}" /> below <Katex tex="150" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\overline{x} \approx 146.51 \text{ cm}}" />,
    reason: <>Two decimal places. A subtlety: a sample mean of exactly <Katex tex="146.51" /> is a hair below <Katex tex="c" /> (its <Katex tex="p" /> is <Katex tex="0.04996" />), so the smallest two-decimal value that is <em>not</em> rejected is really <Katex tex="146.52" />; the report accepted both. Consistent with part d.: the observed <Katex tex="145" /> is below the boundary, which is exactly why <Katex tex="H_0" /> was rejected.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{True } \mu = 145 \implies \overline{X} \sim N\!\left(145,\ \left(\tfrac{15}{\sqrt{50}}\right)^2\right)" />,
    reason: <>The distribution of the sample mean is re-centred on the <em>true</em> mean. The spread is unchanged, since it depends only on <Katex tex="\sigma" /> and <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr\!\left(H_0 \text{ accepted}\right)\\ &= \Pr\!\left(\overline{X} > 146.51 \mid \mu = 145\right)\end{aligned}" />,
    reason: <>The decision rule from part e. does not change: <Katex tex="H_0" /> survives whenever the sample mean lands above <Katex tex="146.51" />. What changes is where sample means actually fall, so the probability is worked out with the true <Katex tex="\mu=145" />. Accepting a false <Katex tex="H_0" /> like this is a Type II error.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(146.51, ∞, 145, 15/√50)</Cas>,
    reason: <>The mean is now <Katex tex="145" />, not <Katex tex="150" />: that swap is the whole question. The cut-off <Katex tex="146.51" /> still comes from the <Katex tex="\mu=150" /> curve.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.24}" />,
    reason: <>Two decimal places (the unrounded <Katex tex="146.5107\ldots" />, or <Katex tex="146.52" />, gives <Katex tex="0.24" /> too). So even when the true mean really is <Katex tex="145" />, this test misses it about a quarter of the time. Only <Katex tex="11\%" /> of students scored this mark, and the report says only a small number attempted it.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{CI} = \overline{x} \pm z\,\frac{\sigma}{\sqrt n}" />,
    reason: <>The population standard deviation <Katex tex="\sigma=15" /> is known, so this is the formula-sheet interval, centred on the observed sample mean <Katex tex="145" />. The spread inside is still the sample mean&apos;s, <Katex tex="\tfrac{15}{\sqrt{50}}" /> from part b.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.995, 0, 1)</Cas>,
    reason: <>A <Katex tex="99\%" /> interval keeps the middle <Katex tex="99\%" />, leaving <Katex tex="0.5\%" /> in each tail, so the upper <Katex tex="z" /> has <Katex tex="99.5\%" /> of the standard normal below it.</>,
  },
  {
    working: <Katex display tex="z \approx 2.5758" />,
    reason: <>Not <Katex tex="1.96" />, which is the <Katex tex="95\%" /> value. The report notes students appearing to use a <Katex tex="95\%" /> interval.</>,
  },
  {
    working: <Katex display tex="145 \pm 2.5758\times\frac{15}{\sqrt{50}} = 145 \pm 5.4642" />,
    reason: <>The margin of error: <Katex tex="z" /> standard deviations of <Katex tex="\overline{X}" /> either side of <Katex tex="145" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(139.5,\ 150.5)}" />,
    reason: <>One decimal place. Worth noticing: at <Katex tex="99\%" /> confidence the interval <em>does</em> contain <Katex tex="150" />, even though the test rejected <Katex tex="\mu=150" /> at the <Katex tex="5\%" /> level. There is no contradiction: a <Katex tex="99\%" /> interval corresponds to a <Katex tex="1\%" /> two-tailed test, a stricter standard than the one-tailed <Katex tex="5\%" /> test used earlier.</>,
  },
]

export default function SpecialistQ6_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (8 marks)</p>
        <p className="mb-2">
          The heights of mature water buffaloes in northern Australia are known to be normally
          distributed with a standard deviation of <Katex tex="15" /> cm. It is claimed that
          the mean height of the water buffaloes is <Katex tex="150" /> cm.
        </p>
        <p className="mb-2">
          To decide whether the claim about the mean height is true, rangers selected a random
          sample of <Katex tex="50" /> mature water buffaloes. The mean height of this sample
          was found to be <Katex tex="145" /> cm. A one-tailed statistical test is to be
          carried out to see if the sample mean height of <Katex tex="145" /> cm differs
          significantly from the claimed population mean of <Katex tex="150" /> cm.
        </p>
        <p>
          Let <Katex tex="\overline{X}" /> denote the mean height of a random sample of{' '}
          <Katex tex="50" /> mature water buffaloes.
        </p>
      </div>

      <PartCard letter="a" topic="Hypotheses" marks={1} statement={<>State suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> for the statistical test.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="The alternative is just “not 150”"
          source="Examiner's report"
          working={<Katex tex="H_0:\mu=150,\quad H_1:\mu\ne150" />}
        >
          That is a two-tailed test: it would split the <Katex tex="5\%" /> between both tails and double the{' '}
          <Katex tex="p" /> value (here to <Katex tex="2\times0.0092=0.0184" />). The question fixes a{' '}
          <b>one-tailed</b> test, and a sample that fell below <Katex tex="150" /> points the alternative downwards.
          Catch it by underlining &ldquo;one-tailed&rdquo; as you read the stem.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Standard Deviation" marks={1} statement={<>Find the standard deviation of <Katex tex="\overline{X}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="p-Value" marks={2} statement={<>Write down an expression for the <Katex tex="p" /> value of the statistical test and evaluate your answer correct to four decimal places.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why 145 cm is far from 150 cm for an average of fifty buffaloes">
          <SpreadWidget />
        </Explore>
        <WrongMethod
          title="Use the population's standard deviation, 15"
          working={<Katex tex="\operatorname{normCdf}(-\infty,\,145,\,150,\,15)\approx0.3694" />}
        >
          This is the probability that <em>one</em> buffalo is shorter than <Katex tex="145" /> cm. The test is about
          the mean of <Katex tex="50" />, whose standard deviation is <Katex tex="\tfrac{15}{\sqrt{50}}\approx2.12" />.
          A <Katex tex="p" /> of <Katex tex="0.37" /> would also make the whole test pointless: it would say an average
          of fifty buffaloes coming in <Katex tex="5" /> cm short is unremarkable. Use part b.&apos;s answer.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Conclusion" marks={1} statement={<>State with a reason whether <Katex tex="H_0" /> should be rejected at the <Katex tex="5\%" /> level of significance.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Critical Value" marks={1} statement={<>What is the smallest value of the sample mean height that could be observed for <Katex tex="H_0" /> to be <b>not</b> rejected? Give your answer in centimetres, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Slide the sample mean until the verdict flips">
          <BoundaryWidget />
        </Explore>
        <WrongMethod
          title="Split the 5% between the two tails"
          working={<Katex tex="\operatorname{invNorm}(0.025,\,150,\,\tfrac{15}{\sqrt{50}})\approx145.84" />}
        >
          That is the lower boundary of a <em>two</em>-tailed test. With <Katex tex="H_1:\mu<150" /> only low sample
          means count as evidence against <Katex tex="H_0" />, so the whole <Katex tex="5\%" /> sits in the lower tail.
          Catch it: whenever <Katex tex="H_1" /> has <Katex tex="<" /> or <Katex tex=">" />, the area you give invNorm is
          the significance level itself.
        </WrongMethod>
      </PartCard>

      <PartCard letter="f" topic="Type II Error" marks={1} statement={<>If the true mean height of all mature water buffaloes in northern Australia is in fact <Katex tex="145" /> cm, what is the probability that <Katex tex="H_0" /> will be accepted at the <Katex tex="5\%" /> level of significance? Give your answer correct to two decimal places.</>} examinerReport={EXAM_F}>
        <Background title="The question changes which distribution you are in">
          <p>
            Every part up to here assumed <Katex tex="H_0" /> was true and worked with{' '}
            <Katex tex="\overline{X}\sim N(150,\dots)" />. This part says "if the true mean is
            in fact <Katex tex="145" />", so the sample mean is now distributed about{' '}
            <Katex tex="145" /> instead.
          </p>
          <p>
            What does <em>not</em> change is the decision rule: the test still rejects{' '}
            <Katex tex="H_0" /> below the boundary found in part e., because that boundary
            was fixed in advance. So the answer is the area above that boundary under the new
            distribution: the probability of a Type II error.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Same cut-off, different world: why H₀ survives 24% of the time">
          <TwoWorldsWidget />
        </Explore>
        <WrongMethod
          title="Keep working with μ = 150"
          working={<Katex tex="\Pr(\overline{X}>146.51\mid\mu=150)\approx0.95" />}
        >
          That is the probability of keeping <Katex tex="H_0" /> when <Katex tex="H_0" /> is <em>true</em>. It is
          just <Katex tex="1-0.05" />, and needing no calculation is a hint it is not what&apos;s being asked. The
          question says the true mean is <Katex tex="145" />, so the curve you take the area from must be centred
          on <Katex tex="145" />.
        </WrongMethod>
        <WrongMethod
          title="Take the area below the cut-off"
          working={<Katex tex="\Pr(\overline{X}<146.51\mid\mu=145)\approx0.76" />}
        >
          That is the probability that <Katex tex="H_0" /> is <em>rejected</em>, the test working correctly.{' '}
          <Katex tex="H_0" /> is accepted when the sample mean lands on the <em>high</em> side of the cut-off. Catch
          it with a quick sketch: a curve centred at <Katex tex="145" />, a line at <Katex tex="146.51" />, and ask
          which side means &ldquo;keep <Katex tex="H_0" />&rdquo;.
        </WrongMethod>
      </PartCard>

      <PartCard letter="g" topic="Confidence Interval" marks={1} statement={<>Using the observed sample mean of <Katex tex="145" /> cm, find a <b><Katex tex="99\%" /> confidence interval</b> for the mean height of all mature water buffaloes in northern Australia. Express the values in your confidence interval in centimetres, correct to one decimal place.</>} examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
        <Explore title="Why 99% confidence needs a wider interval than 95%">
          <ConfidenceWidget />
        </Explore>
        <WrongMethod
          title="Use z = 1.96 out of habit"
          source="Examiner's report"
          working={<Katex tex="145\pm1.96\times\tfrac{15}{\sqrt{50}}=(140.8,\ 149.2)" />}
        >
          That is the <Katex tex="95\%" /> interval; the report says some students appeared to use a{' '}
          <Katex tex="95\%" /> interval rather than the required <Katex tex="99\%" />. More confidence needs a wider
          interval, so <Katex tex="z" /> must be bigger than <Katex tex="1.96" />: <Katex tex="2.5758" /> for{' '}
          <Katex tex="99\%" />. Catch it by circling the confidence level before you reach for a <Katex tex="z" /> value.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
