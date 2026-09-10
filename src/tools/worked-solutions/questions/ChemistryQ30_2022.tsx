// 2022 Chemistry Exam, MCQ 30. VCAA examination report: 34% correct. Ranking four unfamiliar
// half-cells by oxidising strength using only given reactivity clues, then picking the pairing
// that produces the largest cell voltage. Question text transcribed from the original paper.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 24, C: 23, D: 18 },
  answer: 'A',
  comment: (
    <>
      I₂ is below the oxidising agents BrO₃⁻ and HBrO but above HCrO₄⁻; Br⁻ is below the
      oxidising agent HBrO but above IO₃⁻. So the order (strongest to weakest oxidising agent) is
      HBrO/Br₂, BrO₃⁻/Br⁻, IO₃⁻/I₂, HCrO₄⁻/Cr³⁺.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>"I₂ reacts with BrO₃⁻ and HBrO but not with HCrO₄⁻" — I₂ is oxidised by BrO₃⁻ and HBrO, but not by HCrO₄⁻.</>,
    reason: <>So <Chem eq="BrO3-" /> and <Chem eq="HBrO" /> sit <b>above</b> the <Chem eq="IO3-/I2" /> half-cell, and <Chem eq="HCrO4-" /> sits <b>below</b> it, in oxidising strength.</>,
  },
  {
    working: <>"Br⁻ reacts with HBrO but not with IO₃⁻" — Br⁻ is oxidised by HBrO, but not by IO₃⁻.</>,
    reason: <>So <Chem eq="HBrO" /> sits <b>above</b> the <Chem eq="BrO3-/Br-" /> half-cell, and <Chem eq="IO3-" /> is too weak to oxidise <Chem eq="Br-" /> — meaning <Chem eq="BrO3-/Br-" /> sits <b>above</b> <Chem eq="IO3-/I2" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>1. HBrO(aq)/Br₂(aq) — strongest oxidising agent</span>
        <span>2. BrO₃⁻(aq)/Br⁻(aq)</span>
        <span>3. IO₃⁻(aq)/I₂(aq)</span>
        <span>4. HCrO₄⁻(aq)/Cr³⁺(aq) — weakest oxidising agent</span>
      </div>
    ),
    reason: 'Combining both clues gives a complete ranking, from strongest to weakest oxidising agent.',
  },
  {
    working: <>The largest cell voltage comes from pairing the <b>strongest oxidising agent</b> with the <b>strongest reducing agent</b> — i.e. the half-cell at the very top with the half-cell at the very bottom of the ranking.</>,
    reason: 'Standard principle for maximising cell voltage.',
  },
  {
    working: <b>HBrO(aq)/Br₂(aq) paired with HCrO₄⁻(aq)/Cr³⁺(aq) spans the widest gap in oxidising strength.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ30_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the following half-equations, which are <b>not</b> in standard electrode
            potential order:
          </p>
          <div className="flex flex-col gap-1 mb-2">
            <Chem eq="HCrO4-(aq) + 7H+(aq) + 3e- -> Cr3+(aq) + 4H2O(l)" className="text-[13px]" />
            <Chem eq="HBrO(aq) + H+(aq) + e- -> 1/2 Br2(aq) + H2O(l)" className="text-[13px]" />
            <Chem eq="2IO3-(aq) + 12H+(aq) + 10e- -> I2(aq) + 6H2O(l)" className="text-[13px]" />
            <Chem eq="BrO3-(aq) + 6H+(aq) + 6e- -> Br-(aq) + 3H2O(l)" className="text-[13px]" />
          </div>
          <p className="mb-2">
            It is also known that I₂ reacts with BrO₃⁻ and HBrO but not with HCrO₄⁻; and Br⁻
            reacts with HBrO but not with IO₃⁻. Platinum electrodes were used in each half-cell.
          </p>
          <p>Which one of the following galvanic cells will produce the highest potential difference?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'HBrO(aq)/Br₂(aq) ‖ HCrO₄⁻(aq)/Cr³⁺(aq)', isAnswer: true },
        { letter: 'B', content: 'HCrO₄⁻(aq)/Cr³⁺(aq) ‖ BrO₃⁻(aq)/Br⁻(aq)' },
        { letter: 'C', content: 'BrO₃⁻(aq)/Br⁻(aq) ‖ IO₃⁻(aq)/I₂(aq)' },
        { letter: 'D', content: 'HBrO(aq)/Br₂(aq) ‖ IO₃⁻(aq)/I₂(aq)' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
