// 2021 Chemistry Exam, MCQ 7. VCAA examination report: 77% correct. Checking four pairs of
// characteristics of electrolytic and galvanic cells (electrode polarity, spontaneity, where
// reduction occurs, energy conversion). Question text and the table transcribed from the original
// paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 77, B: 8, C: 3, D: 12 },
  answer: 'A',
  comment: (
    <>
      Characteristic number 1: Electrolytic cells: cathode is negative (correct); galvanic cells:
      cathode is positive (correct)
      <br />
      Characteristic number 2: Electrolytic cells: have non-spontaneous reactions (correct);
      galvanic cells: have spontaneous reactions (correct)
      <br />
      Characteristic number 3: Electrolytic cells: reduction occurs at the anode (incorrect);
      galvanic cells: reduction occurs at the cathode (correct)
      <br />
      Characteristic number 4: Electrolytic cells: produce electricity (incorrect); galvanic
      cells: consume electricity (incorrect)
    </>
  ),
}

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
const th = `${td} font-semibold`

const ROWS: WorkingRow[] = [
  {
    working: <>A combination is correct only if <b>both</b> halves of the row are correct.</>,
    reason: <>Each row makes two claims, one about electrolytic cells and one about galvanic cells. One wrong claim makes the whole row wrong.</>,
  },
  {
    working: <>1. Electrolytic: cathode negative ✓ · Galvanic: cathode positive ✓ → <b>correct</b></>,
    reason: <>In an electrolytic cell the power supply pushes electrons <i>onto</i> the cathode, so it is the negative electrode. In a galvanic cell electrons flow from the anode (where oxidation releases them) through the wire to the cathode, so the anode is negative and the cathode is positive. The polarity of the cathode is opposite in the two cell types.</>,
  },
  {
    working: <>2. Electrolytic: non-spontaneous ✓ · Galvanic: spontaneous ✓ → <b>correct</b></>,
    reason: <>A galvanic cell runs by itself: the stronger oxidant reacts with the stronger reductant (higher <i>E</i>° half-cell is reduced). An electrolytic cell needs an external power supply precisely because its reaction would not happen on its own.</>,
  },
  {
    working: <>3. Electrolytic: reduction at the anode ✗ · Galvanic: reduction at the cathode ✓ → <b>incorrect</b></>,
    reason: <>In <i>every</i> cell, galvanic or electrolytic, oxidation occurs at the anode and reduction at the cathode (&ldquo;An Ox, Red Cat&rdquo;). Only the polarity changes between cell types, never which electrode is which.</>,
  },
  {
    working: <>4. Electrolytic: produce electricity ✗ · Galvanic: consume electricity ✗ → <b>incorrect</b></>,
    reason: <>Both halves are reversed. A galvanic cell converts chemical energy into electrical energy (it produces electricity); an electrolytic cell converts electrical energy into chemical energy (it consumes electricity).</>,
  },
  {
    working: <b>Only 1 and 2 are correct.</b>,
    reason: <>Matches option <b>A</b>. Options <b>B</b> and <b>C</b> include 3, which wrongly puts reduction at the anode of an electrolytic cell; options <b>C</b> and <b>D</b> include 4, which has the energy conversions of the two cell types swapped.</>,
  },
]

export default function ChemistryQ7_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following characteristics of electrolytic cells and galvanic cells.</p>
          <table className="mb-3 text-[13.5px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Characteristic number</th>
                <th className={th}>Electrolytic cells</th>
                <th className={th}>Galvanic cells</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={`${td} text-center`}>1</td><td className={td}>cathode is negative</td><td className={td}>cathode is positive</td></tr>
              <tr><td className={`${td} text-center`}>2</td><td className={td}>have non-spontaneous reactions</td><td className={td}>have spontaneous reactions</td></tr>
              <tr><td className={`${td} text-center`}>3</td><td className={td}>reduction occurs at the anode</td><td className={td}>reduction occurs at the cathode</td></tr>
              <tr><td className={`${td} text-center`}>4</td><td className={td}>produce electricity</td><td className={td}>consume electricity</td></tr>
            </tbody>
          </table>
          <p>
            Which of the following combinations of characteristics of electrolytic cells and
            galvanic cells are correct?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'only 1 and 2', isAnswer: true },
        { letter: 'B', content: 'only 2 and 3' },
        { letter: 'C', content: 'only 3 and 4' },
        { letter: 'D', content: 'only 1, 2 and 4' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
