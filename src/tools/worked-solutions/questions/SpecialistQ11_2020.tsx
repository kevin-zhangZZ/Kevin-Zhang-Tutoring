// 2020 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 59% correct (no
// comment printed for this question). A u = tan(x) substitution turning a trigonometric integral
// into partial fractions. Question text transcribed from the original paper. Solution is
// original; answer C agrees with itute and with the NBEASTK and Dr U video walkthroughs.
// Distractors checked with sympy: D is C with both signs swapped; B is exactly what
// sec²(x) = tan²(x) − 1 (the wrong-sign identity) gives, since 1/(u(u − 3)) = 1/(3(u − 3)) − 1/(3u);
// E keeps the x-terminals and A has the upper terminal 1/√3 = tan(π/6). As John Friend and Marty
// Ross point out (mathematicalcrap.com, Nov 2020), the integral is improper at x = π/4, where
// the denominator is 0, and diverges; the note says so, and the widget deliberately shades no
// area. (Sept 2026: the note used to claim every option is improper in the same way; B's
// integrand is continuous on [1, √3], so it now says only that C shares the problem.)
// Interactive diagram (§15): interactives/spec-2020-mcq11-pieces.tsx stacks the two partial
// fractions on top of each other to rebuild the integrand, shows where each sign comes from, and
// flips to option D's signs; it opens at u = 1.5, inside the u-terminals 1 to √3 (marked on the axis).
// Sept 2026 audit: the stem had a comma after "With a suitable substitution" that the paper does not.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PiecesWidget = lazyWidget(() => import('../interactives/spec-2020-mcq11-pieces'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 16, C: 59, D: 19, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \tan(x), \quad \frac{du}{dx} = \sec^2(x)" />,
    reason: <>How would you know to use <Katex tex="\tan(x)" />? The numerator <Katex tex="\sec^2(x)" /> is the derivative of <Katex tex="\tan(x)" />, and <Katex tex="\tan(x)" /> sits in the denominator. When an integrand holds a function <em>and</em> its derivative, let <Katex tex="u" /> be the function: the derivative becomes the <Katex tex="du" />. (Options A to D all start at <Katex tex="u=1=\tan\tfrac\pi4" />, which confirms it.)</>,
  },
  {
    working: <Katex display tex="\sec^2(x) = 1+\tan^2(x) = 1+u^2" />,
    reason: <>The rest of the denominator must be in <Katex tex="u" /> too, and the <Katex tex="\sec^2(x)" /> there isn't the one that becomes <Katex tex="du" />. Divide <Katex tex="\sin^2(x)+\cos^2(x)=1" /> by <Katex tex="\cos^2(x)" /> to get <Katex tex="\tan^2(x)+1=\sec^2(x)" />. Mind the sign: <Katex tex="\tan^2(x)-1" /> leads to option B.</>,
    more: <>See the common mistake below.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sec^2(x)-3\tan(x)+1" />
        <Katex display tex="= \left(1+u^2\right)-3u+1 = u^2-3u+2" />
      </>
    ),
    reason: <>A quadratic in <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="u^2-3u+2 = (u-1)(u-2)" />,
    reason: <>It factorises, so partial fractions will give the two linear denominators every option has.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = \tfrac\pi4 \Rightarrow u = \tan\tfrac\pi4 = 1" />
        <Katex display tex="x = \tfrac\pi3 \Rightarrow u = \tan\tfrac\pi3 = \sqrt3" />
      </>
    ),
    reason: <>An integral in <Katex tex="u" /> needs <Katex tex="u" />-terminals. Option E keeps the <Katex tex="x" />-terminals <Katex tex="\tfrac\pi4" /> and <Katex tex="\tfrac\pi3" />; option A's <Katex tex="\tfrac{1}{\sqrt3}" /> is <Katex tex="\tan\tfrac\pi6" />, not <Katex tex="\tan\tfrac\pi3" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_{\pi/4}^{\pi/3}\frac{\sec^2(x)}{\sec^2(x)-3\tan(x)+1}\,dx" />
        <Katex display tex="= \int_1^{\sqrt3}\frac{1}{(u-1)(u-2)}\,du" />
      </>
    ),
    reason: <>The <Katex tex="\sec^2(x)\,dx" /> on top is exactly <Katex tex="du" />, so it disappears into the <Katex tex="du" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{(u-1)(u-2)} = \frac{P}{u-1}+\frac{Q}{u-2}" />,
    reason: <>Partial fractions: split a fraction whose denominator has two factors into two fractions with one factor each, which is the form every option is in.</>,
  },
  {
    working: <Katex display tex="1 = P(u-2)+Q(u-1)" />,
    reason: <>Multiply both sides by <Katex tex="(u-1)(u-2)" />. This holds for every <Katex tex="u" />, so choose values of <Katex tex="u" /> that make one bracket zero at a time.</>,
  },
  {
    working: (
      <>
        <Katex display tex="u=2: \ Q=1" />
        <Katex display tex="u=1: \ -P=1 \implies P=-1" />
      </>
    ),
    reason: <>The signs are the whole question here: C and D are the same two fractions with opposite signs. Near <Katex tex="u=1" /> the factor <Katex tex="u-2" /> is about <Katex tex="-1" />, which is what makes <Katex tex="P" /> negative.</>,
    more: <>The diagram below shows where each sign comes from.</>,
  },
  {
    working: (
      <>
        <Katex display tex="u=0: \quad \frac{1}{0-2}-\frac{1}{0-1} = -\tfrac12+1 = \tfrac12" />
        <Katex display tex="\text{and } \frac{1}{(0-1)(0-2)} = \tfrac12" />
      </>
    ),
    reason: <>A five-second check that catches swapped signs: put an easy value of <Katex tex="u" /> into both sides. They agree.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_1^{\sqrt3}\left(\frac{1}{u-2}-\frac{1}{u-1}\right)du}" />,
    reason: <>Matches option <b>C</b>. Option D (19%) is the same two fractions with the signs swapped; option B (16%) is what the wrong identity <Katex tex="\sec^2(x)=\tan^2(x)-1" /> produces; option E keeps the <Katex tex="x" />-terminals (and its two fractions add up to <Katex tex="\tfrac{1}{(u-1)(u+2)}" />, the wrong quadratic); option A swaps the signs and uses <Katex tex="\tfrac1{\sqrt3}" /> as the upper terminal.</>,
  },
]

