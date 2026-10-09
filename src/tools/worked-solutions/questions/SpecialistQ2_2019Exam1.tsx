// 2019 Specialist Mathematics — Exam 1, Question 2 (3 marks).
// Solve |x - 4| = x/2 + 7. Question text transcribed from the original paper. VCAA printed no
// diagram; the graph below is this site's own explanatory figure (matplotlib) showing the two
// intersection points, since the examination report notes that some students drew a graph to
// support their reasoning. Cross-checked against the
// VCAA examination report and itute's independent solutions — both give x = -2 and x = 22.
// Solution is original. This question has no lettered parts, so it uses the single-card layout.
// Interactive (after the working): interactives/spec-2019e1-q2-cases.tsx — the V as two arms, each
// case solving with one arm's whole line; a slider on k in y = x/2 + k shows case answers landing
// on the dashed extensions (and so failing their checks) once k < -2. WrongMethod: squaring each
// bracket term by term, (x-4)^2 = x^2 +/- 16 and (x/2+7)^2 = x^2/4 + 49 (both named in the report);
// each wrong quadratic was solved with sympy to confirm the surd answers quoted.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './spec-2019e1-q2-abs.png'

const CasesWidget = lazyWidget(() => import('../interactives/spec-2019e1-q2-cases'))

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
    reason: (
      <>
        The modulus is the only awkward part of the equation, and it has a different formula on each side of{' '}
        <Katex tex="x=4" />, where <Katex tex="x-4" /> changes sign. So split there: on the right the modulus does
        nothing, on the left it flips the sign. Graphically, these are the two straight arms of the V-shaped graph of{' '}
        <Katex tex="y=|x-4|" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 1: } x-4 = \dfrac{x}{2}+7" />
        <Katex display tex="x-\dfrac{x}{2} = 11 \implies \dfrac{x}{2}=11 \implies x=22" />
      </>
    ),
    reason: (
      <>
        On the right arm, <Katex tex="|x-4|" /> is just <Katex tex="x-4" />, so the equation becomes linear. But that
        replacement is only true for <Katex tex="x\ge4" />, so the answer only counts if it lies there. It does:{' '}
        <Katex tex="22\ge4" />, so keep <Katex tex="x=22" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 2: } -(x-4) = \dfrac{x}{2}+7" />
        <Katex display tex="4-x = \dfrac{x}{2}+7 \implies -3 = \dfrac{3x}{2} \implies x=-2" />
      </>
    ),
    reason: (
      <>
        On the left arm the inside is negative, so <Katex tex="|x-4|=-(x-4)=4-x" />. Again check the assumption:{' '}
        <Katex tex="-2<4" />, so keep <Katex tex="x=-2" />. If a case's answer broke its own condition, it would be where
        the line meets that arm's extension, not the V itself, and would be rejected.
      </>
    ),
    more: (
      <>
        Drag <Katex tex="k" /> in the interactive below to see that happen.
      </>
    ),
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
    reason: (
      <>
        The picture behind the algebra: the V-shaped graph of <Katex tex="y=|x-4|" /> cuts the line{' '}
        <Katex tex="y=\tfrac{x}{2}+7" /> exactly twice, once on each arm, which is why each case produced one
        solution. Why is <Katex tex="22" /> so far out? At <Katex tex="x=4" /> the line is already <Katex tex="9" />{' '}
        above the vertex. Going right, the arm (gradient <Katex tex="1" />) gains on the line (gradient{' '}
        <Katex tex="\tfrac12" />) by only <Katex tex="\tfrac12" /> per unit, so it needs <Katex tex="18" /> units:{' '}
        <Katex tex="x=22" />. Going left, the gap closes by <Katex tex="\tfrac32" /> per unit, so after{' '}
        <Katex tex="6" /> units: <Katex tex="x=-2" />.
      </>
    ),
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
          <p>
            Why squaring can add fake answers: <Katex tex="|A|=B" /> squared is <Katex tex="A^2=B^2" />, which is
            also true when <Katex tex="|A|=-B" />. So a root of the squared equation only counts if the
            right-hand side is not negative there. (Here <Katex tex="\tfrac{x}{2}+7" /> is positive at both{' '}
            <Katex tex="x=-2" /> and <Katex tex="x=22" />, so nothing extra appears.)
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Each case solves with one arm of the V, so its answer must land on that arm">
          <CasesWidget />
        </Explore>
        <WrongMethod
          title="Square both sides, then square each bracket term by term"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="(x-4)^2=x^2-16" />
              <Katex display tex="x^2-16=\tfrac{x^2}{4}+7x+49" />
              <Katex display tex="3x^2-28x-260=0" />
              <Katex display tex="x=\tfrac{14\pm4\sqrt{61}}{3}" />
            </>
          }
        >
          <p>
            Squaring a bracket is not squaring each term: <Katex tex="(a-b)^2=a^2-2ab+b^2" />, so{' '}
            <Katex tex="(x-4)^2=x^2-8x+16" />. The middle term <Katex tex="-8x" /> was dropped. The report also saw{' '}
            <Katex tex="x^2+16" /> (giving <Katex tex="x=\tfrac{14\pm4\sqrt{37}}{3}" />) and{' '}
            <Katex tex="\left(\tfrac{x}{2}+7\right)^2=\tfrac{x^2}{4}+49" />, which drops the <Katex tex="7x" /> and
            gives <Katex tex="x=\tfrac{16\pm2\sqrt{163}}{3}" />.
          </p>
          <p>
            How to catch it: ugly surds in a 3-mark technology-free question are a warning sign, and substituting
            fails. With <Katex tex="\sqrt{61}\approx7.8" />, <Katex tex="x\approx15.1" /> gives{' '}
            <Katex tex="|x-4|\approx11.1" /> but <Katex tex="\tfrac{x}{2}+7\approx14.5" />. Done properly, squaring
            gives:
          </p>
          <Katex display tex="x^2-8x+16=\tfrac{x^2}{4}+7x+49" />
          <Katex display tex="3x^2-60x-132=0" />
          <Katex display tex="x^2-20x-44=0" />
          <Katex display tex="(x-22)(x+2)=0" />
          <p>These are the same two answers as the case method.</p>
        </WrongMethod>
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
