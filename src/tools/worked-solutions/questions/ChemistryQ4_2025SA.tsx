// 2025 Chemistry Exam, Section B Question 4 (17 marks). Organic synthesis and analysis: making
// 1-chloropropane from propane (UV light) and propan-1-amine by substitution, why carboxylic acids
// boil higher than amines, an IR spectrum (amine or acid?), then identifying Compound X (C₄H₉ClO)
// from its mass spectrum (base peak, parent ion, the ³⁷Cl fragment at m/z = 95), ¹H NMR and ¹³C NMR,
// ending with its skeletal structure and IUPAC name. Question text transcribed from the original
// paper; the IR, mass and both NMR spectra are cropped from the original VCAA exam PDF, and the
// report's four accepted skeletal structures for f.i are cropped from the examination report; the
// paper's two tables are transcribed. Mark statements are from the VCAA examination report (VCAA
// report only — no second source); "How to Think About It" notes and model answers are original.
// Masses and ratios checked in Python. IR ranges from the 2026 Data Book (item 21); the paper cites
// no Data Book item, so no Data Book note is needed. No report slips found; note the report's lenient
// acceptance of propan-1-ol + ammonia in a.ii (not a study-design pathway) — flagged in the a.ii working.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import irSrc from './chem-2025sa-q4b-ir-spectrum.png'
import msSrc from './chem-2025sa-q4c-mass-spectrum.png'
import hnmrSrc from './chem-2025sa-q4d-h-nmr.png'
import cnmrSrc from './chem-2025sa-q4e-c-nmr.png'
import reportStructSrc from './chem-2025sa-q4fi-report-structure.png'

const BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const FIG = 'bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

