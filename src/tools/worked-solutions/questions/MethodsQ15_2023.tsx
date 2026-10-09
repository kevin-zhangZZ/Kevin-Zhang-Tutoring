// 2023 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 65% correct.
// Reading two normal curves off their means and standard deviations. Question text transcribed from the original paper;
// the five option diagrams and the key are cropped from the original VCAA exam PDF (option letters masked).
// Solution is original.
// Oct 2026 Concise/Detailed pass (no widget: 65% correct, not a qualifying part): option analysis in the last
// row moved to `more` and refocused on C (right centres, wrong spread); peak-height formula added as row 3's `more`.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import keySrc from './meth-2023-mcq15-key.png'
import optASrc from './meth-2023-mcq15-optA.png'
import optBSrc from './meth-2023-mcq15-optB.png'
import optCSrc from './meth-2023-mcq15-optC.png'
import optDSrc from './meth-2023-mcq15-optD.png'
import optESrc from './meth-2023-mcq15-optE.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img loading="lazy" decoding="async" src={src} alt={alt} className="w-full max-w-[300px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 6, C: 17, D: 4, E: 6 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mu_Y = 80 < 100 = \mu_X" />,
    reason: <>The key shows <Katex tex="X" /> dashed and <Katex tex="Y" /> solid. A normal curve peaks at its mean, so the solid curve must peak to the <em>left</em> of the dashed curve.</>,
  },
  {
    working: <Katex display tex="\sigma_Y = 10 < 20 = \sigma_X" />,
    reason: <>The standard deviation measures spread: a smaller one keeps the values closer to the mean. So the solid curve must be the narrower of the two.</>,
  },
  {
    working: <Katex display tex="\text{area under each} = 1 \implies \text{narrower} \Rightarrow \text{taller}" />,
    reason: <>Every probability density function encloses a total area of 1. A curve half as wide must be twice as tall to hold the same area, so the solid curve must also be the taller one.</>,
    more: (
      <>
        You can see this in the formula too. Putting <Katex tex="x=\mu" /> into the normal density gives a peak height of{' '}
        <Katex tex="\tfrac{1}{\sigma\sqrt{2\pi}}" />, so halving <Katex tex="\sigma" /> doubles the peak: about{' '}
        <Katex tex="0.040" /> for <Katex tex="Y" /> against <Katex tex="0.020" /> for <Katex tex="X" />. In diagram A the
        solid peak is indeed about twice as high as the dashed one.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A}&:\ \text{all three}\ \checkmark\\ \text{B}&:\ \text{solid on right}\ \times\\ \text{C}&:\ \text{solid wider}\ \times\\ \text{D}&:\ \text{same width}\ \times\\ \text{E}&:\ \text{solid wider}\ \times\end{aligned}" />,
    reason: <>Check the solid curve in each diagram against the three features: left of, narrower than and taller than the dashed curve. One failed feature rules a diagram out.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Matches option <b>A</b>, the only diagram with all three features.</>,
    more: (
      <>
        Option <b>C</b>, the most popular wrong answer, gets the centres right but draws the solid curve low and wide.
        That is the shape for a standard deviation of <Katex tex="20" />, which belongs to <Katex tex="X" />, not{' '}
        <Katex tex="Y" />. So checking where the peaks sit is not enough: check which curve is narrower, and the height
        follows from that. <b>E</b> is diagram A with the solid and dashed lines swapped, as if the key were read the wrong way round.
      </>
    ),
  },
]

export default function MethodsQ15_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="X" /> be a normal random variable with mean of 100 and standard
            deviation of 20. Let <Katex tex="Y" /> be a normal random variable with mean of 80
            and standard deviation of 10.
            <br />
            Which of the diagrams below best represents the probability density functions for{' '}
            <Katex tex="X" /> and <Katex tex="Y" />, plotted on the same set of axes?
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-2 w-fit">
            <img loading="lazy" decoding="async"
              src={keySrc}
              alt="Key: a dashed line for X and a solid line for Y — from the original 2023 VCAA exam paper"
              className="w-full max-w-[80px]"
            />
          </div>
        </div>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: a tall, narrow solid curve peaking to the left of a lower, wider dashed curve" />, isAnswer: true },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: a tall, narrow solid curve peaking to the right of a lower, wider dashed curve" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: a low, wide solid curve peaking to the left of a taller, narrower dashed curve" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: solid and dashed curves of the same height and spread, the solid one to the left" /> },
        { letter: 'E', content: <Panel src={optESrc} alt="Option E: a taller, narrower dashed curve peaking to the left of a lower, wider solid curve" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
