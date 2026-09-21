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
      A correct response to Question 6c.i. was generally followed by a correct answer to
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
    reason: <>Averaging leaves the centre where it was.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{\sigma}{\sqrt n} = \frac{0.16}{\sqrt{25}} = 0.032 \text{ mg/L}" />,
    reason: <>Equivalently <Katex tex="\tfrac{4}{125}" />. Dividing by <Katex tex="\sqrt{25}=5" /> — not by <Katex tex="25" /> — is the whole content of this part.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \mu = 1.1" />,
    reason: <>The null hypothesis always asserts no change: the mean is still what it was before the spill.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu > 1.1}" />,
    reason: <>One-sided and pointing up, because the question asks specifically whether the level has <em>increased</em>. Writing <Katex tex="\mu\ne1.1" /> makes it a two-tailed test and answers a different question — the report's noted error.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X>1.2 \mid \mu=1.1\right)" />,
    reason: <>The <Katex tex="p" />-value: the chance of a sample mean at least this extreme, assuming <Katex tex="H_0" /> is true. The direction matches <Katex tex="H_1" />.</>,
  },
  {
    working: <Katex display tex="= \Pr\!\left(Z>\frac{1.2-1.1}{0.032}\right) = \Pr(Z>3.125)" />,
    reason: <>Standardising with the standard deviation of the mean from part (a).</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(1.2, ∞, 1.1, 0.032)</Cas>,
    reason: <>Or directly, without standardising.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0009}" />,
    reason: <>Four decimal places. Over three standard deviations out, so a very small <Katex tex="p" />-value is expected — the report notes <Katex tex="0.009" /> appearing from a transcription slip.</>,
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
    working: <Katex display tex="\boxed{\text{The sample supports an increase in the mean pollutant level.}}" />,
    reason: <>Answer the question in words as well. The report says students who stopped at "reject <Katex tex="H_0" />" without an explicit conclusion lost the mark.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X>\bar x_c \mid \mu=1.1\right) = 0.05" />,
    reason: <>The boundary of the rejection region: any sample mean above it leads to rejection at the <Katex tex="5\%" /> level.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.95, 1.1, 0.032)</Cas>,
    reason: <>Inverse normal on the <em>left</em> tail, so use <Katex tex="0.95" /> rather than <Katex tex="0.05" />.</>,
  },
  {
    working: <Katex display tex="\bar x_c = 1.1+1.6449\times0.032" />,
    reason: <>Equivalently, standardise: <Katex tex="z=1.6449" /> for a one-sided <Katex tex="5\%" /> test.</>,
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
    working: <Katex display tex="= \Pr(Z<-1.156)" />,
    reason: <>Negative, since <Katex tex="1.163" /> is now below the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.124}" />,
    reason: <>Three decimal places. This is a <em>Type II error</em> probability: the chance of failing to detect a real increase — about one test in eight would miss it.</>,
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
        marks={2}
        statement={
          <>
            Let the random variable <Katex tex="\bar X" /> represent the mean level of
            pollutant in the measurements from a random sample of <Katex tex="25" /> sites
            along the river. Write down the mean and standard deviation of{' '}
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
            The <Katex tex="p" />-value is then the probability, <em>assuming</em>{' '}
            <Katex tex="H_0" />, of a sample mean at least as extreme as the one observed —
            extreme in the direction <Katex tex="H_1" /> points. Small <Katex tex="p" />{' '}
            means the data would be surprising if <Katex tex="H_0" /> were true, so{' '}
            <Katex tex="H_0" /> goes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
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

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Suppose that for a level of significance of <Katex tex="2.5\%" />, we find that{' '}
          <Katex tex="\bar x_c=1.163" />. That is,{' '}
          <Katex tex="\Pr\!\left(\bar X>1.163 \mid \mu=1.1\right)=0.025" />.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
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
            hypothesis. The only change to the calculation is which mean you standardise
            about.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
