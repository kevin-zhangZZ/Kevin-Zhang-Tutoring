// 2022 Chemistry Exam, Section B Question 4 (12 marks). Collagen and gelatin (hydrolysis of a
// protein, then rebuilding collagen by condensation), vitamin C (parts b.i and b.ii — not in the
// current study design), and the biofuel 2-methylpropan-1-ol: comparing its energy content with
// octane, and the maximum temperature 2.36 g of it could heat 500.0 g of water to. Question text
// transcribed from the original paper (no figures). Mark allocations are from the VCAA
// examination report, which itemises the marks for every part; the "How to Think About It"
// notes, model answers and working are original. VCAA report only — no second source. Numbers
// checked in Python.
// Study design: b.i (vitamin C as an essential vitamin) and b.ii (antioxidants and oxidative
// rancidity) are old-study-design nutrition content — kept as statements with a "Not in the
// Current Study Design" note, as the skip guide does for 2017 MCQ 16 / 2018 MCQ 7 (vitamins) and
// 2017 MCQ 12 / 2018 SAQ4d (rancidity, antioxidants). a.ii is written up, but its first mark rests
// on "essential amino acids" (skipped in 2017 SAQ3c) — borderline, flagged for KZ.
// Data Book: the 2022 Data Book listed octane's heat of combustion as 47.9 kJ g⁻¹; the 2026 Data
// Book gives only its molar enthalpy, −5470 kJ mol⁻¹, i.e. 5470 ÷ 114.0 = 48.0 kJ g⁻¹ (note in c.i).
// Report slip kept verbatim: in c.ii it prints "85.2 x 103" for 85.2 × 10³ (J) — explained in the
// working.

import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

