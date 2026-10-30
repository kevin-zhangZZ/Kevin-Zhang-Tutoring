// 2021 Chemistry Exam, Section B Question 2 (7 marks). A rechargeable Mg–Na hybrid cell: the
// polarity of the Mg electrode on discharge, its discharge half-equation, two safety hazards of
// using the cell in a pacemaker, and producing Mg from MgCl₂ by electrolysis. Question text
// transcribed from the original paper; the cell diagram is cropped from the original VCAA exam
// PDF, and VCAA's sample answer for part a.i (the same diagram with "−" in the box) is cropped
// from the examination report. Mark allocations: the report itemises the marks for part c. only;
// the other parts' mark schemes are our reading of the report's answers. Worked solutions,
// "How to Think About It" notes and model answers are original. VCAA report only — no second
// source. The report's "greater than 3.73 V" in part c. uses the 2021 Data Book's
// Mg²⁺/Mg = −2.37 V; the 2026 Data Book gives −2.36 V, so 3.72 V — a Data Book note says so.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2021sa-q2-cell.png'
import reportGraphSrc from './chem-2021sa-q2ai-report-graph.png'

const EXAM_AI: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <img
      loading="lazy"
      decoding="async"
      src={reportGraphSrc}
      alt="VCAA's sample answer: the cell diagram with a negative sign (−) written in the box beside the Mg electrode"
      className="w-full max-w-[360px] mt-1 bg-white"
    />
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      <Chem eq="Mg -> Mg2+ + 2e-" />
      <br />
      No states were required, but equilibrium arrows were not accepted.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 46, 9],
  average: 0.7,
  comment: (
    <>
      Students needed to provide any two logical responses that directly linked the Mg-Na hybrid cell
      posing potential health hazards.
      <br />
      Responses could have included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>content of device/electrolyte is toxic/harmful/corrosive to the body if it leaks</li>
        <li>battery may overheat</li>
        <li>Mg is relatively reactive so may react in the body</li>
        <li>leakage would cause an imbalance in natural Mg²⁺/Na⁺ ion levels in the body.</li>
      </ul>
      General responses that didn&rsquo;t link the specific issues to this Mg-Na hybrid cell were not
      accepted.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [56, 24, 13, 7],
  average: 0.7,
  comment: (
    <>
      The first mark was allocated for discussion of the need for molten MgCl₂/Mg²⁺ salt.
      <br />
      The second mark was allocated to the need for electrical energy to be supplied.
      <br />
      The third mark could be allocated through any of the following being provided:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Chemical reaction at cathode.</li>
        <li>Cell design requiring the separation/isolation of products.</li>
        <li>Use of inert electrodes.</li>
      </ul>
      A possible response could have been presented as follows:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Place MgCl₂ in a crucible and heat until molten.</li>
        <li>Apply a voltage (greater than 3.73 V) using inert electrodes.</li>
        <li>Keep the Mg metal and chlorine gas separated.</li>
      </ul>
      A number of students failed to recognise the need for a molten salt and incorrectly attempted to
      justify an explanation using the electrolysis of an aqueous solution. In this instance only partial
      marks could be awarded.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>Discharge: <Chem eq="Mg + 2Na+ + 2X -> 2NaX + Mg2+" /></>,
    reason: <>The given equation is for <b>recharge</b>. Discharging is the spontaneous reverse reaction, so swap the two sides.</>,
  },
  {
    working: <>Mg → Mg²⁺: Mg <b>loses electrons</b>, so it is <b>oxidised</b> — the Mg electrode is the <b>anode</b>.</>,
    reason: <>Oxidation always happens at the anode (&ldquo;An Ox&rdquo;), in every kind of cell.</>,
  },
  {
    working: <>In a discharging (galvanic) cell the anode is <b>negative</b>, because electrons are released there and flow out into the external circuit.</>,
    reason: <>Electrons pile up at the electrode where they are produced, giving it a negative charge relative to the other electrode.</>,
  },
  {
    working: <b>Write &ldquo;−&rdquo; in the box beside the Mg electrode.</b>,
    reason: <>Check with recharge: Mg²⁺ is reduced back to Mg at this electrode (cathode), which is connected to the <b>negative</b> terminal of the charger. A rechargeable cell&rsquo;s electrodes keep the <b>same polarity</b> on discharge and recharge — only the names anode/cathode swap.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>Discharge at the Mg electrode: Mg(s) is oxidised to Mg²⁺</>,
    reason: <>From part a.i — the reverse of what happens at this electrode on recharge (Mg²⁺ + 2e⁻ → Mg).</>,
  },
  {
    working: <b><Chem eq="Mg(s) -> Mg2+ + 2e-" /></b>,
    reason: <>Balanced for atoms (one Mg) and charge (0 = +2 + 2 × (−1)). Use a <b>one-way arrow</b>: the report did not accept equilibrium arrows. States were not required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>1. If the casing cracked and the cell <b>leaked</b>, the <b>organic/salt electrolyte X</b> could be <b>toxic or corrosive</b> to the body tissue around the pacemaker.</>,
    reason: <>Hazard 1, tied to a named part of <b>this</b> cell (its electrolyte). A general &ldquo;batteries are dangerous&rdquo; was not accepted.</>,
  },
  {
    working: <>2. <b>Magnesium is a reactive metal</b>: if exposed to body fluids it could <b>react with the water</b> in them (<Chem eq="Mg + 2H2O -> Mg(OH)2 + H2" />), releasing heat and hydrogen gas inside the body.</>,
    reason: <>Hazard 2, again specific to this cell (its Mg electrode). Other accepted answers: the cell could <b>overheat</b> (e.g. while recharging) and burn tissue, or leaked <b>Mg²⁺/Na⁺ ions</b> could upset the body&rsquo;s natural ion balance.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Heat solid MgCl₂ (e.g. in a crucible) until it <b>melts</b>, so that <b>molten MgCl₂</b> contains <b>mobile Mg²⁺ and Cl⁻ ions</b> that can carry charge.</>,
    reason: (
      <>
        Mark 1: <b>molten</b>, not aqueous. In an aqueous solution, water (<Chem eq="2H2O + 2e- -> H2 + 2OH-" />, −0.83 V) is a
        stronger oxidising agent than Mg²⁺ (−2.36 V), so <b>H₂ would form at the cathode instead of Mg</b>. The report says a number of
        students used an aqueous solution and could only get partial marks.
      </>
    ),
  },
  {
    working: <>Connect the cell to a <b>DC power supply</b> that supplies <b>electrical energy</b> at a voltage <b>greater than 3.72 V</b>, to force the <b>non-spontaneous</b> reaction <Chem eq="MgCl2(l) -> Mg(l) + Cl2(g)" />.</>,
    reason: (
      <>
        Mark 2: electrical energy must be supplied. Minimum voltage = E°(Cl₂/Cl⁻) − E°(Mg²⁺/Mg) = +1.36 − (−2.36) = 3.72 V. E° values are measured
        for aqueous solutions at 25 °C, so for a hot melt this is only an estimate — in practice a bit more is needed.
        <DataBookNote>the report&rsquo;s &ldquo;greater than 3.73 V&rdquo; is 1.36 − (−2.37): it used Mg²⁺/Mg = −2.37 V, the Data Book value at the time. The 2026 Data Book gives −2.36 V, so the minimum is 3.72 V. Either way the point is the same: apply a voltage above the cell&rsquo;s E° difference.</DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        Use <b>inert electrodes</b> (e.g. graphite). At the <b>cathode (negative)</b>, Mg²⁺ is <b>reduced</b>:{' '}
        <Chem eq="Mg2+ + 2e- -> Mg(l)" />; at the anode (positive) Cl⁻ is oxidised: <Chem eq="2Cl- -> Cl2(g) + 2e-" />. The cell
        is designed to <b>keep the Mg and Cl₂ separated</b> so they cannot react back together.
      </>
    ),
    reason: <>Mark 3: any one of the cathode reaction, inert electrodes, or keeping the products separate. Writing all three is the safe way to earn it. (The Mg forms as a liquid because molten MgCl₂ is hotter than magnesium&rsquo;s melting point.)</>,
  },
]

