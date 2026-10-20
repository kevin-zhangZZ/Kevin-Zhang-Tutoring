// 2022 Specialist NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with no
// statistics. Calculus: the substitution x = e^u − e^(−u) in ∫₀^(3/2) √(4 + x²) dx — the integrand
// becomes a perfect square and the upper terminal log_e(2). Question text transcribed from the
// original paper. Solution is original; the answer E agrees with the report's key. sympy confirms
// 4 + x² = (e^u + e^(−u))², the terminal (e^u = 2, the root e^u = −1/2 rejected), and that both
// integrals equal 15/8 + 2log_e(2) ≈ 3.2613.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x=e^u-e^{-u}\implies \frac{dx}{du}=e^u+e^{-u}" />,
    reason: <>Differentiate the substitution (the chain rule gives <Katex tex="\tfrac{d}{du}e^{-u}=-e^{-u}" />, so the minus becomes a plus).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}4+x^2&=4+e^{2u}-2+e^{-2u}\\ &=e^{2u}+2+e^{-2u}\\ &=\left(e^u+e^{-u}\right)^2\end{aligned}" />,
    reason: <>Expand <Katex tex="(e^u-e^{-u})^2" />: the middle term is <Katex tex="-2e^ue^{-u}=-2" />. Adding <Katex tex="4" /> turns <Katex tex="-2" /> into <Katex tex="+2" />, which is the middle term of <Katex tex="(e^u+e^{-u})^2" />.</>,
    more: <>This is why the substitution was chosen: it turns the square root into something you can take exactly.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sqrt{4+x^2}\,dx&=\left(e^u+e^{-u}\right)\left(e^u+e^{-u}\right)du\\ &=\left(e^{2u}+2+e^{-2u}\right)du\end{aligned}" />,
    reason: <><Katex tex="e^u+e^{-u}>0" />, so the square root is <Katex tex="e^u+e^{-u}" /> with no <Katex tex="\pm" />. Multiply by <Katex tex="\tfrac{dx}{du}" /> for the <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0:\ \ &e^u-e^{-u}=0\\ \implies &e^{2u}=1\implies u=0\end{aligned}" />,
    reason: <>The terminals must become <Katex tex="u" />-values. Multiply by <Katex tex="e^u" /> to clear the negative power.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=\tfrac32:\ \ &e^u-e^{-u}=\tfrac32\\ \implies &2e^{2u}-3e^u-2=0\\ \implies &(2e^u+1)(e^u-2)=0\\ \implies &e^u=2\ \ (e^u\ne-\tfrac12)\\ \implies &u=\log_e(2)\end{aligned}" />,
    reason: <>Multiply by <Katex tex="2e^u" /> to get a quadratic in <Katex tex="e^u" />, then factorise. Reject <Katex tex="e^u=-\tfrac12" />: an exponential is never negative.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{\log_e 2}e^{2u}+2+e^{-2u}\,du}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Check: both integrals equal <Katex tex="\tfrac{15}{8}+2\log_e(2)\approx3.26" />, by hand from{' '}
        <Katex tex="\left[\tfrac12e^{2u}+2u-\tfrac12e^{-2u}\right]_0^{\log_e 2}" />, or with{' '}
        <Cas fn="nInt">nInt(√(4+x²), x, 0, 3/2)</Cas>. Option C comes from dropping the middle term when squaring,{' '}
        <Katex tex="(e^u-e^{-u})^2\ne e^{2u}+e^{-2u}" />, which leaves <Katex tex="\sqrt{e^{2u}+e^{-2u}+4}" /> unsimplified.
        Option D keeps the <Katex tex="x" />-terminal <Katex tex="\tfrac32" />. Option A&apos;s integrand is{' '}
        <Katex tex="(e^u-e^{-u})(e^u+e^{-u})=x\tfrac{dx}{du}" />, as if <Katex tex="\sqrt{4+x^2}" /> were just <Katex tex="x" />.
      </>
    ),
  },
]

export default function SpecialistQ10_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="x=e^u-e^{-u}" />,{' '}
          <Katex tex="\displaystyle\int_0^{\frac32}\sqrt{4+x^2}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\log_e 2}e^{2u}-e^{-2u}\,du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{\log_e\frac12}e^{2u}+e^{-2u}\,du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{\log_e 2}\left(e^u+e^{-u}\right)\sqrt{e^{2u}+e^{-2u}+4}\,du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\frac32}e^u+2+e^{-u}\,du" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{\log_e 2}e^{2u}+2+e^{-2u}\,du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
