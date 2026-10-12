// 2024 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 52% correct.
// The range of a composite: find the inner range first, then feed it through. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 9, C: 21, D: 52 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2-4x = (x-2)^2-4 \ \text{ on } (1,\infty)" />,
    reason: <>The outputs of <Katex tex="f" /> are the inputs of <Katex tex="g" />, so find <Katex tex="\text{ran}(f)" /> first. Completing the square puts the vertex at <Katex tex="(2,-4)" />.</>,
  },
  {
    working: <Katex display tex="\text{ran}(f) = [-4,\infty)" />,
    reason: <>The vertex <Katex tex="x=2" /> lies inside <Katex tex="(1,\infty)" />, so the minimum <Katex tex="-4" /> is attained: closed bracket.</>,
    more: <>Don't just evaluate <Katex tex="f" /> at the end of the domain. At the open end <Katex tex="x=1" />, <Katex tex="f(1)=-3" />, but the parabola keeps going down until <Katex tex="x=2" />, so <Katex tex="-3" /> is not the lowest value. Leaving out <Katex tex="x=1" /> costs nothing either: <Katex tex="f(3)=-3" />, so <Katex tex="-3" /> (and every value down to <Katex tex="-4" />) is still reached to the right of the vertex.</>,
  },
  {
    working: <Katex display tex="g(u) = e^{-u} \ \text{ on } u\in[-4,\infty)" />,
    reason: <>Now feed that range through the outer function, calling its input <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &e^{-u} \text{ is decreasing:} \\ &u=-4 \mapsto e^{4}; \quad u\to\infty \mapsto 0^+ \end{aligned}" />,
    reason: <>Larger <Katex tex="u" /> gives smaller <Katex tex="e^{-u}" />, so the smallest input gives the largest output <Katex tex="e^4" />, attained; 0 is approached but never reached.</>,
    more: <>Because <Katex tex="g" /> is decreasing, the order flips: the bottom of the inner range (<Katex tex="u=-4" />) becomes the top of the final range, and the top (<Katex tex="u\to\infty" />) becomes the bottom. The brackets carry across with their ends: <Katex tex="-4" /> was included, so <Katex tex="e^{4}" /> is included; <Katex tex="\infty" /> is never reached, so 0 is never reached (an exponential is always positive).</>,
  },
  {
    working: <Katex display tex="\boxed{\left(0,\ e^4\right]}" />,
    reason: <>Matches option <b>D</b>: exponent 4 from the vertex, closed at <Katex tex="e^4" /> because the vertex is in the domain.</>,
    more: <>Each wrong option misses one of those two details. Options <b>A</b> and <b>B</b> (<Katex tex="e^3" />) use <Katex tex="f(1)=-3" /> as the minimum of <Katex tex="f" />, ignoring the vertex. Option <b>C</b>, <Katex tex="\left(0,e^4\right)" />, the most common wrong answer, has the right value but an open bracket, as if <Katex tex="e^4" /> were only approached; it is reached, at <Katex tex="x=2" />.</>,
  },
]

export default function MethodsQ5_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the functions <Katex tex="f:(1,\infty)\to R" />,{' '}
          <Katex tex="f(x)=x^2-4x" /> and <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=e^{-x}" />.
          <br />
          The range of the composite function{' '}
          <Katex tex="g\bigl(f(x)\bigr)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(0,e^3\right)" /> },
        { letter: 'B', content: <Katex tex="\left(0,e^3\right]" /> },
        { letter: 'C', content: <Katex tex="\left(0,e^4\right)" /> },
        { letter: 'D', content: <Katex tex="\left(0,e^4\right]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
