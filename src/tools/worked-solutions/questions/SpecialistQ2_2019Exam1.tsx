// 2019 Specialist Mathematics — Exam 1, Question 2 (3 marks).
// Solve |x - 4| = x/2 + 7. Question text transcribed from the original paper. VCAA printed no
// diagram; the graph below is this site's own explanatory figure (matplotlib) showing the two
// intersection points, since the examination report notes that some students drew a graph to
// support their reasoning. Cross-checked against the
// VCAA examination report and itute's independent solutions — both give x = -2 and x = 22.
// Solution is original. This question has no lettered parts, so it uses the single-card layout.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2019e1-q2-abs.png'

const EXAMINER: SAExaminerStats = {
  marks: [15, 5, 20, 60],
  average: 2.3,
  comment: (
    <>
      Common methods were to solve two linear equations:{' '}
      <Katex tex="x-4=\dfrac{x}{2}+7" /> and <Katex tex="4-x=\dfrac{x}{2}+7" /> or to solve a
      quadratic equation <Katex tex="(x-4)^2=\left(\dfrac{x}{2}+7\right)^2" />. Some students drew
      a graph to support their reasoning.
      <br />
      Students who solved linear equations were generally more successful than those who solved
      a quadratic equation. In the latter case, some students wrote{' '}
      <Katex tex="(x-4)^2=x^2\pm16" /> or <Katex tex="\left(\dfrac{x}{2}+7\right)^2=\dfrac{x^2}{4}+49" />.
      Many had difficulty solving the quadratic equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|x-4| = \begin{cases} x-4, & x\ge4 \\ -(x-4), & x<4\end{cases}" />,
    reason: <>The absolute value splits into two cases depending on the sign of what's inside. Solve each case separately, then check the answers.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 1: } x-4 = \dfrac{x}{2}+7" />
        <Katex display tex="x-\dfrac{x}{2} = 11 \implies \dfrac{x}{2}=11 \implies x=22" />
      </>
    ),
    reason: <>Valid, since <Katex tex="22\ge4" /> — this case assumed <Katex tex="x\ge4" />, and the answer agrees.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 2: } -(x-4) = \dfrac{x}{2}+7" />
        <Katex display tex="4-x = \dfrac{x}{2}+7 \implies -3 = \dfrac{3x}{2} \implies x=-2" />
      </>
    ),
    reason: <>Valid, since <Katex tex="-2<4" /> — consistent with this case's assumption.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=22: \quad |22-4| = 18, \quad \dfrac{22}{2}+7 = 18 \ \checkmark" />
        <Katex display tex="x=-2: \quad |-2-4| = 6, \quad \dfrac{-2}{2}+7 = 6 \ \checkmark" />
      </>
    ),
    reason: <>Substituting back confirms both — the report's general comments point out that answers to this question could be verified as correct by substitution. It matters most on the squaring route, which can produce solutions that satisfy the squared equation but not the original.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={graphSrc} alt="Graphs of y = |x − 4| (a V-shape with vertex at (4, 0)) and the line y = x/2 + 7, meeting at (−2, 6) and (22, 18) — this site's own explanatory figure" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>The picture behind the algebra: the V-shaped graph of <Katex tex="y=|x-4|" /> cuts the line <Katex tex="y=\tfrac{x}{2}+7" /> exactly twice — once on each arm of the V, which is why there are exactly two solutions and why each case above produced one of them.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-2 \quad \text{or} \quad x=22}" />,
    reason: <>Both solutions — one from each case.</>,
  },
]

export default function SpecialistQ2_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Find all values of <Katex tex="x" /> for which <Katex tex="|x-4| = \dfrac{x}{2}+7" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            <Katex tex="|A|" /> means the size of <Katex tex="A" /> ignoring its sign, so{' '}
            <Katex tex="|A|=A" /> when <Katex tex="A\ge0" /> and <Katex tex="|A|=-A" /> when{' '}
            <Katex tex="A<0" />. That gives the standard method: split into the two cases, solve
            each, and keep only the solutions consistent with the case you assumed.
          </p>
          <p>
            A quadratic route also exists — square both sides — but it is riskier: squaring can
            introduce solutions that don't satisfy the original equation, and the report notes
            students who solved linear equations were generally more successful than those who
            solved a quadratic equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAMINER} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
