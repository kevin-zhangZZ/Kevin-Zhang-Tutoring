// 2025 Chemistry Exam, Section B Question 6 (14 marks). A redox titration of oxalate ions in spinach
// with acidified permanganate: the methodology behind the hypothesis, the self-indicating end point,
// why the titration is done at 50 °C, the average titre, the mass of oxalate in the raw sample, the
// percentage change after boiling, the effect of insufficient rinsing, and whether the results support
// the hypothesis. Question text transcribed from the original paper; the Part A and Part B method
// flowcharts are cropped from the original VCAA exam PDF; the results table is transcribed. Mark
// allocations are from the VCAA examination report (which itemises the marks for b, c.i, c.ii, e, g and
// h; for a, d and f the mark scheme is our reading); the worked solutions, "How to Think About It"
// notes and model answers are original. VCAA report only — no second source. Numbers checked in Python.
// The paper's "item 7" (colours of redox reagents) is item 8 in the 2026 Data Book, which now lists
// Mn²⁺ as colourless (dilute) / very pale pink (concentrated) — a Data Book note says so. The report's
// second accepted answer for c.ii refers to "boiling", although the titration method specifies 50 °C;
// kept verbatim and explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import partASrc from './chem-2025sa-q6-part-a.png'
import partBSrc from './chem-2025sa-q6-part-b.png'

const BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

// Built from separate Chem pieces: Chem renders a bare " + " between species as a superscript.
const EQUATION = (
  <span>
    <Chem eq="2MnO₄⁻(aq)" /> + <Chem eq="5C₂O₄²⁻(aq)" /> + <Chem eq="16H+(aq)" /> → <Chem eq="2Mn2+(aq)" /> + <Chem eq="10CO2(g)" /> + <Chem eq="8H2O(l)" />
  </span>
)

