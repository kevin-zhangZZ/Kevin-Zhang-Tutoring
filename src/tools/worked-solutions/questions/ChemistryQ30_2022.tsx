// 2022 Chemistry Exam, MCQ 30. VCAA examination report: 34% correct. Ranking four unfamiliar
// half-cells by oxidising strength using only given reactivity clues, then picking the pairing
// that produces the largest cell voltage. Question text transcribed from the original paper;
// the four cell diagrams (options) are cropped from the original VCAA exam PDF. Solution is
// original. The report's last line has a missing bracket ("Cr³⁺aq)"), kept verbatim.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2022-mcq30-optA.png'
import optBSrc from './chem-2022-mcq30-optB.png'
import optCSrc from './chem-2022-mcq30-optC.png'
import optDSrc from './chem-2022-mcq30-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2022 VCAA exam paper`} className="w-full max-w-[260px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 24, C: 23, D: 18 },
  answer: 'A',
  comment: (
    <>
      Based on the information supplied in terms of the standard electrode potentials, I₂, a
      reducing agent, is below the oxidising agents BrO₃⁻ and HBrO but above HCrO₄⁻, while Br⁻, a
      reducing agent, is below the oxidising agent HBrO but above IO₃⁻.
      <br />
      So the correct standard electrode potential order is
      <br />
      <Chem eq="HBrO(aq) + H+(aq) + e- <=> 1/2 Br2(aq) + H2O(l)" />
      <br />
      <Chem eq="BrO3-(aq) + 6H+(aq) + 6e- <=> Br-(aq) + 3H2O(l)" />
      <br />
      <Chem eq="2IO3-(aq) + 12H+(aq) + 10e- <=> I2(aq) + 6H2O(l)" />
      <br />
      <Chem eq="HCrO4-(aq) + 7H+(aq) + 3e- <=> Cr3+(aq) + 4H2O(l)" />
      <br />
      The cell producing the highest potential difference will be the cell containing the
      strongest oxidising agent, HBrO(aq), and the strongest reducing agent, Cr³⁺(aq).
      <br />
      i.e., the half-cells HBrO(aq)/Br₂(aq) and HCrO₄⁻(aq)/Cr³⁺aq).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A species reacts only if the oxidising agent is <b>higher</b> in the electrochemical series than the reducing agent it reacts with.</>,
    reason: <>The ranking is built from this rule. Each half-equation is written as a reduction, so the oxidising agent is on the left (e.g. <Chem eq="BrO3-" />) and its conjugate reducing agent on the right (e.g. <Chem eq="Br-" />). A reaction happens when an oxidising agent on the left meets a reducing agent on the right of a half-equation that sits <b>lower</b> in the series.</>,
  },
  {
    working: <>I₂ reacts with BrO₃⁻ and HBrO → BrO₃⁻/Br⁻ and HBrO/Br₂ are <b>above</b> IO₃⁻/I₂.<br />I₂ does not react with HCrO₄⁻ → HCrO₄⁻/Cr³⁺ is <b>below</b> IO₃⁻/I₂.</>,
    reason: <>I₂ is the reducing agent of the <Chem eq="IO3-/I2" /> half-equation (it is oxidised to <Chem eq="IO3-" />). It is oxidised by <Chem eq="BrO3-" /> and <Chem eq="HBrO" />, so they are stronger oxidising agents than <Chem eq="IO3-" />; <Chem eq="HCrO4-" /> can&rsquo;t oxidise it, so it is a weaker oxidising agent than <Chem eq="IO3-" />.</>,
  },
  {
    working: <>Br⁻ reacts with HBrO → HBrO/Br₂ is <b>above</b> BrO₃⁻/Br⁻.<br />Br⁻ does not react with IO₃⁻ → IO₃⁻/I₂ is <b>below</b> BrO₃⁻/Br⁻.</>,
    reason: <>Br⁻ is the reducing agent of the <Chem eq="BrO3-/Br-" /> half-equation. <Chem eq="HBrO" /> oxidises it, so <Chem eq="HBrO" /> is the stronger oxidising agent; <Chem eq="IO3-" /> can&rsquo;t, so <Chem eq="IO3-" /> is the weaker one. This fixes the order of the top two half-cells, which the first clue left open.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Chem eq="HBrO(aq) + H+(aq) + e- <=> 1/2 Br2(aq) + H2O(l)" /> — highest (strongest oxidising agent, HBrO)</span>
        <span><Chem eq="BrO3-(aq) + 6H+(aq) + 6e- <=> Br-(aq) + 3H2O(l)" /></span>
        <span><Chem eq="2IO3-(aq) + 12H+(aq) + 10e- <=> I2(aq) + 6H2O(l)" /></span>
        <span><Chem eq="HCrO4-(aq) + 7H+(aq) + 3e- <=> Cr3+(aq) + 4H2O(l)" /> — lowest (strongest reducing agent, Cr³⁺)</span>
      </div>
    ),
    reason: <>Combining both clues gives the full electrochemical-series order, highest <i>E</i>° at the top. The strongest reducing agent is the one on the right of the <b>lowest</b> half-equation.</>,
  },
  {
    working: <>Largest potential difference = top half-cell paired with bottom half-cell: HBrO(aq)/Br₂(aq) with HCrO₄⁻(aq)/Cr³⁺(aq).</>,
    reason: <>Cell potential difference = <i>E</i>°(cathode) − <i>E</i>°(anode), so it is largest when the two half-cells are furthest apart in the series — the strongest oxidising agent reacting with the strongest reducing agent.</>,
  },
  {
    working: <b>The HBrO(aq)/Br₂(aq) | HCrO₄⁻(aq)/Cr³⁺(aq) cell produces the highest potential difference.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b> (24%) has the bottom half-cell but pairs it with BrO₃⁻/Br⁻, the second-highest, so it misses that HBrO is a stronger oxidising agent than BrO₃⁻ (the second clue). Option <b>D</b> has the top half-cell but IO₃⁻/I₂, which is above HCrO₄⁻/Cr³⁺. Option <b>C</b> pairs the two middle half-cells, so it has neither the strongest oxidising agent nor the strongest reducing agent.</>,
  },
]

