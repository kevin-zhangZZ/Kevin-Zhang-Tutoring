// 2023 Mathematical Methods — Exam 2, Section B Question 4 (15 marks). Tennis-ball diameters:
// a normal model, a binomial on top of it, a conditional probability, a confidence level read
// backwards, and a sinusoidal density for serving speeds. Question text transcribed from the
// original paper. Answers checked with scipy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      There were some rounding errors; <Katex tex="0.1586" /> was sometimes seen. Some
      students found <Katex tex="\Pr(D<6.8)" /> rather than <Katex tex="\Pr(D>6.8)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      A common error was solving <Katex tex="\Pr(D<a)=0.9" /> the wrong way round, giving{' '}
      <Katex tex="a=6.57" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      Students need to be aware that with a continuous distribution{' '}
      <Katex tex="\Pr(D<6.95)=\Pr(D\le6.95)" />. Some students gave{' '}
      <Katex tex="0.0062" />, the probability of being larger than 6.95 cm.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [28, 18, 54],
  average: 1.3,
  comment: (
    <>
      Appropriate working must be shown for questions worth more than one mark; students
      needed to give the <Katex tex="n" /> and <Katex tex="p" /> values. Some students solved{' '}
      <Katex tex="\Pr(X=3)" /> or <Katex tex="\Pr(X>3)" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [31, 16, 53],
  average: 1.2,
  comment: (
    <>
      Most students realised this was a conditional probability question.{' '}
      <Katex tex="\tfrac{0.89040}{0.99977}=0.8906" /> was a common incorrect answer, as was
      multiplying the two probabilities.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [59, 15, 26],
  average: 0.7,
  comment: (
    <>
      The maximum value of the standard deviation was not asked for, so any value from 0.00 to
      0.06 was accepted. <Katex tex="\Pr(D<6.86)=0.99" /> was a common incorrect approach.
      Trial and error could be used, but some appropriate working had to be shown.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [66, 15, 19],
  average: 0.5,
  comment: (
    <>
      Many students calculated <Katex tex="\hat p" /> incorrectly, and{' '}
      <Katex tex="\hat p=0.8904" /> was often seen. Some had the correct <Katex tex="z" />{' '}
      value but then gave the answer as 95%.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: <>This question was answered well. There were some rounding errors.</>,
}

const EXAM_I: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: <>This question was answered reasonably well. An exact answer was required.</>,
}

const EXAM_J: SAExaminerStats = {
  marks: [89, 5, 6],
  average: 0.2,
  comment: (
    <>
      Some students did not attempt the question. Others recognised that{' '}
      <Katex tex="a=\tfrac1b" /> but were unable to find the values. A common incorrect answer
      was <Katex tex="a=\tfrac23" />, <Katex tex="b=1" />. Many of those who set up
      simultaneous equations did not multiply the terminals by <Katex tex="b" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="D \sim \mathrm{N}\!\left(6.7,\ 0.1^2\right)" />,
    reason: 'Given.',
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(6.8, ∞, 6.7, 0.1)
      </Cas>
    ),
    reason: <>Upper tail. Note <Katex tex="6.8" /> is exactly one standard deviation above the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{0.1587}" />,
    reason: <>Four decimal places, as asked. The 68–95–99.7 rule predicts <Katex tex="\tfrac{1-0.68}{2}=0.16" /> — a good check.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“larger than 90% of all balls”:</p>
        <Katex display tex="\Pr(D<d) = 0.9" />
      </>
    ),
    reason: <>The 90th percentile. Solving <Katex tex="\Pr(D>d)=0.9" /> instead gives <Katex tex="6.57" />, which is <em>smaller</em> than the mean — a quick sanity check catches it.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.9, 6.7, 0.1)
      </Cas>
    ),
    reason: 'Working backwards from an area to a value.',
  },
  {
    working: <Katex display tex="d = 6.8282\ldots" />,
    reason: <>Equivalently <Katex tex="6.7+1.2816\times0.1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{6.83 \ \text{cm}}" />,
    reason: 'Two decimal places.',
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Fits through} \iff D < 6.95" />,
    reason: 'Strictly smaller — but for a continuous variable the strict and non-strict versions have the same probability.',
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 6.95, 6.7, 0.1)
      </Cas>
    ),
    reason: <><Katex tex="6.95" /> is 2.5 standard deviations above the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{0.9938}" />,
    reason: <>Keep the unrounded <Katex tex="0.993790\ldots" /> — parts d. and e. both use it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number of the 4 balls that fit} \sim \mathrm{Bi}(4,\ 0.993790\ldots)" />,
    reason: <>Four independent trials with the part c. probability. Both <Katex tex="n" /> and <Katex tex="p" /> must be written down — the report is explicit.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = \Pr(X=3)+\Pr(X=4)" />,
    reason: <>"At least 3" out of 4, so two terms. Not <Katex tex="\Pr(X=3)" />, and not <Katex tex="\Pr(X>3)" />.</>,
  },
  {
    working: (
      <Cas fn="binomCdf">
        1 − binomCdf(4, 0.99379, 0, 2)
      </Cas>
    ),
    reason: 'Or add the two individual terms directly.',
  },
  {
    working: <Katex display tex="\boxed{0.9998}" />,
    reason: <>Almost certain, which is right when each ball has a <Katex tex="99.4\%" /> chance on its own.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(6.54<D<6.86 \mid D<6.95) = \frac{\Pr(6.54<D<6.86 \cap D<6.95)}{\Pr(D<6.95)}" />,
    reason: 'The conditional probability formula.',
  },
  {
    working: <Katex display tex="6.86 < 6.95 \implies \{6.54<D<6.86\}\subset\{D<6.95\}" />,
    reason: 'Grade A already implies it fits, so the intersection is just the grade A event. This is the step that simplifies everything.',
  },
  {
    working: <Katex display tex="\Pr(6.54<D<6.86) = 0.890401\ldots" />,
    reason: <>From <Katex tex="\mathrm{normCdf}(6.54,6.86,6.7,0.1)" />.</>,
  },
  {
    working: <Katex display tex="\frac{0.890401\ldots}{0.993790\ldots}" />,
    reason: <>Dividing by part c. Multiplying the two instead — another of the report's named errors — would give <Katex tex="0.8849" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.8960}" />,
    reason: <>Slightly larger than the unconditional <Katex tex="0.8904" />, as conditioning on a likely event should make it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="6.86-6.7 = 0.16 = 6.7-6.54" />,
    reason: 'The grade A window is symmetric about the mean, which is what makes this tractable by hand.',
  },
  {
    working: <Katex display tex="\Pr(6.54<D<6.86) > 0.99 \implies \Pr\!\left(-\frac{0.16}{\sigma}<Z<\frac{0.16}{\sigma}\right) > 0.99" />,
    reason: 'Standardising. The two tails share the remaining 1%, half each.',
  },
  {
    working: <Katex display tex="\frac{0.16}{\sigma} > z_{0.995} = 2.5758\ldots" />,
    reason: <>Solving <Katex tex="\Pr(D<6.86)=0.99" /> instead uses <Katex tex="z=2.3263" /> and is the report's named wrong approach — it leaves 1% in one tail rather than across both.</>,
  },
  {
    working: <Katex display tex="\sigma < \frac{0.16}{2.5758} = 0.0621\ldots" />,
    reason: 'The condition on the standard deviation.',
  },
  {
    working: <Katex display tex="\boxed{\sigma = 0.06 \ \text{cm}}" />,
    reason: <>To two decimal places. Any value from <Katex tex="0.00" /> to <Katex tex="0.06" /> was accepted, since the question asked for "the required standard deviation", not the largest one.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{0.7382+0.9493}{2} = 0.84375" />,
    reason: <>The centre of the interval. Reusing <Katex tex="0.8904" /> from part e. — the report's common error — ignores that this is a <em>sample</em> of 32.</>,
  },
  {
    working: <Katex display tex="E = 0.9493-0.84375 = 0.10555" />,
    reason: 'Half the width: the margin of error.',
  },
  {
    working: <Katex display tex="E = z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}} \implies 0.10555 = z\sqrt{\frac{0.84375\times0.15625}{32}}" />,
    reason: <>The only unknown left is <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="z = \frac{0.10555}{0.064186} = 1.6444\ldots" />,
    reason: <>Not <Katex tex="1.96" />, so this is not a 95% interval — assuming it was is what the report saw.</>,
  },
  {
    working: <Katex display tex="\Pr(-1.6444<Z<1.6444) = 0.8999\ldots" />,
    reason: 'Converting the z-score back into a confidence level.',
  },
  {
    working: <Katex display tex="\boxed{90\%}" />,
    reason: <>To the nearest integer. The familiar pairing <Katex tex="z=1.645 \leftrightarrow 90\%" /> is worth recognising on sight.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(V>50) = \int_{50}^{3\pi^2+30}\frac{1}{6\pi}\sin\!\left(\sqrt{\frac{v-30}{3}}\right)dv" />,
    reason: <>From 50 up to the top of the support, <Katex tex="3\pi^2+30\approx59.6" />.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(sin(√((v−30)/3))/(6π), v, 50, 3π²+30)
      </Cas>
    ),
    reason: 'No elementary antiderivative in an obvious form, so integrate numerically.',
  },
  {
    working: <Katex display tex="\boxed{0.1345}" />,
    reason: <>Four decimal places. Check the density really is one: the same integral from 30 to <Katex tex="3\pi^2+30" /> gives exactly 1 ✓.</>,
  },
]

