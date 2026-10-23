// 2023 Specialist NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with no
// statistics. Functions: features of f(x) = |x − 1|/(x² − 1) — split the modulus to get
// 1/(x + 1) for x > 1 and −1/(x + 1) for x < 1, with a jump (and a hole) at x = 1 and no turning
// point. Question text transcribed from the original paper. The graph in the working is this
// site's own explanatory figure (matplotlib) of a function VCAA never drew. Solution is original;
// the answer E agrees with the report's key (sympy: f(0) = −1, one-sided limits at 1 are ∓1/2,
// limit at ∞ is 0).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2023nht-mcq3-graph.png'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&x^2-1=0 \iff x=\pm1\\ &\text{domain } R\setminus\{-1,1\}\end{aligned}" />,
    reason: <>The only thing that can fail is division by zero. So the graph <i>does</i> have domain <Katex tex="R\setminus\{-1,1\}" />: option A is true, so it is not the answer.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x>1:\\ &\quad f(x)=\frac{x-1}{(x-1)(x+1)}=\frac{1}{x+1}\\[1ex] &x<1,\ x\ne-1:\\ &\quad f(x)=\frac{-(x-1)}{(x-1)(x+1)}=-\frac{1}{x+1}\end{aligned}" />,
    reason: <>Split the modulus at <Katex tex="x=1" />, where <Katex tex="x-1" /> changes sign, and cancel the common factor <Katex tex="x-1" /> (allowed, since <Katex tex="x\ne1" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x\to\pm\infty:\ f(x)\to0 &&\Rightarrow\ y=0\ \text{(B true)}\\ &x\to-1:\ |f(x)|\to\infty &&\Rightarrow\ x=-1\ \text{(C true)}\\ &f(0)=\tfrac{|{-1}|}{-1}=-1 &&\Rightarrow\ (0,-1)\ \text{(D true)}\end{aligned}" />,
    reason: <>Check options B, C and D in turn. Each feature is there, so none of them is the answer.</>,
    more: <>At <Katex tex="x=1" /> the factor cancels, so there is no asymptote there, just a gap: <Katex tex="x=-1" /> is the only vertical asymptote.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x>1:&\ \ f'(x)=-\frac{1}{(x+1)^2}<0\\[1ex] x<1,\ x\ne-1:&\ \ f'(x)=\frac{1}{(x+1)^2}>0\end{aligned}" />,
    reason: <>A turning point needs <Katex tex="f'(x)=0" />. Neither piece&apos;s derivative is ever zero: the left pieces always increase and the right piece always decreases.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to1^-}f(x)=-\tfrac12,\qquad \lim_{x\to1^+}f(x)=\tfrac12" />,
    reason: <>The change from increasing to decreasing happens at <Katex tex="x=1" />, but <Katex tex="f" /> isn&apos;t defined there and the graph jumps from <Katex tex="-\tfrac12" /> up to <Katex tex="\tfrac12" />, with an open circle at each end. There is no highest point to call a maximum.</>,
    more: (
      <>
        <span className="block mb-2">The graph below (ours, not VCAA&apos;s) shows the two open circles at <Katex tex="x=1" /> and the asymptotes <Katex tex="x=-1" /> and <Katex tex="y=0" />.</span>
        <img loading="lazy" decoding="async"
          src={graphSrc}
          alt="This site's own graph of f(x) = |x − 1|/(x² − 1): −1/(x + 1) for x < 1 with an asymptote at x = −1 and y-intercept (0, −1), rising to an open circle at (1, −1/2); then 1/(x + 1) for x > 1 starting at an open circle at (1, 1/2) and falling towards y = 0"
          className="w-full max-w-[360px] bg-white rounded-lg"
        />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{no local maximum turning point}}" />,
    reason: <>Matches option <b>E</b>. Options A to D are all features the graph does have.</>,
  },
]

export default function SpecialistQ3_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the relation <Katex tex="f(x)=\dfrac{|x-1|}{x^2-1}" /> does <b>not</b> have a
        </p>
      }
      options={[
        { letter: 'A', content: <>domain of <Katex tex="R\setminus\{-1,\,1\}" />.</> },
        { letter: 'B', content: <>horizontal asymptote.</> },
        { letter: 'C', content: <>vertical asymptote.</> },
        { letter: 'D', content: <>vertical axis intercept.</> },
        { letter: 'E', content: <>local maximum turning point.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
