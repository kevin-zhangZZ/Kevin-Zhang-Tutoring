// 2018 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 46% correct.
// The trap: the numerator shares factors with the denominator, so the "obvious" partial
// fraction form (matching the denominator as printed) is wrong — it must be simplified first.
// Question text transcribed from the original paper; solution is original.
// Interactive (extras): spec-2018-mcq3-hole — the graph has a hole at x = −1 (not an asymptote)
// and runs to −∞ on both sides of x = −½ (a squared factor); test each option's form against it.
// WrongMethods for B (examiner's report, 31%) and E (15%).
// Note: option E can in fact be made to equal the expression with non-zero constants (e.g.
// A = −17/9, B = 10/3, C = 1, D = 1/9, checked in sympy), but not uniquely — it is not the
// partial fraction form, so D stands; recorded as a minor wording point, not an error.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const HoleWidget = lazyWidget(() => import('../interactives/spec-2018-mcq3-hole'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 31, C: 5, D: 46, E: 15 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      Option B did not account for common factors and its last term is not irreducible, so should not have{' '}
      <Katex tex="Dx" /> in the numerator.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x^2+3x+1 = (2x+1)(x+1)" />,
    reason: (
      <>
        How would I know to start here? The partial-fraction form is read off the denominator, so first make sure the
        denominator is as simple as it can be: factorise the top and bottom completely and look for anything they
        share. This numerator factorises, and <Katex tex="(2x+1)" /> is already sitting in the denominator.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2-1 = (x-1)(x+1)" />,
    reason: (
      <>
        A difference of two squares, so <Katex tex="x^2-1" /> is <em>not</em> an irreducible quadratic — it is two linear
        factors, and one of them, <Katex tex="(x+1)" />, is also on top.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{2x^2+3x+1}{(2x+1)^3(x^2-1)}" />
        <Katex display tex="= \frac{(2x+1)(x+1)}{(2x+1)^3(x-1)(x+1)}" />
        <Katex display tex="= \frac{1}{(2x+1)^2(x-1)}" />
      </>
    ),
    reason: (
      <>
        Cancel <Katex tex="(2x+1)" /> and <Katex tex="(x+1)" />. The cube drops to a square, and{' '}
        <Katex tex="(x+1)" /> disappears — on the graph it leaves only a hole at <Katex tex="x=-1" />, not an asymptote, so
        it gets no fraction of its own.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{1}{(2x+1)^2(x-1)}" />
        <Katex display tex="= \frac{A}{2x+1} + \frac{B}{(2x+1)^2} + \frac{C}{x-1}" />
      </>
    ),
    reason: (
      <>
        Now one term for each power of each factor in the <em>simplified</em> denominator: the repeated linear factor{' '}
        <Katex tex="(2x+1)^2" /> needs both <Katex tex="\tfrac{A}{2x+1}" /> and <Katex tex="\tfrac{B}{(2x+1)^2}" />, and{' '}
        <Katex tex="(x-1)" /> needs <Katex tex="\tfrac{C}{x-1}" />. Linear factors always take constant numerators.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{A}{2x+1} + \frac{B}{(2x+1)^2} + \frac{C}{x-1}}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>B</b> partial-fractions the expression as printed, without cancelling; option{' '}
        <b>E</b> puts <Katex tex="Bx+C" /> over <Katex tex="(2x+1)^2" />, a shape reserved for irreducible quadratics.
      </>
    ),
  },
]

export default function SpecialistQ3_2018() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following, where <Katex tex="A" />, <Katex tex="B" />, <Katex tex="C" /> and{' '}
          <Katex tex="D" /> are non-zero real numbers, is the partial fraction form for the expression{' '}
          <Katex tex="\dfrac{2x^2+3x+1}{(2x+1)^3(x^2-1)}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{x-1} + \dfrac{C}{x+1}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{(2x+1)^2} + \dfrac{C}{(2x+1)^3} + \dfrac{Dx}{x^2-1}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{Bx+C}{x^2-1}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{B}{(2x+1)^2} + \dfrac{C}{x-1}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{A}{2x+1} + \dfrac{Bx+C}{(2x+1)^2} + \dfrac{D}{x-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Choosing a partial-fraction form">
          <p>
            First make the fraction proper and fully simplified: factorise top and bottom, cancel common factors. Then read
            the form off what is left of the denominator, one term per factor:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              a linear factor <Katex tex="(ax+b)" /> gives <Katex tex="\tfrac{A}{ax+b}" />;
            </li>
            <li>
              a repeated linear factor <Katex tex="(ax+b)^n" /> gives <Katex tex="n" /> terms,{' '}
              <Katex tex="\tfrac{A_1}{ax+b}+\dots+\tfrac{A_n}{(ax+b)^n}" />, all with constant numerators;
            </li>
            <li>
              an irreducible quadratic (one that does not factorise over <Katex tex="R" />) gives{' '}
              <Katex tex="\tfrac{Bx+C}{\text{quadratic}}" />.
            </li>
          </ul>
        </Background>
      }
      extras={
        <>
          <Explore title="A factor that cancels leaves a hole, not an asymptote">
            <HoleWidget />
          </Explore>
          <WrongMethod
            title="Match the denominator as printed: three terms for (2x + 1)³, one for x² − 1"
            source="Examiner's report"
            working={
              <>
                <Katex display tex="\frac{A}{2x+1}+\frac{B}{(2x+1)^2}" />
                <Katex display tex="{}+\frac{C}{(2x+1)^3}+\frac{Dx}{x^2-1}" />
              </>
            }
          >
            This skips the cancelling, and it goes wrong twice. <Katex tex="(2x+1)" /> and <Katex tex="(x+1)" /> are
            common to top and bottom, so after cancelling there is no <Katex tex="(2x+1)^3" /> and no{' '}
            <Katex tex="(x+1)" /> left. And <Katex tex="x^2-1=(x-1)(x+1)" /> is not irreducible, so it would never take an{' '}
            <Katex tex="x" /> term on top anyway. Habit to build: factorise the numerator before you look at the
            denominator.
          </WrongMethod>
          <WrongMethod
            title="(2x + 1)² is a quadratic, so it needs Bx + C on top"
            source="15% chose E"
            working={<Katex display tex="\frac{A}{2x+1}+\frac{Bx+C}{(2x+1)^2}+\frac{D}{x-1}" />}
          >
            <Katex tex="Bx+C" /> is for quadratics that do <em>not</em> factorise. <Katex tex="(2x+1)^2" /> is a power
            of a linear factor, and <Katex tex="\tfrac{Bx+C}{(2x+1)^2}=\tfrac{B/2}{2x+1}+\tfrac{C-B/2}{(2x+1)^2}" /> just
            makes more of the terms already there — so the constants are never pinned down (for instance{' '}
            <Katex tex="A=-\tfrac{17}{9},\ B=\tfrac{10}{3},\ C=1,\ D=\tfrac19" /> works, and so do infinitely many
            others). Powers of a linear factor take constant numerators.
          </WrongMethod>
        </>
      }
    />
  )
}
