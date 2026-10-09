// 2019 Specialist Mathematics — Exam 1, Question 3 (3 marks).
// Chocolate cylinders of fixed radius 0.5 cm and random length (mean 3, sd 0.1) — the expected
// volume, the variance of the volume, and the expected surface area. This is the linear
// functions of a random variable topic: E(aX+b) = aE(X)+b and Var(aX+b) = a²Var(X). Question
// text transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Cross-checked against the VCAA examination report and itute's
// independent solutions — all agree on 3π/4, π²/1600 and 7π/2 (re-derived with sympy). Solution is
// original.
//
// Interactives: part b. has "Why the multiplier comes out squared" (spec-2019e1-q3b-squared: seven
// pieces' lengths mapped to their volumes V = kL; the spread grows by k, so the square on the sd
// grows by k², and a toggle draws the wrong square k·Var(L)); part c. has the net of a piece
// (spec-2019e1-q3c-net: only the unrolled side grows with L, so A = π/2 + πL). Part a. (89% correct)
// has no widget of its own — it is one line of E(aL) = aE(L), and the b. widget already places the
// mean volume at 3k = 3π/4. WrongMethod boxes: b. Var(V) = (π/4)Var(L) (no source — an instructive
// slip, caught by units) and the π² dropped (the report says a number of students omitted it); c.
// π/2 + 3π added as 4π/2 (the report says some students could not evaluate this sum; the particular
// slip shown is ours, so no source is given).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import cylinderSrc from './spec-2019e1-q3-cylinder.png'

