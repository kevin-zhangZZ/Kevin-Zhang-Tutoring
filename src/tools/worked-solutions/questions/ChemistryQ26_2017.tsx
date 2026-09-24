// 2017 Chemistry Exam, MCQ 26. VCAA examination report: 37% correct — the second-hardest MCQ on
// the 2017 paper. Find the temperature change needed to keep pressure constant after adding
// more gas to a sealed vessel — a direct application of pV = (m/M)RT.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 30, C: 22, D: 10 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      According to <i>pV</i> = <i>nRT</i>, i.e. <i>pV</i> = (<i>m</i>/<i>M</i>)<i>RT</i>
      <br />
      and since <i>p</i>, <i>V</i>, <i>M</i> and <i>R</i> do not change.
      <br />
      <i>m</i>₂<i>T</i>₂ = <i>m</i>₁<i>T</i>₁
      <br />
      <i>m</i>₂ = 11 g <Chem eq="CO2" />, <i>T</i>₂ = ?
      <br />
      <i>m</i>₁ = 10 g <Chem eq="CO2" />, <i>T</i>₁ = 30 °C = 303 K
      <br />
      <i>T</i>₂ = <i>m</i>₁<i>T</i>₁ / <i>m</i>₂ = 10 × 303 / 11 = 275 K
      <br />
      As a result of adding one gram of <Chem eq="CO2" />, in order for the pressure to remain
      constant the temperature must decrease from 303 K (30 °C) to 275 K (2 °C), i.e by 28 K/28 °C.
      <br />
      The temperature change is –28 °C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="pV = nRT = (m/M)RT" className="block text-[13.5px]" />,
    reason: <>The vessel's volume never changes, and neither does <Chem eq="R" /> or the molar mass <Chem eq="M" /> of <Chem eq="CO2" /> — only the mass <Chem eq="m" /> and temperature <Chem eq="T" /> change between the two states.</>,
  },
  {
    working: <>To keep <Chem eq="p" /> constant with <Chem eq="V, M, R" /> fixed, <Chem eq="mT" /> must stay constant too.</>,
    reason: <>Rearranging <Chem eq="pV=(m/M)RT" /> shows <Chem eq="p" /> is directly proportional to <Chem eq="mT" /> — so keeping <Chem eq="p" /> fixed means keeping the product <Chem eq="mT" /> fixed.</>,
  },
  {
    working: <Chem eq="m1T1 = m2T2" className="block text-[13.5px]" />,
  },
  {
    working: (
      <>
        <Chem eq="m1 = 10" /> g, <Chem eq="T1 = 303" /> K (30°C, before adding more gas)
        <br />
        <Chem eq="m2 = 11" /> g (after adding 1 g more)
      </>
    ),
    reason: <>The two states of the same gas, before and after the extra 1 g is injected.</>,
  },
  {
    working: (
      <>
        <Chem eq="T2 = m1T1 / m2 = (10 x 303) / 11" />
        <br />
        <Chem eq="= 275" /> K = 2°C
      </>
    ),
  },
  {
    working: <>Temperature change = 2°C − 30°C = <b>−28°C</b></>,
    reason: <>Matches option <b>A</b> — adding <em>more</em> gas to a fixed volume, while keeping pressure fixed, requires <em>cooling</em> it. Option <b>D</b> has the right size of change but the wrong direction: warming the extra gas would raise the pressure further.</>,
  },
]

export default function ChemistryQ26_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            10 g of carbon dioxide, <Chem eq="CO2" />, gas is injected into a sealed, evacuated 12 L
            vessel at 30 °C.
          </p>
          <p>
            After a further 1 g of <Chem eq="CO2" /> gas is injected into the vessel, what is the
            temperature change, in degrees Celsius, required to maintain the original pressure?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '−28', isAnswer: true },
        { letter: 'B', content: '−3.7' },
        { letter: 'C', content: '+3.7' },
        { letter: 'D', content: '+28' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
