// 2016 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 78% correct.
// A 95% confidence interval for a mean from a large sample. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 78, C: 9, D: 4, E: 2 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <Katex tex="\left(210-1.96\times\tfrac{16}{\sqrt{100}},\ 210+1.96\times\tfrac{16}{\sqrt{100}}\right)" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = 210, \qquad s = 16, \qquad n = 100" />,
    reason: <>Reading off the sample statistics. The question lets us use <Katex tex="s=16" /> in place of the unknown population standard deviation <Katex tex="\sigma" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{s}{\sqrt n} = \frac{16}{10} = 1.6" />,
    reason: <>The interval is for the <em>mean</em>, so use the standard deviation of the sample mean, <Katex tex="s/\sqrt n" />, not that of one banana.</>,
    more: <>Leaving out the <Katex tex="\sqrt{100}" /> gives <Katex tex="210\pm1.96\times16=210\pm31.36" />, roughly option A. That interval is ten times too wide: it describes where one banana's mass is likely to fall, not where the population mean lies.</>,
  },
  {
    working: <Katex display tex="\bar x \pm 1.96\times1.6 = 210\pm3.136" />,
    reason: <>For <Katex tex="95\%" /> confidence, <Katex tex="z=1.96" />: the central <Katex tex="95\%" /> of the standard normal lies between <Katex tex="-1.96" /> and <Katex tex="1.96" />.</>,
    more: <>The <Katex tex="1.96" /> comes from <Katex tex="\Pr(Z<z)=0.975" /> (<Katex tex="2.5\%" /> in each tail), e.g. invNorm(0.975, 0, 1) on CAS. The <Katex tex="2" /> of the 68–95–99.7 rule would give <Katex tex="210\pm3.2=(206.8,\ 213.2)" />, which is not an option; this is the technology paper, so the exact multiplier is expected.</>,
  },
  {
    working: <Katex display tex="\boxed{(206.9,\ 213.1)}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option D, <Katex tex="210\pm4.8" />, uses <Katex tex="z=3" /> in place of <Katex tex="1.96" />. Option E, <Katex tex="210\pm16" />, is one standard deviation of a single banana either side. Option A (approximately) forgets to divide by <Katex tex="\sqrt n" />, as in row 2. Option C, the most common wrong answer, treats <Katex tex="16" /> as the variance: <Katex tex="\sqrt{16}=4" />, <Katex tex="4/\sqrt{100}=0.4" />, <Katex tex="210\pm1.96\times0.4=(209.2,\ 210.8)" />. The question gives the standard deviation, <Katex tex="16" />, so no square root is taken.</>,
  },
]

export default function SpecialistQ19_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A random sample of <Katex tex="100" /> bananas from a given area has a mean mass
            of <Katex tex="210" /> grams and a standard deviation of <Katex tex="16" />{' '}
            grams. Assuming the standard deviation obtained from the sample is a
            sufficiently accurate estimate of the population standard deviation, an
            approximate <Katex tex="95\%" /> confidence interval for the mean mass of
            bananas produced in this locality is given by
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(178.7,\ 241.3)" /> },
        { letter: 'B', content: <Katex tex="(206.9,\ 213.1)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(209.2,\ 210.8)" /> },
        { letter: 'D', content: <Katex tex="(205.2,\ 214.8)" /> },
        { letter: 'E', content: <Katex tex="(194,\ 226)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
