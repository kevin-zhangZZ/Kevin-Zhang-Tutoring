// 2015 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 49% correct.
// A vector resolute, dressed as a force question. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 4, C: 10, D: 7, E: 29 },
  answer: 'A',
  noAnswer: 1,
  comment: <>Require <Katex tex="\underset{\sim}{F}\cdot\hat{\underset{\sim}{w}}\ \hat{\underset{\sim}{w}}" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{resolute of }\underset{\sim}{F}\text{ along }\underset{\sim}{w} = \left(\underset{\sim}{F}\cdot\hat{\underset{\sim}{w}}\right)\hat{\underset{\sim}{w}}" />,
    reason: <>"Component in the direction of" asks for the vector resolute: the scalar resolute <Katex tex="\underset{\sim}{F}\cdot\hat{\underset{\sim}{w}}" /> times the unit vector <Katex tex="\hat{\underset{\sim}{w}}" />.</>,
    more: <>The unit vector appears <em>twice</em> — once to find the length of the projection, once to give it a direction. That is the examiner's one-line comment. Dropping one copy gives E (the most common wrong answer), and dropping both gives D. Equivalently, the vector resolute is <Katex tex="\dfrac{\underset{\sim}{F}\cdot\underset{\sim}{w}}{\underset{\sim}{w}\cdot\underset{\sim}{w}}\,\underset{\sim}{w}" />, which here gives <Katex tex="\tfrac{a+b}{2}\,\underset{\sim}{w}" /> straight away.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{w}\right| = \sqrt{1^2+1^2} = \sqrt2 \implies \hat{\underset{\sim}{w}} = \frac{\underset{\sim}{w}}{\sqrt2}" />,
    reason: <>Divide <Katex tex="\underset{\sim}{w}=\underset{\sim}{i}+\underset{\sim}{j}" /> by its length to get the unit vector.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{F}\cdot\hat{\underset{\sim}{w}} = \frac{(a)(1)+(b)(1)}{\sqrt2} = \frac{a+b}{\sqrt2}" />,
    reason: <>Dot product: multiply matching components and add. This scalar resolute is a <em>number</em>, not yet a vector.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{F}\cdot\hat{\underset{\sim}{w}}\right)\hat{\underset{\sim}{w}} = \frac{a+b}{\sqrt2}\times\frac{\underset{\sim}{w}}{\sqrt2}" />,
    reason: <>Multiplying by the unit vector again to turn the scalar back into a vector along <Katex tex="\underset{\sim}{w}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{a+b}{2}\right)\underset{\sim}{w}}" />,
    reason: <>Matches option <b>A</b>, since <Katex tex="\sqrt2\times\sqrt2=2" />.</>,
    more: <>Where the others come from: E, chosen by 29% of students, multiplies the scalar resolute <Katex tex="\tfrac{a+b}{\sqrt2}" /> by <Katex tex="\underset{\sim}{w}" /> instead of by <Katex tex="\hat{\underset{\sim}{w}}" />, so it divides by <Katex tex="\sqrt2" /> only once. D, <Katex tex="(a+b)\,\underset{\sim}{w}" />, is <Katex tex="(\underset{\sim}{F}\cdot\underset{\sim}{w})\,\underset{\sim}{w}" />, with no unit vector at all. B and C are multiples of <Katex tex="\underset{\sim}{F}" />, so in general they point along <Katex tex="\underset{\sim}{F}" />, not along <Katex tex="\underset{\sim}{w}" />.</>,
  },
]

export default function SpecialistQ15_2015() {
  return (
    <MCQShell
      question={
        <p>
          The component of the force{' '}
          <Katex tex="\underset{\sim}{F}=a\underset{\sim}{i}+b\underset{\sim}{j}" />, where{' '}
          <Katex tex="a" /> and <Katex tex="b" /> are non-zero real constants, in the
          direction of the vector{' '}
          <Katex tex="\underset{\sim}{w}=\underset{\sim}{i}+\underset{\sim}{j}" />, is
        </p>
      }
      background={
        <p>
          The word "force" is the only mechanics in this question, and mechanics is no longer
          part of the study design. Nothing here depends on it: replace{' '}
          <Katex tex="\underset{\sim}{F}" /> with any vector and the question is a pure vector
          resolute, which is current content — so it is worth doing.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(\tfrac{a+b}{2}\right)\underset{\sim}{w}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{\underset{\sim}{F}}{a+b}" /> },
        { letter: 'C', content: <Katex tex="\left(\tfrac{a+b}{a^2+b^2}\right)\underset{\sim}{F}" /> },
        { letter: 'D', content: <Katex tex="(a+b)\,\underset{\sim}{w}" /> },
        { letter: 'E', content: <Katex tex="\left(\tfrac{a+b}{\sqrt2}\right)\underset{\sim}{w}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
