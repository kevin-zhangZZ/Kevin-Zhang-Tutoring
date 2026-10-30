// 2020 Chemistry Exam, Section B Question 6 (8 marks). Methane as a fuel: the equation for
// incomplete combustion to CO, the pressure of 20.0 g of CH₄ in a 5.0 L container (pV = nRT),
// the percentage of a Bunsen burner's energy lost to the environment, and a comparison of the
// environmental impact of CH₄ from landfill and from natural gas. Question text transcribed from
// the original paper (no figures). Mark distributions, averages and comments are from the VCAA
// examination report (VCAA report only — no second source); the "How to Think About It" notes,
// model answers and mark schemes are original. Numbers checked in Python.
// Data Book: the 2020 Data Book gave methane's heat of combustion as 55.6 kJ g⁻¹; the 2026 Data
// Book instead gives its molar enthalpy of combustion, −890 kJ mol⁻¹ (item 12) —
// 890 ÷ 16.0 = 55.6 kJ g⁻¹, so the answer is unchanged (DataBookNote in part c). The 2020 Data
// Book's density of water (0.997 g mL⁻¹, mentioned in the report) is now 1.0 g mL⁻¹; part c needs
// no density because the water's mass is given.
// Report slip: part c's comment describes an "expected temperature … rise of 18.3 °C" but then
// calculates with 18.5; the correct expected rise is 18.4 °C (26.97 kJ ÷ (4.18 × 350.0)); 18.5 is
// what the rounded 27.0 kJ gives, and 18.3 matches nothing. Kept verbatim, explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      <Chem eq="2CH4(g) + 3O2(g) -> 2CO(g) + 4H2O(l)" /> or
      <br />
      <Chem eq="CH4(g) + 1.5O2(g) -> CO(g) + 2H2O(l)" />
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [16, 19, 64],
  average: 1.5,
  comment: (
    <>
      n(CH₄) = 20.0 / 16.0 = 1.25 mol *
      <br />
      Pressure(CH₄) = nRT / V = 1.25 x 8.31 x 298 / 5.0 = 6.2x10² kPa *
      <br />
      Units for pressure needed to be included to obtain full marks. In general students performed well
      on this question. One common mistake was not converting the temperature to Kelvin.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [20, 19, 17, 45],
  average: 1.9,
  comment: (
    <>
      Energy from CH₄ = 0.485 g x 55.6 kJ g⁻¹ = 27.0 kJ
      <br />
      Energy absorbed by water = 4.18 J g⁻¹ K⁻¹ x 350.0 x (32.3 – 20.0)
      <br />
      = 1.80x10⁴ J
      <br />
      = 18.0 kJ
      <br />
      Energy lost to environment = 27.0 – 18.0 = 9.0 kJ
      <br />
      % energy lost = (9.0 / 27.0) x 100 = 33.3 %
      <br />
      One mark was awarded for calculating the energy from CH₄.
      <br />
      One mark was awarded for calculating the energy absorbed by water.
      <br />
      One mark was awarded for working out the percentage of energy loss.
      <br />
      This question was generally handled well, although some students incorrectly converted the mass of
      water using the density value of 0.997 g ml⁻¹.
      <br />
      Students also used a wide variety of approaches such as calculating the expected temperature of the
      water rise of 18.3 °C and then producing the energy lost via (18.5 – 12.3) / 18.5 yielding the 34%
      energy loss. A number of students did not access the Data Booklet and so were unable to establish
      the energy generated from the methane.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [37, 44, 19],
  average: 0.8,
  comment: (
    <>
      <b>Similarity – methane from both sources</b>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Both produce atmospheric carbon dioxide through combustion.</li>
        <li>
          Methane from both sources contains small amounts of nitrogen and sulfur; combustion of natural gas
          leads to the formation of acidic oxides such as SOₓ and NOₓ.
        </li>
      </ul>
      <b>Difference – landfill versus natural gas</b>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Methane from landfill can be produced renewably, whereas methane from natural gas releases stored carbon.</li>
        <li>Methane from landfill is more carbon neutral, methane from natural gas increases atmospheric CO₂ levels.</li>
        <li>
          Obtaining methane from natural gas via fracking causes additional significant environmental damage,
          whereas when obtaining methane from a landfill the damage has already been done in the formation of
          the landfill.
        </li>
        <li>
          Landfill gases contain less methane and release more CO₂ (for the same amount of energy generated),
          natural gas contains more methane and releases comparatively less CO₂.
        </li>
        <li>
          Methane captured from landfill and used as a source on energy may have a positive impact as it is a
          more potent greenhouse gas than CO₂.
        </li>
        <li>CH₄ from landfill is more easily collected compared to fracking/sourcing methane from fossil fuels.</li>
      </ul>
      Two marks were awarded for any two valid comparison points.
      <br />
      Students often made two very good statements, but more frequently than not these did not compare the
      environmental impact between the two sources. The key word ‘compare’ in the question means that a
      direct comparison is required to obtain full marks.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <><Chem eq="CH4(g) + O2(g) -> CO(g) + H2O(l)" /></>,
    reason: (
      <>
        <b>Incomplete combustion</b> happens when there is not enough oxygen: the carbon ends up as{' '}
        <b>carbon monoxide, CO</b> (the question names it) instead of CO₂. The hydrogen still becomes water.
      </>
    ),
  },
  {
    working: <><Chem eq="CH4(g) + O2(g) -> CO(g) + 2H2O(l)" /></>,
    reason: <>Balance C first (1 C → 1 CO), then H (4 H → 2H₂O).</>,
  },
  {
    working: <><Chem eq="CH4(g) + 1.5O2(g) -> CO(g) + 2H2O(l)" /></>,
    reason: <>Balance O last: the right side has 1 (in CO) + 2 (in 2H₂O) = 3 O atoms, so 1.5O₂ on the left.</>,
  },
  {
    working: <b><Chem eq="2CH4(g) + 3O2(g) -> 2CO(g) + 4H2O(l)" /></b>,
    reason: (
      <>
        Doubling every coefficient removes the fraction; the report accepts either form. Include{' '}
        <b>states</b>: CH₄, O₂ and CO are gases; water is written H₂O(l), as in the report (H₂O(g) is also
        sensible in a hot flame). Check: 2 C, 8 H and 6 O on each side.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  { working: <>n(CH₄) = m / M</>, reason: <>pV = nRT needs the <b>amount in mol</b>, so convert the mass first. M(CH₄) = 12.0 + 4 × 1.0 = 16.0 g mol⁻¹ (Data Book).</> },
  { working: <>n(CH₄) = 20.0 g / 16.0 g mol⁻¹</> },
  { working: <>n(CH₄) = 1.25 mol</>, reason: <>Mark 1.</> },
  { working: <>T = 25 + 273 = 298 K</>, reason: <>The gas equation only works with <b>temperature in kelvin</b>. The report names leaving T as 25 °C as the common mistake.</> },
  {
    working: <>p = nRT / V</>,
    reason: (
      <>
        Rearranged <b>ideal gas equation</b> pV = nRT (Data Book). With R = 8.31 J mol⁻¹ K⁻¹ and V in{' '}
        <b>litres</b>, p comes out in <b>kPa</b> — no unit conversion needed.
      </>
    ),
  },
  { working: <>p = (1.25 mol × 8.31 J mol⁻¹ K⁻¹ × 298 K) / 5.0 L</> },
  { working: <>p = 619.09… kPa</> },
  {
    working: <b>p = 6.2 × 10² kPa</b>,
    reason: (
      <>
        Mark 2 — the report says the <b>unit</b> was needed for full marks. Two significant figures, set by
        the 5.0 L volume. Plausible: about six times atmospheric pressure (100 kPa) for a lot of gas in a
        small container.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Energy released by CH₄ = m × heat of combustion</>,
    reason: (
      <>
        The energy the Bunsen burner produces is the energy released by burning 0.485 g of methane — this has
        to come from the <b>Data Book</b> (the report notes some students never looked it up).
        <DataBookNote>
          the 2020 Data Book listed methane&rsquo;s heat of combustion as 55.6 kJ g⁻¹. The 2026 Data Book
          gives its molar enthalpy of combustion instead, −890 kJ mol⁻¹ (item 12), so today you would write
          n(CH₄) = 0.485 ÷ 16.0 = 0.03031… mol and E = 0.03031… × 890 = 26.98 kJ (890 ÷ 16.0 = 55.6 kJ g⁻¹).
          The final answer, 33.3%, is unchanged. Don&rsquo;t use the &ldquo;natural gas&rdquo; value in
          item 13 — the fuel here is pure CH₄.
        </DataBookNote>
      </>
    ),
  },
  { working: <>Energy released = 0.485 g × 55.6 kJ g⁻¹</> },
  { working: <><b>Energy released by CH₄ = 26.97 kJ</b> (27.0 kJ)</>, reason: <>Mark 1: energy from CH₄. Keep 26.966 kJ unrounded for the next steps.</> },
  { working: <>ΔT = 32.3 − 20 = 12.3 °C</>, reason: <>Temperature change = final − initial. A change of 12.3 °C is the same as 12.3 K.</> },
  {
    working: <>q = m c ΔT</>,
    reason: (
      <>
        The <b>energy absorbed by the water</b>: m is the mass of <b>water</b>, c = 4.18 J g⁻¹ K⁻¹ (Data
        Book). The mass is already in grams, so no density is needed — the report notes some students wrongly
        &ldquo;converted&rdquo; it with the density 0.997.
      </>
    ),
  },
  { working: <>q = 350.0 g × 4.18 J g⁻¹ K⁻¹ × 12.3 K</> },
  { working: <><b>q = 1.80 × 10⁴ J = 18.0 kJ</b></>, reason: <>Mark 2: energy absorbed by water. Convert to kJ so it can be compared with the 26.97 kJ released.</> },
  {
    working: <>Energy lost = energy released − energy absorbed = 26.97 kJ − 18.0 kJ = 8.97 kJ</>,
    reason: <>Whatever the methane released that did <b>not</b> end up in the water was <b>lost to the environment</b> (heating the beaker, the air, the burner).</>,
  },
  { working: <>% lost = (energy lost / energy released) × 100%</>, reason: <>The percentage is out of the <b>total energy released</b> by the fuel, not out of the energy absorbed.</> },
  { working: <>% lost = (8.97 kJ / 26.97 kJ) × 100%</> },
  {
    working: <b>% energy lost = 33.3%</b>,
    reason: (
      <>
        Mark 3 (33.27…% unrounded). Three significant figures, from 0.485 g and 12.3 °C. Check: the
        efficiency is 18.0 ÷ 27.0 = 66.7%, and 100 − 66.7 = 33.3%. The report also mentions a temperature
        route: the rise <i>expected</i> if no heat were lost is 26 966 J ÷ (4.18 J g⁻¹ K⁻¹ × 350.0 g) =
        18.4 °C, and (18.4 − 12.3) ÷ 18.4 × 100 = 33%. The report&rsquo;s numbers there don&rsquo;t quite
        match: &ldquo;18.3 °C&rdquo; is a slip (no rounding of the energy gives it), and its
        &ldquo;18.5&rdquo; comes from using the rounded 27.0 kJ (27 000 ÷ 1463 = 18.46), which is why it
        ends up at (18.5 − 12.3) ÷ 18.5 = 33.5% ≈ 34%. Rounding early shifts the answer — keep the
        unrounded values and you get 33%, the same as the energy route.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <>
        Methane from landfill is a <b>biogas</b> made by the breakdown of recently living waste, so it is{' '}
        <b>renewable</b> and close to <b>carbon neutral</b> (the CO₂ released on burning was recently absorbed
        by plants), <b>whereas</b> methane from natural gas is a <b>fossil fuel</b> that releases{' '}
        <b>stored carbon</b> and so <b>increases atmospheric CO₂</b> levels.
      </>
    ),
    reason: (
      <>
        Comparison 1: renewability and net CO₂. The word <b>whereas</b> makes it a direct comparison of the
        two sources — the report says that, more frequently than not, students’ statements did not compare the environmental impact between the two sources.
      </>
    ),
  },
  {
    working: (
      <>
        Landfill methane would escape into the atmosphere anyway, and CH₄ is a <b>more potent greenhouse
        gas than CO₂</b>, so capturing and burning it <b>reduces the greenhouse effect</b>; <b>whereas</b>{' '}
        extracting natural gas (e.g. by <b>fracking</b>) causes <b>additional environmental damage</b> and
        adds CO₂ that would otherwise have stayed underground.
      </>
    ),
    reason: (
      <>
        Comparison 2: a second, separate idea, again stated for <b>both</b> sources. Any two of the
        report&rsquo;s listed differences would do.
      </>
    ),
  },
]

export default function ChemistryQ6_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (8 marks)</p>
        <p>
          Methane gas, CH₄, can be captured from the breakdown of waste in landfills. CH₄ is also a primary
          component of natural gas. CH₄ can be used to produce energy through combustion.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Incomplete Combustion"
        marks={1}
        statement={<>Write the equation for the incomplete combustion of CH₄ to produce carbon monoxide, CO.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            One mark for one correct equation. <b>Incomplete</b> combustion means limited oxygen, so the carbon
            goes to CO (not CO₂) while the hydrogen still forms water. Write the products, then balance C, H and
            finally O — a fractional coefficient (1.5O₂) is fine, or double everything.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A <b>balanced</b> equation with <b>CO</b> (not CO₂) and <b>H₂O</b> as products, with states: <Chem eq="2CH4(g) + 3O2(g) -> 2CO(g) + 4H2O(l)" /> (or with 1.5O₂).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Ideal Gas Equation"
        marks={2}
        statement={
          <>
            If 20.0 g of CH₄ is kept in a 5.0 L sealed container at 25 °C, what would be the pressure in the
            container?
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Pressure, volume, temperature and an amount of gas together point to the <b>ideal gas equation</b>,
            pV = nRT. Two marks, two steps: mass → mol, then substitute into p = nRT/V. The traps the report
            names are leaving the temperature in °C (it must be <b>298 K</b>) and leaving off the{' '}
            <b>unit (kPa)</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Correct <b>n(CH₄) = 20.0 / 16.0 = 1.25 mol</b>.</> },
            { point: <>Correct <b>p = nRT / V = 1.25 × 8.31 × 298 / 5.0 = 6.2 × 10² kPa</b>, with <b>T in kelvin</b> and the <b>unit kPa</b> (required for full marks).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Energy Lost"
        marks={3}
        statement={
          <>
            A Bunsen burner is used to heat a beaker containing 350.0 g of water. Complete combustion of 0.485 g
            of CH₄ raises the temperature of the water from 20 °C to 32.3 °C.
            <br />
            Calculate the percentage of the Bunsen burner&rsquo;s energy that is lost to the environment.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Compare the energy <b>released by the fuel</b> (Data Book heat of combustion × mass) with the energy{' '}
            <b>absorbed by the water</b> (q = mcΔT). The difference is what was lost, expressed as a percentage
            of the energy released. The three marks are those three calculations; the report notes that some
            students did not access the Data Book and so were unable to establish the energy generated from the methane.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>energy from CH₄ = 0.485 g × 55.6 kJ g⁻¹ = 27.0 kJ</b>.</> },
            { point: <>Correct <b>energy absorbed by water = mcΔT = 4.18 × 350.0 × 12.3 = 1.80 × 10⁴ J = 18.0 kJ</b>.</> },
            { point: <>Correct <b>percentage energy lost = (27.0 − 18.0) / 27.0 × 100 = 33.3%</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Biogas vs Natural Gas"
        marks={2}
        statement={
          <>
            Compare the environmental impact of CH₄ obtained from landfill to the environmental impact of CH₄
            obtained from natural gas.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            The molecule is identical — CH₄ burns the same way from either source — so the comparison is about
            where the carbon comes from and what obtaining it does. <b>Compare</b> means every sentence must
            say something about <b>both</b> sources (use &ldquo;whereas&rdquo;). Two marks means two separate
            comparison points. The report&rsquo;s main complaint: good statements that did not compare the two.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A first <b>valid comparison</b> of both sources, e.g. landfill CH₄ is <b>renewable / more carbon neutral</b>, <b>whereas</b> natural gas releases <b>stored (fossil) carbon</b> and <b>increases atmospheric CO₂</b>.</> },
            { point: <>A second <b>valid comparison</b>, e.g. capturing landfill CH₄ stops a <b>more potent greenhouse gas than CO₂</b> escaping, <b>whereas</b> extracting natural gas (<b>fracking</b>) causes <b>additional environmental damage</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
