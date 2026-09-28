// 2019 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 65% correct (no comment
// in the report for this question). A point on a transformed graph, combining a horizontal dilation
// and a vertical translation. Question text transcribed from the original paper (no diagram).
// Solution is original. Interactive: meth-2019-mcq13-lookup (h reads f at x/2 — slide x until
// x/2 = −2; three sample curves through (−2, 7) all give (−4, 12); a toggle shows the "halve it"
// point (−1, 12) missing h). WrongMethod: halving the x-coordinate (x = −1 is in both A and B).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LookupWidget = lazyWidget(() => import('../interactives/meth-2019-mcq13-lookup'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 11, C: 65, D: 8, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Known: } f(-2)=7" />,
    reason: <>That is all the information there is about <Katex tex="f" />. We know its value at one input, <Katex tex="-2" />, and nowhere else — so the only place we can say anything about <Katex tex="h" /> is where <Katex tex="h" /> ends up feeding <Katex tex="f" /> the input <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="h(x) = f\!\left(\dfrac{x}{2}\right)+5 \implies \text{need } \dfrac{x}{2}=-2" />,
    reason: <>Read <Katex tex="h" /> as a recipe: take <Katex tex="x" />, halve it, feed that to <Katex tex="f" />, then add <Katex tex="5" />. The input to <Katex tex="f" /> is <Katex tex="\tfrac{x}{2}" />, not <Katex tex="x" />, so set <em>that</em> equal to the known input.</>,
  },
  {
    working: <Katex display tex="\dfrac{x}{2}=-2 \implies x=-4" />,
    reason: <>Multiply by <Katex tex="2" />. Seen as a transformation, replacing <Katex tex="x" /> by <Katex tex="\tfrac{x}{2}" /> dilates the graph by a factor of <Katex tex="2" /> <em>from</em> the <Katex tex="y" />-axis, so every <Katex tex="x" />-coordinate doubles: <Katex tex="-2\to-4" />. As a mapping, <Katex tex="(x,\,y)\to(2x,\ y+5)" />. It feels backwards (a &ldquo;half&rdquo; that doubles), and solving <Katex tex="\tfrac{x}{2}=-2" /> is the way to never get it backwards.</>,
  },
  {
    working: <Katex display tex="h(-4) = f(-2)+5 = 7+5 = 12" />,
    reason: <>The <Katex tex="+5" /> is outside <Katex tex="f" />, so it acts on the output: it lifts the <Katex tex="y" />-coordinate by <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(-4,12)}" />,
    reason: <>Matches option <b>C</b>. Options <b>A</b> and <b>B</b> both have <Katex tex="x=-1" />, which is what halving <Katex tex="-2" /> gives instead of doubling it (<Katex tex="23\%" /> between them). <b>E</b> <Katex tex="(3,\ 3.5)" /> is <Katex tex="(-2+5,\ 7\div2)" />: each change applied to the wrong coordinate.</>,
  },
]

export default function MethodsQ13_2019() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the function <Katex tex="f" /> passes through the point{' '}
          <Katex tex="(-2,7)" />. If <Katex tex="h(x)=f\!\left(\dfrac{x}{2}\right)+5" />, then the
          graph of the function <Katex tex="h" /> must pass through the point
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-1,-12)" /> },
        { letter: 'B', content: <Katex tex="(-1,19)" /> },
        { letter: 'C', content: <Katex tex="(-4,12)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(-4,-14)" /> },
        { letter: 'E', content: <Katex tex="(3,3.5)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the x-coordinate doubles: h reads f at x/2">
            <LookupWidget />
          </Explore>
          <WrongMethod
            title="x/2 means halve the x-coordinate"
            source="23% chose A or B"
            working={<Katex display tex="x = \dfrac{-2}{2} = -1 \qquad (\text{A or B})" />}
          >
            Check it by substituting: <Katex tex="h(-1) = f\!\left(-\tfrac12\right)+5" />, which feeds{' '}
            <Katex tex="f" /> the input <Katex tex="-\tfrac12" />, and nothing is known about{' '}
            <Katex tex="f\!\left(-\tfrac12\right)" />. The operation you see inside the bracket is what happens to{' '}
            <Katex tex="x" /> <em>before</em> <Katex tex="f" /> gets it, so to find the new point you undo it: solve{' '}
            <Katex tex="\tfrac{x}{2}=-2" />. A quick catch: halving and then adding 5 would give{' '}
            <Katex tex="(-1,\ 12)" />, which isn&apos;t even an option.
          </WrongMethod>
        </>
      }
    />
  )
}
