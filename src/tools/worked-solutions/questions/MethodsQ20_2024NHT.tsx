// 2024 Mathematical Methods NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment and a graph for this question (graph taken from the
// report's own file, meth-2024nht-mcq20-report-graph.png). Functions: a horizontal translation of a
// quartic restricted to [0, 1], and when its left endpoint is the absolute maximum. Question text
// transcribed from the original paper. Solution is original; the answer E agrees with the report's
// key, and a numerical scan over a confirms the set a ≤ −√2/2 or 1/2 ≤ a ≤ √2/2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2024nht-mcq20-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'E',
  comment: (
    <>
      <Katex tex="f:R\to R,\ f(x)=x^2\left(1-x^2\right)" /> and <Katex tex="g(x):[0,1]\to R,\ g(x)=f(x-a)" />
      <br />
      <Katex tex="a" /> translates the graph of <Katex tex="f" /> horizontally.
      <br />
      For <Katex tex="g(0)" /> to be an absolute maximum, the graph of <Katex tex="f" /> has to be translated at
      least <Katex tex="\dfrac{\sqrt2}{2}" /> units to the left. So <Katex tex="a\in\left(-\infty,-\dfrac{\sqrt2}{2}\right]" />.
      <br />
      The maximum value the graph of <Katex tex="f" /> can be translated to the right is <Katex tex="\dfrac{\sqrt2}{2}" /> units.
      <br />
      The minimum value occurs when <Katex tex="g(0)=g(1)" /> which is when <Katex tex="a=\dfrac12" />.
      <br />
      Hence, <Katex tex="a\in\left(-\infty,-\dfrac{\sqrt2}{2}\right]\cup\left[\dfrac12,\dfrac{\sqrt2}{2}\right]" />.
      <br />
      These values can also be found using the slider functionality on CAS.
      <br />
      Part of the graph of <Katex tex="y=f" /> is shown below.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of f(x) = x²(1 − x²) for x from about −1.2 to 1.2: an M shape with maxima at (−√2/2, 1/4) and (√2/2, 1/4) and a local minimum at the origin" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&g(x)=f(x-a),\ 0\le x\le 1\\ &\Rightarrow\ x-a\in[-a,\,1-a]\end{aligned}" />,
    reason: <>As <Katex tex="x" /> runs from 0 to 1, the input <Katex tex="x-a" /> runs from <Katex tex="-a" /> to <Katex tex="1-a" />. So <Katex tex="g" /> is just a <b>window of width 1</b> on the graph of <Katex tex="f" />, starting at <Katex tex="-a" />, and <Katex tex="g(0)=f(-a)" /> is its left end.</>,
    more: <>The question becomes: where can a window of width 1 start on the graph of <Katex tex="f" /> so that its left end is at least as high as everything else in the window?</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(x)&=2x-4x^3\\ &=2x\left(1-2x^2\right)=0\\ x&=0,\ \pm\tfrac{\sqrt2}{2}\end{aligned}" />,
    reason: <>Find the shape of <Katex tex="f" />: an M shape with maxima <Katex tex="f\!\left(\pm\tfrac{\sqrt2}{2}\right)=\tfrac12\cdot\tfrac12=\tfrac14" /> and a local minimum <Katex tex="f(0)=0" />.</>,
    more: <>So <Katex tex="f" /> increases on <Katex tex="\left(-\infty,-\tfrac{\sqrt2}{2}\right]" />, decreases on <Katex tex="\left[-\tfrac{\sqrt2}{2},0\right]" />, increases on <Katex tex="\left[0,\tfrac{\sqrt2}{2}\right]" /> and decreases on <Katex tex="\left[\tfrac{\sqrt2}{2},\infty\right)" />. The graph is symmetric about the <Katex tex="y" />-axis (<Katex tex="f" /> is even).</>,
  },
  {
    working: <Katex display tex="-a\ge\tfrac{\sqrt2}{2}\ \Rightarrow\ a\le-\tfrac{\sqrt2}{2}" />,
    reason: <>If the window starts at or right of the right-hand peak, <Katex tex="f" /> is decreasing across the whole window, so the left end is the highest point. This works.</>,
  },
  {
    working: <Katex display tex="-a=-\tfrac{\sqrt2}{2}\ \Rightarrow\ a=\tfrac{\sqrt2}{2}\ \text{works}" />,
    reason: <>Starting exactly on the left-hand peak also works: <Katex tex="g(0)=\tfrac14" /> is the largest value <Katex tex="f" /> ever takes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&f(-a)=f(1-a)\\ &a^2-a^4=(1-a)^2-(1-a)^4\\ &\big(a^2-(1-a)^2\big)\big(1-a^2-(1-a)^2\big)=0\\ &(2a-1)\times 2a(1-a)=0\\ &a=\tfrac12\quad(a=0,\,1\text{ rejected})\end{aligned}" />,
    reason: <>Now start the window just right of the left peak, on the falling side. The window then climbs back up the middle rise, so its right end <Katex tex="f(1-a)" /> competes. The left end still wins while <Katex tex="f(-a)\ge f(1-a)" />; the cut-off is where they are equal. Solve with <Cas fn="solve">solve(f(−a)=f(1−a), a)</Cas>, or by hand: with <Katex tex="p=a" />, <Katex tex="q=1-a" />, factor <Katex tex="p^2-q^2-(p^4-q^4)=(p^2-q^2)(1-p^2-q^2)" />. Reject <Katex tex="a=0" /> and <Katex tex="a=1" />: those windows contain a peak.</>,
    more: <>Both <Katex tex="-a" /> and <Katex tex="1-a" /> are then on the same rise <Katex tex="\left[0,\tfrac{\sqrt2}{2}\right]" /> after reflecting <Katex tex="-a" /> to <Katex tex="a" /> (<Katex tex="f" /> is even), so <Katex tex="f(a)\ge f(1-a)" /> means <Katex tex="a\ge 1-a" />, i.e. <Katex tex="a\ge\tfrac12" />. At <Katex tex="a=\tfrac12" /> the window is <Katex tex="\left[-\tfrac12,\tfrac12\right]" />, symmetric, so <Katex tex="g(0)=g(1)=\tfrac{3}{16}" />. This is the report&apos;s <Katex tex="g(0)=g(1)" />. The rejected roots <Katex tex="a=0" /> and <Katex tex="a=1" /> also make the ends equal (both 0), but their windows <Katex tex="[0,1]" /> and <Katex tex="[-1,0]" /> each contain a peak of height <Katex tex="\tfrac14" />, so the ends are not the maximum.</>,
  },
  {
    working: <Katex display tex="\tfrac12\le a\le\tfrac{\sqrt2}{2}" />,
    reason: <>So the window may start anywhere from the left peak (<Katex tex="a=\tfrac{\sqrt2}{2}" />) to <Katex tex="-\tfrac12" /> (<Katex tex="a=\tfrac12" />). Every other start fails: left of the left peak, or between <Katex tex="-\tfrac12" /> and the right peak, <Katex tex="f" /> climbs above its left-end value somewhere in the window.</>,
    more: <>Starting left of <Katex tex="-\tfrac{\sqrt2}{2}" /> (<Katex tex="a>\tfrac{\sqrt2}{2}" />), <Katex tex="f" /> is increasing at the left end, so a point just inside is higher. Starting in <Katex tex="\left(-\tfrac12,\tfrac{\sqrt2}{2}\right)" />, either <Katex tex="f" /> is increasing at the left end, or the window reaches a right end higher than <Katex tex="f(-a)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a\in\left(-\infty,-\tfrac{\sqrt2}{2}\right]\cup\left[\tfrac12,\tfrac{\sqrt2}{2}\right]}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option <b>D</b> adds <Katex tex="\left[-\tfrac{\sqrt2}{2},-\tfrac12\right]" />, mirroring the second interval as if the problem were symmetric in <Katex tex="a" />. It isn&apos;t: the window always extends to the <b>right</b> of its starting point. For example, <Katex tex="a=-\tfrac12" /> gives the window <Katex tex="\left[\tfrac12,\tfrac32\right]" />, whose left end <Katex tex="f\!\left(\tfrac12\right)=\tfrac{3}{16}" /> is below the peak <Katex tex="\tfrac14" /> inside it. Option <b>C</b> mirrors the first interval for the same reason; option <b>A</b> keeps only the two peak positions.</>,
  },
]

export default function MethodsQ20_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f:R\to R,\ f(x)=x^2\left(1-x^2\right)" /> and <Katex tex="g:[0,1]\to R,\ g(x)=f(x-a)" />.
          </p>
          <p>
            Find all real values of <Katex tex="a" />, such that <Katex tex="g(0)" /> is the absolute maximum value of{' '}
            <Katex tex="g" />.
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="a=\pm\dfrac{\sqrt2}{2}" /> },
        { letter: 'B', content: <Katex tex="a\in\left[-\dfrac{\sqrt2}{2},\dfrac{\sqrt2}{2}\right]" /> },
        { letter: 'C', content: <Katex tex="a\in\left(-\infty,-\dfrac{\sqrt2}{2}\right]\cup\left[\dfrac{\sqrt2}{2},\infty\right)" /> },
        { letter: 'D', content: <Katex tex="a\in\left[-\dfrac{\sqrt2}{2},-\dfrac12\right]\cup\left[\dfrac12,\dfrac{\sqrt2}{2}\right]" /> },
        { letter: 'E', content: <Katex tex="a\in\left(-\infty,-\dfrac{\sqrt2}{2}\right]\cup\left[\dfrac12,\dfrac{\sqrt2}{2}\right]" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
