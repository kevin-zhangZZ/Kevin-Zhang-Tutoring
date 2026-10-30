// 2024 Chemistry Exam, Section B Question 5 (11 marks). Calorimetry: energy released by burning
// butane, energy absorbed by water, percentage energy efficiency; then why a solution calorimeter
// must be calibrated, the maximum temperature reached when Pb(NO₃)₂ reacts with KI in a
// calibrated calorimeter, and a systematic error that makes the measured temperature too high.
// Question text transcribed from the original paper (rendered page — the 2024 paper has no
// extractable text); the results table is transcribed. No figures. Mark allocations are from
// the VCAA examination report, which itemises every mark except in b.iii (a list of accepted
// answers); the worked solutions, "How to Think About It" notes and model answers are original
// (VCAA report only — no second source). Numbers checked in Python.
// Data Book: the paper's "item 13" (molar enthalpies of combustion) is item 12 in the 2026 Data
// Book, and butane's value changed from −2880 to −2877 kJ mol⁻¹ — the answers (28.8 kJ, 51.7%)
// are unchanged; a Data Book note says so.
// Report slips, kept verbatim: in b.i "a solution calorimeter needs to be calculated" is a slip
// for "calibrated"; in b.iii "The calorimeter's calibration factor was smaller than the true
// value" must mean the calorimeter's real calibration factor was smaller than the 470.0 J °C⁻¹
// Minh used (read literally it would make the temperature lower, not higher). Both are
// explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [19, 20, 62],
  average: 1.5,
  comment: (
    <>
      The first mark was awarded for the correct calculation of the mole of butane:
      <br />
      n(C₄H₁₀) = 0.580 / 58 = 0.010 mol
      <br />
      The second mark was awarded for calculating the correct quantity of energy released, with units:
      <br />
      E = 0.010 × 2880 = 28.8 kJ
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      The mark was awarded for the correct calculation of the energy change of the water, with units:
      <br />
      E = 100 × 4.18 × 35.6 = 14.9 kJ
      <br />
      It was concerning to see some responses using the density of water, 0.997, in these calculations
      as, even if it was relevant, this was only applicable in the previous study design and Data Book.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [29, 20, 51],
  average: 1.2,
  comment: (
    <>
      The first mark was awarded for the correct calculation of the % energy efficiency.
      <br />
      The second mark was awarded for the value being quoted to three significant figures.
      <br />
      % Efficiency = 100 × 14.9 / 28.8 = 51.7%
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [56, 35, 9],
  average: 0.6,
  comment: (
    <>
      The first mark was awarded for the response demonstrating that a solution calorimeter needs to be
      calculated because energy is needed to heat the water <b>and</b> it is needed to heat the internal
      components of the calorimeter; that is, energy from the reaction is not solely transferred to the
      water (hence why <i>q</i> = <i>mC</i>Δ<i>T</i> cannot be used).
      <br />
      The second mark was awarded for understanding that, without this calibration factor, we cannot use
      the change in temperature of an unknown reaction to determine an accurate value for the enthalpy
      change. Without calibration, the enthalpy value obtained will always be less than the true value for
      a given calorimeter using a fixed quantity of solution.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [43, 9, 24, 23],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for the correct calculation of energy released, with units:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>energy released<sub>(based in limiting reagent)</sub> = 0.048 × 24.5 = 1.176 kJ or 1176 J</li>
      </ul>
      The second mark was awarded for the correct change in temperature:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>change in temperature = 1176 / 470 = 2.5 °C</li>
      </ul>
      The third mark was awarded for the correct final temperature:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>maximum temperature reached = 25.0 + 2.5 = 27.5 °C</li>
      </ul>
      Errors occurred when:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>the stoichiometry was not taken into account when determining the energy released</li>
        <li>there was no consideration of the units of the energy and the calibration factor</li>
        <li>responses determined a negative energy released and subtracted the temperature change.</li>
      </ul>
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [87, 13],
  average: 0.2,
  comment: (
    <>
      Any of the following were valid responses:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The concentration of KI in the stock solution was higher than 0.960 M.</li>
        <li>The amount of KI added to the calorimeter was too high.</li>
        <li>The total volume of solution in the calorimeter was lower than that used to calibrate it.</li>
        <li>The calorimeter&rsquo;s calibration factor was smaller than the true value.</li>
      </ul>
      This question was not well answered.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  { working: <>n(C₄H₁₀) = m / M</>, reason: <>ΔH from the Data Book is <b>per mole</b> of butane, so first turn the mass burned into an amount in mol.</> },
  { working: <>n(C₄H₁₀) = 0.580 g / 58.0 g mol⁻¹</>, reason: <>M(C₄H₁₀) = 4 × 12.0 + 10 × 1.0 = 58.0 g mol⁻¹ (Data Book periodic table).</> },
  { working: <>n(C₄H₁₀) = 0.0100 mol</>, reason: <>Mark 1: the amount of butane.</> },
  {
    working: <>E = n × |ΔH<sub>c</sub>| = 0.0100 mol × 2880 kJ mol⁻¹</>,
    reason: (
      <>
        Every mole of butane burned releases 2880 kJ, so multiply. Use the <b>size</b> of ΔH: &ldquo;energy
        released&rdquo; is already a positive quantity.
        <DataBookNote>
          the paper&rsquo;s &ldquo;item 13&rdquo; (molar enthalpies of combustion) is item 12 in the 2026 Data
          Book, and butane&rsquo;s value is now −2877 kJ mol⁻¹ (the 2024 paper and report used −2880). With the
          current value, E = 0.0100 × 2877 = 28.77 kJ, which still rounds to <b>28.8 kJ</b> — the answer is
          unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <b>E = 28.8 kJ</b>,
    reason: <>Mark 2: the energy <b>with units</b>. Three significant figures, from 0.580 g. The report&rsquo;s general comments say &minus;28.8 kJ was frequently seen here: a negative &ldquo;energy released&rdquo; is not a valid answer.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  { working: <>q = m c ΔT</>, reason: <>The water&rsquo;s temperature rise measures the energy it <b>absorbed</b>. <i>m</i> is the mass of <b>water</b> (100.0 g — already a mass, so no density is needed), <i>c</i> = 4.18 J g⁻¹ K⁻¹ (Data Book).</> },
  { working: <>q = 100.0 g × 4.18 J g⁻¹ K⁻¹ × 35.6 K</>, reason: <>A temperature <b>increase</b> of 35.6 °C is the same as 35.6 K, which matches the K⁻¹ in <i>c</i>.</> },
  { working: <>q = 14 880.8 J</> },
  { working: <b>q = 14.9 kJ</b>, reason: <>The mark needs the unit. Three significant figures (4.18 and 35.6). Giving it in kJ makes part iii a like-for-like comparison with 28.8 kJ. The report notes some students multiplied by a density of 0.997 — that belonged to the old Data Book, and the mass of water is given anyway.</> },
]

const ROWS_AIII: WorkingRow[] = [
  { working: <>efficiency = (energy absorbed by water ÷ energy released by fuel) × 100%</>, reason: <>Efficiency compares the useful energy (part ii) with the energy the fuel released (part i). The smaller number goes on top.</> },
  { working: <>efficiency = (14.88 kJ ÷ 28.8 kJ) × 100%</>, reason: <>Both in the <b>same unit</b> (kJ). Use the unrounded 14.88 kJ from part ii.</> },
  { working: <>efficiency = 51.66…%</>, reason: <>Mark 1: the calculation.</> },
  {
    working: <b>efficiency = 51.7%</b>,
    reason: <>Mark 2: <b>three significant figures</b> — every measurement (0.580 g, 100.0 g, 35.6 °C) has at least three, so the answer has three. (14.9 ÷ 28.8, as the report writes it, also gives 51.7%; so does the 2026 Data Book&rsquo;s −2877 kJ mol⁻¹.) Plausible: an open flame loses about half its heat to the air and the container.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>When the reaction releases energy, it is absorbed by the solution <b>and also by the calorimeter itself</b> (the inner container, thermometer, stirrer and lid), so <b>not all of the energy goes into the water</b> — <i>q</i> = <i>mc</i>Δ<i>T</i> for the water alone would underestimate it.</>,
    reason: <>Mark 1: <b>why</b> the water alone is not enough. Name the energy going into the calorimeter&rsquo;s own components. Each calorimeter (and each volume of solution in it) absorbs a different amount.</>,
  },
  {
    working: <>Calibration — passing a <b>known amount of energy</b> (electrical, E = VIt) and measuring ΔT — gives the <b>calibration factor</b> (J °C⁻¹): the energy needed to raise the temperature of the <b>whole calorimeter and its contents</b> by 1 °C. Only with it can the <b>temperature change</b> of a reaction be converted into an <b>accurate energy</b>, and hence an accurate <b>ΔH</b>.</>,
    reason: <>Mark 2: what the calibration factor lets you do. Without it the enthalpy change you calculate would be <b>too small</b> (the report: &ldquo;always be less than the true value&rdquo;). The report&rsquo;s &ldquo;needs to be calculated&rdquo; in its first sentence is a slip for &ldquo;needs to be <b>calibrated</b>&rdquo;.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  { working: <><Chem eq="Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)" />  ΔH = −49.0 kJ</>, reason: <>ΔH belongs to the equation <b>as written</b> — that is, to <b>2 mol of KI</b>, not 1 mol. Not taking this stoichiometry into account is the first error the report lists.</> },
  { working: <>2 mol KI releases 49.0 kJ, so 1 mol KI releases 49.0 ÷ 2 = 24.5 kJ</>, reason: <>Mole ratio from the equation: KI : energy = 2 mol : 49.0 kJ. The question tells you 0.048 mol of KI reacted, so the energy released is set by that amount of KI (the Pb(NO₃)₂ needed is only 0.024 mol).</> },
  { working: <>E = 0.048 mol × 24.5 kJ mol⁻¹ = 1.176 kJ = 1176 J</>, reason: <>Mark 1: the energy released, with units. Convert to <b>J</b> now, because the calibration factor is in <b>J</b> °C⁻¹ — the report lists not considering the units of the energy and the calibration factor as an error.</> },
  { working: <>ΔT = E ÷ CF</>, reason: <>The calibration factor is the energy needed per °C, so dividing the energy by it gives the temperature change.</> },
  { working: <>ΔT = 1176 J ÷ 470.0 J °C⁻¹ = 2.502… °C ≈ 2.5 °C</>, reason: <>Mark 2: the temperature change. Use the <b>positive</b> energy released: the reaction is exothermic, so the temperature <b>rises</b>.</> },
  { working: <>T<sub>max</sub> = 25.0 °C + 2.5 °C</>, reason: <>Exothermic → <b>add</b> ΔT to the initial temperature. Subtracting it (from using −49.0 kJ) is the report&rsquo;s third listed error.</> },
  { working: <b>T<sub>max</sub> = 27.5 °C</b>, reason: <>Mark 3: the final temperature. ΔT has two significant figures (from 0.048 mol), so the answer is to one decimal place. Plausible: a small, dilute reaction warms the solution by only a few degrees.</> },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <>Because the results were <b>repeatable</b> but all too high, the cause is a <b>systematic error</b> — something that was the same in every trial.</>,
    reason: <>Random errors would scatter the results above and below the expected 27.5 °C; a consistent shift upwards points to a fault in the method, the solutions or the calibration.</>,
  },
  {
    working: <><b>The concentration of the KI stock solution was higher than 0.960 M</b>, so <b>more than 0.048 mol of KI reacted</b>, releasing <b>more energy</b> and giving a <b>higher temperature</b>.</>,
    reason: (
      <>
        The mark: <b>one</b> valid reason. Any of the report&rsquo;s four is accepted — too much KI added; a
        <b> smaller volume of solution</b> than was used during calibration (less to heat, so the real
        calibration factor is smaller); or a real calibration factor smaller than the 470.0 J °C⁻¹ used. (The
        report&rsquo;s last point, &ldquo;smaller than the true value&rdquo;, must mean this — if 470.0 J °C⁻¹ were
        smaller than the true factor, the temperature would come out lower, not higher.) &ldquo;Heat loss&rdquo;
        cannot be right: it makes the temperature lower.
      </>
    ),
  },
]

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
const boxClass =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

export default function ChemistryQ5_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={boxClass}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (11 marks)</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">a.</p>
        <p className="mb-3">
          A container with 100.0 g of water was heated using a butane, C₄H₁₀, gas burner.
          <br />
          The following results were obtained.
        </p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <tbody>
            <tr><td className={td}>Mass of C₄H₁₀ combusted</td><td className={`${td} text-center`}>0.580 g</td></tr>
            <tr><td className={td}>Temperature increase of water</td><td className={`${td} text-center`}>35.6 °C</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a.i"
        topic="Energy Released"
        marks={2}
        statement={<>Use <b>item 13</b> of the Data Book to calculate the amount of energy released by the combustion of C₄H₁₀.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Mass → moles → energy. The Data Book&rsquo;s ΔH is &ldquo;per mole&rdquo; of fuel, so one mark is
            for the amount of butane and one for multiplying it by 2880 kJ mol⁻¹. &ldquo;Energy released&rdquo; is
            a positive amount with a unit — the report&rsquo;s general comments single out &minus;28.8 kJ as a
            common error.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>amount of butane: n(C₄H₁₀) = 0.580 / 58.0 = 0.0100 mol</b>.</> },
            { point: <>Correct <b>energy released = 0.0100 × 2880 = 28.8 kJ</b>, <b>with units</b> (and positive).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Calorimetry"
        marks={1}
        statement={<>Calculate the amount of energy absorbed by the 100.0 g of water.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Energy absorbed by water is <i>q</i> = <i>mc</i>Δ<i>T</i>, with the water&rsquo;s mass — not the
            fuel&rsquo;s. The mass is given in grams, so no density is needed. One mark, which needs the unit.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme source="vcaa" points={[{ point: <>Correct <b>q = mcΔT = 100.0 × 4.18 × 35.6 = 14.9 kJ</b> (14 881 J), <b>with units</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Energy Efficiency"
        marks={2}
        statement={<>Calculate the percentage energy efficiency of the system used to heat the water.</>}
        examinerReport={EXAM_AIII}
      >
        <Background title="How to Think About It">
          <p>
            Efficiency = useful energy out ÷ energy in × 100%: part ii over part i. The second mark is
            for <b>significant figures</b> alone — three, because the data have three — so write 51.7%, not
            52% or 51.67%.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>% efficiency = 100 × 14.9 / 28.8</b> (energy absorbed by water ÷ energy released by the fuel).</> },
            { point: <>The value quoted to <b>three significant figures: 51.7%</b>.</> },
          ]}
        />
      </PartCard>

      <div className={boxClass}>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">b.</p>
        <p className="mb-2">
          Minh is provided with solutions of 0.500 M lead(II) nitrate, Pb(NO₃)₂(aq), and 0.960 M potassium
          iodide, KI(aq), to investigate the reaction below
        </p>
        <p className="mb-2 pl-6">
          <Chem eq="Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)" />
          <span className="ml-6">Δ<i>H</i> = −49.0 kJ</span>
        </p>
        <p>
          Minh calibrated a solution calorimeter and found its calibration factor to be 470.0 J °C⁻¹. Minh
          performed the reaction above in the calibrated calorimeter. The initial temperature of each solution
          was 25.0 °C. Minh stirred the mixture continuously during the reaction.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Calibration Factor"
        marks={2}
        statement={<>Explain why a calorimeter needs to be calibrated before it can be used to calculate enthalpy changes.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: <b>why</b> (the reaction&rsquo;s energy heats the calorimeter&rsquo;s own parts
            as well as the water, so <i>q</i> = <i>mc</i>Δ<i>T</i> on the water alone misses some of it) and
            <b> what calibration fixes</b> (the calibration factor converts a measured temperature change into
            an accurate energy, and so an accurate ΔH). Only 9% of students scored both marks, so
            make sure your answer contains both ideas.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Energy from the reaction heats the water <b>and</b> the <b>internal components of the calorimeter</b> — it is <b>not solely transferred to the water</b>, so <i>q</i> = <i>mc</i>Δ<i>T</i> cannot be used.</> },
            { point: <>Without the <b>calibration factor</b>, the <b>temperature change</b> cannot be used to find an <b>accurate enthalpy change</b> (the value would be <b>less than the true value</b>).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Maximum Temperature"
        marks={3}
        statement={<>Calculate the maximum temperature that could be reached by the solution in the calorimeter if 0.048 mol of KI(aq) reacted.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Three steps, one mark each: <b>energy released</b> (using the mole ratio — −49.0 kJ is for
            <b> 2 mol</b> of KI), <b>temperature change</b> (energy in J ÷ calibration factor in J °C⁻¹), and
            the <b>final temperature</b> (exothermic, so add to 25.0 °C). The report&rsquo;s three errors are
            exactly these: ignoring the 2 : 1 ratio, mixing kJ with J, and using a negative energy to subtract.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>energy released = 0.048 × 24.5 = 1.176 kJ (1176 J)</b>, <b>with units</b> — using the <b>2 : 1</b> ratio of KI to the 49.0 kJ.</> },
            { point: <>Correct <b>change in temperature = 1176 J ÷ 470 J °C⁻¹ = 2.5 °C</b>.</> },
            { point: <>Correct <b>maximum temperature = 25.0 + 2.5 = 27.5 °C</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Systematic Error"
        marks={1}
        statement={
          <>
            Minh repeated the experiment with the Pb(NO₃)₂(aq) and KI(aq) solutions three times in the
            calibrated calorimeter. The experiment was found to have a high degree of repeatability. The average
            maximum temperature from the four trials was greater than the expected value.
            <br />
            State <b>one</b> reason that would explain why the average was greater than the expected value.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;High repeatability&rdquo; but consistently too high means a <b>systematic error</b> — one that
            pushes the temperature <b>up</b> in every trial. Ask what makes ΔT = E ÷ CF bigger: <b>more energy</b>{' '}
            (more KI reacted than 0.048 mol) or a <b>smaller real calibration factor</b> (less solution in the
            calorimeter than when it was calibrated). Don&rsquo;t reach for heat loss: it would make the
            temperature <b>lower</b>. Only 13% of students gained this mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <MarkScheme
          source="ours"
          points={[
            {
              point: (
                <>
                  Any <b>one</b> reason that makes the temperature rise <b>larger</b>: <b>KI concentration higher than
                  0.960 M</b>; <b>too much KI added</b>; <b>total volume of solution lower than during calibration</b>;
                  or the calorimeter&rsquo;s <b>real calibration factor smaller</b> than the value used.
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
