// 2018 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 60% correct.
// Independent events with Pr(B) = 2Pr(A) and a given union, leading to a quadratic with one
// inadmissible root. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Answer checked with sympy (roots 1/5 and
// 13/10); itute agrees (B). Stem punctuation corrected against the paper: VCAA has no full stop
// after "0.52" and puts "Pr(A) is equal to" on its own line. Solution is original.
// Widget (in extras): interactives/meth-2018-mcq14-square — A and B as crossing strips of a unit
// square (overlap p × 2p), with the union plotted against p to show why the root 1.3 is rejected.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquareWidget = lazyWidget(() => import('../interactives/meth-2018-mcq14-square'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 60, C: 16, D: 12, E: 6 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } \Pr(A)=p \implies \Pr(B)=2p" />,
    reason: <>Two probabilities are unknown, but the question ties them together, so one letter covers both. Let the letter stand for the thing you are asked for, <Katex tex="\Pr(A)" />: then the answer is <Katex tex="p" /> itself, with nothing to convert at the end.</>,
  },
  {
    working: (
      <>
        <Katex display tex="A,B \text{ independent}" />
        <Katex display tex="\implies \Pr(A\cap B) = \Pr(A)\Pr(B) = 2p^2" />
      </>
    ),
    reason: <>This is the only place independence is used, and it is essential. Without it the intersection is a second unknown and the problem cannot be solved. (Picture <Katex tex="A" /> and <Katex tex="B" /> as strips crossing a unit square: the overlap is a <Katex tex="p\times2p" /> rectangle.)</>,
  },
  {
    working: <Katex display tex="\Pr(A\cup B) = \Pr(A)+\Pr(B)-\Pr(A\cap B)" />,
    reason: <>How would I know to use this? The question gives a union and asks for a single event, and the addition rule is the formula that links <Katex tex="\Pr(A\cup B)" /> to <Katex tex="\Pr(A)" /> and <Katex tex="\Pr(B)" />. Subtracting the intersection stops the overlap being counted twice.</>,
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
    reason: <>Quadratic formula; <Katex tex="\sqrt{3025}=55" /> exactly. On CAS, <Cas fn="solve">solve(p+2p-2p^2=0.52, p)</Cas> gives both roots at once.</>,
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
        <>
          <p className="mb-2">
            Two events, <Katex tex="A" /> and <Katex tex="B" />, are independent, where{' '}
            <Katex tex="\Pr(B)=2\Pr(A)" /> and <Katex tex="\Pr(A\cup B)=0.52" />
          </p>
          <p>
            <Katex tex="\Pr(A)" /> is equal to
          </p>
        </>
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
      extras={
        <>
          <Explore title="Why independence makes the overlap a p × 2p rectangle">
            <SquareWidget />
          </Explore>
          <WrongMethod
            title="Let x = Pr(B), solve, and the answer is x"
            source="12% chose D"
            working={
              <>
                <Katex display tex="x+\tfrac{x}{2}-\tfrac{x^2}{2}=0.52" />
                <Katex display tex="\implies x=0.4 \ \text{ or } \ 2.6" />
              </>
            }
          >
            The algebra is right, and <Katex tex="0.4" /> is a genuine answer, but to the wrong question:{' '}
            <Katex tex="x" /> was defined as <Katex tex="\Pr(B)" />, and the question asks for{' '}
            <Katex tex="\Pr(A)=\tfrac{x}{2}=0.2" />. After solving, reread the question and check what your letter
            stands for. Choosing the letter to <em>be</em> the thing asked for, as in the working, removes the trap.
          </WrongMethod>
        </>
      }
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
