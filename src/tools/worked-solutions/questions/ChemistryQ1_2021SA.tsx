// 2021 Chemistry Exam, Section B Question 1 (9 marks). Biogas from a digester: why biogas is
// renewable and coal seam gas is not, the thermochemical equation for the complete combustion of
// methane at SLC, the energy available from the CH₄ in 496.0 L of biogas, the maximum temperature
// that 1.63 × 10³ kJ could heat 100 kg of water to, and why that temperature may not be reached.
// Question text transcribed from the original paper (no figures in this question). Mark
// allocations are from the VCAA examination report, whose asterisks mark where marks were
// awarded; the worked solutions, "How to Think About It" notes and model answers are original.
// VCAA report only (no second source). Numbers checked in Python. The Data Book values used
// (CH₄ ΔHc = −890 kJ mol⁻¹, Vm = 24.8 L mol⁻¹ at SLC, c(water) = 4.18 J g⁻¹ K⁻¹) are unchanged
// in the 2026 Data Book, and the paper cites no item numbers, so no Data Book note is needed.
// All parts are on the current study design (fossil fuels vs biofuels and renewability).

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      A direct comparison of <i>both</i> biogas and coal seam gas indicating the <i>period of time</i> used
      to produce these materials was required. Biogas is considered renewable because its
      production-and-use cycle is continuous so that it is constantly replenished whereas coal seam gas
      is used at a faster rate than it can be replenished.*
      <br />
      Responses that were limited to a discussion of only one of the two materials did not receive the mark.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [30, 40, 30],
  average: 1.0,
  comment: (
    <>
      <Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" />* Δ<i>H</i> = −890 kJ mol⁻¹
      <br />
      A correctly balanced chemical equation with associated states was required for the first mark.
      <br />
      A molar enthalpy of combustion with a negative sign that matched the equation written was required
      for the second mark.
      <br />
      Students needed to recognise that the required equation was for standard laboratory conditions
      (SLC), and thus the H₂O produced must be written in the liquid state, not in the gaseous state.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [29, 21, 13, 37],
  average: 1.6,
  comment: (
    <>
      <i>n</i>(biogas) = 496.0 / 24.8
      <br />
      = 20.0 mol*
      <br />
      <i>n</i>(CH₄) = 0.60 x 20.0
      <br />
      = 12.0 mol*
      <br />
      Energy = 12.0 mol x 890 kJ mol⁻¹
      <br />
      = 1.07x10⁴ kJ (10680) kJ or (10.7 MJ)*
      <br />
      A significant number of students showed confusion over the information presented in the stem of the
      question and tried to use the 1 kg of organic waste material in their calculations instead of the
      volume of biogas produced from the organic waste.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [32, 20, 49],
  average: 1.2,
  comment: (
    <>
      Energy = 4.18 x <i>m</i>(H₂O) x Δ<i>T</i>
      <br />
      1.63 x 10³ (x 10³) = 4.18 x 100 (x 10³) x Δ<i>T</i>
      <br />
      Δ<i>T</i> = 1.63 x 10³ / (4.18 x 100)
      <br />
      = 3.90 °C*
      <br />
      T max = 25.0 + 3.90
      <br />
      = 28.9 °C (or 302 K)*
      <br />
      This question was assessed for significant figures and answers needed to be quoted to three
      significant figures to be awarded full marks.
      <br />
      Some confusion existed with students attempting, inappropriately, to use the density of water in
      their calculations.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      Students needed to provide any logical reason involving incomplete transfer of heat/energy to the
      water, for example:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>loss of heat/energy to the atmosphere</li>
        <li>heat/energy loss in the combustion chamber</li>
        <li>heat/energy loss since the tank material also is heated</li>
        <li>heat/energy loss from the piping</li>
        <li>faulty insulation.</li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Biogas is <b>renewable</b> because it is made by bacteria from organic waste, which is <b>constantly replenished</b> — it can be <b>replaced by natural processes within a relatively short period of time</b>, as fast as it is used.</>,
    reason: <>Half of the comparison: biogas. Renewability is about <b>time</b> — how quickly the resource is replaced compared with how quickly it is used.</>,
  },
  {
    working: <>Coal seam gas is <b>non-renewable</b> because it formed over <b>millions of years</b>, so it is <b>used at a faster rate than it can be replenished</b>.</>,
    reason: <>The other half: coal seam gas (a fossil fuel). The single mark needs <b>both</b> gases — the report gave no mark to an answer that discussed only one. That both contain CH₄ is irrelevant: renewability depends on the <b>source</b>, not the chemical.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <><Chem eq="CH4(g) + O2(g) -> CO2(g) + H2O(l)" /></>,
    reason: <>Unbalanced skeleton first. Complete combustion of a hydrocarbon gives only CO₂ and H₂O. At <b>SLC</b> (25 °C) water is a <b>liquid</b>, so write H₂O(l), not H₂O(g) — the report singles this out.</>,
  },
  {
    working: <><Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" /></>,
    reason: <>Balance C (1 CO₂), then H (4 H → 2H₂O), then O last: 2 + 2 = 4 O atoms on the right, so 2O₂. Mark 1: balanced, with states.</>,
  },
  {
    working: <b><Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" />  ΔH = −890 kJ mol⁻¹</b>,
    reason: <>Mark 2: the Data Book&rsquo;s molar enthalpy of combustion of methane, −890 kJ mol⁻¹. It is <b>negative</b> because combustion is <b>exothermic</b>, and it matches this equation because the equation burns exactly 1 mol of CH₄. (If you doubled the equation, ΔH would have to double to −1780 kJ.)</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>n(biogas) = V / V<sub>m</sub></>,
    reason: <>Energy depends on the <b>amount of CH₄ in mol</b>. The only data about the gas is its <b>volume</b> at SLC, so start there. The 1 kg of organic waste is just where the biogas came from — the report notes many students wrongly tried to use it.</>,
  },
  { working: <>n(biogas) = 496.0 L / 24.8 L mol⁻¹</>, reason: <>At SLC one mole of any gas occupies 24.8 L (Data Book).</> },
  { working: <>n(biogas) = 20.0 mol</>, reason: <>Mark 1.</> },
  {
    working: <>n(CH₄) = 0.600 × 20.0 mol = 12.0 mol</>,
    reason: <>Mark 2. Only 60.0% of the biogas is methane, and only the CH₄ burns to release this energy. (For a gas, a % by volume is also a % by moles, since equal volumes hold equal amounts.)</>,
  },
  { working: <>E = n(CH₄) × |ΔH|</>, reason: <>Each mole of CH₄ releases 890 kJ (part b.i), so multiply. &ldquo;Energy produced&rdquo; is a positive amount, so use the <b>size</b> of ΔH.</> },
  { working: <>E = 12.0 mol × 890 kJ mol⁻¹</> },
  {
    working: <b>E = 1.07 × 10⁴ kJ</b>,
    reason: <>Mark 3. (10 680 kJ unrounded.) Three significant figures, set by the least precise data (60.0%, 24.8 L mol⁻¹ and 890 kJ mol⁻¹ each have three). VCAA also accepted 10 680 kJ or 10.7 MJ. Plausible: 12.0 mol of CH₄ is only about 190 g (12.0 × 16.0), and methane releases roughly 55 kJ per gram, so around 10 MJ is the right size.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  { working: <>q = m c ΔT</>, reason: <>The energy absorbed by water. Assume the <b>maximum</b> case: all 1.63 × 10³ kJ goes into the water.</> },
  {
    working: <>m(H₂O) = 100 kg = 100 × 10³ g; q = 1.63 × 10³ kJ = 1.63 × 10⁶ J</>,
    reason: <>Match the units of c = 4.18 J g⁻¹ K⁻¹ (Data Book): mass in <b>grams</b> and energy in <b>joules</b>. The mass is given directly, so do <b>not</b> use the density of water — the report notes this confusion.</>,
  },
  { working: <>ΔT = q / (m c) = 1.63 × 10⁶ J / (100 × 10³ g × 4.18 J g⁻¹ K⁻¹)</>, reason: <>Rearrange for ΔT. (Equivalently, with c = 4.18 kJ kg⁻¹ K⁻¹: 1630 kJ ÷ (100 kg × 4.18) gives the same.)</> },
  { working: <>ΔT = 3.899… K = 3.90 °C</>, reason: <>Mark 1. A change of 1 K is the same size as a change of 1 °C.</> },
  { working: <>T<sub>max</sub> = 25.0 °C + 3.90 °C</>, reason: <>The question asks for the <b>final temperature</b>, not the change — add ΔT to the starting 25.0 °C.</> },
  {
    working: <b>T<sub>max</sub> = 28.9 °C (302 K)</b>,
    reason: <>Mark 2. Three significant figures — the report says this part was assessed for significant figures (1.63 × 10³ and 4.18 each have three). Plausible: 100 kg is a lot of water, so a small rise.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>Not all of the energy released is <b>transferred to the water</b>: some <b>heat is lost to the surroundings</b> (the atmosphere), and some heats the <b>tank material</b> and piping.</>,
    reason: <>Part c.i assumed 100% transfer. Any logical reason why <b>less than all</b> the energy reaches the water earns the mark; one clear reason is enough.</>,
  },
]

export default function ChemistryQ1_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (9 marks)</p>
        <p>
          Digesters use bacteria to convert organic waste into biogas, which contains mainly methane, CH₄.
          Biogas can be used as a source of energy.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Renewability"
        marks={1}
        statement={
          <>
            Both biogas and coal seam gas contain CH₄ as their main component.
            <br />
            Why is biogas considered a renewable energy source but coal seam gas is not?
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Both gases are mostly CH₄, so the difference cannot be the chemical — it is <b>where it comes
            from</b> and <b>how fast it is replaced</b>. &ldquo;Renewable&rdquo; means replaced by natural
            processes within a relatively short time. The one mark needs a <b>direct comparison of both</b>{' '}
            gases in terms of time; the report gave no mark to answers about only one of them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A comparison of <b>both</b>: biogas is <b>constantly replenished</b> (its production-and-use cycle is continuous), whereas coal seam gas is <b>used at a faster rate than it can be replenished</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p>
          A digester processed 1 kg of organic waste to produce 496.0 L of biogas at standard laboratory
          conditions (SLC). The biogas contained 60.0% CH₄.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Thermochemical Equation"
        marks={2}
        statement={<>Write the thermochemical equation for the complete combustion of CH₄ at SLC.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            A <b>thermochemical equation</b> is a balanced equation with states <i>plus</i> its ΔH. Two
            marks, two things: (1) the balanced equation with states, (2) a <b>negative</b> ΔH that matches
            the equation as written. &ldquo;At SLC&rdquo; is the trap the report names: at 25 °C water is a
            liquid, so H₂O(l), not H₂O(g).
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>correctly balanced</b> equation <b>with states</b>, including <b>H₂O(l)</b> at SLC: <Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" />.</> },
            { point: <>A molar enthalpy of combustion with a <b>negative sign</b> that <b>matches the equation written</b>: <b>ΔH = −890 kJ mol⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Energy Released"
        marks={3}
        statement={<>Calculate the amount of energy that could be produced by CH₄ from 1 kg of organic waste.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Chain: volume of biogas → mol of biogas (÷ 24.8) → mol of CH₄ (× 60.0%) → energy (× 890 kJ
            mol⁻¹). Three marks, one for each link. The trap the report describes: the &ldquo;1 kg of organic
            waste&rdquo; is not used in the calculation — it only tells you this is the biogas that 1 kg
            produced (496.0 L).
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>n(biogas) = 496.0 / 24.8 = 20.0 mol</b> (molar volume at SLC).</> },
            { point: <><b>n(CH₄) = 0.600 × 20.0 = 12.0 mol</b>.</> },
            { point: <><b>Energy = 12.0 mol × 890 kJ mol⁻¹ = 1.07 × 10⁴ kJ</b> (10 680 kJ or 10.7 MJ), <b>with unit</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">c.</p>
        <p>
          Biogas was combusted to release 1.63 × 10³ kJ of energy. This energy was used to heat 100 kg of
          water in a tank. The initial temperature of the water was 25.0 °C.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Calorimetry"
        marks={2}
        statement={<>What is the maximum temperature that the water in the tank could reach?</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Maximum&rdquo; means assume <b>every</b> joule goes into the water, so q = mcΔT with q =
            1.63 × 10³ kJ. Two marks: (1) ΔT, (2) the final temperature = 25.0 °C + ΔT. Get the units to
            match c (J and g, or kJ and kg), give the answer to <b>three significant figures</b> (the report
            assessed this), and don&rsquo;t bring in the density of water — the mass is already given.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>ΔT = 1.63 × 10³ / (4.18 × 100) = 3.90 °C</b> (from q = mcΔT with consistent units).</> },
            { point: <><b>T<sub>max</sub> = 25.0 + 3.90 = 28.9 °C</b> (or 302 K), to <b>three significant figures</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Energy Lost"
        marks={1}
        statement={<>State why this temperature may not be reached.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Part c.i assumed a perfect, 100% transfer of energy to the water. This part asks what makes a
            real heater fall short: one clear reason why <b>not all the energy reaches the water</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any logical reason involving <b>incomplete transfer of heat/energy to the water</b> — e.g. <b>heat lost to the atmosphere</b>, to the <b>tank material</b>, from the piping, or through faulty insulation.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
