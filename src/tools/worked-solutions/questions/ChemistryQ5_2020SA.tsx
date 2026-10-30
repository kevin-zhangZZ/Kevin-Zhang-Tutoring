// 2020 Chemistry Exam, Section B Question 5 (9 marks). Bananas: the equation for cellular
// respiration, the glycosidic link in sucrose and its two sugar units, why humans cannot use
// cellulose for energy, the number of bananas that replace 300 kJ, and the hydrolysis of starch
// by amylase with lysine drawn in a low-pH solution. Question text transcribed from the original
// paper; the disaccharide structure is cropped from the original VCAA exam PDF; the nutrient
// table is transcribed. The circled structure (b.i) and the lysine structure (d.ii) are cropped
// from the VCAA examination report. VCAA report only; the report does not itemise marks except
// through its sample answers, so the mark schemes are our reading. "How to Think About It"
// notes and model answers are original. Numbers checked in Python. Food energy values (17, 16,
// 37 kJ g⁻¹) are unchanged in the 2026 Data Book (item 11). Study design: b.ii (naming glucose
// and fructose from a structure) and b.iii (cellulose digestion) were explicit content on the
// 2017–2023 study design; the current one keeps carbohydrate hydrolysis/condensation but names
// no specific sugars — written up and flagged as borderline for KZ.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import sucroseSrc from './chem-2020sa-q5b-disaccharide.png'
import circledSrc from './chem-2020sa-q5bi-report-structure.png'
import lysineSrc from './chem-2020sa-q5dii-report-structure.png'

const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const EXAM_A: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />
      <br />
      A number of students struggled to produce this equation. There were also issues with students
      including ATP as a product but this produced an unbalanced equation and so could not be accepted.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={circledSrc}
        alt="The disaccharide structure with the oxygen bridge between the two rings circled in green — from the 2020 VCAA examination report"
        className="w-full max-w-[300px] mt-1 bg-white rounded"
      />
      <br />
      A significant number of students either did not answer this question or forgot to include the
      correct name of the link on the diagram.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      Glucose and fructose.
      <br />
      This question was well handled by students, and most provided both names required for the mark.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Humans lack the enzyme (cellulase) necessary for the digestion of cellulose.
      <br />
      The specific name of the enzyme was not required for the mark, just the recognition that the
      enzyme was missing from the human body. Reference to the substrate, cellulose, having incorrect
      shape for the human digestion enzymes was also accepted.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [20, 12, 20, 48],
  average: 1.9,
  comment: (
    <>
      Energy in 100 g banana = 1.1 x 17 + 22.8 x 16 + 0.3 x 37
      <br />
      = 18.7 + 364.8 + 11.1
      <br />
      = 395 kJ (394.6) *
      <br />
      Energy from one banana = (395 / 100) x 116
      <br />
      = 458 kJ (457.7) *
      <br />
      Number of bananas = Energy / Energy from one banana
      <br />
      = 300 / 457.7
      <br />
      = 0.66 * (0.65-0.67)
      <br />
      In general, this question was handled well, though some students failed to quote their final
      answer to two decimal places as instructed in the question.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [27, 73],
  average: 0.7,
  comment: <>Hydrolysis.</>,
}

