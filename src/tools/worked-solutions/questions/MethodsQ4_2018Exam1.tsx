// 2018 Mathematical Methods — Exam 1, Question 4 (2 marks). Symmetry of the normal
// distribution, then standardising a tail probability into the standard normal. Question text
// transcribed from the original paper (no diagram given). Answers checked with scipy and against
// the VCAA examination report (itute agrees: ½ and −½). Solution is original. Interactive
// diagrams (§15): part a. slides σ to show the mean always splits the bell into two halves
// (interactives/meth-2018e1-q4a-half.tsx); part b. draws the bell once with a z-ruler under the
// x-axis so x = 7 lines up with z = ½, with a toggle for dividing by the variance
// (interactives/meth-2018e1-q4b-rulers.tsx), then finds b by matching a lower tail to the upper
// tail, with the report's wrong answers −¼ and 5 as buttons (interactives/meth-2018e1-q4b-flip.tsx).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const HalfWidget = lazyWidget(() => import('../interactives/meth-2018e1-q4a-half'))
const RulersWidget = lazyWidget(() => import('../interactives/meth-2018e1-q4b-rulers'))
const FlipWidget = lazyWidget(() => import('../interactives/meth-2018e1-q4b-flip'))

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
    reason: <>How would I know? The cut-off <Katex tex="6" /> <em>is</em> the mean. A normal curve is a mirror image of itself about its mean, so exactly half the area lies above <Katex tex="\mu" />, whatever <Katex tex="\sigma" /> is. No standardising, no calculator.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\sigma = \sqrt{\operatorname{Var}(X)} = \sqrt4 = 2" />,
    reason: <>Read the stem carefully: it gives the <em>variance</em>, <Katex tex="\sigma^2 = 4" />. Standardising divides by <Katex tex="\sigma" />, the spread measured in the same units as <Katex tex="X" />, so take the square root first. The report&apos;s general comments single this out: in Question 4 &ldquo;the variance and not the standard deviation was given&rdquo;.</>,
  },
  {
    working: <Katex display tex="Z = \frac{X-\mu}{\sigma} = \frac{X-6}{2}" />,
    reason: <>Why standardise? The right-hand side, <Katex tex="\Pr(Z<b)" />, is about <Katex tex="Z" />, so the left-hand side must be turned into a statement about <Katex tex="Z" /> too. <Katex tex="\frac{x-\mu}{\sigma}" /> counts how many standard deviations <Katex tex="x" /> is from the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(X>7) = \Pr\!\left(Z > \frac{7-6}{2}\right) = \Pr\!\left(Z>\frac12\right)" />,
    reason: <><Katex tex="7" /> is <Katex tex="1" /> above the mean, and <Katex tex="1" /> is half of <Katex tex="\sigma=2" />, so <Katex tex="7" /> sits at <Katex tex="z=\tfrac12" />. The shaded area is unchanged; standardising only relabels the axis.</>,
    more: <>See the first widget below.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(Z>\tfrac12\right) = \Pr\!\left(Z<-\tfrac12\right)" />,
    reason: <>
      Now match the form <Katex tex="\Pr(Z<b)" />, a <em>lower</em> tail. The standard normal is symmetric about <Katex tex="0" />, so the upper tail beyond <Katex tex="\tfrac12" /> has the same area as the lower tail below <Katex tex="-\tfrac12" />. The report does the flip first instead: <Katex tex="\Pr(X>7)=\Pr(X<5)" /> by symmetry about <Katex tex="6" />, then{' '}
      <Katex tex="\frac{5-6}{2}=-\tfrac12" />. Either order works, as long as you standardise.
    </>,
  },
  {
    working: <Katex display tex="\boxed{b = -\frac12}" />,
    reason: <>Sign check: <Katex tex="7" /> is above the mean, so <Katex tex="\Pr(X>7)<\tfrac12" />, and a lower tail with less than half the area must end below <Katex tex="Z" />&apos;s mean of <Katex tex="0" />. So <Katex tex="b" /> must be negative. (<Katex tex="\Pr(Z<-0.5)\approx0.309" />.)</>,
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
        <Explore title="Why the mean always cuts the bell in half, whatever the spread">
          <HalfWidget />
        </Explore>
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
            Standardising doesn&apos;t move any area. The same bell can be read on two rulers: the{' '}
            <Katex tex="x" />-scale, and the <Katex tex="z" />-scale that counts standard deviations from
            the mean. So <Katex tex="\Pr(X>x) = \Pr\!\left(Z>\frac{x-\mu}{\sigma}\right)" />.
          </p>
          <p>
            Sketch the bell curve with both tails shaded before calculating: it makes the sign of{' '}
            <Katex tex="b" /> obvious.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Standardising only relabels the axis: 7 sits half a standard deviation above 6">
          <RulersWidget />
        </Explore>
        <Explore title="Why b is negative: the upper tail has to be flipped to a lower tail">
          <FlipWidget />
        </Explore>
        <WrongMethod
          title="“A variance of 4”, so I divide by 4"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\Pr(X>7) = \Pr\!\left(Z>\tfrac{7-6}{4}\right) = \Pr\!\left(Z>\tfrac14\right)" />
              <Katex display tex="= \Pr\!\left(Z<-\tfrac14\right) \implies b=-\tfrac14" />
            </>
          }
        >
          The <Katex tex="4" /> is <Katex tex="\sigma^2" />, not <Katex tex="\sigma" />. Dividing by{' '}
          <Katex tex="4" /> standardises a different, wider distribution, <Katex tex="N(6,\,4^2)" />, whose
          tail beyond <Katex tex="7" /> is about <Katex tex="0.401" /> instead of <Katex tex="0.309" />. Catch
          it by circling &ldquo;variance&rdquo; as you read the stem and making{' '}
          <Katex tex="\sigma=\sqrt4=2" /> your first line.
        </WrongMethod>
        <WrongMethod
          title="Pr(X > 7) = Pr(X < 5), so b = 5"
          source="Examiner's report"
          working={<Katex display tex="\Pr(X>7) = \Pr(X<5) \implies b=5" />}
        >
          The reflection is right, but <Katex tex="b" /> belongs to <Katex tex="Z" />, and <Katex tex="5" /> is
          still on the <Katex tex="X" /> scale. As a <Katex tex="z" />-value, <Katex tex="5" /> would mean five
          standard deviations above the mean: <Katex tex="\Pr(Z<5)\approx1" />, nowhere near{' '}
          <Katex tex="0.309" />. The sign check catches it (<Katex tex="b" /> must be negative); finish by
          standardising the <Katex tex="5" />: <Katex tex="\frac{5-6}{2}=-\tfrac12" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
