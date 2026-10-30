// 2021 Chemistry Exam, MCQ 26. VCAA examination report: 41% correct. Ranking the cell voltages
// of metal half-cells combined with an In³⁺/In half-cell in which In(s) is the negative electrode,
// using the electrochemical series. Question text transcribed from the original paper; the cell
// diagram is cropped from the original VCAA exam PDF. The working uses the 2026 Data Book's E°
// values; the report quotes the older values (Ni²⁺/Ni −0.25 V, Al³⁺/Al −1.66 V, Mg²⁺/Mg
// −2.37 V), so a Data Book note gives both — the answer is unchanged. VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2021-mcq26-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 31, C: 41, D: 9 },
  answer: 'C',
  comment: (
    <>
      According to the electrochemical series:
      <br />
      <Chem eq="Cu2+(aq) + 2e- <=> Cu(s)" /> &nbsp;&nbsp; +0.34 V
      <br />
      <Chem eq="Pb2+(aq) + 2e- <=> Pb(s)" /> &nbsp;&nbsp; −0.13 V
      <br />
      <Chem eq="Ni2+(aq) + 2e- <=> Ni(s)" /> &nbsp;&nbsp; −0.25 V
      <br />
      <Chem eq="In3+(aq) + 3e- <=> In(s)" /> &nbsp;&nbsp; −0.34 V
      <br />
      <Chem eq="Mn2+(aq) + 2e- <=> Mn(s)" /> &nbsp;&nbsp; −1.18 V
      <br />
      <Chem eq="Al3+(aq) + 3e- <=> Al(s)" /> &nbsp;&nbsp; −1.66 V
      <br />
      <Chem eq="Mg2+(aq) + 2e- <=> Mg(s)" /> &nbsp;&nbsp; −2.37 V
      <br />
      If the In³⁺(aq)/In(s) half-cell contains the negative electrode, oxidation must happen in
      the half-cell, so it must be connected to half-cells with higher standard electrode
      potentials (higher on the electrochemical series).
      <br />
      The voltage produced when connected to the In³⁺(aq)/In(s) half-cell will decrease in the
      order:
      <br />
      Cu²⁺(aq)/Cu(s), 0.68 V &gt; Pb²⁺(aq)/Pb(s), 0.21 V &gt; Ni²⁺(aq)/Ni(s), 0.09 V
      <br />
      Selection of Options A or B suggests many students did not understand that the negative
      electrode, the site of oxidation in a galvanic cell, was the In(s) electrode and the
      oxidising agents must be in half-cells higher on the electrochemical series.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>In(s) is the <b>negative electrode</b> → it is the <b>anode</b> → In(s) is <b>oxidised</b>: <Chem eq="In(s) -> In3+(aq) + 3e-" /></>,
    reason: <>In a galvanic cell the negative electrode is where electrons are released, i.e. where oxidation happens (the anode). So In(s) must be the <b>reducing agent</b> in every one of these cells.</>,
  },
  {
    working: <>So the other half-cell must contain the <b>stronger oxidising agent</b>: its metal ion must sit <b>higher</b> on the electrochemical series than In³⁺/In (<i>E</i>° &gt; −0.34 V).</>,
    reason: <>A spontaneous galvanic reaction pairs an oxidising agent (left side) with a reducing agent (right side) <i>below</i> it in the series. If the other metal ion is above In³⁺, it is reduced at the positive electrode (cathode) and In is oxidised — as the question requires.</>,
  },
  {
    working: <>Above In³⁺/In (−0.34 V): Cu²⁺/Cu +0.34 V, Pb²⁺/Pb −0.13 V, Ni²⁺/Ni −0.24 V. Below it: Mn²⁺/Mn −1.18 V, Al³⁺/Al −1.68 V, Mg²⁺/Mg −2.36 V.</>,
    reason: <>
      E° values from the electrochemical series in the Data Book; the In³⁺/In value is given in the question. So options A and B (Mn, Al, Mg) are ruled out at once — with any of those, In³⁺ would be the oxidising agent and In(s) would be the <i>positive</i> electrode.
      <DataBookNote>the 2026 Data Book gives Ni²⁺/Ni −0.24 V, Al³⁺/Al −1.68 V and Mg²⁺/Mg −2.36 V; the Data Book used for the 2021 exam (and the report) gave −0.25 V, −1.66 V and −2.37 V. Only the Ni cell&rsquo;s voltage changes (0.10 V instead of the report&rsquo;s 0.09 V); the order, and the answer, are unchanged.</DataBookNote>
    </>,
  },
  {
    working: <>
      <i>E</i>°<sub>cell</sub> = <i>E</i>°(cathode) − <i>E</i>°(anode)<br />
      Cu: <i>E</i>°<sub>cell</sub> = +0.34 V − (−0.34 V) = 0.68 V<br />
      Pb: <i>E</i>°<sub>cell</sub> = −0.13 V − (−0.34 V) = 0.21 V<br />
      Ni: <i>E</i>°<sub>cell</sub> = −0.24 V − (−0.34 V) = 0.10 V
    </>,
    reason: <>The cell voltage is the gap between the two half-cells on the series: the further above In³⁺/In the oxidising agent sits, the larger the voltage.</>,
  },
  {
    working: <b>Decreasing voltage: Cu²⁺/Cu (0.68 V) &gt; Pb²⁺/Pb (0.21 V) &gt; Ni²⁺/Ni (0.10 V)</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> lists the right three half-cells in <i>increasing</i> order. Options <b>A</b> and <b>B</b> (49% between them) use half-cells below In³⁺/In, where In(s) would be the positive electrode, not the negative one — the misunderstanding the report describes. (B is in decreasing order of voltage for those cells — 2.02, 1.34, 0.84 V — but with In as the cathode; A is in increasing order.)</>,
  },
]

export default function ChemistryQ26_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Different metal ion (aq)/metal (s) half-cells are combined with an In³⁺(aq)/In(s)
            half-cell to create a galvanic cell at SLC, as shown in the diagram below. The equation
            for the In³⁺(aq)/In(s) half-cell is
          </p>
          <p className="mb-3 pl-6">
            <Chem eq="In3+(aq) + 3e- <=> In(s)" /> &nbsp;&nbsp;&nbsp;&nbsp; <i>E</i>⁰ = −0.34 V
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="A galvanic cell: a metal (s) electrode in a metal ion (aq) solution, joined by a salt bridge to an In(s) electrode in In³⁺(aq) solution, with a voltmeter V across the two electrodes — from the original 2021 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which of the following shows the half-cells in decreasing order of voltage produced when
            combined with the In³⁺(aq)/In(s) half-cell and In(s) is the negative electrode?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>Mn²⁺(aq)/Mn(s), Al³⁺(aq)/Al(s), Mg²⁺(aq)/Mg(s)</> },
        { letter: 'B', content: <>Mg²⁺(aq)/Mg(s), Al³⁺(aq)/Al(s), Mn²⁺(aq)/Mn(s)</> },
        { letter: 'C', content: <>Cu²⁺(aq)/Cu(s), Pb²⁺(aq)/Pb(s), Ni²⁺(aq)/Ni(s)</>, isAnswer: true },
        { letter: 'D', content: <>Ni²⁺(aq)/Ni(s), Pb²⁺(aq)/Pb(s), Cu²⁺(aq)/Cu(s)</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
