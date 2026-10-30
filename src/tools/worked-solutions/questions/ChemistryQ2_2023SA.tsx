// 2023 Chemistry Exam, Section B Question 2 (12 marks). Lactose and the enzyme lactase: the
// glycosidic linkage in lactose, the glycaemic index (parts b.i and b.ii — not in the current
// study design), and the amino acid proline: why it is not essential (c.i — not in the current
// study design), its structure in acidic solution, the enzyme-catalysed reactions it takes part
// in, why it has two optical isomers, and why lactase needs the correct isomer.
// Question text transcribed from the original paper. The lactose reaction is cropped from the
// original VCAA exam PDF; proline's structure is cropped from the 2026 Data Book (item 19,
// 2-amino acids); the sample structure for c.ii is cropped from the 2023 VCAA examination report.
// Mark allocations are from the VCAA examination report, which itemises the marks for c.ii–c.v;
// part a.'s mark scheme is our reading. The "How to Think About It" notes, model answers and
// working are original. VCAA report only — no second source.
// The 2023 report prints its mark distributions as proportions (0.2, 0.8); they are shown here as
// percentages. Its c.iii row (0.5, 0.2, 0.4) sums to 1.1 and its average 0.9 sits below the
// 1.0 those rows give; c.v (0.6, 0.2, 0.2) gives 0.6 against a printed 0.7, and excluded c.i
// (0.2, 0.8) gives 0.8 against 0.9 — rounding in the report, kept as printed.
// Study design: b.i and b.ii (glycaemic index) and c.i (essential amino acids) are old-study-design
// nutrition content, skipped as the skip guide does for 2017 MCQ 25 (GI) and 2017 SAQ3c
// (essential amino acids). Part a. (naming the glycosidic linkage) is written up — the current
// study design covers hydrolysis and condensation of carbohydrates but does not name the linkage —
// borderline, flagged for KZ.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import reactionSrc from './chem-2023sa-q2-lactose-reaction.png'
import prolineSrc from './chem-2023sa-q2c-proline-databook.png'
import reportStructSrc from './chem-2023sa-q2cii-report-structure.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

const EXAM_A: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: <>Glycosidic link</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [60, 40],
  average: 0.4,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Two acceptable structures of protonated proline: the five-membered ring with the nitrogen carrying two hydrogens and a positive charge and the COOH group unchanged, drawn once with COOH condensed and once with the C=O and OH shown — from the 2023 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
      <br />
      To gain this mark, students must have shown the correct number of hydrogens on the nitrogen atom and
      the nitrogen atom must also be shown with an associated positive charge.
      <br />
      A mark was not awarded if the charge was associated with the hydrogens in this structure.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [50, 20, 40],
  average: 0.9,
  comment: (
    <>
      Any two of the following statements were awarded marks.
      <br />
      Proline can:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>undergo condensation reactions to form proteins/enzymes</li>
        <li>be formed from hydrolysis reactions of proteins/enzymes</li>
        <li>undergo oxidation reactions as it is broken down into smaller molecules.</li>
      </ul>
    </>
  ),
}

const EXAM_CIV: SAExaminerStats = {
  marks: [50, 20, 30],
  average: 0.8,
  comment: (
    <>
      The first mark was awarded for recognition that proline contains a chiral carbon.
      <br />
      The second mark was awarded when the student did one of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>identified the chiral carbon in the molecule</li>
        <li>described how it could be identified by having four different groups attached</li>
        <li>stated that the two optical isomers formed were non-superimposable mirror images (enantiomers).</li>
      </ul>
    </>
  ),
}

