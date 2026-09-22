// 2019 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 51% correct.
// The angle between two forces acting on a mass.
//
// Newton's second law is off the current study design, but the skip guide's own row for this
// question records it as doable: accept one substitution, net force = mass × acceleration,
// so F₁ + F₂ = 3(√3 i + j). Everything after that is ordinary vector work — subtract to get
// F₂, then use the dot product for the angle. Guide §13.7 — judge the mathematics, not the
// vocabulary; the same reading is applied to 2018 Exam 2 MCQ 15.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 16, C: 11, D: 51, E: 13 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\underset{\sim}{F}_1+\underset{\sim}{F}_2 = 3\left(\sqrt3\,\underset{\sim}{i}+\underset{\sim}{j}\right) \implies \underset{\sim}{F}_2 = 3\sqrt3\,\underset{\sim}{i}+\underset{\sim}{j}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{F}_1+\underset{\sim}{F}_2 = m\underset{\sim}{a} = 3\left(\sqrt3\,\underset{\sim}{i}+\underset{\sim}{j}\right)" />,
    reason: <>The one substitution the question needs: the <em>net</em> force is mass times acceleration. Everything from here is vector algebra.</>,
  },
  {
    working: <Katex display tex="= 3\sqrt3\,\underset{\sim}{i}+3\underset{\sim}{j}" />,
    reason: <>Multiplying through by 3.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F}_2 = \left(3\sqrt3\,\underset{\sim}{i}+3\underset{\sim}{j}\right)-2\underset{\sim}{j}" />,
    reason: <>Subtracting the given <Katex tex="\underset{\sim}{F}_1=2\underset{\sim}{j}" />. The forces add as vectors, so the second one is the difference.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F}_2 = 3\sqrt3\,\underset{\sim}{i}+\underset{\sim}{j}" />,
    reason: <>Only the <Katex tex="\underset{\sim}{j}" /> component changes: <Katex tex="3-2=1" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F}_1\cdot\underset{\sim}{F}_2 = (0)\left(3\sqrt3\right)+(2)(1) = 2" />,
    reason: <>The dot product. <Katex tex="\underset{\sim}{F}_1" /> has no <Katex tex="\underset{\sim}{i}" /> component, so only the second term survives.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{F}_1\right| = 2, \qquad \left|\underset{\sim}{F}_2\right| = \sqrt{27+1} = 2\sqrt7" />,
    reason: <><Katex tex="\left(3\sqrt3\right)^2=9\times3=27" />, and <Katex tex="\sqrt{28}=2\sqrt7" />.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{F}_1\cdot\underset{\sim}{F}_2}{\left|\underset{\sim}{F}_1\right|\left|\underset{\sim}{F}_2\right|} = \frac{2}{2\times2\sqrt7} = \frac{1}{2\sqrt7}" />,
    reason: <>Positive, so the angle is already acute — no adjustment by <Katex tex="\pi" /> is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \arccos\!\left(\frac{1}{2\sqrt7}\right)}" />,
    reason: <>Option D, about <Katex tex="79^\circ" />. Options B and E subtract from <Katex tex="\pi" />, which would give the obtuse angle between <Katex tex="\underset{\sim}{F}_1" /> and <Katex tex="-\underset{\sim}{F}_2" />; option A uses <Katex tex="\left|\underset{\sim}{F}_2\right|" /> as if the acceleration itself were the second force.</>,
  },
]

export default function SpecialistQ13_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Two forces, <Katex tex="\underset{\sim}{F}_1" /> and{' '}
            <Katex tex="\underset{\sim}{F}_2" />, both measured in newtons, act on a mass of
            3 kg, producing an acceleration of{' '}
            <Katex tex="\sqrt3\,\underset{\sim}{i}+\underset{\sim}{j}" /> ms<sup>−2</sup>.
          </p>
          <p>
            Given that <Katex tex="\underset{\sim}{F}_1=2\underset{\sim}{j}" />, the acute
            angle between <Katex tex="\underset{\sim}{F}_1" /> and{' '}
            <Katex tex="\underset{\sim}{F}_2" /> is
          </p>
        </>
      }
      background={
        <Background title="Mechanics wording, vector mathematics">
          <p>
            Newton's second law is no longer on the study design, but the skip guide records
            this question as doable, and it is worth attempting: accept the single
            substitution <Katex tex="\underset{\sim}{F}_1+\underset{\sim}{F}_2=m\underset{\sim}{a}" />{' '}
            and nothing mechanical remains.
          </p>
          <p>
            After that it is ordinary vector work — subtract to find{' '}
            <Katex tex="\underset{\sim}{F}_2" />, then use the dot product for the angle. The
            same reading applies to 2018 Exam 2 MCQ 15.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\arccos\!\left(\tfrac{1}{\sqrt3}\right)" /> },
        { letter: 'B', content: <Katex tex="\pi-\arccos\!\left(\tfrac{1}{\sqrt3}\right)" /> },
        { letter: 'C', content: <Katex tex="\tfrac\pi6" /> },
        { letter: 'D', content: <Katex tex="\arccos\!\left(\tfrac{1}{2\sqrt7}\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\pi-\arccos\!\left(\tfrac{1}{2\sqrt7}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
