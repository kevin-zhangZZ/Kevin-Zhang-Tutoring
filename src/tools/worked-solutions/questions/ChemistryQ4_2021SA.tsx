// 2021 Chemistry Exam, Section B Question 4 (9 marks). An ethanol fuel cell with an acidic
// electrolyte: what a fuel cell is, the ion that crosses the membrane and its direction, the
// anode half-equation, the electrical energy from 1.0 g of ethanol at 100% efficiency, electrode
// design features, and minimising environmental impact. Question text transcribed from the
// original paper; the fuel-cell diagram is cropped from the original VCAA exam PDF, and the arrow
// drawn in its box in part b.ii is an SVG overlay on the cropped figure (this site's annotation).
// Mark allocations are from the VCAA examination report (VCAA report only — no second source);
// the "How to Think About It" notes and model answers are original. Numbers checked in Python.
// Data Book: the 2021 paper used the 2017–2023 Data Book (ethanol 29.6 kJ g⁻¹, 1360 kJ mol⁻¹);
// the 2026 Data Book gives ethanol −1367 kJ mol⁻¹ (item 12) and bioethanol 29.7 kJ g⁻¹ (item 14).
// The answer, 30 kJ, is unchanged — a Data Book note in part d. says so. All parts are on the
// current study design (fuel cells, Unit 3 AOS 1). Report slips kept verbatim: part c.'s second
// equation ends "12e-" (not superscripted) and both equations give CO₂(aq); asterisks after some
// accepted responses are as printed.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2021sa-q4-fuel-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [23, 34, 43],
  average: 1.2,
  comment: (
    <>
      Two points were required:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Fuel cells are a type of galvanic cell or a cell that converts chemical energy into electrical energy.</li>
        <li>Fuel cells require a constant supply of reactants to be added.</li>
      </ul>
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [67, 33],
  average: 0.4,
  comment: (
    <>
      Accepted answers:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>hydrogen ions</li>
        <li>H⁺</li>
        <li>protons</li>
        <li>hydronium ions</li>
        <li>H₃O⁺.</li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      The arrow must clearly be shown pointing to the righthand side and inside the box as directed.
      <br />
      It is important that students follow the instructions in the stem of the question very clearly.
      Marks could not be awarded for arrows that appeared elsewhere on the diagram.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [76, 24],
  average: 0.3,
  comment: (
    <>
      Either of the following equations were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>C₂H₆O(l) + 3H₂O(l) → 2CO₂(aq) + 12H⁺(aq) + 12e⁻</li>
        <li>CH₃CH₂OH(l) + 3H₂O(l) → 2CO₂(aq) + 12H⁺(aq) + 12e-</li>
      </ul>
      States were not required for this question.
      <br />
      Equilibrium arrows could not be accepted as the stem of the question clearly indicates a single
      direction process is occurring.
      <br />
      Students should be able to write appropriate half-equations for the oxidation of alkanol fuels in
      fuel cells and not just depend on the electrochemical series provided for the examination.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [60, 40],
  average: 0.4,
  comment: (
    <>
      Energy = 1.0 x 29.6 = 30 kJ (29.6 kJ)
      <br />
      Correct units were required. Many students gave the correct numerical response but incorrect units.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [49, 37, 14],
  average: 0.7,
  comment: (
    <>
      Accepted responses:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Highly porous electrodes or have a high surface area.*</li>
        <li>Electrodes could either be a catalyst or incorporate a catalyst.*</li>
      </ul>
      Students should be aware of properties of electrodes that enhance efficiency of fuel cells.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [53, 47],
  average: 0.5,
  comment: (
    <>
      Any of the following responses were accepted.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Source the ethanol from a renewable/sustainable source, so the CO₂ released is balanced out.</li>
        <li>
          There is a net reduction in the greenhouse gas CO₂ emission when produced in a biologically sourced
          ethanol fuel cell operating at 100% efficiency.
        </li>
        <li>Obtain electrodes from renewable/sustainable source, reuse electrode materials.</li>
        <li>Manage end of life waste streams, in particular acidic electrolyte.</li>
        <li>Capturing CO₂ gas through CCS (carbon capture sequestration).</li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>A fuel cell is a type of <b>galvanic cell</b> that <b>converts chemical energy into electrical energy</b>.</>,
    reason: <>Mark 1: what a fuel cell <i>is</i> — like any galvanic cell, a spontaneous redox reaction drives electrons through an external circuit.</>,
  },
  {
    working: <>Unlike a primary cell, the reactants are <b>not stored in the cell</b>: the fuel and the oxidant must be <b>continuously supplied</b> from outside, and the cell keeps producing electricity as long as they are.</>,
    reason: <>Mark 2: what makes it a <i>fuel</i> cell rather than an ordinary battery — a <b>constant supply of reactants</b>. A battery runs flat when its stored reactants are used up; a fuel cell does not.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Anode (oxidation): ethanol is oxidised and <b>produces H⁺</b> ions.<br />Cathode (reduction): <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" /> <b>uses up H⁺</b>.</>,
    reason: <>In an acidic electrolyte, the anode reaction makes H⁺ (part c.) and the cathode reaction (Data Book, electrochemical series) consumes it. So H⁺ must move from one side to the other to keep both reactions going.</>,
  },
  {
    working: <b>Hydrogen ions, H⁺ (protons)</b>,
    reason: <>H₃O⁺ (hydronium ions) was also accepted. Not <b>electrons</b>: electrons travel through the <b>external circuit</b>, never through the electrolyte or membrane.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>H⁺ is produced at the <b>anode</b> (left) and consumed at the <b>cathode</b> (right), so H⁺ moves <b>from the anode to the cathode</b>.</>,
    reason: <>Cations in the electrolyte always move <b>towards the cathode</b>, where they are used up (or where they balance the negative charge building up as electrons arrive).</>,
  },
  {
    working: (
      <>
        <div className="relative w-fit bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-2">
          <div className="relative">
            <img
              loading="lazy"
              decoding="async"
              src={cellSrc}
              alt="The fuel-cell diagram with an arrow drawn inside the box on the membrane, pointing right from the anode towards the cathode"
              className="w-full max-w-[240px]"
            />
            <svg viewBox="0 0 604 663" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <marker id="chem2021q4-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="#dc2626" />
                </marker>
              </defs>
              <line x1="240" y1="388" x2="358" y2="388" stroke="#dc2626" strokeWidth="9" markerEnd="url(#chem2021q4-arrow)" />
            </svg>
          </div>
        </div>
        <b>Arrow inside the box, pointing to the right (anode → cathode).</b>
      </>
    ),
    reason: <>The arrow must be drawn <b>inside the box</b>, as the question directs — the report says arrows drawn elsewhere on the diagram could not be awarded the mark. (Red arrow: this site&rsquo;s annotation on the cropped VCAA diagram.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  { working: <><Chem eq="C2H5OH -> 2CO2" /></>, reason: <>Ethanol is the fuel, so it is <b>oxidised at the anode</b>, and the stem says the product is CO₂. Balance C first: 2 C → 2CO₂.</> },
  { working: <><Chem eq="C2H5OH + 3H2O -> 2CO2" /></>, reason: <>Balance O with water: the right has 4 O, ethanol has 1, so add 3H₂O to the left.</> },
  { working: <><Chem eq="C2H5OH + 3H2O -> 2CO2 + 12H+" /></>, reason: <>Balance H with H⁺ (acidic electrolyte): the left has 6 + 6 = 12 H, so 12H⁺ on the right.</> },
  { working: <><Chem eq="C2H5OH + 3H2O -> 2CO2 + 12H+ + 12e-" /></>, reason: <>Balance charge with electrons: the left is 0, the right is +12, so add 12e⁻ to the right. Electrons are <b>products</b> — the hallmark of an <b>oxidation</b>.</> },
  {
    working: <b><Chem eq="C2H5OH(l) + 3H2O(l) -> 2CO2(g) + 12H+(aq) + 12e-" /></b>,
    reason: <>Use a <b>single arrow →</b>, not ⇌: the report did not accept equilibrium arrows, because the reaction runs one way in an operating cell. Ethanol oxidation is <b>not</b> in the electrochemical series, so it has to be built step by step like this. States were not required (the report writes CO₂(aq); CO₂(g) is equally fine).</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>At 100% efficiency, electrical energy = energy released by the reaction</>,
    reason: <>Adding the anode reaction (×1) and the cathode reaction (×3) gives <Chem eq="C2H5OH + 3O2 -> 2CO2 + 3H2O" /> — the same overall reaction as the combustion of ethanol. At 100% efficiency <b>all</b> of that chemical energy becomes electrical energy, so the Data Book heat of combustion applies (at 25 °C, i.e. SLC).</>,
  },
  { working: <>E = m × heat of combustion</> },
  { working: <>E = 1.0 g × 29.7 kJ g⁻¹</>, reason: <>Data Book: heat of combustion of (bio)ethanol = 29.7 kJ g⁻¹. Or by moles: n = 1.0 g ÷ 46.0 g mol⁻¹ = 0.02173… mol, and 0.02173… mol × 1367 kJ mol⁻¹ = 29.7 kJ — the same.</> },
  {
    working: <b>E = 30 kJ</b>,
    reason: (
      <>
        Two significant figures, from 1.0 g. The <b>unit kJ</b> is part of the mark: the report says many students had the right number but incorrect units (not kJ g⁻¹ or kJ mol⁻¹ — this is an amount of energy).
        <DataBookNote>
          the 2021 exam was sat with the 2017–2023 Data Book, and the report used its heat of combustion of ethanol, 29.6 kJ g⁻¹
          (1360 kJ mol⁻¹). The 2026 Data Book gives bioethanol 29.7 kJ g⁻¹ (item 14) and ethanol
          −1367 kJ mol⁻¹ (item 12), so the unrounded answer becomes 29.7 kJ instead of 29.6 kJ. The
          answer to two significant figures, 30 kJ, is unchanged.
        </DataBookNote>
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>1. Make the electrodes <b>porous</b> so they have a <b>high surface area</b>, giving more contact between the reactants (including gases), the electrolyte and the electrode.</>,
    reason: <>Mark 1. More sites where the reaction can happen at once → a higher rate of reaction and more current from the same cell. The study design names porous electrodes for gaseous reactants specifically.</>,
  },
  {
    working: <>2. Make the electrodes from, or coat them with, a <b>catalyst</b> (e.g. platinum), which <b>increases the rate of the electrode reactions</b> by providing a pathway with lower activation energy.</>,
    reason: <>Mark 2. Two marks means two <b>different</b> design features — porous/high surface area and catalyst. Two versions of the same idea (e.g. &ldquo;porous&rdquo; and &ldquo;large surface area&rdquo;) cover only one of the report&rsquo;s accepted responses.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <>Use ethanol from a <b>renewable source</b> (<b>bioethanol</b>, made by fermenting plant material), so the <b>CO₂ released</b> by the cell is <b>balanced by the CO₂ absorbed</b> by the plants during photosynthesis.</>,
    reason: <>&ldquo;100% efficiency&rdquo; means energy is not the issue — the remaining environmental impact is the <b>CO₂ product</b> (a greenhouse gas) and where the fuel comes from. Any one accepted response earns the mark; others were reusing or sustainably sourcing electrode materials, managing the acidic electrolyte waste, or carbon capture and storage of the CO₂.</>,
  },
]

export default function ChemistryQ4_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (9 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Fuel Cells"
        marks={2}
        statement={<>What is a fuel cell?</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A definition worth two marks needs two ideas: what kind of thing a fuel cell <b>is</b> (a galvanic
            cell converting chemical energy to electrical energy) and what makes it <b>different</b> from
            other galvanic cells (the reactants are <b>supplied continuously</b> from outside). Only 43% of
            students scored both marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A type of <b>galvanic cell</b>, or a cell that <b>converts chemical energy into electrical energy</b>.</> },
            { point: <>Requires a <b>constant (continuous) supply of reactants</b> to be added.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The diagram below shows part of an ethanol fuel cell, which produces carbon dioxide and uses an
          acidic electrolyte.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="Part of a fuel cell: an anode on the left and a cathode on the right, separated by a membrane with an empty box drawn on it — from the original 2021 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Membrane Ions"
        marks={1}
        statement={<>Name the species that crosses the membrane to enable fuel cell operation.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Ask what the electrolyte is: it is <b>acidic</b>, so the ion carrying charge inside the cell is
            H⁺. Check by writing both electrode reactions — the anode makes H⁺ and the cathode uses it up, so
            H⁺ has to cross the membrane. Two-thirds of students scored zero here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Hydrogen ions / H⁺ / protons</b> (hydronium ions / H₃O⁺ also accepted).</> }]} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Ion Flow"
        marks={1}
        statement={<>In the box provided on the diagram above, indicate the direction of flow of the species named in <b>part b.i.</b></>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            H⁺ goes from where it is <b>made</b> (the anode, where ethanol is oxidised) to where it is{' '}
            <b>used</b> (the cathode, where O₂ is reduced). Then follow the instruction exactly: the arrow
            goes <b>inside the box</b> — the report gave no mark for arrows anywhere else.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme source="vcaa" points={[{ point: <>An arrow <b>inside the box</b>, clearly <b>pointing to the right-hand side</b> (anode → cathode).</> }]} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Anode Half-Equation"
        marks={1}
        statement={
          <>
            Write the equation for the reaction that occurs at the anode of an ethanol fuel cell, which
            produces carbon dioxide and uses an acidic electrolyte.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            The <b>anode</b> is where <b>oxidation</b> happens, and the fuel (ethanol) is what is oxidised — to
            CO₂, as the stem says. This half-equation is not in the electrochemical series, so build it in acid
            in order: balance C, then O with H₂O, then H with H⁺, then charge with e⁻. Only 24% scored the mark;
            the report says students should be able to write such half-equations and not just depend on the
            electrochemical series, and equilibrium arrows were not accepted.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>A <b>balanced</b> oxidation half-equation <Chem eq="C2H5OH + 3H2O -> 2CO2 + 12H+ + 12e-" /> with a <b>single (one-way) arrow</b>; states not required.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Energy from Fuel"
        marks={1}
        statement={
          <>
            If an ethanol fuel cell was operating at 25 °C and at 100% efficiency, how much electrical energy
            could be produced from 1.0 g of ethanol?
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            The overall fuel-cell reaction is the same as burning ethanol, and 100% efficiency means none of
            that energy is lost as heat. So the electrical energy is just the Data Book heat of combustion
            (kJ g⁻¹) × the mass. The trap the report names is the <b>unit</b>: the answer is an energy, in kJ.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Energy = 1.0 × 29.6 = 30 kJ</b> (29.6 kJ; 29.7 kJ with the 2026 Data Book), with the <b>correct unit, kJ</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Electrode Design"
        marks={2}
        statement={<>Identify <b>two</b> aspects of electrode design that can improve the efficiency of a fuel cell.</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            The question is about the <b>electrodes</b> only, not the electrolyte or the fuel. Think about what
            limits how fast the reactions happen at an electrode: how much surface the reactants can reach, and
            how high the activation energy is. That gives the two features — <b>porous / high surface area</b> and
            a <b>catalyst</b> — one mark each.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Highly porous</b> electrodes / a <b>high surface area</b>.</> },
            { point: <>Electrodes that are, or incorporate, a <b>catalyst</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="f"
        topic="Environmental Impact"
        marks={1}
        statement={
          <>
            State how the environmental impact of using an ethanol fuel cell operating at 100% efficiency can be
            minimised.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            The cell is already 100% efficient, so look at what it still does to the environment: it releases
            <b> CO₂</b>, a greenhouse gas, and it uses ethanol and electrode materials that come from somewhere.
            One specific, practical step earns the mark — the strongest is making the ethanol from a{' '}
            <b>renewable source</b> so its CO₂ is offset.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              point: (
                <>
                  Any one of: ethanol from a <b>renewable/sustainable source</b> so the <b>CO₂ released is balanced
                  out</b>; electrodes from a <b>renewable source / reused</b>; <b>managing end-of-life waste</b>{' '}
                  (the acidic electrolyte); <b>capturing the CO₂</b> (carbon capture and storage).
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
