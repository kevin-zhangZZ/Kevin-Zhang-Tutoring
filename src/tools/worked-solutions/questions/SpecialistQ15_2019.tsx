// 2019 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 35% correct — the
// hardest MCQ on the paper. A particle moving along the x-axis is given a constant acceleration
// perpendicular to its velocity; describe the resulting motion. The word "force" is flavour
// text here: the mathematics is pure vector kinematics (antidifferentiate a constant
// acceleration vector), with no force analysis, so this question is unaffected by the removal
// of Mechanics from the study design. Question text transcribed from the original paper; VCAA
// printed no diagram, so the path shown is this site's own explanatory figure (matplotlib).
// Solution is original; itute also gives E.
//
// "u is a real constant" does not by itself exclude u = 0 (which would make C true), but the
// stem says the particle "is moving" along the x-axis, so u ≠ 0; the working says so where it
// divides by u.
//
// Extras: interactives/spec-2019-mcq15-fixed-push.tsx animates the motion (drawn with u = 2,
// α = −1) with velocity and acceleration arrows and strobe dots, and toggles a push that turns
// to stay perpendicular to the velocity (the circle option D would need). WrongMethods: "negative
// acceleration means slowing down" (gives A exactly; 19% chose A) and "perpendicular force means
// circular motion" (D; 17% chose D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import pathSrc from './spec-2019-mcq15-path.png'

const PushWidget = lazyWidget(() => import('../interactives/spec-2019-mcq15-fixed-push'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 17, C: 12, D: 17, E: 35 },
  noAnswer: 1,
  answer: 'E',
  comment: <>Antidifferentiate to find <Katex tex="\underset{\sim}{r}(t)" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = \alpha\underset{\sim}{j} \quad (\alpha<0, \text{ constant})" />,
    reason: <>The acceleration is entirely in the <Katex tex="\underset{\sim}{j}" /> direction, perpendicular to the initial motion along the <Katex tex="x" />-axis. Read the sign carefully: <Katex tex="\alpha" /> multiplies <Katex tex="\underset{\sim}{j}" />, so &ldquo;negative&rdquo; only says the push points down (the <Katex tex="-\underset{\sim}{j}" /> direction). It does not mean the particle slows down.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \int\underset{\sim}{a}\,dt = \alpha t\,\underset{\sim}{j} + \underset{\sim}{c}" />,
    reason: <>How would I know what to do? To describe a path, find <Katex tex="\underset{\sim}{r}(t)" />, and the only way from an acceleration to a position is to antidifferentiate twice. Do it component by component, with a constant <em>vector</em>.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(0)=u\underset{\sim}{i} \implies \underset{\sim}{c}=u\underset{\sim}{i}" />,
    reason: <>The given initial velocity fixes the constant.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = u\,\underset{\sim}{i} + \alpha t\,\underset{\sim}{j}" />,
    reason: <>The <Katex tex="\underset{\sim}{i} " /> component never changes — nothing accelerates the particle horizontally — while the <Katex tex="\underset{\sim}{j} " /> component grows steadily negative.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = ut\,\underset{\sim}{i} + \dfrac{\alpha t^2}{2}\,\underset{\sim}{j}" />,
    reason: <>Antidifferentiate again. The particle is somewhere on the <Katex tex="x" />-axis at <Katex tex="t=0" />; put the origin there. Starting elsewhere on the axis only slides the path sideways, it doesn&apos;t change its shape.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = ut \implies t = \dfrac{x}{u}" />
        <Katex display tex="y = \dfrac{\alpha}{2}\left(\dfrac{x}{u}\right)^2 = \dfrac{\alpha}{2u^2}x^2" />
      </>
    ),
    reason: <>Eliminate <Katex tex="t" /> to get the cartesian path. Dividing by <Katex tex="u" /> is safe because the particle <em>is moving</em>, so <Katex tex="u\neq0" />. Then <Katex tex="y" /> is a constant multiple of <Katex tex="x^2" />: a parabola, opening downwards since <Katex tex="\alpha<0" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={pathSrc} alt="Parabolic path: the particle starts at the origin moving right along the x-axis with velocity u i and curves downward under the constant acceleration α j, α < 0 — this site's own explanatory figure" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>Exactly the projectile picture: constant horizontal velocity, constant vertical acceleration.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{a parabola (option E)}}" />,
    reason: <>Matches option <b>E</b>. Checking the others: the speed <Katex tex="\sqrt{u^2+\alpha^2t^2}" /> <em>increases</em>, so A and B are out; the horizontal velocity stays <Katex tex="u\neq0" />, so the particle never travels parallel to the <Katex tex="y" />-axis, ruling out C; and a circular arc needs the acceleration to turn so it stays perpendicular to the current velocity, whereas here its direction is fixed, ruling out D.</>,
  },
]

