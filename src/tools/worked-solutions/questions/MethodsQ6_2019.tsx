// 2019 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 63% correct. Maximising
// the volume of an open-top box folded from a cut-cornered rectangular sheet. Question text
// transcribed from the original paper; the net is cropped directly from the original VCAA exam
// PDF, not a redrawing. The graph of the volume function is this site's own explanatory figure
// (matplotlib) — VCAA never printed one. Solution is original. Interactive
// (interactives/meth-2019-mcq6-fold): a slider folds the net into the box beside the graph of V(x),
// which peaks at x = 10; the dashed cubic past x = 25 holds the rejected root 100/3; a toggle shows the
// "80 − x" model. Distractors checked in sympy: x(80 − x)(50 − x) has V' = 0 at x = 20 (B) and 200/3
// (E); 100/3 (D) is the other root of the correct V'; 25 (C) is the domain end, where V = 0.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { WrongMethod } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2019-mcq6-cardboard.png'
import volumeSrc from './meth-2019-mcq6-volume.png'
import boxSrc from './meth-2019-mcq6-box.png'

const FoldWidget = lazyWidget(() => import('../interactives/meth-2019-mcq6-fold'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 9, C: 7, D: 12, E: 8 },
  noAnswer: 1,
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{length} = 80-2x" />
        <Katex display tex="\text{width} = 50-2x" />
        <Katex display tex="\text{height} = x" />
      </>
    ),
    reason: <>Always start a box question from the net. Folding the flaps up turns the cut sheet into the open box, so its <em>height</em> is the side of the cut-out square, <Katex tex="x" />. Each edge of the sheet has a square cut from <em>both</em> ends, so each base dimension loses <Katex tex="2x" />, not <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="V(x) = x(80-2x)(50-2x), \qquad 0<x<25" />,
    reason: <>Volume of a rectangular prism. The domain comes from needing all three dimensions positive: <Katex tex="x>0" /> and <Katex tex="50-2x>0" />, i.e. <Katex tex="x<25" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="V(x) = 4x^3-260x^2+4000x" />
        <Katex display tex="V'(x) = 12x^2-520x+4000" />
        <Katex display tex="= 4\left(3x^2-130x+1000\right)" />
      </>
    ),
    reason: <>Expand, then differentiate. (On a CAS you can skip both lines: <Cas fn="fMax">fMax(x(80-2x)(50-2x), x) | 0&lt;x&lt;25</Cas> returns <Katex tex="x=10" /> directly. Keep the domain restriction: without it there is no maximum, since this cubic grows without bound. Graphing <Katex tex="V" /> and reading off the peak works too. The by-hand route is shown because the factorisation is short and it is the only route available on Exam 1.)</>,
  },
  {
    working: (
      <>
        <Katex display tex="3x^2-130x+1000 = (3x-100)(x-10) = 0" />
        <Katex display tex="\implies x=\dfrac{100}{3} \ \text{ or } \ x=10" />
      </>
    ),
    reason: <>A maximum of a smooth function inside its domain is a stationary point, so set <Katex tex="V'(x)=0" />. Dividing by <Katex tex="4" /> first leaves a quadratic that factorises.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={volumeSrc} alt="Graph of V(x) = x(80−2x)(50−2x) on 0 ≤ x ≤ 25, rising to a maximum of 18 000 at x = 10 and falling back to zero at x = 25" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <><Katex tex="x=\tfrac{100}{3}\approx33.3" /> is outside the domain: two <Katex tex="33.3" /> cm squares don&apos;t fit across a <Katex tex="50" /> cm width. That leaves <Katex tex="x=10" />, and the graph confirms it is the maximum. You can also see this without a graph: <Katex tex="V" /> is a cubic with positive leading coefficient, so it rises, falls, then rises again. Its <em>first</em> stationary point is the local maximum and the second is a local minimum.</>,
  },
  {
    working: <Katex display tex="\boxed{x=10}" />,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, <Katex tex="\tfrac{100}{3}" />, is the rejected root. Options <b>B</b> and <b>E</b>, <Katex tex="20" /> and <Katex tex="\tfrac{200}{3}" />, are the solutions of <Katex tex="V'(x)=0" /> for the wrong model <Katex tex="x(80-x)(50-x)" />. Option <b>C</b>, <Katex tex="25" />, is the end of the domain, where the width and the volume are both <Katex tex="0" />.</>,
  },
]

export default function MethodsQ6_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            A rectangular sheet of cardboard has a length of <Katex tex="80" /> cm and a width of{' '}
            <Katex tex="50" /> cm. Squares, of side length <Katex tex="x" /> centimetres, are cut
            from each of the corners, as shown in the diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img src={diagramSrc} alt="Rectangular 80 cm by 50 cm sheet with x cm squares cut from each corner, from the original 2019 VCAA exam paper" className="w-full max-w-[320px]" />
          </div>
          <p className="mb-3">
            A rectangular box with an open top is then constructed, as shown in the diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img src={boxSrc} alt="The open-topped rectangular box, drawn in perspective with hidden edges dashed, from the original 2019 VCAA exam paper" className="w-full max-w-[220px]" />
          </div>
          <p>The volume of the box is a maximum when <Katex tex="x" /> is equal to</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="10" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="20" /> },
        { letter: 'C', content: <Katex tex="25" /> },
        { letter: 'D', content: <Katex tex="\dfrac{100}{3}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{200}{3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the volume rises, peaks at x = 10, then falls">
            <FoldWidget />
          </Explore>
          <WrongMethod
            title="Cutting a square off the corner takes x off each side"
            source="9% chose B, 8% chose E"
            working={
              <>
                <Katex display tex="V = x(80-x)(50-x)" />
                <Katex display tex="V' = 3x^2-260x+4000 = (x-20)(3x-200)" />
                <Katex display tex="x = 20 \ \text{(B)} \quad \text{or} \quad x=\tfrac{200}{3} \ \text{(E)}" />
              </>
            }
          >
            <p>
              Look at the net: along the <Katex tex="80" /> cm edge there is a cut-out square at <em>each</em> end, so
              the base length is <Katex tex="80-x-x=80-2x" />, and likewise <Katex tex="50-2x" />. A quick check: with{' '}
              <Katex tex="x=20" />, the true base is <Katex tex="40\times10" />, not <Katex tex="60\times30" />. Both
              B and E are solutions of the wrong model&apos;s <Katex tex="V'(x)=0" />, which is how a student lands on either of them.
            </p>
          </WrongMethod>
          <WrongMethod
            title="100/3 solves V′(x) = 0, so it's the answer"
            source="12% chose D"
            working={<Katex display tex="3x^2-130x+1000=0 \implies x=\tfrac{100}{3}" />}
          >
            <p>
              <Katex tex="V'(x)=0" /> gives <em>candidates</em>, which still have to be checked against the domain and
              the question. At <Katex tex="x=\tfrac{100}{3}" /> the width would be{' '}
              <Katex tex="50-\tfrac{200}{3}=-\tfrac{50}{3}" /> cm, so there is no box. Even on the cubic&apos;s graph it
              is a local <em>minimum</em>, where <Katex tex="V=-\tfrac{200\,000}{27}" />. Write the domain{' '}
              <Katex tex="0<x<25" /> before you solve, and the wrong root rules itself out.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
