// 2026 Specialist NHT — Exam 2, Section B Question 6 (10 marks). The NHT report gives sample
// answers only, with no statistics. Snowboard descent times, N(200, 5²): the difference of two
// independent times, the mean of four, then a one-sided test of a new wax on 25 descents
// (hypotheses, p value, conclusion) and the probability of a type II error when the true mean is 2%
// lower (196 s). Question text transcribed from the original paper (no diagram). Part e.'s figure
// (spec-2026nhte2-q6e-type2.png) is this site's own explanatory graph, drawn with matplotlib — VCAA
// printed no figure. Answers checked with scipy and against the VCAA report's sample answers, which
// agree: a. 0.5205; b. 0.9545; c. H0: μ = 200, H1: μ < 200; d.i 0.0668; d.ii no, p > 0.05;
// e. 0.01 (cut-off 198.3551…, probability 0.00926…). The WrongMethods are verified slips (a. 0.3829,
// b. 0.6827, e. 0.02 and 0.99), not taken from the report, which has no comments. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import typeTwoSrc from './spec-2026nhte2-q6e-type2.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="T_1, T_2 \sim \mathrm{N}\!\left(200,\ 5^2\right) \text{ independent}" />,
    reason: <>Let <Katex tex="T_1" /> and <Katex tex="T_2" /> be the times of the two descents.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}(T_1-T_2) &= 200-200 = 0 \\ \operatorname{Var}(T_1-T_2) &= \operatorname{Var}(T_1)+\operatorname{Var}(T_2) \\ &= 25+25 = 50\end{aligned}" />,
    reason: <>For independent variables, variances <em>add</em> even when the variables are subtracted: subtracting a random quantity adds its uncertainty, it doesn&apos;t cancel it.</>,
  },
  {
    working: <Katex display tex="T_1-T_2 \sim \mathrm{N}\!\left(0,\ 2\times5^2\right)" />,
    reason: <>A linear combination of independent normal variables is normal. The standard deviation is <Katex tex="\sqrt{50}=5\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\,|T_1-T_2|<5\,\right) = \Pr\!\left(-5<T_1-T_2<5\right)" />,
    reason: <>&ldquo;Differ by less than 5 s&rdquo; doesn&apos;t say which is faster, so the difference can be either sign.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−5, 5, 0, √50)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{0.5205}" />,
    reason: <><Katex tex="0.52049\ldots" />, correct to four decimal places.</>,
    more: <>Standardised: <Katex tex="\Pr\!\left(|Z|<\tfrac{5}{5\sqrt2}\right)=\Pr(|Z|<0.707)" />. Plausible: 5 s is less than one standard deviation of the difference (about 7.1 s), so a bit over half of pairs fall inside it.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\bar T \sim \mathrm{N}\!\left(200,\ \frac{5^2}{4}\right) = \mathrm{N}\!\left(200,\ \frac{25}{4}\right)" />,
    reason: <>The mean of <Katex tex="n" /> independent observations from <Katex tex="\mathrm{N}(\mu,\sigma^2)" /> is normal with the same mean and variance <Katex tex="\tfrac{\sigma^2}{n}" />. Here <Katex tex="n=4" />, so the standard deviation of <Katex tex="\bar T" /> is <Katex tex="\tfrac{5}{\sqrt4}=2.5" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(195<\bar T<205\right)" />,
    reason: <>&ldquo;Differs by less than 5 s from 200 s&rdquo; means within 5 s either side.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(195, 205, 200, 2.5)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{0.9545}" />,
    reason: <><Katex tex="0.95449\ldots" />, correct to four decimal places.</>,
    more: <>This is <Katex tex="\Pr(-2<Z<2)" />: 5 s is two standard deviations of <Katex tex="\bar T" />, the familiar &ldquo;about 95%&rdquo;. Compare part a.: an average of four times is much less variable than a single time.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 200, \qquad H_1: \ \mu < 200}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean descent time (in seconds) with the new wax. <Katex tex="H_0" /> is &ldquo;no change&rdquo;. The wax is meant to <em>improve</em> times, which means shorter times, so the one-sided alternative is <Katex tex="\mu<200" />.</>,
    more: <>The hypotheses are about the population mean <Katex tex="\mu" />, never the observed 198.5. An improvement in a time is a <em>decrease</em>, so <Katex tex="\mu>200" /> would be the wrong direction.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\bar T \sim \mathrm{N}\!\left(200,\ \frac{5^2}{25}\right) = \mathrm{N}\!\left(200,\ 1\right)" />,
    reason: <>Assume <Katex tex="H_0" /> is true: <Katex tex="\mu=200" />, <Katex tex="\sigma=5" />, <Katex tex="n=25" />, so <Katex tex="\operatorname{sd}(\bar T)=\tfrac{5}{\sqrt{25}}=1" />.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar T < 198.5 \ \middle|\ \mu = 200\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability, if <Katex tex="H_0" /> is true, of a sample mean at least as extreme as the one observed in the direction of <Katex tex="H_1" />: here, as low as 198.5 or lower.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 198.5, 200, 1)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0668}" />,
    reason: <><Katex tex="0.06680\ldots" />, correct to four decimal places.</>,
    more: <>Standardised, <Katex tex="z=\tfrac{198.5-200}{1}=-1.5" />, and <Katex tex="\Pr(Z<-1.5)\approx0.0668" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0668 > 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level. Only <Katex tex="p<0.05" /> counts as significant evidence against <Katex tex="H_0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{No: as } p > 0.05, \text{ do not reject } H_0\text{,} \\ \text{so there is no significant improvement}\end{gathered}}" />,
    reason: <>Answer the question asked (yes or no) and justify it with the <Katex tex="p" /> value, as instructed.</>,
    more: <>The sample mean of 198.5 s <em>is</em> lower than 200 s, but a sample mean that low would happen about 6.7% of the time with no real change, which is not rare enough at the 5% level. &ldquo;Not significant&rdquo; doesn&apos;t prove the wax does nothing; it means this evidence isn&apos;t strong enough.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar T < \bar t_c \ \middle|\ \mu = 200\right) = 0.05" />,
    reason: <>First find the decision rule. <Katex tex="H_0" /> is rejected when the sample mean is low enough that its <Katex tex="p" /> value is below 0.05. Call the borderline value <Katex tex="\bar t_c" />: the lower 5% point of <Katex tex="\bar T" /> under <Katex tex="H_0" />.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.05, 200, 1)</Cas>
        <Katex display tex="\bar t_c = 198.3551\ldots" />
      </>
    ),
    reason: <>The test is one-sided, so all 0.05 sits in the lower tail. Keep the unrounded value.</>,
  },
  {
    working: <Katex display tex="\mu = 200 \times 0.98 = 196" />,
    reason: <>Now suppose the wax really does reduce the mean by 2%.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar T > \bar t_c \ \middle|\ \mu = 196\right)" />,
    reason: <>The snowboarder concludes the wax is ineffective when <Katex tex="H_0" /> is <em>not</em> rejected, that is, when the sample mean is above the cut-off. Its distribution is now <Katex tex="\mathrm{N}(196,\ 1)" />: the true mean changes, the standard deviation 1 doesn&apos;t.</>,
    more: <>
      This is a type II error: not rejecting <Katex tex="H_0" /> when it is false. The cut-off comes from the <Katex tex="\mu=200" /> curve; the probability is then an area under the <Katex tex="\mu=196" /> curve.
      <span className="block mt-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={typeTwoSrc}
          alt="This site's own explanatory graph, not from the VCAA paper: two normal curves for the mean of 25 descent times, centred at 196 (orange) and 200 (blue), with a dashed cut-off at 198.355. The blue area left of the cut-off is 0.05; the small orange area right of it is about 0.0093"
          className="w-full max-w-[460px]" />
      </span>
    </>,
  },
  {
    working: <Cas fn="normCdf">normCdf(198.3551…, ∞, 196, 1)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.01}" />,
    reason: <><Katex tex="0.00925\ldots" />, correct to two decimal places.</>,
    more: <>Plausible: the cut-off 198.355 is about 2.36 standard deviations above 196, so if the wax really works as claimed, a sample mean of 25 descents is very unlikely to be that slow. The test would almost certainly detect a 2% improvement.</>,
  },
]

