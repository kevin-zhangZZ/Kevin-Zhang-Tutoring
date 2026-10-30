// 2020 Chemistry Exam, Section B Question 3 (7 marks). An organic reaction pathway from
// hex-3-ene: addition of HBr (Compound J), hydration to hexan-3-ol, a tertiary-alcohol isomer of
// hexan-3-ol, esterification with ethanoic acid (Compound M → ester L), and oxidation of the
// secondary alcohol with acidified permanganate to a ketone (Compound K). Question text
// transcribed from the original paper; the reaction-pathway diagram is cropped from the original
// VCAA exam PDF; the three tertiary-alcohol structures (and the single one used in our working)
// are cropped from the VCAA examination report. VCAA report only — no second source. The report
// gives a sample answer for each part but does not itemise marks beyond that, so every mark
// scheme here is our reading. The "How to Think About It" notes and model answers are original.
// Molecular formulas (C6H14O for hexan-3-ol and each tertiary isomer) checked by atom count.
// Paper's "box provided on page 20" becomes "box provided above" (§12.3).

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import pathwaySrc from './chem-2020sa-q3-pathway.png'
import reportStructSrc from './chem-2020sa-q3c-report-structure.png'
import tertiarySrc from './chem-2020sa-q3c-tertiary-alcohol.png'

