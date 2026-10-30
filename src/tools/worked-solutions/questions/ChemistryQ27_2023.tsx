// 2023 Chemistry Exam, MCQ 27. VCAA examination report: 45% correct. Drawing the most valid
// conclusion from flow-rate data for biodiesels: a higher flow rate means a lower viscosity, and
// only the methanol-versus-ethanol comparison holds in every case. Question text and both tables
// transcribed from the original paper (tables as HTML). VCAA report only (no second source); the
// report's "viscosity of canola oil" means the biodiesel made from canola oil. Solution is original.

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
  percentages: { A: 17, B: 45, C: 19, D: 18 },
  answer: 'B',
  comment: (
    <>
      The lower the flow rate of a biodiesel, the higher the viscosity; the higher the flow rate,
      the lower the viscosity.
      <br />
      Using NaOH(aq) as a catalyst:
      <br />
      The viscosity of canola oil is lower than the viscosity of sunflower oil for both methanol
      and ethanol.
      <br />
      However, the viscosities of both sunflower oil and canola oil are lower when made from
      methanol, since the flow rates are higher than the flow rates using ethanol.
      <br />
      <br />
      Using KOH(aq) as a catalyst:
      <br />
      <u>Methanol</u>: viscosity of canola oil is higher than the viscosity of sunflower oil
      <br />
      <u>Ethanol</u>: viscosity of canola oil is lower than the viscosity of sunflower oil.
      <br />
      Again, the viscosities of both sunflower oil and canola oil are lower when made from
      methanol since the flow rates are higher than the flow rates using ethanol.
      <br />
      <br />
      Biodiesels made from methanol have a higher flow rate, and hence a lower viscosity, than
      biodiesels made from ethanol.
      <br />
      The relative suitability of biodiesels and petrodiesel in cold climates cannot be deduced
      from the results presented.
      <br />
      The flow rate of the biodiesel made from sunflower oil and methanol is lower when NaOH is
      used (4.8) than it is when KOH is used (4.9). In this instance the viscosity of the
      biodiesel is higher when NaOH(aq) is used than when KOH(aq) is used.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Higher flow rate ⇒ lower viscosity</b> (and lower flow rate ⇒ higher viscosity).</>,
    reason: <>Viscosity is a liquid&rsquo;s resistance to flow. A more viscous (&ldquo;thicker&rdquo;) liquid flows through the narrow tube more slowly, so the tables measure viscosity <i>inversely</i>.</>,
  },
  {
    working: <>A valid conclusion must hold in <b>every</b> comparison in the data, and must only be about what was actually tested.</>,
    reason: <>Test each option against all the matching pairs of results — if even one pair goes the other way, the general statement is not supported.</>,
  },
  {
    working: (
      <>
        A — sunflower vs canola (sunflower : canola):
        <br />NaOH, methanol: 4.8 &lt; 5.1
        <br />NaOH, ethanol: 4.4 &lt; 4.7
        <br />KOH, methanol: <b>4.9 &gt; 4.8</b>
        <br />KOH, ethanol: 4.4 &lt; 4.6
        <br />Not consistent ✗
      </>
    ),
    reason: <>Three of the four pairs show sunflower biodiesel flowing more slowly (more viscous), but with KOH and methanol it flows faster, so &ldquo;sunflower biodiesels have a higher viscosity&rdquo; is not true in every case.</>,
  },
  {
    working: (
      <>
        B — methanol vs ethanol (methanol : ethanol):
        <br />NaOH, sunflower: 4.8 &gt; 4.4
        <br />NaOH, canola: 5.1 &gt; 4.7
        <br />KOH, sunflower: 4.9 &gt; 4.4
        <br />KOH, canola: 4.8 &gt; 4.6
        <br />Methanol always flows faster ⇒ always <b>lower viscosity</b> ✓
      </>
    ),
    reason: <>All four pairs agree: for the same oil and the same catalyst, the methanol biodiesel has the higher flow rate, so it has the lower viscosity.</>,
  },
  {
    working: <>C — no petrodiesel was tested and no temperature was varied ✗</>,
    reason: <>The statement may sound plausible from general knowledge, but a conclusion can only be drawn from the data collected. There is no petrodiesel result to compare with and nothing about cold temperatures.</>,
  },
  {
    working: (
      <>
        D — NaOH vs KOH (NaOH : KOH):
        <br />methanol, sunflower: <b>4.8 &lt; 4.9</b>
        <br />methanol, canola: 5.1 &gt; 4.8
        <br />ethanol, sunflower: 4.4 = 4.4
        <br />ethanol, canola: 4.7 &gt; 4.6
        <br />Not consistent ✗
      </>
    ),
    reason: <>For sunflower oil with methanol the NaOH biodiesel flows more <i>slowly</i>, so it is <i>more</i> viscous — the opposite of D (and the ethanol–sunflower pair shows no difference at all).</>,
  },
  {
    working: <><b>Biodiesels made from methanol have a lower viscosity than biodiesels made from ethanol.</b></>,
    reason: <>Matches option <b>B</b>. Options <b>A</b> and <b>D</b> each fit some pairs but are contradicted by at least one (KOH–methanol for A; sunflower–methanol for D, where NaOH gives the <i>more</i> viscous biodiesel). Option <b>C</b> uses outside knowledge the data cannot support.</>,
  },
]

export default function ChemistryQ27_2023() {
  return (
    <MCQShell
      question={
        <>
          {biodieselStem}
          <p>Select the most valid conclusion that can be drawn from the student&rsquo;s results presented in Table 1 and Table 2.</p>
        </>
      }
      options={[
        { letter: 'A', content: <>Biodiesels made from sunflower oil have a higher viscosity than biodiesels made from canola oil.</> },
        { letter: 'B', content: <>Biodiesels made from methanol have a lower viscosity than biodiesels made from ethanol.</>, isAnswer: true },
        { letter: 'C', content: <>Biodiesels are unsuitable for use in cold climates because they have a higher viscosity than petrodiesels.</> },
        { letter: 'D', content: <>Biodiesels made using NaOH(aq) catalyst have a lower viscosity than biodiesels made using KOH(aq) catalyst.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
