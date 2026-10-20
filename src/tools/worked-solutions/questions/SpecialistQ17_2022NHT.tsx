// 2022 Specialist NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with no
// statistics. Three vectors summing to zero: the magnitude of the third from |F1 + F2| via the
// scalar product (kept with a Background note on the force wording, per KZ's study-design
// ruling). Question text transcribed from the original paper; the force diagram is cropped from
// the original VCAA exam PDF at 300 dpi. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Background } from '../QuestionParts'
import forcesSrc from './spec-2022nht-mcq17-forces.png'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{F_1}+\underset{\sim}{F_2}+\underset{\sim}{F_3} &= \underset{\sim}{0}\\ \underset{\sim}{F_3} &= -\left(\underset{\sim}{F_1}+\underset{\sim}{F_2}\right)\end{aligned}" />,
    reason: <>Equilibrium means the three forces add to the zero vector, so <Katex tex="\underset{\sim}{F_3}" /> exactly cancels the sum of the other two.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F_3}\right| = \left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right|" />,
    reason: <>A vector and its negative have the same length.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F_1}+\underset{\sim}{F_2}\right|^2 = \left|\underset{\sim}{F_1}\right|^2+\left|\underset{\sim}{F_2}\right|^2+2\,\underset{\sim}{F_1}\cdot\underset{\sim}{F_2}" />,
    reason: <>Write <Katex tex="\left|\underset{\sim}{a}+\underset{\sim}{b}\right|^2" /> as <Katex tex="(\underset{\sim}{a}+\underset{\sim}{b})\cdot(\underset{\sim}{a}+\underset{\sim}{b})" /> and expand it like a bracket, using <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{a}=|\underset{\sim}{a}|^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{F_1}\cdot\underset{\sim}{F_2} &= 10\times8\times\cos(120^\circ)\\ &= 80\times\left(-\tfrac12\right) = -40\end{aligned}" />,
    reason: <>The 120° marked in the question is the angle between <Katex tex="\underset{\sim}{F_1}" /> and <Katex tex="\underset{\sim}{F_2}" /> drawn from the same point, which is exactly the angle in <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F_3}\right|^2 = 100+64+2(-40) = 84" />,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{F_3}\right| = \sqrt{84} = 2\sqrt{21}\ \mathrm{N}}" />,
    reason: <>Matches option <b>A</b>. (<Katex tex="84=4\times21" />, so <Katex tex="\sqrt{84}=2\sqrt{21}\approx9.17" />.)</>,
    more: (
      <>
        <p>
          Option <b>C</b>, <Katex tex="2\sqrt{61}=\sqrt{244}" />, is the cosine rule with 120° used as the angle{' '}
          <em>inside</em> a force triangle: <Katex tex="100+64-2\times80\cos(120^\circ)=244" />. Drawn head to tail,
          the triangle&rsquo;s angle between the 10 and 8 sides is <Katex tex="180^\circ-120^\circ=60^\circ" />, and{' '}
          <Katex tex="100+64-2\times80\cos(60^\circ)=84" /> agrees with the answer above. Option <b>B</b>,{' '}
          <Katex tex="2\sqrt{41}=\sqrt{164}" />, drops the dot-product term altogether, which would only be right if the
          forces were perpendicular.
        </p>
        <p>
          Plausibility: two forces 120° apart partly cancel, so their sum should be shorter than either{' '}
          <Katex tex="10+8" /> or a right-angled <Katex tex="\sqrt{164}\approx12.8" />; 9.17 is.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ17_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          A particle acted on by three coplanar forces, <Katex tex="\underset{\sim}{F_1}" />,{' '}
          <Katex tex="\underset{\sim}{F_2}" /> and <Katex tex="\underset{\sim}{F_3}" />, is in equilibrium, as shown in
          the diagram below. The angle between <Katex tex="\underset{\sim}{F_1}" /> and{' '}
          <Katex tex="\underset{\sim}{F_2}" /> is 120°, where <Katex tex="\left|\underset{\sim}{F_1}\right|=10" /> N
          and <Katex tex="\left|\underset{\sim}{F_2}\right|=8" /> N.
          <br />
          The magnitude of <Katex tex="\underset{\sim}{F_3}" />, in newtons, is
        </p>
      }
      diagram={
        <img
          loading="lazy"
          decoding="async"
          src={forcesSrc}
          alt="Three force arrows drawn from one point: F1 pointing up and to the left, F2 pointing right and slightly up, with the angle 120° marked between them, and F3 pointing down and slightly left. From the original 2022 NHT VCAA exam paper"
          className="w-full max-w-[260px]"
        />
      }
      background={
        <Background title="Force wording, vector mathematics">
          <p>
            Equilibrium of forces belongs to Mechanics, which Specialist Mathematics no longer has.
            But the only physics used is the one sentence &ldquo;in equilibrium, the forces sum to the
            zero vector&rdquo;; everything after that is expanding{' '}
            <Katex tex="\left|\underset{\sim}{a}+\underset{\sim}{b}\right|^2" /> with the scalar
            product, which is current content. Read it as a question about three vectors that add to
            zero, two of them of lengths 10 and 8 at 120° to each other.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\sqrt{21}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="2\sqrt{41}" /> },
        { letter: 'C', content: <Katex tex="2\sqrt{61}" /> },
        { letter: 'D', content: <Katex tex="4\sqrt3" /> },
        { letter: 'E', content: <Katex tex="4\sqrt{21}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
