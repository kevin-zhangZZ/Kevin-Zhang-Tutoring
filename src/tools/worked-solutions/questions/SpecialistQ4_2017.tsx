// 2017 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 53% correct.
// The n-th roots of 1 + i. Question text transcribed from the original paper; solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 11, D: 15, E: 53 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1+i = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}\right)" />,
    reason: <>Modulus <Katex tex="\sqrt{1^2+1^2}=\sqrt2" />; argument <Katex tex="\tfrac{\pi}{4}" /> since the point sits on the line <Katex tex="y=x" /> in the first quadrant.</>,
  },
  {
    working: <Katex display tex="z^n = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}+2k\pi\right), \quad k\in Z" />,
    reason: <>Add the full turns <em>before</em> taking roots — that is what produces <Katex tex="n" /> distinct answers rather than one.</>,
  },
  {
    working: <Katex display tex="z = \left(\sqrt2\right)^{\frac1n}\operatorname{cis}\!\left(\frac{\frac{\pi}{4}+2k\pi}{n}\right)" />,
    reason: <>De Moivre with index <Katex tex="\tfrac1n" />: take the <Katex tex="n" />th root of the modulus and divide the argument by <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\left(\sqrt2\right)^{\frac1n} = \left(2^{\frac12}\right)^{\frac1n} = 2^{\frac{1}{2n}}" />,
    reason: <>The modulus. Writing <Katex tex="2^{1/n}" /> instead is option D, the most popular wrong answer — it forgets that the modulus was <Katex tex="\sqrt2" />, not <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\frac{\frac{\pi}{4}+2k\pi}{n} = \frac{\pi}{4n}+\frac{2k\pi}{n}" />,
    reason: <>Both terms get divided by <Katex tex="n" />. Option C divides only the second, leaving <Katex tex="\tfrac{\pi}{4}" /> untouched.</>,
  },
  {
    working: <Katex display tex="\boxed{2^{\frac{1}{2n}}\operatorname{cis}\!\left(\frac{\pi}{4n}+\frac{2k\pi}{n}\right),\ k\in Z}" />,
    reason: <>Matches option <b>E</b>. The final detail is <Katex tex="k\in Z" />, not <Katex tex="k\in R" /> — only whole turns give solutions, which is what separates E from A.</>,
  },
]

export default function SpecialistQ4_2017() {
  return (
    <MCQShell
      question={
        <p>
          The solutions to <Katex tex="z^n=1+i" />, <Katex tex="n\in Z^+" /> are given by
        </p>
      }
      background={
        <p>
          Three things separate the five options: the <em>modulus</em> (is it{' '}
          <Katex tex="2^{1/n}" /> or <Katex tex="2^{1/(2n)}" />?), whether the{' '}
          <Katex tex="\tfrac{\pi}{4}" /> was divided by <Katex tex="n" /> as well, and
          whether <Katex tex="k" /> ranges over the integers or the reals. Check all three
          before committing.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2k\pi}{n}\right),\ k\in R" /> },
        { letter: 'B', content: <Katex tex="2^{\frac{1}{n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+2k\pi\right),\ k\in Z" /> },
        { letter: 'C', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4}+\tfrac{2k\pi}{n}\right),\ k\in R" /> },
        { letter: 'D', content: <Katex tex="2^{\frac{1}{n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2k\pi}{n}\right),\ k\in Z" /> },
        { letter: 'E', content: <Katex tex="2^{\frac{1}{2n}}\operatorname{cis}\!\left(\tfrac{\pi}{4n}+\tfrac{2k\pi}{n}\right),\ k\in Z" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
