// 2025 Specialist NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with no
// statistics. Calculus: the substitution x = tan(θ) in a definite integral, then using the even
// integrand to halve the interval. Question text transcribed from the original paper (the 2025 NHT
// paper is image-only, so read from the rendered page). Solution is original; the answer B agrees
// with the report's key (sympy: both the original and option B equal 1/2 + π/4). Distractors
// checked: A (1/4 + π/8) halves the interval without doubling; D (1/2 + 3π/16) leaves out
// dx = sec²(θ) dθ.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x=\tan(\theta)\ &\Rightarrow\ \frac{dx}{d\theta}=\sec^2(\theta)\\ &\Rightarrow\ dx=\sec^2(\theta)\,d\theta\end{aligned}" />,
    reason: <>Every part of the integral must change to <Katex tex="\theta" />, including the <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="1+x^2=1+\tan^2(\theta)=\sec^2(\theta)" />,
    reason: <>The Pythagorean identity <Katex tex="1+\tan^2(\theta)=\sec^2(\theta)" /> is the reason this substitution suits <Katex tex="1+x^2" />.</>,
  },
  {
    working: <Katex display tex="x=-1\Rightarrow\theta=-\tfrac{\pi}{4},\qquad x=1\Rightarrow\theta=\tfrac{\pi}{4}" />,
    reason: <>Change the terminals too: <Katex tex="\tan(\theta)=\pm1" /> with <Katex tex="\theta" /> in <Katex tex="\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)" />.</>,
  },
  {
    working: <Katex display tex="\int_{-\frac{\pi}{4}}^{\frac{\pi}{4}}\frac{\sec^2(\theta)}{\sec^4(\theta)}\,d\theta=\int_{-\frac{\pi}{4}}^{\frac{\pi}{4}}\cos^2(\theta)\,d\theta" />,
    reason: <>The <Katex tex="\sec^2(\theta)" /> from <Katex tex="dx" /> cancels two of the four powers below, and <Katex tex="\tfrac{1}{\sec^2(\theta)}=\cos^2(\theta)" />.</>,
  },
  {
    working: <Katex display tex="=2\int_{0}^{\frac{\pi}{4}}\cos^2(\theta)\,d\theta" />,
    reason: <><Katex tex="\cos^2(\theta)" /> is even, so its graph is symmetric about <Katex tex="\theta=0" />: the area from <Katex tex="-\tfrac{\pi}{4}" /> to <Katex tex="0" /> equals the area from <Katex tex="0" /> to <Katex tex="\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{\frac{\pi}{4}}2\cos^2(\theta)\,d\theta}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Both the original integral and option B equal <Katex tex="\tfrac12+\tfrac{\pi}{4}" />. Option <b>A</b> is <Katex tex="\int_0^{\pi/4}\cos^2(\theta)\,d\theta" />, half the interval without the factor 2, so it is only half the answer. Option <b>D</b> forgets <Katex tex="dx=\sec^2(\theta)\,d\theta" /> and keeps all of <Katex tex="\tfrac{1}{\sec^4(\theta)}" />.</>,
  },
]

export default function SpecialistQ8_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="x=\tan(\theta)" />, then{' '}
          <Katex tex="\displaystyle\int_{-1}^{1}\frac{1}{(1+x^2)^2}\,dx" /> is equivalent to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\frac{\pi}{4}}\frac{1}{\sec^2(\theta)}\,d\theta" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{\frac{\pi}{4}}2\cos^2(\theta)\,d\theta" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\displaystyle\int_{-\frac{\pi}{4}}^{\frac{\pi}{4}}2\cos^4(\theta)\,d\theta" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_{-\frac{\pi}{4}}^{\frac{\pi}{4}}\frac{1}{\sec^4(\theta)}\,d\theta" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
