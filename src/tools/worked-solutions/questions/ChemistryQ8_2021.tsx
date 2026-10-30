// 2021 Chemistry Exam, MCQ 8. VCAA examination report: 71% correct. Properties of a given
// triglyceride: counting C=C double bonds from the hydrocarbon chains' formulas (CnH2n+1 means
// saturated), the products of hydrolysis, and why fats are insoluble in water. Question text
// transcribed from the original paper; the triglyceride structure is cropped from the original
// VCAA exam PDF. Option A relies on oxidative rancidity, which is not named in the current
// (2024–) study design; the answer is reached without it. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import triglycerideSrc from './chem-2021-mcq8-triglyceride.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 12, C: 7, D: 71 },
  answer: 'D',
  comment: (
    <>
      The triglyceride hydrolyses to produce glycerol, CH₂OHCHOHCH₂OH and three fatty acids.
      <br />
      C₁₇H₃₅COOH – stearic acid – saturated
      <br />
      C₁₉H₃₉COOH – arachidic acid – saturated
      <br />
      C₁₇H₃₃COOH – oleic acid – monounsaturated
      <br />
      Oleic acid will undergo oxidative rancidity.
      <br />
      The triglyceride has one C=C.
      <br />
      Because of the large non-polar hydrocarbon chains, the triglyceride is insoluble in polar
      water.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Saturated alkyl chain: C<sub><i>n</i></sub>H<sub>2<i>n</i>+1</sub>. Each C=C removes 2 H.</>,
    reason: <>A chain of <i>n</i> carbons with only single bonds carries 2<i>n</i> + 1 hydrogens (like an alkane, C<sub><i>n</i></sub>H<sub>2<i>n</i>+2</sub>, missing the one H where it bonds to the C=O carbon). Every carbon–carbon double bond means two fewer hydrogens. So compare each chain&rsquo;s H count with 2<i>n</i> + 1.</>,
  },
  {
    working: <>C₁₇H₃₅: 2(17) + 1 = 35 → saturated (0 C=C)<br />C₁₉H₃₉: 2(19) + 1 = 39 → saturated (0 C=C)<br />C₁₇H₃₃: 35 − 33 = 2 H fewer → <b>1 C=C</b> (monounsaturated)</>,
    reason: <>So the whole triglyceride has exactly <b>one</b> carbon–carbon double bond. The three C=O bonds drawn in the structure are carbon–<i>oxygen</i> double bonds in the ester groups; they don&rsquo;t count.</>,
  },
  {
    working: <>C — &ldquo;three carbon–carbon double bonds&rdquo;: <b>false</b> (only one).</>,
    reason: <>Counting the three ester C=O bonds as C=C would give three.</>,
  },
  {
    working: <>Hydrolysis: triglyceride + 3<Chem eq="H2O" /> → glycerol + 3 fatty acids<br />B — &ldquo;hydrolyse to carbon dioxide and water&rdquo;: <b>false</b>.</>,
    reason: <>Hydrolysis adds water across each of the three ester bonds, splitting the molecule into glycerol, <Chem eq="CH2OHCHOHCH2OH" />, and three carboxylic (fatty) acids. Carbon dioxide and water are the products of complete <i>combustion</i> (or of respiration), not of hydrolysis.</>,
  },
  {
    working: <>A — &ldquo;the fatty acids will not undergo oxidative rancidity&rdquo;: <b>false</b>.</>,
    reason: <>
      Oxidative rancidity is oxygen attacking the C=C double bonds of unsaturated fatty acids. The C₁₇H₃₃ chain (oleic acid) has a C=C, so it can go rancid this way.
      <div className="mt-2"><Background title="Study Design Note" always>
        Oxidative rancidity was part of the 2017–2023 study design&rsquo;s food chemistry and is not named in the current one. You don&rsquo;t need it here: once D is shown to be true, A must be false, since only one option is correct.
      </Background></div>
    </>,
  },
  {
    working: <>D — &ldquo;insoluble in water&rdquo;: <b>true</b>.</>,
    reason: <>Three long non-polar hydrocarbon chains (17–19 carbons each) dominate the molecule. They can attract water only by weak dispersion forces, which can&rsquo;t compensate for breaking water&rsquo;s strong hydrogen bonds. The few polar ester groups are far too small to make it dissolve — fats and oils don&rsquo;t mix with water.</>,
  },
  {
    working: <b>The triglyceride is insoluble in water.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> confuses hydrolysis (products glycerol + fatty acids) with combustion (products CO₂ + H₂O); option <b>C</b> counts all three double bonds drawn, but those are C=O, and only the C₁₇H₃₃ chain has a C=C; option <b>A</b> overlooks that this unsaturated chain can be oxidised.</>,
  },
]

export default function ChemistryQ8_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A triglyceride is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={triglycerideSrc}
              alt="Triglyceride: a glycerol backbone (H2C, HC, H2C) each joined through O to a C=O carbon bearing the chains C17H35, C19H39 and C17H33 respectively — from the original 2021 VCAA exam paper"
              className="w-full max-w-[380px]"
            />
          </div>
          <p>Which one of the following statements about the triglyceride is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'The fatty acids from the triglyceride will not undergo oxidative rancidity.' },
        { letter: 'B', content: 'The triglyceride will hydrolyse to carbon dioxide and water.' },
        { letter: 'C', content: 'The triglyceride has three carbon–carbon double bonds.' },
        { letter: 'D', content: 'The triglyceride is insoluble in water.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
