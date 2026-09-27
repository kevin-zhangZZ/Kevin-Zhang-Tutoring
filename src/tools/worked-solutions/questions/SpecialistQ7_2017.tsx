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
        The surd <Katex tex="\sqrt{2-x}" /> is what makes this awkward, and every option has powers{' '}
        <Katex tex="u^{\frac12}" />, <Katex tex="u^{\frac32}" />, <Katex tex="u^{\frac52}" />, so let <Katex tex="u" /> be
        what is under the root. Then everything else must be written in <Katex tex="u" /> too: <Katex tex="x^2" /> via{' '}
        <Katex tex="x=2-u" />, and <Katex tex="dx" /> via <Katex tex="\tfrac{du}{dx}=-1" />. That minus sign is the first
        of two to keep track of.
      </>
    ),
  },
  {
    working: <Katex display tex="x=1 \implies u=1; \qquad x=2 \implies u=0" />,
    reason: (
      <>
        The terminals are <Katex tex="x" />-values, so convert them to <Katex tex="u" />-values. They come out{' '}
        <em>reversed</em> (the top terminal is now the smaller number) because as <Katex tex="x" /> goes up,{' '}
        <Katex tex="u=2-x" /> goes down. That is the second minus sign in disguise, since{' '}
        <Katex tex="\int_1^0 = -\int_0^1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2\sqrt{2-x} = (2-u)^2 u^{\frac12} = \bigl(4-4u+u^2\bigr)u^{\frac12}" />,
    reason: <>Expanding the square before multiplying through.</>,
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
        Substituting everything at once: the integrand, <Katex tex="dx=-du" /> and the new terminals. Taking the{' '}
        <Katex tex="-1" /> from <Katex tex="-du" /> out the front gives the form the options use. Both minus signs are
        still visible: one in front, one in the reversed terminals.
      </>
    ),
  },
  {
    working: <Katex display tex="= \int_0^1\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" />,
    reason: (
      <>
        Why this isn&apos;t negative: swapping the terminals of an integral changes its sign, so the minus in front and the
        reversed terminals cancel. What is left is an ordinary integral of a positive function over{' '}
        <Katex tex="[0,1]" />, a positive area. The diagram below shows it as the original region reflected, with{' '}
        <Katex tex="u" /> running backwards as <Katex tex="x" /> runs forwards.
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
        Not asked for, but it settles any doubt. The original integrand is positive on <Katex tex="[1,2]" />, so the answer
        must be positive, which rules out A (<Katex tex="\approx-0.37" />), C (<Katex tex="=-\tfrac{142}{105}" />) and E (
        <Katex tex="=-\tfrac{82}{105}" />). B is positive but only <Katex tex="\approx0.37" />, because it integrates over
        the wrong interval.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du}" />,
    reason: (
      <>
        Matches option <b>D</b>: the minus pulled out the front, terminals left as <Katex tex="1" /> to{' '}
        <Katex tex="0" />. Option C (20%) keeps the minus from <Katex tex="-du" /> inside the bracket <em>and</em> writes the
        terminals as <Katex tex="0" /> to <Katex tex="1" />, using the one minus sign twice; it equals{' '}
        <Katex tex="-\tfrac{142}{105}" />. Options A and B keep the <Katex tex="x" />-terminals <Katex tex="1" /> and{' '}
        <Katex tex="2" />: A is right apart from never changing the terminals, and B also drops the minus sign.
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
