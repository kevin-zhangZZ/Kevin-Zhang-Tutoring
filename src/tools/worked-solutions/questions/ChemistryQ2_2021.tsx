// 2021 Chemistry Exam, MCQ 2. VCAA examination report: 92% correct. Biodiesel's larger,
// polar ester molecules give stronger intermolecular forces and so a higher viscosity than
// petrodiesel's non-polar hydrocarbons. Question text transcribed from the original paper. The
// report's comment compares biodiesel with "petrol" although the question is about petrodiesel;
// it is kept verbatim and explained in the working. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 92, B: 2, C: 4, D: 2 },
  answer: 'A',
  comment: (
    <>
      The polar molecules in biodiesel are much larger than the non-polar molecules in petrol.
      The stronger intermolecular attraction (dispersion forces and dipole-dipole) in biodiesel
      means it has a significantly higher viscosity, and a much lower flow rate than petrol.
      <br />
      Biodiesel (renewable) has less environmental impact than petrol (non-renewable).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Biodiesel: fatty acid <b>methyl esters</b>, e.g. methyl oleate <Chem eq="C17H33COOCH3" /> (<i>M</i> = 296.0 g mol⁻¹) — long hydrocarbon chain + a <b>polar ester group</b> (–COO–).</>,
    reason: <>Biodiesel is made by transesterification of plant oils (triglycerides) with methanol, so every molecule carries an ester group. The C=O and C–O bonds are polar, giving <b>dipole–dipole</b> attractions on top of dispersion forces. (<i>M</i> from Data Book relative atomic masses: C 12.0, H 1.0, O 16.0 — 19 × 12.0 + 36 × 1.0 + 2 × 16.0 = 296.0.)</>,
  },
  {
    working: <>Petrodiesel: <b>alkanes</b>, about C₁₀–C₂₀, e.g. hexadecane <Chem eq="C16H34" /> (<i>M</i> = 226.0 g mol⁻¹) — <b>non-polar</b>, dispersion forces only.</>,
    reason: <>Petrodiesel is a fraction from crude oil: hydrocarbons only, with no polar bonds. Its molecules are also typically smaller than biodiesel&rsquo;s, so even its dispersion forces are weaker.</>,
  },
  {
    working: <>Biodiesel: larger, polar molecules → <b>stronger intermolecular forces</b> → <b>higher viscosity</b>.<br />So the two fuels <b>have different viscosities</b>.</>,
    reason: <>Viscosity is resistance to flow. Molecules that attract each other more strongly (and long chains that tangle) slide past one another less easily, so the liquid is thicker. Biodiesel is noticeably more viscous than petrodiesel.</>,
  },
  {
    working: <>Check the other options:<br />B — biodiesel is <b>renewable</b> (made from plants), petrodiesel is not, so their environmental impacts differ.<br />C — biodiesel <b>does</b> contain a polar group (the ester).<br />D — biodiesel&rsquo;s stronger intermolecular forces make it thicken and start to solidify in the cold, so it does <b>not</b> flow easily through fuel lines in very cold conditions.</>,
    reason: <>For B: the CO₂ released when biodiesel burns was absorbed from the atmosphere by the plants it was made from, whereas petrodiesel releases carbon that was locked underground. For D: the same stronger attractions that raise biodiesel&rsquo;s viscosity also raise the temperature at which it turns cloudy and gels, a known problem in cold climates.</>,
  },
  {
    working: <b>Biodiesel and petrodiesel have different viscosities.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (4%) overlooks the polar ester group in biodiesel. Note that the report&rsquo;s comment compares biodiesel with &lsquo;petrol&rsquo;, although the question is about petrodiesel; the argument is the same, because petrodiesel is also made of non-polar hydrocarbon molecules that are smaller than biodiesel&rsquo;s.</>,
  },
]

export default function ChemistryQ2_2021() {
  return (
    <MCQShell
      question={<p>Biodiesel and petrodiesel</p>}
      options={[
        { letter: 'A', content: <>have different viscosities.</>, isAnswer: true },
        { letter: 'B', content: <>have the same environmental impact.</> },
        { letter: 'C', content: <>contain molecules with no polar groups.</> },
        { letter: 'D', content: <>will flow easily through fuel lines in very cold climate conditions.</> },
      ]}
      background={
        <Background>
          <p>
            A physical property such as viscosity, boiling point or ease of flow in the cold comes
            down to the <b>intermolecular forces</b> between the molecules: dispersion forces
            (larger for bigger molecules), plus dipole–dipole forces when the molecule has polar
            bonds. Compare the two fuels&rsquo; molecules — size and polarity — and the properties follow.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
