// 2023 Chemistry Exam, Section B Question 9 (8 marks). Electrolytic refining of copper: a
// discussion of how electrolysis purifies impure copper containing Zn, Pb and Au (definition of
// electrolysis, what happens to each impurity with reference to the electrochemical series), and
// how the Faraday constant and Faraday's first law find the amount of Br₂ from molten KBr.
// Question text and the Faraday's-law box are transcribed from the original paper; the cell
// diagram is cropped from the original VCAA exam PDF. VCAA report only (no second source); the
// report itemises every mark for both parts. The worked solutions, "How to Think About It" notes
// and model answers are original. The 2023 report prints its mark distributions as proportions
// (0.3, 0.4 …) under a "%" heading; they are stored here as percentages. Part a.'s printed
// distribution (0.3, 0.4, 0.2, 0.1, 0.04, 0.01) sums to 1.05 and implies an average of about
// 1.3, not the printed 1.2 — kept as printed (VCAA rounding). Gold is not in either Data Book's
// electrochemical series; Cu²⁺/Cu (+0.34 V), Pb²⁺/Pb (−0.13 V) and Zn²⁺/Zn (−0.76 V) are the same
// in the 2026 Data Book as in the one the paper used. The illustrative Faraday calculation in
// part b. was checked in Python.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2023sa-q9a-refining-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [30, 40, 20, 10, 4, 1],
  average: 1.2,
  comment: (
    <>
      The first mark was awarded for a correct definition of electrolysis. For example, &lsquo;Electrolysis
      involves passing an electric current through an electrolyte so that a (non-spontaneous) redox
      reaction can occur.&rsquo;
      <br />
      The second mark was awarded for the recognition of the redox processes occurring at the impure anode
      based on the ECS. For example, &lsquo;Zn and Pb metals are stronger reductants than Cu and will
      preferentially undergo oxidation to form Zn²⁺(aq) and Pb²⁺(aq) ions.&rsquo;
      <br />
      The third mark was awarded for the recognition that Au(s) would not undergo oxidation. For example,
      &lsquo;As Cu(s) is a much stronger reductant than Au(s), the Cu(s) would be preferentially oxidised
      to form Cu²⁺(aq).&rsquo; (Resulting in the Au(s) falling from this electrode and collecting as anode
      &lsquo;mud&rsquo;.)
      <br />
      The fourth mark was awarded for the recognition of the redox processes occurring at the cathode
      based on the ECS. For example, &lsquo;Zn²⁺(aq) and Pb²⁺(aq) ions are weaker oxidants than Cu²⁺(aq)
      and so only the Cu²⁺(aq) would be reduced, providing a pure layer of copper metal to be deposited
      onto the cathode.&rsquo;
      <br />
      The fifth mark was awarded for the recognition of the voltages needed for these reactions to take
      place. For example, &lsquo;During electrolysis the voltage supplied needs to be high enough for the
      oxidation of copper metal to occur but less than what would be needed for the oxidation of gold to
      occur.&rsquo;
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 20, 20, 20],
  average: 1.2,
  comment: (
    <>
      The first mark was awarded for the recognition that the charge in coulomb passing through a system is
      calculated by multiplying the current and time (i.e. Q = It).
      <br />
      The second mark was awarded for the recognition that Faraday&rsquo;s constant is used to determine
      the amount, in mol, of electrons by dividing the charge by Faraday&rsquo;s constant (i.e. n(e⁻) =
      Q/F).
      <br />
      The third mark was awarded for the recognition that for one mole of bromine to be produced two mole
      of electrons are required, and so n(Br₂) = ½ n(e⁻). (i.e. <Chem eq="2Br-(l) -> Br2(g) + 2e-" />)
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <b>Electrolysis</b> is the use of an <b>electric current</b> from an external power supply, passed
        through an <b>electrolyte</b>, to drive a <b>non-spontaneous redox reaction</b>.
      </>
    ),
    reason: (
      <>
        Mark 1: the definition the first bullet asks for. The key ideas are <i>electrical energy in</i> and
        a redox reaction that would <i>not</i> happen by itself (the reverse of a galvanic cell).
      </>
    ),
  },
  {
    working: (
      <>
        The impure copper is connected to the positive terminal, so it is the <b>anode</b>, where{' '}
        <b>oxidation</b> occurs. The pure copper is connected to the negative terminal, so it is the{' '}
        <b>cathode</b>, where <b>reduction</b> occurs.
      </>
    ),
    reason: (
      <>
        Set-up (not a separate mark, but marks 2–4 depend on it). Read the polarities off the diagram (+ on
        the impure copper, − on the pure copper). In an electrolytic cell the anode is <b>positive</b>;
        oxidation is always at the anode.
      </>
    ),
  },
  {
    working: (
      <>
        At the anode, <b>Zn and Pb are stronger reductants than Cu</b> (lower in the electrochemical
        series: E° = −0.76 V and −0.13 V, compared with +0.34 V for Cu), so they are{' '}
        <b>oxidised</b> along with the copper and enter the solution as <b>Zn²⁺(aq) and Pb²⁺(aq)</b>:
        <br />
        <Chem eq="Zn(s) -> Zn2+(aq) + 2e-" />
        <br />
        <Chem eq="Pb(s) -> Pb2+(aq) + 2e-" />
        <br />
        <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" />
      </>
    ),
    reason: (
      <>
        Mark 2: the anode reactions, <b>with reference to the electrochemical series</b> (the question
        demands it, so name &ldquo;stronger reductant&rdquo; and give the E° values). A metal{' '}
        <b>lower</b> in the series is a <b>stronger reductant</b>, so it is oxidised more easily than
        copper. Copper is a stronger reductant than water (O₂/H₂O is +1.23 V), so Cu is oxidised, not
        water.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Au is a much weaker reductant than Cu</b> (it lies above Cu in the series), so <b>Au is not
        oxidised</b>. As the copper around it dissolves, the gold <b>falls to the bottom</b> of the cell as{' '}
        <b>anode mud (sludge)</b>.
      </>
    ),
    reason: (
      <>
        Mark 3: what happens to the gold. Gold is not printed in the Data Book&rsquo;s electrochemical
        series — you are expected to know it is an unreactive (noble) metal that sits <b>well above</b>{' '}
        copper, so it is a very weak reductant.
      </>
    ),
  },
  {
    working: (
      <>
        At the cathode, <b>Cu²⁺(aq) is a stronger oxidant than Zn²⁺(aq) and Pb²⁺(aq)</b> (higher in the
        series), so <b>only Cu²⁺ is reduced</b> and <b>pure copper is deposited</b> on the cathode:
        <br />
        <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />
        <br />
        Zn²⁺ and Pb²⁺ <b>stay in solution</b>.
      </>
    ),
    reason: (
      <>
        Mark 4: the cathode reaction, again with reference to the series. The <b>strongest oxidant</b>{' '}
        present (highest E°) is reduced first. Cu²⁺ (+0.34 V) is also stronger than H⁺ (0.00 V) from the
        H₂SO₄, so no H₂ forms. This is why the cathode copper ends up purer than the anode: the impurities
        either stay in solution (Zn²⁺, Pb²⁺) or never dissolve (Au).
      </>
    ),
  },
  {
    working: (
      <>
        The <b>voltage</b> supplied is <b>high enough to oxidise Cu</b> (and Zn and Pb) at the anode, but{' '}
        <b>lower than the voltage needed to oxidise Au</b> — and too low to reduce Zn²⁺ or Pb²⁺ at the
        cathode.
      </>
    ),
    reason: (
      <>
        Mark 5: the role of the <b>applied voltage</b>. This is the idea the bullet points don&rsquo;t
        prompt for, so it is the easiest to leave out — keep the voltage low and controlled so that only
        the intended reactions occur.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        Measure the <b>current</b> (I, in A) and the <b>time</b> (t, in s) of the electrolysis and
        calculate the <b>charge</b>: <b>Q = It</b> (in coulombs).
      </>
    ),
    reason: (
      <>
        Mark 1: Faraday&rsquo;s first law says the amount of reaction is proportional to the{' '}
        <b>quantity of electricity</b> — and that quantity is the charge, Q = It. Time must be in{' '}
        <b>seconds</b>.
      </>
    ),
  },
  {
    working: (
      <>
        Divide the charge by the <b>Faraday constant</b> (F = 96 500 C mol⁻¹, the charge on one mole of
        electrons) to find the <b>amount of electrons</b>: <b>n(e⁻) = Q / F</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: what F is <i>for</i>. F converts coulombs into moles of electrons (Data Book: F = 96 500 C
        mol⁻¹).
      </>
    ),
  },
  {
    working: (
      <>
        Bromine forms at the anode: <Chem eq="2Br-(l) -> Br2(g) + 2e-" />
        <br />
        <b>2 mol of electrons</b> are released for every <b>1 mol of Br₂</b>, so{' '}
        <b>n(Br₂) = ½ n(e⁻)</b>.
      </>
    ),
    reason: (
      <>
        Mark 3: the <b>mole ratio</b> from the half-equation. Bromide ions are oxidised at the anode in
        molten KBr (K⁺ is reduced to K at the cathode).
      </>
    ),
  },
  {
    working: (
      <>
        <i>e.g.</i> 2.00 A for 10.0 min: Q = 2.00 A × 600 s = 1200 C
        <br />
        n(e⁻) = 1200 C / 96 500 C mol⁻¹ = 0.01243… mol
        <br />
        n(Br₂) = ½ × 0.01243… mol = <b>6.22 × 10⁻³ mol</b>
      </>
    ),
    reason: (
      <>
        Not required — the question asks you to <i>explain</i> the method, not to calculate. This example
        (with made-up numbers) just shows the three steps working together. Three significant figures,
        from 2.00 A and 10.0 min.
      </>
    ),
  },
]

