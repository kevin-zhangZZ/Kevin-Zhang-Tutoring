// 2024 Mathematical Methods NHT — Exam 2, MCQ 14. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Algorithms: tracing a step-search loop for the intersection of y = x and y = cos(x).
// Question text and pseudocode transcribed from the original paper; the graph is cropped from the
// original VCAA exam PDF. Solution is original; the answer D agrees with the report's key, and a
// Python run of the loop returns 0.74 (cos(0.74) − 0.74 = −0.00153…).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024nht-mcq14-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      The algorithm stops when <Katex tex="-0.01<\cos(x)-x<0.01" />.
      <br />
      <Katex tex="x=0.6,\ \cos(0.6)-0.6=0.2253\ldots>0.01" />
      <br />
      <Katex tex="x=0.61,\ \cos(0.61)-0.61=0.2096\ldots>0.01" />
      <br />
      Check alternatives
      <br />
      <Katex tex="x=0.73,\ \cos(0.73)-0.73=0.0151\ldots>0.01" />
      <br />
      <Katex tex="x=0.74,\ \cos(0.74)-0.74=-0.0015\ldots>-0.01" />
      <br />
      Since <Katex tex="\cos(0.74)-0.74>-0.01" />, <Katex tex="x=0.74" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{stop when } -0.01<\cos(x)-x<0.01" />,
    reason: <>The loop starts at <Katex tex="x=0.6" /> and steps up by <Katex tex="0.01" />. At each value it tests whether <Katex tex="\cos(x)" /> and <Katex tex="x" /> are within <Katex tex="0.01" /> of each other; the first <Katex tex="x" /> that passes is returned.</>,
    more: <>The loop only tests the values <Katex tex="0.60,0.61,0.62,\dots,0.79" /> (it stops once <Katex tex="x" /> reaches <Katex tex="0.8" />), so it can only return one of those, never the exact intersection.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x=0.60:\\ &\cos(0.60)-0.60=0.2253\ldots\\ &0.2253\ldots>0.01\end{aligned}" />,
    reason: <>Fails the test: at <Katex tex="x=0.6" /> the cosine curve is well above the line (as in the graph). The difference shrinks as <Katex tex="x" /> increases.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x=0.73:\\ &\cos(0.73)-0.73=0.0151\ldots\\ &0.0151\ldots>0.01\end{aligned}" />,
    reason: <>Still fails, just: the curves are close here but not within <Katex tex="0.01" />. Every value from 0.60 to 0.73 fails, since <Katex tex="\cos(x)-x" /> is decreasing.</>,
    more: <><Katex tex="\tfrac{d}{dx}\left(\cos(x)-x\right)=-\sin(x)-1<0" /> on this interval, so the difference only gets smaller as <Katex tex="x" /> steps up: the first value inside the band is the one returned.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x=0.74:\\ &\cos(0.74)-0.74=-0.0015\ldots\end{aligned}" />,
    reason: <><Katex tex="-0.01<-0.0015\ldots<0.01" />, so the test passes and the function returns <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.74}" />,
    reason: <>Matches option <b>D</b>. Sanity check: the intersection <Katex tex="P" /> is at <Katex tex="x=0.739\ldots" />, between 0.6 and 0.8 as drawn.</>,
    more: <>Option <b>C</b> (0.73) is the step just before; it fails the test because <Katex tex="0.0151\ldots" /> is outside the band, even though 0.73 is close to <Katex tex="P" />. Option <b>A</b> (<Katex tex="-0.002" />) is the value of <Katex tex="\cos(x)-x" /> at <Katex tex="x=0.74" /> (to three decimal places): the function returns <Katex tex="x" />, not the difference. Option <b>E</b> would need every tested value to fail, but 0.74 passes.</>,
  },
]

export default function MethodsQ14_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Parts of the graphs of two functions, <Katex tex="f(x)=x" /> and <Katex tex="g(x)=\cos(x)" />, are shown
            below, where <Katex tex="x" /> is measured in radians.
          </p>
          <p>The pseudocode below describes a simple algorithm to find the point where the two functions intersect.</p>
          <pre className="text-[13px] leading-relaxed bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit max-w-full overflow-x-auto">
{`define intersect(x0, x1):
    x ← x0
    while x < x1
        if -0.01 < cos(x) - x < 0.01 then
            return x
        end if
        x ← x + 0.01
    end while
    return “No intersection found”`}
          </pre>
          <p>
            Which of the following will the function <code>intersect(0.6, 0.8)</code> return?
          </p>
        </div>
      }
      diagram={<img loading="lazy" decoding="async" src={graphSrc} alt="Graphs of f(x) = x, a line through the origin, and g(x) = cos(x), falling from 1, crossing at the point P between dashed vertical lines at x = 0.6 and x = 0.8, from the original VCAA exam paper" className="w-full max-w-[320px]" />}
      options={[
        { letter: 'A', content: <code>-0.002</code> },
        { letter: 'B', content: <code>0.02</code> },
        { letter: 'C', content: <code>0.73</code> },
        { letter: 'D', content: <code>0.74</code>, isAnswer: true },
        { letter: 'E', content: <code>No intersection found</code> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
