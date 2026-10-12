// 2025 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 79% correct. This
// year's paper used four options (A–D) rather than five. Rewriting a trigonometric integral
// under the substitution u = cos(θ). Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 11, C: 6, D: 79 },
  answer: 'D',
  comment: (
    <>
      <Katex tex="u=\cos(\theta)\ \Rightarrow\ \dfrac{du}{d\theta}=-\sin(\theta)" />
      <br />
      <Katex tex="\theta=\dfrac{\pi}{2}\ \Rightarrow\ u=0" />
      <br />
      <Katex tex="\theta=0\ \Rightarrow\ u=1" />
      <br />
      <Katex tex="\dfrac{1}{2}\displaystyle\int_0^{\frac{\pi}{2}}\frac{\sin(2\theta)}{1+\cos(\theta)}\,d\theta=-\frac{1}{2}\int_1^0\frac{2u}{1+u}\,du" />
      <br />
      <Katex tex="=\displaystyle\int_0^1\frac{u}{1+u}\,du" />
      <br />
      <Katex tex="=\displaystyle\int_0^1 1-\frac{1}{1+u}\,du" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{2}\sin(2\theta) = \sin(\theta)\cos(\theta)" />,
    reason: <>The double-angle formula (the one-half cancels its 2), so that a factor of sin(θ) appears ready for the substitution.</>,
    more: (
      <>
        With <Katex tex="u=\cos(\theta)" />, <Katex tex="du" /> will be <Katex tex="-\sin(\theta)\,d\theta" />, so the
        aim is always to make a lone <Katex tex="\sin(\theta)\,d\theta" /> appear, with everything else written in terms
        of <Katex tex="\cos(\theta)" />. <Katex tex="\sin(2\theta)" /> on its own does not do that; its expansion does.
      </>
    ),
  },
  {
    working: <Katex display tex="I = \int_0^{\pi/2}\frac{\cos(\theta)}{1+\cos(\theta)}\sin(\theta)\,d\theta" />,
    reason: <>Call the given integral I. With ½ sin(2θ) replaced by sin(θ)cos(θ), everything except sin(θ) dθ is a function of cos(θ).</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}u &= \cos(\theta)\\ \frac{du}{d\theta} &= -\sin(\theta)\\ \sin(\theta)\,d\theta &= -du\end{aligned}"
      />
    ),
    reason: <>The substitution given in the question. Rearranged, it shows the sin(θ) dθ in the integrand is exactly −du.</>,
  },
  {
    working: <Katex display tex="\theta = 0 \implies u = 1, \qquad \theta = \frac{\pi}{2} \implies u = 0" />,
    reason: <>The terminals are θ-values, so convert them to u-values using u = cos(θ).</>,
    more: (
      <>
        Options <b>A</b> and <b>C</b> keep the old terminals 0 and <Katex tex="\tfrac{\pi}{2}" />, the classic slip
        with a definite-integral substitution. In option A they would even run <Katex tex="u" /> past 1, where{' '}
        <Katex tex="\tfrac{1-u}{1+u}" /> is negative and its square root is not real, so A cannot be right however
        the integrand was obtained.
      </>
    ),
  },
  {
    working: <Katex display tex="\int_1^{0}\frac{u}{1+u}\,(-du) = \int_0^{1}\frac{u}{1+u}\,du" />,
    reason: (
      <>
        Replace cos(θ) by u and sin(θ) dθ by −du. Swapping the terminals absorbs the minus sign, since{' '}
        <Katex tex="\int_1^0 f(u)\,du = -\int_0^1 f(u)\,du" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{u}{1+u} = \frac{(1+u)-1}{1+u} = 1-\frac{1}{1+u}" />,
    reason: <>Options B–D all have the form 1 ± 1/(1+u), so split the fraction: write the numerator as (1 + u) − 1.</>,
    more: (
      <>
        This is the same as dividing <Katex tex="u" /> by <Katex tex="1+u" />, needed whenever the numerator's degree is
        at least the denominator's. Check by recombining: <Katex tex="1-\tfrac{1}{1+u}=\tfrac{(1+u)-1}{1+u}=\tfrac{u}{1+u}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\int_0^{1}\left(1-\frac{1}{1+u}\right)du}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        A check: <Katex tex="\int_0^1\left(1-\tfrac{1}{1+u}\right)du = 1-\log_e(2)\approx0.307" />, the same value CAS
        gives for the original θ-integral. Option <b>B</b> (11%) has a plus sign: the recombining check fails, since{' '}
        <Katex tex="1+\tfrac{1}{1+u}=\tfrac{u+2}{1+u}" />. Option <b>C</b> (6%) has the right integrand but the old
        θ-terminals. Option <b>A</b> (4%) comes from writing <Katex tex="\sin(\theta)=\sqrt{1-u^2}" /> and then
        replacing <Katex tex="d\theta" /> by <Katex tex="du" />, forgetting that <Katex tex="du=-\sin(\theta)\,d\theta" />,
        as well as keeping the old terminals.
      </>
    ),
  },
]

export default function SpecialistQ7_2025() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u = \cos(\theta)" />,{' '}
          <Katex tex="\dfrac{1}{2}\displaystyle\int_0^{\frac{\pi}{2}}\dfrac{\sin(2\theta)}{1+\cos(\theta)}\,d\theta" />{' '}
          can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int_0^{\frac{\pi}{2}} u\sqrt{\frac{1-u}{1+u}}\,du" /> },
        { letter: 'B', content: <Katex tex="\int_0^{1}\left(1+\frac{1}{1+u}\right)du" /> },
        { letter: 'C', content: <Katex tex="\int_0^{\frac{\pi}{2}}\left(1-\frac{1}{1+u}\right)du" /> },
        { letter: 'D', content: <Katex tex="\int_0^{1}\left(1-\frac{1}{1+u}\right)du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
