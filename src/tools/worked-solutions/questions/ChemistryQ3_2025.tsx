// 2025 Chemistry Exam, MCQ 3. VCAA examination report: 71% correct. Explaining why a reaction is
// exothermic in terms of the energy absorbed breaking bonds and released forming bonds, and the
// sign of ΔH. Question text transcribed from the original paper. VCAA report only. Solution is
// original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 71, D: 22 },
  answer: 'C',
  comment: (
    <>
      Breaking bonds requires energy and is an endothermic process.
      <br />
      Forming bonds releases energy and is an exothermic process.
      <br />
      For a reaction that is overall exothermic, breaking bonds requires less energy than what is
      released as the new bonds form.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Exothermic: energy is <b>released to</b> the surroundings, so <i>H</i>(products) &lt; <i>H</i>(reactants) and Δ<i>H</i> = <i>H</i>(products) − <i>H</i>(reactants) &lt; 0.</>,
    reason: <>The Data Book gives Δ<i>H</i> = <i>H</i><sub>products</sub> − <i>H</i><sub>reactants</sub>. Energy leaves the chemicals, so the products end up with less stored energy (enthalpy) than the reactants, and Δ<i>H</i> is negative.</>,
  },
  {
    working: <>Breaking bonds <b>absorbs</b> energy (endothermic). Forming bonds <b>releases</b> energy (exothermic).</>,
    reason: <>Every reaction does both: the reactants&rsquo; bonds must be broken before the products&rsquo; bonds can form. Students often think breaking a bond releases energy — it never does; energy must be put in to pull atoms apart.</>,
  },
  {
    working: <>Δ<i>H</i> = (energy absorbed breaking bonds) − (energy released forming bonds) &lt; 0<br />⇒ energy to break reactant bonds &lt; energy released forming product bonds</>,
    reason: <>For the overall change to be a net release, more energy must come out (bond forming) than goes in (bond breaking).</>,
  },
  {
    working: <>Check A: a net input of energy from the surroundings describes an <b>endothermic</b> reaction ✗<br />Check B: <i>H</i>(products) &gt; <i>H</i>(reactants) means Δ<i>H</i> &gt; 0, <b>endothermic</b> ✗<br />Check D: breaking needs more than forming releases ⇒ net absorption, <b>endothermic</b> ✗</>,
    reason: <>A, B and D all describe an endothermic reaction — each is the opposite of what is true for every exothermic reaction.</>,
  },
  {
    working: <b>Energy to break the reactants&rsquo; bonds &lt; energy released forming the products&rsquo; bonds</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> (22%) reverses the comparison — that is the description of an endothermic reaction. Options <b>A</b> and <b>B</b> also describe endothermic reactions (net energy absorbed; products higher in enthalpy than reactants).</>,
  },
]

export default function ChemistryQ3_2025() {
  return (
    <MCQShell
      question={<>Which one of the following statements about all exothermic reactions is true?</>}
      options={[
        { letter: 'A', content: 'There is a net input of energy from the surroundings.' },
        { letter: 'B', content: 'The enthalpy of the products is greater than the enthalpy of the reactants.' },
        { letter: 'C', content: 'The energy required to break the bonds of the reactants is less than the energy released when the products are formed.', isAnswer: true },
        { letter: 'D', content: 'The energy required to break the bonds of the reactants is greater than the energy released when the products are formed.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
