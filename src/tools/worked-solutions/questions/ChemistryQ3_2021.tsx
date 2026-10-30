// 2021 Chemistry Exam, MCQ 3. VCAA examination report: 53% correct. Without enough of the
// enzyme lactase, the disaccharide lactose is not fully hydrolysed, so some of it stays
// undigested. Question text transcribed from the original paper. Study-design note: the hydrolysis
// of carbohydrates in food and enzymes as protein catalysts are on the current study design; only
// the glycaemic index (option D) is old (2017–2023) content, and it is not needed to reject D.
// VCAA report only. Solution is original.
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 4, C: 37, D: 5 },
  answer: 'A',
  comment: (
    <>
      Lactose intolerant people are either unable to digest, or digest a minimal amount of,
      lactose.
      <br />
      Selection of Option C suggests many students were unsure about the nature of lactose being
      a carbohydrate and incorrectly assumed it was a protein.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Lactose is a <b>carbohydrate</b> — a <b>disaccharide</b>, <Chem eq="C12H22O11" /> — the sugar in milk.</>,
    reason: <>It is two monosaccharides (glucose and galactose) joined by a glycosidic link. It is <b>not</b> a protein — the report suggests that students who chose option C assumed it was.</>,
  },
  {
    working: <>Digestion of lactose = <b>hydrolysis</b>, catalysed by <b>lactase</b>:<br /><Chem eq="C12H22O11 + H2O -> C6H12O6 + C6H12O6" /><br />(lactose + water → glucose + galactose)</>,
    reason: <>Lactase is an enzyme — a protein catalyst specific to lactose. Like every hydrolysis in the body it takes place in water (an aqueous environment). Without the catalyst the reaction is far too slow at body temperature to happen to any useful extent.</>,
  },
  {
    working: <>Deficiency of lactase → hydrolysis is too slow → <b>some lactose remains undigested</b>.</>,
    reason: <>The undigested lactose cannot be absorbed; it passes on to the large intestine, where bacteria ferment it, causing the symptoms of lactose intolerance.</>,
  },
  {
    working: <>Check the other options:<br />B — digestion happens in an <b>aqueous</b> environment; hydrolysis needs water as a reactant.<br />C — lactose is a carbohydrate; dairy <b>proteins</b> are hydrolysed by different enzymes (proteases), which are unaffected.<br />D — less lactose is hydrolysed, so <b>less</b> glucose and galactose pass into the blood, not more; and a glycaemic index belongs to a food, not to a person.</>,
    reason: <>Enzymes are specific: a shortage of lactase affects only the reaction lactase catalyses. (Glycaemic index, in D, is a rating of how quickly a <i>food</i> raises blood glucose; it was part of the old study design and is not examined now.)</>,
  },
  {
    working: <b>Some of their consumed lactose remains undigested.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, chosen by 37%, treats lactose as a protein; it is a carbohydrate (a disaccharide), so only its own enzyme, lactase, is involved.</>,
  },
]

export default function ChemistryQ3_2021() {
  return (
    <MCQShell
      question={
        <>
          <p>People who are lactose intolerant have a deficiency of the lactase enzyme.</p>
          <p>Which one of the following statements about people who are lactose intolerant is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>Some of their consumed lactose remains undigested.</>, isAnswer: true },
        { letter: 'B', content: <>They metabolise lactose in a non-aqueous environment.</> },
        { letter: 'C', content: <>They are unable to digest the proteins found in dairy foods.</> },
        { letter: 'D', content: <>Their glycaemic index rises due to galactose passing into the blood.</> },
      ]}
      background={
        <Background>
          <p>
            <b>Study design note:</b> the breakdown of food carbohydrates by hydrolysis and enzymes as
            protein-based catalysts are both on the current study design. Only the glycaemic index
            in option D comes from the old (2017–2023) study design, and you do not need it to
            reject D. Key ideas: carbohydrates such as lactose are broken down by hydrolysis, and
            each enzyme is a protein catalyst specific to one reaction.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
