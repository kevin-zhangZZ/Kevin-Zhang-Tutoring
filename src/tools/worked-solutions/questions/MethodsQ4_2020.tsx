// 2020 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 67% correct.
// A general solution to a cosine equation. Question text transcribed from the original paper; solution is original.
// Answer D checked with sympy (solveset gives x = π/2 + nπ or x = 5π/6 + nπ, the same two sets as
// D's π(6k + 3)/6 and π(6k − 1)/6), against the VCAA report (no comment printed for this question)
// and itute (D, via 2x − π/3 = 2kπ ± 2π/3). Distractors verified with sympy by substituting each
// family: A/B's π(6k − 2)/6 gives a left-hand side of −1 for every k, C/E's π(6k + 2)/6 gives 2, and
// E's x = π gives 2; A's π(6k − 3)/6 and B's π(6k + 5)/6 are correct families (D's, with k shifted
// by one), so A, B and C each have one right family and one wrong one. The tutors' videos (LMKMaths,
// Mr Nie) both note the CAS returns (2n + 1)π/2, which matches no option until rewritten as (6n + 3)π/6.
// Interactive diagrams (§15): interactives/meth-2020e2-mcq4-circle.tsx links the unit circle (θ = 2x −
// π/3, the line cos θ = −½ meeting it at two points) to the graph of cos(2x − π/3), showing where the
// two families come from and why each repeats every π; interactives/meth-2020e2-mcq4-options.tsx
// plots each option's values on the curve y = 2cos(2x − π/3) + 1 so the wrong family in A, B, C and E
// visibly misses the zeros. Both are this site's own explanatory figures; VCAA printed no diagram.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const CircleWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq4-circle'))
const OptionsWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq4-options'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 7, C: 18, D: 67, E: 2 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos\!\left(2x-\tfrac\pi3\right)+1 = 0 \implies \cos\!\left(2x-\tfrac\pi3\right) = -\tfrac12" />,
    reason: <>Get the cosine on its own first. The unit circle can only tell us which angles have a particular cosine, so we need <Katex tex="\cos(\text{angle}) = \text{number}" /> before anything else.</>,
  },
  {
    working: <Katex display tex="\text{Let } \theta = 2x-\tfrac\pi3: \quad \cos\theta = -\tfrac12" />,
    reason: <>Treat the whole bracket as one angle <Katex tex="\theta" />. Solve for <Katex tex="\theta" /> first and undo the bracket at the end, so the two jobs (finding the angles, then finding <Katex tex="x" />) don&apos;t get tangled.</>,
  },
  {
    working: <Katex display tex="\theta = -\tfrac{2\pi}{3}+2k\pi \ \text{ or } \ \theta = \tfrac{2\pi}{3}+2k\pi, \quad k\in Z" />,
    reason: <><Katex tex="\cos\theta" /> is the horizontal coordinate of the point at angle <Katex tex="\theta" /> on the unit circle (see the Background). <Katex tex="\cos\tfrac\pi3=\tfrac12" />, so the basic angle is <Katex tex="\tfrac\pi3" />; the cosine is <em>negative</em>, so the point is left of the vertical axis, in the second or third quadrant: <Katex tex="\theta=\pi-\tfrac\pi3=\tfrac{2\pi}3" /> or <Katex tex="\theta=\pi+\tfrac\pi3=\tfrac{4\pi}3" />, which is the same point as <Katex tex="-\tfrac{2\pi}3" />. Every whole number of turns, <Katex tex="2k\pi" />, lands on the same two points. The first diagram below shows it.</>,
  },
  {
    working: <Katex display tex="2x-\tfrac\pi3 = -\tfrac{2\pi}{3}+2k\pi \implies 2x = -\tfrac\pi3+2k\pi" />,
    reason: <>Now undo the bracket for the first point: add <Katex tex="\tfrac\pi3" /> to both sides.</>,
  },
  {
    working: <Katex display tex="x = -\tfrac\pi6+k\pi = \frac{\pi(6k-1)}{6}" />,
    reason: <>Halve <em>everything</em>, the <Katex tex="2k\pi" /> included: it becomes <Katex tex="k\pi" />. That is why the solutions in <Katex tex="x" /> repeat every <Katex tex="\pi" />, not every <Katex tex="2\pi" />: the period of <Katex tex="\cos\!\left(2x-\tfrac\pi3\right)" /> is <Katex tex="\tfrac{2\pi}{2}=\pi" />. Then write it over 6 to match the options: <Katex tex="-\tfrac{\pi}{6}+\tfrac{6k\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="2x-\tfrac\pi3 = \tfrac{2\pi}{3}+2k\pi \implies 2x = \pi+2k\pi" />,
    reason: <>The same steps for the other point: <Katex tex="\tfrac\pi3+\tfrac{2\pi}3=\pi" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac\pi2+k\pi = \frac{\pi(6k+3)}{6}" />,
    reason: <>Halving again, and <Katex tex="\tfrac\pi2=\tfrac{3\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{\pi(6k-1)}{6} \ \text{ or } \ x = \frac{\pi(6k+3)}{6}, \ k\in Z}" />,
    reason: (
      <>
        Matches option <b>D</b>. On CAS (radian mode), <Cas fn="solve">solve(2cos(2x − π/3) + 1 = 0, x)</Cas> gives the families as{' '}
        <Katex tex="\tfrac{(6n-1)\pi}{6}" /> and <Katex tex="\tfrac{(2n+1)\pi}{2}" />, and the second matches no option until you
        multiply its top and bottom by 3: <Katex tex="\tfrac{(2n+1)\pi}{2}=\tfrac{(6n+3)\pi}{6}" />. A check with <Katex tex="k=0" />:{' '}
        <Katex tex="x=-\tfrac\pi6" /> and <Katex tex="x=\tfrac\pi2" /> both satisfy the original equation. Every other option contains
        a value that fails it: <b>A</b> and <b>B</b> include <Katex tex="-\tfrac\pi3" /> (<Katex tex="k=0" />), where the left side
        is <Katex tex="-1" />; <b>C</b> includes <Katex tex="\tfrac\pi3" /> and <b>E</b> includes <Katex tex="\pi" />, where it is 2.
        A, B and C each have one correct family, written differently from D&apos;s: A&apos;s <Katex tex="\tfrac{\pi(6k-3)}{6}" /> and
        B&apos;s <Katex tex="\tfrac{\pi(6k+5)}{6}" /> are D&apos;s two families with <Katex tex="k" /> shifted by one. The second diagram
        below tests every option.
      </>
    ),
  },
]

