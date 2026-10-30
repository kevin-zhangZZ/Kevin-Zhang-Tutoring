// 2025 Chemistry Exam, MCQ 22. VCAA examination report: 75% correct. Esterification: the ester
// formed from propan-1-ol and butanoic acid (propyl butanoate), and reading condensed ester
// formulas written either way round. Question text transcribed from the original paper. The
// report writes the product as CH₃CH₂CH₂OOCCH₂CH₂CH₃ — the same compound as option D written
// from the alcohol end. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 5, C: 7, D: 75 },
  answer: 'D',
  comment: <><Chem eq="CH3CH2CH2OH" /> + <Chem eq="HOOCCH2CH2CH3 -> CH3CH2CH2OOCCH2CH2CH3" /> + <Chem eq="H2O" /></>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>Alcohol + carboxylic acid → ester + water (a <b>condensation</b> reaction, catalysed by concentrated <Chem eq="H2SO4" />).</>,
    reason: <>The –OH of the acid and the H of the alcohol&rsquo;s –OH leave as <Chem eq="H2O" />; the acid&rsquo;s C=O carbon bonds to the alcohol&rsquo;s O, making the ester link –COO–.</>,
  },
  {
    working: <><Chem eq="CH3CH2CH2OH" /> + <Chem eq="CH3CH2CH2COOH -> CH3CH2CH2COOCH2CH2CH3" /> + <Chem eq="H2O" /></>,
    reason: <>The acid keeps its whole carbon chain <i>including</i> its C=O carbon (4 C: <Chem eq="CH3CH2CH2C" />); the alcohol keeps its alkyl group (3 C: <Chem eq="CH2CH2CH3" />). Total 4 + 3 = 7 C.</>,
  },
  {
    working: <>Name: <b>propyl butanoate</b> — &ldquo;propyl&rdquo; from propan-1-ol, &ldquo;butanoate&rdquo; from butanoic acid.</>,
    reason: <>In a condensed formula, read the ester link to tell the two halves apart: in <b>–COO–</b> the C=O carbon is on the left, so the left part came from the acid; in <b>–OOC–</b> or <b>–OCO–</b> the O is first, so the left part came from the alcohol.</>,
  },
  {
    working: <>Check each option (all have 7 C, so counting carbons alone can&rsquo;t decide):<br />A — <Chem eq="CH3CH2–COO–CH2CH2CH2CH3" />: acid part = <Chem eq="CH3CH2CO" /> (3 C, propanoic acid), alcohol part = butyl (4 C) → butyl propanoate.<br />B — <Chem eq="CH3CH2CH2CH2–O–CO–CH2CH3" />: alcohol part = butyl (4 C), acid part = <Chem eq="COCH2CH3" /> (3 C) → butyl propanoate again.<br />C — <Chem eq="CH3CH2–O–CO–CH2CH2CH2CH3" />: alcohol part = ethyl (2 C), acid part = 5 C → ethyl pentanoate.<br />D — <Chem eq="CH3CH2CH2–COO–CH2CH2CH3" />: acid part = <Chem eq="CH3CH2CH2CO" /> (4 C, butanoic acid), alcohol part = propyl (3 C) → <b>propyl butanoate</b>.</>,
    reason: <>The report writes the product as <Chem eq="CH3CH2CH2–OOC–CH2CH2CH3" />: the O comes first, so the left part (propyl, 3 C) is from the alcohol and <Chem eq="OCCH2CH2CH3" /> (4 C) is from the acid — the same propyl butanoate as D, just written from the alcohol end.</>,
  },
  {
    working: <b>The product is propyl butanoate, CH₃CH₂CH₂COOCH₂CH₂CH₃.</b>,
    reason: <>Matches option <b>D</b>. Options <b>A</b> and <b>B</b> are both butyl propanoate — the chain lengths of the acid and alcohol swapped (that ester would come from butan-1-ol and propanoic acid). Option <b>C</b> is ethyl pentanoate, which would need ethanol and pentanoic acid.</>,
  },
]

export default function ChemistryQ22_2025() {
  return (
    <MCQShell
      question={
        <p>
          The major organic product formed when propan-1-ol, <Chem eq="CH3CH2CH2OH" />, reacts with
          butanoic acid, <Chem eq="CH3CH2CH2COOH" />, in the presence of sulfuric acid,{' '}
          <Chem eq="H2SO4" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Chem eq="CH3CH2COOCH2CH2CH2CH3" /> },
        { letter: 'B', content: <Chem eq="CH3CH2CH2CH2OCOCH2CH3" /> },
        { letter: 'C', content: <Chem eq="CH3CH2OCOCH2CH2CH2CH3" /> },
        { letter: 'D', content: <Chem eq="CH3CH2CH2COOCH2CH2CH3" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