export default function ChemistryQ9_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (8 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Electrolytic Refining"
        marks={5}
        statement={
          <>
            Purified copper contains at least 99.8% copper. Purified copper is used in electronic devices
            because it is a good electrical conductor and resists corrosion.
            <br />
            Purified copper is produced from impure copper by electrolysis. The electrolysis cell is shown in
            the diagram below. The impure copper contains 99% copper. The remainder of the impure copper
            consists of
            <ul className="list-disc pl-5 my-1">
              <li>zinc, Zn</li>
              <li>lead, Pb</li>
              <li>gold, Au.</li>
            </ul>
            <span className="block my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={cellSrc}
                alt="Electrolysis cell: an impure copper electrode connected to the positive terminal and a pure copper electrode connected to the negative terminal of a power supply, both dipping into 1 M CuSO₄(aq) and 1 M H₂SO₄(aq) — from the original 2023 VCAA exam paper"
                className="w-full max-w-[460px]"
              />
            </span>
            Use your understanding of electrochemistry to discuss how electrolysis is used to purify copper
            using the cell above. In your response
            <ul className="list-disc pl-5 mt-1">
              <li>provide a definition of electrolysis</li>
              <li>explain what happens to the Au, Zn and Pb with reference to the electrochemical series.</li>
            </ul>
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Five marks means five separate ideas. The bullets hand you two (a definition of electrolysis;
            what happens to the impurities), but the report marks five: the <b>definition</b>, the{' '}
            <b>anode</b> (Zn and Pb oxidised with Cu), the <b>gold</b> (not oxidised — anode mud), the{' '}
            <b>cathode</b> (only Cu²⁺ reduced) and the <b>voltage</b> (enough for Cu, not enough for Au).
            Plan the answer electrode by electrode, and justify every claim with the electrochemical
            series — &ldquo;stronger reductant&rdquo; at the anode, &ldquo;stronger oxidant&rdquo; at the
            cathode. The average was 1.2 out of 5, and only about 15% of students scored 3 or more — so cover all five.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A correct <b>definition of electrolysis</b>: passing an <b>electric current</b> through an <b>electrolyte</b> so that a <b>non-spontaneous redox reaction</b> occurs.</> },
            { point: <>At the impure <b>anode</b>: <b>Zn and Pb are stronger reductants than Cu</b> (ECS), so they are <b>oxidised</b> to <b>Zn²⁺(aq) and Pb²⁺(aq)</b>.</> },
            { point: <><b>Au is not oxidised</b>: Cu is a much <b>stronger reductant than Au</b>, so Cu is oxidised instead and the Au falls as <b>anode mud</b>.</> },
            { point: <>At the <b>cathode</b>: <b>Zn²⁺ and Pb²⁺ are weaker oxidants than Cu²⁺</b>, so <b>only Cu²⁺ is reduced</b> and <b>pure copper is deposited</b>.</> },
            { point: <>The <b>voltage</b> is <b>high enough to oxidise Cu</b> but <b>less than that needed to oxidise Au</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-3">
          <p>Faraday&rsquo;s First Law of Electrolysis</p>
          <p>
            It states, during electrolysis, the amount of chemical reaction which occurs at any electrode under
            the influence of electrical energy is proportional to the quantity of electricity passed through
            the electrolyte.
          </p>
        </div>
        <p className="text-right text-[12.5px] mt-1">Source: &lt;byjus.com/chemistry/laws-of-electrolysis/&gt;</p>
      </div>

      <PartCard
        letter="b"
        topic="Faraday's Laws"
        marks={3}
        statement={
          <>
            Explain how the Faraday constant, <i>F</i>, together with Faraday&rsquo;s first law of
            electrolysis, can be used to find the amount of bromine, Br₂, produced when molten potassium
            bromide, KBr(l), is electrolysed.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            This is the usual Faraday calculation — current → charge → moles of electrons → moles of
            product — written as an explanation with no numbers. Three marks, three links in the chain:{' '}
            <b>Q = It</b>, <b>n(e⁻) = Q/F</b>, and the <b>mole ratio</b> from the half-equation{' '}
            <Chem eq="2Br- -> Br2 + 2e-" />. The step most easily left out is the last one: the amount of
            electrons is not the amount of Br₂ — it takes two electrons to make one Br₂.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>charge</b> in coulombs is found from the <b>current × time</b>: <b>Q = It</b>.</> },
            { point: <>The <b>Faraday constant</b> converts charge to the <b>amount of electrons</b>: <b>n(e⁻) = Q/F</b>.</> },
            { point: <><b>Two mol of electrons</b> produce one mol of Br₂ (<Chem eq="2Br-(l) -> Br2(g) + 2e-" />), so <b>n(Br₂) = ½ n(e⁻)</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
