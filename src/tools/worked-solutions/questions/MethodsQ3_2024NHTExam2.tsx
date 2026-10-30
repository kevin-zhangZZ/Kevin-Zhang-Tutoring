// 2024 Mathematical Methods NHT — Exam 2, Section B Question 3 (12 marks). The NHT report gives
// sample answers only, with no statistics. Office attendance as a discrete random variable N
// (expected value, a conditional probability, a binomial count over ten workdays), daily
// electricity cost as a continuous random variable C with a cubic density (maximum value, mean,
// probability within two standard deviations), and a 90% confidence interval for a proportion
// followed by recovering the sample size from a 95% interval. Question text and the probability
// table transcribed from the original paper (no diagram). Answers checked with sympy/scipy and
// against the VCAA report's sample answers: a. 2.1; b. 1/7; c. 0.0702; d.i. 10; d.ii. 4;
// d.iii. 608/625 = 0.9728 (sd 2); e.i. 0.15; e.ii. (0.108, 0.192); f. 80 (p̂ = 0.1375 = 11/80;
// the formula gives 79.92, and n = 80 is also the only size near it for which 0.1375 is a whole
// number of defectives). Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(N) = \sum n\Pr(N=n)" />,
    reason: <>The expected value weights each value by its probability.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= 1(0.3)+2(0.4)+3(0.2)+4(0.1)\\ &= 0.3+0.8+0.6+0.4\end{aligned}" />,
    reason: <>Multiply each value of <Katex tex="n" /> by its probability from the table, then add.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(N) = 2.1}" />,
    reason: <>A long-run average of 2.1 people a day. It doesn&apos;t need to be a possible value of <Katex tex="N" />; it sits between 1 and 4, nearer the likelier low values, as it should.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(N=4 \mid N\ge2) = \frac{\Pr(N=4 \cap N\ge2)}{\Pr(N\ge2)}" />,
    reason: <>Conditional probability: <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\Pr(N=4)}{\Pr(N\ge2)} = \frac{0.1}{0.4+0.2+0.1}" />,
    reason: <>If all four are in, then certainly at least two are, so the intersection is just <Katex tex="N=4" />.</>,
    more: <>Equivalently, <Katex tex="\Pr(N\ge2)=1-\Pr(N=1)=0.7" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{1}{7}}" />,
    reason: <>Bigger than the unconditional 0.1, as it should be: knowing at least two are in rules out the most common day (one person).</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(10,\ 0.1)" />,
    reason: <>Let <Katex tex="X" /> be the number of the ten workdays on which all four are in. Ten independent days, each a success (<Katex tex="N=4" />) with the same probability 0.1: binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 1-\Pr(X\le2)" />,
    reason: <>&ldquo;At least three days&rdquo; is <Katex tex="X\ge3" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(10, 0.1, 3, 10)</Cas>,
    reason: <>Or <Katex tex="1-\big(0.9^{10}+10(0.1)(0.9)^9+45(0.1)^2(0.9)^8\big)" /> by hand.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge3) \approx 0.0702}" />,
    reason: <><Katex tex="0.07019\ldots" />, correct to four decimal places.</>,
    more: <>Small, as expected: on average only <Katex tex="10\times0.1=1" /> such day a fortnight, so three or more is unusual.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="f(c) = 0 \text{ for } c > 10" />,
    reason: <>The density is zero outside <Katex tex="0\le c\le10" />, so the cost can never be more than 10.</>,
  },
  {
    working: <Katex display tex="\boxed{\$10}" />,
    reason: <>The upper end of the interval where the density is non-zero.</>,
    more: <>Don&apos;t confuse this with the most likely cost. The density itself is largest at <Katex tex="c=\tfrac{10}{3}" /> (where <Katex tex="f'(c)=0" />), which is the mode, not the maximum cost.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(C) = \int_0^{10} c\cdot\frac{3c(c-10)^2}{2500}\,dc" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int c\,f(c)\,dc" /> over the interval where <Katex tex="f" /> is non-zero.</>,
  },
  {
    working: <Katex display tex="= \frac{3}{2500}\int_0^{10}\left(c^4-20c^3+100c^2\right)dc" />,
    reason: <>Expand <Katex tex="c^2(c-10)^2" /> so each term can be integrated.</>,
  },
  {
    working: <Katex display tex="= \frac{3}{2500}\left[\frac{c^5}{5}-5c^4+\frac{100c^3}{3}\right]_0^{10} = \frac{3}{2500}\cdot\frac{10000}{3}" />,
    reason: <><Katex tex="20000-50000+\tfrac{100000}{3}=\tfrac{10000}{3}" />. On CAS, <Cas fn="nInt" /> (or an exact integral) gives the same.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(C) = \$4}" />,
    reason: <>Below the midpoint 5 of <Katex tex="[0,10]" />, as expected: the density is piled up on the left (its peak is at <Katex tex="\tfrac{10}{3}" />).</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}\!\left(C^2\right) &= \frac{3}{2500}\int_0^{10}\left(c^5-20c^4+100c^3\right)dc\\ &= 20\end{aligned}" />,
    reason: <>Variance needs <Katex tex="\mathrm{E}(C^2)=\int c^2f(c)\,dc" />; here <Katex tex="c^2\cdot 3c(c-10)^2=3\left(c^5-20c^4+100c^3\right)" />. Evaluate it with the CAS integral template in exact mode.</>,
    more: <>By hand: <Katex tex="\tfrac{3}{2500}\left[\tfrac{c^6}{6}-4c^5+25c^4\right]_0^{10}=\tfrac{3}{2500}\cdot\tfrac{50000}{3}=20" />.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(C) = 20-4^2 = 4, \qquad \sigma = \mathrm{sd}(C) = \sqrt{4} = 2" />,
    reason: <><Katex tex="\operatorname{Var}(C)=\mathrm{E}(C^2)-[\mathrm{E}(C)]^2" />, with the mean <Katex tex="\mu=\mathrm{E}(C)=4" /> from part d.ii. The standard deviation <Katex tex="\sigma" /> is the square root of the variance.</>,
  },
  {
    working: <Katex display tex="\mu\pm2\sigma = 4\pm4: \quad (0,\ 8)" />,
    reason: <>&ldquo;Within two standard deviations of the mean&rdquo; is the interval from <Katex tex="\mu-2\sigma" /> to <Katex tex="\mu+2\sigma" />.</>,
  },
  {
    working: <Katex display tex="\Pr(0<C<8) = \int_0^8 \frac{3c(c-10)^2}{2500}\,dc" />,
    reason: <>The probability is the area under the density over that interval. Evaluate it with the CAS integral template in exact mode.</>,
    more: <>By hand: <Katex tex="\tfrac{3}{2500}\left[\tfrac{c^4}{4}-\tfrac{20c^3}{3}+50c^2\right]_0^8=\tfrac{3}{2500}\cdot\tfrac{2432}{3}=\tfrac{2432}{2500}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(0<C<8) = \tfrac{608}{625} = 0.9728}" />,
    reason: <>Exact, since no rounding was asked for; the decimal 0.9728 is exact too.</>,
    more: <>Plausible: for a normal distribution about 95% of the probability lies within two standard deviations of the mean, and this density gives a similar figure.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{30}{200}" />,
    reason: <>The sample proportion is the number with the property divided by the sample size.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.15}" />,
    reason: <>VCAA also writes this as <Katex tex="\tfrac{3}{20}" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p \pm z\sqrt{\frac{\hat p(1-\hat p)}{n}}, \qquad z = 1.6448\ldots" />,
    reason: <>The approximate confidence interval for a proportion. For 90% confidence, 5% is left in each tail, so <Katex tex="z" /> is <Cas fn="invNorm">invNorm(0.95, 0, 1)</Cas>.</>,
    more: <>Using 1.96 here would give a 95% interval, a different answer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&0.15 \pm 1.6448\ldots\times\sqrt{\frac{0.15\times0.85}{200}}\\ &= 0.15\pm0.04153\ldots\end{aligned}" />,
    reason: <>Substitute <Katex tex="\hat p=0.15" /> and <Katex tex="n=200" />, then subtract and add the margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.108,\ 0.192)}" />,
    reason: <>Correct to three decimal places, centred on <Katex tex="\hat p=0.15" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{0.062+0.213}{2} = 0.1375" />,
    reason: <>A confidence interval for a proportion is symmetric about <Katex tex="\hat p" />, so <Katex tex="\hat p" /> is the midpoint.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}1.96\sqrt{\frac{0.1375\times0.8625}{n}} &= \frac{0.213-0.062}{2}\\ &= 0.0755\end{aligned}" />,
    reason: <>The margin of error is half the width of the interval.</>,
  },
  {
    working: <Cas fn="solve">solve(1.96·√(0.1375·0.8625/n) = 0.0755, n)</Cas>,
    reason: <>Or rearrange: <Katex tex="n=\left(\tfrac{1.96}{0.0755}\right)^2\times0.1375\times0.8625" />.</>,
  },
  {
    working: <Katex display tex="n = 79.92\ldots" />,
    reason: <>Not a whole number only because the interval&apos;s endpoints were rounded to three decimal places.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 80}" />,
    reason: <>A sample size must be a whole number.</>,
    more: <>A strong check: <Katex tex="\hat p=0.1375=\tfrac{11}{80}" />, which is 11 defectives out of 80, a whole number, as it must be. With <Katex tex="n=79" />, <Katex tex="\hat p=0.1375" /> would mean 10.86 defectives.</>,
  },
]

