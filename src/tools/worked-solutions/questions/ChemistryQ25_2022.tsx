// 2022 Chemistry Exam, MCQ 25. VCAA examination report: 33% correct. Which statements about
// biodiesel versus petrodiesel are correct (hygroscopic nature, crystallising temperature,
// origin, sulfur dioxide on combustion). Question text transcribed from the original paper.
// The report's "hydroscopic" (statement I) is kept verbatim; it is a slip for "hygroscopic".
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 31, C: 12, D: 33 },
  answer: 'D',
  comment: (
    <>
      I Incorrect – biodiesel is more hydroscopic because of the polar ester groups in the
      molecules.
      <br />
      II Correct – biodiesel molecules have stronger intermolecular attraction due to dipole-dipole
      forces and so biodiesel solidifies at a higher temperature than petrodiesel.
      <br />
      III Correct – biodiesel is produced from vegetable oils and animal fats; petrodiesel is a
      fossil fuel extracted from oil produced from decomposing plant and animal material over
      millions of years.
      <br />
      IV Correct – sulfur deposits from decomposing animal protein in crude oil mean that
      petrodiesel contains more sulfur than biodiesel. This means that more SO₂ will be produced in
      the combustion of petrodiesel compared with biodiesel.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>I: <b>Hygroscopic</b> = tends to absorb water (e.g. moisture from the air). <br />Biodiesel molecules contain <b>polar ester groups</b>, which attract water; petrodiesel is non-polar hydrocarbons. <br />So <b>biodiesel</b> is the more hygroscopic fuel. Statement I is <b>incorrect</b>.</>,
    reason: <>Biodiesel is made of fatty acid methyl esters (R–COO–CH₃). The C=O and C–O bonds are polar, so water molecules are attracted to them; the hydrocarbon molecules in petrodiesel have no polar groups. Statement I has the two fuels the wrong way round.</>,
  },
  {
    working: <>II: Biodiesel: <b>dipole–dipole</b> forces (ester groups) + dispersion forces. <br />Petrodiesel: dispersion forces only. <br />Stronger intermolecular forces → biodiesel <b>solidifies (forms crystals) at a higher temperature</b>. Statement II is <b>correct</b>.</>,
    reason: <>The stronger the attraction between molecules, the less cooling it takes for them to lock into a solid. This is why biodiesel can turn cloudy and gel in cold weather when petrodiesel is still liquid.</>,
  },
  {
    working: <>III: Biodiesel — from plant oils and animal fats (recently living). <br />Petrodiesel — from crude oil, formed from plant and animal remains over millions of years. <br />Both are derived from plants and animals. Statement III is <b>correct</b>.</>,
    reason: <>The difference between them is the <i>timescale</i> (renewable biofuel vs fossil fuel), not the original source: crude oil is itself decomposed plant and animal material.</>,
  },
  {
    working: <>IV: Crude oil contains <b>sulfur</b> compounds (from decomposed animal protein), so petrodiesel contains more sulfur than biodiesel. <br />More sulfur → more <Chem eq="SO2" /> on combustion. Statement IV is <b>correct</b>.</>,
    reason: <>Sulfur in a fuel burns to sulfur dioxide, e.g. <Chem eq="S(s) + O2(g) -> SO2(g)" />, a cause of acid rain. Biodiesel from fresh oils and fats contains very little sulfur.</>,
  },
  {
    working: <b>Statements II, III and IV are correct; only I is wrong.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> (31%) leaves out statement II — biodiesel&rsquo;s stronger dipole–dipole attraction means it crystallises at the <i>higher</i> temperature. Options <b>A</b> (25%) and <b>C</b> both include statement I, which reverses which fuel is hygroscopic. (The report&rsquo;s &ldquo;hydroscopic&rdquo; in its comment on statement I is a slip for &ldquo;hygroscopic&rdquo;.)</>,
  },
]

export default function ChemistryQ25_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements regarding biodiesel and petrodiesel:</p>
          <ol className="list-none pl-0 mb-2 space-y-1">
            <li>I. Petrodiesel is more hygroscopic than biodiesel.</li>
            <li>II. Biodiesel forms crystals at a higher temperature than petrodiesel.</li>
            <li>III. Biodiesel and petrodiesel are derived from plants and animals.</li>
            <li>IV. The combustion of biodiesel releases less sulfur dioxide than petrodiesel.</li>
          </ol>
          <p>Which of the statements above are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I and IV only' },
        { letter: 'B', content: 'III and IV only' },
        { letter: 'C', content: 'I, II and III only' },
        { letter: 'D', content: 'II, III and IV only', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
