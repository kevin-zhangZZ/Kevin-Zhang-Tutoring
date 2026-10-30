// 2023 Chemistry Exam, Section B Question 5 (7 marks). Steam reforming of methane: a. a source of
// CH₄; b.i. the equilibrium expression; b.ii. calculating K from initial amounts and the equilibrium
// amount of H₂ (ICE table); c. how cooling changes the shape of the Maxwell–Boltzmann distribution.
// Question text transcribed from the original paper (no figures). The two-temperature
// Maxwell–Boltzmann graph in part c.'s working is this site's own explanatory figure (matplotlib) of
// something VCAA never printed. Mark distributions: the 2023 report prints them as fractions
// (0.2, 0.8 …), shown here as percentages. Mark allocations for b.ii are itemised in the VCAA
// report; a. and c. use the report's accepted answers/required words; b.i. is our reading. Model
// answers and "How to Think About It" notes are original. VCAA report only — no second source.
// Numbers checked in Python (x = 1.53 mol, K = 1.8998… × 10⁻⁵ M²). No Data Book values needed.
// Study design: the paper was set on the 2017–2023 study design. Equilibrium constants (with units)
// and biogas/natural gas are on the current one; the Maxwell–Boltzmann distribution is not named in
// the current study design (collision theory and the effect of temperature on rate are) — part c.
// written up with a study-design note, flagged as borderline for KZ (as for 2022 Q9b).

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import mbSrc from './chem-2023sa-q5c-mb-curves.png'

const TD = 'border border-gray-300 dark:border-gray-700 px-2.5 py-1 text-center'
const TH = 'border border-gray-300 dark:border-gray-700 px-2.5 py-1 text-left font-medium'

