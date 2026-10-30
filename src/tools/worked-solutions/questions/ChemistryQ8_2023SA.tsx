// 2023 Chemistry Exam, Section B Question 8 (16 marks). Food calorimetry with a tin-can
// calorimeter: comparing the energy content of dry broad beans and dry soybeans — why the beans
// are crushed, the dependent variable, a safety step, the energy content of a broad bean from
// q = mcΔT, the energy content of a soybean from its nutrition table, an experimental error that
// explains a high result, an improvement for accuracy, and a valid conclusion.
// Question text transcribed from the original paper; the method is transcribed and both apparatus
// diagrams are cropped from the original VCAA exam PDF; the two data tables are transcribed.
// Mark allocations are from the VCAA examination report (VCAA report only — no second source),
// which itemises the marks for every part; the "How to Think About It" notes and model answers
// are original. Numbers checked in Python.
// Data Book: the report uses the 2023 Data Book's density of water, 0.997 g mL⁻¹; the working uses
// the 2026 value 1.0 g mL⁻¹ (300 g, 8.90 kJ, 8.02 kJ g⁻¹ — still 8.0 kJ g⁻¹; DataBookNote in part d). Food energy values (17, 37, 16 kJ g⁻¹) are unchanged (item 11 in 2026).
// Report slip kept verbatim: part e.i's "The second mark was for awarded for".

import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import setupSrc from './chem-2023sa-q8-setup.png'
import apparatusSrc from './chem-2023sa-q8-apparatus.png'

const BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const EXAM_A: SAExaminerStats = {
  marks: [10, 30, 60],
  average: 1.5,
  comment: (
    <>
      The first mark was awarded for recognising that the surface area of the beans was increased.
      <br />
      The second mark was awarded for reference to any one of the following:
      <br />
      increasing the rate of reaction / ensuring complete combustion / ensuring greater efficiency of combustion.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Any of the following: energy content / temperature change of water / final temperature of water.
      <br />
      Just stating &lsquo;temperature&rsquo; was not sufficient to be awarded the mark.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [10, 10, 90],
  average: 1.8,
  comment: (
    <>
      The first mark was awarded for the student referring to a step in the procedure and listing the
      precaution undertaken.
      <br />
      The second mark was awarded for explaining the risk that was being mitigated by that precaution.
      <br />
      For example:
      <br />
      Step 4 – where the precaution was the use of a heatproof mat. The mitigation of risk was explained
      as the use of a heatproof mat to reduce the chance of the laboratory catching fire.
      <br />
      <b>or</b>
      <br />
      Step 8 – where the precaution was allowing the water to cool to below 30 °C. The mitigation of risk
      was explained as waiting for the water to cool down to reduce the chance of scalding/burns.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [10, 20, 40, 30, 3],
  average: 2.1,
  comment: (
    <>
      The first mark was awarded for the correct calculation of ΔT being 32.1 – 25.0 = 7.1 °C.
      <br />
      The second mark was awarded for converting the volume of water into a mass of water:
      <br />
      <span className="pl-6 inline-block">m(water) = 300 × 0.997 = 299.1 g</span>
      <br />
      The third mark was awarded for correctly calculating the energy change in the water:
      <br />
      <span className="pl-6 inline-block">q = mCΔT = 299.1 × 4.18 × 7.1 = 8.88 kJ</span>
      <br />
      The fourth mark was awarded for correctly calculating the energy content, stated to two
      significant figures:
      <br />
      <span className="pl-6 inline-block">energy content = 8.88/1.11 = 8.0 (kJ g⁻¹)</span>
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [20, 20, 60],
  average: 1.5,
  comment: (
    <>
      The first mark was awarded for correctly calculating the energy content from data:
      <br />
      <span className="pl-6 inline-block">Energy content per 100 g = (36 × 17) + (20 × 37) + (29 × 16) = 1816 kJ</span>
      <br />
      The second mark was for awarded for converting this value into kJ g⁻¹:
      <br />
      <span className="pl-6 inline-block">Energy content = 1816 / 100 = 18 (kJ g⁻¹)</span>
      <br />
      A significant number of students incorrectly quoted the energy content as being 1816 kJ g⁻¹, not
      realising that the masses given were the average quantity per 100 g.
      <br />
      Careful reading of the information given in the stem of a question is always essential.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [70, 10, 20],
  average: 0.5,
  comment: (
    <>
      The first mark was awarded for correctly stating any justifiable error that the student may have
      made that would produce a higher-than-expected energy content.
      <br />
      The second mark was awarded for explaining how this error would have caused the energy content
      calculation to be too high. Since energy content is calculated from ΔT/mass, this could only be
      achieved if the student mentioned specifically that the error caused the ΔT value being used to
      be too high, or that the mass used was too low. Some students failed to make this key link.
      <br />
      Typical examples of good responses from students:
      <br />
      <span className="pl-6 block italic">
        &lsquo;The thermometer may have been resting on the bottom of the can and therefore became much
        hotter than it should have. This caused the change in temperature to be too high and hence the
        energy content to be calculated too high.&rsquo;
      </span>
      <span className="pl-6 block italic mt-1">
        &lsquo;There is no evidence/mention of any stirring taking place and this could have caused
        localised hot spots resulting in a calculated change of temperature that was too high. This then
        caused the calculated energy content to be too high.&rsquo;
      </span>
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [40, 40, 30],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for correctly describing an improvement that had the potential to
      increase the accuracy of the final answer.
      <br />
      The second mark was awarded for how this improvement would produce a final answer closer to the
      true value.
      <br />
      Typical examples of good responses from students:
      <br />
      <span className="pl-6 block italic">
        &lsquo;An improvement could be to ensure better insulation was used on the outside container.
        This would allow for more energy to be effectively transferred to the water and thus allow for a
        more accurate ΔT and hence a final energy content that would be closer to the true value.&rsquo;
      </span>
      <span className="pl-6 block italic mt-1">
        &lsquo;An improvement could be to conduct multiple trials so that outliers could be removed from
        the data set. This would allow for a final energy content to be calculated that would be closer
        to the true value.&rsquo;
      </span>
      Quite a few students incorrectly referred to &lsquo;removing the holes in the can&rsquo;, or
      &lsquo;sealing the can to stop heat being lost.&rsquo; This type of response failed to recognise
      that this would cause incomplete combustion to occur and would actually decrease the accuracy of
      the final answer.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Any response that referred correctly to the relationship between the energy content of the
      soybeans and broad beans. A typical correct response was:
      <br />
      <span className="pl-6 block italic">
        &lsquo;The energy content of the soybeans was higher than the energy content of the broad beans.&rsquo;
      </span>
      An acceptable answer could have been related to the student recognising the error that had
      occurred with the soybeans and therefore a valid conclusion could also have been:
      <br />
      <span className="pl-6 block italic">
        &lsquo;No valid conclusion can be drawn from this experiment due to the experimental error that
        occurred with the soybean trial.&rsquo;
      </span>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Crushing the beans to a powder <b>increases the surface area</b> of the bean exposed to oxygen in the air.</>,
    reason: <>Mark 1: name the physical change crushing makes — a powder has far more surface than two whole beans.</>,
  },
  {
    working: <>More particles can collide with O₂ at once, which <b>increases the rate of reaction</b> and helps <b>ensure complete combustion</b>, so all of the bean&rsquo;s chemical energy is released and transferred to the water.</>,
    reason: <>Mark 2: the consequence for the experiment. The calculation in part d assumes the whole 1.11 g burned completely — a whole bean would char on the outside and leave unburnt material, giving a low energy content.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><b>The energy content of the beans (kJ g⁻¹)</b>, measured through the <b>temperature change of the water (ΔT)</b>.</>,
    reason: <>The dependent variable is what the experiment <b>measures</b> in response to the variable it changes (the type of bean — the independent variable). The report accepted energy content, temperature change of the water or final temperature of the water; plain &ldquo;temperature&rdquo; was not enough.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <><b>Step 8</b>: the water is allowed to <b>cool to below 30 °C</b> before it is emptied from the 450 mL can.</>,
    reason: <>Mark 1: identify the step <b>and</b> the precaution it takes. Quote the step number so the marker can see which one you mean.</>,
  },
  {
    working: <>Hot water and a hot can could cause <b>scalds or burns</b> when handled; waiting until the water is below 30 °C <b>reduces the risk of scalding/burns</b>.</>,
    reason: <>Mark 2: the hazard and how the step reduces it. Equally good: <b>Step 4</b> — the <b>heatproof mat</b> protects the bench from the burning powder and hot can, <b>reducing the risk of a fire</b> in the laboratory.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  { working: <>ΔT = T<sub>final</sub> − T<sub>initial</sub> = 32.1 °C − 25.0 °C = <b>7.1 °C</b></>, reason: <>Mark 1. A change of 7.1 °C is the same as 7.1 K, matching the K⁻¹ in the specific heat capacity.</> },
  { working: <>m(water) = V × d</>, reason: <>q = mcΔT needs the <b>mass</b> of water, but the method gives a <b>volume</b> (300.0 mL), so convert with the density of water (Data Book: 1.0 g mL⁻¹).</> },
  {
    working: <>m(water) = 300.0 mL × 1.0 g mL⁻¹ = <b>300 g</b></>,
    reason: (
      <>
        Mark 2. This is the <b>water</b> — not the 1.11 g of bean powder.
        <DataBookNote>the 2023 Data Book gave the density of water as 0.997 g mL⁻¹, which the paper and report use: m = 299.1 g, q = 8.88 kJ and energy content = 7.997… kJ g⁻¹. With the 2026 value of 1.0 g mL⁻¹ the working below gives 8.02… kJ g⁻¹. Both round to <b>8.0 kJ g⁻¹</b>, so the answer is unchanged.</DataBookNote>
      </>
    ),
  },
  { working: <>q = m c ΔT</>, reason: <>Energy absorbed by the water; c = 4.18 J g⁻¹ K⁻¹ (Data Book, specific heat capacity of water).</> },
  { working: <>q = 300 g × 4.18 J g⁻¹ K⁻¹ × 7.1 K</> },
  { working: <>q = 8903 J = <b>8.903… kJ</b></>, reason: <>Mark 3. Divide J by 1000 to get kJ, because the answer is asked for in kJ g⁻¹. Keep this unrounded for the next step. We assume <b>all</b> the energy released by the burning bean went into the water (no heat loss).</> },
  { working: <>energy content = q / m(bean)</>, reason: <>&ldquo;kJ g⁻¹&rdquo; tells you the calculation: energy in kJ divided by the mass of <b>bean</b> burned, in g.</> },
  { working: <>energy content = 8.903… kJ / 1.11 g = 8.02… kJ g⁻¹</> },
  {
    working: <b>energy content = 8.0 kJ g⁻¹</b>,
    reason: <>Mark 4: <b>two significant figures</b>. ΔT = 32.1 − 25.0 = 7.1 has only two significant figures — subtraction keeps decimal places, not significant figures — and ΔT is the least precise datum. The report required two significant figures for this mark, and only 3% of students scored all four.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  { working: <>energy in 100 g = Σ (mass of nutrient × energy content of nutrient)</>, reason: <>Each nutrient releases a known amount of energy per gram (Data Book, energy content of biomolecules in food: proteins 17, fats 37, carbohydrates 16 kJ g⁻¹).</> },
  { working: <>= (36 g × 17 kJ g⁻¹) + (20 g × 37 kJ g⁻¹) + (29 g × 16 kJ g⁻¹)</> },
  { working: <>= 612 kJ + 740 kJ + 464 kJ = <b>1816 kJ per 100 g</b></>, reason: <>Mark 1. This is the energy in <b>100 g</b> of soybean — the table heading says &ldquo;Average quantity per 100 g&rdquo;.</> },
  { working: <>energy content = 1816 kJ / 100 g</>, reason: <>Divide by the whole <b>100 g</b>, not by 85 g (36 + 20 + 29): the other 15 g (water, fibre, minerals) is still part of the bean but supplies no energy. Quoting 1816 kJ g⁻¹ is the error the report describes.</> },
  { working: <b>energy content = 18 kJ g⁻¹</b>, reason: <>Mark 2. (18.16 unrounded.) Two significant figures, from the two-figure masses in the table.</> },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <>The experimental value (35 kJ g⁻¹) is <b>higher</b> than the expected value (18 kJ g⁻¹, part e.i).</>,
    reason: <>Decide the <b>direction</b> of the error first. Energy content = mcΔT ÷ mass of bean, so a high result needs <b>ΔT too high</b> or <b>mass of bean too low</b>. Heat lost to the surroundings makes the result <i>lower</i>, so it cannot explain this.</>,
  },
  {
    working: <>Error: the <b>thermometer was resting on the bottom of the 450 mL can</b>, which is heated directly by the flame (or the water was <b>not stirred</b>, leaving <b>localised hot spots</b> near the thermometer).</>,
    reason: <>Mark 1: a justifiable error that would make the result <b>too high</b>.</>,
  },
  {
    working: <>So the recorded temperature was hotter than the water as a whole, the <b>ΔT used was too high</b>, so q = mcΔT was too high and the <b>calculated energy content was too high</b>.</>,
    reason: <>Mark 2: the link. The report says it was given only for saying the error made <b>ΔT too high</b> (or the <b>mass too low</b>) — &ldquo;some students failed to make this key link&rdquo;, and 70% scored zero.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <>Improvement: <b>insulate the outside of the 1 L can</b> (e.g. wrap it in insulating material), keeping the holes at the bottom open.</>,
    reason: <>Mark 1: an improvement to <b>accuracy</b> (closeness to the true value). Do <b>not</b> block the holes or seal the can — the report says that causes <b>incomplete combustion</b> and makes the result less accurate.</>,
  },
  {
    working: <>This <b>reduces heat loss to the surroundings</b>, so more of the energy released by the burning powder is <b>transferred to the water</b>. The ΔT measured is then closer to the true value, giving an <b>energy content closer to the true value</b>.</>,
    reason: <>Mark 2: explain <b>how</b> it moves the answer toward the true value — trace it through ΔT to the energy content. The report also accepted conducting multiple trials so outliers could be removed.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <>The <b>energy content of dry soybeans (35 kJ g⁻¹) was higher than that of dry broad beans (8.0 kJ g⁻¹)</b>.</>,
    reason: <>A conclusion answers the <b>aim</b> — &ldquo;to compare the energy content of dry broad beans and dry soybeans&rdquo; — using the <b>experimental results</b> (part d and the 35 kJ g⁻¹ given). The report also accepted that no valid conclusion could be drawn because of the error in the soybean trial (part e.ii).</>,
  },
]

const STEPS = [
  'Fill a 2 L beaker with water and let it sit for 4 hours to come to room temperature.',
  'Crush two dry broad beans to a powder.',
  'Weigh and record the mass of the dry broad-bean powder, using a clean watch glass.',
  'Set up the equipment on a heatproof mat as shown in the diagram below.',
]
const STEPS2 = [
  'Ignite the dry broad-bean powder.',
  'Suspend the 450 mL can containing 300.0 mL of water directly over the burning dry broad-bean powder.',
]
const STEPS3 = [
  'Record the temperature of the water in the 450 mL can every 30 seconds until the dry broad-bean powder has stopped burning and the temperature of the water has begun to drop.',
  'When the temperature of the water in the 450 mL can is below 30 °C, empty the water from the 450 mL can and wait until both cans return to room temperature.',
  'Repeat steps 2 to 8 using dry soybeans instead of dry broad beans.',
]

export default function ChemistryQ8_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (16 marks)</p>
        <p className="mb-3">
          A student performed an experiment to compare the energy content of dry broad beans and dry soybeans.
          <br />
          The student followed the method below.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3">
          <ol className="list-decimal pl-6 flex flex-col gap-1">
            {STEPS.map((s) => <li key={s}>{s}</li>)}
          </ol>
          <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={setupSrc}
              alt="A 1 L can with holes around its base standing on a heatproof mat, with a watch glass of dry broad-bean powder inside — from the original 2023 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <ol start={5} className="list-decimal pl-6 flex flex-col gap-1">
            {STEPS2.map((s) => <li key={s}>{s}</li>)}
          </ol>
          <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={apparatusSrc}
              alt="The 450 mL aluminium can holding 300.0 mL of water and a digital thermometer, hung by a metal skewer inside the 1 L can above the watch glass of ignited dry broad-bean powder; holes around the base of the 1 L can; heatproof mat — from the original 2023 VCAA exam paper"
              className="w-full max-w-[480px]"
            />
          </div>
          <ol start={7} className="list-decimal pl-6 flex flex-col gap-1">
            {STEPS3.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Surface Area"
        marks={2}
        statement={<>Explain why the dry beans were crushed in step 2 of the experimental method.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Explain why&rdquo; for 2 marks means two linked ideas: <b>what crushing does</b> (increases
            surface area) and <b>why that matters here</b> (faster, more complete combustion, so all the
            bean&rsquo;s energy reaches the water). Stopping at &ldquo;to increase surface area&rdquo; earns only
            the first mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Recognising that the <b>surface area</b> of the beans was <b>increased</b>.</> },
            { point: <>Any one of: <b>increasing the rate of reaction</b> / <b>ensuring complete combustion</b> / <b>ensuring greater efficiency of combustion</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Dependent Variable"
        marks={1}
        statement={<>Identify the dependent variable in this experiment.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            The <b>independent</b> variable is what the student changes (the type of bean); the{' '}
            <b>dependent</b> variable is what is measured as a result. Be specific: half the cohort lost
            the mark, and the report says just writing &ldquo;temperature&rdquo; was not enough — say{' '}
            <i>which</i> temperature quantity, or name the energy content.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Any of: <b>energy content</b> / <b>temperature change of water</b> / <b>final temperature of water</b> (not just &ldquo;temperature&rdquo;).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Safety Hazards"
        marks={2}
        statement={
          <>
            Identify <b>one</b> step in the experimental procedure that is designed to manage safety hazards.
            Explain how this step reduces the risks associated with the experiment.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two jobs: <b>identify</b> the step and the precaution it takes, then <b>explain</b> the
            hazard it reduces. Only two steps in the method are about safety — step 4 (heatproof mat → fire)
            and step 8 (cool below 30 °C → scalds). Pick one and name the specific risk.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Refers to a <b>step</b> in the procedure and the <b>precaution</b> taken (e.g. <b>step 8</b>, cooling the water <b>below 30 °C</b>; or <b>step 4</b>, the <b>heatproof mat</b>).</> },
            { point: <>Explains the <b>risk mitigated</b>: reduces the chance of <b>scalding/burns</b> (step 8) or of the <b>laboratory catching fire</b> (step 4).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Food Calorimetry"
        marks={4}
        statement={
          <>
            When the experiment was undertaken with 1.11 g of dry broad-bean powder, the following results were obtained.
            <table className="my-3 text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
              <tbody>
                <tr><td className={TD}>Mass of dry broad-bean powder</td><td className={`${TD} text-center`}>1.11 g</td></tr>
                <tr><td className={TD}>Initial temperature of water</td><td className={`${TD} text-center`}>25.0 °C</td></tr>
                <tr><td className={TD}>Final temperature of water</td><td className={`${TD} text-center`}>32.1 °C</td></tr>
              </tbody>
            </table>
            Use the experimental results to calculate the energy content of the dry broad bean in kJ g⁻¹.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Energy content (kJ g⁻¹) = energy released ÷ mass of food burned. The energy released is
            measured by the water that absorbed it, q = mcΔT — so the plan is <b>ΔT → mass of water from
            its volume → q → divide by the bean&rsquo;s mass</b>, one mark each. Two traps: q needs the mass of{' '}
            <b>water</b> (from 300.0 mL), not the bean, and the final answer has only <b>two significant
            figures</b> because ΔT = 7.1 °C has two — only 3% of students scored all four marks.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>ΔT = 32.1 − 25.0 = 7.1 °C</b>.</> },
            { point: <>Converting the <b>volume of water into a mass</b>: m(water) = 300 × 0.997 = <b>299.1 g</b> (report, 2023 Data Book; 300 × 1.0 = 300 g with the 2026 value).</> },
            { point: <>Correct <b>energy change in the water</b>: q = mcΔT = 299.1 × 4.18 × 7.1 = <b>8.88 kJ</b> (8.90 kJ with m = 300 g).</> },
            { point: <>Correct <b>energy content = 8.88 / 1.11 = 8.0 kJ g⁻¹</b>, stated to <b>two significant figures</b>.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">e.</p>
        <p className="mb-3">The typical nutrition content of dry soybeans is provided in the table below.</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <tbody>
            <tr><td className={TD}></td><td className={`${TD} text-center font-semibold`}>Average quantity per 100 g</td></tr>
            <tr><td className={TD}>protein</td><td className={`${TD} text-center`}>36 g</td></tr>
            <tr><td className={TD}>fat</td><td className={`${TD} text-center`}>20 g</td></tr>
            <tr><td className={TD}>carbohydrates</td><td className={`${TD} text-center`}>29 g</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="e.i"
        topic="Energy in Food"
        marks={2}
        statement={<>Use the nutrition information from the table to calculate the heat of combustion of a typical dry soybean in kJ g⁻¹.</>}
        examinerReport={EXAM_EI}
      >
        <Background title="How to Think About It">
          <p>
            Each nutrient has a Data Book energy content per gram, so multiply each mass by its kJ g⁻¹ and
            add — that is the energy in <b>100 g</b> of soybean (mark 1). Then <b>divide by 100 g</b> to get
            kJ g⁻¹ (mark 2). The report says many students stopped at 1816 and called it kJ g⁻¹, missing
            the &ldquo;per 100 g&rdquo; in the table heading.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>energy per 100 g</b> = (36 × 17) + (20 × 37) + (29 × 16) = <b>1816 kJ</b>.</> },
            { point: <>Converting to <b>kJ g⁻¹</b>: 1816 / <b>100</b> = <b>18 kJ g⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <div className={BOX}>
        <p>When the experiment was performed with a dry soybean, the heat of combustion was found to be 35 kJ g⁻¹.</p>
      </div>

      <PartCard
        letter="e.ii"
        topic="Experimental Error"
        marks={2}
        statement={
          <>
            Suggest an experimental error that could have caused the experimental value to be different to the
            heat of combustion of a typical dry soybean. Explain how this error could have caused the difference
            between the experimental result and the expected result.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <Background title="How to Think About It">
          <p>
            Compare first: 35 kJ g⁻¹ measured vs 18 kJ g⁻¹ expected, so the result is <b>too high</b>. Since
            energy content = mcΔT ÷ mass of bean, only an error that makes <b>ΔT too high</b> or the{' '}
            <b>bean&rsquo;s mass too low</b> can do that — a &ldquo;heat was lost&rdquo; answer would make it{' '}
            <i>lower</i>, so it cannot explain this result. Mark 1 is the error; mark 2 is the explicit link through ΔT (or
            mass) to a too-high energy content, which the report says many students left out.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>justifiable error</b> that would produce a <b>higher-than-expected</b> energy content (e.g. <b>thermometer resting on the bottom of the can</b>; <b>no stirring</b> → <b>localised hot spots</b>).</> },
            { point: <>Explains that the error made the <b>ΔT too high</b> (or the <b>mass too low</b>), so the <b>calculated energy content was too high</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="f"
        topic="Improving Accuracy"
        marks={2}
        statement={
          <>
            Suggest <b>one</b> improvement to the experimental method using the apparatus and method shown above
            that would produce more accurate results. Explain how this improvement would improve the accuracy of
            the results.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="How to Think About It">
          <p>
            <b>Accuracy</b> means closeness to the true value. The biggest source of inaccuracy in a tin-can
            calorimeter is <b>heat lost to the surroundings</b>, so the natural fix is to send more of the
            energy into the water. Mark 1 is the improvement; mark 2 traces it to an energy content closer to
            the true value. The report warns against blocking the holes or sealing the can: the powder needs
            oxygen, and starving it causes <b>incomplete combustion</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Describes an <b>improvement</b> that could <b>increase accuracy</b> (e.g. <b>better insulation</b> of the outside container; <b>multiple trials</b> with outliers removed).</> },
            { point: <>Explains how it gives a final answer <b>closer to the true value</b> (e.g. <b>more energy transferred to the water</b> → more accurate ΔT → energy content closer to the true value).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="g"
        topic="Valid Conclusion"
        marks={1}
        statement={<>Write a valid conclusion for the experiment based on the experimental results.</>}
        examinerReport={EXAM_G}
      >
        <Background title="How to Think About It">
          <p>
            A conclusion answers the experiment&rsquo;s <b>aim</b> — here, to compare the two beans&rsquo; energy
            content — using the <b>results actually obtained</b> (8.0 kJ g⁻¹ for broad beans from part d, 35 kJ
            g⁻¹ for soybeans), not the Data Book values. State which is higher.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Correctly states the <b>relationship between the energy content</b> of the two beans: <b>soybeans higher than broad beans</b> (or that <b>no valid conclusion</b> can be drawn because of the error in the soybean trial).</> }]}
        />
      </PartCard>
    </div>
  )
}
