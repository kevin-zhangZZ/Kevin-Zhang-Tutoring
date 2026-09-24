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
    reason: <>Reading off the sample statistics.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(\bar X) = \frac{s}{\sqrt n} = \frac{16}{10} = 1.6" />,
    reason: <>The interval is for the <em>mean</em>, so divide by <Katex tex="\sqrt{100}" />. Using <Katex tex="16" /> directly gives option A, which is ten times too wide.</>,
  },
  {
    working: <Katex display tex="\bar x \pm 1.96\times1.6 = 210\pm3.136" />,
    reason: <><Katex tex="z=1.96" /> for <Katex tex="95\%" />. This is the technology paper, so the exact multiplier is expected rather than the <Katex tex="2" /> of the empirical rule.</>,
  },
  {
    working: <Katex display tex="\boxed{(206.9,\ 213.1)}" />,
    reason: <>Matches option <b>B</b>. Option D uses <Katex tex="z=3" />; option E is just one standard deviation either side, <Katex tex="210\pm16" />.</>,
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
