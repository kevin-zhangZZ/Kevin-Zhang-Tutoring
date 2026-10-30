// 2021 Chemistry Exam, Section B Question 6 (9 marks). A reaction pathway from 1-bromopentane:
// a chiral isomer of C₅H₁₁Br, the substitution of 1-bromopentane by NaOH to give pentan-1-ol, the
// atom economy of that step, naming the full oxidation product (pentanoic acid) and the skeletal
// formula of pentanamide. Question text transcribed from the original paper; the reaction-pathway
// figure is cropped from the original VCAA exam PDF; the structures in the report's comments
// (6a, 6d) are cropped from the VCAA examination report, and the 2-bromopentane and pentanamide
// structures are reused from those crops as the model answers' drawings. Mark allocations for
// 6a, 6b.i and 6b.ii are itemised in the VCAA report; 6c and 6d are our reading. "How to Think
// About It" notes and model answers are original (VCAA report only — no second source). Molar
// masses from the 2026 Data Book (unchanged from 2021) and the atom economy checked in Python
// (88.0 / 190.9 = 46.10%). All parts are on the current study design (substitution of haloalkanes,
// atom economy, chiral centres, primary amides).

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import pathwaySrc from './chem-2021sa-q6-pathway.png'
import s1Src from './chem-2021sa-q6a-report-structure1.png'
import s2Src from './chem-2021sa-q6a-report-structure2.png'
import s3Src from './chem-2021sa-q6a-report-structure3.png'
import amideSrc from './chem-2021sa-q6d-report-structure.png'

