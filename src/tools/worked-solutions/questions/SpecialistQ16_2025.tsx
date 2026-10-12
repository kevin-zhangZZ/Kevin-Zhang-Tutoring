// 2025 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 67% correct. This
// year's paper used four options (A–D) rather than five. Finding the constant that makes
// acceleration perpendicular to velocity at a given instant. Question text transcribed from
// the original paper. Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 12, C: 67, D: 15 },
  answer: 'C',
  comment: (
    <>
      This question may be completed manually or using CAS. Find the velocity and acceleration
      vectors through differentiation and then substitute <Katex tex="\dfrac{1}{2}" />. The dot
      product of these two vectors is 0 as they are perpendicular.
      <br />
      <Katex tex="\underset{\sim}{v}(t)=-2ne^{-2t}\underset{\sim}{i}-2t\underset{\sim}{j}" />
      <br />
      <Katex tex="\underset{\sim}{v}\left(\tfrac{1}{2}\right)=-2ne^{-1}\underset{\sim}{i}-\underset{\sim}{j}" />
      <br />
      <Katex tex="\underset{\sim}{a}(t)=4ne^{-2t}\underset{\sim}{i}-2\underset{\sim}{j}" />
      <br />
      <Katex tex="\underset{\sim}{a}\left(\tfrac{1}{2}\right)=4ne^{-1}\underset{\sim}{i}-2\underset{\sim}{j}" />
      <br />
      <Katex tex="-8n^2e^{-2}+2=0" />
      <br />
      <Katex tex="n^2=\dfrac{e^2}{4}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = -2ne^{-2t}\underset{\sim}{i}-2t\,\underset{\sim}{j}" />,
    reason: <>Velocity is <Katex tex="\underset{\sim}{\dot r}(t)" />: differentiate each component of <Katex tex="\underset{\sim}{r}(t)" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = 4ne^{-2t}\underset{\sim}{i}-2\underset{\sim}{j}" />,
    reason: <>Acceleration is <Katex tex="\underset{\sim}{\dot v}(t)" />: differentiate again.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{v}\cdot\underset{\sim}{a} &= (-2ne^{-2t})(4ne^{-2t})+(-2t)(-2) \\ &= -8n^2e^{-4t}+4t\end{aligned}" />,
    reason: <>Perpendicular vectors have zero dot product, so find <Katex tex="\underset{\sim}{v}\cdot\underset{\sim}{a}" />: multiply matching components and add.</>,
    more: <>Note <Katex tex="e^{-2t}\cdot e^{-2t}=e^{-4t}" /> (add the indices). Writing <Katex tex="e^{-2t}" /> here instead is the slip behind option <b>B</b>.</>,
  },
  {
    working: <Katex display tex="t = \tfrac{1}{2}: \quad -8n^2e^{-2}+2 = 0" />,
    reason: <>At <Katex tex="t=\tfrac12" />: <Katex tex="e^{-4t}=e^{-2}" /> and <Katex tex="4t=2" />. Set the dot product to 0.</>,
    more: <>The report substitutes <Katex tex="t=\tfrac12" /> first, <Katex tex="\underset{\sim}{v}\left(\tfrac12\right)=-2ne^{-1}\underset{\sim}{i}-\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{a}\left(\tfrac12\right)=4ne^{-1}\underset{\sim}{i}-2\underset{\sim}{j}" />, then takes the dot product. Same equation either way.</>,
  },
  {
    working: <Katex display tex="8n^2e^{-2} = 2 \implies n^2 = \frac{2e^2}{8} = \frac{e^2}{4}" />,
    reason: <>Move <Katex tex="8n^2e^{-2}" /> across, then multiply both sides by <Katex tex="e^2" /> and divide by 8.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{e}{2}}" />,
    reason: <>Take the positive root, since <Katex tex="n" /> is positive. Matches option <b>C</b> (about 1.359).</>,
    more: (
      <>
        Substituting each other option into <Katex tex="\underset{\sim}{v}\cdot\underset{\sim}{a}=-8n^2e^{-2}+2" /> at <Katex tex="t=\tfrac12" /> gives a non-zero result:
        <br />
        <b>A</b> (<Katex tex="2e" />, 5%) gives <Katex tex="-30" />.
        <br />
        <b>B</b> (<Katex tex="\tfrac{e^{0.5}}{2}" />, 12%) gives <Katex tex="2-2e^{-1}" />. It is what you get from <Katex tex="-8n^2e^{-1}+2=0" />, i.e. using <Katex tex="e^{-1}" /> instead of <Katex tex="e^{-2}" /> in the dot product.
        <br />
        <b>D</b> (<Katex tex="\tfrac{e}{2\sqrt2}" />, 15%) gives <Katex tex="1" />. It is what you get from <Katex tex="-8n^2e^{-2}+1=0" />, i.e. the <Katex tex="\underset{\sim}{j}" /> terms contributing 1 instead of 2 (for example taking the acceleration&rsquo;s <Katex tex="\underset{\sim}{j}" />-component as <Katex tex="-1" /> instead of <Katex tex="-2" />).
      </>
    ),
  },
]

export default function SpecialistQ16_2025() {
  return (
    <MCQShell
      question={
        <p>
          The position vector of a particle at time <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}(t) = ne^{-2t}\underset{\sim}{i}-t^2\underset{\sim}{j}" />,
          where <Katex tex="n" /> is a positive constant.
          <br />
          For what value of <Katex tex="n" /> is the particle&rsquo;s acceleration perpendicular to
          its velocity when <Katex tex="t = \dfrac{1}{2}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2e" /> },
        { letter: 'B', content: <Katex tex="\dfrac{e^{0.5}}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{e}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{e}{2\sqrt2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
