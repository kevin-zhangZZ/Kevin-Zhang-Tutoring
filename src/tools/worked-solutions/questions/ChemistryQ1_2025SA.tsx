// 2025 Chemistry Exam, Section B Question 1 (13 marks). Calorimetry with a camp stove: a
// thermochemical equation, energy released by 9.0 g of propane, energy absorbed by the water,
// efficiency, the excess reactant in a sealed container of air, and why ethanol releases less
// energy per gram. Question text transcribed from the original paper; both set-up diagrams are
// cropped from the original VCAA exam PDF; the results table is transcribed. Mark allocations
// are from the VCAA examination report, which itemises every mark here; the worked solutions,
// "How to Think About It" notes and model answers are original. Numbers checked in Python.
// The paper's "item 13" (molar enthalpies of combustion) is item 12 in the 2026 Data Book —
// a Data Book note says so. The report's comment on part e. gives propane's heat of combustion
// as 40.5 kJ g⁻¹, a slip for 50.5 kJ g⁻¹ (2220 ÷ 44.0); kept verbatim, flagged in the working.
// The same comment writes "ΔH(ethanol) = −1370 kJ < ΔH(propane) = −2220 kJ", comparing sizes
// (as signed numbers the inequality is reversed); kept verbatim, explained in the working. Part d's
// report cites "Item 4 of the Databook" (unit conversions), item 5 in 2026 — Data Book note added.
// Reviewed Oct 2026 against the rendered paper (pp. 16–18) and report (pp. 6–7).

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import stoveSrc from './chem-2025sa-q1-camp-stove.png'
import sealedSrc from './chem-2025sa-q1d-sealed-container.png'

