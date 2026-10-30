// 2022 Chemistry Exam, Section B Question 7 (8 marks). LPG (propane) as a fuel: a thermochemical
// equation, the energy released by 33.7 L of liquid propane, and an acidic LPG fuel cell — polarity
// of the O₂ electrode, the half-equation at the propane electrode, and one difference from a
// secondary cell. Question text transcribed from the original paper; the fuel-cell diagram is
// cropped from the original VCAA exam PDF. VCAA report only (no second source); the report states
// the marks for a, b, d and e, and for c gives just the answer. The worked solutions, "How to Think
// About It" notes and model answers are original. Numbers checked in Python.
// Data Book: the 2022 Data Book listed propane's heat of combustion as 50.5 kJ g⁻¹ (the report uses
// it); the 2026 Data Book has no kJ g⁻¹ value for propane, so part b uses the molar enthalpy
// (item 12, −2220 kJ mol⁻¹) and gets 8.67 × 10⁵ kJ against the report's 8.68 × 10⁵ kJ — a
// DataBookNote says so. The report prints "x 103" (a slip for × 10³, the superscript missing on
// the report page itself) — kept verbatim, explained in the working. The report's part e. comment calls the cell a "C₃H₈-SOFC" (solid oxide fuel cell),
// although the question's cell has an acidic electrolyte — kept verbatim, explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import fuelCellSrc from './chem-2022sa-q7-fuel-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [23, 45, 32],
  average: 1.1,
  comment: (
    <>
      <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" /> ΔH = −2220 kJ mol⁻¹
      <br />
      One mark was awarded for a correctly balanced equation with correct states.
      <br />
      The second mark was awarded for showing correct ΔH (in kJ mol⁻¹), including sign and units.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 25, 45],
  average: 1.1,
  comment: (
    <>
      One mark was awarded for a correctly calculated mass of propane.
      <br />
      m(C₃H₈) = d x V
      <br />
      = 0.510 x 33.7
      <br />
      = 17.187 kg
      <br />
      Data Book: 1 g of C₃H₈ = 50.5 kJ, so 1 kg = 50.5 MJ
      <br />
      The second mark was awarded for the correct calculation of the energy released with units.
      <br />
      Energy released = 50.5 x 17.187 x 103 = 868 MJ / 8.68x10⁵ kJ
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Positive / (+)</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [40, 22, 38],
  average: 1.0,
  comment: (
    <>
      <Chem eq="C3H8 + 6H2O -> 3CO2 + 20H+ + 20e-" />
      <br />
      One mark was awarded for correct reactants and products.
      <br />
      The second mark was awarded for a correctly balanced half equation.
      <br />
      (States were not assessed in this question.)
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [61, 39],
  average: 0.4,
  comment: (
    <>
      Any one of the following responses was awarded the mark.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          C₃H₈ and O₂ / reactants continuously supplied to the C₃H₈-SOFC, whereas there is a fixed quantity
          of reactants at the start of the secondary cell life and the amount decreases during discharge.
        </li>
        <li>
          Products move out of the fuel cell, whereas in a secondary cell the products remain in contact
          with the electrodes.
        </li>
        <li>The SOFC produces greenhouse gases, whereas the secondary cell does not.</li>
      </ul>
      Both electrochemical cells were required to be mentioned in the response in order to receive the mark.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <><Chem eq="C3H8(g) + O2(g) -> CO2(g) + H2O(l)" /></>,
    reason: <><b>Complete</b> combustion of a hydrocarbon gives only CO₂ and H₂O. Water is H₂O(<b>l</b>) because the Data Book&rsquo;s ΔH values are for products at SLC (25 °C), where water is a liquid.</>,
  },
  {
    working: <><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" /></>,
    reason: <>Balance C first (3 C → 3CO₂), then H (8 H → 4H₂O), then O last: 3 × 2 + 4 × 1 = 10 O atoms on the right, so 5O₂. Mark 1: balanced, with correct states.</>,
  },
  {
    working: <b><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />  ΔH = −2220 kJ mol⁻¹</b>,
    reason: (
      <>
        Mark 2: the <b>molar enthalpy of combustion</b> of propane from the Data Book, with its <b>negative sign</b> (combustion is <b>exothermic</b>) and <b>units</b>. It is for 1 mol of C₃H₈, so keep the coefficient of C₃H₈ as 1 — if you doubled the equation, ΔH would have to double to −4440 kJ.
        <DataBookNote>molar enthalpies of combustion are item 12 in the 2026 Data Book; propane&rsquo;s value, −2220 kJ mol⁻¹, is unchanged.</DataBookNote>
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  { working: <>m(C₃H₈) = d × V</>, reason: <>33.7 L is the volume of <b>liquid</b> LPG in the tank, not a gas volume — so use the given <b>density</b>, not the molar gas volume (24.8 L mol⁻¹), to get the mass.</> },
  { working: <>m(C₃H₈) = 0.510 kg L⁻¹ × 33.7 L</>, reason: <>The litres cancel, leaving kg.</> },
  { working: <>m(C₃H₈) = 17.187 kg = 17 187 g</>, reason: <>Mark 1: the mass of propane. Convert to grams because molar mass is in g mol⁻¹.</> },
  { working: <>n(C₃H₈) = m / M = 17 187 g / 44.0 g mol⁻¹</>, reason: <>M(C₃H₈) = 3 × 12.0 + 8 × 1.0 = 44.0 g mol⁻¹. ΔH is per mole, so we need the amount in mol.</> },
  { working: <>n(C₃H₈) = 390.6… mol</>, reason: <>Keep unrounded.</> },
  { working: <>E = n × |ΔH| = 390.6… mol × 2220 kJ mol⁻¹</>, reason: <>Each mole releases 2220 kJ. Use the <b>size</b> of ΔH: &ldquo;energy released&rdquo; is already a positive amount.</> },
  {
    working: <b>E = 8.67 × 10⁵ kJ (867 MJ)</b>,
    reason: (
      <>
        Mark 2: the energy <b>with units</b>. (867 162 kJ unrounded.) Three significant figures, set by 0.510 and 33.7. Plausible: a car tank&rsquo;s worth of fuel releases hundreds of megajoules.
        <DataBookNote>the 2022 Data Book also gave propane&rsquo;s heat of combustion as 50.5 kJ g⁻¹, and the report uses it: 50.5 kJ g⁻¹ × 17 187 g = 8.68 × 10⁵ kJ (868 MJ). The 2026 Data Book has no kJ g⁻¹ value for propane, so we use the molar enthalpy (item 12) and get 8.67 × 10⁵ kJ. The 1 MJ difference only comes from rounding 2220 ÷ 44.0 = 50.45… up to 50.5 — both answers are correct. In the report&rsquo;s working, &ldquo;x 103&rdquo; is a slip for × 10³ (the superscript is missing) — the factor that turns 17.187 kg into 17 187 g, not × 103.</DataBookNote>
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  { working: <>At electrode P: <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" /></>, reason: <>O₂ goes in at P and H₂O comes out, so O₂ gains electrons — it is <b>reduced</b>. Reduction happens at the <b>cathode</b>.</> },
  { working: <b>Electrode P is positive (+).</b>, reason: <>In a galvanic cell (a fuel cell is one) the <b>cathode is positive</b>: electrons flow through the load <i>towards</i> P, where O₂ uses them up. (In an electrolytic cell the cathode is negative — don&rsquo;t mix the two.)</> },
]

const ROWS_D: WorkingRow[] = [
  { working: <><Chem eq="C3H8 -> 3CO2" /></>, reason: <>From the diagram, C₃H₈ and H₂O go in at Q and CO₂ comes out: propane is <b>oxidised</b> to CO₂ at the anode (−). Balance C first.</> },
  { working: <><Chem eq="C3H8 + 6H2O -> 3CO2" /></>, reason: <>Balance O with <b>H₂O</b>: 3CO₂ has 6 O atoms, so add 6H₂O on the left (the diagram shows water being fed in with the propane).</> },
  { working: <><Chem eq="C3H8 + 6H2O -> 3CO2 + 20H+" /></>, reason: <>Balance H with <b>H⁺</b> — the electrolyte is <b>acidic</b>: 8 + 12 = 20 H on the left, so 20H⁺ on the right.</> },
  {
    working: <b><Chem eq="C3H8(g) + 6H2O(l) -> 3CO2(g) + 20H+(aq) + 20e-" /></b>,
    reason: <>Balance charge with electrons: left 0, right +20, so add 20e⁻ on the right (electrons are a <b>product</b> in oxidation). Check: C 3 = 3, H 20 = 20, O 6 = 6, charge 0 = 0. Mark 1: correct reactants and products; Mark 2: fully balanced. States were not assessed here, but including them does no harm.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>In the LPG fuel cell, the reactants (<b>C₃H₈ and O₂</b>) are <b>continuously supplied</b> from outside the cell, whereas a secondary cell contains a <b>fixed amount of reactants</b>, which <b>decreases during discharge</b>.</>,
    reason: <>The one mark needs a difference that <b>mentions both cells</b> — a statement about the fuel cell alone (&ldquo;the fuel cell has a continuous supply of fuel&rdquo;) scores nothing.</>,
  },
  {
    working: <>Other accepted answers: the fuel cell&rsquo;s <b>products leave the cell</b> (CO₂ and H₂O flow out), whereas a secondary cell&rsquo;s <b>products stay in contact with the electrodes</b>; or the LPG fuel cell <b>produces a greenhouse gas (CO₂)</b>, whereas the secondary cell does not.</>,
    reason: <>Any one of these earns the mark. The report calls the cell a &ldquo;C₃H₈-SOFC&rdquo; (solid oxide fuel cell), although the question&rsquo;s cell has an acidic electrolyte — read it as &ldquo;the LPG fuel cell&rdquo;; the differences apply all the same. A secondary cell&rsquo;s products staying at the electrodes is what lets it be <b>recharged</b>.</>,
  },
]

export default function ChemistryQ7_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (8 marks)</p>
        <p>Liquefied petroleum gas (LPG) is a type of fuel currently used in some cars.</p>
      </div>

      <PartCard
        letter="a"
        topic="Thermochemical Equation"
        marks={2}
        statement={
          <>
            The main component of LPG is propane, C₃H₈, gas.
            <br />
            Write a thermochemical equation for the complete combustion of propane gas.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A <b>thermochemical equation</b> is a balanced equation <i>plus</i> its ΔH. Two marks, two
            things: (1) the equation balanced <b>with states</b> — the states must match the SLC
            conditions the Data Book value was measured under, so water is H₂O(l); (2) ΔH from the Data
            Book with its <b>negative sign</b> and <b>units</b>. Fewer than a third of students got both:
            a missing sign, units or ΔH costs the second mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>correctly balanced</b> equation <b>with correct states</b>: <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />.</> },
            { point: <>Correct <b>ΔH = −2220 kJ mol⁻¹</b>, including the <b>negative sign</b> and <b>units</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Energy Released"
        marks={2}
        statement={
          <>
            An LPG-powered car uses 33.7 L of C₃H₈ to travel 270 km.
            <br />
            Calculate the amount of energy released when 33.7 L of C₃H₈ undergoes complete combustion. The
            density of C₃H₈ is 0.510 kg L⁻¹.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Volume → mass → moles → energy. The trap is the &ldquo;L&rdquo;: this is <b>liquid</b> fuel
            in a tank, which is why the density is given — it is not a gas at SLC, so 24.8 L mol⁻¹ does
            not apply. The first mark is for the mass (d × V); the second for the energy with units. The
            270 km is not needed.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>mass of propane: m = d × V = 0.510 × 33.7 = 17.187 kg</b>.</> },
            { point: <>Correct <b>energy released ≈ 8.67 × 10⁵ kJ</b> (report: 868 MJ / 8.68 × 10⁵ kJ via 50.5 kJ g⁻¹), <b>with units</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">A diagram of an acidic LPG fuel cell is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={fuelCellSrc}
            alt="Acidic LPG fuel cell: O₂ enters and H₂O leaves at Electrode P (top); C₃H₈ + H₂O enter and CO₂ leaves at Electrode Q (bottom); an acidic electrolyte between them and a load connecting the electrodes — from the original 2022 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Electrode Polarity"
        marks={1}
        statement={<>State the polarity of Electrode P.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Read the arrows: what goes in and comes out at P tells you whether P is where oxidation or
            reduction happens. O₂ in, H₂O out → reduction → <b>cathode</b>. A fuel cell is a galvanic
            cell, and in a galvanic cell the cathode is <b>positive</b>. 35% of students scored zero here; an easy
            slip is to use the electrolytic-cell rule instead (cathode negative).
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme source="ours" points={[{ point: <>Electrode P is <b>positive (+)</b> — it is the <b>cathode</b>, where O₂ is reduced.</> }]} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Fuel Cell Half-Equation"
        marks={2}
        statement={<>Write a balanced half-equation for the reaction at Electrode Q.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            The diagram gives you the species: C₃H₈ and H₂O in, CO₂ out. Write the oxidation
            half-equation and balance it the acidic way — <b>C</b>, then <b>O with H₂O</b>, then{' '}
            <b>H with H⁺</b>, then <b>charge with e⁻</b>. One mark is for the right reactants and
            products, the second for the full balance; 40% of students scored zero.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>reactants and products</b>: C₃H₈ and H₂O → CO₂, H⁺ and e⁻.</> },
            { point: <>A <b>correctly balanced</b> half-equation: <Chem eq="C3H8 + 6H2O -> 3CO2 + 20H+ + 20e-" /> (states not assessed).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Fuel vs Secondary Cell"
        marks={1}
        statement={<>Identify <b>one</b> difference between an acidic LPG fuel cell and a secondary cell during discharge.</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            A &ldquo;difference&rdquo; needs <b>both sides</b>: say what the fuel cell does <i>and</i>{' '}
            what the secondary cell does instead, joined by &ldquo;whereas&rdquo;. The report states that
            both cells had to be mentioned to get the mark — and only 39% did. Think about where each
            cell&rsquo;s reactants come from and where its products go.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one difference that <b>mentions both cells</b>: reactants <b>continuously supplied</b> to the fuel cell vs a <b>fixed quantity</b> in the secondary cell that decreases; or products <b>leave</b> the fuel cell vs <b>remain in contact with the electrodes</b>; or the fuel cell produces <b>greenhouse gases</b> vs the secondary cell does not.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
