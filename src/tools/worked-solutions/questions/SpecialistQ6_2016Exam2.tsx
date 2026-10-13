// 2016 Specialist Mathematics — Exam 2, Section B, Question 6 (9 marks).
// A one-sided test on the mean pollutant level in a river, then the rejection boundary and
// a Type II error probability. Question text transcribed from the original paper (no
// diagram given). Answers verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [8, 12, 80],
  average: 1.7,
  comment: <>Students handled this very well. Almost all students stated the correct mean.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 5, 75],
  average: 1.6,
  comment: (
    <>
      This question was answered very well by the majority of students. Some students failed
      to use appropriate notation or state the hypotheses clearly. The alternate hypothesis
      was occasionally written for a two-tail test, that is{' '}
      <Katex tex="H_1:\mu\ne1.1" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [23, 15, 62],
  average: 1.4,
  comment: (
    <>
      Transcription errors caused some students to miss out on marks, with answers such as{' '}
      <Katex tex="0.009" /> occurring. High-scoring answers using the{' '}
      <Katex tex="z" />-distribution were prevalent.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      A correct response to Question 6ci. was generally followed by a correct answer to
      this question. Some students did not explicitly test at the <Katex tex="5\%" /> level
      of significance. Two-tail approaches appeared occasionally.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: (
    <>
      Correct answers were obtained by the majority of students who attempted this question.
      Rounding errors caused some students to miss out on the mark.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: (
    <>
      Correct answers were obtained by the majority of students who attempted this question.
      Rounding errors caused some students to miss out on the mark.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(\bar X) = 1.1 \text{ mg/L}" />,
    reason: <>The sample mean is centred on the population mean: <Katex tex="\mathrm{E}(\bar X)=\mu" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{\sigma}{\sqrt n} = \frac{0.16}{\sqrt{25}} = 0.032 \text{ mg/L}" />,
    reason: <>The standard deviation of a sample mean is <Katex tex="\tfrac{\sigma}{\sqrt n}" />: divide by <Katex tex="\sqrt{25}=5" />, not by <Katex tex="25" />.</>,
    more: <>The report's answer also writes it as <Katex tex="\tfrac{4}{125}" />; either form earns the mark. Dividing by <Katex tex="n=25" /> instead would give <Katex tex="0.0064" />, which is the right idea applied to the variance (<Katex tex="\tfrac{\sigma^2}{n}" />), not the standard deviation. Averaging <Katex tex="25" /> sites cancels out much of the site-to-site variation, which is why <Katex tex="\bar X" /> is five times less spread out than a single measurement.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \mu = 1.1" />,
    reason: <>The null hypothesis always asserts no change: the mean is still what it was before the spill.</>,
    more: <>Write the hypotheses about the population mean <Katex tex="\mu" />, never about the sample mean <Katex tex="\bar x" />: we already know <Katex tex="\bar x=1.2" />, so there is nothing to test about it. The report notes students who did not use appropriate notation or state the hypotheses clearly.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu > 1.1}" />,
    reason: <>One-sided and pointing up, because the question asks specifically whether the level has <em>increased</em>.</>,
    more: <>Writing <Katex tex="H_1:\mu\ne1.1" /> makes it a two-tailed test, which asks whether the level has <em>changed</em> in either direction — a different question. The report notes this error.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X>1.2 \mid \mu=1.1\right)" />,
    reason: <>The <Katex tex="p" />-value: the chance of a sample mean at least this extreme, assuming <Katex tex="H_0" /> is true. The direction matches <Katex tex="H_1" />.</>,
  },
  {
    working: <Katex display tex="= \Pr\!\left(Z>\frac{1.2-1.1}{0.032}\right) = \Pr(Z>3.125)" />,
    reason: <>By the central limit theorem, <Katex tex="\bar X" /> is approximately normal: under <Katex tex="H_0" />, <Katex tex="\bar X\sim N(1.1,\ 0.032^2)" /> from part (a). Standardise.</>,
    more: <>The stem never says the pollutant levels themselves are normal, so the normal model for <Katex tex="\bar X" /> comes from the central limit theorem: the mean of a random sample is approximately normal whatever the shape of the population, and the approximation improves as <Katex tex="n" /> grows. With <Katex tex="n=25" /> it is treated as good enough here, as the report's answers do.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(1.2, ∞, 1.1, 0.032)</Cas>,
    reason: <>Or directly, without standardising.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0009}" />,
    reason: <>The CAS gives <Katex tex="0.000889\ldots" />, which is <Katex tex="0.0009" /> to four decimal places.</>,
    more: <>The report notes answers such as <Katex tex="0.009" />, a transcription slip that is ten times too big. Count the zeros carefully when copying from the CAS. A quick check: <Katex tex="z=3.125" /> is more than three standard deviations above the mean, and <Katex tex="\Pr(Z>3)\approx0.0013" />, so the answer must be smaller than that.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="0.0009 < 0.05" />,
    reason: <>Compare the <Katex tex="p" />-value with the significance level.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Reject } H_0 \text{ at the } 5\% \text{ level}}" />,
    reason: <>A sample mean this high would happen less than once in a thousand samples if nothing had changed.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{The sample supports an increase}\\ \text{in the mean pollutant level.}\end{gathered}}" />,
    reason: <>Answer the question in words, and name the <Katex tex="5\%" /> level explicitly.</>,
    more: <>The report notes students who did not explicitly test at the <Katex tex="5\%" /> level, and occasional two-tail approaches. The test is one-tailed (part b), so compare <Katex tex="p" /> with <Katex tex="0.05" /> as it stands: do not double the <Katex tex="p" />-value or compare it with <Katex tex="0.025" />. Here the conclusion happens to be the same either way, but the method would not earn the mark.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X>\bar x_c \mid \mu=1.1\right) = 0.05" />,
    reason: <>The boundary of the rejection region: any sample mean above it leads to rejection at the <Katex tex="5\%" /> level.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.95, 1.1, 0.032)</Cas>,
    reason: <>The inverse normal works with the area to the <em>left</em>, so enter <Katex tex="0.95" />, not <Katex tex="0.05" />.</>,
    more: <>The CAS gives <Katex tex="1.15263\ldots" />. Equivalently, standardise: <Katex tex="z=1.64485\ldots" /> (invNorm of <Katex tex="0.95" /> on the standard normal) cuts off the top <Katex tex="5\%" />, so <Katex tex="\bar x_c=1.1+1.64485\times0.032" />. The report says rounding errors cost some students the mark: rounding <Katex tex="z" /> to <Katex tex="1.64" /> gives <Katex tex="1.1+1.64\times0.032=1.15248" />, which rounds to <Katex tex="1.152" />, the wrong answer. Keep full precision until the final step.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x_c \approx 1.153 \text{ mg/L}}" />,
    reason: <>Three decimal places. The observed <Katex tex="1.2" /> is comfortably above it, consistent with rejecting in part (c).</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim N\!\left(1.2,\ 0.032^2\right)" />,
    reason: <>The mean has moved to the true value <Katex tex="1.2" />; the standard deviation of the sample mean is unchanged, since <Katex tex="\sigma" /> and <Katex tex="n" /> have not changed.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar X<1.163\right) = \Pr\!\left(Z<\frac{1.163-1.2}{0.032}\right)" />,
    reason: <>Standardising about the <em>new</em> mean — that substitution is the whole question.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z<-1.15625)" />,
    reason: <>Negative, since <Katex tex="1.163" /> is now below the mean. Keep this <Katex tex="z" /> exact.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 1.163, 1.2, 0.032)</Cas>,
    reason: <>Or enter it directly, which avoids rounding <Katex tex="z" /> at all.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.124}" />,
    reason: <>Three decimal places. This is the <em>Type II error</em> probability.</>,
    more: <>The CAS gives <Katex tex="0.12379\ldots" />: about one test in eight would miss the increase. The report says rounding errors cost some students the mark: rounding <Katex tex="z" /> to <Katex tex="-1.16" /> gives <Katex tex="\Pr(Z<-1.16)\approx0.1230" />, which is <Katex tex="0.123" />, not <Katex tex="0.124" />.</>,
  },
]

