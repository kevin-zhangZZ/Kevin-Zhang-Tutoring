// 2016 Specialist Mathematics — Exam 1, Question 2 (3 marks). A 95% confidence interval
// for a mean, with an integer multiple of the standard deviation. Question text
// transcribed from the original paper (no diagram given). Answer checked against the VCAA
// examination report. Solution is original. No lettered parts, so this uses the plain card
// layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [21, 42, 20, 17],
  average: 1.4,
  comment: (
    <>
      This question was not answered well. A large proportion of students were unable to
      find the mean mass, dividing <Katex tex="2625" /> by <Katex tex="25" /> and giving{' '}
      <Katex tex="15" /> instead of <Katex tex="105" />. Many students seemed to
      misunderstand the question wording, "integer multiple of the standard deviation",
      using <Katex tex="\pm1.96" /> instead of <Katex tex="\pm2" />. Some took the standard
      deviation to be <Katex tex="4" /> rather than <Katex tex="\tfrac45" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = \frac{2625}{25} = 105 \text{ g}" />,
    reason: <>The sample mean. A quick sanity check stops the report's most common error: a peach weighing <Katex tex="15" /> g would be the size of a grape.</>,
  },
  {
    working: <Katex display tex="\sigma = \sqrt{16} = 4, \qquad n = 25" />,
    reason: <>The variance is given, not the standard deviation.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{\sigma}{\sqrt n} = \frac{4}{5}" />,
    reason: <>The interval is for the <em>mean</em>, so the standard deviation shrinks by <Katex tex="\sqrt{25}=5" />. Using <Katex tex="4" /> here is the other flagged error.</>,
  },
  {
    working: <Katex display tex="95\% \implies z \approx 2" />,
    reason: <>"An integer multiple of the standard deviation" is the instruction to use the <Katex tex="68" />–<Katex tex="95" />–<Katex tex="99.7" /> rule rather than <Katex tex="1.96" /> — this is the no-technology paper.</>,
  },
  {
    working: <Katex display tex="105 \pm 2\times\frac45 = 105\pm1.6" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(103.4,\ 106.6)}" />,
    reason: <>Equivalently <Katex tex="\left(\tfrac{517}{5},\tfrac{533}{5}\right)" />. A narrow interval, as it should be: <Katex tex="25" /> peaches and a small population spread.</>,
  },
]

export default function SpecialistQ2_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (3 marks)">
        <p>
          A farmer grows peaches, which are sold at a local market. The mass, in grams, of
          peaches produced on this farm is known to be normally distributed with a variance
          of <Katex tex="16" />. A bag of <Katex tex="25" /> peaches is found to have a total
          mass of <Katex tex="2625" /> g.
        </p>
        <p>
          Based on this sample of <Katex tex="25" /> peaches, calculate an approximate{' '}
          <Katex tex="95\%" /> confidence interval for the mean mass of all peaches produced
          on this farm. Use an integer multiple of the standard deviation in your
          calculations.
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
