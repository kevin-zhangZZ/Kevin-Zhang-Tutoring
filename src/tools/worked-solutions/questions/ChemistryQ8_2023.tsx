// 2023 Chemistry Exam, MCQ 8. VCAA examination report: 52% correct. Finding the equilibrium
// constant, value and units, when every coefficient of the Haber process equation is doubled
// (K is squared: 4.10 M⁻² becomes 16.8 M⁻⁴). Question text transcribed from the original paper
// (no figures). Source: VCAA report only; the report's "Kvalue" (missing space) is kept verbatim.
// Solution is original.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 15, C: 18, D: 52 },
  answer: 'D',
  comment: (
    <>
      <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />&emsp;&emsp;<i>K</i> = 4.10 M⁻²
      <br />
      The original equation coefficients have been doubled, so the <i>K</i>value is raised to the
      power of 2 (squared).
      <br />
      <Chem eq="2N2(g) + 6H2(g) <=> 4NH3(g)" />&emsp;&emsp;<i>K</i> = (4.10 M⁻²)²
      <br />
      <span className="pl-[14em]">= 16.8 M⁻⁴</span>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Original equation, <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />:
        <br />
        <Katex tex="K_1 = \dfrac{[\mathrm{NH_3}]^2}{[\mathrm{N_2}][\mathrm{H_2}]^3} = 4.10\ \mathrm{M^{-2}}" />
      </>
    ),
    reason: <>The equilibrium expression is [products]/[reactants], each concentration raised to the power of its <b>coefficient</b> in the equation. Its value depends on the equation used to represent the reaction.</>,
  },
  {
    working: (
      <>
        New equation, <Chem eq="2N2(g) + 6H2(g) <=> 4NH3(g)" />:
        <br />
        <Katex tex="K_2 = \dfrac{[\mathrm{NH_3}]^4}{[\mathrm{N_2}]^2[\mathrm{H_2}]^6} = \left(\dfrac{[\mathrm{NH_3}]^2}{[\mathrm{N_2}][\mathrm{H_2}]^3}\right)^{2} = K_1^{\,2}" />
      </>
    ),
    reason: <>Every coefficient is doubled, so every power in the expression doubles. That is the same as <b>squaring</b> the whole original expression, not multiplying it by 2.</>,
  },
  {
    working: (
      <>
        <Katex tex="K_2 = K_1^{\,2}" />
        <br />
        <Katex tex="K_2 = (4.10\ \mathrm{M^{-2}})^2" />
        <br />
        <Katex tex="K_2 = 16.81\ \mathrm{M^{-4}}" />
      </>
    ),
    reason: <>Square the number <b>and</b> the unit: (M⁻²)² = M⁻⁴. The temperature is the same (327 °C), so this is the only change to <i>K</i>.</>,
  },
  {
    working: <Katex tex="\text{Units check: } \dfrac{\mathrm{M}^4}{\mathrm{M}^2 \times \mathrm{M}^6} = \dfrac{\mathrm{M}^4}{\mathrm{M}^8} = \mathrm{M^{-4}}" />,
    reason: <>Substituting M for each concentration in the new expression gives the same unit, confirming M⁻⁴.</>,
  },
  {
    working: <b><Katex tex="K_2 = 16.8\ \mathrm{M^{-4}}" /></b>,
    reason: <>3 significant figures, set by the given <i>K</i> = 4.10 M⁻². Matches option <b>D</b>. Options <b>A</b> and <b>B</b> (8.20) multiply <i>K</i> by 2 instead of squaring it; option <b>C</b> squares the value but keeps the old unit, M⁻², instead of squaring the unit too.</>,
  },
]

export default function ChemistryQ8_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            At 327 °C, the equilibrium constant for the reaction{' '}
            <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /> is 4.10 M⁻².
          </p>
          <p>
            What is the equilibrium constant at 327 °C for the reaction{' '}
            <Chem eq="2N2(g) + 6H2(g) <=> 4NH3(g)" />?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '8.20 M⁻²' },
        { letter: 'B', content: '8.20 M⁻⁴' },
        { letter: 'C', content: '16.8 M⁻²' },
        { letter: 'D', content: '16.8 M⁻⁴', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
