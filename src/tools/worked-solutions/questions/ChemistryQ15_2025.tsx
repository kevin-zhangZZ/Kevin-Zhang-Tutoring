// 2025 Chemistry Exam, MCQ 15. VCAA examination report: 56% correct. Manipulating an
// equilibrium constant: reversing an equation inverts Kc, and doubling the coefficients
// squares it. Question text transcribed from the original paper (no diagram). Answer and
// comment from the VCAA report only. Solution is original.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 21, C: 10, D: 56 },
  answer: 'D',
  comment: (
    <>
      <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />{'      '}K = 0.286 M⁻²
      <br />
      <Chem eq="2NH3(g) <=> N2(g) + 3H2(g)" />{'      '}K = 1 / 0.286 M²
      <br />
      <Chem eq="4NH3(g) <=> 2N2(g) + 6H2(g)" />{'     '}K = (1 / 0.286 M²)² = 12.2 M⁴
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex tex="K_1 = \dfrac{[\mathrm{NH_3}]^2}{[\mathrm{N_2}][\mathrm{H_2}]^3} = 2.86 \times 10^{-1}\ \mathrm{M^{-2}}" />,
    reason: <>Write the equilibrium expression for the reaction you are given: products over reactants, each concentration raised to its coefficient.</>,
  },
  {
    working: <Katex tex="K_2 = \dfrac{[\mathrm{N_2}]^2[\mathrm{H_2}]^6}{[\mathrm{NH_3}]^4}" />,
    reason: <>The second reaction is the first one <b>reversed</b> (NH₃ is now the reactant) <b>and doubled</b> (every coefficient × 2).</>,
  },
  {
    working: <Katex tex="K_2 = \left(\dfrac{[\mathrm{N_2}][\mathrm{H_2}]^3}{[\mathrm{NH_3}]^2}\right)^{2} = \left(\dfrac{1}{K_1}\right)^{2}" />,
    reason: <>The rules: <b>reversing</b> an equation turns <i>K</i> into 1/<i>K</i>; <b>multiplying</b> all the coefficients by <i>n</i> raises <i>K</i> to the power <i>n</i> (here <i>n</i> = 2, so square it — not double it).</>,
  },
  {
    working: <Katex tex="K_2 = \left(\dfrac{1}{2.86 \times 10^{-1}\ \mathrm{M^{-2}}}\right)^{2} = (3.4965\ \mathrm{M^{2}})^2" />,
    reason: <>Reverse first: 1/0.286 = 3.4965 M², then square, keeping the unrounded value.</>,
  },
  {
    working: <Katex tex="\boxed{K_2 = 12.2\ \mathrm{M^{4}} = 1.22 \times 10^{1}\ \mathrm{M^{4}}}" />,
    reason: <>
      Matches option <b>D</b> (12.23 M⁴, to 3 significant figures like <i>K</i>₁). Units check:
      M²·M⁶/M⁴ = M⁴. Sanity check: <i>K</i>₁ &lt; 1, so its reverse is &gt; 1 and squaring makes
      it larger still. Distractors: <b>B</b> (5.72 × 10⁻¹), chosen by 21%, doubles <i>K</i>₁
      (2 × 0.286) — multiplying by 2 instead of squaring, and without reversing. <b>A</b>{' '}
      (8.18 × 10⁻²) squares <i>K</i>₁ but forgets to invert it for the reverse reaction (0.286² =
      0.0818). <b>C</b> (1.75) inverts but then doubles instead of squaring: 1/(2 × 0.286) = 1.75.
    </>,
  },
]

export default function ChemistryQ15_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following two reactions that are at equilibrium at 500 °C.</p>
          <div className="mb-3 pl-6 grid grid-cols-[auto_auto] gap-x-8 gap-y-1 w-fit">
            <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />
            <span><i>K</i><sub>c</sub> = 2.86 × 10<sup>−1</sup> M<sup>−2</sup></span>
            <Chem eq="4NH3(g) <=> 2N2(g) + 6H2(g)" />
            <span />
          </div>
          <p>The magnitude of the value of <i>K</i><sub>c</sub> for the second reaction is</p>
        </>
      }
      options={[
        { letter: 'A', content: <>8.18 × 10<sup>−2</sup></> },
        { letter: 'B', content: <>5.72 × 10<sup>−1</sup></> },
        { letter: 'C', content: <>1.75 × 10<sup>0</sup></> },
        { letter: 'D', content: <>1.22 × 10<sup>1</sup></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
