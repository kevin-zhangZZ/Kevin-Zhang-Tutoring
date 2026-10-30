// 2022 Chemistry Exam, MCQ 29. VCAA examination report: 54% correct. Ranking the strengths of
// C–F, C–Cl, C–Br and C–H bonds from atomic radius (bond length) and core charge. Question text
// transcribed from the original paper. The 2026 Data Book has no bond-enthalpy table, so the
// reasoning uses atomic size; the report's average bond energies are quoted as a check.
// Solution is original (VCAA report only).

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 54, B: 11, C: 15, D: 19 },
  answer: 'A',
  comment: (
    <>
      The reaction <Chem eq="CH4(g) + X2(g) -> CH3X(g) + HX(g)" /> is exothermic, indicating that
      the energy released from the formation of C-X and H-X bonds is greater than the energy
      required to break C-H and X-X bonds.
      <br />
      This suggests that &lsquo;in combination&rsquo; C-X and H-X bonds are stronger than C-H and
      X-X bonds.
      <br />
      The two factors that influence bond strength are atomic radius and the relative force of
      attraction of a nucleus for its outer shell electrons. Numerically this relative attraction
      of the nucleus of an atom in a molecule for its outer shell electrons, also called core
      charge or effective nuclear attraction, is the same as the number of outer shell electrons.
      <br />
      Consider the alternatives.
      <br />
      A. The core charge for C is +4 and the core charge for each of Br, Cl and F is +7. So the key
      factor is the atomic radius of the halogen atoms, which increases from F to Cl to Br. The
      greater the distance between the nuclei, the weaker the bond. So bond strength decreases from
      C-F to C-Cl to C-Br. The strength of bonds from weakest to strongest is C-Br &lt; C-Cl &lt;
      C-F.
      <br />
      B/C. Hydrogen atoms have a much smaller radius than halogen atoms, and so despite the higher
      effective attraction for outer shell electrons (core charge) on the halogens the longer bond
      length from C-F to C-Cl to C-Br suggests the C-H bond is not the weakest bond nor weaker than
      the C-Br bond. Since C is involved in all the bonds, as the radius of the halogen atoms
      increases the bond strength decreases.
      <br />
      The relative strength of bonds is reflected in average bond dissociation energies, shown here
      in kJ mol⁻¹:
      <br />
      C-H 410; C-F 450; C-Cl 330; C-Br 270
      <br />
      D. Bond strength is not determined by the group in which atoms appear in the periodic table.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Bond strength depends on (1) the <b>bond length</b> (the sum of the atomic radii) and (2) how strongly each nucleus attracts the shared electrons (<b>core charge</b>).</>,
    reason: <>A covalent bond is the attraction of two nuclei for a shared pair of electrons. The closer the shared pair is to the nuclei (shorter bond), and the more strongly the nuclei pull on it, the stronger the bond.</>,
  },
  {
    working: <>Core charge: C = +4; F, Cl, Br all = +7 (group 17). Atomic radius: F &lt; Cl &lt; Br.</>,
    reason: <>The halogens all have the same core charge, so the only difference between C–F, C–Cl and C–Br is the size of the halogen. Down group 17 each atom has an extra electron shell, so the radius increases from F to Cl to Br.</>,
  },
  {
    working: <>Bond length: C–F &lt; C–Cl &lt; C–Br, so bond strength: <b>C–Br &lt; C–Cl &lt; C–F</b>.</>,
    reason: <>Longer bond → shared electrons further from the nuclei → weaker attraction → weaker bond. Statement A is true.</>,
  },
  {
    working: <>H is the smallest atom, so the C–H bond is short and strong — it is <b>not</b> the weakest bond, and it is stronger than C–Br.</>,
    reason: <>H has only one electron shell, so the C–H bond is much shorter than C–Br; this outweighs the halogen&rsquo;s larger core charge. A small atomic radius makes a bond stronger, not weaker, so B&rsquo;s reasoning is backwards, and C is false — Br&rsquo;s <b>large</b> size makes C–Br weaker than C–H.</>,
  },
  {
    working: <>Same group ≠ same bond strength: C–F, C–Cl and C–Br have different lengths, so different strengths.</>,
    reason: <>Statement D is false. Atoms in the same group share a core charge, but their radii differ.</>,
  },
  {
    working: <b>The strength of the bonds from weakest to strongest is C–Br &lt; C–Cl &lt; C–F.</b>,
    reason: <>Matches option <b>A</b>. Check against the report&rsquo;s average bond energies: C–Br 270 &lt; C–Cl 330 &lt; C–H 410 &lt; C–F 450 kJ mol⁻¹ — C–H is not the weakest (B) and is stronger than C–Br (C). Option <b>D</b> (19%) assumes elements in the same group behave identically, ignoring atomic size. (The 2026 Data Book has no table of bond enthalpies, so this must be reasoned from atomic radius; the 2024 Data Book&rsquo;s values — C–Br 285, C–Cl 324, C–H 414, C–F 492 kJ mol⁻¹ — give the same order.)</>,
  },
]

export default function ChemistryQ29_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            One mole of methane, <Chem eq="CH4" />, reacts with one mole of halogen,{' '}
            <Chem eq="X2" />. X can be fluorine, F, chlorine, Cl, or bromine, Br. The general
            equation for the reaction is given below.
          </p>
          <div className="mb-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
            <span>
              <Chem eq="CH4(g) + X2(g)" />{' '}
              <span className="inline-flex flex-col items-center align-middle leading-none mx-1">
                <span className="text-[12px]">catalyst</span>
                <span>⟶</span>
              </span>{' '}
              <Chem eq="CH3X(g) + HX(g)" />
            </span>
            <span><i>ΔH</i> &lt; 0</span>
          </div>
          <p>Which one of the following statements is true?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>The strength of the bonds from weakest to strongest is C–Br &lt; C–Cl &lt; C–F.</>, isAnswer: true },
        { letter: 'B', content: <>Since hydrogen has the smallest atomic radius, the C–H bond is the weakest bond.</> },
        { letter: 'C', content: <>The C–Br bond is stronger than the C–H bond because of the size of the bromine atom.</> },
        { letter: 'D', content: <>The C–Br, C–Cl and C–F bonds are equal in strength because Br, Cl and F are halogens.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
