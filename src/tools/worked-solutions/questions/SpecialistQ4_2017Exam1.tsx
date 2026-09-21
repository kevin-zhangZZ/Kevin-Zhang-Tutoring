// 2017 Specialist Mathematics — Exam 1, Question 4 (3 marks). Distribution of a sample
// mean of four bottles. 42% scored zero, almost all by using the population standard
// deviation instead of the standard deviation of the mean. Question text transcribed from
// the original paper (no diagram given). Answer checked with scipy and against the VCAA
// examination report. Solution is original. No lettered parts, so this uses the plain card
// layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [42, 9, 12, 37],
  average: 1.5,
  comment: (
    <>
      This question was answered well by students who found the standard deviation of the
      sample mean, but many used the standard deviation of the population. Students' notation
      was often not clear and did not distinguish between the standard deviation of{' '}
      <Katex tex="X" /> and the standard deviation of <Katex tex="\bar{X}" />. Other typical
      errors included not working with the mean, leading to finding{' '}
      <Katex tex="\Pr(X<295)" />; using the total volume and taking the standard deviation to
      be <Katex tex="12" /> rather than <Katex tex="6" />; and finding the probability that
      the mean was greater than <Katex tex="295" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(298,\,3^2), \qquad n=4" />,
    reason: <>One bottle. The question is about the <em>mean</em> of four, so this is not the distribution to use directly.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(\bar X)=298, \qquad \mathrm{sd}(\bar X)=\frac{\sigma}{\sqrt{n}}=\frac{3}{\sqrt4}=\frac32" />,
    reason: <>Averaging shrinks the spread by <Katex tex="\sqrt n" />, but leaves the centre alone. This single line is what 42% of students missed.</>,
  },
  {
    working: <Katex display tex="\Pr(\bar X<295) = \Pr\!\left(Z<\frac{295-298}{1.5}\right)" />,
    reason: <>Standardising with the standard deviation <em>of the mean</em>.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z<-2)" />,
    reason: <>Exactly two standard deviations below — which is the point of the numbers chosen.</>,
  },
  {
    working: <Katex display tex="\Pr(-2<Z<2)\approx 0.95 \implies \Pr(Z<-2)\approx\frac{1-0.95}{2}" />,
    reason: <>The 68–95–99.7 rule, since this is the no-technology paper. The two tails are equal by symmetry.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.025}" />,
    reason: <>VCAA accepted both <Katex tex="0.025" /> (from the <Katex tex="95\%" /> rule) and <Katex tex="0.023" /> (the exact value, <Katex tex="0.02275" />). A sanity check on direction: <Katex tex="295" /> is below the mean, so the answer must be well under <Katex tex="0.5" />.</>,
  },
]

export default function SpecialistQ4_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)">
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
        <p>
          <strong>The whole question in one idea.</strong> A sample mean is less variable than
          a single observation: <Katex tex="\mathrm{sd}(\bar X)=\tfrac{\sigma}{\sqrt n}" />.
          Reading "mean volume per bottle" as "volume of one bottle" costs every mark, and it
          is the single most common error on this question.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
