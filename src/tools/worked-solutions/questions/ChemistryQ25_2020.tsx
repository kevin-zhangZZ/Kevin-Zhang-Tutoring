// 2020 Chemistry Exam, MCQ 25. VCAA examination report: 68% correct. Comparing petrodiesel
// (C₁₂H₂₆) and biodiesel (C₁₁H₂₂O₂) — intermolecular forces, viscosity, hygroscopy, energy content
// and CO₂ produced per mole. Question text transcribed from the original paper. VCAA report only.
// Report slips kept verbatim in the comment and explained in the working: "C₁₁H₂₂O₁₁" for
// C₁₁H₂₂O₂ and "hydroscopic" for hygroscopic. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 68, C: 12, D: 7 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      Option A: Incorrect. <Chem eq="C12H26" /> – non-polar, intermolecular attraction via
      dispersion forces.
      <br />
      Option B: Correct. <Chem eq="C11H22O11" /> – polar C=O present, stronger via intermolecular
      attraction via dipole-dipole and dispersion force.
      <br />
      Option C: Incorrect. <Chem eq="C11H22O11" /> – higher viscosity; more hydroscopic due to
      polarity allowing for better attraction to <Chem eq="H2O" /> molecules.
      <br />
      Option D: Incorrect. <Chem eq="C11H22O11" /> – lower energy content (is already partially
      oxidised) and produces less <Chem eq="CO2" /> (11 mol) per mol compared to{' '}
      <Chem eq="C12H26" /> (12 mol).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Chem eq="C12H26" /> (petrodiesel): an alkane, <b>non-polar</b> → dispersion forces only.
        <br />
        <Chem eq="C11H22O2" /> (biodiesel): an ester, <b>polar</b> C=O and C–O bonds → dipole–dipole
        forces + dispersion forces.
      </>
    ),
    reason: <>Start every property comparison from structure and intermolecular forces. Biodiesel is a fatty-acid methyl ester (–COOCH₃ group), made by transesterifying a plant oil. Its two O atoms make the molecule polar; the alkane&rsquo;s C–H bonds are essentially non-polar. The molecules are a similar size (<i>M</i> = 186 vs 170 g mol⁻¹ from the Data Book&rsquo;s C 12.0, H 1.0, O 16.0), so their dispersion forces are similar.</>,
  },
  {
    working: <>A — viscosity: <Chem eq="C11H22O2" /> has the stronger intermolecular forces, so it has the <b>higher</b> viscosity → A is <b>false</b>.</>,
    reason: <>Viscosity (resistance to flow) increases with the strength of the attractions between molecules. Biodiesel has dispersion forces of similar strength <i>plus</i> dipole–dipole forces, so it is the more viscous fuel (one reason it can thicken in cold weather).</>,
  },
  {
    working: <>B — hygroscopic: water is polar; non-polar <Chem eq="C12H26" /> can&rsquo;t attract <Chem eq="H2O" /> molecules, but the polar ester group of <Chem eq="C11H22O2" /> can → <Chem eq="C12H26" /> is <b>less hygroscopic</b> → B is <b>true</b>.</>,
    reason: <><b>Hygroscopic</b> means tending to absorb water from the air. Water molecules are attracted to the ester&rsquo;s O atoms (hydrogen bonds from water&rsquo;s H to the ester&rsquo;s O, and dipole attractions); the alkane offers only weak dispersion forces, so it absorbs almost no water. Water in biodiesel is a practical problem (corrosion, microbial growth).</>,
  },
  {
    working: <>C — energy content: <Chem eq="C11H22O2" /> already contains O, so it is <b>partially oxidised</b> → it releases <b>less</b> energy → C is <b>false</b>.</>,
    reason: <>Combustion releases energy by oxidising C and H to <Chem eq="CO2" /> and <Chem eq="H2O" />. A molecule that already has C–O and C=O bonds is partly &ldquo;burnt&rdquo;, and it has fewer C and H atoms per gram, so less energy is released per gram than from the alkane. The oxygen atoms lower the energy content, not raise it.</>,
  },
  {
    working: (
      <>
        D — <Chem eq="2C12H26(l) + 37O2(g) -> 24CO2(g) + 26H2O(l)" />: 12 mol <Chem eq="CO2" /> per mol
        <br />
        <Chem eq="2C11H22O2(l) + 31O2(g) -> 22CO2(g) + 22H2O(l)" />: 11 mol <Chem eq="CO2" /> per mol
        <br />→ <Chem eq="C11H22O2" /> produces <b>less</b> <Chem eq="CO2" /> per mole → D is <b>false</b>.
      </>
    ),
    reason: <>In complete combustion every C atom becomes one <Chem eq="CO2" /> molecule, so mol <Chem eq="CO2" /> per mol fuel = number of C atoms (12 vs 11). Molar mass doesn&rsquo;t decide this — biodiesel is heavier only because of its O atoms, which form no extra <Chem eq="CO2" />.</>,
  },
  {
    working: <b><Chem eq="C12H26" /> is less hygroscopic as it has only dispersion forces between the molecules.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> (13%) gets the viscosity comparison backwards: the polar biodiesel is the more viscous. Option <b>C</b> treats the O atoms as adding energy, when they mean the fuel is partly oxidised already. Option <b>D</b> links <Chem eq="CO2" /> to molecular mass instead of the number of C atoms. The report writes biodiesel as &ldquo;C₁₁H₂₂O₁₁&rdquo; throughout and spells hygroscopic &ldquo;hydroscopic&rdquo; — both slips; the compound is <Chem eq="C11H22O2" />. Its notes are also shuffled: the note under C is about viscosity and water (options A and B), and the energy point that answers C appears under D, so read them as general facts about biodiesel.</>,
  },
]

export default function ChemistryQ25_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Petrodiesel is made up of a number of different molecules, including{' '}
            <Chem eq="C12H26" />. Biodiesel often contains <Chem eq="C11H22O2" />.
          </p>
          <p>
            When comparing <Chem eq="C12H26" /> and <Chem eq="C11H22O2" />, which one of the
            following statements is correct?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Chem eq="C12H26" /> has a higher viscosity due to the dispersion forces between the molecules.</> },
        { letter: 'B', content: <><Chem eq="C12H26" /> is less hygroscopic as it has only dispersion forces between the molecules.</>, isAnswer: true },
        { letter: 'C', content: <><Chem eq="C11H22O2" /> has a higher energy content when it combusts as it contains oxygen atoms.</> },
        { letter: 'D', content: <><Chem eq="C11H22O2" /> produces more carbon dioxide per mole when it combusts due to its higher molecular weight.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