export default function SpecialistQ6_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (10 marks)</p>
        <p>
          In preparation for an upcoming competition, a snowboarder undertakes many descents down a
          competition slope.
        </p>
        <p>
          The times taken for the snowboarder to descend the slope may be assumed to be normally
          distributed with a mean of 200 seconds and a standard deviation of 5 seconds.
        </p>
        <p>The time taken for any one descent is independent of the time taken for any other descent.</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. and b. combine independent normal times. Means combine the obvious way, and so
              do variances, with one twist: <Katex tex="\operatorname{Var}(aX\pm bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />,
              always a plus. Work with variances, then take the square root for the standard
              deviation.
            </p>
            <p>
              Parts c.–e. are one hypothesis test using the mean of 25 descents,{' '}
              <Katex tex="\bar T\sim\mathrm{N}\!\left(\mu,\tfrac{5^2}{25}\right)" />. Part e. asks how
              likely the test is to miss a real 2% improvement: a type II error.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Difference of Normals"
        marks={2}
        statement={
          <>
            Find the probability that the times taken for two descents differ by less than 5 s.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Add the standard deviations"
          working={<Katex display tex="\begin{gathered}\operatorname{sd}(T_1-T_2)=5+5=10 \\ \implies \Pr(-5<T_1-T_2<5)\approx0.3829\end{gathered}" />}
        >
          Standard deviations don&apos;t add; variances do. <Katex tex="25+25=50" />, so the standard
          deviation is <Katex tex="\sqrt{50}\approx7.07" />, not 10.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Mean Distribution"
        marks={2}
        statement={
          <>
            Find the probability that the average time of four descents differs by less than 5 s
            from the mean of 200 s.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Keep the standard deviation of a single descent"
          working={<Katex display tex="\begin{gathered}T\sim\mathrm{N}(200,5^2) \\ \implies \Pr(195<T<205)\approx0.6827\end{gathered}" />}
        >
          That is the probability for <em>one</em> descent. An average of four is less spread out:
          its standard deviation is <Katex tex="\tfrac{5}{\sqrt4}=2.5" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">
          Use the following information to answer parts c–e.
        </p>
        <p>
          To try to improve descent times, the snowboarder applies a new Teflon-based wax to the
          snowboard. To check the effectiveness of the new wax, the snowboarder makes 25 descents of
          the slope and finds that the mean time taken for the 25 descents is 198.5 s.
        </p>
        <p>
          To assess the significance of this result of 198.5 s, a one-sided statistical test at the
          5% level of significance is performed. Assume that the previous standard deviation of 5 s
          still applies.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for the test.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Determine the <Katex tex="p" /> value for the test.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Does the application of the new wax produce a significant improvement in descent times at
            the 5% level of significance? Justify your answer in terms of the <Katex tex="p" /> value.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Type II Error"
        marks={3}
        statement={
          <>
            The wax manufacturer claims that descent times will be reduced by at least 2% with the
            application of the new wax.
            <br />
            Assuming the mean descent time of 200 s is in fact reduced by 2%, find the probability
            that the snowboarder, on the basis of the 25 independent descents, will conclude that the
            wax is <b>ineffective</b>. Assume a standard deviation of 5 s.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Use 1.96 for the cut-off"
          working={<Katex display tex="\begin{gathered}\bar t_c = 200-1.96 = 198.04 \\ \implies \Pr(\bar T>198.04\mid\mu=196)\approx0.02\end{gathered}" />}
        >
          1.96 cuts off 2.5% in each tail: that is for a two-sided test. This test is one-sided at
          5%, so the whole 0.05 is in the lower tail and the cut-off is{' '}
          <Katex tex="200-1.6449=198.355" />.
        </WrongMethod>
        <WrongMethod
          title="Find the probability of the sample mean being below the cut-off"
          working={<Katex display tex="\Pr(\bar T<198.355\mid\mu=196)\approx0.99" />}
        >
          That is the probability of rejecting <Katex tex="H_0" />, concluding the wax <em>works</em>.
          &ldquo;Ineffective&rdquo; is the opposite decision, not rejecting <Katex tex="H_0" />, so
          take the area above the cut-off.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
