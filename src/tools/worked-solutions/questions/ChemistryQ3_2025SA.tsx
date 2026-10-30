// 2025 Chemistry Exam, Section B Question 3 (12 marks). Methanol synthesis,
// CO(g) + 2H₂(g) ⇌ CH₃OH(g), ΔH < 0: defining a reversible reaction, the effect of a higher
// temperature on yield, one way to raise the yield at constant temperature (Le Châtelier), using
// the reaction quotient to decide which way the system shifts, and an ICE-table calculation of
// the initial amount of H₂. Question text transcribed from the original paper (no figures — the
// equilibrium expression and concentrations are typeset). Mark allocations are from the VCAA
// examination report, which itemises every mark; the worked solutions, "How to Think About It"
// notes and model answers are original. VCAA report only — numbers checked in Python.
// Report slips, kept verbatim in the comments and explained in the working:
//   c. "Q = 5.60 / (2.00 x 1.25³)" — the cube is a typo for 1.25²; the value 1.792 M⁻² is right.
//   d. "[H₂] = √0.290 = 0.5394 M" and "0.53954" — √0.2904 = 0.5389 M (√0.290 = 0.5385); the
//      bracket in "0.53954 + (2 x 1.30" is never closed. The final 3.14 mol is unaffected.
// No Data Book values are used, so no Data Book note is needed.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: (
    <>
      Responses needed to state that a reversible reaction is one that can proceed in either direction.
      <br />
      No marks could be awarded if students attempted to use an equilibrium explanation, i.e. &lsquo;rate
      of forward reaction = rate of reverse reaction&rsquo;.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [30, 14, 56],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for a response indicating that increasing the temperature would cause a
      backward/reverse shift in the equilibrium based on the forward reaction being exothermic.
      <br />
      The second mark was awarded for then relating the backward/reverse shift to a decrease in yield.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [23, 39, 37],
  average: 1.2,
  comment: (
    <>
      The first mark was awarded for stating a stress that would cause a forward shift, for example:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>removing the product</li>
        <li>adding a reactant</li>
        <li>increasing the pressure (but only if this was caused by decreasing the volume).</li>
      </ul>
      The second mark was awarded for providing the rationale as to how the stress caused the shift
      forward. System moved forward to partially:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>replace the loss of product</li>
        <li>remove the addition of reactant</li>
        <li>reduce the number of particles as LHS has 3 particles and RHS has 1 particle.</li>
      </ul>
      A significant number of responses just stated that an &lsquo;increase in pressure causes a forward
      shift&rsquo;. This could not be awarded a mark, as an inert gas will increase the pressure but will
      not cause a shift forward. Hence responses were required to state not only &lsquo;increased
      pressure&rsquo; but specifically the means by which it was achieved.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [16, 19, 53, 12],
  average: 1.6,
  comment: (
    <>
      The first mark was awarded for determining the value of the reaction quotient.
      <br />
      Q = 5.60 / (2.00 x 1.25³) = 1.792 M⁻²
      <br />
      The second mark was awarded for stating that Q &gt; K.
      <br />
      The third mark was awarded for showing an understanding that to return Q to K, the system needed to
      shift backwards / reverse / move to the left so that the products are decreased and reactants
      increased.
    </>
  ),
}

const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1'

