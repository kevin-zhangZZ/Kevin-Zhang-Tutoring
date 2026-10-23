// 2024 Specialist NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with no
// statistics. Trigonometric identities: rewrite (1 + 5 sin x cos x)/cos²x − 7 = 0 as a quadratic in
// tan x using sec²x = 1 + tan²x. Question text transcribed from the original paper. Solution is
// original; the answer D agrees with the report's key (sympy: tan²x + 5 tan x − 6 = (tan x − 1)(tan x + 6)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{\cos^2(x)}+\frac{5\sin(x)\cos(x)}{\cos^2(x)}-7=0" />,
    reason: <>Split the fraction. The options are all in <Katex tex="\tan(x)" />, so aim to write every term in <Katex tex="\tan(x)" />.</>,
  },
  {
    working: <Katex display tex="\sec^2(x)+5\tan(x)-7=0" />,
    reason: <><Katex tex="\tfrac{1}{\cos^2(x)}=\sec^2(x)" />, and one <Katex tex="\cos(x)" /> cancels in the middle term, leaving <Katex tex="\tfrac{\sin(x)}{\cos(x)}=\tan(x)" />.</>,
  },
  {
    working: <Katex display tex="1+\tan^2(x)+5\tan(x)-7=0" />,
    reason: <>Use the Pythagorean identity <Katex tex="\sec^2(x)=1+\tan^2(x)" /> to remove the last non-tangent term.</>,
    more: <>It comes from dividing <Katex tex="\sin^2(x)+\cos^2(x)=1" /> through by <Katex tex="\cos^2(x)" />. Forgetting the <Katex tex="1" /> (writing <Katex tex="\sec^2(x)=\tan^2(x)" />) gives <Katex tex="\tan^2(x)+5\tan(x)-7=0" />, which doesn&apos;t factorise over the integers and matches no option.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\tan^2(x)+5\tan(x)-6=0\\ &\left(\tan(x)-1\right)\left(\tan(x)+6\right)=0\end{aligned}" />,
    reason: <>A quadratic in <Katex tex="\tan(x)" />: find two numbers with product <Katex tex="-6" /> and sum <Katex tex="5" />, namely <Katex tex="6" /> and <Katex tex="-1" />.</>,
    more: <>Dividing by <Katex tex="\cos^2(x)" /> loses nothing: the original equation already has <Katex tex="\cos^2(x)" /> in a denominator, so <Katex tex="\cos(x)\ne0" /> throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tan(x)-1\right)\left(\tan(x)+6\right)=0}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Check by expanding: <Katex tex="\tan^2(x)+6\tan(x)-\tan(x)-6=\tan^2(x)+5\tan(x)-6" />. Option <b>E</b>&apos;s brackets expand to <Katex tex="\tan^2(x)+7\tan(x)+6" />, the wrong middle and constant terms.</>,
  },
]

export default function SpecialistQ4_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The solutions of <Katex tex="\dfrac{1+5\sin(x)\cos(x)}{\cos^2(x)}-7=0" /> can be found by solving
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(\tan(x)-2\right)\left(\tan(x)+3\right)=0" /> },
        { letter: 'B', content: <Katex tex="\left(\tan(x)-1\right)\left(\tan(x)+7\right)=0" /> },
        { letter: 'C', content: <Katex tex="\left(\tan(x)-3\right)\left(\tan(x)-2\right)=0" /> },
        { letter: 'D', content: <Katex tex="\left(\tan(x)-1\right)\left(\tan(x)+6\right)=0" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\left(\tan(x)+1\right)\left(\tan(x)+6\right)=0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