const EXAM_A: SAExaminerStats = {
  marks: [20, 80],
  average: 0.9,
  comment: (
    <>
      Any one of the following:
      <br />
      organic waste matter / biomass / coal seam gas / cattle / biogas / anaerobic respiration / fossil
      fuels / natural gas / fracking.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: <Katex tex="\dfrac{[H_2]^4[CO_2]}{[H_2O]^2[CH_4]}" />,
}

const EXAM_BII: SAExaminerStats = {
  marks: [20, 10, 10, 20, 40],
  average: 2.4,
  comment: (
    <>
      <div className="overflow-x-auto">
        <table className="text-[12.5px] border border-gray-300 dark:border-gray-700 my-1">
          <tbody>
            <tr><td className={TH}></td><td className={TD}>CH₄</td><td className={TD}>H₂O</td><td className={TD}>CO₂</td><td className={TD}>H₂</td></tr>
            <tr><td className={TH}>Initial (n)</td><td className={TD}>25.0</td><td className={TD}>25.0</td><td className={TD}>0.00</td><td className={TD}>0.00</td></tr>
            <tr><td className={TH}>Change</td><td className={TD}>−x<br />(−1.530)</td><td className={TD}>−2x<br />(−3.060)</td><td className={TD}>+x<br />(+1.530)</td><td className={TD}>+4x<br />(+6.120)</td></tr>
            <tr><td className={TH}>Equilb (n)</td><td className={TD}>23.47</td><td className={TD}>21.94</td><td className={TD}>1.530</td><td className={TD}>6.120</td></tr>
            <tr><td className={TH}>Equilb conc (M)</td><td className={TD}>0.2347</td><td className={TD}>0.2194</td><td className={TD}>0.0153</td><td className={TD}>0.0612</td></tr>
          </tbody>
        </table>
      </div>
      <Katex tex="K = \dfrac{[0.0612]^4[0.0153]}{[0.2194]^2[0.2347]} = 1.90 \times 10^{-5}\ \mathrm{M}^2" />
      <br />
      The first mark was awarded for the correct equilibrium amounts.
      <br />
      The second mark was awarded for the correct equilibrium concentrations.
      <br />
      The third mark was awarded for the correctly calculated value for <i>K</i>.
      <br />
      The fourth mark was awarded for the correct units being shown.
      <br />
      This question was generally well done, with clear structured responses that allowed for easy
      allocation of consequential marks.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      &lsquo;Narrower&rsquo; and &lsquo;taller/higher&rsquo; were required to be mentioned in any
      written response.
      <br />
      Students could have shown this change with a clearly annotated plot.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <><b>Natural gas</b> (a fossil fuel), or <b>biogas</b> produced by the <b>anaerobic breakdown of organic waste</b>.</>,
    reason: <>Either one earns the mark — the question asks for <b>a</b> source. Natural gas is mostly methane; biogas is the methane-rich gas made when bacteria break down organic matter (manure, landfill, sewage) without oxygen. The report accepts any of its listed sources.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <><Chem eq="CH4(g) + 2H2O(g) <=> CO2(g) + 4H2(g)" /></>,
    reason: <>Read the coefficients off the balanced equation: they become the powers.</>,
  },
  {
    working: <b><Katex tex="K = \dfrac{[\mathrm{CO_2}][\mathrm{H_2}]^4}{[\mathrm{CH_4}][\mathrm{H_2O}]^2}" /></b>,
    reason: <><b>Products on top, reactants on the bottom</b>, each concentration <b>raised to the power of its coefficient</b> (4 for H₂, 2 for H₂O). All four species are gases, so all four appear. Square brackets mean concentration in M (mol L⁻¹).</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>n(H₂) formed = 6.12 mol = 4<i>x</i>, so <i>x</i> = 6.12 ÷ 4 = 1.53 mol</>,
    reason: <>Only H₂ is given at equilibrium, so use the <b>mole ratio</b> CH₄ : H₂O : CO₂ : H₂ = 1 : 2 : 1 : 4 to find how much of everything else changed. <i>x</i> is the amount of CH₄ that reacted.</>,
  },
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-[12.5px] border border-gray-300 dark:border-gray-700">
          <tbody>
            <tr><td className={TH}>n (mol)</td><td className={TD}>CH₄</td><td className={TD}>H₂O</td><td className={TD}>CO₂</td><td className={TD}>H₂</td></tr>
            <tr><td className={TH}>Initial</td><td className={TD}>25.0</td><td className={TD}>25.0</td><td className={TD}>0</td><td className={TD}>0</td></tr>
            <tr><td className={TH}>Change</td><td className={TD}>−1.53</td><td className={TD}>−3.06</td><td className={TD}>+1.53</td><td className={TD}>+6.12</td></tr>
            <tr><td className={TH}>Equilibrium</td><td className={TD}>23.47</td><td className={TD}>21.94</td><td className={TD}>1.53</td><td className={TD}>6.12</td></tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>Mark 1: the <b>equilibrium amounts</b>. Reactants go <b>down</b> (CH₄ by <i>x</i>, H₂O by 2<i>x</i>), products go <b>up</b> (CO₂ by <i>x</i>, H₂ by 4<i>x</i>); equilibrium = initial + change. The container started empty of products, so CO₂ and H₂ start at 0.</>,
  },
  {
    working: <>c = n / V</>,
    reason: <><i>K</i> is written in <b>concentrations</b>, not amounts — divide every equilibrium amount by the volume.</>,
  },
  {
    working: <>[CH₄] = 23.47 mol ÷ 100.0 L = 0.2347 M &nbsp;·&nbsp; [H₂O] = 21.94 ÷ 100.0 = 0.2194 M</>,
  },
  {
    working: <>[CO₂] = 1.53 mol ÷ 100.0 L = 0.0153 M &nbsp;·&nbsp; [H₂] = 6.12 ÷ 100.0 = 0.0612 M</>,
    reason: <>Mark 2: the <b>equilibrium concentrations</b>.</>,
  },
  {
    working: <Katex tex="K = \dfrac{[\mathrm{CO_2}][\mathrm{H_2}]^4}{[\mathrm{CH_4}][\mathrm{H_2O}]^2} = \dfrac{0.0153 \times (0.0612)^4}{0.2347 \times (0.2194)^2}" />,
    reason: <>Substitute into the expression from b.i — remember the <b>powers</b> (H₂ to the 4th, H₂O squared).</>,
  },
  {
    working: <Katex tex="K = \dfrac{2.146\ldots \times 10^{-7}}{1.1297\ldots \times 10^{-2}} = 1.8998\ldots \times 10^{-5}" />,
  },
  {
    working: <>units: (M × M⁴) ÷ (M × M²) = M⁵ ÷ M³ = M²</>,
    reason: <>Work the units out from the expression: 5 concentration terms on top, 3 on the bottom, leaving M². (Equivalently mol² L⁻².)</>,
  },
  {
    working: <b><i>K</i> = 1.90 × 10⁻⁵ M²</b>,
    reason: <>Mark 3: the value of <i>K</i>; Mark 4: the <b>units</b>, a separate mark. Three significant figures (6.12 mol, 25.0 mol and 100.0 L all have at least three). Sanity check: <i>K</i> is small, which fits only 1.53 of the 25.0 mol of CH₄ having reacted — the equilibrium lies well to the left at 300 °C.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>At the lower temperature the Maxwell–Boltzmann distribution becomes <b>narrower</b> and <b>taller (higher peak)</b>,</>,
    reason: <>The mark: the report required <b>both</b> words — &lsquo;narrower&rsquo; and &lsquo;taller/higher&rsquo;. Cooler particles have a smaller spread of kinetic energies, crowded around a lower value.</>,
  },
  {
    working: <>with the peak shifted to <b>lower kinetic energy</b> (to the left); the <b>area under the curve is unchanged</b> because the number of particles is the same.</>,
    reason: <>Not required for the mark, but it is the full description and explains <i>why</i> the curve gets taller: the same number of particles squeezed into a narrower range of energies.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          loading="lazy"
          decoding="async"
          src={mbSrc}
          alt="Two Maxwell–Boltzmann curves of number of particles against kinetic energy: the lower-temperature curve is narrower with a taller peak further left; the higher-temperature curve is wider, lower and peaks further right; both enclose the same area — this site's own explanatory graph"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>The question allows a diagram. If you draw one, <b>label both curves</b> (which temperature is which) and keep the areas roughly equal — the report says the change could be shown with a &ldquo;clearly annotated plot&rdquo;. (This graph is our own illustration.)</>,
  },
]

