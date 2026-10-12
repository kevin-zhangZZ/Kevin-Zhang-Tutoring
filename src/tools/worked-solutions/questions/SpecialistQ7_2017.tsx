// 2017 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 60% correct.
// Rewriting ∫₁² x²√(2−x) dx after the substitution u = 2 − x. Question text transcribed
// from the original paper; solution is original. Answer D checked against the VCAA report and
// itute (both D), and every option's value computed with sympy (A ≈ −0.372, B ≈ 0.372,
// C = −142/105, D = 142/105, E = −82/105). Interactive diagram (§15,
// interactives/spec-2017-mcq7-reflect.tsx, this site's own explanatory figure): the region under
// x²√(2 − x) on [1, 2] beside the region under (2 − u)²√u on [0, 1], with a strip swept across
// both to show u moving backwards (dx = −du) and a toggle showing option C's region below the axis.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ReflectWidget = lazyWidget(() => import('../interactives/spec-2017-mcq7-reflect'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 6, C: 20, D: 60, E: 9 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u = 2-x \implies x = 2-u" />
        <Katex display tex="\frac{du}{dx}=-1 \implies dx = -du" />
      </>
    ),
    reason: (
      <>
        Let <Katex tex="u" /> be what is under the root (every option is in powers of <Katex tex="u^{\frac12}" />). Then
        write <Katex tex="x^2" /> via <Katex tex="x=2-u" />, and <Katex tex="dx" /> via <Katex tex="\tfrac{du}{dx}=-1" />.
      </>
    ),
    more: (
      <>
        The surd <Katex tex="\sqrt{2-x}" /> is what makes the integral awkward. Every <Katex tex="x" /> must go, including the one hidden in <Katex tex="dx" />. Its minus sign is the
        first of two to keep track of.
      </>
    ),
  },
  {
    working: <Katex display tex="x=1 \implies u=1; \qquad x=2 \implies u=0" />,
    reason: (
      <>
        Convert the <Katex tex="x" />-terminals to <Katex tex="u" />-values. They come out <em>reversed</em> because as{' '}
        <Katex tex="x" /> goes up, <Katex tex="u=2-x" /> goes down.
      </>
    ),
    more: (
      <>
        The top terminal is now the smaller number. That is the second minus sign in disguise, since{' '}
        <Katex tex="\int_1^0 = -\int_0^1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2\sqrt{2-x} = (2-u)^2 u^{\frac12} = \bigl(4-4u+u^2\bigr)u^{\frac12}" />,
    reason: <>Replace <Katex tex="x" /> by <Katex tex="2-u" /> and <Katex tex="\sqrt{2-x}" /> by <Katex tex="u^{\frac12}" />, then expand the square.</>,
  },
  {
    working: <Katex display tex="= 4u^{\frac12}-4u^{\frac32}+u^{\frac52}" />,
    reason: (
      <>
        Adding <Katex tex="\tfrac12" /> to each index: <Katex tex="u\cdot u^{\frac12}=u^{\frac32}" /> and{' '}
        <Katex tex="u^2\cdot u^{\frac12}=u^{\frac52}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\int_1^2 x^2\sqrt{2-x}\,dx" />
        <Katex display tex="= \int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)(-du)" />
        <Katex display tex="= -\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" />
      </>
    ),
    reason: (
      <>
        Substitute the integrand, <Katex tex="dx=-du" /> and the new terminals, then take the <Katex tex="-1" /> out the
        front: the form the options use.
      </>
    ),
    more: <>Both minus signs are still visible: one in front, one in the reversed terminals.</>,
  },
  {
    working: <Katex display tex="= \int_0^1\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" />,
    reason: (
      <>
        Swapping the terminals changes the sign, so the minus in front and the reversed terminals cancel: a positive
        area, as it must be.
      </>
    ),
    more: (
      <>
        What is left is an ordinary integral of a positive function over <Katex tex="[0,1]" />. The diagram below shows it as the original region reflected, with <Katex tex="u" /> running backwards as{' '}
        <Katex tex="x" /> runs forwards.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= \left[\tfrac83u^{\frac32}-\tfrac85u^{\frac52}+\tfrac27u^{\frac72}\right]_0^1" />
        <Katex display tex="= \frac{8}{3}-\frac85+\frac27 = \frac{142}{105}\approx1.35" />
      </>
    ),
    reason: (
      <>
        Not asked for, but a sign check: the integrand is positive on <Katex tex="[1,2]" />, so the answer must be
        positive, and D is. Antiderivative: add 1 to each power, divide by the new power.
      </>
    ),
    more: (
      <>
        That rules out A (<Katex tex="\approx-0.37" />), C (<Katex tex="=-\tfrac{142}{105}" />) and E (
        <Katex tex="=-\tfrac{82}{105}" />). B is positive but only <Katex tex="\approx0.37" />, because it integrates over
        the wrong interval.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du}" />,
    reason: (
      <>
        Matches option <b>D</b>: minus out the front, terminals <Katex tex="1" /> to <Katex tex="0" />.
      </>
    ),
    more: (
      <>
        Options A and B keep the <Katex tex="x" />-terminals <Katex tex="1" />{' '}
        and <Katex tex="2" />: A is right apart from never changing the terminals, and B also drops the minus sign. E has
        the wrong sign on the <Katex tex="u^{\frac52}" /> term and no minus out the front.
      </>
    ),
  },
]

export default function SpecialistQ7_2017() {
  return (
    <MCQShell
      question={
        <p>
          With a suitable substitution{' '}
          <Katex tex="\displaystyle\int_1^2 x^2\sqrt{2-x}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\displaystyle\int_1^2\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_1^2\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^1\left(-4u^{\frac12}+4u^{\frac32}-u^{\frac52}\right)du" /> },
        { letter: 'D', content: <Katex tex="-\displaystyle\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_1^0\left(4u^{\frac12}-4u^{\frac32}-u^{\frac52}\right)du" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="u = 2 − x reflects the region: the same area, but u runs backwards from 1 to 0">
            <ReflectWidget />
          </Explore>
          <WrongMethod
            title="Put the terminals the usual way round, 0 to 1, and keep the −du"
            source="20% chose C"
            working={
              <>
                <Katex display tex="\int_1^2 x^2\sqrt{2-x}\,dx = \int_0^1 (2-u)^2u^{\frac12}\,(-du)" />
                <Katex display tex="= \int_0^1\left(-4u^{\frac12}+4u^{\frac32}-u^{\frac52}\right)du" />
              </>
            }
          >
            <p>
              The terminals really are <Katex tex="1" /> to <Katex tex="0" /> (<Katex tex="x=1" /> gives{' '}
              <Katex tex="u=1" />). Turning them round to <Katex tex="0" /> to <Katex tex="1" /> is allowed only if you pay
              for it with a minus sign, and the only minus sign available is the one from <Katex tex="dx=-du" />, which
              this working has also kept inside the bracket. One minus sign, used twice.
            </p>
            <p>
              The result is <Katex tex="-\tfrac{142}{105}" />, negative, but <Katex tex="x^2\sqrt{2-x}" /> is positive on{' '}
              <Katex tex="[1,2]" />, so the integral must be positive. A five-second sign check catches it: toggle
              &ldquo;Show option C&rdquo; in the diagram above.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
