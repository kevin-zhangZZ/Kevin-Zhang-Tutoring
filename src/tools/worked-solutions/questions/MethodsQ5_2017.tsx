// 2017 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 47% correct.
// Recovering the sample proportion from a confidence interval. Question text transcribed
// from the original paper; solution is original. Widget: interactives/meth-2017-mcq5-midpoint
// (drag p-hat along the interval; the two arms balance only at 0.080, and 0.041 is the arm length).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MidpointWidget = lazyWidget(() => import('../interactives/meth-2017-mcq5-midpoint'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 47, B: 20, C: 9, D: 16, E: 7 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="95\%" /> confidence interval is <Katex tex="(0.039,0.121)" />. The sample
      proportion is in the middle of the confidence interval.{' '}
      <Katex tex="0.039+\tfrac{0.121-0.039}{2}=0.080" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\left(\hat p - E,\ \hat p + E\right)," />
        <Katex display tex="E = z\sqrt{\tfrac{\hat p(1-\hat p)}{n}}" />
      </>
    ),
    reason: (
      <>
        You are given only the finished interval, so ask how an interval is built. From the formula sheet it runs
        from <Katex tex="\hat p" /> minus a margin of error <Katex tex="E" /> to <Katex tex="\hat p" /> plus the{' '}
        <em>same</em> <Katex tex="E" />. Equal steps either side means <Katex tex="\hat p" /> sits exactly in the
        middle.
      </>
    ),
  },
  {
    working: <Katex display tex="\hat p = \frac{0.039+0.121}{2}" />,
    reason: (
      <>
        The middle of an interval is the average of its endpoints. Adding the two ends, the <Katex tex="-E" /> and{' '}
        <Katex tex="+E" /> cancel and leave <Katex tex="2\hat p" />. The <Katex tex="95\%" /> and the sample size
        only decide how wide the interval is, not where its centre is, so neither is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{0.160}{2}" />,
    reason: <>Adding the endpoints.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.080}" />,
    reason: (
      <>
        Matches option <b>A</b>. Check that the steps match: <Katex tex="0.080-0.039=0.041" /> and{' '}
        <Katex tex="0.121-0.080=0.041" />. That <Katex tex="0.041" />, half the width, is the margin of error{' '}
        <Katex tex="E" />, a distance rather than a position. Stopping at <Katex tex="0.041" /> gives option B.
      </>
    ),
  },
]

export default function MethodsQ5_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The <Katex tex="95\%" /> confidence interval for the proportion of ferry tickets
            that are cancelled on the intended departure day is calculated from a large
            sample to be <Katex tex="(0.039,\,0.121)" />.
          </p>
          <p>The sample proportion from which this interval was constructed is</p>
        </>
      }
      background={
        <p>
          A confidence interval is always symmetric about the sample statistic it was built
          from — the same margin of error goes out in both directions. So the sample
          proportion is the midpoint, and you can recover it from the endpoints alone.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.080" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.041" /> },
        { letter: 'C', content: <Katex tex="0.100" /> },
        { letter: 'D', content: <Katex tex="0.062" /> },
        { letter: 'E', content: <Katex tex="0.059" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the sample proportion has to be the midpoint">
            <MidpointWidget />
          </Explore>
          <WrongMethod
            title="Half the width of the interval is the sample proportion"
            source="20% chose B"
            working={<Katex display tex="\frac{0.121-0.039}{2} = 0.041" />}
          >
            Half the width is the margin of error <Katex tex="E" />: how far <Katex tex="\hat p" /> is from each
            end, not where <Katex tex="\hat p" /> is. The examiners&apos; working computes this same{' '}
            <Katex tex="0.041" /> and then adds it to the lower end, <Katex tex="0.039+0.041=0.080" />. A quick
            check catches the slip: <Katex tex="0.041" /> is only <Katex tex="0.002" /> above the lower end{' '}
            <Katex tex="0.039" />, nowhere near the centre of the interval. Averaging the endpoints (add, then
            halve) gives the centre; subtracting them gives the width.
          </WrongMethod>
        </>
      }
    />
  )
}
