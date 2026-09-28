// 2020 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 79% correct.
// Recovering a real cubic from one real and one purely imaginary root. Question text
// transcribed from the original paper. Solution is original.
// Checked (Sept 2026) against the VCAA report (C), itute (C, via c = 2(−3i)(3i) = 18) and two
// tutors' video walk-throughs (C): no disagreements. sympy confirms (z + 2)(z² + 9) =
// z³ + 2z² + 9z + 18, and the distractor slips: (z + 2)(z² − 9) gives E, (z − 2)(z² + 9) gives A.
// Interactive diagram (§15): interactives/spec-2020-mcq6-third-root.tsx fixes the roots −2 and 3i
// and lets the student drag the third root around the Argand plane while the expanded coefficients
// update; their imaginary parts all vanish only at −3i, the mirror image of 3i. This site's own
// explanatory figure; VCAA printed no diagram. Two WrongMethod boxes: the i² slip (z² − 9, option E,
// 7%) and the factor-sign slip (z − 2, option A, 6%), each computed to give exactly that option.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ThirdRootWidget = lazyWidget(() => import('../interactives/spec-2020-mcq6-third-root'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 2, C: 79, D: 5, E: 7 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(3i) = 0 \implies P(-3i) = 0" />,
    reason: (
      <>
        &ldquo;Real coefficients&rdquo; is the clue: then non-real roots come in conjugate pairs (the conjugate root theorem). The
        reason: conjugating both sides of <Katex tex="P(3i)=0" /> changes every <Katex tex="i" /> to <Katex tex="-i" /> but leaves the
        real coefficients alone, so <Katex tex="P(-3i)=\overline{0}=0" />. This is what gives the cubic its third root for free.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{roots: } -2, \ 3i, \ -3i" />,
    reason: <>A cubic has three roots, and the leading coefficient is 1, so these three determine <Katex tex="P" /> completely.</>,
  },
  {
    working: <Katex display tex="(z-3i)(z+3i) = z^2-9i^2 = z^2+9" />,
    reason: (
      <>
        Pair the conjugates first: a difference of two squares, and <Katex tex="i^2=-1" /> makes every <Katex tex="i" /> disappear.
        That is exactly why the pair is needed; with any other third root the <Katex tex="i" />&apos;s would not cancel and the
        coefficients would not be real (drag the third root around in the diagram below).
      </>
    ),
  },
  {
    working: <Katex display tex="P(z) = (z+2)\left(z^2+9\right) = z^3+2z^2+9z+18" />,
    reason: <>The root <Katex tex="-2" /> gives the factor <Katex tex="z-(-2)=z+2" />. Expand and read off the coefficients.</>,
  },
  {
    working: <Katex display tex="\boxed{a=2, \ b=9, \ c=18}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>E</b> comes from treating the roots as <Katex tex="\pm3" /> instead of{' '}
        <Katex tex="\pm3i" />, and option <b>A</b> from using the root <Katex tex="2" /> instead of <Katex tex="-2" /> (both worked through below). A fast check:{' '}
        <Katex tex="c=18" /> must be minus the product of the roots, <Katex tex="-(-2)(3i)(-3i)=-(-2)(9)=18" /> ✓, and{' '}
        <Katex tex="P(-2)=-8+8-18+18=0" /> ✓.
      </>
    ),
  },
]

export default function SpecialistQ6_2020() {
  return (
    <MCQShell
      question={
        <p>
          For the complex polynomial <Katex tex="P(z)=z^3+az^2+bz+c" /> with real
          coefficients <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />,{' '}
          <Katex tex="P(-2)=0" /> and <Katex tex="P(3i)=0" />.
          <br />
          The values of{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2,\ 9,\ -18" /> },
        { letter: 'B', content: <Katex tex="3,\ 4,\ 12" /> },
        { letter: 'C', content: <Katex tex="2,\ 9,\ 18" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-3,\ -4,\ 12" /> },
        { letter: 'E', content: <Katex tex="2,\ -9,\ -18" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="With 3i as a root, the coefficients come out real only when the third root is its mirror image, −3i">
            <ThirdRootWidget />
          </Explore>
          <WrongMethod
            title="(z − 3i)(z + 3i) is a difference of two squares, so it's z² − 9"
            source="7% chose E"
            working={
              <>
                <Katex display tex="(z+2)\left(z^2-9\right) = z^3+2z^2-9z-18" />
                <Katex display tex="\implies a=2,\ b=-9,\ c=-18 \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              The difference of two squares is the right idea, but the second square is <Katex tex="(3i)^2=9i^2=-9" />, not 9, so{' '}
              <Katex tex="(z-3i)(z+3i)=z^2-(-9)=z^2+9" />. Writing <Katex tex="z^2-9" /> quietly swaps the roots{' '}
              <Katex tex="\pm3i" /> for <Katex tex="\pm3" />: <Katex tex="z^2-9=0" /> gives <Katex tex="z=\pm3" />, and neither is a root
              of <Katex tex="P" />.
            </p>
            <p>
              Catch it by putting the given root back in. With E&apos;s coefficients,{' '}
              <Katex tex="P(3i)=-27i-18-27i-18=-36-54i" />, not 0. In the diagram above, a real third root such as <Katex tex="3" /> or{' '}
              <Katex tex="-3" /> always leaves an imaginary part in the coefficients.
            </p>
          </WrongMethod>
          <WrongMethod
            title="P(−2) = 0, so z − 2 is a factor"
            source="6% chose A"
            working={
              <>
                <Katex display tex="(z-2)\left(z^2+9\right) = z^3-2z^2+9z-18" />
                <Katex display tex="\implies a=-2,\ b=9,\ c=-18 \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              The factor that goes with a root is the one that equals zero <i>at</i> that root. <Katex tex="z-2" /> is zero at{' '}
              <Katex tex="z=2" />; the factor for the root <Katex tex="-2" /> is <Katex tex="z-(-2)=z+2" />, by the same rule that gave{' '}
              <Katex tex="z-3i" /> and <Katex tex="z+3i" /> for the other two roots.
            </p>
            <p>
              Catch it by substituting the root: with A&apos;s coefficients, <Katex tex="P(-2)=-8-8-18-18=-52" />, not 0.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
