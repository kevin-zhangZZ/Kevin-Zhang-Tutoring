// 2023 Chemistry Exam, MCQ 30. VCAA examination report: 48% correct. Predicting the reaction in a
// beaker of H₂O₂, Fe³⁺ and Fe²⁺ from the electrochemical series: H₂O₂ is both the strongest oxidising
// and strongest reducing agent present, so it decomposes; a direct reaction gives heat, not a voltage.
// Question text transcribed from the original paper; the beaker diagram is cropped from the
// original VCAA exam PDF. The working uses the 2026 Data Book's E° values (+1.76 V and +0.70 V for
// the two H₂O₂ couples; the report quotes +1.77 V and +0.68 V) — a note says so; the answer is
// unchanged. The report's "O₂(s)" is a slip for O₂(g), kept verbatim and noted in the working.
// VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import beakerSrc from './chem-2023-mcq30-beaker.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 11, C: 48, D: 15 },
  answer: 'C',
  comment: (
    <>
      The relative locations of the species <Chem eq="H2O2(aq)" />, <Chem eq="Fe3+(aq)" /> and{' '}
      <Chem eq="Fe2+(aq)" /> on the electrochemical series:
      <br />
      <Chem eq="H2O2(aq) + 2H+(aq) + 2e- <=> 2H2O(l)" />&emsp;+1.77 V
      <br />
      <Chem eq="Fe3+(aq) + e- <=> Fe2+(aq)" />&emsp;+0.77 V
      <br />
      <Chem eq="O2(s) + 2H+(aq) + 2e- <=> H2O2(aq)" />&emsp;+0.68 V
      <br />
      <Chem eq="Fe2+(aq) + 2e- <=> Fe(s)" />&emsp;−0.44 V
      <br />
      <Chem eq="H2O2(aq)" /> is both the strongest oxidising agent and the strongest reducing
      agent present.
      <br />
      The equation for the redox reaction occurring will be
      <br />
      <Chem eq="2H2O2(aq) -> O2(g) + 2H2O(l)" />.
      <br />
      So, the concentration of <Chem eq="H2O2(aq)" /> decreases.
      <br />
      The reaction cannot produce a voltage because it is not in an electrochemical cell.
      <br />
      The reaction is exothermic, so the temperature of the contents increases.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Chem eq="H2O2(aq) + 2H+(aq) + 2e- <=> 2H2O(l)" />&emsp;+1.76 V
        <br />
        <Chem eq="Fe3+(aq) + e- <=> Fe2+(aq)" />&emsp;+0.77 V
        <br />
        <Chem eq="O2(g) + 2H+(aq) + 2e- <=> H2O2(aq)" />&emsp;+0.70 V
        <br />
        <Chem eq="Fe2+(aq) + 2e- <=> Fe(s)" />&emsp;−0.44 V
      </>
    ),
    reason: (
      <>
        Find every half-equation in the Data Book&rsquo;s electrochemical series that contains a
        species in the beaker (<Chem eq="H2O2" />, <Chem eq="Fe3+" />, <Chem eq="Fe2+" />). Note
        that <Chem eq="H2O2" /> appears twice: on the left of the top one and on the right of the
        third one.
        <DataBookNote>
          the 2026 Data Book gives +1.76 V for the <Chem eq="H2O2" />/<Chem eq="H2O" /> couple and
          +0.70 V for the <Chem eq="O2" />/<Chem eq="H2O2" /> couple; the report quotes +1.77 V and
          +0.68 V. The order of the half-equations is the same, so the answer is unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        Strongest oxidising agent present (left side, highest): <Chem eq="H2O2" /> (+1.76 V)
        <br />
        Strongest reducing agent present (right side, lowest): <Chem eq="H2O2" /> (+0.70 V)
      </>
    ),
    reason: <>On the right side, the species present are <Chem eq="H2O" /> (+1.76 V), <Chem eq="Fe2+" /> (+0.77 V) and <Chem eq="H2O2" /> (+0.70 V). Fe(s) at −0.44 V is not in the beaker, so it doesn&rsquo;t count. The lowest present reducing agent is <Chem eq="H2O2" />.</>,
  },
  {
    working: (
      <>
        Reduction: <Chem eq="H2O2(aq) + 2H+(aq) + 2e- -> 2H2O(l)" />
        <br />
        Oxidation: <Chem eq="H2O2(aq) -> O2(g) + 2H+(aq) + 2e-" />
        <br />
        Overall: <Chem eq="2H2O2(aq) -> O2(g) + 2H2O(l)" />
      </>
    ),
    reason: <>The strongest oxidising agent reacts with the strongest reducing agent. Here one <Chem eq="H2O2" /> molecule oxidises another, so <Chem eq="H2O2" /> decomposes to oxygen and water and its <b>concentration decreases</b>. (Adding the half-equations, the <Chem eq="H+" /> and electrons cancel.)</>,
  },
  {
    working: <>Iron ions also use up <Chem eq="H2O2" />: <Chem eq="Fe2+" /> is oxidised by <Chem eq="H2O2" /> (+1.76 &gt; +0.77), and <Chem eq="Fe3+" /> oxidises <Chem eq="H2O2" /> (+0.77 &gt; +0.70).</>,
    reason: <>Each of these side reactions also removes <Chem eq="H2O2" />, so every possible reaction in the beaker lowers [<Chem eq="H2O2" />] — option C holds whichever pairing you consider.</>,
  },
  {
    working: <>A — depositing Fe(s) needs <Chem eq="Fe2+" /> to be reduced (−0.44 V); no reducing agent present lies below it ✗</>,
    reason: <>To reduce <Chem eq="Fe2+" />, a reducing agent on the right of a half-equation <i>lower</i> than −0.44 V is needed. The reducing agents in the beaker are all at +0.70 V or higher.</>,
  },
  {
    working: <>B — all species are mixed in one beaker, so electrons transfer <b>directly</b>: no external circuit, <b>no voltage</b> ✗</>,
    reason: <>A potential difference is only delivered when the oxidising and reducing agents are separated into two half-cells joined by a wire and salt bridge. In a single beaker the chemical energy is released as heat. 1.09 V is the gap between the two <Chem eq="H2O2" /> couples using the report's values (1.77 − 0.68); with the 2026 values it would be 1.76 − 0.70 = 1.06 V — either way, not delivered here.</>,
  },
  {
    working: <>D — spontaneous redox reactions are <b>exothermic</b>, so the temperature <b>increases</b> ✗</>,
    reason: <>The energy released by the reaction (here as heat, since there is no circuit) warms the contents of the beaker.</>,
  },
  {
    working: <><b>The concentration of <Chem eq="H2O2(aq)" /> decreases, since it is the strongest reducing agent.</b></>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> needs a reducing agent stronger than any present. Option <b>B</b> mistakes a direct reaction for a galvanic cell. Option <b>D</b> has the energy change backwards. (The report&rsquo;s comment writes &ldquo;<Chem eq="O2(s)" />&rdquo; in the third half-equation — a slip for <Chem eq="O2(g)" />, as its own overall equation shows.)</>,
  },
]

export default function ChemistryQ30_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            At standard conditions, solutions of hydrogen peroxide, <Chem eq="H2O2" />, iron(III)
            nitrate, <Chem eq="Fe(NO3)3" />, and iron(II) nitrate, <Chem eq="Fe(NO3)2" />, were
            added to a beaker. The initial concentrations of <Chem eq="H2O2" />,{' '}
            <Chem eq="Fe(NO3)3" /> and <Chem eq="Fe(NO3)2" /> in the beaker were all 1 M.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={beakerSrc}
              alt="A beaker containing 1 M H₂O₂(aq), 1 M Fe(NO₃)₃(aq) and 1 M Fe(NO₃)₂(aq) — from the original 2023 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>Which one of the following statements is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>Iron, Fe, is deposited at the bottom of the beaker.</> },
        { letter: 'B', content: <>The two half-reactions in the beaker immediately produce 1.09 V.</> },
        { letter: 'C', content: <>The concentration of <Chem eq="H2O2(aq)" /> decreases immediately since it is the strongest reducing agent.</>, isAnswer: true },
        { letter: 'D', content: <>The temperature of the contents in the beaker decreases immediately when <Chem eq="Fe(NO3)3(aq)" /> reacts with <Chem eq="H2O2(aq)" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
