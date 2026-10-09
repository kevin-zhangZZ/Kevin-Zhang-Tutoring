// 2023 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 69% correct.
// Tracing Euler's method through pseudocode, one pass at a time. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 12, C: 69, D: 14, E: 2 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &y \leftarrow y+h\,f(x,y), \quad x \leftarrow x+h \\ &h = 0.5,\quad f(x,y) = e^{xy} \end{aligned}" />,
    reason: <>Each pass updates <Katex tex="y" /> <em>first</em>, using the current <Katex tex="x" /> and <Katex tex="y" />, and only then advances <Katex tex="x" />. <code>print y</code> comes before <code>end while</code>, so it is inside the loop: the new <Katex tex="y" /> is printed at the end of every pass, and we need the pass that prints 2.709.</>,
    more: (
      <>
        Each pass is one step of Euler&apos;s method with step size <Katex tex="h=0.5" />:{' '}
        <Katex tex="y_{n+1}=y_n+h\,f(x_n,\,y_n)" /> and <Katex tex="x_{n+1}=x_n+h" />. The condition{' '}
        <Katex tex="n\geq0" /> is always true (<Katex tex="n" /> starts at 0 and only goes up), so the loop never stops
        by itself; it just keeps printing one new <Katex tex="y" /> per pass. The order of the two update lines matters:
        updating <Katex tex="x" /> before <Katex tex="y" /> would put the new <Katex tex="x" /> into{' '}
        <Katex tex="f" /> and print 0.5, 1.324, 4.969, never 2.709.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Start: } x_0 = 0,\ y_0 = 0" />,
    reason: <>Both initialised to zero.</>,
  },
  {
    working: <Katex display tex="\text{Pass 1: } y = 0+0.5e^{0\times0} = 0.5, \quad x = 0.5" />,
    reason: <>The exponent uses the old values <Katex tex="x=0" />, <Katex tex="y=0" />, and <Katex tex="e^0=1" />. Prints 0.5.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Pass 2: } y &= 0.5+0.5e^{0.5\times0.5} \\ &\approx 1.1420, \quad x = 1 \end{aligned}" />,
    reason: <>Now <Katex tex="x=0.5" /> and <Katex tex="y=0.5" /> (the values left by pass 1), and <Katex tex="e^{0.25}\approx1.2840" />. Prints 1.142. Keep the unrounded value in the calculator for the next pass.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Pass 3: } y &\approx 1.1420+0.5e^{1\times1.1420} \\ &\approx 2.7085, \quad x = 1.5 \end{aligned}" />,
    reason: <>Now <Katex tex="x=1" /> and <Katex tex="y\approx1.1420" />, so <Katex tex="0.5e^{1.1420}\approx0.5\times3.1331\approx1.5665" /> and <Katex tex="y\approx1.1420+1.5665" />. To three decimal places this is 2.709, printed at the end of the third pass.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ iterations}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        The printed values are 0.5, 1.142, 2.709, then about 31.8 on a fourth pass, so 2.709 is printed only once.
        Option <b>B</b> (2) is the value of <Katex tex="n" /> at the <em>start</em> of the pass that prints 2.709, but
        the line <code>n ← n + 1</code> runs before <code>print y</code>, so three passes are complete when it prints.
        Option <b>D</b> (4) counts the start as well: there are four <Katex tex="x" />-values, 0, 0.5, 1 and 1.5, but
        only three steps between them, and the starting values are never printed.
      </>
    ),
  },
]

export default function SpecialistQ6_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following pseudocode.</p>
          <pre className="text-[12.5px] leading-relaxed bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-x-auto">
{`define f(x,y) = e^(xy)
    x ← 0
    y ← 0
    h ← 0.5
    n ← 0

while n ≥ 0
    y ← y + h × f(x,y)
    x ← x + h
    n ← n + 1

print y
end while`}
          </pre>
          <p>After how many iterations will the pseudocode print 2.709?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