const EXAM_CV: SAExaminerStats = {
  marks: [60, 20, 20],
  average: 0.7,
  comment: (
    <>
      The first mark was awarded for recognition that the incorrect optical isomer of proline would alter the
      primary structure of the enzyme (wrong conformation) and cause the active site of <i>lactase</i> to change
      shape.
      <br />
      The second mark was awarded for recognition that with a changed active site in the <i>lactase</i>, the
      lactose substrate would then no longer have the correct conformation/shape to match. Hence the lactose in
      milk would not be as effectively digested.
      <br />
      A significant number of students failed to distinguish that the proline was part of the primary amino acid
      sequence of the enzyme and instead referred to proline as the substrate in this reaction.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>The circled O joins the two ring units: C–O–C.</>,
    reason: <>Look at what the circled atom connects. It is an oxygen bonded to a carbon of the left ring <i>and</i> a carbon of the right ring — the bridge between two monosaccharide units.</>,
  },
  {
    working: <b>glycosidic linkage (glycosidic bond)</b>,
    reason: <>The C–O–C link that joins monosaccharides in a disaccharide or polysaccharide is called a <b>glycosidic</b> linkage. It forms by <b>condensation</b> (water released) and is broken by <b>hydrolysis</b> (water added) — which is why reactant X is water (H₂O), and lactose splits into its two monosaccharides (glucose and galactose):{' '}
      <Chem eq="C12H22O11 + H2O -> C6H12O6 + C6H12O6" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: (
      <img
        loading="lazy"
        decoding="async"
        src={prolineSrc}
        alt="Proline as drawn in the Data Book: a five-membered ring containing an N–H, with a COOH group on the ring carbon next to the nitrogen — cropped from the 2026 VCE Chemistry Data Book"
        className="w-full max-w-[160px] bg-white rounded"
      />
    ),
    reason: <>Start from proline as the Data Book draws it (item 19, 2-amino acids). Find the two groups that can gain or lose H⁺: the <b>amine</b> N–H in the ring (a base) and the <b>carboxyl</b> COOH (an acid).</>,
  },
  {
    working: <>In acid, the amine N <b>accepts an H⁺</b>: N–H becomes <b>NH₂⁺</b> (two H on N, positive charge on N).</>,
    reason: <>An acidic solution has excess H₃O⁺, so the basic nitrogen is <b>protonated</b>. Proline&rsquo;s N already carries one H and is bonded to two ring carbons, so after protonation it has <b>exactly two</b> H — not NH₃⁺, which would need a third H the ring N doesn&rsquo;t have.</>,
  },
  {
    working: <>The carboxyl group stays as <b>–COOH</b> (not COO⁻).</>,
    reason: <>With so much H⁺ around, the acid group stays un-ionised. COO⁻ with a neutral N–H is the form in basic solution, and COO⁻ with NH₂⁺ together is the zwitterion — neither is the acidic form.</>,
  },
  {
    working: (
      <>
        <img
          loading="lazy"
          decoding="async"
          src={reportStructSrc}
          alt="Protonated proline drawn two acceptable ways: the ring nitrogen with two hydrogens and a positive charge, and an unchanged COOH group — cropped from the 2023 VCAA examination report"
          className="w-full max-w-[360px] bg-white rounded"
        />
      </>
    ),
    reason: <>Either drawing earns the mark. The + must sit on the <b>nitrogen</b> — the report did not award the mark when the charge was drawn on the hydrogens. These are VCAA&rsquo;s structures from the report.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <>1. <b>Condensation</b> (polymerisation): proline joins with other amino acids by forming <b>peptide (amide) bonds</b>, <b>releasing water</b>, to make proteins such as enzymes.</>,
    reason: <>Mark 1: one reaction type, named. Building a protein is condensation — every new peptide link gives off one H₂O.</>,
  },
  {
    working: <>2. <b>Hydrolysis</b>: proteins containing proline are broken down, with <b>water added</b> across the peptide bonds, to release proline as a free amino acid (for example during digestion).</>,
    reason: <>Mark 2: a second, different reaction type. Hydrolysis is the reverse of condensation. The report also accepted <b>oxidation</b> of proline as it is broken down into smaller molecules — any two of the three earned both marks.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <>Proline contains a <b>chiral carbon</b> — the ring carbon bonded to the COOH group.</>,
    reason: <>Mark 1: name the cause. A molecule has optical isomers when it has a chiral centre.</>,
  },
  {
    working: <>That carbon has <b>four different groups</b> attached: –H, –COOH, the ring –NH–, and the ring –CH₂–.</>,
    reason: <>Mark 2 (one way to earn it): say why it is chiral. The two ring bonds count as different groups because one leads straight to N and the other to a CH₂ — going round the ring each way meets different atoms.</>,
  },
  {
    working: <>So proline exists as two <b>non-superimposable mirror images</b> (<b>enantiomers</b>) — its two optical isomers.</>,
    reason: <>Swapping any two groups on the chiral carbon gives the mirror image, which cannot be laid on top of the original. Locating the chiral carbon, the four-different-groups test, or this statement each earned the second mark.</>,
  },
]

