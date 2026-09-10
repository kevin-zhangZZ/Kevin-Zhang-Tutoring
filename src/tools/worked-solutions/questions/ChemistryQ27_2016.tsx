// 2016 Chemistry Exam, MCQ 27. VCAA examination report: 21% correct — the hardest MCQ on the
// 2016 paper. Two trials of acid + marble chips are graphed on the same axes: Trial 2 loses
// more mass (more CO2) AND does so faster (steeper initial slope) than Trial 1 — which single
// change explains both? Question text transcribed from the original paper; the apparatus and
// mass-vs-time graph are both cropped directly from the original VCAA exam PDF, not
// redrawings. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import apparatusSrc from './chem-2016-mcq27-apparatus.png'
import graphSrc from './chem-2016-mcq27-mass-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 20, C: 21, D: 46 },
  answer: 'C',
  comment: (
    <>
      Using 0.5 M <Chem eq="H2SO4" /> increases both the rate of reaction — <Chem eq="c(H+)" /> is
      doubled — and the mass of <Chem eq="CO2" /> produced — <Chem eq="n(H+)" /> is doubled.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2HCl(aq) + CaCO3(s) -> CaCl2(aq) + CO2(g) + H2O(l)" className="block text-[13.5px]" />,
    reason: 'Trial 1: 100 mL of 0.5 M HCl added to 20 g of marble chips (CaCO3).',
  },
  {
    working: (
      <>
        n(CaCO₃) = 20 / 100.1 = 0.20 mol
        <br />
        n(H⁺) available = 0.100 L × 0.5 M = 0.05 mol
      </>
    ),
  },
  {
    working: <>0.05 mol H⁺ only needs 0.025 mol <Chem eq="CaCO3" /> to react completely (2:1 ratio) — but 0.20 mol is present.</>,
    reason: <><Chem eq="CaCO3" /> is in large excess — <Chem eq="H+" /> is the limiting reagent, and it's what actually controls how much <Chem eq="CO2" /> can form.</>,
  },
  {
    working: 'Trial 2 shows both a larger total mass loss (more CO2) and a steeper initial slope (faster rate) than Trial 1.',
    reason: <>Since <Chem eq="H+" /> is limiting, only a change that increases <b>both</b> the total moles <em>and</em> the concentration of <Chem eq="H+" /> can explain both observations at once.</>,
  },
  {
    working: (
      <>
        A — heating: faster rate, but <em>same</em> n(H⁺) → same final mass. ✗ (explains rate only)
        <br />
        B — 200 mL of 0.5 M HCl: doubles n(H⁺) (more CO₂ ✓), but c(H⁺) is unchanged → same rate. ✗ (explains mass only)
        <br />
        D — crushed marble: faster rate (more surface area), but same n(H⁺) → same final mass. ✗ (explains rate only)
      </>
    ),
    reason: 'Each of these changes only one of the two things Trial 2 actually shows.',
  },
  {
    working: (
      <>
        C — 100 mL of 0.5 M <Chem eq="H2SO4" /> instead: since <Chem eq="H2SO4" /> is diprotic,{' '}
        <Chem eq="c(H+) = 2 x 0.5 = 1.0" /> M — <b>double</b> the concentration (faster rate) <em>and</em>{' '}
        <Chem eq="n(H+) = 0.100 x 1.0 = 0.10" /> mol — <b>double</b> the moles (more CO₂).
      </>
    ),
    reason: <>Matches option <b>C</b> — the only change that affects both concentration and total moles of <Chem eq="H+" /> at once.</>,
  },
]

export default function ChemistryQ27_2016() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 mb-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              A student set up an experiment to test the effect of different factors on the rate and
              extent of the reaction between a strong acid and marble chips (calcium carbonate,{' '}
              <Chem eq="CaCO3" />). In each trial, the mass of the flask and its contents was
              measured every 30 seconds, from the instant the reactants were mixed.
            </p>
            <p className="mb-2">
              <b>Trial 1</b>: 100 mL of 0.5 M hydrochloric acid, HCl, was added to 20 g of marble
              chips. The equation for the reaction is <Chem eq="2HCl(aq) + CaCO3(s) -> CaCl2(aq) + CO2(g) + H2O(l)" />.
            </p>
            <p className="mb-2">
              <b>Trial 2</b>: one change to the reaction conditions was made and the experiment was
              repeated.
            </p>
            <div className="flex justify-center mb-2">
              <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
                <img src={apparatusSrc} alt="Trial 1 apparatus: an Erlenmeyer flask with 100 mL 0.5 M HCl and 20 g marble chips, plugged with cottonwool and releasing CO2, sitting on digital scales, from the original 2016 VCAA exam paper" className="w-full max-w-[300px]" />
              </div>
            </div>
            <p className="mb-2">The results of the two trials were graphed on the same axes and are shown below.</p>
            <div className="flex justify-center">
              <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
                <img src={graphSrc} alt="Graph of mass of flask versus time for Trial 1 and Trial 2 — both curves start at the same mass and decrease to a plateau, with Trial 2 dropping faster and further, from the original 2016 VCAA exam paper" className="w-full max-w-[340px]" />
              </div>
            </div>
          </div>
          <p>In Trial 2, the student must have</p>
        </>
      }
      options={[
        { letter: 'A', content: 'heated the 0.5 M HCl before adding it to the flask.' },
        { letter: 'B', content: 'doubled the volume of 0.5 M HCl added to the flask.' },
        { letter: 'C', content: <>used 100 mL of 0.5 M <Chem eq="H2SO4" /> instead of 100 mL of 0.5 M HCl.</>, isAnswer: true },
        { letter: 'D', content: 'used the same mass of marble but crushed it into a powder.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
