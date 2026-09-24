// 2017 Mathematical Methods — Exam 1, Question 5 (4 marks).
// Repeated independent attempts at a password, at most three. Question text transcribed
// from the original paper (no diagram given). Answers verified with sympy. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.6,
  comment: <>Students clearly identified what was required but some students erred with the arithmetic evaluation.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 66],
  average: 0.6,
  comment: (
    <>
      Students generally recognised that the solution was the complement of their answer to
      part a. Others used a tree diagram to identify all possibilities for Jac to log on
      successfully.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 24, 50],
  average: 1.1,
  comment: (
    <>
      Many students who struggled with previous parts of the question generally made use of a
      tree diagram to find the two required cases. Common errors included use of conditional
      probability, use of binomial theorem or not realising that once Jac logged in, there was
      no need to keep attempting (three cases).
      <br />
      <br />
      A small number of students recognised that Pr(success on second or third attempt) =
      Pr(success) – Pr(success on the first attempt) ={' '}
      <Katex tex="\tfrac{98}{125}-\tfrac25=\tfrac{48}{125}" />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{fail}) = 1-\tfrac25 = \tfrac35" />,
    reason: <>One attempt fails with probability <Katex tex="\tfrac35" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{no success}) = \left(\frac35\right)^{3}" />,
    reason: <>All three attempts must fail, and the attempts are independent, so the probabilities multiply.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{27}{125}}" />,
    reason: <>About <Katex tex="0.216" /> — roughly a one-in-five chance of being locked out, which is plausible for three shots at a <Katex tex="40\%" /> chance each.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{success}) = 1 - \Pr(\text{no success})" />,
    reason: <>Success and no success are complements, so this is just part (a) subtracted from <Katex tex="1" />. There is no need to add the three separate success cases.</>,
  },
  {
    working: <Katex display tex="= 1 - \frac{27}{125}" />,
    reason: <>Directly from part (a).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{98}{125}}" />,
    reason: <>In the required form <Katex tex="\tfrac{a}{b}" /> with <Katex tex="a=98" /> and <Katex tex="b=125" /> both positive integers.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(FS) = \frac35\times\frac25 = \frac{6}{25}" />,
    reason: <>Success on the second attempt means fail then succeed — and then Jac stops, so there is no third factor.</>,
  },
  {
    working: <Katex display tex="\Pr(FFS) = \frac35\times\frac35\times\frac25 = \frac{18}{125}" />,
    reason: <>Success on the third attempt means fail, fail, succeed.</>,
  },
  {
    working: <Katex display tex="\Pr(FS)+\Pr(FFS) = \frac{30}{125}+\frac{18}{125}" />,
    reason: <>The two cases are mutually exclusive, so add. Common denominator <Katex tex="125" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{48}{125}}" />,
    reason: (
      <>
        So <Katex tex="c=48" /> and <Katex tex="d=125" />. A neat check, which the report says
        a small number of students used: part (b) minus the chance of succeeding first go,{' '}
        <Katex tex="\tfrac{98}{125}-\tfrac{2}{5}=\tfrac{98-50}{125}=\tfrac{48}{125}" />.
      </>
    ),
  },
]

export default function MethodsQ5_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          For Jac to log on to a computer successfully, Jac must type the correct password.
          Unfortunately, Jac has forgotten the password. If Jac types the wrong password, Jac
          can make another attempt. The probability of success on any attempt is{' '}
          <Katex tex="\tfrac25" />. Assume that the result of each attempt is independent of
          the result of any other attempt. A maximum of three attempts can be made.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Independent Events"
        marks={1}
        statement={<>What is the probability that Jac does not log on to the computer successfully?</>}
        examinerReport={EXAM_A}
      >
        <Background title="Why this is not a binomial question">
          <p>
            It looks binomial — repeated independent trials with a fixed success probability —
            but it is not, because Jac <em>stops</em> as soon as the password works. There is
            no such thing as "two successes in three attempts" here.
          </p>
          <p>
            The outcomes are really <Katex tex="S" />, <Katex tex="FS" />,{' '}
            <Katex tex="FFS" /> and <Katex tex="FFF" /> — four branches of a tree, not four
            terms of a binomial expansion. The report lists "use of binomial theorem" as a
            common error in part (c) for exactly this reason.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complement"
        marks={1}
        statement={
          <>
            Calculate the probability that Jac logs on to the computer successfully. Express
            your answer in the form <Katex tex="\dfrac{a}{b}" />, where <Katex tex="a" /> and{' '}
            <Katex tex="b" /> are positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independent Events"
        marks={2}
        statement={
          <>
            Calculate the probability that Jac logs on to the computer successfully on the
            second or on the third attempt. Express your answer in the form{' '}
            <Katex tex="\dfrac{c}{d}" />, where <Katex tex="c" /> and <Katex tex="d" /> are
            positive integers.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