export default function ChemistryQ5_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (7 marks)</p>
        <p className="mb-3">
          Hydrogen gas, H₂(g), can be produced by reacting methane, CH₄(g), with steam, H₂O(g), at 300 °C
          in the presence of a suitable catalyst. The equation for the reaction is shown below.
        </p>
        <p className="text-center">
          <Chem eq="CH4(g) + 2H2O(g) <=> CO2(g) + 4H2(g)" />
          <span className="ml-8">Δ<i>H</i> = +165 kJ mol⁻¹</span>
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Methane Sources"
        marks={1}
        statement={<>State a source of CH₄(g).</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A one-mark recall question: name one place methane actually comes from. Either the
            non-renewable source (<b>natural gas</b>, a fossil fuel) or the renewable one (<b>biogas</b> from
            the anaerobic breakdown of organic waste) is enough — one specific source, not a general
            description of fuels.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one accepted source: <b>natural gas</b> / <b>fossil fuels</b> / <b>coal seam gas</b> / fracking, or <b>biogas</b> / <b>biomass</b> / <b>organic waste matter</b> / <b>anaerobic respiration</b> / cattle.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p>
          A suitable catalyst plus 25.0 mol of CH₄(g) and 25.0 mol of H₂O(g) are placed into an empty,
          sealed 100.0 L container at 300 °C. After the reaction has reached equilibrium, the container
          contains 6.12 mol H₂(g).
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Equilibrium Expression"
        marks={1}
        statement={<>Write an expression for the equilibrium constant.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            The equilibrium expression comes straight from the balanced equation: product concentrations
            multiplied together over reactant concentrations multiplied together, each raised to the power
            of its coefficient. The usual slips are forgetting a power or putting the fraction upside down.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>[CO₂][H₂]⁴ / ([CH₄][H₂O]²)</b> — <b>products over reactants</b>, with the <b>powers 4 and 2</b> from the coefficients.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Equilibrium Constant"
        marks={4}
        statement={<>Calculate the equilibrium constant, <i>K</i>, for this reaction at 300 °C.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            You know the starting amounts of the reactants and the equilibrium amount of just one product,
            H₂. An <b>ICE table</b> (Initial, Change, Equilibrium) and the <b>mole ratio</b> 1 : 2 : 1 : 4 give
            the equilibrium amount of every species; dividing by 100.0 L turns them into concentrations;
            then substitute into b.i. The four marks are four separate steps — amounts, concentrations,
            the value of <i>K</i>, and its <b>units</b> — so show each one clearly; the report notes that
            clearly structured responses allowed consequential marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>equilibrium amounts</b>: CH₄ 23.47 mol, H₂O 21.94 mol, CO₂ 1.530 mol, H₂ 6.120 mol (from the <b>1 : 2 : 1 : 4 mole ratio</b>).</> },
            { point: <>Correct <b>equilibrium concentrations</b> (÷ 100.0 L): 0.2347, 0.2194, 0.0153, 0.0612 M.</> },
            { point: <>Correctly calculated <b><i>K</i> = 1.90 × 10⁻⁵</b>.</> },
            { point: <>Correct <b>units: M²</b> (mol² L⁻²).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Maxwell–Boltzmann Distribution"
        marks={1}
        statement={
          <>
            The temperature of the equilibrium system is decreased.
            <br />
            State how the decrease in temperature changes the <b>shape</b> of the Maxwell-Boltzmann
            distribution. You may use diagrams in your answer.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Study Design Note" always>
          <p>
            The current study design does not name the Maxwell–Boltzmann distribution, but it does cover
            how temperature affects the frequency and success of particle collisions. The distribution
            curve is the standard way to show this, and textbooks still teach it, so this part is good
            practice.
          </p>
        </Background>
        <Background title="How to Think About It">
          <p>
            The question asks about the <b>shape</b> of the curve only — not the rate, and not the
            position of equilibrium. Lowering the temperature lowers the average kinetic energy, so the
            particles&rsquo; energies bunch together: the curve gets <b>narrower</b> and its peak gets
            <b> taller</b> (and moves left). The report required both &lsquo;narrower&rsquo; and
            &lsquo;taller/higher&rsquo; for the one mark, so naming just one change is not enough.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The curve becomes <b>narrower</b> <i>and</i> <b>taller/higher</b> (both words required), or a clearly annotated plot showing this.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
