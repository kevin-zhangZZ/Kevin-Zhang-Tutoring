// 2021 Chemistry Exam, MCQ 23. VCAA examination report: 49% correct. Comparing the
// concentrations of three samples of the same organic acid from their average KOH titres, and
// judging whether the titres are concordant. Question text and table transcribed from the
// original paper (the table as an HTML table). VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
const th = `${td} font-semibold`

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 23, B: 49, C: 19, D: 9 },
  answer: 'B',
  comment: (
    <>
      The same standardised solution of KOH(aq) was used in titration of all three samples, so the
      larger the average titre the greater the <i>n</i>(acid) present in the sample.
      <br />
      Since 25 mL aliquots of the acids was used in all three samples, a larger titre of KOH(aq)
      is consistent with a higher acid concentration.
      <br />
      Sample 3 was the most concentrated acid while sample 2 was the least concentrated.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><i>n</i>(KOH) = <i>c</i>(KOH) × <i>V</i>(titre)</>,
    reason: <>Every titre uses the <b>same standardised KOH</b> solution, so <i>c</i>(KOH) is the same in every titration. The amount of KOH delivered is therefore proportional to the titre: a bigger titre means more mol of KOH.</>,
  },
  {
    working: <><i>n</i>(acid) = (mole ratio from the equation) × <i>n</i>(KOH)</>,
    reason: <>All three samples are the <b>same organic acid</b>, so the acid : KOH mole ratio is the same for all of them (1 : 1 for a monoprotic acid, but whatever it is, it doesn&rsquo;t change). More KOH needed at the end point means more mol of acid in the aliquot.</>,
  },
  {
    working: <><i>c</i>(acid) = <i>n</i>(acid) ÷ 0.025 L</>,
    reason: <>Every aliquot is the same volume, 25 mL = 0.025 L, so the concentration of the acid is proportional to <i>n</i>(acid), and so to the titre. <b>The larger the average titre, the more concentrated the acid.</b></>,
  },
  {
    working: <>Average titres: Sample 3 (21.55 mL) &gt; Sample 1 (20.37 mL) &gt; Sample 2 (19.98 mL)</>,
    reason: <>Read from the table. Sample 3 is the most concentrated and Sample 2 the least concentrated. This is robust: even Sample 3&rsquo;s smallest titre (21.45 mL) is larger than every titre for Samples 1 and 2.</>,
  },
  {
    working: <>A: Sample 2 has the <b>smallest</b> average titre, so it is the <b>least</b> concentrated acid.</>,
    reason: <>Ruled out. This reverses the relationship: it treats a smaller titre as meaning a more concentrated acid, when a smaller titre means there was less acid to neutralise.</>,
  },
  {
    working: <>C: the comparison needs only the titres — the actual values of <i>c</i>(KOH) and the mole ratio are the same for every sample, so they cancel out.</>,
    reason: <>Ruled out. You would need <i>c</i>(KOH) and the acid&rsquo;s formula to <i>calculate</i> each concentration, but not to <i>rank</i> them.</>,
  },
  {
    working: <>D: Sample 2&rsquo;s titres are 19.85, 19.65 and 20.45 mL; titration 3 is 0.60–0.80 mL away from the other two.</>,
    reason: <>Ruled out. <b>Concordant</b> titres agree closely (typically within about 0.10 mL of each other). Sample 2&rsquo;s three titres clearly do not: 20.45 mL is an outlier and should be left out of the average rather than included. The averages are added up correctly, but the results are <i>not</i> all concordant, so the reason D gives is false. (Leaving the outlier out gives (19.85 + 19.65) ÷ 2 = 19.75 mL for Sample 2, still the smallest, so the ranking doesn&rsquo;t change; the averages for Samples 1 and 3 are also arithmetically correct: 20.37 and 21.55 mL.)</>,
  },
  {
    working: <b>Sample 3 is the most concentrated acid.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> reads a smaller titre as a more concentrated acid; option <b>C</b> misses that the same KOH, the same acid and the same aliquot volume make the titres directly comparable; option <b>D</b> calls results concordant when Sample 2 contains a clear outlier.</>,
  },
]

export default function ChemistryQ23_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            A student titrated 25 mL aliquots of three different concentrations of an organic acid
            against a standardised potassium hydroxide, KOH, solution. The student&rsquo;s results
            are shown in the table below.
          </p>
          <div className="mb-3 overflow-x-auto">
            <table className="text-[13.5px] border-collapse">
              <thead>
                <tr>
                  <th className={th}></th>
                  <th className={`${th} text-center`}>KOH titre for<br />Sample 1 (mL)</th>
                  <th className={`${th} text-center`}>KOH titre for<br />Sample 2 (mL)</th>
                  <th className={`${th} text-center`}>KOH titre for<br />Sample 3 (mL)</th>
                </tr>
              </thead>
              <tbody>
                <tr><th className={`${th} text-left`}>Titration 1</th><td className={`${td} text-center`}>20.35</td><td className={`${td} text-center`}>19.85</td><td className={`${td} text-center`}>21.55</td></tr>
                <tr><th className={`${th} text-left`}>Titration 2</th><td className={`${td} text-center`}>20.45</td><td className={`${td} text-center`}>19.65</td><td className={`${td} text-center`}>21.45</td></tr>
                <tr><th className={`${th} text-left`}>Titration 3</th><td className={`${td} text-center`}>20.30</td><td className={`${td} text-center`}>20.45</td><td className={`${td} text-center`}>21.65</td></tr>
                <tr><th className={`${th} text-left`}>Average titre</th><td className={`${td} text-center`}>20.37</td><td className={`${td} text-center`}>19.98</td><td className={`${td} text-center`}>21.55</td></tr>
              </tbody>
            </table>
          </div>
          <p>Which one of the following statements is consistent with the results shown in the table?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Sample 2 is the most concentrated acid.' },
        { letter: 'B', content: 'Sample 3 is the most concentrated acid.', isAnswer: true },
        { letter: 'C', content: 'There is not enough information to draw a valid conclusion.' },
        { letter: 'D', content: 'The averages in the table are correct as the results are concordant.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
