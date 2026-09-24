// 2025 Chemistry Exam, MCQ 8. VCAA examination report: 29% correct — the hardest MCQ on this
// paper. Comparing the potential difference of four different metal–air cells by combining each
// metal's standard reduction potential with the air electrode's potential in the given
// electrolyte. Question text transcribed from the original paper; the zinc–air cell diagram and
// the four cell diagrams (options) are cropped from the original VCAA exam PDF. The working uses
// the 2026 Data Book's E° values; where they differ from the report's (Mg²⁺/Mg, Al³⁺/Al), a note
// says so. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2025-mcq8-zinc-air-cell.png'
import optASrc from './chem-2025-mcq8-optA.png'
import optBSrc from './chem-2025-mcq8-optB.png'
import optCSrc from './chem-2025-mcq8-optC.png'
import optDSrc from './chem-2025-mcq8-optD.png'

const opt = (src: string, alt: string) => (
  <img src={src} alt={`${alt} — from the original 2025 VCAA exam paper`} className="w-full max-w-[230px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 7, C: 53, D: 11 },
  answer: 'A',
  comment: (
    <>
      Circuit A generates 3.60 V
      <br />
      Circuit B generates 2.06 V
      <br />
      Circuit C generates 3.10 V
      <br />
      Circuit D generates 1.99 V
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>In each cell the metal is <b>oxidised</b> at the metal electrode (anode) and O₂ is <b>reduced</b> at the air electrode (cathode), so the potential difference = <i>E</i>°(O₂ half-cell) − <i>E</i>°(metal half-cell).</>,
    reason: <>The O₂ half-equation depends on the electrolyte (Data Book): <Chem eq="O2(g) + 4H+(aq) + 4e- <=> 2H2O(l)" />, +1.23 V (acidic); <Chem eq="O2(g) + 2H2O(l) + 4e- <=> 4OH-(aq)" />, +0.40 V (alkaline).</>,
  },
  {
    working: <>A — Mg, acidic electrolyte: <i>E</i>°(Mg²⁺/Mg) = −2.36 V, so 1.23 − (−2.36) = <b>3.59 V</b>.</>,
    reason: <>A strong reducing agent paired with the higher-potential acidic air electrode.<DataBookNote>the 2026 Data Book gives −2.36 V for Mg²⁺/Mg; the Data Book used for the 2025 exam gave −2.37 V, which is why the report has 3.60 V.</DataBookNote></>,
  },
  {
    working: <>B — Al, alkaline electrolyte: <i>E</i>°(Al³⁺/Al) = −1.68 V, so 0.40 − (−1.68) = <b>2.08 V</b>.</>,
    reason: <>A weaker reducing agent than Mg, with the lower-potential alkaline air electrode.<DataBookNote>the 2026 Data Book gives −1.68 V for Al³⁺/Al; the Data Book used for the 2025 exam gave −1.66 V, which is why the report has 2.06 V.</DataBookNote></>,
  },
  {
    working: <>C — Na, alkaline electrolyte: <i>E</i>°(Na⁺/Na) = −2.71 V, so 0.40 − (−2.71) = <b>3.11 V</b> (the report gives 3.10 V).</>,
    reason: <>Na is the strongest reducing agent of the four, but the alkaline air electrode is 0.83 V lower than the acidic one.</>,
  },
  {
    working: <>D — Zn, acidic electrolyte: <i>E</i>°(Zn²⁺/Zn) = −0.76 V, so 1.23 − (−0.76) = <b>1.99 V</b>.</>,
    reason: <>The weakest reducing agent of the four gives the smallest potential difference.</>,
  },
  {
    working: <b>Cell A, 3.59 V, has the highest potential difference.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, chosen by 53%, has the strongest reducing agent, Na, but the alkaline air electrode costs it 0.83 V. (With the report&rsquo;s older values the order is the same — 3.60 &gt; 3.10 &gt; 2.06 &gt; 1.99 V — so the answer doesn&rsquo;t depend on which Data Book is used.)</>,
  },
]

export default function ChemistryQ8_2025() {
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
            <img
              src={cellSrc}
              alt="A curved, flexible zinc–air cell in layers: a porous positive current collector (+), the air electrode, a solid-state electrolyte, the zinc electrode and a negative current collector (−) — from the original 2025 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which one of the following cells being investigated for use in flexible applications
            has the highest potential difference?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'A cell of a Mg electrode, an acidic electrolyte and an air electrode, connected to a load'), isAnswer: true },
        { letter: 'B', content: opt(optBSrc, 'A cell of an Al electrode, an alkaline electrolyte and an air electrode, connected to a load') },
        { letter: 'C', content: opt(optCSrc, 'A cell of a Na electrode, an alkaline electrolyte and an air electrode, connected to a load') },
        { letter: 'D', content: opt(optDSrc, 'A cell of a Zn electrode, an acidic electrolyte and an air electrode, connected to a load') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
