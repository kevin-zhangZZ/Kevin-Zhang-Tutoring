// 2020 Chemistry Exam, Section B Question 4 (7 marks). A rechargeable lithium–carbon dioxide
// (Li–CO₂) battery: the overall recharge equation, the effect of Li₂CO₃ breaking away from the
// electrode, why an aqueous electrolyte is unsafe, and whether the battery could lower
// atmospheric CO₂. Question text transcribed from the original paper; the cell diagram is
// cropped from the original VCAA exam PDF. Mark allocations: the report itemises the marks for
// parts b. and c.; for a. and d. the mark scheme is our reading of the report's answer. The
// worked solutions, "How to Think About It" notes and model answers are original (VCAA report
// only — no second source). Equations balanced and E° values checked against the 2026 Data Book
// (Li⁺/Li −3.04 V; H₂O/H₂ −0.83 V — unchanged). All parts are on the current study design
// (secondary cells, electrolysis, the electrochemical series).

import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2020sa-q4-li-co2-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      2Li₂CO₃ + C → 4Li + 3CO₂
      <br />
      Here too there was an incorrect understanding of which direction each half-cell reaction needed
      to be written in during the recharge process. The most common mistake was that the overall
      reaction was written in reverse.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [29, 39, 32],
  average: 1.0,
  comment: (
    <>
      Reduces battery life / Performance reduced / Limits the extent of recharging / number of
      recharges / reduced ability to hold full charge.
      <br />
      As lithium carbonate breaks away from the cathode, this reduces the amount of Li₂CO₃ available
      for recharging.
      <br />
      OR
      <br />
      Products of electrolysis need to stay in contact with electrodes for effective recharge.
      <br />
      One mark was awarded for describing the effect on the performance of the battery. This was
      frequently not done.
      <br />
      One mark was awarded for describing how this affected the performance of the battery.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [58, 17, 18, 8],
  average: 0.7,
  comment: (
    <>
      Students used two approaches to respond to this question.
      <br />
      <b>Galvanic cell approach</b>
      <br />
      Li(s) is a very strong reducing agent (reductant) and will reduce water to produce H₂(g).
      <br />
      Li(s) → Li⁺(aq)+ e⁻ / 2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq)
      <br />
      OR
      <br />
      2Li(s) + 2H₂O(l) → H₂(g) + 2Li⁺(aq) + 2OH⁻(aq)
      <br />
      H₂(g) is explosive / flammable / builds up pressure in battery
      <br />
      OR
      <br />
      The reaction is highly exothermic and may cause battery to catch fire.
      <br />
      <b>Electrolytic cell approach</b>
      <br />
      Water will be reduced in preference to Li⁺ ions producing H<sub>2(g).</sub>
      <br />
      At the cathode(-) &nbsp; 2H₂O<sub>(l)</sub> + 2e⁻ → H<sub>2(g)</sub> + 2OH⁻<sub>(aq)</sub>
      <br />
      At the anode(+) &nbsp; 2H₂O<sub>(l)</sub> → O<sub>2(g)</sub> + 4H⁺<sub>(aq)</sub> + 4e⁻
      <br />
      Overall &nbsp; 2H₂O<sub>(l)</sub> → O<sub>2(g)</sub> + 2H<sub>2(g)</sub>
      <br />
      Build-up of H₂/O₂ leading to a potential explosion due to pressure or a potential explosion due
      to spontaneous combustion.
      <br />
      One mark was awarded for identifying the products that could cause a safety concern.
      <br />
      One mark was awarded for the equations (either both half-equations or the full equation) to back
      up the formation of this product.
      <br />
      One mark was awarded for the reason this chemical poses a safety risk.
      <br />
      Students needed to show these three key sections in their response. Not many included the last
      point.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      No. The CO₂(g) absorbed during discharge will be released during recharge.
      <br />
      A reason had to be given by the student in order to obtain the mark.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Discharge overall: 4Li + 3CO₂ → 2Li₂CO₃ + C</>,
    reason: (
      <>
        Multiply the lithium half-equation by 4 (4Li → 4Li⁺ + 4e⁻) so both half-equations carry
        4e⁻, then add them: 4Li⁺ and 4e⁻ appear on both sides and cancel. This is the reaction that{' '}
        <b>generates</b> electricity — not what is asked.
      </>
    ),
  },
  {
    working: <>Recharge, graphite electrode: 2Li₂CO₃ + C → 4Li⁺ + 3CO₂ + 4e⁻</>,
    reason: (
      <>
        Recharging forces each discharge half-reaction to run <b>backwards</b>. The CO₂ reduction is
        reversed into an oxidation, so on recharge the graphite electrode is the <b>anode</b>.
      </>
    ),
  },
  {
    working: <>Recharge, lithium electrode: 4Li⁺ + 4e⁻ → 4Li</>,
    reason: <>Li → Li⁺ + e⁻ reversed, ×4 to match the 4 electrons: Li⁺ is reduced back to lithium metal (the <b>cathode</b> on recharge).</>,
  },
  {
    working: <b>2Li₂CO₃(s) + C(s) → 4Li(s) + 3CO₂(g)</b>,
    reason: (
      <>
        Add the two recharge half-equations and cancel 4Li⁺ and 4e⁻. Check: Li 4 = 4, C 3 = 3, O 6 = 6.
        It is the discharge equation <b>reversed</b>; the report says the most common mistake was writing
        it the other way round (the discharge reaction). States are optional here — VCAA&rsquo;s answer
        has none.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>The battery would have <b>reduced performance</b>: a <b>shorter battery life</b>, <b>fewer recharges</b> and a <b>reduced ability to hold a full charge</b>.</>,
    reason: <>Mark 1: the <b>effect</b> on the battery&rsquo;s performance. The report says this was frequently not done.</>,
  },
  {
    working: (
      <>
        This is because Li₂CO₃ is the discharge product that must be <b>converted back</b> into Li and
        CO₂ on recharge. Deposits that break away are <b>no longer in contact with the electrode</b>, so{' '}
        <b>less Li₂CO₃ is available for recharging</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: <b>how</b> the breaking away causes that effect. From part a., recharge needs Li₂CO₃ to
        react at the graphite electrode; a lump floating in the electrolyte cannot give up electrons to
        it, so that lithium is lost from the cycle.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Lithium is a <b>very strong reductant</b> and would <b>reduce water</b> in an aqueous electrolyte, producing <b>hydrogen gas, H₂</b>.</>,
    reason: (
      <>
        Mark 1: name the <b>product</b> that causes the danger. In the electrochemical series Li⁺/Li
        (−3.04 V) is far below 2H₂O/H₂ (−0.83 V). The oxidant (H₂O, on the left of the higher
        half-equation) sits above the reductant (Li, on the right of the lower one), so the reaction
        of Li with water is spontaneous.
      </>
    ),
  },
  {
    working: (
      <>
        Li(s) → Li⁺(aq) + e⁻
        <br />
        2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq)
        <br />
        Overall: <b>2Li(s) + 2H₂O(l) → 2Li⁺(aq) + 2OH⁻(aq) + H₂(g)</b>
      </>
    ),
    reason: (
      <>
        Mark 2: <b>equations</b> backing up the H₂ — both half-equations or the overall equation. Both
        half-equations come from the Data Book (the Li one written as an oxidation, i.e. reversed). (Alternative, also accepted: on recharge water
        would be electrolysed in preference to Li⁺, giving H₂ at the cathode and O₂ at the anode:{' '}
        2H₂O(l) → O₂(g) + 2H₂(g).)
      </>
    ),
  },
  {
    working: <>H₂ is <b>flammable/explosive</b>, and the gas <b>builds up pressure</b> in the sealed battery; the reaction is also <b>highly exothermic</b>, so the battery could <b>catch fire or explode</b>.</>,
    reason: <>Mark 3: <b>why</b> the product is a safety risk. The report says not many students included this last point — naming H₂ is not enough; say what H₂ does.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <><b>No.</b> The <b>CO₂ absorbed during discharge is released again during recharge</b> (3CO₂ consumed, then 3CO₂ produced), so over a full cycle there is <b>no net removal</b> of CO₂.</>,
    reason: (
      <>
        Compare the two overall equations: discharge 4Li + 3CO₂ → 2Li₂CO₃ + C, recharge
        (part a.) 2Li₂CO₃ + C → 4Li + 3CO₂. A bare &ldquo;No&rdquo; scores nothing — the
        report says a reason had to be given.
      </>
    ),
  },
]

