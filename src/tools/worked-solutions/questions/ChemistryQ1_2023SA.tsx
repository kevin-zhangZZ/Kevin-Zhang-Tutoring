// 2023 Chemistry Exam, Section B Question 1 (11 marks). Coconut oil: the fatty-acid composition
// table, hydrolysis of the oil to glycerol, the molecular formula of the triglyceride made from
// three caprylic acid molecules, why vitamin E dissolves in coconut oil, and a coconut-oil fuel
// cell with an alkaline (KOH) electrolyte — cathode half-equation, a cathode design feature,
// fuel cell vs combustion, and why coconut oil may not be a practical fuel. Question text and
// the fatty-acid table transcribed from the original paper; the vitamin E structure is cropped
// from the original VCAA exam PDF. Mark allocations are from the VCAA examination report; the
// "How to Think About It" notes, model answers and working are original. VCAA report only — no
// second source. Formula and half-equation balances checked in Python.
// The 2023 report prints its mark distributions as proportions (0.4, 0.6) rather than
// percentages; they are converted to percentages here (0.4 → 40%).
// Study design: a. (omega-3 fatty acids) and b. (oxidative rancidity) are old-study-design
// nutrition content — kept as statements with a "Not in the Current Study Design" note, as for
// 2021 SAQ3d.i (omega classification) and 2022 SAQ4b.ii (rancidity). Part a. was also judged
// flawed by VCAA (conflicting name and formula for linoleic acid) and every student was awarded
// the mark. Part b. is borderline: its answer rests on the degree of unsaturation, which IS in
// the current study design — flagged for KZ.
// Report: 1d.'s average (0.3) is slightly higher than its 0.8 / 0.2 distribution gives (0.2); the
// general comments say 23% answered correctly. Kept as printed. (1e. and 1h. averages, 0.7 and
// 0.4, are likewise 0.1 above what their rounded proportions give — rounding, kept as printed.)

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import vitaminESrc from './chem-2023sa-q1-vitamin-e.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const FATTY_ACIDS: [string, string, number][] = [
  ['caprylic acid', 'C8H16O2', 8],
  ['capric acid', 'C10H20O2', 7],
  ['lauric acid', 'C12H24O2', 49],
  ['myristic acid', 'C14H28O2', 18],
  ['palmitic acid', 'C16H32O2', 8],
  ['stearic acid', 'C18H36O2', 2],
  ['oleic acid', 'C18H34O2', 6],
  ['linoleic acid', 'C18H32O2', 2],
]

const EXAM_C: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: <>Glycerol</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [80, 20],
  average: 0.3,
  comment: (
    <>
      C₂₇H₅₀O₆
      <br />
      Students found it difficult to reassemble this triglyceride from its components.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [50, 40, 10],
  average: 0.7,
  comment: (
    <>
      The first mark was awarded for recognising that both vitamin E and coconut oil are non-polar compounds.
      <br />
      The second mark was awarded for recognising that the vitamin E would then dissolve in coconut oil because of
      the dispersion forces that would form between these two compounds.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq)
      <br />
      Students were required to present this equation, with correct states (available in the Data Book), using a
      single-headed arrow.
      <br />
      This was a challenging question for students, demonstrating the difficulty they continue to have with
      interpreting redox questions.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      The design feature of the cathode could have been any of the following concepts:
      <br />
      porous / high surface area / catalyst added to surface.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Students were required to link the concept of higher efficiency being associated with the fuel cell when
      compared with direct combustion.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [80, 10, 10],
  average: 0.4,
  comment: (
    <>
      Students were required to provide a viable <i>reason</i> and then link this to the <i>practical application</i> of a
      fuel cell.
      <br />
      Typical examples included:
      <div className="pl-6 flex flex-col gap-1 italic">
        <span>
          &lsquo;Coconut oil is viscous (reason) and this means that it may be difficult for the fuel to then flow
          effectively through the cell (application).&rsquo;
        </span>
        <span>
          &lsquo;Coconut oil is non-polar and therefore not soluble in water (reason) and this means that it may be
          difficult for the fuel to effectively interact with the aqueous alkaline electrolyte (application).&rsquo;
        </span>
      </div>
      Many students believed that fuel cells require gaseous fuels to be able to operate; however, this is not a
      requirement of a fuel cell. There are numerous applications where the fuel is a liquid or a solute present in a
      solution.
    </>
  ),
}