const EXAM_AI: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: <>Hydrolysis</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [55, 19, 12, 14],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for indicating that gelatin contains essential amino acids and therefore
      these amino acids must be included as part of the diet in order for the synthesis of collagen to occur.
      <br />
      The second mark was awarded for indicating that once gelatin is consumed, it is then broken down via
      hydrolysis into its constituent amino acids.
      <br />
      The third mark was awarded for indicating that the body can then form the collagen it requires through
      the condensation of these amino acids to form the polypeptide.
      <br />
      A common mistake was students claiming that the gelatin could just undergo a condensation reaction to
      reform collagen.
      <br />
      This question also required that chemical processes needed to be mentioned, so only stating general
      terms like &lsquo;metabolism&rsquo; or &lsquo;digestion&rsquo; was not sufficient to be awarded marks.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [14, 76, 10],
  average: 1.0,
  comment: (
    <>
      One mark was awarded for stating that the energy content of octane (47.9 kJ g⁻¹) was higher than the
      energy content of 2-methylpropan-1-ol (36.1 kJ g⁻¹).
      <br />
      The second mark was awarded for recognising that 2-methylpropan-1-ol contains oxygen and is therefore
      already partially oxidised.
      <br />
      A significant number of students incorrectly tried to claim that the longer carbon chain of octane
      delivered a greater energy per gram. This is contrary to what is shown in the Data Book, where longer
      carbon chains clearly show a decrease in the heat of combustion values.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [31, 11, 17, 41],
  average: 1.7,
  comment: (
    <>
      The first mark was awarded for the correct calculation of the energy released.
      <br />
      Energy released = 2.36 × 36.1 = 85.2 kJ
      <br />
      The second mark awarded for the correct calculation of ΔT.
      <br />
      E = mcΔT, therefore ΔT = E / mc
      <br />
      = 85.2 x 103 / (500 × 4.18)
      <br />
      = 40.8 °C
      <br />
      The third mark was awarded for the correct calculation of the final temperature.
      <br />
      Max. Temp = 25.0 + 40.8
      <br />
      = 65.8 / 66 °C (339 K)
      <br />
      Consequential marks were awarded when students were able to show clear calculations.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <><b>Hydrolysis</b> (of the protein&rsquo;s <b>peptide/amide bonds</b>)</>,
    reason: (
      <>
        Collagen is a protein — a long chain of amino acids joined by peptide (amide) links. Boiling in water
        for hours breaks some of these links: <b>water reacts with the bond and splits the chain</b> into shorter
        pieces (gelatin). A reaction that uses water to break a molecule apart is <b>hydrolysis</b>. One word earns
        the mark; &ldquo;denaturation&rdquo; or &ldquo;breaking down&rdquo; does not name the reaction.
      </>
    ),
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: (
      <>
        Gelatin is made from the same amino acids as collagen, including <b>essential amino acids</b>, which the
        body <b>cannot make</b> and so must come from the <b>diet</b>.
      </>
    ),
    reason: <>Mark 1: why eating gelatin helps — it supplies the building blocks (amino acids) the body needs to make collagen.</>,
  },
  {
    working: (
      <>
        When gelatin is eaten, it is broken down by <b>hydrolysis</b> (catalysed by enzymes in digestion) into its
        constituent <b>amino acids</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: the first chemical process. Gelatin itself is too large to be absorbed and used directly — the
        body only takes in single amino acids. Name the reaction: the report says just &ldquo;digestion&rdquo; or
        &ldquo;metabolism&rdquo; did not earn marks.
      </>
    ),
  },
  {
    working: (
      <>
        The body then joins these amino acids together by <b>condensation</b> reactions, forming <b>peptide
        bonds</b> (releasing water), to build the <b>collagen</b> polypeptide/protein.
      </>
    ),
    reason: (
      <>
        Mark 3: the second chemical process. The order matters: <b>hydrolysis first, then condensation</b>. The
        report&rsquo;s common mistake was saying the gelatin pieces simply undergo condensation to re-form
        collagen — they are fully broken down to amino acids first.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: (
      <>
        <b>Octane</b> has a <b>higher energy content</b> per gram (<b>48.0 kJ g⁻¹</b>) than 2-methylpropan-1-ol
        (<b>36.1 kJ g⁻¹</b>).
      </>
    ),
    reason: (
      <>
        Mark 1: compare, with numbers, in the same unit. The stem gives 36.1 kJ g⁻¹ for the alcohol, so get
        octane in kJ g⁻¹ too: 5470 kJ mol⁻¹ ÷ 114.0 g mol⁻¹ = 47.98… = 48.0 kJ g⁻¹ (M(C₈H₁₈) = 8 × 12.0 + 18 × 1.0 =
        114.0 g mol⁻¹).
        <DataBookNote>
          the 2022 Data Book listed octane&rsquo;s heat of combustion directly as 47.9 kJ g⁻¹ — the value in
          VCAA&rsquo;s report. The 2026 Data Book (item 12) gives only octane&rsquo;s molar enthalpy of combustion,
          −5470 kJ mol⁻¹, which works out to 48.0 kJ g⁻¹. The comparison (and the answer) is unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        2-Methylpropan-1-ol (C₄H₉OH) <b>contains oxygen</b> — it is <b>already partially oxidised</b> (one carbon is
        already bonded to O in the <b>hydroxy group</b>). Less energy is released when it is fully oxidised to CO₂ and
        H₂O, so it releases <b>less energy per gram</b> than the hydrocarbon octane. (The O atom also adds mass to
        each gram of fuel without adding anything to burn.)
      </>
    ),
    reason: (
      <>
        Mark 2: the <b>reason</b> for the difference. Octane is a hydrocarbon with no oxygen at all. The report says a
        significant number of students instead claimed octane&rsquo;s <b>longer carbon chain</b> gives more energy per gram — wrong:
        per gram, energy content <i>falls</i> as alkane chains get longer (methane 890 ÷ 16.0 = 55.6 kJ g⁻¹, octane
        48.0 kJ g⁻¹), so chain length cannot explain it.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  { working: <>E released = m(fuel) × heat of combustion</>, reason: <>The heat of combustion is given <b>per gram</b> (kJ g⁻¹), so multiply by the mass — no need to convert to moles.</> },
  { working: <>E = 2.36 g × 36.1 kJ g⁻¹</> },
  {
    working: <>E = 85.196 kJ = 85 196 J</>,
    reason: <>Mark 1: energy released (85.2 kJ). Convert to <b>joules</b>, because c(water) = 4.18 <b>J</b> g⁻¹ K⁻¹. The report writes this as &ldquo;85.2 x 103&rdquo; — a typesetting slip for 85.2 × 10³ J.</>,
  },
  {
    working: <>q = mcΔT, so ΔT = q / (mc)</>,
    reason: <>&ldquo;Maximum&rdquo; temperature means we assume <b>all</b> the energy released goes into the water (no heat lost), so q = E. Rearrange q = mcΔT for ΔT; m is the mass of <b>water</b>, 500.0 g.</>,
  },
  { working: <>ΔT = 85 196 J / (500.0 g × 4.18 J g⁻¹ K⁻¹)</>, reason: <>c = 4.18 J g⁻¹ K⁻¹ is the specific heat capacity of water from the Data Book.</> },
  { working: <>ΔT = 40.76… K = 40.76… °C</>, reason: <>Mark 2: the temperature <b>change</b> (40.8 °C). A change of 1 K is the same size as a change of 1 °C.</> },
  {
    working: <>T(final) = T(initial) + ΔT = 25.0 °C + 40.76… °C</>,
    reason: <>The question asks for the <b>final temperature</b>, not the change. &ldquo;At SLC&rdquo; tells you the water starts at <b>25 °C</b> (SLC = 25 °C and 100 kPa, Data Book). Stopping at 40.8 °C misses this mark.</>,
  },
  {
    working: <b>T(final) = 65.8 °C</b>,
    reason: <>Mark 3. Three significant figures (2.36 g, 36.1 kJ g⁻¹ and 4.18 each have three). VCAA also accepted 66 °C or 339 K. Plausible: below 100 °C, so the water warms but does not boil.</>,
  },
]

export default function ChemistryQ4_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (12 marks)</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">a.</p>
        <p>
          Collagen is found in muscles, joints and skin. It is the most abundant protein in the body. Gelatin can
          be made by boiling animal collagen in water for many hours. Collagen and gelatin are made from the same
          18 amino acids. Gelatin is more easily metabolised by the body than collagen.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Protein Hydrolysis"
        marks={1}
        statement={
          <>
            Gelatin is produced when collagen is broken into smaller molecules.
            <br />
            Name the chemical reaction that produces gelatin from collagen.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Name the chemical reaction&rdquo; wants the reaction type, in one word. A big protein is being
            broken into smaller pieces by boiling in <b>water</b> — water breaking a bond is <b>hydrolysis</b>, the
            reverse of the condensation that built the protein.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Hydrolysis</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Protein Synthesis"
        marks={3}
        statement={
          <>
            Explain how consuming gelatin can be useful in increasing collagen levels in the body. In your answer,
            identify any chemical processes involved.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Three marks means three ideas, in order: <b>why</b> gelatin is useful (it supplies the amino acids —
            including essential ones the body can&rsquo;t make — that collagen is built from), then the two{' '}
            <b>named chemical processes</b>: <b>hydrolysis</b> of gelatin into amino acids, then <b>condensation</b>{' '}
            of those amino acids into collagen. The report&rsquo;s traps: skipping the hydrolysis step (gelatin
            doesn&rsquo;t just condense back into collagen), and writing &ldquo;digestion&rdquo; or
            &ldquo;metabolism&rdquo; instead of naming the reactions.
          </p>
          <p className="mt-2">
            Study design note: hydrolysis and condensation of proteins are on the current course; the term
            &ldquo;essential amino acid&rdquo; (mark 1) came from the old study design&rsquo;s nutrition content.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Gelatin contains <b>essential amino acids</b>, which must be included in the <b>diet</b> for collagen to be synthesised.</> },
            { point: <>Once consumed, gelatin is broken down by <b>hydrolysis</b> into its constituent <b>amino acids</b>.</> },
            { point: <>The body forms collagen by <b>condensation</b> of these amino acids to form the <b>polypeptide</b>. (&ldquo;Digestion&rdquo; or &ldquo;metabolism&rdquo; alone was not enough.)</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Vitamin C"
        marks={2}
        statement={
          <>
            Vitamin C is required for the production of collagen in the body.
            <br />
            What is the source of the vitamin C present in the body? Justify your answer.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part b.i. asks whether vitamin C is an <b>essential vitamin</b> (one the body cannot make, so it must
            come from the diet). Vitamins were part of the old study design&rsquo;s nutrition content and are not in
            the 2024–2027 study design, so this part is left without a worked solution; the skip guide skips
            vitamins questions in 2017 MCQ 16 and 2018 MCQ 7.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Antioxidants"
        marks={1}
        statement={
          <>
            Vitamin C is added to some foods to help prevent spoilage.
            <br />
            State how vitamin C can slow the rate of oxidative rancidity in some foods.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part b.ii. is about <b>antioxidants</b> and <b>oxidative rancidity</b> of foods, which belonged to the
            old study design and are not in the 2024–2027 one. It is left without a worked solution; the skip guide
            skips the same content in 2017 MCQ 12 (oxidative rancidity) and 2018 SAQ4d (antioxidants).
          </p>
        </Background>
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">c.</p>
        <p>
          Researchers have identified pathways that will enable production of the biofuel 2-methylpropan-1-ol from
          proteins. 2-methylpropan-1-ol can be used in petrol engines. 2-methylpropan-1-ol has a heat of combustion
          of 36.1 kJ g⁻¹.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Fuel Energy Content"
        marks={2}
        statement={<>Compare the energy content of octane and 2-methylpropan-1-ol. Explain the difference.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: <b>compare</b> (which releases more energy per gram, with both values in kJ g⁻¹),
            then <b>explain</b> using what the molecules contain. The alcohol has an O atom — it is already{' '}
            <b>partially oxidised</b>, so it has less left to give when it burns. The trap the report names is
            blaming octane&rsquo;s longer chain: per gram, longer alkanes actually release <i>less</i> energy.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>energy content of octane (47.9 kJ g⁻¹) is higher</b> than that of 2-methylpropan-1-ol (<b>36.1 kJ g⁻¹</b>).</> },
            { point: <>2-Methylpropan-1-ol <b>contains oxygen</b> and is therefore <b>already partially oxidised</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Calorimetry"
        marks={3}
        statement={
          <>
            A small fuel burner containing 2.36 g of 2-methylpropan-1-ol was placed directly underneath a beaker
            containing 500.0 g of water at standard laboratory conditions (SLC).
            <br />
            Calculate the maximum temperature that the water could reach if the contents of the fuel burner underwent
            complete combustion.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Three steps, one mark each: <b>energy released</b> by the fuel (mass × kJ g⁻¹), the{' '}
            <b>temperature rise</b> of the water from q = mcΔT, then the <b>final temperature</b>. &ldquo;Maximum&rdquo;
            means assume no heat is lost, so all the fuel&rsquo;s energy goes into the water. The last step is the
            easy one to miss: &ldquo;at SLC&rdquo; means the water starts at 25 °C, and the question wants the
            temperature it reaches, not the change.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>energy released = 2.36 × 36.1 = 85.2 kJ</b>.</> },
            { point: <>Correct <b>ΔT = E / mc = 85.2 × 10³ / (500 × 4.18) = 40.8 °C</b>.</> },
            { point: <>Correct <b>final temperature = 25.0 + 40.8 = 65.8 °C</b> (66 °C or 339 K) — starting from <b>25 °C at SLC</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
