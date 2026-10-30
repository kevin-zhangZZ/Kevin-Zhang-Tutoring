// 2025 Chemistry Exam, Section B Question 7 (8 marks). Steelmaking: the traditional blast furnace
// against molten oxide electrolysis (MOE) — a requirement for MOE to support UN Sustainable
// Development Goal 12, and a six-mark evaluation of both processes against green chemistry
// principles with an ethical factor and a conclusion. Question text transcribed from the original
// paper (pp. 36–38); "The MOE process" diagram is cropped from the original VCAA exam PDF; the
// summary table is transcribed. Mark allocations are from the VCAA examination report (pp. 19–21),
// which itemises every mark; the "How to Think About It" notes and model answers are original.
// VCAA report only — no second source. Numbers (atom economies 62.8% and 69.9%, the 17-fold
// electricity ratio) checked in Python with Data Book molar masses.
// The paper's "item 26 ii" (green chemistry principles) is item 24 ii in the 2026 Data Book — a
// Data Book note says so. The report's part a table says iridium is "radioactive"; natural iridium
// is not radioactive (its isotopes are stable) — kept verbatim, explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import moeSrc from './chem-2025sa-q7-moe-process.png'

const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const EXAM_A: SAExaminerStats = {
  marks: [53, 32, 15],
  average: 0.7,
  comment: (
    <>
      Expected responses included:
      <table className="mt-2 text-[13px] border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className={`${cell} text-left`}>First mark</th>
            <th className={`${cell} text-left`}>Second mark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cell}>The MOE process requires significantly more / a lot of electrical energy.</td>
            <td className={cell}>This electrical energy would need to come from renewable energy sources.</td>
          </tr>
          <tr>
            <td className={cell}>MOE produces no CO₂.</td>
            <td className={cell}>Therefore, it reduces the impact of steel production on global warming.</td>
          </tr>
          <tr>
            <td className={cell}>MOE does not require coal mining.</td>
            <td className={cell}>Which is a finite resource and/or results in significant land degradation.</td>
          </tr>
          <tr>
            <td className={cell}>
              MOE anode is made of:
              <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
                <li>Pt which is rare and expensive</li>
                <li>Ir which is rare, expensive and radioactive.</li>
              </ul>
            </td>
            <td className={cell}>Better to use the ceramic metal oxide and/or land degradation and/or finite resource.</td>
          </tr>
        </tbody>
      </table>
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 5, 11, 15, 20, 22, 15],
  average: 3.6,
  comment: (
    <>
      The first mark was awarded for identifying one relevant green chemistry principle (GCP).
      <br />
      The second mark was awarded for using evidence to support/explain how the two methods relate to this GCP.
      <br />
      The third mark was awarded for identifying a second relevant GCP.
      <br />
      The fourth mark was awarded for using evidence to support/explain how the two methods relate to this GCP.
      <br />
      The fifth mark was awarded for providing a relevant ethical factor relating to global steel production.
      <br />
      The sixth mark was awarded for a concluding statement that related to the evidence the student provided.
      <br />
      <b>Examples that could have been used for green chemistry principles included:</b>
      <br />
      <i>Prevention of waste</i>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Data to use
          <ul className="pl-5 flex flex-col gap-1">
            <li>− comparing the relative amounts of CO₂ produced, OR</li>
            <li>− comparing both CO₂ and O₂ as waste/by-product with respect to their environmental impact.</li>
          </ul>
        </li>
        <li>The blast furnace process has a by-product of little industrial use (CO₂), so that becomes waste. MOE has no direct CO₂ emissions.</li>
        <li>The MOE process has a by-product (O₂), but it is less harmful and has some industrial use, so it is not as harmful a &lsquo;waste&rsquo; by-product as CO₂.</li>
      </ul>
      <i>Design for energy efficiency</i>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Data to use
          <ul className="pl-5 flex flex-col gap-1">
            <li>− comparing temperature requirements of the two processes, OR</li>
            <li>− comparing electrical energy requirements of the two processes.</li>
          </ul>
        </li>
        <li>The blast furnace needs more heat energy (2200 compared to 1600). This is more likely done through the burning of fossil fuels.</li>
        <li>The MOE process needs more electrical energy than the blast furnace process. It could be argued that the former is not as energy efficient if done by using fossil fuels to produce the electricity. However, it could also be more energy efficient if both the heating stage and the electrolysis stage are done using electricity from renewable energy sources.</li>
      </ul>
      Note: Therefore, students could use data to justify either the blast furnace process OR the MOE process for this GCP.
      <br />
      <i>Atom economy</i>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Data to use
          <ul className="pl-5 flex flex-col gap-1">
            <li>− atom economy of two reactions, with Fe as the desired product.</li>
          </ul>
        </li>
        <li>Fe from BF process – 62.8%</li>
        <li>Fe from MOE process – 69.9%</li>
      </ul>
      If the worded explanation is reasonable, students would not have to provide detailed mathematical proofs.
      For example, the blast furnace process has <i>more</i> mass of reactants (C, coke) and an undesired
      by-product with <i>more</i> mass (CO₂ compared to O₂), so logically the atom economy of the MOE process
      should be better.
      <br />
      <b>Examples that could have been used for ethical factors included:</b>
      <br />
      Any discussion connecting the argument that the MOE process would only be green and sustainable if
      electricity from renewable sources is used, and that <i>access</i> to this will vary significantly
      across countries/globally.
      <br />
      For example:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Renewable energy technology is not set up / accessible in all regions – some steel producers might want to change to the MOE process but cannot do so.</li>
        <li>Renewable energy is needed for a lot of things, so an ethical question arises about whether the steel industry should receive priority access over other people/communities/industries.</li>
        <li>Steel is produced on a massive scale and provides many jobs; a transition to the MOE process would require large numbers of workers to retrain, and some may lose jobs.</li>
        <li>The MOE process is relatively untested and will take many years to scale up. Meanwhile, society will continue to rely on steel production.</li>
        <li>Steel, as a polluting industry, is predominantly produced today in low- to middle-income countries or disadvantaged areas of industrial countries. There is potential for these areas to benefit from a process that uses renewable energy, including health benefits.</li>
        <li>Platinum and iridium are already difficult-to-source (endangered) elements; a global switch to the MOE process would significantly increase demand and extraction of these metals, with hard-to-predict environmental and social consequences.</li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        The MOE process uses <b>far more electrical energy</b> than the blast furnace: 14 400 MJ compared with
        850 MJ per tonne of steel (about 17 times as much).
      </>
    ),
    reason: (
      <>
        Mark 1: identify the issue, using the table. 14 400 ÷ 850 = 16.9, so roughly 17 times the electricity.
        The table&rsquo;s &ldquo;~0&rdquo; CO₂ for MOE counts only what the cell itself releases (its by-product is
        O₂) — it does not count how the 14 400 MJ of electricity was generated, and that is where MOE&rsquo;s CO₂
        could come from.
      </>
    ),
  },
  {
    working: (
      <>
        A necessary requirement is that this electricity comes from <b>renewable energy sources</b> (e.g. solar,
        wind, hydro) rather than from burning fossil fuels. Only then is steel produced without large CO₂
        emissions, so society&rsquo;s need for steel is met through <b>responsible (sustainable) production</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: the requirement <b>and</b> why it gives a positive impact on Goal 12. If the electricity came from
        coal-fired power stations, the CO₂ would just move from the steelworks to the power station. The report&rsquo;s
        expected responses also include other pairs, e.g. &ldquo;MOE produces no CO₂&rdquo; + &ldquo;reduces the impact on global
        warming&rdquo;, or &ldquo;no coal mining&rdquo; + &ldquo;coal is a finite resource / causes land
        degradation&rdquo;. The report&rsquo;s table calls iridium &ldquo;radioactive&rdquo; — it isn&rsquo;t
        (natural iridium is stable); the point to make about Pt and Ir is that they are <b>rare and
        expensive</b>, so the ceramic–metal oxide anode is the better choice.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <b>Green chemistry principle 1 — Prevention of wastes.</b> The blast furnace produces <b>1600 kg of CO₂</b>{' '}
        per tonne of steel as a by-product (<Chem eq="2Fe2O3(l) + 3C(s) -> 4Fe(l) + 3CO2(g)" />). CO₂ has little
        industrial use, so it is <b>waste</b>, and it is a greenhouse gas.
      </>
    ),
    reason: (
      <>
        Mark 1: <b>name</b> a principle from the Data Book&rsquo;s list. Then give the blast-furnace half of the
        comparison, quoting the table&rsquo;s data.
        <DataBookNote>
          the paper&rsquo;s &ldquo;item 26 ii&rdquo; (green chemistry principles) is item 24 ii in the 2026 Data
          Book. The seven principles are the same.
        </DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        MOE produces <b>~0 kg of CO₂</b> per tonne; its only by-product is <b>O₂</b> (<Chem eq="2Fe2O3(l) -> 4Fe(l) + 3O2(g)" />),
        which is harmless and can be <b>used</b> (e.g. in industry or medicine). So <b>MOE better prevents waste</b>.
      </>
    ),
    reason: <>Mark 2: evidence for <b>both</b> methods against this principle, ending with which one does better. The instruction says &ldquo;compare both methods against each principle&rdquo; — one method alone is not a comparison.</>,
  },
  {
    working: (
      <>
        <b>Green chemistry principle 2 — Design for energy efficiency.</b> The blast furnace runs at <b>2200–2300 °C</b>,
        whereas MOE runs at about <b>1600 °C</b>, so MOE needs less heat, and the blast furnace&rsquo;s heat comes from
        burning coke (a <b>fossil fuel</b>).
      </>
    ),
    reason: <>Mark 3: name a second principle. The temperature data favour MOE.</>,
  },
  {
    working: (
      <>
        However, MOE uses <b>14 400 MJ</b> of electricity per tonne compared with <b>850 MJ</b> for the blast furnace
        (about 17 times as much). MOE is only the more energy-efficient, lower-impact process if its heating and
        electrolysis are powered by <b>renewable electricity</b>; if the electricity comes from fossil fuels, the
        blast furnace may be better on this principle.
      </>
    ),
    reason: (
      <>
        Mark 4: the evidence for both methods. The report notes either process could be justified here, as long as
        the data are used. <i>Alternative second principle — atom economy</i> (Fe is the desired product; Data Book:
        Fe 55.8, O 16.0, C 12.0 g mol⁻¹, so M(Fe₂O₃) = 2 × 55.8 + 3 × 16.0 = 159.6 g mol⁻¹):
        <br />
        atom economy = mass of desired product ÷ total mass of reactants × 100%
        <br />
        blast furnace: 4 × 55.8 ÷ (2 × 159.6 + 3 × 12.0) × 100% = 223.2 ÷ 355.2 × 100% = <b>62.8%</b>
        <br />
        MOE: 223.2 ÷ (2 × 159.6) × 100% = 223.2 ÷ 319.2 × 100% = <b>69.9%</b>
        <br />
        so MOE has the higher atom economy (no carbon reactant, and a lighter by-product, O₂ rather than CO₂). The
        report says a reasoned explanation without the numbers was also accepted.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Ethical factor:</b> MOE is only green if renewable electricity is available, but <b>access to renewable
        energy varies greatly between countries</b>. Poorer regions — where much steel is made — may be unable to
        switch to MOE, so the benefits (less pollution, better health) would not be shared <b>fairly</b>.
      </>
    ),
    reason: <>Mark 5: an ethical factor tied to <b>global</b> steel production — who benefits and who misses out. The report&rsquo;s examples also include jobs and retraining of steelworkers, competition for renewable energy with other communities, the time MOE needs to scale up, and the demand MOE would create for rare Pt and Ir.</>,
  },
  {
    working: (
      <>
        <b>Conclusion:</b> MOE is the <b>greener process</b> — it prevents CO₂ waste and runs at a lower
        temperature — <b>provided its large electricity demand is met by renewable sources</b>. Where
        only fossil-fuel electricity is available, its advantage over the blast furnace is much smaller.
      </>
    ),
    reason: <>Mark 6: the conclusion must <b>follow from the evidence you gave</b> — here it picks MOE but keeps the renewable-electricity condition from principle 2. It only uses the two principles written in this answer; if you chose atom economy instead, your conclusion would cite MOE&rsquo;s higher atom economy (69.9% vs 62.8%). A conclusion that ignores your own evidence (or no conclusion) loses this mark.</>,
  },
]

