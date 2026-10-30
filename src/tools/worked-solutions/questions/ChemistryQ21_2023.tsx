// 2023 Chemistry Exam, MCQ 21. VCAA examination report: 65% correct. Denaturation of proteins:
// what can cause it, whether it is reversible, and which levels of protein structure it changes.
// Question text transcribed from the original paper. VCAA report only (no second source).
// Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 23, B: 7, C: 5, D: 65 },
  answer: 'D',
  comment: (
    <>
      Denaturation can also be caused by certain chemicals as well as changes in pH or temperature.
      <br />
      Denaturation changes are generally considered as being irreversible in the environment in
      which they occur.
      <br />
      Denaturation does not affect the primary structure.
      <br />
      Denaturation alters the secondary (and tertiary and quaternary) structures.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Denaturation = the loss of a protein&rsquo;s 3D shape when the <b>attractions holding its folds</b> (hydrogen bonds, ionic attractions, dispersion forces, and sometimes disulfide bridges) are disrupted; the <b>covalent peptide bonds are not broken</b>.</>,
    reason: (
      <>
        Start from what holds each level of structure together — denaturation breaks the
        attractions that hold the chain in its folded shape, but never the peptide bonds that join
        the amino acids.
        <Background title="Four levels of protein structure">
          <b>Primary</b> — the sequence of amino acids, joined by covalent peptide (amide) bonds.
          <br />
          <b>Secondary</b> — α-helices and β-pleated sheets, held by hydrogen bonds between the
          C=O of one peptide link and the N–H of another along the backbone.
          <br />
          <b>Tertiary</b> — the overall folded 3D shape, held by interactions between the side
          (R) groups: hydrogen bonds, ionic attractions, dispersion forces and covalent disulfide
          bridges.
          <br />
          <b>Quaternary</b> — two or more polypeptide chains held together by the same kinds of
          interactions.
        </Background>
      </>
    ),
  },
  {
    working: <>A — false: heat and acids denature proteins, but so do bases (any big change in pH) and certain chemicals (e.g. heavy-metal ions, alcohols).</>,
    reason: <>&ldquo;Can <b>only</b> be caused by&rdquo; is too restrictive. A change in pH changes the charges on the side groups (–NH₃⁺/–NH₂, –COOH/–COO⁻), breaking ionic attractions and hydrogen bonds — this happens on the alkaline side too, not just with acids.</>,
  },
  {
    working: <>B — false: denaturation is generally <b>irreversible</b>.</>,
    reason: <>Once the chain has unfolded, it doesn&rsquo;t refold into its original shape when conditions return to normal (a cooked egg white doesn&rsquo;t turn clear again when it cools).</>,
  },
  {
    working: <>C — false: hydrolysis breaks peptide bonds, which is a <b>different process</b>; denaturation leaves the primary structure intact.</>,
    reason: <>Hydrolysis of a protein is a chemical reaction with water that splits the chain into amino acids (as in digestion). Denaturation changes only the shape, so the amino acid sequence is unchanged.</>,
  },
  {
    working: <>D — true: disrupting the backbone hydrogen bonds unravels α-helices and β-sheets, so the <b>secondary structure</b> (along with the tertiary and quaternary) is altered.</>,
    reason: <>The primary structure is the only level that survives denaturation.</>,
  },
  {
    working: <b>Denaturation alters the secondary structure of a protein.</b>,
    reason: <>Matches option <b>D</b>. Option <b>A</b>, chosen by 23%, leaves out other causes such as changes to a higher pH and certain chemicals. Option <b>B</b> wrongly calls denaturation reversible, and option <b>C</b> confuses denaturation with hydrolysis of the peptide bonds.</>,
  },
]

export default function ChemistryQ21_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Which one of the following statements about denaturation is correct?</p>
          <p>Denaturation</p>
        </>
      }
      options={[
        { letter: 'A', content: 'can only be caused by changes in temperature or the addition of acids.' },
        { letter: 'B', content: 'causes the reversible change of a protein’s shape.' },
        { letter: 'C', content: 'hydrolyses the primary structure of a protein.' },
        { letter: 'D', content: 'alters the secondary structure of a protein.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
