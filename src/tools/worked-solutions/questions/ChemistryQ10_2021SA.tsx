// 2021 Chemistry Exam, Section B Question 10 (8 marks). Food and equilibrium for a runner:
// a. why a starch meal eaten hours before a run helps (glycaemic indexes of amylopectin and
// amylose, cellular respiration); b. Le Chatelier's principle applied to the competing
// equilibria of O₂ and CO with haemoglobin (carbon monoxide in heavy traffic).
// Question text and both source extracts transcribed from the original paper (no figures).
// Mark allocations are from the VCAA examination report, which itemises the required points
// for both parts; the "How to Think About It" notes and model answers are original (VCAA report
// only — no second source). No calculations and no Data Book values are needed.
// Study design: glycaemic index was part of the 2017–2023 food chemistry and is not named in the
// current study design (the skip guide lists 2017 MCQ 25, GI, as a skip); part a. is written up
// because its marks rest on starch hydrolysis and cellular respiration, which are current —
// borderline, flagged for KZ. Part b.'s carbon monoxide poisoning example is gone from the study
// design, but the skip guide rates it a "note": the Le Chatelier reasoning is fully examinable.
// The report prints "Hb + O2 ⇋ HbO2" with the first O2 not subscripted — a typesetting slip, kept
// verbatim.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

