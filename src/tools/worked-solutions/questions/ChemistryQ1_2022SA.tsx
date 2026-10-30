// 2022 Chemistry Exam, Section B Question 1 (7 marks). An organic reaction pathway: addition of
// HCl(g) to but-1-ene gives two unbranched isomers (1-chlorobutane, Compound A; 2-chlorobutane,
// Compound B); substitution of A by a hydroxide gives butan-1-ol; then the esterification of
// propan-1-ol with methanoic acid (catalyst, equation, IUPAC name of propyl methanoate).
// Question text transcribed from the original paper; the reaction-pathway diagram is cropped from
// the original VCAA exam PDF. Mark distributions, averages and comments are from the VCAA
// examination report (VCAA report only — no second source); the "How to Think About It" notes,
// model answers and mark schemes are original (only part d.ii's marks are itemised by VCAA).
// All content is on the current (2024–2027) study design: addition reactions of alkenes,
// substitution to give primary alcohols, esterification.
// Report slips kept verbatim and explained in the working:
//  - 1c: the report prints an average of 0.4, but 63% scoring 1 mark gives 0.6.
//  - 1c: "H₂O is not a sufficiently powerful addition reagent" — the A → alcohol step is a
//    substitution, not an addition.
//  - 1d.ii: "2-butanol, which was formed in the previous part" — the alcohol formed earlier in the
//    question is butan-1-ol (1-butanol); 2-butanol is not formed anywhere in the question.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import pathwaySrc from './chem-2022sa-q1-pathway.png'

