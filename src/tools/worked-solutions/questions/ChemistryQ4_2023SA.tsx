// 2023 Chemistry Exam, Section B Question 4 (7 marks). A reaction pathway from but-1-ene:
// hydration to two alcohols (the type of reaction, and naming Compound Q, butan-2-ol), partial
// oxidation of Compound R (butan-1-ol) to butanal (Compound T), the amide formed from butanoic
// acid and ethanamine (Compound S), and the atom economy of making ethyl butanoate. Question text
// transcribed from the original paper; the reaction-pathway diagram is cropped from the original
// VCAA exam PDF; the structures of butanal and N-ethylbutanamide (used in the report comments and
// in our working) are cropped from the VCAA examination report. VCAA report only — no second
// source. The report itemises the marks for parts c. and d. (MarkScheme "vcaa"); parts a.i, a.ii
// and b. are one-mark answers with no itemisation, so those mark schemes are our reading. The
// "How to Think About It" notes and model answers are original. Molar masses (88.0, 46.0, 116.0,
// 18.0 g mol⁻¹) and the atom economy (86.567…%) checked in Python from Data Book atomic masses.
// Paper's "box provided on the diagram on page 20" becomes "box provided on the diagram above"
// (§12.3). No report slips. All content (addition reactions of alkenes, oxidation pathways to
// carboxylic acids via aldehydes, amide links, atom economy) is on the current study design.

import Chem from '../Chem'
import Katex from '../../../components/Katex'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import pathwaySrc from './chem-2023sa-q4-pathway.png'
import butanalSrc from './chem-2023sa-q4b-report-structure.png'
import amideSrc from './chem-2023sa-q4c-report-structure.png'

const stemBox =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

const butanalImg = (
  <img
    loading="lazy"
    decoding="async"
    src={butanalSrc}
    alt="Full structural formula of butanal: CH3–CH2–CH2–CHO with every C–H and C–C bond drawn and a C=O double bond on the end carbon, which also carries one H — from the 2023 VCAA examination report"
    className="w-full max-w-[260px] mt-1 bg-white rounded"
  />
)

const amideImg = (
  <img
    loading="lazy"
    decoding="async"
    src={amideSrc}
    alt="Skeletal formula of N-ethylbutanamide: a three-carbon zigzag joined to a carbon with a C=O double bond, bonded to an N–H, which is bonded to a two-carbon ethyl zigzag — from the 2023 VCAA examination report"
    className="w-full max-w-[260px] mt-1 bg-white rounded"
  />
)

