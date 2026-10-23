// 2026 Mathematical Methods NHT — Exam 1, Question 3 (5 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// Ticket prices by time spent: a probability from a table of percentages, the mean of a discrete
// random variable, then a binomial probability Pr(Y = 4) for Y ~ Bi(5, 0.6), all by hand.
// Question text transcribed from the original paper (the price table is typed from it). Answers
// checked with sympy and against the VCAA report's sample answers (0.85; $6.80; 162/625).
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>The probability value could be expressed in any correct form.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved calculating the mean or expected value of a discrete probability distribution using the
      formula from the formula sheet.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question required the identification and construction of the binomial probability distribution for the
      number of visitors purchasing a ticket for less than 10 minutes, <Katex tex="Y\sim\text{Bi}(n=5,\ p=0.6)" />. The
      probability that exactly 4 out of 5 visitors buy a ticket needed to be found, and this could be calculated using
      the appropriate formula provided on the formula sheet.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{20 minutes or less})=0.60+0.25" />,
    reason: <>
      &ldquo;20 minutes or less&rdquo; covers the first two categories, less than 10 minutes and 10 to 20 minutes. They
      don&apos;t overlap, so add their probabilities.
    </>,
    more: <>Or use the complement: everyone except the &ldquo;more than 20 minutes&rdquo; group, <Katex tex="1-0.15" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.85}" />,
    reason: <>The report accepts any correct form: <Katex tex="\tfrac{17}{20}" />, <Katex tex="\tfrac{85}{100}" /> or 85%.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-sm border-collapse">
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="x" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="5" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="8" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="12" /></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="\Pr(X=x)" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0.60" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0.25" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0.15" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>
      Let <Katex tex="X" /> be the price, in dollars, of a randomly selected visitor&apos;s ticket. Pair each price with the
      percentage of visitors who pay it. The probabilities add to 1, as they must.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{E}(X)&=\sum x\Pr(X=x)\\ &=5\times0.60+8\times0.25+12\times0.15\end{aligned}" />,
    reason: <>The mean of a discrete random variable, from the formula sheet: each value times its probability, summed.</>,
  },
  {
    working: <Katex display tex="=3.00+2.00+1.80" />,
    reason: <>By hand: <Katex tex="8\times\tfrac14=2" /> and <Katex tex="12\times0.15=1.2+0.6=1.8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(X)=\$6.80}" />,
    reason: <>
      The report also accepts 6.8 or <Katex tex="\tfrac{34}{5}" />. Sanity check: most visitors pay $5, so the mean
      should be closer to 5 than to 12, and it is.
    </>,
    more: <>
      The mean is not the average of the three prices, <Katex tex="\tfrac{5+8+12}{3}\approx8.33" />: that would treat
      the three ticket types as equally common, when 60% of visitors buy the cheapest.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim\text{Bi}(5,\ 0.6)" />,
    reason: <>
      Let <Katex tex="Y" /> be the number of the five visitors who bought a ticket for less than 10 minutes. Each visitor
      either did or didn&apos;t (success probability 0.6), and selecting from a <em>large</em> group makes the five
      independent with the same probability each time: binomial.
    </>,
  },
  {
    working: <Katex display tex="\Pr(Y=4)=\binom54(0.6)^4(0.4)^1" />,
    reason: <>
      Formula sheet: <Katex tex="\Pr(Y=y)=\binom ny p^y(1-p)^{n-y}" />. <Katex tex="\binom54=5" /> counts which one of the
      five is the visitor who stayed longer.
    </>,
  },
  {
    working: <Katex display tex="=5\times\left(\frac35\right)^4\times\frac25=\frac{5\times81\times2}{625\times5}" />,
    reason: <>Fractions make this easy by hand: <Katex tex="0.6=\tfrac35" />, <Katex tex="0.4=\tfrac25" />, <Katex tex="3^4=81" />, <Katex tex="5^4=625" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Y=4)=\frac{162}{625}}" />,
    reason: <>
      The 5s cancel, leaving <Katex tex="\tfrac{81\times2}{625}" />. The report also accepts <Katex tex="\tfrac{810}{3125}" />{' '}
      or 0.2592.
    </>,
    more: <>
      Plausible: with <Katex tex="p=0.6" /> the expected count is <Katex tex="5\times0.6=3" />, so exactly 4 is a fairly
      likely outcome, a bit over a quarter of the time.
    </>,
  },
]

export default function MethodsQ3_2026NHTExam1() {
  const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          Visitors to a popular location purchase different tickets according to the time spent there.
          <br />
          The table below outlines the ticket price per visitor.
        </p>
        <div className="overflow-x-auto">
          <table className="border-collapse bg-white dark:bg-gray-900 text-center">
            <tbody>
              <tr>
                <th className={cell}>Time spent</th>
                <td className={cell}>less than 10 minutes</td>
                <td className={cell}>10 to 20 minutes</td>
                <td className={cell}>more than 20 minutes</td>
              </tr>
              <tr>
                <th className={cell}>Ticket price</th>
                <td className={cell}>$5</td>
                <td className={cell}>$8</td>
                <td className={cell}>$12</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>It is known that of all visitors:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>60% purchased tickets for less than 10 minutes</li>
          <li>25% purchased tickets for 10 to 20 minutes</li>
          <li>15% purchased tickets for more than 20 minutes.</li>
        </ul>
      </div>

      <PartCard
        letter="a"
        topic="Discrete Probability"
        marks={1}
        statement={<>Find the probability that a randomly selected visitor purchased a ticket for 20 minutes or less.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Expected Value"
        marks={2}
        statement={<>Find the mean ticket price, in dollars, purchased by a randomly selected visitor.</>}
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            A random sample of five visitors is selected from a large group of visitors.
            <br />
            Find the probability that exactly four of the five visitors purchased tickets for less than 10 minutes.
          </>
        }
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Leave out the binomial coefficient"
          working={<Katex display tex="(0.6)^4(0.4)=\frac{162}{3125}=0.05184" />}
        >
          That is the probability of one particular order, say the first four visitors stayed under 10 minutes and the
          fifth didn&apos;t. The visitor who stayed longer could be any of the five, so multiply by{' '}
          <Katex tex="\binom54=5" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
