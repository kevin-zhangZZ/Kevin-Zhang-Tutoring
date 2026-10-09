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
    reason: <>Both 2 kg blocks hang from the right-hand string, so that side carries <Katex tex="R_1+R_2" />, and the heavier side of a pulley falls.</>,
    more: <>The second string is inextensible, so the two right-hand blocks move together as one body of mass <Katex tex="R_1+R_2" />. The sides balancing exactly, <Katex tex="R_1+R_2=L" />, has probability 0 for continuous variables, so it doesn&rsquo;t matter whether the inequality is strict.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}D = R_1+R_2-L\\ \operatorname{E}(D) = 1.980+1.980-3.940 = 0.020\end{gathered}" />,
    reason: <>Collect everything into one variable: the 4 kg mass moves up exactly when <Katex tex="D>0" />. A linear combination of independent normal variables is itself normal, so it is enough to find the mean and variance of <Katex tex="D" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(D) &= 0.015^2+0.015^2+0.002^2\\ &= 0.000454\end{aligned}" />,
    reason: <>Variances add for independent variables, including the one being subtracted. <Katex tex="R_1" /> and <Katex tex="R_2" /> are two separate masses, so each contributes its own <Katex tex="0.015^2" />.</>,
    more: <><Katex tex="R_1+R_2" /> is not <Katex tex="2R_1" /> (one mass counted twice), whose variance would be <Katex tex="2^2(0.015^2)=4(0.015^2)" />. Doubling one mass doubles its error too, but two separate masses often err in opposite directions and partly cancel, so their total varies less than one mass doubled.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(D>0) &= \Pr\left(Z>\frac{0-0.020}{\sqrt{0.000454}}\right)\\ &= \Pr(Z>-0.9386\ldots)\end{aligned}" />,
    reason: <>Standardising: subtract the mean and divide by the standard deviation, <Katex tex="\sqrt{0.000454}\approx0.0213" />.</>,
  },
  {
    working: <Katex display tex="= 0.82604\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower 0, upper <Katex tex="\infty" />, <Katex tex="\mu=0.020" />, <Katex tex="\sigma=\sqrt{0.000454}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{the 4 kg mass moves up}) \approx 0.826}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>B</b>, 0.747, the most common wrong answer, comes from treating the two blocks as one mass doubled: <Katex tex="\mathrm{Var}(D)=4(0.015^2)+0.002^2=0.000904" /> instead of 0.000454. Option <b>E</b>, 1.000, comes from ignoring the variation: on average the right side (3.960 kg) is heavier than the left (3.940 kg), but not every time. The spread of <Katex tex="D" />, about 0.021 kg, is as big as that 0.020 kg average gap, so the left side is the heavier one about 17% of the time. Options <b>A</b>, 0.546, and <b>D</b>, 0.998, don&rsquo;t match any single common slip, and the same comparison rules them out: with the gap just under one standard deviation, the answer must be a little under <Katex tex="\Pr(Z>-1)\approx0.84" />. A probability near 0.5, like option <b>A</b>, would need a spread many times the gap (using the standard deviations as if they were variances gives 0.545, for instance); one near 1, like option <b>D</b>, would need a spread about a third of the true one.</>,
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
            <img loading="lazy" decoding="async"
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
