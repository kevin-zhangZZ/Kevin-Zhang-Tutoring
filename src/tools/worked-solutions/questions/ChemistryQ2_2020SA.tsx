// 2020 Chemistry Exam, Section B Question 2 (8 marks). Electrolysis of CO₂ in water to make
// ethanol (CO₂–H₂O cell with a Cu–Zn electrode, NaHCO₃ electrolyte, basic conditions): naming
// the Cu–Zn electrode, the minimum applied voltage, the overall equation, the oxidising agent
// by oxidation numbers, and a Faraday's-laws time calculation with a 58% cell efficiency.
// Question text transcribed from the original paper; the cell diagram is cropped from the
// original VCAA exam PDF. VCAA report only (no second source). The report marks its mark points
// with asterisks in parts d. and e., so those MarkSchemes are "vcaa"; a.–c. are one-mark answers
// with no itemisation, so "ours". Numbers checked in Python: n(e⁻) = 0.0363 mol, Q = 3502.95 C,
// t = 1297.4 s, t ÷ 0.58 = 2236.9 s = 37.28 min. The E° values are given in the question, so no
// Data Book note is needed. On the current study design (electrolysis, oxidation numbers,
// basic conditions, Faraday's laws applied to electrolytic cells).

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2020sa-q2-electrolysis-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: <>Cathode.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [91, 9],
  average: 0.1,
  comment: (
    <>
      &gt;0.73 V
      <br />
      The vast majority of students did not recognise that for electrolysis to occur, the calculated
      value has to be greater than that shown by the difference in voltages on the SEP table. Use of
      exactly 0.73 V will not generate any reaction due to the overpotential needed.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: (
    <>
      2CO₂ + 3H₂O → C₂H₅OH + 3O₂
      <br />
      Many students wrote the reverse equation, suggesting confusion in establishing the correct
      direction for half-equations required for this electrolysis reaction.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [50, 32, 18],
  average: 0.7,
  comment: (
    <>
      CO₂ *
      <br />
      Either of the following responses was required for the second mark. *
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          CO₂ is the oxidising agent since CO₂ is reduced; the oxidation number of C decreases from +4
          in CO₂ to an average of −2 in C₂H₅OH.
        </li>
        <li>
          CO₂ is the oxidising agent since it oxidises H₂O and the oxidation number of O in H₂O increases
          from −2 in H₂O to 0 in O₂.
        </li>
      </ul>
      A common mistake was referring to the element carbon as the oxidising agent rather than the
      required carbon dioxide. Carbon was not a reactant in this equation and could not therefore be
      accepted as a viable answer. Performance on this question was also impacted by errors in
      Question 2a. and lack of, or superficial, reference to the role of oxidation numbers. Students
      need to be aware that the correct convention for oxidation numbers is to always show the sign
      prior to the digit, i.e. +2 not 2+.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [35, 17, 25, 22],
  average: 1.4,
  comment: (
    <>
      <i>n</i>(CO₂) consumed = 6.05x10⁻³
      <br />
      <i>n</i>(e⁻) = 6 x <i>n</i>(CO₂) = 6 x 6.05x10⁻³ mol = 0.0363 mol *
      <br />
      <i>Q</i> = 0.0363 x 96500 = 3.5x10³ C
      <br />
      <i>t</i> = <i>Q</i> / <i>I</i> = 3.5x10³ / 2.70 = 1.3x10³ s *
      <br />
      Since cell efficiency = 58 %
      <br />
      1297.4 s = 0.58 x time of cell operation
      <br />
      Time = 1297.4 / 0.58 = 2.24x10³ s = 37 or 37.3 (minutes) *
      <br />
      Common mistakes were failure to convert n(CO₂) to n(e⁻) and, more significantly, failure to
      understand how to apply the percentage efficiency. Many students also lacked the ability to
      reliably manipulate mathematical relationships.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>The Cu–Zn electrode is connected to the <b>negative (−)</b> terminal of the power supply.</>,
    reason: <>Read the polarity straight off the diagram: the wire from the Cu–Zn electrode goes to the &minus; side of the power box.</>,
  },
  {
    working: <>Electrons are pushed onto it, so <b>reduction</b> occurs there: CO₂ is reduced to C₂H₅OH.</>,
    reason: <>The power supply pumps electrons into the negative electrode. Whatever gains electrons is reduced — here the CO₂ that is bubbled in right next to this electrode.</>,
  },
  {
    working: <b>Cu–Zn electrode: cathode</b>,
    reason: <>Reduction always happens at the <b>cathode</b> (&ldquo;RED CAT&rdquo;). In an <b>electrolytic</b> cell the cathode is <b>negative</b> — the opposite sign to a galvanic cell, which is why the sign alone can mislead. The graphite (+) electrode is the anode. The report notes that errors in this part also affected performance in part d.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>Spontaneous direction: O₂ (+0.40 V) is reduced and C₂H₅OH (−0.33 V) is oxidised.</>,
    reason: <>On the electrochemical series the <b>higher</b> half-equation runs forwards (reduction) and the lower one runs backwards (oxidation). Left alone, ethanol and oxygen would react — that is combustion, and it gives out energy.</>,
  },
  {
    working: <>E°(cell) = 0.40 − (−0.33) = 0.73 V</>,
    reason: <>The size of the voltage difference between the two half-equations. Electrolysis drives the reaction the <b>opposite</b> way (CO₂ → C₂H₅OH, H₂O/OH⁻ → O₂), so the power supply must overcome this 0.73 V.</>,
  },
  {
    working: <b>Applied voltage &gt; 0.73 V</b>,
    reason: <>The mark needs &ldquo;<b>greater than</b>&rdquo;. Exactly 0.73 V only balances the cell — no net reaction — and real electrodes need an extra <b>overpotential</b> on top (E° values are also for standard conditions only). The report says the vast majority did not recognise that the value has to be greater than the E° difference: only 9% scored the mark.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Cathode (reduction): <Chem eq="2CO2(g) + 9H2O(l) + 12e- -> C2H5OH(l) + 12OH-(aq)" /></>,
    reason: <>The cathode half-equation is the given CO₂ equation read <b>forwards</b> (reduction) — the cell exists to <b>make ethanol</b>.</>,
  },
  {
    working: <>Anode (oxidation): <Chem eq="4OH-(aq) -> O2(g) + 2H2O(l) + 4e-" /></>,
    reason: <>The O₂ half-equation is read <b>backwards</b> at the anode, because oxidation is the reverse of the reduction printed in the table.</>,
  },
  {
    working: <>Anode × 3: <Chem eq="12OH-(aq) -> 3O2(g) + 6H2O(l) + 12e-" /></>,
    reason: <>Electrons must cancel: 12 gained at the cathode, so 12 lost at the anode — multiply the anode equation by 3.</>,
  },
  {
    working: <>Add, then cancel 12OH⁻ and 6H₂O from both sides (9H₂O − 6H₂O = 3H₂O)</>,
    reason: <>12OH⁻ appears on both sides, and 6 of the 9 water molecules on the left cancel with the 6 on the right.</>,
  },
  {
    working: <b><Chem eq="2CO2(g) + 3H2O(l) -> C2H5OH(l) + 3O2(g)" /></b>,
    reason: <>Check: C 2 = 2; H 6 = 6; O 4 + 3 = 7 = 1 + 6. Sanity: this is exactly the <b>reverse of ethanol&rsquo;s combustion</b>, as an electrolysis that forces a non-spontaneous reaction should be. Writing it the other way round (C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O) is the error the report describes. VCAA&rsquo;s answer omits states; including them is good practice.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>The oxidising agent is <b>CO₂</b> (carbon dioxide).</>,
    reason: <>Mark 1. Name the <b>whole reactant species</b>, CO₂ — the report rejected &ldquo;carbon&rdquo;, because elemental carbon is not a reactant in the equation.</>,
  },
  {
    working: <>Oxidation number of C in CO₂: x + 2(−2) = 0, so C = <b>+4</b>.</>,
    reason: <>O is −2 in compounds (not peroxides), and the sum of oxidation numbers in a neutral molecule is 0.</>,
  },
  {
    working: <>Oxidation number of C in C₂H₅OH (C₂H₆O): 2x + 6(+1) + (−2) = 0, so C = <b>−2</b> (average).</>,
    reason: <>H is +1 and O is −2. Ethanol has two carbons, so this is the <b>average</b> per carbon.</>,
  },
  {
    working: <>The oxidation number of C <b>decreases from +4 to −2</b>, so <b>CO₂ is reduced</b>; a species that is reduced is the <b>oxidising agent</b> (it oxidises H₂O, in which O goes from −2 to 0 in O₂).</>,
    reason: <>Mark 2: the reasoning with oxidation numbers. Either change earns it — C in CO₂ decreasing, or O in H₂O increasing. Write the sign <b>before</b> the digit (+4, −2), not 4+ or 2−; the report stresses this convention.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>n(e⁻) = 12/2 × n(CO₂) = 6 × n(CO₂)</>,
    reason: <>Mole ratio from the cathode half-equation: 2 CO₂ need 12 e⁻, so each CO₂ needs 6 electrons. Charge depends on <b>electrons</b>, not on CO₂ — the report lists missing this conversion as a common mistake.</>,
  },
  {
    working: <>n(e⁻) = 6 × 6.05 × 10⁻³ mol = 0.0363 mol</>,
    reason: <>Mark 1: the amount of electrons.</>,
  },
  {
    working: <>Q = n(e⁻) × F</>,
    reason: <>Faraday&rsquo;s law: each mole of electrons carries 96 500 C (Data Book: F = 96 500 C mol⁻¹).</>,
  },
  { working: <>Q = 0.0363 mol × 96 500 C mol⁻¹ = 3502.95 C</> },
  {
    working: <>t = Q / I = 3502.95 C / 2.70 A = 1297.4 s</>,
    reason: <>Mark 2. From Q = It. This is the time if <b>every</b> coulomb went into reducing CO₂ (100% efficient). Keep it unrounded.</>,
  },
  {
    working: <>58% efficient: 0.58 × t(actual) = 1297.4 s</>,
    reason: <>Only 58% of the charge passed actually does the useful reaction (the rest is wasted, e.g. on side reactions), so the cell must run <b>longer</b> than 1297.4 s to deliver the useful charge. Multiplying by 0.58 instead would give a shorter time (12.5 min) — impossible for a less efficient cell. The report names failing to apply the efficiency as the more significant of its common mistakes.</>,
  },
  {
    working: <>t(actual) = 1297.4 s / 0.58 = 2236.9 s</>,
  },
  {
    working: <>t = 2236.9 s ÷ 60 s min⁻¹</>,
    reason: <>The question asks for the time <b>in minutes</b>.</>,
  },
  {
    working: <b>t = 37 min</b>,
    reason: <>Mark 3. (37.28 min unrounded.) Two significant figures, set by the 58% efficiency; the report also accepted 37.3 min.</>,
  },
]

export default function ChemistryQ2_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (8 marks)</p>
        <p className="mb-3">
          The electrolysis of carbon dioxide gas, CO₂, in water is one way of making ethanol, C₂H₅OH.
          <br />
          The diagram below shows a CO₂–H₂O electrolysis cell. The electrolyte used in the electrolysis
          cell is sodium bicarbonate solution, NaHCO₃(aq).
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="A CO₂–H₂O electrolysis cell: a graphite electrode connected to the + terminal and a Cu–Zn electrode connected to the − terminal of a power supply, both dipping into NaHCO₃(aq), with CO₂(g) fed in beside the Cu–Zn electrode and an empty box under its label — from the original 2020 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
        <p className="mb-2">The following half-cell reactions occur in the CO₂–H₂O electrolysis cell.</p>
        <table className="text-[13.5px]">
          <tbody>
            <tr>
              <td className="pr-8 py-1"><Chem eq="O2(g) + 2H2O(l) + 4e- <=> 4OH-(aq)" /></td>
              <td className="py-1"><i>E</i><sup>0</sup> = +0.40 V</td>
            </tr>
            <tr>
              <td className="pr-8 py-1"><Chem eq="2CO2(g) + 9H2O(l) + 12e- <=> C2H5OH(l) + 12OH-(aq)" /></td>
              <td className="py-1"><i>E</i><sup>0</sup> = −0.33 V</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Electrode Polarity"
        marks={1}
        statement={<>Identify the Cu–Zn electrode as either the anode or the cathode in the box provided in the diagram above.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            In an <b>electrolytic</b> cell the power supply decides the polarity: the electrode wired to
            the <b>negative</b> terminal receives electrons, so <b>reduction</b> happens there, and the
            reduction electrode is always the <b>cathode</b>. Don&rsquo;t carry over the galvanic-cell habit
            &ldquo;cathode = positive&rdquo; — in electrolysis the cathode is negative.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Cathode</b> (it is connected to the negative terminal, where CO₂ is <b>reduced</b>).</> }]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Applied Voltage"
        marks={1}
        statement={<>Determine the applied voltage required for the electrolysis cell to operate.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Electrolysis forces a reaction to run in its <b>non-spontaneous</b> direction, so the supply has
            to beat the voltage the two half-cells would produce on their own: the difference between the
            two E° values. The trap — 91% of students lost this mark — is stopping at 0.73 V: the answer
            must be <b>greater than</b> 0.73 V, because exactly 0.73 V produces no reaction.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[{ point: <><b>Greater than 0.73 V</b> (&gt; 0.73 V) — 0.73 V on its own does not earn the mark.</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Overall Equation"
        marks={1}
        statement={<>Write the balanced equation for the overall electrolysis reaction.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Decide the direction first: the cell <b>makes ethanol</b>, so CO₂ is reduced at the cathode and
            water (as OH⁻) is oxidised to O₂ at the anode. Then balance electrons (12 each side), add the
            half-equations and cancel what appears on both sides. The report says many students wrote the
            reverse equation — the spontaneous combustion of ethanol, not the electrolysis.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The correctly balanced overall equation in the <b>electrolysis direction</b>: <Chem eq="2CO2 + 3H2O -> C2H5OH + 3O2" />, with no electrons, OH⁻ or excess water left over.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Oxidising Agent"
        marks={2}
        statement={<>Identify the oxidising agent in the electrolysis reaction. Give your reasoning using oxidation numbers.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: <b>name</b> the oxidising agent, then <b>prove</b> it with oxidation
            numbers. The oxidising agent is the reactant that is <b>reduced</b> (its oxidation number goes
            down). The report calls naming the element &ldquo;carbon&rdquo; a common mistake — name the reactant species, CO₂ — and says performance suffered from a lack of, or superficial, reference to oxidation numbers, so quote the actual
            numbers before and after, with the sign written first (+4, −2).
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>CO₂</b> is the oxidising agent (not &ldquo;carbon&rdquo;).</> },
            {
              point: (
                <>
                  Reasoning with oxidation numbers, either: <b>CO₂ is reduced</b> — the oxidation number of C{' '}
                  <b>decreases from +4</b> in CO₂ <b>to −2</b> (average) in C₂H₅OH; or CO₂ <b>oxidises H₂O</b> — the
                  oxidation number of O <b>increases from −2</b> in H₂O <b>to 0</b> in O₂.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Faraday's Laws"
        marks={3}
        statement={
          <>
            A current of 2.70 A is passed through the CO₂–H₂O electrolysis cell. The cell has an efficiency
            of 58%.
            <br />
            Calculate the time taken, in minutes, for this cell to consume 6.05 × 10⁻³ mol of CO₂(g).
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Chain: mol CO₂ → mol e⁻ (ratio 12 : 2 from the half-equation) → charge Q = nF → time t = Q/I →
            correct for efficiency → minutes. Three marks follow the three hurdles: n(e⁻), the ideal time,
            and the efficiency-corrected time. A <b>less efficient</b> cell wastes charge, so it takes{' '}
            <b>longer</b>: divide by 0.58, don&rsquo;t multiply. The report names the n(CO₂) → n(e⁻)
            conversion and, more significantly, the efficiency step as the common mistakes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>n(e⁻) = 6 × n(CO₂)</b> = 6 × 6.05 × 10⁻³ = <b>0.0363 mol</b>.</> },
            { point: <><b>Q = nF</b> = 3.5 × 10³ C, then <b>t = Q / I</b> = 3.5 × 10³ / 2.70 = <b>1.3 × 10³ s</b>.</> },
            { point: <>Efficiency applied correctly: <b>t = 1297.4 / 0.58</b> = 2.24 × 10³ s = <b>37 min</b> (37.3 also accepted).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
