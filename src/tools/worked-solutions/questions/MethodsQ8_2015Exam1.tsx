// 2015 Mathematical Methods (CAS) — Exam 1, Question 8 (3 marks).
// Conditional probability, a complement, and independence. Question text transcribed from
// the original paper (no diagram given). Answers checked against the VCAA examination
// report. Solution is original. Part (c) (28% full marks) has an Explore: the sample space as a
// unit square, sliding Pr(A | B') to find the one value that makes A and B independent.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const SameShare = lazyWidget(() => import('../interactives/meth-2015e1-q8c-same-share'))

const EXAM_A: SAExaminerStats = { marks: [13, 87], average: 0.9, comment: <>This question was well answered.</> }

const EXAM_B: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A Karnaugh map was most useful for formulating a solution. Some poor manipulation of
      fractions was evident in responses.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: (
    <>
      Many students made little headway into solving this problem due to their lack of
      understanding of independent
      events. The addition rule was then applied using an incorrect value for{' '}
      <Katex tex="\Pr(A)" />, resulting in final answers well outside the interval{' '}
      <Katex tex="[0,1]" />. Students must note that a probability must lie within{' '}
      <Katex tex="[0,1]" /> and is never a negative number.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\cap B) = \Pr(A\mid B)\times\Pr(B)" />,
    reason: <>The definition <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A\cap B)}{\Pr(B)}" />, multiplied through by <Katex tex="\Pr(B)" />.</>,
  },
  {
    working: <Katex display tex="= \frac34\times\frac13" />,
    reason: <>Both values are given.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac14}" />,
    reason: <>Smaller than <Katex tex="\Pr(B)=\tfrac13" />, as an intersection must be.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="B = (A\cap B)\cup(A'\cap B)" />,
    reason: <>Every outcome in <Katex tex="B" /> either is in <Katex tex="A" /> or is not, and the two parts are mutually exclusive.</>,
  },
  {
    working: <Katex display tex="\Pr(A'\cap B) = \Pr(B)-\Pr(A\cap B) = \frac13-\frac14" />,
    reason: <>Take the part of <Katex tex="B" /> inside <Katex tex="A" /> (part (a)) away from all of <Katex tex="B" />.</>,
    more: (
      <>
        The report recommends a Karnaugh map: a two-by-two table with <Katex tex="A" />,{' '}
        <Katex tex="A'" /> as rows and <Katex tex="B" />, <Katex tex="B'" /> as columns. The{' '}
        <Katex tex="B" /> column must total <Katex tex="\tfrac13" />, and the <Katex tex="A\cap B" /> cell
        is <Katex tex="\tfrac14" /> from part (a), so the cell below it is whatever is left over:
        exactly this subtraction.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{4-3}{12} = \frac{1}{12}}" />,
    reason: <>Common denominator <Katex tex="12" />.</>,
    more: <>The report notes poor manipulation of fractions. Check: <Katex tex="\tfrac14+\tfrac1{12}=\tfrac{3+1}{12}=\tfrac13" />, which is <Katex tex="\Pr(B)" /> again.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A,B \text{ independent} \implies \Pr(A\mid B) = \Pr(A)" />,
    reason: <>That is what independence <em>means</em>: knowing <Katex tex="B" /> happened does not change the chance of <Katex tex="A" />. So <Katex tex="\Pr(A)=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap B) = \Pr(A)\Pr(B) = \frac34\times\frac13 = \frac14" />,
    reason: <>A check, not a new step: <Katex tex="\Pr(A\cap B)=\tfrac14" /> is already known from (a), and the product rule for independent events gives the same value.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(A\cup B) &= \Pr(A)+\Pr(B)-\Pr(A\cap B) \\ &= \frac34+\frac13-\frac14\end{aligned}" />,
    reason: <>The addition rule: adding <Katex tex="\Pr(A)" /> and <Katex tex="\Pr(B)" /> counts <Katex tex="A\cap B" /> twice, so subtract it once.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12+\frac13 = \frac56}" />,
    reason: <>Combine <Katex tex="\tfrac34-\tfrac14=\tfrac12" /> first, then <Katex tex="\tfrac12+\tfrac13=\tfrac36+\tfrac26=\tfrac56" />.</>,
    more: (
      <>
        The answer is between <Katex tex="0" /> and <Katex tex="1" />, as any probability must be;
        an answer outside that range means an error earlier. The report says many students used an
        incorrect value for <Katex tex="\Pr(A)" /> in the addition rule and got answers well outside{' '}
        <Katex tex="[0,1]" />. Independence forces <Katex tex="\Pr(A)=\Pr(A\mid B)=\tfrac34" />; no
        other value is allowed. Also check{' '}
        <Katex tex="\Pr(A\cup B)" /> is at least the larger of <Katex tex="\Pr(A)" /> and{' '}
        <Katex tex="\Pr(B)" />: <Katex tex="\tfrac56\ge\tfrac34" />.
      </>
    ),
  },
]

export default function MethodsQ8_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (3 marks)</p>
        <p>
          For events <Katex tex="A" /> and <Katex tex="B" /> from a sample space,{' '}
          <Katex tex="\Pr(A\mid B)=\tfrac34" /> and <Katex tex="\Pr(B)=\tfrac13" />.
        </p>
      </div>

      <PartCard letter="a" topic="Conditional Probability" marks={1} statement={<>Calculate <Katex tex="\Pr(A\cap B)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complement"
        marks={1}
        statement={
          <>
            Calculate <Katex tex="\Pr(A'\cap B)" />, where <Katex tex="A'" /> denotes the
            complement of <Katex tex="A" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independence"
        marks={1}
        statement={
          <>
            If events <Katex tex="A" /> and <Katex tex="B" /> are independent, calculate{' '}
            <Katex tex="\Pr(A\cup B)" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Why part (c) needs independence">
          <p>
            Parts (a) and (b) use only what was given. To use the addition rule in part (c) you
            need <Katex tex="\Pr(A)" />, and the given information does not fix it: it depends on
            how much of <Katex tex="B'" /> lies in <Katex tex="A" />, which could be anything from
            none (<Katex tex="\Pr(A)=\tfrac14" />) to all (<Katex tex="\Pr(A)=\tfrac{11}{12}" />).
          </p>
          <p>
            Independence removes that freedom, and that is the idea to take away: 72% of students
            scored zero on this part.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Independence means A fills the same share of B′ as of B">
          <SameShare />
        </Explore>
      </PartCard>
    </div>
  )
}
