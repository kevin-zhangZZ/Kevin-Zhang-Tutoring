// 2022 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 17% correct.
// Three vectors summing to zero close into a triangle, then the cosine rule. Question text transcribed from the original paper.
// Solution is original.
// Interactive: spec-2022-mcq16-outside-angle (the force triangle with the 7 N force drawn from
// the head of the 5 N force: θ is measured from the 5 N force's continued direction, outside the
// triangle, and the closing side is 10 only when θ ≈ 68.2°; option B's θ ≈ 111.8° closes it at 6.93).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const OutsideAngleWidget = lazyWidget(() => import('../interactives/spec-2022-mcq16-outside-angle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 63, C: 8, D: 9, E: 3 },
  answer: 'A',
  comment: (
    <>
      The angle between the head and tail of the 5 and 7 N forces is <Katex tex="\pi-\theta" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{F_1}+\underset{\sim}{F_2}+\underset{\sim}{F_3} = \underset{\sim}{0}" />,
    reason: <>Equilibrium means the three forces add to the zero vector. Drawn head-to-tail, they close into a triangle with sides 5, 7 and 10.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F_1}+\underset{\sim}{F_2} = -\underset{\sim}{F_3} \implies \left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right| = 10" />,
    reason: <>The 5 N and 7 N forces together must exactly oppose the 10 N one, so their resultant has magnitude 10.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right|^2 = \left|\underset{\sim}{F_1}\right|^2+\left|\underset{\sim}{F_2}\right|^2+2\,\underset{\sim}{F_1}\cdot\underset{\sim}{F_2}" />,
    reason: <>Write <Katex tex="\left|\underset{\sim}{a}+\underset{\sim}{b}\right|^2" /> as <Katex tex="(\underset{\sim}{a}+\underset{\sim}{b})\cdot(\underset{\sim}{a}+\underset{\sim}{b})" /> and expand it like a bracket, using <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{a}=\left|\underset{\sim}{a}\right|^2" /> and <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=\underset{\sim}{b}\cdot\underset{\sim}{a}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F_1}\cdot\underset{\sim}{F_2} = 5\times7\cos(\theta)" />,
    reason: <><Katex tex="\theta" /> is the angle <em>between</em> the two forces. Both act on the particle, so they start from the same point, and that tail-to-tail angle is exactly the one in <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{100 = 25+49+2\times5\times7\cos(\theta)}" />,
    reason: <>Matches option <b>A</b>: a plus sign, because <Katex tex="\theta" /> is the angle between the forces, not an angle of the force triangle.</>,
    more: (
      <>
        <p>
          Why not B, which 63% chose? Option B is the cosine rule with <Katex tex="\theta" /> taken as the triangle&apos;s
          angle between the 5 and 7 sides. But <Katex tex="\theta" /> is the angle between the forces when both start
          from the same point. To build the triangle, the 7 N arrow is slid, without turning, so that it starts at the{' '}
          <em>head</em> of the 5 N arrow. There it still makes the angle <Katex tex="\theta" /> with the 5 N direction,
          now with that direction carried on past the head, so <Katex tex="\theta" /> lies outside the triangle. The
          triangle&apos;s own angle there is <Katex tex="\pi-\theta" /> (<Katex tex="180^\circ-\theta" /> in degrees),
          which is the examiner&apos;s report&apos;s point.
        </p>
        <p>
          The cosine rule with the correct inside angle gives{' '}
          <Katex tex="100=25+49-2\times5\times7\cos(\pi-\theta)" />, and <Katex tex="\cos(\pi-\theta)=-\cos(\theta)" />{' '}
          turns its minus into a plus: option A again. Solving it,{' '}
          <Katex tex="\cos(\theta)=\tfrac{26}{70}=\tfrac{13}{35}" />, so <Katex tex="\theta\approx68^\circ" />.
        </p>
        <p>
          Options C, D and E each put <Katex tex="\theta" /> next to the 10 N side, but <Katex tex="\theta" /> is
          between the 5 N and 7 N forces.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ16_2022() {
  return (
    <MCQShell
      question={
        <p>
          Three coplanar forces of magnitudes 5 N, 7 N and 10 N maintain a particle in
          equilibrium.
          <br />
          The angle <Katex tex="\theta" /> between the forces of magnitudes 5 N
          and 7 N can be found by solving which one of the following equations?
        </p>
      }
      background={
        <Background title="Force wording, vector mathematics">
          <p>
            Equilibrium of forces belongs to Mechanics, which Specialist Mathematics no longer
            has. But the only physics used is the one sentence "in equilibrium, the forces sum
            to the zero vector"; everything after that is expanding{' '}
            <Katex tex="\left|\underset{\sim}{a}+\underset{\sim}{b}\right|^2" /> with the
            scalar product, which is current content. Read it as a question about three
            vectors of lengths 5, 7 and 10 that add to zero.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="100=25+49+2\times5\times7\cos(\theta)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="100=25+49-2\times5\times7\cos(\theta)" /> },
        { letter: 'C', content: <Katex tex="25=100+49-2\times10\times7\cos(\theta)" /> },
        { letter: 'D', content: <Katex tex="49=25+100-2\times5\times10\cos(\theta)" /> },
        { letter: 'E', content: <Katex tex="49=25+100+2\times5\times10\cos(\theta)" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="θ sits outside the force triangle: the angle inside is 180° − θ">
          <OutsideAngleWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
