// 2018 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 60% correct.
// Independent events with Pr(B) = 2Pr(A) and a given union, leading to a quadratic with one
// inadmissible root. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Answer checked with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 60, C: 16, D: 12, E: 6 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } \Pr(A)=p \implies \Pr(B)=2p" />,
    reason: <>One unknown is enough, because the question ties the two probabilities together.</>,
  },
  {
    working: <Katex display tex="A,B \text{ independent} \implies \Pr(A\cap B) = \Pr(A)\Pr(B) = 2p^2" />,
    reason: <>This is the only place independence is used, and it is essential — without it the intersection is unknown and the problem cannot be solved.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cup B) = \Pr(A)+\Pr(B)-\Pr(A\cap B)" />,
    reason: <>The addition rule. Subtracting the intersection stops the overlap being counted twice.</>,
  },
  {
    working: <Katex display tex="p + 2p - 2p^2 = 0.52" />,
    reason: <>Substituting everything in terms of <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="2p^2 - 3p + 0.52 = 0 \implies 50p^2 - 75p + 13 = 0" />,
    reason: <>Rearranged into standard form; multiplying by <Katex tex="25" /> clears the decimal and keeps the arithmetic exact.</>,
  },
  {
    working: <Katex display tex="p = \frac{75 \pm \sqrt{5625-2600}}{100} = \frac{75 \pm 55}{100}" />,
    reason: <>Quadratic formula; <Katex tex="\sqrt{3025}=55" /> exactly.</>,
  },
  {
    working: <Katex display tex="p = \frac{13}{10} \ \text{ or } \ p = \frac15" />,
    reason: <>Two roots, and only one can be a probability.</>,
  },
  {
    working: <Katex display tex="p = 1.3 > 1 \ \text{ rejected}" />,
    reason: <>A probability cannot exceed <Katex tex="1" />. (It fails twice over here: <Katex tex="\Pr(B)=2p=2.6" /> as well.) Discarding the inadmissible root explicitly is part of the working, not an afterthought.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A) = 0.2}" />,
    reason: <>Matches option <b>B</b>. Check it: <Katex tex="\Pr(B)=0.4" />, <Katex tex="\Pr(A\cap B)=0.08" />, and <Katex tex="0.2+0.4-0.08=0.52" /> ✓. Option <b>D</b> <Katex tex="(0.4)" /> is <Katex tex="\Pr(B)" />, not <Katex tex="\Pr(A)" />.</>,
  },
]

export default function MethodsQ14_2018() {
  return (
    <MCQShell
      question={
        <p>
          Two events, <Katex tex="A" /> and <Katex tex="B" />, are independent, where{' '}
          <Katex tex="\Pr(B)=2\Pr(A)" /> and <Katex tex="\Pr(A\cup B)=0.52" />.{' '}
          <Katex tex="\Pr(A)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1" /> },
        { letter: 'B', content: <Katex tex="0.2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.3" /> },
        { letter: 'D', content: <Katex tex="0.4" /> },
        { letter: 'E', content: <Katex tex="0.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Independence is what makes this solvable">
          <p>
            The addition rule always needs <Katex tex="\Pr(A\cap B)" />, and normally that is
            a second unknown. Independence replaces it with{' '}
            <Katex tex="\Pr(A)\Pr(B)" />, which is written in terms of <Katex tex="p" /> —
            so one equation in one unknown remains.
          </p>
          <p>
            The price is that the equation becomes quadratic, and a quadratic hands you two
            roots. On a probability question, always test both against{' '}
            <Katex tex="0\le\Pr\le1" />; here the rejected root is the trap, and on the
            multiple-choice options it is invisible unless you check.
          </p>
        </Background>
      }
    />
  )
}