export default function MethodsQ4_2020() {
  return (
    <MCQShell
      question={
        <p>
          The solutions of the equation{' '}
          <Katex tex="2\cos\!\left(2x-\tfrac\pi3\right)+1=0" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=\tfrac{\pi(6k-2)}{6} \text{ or } x=\tfrac{\pi(6k-3)}{6}, \text{ for } k\in Z" /> },
        { letter: 'B', content: <Katex tex="x=\tfrac{\pi(6k-2)}{6} \text{ or } x=\tfrac{\pi(6k+5)}{6}, \text{ for } k\in Z" /> },
        { letter: 'C', content: <Katex tex="x=\tfrac{\pi(6k-1)}{6} \text{ or } x=\tfrac{\pi(6k+2)}{6}, \text{ for } k\in Z" /> },
        { letter: 'D', content: <Katex tex="x=\tfrac{\pi(6k-1)}{6} \text{ or } x=\tfrac{\pi(6k+3)}{6}, \text{ for } k\in Z" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="x=\pi \text{ or } x=\tfrac{\pi(6k+2)}{6}, \text{ for } k\in Z" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="The general solution of cos θ = a">
          <p>
            Put a point on the unit circle at angle <Katex tex="\theta" /> (anticlockwise from the positive <Katex tex="x" />-axis).
            Its horizontal coordinate is <Katex tex="\cos\theta" />. So solving <Katex tex="\cos\theta=a" /> means finding the points of
            the circle on the vertical line at <Katex tex="a" />. For <Katex tex="-1<a<1" /> that line cuts the circle at exactly{' '}
            <b>two</b> points, mirror images in the horizontal axis, at angles <Katex tex="\pm\cos^{-1}(a)" />.
          </p>
          <p>
            Going round a whole number of extra turns brings you back to the same two points, so every solution is
          </p>
          <Katex display tex="\theta = \pm\cos^{-1}(a) + 2k\pi, \quad k\in Z." />
          <p>
            Two families, one from each point. When the angle is a bracket like <Katex tex="2x-\tfrac\pi3" />, solve for the bracket
            first, then undo it; dividing by the 2 in front of <Katex tex="x" /> also divides the <Katex tex="2k\pi" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="cos θ = −½ at two points of the unit circle: two families of solutions, each repeating every π in x">
            <CircleWidget />
          </Explore>
          <WrongMethod
            title="π(6k − 1)/6 is in option C, so the answer is C"
            source="18% chose C"
            working={
              <>
                <Katex display tex="x = \tfrac{(6n-1)\pi}{6} \ \text{ or } \ x = \tfrac{(2n+1)\pi}{2}" />
                <Katex display tex="\tfrac{\pi(6k-1)}{6} \text{ appears in C} \implies \text{C}" />
              </>
            }
          >
            <p>
              That family is in <b>D</b> as well, so it can&apos;t decide between them: the second family does. C&apos;s second formula,{' '}
              <Katex tex="\tfrac{\pi(6k+2)}{6}=\tfrac\pi3+k\pi" />, isn&apos;t a solution at all: at <Katex tex="x=\tfrac\pi3" /> the left side is{' '}
              <Katex tex="2\cos\tfrac\pi3+1=2" />, not 0.
            </p>
            <p>
              When a CAS answer doesn&apos;t look like any option, rewrite it over the options&apos; denominator
              (<Katex tex="\tfrac{(2n+1)\pi}{2}=\tfrac{(6n+3)\pi}{6}" />, option D), or test <Katex tex="k=0" /> in each remaining
              option&apos;s formulas. One value that fails the equation rules an option out.
            </p>
          </WrongMethod>
          <Explore title="Test each option: every x it gives must be a solution, and every solution must be given">
            <OptionsWidget />
          </Explore>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
