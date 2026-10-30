// 2024 Chemistry Exam, MCQ 8. VCAA examination report: 51% correct. Two statements about hydrogen
// fuel cells: whether porous electrodes reduce efficiency, and whether a higher ratio of hydrogen
// supplied to electricity produced means higher efficiency. Question text transcribed from the
// original paper (rendered from page images — the 2024 exam PDF has no extractable text). VCAA
// report only. The report's comment is kept verbatim; its last sentence (about half-equations in
// basic media) does not fit this question and appears to belong with MCQ 9 — the final row says
// so. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 40, C: 5, D: 51 },
  answer: 'D',
  comment: (
    <>
      Porous electrodes improve the cell efficiency.
      <br />
      As the efficiency increases there is no effect on the ratio of H₂ supplied and electrical
      energy, because as the hydrogen is increased, the limiting reagent (oxygen) gas dictates the
      electrical energy released.
      <br />
      Some students did not establish the relevant half-equation using basic media.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Statement I: porous electrodes have a large surface area where the gas, electrolyte and
        electrode meet, so the reaction is faster and more of the fuel is converted to electricity.
        Porous electrodes <b>increase</b> efficiency. <b>I is false.</b>
      </>
    ),
    reason: (
      <>
        Study design: fuel cells use &ldquo;porous electrodes for gaseous reactants to increase cell
        efficiency&rdquo;. The gases diffuse into the pores, giving many more sites where H₂ and O₂
        can react at the electrode surface.
      </>
    ),
  },
  {
    working: (
      <>
        Efficiency = (electrical energy produced ÷ chemical energy of the H₂ supplied) × 100%
      </>
    ),
    reason: (
      <>
        Energy efficiency compares useful energy <i>out</i> (electricity) with energy <i>in</i>{' '}
        (the hydrogen fuel). Statement II talks about the ratio the other way up: hydrogen in ÷
        electricity out.
      </>
    ),
  },
  {
    working: (
      <>
        Statement II: a larger ratio of H₂ supplied : electricity produced means more H₂ is used for
        each unit of electricity, so efficiency <b>decreases</b>. <b>II is false.</b>
      </>
    ),
    reason: (
      <>
        The ratio in statement II is the inverse of efficiency, so when it goes up, efficiency goes
        down. Example: needing 2 mol of H₂ instead of 1 mol for the same electrical energy halves the
        efficiency.
      </>
    ),
  },
  {
    working: <b>Neither I nor II is correct.</b>,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>B</b>, chosen by 40%, accepts statement II, which would
        only be true with the ratio the other way round (electricity produced per amount of hydrogen
        supplied). The report&rsquo;s second paragraph makes a related point: extra hydrogen does not
        give extra electrical energy when oxygen is the limiting reactant, so the extra hydrogen is
        wasted. Its last sentence, about half-equations in basic media, does not apply here (no
        half-equation is needed); it appears to belong with Question 9.
      </>
    ),
  },
]

export default function ChemistryQ8_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements about hydrogen fuel cells.</p>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 mb-2 pl-2">
            <span>I</span>
            <span>The use of porous electrodes reduces cell efficiency.</span>
            <span>II</span>
            <span>As the ratio of the amount of hydrogen supplied to the amount of electricity
              produced increases, the efficiency increases.
            </span>
          </div>
          <p>Which of the statements about hydrogen fuel cells is/are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only' },
        { letter: 'B', content: 'II only' },
        { letter: 'C', content: 'both I and II' },
        { letter: 'D', content: 'neither I nor II', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