const SquaredWidget = lazyWidget(() => import('../interactives/spec-2019e1-q3b-squared'))
const NetWidget = lazyWidget(() => import('../interactives/spec-2019e1-q3c-net'))

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>This question was well done. Occasionally the <Katex tex="\pi" /> was missing from the answer.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      Students could use fractions to find{' '}
      <Katex tex="\operatorname{Var}(V)=\operatorname{Var}\left(\pi r^2h\right)=\dfrac{\pi^2}{16}\times\dfrac{1}{100}=\dfrac{\pi^2}{1600}" />.
      Students who used this approach tended to score more highly than those using decimals, who
      sometimes were not able to evaluate <Katex tex="(\pi\times0.25)^2\times(0.1)^2" /> correctly.
      A number of students omitted the <Katex tex="\pi^2" /> from their answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: <>Some students were unable to evaluate <Katex tex="\dfrac{\pi}{2}+3\pi" /> correctly.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi r^2 L = \pi\left(\tfrac12\right)^2 L = \dfrac{\pi}{4}L" />,
    reason: <>The question asks about volume, but the only thing that varies is the length — so the first move is to write the volume as a formula in the random length <Katex tex="L" />. With the radius fixed at <Katex tex="r=0.5=\tfrac12" />, <Katex tex="V" /> is just a <em>constant multiple</em> of <Katex tex="L" />.</>,
  },
  {
    working: <Katex display tex="E(V) = E\!\left(\dfrac{\pi}{4}L\right) = \dfrac{\pi}{4}E(L) = \dfrac{\pi}{4}\times3" />,
    reason: <>Constants come straight out of an expected value: <Katex tex="E(aL)=aE(L)" />. If every piece&apos;s volume is <Katex tex="\tfrac{\pi}{4}" /> times its length, the average volume is <Katex tex="\tfrac{\pi}{4}" /> times the average length. We are never told <Katex tex="L" /> is normal, and we don&apos;t need to be — this rule works for any random variable.</>,
  },
  {
    working: <Katex display tex="\boxed{E(V) = \dfrac{3\pi}{4} \text{ cm}^3}" />,
    reason: <>Leave the <Katex tex="\pi" /> in — an exact answer is required, and the report notes it was sometimes dropped. As a decimal this is about <Katex tex="2.36" /> cm³.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(V) = \operatorname{Var}\!\left(\dfrac{\pi}{4}L\right) = \left(\dfrac{\pi}{4}\right)^2\operatorname{Var}(L)" />,
    reason: <>A constant multiplier comes out of a variance <b>squared</b>. Why: variance measures <em>squared</em> distance from the mean. Every piece&apos;s volume is <Katex tex="\tfrac{\pi}{4}" /> times as far from the mean volume as its length is from 3 cm, so every squared distance is <Katex tex="\left(\tfrac{\pi}{4}\right)^2" /> times as big. This is the step that separates this part from part a., and only 30% of students scored the mark.</>,
    more: <>Drag <Katex tex="k" /> in the diagram below.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(L) = \bigl(\text{sd}(L)\bigr)^2 = \left(\dfrac{1}{10}\right)^2 = \dfrac{1}{100}" />,
    reason: <>The question gives the standard deviation, not the variance, so square it first. Using the fraction <Katex tex="\tfrac{1}{10}" /> rather than <Katex tex="0.1" /> keeps the arithmetic clean.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(V) = \dfrac{\pi^2}{16}\times\dfrac{1}{100}" />,
    reason: <><Katex tex="\left(\tfrac{\pi}{4}\right)^2=\tfrac{\pi^2}{16}" />: the <Katex tex="\pi" /> is part of the multiplier, so it is squared along with the 4. Keep it in fractions — the report notes students using decimals sometimes could not evaluate <Katex tex="(\pi\times0.25)^2\times(0.1)^2" /> correctly.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Var}(V) = \dfrac{\pi^2}{1600} \text{ cm}^6}" />,
    reason: <>Equivalently <Katex tex="0.000625\pi^2" />. Size check: <Katex tex="\text{sd}(V)=\tfrac{\pi}{4}\times0.1\approx0.08" /> and <Katex tex="0.08^2\approx0.0064" />, close to <Katex tex="\tfrac{\pi^2}{1600}\approx0.0062" />. The units in the question are a clue too: cm⁶ is (cm³)², because a variance carries the square of the units of the quantity.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \underbrace{2\pi r^2}_{\text{two circular ends}} + \underbrace{2\pi r L}_{\text{curved surface}}" />,
    reason: <>A solid cylinder&apos;s surface is two discs plus the curved side. Peel the side off like the label on a can: it is a rectangle, <Katex tex="L" /> long and <Katex tex="2\pi r" /> wide, because that edge went once round the circular end (see the net below).</>,
  },
  {
    working: <Katex display tex="A = 2\pi\left(\tfrac12\right)^2 + 2\pi\left(\tfrac12\right)L = \dfrac{\pi}{2}+\pi L" />,
    reason: <>Substituting <Katex tex="r=\tfrac12" />. This time <Katex tex="A" /> is a constant multiple of <Katex tex="L" /> <em>plus</em> a constant.</>,
  },
  {
    working: <Katex display tex="E(A) = \dfrac{\pi}{2}+\pi E(L) = \dfrac{\pi}{2}+3\pi" />,
    reason: <>Using <Katex tex="E(aL+b)=aE(L)+b" />. The added constant simply carries through: every piece gets the same <Katex tex="\tfrac{\pi}{2}" /> from its two ends, so the average does too (unlike in a variance, where it would disappear).</>,
  },
  {
    working: <Katex display tex="\boxed{E(A) = \dfrac{7\pi}{2} \text{ cm}^2}" />,
    reason: <><Katex tex="\tfrac{\pi}{2}+3\pi=\tfrac{\pi}{2}+\tfrac{6\pi}{2}=\tfrac{7\pi}{2}" />, i.e. <Katex tex="3.5\pi \approx 11.0" /> cm². The report notes some students were unable to evaluate this sum correctly, and its general comments list arithmetic in Question 3 as an area of weakness.</>,
  },
]

