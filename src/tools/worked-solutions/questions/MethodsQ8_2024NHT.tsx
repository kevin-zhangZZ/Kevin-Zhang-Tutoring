// 2024 Mathematical Methods NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with
// no statistics. Probability: a conditional probability from a discrete probability distribution.
// Question text (including the table) transcribed from the original paper. Solution is original;
// the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(N>1\mid N\geq1)&=\frac{\Pr(N>1\cap N\geq1)}{\Pr(N\geq1)}\\&=\frac{\Pr(N\geq2)}{\Pr(N\geq1)}\end{aligned}" />,
    reason: <>&ldquo;Has previously visited&rdquo; is <Katex tex="N\geq1" />, the given information, so it goes after the bar. &ldquo;More than once&rdquo; is <Katex tex="N>1" />, i.e. <Katex tex="N\geq2" />. Every visitor with <Katex tex="N\geq2" /> also has <Katex tex="N\geq1" />, so the intersection is just <Katex tex="N\geq2" />.</>,
  },
  {
    working: <Katex display tex="\Pr(N\geq2)=0.25+0.15+0.05=0.45" />,
    reason: <>Add the table's probabilities for <Katex tex="n=2" />, <Katex tex="3" /> and <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(N\geq1)&=1-\Pr(N=0)\\&=1-0.25=0.75\end{aligned}" />,
    reason: <>The complement is quicker than adding four probabilities.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{0.45}{0.75}=0.6}" />,
    reason: <>Matches option <b>B</b>. Check: among the visitors who have been before, <Katex tex="0.3" /> out of <Katex tex="0.75" /> (40%) have been exactly once, and the other 60% more than once.</>,
    more: <>Option D, <Katex tex="0.45" />, is <Katex tex="\Pr(N\geq2)" /> alone: the numerator, never divided by the probability of the given event.</>,
  },
]

const CELL = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

export default function MethodsQ8_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>When entering a zoo, visitors are asked how many times they have previously visited.</p>
          <p>
            The discrete random variable, <Katex tex="N" />, with the probability distribution shown below, can be used to model the number of times each visitor has previously visited.
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <tbody>
                <tr>
                  <th className={`${CELL} font-normal`}><Katex tex="n" /></th>
                  {['0', '1', '2', '3', '4'].map((v) => (
                    <td key={v} className={CELL}><Katex tex={v} /></td>
                  ))}
                </tr>
                <tr>
                  <th className={`${CELL} font-normal whitespace-nowrap`}><Katex tex="\Pr(N=n)" /></th>
                  {['0.25', '0.3', '0.25', '0.15', '0.05'].map((v, i) => (
                    <td key={i} className={CELL}><Katex tex={v} /></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p>Given that a visitor has previously visited the zoo, what is the probability that they have previously visited more than once?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.73" /> },
        { letter: 'B', content: <Katex tex="0.6" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.55" /> },
        { letter: 'D', content: <Katex tex="0.45" /> },
        { letter: 'E', content: <Katex tex="0.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
