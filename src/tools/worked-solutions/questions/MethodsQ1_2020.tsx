// 2020 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 84% correct.
// Evaluating a composite function from a table of values. Question text transcribed from the original paper; solution is original.
// Answer D checked against the VCAA report (no comment printed for this question) and itute (D).
// Distractors verified: C = f(g(−1)) = f(2) = 5 (the composite in the other order), B = f(−1)
// (stopping after the inside function), A = g(−1). No clean slip gives E, so it isn't named.
// Interactive diagram (§15): interactives/meth-2020e2-mcq1-machines.tsx shows the composite as two
// function machines in a row, inside first, with a switch to the other order (option C) and an
// input for which the chain stalls because the needed value isn't given. This site's own
// explanatory figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MachinesWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq1-machines'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 6, C: 5, D: 84, E: 1 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g\bigl(f(-1)\bigr)" />,
    reason: <>Work from the inside out. <Katex tex="g" /> can&apos;t act until we know what is in its bracket, so <Katex tex="f(-1)" /> is worked out first, even though <Katex tex="g" /> is written first.</>,
  },
  {
    working: <Katex display tex="f(-1) = 4" />,
    reason: <>Given.</>,
  },
  {
    working: <Katex display tex="g\bigl(f(-1)\bigr) = g(4)" />,
    reason: <>The output of <Katex tex="f" /> becomes the input of <Katex tex="g" />: the 4 is not the answer yet, it is what goes into <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(4) = 6}" />,
    reason: <>Matches option <b>D</b> (<Katex tex="g(4)=6" /> is given). Option <b>B</b> (<Katex tex="4" />) stops one step early at <Katex tex="f(-1)" />; option <b>A</b> is <Katex tex="g(-1)=2" />, <Katex tex="g" /> applied to <Katex tex="-1" /> directly; option <b>C</b> is <Katex tex="f\bigl(g(-1)\bigr)=f(2)=5" />, the composite in the other order (<Katex tex="g" /> first, then <Katex tex="f" />).</>,
  },
]

export default function MethodsQ1_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f" /> and <Katex tex="g" /> be functions such that{' '}
            <Katex tex="f(-1)=4" />, <Katex tex="f(2)=5" />, <Katex tex="g(-1)=2" />,{' '}
            <Katex tex="g(2)=7" /> and <Katex tex="g(4)=6" />.
          </p>
          <p>The value of <Katex tex="g\bigl(f(-1)\bigr)" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="7" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="A composite is two machines in a row: the inside one works first, and its output is the outside one's input">
          <MachinesWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
