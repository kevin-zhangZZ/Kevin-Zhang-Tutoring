// 2023 Chemistry Exam, MCQ 5. VCAA examination report: 42% correct. Checking three statements
// about coenzymes against genuine biochemistry, then combining the true ones into the matching
// option. Question text transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 38, C: 3, D: 42 },
  answer: 'D',
  comment: (
    <>
      All three statements are properties of coenzymes. Coenzymes assist enzymes to catalyse a
      reaction, by binding loosely to the active site of the enzymes and supporting the transfer
      of electrons and atoms during the reaction.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>I: coenzymes are small organic (often vitamin-derived) molecules that work <i>alongside</i> an enzyme's active site to help it catalyse its reaction — without the coenzyme present, many enzymes can't function at all.</>,
    reason: 'True — this is the defining role of a coenzyme.',
  },
  {
    working: <>II: coenzymes bind <i>loosely</i> (non-covalently, reversibly) to the active site, rather than being a permanent part of the enzyme's structure — this is what lets them detach, diffuse away, and be reused by other enzyme molecules.</>,
    reason: 'True — loose, reversible binding is a genuine defining feature that distinguishes coenzymes from prosthetic groups.',
  },
  {
    working: <>III: coenzymes commonly shuttle electrons and/or atoms (e.g. hydrogen atoms) between different reactions — NAD⁺/NADH is the standard example, carrying electrons and H atoms from one enzyme-catalysed reaction to another.</>,
    reason: 'True — this carrier role is exactly why coenzymes matter in metabolic pathways.',
  },
  {
    working: <b>All three statements — I, II, and III — are genuine, correct properties of coenzymes.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ5_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements about coenzymes.</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. Coenzymes assist enzymes to catalyse a reaction.</span>
            <span>II. Coenzymes bind loosely to the active site of an enzyme.</span>
            <span>III. Coenzymes act as carriers in the transfer of electrons and atoms.</span>
          </div>
          <p>Which of the statements above are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I and II only' },
        { letter: 'B', content: 'I and III only' },
        { letter: 'C', content: 'II and III only' },
        { letter: 'D', content: 'I, II and III', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
