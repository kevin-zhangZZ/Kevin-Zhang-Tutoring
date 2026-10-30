// 2024 Chemistry Exam, Section B Question 2 (8 marks). An organic reaction pathway: pentane →
// 1-chloropentane (substitution) → pentan-1-ol → pentanoic acid, and propene → propan-1-ol, then
// esterification to propyl pentanoate. Question text transcribed from the original paper (the
// 2024 paper has no extractable text, so it was read from rendered pages); the pathway diagram
// is cropped from the original VCAA exam PDF, and the skeletal structure in part d.ii is cropped
// from the VCAA examination report. The report's table of accepted tests (d.i) is transcribed.
// Mark allocations: the report itemises d.i's two marks and states the single required answer
// for the one-mark parts; d.ii's split is our reading. Worked solutions, "How to Think About It"
// notes and model answers are original. VCAA report only — no second source. Formulas and
// carbon counts checked in Python. The report's IR entry in d.i gives C=O "at around 1800 cm⁻¹";
// the Data Book's range for C=O (acids) is 1680–1740 cm⁻¹ — kept verbatim, noted in the working.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import pathwaySrc from './chem-2024sa-q2-pathway.png'
import esterSrc from './chem-2024sa-q2dii-report-structure.png'

// Chem turns a free-standing " + " into a superscript, so equations are split on " + " and each
// species rendered by Chem, with the plus signs as plain text.
function Rx({ eq }: { eq: string }) {
  return <>{eq.split(' + ').map((p, i) => <span key={i}>{i > 0 && ' + '}<Chem eq={p} /></span>)}</>
}

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-top'

