// 2025 Chemistry Exam, MCQ 1. VCAA examination report: 92% correct. Classifying biomethane and
// natural gas as renewable or not renewable, from how quickly each fuel is replaced. Question text
// transcribed from the original paper (the table of options written as "Column: value" pairs).
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 92, C: 2, D: 1 },
  answer: 'B',
  comment: (
    <>
      Biomethane can be made quickly by anaerobic digestion of plant and animal material and so is
      renewable.
      <br />
      Natural gas is a fossil fuel and therefore is not classified as renewable.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A fuel is <b>renewable</b> if it is replaced by natural processes at least as fast as we use it (within a human timescale). A fuel is <b>not renewable</b> if it took millions of years to form, so it is used up far faster than it can be replaced.</>,
    reason: <>Renewability is about the <i>rate of replacement</i> of the fuel&rsquo;s source, not about what molecule the fuel is. That matters here, because both fuels are mostly the same compound, methane, <Chem eq="CH4" />.</>,
  },
  {
    working: <>Biomethane is made by <b>anaerobic digestion</b> of plant and animal material (biomass) — <b>renewable</b>.</>,
    reason: <>Bacteria break down organic waste (manure, food scraps, crop waste) without oxygen in days to weeks, and new biomass grows every season, so the source is replaced as fast as it is used.</>,
  },
  {
    working: <>Natural gas is a <b>fossil fuel</b> — <b>not renewable</b>.</>,
    reason: <>It formed from ancient organisms buried under heat and pressure over millions of years, so once extracted and burnt it is not replaced on any human timescale.</>,
  },
  {
    working: <b>Biomethane: renewable · Natural gas: not renewable</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> classes natural gas as renewable, but it is a fossil fuel: being the same compound (<Chem eq="CH4" />) as biomethane does not make it renewable — the source decides renewability, not the molecule. Options <b>C</b> and <b>D</b> class biomethane as not renewable, ignoring that its biomass source is replaced within months.</>,
  },
]

export default function ChemistryQ1_2025() {
  return (
    <MCQShell
      question={
        <>Which one of the following correctly identifies the renewability of biomethane and natural gas?</>
      }
      options={[
        { letter: 'A', content: <>Biomethane: renewable · Natural gas: renewable</> },
        { letter: 'B', content: <>Biomethane: renewable · Natural gas: not renewable</>, isAnswer: true },
        { letter: 'C', content: <>Biomethane: not renewable · Natural gas: renewable</> },
        { letter: 'D', content: <>Biomethane: not renewable · Natural gas: not renewable</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
