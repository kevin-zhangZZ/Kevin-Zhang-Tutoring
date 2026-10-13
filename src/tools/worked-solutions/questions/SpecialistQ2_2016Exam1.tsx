// 2016 Specialist Mathematics — Exam 1, Question 2 (3 marks). A 95% confidence interval
// for a mean, with an integer multiple of the standard deviation. Question text
// transcribed from the original paper (no diagram given). Answer checked against the VCAA
// examination report. Solution is original. No lettered parts, so this uses the plain card
// layout.
//
// Interactive (17% full marks): spec-2016e1-q2-mean-spread — the spread of one peach (sd 4)
// against the mean of n peaches (sd 4/√n), with the correct interval and the report's sd-4
// interval drawn as bars.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const MeanSpreadWidget = lazyWidget(() => import('../interactives/spec-2016e1-q2-mean-spread'))

const EXAM: SAExaminerStats = {
  marks: [21, 42, 20, 17],
  average: 1.4,
  comment: (
    <>
      This question was not answered well. A large proportion of students were unable to
      find the mean mass, dividing 2625 by 25 and giving 15 instead of 105. An estimation of
      the mean would have been helpful with this. A smaller number of students gave 150,
      while some used the total for the bag, 2625. Many students seemed to misunderstand the
      question wording, 'integer multiple of the standard deviation …', using{' '}
      <Katex tex="\pm1.96" /> instead of <Katex tex="\pm2" />. Some took the standard
      deviation to be four rather than <Katex tex="\tfrac45" />. Occasionally students used{' '}
      <Katex tex="\tfrac{16}{5}" />, while a small number rounded <Katex tex="\tfrac45" /> to
      1 (misinterpreting the 'integer multiple' phrase).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = \frac{2625}{25} = 105 \text{ g}" />,
    reason: <>The sample mean is the total mass over the number of peaches. Estimate first: <Katex tex="25\times100=2500" />, so it is just over <Katex tex="100" />.</>,
    more: <>The report's most common error was <Katex tex="15" /> instead of <Katex tex="105" />, and it notes that an estimate would have helped. Indeed, a <Katex tex="15" /> g peach would be the size of a grape. Others gave <Katex tex="150" />, or used the bag's total, <Katex tex="2625" />, as the mean. By hand: <Katex tex="\tfrac{2625}{25}=\tfrac{2500}{25}+\tfrac{125}{25}=100+5" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \sqrt{16} = 4, \qquad n = 25" />,
    reason: <>The question gives the variance, <Katex tex="\sigma^2=16" />; the standard deviation is its square root.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{\sigma}{\sqrt n} = \frac{4}{5}" />,
    reason: <>The interval is for the <em>mean</em> of <Katex tex="25" /> peaches, whose standard deviation is <Katex tex="\sigma" /> divided by <Katex tex="\sqrt n" />.</>,
    more: <>Averaging cancels heavy peaches against light ones, so <Katex tex="\bar X" /> varies far less than a single peach: <Katex tex="\bar X \sim \mathrm N\!\left(\mu, \tfrac{\sigma^2}{n}\right)" />. The report flags three errors at this step: using <Katex tex="4" />, using <Katex tex="\tfrac{16}{5}" />, and rounding <Katex tex="\tfrac45" /> to <Katex tex="1" />. The <Katex tex="4" /> is the spread of a single peach. The <Katex tex="\tfrac{16}{5}" /> mixes the two rules, dividing the variance by <Katex tex="\sqrt{25}" />: either divide <Katex tex="\sigma^2" /> by <Katex tex="n" /> (giving <Katex tex="\tfrac{16}{25}" />) or <Katex tex="\sigma" /> by <Katex tex="\sqrt n" /> (giving <Katex tex="\tfrac45" />). The 'integer multiple' is the multiplier <Katex tex="2" /> in the next row; the standard deviation stays <Katex tex="\tfrac45" />.</>,
  },
  {
    working: <Katex display tex="95\% \implies z \approx 2" />,
    reason: <>About <Katex tex="95\%" /> of a normal distribution lies within <Katex tex="2" /> standard deviations of its mean. The question asks for an integer multiple, so use <Katex tex="2" />, not <Katex tex="1.96" />.</>,
    more: <>The usual <Katex tex="95\%" /> value is <Katex tex="z\approx1.96" />, and the report says many students used it, seeming to misunderstand the wording. Since <Katex tex="\Pr(-2<Z<2)\approx0.9545" />, the interval with <Katex tex="2" /> is only <em>approximately</em> <Katex tex="95\%" />, which is why the question says "approximate". On this technology-free paper, <Katex tex="2" /> also keeps the arithmetic simple.</>,
  },
  {
    working: <Katex display tex="105 \pm 2\times\frac45 = 105\pm1.6" />,
    reason: <>The interval is <Katex tex="\bar x \pm 2\,\mathrm{sd}(\bar X)" />, so the margin of error is <Katex tex="2\times\tfrac45=1.6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(103.4,\ 106.6)}" />,
    reason: <>Equivalently <Katex tex="\left(\tfrac{517}{5},\tfrac{533}{5}\right)" />, in grams.</>,
    more: <>A check: the interval is narrow, as it should be for the mean of <Katex tex="25" /> peaches. Using <Katex tex="\sigma=4" /> instead gives <Katex tex="(97,\ 113)" />, which is roughly where <Katex tex="95\%" /> of <em>individual</em> peaches lie, not a range for the farm's mean.</>,
  },
]

export default function SpecialistQ2_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (3 marks)" always>
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
      <Explore title={<>One peach varies; the mean of <Katex tex="25" /> varies five times less</>}>
        <MeanSpreadWidget />
      </Explore>
      <ReportShelf stats={EXAM} maxMarks={3} />
    </div>
  )
}
