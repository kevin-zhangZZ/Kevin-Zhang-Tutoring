// 2023 Mathematical Methods NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with
// no statistics. Functions: the number of x-intercepts of x^n − px + 1 for p < 0 (odd n makes the
// graph strictly increasing). Question text transcribed from the original paper, including its
// wording "positive whole number larger than zero". Solution is original; the answer E agrees with
// the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p<0\implies f(x)=x^n+qx+1,\ \ q=-p>0" />,
    reason: <>Rename <Katex tex="-p" /> as a positive number <Katex tex="q" />, so the signs are easier to see: the <Katex tex="x" />-term has a <b>positive</b> coefficient.</>,
  },
  {
    working: <Katex display tex="n \text{ odd}:\ \ f'(x)=nx^{n-1}+q>0 \text{ for all } x" />,
    reason: <>When <Katex tex="n" /> is odd, <Katex tex="n-1" /> is even, so <Katex tex="x^{n-1}\geq0" /> and <Katex tex="f'(x)\geq q>0" />. The graph is strictly increasing everywhere.</>,
    more: <>A strictly increasing polynomial of odd degree runs from <Katex tex="-\infty" /> to <Katex tex="\infty" />, so it crosses the <Katex tex="x" />-axis, and since it never turns back it crosses exactly once. This holds for every <Katex tex="p<0" />, which is what the question needs: the answer can&apos;t depend on which negative <Katex tex="p" /> is chosen.</>,
  },
  {
    working: <Katex display tex="n=2:\ \ \Delta=q^2-4" />,
    reason: <>An even power fails: <Katex tex="x^2+qx+1=0" /> has two solutions when <Katex tex="q>2" />, one when <Katex tex="q=2" /> and none when <Katex tex="0<q<2" />. The number of intercepts depends on <Katex tex="p" />, so <Katex tex="n=2" /> doesn&apos;t guarantee exactly one.</>,
    more: <>For example <Katex tex="p=-1" /> gives <Katex tex="x^2+x+1" />, which never touches the axis, while <Katex tex="p=-3" /> gives <Katex tex="x^2+3x+1" />, with two intercepts.</>,
  },
  {
    working: <Katex display tex="n\in\{1,3,5,7\}\ \text{work};\ \ \text{highest}:\ \boxed{n=7}" />,
    reason: <>Matches option <b>E</b>. Every odd option (1, 3, 5, 7) gives exactly one <Katex tex="x" />-intercept, and the question asks for the highest of them.</>,
    more: <>Options <b>A</b>, <b>C</b> and <b>D</b> also give exactly one intercept, so they are true but not the highest. <Katex tex="n=1" /> is the straight line <Katex tex="y=(1+q)x+1" />, with positive gradient.</>,
  },
]

export default function MethodsQ4_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider the polynomial equation <Katex tex="f(x)=x^n-px+1" />, where <Katex tex="p<0" />, and <Katex tex="n" /> is a positive whole number larger than zero.
          </p>
          <p>
            The highest value of <Katex tex="n" />, from the options below, for which the graph of <Katex tex="y=f(x)" /> has exactly one <Katex tex="x" />-intercept is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="7" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