const ROWS_I: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(V) = \int_{30}^{3\pi^2+30}v\,f(v)\,dv" />,
    reason: 'The definition, and the question wants it exact.',
  },
  {
    working: <Katex display tex="u = \sqrt{\frac{v-30}{3}} \implies v = 3u^2+30, \quad dv = 6u\,du" />,
    reason: <>The substitution the square root is asking for. The terminals become <Katex tex="u=0" /> and <Katex tex="u=\pi" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(V) = \frac{1}{6\pi}\int_0^{\pi}\left(3u^2+30\right)\sin(u)\cdot6u\,du = \frac1\pi\int_0^{\pi}\left(3u^3+30u\right)\sin(u)\,du" />,
    reason: 'Everything is now a polynomial times a sine.',
  },
  {
    working: <Katex display tex="\int_0^{\pi}u\sin(u)\,du = \pi, \qquad \int_0^{\pi}u^3\sin(u)\,du = \pi^3-6\pi" />,
    reason: 'Standard integration-by-parts results (or straight from a CAS).',
  },
  {
    working: <Katex display tex="\mathrm{E}(V) = \frac1\pi\left(3\left(\pi^3-6\pi\right)+30\pi\right) = 3\pi^2-18+30" />,
    reason: 'Dividing through.',
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(V) = 3\pi^2+12 = 3\left(\pi^2+4\right) \ \mathrm{ms^{-1}}}" />,
    reason: <>About <Katex tex="41.6\ \mathrm{ms^{-1}}" />, sitting sensibly inside the range <Katex tex="[30,\ 59.6]" />. An exact answer was required.</>,
  },
]

