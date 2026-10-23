// 2026 Mathematical Methods NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: minimum total surface area of a closed cylinder of fixed volume V. Question text
// transcribed from the original paper. Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      The surface area is <Katex tex="A=2\pi r^2+2\pi rh" />.
      <br />
      Using the volume <Katex tex="V=\pi r^2h" />, we can obtain <Katex tex="h=\dfrac{V}{\pi r^2}" />,
      <br />
      then write the surface area as:
      <br />
      <Katex tex="A=2\pi r^2+2\pi r\left(\dfrac{V}{\pi r^2}\right)" />
      <br />
      <Katex tex="\phantom{A}=2\pi r^2+\dfrac{2V}{r}" />
      <br />
      This function has a minimum when:
      <br />
      <Katex tex="\dfrac{dA}{dr}=0" />
      <br />
      <Katex tex="4\pi r-\dfrac{2V}{r^2}=0" />
      <br />
      <Katex tex="r=\sqrt[3]{\dfrac{V}{2\pi}}" />
      <br />
      Substituting this back into the surface area function gives the minimum possible area of <Katex tex="3\left(\sqrt[3]{2\pi V^2}\right)" /> cm<sup>2</sup>.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V=\pi r^2h\ \Rightarrow\ h=\frac{V}{\pi r^2}" />,
    reason: <>The volume is fixed, so it links <Katex tex="h" /> to <Katex tex="r" />. Use it to write the area in one variable.</>,
  },
  {
    working: <Katex display tex="A=2\pi r^2+2\pi rh=2\pi r^2+\frac{2V}{r}" />,
    reason: <>Top and base are two circles, <Katex tex="2\pi r^2" />; the curved side unrolls to a rectangle <Katex tex="2\pi r" /> by <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dA}{dr}=4\pi r-\frac{2V}{r^2}&=0\\r^3&=\frac{V}{2\pi}\\r&=\sqrt[3]{\frac{V}{2\pi}}\end{aligned}" />,
    reason: <>Stationary point. It is a minimum: <Katex tex="\tfrac{d^2A}{dr^2}=4\pi+\tfrac{4V}{r^3}>0" /> for <Katex tex="r>0" />.</>,
    more: <>The shape of the curve says the same: <Katex tex="A\to\infty" /> as <Katex tex="r\to0^+" /> (a thin, tall can) and as <Katex tex="r\to\infty" /> (a wide, flat one), so the one stationary point in between is the lowest point.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}V=2\pi r^3\ \Rightarrow\ A&=2\pi r^2+\frac{2(2\pi r^3)}{r}\\&=6\pi r^2\\&=6\pi\left(\frac{V}{2\pi}\right)^{2/3}\\&=3(2\pi)^{1/3}V^{2/3}\end{aligned}" />,
    reason: <>Substitute back. Writing <Katex tex="V" /> as <Katex tex="2\pi r^3" /> keeps the algebra short; then <Katex tex="6\pi\div(2\pi)^{2/3}=3(2\pi)^{1/3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3\left(\sqrt[3]{2\pi V^2}\right)\ \text{cm}^2}" />,
    reason: <>Matches option <b>D</b>. Sanity check: <Katex tex="h=\tfrac{V}{\pi r^2}=\tfrac{2\pi r^3}{\pi r^2}=2r" />, so the best can is as tall as it is wide, the classic result.</>,
    more: <>Option <b>A</b> is the optimal radius, a length rather than an area. Options <b>B</b> and <b>C</b> are the optimal radius and minimum area for a can <b>without</b> a top: <Katex tex="A=\pi r^2+\tfrac{2V}{r}" /> gives <Katex tex="r=\sqrt[3]{\tfrac{V}{\pi}}" /> and <Katex tex="A=3\sqrt[3]{\pi V^2}" />. The question says the area includes the base <b>and</b> top.</>,
  },
]

export default function MethodsQ20_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            A soup company wishes to design a new can for its soup. The can must be in the shape of a cylinder with a fixed volume <Katex tex="V" /> cm<sup>3</sup>.
          </p>
          <p>
            In order to minimise costs, the company chooses the radius and height that minimise the total surface area of the can, which includes the base and top.
          </p>
          <p>The minimum possible total surface area of the can is equal to</p>
        </div>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\sqrt[3]{\dfrac{V}{2\pi}}" /> cm<sup>2</sup></> },
        { letter: 'B', content: <><Katex tex="\sqrt[3]{\dfrac{V}{\pi}}" /> cm<sup>2</sup></> },
        { letter: 'C', content: <><Katex tex="3\left(\sqrt[3]{\pi V^2}\right)" /> cm<sup>2</sup></> },
        { letter: 'D', content: <><Katex tex="3\left(\sqrt[3]{2\pi V^2}\right)" /> cm<sup>2</sup></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