const EXAM_AI: SAExaminerStats = {
  marks: [25, 27, 48],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for the correct chemical equation.
      <br />
      The second mark was awarded for the inclusion of UV light as a requirement of the reaction.
      <br />
      <span className="inline-flex items-end gap-1">
        <Chem eq="CH3CH2CH3 + Cl2" />
        <span className="inline-flex flex-col items-center leading-none"><span className="text-[10px]">uv light</span>→</span>
        <Chem eq="CH3CH2CH2Cl + HCl" />
      </span>
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [56, 27, 17],
  average: 0.6,
  comment: (
    <>
      &lsquo;1-chloropropane&rsquo; and &lsquo;ammonia&rsquo; were the two most common responses that were awarded
      these two marks. (Any primary haloalkane with 3 carbons was accepted.)
      <br />
      &lsquo;propan-1-ol&rsquo; was also accepted with &lsquo;ammonia&rsquo;.
      <br />
      The stem of the question stated that &lsquo;names&rsquo; should be provided. However, a high proportion of
      students responded with chemical formulas.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [35, 37, 29],
  average: 1.0,
  comment: (
    <>
      The first mark was awarded for showing any of the following concepts:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The amount of H-bonding between carboxylic acids is greater than the H-bonding between amines.</li>
        <li>Carboxylic acids can form dimers due to the nature of the COOH group.</li>
        <li>Carboxylic acids can form stronger intermolecular forces.</li>
      </ul>
      The second mark was awarded for showing an understanding that with either greater forces of attraction
      or greater masses, more energy is needed to separate the carboxylic acid molecules and hence results in
      higher boiling points.
      <br />
      Common errors included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>discussion relating to the strength of C=O and O-H bonds</li>
        <li>stating that amines only have dispersion forces between molecules.</li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      amine
      <br />
      The compound could not be a carboxylic acid as there is no evidence for a carbonyl peak in the spectra
      or the broad O-H peak of an acid.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      m/z = 59
      <br />
      The base peak is always shown to have a relative intensity of 100.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      The mark was awarded for recognising that all isomers will have the same molecular formulas and
      therefore all isomers will show the parent ion peak at m/z = 108.
      <br />
      Responses that stated that all isomers have the same molecular mass could not be awarded the mark as
      the molecular mass of the isomers is 108.5 g mol<sup>-1</sup>.
      <br />
      An ideal response by a student would have looked something like the following.
      <br />
      &lsquo;All isomers will have the <sup>35</sup>Cl isotope present in 75% of the molecules, and it is the
      presence of this isotope that is the only thing that produces the parent ion located at m/z = 108.&rsquo;
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [90, 10],
  average: 0.1,
  comment: (
    <>
      [C<sub>3</sub>H<sub>6</sub><sup>37</sup>ClO]<sup>+</sup>
      <br />
      To be awarded this mark, students were required to provide a formula that clearly identified the{' '}
      <sup>37</sup>Cl isotope and had an overall single positive charge.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [46, 32, 17, 5],
  average: 0.8,
  comment: (
    <>
      Frequently, responses did not relate the data from the spectra or the table to support the feature of
      the molecule.
      <br />
      A mark was awarded for any of the following (maximum of 3 marks):
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>There were three peaks seen in the spectra, therefore the molecule must have three hydrogen environments.</li>
        <li>Each of the three peaks in the spectra are singlets, therefore the molecule must have each hydrogen environment located with no adjacent hydrogens.</li>
        <li>The relative peak area of 16.7:33.3:100 shows that the ratio of hydrogens in the molecule is 1:2:6.</li>
        <li>The peak ratios of 1:2:6 show that there is likely to be a total number of 9 hydrogens in the molecule.</li>
        <li>The 6H&rsquo;s suggested from the peak area at 1.3 ppm suggests symmetry of two -CH<sub>3</sub> groups in the molecule.</li>
      </ul>
      Some students attempted to use chemical shifts to justify suggested structural features, but this could
      not be awarded any marks as the shifts are not reliable and cannot be used effectively in this manner.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [17, 64, 19],
  average: 1.0,
  comment: (
    <>
      A mark was awarded for each of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The molecule must have three carbon environments.</li>
        <li>Symmetry must be present in the molecule in order for the four carbons to show only three peaks.</li>
      </ul>
      As in Question 4d., some students attempted to use chemical shifts to justify suggested structural
      features, but this could not be awarded any marks as the shifts are not reliable and cannot be used
      effectively in this manner.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [85, 15],
  average: 0.2,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Four skeletal structures from the examination report: 1-chloro-2-methylpropan-2-ol drawn with HO or H–O on the central carbon and a CH2Cl arm, and 2-chloro-2-methylpropan-1-ol drawn with Cl on the central carbon and a CH2OH arm"
        className="w-full max-w-[360px] mt-1 bg-white"
      />
      Either isomer of C<sub>4</sub>H<sub>9</sub>ClO was accepted but it had to be shown in its skeletal form.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [73, 27],
  average: 0.3,
  comment: <>Either 1-chloro-2-methylpropan-2-ol or 2-chloro-2-methylpropan-1-ol.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <><Chem eq="C3H8 + Cl2 -> C3H7Cl + HCl" /></>,
    reason: <>An alkane reacts with a halogen by <b>substitution</b>: one H atom is swapped for one Cl atom, and the H that leaves joins the other Cl as HCl. Check the balance: 3 C, 8 H and 2 Cl on each side. (Mark 1.)</>,
  },
  {
    working: <><b>Condition: UV light</b> (written above the arrow)</>,
    reason: <>Alkanes are unreactive; the reaction with Cl₂ only happens in the presence of <b>ultraviolet light</b>, which splits the Cl–Cl bond to start it. Without the condition, the second mark is lost.</>,
  },
  {
    working: (
      <b className="inline-flex items-end gap-1">
        <Chem eq="CH3CH2CH3 + Cl2" />
        <span className="inline-flex flex-col items-center leading-none"><span className="text-[10px] font-normal">UV light</span>→</span>
        <Chem eq="CH3CH2CH2Cl + HCl" />
      </b>
    ),
    reason: <>The full answer, as VCAA writes it with semi-structural formulas (molecular formulas are also fine, since the question used them).</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>Target: propan-1-amine, CH₃CH₂CH₂NH₂ — an <b>–NH₂ group on the end carbon</b> of a 3-carbon chain.</>,
    reason: <>Work backwards: in a substitution, the –NH₂ group replaces a leaving group (a halogen) on the same carbon.</>,
  },
  {
    working: <>Reactant 1: <b>1-chloropropane</b> (any primary 3-carbon haloalkane, e.g. 1-bromopropane)</>,
    reason: <>Mark 1. It must be a <b>primary</b> haloalkane — the halogen on carbon 1 — so the amine ends up on carbon 1. (2-chloropropane would give propan-2-amine.)</>,
  },
  {
    working: <>Reactant 2: <b>ammonia</b></>,
    reason: <>Mark 2. NH₃ supplies the –NH₂ group: <Chem eq="CH3CH2CH2Cl + NH3 -> CH3CH2CH2NH2 + HCl" />.</>,
  },
  {
    working: <b>1-chloropropane and ammonia</b>,
    reason: <>Write <b>names</b>, not formulas — the question says &ldquo;Name&rdquo;, and the report notes a high proportion of students gave formulas instead. (The report also accepted propan-1-ol with ammonia, but the study-design pathway to a primary amine is haloalkane + ammonia — use that.)</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Both series can <b>hydrogen bond</b>: amines through their N–H bonds, carboxylic acids through the O–H of the <b>–COOH group</b>.</>,
    reason: <>Start by naming the intermolecular forces both have — the report lists &ldquo;amines only have dispersion forces&rdquo; as a common error. (Every molecule also has dispersion forces.)</>,
  },
  {
    working: <>The carboxyl group has a highly polar <b>O–H</b> (O is more electronegative than N) <i>and</i> a <b>C=O</b> that can accept a hydrogen bond, so carboxylic acids form <b>more and stronger hydrogen bonds</b> — two acid molecules can even pair up as a <b>dimer</b> held by two hydrogen bonds.</>,
    reason: <>Mark 1: <b>why the acids&rsquo; intermolecular forces are stronger</b>, referring to the structure (the COOH group). Each acid also has a <b>greater molar mass</b> than the amine with the same number of carbons (HCOOH 46 vs CH₃NH₂ 31 g mol⁻¹), so stronger dispersion forces too.</>,
  },
  {
    working: <>So <b>more energy</b> is needed to <b>overcome the intermolecular forces</b> and separate the carboxylic acid molecules, giving <b>higher boiling points</b>.</>,
    reason: <>Mark 2: link the stronger forces to <b>energy needed to separate molecules</b>. Boiling breaks the forces <i>between</i> molecules — never the covalent C=O or O–H bonds inside them (the report&rsquo;s other common error).</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>No strong absorption at <b>1680–1740 cm⁻¹</b>, so <b>no C=O</b> (carbonyl).</>,
    reason: <>Every carboxylic acid has a C=O, which gives a strong, sharp peak in this range (Data Book IR table: C=O (acids) 1680–1740 cm⁻¹). The dip near 1600 cm⁻¹ is outside the range.</>,
  },
  {
    working: <>No very broad absorption over <b>2500–3500 cm⁻¹</b>, so <b>no acid O–H</b>.</>,
    reason: <>An acid&rsquo;s O–H gives a very broad band across this range (Data Book: O–H (acids) 2500–3500 cm⁻¹). Here the strong peak near 2950 cm⁻¹ is narrow — it is C–H (2850–3090 cm⁻¹). (All ranges: Data Book item 21.)</>,
  },
  {
    working: <>Two medium, fairly sharp peaks near 3300–3400 cm⁻¹ fit <b>N–H</b> (3300–3500 cm⁻¹).</>,
    reason: <>The positive evidence: N–H (amines) 3300–3500 cm⁻¹.</>,
  },
  { working: <b>An amine</b>, reason: <>The mark is for &ldquo;amine&rdquo;; the report&rsquo;s reason is the missing carbonyl and missing broad O–H peak.</> },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <><b>m/z = 59</b></>,
    reason: <>The <b>base peak</b> is the tallest peak — set to a relative intensity of 100 — not the peak with the highest m/z (that is the molecular ion region, 108–110).</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>Peak at m/z = 108: M = 108 − 35 (³⁵Cl) − 16 (¹⁶O) = 57 = C₄H₉, so the molecular formula is <b>C₄H₉ClO</b>.</>,
    reason: <>The highest-m/z peaks (108 and a smaller 110) are the molecular ion. Taking away Cl and O leaves 57, which is C₄H₉ (4 × 12 + 9 × 1).</>,
  },
  {
    working: <>All isomers have the <b>same molecular formula</b>, C₄H₉ClO.</>,
    reason: <>Isomers = same molecular formula, different structure.</>,
  },
  {
    working: <>So every isomer forms a <b>molecular (parent) ion</b> containing <b>³⁵Cl</b>, [C₄H₉<sup>35</sup>ClO]<sup>+</sup>, with m/z = 4(12) + 9(1) + 35 + 16 = <b>108</b>.</>,
    reason: <>The mark. Do <b>not</b> say &ldquo;the same molar mass&rdquo; — the report did not accept it, because the molar mass is 108.5 g mol⁻¹ (an average over both Cl isotopes), while each peak comes from ions with one particular isotope.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <>Peaks at m/z = 93 (≈ 48) and 95 (≈ 16): intensity ratio ≈ <b>3 : 1</b></>,
    reason: <>Chlorine is about 75% ³⁵Cl and 25% ³⁷Cl, so any fragment containing Cl shows a <b>pair of peaks 2 apart in a 3 : 1 ratio</b>. 95 is the ³⁷Cl partner of 93.</>,
  },
  {
    working: <>93 = 108 − 15: the molecular ion has lost a <b>CH₃</b>, leaving C₃H₆ClO⁺</>,
    reason: <>With ³⁵Cl: 3(12) + 6(1) + 35 + 16 = 93. Swap in ³⁷Cl: 3(12) + 6(1) + 37 + 16 = 95.</>,
  },
  {
    working: <b>[C₃H₆<sup>37</sup>ClO]<sup>+</sup></b>,
    reason: <>For the mark the formula must show the <b>³⁷Cl isotope</b> and a <b>single positive charge</b> — a mass spectrometer only detects positive ions. Only 10% of students scored this.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <><b>Three peaks</b>, so the molecule has <b>three hydrogen environments</b>.</>,
    reason: <>Each set of equivalent H atoms gives one peak. Each deduction in this table earns a mark — the report lists five creditable ones (the third row holds two); any three score the maximum of 3.</>,
  },
  {
    working: <>All three peaks are <b>singlets</b>, so <b>no H environment has hydrogens on the adjacent carbon</b>.</>,
    reason: <>n + 1 rule: a singlet means n = 0 neighbouring H atoms. Look closely — each peak is a single line, not split.</>,
  },
  {
    working: <>Peak areas 16.7 : 33.3 : 100 = <b>1 : 2 : 6</b>, so the H atoms are in the ratio 1 : 2 : 6 — <b>9 H</b> in total (matching C₄H₉ClO).</>,
    reason: <>Divide each area by the smallest (16.7): 1, 1.99…, 5.99…. Peak area is proportional to the number of H atoms in that environment.</>,
  },
  {
    working: <>The <b>6 H</b> at 1.3 ppm means <b>two equivalent –CH₃ groups</b> (symmetry).</>,
    reason: <>Six identical H atoms with no neighbouring H fit two CH₃ groups on the same carbon, which has no H itself: (CH₃)₂C–.</>,
  },
  {
    working: <>(1 H: the –OH; 2 H: a –CH₂– group)</>,
    reason: <>Optional extra. Each statement must be <b>linked to the data</b> (&ldquo;three peaks, so …&rdquo;) — the report says responses often weren&rsquo;t. Don&rsquo;t argue from chemical shifts: the report gave no marks for that.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <><b>Three peaks</b>, so there are <b>three carbon environments</b>.</>,
    reason: <>Mark 1. In ¹³C NMR each set of equivalent carbon atoms gives one peak (peak heights don&rsquo;t count carbons).</>,
  },
  {
    working: <>Compound X has <b>four carbons</b> (C₄H₉ClO), so two carbons must be equivalent: the molecule has <b>symmetry</b> — the two –CH₃ groups on the same carbon.</>,
    reason: <>Mark 2: the link between 4 carbons and only 3 peaks. This agrees with the 6 H singlet in part d. Again, chemical-shift arguments were not credited.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <>Put the clues together: C₄H₉ClO; two equivalent CH₃ on a carbon with <b>no H</b>; one CH₂ with no H neighbours; one OH; Cl.</>,
    reason: <>From parts c–e. The central carbon carries two CH₃ groups, the CH₂ and one more group (OH or Cl).</>,
  },
  {
    working: <>(CH₃)₂C(OH)–CH₂Cl &nbsp;or&nbsp; (CH₃)₂CCl–CH₂OH</>,
    reason: <>Both have 3 H environments (6 : 2 : 1, all singlets) and 3 C environments, so both fit and both were accepted.</>,
  },
  {
    working: <b>Draw either in skeletal form (VCAA&rsquo;s accepted drawings are in the Examiner&rsquo;s Report below): a central carbon with two line-ends (the CH₃ groups), an –OH, and a –CH₂Cl arm.</b>,
    reason: <>In a <b>skeletal</b> diagram, C and H on carbon are not written — only line ends and vertices — but O, H on O, and Cl are. The report says the structure &ldquo;had to be shown in its skeletal form&rdquo;, so a condensed or full structural formula is not enough; 85% scored zero.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <>Longest chain containing the C–OH: 3 carbons (propane); the –OH gets the lowest number, carbon 2 → propan-2-ol.</>,
    reason: <>For (CH₃)₂C(OH)CH₂Cl. The –OH is the functional group that sets the suffix; Cl and CH₃ are prefixes.</>,
  },
  {
    working: <>Substituents: Cl on C1, CH₃ on C2, listed alphabetically (chloro before methyl).</>,
  },
  {
    working: <b>1-chloro-2-methylpropan-2-ol</b>,
    reason: <>For the other structure, (CH₃)₂CClCH₂OH, the name is 2-chloro-2-methylpropan-1-ol. Either was accepted, as long as it matches your drawing in f.i.</>,
  },
]

export default function ChemistryQ4_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (17 marks)</p>
        <p className="mb-2">
          Many industries, such as the pharmaceutical industry, need to produce a range of organic compounds.
        </p>
        <p>
          <b>a.</b> Simple hydrocarbons are the usual raw material used to produce haloalkanes, amines, alcohols,
          carboxylic acids and esters.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Alkane Substitution"
        marks={2}
        statement={<>Write a balanced equation to show the production of C₃H₇Cl from C₃H₈. Include the reaction conditions.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            C₃H₈ → C₃H₇Cl: one H has been swapped for a Cl, so this is the <b>substitution</b> of an alkane
            with chlorine. Two marks, two things: the <b>balanced equation</b> (don&rsquo;t forget the HCl
            by-product) and the <b>condition</b> the question asks for — <b>UV light</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>correct balanced equation</b>: <Chem eq="CH3CH2CH3 + Cl2 -> CH3CH2CH2Cl + HCl" />.</> },
            { point: <>Including <b>UV light</b> as a requirement of the reaction.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Amine Synthesis"
        marks={2}
        statement={<>Name <b>two</b> reactants required to form propan-1-amine, C₃H₉N, in a single substitution reaction.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            An amine is made by substituting the halogen of a <b>haloalkane</b> with <b>ammonia</b>. To land
            the –NH₂ on carbon 1, start from a <b>primary</b> haloalkane with three carbons. One mark per
            reactant — and give <b>names</b>, as the question asks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>1-chloropropane</b> (or any <b>primary haloalkane with 3 carbons</b>; propan-1-ol was also accepted with ammonia).</> },
            { point: <><b>Ammonia</b> — as a <b>name</b>, not a formula.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3">
          During the production process, routine quality testing occurs. After testing, the samples are
          collected as organic waste. In order to dispose of the waste safely, the components must be separated.
        </p>
        <p className="mb-2">
          <b>b.</b> The waste from one laboratory was a mixture of amines and carboxylic acids.
          <br />
          The amines were separated from the carboxylic acids on the basis of their different boiling points.
        </p>
        <p className="mb-2">
          Boiling points of the first three compounds in the carboxylic acid and amine series are listed in the
          table below.
        </p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">carboxylic acids</td>
                <td className={TD}><Chem eq="HCOOH" /><br />101 °C</td>
                <td className={TD}><Chem eq="CH3COOH" /><br />118 °C</td>
                <td className={TD}><Chem eq="CH3CH2COOH" /><br />141 °C</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">amines</td>
                <td className={TD}><Chem eq="CH3NH2" /><br />−6 °C</td>
                <td className={TD}><Chem eq="CH3CH2NH2" /><br />17 °C</td>
                <td className={TD}><Chem eq="CH3CH2CH2NH2" /><br />48 °C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Boiling Points"
        marks={2}
        statement={<>Referring to their structures, explain why the homologous series of carboxylic acids have higher boiling points than the corresponding amines.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Boiling point is about the <b>intermolecular forces</b> between molecules. Both series hydrogen
            bond, so the question is why the acids&rsquo; forces are <i>stronger</i> — look at the COOH group.
            Two marks: (1) the acids have <b>stronger/more hydrogen bonding</b> (they can form dimers), and
            (2) so <b>more energy is needed to separate the molecules</b>. Traps the report lists: talking
            about breaking C=O or O–H bonds, or saying amines only have dispersion forces.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any of: <b>more hydrogen bonding</b> between carboxylic acids than between amines; acids can form <b>dimers</b> because of the COOH group; acids form <b>stronger intermolecular forces</b>.</> },
            { point: <>With greater forces of attraction (or greater masses), <b>more energy is needed to separate the carboxylic acid molecules</b>, hence <b>higher boiling points</b>.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3">One of the samples that was separated from this waste mixture produced the IR spectrum shown below.</p>
        <div className={FIG}>
          <img
            loading="lazy"
            decoding="async"
            src={irSrc}
            alt="IR spectrum, transmittance (%) against wavenumber 4000 to 500 cm⁻¹: a pair of medium peaks near 3300–3400, a strong narrow peak near 2950, a medium dip near 1600, sharp peaks near 1460 and 1380, and broad strong absorptions between 1000 and 750 cm⁻¹ — from the original 2025 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.ii"
        topic="IR Spectroscopy"
        marks={1}
        statement={<>State whether this spectrum was produced by an amine or a carboxylic acid.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            A carboxylic acid has two IR fingerprints you can&rsquo;t miss: a strong <b>C=O</b> peak around
            1700 cm⁻¹ and a very <b>broad O–H</b> band over 2500–3500 cm⁻¹. Check for them first; if both are
            missing, it isn&rsquo;t an acid.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Amine</b> — there is <b>no carbonyl (C=O) peak</b> and <b>no broad acid O–H peak</b>.</> }]} />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3">
          Compound X, known to contain both oxygen and chlorine, was purified from a waste sample to enable it to
          be re-used.
        </p>
        <p className="mb-1"><b>c.</b> The mass spectrum of Compound X is shown below:</p>
        <ul className="list-disc pl-5 mb-3">
          <li>The only stable isotope of oxygen is <sup>16</sup>O.</li>
          <li>The two naturally occurring, stable isotopes of chlorine are <sup>35</sup>Cl and <sup>37</sup>Cl.</li>
        </ul>
        <div className={FIG}>
          <img
            loading="lazy"
            decoding="async"
            src={msSrc}
            alt="Mass spectrum of Compound X, relative intensity against m/z from 10 to 110: tallest peak at 59 (100), peaks near 29 and 31 (about 30), 43 (about 24), 57 (about 28), a strong peak at 93 (about 48), 95 (about 16), 108 (about 8) and a small peak at 110 — from the original 2025 VCAA exam paper"
            className="w-full max-w-[480px]"
          />
        </div>
      </div>

      <PartCard letter="c.i" topic="Base Peak" marks={1} statement={<>Identify the <i>m</i>/<i>z</i> of the base peak.</>} examinerReport={EXAM_CI}>
        <Background title="How to Think About It">
          <p>The <b>base peak</b> is the <b>most intense</b> peak (relative intensity 100). Don&rsquo;t confuse it with the molecular ion peak, which has the largest <i>m</i>/<i>z</i>.</p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="ours" points={[{ point: <><b>m/z = 59</b> — the peak with <b>relative intensity 100</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Molecular Ion"
        marks={1}
        statement={<>State why all the possible isomers of Compound X would have the same peak at <i>m</i>/<i>z</i> = 108.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            The peak at 108 is the <b>molecular ion</b> containing <b>³⁵Cl</b>. Isomers share a <b>molecular
            formula</b>, so they make the same molecular ion. The trap: &ldquo;same molar mass&rdquo; was
            rejected, because the molar mass (108.5 g mol⁻¹) is an isotope average, not an <i>m</i>/<i>z</i>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>All isomers have the <b>same molecular formula</b>, so all show the <b>parent (molecular) ion</b> — containing <b>³⁵Cl</b> — at <b>m/z = 108</b>. (&ldquo;Same molecular mass&rdquo; was not accepted.)</> }]}
        />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Isotope Fragments"
        marks={1}
        statement={<>Identify the formula of the species responsible for the peak at <i>m</i>/<i>z</i> = 95.</>}
        examinerReport={EXAM_CIII}
      >
        <Background title="How to Think About It">
          <p>
            Look for the chlorine pattern: two peaks <b>2 apart in a 3 : 1 ratio</b> (93 and 95). So 95 is a
            fragment containing <b>³⁷Cl</b> — work out what was lost from the molecular ion (108 → 93 is −15,
            a CH₃). Write it as an ion: isotope shown, <b>single + charge</b>. Only 10% scored this mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>[C₃H₆<sup>37</sup>ClO]<sup>+</sup></b> — the formula must show the <b>³⁷Cl isotope</b> and a <b>single positive charge</b>.</> }]} />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3"><b>d.</b> The high-resolution <sup>1</sup>H NMR spectrum for Compound X is shown below.</p>
        <div className={`${FIG} mb-3`}>
          <img
            loading="lazy"
            decoding="async"
            src={hnmrSrc}
            alt="High-resolution 1H NMR spectrum of Compound X, 10 to 0 ppm: three single lines — a short one near 2.8 ppm, a medium one at 2.5 ppm and a tall one at 1.3 ppm — from the original 2025 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p className="mb-2">Data obtained from the <sup>1</sup>H NMR spectrum for Compound X is shown in the table below.</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr><th className={TD}>Chemical shift (ppm)</th><th className={TD}>Relative peak area</th></tr>
          </thead>
          <tbody>
            <tr><td className={TD}>2.8</td><td className={TD}>16.7</td></tr>
            <tr><td className={TD}>2.5</td><td className={TD}>33.3</td></tr>
            <tr><td className={TD}>1.3</td><td className={TD}>100</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="d"
        topic="¹H NMR"
        marks={3}
        statement={<>Referring to the <sup>1</sup>H NMR spectrum and the table above, deduce <b>three</b> things about the structure of Compound X.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            A ¹H NMR spectrum gives three kinds of evidence: the <b>number of peaks</b> (H environments), the{' '}
            <b>splitting</b> (H on neighbouring carbons) and the <b>peak areas</b> (how many H in each
            environment). Three marks means three separate deductions, each written as &ldquo;data, therefore
            feature&rdquo; — the report says responses often didn&rsquo;t link the two. Chemical shifts earned
            nothing here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { marks: 3, point: <>One mark each for any three (maximum 3): <b>three peaks → three H environments</b>; <b>all singlets → no H on adjacent carbons</b>; <b>areas 16.7 : 33.3 : 100 → H ratio 1 : 2 : 6</b>; <b>1 : 2 : 6 → 9 H in total</b>; <b>6 H at 1.3 ppm → two symmetrical –CH₃ groups</b>. Chemical-shift arguments scored nothing.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3"><b>e.</b> The <sup>13</sup>C NMR spectrum for Compound X is shown below.</p>
        <div className={FIG}>
          <img
            loading="lazy"
            decoding="async"
            src={cnmrSrc}
            alt="13C NMR spectrum of Compound X, 200 to 0 ppm: three peaks, near 70, 55 and 27 ppm — from the original 2025 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="¹³C NMR"
        marks={2}
        statement={<>What does the <sup>13</sup>C NMR spectrum indicate about the structure of Compound X?</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Count the peaks: that is the number of <b>carbon environments</b>. Then compare with the number of
            carbons in the formula (four, from part c). Fewer peaks than carbons means some carbons are
            equivalent — <b>symmetry</b>. One mark for each idea.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The molecule has <b>three carbon environments</b>.</> },
            { point: <><b>Symmetry</b> must be present for the <b>four carbons</b> to show only <b>three peaks</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="f.i"
        topic="Skeletal Structure"
        marks={1}
        statement={<>In the space provided below, draw the skeletal diagram of Compound X that is consistent with the information provided in <b>parts c–e</b>.</>}
        examinerReport={EXAM_FI}
      >
        <Background title="How to Think About It">
          <p>
            Build the molecule from the clues: C₄H₉ClO, two equivalent CH₃ groups on a carbon with no H, a CH₂
            and an OH, all with no H neighbours. Then draw it in <b>skeletal</b> form — the mark needs that
            format; 85% of students scored zero.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FI} />
        <MarkScheme source="vcaa" points={[{ point: <>Either isomer — <b>1-chloro-2-methylpropan-2-ol</b> or <b>2-chloro-2-methylpropan-1-ol</b> — drawn in <b>skeletal form</b>.</> }]} />
      </PartCard>

      <PartCard letter="f.ii" topic="IUPAC Naming" marks={1} statement={<>Write the IUPAC name of Compound X.</>} examinerReport={EXAM_FII}>
        <Background title="How to Think About It">
          <p>
            Name the structure you drew in f.i. The –OH sets the suffix (-ol) and gets the lowest number; Cl
            (chloro) and CH₃ (methyl) are prefixes in alphabetical order.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>1-chloro-2-methylpropan-2-ol</b> or <b>2-chloro-2-methylpropan-1-ol</b>.</> }]} />
      </PartCard>
    </div>
  )
}
