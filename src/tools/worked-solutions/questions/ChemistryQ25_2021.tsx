// 2021 Chemistry Exam, MCQ 25. VCAA examination report: 34% correct. Deducing what change was made to an equilibrium system from a rate–time graph showing
// an instantaneous jump in the reverse rate but no instantaneous change in the forward rate.
// Question text transcribed from the original paper; the graph is cropped directly from the
// original VCAA exam PDF, not a redrawing, and the report's copy from the report PDF. The
// report calls the graph "concentration-time" — kept verbatim and explained in the working.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import rateGraphSrc from './chem-2021-mcq25-rate-graph.png'
import reportGraphSrc from './chem-2021-mcq25-report-graph.png'

const RATE_GRAPH = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <img src={rateGraphSrc} alt="Graph of the rate of the forward and reverse reactions versus time: both constant before t1, then the reverse rate jumps instantly upward at t1 and decays back down while the forward rate rises smoothly, both meeting at a new steady rate by t2, from the original 2021 VCAA exam paper" className="w-full max-w-[420px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 29, C: 34, D: 25 },
  answer: 'C',
  comment: (
    <>
      <img src={reportGraphSrc} alt="The report's copy of the rate–time graph: the reverse rate jumps up at t1 and falls, the forward rate rises, and both meet at a new steady rate before t2" className="w-full max-w-[380px] mt-1" />
      Consider the concentration-time graphs.
      <br />
      The only change that could cause an instantaneous increase to the rate of the reverse
      reaction at <i>t</i>₁ with no instantaneous effect of the rate of the forward reaction would
      be the addition of product(s). The rate of the reverse reaction slowly decreases and the rate
      of the forward reaction slowly increases as the system partially responds to the imposed
      change and returns to equilibrium, where the amount of products present will be higher than
      prior to the change.
      <br />
      Option B is incorrect, since removal of reactants at <i>t</i>₁ would have caused an
      instantaneous decrease in the rate of the forward reaction, and while the rate of the reverse
      reaction is greater than the rate of the forward reaction, its rate is not increased.
      <br />
      Option D is incorrect, because the only change that could cause the value of the equilibrium
      constant to increase would be a temperature increase, since the forward reaction is
      endothermic. However, a temperature increase at <i>t</i>₁ would cause the rates of both the
      forward and reverse reactions to increase.
      <br />
      Option A is incorrect, since argon is an unreactive gas and will not have any impact on the
      equilibrium.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="A(g) + 2B(g) <=> C(g) + D(g)" className="mr-2" />,
    reason: <>Δ<i>H</i> &gt; 0: the forward reaction is endothermic.</>,
  },
  {
    working: <>Read the graph: at <i>t</i>₁ the <b>reverse</b> rate (dashed) jumps up instantly, while the <b>forward</b> rate (solid) does not jump — it only rises gradually afterwards. The two meet at a new, higher common rate before <i>t</i>₂.</>,
    reason: <>The reverse rate is the only one that changes at the instant of the change. (The report&rsquo;s comment calls these &ldquo;concentration-time graphs&rdquo;; the graph plots rate against time.)</>,
  },
  {
    working: <>Only concentrations that appear in the reverse rate expression (i.e. the <b>products</b>, C and D) can jump the reverse rate instantly while leaving the forward rate — which depends only on reactant concentrations — completely untouched at that instant.</>,
    reason: <>This points to a sudden <b>addition of product(s)</b> at <Chem eq="t1" />.</>,
  },
  {
    working: <>A: adding an inert gas like argon changes neither concentration, so neither rate would move at all.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>B: removing reactants would cause an <i>instant decrease</i> in the forward rate (which depends on reactant concentrations) — contradicts the graph showing no instantaneous change to the forward rate.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>D: the equilibrium constant only changes with <b>temperature</b> — but a temperature change would instantly affect <i>both</i> rates (every reaction speeds up or slows down together), not just the reverse one.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>Since product was added at t₁, the system responds by partially consuming the excess (reverse rate exceeds forward for a while), but settles at a <b>new equilibrium with more product overall</b> than existed just before t₁.</>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> would make the forward rate drop instantly; option <b>D</b> needs a temperature rise, which would make both rates jump (both as the report says).</>,
  },
]

export default function ChemistryQ25_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An equilibrium mixture of four gases is represented by the following equation.
          </p>
          <p className="mb-2">
            <Chem eq="A(g) + 2B(g) <=> C(g) + D(g)" /> &nbsp;&nbsp;&nbsp; Δ<i>H</i> &gt; 0
          </p>
          <p className="mb-2">
            The graph below shows the rate of the forward and reverse reactions versus time.
            <br />
            A single change is made to the equilibrium mixture at time <i>t</i>₁ and equilibrium
            is re-established at time <i>t</i>₂.
          </p>
          <div className="mb-2">{RATE_GRAPH}</div>
          <p>Which one of the following is consistent with the information given above?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Argon is added to the equilibrium mixture at time t₁.' },
        { letter: 'B', content: 'At time t₁ reactants are removed from the equilibrium mixture.' },
        { letter: 'C', content: 'The amount of products is higher at time t₂ compared to just before time t₁.', isAnswer: true },
        { letter: 'D', content: 'The change made at time t₁ results in an increase in the equilibrium constant at time t₂.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
