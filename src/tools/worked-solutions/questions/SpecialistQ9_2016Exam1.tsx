// 2016 Specialist Mathematics — Exam 1, Question 9 (3 marks). cos(x + y) from cos(x − y)
// and tan(x)tan(y). Question text transcribed from the original paper (no diagram given).
// Answer checked against the VCAA examination report. Solution is original. No lettered
// parts, so this uses the plain card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [15, 28, 13, 44],
  average: 1.9,
  comment: (
    <>
      This question was reasonably well answered, with most students using one or more
      trigonometric identities correctly. A large number of students had difficulty with the
      algebra but many persisted and answered correctly. Some used{' '}
      <Katex tex="\tan(x-y)" />, which was not always successful. Of great concern was the
      number of students who gave answers for sine or cosine that were either less than{' '}
      <Katex tex="-1" /> or greater than <Katex tex="1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x-y) = \cos(x)\cos(y)+\sin(x)\sin(y) = \frac35" />,
    reason: <>The compound-angle identity. Note the plus sign for <Katex tex="\cos" /> of a <em>difference</em>.</>,
  },
  {
    working: <Katex display tex="\tan(x)\tan(y) = \frac{\sin(x)\sin(y)}{\cos(x)\cos(y)} = 2" />,
    reason: <>Writing the tangents as sine over cosine turns the second condition into a relationship between exactly the two products that appear in the first.</>,
  },
  {
    working: <Katex display tex="\sin(x)\sin(y) = 2\cos(x)\cos(y)" />,
    reason: <>Cross-multiplying. Two equations, two unknown products — treat <Katex tex="\cos(x)\cos(y)" /> and <Katex tex="\sin(x)\sin(y)" /> as single quantities rather than trying to find <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\cos(x)\cos(y)+2\cos(x)\cos(y) = \frac35 \implies 3\cos(x)\cos(y) = \frac35" />,
    reason: <>Substituting into the first equation.</>,
  },
  {
    working: <Katex display tex="\cos(x)\cos(y) = \frac15, \qquad \sin(x)\sin(y) = \frac25" />,
    reason: <>The second follows from doubling the first.</>,
  },
  {
    working: <Katex display tex="\cos(x+y) = \cos(x)\cos(y)-\sin(x)\sin(y) = \frac15-\frac25" />,
    reason: <>The compound-angle identity again, this time with the minus sign.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos(x+y) = -\frac15}" />,
    reason: <>Between <Katex tex="-1" /> and <Katex tex="1" />, which the report says was not true of a worrying number of answers. Always check that at the end.</>,
  },
]

export default function SpecialistQ9_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 9 (3 marks)">
        <p>
          Given that <Katex tex="\cos(x-y)=\tfrac35" /> and{' '}
          <Katex tex="\tan(x)\tan(y)=2" />, find <Katex tex="\cos(x+y)" />.
        </p>
        <p>
          There is not enough information to find <Katex tex="x" /> and <Katex tex="y" />{' '}
          separately, and you do not need to. Both compound-angle identities are built from
          the same two products, <Katex tex="\cos(x)\cos(y)" /> and{' '}
          <Katex tex="\sin(x)\sin(y)" /> — so solve for those.
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
