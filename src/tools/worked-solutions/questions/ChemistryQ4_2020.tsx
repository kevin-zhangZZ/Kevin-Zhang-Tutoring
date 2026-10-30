// 2020 Chemistry Exam, MCQ 4. VCAA examination report: 63% correct. IUPAC name of a five-carbon
// chain carrying an –NH2 group and an –OH group: the alcohol takes priority, giving
// 1-aminopentan-3-ol. Question text transcribed from the original paper; the structure is cropped
// from the original VCAA exam PDF and the numbered structure in the report's comment is cropped
// from the VCAA examination report. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structureSrc from './chem-2020-mcq4-structure.png'
import reportStructureSrc from './chem-2020-mcq4-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 6, C: 26, D: 63 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <img loading="lazy" decoding="async"
        src={reportStructureSrc}
        alt="The same structure with its carbons numbered in red: 1 on the carbon bonded to N, 2 next, 3 on the carbon bonded to O, then 4 and 5 down the ethyl branch — from the 2020 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
      <br />
      -OH functional group is of higher priority than-NH₂ functional group, hence it is an alcohol
      with an amino functional group attached and not an amine with a hydroxy functional group
      attached.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Functional groups: –NH₂ (amine) and –OH (alcohol).</>,
    reason: <>Spot every group that is not just C and H first — they decide both the suffix and the numbering.</>,
  },
  {
    working: <>Longest carbon chain: N–C–C–C(OH)–C–C = <b>5 carbons</b> → <b>pent</b>-</>,
    reason: <>The chain does not have to run in a straight line across the page. From the carbon bonded to N, go right two carbons to the C bearing –OH, then <b>down</b> the bend to the last two carbons: five in all. Stopping at the –OH carbon (a &lsquo;propane&rsquo; chain with an ethyl branch) misses two carbons of the main chain.</>,
  },
  {
    working: <>Priority: –OH &gt; –NH₂, so the suffix is <b>-ol</b> and the amine becomes the prefix <b>amino-</b>.</>,
    reason: <>The highest-priority group names the compound&rsquo;s suffix; lower-priority groups become prefixes (Data Book 2026, item 17, &lsquo;Functional group and substituent nomenclature&rsquo;, which lists alcohol above amine). So this is an amino-alcohol, &ldquo;…pentan-…-ol&rdquo;, not an amine.</>,
  },
  {
    working: <>Numbering: –OH is on C3 from either end; then –NH₂ gets the lower number → C1 (counting from the N end), not C5.</>,
    reason: <>Number to give the principal group (–OH) the lowest number. Here it is tied at 3 whichever end you start, so the tie is broken by giving the prefix group the lowest number: counting from the N end puts the amino group on C1.</>,
  },
  {
    working: <><b>1-aminopentan-3-ol</b></>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (26%), 3-hydroxypentan-1-amine, has the right chain and locants but treats the amine as the principal group — the error the report&rsquo;s comment addresses: –OH outranks –NH₂, so the name ends in -ol. Options <b>A</b> and <b>B</b> are named on a three-carbon &lsquo;propan&rsquo; chain, which is not the longest chain (five carbons). <b>A</b> treats the ethyl group as a branch (and also makes the amine the principal group); <b>B</b> even describes a different molecule — a methyl on C1 of propan-1-ol only makes a four-carbon chain, not the five carbons drawn.</>,
  },
]

export default function ChemistryQ4_2020() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={structureSrc}
              alt="Structural formula: H2N–CH2–CH2–CH(OH)–CH2–CH3, drawn with the last two carbons bending down from the carbon bonded to the OH group — from the original 2020 VCAA exam paper"
              className="w-full max-w-[360px]"
            />
          </div>
          <p>What is the IUPAC name of the molecule shown above?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>3-hydroxy-3-ethyl-propan-1-amine</> },
        { letter: 'B', content: <>3-amino-1-methylpropan-1-ol</> },
        { letter: 'C', content: <>3-hydroxypentan-1-amine</> },
        { letter: 'D', content: <>1-aminopentan-3-ol</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