const ROWS_CV: WorkingRow[] = [
  {
    working: <>Proline is one of the amino acids in lactase&rsquo;s <b>primary structure</b> (its amino acid sequence); proline is not the substrate — <b>lactose</b> is.</>,
    reason: <>Get the roles right first. The report says many students treated proline as the substrate; here proline is a <i>building block of the enzyme</i>.</>,
  },
  {
    working: <>The wrong optical isomer has its groups arranged differently in 3D, so the chain would <b>fold differently</b> (a different <b>tertiary structure</b>), and the <b>shape of the active site would change</b>.</>,
    reason: <>Mark 1: the wrong isomer changes the enzyme&rsquo;s conformation and so its <b>active site</b>. (The report words this as altering the primary structure, giving the wrong conformation.)</>,
  },
  {
    working: <>Lactose would then <b>no longer fit the active site</b> (its shape would no longer be <b>complementary</b>), so lactase could not catalyse the <b>hydrolysis of lactose</b> and the lactose in milk would not be digested effectively.</>,
    reason: <>Mark 2: link the changed active site to the <b>substrate</b> — lactose — no longer matching it, and so to the consequence for digesting milk.</>,
  },
]

export default function ChemistryQ2_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (12 marks)</p>
        <p className="mb-3">
          Cow&rsquo;s milk contains proteins, fats and carbohydrates. The main carbohydrate in cow&rsquo;s milk is
          lactose.
          <br />
          The reaction for the breakdown of lactose is catalysed by the enzyme lactase as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
          <img
            loading="lazy"
            decoding="async"
            src={reactionSrc}
            alt="α-lactose (two six-membered sugar rings joined through an oxygen atom, which is circled with a dashed line) plus reactant X, with lactase written over the arrow, gives two separate six-membered sugar rings — from the original 2023 VCAA exam paper"
            className="w-full max-w-[640px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Glycosidic Linkage"
        marks={1}
        statement={
          <>
            A linkage has been circled with a dashed line in the lactose molecule shown above.
            <br />
            Name the circled linkage.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            One mark, one name. Lactose is a <b>disaccharide</b>: two monosaccharide rings joined by a single
            oxygen bridge. The link between sugar units has its own specific name, <b>glycosidic</b> — the
            marker wants that name, not a general one like &ldquo;ether&rdquo;, and not &ldquo;ester&rdquo; or
            &ldquo;peptide&rdquo; (the links in fats and proteins).
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Glycosidic</b> link (linkage/bond).</> }]}
        />
      </PartCard>

      <PartCard letter="b.i" topic="Glycaemic Index" marks={2} statement={<>Explain what the GI of a food indicates.</>}>
        <Background title="Not in the Current Study Design" always>
          <p>
            The <b>glycaemic index (GI)</b> belonged to the old study design&rsquo;s food chemistry content and is
            not in the 2024–2027 study design, so this part is left without a worked solution; the skip guide
            skips GI in 2017 MCQ 25.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Glycaemic Index"
        marks={1}
        statement={<>State why the breakdown of lactose, as shown above, contributes to the GI of lactose.</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part b.ii. also asks about the <b>glycaemic index</b>, which is not in the 2024–2027 study design, so it
            is left without a worked solution. (The chemistry behind it — hydrolysis of lactose into glucose and
            galactose — is covered in part a.)
          </p>
        </Background>
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">c.</p>
        <p>
          Proline is found both in cow&rsquo;s milk and in the enzyme lactase. Proline is not an essential amino
          acid.
          <br />
          The structure of proline is shown in the data book.
        </p>
      </div>

      <PartCard letter="c.i" topic="Essential Amino Acids" marks={1} statement={<>State why proline is not an essential amino acid.</>}>
        <Background title="Not in the Current Study Design" always>
          <p>
            <b>Essential amino acids</b> (ones the body cannot make, so they must come from the diet) were part of
            the old study design&rsquo;s nutrition content and are not in the 2024–2027 study design, so this part
            is left without a worked solution; the skip guide skips the same idea in 2017 SAQ3c.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Amino Acids and pH"
        marks={1}
        statement={<>Draw the structure of proline as it would be in an acidic solution.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Acidic solution&rdquo; means plenty of H⁺: every group that can accept H⁺ does, and the acid
            group keeps its H. So only the <b>amine nitrogen</b> changes — it gains one H⁺ and a positive charge.
            The trap is proline itself: unlike other amino acids its N sits in a ring with only one H, so the
            protonated form is <b>NH₂⁺</b>, not NH₃⁺. The report needed the right number of H on N and the
            charge on the N, not on the hydrogens.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>correct number of hydrogens on the nitrogen</b> (two) <b>and</b> a <b>positive charge on the nitrogen</b> atom (both of the report&rsquo;s structures keep the COOH unchanged). A charge drawn on the hydrogens was not awarded the mark.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Hydrolysis and Condensation"
        marks={2}
        statement={
          <>
            Proline is found in proteins throughout the human body.
            <br />
            Identify <b>two</b> types of enzyme-catalysed chemical reactions involving proline in the human body.
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two <i>reaction types</i>. Think about the life of an amino acid in the body: it is
            joined into proteins and released again when proteins are broken down. Name each as a type of reaction
            — <b>condensation</b> and <b>hydrolysis</b> — and say what it does, rather than naming a process like
            &ldquo;digestion&rdquo; on its own.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: <b>condensation</b> reactions to form proteins/enzymes; <b>hydrolysis</b> reactions of proteins/enzymes that form proline; <b>oxidation</b> reactions as proline is broken down into smaller molecules.</> },
            { point: <>A <b>second, different</b> statement from the same list.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.iv"
        topic="Optical Isomers"
        marks={2}
        statement={<>Explain why proline has two optical isomers.</>}
        examinerReport={EXAM_CIV}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Explain why&rdquo; for 2 marks: give the cause, then back it up. The cause is a <b>chiral
            carbon</b>; the back-up is <i>why</i> it is chiral (four different groups) or what that produces (two
            non-superimposable mirror images). The ring can make the four groups hard to see — the two ring
            bonds from that carbon are different groups because one goes to N and the other to CH₂.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIV} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Proline contains a <b>chiral carbon</b>.</> },
            { point: <>One of: <b>identifies the chiral carbon</b>; explains it has <b>four different groups</b> attached; states the two isomers are <b>non-superimposable mirror images (enantiomers)</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.v"
        topic="Enzyme Structure"
        marks={2}
        statement={
          <>
            Only one of proline&rsquo;s optical isomers is found in lactase.
            <br />
            Explain why lactase must contain the correct optical isomer of proline to function as an enzyme in the
            digestion of cow&rsquo;s milk.
          </>
        }
        examinerReport={EXAM_CV}
      >
        <Background title="How to Think About It">
          <p>
            Sort out who is who: lactase is the <b>enzyme</b> (a protein), proline is one of the amino acids
            <i> inside</i> it, and lactose is the <b>substrate</b>. The report says many students called proline
            the substrate. The two marks are a chain: wrong isomer → enzyme folds differently, so the{' '}
            <b>active site changes shape</b> (mark 1) → lactose no longer fits, so it is not hydrolysed/digested
            (mark 2).
          </p>
        </Background>
        <WorkingTable rows={ROWS_CV} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The incorrect optical isomer of proline would alter the enzyme&rsquo;s structure (<b>wrong conformation</b>) and cause the <b>active site</b> of lactase to <b>change shape</b>.</> },
            { point: <>With a changed active site, the <b>lactose substrate</b> would <b>no longer match</b> its shape, so lactose in milk would <b>not be digested</b> as effectively.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
