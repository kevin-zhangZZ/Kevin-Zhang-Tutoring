// 2023 Specialist NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with no
// statistics. Kinematics: acceleration from velocity as a function of position, a = d/dx(½v²), with
// F = ma fixing the mass. Question text transcribed from the original paper. Solution is original;
// the answer B agrees with the report's key, and sympy confirms a = 1/(2(1 + x²)), m = 6 and x = √2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v=\sqrt{\tan^{-1}(x)}\implies \tfrac12v^2=\tfrac12\tan^{-1}(x)" />,
    reason: <>Velocity is given as a function of position <Katex tex="x" />, not time, so use the form of acceleration that differentiates with respect to <Katex tex="x" />: <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. Squaring first removes the square root.</>,
  },
  {
    working: <Katex display tex="a=\frac{d}{dx}\!\left(\tfrac12\tan^{-1}(x)\right)=\frac{1}{2(1+x^2)}" />,
    reason: <>The derivative of <Katex tex="\tan^{-1}(x)" /> is <Katex tex="\tfrac{1}{1+x^2}" />.</>,
    more: <>The same result comes from <Katex tex="a=v\tfrac{dv}{dx}" />: <Katex tex="\sqrt{\tan^{-1}(x)}\cdot\tfrac{1}{2\sqrt{\tan^{-1}(x)}\,(1+x^2)}" />, and the square roots cancel.</>,
  },
  {
    working: <Katex display tex="F=ma=\frac{m}{2(1+x^2)}" />,
    reason: <>Newton&apos;s second law: the force is the mass times this acceleration. The mass is unknown, so use the given force at <Katex tex="x=1" /> to find it.</>,
  },
  {
    working: <Katex display tex="x=1:\ \frac{m}{2(2)}=1.5\implies m=6" />,
    reason: <>Substitute <Katex tex="x=1" /> (so <Katex tex="1+x^2=2" />) and <Katex tex="F=1.5" />, then multiply both sides by 4.</>,
  },
  {
    working: <Katex display tex="\frac{6}{2(1+x^2)}=1\implies 1+x^2=3\implies x^2=2" />,
    reason: <>Now set the force equal to 1 N and solve for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=\sqrt2\text{ m}}" />,
    reason: <>Matches option <b>B</b>. Reject <Katex tex="x=-\sqrt2" />: there <Katex tex="\tan^{-1}(x)<0" />, so <Katex tex="\sqrt{\tan^{-1}(x)}" /> is undefined.</>,
    more: <>Sanity check: the force falls from 1.5 N to 1 N as <Katex tex="x" /> grows, so the answer must be more than 1 m ✓. Option C, <Katex tex="\sqrt3" />, takes <Katex tex="x^2=3" /> straight from <Katex tex="1+x^2=3" />, forgetting to subtract the 1.</>,
  },
]

export default function SpecialistQ17_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          A particle of mass <Katex tex="m" /> kilograms moving in a horizontal straight line is acted on by a horizontal variable
          force.
          <br />
          The velocity of the particle when it is <Katex tex="x" /> metres from a fixed point, <Katex tex="O" />, is given by{' '}
          <Katex tex="\sqrt{\tan^{-1}(x)}\ \text{ms}^{-1}" />.
          <br />
          If the force acting on the particle is 1.5 N when it is 1 m from <Katex tex="O" /> then, when the force acting is 1 N, the
          distance of the particle from <Katex tex="O" /> would be
        </p>
      }
      options={[
        { letter: 'A', content: <>1 m</> },
        { letter: 'B', content: <><Katex tex="\sqrt2" /> m</>, isAnswer: true },
        { letter: 'C', content: <><Katex tex="\sqrt3" /> m</> },
        { letter: 'D', content: <>2 m</> },
        { letter: 'E', content: <>3 m</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
