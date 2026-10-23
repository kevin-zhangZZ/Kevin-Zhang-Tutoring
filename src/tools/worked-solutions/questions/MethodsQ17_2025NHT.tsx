// 2025 Mathematical Methods NHT — Exam 2, MCQ 17. The NHT report gives the answer key and a
// worked comment (a tree diagram, then the conditional probability), with no statistics.
// Probability: conditional probability without replacement. Question text transcribed from the
// original paper (image-only, read from the rendered page); the report's comment is transcribed
// from the rendered report page, with its tree summarised in words. Solution is original; the
// answer A agrees with the report's key ((8/15) ÷ (2/3) = 4/5).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      A tree diagram: first pick defective <Katex tex="\tfrac{6}{10}" /> or good <Katex tex="\tfrac{4}{10}" />; after a
      defective, defective <Katex tex="\tfrac59" /> or good <Katex tex="\tfrac49" />; after a good, defective{' '}
      <Katex tex="\tfrac69" /> or good <Katex tex="\tfrac39" />.
      <br />
      Then the probability of at most one defective is
      <br />
      <Katex tex="\Pr(D\le1)=1-\Pr(D=2)=1-\tfrac{6}{10}\times\tfrac59=\tfrac23" />
      <br />
      The probability of exactly one defective is
      <br />
      <Katex tex="\Pr(D=1)=\tfrac{6}{10}\times\tfrac49+\tfrac{4}{10}\times\tfrac69=\tfrac{8}{15}" />
      <br />
      The required conditional probability is
      <br />
      <Katex tex="\Pr(D=1\mid D\le1)=\tfrac{8}{15}\div\tfrac23=\tfrac45" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(D=1\mid D\le1)=\frac{\Pr(D=1)}{\Pr(D\le1)}" />,
    reason: <>&ldquo;It is known that&rdquo; is a given condition. Exactly one defective is already inside &ldquo;at most one&rdquo;, so the intersection is just <Katex tex="\Pr(D=1)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(D=1)=\tfrac{6}{10}\cdot\tfrac49+\tfrac{4}{10}\cdot\tfrac69=\tfrac{48}{90}=\tfrac{8}{15}" />,
    reason: <>Defective then good, or good then defective. Without replacement, the second pick is out of 9.</>,
  },
  {
    working: <Katex display tex="\Pr(D\le1)=1-\Pr(D=2)=1-\tfrac{6}{10}\cdot\tfrac59=\tfrac23" />,
    reason: <>At most one defective is everything except two defectives.</>,
  },
  {
    working: <Katex display tex="\frac{8/15}{2/3}=\frac{8}{15}\cdot\frac32" />,
  },
  {
    working: <Katex display tex="\boxed{\tfrac45}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>D</b>, <Katex tex="\tfrac{8}{15}" />, is <Katex tex="\Pr(D=1)" /> without the condition, and option <b>B</b>, <Katex tex="\tfrac23" />, is the condition&rsquo;s own probability. A quicker count gives the same answer: of the <Katex tex="\binom{10}{2}=45" /> pairs, <Katex tex="6\times4=24" /> have exactly one defective and <Katex tex="\binom42=6" /> have none, so the answer is <Katex tex="\tfrac{24}{24+6}=\tfrac45" />.</>,
  },
]

export default function MethodsQ17_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          In a set of 10 products, six products are defective. Two products are randomly selected, without replacement,
          from the set of 10 products. It is known that at most one of the two selected products is defective.
          <br />
          What is the probability that exactly one of the two selected products is defective?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac45" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac23" /> },
        { letter: 'C', content: <Katex tex="\tfrac{8}{13}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{8}{15}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
