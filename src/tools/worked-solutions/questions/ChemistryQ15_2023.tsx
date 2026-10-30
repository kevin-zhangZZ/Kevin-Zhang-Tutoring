// 2023 Chemistry Exam, MCQ 15. VCAA examination report: 41% correct. Comparing petrol-powered
// and hydrogen-fuel-cell-powered drones on energy transformations, heat, and products, by
// checking each statement against the combustion and fuel-cell reactions. Question text transcribed from the
// original paper; the drone image is cropped from the original VCAA exam PDF. VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import droneSrc from './chem-2023-mcq15-drone.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 12, C: 35, D: 12 },
  answer: 'A',
  comment: (
    <>
      Petrol-powered drones convert chemical energy into thermal energy and mechanical energy. The
      reaction products are CO₂(g) and H₂O(g).
      <br />
      Hydrogen-powered drones convert chemical energy into electrical energy and thermal energy.
      The reaction product is H₂O (g).
      <br />
      Since energy is released during the reaction in both types of drones, both reactions are
      exothermic.
      <br />
      Both CO₂(g) and H₂O(g) are greenhouse gases.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Petrol drone: <Chem eq="2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)" /> (combustion of octane, a main component of petrol) — chemical energy → <b>thermal</b> energy → <b>mechanical</b> energy in the engine.</>,
    reason: <>Write out each drone&rsquo;s overall reaction first: the products and the energy changes are what every option is testing. Petrol is burned in an engine; the hot gases drive the moving parts directly.</>,
  },
  {
    working: <>Hydrogen drone: <Chem eq="2H2(g) + O2(g) -> 2H2O(g)" /> in a fuel cell — chemical energy → <b>electrical</b> energy (plus some <b>thermal</b> energy), and the electricity runs an electric motor.</>,
    reason: <>A fuel cell is a galvanic-type cell: it converts chemical energy directly into electrical energy without burning the fuel. The only product is water.</>,
  },
  {
    working: <>A: petrol drone produces CO<sub>2</sub>(g) and H<sub>2</sub>O(g); hydrogen drone produces H<sub>2</sub>O(g). Both CO<sub>2</sub> and H<sub>2</sub>O vapour are <b>greenhouse gases</b>. ✓</>,
    reason: <>Water vapour is easy to forget: like CO<sub>2</sub>, it absorbs infrared radiation emitted by the Earth, so it is a greenhouse gas. The hydrogen drone&rsquo;s only product therefore still counts, and statement A is true for both drones.</>,
  },
  {
    working: <>B: the hydrogen drone also produces heat. ✗</>,
    reason: <>No energy conversion is 100% efficient. A fuel cell converts only part of the chemical energy into electrical energy; the rest is released as heat (the report lists thermal energy for both drones). So &ldquo;only petrol-powered drones&rdquo; is false.</>,
  },
  {
    working: <>C: petrol: chemical → thermal → mechanical; hydrogen: chemical → electrical (+ thermal). Not the same. ✗</>,
    reason: <>Both start with chemical energy, which is what makes C tempting, but the petrol drone gets its useful energy from heat in an engine, while the fuel cell gives electrical energy. The transformations are different.</>,
  },
  {
    working: <>D: <Chem eq="2H2(g) + O2(g) -> 2H2O(g)" /> releases energy, so Δ<i>H</i> &lt; 0 — <b>exothermic</b>. ✗</>,
    reason: <>The drone runs on the energy this reaction <i>releases</i>, so the reaction must be exothermic. It is the same overall reaction as burning hydrogen, and the Data Book gives hydrogen a molar enthalpy of combustion of −286 kJ mol<sup>−1</sup>: negative, so energy is released. An endothermic reaction would need energy put in and could not power anything.</>,
  },
  {
    working: <b>Only &ldquo;They both produce greenhouse gases&rdquo; is true.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (35%) misses that one drone gives mechanical energy through heat and the other gives electrical energy. Option <b>B</b> forgets that a fuel cell also loses energy as heat. Option <b>D</b> has the energy change the wrong way round: the fuel-cell reaction releases energy.</>,
  },
]

export default function ChemistryQ15_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider two types of drone: petrol-powered and hydrogen-fuel-cell powered.</p>
          <div className="mb-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={droneSrc}
              alt="Line drawing of a four-rotor drone with a camera underneath — from the original 2023 VCAA exam paper"
              className="w-full max-w-[170px]"
            />
          </div>
          <p className="mb-3 text-[11.5px] text-gray-500 dark:text-gray-400">Source: elnurSS/Shutterstock.com</p>
          <p>
            Which one of the following statements is correct about petrol-powered drones and
            hydrogen-fuel-cell powered drones?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'They both produce greenhouse gases.', isAnswer: true },
        { letter: 'B', content: 'Only petrol-powered drones produce heat.' },
        { letter: 'C', content: 'They both have the same energy transformations.' },
        { letter: 'D', content: 'The overall reactions in hydrogen-fuel-cell powered drones are endothermic.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
