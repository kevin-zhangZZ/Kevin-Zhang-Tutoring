// 2014 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 65% correct.
// Changing an integral by substitution, terminals included. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 4, C: 8, D: 4, E: 65 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \sqrt{x+1} \implies u^2 = x+1" />,
    reason: <>Square the given substitution so that <Katex tex="x" /> can be written in terms of <Katex tex="u" /> with no root.</>,
  },
  {
    working: <Katex display tex="x = u^2-1, \qquad dx = 2u\,du" />,
    reason: <>Every <Katex tex="x" /> must be replaced, <Katex tex="dx" /> included: rearrange for <Katex tex="x" />, then differentiate with respect to <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="x+2 = u^2+1, \qquad \sqrt{x+1} = u" />,
    reason: <>Both pieces of the denominator, in terms of <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{(x+2)\sqrt{x+1}} = \frac{2u\,du}{\left(u^2+1\right)u} = \frac{2\,du}{u^2+1}" />,
    reason: <>The <Katex tex="u" /> from <Katex tex="dx=2u\,du" /> cancels the <Katex tex="u" /> from the root, so no root is left.</>,
  },
  {
    working: <Katex display tex="x=0 \implies u = 1; \qquad x=2 \implies u = \sqrt3" />,
    reason: <>The terminals are <Katex tex="x" />-values, so put each into <Katex tex="u=\sqrt{x+1}" />. Leaving them as 0 and 2 gives option B.</>,
  },
  {
    working: <Katex display tex="\boxed{2\int_1^{\sqrt3}\frac{1}{u^2+1}\,du}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option A (19%, the most popular wrong answer) has the right terminals but still has a root, because it mixes two substitutions: it converts <Katex tex="x+2" /> correctly to <Katex tex="u^2+1" />, but writes <Katex tex="\sqrt{x+1}" /> as <Katex tex="\sqrt u" /> (as if <Katex tex="u=x+1" />) and replaces <Katex tex="dx" /> by <Katex tex="du" /> without the factor <Katex tex="2u" />. With <Katex tex="dx=2u\,du" />, the root is just <Katex tex="u" /> and cancels completely. Option B has the correct integrand but the old <Katex tex="x" />-terminals; option C is what the different substitution <Katex tex="u=x+1" /> gives (terminals 1 and 3, root not removed). As a check, E evaluates to <Katex tex="2\left(\tfrac\pi3-\tfrac\pi4\right)=\tfrac\pi6\approx0.524" />, the same value as the original integral — though the question only asks for the transformed integral.</>,
  },
]

export default function SpecialistQ13_2014() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u=\sqrt{x+1}" />, then{' '}
          <Katex tex="\displaystyle\int_0^2\frac{dx}{(x+2)\sqrt{x+1}}" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int_1^{\sqrt3}\frac{1}{\sqrt u\left(u^2+1\right)}\,du" /> },
        { letter: 'B', content: <Katex tex="\int_0^2\frac{2}{u^2+1}\,du" /> },
        { letter: 'C', content: <Katex tex="\int_1^{3}\frac{1}{\sqrt u\,(u+1)}\,du" /> },
        { letter: 'D', content: <Katex tex="\tfrac14\int_0^2\frac{1}{u^2\left(u^2+1\right)}\,du" /> },
        { letter: 'E', content: <Katex tex="2\int_1^{\sqrt3}\frac{1}{u^2+1}\,du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