const EXAM_AI: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      C₅H₁₂
      <br />
      Students should be aware that they should not provide &lsquo;working out&rsquo; material in the
      response boxes provided as this can invalidate a correct response.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: <>The type of reaction is a substitution reaction.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Any valid semi-structural representation of pentan-1-ol. Typical examples of acceptable forms are:
      <br />
      CH₃CH₂CH₂CH₂CH₂OH &nbsp;&nbsp;or&nbsp;&nbsp; CH₃(CH₂)₄OH &nbsp;&nbsp;or&nbsp;&nbsp; CH₃(CH₂)₃CH₂OH
      <br />
      Students should be aware that a representation such as &lsquo;OHCH₂CH₂CH₂CH₂CH₃&rsquo; is an
      incorrect representation of a terminal hydroxyl group.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      Either propan-1-ol or 1-propanol were acceptable responses. Both of these follow IUPAC
      nomenclature conventions.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [34, 16, 50],
  average: 1.2,
  comment: (
    <>
      Any of the following qualitative tests were accepted for the first mark.
      <br />
      The second mark was associated with the correct observation applicable to the test chosen.
      <table className="my-2 text-[13px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <tbody>
          <tr><td className={`${td} font-semibold`}>Test</td><td className={`${td} font-semibold`}>Observation</td></tr>
          <tr><td className={td}>pH test using a pH meter</td><td className={td}>pH would be shown as less than 7</td></tr>
          <tr><td className={td}>pH testing using an indicator / pH paper*</td><td className={td}>Correct colour observation stated</td></tr>
          <tr><td className={td}>Adding any metal carbonate (carbonate test)</td><td className={td}>Bubbles forming</td></tr>
          <tr><td className={td}>Adding an alcohol and sulfuric acid (esterification)</td><td className={td}>Distinct smell being formed**</td></tr>
          <tr><td className={td}>Adding a group 2 metal***</td><td className={td}>Bubbles forming</td></tr>
          <tr><td className={td}>IR spectroscopy</td><td className={td}>Both the O-H bond at 2500–3500 cm⁻¹ and the C=O at around 1800 cm⁻¹</td></tr>
        </tbody>
      </table>
      <i>* The indicator must be able to undergo a distinct colour change at a pH less than 7.</i>
      <br />
      <i>
        ** Normally the smell is described as &lsquo;sweet&rsquo; or &lsquo;fruity&rsquo;, but any
        &lsquo;smell&rsquo; was accepted as a significant number of students would have manufactured
        biodiesel as part of their laboratory work and biodiesels do not have this type of
        &lsquo;fruity&rsquo; smell.
      </i>
      <br />
      <i>
        *** Group 1 metals were not accepted as these produce gas if any labile hydrogen is present, and
        therefore cannot be used to identify the compound specifically as a carboxylic acid.
      </i>
      <br />
      <br />
      Incorrect responses such as &lsquo;limewater test&rsquo; could not be awarded marks as this tests
      the product of the reaction between a carboxylic acid and a metal carbonate, not the carboxylic
      acid itself. The addition of an acid to limewater produces a salt and water, which cannot be
      observed.
      <br />
      In order to gain these marks for the limewater test, the student needed to indicate that the
      unknown organic compound had to be reacted with a metal carbonate first, and the gas produced then
      tested using the limewater test to confirm the presence of carbon dioxide being evolved.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [23, 17, 60],
  average: 1.4,
  comment: (
    <>
      A clear skeletal diagram was required as represented below.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={esterSrc}
        alt="Skeletal structure of propyl pentanoate: a four-carbon zigzag chain joined to a carbon bearing a double-bonded O below and a single-bonded O, which connects to a three-carbon zigzag chain — from the VCAA examination report"
        className="w-full max-w-[300px] my-2 bg-white"
      />
      The only significant issue that arose from this question related to the fact that some students
      did not use the box provided on page 14 (as specified in the question) and instead provided their
      response in the blank space at the bottom of page 15. Students are reminded to provide responses in
      the correct location on the examination.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>1-chloropentane = 5 C chain with Cl on C1, so Compound E has <b>5 carbons</b></>,
    reason: <>Work backwards from the product you are given. &ldquo;pent-&rdquo; means five carbons; substituting Cl for H does not change the carbon skeleton.</>,
  },
  {
    working: <>E is a <b>hydrocarbon</b> that reacts with Cl₂ in UV light → an <b>alkane</b>, C<sub>n</sub>H<sub>2n+2</sub></>,
    reason: <>Cl₂ with UV light is the condition for substitution into an <b>alkane</b>. (An alkene would react with Cl₂ by addition, with no UV needed, and give a <i>di</i>chloro product.)</>,
  },
  {
    working: <b>Compound E: <Chem eq="C5H12" /></b>,
    reason: <>n = 5: 2(5) + 2 = 12 H. This is pentane. The question asks for the <b>molecular</b> formula, so write only C₅H₁₂ in the box — the report warns that working written in the answer box can invalidate a correct response.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  { working: <><Rx eq="C5H12(g) + Cl2(g) -> C5H11Cl(l) + HCl(g)" /> (UV light)</>, reason: <>One H atom on the alkane is <b>replaced</b> by one Cl atom; the H that leaves forms HCl.</> },
  { working: <b>Substitution reaction</b>, reason: <>One atom swapped for another = <b>substitution</b>. Not &ldquo;addition&rdquo; — pentane has no double bond to add across, and the HCl by-product shows something left the molecule.</> },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><Rx eq="CH3CH2CH2CH2CH2Cl(l) + OH-(aq) -> CH3CH2CH2CH2CH2OH(aq) + Cl-(aq)" /></>,
    reason: <>NaOH(aq) supplies OH⁻, which <b>substitutes</b> for the Cl on a haloalkane, giving an <b>alcohol</b>. The OH goes exactly where the Cl was — on C1 — so L is pentan-1-ol.</>,
  },
  {
    working: <b>Compound L: <Chem eq="CH3CH2CH2CH2CH2OH" /> &nbsp;(or <Chem eq="CH3(CH2)4OH" />)</b>,
    reason: <>
      Check it fits the next step: K₂Cr₂O₇/H⁺ oxidises a <b>primary alcohol</b> to a <b>carboxylic acid</b>, and pentan-1-ol → pentanoic acid keeps all five carbons. ✓
      <br />
      Write the formula so the OH is written <b>after</b> the carbon it is bonded to (…CH₂OH). The report marks &lsquo;OHCH₂CH₂CH₂CH₂CH₃&rsquo; as <b>wrong</b>: written that way the H sits between the O and the chain, as if the carbon were bonded to H rather than to O. If the OH comes first, write it HO– (HOCH₂…).
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  { working: <><Rx eq="CH2=CHCH3(g) + H2O(g) -> CH3CH2CH2OH(g)" /> (H₃PO₄ catalyst)</>, reason: <>C₃H₆ is <b>propene</b>. Water <b>adds across the C=C double bond</b> (an addition reaction), putting H on one carbon and OH on the other.</> },
  { working: <>OH on an <b>end</b> carbon (C1) → primary alcohol</>, reason: <>Adding water to propene can put the OH on C1 or on C2, giving a mixture of propan-1-ol and propan-2-ol. The stem says M is <b>primary</b> (OH carbon bonded to only one other carbon), so the OH is on C1.</> },
  { working: <b>Compound M: propan-1-ol</b>, reason: <>&ldquo;1-propanol&rdquo; was also accepted. Not &ldquo;propanol&rdquo; alone (doesn&rsquo;t say where the OH is) and not propan-2-ol (a secondary alcohol). The question asks for the IUPAC <b>name</b>, not a formula.</> },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <>Add <b>sodium carbonate</b> (a <b>metal carbonate</b>, Na₂CO₃) to a sample of pentanoic acid.</>,
    reason: <>Mark 1: a <b>test</b> that picks out the <b>carboxyl group</b> (–COOH). A carboxylic acid is an acid, so it reacts with a carbonate; alcohols do not.</>,
  },
  {
    working: <><Rx eq="2CH3(CH2)3COOH(aq) + Na2CO3(aq) -> 2CH3(CH2)3COONa(aq) + H2O(l) + CO2(g)" /></>,
    reason: <>Not needed for the marks, but it shows <i>why</i> you see what you see: the acid produces <b>carbon dioxide gas</b>.</>,
  },
  {
    working: <>Observation: <b>effervescence</b> — <b>bubbles of gas</b> (CO₂) are produced.</>,
    reason: <>Mark 2: the <b>observation</b> must match the test you chose. Say what you would <i>see</i> (bubbles), not just &ldquo;CO₂ forms&rdquo;.</>,
  },
  {
    working: <>(Alternatives: <b>pH meter</b> → <b>pH less than 7</b>; <b>blue litmus</b> → turns <b>red</b>.)</>,
    reason: <>
      Any accepted test works if its observation is right — see the report&rsquo;s table. Traps the report names: <b>limewater on its own</b> scores nothing (an acid added to limewater gives no visible change; limewater only tests the CO₂ <i>after</i> a carbonate has reacted), and a <b>group 1 metal</b> such as sodium was not accepted because alcohols fizz with it too. For the IR option, use the Data Book ranges: O–H (acids) 2500–3500 cm⁻¹ <i>and</i> C=O (acids) 1680–1740 cm⁻¹ (the report&rsquo;s &ldquo;around 1800&rdquo; is approximate).
    </>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <><Rx eq="CH3(CH2)3COOH(l) + CH3CH2CH2OH(l) <=> CH3(CH2)3COOCH2CH2CH3(l) + H2O(l)" /> (conc. H₂SO₄)</>,
    reason: <><b>Esterification</b> (a condensation reaction): the acid&rsquo;s –OH and the alcohol&rsquo;s –H leave as water, and the two molecules join through an <b>ester link, –COO–</b>.</>,
  },
  {
    working: <>Acid side: <b>pentanoate</b>, 5 C (including the C=O carbon) · Alcohol side: <b>propyl</b>, 3 C · N = <b>propyl pentanoate</b>, C₈H₁₆O₂</>,
    reason: <>Count the carbons from each parent so none are lost or added: 5 from pentanoic acid + 3 from propan-1-ol (part c) = 8.</>,
  },
  {
    working: (
      <>
        <img
          loading="lazy"
          decoding="async"
          src={esterSrc}
          alt="Skeletal structure of propyl pentanoate — from the VCAA examination report"
          className="w-full max-w-[300px] bg-white"
        />
      </>
    ),
    reason: <>
      Skeletal structure (cropped from the VCAA report): every line end and corner is a carbon, and H atoms on carbon are not drawn. From the left: 4 carbons in a zigzag, then the <b>carbonyl carbon</b> with <b>=O</b> drawn as a double line, then the single-bonded <b>O</b>, then 3 carbons. Draw the O atoms as letters; don&rsquo;t write C or H on the skeleton.
      <br />
      Draw it <b>in the Compound N box</b> — the report notes some students drew it in the blank space below the question instead of in the box.
    </>,
  },
]