const EXAM_D: SAExaminerStats = {
  marks: [33, 14, 10, 14, 28],
  average: 1.9,
  comment: (
    <>
      For any of these equilibrium type questions that involve an initial and final state, while these
      calculations can be done without the use of a table, it is highly recommended that an I.C.E. table
      is used, as shown below.
      <table className="my-2 text-[13px] border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className={TD}></th>
            <th className={TD}>[ CO ] M</th>
            <th className={TD}>[ H₂ ] M</th>
            <th className={TD}>[ CH₃OH ] M</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className={TD}>Initial concentration</td><td className={`${TD} text-center`}>5.00</td><td className={TD}></td><td className={`${TD} text-center`}>0.00</td></tr>
          <tr><td className={TD}>Change</td><td className={`${TD} text-center`}>-x</td><td className={`${TD} text-center`}>-2x</td><td className={`${TD} text-center`}>+x</td></tr>
          <tr><td className={TD}>Final concentration</td><td className={TD}></td><td className={TD}></td><td className={`${TD} text-center`}>1.30</td></tr>
        </tbody>
      </table>
      From the table, x has to be equal to 1.30 M.
      <br />
      The first mark was awarded for establishing that [CO] = 5.00 – 1.30 = 3.70 M.
      <br />
      The second mark was awarded for using the equilibrium expression to find [H₂]².
      <br />
      <Katex tex="[\mathrm{H_2}]^2 = \dfrac{1.30}{3.70 \times 1.21} = 0.290\ \mathrm{M^2}" />
      <br />
      The third mark was awarded for determining the [H₂] = √0.290 = 0.5394 M.
      <br />
      The fourth mark was awarded for determining n(H₂)<sub>initial</sub>.
      <br />
      [H₂]<sub>initial</sub> = 0.53954 + (2 x 1.30 = 3.14 M&nbsp; therefore n(H₂) = 3.14 mol
      <br />
      A significant number of students did not realise the need for completing both an I.C.E. table and
      also an equilibrium expression in order to complete this question.
      <br />
      For those that did complete the calculations, the most common mistake was that they left their final
      value as a concentration, not the amount in mol as specified in the stem of the question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>A reversible reaction is one that can <b>proceed in both directions</b>: the <b>reactants react to form products</b>, and the <b>products can also react to re-form the reactants</b>.</>,
    reason: <>That is the whole definition — it describes the <i>reaction</i>, not a state. Writing &ldquo;rate of forward reaction = rate of reverse reaction&rdquo; describes <b>equilibrium</b> instead, and the report gave no mark for it.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The forward reaction is <b>exothermic</b> (ΔH &lt; 0), so the reverse reaction is <b>endothermic</b>.</>,
    reason: <>Read the sign of ΔH from the equation first — it decides which direction absorbs heat.</>,
  },
  {
    working: <>Increasing the temperature causes the equilibrium to <b>shift in the reverse (backward) direction</b> — the endothermic direction — which <b>partially opposes</b> the temperature increase by absorbing heat.</>,
    reason: <>Mark 1: the <b>direction of the shift</b>, tied to the forward reaction being <b>exothermic</b>. Le Châtelier: the system shifts to partially oppose the change.</>,
  },
  {
    working: <>Less CH₃OH is present at the new equilibrium, so the <b>yield of CH₃OH decreases</b> (and <i>K</i><sub>c</sub> decreases).</>,
    reason: <>Mark 2: link the reverse shift to the <b>yield</b>. The question gives you the rate (faster) — the marks are for what happens to the <i>yield</i>, which goes the other way. That trade-off is why 500 K is a compromise temperature.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <><b>Decrease the volume</b> of the container (compress the gases), which <b>increases the pressure</b>.</>,
    reason: <>Mark 1: a change that causes a <b>forward shift</b>. Say <b>how</b> the pressure is increased — the report did not accept &ldquo;increase the pressure&rdquo; alone, because adding an inert gas also raises the pressure but causes no shift.</>,
  },
  {
    working: <>The equilibrium <b>shifts forward</b> to <b>partially oppose</b> the change by <b>reducing the number of gas particles</b>: there are <b>3 mol of gas on the left</b> (1 CO + 2 H₂) and only <b>1 mol of gas on the right</b> (CH₃OH). So the <b>yield of CH₃OH increases</b>.</>,
    reason: (
      <>
        Mark 2: the <b>rationale</b> — why the shift is forward. Count gas moles on each side from the coefficients.
        <br />
        Other answers that earn both marks: <b>add a reactant</b> (CO or H₂) — the system shifts forward to partially use up the added reactant; or <b>remove CH₃OH</b> as it forms — the system shifts forward to partially replace the lost product. A catalyst does <i>not</i> work: it speeds up both directions equally and does not change the yield.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <><Katex tex="Q = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}][\mathrm{H_2}]^2}" /></>,
    reason: <>The reaction quotient has the same form as <i>K</i><sub>c</sub>, but uses the concentrations <b>at this moment</b> (time <i>t</i>₁), not at equilibrium. Note the <b>square</b> on [H₂], from its coefficient of 2.</>,
  },
  {
    working: <><Katex tex="Q = \dfrac{5.60\ \mathrm{M}}{2.00\ \mathrm{M} \times (1.25\ \mathrm{M})^2}" /></>,
    reason: <>The report writes &ldquo;1.25³&rdquo; — a typo for 1.25²; its value of 1.792 is the one you get with the square.</>,
  },
  {
    working: <><b><i>Q</i> = 1.79 M⁻²</b> (1.792)</>,
    reason: <>Mark 1: the value of <i>Q</i>. Units: M ÷ (M × M²) = M⁻², the same units as <i>K</i><sub>c</sub>.</>,
  },
  {
    working: <><b><i>Q</i> &gt; <i>K</i><sub>c</sub></b> (1.79 M⁻² &gt; 1.21 M⁻²)</>,
    reason: <>Mark 2: compare <i>Q</i> with <i>K</i><sub>c</sub> and say which is bigger. <i>Q</i> &gt; <i>K</i> means there is too much product relative to reactants for equilibrium.</>,
  },
  {
    working: <>So the system must <b>shift in the reverse direction (to the left)</b>: <b>[CH₃OH] decreases</b> and <b>[CO] and [H₂] increase</b>, until <i>Q</i> decreases to equal <i>K</i><sub>c</sub> = 1.21 M⁻².</>,
    reason: <>Mark 3: the direction <b>and</b> what that does — fewer products and more reactants lowers the fraction <i>Q</i> until it equals <i>K</i>. The temperature is still 500 K, so <i>K</i><sub>c</sub> itself does not change.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <table className="text-[13px] border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className={TD}></th>
            <th className={TD}>[CO]</th>
            <th className={TD}>[H₂]</th>
            <th className={TD}>[CH₃OH]</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className={TD}>Initial (M)</td><td className={`${TD} text-center`}>5.00</td><td className={`${TD} text-center`}><i>y</i> (unknown)</td><td className={`${TD} text-center`}>0</td></tr>
          <tr><td className={TD}>Change (M)</td><td className={`${TD} text-center`}>−1.30</td><td className={`${TD} text-center`}>−2.60</td><td className={`${TD} text-center`}>+1.30</td></tr>
          <tr><td className={TD}>Equilibrium (M)</td><td className={`${TD} text-center`}>3.70</td><td className={`${TD} text-center`}><i>y</i> − 2.60</td><td className={`${TD} text-center`}>1.30</td></tr>
        </tbody>
      </table>
    ),
    reason: <>Set up an <b>ICE table</b>. The volume is 1.00 L, so 5.00 mol of CO is 5.00 M. No CH₃OH at the start (evacuated container); 1.30 M at equilibrium, so 1.30 M formed. The <b>1 : 2 : 1 mole ratio</b> gives the changes for CO (−1.30) and H₂ (−2 × 1.30 = −2.60). (The report calls this change <i>x</i> = 1.30 M.)</>,
  },
  {
    working: <>[CO]<sub>eq</sub> = 5.00 − 1.30 = <b>3.70 M</b></>,
    reason: <>Mark 1: the equilibrium concentration of CO.</>,
  },
  {
    working: <><Katex tex="K_c = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}][\mathrm{H_2}]^2} \;\Rightarrow\; [\mathrm{H_2}]^2 = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}] \times K_c}" /></>,
    reason: <>The equilibrium expression is the only link between the known values and the unknown [H₂]. Rearrange it for [H₂]² before substituting.</>,
  },
  {
    working: <><Katex tex="[\mathrm{H_2}]^2 = \dfrac{1.30\ \mathrm{M}}{3.70\ \mathrm{M} \times 1.21\ \mathrm{M^{-2}}} = 0.29037\ldots\ \mathrm{M^2}" /></>,
    reason: <>Mark 2: [H₂]² from the equilibrium expression. Use <b>equilibrium</b> concentrations here (3.70 M, not 5.00 M).</>,
  },
  {
    working: <>[H₂]<sub>eq</sub> = √0.29037… = <b>0.5389 M</b></>,
    reason: <>Mark 3: take the square root. The report prints &ldquo;√0.290 = 0.5394 M&rdquo; and then &ldquo;0.53954&rdquo; — slips for 0.5389 M (√0.290 itself is 0.5385). Either way the final answer is 3.14 mol.</>,
  },
  {
    working: <>[H₂]<sub>initial</sub> = [H₂]<sub>eq</sub> + [H₂]<sub>reacted</sub> = 0.5389 M + 2 × 1.30 M = 3.1389 M</>,
    reason: <>Work back up the H₂ column of the ICE table: what was there at the start = what is left + what reacted (2 × 1.30 = 2.60 M, from the 2 : 1 ratio with CH₃OH).</>,
  },
  {
    working: <>n(H₂)<sub>initial</sub> = c × V = 3.1389 M × 1.00 L</>,
    reason: <>The question asks for an <b>amount in moles</b>, so convert the concentration with n = cV. The report says leaving the answer as a concentration was the most common mistake.</>,
  },
  {
    working: <b>n(H₂)<sub>initial</sub> = 3.14 mol</b>,
    reason: <>Mark 4. Three significant figures, matching the data (5.00 mol, 1.30 M, 1.21 M⁻²). Check: [H₂] = 3.14 − 2.60 = 0.539 M, and 1.30 ÷ (3.70 × 0.539²) = 1.21 ✓.</>,
  },
]

export default function ChemistryQ3_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (12 marks)</p>
        <p className="mb-3">
          Methanol, CH₃OH, is widely used as a starting material for a range of products, including paints
          and pharmaceuticals. A chemical reaction for the synthesis of CH₃OH is
        </p>
        <p className="pl-6">
          <Chem eq="CO(g) + 2H2(g) <=> CH3OH(g)" />
          <span className="ml-10">Δ<i>H</i> &lt; 0</span>
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Reversible Reactions"
        marks={1}
        statement={<>Define the term &lsquo;reversible reaction&rsquo;.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            One mark, one idea: what makes a <i>reaction</i> reversible — it can go <b>both ways</b>. Don&rsquo;t
            confuse this with the definition of <b>equilibrium</b> (&ldquo;rate forward = rate reverse&rdquo;):
            the report gave no mark for that, because equilibrium is a state a reversible reaction can reach,
            not what &ldquo;reversible&rdquo; means.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>A reaction that can <b>proceed in either direction</b> (reactants → products and products → reactants). An equilibrium definition (&ldquo;rate of forward = rate of reverse&rdquo;) scores 0.</> }]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">b.</span> The operating conditions used
          for producing CH₃OH are 500 K and 10&#8239;000 kPa in the presence of a catalyst.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Temperature and Yield"
        marks={2}
        statement={
          <>
            The rate of the reaction can be increased by increasing the temperature.
            <br />
            Explain the impact this would have on the yield.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Rate and yield are different questions: a higher temperature always makes the reaction faster,
            but the <b>yield</b> depends on which way the equilibrium shifts. Two marks, two linked ideas:
            the <b>direction of the shift</b> (decided by ΔH &lt; 0 — the forward reaction is exothermic), then
            what that shift does to the <b>yield</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Increasing the temperature causes a <b>backward/reverse shift</b> in the equilibrium, because the <b>forward reaction is exothermic</b>.</> },
            { point: <>Relates the reverse shift to a <b>decrease in yield</b> (of CH₃OH).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Le Châtelier's Principle"
        marks={2}
        statement={
          <>
            Using Le Châtelier&rsquo;s principle, state <b>one</b> way in which the yield of CH₃OH could be
            increased at a constant temperature. Justify your response.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            You need a change (not temperature) that makes the equilibrium <b>shift forward</b>, then the
            Le Châtelier reason the system responds that way. Mark 1 is the change, Mark 2 is the
            justification. If you choose pressure, the report is strict: you must say <b>how</b> the pressure
            is increased (<b>decreasing the volume</b>), because adding an inert gas raises the pressure without
            causing any shift.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A change causing a <b>forward shift</b>: <b>removing the product</b>, <b>adding a reactant</b>, or <b>increasing the pressure by decreasing the volume</b> (&ldquo;increase the pressure&rdquo; alone scored 0).</> },
            { point: <>The rationale: the system shifts forward to <b>partially</b> replace the lost product / remove the added reactant / <b>reduce the number of particles</b> (3 gas particles on the left, 1 on the right).</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          A mixture of carbon monoxide, CO, hydrogen, H₂, and CH₃OH gases inside a sealed container is at
          equilibrium at 500 K. The equilibrium expression is
        </p>
        <div className="pl-6 mb-3">
          <Katex tex="K_c = \dfrac{[\mathrm{CH_3OH}]}{[\mathrm{CO}] \times [\mathrm{H_2}]^2} = 1.21\ \mathrm{M^{-2}}\ \text{at 500 K}" />
        </div>
        <p className="mb-1">
          A change to the system is applied at time <i>t</i>₁. The concentrations at <i>t</i>₁ are measured to be:
        </p>
        <ul className="list-disc pl-5">
          <li>[CO] = 2.00 M</li>
          <li>[H₂] = 1.25 M</li>
          <li>[CH₃OH] = 5.60 M</li>
        </ul>
      </div>

      <PartCard
        letter="c"
        topic="Reaction Quotient"
        marks={3}
        statement={<>Determine what needs to happen for the system to return to equilibrium. Use calculations to support your response.</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Use calculations&rdquo; tells you to calculate the <b>reaction quotient <i>Q</i></b> from the
            concentrations at <i>t</i>₁ and compare it with <i>K</i><sub>c</sub>. Three marks, three steps:
            the value of <i>Q</i>, the comparison (<i>Q</i> &gt; <i>K</i> or <i>Q</i> &lt; <i>K</i>), and the
            consequence — which way the system shifts and what happens to the concentrations. Remember to
            square [H₂].
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>reaction quotient</b>: <b><i>Q</i> = 5.60 / (2.00 × 1.25²) = 1.792 M⁻²</b>.</> },
            { point: <>States that <b><i>Q</i> &gt; <i>K</i></b>.</> },
            { point: <>To return <i>Q</i> to <i>K</i>, the system must <b>shift backwards / reverse / to the left</b>, so that <b>products decrease and reactants increase</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="ICE Table"
        marks={4}
        statement={
          <>
            5.00 mol of CO and an unknown amount of H₂ were injected into an evacuated 1.00 L sealed container
            at 500 K. Once equilibrium was established, the concentration of CH₃OH was determined to be 1.30 M.
            <br />
            Calculate the amount of H₂, in moles, initially added to the container.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Two tools are needed together — the report notes many students missed this. An <b>ICE table</b> uses
            the mole ratio to get the equilibrium [CO] (and to link the initial and equilibrium [H₂]); the{' '}
            <b>equilibrium expression</b> (with <i>K</i><sub>c</sub> = 1.21 M⁻²) then gives the equilibrium [H₂].
            Add back the H₂ that reacted to get the initial amount. The marks follow those steps: [CO], [H₂]²,
            [H₂], then n(H₂) initial — <b>in mol</b>, which the report says was the most common slip.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Establishes <b>[CO] = 5.00 − 1.30 = 3.70 M</b> at equilibrium.</> },
            { point: <>Uses the <b>equilibrium expression</b> to find <b>[H₂]² = 1.30 / (3.70 × 1.21) = 0.290 M²</b>.</> },
            { point: <>Determines <b>[H₂] = √0.290 = 0.539 M</b>.</> },
            { point: <>Determines <b>n(H₂) initial = 0.539 + 2 × 1.30 = 3.14 mol</b> — an <b>amount in mol</b>, not a concentration.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
