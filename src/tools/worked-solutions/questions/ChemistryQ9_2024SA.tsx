// 2024 Chemistry Exam, Section B Question 9 (9 marks). Two syntheses of paracetamol: the
// percentage yield and percentage atom economy of Reaction P2 compared with Reaction P1, which
// reaction is better aligned with green chemistry (atom economy), and the two reactions discussed
// against the "prevention of wastes" principle. Question text transcribed from the original paper
// (the 2024 paper has no extractable text — transcribed from rendered pages); both reaction schemes
// are cropped from the original VCAA exam PDF. Mark allocations are from the VCAA examination
// report, which itemises every mark here; the worked solutions, "How to Think About It" notes and
// model answers are original. VCAA report only — no second source. Numbers checked in Python.
// The paper's "item 26.ii" (green chemistry principles) is item 24.ii in the 2026 Data Book — a
// Data Book note says so. Report slips kept verbatim: in a.i the fourth mark is described as "the
// correct m(LiC₆)" (carried over from another question — the mark is for comparing the % atom
// economies, as the bullet under it shows), and in b "contaminates" stands for "contaminants".

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import p1Src from './chem-2024sa-q9-reaction-p1.png'
import p2Src from './chem-2024sa-q9-reaction-p2.png'

const BULLET = 'list-disc pl-5 flex flex-col gap-1'