export default function SpecialistQ15_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A particle is moving along the <Katex tex="x" />-axis with velocity{' '}
            <Katex tex="\underset{\sim}{v}=u\underset{\sim}{i}" />, where <Katex tex="u" /> is a
            real constant.
            <br />
            At time <Katex tex="t=0" />, a force acts on the particle, causing it
            to accelerate with acceleration{' '}
            <Katex tex="\underset{\sim}{a}=\alpha\underset{\sim}{j}" />, where{' '}
            <Katex tex="\alpha" /> is a negative real constant.
          </p>
          <p>Which one of the following statements correctly describes the motion of the particle for <Katex tex="t>0" />?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>The particle slows down, stops momentarily and then begins to move in the opposite direction to its original motion.</> },
        { letter: 'B', content: <>The particle continues to travel along the <Katex tex="x" />-axis with decreasing speed.</> },
        { letter: 'C', content: <>The particle travels parallel to the <Katex tex="y" />-axis.</> },
        { letter: 'D', content: <>The particle moves along a circular arc.</> },
        { letter: 'E', content: <>The particle moves along a parabola.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="A push that never turns bends the path into a parabola, not a circle">
            <PushWidget />
          </Explore>
          <WrongMethod
            title="α is negative, so the particle decelerates"
            source="19% chose A"
            working={
              <>
                <Katex display tex="v=u+\alpha t=0 \text{ when } t=-\tfrac{u}{\alpha}" />
                <Katex display tex="\text{then } v \text{ changes sign: it reverses (option A)}" />
              </>
            }
          >
            <p>
              <Katex tex="v=u+\alpha t" /> is the rule for an acceleration <em>along</em> the line of motion,{' '}
              <Katex tex="\underset{\sim}{a}=\alpha\underset{\sim}{i}" />. Here <Katex tex="\alpha" /> multiplies{' '}
              <Katex tex="\underset{\sim}{j}" />: the push is at right angles to the motion, and its sign only says which way
              it points. Nothing acts along <Katex tex="\underset{\sim}{i}" />, so the <Katex tex="\underset{\sim}{i}" />{' '}
              component of the velocity stays <Katex tex="u" /> for ever. Catch it by writing the acceleration in components
              before reading anything into a minus sign.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The force is perpendicular to the velocity, so the motion is circular"
            source="17% chose D"
            working={
              <>
                <Katex display tex="\alpha\underset{\sim}{j}\cdot u\underset{\sim}{i}=0" />
                <Katex display tex="\underset{\sim}{a}\perp\underset{\sim}{v} \implies \text{circular arc (option D)}" />
              </>
            }
          >
            <p>
              That dot product uses the velocity at <Katex tex="t=0" /> only. A moment later,{' '}
              <Katex tex="\underset{\sim}{v}(t)\cdot\underset{\sim}{a}=\left(u\underset{\sim}{i}+\alpha t\underset{\sim}{j}\right)\cdot\alpha\underset{\sim}{j}=\alpha^2t" />,
              which is positive for <Katex tex="t>0" />. The push now has a part along the motion, and the speed{' '}
              <Katex tex="\sqrt{u^2+\alpha^2t^2}" /> grows. A circle needs the acceleration to stay perpendicular to the{' '}
              <em>current</em> velocity at every instant, turning with it; turn on the toggle in the diagram above to see
              that motion.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
