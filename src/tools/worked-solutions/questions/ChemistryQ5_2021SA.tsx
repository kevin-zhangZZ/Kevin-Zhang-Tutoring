// 2021 Chemistry Exam, Section B Question 5 (8 marks). Sweet potato: the energy in one serving
// from its protein, fat and carbohydrate (a.), how boiling affects its vitamin D (b.), the mass
// of vitamin C found by a direct redox titration with iodine (c.), and the role of coenzymes (d.).
// Question text and the nutrition table transcribed from the original paper (no figures).
// Mark distributions, averages and comments are from the VCAA examination report (VCAA report
// only — no second source); the report's asterisks mark where marks were awarded in c. The
// "How to Think About It" notes, model answers and mark schemes are original. Numbers checked
// in Python against the 2026 Data Book (item 11 energy contents 37/17/16 kJ g⁻¹, unchanged since
// 2021; C 12.0, H 1.0, O 16.0). Parts b. (vitamins: fat- vs water-soluble) and d. (coenzymes) are
// not in the 2024–2027 study design — they keep their statements with a note and no working,
// matching the skip guide's 2017–2018 "Vitamins" and "Coenzymes" rows.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      2.0 x 17 + 3.0 x 37 + 18.7 x 16 = 4.4 x 10² kJ (444 kJ)
      <br />
      This question was very well done, and the only common mistake was that the students quoted
      incorrect units (e.g. 444 kJ g⁻¹ or 444 kJ mol⁻¹).
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [32, 21, 47],
  average: 1.2,
  comment: (
    <>
      <i>n</i>(I₂) = 0.0500 x 21.81x10⁻³
      <br />
      = 1.09x10⁻³ mol
      <br />
      <i>n</i>(Vit C) = 1.09x10⁻³ mol*
      <br />
      <i>m</i>(C₆H₈O₆) = 1.09x10⁻³ mol x 176 g mol⁻¹
      <br />
      = 0.192 g / 192 mg*
    </>
  ),
}

const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'

