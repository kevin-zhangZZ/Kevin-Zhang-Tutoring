// 2020 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 38% correct. Two
// forces give a constant acceleration; the rest is vector antidifferentiation. Question
// text transcribed from the original paper. Solution is original; y = x/2 + 1/2 (E) agrees with
// itute and with the NBEASTK and Dr U video walkthroughs. Checked in sympy: r = (1 + t²)i +
// (1 + t²/2)j. Distractors checked: A (10%) is the path with r(0) = i + j left out (r = t²i +
// (t²/2)j gives y = x/2 exactly); D (23%) is y = 1 + t²/2 with t = x − 1 substituted for t
// (= (x − 1)²/2 + 1 exactly). C (18%) is D's parabola shifted; no clean slip found for C. B is
// r(0) subtracted (x = t² − 1, y = t²/2 − 1 gives y = x/2 − 1/2 exactly; Oct 2026: added to last row).
// 41% chose a parabola (C or D), which the straight-line fact in the Background rules out.
// Interactive diagram (§15): interactives/spec-2020-mcq15-path.tsx plays the motion with v and a
// drawn at the particle (always parallel, so the path is straight); toggles add a starting push
// (the path bends into a parabola) and drop r(0) (the path moves to y = x/2, option A).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PathWidget = lazyWidget(() => import('../interactives/spec-2020-mcq15-path'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 10, C: 18, D: 23, E: 38 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Use <Katex tex="\Sigma\underset{\sim}{F}=m\underset{\sim}{a}" /> then antidifferentiate{' '}
      <Katex tex="\underset{\sim}{a}" /> twice to find the position vector.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\Sigma\underset{\sim}{F} = \left(4\underset{\sim}{i}-2\underset{\sim}{j}\right)+\left(2\underset{\sim}{i}+5\underset{\sim}{j}\right)" />
        <Katex display tex="= 6\underset{\sim}{i}+3\underset{\sim}{j}" />
      </>
    ),
    reason: <>Newton's second law uses the <em>net</em> force, so add the two forces component by component first.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = \frac{\Sigma\underset{\sim}{F}}{m} = \frac{6\underset{\sim}{i}+3\underset{\sim}{j}}{3} = 2\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: (
      <>
        <Katex tex="\Sigma\underset{\sim}{F}=m\underset{\sim}{a}" />, so divide by the mass. Both
        forces are constant, so <Katex tex="\underset{\sim}{a}" /> is a constant vector: no{' '}
        <Katex tex="t" /> in it.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{v} = t\left(2\underset{\sim}{i}+\underset{\sim}{j}\right)+\underset{\sim}{c}_1" />
        <Katex display tex="\underset{\sim}{v}(0)=\underset{\sim}{0} \implies \underset{\sim}{c}_1=\underset{\sim}{0}" />
      </>
    ),
    reason: (
      <>
        Antidifferentiate each component. Every antiderivative brings a constant, and the
        question gives one condition for each: "initially at rest" means{' '}
        <Katex tex="\underset{\sim}{v}(0)=\underset{\sim}{0}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{r} = \tfrac{t^2}{2}\left(2\underset{\sim}{i}+\underset{\sim}{j}\right)+\underset{\sim}{c}_2" />
        <Katex display tex="\underset{\sim}{r}(0)=\underset{\sim}{i}+\underset{\sim}{j} \implies \underset{\sim}{c}_2=\underset{\sim}{i}+\underset{\sim}{j}" />
      </>
    ),
    reason: (
      <>
        Antidifferentiate again. "Initially at position <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}" />"
        means <Katex tex="\underset{\sim}{r}(0)=\underset{\sim}{i}+\underset{\sim}{j}" />, so this
        constant is <em>not</em> zero.
      </>
    ),
    more: (
      <>
        It is an easy one to drop: leaving it out gives the parallel line{' '}
        <Katex tex="y=\tfrac{x}{2}" />, option A (see the common mistake below).
      </>
    ),
  },
  {
    working: <Katex display tex="x = 1+t^2, \quad y = 1+\tfrac{t^2}{2}" />,
    reason: <>Collect the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> parts: these are the parametric equations of the path.</>,
  },
  {
    working: <Katex display tex="t^2 = x-1 \implies y = 1+\frac{x-1}{2}" />,
    reason: (
      <>
        A cartesian equation has no <Katex tex="t" />, so eliminate it. Both components contain{' '}
        <Katex tex="t^2" />, so substitute <Katex tex="t^2=x-1" /> as a whole: no square roots
        needed.
      </>
    ),
    more: (
      <>
        The result is a straight line, as it must be for a particle that starts from rest under a
        constant force (the Background explains why), so the parabolas C and D could have been
        ruled out before any algebra.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y = \tfrac{x}{2}+\tfrac12}" />,
    reason: (
      <>
        Matches option <b>E</b>. Check: it passes through the starting point{' '}
        <Katex tex="(1, 1)" />, since <Katex tex="\tfrac12+\tfrac12=1" />.
      </>
    ),
    more: (
      <>
        <p>
          Strictly the path is only the ray <Katex tex="x\ge1" />, since <Katex tex="x=1+t^2" />{' '}
          and <Katex tex="t\ge0" />; the options give the line it lies on.
        </p>
        <p>
          The <Katex tex="(1, 1)" /> check alone rules out A, B and C (at <Katex tex="x=1" /> they
          give <Katex tex="y=\tfrac12" />, <Katex tex="0" /> and <Katex tex="3" />). It does not
          rule out D, which also passes through <Katex tex="(1, 1)" />; only the straight-line
          fact from the previous step does.
        </p>
        <p>
          Option B is the right line through the wrong point: subtracting the starting position
          instead of adding it gives <Katex tex="x=t^2-1" />, <Katex tex="y=\tfrac{t^2}{2}-1" />,
          and then <Katex tex="y=\tfrac{x}{2}-\tfrac12" />. Write <Katex tex="\underset{\sim}{r}(0)" />{' '}
          straight from the question as the constant, and check it at <Katex tex="t=0" />.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ15_2020() {
  return (
    <MCQShell
      question={
        <p>
          Two forces,{' '}
          <Katex tex="\underset{\sim}{F}_A=4\underset{\sim}{i}-2\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{F}_B=2\underset{\sim}{i}+5\underset{\sim}{j}" />, act on
          a particle of mass 3 kg. The particle is initially at rest at position{' '}
          <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}" />. All force components are
          measured in newtons and displacements are measured in metres.
          <br />
          The cartesian equation of the path of the particle is
        </p>
      }
      background={
        <Background title="Constant acceleration from rest: a straight line">
          <p>
            Antidifferentiating a constant <Katex tex="\underset{\sim}{a}" /> twice always gives{' '}
            <Katex tex="\underset{\sim}{r}=\underset{\sim}{r}_0+t\,\underset{\sim}{u}+\tfrac{t^2}{2}\underset{\sim}{a}" />,
            where <Katex tex="\underset{\sim}{r}_0" /> is the starting position and{' '}
            <Katex tex="\underset{\sim}{u}" /> the starting velocity. From rest,{' '}
            <Katex tex="\underset{\sim}{u}=\underset{\sim}{0}" /> and{' '}
            <Katex tex="\underset{\sim}{r}-\underset{\sim}{r}_0=\tfrac{t^2}{2}\underset{\sim}{a}" />{' '}
            is always a multiple of <Katex tex="\underset{\sim}{a}" />: the particle moves in a
            straight line from its starting point in the direction of{' '}
            <Katex tex="\underset{\sim}{a}" />. A parabola, as for a projectile, needs a starting
            velocity that points somewhere else.
          </p>
          <p>
            Mechanics is off the current study design, and one line here does use{' '}
            <Katex tex="\Sigma\underset{\sim}{F}=m\underset{\sim}{a}" />. Everything after
            that line — antidifferentiating a constant acceleration vector twice, then
            eliminating the parameter — is current vector calculus, so the question is worth
            doing with the first line handed to you.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\frac{x}{2}" /> },
        { letter: 'B', content: <Katex tex="y=\frac{x}{2}-\frac12" /> },
        { letter: 'C', content: <Katex tex="y=\frac{(x+1)^2}{2}+1" /> },
        { letter: 'D', content: <Katex tex="y=\frac{(x-1)^2}{2}+1" /> },
        { letter: 'E', content: <Katex tex="y=\frac{x}{2}+\frac12" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why a particle starting from rest moves in a straight line">
            <PathWidget />
          </Explore>
          <WrongMethod
            title="x − 1 = t², so substitute t = x − 1"
            source="23% chose D"
            working={<Katex display tex="y=1+\frac{t^2}{2}=1+\frac{(x-1)^2}{2}" />}
          >
            <p>
              From <Katex tex="x=1+t^2" />, <Katex tex="x-1" /> is <Katex tex="t^2" />, not{' '}
              <Katex tex="t" />. Substituting it for <Katex tex="t" /> squares it a second time and
              turns a straight line into option D's parabola. Since <Katex tex="y" /> also contains{' '}
              <Katex tex="t^2" />, replace <Katex tex="t^2" /> as a block.
            </p>
            <p>C and D, the two parabolas, together drew 41% of students.</p>
          </WrongMethod>
          <WrongMethod
            title="Antidifferentiate twice and leave the constants at zero"
            source="10% chose A"
            working={
              <>
                <Katex display tex="\underset{\sim}{r}=t^2\underset{\sim}{i}+\tfrac{t^2}{2}\underset{\sim}{j}" />
                <Katex display tex="x=t^2, \ y=\tfrac{t^2}{2} \implies y=\tfrac{x}{2}" />
              </>
            }
          >
            <p>
              The first constant really is zero (the particle starts at rest), but the second is
              the starting position, <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}" />. The
              five-second <Katex tex="(1, 1)" /> check in the last step catches it.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
