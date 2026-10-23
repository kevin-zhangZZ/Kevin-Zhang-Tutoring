// 2025 Specialist NHT — Exam 2, MCQ 12. The NHT report gives the answer key only, with no
// statistics. Kinematics: dv/dx given, so a = v dv/dx, then separate dv/dt = a(v) and use
// v(0) = 4. Question text transcribed from the original paper (read from the page image; the
// 2025 paper has no text layer). Solution is original; the answer C agrees with the report's key
// and with sympy (4 + v² = 20eᵗ gives v = 14 at t = log_e(10)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a=v\frac{dv}{dx}=v\cdot\frac{4+v^2}{2v^2}=\frac{4+v^2}{2v}" />,
    reason: <>The question asks about time, but <Katex tex="\tfrac{dv}{dx}" /> is a rate with respect to displacement. Convert it to the acceleration <Katex tex="\tfrac{dv}{dt}" /> with <Katex tex="a=v\tfrac{dv}{dx}" />, from the formula sheet.</>,
    more: <>The chain rule is behind it: <Katex tex="\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=\tfrac{dv}{dx}\cdot v" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dv}{dt}&=\frac{4+v^2}{2v}\\ \int\frac{2v}{4+v^2}\,dv&=\int1\,dt\end{aligned}" />,
    reason: <>A rate that depends only on <Katex tex="v" />: separate the variables.</>,
  },
  {
    working: <Katex display tex="\log_e(4+v^2)=t+c" />,
    reason: <>The top, <Katex tex="2v" />, is the derivative of the bottom, <Katex tex="4+v^2" />, so this is the <Katex tex="\tfrac{f'}{f}" /> form, which integrates to <Katex tex="\log_e|f|" />. No modulus is needed since <Katex tex="4+v^2>0" />.</>,
  },
  {
    working: <Katex display tex="t=0,\ v=4:\quad c=\log_e(20)" />,
    reason: <>The initial velocity fixes the constant: <Katex tex="\log_e(4+16)=0+c" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\log_e\!\left(\frac{4+v^2}{20}\right)&=t\\ 4+v^2&=20e^{t}\end{aligned}" />,
  },
  {
    working: <Katex display tex="\begin{aligned}t=\log_e(10):\quad 4+v^2&=20\times10=200\\ v^2&=196\end{aligned}" />,
    reason: <><Katex tex="e^{\log_e(10)}=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{v=14}" />,
    reason: <>Matches option <b>C</b>. Take the positive root: the object starts at <Katex tex="4" /> and its acceleration <Katex tex="\tfrac{4+v^2}{2v}" /> is positive while <Katex tex="v>0" />, so it only speeds up.</>,
    more: <>Option <b>D</b>, 196, stops at <Katex tex="v^2" />. Leaving out the constant (<Katex tex="\log_e(4+v^2)=t" />) gives <Katex tex="v^2=6" />: option <b>A</b>, <Katex tex="\sqrt6" />, or option <b>B</b>, 6, if the square root is also forgotten.</>,
  },
]

export default function SpecialistQ12_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          An object starts with an initial velocity of <Katex tex="4\ \mathrm{m\,s^{-1}}" /> at time <Katex tex="t=0" /> seconds
          and moves in a straight line from a fixed point <Katex tex="O" />.
          <br />
          At time <Katex tex="t" /> seconds its displacement is <Katex tex="x" /> metres from <Katex tex="O" /> and its velocity
          is <Katex tex="v\ \mathrm{m\,s^{-1}}" /> where <Katex tex="\dfrac{dv}{dx}=\dfrac{4+v^2}{2v^2}" />.
          <br />
          The object&apos;s velocity, in metres per second, at time <Katex tex="t=\log_e(10)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt6" /> },
        { letter: 'B', content: <Katex tex="6" /> },
        { letter: 'C', content: <Katex tex="14" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="196" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
