// 2025 Chemistry Exam, MCQ 19. VCAA examination report: 34% correct. Ranking four pieces of
// laboratory glassware by resolution (the smallest scale division each can read), from lowest to
// highest. Question text transcribed from the original paper; the glassware diagram is
// summarised by the scale markings each instrument actually shows. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 21, C: 34, D: 25 },
  answer: 'C',
  comment: (
    <>
      An instrument with a higher resolution can detect smaller changes in a measured quantity,
      allowing measurements to be recorded in finer increments. The 50 mL beaker has a resolution
      of 10 mL, the 50 mL measuring cylinder has a resolution of 1 mL, the 10 mL measuring
      cylinder has a resolution of 0.2 mL, and the 3 mL pipette has a resolution of 0.5 mL.
      Therefore the 10 mL measuring cylinder has the highest resolution, and the 50 mL beaker has
      the lowest.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>"Resolution" here means the smallest scale division marked on the instrument — the finer the gaps between marked lines, the higher the resolution, regardless of how large the instrument's total capacity is.</>,
    reason: "Resolution isn't about total volume — a small instrument can easily out-resolve a much bigger one.",
  },
  {
    working: <>The <b>50 mL beaker</b> is marked only every 10 mL (50, 40, 30, 20, 10) — resolution <b>10 mL</b>, by far the coarsest of the four despite holding the most liquid.</>,
    reason: 'Beakers are approximate-volume glassware, never precision instruments.',
  },
  {
    working: <>The <b>50 mL measuring cylinder</b> is marked every 1 mL between its major 10 mL gradations — resolution <b>1 mL</b>.</>,
    reason: 'Finer than the beaker, but still coarse compared to the smaller glassware.',
  },
  {
    working: <>The <b>3 mL graduated plastic pipette</b> is marked in steps of 0.5 mL (3.0, 2.5, …) — resolution <b>0.5 mL</b>.</>,
    reason: 'A small pipette packs finer gradations into a smaller total range.',
  },
  {
    working: <>The <b>10 mL measuring cylinder</b> is marked in steps of 0.2 mL (10, 9, … with fine sub-divisions) — resolution <b>0.2 mL</b>, the finest of all four.</>,
    reason: 'Smaller cylinders are typically graduated more finely than larger ones of the same type.',
  },
  {
    working: <>Ordering from lowest to highest resolution: 50 mL beaker (10 mL) &lt; 50 mL measuring cylinder (1 mL) &lt; 3 mL pipette (0.5 mL) &lt; 10 mL measuring cylinder (0.2 mL).</>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ19_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Four pieces of laboratory glassware are shown, each with its own scale markings: a
            50 mL beaker marked every 10 mL, a 50 mL measuring cylinder marked every 1 mL, a
            10 mL measuring cylinder marked every 0.2 mL, and a 3 mL graduated plastic pipette
            marked every 0.5 mL.
          </p>
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
