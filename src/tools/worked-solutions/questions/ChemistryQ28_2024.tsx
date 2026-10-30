// 2024 Chemistry Exam, MCQ 28. VCAA examination report: 63% correct. Identifying the
// functional groups (alkenyl, amide, hydroxyl) in a skeletal structure of capsaicin, the active
// ingredient of Capsicum frutescens. Question text transcribed from the original paper (rendered
// from page images — the 2024 exam PDF has no extractable text); the skeletal structure is
// cropped from the original VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structureSrc from './chem-2024-mcq28-capsaicin.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 16, C: 15, D: 7 },
  answer: 'A',
  comment: (
    <>
      The compound shows a C=C (alkenyl), an -NH-CO- (amide) and an
      -OH (hydroxyl) group.
      <br />
      There are no carboxyl, carbonyl or amine groups present in the compound.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Scan the skeletal structure for every atom that isn&rsquo;t C or H, and for every double bond, then name the group each belongs to.</>,
    reason: <>In a skeletal structure every line end and corner is a carbon with enough H atoms to make four bonds; only heteroatoms (O, N) and the H atoms on them are drawn. Functional groups are found at the heteroatoms and the multiple bonds.</>,
  },
  {
    working: <>Top left: <b>–OH</b> bonded to a ring carbon → <b>hydroxyl</b> group.</>,
    reason: <>An O–H on a carbon is a hydroxyl group (Data Book item 17: alcohol, –OH). The O below it, between the ring and a CH₃, has no H — it is an ether link (C–O–C), which none of the options mentions.</>,
  },
  {
    working: <>Middle: <b>–NH–CO–</b>, the N bonded directly to the C=O carbon → <b>amide</b> group.</>,
    reason: <>Look at what the N is attached to. N bonded to a C=O carbon is an amide (the same –CO–NH– link as a peptide bond). An <b>amine</b> (amino group) has N bonded only to C atoms that are <b>not</b> C=O, so &ldquo;amino&rdquo; in B and &ldquo;amine&rdquo; in D are wrong.</>,
  },
  {
    working: <>The C=O here is part of the amide, so the molecule has no <b>carboxyl</b> (–COOH) and no separate <b>carbonyl</b> (aldehyde or ketone C=O) group.</>,
    reason: <>A carboxyl group needs an –OH on the same carbon as the C=O; here that carbon carries an N instead. And a C=O that belongs to an amide (or ester, or acid) is named as that group, not as a ketone/aldehyde &ldquo;carbonyl&rdquo; — which is why the report says there is no carbonyl group.</>,
  },
  {
    working: <>Right-hand end of the chain: a <b>C=C</b> double bond (the double line) → <b>alkenyl</b> group.</>,
    reason: <>The double line in the chain is a C=C, the alkene functional group. (The benzene ring&rsquo;s alternating double lines are an aromatic ring, not counted as alkenyl.)</>,
  },
  {
    working: <b>Functional groups: alkenyl, amide, hydroxyl.</b>,
    reason: (
      <>
        Matches option <b>A</b>. Option <b>B</b> (16%) mistakes the amide N–H for an amino group by
        ignoring the C=O bonded to the N. Options <b>C</b> and <b>D</b> both name a carboxyl and a
        carbonyl group, but the only C=O in the molecule belongs to the amide, so neither group is
        present; both also leave out the C=C and the –OH, and <b>D</b> names the amide N as an amine.
      </>
    ),
  },
]

export default function ChemistryQ28_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            <i>Capsicum frutescens</i> is a plant used to reduce inflammation and pain. One active
            ingredient of this plant is shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={structureSrc}
              alt="Skeletal structure: a benzene ring carrying an –OH group and an –OCH3 group, joined by a CH2 to an –NH–C(=O)– group, followed by a carbon chain with a C=C double bond near its branched end — from the original 2024 VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>Which functional groups are present in this active ingredient?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'alkenyl, amide, hydroxyl', isAnswer: true },
        { letter: 'B', content: 'alkenyl, amino, hydroxyl' },
        { letter: 'C', content: 'amide, carboxyl, carbonyl' },
        { letter: 'D', content: 'amine, carboxyl, carbonyl' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
