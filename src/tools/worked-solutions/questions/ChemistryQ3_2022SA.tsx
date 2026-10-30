// 2022 Chemistry Exam, Section B Question 3 (10 marks). Equilibrium in the oxidation of ammonia,
// 4NH₃(g) + 3O₂(g) ⇌ 2N₂(g) + 6H₂O(g), ΔH < 0: the equilibrium expression and its units, the
// effect of a temperature rise on K (Le Chatelier), the forward rate at the new equilibrium
// (collision theory), and sketching the uncatalysed product curve on a concentration–time graph.
// Question text transcribed from the original paper; the concentration–time graph is cropped from
// the original VCAA exam PDF and the report's sample graph from the examination report. The red
// answer curve in part c.'s working is this site's own overlay (an SVG on top of the cropped
// graph, calibrated to its pixels), not a redrawing of the figure. Mark allocations for b.i and
// b.ii are itemised in the VCAA report; a.i, a.ii and c. are our reading of the report's answers.
// Source: VCAA report only. Every part is on the 2024–2027 study design (equilibrium expressions
// including units, Le Chatelier, collision theory, concentration–time graphs).

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import graphSrc from './chem-2022sa-q3c-graph.png'
import reportGraphSrc from './chem-2022sa-q3c-report-graph.png'

const K_FRACTION = (
  <span className="inline-flex items-center gap-1 align-middle">
    <i>K</i> =
    <span className="inline-flex flex-col items-center leading-tight text-[0.95em]">
      <span className="px-1">[N₂]² [H₂O]⁶</span>
      <span className="px-1 border-t border-current">[NH₃]⁴ [O₂]³</span>
    </span>
  </span>
)

