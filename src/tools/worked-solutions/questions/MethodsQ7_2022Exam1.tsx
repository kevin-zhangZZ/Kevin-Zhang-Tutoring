// 2022 Mathematical Methods — Exam 1 Question 7 (7 marks). Two tile designs that must each
// split a square in half and line up edge to edge. Question text transcribed from the
// original paper; all three figures are crops of VCAA's own artwork. Answers checked with
// sympy and against the VCAA examination report. Solution is original.
// Part c has an Explore widget (interactives/meth-2022e1-q7c-joins.tsx): a row of tiles you can
// switch between Type A and Type B, showing that every join pairs one tile's right end with the
// next tile's left end (so all four endpoints are needed), and that the gradients need not match.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import patternSrc from './meth-2022e1-q7-pattern.png'
import typeASrc from './meth-2022e1-q7-type-a.png'
import typeBSrc from './meth-2022e1-q7-type-b.png'

const JoinsWidget = lazyWidget(() => import('../interactives/meth-2022e1-q7c-joins'))

const EXAM_AI: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: <>This question was well done.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      This question was well done. A number of students found <Katex tex="a=6" />,
      erroneously writing that <Katex tex="\sin(0)" /> or <Katex tex="\sin(2\pi)=1" />. Some
      students approached this question by forming an integral representing half the area.
      Students are advised to be guided by the number of marks allotted to a question to
      inform their decision of which approach to take.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 13, 27, 32],
  average: 1.7,
  comment: (
    <>
      This question was a 'show that' question and most students seemed to be alert to the
      need to show clear, logical steps in their solution process. Most students recognised
      the need to include the 'dx' in the integral statement. In this question students were
      asked to show that the coloured area is half the front surface of the tile. Students
      needed to explicitly demonstrate this link. Some students incorrectly tried to show{' '}
      <Katex tex="\int_0^{20}g(x)\,dx=\tfrac12" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [61, 24, 16],
  average: 0.6,
  comment: (
    <>
      Students needed to clearly express that in order for the pattern to match up, the four
      points, two on each tile, needed to be shown as having the same height. It was clear
      that some students interpreted the word 'endpoints' as only the right-hand end of each
      tile, as they found only <Katex tex="f(20)" /> and <Katex tex="g(20)" /> but did not
      compute values for <Katex tex="f(0)" /> and <Katex tex="g(0)" />. A percentage of
      students tried to prove the derivatives of <Katex tex="f(x)" /> and <Katex tex="g(x)" />{' '}
      were equal at the endpoints. This was not the intention of the question and was not
      always true for the context.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{area} = 20\times20" />,
    reason: <>The tile is a square of side 20 cm.</>,
  },
  {
    working: <Katex display tex="\boxed{400\ \text{cm}^2}" />,
    reason: <>So Condition 1 asks each colour to cover 200 cm².</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 4\sin\!\left(\frac{\pi x}{10}\right)+a" />,
    reason: <>Condition 1 needs the region below this curve to cover half the tile, 200 cm². Its <Katex tex="\sin" /> part has period <Katex tex="\tfrac{2\pi}{\pi/10}=20" />, exactly the tile width, so each tile holds one full wave.</>,
  },
  {
    working: <Katex display tex="\int_0^{20}\sin\!\left(\frac{\pi x}{10}\right)dx = 0" />,
    reason: <>Over one full period a sine wave has equal area above and below its axis, so this part adds nothing. (Check: an antiderivative is <Katex tex="-\tfrac{10}{\pi}\cos\!\left(\tfrac{\pi x}{10}\right)" />, and <Katex tex="\cos(2\pi)=\cos(0)=1" />, so the two ends cancel.)</>,
  },
  {
    working: <Katex display tex="\text{area below } f = \int_0^{20}f(x)\,dx = 0+20a = 20a" />,
    reason: <>The constant <Katex tex="a" /> integrates to <Katex tex="20a" />. So the area below the wave is the same as the area below the flat line <Katex tex="y=a" />: the bumps above <Katex tex="y=a" /> exactly fill the dips below it.</>,
  },
  {
    working: <Katex display tex="20a = 200 \implies \boxed{a = 10}" />,
    reason: <>Half of the 400 cm² from part a.i. So <Katex tex="a" /> is just the mid-height of the tile — for a 1-mark question this picture is all the working needed. The report notes some students found <Katex tex="a=6" />, erroneously writing <Katex tex="\sin(0)" /> or <Katex tex="\sin(2\pi)=1" />: in fact both are 0 (sine is 0 at every multiple of <Katex tex="\pi" />; it is <Katex tex="\cos(0)" /> that equals 1).</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{shaded area} = \int_0^{20}g(x)\,dx" />,
    reason: <>One colour is the region under <Katex tex="y=g(x)" /> from the left edge <Katex tex="x=0" /> to the right edge <Katex tex="x=20" />. The figure shows the curve stays inside the tile (above the bottom edge, below the top), so this integral is exactly that colour's area.</>,
  },
  {
    working: <Katex display tex="= \int_0^{20}\left(-\frac{x^3}{100}+\frac{3x^2}{10}-2x+10\right)dx" />,
    reason: <>Write the rule out in full, and keep the <Katex tex="dx" /> — the report notes the need to include it in the integral statement.</>,
  },
  {
    working: <Katex display tex="= \left[-\frac{x^4}{400}+\frac{x^3}{10}-x^2+10x\right]_0^{20}" />,
    reason: <>Antidifferentiate term by term: add 1 to the power and divide by the new power. So <Katex tex="-\tfrac{x^3}{100}" /> becomes <Katex tex="-\tfrac{x^4}{4\times100}=-\tfrac{x^4}{400}" />, and <Katex tex="\tfrac{3x^2}{10}" /> becomes <Katex tex="\tfrac{3x^3}{30}=\tfrac{x^3}{10}" />.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac{160\,000}{400}+\frac{8000}{10}-400+200\right)-0" />,
    reason: <>Substitute <Katex tex="x=20" />, then subtract the value at <Katex tex="x=0" />, which is 0 because every term has a factor of <Katex tex="x" />. Here <Katex tex="20^4=160\,000" />, <Katex tex="20^3=8000" /> and <Katex tex="20^2=400" />.</>,
  },
  {
    working: <Katex display tex="= -400+800-400+200 = 200\ \text{cm}^2" />,
    reason: <>The shaded colour covers 200 cm². The other colour covers the rest of the tile: <Katex tex="400-200=200" /> cm².</>,
  },
  {
    working: <Katex display tex="\boxed{200 = \tfrac12\times400 = \tfrac12\ \text{area of tile}}" />,
    reason: <>The marks hang on this last link: compare 200 with the tile's area of 400 cm² from part a.i — the report notes students needed to explicitly demonstrate this link. Both colours cover half the tile, so a Type B tile meets Condition 1. The <Katex tex="\tfrac12" /> is a fraction of the tile, not an area, so trying to show <Katex tex="\int_0^{20}g(x)\,dx=\tfrac12" /> (which the report notes some students did) proves the wrong thing. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 4\sin(0)+10 = 10" />,
    reason: <>'Endpoints' means both ends of each curve: the left edge <Katex tex="x=0" /> and the right edge <Katex tex="x=20" />. Use <Katex tex="a=10" /> from part a.ii, and <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="f(20) = 4\sin(2\pi)+10 = 10" />,
    reason: <><Katex tex="\tfrac{\pi\times20}{10}=2\pi" />, and <Katex tex="\sin(2\pi)=0" />: one full period after <Katex tex="x=0" />, the sine is back where it started.</>,
  },
  {
    working: <Katex display tex="g(0) = -0+0-0+10 = 10" />,
    reason: <>Every term except the constant has a factor of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="g(20) = -\frac{8000}{100}+\frac{3(400)}{10}-2(20)+10" />,
    reason: <><Katex tex="20^3=8000" /> and <Katex tex="20^2=400" />.</>,
  },
  {
    working: <Katex display tex="= -80+120-40+10 = 10" />,
    reason: <>So both curves start and finish at height 10.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{AA}&: f(20)=f(0)\\ \text{AB}&: f(20)=g(0)\\ \text{BA}&: g(20)=f(0)\\ \text{BB}&: g(20)=g(0)\end{aligned}" />,
    reason: <>Why all four values are needed: at every join the right edge (<Katex tex="x=20" />) of one tile meets the left edge (<Katex tex="x=0" />) of the next, and either tile could be Type A or Type B. That gives four kinds of join, and each compares a right endpoint with a left endpoint. The report notes some students found only <Katex tex="f(20)" /> and <Katex tex="g(20)" /> — that shows where each tile finishes, but not where the next one starts.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}f(0)=f(20)=g(0)=g(20)=10\\ \text{so the tiles join up in any order}\end{gathered}}" />,
    reason: <>All four values are equal, so every join in the list above holds: the boundary leaves one tile at height 10 and enters the next at height 10, with no jump. Inside each tile the curve has no breaks (sine and polynomial graphs are continuous), so Type A and Type B tiles can go in any order and the colours form a continuous pattern — Condition 2 is met. The gradients don't have to match: at an AB join <Katex tex="f'(20)=\tfrac{2\pi}{5}" /> but <Katex tex="g'(0)=-2" />, so there is a corner but no gap. The report notes that proving the derivatives equal was not the intention of the question.</>,
  },
]

