// 2015 Mathematical Methods (CAS) — Exam 1, Question 6 (3 marks).
// Standardising a normal probability, then a conditional probability using only the 68-95
// facts. Question text transcribed from the original paper (no diagram given). Answers
// checked against the VCAA examination report. Solution is original.
// Interactive: part b (37% full marks) — the condition X > 2.5 makes the right half the whole
// "world", the answer is the strip 2.5 < X < 2.8 as a share of it, and a toggle shows the common
// wrong numerator Pr(X < 2.8), which gives 1.68 > 1. Part a does not qualify (50% full marks).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const ShareWidget = lazyWidget(() => import('../interactives/meth-2015e1-q6b-share-of-half'))

const EXAM_A: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Those students who drew a diagram of a ‘normal’ curve with relevant areas shaded found
      this helpful. An answer of <Katex tex="+2" /> was common. The answer of{' '}
      <Katex tex="1.9" /> was also common, and was two standard deviations below the mean of{' '}
      <Katex tex="X" />. This question required a conversion to the standard normal curve.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 22, 37],
  average: 1.0,
  comment: (
    <>
      Most students could state the relevant rule and obtained the correct denominator of{' '}
      <Katex tex="\tfrac12" /> but then failed to recognise that{' '}
      <Katex tex="\Pr(X<2.8\mid X>2.5)=\tfrac{\Pr(2.5<X<2.8)}{\Pr(X>2.5)}" />.
      Probabilities greater than 1 or errors in handling decimals and/or fraction
      simplifications were common.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \Pr(X>3.1) &= \Pr\!\left(Z>\frac{3.1-2.5}{0.3}\right) \\ &= \Pr(Z>2) \end{aligned}" />,
    reason: <>Standardise with <Katex tex="z=\frac{x-\mu}{\sigma}" />: <Katex tex="3.1" /> is <Katex tex="0.6" />, exactly two standard deviations, above the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(Z>2) = \Pr(Z<-2)" />,
    reason: <>The standard normal is symmetric about <Katex tex="0" />, so the right tail beyond <Katex tex="2" /> equals the left tail below <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -2}" />,
    reason: <>Match the form asked for, <Katex tex="\Pr(Z<b)" />: <Katex tex="b=-2" />, not <Katex tex="+2" />.</>,
    more: <>The report says <Katex tex="+2" /> was a common answer: it is right for <Katex tex="\Pr(Z>b)" />, but <Katex tex="\Pr(Z<2)\approx0.98" /> is most of the curve, not a small tail. The other common answer, <Katex tex="1.9=2.5-2(0.3)" />, is the mirror point in <Katex tex="X" />: it gives <Katex tex="\Pr(X<1.9)" />, but <Katex tex="b" /> must be a value of <Katex tex="Z" />, which has mean <Katex tex="0" /> and standard deviation <Katex tex="1" />. Check with a sketch: <Katex tex="\Pr(Z<-2)" /> is a small left tail, the same size as the small right tail <Katex tex="\Pr(X>3.1)" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<2.8\mid X>2.5) = \frac{\Pr(2.5<X<2.8)}{\Pr(X>2.5)}" />,
    reason: <>Conditional probability: <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />. Being both less than <Katex tex="2.8" /> and greater than <Katex tex="2.5" /> is the strip between them.</>,
    more: <>The report says most students knew the rule but did not recognise this numerator. Read the bar as &ldquo;given&rdquo;: we are told <Katex tex="X>2.5" />, so only the right half of the curve is still possible, and the answer is the share of that half lying below <Katex tex="2.8" />. The numerator&apos;s region must sit inside the denominator&apos;s region, so <Katex tex="\Pr(X<2.8)" /> (everything left of <Katex tex="2.8" />) cannot be right.</>,
  },
  {
    working: <Katex display tex="\Pr(X>2.5) = \frac12" />,
    reason: <><Katex tex="2.5" /> is the mean, so exactly half the distribution lies above it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 2.8 &= 2.5+0.3 \\ \implies \Pr(2.5<X<2.8) &= \Pr(0<Z<1) \end{aligned}" />,
    reason: <><Katex tex="2.8" /> is one standard deviation (<Katex tex="0.3" />) above the mean, so it standardises to <Katex tex="z=1" />; the mean becomes <Katex tex="z=0" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Z<-1) = 0.16 \implies \Pr(Z>1) = 0.16" />,
    reason: <>By symmetry of the standard normal about <Katex tex="0" />. This is the only value given, so everything is built from it.</>,
  },
  {
    working: <Katex display tex="\Pr(0<Z<1) = 0.5-0.16 = 0.34" />,
    reason: <>The right half (<Katex tex="0.5" />) less the tail beyond <Katex tex="z=1" />.</>,
  },
  {
    working: <Katex display tex="\frac{0.34}{0.5} = 0.34\times 2 = \boxed{0.68}" />,
    reason: <>Dividing by <Katex tex="0.5" /> is doubling. The answer lies between <Katex tex="0" /> and <Katex tex="1" />, as any probability must.</>,
    more: <>The report says probabilities greater than 1 and slips with decimals and fractions were common. Putting <Katex tex="\Pr(X<2.8)=1-0.16=0.84" /> on top gives <Katex tex="\frac{0.84}{0.5}=1.68" />, impossible for a probability, which is the signal to recheck the numerator. Recognise the answer: by symmetry the strip from <Katex tex="z=-1" /> to <Katex tex="0" /> is also <Katex tex="0.34" />, so doubling one strip gives <Katex tex="\Pr(-1<Z<1)=0.68" />, the familiar &ldquo;68% within one standard deviation of the mean&rdquo;.</>,
  },
]

export default function MethodsQ6_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Let the random variable <Katex tex="X" /> be normally distributed with mean{' '}
          <Katex tex="2.5" /> and standard deviation <Katex tex="0.3" />. Let{' '}
          <Katex tex="Z" /> be the standard normal random variable, such that{' '}
          <Katex tex="Z\sim N(0,1)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Standardising"
        marks={1}
        statement={
          <>
            Find <Katex tex="b" /> such that <Katex tex="\Pr(X>3.1)=\Pr(Z<b)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Sketch the curve">
          <p>
            Both parts of this question are about matching one region of a normal curve to
            another. A quick sketch with the relevant area shaded settles the sign in part
            (a) and the numerator in part (b) at a glance — the report notes that students who drew a shaded normal curve
            found it helpful.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Using the fact that, correct to two decimal places,{' '}
            <Katex tex="\Pr(Z<-1)=0.16" />, find{' '}
            <Katex tex="\Pr(X<2.8\mid X>2.5)" />. Write the answer correct to two decimal
            places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Given X > 2.5, the right half becomes the whole — the answer is the strip's share of it">
          <ShareWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
