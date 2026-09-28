// 2017 Mathematical Methods — Exam 1, Question 8 (5 marks).
// Two conditional probabilities and Pr(A ∩ B) = p; everything else in terms of p.
// Question text transcribed from the original paper (no diagram given). The probability
// table below is the standard karnaugh-style layout (the report's own solution uses it), not a
// VCAA figure. Solution is original; answers agree with the report and itute (4p, 1 − 8p,
// 0 < p ≤ 1/40 — itute notes p > 0 already in part a).
// Widgets: (b) the table drawn to scale — A ∪ B as eight p-blocks, with an independence toggle
// showing the overlap become 20p²; (c) Pr(A ∪ B) = 8p against p with the two fences p > 0 and
// 8p ≤ 1/5, testing each of the report's wrong intervals.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BlocksWidget = lazyWidget(() => import('../interactives/meth-2017e1-q8b-blocks'))
const FencesWidget = lazyWidget(() => import('../interactives/meth-2017e1-q8c-fences'))

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.6,
  comment: (
    <>
      This question was generally answered well. The most common errors included solving for{' '}
      <Katex tex="\Pr(B)" />, and incorrectly transposing{' '}
      <Katex tex="\tfrac{p}{\Pr(A)}" /> to yield <Katex tex="\tfrac14" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 8, 36],
  average: 0.3,
  comment: (
    <>
      Students who scored highly usually used a table or a Venn diagram to arrive at their
      answer. There were various misconceptions of the connection between conditional
      probabilities and <Katex tex="\Pr(A'\cap B')" />. Many students assumed that events{' '}
      <Katex tex="A" /> and <Katex tex="B" /> were independent, hence incorrectly used{' '}
      <Katex tex="\Pr(A'\cap B')=\Pr(A')\times\Pr(B')" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 53, 10],
  average: 0.4,
  comment: (
    <>
      Most students identified that <Katex tex="\Pr(A\cup B)=8p" />. Only a few students
      identified the correct interval because students did not consider that in this case{' '}
      <Katex tex="p\ne0" />. Common incorrect answers included{' '}
      <Katex tex="p=\tfrac1{40}" /> or <Katex tex="p\le\tfrac1{40}" /> (allowing negative
      probabilities) and <Katex tex="0\le p\le\tfrac1{40}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B\mid A) = \frac{\Pr(A\cap B)}{\Pr(A)}" />,
    reason: (
      <>
        Two conditionals are given, so pick the one with <Katex tex="\Pr(A)" /> underneath. The event
        after the bar is the one you divide by: given <Katex tex="A" />, the whole of <Katex tex="A" />{' '}
        becomes the new "total", and <Katex tex="A\cap B" /> is the part of it that is also{' '}
        <Katex tex="B" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac14 = \frac{p}{\Pr(A)}" />,
    reason: (
      <>
        Substituting both given values. In words: the overlap <Katex tex="p" /> is a quarter of{' '}
        <Katex tex="A" />, so <Katex tex="A" /> must be four times the overlap.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(A) = \frac{p}{\frac14}" />,
    reason: (
      <>
        Rearranging. The report's warning is about this line: dividing by <Katex tex="\tfrac14" />{' '}
        means multiplying by <Katex tex="4" />, not dividing by <Katex tex="4" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(A)=4p}" />,
    reason: (
      <>
        Check the size: bigger than <Katex tex="p" />, as it must be, because{' '}
        <Katex tex="A\cap B" /> is part of <Katex tex="A" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\mid B)=\frac{p}{\Pr(B)}=\frac15" />,
    reason: (
      <>
        To get the union you need <Katex tex="\Pr(B)" /> as well, and the other conditional is the one
        with <Katex tex="\Pr(B)" /> underneath. Same move as part (a).
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(B)=5p" />,
    reason: <>The overlap is a fifth of <Katex tex="B" />, so <Katex tex="B" /> is five times the overlap.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cup B)=\Pr(A)+\Pr(B)-\Pr(A\cap B)" />,
    reason: (
      <>
        The addition rule, which holds for any two events. Adding <Katex tex="\Pr(A)" /> and{' '}
        <Katex tex="\Pr(B)" /> counts the overlap twice, so subtract it once.
      </>
    ),
  },
  {
    working: <Katex display tex="= 4p+5p-p = 8p" />,
    reason: <>Everything is now in terms of <Katex tex="p" />, with no independence assumed anywhere.</>,
  },
  {
    working: <Katex display tex="A'\cap B' = (A\cup B)'" />,
    reason: (
      <>
        How would I know to use the union? <Katex tex="A'\cap B'" /> means "in neither{' '}
        <Katex tex="A" /> nor <Katex tex="B" />", which is everything outside <Katex tex="A\cup B" />{' '}
        (De Morgan). So "neither" is always <Katex tex="1" /> minus the union.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(A'\cap B') = 1-8p}" />,
    reason: <>The whole sample space has probability <Katex tex="1" />; take away the <Katex tex="8p" /> inside the union.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="8p \le \frac15" />,
    reason: <>The condition is about the union, and part (b) already found <Katex tex="\Pr(A\cup B)=8p" />.</>,
  },
  {
    working: <Katex display tex="p \le \frac{1}{40}" />,
    reason: <>Dividing by <Katex tex="8" />, a positive number, so the inequality sign stays the same way round.</>,
  },
  {
    working: <Katex display tex="p>0" />,
    reason: (
      <>
        This is the mark most students dropped. An interval has two ends and the inequality only gave
        the top one, so ask: what stops <Katex tex="p" /> going lower? Negative <Katex tex="p" /> is
        impossible for a probability. And <Katex tex="p=0" /> is ruled out too: it would make{' '}
        <Katex tex="\Pr(A)=4p=0" />, so <Katex tex="\Pr(B\mid A)=\tfrac{p}{4p}" /> would be{' '}
        <Katex tex="\tfrac00" />, not the given <Katex tex="\tfrac14" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{0<p\le\frac{1}{40}}" />,
    reason: (
      <>
        Strict at the left end, included at the right. Check the top end:{' '}
        <Katex tex="p=\tfrac1{40}" /> gives <Katex tex="\Pr(A)=\tfrac1{10}" />,{' '}
        <Katex tex="\Pr(B)=\tfrac18" />, <Katex tex="\Pr(A\cup B)=\tfrac15" />, all legitimate. Across
        the whole interval every cell of the table stays between <Katex tex="0" /> and{' '}
        <Katex tex="1" />, so nothing else trims it.
      </>
    ),
  },
]

export default function MethodsQ8_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (5 marks)</p>
        <p>
          For events <Katex tex="A" /> and <Katex tex="B" /> from a sample space,{' '}
          <Katex tex="\Pr(A\mid B)=\tfrac15" /> and <Katex tex="\Pr(B\mid A)=\tfrac14" />. Let{' '}
          <Katex tex="\Pr(A\cap B)=p" />.
        </p>
      </div>

      <PartCard letter="a" topic="Conditional Probability" marks={1} statement={<>Find <Katex tex="\Pr(A)" /> in terms of <Katex tex="p" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Use Pr(A | B), since it's the one with A in front"
          source="Examiner's report"
          working={<Katex display tex="\frac15=\frac{p}{\Pr(B)} \implies \Pr(B)=5p" />}
        >
          The report names solving for <Katex tex="\Pr(B)" /> as one of the most common errors. In{' '}
          <Katex tex="\Pr(A\mid B)" /> the event after the bar, <Katex tex="B" />, is what you divide
          by, so this conditional can only ever tell you <Katex tex="\Pr(B)" />. Before choosing, ask
          which probability sits underneath: you want the one with <Katex tex="\Pr(A)" /> there, which
          is <Katex tex="\Pr(B\mid A)" />. (Keep <Katex tex="\Pr(B)=5p" />, though: part (b) needs it.)
        </WrongMethod>
        <WrongMethod
          title="p over Pr(A) is 1/4, so Pr(A) is p/4"
          working={<Katex display tex="\frac{p}{\Pr(A)}=\frac14 \implies \Pr(A)=\frac{p}{4}" />}
        >
          The report also lists transposing <Katex tex="\tfrac{p}{\Pr(A)}=\tfrac14" /> incorrectly
          among the most common errors. Cross-multiply instead: <Katex tex="4p=\Pr(A)" />. The quick
          check catches it: <Katex tex="\tfrac p4" /> is smaller than <Katex tex="p" />, but{' '}
          <Katex tex="A\cap B" /> sits inside <Katex tex="A" />, so <Katex tex="\Pr(A)" /> can never be
          less than <Katex tex="p" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Complement" marks={2} statement={<>Find <Katex tex="\Pr(A'\cap B')" /> in terms of <Katex tex="p" />.</>} examinerReport={EXAM_B}>
        <Background title="The whole question on one table">
          <p>
            Once you know <Katex tex="\Pr(A)=4p" />, <Katex tex="\Pr(B)=5p" /> and{' '}
            <Katex tex="\Pr(A\cap B)=p" />, every other cell follows by subtraction along rows
            and columns:
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13px] tabular-nums border-collapse mt-1">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400">
                  <th className="px-3 py-1.5 text-left font-medium"></th>
                  <th className="px-3 py-1.5 font-medium">
                    <Katex tex="A" />
                  </th>
                  <th className="px-3 py-1.5 font-medium">
                    <Katex tex="A'" />
                  </th>
                  <th className="px-3 py-1.5 font-medium border-l border-gray-200 dark:border-gray-700">
                    total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="B" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="p" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="5p" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="B'" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="3p" />
                  </td>
                  <td className="px-3 py-1.5 text-center font-semibold">
                    <Katex tex="1-8p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="1-5p" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">total</td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="1-4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The bold cell is what part (b) asks for. The algebra below reaches the same place
            without drawing the table, but in the exam the table is faster and far harder to
            get wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The table drawn to scale: A ∪ B is always eight blocks of size p">
          <BlocksWidget />
        </Explore>
        <WrongMethod
          title="Neither A nor B: multiply Pr(A′) by Pr(B′)"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}\Pr(A'\cap B')&=(1-4p)(1-5p)\\&=1-9p+20p^2\end{aligned}" />}
        >
          Multiplying is the rule for <em>independent</em> events only, and nothing says{' '}
          <Katex tex="A" /> and <Katex tex="B" /> are independent. Here they are not: independence would
          need <Katex tex="\Pr(B\mid A)=\Pr(B)" />, i.e. <Katex tex="\tfrac14=5p" />, which is true only
          when <Katex tex="p=\tfrac1{20}" />. The same product rule applied to the overlap gives{' '}
          <Katex tex="\Pr(A\cap B)=4p\times5p=20p^2" />, contradicting the given{' '}
          <Katex tex="\Pr(A\cap B)=p" />. Unless a question says "independent", reach for the addition
          rule or a table, never a product.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Probability Bounds"
        marks={2}
        statement={
          <>
            Given that <Katex tex="\Pr(A\cup B)\le\tfrac15" />, state the largest possible
            interval for <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Two fences: 8p ≤ 1/5 on the right, p > 0 on the left">
          <FencesWidget />
        </Explore>
        <WrongMethod
          title="A probability can be 0, so 0 ≤ p ≤ 1/40"
          source="Examiner's report"
          working={<Katex display tex="0\le p\le\frac1{40}" />}
        >
          In general a probability can be <Katex tex="0" />, but not this one. At{' '}
          <Katex tex="p=0" />, <Katex tex="\Pr(A)=4p=0" /> and <Katex tex="\Pr(B)=5p=0" />, so both
          given conditionals would be <Katex tex="\tfrac00" />, not <Katex tex="\tfrac15" /> and{' '}
          <Katex tex="\tfrac14" />. The report says students "did not consider that in this case{' '}
          <Katex tex="p\ne0" />". When a question hands you a conditional, the event you are conditioning
          on must have non-zero probability.
        </WrongMethod>
        <WrongMethod
          title="Solve 8p ≤ 1/5 and stop there"
          source="Examiner's report"
          working={<Katex display tex="8p\le\frac15 \implies p\le\frac1{40}" />}
        >
          This interval runs off to <Katex tex="-\infty" />, so it includes negative probabilities; the
          report lists <Katex tex="p\le\tfrac1{40}" /> among the common incorrect answers for exactly
          that reason. Its other listed answer, <Katex tex="p=\tfrac1{40}" />, gives only the top end:
          every smaller positive <Katex tex="p" /> also satisfies the condition. "Largest possible
          interval" means both ends, so always ask what stops <Katex tex="p" /> going lower.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
