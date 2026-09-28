// 2017 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 83% correct.
// Two marbles drawn without replacement from five red and three yellow. Question text
// transcribed from the original paper; solution is original. The report has no comment on
// this question.
// Widget: meth-2017-mcq3-grid — all 56 ordered draws as a grid (diagonal crossed out: no
// replacement); red-then-yellow is one 5 × 3 block (option D), yellow-then-red its mirror image.
// WrongMethod: option D (12%), counting only red-then-yellow.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GridWidget = lazyWidget(() => import('../interactives/meth-2017-mcq3-grid'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 2, C: 83, D: 12, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{different} = RY \text{ or } YR" />,
    reason: (
      <>
        “Different colours” does not say which colour comes first, so list every order that fits. On a tree
        diagram these are the two branches that change colour.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(RY) = \frac58\times\frac37 = \frac{15}{56}" />,
    reason: (
      <>
        Red first: <Katex tex="5" /> of the <Katex tex="8" /> marbles. Then yellow: all <Katex tex="3" /> yellows
        are still there, but only <Katex tex="7" /> marbles are left, because the first one is not replaced.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(YR) = \frac38\times\frac57 = \frac{15}{56}" />,
    reason: (
      <>
        The other order. It is equal to the first because the same numbers are multiplied, just in a different
        order: that is always true for two draws without replacement.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(\text{different}) = \frac{15}{56}+\frac{15}{56} = \frac{30}{56}" />,
    reason: (
      <>
        The two orders cannot both happen, so add them. As a check, count unordered pairs instead:{' '}
        <Katex tex="\frac{5\times3}{\binom{8}{2}}=\frac{15}{28}" />, the same answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{28}}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option D (12%) is <Katex tex="\Pr(RY)" /> alone, forgetting that yellow can come
        first. Option E is greater than <Katex tex="1" />, so it cannot be a probability. A sense check:{' '}
        <Katex tex="\tfrac{15}{28}\approx0.54" />, a bit over half, which is sensible for a fairly even mix of
        colours.
      </>
    ),
  },
]

export default function MethodsQ3_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A box contains five red marbles and three yellow marbles. Two marbles are drawn at
            random from the box without replacement.
          </p>
          <p>The probability that the marbles are of <b>different</b> colours is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac58" /> },
        { letter: 'B', content: <Katex tex="\dfrac35" /> },
        { letter: 'C', content: <Katex tex="\dfrac{15}{28}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{15}{56}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{30}{28}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="All 56 ordered draws: why both orders count">
            <GridWidget />
          </Explore>
          <WrongMethod
            title="One red and one yellow, so multiply red by yellow"
            source="12% chose D"
            working={<Katex display tex="\Pr = \frac58\times\frac37 = \frac{15}{56}" />}
          >
            <p>
              Multiplying along a tree gives the probability of one <em>path</em>, and this path fixes the order:
              red first, then yellow. “Different colours” is also satisfied by yellow then red, which is a second
              path with the same probability. To catch it, ask of every multiplication “which order have I just
              assumed?” and whether the question fixed that order. Here it did not, so there are two paths to add.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