export default function SpecialistQ11_2020() {
  return (
    <MCQShell
      question={
        <p>
          With a suitable substitution{' '}
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
            That does not change the answer. The question asks only which expression the
            integral "can be expressed as", and option C has exactly the same problem: its
            integrand is undefined at <Katex tex="u=1" />, the lower terminal. But it is a good
            reminder that a zero denominator at a terminal is always worth a second of your
            attention.
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
      extras={
        <>
          <Explore title="Partial fractions: two simple pieces that add up to the curve, and where each sign comes from">
            <PiecesWidget />
          </Explore>
          <WrongMethod
            title="Put the two fractions down the other way round"
            source="19% chose D"
            working={<Katex display tex="\frac{1}{(u-1)(u-2)} = \frac{1}{u-1}-\frac{1}{u-2}" />}
          >
            <p>
              Test it at <Katex tex="u=0" />: the left side is{' '}
              <Katex tex="\tfrac{1}{(-1)(-2)}=\tfrac12" />, the right side is{' '}
              <Katex tex="\tfrac{1}{-1}-\tfrac{1}{-2}=-\tfrac12" />. Opposite signs, so the split is
              wrong: it is the negative of the correct one.
            </p>
            <p>
              A sign check also works: on the interval <Katex tex="1<u<\sqrt3" /> the factor{' '}
              <Katex tex="u-2" /> is negative, so the integrand is negative there, but these two
              fractions add to something positive. Find each numerator with the cover-up values{' '}
              <Katex tex="u=1" /> and <Katex tex="u=2" /> rather than guessing the order.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Replace sec²(x) with tan²(x) − 1"
            source="16% chose B"
            working={
              <>
                <Katex display tex="\tan^2(x)-1-3\tan(x)+1" />
                <Katex display tex="= u^2-3u = u(u-3)" />
                <Katex display tex="\frac{1}{u(u-3)} = \frac{1}{3(u-3)}-\frac{1}{3u}" />
              </>
            }
          >
            <p>
              The identity is <Katex tex="\sec^2(x)=1+\tan^2(x)" />, with a plus. With the wrong
              sign the two constants cancel, the quadratic becomes <Katex tex="u^2-3u" />, and its
              partial fractions are exactly option B's.
            </p>
            <p>
              If you are unsure of an identity, test it at an angle you know: at{' '}
              <Katex tex="x=\tfrac\pi4" />, <Katex tex="\sec^2\tfrac\pi4=2" /> and{' '}
              <Katex tex="1+\tan^2\tfrac\pi4=2" />, but <Katex tex="\tan^2\tfrac\pi4-1=0" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
