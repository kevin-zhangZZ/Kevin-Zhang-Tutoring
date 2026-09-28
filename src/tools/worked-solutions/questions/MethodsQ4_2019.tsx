// 2019 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 75% correct. A definite
// integral of a linear combination of sin and cos. Question text transcribed from the
// original paper (no diagram). Solution is original. Interactive (interactives/meth-2019-mcq4-pieces):
// the integral as a stacked area — a sin-piece worth (2 − √3)/2 ≈ 0.134 per unit of a and a
// cos-piece worth 1/2 per unit of b — with all five options evaluated at the chosen a and b, and a
// toggle for the ∫ sin x dx = cos x slip (option B). Every distractor was reproduced in sympy: B from
// ∫ sin x dx = cos x, A from ∫ cos x dx = −sin x, E from swapping sin and cos in the integrand, D from
// that swap plus the cos slip.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PiecesWidget = lazyWidget(() => import('../interactives/meth-2019-mcq4-pieces'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 8, C: 75, D: 7, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\int_0^{\pi/6}\bigl(a\sin(x)+b\cos(x)\bigr)dx" />
        <Katex display tex="= \Bigl[-a\cos(x)+b\sin(x)\Bigr]_0^{\pi/6}" />
      </>
    ),
    reason: (
      <>
        Antidifferentiate term by term; the constants <Katex tex="a" /> and <Katex tex="b" /> just ride along. The
        signs are the part to get right: <Katex tex="\sin" /> integrates to <Katex tex="-\cos" /> and{' '}
        <Katex tex="\cos" /> to <Katex tex="+\sin" />. If you&apos;re unsure, differentiate your answer:{' '}
        <Katex tex="\tfrac{d}{dx}\bigl(-a\cos x\bigr)=a\sin x" />, so it checks out.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left(-a\cos\tfrac{\pi}{6}+b\sin\tfrac{\pi}{6}\right) - \bigl(-a\cos0+b\sin0\bigr)" />,
    reason: (
      <>
        Upper terminal minus lower terminal. Don&apos;t drop the lower terminal just because it is <Katex tex="0" />:{' '}
        <Katex tex="\cos 0=1" />, so <Katex tex="-a\cos0=-a" />, and that is where the <Katex tex="2" /> in{' '}
        <Katex tex="2-\sqrt3" /> comes from.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left(-\dfrac{\sqrt3}{2}a+\dfrac12b\right) - \bigl(-a+0\bigr)" />,
    reason: (
      <>
        Exact values: <Katex tex="\cos\tfrac{\pi}{6}=\tfrac{\sqrt3}{2}" />, <Katex tex="\sin\tfrac{\pi}{6}=\tfrac12" />,{' '}
        <Katex tex="\cos0=1" />, <Katex tex="\sin0=0" />. The <Katex tex="\sqrt3" /> in every option tells you exact
        values are expected.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= a-\dfrac{\sqrt3}{2}a+\dfrac{b}{2}" />
        <Katex display tex="= \dfrac{2a-\sqrt3\,a+b}{2} = \dfrac{(2-\sqrt3)a+b}{2}" />
      </>
    ),
    reason: (
      <>
        Every option is written over <Katex tex="2" /> with a <Katex tex="(2-\sqrt3)" /> factor, so aim for that form:
        put everything over <Katex tex="2" />, then take <Katex tex="a" /> out of the first two terms. A CAS will do the
        integral, but its output usually isn&apos;t in the options&apos; form. You still have to rearrange, or test
        values such as <Katex tex="a=2,\ b=1" /> in your answer and in each option.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\dfrac{(2-\sqrt3)a+b}{2}}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>B</b> comes from <Katex tex="\int\sin x\,dx=\cos x" /> and <b>A</b> from{' '}
        <Katex tex="\int\cos x\,dx=-\sin x" />. Option <b>E</b> is the integral of <Katex tex="a\cos(x)+b\sin(x)" />, with
        sin and cos swapped, and <b>D</b> is that swap with the cos slip as well.
      </>
    ),
  },
]

export default function MethodsQ4_2019() {
  return (
    <MCQShell
      question={<p><Katex tex="\displaystyle\int_0^{\pi/6}\bigl(a\sin(x)+b\cos(x)\bigr)\,dx" /> is equal to</p>}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(2-\sqrt3)a-b}{2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{b-(2-\sqrt3)a}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{(2-\sqrt3)a+b}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{(2-\sqrt3)b-a}{2}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{(2-\sqrt3)b+a}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why a gets a small share and b gets a half">
            <PiecesWidget />
          </Explore>
          <WrongMethod
            title="Mix up which antiderivative gets the minus sign"
            source="8% chose B, 6% chose A"
            working={
              <>
                <Katex display tex="\text{With } \int\sin x\,dx=\cos x:" />
                <Katex display tex="\Bigl[a\cos x+b\sin x\Bigr]_0^{\pi/6}=\dfrac{b-(2-\sqrt3)a}{2}\ \ \text{(B)}" />
                <Katex display tex="\text{With } \int\cos x\,dx=-\sin x:" />
                <Katex display tex="\Bigl[-a\cos x-b\sin x\Bigr]_0^{\pi/6}=\dfrac{(2-\sqrt3)a-b}{2}\ \ \text{(A)}" />
              </>
            }
          >
            <p>
              Differentiating cycles <Katex tex="\sin\to\cos\to-\sin\to-\cos\to\sin" />, so antidifferentiating runs the
              cycle backwards: <Katex tex="\int\cos x\,dx=\sin x" /> and <Katex tex="\int\sin x\,dx=-\cos x" />. Two quick
              checks catch the slip. First, differentiate your antiderivative and see whether the integrand comes back.
              Second, look at signs: <Katex tex="\sin x" /> and <Katex tex="\cos x" /> are both positive on{' '}
              <Katex tex="\left[0,\tfrac{\pi}{6}\right]" />, so for positive <Katex tex="a" /> and <Katex tex="b" /> the
              integral is positive and grows with both. Only C and E have a positive coefficient on both, and the
              interactive above shows why the <Katex tex="a" /> share is the small one.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
