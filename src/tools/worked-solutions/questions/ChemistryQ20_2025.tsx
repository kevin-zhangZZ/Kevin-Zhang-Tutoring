// 2025 Chemistry Exam, MCQ 20. VCAA examination report: 64% correct. Identifying the most likely
// source of the scatter about the line of best fit in a vitamin C / iodine clock-reaction
// experiment (random versus systematic error). Question text transcribed from the original paper;
// the time-versus-volume graph is cropped from the original VCAA exam PDF. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2025-mcq20-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 64, B: 9, C: 17, D: 9 },
  answer: 'A',
  comment: (
    <>
      The variability in the graph must be due to random error, as data points lie both above and
      below the line of best fit. There is no reference line, so systematic errors cannot be
      established.
      <br />
      The greatest source of random error will be the subjective observation of when the colour
      change has occurred.
      <br />
      Options B and C would produce a systematic error in the data.
      <br />
      Option D would not produce any significant random errors without the temperature being
      increased significantly for some experiments and decreased significantly for others.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The two repeat points at each volume differ (e.g. about 17 s and 20 s at 10.0 mL), and the points lie <b>both above and below</b> the line of best fit.</>,
    reason: <>&ldquo;Variability&rdquo; means the scatter of the points about the trend line.</>,
  },
  {
    working: <>Scatter in both directions → <b>random error</b>.</>,
    reason: <><b>Random errors</b> vary unpredictably from one trial to the next, pushing a result sometimes too high and sometimes too low — that produces scatter. <b>Systematic errors</b> push every result the same way (all too high or all too low) by a consistent amount, so they shift the whole data set rather than scattering it. With no true or reference line on the graph, a systematic error couldn&rsquo;t be seen here anyway.</>,
  },
  {
    working: <>A: deciding by eye the moment the colour changes — the judgement is slightly early in some trials and slightly late in others → <b>random</b>.</>,
    reason: <>A subjective human judgement differs every time it is made, so it gives random error — and it applies to every single trial, so it is the most likely cause of the scatter.</>,
  },
  {
    working: <>B: iodine left in the pipette tip; C: some of the tablet not dissolving → <b>systematic</b>.</>,
    reason: <>The vitamin C solution is prepared once, then diluted for each trial. If some tablet doesn&rsquo;t dissolve or some iodine stays in the pipette, every portion taken from that solution carries the same error, so all the results shift the same way rather than scattering.</>,
  },
  {
    working: <>D: room temperature drifting during the experiment → only small effects.</>,
    reason: <>The room temperature changes little over a lab session, so it would not produce noticeable scatter unless it rose significantly for some trials and fell significantly for others.</>,
  },
  {
    working: <b>The scatter is random error, most likely from judging when the colour change occurs.</b>,
    reason: <>Matches option <b>A</b>. Options <b>B</b> and <b>C</b> would cause systematic errors, which shift results in one direction rather than scattering them; option <b>D</b> would not cause significant variation in a typical lab.</>,
  },
]

export default function ChemistryQ20_2025() {
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
          <p className="mb-3">Irfan repeats the experiment twice for each concentration.</p>
          <p className="mb-2">
            A graph showing the time for a colour change to occur versus the amount of deionised
            water added is shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphSrc}
              alt="Graph of time for a colour change to occur (s) against amount of deionised water added (mL), 0.0 to 40.0 mL, with two crosses at each volume scattered either side of a straight line of best fit rising from about 12 s to about 35 s — from the original 2025 VCAA exam paper"
              className="w-full max-w-[420px]"
            />
          </div>
          <p>
            Which one of the following factors is most likely responsible for the variability shown
            in the graph above?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'judging when the colour change occurs', isAnswer: true },
        { letter: 'B', content: 'volume of iodine remaining in the tip of the plastic pipette' },
        { letter: 'C', content: 'some of the vitamin C tablet not completely dissolving' },
        { letter: 'D', content: 'changes in the laboratory room temperature during the experiment' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
