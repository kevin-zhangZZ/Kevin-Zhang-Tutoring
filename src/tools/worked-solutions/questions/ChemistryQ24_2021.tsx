// 2021 Chemistry Exam, MCQ 24. VCAA examination report: 38% correct. What effect adding a
// catalyst has on the energy profile diagram of an exothermic reaction. Question text
// transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 4, C: 11, D: 47 },
  answer: 'A',
  comment: (
    <>
      The energy content of the products (and reactants) — and so ΔH — is not affected by adding
      a catalyst and stays the same. The activation energy of the forward and reverse reactions
      both decrease by the same absolute amount, not the same proportion.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A catalyst works by opening up an alternative reaction pathway with a <b>lower activation energy</b> — it changes nothing about the reactants or products themselves.</>,
    reason: 'Core fact about how catalysts work.',
  },
  {
    working: <>A: since the identities (and so the energies) of the reactants and products are unchanged, the energy of the products stays exactly the same.</>,
    reason: 'Correct — a catalyst can only change the pathway between reactants and products, not their own energy levels.',
  },
  {
    working: <>B: the whole point of a catalyst is to change the shape of the energy profile — it lowers the peak (the activation energy), which is exactly what makes the reaction faster.</>,
    reason: 'Ruled out — the shape does change.',
  },
  {
    working: <>C: the horizontal position ("progress of reaction") of the peak isn't what moves — its <i>height</i> drops. The reaction rate increases because the barrier is lower, not because the peak has shifted sideways.</>,
    reason: 'Ruled out — misdescribes what actually changes.',
  },
  {
    working: <>D: a catalyst lowers the activation energy of the forward and reverse reactions by the <b>same absolute amount</b> (the same number of kJ mol⁻¹) — not by the same proportion of each.</>,
    reason: <>Since the forward and reverse activation energies start out different sizes, an equal absolute drop is a <i>different</i> proportion of each. Ruled out.</>,
  },
  {
    working: <b>Only "the energy of the products remains the same" holds up.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ24_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following statements describes the effect that adding a catalyst will have on the energy profile diagram for an exothermic reaction?</p>}
      options={[
        { letter: 'A', content: 'The energy of the products will remain the same.', isAnswer: true },
        { letter: 'B', content: 'The shape of the energy profile diagram will remain the same.' },
        { letter: 'C', content: 'The peak of the energy profile will move to the left as the reaction rate increases.' },
        { letter: 'D', content: 'The activation energy will be lowered by the same proportion in the forward and reverse reactions.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
