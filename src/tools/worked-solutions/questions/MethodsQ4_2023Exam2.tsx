// 2023 Mathematical Methods — Exam 2, Section B Question 4 (15 marks). Tennis-ball diameters:
// a normal model, a binomial on top of it, a conditional probability, a confidence level read
// backwards, and a sinusoidal density for serving speeds. Question text transcribed from the
// original paper. Answers checked with scipy and against the VCAA examination report.
// Solution is original. Widgets: f — interactives/meth-2023e2-q4f-two-tails (both tails share the
// 1%); g — interactives/meth-2023e2-q4g-interval (centre gives p̂, width gives the level);
// j — interactives/meth-2023e2-q4j-dilate (area ab = 1 and mean b·E(V)).
// 9 Oct 2026 Concise/Detailed pass: each row's reason trimmed to what is needed to follow it;
// traps, checks, report commentary and the part j. alternative method moved to the rows' more.
// The three widgets were re-audited (readouts rechecked with scipy) and kept.
// Final review: the Background now gives the sketch-and-shade habit for the tail errors the report
// notes in a., b., c. and f. (it was a contents list); part e.'s normCdf is now a CAS line.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TwoTailsWidget = lazyWidget(() => import('../interactives/meth-2023e2-q4f-two-tails'))
const IntervalWidget = lazyWidget(() => import('../interactives/meth-2023e2-q4g-interval'))
const DilateWidget = lazyWidget(() => import('../interactives/meth-2023e2-q4j-dilate'))

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well. There were some rounding errors. <Katex tex="0.1586" />{' '}
      was sometimes seen. Some students found <Katex tex="\Pr(D<6.8)" /> rather than{' '}
      <Katex tex="\Pr(D>6.8)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A common error was that students solved <Katex tex="\Pr(D>a)=0.9" />, giving{' '}
      <Katex tex="a=6.57" /> as the answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      This question was answered well. <Katex tex="\Pr(D\le6.94)\approx0.9918" /> was seen
      occasionally. Students need to be aware that with continuous probability{' '}
      <Katex tex="\Pr(D<6.95)=\Pr(D\le6.95)" />. Some students gave <Katex tex="0.0062" /> as
      the answer, which was the probability of the tennis ball being larger than 6.95 cm.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [28, 18, 54],
  average: 1.3,
  comment: (
    <>
      Some students gave only the answer. Appropriate working must be shown for questions worth
      more than one mark. Students needed to give the <Katex tex="n" /> and <Katex tex="p" />{' '}
      values. Some students solved <Katex tex="\Pr(X=3)" /> or <Katex tex="\Pr(X>3)" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [31, 16, 53],
  average: 1.2,
  comment: (
    <>
      Most students realised this was a conditional probability question.{' '}
      <Katex tex="\tfrac{0.89040\ldots}{0.99977\ldots}=0.8906\ldots" /> was a common incorrect
      answer.{' '}
      <Katex tex="\tfrac{\Pr(6.54<D<6.86)\times\Pr(D<6.95)}{\Pr(D<6.95)}=0.8904\ldots" /> was also
      a common incorrect approach.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [59, 15, 26],
  average: 0.7,
  comment: (
    <>
      The maximum value of the standard deviation was not asked for in the question. Hence{' '}
      <Katex tex="0<\sigma\le0.06" /> and{' '}
      <Katex tex="\sigma=0.00,\ 0.01,\ 0.02,\ 0.03,\ 0.04,\ 0.05" /> or{' '}
      <Katex tex="0.06" /> were accepted.
      <br />
      <Katex tex="\Pr(D<6.86)=0.99" />, <Katex tex="\tfrac{6.86-6.7}{\sigma}=2.3263\ldots" /> was
      a common incorrect approach. Trial and error could be used but students must make sure
      they show some appropriate working. Drawing a diagram and showing the probabilities was
      acceptable.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [66, 15, 19],
  average: 0.5,
  comment: (
    <>
      Many students calculated <Katex tex="\hat p" /> incorrectly, and{' '}
      <Katex tex="\hat p=0.8904" /> was often seen. Some had the correct <Katex tex="z" />{' '}
      value but then gave the answer as 95%.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: <>This question was answered well. There were some rounding errors.</>,
}

const EXAM_I: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: <>This question was answered reasonably well. An exact answer was required.</>,
}

const EXAM_J: SAExaminerStats = {
  marks: [89, 5, 6],
  average: 0.2,
  comment: (
    <>
      This question was not done well. Some students did not attempt the question. Others were
      able to recognise that <Katex tex="a=\tfrac1b" /> but were unable to find their values. A
      common incorrect answer was <Katex tex="a=\tfrac23" /> and <Katex tex="b=1" />. Many of
      those who attempted the second method did not multiply the terminals by{' '}
      <Katex tex="b" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="D \sim \mathrm{N}\!\left(6.7,\ 0.1^2\right)" />,
    reason: <>Given.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(6.8, ∞, 6.7, 0.1)
      </Cas>
    ),
    reason: <>&ldquo;Greater than&rdquo; means the upper tail: the area to the right of <Katex tex="6.8" />.</>,
    more: <>Finding <Katex tex="\Pr(D<6.8)=0.8413" /> instead gives the wrong tail, which the report notes some students did.</>,
  },
  {
    working: <Katex display tex="\boxed{0.1587}" />,
    reason: <>The CAS gives <Katex tex="0.158655\ldots" />, which rounds <em>up</em> to <Katex tex="0.1587" /> at four decimal places.</>,
    more: <><Katex tex="0.1586" />, which the report says was sometimes seen, just chops the digits off instead of rounding. Check: <Katex tex="6.8" /> is one standard deviation above the mean, and the 68–95–99.7 rule puts about <Katex tex="\tfrac{1-0.68}{2}=0.16" /> above it.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“larger than 90% of all balls”:</p>
        <Katex display tex="\Pr(D<d) = 0.9" />
      </>
    ),
    reason: <>90% of balls must be <em>smaller</em> than <Katex tex="d" />, so <Katex tex="d" /> has an area of 0.9 to its left.</>,
    more: <>Solving <Katex tex="\Pr(D>d)=0.9" /> instead puts 90% <em>above</em> <Katex tex="d" /> and gives <Katex tex="6.57" />, the common error the report notes. A ball larger than 90% of all balls must be well above the mean of 6.7 cm, so an answer below the mean is a signal to recheck which tail you used.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.9, 6.7, 0.1)
      </Cas>
    ),
    reason: <>invNorm works backwards: from the area to the left of a value, to the value itself.</>,
  },
  {
    working: <Katex display tex="d = 6.8282\ldots" />,
    reason: <>The diameter with 90% of balls below it.</>,
    more: <>As a check, <Katex tex="6.7+1.2816\times0.1=6.828" />: the value of <Katex tex="Z" /> with 90% below it is <Katex tex="1.2816" />, so <Katex tex="d" /> is 1.28 standard deviations above the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{6.83 \ \text{cm}}" />,
    reason: <>Two decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Fits through} \iff D < 6.95" />,
    reason: <>Fitting through means a diameter smaller than 6.95 cm, so it is the <em>lower</em> tail. <Katex tex="D" /> is continuous, so <Katex tex="\Pr(D=6.95)=0" />, and <Katex tex="<" /> or <Katex tex="\le" /> gives the same probability.</>,
    more: <>Some students gave <Katex tex="0.0062" />, which the report notes is the probability of a ball being <em>larger</em> than 6.95 cm. The report also saw <Katex tex="\Pr(D\le6.94)=0.9918" />: changing 6.95 to 6.94 is a habit from whole-number (discrete) variables, where <Katex tex="\Pr(X<7)=\Pr(X\le6)" />, but a diameter can take any value in between, so it gives a different probability.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 6.95, 6.7, 0.1)
      </Cas>
    ),
    reason: <>Lower bound <Katex tex="-\infty" />, upper bound <Katex tex="6.95" />.</>,
    more: <>Check: <Katex tex="6.95" /> is 2.5 standard deviations above the mean, so almost every ball should fit, and the answer is close to 1.</>,
  },
  {
    working: <Katex display tex="\boxed{0.9938}" />,
    reason: <>Store the unrounded <Katex tex="0.993790\ldots" />: parts d. and e. both use it.</>,
    more: <>Rounding to <Katex tex="0.9938" /> first happens not to change either later answer here, but rounding part-way through can shift the fourth decimal place of a later answer, so always carry the stored value.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&X = \text{number of the 4 balls that fit}\\ &X \sim \mathrm{Bi}(4,\ 0.993790\ldots)\end{aligned}" />,
    reason: <>Each of the 4 balls independently fits or doesn&apos;t, with the part c. probability every time, so <Katex tex="X" /> is binomial. Write down <Katex tex="n" /> and <Katex tex="p" />.</>,
    more: <>The report notes that students needed to give the <Katex tex="n" /> and <Katex tex="p" /> values, and that some gave only the answer, which is not enough in a question worth more than one mark. This line and the CAS line below are that working.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = \Pr(X=3)+\Pr(X=4)" />,
    reason: <>&ldquo;At least 3&rdquo; includes 3 itself.</>,
    more: <>Not <Katex tex="\Pr(X=3)=0.0244" /> alone, and not <Katex tex="\Pr(X>3)=0.9754" />, which only counts all 4 fitting: the report notes both were seen.</>,
  },
  {
    working: (
      <Cas fn="binomCdf">
        binomCdf(4, 0.99379…, 3, 4)
      </Cas>
    ),
    reason: <>Lower bound 3, upper bound 4, using the stored part c. value for <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.9998}" />,
    reason: <>Four decimal places.</>,
    more: <>Almost certain, which makes sense when each ball has a <Katex tex="99.4\%" /> chance of fitting on its own.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\Pr(6.54<D<6.86 \mid D<6.95)\\ &= \frac{\Pr(6.54<D<6.86 \cap D<6.95)}{\Pr(D<6.95)}\end{aligned}" />,
    reason: <>&ldquo;Given that it fits&rdquo; is a condition, so use the conditional probability formula <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />.</>,
  },
  {
    working: <Katex display tex="6.86 < 6.95 \implies \{6.54<D<6.86\}\subset\{D<6.95\}" />,
    reason: <>Every grade A ball is under 6.86 cm, so it is also under 6.95 cm and fits. &ldquo;Grade A and fits&rdquo; is therefore just &ldquo;grade A&rdquo;.</>,
    more: <>This is the step that simplifies everything, and it is why the intersection is <em>not</em> <Katex tex="\Pr(\text{grade A})\times\Pr(\text{fits})" />: multiplying probabilities only works for independent events, and these are not (knowing a ball is grade A makes it certain to fit). The report notes that product was a common incorrect approach; it just cancels back to <Katex tex="0.8904\ldots" />.</>,
  },
  {
    working: (
      <>
        <Cas fn="normCdf">
          normCdf(6.54, 6.86, 6.7, 0.1)
        </Cas>
        <Katex display tex="\Pr(6.54<D<6.86) = 0.890401\ldots" />
      </>
    ),
    reason: <>The numerator is now just <Katex tex="\Pr(\text{grade A})" />: lower bound 6.54, upper bound 6.86.</>,
  },
  {
    working: <Katex display tex="\frac{0.890401\ldots}{0.993790\ldots}" />,
    reason: <>Divide by the part c. probability, <Katex tex="\Pr(D<6.95)" />.</>,
    more: <>Not by part d.&apos;s <Katex tex="0.99977\ldots" />, which gives <Katex tex="0.8906\ldots" />, a common incorrect answer the report notes. The condition is that this <em>one</em> ball fits, which is part c., not part d.&apos;s &ldquo;at least 3 of 4&rdquo;.</>,
  },
  {
    working: <Katex display tex="\boxed{0.8960}" />,
    reason: <>Four decimal places.</>,
    more: <>Check: dividing by a probability a little under 1 makes the answer a little bigger than the unconditional <Katex tex="0.8904" />. That makes sense, because knowing the ball fits rules out only a few very large balls, none of them grade A.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="6.86-6.7 = 0.16 = 6.7-6.54" />,
    reason: <>The grade A window sits symmetrically about the mean, 0.16 cm either side. So whatever <Katex tex="\sigma" /> is, the balls that miss grade A are split equally between the two tails.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(6.54<D<6.86) > 0.99\\ \implies &\Pr(D>6.86) < 0.005\end{aligned}" />,
    reason: <>Less than 1% may miss grade A <em>in total</em>, and the two tails are equal, so each must hold less than 0.5%.</>,
    more: <>Solving <Katex tex="\Pr(D<6.86)=0.99" /> (<Katex tex="z=2.3263" />) puts the whole 1% in the upper tail and forgets the lower one; the report notes this was a common incorrect approach. It gives <Katex tex="\sigma\approx0.0688" />, and then the lower tail holds another 1%, so only 98% are grade A. The report notes that drawing a diagram and showing the probabilities was acceptable working: here, the bell curve with each tail, below 6.54 and above 6.86, marked as less than 0.005.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(Z<\frac{0.16}{\sigma}\right) > 0.995" />,
    reason: <>Standardise with <Katex tex="z=\tfrac{x-\mu}{\sigma}" />: 6.86 becomes <Katex tex="\tfrac{6.86-6.7}{\sigma}=\tfrac{0.16}{\sigma}" />. Less than 0.005 above it means more than 0.995 below it.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">
          invNorm(0.995, 0, 1)
        </Cas>
        <Katex display tex="\frac{0.16}{\sigma} > 2.5758\ldots" />
      </>
    ),
    reason: <><Katex tex="2.5758\ldots" /> is the value of <Katex tex="Z" /> with 99.5% below it, so <Katex tex="\tfrac{0.16}{\sigma}" /> must lie beyond it.</>,
  },
  {
    working: <Katex display tex="\sigma < \frac{0.16}{2.5758\ldots} = 0.0621\ldots" />,
    reason: <>Multiply both sides by <Katex tex="\sigma" /> (positive) and divide by <Katex tex="2.5758\ldots" />. It is an upper limit because a smaller <Katex tex="\sigma" /> packs the balls more tightly around 6.7 cm, so more of them are grade A.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma = 0.06 \ \text{cm}}" />,
    reason: <>To two decimal places; <Katex tex="0.06" /> is below <Katex tex="0.0621\ldots" />, so it meets the condition.</>,
    more: <>Check: with <Katex tex="\sigma=0.06" />, <Katex tex="\Pr(6.54<D<6.86)=0.9923>0.99" /> ✓. The report notes the maximum value was not asked for, so any of <Katex tex="0.00,\ 0.01,\ \ldots,\ 0.06" /> was accepted. Trial and error also works (try values of <Katex tex="\sigma" /> in <Katex tex="\mathrm{normCdf}(6.54,\,6.86,\,6.7,\,\sigma)" /> until the result is above 0.99), but the report warns that some appropriate working must still be shown.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{0.7382+0.9493}{2} = 0.84375" />,
    reason: <>A confidence interval for a proportion is <Katex tex="\hat p\pm E" />, so the sample proportion <Katex tex="\hat p" /> sits exactly in the middle: average the two ends.</>,
    more: <>The report notes <Katex tex="\hat p=0.8904" /> was often seen. That is <Katex tex="\Pr(6.54<D<6.86)" /> from part e., the proportion of grade A balls the normal model predicts for the whole population, not the proportion in the inspector&apos;s sample of 32. The interval is always built around the sample&apos;s <Katex tex="\hat p" />. Check: <Katex tex="0.84375=\tfrac{27}{32}" />, a whole number of balls out of 32, as a sample proportion must be.</>,
  },
  {
    working: <Katex display tex="E = 0.9493-0.84375 = 0.10555" />,
    reason: <>The margin of error <Katex tex="E" /> is the distance from the centre to either end.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}E &= z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}\\ 0.10555 &= z\sqrt{\frac{0.84375\times0.15625}{32}}\end{aligned}" />,
    reason: <>The margin of error for an approximate confidence interval for a proportion, with <Katex tex="n=32" />. The only unknown left is <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="z = \frac{0.10555}{0.064186\ldots} = 1.6444\ldots" />,
    reason: <>The square root is <Katex tex="0.064186\ldots" />; divide.</>,
  },
  {
    working: (
      <>
        <Cas fn="normCdf">
          normCdf(−1.6444…, 1.6444…, 0, 1)
        </Cas>
        <Katex display tex="\Pr(-1.6444\ldots<Z<1.6444\ldots) = 0.8999\ldots" />
      </>
    ),
    reason: <>The confidence level is the area under the standard normal curve between <Katex tex="-z" /> and <Katex tex="z" />, the same way <Katex tex="z=1.96" /> goes with 95%.</>,
  },
  {
    working: <Katex display tex="\boxed{90\%}" />,
    reason: <>To the nearest integer.</>,
    more: <>The report notes some students had the correct <Katex tex="z" /> value but then gave 95%. Here <Katex tex="z\approx1.645" />, which belongs to 90%, not 95%. The small gap between <Katex tex="1.6444" /> and the usual <Katex tex="1.6449" /> is only because the interval&apos;s ends were rounded to 4 decimal places.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(V>50) = \int_{50}^{3\pi^2+30}\frac{1}{6\pi}\sin\!\left(\sqrt{\frac{v-30}{3}}\right)dv" />,
    reason: <>The area under the pdf from 50 up to the top of its interval, <Katex tex="3\pi^2+30\approx59.6" />, where the pdf drops to 0.</>,
    more: <>Don&apos;t type <Katex tex="\infty" /> as the upper terminal: beyond <Katex tex="3\pi^2+30" /> the pdf is 0, but the sine expression keeps oscillating, so the CAS would be integrating the wrong function there.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(sin(√((v−30)/3))/(6π), v, 50, 3π²+30)
      </Cas>
    ),
    reason: <>Four decimal places are asked for, so a numerical integral on CAS is all that&apos;s needed.</>,
  },
  {
    working: <Katex display tex="\boxed{0.1345}" />,
    reason: <>Four decimal places.</>,
    more: <>The CAS gives <Katex tex="0.134516\ldots" />, which rounds to <Katex tex="0.1345" /> (the report mentions rounding errors). As a check, the same integral from 30 to <Katex tex="3\pi^2+30" /> gives 1, as it must for a pdf, which confirms the rule and terminals were typed correctly.</>,
  },
]

