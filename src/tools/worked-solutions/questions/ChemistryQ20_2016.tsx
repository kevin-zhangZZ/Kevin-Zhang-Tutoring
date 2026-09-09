// 2016 Chemistry Exam, MCQ 20. VCAA examination report: 34% correct — the second-hardest MCQ
// on the 2016 paper. Diluting a weak acid: pH and percentage ionisation move in opposite
// directions, which trips up the common assumption that both must move the same way.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 34, C: 26, D: 10 },
  answer: 'B',
  comment: 'Adding water decreases the overall concentration, so the system partially compensates by favouring the forward (ionising) reaction — but the [H3O+] still ends up lower than before dilution.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="HC3H5O3(aq) + H2O(l) <=> C3H5O3-(aq) + H3O+(aq)" className="block text-[13.5px]" />,
    reason: 'Lactic acid is a weak acid — it only partially ionises, so this is a genuine equilibrium, not a one-way reaction.',
  },
  {
    working: 'Diluting the solution lowers every concentration in the mixture at the instant water is added.',
    reason: 'This disturbs the equilibrium — by Le Chatelier’s principle, the system responds to partially counteract the change.',
  },
  {
    working: 'The equilibrium shifts to increase the total number of dissolved particles — i.e. it shifts right, favouring further ionisation.',
    reason: <>Both sides of this equation have <em>different</em> numbers of dissolved solute particles (1 on the left, 2 on the right) — diluting favours the side with more particles.</>,
  },
  {
    working: <b>Percentage ionisation increases.</b>,
    reason: 'This rules out options C and D, both of which say percentage ionisation decreases.',
  },
  {
    working: <>Even so, the shift only <em>partially</em> compensates — it can't fully cancel out the dilution.</>,
    reason: <>The <Chem eq="[H3O+]" /> ends up lower than before, even though a larger <em>fraction</em> of the (now more dilute) acid has ionised.</>,
  },
  {
    working: <>Lower <Chem eq="[H3O+]" /> means <b>pH increases</b>.</>,
    reason: <>This rules out options C and D again (both say pH decreases) and confirms <b>B</b> over A — the two options differ only on percentage ionisation.</>,
  },
  {
    working: <b>pH: increase · Percentage ionisation: increase</b>,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function ChemistryQ20_2016() {
  return (
    <MCQShell
      question={<p>How does diluting a 0.1 M solution of lactic acid, <Chem eq="HC3H5O3" />, change its pH and percentage ionisation?</p>}
      options={[
        { letter: 'A', content: 'pH: increase · Percentage ionisation: decrease' },
        { letter: 'B', content: 'pH: increase · Percentage ionisation: increase', isAnswer: true },
        { letter: 'C', content: 'pH: decrease · Percentage ionisation: increase' },
        { letter: 'D', content: 'pH: decrease · Percentage ionisation: decrease' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
