// 2017 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 62% correct, no written
// comment. Variance of a three-valued discrete random variable with parameter p. Question text
// transcribed from the original paper; answer D verified with sympy and agrees with itute.
// Solution is original.
// Interactive: meth-2017-mcq14-square-values (bars of the distribution; squaring the values moves
// the bar at −1 onto +1, so E(X²) = 1 − 2p; a slip toggle keeps (−1)² = −1 and the "variance"
// 4p − 16p² goes negative for p > 1/4).
// WrongMethod: forgetting (−1)² = +1 gives 4p − 16p², not an option. No source line: the report
// has no comment; a student on the ATAR Notes forum reported getting 4p − 16p² and guessing D.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquareWidget = lazyWidget(() => import('../interactives/meth-2017-mcq14-square-values'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 10, C: 9, D: 62, E: 4 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X)=(-1)p+0(2p)+1(1-3p)" />,
    reason: (
      <>
        Each value times its probability, added up. First check the probabilities add to{' '}
        <Katex tex="p+2p+1-3p=1" />, as they must.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{E}(X)=1-4p" />,
    reason: (
      <>
        Simplifying. This expression is option B, but it is the <em>mean</em>. The variance needs one more ingredient,{' '}
        <Katex tex="\mathrm{E}(X^2)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{E}(X^2)=(-1)^2p+0^2(2p)+1^2(1-3p)" />,
    reason: (
      <>
        Square the <em>values</em>, keep the probabilities: the <Katex tex="x^2" /> row of the table is{' '}
        <Katex tex="1,\ 0,\ 1" />. Squaring <Katex tex="-1" /> gives <Katex tex="+1" />, so the <Katex tex="p" /> is now
        added instead of subtracted. This is the step that makes <Katex tex="\mathrm{E}(X^2)" /> different from{' '}
        <Katex tex="\mathrm{E}(X)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{E}(X^2)=p+1-3p=1-2p" />,
    reason: (
      <>
        Simplifying. Sense check: <Katex tex="X^2=1" /> unless <Katex tex="X=0" />, so{' '}
        <Katex tex="\mathrm{E}(X^2)=\Pr(X\ne0)=1-2p" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \mathrm{Var}(X) &= \mathrm{E}(X^2)-\bigl(\mathrm{E}(X)\bigr)^2 \\ &= (1-2p)-(1-4p)^2 \end{aligned}"
      />
    ),
    reason: (
      <>
        The formula from the formula sheet. Keep <Katex tex="(1-4p)^2" /> in a bracket, because the minus sign in front
        applies to every term once it is expanded.
      </>
    ),
  },
  {
    working: <Katex display tex="=1-2p-\bigl(1-8p+16p^2\bigr)" />,
    reason: (
      <>
        Expanding the square: <Katex tex="(1-4p)^2=1-8p+16p^2" />, including the cross term <Katex tex="-8p" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{6p-16p^2}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option B, <Katex tex="1-4p" />, is <Katex tex="\mathrm{E}(X)" />, not the variance. If
        CAS shows <Katex tex="-2p(8p-3)" />, that is D in factorised form; expand it to match. Sanity check at{' '}
        <Katex tex="p=\tfrac14" />: the distribution is <Katex tex="\tfrac14,\tfrac12,\tfrac14" /> on{' '}
        <Katex tex="-1,0,1" />, variance <Katex tex="\tfrac12" />, and{' '}
        <Katex tex="6(\tfrac14)-16(\tfrac1{16})=\tfrac32-1=\tfrac12" /> ✓.
      </>
    ),
  },
]

export default function MethodsQ14_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The random variable <Katex tex="X" /> has the following probability distribution,
            where <Katex tex="0<p<\tfrac13" />.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="text-[13px] tabular-nums border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="x" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="-1" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="0" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="1" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="\Pr(X=x)" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="2p" />
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    <Katex tex="1-3p" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The variance of <Katex tex="X" /> is
          </p>
        </>
      }
      background={
        <Background title="Variance: the average squared distance from the mean">
          <p>
            <Katex tex="\mathrm{Var}(X)=\mathrm{E}\bigl((X-\mu)^2\bigr)" />, where <Katex tex="\mu=\mathrm{E}(X)" />: how
            far, on average, the values sit from the balance point, measured in squared distance. The formula sheet&apos;s
            shortcut <Katex tex="\mathrm{Var}(X)=\mathrm{E}(X^2)-\mu^2" /> gives the same number with less arithmetic.
          </p>
          <p>
            <Katex tex="\mathrm{E}(X^2)" /> means: square each <em>value</em> <Katex tex="x" />, keep its probability,
            multiply and add. Squares and probabilities are never negative, so neither <Katex tex="\mathrm{E}(X^2)" /> nor{' '}
            <Katex tex="\mathrm{Var}(X)" /> can ever be negative. That makes a quick check on any answer.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="2p(1-3p)" /> },
        { letter: 'B', content: <Katex tex="1-4p" /> },
        { letter: 'C', content: <Katex tex="(1-3p)^2" /> },
        { letter: 'D', content: <Katex tex="6p-16p^2" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="p(5-9p)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Squaring the values moves −1 onto +1: that is why E(X²) = 1 − 2p">
            <SquareWidget />
          </Explore>
          <WrongMethod
            title="(−1)² × p is just −p"
            working={
              <Katex
                display
                tex="\begin{aligned} \mathrm{E}(X^2) &= -p+1-3p = 1-4p \\ \mathrm{Var}(X) &= (1-4p)-(1-4p)^2 \\ &= 4p-16p^2 \end{aligned}"
              />
            }
          >
            <p>
              <Katex tex="4p-16p^2" /> is not among the options, which is the first warning. The slip is{' '}
              <Katex tex="(-1)^2=+1" />, so the <Katex tex="p" /> is added, not subtracted. The answer also fails the sense
              check: at <Katex tex="p=0.3" />, which is allowed, it gives <Katex tex="1.2-1.44=-0.24" />, a negative
              variance. A variance is an average of squares, so if your expression can go negative for an allowed{' '}
              <Katex tex="p" />, something was squared wrongly.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
