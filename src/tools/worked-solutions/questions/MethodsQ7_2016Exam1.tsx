// 2016 Mathematical Methods — Exam 1, Question 7 (3 marks).
// Two assembly lines with different fault rates: total probability, then the reverse
// conditional. Question text transcribed from the original paper (no diagram given).
// Answers checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [39, 15, 46],
  average: 1.1,
  comment: (
    <>
      While a tree was not required to answer the question, it may have assisted some
      students to determine the two required cases. Many students stated probabilities
      greater than <Katex tex="1" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [68, 32],
  average: 0.3,
  comment: (
    <>
      In general the conditional probability was recognised but not the reduced sample
      space. Often the instruction regarding the form of the final answer was overlooked.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A) = \frac{40}{90} = \frac49, \qquad \Pr(B) = \frac{50}{90} = \frac59" />,
    reason: <>The motor is chosen from all <Katex tex="90" /> produced, so the two lines are not equally likely. Treating them as <Katex tex="\tfrac12" /> each is the first thing to avoid.</>,
  },
  {
    working: <Katex display tex="\Pr(F\mid A) = \frac{1}{20}, \qquad \Pr(F\mid B) = \frac{2}{25}" />,
    reason: <><Katex tex="5\%" /> and <Katex tex="8\%" /> as fractions.</>,
  },
  {
    working: <Katex display tex="\Pr(F) = \Pr(A)\Pr(F\mid A)+\Pr(B)\Pr(F\mid B)" />,
    reason: <>The law of total probability: every faulty motor came from one line or the other, and the two cases are mutually exclusive.</>,
  },
  {
    working: <Katex display tex="= \frac49\times\frac{1}{20}+\frac59\times\frac{2}{25} = \frac{1}{45}+\frac{2}{45}" />,
    reason: <>Both simplify onto the same denominator, which is a hint that the answer is tidy.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(F) = \frac{3}{45} = \frac{1}{15}}" />,
    reason: <>So <Katex tex="b=15" />. About <Katex tex="6.7\%" />, which sits between the two line rates of <Katex tex="5\%" /> and <Katex tex="8\%" /> — exactly where a weighted average should be, and a quick guard against the "probabilities greater than 1" the report mentions.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\mid F) = \frac{\Pr(A\cap F)}{\Pr(F)}" />,
    reason: <>The question reverses the conditioning: we know the motor is faulty and want the line, not the other way round.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap F) = \frac49\times\frac{1}{20} = \frac{1}{45}" />,
    reason: <>The first of the two terms already computed in part (a) — no new work.</>,
  },
  {
    working: <Katex display tex="\Pr(A\mid F) = \frac{\frac{1}{45}}{\frac{1}{15}} = \frac{1}{45}\times\frac{15}{1}" />,
    reason: <>Dividing by a fraction. The denominator is the <em>reduced</em> sample space — only the faulty motors — which the report says students often failed to use.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A\mid F) = \frac13}" />,
    reason: <>So <Katex tex="c=3" />. Sensible: Line A makes <Katex tex="44\%" /> of the motors but has the lower fault rate, so it accounts for less than half of the faults.</>,
  },
]

export default function MethodsQ7_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (3 marks)</p>
        <p>
          A company produces motors for refrigerators. There are two assembly lines, Line A
          and Line B. <Katex tex="5\%" /> of the motors assembled on Line A are faulty and{' '}
          <Katex tex="8\%" /> of the motors assembled on Line B are faulty. In one hour,{' '}
          <Katex tex="40" /> motors are produced from Line A and <Katex tex="50" /> motors
          are produced from Line B. At the end of an hour, one motor is selected at random
          from all the motors that have been produced during that hour.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            What is the probability that the selected motor is faulty? Express your answer
            in the form <Katex tex="\dfrac1b" />, where <Katex tex="b" /> is a positive
            integer.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Forwards, then backwards">
          <p>
            Part (a) runs the tree forwards: given the line, what is the chance of a fault?
            Weight each branch by how many motors that line makes and add.
          </p>
          <p>
            Part (b) runs it backwards: given a fault, what is the chance of the line? That
            needs <Katex tex="\Pr(A\mid F)=\dfrac{\Pr(A\cap F)}{\Pr(F)}" />, and both pieces
            were already computed in part (a) — the numerator is one of the two products, the
            denominator is their sum.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            The selected motor is found to be faulty. What is the probability that it was
            assembled on Line A? Express your answer in the form <Katex tex="\dfrac1c" />,
            where <Katex tex="c" /> is a positive integer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