const ROWS_J: WorkingRow[] = [
  {
    working: <Katex display tex="g(w) = a\,f\!\left(\frac wb\right)" />,
    reason: <>A dilation of factor <Katex tex="b" /> from the vertical axis and factor <Katex tex="a" /> from the horizontal one.</>,
  },
  {
    working: <Katex display tex="\int g(w)\,dw = ab\int f(v)\,dv = ab = 1 \implies a = \frac1b" />,
    reason: <>Stretching horizontally by <Katex tex="b" /> multiplies the area by <Katex tex="b" />, so the height must shrink by the same factor for <Katex tex="g" /> to stay a density.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(W) = b\,\mathrm{E}(V)" />,
    reason: <>Horizontal scaling scales the mean. (Formally, substituting <Katex tex="v=\tfrac wb" /> into <Katex tex="\int w\,g(w)\,dw" /> — and the terminals must be multiplied by <Katex tex="b" /> too, which the report says many students forgot.)</>,
  },
  {
    working: <Katex display tex="2\pi^2+8 = b\left(3\pi^2+12\right) \implies b = \frac{2\left(\pi^2+4\right)}{3\left(\pi^2+4\right)}" />,
    reason: <>The bracket <Katex tex="\pi^2+4" /> is common to both, which is the design of the question.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac23, \quad a = \frac32}" />,
    reason: <>Everything cancels. Check: <Katex tex="ab=1" /> ✓, and <Katex tex="\tfrac23\times3\left(\pi^2+4\right)=2\pi^2+8" /> ✓.</>,
  },
]

