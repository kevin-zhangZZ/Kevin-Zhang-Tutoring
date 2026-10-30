// 2024 Chemistry Exam, Section B Question 3 (9 marks). Food chemistry from a bread label: the energy
// available from 100 g of bread, the peptide bond and condensation reaction in gluten exorphin C, a
// monomer of its circled section, and the structure, combustion and molar heat of combustion of oleic
// and stearic acids. Question text transcribed from the original paper; the nutrition table is
// transcribed; the skeletal structure of gluten exorphin C is cropped from the original VCAA exam PDF.
// Mark allocations: the report itemises the marks for c.ii; elsewhere the mark scheme is our
// reading of the report's sample answer. The worked solutions, "How to Think About It" notes and model
// answers are original (VCAA report only). Numbers checked in Python.
// Data Book: the paper's items 12, 20 and 21 are items 11, 19 and 18 in the 2026 Data Book (values
// unchanged). Part c.iii (average bond enthalpies, items 10 and 11 — not in the 2026 Data Book) is
// left out as not in the current study design (KZ, 30 Oct 2026): statement and marks only.
// Report slip: part a's working prints "3.4 × 3.7" for 3.4 × 37 (its total of 1044 kJ uses 37); kept
// verbatim.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import exorphinSrc from './chem-2024sa-q3b-gluten-exorphin.png'

const EXAM_A: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: (
    <>
      Students needed to calculate the correct value for the energy released, with units.
      <br />
      Energy released: 9.5 × 17 + 3.4 × 3.7 + 47.3 × 16 = 1044 kJ or 1.0 × 10³ kJ
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Peptide bond/link or amide bond/link</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>The reaction type is a condensation reaction.</>,
}

const EXAM_BIII: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Either of leucine or serine was accepted.
      <br />
      Many students were unable to successfully identify either of these compounds.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      Students needed to identify that oleic acid has just one C=C present in its structure, and that
      stearic acid does not have a C=C. This response could also have been represented by stating that
      oleic acid had two fewer hydrogens present in its structure compared with stearic acid.
      <br />
      Students needed to be careful and not state that stearic had &lsquo;no double bonds&rsquo;, as this
      could not be accepted.
      <br />
      When asked to identify a difference, a direct comparison of the two compounds is usually required.
      It was insufficient to provide a response such as &lsquo;Oleic acid has one C=C double bond&rsquo; as
      this did not indicate whether the stearic has no C=C bonds or has multiple C=C bonds.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [10, 26, 64],
  average: 1.6,
  comment: (
    <>
      Either of the following equations was accepted:
      <br />
      C₁₈H₃₄O₂ + 25½O₂ → 18CO₂ + 17H₂O
      <br />
      2C₁₈H₃₄O₂ + 51O₂ → 36CO₂ + 34H₂O
      <br />
      The first mark was awarded for the correct identification of reactants and products.
      <br />
      The second mark was awarded for correct balancing of the equation.
    </>
  ),
}


