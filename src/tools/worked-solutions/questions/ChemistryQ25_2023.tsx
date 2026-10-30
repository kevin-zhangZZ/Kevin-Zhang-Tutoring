// 2023 Chemistry Exam, MCQ 25. VCAA examination report: 44% correct. The lead-acid accumulator
// discharging (galvanic) and recharging (electrolytic): which half-equation runs at which electrode,
// and where H⁺ and HSO₄⁻ react or are produced. Question text transcribed from the original paper;
// the table of options is written out as text. VCAA report only (no second source). Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 28, B: 16, C: 44, D: 11 },
  answer: 'C',
  comment: (
    <>
      Galvanic cell: discharge
      <br />
      Anode (−)
      <br />
      <Chem eq="Pb(s) + HSO₄⁻(aq) -> PbSO4(s) + H+(aq) + 2e-" />
      <br />
      Cathode (+)
      <br />
      <Chem eq="PbO2(s) + HSO₄⁻(aq) + 3H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)" />
      <br />
      <br />
      Electrolytic cell: recharge
      <br />
      Anode (+)
      <br />
      <Chem eq="PbSO4(s) + 2H2O(l) -> PbO2(s) + HSO₄⁻(aq) + 3H+(aq) + 2e-" />
      <br />
      Cathode (−)
      <br />
      <Chem eq="PbSO4(s) + H+(aq) + 2e- -> Pb(s) + HSO₄⁻(aq)" />
      <br />
      H⁺ ions react at the cathode in the galvanic cell.
      <br />
      HSO₄⁻ ions are produced at both electrodes in the electrolytic cell.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Galvanic (discharging): the half-equation with the <b>higher E°</b> (PbO₂, +1.69 V) runs <b>forward as reduction</b> at the cathode; the one with the <b>lower E°</b> (PbSO₄/Pb, −0.36 V) runs <b>in reverse as oxidation</b> at the anode.</>,
    reason: <>In a galvanic cell the strongest oxidant (top left of the series, here PbO₂) reacts with the strongest reductant (bottom right, here Pb). The E° values are given in the question.</>,
  },
  {
    working: (
      <>
        Galvanic anode (−), oxidation:
        <br />
        <Chem eq="Pb(s) + HSO₄⁻(aq) -> PbSO4(s) + H+(aq) + 2e-" />
        <br />
        Galvanic cathode (+), reduction:
        <br />
        <Chem eq="PbO2(s) + HSO₄⁻(aq) + 3H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)" />
      </>
    ),
    reason: <>Reverse the first given half-equation for the anode. Now look for H⁺: it is a <b>product</b> at the anode and a <b>reactant</b> at the cathode — so in the galvanic cell, H⁺ ions <b>react at the cathode</b>. (HSO₄⁻ is a reactant at both electrodes while discharging.)</>,
  },
  {
    working: (
      <>
        Electrolytic (recharging): both reactions are reversed.
        <br />
        Electrolytic anode (+), oxidation:
        <br />
        <Chem eq="PbSO4(s) + 2H2O(l) -> PbO2(s) + HSO₄⁻(aq) + 3H+(aq) + 2e-" />
        <br />
        Electrolytic cathode (−), reduction:
        <br />
        <Chem eq="PbSO4(s) + H+(aq) + 2e- -> Pb(s) + HSO₄⁻(aq)" />
      </>
    ),
    reason: <>Recharging uses an external power supply to force the discharge reactions backwards and regenerate Pb and PbO₂. In both reversed equations HSO₄⁻ appears on the <b>product</b> side, so HSO₄⁻ ions are <b>produced at both electrodes</b>. (Note the electrode names swap: the PbO₂ electrode is the cathode when discharging but the anode when recharging — it stays the positive terminal throughout.)</>,
  },
  {
    working: <b>Galvanic: H⁺ ions react at the cathode · Electrolytic: HSO₄⁻ ions are produced at both electrodes</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b>, chosen by 28%, has the galvanic column right but uses the discharge equations for the electrolytic cell too — HSO₄⁻ reacts at both electrodes only while discharging. Options <b>B</b> and <b>D</b> put H⁺ reacting at the galvanic anode, where it is actually produced.</>,
  },
]

export default function ChemistryQ25_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Below are the half-equations for the lead-acid accumulator cell. The lead-acid
            accumulator cell can operate as an electrolytic cell.
          </p>
          <div className="mb-3 overflow-x-auto">
            <table className="text-[14px]">
              <tbody>
                <tr>
                  <td className="pr-6 py-0.5"><Chem eq="PbSO4(s) + H+(aq) + 2e- -> Pb(s) + HSO₄⁻(aq)" /></td>
                  <td className="py-0.5 whitespace-nowrap"><i>E</i>⁰ = −0.36 V</td>
                </tr>
                <tr>
                  <td className="pr-6 py-0.5"><Chem eq="PbO2(s) + HSO₄⁻(aq) + 3H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)" /></td>
                  <td className="py-0.5 whitespace-nowrap"><i>E</i>⁰ = 1.69 V</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Which one of the following correctly describes the lead-acid accumulator cell when it is
            operating as a galvanic cell and when it is operating as an electrolytic cell?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>Galvanic cell: H⁺ ions react at the cathode. · Electrolytic cell: HSO₄⁻ ions react at both electrodes.</> },
        { letter: 'B', content: <>Galvanic cell: H⁺ ions react at the anode. · Electrolytic cell: HSO₄⁻ ions react at both electrodes.</> },
        { letter: 'C', content: <>Galvanic cell: H⁺ ions react at the cathode. · Electrolytic cell: HSO₄⁻ ions are produced at both electrodes.</>, isAnswer: true },
        { letter: 'D', content: <>Galvanic cell: H⁺ ions react at the anode. · Electrolytic cell: HSO₄⁻ ions are produced at both electrodes.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
