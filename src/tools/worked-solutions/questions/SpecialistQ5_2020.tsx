// 2020 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 66% correct.
// Simplifying 4z·conj(z)/(z + conj(z))² into real and imaginary parts. Question text
// transcribed from the original paper. Solution is original.
// Checked (Sept 2026) against the VCAA report (A), itute (A) and two tutors' video walk-throughs
// (A, one by CAS option-testing): no disagreements. sympy confirms 4zz̄/(z + z̄)² = 1 + b²/a².
// Interactive diagram (§15): interactives/spec-2020-mcq5-triangle.tsx drags z on the Argand plane
// to show z + z̄ = 2a and zz̄ = |z|², so the expression is (|z|/a)² = sec²θ = 1 + tan²θ in the right
// triangle with sides a, b, |z|; it also evaluates the five options at the current z, flagging the
// points where a wrong option happens to agree (C whenever Re z = ±½). This site's own explanatory
// figure; VCAA printed no diagram. The WrongMethod box (no source: the report gives no comment on
// this question) is testing the options with z = 1 + i, where A and E both give 2 (checked in Python).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TriangleWidget = lazyWidget(() => import('../interactives/spec-2020-mcq5-triangle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 66, B: 4, C: 13, D: 9, E: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = a+bi \implies \bar z = a-bi" />,
    reason: (
      <>
        Every option is written in terms of <Katex tex="\operatorname{Re}(z)=a" /> and <Katex tex="\operatorname{Im}(z)=b" />, so
        write everything in <Katex tex="a" /> and <Katex tex="b" /> and simplify until it looks like one of them.
      </>
    ),
  },
  {
    working: <Katex display tex="z\bar z = (a+bi)(a-bi) = a^2-b^2i^2 = a^2+b^2" />,
    reason: (
      <>
        A difference of two squares, and <Katex tex="i^2=-1" /> turns the minus into a plus. Worth knowing by heart:{' '}
        <Katex tex="z\bar z=|z|^2" />, the square of the distance from <Katex tex="0" /> to <Katex tex="z" />, always real and never
        negative.
      </>
    ),
  },
  {
    working: <Katex display tex="z+\bar z = 2a \implies (z+\bar z)^2 = 4a^2" />,
    reason: (
      <>
        Adding a number to its conjugate cancels the imaginary parts: <Katex tex="z+\bar z=2\operatorname{Re}(z)" />, always real. On
        the Argand plane <Katex tex="z" /> and <Katex tex="\bar z" /> are mirror images in the real axis, so their sum lands on it. Note
        it is <em>squared</em>, so the 4 downstairs will cancel the 4 upstairs.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{4z\bar z}{(z+\bar z)^2} = \frac{4\left(a^2+b^2\right)}{4a^2} = \frac{a^2+b^2}{a^2}" />,
    reason: (
      <>
        The condition <Katex tex="a\in R\setminus\{0\}" /> is there precisely so this division is allowed: if <Katex tex="a=0" />,{' '}
        <Katex tex="z" /> is purely imaginary and <Katex tex="z+\bar z=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= 1+\frac{b^2}{a^2} = \boxed{1+\left(\frac{\operatorname{Im}(z)}{\operatorname{Re}(z)}\right)^2}" />,
    reason: (
      <>
        Split the fraction: <Katex tex="\tfrac{a^2}{a^2}=1" />. Matches option <b>A</b>. As a picture, the expression is{' '}
        <Katex tex="\bigl(\tfrac{|z|}{a}\bigr)^2" />: hypotenuse over adjacent, squared, in the right triangle with sides{' '}
        <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="|z|" />. That is <Katex tex="\sec^2\theta=1+\tan^2\theta" />, with{' '}
        <Katex tex="\tan\theta=\tfrac{b}{a}" />. Check with <Katex tex="z=1+2i" /> (not <Katex tex="1+i" />):{' '}
        <Katex tex="\tfrac{4\times5}{2^2}=5" /> and <Katex tex="1+2^2=5" /> ✓, while B, C, D and E give 8, 20, 40 and 4. Option <b>C</b>{' '}
        is <Katex tex="4z\bar z" />, the numerator on its own, without dividing by <Katex tex="(z+\bar z)^2" />.
      </>
    ),
    more: (
      <>
        See the diagram below for the triangle, and the common mistake below for why the check avoids{' '}
        <Katex tex="1+i" />.
      </>
    ),
  },
]

export default function SpecialistQ5_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given the complex number <Katex tex="z=a+bi" />, where{' '}
          <Katex tex="a\in R\setminus\{0\}" /> and <Katex tex="b\in R" />,{' '}
          <Katex tex="\dfrac{4z\bar z}{(z+\bar z)^2}" /> is equivalent to
        </p>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="1+\left(\frac{\operatorname{Im}(z)}{\operatorname{Re}(z)}\right)^2" />,
          isAnswer: true,
        },
        { letter: 'B', content: <Katex tex="4\left[\operatorname{Re}(z)\times\operatorname{Im}(z)\right]" /> },
        { letter: 'C', content: <Katex tex="4\left([\operatorname{Re}(z)]^2+[\operatorname{Im}(z)]^2\right)" /> },
        {
          letter: 'D',
          content: <Katex tex="4\left[1+(\operatorname{Re}(z)+\operatorname{Im}(z))^2\right]" />,
        },
        { letter: 'E', content: <Katex tex="\frac{2\times\operatorname{Im}(z)}{[\operatorname{Re}(z)]^2}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="4zz̄ ÷ (z + z̄)² is (hypotenuse ÷ adjacent)² in the triangle z makes with the real axis, which is 1 + tan²θ">
            <TriangleWidget />
          </Explore>
          <WrongMethod
            title="Test the options with an easy number, z = 1 + i"
            working={
              <>
                <Katex display tex="\frac{4z\bar z}{(z+\bar z)^2} = \frac{4\times2}{2^2} = 2" />
                <Katex display tex="\text{A: } 1+1^2 = 2 \qquad \text{E: } \frac{2\times1}{1^2} = 2" />
                <Katex display tex="\text{B: } 4 \qquad \text{C: } 8 \qquad \text{D: } 20" />
              </>
            }
          >
            <p>
              Substituting a number is a fair way to <i>rule options out</i>, but it can&apos;t prove that two expressions are equal. Here
              it removes B, C and D, yet A and E both survive, so if E is the one you tried, it looks right. With{' '}
              <Katex tex="\operatorname{Re}(z)=\operatorname{Im}(z)=1" />, every power of <Katex tex="a" /> and <Katex tex="b" /> is 1, so
              different rules collapse to the same number (drag z to <Katex tex="1+i" /> in the diagram and watch E light up).
            </p>
            <p>
              If you test, use a value whose real and imaginary parts are different and not 1, such as <Katex tex="z=1+2i" />: the
              expression is 5, A gives 5 and E gives 4. Better still, keep <Katex tex="a" /> and <Katex tex="b" /> as letters and
              simplify, as in the working.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