export default function MethodsQ4_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (15 marks)</p>
        <p>
          A manufacturer produces tennis balls. The diameter of the tennis balls is a normally
          distributed random variable <Katex tex="D" />, which has a mean of 6.7 cm and a
          standard deviation of 0.1 cm.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Parts a. to g. are a tour of the whole probability course on one context: a normal
            calculation, its inverse, a binomial built on a normal probability, a conditional
            probability, an inverse normal in the standard deviation, and a confidence
            interval read backwards for its <Katex tex="z" /> value.
          </p>
          <p>
            Keep the unrounded <Katex tex="\Pr(D<6.95)=0.993790\ldots" /> from part c.: parts
            d. and e. both need it, and rounding to <Katex tex="0.9938" /> first is enough to
            shift the fourth decimal place later.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>Find <Katex tex="\Pr(D>6.8)" />, correct to four decimal places.</>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Find the minimum diameter of a tennis ball that is larger than 90% of all tennis
            balls produced. Give your answer in centimetres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Tennis balls are packed and sold in cylindrical containers. A tennis ball can fit
          through the opening at the top of the container if its diameter is smaller than
          6.95 cm.
        </p>
      </div>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Find the probability that a randomly selected tennis ball can fit through the
            opening at the top of the container. Give your answer correct to four decimal
            places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            In a random selection of 4 tennis balls, find the probability that at least 3
            balls can fit through the opening at the top of the container. Give your answer
            correct to four decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A tennis ball is classed as grade A if its diameter is between 6.54 cm and 6.86 cm,
          otherwise it is classed as grade B.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Given that a tennis ball can fit through the opening at the top of the container,
            find the probability that it is classed as grade A. Give your answer correct to
            four decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            The manufacturer would like to improve processes to ensure that more than 99% of
            all tennis balls produced are classed as grade A. Assuming that the mean diameter
            remains the same, find the required standard deviation of the diameter, in
            centimetres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        marks={2}
        statement={
          <>
            An inspector takes a random sample of 32 tennis balls and determines a confidence
            interval for the population proportion of grade A balls produced. The confidence
            interval is <Katex tex="(0.7382,\,0.9493)" />, correct to four decimal places.
            Find the level of confidence that the population proportion of grade A balls is
            within the interval, as a percentage correct to the nearest integer.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          A tennis coach uses both grade A and grade B balls. The serving speed, in metres per
          second, of a grade A ball is a continuous random variable, <Katex tex="V" />, with
          the probability density function
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(v)=\begin{cases}\dfrac{1}{6\pi}\sin\!\left(\sqrt{\dfrac{v-30}{3}}\right) & 30\le v\le3\pi^2+30\\[10pt]0 & \text{elsewhere}\end{cases}"
          />
        </div>
      </div>

      <PartCard
        letter="h"
        marks={1}
        statement={
          <>
            Find the probability that the serving speed of a grade A ball exceeds 50 metres
            per second. Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>

      <PartCard
        letter="i"
        marks={1}
        statement={
          <>
            Find the <b>exact</b> mean serving speed for grade A balls, in metres per second.
          </>
        }
        examinerReport={EXAM_I}
      >
        <WorkingTable rows={ROWS_I} />
      </PartCard>

      <PartCard
        letter="j"
        marks={2}
        statement={
          <>
            The serving speed of a grade B ball is given by a continuous random variable,{' '}
            <Katex tex="W" />, with probability density function <Katex tex="g(w)" />. A
            transformation maps the graph of <Katex tex="f" /> to the graph of{' '}
            <Katex tex="g" />, where <Katex tex="g(w)=a\,f\!\left(\dfrac wb\right)" />. If the
            mean serving speed for a grade B ball is{' '}
            <Katex tex="2\pi^2+8" /> metres per second, find the values of <Katex tex="a" />{' '}
            and <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_J}
      >
        <WorkingTable rows={ROWS_J} />
      </PartCard>
    </div>
  )
}
