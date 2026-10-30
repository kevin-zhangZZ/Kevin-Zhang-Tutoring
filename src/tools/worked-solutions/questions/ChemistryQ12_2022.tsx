// 2022 Chemistry Exam, MCQ 12. VCAA examination report: 42% correct. Why enzymes are commonly
// ineffective in acidic conditions: H⁺ protonates side groups, changing the charges that hold the
// active site's shape; the other options are eliminated against facts about protein chemistry.
// Question text transcribed from the original paper. VCAA report only (no second source).
// Solution is original. Working revised Oct 2026 (step-by-step charges; zwitterion note for the
// current study design).

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 42, B: 19, C: 12, D: 27 },
  answer: 'A',
  comment: (
    <>
      In acidic conditions, basic groups (such as NH₂) on side groups of the amino acids in enzymes
      are protonated and become positively charged.
      <br />
      Zwitterions require the formation of both a positive and a negative ion on the same molecule
      – this will not happen in acidic environments.
      <br />
      Acids do not esterify enzymes into smaller molecules.
      <br />
      Acids do not react with carboxyl groups.
      <br />
      There was a strong indication that the effect of pH on proteins was not well understood by
      the majority of students.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>An enzyme works only while its <b>active site</b> keeps its exact 3D shape. That shape (the tertiary structure) is held by interactions between amino acid side groups — including <b>ionic interactions</b> between charged groups such as –NH₃⁺ and –COO⁻, and hydrogen bonds.</>,
    reason: <>Start from what makes an enzyme work, then ask what H⁺ ions can do to it. Anything that changes the side groups&rsquo; charges changes which groups attract or repel each other.</>,
  },
  {
    working: <>In acid, excess H⁺ <b>protonates</b> side groups:<br />–NH₂ + H⁺ → –NH₃⁺ (becomes positive)<br />–COO⁻ + H⁺ → –COOH (loses its negative charge)</>,
    reason: <>Basic side groups (amine) gain a positive charge and ionised carboxyl side groups lose their negative charge. Either way the <b>charges on the enzyme change</b>.</>,
  },
  {
    working: <>The ionic interactions between side groups are disrupted, the tertiary structure changes (<b>denaturation</b>) and the active site loses its shape, so the substrate can no longer bind.</>,
    reason: <>This is option <b>A</b>: acids make enzymes ineffective because they change the charges on the enzyme.</>,
  },
  {
    working: <>B: a zwitterion carries a positive <i>and</i> a negative charge (–NH₃⁺ and –COO⁻) on the same molecule. Acid converts –COO⁻ to –COOH, so it removes the negative charge — it does not form zwitterions.</>,
    reason: <>The current study design mentions zwitterions under changes in pH: an amino acid is a zwitterion near neutral pH, and in acid it becomes a cation (–NH₃⁺ and –COOH). Acid destroys the zwitterion form rather than creating it. Ruled out.</>,
  },
  {
    working: <>C: esterification is the condensation reaction between a carboxylic acid and an <b>alcohol</b>. Adding acid does not esterify a protein, and esterification joins molecules rather than splitting them into smaller ones.</>,
    reason: <>Breaking a protein into smaller molecules is <b>hydrolysis</b> of peptide bonds, not esterification. Ruled out.</>,
  },
  {
    working: <>D: a carboxyl group, –COOH, is already protonated — H⁺ has nothing to react with there. (Acid only protonates the ionised form, –COO⁻, which is a change of charge — option A.)</>,
    reason: <>Ruled out: acids do not react with carboxyl groups (the report&rsquo;s point).</>,
  },
  {
    working: <b>Acids change the charges on the enzymes.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, the most popular wrong answer, fails because acids do not react with carboxyl groups; option <b>B</b> gets the zwitterion idea backwards, since acid removes the negative charge a zwitterion needs.</>,
  },
]

export default function ChemistryQ12_2022() {
  return (
    <MCQShell
      question={<p>Enzymes are commonly not effective in acidic conditions because acids</p>}
      options={[
        { letter: 'A', content: "change the charges on the enzymes.", isAnswer: true },
        { letter: 'B', content: 'react with the enzymes to form zwitterions.' },
        { letter: 'C', content: "esterify the enzymes into smaller molecules." },
        { letter: 'D', content: "react with the carboxyl groups on the enzymes' amino acid residues." },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
