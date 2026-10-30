// 2020 Chemistry Exam, MCQ 14. VCAA examination report: 45% correct. How K_c and ΔH change when
// every coefficient of the Haber process equation is divided by 3: K_c becomes the cube root
// (640^(1/3) ≈ 9) while ΔH is divided by 3 (−30.8 kJ mol⁻¹). Question text transcribed from the
// original paper. The report prints "(640)1/3" for the cube root and gives the units as M⁻²
// (those are the original equation's units; the new equation's are M^(−2/3)) — both kept
// verbatim in the comment and explained in the working. VCAA report only. Solution is original.

import Chem from '../Chem'
import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 26, C: 25, D: 4 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇋ 2NH<sub>3</sub>(g); Δ<i>H</i> = -92.3 kJ mol<sup>-1</sup>;{' '}
      <i>K</i><sub>c</sub> = 640
      <br />
      Divide coefficients by 3
      <br />
      <sup>1</sup>/<sub>3</sub> N<sub>2</sub>(g) + H<sub>2</sub>(g) ⇋ <sup>2</sup>/<sub>3</sub>{' '}
      NH<sub>3</sub>(g);
      <br />
      Δ<i>H</i> = -92.3/ 3 = -30.8 kJ mol<sup>-1</sup>
      <br />
      <i>K</i><sub>c</sub> = (640)1/3 = 8.6 (M<sup>-2</sup>)
      <br />
      Note: The &lsquo;magnitude&rsquo; refers to numerical value and does not require units.
      <br />
      Options B and C did not accurately apply the impact of a change in equation coefficients on
      the <i>K</i> value.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex tex="K_\mathrm{c} = \dfrac{[\mathrm{NH_3}]^2}{[\mathrm{N_2}][\mathrm{H_2}]^3} = 640" />,
    reason: <>The equilibrium expression for the original equation: each concentration is raised to the power of its coefficient.</>,
  },
  {
    working: <>New equation = original equation with every coefficient <b>divided by 3</b> (multiplied by ⅓).</>,
    reason: <>Compare the coefficients: N<sub>2</sub> 1 → ⅓, H<sub>2</sub> 3 → 1, NH<sub>3</sub> 2 → ⅔.</>,
  },
  {
    working: <Katex tex="K_\mathrm{c}' = \dfrac{[\mathrm{NH_3}]^{2/3}}{[\mathrm{N_2}]^{1/3}[\mathrm{H_2}]} = \left(\dfrac{[\mathrm{NH_3}]^2}{[\mathrm{N_2}][\mathrm{H_2}]^3}\right)^{1/3} = K_\mathrm{c}^{\,1/3}" />,
    reason: <>The coefficients are <b>powers</b> in the expression, so multiplying every coefficient by ⅓ raises the whole expression to the power ⅓ — it takes the <b>cube root</b> of <i>K</i><sub>c</sub>, not one third of it. (Likewise doubling the coefficients squares <i>K</i>, and reversing the equation gives 1/<i>K</i>.)</>,
  },
  {
    working: (
      <>
        <Katex tex="K_\mathrm{c}' = K_\mathrm{c}^{\,1/3}" />
        <br />
        <Katex tex="K_\mathrm{c}' = 640^{1/3}" />
        <br />
        <Katex tex="K_\mathrm{c}' = 8.62 \approx 9" />
      </>
    ),
    reason: <>Check: 8.62³ ≈ 640 ✓. The options give <i>K</i><sub>c</sub> to the nearest whole number, so 8.62 is option A&rsquo;s &ldquo;9&rdquo; (the report rounds it to 8.6). The report writes the cube root as &ldquo;(640)1/3&rdquo; — read it as 640<sup>1/3</sup>. The question asks only for the <b>magnitude</b>, so no units are needed; if you did give them, the new expression has units M<sup>2/3</sup> ÷ (M<sup>1/3</sup> × M) = M<sup>−2/3</sup>. The report&rsquo;s &ldquo;(M<sup>-2</sup>)&rdquo; are the units of the <i>original</i> <i>K</i><sub>c</sub> (M<sup>2</sup> ÷ M<sup>4</sup>), not of the new one.</>,
  },
  {
    working: (
      <>
        <Katex tex="\Delta H' = \tfrac{1}{3}\,\Delta H" />
        <br />
        <Katex tex="\Delta H' = \tfrac{1}{3} \times (-92.3\ \text{kJ mol}^{-1})" />
        <br />
        <Katex tex="\Delta H' = -30.8\ \text{kJ mol}^{-1}" />
      </>
    ),
    reason: <>Δ<i>H</i> is <b>proportional to the amounts</b> in the equation: reacting one third as many moles releases one third as much energy, so Δ<i>H</i> is simply divided by 3 (the sign stays negative — still exothermic). Δ<i>H</i> scales by multiplying; <i>K</i> scales by powers.</>,
  },
  {
    working: <><b>9 and Δ<i>H</i> = −30.8 kJ mol⁻¹</b></>,
    reason: <>Matches option <b>A</b>. Option <b>B</b> (26%) divides <i>K</i><sub>c</sub> by 3 (640 ÷ 3 = 213) — treating <i>K</i> like Δ<i>H</i>. Option <b>C</b> (25%) scales Δ<i>H</i> correctly but leaves <i>K</i><sub>c</sub> at 640, as if the equation&rsquo;s coefficients didn&rsquo;t affect <i>K</i>. Option <b>D</b> changes neither. (The equation is still <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /> scaled down — same reaction, same temperature, so the extent of reaction hasn&rsquo;t changed, only the way <i>K</i> is written.)</>,
  },
]

export default function ChemistryQ14_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 14 and 15.</p>
          <p className="mb-2">
            The magnitude of the equilibrium constant, <i>K</i><sub>c</sub>, at 25 °C for the
            following reaction is 640.
          </p>
          <p className="mb-3 text-[14px]">
            <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /> &nbsp;&nbsp; Δ<i>H</i> = −92.3 kJ mol⁻¹
          </p>
          <p>
            For the reaction{' '}
            <Katex tex="\tfrac{1}{3}\mathrm{N_2(g)} + \mathrm{H_2(g)} \rightleftharpoons \tfrac{2}{3}\mathrm{NH_3(g)}" />,
            the magnitude of <i>K</i><sub>c</sub> at 25 °C is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>9 and Δ<i>H</i> = −30.8 kJ mol⁻¹</>, isAnswer: true },
        { letter: 'B', content: <>213 and Δ<i>H</i> = −30.8 kJ mol⁻¹</> },
        { letter: 'C', content: <>640 and Δ<i>H</i> = −30.8 kJ mol⁻¹</> },
        { letter: 'D', content: <>640 and Δ<i>H</i> = −92.3 kJ mol⁻¹</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
