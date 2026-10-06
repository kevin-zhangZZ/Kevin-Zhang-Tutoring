// 2017 Specialist Mathematics — Exam 1, Question 4 (3 marks). Distribution of a sample
// mean of four bottles. 42% scored zero; the report says many used the population standard
// deviation instead of the standard deviation of the mean. Question text transcribed from
// the original paper (no diagram given). Answer checked with scipy and against the VCAA
// examination report (0.025 or 0.023) and itute (0.025). Solution is original. No lettered
// parts, so this uses the plain card layout.
//
// Interactives: spec-2017e1-q4-packs (simulate four-bottle packs; the histogram of pack means
// fits sd 3/√4, not 3 or 3/4) and spec-2017e1-q4-tail (slide n: 295 is z = −√n sds below the
// mean, a clean −2 at n = 4, where the 95% band's edge sits on 295). Wrong methods, all listed
// in the report: sd 3 → 0.16; scaling the sd by n (3/4, or 12 for the total); z = +2 → 0.975.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PacksWidget = lazyWidget(() => import('../interactives/spec-2017e1-q4-packs'))
const TailWidget = lazyWidget(() => import('../interactives/spec-2017e1-q4-tail'))

const EXAM: SAExaminerStats = {
  marks: [42, 9, 12, 37],
  average: 1.5,
  comment: (
    <>
      This question was answered well by students who found the standard deviation of the
      sample, but many used the standard deviation of the population. Students' notation was
      often not clear and did not distinguish between the standard deviation of{' '}
      <Katex tex="X" /> and <em>the standard deviation of</em> <Katex tex="\bar{X}" />. Some
      arithmetic errors were made when dividing by <Katex tex="\tfrac32" />. Other typical
      errors included:
      <ul className="list-disc pl-5 my-1">
        <li>not working with the mean leading to finding <Katex tex="\Pr(X<295)" /></li>
        <li>using the total volume and taking the standard deviation to be 12 rather than 6</li>
        <li>working with the mean but using <Katex tex="\tfrac34" /> as the standard deviation</li>
        <li>finding the probability that the mean was greater than 295</li>
        <li>
          finding <Katex tex="z=+2" /> by incorrect standardisation using{' '}
          <Katex tex="\Pr\!\left(Z<\tfrac{298-295}{1.5}\right)" />
        </li>
        <li>an inability to obtain the value of <Katex tex="\Pr(Z<-2)" /> due to arithmetic mistakes.</li>
      </ul>
      Some used the 68% or 99.7% approximation instead of 95%, while others made attempts to
      find a confidence interval. Others used the 0.16 as a <Katex tex="p" />-value in a
      binomial distribution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(298,\,3^2)" />,
    reason: (
      <>
        Name the random variable first: <Katex tex="X" /> is the volume of <em>one</em> bottle, and that is
        what the given mean and standard deviation describe. But read the question again: it asks about the{' '}
        <em>mean volume per bottle in a four-bottle pack</em>. The word <em>mean</em> tells you the variable
        you need is the sample mean <Katex tex="\bar X" /> of <Katex tex="n=4" /> bottles, not{' '}
        <Katex tex="X" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\bar X=\tfrac14\left(X_1+X_2+X_3+X_4\right)" />,
    reason: (
      <>
        Four independent bottles from the same machine, averaged. Because each <Katex tex="X_i" /> is normal,
        their average is exactly normal too.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{E}(\bar X)=\mu=298" />,
    reason: <>Averaging doesn&apos;t move the centre: a typical pack still averages 298&nbsp;mL.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X)=\frac{\sigma}{\sqrt n}=\frac{3}{\sqrt4}=\frac32" />,
    reason: (
      <>
        Averaging <em>does</em> shrink the spread: in a pack, a heavy bottle and a light one partly cancel, so
        pack means stay closer to 298 than single bottles do. The shrink factor is <Katex tex="\sqrt n" />, not{' '}
        <Katex tex="n" />, because it is the variances that add (see Background). Write{' '}
        <Katex tex="\mathrm{sd}(\bar X)" /> in full: the report says students&apos; notation often did not
        distinguish the standard deviation of <Katex tex="X" /> from that of <Katex tex="\bar X" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(\bar X<295) = \Pr\!\left(Z<\frac{295-298}{3/2}\right)" />,
    reason: (
      <>
        Standardise: (value <Katex tex="-" /> mean) <Katex tex="\div" /> sd, using the sd <em>of the mean</em>.
        Keep the order value minus mean, so the sign of <Katex tex="z" /> records which side of 298 you are on.
      </>
    ),
  },
  {
    working: <Katex display tex="= \Pr\!\left(Z<-3\times\tfrac23\right)= \Pr(Z<-2)" />,
    reason: (
      <>
        Dividing by <Katex tex="\tfrac32" /> is multiplying by <Katex tex="\tfrac23" />. So 295 is exactly two
        standard deviations below the mean. On a no-calculator paper, a value that lands on a whole number of
        standard deviations is your cue for the 68&ndash;95&ndash;99.7 rule.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(-2<Z<2)\approx 0.95" />
        <Katex display tex="\Pr(Z<-2)\approx\frac{1-0.95}{2}" />
      </>
    ),
    reason: (
      <>
        About 95% of any normal distribution lies within 2 standard deviations of the mean. The other 5% is
        split equally between the two tails by symmetry, and you want only the lower tail, so halve it.
        (Stopping at <Katex tex="0.05" /> counts both tails.) This is why the question says
        &ldquo;approximate&rdquo;.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\approx 0.025}" />,
    reason: (
      <>
        VCAA accepted both <Katex tex="0.025" /> (from the <Katex tex="95\%" /> rule) and{' '}
        <Katex tex="0.023" /> (the exact value, <Katex tex="0.02275" />). Check the direction: 295 is below the
        mean, so the answer must be well under <Katex tex="0.5" />.
      </>
    ),
  },
]

export default function SpecialistQ4_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)" always>
        <p>
          The volume of soft drink dispensed by a machine into bottles varies normally with a
          mean of <Katex tex="298" /> mL and a standard deviation of <Katex tex="3" /> mL. The
          soft drink is sold in packs of four bottles.
        </p>
        <p>
          Find the approximate probability that the mean volume of soft drink per bottle in a
          randomly selected four-bottle pack is less than <Katex tex="295" /> mL. Give your
          answer correct to three decimal places.
        </p>
      </Background>
      <Background>
        <p>
          <strong>The whole question in one idea.</strong> A sample mean is less variable than
          a single observation: <Katex tex="\mathrm{sd}(\bar X)=\tfrac{\sigma}{\sqrt n}" />.
          Reading &ldquo;mean volume per bottle&rdquo; as &ldquo;volume of one bottle&rdquo; is the first error
          the report lists.
        </p>
        <p>
          <strong>Why <Katex tex="\sqrt n" /> and not <Katex tex="n" />?</strong> For independent random
          variables the <em>variances</em> add, and a constant multiplier comes out squared:
        </p>
        <Katex display tex="\mathrm{Var}(\bar X)=\tfrac{1}{4^2}\,\mathrm{Var}(X_1+X_2+X_3+X_4)" />
        <Katex display tex="=\tfrac{1}{16}\left(4\sigma^2\right)=\tfrac{\sigma^2}{4}" />
        <p>
          so <Katex tex="\mathrm{sd}(\bar X)=\tfrac{\sigma}{2}=\tfrac{\sigma}{\sqrt4}" />. In general{' '}
          <Katex tex="\mathrm{Var}(\bar X)=\tfrac{\sigma^2}{n}" /> and{' '}
          <Katex tex="\mathrm{sd}(\bar X)=\tfrac{\sigma}{\sqrt n}" />. The same rule handles the total{' '}
          <Katex tex="T=X_1+\cdots+X_4" />: <Katex tex="\mathrm{Var}(T)=4\times 9=36" />, so{' '}
          <Katex tex="\mathrm{sd}(T)=6" />, not <Katex tex="4\times3=12" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Why a pack's average is less spread out than one bottle: fill packs and see which curve fits">
        <PacksWidget />
      </Explore>
      <Explore title="295 mL is one sd below for a bottle, but two below for a pack mean">
        <TailWidget />
      </Explore>
      <WrongMethod
        title="“Mean volume” is just the volume, so use sd 3"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\Pr(X<295)=\Pr(Z<-1)" />
            <Katex display tex="\approx\tfrac{1-0.68}{2}=0.16" />
          </>
        }
      >
        This finds the chance that <em>one bottle</em> is under 295&nbsp;mL, about one bottle in six. For a
        pack to <em>average</em> under 295, most of its four bottles have to be low at once, which is far
        rarer. Catch it by asking which random variable the question describes: &ldquo;the mean volume per
        bottle in a pack&rdquo; is <Katex tex="\bar X" />, and <Katex tex="\bar X" /> has its own, smaller
        standard deviation. In the first explorer, the sd&nbsp;3 curve is far wider than the bars of pack means.
      </WrongMethod>
      <WrongMethod
        title="Scale the sd by n, the way the mean scales"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\mathrm{sd}(\bar X)=\tfrac34" />
            <Katex display tex="\Pr(\bar X<295)=\Pr(Z<-4)\approx 0.000" />
            <Katex display tex="\mathrm{sd}(T)=4\times3=12" />
            <Katex display tex="\Pr(T<1180)=\Pr(Z<-1)\approx 0.16" />
          </>
        }
      >
        Dividing <Katex tex="\sigma" /> by 4 for the mean, or multiplying it by 4 for the total, treats the
        standard deviation as if it scaled like the mean. It doesn&apos;t: the <em>variances</em> add, so the
        sd scales by <Katex tex="\sqrt n" />. With <Katex tex="\mathrm{sd}(T)=6" />, the total gives{' '}
        <Katex tex="\Pr\!\left(Z<\tfrac{1180-1192}{6}\right)=\Pr(Z<-2)" />, the same answer as the mean.
        A quick check: sd <Katex tex="\tfrac34" /> would make a pack mean under 295 a four-sd event, almost
        impossible, yet the first explorer shows about 2% of packs doing it.
      </WrongMethod>
      <WrongMethod
        title="z = (298 − 295)/1.5 = 2, so the answer is Pr(Z < 2)"
        source="Examiner's report"
        working={<Katex display tex="\Pr(Z<2)\approx 0.975" />}
      >
        Standardise as (value <Katex tex="-" /> mean) <Katex tex="\div" /> sd, in that order: 295 is below
        298, so <Katex tex="z" /> must be negative. The same 0.975 comes from finding{' '}
        <Katex tex="\Pr(\bar X>295)" />, the wrong tail, which the report also lists. Catch both with a quick
        sketch: a value below the mean has less than half the area to its left, so any answer above 0.5 is
        wrong.
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