const EXAM_A: SAExaminerStats = {
  marks: [9, 48, 42],
  average: 1.4,
  comment: (
    <>
      The first mark was awarded for a correctly balanced chemical equation.
      <br />
      <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" /> ΔH = −2220 kJ
      <br />
      The second mark was awarded for an enthalpy value of ΔH = −2220 kJ, which had to be accompanied
      by the correct states for each chemical at SLC.
      <br />
      The most common errors were:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>failing to supply any enthalpy value</li>
        <li>failing to supply the correct states that are associated with the −2220 kJ enthalpy value</li>
        <li>incorrectly balancing the equation.</li>
      </ul>
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [7, 20, 73],
  average: 1.7,
  comment: (
    <>
      The first mark was awarded for the correct calculation of n(C₃H₈).
      <br />
      n(C₃H₈) = m(C₃H₈) / M(C₃H₈) = 9 / 44 = 0.2045 mol
      <br />
      The second mark was awarded for the correct energy released with units.
      <br />
      Energy released = 0.2045 x 2220 = 454 kJ = 4.5 x 10² kJ
      <br />
      The most common errors were:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>failing to quote a unit or quoting an incorrect unit</li>
        <li>including the negative sign and making a statement that the energy released was −454 kJ.</li>
      </ul>
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [10, 22, 68],
  average: 1.6,
  comment: (
    <>
      The first mark was awarded for the correct calculation of ΔT.
      <br />
      ΔT = 90.1 − 24.1 = 66.0 °C
      <br />
      The second mark was awarded for the correct calculation of energy absorbed with unit.
      <br />
      q = mcΔT = 166.0 x 4.18 x 66.0 = 45,796 J = 45.8 kJ
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Energy efficiency = (45.8 / 454) x 100 = 10%</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [34, 19, 16, 19, 12],
  average: 1.6,
  comment: (
    <>
      Two significant issues arose in responses to this question.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Some responses did not show an understanding of how to convert m³ to L. This conversion was
          given in Item 4 of the Databook. At this stage in the calculations, this led to considerable
          issues when students attempted to determine the limiting reagent.
        </li>
        <li>Some responses did not establish the quantity of excess reagent that remained after the reaction.</li>
      </ul>
      The first two marks were awarded for establishing the n(O₂) present in the 0.125 m³ container (125 L).
      <br />
      V(O₂) = 0.210 x 125 = 26.25 L and then n(O₂) = 26.25 ÷ 24.8 = 1.058 mol
      <br />
      or
      <br />
      n(gas) = 125/24.8 = 5.04 mol and then n(O₂) = 0.210 x 5.04 = 1.058 mol
      <br />
      The third mark was awarded for correct calculation of n(excess reagent).
      <br />
      n(O₂)<sub>excess</sub> = n(O₂)<sub>inital</sub> − n(O₂)<sub>needed</sub> = 1.058 − (5 x 0.2045) = 0.0355 mol
      <br />
      The fourth mark was awarded for correct mass calculation of excess reagent with units.
      <br />
      m(O₂) = 0.0355 x 32 = 1.1 g
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [50, 42, 8],
  average: 0.6,
  comment: (
    <>
      The first mark was awarded for stating or recognising that the energy content of ethanol is less
      than the energy content of propane in both kJ g⁻¹ or kJ mol⁻¹.
      <br />
      Heat of combustion(ethanol) = 29.7 kJ g⁻¹ &lt; Heat of combustion(propane) = 40.5 kJ g⁻¹
      <br />
      ΔH(ethanol) = −1370 kJ &lt; ΔH(propane) = −2220 kJ
      <br />
      The second mark was awarded for recognising that this difference is due to the partial oxidation
      of ethanol, which had already occurred with the introduction of the hydroxy group to the molecule.
      <br />
      A common error was stating bond enthalpies as the reason for the different energy content. This
      could not be accepted without full calculations based on the two complete combustion equations,
      which is beyond the scope of the study design.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <><Chem eq="C3H8(g) + O2(g) -> CO2(g) + H2O(l)" /></>,
    reason: <>Complete combustion of a hydrocarbon always gives CO₂ and H₂O only. Water is a <b>liquid</b> because the Data Book&rsquo;s ΔH values are for products at SLC (25 °C).</>,
  },
  {
    working: <><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" /></>,
    reason: <>Balance C first (3 C → 3CO₂), then H (8 H → 4H₂O), then O last: 3 × 2 + 4 × 1 = 10 O atoms on the right, so 5O₂.</>,
  },
  {
    working: <b><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />  ΔH = −2220 kJ</b>,
    reason: (
      <>
        The <b>molar enthalpy of combustion</b> of propane from the Data Book. It is <b>negative</b> because combustion is <b>exothermic</b>, and it belongs to exactly 1 mol of C₃H₈ — so the equation must have a coefficient of 1 in front of C₃H₈. (If you doubled every coefficient, ΔH would double to −4440 kJ.) VCAA writes the ΔH for the equation as written in kJ, as the Data Book&rsquo;s own examples do.
        <DataBookNote>the paper&rsquo;s &ldquo;item 13&rdquo; (molar enthalpies of combustion) is item 12 in the 2026 Data Book; the value, −2220 kJ mol⁻¹, is unchanged.</DataBookNote>
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  { working: <>n(C₃H₈) = m / M</>, reason: <>Energy released depends on the <b>amount in mol</b> burned, so convert the mass to moles first.</> },
  { working: <>n(C₃H₈) = 9.0 g / 44.0 g mol⁻¹</> },
  { working: <>n(C₃H₈) = 0.2045… mol</>, reason: <>Keep this unrounded — it is used again in part d (and the energy it gives is used in c.ii).</> },
  { working: <>E = n × |ΔH| = 0.2045… mol × 2220 kJ mol⁻¹</>, reason: <>Each mole releases 2220 kJ, so multiply. Use the <b>size</b> of ΔH: &ldquo;energy released&rdquo; is already a positive amount.</> },
  {
    working: <b>E = 454 kJ = 4.5 × 10² kJ</b>,
    reason: <>Two significant figures, because 9.0 g has two. Writing &minus;454 kJ for &ldquo;energy released&rdquo; is a sign error the report lists, and so is leaving off the unit.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  { working: <>ΔT = 90.1 − 24.1 = 66.0 °C</>, reason: <>Temperature change = final − initial. A change of 66.0 °C is the same as 66.0 K, which matches the K⁻¹ in the specific heat capacity.</> },
  { working: <>q = m c ΔT</>, reason: <>The energy absorbed by water: <i>m</i> is the mass of <b>water</b> (not fuel), <i>c</i> = 4.18 J g⁻¹ K⁻¹ from the Data Book.</> },
  { working: <>q = 166.0 g × 4.18 J g⁻¹ K⁻¹ × 66.0 K</> },
  { working: <><b>q = 45 796 J = 45.8 kJ</b></>, reason: <>Three significant figures (4.18 and 66.0 each have three). Converting J to kJ now makes part c.ii a like-for-like comparison with 454 kJ.</> },
]

const ROWS_CII: WorkingRow[] = [
  { working: <>efficiency = (energy absorbed by water / energy released by fuel) × 100%</>, reason: <>Efficiency compares what was usefully transferred to the water (c.i) with what the fuel released (b).</> },
  { working: <>efficiency = (45.8 kJ / 454 kJ) × 100%</>, reason: <>Both energies must be in the <b>same unit</b> — kJ here.</> },
  { working: <b>efficiency = 10%</b>, reason: <>(10.08…% unrounded.) Two significant figures, set by the 9.0 g mass used in part b. Plausible: an open flame under a pan loses most of its heat to the surrounding air.</> },
]

const ROWS_D: WorkingRow[] = [
  { working: <>V(air) = 0.125 m³ = 0.125 × 1000 L = 125 L</>, reason: (
      <>
        Molar volume is in L mol⁻¹, so convert m³ to L first: 1 m³ = 1000 L (Data Book, unit conversions — 1 L = 1 × 10⁻³ m³). The report says some responses could not do this conversion.
        <DataBookNote>the report calls the unit conversions &ldquo;Item 4 of the Databook&rdquo;; in the 2026 Data Book they are item 5. The conversion itself is unchanged.</DataBookNote>
      </>
    ) },
  { working: <>V(O₂) = 0.210 × 125 L = 26.25 L</>, reason: <>21.0% v/v means 21.0 mL of O₂ in every 100 mL of air — so O₂ is 0.210 of the volume.</> },
  { working: <>n(O₂) = V / V<sub>m</sub> = 26.25 L / 24.8 L mol⁻¹ = 1.058… mol</>, reason: <>At SLC one mole of any gas occupies 24.8 L (Data Book).</> },
  { working: <>n(O₂) needed = 5 × n(C₃H₈) = 5 × 0.2045… = 1.022… mol</>, reason: <>Mole ratio from the equation in part a: C₃H₈ : O₂ = 1 : 5. n(C₃H₈) is from part b.</> },
  { working: <>1.058 mol available &gt; 1.022 mol needed, so <b>O₂ is in excess</b> (C₃H₈ is the <b>limiting reactant</b>)</>, reason: <>Compare what is available with what the reaction needs. All the propane burns; some oxygen is left over.</> },
  { working: <>n(O₂) excess = 1.058… − 1.022… = 0.0357… mol</>, reason: <>Excess = initial − used up. The question asks for this leftover amount, not the amount that reacted.</> },
  { working: <>m(O₂) = n × M = 0.0357… mol × 32.0 g mol⁻¹</>, reason: <>M(O₂) = 2 × 16.0 = 32.0 g mol⁻¹.</> },
  {
    working: <b>m(O₂) in excess = 1.1 g</b>,
    reason: <>(1.14 g unrounded.) Two significant figures, from the 9.0 g of propane. The report rounds n(O₂) to 1.058 mol first and gets 0.0355 mol — the same 1.1 g.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>Ethanol releases <b>less energy per gram</b> (and per mole) than propane: 1367 kJ mol⁻¹ ÷ 46.0 g mol⁻¹ = <b>29.7 kJ g⁻¹</b> for ethanol, compared with 2220 kJ mol⁻¹ ÷ 44.0 g mol⁻¹ = <b>50.5 kJ g⁻¹</b> for propane.</>,
    reason: <>Mark 1: compare the energy content of the two fuels, with numbers from the Data Book&rsquo;s molar enthalpies of combustion. The report&rsquo;s &ldquo;40.5 kJ g⁻¹&rdquo; for propane is a slip for 50.5 kJ g⁻¹ (2220 ÷ 44.0) — the comparison is the same. The report&rsquo;s &ldquo;−1370 kJ &lt; −2220 kJ&rdquo; compares the <i>sizes</i> of ΔH (1367 rounded to 1370); as signed numbers −1370 is the larger, so write the comparison in words: ethanol releases less energy.</>,
  },
  {
    working: <>So a <b>greater mass</b> of ethanol (15.3 g) must burn to release the same energy as 9.0 g of propane and give the same temperature change.</>,
    reason: <>Check: 15.3 g ÷ 46.0 g mol⁻¹ × 1367 kJ mol⁻¹ = 455 kJ — almost exactly the 454 kJ from 9.0 g of propane, so the two runs really did deliver the same energy.</>,
  },
  {
    working: <>This is because ethanol is <b>already partially oxidised</b>: its <b>hydroxy group (–OH)</b> means one carbon is already bonded to oxygen, so less energy is released when it is fully oxidised to CO₂ and H₂O.</>,
    reason: <>Mark 2: the <b>reason</b> for the difference. Propane is a hydrocarbon with no oxygen at all. The report did not accept &ldquo;bond enthalpies&rdquo; as the reason without full calculations.</>,
  },
]

export default function ChemistryQ1_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (13 marks)</p>
        <p className="mb-2">
          Kim investigated the energy efficiency of two different fuels, propane, C₃H₈, and pure
          bioethanol, C₂H₅OH, for heating water.
        </p>
        <p className="mb-3">
          Kim placed a saucepan with 166.0 g of tap water on a portable camp stove and heated it using
          C₃H₈.
          <br />
          The set-up for the experiment is shown below.
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={stoveSrc}
            alt="A saucepan of water on a portable camp stove fed from a propane container, with a temperature probe in the water connected to a digital thermometer — from the original 2025 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p className="mb-2">The following results were recorded.</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <tbody>
            <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">initial temperature of water</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">24.1 °C</td></tr>
            <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">final temperature of water</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">90.1 °C</td></tr>
            <tr><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5">mass of C₃H₈ combusted</td><td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center">9.0 g</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Thermochemical Equation"
        marks={2}
        statement={<>Write a balanced thermochemical equation for the complete combustion of C₃H₈.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A <b>thermochemical equation</b> is a balanced equation <i>plus</i> its ΔH. Three things are
            marked: the balancing, the states (which must match the conditions the ΔH was measured under —
            water is H₂O(l) at SLC) and the ΔH value with its sign and unit. The two marks split as
            (1) the balanced equation and (2) the ΔH <i>together with</i> the right states. The report&rsquo;s
            most common errors were leaving the ΔH out altogether, giving states that don&rsquo;t match
            −2220 kJ (e.g. H₂O(g)), and mis-balancing — so finish by checking every atom and every state.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>correctly balanced</b> equation: <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />.</> },
            { point: <><b>ΔH = −2220 kJ</b>, with the <b>correct states at SLC</b> — in particular <b>H₂O(l)</b>. No ΔH, or wrong states, loses this mark.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Energy Released"
        marks={2}
        statement={
          <>
            Using <b>item 13</b> of the Data Book, calculate the amount of energy released by the complete
            combustion of 9.0 g of C₃H₈ (<i>M</i> = 44.0 g mol⁻¹).
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Mass → moles → energy. ΔH is &ldquo;per mole&rdquo;, so you need the amount of propane in mol
            before you can use it. Mark 1 is the moles of propane; mark 2 is the energy, which must
            carry a <b>unit</b> (kJ). The report&rsquo;s most common errors were a missing or wrong unit and
            writing the energy released as −454 kJ: the minus sign belongs to ΔH, not to an amount
            of energy that the question already calls &ldquo;released&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>n(C₃H₈) = m / M = 9.0 / 44.0 = 0.2045 mol</b>.</> },
            { point: <>Correct <b>energy released = 0.2045 × 2220 = 4.5 × 10² kJ</b>, <b>with units</b> and as a <b>positive</b> amount.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Calorimetry"
        marks={2}
        statement={<>Calculate the energy absorbed by the water in the saucepan.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            The water&rsquo;s temperature rise tells you how much energy it <b>absorbed</b>: q = mcΔT.
            This is a different quantity from part b — the fuel released more than the water took in.
            Mark 1 is ΔT; mark 2 is q with its unit. Use the mass of the <b>water</b> (166.0 g), not the
            9.0 g of fuel.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>ΔT = 90.1 − 24.1 = 66.0 °C</b>.</> },
            { point: <>Correct <b>q = mcΔT = 166.0 × 4.18 × 66.0 = 45.8 kJ</b> (45 796 J), <b>with unit</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Energy Efficiency"
        marks={1}
        statement={<>Determine the overall energy efficiency of heating the water in the saucepan.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Efficiency = useful energy out ÷ energy in × 100%. Here &ldquo;in&rdquo; is the energy the fuel
            released (part b) and &ldquo;useful out&rdquo; is the energy the water absorbed (part c.i). The
            answer must be under 100% — if you get 991%, you have divided the wrong way round or mixed J
            with kJ.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Efficiency = (45.8 / 454) × 100 = 10%</b> — energy absorbed by the water ÷ energy released by the fuel.</> }]} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Kim placed all of the equipment inside a sealed container with a total air volume of 0.125 m³
          and repeated the investigation.
          <br />
          The air in the enclosure contained 21.0% v/v oxygen, O₂, at standard laboratory conditions
          (SLC).
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={sealedSrc}
            alt="The same camp-stove set-up enclosed in a sealed container labelled 21.0% v/v O₂ — from the original 2025 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Excess Reactant"
        marks={4}
        statement={
          <>
            9.0 g of C₃H₈ was combusted in the sealed container shown above.
            <br />
            Determine the mass of the reactant in excess.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            An excess-reactant question has three stages: find the amount of <b>each</b> reactant (propane
            from part b; oxygen from the container&rsquo;s volume), use the <b>mole ratio</b> to see which
            runs out first, then find how much of the other is <b>left over</b> and convert that to a mass.
            The marks follow those stages: two marks for n(O₂) in the container, one for the moles of
            O₂ left over, one for the mass with its unit. The report names the two issues: not converting
            m³ to L, and stopping at the limiting reagent without working out how much excess
            reagent <b>remained</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { marks: 2, point: <>Correct <b>n(O₂) in the container = 1.058 mol</b>: <b>0.125 m³ = 125 L</b>, then V(O₂) = 0.210 × 125 = 26.25 L and n = 26.25 ÷ <b>24.8</b> (or n(gas) = 125 ÷ 24.8 = 5.04 mol, then × 0.210).</> },
            { point: <>Correct <b>n(O₂) in excess = n(O₂) initial − n(O₂) needed = 1.058 − 5 × 0.2045 = 0.0355 mol</b> (using the <b>1 : 5 mole ratio</b>).</> },
            { point: <>Correct <b>mass of excess O₂ = 0.0355 × 32 = 1.1 g</b>, <b>with units</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Fuel Energy Content"
        marks={2}
        statement={
          <>
            In another investigation, Kim found that 15.3 g of C₂H₅OH (<i>M</i> = 46.0 g mol⁻¹) was
            required to produce the same change in water temperature as the 9.0 g of C₃H₈.
            <br />
            Explain why different masses of the fuels were required to produce the same temperature change.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Same temperature change means the same energy was needed. So the question is really
            &ldquo;why does a gram of ethanol release less energy than a gram of propane?&rdquo; Two marks
            means two ideas: <b>state the difference</b> (with numbers), then give the <b>chemical reason</b>{' '}
            for it — look at what the two molecules contain. The report did not accept &ldquo;bond
            enthalpies&rdquo; as the reason (that would need full bond-enthalpy calculations, beyond the study
            design); the accepted reason is that ethanol is <b>partially oxidised</b> already.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>States that the <b>energy content of ethanol is less than that of propane</b>, in kJ g⁻¹ or kJ mol⁻¹ (29.7 vs 50.5 kJ g⁻¹; 1367 vs 2220 kJ mol⁻¹).</> },
            { point: <>The reason: ethanol is <b>partially oxidised</b> already — it contains a <b>hydroxy group</b>. (&ldquo;Bond enthalpies&rdquo; was not accepted without full calculations.)</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
