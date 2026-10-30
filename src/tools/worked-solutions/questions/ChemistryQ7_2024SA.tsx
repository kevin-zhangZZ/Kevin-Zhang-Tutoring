// 2024 Chemistry Exam, Section B Question 7 (12 marks). Electrolysis and electrochemical cells:
// electrolysis of 1 M NaNO₃(aq) between an Fe anode and a Pt cathode (which electrode is the anode,
// the half-equation at Pt, why nothing happens with the power off), recharging a lithium-ion cell
// (polarity of Electrode X, mass of LiC₆ from Faraday's laws) and acidic artificial photosynthesis
// (energy transformation, direction of electron flow, charge balance). Question text transcribed
// from the original paper (page images — the 2024 PDF has no extractable text); the artificial
// photosynthesis diagram is cropped from the original VCAA exam PDF, and the arrow drawn on it in
// part c.ii is an SVG overlay on the cropped figure (this site's own annotation). Mark allocations
// are from the VCAA examination report, which itemises the marks for b.ii and lists the accepted
// responses for a.iii and c.iii; the other splits are our reading. VCAA report only — the "How to
// Think About It" notes and model answers are original. Numbers checked in Python against the 2026
// Data Book. The paper's "item 1" (electrochemical series) is item 2 in the 2026 Data Book; the E°
// values used here (Fe²⁺/Fe −0.44 V, H₂O/H₂ −0.83 V, Na⁺/Na −2.71 V, O₂/H₂O +1.23 V) are unchanged.

import { Fragment } from 'react'
import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import photoSrc from './chem-2024sa-q7c-photosynthesis.png'

// Chem superscripts a lone "+" even between species (" + "), so each species is rendered on its
// own and the plus signs between them stay full-size.
function Eq({ eq }: { eq: string }) {
  return (
    <>
      {eq.split(' + ').map((p, i) => (
        <Fragment key={i}>
          {i > 0 && ' + '}
          <Chem eq={p} />
        </Fragment>
      ))}
    </>
  )
}

