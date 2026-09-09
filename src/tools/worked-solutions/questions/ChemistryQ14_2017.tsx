// 2017 Chemistry Exam, MCQ 14. VCAA examination report: 44% correct — the third-hardest MCQ on
// the 2017 paper. The trap: "environmental impact per 100 km" means multiplying two columns
// together, not just reading off the smallest one.
// Question text/table transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 47, B: 3, C: 5, D: 44 },
  answer: 'D',
  comment: (
    <>
      Impact on environment = fuel consumption (L/100 km) × <Chem eq="m(CO2)" /> per L of fuel. The
      large number of students who selected option A overlooked the "100 km" specification.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] text-center border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60">
              <th className="px-2 py-1.5 text-left">Vehicle</th>
              <th className="px-2 py-1.5">Fuel</th>
              <th className="px-2 py-1.5">L / 100 km</th>
              <th className="px-2 py-1.5">g CO₂ / L</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-t [&>tr]:border-gray-100 dark:[&>tr]:border-gray-800">
            <tr><td className="px-2 py-1.5 text-left">1</td><td className="px-2 py-1.5">LPG</td><td className="px-2 py-1.5">19.7</td><td className="px-2 py-1.5">1665</td></tr>
            <tr><td className="px-2 py-1.5 text-left">2</td><td className="px-2 py-1.5">petrol</td><td className="px-2 py-1.5">14.5</td><td className="px-2 py-1.5">2392</td></tr>
            <tr><td className="px-2 py-1.5 text-left">3</td><td className="px-2 py-1.5">E10</td><td className="px-2 py-1.5">14.2</td><td className="px-2 py-1.5">2304</td></tr>
            <tr><td className="px-2 py-1.5 text-left">4</td><td className="px-2 py-1.5">petrodiesel</td><td className="px-2 py-1.5">9.2</td><td className="px-2 py-1.5">2640</td></tr>
          </tbody>
        </table>
      </div>
    ),
    reason: 'Neither column alone gives grams of CO2 per 100 km — that needs both, multiplied together.',
  },
  {
    working: <Chem eq="g CO2 per 100 km = (L per 100 km) x (g CO2 per L)" className="block text-[13.5px]" />,
  },
  {
    working: (
      <>
        Vehicle 1: 19.7 × 1665 = 32 801
        <br />
        Vehicle 2: 14.5 × 2392 = 34 684
        <br />
        Vehicle 3: 14.2 × 2304 = 32 717
        <br />
        Vehicle 4: 9.2 × 2640 = <b>24 288</b>
      </>
    ),
    reason: <>Vehicle 1 has the lowest fuel-consumption <em>figure</em>, which is why so many students picked option A — but it doesn't have the lowest emission factor to go with it.</>,
  },
  {
    working: <b>Vehicle model 4 has by far the smallest environmental impact.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ14_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Four identical vehicle models were tested for fuel efficiency using LPG, petrol
            (unleaded, 91 octane), E10 (petrol with 10% ethanol added) and petrodiesel.{' '}
            <Chem eq="CO2" /> emissions per litre of fuel burnt were also determined, as shown
            above.
          </p>
          <p>
            The use of which vehicle has the smallest impact on the environment, in terms of the
            grams of <Chem eq="CO2" /> produced per 100 km?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Vehicle model 1' },
        { letter: 'B', content: 'Vehicle model 2' },
        { letter: 'C', content: 'Vehicle model 3' },
        { letter: 'D', content: 'Vehicle model 4', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