export default function SpecialistQ3_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p className="mb-3">
          A machine produces chocolate in the form of a continuous cylinder of radius{' '}
          <Katex tex="0.5" /> cm. Smaller cylindrical pieces are cut parallel to its end, as
          shown in the diagram below. The lengths of the pieces vary with a mean of{' '}
          <Katex tex="3" /> cm and a standard deviation of <Katex tex="0.1" /> cm.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={cylinderSrc} alt="A long chocolate cylinder being cut into shorter cylindrical pieces, from the original 2019 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <DetailOnly>
        <div className="text-[13px] leading-relaxed">
          <Background title="Before You Start">
            <p>
              Only the <b>length</b> varies — the radius is fixed at <Katex tex="0.5" /> cm. So the
              first move in every part is to write the quantity being asked about as a formula in
              the random length <Katex tex="L" />, and then apply the two rules for a linear
              function of a random variable:
            </p>
            <p>
              <Katex tex="E(aL+b) = aE(L)+b" /> &nbsp;and&nbsp;{' '}
              <Katex tex="\operatorname{Var}(aL+b) = a^2\operatorname{Var}(L)" />.
            </p>
            <p>
              The two differ in an important way: a multiplier gets <em>squared</em> in the
              variance, and an added constant vanishes from it entirely (shifting every value by
              the same amount doesn't change how spread out they are). The squaring comes from what
              variance is — the average <em>squared</em> distance from the mean. Multiply every value
              by <Katex tex="a" /> and every distance from the mean is multiplied by{' '}
              <Katex tex="a" />, so every squared distance is multiplied by <Katex tex="a^2" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Expected Value" marks={1} statement={<>Find the expected volume of a piece of chocolate in cm³.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Variance" marks={1} statement={<>Find the variance of the volume of a piece of chocolate in cm⁶.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the multiplier comes out squared">
          <SquaredWidget />
        </Explore>
        <WrongMethod
          title="Constants come out of Var just like they do from E"
          working={<Katex display tex="\operatorname{Var}(V) = \dfrac{\pi}{4}\times\dfrac{1}{100} = \dfrac{\pi}{400}" />}
        >
          That is the rule for <Katex tex="E" />, not for <Katex tex="\operatorname{Var}" />. Scaling every
          volume&apos;s distance from the mean by <Katex tex="\tfrac{\pi}{4}" /> multiplies each <em>squared</em>{' '}
          distance by <Katex tex="\left(\tfrac{\pi}{4}\right)^2" />. Catch it with units: the multiplier{' '}
          <Katex tex="\tfrac{\pi}{4}" /> is really <Katex tex="\pi r^2" />, in cm², and{' '}
          <Katex tex="\operatorname{Var}(L)" /> is in cm². Unsquared, that gives cm⁴, but the question asks
          for cm⁶ — only <Katex tex="(\text{cm}^2)^2\times\text{cm}^2" /> gets there.
        </WrongMethod>
        <WrongMethod
          title="Just square the numbers: 0.25 and 0.1"
          source="Examiner's report"
          working={<Katex display tex="\operatorname{Var}(V) = 0.25^2\times0.1^2 = 0.000625" />}
        >
          The multiplier is <Katex tex="\pi\times0.25" />, not <Katex tex="0.25" />. The <Katex tex="\pi" /> is
          part of it, so it is squared too, giving <Katex tex="0.000625\pi^2" />. The report notes a number of
          students omitted the <Katex tex="\pi^2" /> from their answer. A size check catches it:{' '}
          <Katex tex="\text{sd}(V)\approx\tfrac{\pi}{4}\times0.1\approx0.08" />, so the variance should be about{' '}
          <Katex tex="0.08^2\approx0.006" />. The answer <Katex tex="0.000625" /> is about ten times too small.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Expected Value" marks={1} statement={<>Find the expected surface area of a piece of chocolate in cm².</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The ends are fixed; only the side grows with L">
          <NetWidget />
        </Explore>
        <WrongMethod
          title="Add the tops: π/2 + 3π = 4π/2"
          working={<Katex display tex="\dfrac{\pi}{2}+3\pi = \dfrac{\pi+3\pi}{2} = 2\pi" />}
        >
          <Katex tex="3\pi" /> is <Katex tex="\tfrac{3\pi}{1}" />, not <Katex tex="\tfrac{3\pi}{2}" />, so the
          numerators can&apos;t be added until both terms are over 2: <Katex tex="3\pi=\tfrac{6\pi}{2}" />, giving{' '}
          <Katex tex="\tfrac{7\pi}{2}" />. The report notes some students were unable to evaluate{' '}
          <Katex tex="\tfrac{\pi}{2}+3\pi" /> correctly. Catch it: adding something positive to <Katex tex="3\pi" />{' '}
          must give more than <Katex tex="3\pi" />, and <Katex tex="2\pi" /> is less.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
