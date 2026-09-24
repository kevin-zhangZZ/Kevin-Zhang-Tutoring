// 2021 Chemistry Exam, MCQ 27. VCAA examination report: 13% correct — the hardest MCQ on this
// paper. Reading a concentration–time graph in which every concentration doubles at once
// (a halved volume), then relating the rates of HI and H₂ production at equilibrium. Question
// text transcribed from the original paper; the graph is cropped from the original VCAA exam
// PDF, and the report's copy of it from the report PDF. The report's comment contains three
// slips (t₁ for t₂; "2 mole H₂ is formed" for HI; "consumption" for formation in the reverse
// reaction) — kept verbatim and explained in the working. Solution is original.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2021-mcq27-graph.png'
import reportGraphSrc from './chem-2021-mcq27-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 45, C: 29, D: 13 },
  answer: 'D',
  comment: (
    <>
      Concentration-time graphs show all concentrations increasing/doubling at time <i>t</i>₁.
      <img
        src={reportGraphSrc}
        alt="The report's copy of the concentration–time graph: the I₂, H₂ and HI concentrations all step up to double their values at t₂ and stay flat afterwards"
        className="w-full max-w-[360px] mt-1"
      />
      This could only be caused by the volume decreasing/halving. This increases the
      concentration of all species, but has no effect on the amounts of H₂, I₂ and HI present.
      <br />
      Because there are the same number of particles on both sides of the equation{' '}
      <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" /> the system is not pushed out of equilibrium
      as a result of concentration increase due to volume decrease.
      <br />
      When the volume decreases, the concentrations of all reactants and products are
      increased. The rates of the forward and reverse reactions increase and will be greater at{' '}
      <i>t</i>₃ than at <i>t</i>₁. However, the rates are always equal, since a change in
      concentration has no impact on the position of equilibrium.
      <br />
      For <Chem eq="1/2 H2(g) + I2(g) <=> HI(g)" />, irrespective of the equilibrium
      concentration:
      <br />
      In the forward reaction, the rate at which HI is produced is double the rate of
      consumption of H₂ or I₂ since 2 mole H₂ is formed for each mole of H₂ or I₂ consumed.
      <br />
      In the reverse reaction, the rate at which HI is consumed is double the rate of
      consumption of H₂ or I₂ since 2 mole HI is consumed for each mole of H₂ or I₂ formed.
      <br />
      At equilibrium, the rates of the forward and reverse reactions are the same, so,
      irrespective of the concentrations at equilibrium, the rate of production of HI is always
      double the rate of consumption or production of H₂.
      <br />
      The vast majority of students were unable to identify the correct alternative, suggesting
      limitations in linking concentration-time graphs of equilibria to rates and the
      significance of equal numbers of particles on both sides of an equilibrium.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>At <i>t</i>₂ every concentration jumps at the same instant and exactly doubles: I₂ from 8 to 16 tick marks, H₂ from 3 to 6, HI from 1 to 2. All three lines are flat again straight afterwards.</>,
    reason: <>Count the tick marks on the concentration axis — the graph is drawn to show the doubling precisely.</>,
  },
  {
    working: <>Only one change doubles <i>every</i> concentration at once: <b>halving the volume</b> of the container.</>,
    reason: <>Concentration is <i>c</i> = <i>n</i>/<i>V</i>, so halving <i>V</i> doubles every <i>c</i> while leaving every amount <i>n</i> unchanged. Adding one species would raise only that species; a catalyst changes no concentration at all.</>,
  },
  {
    working: <>Gas particles: ½ + ½ = 1 on the left, 1 on the right — equal, so the compression favours neither side.</>,
    reason: <>That is why the lines stay flat after <i>t</i>₂: the system is still at equilibrium, with no net shift. (Check: doubling every concentration multiplies <Katex tex="\dfrac{[\mathrm{HI}]}{[\mathrm{H_2}]^{1/2}[\mathrm{I_2}]^{1/2}}" /> by 2 ÷ (√2 × √2) = 1, so it still equals <i>K</i>.)</>,
  },
  {
    working: <><b>A</b> — false. A catalyst speeds up the forward and reverse reactions equally; it does not change any concentration, so it cannot produce the jump.</>,
    reason: <>A catalyst only shortens the time to reach equilibrium.</>,
  },
  {
    working: <><b>B</b> — false. <i>n</i> = <i>cV</i>: the concentration of HI doubled but the volume halved, so the <i>amount</i> of HI is the same at <i>t</i>₃ as at <i>t</i>₁.</>,
    reason: <>The trap 45% fell into: reading a higher concentration as more HI. The report makes exactly this point — the change has no effect on the amounts present.</>,
  },
  {
    working: <><b>C</b> — false. At <i>t</i>₃ every concentration is double its value at <i>t</i>₁, so particles collide more often and both the forward and reverse rates are greater at <i>t</i>₃.</>,
    reason: <>The rates are still equal to <i>each other</i> at both times (the system is at equilibrium), but both are faster after the compression.</>,
  },
  {
    working: <><b>D</b> — true. In the forward reaction HI forms twice as fast as H₂ is used up (coefficients 1 and ½). At equilibrium the reverse reaction forms H₂ exactly as fast as the forward reaction uses it, so HI is produced at double the rate H₂ is produced.</>,
    reason: <>This holds at any equilibrium, whatever the concentrations — which is the point the report makes. (The report&rsquo;s comment says the jump is at <i>t</i>₁ and writes &ldquo;2 mole H₂ is formed&rdquo; and, for the reverse reaction, &ldquo;consumption&rdquo; of H₂ or I₂; these are slips for <i>t</i>₂, HI and formation.)</>,
  },
  {
    working: <b>The rate of production of HI at t₃ is double the rate of production of H₂ at t₃.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> confuses concentration with amount; option <b>C</b> forgets that doubling the concentrations raises both rates; option <b>A</b> gives a catalyst an effect on concentration it doesn&rsquo;t have.</>,
  },
]

export default function ChemistryQ27_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 27 and 28.</p>
          <p className="mb-2">Hydrogen, H₂, and iodine, I₂, react to form hydrogen iodide, HI.</p>
          <p className="mb-2">
            <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" /> &nbsp;&nbsp;&nbsp; Δ<i>H</i> = +25.9 kJ mol⁻¹
          </p>
          <p className="mb-2">
            The graph below shows the concentrations of H₂, I₂ and HI in a sealed container. One
            change was made to the equilibrium system at time <i>t</i>₂.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={graphSrc}
              alt="Concentration (M) against time: the I₂, H₂ and HI concentrations are constant until t₂, where each steps up to double its value, then stay constant to t₄; times t₁ to t₅ are marked — from the original 2021 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <p>Which one of the following statements is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>A catalyst was added at time <i>t</i>₂.</> },
        { letter: 'B', content: <>The amount of HI is greater at time <i>t</i>₃ compared with time <i>t</i>₁.</> },
        { letter: 'C', content: <>The rate of reaction producing HI is the same at time <i>t</i>₁ and time <i>t</i>₃.</> },
        { letter: 'D', content: <>The rate of production of HI at time <i>t</i>₃ is double the rate of production of H₂ at time <i>t</i>₃.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
