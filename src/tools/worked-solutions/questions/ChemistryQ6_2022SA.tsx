// 2022 Chemistry Exam, Section B Question 6 (14 marks). Corn and popcorn: energy content of
// popcorn from its nutrition table, energy per gram from a bomb calorimeter, why the two values
// differ, glycaemic index ranking of amylose/amylopectin/cellulose, boiling and freezing corn
// (enzyme denaturation, lower rate), and why corn oil is a liquid at SLC.
// Question text transcribed from the original paper; the bomb calorimeter diagram is cropped
// from the original VCAA exam PDF; Tables 1 and 2 and part d.'s answer table are transcribed.
// Mark allocations are from the VCAA examination report (VCAA report only — no second source),
// which itemises the marks for every part; the "How to Think About It" notes and model answers
// are original. Numbers checked in Python.
// Study design (2024–2027): part d. (glycaemic index) is not on the current study design — its
// statement is kept and marked as such, following the skip guide's 2017 MCQ 25 ruling (GI).
// Part b. uses a bomb calorimeter, which the current study design no longer names (it names
// solution calorimetry); the calibration-factor calculation is identical, so it is written up
// with a note. Part f. (fatty-acid unsaturation and melting point) is written up: the current
// study design keeps degree of unsaturation, fats and oils, and melting-point trends explained
// by structure and bonding, and the 2026 Data Book still lists the fatty acids (item 18).
// No report slips found. The report's sig figs (16.3, 15.3 kJ g⁻¹) are kept; the working notes
// that ΔT = 3.5 °C strictly limits part b. to two significant figures.

import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import bombSrc from './chem-2022sa-q6-bomb-calorimeter.png'

const BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const EXAM_A: SAExaminerStats = {
  marks: [11, 27, 61],
  average: 1.5,
  comment: (
    <>
      One mark was awarded for the correct calculation of the energy released per 100 g.
      <br />
      Energy = 10.7 x 17 + 5.0 x 37 + 78.7 x 16
      <br />
      = 181.9 + 185.0 + 1259.2
      <br />
      = 1.63 x10³ kJ
      <br />
      The second mark was awarded for the correct calculation of energy per gram.
      <br />
      Energy per gram = 1.63 x 10³ / 100
      <br />
      = 16.3 ( kJ g⁻¹)
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 21, 51],
  average: 1.2,
  comment: (
    <>
      ΔT = 3.5 °C
      <br />
      One mark was awarded for the correct calculation of energy present in a 1.50 g sample.
      <br />
      Energy = CF x ΔT
      <br />
      = 6.54 x 3.5
      <br />
      = 22.9 kJ
      <br />
      The second mark was awarded for the correct calculation of energy released per gram.
      <br />
      Energy per gram = 22.9 / 1.50
      <br />
      = 15.3 (kJ g⁻¹)
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [81, 18, 1],
  average: 0.2,
  comment: (
    <>
      The two marks available for this question could have been obtained from any two of the following
      choices that clearly showed why the value for 6a. was higher than 6b.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Nutrition label based on average quantities. Popcorn is not a homogeneous substance. Sample used
          in the bomb calorimeter could actually be less energy dense.
        </li>
        <li>
          The popcorn may contain water that reduces the amount of combustible material and therefore lowers
          the calculation of the energy released per g.
        </li>
        <li>
          Only one sample of popcorn was analysed using the bomb calorimeter. Need to analyse multiple
          samples to determine the reliability of the results. Possible that the average result of the
          multiple samples would be closer to the calculation in 6a.
        </li>
        <li>Mass lost during transfer from balance.</li>
        <li>
          If more water was present in the calorimeter than when it was calibrated, then a lower temperature
          change would occur and produce less of a temperature rise when popcorn is burnt.
        </li>
      </ul>
      Responses that were not accepted were ones in which students stated that &lsquo;heat was lost from the
      calorimeter&rsquo; or &lsquo;poor insulation&rsquo;. Given that the question stem clearly indicated that
      the calorimeter was &lsquo;accurately calibrated&rsquo;, this means that students could not use these
      simplistic approaches to address this question.
      <br />
      Consequential marks were awarded when students were able to show clear reasoning if their calculated
      values in 6a. and 6b. showed the opposite trend.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [47, 37, 16],
  average: 0.7,
  comment: (
    <>
      One mark was awarded for showing an understanding that boiling caused denaturation of the enzyme,
      thereby removing the catalyst and hence slowing the reaction.
      <br />
      The second mark was awarded for showing an understanding that freezing slows the rate of the
      reaction.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [29, 17, 18, 36],
  average: 1.6,
  comment: (
    <>
      The first mark was awarded for showing an understanding that most of the listed fatty acids were
      unsaturated or contained C=C bonds.
      <br />
      The second mark was awarded for showing an understanding that these double bonds cause
      &lsquo;kinks&rsquo; in the chains and prevent close packing.
      <br />
      The third mark was awarded for showing an understanding that there are weaker bonds between chains,
      which in turn will lower the melting point and produce a liquid rather than a solid.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>energy = Σ (mass of each nutrient × its energy content)</>,
    reason: (
      <>
        Only <b>protein, fat and carbohydrate</b> supply energy. Each has its own energy content in kJ g⁻¹
        (Data Book): proteins 17, fats and oils 37, carbohydrates 16.
        <DataBookNote>
          these values are now in item 11 of the 2026 Data Book (&ldquo;Energy content of biomolecules in
          food&rdquo;); they are unchanged — 37, 17 and 16 kJ g⁻¹.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <>energy in 100 g = 10.7 g × 17 kJ g⁻¹ + 5.0 g × 37 kJ g⁻¹ + 78.7 g × 16 kJ g⁻¹</>,
    reason: <>Table 1 gives the masses <b>per 100 g</b> of popcorn, so this is the energy in 100 g, not in 1 g. Make sure each mass is matched with its own value (fat is the 37, not the protein).</>,
  },
  {
    working: <>= 181.9 kJ + 185.0 kJ + 1259.2 kJ = 1626.1 kJ = 1.63 × 10³ kJ (per 100 g)</>,
    reason: <>Mark 1: the energy in 100 g.</>,
  },
  { working: <>energy content = 1626.1 kJ ÷ 100 g</>, reason: <>The question asks for kJ <b>per gram</b>, so divide by the 100 g the table is based on.</> },
  {
    working: <b>energy content = 16.3 kJ g⁻¹</b>,
    reason: <>Mark 2: energy per gram, with its unit. Three significant figures, as VCAA gives (the masses 10.7 g and 78.7 g have three; the Data Book values have two, so 16 kJ g⁻¹ is also defensible). Sanity check: popcorn is mostly carbohydrate (16 kJ g⁻¹), so an answer just above 16 kJ g⁻¹ makes sense.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  { working: <>ΔT = 25.7 − 22.2 = 3.5 °C</>, reason: <>Temperature change = final − initial.</> },
  {
    working: <>E = CF × ΔT</>,
    reason: <>The <b>calibration factor</b> is the energy needed to raise the calorimeter&rsquo;s temperature by 1 °C, so energy released = CF × temperature rise. No mcΔT here — the CF already covers the water and the apparatus.</>,
  },
  { working: <>E = 6.54 kJ °C⁻¹ × 3.5 °C</>, reason: <>The °C⁻¹ in the CF cancels with the °C of ΔT, leaving kJ.</> },
  { working: <>E = 22.89 kJ (from 1.50 g of popcorn)</>, reason: <>Mark 1: energy released by the 1.50 g sample. Keep it unrounded.</> },
  { working: <>energy per gram = 22.89 kJ ÷ 1.50 g</>, reason: <>The question asks for kJ <b>per gram</b>, so divide by the sample&rsquo;s mass.</> },
  {
    working: <b>energy released = 15.3 kJ g⁻¹</b>,
    reason: <>Mark 2. (15.26 unrounded.) VCAA gives 15.3; strictly, ΔT = 3.5 °C has only two significant figures, so 15 kJ g⁻¹ is also defensible. Sanity check: close to part a.&rsquo;s 16.3 kJ g⁻¹ but a little lower — part c. asks why.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>1. The nutrition label gives <b>average quantities</b>; popcorn is <b>not homogeneous</b>, so the 1.50 g <b>sample</b> burned may have had less fat/carbohydrate (been <b>less energy dense</b>) than the average.</>,
    reason: <>Factor 1 (one mark). It explains why the bomb calorimeter (15.3) gave a <b>lower</b> value than the label (16.3).</>,
  },
  {
    working: <>2. The popcorn may contain <b>water</b>, which does not burn, so there is <b>less combustible material</b> per gram and less energy released per gram.</>,
    reason: <>Factor 2 (one mark). Any two of the report&rsquo;s five accepted factors earn the marks — others are: only <b>one sample</b> was tested (no replicates), <b>mass lost during transfer</b> from the balance, or <b>more water</b> in the calorimeter than during calibration.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>The conversion of glucose to starch is catalysed by an <b>enzyme</b>. <b>Boiling denatures the enzyme</b> — the high temperature disrupts its <b>tertiary structure</b> (the bonds holding its shape), so the <b>active site</b> changes shape and the enzyme can no longer catalyse the reaction.</>,
    reason: <>Mark 1: boiling → <b>denaturation</b> → catalyst removed → reaction slows. The two minutes of boiling is what the freezing alone could not do: it destroys the enzyme permanently.</>,
  },
  {
    working: <><b>Freezing</b> then <b>slows the rate of the reaction</b> further: at low temperature particles have less kinetic energy, so there are <b>fewer successful collisions</b> per second.</>,
    reason: <>Mark 2: freezing → <b>lower rate</b>. Note the difference: freezing does not denature an enzyme, it just <b>lowers its activity</b> (and the rate of any remaining uncatalysed reaction).</>,
  },
  {
    working: <b>So glucose is converted to starch much more slowly, and the corn stays sweet for longer.</b>,
    reason: <>Name <b>both</b> processes separately — one mark each. Don&rsquo;t say freezing &ldquo;kills&rdquo; or denatures the enzyme: that mixes the two ideas up.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <>About 84% of the fatty acids (oleic 31%, linoleic 52%, linolenic 1%) are <b>unsaturated</b> — their chains contain <b>C=C double bonds</b>.</>,
    reason: (
      <>
        Mark 1. Use the Data Book&rsquo;s fatty acid formulas: stearic C₁₈H₃₆O₂ and palmitic C₁₆H₃₂O₂ fit
        CₙH₂ₙO₂, so they are saturated; oleic C₁₈H₃₄O₂ has one C=C, linoleic C₁₈H₃₂O₂ two, linolenic C₁₈H₃₀O₂
        three. Only 16% (palmitic + stearic) is saturated. (The formulas are item 18 of the 2026 Data Book.)
      </>
    ),
  },
  {
    working: <>The (cis) double bonds put <b>kinks</b> in the hydrocarbon chains, so the triglyceride molecules <b>cannot pack closely</b> together.</>,
    reason: <>Mark 2: double bond → kink → poor packing. Saturated chains are straight and can line up side by side.</>,
  },
  {
    working: <>With the chains further apart, the <b>dispersion forces between the molecules are weaker</b>, so <b>less energy is needed to separate them</b> — the <b>melting point is lower</b> than 25 °C, so corn oil is a <b>liquid at SLC</b>.</>,
    reason: <>Mark 3: weaker intermolecular forces → lower melting point → liquid. Say <b>between</b> molecules (intermolecular) — the C=C bond itself is not what breaks when oil melts.</>,
  },
]

export default function ChemistryQ6_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (14 marks)</p>
        <p className="mb-2">Corn makes up a large proportion of people&rsquo;s diet in some parts of the world.</p>
        <p className="mb-3">
          Air-popped popcorn is made from whole corn kernels. The nutrition content of a particular type of
          air-popped popcorn is provided in Table 1.
        </p>
        <p className="font-semibold mb-1">Table 1</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr><th className={TD}></th><th className={`${TD} text-center`}>Average quantity per 100 g</th></tr>
          </thead>
          <tbody>
            <tr><td className={`${TD} font-semibold`}>Protein</td><td className={`${TD} text-center`}>10.7 g</td></tr>
            <tr><td className={`${TD} font-semibold`}>Fat</td><td className={`${TD} text-center`}>5.0 g</td></tr>
            <tr><td className={`${TD} font-semibold`}>Carbohydrates</td><td className={`${TD} text-center`}>78.7 g</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Energy Content of Food"
        marks={2}
        statement={<>Using the information provided in Table 1, calculate the energy content of air-popped popcorn in kilojoules per gram.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Food energy comes only from the three macronutrients, each with its own energy content in the Data
            Book. Two marks, two steps: add up the energy from protein, fat and carbohydrate in <b>100 g</b>,
            then divide by 100 to get the energy <b>per gram</b> the question asks for.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>energy per 100 g</b> = 10.7 × 17 + 5.0 × 37 + 78.7 × 16 = <b>1.63 × 10³ kJ</b>.</> },
            { point: <>Correct <b>energy per gram</b> = 1.63 × 10³ ÷ 100 = <b>16.3 kJ g⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="mb-3">
          The energy content of food can be determined experimentally using a bomb calorimeter similar to the
          one shown in the diagram below.
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={bombSrc}
            alt="A bomb calorimeter: an insulated water bath with a digital temperature probe, stirrer and ignition wires leading to a sample in a sealed container of excess oxygen — from the original 2022 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>
          A 1.50 g sample of air-popped popcorn is placed in the bomb calorimeter. The initial temperature of the
          water is 22.2 °C and the final temperature is 25.7 °C. Assume that the air-popped popcorn is fully
          combusted. The calibration factor for the bomb calorimeter is 6.54 kJ °C⁻¹.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Bomb Calorimetry"
        marks={2}
        statement={<>Using the calibration factor provided, calculate the energy released by the air-popped popcorn in kilojoules per gram.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Calibration factor × temperature rise = energy released. That gives the energy from the whole 1.50 g
            sample (mark 1); divide by 1.50 g for the energy per gram (mark 2).
          </p>
          <p className="mt-2">
            <b>Study design note:</b> the current study design names solution calorimetry rather than bomb
            calorimetry, but the calculation is exactly the same — E = CF × ΔT — so this part is fully doable.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct energy from the 1.50 g sample: <b>E = CF × ΔT = 6.54 × 3.5 = 22.9 kJ</b>.</> },
            { point: <>Correct <b>energy per gram</b> = 22.9 ÷ 1.50 = <b>15.3 kJ g⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sources of Error"
        marks={2}
        statement={
          <>
            Assume that the calorimeter was accurately calibrated so that heat loss from the calorimeter was
            accounted for in the calibration factor.
            <br />
            State <b>two</b> factors that may contribute to a difference in the energy content that was
            calculated using the methods in <b>part a.</b> and <b>part b.</b>
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Read the stem first: the calorimeter was <b>accurately calibrated</b> and heat loss is <b>already
            accounted for</b>, so &ldquo;heat was lost&rdquo; or &ldquo;poor insulation&rdquo; earns nothing — the
            report says exactly this, and its general comments note that many students fell back on rote-learned
            answers that the stem had ruled out. Instead ask: why might the <b>sample</b> burned (15.3 kJ g⁻¹)
            give less energy than the <b>label</b> (16.3 kJ g⁻¹)? Two marks, two separate factors, each linked to
            a lower value in part b.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one valid factor that explains why 6a. is higher than 6b.: label values are <b>averages</b> / popcorn is <b>not homogeneous</b>; <b>water</b> in the popcorn; only <b>one sample</b> tested; <b>mass lost</b> in transfer; <b>more water</b> in the calorimeter than at calibration.</> },
            { point: <>A <b>second, different</b> factor from that list. &ldquo;Heat lost&rdquo; or &ldquo;poor insulation&rdquo; is <b>not accepted</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Glycaemic Index"
        marks={3}
        statement={
          <>
            Carbohydrates are the main source of energy in corn. Chemical analysis shows that the carbohydrates
            in corn include amylose, amylopectin and cellulose.
            <br />
            Complete the table below by ranking these three carbohydrates from lowest to highest on the basis of
            their glycaemic index (GI). Explain your ranking for each.
            <table className="mt-3 text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
              <thead>
                <tr><th className={TD}></th><th className={`${TD} text-center`}>Carbohydrate</th><th className={`${TD} text-center`}>Explanation</th></tr>
              </thead>
              <tbody>
                <tr><td className={`${TD} font-semibold`}>Lowest GI</td><td className={`${TD} w-28 h-10`}></td><td className={`${TD} w-56`}></td></tr>
                <tr><td className={`${TD} text-center`}>↓</td><td className={`${TD} h-10`}></td><td className={TD}></td></tr>
                <tr><td className={`${TD} font-semibold`}>Highest GI</td><td className={`${TD} h-10`}></td><td className={TD}></td></tr>
              </tbody>
            </table>
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Glycaemic index (GI) — and ranking amylose, amylopectin and cellulose by how quickly they are digested
            to glucose — was part of the old (2017–2023) study design&rsquo;s food chemistry. The current study
            design keeps the hydrolysis and condensation of carbohydrates but no longer includes GI or the
            structures of amylose and amylopectin, so this part is skipped (as the skip guide does for 2017 MCQ 25).
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="e"
        topic="Enzyme Denaturation"
        marks={2}
        statement={
          <>
            When corn is picked it tastes sweet. Farmers recommend eating corn soon after picking. Once picked,
            the sweetness of the corn begins to decrease as glucose reacts to form starch. One way to help keep
            the sweetness for longer is to boil the corn for about two minutes and then freeze it.
            <br />
            Identify how boiling and then freezing corn helps to keep it sweet for longer.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Glucose → starch in a living plant is an <b>enzyme-catalysed</b> reaction. The question gives two
            treatments, and two marks: say what <b>each</b> one does to that reaction. High temperature{' '}
            <b>denatures</b> an enzyme (permanent change of shape); low temperature only <b>lowers the rate</b>.
            Fewer than one in five students got both marks — keep the two ideas separate.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Boiling denatures the enzyme</b>, removing the catalyst and so <b>slowing the reaction</b>.</> },
            { point: <><b>Freezing slows the rate</b> of the reaction.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="f"
        topic="Fats and Oils"
        marks={3}
        statement={
          <>
            Corn oil is produced from corn and it is commonly used to deep-fry food. Table 2 shows the percentage
            fatty acid composition of a corn oil sample.
            <p className="font-semibold mt-3 mb-1">Table 2</p>
            <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
              <thead>
                <tr><th className={`${TD} text-center`}>Fatty acid</th><th className={`${TD} text-center`}>% composition</th></tr>
              </thead>
              <tbody>
                <tr><td className={TD}>linolenic</td><td className={`${TD} text-center`}>1</td></tr>
                <tr><td className={TD}>stearic</td><td className={`${TD} text-center`}>3</td></tr>
                <tr><td className={TD}>palmitic</td><td className={`${TD} text-center`}>13</td></tr>
                <tr><td className={TD}>oleic</td><td className={`${TD} text-center`}>31</td></tr>
                <tr><td className={TD}>linoleic</td><td className={`${TD} text-center`}>52</td></tr>
              </tbody>
            </table>
            <p className="mt-3">Explain, with reference to its fatty acid composition, why corn oil is a liquid at SLC.</p>
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            A melting-point question is always about the forces <b>between</b> molecules. Three marks make a
            chain of three links: the fatty acids are mostly <b>unsaturated</b> (C=C) → the double bonds
            <b> kink</b> the chains so they <b>can&rsquo;t pack closely</b> → <b>weaker</b> intermolecular
            (dispersion) forces, so a <b>low melting point</b> and a liquid at 25 °C. Use the Data Book&rsquo;s
            formulas to show which fatty acids are unsaturated — that is the &ldquo;reference to its fatty acid
            composition&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Most of the fatty acids are <b>unsaturated</b> / contain <b>C=C bonds</b>.</> },
            { point: <>The double bonds cause <b>kinks</b> in the chains and <b>prevent close packing</b>.</> },
            { point: <><b>Weaker bonds (forces) between chains</b>, so a <b>lower melting point</b> — a <b>liquid</b> rather than a solid.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