const EXAM_AI: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>The anode is the iron (Fe) electrode.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [75, 25],
  average: 0.3,
  comment: (
    <>
      <Eq eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" />
      <br />
      This question was assessed for the use of states.
      <br />
      Students need to be aware that for reactions that occur during a specific redox process, the
      single-headed arrow &lsquo;→&rsquo; is required.
      <br />
      A significant number of students responded to this question by writing an equation based on either
      iron or platinum reacting. It is recommended that students sketch out a diagram of the cell to assist
      them to understand the processes occurring at each electrode.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      Any of the following were valid responses:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          One of the products of the reaction is hydrogen gas, which does not stay in contact with the
          electrode and therefore is not available to react spontaneously.
        </li>
        <li>
          Iron(II) hydroxide would form and may not remain in contact with the electrode, and therefore is
          not available to react spontaneously.
        </li>
        <li>There are no oxidants/reductants present that are strong enough to react spontaneously with a reductant/oxidant.</li>
      </ul>
      Students needed to provide a specific response – statements such as &lsquo;this is a non-spontaneous
      process&rsquo; do not demonstrate the required understanding of chemical processes.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [31, 69],
  average: 0.7,
  comment: <>Electrode X is positive during recharging.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [15, 3, 4, 18, 60],
  average: 3.1,
  comment: (
    <>
      The first mark was awarded for the correct calculation of charge.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Q = 1.25 × 1 × 60 × 60 = 4500 C</li>
      </ul>
      The second mark was awarded for the correct n(e).
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>n(e) = 4500 / 96 500 = 0.04663 mol</li>
      </ul>
      The third mark was awarded for the correct n(LiC₆).
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>From equation stoichiometry, n(LiC₆) = n(e) = 0.04663 mol</li>
      </ul>
      The fourth mark was awarded for the correct m(LiC₆), with units.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>m(LiC₆) = 78.9 × 0.04663 = 3.68 g</li>
      </ul>
      In general, this question was answered extremely well.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [67, 33],
  average: 0.4,
  comment: <>Electromagnetic / light energy / sunlight to chemical energy</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      <span className="inline-block" aria-label="an arrow pointing to the right">⟶</span>
      <br />
      The arrow needed to be drawn in the box provided, and be pointing to the right.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [68, 25, 7],
  average: 0.4,
  comment: (
    <>
      Any two of the following were valid responses:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Electrons are continually generated at the anode and used up at the cathode, hence maintaining the charge balance.</li>
        <li>
          H⁺ ions are continually generated at the anode and flow to the cathode where they are removed, hence
          maintaining the charge balance.
        </li>
        <li>The flow of electrons to the cathode is balanced by the flow of protons to the cathode.</li>
        <li>Ions flow through the system to balance the charge.</li>
      </ul>
      Some students attempted to show a balance by using hydroxide ions, but this was not accepted due to the
      clear information in the question that the reaction was occurring under acidic conditions.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>Fe is connected to the <b>positive terminal</b> of the power supply.</>,
    reason: <>In an <b>electrolytic</b> cell the power supply pulls electrons <i>out</i> of the electrode on its positive terminal, so <b>oxidation</b> happens there — and the electrode where oxidation happens is the anode (&ldquo;An Ox&rdquo;).</>,
  },
  {
    working: <b>The iron (Fe) electrode is the anode.</b>,
    reason: <>In electrolysis the anode is <b>positive</b>; in a galvanic cell it is negative. The rule that never changes is &ldquo;anode = oxidation&rdquo;.</>,
  },
  {
    working: <>(What happens there: <Eq eq="Fe(s) -> Fe2+(aq) + 2e-" />)</>,
    reason: <>Not needed for the mark, but it helps with a.iii. Iron is not inert: of the reductants at this electrode, Fe (Fe²⁺/Fe, −0.44 V) sits lower in the electrochemical series than H₂O (O₂/H₂O, +0.40 V in neutral solution), so Fe is the stronger reductant and is oxidised itself.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>Pt is on the negative terminal → Pt is the <b>cathode</b> → <b>reduction</b> occurs there.</>,
    reason: <>Pt is an <b>inert</b> electrode — it never reacts itself. It only supplies electrons to whatever is the strongest oxidant in the solution. This is the trap the report describes: many students wrote an equation in which iron or platinum reacted at this electrode.</>,
  },
  {
    working: (
      <>
        Oxidants present: H₂O (E° = −0.83 V), Na⁺ (E° = −2.71 V)
        <br />
        Strongest oxidant = <b>H₂O</b> (highest E°)
      </>
    ),
    reason: (
      <>
        The solution holds Na⁺(aq), NO₃⁻(aq) and H₂O(l). NO₃⁻ is not in the electrochemical series, so of the oxidants that are, water is the strongest — it is reduced in preference to Na⁺. The solution is neutral (NaNO₃), so use the H₂O half-equation, not the H⁺ one.
        <DataBookNote>the paper&rsquo;s &ldquo;item 1&rdquo; (electrochemical series) is item 2 in the 2026 Data Book; the values used in this question (−0.83 V, −2.71 V, −0.44 V, +0.40 V, +1.23 V) are unchanged.</DataBookNote>
      </>
    ),
  },
  {
    working: <b><Eq eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" /></b>,
    reason: <>Copy the H₂O/H₂ line from the Data Book as a reduction, with a <b>single-headed arrow</b> (→, not ⇌) because this reaction is actually happening in one direction, and with <b>states</b> on every species — the report says the mark was assessed for states.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <>With the power off, the beaker holds Fe(s), Pt(s), H₂O(l), Na⁺(aq) and NO₃⁻(aq).</>,
    reason: <>A reaction can only happen on its own (spontaneously) if an oxidant is <b>higher</b> in the electrochemical series than a reductant it is in contact with. So list what is present and compare.</>,
  },
  {
    working: (
      <>
        Strongest reductant: Fe (Fe²⁺/Fe, E° = −0.44 V)
        <br />
        Strongest oxidant: H₂O (H₂O/H₂, E° = −0.83 V)
      </>
    ),
    reason: <>Pt is inert, and Na⁺ (−2.71 V) is an even weaker oxidant than water.</>,
  },
  {
    working: (
      <b>
        There is no oxidant present strong enough to react spontaneously with the Fe: the strongest
        oxidant, H₂O (−0.83 V), is lower in the electrochemical series than Fe (−0.44 V).
      </b>
    ),
    reason: <>This is the report&rsquo;s third valid response. The mark needs this <b>specific</b> chemical reason — the report says &ldquo;this is a non-spontaneous process&rdquo; on its own did not earn the mark (94% of students scored 0 here). (Like the report, this ignores any O₂ dissolved from the air — in reality that would slowly corrode the iron, but the question only considers the species listed.)</>,
  },
  {
    working: <>(Also accepted: the <b>products</b> of the electrolysis do not stay in contact with the electrodes — the <b>H₂ gas bubbles away</b>, and the Fe²⁺ forms <b>iron(II) hydroxide</b> — so they are not available to react spontaneously.)</>,
    reason: <>Why this works: Fe²⁺ (−0.44 V) is a stronger oxidant than H₂O/H₂ (−0.83 V), so the products H₂ and Fe²⁺ <i>could</i> react back spontaneously, like a galvanic cell — but only if they stayed at the electrodes. The OH⁻ made at the cathode meets Fe²⁺ and precipitates Fe(OH)₂.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <><Eq eq="LiCoO2 -> CoO2 + Li+ + e-" />: Electrode X <b>loses electrons</b> → <b>oxidation</b> → X is the <b>anode</b> during recharging.</>,
    reason: <>Look at which side the electrons are on: e⁻ as a product means oxidation. (Electrode Y gains electrons, so it is the cathode.)</>,
  },
  {
    working: <><b>Electrode X is positive</b> during recharging.</>,
    reason: <>Recharging means the cell is being driven as an <b>electrolytic</b> cell, and in an electrolytic cell the anode is connected to the <b>positive</b> terminal of the charger. (X is the cathode when the cell discharges — and still positive. A rechargeable cell&rsquo;s polarity stays the same; only the anode/cathode labels swap.)</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  { working: <>Q = I t</>, reason: <>Mark 1: the charge. Time must be in <b>seconds</b>: 1.00 h = 60 × 60 = 3600 s.</> },
  { working: <>Q = 1.25 A × 3600 s</> },
  { working: <>Q = 4500 C</> },
  { working: <>n(e⁻) = Q / F</>, reason: <>Mark 2: the amount of electrons. F = 96 500 C mol⁻¹ (Data Book) is the charge on one mole of electrons.</> },
  { working: <>n(e⁻) = 4500 C / 96 500 C mol⁻¹</> },
  { working: <>n(e⁻) = 0.046 63… mol</>, reason: <>Keep this unrounded for the next steps.</> },
  {
    working: <><Eq eq="6C + Li+ + e- -> LiC6" /> &nbsp;so&nbsp; n(LiC₆) = n(e⁻) = 0.046 63… mol</>,
    reason: <>Mark 3: the <b>mole ratio</b> from the Electrode Y half-equation — 1 mol e⁻ : 1 mol LiC₆. LiC₆ forms at Y, so use Y&rsquo;s equation, not X&rsquo;s.</>,
  },
  { working: <>M(LiC₆) = 6.9 + 6 × 12.0 = 78.9 g mol⁻¹</>, reason: <>Molar masses from the periodic table in the Data Book.</> },
  { working: <>m(LiC₆) = n × M = 0.046 63… mol × 78.9 g mol⁻¹</>, reason: <>Mark 4: the mass, with units.</> },
  {
    working: <b>m(LiC₆) = 3.68 g</b>,
    reason: <>(3.679… g unrounded.) Three significant figures, from 1.25 A and 1.00 h. The stem gives no unit, so you must write <b>g</b> — the report&rsquo;s general advice notes that &ldquo;3.68&rdquo; without grams was not awarded full marks.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <><b>Light (solar / electromagnetic) energy → chemical energy</b></>,
    reason: <>&ldquo;Overall&rdquo; means start to finish: the energy coming in is the <b>light</b> shown in the diagram, and it ends up stored in the <b>chemical bonds</b> of the H₂ fuel (and O₂). Don&rsquo;t stop at &ldquo;electrical energy&rdquo; — the electron flow is only an in-between step, not the final form.</>,
  },
]

const ARROW_OVERLAY = (
  <div className="relative w-full max-w-[460px]">
    <img
      loading="lazy"
      decoding="async"
      src={photoSrc}
      alt="The artificial photosynthesis diagram with a right-pointing arrow drawn in the direction-of-electron-flow box"
      className="w-full"
    />
    <svg viewBox="0 0 1801 696" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <line x1="705" y1="568" x2="1040" y2="568" stroke="#be123c" strokeWidth="9" />
      <polygon points="1075,568 1030,545 1030,591" fill="#be123c" />
    </svg>
  </div>
)

const ROWS_CII: WorkingRow[] = [
  {
    working: (
      <>
        Left side (H₂O in, products out): <b>oxidation</b> → <b>anode</b>
        <br />
        <Eq eq="2H2O(l) -> O2(g) + 4H+(aq) + 4e-" />
      </>
    ),
    reason: <>Water enters on the left and is split. In <b>acidic</b> conditions use the O₂/H₂O line with H⁺ (+1.23 V), reversed. The &ldquo;products&rdquo; leaving on the left are O₂ and H⁺.</>,
  },
  {
    working: (
      <>
        Right side (reactants in, H₂ out): <b>reduction</b> → <b>cathode</b>
        <br />
        <Eq eq="2H+(aq) + 2e- -> H2(g)" />
      </>
    ),
    reason: <>H₂ is made on the right, so H⁺ is reduced there — the &ldquo;reactants&rdquo; arriving on the right are H⁺ ions.</>,
  },
  {
    working: <>Electrons flow from the anode to the cathode: <b>left → right</b>.</>,
    reason: <>Electrons are released by the oxidation (left) and used by the reduction (right), so they must travel from left to right.</>,
  },
  {
    working: ARROW_OVERLAY,
    reason: <>The answer is an arrow drawn <b>in the box</b> and <b>pointing to the right</b>. The report says the arrow had to be in the box provided, and its general advice warns that a response placed in another location may not be identified and cannot be assessed.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <>Electrons are <b>continually generated at the anode</b> (oxidation of water) and <b>used up at the cathode</b> (reduction of H⁺) at the same rate, so no charge builds up at either electrode.</>,
    reason: <>Mark 1: what happens to the <b>electrons</b>. Every electron that leaves the anode is consumed at the cathode.</>,
  },
  {
    working: <><b>H⁺ ions</b> are <b>continually generated at the anode</b> and <b>flow through the electrolyte to the cathode</b>, where they are removed — this flow of positive ions to the cathode balances the flow of electrons to the cathode.</>,
    reason: <>Mark 2: what the <b>ions</b> do. Negative charge (electrons) moves left → right through the circuit, and positive charge (H⁺, protons) moves left → right through the solution, so both sides stay neutral. Use <b>H⁺</b>, not OH⁻ — the report did not accept hydroxide ions because the process is <b>acidic</b>.</>,
  },
]

export default function ChemistryQ7_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (12 marks)</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">a.</p>
        <p className="mb-2">
          Svante adds a 1 M solution of sodium nitrate, NaNO₃(aq), to a beaker. An electric current from a 3 V
          power supply is then passed between an iron, Fe(s), electrode and a platinum, Pt(s), electrode placed
          into the solution.
        </p>
        <p className="mb-2">
          The positive terminal of the power supply is attached to the Fe electrode and the negative terminal of
          the power supply is attached to the Pt electrode.
        </p>
        <p>
          Refer to <b>item 1</b> of the Data Book.
        </p>
      </div>

      <PartCard letter="a.i" topic="Anode" marks={1} statement={<>State which metal electrode is the anode.</>} examinerReport={EXAM_AI}>
        <Background title="How to Think About It">
          <p>
            This is an <b>electrolytic</b> cell (a power supply drives it), so decide the anode from the
            terminals, not from the metals&rsquo; positions in the electrochemical series. The anode is where
            <b> oxidation</b> happens, and in electrolysis that is the electrode on the <b>positive</b> terminal.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme source="ours" points={[{ point: <>The <b>iron (Fe) electrode</b> is the anode.</> }]} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Electrolysis Half-Equation"
        marks={1}
        statement={<>Write the half-equation for the reaction that occurs at the Pt electrode when the power supply is turned on.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Sketch the cell: Pt is on the negative terminal, so it is the <b>cathode</b> and something is
            <b> reduced</b> there. Platinum is inert, so the question is really &ldquo;what is the strongest
            oxidant in a solution of NaNO₃?&rdquo; — find it in the electrochemical series. The report says many
            students wrote an equation with iron or platinum reacting, and that the mark needed correct
            <b> states</b> and a single-headed arrow.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b><Eq eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" /></b> — water reduced, with <b>states</b> on every species and a <b>single-headed arrow</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Spontaneous Reactions"
        marks={1}
        statement={<>State why no reaction occurs when the power supply is turned off.</>}
        examinerReport={EXAM_AIII}
      >
        <Background title="How to Think About It">
          <p>
            Only 6% scored this mark. &ldquo;Because it is non-spontaneous&rdquo; just repeats the question — the
            report wants the <b>chemical reason</b> it is non-spontaneous. Use the electrochemical series: is
            there an oxidant <b>higher</b> than a reductant in the beaker? (Or: are the electrolysis products
            still there to react back?) One mark, one specific reason.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              point: (
                <>
                  Any one specific reason: <b>no oxidant present is strong enough</b> to react spontaneously with
                  a reductant (H₂O, −0.83 V, is <b>below</b> Fe, −0.44 V); or the product <b>H₂ gas</b> does not
                  stay in contact with the electrode; or the <b>iron(II) hydroxide</b> formed does not stay in
                  contact with the electrode. &ldquo;It is non-spontaneous&rdquo; alone was not accepted.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">b.</p>
        <p className="mb-2">
          Lithium-ion cells are used in many electronic products. When the cell is recharging, the following
          reactions occur at the electrodes.
        </p>
        <p className="pl-6 mb-1">
          Electrode X: <Eq eq="LiCoO2 -> CoO2 + Li+ + e-" />
        </p>
        <p className="pl-6">
          Electrode Y: <Eq eq="6C + Li+ + e- -> LiC6" />
        </p>
      </div>

      <PartCard letter="b.i" topic="Electrode Polarity" marks={1} statement={<>State the polarity of Electrode X during recharging.</>} examinerReport={EXAM_BI}>
        <Background title="How to Think About It">
          <p>
            &ldquo;Polarity&rdquo; means <b>positive or negative</b> — not anode or cathode. Two steps: decide
            whether X is oxidised or reduced (where are the electrons in its equation?), then remember that
            recharging is <b>electrolysis</b>, where the anode is positive.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="ours" points={[{ point: <>Electrode X is <b>positive</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Faraday's Laws"
        marks={4}
        statement={<>Calculate the mass of LiC₆ produced when the cell is recharged using a current of 1.25 A for 1.00 hour.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            The standard Faraday chain, one mark per link: <b>charge</b> (Q = It, time in seconds) →
            <b> mol of electrons</b> (n = Q/F) → <b>mol of LiC₆</b> (mole ratio from Electrode Y&rsquo;s
            half-equation) → <b>mass</b> (m = nM, with the unit g).
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>charge: Q = It = 1.25 × 1 × 60 × 60 = 4500 C</b>.</> },
            { point: <>Correct <b>n(e⁻) = Q / F = 4500 / 96 500 = 0.04663 mol</b>.</> },
            { point: <>Correct <b>n(LiC₆) = n(e⁻) = 0.04663 mol</b> (1 : 1 from the Electrode Y equation).</> },
            { point: <>Correct <b>m(LiC₆) = 78.9 × 0.04663 = 3.68 g</b>, <b>with units</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">c.</p>
        <p className="mb-3">
          Artificial photosynthesis can be used to produce hydrogen from water in acidic conditions. A simplified
          diagram of the acidic artificial photosynthesis process is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={photoSrc}
            alt="A rectangle with light shining down on it; H₂O(l) enters on the left and products leave on the left, reactants enter on the right and H₂(g) leaves on the right; below is an empty box labelled direction of electron flow — from the original 2024 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        topic="Energy Transformation"
        marks={1}
        statement={<>Identify the overall energy transformation that occurs during artificial photosynthesis.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            An energy transformation is &ldquo;<b>form in → form out</b>&rdquo;. The input is the light in the
            diagram; the output is energy stored in the fuel it makes (H₂). Name both ends.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="ours" points={[{ point: <><b>Light</b> (electromagnetic / solar) energy <b>to chemical energy</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Electron Flow"
        marks={1}
        statement={<>In the box shown in the diagram, draw an arrow to indicate the direction of electron flow.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Electrons always flow from the <b>anode</b> (oxidation) to the <b>cathode</b> (reduction). So find
            which side is which: water goes in on the left and is oxidised; H₂ comes out on the right, so H⁺ is
            reduced there. Draw the arrow <b>in the box</b> — the report says it had to be there.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme source="ours" points={[{ point: <>An arrow drawn <b>in the box</b>, <b>pointing to the right</b> (anode → cathode).</> }]} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Charge Balance"
        marks={2}
        statement={<>Explain how the electrical charge in artificial photosynthesis processes is balanced given that electrons only flow in one direction.</>}
        examinerReport={EXAM_CIII}
      >
        <Background title="How to Think About It">
          <p>
            If electrons keep moving one way, why doesn&rsquo;t one side become negative? Two marks means two
            ideas: the <b>electrons</b> are made at the anode and used at the cathode at the same rate, and
            <b> positive ions (H⁺)</b> move through the solution the same way to balance them. The conditions
            are <b>acidic</b>, so talk about H⁺ — the report did not accept answers using hydroxide ions.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>One valid statement, e.g. <b>electrons</b> are <b>generated at the anode and used up at the cathode</b>, maintaining the charge balance.</> },
            {
              point: (
                <>
                  A second, e.g. <b>H⁺ ions</b> are generated at the anode and <b>flow to the cathode</b> where they are
                  removed; or the flow of electrons to the cathode is <b>balanced by the flow of protons</b>; or{' '}
                  <b>ions flow through the system</b>. (OH⁻ not accepted — acidic conditions.)
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
