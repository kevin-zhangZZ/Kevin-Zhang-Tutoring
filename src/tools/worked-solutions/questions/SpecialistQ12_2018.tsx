// 2018 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 36% correct —
// the hardest MCQ on this paper.
// The equality case of the triangle inequality for vectors — what does it force?
// Question text transcribed from the original paper; solution is original.
// Note on the report: it says "Options A and C would satisfy the given statement". Strictly,
// "parallel" also covers vectors pointing in opposite directions, which do not satisfy it (the
// widget's θ = 180° case); the equation implies A, not the other way round. The answer A is
// unaffected.
// Widget (extras): spec-2018-mcq12-flatten — b placed head-to-tail after a; |a + b| falls short
// of |a| + |b| until the triangle flattens at θ = 0, with a checklist of which options hold.
// WrongMethods: C (21%) is one case, not every case; E (16%) is the Pythagoras condition.
// Distractors B and D are argued in the final row's `more`; C and E in the WrongMethod boxes.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FlattenWidget = lazyWidget(() => import('../interactives/spec-2018-mcq12-flatten'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 36, B: 18, C: 21, D: 9, E: 16 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Option B would not necessarily satisfy the given statement. Options D and E would not satisfy the
      given statement.
      <br />
      Options A and C would satisfy the given statement, but only A is necessarily true.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{a}=(2,0), \ \underset{\sim}{b}=(3,0):" />
        <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|=5=|\underset{\sim}{a}|+|\underset{\sim}{b}|" />
        <Katex display tex="|\underset{\sim}{a}|\ne|\underset{\sim}{b}|, \ \underset{\sim}{a}\ne\pm\underset{\sim}{b}" />
        <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=6\ne0" />
      </>
    ),
    reason: (
      <>
        &ldquo;Necessarily true&rdquo; means true in <em>every</em> case where the equation holds, so one
        counterexample rules an option out. Two vectors pointing the same way, with different lengths, satisfy the
        equation but break <b>B</b>, <b>C</b>, <b>D</b> and <b>E</b>.
      </>
    ),
    more: (
      <>
        Why try vectors pointing the same way? As the Background shows, equality needs{' '}
        <Katex tex="\underset{\sim}{b}" /> to carry straight on in <Katex tex="\underset{\sim}{a}" />&apos;s
        direction. Making the lengths different then breaks <b>B</b> and <b>C</b> in one go.
      </>
    ),
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2+2\,\underset{\sim}{a}\!\cdot\!\underset{\sim}{b}+|\underset{\sim}{b}|^2" />,
    reason: (
      <>
        Now show <b>A</b> must hold. Square both sides of the given equation, using{' '}
        <Katex tex="|\underset{\sim}{v}|^2=\underset{\sim}{v}\cdot\underset{\sim}{v}" />; start with the left.
      </>
    ),
    more: (
      <>
        Magnitudes are hard to work with directly, but a magnitude squared is a dot product, and dot products
        expand like brackets:{' '}
        <Katex tex="(\underset{\sim}{a}+\underset{\sim}{b})\cdot(\underset{\sim}{a}+\underset{\sim}{b})=\underset{\sim}{a}\cdot\underset{\sim}{a}+2\,\underset{\sim}{a}\cdot\underset{\sim}{b}+\underset{\sim}{b}\cdot\underset{\sim}{b}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\bigl(|\underset{\sim}{a}|+|\underset{\sim}{b}|\bigr)^2 = |\underset{\sim}{a}|^2+2|\underset{\sim}{a}||\underset{\sim}{b}|+|\underset{\sim}{b}|^2" />,
    reason: <>And the right side, squared: an ordinary binomial expansion of two numbers.</>,
  },
  {
    working: (
      <>
        <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|=|\underset{\sim}{a}|+|\underset{\sim}{b}|" />
        <Katex display tex="\implies\; \underset{\sim}{a}\!\cdot\!\underset{\sim}{b} = |\underset{\sim}{a}||\underset{\sim}{b}|" />
      </>
    ),
    reason: (
      <>
        Equate the two expansions (squaring is safe as both sides are non-negative). The{' '}
        <Katex tex="|\underset{\sim}{a}|^2" /> and <Katex tex="|\underset{\sim}{b}|^2" /> terms cancel; then
        halve.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{a}\!\cdot\!\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />
        <Katex display tex="\implies\; \cos\theta=1" />
        <Katex display tex="\implies\; \theta=0" />
      </>
    ),
    reason: (
      <>
        Compare with the dot product formula and divide by <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|" />,
        which is non-zero because <Katex tex="\underset{\sim}{a},\underset{\sim}{b}\ne\underset{\sim}{0}" />.
        The angle between vectors lies in <Katex tex="[0,\pi]" />, so <Katex tex="\theta=0" />.
      </>
    ),
    more: (
      <>
        The question says the vectors are non-zero because a zero vector has no direction, so
        &ldquo;the angle between them&rdquo; would mean nothing.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\theta=0" />
        <Katex display tex="\implies\; \underset{\sim}{a} \text{ and } \underset{\sim}{b}" />
        <Katex display tex="\text{point in the same direction}" />
      </>
    ),
    reason: (
      <>
        Vectors pointing the same direction are always parallel, so <b>A</b> must be true.
      </>
    ),
    more: (
      <>
        &ldquo;Same direction&rdquo; is actually stronger than option <b>A</b>&apos;s &ldquo;parallel&rdquo;,
        which also covers vectors pointing in opposite directions. Those fail the equation (for example{' '}
        <Katex tex="(2,0)" /> and <Katex tex="(-3,0)" /> give <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|=1" />,
        not <Katex tex="5" />), so &ldquo;parallel&rdquo; does not guarantee the equation. That doesn&apos;t
        matter: the question only asks what must follow <em>from</em> the equation.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} \text{ is parallel to } \underset{\sim}{b}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        <b>B</b> (<Katex tex="18\%" />): equal lengths are not forced, since the first row satisfies the equation
        with lengths <Katex tex="2" /> and <Katex tex="3" />. <b>D</b> (<Katex tex="9\%" />):{' '}
        <Katex tex="\underset{\sim}{a}=-\underset{\sim}{b}" /> gives{' '}
        <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|=0" />, but{' '}
        <Katex tex="|\underset{\sim}{a}|+|\underset{\sim}{b}|>0" />, so it never satisfies the equation.{' '}
        <b>C</b> (<Katex tex="21\%" />) and <b>E</b> (<Katex tex="16\%" />) each have a Common Mistake box
        below.
      </>
    ),
  },
]

