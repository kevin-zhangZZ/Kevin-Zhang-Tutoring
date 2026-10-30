// 2023 Chemistry Exam, MCQ 4. VCAA examination report: 79% correct. What makes a cell a secondary
// (rechargeable) cell: it discharges as a galvanic cell and is recharged as an electrolytic cell.
// Question text transcribed from the original paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 2, C: 5, D: 79 },
  answer: 'D',
  comment: (
    <>
      The polarity of the physical electrodes does not change.
      <br />
      The positive electrode remains positive in both galvanic and electrolytic cells. However, the
      process at that electrode changes – from reduction in a galvanic cell to oxidation in an
      electrolytic cell – due to the change in the direction of electron flow.
      <br />
      A cell is classified as a secondary cell if it operates as both a galvanic and electrolytic
      cell. Secondary cells have all reactants contained within the cells.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A <b>secondary cell</b> is a <b>rechargeable</b> cell: it <b>discharges</b> as a <b>galvanic</b> cell and is <b>recharged</b> as an <b>electrolytic</b> cell.</>,
    reason: <>Definition (study design: discharging as a galvanic cell, recharging as an electrolytic cell). On discharge the spontaneous reaction converts chemical energy into electrical energy. To recharge, an external power supply drives the reverse, non-spontaneous reaction, regenerating the original reactants — possible because the products stay in contact with the electrodes.</>,
  },
  {
    working: <>D — &ldquo;operates as both a galvanic and electrolytic cell&rdquo; is exactly this definition. ✓</>,
    reason: <>This is the defining test, so D is the answer.</>,
  },
  {
    working: <>A — a continuous supply of reactants describes a <b>fuel cell</b>. ✗</>,
    reason: <>A fuel cell is a galvanic cell whose reactants are fed in from outside as they are used. A secondary cell is the opposite: all its reactants are <b>contained within</b> the cell (the report&rsquo;s last sentence), and it is restored by recharging, not by refilling.</>,
  },
  {
    working: <>B — operating at different temperatures has nothing to do with being rechargeable. ✗</>,
    reason: <>Any cell can run at a range of temperatures (its rate changes); that does not decide whether its reaction can be reversed.</>,
  },
  {
    working: <>C — the electrode polarity does stay the same, but that is <b>not what makes</b> a cell secondary. ✗</>,
    reason: <>On recharge, the cell&rsquo;s positive electrode is connected to the positive terminal of the power supply, so it stays positive — but its role changes from <b>cathode</b> (reduction, on discharge) to <b>anode</b> (oxidation, on recharge). A primary (non-rechargeable) cell also keeps its polarity, so an unchanged polarity cannot be the test for a secondary cell.</>,
  },
  {
    working: <b>It can operate as both a galvanic and electrolytic cell.</b>,
    reason: <>Matches option <b>D</b>. Option <b>A</b> (14%) describes a fuel cell — continuously supplied with reactants — rather than a rechargeable cell. Option <b>C</b> states something true of secondary cells, but true of primary cells as well, so it doesn&rsquo;t identify one.</>,
  },
]

export default function ChemistryQ4_2023() {
  return (
    <MCQShell
      question={<p>A cell can be considered a secondary cell if</p>}
      options={[
        { letter: 'A', content: 'it has a continuous supply of reactants.' },
        { letter: 'B', content: 'it can operate at different temperatures.' },
        { letter: 'C', content: 'the polarity of the electrodes remains unchanged.' },
        { letter: 'D', content: 'it can operate as both a galvanic and electrolytic cell.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
