// 2026 Mathematical Methods NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Probability: conditional probability over three independent free throws. Question text
// transcribed from the original paper. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      Let <Katex tex="X\sim\text{Bi}(3,p)" />.
      <br />
      The probability the player wins the game is:
      <br />
      <Katex tex="\Pr(X=2)+\Pr(X=3)" />
      <br />
      <Katex tex="=\dbinom{3}{2}p^2(1-p)+p^3" />
      <br />
      <Katex tex="=3p^2-2p^3" />
      <br />
      The probability the player wins the game, but misses one of their first 2 attempts is:
      <br />
      <Katex tex="p(1-p)p+(1-p)p^2" />
      <br />
      <Katex tex="=2p^2(1-p)" />
      <br />
      So the required conditional probability is:
      <br />
      <Katex tex="\dfrac{2p^2(1-p)}{3p^2-2p^3}" />
      <br />
      <Katex tex="=\dfrac{2(1-p)}{3-2p}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(3,p)" />,
    reason: <><Katex tex="X" /> is the number of scores. Three attempts, each a score or a miss, independent, with the same probability <Katex tex="p" />: the binomial conditions.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(\text{win})&=\Pr(X\ge2)\\&=\dbinom32p^2(1-p)+p^3\\&=3p^2-2p^3\\&=p^2(3-2p)\end{aligned}" />,
    reason: <>&ldquo;At least twice&rdquo; means exactly 2 or exactly 3 scores. This is the denominator of the conditional probability.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(\text{win}\cap\text{one of first two missed})\\&=\Pr(\text{SMS})+\Pr(\text{MSS})\\&=2p^2(1-p)\end{aligned}" />,
    reason: <>If exactly one of the first two is missed, the player has only one score so far, so to win they <b>must</b> score the third. The missed attempt can be first or second, hence the 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(\text{one of first two missed}\mid\text{win})\\&=\frac{2p^2(1-p)}{p^2(3-2p)}\\&=\frac{2(1-p)}{3-2p}\end{aligned}" />,
    reason: <><Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />. Cancel the common <Katex tex="p^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{2(1-p)}{3-2p}}" />,
    reason: <>Matches option <b>C</b>. Sanity check: as <Katex tex="p\to1" /> it tends to 0 (a perfect shooter never misses), and as <Katex tex="p\to0" /> it tends to <Katex tex="\tfrac23" />: a win then almost surely means exactly one miss, equally likely to be any of the three attempts, and two of the three are among the first two.</>,
    more: <>Option <b>A</b> counts only one order of the miss (drops the factor 2). Option <b>D</b> forgets that the third attempt must score (numerator <Katex tex="2p(1-p)" />). Option <b>B</b> makes both slips.</>,
  },
]

export default function MethodsQ19_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            A basketball player has three attempts to score from the free throw line. If the player scores at least twice, they win the game.
          </p>
          <p>
            Assume that for each attempt, the probability that the player will score is <Katex tex="p" />, where <Katex tex="0<p<1" />. The outcome of each attempt is independent of all others.
          </p>
          <p>
            Given that the player wins the game, the probability that exactly one of the first two attempts was missed is given by
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1-p}{3-2p}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1-p}{p(3-2p)}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{2(1-p)}{3-2p}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{2(1-p)}{p(3-2p)}" /> },
      ]}
      rows={ROWS}
      extras={
        <WrongMethod
          title="Exactly one of the first two missed is just 2p(1 − p)"
          working={<Katex display tex="\frac{2p(1-p)}{p^2(3-2p)}=\frac{2(1-p)}{p(3-2p)}" />}
        >
          That is the probability of one miss in the first two attempts, but the numerator must be the probability of that event <b>and</b> a win, so the third attempt has to score too: multiply by <Katex tex="p" />. A quick check catches it: for small <Katex tex="p" /> this expression exceeds 1, which no probability can.
        </WrongMethod>
      }
      examinerReport={EXAMINER}
    />
  )
}
