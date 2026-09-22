// 2020 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 76% correct. The
// word "force" is dressing; the mathematics is a scalar resolute, which is current
// Specialist content. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 76, C: 8, D: 5, E: 3 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{scalar resolute of } \underset{\sim}{F} \text{ along } \underset{\sim}{d} = \frac{\underset{\sim}{F}\cdot\underset{\sim}{d}}{\left|\underset{\sim}{d}\right|}" />,
    reason: <>Dividing by <Katex tex="\left|\underset{\sim}{d}\right|" /> once, not twice — that is what separates a scalar resolute from a vector one.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F}\cdot\underset{\sim}{d} = (1)(2)+(6)(-3)+(-18)(-6)" />,
    reason: 'Component by component.',
  },
  {
    working: <Katex display tex="= 2-18+108 = 92" />,
    reason: 'The two negatives in the last term make it positive.',
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{d}\right| = \sqrt{2^2+3^2+6^2} = \sqrt{49} = 7" />,
    reason: <>A 2–3–6–7 Pythagorean quadruple. Option A uses 19, which is <Katex tex="\left|\underset{\sim}{F}\right|" />-flavoured rather than <Katex tex="\left|\underset{\sim}{d}\right|" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{92}{7}}" />,
    reason: <>Positive already, so its magnitude is itself. Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2020() {
  return (
    <MCQShell
      question={
        <p>
          The magnitude of the component of the force{' '}
          <Katex tex="\underset{\sim}{F}=\underset{\sim}{i}+6\underset{\sim}{j}-18\underset{\sim}{k}" />{' '}
          that acts in the direction{' '}
          <Katex tex="\underset{\sim}{d}=2\underset{\sim}{i}-3\underset{\sim}{j}-6\underset{\sim}{k}" />{' '}
          is
        </p>
      }
      background={
        <Background title="Force wording, vector mathematics">
          <p>
            Mechanics is no longer an area of study in Specialist Mathematics, but nothing
            in this question depends on it. Delete the word "force" and you have a scalar
            resolute of one vector along another — squarely current content, and worth
            doing.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{92}{19}" /> },
        { letter: 'B', content: <Katex tex="\frac{92}{7}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\frac{124}{7}" /> },
        { letter: 'D', content: <Katex tex="\frac{92}{11}" /> },
        { letter: 'E', content: <Katex tex="\frac{18}{7}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
