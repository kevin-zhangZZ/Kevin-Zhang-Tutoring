// 2020 Chemistry Exam, Section B Question 1 (9 marks). Methanol from biogas,
// CO(g) + 2H₂(g) ⇌ CH₃OH(g), ΔH < 0: sketching the catalysed pathway on an energy profile,
// the effect of temperature and of pressure on the yield (Le Chatelier's principle), the Kc
// expression, and a Kc calculation from initial amounts and an equilibrium amount.
// Question text transcribed from the original paper; the energy profile diagram is cropped from
// the original VCAA exam PDF, and the report's sample sketch for part a. is cropped from the VCAA
// examination report. Mark allocations: the report marks parts b.i, b.ii and d. with asterisks
// (itemised), parts a. and c. are single marks (our reading). VCAA report only; the worked
// solutions, "How to Think About It" notes and model answers are original. Kc recomputed in
// Python (0.6054… M⁻²). All content is on the current (2024–) study design; no Data Book values
// are needed.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import profileSrc from './chem-2020sa-q1-energy-profile.png'
import reportGraphSrc from './chem-2020sa-q1a-report-graph.png'

const td = 'border border-gray-300 dark:border-gray-700 px-2.5 py-1'

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="VCAA's sample answer: the uncatalysed energy profile as a solid line and the catalysed reaction as a dashed line with a lower peak, starting at the CO + 2H₂ level and ending at the CH₃OH level"
        className="w-full max-w-[360px] mt-1 bg-white"
      />
      <br />
      Students needed to ensure that the line drawn started and finished at the correct location.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 15, 57],
  average: 1.3,
  comment: (
    <>
      Either of: *
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The yield is higher at low temperatures.</li>
        <li>The yield is lower at high temperatures.</li>
      </ul>
      Either of the following was required for the second mark.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Forward reaction is exothermic so, according to Le Chatelier&rsquo;s principle, if the temperature is
          lowered the system will move to raise the temperature (partially compensate) by favouring the
          exothermic forward reaction.
        </li>
        <li>
          Forward reaction is exothermic so, according to Le Chatelier&rsquo;s principle, if the temperature is
          increased the system will move to lower the temperature (partially compensate) by favouring the
          endothermic backward (reverse) reaction.
        </li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [22, 22, 55],
  average: 1.3,
  comment: (
    <>
      Either of: *
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The yield is greater at high pressure.</li>
        <li>The yield is lower at low pressure.</li>
      </ul>
      Either of the following responses was required for the second mark.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          According to Le Chatelier&rsquo;s principle, at high pressure, the system moves to decrease pressure by
          favouring the reaction that produces fewer particles in a given volume (forward reaction, 3 mol → 1
          mol), thus increasing the yield of methanol.
        </li>
        <li>
          According to Le Chatelier&rsquo;s principle, at low pressure, the system moves to increase pressure by
          favouring the reaction that produces more particles in a given volume (back reaction, 1 mol → 3 mol),
          thus decreasing the yield of methanol.
        </li>
      </ul>
      In both responses to Question bi. and Question bii., many students wrongly attempted to explain the
      process by using the change in rates or yield instead of using Le Chatelier&rsquo;s principle. Many
      students also lost time by explaining both a higher and a lower change (temperature/pressure), which
      they then found difficult to fit into the space provided.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [17, 83],
  average: 0.8,
  comment: (
    <>
      <Katex tex="K_c = \dfrac{[CH_3OH]}{[CO][H_2]^2}" />
      <br />
      The most common mistake was the accidental use of CO₂ rather than CO.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [27, 16, 23, 34],
  average: 1.6,
  comment: (
    <>
      <div className="overflow-x-auto my-1">
        <table className="text-[12.5px] border border-gray-300 dark:border-gray-700">
          <tbody>
            <tr><td className={td}></td><td className={td}>CO</td><td className={td}>H₂</td><td className={td}>CH₃OH</td></tr>
            <tr><td className={td}>n<sub>initial</sub></td><td className={td}>0.760 mol</td><td className={td}>0.525 mol</td><td className={td}>0</td></tr>
            <tr><td className={td}>n<sub>change</sub></td><td className={td}>-0.122 mol</td><td className={td}>-2x0.122 mol</td><td className={td}>+0.122 mol</td></tr>
            <tr><td className={td}>n<sub>equilibrium</sub> *</td><td className={td}>0.638 mol</td><td className={td}>0.281 mol</td><td className={td}>0.122 mol</td></tr>
            <tr><td className={td}>Final concentrations *</td><td className={td}>0.638/0.500 = 1.276 M</td><td className={td}>0.281/0.500 = 0.562 M</td><td className={td}>0.122/0.500 = 0.244 M</td></tr>
          </tbody>
        </table>
      </div>
      <Katex tex="K_c = \dfrac{[0.244]}{[1.276][0.562]^2} = 0.605\ M^{-2}" /> * (correct units and significant figures)
      <br />
      Students needed to be careful with correct units and significant figures. Those who set up a table
      usually made fewer mistakes than those who didn&rsquo;t. The failure to notice the stoichiometry of the
      equation was a common error, as was the use of the mol values rather than the concentrations when
      calculating the value of the equilibrium constant.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        Draw the catalysed pathway as a second (e.g. dashed) curve that <b>starts at the CO + 2H₂ level</b>,
        rises to a <b>lower peak</b> than the original, and <b>finishes at the CH₃OH level</b>.
        <img
          loading="lazy"
          decoding="async"
          src={reportGraphSrc}
          alt="VCAA's sample sketch: dashed catalysed curve with a lower peak between the same reactant and product levels"
          className="w-full max-w-[360px] mt-2 bg-white"
        />
      </>
    ),
    reason: (
      <>
        A catalyst provides an <b>alternative reaction pathway</b> with a <b>lower activation energy</b>, so only the
        peak drops. The reactants and products are the same substances, so their enthalpies — and ΔH — are{' '}
        <b>unchanged</b>. (Sketch shown is VCAA&rsquo;s sample answer from the report.) A curve that starts or ends at
        a different height is the error the report warns about.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The yield of methanol is <b>higher at low temperatures</b>.</>,
    reason: <>Mark 1: the effect on yield. State one direction only — the report says explaining both a rise and a fall wasted time and space.</>,
  },
  {
    working: (
      <>
        The <b>forward reaction is exothermic</b> (ΔH &lt; 0). According to <b>Le Chatelier&rsquo;s principle</b>, if
        the temperature is lowered the system will <b>partially compensate</b> by moving to raise the temperature, so
        it <b>favours the exothermic forward reaction</b>, which releases heat. The equilibrium position shifts to the
        right, increasing the yield of CH₃OH.
      </>
    ),
    reason: (
      <>
        Mark 2: the Le Chatelier explanation. It must link three things: ΔH &lt; 0 means forward is exothermic → the
        system opposes the change → the exothermic direction is favoured. Talking about reaction <i>rates</i> (a
        lower temperature slows the reaction) does not answer a <i>yield</i> question and is the error the report
        names.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>The yield of methanol is <b>greater at high pressure</b>.</>,
    reason: <>Mark 1: the effect on yield.</>,
  },
  {
    working: (
      <>
        According to <b>Le Chatelier&rsquo;s principle</b>, at high pressure the system will <b>partially compensate</b>{' '}
        by moving to <b>decrease the pressure</b>, so it <b>favours the reaction that produces fewer gas particles</b>:
        the <b>forward reaction</b>, <b>3 mol of gas → 1 mol of gas</b>. The equilibrium shifts to the right, increasing
        the yield of methanol.
      </>
    ),
    reason: (
      <>
        Mark 2: count moles of gas from the equation — 1 CO + 2 H₂ = 3 mol on the left, 1 CH₃OH on the right. Fewer
        particles in the same volume means lower pressure, which is how the system opposes the increase. Again, rates
        (more frequent collisions) are not the reason for the yield change.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <b><Katex tex="K_c = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}][\mathrm{H_2}]^2}" /></b>,
    reason: (
      <>
        Products over reactants, each concentration raised to the power of its <b>coefficient</b> in the equation —
        hence [H₂]<sup>2</sup>. All three species are gases, so all appear. Read the formula carefully: the reactant
        is <b>CO</b> (carbon monoxide); writing CO₂ is the most common mistake in the report.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <><Chem eq="CO(g) + 2H2(g) <=> CH3OH(g)" /></>,
    reason: <>Start from the equation — the mole ratio CO : H₂ : CH₃OH = 1 : 2 : 1 controls how much of each reactant is used up.</>,
  },
  {
    working: <>n(CO) reacted = n(CH₃OH) formed = 0.122 mol</>,
    reason: <>No methanol was present at the start, so all 0.122 mol formed by reaction; 1 : 1 ratio with CO.</>,
  },
  {
    working: <>n(H₂) reacted = 2 × n(CH₃OH) formed = 2 × 0.122 = 0.244 mol</>,
    reason: <>The 1 : 2 ratio — forgetting the 2 is the &ldquo;stoichiometry&rdquo; error the report lists.</>,
  },
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-[12.5px] border border-gray-300 dark:border-gray-700">
          <tbody>
            <tr><td className={td}></td><td className={td}>CO</td><td className={td}>H₂</td><td className={td}>CH₃OH</td></tr>
            <tr><td className={td}>initial (mol)</td><td className={td}>0.760</td><td className={td}>0.525</td><td className={td}>0</td></tr>
            <tr><td className={td}>change (mol)</td><td className={td}>−0.122</td><td className={td}>−0.244</td><td className={td}>+0.122</td></tr>
            <tr><td className={td}><b>equilibrium (mol)</b></td><td className={td}><b>0.638</b></td><td className={td}><b>0.281</b></td><td className={td}><b>0.122</b></td></tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>Mark 1: the equilibrium amounts. Equilibrium = initial + change. The report notes students who set up a table like this made fewer mistakes.</>,
  },
  {
    working: <>c = n / V, with V = 500 mL = 0.500 L</>,
    reason: <>K<sub>c</sub> uses <b>concentrations</b> (mol L⁻¹), not amounts — using mol values was a common error. Convert mL to L first.</>,
  },
  {
    working: <>[CO] = 0.638 mol / 0.500 L = 1.276 M; [H₂] = 0.281 mol / 0.500 L = 0.562 M; [CH₃OH] = 0.122 mol / 0.500 L = 0.244 M</>,
    reason: <>Mark 2: the equilibrium concentrations.</>,
  },
  {
    working: <><Katex tex="K_c = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}][\mathrm{H_2}]^2} = \dfrac{0.244\ \mathrm{M}}{1.276\ \mathrm{M} \times (0.562\ \mathrm{M})^2}" /></>,
    reason: <>Substitute into the expression from part c. — remember to square [H₂].</>,
  },
  {
    working: <><Katex tex="K_c = 0.6054\ldots\ \mathrm{M^{-2}}" /></>,
    reason: <>Units: M ÷ (M × M²) = M⁻² (that is, mol⁻² L²).</>,
  },
  {
    working: <b><Katex tex="K_c = 0.605\ \mathrm{M^{-2}}" /></b>,
    reason: (
      <>
        Mark 3: value with <b>units</b> and <b>three significant figures</b> — every datum (0.760, 0.525, 0.122, 0.500 L)
        has three. Sanity check: every equilibrium amount is positive (H₂ is the reactant closest to running out, 0.281 mol left), so the numbers are consistent.
      </>
    ),
  },
]

export default function ChemistryQ1_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (9 marks)</p>
        <p className="mb-2">
          Methanol is a very useful fuel. It can be manufactured from biogas.
          <br />
          The main reaction in methanol production from biogas is represented by the following equation.
        </p>
        <p className="mb-3 text-center">
          <Chem eq="CO(g) + 2H2(g) <=> CH3OH(g)" />
          <span className="ml-8"><i>ΔH</i> &lt; 0</span>
        </p>
        <p className="mb-3">
          This reaction requires the use of a catalyst to maximise the yield of methanol produced in optimum
          conditions. The energy profile diagram below represents the uncatalysed reaction.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={profileSrc}
            alt="Energy profile of the uncatalysed reaction: enthalpy change (kJ mol⁻¹) against reaction progress, with CO + 2H₂ at a higher level, a single peak, and CH₃OH at a lower level — from the original 2020 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Catalyst Energy Profile"
        marks={1}
        statement={<>On the energy profile diagram above, sketch how the catalyst would alter the reaction pathway.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A catalyst changes <b>only the activation energy</b>: it gives an alternative pathway with a lower peak. It
            does not change the reactants, the products or ΔH. So your new curve must start on the CO + 2H₂ line, end
            on the CH₃OH line, and only the hump is lower — the report says students had to get the start and finish
            points right.
          </p>
          <p>
            Don&rsquo;t be thrown by the stem&rsquo;s &ldquo;to maximise the yield&rdquo;: a catalyst speeds up the forward
            and reverse reactions equally, so it does <b>not</b> shift the position of equilibrium. What it does is let
            equilibrium be reached quickly at the lower temperature that favours methanol (part b.i), where the
            uncatalysed reaction would be too slow.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A curve with a <b>lower peak</b> (lower activation energy) that <b>starts at the CO + 2H₂ level and finishes at the CH₃OH level</b> (ΔH unchanged).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Le Chatelier Temperature"
        marks={2}
        statement={
          <>
            How does the reaction temperature affect the yield of methanol from biogas? In your answer, refer to Le
            Chatelier&rsquo;s principle.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Yield&rdquo; is about the <b>position of equilibrium</b>, not how fast it gets there — so the answer
            is Le Chatelier, not collision theory. Two marks, two ideas: (1) say what happens to the yield, (2) explain
            it: ΔH &lt; 0 makes the forward reaction exothermic, and the system partially opposes a temperature change
            by favouring the direction that releases (or absorbs) heat. Pick <b>one</b> direction (low temperature) and
            explain it fully; the report says many students explained rates instead, or wasted space doing both
            directions.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>yield is higher at low temperatures</b> (or lower at high temperatures).</> },
            { point: <><b>Forward reaction is exothermic</b>, so by <b>Le Chatelier&rsquo;s principle</b> a lower temperature is <b>partially compensated</b> by <b>favouring the exothermic forward reaction</b> (or a higher temperature by favouring the endothermic reverse reaction).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Le Chatelier Pressure"
        marks={2}
        statement={
          <>
            How does the reaction pressure affect the yield of methanol from biogas? In your answer, refer to Le
            Chatelier&rsquo;s principle.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Pressure only matters through the <b>number of gas particles</b> on each side: count them from the
            equation (3 mol of gas → 1 mol of gas). Two marks: (1) the effect on yield, (2) the Le Chatelier reason —
            the system partially opposes a pressure increase by favouring the side with fewer particles. As in b.i, the
            report says answers about rates instead of Le Chatelier&rsquo;s principle missed the point.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>yield is greater at high pressure</b> (or lower at low pressure).</> },
            { point: <>By <b>Le Chatelier&rsquo;s principle</b>, at high pressure the system moves to <b>decrease pressure</b> by <b>favouring the reaction that produces fewer particles</b> (<b>forward, 3 mol → 1 mol</b>), increasing the yield of methanol (or the reverse argument at low pressure).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Equilibrium Expression"
        marks={1}
        statement={<>Write the expression for the equilibrium constant, <i>K</i><sub>c</sub>, for this reaction.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Products on top, reactants underneath, each raised to the power of its coefficient. Copy the formulas
            exactly from the equation — the report&rsquo;s most common mistake was writing CO₂ instead of CO.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[{ point: <><Katex tex="K_c = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}][\mathrm{H_2}]^2}" /> — <b>products over reactants</b>, with <b>[H₂] squared</b> and <b>CO</b> (not CO₂).</> }]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Equilibrium Constant"
        marks={3}
        statement={
          <>
            0.760 mol of carbon monoxide, CO, and 0.525 mol of hydrogen, H₂, were allowed to reach equilibrium in a 500
            mL container. At equilibrium the mixture contained 0.122 mol of methanol.
            <br />
            Calculate the equilibrium constant, <i>K</i><sub>c</sub>.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            You are given <b>initial</b> amounts of the reactants but only <b>one equilibrium</b> amount, so use the
            mole ratio to work out how much of each reactant was used up — an initial / change / equilibrium table
            keeps this tidy. Then turn amounts into <b>concentrations</b> before substituting into K<sub>c</sub>. The
            three marks follow those three stages: equilibrium amounts, concentrations, then K<sub>c</sub> with units and
            3 significant figures. The report&rsquo;s traps: ignoring the 1 : 2 ratio for H₂, and using mol instead of
            mol L⁻¹.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>equilibrium amounts</b>: n(CO) = 0.638 mol, n(H₂) = 0.525 − <b>2 × 0.122</b> = 0.281 mol, n(CH₃OH) = 0.122 mol.</> },
            { point: <>Correct <b>equilibrium concentrations</b> (÷ 0.500 L): [CO] = 1.276 M, [H₂] = 0.562 M, [CH₃OH] = 0.244 M.</> },
            { point: <><b>K<sub>c</sub> = 0.244 / (1.276 × 0.562²) = 0.605 M⁻²</b> — with <b>correct units</b> and <b>three significant figures</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
