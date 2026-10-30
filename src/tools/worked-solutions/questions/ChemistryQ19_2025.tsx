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
    working: <>Resolution (as a value) = the smallest scale division marked on the equipment.</>,
    reason: <>The study design defines resolution as the smallest change in a quantity that the instrument can show. Careful: a <b>smaller</b> resolution value (e.g. 0.2 mL) means a <b>higher</b> resolution, because the instrument can show finer changes. Resolution is also nothing to do with how much the vessel holds.</>,
  },
  {
    working: <>Read each scale: find two labelled marks, then count the intervals between them.<br />resolution = (difference between labelled marks) ÷ (number of intervals)</>,
    reason: <>The zoomed-in callouts in the diagram show the fine divisions for the three narrow instruments.</>,
  },
  {
    working: <>The <b>50 mL beaker</b> is marked only every 10 mL (10, 20, 30, 40, 50) — resolution <b>10 mL</b>, the coarsest of the four.</>,
    reason: <>Beakers are approximate-volume glassware, never precision instruments.</>,
  },
  {
    working: <>The <b>50 mL measuring cylinder</b> callout: 10 intervals between the 40 and 50 marks → (50 − 40) mL ÷ 10 = resolution <b>1 mL</b>.</>,
    reason: <>Finer than the beaker.</>,
  },
  {
    working: <>The <b>3 mL graduated plastic pipette</b> callout: 1 interval between the 2.5 and 3.0 marks → (3.0 − 2.5) mL ÷ 1 = resolution <b>0.5 mL</b>.</>,
    reason: <>Finer than the 50 mL cylinder, but coarser than the 10 mL cylinder.</>,
  },
  {
    working: <>The <b>10 mL measuring cylinder</b> callout: 5 intervals between the 9 and 10 marks → (10 − 9) mL ÷ 5 = resolution <b>0.2 mL</b>, the finest of the four.</>,
    reason: <>The smallest division of all, so the highest resolution.</>,
  },
  {
    working: <b>Lowest to highest resolution: 50 mL beaker (10 mL) &lt; 50 mL measuring cylinder (1 mL) &lt; 3 mL pipette (0.5 mL) &lt; 10 mL measuring cylinder (0.2 mL)</b>,
    reason: <>Matches option <b>C</b> — the resolution values get smaller from left to right, so the resolution gets higher. Option <b>D</b> (25%) is the order of decreasing capacity, which assumes the smallest vessel reads most finely; it puts the 3 mL pipette (0.5 mL) above the 10 mL measuring cylinder (0.2 mL). Option <b>B</b> (21%) is the exact reverse of C: it lists the resolution values from smallest number to largest, treating a small value as a low resolution. Option <b>A</b> (19%) is the order of increasing capacity.</>,
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
              <img loading="lazy" decoding="async" src={glasswareSrc} alt="Four pieces of laboratory glassware with zoomed-in scale callouts: a 50 mL beaker marked every 10 mL, a 50 mL measuring cylinder marked every 1 mL, a 10 mL measuring cylinder marked every 0.2 mL, and a 3 mL graduated plastic pipette marked every 0.5 mL, from the original 2025 VCAA exam paper" className="w-full max-w-[420px]" />
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
