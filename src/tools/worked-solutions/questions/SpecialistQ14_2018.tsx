// 2018 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 75% correct. The
// scalar resolute of one vector in the direction of another. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Value checked in sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 11, C: 75, D: 3, E: 7 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Scalar resolute of } \underset{\sim}{a} \text{ in the direction of } \underset{\sim}{b} = \underset{\sim}{a}\cdot\hat{\underset{\sim}{b}} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|}" />,
    reason: <>A <em>scalar</em> resolute is a number. Divide by <Katex tex="\left|\underset{\sim}{b}\right|" /> once, to turn <Katex tex="\underset{\sim}{b}" /> into a unit vector.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} = 3\underset{\sim}{i} + 0\underset{\sim}{j} - 2\underset{\sim}{k}" />,
    reason: <>Writing in the missing <Katex tex="\underset{\sim}{j}" /> component keeps the dot product honest.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (3)(-1)+(0)(2)+(-2)(3) = -3-6 = -9" />,
    reason: <>Negative, so the angle between them is obtuse and the resolute will be negative too.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right| = \sqrt{(-1)^2+2^2+3^2} = \sqrt{14}" />,
    reason: <>The modulus of <Katex tex="\underset{\sim}{b} = -\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}" />. Note it is <Katex tex="\underset{\sim}{b}" /> that is normalised, not <Katex tex="\underset{\sim}{a}" /> — the direction named in the question is the one that becomes a unit vector.</>,
  },
  {
    working: <Katex display tex="\frac{-9}{\sqrt{14}} = \frac{-9\sqrt{14}}{14}" />,
    reason: <>Rationalising the denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{9\sqrt{14}}{14}}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> uses <Katex tex="\sqrt{13}=\left|\underset{\sim}{a}\right|" /> — the wrong vector normalised. Option <b>B</b>, chosen by <Katex tex="11\%" />, is the <em>vector</em> resolute (it divides by <Katex tex="\left|\underset{\sim}{b}\right|^2=14" /> and keeps the direction), which answers a different question.</>,
  },
]

export default function SpecialistQ14_2018() {
  return (
    <MCQShell
      question={
        <p>
          The scalar resolute of{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}-2\underset{\sim}{k}" /> in the
          direction of{' '}
          <Katex tex="\underset{\sim}{b}=-\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}" />{' '}
          is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{9\sqrt{13}}{13}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{9}{14}\left(-\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{9\sqrt{14}}{14}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-\dfrac{9}{13}\left(3\underset{\sim}{i}-2\underset{\sim}{k}\right)" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{\sqrt{14}}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Scalar resolute versus vector resolute">
          <p>
            Both start from the same dot product, and the options here include both answers,
            so the distinction decides the mark.
          </p>
          <p>
            <b>Scalar</b> resolute:{' '}
            <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|}" />{' '}
            — a single number, the signed length of the shadow.
          </p>
          <p>
            <b>Vector</b> resolute:{' '}
            <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\underset{\sim}{b}" />{' '}
            — the shadow itself, still pointing along <Katex tex="\underset{\sim}{b}" />.
          </p>
          <p>
            Also check <em>which</em> vector is being resolved. "The resolute of{' '}
            <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
            <Katex tex="\underset{\sim}{b}" />" normalises <Katex tex="\underset{\sim}{b}" />.
          </p>
        </Background>
      }
    />
  )
}