const EXAM_A: SAExaminerStats = {
  marks: [36, 64],
  average: 0.6,
  comment: <>Addition</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      CH₃CHClCH₂CH₃
      <br />
      A clear attempt at providing the correct semi-structural representation of 2-chlorobutane was required.
      <br />
      A very common mistake occurred when students provided the structure of 1-chlorobutane, which cannot be
      formed from the specified reaction.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 63],
  average: 0.4,
  comment: (
    <>
      NaOH or KOH
      <br />
      Any soluble metal hydroxide was accepted. It should be noted that H₂O is not a sufficiently powerful
      addition reagent for this reaction to proceed at an appreciable rate.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      H₂SO₄ or H₃PO₄
      <br />
      Students must be aware that the concentrated or pure forms of these reagents are required, hence any
      reference to (aq) was not accepted.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [36, 24, 40],
  average: 1.0,
  comment: (
    <>
      CH₃CH₂CH₂OH + HCOOH → HCOOCH₂CH₂CH₃ + H₂O
      <br />
      One mark was awarded for the correct identification of the reactants. The second mark was awarded for
      the correct formation of products based on the reactants used.
      <br />
      Use of equilibrium arrows was accepted, and states were not assessed in this question.
      <br />
      Students sometimes chose the incorrect alcohol and therefore based their response on 2-butanol, which
      was formed in the previous part of Question 1. Careful reading of the question stem would have avoided
      this mistake.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      propyl methanoate
      <br />
      (Correct spelling of chemical names is required.)
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>C₄H₈ is an <b>alkene</b> (C<sub>n</sub>H<sub>2n</sub>), unbranched with a C=C double bond: <Chem eq="CH2=CHCH2CH3" /> (but-1-ene).</>,
    reason: <>C<sub>n</sub>H<sub>2n</sub> fits the alkene family. It must be <b>but-1-ene</b>: the question says it gives <b>two</b> unbranched isomers, and only an alkene with its double bond at the end of the chain can put the Cl on two different kinds of carbon. (But-2-ene, CH₃CH=CHCH₃, is symmetrical and would give only 2-chlorobutane.)</>,
  },
  {
    working: <><Chem eq="CH2=CHCH2CH3(g)" />{' + '}<Chem eq="HCl(g) -> CH2ClCH2CH2CH3" /> (and CH₃CHClCH₂CH₃)</>,
    reason: <>The H and the Cl of HCl add <b>across the double bond</b>: the C=C opens up and two reactant molecules join to make one product — nothing else is formed.</>,
  },
  {
    working: <b>Addition reaction</b>,
    reason: <>The single mark is for the type of reaction. Two reactants → one product, with the double bond broken, is the signature of <b>addition</b>. (Not &ldquo;substitution&rdquo; — no atom is swapped out — and not &ldquo;hydrogenation&rdquo;, which is the addition of H₂.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>Compound A: <Chem eq="CH2ClCH2CH2CH3" /> (1-chlorobutane) — Cl on the <b>end</b> carbon</>,
    reason: <>Work backwards from the pathway: A must turn into a <b>primary</b> alcohol, so its Cl must be on a carbon at the end of the chain (bonded to only one other carbon). Swapping Cl for OH there gives butan-1-ol, a primary alcohol.</>,
  },
  {
    working: <>Compound B: Cl on the <b>second</b> carbon, where the other end of the C=C was</>,
    reason: <>In but-1-ene the double bond is between C1 and C2. If the H goes to C2, the Cl goes on C1 (Compound A); if the H goes to C1, the Cl goes on <b>C2</b> — that is the other isomer.</>,
  },
  {
    working: <b>Compound B: <Chem eq="CH3CHClCH2CH3" /> (2-chlorobutane)</b>,
    reason: <>Write it as a <b>semi-structural</b> (condensed) formula, showing each carbon with its H atoms and where the Cl is — not C₄H₉Cl, which does not tell the isomers apart. Writing 1-chlorobutane here is the very common mistake the report describes: that is Compound A.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <><Chem eq="CH2ClCH2CH2CH3(l)" />{' + '}<Chem eq="OH-(aq) -> CH3CH2CH2CH2OH(aq)" />{' + '}<Chem eq="Cl-(aq)" /></>,
    reason: <>A haloalkane becomes an alcohol by <b>substitution</b>: the hydroxide ion replaces the Cl atom. The product, CH₃CH₂CH₂CH₂OH (the OH on the end carbon, where the Cl was), is butan-1-ol — a primary alcohol, as the pathway requires.</>,
  },
  {
    working: <b>NaOH(aq) (or KOH(aq) — any soluble metal hydroxide)</b>,
    reason: (
      <>
        The mark is for a source of <b>OH⁻ ions</b>. Water alone is not enough: the report notes H₂O is not powerful enough for the reaction to proceed at an appreciable rate (only hydroxides are listed as accepted). (The report calls H₂O an &ldquo;addition reagent&rdquo;, but this step is a <b>substitution</b> — a slip in the report&rsquo;s wording. Its printed average of 0.4 is also a slip: 63% scoring 1 mark gives 0.6.)
      </>
    ),
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <>Propan-1-ol + methanoic acid → ester + water is an <b>esterification</b> (condensation) reaction.</>,
    reason: <>An alcohol and a carboxylic acid react to make an ester. This reaction needs an acid catalyst.</>,
  },
  {
    working: <b>Concentrated sulfuric acid, conc. H₂SO₄ (or concentrated H₃PO₄)</b>,
    reason: <>Say <b>concentrated</b>, and do <b>not</b> write H₂SO₄(aq): the report did not accept any reference to (aq), because the concentrated (pure) acid is what is used. Only about a third of students earned this mark.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <>Reactants: <Chem eq="CH3CH2CH2OH" /> (propan-1-ol) + <Chem eq="HCOOH" /> (methanoic acid)</>,
    reason: <>Mark 1: the correct reactants. Read the stem of part d: it names <b>propan-1-ol</b> — a 3-carbon alcohol — <b>not</b> the butanol from the pathway above. The report says some students used the wrong alcohol (it calls it &ldquo;2-butanol&rdquo;, but the alcohol made earlier in this question is butan-1-ol — either way, a 4-carbon alcohol is wrong here). Methanoic acid has one carbon: HCOOH.</>,
  },
  {
    working: <>The –OH of the acid and the H of the alcohol&rsquo;s –OH leave as <b>H₂O</b>; the rest joins as the ester <Chem eq="HCOOCH2CH2CH3" /></>,
    reason: <>In an ester formula the <b>acid part is written first</b> (HCOO–) followed by the alkyl group from the alcohol (–CH₂CH₂CH₃).</>,
  },
  {
    working: <b><Chem eq="CH3CH2CH2OH(l)" />{' + '}<Chem eq="HCOOH(l) -> HCOOCH2CH2CH3(l)" />{' + '}<Chem eq="H2O(l)" /></b>,
    reason: <>Mark 2: the correct products. Check the balance: C₃H₈O + CH₂O₂ = C₄H₁₀O₃ on the left; C₄H₈O₂ + H₂O = C₄H₁₀O₃ on the right ✓. An equilibrium arrow (⇌) was also accepted, and states were not assessed here — but including them is good habit.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <>Alcohol part: propan-1-ol (3 C) → <b>propyl</b>; acid part: methanoic acid (1 C) → <b>methanoate</b></>,
    reason: <>An ester is named &ldquo;alkyl alkanoate&rdquo;: first the alkyl group from the <b>alcohol</b>, then the acid with &ldquo;-oic acid&rdquo; changed to &ldquo;-oate&rdquo;. Notice the name order (alcohol first) is the reverse of the formula order (acid first) — don&rsquo;t be tempted into &ldquo;methyl propanoate&rdquo;, which is a different ester.</>,
  },
  {
    working: <b>propyl methanoate</b>,
    reason: <>Two words, spelled exactly — the report requires correct spelling of chemical names.</>,
  },
]

const STEM_BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

export default function ChemistryQ1_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (7 marks)</p>
        <p className="mb-3">A reaction pathway to produce a primary alcohol is shown below.</p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={pathwaySrc}
            alt="Reaction pathway: C4H8 reacts with HCl(g) and branches into Compound A and Compound B (an empty box); Compound A is converted by Reagent(s) (an empty box) into a primary alcohol — from the original 2022 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          C₄H₈ reacts with HCl(g) to form two unbranched isomers – Compound A and Compound B. Only Compound A
          can react to produce a primary alcohol.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Addition Reaction"
        marks={1}
        statement={<>Identify the type of reaction that converts C₄H₈ into Compound A.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Classify the reaction from what happens to the molecules. C₄H₈ is an <b>alkene</b>, and HCl
            joins onto it across the C=C double bond to give a single product. One mark, one idea: name the
            reaction type — <b>addition</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="ours" points={[{ point: <><b>Addition</b> (of HCl across the C=C double bond).</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Haloalkane Isomers"
        marks={1}
        statement={<>Write the semi-structural formula for Compound B in the box provided.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            The two isomers differ only in <b>which carbon carries the Cl</b>. Use the clue in the stem:
            only A gives a <b>primary</b> alcohol, so A has Cl on an end carbon (1-chlorobutane), and B must be
            the other one — Cl on carbon 2. The report&rsquo;s very common mistake was writing 1-chlorobutane,
            which is A, not B.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme source="ours" points={[{ point: <>A correct <b>semi-structural formula</b> of <b>2-chlorobutane</b>, <b>CH₃CHClCH₂CH₃</b> (not 1-chlorobutane).</> }]} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Haloalkane Substitution"
        marks={1}
        statement={<>State the reagent(s) required to convert Compound A into a primary alcohol in the box provided.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Haloalkane → alcohol is a <b>substitution</b>: the Cl must be replaced by OH, so you need a reagent
            that supplies <b>hydroxide ions</b>. The trap the report names is writing water — it is too slow to
            count.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme source="ours" points={[{ point: <><b>NaOH</b> or <b>KOH</b> (aqueous) — any <b>soluble metal hydroxide</b>. H₂O alone is not enough.</> }]} />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">d.</p>
        <p>Propan-1-ol can react with methanoic acid to produce an organic molecule.</p>
      </div>

      <PartCard
        letter="d.i"
        topic="Esterification Catalyst"
        marks={1}
        statement={<>Identify the catalyst for this reaction.</>}
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            An alcohol + a carboxylic acid is an <b>esterification</b>, which is catalysed by a strong acid.
            Only 36% earned this mark, and the report stresses the detail: the acid must be <b>concentrated</b>{' '}
            — any reference to (aq) was not accepted.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme source="ours" points={[{ point: <><b>Concentrated H₂SO₄</b> (or concentrated H₃PO₄) — <b>not</b> written as (aq).</> }]} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Esterification Equation"
        marks={2}
        statement={<>Write a balanced chemical equation for the reaction.</>}
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: the <b>correct reactants</b>, then the <b>correct products</b> (ester +
            water). Take the reactants from the stem of part d — <b>propan-1-ol</b> and methanoic acid — not
            from the pathway above; the report says some students used the wrong alcohol. Then remove H₂O
            between the acid&rsquo;s –COOH and the alcohol&rsquo;s –OH and join what is left.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>correct reactants</b>: <b>CH₃CH₂CH₂OH + HCOOH</b> (propan-1-ol, not butanol).</> },
            { point: <>The <b>correct products</b> based on those reactants: <b>HCOOCH₂CH₂CH₃ + H₂O</b>. (→ or ⇌ accepted; states not assessed.)</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Ester Naming"
        marks={1}
        statement={<>Write the systematic IUPAC name for the organic molecule produced.</>}
        examinerReport={EXAM_DIII}
      >
        <Background title="How to Think About It">
          <p>
            Esters are named <b>alkyl alkanoate</b>: the <b>alcohol</b> gives the first word (propan-1-ol →
            propyl) and the <b>acid</b> gives the second (methanoic acid → methanoate). Spelling counts.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DIII} />
        <MarkScheme source="ours" points={[{ point: <><b>propyl methanoate</b>, <b>spelled correctly</b>.</> }]} />
      </PartCard>
    </div>
  )
}