const EXAM_AI: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: <>Addition or hydration</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <>Butan-2-ol or 2-butanol</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: butanalImg,
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 30, 20],
  average: 0.8,
  comment: (
    <>
      {amideImg}
      <br />
      The first mark was awarded for showing a correct amide linkage.
      <br />
      The second mark was awarded for the correct skeletal representation of the final molecule.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 20, 60],
  average: 1.5,
  comment: (
    <>
      The first mark was awarded for the % atom economy formula being applied:
      <br />
      <Katex tex="\dfrac{M(\textit{Desired product }(116))}{M(\textit{All reactants }(134))} \times 100" />
      <br />
      The second mark was awarded for the correct value of 86.6% (87% or 86.57%). This was not a
      significant figure question.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <><Chem eq="CH2=CHCH2CH3(g)" /> + <Chem eq="H2O(g)" /> → <Chem eq="C4H9OH(g)" /></>,
    reason: <>Water adds across the C=C double bond: an H goes on one carbon of the double bond and an –OH on the other. Two molecules join to make one, and <b>nothing is lost</b>.</>,
  },
  {
    working: <b>Addition (hydration) reaction</b>,
    reason: <>One reactant adds across a double bond with no other product, so this is an <b>addition</b> reaction; because the molecule added is water, it is more specifically called <b>hydration</b>. The report accepted either word. H₃PO₄ is only the catalyst.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>–OH on C1: <Chem eq="CH2(OH)CH2CH2CH3" /> = butan-1-ol (a <b>primary</b> alcohol)</>,
    reason: <>The double bond in but-1-ene is between C1 and C2, so the –OH can go on either of those two carbons. That is why there are two products.</>,
  },
  {
    working: <>–OH on C2: <Chem eq="CH3CH(OH)CH2CH3" /> = butan-2-ol (a <b>secondary</b> alcohol)</>,
    reason: <>The C bearing the –OH is bonded to two other carbons, so this alcohol is secondary.</>,
  },
  {
    working: <>R → butanoic acid, so R is the <b>primary</b> alcohol, butan-1-ol</>,
    reason: <>Only a <b>primary</b> alcohol is oxidised by H⁺/Cr₂O₇²⁻ to a <b>carboxylic acid</b>. A secondary alcohol is oxidised only as far as a ketone (butanone), never to butanoic acid.</>,
  },
  {
    working: <b>Compound Q: butan-2-ol</b>,
    reason: <>Q is the other product, the secondary alcohol. Write the IUPAC name with the locant before &ldquo;-ol&rdquo;; the report also accepted &ldquo;2-butanol&rdquo;. Writing butan-1-ol here swaps Q and R.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><Chem eq="CH3CH2CH2CH2OH" /> → <Chem eq="CH3CH2CH2CHO" /> → <Chem eq="CH3CH2CH2COOH" /></>,
    reason: <>A primary alcohol (–CH₂OH) is oxidised in two stages: first to an <b>aldehyde</b> (–CHO), then on to the <b>carboxylic acid</b> (–COOH). Complete oxidation gives butanoic acid; <b>incomplete</b> oxidation stops at the aldehyde.</>,
  },
  {
    working: <>Compound T is <b>butanal</b>, <Chem eq="CH3CH2CH2CHO" /></>,
    reason: <>Four carbons, as in R — oxidation changes the functional group, not the carbon chain. Not butanone: a ketone would come from a secondary alcohol, and R is primary.</>,
  },
  {
    working: butanalImg,
    reason: <>&ldquo;<b>Structural formula</b>&rdquo; means <b>every atom and every bond</b> drawn, including all the C–H bonds and the <b>C=O double bond</b>. The end carbon of an aldehyde carries the =O <b>and one H</b>. (Structure cropped from the VCAA report.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <><Chem eq="CH3CH2CH2COOH" /> + <Chem eq="CH3CH2NH2" /> → <Chem eq="CH3CH2CH2CONHCH2CH3" /> + <Chem eq="H2O" /></>,
    reason: <>A carboxylic acid and an amine react in a <b>condensation</b> reaction: the –OH from the –COOH and one H from the –NH₂ leave as water, and C bonds to N. This is the same reaction that joins amino acids in a protein.</>,
  },
  {
    working: <>New link: <b>amide linkage</b> –CO–NH–, i.e. C(=O)–N(H)</>,
    reason: <>Mark 1: a correct <b>amide linkage</b> — the carbonyl carbon bonded to N, with the N still carrying one H.</>,
  },
  {
    working: amideImg,
    reason: <>
      Mark 2: the whole molecule as a <b>skeletal</b> formula. Butanoic acid side: <b>4 carbons</b>{' '}
      (three line ends/vertices plus the C=O carbon). Ethanamine side: <b>2 carbons</b> on the N. In a
      skeletal formula each line end and vertex is a carbon and H on carbon is not drawn, but the{' '}
      <b>O, N and the H on N are shown</b>. Drawing every C and H (a structural formula) is not what was
      asked. (Structure cropped from the VCAA report; the compound is N-ethylbutanamide.)
    </>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <><Chem eq="CH3CH2CH2COOH" /> + <Chem eq="CH3CH2OH" /> → <Chem eq="CH3CH2CH2COOCH2CH3" /> + <Chem eq="H2O" /></>,
    reason: <>Esterification is a condensation: the acid and alcohol join and lose water. The desired product is the ester, ethyl butanoate (M = 116.0 g mol⁻¹, given). Water is the waste product.</>,
  },
  {
    working: <>M(<Chem eq="C4H8O2" />) = 4(12.0) + 8(1.0) + 2(16.0) = 88.0 g mol⁻¹</>,
    reason: <>Butanoic acid. Atomic masses from the Data Book&rsquo;s periodic table.</>,
  },
  {
    working: <>M(<Chem eq="C2H6O" />) = 2(12.0) + 6(1.0) + 16.0 = 46.0 g mol⁻¹</>,
    reason: <>Ethanol.</>,
  },
  {
    working: <>% atom economy = (M(desired product) / M(all reactants)) × 100</>,
    reason: <>Mark 1: the formula. Atom economy asks what fraction of the reactants&rsquo; atoms end up in the product you want. Each coefficient in the equation is 1, so add the molar masses once each.</>,
  },
  {
    working: <>% atom economy = (116.0 g mol⁻¹ / (88.0 + 46.0) g mol⁻¹) × 100 = (116.0 / 134.0) × 100</>,
    reason: <>Check: 116.0 + 18.0 (water) = 134.0, so mass is conserved — the reactant total is right.</>,
  },
  {
    working: <b>% atom economy = 86.6%</b>,
    reason: <>Mark 2: the value (86.567…% unrounded). The report says this was not a significant-figure question, so 87% or 86.57% also scored. Plausible: only a small water molecule is wasted, so the atom economy is high but below 100%.</>,
  },
]

