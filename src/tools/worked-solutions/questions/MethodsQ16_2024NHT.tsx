// 2024 Mathematical Methods NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: chain rule for a composite evaluated from tables of values. Question text and
// tables transcribed from the original paper. Solution is original; the answer A agrees with the
// report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="\dfrac{d}{dx}g\big(f(x)\big)" />
      <br />
      <Katex tex="=g'\big(f(x)\big)\times f'(x)" />
      <br />
      <Katex tex="=g'\big(f(0)\big)\times f'(0)" />
      <br />
      <Katex tex="=g'(2)\times f'(0)" />
      <br />
      <Katex tex="=3\times -1" />
      <br />
      <Katex tex="=-3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\big(g(f(x))\big)=g'\big(f(x)\big)\times f'(x)" />,
    reason: <>Chain rule: <Katex tex="(g\circ f)(x)=g(f(x))" /> is <Katex tex="g" /> applied to the inside function <Katex tex="f(x)" />, so differentiate <Katex tex="g" /> <b>at the inside</b>, then multiply by the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="x=0:\quad g'\big(f(0)\big)\times f'(0)=g'(2)\times f'(0)" />,
    reason: <>Work from the inside out: <Katex tex="f(0)=2" /> from the first table, so <Katex tex="g'" /> is read at <Katex tex="x=2" />, not at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="=3\times(-1)" />,
    reason: <><Katex tex="g'(2)=3" /> from the second table and <Katex tex="f'(0)=-1" /> from the first.</>,
  },
  {
    working: <Katex display tex="\boxed{-3}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>C</b> (0) reads <Katex tex="g'" /> at the wrong place: <Katex tex="g'(0)\times f'(0)=0\times(-1)" />. Option <b>D</b> (1) uses <Katex tex="g" /> where <Katex tex="g'" /> belongs: <Katex tex="g(f(0))\times f'(0)=g(2)\times f'(0)=(-1)(-1)" />. The outer function must be <b>differentiated</b>, and at <Katex tex="f(0)" />.</>,
  },
]

const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

function ValueTable({ name }: { name: 'f' | 'g' }) {
  const rows = name === 'f'
    ? [['f(x)', '2', '-1'], ["f'(x)", '-1', '2']]
    : [['g(x)', '1', '-1'], ["g'(x)", '0', '3']]
  return (
    <table className="text-[13.5px] border-collapse">
      <tbody>
        <tr>
          <td className="px-3 py-1.5" />
          <td className={cell}><Katex tex="x=0" /></td>
          <td className={cell}><Katex tex="x=2" /></td>
        </tr>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((c, i) => (
              <td key={i} className={cell}><Katex tex={c} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function MethodsQ16_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The values for two continuous functions, <Katex tex="f" /> and <Katex tex="g" />, and their derivatives
            are given in the tables below.
          </p>
          <div className="flex flex-wrap gap-6 overflow-x-auto">
            <ValueTable name="f" />
            <ValueTable name="g" />
          </div>
          <p>
            What is the value of <Katex tex="\dfrac{d}{dx}\big((g\circ f)(x)\big)" /> at <Katex tex="x=0" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="-3" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-1" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="1" /> },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
