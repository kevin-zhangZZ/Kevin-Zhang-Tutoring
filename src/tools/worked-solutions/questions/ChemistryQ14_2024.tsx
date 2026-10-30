// 2024 Chemistry Exam, MCQ 14. VCAA examination report: 58% correct. Choosing the pressure and
// temperature that give the greatest equilibrium yield of NO₂ from the endothermic
// N₂O₄ ⇌ 2NO₂ equilibrium, using Le Chatelier's principle. Question text transcribed from the
// original paper (rendered from page images — the 2024 exam PDF has no extractable text). VCAA
// report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 11, C: 58, D: 15 },
  answer: 'C',
  comment: (
    <>
      To increase the yield of NO₂, the equilibrium will need to be shifted forward. This can be
      done for this endothermic equilibrium by having the maximum temperature and lowest pressure.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Greatest yield of NO₂ ⇒ the equilibrium position must lie as far to the <b>right (forward)</b> as possible.</>,
    reason: <><b>Yield</b> is about the <i>extent</i> of reaction (how much product there is at equilibrium), not the <i>rate</i>. So choose conditions by Le Chatelier&rsquo;s principle, not by collision theory.</>,
  },
  {
    working: (
      <>
        Temperature: forward reaction is endothermic (Δ<i>H</i> &gt; 0).
        <br />
        Higher temperature ⇒ system partially opposes the change by absorbing heat ⇒ shifts <b>forward</b>.
        <br />
        ⇒ choose <b>100 °C</b> (not 25 °C).
      </>
    ),
    reason: <>Raising the temperature favours the endothermic direction. Equivalently, for an endothermic reaction <i>K</i> increases as temperature increases, so more NO₂ is present at equilibrium.</>,
  },
  {
    working: (
      <>
        Pressure: <Chem eq="N2O4(g) <=> 2NO2(g)" />
        <br />
        1 mol gas (left) : 2 mol gas (right)
        <br />
        Lower pressure ⇒ system partially opposes the change by making more gas particles ⇒ shifts <b>forward</b>.
        <br />
        ⇒ choose <b>100 kPa</b> (not 200 kPa).
      </>
    ),
    reason: <>Count the gas particles on each side using the coefficients. Lowering the pressure (by increasing the volume) favours the side with more gas particles, which here is the product side.</>,
  },
  {
    working: <b>100 kPa and 100 °C</b>,
    reason: <>Matches option <b>C</b>: the higher temperature and the lower pressure both shift the equilibrium forward (the report: &ldquo;maximum temperature and lowest pressure&rdquo;). Option <b>A</b> (15%) has the temperature right but the pressure wrong — high pressure favours the side with <i>fewer</i> gas particles (N₂O₄), and is the right choice only for raising the <i>rate</i>, not the yield. Option <b>D</b> (15%) has the pressure right but treats the reaction as exothermic — a low temperature favours the reverse reaction here. Option <b>B</b> gets both conditions backwards.</>,
  },
]

export default function ChemistryQ14_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following reaction.</p>
          <p className="mb-2 pl-6">
            <Chem eq="N2O4(g) <=> 2NO2(g)" />
            <span className="ml-8">Δ<i>H</i> &gt; 0</span>
          </p>
          <p>Which reaction conditions would give the greatest yield of nitrogen dioxide, NO₂?</p>
        </>
      }
      options={[
        { letter: 'A', content: '200 kPa and 100 °C' },
        { letter: 'B', content: '200 kPa and 25 °C' },
        { letter: 'C', content: '100 kPa and 100 °C', isAnswer: true },
        { letter: 'D', content: '100 kPa and 25 °C' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
