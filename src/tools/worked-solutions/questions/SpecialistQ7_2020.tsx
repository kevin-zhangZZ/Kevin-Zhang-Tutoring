// 2020 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 26% correct — the
// hardest MCQ on this paper. Partial-fraction form of 1/(ax(x²+b)) with b < 0. Question
// text transcribed from the original paper. Solution is original; the constants A = 1/(ab),
// B = C = −1/(2ab) and the claims about options A–C (A's equation is a true identity with a
// quadratic denominator; (x + √b)(x − √b) = x² − b; C's denominators vanish at ∓√|b|/a) are
// checked with sympy.
//
// Notes on sources:
// - The VCAA examination report's table shades D (26%; A was the most popular choice at 39%).
//   itute's current solutions PDF also gives D (its last denominator has a typo, x − √|x| for
//   x − √|b|). This file previously recorded a third-party key giving B; B uses √b, which is not
//   real for b < 0 (and (x + √b)(x − √b) expands to x² − b). The NBEASTK video walkthrough says
//   "B" before correcting itself to D.
// - Marty Ross's blog (mathematicalcrap.com, Nov 2020) objects that the question's 1/a factor
//   "disappears" from the answer. It is absorbed into the constants, A = 1/(ab) and
//   B = C = −1/(2ab); the working shows this so the missing 1/a doesn't put a student off D.
// Interactive diagram (§15, interactives/spec-2020-mcq7-roots.tsx, this site's own explanatory
// figure; VCAA printed none): sliders for b and a over the graphs of the denominator
// y = ax(x² + b) and its factor y = x² + b, showing the denominator's zeros (one per linear
// factor) — three when b < 0, one when b > 0 (option A's form) — with a toggle for where option
// C's denominators are zero.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RootsWidget = lazyWidget(() => import('../interactives/spec-2020-mcq7-roots'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 39, B: 18, C: 12, D: 26, E: 5 },
  answer: 'D',
  comment: <>Option A results from not considering that <Katex tex="b<0" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="b<0 \implies x^2+b = x^2-|b|" />,
    reason: (
      <>
        The question asks for <em>linear</em> denominators, so the first job is to see whether the quadratic{' '}
        <Katex tex="x^2+b" /> can be split. Since <Katex tex="b<0" />, write <Katex tex="b=-|b|" />, where{' '}
        <Katex tex="|b|" /> is a positive number: <Katex tex="x^2+b" /> is &ldquo;<Katex tex="x^2" /> minus a positive
        number&rdquo;, a difference of two squares. A number makes it concrete: with <Katex tex="b=-4" />,{' '}
        <Katex tex="x^2+b=x^2-4=(x-2)(x+2)" />. In the diagram below, a negative <Katex tex="b" /> moves the parabola{' '}
        <Katex tex="y=x^2+b" /> down so that it crosses the <Katex tex="x" />-axis twice.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2+b = \big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)" />,
    reason: (
      <>
        Difference of two squares, with <Katex tex="\sqrt{|b|}" />, a real number because <Katex tex="|b|>0" />. Not{' '}
        <Katex tex="\sqrt{b}" />: with <Katex tex="b<0" /> that isn&apos;t a real number, and{' '}
        <Katex tex="(x+\sqrt b)(x-\sqrt b)" /> expands to <Katex tex="x^2-b" /> anyway, the wrong sign.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{1}{ax(x^2+b)} = \frac{1}{ax\big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)}" />,
    reason: (
      <>
        The denominator now has three linear factors, <Katex tex="x" />, <Katex tex="x-\sqrt{|b|}" /> and{' '}
        <Katex tex="x+\sqrt{|b|}" />, and they are all different: their zeros <Katex tex="0" />,{' '}
        <Katex tex="\sqrt{|b|}" /> and <Katex tex="-\sqrt{|b|}" /> are distinct because <Katex tex="b\ne0" />. No factor
        repeats, so each gets one partial fraction and none needs a squared denominator.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{A}{x} + \frac{B}{x+\sqrt{|b|}} + \frac{C}{x-\sqrt{|b|}}" />,
    reason: (
      <>
        One term for each linear factor. The constant <Katex tex="a" /> is not a factor in this sense: it has no{' '}
        <Katex tex="x" /> in it and is never zero, so it can&apos;t give a denominator of its own. It just ends up inside
        the constants <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> (next line). So the denominators are{' '}
        <Katex tex="x" />, not <Katex tex="ax" />, and <Katex tex="x\pm\sqrt{|b|}" />, not <Katex tex="ax\pm\sqrt{|b|}" />{' '}
        as in option C. (Writing <Katex tex="\tfrac{A}{ax}" />, as options A, B and E do, is harmless: it is just the
        constant <Katex tex="\tfrac{A}{a}" /> over <Katex tex="x" />. It is the other two denominators that decide.)
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="1 = aA(x^2+b) + aBx\big(x-\sqrt{|b|}\big)" />
        <Katex display tex="\qquad + aCx\big(x+\sqrt{|b|}\big)" />
        <Katex display tex="x=0\!:\ 1 = aAb \implies A=\tfrac{1}{ab}" />
        <Katex display tex="x=\sqrt{|b|}\!:\ 1 = 2a|b|C \implies C=-\tfrac{1}{2ab}" />
        <Katex display tex="x=-\sqrt{|b|}\!:\ 1 = 2a|b|B \implies B=-\tfrac{1}{2ab}" />
      </>
    ),
    reason: (
      <>
        Not needed to choose the option, but it confirms that D works. Multiply both sides by{' '}
        <Katex tex="ax\big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)" /> and substitute each zero in turn, so that two of the
        three terms vanish each time (at <Katex tex="x=\pm\sqrt{|b|}" />, <Katex tex="x^2+b=|b|+b=0" />). All three
        constants come out as real numbers, with the <Katex tex="a" /> sitting inside them, which is why D has no{' '}
        <Katex tex="\tfrac1a" /> in front. (Using <Katex tex="|b|=-b" />: <Katex tex="\tfrac{1}{2a|b|}=-\tfrac{1}{2ab}" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{A}{x} + \frac{B}{x+\sqrt{|b|}} + \frac{C}{x-\sqrt{|b|}}}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>A</b> (39%, the most popular choice) keeps <Katex tex="x^2+b" /> as a quadratic
        over a <Katex tex="Bx+C" /> numerator: the right form when <Katex tex="b>0" />, but <Katex tex="x^2+b" /> isn&apos;t a
        linear denominator, and the report notes it results from not considering that <Katex tex="b<0" />. Options{' '}
        <b>B</b> (18%) and <b>E</b> use <Katex tex="\sqrt{b}" />, which is not real when <Katex tex="b<0" />, and{' '}
        <Katex tex="(x+\sqrt b)(x-\sqrt b)=x^2-b" /> is the wrong quadratic in any case; E also squares a factor that
        doesn&apos;t repeat. Option <b>C</b> (12%) puts <Katex tex="a" /> into the linear factors:{' '}
        <Katex tex="ax\pm\sqrt{|b|}" /> is zero at <Katex tex="x=\mp\tfrac{\sqrt{|b|}}{a}" />, not at the zeros{' '}
        <Katex tex="\pm\sqrt{|b|}" /> of the denominator.
      </>
    ),
  },
]

