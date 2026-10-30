// 2025 Chemistry Exam, MCQ 18. VCAA examination report: 41% correct. Which statement about
// artificial photosynthesis is correct, checked against the water-oxidation and proton-reduction
// half-equations. Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 21, C: 15, D: 23 },
  answer: 'A',
  comment: (
    <>
      In artificial photosynthesis, water is converted into hydrogen and oxygen gas by the sole
      application of sunlight as the energy source. In this process, water is oxidised to produce
      oxygen gas and at the same time water is reduced to form hydrogen gas. Option A aligns with
      this.
      <br />
      Natural photosynthesis produces oxygen gas and glucose.
      <br />
      When hydrogen ions gain electrons to form hydrogen gas, this can only occur at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Artificial photosynthesis: <b>sunlight alone</b> drives the splitting of water into <b>H₂</b> and <b>O₂</b> (&ldquo;green&rdquo; hydrogen).</>,
    reason: <>In the study design, artificial photosynthesis uses a <b>water oxidation</b> catalyst and a <b>proton reduction</b> catalyst; light absorbed by the system supplies the energy. No carbon dioxide is involved and no glucose is made.</>,
  },
  {
    working: (
      <>
        Oxidation (anode): <Chem eq="2H2O(l) -> O2(g) + 4H+(aq) + 4e-" />
        <br />
        Reduction (cathode): <Chem eq="4H+(aq) + 4e- -> 2H2(g)" />
        <br />
        Overall: <Chem eq="2H2O(l) -> 2H2(g) + O2(g)" />
      </>
    ),
    reason: <>The half-equations in acidic conditions, as the study design requires. Water loses electrons (oxidised) to give O₂; the H⁺ it releases gains electrons (reduced) to give H₂ — so overall water is oxidised <i>and</i> reduced, and the H₂ comes from water.</>,
  },
  {
    working: <>A: water is oxidised ✓ and H₂ is produced ✓.</>,
    reason: <>Both parts match the half-equations above. Correct.</>,
  },
  {
    working: <>B: natural photosynthesis: <Chem eq="6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)" /> — products glucose and O₂, not H₂ and O₂. ✗</>,
    reason: <>Both processes use sunlight and both release O₂, but the other product differs (glucose versus H₂). Ruled out.</>,
  },
  {
    working: <>C: H⁺ gaining electrons is a <b>reduction</b>, and reduction occurs at the <b>cathode</b>, not the anode. ✗</>,
    reason: <>Oxidation occurs at the anode, reduction at the cathode — in every cell, galvanic or electrolytic. The statement has the right half-reaction at the wrong electrode. Ruled out.</>,
  },
  {
    working: <>D: the energy comes from <b>sunlight</b>, not an external power supply. ✗</>,
    reason: <>That is what distinguishes artificial photosynthesis from electrolysis driven by a power supply. Ruled out.</>,
  },
  {
    working: <b>Water is oxidised (to O₂) and hydrogen gas, H₂, is produced.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b> (23%) describes ordinary electrolysis with a power supply, not the sunlight-driven process. Option <b>B</b> (21%) assumes the products are the same as in natural photosynthesis, which makes glucose rather than H₂. Option <b>C</b> (15%) puts the reduction of H⁺ at the anode instead of the cathode.</>,
  },
]

export default function ChemistryQ18_2025() {
  return (
    <MCQShell
      question={<p>In artificial photosynthesis</p>}
      options={[
        { letter: 'A', content: 'water is oxidised and hydrogen gas, H₂, is produced.', isAnswer: true },
        { letter: 'B', content: 'the same products are produced as in natural photosynthesis.' },
        { letter: 'C', content: 'hydrogen ions, H⁺, are reduced to produce hydrogen gas, H₂, at the anode.' },
        { letter: 'D', content: 'electrical energy from an external power supply is required to oxidise water.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
