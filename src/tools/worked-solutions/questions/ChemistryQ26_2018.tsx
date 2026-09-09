// 2018 Chemistry Exam, MCQ 26. VCAA examination report: 34% correct — the hardest MCQ on the
// 2018 paper. Lemon juice contains both weak organic acids and vitamin C (which is also a weak
// acid, but uniquely redox-active with iodine) — pick the right base/indicator for each of the
// two titrations needed to separate their concentrations.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 23, C: 30, D: 34 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: 'Two separate titrations are needed: an acid-base titration finds the total concentration of every weak acid present (organic acids + vitamin C together); a redox titration with iodine finds vitamin C alone (only it reacts with I2).',
    reason: 'Subtracting one result from the other then gives the organic acids on their own.',
  },
  {
    working: <>Acid-base titration: needs a <b>strong</b> base (for a sharp, well-defined endpoint against weak acids) and an indicator matching a <b>basic</b> equivalence point.</>,
    reason: <>A weak-acid/strong-base titration has its equivalence point above pH 7 (the salt formed is a weak base), so the indicator must change colour <em>there</em>.</>,
  },
  {
    working: (
      <>
        Phenolphthalein changes colour around pH 8.2–10 — matches a basic equivalence point.
        <br />
        Methyl orange changes around pH 3.1–4.4 — matches an <em>acidic</em> equivalence point instead (wrong for this titration).
      </>
    ),
    reason: 'This is exactly where options using methyl orange go wrong.',
  },
  {
    working: <>Redox titration: titrate with <Chem eq="I2" />, using <b>starch</b> as the indicator (starch forms an intense blue-black complex with iodine, giving a sharp endpoint).</>,
    reason: <>Permanganate is <em>self</em>-indicating in its own titrations (like the one used elsewhere with rhubarb extract) — it isn't the indicator used for an iodine titration.</>,
  },
  {
    working: (
      <>
        A: only does the acid-base part — doesn't separate vitamin C from the other acids at all. ✗
        <br />
        B: ammonia (a weak base) doesn't give a sharp weak-acid endpoint, and permanganate isn't the iodine-titration indicator. ✗
        <br />
        C: sodium hydroxide is fine, but methyl orange is the wrong indicator for this equivalence point. ✗
      </>
    ),
    reason: 'Each of the other three options gets exactly one piece wrong.',
  },
  {
    working: <b>D: KOH (strong base) + phenolphthalein for the acid-base titration, and I₂ + starch for the redox titration.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ26_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Organic acids, including vitamin C (ascorbic acid), are present in lemon juice. Since
            organic acids and vitamin C are weak acids, they will undergo acid-base reactions. Only
            vitamin C, not the organic acids, will undergo a redox reaction with iodine,{' '}
            <Chem eq="I2" />.
          </p>
          <p>
            Which one of the following methods would be most appropriate to determine the
            concentrations of the organic acids and the vitamin C in a sample of lemon juice?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'an acid-base titration with sodium hydroxide and phenolphthalein indicator' },
        { letter: 'B', content: 'an acid-base titration with ammonia and phenol red indicator, and a redox titration with iodine and permanganate ion indicator' },
        { letter: 'C', content: 'an acid-base titration with sodium hydroxide and methyl orange indicator, and a redox titration with iodine and a starch indicator' },
        { letter: 'D', content: 'an acid-base titration with potassium hydroxide and phenolphthalein indicator, and a redox titration with iodine and starch indicator', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
