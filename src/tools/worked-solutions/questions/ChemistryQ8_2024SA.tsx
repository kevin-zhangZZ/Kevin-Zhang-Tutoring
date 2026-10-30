// 2024 Chemistry Exam, Section B Question 8 (12 marks). Producing bioethanol by fermenting glucose
// with yeast: the fermentation equation, why boiling water is not used, the amount of CO₂ from a
// mass-loss method (A) and a gas-collection method (B), the assumption behind using the molar
// volume, the resolution of the two sets of data, the independent variable, whether a rate graph
// supports the hypothesis, a limitation of Method B and where it belongs on a scientific poster.
// Question text transcribed from the original paper (the 2024 paper has no extractable text — read
// from rendered pages); the Method A and Method B diagrams and the part c. graph are cropped from
// the original VCAA exam PDF; the method steps and both results tables are transcribed. Mark
// allocations: the report itemises the marks for b.iv and c.ii (source "vcaa"); the other parts
// are one-mark parts with the report's answer, read as our mark scheme ("ours"). The report's
// introductory note on resolution (Question 8b.iv) is quoted verbatim in a Background. "How to
// Think About It" notes and model answers are original. VCAA report only — no second source.
// Numbers checked in Python; molar volume 24.8 L mol⁻¹ is unchanged in the 2026 Data Book.
// Report slip-watch: b.i's 0.0023 mol carries two significant figures from a one-significant-figure
// mass change (0.1 g) — kept verbatim, noted in the working.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import balanceSrc from './chem-2024sa-q8-method-a-balance.png'
import buretteSrc from './chem-2024sa-q8-method-b-burette.png'
import graphSrc from './chem-2024sa-q8c-graph.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'
const TH = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center font-semibold'

const EXAM_AI: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <><Chem eq="C6H12O6(aq) -> 2C2H5OH(aq) + 2CO2(g)" /></>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      The high temperature will denature the enzyme.
      <br />
      Many responses stated that the &lsquo;yeast would be killed/destroyed/denatured&rsquo;. These responses
      could not be accepted as they showed no understanding that the enzyme is the key component needed for
      this reaction to occur and not the organism itself.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      The mark was awarded for the correct calculation of the amount of carbon dioxide.
      <br />
      n(CO₂) = 0.1 / 44 = 0.0023 mol
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: (
    <>
      The mark was awarded for the correct calculation of the amount of carbon dioxide.
      <br />
      V(CO₂) = 32.5 – 0.5 = 32.0 mL
      <br />
      n(CO₂) = 0.032 / 24.8 = 0.00129 mol
      <br />
      The most common errors were caused by failure to:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>subtract the initial volume from the final volume</li>
        <li>divide the volume of gas by 1000 to convert to litres.</li>
      </ul>
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [73, 27],
  average: 0.3,
  comment: (
    <>
      Any of the following valid responses were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The gas collected behaves as an ideal gas.</li>
        <li>Carbon dioxide does not react with / dissolve in water, so all CO₂ produced ends up as gas in the burette.</li>
        <li>Gas collected in the burette is 25 °C.</li>
        <li>Gas collected in the burette is 100 kPa.</li>
        <li>The only gas present in the burette is carbon dioxide.</li>
      </ul>
      Responses simply stating that &lsquo;the experiment was being conducted at SLC&rsquo; contained insufficient
      information as the question clearly states that the glucose reacting with yeast enzymes occurs at 35 °C.
    </>
  ),
}

