// 2023 Chemistry Exam, MCQ 3. VCAA examination report: 70% correct. Ranking the melting points of
// three triglycerides with the same number of carbon atoms by their number of C=C double bonds
// (more C=C → looser packing → weaker dispersion forces → lower melting point). Question text
// transcribed from the original paper; the structures of X, Y and Z are cropped from the original
// VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structuresSrc from './chem-2023-mcq3-triglycerides.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 70, B: 2, C: 26, D: 1 },
  answer: 'A',
  comment: (
    <>
      The larger the number of C=C double bonds in the molecule the more loosely the chains pack
      together, the weaker the intermolecular attraction, and the lower the melting point.
      Therefore, Z has the lowest melting point and Y, with no C=C double bonds, and the strongest
      intermolecular attraction, has the highest melting point.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Count the C=C double bonds in the three hydrocarbon chains of each molecule:<br />X: 1 &nbsp;·&nbsp; Y: 0 &nbsp;·&nbsp; Z: 3</>,
    reason: <>All three are triglycerides (three fatty-acid chains joined by ester links), and the question says they have the same number of carbon atoms — so size is not the difference. The only thing that varies is the number of C=C double bonds (the degree of unsaturation): X has one in its middle chain, Y has none (all three chains are saturated), and Z has one in each chain.</>,
  },
  {
    working: <>Melting a fat means overcoming the <b>dispersion forces</b> between its long hydrocarbon chains.</>,
    reason: <>The chains are non-polar, so the intermolecular forces between molecules are dispersion forces. The stronger these forces, the more energy is needed to separate the molecules, and the higher the melting point.</>,
  },
  {
    working: <>Saturated chains are regular zigzags that <b>pack closely</b>; each C=C puts a <b>kink</b> in the chain, so the chains pack <b>more loosely</b> → weaker dispersion forces → lower melting point.</>,
    reason: <>Dispersion forces act only over short distances, so they are strongest when chains can lie close together along their whole length. A C=C double bond fixes the chain&rsquo;s shape at that point (no rotation about a double bond) and breaks up the regular zigzag, which holds neighbouring chains further apart. The more C=C bonds, the more irregular the chains and the looser the packing. This is why saturated animal fats are solid at room temperature while unsaturated vegetable oils are liquid.</>,
  },
  {
    working: <>Fewest C=C → highest melting point:<br />Y (0) &gt; X (1) &gt; Z (3)</>,
    reason: <>Y packs most closely, so it has the strongest dispersion forces and the highest melting point; Z, with a kink in every chain, has the lowest.</>,
  },
  {
    working: <b>Y, X, Z</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (26%) is this order exactly reversed — it ranks the most unsaturated molecule, Z, highest, i.e. it gets the direction of the effect of C=C double bonds on melting point backwards.</>,
  },
]

export default function ChemistryQ3_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Molecules X, Y and Z all have the same number of carbon atoms.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={structuresSrc}
              alt="Three triglycerides drawn as skeletal structures. X: two saturated chains and one chain with a C=C double bond near its end. Y: three saturated chains. Z: three chains, each with one C=C double bond — from the original 2023 VCAA exam paper"
              className="w-full max-w-[620px]"
            />
          </div>
          <p>What is the order of melting points, from highest to lowest, for these three molecules?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Y, X, Z', isAnswer: true },
        { letter: 'B', content: 'Y, Z, X' },
        { letter: 'C', content: 'Z, X, Y' },
        { letter: 'D', content: 'Z, Y, X' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