const ROWS_I: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}(V) &= \int_{30}^{3\pi^2+30}v\,f(v)\,dv\\ &= \int_{30}^{3\pi^2+30}\frac{v}{6\pi}\sin\!\left(\sqrt{\frac{v-30}{3}}\right)dv\end{aligned}" />,
    reason: <>The mean of a continuous random variable: integrate <Katex tex="v\times f(v)" /> over the interval where <Katex tex="f" /> is non-zero.</>,
  },
  {
    working: <Katex display tex="= 3\pi^2+12" />,
    reason: <>The question says <b>exact</b>, so use the CAS definite-integral template in exact mode, typing the exact terminal <Katex tex="3\pi^2+30" />.</>,
    more: <>nInt only ever gives a decimal, here <Katex tex="41.6088\ldots" />, and the report notes an exact answer was required. A decimal terminal such as 59.6 would also stop the CAS from giving an exact result.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(V) = 3\pi^2+12 = 3\left(\pi^2+4\right) \ \text{m s}^{-1}}" />,
    reason: <>Exact, as the question asks.</>,
    more: <>About <Katex tex="41.6\ \text{m s}^{-1}" />, sensibly inside the interval <Katex tex="[30,\ 59.6]" />. The factorised form <Katex tex="3\left(\pi^2+4\right)" /> is the one part j. needs.</>,
  },
]

