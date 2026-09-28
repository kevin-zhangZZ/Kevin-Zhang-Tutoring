// 2019 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 66% correct. Finding
// unknown coordinates from a midpoint in three dimensions. Question text transcribed from the
// original paper (no diagram). Solution is original. Interactive: spec-2019-mcq11-midpoint, three
// number lines where the unknown end is the known end reflected in the midpoint, with each option
// loadable. WrongMethod: stopping at the gap −5 − (−3) = −2 (options B and D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MidpointWidget = lazyWidget(() => import('../interactives/spec-2019-mcq11-midpoint'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 6, C: 13, D: 5, E: 66 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Midpoint of } MN" />
        <Katex display tex="= \left(\dfrac{x_M+x_N}{2},\ \dfrac{y_M+y_N}{2},\ \dfrac{z_M+z_N}{2}\right)" />
      </>
    ),
    reason: <>The midpoint is halfway from <Katex tex="M" /> to <Katex tex="N" /> in every direction at once, so each of its coordinates is the average of the matching coordinates, exactly as in two dimensions. Each coordinate only involves one unknown, so this gives three separate one-line equations.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{a+(-3)}{2} = -5" />
        <Katex display tex="a-3=-10 \implies a=-7" />
      </>
    ),
    reason: <>The <Katex tex="x" />-coordinates. Multiply by <Katex tex="2" /> first, then solve. As a check, <Katex tex="M" /> is <Katex tex="2" /> to the left of the midpoint and <Katex tex="N" /> is <Katex tex="2" /> to the right: <Katex tex="M" /> is <Katex tex="N" /> reflected in the midpoint, so <Katex tex="a = 2(-5)-(-3)" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{1+b}{2} = \dfrac32 \implies 1+b=3 \implies b=2" />,
    reason: <>The <Katex tex="y" />-coordinates, in the same way.</>,
  },
  {
    working: <Katex display tex="\dfrac{-2+(-1)}{2} = c \implies c = -\dfrac32" />,
    reason: <>Here both <Katex tex="z" />-coordinates are known and it is the midpoint that is unknown — so this one is a direct evaluation rather than an equation to solve.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-7,\quad b=2,\quad c=-\dfrac32}" />,
    reason: <>Matches option <b>E</b>. Option <b>C</b> has the right <Katex tex="a" /> and <Katex tex="c" /> but <Katex tex="b=-2" />. Option <b>A</b>'s <Katex tex="a=-13" /> and <Katex tex="c=-\tfrac12" /> come from subtracting <Katex tex="N" />'s coordinates instead of adding them. Options <b>B</b> and <b>D</b> leave out the factor of <Katex tex="2" /> (for example <Katex tex="-5-(-3)=-2" /> for <Katex tex="a" />, and <Katex tex="-2+(-1)=-3" /> for <Katex tex="c" />).</>,
  },
]

export default function SpecialistQ11_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let point <Katex tex="M" /> have coordinates <Katex tex="(a,1,-2)" /> and let point{' '}
          <Katex tex="N" /> have coordinates <Katex tex="(-3,b,-1)" />. If the coordinates of the
          midpoint of <Katex tex="MN" /> are <Katex tex="\left(-5,\tfrac32,c\right)" /> and{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are real constants, then the
          values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-13,\ 2 \text{ and } -\tfrac12" /> },
        { letter: 'B', content: <Katex tex="-2,\ \tfrac12 \text{ and } -3" /> },
        { letter: 'C', content: <Katex tex="-7,\ -2 \text{ and } -\tfrac32" /> },
        { letter: 'D', content: <Katex tex="-2,\ -\tfrac12 \text{ and } -3" /> },
        { letter: 'E', content: <Katex tex="-7,\ 2 \text{ and } -\tfrac32" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The unknown end is the known end reflected in the midpoint">
            <MidpointWidget />
          </Explore>
          <WrongMethod
            title="The midpoint is −5 and N is at −3, so a = −5 − (−3)"
            source="6% chose B, 5% chose D"
            working={<Katex display tex="a = -5-(-3) = -2" />}
          >
            That is only the gap from <Katex tex="N" /> to the midpoint. <Katex tex="M" /> is that same gap again on the
            other side of the midpoint, so <Katex tex="a = -5 - 2 = -7" />. Always check by putting the answer back in:
            the midpoint of <Katex tex="-2" /> and <Katex tex="-3" /> is <Katex tex="-2.5" />, not <Katex tex="-5" />.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
