// 2022 Specialist NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with no
// statistics. Constant acceleration from a speed change in km/h, then net force = ma (kept with a
// Background note on the force wording, per KZ's study-design ruling). Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}100\ \mathrm{km\,h^{-1}} &= \frac{100\times1000}{3600}\ \mathrm{ms^{-1}}\\ &= \frac{250}{9}\ \mathrm{ms^{-1}}\end{aligned}" />,
    reason: <>Force in newtons needs SI units: metres, seconds, kilograms. A kilometre is 1000 m and an hour is 3600 s, so divide km/h by 3.6.</>,
    more: <>The units are the whole trap in this question: the time is already in seconds, but the speed is not. <Katex tex="\tfrac{250}{9}\approx27.8\ \mathrm{ms^{-1}}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}v&=u+at\\ \frac{250}{9} &= 0+12a\\ a &= \frac{250}{108} = \frac{125}{54}\ \mathrm{ms^{-2}}\end{aligned}" />,
    reason: <>Constant acceleration from rest (<Katex tex="u=0" />) to <Katex tex="v=\tfrac{250}{9}" /> in <Katex tex="t=12" /> seconds; the constant-acceleration formula linking <Katex tex="u" />, <Katex tex="v" />, <Katex tex="a" /> and <Katex tex="t" /> is on the formula sheet.</>,
  },
  {
    working: <Katex display tex="m = 2\ \text{tonnes} = 2000\ \mathrm{kg}" />,
  },
  {
    working: <Katex display tex="F_{\text{net}} = ma = 2000\times\frac{125}{54} = 4629.6\ldots\ \mathrm{N}" />,
    reason: <>The net force on an object is its mass times its acceleration (Newton&rsquo;s second law), with mass in kg and acceleration in <Katex tex="\mathrm{ms^{-2}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{F_{\text{net}}\approx4630\ \mathrm{N}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>C</b>, 16 670, uses 100 as if it were already in <Katex tex="\mathrm{ms^{-1}}" />: <Katex tex="2000\times\tfrac{100}{12}\approx16\,667" />. Option <b>E</b>, 55 560, is the mass times the final speed, <Katex tex="2000\times\tfrac{250}{9}" />, without dividing by the 12 seconds. Option <b>D</b>, 45 370, is the right answer multiplied by <Katex tex="g=9.8" />: there is no gravity in a horizontal net force. Plausibility: about <Katex tex="2.3\ \mathrm{ms^{-2}}" /> is a gentle, ordinary car&rsquo;s acceleration, so a few thousand newtons on a 2-tonne car is the right size.</>,
  },
]

export default function SpecialistQ15_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          A car of mass 2 tonnes accelerates from 0 to <Katex tex="100\ \mathrm{km\,h^{-1}}" /> in 12 seconds under
          constant acceleration along a straight horizontal path.
          <br />
          The magnitude of the net force, in newtons, that acts on the car is closest to
        </p>
      }
      background={
        <Background title="Force wording, kinematics mathematics">
          <p>
            Forces belong to Mechanics, which Specialist Mathematics no longer has. But the only
            physics used here is the one line &ldquo;net force = mass × acceleration&rdquo;, in the last
            step. Everything before it is constant-acceleration kinematics, which is current content:
            convert the units, then use <Katex tex="v=u+at" /> from the formula sheet.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="1700" /> },
        { letter: 'B', content: <Katex tex="4630" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="16\,670" /> },
        { letter: 'D', content: <Katex tex="45\,370" /> },
        { letter: 'E', content: <Katex tex="55\,560" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
