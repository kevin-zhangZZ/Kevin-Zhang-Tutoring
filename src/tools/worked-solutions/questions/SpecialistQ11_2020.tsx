// 2020 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 59% correct. A
// u = tan(x) substitution turning a trigonometric integral into partial fractions.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 16, C: 59, D: 19, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \tan(x) \implies du = \sec^2(x)\,dx" />,
    reason: <>The numerator is exactly <Katex tex="\sec^2(x)" />, which is the giveaway that this is the substitution intended.</>,
  },
  {
    working: <Katex display tex="\sec^2(x) = 1+\tan^2(x) = 1+u^2" />,
    reason: 'The Pythagorean identity converts the rest of the denominator.',
  },
  {
    working: <Katex display tex="\sec^2(x)-3\tan(x)+1 = \left(1+u^2\right)-3u+1 = u^2-3u+2" />,
    reason: 'A quadratic in u.',
  },
  {
    working: <Katex display tex="u^2-3u+2 = (u-1)(u-2)" />,
    reason: 'Factorising — which is what makes "linear denominators" possible.',
  },
  {
    working: <Katex display tex="x = \tfrac\pi4 \Rightarrow u = 1; \quad x = \tfrac\pi3 \Rightarrow u = \sqrt3" />,
    reason: <>Change the terminals too. Options A and E keep the old ones, or invent <Katex tex="\tfrac{1}{\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{(u-1)(u-2)} = \frac{A}{u-1}+\frac{B}{u-2}" />,
    reason: 'Partial fractions.',
  },
  {
    working: <Katex display tex="u=2: \ B=1; \quad u=1: \ -A=1 \implies A=-1" />,
    reason: 'The cover-up rule. The signs matter: the answer is a difference, and which term comes first is exactly what separates C from D.',
  },
  {
    working: <Katex display tex="\boxed{\int_1^{\sqrt3}\left(\frac{1}{u-2}-\frac{1}{u-1}\right)du}" />,
    reason: <>Matches option <b>C</b>. Option D is the same two fractions with the signs swapped.</>,
  },
]

export default function SpecialistQ11_2020() {
  return (
    <MCQShell
      question={
        <p>
          With a suitable substitution,{' '}
          <Katex tex="\displaystyle\int_{\pi/4}^{\pi/3}\frac{\sec^2(x)}{\sec^2(x)-3\tan(x)+1}\,dx" />{' '}
          can be expressed as
        </p>
      }
      background={
        <Background title="A note on this integral">
          <p>
            The transformation VCAA is testing is sound, and option C is right. Worth
            noticing all the same: at the lower terminal <Katex tex="x=\tfrac\pi4" /> the
            denominator <Katex tex="\sec^2(x)-3\tan(x)+1" /> is <Katex tex="2-3+1=0" />, so
            the integral as printed does not actually converge.
          </p>
          <p>
            That does not change the answer — the question asks only which expression the
            integral "can be expressed as", and every option is improper in the same way.
            But it is a good reminder that a zero denominator at a terminal is always worth
            a second of your attention.
          </p>
        </Background>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="\int_1^{1/\sqrt3}\left(\frac{1}{u-1}-\frac{1}{u-2}\right)du" />,
        },
        {
          letter: 'B',
          content: <Katex tex="\int_1^{\sqrt3}\left(\frac{1}{3(u-3)}-\frac{1}{3u}\right)du" />,
        },
        {
          letter: 'C',
          content: <Katex tex="\int_1^{\sqrt3}\left(\frac{1}{u-2}-\frac{1}{u-1}\right)du" />,
          isAnswer: true,
        },
        {
          letter: 'D',
          content: <Katex tex="\int_1^{\sqrt3}\left(\frac{1}{u-1}-\frac{1}{u-2}\right)du" />,
        },
        {
          letter: 'E',
          content: <Katex tex="\int_{\pi/4}^{\pi/3}\left(\frac{1}{3(u-1)}-\frac{1}{3(u+2)}\right)du" />,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