const ROWS_J: WorkingRow[] = [
  {
    working: <Katex display tex="g(w) = a\,f\!\left(\frac wb\right)" />,
    reason: <>Replacing <Katex tex="v" /> by <Katex tex="\tfrac wb" /> is a dilation by factor <Katex tex="b" /> from the vertical axis: every speed is multiplied by <Katex tex="b" />. Multiplying by <Katex tex="a" /> is a dilation by factor <Katex tex="a" /> from the horizontal axis: every height is multiplied by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{area under } g &= a\times b\times\left(\text{area under } f\right) = ab\\ ab &= 1 \implies a = \frac1b\end{aligned}" />,
    reason: <>Stretching a region sideways by <Katex tex="b" /> multiplies its area by <Katex tex="b" />, and stretching it upwards by <Katex tex="a" /> multiplies its area by <Katex tex="a" />. The area under <Katex tex="f" /> is 1, and <Katex tex="g" /> must also have area 1 to be a pdf.</>,
    more: <>The common incorrect answer <Katex tex="a=\tfrac23,\ b=1" /> fails this: its area is <Katex tex="\tfrac23" />. It does make <Katex tex="\int w\,g(w)\,dw=\tfrac23\left(3\pi^2+12\right)=2\pi^2+8" />, but with area <Katex tex="\tfrac23" />, <Katex tex="g" /> is not a pdf, so that integral is not a mean. A vertical stretch on its own can&apos;t move a mean anyway: it leaves every speed where it was.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(W) = b\,\mathrm{E}(V) = b\left(3\pi^2+12\right)" />,
    reason: <>With <Katex tex="a=\tfrac1b" />, <Katex tex="g" /> is the pdf of <Katex tex="bV" />: every speed is multiplied by <Katex tex="b" />, and the <Katex tex="\tfrac1b" /> keeps the area at 1. So <Katex tex="\mathrm{E}(W)=\mathrm{E}(bV)=b\,\mathrm{E}(V)" />, using part i.</>,
    more: <>The report notes that some students found <Katex tex="a=\tfrac1b" /> but could not then find the values: this line is the missing link. Think of the mean as the balance point of the region under the graph. Stretching the graph sideways by <Katex tex="b" /> moves every point, and so the balance point, to <Katex tex="b" /> times its speed, while the upwards stretch by <Katex tex="\tfrac1b" /> changes only heights. It is the same rule as <Katex tex="\mathrm{E}(kX)=k\,\mathrm{E}(X)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}b\left(3\pi^2+12\right) &= 2\pi^2+8\\ 3b\left(\pi^2+4\right) &= 2\left(\pi^2+4\right)\end{aligned}" />,
    reason: <>Factorise both sides: <Katex tex="\pi^2+4" /> is common, so it cancels, leaving <Katex tex="3b=2" />.</>,
    more: <>The report&apos;s other method solves <Katex tex="\int g(w)\,dw=1" /> and <Katex tex="\int w\,g(w)\,dw=2\pi^2+8" /> simultaneously on CAS, with terminals <Katex tex="30b" /> and <Katex tex="\left(3\pi^2+30\right)b" />. The terminals change because the sideways stretch moves the interval too: <Katex tex="g" /> is non-zero where <Katex tex="30\le\tfrac wb\le3\pi^2+30" />. The report notes many who tried this did not multiply the terminals by <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac32, \quad b = \frac23}" />,
    reason: <><Katex tex="b=\tfrac23" />, then <Katex tex="a=\tfrac1b=\tfrac32" />.</>,
    more: <>Check: <Katex tex="ab=1" /> ✓, and <Katex tex="\tfrac23\times3\left(\pi^2+4\right)=2\pi^2+8" /> ✓.</>,
  },
]

