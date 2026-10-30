// 2023 Chemistry Exam, MCQ 26. VCAA examination report: 50% correct. Identifying the independent
// variables in an investigation of biodiesel viscosity (flow rate) with three variables changed:
// oil, alcohol and catalyst. Question text and both tables transcribed from the original paper
// (tables as HTML). VCAA report only (no second source). Solution is original.

import type { ReactNode } from 'react'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-middle'
const th = `${td} font-semibold text-center`

const flowTable = (title: ReactNode, catalyst: string, rows: [string, string, string][]) => (
  <div className="mb-3">
    <p className="mb-1.5 font-semibold text-[13.5px]">{title}</p>
    <div className="overflow-x-auto">
      <table className="text-[13px] border-collapse">
        <tbody>
          <tr>
            <td className="px-3 py-1.5" colSpan={2} rowSpan={2}></td>
            <td className={th} colSpan={2}>Alcohol used in biodiesel production with {catalyst} catalyst</td>
          </tr>
          <tr>
            <td className={th}>Methanol</td>
            <td className={th}>Ethanol</td>
          </tr>
          {rows.map(([oil, m, e], i) => (
            <tr key={oil}>
              {i === 0 && <td className={`${td} font-semibold`} rowSpan={2}>Oil used in biodiesel production</td>}
              <td className={`${td} whitespace-nowrap`}>{oil}</td>
              <td className={`${td} text-center`}>{m}</td>
              <td className={`${td} text-center`}>{e}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const biodieselStem = (
  <>
    <p className="mb-2 italic">Use the following information to answer Questions 26 and 27.</p>
    <p className="mb-2">A student investigated the viscosity of several biofuels.</p>
    <p className="mb-3">
      The flow rate of each biofuel through a narrow glass tube was measured. The results are
      presented in the tables below.
    </p>
    {flowTable(<>Table 1: Flow rate (mL min⁻¹) of biodiesels produced using sodium hydroxide, NaOH(aq), catalyst</>, 'NaOH', [
      ['sunflower oil', '4.8', '4.4'],
      ['canola oil', '5.1', '4.7'],
    ])}
    {flowTable(<>Table 2: Flow rate (mL min⁻¹) of biodiesels produced using potassium hydroxide, KOH(aq), catalyst</>, 'KOH', [
      ['sunflower oil', '4.9', '4.4'],
      ['canola oil', '4.8', '4.6'],
    ])}
  </>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 50, C: 20, D: 9 },
  answer: 'B',
  comment: (
    <>
      There are three independent variables, since there are three things that would be altered
      by the student during the investigation:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>the type of oil – sunflower or canola</li>
        <li>the catalyst used – NaOH(aq) or KOH(aq)</li>
        <li>the alcohol used – methanol or ethanol</li>
      </ul>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Independent variable = a factor the experimenter <b>deliberately changes</b>. Dependent variable = what is <b>measured</b> in response.</>,
    reason: <>Count the <i>kinds</i> of thing that change, not the number of choices (levels) for each one.</>,
  },
  {
    working: <>Dependent variable: <b>flow rate</b> (mL min⁻¹), used as a measure of viscosity.</>,
    reason: <>The flow rate is the number recorded in every cell of the tables, so it is the result, not something the student chose.</>,
  },
  {
    working: (
      <>
        Things the student changed:
        <br />1. type of <b>oil</b> — sunflower or canola (the table rows)
        <br />2. type of <b>alcohol</b> — methanol or ethanol (the table columns)
        <br />3. type of <b>catalyst</b> — NaOH(aq) or KOH(aq) (Table 1 vs Table 2)
      </>
    ),
    reason: <>Read each axis of the data: rows, columns, and the difference between the two tables. Each is a separate factor the student selected before measuring.</>,
  },
  {
    working: <><b>3 independent variables</b></>,
    reason: <>Matches option <b>B</b>. Option <b>D</b> (6) counts each level separately (2 oils + 2 alcohols + 2 catalysts = 6) instead of counting the variables. Option <b>A</b> (1) would mean only one factor changed, but three different factors (oil, alcohol, catalyst) were changed. (Changing three variables at once is fine here because every combination was tested — 2 × 2 × 2 = 8 flow rates — so the effect of each one can still be compared with the other two held the same.)</>,
  },
]

export default function ChemistryQ26_2023() {
  return (
    <MCQShell
      question={
        <>
          {biodieselStem}
          <p>How many independent variables are there in this investigation?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>1</> },
        { letter: 'B', content: <>3</>, isAnswer: true },
        { letter: 'C', content: <>4</> },
        { letter: 'D', content: <>6</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