const ROWS_C: WorkingRow[] = [
  {
    working: <>triglyceride + 3H₂O → glycerol + 3 fatty acids</>,
    reason: <>Fats and oils are <b>triglycerides</b>: three fatty acids joined to one glycerol by ester links. In the body they are broken down by <b>hydrolysis</b> (water splits each ester link), which releases the fatty acids and the glycerol backbone.</>,
  },
  {
    working: <b>glycerol (propane-1,2,3-triol)</b>,
    reason: <>The question asks for the <b>other product</b>, so name the product that is not a fatty acid. Water is a <b>reactant</b> in hydrolysis, not a product — don&rsquo;t write water.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>glycerol + 3 caprylic acid → triglyceride + 3H₂O</>,
    reason: <>&ldquo;Metabolised to produce three caprylic acid molecules&rdquo; means a triglyceride whose three fatty acids are all caprylic acid. Build it the way the body does: a <b>condensation</b> reaction forms one ester link per fatty acid and releases <b>one water per link</b> — three links, three H₂O.</>,
  },
  {
    working: <>glycerol: C₃H₈O₃ &nbsp;&nbsp; caprylic acid: C₈H₁₆O₂ (from the table)</>,
    reason: <>Glycerol is propane-1,2,3-triol, CH₂(OH)CH(OH)CH₂OH: 3 C, 8 H, 3 O.</>,
  },
  {
    working: <>C₃H₈O₃ + 3 × C₈H₁₆O₂ = C₃H₈O₃ + C₂₄H₄₈O₆ = C₂₇H₅₆O₉</>,
    reason: <>Add up all the atoms going in. Stopping here (C₂₇H₅₆O₉) forgets the water that condensation removes.</>,
  },
  {
    working: <>C₂₇H₅₆O₉ − 3H₂O = C₂₇H₅₆O₉ − H₆O₃</>,
    reason: <>Take away three water molecules (6 H and 3 O). Taking away only one H₂O is the other easy slip.</>,
  },
  {
    working: <b>C₂₇H₅₀O₆</b>,
    reason: <>Check: a triglyceride always has <b>6 O atoms</b> (three ester groups, 2 O each), and the carbons are 3 (glycerol) + 3 × 8 = 27 ✓. The report notes students found it difficult to reassemble the triglyceride from its components — glycerol + 3 fatty acids − 3H₂O is the recipe.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>Vitamin E is <b>mainly non-polar</b>: it is mostly a <b>long hydrocarbon chain</b> and rings of C–C and C–H bonds, with only two small polar parts — one –OH group and one ring O atom.</>,
    reason: <>Mark 1 (part): classify the solute from the structure above. One –OH group and one ring oxygen cannot make such a large molecule (29 carbons) polar overall — the hydrocarbon part dominates.</>,
  },
  {
    working: <>Coconut oil (triglycerides with long fatty-acid hydrocarbon chains) is also <b>non-polar</b>.</>,
    reason: <>Mark 1 needs <b>both</b> to be identified as non-polar — vitamin E <i>and</i> the solvent.</>,
  },
  {
    working: <>So vitamin E dissolves because <b>dispersion forces</b> form between the vitamin E molecules and the coconut oil molecules, similar in strength to the dispersion forces within each substance.</>,
    reason: <>Mark 2: name the <b>intermolecular force</b> that forms between solute and solvent. &ldquo;Like dissolves like&rdquo; on its own names no force, so it is not enough.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <>Cathode: <b>reduction</b>. O₂ is the oxidising agent and is reduced; coconut oil (the fuel) is oxidised at the anode.</>,
    reason: <>In every fuel cell the fuel is oxidised at the anode and oxygen is reduced at the cathode — so the cathode reaction doesn&rsquo;t depend on the fuel at all.</>,
  },
  {
    working: <>O₂(g) + 4H⁺(aq) + 4e⁻ → 2H₂O(l)</>,
    reason: <>If you only remember the acidic version, start from it and convert it for <b>alkaline</b> conditions: there is no H⁺ in KOH(aq).</>,
  },
  {
    working: <>O₂(g) + 4H⁺(aq) + 4OH⁻(aq) + 4e⁻ → 2H₂O(l) + 4OH⁻(aq)</>,
    reason: <>Add 4OH⁻ to <b>both</b> sides, one for each H⁺.</>,
  },
  {
    working: <>O₂(g) + 4H₂O(l) + 4e⁻ → 2H₂O(l) + 4OH⁻(aq)</>,
    reason: <>H⁺ + OH⁻ → H₂O on the left, then cancel 2H₂O from each side.</>,
  },
  {
    working: <b>O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq)</b>,
    reason: <>This is exactly the Data Book&rsquo;s half-equation (E° = +0.40 V). Check: 4 O and 4 H each side; charge −4 on each side ✓. Write it with <b>states</b> and a <b>single-headed arrow</b> (→), not the Data Book&rsquo;s ⇌ — the report required both.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <>The cathode is <b>porous</b>, giving a <b>high surface area</b> where O₂ gas, the electrolyte and the electrode meet.</>,
    reason: <>The reaction can only happen where all three meet, so more contact area means a <b>faster rate</b> and more current. Coating the surface with a <b>catalyst</b> was also accepted. One feature is enough for the mark.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <>A fuel cell converts <b>chemical energy directly into electrical energy</b>, so it has a <b>higher energy efficiency</b> than burning the oil.</>,
    reason: <>The mark is for <b>higher efficiency</b>, linked to the fuel cell.</>,
  },
  {
    working: <>Direct combustion converts chemical energy to heat, then to mechanical and electrical energy, and <b>energy is lost as heat</b> at each conversion.</>,
    reason: <>This is the &ldquo;why&rdquo; behind the efficiency claim: fewer energy conversions, less waste heat.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <>Coconut oil is <b>viscous</b> (its large triglyceride molecules have strong dispersion forces between them).</>,
    reason: <>Mark 1: a <b>reason</b> — a property of coconut oil. Note the question rules out environmental or sustainability arguments.</>,
  },
  {
    working: <>So it would be <b>difficult for the fuel to flow</b> effectively through the cell to the anode, slowing the reaction and lowering the cell&rsquo;s output.</>,
    reason: (
      <>
        Mark 2: <b>link</b> the property to how the fuel cell <b>works in practice</b>. Another accepted answer: coconut oil is <b>non-polar</b>, so it is <b>not soluble in water</b> and cannot interact effectively with the <b>aqueous alkaline electrolyte</b>. Do <b>not</b> say &ldquo;fuel cells need a gaseous fuel&rdquo; — the report notes many students believed this, and it is wrong: many fuel cells run on liquid fuels or dissolved fuels.
      </>
    ),
  },
]