const EXAM_BIV: SAExaminerStats = {
  marks: [86, 13, 1],
  average: 0.2,
  comment: (
    <>
      One mark was awarded for each correct resolution value.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>In method A, the resolution of the balance was 0.1 g.</li>
        <li>In method B, the resolution of the burette must have been 1 mL.</li>
      </ul>
      Units were required for resolution quantities.
      <br />
      While some students could identify the correct resolution of the balance, a significant number of
      students was unable to determine the resolution of the burette. For further details about this
      question, please refer to the introductory section of this report.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: <>The independent variable is the concentration of the glucose solution.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [52, 30, 17],
  average: 0.7,
  comment: (
    <>
      The first mark was awarded for identifying that the hypothesis is not supported.
      <br />
      The second mark was awarded for a clear reference to the graph that indicated that the &lsquo;slope of
      the line&rsquo; or the &lsquo;quantity of gas formed&rsquo; over the first 15 minutes was the same.
      <br />
      Students often responded to this question without making a direct reference to the graph. A response
      that simply stated that the &lsquo;rate&rsquo; was the same for the first 15 minutes was not awarded the
      mark.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [67, 33],
  average: 0.4,
  comment: (
    <>
      Any of the following valid responses were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The gas may dissolve in the water as it bubbles through.</li>
        <li>The collected gas pressure may not be the same as atmospheric pressure.</li>
        <li>Some gas may escape before the stopper is applied / Not all gas was collected in the burette.</li>
        <li>There may be difficulty in setting up the complex arrangement.</li>
        <li>The gas temperature is not at 25 °C (originally at 35 °C).</li>
        <li>The burette cannot collect the 500 mL of gas shown forming in the graph.</li>
      </ul>
      The only condition that could have voided one of these responses was if the student had used the same
      response in Question 8b.iii.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      The discussion is where the limitation should be identified.
      <br />
      This was well answered by students.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>glucose → ethanol + carbon dioxide</>,
    reason: <>Fermentation: yeast enzymes break glucose down into <b>ethanol</b> and <b>carbon dioxide</b> only. Write the word equation first so you know the products.</>,
  },
  {
    working: <><Chem eq="C6H12O6(aq) -> C2H5OH(aq) + CO2(g)" /></>,
    reason: <>Glucose is dissolved (aq), ethanol is dissolved in the water (aq), CO₂ bubbles off as a gas (g).</>,
  },
  {
    working: <b><Chem eq="C6H12O6(aq) -> 2C2H5OH(aq) + 2CO2(g)" /></b>,
    reason: <>Balance: 6 C on the left = 2 × 2 C (ethanol) + 2 × 1 C (CO₂) ✓; 12 H = 2 × 6 H ✓; 6 O = 2 × 1 O + 2 × 2 O ✓. You may write &ldquo;yeast&rdquo; or &ldquo;enzymes&rdquo; over the arrow, but the balancing is what earns the mark.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>Boiling water (100 °C) would <b>denature the enzymes</b> in the yeast,</>,
    reason: <>The key word is <b>enzyme</b>. The report did not accept &ldquo;the yeast would be killed&rdquo; — it is the enzyme, not the organism, that catalyses the reaction.</>,
  },
  {
    working: <>changing their <b>active site</b> so they can <b>no longer catalyse</b> the fermentation of glucose (no ethanol would form).</>,
    reason: <>Enzymes are proteins; high temperature disrupts the bonds holding their 3-D shape. 35 °C is close to the enzymes&rsquo; optimum temperature, which is why Step 1 uses it.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>m(CO₂) = 282.5 g − 282.4 g = 0.1 g</>,
    reason: <>The flask is open, so the CO₂ gas escapes into the air: the <b>mass lost</b> is the mass of CO₂ produced. (The gas is CO₂ — that is why its molar mass is 44.0 g mol⁻¹: 12.0 + 2 × 16.0.)</>,
  },
  { working: <>n(CO₂) = m / M</> },
  { working: <>n(CO₂) = 0.1 g / 44.0 g mol⁻¹</> },
  {
    working: <b>n(CO₂) = 0.0023 mol (2.3 × 10⁻³ mol)</b>,
    reason: <>(0.002272… mol unrounded.) This is the report&rsquo;s answer. Strictly, a mass change of 0.1 g has only <b>one</b> significant figure, so it is a very rough value — exactly the weakness part b.iv is about.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>V(CO₂) = 32.5 mL − 0.5 mL = 32.0 mL</>,
    reason: <>The burette already read 0.5 mL at time 0, so the gas produced is the <b>change</b> in volume. Not subtracting was one of the two errors the report lists.</>,
  },
  {
    working: <>V(CO₂) = 32.0 mL ÷ 1000 = 0.0320 L</>,
    reason: <>The molar volume is in <b>litres</b> per mole, so convert mL → L (÷ 1000) — the report&rsquo;s other listed error.</>,
  },
  { working: <>n(CO₂) = V / V<sub>m</sub></>, reason: <>At SLC (25 °C, 100 kPa) one mole of any gas occupies 24.8 L (Data Book, molar volume of an ideal gas at SLC).</> },
  { working: <>n(CO₂) = 0.0320 L / 24.8 L mol⁻¹</> },
  {
    working: <b>n(CO₂) = 1.29 × 10⁻³ mol (0.00129 mol)</b>,
    reason: <>Three significant figures (32.0 and 24.8 each have three). It is less than Method A&rsquo;s 0.0023 mol — not surprising, since Method A&rsquo;s 0.1 g is so imprecise and its open flask can also lose water by evaporation at 35 °C.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <>The gas collected in the burette is at <b>25 °C and 100 kPa</b> (SLC),</>,
    reason: <>The calculation in b.ii used 24.8 L mol⁻¹, which is only true at SLC. The reaction itself is at <b>35 °C</b>, so you must say the <b>gas in the burette</b> has cooled to 25 °C — &ldquo;the experiment was at SLC&rdquo; was not accepted.</>,
  },
  {
    working: <>(Other assumptions that also earn the mark — give just one: <b>no CO₂ dissolves</b> in or reacts with the water, so <b>all of the CO₂</b> ends up in the burette; CO₂ is the <b>only gas</b> in the burette; the gas behaves as an <b>ideal gas</b>.)</>,
    reason: <>Any <b>one</b> valid assumption earns the mark. Choose one and state it clearly — and remember part d.i will ask for a limitation that is <b>different</b> from whatever you write here.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <>Method A: the resolution of the balance is <b>0.1 g</b>.</>,
    reason: <>Mark 1. <b>Resolution</b> is the smallest change an instrument can show. The balance is digital and displays one decimal place (282.4 g), so the last digit it can change by is 0.1 g. A unit is required.</>,
  },
  {
    working: <>Method B: the resolution of the burette is <b>1 mL</b>.</>,
    reason: <>Mark 2. The volumes are recorded to the nearest 0.5 mL (0.5 mL, 32.5 mL). By the study design&rsquo;s convention a reading can be quoted to half a division, so a reading in 0.5 mL steps means the burette is graduated every <b>1 mL</b> — its resolution is 1 mL, not 0.5 mL. The report says a significant number of students could not work this out.</>,
  },
  {
    working: <>Method B&rsquo;s data has the <b>finer resolution</b> for the amount of gas: 1 mL of CO₂ is only 4.0 × 10⁻⁵ mol, whereas 0.1 g of CO₂ is 2.3 × 10⁻³ mol.</>,
    reason: <>&ldquo;Compare&rdquo; — a sentence linking the two values completes the answer. The marks themselves are for the two resolutions with units. (1 × 10⁻³ L ÷ 24.8 L mol⁻¹ = 4.0 × 10⁻⁵ mol; 0.1 g ÷ 44.0 g mol⁻¹ = 2.3 × 10⁻³ mol — about 56 times coarser.)</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <b>The concentration of the glucose solution (10.0 g or 20.0 g of glucose per 100 mL of water).</b>,
    reason: <>The <b>independent variable</b> is the one the experimenter deliberately <b>changes</b>. Lucia changed only the amount of glucose dissolved in the same 100 mL of water — i.e. its concentration. (Time is on the horizontal axis, but it is not what Lucia varied between trials; the volume of gas is the dependent variable.)</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <><b>No</b>, the graph <b>does not support</b> Lucia&rsquo;s hypothesis.</>,
    reason: <>Mark 1: a clear verdict.</>,
  },
  {
    working: (
      <>
        For the <b>first 15 minutes</b> the two lines <b>overlap</b>: they have the <b>same slope</b> (about 210 mL ÷ 15 min ≈ 14 mL min⁻¹) and the <b>same volume of gas</b> was formed (about 210 mL at 15 minutes), even though the 20.0 g solution is <b>twice as concentrated</b>.
      </>
    ),
    reason: <>Mark 2: the evidence <b>from the graph</b>. The rate is the slope of a volume–time graph, so name the slope (or the equal volumes) and the time interval. The report did not award this mark to a response that just said &ldquo;the rate was the same&rdquo; without referring to the graph.</>,
  },
  {
    working: <>So doubling the concentration of glucose did <b>not increase the rate</b> of the reaction.</>,
    reason: <>After 15 minutes the 10.0 g line levels off at about 210–250 mL while the 20.0 g line keeps rising to about 500 mL: the more concentrated solution produces <b>more gas in total</b>, but it did not produce gas <b>faster</b> at the start, when the two trials can be compared fairly.</>,
  },
  {
    working: <>(Why? A likely reason is that the amount of yeast — and so of <b>enzyme</b> — was the same, 2.0 g, in both trials, so the enzymes were already working as fast as they could; extra glucose only meant the reaction ran for longer.)</>,
    reason: <>This explanation is not needed for the 2 marks — the marks are for the verdict and the graph evidence — but it shows why the result makes chemical sense.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <>A burette holds only about 50 mL, so it <b>cannot collect the large volume of gas</b> (about 500 mL in part c) that the reaction produces — gas would escape and <b>not be measured</b>.</>,
    reason: <>Any one valid limitation earns the mark. Others the report accepted: some <b>CO₂ dissolves</b> in the water as it bubbles through; gas <b>escapes before the stopper</b> is fitted; the gas may not be at <b>25 °C</b> (it forms at 35 °C) or at atmospheric pressure; the set-up is complicated.</>,
  },
  {
    working: <>(It must not repeat the assumption given in part b.iii.)</>,
    reason: <>The only way to lose an otherwise valid answer was to <b>repeat</b> the idea used in b.iii. If you said &ldquo;no CO₂ dissolves&rdquo; there, don&rsquo;t give &ldquo;CO₂ dissolves&rdquo; here — pick a different idea.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <b>The Discussion section.</b>,
    reason: <>On a scientific poster, the <b>discussion</b> interprets the results and evaluates the method — its <b>limitations</b>, sources of error and suggested improvements. The study design&rsquo;s poster format puts &ldquo;identification of limitations in data and methods, and suggested improvements&rdquo; in the discussion. The <b>conclusion</b> only answers the investigation question; the <b>methodology</b> describes what was done.</>,
  },
]

export default function ChemistryQ8_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (12 marks)</p>
        <p className="mb-2">
          Lucia, a VCE student, investigated the production of bioethanol from the fermentation of glucose
          solution in the presence of yeast. Enzymes in yeast assist with the fermentation reaction.
        </p>
        <p className="mb-3">
          Lucia trialled two methods for the investigation, Method A and Method B. Both methods were trialled
          once.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-3 sm:border-r border-gray-300 dark:border-gray-700">
            <p className="font-semibold mb-1.5">Method A</p>
            <ol className="list-decimal pl-5 flex flex-col gap-1 mb-3">
              <li>Dissolve 5.0 g of glucose in 100 mL of water at 35 °C in a 250 mL conical flask.</li>
              <li>Add 2.0 g of yeast to the glucose solution and stir to mix.</li>
              <li>Quickly place the conical flask on a balance and record the mass to one decimal place.</li>
              <li>After 30 minutes, record the mass of the conical flask to one decimal place.</li>
            </ol>
            <div className="bg-white rounded p-1 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={balanceSrc}
                alt="A conical flask of solution sitting on a digital balance that reads 282.4 g — from the original 2024 VCAA exam paper"
                className="w-full max-w-[230px]"
              />
            </div>
          </div>
          <div className="p-3 border-t sm:border-t-0 border-gray-300 dark:border-gray-700">
            <p className="font-semibold mb-1.5">Method B</p>
            <ol className="list-decimal pl-5 flex flex-col gap-1 mb-3">
              <li>Dissolve 5.0 g of glucose in 100 mL of water at 35 °C in a 250 mL conical flask.</li>
              <li>Add 2.0 g of yeast to the glucose solution and stir to mix.</li>
              <li>Quickly place a stopper fitted with a delivery tube in the mouth of the conical flask.</li>
              <li>Submerge the end of the delivery tube in an inverted burette filled with water at 25 °C.</li>
              <li>After 30 minutes, record the volume of gas in the burette.</li>
            </ol>
            <div className="bg-white rounded p-1 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={buretteSrc}
                alt="A stoppered conical flask of glucose solution and yeast with a delivery tube leading under water into an inverted burette clamped on a stand, labelled gas collected after 30 minutes — from the original 2024 VCAA exam paper"
                className="w-full max-w-[340px]"
              />
            </div>
          </div>
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Fermentation Equation"
        marks={1}
        statement={<>Write a balanced chemical equation for the production of bioethanol from glucose.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Bioethanol is made by <b>fermentation</b>: yeast enzymes convert glucose into ethanol and carbon
            dioxide. One mark means a correctly <b>balanced</b> equation — only half the cohort got it, so check
            C, H and O atom by atom.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The <b>balanced</b> fermentation equation <Chem eq="C6H12O6(aq) -> 2C2H5OH(aq) + 2CO2(g)" />.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Enzyme Denaturation"
        marks={1}
        statement={
          <>
            Why is boiling water not used in Step 1 of Method A and Method B? Do not refer to safety
            considerations in your answer.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            The stem tells you <i>enzymes in yeast</i> do the work, so the question is about what high
            temperature does to an <b>enzyme</b>. The trap the report describes: writing that the yeast would be
            &ldquo;killed&rdquo; — that talks about the organism, not the enzyme, and was not accepted.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The high temperature would <b>denature the enzyme(s)</b>, so fermentation would not occur. (&ldquo;Yeast killed&rdquo; was not accepted.)</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">Lucia recorded the following results for Method A and Method B.</p>
        <div className="flex flex-wrap gap-4">
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr><th colSpan={2} className={TH}>Method A</th></tr>
              <tr><th className={TH}>Time (minutes)</th><th className={TH}>Mass (g)</th></tr>
            </thead>
            <tbody>
              <tr><td className={TD}>0</td><td className={TD}>282.5</td></tr>
              <tr><td className={TD}>30</td><td className={TD}>282.4</td></tr>
            </tbody>
          </table>
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr><th colSpan={2} className={TH}>Method B</th></tr>
              <tr><th className={TH}>Time (minutes)</th><th className={TH}>Volume (mL)</th></tr>
            </thead>
            <tbody>
              <tr><td className={TD}>0</td><td className={TD}>0.5</td></tr>
              <tr><td className={TD}>30</td><td className={TD}>32.5</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Mass Loss"
        marks={1}
        statement={
          <>
            Calculate the amount, in mol, of gas produced using Method A. The molar mass of the gas produced is
            44.0 g mol⁻¹.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            In Method A the flask is open, so the only thing leaving is the CO₂ gas: the <b>drop in mass</b> is
            the mass of CO₂. Then it is a one-step <i>n</i> = <i>m</i>/<i>M</i>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>Mass lost</b> = 0.1 g, so <b>n(CO₂) = 0.1 / 44.0 = 0.0023 mol</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Molar Volume"
        marks={1}
        statement={
          <>
            Calculate the amount, in mol, of gas produced using Method B at standard laboratory conditions (SLC).
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            A gas volume at SLC → moles via the <b>molar volume</b>, 24.8 L mol⁻¹. Two traps the report lists:
            the burette did not start at zero, so use the <b>change</b> in volume (32.5 − 0.5), and the molar
            volume is in <b>litres</b>, so divide mL by 1000.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>V = 32.5 − 0.5 = 32.0 mL = 0.0320 L</b>, so <b>n(CO₂) = 0.0320 / 24.8 = 0.00129 mol</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Assumptions"
        marks={1}
        statement={<>State an assumption on which the calculation in <b>part b.ii</b> is based.</>}
        examinerReport={EXAM_BIII}
      >
        <Background title="How to Think About It">
          <p>
            Ask: what had to be true for &ldquo;32.0 mL ÷ 24.8 L mol⁻¹&rdquo; to give the right amount of CO₂?
            The gas must be at SLC, behave ideally, all be CO₂, and all be collected. Only 27% scored here: the
            common answer &ldquo;the experiment was at SLC&rdquo; was rejected because the reaction is run at
            <b> 35 °C</b> — the assumption is about the <b>gas in the burette</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Any one: the <b>gas in the burette is at 25 °C</b> / <b>100 kPa</b>; it behaves as an <b>ideal gas</b>; <b>no CO₂ dissolves</b> in (or reacts with) the water; the <b>only gas</b> in the burette is CO₂.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Resolution"
        marks={2}
        statement={<>Compare the resolution of the data in Method A and Method B.</>}
        examinerReport={EXAM_BIV}
      >
        <Background title="How to Think About It">
          <p>
            <b>Resolution</b> is the smallest change a measuring instrument can display — a number <b>with a
            unit</b>. Two marks means two values: one for the balance, one for the burette. The balance is easy
            (it reads to 0.1 g). The burette is the trap: the readings go up in 0.5 mL steps, which means its
            graduations are 1 mL apart, so its resolution is <b>1 mL</b>. Only 1% of students scored both
            marks.
          </p>
        </Background>
        <Background title="The Report's Introduction on Resolution">
          <p>
            This concept was assessed in Question 8b.iv. Resolution is a quantity directly linked to the ability
            of a piece of equipment to provide a numerical value for a measurement, and needs to contain units for
            this value. The display of the electronic balance used in the question was digital and therefore has a
            fixed resolution defined by the final digit it can display (in this case 0.1 g). Many students were
            able to successfully identify this. The determination of the resolution of the burette was more
            problematic. As explained in the <i>VCE Chemistry Study Design</i> on pages 18 and 19, a value can only be
            quoted with a volume of 0.5 mL if this measurement was taken from a burette that had graduations
            marked every 1 mL; therefore the resolution of this burette is 1 mL.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIV} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Method A: the resolution of the <b>balance</b> is <b>0.1 g</b> (unit required).</> },
            { point: <>Method B: the resolution of the <b>burette</b> is <b>1 mL</b> (unit required).</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">c.</p>
        <p className="mb-3">
          Lucia decided to use Method B with different amounts of glucose to test how changing the concentration
          of the glucose solution affects the rate of bioethanol production.
          <br />
          Lucia recorded the volume of gas produced at three-minute intervals instead of only after 30 minutes.
          The graph below shows the data produced.
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={graphSrc}
            alt="Graph of volume of gas produced (mL) against time (minutes) from 0 to 48 minutes. Both lines rise together to about 210 mL at 15 minutes; the 10.0 g glucose per 100 mL line then levels off near 210 to 250 mL, while the 20.0 g glucose per 100 mL line keeps rising to about 500 mL by 39 minutes and levels off — from the original 2024 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
        <p>
          Lucia&rsquo;s hypothesis was that the rate of the reaction would increase as the concentration of
          glucose solution increased.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Independent Variable"
        marks={1}
        statement={<>Identify the independent variable.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            The <b>independent variable</b> is what the experimenter deliberately changes; the dependent variable
            is what is measured as a result. Read the stem: Lucia changed &ldquo;the concentration of the glucose
            solution&rdquo; and measured the volume of gas.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The <b>concentration of the glucose solution</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Evaluating a Hypothesis"
        marks={2}
        statement={<>Does the graph support Lucia&rsquo;s hypothesis? Explain your answer.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            On a volume–time graph the <b>rate</b> is the <b>slope</b>. Compare the two lines where they can be
            compared fairly — at the start. Two marks means two things: a clear <b>yes/no</b>, then <b>evidence
            from the graph</b> (the identical slope, or the identical volume of gas, over the first 15 minutes).
            The report&rsquo;s trap: saying &ldquo;the rate was the same&rdquo; without pointing to the graph did
            not earn the second mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The hypothesis is <b>not supported</b>.</> },
            { point: <>A direct reference to the graph: the <b>slope of the line</b> (or the <b>volume of gas formed</b>) over the <b>first 15 minutes</b> is the <b>same</b> for both concentrations.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Limitations"
        marks={1}
        statement={
          <>
            Identify one limitation of Method B. Your answer must be different to your answer for{' '}
            <b>part b.iii</b>.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            A <b>limitation</b> is a feature of the method that stops it measuring the CO₂ produced accurately.
            Look at the apparatus: gas bubbling through water, a stopper fitted after mixing, a burette of limited
            size, gas formed at 35 °C but collected over water at 25 °C. The only trap: don&rsquo;t reuse the
            idea you gave as an assumption in b.iii.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Any one valid limitation, different from b.iii — e.g. the <b>burette cannot collect the ~500 mL</b> of gas formed; <b>CO₂ dissolves</b> in the water; <b>gas escapes before the stopper</b> is fitted; gas not at <b>25 °C</b> or atmospheric pressure.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Scientific Poster"
        marks={1}
        statement={
          <>
            Which section of the scientific poster for the investigation should include the limitation identified
            in <b>part d.i</b>?
          </>
        }
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Know the poster sections: title, introduction, methodology, results, <b>discussion</b>, conclusion,
            references. Evaluating the method — limitations, errors, improvements — is part of the discussion.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme source="ours" points={[{ point: <>The <b>discussion</b>.</> }]} />
      </PartCard>
    </div>
  )
}