const EXAM_A: SAExaminerStats = {
  marks: [33, 7, 60],
  average: 1.3,
  comment: (
    <>
      There were three viable options that a student could have chosen.
      <div className="flex flex-wrap gap-3 my-2">
        <img loading="lazy" decoding="async" src={s1Src} alt="Structural formula of 2-bromopentane with carbon 2 circled in red as the chiral centre — from the VCAA examination report" className="w-full max-w-[220px]" />
        <img loading="lazy" decoding="async" src={s2Src} alt="Structural formula of 2-bromo-3-methylbutane with carbon 2 circled in red as the chiral centre — from the VCAA examination report" className="w-full max-w-[200px]" />
        <img loading="lazy" decoding="async" src={s3Src} alt="Structural formula of 1-bromo-2-methylbutane with carbon 2 circled in red as the chiral centre — from the VCAA examination report" className="w-full max-w-[200px]" />
      </div>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The first mark was awarded for any one of the three valid structural diagrams.</li>
        <li>The second mark was awarded for the correct identification of a chiral centre.</li>
      </ul>
      Many students incorrectly supplied a structural diagram of 1-bromopentane.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [22, 27, 51],
  average: 1.3,
  comment: (
    <>
      Any one of the following three equations were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li><Chem eq="CH3(CH2)3CH2Br + NaOH -> CH3(CH2)3CH2OH + NaBr" /></li>
        <li><Chem eq="C5H11Br + NaOH -> C5H11OH + NaBr" /></li>
        <li><Chem eq="C5H11Br + NaOH -> C5H12O + NaBr" /></li>
      </ul>
      The first mark was awarded for the correct representation of both organic formulae being correctly quoted.
      <br />
      The second mark was awarded for an overall balanced equation with the two sodium salts being correctly
      included. The general nature of the term &lsquo;sodium salt&rsquo; may have led to errors for some
      students; however, the reaction for the production of alcohols from a haloalkane and sodium hydroxide
      should have been well understood.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [25, 9, 13, 54],
  average: 2.0,
  comment: (
    <>
      %atom economy = <Katex tex="\dfrac{\text{mass of desired product}}{\text{total mass of reactants}} \times 100 \text{ or } \dfrac{\text{mass of desired product}}{\text{total mass of products}} \times 100" />
      <br />
      = <Katex tex="\dfrac{88.0}{150.9 + 40} \times 100 \text{ or } \dfrac{88.0}{88.0 + 102.9} \times 100" />
      <br />
      = 46.1 %
      <br />
      One mark was awarded for students showing the correct mathematical relationship.
      <br />
      One mark was awarded for correct substitution of molar masses into this relationship.
      <br />
      One mark was awarded for correct calculation.
      <br />
      If an incorrect equation was presented in Part 6bi., consequential marks could be awarded. However, for
      this to happen the student needed to present full working.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: <>Pentanoic acid</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: (
    <>
      <img loading="lazy" decoding="async" src={amideSrc} alt="Skeletal formula of pentanamide: a four-segment zigzag chain ending in a carbon double-bonded to O and single-bonded to NH₂ (N drawn with two H atoms) — from the VCAA examination report" className="w-full max-w-[240px] my-2" />
      Students may have been challenged in identifying the amide group and/or representing the amide group in a
      skeletal structure.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Isomer: same molecular formula, <b>C₅H₁₁Br</b>, different structure.</>,
    reason: <>An isomer of 1-bromopentane must have the same atoms (5 C, 11 H, 1 Br) arranged differently — so 1-bromopentane itself does not count (the report notes many students drew it).</>,
  },
  {
    working: <>Move the Br to carbon 2: <b>2-bromopentane</b>, <Chem eq="CH3CHBrCH2CH2CH3" />.</>,
    reason: <>1-bromopentane has <b>no</b> chiral carbon: C1 carries two H atoms, and every other carbon carries at least two H atoms too. Moving Br to C2 makes C2 different on all four sides.</>,
  },
  {
    working: (
      <>
        C2 is bonded to <b>four different groups</b>: –Br, –H, –CH₃ and –CH₂CH₂CH₃, so C2 is the{' '}
        <b>chiral carbon</b>.
      </>
    ),
    reason: <>A chiral carbon (chiral centre) is a carbon atom attached to four <i>different</i> atoms or groups. Check by listing all four. (3-bromopentane is <b>not</b> chiral: its C3 has two identical –CH₂CH₃ groups.)</>,
  },
  {
    working: (
      <>
        <img loading="lazy" decoding="async" src={s1Src} alt="Structural formula of 2-bromopentane with every C–H bond drawn and carbon 2 circled" className="block w-full max-w-[240px] mb-1" />
        <b>Draw the full structural formula (every H shown) and circle C2.</b>
      </>
    ),
    reason: <>Mark 1: a valid structural formula of a chiral isomer. Mark 2: the chiral carbon <b>circled</b>. &ldquo;Structural formula&rdquo; means every bond and every H atom drawn. Drawing from the VCAA report. 2-bromo-3-methylbutane or 1-bromo-2-methylbutane (both in the report, each with the chiral carbon at C2) score equally.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Haloalkane + <b>NaOH</b> → alcohol + sodium halide</>,
    reason: <>The &ldquo;sodium salt&rdquo; is <b>sodium hydroxide</b> (strictly a base, not a salt — the paper&rsquo;s wording is loose): in a <b>substitution reaction</b> the OH⁻ replaces the Br on C1. The report notes the general wording &ldquo;sodium salt&rdquo; may have led to errors, but haloalkane + NaOH → alcohol is the standard reaction.</>,
  },
  {
    working: <b><Chem eq="CH3(CH2)3CH2Br + NaOH -> CH3(CH2)3CH2OH + NaBr" /></b>,
    reason: <>Mark 1: <b>both organic formulas</b> correct (1-bromopentane and pentan-1-ol). Mark 2: <b>balanced</b>, with <b>NaOH</b> and <b>NaBr</b> both included — the Br leaves as bromide and pairs with Na⁺. Semi-structural formulas are safest because they show where the Br and OH are; the report also accepted <Chem eq="C5H11Br" /> and <Chem eq="C5H11OH" />/<Chem eq="C5H12O" />. The report&rsquo;s accepted equations show no states, so they were not needed for the marks.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <><Katex tex="\%\ \text{atom economy} = \dfrac{M(\text{desired product})}{\text{total } M(\text{reactants})} \times 100" /></>,
    reason: <>Mark 1: the relationship. Atom economy measures how much of the reactants&rsquo; mass ends up in the product you want. Every coefficient in the equation from b.i is 1, so molar masses can be used directly (otherwise multiply each by its coefficient).</>,
  },
  {
    working: <>M(<Chem eq="C5H11Br" />) = 5(12.0) + 11(1.0) + 79.9 = 150.9 g mol⁻¹<br />M(NaOH) = 23.0 + 16.0 + 1.0 = 40.0 g mol⁻¹<br />M(<Chem eq="C5H11OH" />) = 5(12.0) + 12(1.0) + 16.0 = 88.0 g mol⁻¹</>,
    reason: <>Relative atomic masses from the Data Book: C 12.0, H 1.0, O 16.0, Na 23.0, Br 79.9. The desired product is <b>pentan-1-ol</b>; NaBr is the waste product.</>,
  },
  {
    working: <><Katex tex="\%\ \text{atom economy} = \dfrac{88.0\ \text{g mol}^{-1}}{150.9\ \text{g mol}^{-1} + 40.0\ \text{g mol}^{-1}} \times 100" /></>,
    reason: <>Mark 2: correct substitution. Equivalently 88.0 ÷ (88.0 + 102.9) × 100, since total mass of products = total mass of reactants = 190.9 g mol⁻¹ (mass is conserved).</>,
  },
  {
    working: <b>% atom economy = 46.1%</b>,
    reason: <>Mark 3: correct calculation (46.097…% unrounded). Three significant figures, matching the Data Book molar masses. Plausible: more than half the reactant mass (the 102.9 g mol⁻¹ of NaBr) ends up as waste, so the answer is below 50% — and it must be below 100%.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Pentan-1-ol is a <b>primary alcohol</b> (OH on an end carbon).</>,
    reason: <>The type of alcohol decides the oxidation product: primary → aldehyde → carboxylic acid; secondary → ketone.</>,
  },
  {
    working: <><Chem eq="CH3(CH2)3CH2OH" /> → <Chem eq="CH3(CH2)3CHO" /> (pentanal) → <Chem eq="CH3(CH2)3COOH" /></>,
    reason: <>With an oxidising agent such as acidified Cr₂O₇²⁻ or MnO₄⁻, the aldehyde is only the halfway stage. &ldquo;<b>Fully</b> oxidised&rdquo; means all the way to the <b>carboxylic acid</b>; the carbon chain length (5 C) does not change.</>,
  },
  {
    working: <b>Compound S: pentanoic acid</b>,
    reason: <>Write it in the Compound S box in the pathway. The carboxyl carbon is C1 and is counted in &ldquo;pent-&rdquo;, so no locant is needed. &ldquo;Pentanal&rdquo; is the partial oxidation product and does not answer &ldquo;fully oxidised&rdquo;.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>Pentanamide: <Chem eq="CH3CH2CH2CH2CONH2" /> — <b>5 carbons</b> including the C of the <b>amide group</b> (–CONH₂).</>,
    reason: <>&ldquo;Pentan-&rdquo; counts the carbonyl carbon, so the chain is 4 C plus the C=O carbon — not 5 C plus another. A primary amide has <b>C=O and NH₂ on the same carbon</b>; an NH₂ on its own would be an amine (pentan-1-amine).</>,
  },
  {
    working: (
      <>
        <img loading="lazy" decoding="async" src={amideSrc} alt="Skeletal formula of pentanamide: a zigzag chain of four line segments ending at a carbon with a double bond up to O and a single bond to N bearing two H atoms" className="block w-full max-w-[240px] mb-1" />
        <b>Zigzag of 4 bonds (5 carbon vertices/ends), C=O drawn as a double line to O, and N with its two H atoms.</b>
      </>
    ),
    reason: <>The mark: a correct <b>skeletal</b> formula. In a skeletal structure carbons are line ends and corners and their H atoms are not drawn, but <b>heteroatoms (O, N) are written</b> along with the H atoms on them (NH₂). The report suggests students may have been challenged in identifying the amide group or drawing it in skeletal form. Drawing from the VCAA report.</>,
  },
]

export default function ChemistryQ6_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (9 marks)</p>
        <p className="mb-3">A reaction pathway beginning with 1-bromopentane is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={pathwaySrc}
            alt="Reaction pathway: 1-bromopentane, arrow down to pentan-1-ol, arrow down to an empty box labelled Compound S — from the original 2021 VCAA exam paper"
            className="w-full max-w-[260px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Chiral Isomers"
        marks={2}
        statement={<>Draw the structural formula for an isomer of 1-bromopentane that contains a chiral carbon and circle this chiral carbon.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Two jobs, two marks: draw a <b>different</b> C₅H₁₁Br structure that has a chiral carbon, then
            circle that carbon. A chiral carbon has <b>four different groups</b> attached, so move the Br
            (or branch the chain) until one carbon carries four different groups — in 2-bromopentane that is
            C2 with –Br, –H, –CH₃ and –CH₂CH₂CH₃. (In 1-bromo-2-methylbutane the chiral carbon is the one
            <i>next to</i> the CH₂Br, so the chiral carbon need not carry the Br itself.)
            The report&rsquo;s trap: many students drew 1-bromopentane itself — that is the starting compound,
            not an isomer of it, and it has no chiral carbon.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A valid <b>structural formula</b> of a chiral isomer of C₅H₁₁Br — <b>2-bromopentane</b>, <b>2-bromo-3-methylbutane</b> or <b>1-bromo-2-methylbutane</b>.</> },
            { point: <>The <b>chiral centre</b> correctly identified (circled) — the carbon bonded to <b>four different groups</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Substitution Reaction"
        marks={2}
        statement={<>Write a balanced equation for the reaction that will produce pentan-1-ol from 1-bromopentane and a sodium salt.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Haloalkane → alcohol is a <b>substitution</b>: the halogen is swapped for –OH, supplied by
            sodium hydroxide. One mark is for the two organic formulas, the other for a balanced equation
            that includes both sodium compounds (NaOH in, NaBr out). The report notes that the general
            wording &ldquo;sodium salt&rdquo; may have led to errors — read it as NaOH.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Both organic formulas</b> correct: <b>1-bromopentane</b> (<Chem eq="CH3(CH2)3CH2Br" />) and <b>pentan-1-ol</b> (<Chem eq="CH3(CH2)3CH2OH" />).</> },
            { point: <>An overall <b>balanced</b> equation with <b>NaOH</b> and <b>NaBr</b> both included.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Atom Economy"
        marks={3}
        statement={<>Calculate the atom economy in the production of pentan-1-ol from 1-bromopentane and a sodium salt.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Atom economy = mass of the <b>wanted product</b> ÷ total mass of <b>reactants</b>, × 100, using
            molar masses times the coefficients in your b.i equation. Three marks = three lines: the
            relationship, the substitution of the molar masses, the answer. Show all three — the report says
            consequential marks from a wrong b.i equation needed <b>full working</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The correct <b>relationship</b>: % atom economy = <b>mass of desired product ÷ total mass of reactants × 100</b> (or ÷ total mass of products).</> },
            { point: <>Correct <b>substitution of molar masses</b>: <b>88.0 ÷ (150.9 + 40.0) × 100</b>.</> },
            { point: <>Correct calculation: <b>46.1%</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Oxidation of Alcohols"
        marks={1}
        statement={
          <>
            Pentan-1-ol is fully oxidised to Compound S.
            <br />
            Write the IUPAC name of Compound S in the box provided above.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            A primary alcohol oxidises first to an aldehyde, then to a carboxylic acid. &ldquo;Fully
            oxidised&rdquo; means go to the end of that chain — the carboxylic acid, with the same five
            carbons. The mark is just the correct IUPAC name.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme source="ours" points={[{ point: <>The IUPAC name <b>pentanoic acid</b> (the <b>carboxylic acid</b> from full oxidation of a <b>primary alcohol</b>).</> }]} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Skeletal Formula"
        marks={1}
        statement={
          <>
            In an alternative reaction pathway, pentanamide can be formed from 1-bromopentane.
            <br />
            Draw the skeletal formula for pentanamide.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Two things to get right: the <b>amide group</b> (–CONH₂: C=O and NH₂ on the same end carbon)
            and the <b>skeletal</b> style (carbons as corners and ends, no C–H drawn, but O, N and the H
            atoms on N written in). &ldquo;Pentan-&rdquo; means five carbons in total, including the C=O
            carbon. Only 22% scored this mark; the report suggests students may have been challenged in
            identifying the amide group or drawing it skeletally.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A correct <b>skeletal formula</b>: a <b>five-carbon</b> chain ending in the <b>amide group</b> — <b>C=O</b> and <b>NH₂</b> on the same terminal carbon.</> }]}
        />
      </PartCard>
    </div>
  )
}