export default function ChemistryQ2_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (8 marks)</p>
        <p className="mb-3">A reaction pathway begins with a hydrocarbon, Compound E.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={pathwaySrc}
            alt="Reaction pathway: Compound E (box) reacts with Cl₂(g)/UV light to give 1-chloropentane, which reacts with NaOH(aq) to give Compound L (box); L reacts with K₂Cr₂O₇(aq)/H⁺(aq) to give pentanoic acid. Separately C₃H₆ reacts with H₂O(g)/H₃PO₄ to give Compound M (box). Pentanoic acid and Compound M react with H₂SO₄(l) to give Compound N (box) — from the original 2024 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Molecular Formula"
        marks={1}
        statement={<>Write the molecular formula of Compound E in the box provided above.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Pathway questions are solved by reading the arrows in <b>both directions</b>. Here you know the
            product (1-chloropentane) and the conditions (Cl₂, UV light), so work backwards: what hydrocarbon
            gives a five-carbon chloroalkane by swapping one H for Cl? One mark, one formula — and only the
            formula goes in the box.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme source="vcaa" points={[{ point: <><b>C₅H₁₂</b> (pentane), with no working written in the answer box.</> }]} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Reaction Type"
        marks={1}
        statement={<>State the type of reaction that produces 1-chloropentane from Compound E.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Name the reaction by what happens to the molecule: an alkane with Cl₂ in UV light has one H
            <b> replaced</b> by Cl. Compare that with the other types you know — addition needs a double bond,
            condensation releases water.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Substitution</b> reaction.</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Haloalkane to Alcohol"
        marks={1}
        statement={
          <>
            1-chloropentane is reacted with NaOH to produce Compound L.
            <br />
            Write the semi-structural formula for Compound L in the box provided above.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            A haloalkane with NaOH(aq) is another <b>substitution</b>: OH⁻ replaces the halogen, giving a
            <b> primary alcohol</b> when the Cl was on the end carbon. The arrow that follows (oxidation to
            pentanoic acid) confirms it. The mark is lost on <i>how</i> it is written: the report rejects a
            formula that starts with &ldquo;OH…&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Any valid <b>semi-structural formula of pentan-1-ol</b>: <b>CH₃CH₂CH₂CH₂CH₂OH</b>, CH₃(CH₂)₄OH or CH₃(CH₂)₃CH₂OH. &lsquo;OHCH₂CH₂CH₂CH₂CH₃&rsquo; was <b>not</b> accepted.</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Alkene Hydration"
        marks={1}
        statement={
          <>
            C₃H₆ reacts with H₂O in the presence of a H₃PO₄ catalyst to produce Compound M, which is a primary
            alcohol.
            <br />
            Write the IUPAC name of Compound M in the box provided above.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Water with an acid catalyst <b>adds across the double bond</b> of propene to make an alcohol. That
            could give two isomers, and the stem tells you which one: <b>primary</b>, so the OH is on an end
            carbon. The answer is a <b>name</b>, and it must show the OH&rsquo;s position.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Propan-1-ol</b> (or <b>1-propanol</b>).</> }]} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">d.</p>
        <p>
          Pentanoic acid is reacted with Compound M to form Compound N in the presence of concentrated
          sulfuric acid, H₂SO₄(l).
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Carboxyl Group Test"
        marks={2}
        statement={<>State a qualitative test to detect the presence of the functional group in pentanoic acid, and state the expected observation(s).</>}
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            The functional group is the <b>carboxyl group</b>, –COOH, which makes pentanoic acid an
            <b> acid</b>. Two marks means two separate things: <b>name the test</b> (what you add or do) and
            <b> state what you would observe</b> for that test. Choose a test that responds to the carboxyl
            group itself — the report gave no marks for &ldquo;limewater test&rdquo; on its own, because
            limewater detects CO₂, not the acid.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A valid <b>test</b> for the carboxyl group: e.g. <b>add a metal carbonate</b> (carbonate test), pH meter, indicator / pH paper, an alcohol + H₂SO₄ (esterification), a group 2 metal, or IR spectroscopy.</> },
            { point: <>The <b>correct observation for that test</b>: e.g. <b>bubbles (effervescence)</b> with a carbonate, <b>pH less than 7</b>, the indicator&rsquo;s acid colour, a distinct (fruity) <b>smell</b>, or both the <b>O–H and C=O</b> IR absorptions.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Ester Structure"
        marks={2}
        statement={<>Draw the skeletal structure of Compound N in the box provided above.</>}
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            A carboxylic acid + an alcohol with concentrated H₂SO₄ is <b>esterification</b>, so N is an
            <b> ester</b>: pentanoic acid (part d) joined to propan-1-ol (part c). Build it in two halves joined
            by the <b>–COO– link</b>, then draw it as a <b>skeletal</b> structure — carbons as corners and line
            ends, no C or H labels, O atoms written in. The report&rsquo;s only issue was students drawing it
            outside the Compound N box.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A correct <b>ester functional group</b>: the carbonyl carbon with <b>C=O</b> and a single-bonded <b>O</b> linking the two chains.</> },
            { point: <>Correct <b>carbon chains</b> in <b>skeletal</b> form: <b>4 C + the carbonyl C</b> from pentanoic acid and <b>3 C (propyl)</b> from propan-1-ol — propyl pentanoate, drawn in the Compound N box.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
