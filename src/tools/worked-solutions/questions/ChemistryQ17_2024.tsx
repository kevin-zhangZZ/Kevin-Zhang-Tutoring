// 2024 Chemistry Exam, MCQ 17. VCAA examination report: 38% correct. What actually happens
// during electrorefining of impure ("blister") copper, by elimination against genuine
// electrolytic-cell chemistry. Question text transcribed from the original paper (rendered from
// page images — the 2024 exam PDF has no extractable text). Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 27, C: 15, D: 38 },
  answer: 'D',
  comment: (
    <>
      When either iron or nickel metals present in the blister of copper preferentially undergo
      oxidation, then Cu²⁺ ions in solution will have to undergo reduction at the cathode.
      Therefore, with the loss of Cu²⁺ ions from the solution, the concentration of the Cu²⁺ ions in
      the electrolyte will decrease.
      <br />
      The blister of copper will need to be the anode.
      <br />
      The pure copper is held in place until the blister of copper is totally reacted.
      <br />
      Students were unable to consistently answer this question correctly about the practical
      aspects of the process of purifying a metal through electrowinning.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Electrorefining copper works by making the <b>impure</b> blister copper the anode (oxidised, dissolving into solution as Cu²⁺) and a strip of <b>pure</b> copper the cathode (where Cu²⁺ is reduced and deposits as pure metal).</>,
    reason: <>Sets up the basic cell arrangement every option has to be checked against.</>,
  },
  {
    working: <>A: if blister copper were the cathode, it would be the electrode where reduction (deposition) happens — but the whole point is to dissolve the impure copper away, which requires it to be oxidised at the <b>anode</b>, not the cathode.</>,
    reason: <>Backwards — blister copper must be the anode. Ruled out.</>,
  },
  {
    working: <>B: iron and nickel impurities in the blister copper are stronger reducing agents than copper, so they are oxidised at the anode and enter the solution as Fe²⁺ and Ni²⁺ ions — they dissolve, they don't fall as solid metal. It is silver, a weaker reducing agent than copper, that is not oxidised and falls to the bottom as the anode dissolves.</>,
    reason: <>Iron goes into solution, not to the bottom as a solid. Ruled out.</>,
  },
  {
    working: <>C: the pure copper product builds up on the cathode as a solid coating over time — it's collected once electrolysis is complete, not continuously "removed as it forms" during the process.</>,
    reason: <>The report: the pure copper is held in place until the blister copper has all reacted. Ruled out.</>,
  },
  {
    working: <>D: since Fe and Ni oxidise preferentially at the anode instead of Cu, less Cu²⁺ enters solution from the anode than is removed by deposition at the cathode — so the Cu²⁺ concentration in the electrolyte genuinely does change (decrease) as electrolysis proceeds.</>,
    reason: <>A consequence of the impurities present.</>,
  },
  {
    working: <b>The Cu²⁺ concentration in the electrolyte changes — it decreases.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, chosen by 27%, has iron falling to the bottom; it is the less reactive silver that does. (The report&rsquo;s comment calls the process &ldquo;electrowinning&rdquo;; purifying blister copper this way is electrorefining.)</>,
  },
]

export default function ChemistryQ17_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A piece of blister copper contains 98.5% copper. The blister copper also contains
            other metals, including silver, iron and nickel. Electrolysis in an aqueous solution
            of Cu²⁺ ions is used to produce 99.99% pure copper from the blister copper.
          </p>
          <p>In the electrolysis of the blister copper</p>
        </>
      }
      options={[
        { letter: 'A', content: 'blister copper is used as the cathode.' },
        { letter: 'B', content: 'solid iron falls to the bottom of the electrolysis cell.' },
        { letter: 'C', content: 'the 99.99% pure copper product should be removed as it forms.' },
        { letter: 'D', content: 'the concentration of Cu²⁺ ions in the electrolyte changes during the electrolysis.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
