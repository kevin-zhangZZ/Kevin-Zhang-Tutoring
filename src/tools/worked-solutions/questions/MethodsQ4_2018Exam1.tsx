// 2018 Mathematical Methods — Exam 1, Question 4 (2 marks). Symmetry of the normal
// distribution, then standardising a tail probability into the standard normal. Question text
// transcribed from the original paper (no diagram given). Answers checked against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was well answered, with students recognising and applying symmetry of the
      normal distribution about the mean.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      Most students understood what was required as evident by the sketch graphs of the normal
      distribution and relevant areas. Some students did not standardise and left their answer
      as <Katex tex="5" /> or mistook the variance to be the standard deviation, resulting in
      an answer of <Katex tex="-\tfrac14" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim N\!\left(6,\ 4\right) \implies \mu = 6" />,
    reason: <>The mean is <Katex tex="6" />. (The <Katex tex="4" /> is the <em>variance</em>, so the standard deviation is <Katex tex="\sqrt4=2" /> — that matters in part b., not here.)</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>6) = \frac12}" />,
    reason: <>A normal distribution is symmetric about its mean, so exactly half the area lies above <Katex tex="\mu" />. No standardising, no calculator — <Katex tex="6" /> <em>is</em> the mean.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\sigma = \sqrt{\operatorname{Var}(X)} = \sqrt4 = 2" />,
    reason: <>The question gives the variance. Using <Katex tex="4" /> as the standard deviation gives <Katex tex="\Pr\left(Z>\tfrac14\right)" /> and the wrong answer <Katex tex="b=-\tfrac14" /> that the report describes.</>,
  },
  {
    working: <Katex display tex="Z = \frac{X-\mu}{\sigma} = \frac{X-6}{2}" />,
    reason: <>Standardising converts any normal variable into the standard normal <Katex tex="Z" />, which is what the question's right-hand side is written in.</>,
  },
  {
    working: <Katex display tex="\Pr(X>7) = \Pr\!\left(Z > \frac{7-6}{2}\right) = \Pr\!\left(Z>\frac12\right)" />,
    reason: <><Katex tex="7" /> sits half a standard deviation above the mean. Skipping this step is the report's other error: symmetry alone gives <Katex tex="\Pr(X>7)=\Pr(X<5)" />, and some students left their answer as <Katex tex="5" /> — but that is still a value of <Katex tex="X" />, not of <Katex tex="Z" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(Z>\tfrac12\right) = \Pr\!\left(Z<-\tfrac12\right)" />,
    reason: <>The standard normal is symmetric about <Katex tex="0" />, so an upper tail beyond <Katex tex="\tfrac12" /> has the same area as the lower tail below <Katex tex="-\tfrac12" />. The question wants the probability written as <Katex tex="\Pr(Z<b)" />, which forces this flip.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -\frac12}" />,
    reason: <>Negative, as it must be: <Katex tex="\Pr(X>7)<\tfrac12" />, so the matching left tail has to sit below the mean of <Katex tex="Z" />. (<Katex tex="\Pr(Z<-0.5)\approx0.309" />.)</>,
  },
]

export default function MethodsQ4_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (2 marks)</p>
        <p>
          Let <Katex tex="X" /> be a normally distributed random variable with a mean of{' '}
          <Katex tex="6" /> and a variance of <Katex tex="4" />. Let <Katex tex="Z" /> be a
          random variable with the standard normal distribution.
        </p>
      </div>

      <PartCard letter="a" topic="Normal Symmetry" marks={1} statement={<>Find <Katex tex="\Pr(X>6)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Standardising"
        marks={1}
        statement={<>Find <Katex tex="b" /> such that <Katex tex="\Pr(X>7)=\Pr(Z<b)" />.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            This is an Exam 1 question, so there is no calculator and no numerical answer
            wanted — only the <Katex tex="z" />-value. Two things have to happen: standardise
            (which needs <Katex tex="\sigma" />, not the variance), and flip the tail (because
            the question asks for <Katex tex="\Pr(Z<b)" />, a <em>lower</em> tail, while{' '}
            <Katex tex="\Pr(X>7)" /> is an upper one).
          </p>
          <p>
            A quick sketch of the bell curve with both tails shaded makes the sign of{' '}
            <Katex tex="b" /> obvious and is what the report says most students drew.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
