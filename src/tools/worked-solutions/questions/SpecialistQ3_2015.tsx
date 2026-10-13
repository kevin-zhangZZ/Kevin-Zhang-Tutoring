// 2015 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 50% correct.
// Classify what conic (or degenerate case) a²x² + (1-a²)y² = c² can and can't represent.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 5, C: 10, D: 50, E: 19 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a^2x^2+(1-a^2)y^2=c^2, \qquad a,c\ne0" />,
    reason: <>Write <Katex tex="P=a^2" /> (coefficient of <Katex tex="x^2" />) and <Katex tex="Q=1-a^2" /> (coefficient of <Katex tex="y^2" />). Since <Katex tex="a\ne0" />, <Katex tex="P>0" /> always.</>,
  },
  {
    working: (
      <>
        <Katex display tex="Q=0 \iff a^2=1 \iff a=\pm1" />
        <Katex display tex="\implies\; x^2=c^2 \implies x=\pm c" />
      </>
    ),
    reason: <>When <Katex tex="a=\pm1" />, the <Katex tex="y^2" /> term vanishes entirely, leaving just an equation in <Katex tex="x" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="c\ne0 \;\implies\; x=c \text{ and } x=-c" />
        <Katex display tex="\text{are two distinct parallel lines}" />
      </>
    ),
    reason: <>Since <Katex tex="c\ne0" />, the values <Katex tex="c" /> and <Katex tex="-c" /> differ, so this is always a <em>pair</em> of lines. A single line would need <Katex tex="c=0" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\pm\tfrac{1}{\sqrt2} \;\implies\; P=Q=\tfrac12" />
        <Katex display tex="\implies\; x^2+y^2=2c^2 \ \text{(a circle)}" />
      </>
    ),
    reason: <>A circle needs equal coefficients: <Katex tex="a^2=1-a^2" />, so <Katex tex="a^2=\tfrac12" />. A circle can occur, which rules out <b>A</b>.</>,
  },
  {
    working: (
      <>
        <Katex display tex="0<|a|<1,\ a\ne\pm\tfrac{1}{\sqrt2} \;\implies\; P,Q>0,\ P\ne Q" />
        <Katex display tex="\implies\; \text{an ellipse}" />
      </>
    ),
    reason: <>Rules out <b>B</b>: two positive, unequal coefficients on <Katex tex="x^2" /> and <Katex tex="y^2" /> is exactly an ellipse.</>,
  },
  {
    working: (
      <>
        <Katex display tex="|a|>1 \;\implies\; Q=1-a^2<0" />
        <Katex display tex="\implies\; a^2x^2 - (a^2-1)y^2 = c^2 \ \text{(a hyperbola)}" />
      </>
    ),
    reason: <>Rules out <b>C</b>: opposite-signed <Katex tex="x^2" /> and <Katex tex="y^2" /> coefficients is exactly a hyperbola.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Every value of } a \text{ gives a circle,}" />
        <Katex display tex="\text{an ellipse, a hyperbola,}" />
        <Katex display tex="\boxed{\text{or a } \textit{pair}\text{ of lines, never a single line}}" />
      </>
    ),
    reason: <>Matches option <b>D</b>: these cases cover every non-zero <Katex tex="a" />, and none is a single line.</>,
    more: (
      <>
        Option <b>E</b> (19%) was the most popular wrong answer, but a pair of lines <em>is</em>{' '}
        possible, at <Katex tex="a=\pm1" />. Option <b>A</b> (15%) fails because the circle does
        occur, but only at the special value <Katex tex="a^2=\tfrac12" />; it is easy to miss if
        you only try values such as <Katex tex="a=1" /> or <Katex tex="a=2" />.
      </>
    ),
  },
]

export default function SpecialistQ3_2015() {
  return (
    <MCQShell
      question={
        <p>
          If both <Katex tex="a" /> and <Katex tex="c" /> are non-zero real numbers, the relation{' '}
          <Katex tex="a^2x^2 + (1-a^2)y^2 = c^2" /> <b>cannot</b> represent
        </p>
      }
      options={[
        { letter: 'A', content: 'a circle.' },
        { letter: 'B', content: 'an ellipse.' },
        { letter: 'C', content: 'a hyperbola.' },
        { letter: 'D', content: 'a single straight line.', isAnswer: true },
        { letter: 'E', content: 'a pair of straight lines.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
