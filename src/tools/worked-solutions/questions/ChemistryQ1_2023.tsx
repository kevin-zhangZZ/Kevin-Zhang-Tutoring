// 2023 Chemistry Exam, MCQ 1. VCAA examination report: 67% correct. Naming the reaction of
// glucose in human cells (cellular respiration, not hydrolysis) and classifying it as exothermic.
// Question text transcribed from the original paper; the table-style options are written
// "Column: value · Column: value". VCAA report only. The report quotes ΔH = −2880 kJ for the
// respiration equation; the 2026 Data Book gives −2803 kJ mol⁻¹ for glucose (2024 Data Book
// −2840), noted in the working — the sign, and so the answer, is the same. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 67, C: 8, D: 17 },
  answer: 'B',
  comment: (
    <>
      In human cells, glucose reacts with oxygen in respiration – an energy-releasing, i.e.
      exothermic, reaction.
      <br />
      <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />, <i>ΔH</i> = −2880 kJ
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Glucose is the body&rsquo;s main carbohydrate fuel. In cells it is <b>oxidised by oxygen</b> in <b>cellular respiration</b>:</>,
    reason: <>The question asks for two things: the <i>name</i> of the reaction glucose undergoes in cells, and whether it releases or absorbs energy. Settle each separately.</>,
  },
  {
    working: <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />,
    reason: <>The balanced equation for cellular respiration (on the study design). It is the same overall reaction as burning glucose — the products are CO₂ and H₂O.</>,
  },
  {
    working: <><i>ΔH</i> = −2803 kJ mol⁻¹ &lt; 0, so respiration is <b>exothermic</b>.</>,
    reason: <>Data Book (molar enthalpies of combustion): glucose, −2803 kJ mol⁻¹. A negative <i>ΔH</i> means energy is released to the surroundings — this released energy is what the body uses to function. (Photosynthesis, the reverse reaction, is the endothermic one: it absorbs light energy.)<DataBookNote>the 2026 Data Book gives −2803 kJ mol⁻¹ for glucose (the 2024 Data Book gave −2840 kJ mol⁻¹); the report&rsquo;s comment below quotes −2880 kJ. All are negative, so the reaction is exothermic either way and the answer is unchanged.</DataBookNote></>,
  },
  {
    working: <>Hydrolysis does not apply: glucose is a <b>monosaccharide</b>, so it cannot be hydrolysed into anything smaller.</>,
    reason: <>Hydrolysis uses water to break a bond — e.g. a disaccharide or starch is hydrolysed <i>into</i> glucose during digestion. That happens before glucose reaches the cells; it is not the reaction <i>of</i> glucose in cells.</>,
  },
  {
    working: <b>Respiration · exothermic</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b> (17%) and <b>C</b> name hydrolysis, which is how glucose is <i>produced</i> from larger carbohydrates, not how glucose itself reacts. Option <b>A</b> has the right reaction but the wrong energy change — respiration releases energy (it is photosynthesis that absorbs it).</>,
  },
]

export default function ChemistryQ1_2023() {
  return (
    <MCQShell
      question={<p>Which one of the following correctly represents the reaction of glucose in human cells?</p>}
      options={[
        { letter: 'A', content: 'Type of reaction: respiration · Endothermic or exothermic: endothermic' },
        { letter: 'B', content: 'Type of reaction: respiration · Endothermic or exothermic: exothermic', isAnswer: true },
        { letter: 'C', content: 'Type of reaction: hydrolysis · Endothermic or exothermic: endothermic' },
        { letter: 'D', content: 'Type of reaction: hydrolysis · Endothermic or exothermic: exothermic' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