export default function MethodsQ4_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (15 marks)</p>
        <p>
          A manufacturer produces tennis balls.
          <br />
          The diameter of the tennis balls is a normally
          distributed random variable <Katex tex="D" />, which has a mean of 6.7 cm and a
          standard deviation of 0.1 cm.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. to f. all build on the normal model for <Katex tex="D" />, and in parts
              a., b., c. and f. the report notes errors with the tails of the curve: the wrong
              tail in a. to c., and only one of the two tails in f.
            </p>
            <p>
              The habit that prevents this: before each normCdf or invNorm, sketch the bell curve
              with 6.7 in the middle and shade the region the question describes.
              &ldquo;Greater than&rdquo; is to the right of the value, &ldquo;smaller
              than&rdquo; is to the left, and grade A is a middle band with a tail on each side.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Normal Distribution"
        marks={1}
        statement={
          <>Find <Katex tex="\Pr(D>6.8)" />, correct to four decimal places.</>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            Find the minimum diameter of a tennis ball that is larger than 90% of all tennis
            balls produced.
            <br />
            Give your answer in centimetres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Tennis balls are packed and sold in cylindrical containers. A tennis ball can fit
          through the opening at the top of the container if its diameter is smaller than
          6.95 cm.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Normal Distribution"
        marks={1}
        statement={
          <>
            Find the probability that a randomly selected tennis ball can fit through the
            opening at the top of the container.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            In a random selection of 4 tennis balls, find the probability that at least 3
            balls can fit through the opening at the top of the container.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A tennis ball is classed as grade A if its diameter is between 6.54 cm and 6.86 cm,
          otherwise it is classed as grade B.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Given that a tennis ball can fit through the opening at the top of the container,
            find the probability that it is classed as grade A.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Normal Distribution"
        marks={2}
        statement={
          <>
            The manufacturer would like to improve processes to ensure that more than 99% of
            all tennis balls produced are classed as grade A.
            <br />
            Assuming that the mean diameter of the tennis balls remains the same, find the
            required standard deviation of the diameter, in centimetres, correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title="Balls miss grade A in both tails, so the two tails share the 1%">
          <TwoTailsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g"
        topic="Confidence Level"
        marks={2}
        statement={
          <>
            An inspector takes a random sample of 32 tennis balls from the manufacturer and
            determines a confidence interval for the population proportion of grade A balls
            produced.
            <br />
            The confidence interval is <Katex tex="(0.7382,\,0.9493)" />, correct to 4 decimal
            places.
            <br />
            Find the level of confidence that the population proportion of grade A balls is
            within the interval, as a percentage correct to the nearest integer.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
        <Explore title="The interval is p̂ ± E: its centre gives p̂, its width gives the level">
          <IntervalWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          A tennis coach uses both grade A and grade B balls. The serving speed, in metres per
          second, of a grade A ball is a continuous random variable, <Katex tex="V" />, with
          the probability density function
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(v)=\begin{cases}\tfrac{1}{6\pi}\sin\!\left(\sqrt{\tfrac{v-30}{3}}\right) & 30\le v\le3\pi^2+30\\[6pt]0 & \text{elsewhere}\end{cases}"
          />
        </div>
      </div>

      <PartCard
        letter="h"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            Find the probability that the serving speed of a grade A ball exceeds 50 metres
            per second.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>

      <PartCard
        letter="i"
        topic="Mean of PDF"
        marks={1}
        statement={
          <>
            Find the <b>exact</b> mean serving speed for grade A balls, in metres per second.
          </>
        }
        examinerReport={EXAM_I}
      >
        <WorkingTable rows={ROWS_I} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The serving speed of a grade B ball is given by a continuous random variable,{' '}
          <Katex tex="W" />, with the probability density function <Katex tex="g(w)" />.
          <br />
          A transformation maps the graph of <Katex tex="f" /> to the graph of{' '}
          <Katex tex="g" />, where <Katex tex="g(w)=af\!\left(\dfrac wb\right)" />.
        </p>
      </div>

      <PartCard
        letter="j"
        topic="Transformed PDF"
        marks={2}
        statement={
          <>
            If the mean serving speed for a grade B ball is <Katex tex="2\pi^2+8" /> metres
            per second, find the values of <Katex tex="a" /> and <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_J}
      >
        <WorkingTable rows={ROWS_J} />
        <Explore title="A sideways stretch by b moves the mean to b·E(V); a = 1/b only keeps the area at 1">
          <DilateWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
