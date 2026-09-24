// 2025 Chemistry Exam, MCQ 19. VCAA examination report: 34% correct. Ranking four pieces of
// laboratory glassware by resolution (the smallest scale division each can read), from lowest to
// highest. Question text transcribed from the original paper; the glassware diagram (with its
// zoomed-in scale callouts) is cropped directly from the original VCAA exam PDF, not a
// redrawing. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import glasswareSrc from './chem-2025-mcq19-glassware.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 21, C: 34, D: 25 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Students struggled with the term &lsquo;resolution&rsquo; when it was used both as a numerical
      value and as a conceptual property of a measuring instrument. An instrument with a higher
      resolution can detect smaller changes in a measured quantity, allowing measurements to be
      recorded in finer increments.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The 50 mL beaker has a resolution of 10 mL.</li>
        <li>The 50 mL measuring cylinder has a resolution of 1 mL.</li>
        <li>The 10 mL measuring cylinder has a resolution of 0.2 mL.</li>
        <li>The 3 mL pipette has a resolution of 0.5 mL.</li>
      </ul>
      Therefore the 10 mL measuring cylinder has a highest resolution compared to the 50 mL beaker,
      which has the lowest resolution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>&ldquo;Resolution&rdquo; here is set by the smallest scale division marked on each piece of equipment — the finer the divisions, the higher the resolution.</>,
    reason: <>Resolution isn&rsquo;t about total volume: a small instrument can easily out-resolve a much bigger one.</>,
  },
  {
    working: <>The <b>50 mL beaker</b> is marked only every 10 mL (50, 40, 30, 20, 10) — resolution <b>10 mL</b>, by far the coarsest of the four despite holding the most liquid.</>,
    reason: <>Beakers are approximate-volume glassware, never precision instruments.</>,
  },
  {
    working: <>The <b>50 mL measuring cylinder</b> is marked every 1 mL between its major 10 mL gradations — resolution <b>1 mL</b>.</>,
    reason: <>Finer than the beaker, but still coarse compared to the smaller glassware.</>,
  },
  {
    working: <>The <b>3 mL graduated plastic pipette</b> is marked in steps of 0.5 mL (3.0, 2.5, …) — resolution <b>0.5 mL</b>.</>,
    reason: <>A small pipette packs finer gradations into a smaller total range.</>,
  },
  {
    working: <>The <b>10 mL measuring cylinder</b> is marked in steps of 0.2 mL (10, 9, … with fine sub-divisions) — resolution <b>0.2 mL</b>, the finest of all four.</>,
    reason: <>Smaller cylinders are typically graduated more finely than larger ones of the same type.</>,
  },
  {
    working: <>Ordering from lowest to highest resolution: 50 mL beaker (10 mL) &lt; 50 mL measuring cylinder (1 mL) &lt; 3 mL pipette (0.5 mL) &lt; 10 mL measuring cylinder (0.2 mL).</>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by 25%, puts the 3 mL pipette (0.5 mL) above the 10 mL measuring cylinder (0.2 mL).</>,
  },
]

export default function ChemistryQ19_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 19 and 20.</p>
          <p className="mb-2">
            Irfan is conducting an experiment in which two aqueous solutions, hydrogen peroxide,
            H₂O₂, and a vitamin C solution are reacted together in a beaker. This reaction is known
            to have a delayed but obvious colour change.
          </p>
          <p className="mb-2">
            The vitamin C solution is prepared by crushing a vitamin C tablet and dissolving it in
            deionised water, then adding iodine, I₂.
          </p>
          <p className="mb-2">
            Irfan is investigating how changing the concentration of vitamin C in the solution
            affects the time taken for the colour change to occur. The concentration is changed by
            adding different volumes of deionised water to 5.0 mL of the vitamin C solution before
            reacting it with H₂O₂.
          </p>
          <p className="mb-2">Irfan repeats the experiment twice for each concentration.</p>
          <p className="mb-2">Some of the equipment used during the experiment is shown below.</p>
          <div className="mb-2 flex justify-center">
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img src={glasswareSrc} alt="Four pieces of laboratory glassware with zoomed-in scale callouts: a 50 mL beaker marked every 10 mL, a 50 mL measuring cylinder marked every 1 mL, a 10 mL measuring cylinder marked every 0.2 mL, and a 3 mL graduated plastic pipette marked every 0.5 mL, from the original 2025 VCAA exam paper" className="w-full max-w-[420px]" />
            </div>
          </div>
          <p>The resolution of the equipment shown, from lowest to highest, is</p>
        </>
      }
      options={[
        { letter: 'A', content: '3 mL graduated plastic pipette < 10 mL measuring cylinder < 50 mL measuring cylinder < 50 mL beaker' },
        { letter: 'B', content: '10 mL measuring cylinder < 3 mL graduated plastic pipette < 50 mL measuring cylinder < 50 mL beaker' },
        { letter: 'C', content: '50 mL beaker < 50 mL measuring cylinder < 3 mL graduated plastic pipette < 10 mL measuring cylinder', isAnswer: true },
        { letter: 'D', content: '50 mL beaker < 50 mL measuring cylinder < 10 mL measuring cylinder < 3 mL graduated plastic pipette' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
