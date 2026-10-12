// 2024 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 50% correct.
// An inverse whose domain is the original range, not the original domain. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 50, C: 7, D: 12 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{2x+1}{3-x} \implies y(3-x) = 2x+1" />,
    reason: <>Write <Katex tex="y=f(x)" /> and solve for <Katex tex="x" />, swapping <Katex tex="x" /> and <Katex tex="y" /> at the end. Multiply through by the denominator first.</>,
    more: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> at the start and then solving for <Katex tex="y" /> works just as well; swapping at the end keeps the familiar <Katex tex="y=\dots" /> form until the last line. On CAS, <Cas fn="solve">solve(x=(2y+1)/(3-y), y)</Cas> gives the same rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 3y-xy &= 2x+1 \\ 3y-1 &= 2x+xy = x(2+y) \end{aligned}" />,
    reason: <>Expand, then gather every <Katex tex="x" /> term on one side so <Katex tex="x" /> can be factored out.</>,
  },
  {
    working: <Katex display tex="x = \frac{3y-1}{y+2} \implies f^{-1}(x) = \frac{3x-1}{x+2}" />,
    reason: <>Divide by <Katex tex="y+2" />, then rename <Katex tex="y" /> as <Katex tex="x" /> to get the rule of the inverse.</>,
    more: <>Option <b>D</b>, <Katex tex="\frac{1-3x}{x+2}" />, is the negative of this rule: it comes from a sign slip when moving terms across in the previous line.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{2x+1}{3-x} &= \frac{-2(3-x)+7}{3-x} \\ &= -2+\frac{7}{3-x} \end{aligned}" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" />. Write the numerator as a multiple of <Katex tex="3-x" /> plus a remainder to expose the horizontal asymptote.</>,
    more: <>The multiple <Katex tex="-2(3-x)" /> supplies the <Katex tex="2x" />; it leaves <Katex tex="-6" />, so add 7 to get the <Katex tex="+1" /> (expand to check: <Katex tex="-6+2x+7=2x+1" />). Then the fraction splits into a constant plus a simple fraction. This is the hyperbola form <Katex tex="y=\frac{a}{x-h}+k" />, here with <Katex tex="a=-7" />, <Katex tex="h=3" />, <Katex tex="k=-2" />.</>,
  },
  {
    working: <Katex display tex="\frac{7}{3-x}\ne0 \implies \text{ran}(f)=R\setminus\{-2\}" />,
    reason: <>A fraction with numerator 7 is never 0, so <Katex tex="y=-2" /> is never reached; every other value is. So <Katex tex="\text{dom}(f^{-1})=R\setminus\{-2\}" />.</>,
    more: <>Option <b>A</b>, chosen by 31% of students, has the right rule but keeps the domain of <Katex tex="f" />, <Katex tex="R\setminus\{3\}" />. Inverting swaps domain and range, so the vertical asymptote <Katex tex="x=3" /> of <Katex tex="f" /> becomes the horizontal asymptote <Katex tex="y=3" /> of <Katex tex="f^{-1}" />, and the horizontal asymptote <Katex tex="y=-2" /> becomes the excluded value <Katex tex="x=-2" />. You can also read it straight off the inverse rule: <Katex tex="\frac{3x-1}{x+2}" /> is undefined at <Katex tex="x=-2" />.</>,
  },
  {
    working: <Katex display tex="3-\frac{7}{x+2} = \frac{3(x+2)-7}{x+2} = \frac{3x-1}{x+2}" />,
    reason: <>Option <b>B</b> doesn't look like our rule, so put it over a common denominator: it is the same rule in asymptote form.</>,
    more: <>Option <b>C</b> fails the same test: <Katex tex="3+\frac{5}{x+2}=\frac{3x+11}{x+2}" />, which is not our rule.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 3-\frac{7}{x+2}, \ \text{ domain } R\setminus\{-2\}}" />,
    reason: <>Matches option <b>B</b>: the right rule, with domain equal to the range of <Katex tex="f" />.</>,
    more: <>A quick check that the rule really undoes <Katex tex="f" />: <Katex tex="f(0)=\tfrac13" /> and <Katex tex="f^{-1}\!\left(\tfrac13\right)=\tfrac{1-1}{\tfrac13+2}=0" /> ✓.</>,
  },
]

export default function MethodsQ6_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f(x)=\dfrac{2x+1}{3-x}" /> with domain{' '}
          <Katex tex="x\in R\setminus\{3\}" />.
          <br />
          The inverse of <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f^{-1}(x)=\frac{3x-1}{x+2} \ \text{ with domain } x\in R\setminus\{3\}" /> },
        { letter: 'B', content: <Katex tex="f^{-1}(x)=3-\frac{7}{x+2} \ \text{ with domain } x\in R\setminus\{-2\}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="f^{-1}(x)=3+\frac{5}{x+2} \ \text{ with domain } x\in R\setminus\{-2\}" /> },
        { letter: 'D', content: <Katex tex="f^{-1}(x)=\frac{1-3x}{x+2} \ \text{ with domain } x\in R\setminus\{-2\}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
