// 2023 Mathematical Methods NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with
// no statistics. Probability: conditional probability across two boxes (choose a box, then a
// sweet). Question text transcribed from the original paper. Solution is original; the answer A
// agrees with the report's key and is confirmed exactly in sympy. Verified distractors:
// B 6/11 pools the 11 strawberry sweets as if each were equally likely; C 6/30 is strawberry-from-
// box-2 out of all 30 sweets; D 6/18 is Pr(S | Box 2), the conditional the wrong way round;
// E 3/18 is Pr(Box 2 ∩ S).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B_1)=\Pr(B_2)=\tfrac12" />,
    reason: <>&ldquo;Choose a box randomly&rdquo;: each box is equally likely, whatever it holds.</>,
  },
  {
    working: <Katex display tex="\Pr(S\mid B_1)=\tfrac{5}{12},\qquad \Pr(S\mid B_2)=\tfrac{6}{18}=\tfrac13" />,
    reason: <>Box 1 has <Katex tex="5+7=12" /> sweets, 5 of them strawberry; Box 2 has <Katex tex="6+12=18" />, 6 of them strawberry.</>,
  },
  {
    working: <Katex display tex="\Pr(S)=\tfrac12\cdot\tfrac{5}{12}+\tfrac12\cdot\tfrac13=\tfrac{5}{24}+\tfrac{4}{24}=\tfrac{9}{24}" />,
    reason: <>Total probability of strawberry: add the two branches of the tree, each one box probability times the chance of strawberry from that box.</>,
  },
  {
    working: <Katex display tex="\Pr(B_2\mid S)=\frac{\Pr(B_2\cap S)}{\Pr(S)}=\frac{\tfrac{4}{24}}{\tfrac{9}{24}}" />,
    reason: <>&ldquo;Given that you pick a strawberry sweet&rdquo; makes strawberry the condition: <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" /> with <Katex tex="\Pr(B_2\cap S)=\tfrac12\cdot\tfrac13=\tfrac{4}{24}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac49}" />,
    reason: <>Matches option <b>A</b>. Sense check: Box 2 is slightly less likely to give strawberry (<Katex tex="\tfrac13" /> against <Katex tex="\tfrac{5}{12}" />), so given strawberry it is a little less than an even chance that it came from Box 2 — and <Katex tex="\tfrac49\approx0.44" />.</>,
    more: <>Option <b>D</b>, <Katex tex="\tfrac{6}{18}" />, is <Katex tex="\Pr(S\mid B_2)" />, the conditional the wrong way round. Option <b>E</b>, <Katex tex="\tfrac{3}{18}" />, is <Katex tex="\Pr(B_2\cap S)" /> without dividing by <Katex tex="\Pr(S)" />. Option <b>C</b>, <Katex tex="\tfrac{6}{30}" />, counts Box 2&apos;s strawberries out of all 30 sweets. Option <b>B</b> is the trap shown below.</>,
  },
]

export default function MethodsQ14_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>There are two boxes of sweets.</p>
          <p>Box 1 contains five strawberry-flavoured sweets and seven lemon-flavoured sweets.</p>
          <p>Box 2 contains six strawberry-flavoured sweets and 12 lemon-flavoured sweets.</p>
          <p>
            You choose a box randomly and randomly select a single sweet. Given that you pick a
            strawberry-flavoured sweet, what is the probability that it came from Box 2?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{4}{9}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{6}{11}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{6}{30}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{6}{18}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{3}{18}" /> },
      ]}
      rows={ROWS}
      extras={
        <WrongMethod
          title="There are 11 strawberry sweets and 6 are in Box 2, so it's 6/11"
          working={<Katex display tex="\Pr(B_2\mid S)=\tfrac{6}{5+6}=\tfrac{6}{11}" />}
        >
          Counting sweets treats every sweet as equally likely to be picked, as if all 30 were
          tipped into one bag. They aren&apos;t: you pick a box first, so each of Box 1&apos;s 12
          sweets has chance <Katex tex="\tfrac12\cdot\tfrac1{12}=\tfrac1{24}" />, while each of Box
          2&apos;s 18 sweets has only <Katex tex="\tfrac12\cdot\tfrac1{18}=\tfrac1{36}" />. Weight
          the sweets properly — <Katex tex="\tfrac{6/36}{5/24+6/36}=\tfrac49" /> — or draw the tree.
        </WrongMethod>
      }
      examinerReport={EXAMINER}
    />
  )
}
