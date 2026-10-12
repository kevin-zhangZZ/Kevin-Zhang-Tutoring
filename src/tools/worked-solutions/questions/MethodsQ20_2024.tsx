// 2024 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 41% correct. This
// year's paper used four options (A–D) rather than five. Definite integral of a period-2
// function over two periods, given its average value on one period. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 23, C: 41, D: 14 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\tfrac12\int_0^2f(x)\,dx=k" />, <Katex tex="\int_0^2f(x)\,dx=2k" />
      <br />
      <Katex tex="\int_0^2f(x)\,dx=\int_2^4f(x)\,dx=\int_4^6f(x)\,dx=2k" />
      <br />
      <Katex tex="\int_2^6f(x)\,dx=4k" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=f(x+2) \text{ for all } x\in R" />,
    reason: <><Katex tex="f" /> is periodic with period 2: its graph repeats every 2 units.</>,
  },
  {
    working: <Katex display tex="\frac{1}{2-0}\int_0^2 f(x)\,dx = k" />,
    reason: <>The average value of <Katex tex="f" /> on <Katex tex="[a,b]" /> is <Katex tex="\frac{1}{b-a}\int_a^b f(x)\,dx" />; here it equals <Katex tex="k" />.</>,
    more: <>The trap is treating <Katex tex="k" /> as the area itself. The average value is the area divided by the interval's width, so the area over one period is <Katex tex="2k" />, not <Katex tex="k" />. Making this slip gives <Katex tex="k+k=2k" /> over the two periods, option <b>A</b>.</>,
  },
  {
    working: <Katex display tex="\int_0^2 f(x)\,dx = 2k" />,
    reason: <>Multiply both sides by 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_2^4 f(x)\,dx &= \int_0^2 f(x)\,dx = 2k \\ \int_4^6 f(x)\,dx &= \int_0^2 f(x)\,dx = 2k \end{aligned}" />,
    reason: <>Because <Katex tex="f" /> repeats every 2 units, the integral over <i>any</i> length-2 interval equals the integral over <Katex tex="[0,2]" />.</>,
    more: <>The graph on <Katex tex="[2,4]" /> is the graph on <Katex tex="[0,2]" /> shifted 2 units right (and likewise for <Katex tex="[4,6]" />), so the signed areas are identical.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_2^6 f(x)\,dx &= \int_2^4 f(x)\,dx + \int_4^6 f(x)\,dx \\ &= 2k+2k \\ &= 4k \end{aligned}" />,
    reason: <>Split <Katex tex="[2,6]" /> into two length-2 pieces, one period each.</>,
  },
  {
    working: <Katex display tex="\boxed{4k}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        Check: the average value over every whole period is <Katex tex="k" />, so over{' '}
        <Katex tex="[2,6]" /> (width 4) the integral is average × width <Katex tex="=4k" />.{' '}
        <b>A</b>, <Katex tex="2k" />, is the integral over a single period only, or two periods at <Katex tex="k" /> each (the slip above). <b>D</b>,{' '}
        <Katex tex="6k" />, is the integral over three periods, i.e. over <Katex tex="[0,6]" /> rather
        than <Katex tex="[2,6]" />. <b>B</b>, <Katex tex="3k" />, cannot be right: <Katex tex="[2,6]" /> is a whole number
        of periods, each contributing <Katex tex="2k" />, so the answer must be a multiple of <Katex tex="2k" />. One way to reach it is to combine both slips: three periods (<Katex tex="0" /> to <Katex tex="6" />) at <Katex tex="k" /> each.
      </>
    ),
  },
]

export default function MethodsQ20_2024() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f:R\to R" /> has an average value <Katex tex="k" /> on the
          interval <Katex tex="[0,2]" /> and satisfies <Katex tex="f(x)=f(x+2)" /> for all{' '}
          <Katex tex="x\in R" />. The value of the definite integral{' '}
          <Katex tex="\displaystyle\int_2^6 f(x)\,dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2k" /> },
        { letter: 'B', content: <Katex tex="3k" /> },
        { letter: 'C', content: <Katex tex="4k" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="6k" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