export default function ChemistryQ7_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (8 marks)</p>
        <p className="mb-2">
          Steel is an essential component of modern life. In 2023, approximately 1.9 billion tonnes of steel was
          made worldwide and steel production was responsible for 8% of global carbon dioxide, CO₂, emissions.
        </p>
        <p className="mb-2">
          In traditional steelmaking, iron ore, which is primarily iron(III) oxide, Fe₂O₃, is reduced with a form
          of carbon, C, known as coke. This occurs in a blast furnace with temperatures between 2200 °C and
          2300 °C, producing molten iron, Fe, and forming CO₂ as a by-product.
        </p>
        <p className="mb-2">
          One alternative process being considered is molten oxide electrolysis (MOE). In MOE, Fe₂O₃ is heated to
          approximately 1600 °C and dissolved in a liquid oxide electrolyte such as calcium oxide, CaO. Fe is
          formed at the cathode and oxygen gas, O₂(g), is formed at the inert anode. The inert anode needs to be
          highly stable and corrosion resistant. Materials being considered for the anode include:
        </p>
        <ul className="list-disc pl-5 mb-3 flex flex-col gap-1">
          <li>platinum, Pt</li>
          <li>iridium, Ir</li>
          <li>ceramic–metal oxides.</li>
        </ul>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={moeSrc}
            alt="The MOE process: an inert anode (+) dipping into Fe₂O₃ dissolved in liquid oxide electrolyte, with O₂ gas bubbling off it, above a layer of molten Fe in contact with the cathode (−) — from the original 2025 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p className="mb-2">The table below provides a summary of the key characteristics of the two processes.</p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr>
                <th className={`${cell} text-left`}>Process</th>
                <th className={cell}>Overall equation</th>
                <th className={cell}>CO₂ emissions per tonne of steel produced (kg)</th>
                <th className={cell}>Electricity used per tonne of steel produced (MJ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cell}>blast furnace</td>
                <td className={`${cell} text-center`}><Chem eq="2Fe2O3(l) + 3C(s) -> 4Fe(l) + 3CO2(g)" /></td>
                <td className={`${cell} text-center`}>1600</td>
                <td className={`${cell} text-center`}>850</td>
              </tr>
              <tr>
                <td className={cell}>MOE</td>
                <td className={`${cell} text-center`}><Chem eq="2Fe2O3(l) -> 4Fe(l) + 3O2(g)" /></td>
                <td className={`${cell} text-center`}>~0</td>
                <td className={`${cell} text-center`}>14 400</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">1 tonne = 1000 kg</p>
      </div>

      <PartCard
        letter="a"
        topic="Sustainable Development Goals"
        marks={2}
        statement={
          <>
            Goal 12 of the United Nations Sustainable Development Goals is &lsquo;responsible consumption and
            production&rsquo;.
            <br />
            Describe a necessary requirement for the MOE process to have a positive impact on this goal while still
            meeting society&rsquo;s needs for steel.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Look for MOE&rsquo;s weak spot in the data: it makes almost no CO₂, but it uses about 17 times as much
            electricity. A &ldquo;necessary requirement&rdquo; is a condition that <i>must</i> be met for the
            benefit to be real — so the key requirement is that the electricity is <b>renewable</b>. Two marks
            means two linked ideas: (1) the feature of MOE (huge electricity use) and (2) the requirement and why
            it helps Goal 12. Over half the cohort (53%) scored zero and only 15% scored both marks; every
            expected response in the report pairs a <b>feature of MOE</b> with its <b>consequence</b>, so write
            both halves, not just &ldquo;renewables&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Identifies that the MOE process requires <b>significantly more electrical energy</b> (14 400 vs 850 MJ per tonne). Other expected first marks in the report: MOE produces <b>no CO₂</b>; MOE needs <b>no coal mining</b>; the anode uses <b>rare, expensive Pt/Ir</b>.</> },
            { point: <>The matching second idea: the electricity must come from <b>renewable energy sources</b> (or: reduces the impact on <b>global warming</b>; coal is a <b>finite resource</b> / causes <b>land degradation</b>; use the <b>ceramic–metal oxide</b> anode).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Green Chemistry"
        marks={6}
        statement={
          <>
            Evaluate the MOE and the blast furnace processes with respect to green chemistry principles. Refer to{' '}
            <b>item 26 ii</b> of the Data Book, the information above and content you have learnt in VCE Chemistry
            in your response.
            <br />
            Your response must:
            <ul className="list-disc pl-5 mt-1 flex flex-col gap-1">
              <li>include <b>two</b> relevant green chemistry principles and compare both methods against each principle</li>
              <li>describe <b>one</b> ethical factor that is important to the challenge of producing steel to meet global needs</li>
              <li>include a concluding statement that is consistent with your evaluation.</li>
            </ul>
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Six marks, and the dot points tell you exactly where they are: <b>2 marks per principle</b> (name it,
            then use the data to compare <i>both</i> processes against it), <b>1 mark</b> for an ethical factor and{' '}
            <b>1 mark</b> for a conclusion. Plan the answer as four short labelled paragraphs. Pick principles the
            data can actually test — prevention of wastes (CO₂ vs O₂), design for energy efficiency (temperatures and
            electricity) or atom economy (from the two equations). &ldquo;Evaluate&rdquo; means weigh up, so say where
            MOE is <i>not</i> clearly better (its electricity use), and make sure your conclusion agrees with the
            evidence you gave — the sixth mark is only for a conclusion &ldquo;that related to the evidence the student
            provided&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Identifies one relevant <b>green chemistry principle</b>, e.g. <b>prevention of wastes</b>.</> },
            { point: <>Uses <b>evidence</b> to explain how <b>both</b> methods relate to it, e.g. blast furnace <b>1600 kg CO₂</b> per tonne (waste) vs MOE <b>~0 CO₂</b>, by-product <b>O₂</b> is less harmful and useful.</> },
            { point: <>Identifies a <b>second</b> relevant principle, e.g. <b>design for energy efficiency</b> (or <b>atom economy</b>).</> },
            { point: <>Uses <b>evidence</b> for both methods, e.g. <b>2200 °C vs 1600 °C</b>, but <b>14 400 vs 850 MJ</b> electricity — MOE better only with <b>renewable electricity</b> (or atom economy <b>62.8% vs 69.9%</b>).</> },
            { point: <>A relevant <b>ethical factor</b> for global steel production, e.g. <b>unequal access to renewable energy</b> across countries, <b>jobs/retraining</b>, or demand for rare Pt/Ir.</> },
            { point: <>A <b>concluding statement consistent with the evidence</b> given, e.g. MOE is greener <b>provided its electricity is renewable</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