export default function SpecialistQ7_2020() {
  return (
    <MCQShell
      question={
        <p>
          For non-zero real constants <Katex tex="a" /> and <Katex tex="b" />, where <Katex tex="b<0" />, the expression{' '}
          <Katex tex="\dfrac{1}{ax(x^2+b)}" /> in partial fraction form with linear denominators, where{' '}
          <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> are real constants, is
        </p>
      }
      background={
        <Background title="Partial Fractions: One Term for Each Factor">
          <p>
            Split the denominator into factors, then write one fraction for each. A <b>linear factor</b>{' '}
            <Katex tex="x-p" /> gets <Katex tex="\tfrac{A}{x-p}" />. A <b>quadratic factor with no real roots</b> (one that
            can&apos;t be split into real linear factors, like <Katex tex="x^2+4" />) gets{' '}
            <Katex tex="\tfrac{Bx+C}{\text{quadratic}}" />. A <b>repeated factor</b> <Katex tex="(x-p)^2" /> gets{' '}
            <Katex tex="\tfrac{A}{x-p}+\tfrac{B}{(x-p)^2}" />.
          </p>
          <p>
            So before choosing the form, test every quadratic factor for real roots. Here <Katex tex="x^2+b=0" /> means{' '}
            <Katex tex="x^2=-b" />, which has real solutions exactly when <Katex tex="-b>0" />, that is, when{' '}
            <Katex tex="b<0" />. The sign of <Katex tex="b" /> decides everything.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{A}{ax} + \dfrac{Bx+C}{x^2+b}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{A}{ax} + \dfrac{B}{x+\sqrt{b}} + \dfrac{C}{x-\sqrt{b}}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{A}{x} + \dfrac{B}{ax+\sqrt{|b|}} + \dfrac{C}{ax-\sqrt{|b|}}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{A}{x} + \dfrac{B}{x+\sqrt{|b|}} + \dfrac{C}{x-\sqrt{|b|}}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{A}{ax} + \dfrac{B}{(x+\sqrt{b})^2} + \dfrac{C}{x+\sqrt{b}}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="b < 0 pushes x² + b below the x-axis, so it crosses twice — and every crossing is a linear factor">
            <RootsWidget />
          </Explore>
          <WrongMethod
            title="x² + b is a quadratic, so it gets a Bx + C on top"
            source="A 39% · examiner's report"
            working={
              <>
                <Katex display tex="\frac{1}{ax(x^2+b)} = \frac{A}{ax} + \frac{Bx+C}{x^2+b}" />
                <p>(option A)</p>
              </>
            }
          >
            <p>
              A <Katex tex="Bx+C" /> numerator is for a quadratic that <em>can&apos;t</em> be factorised, one with no real
              roots. This one can: <Katex tex="x^2+b=0" /> means <Katex tex="x^2=-b" />, and since <Katex tex="b<0" />,{' '}
              <Katex tex="-b" /> is positive, so there are two real roots <Katex tex="\pm\sqrt{|b|}" />. Option A&apos;s
              equation is still true (it is the right answer when <Katex tex="b>0" />), but <Katex tex="x^2+b" /> is not a
              linear denominator, and the question asked for linear ones.
            </p>
            <p>
              Next time, before writing a quadratic denominator, check it for real roots: solve it, or look at the
              discriminant (here <Katex tex="0^2-4(1)(b)=-4b>0" />, so two real roots).
            </p>
          </WrongMethod>
          <WrongMethod
            title="Factorise x² + b as (x + √b)(x − √b)"
            source="B 18%"
            working={
              <>
                <Katex display tex="x^2+b = (x+\sqrt b)(x-\sqrt b)" />
                <Katex display tex="\implies \frac{A}{ax} + \frac{B}{x+\sqrt{b}} + \frac{C}{x-\sqrt{b}}" />
                <p>(option B)</p>
              </>
            }
          >
            <p>
              Expand it: <Katex tex="(x+\sqrt b)(x-\sqrt b)=x^2-(\sqrt b)^2=x^2-b" />. That is the factorisation of{' '}
              <Katex tex="x^2-b" />, not <Katex tex="x^2+b" />. And with <Katex tex="b<0" />, <Katex tex="\sqrt b" /> isn&apos;t
              a real number at all (<Katex tex="b=-4" /> gives <Katex tex="\sqrt{-4}" />), while the question wants real
              linear factors.
            </p>
            <p>
              Deal with the sign first: <Katex tex="b=-|b|" />, so <Katex tex="x^2+b=x^2-|b|=\big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)" />.
              A number check catches the slip at once: <Katex tex="b=-4" /> should give{' '}
              <Katex tex="x^2-4=(x-2)(x+2)" />, and <Katex tex="\sqrt{|b|}=2" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
