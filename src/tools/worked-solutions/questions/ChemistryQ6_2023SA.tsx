// 2023 Chemistry Exam, Section B Question 6 (7 marks). An experimental secondary (flow) cell
// running on Fe³⁺/Fe²⁺ and an organic C₁₄H₈O₈S₂/C₁₄H₁₀O₈S₂ couple: the energy transformation on
// discharge, the oxidising agent justified with oxidation numbers, the recharge half-equation,
// the electrode's polarity on recharge, and why polarity does not change on recharge. Question
// text and the overall equation are transcribed from the original paper; the cell diagram is
// cropped from the original VCAA exam PDF. VCAA report only (no second source); the report
// itemises the marks for parts b. and c.iii.; the mark schemes for the one-mark parts are our
// reading. The worked solutions, "How to Think About It" notes and model answers are original.
// The 2023 report prints its mark distributions as proportions (0.2, 0.8) under a "%" heading;
// they are stored here as percentages (20, 80). Equation balance (atoms and charge) checked in
// Python.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import cellSrc from './chem-2023sa-q6-cell.png'

const EXAM_A: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: <>chemical energy → electrical energy</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 30, 30],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for either Fe₂(SO₄)₃ or Fe³⁺ as the oxidising agent.
      <br />
      The second mark was awarded for indicating that the oxidation number for iron changed from +3 to +2
      during this process and hence why Fe³⁺ was the oxidising agent.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <><Chem eq="C14H8O8S2 + 2H+ + 2e- -> C14H10O8S2" /></>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <>Negative</>,
}

