// 2020 Chemistry Exam, MCQ 6. VCAA examination report: 64% correct. Comparing electrolysis
// (electrolytic) cells and galvanic cells: energy conversion, electrode materials, the effect of
// electrolyte concentration, and what decides the products. Question text transcribed from the
// original paper (table-style options written as "Electrolysis cell: … · Galvanic cell: …"); the
// report's ticked/crossed table is cropped from the original VCAA examination report PDF.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportTableSrc from './chem-2020-mcq6-report-table.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 20, C: 12, D: 64 },
  answer: 'D',
  comment: (
    <>
      <img loading="lazy" decoding="async" src={reportTableSrc} alt="The report's copy of the options table, with each statement ticked or crossed: A — both statements crossed; B — electrolysis statement ticked, galvanic statement crossed; C — electrolysis statement crossed, galvanic statement ticked; D — both statements ticked" className="w-full max-w-[460px] mt-1 bg-white rounded" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Electrolysis cell: <b>electrical energy → chemical energy</b>.<br />Galvanic cell: <b>chemical energy → electrical energy</b>.</>,
    reason: <>The defining difference. A galvanic cell runs a spontaneous redox reaction and releases its chemical energy as electricity; an electrolysis cell uses an external power supply to drive a non-spontaneous reaction, storing electrical energy as chemical energy. Each pair has one statement for each cell, and <b>both</b> statements in the pair must be true.</>,
  },
  {
    working: <>A — Electrolysis: &ldquo;both electrodes are always inert&rdquo; ✗. Galvanic: &ldquo;both electrodes are always made of metal&rdquo; ✗.</>,
    reason: <>Electrolysis electrodes can be reactive — in copper refining or electroplating the copper anode is itself oxidised (<Chem eq="Cu(s) -> Cu2+(aq) + 2e-" />). Galvanic electrodes need not be metal — graphite (carbon) is common, and a half-cell in which neither reacting species is a solid metal (<Chem eq="Fe3+/Fe2+" />, <Chem eq="O2/H2O" />) uses an inert graphite or platinum electrode. The word &ldquo;always&rdquo; makes both statements false.</>,
  },
  {
    working: <>B — Electrolysis: &ldquo;electrical → chemical&rdquo; ✓. Galvanic: &ldquo;voltage independent of electrolyte concentration&rdquo; ✗.</>,
    reason: <>The Data Book&rsquo;s <i>E</i>° values (and the cell voltages predicted from them) apply only under standard conditions: 1 M solutions, 25 °C, 100 kPa. Change the concentration of the electrolyte and the measured cell voltage changes, so the galvanic statement is false.</>,
  },
  {
    working: <>C — Electrolysis: &ldquo;chemical → electrical&rdquo; ✗. Galvanic: &ldquo;products dependent on the half-cell components&rdquo; ✓.</>,
    reason: <>The electrolysis statement describes a galvanic cell — the energy conversion is reversed.</>,
  },
  {
    working: <>D — Electrolysis: &ldquo;products dependent on the half-cell components&rdquo; ✓. Galvanic: &ldquo;chemical → electrical&rdquo; ✓.</>,
    reason: <>In any cell, the products depend on which oxidising and reducing agents are present (the electrode material, the electrolyte, whether water is present). For example, electrolysing molten NaCl gives Na(l) at the cathode, but electrolysing aqueous NaCl gives H₂(g) there instead, because water is a stronger oxidising agent than Na⁺. The galvanic statement is the definition from the first row.</>,
  },
  {
    working: <b>Both statements are true only in D.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> has the correct electrolysis statement but forgets that cell voltage depends on concentration (<i>E</i>° values are for 1 M solutions only). Option <b>C</b> reverses the energy conversion of an electrolysis cell. Option <b>A</b> fails on &ldquo;always&rdquo; in both cells.</>,
  },
]

export default function ChemistryQ6_2020() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following pairs of statements is correct for both electrolysis cells and
          galvanic cells?
        </p>
      }
      options={[
        { letter: 'A', content: <>Electrolysis cell: Both electrodes are always inert. · Galvanic cell: Both electrodes are always made of metal.</> },
        { letter: 'B', content: <>Electrolysis cell: Electrical energy is converted to chemical energy. · Galvanic cell: The voltage of the cell is independent of the electrolyte concentration.</> },
        { letter: 'C', content: <>Electrolysis cell: Chemical energy is converted to electrical energy. · Galvanic cell: The products are dependent on the half-cell components.</> },
        { letter: 'D', content: <>Electrolysis cell: The products are dependent on the half-cell components. · Galvanic cell: Chemical energy is converted to electrical energy.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
