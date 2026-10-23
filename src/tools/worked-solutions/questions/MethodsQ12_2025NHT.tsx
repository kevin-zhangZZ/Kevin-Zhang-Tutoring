// 2025 Mathematical Methods NHT — Exam 2, MCQ 12. The NHT report gives the answer key only for
// this question, with no statistics or comment. Probability: the mean of a discrete random
// variable built from a die and a points table. Question text and table transcribed from the
// original paper (image-only, read from the rendered page). Solution is original; the answer A
// agrees with the report's key (E(X) = 6·2/6 − 3·3/6 + 9·1/6 = 2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
}

const cell = 'border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center'

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|ccc} x & 6 & -3 & 9 \\ \hline \Pr(X=x) & \tfrac26 & \tfrac36 & \tfrac16 \end{array}"
      />
    ),
    reason: <>Turn the table into a probability distribution: 2 of the 6 faces score 6 points, 3 faces score <Katex tex="-3" />, and 1 face scores 9.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(X)=\sum x\Pr(X=x)" />,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{E}(X)&=6\cdot\tfrac26+(-3)\cdot\tfrac36+9\cdot\tfrac16\\&=2-1.5+1.5\end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X)=2}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>The usual slips: averaging the three point values, <Katex tex="\tfrac{6-3+9}{3}=4" /> (option <b>C</b>), which treats the three rows as equally likely; or dropping the minus sign on <Katex tex="-3" />, which gives <Katex tex="2+1.5+1.5=5" /> (option <b>D</b>).</>,
  },
]

export default function MethodsQ12_2025NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>A game consists of rolling a fair six-sided die. Points are scored according to the following table.</p>
          <table className="text-[14px] border-collapse w-fit">
            <thead>
              <tr>
                <th className={`${cell} font-semibold`}>Number rolled</th>
                <th className={`${cell} font-semibold`}>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={cell}>1 or 2</td><td className={cell}>6</td></tr>
              <tr><td className={cell}>3, 4 or 5</td><td className={cell}>−3</td></tr>
              <tr><td className={cell}>6</td><td className={cell}>9</td></tr>
            </tbody>
          </table>
          <p>
            Let <Katex tex="X" /> be the random variable representing the number of points scored per roll.
            <br />
            The mean <Katex tex="\mathrm{E}(X)" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>2</>, isAnswer: true },
        { letter: 'B', content: <>3</> },
        { letter: 'C', content: <>4</> },
        { letter: 'D', content: <>5</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