const EXAM_CIII: SAExaminerStats = {
  marks: [70, 20, 10],
  average: 0.4,
  comment: (
    <>
      The first mark was awarded for the recognition that the electrode polarity does not change when the
      system is changed from discharge to recharge. The relative reductive and oxidative strength of the
      chemicals present in the galvanic cell is what determines the polarity, and this is fixed for both the
      discharge and recharge processes.
      <br />
      The second mark was awarded for the recognition that the external power source causes the{' '}
      <i>process</i> to change at each electrode. This means that during the recharge the positive electrode
      becomes the anode and oxidation occurs here. This reversal of processes means that the original
      chemicals can be re-formed and hence the cell is recharged.
      <br />
      Students frequently referred to the electrode polarity &lsquo;swapping&rsquo; during recharge and this
      is an incorrect statement.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <b>chemical energy → electrical energy</b>,
    reason: (
      <>
        During <b>discharge</b> a secondary cell works as a <b>galvanic cell</b>: a spontaneous redox reaction
        releases the energy stored in the chemicals as an electric current through the load. (Recharging is
        the reverse: electrical → chemical.) Write both forms of energy and the direction, with an arrow.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>In Fe₂(SO₄)₃, Fe is <b>+3</b> (Fe³⁺); in FeSO₄, Fe is <b>+2</b> (Fe²⁺).</>,
    reason: (
      <>
        Sulfate is SO₄²⁻. Fe₂(SO₄)₃ is neutral: 2x + 3(−2) = 0, so x = +3. FeSO₄: x + (−2) = 0, so x = +2.
      </>
    ),
  },
  {
    working: <>The oxidation number of iron <b>decreases from +3 to +2</b>, so Fe³⁺ <b>gains electrons</b> and is <b>reduced</b>.</>,
    reason: <>Mark 2: the oxidation-number change is the justification the question asks for. A decrease in oxidation number = reduction.</>,
  },
  {
    working: <b>Fe₂(SO₄)₃ (that is, Fe³⁺) is the oxidising agent</b>,
    reason: (
      <>
        Mark 1. The oxidising agent is the species that is <b>itself reduced</b> — it takes electrons from
        (oxidises) the other reactant, C₁₄H₁₀O₈S₂, which loses two H atoms to become C₁₄H₈O₈S₂. Either
        Fe₂(SO₄)₃ or Fe³⁺ was accepted.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>Discharge (oxidation): <Chem eq="C14H10O8S2 -> C14H8O8S2 + 2H+ + 2e-" /></>,
    reason: (
      <>
        Start from the discharge equation: the organic compound loses 2 H, which leave as <b>2H⁺</b>, so{' '}
        <b>2e⁻</b> are released. Charge check: 0 on the left, 2(+1) + 2(−1) = 0 on the right.
      </>
    ),
  },
  {
    working: <b><Chem eq="C14H8O8S2(aq) + 2H+(aq) + 2e- -> C14H10O8S2(aq)" /></b>,
    reason: (
      <>
        <b>Recharge reverses</b> the discharge reaction, so reverse the half-equation: C₁₄H₈O₈S₂ is now{' '}
        <b>reduced</b> (electrons on the left). Atoms balance (C 14, H 10, O 8, S 2 each side) and charge
        balances (0 = 0). States are optional here — the report&rsquo;s answer has none.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>During discharge this half-cell is the <b>anode</b> (oxidation of C₁₄H₁₀O₈S₂), so its electrode is <b>negative</b>.</>,
    reason: (
      <>
        In a galvanic cell, oxidation at the anode releases electrons onto that electrode, so the anode is
        negative. (The diagram shows H⁺ crossing the membrane both ways: on discharge, the H⁺ released by this
        oxidation moves to the iron side, as in the top arrow; on recharge it moves back.)
      </>
    ),
  },
  {
    working: <b>Negative</b>,
    reason: (
      <>
        During recharge the electrode is connected to the <b>negative terminal</b> of the power supply, which
        pushes electrons onto it — exactly what the reduction in part c.i needs. So it stays{' '}
        <b>negative</b> (it is now the cathode). Don&rsquo;t answer &ldquo;positive&rdquo; on the idea that
        &ldquo;everything reverses&rdquo; — the reactions reverse, the polarity does not (the report&rsquo;s
        point in part c.iii).
      </>
    ),
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: (
      <>
        The <b>polarity of the electrodes does not change</b> between discharge and recharge. It is set by
        the <b>relative strengths of the oxidising and reducing agents</b> in the cell: Fe³⁺ is the stronger
        oxidising agent, so the Fe³⁺/Fe²⁺ electrode is <b>positive</b> and the C₁₄H₈O₈S₂/C₁₄H₁₀O₈S₂ electrode
        is <b>negative</b>, both on discharge and on recharge.
      </>
    ),
    reason: <>Mark 1: polarity is fixed, and why. The report says students frequently wrote that the polarity &lsquo;swaps&rsquo; on recharge — that is wrong.</>,
  },
  {
    working: (
      <>
        To recharge, the <b>positive terminal of the external power supply</b> is connected to the{' '}
        <b>positive electrode</b> and the <b>negative terminal</b> to the <b>negative electrode</b>. The
        supply forces electrons in the <b>reverse direction</b>, so the <b>process at each electrode
        reverses</b>: the positive electrode becomes the <b>anode</b> (oxidation, Fe²⁺ → Fe³⁺) and the negative
        electrode becomes the <b>cathode</b> (reduction, C₁₄H₈O₈S₂ → C₁₄H₁₀O₈S₂), <b>re-forming the original
        reactants</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: the power source reverses the <i>processes</i> (anode/cathode swap), not the signs. Note the
        names change — in an electrolytic (recharging) cell the anode is <b>positive</b> — while the +/− labels
        stay put. The supply&rsquo;s voltage must be larger than the cell&rsquo;s so it can drive the
        non-spontaneous reverse reaction.
      </>
    ),
  },
]

export default function ChemistryQ6_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (7 marks)</p>
        <p className="mb-2">Scientists are currently researching an experimental secondary cell.</p>
        <p className="mb-2">The following reaction takes place in the experimental cell during discharge.</p>
        <p className="mb-2 text-center">
          <Chem eq="Fe2(SO4)3(aq) + C14H10O8S2(aq) -> 2FeSO4(aq) + C14H8O8S2(aq) + HSO4-(aq) + H+(aq)" />
        </p>
        <p className="mb-3">A diagram of the experimental cell is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={cellSrc}
            alt="Flow cell: a tank of Fe₂(SO₄)₃(aq) and FeSO₄(aq) on the left and a tank of C₁₄H₁₀O₈S₂(aq) and C₁₄H₈O₈S₂(aq) on the right, each pumped through a half-cell with a carbon electrode; the half-cells are separated by a membrane with H⁺(aq) arrows in both directions, and the electrodes are connected through a load — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Energy Transformation"
        marks={1}
        statement={<>State the energy transformation that occurs in the experimental cell during discharge.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Discharging a rechargeable cell is just a galvanic cell powering a load. Name the energy the
            reactants store and the energy delivered to the load, in that order — one mark, one transformation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="ours" points={[{ point: <><b>Chemical energy → electrical energy</b> (in that direction).</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Oxidising Agent"
        marks={2}
        statement={
          <>
            Which reactant is the oxidising agent in the experimental cell during discharge? Use oxidation
            numbers to justify your answer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Two marks: <b>name</b> the oxidising agent, then <b>justify</b> it with an oxidation-number change.
            The oxidising agent is the reactant that is <b>reduced</b>, so look for the element whose oxidation
            number <b>falls</b>. Iron is the easy one to track — work out its oxidation number in Fe₂(SO₄)₃ and
            in FeSO₄. Naming the agent without the numbers gets only one mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Fe₂(SO₄)₃</b> or <b>Fe³⁺</b> named as the <b>oxidising agent</b>.</> },
            { point: <>The <b>oxidation number of Fe changes from +3 to +2</b> (decreases — Fe³⁺ is <b>reduced</b>), which is why Fe³⁺ is the oxidising agent.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Recharge Half-Equation"
        marks={1}
        statement={
          <>
            Write the half-equation for the reaction that occurs in the C₁₄H₈O₈S₂/C₁₄H₁₀O₈S₂ half-cell during
            recharge.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            Recharge runs the discharge reaction <b>backwards</b>. So first write the discharge half-equation for
            this couple from the overall equation (C₁₄H₁₀O₈S₂ loses 2H⁺ and 2e⁻), then reverse it. Check that
            atoms and charge both balance.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="ours" points={[{ point: <>Correct, balanced <b>reduction</b> half-equation: <Chem eq="C14H8O8S2 + 2H+ + 2e- -> C14H10O8S2" />.</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Electrode Polarity"
        marks={1}
        statement={<>State the polarity of the C₁₄H₈O₈S₂/C₁₄H₁₀O₈S₂ half-cell electrode during recharge.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Polarity (+ or −) is not the same thing as anode/cathode. Work out the polarity on discharge — this
            half-cell is oxidised, so it is the negative anode — then remember that recharging connects
            negative to negative, so the sign does <b>not</b> change. Only half the cohort got this.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme source="ours" points={[{ point: <><b>Negative</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Recharge Polarity"
        marks={2}
        statement={<>Explain how the polarity of the electrodes is established during recharge to allow the recharge to occur.</>}
        examinerReport={EXAM_CIII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas. First: the polarity is <b>fixed</b> — it comes from which half-cell has the
            stronger oxidising agent, and that doesn&rsquo;t change on recharge. Second: the external power
            supply (+ to +, − to −) <b>reverses the processes</b> at each electrode, so the positive electrode
            becomes the anode and the reactants are re-formed. The trap the report names: saying the polarity
            &lsquo;swaps&rsquo;. 70% of students scored zero on this part.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>electrode polarity does not change</b> from discharge to recharge: it is set by the <b>relative oxidising and reducing strength</b> of the chemicals in the cell, which is the same for both processes.</> },
            { point: <>The <b>external power source</b> reverses the <b>process</b> at each electrode — the <b>positive electrode becomes the anode</b> (oxidation occurs there) — so the <b>original chemicals are re-formed</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
