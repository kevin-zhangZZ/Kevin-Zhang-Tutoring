// 2025 Chemistry Exam, MCQ 8. VCAA examination report: 29% correct — the hardest MCQ on this
// paper. Comparing the potential difference of four different metal–air cells by combining each
// metal's standard reduction potential with the air electrode's potential in the given
// electrolyte. Question text transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 7, C: 53, D: 11 },
  answer: 'A',
  comment: (
    <>
      Circuit A generates 3.60 V, Circuit B generates 2.06 V, Circuit C generates 3.10 V, and
      Circuit D generates 1.99 V — found by combining the metal's standard reduction potential
      with the air electrode's potential in the relevant electrolyte (acidic or alkaline).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>In each cell, the metal electrode is <b>oxidised</b> (anode) and the air (O₂) electrode is <b>reduced</b> (cathode) — cell potential = <i>E</i>°(cathode) − <i>E</i>°(anode), using the metal's reduction potential as written for the anode.</>,
    reason: 'The O₂ half-reaction depends on whether the electrolyte is acidic or alkaline, from the Data Book: O₂ + 4H⁺ + 4e⁻ → 2H₂O, E° = +1.23 V (acidic); O₂ + 2H₂O + 4e⁻ → 4OH⁻, E° = +0.40 V (alkaline).',
  },
  {
    working: <>Circuit A — Mg electrode, acidic electrolyte: <i>E</i>°(Mg²⁺/Mg) = −2.36 V. Cell potential = 1.23 − (−2.36) = <b>3.60 V</b>.</>,
    reason: 'Magnesium is the most reactive metal here, and pairing it with the higher-potential acidic O₂ half-cell gives the largest gap.',
  },
  {
    working: <>Circuit B — Al electrode, alkaline electrolyte: <i>E</i>°(Al³⁺/Al) = −1.68 V. Cell potential = 0.40 − (−1.68) = <b>2.06 V</b> (≈2.08 V from Data Book values, rounding).</>,
    reason: 'Aluminium is reactive, but paired with the lower-potential alkaline O₂ half-cell.',
  },
  {
    working: <>Circuit C — Na electrode, alkaline electrolyte: <i>E</i>°(Na⁺/Na) = −2.71 V. Cell potential = 0.40 − (−2.71) = <b>3.10 V</b>.</>,
    reason: 'Sodium is even more reactive than magnesium, but it loses out to Circuit A by being paired with the lower-potential alkaline O₂ half-cell rather than acidic.',
  },
  {
    working: <>Circuit D — Zn electrode, acidic electrolyte: <i>E</i>°(Zn²⁺/Zn) = −0.76 V. Cell potential = 1.23 − (−0.76) = <b>1.99 V</b>.</>,
    reason: 'Zinc is the least reactive metal of the four, giving the smallest cell potential despite the favourable acidic electrolyte.',
  },
  {
    working: <b>3.60 V (Circuit A) is the largest of the four — the most reactive metal (Mg) combined with the higher-potential acidic air electrode.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ8_2025() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following cells being investigated for use in flexible applications
          has the highest potential difference? Each is a metal–air cell with a metal electrode,
          an air electrode, and the stated electrolyte, connected through a load.
        </p>
      }
      options={[
        { letter: 'A', content: 'Mg electrode, acidic electrolyte, air electrode.', isAnswer: true },
        { letter: 'B', content: 'Al electrode, alkaline electrolyte, air electrode.' },
        { letter: 'C', content: 'Na electrode, alkaline electrolyte, air electrode.' },
        { letter: 'D', content: 'Zn electrode, acidic electrolyte, air electrode.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