export default function SpecialistQ12_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}| = |\underset{\sim}{a}|+|\underset{\sim}{b}|" />{' '}
          and <Katex tex="\underset{\sim}{a},\underset{\sim}{b}\ne\underset{\sim}{0}" />, which one of the
          following is <b>necessarily true</b>?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\underset{\sim}{a}" /> is parallel to <Katex tex="\underset{\sim}{b}" /></>, isAnswer: true },
        { letter: 'B', content: <Katex tex="|\underset{\sim}{a}|=|\underset{\sim}{b}|" /> },
        { letter: 'C', content: <Katex tex="\underset{\sim}{a}=\underset{\sim}{b}" /> },
        { letter: 'D', content: <Katex tex="\underset{\sim}{a}=-\underset{\sim}{b}" /> },
        { letter: 'E', content: <><Katex tex="\underset{\sim}{a}" /> is perpendicular to <Katex tex="\underset{\sim}{b}" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="The triangle inequality, and what “necessarily true” asks">
          <p>
            Place <Katex tex="\underset{\sim}{b}" /> head-to-tail after <Katex tex="\underset{\sim}{a}" />. Then{' '}
            <Katex tex="\underset{\sim}{a}" />, <Katex tex="\underset{\sim}{b}" /> and{' '}
            <Katex tex="\underset{\sim}{a}+\underset{\sim}{b}" /> are the three sides of a triangle, and one side
            of a triangle is always shorter than the other two together:{' '}
            <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|\le|\underset{\sim}{a}|+|\underset{\sim}{b}|" />.
            Equality happens only when the triangle collapses flat, with{' '}
            <Katex tex="\underset{\sim}{b}" /> carrying straight on in <Katex tex="\underset{\sim}{a}" />&apos;s
            direction.
          </p>
          <p>
            &ldquo;Which is necessarily true?&rdquo; asks what the equation <em>forces</em>, not what would make it
            true. So an option can make the equation hold (as <b>C</b> does) and still be the wrong answer.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why |a + b| = |a| + |b| only when the triangle goes flat">
            <FlattenWidget />
          </Explore>
          <WrongMethod
            title="a = b makes the equation work, so the answer is a = b"
            source="21% chose C"
            working={<Katex display tex="\underset{\sim}{b}=\underset{\sim}{a}: \ |2\underset{\sim}{a}|=2|\underset{\sim}{a}|=|\underset{\sim}{a}|+|\underset{\sim}{a}| \ \checkmark" />}
          >
            This shows that <Katex tex="\underset{\sim}{a}=\underset{\sim}{b}" /> is <em>one</em> way for the
            equation to hold, which is the wrong direction of logic. The question asks the reverse: whenever the
            equation holds, must <Katex tex="\underset{\sim}{a}" /> equal <Katex tex="\underset{\sim}{b}" />? No:{' '}
            <Katex tex="\underset{\sim}{a}=(2,0)" /> and <Katex tex="\underset{\sim}{b}=(3,0)" /> satisfy it with
            different lengths. For &ldquo;necessarily true&rdquo;, hunt for a counterexample rather than a
            confirming example.
          </WrongMethod>
          <WrongMethod
            title="It looks like Pythagoras, so a and b are perpendicular"
            source="16% chose E"
            working={
              <>
                <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2=|\underset{\sim}{a}|^2+|\underset{\sim}{b}|^2" />
                <Katex display tex="\implies \underset{\sim}{a}\cdot\underset{\sim}{b}=0" />
              </>
            }
          >
            That is the condition for perpendicular vectors, but it has squares on every term and the
            question&apos;s equation has none. For perpendicular vectors,{' '}
            <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|=\sqrt{|\underset{\sim}{a}|^2+|\underset{\sim}{b}|^2}" />,
            which is shorter than <Katex tex="|\underset{\sim}{a}|+|\underset{\sim}{b}|" /> (lengths{' '}
            <Katex tex="3" /> and <Katex tex="4" /> give <Katex tex="5" />, not <Katex tex="7" />). Tap
            &ldquo;perpendicular&rdquo; in the widget above to see the gap.
          </WrongMethod>
        </>
      }
    />
  )
}
