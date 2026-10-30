// 2023 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct — the hardest MCQ on this
// paper. Which single factor always increases the equilibrium yield of a reaction at constant
// temperature, by elimination against genuine equilibrium principles. Question text transcribed
// from the original paper (no figures). Source: VCAA report only. Solution is original.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 47, C: 18, D: 8 },
  answer: 'A',
  comment: (
    <>
      A. A higher value for the equilibrium expression suggests a higher proportion of products /
      increased product concentration compared to reactants, and hence a higher yield.
      <br />
      B. An increase in reactant concentration will increase the yield in any equilibrium where the
      concentration fraction (reaction quotient) increases, as a result of a change that favours
      the forward reaction. The system moves to compensate for the change by favouring the forward
      reaction.
      <br />
      However, if the concentration increase occurs by decreasing the volume of an equilibrium
      mixture in which there are the same number of mol of particles on both sides, as in the
      equilibrium
      <br />
      <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />,
      <br />
      the value of the concentration fraction (reaction quotient) [HCl]²/[H₂][Cl₂] does not change
      and there is no change in the yield.
      <br />
      C. A decrease in activation energy increases the reaction rate and allows the system to get
      to equilibrium faster but has no effect on the equilibrium yield.
      <br />
      D. A pressure increase will cause the reaction to favour the side of the equilibrium with the
      lower number of mol of particles. However, it has no impact on the yield of an equilibrium
      system with the same number of particles on both sides, as in
      <br />
      <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question asks what <b>always</b> corresponds to a higher yield. An option fails if there is even one equilibrium where it does not raise the yield.</>,
    reason: <>The word &ldquo;always&rdquo; is the trap: three of the four options are true only for some reactions.</>,
  },
  {
    working: (
      <>
        A: the equilibrium expression is the concentration fraction, [products]/[reactants], each concentration raised to the power of its coefficient, e.g. for <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />:
        <br />
        <Katex tex="\dfrac{[\mathrm{HCl}]^2}{[\mathrm{H_2}][\mathrm{Cl_2}]}" />
        <br />
        A <b>higher value</b> means a larger proportion of products compared with reactants, which is a higher yield.
      </>
    ),
    reason: <>This is true for every reaction, because it is what the expression measures. (At constant temperature <i>K</i> itself cannot change, so read &ldquo;the value of the equilibrium expression&rdquo; as the concentration fraction of the mixture, as the report does.) <b>Always true.</b></>,
  },
  {
    working: (
      <>
        B: adding more of a reactant raises the denominator, so the concentration fraction drops below <i>K</i>; the system favours the forward reaction and the yield increases. But concentrations can also be increased by <b>compressing</b> the mixture. Halving the volume of <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" /> doubles every concentration:
        <br />
        <Katex tex="\dfrac{(2[\mathrm{HCl}])^2}{(2[\mathrm{H_2}])(2[\mathrm{Cl_2}])} = \dfrac{4[\mathrm{HCl}]^2}{4[\mathrm{H_2}][\mathrm{Cl_2}]} = \dfrac{[\mathrm{HCl}]^2}{[\mathrm{H_2}][\mathrm{Cl_2}]}" />
      </>
    ),
    reason: <>With 2 mol of gas on each side, the factors of 2 cancel: the concentration fraction still equals <i>K</i>, so the system does not shift and the yield is unchanged. One counter-example is enough: <b>not always true</b>.</>,
  },
  {
    working: <>C: a lower activation energy (e.g. from adding a catalyst) increases the <b>rate</b> of both the forward and the reverse reactions, so equilibrium is reached <b>faster</b>, but the position of equilibrium does not change.</>,
    reason: <>Rate and yield are different things: activation energy affects how fast, not how far. <b>Never changes the yield.</b></>,
  },
  {
    working: <>D: increasing the pressure (by reducing the volume) favours the side with <b>fewer mol of gas particles</b>. For <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />, both sides have 2 mol of gas, so there is no shift and no change in yield (the same calculation as in B). And if the pressure is increased by adding an inert gas at constant volume, no concentrations change at all. Worse, if the <b>reactant</b> side has fewer mol of gas, e.g. <Chem eq="N2O4(g) <=> 2NO2(g)" /> (1 mol of gas on the left, 2 on the right), compressing the mixture favours the reverse reaction and the yield <b>decreases</b>.</>,
    reason: <>A pressure increase raises the yield only when the <b>products</b> have fewer mol of gas than the reactants: <b>not always true</b>.</>,
  },
  {
    working: <b>Only an increase in the value of the equilibrium expression always means a higher yield.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, chosen by 47%, is true for adding a reactant, but fails for an equilibrium like <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" /> compressed to raise the concentrations (the report&rsquo;s example). Option <b>C</b> confuses rate with yield; option <b>D</b> fails when both sides have equal mol of gas, and lowers the yield when the reactants have fewer mol of gas.</>,
  },
]

export default function ChemistryQ10_2023() {
  return (
    <MCQShell
      question={
        <p>
          At constant temperature, which one of the following always corresponds to an increase
          of the yield of a chemical reaction?
        </p>
      }
      options={[
        { letter: 'A', content: 'An increase in the value of the equilibrium expression.', isAnswer: true },
        { letter: 'B', content: 'An increase in the concentration of the reactants.' },
        { letter: 'C', content: 'A decrease in the activation energy.' },
        { letter: 'D', content: 'An increase in the pressure.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
