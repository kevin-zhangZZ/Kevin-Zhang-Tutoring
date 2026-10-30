// 2024 Chemistry Exam, Section B Question 1 (8 marks). Analysing consumer products and a natural
// product: using melting point determination to identify a solid and judge its purity, the chiral
// centre in linalool, the percentage of linalool in a linalool–hexane mixture from the amount of
// iodine that adds across its two C=C double bonds, and the extraction and purification of
// linalool from lavender. Question text transcribed from the original paper (rendered page — the
// 2024 paper has no extractable text); the linalool structure is cropped from the original VCAA exam
// PDF, and the starred structure in the part b.i comment is cropped from the VCAA examination
// report. Mark allocations are from the VCAA examination report, which itemises the marks for
// parts a, b.ii and b.iii; the worked solutions, "How to Think About It" notes and model answers
// are original (VCAA report only — no second source). Numbers checked in Python; no Data Book
// item is used. The report's part b.ii comment has two unit slips — "m(linalool) = … = 3.234 mol"
// (should be g) and "m(linalool) = 3.234 / 15.0 = 22%" (the 22% is the percentage by mass, not a
// mass); both are kept verbatim and explained in the working.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import linaloolSrc from './chem-2024sa-q1b-linalool.png'
import reportStructSrc from './chem-2024sa-q1bi-report-structure.png'