const EXAM_AI: SAExaminerStats = {
  marks: [26, 74],
  average: 0.7,
  comment: <>{K_FRACTION}</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: <>M or mol L⁻¹</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [24, 11, 14, 35, 16],
  average: 2.1,
  comment: (
    <>
      The first mark was awarded for stating that the equilibrium constant decreases.
      <br />
      The second mark was awarded for recognising that the forward reaction is exothermic or the back
      reaction is endothermic.
      <br />
      The third mark was awarded for establishing that the increase in temperature causes the system to
      partially oppose this stress by causing a shift in the reverse direction, or by stating that the
      increase in temperature increases the rate of the back reaction more than the rate of the forward
      reaction.
      <br />
      The fourth mark was awarded for establishing that the [reactants] increases and the [products]
      decreases.
      <br />
      Many students failed to make a clear indication that both the reactants and products had changed
      in concentrations.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [17, 21, 36, 26],
  average: 1.7,
  comment: (
    <>
      The first mark was awarded for stating that the rate of the forward reaction will be greater at the
      new equilibrium after the temperature increase.
      <br />
      The second mark was awarded for either of
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          recognising that the average energy/speed of all particles will increase, hence the frequency of
          collisions increases
        </li>
        <li>
          recognising reactant concentration increases due to the back reaction being favoured, which in
          turn means a greater number of collisions per unit time.
        </li>
      </ul>
      The third mark was awarded for establishing that there are more particles with energy above the
      activation energy (E<sub>A</sub>), and therefore increased probability/proportion/ratio of
      collisions that are successful.
      <br />
      When students approach any discussion of collision theory, they are always required to include
      reference to &lsquo;time&rsquo; or &lsquo;frequency&rsquo;, and should also indicate the
      understanding of relative proportions of particles with specific energies.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The report's sample answer: the original graph with a red product curve added that rises less steeply than the catalysed curve and levels off at the same concentration, later than t1"
        className="w-full max-w-[360px] mt-1"
      />
      <br />
      The new line must show a decreased gradient and also show that it reaches the same concentration as
      the original, but at a time later than <i>t</i>
      <sub>1</sub>.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>K = [products]<sup>coefficients</sup> / [reactants]<sup>coefficients</sup></>,
    reason: <>The <b>equilibrium law</b>: products on top, reactants underneath, each concentration raised to the power of its <b>coefficient</b> in the balanced equation.</>,
  },
  {
    working: <>Products: 2N₂ and 6H₂O → [N₂]² [H₂O]⁶; reactants: 4NH₃ and 3O₂ → [NH₃]⁴ [O₂]³</>,
    reason: <>Every species here is a <b>gas</b>, so every one appears — including water. (Water is left out only when it is a pure liquid or solvent; here it is H₂O(g).)</>,
  },
  {
    working: <b>{K_FRACTION}</b>,
    reason: <>Use square brackets (they mean concentration in mol L⁻¹) and multiply the terms — never add them.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>units = (M)²(M)⁶ / ((M)⁴(M)³)</>,
    reason: <>Replace each concentration in the part a.i expression with its unit, M (mol L⁻¹), keeping the powers.</>,
  },
  {
    working: <>units = M<sup>2+6</sup> / M<sup>4+3</sup> = M⁸ / M⁷</>,
    reason: <>Add the powers on top (8) and underneath (7). Shortcut: total product coefficients minus total reactant coefficients = 8 − 7 = 1.</>,
  },
  {
    working: <b>units = M (mol L⁻¹)</b>,
    reason: <>M¹ — so the units are just M, also written mol L⁻¹. The report accepts either.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>The value of the equilibrium constant <b>decreases</b>.</>,
    reason: <>Mark 1: the effect on K. Temperature is the <b>only</b> change that alters the value of K.</>,
  },
  {
    working: <>ΔH &lt; 0, so the <b>forward reaction is exothermic</b> (and the <b>reverse reaction is endothermic</b>).</>,
    reason: <>Mark 2: read the sign of ΔH from the equation and name what it means.</>,
  },
  {
    working: <>By Le Chatelier&rsquo;s principle, the system <b>partially opposes</b> the temperature increase by <b>shifting in the reverse (endothermic) direction</b>, which absorbs energy. (Equivalently: the higher temperature <b>increases the rate of the reverse reaction more than the rate of the forward reaction</b>.)</>,
    reason: <>Mark 3: the reason the equilibrium moves. Either the Le Chatelier statement or the rate statement earns it.</>,
  },
  {
    working: <>So at the new equilibrium <b>[NH₃] and [O₂] (reactants) have increased</b> and <b>[N₂] and [H₂O] (products) have decreased</b>. Since K = [products]/[reactants], <b>K is smaller</b>.</>,
    reason: <>Mark 4: link the shift to K through the concentrations. The report says many students did not clearly state that <b>both</b> the reactant and the product concentrations changed — name both.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>The rate of the forward reaction is <b>greater at the new equilibrium</b> (at the higher temperature) than at the original equilibrium.</>,
    reason: <>Mark 1: the comparison. Even though the equilibrium shifted in the reverse direction, <b>both</b> rates are higher at the higher temperature — at the new equilibrium the forward and reverse rates are again equal, just both faster.</>,
  },
  {
    working: <>At the higher temperature the particles have a higher <b>average kinetic energy</b> and move faster, so they <b>collide more frequently</b> (more <b>collisions per unit time</b>).</>,
    reason: <>Mark 2. The report also accepted: the reverse shift <b>increases the reactant concentrations</b>, giving a greater number of collisions per unit time. Either way, say &ldquo;per unit time&rdquo; or &ldquo;frequency&rdquo; — the report insists on it.</>,
  },
  {
    working: <>A <b>greater proportion of collisions have energy equal to or greater than the activation energy</b>, so a greater proportion of collisions are <b>successful</b> — more successful collisions per unit time, so a faster forward reaction.</>,
    reason: <>Mark 3: this is the main reason temperature raises rate. Say <b>proportion</b> of particles/collisions with energy ≥ E<sub>a</sub> — &ldquo;more energy&rdquo; alone is not enough.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Without a catalyst the <b>rate is slower</b>, so the product curve has a <b>smaller (less steep) gradient</b> from the start.</>,
    reason: <>A catalyst provides an alternative pathway with lower activation energy; removing it means fewer successful collisions per unit time.</>,
  },
  {
    working: <>It levels off at the <b>same equilibrium concentration</b> of products, but <b>later than <i>t</i><sub>1</sub></b>.</>,
    reason: <>A catalyst speeds up the forward and reverse reactions equally, so it does <b>not change the position of equilibrium</b> (or K) — only the time taken to get there. Drawing the curve flattening at a lower or higher level is the trap.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <div className="relative w-full max-w-[420px]">
          <img
            loading="lazy"
            decoding="async"
            src={graphSrc}
            alt="The paper's concentration–time graph with our red product curve for the uncatalysed reaction"
            className="w-full"
          />
          <svg viewBox="0 0 1200 734" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path
              d="M319,648 L333,609 L347,574 L361,542 L374,513 L388,486 L402,462 L416,440 L430,420 L444,402 L458,385 L472,370 L486,356 L499,343 L513,331 L527,321 L541,311 L555,302 L569,294 L583,287 L596,280 L610,274 L624,269 L638,264 L652,259 L666,255 L680,251 L694,248 L708,245 L721,242 L735,239 L749,237 L763,234 L777,232 L791,231 L805,229 L818,227 L832,226 L846,225 L860,224 L874,223 L888,222 L902,221 L916,220 L930,219 L943,219 L957,218 L971,217 L985,217"
              fill="none"
              stroke="#dc2626"
              strokeWidth={6}
            />
          </svg>
        </div>
      </div>
    ),
    reason: <>Our sketch (red): starts at 0, rises <b>less steeply</b> than the catalysed curve, is still below the plateau at <i>t</i><sub>1</sub>, and reaches the <b>same plateau later</b>. This matches the report&rsquo;s sample graph.</>,
  },
]

const STEM_BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

