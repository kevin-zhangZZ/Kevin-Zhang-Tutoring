// 2025 Chemistry Exam, MCQ 25. VCAA examination report: 59% correct. Choosing a separation method:
// fractional distillation separates volatile liquids with similar boiling points (ethanol from
// other fermentation products). Question text transcribed from the original paper. The report's
// "requries" typo is kept verbatim. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 59, D: 19 },
  answer: 'C',
  comment: (
    <>
      Fractional distillation is designed to separate volatile compounds that have similar boiling
      points.
      <br />
      Simple distillation requries boiling points of volatile compounds to have significantly
      different boiling points in order to successfully separate them.
      <br />
      Solvent extraction will be unable to separate polar compounds from each other. It is most
      effective when compounds have distinctly different polarities.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Choose a separation method by the property that <i>differs</i> between the compounds. Here the compounds are <b>volatile</b> (they evaporate easily), <b>polar</b> like ethanol, and have <b>similar boiling points</b>.</>,
    reason: <>The stem tells you which property is the same (polarity) and which differs only slightly (boiling point). A method can only separate compounds on a property that differs.</>,
  },
  {
    working: <><b>Solvent extraction</b> separates compounds by how well they dissolve in two immiscible solvents — i.e. by <b>polarity</b>. All these compounds are polar, so they all end up in the same (polar) layer together.</>,
    reason: <>Rules out A. It also means the extraction step in D separates nothing.</>,
  },
  {
    working: <><b>Simple distillation</b> works only when boiling points are <b>very different</b> (e.g. a liquid from a dissolved solid). With similar boiling points the vapour that comes over is still a mixture.</>,
    reason: <>Rules out B. The &ldquo;distillation&rdquo; in D isn&rsquo;t described as fractional, so read it as this simple kind — it has the same problem.</>,
  },
  {
    working: <><b>Fractional distillation</b> adds a fractionating column: vapour condenses and re-evaporates many times on its way up, and each cycle enriches the vapour in the lower-boiling compound. This acts like many simple distillations in a row, which is what separating liquids with <b>close boiling points</b> needs.</>,
    reason: <>The column is hot at the bottom and cooler at the top, so fractions are collected one at a time as the temperature at the top reaches each compound&rsquo;s boiling point (ethanol, <Chem eq="C2H6O" />: 78 °C).</>,
  },
  {
    working: <b>Fractional distillation</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> pairs solvent extraction (which can&rsquo;t split compounds of similar polarity) with distillation that is not fractional (which can&rsquo;t split similar boiling points). Option <b>A</b> relies on a polarity difference that isn&rsquo;t there, and <b>B</b> needs boiling points that are far apart.</>,
  },
]

export default function ChemistryQ25_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            During fermentation, yeast will produce other volatile polar compounds that have similar
            boiling points to ethanol, <Chem eq="C2H6O" />.
          </p>
          <p>
            Which one of the following methods would be most suitable to separate these compounds
            from <Chem eq="C2H6O" />?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>solvent extraction</> },
        { letter: 'B', content: <>simple distillation</> },
        { letter: 'C', content: <>fractional distillation</>, isAnswer: true },
        { letter: 'D', content: <>solvent extraction and distillation</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
