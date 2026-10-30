// 2024 Chemistry Exam, MCQ 16. VCAA examination report: 49% correct. Reading a
// concentration–time graph after SCN⁻ is added to the Fe³⁺/SCN⁻/FeSCN²⁺ equilibrium: Q < K while
// the system is still adjusting, so the forward rate exceeds the reverse rate. Question text
// transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text); the concentration–time graph is cropped from the original VCAA exam PDF.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2024-mcq16-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 9, C: 49, D: 25 },
  answer: 'C',
  comment: (
    <>
      At <i>t</i>₃, the system is not at equilibrium and Q &lt; K (added reactant).
      <br />
      When Q &lt; K, the rate of the forward reaction needs to be faster than the rate of the
      reverse reaction in order for Q to increase and reach K.
      <br />
      K will not change as temperature has not changed.
      <br />
      The chemical energy of the system decreases for an exothermic process.
      <br />
      The concentration of iron(III) ions will have decreased as the system returns to
      equilibrium.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Read the graph: <i>t</i>₁ — at equilibrium (flat line); <i>t</i>₂ — NaSCN added, [SCN⁻] jumps up; <i>t</i>₃ — [SCN⁻] still falling, so the system is <b>not yet at equilibrium</b>; <i>t</i>₄ — line flattening out, a new equilibrium is reached.</>,
    reason: <>A flat line means the concentrations are no longer changing, which is what equilibrium looks like on a concentration–time graph. A curve that is still sloping means a net reaction is still happening.</>,
  },
  {
    working: (
      <>
        <i>K</i> = [<Chem eq="FeSCN2+" />] / ([<Chem eq="Fe3+" />][<Chem eq="SCN-" />])
        <br />
        Just after <i>t</i>₂: [<Chem eq="SCN-" />] ↑ so the denominator ↑, so <i>Q</i> &lt; <i>K</i>
      </>
    ),
    reason: <>Adding a reactant makes the reaction quotient <i>Q</i> smaller than <i>K</i>. To restore <i>Q</i> = <i>K</i>, the system has a net <b>forward</b> reaction: SCN⁻ and Fe³⁺ are used up and FeSCN²⁺ is made. That is why [SCN⁻] falls from its peak between <i>t</i>₂ and <i>t</i>₄ (Le Chatelier&rsquo;s principle: the system partially opposes the added SCN⁻).</>,
  },
  {
    working: <>C: at <i>t</i>₃, net forward reaction, so rate(forward) &gt; rate(reverse). <b>True.</b></>,
    reason: <>A net forward reaction can only happen if the forward reaction is going faster than the reverse. The two rates become equal again only at the new equilibrium (<i>t</i>₄).</>,
  },
  {
    working: <>A: temperature is constant, so <i>K</i> at <i>t</i>₄ = <i>K</i> at <i>t</i>₁. False.</>,
    reason: <>The question says &ldquo;at constant temperature&rdquo;. <i>K</i> depends only on temperature — changing a concentration changes <i>Q</i>, not <i>K</i>.</>,
  },
  {
    working: <>B: between <i>t</i>₃ and <i>t</i>₄ the net reaction is forward, and the forward reaction is exothermic (Δ<i>H</i> &lt; 0), so chemical energy is released as heat: the chemical energy of the system <b>decreases</b>. False.</>,
    reason: <>In an exothermic reaction the products have less chemical (potential) energy than the reactants; the difference is released to the surroundings. So more FeSCN²⁺ forming means the system&rsquo;s chemical energy goes down, not up.</>,
  },
  {
    working: <>D: from <i>t</i>₁ to <i>t</i>₃ the forward reaction has used up some Fe³⁺, so [<Chem eq="Fe3+" />] at <i>t</i>₃ is <b>lower</b> than at <i>t</i>₁ (while [<Chem eq="FeSCN2+" />] is higher). False.</>,
    reason: <>Only half of D is true. Fe³⁺ is a reactant just like SCN⁻, so the net forward reaction that removes SCN⁻ removes Fe³⁺ too. (&ldquo;A few drops&rdquo; of solution barely changes the 200 mL volume, so dilution doesn&rsquo;t affect this.)</>,
  },
  {
    working: <b>At <i>t</i>₃ the rate of the reverse reaction is less than the rate of the forward reaction.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by 25%, is right about FeSCN²⁺ but wrong about Fe³⁺, which is consumed by the forward reaction along with SCN⁻. Option <b>A</b> treats <i>K</i> as if it changes with concentration; only a temperature change alters <i>K</i>.</>,
  },
]

export default function ChemistryQ16_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The reaction between iron(III) ions, <Chem eq="Fe3+(aq)" />, and thiocyanate ions,{' '}
            <Chem eq="SCN-(aq)" />, produces iron(III) thiocyanate ions, <Chem eq="FeSCN2+(aq)" />.
          </p>
          <p className="mb-2 pl-6">
            <Chem eq="Fe3+(aq) + SCN-(aq) <=> FeSCN2+(aq)" />
            <span className="ml-10">Δ<i>H</i> &lt; 0</span>
          </p>
          <p className="mb-2">
            A few drops of sodium thiocyanate solution, <Chem eq="NaSCN(aq)" />, are added to 200 mL
            of the equilibrium mixture at constant temperature.
            <br />
            The concentration–time graph shows the change in concentration of <Chem eq="SCN-(aq)" />.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="Concentration–time graph of [SCN⁻] (M): constant at t₁, a sudden jump at t₂, then a curve falling through t₃ and levelling off by t₄ at a value above the original — from the original 2024 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>Which one of the following statements is true?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>The equilibrium constant at <i>t</i>₄ is lower than at <i>t</i>₁.</> },
        { letter: 'B', content: <>The chemical energy of the system increases between <i>t</i>₃ and <i>t</i>₄.</> },
        { letter: 'C', content: <>The rate of the reverse reaction is less than the rate of the forward reaction at <i>t</i>₃.</>, isAnswer: true },
        { letter: 'D', content: <>Both the concentrations of Fe³⁺ and FeSCN²⁺ are higher at <i>t</i>₃ than at <i>t</i>₁.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
