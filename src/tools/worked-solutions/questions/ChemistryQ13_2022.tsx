// 2022 Chemistry Exam, MCQ 13. VCAA examination report: 29% correct — the hardest MCQ on this
// paper. Which electrolyte produces a gas at the cathode, found by identifying the strongest
// oxidising agent present in each. Question text transcribed from the original paper. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 39, C: 10, D: 21 },
  answer: 'A',
  comment: (
    <>
      The product at the cathode is produced by the reduction of the strongest oxidising agent
      present.
      <br />
      In this instance, the product of that reduction must be a gas.
      <br />
      KI(aq) – oxidants present are K⁺(aq) and H₂O(l).
      <br />
      According to the electrochemical series, the stronger oxidant is H₂O(l), which will be reduced
      according to:
      <br />
      <Chem eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" />.
      <br />
      NaCl(l) – oxidant present is Na⁺(l), which would be reduced to Na(l).
      <br />
      PbBr₂(l) – oxidant present is Pb²⁺(l), which would be reduced to Pb(s).
      <br />
      CuSO₄(aq) – oxidants present are Cu²⁺(aq) and H₂O(l).
      <br />
      The stronger oxidant Cu²⁺(aq) would be reduced to Cu(s).
      <br />
      Knowledge that oxidants are reduced at the cathode and the effective use of the
      electrochemical series are expected.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>At an inert Pt cathode, the species that gets reduced is whichever <b>oxidising agent present is strongest</b> — so identify all the possible oxidants in each electrolyte first.</>,
    reason: <>Reduction always happens at the cathode (&ldquo;<b>R</b>ed <b>Cat</b>&rdquo;). The strongest oxidant is the one <b>highest</b> on the left of the electrochemical series (largest <i>E</i>°). In an <b>aqueous</b> solution water is also a possible oxidant; a <b>molten</b> salt (l) contains no water at all.</>,
  },
  {
    working: <>A: KI(aq) — oxidants present are K⁺(aq) (<i>E</i>° = −2.94 V) and H₂O(l) (<i>E</i>° = −0.83 V). H₂O is higher in the series, so <b>H₂O</b> is reduced:<br /><Chem eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" /></>,
    reason: <>Produces <b>H₂ gas</b> at the cathode. E° values from the Data Book&rsquo;s electrochemical series. (I⁻ is a reductant, not an oxidant — it is oxidised to I₂ at the anode.)</>,
  },
  {
    working: <>B: NaCl(l) (molten) — the only oxidant present is Na⁺(l), reduced to Na(l), a liquid metal.</>,
    reason: <>No gas produced. Ruled out.</>,
  },
  {
    working: <>C: PbBr₂(l) (molten) — the only oxidant present is Pb²⁺(l), reduced to Pb(s), a solid metal.</>,
    reason: <>No gas produced. Ruled out.</>,
  },
  {
    working: <>D: CuSO₄(aq) — oxidants present are Cu²⁺(aq) (<i>E</i>° = +0.34 V) and H₂O(l) (<i>E</i>° = −0.83 V). Cu²⁺ is the stronger oxidant, so it&rsquo;s reduced instead:<br /><Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /></>,
    reason: <>Produces solid copper, not a gas. (A gas, O₂, does form in this cell — but at the <b>anode</b>, where water is oxidised.) Ruled out.</>,
  },
  {
    working: <b>Only KI(aq) forces water to be reduced at the cathode, releasing H₂ gas.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, the most popular answer, does produce a gas, but Cl₂ forms at the <b>anode</b> (oxidation of Cl⁻); at the cathode molten NaCl gives liquid sodium. The question asks specifically about the cathode, so check which electrode each product forms at.</>,
  },
]

export default function ChemistryQ13_2022() {
  return (
    <MCQShell
      question={
        <p>
          An electrolysis cell is set up with inert platinum, Pt, electrodes.
          <br />
          Which one of the following will produce a gas at the cathode when undergoing
          electrolysis in the cell?
        </p>
      }
      options={[
        { letter: 'A', content: 'potassium iodide, KI(aq)', isAnswer: true },
        { letter: 'B', content: 'sodium chloride, NaCl(l)' },
        { letter: 'C', content: 'lead bromide, PbBr₂(l)' },
        { letter: 'D', content: 'copper sulfate, CuSO₄(aq)' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
