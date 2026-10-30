// 2023 Chemistry Exam, Section B Question 3 (12 marks). Fuels: the energy released by burning
// 140.0 g of propane, its thermochemical equation at SLC, sketching its energy profile, how the
// profile changes for incomplete combustion, the volume of CO₂ from burning 96.0 g of ethanol
// (ideal gas equation at 15.0 °C and 100.0 kPa), and why ethanol's flashpoint is higher than
// propane's. Question text transcribed from the original paper; the blank energy axes are cropped
// from the original VCAA exam PDF and the report's sample energy profile from the examination
// report. The red/blue curves in parts a.iii and a.iv are this site's own SVG overlay on the
// cropped axes, not a redrawing of the figure. Mark allocations for a.ii, a.iii, a.iv, b.i and
// b.ii are itemised in the VCAA report; a.i is our reading. Source: VCAA report only. Numbers
// checked in Python.
// Data Book: the report's 50.5 kJ g⁻¹ for propane is a per-gram value the 2026 Data Book no longer
// lists (item 12 gives only −2220 kJ mol⁻¹), so a.i works via moles (7.06 × 10³ kJ, which the
// report also accepted) — a Data Book note says so.
// Study design: "flashpoint" (b.ii) is not named in the 2024–2027 study design, but the chemistry
// it rests on (hydrogen bonding vs dispersion forces, energy to overcome intermolecular forces) is;
// written up with a note and flagged as borderline for KZ. The report's mark table for a.iv sums to
// 110% (60/40/10) — VCAA's rounding, kept as printed.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import axesSrc from './chem-2023sa-q3aiii-axes.png'
import reportGraphSrc from './chem-2023sa-q3aiii-report-graph.png'

