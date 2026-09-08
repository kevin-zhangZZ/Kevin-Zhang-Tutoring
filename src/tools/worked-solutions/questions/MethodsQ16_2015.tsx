// 2015 Mathematical Methods — Exam 2, MCQ 16.
// f(x) = ax^m, g(x) = bx^n; f'(x) is an antiderivative of g(x) — what must be true?
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = am(m-1)\,x^{m-2}" />,
    reason: (
      <>
        "<Katex tex="f'(x)" /> is an antiderivative of <Katex tex="g(x)" />" means the derivative of{' '}
        <Katex tex="f'(x)" /> gives back <Katex tex="g(x)" />, i.e. <Katex tex="f''(x)=g(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="am(m-1)\,x^{m-2} = bx^n" />,
  },
  {
    working: <Katex display tex="m-2=n \;\implies\; m=n+2" />,
    reason: 'Match the powers of x on each side.',
  },
  {
    working: <Katex display tex="b = am(m-1)" />,
    reason: 'Match the coefficients.',
  },
  {
    working: <Katex display tex="\boxed{\dfrac{b}{a} = m(m-1)}" />,
    reason: (
      <>
        A product of two consecutive positive integers (<Katex tex="m \ge 2" />) — always an integer. So{' '}
        <Katex tex="b/a" /> is an integer: <b>D</b>.
      </>
    ),
  },
]

export default function MethodsQ16_2015() {
  return (
    <MCQShell
      question={
        <>
          <p>
            Let <Katex tex="f(x) = ax^m" /> and <Katex tex="g(x) = bx^n" />, where <Katex tex="a, b, m" /> and{' '}
            <Katex tex="n" /> are positive integers. The domain of <Katex tex="f" /> = domain of{' '}
            <Katex tex="g" /> = <Katex tex="\mathbb{R}" />.
          </p>
          <p className="mt-2">
            If <Katex tex="f'(x)" /> is an antiderivative of <Katex tex="g(x)" />, then which one of the
            following must be true?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac{m}{n}" /> is an integer</> },
        { letter: 'B', content: <><Katex tex="\dfrac{n}{m}" /> is an integer</> },
        { letter: 'C', content: <><Katex tex="\dfrac{a}{b}" /> is an integer</> },
        { letter: 'D', content: <><Katex tex="\dfrac{b}{a}" /> is an integer</>, isAnswer: true },
        { letter: 'E', content: <Katex tex="n-m=2" /> },
      ]}
      rows={ROWS}
    />
  )
}