const EXAM_A: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: <>Literature review.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: (
    <>
      The mark was awarded for recognising that during a permanganate titration, the end point is denoted
      when the solution starts to take on the colour of the titrant, i.e. first sign of permanent
      &lsquo;purple&rsquo; colour.
      <br />
      &lsquo;Pink&rsquo; could not be accepted as Item 7 of the Databook states that the Mn²⁺ ion is pink,
      and this will be steadily forming as the titration reaction takes place.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: <>The mark was awarded for recognising that the increased temperature will cause a faster rate of reaction.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      Students responded to this question in two possible ways, both of which were accepted. Responses
      could be either:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Room temperature would result in a reaction that was too slow to get valid results. OR</li>
        <li>
          Room temperature was not stated in the methodology, &lsquo;boiling&rsquo; was required. Therefore,
          this would not be a valid step.
        </li>
      </ul>
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Average titre = (15.45 + 15.40 + 15.40) / 3 = 15.42 mL (0.01542 L)</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [36, 9, 18, 24, 13],
  average: 1.7,
  comment: (
    <>
      The first mark was awarded for the correct calculation of permanganate ion.
      <br />
      n(MnO₄⁻)<sub>titre</sub> = 0.0020 x 15.42/1000 = 3.084 x 10⁻⁵ mol
      <br />
      The second mark was awarded for the correct calculation of oxalate ion in aliquot.
      <br />
      n(C₂O₄²⁻)<sub>25 mL</sub> = 5/2 x 3.084 x 10⁻⁵ = 7.71 x 10⁻⁵ mol
      <br />
      The third mark was awarded for the correct calculation of oxalate ion in spinach sample.
      <br />
      n(C₂O₄²⁻)<sub>500 mL</sub> = 500/25 x 7.71 x 10⁻⁵ = 1.542 x 10⁻³ mol (in 15.15 g of spinach)
      <br />
      The fourth mark was awarded for the correct calculation of mass of oxalate ion.
      <br />
      m(C₂O₄²⁻)<sub>15.15 g</sub> = 88.0 x 1.542 x 10⁻³ = 0.136 g = 0.14 g (in 15.15 g of spinach)
      <br />
      The most common issue was students not allowing for dilution or reaction stoichiometry in their
      calculations.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [83, 17],
  average: 0.2,
  comment: <>% reduction = (raw − cooked) / raw × 100 = (0.136 − 0.0545) / 0.136 × 100 = 60%</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [61, 34, 5],
  average: 0.5,
  comment: (
    <>
      The first mark was awarded for showing an understanding that residual water remaining on the outside
      of leaves would add soluble oxalate ions into the analysis.
      <br />
      The second mark was awarded for showing an understanding that this would lead to more permanganate
      being required or a larger titre of permanganate.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [44, 20, 36],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for recognising that 75% was the predicted outcome in the hypothesis.
      <br />
      The second mark was awarded for making a comparison or a correct statement as to whether the result
      from Question 6f. was higher than, lower than or the same as the 75% predicted.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <b>literature review</b>,
    reason: (
      <>
        The stem says Karolina &ldquo;undertook <b>research</b> to collect background information&rdquo; and
        developed her hypothesis &ldquo;from her research&rdquo; — gathering and summarising what others have
        already published is a <b>literature review</b>. A <i>case study</i> examines one particular real
        situation in depth, <i>fieldwork</i> collects data outside the lab, and <i>modelling</i> builds a
        physical or mathematical representation — none of these is reading background information.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>As each drop of KMnO₄ is added, the <b>intense purple</b> MnO₄⁻ reacts with oxalate and is reduced to Mn²⁺, which is almost <b>colourless</b>, so the purple disappears.</>,
    reason: (
      <>
        Permanganate is <b>self-indicating</b> — no indicator is added. While oxalate remains in the flask, all the
        MnO₄⁻ is used up straight away and its colour vanishes.
        <DataBookNote>
          the paper&rsquo;s &ldquo;item 7&rdquo; (colours of redox reagents) is item 8 in the 2026 Data Book. The
          2025 Data Book listed Mn²⁺ as &ldquo;very pale pink&rdquo;; the 2026 Data Book lists it as a
          colourless solution (dilute) or very pale pink solution (concentrated). MnO₄⁻ is &ldquo;intense
          purple&rdquo; in both, so the answer is unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <b>The end point is the first permanent (pale) purple colour of excess MnO₄⁻ in the conical flask.</b>,
    reason: (
      <>
        Once all the oxalate has reacted, the next drop of MnO₄⁻ has nothing to react with, so its <b>purple</b>{' '}
        colour stays. Don&rsquo;t write &ldquo;pink&rdquo;: the report did not accept it, because Mn²⁺ (listed in
        the Data Book as pale pink) forms throughout the titration, so a pink tinge is not a sign of the end
        point.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>At 50 °C the particles have <b>more kinetic energy</b>, so they <b>collide more frequently</b> and a <b>greater proportion of collisions have energy ≥ the activation energy</b>.</>,
    reason: <>Collision theory: a reaction happens only when particles collide with enough energy (≥ E<sub>a</sub>) and the right orientation. The bigger effect of heating is the larger fraction of successful collisions.</>,
  },
  {
    working: <b>So the frequency of successful collisions increases and the rate of reaction is faster — the titration reaches its end point quickly and clearly.</b>,
    reason: <>The mark is for the <b>faster rate of reaction</b>. (The reaction between permanganate and oxalate is slow at room temperature — each drop would take a long time to decolourise.)</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>At room temperature the reaction would be <b>too slow</b>: the purple colour would linger even before all the oxalate had reacted, so the <b>end point could not be judged accurately</b> (a false, early end point).</>,
    reason: <>&ldquo;Valid&rdquo; means the experiment measures what it is meant to measure — here, the true amount of oxalate. A slow reaction gives titres that don&rsquo;t reflect the oxalate present.</>,
  },
  {
    working: <b>The titres would not be a true measure of the oxalate in the sample, so the results (and comparisons between the raw and cooked samples) would not be valid.</b>,
    reason: (
      <>
        Either idea earned the mark: the reaction being <b>too slow to give valid results</b>, or that room
        temperature <b>was not the temperature stated in the method</b>, so changing it means the method was not
        followed (temperature is a <b>controlled variable</b>). The report&rsquo;s second answer says
        &ldquo;&lsquo;boiling&rsquo; was required&rdquo;; the method actually specifies a <b>50 °C</b> water bath,
        so write &ldquo;the method specifies 50 °C&rdquo;.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>Concordant titres: 15.45, 15.40, 15.40 mL (trial 1, 16.10 mL, is excluded)</>,
    reason: <>Only <b>concordant</b> titres (within about 0.10 mL of each other) are averaged. Trial 1 is 0.65 mL higher than the rest — typical of a rough first titration where the end point is overshot — so it is left out.</>,
  },
  { working: <>average titre = (15.45 + 15.40 + 15.40) / 3 mL</> },
  {
    working: <b>average titre = 15.42 mL</b>,
    reason: <>(15.416… mL unrounded.) Given to two decimal places, like the burette readings. Including trial 1 would give 15.59 mL — wrong.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  { working: <>n(MnO₄⁻) = c × V</>, reason: <>Start from the solution you know both the concentration and volume of: the permanganate in the burette.</> },
  { working: <>n(MnO₄⁻) = 0.0020 mol L⁻¹ × 0.01542 L</>, reason: <>The average titre from part d, converted to litres: 15.42 mL ÷ 1000 = 0.01542 L.</> },
  { working: <>n(MnO₄⁻) = 3.084 × 10⁻⁵ mol</>, reason: <>Mark 1: moles of permanganate in the titre.</> },
  {
    working: <>n(C₂O₄²⁻) : n(MnO₄⁻) = 5 : 2</>,
    reason: <>Mole ratio from the equation: {EQUATION}. The report names missing the reaction stoichiometry as a common issue.</>,
  },
  { working: <>n(C₂O₄²⁻) in 25.0 mL = (5/2) × 3.084 × 10⁻⁵ mol = 7.71 × 10⁻⁵ mol</>, reason: <>Mark 2: moles of oxalate in the <b>aliquot</b> — the 25.0 mL in the conical flask.</> },
  {
    working: <>n(C₂O₄²⁻) in 500 mL = (500 / 25.0) × 7.71 × 10⁻⁵ mol = 1.542 × 10⁻³ mol</>,
    reason: <>Mark 3: scale up to the <b>whole 500 mL volumetric flask</b>, which holds all the oxalate from the 15.15 g of spinach. Only 25.0 mL of the 500 mL was titrated, so multiply by 500/25.0 = 20. Forgetting this <b>dilution</b> step is the other common issue the report names.</>,
  },
  { working: <>m(C₂O₄²⁻) = n × M</> },
  { working: <>m(C₂O₄²⁻) = 1.542 × 10⁻³ mol × 88.0 g mol⁻¹</>, reason: <>M(C₂O₄²⁻) = 88.0 g mol⁻¹ is given (2 × 12.0 + 4 × 16.0 = 88.0).</> },
  {
    working: <b>m(C₂O₄²⁻) = 0.136 g ≈ 0.14 g (in 15.15 g of spinach)</b>,
    reason: <>Mark 4: the mass, in grams as asked. (0.1357 g before rounding; carrying the unrounded titre, 15.416… mL, gives 0.1357 g too.) Two significant figures, set by the 0.0020 M permanganate; the report gives both 0.136 g and 0.14 g. Keep 0.136 g for part f. Sanity check: about 0.9% of the spinach&rsquo;s mass — plausible for a vegetable known for oxalate.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  { working: <>% change = (cooked − raw) / raw × 100%</>, reason: <>Percentage change compares the change with the <b>original</b> (raw) amount. The raw mass is from part e; the cooked mass, 0.0545 g, is given.</> },
  { working: <>% change = (0.0545 g − 0.136 g) / 0.136 g × 100%</>, reason: <>Use the unrounded or 3-figure raw mass (0.136 g). Using the 2-figure 0.14 g would give 61%.</> },
  {
    working: <b>% change = −60%, i.e. a 60% decrease (reduction) in oxalate</b>,
    reason: <>(−59.8…% unrounded.) The negative sign shows a decrease; VCAA writes it as a &ldquo;% reduction&rdquo; of 60% — both say the same thing. Plausible: boiling removed some, but not all, of the oxalate.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <>Boiling dissolves <b>water-soluble oxalate</b> out of the leaves into the cooking water. If the leaves are not rinsed thoroughly, <b>residual cooking water on the outside of the leaves still contains dissolved oxalate ions</b>, which are carried into Step 2 and <b>added to the analysis</b>.</>,
    reason: <>Mark 1: <b>where the extra oxalate comes from</b>. This oxalate has really been removed from the leaves by boiling, but it is still measured as if it were in the cooked spinach.</>,
  },
  {
    working: <>These extra C₂O₄²⁻ ions react with permanganate, so <b>more MnO₄⁻ is required — a larger titre</b> — and the calculated amount of C₂O₄²⁻ is <b>higher than the true value</b>.</>,
    reason: <>Mark 2: link the extra oxalate to the <b>larger titre</b>. The calculation in part e is directly proportional to the titre, so a larger titre always gives a larger calculated amount.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <>The hypothesis <b>predicted that boiling would remove 75%</b> of the oxalate.</>,
    reason: <>Mark 1: state the <b>prediction</b> — quote the 75% from the hypothesis.</>,
  },
  {
    working: <b>The experiment found only about a 60% reduction (part f), which is lower than the 75% predicted, so the findings do not support the hypothesis.</b>,
    reason: <>Mark 2: <b>compare</b> the result with the prediction (60% is <b>lower than</b> 75%) and draw the conclusion. The report&rsquo;s second mark asks whether the 6f result is higher than, lower than or the same as 75%. You can add that this is based on a single cooked sample, so more trials would make the conclusion more reliable — but the marks are for the comparison.</>,
  },
]

export default function ChemistryQ6_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (14 marks)</p>
        <p className="mb-2">
          Many vegetables contain compounds that taste bitter because of the oxalate ion, C₂O₄²⁻. Removing the
          bitterness can be achieved through different cooking methods, including boiling and steaming.
        </p>
        <p className="mb-2">
          VCE Chemistry student Karolina undertook research to collect background information for her
          scientific investigation and learnt that oxalate compounds can be water-soluble and water-insoluble.
        </p>
        <p className="mb-2">
          From her research Karolina developed the following hypothesis: &lsquo;The boiling process will remove
          75% of the oxalate compounds in spinach leaves.&rsquo;
          <br />
          Karolina tested her hypothesis by investigating the effectiveness of boiling to remove C₂O₄²⁻ from
          spinach leaves.
        </p>
        <p className="mb-3">The method developed by Karolina is outlined below.</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Part A – Preparation of oxalate ion solution</p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={partASrc}
            alt="Part A flowchart. Step 1: Place chopped spinach leaves into a beaker. Add 1 M HCl and mix. Step 2: Filter the spinach mixture into a 500 mL volumetric flask. Fill to the level with deionised water. Step 3: Heat the volumetric flask in a hot water bath to reach 50 °C. Leave the flask in the bath. — from the original 2025 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Part B – Titration</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={partBSrc}
            alt="Part B flowchart. Step 1: Fill a 50.00 mL burette with 0.0020 M acidified potassium permanganate, KMnO4, solution (burette on a stand). Step 2: From the volumetric flask in the 50 °C hot water bath, pipette a 25.0 mL aliquot into a conical flask (pipette diagram). Step 3: Immediately titrate until a permanent colour change is observed in the conical flask (burette over a conical flask). — from the original 2025 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Investigation Methodology"
        marks={1}
        statement={
          <>
            Circle the scientific investigation methodology that Karolina most likely used to develop her
            hypothesis.
            <br />
            case study &nbsp;&nbsp;&nbsp; fieldwork &nbsp;&nbsp;&nbsp; literature review &nbsp;&nbsp;&nbsp; modelling
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            This tests the named scientific methodologies in the study design. Look for the clue in the stem:
            the hypothesis came <i>before</i> any experiment, &ldquo;from her research&rdquo; collecting
            background information. Reading and summarising existing sources is a <b>literature review</b>.
            Fewer than half the cohort got this — don&rsquo;t pick &ldquo;fieldwork&rdquo; just because she later
            did practical work.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="ours" points={[{ point: <><b>Literature review</b> circled.</> }]} />
      </PartCard>

      <div className={BOX}>
        <p className="mb-2">
          C₂O₄²⁻ reacts with permanganate ions, MnO₄⁻, according to the equation below.
        </p>
        <p className="text-center">
          {EQUATION}
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Titration End Point"
        marks={1}
        statement={
          <>
            Refer to <b>item 7</b> of the Data Book. What specific observation did Karolina use to determine the
            end point of the titration?
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            No indicator is added, so the colour change must come from the reactants themselves. Look up the
            colours: MnO₄⁻ (the titrant in the burette) is <b>intense purple</b>; its product Mn²⁺ is almost
            colourless. The end point is the first drop of permanganate that has nothing left to react with —
            so its <b>purple colour stays</b>. Only about a fifth of students scored this; the trap the report
            names is writing &ldquo;pink&rdquo;, which describes the Mn²⁺ forming all through the titration.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The solution starts to take on the colour of the titrant: the <b>first sign of a permanent purple colour</b> (excess MnO₄⁻). &ldquo;Pink&rdquo; was not accepted.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">c.</p>
        <p>The reaction was conducted at 50 °C rather than at room temperature.</p>
      </div>

      <PartCard
        letter="c.i"
        topic="Collision Theory"
        marks={1}
        statement={<>Use collision theory to state why this is a preferred temperature at which to conduct the reaction.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Use collision theory&rdquo; means explain in terms of particles: higher temperature → more
            kinetic energy → more frequent collisions and a greater proportion with energy above the
            activation energy → <b>faster rate of reaction</b>. The single mark is for the faster rate, but
            giving the collision-theory reason shows you have done what the question asks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="vcaa" points={[{ point: <>The increased temperature causes a <b>faster rate of reaction</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Validity"
        marks={1}
        statement={<>State why the experiment might no longer be valid if the reaction is conducted at room temperature.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            A <b>valid</b> experiment measures what it claims to measure and follows its method. Link the
            temperature to the result: at room temperature the reaction is too slow, so the end point (the
            first permanent purple) would appear before all the oxalate had reacted and the titres would not
            reflect the true amount of oxalate. The report also accepted the simpler point that room temperature
            is not what the method specifies, so the method would not have been followed.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Either: room temperature gives a reaction that is <b>too slow to get valid results</b>; or room temperature <b>was not stated in the methodology</b>, so it would not be a valid step.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Results</p>
        <p className="mb-2">Karolina recorded the titration results for the uncooked spinach in the table below.</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className={TD}>Trial</th>
              <th className={TD}>Initial volume (mL)</th>
              <th className={TD}>Final volume (mL)</th>
              <th className={TD}>Titre (mL)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className={TD}>1</td><td className={TD}>1.10</td><td className={TD}>17.20</td><td className={TD}>16.10</td></tr>
            <tr><td className={TD}>2</td><td className={TD}>17.20</td><td className={TD}>32.65</td><td className={TD}>15.45</td></tr>
            <tr><td className={TD}>3</td><td className={TD}>32.65</td><td className={TD}>48.05</td><td className={TD}>15.40</td></tr>
            <tr><td className={TD}>4</td><td className={TD}>11.00</td><td className={TD}>26.40</td><td className={TD}>15.40</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="d"
        topic="Average Titre"
        marks={1}
        statement={<>Calculate the average titre of MnO₄⁻ used in the experiment.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            An &ldquo;average titre&rdquo; in VCE Chemistry always means the average of the <b>concordant</b>{' '}
            titres — those that agree closely (within about 0.10 mL). Scan the column first: three titres sit
            at 15.40–15.45 mL, while trial 1 (16.10 mL) is well above them and is discarded. Averaging all four
            is the trap.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme source="ours" points={[{ point: <><b>Average of the concordant titres</b> (trial 1 excluded) <b>= 15.42 mL</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Redox Titration"
        marks={4}
        statement={
          <>
            A 15.15 g sample of uncooked spinach was used.
            <br />
            Calculate the mass of C₂O₄²⁻ (<i>M</i> = 88.0 g mol⁻¹) in the sample using the experimental results
            above. Give your answer in grams.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Follow the oxalate back from the burette to the spinach, one step per mark: (1) moles of MnO₄⁻
            in the average titre; (2) the <b>5 : 2 mole ratio</b> gives moles of C₂O₄²⁻ in the 25.0 mL aliquot;
            (3) the aliquot was only 25.0 mL of the <b>500 mL</b> flask, so multiply by 20 to get all the
            oxalate from the spinach; (4) mass = n × M. The report says the most common issue was missing the
            dilution step or the reaction stoichiometry — so write each of these as its own line.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>n(MnO₄⁻) in the titre = c × V = 0.0020 × 0.01542 = 3.084 × 10⁻⁵ mol</b>.</> },
            { point: <>Correct <b>n(C₂O₄²⁻) in the 25 mL aliquot = 5/2 × 3.084 × 10⁻⁵ = 7.71 × 10⁻⁵ mol</b> (the <b>5 : 2 mole ratio</b>).</> },
            { point: <>Correct <b>n(C₂O₄²⁻) in the 500 mL flask = 500/25 × 7.71 × 10⁻⁵ = 1.542 × 10⁻³ mol</b> — allowing for the <b>dilution</b>.</> },
            { point: <>Correct <b>m(C₂O₄²⁻) = 88.0 × 1.542 × 10⁻³ = 0.136 g ≈ 0.14 g</b>, in grams.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="mb-2">Karolina then prepared a second 15.15 g sample of spinach as follows:</p>
        <ul className="list-disc pl-5 mb-2">
          <li>boiled in deionised water for two minutes</li>
          <li>thoroughly rinsed with deionised water using a sieve</li>
          <li>left overnight to dry</li>
        </ul>
        <p>This cooked sample was then tested using the steps outlined in Part A and Part B above.</p>
      </div>

      <PartCard
        letter="f"
        topic="Percentage Change"
        marks={1}
        statement={
          <>
            Karolina calculated the mass of C₂O₄²⁻ to be 0.0545 g in this sample.
            <br />
            Determine the percentage change of C₂O₄²⁻ that resulted by boiling the spinach in this experiment.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            Percentage change = (new − original) ÷ original × 100%. The original is the <b>raw</b> spinach
            (0.136 g from part e); the new value is the cooked sample (0.0545 g). Only 17% of students scored this
            mark: divide by the <b>raw</b> mass (not the cooked one), and make clear it is a <b>decrease</b> — not
            &ldquo;40%&rdquo;, which is the fraction that <i>remained</i>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme source="ours" points={[{ point: <><b>(0.136 − 0.0545) / 0.136 × 100 = 60% reduction</b> (a change of −60%), dividing by the <b>raw</b> value.</> }]} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Experimental Error"
        marks={2}
        statement={
          <>
            Rinsing is an essential step in the process for testing the cooked spinach.
            <br />
            Explain why insufficient rinsing of the cooked sample before commencing Step 2 of Part A above would
            lead to a calculated C₂O₄²⁻ concentration that is higher than the true value.
          </>
        }
        examinerReport={EXAM_G}
      >
        <Background title="How to Think About It">
          <p>
            Two marks means a two-link chain: <b>cause</b> → <b>effect on the measurement</b>. Boiling dissolves
            the soluble oxalate into the cooking water; water left on unrinsed leaves still carries that
            oxalate into the analysis (mark 1). More oxalate in the flask means <b>more permanganate is needed
            — a larger titre</b> — and so a higher calculated value (mark 2). Only 5% scored both marks, so
            write both links explicitly: a vague &ldquo;contamination&rdquo; says neither what is added nor how
            it changes the titre.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Residual water</b> remaining on the outside of the leaves would <b>add soluble oxalate ions</b> into the analysis.</> },
            { point: <>This would lead to <b>more permanganate being required</b> / a <b>larger titre</b> of permanganate.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="h"
        topic="Evaluating Hypothesis"
        marks={2}
        statement={<>Discuss whether the findings support Karolina&rsquo;s hypothesis.</>}
        examinerReport={EXAM_H}
      >
        <Background title="How to Think About It">
          <p>
            Evaluating a hypothesis means comparing the <b>prediction</b> with the <b>result</b>. Two marks, two
            ideas: quote what the hypothesis predicted (75% removed), then compare it with what was found (about
            60% in part f) and say whether that supports it. Put the two numbers side by side: a general discussion without them does not make the comparison the second mark asks for.
          </p>
        </Background>
        <WorkingTable rows={ROWS_H} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Recognising that <b>75%</b> was the <b>predicted outcome</b> in the hypothesis.</> },
            { point: <>A <b>comparison</b> of the part f result with the 75% predicted — <b>60% is lower than 75%</b>, so the findings <b>do not support</b> the hypothesis.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
