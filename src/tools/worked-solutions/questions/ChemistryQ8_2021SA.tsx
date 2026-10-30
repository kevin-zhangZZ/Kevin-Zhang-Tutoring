// 2021 Chemistry Exam, Section B Question 8 (9 marks). The SO₂/O₂/SO₃ equilibrium: Kc from
// initial amounts and an equilibrium mass of SO₃, a Maxwell-Boltzmann curve at a lower
// temperature, and the effect of doubling the volume on [SO₂]. Question text transcribed from
// the original paper; the Maxwell-Boltzmann graph is cropped from the original VCAA exam PDF
// and our part b. answer is an SVG overlay on that crop (the lower-temperature curve is the
// printed curve compressed 1.55× horizontally and stretched 1.55× vertically about its start,
// so the area is unchanged to within about 1%, then smoothed with a tail that approaches the
// baseline). The report's sample graph is cropped from the VCAA examination report. VCAA
// report only; the "How to Think About It" notes, model answers and our mark schemes are
// original. Numbers checked in Python: M(SO₃) = 32.1 + 3 × 16.0 = 80.1 g mol⁻¹ (2026 Data
// Book), Kc = 0.3796… M⁻¹ = 0.380 M⁻¹ unrounded (the report's rounded values give 0.38 M⁻¹).
// The report's asterisks (*) appear without a footnote; kept verbatim.
// Study design: Kc with units and volume changes are on the 2024–2027 study design; the
// Maxwell-Boltzmann curve is not named in the key knowledge, but the effect of temperature on
// collision frequency/success is, and 2020 MCQ 28 (Maxwell-Boltzmann) is already in — kept.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import mbSrc from './chem-2021sa-q8b-mb-curve.png'
import reportGraphSrc from './chem-2021sa-q8b-report-graph.png'

const ORANGE = '#f97316'
const LABEL = { fill: '#c2410c', fontSize: 34, fontWeight: 600, stroke: 'white', strokeWidth: 8, paintOrder: 'stroke' } as const

// Lower-temperature curve in the crop's own pixel frame (1485 × 920); baseline gridline y = 751.
const LOW_T_PATH =
  'M396 751.0 L404 749.6 L412 746.7 L420 740.3 L428 729.1 L436 713.3 L444 693.2 L452 670.6 L460 646.8 L468 622.4 L476 597.8 L484 573.6 L492 549.2 L500 524.9 L508 500.7 L516 476.7 L524 452.9 L532 429.5 L540 407.2 L548 386.1 L556 366.9 L564 349.8 L572 335.5 L580 324.0 L588 315.0 L596 309.2 L604 305.9 L612 306.8 L620 310.7 L628 316.7 L636 324.7 L644 333.6 L652 344.5 L660 357.0 L668 370.6 L676 385.3 L684 401.0 L692 417.4 L700 434.5 L708 452.2 L716 469.8 L724 487.7 L732 506.0 L740 524.1 L748 542.2 L756 560.2 L764 577.5 L772 594.2 L780 609.8 L788 624.9 L796 638.5 L804 650.7 L812 662.1 L820 671.6 L828 680.3 L836 688.1 L844 695.1 L852 701.3 L860 706.8 L868 711.7 L876 716.2 L884 720.2 L892 723.9 L900 727.1 L908 729.8 L916 731.9 L924 733.6 L932 734.8 L940 735.9 L948 737.0 L956 738.0 L964 738.9 L972 739.7 L980 740.5 L988 741.3 L996 741.9 L1004 742.6 L1012 743.2 L1020 743.7 L1028 744.2 L1036 744.7 L1044 745.1 L1052 745.6 L1060 745.9 L1068 746.3 L1076 746.6 L1084 746.9 L1092 747.2 L1100 747.5 L1108 747.7 L1116 748.0 L1124 748.2 L1132 748.4 L1140 748.6 L1148 748.7 L1156 748.9 L1164 749.0 L1172 749.2 L1180 749.3 L1188 749.4 L1196 749.5 L1204 749.6 L1212 749.7 L1220 749.8 L1228 749.9 L1236 750.0 L1244 750.0 L1252 750.1 L1260 750.2 L1268 750.2 L1276 750.3 L1284 750.3 L1290 750.4'

