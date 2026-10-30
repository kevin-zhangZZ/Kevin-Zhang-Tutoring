// 2021 Chemistry Exam, MCQ 30. VCAA examination report: 47% correct. Identifying a compound
// from its ¹H NMR spectrum — a singlet, a septet and a doublet — by counting proton environments
// and applying the n + 1 rule to each candidate. Question text transcribed from the original
// paper; the annotated structure in the report's comment is cropped from the report PDF.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportStructureSrc from './chem-2021-mcq30-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 47, C: 17, D: 18 },
  answer: 'B',
  comment: (
    <>
      On a ¹H NMR spectrum
      <br />
      Single peak → no H atom on an adjacent C atom
      <br />
      Doublet → one H atom on an adjacent C atom
      <br />
      Septet → 6 equivalent H atoms on two adjacent C atoms.
      <br />
      The presence of three significant peaks on the ¹H NMR spectrum indicates that the compound
      has three different hydrogen environments on its molecules.
      <br />
      A. (CH₃)₂CHCH₂COOH – 4 peaks
      <br />
      B. (CH₃)₂CHCOOH – 3 peaks – doublet, septet, singlet
      <br />
      C. (CH₃)₂CClCH₃ – 1 peak
      <br />
      D. (CH₃)₂CClCH₂Cl – 2 peaks
      <img loading="lazy" decoding="async"
        src={reportStructureSrc}
        alt="The report's structure of 2-methylpropanoic acid, (CH₃)₂CHCOOH: the six H atoms of the two CH₃ groups are circled together and labelled doublet, the H on the central carbon is labelled septet, and the O–H hydrogen is labelled singlet"
        className="w-full max-w-[300px] mt-1"
      />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Three sets of peaks → <b>three</b> different H environments.<br />Splitting (<i>n</i> + 1 rule): a peak is split into <i>n</i> + 1 lines by the <i>n</i> H atoms on the <b>adjacent</b> carbon(s).</>,
    reason: <>Each set of peaks in a ¹H NMR spectrum is one H environment. Singlet = 0 neighbouring H; doublet = 1 neighbouring H; septet = 7 lines = 6 neighbouring H. H atoms on O (the –OH of a carboxylic acid) are not split, so they give a singlet.</>,
  },
  {
    working: <>A doublet and a septet together: <b>6 H</b> split into a doublet by <b>1 H</b>, and that 1 H split into a septet by the 6 H → an <b>isopropyl group</b>, <Chem eq="(CH3)2CH–" />.</>,
    reason: <>The two CH₃ groups are equivalent (6 H, one environment) and each has one neighbouring H (on the CH) → doublet. The CH has 6 neighbouring H → 6 + 1 = 7 → septet. The singlet must be a third environment with no H neighbours.</>,
  },
  {
    working: <>A — 3-methylbutanoic acid, <Chem eq="(CH3)2CHCH2COOH" />: environments CH₃ (6 H), CH, CH₂, COOH → <b>4</b> sets of peaks.</>,
    reason: <>The isopropyl group is there, but the extra CH₂ adds a fourth environment, and the CH now has 6 + 2 = 8 neighbouring H, so it is not a septet.</>,
  },
  {
    working: <>B — 2-methylpropanoic acid, <Chem eq="(CH3)2CHCOOH" />: CH₃ (6 H) → <b>doublet</b>; CH (6 H neighbours) → <b>septet</b>; COOH → <b>singlet</b>. <b>3</b> sets of peaks.</>,
    reason: <>The CH is bonded to the carboxyl carbon, which carries no H, so the only neighbours of the CH are the 6 methyl H atoms. Exactly the spectrum described.</>,
  },
  {
    working: <>C — 2-chloro-2-methylpropane, <Chem eq="(CH3)3CCl" />: all 9 H are equivalent → <b>1</b> singlet.</>,
    reason: <>The three CH₃ groups are all attached to the same C, which has no H, so they are identical and unsplit. (The report writes it as (CH₃)₂CClCH₃.)</>,
  },
  {
    working: <>D — 1,2-dichloro-2-methylpropane, <Chem eq="(CH3)2CClCH2Cl" />: CH₃ (6 H) and CH₂Cl (2 H) → <b>2</b> singlets.</>,
    reason: <>Every H-bearing carbon is attached to the central C, which has no H, so neither peak is split.</>,
  },
  {
    working: <b>2-methyl propanoic acid, (CH₃)₂CHCOOH</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> also contains a (CH₃)₂CH– group and an –COOH, but has four H environments, not three. Options <b>C</b> and <b>D</b> have no H on the central carbon, so every peak is a singlet — no septet or doublet is possible.</>,
  },
]

export default function ChemistryQ30_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The ¹H NMR spectrum of an organic compound has three unique sets of peaks: a single
            peak, seven peaks (septet) and two peaks (doublet).
          </p>
          <p>The compound is</p>
        </>
      }
      options={[
        { letter: 'A', content: '3-methyl butanoic acid.' },
        { letter: 'B', content: '2-methyl propanoic acid.', isAnswer: true },
        { letter: 'C', content: '2-chloro-2-methylpropane.' },
        { letter: 'D', content: '1,2-dichloro-2-methylpropane.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
