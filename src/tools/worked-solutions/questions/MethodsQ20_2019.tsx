// 2019 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 47% correct.
// Rewriting log_x(y) + log_y(z) using the change-of-base identity. Question text transcribed
// from the original paper. Solution is original.
// Answer D checked with sympy: simplify(log_x(y) + log_y(z) − (1/log_y(x) + 1/log_z(y))) = 0, and
// numerically with (x, y, z) = (2, 4, 8) and (3, 5, 7): the expression and D both give 3.5 and 2.674;
// A = −D; B and E are identical (1.167, 1.510) and C = −B. The VCAA report and itute both give D.
// Distractor slip verified: B (18%) follows from reading logₑx/logₑy as logₓ(y) (base on top),
// which turns logₓ(y) = 1/(logₑx/logₑy) into 1/logₓ(y) and each term of the sum into B's.
// Interactive diagram (§15): interactives/meth-2019-mcq20-log-ruler.tsx — a log ruler where
// logₓ(y) is the number of ×x steps (blue) that fit in the distance from 1 to y (orange), so
// log_y(x) is the same two lengths divided the other way; a toggle tests all five options with
// chosen x, y, z. This site's own figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LogRulerWidget = lazyWidget(() => import('../interactives/meth-2019-mcq20-log-ruler'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 18, C: 16, D: 47, E: 8 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\log_x(y)+\log_y(z)" />
      <br />
      <Katex tex="=\dfrac{\log_y(y)}{\log_y(x)}+\dfrac{\log_z(z)}{\log_z(y)}" />
      <br />
      <Katex tex="=\dfrac{1}{\log_y(x)}+\dfrac{1}{\log_z(y)}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_x(y) = \frac{\log_y(y)}{\log_y(x)} = \frac{1}{\log_y(x)}" />,
    reason: (
      <>
        Four of the options are &ldquo;1 over a log&rdquo;, so aim for a numerator of 1. Change of base lets us rewrite a
        log in any base we like; choosing the new base to be the argument, <Katex tex="y" />, makes the top{' '}
        <Katex tex="\log_y(y)=1" />. The old base, <Katex tex="x" />, moves into the log on the bottom.
      </>
    ),
  },
  {
    working: <Katex display tex="\log_y(z) = \frac{\log_z(z)}{\log_z(y)} = \frac{1}{\log_z(y)}" />,
    reason: (
      <>
        The same move on the second term: change to base <Katex tex="z" />, its argument. In both lines the base and the
        argument have swapped places and the log has turned upside down.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\log_x(y) + \log_y(z)" />
        <Katex display tex="= \boxed{\frac{1}{\log_y(x)} + \frac{1}{\log_z(y)}}" />
      </>
    ),
    reason: (
      <>
        Matches option <b>D</b>. A and C can be ruled out at a glance: with <Katex tex="x" />, <Katex tex="y" />,{' '}
        <Katex tex="z" /> all greater than 1, every log here is positive, but A and C are negative. B and E are the same
        expression in disguise (<Katex tex="\tfrac{1}{\log_x(y)}=\log_y(x)" />), and both are each term flipped over
        rather than the term itself: with <Katex tex="x=2,\ y=4,\ z=8" /> the expression is{' '}
        <Katex tex="2+1.5=3.5" />, while B and E give <Katex tex="\tfrac12+\tfrac23\approx1.17" />.
      </>
    ),
  },
]

export default function MethodsQ20_2019() {
  return (
    <MCQShell
      question={
        <p>
          The expression <Katex tex="\log_x(y) + \log_y(z)" />, where <Katex tex="x" />, <Katex tex="y" /> and{' '}
          <Katex tex="z" /> are all real numbers greater than 1, is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{1}{\log_y(x)} - \dfrac{1}{\log_z(y)}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{\log_x(y)} + \dfrac{1}{\log_y(z)}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{1}{\log_x(y)} - \dfrac{1}{\log_y(z)}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{\log_y(x)} + \dfrac{1}{\log_z(y)}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\log_y(x) + \log_z(y)" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Change of base, and why swapping flips the log">
          <p>
            For any new base <Katex tex="c" />: <Katex tex="\log_a(b)=\dfrac{\log_c(b)}{\log_c(a)}" />. The old base{' '}
            <Katex tex="a" /> always ends up on the bottom (<Katex tex="\log_2 8=\tfrac{\log_e 8}{\log_e 2}=3" />).
          </p>
          <p>
            Choosing <Katex tex="c=b" /> gives <Katex tex="\log_a(b)=\dfrac{1}{\log_b(a)}" />. You can see why directly: if{' '}
            <Katex tex="\log_a(b)=t" /> then <Katex tex="a^t=b" />, so <Katex tex="b^{1/t}=a" />, which says{' '}
            <Katex tex="\log_b(a)=\tfrac1t" />. For example <Katex tex="\log_2 8=3" /> and{' '}
            <Katex tex="\log_8 2=\tfrac13" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Swapping the base and the argument flips the log">
            <LogRulerWidget />
          </Explore>
          <WrongMethod
            title="In change of base, the base goes on top"
            source="18% chose B"
            working={
              <>
                <Katex display tex="\log_x(y) = \frac{1}{\log_e(x)/\log_e(y)} = \frac{1}{\log_x(y)}" />
                <Katex display tex="\text{Sum} = \frac{1}{\log_x(y)} + \frac{1}{\log_y(z)}" />
                <Katex display tex="\text{(option B)}" />
              </>
            }
          >
            <p>
              <Katex tex="\tfrac{\log_e(x)}{\log_e(y)}" /> is <Katex tex="\log_y(x)" />, not <Katex tex="\log_x(y)" />:
              the base always sits on the bottom. The slip gives itself away, because B would mean{' '}
              <Katex tex="\log_x(y)=\tfrac{1}{\log_x(y)}" />, which is only true when <Katex tex="\log_x(y)=1" />, i.e.{' '}
              <Katex tex="x=y" />. Test with numbers: <Katex tex="\log_2 4=2" /> but{' '}
              <Katex tex="\tfrac{1}{\log_2 4}=\tfrac12" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
