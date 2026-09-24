// 2021 Chemistry Exam, MCQ 24. VCAA examination report: 38% correct. What effect adding a
// catalyst has on the energy profile diagram of an exothermic reaction. Question text
// transcribed from the original paper; the report's energy profile is cropped from the report
// PDF. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './chem-2021-mcq24-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 4, C: 11, D: 47 },
  answer: 'A',
  comment: (
    <>
      The general relative energy profiles for an uncatalysed reacton and a catalysed reaction may
      be shown as:
      <img src={reportGraphSrc} alt="The report's energy profile: reactants above products, with a higher curve for the reaction pathway without a catalyst and a lower dashed curve for the reaction pathway with a catalyst, each activation energy Ea marked from the reactants" className="w-full max-w-[360px] mt-1" />
      The energy content of the products (and reactants) – and so the Δ<i>H</i> for the equation –
      is not affected by adding a catalyst and will remain the same.
      <br />
      With respect to Option D: The activation energy for the forward and reverse reactions
      decreases by the same amount. In the exothermic profile shown, the activation energy of the
      forward reaction is smaller than the activation energy of the reverse reaction.
      <br />
      So the decrease in activation energy due to the addition of a catalyst is a higher proportion
      of the activation energy of the forward reaction / a smaller proportion of the activation of
      the reverse reaction.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A catalyst works by opening up an alternative reaction pathway with a <b>lower activation energy</b> — it changes nothing about the reactants or products themselves.</>,
    reason: <>Core fact about how catalysts work.</>,
  },
  {
    working: <>A: since the identities (and so the energies) of the reactants and products are unchanged, the energy of the products stays exactly the same.</>,
    reason: <>Correct — a catalyst can only change the pathway between reactants and products, not their own energy levels.</>,
  },
  {
    working: <>B: the whole point of a catalyst is to change the shape of the energy profile — it lowers the peak (the activation energy), which is exactly what makes the reaction faster.</>,
    reason: <>Ruled out — the shape does change.</>,
  },
  {
    working: <>C: the horizontal position ("progress of reaction") of the peak isn't what moves — its <i>height</i> drops. The reaction rate increases because the barrier is lower, not because the peak has shifted sideways.</>,
    reason: <>Ruled out — misdescribes what actually changes.</>,
  },
  {
    working: <>D: a catalyst lowers the activation energy of the forward and reverse reactions by the <b>same absolute amount</b> (the same number of kJ mol⁻¹) — not by the same proportion of each.</>,
    reason: <>Since the forward and reverse activation energies start out different sizes, an equal absolute drop is a <i>different</i> proportion of each. Ruled out.</>,
  },
  {
    working: <b>Only &ldquo;the energy of the products will remain the same&rdquo; holds up.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, chosen by 47%, mistakes the same <i>amount</i> for the same <i>proportion</i> (the report&rsquo;s point).</>,
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