const EXAM_AI: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Heat of combustion is 50.5 kJ g⁻¹
      <br />
      Therefore 50.5 × 140 = 7.07 ×10³ kJ (7.06 ×10³ kJ was also a valid response).
      <br />
      Incorrect units such as kJ g⁻¹ were commonly seen but could not be awarded marks.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [20, 30, 50],
  average: 1.3,
  comment: (
    <>
      <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />    <i>Δ</i>H = −2220 kJ mol⁻¹ or −2220 kJ
      <br />
      Either kJ mol⁻¹ or kJ were accepted as viable units for <i>Δ</i>H.
      <br />
      The first mark was awarded for a correctly balanced chemical equation with correct states.
      <br />
      The second mark was awarded for the correct <i>Δ</i>H value with correct units.
      <br />
      This question was well done, although some students were still attempting to use <i>Δ</i>H = −50.5 kJ g⁻¹,
      which is not applicable for a thermochemical equation. Since the question explicitly stated at SLC, the
      states had to be (g) for propane and (l) for water, and this also was not always recognised.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The report's sample answer: an energy profile with reactants on a higher level, a single hump, then products on a lower level — from the VCAA examination report"
        className="w-full max-w-[360px] mt-1"
      />
      The mark was awarded for the correct exothermic profile being shown.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [60, 40, 10],
  average: 0.5,
  comment: (
    <>
      The first mark was awarded for recognising that the products of incomplete combustion needed to have a
      higher energy than shown for the complete combustion (but still below the reactants).
      <br />
      The second mark was awarded when the student identified this as being due to the incomplete oxidation of
      the reactants, which is the reason for less energy being released.
      <br />
      Students commonly tried to explain the reason for the energy difference as being due to the ‘incomplete
      combustion’ rather than incomplete oxidation, but as this term was already stated in the stem of the
      question, this was not an acceptable approach.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [10, 10, 20, 60],
  average: 2.3,
  comment: (
    <>
      The first mark was awarded for the correct calculation of n(ethanol) = 96.0/46.0 = 2.09 mol
      <br />
      The second mark was awarded for the correct calculation of n(CO₂) = 2 × 2.09 = 4.17 mol
      <br />
      The third mark was awarded for the correct calculation of the volume with units.
      <br />
      V(CO₂) = (4.17 × 8.31 × 288) / 100 = 99.9 L
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [20, 20, 30, 30],
  average: 1.7,
  comment: (
    <>
      The first mark was awarded for stating that the flashpoint of ethanol is higher than the flashpoint of
      propane.
      <br />
      The second mark was awarded when the student clearly recognised the structural component of either
      ethanol and/or propane that was the major factor affecting the flashpoint. Typically, students referred
      to the presence of the hydroxyl group as being the major factor in the structure of ethanol.
      <br />
      The third mark was awarded for discussion around the need for a greater amount of energy and/or the
      higher temperature that would be required to break the intermolecular bonds in ethanol.
    </>
  ),
}

// Overlay geometry, in the cropped axes image's own pixels (920 × 820): the y-axis is at x ≈ 178,
// the x-axis at y ≈ 738.
const LABEL = { fontSize: 30, fontFamily: 'Poppins, sans-serif' }

function ProfileSketch({ incomplete }: { incomplete?: boolean }) {
  return (
    <div className="relative w-full max-w-[420px] bg-white rounded-lg">
      <img
        loading="lazy"
        decoding="async"
        src={axesSrc}
        alt={incomplete ? 'Our sketch on the blank energy axes: the complete-combustion profile, with the incomplete-combustion products drawn at a higher level that is still below the reactants' : 'Our sketch on the blank energy axes: reactants at a higher level, one hump for the activation energy, products at a lower level, with ΔH and Ea marked'}
        className="w-full"
      />
      <svg viewBox="0 0 920 820" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <marker id={incomplete ? 'arrB' : 'arrR'} markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={incomplete ? '#2563eb' : '#dc2626'} />
          </marker>
        </defs>
        <path
          d="M215,330 L370,330 C425,330 435,110 480,110 C525,110 540,600 590,600 L800,600"
          fill="none"
          stroke={incomplete ? '#9ca3af' : '#dc2626'}
          strokeWidth={6}
        />
        <text x={200} y={375} fill="#111827" style={LABEL}>C₃H₈ + 5O₂</text>
        {!incomplete && (
          <>
            <text x={600} y={580} fill="#111827" style={LABEL}>3CO₂ + 4H₂O</text>
            <line x1={370} y1={330} x2={860} y2={330} stroke="#6b7280" strokeWidth={3} strokeDasharray="10 8" />
            <line x1={850} y1={335} x2={850} y2={590} stroke="#dc2626" strokeWidth={4} markerEnd="url(#arrR)" />
            <text x={700} y={470} fill="#dc2626" style={LABEL}>ΔH &lt; 0</text>
            <line x1={300} y1={110} x2={480} y2={110} stroke="#6b7280" strokeWidth={3} strokeDasharray="10 8" />
            <line x1={300} y1={325} x2={300} y2={120} stroke="#dc2626" strokeWidth={4} markerEnd="url(#arrR)" />
            <text x={225} y={230} fill="#dc2626" style={LABEL}>Ea</text>
          </>
        )}
        {incomplete && (
          <>
            <text x={600} y={635} fill="#6b7280" style={LABEL}>complete</text>
            <path d="M600,470 L800,470" fill="none" stroke="#2563eb" strokeWidth={6} strokeDasharray="16 10" />
            <text x={600} y={450} fill="#2563eb" style={LABEL}>incomplete</text>
            <text x={600} y={510} fill="#2563eb" style={{ ...LABEL, fontSize: 24 }}>(CO, C, H₂O)</text>
            <line x1={850} y1={335} x2={850} y2={460} stroke="#2563eb" strokeWidth={4} markerEnd="url(#arrB)" />
            <line x1={370} y1={330} x2={860} y2={330} stroke="#6b7280" strokeWidth={3} strokeDasharray="10 8" />
          </>
        )}
      </svg>
    </div>
  )
}

const ROWS_AI: WorkingRow[] = [
  { working: <>n(C₃H₈) = m / M</>, reason: <>The Data Book gives propane&rsquo;s energy <b>per mole</b>, so convert the mass to moles first. M(C₃H₈) = 3 × 12.0 + 8 × 1.0 = 44.0 g mol⁻¹.</> },
  { working: <>n(C₃H₈) = 140.0 g / 44.0 g mol⁻¹</> },
  { working: <>n(C₃H₈) = 3.181… mol</>, reason: <>Keep it unrounded for the next line.</> },
  {
    working: <>E = n × |ΔH| = 3.181… mol × 2220 kJ mol⁻¹</>,
    reason: (
      <>
        Each mole of propane releases 2220 kJ (Data Book, molar enthalpy of combustion of propane = −2220 kJ mol⁻¹). Use the <b>size</b> of ΔH — &ldquo;energy released&rdquo; is already a positive amount.
        <DataBookNote>
          the report uses propane&rsquo;s heat of combustion <b>per gram</b>, 50.5 kJ g⁻¹ (= 2220 ÷ 44.0), from the
          Data Book used in 2023, and gets 50.5 × 140 = 7.07 × 10³ kJ. The 2026 Data Book lists propane only by its
          molar enthalpy, −2220 kJ mol⁻¹ (item 12), so go via moles as here: 7.06 × 10³ kJ, which the report also
          accepted. Both answers score the mark.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <b>E = 7.06 × 10³ kJ</b>,
    reason: <>(7063.6… kJ unrounded.) Three significant figures, matching the Data Book data used (44.0 g mol⁻¹; 140.0 g has four). The unit must be <b>kJ</b> — an amount of energy. The report says &ldquo;kJ g⁻¹&rdquo; was commonly written and could not be awarded the mark. Plausible: 140 g is about 3 mol, and 3 × 2220 ≈ 7000.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <><Chem eq="C3H8(g) + O2(g) -> CO2(g) + H2O(l)" /></>,
    reason: <><b>Complete</b> combustion of a hydrocarbon gives only CO₂ and H₂O. <b>At SLC</b> (25 °C, 100 kPa) propane is a <b>gas</b> and water is a <b>liquid</b> — the report says these states were not always recognised.</>,
  },
  {
    working: <><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" /></>,
    reason: <>Balance C first (3 C → 3CO₂), then H (8 H → 4H₂O), then O last: 3 × 2 + 4 × 1 = 10 O atoms on the right, so 5O₂. Mark 1: <b>balanced with correct states</b>.</>,
  },
  {
    working: <b><Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)" />  ΔH = −2220 kJ mol⁻¹</b>,
    reason: <>Mark 2: the <b>ΔH value with units</b>. It is the Data Book&rsquo;s molar enthalpy of combustion for exactly 1 mol of C₃H₈ (the coefficient in front of C₃H₈ is 1), <b>negative</b> because combustion is <b>exothermic</b>. kJ mol⁻¹ or kJ were both accepted. Don&rsquo;t write −50.5 kJ g⁻¹: a thermochemical equation is in moles, not grams — the report names this error.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <ProfileSketch />,
    reason: (
      <>
        Our sketch (red), drawn on the paper&rsquo;s axes:
        <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
          <li><b>reactants</b> (C₃H₈ + 5O₂) on a flat level on the left</li>
          <li>one hump — the <b>activation energy</b>, E<sub>a</sub>, which is needed even though the reaction releases energy (a spark or flame starts it)</li>
          <li><b>products</b> (3CO₂ + 4H₂O) on a <b>lower</b> flat level on the right, because the reaction is <b>exothermic</b> (ΔH &lt; 0).</li>
        </ul>
        The mark is for this <b>exothermic shape</b>. Labelling reactants, products, ΔH and E<sub>a</sub> is good practice. It matches the report&rsquo;s sample graph.
      </>
    ),
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <ProfileSketch incomplete />,
    reason: <>The blue dashed level is where the products of incomplete combustion sit: <b>higher</b> than for complete combustion (grey), but still <b>below the reactants</b>.</>,
  },
  {
    working: <>The <b>products</b> of incomplete combustion would be at a <b>higher energy</b> than the products of complete combustion, though still <b>below the reactants</b>, so <b>less energy is released</b> (ΔH is less negative).</>,
    reason: <>Mark 1: <b>state the difference</b> on the diagram. It is still exothermic, so the products stay below the reactants.</>,
  },
  {
    working: <>This is because the carbon in propane is only <b>partially oxidised</b> (to CO or C instead of CO₂) — the reactants undergo <b>incomplete oxidation</b>, so less energy is released.</>,
    reason: <>Mark 2: the <b>justification</b>. Use the word &ldquo;<b>oxidation</b>&rdquo;: the report says answers that only repeated &ldquo;incomplete combustion&rdquo; — the words already in the question — were not accepted.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  { working: <>n(C₂H₅OH) = m / M</>, reason: <>Start from the mass you are given. M(C₂H₅OH) = 2 × 12.0 + 6 × 1.0 + 16.0 = 46.0 g mol⁻¹.</> },
  { working: <>n(C₂H₅OH) = 96.0 g / 46.0 g mol⁻¹</> },
  { working: <>n(C₂H₅OH) = 2.086… mol</>, reason: <>Mark 1: <b>n(ethanol)</b>. Keep it unrounded.</> },
  { working: <>n(CO₂) = 2 × n(C₂H₅OH)</>, reason: <>Mole ratio from the equation: C₂H₅OH : CO₂ = 1 : 2.</> },
  { working: <>n(CO₂) = 2 × 2.086… mol = 4.173… mol</>, reason: <>Mark 2: <b>n(CO₂) using the 1 : 2 ratio</b>. (The report writes &ldquo;2 × 2.09 = 4.17&rdquo;: its 4.17 comes from the unrounded 2.086…; 2 × 2.09 itself is 4.18. Carry the unrounded value, as here, and the issue disappears.)</> },
  { working: <>T = 15.0 + 273 = 288 K</>, reason: <>The gas equation needs <b>kelvin</b>. 0 °C = 273 K (Data Book). The conditions are not SLC, so the molar volume 24.8 L mol⁻¹ <b>cannot</b> be used — use pV = nRT.</> },
  { working: <>V = nRT / p</>, reason: <>Rearranged ideal gas equation pV = nRT (Data Book), R = 8.31 J mol⁻¹ K⁻¹.</> },
  { working: <>V = (4.173… mol × 8.31 J mol⁻¹ K⁻¹ × 288 K) / 100.0 kPa</>, reason: <>With p in <b>kPa</b>, V comes out in <b>litres</b> (8.31 J mol⁻¹ K⁻¹ = 8.31 kPa L mol⁻¹ K⁻¹). With p in Pa (100 000 Pa) it would come out in m³.</> },
  {
    working: <b>V(CO₂) = 99.9 L</b>,
    reason: <>(99.89… L unrounded.) Mark 3: the <b>volume with units</b>. Three significant figures, from 96.0 g, 46.0 g mol⁻¹ and 15.0 °C. Plausible: about 4 mol of gas at roughly room conditions occupies about 4 × 24 ≈ 100 L. Note: the report&rsquo;s line (4.17 × 8.31 × 288) / 100 actually gives 99.8 L; its 99.9 L comes from the unrounded n(CO₂). Rounding in the middle of a calculation shifts the last digit, so keep full values until the end.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>The flashpoint of ethanol is <b>higher</b> than the flashpoint of propane.</>,
    reason: <>Mark 1: the <b>choice</b>. Flashpoint is the lowest temperature at which a fuel gives off enough vapour to ignite in air — so a fuel that is harder to vaporise has a higher flashpoint.</>,
  },
  {
    working: <>Ethanol contains a <b>hydroxyl (–OH) group</b>, so ethanol molecules form <b>hydrogen bonds</b> with each other as well as dispersion forces. Propane is a <b>non-polar</b> hydrocarbon with only <b>dispersion forces</b> between its molecules.</>,
    reason: <>Mark 2: the <b>structural feature</b> that makes the difference. The two molar masses are almost the same (46.0 vs 44.0 g mol⁻¹), so their dispersion forces are similar — the question gives the molar masses to point you to the –OH group as the real difference.</>,
  },
  {
    working: <>So the <b>intermolecular forces</b> in ethanol are <b>stronger</b>, and <b>more energy / a higher temperature</b> is needed to overcome them and vaporise enough ethanol to ignite.</>,
    reason: <>Mark 3: link the structure to the property — <b>more energy to overcome the intermolecular forces</b>. Say &ldquo;intermolecular&rdquo;: combustion breaks covalent bonds, but vaporising does not.</>,
  },
]

export default function ChemistryQ3_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (12 marks)</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">a.</p>
        <p>Propane is used as a fuel for barbeques.</p>
      </div>

      <PartCard
        letter="a.i"
        topic="Energy Released"
        marks={1}
        statement={<>Calculate the amount of energy released when 140.0 g of propane is completely combusted.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Amount of energy released&rdquo; is an energy in <b>kJ</b>. Find how many moles of propane burn, then
            multiply by the energy each mole releases (the Data Book&rsquo;s molar enthalpy of combustion). One mark: the
            right number <b>with the right unit</b> — the report says kJ g⁻¹ was a common wrong unit.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Correct <b>energy released = 7.07 × 10³ kJ</b> (or 7.06 × 10³ kJ) <b>with units of kJ</b> — not kJ g⁻¹.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Thermochemical Equation"
        marks={2}
        statement={<>Write a thermochemical equation for the complete combustion of propane at SLC.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            A thermochemical equation is a <b>balanced equation with states</b> plus its <b>ΔH</b>. Two marks, two
            ideas: the equation (balanced, with the states that apply <b>at SLC</b>), then the ΔH value with units. The
            traps the report names: writing the per-gram value −50.5 kJ g⁻¹ as ΔH, and giving water as (g) when SLC
            makes it (l).
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>correctly balanced</b> equation with <b>correct states</b>: C₃H₈(g), O₂(g), CO₂(g), <b>H₂O(l)</b>.</> },
            { point: <>The correct <b>ΔH = −2220 kJ mol⁻¹</b> (or −2220 kJ) <b>with units</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Energy Profile"
        marks={1}
        statement={
          <>
            Sketch the energy profile for the complete combustion of propane on the axes provided below.
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={axesSrc}
                alt="Blank axes: energy on the vertical axis, reaction progress on the horizontal axis — from the original 2023 VCAA exam paper"
                className="w-full max-w-[320px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <Background title="How to Think About It">
          <p>
            Combustion is <b>exothermic</b>, so the products end up <b>lower in energy</b> than the reactants, and the
            energy difference is released as heat. Every reaction also has an <b>activation energy</b> hump between the
            two levels. One mark: the correct exothermic shape.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The correct <b>exothermic profile</b>: <b>products lower than reactants</b>, with an activation-energy hump between them.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.iv"
        topic="Incomplete Combustion"
        marks={2}
        statement={
          <>
            State how the energy profile for the <b>incomplete</b> combustion of propane would differ from the diagram you
            drew in part <b>a.iii</b>. Justify your answer.
          </>
        }
        examinerReport={EXAM_AIV}
      >
        <Background title="How to Think About It">
          <p>
            Two marks: <b>state</b> what changes on the diagram (where the products sit), then <b>justify</b> it with
            chemistry. Incomplete combustion makes CO or soot (C) instead of CO₂ — the carbon is <b>less oxidised</b>, so
            less energy is released and the products sit higher. The trap the report describes: justifying it with
            &ldquo;because it is incomplete combustion&rdquo; just repeats the question — the justification must be
            <b> incomplete oxidation</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIV} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>products</b> of incomplete combustion are at a <b>higher energy</b> than for complete combustion, but <b>still below the reactants</b>.</> },
            { point: <>Because of <b>incomplete oxidation</b> of the reactants, <b>less energy is released</b>. (&ldquo;Incomplete combustion&rdquo; alone was not accepted.)</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">b.</p>
        <p className="mb-2">An equation for the complete combustion of ethanol, C₂H₅OH, is shown below.</p>
        <p className="text-center">
          <Chem eq="C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)" />
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Ideal Gas Equation"
        marks={3}
        statement={
          <>
            96.0 g of ethanol completely combusts and the CO₂ produced is collected.
            <br />
            Calculate the volume of a tank required to store the captured CO₂ at 15.0 °C and 100.0 kPa.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            A mass-to-gas-volume stoichiometry chain: mass of ethanol → mol of ethanol → mol of CO₂ (mole ratio
            1 : 2) → volume. Three marks, one for each step. The conditions are 15.0 °C, <b>not SLC</b>, so you need
            <b> pV = nRT</b> with the temperature in kelvin, not the 24.8 L mol⁻¹ molar volume.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>n(ethanol) = 96.0 / 46.0 = 2.09 mol</b>.</> },
            { point: <>Correct <b>n(CO₂) = 2 × 2.087 = 4.17 mol</b> (the <b>1 : 2 mole ratio</b>).</> },
            { point: <>Correct <b>volume with units</b>: V = nRT / p = (4.174 × 8.31 × <b>288 K</b>) / 100.0 = <b>99.9 L</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Flashpoint"
        marks={3}
        statement={
          <>
            The molar mass of ethanol is 46.0 g mol⁻¹ and the molar mass of propane is 44.0 g mol⁻¹.
            <br />
            State whether the flashpoint of ethanol is higher or lower than the flashpoint of propane. Explain the reasons
            for your choice with reference to the structure of both molecules.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="Study Design Note">
          <p>
            &ldquo;Flashpoint&rdquo; is not named in the current (2024–2027) study design, but the reasoning is exactly
            the same as for <b>boiling point</b>, which is: compare the <b>intermolecular forces</b>, which come from the
            structure of the molecules. Worth doing as boiling-point practice.
          </p>
        </Background>
        <Background title="How to Think About It">
          <p>
            Three marks, three ideas: <b>choose</b> (higher or lower), name the <b>structural feature</b> responsible
            (ethanol&rsquo;s –OH group), and <b>link</b> it to the property (stronger intermolecular forces need more
            energy to overcome). The molar masses are given because they are almost equal — so size (dispersion forces)
            is not the difference; hydrogen bonding is.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The flashpoint of ethanol is <b>higher</b> than that of propane.</> },
            { point: <>The <b>structural feature</b> responsible: ethanol&rsquo;s <b>hydroxyl group</b> (so <b>hydrogen bonding</b>), versus propane&rsquo;s non-polar structure (dispersion forces only).</> },
            { point: <>A <b>greater amount of energy / higher temperature</b> is needed to <b>overcome the intermolecular forces</b> in ethanol.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