const EXAM_A: SAExaminerStats = {
  marks: [37, 63],
  average: 0.6,
  comment: (
    <>
      3-bromohexane.
      <br />
      Students need to be careful when using hyphens. Hyphens are only used to separate numbers from
      letters and cannot be used to separate letters as commonly seen in responses such as
      &lsquo;3-bromo-hexane&rsquo;.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      H₂O / H⁺
      <br />
      &lsquo;Steam&rsquo; and any specific inorganic strong acid (apart from HCl) was also accepted.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Any of the following drawn structures was accepted.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Full structural formulas of 2-methylpentan-2-ol, 3-methylpentan-3-ol and 2,3-dimethylbutan-2-ol, each showing every bond including O–H — from the 2020 VCAA examination report"
        className="w-full max-w-[560px] mt-1 bg-white rounded"
      />
      <br />
      Students need to be reminded to avoid grouping the -OH and ensure that they show clearly the -O-H bond.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Either of:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>CH₃COOH</li>
        <li>HOOCCH₃.</li>
      </ul>
      There was confusion over the interpretation of what reagents were used to form compound L. Some
      students assumed that since compound L was drawn in skeletal form that they also had to draw the
      ethanoic acid this way. Careful reading of the question stem is vital.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [61, 39],
  average: 0.4,
  comment: (
    <>
      Any of:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>CH₃CH₂COCH₂CH₂CH₃</li>
        <li>CH₃CH₂CH₂COCH₂CH₃</li>
        <li>CH₃CH₂CO(CH₂)₂CH₃.</li>
      </ul>
      A significant number of sketches of aldehydes were attempted along with carboxylic acids.
      Oxidation of a secondary alcohol only produces a ketone and students who sketched out all the
      structures in the blank spaces on the examination paper made far fewer errors on this question.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      Ketone.
      <br />
      Students are expected to be able to spell the names of functional groups correctly.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      Oxidation.
      <br />
      Students may not have recognised that acidified permanganate produces the same products as
      acidified dichromate.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>hex-3-ene: <Chem eq="CH3CH2CH=CHCH2CH3" /></>,
    reason: <>Write the starting alkene out first. The C=C double bond is between C3 and C4 of a six-carbon chain.</>,
  },
  {
    working: <><Chem eq="CH3CH2CH=CHCH2CH3 + HBr -> CH3CH2CHBrCH2CH2CH3" /></>,
    reason: <>
      HBr reacts by <b>addition</b> across the double bond: H goes on one carbon of the C=C and Br on
      the other. Hex-3-ene is <b>symmetrical</b> about the double bond, so whichever carbon gets the
      Br, the product is the same molecule — there is only one possible product.
    </>,
  },
  {
    working: <b>Compound J: 3-bromohexane</b>,
    reason: <>
      Six-carbon chain → hexane; Br on carbon 3 (numbering from either end gives 3) → 3-bromo. The
      prefix is joined straight onto the parent name: hyphens only go between a <b>number and a
      letter</b>, so &ldquo;3-bromo-hexane&rdquo; is wrong — the error the report describes.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><Chem eq="CH3CH2CH=CHCH2CH3 + H2O -> CH3CH2CH(OH)CH2CH2CH3" /></>,
    reason: <>
      Going from an alkene to an alcohol adds H and OH across the double bond — that is an addition of
      water (<b>hydration</b>). Again the alkene is symmetrical, so the OH must end up on C3.
    </>,
  },
  {
    working: <b>Reagent(s): H₂O (steam) with an acid catalyst, H⁺ — e.g. H₃PO₄ or H₂SO₄</b>,
    reason: <>
      The mark needs both the <b>water</b> and the <b>acid catalyst</b>. Any strong inorganic acid was
      accepted <b>except HCl</b>: HCl would itself add across the C=C and give 3-chlorohexane instead of
      the alcohol.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>hexan-3-ol: <Chem eq="CH3CH2CH(OH)CH2CH2CH3" /> = <Chem eq="C6H14O" /></>,
    reason: <>
      An <b>isomer</b> has the <b>same molecular formula</b> (C₆H₁₄O) but a different structure. So the
      answer must still have 6 C, 14 H and 1 O, and still be an alcohol.
    </>,
  },
  {
    working: <>Tertiary alcohol: the C bonded to –OH is bonded to <b>three other carbon atoms</b></>,
    reason: <>
      Primary, secondary and tertiary count the carbons attached to the C–OH carbon (1, 2 or 3).
      Hexan-3-ol is secondary (its C3 has two C neighbours), so the carbon chain must be branched to
      give the C–OH carbon a third C neighbour.
    </>,
  },
  {
    working: <>3-methylpentan-3-ol: <Chem eq="CH3CH2C(OH)(CH3)CH2CH3" /></>,
    reason: <>
      One way: shorten the main chain to five carbons (pentan-3-ol), then put the sixth carbon on C3
      as a methyl branch in place of C3&rsquo;s H. C3 now carries –OH, –CH₃ and two –CH₂CH₃ groups —
      three C neighbours, so it is tertiary. Count atoms: 6 C, 14 H, 1 O = C₆H₁₄O ✓.
    </>,
  },
  {
    working: (
      <img
        loading="lazy"
        decoding="async"
        src={tertiarySrc}
        alt="Full structural formula of 3-methylpentan-3-ol with every C–H, C–C, C–O and O–H bond drawn — cropped from the 2020 VCAA examination report"
        className="w-full max-w-[300px] bg-white rounded"
      />
    ),
    reason: <>
      &ldquo;<b>Structural formula</b>&rdquo; means <b>every bond and every atom</b> drawn, including each
      C–H and the <b>O–H bond</b>. The report warns against writing a grouped &ldquo;–OH&rdquo; here.
      2-methylpentan-2-ol and 2,3-dimethylbutan-2-ol were also accepted (see the report below).
    </>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>Compound L is an <b>ester</b>: hexan-3-ol + carboxylic acid → ester + water</>,
    reason: <>
      The skeletal drawing of L has the –COO– group (C=O with an O bonded to the chain), so L is an
      ester. An alcohol plus a carboxylic acid, with concentrated H₂SO₄ as catalyst (&ldquo;acidic
      conditions&rdquo;), is <b>esterification</b> (a condensation reaction).
    </>,
  },
  {
    working: <>Acid part of L: the C=O carbon plus one CH₃ → <b>2 carbons → ethanoic acid</b></>,
    reason: <>
      Split the ester at the single-bonded O. The side with the C=O came from the <b>acid</b>; the side
      attached to the other O (the branched six-carbon chain) came from hexan-3-ol. In the skeletal
      drawing the C=O carbon carries just one line ending in a CH₃, so the acid has 2 carbons.
    </>,
  },
  {
    working: <><Chem eq="CH3COOH + CH3CH2CH(OH)CH2CH2CH3 -> CH3COOCH(CH2CH3)CH2CH2CH3 + H2O" /></>,
    reason: <>Check: the acid&rsquo;s OH and the alcohol&rsquo;s H leave as water and the two pieces join through O — giving exactly the structure of L.</>,
  },
  {
    working: <b>Compound M: CH₃COOH</b>,
    reason: <>
      The question asks for a <b>semi-structural</b> formula, so write CH₃COOH (or HOOCCH₃) — not a
      skeletal drawing just because L is drawn that way, which is the confusion the report describes.
    </>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <>hexan-3-ol is a <b>secondary alcohol</b> (C3 bonded to two other C)</>,
    reason: <>
      H⁺/MnO₄⁻ (acidified permanganate) is a strong <b>oxidising agent</b>, like acidified dichromate.
      What it produces depends on the class of alcohol: primary → aldehyde → carboxylic acid;
      secondary → <b>ketone</b> only; tertiary → no reaction.
    </>,
  },
  {
    working: <><Chem eq="CH3CH2CH(OH)CH2CH2CH3 -> CH3CH2COCH2CH2CH3" /></>,
    reason: <>
      The C–OH carbon loses its H and the O–H hydrogen, becoming C=O. Because that carbon sits in the
      <b> middle</b> of the chain, the C=O is between two carbons — a ketone. It cannot become an
      aldehyde or acid: there is no H left on that carbon to oxidise further. The report notes many
      students drew aldehydes and carboxylic acids — sketching the structure first avoids this.
    </>,
  },
  {
    working: <b>Compound K: CH₃CH₂COCH₂CH₂CH₃</b>,
    reason: <>Semi-structural, as asked. CH₃CH₂CH₂COCH₂CH₃ (the same molecule written from the other end) and CH₃CH₂CO(CH₂)₂CH₃ were also accepted. Its name is hexan-3-one.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <b>Ketones</b>,
    reason: <>K has a C=O <b>carbonyl</b> group bonded to two carbon atoms (part e.i), which defines a ketone. Spell it correctly — the report expects it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <b>Oxidation</b>,
    reason: <>
      H⁺/MnO₄⁻ is an <b>oxidising agent</b>, so hexan-3-ol is <b>oxidised</b>: it loses hydrogen (C–H and
      O–H) and its C3 goes from oxidation number 0 to +2. Acidified permanganate does the same job as
      acidified dichromate, H⁺/Cr₂O₇²⁻ — the report notes students may not have recognised this.
    </>,
  },
]

const stemBox =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

export default function ChemistryQ3_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={stemBox}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (7 marks)</p>
        <p className="mb-3">Below is a reaction pathway beginning with hex-3-ene.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={pathwaySrc}
            alt="Reaction pathway: hex-3-ene goes via an empty Reagent(s) box to hexan-3-ol, and via HBr(aq) to an empty Compound J box. Hexan-3-ol reacts with Compound M (empty box) and H2SO4(l) to give Compound L, drawn as the skeletal structure of an ethanoate ester of hexan-3-ol; hexan-3-ol with H+(aq)/MnO4−(aq) gives Compound K (empty box) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Addition Reaction"
        marks={1}
        statement={<>Write the IUPAC name of Compound J in the box provided.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            An alkene plus HBr is an <b>addition</b> reaction: H and Br add across the C=C. Draw hex-3-ene,
            put Br on one of the double-bond carbons, then name the product. One mark, all for the name —
            and the report says it is often lost to a misplaced hyphen.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="ours" points={[{ point: <><b>3-bromohexane</b>, written with a hyphen only between the number and the letters (not &ldquo;3-bromo-hexane&rdquo;).</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Hydration of Alkenes"
        marks={1}
        statement={<>State the reagent(s) required to convert hex-3-ene to hexan-3-ol in the box provided.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Compare the start and end: the alcohol has gained exactly H and OH, i.e. one H₂O. So this is
            the addition of water to an alkene, which needs <b>water (steam)</b> and an <b>acid catalyst</b>.
            Only 38% scored this mark — give both reagents, and don&rsquo;t pick HCl as the acid.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme source="ours" points={[{ point: <><b>H₂O (or steam)</b> together with an <b>acid catalyst H⁺</b> (e.g. H₃PO₄ or H₂SO₄ — any strong inorganic acid except HCl).</> }]} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Structural Isomers"
        marks={1}
        statement={<>Draw the structural formula for a tertiary alcohol that is an isomer of hexan-3-ol.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Three conditions in one mark: <b>same molecular formula</b> (C₆H₁₄O), the –OH carbon must be
            <b> tertiary</b> (bonded to three carbons), and it must be a full <b>structural formula</b> with
            every bond shown. The trap the report names is writing &ldquo;–OH&rdquo; as a group instead of
            drawing the O–H bond.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A correct <b>full structural formula</b> of a <b>C₆H₁₄O tertiary alcohol</b> — 2-methylpentan-2-ol, <b>3-methylpentan-3-ol</b> or 2,3-dimethylbutan-2-ol — with <b>every bond drawn, including O–H</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Esterification"
        marks={1}
        statement={
          <>
            Hexan-3-ol is reacted with Compound M under acidic conditions to produce Compound L.
            <br />
            Draw the semi-structural formula for Compound M in the box provided above.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Work backwards from the product: L is an <b>ester</b>, and an ester is made from an
            <b> alcohol</b> and a <b>carboxylic acid</b>. The alcohol is given (hexan-3-ol), so M is the
            acid — read its size off the C=O side of L. Then answer in the form asked: <b>semi-structural</b>,
            not skeletal.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme source="ours" points={[{ point: <>Ethanoic acid as a <b>semi-structural formula</b>: <b>CH₃COOH</b> (or HOOCCH₃).</> }]} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Oxidation of Alcohols"
        marks={1}
        statement={<>Draw the semi-structural formula for Compound K in the box provided above.</>}
        examinerReport={EXAM_EI}
      >
        <Background title="How to Think About It">
          <p>
            H⁺/MnO₄⁻ oxidises alcohols, and the product depends on whether the alcohol is primary,
            secondary or tertiary. Hexan-3-ol is <b>secondary</b>, so it gives a <b>ketone</b> — not an
            aldehyde or carboxylic acid, which the report says many students drew. Sketch hexan-3-ol, turn
            its C–OH into C=O, then write it semi-structurally.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <MarkScheme source="ours" points={[{ point: <>Hexan-3-one as a <b>semi-structural formula</b>: <b>CH₃CH₂COCH₂CH₂CH₃</b> (C=O on carbon 3, not an aldehyde or acid).</> }]} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Homologous Series"
        marks={1}
        statement={<>Name the class of organic compound (homologous series) to which Compound K belongs.</>}
        examinerReport={EXAM_EII}
      >
        <Background title="How to Think About It">
          <p>Name the family from the functional group in your answer to e.i: a C=O inside the chain (bonded to two carbons) is a ketone.</p>
        </Background>
        <WorkingTable rows={ROWS_EII} />
        <MarkScheme source="ours" points={[{ point: <><b>Ketone(s)</b>, correctly spelt.</> }]} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Oxidation of Alcohols"
        marks={1}
        statement={<>What type of reaction produces Compound K from hexan-3-ol?</>}
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            Look at the reagent on the arrow: H⁺/MnO₄⁻ is acidified permanganate, an oxidising agent — it
            behaves just like acidified dichromate. So the alcohol is oxidised. One word earns the mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme source="ours" points={[{ point: <><b>Oxidation</b> (the alcohol is oxidised by acidified permanganate).</> }]} />
      </PartCard>
    </div>
  )
}
