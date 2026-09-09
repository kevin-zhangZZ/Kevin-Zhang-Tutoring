// 2015 Mathematical Methods — Exam 2, MCQ 3.
// Identify the rule of a quartic from its graph: simple roots at b, d and a repeated (touching)
// root at c. Question text transcribed from the original paper; the diagram is the actual
// VCAA figure (cropped from the official exam PDF), not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import quarticSrc from './meth-2015-mcq3-quartic.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 61, B: 14, C: 20, D: 2, E: 4 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      The rule for the graph is in the form <Katex tex="f(x)=a(x-b)(x-c)^2(x-d)" />, where <Katex tex="a" />{' '}
      is negative and could be <Katex tex="-2" />: <Katex tex="f(x)=-2(x-b)(x-c)^2(x-d)" />. <Katex tex="b" />{' '}
      is negative; for example if <Katex tex="b=-2" />, the factor is <Katex tex="(x-(-2))=(x+2)" />. Most
      students chose option A, <Katex tex="y=-2(x+b)(x-c)^2(x-d)" />, but the factor <Katex tex="(x+b)" /> is
      incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = k(x-b)(x-c)^2(x-d)" />,
    reason: (
      <>
        <Katex tex="b" /> and <Katex tex="d" /> are simple roots (the curve crosses the axis there);{' '}
        <Katex tex="c" /> is a turning point sitting ON the axis, so it's a repeated root — it needs a
        squared factor. That's degree <Katex tex="1+2+1=4" />, a quartic.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{option D} = 2(x-b)(x-c)(x-d) \ \text{— degree 3, and it } \textit{crosses} \text{ at } c \ \times" />,
    reason: <>D has no squared factor, so it's a cubic that cuts straight through the axis at <Katex tex="c" /> instead of touching it. Eliminated.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\to\pm\infty" />
        <Katex display tex="\implies\; y\to-\infty" />
        <Katex display tex="\implies\; k<0" />
        <Katex display tex="\implies\; k=-2, \ \text{not } +2" />
      </>
    ),
    reason: <>Both tails of the graph point downwards, which for a quartic means a negative leading coefficient. That eliminates option B <Katex tex="(+2)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{root at } x=b" />
        <Katex display tex="\iff\; \text{factor } (x-b), \quad \text{whatever the sign of } b" />
      </>
    ),
    reason: (
      <>
        This is the step most students got wrong. <Katex tex="b" /> is negative <em>as a number</em>, but the
        factor for a root at <Katex tex="x=b" /> is always <Katex tex="(x-b)" />. Option A's{' '}
        <Katex tex="(x+b)" /> has its root where <Katex tex="x+b=0" />, i.e. at <Katex tex="x=-b" /> — a{' '}
        <em>positive</em> number, which is the wrong side of the origin.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{option E} = -2(x-b)(x+c)^2(x+d) \ \text{— roots at } b,\,-c,\,-d \ \times" />,
    reason: <>Same trap on the other two factors: E puts the repeated root at <Katex tex="-c" /> and the last root at <Katex tex="-d" />, neither of which matches the graph. Eliminated.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-2(x-b)(x-c)^2(x-d)}" />,
    reason: (
      <>
        Option <b>C</b> is the only one with a negative leading coefficient, simple roots at exactly{' '}
        <Katex tex="x=b" /> and <Katex tex="x=d" />, and a squared factor at <Katex tex="x=c" />.
      </>
    ),
  },
]

export default function MethodsQ3_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">The rule for a function with the graph above could be:</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img src={quarticSrc} alt="Quartic graph with simple roots at b and d and a repeated (touching) root at c, from the original 2015 VCAA exam paper" className="w-full max-w-[340px]" />
          </div>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'B', content: <Katex tex="y=2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'C', content: <Katex tex="y=-2(x-b)(x-c)^2(x-d)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=2(x-b)(x-c)(x-d)" /> },
        { letter: 'E', content: <Katex tex="y=-2(x-b)(x+c)^2(x+d)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