const EXAM_AI: SAExaminerStats = {
  marks: [15, 9, 18, 19, 39],
  average: 2.6,
  comment: (
    <>
      n(paracetamol) = 1.4 / 109 = 0.01284 mol and therefore m(paracetamol) = 0.01284 × 151 = 1.94 g
      <br />
      The first mark was awarded for the correct calculation of the % yield of reaction P2.
      <ul className={BULLET}><li>% yield = 100 × 0.80 / 1.94 = 41%</li></ul>
      The second mark was awarded for the correct % atom economy.
      <ul className={BULLET}><li>% atom economy = 100 × 151 / (109 + 60) = 89%</li></ul>
      The third mark was awarded for the comparison of % yield.
      <ul className={BULLET}><li>The percentage yield is higher for reaction P1 with 87% compared to reaction P2, which is 41%.</li></ul>
      The fourth mark was awarded for the correct m(LiC₆).
      <ul className={BULLET}><li>The percentage atom economy is higher for reaction P2 with 89% compared to reaction P1, which is 72%.</li></ul>
      In general, this question was well answered, although some students either calculated the % atom economy
      or the % yield, rather than both of these as required.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [31, 18, 51],
  average: 1.2,
  comment: (
    <>
      The first mark was awarded for identifying % atom economy as the relevant green chemistry principle, as
      % yield is not specifically addressed as a green chemistry principle.
      <br />
      The second mark was awarded for responding that the % atom economy for reaction P2 was better aligned
      with this green chemistry principle because it had the higher % atom economy.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [26, 23, 28, 23],
  average: 1.5,
  comment: (
    <>
      The first two marks were awarded for identifying the following two points.
      <ul className={BULLET}>
        <li>Reaction P1 produces waste ethanoic acid (with other contaminates).</li>
        <li>Reaction P2 produces wastewater (with other contaminates).</li>
      </ul>
      The third mark was awarded for any one of the following valid comments.
      <ul className={BULLET}>
        <li>Reaction P1 has a much higher yield, and therefore potentially produces much less waste.</li>
        <li>Reaction P2 has a much lower yield, and therefore potentially produces much greater waste.</li>
        <li>Recycling of ethanoic acid or unused reactants can reduce the waste from reaction P1.</li>
        <li>Any suitable comment that related waste back to the % atom economy values.</li>
      </ul>
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>n(4-aminophenol) = m / M</>,
    reason: <>The <b>theoretical yield</b> is the mass of paracetamol that 1.4 g of 4-aminophenol <i>could</i> make if it all converted. Start by converting the mass of reactant to moles.</>,
  },
  { working: <>n(4-aminophenol) = 1.4 g / 109 g mol⁻¹</>, reason: <>M = 109 g mol⁻¹ is given under the equation.</> },
  { working: <>n(4-aminophenol) = 0.01284… mol</>, reason: <>Keep this unrounded.</> },
  {
    working: <>n(paracetamol) = n(4-aminophenol) = 0.01284… mol</>,
    reason: <>Mole ratio from the equation for Reaction P2: <Chem eq="C6H7NO" /> : <Chem eq="C8H9NO2" /> = 1 : 1.</>,
  },
  { working: <>m(paracetamol)<sub>theoretical</sub> = n × M = 0.01284… mol × 151 g mol⁻¹</> },
  { working: <>m(paracetamol)<sub>theoretical</sub> = 1.939… g</>, reason: <>This is the most paracetamol that 1.4 g of 4-aminophenol could ever give.</> },
  {
    working: <>% yield = (actual yield / theoretical yield) × 100</>,
    reason: <>Data Book formula. The <b>actual yield</b> is what was really obtained: 0.80 g.</>,
  },
  { working: <>% yield = (0.80 g / 1.939… g) × 100</> },
  {
    working: <b>% yield (P2) = 41%</b>,
    reason: <>Mark 1. (41.2% unrounded.) Two significant figures, set by 1.4 g and 0.80 g. Plausible: a % yield must lie between 0 and 100%.</>,
  },
  {
    working: <>% atom economy = (molar mass of desired product / molar mass of all atoms in reactants) × 100</>,
    reason: <>Data Book formula. Atom economy needs <b>no experimental data</b> — only the balanced equation. Every coefficient here is 1, so add one molar mass for each reactant.</>,
  },
  { working: <>% atom economy = (151 g mol⁻¹ / (109 + 60) g mol⁻¹) × 100</>, reason: <>Desired product = paracetamol (151). Reactants = 4-aminophenol (109) + ethanoic acid (60). Water is <b>not</b> included — it is a product.</> },
  {
    working: <b>% atom economy (P2) = 89%</b>,
    reason: <>Mark 2. (89.3% unrounded.) Check the method on P1: 151 / (109 + 102) × 100 = 71.6% ≈ 72% — the value the paper gives, so the formula is being used correctly.</>,
  },
  {
    working: <>The <b>percentage yield is higher for Reaction P1</b> (87%) than for Reaction P2 (41%).</>,
    reason: <>Mark 3: a comparison of % yield, quoting <b>both</b> numbers. (P2 has a ⇌ arrow — it is an equilibrium that does not go to completion, which helps explain its low yield.)</>,
  },
  {
    working: <>The <b>percentage atom economy is higher for Reaction P2</b> (89%) than for Reaction P1 (72%).</>,
    reason: <>Mark 4: a comparison of % atom economy. P2&rsquo;s only by-product is water, a small molecule (18 g mol⁻¹); P1 wastes a whole ethanoic acid molecule (60 g mol⁻¹). The report notes some students calculated only one of the two percentages — the question asks for <b>both</b>, and both comparisons.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>The relevant green chemistry principle is <b>atom economy</b>: processes/pathways should be designed to <b>maximise incorporation of all reactant materials</b> used in the process <b>into the final product</b>.</>,
    reason: (
      <>
        Mark 1: name the principle. <b>% yield is not a green chemistry principle</b> in the Data Book list, so it cannot be the basis of the judgement — even though P1&rsquo;s yield is higher.
        <DataBookNote>the paper&rsquo;s &ldquo;item 26.ii&rdquo; (green chemistry principles) is item 24.ii in the 2026 Data Book; the list of seven principles, including atom economy and prevention of wastes, is unchanged.</DataBookNote>
      </>
    ),
  },
  {
    working: <><b>Reaction P2 is better aligned</b> with green chemistry because it has the <b>higher % atom economy</b> (89% compared with 72% for P1), so a greater proportion of the reactant atoms end up in the paracetamol.</>,
    reason: <>Mark 2: the choice of reaction, justified by the atom-economy numbers from part a.i.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><b>Reaction P1 produces ethanoic acid as a waste product</b> (by-product), along with any contaminants.</>,
    reason: <>Mark 1: identify P1&rsquo;s waste. Read it off the equation — everything on the product side that isn&rsquo;t paracetamol is waste.</>,
  },
  {
    working: <><b>Reaction P2 produces water as a waste product</b> (wastewater containing contaminants such as unreacted reactants).</>,
    reason: <>Mark 2: identify P2&rsquo;s waste. Water is a far less harmful by-product than ethanoic acid, and less of it by mass (18 vs 60 g mol⁻¹ — the reason P2&rsquo;s atom economy is higher).</>,
  },
  {
    working: <>However, <b>Reaction P2 has a much lower yield</b> (41% vs 87%), so much of its 4-aminophenol and ethanoic acid stays <b>unreacted</b> and potentially becomes <b>much greater waste</b> per gram of paracetamol made — unless the unreacted reactants are <b>recycled</b>.</>,
    reason: <>Mark 3: one valid further comment. Any of the report&rsquo;s options earns it — P1&rsquo;s higher yield means less waste; P2&rsquo;s lower yield means more waste; recycling ethanoic acid or unused reactants reduces P1&rsquo;s waste; or a link from the waste back to the % atom economy values.</>,
  },
  {
    working: <>The ethanoic acid from P1 could also be <b>recycled</b> — it is a reactant in P2 — to reduce P1&rsquo;s waste.</>,
    reason: <>An alternative third-mark comment. One valid comment is enough; writing two is a safety net, not a requirement.</>,
  },
]

export default function ChemistryQ9_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (9 marks)</p>
        <p className="mb-3">
          Paracetamol, C₈H₉NO₂, can be made using two different reactions, Reaction P1 and Reaction P2.
        </p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Reaction P1</p>
        <p className="mb-3">
          Liquid ethanoic anhydride, C₄H₆O₃(l), is added to a mixture of solid 4-aminophenol, C₆H₇NO(s), and
          water. The resulting mixture of all reactants is heated in a hot-water bath for 10 minutes.
        </p>
        <div className="mb-4 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
          <img
            loading="lazy"
            decoding="async"
            src={p1Src}
            alt="Reaction P1: C6H7NO (4-aminophenol, M = 109 g/mol) + C4H6O3 (ethanoic anhydride, M = 102 g/mol), arrow labelled 60 °C, H2O, gives C8H9NO2 (paracetamol, M = 151 g/mol) + C2H4O2 (ethanoic acid, M = 60 g/mol) — from the original 2024 VCAA exam paper"
            className="w-full max-w-[600px]"
          />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Reaction P2</p>
        <p className="mb-3">
          Liquid ethanoic acid, C₂H₄O₂(l), is mixed with solid 4-aminophenol, C₆H₇NO(s). The reactant mixture is
          heated in a hot water bath for 10 minutes.
        </p>
        <div className="mb-4 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
          <img
            loading="lazy"
            decoding="async"
            src={p2Src}
            alt="Reaction P2: C6H7NO (4-aminophenol, M = 109 g/mol) + C2H4O2 (ethanoic acid, M = 60 g/mol), equilibrium arrows labelled heat, give C8H9NO2 (paracetamol, M = 151 g/mol) + H2O (water, M = 18 g/mol) — from the original 2024 VCAA exam paper"
            className="w-full max-w-[600px]"
          />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Results</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>For Reaction P1, the percentage yield is 87% and the percentage atom economy is 72%.</li>
          <li>For every 1.4 g of 4-aminophenol reacted in Reaction P2, 0.80 g of paracetamol is produced.</li>
        </ul>
      </div>

      <PartCard
        letter="a.i"
        topic="Yield and Atom Economy"
        marks={4}
        statement={
          <>
            Calculate the percentage yield and percentage atom economy of Reaction P2, and compare them to the
            results for Reaction P1.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Two different measures of a reaction, so four marks means four ideas: <b>calculate % yield</b>,{' '}
            <b>calculate % atom economy</b>, then <b>compare each one</b> with P1&rsquo;s figure. % yield needs
            the experiment (actual mass ÷ the theoretical mass from 1.4 g of 4-aminophenol); % atom economy needs
            only the equation (molar mass of paracetamol ÷ total molar mass of reactants). The report notes some
            students calculated only one of the two — do both, and write two separate comparison sentences.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Correct <b>% yield of P2 = 100 × 0.80 / 1.94 = 41%</b> (theoretical mass = 1.4 / 109 × 151 = 1.94 g).</> },
            { point: <>Correct <b>% atom economy of P2 = 100 × 151 / (109 + 60) = 89%</b>.</> },
            { point: <>Comparison of % yield: <b>P1&rsquo;s % yield is higher</b> (87% vs 41%).</> },
            { point: <>Comparison of % atom economy: <b>P2&rsquo;s % atom economy is higher</b> (89% vs 72%). (The report labels this mark &ldquo;m(LiC₆)&rdquo; — a slip; the bullet under it shows it is this comparison.)</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Atom Economy"
        marks={2}
        statement={
          <>
            Use your <b>answer to part a.i</b> to discuss which reaction is better aligned with green chemistry.
            Support your answer by referencing the relevant green chemistry principle.
            <br />
            Refer to <b>item 26.ii</b> of the Data Book.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            Part a.i gave you two numbers pointing in opposite directions (P1 wins on yield, P2 on atom economy),
            so you must decide which one green chemistry cares about. Check the Data Book&rsquo;s list of seven
            principles: <b>atom economy</b> is on it; <b>% yield is not</b>. Mark 1 is naming that principle,
            mark 2 is concluding <b>P2</b> because its atom economy is higher. Choosing P1 because of its yield
            is the trap.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Identifies <b>% atom economy</b> as the relevant green chemistry principle (% yield is not a green chemistry principle).</> },
            { point: <><b>Reaction P2</b> is better aligned because it has the <b>higher % atom economy</b> (89% vs 72%).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Waste Prevention"
        marks={3}
        statement={
          <>
            Prevention of waste is a green chemistry principle. Refer to <b>item 26.ii</b> of the Data Book.
            <br />
            Discuss Reaction P1 and Reaction P2 in terms of this green chemistry principle.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Discuss both reactions&rdquo; for 3 marks: say <b>what waste each reaction makes</b> (one mark
            each — read the by-products off the equations: ethanoic acid from P1, water from P2), then add{' '}
            <b>one evaluative comment</b> for the third mark. Good comments link the waste to the numbers from
            part a — a low yield means lots of unreacted material is wasted — or suggest how waste could be
            reduced (recycling). Only about a quarter of students scored all 3 marks.
          </p>
          <p className="mt-2">
            The principle itself (Data Book): <b>prevention of wastes</b> — &ldquo;It is better to prevent waste
            than to treat or clean up waste after it has been produced.&rdquo; So the question is really asking:
            what waste does each reaction create, and how much?
          </p>
          <DataBookNote>the paper&rsquo;s &ldquo;item 26.ii&rdquo; is item 24.ii (green chemistry principles) in the 2026 Data Book; the prevention of wastes principle is unchanged.</DataBookNote>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Reaction P1 produces waste ethanoic acid</b> (with other contaminants).</> },
            { point: <><b>Reaction P2 produces wastewater</b> (with other contaminants).</> },
            {
              point: (
                <>
                  Any one valid comment: P1&rsquo;s <b>much higher yield</b> means potentially <b>much less waste</b>;
                  P2&rsquo;s <b>much lower yield</b> means potentially <b>much greater waste</b>; <b>recycling</b>{' '}
                  ethanoic acid or unused reactants reduces P1&rsquo;s waste; or a comment relating the waste to the{' '}
                  <b>% atom economy</b> values.
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
