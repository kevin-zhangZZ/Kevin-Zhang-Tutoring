// 2017 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 78% correct (no comment).
// The vector resolute of a in the direction of b. Question text transcribed from the
// original paper; answer and every distractor checked with sympy (a·b = −14, |b|² = 9, |a|² = 169).
// itute agrees (C). Solution is original.
// Widget: interactives/spec-2017-mcq13-perpendicular — in the plane of a and b at true size, slide
// λ until a − λb is perpendicular to b; that happens at λ = −14/9 = a·b/|b|², which is why the
// formula divides by |b|². Option B's λ = −14/3 overshoots.
// WrongMethod: option B (16%) — scalar resolute multiplied by b instead of b̂.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PerpendicularWidget = lazyWidget(() => import('../interactives/spec-2017-mcq13-perpendicular'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 16, C: 78, D: 2, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(2)+(-4)(2)+12(-1) = -14" />,
    reason: (
      <>
        Every resolute starts with the dot product: multiply matching components and add. It is negative, so the angle
        between <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> is obtuse and the answer will be a{' '}
        <em>negative</em> multiple of <Katex tex="\underset{\sim}{b}" />, pointing the opposite way.
      </>
    ),
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 2^2+2^2+(-1)^2 = 9" />,
    reason: (
      <>
        The vector resolute divides by <Katex tex="\left|\underset{\sim}{b}\right|^2" />, and{' '}
        <Katex tex="\left|\underset{\sim}{b}\right|^2" /> is just the sum of squares, so there is no square root to take.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{vector resolute} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\,\underset{\sim}{b}" />,
    reason: (
      <>
        Why the square: the vector resolute is the multiple <Katex tex="\lambda\underset{\sim}{b}" /> that leaves{' '}
        <Katex tex="\underset{\sim}{a}-\lambda\underset{\sim}{b}" /> perpendicular to <Katex tex="\underset{\sim}{b}" />.
        Setting <Katex tex="(\underset{\sim}{a}-\lambda\underset{\sim}{b})\cdot\underset{\sim}{b}=0" /> gives{' '}
        <Katex tex="\lambda=\frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}" />. The
        same thing is <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" />, with one{' '}
        <Katex tex="\left|\underset{\sim}{b}\right|" /> from each unit vector.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-\frac{14}{9}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)}" />,
    reason: (
      <>
        Matches option <b>C</b>. A, <Katex tex="-\tfrac{14}{3}=\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" />, is the
        scalar resolute: a number, not a vector. B multiplies that number by <Katex tex="\underset{\sim}{b}" /> instead of{' '}
        <Katex tex="\hat{\underset{\sim}{b}}" />. D and E are the right formulas the wrong way round: D is{' '}
        <Katex tex="\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}|}=-\tfrac{14}{13}" /> and E is{' '}
        <Katex tex="\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}|^2}\underset{\sim}{a}" />, the resolutes
        of <Katex tex="\underset{\sim}{b}" /> in the direction of <Katex tex="\underset{\sim}{a}" />.
      </>
    ),
  },
]

export default function SpecialistQ13_2017() {
  return (
    <MCQShell
      question={
        <p>
          Given the vectors{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}-4\underset{\sim}{j}+12\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />
          , the vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
          <Katex tex="\underset{\sim}{b}" /> is
        </p>
      }
      background={
        <p>
          Two things are called a &ldquo;resolute&rdquo; and they are not the same object. Picture the shadow{' '}
          <Katex tex="\underset{\sim}{a}" /> casts on the line through <Katex tex="\underset{\sim}{b}" /> when light shines
          perpendicular to that line. The <em>scalar</em> resolute{' '}
          <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> is the shadow&rsquo;s signed length, a number. The{' '}
          <em>vector</em> resolute{' '}
          <Katex tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}}" /> is the shadow
          itself, an arrow along <Katex tex="\underset{\sim}{b}" />. Two of the five options here are scalars, put there for
          anyone who answers the wrong one.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{14}{3}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{14}{3}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{14}{9}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-\dfrac{14}{13}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{14}{169}\left(3\underset{\sim}{i}-4\underset{\sim}{j}+12\underset{\sim}{k}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the vector resolute divides by |b|²">
            <PerpendicularWidget />
          </Explore>
          <WrongMethod
            title="Find the scalar resolute, −14/3, then multiply it by b"
            source="16% chose B"
            working={
              <>
                <Katex display tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}=\frac{-14}{3}" />
                <Katex display tex="-\frac{14}{3}\left(2\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)" />
              </>
            }
          >
            <Katex tex="-\tfrac{14}{3}" /> is the right <em>length</em> for the shadow, but to turn a length into a vector you
            multiply by a vector of length 1, <Katex tex="\hat{\underset{\sim}{b}}=\tfrac13\underset{\sim}{b}" />. Multiplying by{' '}
            <Katex tex="\underset{\sim}{b}" /> itself stretches it by <Katex tex="|\underset{\sim}{b}|=3" />. Catch it with a
            length check: B has length <Katex tex="\tfrac{14}{3}\times3=14" />, longer than{' '}
            <Katex tex="|\underset{\sim}{a}|=13" />, and a shadow can never be longer than the vector casting it.
          </WrongMethod>
        </>
      }
    />
  )
}
