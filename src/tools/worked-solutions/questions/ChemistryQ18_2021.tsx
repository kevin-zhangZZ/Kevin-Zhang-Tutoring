// 2021 Chemistry Exam, MCQ 18. VCAA examination report: 73% correct. Matching energy profiles
// to thermochemical equations — the profile must show the right reactants and products, and
// the sign and size of ΔH for the reaction in the direction drawn (reversing a reaction
// reverses the sign of ΔH). Question text transcribed from the original paper; the four energy
// profiles (options) are cropped from the original VCAA exam PDF. VCAA report only. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2021-mcq18-optA.png'
import optBSrc from './chem-2021-mcq18-optB.png'
import optCSrc from './chem-2021-mcq18-optC.png'
import optDSrc from './chem-2021-mcq18-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2021 VCAA exam paper`} className="w-full max-w-[460px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 16, C: 73, D: 6 },
  answer: 'C',
  comment: (
    <>
      Equations consistent with each energy profile:
      <br />
      A. <Chem eq="2NO2(g) -> 2NO(g) + O2(g)" /> &nbsp; Δ<i>H</i> = -14 kJ mol<sup>-1</sup>
      <br />
      B. <Chem eq="CO2(g) + NO(g) -> CO(g) + NO2(g)" /> &nbsp; Δ<i>H</i> = -226 kJ mol<sup>-1</sup>
      <br />
      C. <Chem eq="N2O4(g) <=> 2NO2(g)" /> &nbsp; Δ<i>H</i> = +57 kJ mol<sup>-1</sup>
      <br />
      or
      <br />
      <Chem eq="2NO2(g) <=> N2O4(g)" /> &nbsp; Δ<i>H</i> = -57 kJ mol<sup>-1</sup>
      <br />
      D. <Chem eq="N2(g) + O2(g) <=> 2NO(g)" /> &nbsp; Δ<i>H</i> = -181 kJ mol<sup>-1</sup>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>On an energy profile, Δ<i>H</i> = <i>H</i>(products) − <i>H</i>(reactants): products <b>below</b> reactants → Δ<i>H</i> negative (exothermic); products <b>above</b> → Δ<i>H</i> positive (endothermic).</>,
    reason: <>Read each graph left to right: the species on the left are the reactants, the species on the right the products. Each graph puts the reactants at 0 kJ mol⁻¹, so the products&rsquo; level <i>is</i> Δ<i>H</i>. Then compare with the given equations — remembering that if the graph shows a reaction <b>in reverse</b>, the matching Δ<i>H</i> has the <b>opposite sign</b> (same size).</>,
  },
  {
    working: <>A: <Chem eq="2NO2 -> 2NO + O2" />, products at about −14 → Δ<i>H</i> ≈ −14 kJ mol⁻¹. Given: <b>+14</b> kJ mol⁻¹ ✗</>,
    reason: <>Same direction as the first equation, but drawn exothermic when the equation is endothermic — the products should sit at +14, above the reactants.</>,
  },
  {
    working: <>B: <Chem eq="CO2 + NO -> NO2 + CO" />, products at about −226 → Δ<i>H</i> ≈ −226 kJ mol⁻¹. This is the <b>reverse</b> of the second equation, so it should be <b>+226</b> kJ mol⁻¹ ✗</>,
    reason: <>The forward reaction <Chem eq="NO2 + CO -> CO2 + NO" /> is exothermic (−226), so the reverse must be endothermic (+226). The graph kept the −226 without flipping the sign.</>,
  },
  {
    working: <>C: <Chem eq="N2O4 -> 2NO2" />, products at about +57 → Δ<i>H</i> ≈ +57 kJ mol⁻¹. This is the <b>reverse</b> of the third equation (−57), so it should be <b>+57</b> kJ mol⁻¹ ✓</>,
    reason: <>The given reaction <Chem eq="2NO2 -> N2O4" /> is exothermic, so its reverse is endothermic by the same 57 kJ mol⁻¹ — exactly what the graph shows, with 2NO₂ drawn about 57 kJ mol⁻¹ above N₂O₄.</>,
  },
  {
    working: <>D: <Chem eq="N2 + O2 -> 2NO" />, products at about −181 → Δ<i>H</i> ≈ −181 kJ mol⁻¹. Given: <b>+181</b> kJ mol⁻¹ ✗</>,
    reason: <>Same direction as the fourth equation, but drawn exothermic when the equation is endothermic.</>,
  },
  {
    working: <b>Only profile C is consistent with the equations.</b>,
    reason: <>Matches option <b>C</b>. Options <b>A</b> and <b>D</b> draw the right reaction with the sign of Δ<i>H</i> reversed. Option <b>B</b>, the most common wrong answer (16%), draws the <i>reverse</i> of the second equation but keeps the forward reaction&rsquo;s negative Δ<i>H</i>. (The activation-energy peaks don&rsquo;t matter here: the equations give no information about <i>E</i><sub>a</sub>.)</>,
  },
]

export default function ChemistryQ18_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following chemical equations.</p>
          <div className="mb-3 overflow-x-auto">
            <table className="text-[14px] mx-auto">
              <tbody>
                <tr><td className="pr-8 py-0.5"><Chem eq="2NO2(g) -> 2NO(g) + O2(g)" /></td><td className="py-0.5">Δ<i>H</i> = +14 kJ mol⁻¹</td></tr>
                <tr><td className="pr-8 py-0.5"><Chem eq="NO2(g) + CO(g) -> CO2(g) + NO(g)" /></td><td className="py-0.5">Δ<i>H</i> = −226 kJ mol⁻¹</td></tr>
                <tr><td className="pr-8 py-0.5"><Chem eq="2NO2(g) <=> N2O4(g)" /></td><td className="py-0.5">Δ<i>H</i> = −57 kJ mol⁻¹</td></tr>
                <tr><td className="pr-8 py-0.5"><Chem eq="N2(g) + O2(g) <=> 2NO(g)" /></td><td className="py-0.5">Δ<i>H</i> = +181 kJ mol⁻¹</td></tr>
              </tbody>
            </table>
          </div>
          <p>Which one of the following graphs is consistent with the chemical equations above?</p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'Energy profile: 2NO₂ at 0 kJ/mol rising to a peak near 27 then falling to 2NO + O₂ at about −14 kJ/mol') },
        { letter: 'B', content: opt(optBSrc, 'Energy profile: CO₂ + NO at 0 kJ/mol rising to a peak near 75 then falling to NO₂ + CO at about −226 kJ/mol') },
        { letter: 'C', content: opt(optCSrc, 'Energy profile: N₂O₄ at 0 kJ/mol rising to a peak near 150 then falling to 2NO₂ at about +57 kJ/mol'), isAnswer: true },
        { letter: 'D', content: opt(optDSrc, 'Energy profile: N₂ + O₂ at 0 kJ/mol rising to a peak near 150 then falling to 2NO at about −181 kJ/mol') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
