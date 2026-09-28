// 2020 Specialist Mathematics — Exam 1 Question 5 (4 marks). A vector resolute run
// backwards to recover an unknown component, then the perpendicular part. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report; itute (m = 4; 47/18 i − 5/9 j + 7/18 k) agrees on both parts. Solution
// is original. The paper's "m is an integer" is the only thing that rejects the genuine root
// m = 10/11 (a teacher blog calls this contrived); the solution says so plainly.
// Interactive diagrams (§15): part a. drags m along the graph of the multiplier
// (1 − 3m)/(m² + 2), which meets −11/18 at m = 10/11 and m = 4, with a toggle for the
// divide-by-|b| slip (interactives/spec-2020e1-q5a-multiplier.tsx); part b. slides a multiple t·b
// along the line of b, drawn to scale in the plane of a and b, until the leftover a − t·b is at
// right angles to b at t = −11/18, with a button for the lost-minus-sign slip t = +11/18
// (interactives/spec-2020e1-q5b-leftover.tsx). Common mistakes: dividing by |b| instead of b·b
// (no integer root: 2795m² − 1944m + 82 = 0, m ≈ 0.650) and subtracting 11/18 b (25/18 i − 49/9 j
// + 29/18 k, whose dot product with b is −22) — both computed with sympy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MultiplierWidget = lazyWidget(() => import('../interactives/spec-2020e1-q5a-multiplier'))
const LeftoverWidget = lazyWidget(() => import('../interactives/spec-2020e1-q5b-leftover'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 12, 27, 44],
  average: 2,
  comment: (
    <>
      Using the formula for the vector resolute, it is found that{' '}
      <Katex tex="\dfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}=\dfrac{-3m+1}{m^2+2}=-\dfrac{11}{18}" />.
      This resulted in the quadratic equation{' '}
      <Katex tex="11m^2-54m+40=0,\ (11m-10)(m-4)=0" /> giving <Katex tex="m=4" /> as the solution
      (<Katex tex="m" /> is an integer).
      <br />
      Students who factorised to solve the quadratic equation were generally more successful than
      those who used the quadratic formula.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [73, 28],
  average: 0.3,
  comment: (
    <>
      Some students did not attempt this question as they were unable to find an integer
      value of <Katex tex="m" /> in Question 5a. to use in their calculation. Of those who did
      attempt this question, arithmetic errors often caused them not to be awarded the mark.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute of } \underset{\sim}{a} \text{ along } \underset{\sim}{b} = \left(\frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}\right)\underset{\sim}{b}" />,
    reason: (
      <>
        The resolute is always a number times <Katex tex="\underset{\sim}{b}" />, and that number is{' '}
        <Katex tex="\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}" />. The question
        has already written the resolute as a number times{' '}
        <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}" />, and its number is{' '}
        <Katex tex="-\tfrac{11}{18}" />. So there is no need to expand into components: the whole part is one equation,
        our number <Katex tex="=" /> their number.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(1)+(-3)(m)+(1)(-1) = 1-3m" />,
    reason: (
      <>
        Multiply matching components (<Katex tex="\underset{\sim}{i}" /> with <Katex tex="\underset{\sim}{i}" />,{' '}
        <Katex tex="\underset{\sim}{j}" /> with <Katex tex="\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{k}" /> with{' '}
        <Katex tex="\underset{\sim}{k}" />) and add. Only the <Katex tex="\underset{\sim}{j}" />-components involve{' '}
        <Katex tex="m" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{b}\cdot\underset{\sim}{b} = 1+m^2+1 = m^2+2" />,
    reason: (
      <>
        <Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{b}=|\underset{\sim}{b}|^2" />, the squared length, so no square root
        appears. Dividing by <Katex tex="|\underset{\sim}{b}|" /> just once gives the <em>scalar</em> resolute (the length of
        the shadow), not the number of <Katex tex="\underset{\sim}{b}" />&apos;s in it; see the common mistake below.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{1-3m}{m^2+2} = -\frac{11}{18}" />,
    reason: (
      <>
        Both sides are the number multiplying <Katex tex="\underset{\sim}{b}" />, so they must be equal. The given number is
        negative, so <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=1-3m" /> must be negative: expect{' '}
        <Katex tex="m>\tfrac13" />. That is a quick check on whatever comes out.
      </>
    ),
  },
  {
    working: <Katex display tex="18(1-3m) = -11\left(m^2+2\right)" />,
    reason: <>Cross-multiplying. <Katex tex="m^2+2>0" /> for every <Katex tex="m" />, so there are no sign worries.</>,
  },
  {
    working: (
      <>
        <Katex display tex="18-54m = -11m^2-22" />
        <Katex display tex="11m^2-54m+40 = 0" />
      </>
    ),
    reason: <>Everything onto one side with a positive leading coefficient, ready to factorise.</>,
  },
  {
    working: <Katex display tex="(11m-10)(m-4) = 0 \implies m = \tfrac{10}{11} \text{ or } m = 4" />,
    reason: (
      <>
        Look for two numbers with product <Katex tex="11\times40=440" /> and sum <Katex tex="-54" />: they are{' '}
        <Katex tex="-44" /> and <Katex tex="-10" />, so{' '}
        <Katex tex="11m^2-44m-10m+40=11m(m-4)-10(m-4)" />. The report notes that students who factorised were generally more
        successful than those who used the quadratic formula.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{m = 4}" />,
    reason: (
      <>
        <Katex tex="m" /> is given to be an integer, so <Katex tex="\tfrac{10}{11}" /> is rejected. It really does satisfy the
        equation (the diagram below shows the multiplier reaching <Katex tex="-\tfrac{11}{18}" /> twice); the integer condition
        is the only thing that rules it out. Both roots are bigger than <Katex tex="\tfrac13" />, as the sign check predicted.
        Check: with <Katex tex="m=4" />, <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=2-12-1=-11" /> and{' '}
        <Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{b}=1+16+1=18" />, giving <Katex tex="-\tfrac{11}{18}" /> ✓.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}_{\perp} = \underset{\sim}{a}-\left(\text{resolute of } \underset{\sim}{a} \text{ along } \underset{\sim}{b}\right)" />,
    reason: (
      <>
        Any vector splits into a part along <Katex tex="\underset{\sim}{b}" /> and a part at right angles to{' '}
        <Katex tex="\underset{\sim}{b}" />, and the two parts add back to{' '}
        <Katex tex="\underset{\sim}{a}" />: <Katex tex="\underset{\sim}{a}=\underset{\sim}{a}_{\parallel}+\underset{\sim}{a}_{\perp}" />.
        The part along <Katex tex="\underset{\sim}{b}" /> is the resolute we were given, so the perpendicular part is whatever is
        left once it is taken away. The diagram below shows why that leftover is exactly at right angles to{' '}
        <Katex tex="\underset{\sim}{b}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left(2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}\right)+\tfrac{11}{18}\left(\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: (
      <>
        Put in <Katex tex="m=4" /> from part a. (which is why the report notes some students could not attempt this part).
        Taking away <Katex tex="-\tfrac{11}{18}\underset{\sim}{b}" /> means <em>adding</em>{' '}
        <Katex tex="\tfrac{11}{18}\underset{\sim}{b}" />: watch that sign.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= \left(\tfrac{36}{18}+\tfrac{11}{18}\right)\underset{\sim}{i}+\left(-\tfrac{54}{18}+\tfrac{44}{18}\right)\underset{\sim}{j}" />
        <Katex display tex="\quad+\left(\tfrac{18}{18}-\tfrac{11}{18}\right)\underset{\sim}{k}" />
      </>
    ),
    reason: (
      <>
        Write every coefficient over 18 before adding, one component at a time: <Katex tex="2=\tfrac{36}{18}" />,{' '}
        <Katex tex="-3=-\tfrac{54}{18}" />, <Katex tex="1=\tfrac{18}{18}" />, and{' '}
        <Katex tex="\tfrac{11}{18}\times4=\tfrac{44}{18}" />. The report notes that arithmetic errors often cost students this
        mark, so take it slowly.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\tfrac{47}{18}\underset{\sim}{i}-\tfrac{5}{9}\underset{\sim}{j}+\tfrac{7}{18}\underset{\sim}{k}}" />,
    reason: (
      <>
        <Katex tex="-\tfrac{10}{18}" /> simplifies to <Katex tex="-\tfrac59" />, the form the report gives. Check: the answer
        must be perpendicular to <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}" />, so
        its dot product with <Katex tex="\underset{\sim}{b}" /> must be <Katex tex="0" />:{' '}
        <Katex tex="\tfrac{47}{18}-\tfrac{40}{18}-\tfrac{7}{18}=0" /> ✓. This ten-second check catches almost any slip in the
        arithmetic.
      </>
    ),
  },
]

export default function SpecialistQ5_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          Let <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}" />, where{' '}
          <Katex tex="m" /> is an integer.
          <br />
          The vector resolute of <Katex tex="\underset{\sim}{a}" />{' '}
          in the direction of <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="-\dfrac{11}{18}\left(\underset{\sim}{i}+m\underset{\sim}{j}-\underset{\sim}{k}\right)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Vector Resolute" marks={3} statement={<>Find the value of <Katex tex="m" />.</>} examinerReport={EXAM_A}>
        <Background title="The Vector Resolute">
          <p>
            The vector resolute of <Katex tex="\underset{\sim}{a}" /> in the direction of <Katex tex="\underset{\sim}{b}" /> is the
            part of <Katex tex="\underset{\sim}{a}" /> that lies along <Katex tex="\underset{\sim}{b}" />: picture the shadow{' '}
            <Katex tex="\underset{\sim}{a}" /> casts on the line of <Katex tex="\underset{\sim}{b}" /> when the light shines at
            right angles to that line. The shadow lies on the line of <Katex tex="\underset{\sim}{b}" />, so it is always a
            multiple of <Katex tex="\underset{\sim}{b}" />, namely{' '}
            <Katex tex="\left(\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\underset{\sim}{b}\cdot\underset{\sim}{b}}\right)\underset{\sim}{b}" />.
          </p>
          <p>
            The multiplier is positive when the angle between <Katex tex="\underset{\sim}{a}" /> and{' '}
            <Katex tex="\underset{\sim}{b}" /> is acute, and negative when it is obtuse: then the shadow points backwards,
            opposite to <Katex tex="\underset{\sim}{b}" />. Here the multiplier is <Katex tex="-\tfrac{11}{18}" />, so the angle
            is obtuse. The diagram in part b. shows where the formula comes from.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the equation has two roots, and why 'm is an integer' picks m = 4">
          <MultiplierWidget />
        </Explore>
        <WrongMethod
          title="Divide by |b| instead of b·b"
          working={
            <>
              <Katex display tex="\frac{1-3m}{\sqrt{m^2+2}} = -\frac{11}{18}" />
              <Katex display tex="\implies 324(1-3m)^2 = 121\left(m^2+2\right)" />
              <Katex display tex="\implies 2795m^2-1944m+82 = 0" />
            </>
          }
        >
          <p>
            <Katex tex="\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{b}|}" /> is the <em>scalar</em> resolute:
            the signed length of the shadow. The number multiplying <Katex tex="\underset{\sim}{b}" /> needs a second division by{' '}
            <Katex tex="|\underset{\sim}{b}|" />, which is why the formula divides by{' '}
            <Katex tex="\underset{\sim}{b}\cdot\underset{\sim}{b}=|\underset{\sim}{b}|^2" />.
          </p>
          <p>
            This equation has no integer root: its only solution is <Katex tex="m\approx0.65" /> (the other root of the quadratic,{' '}
            <Katex tex="m\approx0.05" />, makes <Katex tex="1-3m" /> positive and came from squaring). So &ldquo;
            <Katex tex="m" /> is an integer&rdquo; has nothing to choose, which is the sign that something has gone wrong. The
            report on part b. notes that some students could not find an integer value of <Katex tex="m" />. Turn on &ldquo;What
            if I divide by |b|?&rdquo; in the diagram above to see this curve miss every whole number.
          </p>
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Perpendicular Part"
        marks={1}
        statement={
          <>
            Find the component of <Katex tex="\underset{\sim}{a}" /> that is perpendicular to{' '}
            <Katex tex="\underset{\sim}{b}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Take away the shadow on b, and what is left of a is at right angles to b">
          <LeftoverWidget />
        </Explore>
        <WrongMethod
          title="Subtract 11/18 b (the minus sign lost)"
          working={<Katex display tex="\underset{\sim}{a}-\tfrac{11}{18}\left(\underset{\sim}{i}+4\underset{\sim}{j}-\underset{\sim}{k}\right) = \tfrac{25}{18}\underset{\sim}{i}-\tfrac{49}{9}\underset{\sim}{j}+\tfrac{29}{18}\underset{\sim}{k}" />}
        >
          <p>
            The resolute is <Katex tex="-\tfrac{11}{18}\underset{\sim}{b}" />, so taking it away means <em>adding</em>{' '}
            <Katex tex="\tfrac{11}{18}\underset{\sim}{b}" />. Lose the minus sign and every component comes out wrong.
          </p>
          <p>
            The perpendicular check catches it straight away:{' '}
            <Katex tex="\tfrac{25}{18}-\tfrac{49}{9}(4)-\tfrac{29}{18}=\tfrac{25-392-29}{18}=-22" />, not <Katex tex="0" />, so
            this vector is not perpendicular to <Katex tex="\underset{\sim}{b}" />. Press &ldquo;t = +11/18&rdquo; in the diagram
            above to see how far it leans.
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