export default function ChemistryQ3_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (10 marks)</p>
        <p className="mb-2">The following equation represents a gaseous reaction that takes place in a sealed container.</p>
        <p className="text-center">
          <Chem eq="4NH3(g) + 3O2(g) <=> 2N2(g) + 6H2O(g)" />{' '}
          <span className="ml-8"><i>ΔH</i> &lt; 0</span>
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Equilibrium Expression"
        marks={1}
        statement={<>Write the equilibrium expression for this reaction.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            A one-mark &ldquo;write the expression&rdquo; question: <b>products over reactants</b>, each
            concentration raised to the power of its coefficient. The only decision is which species to
            include — here all four are gases, so water is included.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="ours"
          points={[{ point: <>{K_FRACTION} — <b>products over reactants</b>, <b>powers equal to coefficients</b>, all four gases (including <b>H₂O(g)</b>) in <b>square brackets</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Units of K"
        marks={1}
        statement={<>State the units for this equilibrium expression.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            The units of K come straight from the expression in part a.i: every concentration has unit M, so
            count the powers. Eight powers of M on top and seven underneath leave M¹.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme source="ours" points={[{ point: <><b>M</b> or <b>mol L⁻¹</b>.</> }]} />
      </PartCard>

      <div className={STEM_BOX}>
        <p>
          <b>b.</b> The temperature of the reaction system is increased and a new equilibrium is established.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Temperature and K"
        marks={4}
        statement={<>How does the increase in the temperature affect the value of the equilibrium constant? Justify your answer.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Four marks means four separate ideas, in a chain: <b>what happens to K</b> → <b>is the forward
            reaction exo- or endothermic</b> → <b>which way the equilibrium shifts and why</b> → <b>what
            that does to the concentrations</b>, and so to K. The report&rsquo;s warning: many students did
            not say that <b>both</b> the reactant concentrations rise <b>and</b> the product concentrations
            fall — state both.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>States that the <b>equilibrium constant decreases</b>.</> },
            { point: <>The <b>forward reaction is exothermic</b> (or the back reaction is <b>endothermic</b>).</> },
            { point: <>The temperature increase causes the system to <b>partially oppose</b> the change by <b>shifting in the reverse direction</b> — or the higher temperature <b>increases the rate of the back reaction more than the forward reaction</b>.</> },
            { point: <><b>[reactants] increases</b> and <b>[products] decreases</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Collision Theory"
        marks={3}
        statement={
          <>
            Compare the rate of the forward reaction at the original equilibrium with the rate of the forward
            reaction at the new equilibrium after the increase in temperature. Explain the difference using
            collision theory.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Don&rsquo;t confuse <b>rate</b> with <b>position</b>: part b.i showed the equilibrium shifts back,
            but the forward reaction still runs <b>faster</b> at the higher temperature. Three marks: the
            comparison, then two collision-theory ideas — <b>more frequent collisions</b> (per unit time) and a
            <b> greater proportion of collisions with energy ≥ E<sub>a</sub></b>. The report requires
            &ldquo;time&rdquo; or &ldquo;frequency&rdquo; and the idea of a <b>proportion</b> of particles.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The rate of the forward reaction is <b>greater at the new equilibrium</b>.</> },
            { point: <>The <b>average energy/speed of particles increases</b>, so the <b>frequency of collisions increases</b> — or the <b>reactant concentration increases</b> (back reaction favoured), giving <b>more collisions per unit time</b>.</> },
            { point: <><b>More particles have energy above the activation energy</b>, so a <b>greater proportion of collisions are successful</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">
          <b>c.</b> The concentration versus time graph for a different reaction is shown below. This reaction
          takes place with a catalyst. Equilibrium is reached at time <i>t</i>
          <sub>1</sub>.
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={graphSrc}
            alt="Concentration versus time graph: a dashed reactants curve falling from a high value and a solid products curve rising from 0, both levelling off at a dashed vertical line at t1 — from the original 2022 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>The reaction is repeated without a catalyst.</p>
      </div>

      <PartCard
        letter="c"
        topic="Catalyst Graph"
        marks={1}
        statement={
          <>
            On the concentration versus time graph above, sketch the expected curve for the products when the
            reaction is performed without a catalyst.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            A catalyst changes <b>how fast</b> equilibrium is reached, not <b>where</b> it ends up. So the new
            product curve must do two things for the one mark: rise <b>less steeply</b>, and level off at the
            <b> same concentration</b> but <b>after <i>t</i><sub>1</sub></b>. Only 46% scored the mark, and the
            report requires both features — a slower curve that still levels off at <i>t</i><sub>1</sub>, or
            one that levels off at a different height, does not show them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[{ point: <>A product curve with a <b>decreased gradient</b> that reaches the <b>same final concentration</b> as the original, at a time <b>later than <i>t</i><sub>1</sub></b>.</> }]}
        />
      </PartCard>
    </div>
  )
}
