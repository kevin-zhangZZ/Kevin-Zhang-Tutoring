// 2025 Chemistry Exam, MCQ 16. VCAA examination report: 67% correct. Choosing the
// concentration–time graph for a temperature increase on the exothermic equilibrium
// 2NO(g) + O₂(g) ⇌ 2NO₂(g). Question text transcribed from the original paper; the four
// concentration–time graphs (options) are cropped from the original VCAA exam PDF. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2025-mcq16-optA.png'
import optBSrc from './chem-2025-mcq16-optB.png'
import optCSrc from './chem-2025-mcq16-optC.png'
import optDSrc from './chem-2025-mcq16-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2025 VCAA exam paper`} className="w-full max-w-[300px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 16, C: 67, D: 8 },
  answer: 'C',
  comment: (
    <>
      ΔH is negative, therefore the forward reaction is exothermic.
      <br />
      A temperature increase will cause the equation to shift in the endothermic direction (reverse
      reaction is favoured).
      <br />
      Therefore [NO] ↑, [O₂] ↑ and [NO₂] ↓ with no instantaneous changes.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Δ<i>H</i> &lt; 0, so the <b>forward</b> reaction is <b>exothermic</b> and the <b>reverse</b> reaction is <b>endothermic</b>.</>,
    reason: <>The sign of Δ<i>H</i> always refers to the forward reaction as written; the reverse reaction has the same size Δ<i>H</i> with the opposite sign.</>,
  },
  {
    working: <>Temperature increased → the equilibrium shifts in the <b>endothermic</b> direction → the <b>reverse</b> reaction is favoured: <Chem eq="2NO2(g) -> 2NO(g) + O2(g)" />.</>,
    reason: <>Le Chatelier&rsquo;s principle: the system partially opposes the change by absorbing some of the added heat, and the endothermic reaction is the one that absorbs heat. (Equivalently, <i>K</i> for an exothermic reaction gets smaller as temperature rises, so the mixture must move towards the reactants.)</>,
  },
  {
    working: <>So, gradually after <i>t</i> = 10 min: [NO₂] <b>decreases</b>; [NO] and [O₂] <b>increase</b>.</>,
    reason: <>NO₂ is used up by the reverse reaction while NO and O₂ are made by it.</>,
  },
  {
    working: <>No vertical jump in any concentration at <i>t</i> = 10 min.</>,
    reason: <>Changing the temperature does not add or remove any substance or change the volume, so at the instant of the change every concentration is still what it was. Concentrations only change <b>gradually</b>, as the reaction shifts. A vertical step appears only when a substance is added or removed, or the volume is changed.</>,
  },
  {
    working: <>Size check: Δ[NO] = −Δ[NO₂] = 2 × Δ[O₂]</>,
    reason: <>From the mole ratio <Chem eq="2NO2 : 2NO : O2" /> = 2 : 2 : 1, so [NO] rises by the same amount [NO₂] falls, and [O₂] rises by half that. Graph C is drawn this way: the [NO] curve rises about as much as the [NO₂] curve falls, and the [O₂] curve rises less.</>,
  },
  {
    working: <b>Graph C: [NO₂] falls gradually; [NO] and [O₂] rise gradually; no instantaneous changes.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> (16%) shows the forward (exothermic) reaction being favoured — what would happen if the temperature were <i>decreased</i>. Option <b>A</b> starts with a sudden jump in [NO₂], which is what <i>adding</i> NO₂ looks like, not a temperature change. Option <b>D</b> has instantaneous jumps in [NO] and [O₂] at <i>t</i> = 10 min, which a temperature change cannot cause.</>,
  },
]

export default function ChemistryQ16_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The system below is at equilibrium.</p>
          <p className="mb-2 pl-6">
            <Chem eq="2NO(g) + O2(g) <=> 2NO2(g)" />
            <span className="ml-8">Δ<i>H</i> &lt; 0</span>
          </p>
          <p className="mb-2">At time <i>t</i> = 10 minutes, the temperature is increased.</p>
          <p>Which one of the following concentration–time graphs represents the change in concentrations?</p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'Concentration–time graph: at 10 minutes [NO₂] jumps up suddenly then falls back partway, while [O₂] and [NO] rise gradually') },
        { letter: 'B', content: opt(optBSrc, 'Concentration–time graph: from 10 minutes [NO₂] rises gradually while [O₂] and [NO] fall gradually') },
        { letter: 'C', content: opt(optCSrc, 'Concentration–time graph: from 10 minutes [NO₂] falls gradually while [O₂] and [NO] rise gradually, with no sudden jumps'), isAnswer: true },
        { letter: 'D', content: opt(optDSrc, 'Concentration–time graph: at 10 minutes [NO₂] rises steeply then levels off, while [O₂] and [NO] jump up suddenly then fall back partway') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