// Chem renders a " + " between species as a superscript charge sign, so equations here are
// split at " + " and the plus signs written as ordinary text.
function Rxn({ eq }: { eq: string }) {
  const parts = eq.split(' + ')
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && ' + '}
          <Chem eq={p} />
        </span>
      ))}
    </>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [32, 24, 26, 19],
  average: 1.3,
  comment: (
    <>
      The following points were required:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>A comparison statement of the relative GI of each component of starch or rate of hydrolysis of each component of starch.</li>
        <li>
          An understanding that respiration involves the consumption of glucose and produces energy. (An equation was acceptable
          to be used here to assist their explanation.)
        </li>
        <li>
          An understanding of the relationship between the timing of the physical activity and energy source. (Reference to the
          long-term benefits of amylose in this situation compared to the short-term benefits of amylopectin.)
        </li>
      </ul>
      Most students completed this question fairly well, showing a good understanding of the GI of the two materials found in
      starch. Quite a few students did not refer to cellular respiration despite the clear specification to incorporate it in the
      response. It was also common for students not to link their response back to the benefits of such a meal to the runner.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [53, 11, 9, 12, 10, 5],
  average: 1.3,
  comment: (
    <>
      The following points were required for full marks:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Either an accurate equilibrium equation or accurate stated explanation of the equilibrium that exists between oxygen and
          haemoglobin, forming oxyhaemoglobin.
          <div className="pl-6 my-1 flex flex-col gap-1">
            <b>Equation 1</b>
            <span>Haemoglobin + oxygen ⇋ oxyhaemoglobin</span>
            <span>Hb<sub>4</sub> + 4O<sub>2</sub> ⇋ Hb<sub>4</sub>(O<sub>2</sub>)<sub>4</sub></span>
            <span>Hb + O2 ⇋ HbO<sub>2</sub></span>
          </div>
        </li>
        <li>
          Either an accurate equilibrium equation or accurate stated explanation of the equilibrium equation that exist between
          carbon monoxide and haemoglobin, forming carboxyhaemoglobin.
          <div className="pl-6 my-1 flex flex-col gap-1">
            <b>Equation 2</b>
            <span>Haemoglobin + carbon monoxide ⇋ carboxyhaemoglobin</span>
            <span>Hb<sub>4</sub> + 4CO ⇋ Hb<sub>4</sub>(CO)<sub>4</sub></span>
            <span>Hb + CO ⇋ HbCO</span>
          </div>
        </li>
        <li>A statement about the relative K values / extents of reaction / implied usage of competing equilibria.</li>
        <li>
          An understanding of the effect of carbon monoxide on equilibria in heavy traffic / reduction in oxygen carrying capacity,
          hence shortness of breath.
        </li>
        <li>
          An understanding of the effect of lack of carbon monoxide on equilibria in park / increase in oxygen carrying capacity,
          hence ease of breathing.
        </li>
      </ul>
      To obtain the final two marks, the student must refer to the reversibility of the two equations / chemical equilibria and
      explain the differences in breathing in the park area and in heavy traffic.
      <br />
      Given the prompts in the stem of the question, students should have used Le Chatelier&rsquo;s principle and referred to
      competing equilibria when answering this question. Students should ensure they have a solid understanding of the study
      design, including the concept of carbon monoxide poisoning, as required by this question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <b>Amylopectin</b> is <b>highly branched</b>, so digestive enzymes can attack it at many chain ends at once: it is{' '}
        <b>hydrolysed quickly</b> to glucose and has a <b>high GI</b>. <b>Amylose</b> is a <b>linear</b>, tightly coiled chain,
        so it is <b>hydrolysed slowly</b> and has a <b>low GI</b>.
      </>
    ),
    reason: (
      <>
        Mark 1: a <b>comparison</b> of the two — the report accepts either the GI or the rate of hydrolysis. The glycaemic index
        measures how quickly a food raises blood glucose, which depends on how fast its starch is broken down to glucose.
      </>
    ),
  },
  {
    working: (
      <>
        Starch is <b>hydrolysed to glucose</b>: <Rxn eq="(C6H10O5)n(s) + nH2O(l) -> nC6H12O6(aq)" />
      </>
    ),
    reason: <>Not a separate mark, but it links the starch in the meal to the glucose that respiration uses.</>,
  },
  {
    working: (
      <>
        The glucose is used in <b>cellular respiration</b>, which <b>consumes glucose</b> (and oxygen) and{' '}
        <b>releases energy</b> for the muscles: <Rxn eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" />
      </>
    ),
    reason: (
      <>
        Mark 2: respiration uses glucose <b>and</b> produces energy. The report says quite a few students left respiration out
        even though the question listed it — the equation alone helps, but say in words that energy is released.
      </>
    ),
  },
  {
    working: (
      <>
        Eaten several hours before the run, the <b>amylopectin</b> gives a <b>quick (short-term)</b> supply of glucose, while the{' '}
        <b>amylose</b> keeps releasing glucose <b>slowly over a long time</b>, so glucose is still available for respiration{' '}
        <b>during the run</b> — giving the runner a <b>sustained energy supply</b> for high-intensity running.
      </>
    ),
    reason: (
      <>
        Mark 3: link the <b>timing</b> to the energy source — the long-term benefit of amylose against the short-term benefit of
        amylopectin. The report says it was common not to link the answer back to the runner; end with what this means for the
        run.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        Oxygen is carried in the blood by binding reversibly to haemoglobin (Hb), forming oxyhaemoglobin:
        <br />
        Equation 1: <Rxn eq="Hb(aq) + O2(aq) <=> HbO2(aq)" />
      </>
    ),
    reason: <>Mark 1: the <b>O₂–haemoglobin equilibrium</b>, as an equation or in words. The ⇌ shows it is <b>reversible</b>.</>,
  },
  {
    working: (
      <>
        Carbon monoxide <b>competes</b> with O₂ for the same haemoglobin, forming carboxyhaemoglobin:
        <br />
        Equation 2: <Rxn eq="Hb(aq) + CO(aq) <=> HbCO(aq)" />
      </>
    ),
    reason: <>Mark 2: the <b>CO–haemoglobin equilibrium</b>. Both equilibria share Hb — that is what makes them <b>competing equilibria</b>.</>,
  },
  {
    working: (
      <>
        CO binds to haemoglobin much more strongly than O₂: <b>K for Equation 2 is much larger than K for Equation 1</b>, so
        even a small concentration of CO ties up a large share of the haemoglobin.
      </>
    ),
    reason: (
      <>
        Mark 3: the <b>relative K values / extents</b>. (CO&rsquo;s affinity for haemoglobin is roughly 200 times that of
        O₂.) This is why only 50–100 ppm of CO matters.
      </>
    ),
  },
  {
    working: (
      <>
        <b>In heavy traffic</b>, [CO] <b>increases</b>, so by Le Chatelier&rsquo;s principle <b>Equation 2 shifts to the right</b>{' '}
        to partially oppose the change. This <b>uses up free Hb</b>, so [Hb] decreases and <b>Equation 1 shifts to the left</b>:
        less HbO₂ forms, the blood&rsquo;s <b>oxygen-carrying capacity decreases</b>, hence <b>shortness of breath</b>.
      </>
    ),
    reason: (
      <>
        Mark 4: the effect of CO on <b>both</b> equilibria in traffic, linked to the symptom. Name the direction of each shift
        and the reason for it — that is the Le Chatelier reasoning the question asks for.
      </>
    ),
  },
  {
    working: (
      <>
        <b>In the park</b>, [CO] is negligible, so [CO] in the lungs and blood <b>decreases</b>. Because the reactions are{' '}
        <b>reversible</b>, by Le Chatelier&rsquo;s principle <b>Equation 2 shifts to the left</b> to partially oppose the
        change: HbCO breaks down, the CO is breathed out, and Hb is freed. [Hb] increases, so <b>Equation 1 shifts to the right</b>: more HbO₂
        forms, <b>oxygen-carrying capacity increases</b>, hence <b>breathing becomes easier</b>.
      </>
    ),
    reason: (
      <>
        Mark 5: the park, linked to easier breathing. The report says the final two marks needed the <b>reversibility</b> of the
        equilibria and an explanation of <b>both</b> places — 53% of students scored 0 on this part, so write every link out.
      </>
    ),
  },
]

