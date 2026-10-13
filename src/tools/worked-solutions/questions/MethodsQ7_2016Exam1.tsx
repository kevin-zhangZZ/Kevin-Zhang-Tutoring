// 2016 Mathematical Methods — Exam 1, Question 7 (3 marks).
// Two assembly lines with different fault rates: total probability, then the reverse
// conditional. Question text transcribed from the original paper (no diagram given).
// Answers checked against the VCAA examination report. Solution is original.
// Interactive: part b. only (32% full marks) — the 90 motors, the 6 faulty ones, then the reduced
// sample space. Part a. (46%) does not qualify.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const FaultyWidget = lazyWidget(() => import('../interactives/meth-2016e1-q7b-faulty'))

const EXAM_A: SAExaminerStats = {
  marks: [39, 15, 46],
  average: 1.1,
  comment: (
    <>
      While a tree was not a required to answer the question, it may have assisted some
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
    reason: <>The motor is chosen from all <Katex tex="90" /> produced, so each line&apos;s chance is its share of the <Katex tex="90" />, not <Katex tex="\tfrac12" /> each.</>,
  },
  {
    working: <Katex display tex="\Pr(F\mid A) = \frac{1}{20}, \qquad \Pr(F\mid B) = \frac{2}{25}" />,
    reason: <><Katex tex="5\%" /> and <Katex tex="8\%" /> as fractions. Each is a fault rate <em>given</em> the line, so it is a conditional probability.</>,
  },
  {
    working: <Katex display tex="\Pr(F) = \Pr(A)\Pr(F\mid A)+\Pr(B)\Pr(F\mid B)" />,
    reason: <>A faulty motor came from Line A or Line B, never both. Each case is <Katex tex="\Pr(\text{line})\Pr(F\mid\text{line})=\Pr(\text{line}\cap F)" />; add the two cases.</>,
    more: (
      <>
        This is a tree diagram written as one line, which the report says may have helped students find the two cases. First branches: <Katex tex="A" /> with{' '}
        <Katex tex="\tfrac49" />, <Katex tex="B" /> with <Katex tex="\tfrac59" />. From each, a branch to <Katex tex="F" />{' '}
        (<Katex tex="\tfrac1{20}" /> or <Katex tex="\tfrac2{25}" />) and to <Katex tex="F'" />. Multiply along each path ending
        in <Katex tex="F" />, then add the two paths.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac49\times\frac{1}{20}+\frac59\times\frac{2}{25}" />,
    reason: <>Substitute the four values from the rows above.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{45}+\frac{2}{45}" />,
    reason: <>Cancel before multiplying: <Katex tex="\tfrac{4}{9\times20}=\tfrac{1}{9\times5}" /> and <Katex tex="\tfrac{5\times2}{9\times25}=\tfrac{2}{9\times5}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(F) = \frac{3}{45} = \frac{1}{15}}" />,
    reason: <>So <Katex tex="b=15" />. Simplify <Katex tex="\tfrac{3}{45}" /> fully to reach the form <Katex tex="\tfrac1b" />.</>,
    more: (
      <>
        Check: <Katex tex="\tfrac1{15}\approx6.7\%" /> sits between the two line rates of <Katex tex="5\%" /> and{' '}
        <Katex tex="8\%" />, as a weighted average of them must. The report says many students stated probabilities greater
        than <Katex tex="1" />; any answer outside <Katex tex="[0,1]" /> — or here, outside <Katex tex="[5\%,8\%]" /> — shows
        a slip before you move on. In counts: <Katex tex="5\%" /> of <Katex tex="40" /> is <Katex tex="2" /> and{' '}
        <Katex tex="8\%" /> of <Katex tex="50" /> is <Katex tex="4" />, so on average <Katex tex="6" /> of the{' '}
        <Katex tex="90" /> are faulty, and <Katex tex="\tfrac6{90}=\tfrac1{15}" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\mid F) = \frac{\Pr(A\cap F)}{\Pr(F)}" />,
    reason: <>&ldquo;Found to be faulty&rdquo; is the condition: we know the motor is faulty and want the line, the reverse of the rates given.</>,
    more: (
      <>
        So the answer is not <Katex tex="\Pr(F\mid A)=\tfrac1{20}" />: that is the chance a Line A motor is faulty, while
        part (b) asks the chance a faulty motor is from Line A. The event after the bar is the one you know has happened.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(A\cap F) = \frac49\times\frac{1}{20} = \frac{1}{45}" />,
    reason: <>From Line A <em>and</em> faulty: <Katex tex="\Pr(A)\Pr(F\mid A)" />, the first term of part (a)&apos;s sum.</>,
  },
  {
    working: <Katex display tex="\Pr(A\mid F) = \frac{\frac{1}{45}}{\frac{1}{15}} = \frac{1}{45}\times\frac{15}{1}" />,
    reason: <>Divide by <Katex tex="\Pr(F)" />: given faulty, only the faulty motors are possible, so they are the new (reduced) sample space.</>,
    more: (
      <>
        The report says the conditional probability was generally recognised but not the reduced sample space. Stopping at{' '}
        <Katex tex="\tfrac1{45}" /> counts Line A&apos;s faulty motors out of <em>all</em> the motors. In counts: on average{' '}
        <Katex tex="2" /> of the <Katex tex="6" /> faulty motors come from Line A, so the answer is{' '}
        <Katex tex="\tfrac26" />; dividing <Katex tex="\tfrac2{90}" /> by <Katex tex="\tfrac6{90}" /> is exactly that.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(A\mid F) = \frac13}" />,
    reason: <>So <Katex tex="c=3" />. The answer must be in the form <Katex tex="\tfrac1c" />, so cancel <Katex tex="\tfrac{15}{45}" /> fully.</>,
    more: (
      <>
        The report notes the required form of the answer was often overlooked. Check: Line A makes{' '}
        <Katex tex="\tfrac49\approx44\%" /> of the motors but has the lower fault rate, so it should account for less than
        half of the faulty ones — and <Katex tex="\tfrac13" /> is.
      </>
    ),
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
        topic="Total Probability"
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
            Part (b) runs it backwards: given a fault, what is the chance of the line?
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
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
        <Explore title="Given faulty, only the 6 faulty motors count — and 2 of them are from Line A">
          <FaultyWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
