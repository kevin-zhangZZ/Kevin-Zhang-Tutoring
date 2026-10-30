// 2021 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 39% correct. The
// maximum number of solutions of f(x−k) = g(x) as the translation k varies, where f is a
// cubic and g is a single-humped curve. Question text transcribed from the original paper;
// the graph in the report comment is cropped from the VCAA examination report.
// Solution is original. "Never four" is argued with concavity and stationary points (second
// derivative, increasing functions), not Rolle's theorem or a third derivative.
// Widget: interactives/meth-2021-mcq18-crossings.tsx (slide k, count the crossings).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import reportGraphSrc from './meth-2021-mcq18-report-graph.png'

const CrossingsWidget = lazyWidget(() => import('../interactives/meth-2021-mcq18-crossings'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 23, C: 22, D: 39, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x)=(2x-1)(2x+1)(3x-1)" /> and
      <br />
      <Katex tex="g(x)=x\log_e(-x)" />
      <br />
      <Katex tex="f(x-k)=g(x)" /> will have a maximum of three solutions if the graph of{' '}
      <Katex tex="f" /> is translated to the left. The graph below shows three points of
      intersection for <Katex tex="k=-1" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph: y = (2(x + 1) + 1)(2(x + 1) − 1)(3(x + 1) − 1) and y = x × ln(−x) for −5 ≤ x ≤ 0, crossing at three points" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (2x-1)(2x+1)(3x-1)" />,
    reason: <>A positive cubic (leading coefficient <Katex tex="12>0" />) with <Katex tex="x" />-intercepts <Katex tex="-\tfrac12" />, <Katex tex="\tfrac13" /> and <Katex tex="\tfrac12" />: it rises to a local maximum (a hump), falls to a local minimum (a dip), then rises again.</>,
  },
  {
    working: <Katex display tex="f(x) = 12x^3-4x^2-3x+1" />,
    reason: <>Expanded (ready to differentiate later): <Katex tex="(2x-1)(2x+1) = 4x^2-1" />, then multiply by <Katex tex="3x-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(x)&=36x^2-8x-3=0\\ x&=\tfrac{2\pm\sqrt{31}}{18}\approx-0.20,\ 0.42\end{aligned}" />,
    reason: <>The cubic's turning points, by the quadratic formula: the hump is at <Katex tex="x\approx-0.20" /> and the dip at <Katex tex="x\approx0.42" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = 1\times\log_e(-x) + x\times\frac{1}{x} = \log_e(-x)+1" />,
    reason: <>Product rule. By the chain rule, <Katex tex="\tfrac{d}{dx}\log_e(-x) = \tfrac{-1}{-x} = \tfrac1x" />.</>,
  },
  {
    working: <Katex display tex="g'(x) = 0 \implies \log_e(-x) = -1 \implies x = -\tfrac1e" />,
    reason: <><Katex tex="g" /> comes up from <Katex tex="-\infty" />, peaks at <Katex tex="\left(-\tfrac1e,\tfrac1e\right)" />, then falls towards 0 as <Katex tex="x\to0^-" />: one hump.</>,
    more: <>Sign of <Katex tex="g'" />: <Katex tex="g'(x)>0" /> for <Katex tex="x<-\tfrac1e" /> and <Katex tex="g'(x)<0" /> for <Katex tex="-\tfrac1e<x<0" />, so the stationary point is a maximum, with value <Katex tex="g\left(-\tfrac1e\right)=-\tfrac1e\log_e\left(\tfrac1e\right)=\tfrac1e" />. Also <Katex tex="g" /> is negative for <Katex tex="x<-1" />, and <Katex tex="g(x)\to-\infty" /> as <Katex tex="x\to-\infty" />.</>,
  },
  {
    working: <>The solutions of <Katex tex="f(x-k)=g(x)" /> are the <Katex tex="x" />-coordinates where <Katex tex="y=g(x)" /> meets <Katex tex="y=f(x-k)" />, for <Katex tex="x<0" /> only.</>,
    reason: <><Katex tex="y=f(x-k)" /> is the cubic translated <Katex tex="k" /> units right (left when <Katex tex="k<0" />). So: sliding the cubic sideways, what is the most times it can cross <Katex tex="g" />'s curve?</>,
    more: <>Graph both on CAS and try different values of <Katex tex="k" />. With <Katex tex="k=0" /> (the graphs as given) there is only one crossing, the trap behind option B, but <Katex tex="k" /> can be any real number and the question wants the most over every <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="k=-1: \quad f(x+1) = g(x)" />,
    reason: <><Katex tex="g" /> only exists for <Katex tex="x<0" />, but the cubic's dip is at <Katex tex="x\approx0.42" />, so translate the cubic left to put its hump and dip over <Katex tex="g" />. Try <Katex tex="k=-1" />: on CAS, <Cas fn="solve">solve(f(x+1) = g(x), x)</Cas>.</>,
    more: <>With <Katex tex="k=0" /> the dip and the climb after it are over <Katex tex="x>0" />, where <Katex tex="g" /> doesn't exist.</>,
  },
  {
    working: <Katex display tex="x \approx -1.561,\ -0.758,\ -0.397" />,
    reason: <>Three solutions, so three is possible. Moved 1 unit left, the cubic's hump rises above <Katex tex="g" />'s curve and around its dip it falls below it.</>,
    more: <>These are the three points on the report's graph. Any <Katex tex="k" /> between about <Katex tex="-1.52" /> and <Katex tex="-0.5" /> gives three. For <Katex tex="k" /> a little to the right of <Katex tex="-0.5" /> (e.g. <Katex tex="k=-0.4" />) the cubic only climbs back above <Katex tex="g" /> at <Katex tex="x\ge0" />, where <Katex tex="g" /> doesn't exist, so a crossing is lost: two solutions, the trap behind option C.</>,
  },
  {
    working: <Katex display tex="h(x) = f(x-k)-g(x)" />,
    reason: <>To show four is impossible: the solutions are exactly the zeros of <Katex tex="h" /> for <Katex tex="x<0" />.</>,
  },
  {
    working: <Katex display tex="h''(x) = 72(x-k)-8-\frac{1}{x}" />,
    reason: <>Here <Katex tex="f''(x) = 72x-8" /> and <Katex tex="g''(x) = \tfrac1x" /> (differentiate <Katex tex="\log_e(-x)+1" /> again).</>,
  },
  {
    working: <><Katex tex="h''" /> is increasing on <Katex tex="(-\infty,0)" />, so it changes sign at most once.</>,
    reason: <><Katex tex="72(x-k)-8" /> is a line with positive gradient, and <Katex tex="-\tfrac1x" /> is increasing (derivative <Katex tex="\tfrac{1}{x^2}>0" />). A sum of increasing functions is increasing.</>,
    more: <>In fact <Katex tex="h''\to-\infty" /> as <Katex tex="x\to-\infty" /> and <Katex tex="h''\to+\infty" /> as <Katex tex="x\to0^-" />, so <Katex tex="h" /> is concave down then concave up, with exactly one change of concavity.</>,
  },
  {
    working: <><Katex tex="h'(x)=0" /> at most twice, so <Katex tex="h(x)=0" /> at most three times.</>,
    reason: <><Katex tex="h'" /> decreases then increases, so it is 0 at most twice. Its zeros split <Katex tex="x<0" /> into at most three intervals, on each of which <Katex tex="h" /> only increases or only decreases, so crosses 0 at most once.</>,
    more: <><Katex tex="h'" /> decreases while <Katex tex="h''<0" /> and increases while <Katex tex="h''>0" />, so like a U-shaped graph it equals 0 at most twice: <Katex tex="h" /> has at most two stationary points, and between them <Katex tex="h" /> cannot turn around. That holds for every <Katex tex="k" />, so four solutions (option E) never happens.</>,
  },
  {
    working: <Katex display tex="\boxed{3}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>B (1) and C (2) are counts for particular values of <Katex tex="k" /> (shown above); A (0) happens for positive <Katex tex="k" /> such as <Katex tex="k=1" />; E (4) is ruled out above. The question asks for the maximum over every <Katex tex="k" />, which is 3.</>,
  },
]

export default function MethodsQ18_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=(2x-1)(2x+1)(3x-1)" /> and{' '}
          <Katex tex="g:(-\infty,0)\to R" />, <Katex tex="g(x)=x\log_e(-x)" />.
          <br />
          The maximum number of solutions for the equation <Katex tex="f(x-k)=g(x)" />, where{' '}
          <Katex tex="k\in R" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Slide the cubic sideways: it can cross g's curve three times, but never four">
          <CrossingsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
