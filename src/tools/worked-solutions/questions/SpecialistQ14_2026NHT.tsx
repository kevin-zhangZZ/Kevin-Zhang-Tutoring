// 2026 Specialist NHT — Exam 2, MCQ 14. The NHT report gives the answer key and a short comment
// only, with no statistics. Kinematics: acceleration given as a function of velocity, so use
// a = v dv/dx and integrate x = ∫ v/(2 + v) dv from 4 to 6. Question text transcribed from the
// original paper. Solution is original; the answer D agrees with the report's key. sympy gives
// 2 + log(9/16) = 2 + 2log(3/4) ≈ 1.425.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="a=v\dfrac{dv}{dx}" />
      <br />
      <Katex tex="x=\displaystyle\int_4^6\frac{v}{2+v}\,dv" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v\frac{dv}{dx}=2+v" />,
    reason: <>We are given <Katex tex="a" /> in terms of <Katex tex="v" /> and asked about <em>displacement</em>, so use the form of acceleration that involves <Katex tex="x" />: <Katex tex="a=v\tfrac{dv}{dx}" /> (on the formula sheet).</>,
    more: <><Katex tex="a=\tfrac{dv}{dt}" /> would give time, not displacement. Choose the form whose variables match what is given (<Katex tex="v" />) and what is asked for (<Katex tex="x" />).</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv}=\frac{v}{2+v}=1-\frac{2}{2+v}" />,
    reason: <>Flip both sides to get <Katex tex="x" /> as a function of <Katex tex="v" />, then divide so that the numerator&apos;s degree is lower than the denominator&apos;s: <Katex tex="v=(2+v)-2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x&=\int_4^6\left(1-\frac{2}{2+v}\right)dv\\ &=\Big[v-2\log_e(2+v)\Big]_4^6\\ &=\big(6-2\log_e(8)\big)-\big(4-2\log_e(6)\big)\end{aligned}" />,
    reason: <>At the origin (<Katex tex="x=0" />) the velocity is 4, so integrate from <Katex tex="v=4" /> to <Katex tex="v=6" />: the result is the displacement from the origin.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x&=2-2\log_e\!\left(\tfrac{8}{6}\right)\\ &=2-2\log_e\!\left(\tfrac{4}{3}\right)\\ &=2+2\log_e\!\left(\tfrac{3}{4}\right)\end{aligned}" />,
    reason: <>Combine the logs, then use <Katex tex="-\log_e\!\left(\tfrac{4}{3}\right)=\log_e\!\left(\tfrac{3}{4}\right)" /> to match the options&apos; form.</>,
  },
  {
    working: <Katex display tex="\boxed{2+2\log_e\!\left(\tfrac{3}{4}\right)}" />,
    reason: <>Matches option <b>D</b>. Check: this is about <Katex tex="1.42" /> m. Speeding up from 4 to 6 m/s at more than <Katex tex="6\ \mathrm{m\,s^{-2}}" /> takes about a third of a second, at roughly 5 m/s: about 1.4 m.</>,
    more: <>Option <b>B</b>, <Katex tex="6-2\log_e(4)" />, integrates from <Katex tex="v=0" /> instead of <Katex tex="v=4" />, ignoring that the particle already moves at 4 m/s at the origin. Option <b>C</b>, <Katex tex="2-2\log_e\!\left(\tfrac{3}{4}\right)" />, subtracts the log terms the wrong way round, <Katex tex="2-2\big(\log_e(6)-\log_e(8)\big)" />; it is greater than 2, which is impossible here because <Katex tex="\tfrac{v}{2+v}<1" /> means the displacement must be less than the change in speed, 2.</>,
  },
]

export default function SpecialistQ14_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          A particle moves in a straight line such that its acceleration, <Katex tex="a\ \mathrm{m\,s^{-2}}" />, is given
          by <Katex tex="a=2+v" />, where <Katex tex="v\ \mathrm{m\,s^{-1}}" /> is the velocity of the particle. At the
          origin, the velocity of the particle is <Katex tex="4\ \mathrm{m\,s^{-1}}" />.
          <br />
          When the velocity of the particle is <Katex tex="6\ \mathrm{m\,s^{-1}}" />, its displacement from the origin, in
          metres, will be
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="6+2\log_e(4)" /> },
        { letter: 'B', content: <Katex tex="6-2\log_e(4)" /> },
        { letter: 'C', content: <Katex tex="2-2\log_e\!\left(\dfrac{3}{4}\right)" /> },
        { letter: 'D', content: <Katex tex="2+2\log_e\!\left(\dfrac{3}{4}\right)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