export default function MethodsQ7_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (7 marks)</p>
        <p>
          A tilemaker wants to make square tiles of size 20 cm × 20 cm.
          <br />
          The front surface of the tiles is to be painted with two different colours that meet
          the following conditions:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Condition 1 – Each colour covers half the front surface of a tile.</li>
          <li>
            Condition 2 – The tiles can be lined up in a single horizontal row so that the
            colours form a continuous pattern.
          </li>
        </ul>
        <p>An example is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={patternSrc}
            alt="Five square tiles in a row, each with its lower region shaded below a curve, the curves joining up continuously from one tile to the next — from the original 2022 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>
          There are two types of tiles: Type A and Type B.
          <br />
          For Type A, the colours on the tiles are divided using the rule{' '}
          <Katex tex="f(x)=4\sin\!\left(\dfrac{\pi x}{10}\right)+a" />, where{' '}
          <Katex tex="a\in R" />.
          <br />
          The corners of each tile have the coordinates{' '}
          <Katex tex="(0,0)" />, <Katex tex="(20,0)" />, <Katex tex="(20,20)" /> and{' '}
          <Katex tex="(0,20)" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={typeASrc}
            alt="A Type A tile: a square with corners labelled (0, 0), (20, 0), (20, 20) and (0, 20), the region below a sine-shaped curve shaded — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Area Under Curve"
        marks={1}
        statement={<>Find the area of the front surface of each tile.</>}
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Find Parameter"
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

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Type B tiles, an example of which is shown below, are divided using the rule{' '}
          <Katex tex="g(x)=-\dfrac{1}{100}x^3+\dfrac{3}{10}x^2-2x+10" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={typeBSrc}
            alt="A Type B tile: a square with corners labelled (0, 0), (20, 0), (20, 20) and (0, 20), the region below a cubic curve shaded — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Area Under Curve"
        marks={3}
        statement={<>Show that a Type B tile meets Condition 1.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Endpoints"
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
        <Explore title="Every join pairs one tile's right end with the next tile's left end">
          <JoinsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