const ROWS_A: WorkingRow[] = [
  {
    working: <>E = Σ (mass of nutrient × energy content)</>,
    reason: (
      <>
        Only the <b>macronutrients</b> — protein, fat and carbohydrate — are energy sources for the body.
        Vitamins C and D supply no energy (and are only milligrams anyway), so they are left out.
      </>
    ),
  },
  {
    working: <>E = (2.0 g × 17 kJ g⁻¹) + (3.0 g × 37 kJ g⁻¹) + (18.7 g × 16 kJ g⁻¹)</>,
    reason: (
      <>
        Data Book, energy content of biomolecules in food: <b>proteins 17</b>, <b>fats and oils 37</b>,{' '}
        <b>carbohydrates 16</b> kJ g⁻¹. Grams × kJ per gram leaves kJ.
      </>
    ),
  },
  { working: <>E = 34 kJ + 111 kJ + 299.2 kJ = 444.2 kJ</> },
  {
    working: <b>E = 4.4 × 10² kJ</b>,
    reason: (
      <>
        Two significant figures (2.0 g, 3.0 g and the Data Book values have two). The unit is{' '}
        <b>kJ</b> — a total energy for the whole serving. The report says the only common mistake was
        a wrong unit such as kJ g⁻¹ or kJ mol⁻¹. Plausible: fat is the smallest mass but, at 37 kJ g⁻¹,
        still a quarter of the energy.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>n(I₂) = c × V</>,
    reason: (
      <>
        Everything in the I₂ solution is known — its concentration and the titre — so start there. Use
        the <b>average of the concordant titres</b>, 21.81 mL, and convert it to litres because c is in
        mol L⁻¹ (M).
      </>
    ),
  },
  { working: <>n(I₂) = 0.0500 mol L⁻¹ × 0.02181 L</> },
  { working: <>n(I₂) = 1.0905 × 10⁻³ mol</>, reason: <>Keep this unrounded for the next steps.</> },
  {
    working: <>n(C₆H₈O₆) = n(I₂) = 1.0905 × 10⁻³ mol</>,
    reason: (
      <>
        Mark 1. <b>Mole ratio</b> from the balanced equation: C₆H₈O₆ : I₂ = <b>1 : 1</b>. At the end point
        all the vitamin C in the filtrate has just reacted with the I₂ added.
      </>
    ),
  },
  {
    working: <>M(C₆H₈O₆) = 6(12.0) + 8(1.0) + 6(16.0) = 176.0 g mol⁻¹</>,
    reason: <>Molar mass from the Data Book&rsquo;s relative atomic masses.</>,
  },
  { working: <>m(C₆H₈O₆) = n × M = 1.0905 × 10⁻³ mol × 176.0 g mol⁻¹</> },
  {
    working: <b>m(vitamin C) = 0.192 g (192 mg)</b>,
    reason: (
      <>
        Mark 2, with its <b>unit</b>. (0.191928 g unrounded.) Three significant figures, set by
        0.0500 M (21.81 mL has four). The report rounds n to 1.09 × 10⁻³ mol first and gets the same
        0.192 g. This is the vitamin C in the <i>sample</i> titrated, not in the 124 g serving in the
        table — the sample&rsquo;s mass isn&rsquo;t given, so don&rsquo;t try to compare it with the
        table&rsquo;s 3.0 mg.
      </>
    ),
  },
]

export default function ChemistryQ5_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (8 marks)</p>
        <p className="mb-3">
          The nutritional information for one medium serving (124 g) of sweet potato is provided in the
          table below.
        </p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className={`${cell} text-center`}>Nutrient</th>
              <th className={`${cell} text-center`}>Per 124 g</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className={cell}>protein</td><td className={`${cell} text-center`}>2.0 g</td></tr>
            <tr><td className={cell}>fat</td><td className={`${cell} text-center`}>3.0 g</td></tr>
            <tr><td className={cell}>carbohydrates</td><td className={`${cell} text-center`}>18.7 g</td></tr>
            <tr><td className={cell}>vitamin C</td><td className={`${cell} text-center`}>3.0 mg</td></tr>
            <tr><td className={cell}>vitamin D</td><td className={`${cell} text-center`}>less than 0.2 mg</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Energy in Food"
        marks={1}
        statement={<>Calculate the energy contained in one medium serving of sweet potato.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            The Data Book gives the energy each gram of <b>protein</b>, <b>fat</b> and{' '}
            <b>carbohydrate</b> releases in the body. Multiply each mass by its kJ g⁻¹ value and add —
            vitamins don&rsquo;t count. One mark, and the trap the report names is the unit: the answer is
            a total energy in <b>kJ</b>, not kJ g⁻¹ or kJ mol⁻¹.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            {
              point: (
                <>
                  <b>2.0 × 17 + 3.0 × 37 + 18.7 × 16 = 4.4 × 10² kJ</b> (444 kJ) — all three macronutrients,
                  with the unit <b>kJ</b>.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Vitamin Solubility"
        marks={3}
        statement={
          <>
            Explain, with reference to the chemistry, how boiling sweet potato in water may affect its level
            of vitamin D.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part b. tests the old study design&rsquo;s key knowledge on <b>vitamins</b> (fat-soluble and
            water-soluble vitamins) — VCAA&rsquo;s report says so directly. Vitamins are not in the
            2024–2027 study design, so this part is left without a worked solution; the skip guide lists
            vitamins questions as ones to skip.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="c"
        topic="Redox Titration"
        marks={2}
        statement={
          <>
            The loss of vitamin C, C₆H₈O₆, in sweet potato after heating can be determined in a titration by
            reacting vitamin C with iodine, I₂, solution. The balanced titration equation is shown below.
            <span className="block my-2 pl-6">
              <Chem eq="C6H8O6(aq) + I2(aq) -> 2HI(aq) + C6H6O6(aq)" />
            </span>
            A sample of sweet potato was blended with water and filtered. The filtrate was titrated against
            0.0500 M of I₂(aq). The average of three concordant titres was 21.81 mL.
            <br />
            Calculate the mass of vitamin C in the sweet potato sample.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            A direct titration calculation always runs the same way: <b>n</b> of the solution you know
            completely (I₂: c × V) → <b>mole ratio</b> from the equation → n of the unknown → convert to what
            is asked (here a <b>mass</b>, m = n × M). Two marks: the first for n(vitamin C), the second for
            its mass with a unit. Watch for the usual slips: mL not converted to L, and a molar mass
            worked out wrongly.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              point: (
                <>
                  Correct <b>n(vitamin C) = n(I₂) = 0.0500 × 21.81 × 10⁻³ = 1.09 × 10⁻³ mol</b>, using the{' '}
                  <b>1 : 1 mole ratio</b>.
                </>
              ),
            },
            {
              point: (
                <>
                  Correct <b>m(C₆H₈O₆) = 1.09 × 10⁻³ × 176 = 0.192 g</b> (192 mg), <b>with units</b>.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Coenzymes"
        marks={2}
        statement={
          <>
            Some coenzymes are derived from vitamins.
            <br />
            Explain the role of coenzymes in metabolic reactions.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part d. is about <b>coenzymes</b>, which left the study design in 2024 — the current course
            covers enzymes as protein catalysts (structure, denaturation, competitive inhibitors) but not
            coenzymes. It is left without a worked solution; the skip guide lists coenzyme questions as
            ones to skip.
          </p>
        </Background>
      </PartCard>
    </div>
  )
}
