// 2019 Specialist Mathematics — Exam 2, Section B, Question 6 (9 marks).
// Sample means of packets of noodles: the distribution of a sample mean, the difference of two
// independent sample means, and a two-tailed hypothesis test. Question text transcribed from
// the original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and every probability verified numerically (scipy): 0.741,
// 0.495, p = 0.0455, x̄ = 372.06 → 372.1. All three sources agree.
// Interactive widgets: part a — the sample-mean curve narrowing as n grows (why 15/√50, not 15),
// and a unit square of the two samples' outcomes (why "at least one" is 1 − (1 − p)², not p + p);
// part b — a simulated cloud of (x̄₁, x̄₂) pairs with the strip |D| < 2 on both sides of the
// diagonal, and the report's Pr(D < 2) half-plane as a toggle; part d — the p value as two mirror
// tails of N(375, 1.5²); part f — the 2.5% + 2.5% rejection region, with the report's one-tail
// 372.5 as a toggle and 372.0 vs 372.1 as buttons.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const NarrowWidget = lazyWidget(() => import('../interactives/spec-2019e2-q6a-narrow'))
const AtLeastWidget = lazyWidget(() => import('../interactives/spec-2019e2-q6a-atleast'))
const StripWidget = lazyWidget(() => import('../interactives/spec-2019e2-q6b-strip'))
const TailsWidget = lazyWidget(() => import('../interactives/spec-2019e2-q6d-tails'))
const CutoffWidget = lazyWidget(() => import('../interactives/spec-2019e2-q6f-cutoff'))

const EXAM_A: SAExaminerStats = {
  marks: [40, 31, 29],
  average: 0.9,
  comment: <>Of the students who found the standard deviation of the sample mean, about half successfully used a binomial distribution to answer the question.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [67, 15, 2, 15],
  average: 0.7,
  comment: <>Many students did not make a reasonable start to this question, or they were unable to correctly find the variance for the combined distributions. Very few students indicated an understanding that the difference between the samples could be negative and found <Katex tex="\Pr\left(\overline{X}_1-\overline{X}_2<2\right)" /> rather than correctly finding <Katex tex="\Pr\left(-2<\overline{X}_1-\overline{X}_2<2\right)" /> or <Katex tex="\Pr\left(\left|\overline{X}_1-\overline{X}_2\right|<2\right)" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: <>While most students correctly stated the null and alternative hypotheses for a two-tailed test, answers indicating a one-tailed test were relatively frequent.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: <>Students who gave correct hypotheses in Question 6c. were usually successful here.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
}

