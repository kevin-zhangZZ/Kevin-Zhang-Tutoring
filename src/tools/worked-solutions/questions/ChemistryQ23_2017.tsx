// 2017 Chemistry Exam, MCQ 23. VCAA examination report: 49% correct — tied for fourth-hardest
// MCQ on the 2017 paper. Distinguish precision, accuracy, validity and uncertainty in the
// context of a bomb-calorimeter experiment. Question text transcribed from the original paper;
// the apparatus diagram is cropped directly from the original VCAA exam PDF, not a redrawing.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import apparatusSrc from './chem-2017-mcq23-bomb-calorimeter.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 18, C: 28, D: 5 },
  answer: 'A',
  comment: 'Option A is correct, since this removes the error inherent in reading a thermometer.',
}

const ROWS: WorkingRow[] = [
  {
    working: <>A — precision, digital thermometer (±0.2°C): a digital reading removes the human error of reading a scale, so repeated measurements cluster more tightly together.</>,
    reason: <><b>Precision</b> is about how close repeated measurements are to <em>each other</em> — exactly what a more reliable reading method improves. <b>Correct.</b></>,
  },
  {
    working: <>B — validity, heat of combustion per mole: switching units (per gram vs. per mole) doesn't test whether the experiment measures what it claims to.</>,
    reason: <><b>Validity</b> is about the appropriateness of the whole method — but crude oil is a mixture with no single molar mass, so "per mole" doesn't even meaningfully apply here.</>,
  },
  {
    working: <>C — accuracy, sampling from three different sources: accuracy depends on how well the <em>technique</em> matches the true value, not on the number of oil sources tested.</>,
    reason: <>Different crude-oil sources can have genuinely different compositions and heats of combustion — sampling more sources changes <em>what</em> is being measured, not how close to the truth any one measurement is.</>,
  },
  {
    working: <>D — "maximise uncertainty" by following the same procedure: this is backwards — a controlled, consistent procedure across the class would <em>reduce</em> uncertainty, not increase it.</>,
    reason: 'This option is self-contradictory as worded.',
  },
  {
    working: <b>Only option A correctly matches its named concept to what actually improves it.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ23_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The heat of combustion of a sample of crude oil is to be determined using a bomb
            calorimeter. All of the students in a class are given the same method to follow. The
            apparatus used by the students is shown below.
          </p>
          <div className="mb-2 flex justify-center">
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img src={apparatusSrc} alt="Bomb calorimeter apparatus: a sealed vessel with crude oil and excess oxygen, submerged in water in an insulated container, with a thermometer, stirrer, and ignition wire, from the original 2017 VCAA exam paper" className="w-full max-w-[380px]" />
            </div>
          </div>
          <p>For this experiment, the students could maximise</p>
        </>
      }
      options={[
        { letter: 'A', content: 'precision by using a digital thermometer (±0.2°C).', isAnswer: true },
        { letter: 'B', content: 'validity by calculating the heat of combustion per mole.' },
        { letter: 'C', content: 'accuracy by taking samples from three different sources.' },
        { letter: 'D', content: 'uncertainty by having all students closely follow the same experimental procedure.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