const EXAM_A: SAExaminerStats = {
  marks: [43, 46, 11],
  average: 0.7,
  comment: (
    <>
      The first mark was awarded for clear identification of one of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>when the melting point range is narrow this implies a pure compound</li>
        <li>a broad range indicates an impure compound.</li>
      </ul>
      The second mark was awarded for either of the following concepts being communicated:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          When the melting point is narrow and it matches the melting point of the pure compound, the
          identity of the component can be confirmed as being the same as the pure compound.
        </li>
        <li>
          A small sample of the unknown compound can be mixed with a sample of a pure compound. If the
          melting point of the mixture was the same as that of the pure compound, the unknown can be
          confirmed as being the same as the pure compound.
        </li>
      </ul>
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: (
    <>
      There is a single chiral centre.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Skeletal structure of linalool with an asterisk on the carbon bonded to the OH group, the vinyl group, the methyl group and the rest of the chain — from the VCAA examination report"
        className="w-full max-w-[260px] mt-1 bg-white rounded"
      />
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [42, 13, 18, 26],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for the correct calculation of n(linalool) = 0.042 / 2 = 0.021 mol
      <br />
      The second mark was awarded for the correct m(linalool) = 0.021 × 154 = 3.234 mol
      <br />
      The third mark was awarded for the correct percentage m(linalool) = 3.234 / 15.0 = 22%
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [18, 54, 29],
  average: 1.1,
  comment: (
    <>
      The first mark was awarded for any valid extraction technique:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>solvent extraction / steam distillation / filtration.</li>
      </ul>
      The second mark was awarded for any valid purification technique:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>distillation (fractional distillation) / HPLC.</li>
      </ul>
      Some students attempted to respond to the purification process with &lsquo;recrystallisation&rsquo;,
      but as linalool is identified in the stem of the question as an oil, this could not be accepted.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <b>Purity:</b> a <b>pure</b> compound melts sharply over a <b>narrow melting point range</b>. An{' '}
        <b>impure</b> sample melts over a <b>broad range</b>, and at a <b>lower temperature</b> than the
        pure compound.
      </>
    ),
    reason: (
      <>
        Mark 1: the <b>range</b> tells you about purity. Impurities disrupt the regular arrangement of
        particles in the solid, so it starts melting earlier and melts gradually rather than all at once.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Components (identity):</b> if the sample&rsquo;s melting point is narrow and <b>matches the
        known (literature) melting point</b> of the pure compound, the component is <b>confirmed to be that
        compound</b>. (Alternatively: mix a little of the sample with the pure compound — if the{' '}
        <b>mixture&rsquo;s melting point is unchanged</b>, they are the same compound.)
      </>
    ),
    reason: (
      <>
        Mark 2: the <b>value</b> tells you about identity. Comparing with the literature value is the
        expected answer; the mixed-melting-point test is the report&rsquo;s other accepted way.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The carbon bonded to the –OH group is bonded to <b>four different groups</b>: –OH, –CH₃, –CH=CH₂ and –CH₂CH₂CH=C(CH₃)₂.</>,
    reason: <>A chiral centre is a carbon atom with four <b>different</b> groups attached. Check each sp³ carbon in turn.</>,
  },
  {
    working: <>No other carbon qualifies: each CH₂ has two H atoms, each CH₃ has three, and the carbons in C=C double bonds have only three groups.</>,
    reason: <>Rule out the rest quickly. The carbon at the right-hand end carrying the two CH₃ groups fails twice over: it is in a C=C, and its two CH₃ groups are <b>identical</b>.</>,
  },
  { working: <b>1 chiral centre</b>, reason: <>Matches the starred carbon in the report&rsquo;s structure.</> },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>Linalool has <b>2 C=C double bonds</b>; hexane has <b>none</b> (saturated).</>,
    reason: <>Iodine <b>adds across C=C double bonds</b> (addition reaction), one I₂ per C=C. Hexane, C₆H₁₄, is an alkane, so it does not react — all 0.042 mol of I₂ reacted with linalool. Count the double bonds on the structure above.</>,
  },
  {
    working: <><Chem eq="C10H18O" /> + <Chem eq="2I2 -> C10H18OI4" /></>,
    reason: <>Mole ratio linalool : I₂ = <b>1 : 2</b>. Using 1 : 1 here would double every later answer (43% instead of 22%).</>,
  },
  { working: <>n(linalool) = ½ × n(I₂)</> },
  { working: <>n(linalool) = 0.042 mol ÷ 2</> },
  { working: <><b>n(linalool) = 0.021 mol</b></>, reason: <>Mark 1.</> },
  { working: <>m(linalool) = n × M</>, reason: <>Convert to a mass so it can be compared with the 15.0 g mixture. M = 154 g mol⁻¹ is given.</> },
  { working: <>m(linalool) = 0.021 mol × 154 g mol⁻¹</> },
  {
    working: <><b>m(linalool) = 3.234 g</b></>,
    reason: <>Mark 2. The report writes this as &ldquo;3.234 mol&rdquo; — a slip: it is a mass, in grams.</>,
  },
  { working: <>% linalool by mass = (m(linalool) ÷ m(mixture)) × 100%</> },
  { working: <>% linalool by mass = (3.234 g ÷ 15.0 g) × 100%</>, reason: <>Use the unrounded 3.234 g.</> },
  {
    working: <b>% linalool by mass = 22%</b>,
    reason: (
      <>
        Mark 3. (21.56% unrounded.) Two significant figures, set by 0.042 mol. The report&rsquo;s
        &ldquo;m(linalool) = 3.234 / 15.0 = 22%&rdquo; means the percentage by mass, not a mass.
        Plausible: between 0 and 100%, and the rest (about 11.8 g) is hexane.
      </>
    ),
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <>1. <b>Extraction:</b> <b>steam distillation</b> (or <b>solvent extraction</b>) of the crushed lavender, to separate the linalool from the plant material.</>,
    reason: <>Mark 1: a valid <b>extraction</b> technique — gets the oil out of the plant. Steam distillation suits volatile plant oils; solvent extraction dissolves the oil in a solvent. The report also accepted filtration.</>,
  },
  {
    working: <>2. <b>Purification:</b> <b>fractional distillation</b> of the extract, to separate linalool from the other compounds by their different <b>boiling points</b>.</>,
    reason: <>Mark 2: a valid <b>purification</b> technique — the extract is still a mixture of oils. HPLC was also accepted. <b>Not recrystallisation</b>: linalool is an <b>oil</b> (a liquid), so it cannot be recrystallised.</>,
  },
]

export default function ChemistryQ1_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (8 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Melting Point"
        marks={2}
        statement={<>How can melting point determination be used to check the components and purity of solid consumer products?</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            The question asks about two things — <b>purity</b> and <b>components</b> (identity) — and has
            two marks, so give one idea for each. Purity comes from the melting point <b>range</b> (narrow =
            pure, broad = impure); identity comes from <b>comparing the value</b> with the known melting
            point of the pure compound.
          </p>
          <p className="mt-2">
            The report&rsquo;s general comments name the trap: assuming that any difference from the pure
            compound&rsquo;s melting point is due only to impurity. A sample that melts sharply at a quite
            different temperature is probably a <i>different compound</i>, not an impure one — so talk
            about the range for purity, and the closeness to the literature value for identity.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>narrow melting point range</b> means a <b>pure</b> compound, or a <b>broad range</b> means an <b>impure</b> compound.</> },
            { point: <>A narrow melting point that <b>matches the melting point of the pure compound</b> confirms the <b>identity</b> of the component (or: a <b>mixed melting point</b> with a pure sample is unchanged, so it is the same compound).</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">
          Linalool, C₁₀H₁₈O, is a colourless oil found in lavender plants. Linalool may be useful in the
          human body to reduce inflammation. The molar mass of linalool is 154 g mol⁻¹.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={linaloolSrc}
            alt="Skeletal structure of linalool: a carbon bearing OH and CH3 groups, joined to a CH=CH2 group and to a chain ending in a C=C double bond carrying two methyl groups — from the original 2024 VCAA exam paper"
            className="w-full max-w-[260px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Chiral Centres"
        marks={1}
        statement={<>How many chiral centres are present in each linalool molecule?</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            A chiral centre is a carbon with <b>four different groups</b> attached. In a skeletal structure,
            first rule out every carbon that can&rsquo;t be one — CH₂ and CH₃ carbons (two or more H atoms)
            and carbons in a double bond (only three groups) — then check what is left.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="ours" points={[{ point: <><b>One</b> (a single) <b>chiral centre</b> — the carbon bonded to the –OH group.</> }]} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Iodine Number"
        marks={3}
        statement={
          <>
            A 15.0 g mixture of linalool and hexane, C₆H₁₄, was reacted with an excess of iodine, I₂. It was
            found that 0.042 mol of I₂ reacted with the mixture.
            <br />
            Calculate the percentage by mass of linalool in the original mixture.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            This is a degree-of-unsaturation question: I₂ adds across C=C double bonds, one I₂ per C=C.
            Only linalool has C=C bonds, so the I₂ tells you how much linalool there is. The three marks
            are three steps: moles of linalool (using the <b>1 : 2</b> ratio, because linalool has two C=C),
            its mass, then the percentage of the 15.0 g.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>n(linalool) = 0.042 ÷ 2 = 0.021 mol</b> (two C=C, so 2 I₂ per linalool).</> },
            { point: <>Correct <b>m(linalool) = 0.021 × 154 = 3.234 g</b>.</> },
            { point: <>Correct <b>percentage by mass = 3.234 ÷ 15.0 × 100 = 22%</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Extraction and Purification"
        marks={2}
        statement={<>Identify <b>two</b> processes used to obtain purified linalool from crushed lavender.</>}
        examinerReport={EXAM_BIII}
      >
        <Background title="How to Think About It">
          <p>
            Getting a pure natural product out of a plant takes two stages, and the two marks match them:
            first <b>extract</b> the oil from the plant material, then <b>purify</b> the extract. Name one
            process for each stage. Read the stem: linalool is an <b>oil</b>, so a solid-only method such as
            recrystallisation — which the report did not accept — can&rsquo;t be the purification step.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A valid <b>extraction</b> technique: <b>solvent extraction</b>, <b>steam distillation</b> or filtration.</> },
            { point: <>A valid <b>purification</b> technique: <b>(fractional) distillation</b> or <b>HPLC</b>. Recrystallisation was not accepted (linalool is an oil).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
