// 2022 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 17% correct.
// Three vectors summing to zero close into a triangle, then the cosine rule. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'

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
    reason: <>Equilibrium means the three vectors add to nothing, so drawn head-to-tail they close into a triangle with sides 5, 7 and 10.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F_1}+\underset{\sim}{F_2} = -\underset{\sim}{F_3} \implies \left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right| = 10" />,
    reason: <>The 5 N and 7 N forces together must exactly oppose the 10 N one, so their resultant has magnitude 10.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right|^2 = \left|\underset{\sim}{F_1}\right|^2+\left|\underset{\sim}{F_2}\right|^2+2\,\underset{\sim}{F_1}\cdot\underset{\sim}{F_2}" />,
    reason: <>Expanding the dot product of the sum with itself — the vector version of squaring a bracket.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F_1}\cdot\underset{\sim}{F_2} = 5\times7\cos(\theta)" />,
    reason: <><Katex tex="\theta" /> is the angle <em>between</em> the two forces, which is exactly the angle in the scalar product.</>,
  },
  {
    working: <Katex display tex="\boxed{100 = 25+49+2\times5\times7\cos(\theta)}" />,
    reason: <>Matches option <b>A</b>. The <b>plus</b> sign is the whole question: in the closed triangle the interior angle is <Katex tex="\pi-\theta" />, and <Katex tex="\cos(\pi-\theta)=-\cos(\theta)" /> turns the cosine rule's minus into a plus — option B uses the cosine rule with <Katex tex="\theta" /> itself. (Incidentally <Katex tex="\cos\theta=\tfrac{26}{70}=\tfrac{13}{35}" />, so <Katex tex="\theta\approx68^\circ" />.)</>,
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
      examinerReport={EXAMINER}
    />
  )
}
