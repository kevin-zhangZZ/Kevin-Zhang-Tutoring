// 2017 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 75% correct.
// A locus |z − 2 + i| = |z − 4| is a perpendicular bisector; find a point on it. Question
// text transcribed from the original paper; solution is original.
// Widget: interactives/spec-2017-mcq5-bisector (drag z and compare its distances to 2 − i and 4; a
// toggle shows the sign slip z − (2 + i), whose bisector passes through D). WrongMethod: that slip (10% D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BisectorWidget = lazyWidget(() => import('../interactives/spec-2017-mcq5-bisector'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 75, B: 6, C: 5, D: 10, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(2-i)| = |z-4|" />,
    reason: <>Write the left side as <Katex tex="z" /> minus a point. Taking out the bracket flips the sign, so the fixed point is <Katex tex="2-i" />, not <Katex tex="2+i" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{locus: perpendicular bisector}" />
        <Katex display tex="\text{of } (2,-1) \text{ and } (4,0)" />
      </>
    ),
    reason: <><Katex tex="z" /> is equally far from <Katex tex="2-i" /> and <Katex tex="4" />. Points equidistant from two fixed points form the perpendicular bisector of the segment joining them.</>,
  },
  {
    working: <Katex display tex="\text{midpoint} = \left(\frac{2+4}{2},\ \frac{-1+0}{2}\right) = \left(3,-\frac12\right)" />,
    reason: <>The midpoint is the same distance from both ends, so it always lies on the bisector. Here it is option A, so no line equation is needed at all.</>,
  },
  {
    working: <Katex display tex="\text{full line: } y = -2x+\frac{11}{2}" />,
    reason: <>Only needed if the midpoint weren't an option: the segment's gradient is <Katex tex="\tfrac12" />, so the bisector has gradient <Katex tex="-2" /> through <Katex tex="\left(3,-\tfrac12\right)" />.</>,
    more: <>None of the other options satisfies it: at <Katex tex="x=-3" /> the line gives <Katex tex="y=\tfrac{23}{2}" /> (not B or C), and at <Katex tex="x=3" /> it gives only <Katex tex="y=-\tfrac12" /> (not D or E).</>,
  },
  {
    working: <Katex display tex="\boxed{\left(3,-\tfrac12\right)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Direct check in the original equation: <Katex tex="\left|3-\tfrac12i-(2-i)\right| = \left|1+\tfrac12i\right| = \tfrac{\sqrt5}{2}" /> and <Katex tex="\left|3-\tfrac12i-4\right| = \left|-1-\tfrac12i\right| = \tfrac{\sqrt5}{2}" /> ✓.</>,
  },
]

export default function SpecialistQ5_2017() {
  return (
    <MCQShell
      question={
        <p>
          On an Argand diagram, a point that lies on the path defined by{' '}
          <Katex tex="|z-2+i|=|z-4|" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(3,-\tfrac12\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left(-3,-\tfrac12\right)" /> },
        { letter: 'C', content: <Katex tex="\left(-3,\tfrac32\right)" /> },
        { letter: 'D', content: <Katex tex="\left(3,\tfrac12\right)" /> },
        { letter: 'E', content: <Katex tex="\left(3,-\tfrac32\right)" /> },
      ]}
      background={
        <p>
          <Katex tex="|z-w|" /> is the distance between the points <Katex tex="z" /> and <Katex tex="w" /> on the
          Argand diagram. So an equation <Katex tex="|z-a|=|z-b|" /> says &ldquo;<Katex tex="z" /> is as far from{' '}
          <Katex tex="a" /> as from <Katex tex="b" />&rdquo;, and its path is the perpendicular bisector of the
          segment from <Katex tex="a" /> to <Katex tex="b" />.
        </p>
      }
      extras={
        <>
          <Explore title={'Every point on the path is equally far from 2 − i and 4'}>
            <BisectorWidget />
          </Explore>
          <WrongMethod
            title="|z − 2 + i| is the distance from 2 + i"
            source="10% chose D"
            working={
              <>
                <Katex display tex="|z-(2+i)|=|z-4|" />
                <Katex display tex="\text{midpoint of } (2,1) \text{ and } (4,0)" />
                <Katex display tex="= \left(3,\tfrac12\right)" />
              </>
            }
          >
            Taking out a bracket flips the sign inside it: <Katex tex="z-2+i = z-(2-i)" />, so the fixed point is{' '}
            <Katex tex="2-i=(2,-1)" />. Reading it as <Katex tex="2+i" /> puts the point on the wrong side of the
            real axis, and that bisector passes through D. To catch it, substitute your answer into the original:
            at D, <Katex tex="\left|1+\tfrac32i\right|=\tfrac{\sqrt{13}}{2}" /> but{' '}
            <Katex tex="\left|-1+\tfrac12i\right|=\tfrac{\sqrt5}{2}" />.
          </WrongMethod>
        </>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