function MBGraph({ answer }: { answer?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <img
          loading="lazy"
          decoding="async"
          src={mbSrc}
          alt={
            answer
              ? "VCAA's Maxwell-Boltzmann distribution curve for SO₃ with our lower-temperature curve drawn over it: the new peak is further left and higher, and the curve falls away sooner with a shorter tail"
              : 'Maxwell-Boltzmann distribution curve: number of particles against kinetic energy, a single peaked curve with a long tail to the right — from the original 2021 VCAA exam paper'
          }
          className="w-full block"
        />
        {answer && (
          <svg viewBox="0 0 1485 920" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path d={LOW_T_PATH} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
            <text x={640} y={285} {...LABEL}>lower T</text>
            <text x={880} y={445} {...LABEL}>original T</text>
          </svg>
        )}
      </div>
    </div>
  )
}

const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1'

const EXAM_A: SAExaminerStats = {
  marks: [24, 11, 12, 21, 31],
  average: 2.3,
  comment: (
    <>
      Multiple approaches were evident in students&rsquo; responses to this question. The following is
      representative of one common approach:
      <br />
      <i>n</i>(SO₃) at equilibrium = 20.0 / 80.1 = 0.25 mol*
      <table className="my-2 text-[13px]">
        <tbody>
          <tr><td className={TD}></td><td className={TD}>n(SO₂) (mol)</td><td className={TD}>n(O₂) (mol)</td><td className={TD}>n(SO₃) (mol)</td></tr>
          <tr><td className={TD}>Initial</td><td className={TD}>1.00</td><td className={TD}>1.00</td><td className={TD}>0.00</td></tr>
          <tr><td className={TD}>Change</td><td className={TD}>-2x</td><td className={TD}>-x</td><td className={TD}>+2x</td></tr>
          <tr><td className={TD}>Final*</td><td className={TD}>1.00-0.25 = 0.75</td><td className={TD}>1.00-0.125 = 0.875</td><td className={TD}>0.25</td></tr>
        </tbody>
      </table>
      Therefore
      <br />
      [SO₂]<sub>eqm</sub> = 0.75/3.00 = 0.25 M, [O₂]<sub>eqm</sub> = 0.875/3.00 = 0.292 M, [SO₃]<sub>eqm</sub> = 0.25/3.00 = 0.083 M*
      <br />
      K = [SO₃]² / ([SO₂]²[O₂]) = 0.083² / (0.25² ×0.292) = 0.38 M⁻¹*
      <br />
      In order to gain full marks, students were required to submit the final calculated value with the
      correct units. Consequential marks were awarded when students were able to show clear calculations.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 21, 37],
  average: 1.0,
  comment: (
    <>
      Two key points were required to be shown:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The new peak had to be shifted to the left of the original peak.</li>
        <li>The new peak had to be higher than the original peak.</li>
      </ul>
      In order for both marks to be awarded, the new curve also had to be of roughly equivalent area.
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The report's sample answer: the original Maxwell-Boltzmann curve with a red dashed lower-temperature curve whose peak is further left and higher, falling to a shorter tail"
        className="block w-full max-w-[360px] mt-1"
      />
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 30, 19, 16],
  average: 1.2,
  comment: (
    <>
      Responses had to be linked to the effect on the concentration of SO₂, as follows:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>As the volume doubles, the concentration of SO₂ <u>halves</u>.</li>
        <li>As the system moves to re-establish equilibrium, the concentration of SO₂ gradually increases.</li>
        <li>
          Once equilibrium is reached, the final concentration of SO₂ is still lower than the original
          concentration (before volume increase).
        </li>
      </ul>
      Although it was not explicitly required, some students included a concentration-time graph that
      assisted them to communicate their understanding.
      <br />
      The most common issue for students was a lack of clarity when explaining the effect. A lot of
      students discussed the cause that underpinned this change, which was not required by the question.
      This highlights the need for students to make sure that they clearly read the stem of each question
      and apply a response that is appropriate to what is required of them.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>n(SO₃) = m / M = 20.0 g / 80.1 g mol⁻¹ = 0.2496… mol</>,
    reason: <>The only equilibrium quantity you are given is a <b>mass</b>, so turn it into moles first. M(SO₃) = 32.1 + 3 × 16.0 = 80.1 g mol⁻¹ (Data Book). Keep it unrounded.</>,
  },
  {
    working: <>n(SO₂) reacted = n(SO₃) formed = 0.2496… mol (mole ratio SO₂ : SO₃ = 2 : 2)</>,
    reason: <>Started with no SO₃, so all of it was made by the forward reaction. From the equation, 2 mol SO₂ makes 2 mol SO₃ — a <b>1 : 1</b> ratio.</>,
  },
  {
    working: <>n(O₂) reacted = ½ × n(SO₃) formed = 0.1248… mol (mole ratio O₂ : SO₃ = 1 : 2)</>,
    reason: <>Only 1 mol O₂ is used for every 2 mol SO₃ formed — an easy ratio to get wrong.</>,
  },
  {
    working: <>n(SO₂)<sub>eqm</sub> = 1.00 − 0.2496… = 0.7503… mol; n(O₂)<sub>eqm</sub> = 1.00 − 0.1248… = 0.8751… mol</>,
    reason: <>Equilibrium amount = initial − reacted. This is the &ldquo;Initial / Change / Equilibrium&rdquo; (ICE) table in the report, written as two lines.</>,
  },
  {
    working: <>c = n / V: [SO₂] = 0.7503…/3.00 = 0.2501… M; [O₂] = 0.8751…/3.00 = 0.2917… M; [SO₃] = 0.2496…/3.00 = 0.08323… M</>,
    reason: <>K<sub>c</sub> uses <b>concentrations</b> (mol L⁻¹), not amounts — divide every amount by the <b>3.00 L</b> volume. Using moles directly gives the wrong answer here, because the volume doesn&rsquo;t cancel (2 + 1 ≠ 2).</>,
  },
  {
    working: <>K<sub>c</sub> = [SO₃]² / ([SO₂]²[O₂])</>,
    reason: <>Products over reactants, each raised to its <b>coefficient</b> from the equation (2, 2 and 1).</>,
  },
  {
    working: <>K<sub>c</sub> = (0.08323… M)² / ((0.2501… M)² × 0.2917… M)</>,
  },
  {
    working: <b>K<sub>c</sub> = 0.380 M⁻¹ (at 100 °C)</b>,
    reason: (
      <>
        (0.3796… unrounded.) Units: M² ÷ (M² × M) = <b>M⁻¹</b> (L mol⁻¹) — the report says full marks needed
        the <b>correct units</b>. Three significant figures, from 20.0 g, 1.00 mol and 3.00 L. The report rounds
        along the way (0.25 mol, 0.083 M) and gets 0.38 M⁻¹ — the same answer. Plausible: only a quarter of the
        SO₂ has reacted, so K is not large.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <MBGraph answer />,
    reason: (
      <>
        At a lower temperature the SO₃ molecules have a lower <b>average kinetic energy</b>, so the peak moves{' '}
        <b>to the left</b> (Mark 1). The <b>number of molecules is unchanged</b>, so the area under the curve
        stays the same: a curve squeezed to the left must be <b>taller</b> (Mark 2) and its right-hand tail
        drops away sooner. Start both curves from the same point, and keep the tail above the axis.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>When the volume doubles, the concentration of SO₂ <b>immediately halves</b> (as do all the concentrations).</>,
    reason: <>Mark 1. The same amount of SO₂ is now spread through twice the volume, and c = n/V. The change is <b>instant</b> — draw it as a vertical drop on a concentration–time graph.</>,
  },
  {
    working: <>As the system re-establishes equilibrium, the concentration of SO₂ <b>gradually increases</b>.</>,
    reason: <>Mark 2. The cause (not asked for): lower pressure favours the side with more gas particles — the <b>reverse</b> reaction (3 mol gas on the left vs 2 on the right), which makes SO₂.</>,
  },
  {
    working: <>At the new equilibrium, the concentration of SO₂ is <b>still lower than its original concentration</b> before the volume change.</>,
    reason: <>Mark 3. Le Chatelier&rsquo;s principle says the system only <b>partially opposes</b> the change, so [SO₂] rises back only part of the way. The question asks you to <b>describe the effect</b> on [SO₂] — the report notes that &ldquo;a lot of students discussed the cause&rdquo;, which was not required.</>,
  },
]

export default function ChemistryQ8_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (9 marks)</p>
        <p className="mb-2">The reaction for the oxidation of sulfur dioxide, SO₂, is shown below.</p>
        <p className="text-center">
          <Chem eq="2SO2(g) + O2(g) <=> 2SO3(g)" />
          <span className="ml-8"><i>ΔH</i> = −197 kJ mol⁻¹</span>
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Equilibrium Constant"
        marks={4}
        statement={
          <>
            1.00 mol of SO₂ and 1.00 mol of oxygen, O₂, are placed into an evacuated, sealed 3.00 L container
            at 100 °C. After the reaction reaches equilibrium, the container contains 20.0 g of sulfur
            trioxide, SO₃.
            <br />
            Calculate the equilibrium constant, <i>K</i><sub>c</sub>, for this reaction at 100 °C.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            You are given <b>starting amounts</b> and one <b>equilibrium amount</b>, so this is an ICE-table
            question: use the SO₃ formed and the <b>mole ratios</b> to work out how much SO₂ and O₂ were used
            up, subtract from the starting amounts, then convert every amount to a <b>concentration</b> before
            substituting into K<sub>c</sub>. Four marks track those stages: n(SO₃), the equilibrium amounts,
            the concentrations, and K<sub>c</sub> — which needs its <b>units</b> for full marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>n(SO₃) = 20.0 / 80.1 = 0.250 mol</b> at equilibrium.</> },
            { point: <>Equilibrium amounts using the <b>mole ratios</b>: <b>n(SO₂) = 0.750 mol</b>, <b>n(O₂) = 1.00 − ½ × 0.250 = 0.875 mol</b>.</> },
            { point: <><b>Equilibrium concentrations</b> (÷ 3.00 L): [SO₂] = 0.250 M, [O₂] = 0.292 M, [SO₃] = 0.0832 M.</> },
            { point: <><b>K<sub>c</sub> = [SO₃]² / ([SO₂]²[O₂]) = 0.380 M⁻¹</b>, <b>with units</b>. (Consequential marks for clear working.)</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Maxwell-Boltzmann Curve"
        marks={2}
        statement={
          <>
            The graph below shows the Maxwell-Boltzmann distribution curve for the SO₃ molecules in the
            container at a particular temperature.
            <br />
            On the graph, draw the Maxwell-Boltzmann distribution curve of SO₃ at a significantly lower
            temperature.
            <div className="mt-3">
              <MBGraph />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            A Maxwell-Boltzmann curve shows how many molecules have each kinetic energy. Lowering the
            temperature changes the <b>spread</b> of energies, not the <b>number</b> of molecules. Two marks,
            two features: the peak moves <b>left</b>, and the peak is <b>higher</b> — because the area under the
            curve (the total number of molecules) must stay <b>roughly the same</b>, which the report required
            for both marks. A curve that is just shifted left without getting taller loses a mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The new peak is <b>shifted to the left</b> of the original peak (lower average kinetic energy).</> },
            { point: <>The new peak is <b>higher</b> than the original peak. For both marks the curve must also have <b>roughly the same area</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Volume Change"
        marks={3}
        statement={
          <>
            The volume of the closed container is doubled.
            <br />
            Describe the effect that this has on the concentration of SO₂ from the time just before the
            volume was changed until after the system re-established its equilibrium.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Describe the effect … from just before … until after&rdquo; asks for a <b>story in time</b>{' '}
            about one thing: [SO₂]. Picture its concentration–time graph and narrate it in three stages — the
            instant of the change, the shift that follows, and where it ends up compared with the start. Three
            marks, one per stage. The trap the report names: explaining <i>why</i> the equilibrium shifts
            (pressure, Le Chatelier) instead of saying <i>what happens</i> to [SO₂].
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>As the volume doubles, [SO₂] <b>halves</b> (immediately).</> },
            { point: <>As the system re-establishes equilibrium, [SO₂] <b>gradually increases</b>.</> },
            { point: <>At the new equilibrium, [SO₂] is <b>still lower than the original concentration</b> (before the volume increase).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
