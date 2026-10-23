// 2023 Specialist NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with no
// statistics. Calculus: substitution u = sin(x) in ∫₀^{π/2} cos³(x)sin²(x) dx — keep one cos(x)
// for du, write cos²(x) = 1 − u², and change the terminals. Question text transcribed from the
// original paper. Solution is original; the answer C agrees with the report's key (sympy: the
// original integral and option C both equal 2/15; option A gives −2/15, option D −1/12).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos^3(x)\sin^2(x)=\sin^2(x)\cos^2(x)\cdot\cos(x)" />,
    reason: <>The power of cosine is odd, so set one <Katex tex="\cos(x)" /> aside to go with <Katex tex="dx" />. That suggests <Katex tex="u=\sin(x)" />, whose derivative is exactly that <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="u=\sin(x),\quad \frac{du}{dx}=\cos(x)" />,
  },
  {
    working: <Katex display tex="\cos^2(x)=1-\sin^2(x)=1-u^2" />,
    reason: <>Use the Pythagorean identity to write the remaining cosines in terms of <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=0&\Rightarrow u=\sin 0=0\\ x=\tfrac{\pi}{2}&\Rightarrow u=\sin\tfrac{\pi}{2}=1\end{aligned}" />,
    reason: <>A definite integral in <Katex tex="u" /> needs terminals in <Katex tex="u" />, not the original <Katex tex="x" /> values.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_0^{\frac{\pi}{2}}\sin^2(x)\left(1-\sin^2(x)\right)\cos(x)\,dx\\ &\quad=\int_0^1 u^2(1-u^2)\,du\\ &\quad=\int_0^1\left(u^2-u^4\right)du\end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{\int_0^1\left(u^2-u^4\right)du,\ \ u=\sin(x)}" />,
    reason: <>Matches option <b>C</b>. Both integrals equal <Katex tex="\tfrac13-\tfrac15=\tfrac{2}{15}" />, which is positive, as it should be: the integrand is non-negative on <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />.</>,
    more: <>Option B has the right integrand but keeps the old terminals <Katex tex="0" /> and <Katex tex="\tfrac{\pi}{2}" />. Option A has the integrand&apos;s sign reversed, giving <Katex tex="-\tfrac{2}{15}" />. Options D and E use <Katex tex="u=\cos(x)" />, but then <Katex tex="du=-\sin(x)\,dx" /> needs an odd power of sine, and <Katex tex="\sin^2(x)" /> is even, so no polynomial in <Katex tex="u" /> results.</>,
  },
]

export default function SpecialistQ7_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The definite integral <Katex tex="\displaystyle\int_0^{\frac{\pi}{2}}\left(\cos^3(x)\sin^2(x)\right)dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\displaystyle\int_0^1\left(u^4-u^2\right)du" />, where <Katex tex="u=\sin(x)" /></> },
        { letter: 'B', content: <><Katex tex="\displaystyle\int_0^{\frac{\pi}{2}}\left(u^2-u^4\right)du" />, where <Katex tex="u=\sin(x)" /></> },
        { letter: 'C', content: <><Katex tex="\displaystyle\int_0^1\left(u^2-u^4\right)du" />, where <Katex tex="u=\sin(x)" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="\displaystyle\int_1^0\left(u^3-u^5\right)du" />, where <Katex tex="u=\cos(x)" /></> },
        { letter: 'E', content: <><Katex tex="\displaystyle\int_0^{\frac{\pi}{2}}\left(u^3-u^5\right)du" />, where <Katex tex="u=\cos(x)" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