export default function SpecialistQ6_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (9 marks)</p>
        <p>
          The mean level of pollutant in a river is known to be <Katex tex="1.1" /> mg/L with
          a standard deviation of <Katex tex="0.16" /> mg/L.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Sample Mean"
        marks={2}
        statement={
          <>
            Let the random variable <Katex tex="\bar X" /> represent the mean level of
            pollutant in the measurements from a random sample of <Katex tex="25" /> sites
            along the river.
            <br />
            Write down the mean and standard deviation of{' '}
            <Katex tex="\bar X" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          After a chemical spill, the mean level of pollutant from a random sample of{' '}
          <Katex tex="25" /> sites is found to be <Katex tex="1.2" /> mg/L. To determine
          whether this sample provides evidence that the mean level of pollutant has
          increased, a statistical test is carried out.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Hypotheses"
        marks={2}
        statement={
          <>
            Write down suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> to
            test whether the mean level of pollutant has increased.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="The shape of a hypothesis test">
          <p>
            <Katex tex="H_0" /> says nothing has changed; <Katex tex="H_1" /> says what you
            suspect <em>and in which direction</em>. "Has increased" means{' '}
            <Katex tex="\mu>1.1" />, a one-tailed test.
          </p>
          <p>
            The direction of <Katex tex="H_1" /> then decides which tail the{' '}
            <Katex tex="p" />-value in part (c) uses. A small <Katex tex="p" /> means the
            sample would be surprising if <Katex tex="H_0" /> were true, so{' '}
            <Katex tex="H_0" /> goes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="p-Value"
        marks={2}
        statement={
          <>
            Find the <Katex tex="p" /> value for this test, correct to four decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            State with a reason whether the sample supports the contention that there has
            been an increase in the mean level of pollutant after the spill. Test at the{' '}
            <Katex tex="5\%" /> level of significance.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            For this test, what is the smallest value of the sample mean that would provide
            evidence that the mean level of pollutant has increased? That is, find{' '}
            <Katex tex="\bar x_c" /> such that{' '}
            <Katex tex="\Pr\!\left(\bar X>\bar x_c \mid \mu=1.1\right)=0.05" />. Give your
            answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Type II Error"
        marks={1}
        statement={
          <>
            Suppose that for a level of significance of <Katex tex="2.5\%" />, we find that{' '}
            <Katex tex="\bar x_c=1.163" />. That is,{' '}
            <Katex tex="\Pr\!\left(\bar X>1.163 \mid \mu=1.1\right)=0.025" />.
            <br />
            If the mean level of pollutant in the river, <Katex tex="\mu" />, is in fact{' '}
            <Katex tex="1.2" /> mg/L after the spill, find{' '}
            <Katex tex="\Pr\!\left(\bar X<1.163 \mid \mu=1.2\right)" />. Give your answer
            correct to three decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="What this probability means">
          <p>
            The boundary <Katex tex="1.163" /> was set assuming <Katex tex="H_0" /> is true.
            This part asks: if the mean really has risen to <Katex tex="1.2" />, how often
            would a sample still fall <em>below</em> the boundary and leave{' '}
            <Katex tex="H_0" /> standing?
          </p>
          <p>
            That is a <strong>Type II error</strong> — failing to reject a false null
            hypothesis.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
