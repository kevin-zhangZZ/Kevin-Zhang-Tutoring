// 2024 Chemistry Exam, MCQ 4. VCAA examination report: 49% correct. Identifying the oxidising
// agent and writing a conjugate redox pair in the form oxidising agent/reducing agent for the
// dichromate–iodide reaction. Question text transcribed from the original paper (rendered from
// page images — the 2024 exam PDF has no extractable text); the options table is written as
// text. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 30, C: 13, D: 8 },
  answer: 'A',
  comment: (
    <>
      The <Chem eq="Cr₂O₇²⁻" /> is the oxidising agent and this is shown as it undergoes reduction
      to form <Chem eq="Cr3+" />.
      <br />
      The correct conjugate redox pair for this reaction has to be <Chem eq="I2" /> / <Chem eq="I-" /> as
      the pair <Chem eq="I-" /> / <Chem eq="I2" /> shows the incorrect representation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Cr: in <Chem eq="Cr₂O₇²⁻" />, 2<i>x</i> + 7(−2) = −2, so <i>x</i> = +6<br />Cr: +6 in <Chem eq="Cr₂O₇²⁻" /> → +3 in <Chem eq="Cr3+" /> (<b>reduced</b>)</>,
    reason: <>A decrease in oxidation number is reduction. The species that is reduced takes electrons from the other reactant, so it is the <b>oxidising agent</b>.</>,
  },
  {
    working: <>I: −1 in <Chem eq="I-" /> → 0 in <Chem eq="I2" /> (<b>oxidised</b>)</>,
    reason: <>I⁻ loses electrons, so it is the <b>reducing agent</b>. This rules out C and D, which name I⁻ as the oxidising agent.</>,
  },
  {
    working: <>Oxidising agent: <b><Chem eq="Cr₂O₇²⁻" /></b></>,
    reason: <>Options A and B both have this right; the choice now depends on the conjugate pair.</>,
  },
  {
    working: <>Conjugate pairs: <Chem eq="Cr₂O₇²⁻" />/<Chem eq="Cr3+" /> and <b><Chem eq="I2" />/<Chem eq="I-" /></b></>,
    reason: <>A conjugate redox pair is the oxidised and reduced forms of the same element, related by a half-equation (<Chem eq="I2(s) + 2e- <=> 2I-(aq)" />). The question asks for the form <b>oxidising agent/reducing agent</b>, so the oxidised form (I₂) comes first and the reduced form (I⁻) second — the same order as the Data Book&rsquo;s electrochemical series, oxidant on the left.</>,
  },
  {
    working: <b>Oxidising agent: Cr₂O₇²⁻ · conjugate redox pair: I₂/I⁻</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, chosen by 30%, has the right oxidising agent but writes the pair as I⁻/I₂ — reducing agent first, the reverse of the required form. Options <b>C</b> and <b>D</b> name I⁻, the reducing agent, as the oxidising agent.</>,
  },
]

export default function ChemistryQ4_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following reaction.</p>
          <p className="mb-3 text-center">
            <Chem eq="Cr₂O₇²⁻(aq) + 14H+(aq) + 6I-(aq) -> 2Cr3+(aq) + 3I2(aq) + 7H2O(l)" />
          </p>
          <p>
            Which one of the following correctly identifies the oxidising agent and a conjugate
            redox pair (in the form oxidising agent/reducing agent)?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>Oxidising agent: <Chem eq="Cr₂O₇²⁻" /> · Conjugate redox pair (oxidising agent/reducing agent): <Chem eq="I2" />/<Chem eq="I-" /></>, isAnswer: true },
        { letter: 'B', content: <>Oxidising agent: <Chem eq="Cr₂O₇²⁻" /> · Conjugate redox pair (oxidising agent/reducing agent): <Chem eq="I-" />/<Chem eq="I2" /></> },
        { letter: 'C', content: <>Oxidising agent: <Chem eq="I-" /> · Conjugate redox pair (oxidising agent/reducing agent): <Chem eq="Cr₂O₇²⁻" />/<Chem eq="Cr3+" /></> },
        { letter: 'D', content: <>Oxidising agent: <Chem eq="I-" /> · Conjugate redox pair (oxidising agent/reducing agent): <Chem eq="Cr3+" />/<Chem eq="Cr₂O₇²⁻" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