export default function ChemistryQ4_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={stemBox}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (7 marks)</p>
        <p className="mb-3">The diagram below shows a reaction pathway starting with but-1-ene.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={pathwaySrc}
            alt="Reaction pathway: but-1-ene with H2O(g)/H3PO4(s) at 300 °C branches to Compound Q (empty box) and Compound R. Compound R with H+(aq)/Cr2O7 2−(aq) branches to Compound T and butanoic acid. Butanoic acid + ethanamine gives Compound S (empty box) — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <div className={stemBox}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">a.</p>
        <p>
          But-1-ene can react with water vapour at 300 °C with H₃PO₄(s) as a catalyst to produce two
          different products, Compound Q and Compound R. Only Compound R can react to produce butanoic acid.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Addition Reaction"
        marks={1}
        statement={<>Name the type of reaction that forms Compound Q and Compound R from but-1-ene.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Look at what goes in and what comes out: but-1-ene + water gives a single product (an
            alcohol) each time, with nothing else formed. A small molecule adding across a C=C double bond
            is an <b>addition</b> reaction — and when that molecule is water it is called{' '}
            <b>hydration</b>. One mark, one word.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Addition</b> or <b>hydration</b> (either word was accepted).</> }]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Naming Alcohols"
        marks={1}
        statement={<>Give the IUPAC name of Compound Q in the box provided on the diagram above.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Water can add across the C1=C2 double bond two ways, giving two different alcohols. The clue
            that tells them apart is &ldquo;Only Compound R can react to produce butanoic acid&rdquo;: only a{' '}
            <b>primary</b> alcohol oxidises to a carboxylic acid, so R is butan-1-ol and Q must be the{' '}
            <b>secondary</b> alcohol. Only half the cohort scored this mark; make sure you name Q (the
            secondary alcohol), not R.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Butan-2-ol</b> (or 2-butanol).</> }]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Partial Oxidation"
        marks={1}
        statement={
          <>
            As shown in the diagram, compound R can oxidise completely with acidified potassium dichromate
            solution, H⁺(aq)/Cr₂O₇²⁻(aq), to form butanoic acid. Compound R can also undergo incomplete
            oxidation to form Compound T.
            <br />
            Draw the structural formula of Compound T in the space below.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Oxidising a primary alcohol happens in two steps: alcohol → <b>aldehyde</b> → carboxylic acid.
            &ldquo;Completely&rdquo; gets you to the acid; &ldquo;incomplete&rdquo; stops halfway, at the
            aldehyde, butanal. Then read the instruction: a <b>structural</b> formula shows every atom and
            every bond, so the C–H bonds and the C=O must all be drawn.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A full <b>structural formula of butanal</b>: four carbons, all C–H bonds shown, with a <b>C=O</b> and an <b>H on the end carbon</b> (–CHO).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Amide Formation"
        marks={2}
        statement={
          <>
            Under certain conditions, butanoic acid reacts with ethanamine to produce Compound S.
            <br />
            Draw the skeletal formula for Compound S in the box provided on the diagram above.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            A carboxylic acid + an amine is a <b>condensation</b> reaction that makes an <b>amide</b>: lose
            H₂O, join C to N. Two marks, two separate things: the <b>amide linkage</b> –C(=O)–NH– itself,
            then the <b>whole molecule</b> drawn correctly as a <b>skeletal</b> formula (4 carbons from the
            acid, 2 from the amine). Only a fifth of students scored both, so count your carbons and check
            you drew skeletal, not structural.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A correct <b>amide linkage</b>: C=O carbon bonded to <b>N–H</b>.</> },
            { point: <>The correct <b>skeletal</b> representation of the whole molecule (N-ethylbutanamide: 4 C on the carbonyl side, 2 C on the N).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Atom Economy"
        marks={2}
        statement={
          <>
            Butanoic acid can also react with ethanol in the presence of a suitable catalyst to produce an
            ester. The molar mass of the ester produced is 116.0 g mol⁻¹.
            <br />
            Calculate the atom economy for this reaction.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Atom economy compares the mass of the product you want with the total mass of everything you
            put in, using molar masses from the balanced equation. Write the esterification equation first
            so you can see the reactants (butanoic acid and ethanol) and the waste (water). Two marks: the{' '}
            <b>formula</b> with the right numbers in it, then the <b>value</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>% atom economy formula</b> applied: <b>M(desired product) / M(all reactants) × 100</b> = 116 / 134 × 100.</> },
            { point: <>The correct value, <b>86.6%</b> (87% or 86.57% also accepted — not a significant-figure question).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
