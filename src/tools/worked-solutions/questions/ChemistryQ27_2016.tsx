// 2016 Chemistry Exam, MCQ 27. VCAA examination report: 21% correct — the hardest MCQ on the
// 2016 paper. Two trials of acid + marble chips are graphed on the same axes: Trial 2 loses
// more mass (more CO2) AND does so faster (steeper initial slope) than Trial 1 — which single
// change explains both? Question text/diagram transcribed from the original paper; solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

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
            <p>
              <b>Trial 2</b>: one change to the reaction conditions was made and the experiment was
              repeated. The results of both trials, graphed on the same axes (mass of flask vs.
              time), showed that Trial 2 lost more total mass <em>and</em> had a steeper initial
              slope than Trial 1.
            </p>
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
