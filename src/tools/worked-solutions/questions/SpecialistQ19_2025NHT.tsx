// 2025 Specialist NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with no
// statistics. Linear combination of independent random variables: E(W) gives a = 1 − 2b, then
// Var(W) = a² + 2b² = 6. Question text transcribed from the original paper (read from the page
// image; the 2025 paper has no text layer). Solution is original; the answer D agrees with the
// report's key and with sympy (expand((1 − 2b)² + 2b² − 6) = 6b² − 4b − 5).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}E(W)&=aE(X)+bE(Y)\\ 1&=a+2b\implies a=1-2b\end{aligned}" />,
    reason: <>Expected values combine linearly: <Katex tex="E(aX+bY)=aE(X)+bE(Y)" />, from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(W)&=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)\\ 6&=a^2(1)+b^2(2)\end{aligned}" />,
    reason: <>For <b>independent</b> <Katex tex="X" /> and <Katex tex="Y" />, <Katex tex="\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />. The coefficients are squared because variance is measured in squared units.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(1-2b)^2+2b^2&=6\\ 1-4b+4b^2+2b^2&=6\\ 6b^2-4b-5&=0\end{aligned}" />,
    reason: <>Substitute <Katex tex="a=1-2b" /> to leave one unknown, expand and collect.</>,
  },
  {
    working: <Katex display tex="\boxed{6b^2-4b-5=0}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>C</b>, <Katex tex="8b^2-4b-5=0" />, uses <Katex tex="b^2\times4" /> instead of <Katex tex="b^2\times2" />, treating <Katex tex="\operatorname{Var}(Y)=2" /> as the standard deviation and squaring it. Option <b>A</b>, multiplied by 4, is <Katex tex="8b^2-4b-35=0" />: that treats both 2 and 6 as standard deviations, <Katex tex="(1-2b)^2+4b^2=36" />. Option <b>B</b>, <Katex tex="18b^2-8b-5=0" />, comes from <Katex tex="a=1-4b" />, wrongly squaring the 2 in the mean equation: <Katex tex="(1-4b)^2+2b^2=6" />.</>,
  },
]

export default function SpecialistQ19_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="W" /> is a random variable such that <Katex tex="W=aX+bY" />, where <Katex tex="X" /> and{' '}
          <Katex tex="Y" /> are independent random variables and <Katex tex="a,b\in R" />.
          <br />
          Given that <Katex tex="\mathrm{E}(X)=1" />, <Katex tex="\operatorname{Var}(X)=1" />, <Katex tex="\mathrm{E}(Y)=2" />,{' '}
          <Katex tex="\operatorname{Var}(Y)=2" />, <Katex tex="E(W)=1" /> and <Katex tex="\operatorname{Var}(W)=6" />, then{' '}
          <Katex tex="b" /> satisfies
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2b^2-b-\dfrac{35}{4}=0" /> },
        { letter: 'B', content: <Katex tex="18b^2-8b-5=0" /> },
        { letter: 'C', content: <Katex tex="8b^2-4b-5=0" /> },
        { letter: 'D', content: <Katex tex="6b^2-4b-5=0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
