// 2018 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 58% correct. The mean
// of a discrete random variable, then a strict inequality against it. Question text and the
// probability table transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Answer checked with sympy; E agrees with the report and itute.
// Solution is original. Interactive: meth-2018-mcq12-balance (the bars on a beam; it balances only
// at the pivot c = 1.7 = μ, where the bars below hold 7/10 of the probability; buttons for the
// tallest bar c = 1 and the plain average c = 2.4). WrongMethods: A (the mean halves the
// probability) and D (unweighted average of the x-values), both computed to give those options.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BalanceWidget = lazyWidget(() => import('../interactives/meth-2018-mcq12-balance'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 8, C: 13, D: 9, E: 58 },
  answer: 'E',
  noAnswer: 0,
}

const TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[13px] border-collapse">
      <tbody>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5"><Katex tex="x" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="0" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="1" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="2" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="3" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="6" /></td>
        </tr>
        <tr>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5"><Katex tex="\Pr(X=x)" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac14" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{9}{20}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{1}{10}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{1}{20}" /></td>
          <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center"><Katex tex="\tfrac{3}{20}" /></td>
        </tr>
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mu = E(X) = \sum x\Pr(X=x)" />,
    reason: <>The mean of a discrete random variable: multiply each value by its probability and add. Each value is weighted by how likely it is, so this is <em>not</em> the plain average of the five <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="= 0\!\left(\tfrac14\right) + 1\!\left(\tfrac{9}{20}\right) + 2\!\left(\tfrac{1}{10}\right) + 3\!\left(\tfrac{1}{20}\right) + 6\!\left(\tfrac{3}{20}\right)" />,
    reason: <>Substituting the table. A quick check first: the probabilities sum to <Katex tex="\tfrac{5+9+2+1+3}{20}=1" /> ✓.</>,
  },
  {
    working: <Katex display tex="= \frac{0+9+4+3+18}{20} = \frac{34}{20}" />,
    reason: <>Everything over the common denominator <Katex tex="20" />.</>,
  },
  {
    working: <Katex display tex="\mu = \frac{17}{10}" />,
    reason: <>The mean is <Katex tex="1.7" />. Note it is not one of the values <Katex tex="X" /> can take — that is normal, and it is what makes the next step a clean cut.</>,
  },
  {
    working: <Katex display tex="\Pr(X<1.7) = \Pr(X=0)+\Pr(X=1)" />,
    reason: <>Strictly less than <Katex tex="1.7" />, so the values <Katex tex="0" /> and <Katex tex="1" /> qualify and <Katex tex="2" /> does not. Because <Katex tex="\mu" /> falls between two possible values, the strict and non-strict inequalities happen to agree here — but read the sign anyway, since that is not always true.</>,
  },
  {
    working: <Katex display tex="= \frac14 + \frac{9}{20} = \frac{5}{20}+\frac{9}{20}" />,
    reason: <>Common denominator again.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X<\mu) = \frac{7}{10}}" />,
    reason: <>Matches option <b>E</b> (<Katex tex="\tfrac{14}{20}=\tfrac{7}{10}" />). Option <b>A</b> <Katex tex="\left(\tfrac12\right)" /> assumes the mean splits the probability in half, which is what a <em>median</em> does; option <b>D</b> <Katex tex="\left(\tfrac45\right)" /> comes from averaging the five <Katex tex="x" />-values, <Katex tex="\tfrac{12}{5}=2.4" />, and then taking <Katex tex="\Pr(X<2.4)" />; option <b>B</b> <Katex tex="\left(\tfrac14\right)" /> is <Katex tex="\Pr(X<1)" />, using the most likely value <Katex tex="1" /> in place of the mean.</>,
  },
]

export default function MethodsQ12_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The discrete random variable <Katex tex="X" /> has the following probability
            distribution.
          </p>
          {TABLE}
          <p className="mt-3">
            Let <Katex tex="\mu" /> be the mean of <Katex tex="X" />.{' '}
            <Katex tex="\Pr(X<\mu)" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12" /> },
        { letter: 'B', content: <Katex tex="\dfrac14" /> },
        { letter: 'C', content: <Katex tex="\dfrac{17}{20}" /> },
        { letter: 'D', content: <Katex tex="\dfrac45" /> },
        { letter: 'E', content: <Katex tex="\dfrac{7}{10}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="The mean is the balance point, not the halfway point">
            <BalanceWidget />
          </Explore>
          <WrongMethod
            title="The mean is in the middle, so half the probability is below it"
            source="13% chose A"
            working={<Katex display tex="\Pr(X<\mu)=\tfrac12" />}
          >
            <p>
              Splitting the probability in half is what the <em>median</em> does. The mean
              balances the distribution by leverage: a value far from the centre pulls hard even
              with a small probability. Here the lone value <Katex tex="6" /> drags{' '}
              <Katex tex="\mu" /> up to <Katex tex="1.7" />, past the bars at <Katex tex="0" /> and{' '}
              <Katex tex="1" />, which already hold <Katex tex="\tfrac{7}{10}" /> of the
              probability. Never assume a value for <Katex tex="\Pr(X<\mu)" />: find{' '}
              <Katex tex="\mu" />, then add up the probabilities of the values strictly below it.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The mean is the average of the x-values"
            source="9% chose D"
            working={
              <>
                <Katex display tex="\mu=\frac{0+1+2+3+6}{5}=2.4" />
                <Katex display tex="\Pr(X<2.4)=\tfrac14+\tfrac{9}{20}+\tfrac{1}{10}=\tfrac45" />
              </>
            }
          >
            <p>
              Dividing by <Katex tex="5" /> treats every value as equally likely, each with
              probability <Katex tex="\tfrac15" />. They are not: <Katex tex="x=1" /> has{' '}
              <Katex tex="\tfrac{9}{20}" /> and <Katex tex="x=3" /> only <Katex tex="\tfrac{1}{20}" />.
              Weight each value by its own probability,{' '}
              <Katex tex="E(X)=\sum x\Pr(X=x)" />. A quick sense check: the mean should sit
              towards the tall bars, but <Katex tex="2.4" /> has four-fifths of
              the probability to its left.
            </p>
          </WrongMethod>
        </>
      }
      background={
        <Background title="Mean is not median">
          <p>
            The lone value <Katex tex="6" /> at the top of the table drags the mean upwards:
            it carries only <Katex tex="15\%" /> of the probability but contributes{' '}
            <Katex tex="\tfrac{18}{20}" /> of the <Katex tex="\tfrac{34}{20}" /> total. That
            is why <Katex tex="\mu=1.7" /> sits well above the most likely value.
          </p>
          <p>
            So <Katex tex="\Pr(X<\mu)" /> has no reason to be <Katex tex="\tfrac12" />. A mean
            balances the distribution by <em>leverage</em>, not by count; only a median splits
            the probability evenly.
          </p>
        </Background>
      }
    />
  )
}
