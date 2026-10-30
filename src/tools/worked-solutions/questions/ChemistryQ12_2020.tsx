// 2020 Chemistry Exam, MCQ 12. VCAA examination report: 67% correct. Identifying the level of
// protein structure shown (primary) and naming the three amino acid residues (glutamine, alanine,
// lysine) from their side chains using the Data Book's 2-amino acids table. Question text
// transcribed from the original paper; the enzyme section is cropped from the original VCAA exam
// PDF, and the report's annotated structure (its whole comment) is cropped from the VCAA
// examination report. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import enzymeSrc from './chem-2020-mcq12-enzyme.png'
import reportSrc from './chem-2020-mcq12-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 8, C: 14, D: 67 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <img
      loading="lazy"
      decoding="async"
      src={reportSrc}
      alt="The report's annotation: the section is split into three residues circled in red dashes, with the free amino acids drawn beside them — glutamine (H2N–CH(CH2CH2CONH2)–COOH), alanine (H2N–CH(CH3)–COOH) and lysine (H2N–CH(CH2CH2CH2CH2NH2)–COOH) — from the 2020 VCAA examination report"
      className="w-full max-w-[360px] mt-1 bg-white rounded"
    />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The section is a chain of amino acid residues joined by <b>peptide (amide) links</b>, –CO–NH–, and nothing else.</>,
    reason: (
      <>
        The <b>primary structure</b> of a protein is its sequence of amino acids held together by
        covalent peptide bonds. The <b>secondary structure</b> is the folding of that chain into
        α-helices or β-pleated sheets, held by <b>hydrogen bonds</b> between the C=O of one peptide
        link and the N–H of another.
        <Background title="Four levels of protein structure">
          Primary — the amino acid sequence (covalent peptide links). Secondary — α-helix / β-sheet
          from hydrogen bonds between backbone C=O and N–H groups. Tertiary — the overall 3D shape
          from interactions between side chains (hydrogen bonds, ionic interactions, disulfide
          bridges, dispersion forces). Quaternary — two or more chains held together.
        </Background>
      </>
    ),
  },
  {
    working: <>No hydrogen bonds between C=O and N–H groups are drawn, and the chain is not shown folded ⇒ <b>primary structure</b>.</>,
    reason: <>This rules out A and C, which call it a secondary structure.</>,
  },
  {
    working: <>Split the chain at each peptide link (between the C=O carbon and the N). Each residue is –NH–CH(R)–CO–, so identify each by its side chain R:</>,
    reason: <>The carbon bonded to both the N and the C=O is the α-carbon; whatever else hangs off it (besides H) is the side chain R. Compare each R with the 2-amino acids table in the Data Book (section 19 of the 2026 Data Book).</>,
  },
  {
    working: <>Left residue: R = –CH<sub>2</sub>CH<sub>2</sub>CONH<sub>2</sub> ⇒ <b>glutamine</b></>,
    reason: <>Count the CH<sub>2</sub> groups between the α-carbon and the amide C=O: there are <b>two</b>. Asparagine&rsquo;s side chain is –CH<sub>2</sub>CONH<sub>2</sub>, with only <b>one</b> CH<sub>2</sub> — that is the trap in options B and C.</>,
  },
  {
    working: <>Middle residue: R = –CH<sub>3</sub> ⇒ <b>alanine</b></>,
    reason: <>Glycine&rsquo;s side chain is just –H (its α-carbon carries two H atoms). Here the α-carbon carries one H and a CH<sub>3</sub>, so it is alanine, not glycine — the trap in options A and B.</>,
  },
  {
    working: <>Right residue: R = –CH<sub>2</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>2</sub>NH<sub>2</sub> ⇒ <b>lysine</b></>,
    reason: <>Four CH<sub>2</sub> groups then an amino group — lysine. Every option agrees on this one.</>,
  },
  {
    working: <b>Primary structure consisting of glutamine, alanine and lysine.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (14%) calls the chain a secondary structure and miscounts the CH<sub>2</sub> groups (asparagine for glutamine); option <b>A</b> (11%) calls it secondary and mistakes alanine for glycine; option <b>B</b> has the right level of structure but makes both side-chain errors.</>,
  },
]

export default function ChemistryQ12_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The diagram below represents a section of an enzyme.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={enzymeSrc}
              alt="A section of an enzyme: three amino acid residues joined by peptide links. The left α-carbon carries CH2–CH2–C(=O)NH2, the middle α-carbon carries CH3, and the right α-carbon carries CH2–CH2–CH2–CH2–NH2; the chain continues (dashed) at both ends — from the original 2020 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>The diagram can be described as a</p>
        </>
      }
      options={[
        { letter: 'A', content: 'secondary structure consisting of glutamine, glycine and lysine.' },
        { letter: 'B', content: 'primary structure consisting of asparagine, glycine and lysine.' },
        { letter: 'C', content: 'secondary structure consisting of asparagine, alanine and lysine.' },
        { letter: 'D', content: 'primary structure consisting of glutamine, alanine and lysine.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
