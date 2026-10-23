// 2025 Mathematical Methods NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with
// no statistics. Calculus: choosing the graph of an antiderivative from the sign of f. Question
// text transcribed from the original paper (the 2025 NHT paper is image-only, so read from the
// rendered page); the stem graph and the four option graphs are cropped from the original VCAA
// exam PDF. Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2025nht-mcq4-stem.png'
import optASrc from './meth-2025nht-mcq4-optA.png'
import optBSrc from './meth-2025nht-mcq4-optB.png'
import optCSrc from './meth-2025nht-mcq4-optC.png'
import optDSrc from './meth-2025nht-mcq4-optD.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[260px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="F'(x)=f(x)" />,
    reason: <><Katex tex="F" /> is an antiderivative of <Katex tex="f" />, so the given graph is the <b>gradient</b> graph of the one we want: its height at each <Katex tex="x" /> is the slope of <Katex tex="F" /> there.</>,
  },
  {
    working: <Katex display tex="x<1:\ f(x)>0\ \Rightarrow\ F\text{ increasing}" />,
    reason: <>Left of <Katex tex="x=1" /> the line is above the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="x>1:\ f(x)<0\ \Rightarrow\ F\text{ decreasing}" />,
    reason: <>Right of <Katex tex="x=1" /> the line is below the axis.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&F'(1)=0,\ \text{sign } +\to-\\ &\Rightarrow\ \text{local maximum at } x=1\end{aligned}" />,
    reason: <>The zero of <Katex tex="f" /> is where <Katex tex="F" /> has a stationary point, and increasing-then-decreasing makes it a maximum.</>,
    more: <>Since <Katex tex="f" /> is linear with negative gradient, <Katex tex="F" /> is a quadratic with a negative leading coefficient — an inverted parabola. Where it crosses the axes depends on the <Katex tex="+c" />, which is why the question only asks for the shape and the turning point.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{inverted parabola, maximum at } x=1}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b> has its turning point at <Katex tex="x=1" /> but as a minimum — that is the antiderivative of <Katex tex="-f" />. Options <b>C</b> and <b>D</b> put the turning point at <Katex tex="x=-1" />, where <Katex tex="f" /> is not zero.</>,
  },
]

export default function MethodsQ4_2025NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The graph of <Katex tex="y=f(x)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={stemSrc}
              alt="The graph of y = f(x): a straight line with negative gradient crossing the x-axis at x = 1 and the y-axis above the origin — from the original 2025 NHT VCAA exam paper"
              className="w-full max-w-[400px]"
            />
          </div>
          <p>
            Which option shows the graph of <Katex tex="y=F(x)" />, where <Katex tex="F" /> is an
            anti-derivative of <Katex tex="f" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: an upright parabola with its minimum at x = 1" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: an inverted parabola with its maximum at x = 1" />, isAnswer: true },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: an upright parabola with its minimum at x = −1" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: an inverted parabola with its maximum at x = −1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
