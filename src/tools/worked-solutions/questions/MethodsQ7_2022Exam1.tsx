// 2022 Mathematical Methods — Exam 1 Question 7 (7 marks). Two tile designs that must each
// split a square in half and line up edge to edge. Question text transcribed from the
// original paper; all three figures are crops of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import patternSrc from './meth-2022e1-q7-pattern.png'
import typeASrc from './meth-2022e1-q7-typeA.png'
import typeBSrc from './meth-2022e1-q7-typeB.png'

const EXAM_AI: SAExaminerStats = { marks: [33, 67], average: 0.7 }

const EXAM_AII: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      A number of students found <Katex tex="a=6" />, erroneously writing that{' '}
      <Katex tex="\sin(0)" /> or <Katex tex="\sin(2\pi)=1" />. Some students approached this
      by forming an integral representing half the area. Students are advised to be guided
      by the number of marks allotted.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 13, 27, 32],
  average: 1.7,
  comment: (
    <>
      Most students recognised the need to include the <Katex tex="dx" /> in the integral
      statement. Students were asked to show that the coloured area is half the front
      surface of the tile, and needed to explicitly demonstrate this link. Some students
      incorrectly tried to show <Katex tex="\int_0^{20}g(x)\,dx=\tfrac12" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [61, 24, 16],
  average: 0.6,
  comment: (
    <>
      Students needed to clearly express that, for the pattern to match up, the four points
      — two on each tile — must have the same height. Some students interpreted
      "endpoints" as only the right-hand end of each tile. A percentage of students tried to
      prove the derivatives were equal at the endpoints; this was not the intention.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{area} = 20\times20" />,
    reason: 'The tile is a square of side 20 cm.',
  },
  {
    working: <Katex display tex="\boxed{400\ \text{cm}^2}" />,
    reason: 'So Condition 1 asks each colour to cover 200 cm².',
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 4\sin\!\left(\frac{\pi x}{10}\right)+a" />,
    reason: <>The dividing curve. Its <Katex tex="\sin" /> part has period <Katex tex="\tfrac{2\pi}{\pi/10}=20" />, exactly the tile width.</>,
  },
  {
    working: <Katex display tex="\int_0^{20}\sin\!\left(\frac{\pi x}{10}\right)dx = 0" />,
    reason: <>One complete period of a sine encloses equal area above and below its axis, so it contributes nothing — this is the observation the question is built on.</>,
  },
  {
    working: <Katex display tex="\text{area below } f = \int_0^{20}f(x)\,dx = 0+20a = 20a" />,
    reason: <>The curve behaves, for area purposes, exactly like the horizontal line <Katex tex="y=a" />.</>,
  },
  {
    working: <Katex display tex="20a = 200 \implies \boxed{a = 10}" />,
    reason: <>Half of 400. The shortcut: <Katex tex="a" /> is simply the mid-height of the tile. Setting <Katex tex="4\sin(0)=1" /> to get <Katex tex="a=6" /> is the report's named error.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = -\frac{x^3}{100}+\frac{3x^2}{10}-2x+10" />,
    reason: 'The Type B dividing curve.',
  },
  {
    working: <Katex display tex="\int_0^{20}g(x)\,dx = \left[-\frac{x^4}{400}+\frac{x^3}{10}-x^2+10x\right]_0^{20}" />,
    reason: <>Term by term. Include the <Katex tex="dx" /> — the report checks for it.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac{160\,000}{400}+\frac{8000}{10}-400+200\right)-0" />,
    reason: <><Katex tex="20^4=160\,000" /> and <Katex tex="20^3=8000" />.</>,
  },
  {
    working: <Katex display tex="= -400+800-400+200 = 200\ \text{cm}^2" />,
    reason: 'The area under the curve, in square centimetres.',
  },
  {
    working: <Katex display tex="\boxed{200 = \tfrac12\times400, \text{ so each colour covers half the tile}} \ \checkmark" />,
    reason: <>The final sentence is the mark: linking 200 back to half of the 400 cm² from part a(i). Showing <Katex tex="\int g=\tfrac12" /> would be showing the wrong thing entirely.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 4\sin(0)+10 = 10" />,
    reason: <>The left edge of a Type A tile.</>,
  },
  {
    working: <Katex display tex="f(20) = 4\sin(2\pi)+10 = 10" />,
    reason: <>The right edge. Both are 10 because the period is exactly 20 and <Katex tex="\sin" /> starts and ends a period at zero.</>,
  },
  {
    working: <Katex display tex="g(0) = 10" />,
    reason: 'The constant term, since every other term has a factor of x.',
  },
  {
    working: <Katex display tex="g(20) = -80+120-40+10 = 10" />,
    reason: <><Katex tex="-\tfrac{8000}{100}+\tfrac{3(400)}{10}-40+10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(0) = f(20) = g(0) = g(20) = 10}" />,
    reason: <>All four endpoints sit at the same height, so the curve leaves every tile exactly where the next one picks it up — AA, AB, BA and BB all line up. That is Condition 2.</>,
  },
  {
    working: <Katex display tex="\text{gradients need not match}" />,
    reason: <>Worth saying: <Katex tex="f'(0)=\tfrac{2\pi}{5}" /> while <Katex tex="g'(0)=-2" />, so the pattern can have a kink at a join. The condition is continuity of the colour boundary, not smoothness — the report notes students who tried to prove the stronger claim.</>,
  },
]

export default function MethodsQ7_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (7 marks)</p>
        <p>
          A tilemaker wants to make square tiles of size 20 cm × 20 cm. The front surface of
          the tiles is to be painted with two different colours that meet the following
          conditions:
        </p>
        <p>
          <b>Condition 1</b> — Each colour covers half the front surface of a tile.
          <br />
          <b>Condition 2</b> — The tiles can be lined up in a single horizontal row so that
          the colours form a continuous pattern.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={patternSrc}
            alt="Four square tiles in a row, their two-colour boundary flowing continuously from one tile to the next — from the original 2022 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>
          There are two types of tiles: Type A and Type B. For Type A, the colours on the
          tiles are divided using the rule{' '}
          <Katex tex="f(x)=4\sin\!\left(\dfrac{\pi x}{10}\right)+a" />, where{' '}
          <Katex tex="a\in R" />. The corners of each tile have the coordinates{' '}
          <Katex tex="(0,0)" />, <Katex tex="(20,0)" />, <Katex tex="(20,20)" /> and{' '}
          <Katex tex="(0,20)" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={typeASrc}
            alt="A single square tile split by a sine curve into two coloured regions — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        marks={1}
        statement={<>Find the area of the front surface of each tile.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="a" /> so that a Type A tile meets Condition 1.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Type B tiles, an example of which is shown below, are divided using the rule{' '}
          <Katex tex="g(x)=-\dfrac{x^3}{100}+\dfrac{3x^2}{10}-2x+10" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={typeBSrc}
            alt="A single square tile split by a cubic curve into two coloured regions — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        marks={3}
        statement={<>Show that a Type B tile meets Condition 1.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Determine the endpoints of <Katex tex="f(x)" /> and <Katex tex="g(x)" /> on each
            tile. Hence, use these values to confirm that Type A and Type B tiles can be
            placed in any order to produce a continuous pattern in order to meet Condition 2.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