const EXAM_DII: SAExaminerStats = {
  marks: [65, 35],
  average: 0.3,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={lysineSrc}
        alt="Lysine drawn with both amino groups as NH3+ and the carboxyl group as COOH — from the 2020 VCAA examination report"
        className="w-full max-w-[260px] mt-1 bg-white rounded"
      />
      <br />
      Both amino groups needed to be clearly shown as being protonated, with the charge on the nitrogen.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>glucose + oxygen → carbon dioxide + water</>,
    reason: <>Cellular respiration is the body&rsquo;s controlled <b>oxidation of glucose</b>: the same overall products as burning it, CO₂ and H₂O.</>,
  },
  {
    working: <><Chem eq="C6H12O6 + 6O2 -> 6CO2 + 6H2O" /></>,
    reason: <>Balance C first (6 C → 6CO₂), then H (12 H → 6H₂O), then O: 6 × 2 + 6 × 1 = 18 O on the right; glucose supplies 6, so 12 more = 6O₂.</>,
  },
  {
    working: <b><Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" /></b>,
    reason: <>Add states: glucose is dissolved in the body (aq), water is liquid at body temperature. Don&rsquo;t write <b>ATP</b> or &ldquo;energy&rdquo; as a product — the report would not accept ATP because the equation is then unbalanced.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: (
      <>
        Circle the <b>O atom bridging the two rings</b> (with its two C–O bonds):
        <img
          loading="lazy"
          decoding="async"
          src={circledSrc}
          alt="The bridging oxygen between the six-membered and five-membered rings circled — from the 2020 VCAA examination report"
          className="w-full max-w-[300px] mt-2 bg-white rounded"
        />
      </>
    ),
    reason: <>Each ring is one sugar unit. The only atom joining them is the single O in the middle, so that C–O–C is the link. (Image from the VCAA report.)</>,
  },
  {
    working: <b>Glycosidic link (glycosidic bond)</b>,
    reason: <>Name it <b>on the diagram</b> too — the report says many students forgot to include the name of the link on the diagram. It forms in a <b>condensation reaction</b>: an –OH on each sugar joins, losing H₂O.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>Six-membered ring (5 C + 1 O) with a CH₂OH group → <b>glucose</b></>,
    reason: <>Glucose, C₆H₁₂O₆, closes into a six-membered ring (Data Book: representations of selected biomolecules).</>,
  },
  {
    working: <>Five-membered ring (4 C + 1 O) with two CH₂OH groups → <b>fructose</b></>,
    reason: <>Fructose is also C₆H₁₂O₆, but closes into a five-membered ring, leaving a CH₂OH on each side of the ring oxygen. Together they make <b>sucrose</b>, the sugar in ripe fruit.</>,
  },
  {
    working: <b>Glucose and fructose</b>,
    reason: <>Both names are needed for the one mark.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <>To release energy, cellulose must first be <b>hydrolysed</b> into glucose, which needs an <b>enzyme</b>.</>,
    reason: <>Large carbohydrates are only a fuel once digestion breaks them into monosaccharides that can be absorbed and respired.</>,
  },
  {
    working: <><b>Humans lack the enzyme (cellulase)</b> needed to hydrolyse the glycosidic links in cellulose, so it passes through undigested and cannot be used as an energy source.</>,
    reason: <>The mark is for saying the <b>enzyme is missing</b> from the human body (the name cellulase is a bonus). Saying cellulose has the <b>wrong shape</b> to fit our digestive enzymes&rsquo; active sites was also accepted.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Energy per 100 g = Σ (mass × energy content)</>,
    reason: <>Only <b>protein, carbohydrate and fat</b> supply energy (Data Book: energy content of biomolecules in food). <b>Dietary fibre</b> is not digested by humans — the same reason as part b.iii — so it is left out.</>,
  },
  {
    working: <>= 1.1 g × 17 kJ g⁻¹ + 22.8 g × 16 kJ g⁻¹ + 0.3 g × 37 kJ g⁻¹</>,
    reason: <>Data Book: proteins 17 kJ g⁻¹, carbohydrates 16 kJ g⁻¹, fats and oils 37 kJ g⁻¹.</>,
  },
  { working: <>= 18.7 kJ + 364.8 kJ + 11.1 kJ = 394.6 kJ per 100 g</>, reason: <>Mark 1: energy in 100 g of banana.</> },
  {
    working: <>Energy per banana = 394.6 kJ × (116 g / 100 g) = 457.7… kJ</>,
    reason: <>Mark 2: scale up to one 116 g banana. Keep the unrounded 457.736 kJ.</>,
  },
  { working: <>Number of bananas = energy needed / energy per banana</>, reason: <>How many lots of 457.7 kJ make 300 kJ.</> },
  { working: <>= 300 kJ / 457.7… kJ = 0.6553…</> },
  {
    working: <b>Number of bananas = 0.66</b>,
    reason: <>Mark 3: <b>two decimal places</b>, as the question instructs — the report notes some students ignored this. Plausible: one banana (≈ 458 kJ) more than covers a 300 kJ run, so the answer is less than 1. The report accepted 0.65–0.67. Its working has three asterisks (*) — at 394.6 kJ, 457.7 kJ and 0.66 — which we read as the three marking points (the report does not say so explicitly).</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <><b>Hydrolysis</b></>,
    reason: <>Starch is a condensation polymer of glucose. Breaking its glycosidic links adds a water molecule across each one — the reverse of condensation — so it is a hydrolysis reaction (catalysed by the enzyme amylase).</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <>Lysine: <Chem eq="H2N–CH(COOH)–CH2CH2CH2CH2–NH2" /></>,
    reason: <>Start from lysine&rsquo;s structure in the Data Book (2-amino acids): an α-amino group, a carboxyl group, and a side chain of four CH₂ ending in a <b>second –NH₂</b>.</>,
  },
  {
    working: <>Low pH: <b>both –NH₂ → –NH₃⁺</b>; –COOH stays as <b>–COOH</b></>,
    reason: <>A low-pH solution has a high [H₃O⁺]. The amino groups are bases, so each accepts an H⁺. With so much H₃O⁺ present, the carboxyl group stays un-ionised as –COOH; it only loses its H⁺ (to –COO⁻) once the pH rises (it is –COO⁻ in the zwitterion near neutral pH).</>,
  },
  {
    working: (
      <>
        <img
          loading="lazy"
          decoding="async"
          src={lysineSrc}
          alt="Lysine in a low-pH solution: both nitrogens drawn as NH3+ with the charge on N, and the acid group as COOH — from the 2020 VCAA examination report"
          className="w-full max-w-[260px] bg-white rounded"
        />
        <b>H₃N⁺–CH(COOH)–CH₂CH₂CH₂CH₂–NH₃⁺</b>
      </>
    ),
    reason: <>Draw <b>every bond</b> (a structural formula), with <b>both</b> nitrogens as <b>NH₃⁺</b> and the + <b>on the N</b>. The report says both amino groups had to be clearly protonated, so a structure with only one –NH₃⁺ does not earn the mark. Overall charge 2+. (Image from the VCAA report.)</>,
  },
]

