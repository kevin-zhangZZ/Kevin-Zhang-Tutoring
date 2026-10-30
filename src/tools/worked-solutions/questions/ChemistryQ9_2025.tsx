// 2025 Chemistry Exam, MCQ 9. VCAA examination report: 57% correct. Using the electrochemical
// series to decide which metal (Al, Mg, Na, Zn) is least likely to react with water in a
// metal–air cell. Question text transcribed from the original paper; the zinc–air cell diagram
// (shared stem for Questions 7–9) is cropped from the original VCAA exam PDF (the same crop as
// MCQ 8). E° values are from the 2026 Data Book; its revised Al and Mg values (a DataBookNote
// says so) do not change the answer. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2025-mcq8-zinc-air-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 8, C: 23, D: 57 },
  answer: 'D',
  comment: (
    <>
      Zn(s) does not normally react with water, whereas all three of the other metals have the
      potential to spontaneously react with water.
      <br />
      <Chem eq="Zn2+(aq) + 2e- <=> Zn(s)" />&nbsp;&nbsp;&nbsp;&nbsp;<i>E</i>° = −0.76 V
      <br />
      <Chem eq="2H2O(l) + 2e- <=> H2(g) + 2OH-(aq)" />&nbsp;&nbsp;<i>E</i>° = −0.83 V
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Water as an oxidising agent: <Chem eq="2H2O(l) + 2e- <=> H2(g) + 2OH-(aq)" />&nbsp;&nbsp;<i>E</i>° = −0.83 V</>,
    reason: <>The &ldquo;unwanted side reaction&rdquo; is the metal electrode being oxidised by water instead of by O₂, producing H₂ gas. Find water acting as an <b>oxidising agent</b> in the electrochemical series (Data Book).</>,
  },
  {
    working: (
      <>
        <Chem eq="Zn2+(aq) + 2e- <=> Zn(s)" />&nbsp;&nbsp;−0.76 V
        <br />
        <Chem eq="Al3+(aq) + 3e- <=> Al(s)" />&nbsp;&nbsp;−1.68 V
        <br />
        <Chem eq="Mg2+(aq) + 2e- <=> Mg(s)" />&nbsp;&nbsp;−2.36 V
        <br />
        <Chem eq="Na+(aq) + e- <=> Na(s)" />&nbsp;&nbsp;−2.71 V
      </>
    ),
    reason: (
      <>
        E° values from the electrochemical series. Each metal is a <b>reducing agent</b> (on the
        right of its half-equation); the lower its E°, the stronger a reducing agent it is.
        <DataBookNote>
          the 2026 Data Book gives −1.68 V for Al³⁺/Al and −2.36 V for Mg²⁺/Mg; the Data Book used
          for the 2025 exam gave −1.66 V and −2.37 V. Zn²⁺/Zn (−0.76 V) and water (−0.83 V) are
          unchanged, so the answer is the same.
        </DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        Na: <i>E</i>°<sub>cell</sub> = <i>E</i>°(oxidant) − <i>E</i>°(reductant)
        <br />
        = −0.83 V − (−2.71 V)
        <br />
        = +1.88 V &gt; 0 → spontaneous
      </>
    ),
    reason: <>A reaction is predicted to be spontaneous when the oxidising agent&rsquo;s half-equation sits <b>higher</b> in the series than the reducing agent&rsquo;s (a positive <i>E</i>°<sub>cell</sub>). Water (−0.83 V) is above Na, Mg and Al, so all three are predicted to react: e.g. <Chem eq="2Na(s) + 2H2O(l) -> 2Na+(aq) + H2(g) + 2OH-(aq)" />. Likewise Mg (+1.53 V) and Al (+0.85 V).</>,
  },
  {
    working: (
      <>
        Zn: <i>E</i>°<sub>cell</sub> = −0.83 V − (−0.76 V)
        <br />
        = −0.07 V &lt; 0 → not spontaneous
      </>
    ),
    reason: <>Zn²⁺/Zn (−0.76 V) is <b>above</b> water (−0.83 V), so water is too weak an oxidising agent to oxidise zinc under standard conditions — zinc is the only one of the four metals not predicted to react with water.</>,
  },
  {
    working: <b>Unwanted reactions with moisture are least likely in Zn–air cells.</b>,
    reason: (
      <>
        Matches option <b>D</b>. Note the bold <b>less</b> in the question. Option <b>C</b> (23%),
        Na, is the strongest reducing agent of the four (lowest E°), so Na–air cells are the{' '}
        <i>most</i> likely to react with water — the answer to the opposite question. Options{' '}
        <b>A</b> (Al) and <b>B</b> (Mg) are also below water in the series, so both are predicted
        to react.
      </>
    ),
  },
]

export default function ChemistryQ9_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 7–9.</p>
          <div className="mb-1 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-[13.5px]">
            <p className="mb-2 text-[12.5px] text-gray-500 dark:text-gray-400">
              [Image — due to copyright restrictions, this material is not supplied.]
            </p>
            <p className="mb-2">
              The rapid popularization of wearable electronics, soft robots and implanted medical
              devices has stimulated extensive research in flexible batteries, which are bendable,
              foldable, knittable, wearable, and/or stretchable …
            </p>
            <p>
              Different from the conventional batteries that utilize rigid and bulky electrodes,
              current collectors, metal anodes, liquid electrolytes, and packages, flexible
              batteries require the flexibility of each component to accommodate diverse shapes or
              sizes.
            </p>
          </div>
          <p className="mb-3 text-right text-[11.5px] text-gray-500 dark:text-gray-400">
            Sources: Xiao Zhu et al., &lsquo;Recent progress of flexible rechargeable batteries&rsquo;,{' '}
            <i>Science Bulletin</i>, vol. 69, issue 23, 2024 (extract); tradeKorea,
            &lt;www.tradekorea.com/main.do&gt; (image)
          </p>
          <p className="mb-2">
            Metal–air batteries are considered a suitable option for flexible batteries. Oxygen,
            O₂, in the air reacts with a metal electrode in all cells. Sodium, Na, magnesium, Mg,
            aluminium, Al, and zinc, Zn, are being investigated using polymer and gel electrolytes.
          </p>
          <p className="mb-2">A diagram of one of the cells in a flexible zinc–air battery is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="A curved, flexible zinc–air cell in layers: a porous positive current collector (+), the air electrode, a solid-state electrolyte, the zinc electrode and a negative current collector (−) — from the original 2025 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p className="mb-2">Unwanted side reactions may occur in metal–air cells when moisture is present.</p>
          <p>
            This is <b>less</b> likely in
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Al–air cells.' },
        { letter: 'B', content: 'Mg–air cells.' },
        { letter: 'C', content: 'Na–air cells.' },
        { letter: 'D', content: 'Zn–air cells.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