export default function ChemistryQ10_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (8 marks)</p>
        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-4 py-3">
          While all experts agreed that protein needs for performance are likely greater than believed in past generations,
          particularly for strength training athletes, and that dietary fat could sustain an active person through
          lower-intensity training bouts, current research still points to carbohydrate as an indispensable energy source for
          high-intensity performance.
        </div>
        <p className="mt-1 text-right text-[12px] text-gray-500 dark:text-gray-400">
          Source: M Kanter, &lsquo;High-quality carbohydrates and physical performance&rsquo;, <i>Nutrition Today</i>, 53(1),
          January 2018
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Glycaemic Index"
        marks={3}
        statement={
          <>
            Starch contains approximately 70% amylopectin and 30% amylose.
            <br />
            Use your understanding of food chemistry to discuss why eating a meal containing starch several hours prior to going
            on a run could benefit a runner. In your answer, refer to:
            <ul className="list-disc pl-5 mt-1">
              <li>the glycaemic indexes of amylopectin and amylose</li>
              <li>cellular respiration.</li>
            </ul>
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Study Design Note" always>
          Glycaemic index (GI) belonged to the 2017–2023 study design&rsquo;s food chemistry and is not named in the current one.
          The rest of this part is current: the hydrolysis of starch to glucose and cellular respiration. Read &ldquo;GI&rdquo; as{' '}
          &ldquo;how fast the starch is hydrolysed to glucose&rdquo; — the report accepted that comparison for the first mark.
        </Background>
        <Background title="How to Think About It">
          <p>
            Three marks, three ideas, one per bullet plus the link: (1) compare the two starch components — branched amylopectin
            is broken down fast (high GI), linear amylose slowly (low GI); (2) say what cellular respiration does with the
            glucose — consumes it and releases energy; (3) tie the timing to the runner — quick glucose from amylopectin, then a
            slow, sustained supply from amylose that lasts into the run.
          </p>
          <p>
            The report&rsquo;s traps: leaving out respiration, and never saying how the meal actually helps the runner.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              point: (
                <>
                  A <b>comparison</b>: <b>amylopectin</b> (branched) has a <b>high GI</b> / is <b>hydrolysed faster</b>;{' '}
                  <b>amylose</b> (linear) has a <b>low GI</b> / is <b>hydrolysed more slowly</b>.
                </>
              ),
            },
            {
              point: (
                <>
                  <b>Cellular respiration consumes glucose</b> and <b>produces energy</b> (the equation{' '}
                  <Rxn eq="C6H12O6 + 6O2 -> 6CO2 + 6H2O" /> may be used to help).
                </>
              ),
            },
            {
              point: (
                <>
                  <b>Timing</b> linked to the energy source: <b>amylose</b> gives a <b>long-term, sustained</b> glucose supply
                  during the run; <b>amylopectin</b> a <b>short-term</b> one.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 flex flex-col gap-2">
          <p>
            Traffic is a major source of air pollution and primarily consists of gaseous emissions including nitrogen oxides
            (NOx) and carbon monoxide. Concentrations of traffic-related air pollution (TRAP) vary in rural and urban areas. Some
            busy urban traffic areas have up to three times as much TRAP as rural areas.
          </p>
          <p>
            A Norwegian study found a statistically significant association between the level of TRAP and the incidence of
            respiratory symptoms in humans exposed to TRAP.
          </p>
        </div>
        <p className="mt-1 text-right text-[12px] text-gray-500 dark:text-gray-400">
          Reference: MN Hegseth, BM Oftedal, AC Höper, AL Aminoff, MR Thomassen, MV Svendsen and AK Møller Fell,
          &lsquo;Self-reported traffic-related air pollution and respiratory symptoms among adults in an area with modest levels
          of traffic&rsquo;, <i>PLoS ONE</i>, 14(12): e0226221, 2019
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Competing Equilibria"
        marks={5}
        statement={
          <>
            Tien notices that she breathes easily when running in a park away from traffic. However, when running in a
            particularly high-traffic area, Tien experiences shortness of breath. In this high-traffic area, the concentration of
            carbon monoxide, CO, is between 50 and 100 ppm, but the levels of other air pollutants are negligible. After moving
            away from the high-traffic area, Tien&rsquo;s breathing becomes easier.
            <br />
            Use Le Chatelier&rsquo;s principle to discuss the changes in Tien&rsquo;s breathing in the park and in the particularly
            high-traffic area. In your answer, refer to competing equilibria involving CO. You may use equations in your answer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Study Design Note" always>
          Carbon monoxide poisoning was a named example in the 2017–2023 study design and is not named in the current one. The
          skill it tests — predicting equilibrium shifts with Le Chatelier&rsquo;s principle — is fully examinable, so this part
          is worth doing.
        </Background>
        <Background title="How to Think About It">
          <p>
            Two equilibria share one reactant, haemoglobin: O₂ + Hb ⇌ HbO₂ and CO + Hb ⇌ HbCO. Changing [CO] shifts the second
            equilibrium, which changes [Hb], which then shifts the first — that chain is what &ldquo;competing equilibria&rdquo;
            means.
          </p>
          <p>
            Five marks: write both equilibria (2), say CO binds far more strongly — a much larger K (1), then trace the shifts in
            traffic (1) and in the park (1), each ending with what happens to the oxygen carried and so to Tien&rsquo;s breathing.
            53% of students scored 0 (the mark table). The report says the final two marks need the <b>reversibility</b> of the equilibria
            and <b>both</b> places explained.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>O₂–haemoglobin equilibrium</b>: <Rxn eq="Hb + O2 <=> HbO2" /> (oxyhaemoglobin), as an equation or in words.</> },
            { point: <>The <b>CO–haemoglobin equilibrium</b>: <Rxn eq="Hb + CO <=> HbCO" /> (carboxyhaemoglobin), as an equation or in words.</> },
            { point: <>The <b>relative K values / extents</b>: CO binds much more strongly — the two are <b>competing equilibria</b>.</> },
            {
              point: (
                <>
                  <b>Heavy traffic</b>: more CO shifts Equation 2 right, less HbO₂ — <b>reduced oxygen-carrying capacity</b>,
                  hence <b>shortness of breath</b>.
                </>
              ),
            },
            {
              point: (
                <>
                  <b>Park</b>: little CO, the <b>reversible</b> reactions shift back — <b>increased oxygen-carrying capacity</b>,
                  hence <b>easier breathing</b>.
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
