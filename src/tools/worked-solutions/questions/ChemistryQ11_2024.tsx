// 2024 Chemistry Exam, MCQ 11. VCAA examination report: 73% correct. Recognising that making
// iron with hydrogen produced from fossil fuels (a continually supplied, non-renewable raw
// material) fits a linear economy, not a circular one, and that the two quoted UN Sustainable
// Development Goals are not directly linked to it. Question text transcribed from the original
// paper (rendered from page images — the 2024 exam PDF has no extractable text). VCAA report
// only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 73, B: 18, C: 1, D: 7 },
  answer: 'A',
  comment: (
    <>
      When producing a product from the continual supply of raw material such as iron ore and
      fossil fuels, this is a typical example of a linear economy.
      <br />
      The two quoted Sustainable Development Goals are not directly linked to the process in
      question.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Linear economy: <b>take → make → use → dispose</b>. New raw materials are continually extracted, made into a product and thrown away.</>,
    reason: <>The first idea to have ready. In a linear economy materials flow one way, from the ground to the waste heap, and the supply of raw material has to keep coming.</>,
  },
  {
    working: <>Circular economy: materials are <b>kept in use</b> — reused, repaired, recycled, with renewable inputs — so that new raw materials and waste are minimised.</>,
    reason: <>The contrast. A circular process would, for example, use hydrogen made by electrolysis of water with renewable electricity, and recycle scrap iron rather than mining fresh ore.</>,
  },
  {
    working: <>Here: iron ore is mined and used up, and the hydrogen is <b>produced from fossil fuels</b> — a finite, non-renewable resource that is consumed (releasing CO₂) and not regenerated.</>,
    reason: <>Apply the definitions. Both raw materials (iron ore and fossil fuels) must be supplied continually and neither is returned to use, so the process follows the linear take–make–dispose pattern. Using H₂ instead of carbon (coke) as the reducing agent does not make it circular, because of where this H₂ comes from.</>,
  },
  {
    working: <>SDG 2 (Zero hunger) is about food security and agriculture; SDG 11 (Sustainable cities and communities) is about housing, transport and urban planning.</>,
    reason: <>Neither goal is directly about how iron is produced from its ore, so neither C nor D describes this process (the report: the two quoted goals &ldquo;are not directly linked to the process in question&rdquo;).</>,
  },
  {
    working: <b>The process is consistent with the concept of a linear economy.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, chosen by 18%, mistakes switching to a different reducing agent (hydrogen) for circularity — but hydrogen made from fossil fuels still relies on a continual supply of a non-renewable raw material. Options <b>C</b> and <b>D</b> name goals that have nothing directly to do with producing iron.</>,
  },
]

export default function ChemistryQ11_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Iron is produced from iron ore using heat and a reducing agent.</p>
          <p>
            Using hydrogen, produced from fossil fuels, as the reducing agent to produce iron is
            consistent with
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'the concept of a linear economy.', isAnswer: true },
        { letter: 'B', content: 'the concept of a circular economy.' },
        { letter: 'C', content: 'the United Nations Sustainable Development Goal 2: Zero hunger.' },
        { letter: 'D', content: 'the United Nations Sustainable Development Goal 11: Sustainable cities and communities.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
