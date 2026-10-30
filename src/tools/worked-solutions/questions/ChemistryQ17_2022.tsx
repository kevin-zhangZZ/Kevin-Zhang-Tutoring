// 2022 Chemistry Exam, MCQ 17. VCAA examination report: 56% correct. Which statement about
// sweeteners (glucose, fructose, sucrose, aspartame) is true — isomers, glucose as the monomer of
// glycogen, the energy content of a disaccharide, and sweetness versus energy. Question text
// transcribed from the original paper (no figures). Artificial sweeteners (aspartame) were on the
// 2017–2023 study design only; the answer (glucose as a monomer for condensation polymerisation)
// and options A and C are current content, so the question is written up with a note — borderline,
// for KZ to confirm. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 56, C: 17, D: 11 },
  answer: 'B',
  comment: (
    <>
      Glucose and fructose molecules are structural isomers. Both compounds contain chiral carbons
      but are not mirror images of each other.
      <br />
      Glucose undergoes condensation polymerisation to form glycogen.
      <br />
      The disaccharide sucrose is made from the monosaccharides glucose and fructose, but the energy
      content of each is different due to structural differences. Once monosaccharides form a
      disaccharide energy is also altered.
      <br />
      Since aspartame may be metabolised to the amino acids phenylalanine and aspartic acid as well
      as methanol, its energy density is slightly higher than sucrose. However, because aspartame is
      approximately 200 times as sweet as sucrose, very small amounts are needed to produce the
      required sweetness levels.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A — Glucose and fructose are both <Chem eq="C6H12O6" />, but glucose has an aldehyde-type (C=O on C-1) structure and fructose a ketone-type (C=O on C-2) structure: the atoms are joined in a different order. They are <b>structural</b> isomers. <b>False.</b></>,
    reason: <>Optical isomers (enantiomers) have the <i>same</i> atoms joined in the <i>same</i> order and are non-superimposable mirror images, which needs a chiral carbon. Glucose and fructose both have chiral carbons, but they are not mirror images of each other, because their connectivity is different.</>,
  },
  {
    working: <>B — In the body, glucose molecules join by <b>condensation polymerisation</b> (losing <Chem eq="H2O" /> at each link) to form glycogen, the body&rsquo;s storage polysaccharide; glucose is the monomer. <b>True.</b></>,
    reason: <>Current study design: condensation reactions build starch, glycogen, proteins and lipids for storage; hydrolysis breaks them back down. A monomer is a small molecule that joins repeatedly to form a polymer.</>,
  },
  {
    working: <>C — Sucrose (<Chem eq="C12H22O11" />) is made from one glucose and one fructose (not two glucose), with loss of <Chem eq="H2O" />. Its molar heat of combustion is about 5640 kJ mol⁻¹, not 2 × 2803 = 5606 kJ mol⁻¹. <b>False.</b></>,
    reason: <>The condensation reaction breaks and makes bonds, and glucose and fructose have different structures, so the energy content of a disaccharide is not simply the sum of two glucose molecules. (Glucose: Δ<sub>c</sub>H = −2803 kJ mol⁻¹ in the current Data Book; Question 15 of this paper quotes 2805 kJ mol⁻¹, giving 2 × 2805 = 5610 kJ mol⁻¹ — either way not equal to sucrose&rsquo;s value. Sucrose is not in the Data Book; about 5640 kJ mol⁻¹ is the accepted value, quoted for comparison only.)</>,
  },
  {
    working: <>D — Aspartame is about 200 times <b>sweeter</b> than sucrose. Gram for gram its energy content is similar to (slightly higher than) sucrose&rsquo;s, so a tiny mass gives the same sweetness with almost no energy. <b>False.</b></>,
    reason: <>&ldquo;200 times&rdquo; describes how much <i>sweeter</i> aspartame is, not how much energy either compound releases. Per gram, sucrose and aspartame release similar amounts of energy; aspartame is a &ldquo;low-energy&rdquo; sweetener only because so little of it is used.</>,
  },
  {
    working: <b>Glucose reacts as a monomer in the body.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> confuses structural isomers (same formula, different connectivity) with optical isomers (mirror images). Option <b>C</b> treats sucrose as two glucose units with unchanged energy. Option <b>D</b> confuses how sweet aspartame is with how much energy it supplies.</>,
  },
]

export default function ChemistryQ17_2022() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about sweeteners is correct?</p>}
      options={[
        { letter: 'A', content: 'Glucose and fructose are optical isomers.' },
        { letter: 'B', content: 'Glucose reacts as a monomer in the body.', isAnswer: true },
        { letter: 'C', content: '2 mol of glucose has the same energy content as 1 mol of sucrose.' },
        { letter: 'D', content: 'Sucrose has an energy output almost 200 times the energy output of aspartame.' },
      ]}
      background={
        <Background title="Study Design Note" always>
          <p>
            Artificial sweeteners such as aspartame were on the old (2017–2023) study design and are
            not on the current one. The rest of this question is still current: isomers and chiral
            centres, glucose as the monomer for condensation polymerisation (glycogen), and the
            energy content of foods. Option D can be ruled out by knowing that aspartame is used
            because it is very sweet, not because it is low in energy per gram.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
