// 2025 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. Finding a counter-example to
// "f''(0)=0 implies an inflection point at x=0". Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 6, C: 40, D: 48 },
  answer: 'D',
  comment: (
    <>
      To show a point of inflection exists at <Katex tex="x=0" />, the second derivative must equal
      zero at <Katex tex="x=0" /> and there must be a change of sign of the second derivative
      either side of <Katex tex="x=0" />. CAS can be used to determine this in the algebra menu, or
      students could use the graphing menu to see the shape of the graph.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Inflection at <Katex tex="x=0" /> needs <Katex tex="f''" /> to change sign there (so <Katex tex="f''(0)=0" /> whenever <Katex tex="f''(0)" /> exists).</>,
    reason: <>So a counter-example needs <Katex tex="f''(0)=0" /> (the &ldquo;if&rdquo; part true) but <i>no</i> inflection at <Katex tex="x=0" /> (the &ldquo;then&rdquo; part false).</>,
    more: <>So <Katex tex="f''(0)" /> must exist and equal 0, yet the concavity is the same on both sides of <Katex tex="x=0" />. A function failing the &ldquo;if&rdquo; part disproves nothing.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(x) &= x^4-x \\ f'(x) &= 4x^3-1 \\ f''(x) &= 12x^2 \end{aligned}" />,
    reason: <>Look for an <Katex tex="f''" /> that is 0 at <Katex tex="x=0" /> without changing sign, like an even power. Option D: the <Katex tex="-x" /> term vanishes from <Katex tex="f''" />.</>,
  },
  {
    working: <Katex display tex="f''(0) = 12(0)^2 = 0" />,
    reason: <>The &ldquo;if&rdquo; part of the statement holds.</>,
  },
  {
    working: <Katex display tex="f''(x) = 12x^2 > 0 \text{ for all } x \neq 0" />,
    reason: <>So <Katex tex="f''" /> is positive on both sides of <Katex tex="x=0" />: no sign change, so the graph is concave up throughout.</>,
    more: <>The second derivative only touches zero at <Katex tex="x=0" /> and bounces back up, just as <Katex tex="y=x^2" /> touches the <Katex tex="x" />-axis. The report suggests confirming this with CAS, in the algebra menu or the graphing menu: for example, solve <Katex tex="f''(x)>0" /> in the algebra menu, or graph <Katex tex="y=x^4-x" /> and see it is concave up throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered} f''(0)=0, \text{ but } f(x)=x^4-x \\ \text{has no inflection point at } x=0 \end{gathered}}" />,
    reason: <>Matches option <b>D</b>. (Option C fails the &ldquo;if&rdquo; part: its <Katex tex="f''(0)" /> is undefined.)</>,
    more: (
      <>
        <p>
          Option <b>C</b> (40%) was the popular wrong answer. For <Katex tex="f(x)=x^{1/3}" />,{' '}
          <Katex tex="f''(x)=-\dfrac{2}{9x^{5/3}}" />, which is undefined at <Katex tex="x=0" />, so{' '}
          <Katex tex="f''(0)=0" /> is false and the statement is not tested. Moreover <Katex tex="f''" /> does change sign
          (positive for <Katex tex="x<0" />, negative for <Katex tex="x>0" />), so the graph does have an inflection
          at the origin, where its tangent is vertical.
        </p>
        <p className="mt-2">
          Options <b>A</b> and <b>B</b> both have <Katex tex="f''(0)=0" /> <i>with</i> a sign change, so they have a
          genuine inflection at <Katex tex="x=0" /> and agree with the statement:{' '}
          <Katex tex="\dfrac{d^2}{dx^2}\sin^{-1}(x)=\dfrac{x}{(1-x^2)^{3/2}}" /> and{' '}
          <Katex tex="\dfrac{d^2}{dx^2}\,\dfrac{2x}{x^2-1}=\dfrac{4x(x^2+3)}{(x^2-1)^3}" /> each change sign at{' '}
          <Katex tex="x=0" />.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ2_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statement.</p>
          <p className="mb-2 italic">
            'If <Katex tex="f''(0)=0" />, then the graph of <Katex tex="f" /> necessarily has a point of inflection at{' '}
            <Katex tex="x=0" />.'
          </p>
          <p>A counter-example that disproves this statement is when</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x) = \sin^{-1}(x)" /> },
        { letter: 'B', content: <Katex tex="f(x) = \dfrac{2x}{x^2-1}" /> },
        { letter: 'C', content: <Katex tex="f(x) = x^{1/3}" /> },
        { letter: 'D', content: <Katex tex="f(x) = x^4-x" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
