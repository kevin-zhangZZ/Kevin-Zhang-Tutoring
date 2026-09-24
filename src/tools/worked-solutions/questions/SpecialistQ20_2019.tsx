// 2019 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 70% correct. The
// p value for a one-sided test on a sample mean. Question text transcribed from the original
// paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 70, C: 13, D: 7, E: 4 },
  noAnswer: 1,
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X} \sim N\!\left(0.5,\ \dfrac{0.2887^2}{100}\right), \qquad \text{sd}\left(\overline{X}\right) = \dfrac{0.2887}{\sqrt{100}} = 0.02887" />,
    reason: <>Under <Katex tex="H_0" /> the population mean is <Katex tex="0.5" />; the sample mean of <Katex tex="100" /> values has standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />.</>,
  },
  {
    working: <Katex display tex="p = \Pr\left(\overline{X}\le0.4725 \mid \mu=0.5\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a sample mean at least this extreme, assuming <Katex tex="H_0" /> is true. Because <Katex tex="H_1:\mu<0.5" />, "extreme" means <em>small</em> — one tail only, so there is no doubling here.</>,
  },
  {
    working: <Katex display tex="z = \dfrac{0.4725-0.5}{0.02887} = \dfrac{-0.0275}{0.02887} \approx -0.9525" />,
    reason: <>Standardising. The sample mean is only about one standard deviation below the claimed mean.</>,
  },
  {
    working: <Katex display tex="p = \Pr(Z<-0.9525) \approx 0.1704" />,
    reason: <>Standard normal lower tail, e.g. <Katex tex="\operatorname{normCdf}(-\infty,-0.9525,0,1)" />, or directly <Katex tex="\Pr\left(\overline X<0.4725\right)" /> with mean <Katex tex="0.5" /> and standard deviation <Katex tex="0.02887" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.1704}" />,
    reason: <>Matches option <b>B</b>. Watch option <b>E</b>, <Katex tex="0.9525" /> — that is the magnitude of the <Katex tex="z" /> value, not a probability. Option <b>D</b> <Katex tex="(0.8296)" /> is the upper-tail probability, i.e. the complement. Option <b>C</b> <Katex tex="(0.4621)" /> uses <Katex tex="\sigma" /> instead of <Katex tex="\tfrac{\sigma}{\sqrt n}" />, and option <b>A</b> <Katex tex="(0.0953)" /> is the size of that <Katex tex="z" /> value. Since <Katex tex="p>0.05" />, this sample gives no real evidence the generator is faulty.</>,
  },
]

export default function SpecialistQ20_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The random number function of a calculator is designed to generate random numbers
            that are uniformly distributed from <Katex tex="0" /> to <Katex tex="1" />. When
            working properly, a calculator generates random numbers from a population where{' '}
            <Katex tex="\mu=0.5" /> and <Katex tex="\sigma=0.2887" />
          </p>
          <p>
            When checking the random number function of a particular calculator, a sample of{' '}
            <Katex tex="100" /> random numbers was generated and was found to have a mean of{' '}
            <Katex tex="\overline{x}=0.4725" />
            <br />
            Assuming <Katex tex="H_0:\mu=0.5" /> and{' '}
            <Katex tex="H_1:\mu<0.5" />, and <Katex tex="\sigma=0.2887" />, the <Katex tex="p" />{' '}
            value for a one-sided test is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0953" /> },
        { letter: 'B', content: <Katex tex="0.1704" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.4621" /> },
        { letter: 'D', content: <Katex tex="0.8296" /> },
        { letter: 'E', content: <Katex tex="0.9525" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
