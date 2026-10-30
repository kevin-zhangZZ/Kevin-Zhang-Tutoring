// 2022 Chemistry Exam, MCQ 16. VCAA examination report: 87% correct. IUPAC naming of a
// five-carbon chain carrying an –OH and a –Cl group: the –OH is the suffix, so it takes the
// lowest locant. Question text transcribed from the original paper (no figures). The report
// writes the answer in the older style "3-chloro-2-pentanol"; the working notes it is the same
// name as option B. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 87, C: 3, D: 2 },
  answer: 'B',
  comment: (
    <>
      5 C atoms in longest chain, OH is attached to C-2, and Cl is attached to C-3. Hence,
      3-chloro-2-pentanol.
    </>
  ),
}

const cell = 'border border-gray-300 dark:border-gray-700 px-2 py-1 text-center'

const ROWS: WorkingRow[] = [
  {
    working: <>Longest carbon chain: <Chem eq="CH3–CH2–CH–CH–CH3" />, 5 C atoms, all single bonds → <b>pentan</b>e.</>,
    reason: <>Read the condensed formula one carbon at a time: CH₃, CH₂, CHCl, CHOH, CH₃. The Cl and the OH are attached to the third and fourth carbons (counting from the left); they are not part of the chain.</>,
  },
  {
    working: <>Functional groups: –OH (hydroxy, an alcohol) → suffix <b>-ol</b>; –Cl → prefix <b>chloro-</b>.</>,
    reason: <>In IUPAC naming a haloalkane group is always a <i>prefix</i>; the alcohol group is written as the <i>suffix</i>, replacing the final &ldquo;e&rdquo; of pentane: pentan-?-ol.</>,
  },
  {
    working: (
      <>
        Number from the end that gives the –OH the lowest number (from the right):
        <table className="my-2 border-collapse text-[13.5px]">
          <tbody>
            <tr>
              <td className={cell}>group</td>
              <td className={cell}><Chem eq="CH3" /></td>
              <td className={cell}><Chem eq="CH2" /></td>
              <td className={cell}><Chem eq="CHCl" /></td>
              <td className={cell}><Chem eq="CHOH" /></td>
              <td className={cell}><Chem eq="CH3" /></td>
            </tr>
            <tr>
              <td className={cell}>C number</td>
              <td className={cell}>5</td>
              <td className={cell}>4</td>
              <td className={cell}>3</td>
              <td className={cell}>2</td>
              <td className={cell}>1</td>
            </tr>
          </tbody>
        </table>
        –OH on C-2, –Cl on C-3.
      </>
    ),
    reason: <>The group named in the suffix (here –OH) gets the lowest possible locant, even if that gives a prefix group a higher one. Numbering from the left would put the –OH on C-4; from the right it is on C-2, so number from the right. (Cl is on C-3 either way.)</>,
  },
  {
    working: <>Name = prefix (with locant) + chain + suffix (with locant) = 3-chloro + pentan + -2-ol</>,
    reason: <>The locant of the suffix goes just before &ldquo;-ol&rdquo;, with hyphens between numbers and letters.</>,
  },
  {
    working: <b>3-chloropentan-2-ol</b>,
    reason: <>Matches option <b>B</b>. The report writes the older form &ldquo;3-chloro-2-pentanol&rdquo;, which is the same name. Option <b>A</b> numbers the chain from the left, giving the –OH locant 4 instead of 2. Options <b>C</b> and <b>D</b> are not valid names: they run the locants of two different groups together as if both were chloro groups (and leave out &ldquo;di&rdquo;), and give no locant for the –OH.</>,
  },
]

export default function ChemistryQ16_2022() {
  return (
    <MCQShell
      question={
        <p>
          The correct IUPAC name for <Chem eq="CH3CH2CHClCHOHCH3" /> is
        </p>
      }
      options={[
        { letter: 'A', content: '3-chloropentan-4-ol' },
        { letter: 'B', content: '3-chloropentan-2-ol', isAnswer: true },
        { letter: 'C', content: '2,3-chloro-pentanol' },
        { letter: 'D', content: '3,2-chloro-pentanol' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
