// 2019 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 82% correct. The mean
// of a discrete random variable given its probability distribution in terms of a. Question
// text transcribed from the original paper (no diagram). Solution is original; answer and
// distractors re-checked with exact fractions (a = 1/16, E(X) = 34a = 17/8; option E, 2, is the
// median; option C, 35/16, is 35a). The report makes no comment on this question. Interactive
// (in extras): meth-2019-mcq7-balance, the mean as the balance point of the probability bars,
// with a button for each option as the pivot.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BalanceWidget = lazyWidget(() => import('../interactives/meth-2019-mcq7-balance'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 4, C: 6, D: 82, E: 3 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a+3a+5a+7a=1" />,
    reason: <>You can't find a mean while the probabilities still contain <Katex tex="a" />, so pin <Katex tex="a" /> down first. The one fact every probability distribution obeys is that its probabilities add to <Katex tex="1" />, and that gives an equation in <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="16a=1 \implies a=\dfrac{1}{16}" />,
    reason: <>Collecting like terms.</>,
  },
  {
    working: (
      <>
        <Katex display tex="E(X) = \sum x\Pr(X=x)" />
        <Katex display tex="= 0(a)+1(3a)+2(5a)+3(7a)" />
      </>
    ),
    reason: <>"The mean of <Katex tex="X" />" is its expected value <Katex tex="E(X)" />: multiply each value by its probability and add. The values with bigger probabilities pull harder on the answer. The <Katex tex="x=0" /> term contributes nothing.</>,
    more: <>See the Background below for why the bigger probabilities pull harder.</>,
  },
  {
    working: <Katex display tex="= (0+3+10+21)a = 34a" />,
    reason: <>Simplifying.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) = \dfrac{34}{16} = \dfrac{17}{8}}" />,
    reason: <>Matches option <b>D</b>. Sanity check: <Katex tex="\tfrac{17}{8}=2.125" />, which sits between <Katex tex="0" /> and <Katex tex="3" /> and leans towards the larger values — right, since they carry the bigger probabilities. Option <b>A</b> <Katex tex="\left(\tfrac{1}{16}\right)" /> is just <Katex tex="a" />, the value found on the way; option <b>C</b> <Katex tex="\left(\tfrac{35}{16}\right)" /> is <Katex tex="35a" />, what you get by giving the <Katex tex="x=0" /> column a weight of <Katex tex="1" /> instead of <Katex tex="0" />; and option <b>E</b> <Katex tex="(2)" /> is the median, the value where the running total of probability <Katex tex="\left(\tfrac{1}{16},\ \tfrac{4}{16},\ \tfrac{9}{16}\right)" /> first passes <Katex tex="\tfrac12" />, not the mean.</>,
  },
]

export default function MethodsQ7_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The discrete random variable <Katex tex="X" /> has the following probability distribution.</p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold"><Katex tex="x" /></td>
                  <td className="px-3"><Katex tex="0" /></td>
                  <td className="px-3"><Katex tex="1" /></td>
                  <td className="px-3"><Katex tex="2" /></td>
                  <td className="px-3"><Katex tex="3" /></td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold"><Katex tex="\Pr(X=x)" /></td>
                  <td className="px-3"><Katex tex="a" /></td>
                  <td className="px-3"><Katex tex="3a" /></td>
                  <td className="px-3"><Katex tex="5a" /></td>
                  <td className="px-3"><Katex tex="7a" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">The mean of <Katex tex="X" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{16}" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="\dfrac{35}{16}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{17}{8}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Why the mean is a probability-weighted sum">
          <p>
            Think of the mean as the long-run average. The probabilities here are sixteenths, so
            imagine <Katex tex="16" /> typical observations of <Katex tex="X" />: about{' '}
            <Katex tex="1" /> zero, <Katex tex="3" /> ones, <Katex tex="5" /> twos and{' '}
            <Katex tex="7" /> threes. Their total is{' '}
            <Katex tex="0(1)+1(3)+2(5)+3(7)=34" />, so the average per observation is{' '}
            <Katex tex="\tfrac{34}{16}" />. Dividing each count by <Katex tex="16" /> first turns
            the counts into probabilities, and that is exactly{' '}
            <Katex tex="E(X)=\sum x\Pr(X=x)" />.
          </p>
          <p>
            Pictured, the mean is the <b>balance point</b> of the probability bars: stand each bar
            on a beam at its <Katex tex="x" />-value and the beam balances on a pivot at{' '}
            <Katex tex="E(X)" />. That is why the mean leans towards the heavy bars, here the
            larger values.
          </p>
        </Background>
      }
      extras={
        <Explore title="The mean is where the probability bars balance">
          <BalanceWidget />
        </Explore>
      }
    />
  )
}
