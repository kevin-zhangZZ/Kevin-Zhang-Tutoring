// 2022 Chemistry Exam, Section B Question 2 (10 marks). Carbon capture and an acidic (PEM)
// electrolyser: pressure of captured CO₂ from the ideal gas equation, the direction of electron
// flow in the external wire, two functions of the membrane, the overall equation for the
// electrolysis of water, and moles of H₂ from Faraday's laws. Question text transcribed from the
// original paper; the electrolyser diagram is cropped from the original VCAA exam PDF, and the
// report's annotated diagram (part b.i) is cropped from the VCAA examination report. Mark
// allocations are from the VCAA examination report, which itemises the marks for a, b.i, b.ii
// and c.ii; the mark scheme for c.i is our reading. Worked solutions, "How to Think About It"
// notes and model answers are original. VCAA report only — numbers checked in Python.
// All content is on the current (2024–) study design (ideal gas equation, electrolytic cells,
// Faraday's laws). The paper cites no Data Book item; R = 8.31 J mol⁻¹ K⁻¹ and
// F = 96 500 C mol⁻¹ are unchanged in the 2026 Data Book, so no Data Book note is needed.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2022sa-q2b-electrolyser.png'
import reportCellSrc from './chem-2022sa-q2bi-report-diagram.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 34, 47],
  average: 1.3,
  comment: (
    <>
      One mark was awarded for the correct calculation of n(CO₂).
      <br />
      P = nRT/V
      <br />
      T = 273 + 28 = 301 K, V = 2.0 x 10⁴ L, R = 8.31 J K⁻¹ mol⁻¹
      <br />
      n(CO₂) = 5.17 x 10⁴ mol
      <br />
      The second mark was awarded for the correct calculation of pressure in kPa with three significant figures.
      <br />
      P = 5.17 x 10⁴ x 8.31 x 301 / 20 x 10³
      <br />
      = 12931.7727 x 10⁴ / 2 x 10⁴
      <br />
      = 6.47 x 10³ (kPa)
      <br />
      The most common mistake in the approach being taken occurred when students attempted to calculate the
      mass of CO₂.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [26, 28, 46],
  average: 1.2,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportCellSrc}
        alt="The electrolyser diagram with a red downward arrow drawn in the box, pointing along the wire towards the cathode — from the 2022 VCAA examination report"
        className="w-full max-w-[220px] mt-1 mb-2 bg-white"
      />
      One mark was awarded for the clear representation of a downward arrow located in the box required.
      <br />
      The second mark was awarded for justifying their response based on one of:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Electrons move / are pushed/forced towards the negative electrode/cathode.</li>
        <li>
          To produce the H₂ from H⁺ electrons are gained, hence electrons must move toward the cathode / 2H⁺ +
          2e⁻ → H₂ at the cathode.
        </li>
        <li>In all cells, the anode produces electrons and the cathode accepts electrons.</li>
        <li>In all cells, electrons flow from the anode to the cathode.</li>
      </ul>
      Inclusion of contradictory information such as (-) anode or (+) cathode resulted in failure to achieve
      this second mark.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [70, 24, 6],
  average: 0.4,
  comment: (
    <>
      One mark was awarded for the clear indication that the membrane allowed H⁺ ions / protons to pass
      through in order to complete the circuit.
      <br />
      The second mark was awarded for either of:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The membrane kept the O₂ gas and H₂ gas separated.</li>
        <li>The membrane prevented a spontaneous reaction between the products.</li>
      </ul>
      The most common incorrect response was that the membrane was being used to separate the reactants.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [49, 51],
  average: 0.5,
  comment: (
    <>
      <Chem eq="2H2O(l) -> 2H2(g)" /> + <Chem eq="O2(g)" />
      <br />
      (States were not assessed in this question.)
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [19, 12, 23, 46],
  average: 1.9,
  comment: (
    <>
      The first mark was awarded for the correct calculation of Q
      <br />
      Q = It
      <br />
      = 1625 x 75 x 60
      <br />
      = 7.31x10⁶ C (7,312,500 C)
      <br />
      The second mark was awarded for the correct calculation of n(e⁻)
      <br />
      n(e-) = Q/F
      <br />
      = 7.31x10⁶ / 96,500
      <br />
      = 75.78 mol
      <br />
      The third mark was awarded for the correct calculation of n(H₂)
      <br />
      n(H2) = n(e⁻)/2
      <br />
      = 75.78/2
      <br />
      = 37.9 mol
      <br />
      Consequential marks were awarded when students were able to show clear calculations.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>pV = nRT, so p = nRT / V</>,
    reason: <>The ideal gas equation links pressure, volume, amount and temperature of a gas. Rearrange for the pressure before substituting.</>,
  },
  {
    working: <>T = 28.0 + 273 = 301 K</>,
    reason: <>The gas equation always needs the temperature in <b>kelvin</b> (Data Book: 0 °C = 273 K). Using 28.0 °C directly is a common slip.</>,
  },
  {
    working: <>n(CO₂) = 5.17 × 10⁴ mol, V = 20 000.0 L</>,
    reason: (
      <>
        The amount is given directly in mol — there is <b>no need to find the mass of CO₂</b>. The report names working out the mass as the
        most common mistake. Keep V in <b>litres</b>: with R = 8.31 J mol⁻¹ K⁻¹ and V in L, the pressure comes out in <b>kPa</b> (1 J = 1 kPa L),
        which is the unit the question asks for.
      </>
    ),
  },
  { working: <>p = (5.17 × 10⁴ mol × 8.31 J mol⁻¹ K⁻¹ × 301 K) / 20 000.0 L</>, reason: <>R = 8.31 J mol⁻¹ K⁻¹ from the Data Book.</> },
  { working: <>p = 6465.88… kPa</> },
  {
    working: <b>p = 6.47 × 10³ kPa</b>,
    reason: (
      <>
        Three significant figures, set by 5.17 × 10⁴ mol and 8.31 (the report requires three). Sanity check: about 64 times atmospheric pressure
        (101.3 kPa) — plausible, because over 50 000 mol of gas (≈ 1.3 million L at SLC) has been squeezed into 20 000 L.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Arrow in the box points <b>downwards</b>, along the wire <b>towards the cathode</b>.</>,
    reason: <>Mark 1: the arrow. The box sits beside the left-hand wire, which runs from the power supply down to the cathode (left electrode), so &ldquo;towards the cathode&rdquo; means down.</>,
  },
  {
    working: (
      <>
        At the <b>cathode</b>, <b>reduction</b> occurs: H⁺ ions <b>gain electrons</b> to form H₂, <Chem eq="2H+(aq)" /> + <Chem eq="2e- -> H2(g)" />. So electrons are
        pushed by the power supply <b>from the anode to the cathode</b> (the <b>negative</b> electrode in electrolysis).
      </>
    ),
    reason: (
      <>
        Mark 2: the justification. Any one correct reason earns it: the cathode needs electrons for the reduction, electrons flow anode → cathode
        in every cell, or electrons are forced to the negative electrode. In an <b>electrolytic</b> cell the cathode is <b>negative</b> and the
        anode <b>positive</b> (the reverse of a galvanic cell). The report says writing &ldquo;(−) anode&rdquo; or &ldquo;(+) cathode&rdquo; anywhere
        in the answer lost this mark.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: (
      <>
        1. The membrane <b>allows H⁺ ions (protons) to pass through</b> from the anode side to the cathode side, <b>completing the circuit</b>{' '}
        (keeping each side electrically neutral).
      </>
    ),
    reason: (
      <>
        Mark 1. H⁺ is made at the anode (<Chem eq="2H2O(l) -> O2(g)" /> + <Chem eq="4H+(aq)" /> + <Chem eq="4e-" />) and used up at the cathode (
        <Chem eq="2H+(aq)" /> + <Chem eq="2e- -> H2(g)" />), so it must cross from right to left. Electrons travel through the wire; ions carry the charge
        through the cell.
      </>
    ),
  },
  {
    working: (
      <>
        2. The membrane <b>keeps the products, H₂ gas and O₂ gas, separated</b>, so they cannot mix and <b>react spontaneously</b>{' '}
        (an explosive mixture).
      </>
    ),
    reason: (
      <>
        Mark 2. Note it is the <b>products</b> that are kept apart. The report says the most common wrong answer was that the membrane separates
        the <b>reactants</b> — but the only reactant is water, so there is nothing to keep apart.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  { working: <>Cathode (reduction): <Chem eq="2H+(aq)" /> + <Chem eq="2e- -> H2(g)" />  (× 2)</>, reason: <>H₂ forms at the cathode, from H⁺ in the acidic electrolyte (as the diagram shows).</> },
  { working: <>Anode (oxidation): <Chem eq="2H2O(l) -> O2(g)" /> + <Chem eq="4H+(aq)" /> + <Chem eq="4e-" /></>, reason: <>O₂ forms at the anode, where water is the reactant fed in. Balance O, then H with H⁺, then charge with e⁻ (acidic conditions).</> },
  {
    working: <>4H⁺(aq) + 4e⁻ + 2H₂O(l) → 2H₂(g) + O₂(g) + 4H⁺(aq) + 4e⁻</>,
    reason: <>Multiply the cathode equation by 2 so both show 4 e⁻, add them, and cancel the electrons and the 4H⁺ that appear on both sides.</>,
  },
  {
    working: <b><Chem eq="2H2O(l) -> 2H2(g)" /> + <Chem eq="O2(g)" /></b>,
    reason: <>The overall reaction is just the splitting of water. At 80 °C water is still a <b>liquid</b> (it boils at 100 °C), hence H₂O(l). States were not assessed, but writing them is good habit.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  { working: <>t = 1.25 h × 60 min h⁻¹ × 60 s min⁻¹ = 4500 s</>, reason: <>The charge equation needs time in <b>seconds</b>.</> },
  { working: <>Q = I t</>, reason: <>Faraday&rsquo;s first law: charge = current × time.</> },
  { working: <>Q = 1625.0 A × 4500 s</> },
  { working: <>Q = 7 312 500 C = 7.3125 × 10⁶ C</>, reason: <>Mark 1: the charge.</> },
  { working: <>n(e⁻) = Q / F = 7 312 500 C / 96 500 C mol⁻¹</>, reason: <>F = 96 500 C mol⁻¹ (Data Book) is the charge on one mole of electrons.</> },
  { working: <>n(e⁻) = 75.777… mol</>, reason: <>Mark 2: the amount of electrons. Keep it unrounded. (The report writes 7.31 × 10⁶ / 96 500 = 75.78 mol; 75.78 actually comes from the unrounded charge 7 312 500 C — the rounded 7.31 × 10⁶ would give 75.75. Either way n(H₂) rounds to 37.9 mol.)</> },
  { working: <>n(H₂) = ½ × n(e⁻)</>, reason: <>Mole ratio from the cathode half-equation <Chem eq="2H+(aq)" /> + <Chem eq="2e- -> H2(g)" />: 2 mol e⁻ give 1 mol H₂.</> },
  { working: <>n(H₂) = ½ × 75.777… mol = 37.888… mol</> },
  {
    working: <b>n(H₂) = 37.9 mol</b>,
    reason: (
      <>
        Mark 3. Three significant figures, set by 1.25 h. Use the e⁻ : H₂ ratio from the <b>half-equation</b>, not the overall equation (which has
        no electrons in it). The report gives consequential marks for clear working, so show every line.
      </>
    ),
  },
]

export default function ChemistryQ2_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (10 marks)</p>
        <p>
          A coal-fired power station is used to generate electricity. Carbon dioxide, CO₂, gas is produced as part of
          the process.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Ideal Gas Equation"
        marks={2}
        statement={
          <>
            Carbon capture and storage is one option being considered to reduce the amount of CO₂ released into the
            atmosphere. 5.17 × 10⁴ mol of CO₂ is captured, cooled to 28.0 °C and stored in a sealed 20 000.0 L tank prior to
            transportation.
            <br />
            Calculate the pressure, in kilopascals, in the tank when it contains 5.17 × 10⁴ mol of CO₂.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A gas in a sealed tank with n, V and T given and p unknown is a straight <b>pV = nRT</b> question. Everything you
            need is in the stem — the amount is already in mol, so don&rsquo;t detour into the mass of CO₂ (the mistake the report
            names). Two marks: set up the equation with <b>T in kelvin</b> and the right values, then the <b>pressure in kPa to
            three significant figures</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct set-up of <b>p = nRT / V</b> with <b>n(CO₂) = 5.17 × 10⁴ mol</b>, <b>T = 301 K</b>, V = 2.0 × 10⁴ L and R = 8.31. (The report calls this mark &ldquo;the correct calculation of n(CO₂)&rdquo;.)</> },
            { point: <>Correct <b>p = 6.47 × 10³ kPa</b>, in kPa and to <b>three significant figures</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">
          Hydrogen, H₂, can be produced using electricity generated by renewable sources. A simplified diagram of an acidic
          electrolyser used to produce hydrogen is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="An acidic electrolyser: a power supply wired to a cathode (left) and an anode (right) separated by a membrane; an empty box sits on the wire above the cathode; H₂ leaves the cathode side, water enters and O₂ leaves the anode side — from the original 2022 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Electron Flow"
        marks={2}
        statement={
          <>
            Draw an arrow in the box provided on the diagram above to show the direction of flow of electrons through the
            wire. Justify your answer.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Two marks: one for the <b>arrow</b>, one for the <b>reason</b>. Work out which electrode needs electrons: H₂ is made from H⁺
            at the <b>cathode</b>, and making H₂ from H⁺ is a <b>reduction</b> (gain of electrons), so electrons must arrive there. In every
            cell electrons flow anode → cathode through the wire. The trap is polarity: in an <b>electrolytic</b> cell the cathode is{' '}
            <b>negative</b> — writing &ldquo;(+) cathode&rdquo; or &ldquo;(−) anode&rdquo; contradicts the answer and lost the mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A clear <b>downward arrow</b> drawn in the box (towards the <b>cathode</b>).</> },
            { point: <>A justification, e.g. <b>electrons flow from the anode to the cathode</b>, or the cathode <b>gains electrons</b> to reduce H⁺: <Chem eq="2H+" /> + <Chem eq="2e- -> H2" />, or electrons are forced to the <b>negative electrode/cathode</b>. No contradictory polarity ((−) anode, (+) cathode).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Membrane Function"
        marks={2}
        statement={<>State <b>two</b> functions of the membrane.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Think about what would go wrong without the membrane. Charge: H⁺ is made at the anode and consumed at the cathode,
            so ions must travel between them to <b>complete the circuit</b>. Products: H₂ and O₂ would mix and could react. Two marks,
            two separate functions. Only 6% got both — the report&rsquo;s common wrong answer was &ldquo;separates the <b>reactants</b>&rdquo;; the
            reactant is just water, it is the <b>products</b> that must be kept apart.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The membrane <b>allows H⁺ ions / protons to pass through</b> to <b>complete the circuit</b>.</> },
            { point: <>Either: it <b>keeps the O₂ and H₂ gases separated</b>, or it <b>prevents a spontaneous reaction between the products</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Overall Equation"
        marks={1}
        statement={
          <>
            Write the overall equation for the reaction that takes place in the acidic electrolyser shown in the diagram
            above when it is operating at 80 °C.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            The diagram tells you the inputs and outputs: water goes in, H₂ and O₂ come out. Write the two half-equations in
            acidic conditions, match the electrons and add — H⁺ and e⁻ cancel and you are left with the <b>decomposition of
            water</b>. &ldquo;Overall&rdquo; means no electrons in the final equation. The 80 °C tells you water is still a liquid.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The balanced overall equation <b><Chem eq="2H2O(l) -> 2H2(g)" /> + <Chem eq="O2(g)" /></b>, with <b>no electrons</b> (states were not assessed).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Faraday's Laws"
        marks={3}
        statement={
          <>
            How many moles of H₂ could be produced by the acidic electrolyser using 1625.0 A in 1.25 hours, assuming 100%
            efficiency?
          </>
        }
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            The standard Faraday chain: <b>charge → moles of electrons → moles of product</b>. Each arrow is one mark: Q = It (time in
            <b> seconds</b>), n(e⁻) = Q/F, then the <b>mole ratio from the cathode half-equation</b> (2 e⁻ per H₂). &ldquo;100% efficiency&rdquo;
            just means every electron goes into making H₂.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>Q = It = 1625 × 75 × 60 = 7.31 × 10⁶ C</b> (time converted to seconds).</> },
            { point: <>Correct <b>n(e⁻) = Q / F = 7 312 500 / 96 500 = 75.78 mol</b>.</> },
            { point: <>Correct <b>n(H₂) = n(e⁻) / 2 = 37.9 mol</b>, using the <b>2 e⁻ : 1 H₂</b> ratio.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