const EXAM_F: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: <>This question was often not attempted. Most students who did attempt it answered correctly. The most frequent incorrect response was 372.5, resulting from <Katex tex="\Pr\left(\overline{X}<x_c\right)=0.05" />.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \overline{X} &\sim N\!\left(375,\ \dfrac{15^2}{50}\right) \\ \text{sd}\left(\overline{X}\right) &= \dfrac{15}{\sqrt{50}} = \dfrac{3}{\sqrt2} \approx 2.1213 \end{aligned}" />,
    reason: <>The question is about the <em>mean</em> of each sample of <Katex tex="50" />, not about one packet, so first find how a sample mean is distributed. It is normal, centred on the population mean, but with standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />: narrower than the population, because heavy and light packets in the same sample cancel out. The first diagram below shows the curve narrowing as <Katex tex="n" /> grows.</>,
  },
  {
    working: <Katex display tex="\Pr\left(370<\overline{X}<375\right) \approx 0.490789" />,
    reason: <>Technology: <Cas fn="normCdf">normCdf(370, 375, 375, 15/√50)</Cas> gives it. The last argument is the standard deviation of the <em>sample mean</em>, <Katex tex="\tfrac{\sigma}{\sqrt n}" />, not the population <Katex tex="\sigma=15" />. Sensible answer: <Katex tex="375" /> is the mean, so this is just under half the distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{at least one of two}) = 1-\Pr(\text{neither})" />,
    reason: <>Now there are two samples, and each one independently either lands in <Katex tex="370" />–<Katex tex="375" /> or doesn&apos;t, with the same chance <Katex tex="0.4908" />. A fixed number of independent tries with the same chance of success is binomial: the number of samples that land in the band is <Katex tex="\operatorname{Bi}(2,\ 0.4908)" />. &ldquo;At least one&rdquo; is every outcome except &ldquo;neither&rdquo;, so take the complement. The report notes that about half of the students who found the standard deviation of the sample mean went on to use a binomial distribution successfully.</>,
  },
  {
    working: <Katex display tex="= 1-(1-0.490789)^2 = 1-(0.509211)^2" />,
    reason: <>&ldquo;Neither&rdquo; means both samples miss the band. Each misses with probability <Katex tex="1-0.4908" />, and the samples are independent, so multiply. In the square diagram below this is the grey corner.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.741}" />,
    reason: <>Three decimal places, as asked. Sensible size: bigger than one sample&apos;s <Katex tex="0.491" /> (two chances beat one), but well short of <Katex tex="1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } D = \overline{X}_1-\overline{X}_2" />,
    reason: <>&ldquo;Differ by&rdquo; is a statement about a difference, so make the difference a single new random variable. Once you know how <Katex tex="D" /> is distributed, the question is an ordinary normal probability. The report notes many students did not make a reasonable start to this question.</>,
  },
  {
    working: <Katex display tex="E(D) = E\left(\overline{X}_1\right)-E\left(\overline{X}_2\right) = 375-375 = 0" />,
    reason: <>Expected values subtract as the variables do. Both samples are centred on <Katex tex="375" />, so on average the difference is <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \operatorname{Var}(D) &= \operatorname{Var}\left(\overline{X}_1\right)+\operatorname{Var}\left(\overline{X}_2\right) \\ &= \dfrac{225}{50}+\dfrac{225}{50} = 9 \end{aligned}" />,
    reason: <>Variances <em>add</em> for independent variables, even when you subtract the variables: <Katex tex="\operatorname{Var}(aX+bY) = a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />, and with <Katex tex="b=-1" /> the <Katex tex="(-1)^2" /> is <Katex tex="+1" />. Think of the extremes: a heavy first sample with a light second one makes <Katex tex="D" /> large and positive, the reverse makes it large and negative, so <Katex tex="D" /> swings more than either mean. The report notes many students were unable to find this variance correctly.</>,
  },
  {
    working: <Katex display tex="\text{sd}(D) = \sqrt9 = 3, \qquad D \sim N(0,\ 3^2)" />,
    reason: <>A difference of independent normal variables is normal. The simulated pairs in the diagram below agree: their differences have a standard deviation close to <Katex tex="3" />, not <Katex tex="2.12" />.</>,
  },
  {
    working: <Katex display tex="\Pr\left(|D|<2\right) = \Pr(-2<D<2)" />,
    reason: <>&ldquo;Differ by less than 2 grams&rdquo; means the difference is between <Katex tex="-2" /> and <Katex tex="2" />. <Katex tex="D" /> is negative whenever the second mean is the bigger one, and those pairs count too: only the size of the gap matters. The report notes very few students allowed for a negative difference; finding only <Katex tex="\Pr(D<2)" /> misses the lower bound. In the diagram this is the green strip on <em>both</em> sides of the diagonal.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.495}" />,
    reason: <><Cas fn="normCdf">normCdf(-2, 2, 0, 3)</Cas> finishes it. Sanity check: <Katex tex="2" /> g is only two-thirds of a standard deviation of <Katex tex="D" />, so a shade under half is the right size of answer.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \mu = 375 \qquad H_1: \mu \ne 375}" />,
    reason: <>The null hypothesis is always the &ldquo;nothing has changed&rdquo; claim: the machine still produces a mean of <Katex tex="375" /> g. The alternative is two-sided because the question says two-tailed, and because a machine that isn&apos;t working properly could be over-filling <em>or</em> under-filling. Both hypotheses are about the <em>population</em> mean <Katex tex="\mu" />, never the sample mean <Katex tex="372" />. The report notes answers indicating a one-tailed test were relatively frequent.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{sd}\left(\overline{X}\right) = \dfrac{15}{\sqrt{100}} = 1.5" />,
    reason: <>The test uses the two samples combined, so <Katex tex="n" /> is now <Katex tex="100" />, not <Katex tex="50" />. The mean of <Katex tex="100" /> packets is even more tightly concentrated than in part a.</>,
  },
  {
    working: <Katex display tex="p = 2\times\Pr\left(\overline{X}<372 \mid \mu=375\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a sample mean at least as extreme as the one observed, <em>assuming <Katex tex="H_0" /> is true</em>. <Katex tex="372" /> is <Katex tex="3" /> g below <Katex tex="375" />; for a two-tailed test a mean <Katex tex="3" /> g above (<Katex tex="378" />) is just as extreme, so both tails count, hence the factor of <Katex tex="2" />. The diagram below shows the two tails.</>,
  },
  {
    working: <Katex display tex="= 2\times0.02275 \approx 0.0455" />,
    reason: <>The single tail is <Cas fn="normCdf">normCdf(-∞, 372, 375, 1.5)</Cas> on a CAS. On the handheld, type the lower bound as <Katex tex="-9\times10^{99}" /> if you would rather not use the <Katex tex="\infty" /> symbol; anything far enough below the mean gives the same answer.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.046}" />,
    reason: <>Three decimal places. The report notes students who gave correct (two-tailed) hypotheses in part c. were usually successful here.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.046 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level. <Katex tex="p" /> is the chance of a sample mean this far from <Katex tex="375" /> g <em>if the machine were working properly</em>; at under <Katex tex="5\%" />, that is too unlikely to put down to chance.</>,
  },
  {
    working: <Katex display tex="\implies \text{reject } H_0" />,
    reason: <>The result is significant at the <Katex tex="5\%" /> level, so we reject the claim <Katex tex="\mu = 375" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered} \text{No: there is evidence at the } 5\% \text{ level} \\ \text{that the machine is not} \\ \text{working properly.} \end{gathered}}" />,
    reason: <>The conclusion must be in context and justified by the comparison, not just &ldquo;reject <Katex tex="H_0" />&rdquo;. It is evidence, not proof, and a close call: <Katex tex="0.046" /> only just clears <Katex tex="0.05" />. In the part d diagram, the observed <Katex tex="372" /> sits just inside the shaded tails.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ not rejected} \iff p \ge 0.05" />,
    reason: <>Rather than testing values one at a time, find the boundary directly: the sample mean below <Katex tex="375" /> whose <Katex tex="p" /> value is exactly <Katex tex="0.05" />. Anything closer to <Katex tex="375" /> than that is not rejected.</>,
  },
  {
    working: <Katex display tex="2\Pr\left(\overline{X}<\overline{x}\right) = 0.05 \implies \Pr\left(\overline{X}<\overline{x}\right)=0.025" />,
    reason: <>Two-tailed: the <Katex tex="5\%" /> is shared between a too-light tail and a too-heavy tail, <Katex tex="2.5\%" /> each. The lower cut-off has only <Katex tex="2.5\%" /> of the area below it.</>,
  },
  {
    working: <Katex display tex="\overline{x} \approx 372.06" />,
    reason: <>Run the distribution backwards from the area: <Cas fn="invNorm">invNorm(0.025, 375, 1.5)</Cas> does it. Equivalently by hand, <Katex tex="375-1.96\times1.5 = 372.06" />: the boundary sits <Katex tex="1.96" /> standard deviations below the claimed mean.</>,
  },
  {
    working: <Katex display tex="\boxed{\overline{x} \approx 372.1 \text{ grams}}" />,
    reason: <>One decimal place. Check the direction: <Katex tex="372.0" /> is below <Katex tex="372.06" /> and would be rejected (its <Katex tex="p" /> is the <Katex tex="0.046" /> of part d), while <Katex tex="372.1" /> is not, so <Katex tex="372.1" /> is the smallest one-decimal value that survives. Consistent with part e: the observed <Katex tex="372" /> g sits just below this boundary, which is exactly why <Katex tex="H_0" /> was (narrowly) rejected.</>,
  },
]

