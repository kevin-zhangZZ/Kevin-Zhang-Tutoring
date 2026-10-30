// 2022 Chemistry Exam, MCQ 11. VCAA examination report: 63% correct. Choosing the energy profile
// for the reverse, uncatalysed reaction of an exothermic equilibrium: the reverse reaction is
// endothermic (products above reactants) and the uncatalysed pathway has the higher activation
// energy. Question text transcribed from the original paper; the four energy profiles are cropped
// from the original VCAA exam PDF (one image, as printed). VCAA report only (no second source).
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphsSrc from './chem-2022-mcq11-energy-profiles.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 63, C: 7, D: 17 },
  answer: 'B',
  comment: (
    <>
      Since the forward reaction is exothermic, the products are at lower energy than the
      reactants – Graphs 3 and 4.
      <br />
      It follows that the reverse reaction is endothermic, so the products are at higher energy
      than the reactants – Graphs 1 and 2.
      <br />
      The presence of a catalyst lowers activation energy – Graphs 1 and 3.
      <br />
      The profile for the reverse reaction without a catalyst is Graph 2.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Forward: <Chem eq="A + B -> C" />, Δ<i>H</i> &lt; 0 (exothermic).<br />Reverse: <Chem eq="C -> A + B" />, Δ<i>H</i> &gt; 0 (endothermic).</>,
    reason: <>Reversing a reaction keeps the size of Δ<i>H</i> but flips its sign. Whatever energy the forward reaction releases, the reverse reaction must absorb.</>,
  },
  {
    working: <>Endothermic: products drawn <b>higher</b> than reactants → Graphs <b>1</b> and <b>2</b>.<br />Exothermic: products drawn <b>lower</b> than reactants → Graphs 3 and 4 (the forward reaction).</>,
    reason: <>On an energy profile the reactants are the flat line on the left and the products the flat line on the right. Graphs 1 and 2 rise by 4 grid squares from left to right; Graphs 3 and 4 fall by 4 squares — the same size of Δ<i>H</i>, opposite sign, as expected for a reaction and its reverse.</>,
  },
  {
    working: <>Activation energy, <i>E</i><sub>a</sub> = energy of the peak − energy of the reactants.<br />Graph 1: <i>E</i><sub>a</sub> ≈ 7 squares. Graph 2: <i>E</i><sub>a</sub> ≈ 8 squares.</>,
    reason: <>Read from the grid: in both graphs the reactants sit 2 squares above the axis; Graph 1 peaks 9 squares up and Graph 2 peaks 10 squares up. All graphs are drawn to the same scale (the stem says so), so heights can be compared directly.</>,
  },
  {
    working: <>A catalyst provides an <b>alternative pathway with a lower activation energy</b>, so the uncatalysed reaction has the <b>higher</b> peak → Graph <b>2</b>.</>,
    reason: <>A catalyst lowers <i>E</i><sub>a</sub> but does not change the energies of the reactants or products, so Δ<i>H</i> is the same with and without it — only the height of the hump changes.</>,
  },
  {
    working: <>Check: forward uncatalysed (Graph 4), <i>E</i><sub>a</sub> ≈ 4 squares.<br /><i>E</i><sub>a</sub>(reverse) = <i>E</i><sub>a</sub>(forward) + |Δ<i>H</i>| ≈ 4 + 4 = 8 squares ✓</>,
    reason: <>The forward and reverse uncatalysed reactions pass over the same peak (Graphs 2 and 4 both peak 10 squares above the axis), so the reverse reaction&rsquo;s climb is the forward climb plus the 4-square drop. This matches Graph 2.</>,
  },
  {
    working: <b>Graph 2</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b> (Graph 4) is the forward reaction without a catalyst — the right pathway, but it starts high and finishes low, so it shows the exothermic direction, not the reverse. Option <b>A</b> (Graph 1) is the reverse reaction <i>with</i> a catalyst (the lower peak). Option <b>C</b> (Graph 3) is the forward reaction with a catalyst.</>,
  },
]

export default function ChemistryQ11_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graphs shown below are energy profiles for the following reaction.</p>
          <p className="mb-2 pl-8">
            <Chem eq="A + B <=> C" />
            <span className="ml-10">Δ<i>H</i> &lt; 0</span>
          </p>
          <p className="mb-3">
            The graphs represent the forward reaction, with and without a catalyst, and the reverse
            reaction, with and without a catalyst. All graphs are drawn to the same scale.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphsSrc}
              alt="Four energy profiles on identical grids, energy (kJ mol⁻¹) against progress of reaction. Graph 1: reactants low, a moderate peak, products 4 squares higher than reactants. Graph 2: same start and finish as Graph 1 with a taller peak. Graph 3: reactants high, a small peak, products 4 squares lower. Graph 4: same start and finish as Graph 3 with a taller peak — from the original 2022 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p>Which energy profile represents the reverse reaction without a catalyst?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Graph 1' },
        { letter: 'B', content: 'Graph 2', isAnswer: true },
        { letter: 'C', content: 'Graph 3' },
        { letter: 'D', content: 'Graph 4' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
