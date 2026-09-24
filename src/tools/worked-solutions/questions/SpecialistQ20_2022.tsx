// 2022 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 41% correct. Will a
// pulley's side carrying two "2 kg" masses outweigh a "4 kg" mass, when all three masses are
// normally distributed — a linear combination of independent normal variables. Question text
// transcribed from the original paper; the figure is cropped from the original VCAA exam PDF.
// Classified as Statistics, not Mechanics: the only physics is that the heavier side of a
// pulley falls (KZ's decision, Sept 2026 — it was previously omitted as Mechanics). Answer
// checked with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import pulleySrc from './spec-2022-mcq20-pulley.png'

const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 24, C: 41, D: 12, E: 8 },
  answer: 'C',
  comment: (
    <>
      Requires the probability that the total mass on the right is greater than the total mass
      on the left.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}L\sim\mathrm{N}\left(3.940,\,0.002^2\right)\\ R_1,\,R_2\sim\mathrm{N}\left(1.980,\,0.015^2\right)\end{gathered}" />,
    reason: <>Let <Katex tex="L" /> be the actual mass of the block labelled 4 kg, and <Katex tex="R_1" />, <Katex tex="R_2" /> those of the two blocks labelled 2 kg. They are three randomly selected masses, so they are independent.</>,
  },
  {
    working: <Katex display tex="\text{the 4 kg mass moves up} \iff R_1+R_2>L" />,
    reason: <>Both 2 kg blocks hang from the right-hand string, so that side carries <Katex tex="R_1+R_2" />, and the heavier side of a pulley falls. That is the only physics needed — exactly the report&rsquo;s comment: the total mass on the right must exceed the total on the left.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}D = R_1+R_2-L\\ \operatorname{E}(D) = 1.980+1.980-3.940 = 0.020\end{gathered}" />,
    reason: <>A linear combination of independent normal variables is itself normal, so it is enough to find its mean and variance.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(D) = 0.015^2+0.015^2+0.002^2 = 0.000454" />,
    reason: <>Variances add for independent variables — including the one being subtracted. <Katex tex="R_1+R_2" /> is two separate masses, so its variance is <Katex tex="2(0.015^2)" />; it is not <Katex tex="2R_1" />, whose variance would be <Katex tex="4(0.015^2)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(D>0) &= \Pr\left(Z>\frac{0-0.020}{\sqrt{0.000454}}\right)\\ &= \Pr(Z>-0.9387\ldots)\end{aligned}" />,
    reason: <>Standardising: subtract the mean and divide by the standard deviation, <Katex tex="\sqrt{0.000454}\approx0.0213" />.</>,
  },
  {
    working: <Katex display tex="= 0.82606\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower 0, upper ∞, μ = 0.020, σ = √0.000454.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{the 4 kg mass moves up}) \approx 0.826}" />,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, 0.747, comes from treating the two blocks as one mass doubled (variance <Katex tex="4(0.015^2)" /> instead of <Katex tex="2(0.015^2)" />); option <b>E</b>, 1.000, from ignoring the variation — on average the right side (3.960 kg) is heavier than the left (3.940 kg), but not every time.</>,
  },
]

export default function SpecialistQ20_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A student constructs the following pulley and mass system using three randomly
            selected masses that are labelled 4 kg and 2 kg. The masses are connected by two
            light inextensible strings, one of which passes over a frictionless pulley, as shown
            below. Initially, the mass labelled 4 kg is held at rest.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={pulleySrc}
              alt="A pulley with a single block labelled 4 kg hanging from the left-hand string, and on the right a block labelled 2 kg with a second block labelled 2 kg hanging beneath it on another string — from the original 2022 VCAA exam paper"
              className="w-full max-w-[130px]"
            />
          </div>
          <p className="mb-2">
            Most of the system&rsquo;s components are of high quality, but the labels on the
            masses give only approximations and the actual masses vary, being normally
            distributed with the following parameters.
          </p>
          <table className="mb-3 text-[13.5px] border-collapse">
            <thead>
              <tr>
                <th className={`${TD} font-semibold`}>Labelled mass (kg)</th>
                <th className={`${TD} font-semibold`}>Mean (kg)</th>
                <th className={`${TD} font-semibold`}>Standard deviation (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>2</td>
                <td className={TD}>1.980</td>
                <td className={TD}>0.015</td>
              </tr>
              <tr>
                <td className={TD}>4</td>
                <td className={TD}>3.940</td>
                <td className={TD}>0.002</td>
              </tr>
            </tbody>
          </table>
          <p>
            Correct to three decimal places, the probability that the mass labelled 4 kg moves{' '}
            <b>up</b> after it is released is
          </p>
        </>
      }
      background={
        <p>
          The pulley is scene-setting. The only physics used is that the heavier side of a pulley
          goes down, so the 4 kg block rises exactly when the two 2 kg blocks together outweigh
          it. What is left is a statistics question: the probability that a linear combination
          of independent normal variables is positive.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.546" /> },
        { letter: 'B', content: <Katex tex="0.747" /> },
        { letter: 'C', content: <Katex tex="0.826" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.998" /> },
        { letter: 'E', content: <Katex tex="1.000" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
