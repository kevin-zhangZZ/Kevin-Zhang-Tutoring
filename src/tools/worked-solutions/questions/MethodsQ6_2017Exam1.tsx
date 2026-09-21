// 2017 Mathematical Methods — Exam 1, Question 6 (3 marks).
// A factorised trig equation, then a "hence" that requires spotting the difference of two
// squares. The hardest question on the paper — 75% scored zero on part (a). Question text
// transcribed from the original paper (no diagram given). Answers verified with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Students struggled to find solutions beyond{' '}
      <Katex tex="\tan(\theta)=1" />. Students are urged to read the question carefully so as
      to recognise what is required. A number of students attempted to find values of{' '}
      <Katex tex="\theta" />, which was not required. Some students who managed to obtain{' '}
      <Katex tex="1" /> and <Katex tex="\sqrt3" /> gave the third value as{' '}
      <Katex tex="\tfrac{1}{\sqrt3}" /> instead of <Katex tex="-\sqrt3" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 34, 25],
  average: 0.5,
  comment: (
    <>
      This question was not handled well. Many students did not follow the instruction
      "Hence", in that they did not connect this equation to part a, but still managed to find
      some solutions.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta)-1=0 \implies \tan(\theta)=1" />,
    reason: <>A product is zero when a factor is zero, so take the three factors one at a time. This first one is immediate.</>,
  },
  {
    working: <Katex display tex="\sin(\theta)-\sqrt3\cos(\theta)=0 \implies \frac{\sin(\theta)}{\cos(\theta)}=\sqrt3" />,
    reason: <>Move the cosine term across and divide both sides by <Katex tex="\cos(\theta)" />. That is the step most students did not see: the second and third factors are also statements about <Katex tex="\tan" />.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=\sqrt3" />,
    reason: <>Since <Katex tex="\tan=\tfrac{\sin}{\cos}" />.</>,
  },
  {
    working: <Katex display tex="\sin(\theta)+\sqrt3\cos(\theta)=0 \implies \tan(\theta)=-\sqrt3" />,
    reason: <>Same move on the third factor, but this time the constant moves across as a negative. The report singles out <Katex tex="\tfrac{1}{\sqrt3}" /> as the popular wrong third answer — that comes from confusing "reciprocal" with "negative".</>,
  },
  {
    working: <Katex display tex="\boxed{\tan(\theta)=1,\ \sqrt3,\ -\sqrt3}" />,
    reason: <>Three values. The question asked for values of <Katex tex="\tan(\theta)" />, not of <Katex tex="\theta" /> — read it twice before writing angles down.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\sin^2(\theta)-3\cos^2(\theta) = \sin^2(\theta)-\bigl(\sqrt3\cos(\theta)\bigr)^2" />,
    reason: <>Writing <Katex tex="3" /> as <Katex tex="(\sqrt3)^2" /> so the expression becomes a difference of two squares. This is the link back to part (a).</>,
  },
  {
    working: <Katex display tex="= \bigl(\sin(\theta)-\sqrt3\cos(\theta)\bigr)\bigl(\sin(\theta)+\sqrt3\cos(\theta)\bigr)" />,
    reason: <><Katex tex="a^2-b^2=(a-b)(a+b)" />. The equation in part (b) is now identical to the one in part (a) — that is what "hence" meant.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=1,\ \sqrt3,\ -\sqrt3" />,
    reason: <>So the solutions are exactly the angles in <Katex tex="[0,\pi]" /> with those three tangents, straight from part (a).</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=1 \implies \theta=\frac{\pi}{4}" />,
    reason: <>The other solution of <Katex tex="\tan(\theta)=1" /> is <Katex tex="\tfrac{5\pi}{4}" />, outside the domain.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=\sqrt3 \implies \theta=\frac{\pi}{3}" />,
    reason: <>The exact value from the <Katex tex="30" />–<Katex tex="60" />–<Katex tex="90" /> triangle.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=-\sqrt3 \implies \theta=\pi-\frac{\pi}{3}=\frac{2\pi}{3}" />,
    reason: <>Tangent is negative in the second quadrant, and the reference angle is still <Katex tex="\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta=\frac{\pi}{4},\ \frac{\pi}{3},\ \frac{2\pi}{3}}" />,
    reason: <>Three solutions in <Katex tex="0\le\theta\le\pi" />. Note <Katex tex="\theta=\tfrac{\pi}{2}" /> can never be a solution — <Katex tex="\tan" /> is undefined there, so the original equation has no meaning at that point.</>,
  },
]

export default function MethodsQ6_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Let{' '}
          <Katex tex="\bigl(\tan(\theta)-1\bigr)\bigl(\sin(\theta)-\sqrt3\cos(\theta)\bigr)\bigl(\sin(\theta)+\sqrt3\cos(\theta)\bigr)=0" />
          .
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            State all possible values of <Katex tex="\tan(\theta)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Turning a sin–cos factor into a tan statement">
          <p>
            Any equation of the form <Katex tex="a\sin(\theta)+b\cos(\theta)=0" /> is secretly
            a statement about <Katex tex="\tan" />: divide through by{' '}
            <Katex tex="\cos(\theta)" /> and it becomes{' '}
            <Katex tex="a\tan(\theta)+b=0" />, so <Katex tex="\tan(\theta)=-\tfrac{b}{a}" />.
          </p>
          <p>
            (Dividing by <Katex tex="\cos(\theta)" /> is safe here: if{' '}
            <Katex tex="\cos(\theta)" /> were zero then <Katex tex="\sin(\theta)=\pm1" /> and
            the factor could not be zero anyway.)
          </p>
          <p>
            That one move turns the last two factors into <Katex tex="\tan(\theta)=\sqrt3" />{' '}
            and <Katex tex="\tan(\theta)=-\sqrt3" /> in a line each. Three-quarters of students
            found only the easy first factor.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Hence, find all possible solutions for{' '}
            <Katex tex="\bigl(\tan(\theta)-1\bigr)\bigl(\sin^2(\theta)-3\cos^2(\theta)\bigr)=0" />
            , where <Katex tex="0\le\theta\le\pi" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