export default function ChemistryQ30_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the following half-equations, which are not in standard electrode potential
            order.
          </p>
          <div className="flex flex-col gap-1 mb-2 pl-4">
            <Chem eq="HCrO4-(aq) + 7H+(aq) + 3e- <=> Cr3+(aq) + 4H2O(l)" className="text-[13px]" />
            <Chem eq="HBrO(aq) + H+(aq) + e- <=> 1/2 Br2(aq) + H2O(l)" className="text-[13px]" />
            <Chem eq="2IO3-(aq) + 12H+(aq) + 10e- <=> I2(aq) + 6H2O(l)" className="text-[13px]" />
            <Chem eq="BrO3-(aq) + 6H+(aq) + 6e- <=> Br-(aq) + 3H2O(l)" className="text-[13px]" />
          </div>
          <p className="mb-1">The following is also known:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>I₂ reacts with BrO₃⁻ and HBrO but not with HCrO₄⁻.</li>
            <li>Br⁻ reacts with HBrO but not with IO₃⁻.</li>
          </ul>
          <p className="mb-2">Platinum electrodes were used in each half-cell.</p>
          <p>Which one of the following galvanic cells will produce the highest potential difference?</p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'Galvanic cell: a HBrO(aq)/Br₂(aq) half-cell and a HCrO₄⁻(aq)/Cr³⁺(aq) half-cell, joined by a salt bridge and a voltmeter'), isAnswer: true },
        { letter: 'B', content: opt(optBSrc, 'Galvanic cell: a HCrO₄⁻(aq)/Cr³⁺(aq) half-cell and a BrO₃⁻(aq)/Br⁻(aq) half-cell, joined by a salt bridge and a voltmeter') },
        { letter: 'C', content: opt(optCSrc, 'Galvanic cell: a BrO₃⁻(aq)/Br⁻(aq) half-cell and a IO₃⁻(aq)/I₂(aq) half-cell, joined by a salt bridge and a voltmeter') },
        { letter: 'D', content: opt(optDSrc, 'Galvanic cell: a HBrO(aq)/Br₂(aq) half-cell and a IO₃⁻(aq)/I₂(aq) half-cell, joined by a salt bridge and a voltmeter') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
