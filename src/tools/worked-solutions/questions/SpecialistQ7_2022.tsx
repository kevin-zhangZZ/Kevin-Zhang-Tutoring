// 2022 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 68% correct.
// Changing an integral to a new variable, terminals and all. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 23, C: 5, D: 68, E: 2 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 1+e^x \implies \frac{du}{dx} = e^x = u-1" />,
    reason: <>Write <Katex tex="e^x" /> in terms of <Katex tex="u" /> straight away (<Katex tex="e^x=u-1" />), so that after substituting no <Katex tex="x" /> is left anywhere.</>,
  },
  {
    working: <Katex display tex="dx = \frac{du}{u-1}" />,
    reason: <>Rearrange so the <Katex tex="dx" /> in the integral can be swapped for an expression in <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int\frac{1}{1+e^x}\,dx &= \int\frac{1}{u}\cdot\frac{du}{u-1}\\ &= \int\frac{1}{u(u-1)}\,du\end{aligned}" />,
    reason: <>Replace <Katex tex="1+e^x" /> by <Katex tex="u" /> and <Katex tex="dx" /> by <Katex tex="\tfrac{du}{u-1}" />. Every <Katex tex="x" /> is gone, so the substitution has worked.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{1}{u(u-1)} &= \frac{A}{u}+\frac{B}{u-1}\\ 1 &= A(u-1)+Bu\end{aligned}" />,
    reason: <>Every option splits the integrand into two simple fractions, so use partial fractions: one fraction for each linear factor of the denominator, then multiply both sides by <Katex tex="u(u-1)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&u=0: \ A=-1; \quad u=1: \ B=1\\ &\frac{1}{u(u-1)} = \frac{1}{u-1}-\frac{1}{u}\end{aligned}" />,
    reason: <><Katex tex="u=0" /> removes the <Katex tex="B" /> term and <Katex tex="u=1" /> removes the <Katex tex="A" /> term. Watch the order: <Katex tex="\tfrac{1}{u-1}" /> comes first, with the plus sign. <b>B</b> has the two fractions the other way round, which is the negative of the correct integrand. Quick check: for <Katex tex="2\le u\le3" />, <Katex tex="\tfrac{1}{u-1}>\tfrac1u" />, so the correct integrand is positive, as it must be since <Katex tex="\tfrac{1}{1+e^x}>0" />; B’s integrand is negative and would give a negative answer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0 &\implies u = 1+e^0 = 2\\ x=\log_e(2) &\implies u = 1+2 = 3\end{aligned}" />,
    reason: <>The new integral is in <Katex tex="u" />, so the terminals must change too: put each <Katex tex="x" />-terminal into <Katex tex="u=1+e^x" />. Leaving them as <Katex tex="0" /> and <Katex tex="\log_e(2)" /> gives <b>A</b>. <b>E</b>’s upper terminal <Katex tex="1+e^2" /> comes from putting <Katex tex="x=2" /> instead of <Katex tex="x=\log_e(2)" />. <b>C</b> has B’s sign error and a lower terminal of 1, which would need <Katex tex="e^x=0" />, impossible.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_2^3\left(\frac{1}{u-1}-\frac{1}{u}\right)du}" />,
    reason: <>Matches option <b>D</b>. As a check, its value is <Katex tex="\left[\log_e\left|\tfrac{u-1}{u}\right|\right]_2^3=\log_e\tfrac43" />, and <Cas fn="nInt">∫(1/(1+e^x), x, 0, ln(2))</Cas> gives the same value for the original integral.</>,
  },
]

export default function SpecialistQ7_2022() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u=1+e^x" />,{' '}
          <Katex tex="\displaystyle\int_0^{\log_e 2}\frac{1}{1+e^x}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\log_e 2}\left(\frac{1}{u-1}-\frac{1}{u}\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u}-\frac{1}{u-1}\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_1^3\left(\frac{1}{u}-\frac{1}{u-1}\right)du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u-1}-\frac{1}{u}\right)du" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_2^{1+e^2}\left(\frac{1}{u-1}-\frac{1}{u}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
