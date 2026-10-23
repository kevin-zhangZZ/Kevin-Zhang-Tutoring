// 2026 Mathematical Methods NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: how the average value changes under g(x) = mf(nx) + c. Question text
// transcribed from the original paper. Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      The graph of <Katex tex="y=g(x)" /> is obtained by performing the following sequence of transformations to the graph of <Katex tex="y=f(x)" />.
      <br />
      Dilation by factor <Katex tex="m" /> from the <i>x</i>-axis
      <br />
      Dilation by factor <Katex tex="\dfrac{1}{n}" /> from the <i>y</i>-axis
      <br />
      Translation by <Katex tex="c" /> units up
      <br />
      <br />
      Transformations 1 and 3 transform the average value from <Katex tex="2" /> to <Katex tex="2m+c" />.
      <br />
      Transformation 2 transforms the interval from <Katex tex="[-1,1]" /> to <Katex tex="\left[\dfrac{-1}{n},\dfrac{1}{n}\right]" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{1-(-1)}\int_{-1}^{1}f(x)\,dx=2\ \Rightarrow\ \int_{-1}^{1}f(x)\,dx=4" />,
    reason: <>Average value <Katex tex="=\tfrac{1}{b-a}\int_a^b f(x)\,dx" />. Turn the given average into the area it encodes.</>,
  },
  {
    working: <Katex display tex="\int_{-1/n}^{1/n}f(nx)\,dx=\frac1n\int_{-1}^{1}f(x)\,dx=\frac4n" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="nx" /> is a dilation by factor <Katex tex="\tfrac1n" /> from the <i>y</i>-axis. It squeezes the graph over <Katex tex="[-1,1]" /> onto <Katex tex="\left[-\tfrac1n,\tfrac1n\right]" /> without changing any heights, so the area shrinks by the same factor <Katex tex="\tfrac1n" />.</>,
  },
  {
    working: <Katex display tex="\int_{-1/n}^{1/n}\big(mf(nx)+c\big)\,dx=m\cdot\frac4n+c\cdot\frac2n" />,
    reason: <>Split the integral. The constant <Katex tex="c" /> integrates to <Katex tex="c" /> times the interval&apos;s width, <Katex tex="\tfrac2n" />.</>,
  },
  {
    working: <Katex display tex="\text{average}=\frac{1}{2/n}\left(\frac{4m}{n}+\frac{2c}{n}\right)=2m+c" />,
    reason: <>Divide by the width <Katex tex="\tfrac2n" />. Every height is multiplied by <Katex tex="m" /> then raised by <Katex tex="c" />, so the average is too: <Katex tex="2\to 2m+c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2m+c\ \text{over}\ \left[-\tfrac1n,\tfrac1n\right]}" />,
    reason: <>Matches option <b>D</b>. Options <b>A</b> and <b>B</b> leave out <Katex tex="c" />: translating up by <Katex tex="c" /> raises every height, so it raises the average by <Katex tex="c" />. Options <b>A</b> and <b>C</b> stretch the interval to <Katex tex="[-n,n]" />, which would be a dilation by factor <Katex tex="n" />; over that interval the average depends on values of <Katex tex="f" /> outside <Katex tex="[-1,1]" />, which we know nothing about.</>,
  },
]

export default function MethodsQ15_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Consider a continuous function <Katex tex="f:R\to R" />, which has an average value of 2 over the interval <Katex tex="[-1,1]" />.
          </p>
          <p>
            Let <Katex tex="g:R\to R,\ g(x)=mf(nx)+c" />, where <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="c" /> are positive real numbers.
          </p>
          <p>
            Which one of the following must be true for all possible values of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="c" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <><Katex tex="g" /> has an average value of <Katex tex="2m" /> over the interval <Katex tex="[-n,n]" /></> },
        { letter: 'B', content: <><Katex tex="g" /> has an average value of <Katex tex="2m" /> over the interval <Katex tex="\left[-\dfrac1n,\dfrac1n\right]" /></> },
        { letter: 'C', content: <><Katex tex="g" /> has an average value of <Katex tex="2m+c" /> over the interval <Katex tex="[-n,n]" /></> },
        { letter: 'D', content: <><Katex tex="g" /> has an average value of <Katex tex="2m+c" /> over the interval <Katex tex="\left[-\dfrac1n,\dfrac1n\right]" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