export default function SpecialistQ6_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (9 marks)</p>
        <p className="mb-2">
          A company produces packets of noodles. It is known from past experience that the mass
          of a packet of noodles produced by one of the company's machines is normally
          distributed with a mean of <Katex tex="375" /> grams and a standard deviation of{' '}
          <Katex tex="15" /> grams.
        </p>
        <p>
          To check the operation of the machine after some repairs, the company's quality control
          employees select two independent random samples of <Katex tex="50" /> packets and
          calculate the mean mass of the <Katex tex="50" /> packets for each random sample.
        </p>
      </div>

      <DetailOnly>
        <div className="text-[13px] leading-relaxed">
          <Background title="Before You Start">
            <p>
              The whole question rests on one fact: if individual packets are{' '}
              <Katex tex="N(\mu,\sigma^2)" />, then the <em>mean of a sample of n</em> is{' '}
              <Katex tex="N\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />. Same centre, but the spread
              shrinks by a factor of <Katex tex="\sqrt n" /> — which is why a sample of{' '}
              <Katex tex="100" /> (parts c–f) detects a problem that a sample of <Katex tex="50" />{' '}
              might not.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Sample Mean" marks={2} statement="Assume that the machine is working properly. Find the probability that at least one random sample will have a mean mass between 370 grams and 375 grams. Give your answer correct to three decimal places." examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the mean of 50 packets is far more likely to land in 370–375 g than one packet">
          <NarrowWidget />
        </Explore>
        <Explore title="“At least one of two” is everything except “neither”, and why adding p + p double counts">
          <AtLeastWidget />
        </Explore>
        <WrongMethod
          title="Use the population standard deviation, 15"
          working={<Katex display tex="\begin{aligned} \Pr(370<X<375) &\approx 0.1306 \\ 1-(0.8694)^2 &\approx 0.244 \end{aligned}" />}
        >
          That is the probability for <em>one packet</em>, not for the mean of <Katex tex="50" />. A sample mean
          varies far less than a single packet, so its standard deviation is{' '}
          <Katex tex="\tfrac{15}{\sqrt{50}}" />. Catch it by reading the question again: &ldquo;mean mass of the{' '}
          <Katex tex="50" /> packets&rdquo; is your cue to divide by <Katex tex="\sqrt n" />.
        </WrongMethod>
        <WrongMethod
          title="Two samples, so double the probability"
          working={<Katex display tex="0.4908+0.4908 \approx 0.982" />}
        >
          Adding counts the outcome where <em>both</em> samples land in the band twice (the red square in the
          diagram), so it overshoots by <Katex tex="0.4908^2 \approx 0.241" />. The size is a warning too: two
          tries at a <Katex tex="49\%" /> chance can&apos;t make success almost certain, and with three samples
          &ldquo;adding&rdquo; would give more than <Katex tex="1" />. Use <Katex tex="1-\Pr(\text{neither})" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Difference of Means" marks={3} statement="Assume that the machine is working properly. Find the probability that the means of the two random samples differ by less than 2 grams. Give your answer correct to three decimal places." examinerReport={EXAM_B}>
        <Background>
          <p>
            When a question asks about the <em>difference</em> of two independent normal
            variables, build a new normal variable for it. Its mean is the difference of the
            means, but its variance is the <b>sum</b> of the variances — never the difference.
            (Two noisy quantities subtracted give a result that is noisier than either, not
            quieter.)
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="“Differ by less than 2” is a strip on both sides of the diagonal">
          <StripWidget />
        </Explore>
        <WrongMethod
          title="“Less than 2” means D < 2"
          source="Examiner's report"
          working={<Katex display tex="\Pr(D<2) \approx 0.748" />}
        >
          This counts every pair where the second mean is bigger, however big the gap: <Katex tex="D=-8" /> (the
          means differ by <Katex tex="8" /> g) satisfies <Katex tex="D<2" />. &ldquo;Differ by&rdquo; is about the
          size of the gap, so it needs both bounds, <Katex tex="-2<D<2" />. Check: a sample-to-sample gap of less
          than <Katex tex="2" /> g when the gaps have sd <Katex tex="3" /> should be about a coin flip, not{' '}
          <Katex tex="75\%" />.
        </WrongMethod>
        <WrongMethod
          title="The variables are subtracted, so subtract the variances"
          working={<Katex display tex="\operatorname{Var}(D) = \tfrac{225}{50}-\tfrac{225}{50} = 0" />}
        >
          A variance of <Katex tex="0" /> would mean the two sample means are always identical, which is plainly
          false. Variances never cancel: the <Katex tex="-1" /> in front of <Katex tex="\overline{X}_2" /> gets squared,
          so its variance is added.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          To test whether the machine is working properly after the repairs and is still
          producing packets with a mean mass of <Katex tex="375" /> grams, the two random samples
          are combined and the mean mass of the <Katex tex="100" /> packets is found to be{' '}
          <Katex tex="372" /> grams. Assume that the standard deviation of the mass of the
          packets produced is still <Katex tex="15" /> grams. A two-tailed test at the{' '}
          <Katex tex="5\%" /> level of significance is to be carried out.
        </p>
      </div>

      <PartCard letter="c" topic="Hypotheses" marks={1} statement={<>Write down suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> for this test.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="The sample came out light, so H₁: μ < 375"
          source="Examiner's report"
          working={<Katex display tex="H_0: \mu = 375 \qquad H_1: \mu < 375" />}
        >
          That is a one-tailed test. The direction of <Katex tex="H_1" /> comes from the question, not from the
          data: here it says two-tailed, and &ldquo;working properly&rdquo; can fail by over-filling as well as
          under-filling. It also changes part d, where a one-tailed <Katex tex="p" /> value would be half the
          correct one.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="p-Value" marks={1} statement={<>Find the <Katex tex="p" /> value for the test, correct to three decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The p value is both tails: everything at least as far from 375 as 372">
          <TailsWidget />
        </Explore>
        <WrongMethod
          title="Keep using 15/√50 from part a"
          working={<Katex display tex="2\Pr\left(\overline{X}<372\right) \text{ with sd } \tfrac{15}{\sqrt{50}} \approx 0.157" />}
        >
          The samples have been combined, so the mean is of <Katex tex="100" /> packets and its sd is{' '}
          <Katex tex="\tfrac{15}{\sqrt{100}} = 1.5" />. With the old sd the <Katex tex="p" /> value is more than three
          times too big and the conclusion in part e flips. Whenever <Katex tex="n" /> changes mid-question,
          recompute <Katex tex="\tfrac{\sigma}{\sqrt n}" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Conclusion" marks={1} statement={<>Does the mean mass of the sample of 100 packets suggest that the machine is working properly at the <Katex tex="5\%" /> level of significance for a two-tailed test? Justify your answer.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" topic="Critical Value" marks={1} statement={<>What is the smallest value of the mean mass of the sample of 100 packets for <Katex tex="H_0" /> to be not rejected? Give your answer correct to one decimal place.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why the cut-off has 2.5% below it, not 5%">
          <CutoffWidget />
        </Explore>
        <WrongMethod
          title="5% level, so 5% in the tail"
          source="Examiner's report"
          working={<Katex display tex="\Pr\left(\overline{X}<x_c\right)=0.05 \implies x_c \approx 372.5" />}
        >
          That puts the whole <Katex tex="5\%" /> in the lower tail, which is the rule for a one-tailed test. A
          two-tailed test also rejects means that are too heavy, so the upper tail needs its <Katex tex="2.5\%" />{' '}
          too. Check with part d: <Katex tex="\overline{x}=372.5" /> has <Katex tex="p \approx 0.096" />, well above{' '}
          <Katex tex="0.05" />, so it can&apos;t be the edge of the rejection region.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