export default function MethodsQ3_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          A small business has four people working full-time. The business rents an office, and on
          most days some people work from home.
          <br />
          On any given workday, the number of people working in the office can be modelled by the
          discrete random variable, <Katex tex="N" />, with the following probability distribution.
        </p>
        <div className="overflow-x-auto">
          <table className="border-collapse text-center text-[14px] bg-white dark:bg-gray-900">
            <tbody>
              <tr>
                <th className="border border-gray-400 dark:border-gray-600 px-4 py-1.5 font-normal"><Katex tex="n" /></th>
                {[1, 2, 3, 4].map((n) => (
                  <td key={n} className="border border-gray-400 dark:border-gray-600 px-5 py-1.5">{n}</td>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-400 dark:border-gray-600 px-4 py-1.5 font-normal"><Katex tex="\Pr(N=n)" /></th>
                {['0.3', '0.4', '0.2', '0.1'].map((p) => (
                  <td key={p} className="border border-gray-400 dark:border-gray-600 px-5 py-1.5">{p}</td>
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
              Three different kinds of random variable in one question: a discrete one given by a
              table (a.–b.), a binomial count built from it (c.), and a continuous one given by a
              density function (d.). For a table you <em>sum</em>; for a density you{' '}
              <em>integrate</em>. Parts e.–f. are about estimating a population proportion from a
              sample.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Expected Value"
        marks={1}
        statement={<>Find <Katex tex="\mathrm{E}(N)" />, the expected value for the number of people working in the office.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={1}
        statement={
          <>
            Find the probability that all four people are working in the office, given that at least
            two people are working in the office.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            In a fortnight with ten workdays, find the probability that all four people are working in
            the office on at least three days.
            <br />
            Write your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The business owner is trying to find ways to reduce costs.
          <br />
          Her daily electricity costs, in dollars, can be modelled using a continuous random
          variable, <Katex tex="C" />, which has the probability density function
        </p>
        <Katex display tex="f(c)=\begin{cases}\dfrac{3c(c-10)^2}{2500} & 0\le c\le10\\[6pt] 0 & \text{elsewhere}\end{cases}" />
      </div>

      <PartCard
        letter="d.i"
        topic="Continuous Distribution"
        marks={1}
        statement={<>Identify the maximum daily electricity cost, in dollars, for this small business.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Mean"
        marks={1}
        statement={<>Find the mean daily electricity cost, in dollars.</>}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Standard Deviation"
        marks={2}
        statement={
          <>
            Find the probability that, on a given day, the electricity cost is within two standard
            deviations of the mean.
          </>
        }
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The business owner plans to reduce electricity costs by installing LED sensors.
          <br />
          She researches an LED sensor manufacturer and finds the following information.
        </p>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>In a random sample of 200 LED sensors, 30 LED sensors were found to be defective.</p>
      </div>

      <PartCard
        letter="e.i"
        topic="Sample Proportion"
        marks={1}
        statement={<>State the sample proportion of LED sensors that were found to be defective.</>}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Use this sample proportion to find a 90% confidence interval for the population proportion
            of defective LED sensors, correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Sample Size"
        marks={2}
        statement={
          <>
            A new sample of size <Katex tex="n" /> is taken, which is used to calculate a 95%
            confidence interval for the population proportion of defective LED sensors. This
            confidence interval, correct to three decimal places, is <Katex tex="(0.062,\ 0.213)" />.
            <br />
            Using the value <Katex tex="z=1.96" />, determine the sample size <Katex tex="n" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
