// 2019 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 25% correct — the
// hardest MCQ on this paper. Sum of the solutions to tan(2x) = d on a given interval, in terms
// of α. Question text transcribed from the original paper. Solution is original.
// Answer E checked with sympy: solveset(tan(2x) − tan α, x, (0, 5π/4)) for α = 1/5, π/6, π/3, 3/2
// always gives the three solutions α/2, α/2 + π/2, α/2 + π, summing to 3(π + α)/2. The VCAA report
// (quadrants 1 and 3, 2x = α, π + α, 2π + α) and itute both give E.
// Distractor slips verified: D (30%) is α/2 + (π + α)/2, the first two solutions only; C (27%) is
// α + (π + α), the first two values of 2x added before halving. Solving with the undoubled
// interval 0 < 2x < 5π/4 also keeps at most those two (only when α < π/4).
// Interactive diagrams (§15): interactives/meth-2019-mcq19-branches.tsx plots y = tan(2x) on
// (0, 5π/4) with a slider for d: three branches, three crossings π/2 apart, live sum; a toggle
// stops after one revolution of 2x to show option D. interactives/meth-2019-mcq19-squash.tsx
// squashes y = tan u on 0 < u < 5π/2 into y = tan(2x) on 0 < x < 5π/4, showing why the interval
// is doubled first and why each solution is then halved. Both are this site's own figures; VCAA
// printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BranchesWidget = lazyWidget(() => import('../interactives/meth-2019-mcq19-branches'))
const SquashWidget = lazyWidget(() => import('../interactives/meth-2019-mcq19-squash'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 12, C: 27, D: 30, E: 25 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\tan(\alpha)=d,\ d>0,\ 0<\alpha<\dfrac{\pi}{2}" />
      <br />
      <Katex tex="\tan(2x)=d,\ 0<x<\dfrac{5\pi}{4}" />
      <br />
      Tan is positive in the first and third quadrants.
      <br />
      <Katex tex="2x=\alpha,\ \pi+\alpha,\ 2\pi+\alpha\ldots" />
      <br />
      So the solutions to <Katex tex="\tan(2x)=d,\ 0<x<\dfrac{5\pi}{4}" /> are{' '}
      <Katex tex="x=\dfrac{\alpha}{2},\ x=\dfrac{\pi+\alpha}{2},\ x=\dfrac{2\pi+\alpha}{2}" />.
      <br />
      The sum of the solutions is{' '}
      <Katex tex="\dfrac{\alpha}{2}+\dfrac{\pi+\alpha}{2}+\dfrac{2\pi+\alpha}{2}=\dfrac{3\alpha+3\pi}{2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="0 < x < \tfrac{5\pi}{4} \implies 0 < 2x < \tfrac{5\pi}{2}" />,
    reason: (
      <>
        The equation is about the angle <Katex tex="2x" />, not <Katex tex="x" />, so first find the interval that{' '}
        <Katex tex="2x" /> lives in: multiply every part of the inequality by 2. This is the step that decides how many
        solutions there are. <Katex tex="\tfrac{5\pi}{2}" /> is more than a full revolution (<Katex tex="2\pi" />), so
        the angle <Katex tex="2x" /> goes all the way round once and then a quarter-turn further.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\tan(2x) = d = \tan(\alpha)" />
        <Katex display tex="2x = \alpha,\ \pi+\alpha,\ 2\pi+\alpha" />
      </>
    ),
    reason: (
      <>
        We are told <Katex tex="\tan(\alpha)=d" /> with <Katex tex="\alpha" /> in the first quadrant, so{' '}
        <Katex tex="\alpha" /> plays the part of the basic angle. Tan is positive in quadrants 1 and 3, which gives{' '}
        <Katex tex="\alpha" /> and <Katex tex="\pi+\alpha" /> on the first lap. The extra quarter-turn brings the first
        quadrant round again: <Katex tex="2\pi+\alpha" /> is still below <Katex tex="\tfrac{5\pi}{2}" /> because{' '}
        <Katex tex="\alpha<\tfrac{\pi}{2}" />. The next one, <Katex tex="3\pi+\alpha" />, is past{' '}
        <Katex tex="\tfrac{5\pi}{2}" />, so we stop at three.
      </>
    ),
  },
  {
    working: <Katex display tex="x = \tfrac{\alpha}{2},\ \tfrac{\pi+\alpha}{2},\ \tfrac{2\pi+\alpha}{2}" />,
    reason: (
      <>
        Halve each value of <Katex tex="2x" /> to get <Katex tex="x" />. As a check, consecutive solutions are{' '}
        <Katex tex="\tfrac{\pi}{2}" /> apart, which is the period of <Katex tex="\tan(2x)" />, and the largest,{' '}
        <Katex tex="\pi+\tfrac{\alpha}{2}" />, is below <Katex tex="\tfrac{5\pi}{4}" /> because{' '}
        <Katex tex="\tfrac{\alpha}{2}<\tfrac{\pi}{4}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Sum} = \frac{\alpha + (\pi+\alpha) + (2\pi+\alpha)}{2}" />
        <Katex display tex="= \frac{3\pi+3\alpha}{2}" />
      </>
    ),
    reason: (
      <>
        Add the three solutions over their common denominator of 2. A quick check with a nice value:{' '}
        <Katex tex="d=1" /> gives <Katex tex="\alpha=\tfrac{\pi}{4}" />, and the solutions{' '}
        <Katex tex="\tfrac{\pi}{8},\ \tfrac{5\pi}{8},\ \tfrac{9\pi}{8}" /> add to <Katex tex="\tfrac{15\pi}{8}" />, which
        is <Katex tex="\tfrac{3(\pi+\pi/4)}{2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{3(\pi+\alpha)}{2}}" />,
    reason: (
      <>
        Matches option <b>E</b>. Option <b>D</b>, <Katex tex="\tfrac{\pi}{2}+\alpha" /> (the most popular answer at{' '}
        <Katex tex="30\%" />), is the sum of the first two solutions only. Option <b>C</b>,{' '}
        <Katex tex="\pi+2\alpha" />, is the first two values of <Katex tex="2x" /> added without halving. Both stop after
        one revolution.
      </>
    ),
  },
]

export default function MethodsQ19_2019() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\tan(\alpha)=d" />, where <Katex tex="d>0" /> and <Katex tex="0<\alpha<\tfrac{\pi}{2}" />,
          the sum of the solutions to <Katex tex="\tan(2x)=d" />, where <Katex tex="0<x<\tfrac{5\pi}{4}" />, in terms
          of <Katex tex="\alpha" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="2\alpha" /> },
        { letter: 'C', content: <Katex tex="\pi+2\alpha" /> },
        { letter: 'D', content: <Katex tex="\tfrac{\pi}{2}+\alpha" /> },
        { letter: 'E', content: <Katex tex="\tfrac{3(\pi+\alpha)}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      background={
        <Background title="Solving tan(2x) = d on an interval">
          <p>
            Replacing <Katex tex="x" /> by <Katex tex="2x" /> squashes the graph of <Katex tex="y=\tan(x)" /> towards the{' '}
            <Katex tex="y" />-axis by a factor of <Katex tex="\tfrac{1}{2}" />. Its period drops from{' '}
            <Katex tex="\pi" /> to <Katex tex="\tfrac{\pi}{2}" />, so twice as many branches fit into any interval, and
            twice as many solutions.
          </p>
          <p>
            The reliable routine is: (1) rewrite the interval for <Katex tex="2x" /> by multiplying through by 2;
            (2) solve for <Katex tex="2x" /> in that bigger interval, going round more than once if it is longer than{' '}
            <Katex tex="2\pi" />; (3) divide every answer by 2.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Two and a half periods of tan(2x) hold three solutions">
            <BranchesWidget />
          </Explore>
          <Explore title="Doubling the angle halves the solutions">
            <SquashWidget />
          </Explore>
          <WrongMethod
            title="Tan is positive in quadrants 1 and 3, so there are two solutions"
            source="30% chose D"
            working={
              <>
                <Katex display tex="2x = \alpha,\ \pi+\alpha" />
                <Katex display tex="x = \tfrac{\alpha}{2},\ \tfrac{\pi+\alpha}{2}" />
                <Katex display tex="\text{Sum} = \tfrac{\pi}{2}+\alpha \quad \text{(option D)}" />
              </>
            }
          >
            <p>
              The quadrant rule gives two angles <em>per revolution</em>, but here the angle <Katex tex="2x" /> makes more
              than one revolution: <Katex tex="0<2x<\tfrac{5\pi}{2}" />. The first-quadrant angle comes round again at{' '}
              <Katex tex="2\pi+\alpha" />, which is the third solution <Katex tex="x=\pi+\tfrac{\alpha}{2}" />, sitting
              in <Katex tex="\left(\pi,\tfrac{5\pi}{4}\right)" />. Keeping the interval as{' '}
              <Katex tex="0<2x<\tfrac{5\pi}{4}" /> (forgetting to double it) loses the same solution. To catch it, always
              rewrite the interval for <Katex tex="2x" /> before solving, and if it runs past <Katex tex="2\pi" />, go
              round again.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Solve for 2x, then add those answers"
            source="27% chose C"
            working={
              <>
                <Katex display tex="2x = \alpha \ \text{ or } \ 2x = \pi+\alpha" />
                <Katex display tex="\text{Sum} = \alpha + (\pi+\alpha) = \pi+2\alpha \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              <Katex tex="\alpha" /> and <Katex tex="\pi+\alpha" /> are values of <Katex tex="2x" />, not of{' '}
              <Katex tex="x" />, so each must be halved before adding (and the third solution is missing as well). Option C
              is exactly double option D, which is a sign of this slip. The question asks about <Katex tex="x" />, so the
              last line before summing should start &ldquo;<Katex tex="x=" />&rdquo;.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
