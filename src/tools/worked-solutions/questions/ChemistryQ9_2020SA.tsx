// 2020 Chemistry Exam, Section B Question 9 (13 marks). A student's experimental report on how
// temperature affects the rate of HCl(aq) + CaCO₃(s): safety (SDS, hazard + precaution), the
// independent and dependent variables, a collision-theory prediction, whether the graph fits the
// prediction, how the graph should have been drawn, and changes that improve precision.
// Question text transcribed from the original paper; the results graph is cropped from the
// original VCAA exam PDF. Mark allocations follow the VCAA examination report, which marks each
// creditable point with an asterisk in parts a, c and d.i and lists the accepted answers in b,
// d.ii and e; part f's scheme is our reading. The worked solutions, "How to Think About It"
// notes and model answers are original. VCAA report only (no second source).
// All content (safety data sheets, variables, collision theory, precision) is on the current
// study design. Report slip: in 9c and 9f the report refers to a "test tube", but the paper's
// method uses a conical flask — kept verbatim and noted in the working.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import graphSrc from './chem-2020sa-q9-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [46, 49, 5],
  average: 0.6,
  comment: (
    <>
      Refer to the Safety Data Sheets (SDS or MSDS) for each of the chemicals or a prepared approved risk
      assessment document. *
      <br />
      Follow all suggested storage, handling and personal protective equipment guidelines given in the
      material safety data sheets.
      <br />
      OR
      <br />
      Identify hazard and precaution relevant to the experiment (acid/glass). *
      <br />
      The study design has a specific reference on following recommended protocols from safety data
      sheets. To obtain the first mark students needed to indicate that they understood this. Only a
      handful of students were awarded the second mark, as most suggested precautions for the acid
      without first identifying the hazard associated with it.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>Temperature of the HCl solution.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [11, 30, 58],
  average: 1.5,
  comment: (
    <>
      Either of: *
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The dependent variable is the rate of production of CO₂ gas / rate of the reaction.</li>
        <li>The dependent variable may be time.</li>
      </ul>
      It is measured by timing how long the balloon takes to rise 10 cm over the test tube. *
      <br />
      Generally this question was well handled. However, students need to make sure that they have
      addressed all aspects of the question, i.e. both &lsquo;what&rsquo; and &lsquo;how&rsquo; in this case.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [11, 41, 31, 16],
  average: 1.5,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          As temperature increases, the rate of reaction increases / the time taken for the balloon to
          reach 10 cm decreases. *
        </li>
        <li>
          This is because increased temperature increases the speed of particles which increases the
          frequency of collisions (number of collisions per unit time) between reactants thereby
          increasing the rate of the reaction. *
        </li>
        <li>
          Increased temperature also increases the energy of the particles which means that a greater
          proportion of particles have enough energy to overcome the activation energy barrier resulting
          in a greater proportion of collisions that are successful which also increases the reaction
          rate. *
        </li>
      </ul>
      Most students found it easy to obtain the first mark, but a significant number did not use the
      appropriate terminology for the rest of the question. It was important to realise that
      &lsquo;time&rsquo; or &lsquo;frequency&rsquo; was a key aspect of the response and thus it was not
      enough to say &lsquo;an increase in the number of collisions occurs&rsquo;. Likewise, in the third
      key point, students needed to refer to &lsquo;a greater proportion&rsquo; rather than &lsquo;a
      greater number&rsquo; of collisions to obtain the mark.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      One of:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>No. There is not a consistent trend, time for reaction is lower / rate is higher at 15°C than at 25°C.</li>
        <li>Yes. If the data was presented using a line of best fit the overall trend is consistent with the prediction.</li>
        <li>Yes. If the outlier (data point showing 25°C) is ignored.</li>
      </ul>
      It is important that students recognise the presence of anomalous data and avoid generalisations
      when specific information is shown/given.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [33, 46, 21],
  average: 0.9,
  comment: (
    <>
      Any two of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The temperature is the independent variable so it should be on the horizontal axis.</li>
        <li>The rate of the reaction – the dependent variable – should be on the vertical axis.</li>
        <li>The line of best fit / trendline rather than &lsquo;join the dots&rsquo; / ignore outlier.</li>
      </ul>
      Most responses did not focus on what the experiment was actually attempting to do, which is to
      determine how temperature affected the rate of the reaction. Instead, a large number of students
      proposed &lsquo;converting the graph into a bar graph&rsquo; or gave superficial responses such as
      using &lsquo;better titles&rsquo; or &lsquo;adjusted axis&rsquo;.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [56, 33, 11],
  average: 0.6,
  comment: (
    <>
      Acceptable responses included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Use a more accurate way of measuring the volume, e.g. gas syringe. The balloons may have
          different shapes which means that the volume of each balloon when it rises 10 cm over the top of
          the conical flask may vary.
        </li>
        <li>
          Ensure that the initial quantities are measured to a greater number of significant figures, i.e.
          acid concentration to 2.0 M (rather than 2 M) and/or change mass of CaCO₃ to 0.60 g (rather than
          0.6 g).
        </li>
        <li>
          Find a faster way of sealing the test tube once the reactants are mixed. This will ensure that
          none of the gas escapes.
        </li>
        <li>Use uniformly powdered CaCO₃ to minimise surface variations.</li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Before starting, refer to the <b>safety data sheets (SDS)</b> for HCl and CaCO₃ (or a prepared, approved <b>risk assessment</b>).</>,
    reason: <>Mark 1: the general rule. The study design names <b>SDS</b> as the source of safety protocols, so the phrase &ldquo;safety data sheet&rdquo; or &ldquo;risk assessment&rdquo; is what earns this mark.</>,
  },
  {
    working: <>Follow the SDS&rsquo;s storage, handling and <b>personal protective equipment</b> guidelines. In particular — <b>hazard:</b> 2 M hydrochloric acid is <b>corrosive</b> and can burn skin and eyes; <b>precaution:</b> wear <b>safety glasses and gloves</b>, and wipe up any spill immediately.</>,
    reason: <>Mark 2: the report gives two routes — follow all the SDS storage/handling/PPE guidelines, <b>or</b> identify a <b>specific hazard</b> in this experiment <b>and</b> the precaution that controls it. Naming the hazard first is the safe way to earn it: the report says only a handful of students earned this mark, as most gave precautions for the acid (&ldquo;wear gloves&rdquo;) without first identifying the hazard. Glassware (the flask could break and cut) is also accepted as the hazard.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <b>The temperature of the HCl solution.</b>,
    reason: <>The independent variable is the one the experimenter <b>deliberately changes</b>: step 6 repeats the experiment at 5, 15, 25, 35 and 45 °C. Name what it is the temperature <i>of</i> — the HCl solution sits in the water bath.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>The dependent variable is the <b>rate of production of CO₂ gas</b> (the rate of reaction).</>,
    reason: <>Mark 1 (&ldquo;what&rdquo;): the dependent variable is what <b>responds</b> to the change in temperature. The report also accepts &ldquo;time&rdquo;.</>,
  },
  {
    working: <>It is measured by <b>timing how long the balloon takes</b> to inflate to <b>10 cm above the conical flask</b> — a <b>shorter time</b> means a <b>faster rate</b>.</>,
    reason: <>Mark 2 (&ldquo;how&rdquo;): from steps 4–5 of the method. Each run collects (roughly) the same volume of CO₂, so the time taken is an inverse measure of rate. The report reminds students to answer <b>both</b> the &ldquo;what&rdquo; and the &ldquo;how&rdquo;. (The report&rsquo;s &ldquo;test tube&rdquo; is a slip for the conical flask.)</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <><b>Prediction:</b> as the temperature increases, the <b>rate of reaction increases</b>, so the <b>time taken</b> for the balloon to reach 10 cm <b>decreases</b>.</>,
    reason: <>Mark 1: the relationship, stated in terms of both variables (temperature → rate / time).</>,
  },
  {
    working: <>At a higher temperature the particles have more kinetic energy and <b>move faster</b>, so H⁺ ions (from the HCl) collide with the CaCO₃ surface <b>more frequently</b> — there are <b>more collisions per unit time</b>.</>,
    reason: <>Mark 2: collision <b>frequency</b>. The report says &ldquo;more collisions&rdquo; on its own was not enough — it must be <b>per unit time</b> (frequency), because rate is about how fast things happen.</>,
  },
  {
    working: <>Also, a <b>greater proportion</b> of particles have energy <b>equal to or greater than the activation energy</b>, so a <b>greater proportion of collisions are successful</b>. Both effects increase the rate.</>,
    reason: <>Mark 3: the activation-energy idea — the bigger of the two effects. The report required &ldquo;a greater <b>proportion</b>&rdquo;, not &ldquo;a greater number&rdquo;, of successful collisions.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <>Reading the graph: 5 °C ≈ 87 s, 15 °C ≈ 76 s, 25 °C ≈ 77 s, 35 °C ≈ 54 s, 45 °C ≈ 50 s.</>,
    reason: <>Read each point carefully. Time is on the <i>horizontal</i> axis here, so from each point read straight down to the time axis.</>,
  },
  {
    working: <><b>No.</b> The overall trend fits (the time falls from about 87 s at 5 °C to about 50 s at 45 °C), but the time at <b>25 °C (≈77 s) is longer than at 15 °C (≈76 s)</b>, so the <b>rate is lower at the higher temperature</b>. The trend is <b>not consistent</b> across all the data — the 25 °C point is an <b>outlier</b>.</>,
    reason: <>The mark needs a yes/no <b>with reasoning that refers to the specific data</b>. The report equally accepted &ldquo;<b>Yes</b>, if the 25 °C outlier is ignored&rdquo; or &ldquo;<b>Yes</b>, with a line of best fit&rdquo; — pick one side and justify it with the data. The report warns against generalisations when specific data are shown — a bare &ldquo;yes, the time decreases&rdquo; ignores the anomaly. Only 25% scored this mark.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>1. Put the <b>independent variable (temperature) on the horizontal (x) axis</b> and the <b>dependent variable (rate, or time) on the vertical (y) axis</b>.</>,
    reason: <>Convention: the variable you change goes across, the variable that responds goes up. The student&rsquo;s graph has them swapped. The report lists these as two separate points (temperature on the horizontal axis; rate on the vertical axis), so this swap alone can earn both marks. Plotting <b>rate</b> (e.g. 1/time) rather than time makes the trend read directly.</>,
  },
  {
    working: <>2. Draw a <b>line (or curve) of best fit / trendline</b> instead of joining the dots, so the <b>outlier at 25 °C</b> doesn&rsquo;t distort the trend.</>,
    reason: <>A trendline shows the overall relationship between temperature and rate; joining the dots makes the anomalous 25 °C point look like a real change in trend.</>,
  },
  {
    working: <>(Not enough: &ldquo;make it a bar graph&rdquo;, &ldquo;better title&rdquo;, or a vague &ldquo;adjust the axes&rdquo; that doesn&rsquo;t say which variable goes where.)</>,
    reason: <>The report says these superficial changes did not address what the graph is for — showing how temperature affects rate. Both variables are continuous, so a line graph (not a bar graph) is correct.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <>Precision = how <b>close repeated measurements are to each other</b>; it improves when <b>random errors</b> are reduced.</>,
    reason: <>Know the definition first — each change must be linked to reducing variation between results, and the question asks you to explain how.</>,
  },
  {
    working: <>1. Collect the CO₂ in a <b>gas syringe</b> and time how long it takes to reach a fixed volume (e.g. 50 mL), instead of using a balloon. Balloons <b>vary in shape and stretch</b>, so &ldquo;10 cm above the flask&rdquo; is not always the same volume of gas; a gas syringe measures the <b>same volume every time</b>, so <b>results vary less</b>.</>,
    reason: <>Mark 1: a change <b>plus</b> how it improves precision.</>,
  },
  {
    working: <>2. Use <b>uniformly powdered</b> CaCO₃ (or chips all the same size) in every run. Chips have <b>different surface areas</b>, which changes the rate from run to run; a uniform particle size keeps <b>surface area constant</b>, so <b>results vary less</b>.</>,
    reason: <>Mark 2: a second, different change with its explanation. Also accepted: measure the quantities more precisely (2.0 M acid, 0.60 g CaCO₃), or seal the flask faster so no gas escapes. (The report&rsquo;s &ldquo;test tube&rdquo; in that last point is a slip for the conical flask.)</>,
  },
]

export default function ChemistryQ9_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (13 marks)</p>
        <p className="mb-2">A student decided to investigate the effect of temperature on the rate of the following reaction.</p>
        <p className="mb-2 pl-6"><Chem eq="2HCl(aq) + CaCO3(s) -> CaCl2(aq) + H2O(l) + CO2(g)" /></p>
        <p className="mb-3">Part of the student&rsquo;s experimental report is provided below.</p>
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 flex flex-col gap-3">
          <p className="font-semibold text-gray-900 dark:text-white">Effect of temperature on the rate of production of carbon dioxide gas</p>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Aim</p>
            <p>
              To find out how temperature affects the rate of production of carbon dioxide gas, CO₂, when a
              solution of hydrochloric acid, HCl, is added to chips of calcium carbonate, CaCO₃
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Method</p>
            <ol className="list-decimal pl-6 flex flex-col gap-0.5">
              <li>Put 0.6 g of CaCO₃ chips into a conical flask.</li>
              <li>Put a reagent bottle containing 2 M HCl into a water bath at 5 °C.</li>
              <li>When the temperature of the HCl solution has stabilised at 5 °C, use a pipette to put 10.0 mL of the HCl solution into the conical flask containing the CaCO₃ chips.</li>
              <li>Put a balloon over the conical flask and begin timing.</li>
              <li>When the top of the balloon has inflated so that it is 10 cm over the conical flask, stop timing and record the time.</li>
              <li>Repeat steps 1–5 using temperatures of 15 °C, 25 °C, 35 °C and 45 °C.</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Results</p>
            <p className="mb-2">The following graph gives the experimental results.</p>
            <img
              loading="lazy"
              decoding="async"
              src={graphSrc}
              alt="Graph of experimental results: temperature (°C, vertical axis, 0–50) against time (s, horizontal axis, 0–100), points joined dot to dot at about 5 °C 87 s, 15 °C 76 s, 25 °C 77 s, 35 °C 54 s and 45 °C 50 s — from the original 2020 VCAA exam paper"
              className="w-full max-w-[480px]"
            />
          </div>
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Safety Guidelines"
        marks={2}
        statement={<>What does the student need to do to ensure that they comply with all applicable safety guidelines during the investigation?</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: the <b>general procedure</b> (consult the <b>safety data sheets</b> / a
            risk assessment) and one <b>specific hazard</b> in this experiment with its <b>precaution</b>.
            The trap the report describes: writing &ldquo;wear gloves and goggles&rdquo; without first
            saying <i>why</i> — name the hazard (HCl is corrosive), then the precaution.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Refer to the <b>safety data sheets (SDS)</b> for each chemical, or an approved <b>risk assessment</b>.</> },
            { point: <>Follow the SDS storage, handling and <b>PPE</b> guidelines, <b>or</b> identify a <b>hazard</b> relevant to the experiment (<b>corrosive acid</b> or glassware) <b>and</b> a matching <b>precaution</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Independent Variable"
        marks={1}
        statement={<>What is the independent variable?</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>The independent variable is the one thing the experimenter changes on purpose between runs. Read the aim and step 6 of the method.</p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme source="vcaa" points={[{ point: <>The <b>temperature of the HCl solution</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Dependent Variable"
        marks={2}
        statement={<>What is the dependent variable and how is it measured?</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            The question has two halves — <b>what</b> and <b>how</b> — and each is a mark. The dependent
            variable is the rate of CO₂ production; the method measures it indirectly, by timing the
            balloon. The report reminds students to address both halves of the question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The dependent variable is the <b>rate of production of CO₂</b> / rate of reaction (or <b>time</b>).</> },
            { point: <>Measured by <b>timing how long the balloon takes to rise 10 cm</b> over the flask.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Collision Theory"
        marks={3}
        statement={<>Predict the relationship between the independent variable and the dependent variable. Explain your prediction.</>}
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            Three marks: one for the <b>prediction</b> and two for the <b>two collision-theory reasons</b> a
            higher temperature speeds up a reaction — more <b>frequent</b> collisions, and a greater{' '}
            <b>proportion</b> of collisions with energy ≥ the activation energy. The report&rsquo;s traps are
            exact wording: &ldquo;more collisions&rdquo; must be &ldquo;more collisions <b>per unit time</b>&rdquo;,
            and &ldquo;more successful collisions&rdquo; must be &ldquo;a greater <b>proportion</b> of successful
            collisions&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>As temperature increases, the <b>rate increases</b> / the <b>time</b> for the balloon to reach 10 cm <b>decreases</b>.</> },
            { point: <>Particles move faster, so the <b>frequency of collisions</b> (collisions <b>per unit time</b>) increases.</> },
            { point: <>A <b>greater proportion</b> of particles have energy ≥ the <b>activation energy</b>, so a <b>greater proportion of collisions are successful</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Interpreting Data"
        marks={1}
        statement={<>Is the graph of the student&rsquo;s results consistent with your prediction? Give your reasoning.</>}
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Don&rsquo;t just glance at the overall slope — check <b>every point</b>. Four of the five points
            follow the prediction, but 25 °C took slightly <i>longer</i> than 15 °C. A full-mark answer
            names that specific anomaly and says what it means (not consistent, or consistent once the
            outlier is ignored). The report warns against a generalised &ldquo;yes&rdquo;.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of: <b>No</b> — the time is <b>lower at 15 °C than at 25 °C</b>, so the trend is not consistent; <b>or Yes</b> — with a <b>line of best fit</b> the overall trend fits; <b>or Yes</b> — if the <b>25 °C outlier</b> is ignored.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Presenting Data"
        marks={2}
        statement={<>Identify <b>two</b> ways in which the graph could have been presented differently to better illustrate the relationship between the independent variable and the dependent variable.</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Ask: what is wrong with <i>this</i> graph for showing how temperature affects rate? Two things:
            the <b>axes are swapped</b> (the independent variable belongs on the horizontal axis), and the
            points are <b>joined dot to dot</b> instead of a <b>line of best fit</b>. The report says
            &ldquo;bar graph&rdquo;, &ldquo;better title&rdquo; or &ldquo;adjusted axis&rdquo; answers missed the point.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any one of the report&rsquo;s three: <b>temperature (independent variable) on the horizontal axis</b>; <b>rate (dependent variable) on the vertical axis</b>; a <b>line of best fit / trendline</b> rather than join-the-dots / ignore the outlier.</> },
            { point: <>A <b>second, different</b> one of those three.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="f"
        topic="Improving Precision"
        marks={2}
        statement={<>Identify <b>two</b> changes that could be made to the experimental method to improve the precision of the results if the experiment was repeated. For each change, explain how it would improve precision.</>}
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            <b>Precision</b> is about how consistent repeated results are, so look for sources of{' '}
            <b>random variation</b> in the method: balloons that stretch differently, CaCO₃ chips of
            different sizes, reagents measured to one significant figure, gas escaping before the balloon is
            on. Each mark needs a <b>change</b> and <b>how it reduces that variation</b>. Over half the cohort
            scored 0 here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A first change from the accepted list — e.g. a <b>gas syringe</b> instead of a balloon (balloons vary in shape, so the volume collected varies) — <b>with how it improves precision</b>.</> },
            { point: <>A second, different change — e.g. <b>uniformly powdered CaCO₃</b> (constant <b>surface area</b>), quantities measured to more <b>significant figures</b> (2.0 M, 0.60 g), or <b>sealing faster</b> so no gas escapes — <b>with how it improves precision</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