export default function ChemistryQ5_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (9 marks)</p>
        <p className="mb-2">
          Bananas provide essential vitamins and minerals, such as vitamin B<sub>6</sub> and vitamin C,
          along with dietary fibre and energy. During the ripening process, the banana changes in
          appearance, texture and taste.
        </p>
        <p>A ripe banana contains a high amount of glucose, whereas an unripe banana contains up to 80% starch.</p>
      </div>

      <PartCard
        letter="a"
        topic="Cellular Respiration"
        marks={1}
        statement={<>Write a balanced equation for cellular respiration.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            One mark for one equation you are expected to know by heart: glucose reacting with oxygen to
            give carbon dioxide and water. It must be <b>balanced</b>; include states. The trap the report
            names: adding <b>ATP</b> as a product, which leaves the equation unbalanced.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A <b>balanced</b> equation: <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />, with no ATP.</> }]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">The structure of a disaccharide found in a ripe banana is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={sucroseSrc}
            alt="A disaccharide: a six-membered ring sugar joined through an oxygen atom to a five-membered ring sugar, with CH2OH and OH groups — from the original 2020 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Glycosidic Link"
        marks={1}
        statement={<>On the structure above, circle and name the link that joins the two sugar units that make up the disaccharide.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Two jobs, one mark: <b>circle</b> the link and <b>name</b> it. Find the single atom that is
            shared between the two rings — the oxygen bridge. The report says many students either left it
            blank or circled it without writing its name.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The <b>C–O–C bridge between the rings circled</b> and named a <b>glycosidic link</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Monosaccharides"
        marks={1}
        statement={<>Name the two sugar units that make up this disaccharide.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Split the disaccharide at the glycosidic link and identify each ring by its size: the
            six-membered ring is <b>glucose</b>, the five-membered ring is <b>fructose</b>. Both names are
            needed for the mark. (Naming specific sugars was listed on the 2017–2023 study design; the
            current one covers carbohydrate condensation and hydrolysis without naming them, so treat
            this as good practice rather than certain exam content.)
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme source="ours" points={[{ point: <><b>Glucose</b> and <b>fructose</b> — both needed.</> }]} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Cellulose Digestion"
        marks={1}
        statement={
          <>
            Banana skins are primarily composed of cellulose.
            <br />
            Suggest why cellulose cannot be used as a source of energy in the human body.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <Background title="How to Think About It">
          <p>
            Cellulose is made of glucose, so the energy is there — the problem is getting it out. Polymers
            must be <b>hydrolysed by an enzyme</b> before the body can use them. One mark, one idea: humans{' '}
            <b>lack the enzyme</b> that breaks cellulose down. (Like b.ii, cellulose is old-study-design
            content, but the idea — enzymes hydrolyse large biomolecules — is current.)
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Humans lack the enzyme (cellulase)</b> to <b>hydrolyse/digest</b> cellulose (or: cellulose has the <b>wrong shape</b> for human digestive enzymes).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Energy Content of Food"
        marks={3}
        statement={
          <>
            The table below shows the amount of each nutrient in 100 g of banana.
            <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 my-3">
              <thead>
                <tr><th className={TD}>Nutrient</th><th className={TD}>Per 100 g</th></tr>
              </thead>
              <tbody>
                <tr><td className={TD}>protein</td><td className={`${TD} text-center`}>1.1 g</td></tr>
                <tr><td className={TD}>carbohydrates</td><td className={`${TD} text-center`}>22.8 g</td></tr>
                <tr><td className={TD}>fat</td><td className={`${TD} text-center`}>0.3 g</td></tr>
                <tr><td className={TD}>dietary fibre</td><td className={`${TD} text-center`}>2.6 g</td></tr>
              </tbody>
            </table>
            An athlete uses 300 kJ of energy for a five-minute run. A typical ripe banana has an average
            mass of 116 g after it is peeled.
            <br />
            How many typical ripe bananas, correct to two decimal places, would the athlete need to consume
            to replace the energy used during the run? Show your working.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Three marks, three steps: energy in <b>100 g</b> (mass of each nutrient × its Data Book energy
            content), energy in <b>one 116 g banana</b>, then <b>300 kJ ÷ energy per banana</b>. Leave out
            dietary fibre — humans can&rsquo;t digest it. The trap the report names: not giving the answer
            to <b>two decimal places</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>Energy in 100 g = 1.1 × 17 + 22.8 × 16 + 0.3 × 37 = 394.6 kJ</b> (fibre excluded).</> },
            { point: <><b>Energy in one banana = 394.6 × 116/100 = 457.7 kJ</b>.</> },
            { point: <><b>Number of bananas = 300 / 457.7 = 0.66</b>, to <b>two decimal places</b> (0.65–0.67 accepted).</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">d.</p>
        <p>
          During the ripening process, the enzyme amylase breaks down starch molecules into disaccharides
          and monosaccharides.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Hydrolysis"
        marks={1}
        statement={<>What name is given to this type of reaction?</>}
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            A big molecule is being broken into smaller ones by an enzyme. Breaking a link that was made by
            condensation uses water — that reaction type is <b>hydrolysis</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme source="ours" points={[{ point: <><b>Hydrolysis</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Amino Acids and pH"
        marks={1}
        statement={
          <>
            The amino acid lysine is present in the primary sequence of amylase.
            <br />
            Draw the structural formula for the amino acid lysine in a low-pH solution.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Look lysine up in the Data Book, then ask what acid does to each group: in a <b>low pH</b>{' '}
            (acidic) solution every <b>amino group is protonated</b> to –NH₃⁺ and the carboxyl stays –COOH.
            Lysine has <b>two</b> amino groups — one in its side chain — and the report says both had to be
            shown protonated with the charge on N. Only 35% of students scored the mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A structural formula with <b>both amino groups as –NH₃⁺</b> (<b>+ charge on the N</b>) and the <b>carboxyl as –COOH</b>.</> }]}
        />
      </PartCard>
    </div>
  )
}