export default function ChemistryQ4_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (7 marks)</p>
        <p className="mb-2">
          Research scientists are developing a rechargeable lithium–carbon dioxide, Li–CO₂, battery. The
          rechargeable Li–CO₂ battery is made of lithium metal, carbon in the form of graphite (coated with
          a catalyst) and a non-aqueous electrolyte that absorbs CO₂.
          <br />
          A diagram of the rechargeable Li–CO₂ cell is shown below. One Li–CO₂ cell generates 4.5 V.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="A Li–CO₂ cell: a lithium electrode and a catalyst-coated graphite electrode connected through a load, separated by a membrane in a non-aqueous electrolyte containing CO₃²⁻ and Li⁺ ions, with CO₂(g) flowing in on the graphite side and out on the lithium side — from the original 2020 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Recharge Equation"
        marks={1}
        statement={
          <>
            When the Li–CO₂ cell generates electricity, the two half-cell reactions are
            <br />
            <span className="inline-block pl-6">
              4Li⁺ + 3CO₂ + 4e⁻ → 2Li₂CO₃ + C
              <br />
              Li → Li⁺ + e⁻
            </span>
            <br />
            Write the equation for the overall recharge reaction.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            The half-equations given are for <b>discharge</b> (generating electricity). Recharging is the
            discharge reaction driven <b>in reverse</b> by an external power supply. So combine the two
            half-equations (balance the electrons), then flip the overall equation. The report&rsquo;s most
            common mistake was leaving it in the discharge direction.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The <b>balanced overall recharge equation</b>, in the <b>reverse direction</b> to discharge: <b>2Li₂CO₃ + C → 4Li + 3CO₂</b> (no electrons left in it).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Battery Performance"
        marks={2}
        statement={
          <>
            During discharge, lithium carbonate, Li₂CO₃, deposits break away from the electrode.
            <br />
            Describe how this might affect the performance of the battery.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: <b>what happens</b> to the battery&rsquo;s performance (life, capacity,
            number of recharges) and <b>why</b>. The why comes from part a.: Li₂CO₃ is the reactant on
            recharge, and it can only react while it is <b>touching the electrode</b>. The report notes
            that many answers never actually stated the effect on performance.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>effect on performance</b>: <b>reduced battery life</b> / <b>fewer recharges</b> / <b>reduced ability to hold a full charge</b>.</> },
            { point: <>How: Li₂CO₃ that breaks away is <b>no longer in contact with the electrode</b>, so <b>less Li₂CO₃ is available for recharging</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Aqueous Electrolyte"
        marks={3}
        statement={
          <>
            Explain why it is unsafe to use an aqueous electrolyte in the design of the Li–CO₂ battery.
            Include appropriate equations in your answer.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Aqueous&rdquo; means water. Check the electrochemical series: lithium is the strongest
            reductant in it, so it reacts with water. Three marks are three separate sections:{' '}
            <b>the product</b> (H₂), <b>equations</b> showing how it forms, and <b>why that product is
            dangerous</b>. The report says not many students gave the last one — stopping at
            &ldquo;H₂ is produced&rdquo; loses a mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Identifies the <b>product</b> that is a safety concern: <b>H₂(g)</b> (lithium, a <b>strong reductant</b>, reduces water; or water is reduced in preference to Li⁺ on recharge).</> },
            { point: <><b>Equations</b> for its formation — both half-equations or the full equation, e.g. <b>2Li(s) + 2H₂O(l) → H₂(g) + 2Li⁺(aq) + 2OH⁻(aq)</b>.</> },
            { point: <>The <b>reason it is a risk</b>: H₂ is <b>flammable/explosive</b> or <b>builds up pressure</b>, or the reaction is <b>highly exothermic</b> and could cause a <b>fire</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Net CO₂ Change"
        marks={1}
        statement={
          <>
            Could the Li–CO₂ battery be used to reduce the amount of CO₂(g) in the atmosphere? Give your
            reasoning.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            The battery absorbs CO₂ while discharging — but it is rechargeable. Follow the CO₂ through a{' '}
            <b>whole cycle</b> using the equations from part a. One mark, and it needs both the answer and
            the reason.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>No</b>, with the reason: the <b>CO₂ absorbed during discharge is released during recharge</b>, so there is no net removal.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