const ROWS_A: WorkingRow[] = [
  {
    working: <>energy = Σ (mass of each food group × its energy content)</>,
    reason: (
      <>
        The Data Book gives the energy <b>per gram</b> for each food group, so multiply each mass on the
        label by its own energy content and add the three results.
        <DataBookNote>the paper&rsquo;s &ldquo;item 12&rdquo; (energy content of food groups) is item 11 in the 2026 Data Book (&ldquo;Energy content of biomolecules in food&rdquo;); the values — proteins 17, fats and oils 37, carbohydrates 16 kJ g⁻¹ — are unchanged.</DataBookNote>
      </>
    ),
  },
  { working: <>protein: 9.5 g × 17 kJ g⁻¹ = 161.5 kJ</> },
  { working: <>fat: 3.4 g × 37 kJ g⁻¹ = 125.8 kJ</>, reason: <>Fat has by far the highest energy content per gram (37 kJ g⁻¹) — don&rsquo;t mix it up with protein&rsquo;s 17.</> },
  { working: <>carbohydrate: 47.3 g × 16 kJ g⁻¹ = 756.8 kJ</> },
  { working: <>energy = 161.5 + 125.8 + 756.8 = 1044.1 kJ</> },
  {
    working: <b>energy = 1.0 × 10³ kJ (1044 kJ)</b>,
    reason: (
      <>
        The report needed a value <b>with units</b> (kJ); it accepted 1044 kJ or 1.0 × 10³ kJ. Two
        significant figures match 9.5 g, 3.4 g and the two-figure Data Book values. The report&rsquo;s
        working prints &ldquo;3.4 × 3.7&rdquo; — a slip for 3.4 × 37: its total of 1044 kJ only comes out
        with 37 (using 3.7 would give 931 kJ).
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The monomers are joined by <b>peptide bonds</b> (<b>amide</b> links, –CO–NH–).</>,
    reason: <>In the structure, every C=O carbon in the backbone is bonded to the N of the next residue: that –C(=O)–N– group is the link between two amino acids. Usually the N carries an H (–C(=O)–NH–); at proline (the five-membered ring) the N is part of the ring, so it has no H — it is still a peptide bond. The report accepted &ldquo;peptide&rdquo; or &ldquo;amide&rdquo;, bond or link.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <><b>Condensation</b> reaction.</>,
    reason: <>The –COOH of one amino acid reacts with the –NH₂ of the next, forming the peptide bond and releasing a small molecule, <b>water</b> (H₂O) — that is what makes it condensation, not addition. (Breaking the bond again with water is hydrolysis.)</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <>Split the circled section at its peptide bond (the C(=O)–N(H) in the middle of the circle).</>,
    reason: <>Each residue is –NH–CH(R)–C(=O)–; the side chain R on the carbon between the N and the C=O tells you which amino acid it was.</>,
  },
  {
    working: <>Left residue: R = –CH₂–CH(CH₃)₂ (the branched chain at the bottom). Right residue: R = –CH₂OH.</>,
    reason: <>Compare each R group with the Data Book table of 2-amino acids: –CH₂CH(CH₃)₂ is leucine&rsquo;s side chain and –CH₂OH is serine&rsquo;s. <DataBookNote>the paper&rsquo;s &ldquo;item 20&rdquo; (2-amino acids) is item 19 in the 2026 Data Book; leucine and serine are unchanged.</DataBookNote></>,
  },
  {
    working: <b>leucine (or serine)</b>,
    reason: <>Either was accepted — the question asks for <b>a</b> monomer, so one name is enough. Watch the side chain on the next residue out of the circle (–CH(CH₃)CH₂CH₃, isoleucine): it is outside the circle, so it is not an answer here.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>Oleic acid, CH₃(CH₂)₇<b>CH=CH</b>(CH₂)₇COOH, has <b>one C=C double bond</b> in its hydrocarbon chain, whereas stearic acid, CH₃(CH₂)₁₆COOH, has <b>no C=C double bonds</b> (all C–C single bonds in the chain).</>,
    reason: (
      <>
        A direct comparison: say what <b>each</b> acid has. Say &ldquo;no <b>C=C</b>&rdquo;, not &ldquo;no
        double bonds&rdquo; — both acids have a C=O double bond in their –COOH group, so &ldquo;stearic has no
        double bonds&rdquo; was not accepted. Equivalent answer: oleic acid (C₁₈H₃₄O₂) has <b>two fewer H atoms</b>{' '}
        than stearic acid (C₁₈H₃₆O₂), i.e. oleic is unsaturated and stearic is saturated.
        <DataBookNote>the paper&rsquo;s &ldquo;item 21&rdquo; (formulas of selected fatty acids) is item 18 in the 2026 Data Book; the formulas are unchanged.</DataBookNote>
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <><Chem eq="C18H34O2 + O2 -> CO2 + H2O" /></>,
    reason: <>Mark 1: complete combustion gives <b>CO₂ and H₂O only</b>. Take oleic acid&rsquo;s molecular formula, C₁₈H₃₄O₂, from the Data Book.</>,
  },
  { working: <>C: 18 → 18CO₂ &nbsp;&nbsp; H: 34 → 17H₂O</>, reason: <>Balance C first, then H (34 H ÷ 2 = 17 H₂O).</> },
  {
    working: <>O on the right: 18 × 2 + 17 × 1 = 53; O on the left: 2 (in the acid) + 2<i>x</i> = 53, so <i>x</i> = 25½</>,
    reason: <>Balance O last — and remember the acid itself already supplies 2 O atoms, so O₂ only needs to provide 51.</>,
  },
  {
    working: <b><Chem eq="C18H34O2 + 25½O2 -> 18CO2 + 17H2O" /></b>,
    reason: <>Mark 2: correct balancing. Doubling everything, <Chem eq="2C18H34O2 + 51O2 -> 36CO2 + 34H2O" />, was equally accepted. States were not required.</>,
  },
]


export default function ChemistryQ3_2024SA() {
  const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (9 marks)</p>
        <p className="mb-3">A label on a bread packet has the following information.</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <tbody>
            <tr><td colSpan={2} className={`${cell} font-semibold`}>Nutritional information</td></tr>
            <tr><td className={cell}></td><td className={`${cell} text-center`}>Mass per 100 g<br />of bread</td></tr>
            <tr><td className={cell}>Protein</td><td className={`${cell} text-center`}>9.5 g</td></tr>
            <tr><td className={cell}>Fat</td><td className={`${cell} text-center`}>3.4 g</td></tr>
            <tr><td className={cell}>Carbohydrates</td><td className={`${cell} text-center`}>47.3 g</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Energy in Food"
        marks={1}
        statement={<>Use <b>item 12</b> of the Data Book to calculate the energy typically available for the body to use in 100 g of bread.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Each food group releases a different amount of energy per gram, so this is three small
            multiplications added together: mass × energy content for protein, fat and carbohydrate. One mark
            means the whole answer must be right — the correct total <b>with its unit (kJ)</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>9.5 × 17 + 3.4 × 37 + 47.3 × 16 = 1044 kJ</b> (<b>1.0 × 10³ kJ</b>), <b>with units</b>.</> }]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">
          Gluten exorphin C is derived from gluten found in bread. The skeletal structure of gluten exorphin
          C is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={exorphinSrc}
            alt="Skeletal structure of gluten exorphin C, a short peptide; the two residues at the carboxylic-acid end are circled — from the original 2024 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Peptide Bond"
        marks={1}
        statement={<>Name the bond that joins the monomers in gluten exorphin C.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Gluten exorphin C is a small protein (a peptide), so its monomers are <b>amino acids</b>. Find the
            group that repeats between the residues — a C=O carbon bonded to an N (usually N–H) — and name that bond.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="ours" points={[{ point: <><b>Peptide</b> bond/link or <b>amide</b> bond/link.</> }]} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Condensation Reaction"
        marks={1}
        statement={<>Name the type of reaction that results in the formation of the bond between the monomers in gluten exorphin C.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Two monomers join and a small molecule (water) is lost — that defines one reaction type. Name the
            type of reaction, not the bond again.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme source="ours" points={[{ point: <><b>Condensation</b> reaction.</> }]} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Amino Acid Monomers"
        marks={1}
        statement={<>Use <b>item 20</b> of the Data Book to name a monomer that reacted to form the circled section of the gluten exorphin C molecule shown above.</>}
        examinerReport={EXAM_BIII}
      >
        <Background title="How to Think About It">
          <p>
            The circle holds two amino-acid residues joined by one peptide bond. Every 2-amino acid has the same
            backbone, so only the <b>side chain (R group)</b> identifies it: find each R group in the circle and
            match it to the Data Book table. The report notes many students could not identify either — the
            skill is reading the skeletal side chain correctly.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <MarkScheme source="ours" points={[{ point: <><b>Leucine</b> or <b>serine</b> (either accepted).</> }]} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">c.</p>
        <p>
          The <b>fats</b> in bread can be broken down into compounds including oleic acid and stearic acid.
          Refer to <b>item 21</b> of the Data Book.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Fatty Acid Structure"
        marks={1}
        statement={<>Identify a structural difference between oleic acid and stearic acid.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Identify a difference&rdquo; means a <b>direct comparison</b>: say what oleic acid has{' '}
            <i>and</i> what stearic acid has. The report rejected answers that described only oleic acid, and
            answers saying stearic acid has &ldquo;no double bonds&rdquo; (its –COOH has a C=O) — be precise:{' '}
            <b>C=C</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="ours"
          points={[{ point: <>Oleic acid has <b>one C=C</b> double bond and stearic acid has <b>no C=C</b> (or: oleic acid has <b>two fewer H atoms</b> than stearic acid).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Combustion Equation"
        marks={2}
        statement={<>Write the reaction for the complete combustion of <b>oleic</b> acid. States are not required.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: the right <b>reactants and products</b> (oleic acid + O₂ → CO₂ + H₂O), then
            correct <b>balancing</b>. Balance C, then H, then O last — and count the 2 O atoms already in the
            acid. A half coefficient (25½ O₂) is fine, or double everything.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>reactants and products</b>: <b>C₁₈H₃₄O₂ + O₂ → CO₂ + H₂O</b>.</> },
            { point: <>Correct <b>balancing</b>: C₁₈H₃₄O₂ + <b>25½</b>O₂ → <b>18</b>CO₂ + <b>17</b>H₂O (or 2C₁₈H₃₄O₂ + 51O₂ → 36CO₂ + 34H₂O).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Bond Enthalpies"
        marks={2}
        statement={
          <>
            Predict whether oleic acid or stearic acid would have a higher molar heat of combustion. Explain
            your answer with reference to <b>item 10</b> and <b>item 11</b> of the Data Book. No calculations
            are required.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part c.iii. is explained with <b>average bond enthalpies</b> (items 10 and 11 of the 2024 Data Book).
            The 2024–2027 study design mentions bond breaking and bond making only qualitatively, the 2026 Data
            Book has no bond enthalpy tables, and VCAA&rsquo;s 2025 report calls bond-enthalpy calculations beyond
            the scope of the study design. This part is left without a worked solution.
          </p>
        </Background>
      </PartCard>
    </div>
  )
}
