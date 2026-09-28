// 2020 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 50% correct.
// Recovering p from a binomial mean, then a tail probability. Question text transcribed from the original paper; solution is original.
// Answer B agrees with scipy (1 − Pr(X ≤ 3) = 0.048496… for X ~ Bi(25, 0.056)), the VCAA report
// (no comment printed for this question) and itute (B). Distractors verified in scipy: E is
// Pr(X ≥ 3) = 0.16217, D is Pr(X = 3) = 0.11368, A is Pr(X = 4) = 0.03709, C is p itself.
// Interactive diagram (§15): interactives/meth-2020e2-mcq8-tail.tsx draws Bi(25, 0.056) as bars with
// its balance point at E(X) = 1.4; choosing "more than 3" lights up the bars 4, 5, 6, … (0.048), and
// the wrong readings X ≥ 3 (E), X = 3 (D) and X = 4 (A) are one tap away. This site's own
// explanatory figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TailWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq8-tail'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 50, C: 14, D: 9, E: 20 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number of defective items in a box of 25}" />,
    reason: <>Name the random variable first: the count of defective items in <em>one box</em>. That keeps the item (probability <Katex tex="p" />) and the box (the count <Katex tex="X" />) apart, which is where this question catches people.</>,
  },
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(25,\,p)" />,
    reason: <>The question says to treat it as binomial: 25 items (trials), each defective or not, each with the same unknown probability <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X) = np = 25p = 1.4" />,
    reason: <>The mean of a binomial is <Katex tex="np" />: 25 items, each defective with probability <Katex tex="p" />, give <Katex tex="25p" /> defective items per box on average. The given mean therefore pins down <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="p = \frac{1.4}{25} = 0.056" />,
    reason: <>This is option C, but it is the probability that a <em>single item</em> is defective: a stepping stone, not the answer. The question asks about a whole box.</>,
  },
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(25,\,0.056)" />,
    reason: <>Now the distribution is fully specified.</>,
  },
  {
    working: <Katex display tex="\Pr(X>3) = \Pr(X\ge4) = 1-\Pr(X\le3)" />,
    reason: <>&ldquo;More than three&rdquo; means 4, 5, 6, … defective items. <Katex tex="X" /> is a count, so it only takes whole numbers: <Katex tex="X>3" /> and <Katex tex="X\ge4" /> are the same event, and 3 itself is <b>not</b> in it. The complement, &ldquo;at most 3&rdquo;, is four values instead of twenty-two.</>,
  },
  {
    working: (
      <>
        <Cas fn="binomCdf">1 − binomCdf(25, 0.056, 0, 3)</Cas>
        <Katex display tex="= 1 - 0.95150\ldots = 0.048496\ldots" />
      </>
    ),
    reason: <>Or directly, <Cas fn="binomCdf">binomCdf(25, 0.056, 4, 25)</Cas>: the lower bound is 4, because both bounds are included. A lower bound of 3 gives <Katex tex="\Pr(X\ge3)\approx0.162" />, which is option <b>E</b>.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>3) \approx 0.048}" />,
    reason: <>Correct to three decimal places. Matches option <b>B</b>. It&apos;s plausible that it&apos;s small: the mean is 1.4, so 4 or more defective items is well into the tail. The distractors are the wrong pieces of the same distribution: <b>E</b> is <Katex tex="\Pr(X\ge3)\approx0.162" />, <b>D</b> is the single value <Katex tex="\Pr(X=3)\approx0.114" />, <b>A</b> is the single value <Katex tex="\Pr(X=4)\approx0.037" />, and <b>C</b> is <Katex tex="p" /> itself.</>,
  },
]

export default function MethodsQ8_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Items are packed in boxes of 25 and the mean number of defective items per box is
            1.4
          </p>
          <p>
            Assuming that the probability of an item being defective is binomially
            distributed, the probability that a box contains more than three defective items,
            correct to three decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.037" /> },
        { letter: 'B', content: <Katex tex="0.048" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.056" /> },
        { letter: 'D', content: <Katex tex="0.114" /> },
        { letter: 'E', content: <Katex tex="0.162" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="“More than three” is the bars 4, 5, 6, … — and the bar at 3 is bigger than all of them together">
            <TailWidget />
          </Explore>
          <WrongMethod
            title="More than three: start counting from 3"
            source="20% chose E"
            working={
              <>
                <Katex display tex="\Pr(X\ge3) = \text{binomCdf}(25,\,0.056,\,3,\,25)" />
                <Katex display tex="\approx 0.162 \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              A box with exactly 3 defective items doesn&apos;t have <em>more</em> than three, so <Katex tex="X=3" /> is not in the event.
              For a count, &ldquo;more than 3&rdquo; starts at 4. Here the slip is expensive: <Katex tex="\Pr(X=3)\approx0.114" /> on its
              own is more than twice the correct answer.
            </p>
            <p>
              Before touching the calculator, write the event out in whole numbers (<Katex tex="X=4,5,\ldots,25" />) and read the bounds off
              that list.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Find p and stop"
            source="14% chose C"
            working={<Katex display tex="p = \frac{1.4}{25} = 0.056 \quad \text{(option C)}" />}
          >
            <p>
              <Katex tex="p" /> is the probability that <em>one item</em> is defective. The question asks for the probability that a{' '}
              <em>box of 25</em> contains more than three, which needs the whole distribution <Katex tex="\mathrm{Bi}(25,\,0.056)" />. When a
              number you found along the way is one of the options, reread the question and check it asks for that.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
