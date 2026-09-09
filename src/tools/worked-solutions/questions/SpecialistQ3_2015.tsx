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
  comment: (
    <>
      <Katex tex="a^2x^2+(1-a^2)y^2=c^2" /> is a circle when <Katex tex="a^2=\tfrac12" />. It is a hyperbola
      when <Katex tex="|a|>1" /> and an ellipse when <Katex tex="|a|<1" />. It is a pair of straight lines{' '}
      (<Katex tex="x=\pm c" />) when <Katex tex="a=\pm1" />.
    </>
  ),
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
    working: <Katex display tex="c\ne0 \;\implies\; x=c \text{ and } x=-c \text{ are two distinct lines}" />,
    reason: <>Since <Katex tex="c" /> is given non-zero, <Katex tex="x=\pm c" /> is always a genuine <em>pair</em> of parallel lines, never a single repeated line — that would need <Katex tex="c=0" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\pm\tfrac{1}{\sqrt2} \;\implies\; P=Q=\tfrac12" />
        <Katex display tex="\implies\; x^2+y^2=2c^2 \ \text{(a circle)}" />
      </>
    ),
    reason: <>The circle case rules out <b>A</b>: it can occur, at this one special value of <Katex tex="a" />.</>,
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
        <Katex display tex="\text{Every value of } a \text{ gives a circle, ellipse, or hyperbola,}" />
        <Katex display tex="\boxed{\text{or a } \textit{pair}\text{ of lines} - \text{never a single line}}" />
      </>
    ),
    reason: <>Matches option <b>D</b> — a single straight line is the one shape this relation can never produce, since <Katex tex="c\ne0" /> forces <Katex tex="x=\pm c" /> to stay two distinct lines whenever it degenerates at all.</>,
  },
]

export default function SpecialistQ3_2015() {
  return (
    <MCQShell
      question={
        <p>
          If both <Katex tex="a" /> and <Katex tex="c" /> are non-zero real numbers, the relation{' '}
          <Katex tex="a^2x^2 + (1-a^2)y^2 = c^2" /> cannot represent
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
