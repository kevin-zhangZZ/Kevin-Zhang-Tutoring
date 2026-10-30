// 2021 Chemistry Exam, MCQ 29. VCAA examination report: 48% correct. Two connected cells
// (Zn/Cu and Cu/Ni): using the given electron flow to decide that Cell 1 is galvanic and drives
// electrolysis in Cell 2, and so the energy transformation in each. Question text transcribed
// from the original paper; the two-cell diagram is cropped from the original VCAA exam PDF, and
// the report's annotated copy of it from the report PDF. The report's comment has two slips —
// "postive", and "E − E°(Cu²⁺/Cu)" where E°(Zn²⁺/Zn) is meant in the Cell 1 line — kept
// verbatim and explained in the working. The report's Ni²⁺/Ni value (−0.25 V) is −0.24 V in the
// 2026 Data Book (a Data Book note says so; the answer is unchanged). VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellsSrc from './chem-2021-mcq29-cells.png'
import reportGraphSrc from './chem-2021-mcq29-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 36, B: 10, C: 48, D: 6 },
  answer: 'C',
  comment: (
    <>
      When galvanic cells are connected in series, the postive electrode in one cell is
      connected to the positive electrode in the second cell, likewise the negative
      <img loading="lazy" decoding="async"
        src={reportGraphSrc}
        alt="The report's copy of the two-cell diagram, annotated: Zn is marked −, both Cu electrodes +, Ni −, and an arrow on the Cu–Cu wire points from Cell 2 towards Cell 1"
        className="w-full max-w-[360px] mt-1"
      />
      electrodes.
      <br />
      Electrons flow from the site of oxidation to the site of reduction through the connection
      wires.
      <br />
      Cell 1 – oxidation at the (−) electrode and reduction at the (+) electrode
      <br />
      Cell 2 – oxidation at the (+) electrode and reduction at the (−) electrode
      <br />
      Hence energy transformations:
      <br />
      Cell 1: chemical → electrical
      <br />
      Cell 2: electrical → chemical
      <br />
      This is consistent with the voltages of the two cells under standard conditions.
      <br />
      Cell 1: <i>E</i> &nbsp;= <i>E</i>°(Cu²⁺/Cu) − <i>E</i> − <i>E</i>°(Cu²⁺/Cu)
      <br />
      <span className="pl-10">= 0.34 V – (−0.76) V</span>
      <br />
      <span className="pl-10">= 1.10 V</span>
      <br />
      Cell 2: <i>E</i> &nbsp;= <i>E</i>°(Cu²⁺/Cu) − <i>E</i> − <i>E</i>°(Ni²⁺/Ni)
      <br />
      <span className="pl-10">= 0.34 V – (−0.25) V</span>
      <br />
      <span className="pl-10">= 0.59 V</span>
      <br />
      Higher voltage Cell 1 forces electrolysis to occur in Cell 2.
      <br />
      Half-equations:
      <br />
      Cell 1: (−) <Chem eq="Zn(s) -> Zn2+(aq) + 2e-" />; (+) <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />
      <br />
      Cell 2: (−) <Chem eq="Ni2+(aq) + 2e- -> Ni(s)" />; (+) <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Cell 1: electrons leave the <b>Zn</b> electrode → Zn is <b>oxidised</b> (anode, −):<br /><Chem eq="Zn(s) -> Zn2+(aq) + 2e-" /><br />Cu²⁺ is <b>reduced</b> at the Cu electrode (cathode, +):<br /><Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /></>,
    reason: <>Read the arrows: electrons flow out of the electrode where oxidation happens. Zn²⁺/Zn (−0.76 V) is below Cu²⁺/Cu (+0.34 V) on the electrochemical series, so this is the spontaneous direction — Cell 1 is a <b>galvanic</b> cell.</>,
  },
  {
    working: <>Cell 2: electrons arrive at the <b>Ni</b> electrode → Ni²⁺ is <b>reduced</b>:<br /><Chem eq="Ni2+(aq) + 2e- -> Ni(s)" /><br />Cu in Cell 2 is <b>oxidised</b> (it supplies the electrons that flow to Cell 1&rsquo;s Cu):<br /><Chem eq="Cu(s) -> Cu2+(aq) + 2e-" /></>,
    reason: <>Electrons come out of Zn and enter Ni, so the circuit carries them Cell 1 Zn → Cell 2 Ni, and back through the Cu–Cu wire from Cell 2 to Cell 1. In Cell 2 the stronger oxidising agent Cu²⁺ (+0.34 V) is left alone while the weaker one, Ni²⁺ (−0.24 V), is reduced — that is the <b>non-spontaneous</b> direction.</>,
  },
  {
    working: <>
      <i>E</i>°<sub>cell</sub> = <i>E</i>°(cathode) − <i>E</i>°(anode)<br />
      Cell 1: <i>E</i>° = +0.34 V − (−0.76 V) = 1.10 V<br />
      Cell 2 (if it ran spontaneously): <i>E</i>° = +0.34 V − (−0.24 V) = 0.58 V<br />
      1.10 V &gt; 0.58 V, so Cell 1 wins.
    </>,
    reason: <>
      E° values from the electrochemical series in the Data Book. The two cells are wired positive-to-positive (Cu to Cu), so they push current in opposite directions; the higher-voltage Cell 1 wins and forces Cell 2 to run backwards — <b>electrolysis</b>. (The report&rsquo;s lines &ldquo;<i>E</i>°(Cu²⁺/Cu) − <i>E</i> − <i>E</i>°(Cu²⁺/Cu)&rdquo; contain a stray &ldquo;− <i>E</i>&rdquo;, and Cell 1&rsquo;s second term should be <i>E</i>°(Zn²⁺/Zn); its substitution, 0.34 V − (−0.76) V, is correct.)
      <DataBookNote>the 2026 Data Book gives −0.24 V for Ni²⁺/Ni; the Data Book used for the 2021 exam gave −0.25 V, which is why the report has 0.59 V rather than 0.58 V. The answer is unchanged.</DataBookNote>
    </>,
  },
  {
    working: <>Cell 1 (galvanic): <b>chemical → electrical</b><br />Cell 2 (electrolytic): <b>electrical → chemical</b></>,
    reason: <>A galvanic cell converts the chemical energy of a spontaneous reaction into electrical energy; an electrolytic cell uses electrical energy (here supplied by Cell 1) to drive a non-spontaneous reaction, storing it as chemical energy.</>,
  },
  {
    working: <b>Cell 1: chemical → electrical · Cell 2: electrical → chemical</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> (36%) treats both cells as galvanic — but electrons enter Cell 2 at Ni, so Ni²⁺ is being reduced in Cell 2 even though Cu²⁺ is the stronger oxidising agent; that can only be forced. Options <b>B</b> and <b>D</b> make Cell 1 electrolytic, but nothing supplies power to it, and its reaction (Zn reducing Cu²⁺) is spontaneous.</>,
  },
]

export default function ChemistryQ29_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The following diagram shows two connected electrochemical cells.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellsSrc}
              alt="Cell 1: a Zn electrode in Zn²⁺(aq) and a Cu electrode in Cu²⁺(aq) joined by a salt bridge. Cell 2: a Cu electrode in Cu²⁺(aq) and a Ni electrode in Ni²⁺(aq) joined by a salt bridge. A wire joins the two Cu electrodes; another wire runs from Zn to Ni, with arrows labelled electron flow pointing from Zn to Ni — from the original 2021 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p>Which of the following gives the energy transformations that occur in Cell 1 and in Cell 2?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Cell 1: chemical → electrical · Cell 2: chemical → electrical' },
        { letter: 'B', content: 'Cell 1: electrical → chemical · Cell 2: chemical → electrical' },
        { letter: 'C', content: 'Cell 1: chemical → electrical · Cell 2: electrical → chemical', isAnswer: true },
        { letter: 'D', content: 'Cell 1: electrical → chemical · Cell 2: electrical → chemical' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