export default function ChemistryQ1_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p className="mb-3">
          Coconut oil consists almost entirely of fats and oils. The typical fatty acid composition of coconut oil is
          shown in the following table.
        </p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className={TD}>Name</th>
              <th className={TD}>Formula</th>
              <th className={TD}>Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {FATTY_ACIDS.map(([name, formula, pct]) => (
              <tr key={name}>
                <td className={TD}>{name}</td>
                <td className={`${TD} text-center`}><Chem eq={formula} /></td>
                <td className={`${TD} text-center`}>{pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
          Source: adapted from L Boateng, R Ansong, W Owusu and M Steiner-Asiedu, &lsquo;Coconut oil and palm oil&rsquo;s
          role in nutrition, health and national development: A review&rsquo;, <i>Ghana Medical Journal</i>, 2016,
          National Library of Medicine, &lt;ncbi.nlm.nih.gov/pmc/articles/PMC5044790/&gt;
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Omega Fatty Acids"
        marks={1}
        statement={<>Determine the percentage of omega-3 fatty acids typically found in coconut oil.</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part a. asks for the omega-3 classification of fatty acids (where the first C=C sits, counted from the CH₃
            end). Omega-3/omega-6 classification belonged to the old study design&rsquo;s nutrition content and is not in
            the 2024–2027 one, so it is left without a worked solution (the skip guide skips the same content in 2018
            MCQ 8). VCAA also judged that this part contained conflicting information and awarded every student the
            mark: its report says 0% is correct from the name linoleic acid (an omega-6), and 2% possibly correct if
            the formula is read as linolenic acid (an omega-3). Note that the Data Book lists C₁₈H₃₂O₂ as linoleic acid
            and linolenic acid as C₁₈H₃₀O₂.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="b"
        topic="Oxidative Rancidity"
        marks={1}
        statement={<>State why coconut oil is resistant to oxidative rancidity.</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part b. is about <b>oxidative rancidity</b> of fats and oils, which belonged to the old study design and is
            not in the 2024–2027 one. It is left without a worked solution; the skip guide skips the same content in
            2017 MCQ 12.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="c"
        topic="Hydrolysis of Fats"
        marks={1}
        statement={
          <>
            Coconut oil reacts in the body to produce fatty acids.
            <br />
            Name the other product of this reaction.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Coconut oil is mostly triglycerides, and &ldquo;reacts in the body to produce fatty acids&rdquo; is{' '}
            <b>hydrolysis</b>. Picture what a triglyceride is made of — a glycerol backbone carrying three fatty acids —
            and the answer is whatever is left once the fatty acids come off. One mark, one word.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme source="ours" points={[{ point: <><b>Glycerol</b> (propane-1,2,3-triol).</> }]} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Triglyceride Formula"
        marks={1}
        statement={
          <>
            Coconut oil can be metabolised by the body to produce caprylic acid.
            <br />
            Write the molecular formula of the molecule found in coconut oil that can be metabolised to produce three
            caprylic acid molecules.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            The molecule is a <b>triglyceride</b> made from glycerol and three caprylic acids. Run the hydrolysis
            backwards: a <b>condensation</b> reaction joins them and gives off <b>three water molecules</b>. So the
            formula is glycerol + 3 × caprylic acid − 3H₂O. Only about a quarter of students got this; the report notes students found it
            difficult to reassemble the triglyceride from its components.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme source="ours" points={[{ point: <>Molecular formula <b>C₂₇H₅₀O₆</b> (glycerol + 3 caprylic acid − <b>3H₂O</b>).</> }]} />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">
          Coconut oil contains vitamin E, and negligible quantities of other vitamins and minerals.
          <br />
          The structure of vitamin E is given below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
          <img
            loading="lazy"
            decoding="async"
            src={vitaminESrc}
            alt="Skeletal structure of vitamin E: a benzene ring carrying one OH group and three methyl groups, fused to an oxygen-containing ring, joined to a long branched hydrocarbon chain — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Solubility"
        marks={2}
        statement={<>Explain why vitamin E is soluble in coconut oil.</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Solubility questions are about <b>polarity</b> and <b>intermolecular forces</b>. Two marks means two ideas:
            first classify <b>both</b> substances (vitamin E and coconut oil are both non-polar), then name the force that
            forms <b>between</b> them (dispersion forces). Half the students scored zero, so make sure both ideas are there: &ldquo;like
            dissolves like&rdquo; on its own, or describing only vitamin E, does not cover them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Recognising that <b>both vitamin E and coconut oil are non-polar</b>.</> },
            { point: <>Vitamin E dissolves because <b>dispersion forces</b> form <b>between</b> vitamin E and coconut oil molecules.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p>
          Scientists are investigating the possibility of using coconut oil with an aqueous electrolyte of potassium
          hydroxide, KOH(aq), to power a fuel cell.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Fuel Cell Half-Equation"
        marks={1}
        statement={<>Write the half-equation that would occur at the cathode of a coconut oil fuel cell in an alkaline electrolyte.</>}
        examinerReport={EXAM_FI}
      >
        <Background title="How to Think About It">
          <p>
            Ignore the unfamiliar fuel: in <b>any</b> fuel cell the cathode is where <b>oxygen is reduced</b>. The only
            decision is the conditions — the electrolyte is KOH, so the half-equation must use <b>OH⁻ and H₂O</b>, not H⁺.
            It is in the Data Book&rsquo;s electrochemical series. The single mark needs the right equation, correct
            states and a single-headed arrow.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FI} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <><b>O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq)</b> — with <b>correct states</b> and a <b>single-headed arrow</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Fuel Cell Design"
        marks={1}
        statement={<>State <b>one</b> design feature of the cathode that helps the fuel cell operate efficiently.</>}
        examinerReport={EXAM_FII}
      >
        <Background title="How to Think About It">
          <p>
            Think about what the cathode has to do: bring <b>gaseous O₂</b>, the electrolyte and the electrode together so
            the reaction from f.i can happen quickly. Any feature that increases that contact or speeds the reaction
            earns the mark — <b>porous</b>, <b>high surface area</b>, or a <b>catalyst</b> on the surface.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FII} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Any one of: <b>porous</b> electrode / <b>high surface area</b> / <b>catalyst</b> added to the surface.</> }]}
        />
      </PartCard>

      <PartCard
        letter="g"
        topic="Fuel Cell Efficiency"
        marks={1}
        statement={<>State <b>one</b> reason why it may be better to obtain energy from coconut oil using a fuel cell rather than direct combustion.</>}
        examinerReport={EXAM_G}
      >
        <Background title="How to Think About It">
          <p>
            The standard comparison between a fuel cell and burning a fuel is <b>energy efficiency</b>. A fuel cell goes
            straight from chemical to electrical energy; combustion goes through heat first and wastes much of it. The
            report required the idea of <b>higher efficiency</b>, linked to the fuel cell.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>The fuel cell has <b>higher energy efficiency</b> than direct combustion (chemical energy converted <b>directly</b> to electrical energy, less lost as <b>heat</b>).</> }]}
        />
      </PartCard>

      <PartCard
        letter="h"
        topic="Fuel Cell Practicality"
        marks={2}
        statement={
          <>
            Give <b>one</b> reason why coconut oil may not be a <b>practical</b> fuel for a fuel cell. Do not refer to
            environmental issues or sustainability in your answer.
          </>
        }
        examinerReport={EXAM_H}
      >
        <Background title="How to Think About It">
          <p>
            Two marks means two linked ideas: a <b>property of coconut oil</b> (the reason), then <b>what that property
            does to the running of the fuel cell</b> (the application). Look at what coconut oil is — large, non-polar
            triglyceride molecules — and at the cell — the fuel must flow to the anode and react in contact with an{' '}
            <b>aqueous</b> electrolyte. Avoid the trap the report describes: fuel cells do <b>not</b> need gaseous fuels.
          </p>
        </Background>
        <WorkingTable rows={ROWS_H} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A viable <b>reason</b> — a property of coconut oil, e.g. it is <b>viscous</b> (or <b>non-polar / not soluble in water</b>).</> },
            { point: <><b>Link</b> to the practical operation of the fuel cell, e.g. <b>difficult for the fuel to flow</b> through the cell (or to <b>interact with the aqueous alkaline electrolyte</b>).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
