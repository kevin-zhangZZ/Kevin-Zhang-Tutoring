// 2024 Chemistry Exam, MCQ 13. VCAA examination report: 82% correct. Effect of adding or
// removing a catalyst, read off an energy profile diagram: a catalyst changes the activation
// energy (and so the rate) but not the enthalpies of reactants and products or ΔH. Question text
// transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text); the energy profile diagram is cropped from the original VCAA exam PDF.
// VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import profileSrc from './chem-2024-mcq13-energy-profile.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 2, C: 82, D: 2 },
  answer: 'C',
  comment: (
    <>
      If a catalyst is removed from a reaction, the activation energy for this process will be
      increased.
      <br />
      Catalysts do not alter the energy of the reactants or products.
      <br />
      Removing a catalyst will reduce the rate of reaction.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>From the graph: <i>H</i>(reactants) = 50 kJ mol⁻¹, <i>H</i>(products) = 0 kJ mol⁻¹, peak ≈ 120 kJ mol⁻¹.</>,
    reason: <>Read the three key levels: the flat line on the left (reactants), the flat line on the right (products) and the top of the hump (the transition state of the <b>uncatalysed</b> pathway).</>,
  },
  {
    working: (
      <>
        Δ<i>H</i> = <i>H</i>(products) − <i>H</i>(reactants)
        <br />
        Δ<i>H</i> = 0 kJ mol⁻¹ − 50 kJ mol⁻¹
        <br />
        Δ<i>H</i> = −50 kJ mol⁻¹ (exothermic)
      </>
    ),
    reason: <>Products are lower than reactants, so energy is released: the reaction is exothermic.</>,
  },
  {
    working: (
      <>
        <i>E</i><sub>a</sub> = <i>H</i>(peak) − <i>H</i>(reactants)
        <br />
        <i>E</i><sub>a</sub> ≈ 120 kJ mol⁻¹ − 50 kJ mol⁻¹
        <br />
        <i>E</i><sub>a</sub> ≈ 70 kJ mol⁻¹ (uncatalysed)
      </>
    ),
    reason: <>Activation energy is measured from the reactants up to the peak, not from zero.</>,
  },
  {
    working: <>A catalyst provides an <b>alternative reaction pathway with a lower activation energy</b>. It does not change the enthalpy of the reactants or products, so Δ<i>H</i> is unchanged.</>,
    reason: <>The key concept. With a catalyst, a greater proportion of collisions have energy ≥ <i>E</i><sub>a</sub>, so the rate increases. On the diagram, only the height of the hump changes — the two flat lines stay at 50 and 0 kJ mol⁻¹.</>,
  },
  {
    working: <>Removing the catalyst from the catalysed reaction returns it to the uncatalysed pathway: <i>E</i><sub>a</sub> rises back to ≈ 70 kJ mol⁻¹ and the rate decreases.</>,
    reason: <>So C is true and B is false. Note the direction in C: going from catalysed to uncatalysed <i>increases</i> the activation energy.</>,
  },
  {
    working: <>A — false: the reactants stay at 50 kJ mol⁻¹. D — false: Δ<i>H</i> stays −50 kJ mol⁻¹, so the reaction stays exothermic.</>,
    reason: <>A catalyst changes only the path between reactants and products, never the start or end points (the report: &ldquo;Catalysts do not alter the energy of the reactants or products&rdquo;).</>,
  },
  {
    working: <b>Removing the catalyst from the catalysed reaction will increase the activation energy.</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b>, chosen by 14%, has the catalyst changing the reactants&rsquo; energy — but a catalyst lowers the peak, it does not move the reactants&rsquo; level. <b>B</b> reverses the effect on rate, and <b>D</b> wrongly has a catalyst changing Δ<i>H</i>. The exact height of the hump doesn&rsquo;t matter here — only which levels a catalyst can and cannot change.</>,
  },
]

export default function ChemistryQ13_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Consider the following energy profile diagram for an <b>uncatalysed</b> gaseous
            reaction. A solid catalyst is available for this reaction.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={profileSrc}
              alt="Energy profile: enthalpy (kJ mol⁻¹, −50 to 200) against progress of reaction. Reactants at 50, a hump peaking at about 120, products at 0 — from the original 2024 VCAA exam paper"
              className="w-full max-w-[380px]"
            />
          </div>
          <p>Which one of the following statements is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Adding the catalyst to the uncatalysed reaction will increase the energy of the reactants.' },
        { letter: 'B', content: 'Removing the catalyst from the catalysed reaction will increase the rate of the reaction.' },
        { letter: 'C', content: 'Removing the catalyst from the catalysed reaction will increase the activation energy.', isAnswer: true },
        { letter: 'D', content: 'Adding the catalyst to the uncatalysed reaction will make the reaction endothermic.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