export default function ChemistryQ2_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (7 marks)</p>
        <p className="mb-2">
          Research scientists are developing a rechargeable magnesium–sodium, Mg–Na, hybrid cell for use in
          portable devices.
          <br />
          The Mg–Na hybrid cell uses magnesium metal and sodium ion electrodes and a hybrid organic/salt
          electrolyte, X.
          <br />
          A simplified diagram of the rechargeable Mg–Na hybrid cell is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="The Mg–Na hybrid cell: a Mg electrode (left, with an empty box beside it) and a Na ion electrode (right) on either side of a hybrid organic/salt electrolyte X, joined through an external load — from the original 2021 VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">a.</p>
        <p>
          The equation for the overall reaction during <b>recharge</b> is
          <br />
          <Chem eq="2NaX + Mg2+ -> Mg + 2Na+ + 2X" />
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Electrode Polarity"
        marks={1}
        statement={
          <>
            Identify the polarity of the Mg electrode when the cell is discharging by placing a positive (+) or a
            negative (−) sign in the box provided in the diagram above.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            The equation given is for <b>recharge</b>, but the question asks about <b>discharge</b> — so first
            reverse it. Then ask: is Mg oxidised or reduced? Oxidation means anode, and in a discharging
            (galvanic) cell the anode is negative. Only 58% got this mark — an easy slip is to work from the
            recharge equation as printed.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme source="ours" points={[{ point: <>A <b>negative (−)</b> sign in the box for the Mg electrode.</> }]} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Half-Equations"
        marks={1}
        statement={
          <>
            Write the half-cell equation of the reaction that occurs at the Mg electrode when the cell is{' '}
            <b>discharging</b>.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Part a.i already found that Mg is oxidised on discharge. Write that as an oxidation half-equation,
            with electrons on the <b>product</b> side and a <b>one-way arrow</b> — the reaction is going in one
            direction only while the cell discharges, and the report rejected equilibrium arrows.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme source="ours" points={[{ point: <><b>Mg → Mg²⁺ + 2e⁻</b>, with a <b>single (one-way) arrow</b>; states optional.</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Cell Safety Hazards"
        marks={2}
        statement={
          <>
            A pacemaker is a small electronic device that is implanted in the body to regulate a person&rsquo;s heart
            rate.
            <br />
            If the Mg–Na hybrid cell were to be used to power pacemakers, what would be <b>two</b> potential safety
            hazards of having this cell in the body?
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two separate hazards — and each must be about <b>this</b> cell: name the part of the
            Mg–Na cell (its electrolyte, its Mg metal, its ions, its heat output) and say what it could do to the
            body. Only 9% scored both marks; the report says general answers not linked to this cell were not
            accepted.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>One hazard <b>specific to this cell</b>, e.g. leaking <b>electrolyte is toxic/harmful/corrosive</b> to the body.</> },
            { point: <>A second, different specific hazard, e.g. <b>Mg is reactive</b> and may react in the body; the cell may <b>overheat</b>; leaked ions upset the body&rsquo;s <b>Mg²⁺/Na⁺ balance</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Electrolysis of Molten Salts"
        marks={3}
        statement={
          <>
            One source of Mg is magnesium chloride, MgCl₂, which can be obtained from seawater.
            <br />
            Explain how Mg can be produced from MgCl₂ in an electrolytic cell.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Three marks means three ideas: the <b>state</b> of the electrolyte (it must be <b>molten</b>), the
            <b> energy input</b> (a power supply, because the reaction is non-spontaneous), and one detail of the
            cell itself (what happens at the cathode, inert electrodes, or keeping the products apart). The trap
            the report describes is electrolysing an <b>aqueous</b> solution — water is reduced before Mg²⁺, so no
            Mg forms.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The need for <b>molten MgCl₂</b> (molten Mg²⁺ salt) — not an aqueous solution.</> },
            { point: <>The need for <b>electrical energy to be supplied</b> (a power supply, voltage greater than about 3.7 V).</> },
            { point: <>Any one of: the <b>reaction at the cathode</b> (Mg²⁺ + 2e⁻ → Mg); a cell design that <b>separates the products</b> (Mg and Cl₂); <b>inert electrodes</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
