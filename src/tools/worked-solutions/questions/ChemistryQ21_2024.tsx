// 2024 Chemistry Exam, MCQ 21. VCAA examination report: 42% correct. Choosing the skeletal
// structure of an ester (3-chlorobutyl butanoate) by splitting the name into its alkyl part
// (from the alcohol) and its -oate part (from the carboxylic acid). Question text transcribed from
// the original paper (rendered from page images — the 2024 exam PDF has no extractable text); the
// four option structures are cropped from the original VCAA exam PDF. The report writes
// "propyl-3-chloropentanoate" with a hyphen after the alkyl name (kept verbatim). VCAA report
// only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2024-mcq21-optA.png'
import optBSrc from './chem-2024-mcq21-optB.png'
import optCSrc from './chem-2024-mcq21-optC.png'
import optDSrc from './chem-2024-mcq21-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2024 VCAA exam paper`} className="w-full max-w-[200px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 33, B: 5, C: 20, D: 42 },
  answer: 'D',
  comment: (
    <>
      Structure shown in A is propyl-3-chloropentanoate.
      <br />
      Structure shown in B is 3-chloropropyl pentanoate.
      <br />
      Structure shown in C is butyl-3-chlorobutanoate.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Ester name = [alkyl group from the alcohol] + [alkanoate from the carboxylic acid], so 3-chlorobutyl butanoate is made from 3-chlorobutan-1-ol and butanoic acid.</>,
    reason: <>An ester forms from an alcohol and a carboxylic acid. The <b>first word</b> of the name is the alcohol&rsquo;s part, attached to the <b>single-bonded O</b>; the <b>second word</b> (ending -oate) is the acid&rsquo;s part, and <b>contains the C=O carbon</b> (Data Book: Functional group and substituent nomenclature in organic chemistry).</>,
  },
  {
    working: <>&ldquo;butanoate&rdquo; → the acid side has <b>4 carbons</b>, counting the C=O carbon as C1, with <b>no</b> substituent.</>,
    reason: <>In a skeletal structure every line end and every bend is a carbon. Start at the C=O carbon and count away from the O.</>,
  },
  {
    working: <>&ldquo;3-chlorobutyl&rdquo; → the alcohol side has <b>4 carbons</b>, numbered from the carbon bonded to the O as C1, with <b>Cl on C3</b>: <Chem eq="-O-CH2-CH2-CHCl-CH3" />.</>,
    reason: <>The alkyl group is numbered from its point of attachment — the carbon joined to the ester O — not from the far end.</>,
  },
  {
    working: (
      <>
        Check each option:
        <br />A: acid side C=O–CH₂–CHCl–CH₂–CH₃ (5 C, Cl on C3); O–propyl (3 C) → propyl 3-chloropentanoate ✗
        <br />B: acid side 5 C, no Cl; O–CH₂CH₂CH₂Cl (3 C) → 3-chloropropyl pentanoate ✗
        <br />C: acid side C=O–CH₂–CHCl–CH₃ (4 C, Cl on C3); O–butyl (4 C) → butyl 3-chlorobutanoate ✗
        <br />D: acid side 4 C, no Cl; O–CH₂–CH₂–CHCl–CH₃ (4 C, Cl on C3) → 3-chlorobutyl butanoate ✓
      </>
    ),
    reason: <>For each structure, find the C=O, then count the carbons on each side of the single-bonded O and locate the Cl.</>,
  },
  {
    working: <b>Option D is 3-chlorobutyl butanoate.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> has the right carbon counts on both sides but puts the Cl on the <b>acid</b> side — it reverses which part of the name the &ldquo;3-chloro&rdquo; belongs to. Option <b>A</b>, chosen by 33%, also puts the Cl on the acid side and has the wrong chain lengths (5 C and 3 C). Option <b>B</b> has the Cl on the alcohol side but on a 3-carbon chain, with a 5-carbon acid side. (The report writes &ldquo;propyl-3-chloropentanoate&rdquo; and &ldquo;butyl-3-chlorobutanoate&rdquo; with a hyphen; the IUPAC names are two separate words, &ldquo;propyl 3-chloropentanoate&rdquo; and &ldquo;butyl 3-chlorobutanoate&rdquo;.)</>,
  },
]

export default function ChemistryQ21_2024() {
  return (
    <MCQShell
      question={<p>Which one of the following represents the skeletal structure for 3-chlorobutyl butanoate?</p>}
      options={[
        { letter: 'A', content: opt(optASrc, 'Skeletal ester with Cl on the third carbon of a five-carbon acid chain and a propyl group on the O') },
        { letter: 'B', content: opt(optBSrc, 'Skeletal ester with a five-carbon acid chain and a three-carbon chain on the O ending in Cl') },
        { letter: 'C', content: opt(optCSrc, 'Skeletal ester with Cl on the third carbon of a four-carbon acid chain and a butyl group on the O') },
        { letter: 'D', content: opt(optDSrc, 'Skeletal ester with a four-carbon acid chain and a four-carbon chain on the O with Cl on its third carbon'), isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
