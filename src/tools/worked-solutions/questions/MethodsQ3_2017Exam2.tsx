// 2017 Mathematical Methods — Exam 2, Section B, Question 3 (19 marks).
// A triangular probability density function for homework time, then a binomial layered on
// top of it, ending with maximising a polynomial in p. Question text transcribed from the
// original paper; VCAA supplied only blank axes for part (a), so the sketch below is our
// own matplotlib figure. Answers verified with sympy and scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import densitySrc from './meth-2017exam2-q3a-density.png'

const EXAM_A: SAExaminerStats = {
  marks: [15, 12, 44, 29],
  average: 1.9,
  comment: (
    <>
      Many students did not draw their graphs along the <Katex tex="t" />-axis, ignoring{' '}
      <Katex tex="f(t)=0" />. Some had an open circle at <Katex tex="(45,0.04)" />. Others had
      an open circle over a closed circle at <Katex tex="(45,0.04)" />. Many students did not
      use rulers to draw the line segments. Some graphs looked like parabolas.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [24, 6, 70],
  average: 1.5,
  comment: (
    <>
      This question was answered well. Some students had the incorrect terminals.{' '}
      <Katex tex="44" /> instead of <Katex tex="45" /> was occasionally given. Others used{' '}
      <Katex tex="20" /> as the lower limit instead of <Katex tex="25" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [21, 30, 49],
  average: 1.3,
  comment: (
    <>
      Many students were able to use the conditional probability formula. A common incorrect
      answer was <Katex tex="\tfrac{1}{40}" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [59, 11, 30],
  average: 0.7,
  comment: (
    <>
      A number of correct approaches were used. <Katex tex="\int_{20}^a f(t)\,dt=0.7" />,{' '}
      <Katex tex="a=50.6351" />, was a common incorrect answer. Some students attempted to
      use the inverse normal as a method.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [26, 16, 58],
  average: 1.3,
  comment: (
    <>
      Many students recognised that the distribution was binomial and gave the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> values. Some used{' '}
      <Katex tex="\Pr(X\ge3)" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [31, 11, 59],
  average: 1.3,
  comment: (
    <>
      Many students were able to set up the conditional probability. Some wrote{' '}
      <Katex tex="\Pr(X\ge2\mid X\ge1)=\tfrac{\Pr(X>2)}{\Pr(X>1)}" />. Others rounded
      incorrectly, giving <Katex tex="0.7625" /> as the answer.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [60, 8, 32],
  average: 0.7,
  comment: (
    <>
      Of those who attempted this question, some students did not realise that the binomial
      distribution was required.
    </>
  ),
}

const EXAM_GI: SAExaminerStats = {
  marks: [64, 13, 23],
  average: 0.6,
  comment: (
    <>
      Some students knew to solve <Katex tex="q'(p)=0" /> if they had an equation in Question
      3f. Others found only <Katex tex="p" />. Some gave exact values for their answers.
    </>
  ),
}

const EXAM_GII: SAExaminerStats = {
  marks: [91, 3, 7],
  average: 0.2,
  comment: (
    <>
      Some students used <Katex tex="q" /> instead of <Katex tex="p" /> in their equation.
      Others solved <Katex tex="\int_{20}^{d}f(t)\,dt=0.35388\ldots" />, obtaining{' '}
      <Katex tex="d=41" /> minutes.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(20)=0, \quad f(45)=\tfrac{25}{625}=\tfrac{1}{25}, \quad f(70)=0" />,
    reason: <>Both pieces are straight lines, so three points fix the whole picture. The peak <Katex tex="\tfrac1{25}=0.04" /> is exactly the top gridline VCAA printed.</>,
  },
  {
    working: <Katex display tex="f(t)=0 \text{ for } t<20 \text{ and } t>70" />,
    reason: <>Draw these stretches along the axis too — leaving them out was the single most common error, and one of the three marks was for them.</>,
  },
  {
    working: <Katex display tex="\text{closed point at } \left(45,\tfrac{1}{25}\right)" />,
    reason: <>The two branches meet there and the function is defined there, so it is one continuous graph — no open circle, and no gap.</>,
  },
  {
    working: <Katex display tex="\tfrac12\times50\times\tfrac{1}{25}=1 \ \checkmark" />,
    reason: <>The area of the triangle is <Katex tex="1" />, confirming the sketch really is a probability density function.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(25\le T\le55) = \int_{25}^{45}\frac{t-20}{625}\,dt + \int_{45}^{55}\frac{70-t}{625}\,dt" />,
    reason: <>The interval straddles the join at <Katex tex="t=45" />, so it must be split — one integral per branch.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{625}\left[\frac{(t-20)^2}{2}\right]_{25}^{45} + \frac{1}{625}\left[-\frac{(70-t)^2}{2}\right]_{45}^{55}" />,
    reason: <>Antidifferentiating each linear piece.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{625}\left(\frac{625-25}{2}\right) + \frac{1}{625}\left(\frac{625-225}{2}\right)" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="= \frac{300}{625}+\frac{200}{625} = \frac{500}{625}" />,
    reason: <>Adding.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac45}" />,
    reason: <>Or read it off the sketch as areas of two trapezia — <Katex tex="0.8" /> looks about right for the middle bulk of a symmetric triangle.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\ge25\mid T\le55) = \frac{\Pr(25\le T\le55)}{\Pr(T\le55)}" />,
    reason: <>The conditional probability formula. The numerator is exactly part (b) — the question is built so nothing is wasted.</>,
  },
  {
    working: <Katex display tex="\Pr(T\le55) = \int_{20}^{45}f(t)\,dt + \int_{45}^{55}f(t)\,dt = \frac12+\frac{200}{625}" />,
    reason: <>The first branch contributes exactly half the total area, by symmetry of the triangle.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{2}+\frac{8}{25} = \frac{41}{50}" />,
    reason: <>Common denominator <Katex tex="50" />.</>,
  },
  {
    working: <Katex display tex="\frac{4/5}{41/50} = \frac{4}{5}\times\frac{50}{41}" />,
    reason: <>Dividing by a fraction.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{40}{41}}" />,
    reason: <>About <Katex tex="0.976" />. Very close to <Katex tex="1" />, which makes sense: almost all of the "at most 55 minutes" probability already sits above 25 minutes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\ge a)=0.7 \iff \Pr(T\le a)=0.3" />,
    reason: <>Switching to the left tail is easier here, because <Katex tex="0.3<0.5" /> puts <Katex tex="a" /> on the first branch and only one integral is needed.</>,
  },
  {
    working: <Katex display tex="\int_{20}^{a}\frac{t-20}{625}\,dt = 0.3" />,
    reason: <>Using only the rising branch, valid as long as the answer turns out to be below <Katex tex="45" />.</>,
  },
  {
    working: <Katex display tex="\frac{(a-20)^2}{1250} = 0.3 \implies (a-20)^2 = 375" />,
    reason: <>Evaluating the integral.</>,
  },
  {
    working: <Katex display tex="a = 20+\sqrt{375} = 20+5\sqrt{15}" />,
    reason: <>Take the positive root: <Katex tex="a>20" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx 39.3649}" />,
    reason: <>Four decimal places, and it is indeed below <Katex tex="45" /> ✓. The report's popular wrong answer, <Katex tex="50.6351" />, comes from solving <Katex tex="\Pr(T\le a)=0.7" /> by mistake — note it is the mirror image of this one about <Katex tex="45" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\mathrm{Bi}\!\left(7,\tfrac{8}{25}\right)" />,
    reason: <>Seven independent days, each a success with probability <Katex tex="\tfrac8{25}" /> — that is a binomial, and the question supplies the probability so there is no need to integrate for it.</>,
  },
  {
    working: <Katex display tex="\Pr(X>3) = \Pr(X\ge4)" />,
    reason: <>"More than three" of a whole number of days means four or more. Reading it as <Katex tex="X\ge3" /> is the report's noted slip.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(7, 8/25, 4, 7)</Cas>,
    reason: <>Cumulative from <Katex tex="4" /> to <Katex tex="7" /> inclusive.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1534}" />,
    reason: <>Four decimal places. Plausible: the expected number of such days is <Katex tex="7\times0.32=2.24" />, so exceeding three is on the unlikely side but far from rare.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge2\mid X\ge1) = \frac{\Pr(X\ge2)}{\Pr(X\ge1)}" />,
    reason: <><Katex tex="\{X\ge2\}" /> is entirely inside <Katex tex="\{X\ge1\}" />, so the intersection is just <Katex tex="\{X\ge2\}" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0) = 1-\left(\tfrac{17}{25}\right)^7 \approx 0.93277" />,
    reason: <>The complement is quicker than summing seven terms.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2) \approx 0.71131" />,
    reason: <>From CAS, <Katex tex="\texttt{binomCdf}(7,\,8/25,\,2,\,7)" />.</>,
  },
  {
    working: <Katex display tex="\frac{0.71131\ldots}{0.93277\ldots}" />,
    reason: <>Keep full precision — the report notes that rounding here produced <Katex tex="0.7625" /> instead of <Katex tex="0.7626" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.7626}" />,
    reason: <>Larger than <Katex tex="\Pr(X\ge2)" /> on its own, as conditioning on a weaker event must make it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim\mathrm{Bi}(7,p)" />,
    reason: <>Same seven days, but now with an unknown success probability <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="q = \Pr(Y=2)+\Pr(Y=3)" />,
    reason: <>"Two or three days" is two mutually exclusive cases, so add them.</>,
  },
  {
    working: <Katex display tex="= \binom{7}{2}p^2(1-p)^5 + \binom{7}{3}p^3(1-p)^4" />,
    reason: <>The binomial probability formula applied twice.</>,
  },
  {
    working: <Katex display tex="\boxed{q = 21p^2(1-p)^5 + 35p^3(1-p)^4}" />,
    reason: <>A polynomial of degree <Katex tex="7" /> in <Katex tex="p" />, as required.</>,
  },
  {
    working: <Katex display tex="= 7p^2(1-p)^4(2p+3)" />,
    reason: <>Factorising is optional but makes part (g) tidier: take out <Katex tex="7p^2(1-p)^4" /> and the bracket left is <Katex tex="3(1-p)+5p=3+2p" />.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dq}{dp}=0" />,
    reason: <>A maximum of a differentiable function on <Katex tex="(0,1)" /> is a stationary point. <Katex tex="q" /> is zero at both ends, so the stationary point inside must be the maximum.</>,
  },
  {
    working: <Cas fn="solve">solve(d/dp(21p²(1-p)⁵ + 35p³(1-p)⁴) = 0, p) | 0&lt;p&lt;1</Cas>,
    reason: <>Restrict to <Katex tex="0<p<1" />: the factored form has roots at <Katex tex="p=0" /> and <Katex tex="p=1" /> of high multiplicity, which the CAS will otherwise return as well.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.3539}" />,
    reason: <>Four decimal places, as asked.</>,
  },
  {
    working: <Katex display tex="\boxed{q \approx 0.5665}" />,
    reason: <>Substituting back. Sensible: at <Katex tex="p\approx0.354" /> the expected number of days is about <Katex tex="2.5" />, right between the two outcomes being counted, so "two or three" is as likely as it can get.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T>d) = p = 0.353889\ldots" />,
    reason: <>The definition of <Katex tex="p" /> ties the answer back to the density function. Using <Katex tex="q" /> here instead of <Katex tex="p" /> is the report's noted error.</>,
  },
  {
    working: <Katex display tex="\int_d^{70}\frac{70-t}{625}\,dt = 0.353889\ldots" />,
    reason: <>Since <Katex tex="p<0.5" />, the value of <Katex tex="d" /> lies on the falling branch, so only that piece is needed.</>,
  },
  {
    working: <Katex display tex="\frac{(70-d)^2}{1250} = 0.353889\ldots" />,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="(70-d)^2 = 442.36\ldots \implies 70-d \approx 21.032" />,
    reason: <>Positive root.</>,
  },
  {
    working: <Katex display tex="\boxed{d \approx 49 \text{ minutes}}" />,
    reason: <><Katex tex="48.97" /> to the nearest minute. A quick check: part (e) said <Katex tex="\Pr(T>50)=0.32" />, and <Katex tex="d=49" /> gives a slightly larger probability, <Katex tex="0.354" /> ✓.</>,
  },
]

export default function MethodsQ3_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (19 marks)</p>
        <p className="mb-2">
          The time Jennifer spends on her homework each day varies, but she does some homework
          every day.
        </p>
        <p className="mb-2">
          The continuous random variable <Katex tex="T" />, which models the time,{' '}
          <Katex tex="t" />, in minutes, that Jennifer spends each day on her homework, has a
          probability density function <Katex tex="f" />, where
        </p>
        <Katex
          display
          tex="f(t)=\begin{cases}\dfrac{1}{625}(t-20) & 20\le t<45\\[4pt] \dfrac{1}{625}(70-t) & 45\le t\le 70\\[4pt] 0 & \text{elsewhere}\end{cases}"
        />
      </div>

      <PartCard letter="a" marks={3} statement={<>Sketch the graph of <Katex tex="f" /> on the axes provided.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={densitySrc}
            alt="The density function: zero along the t-axis up to t = 20, a straight line rising from (20, 0) to a peak at (45, 1/25), a straight line falling back to (70, 0), then zero along the axis again"
            className="w-full max-w-[460px]"
          />
        </div>
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find <Katex tex="\Pr(25\le T\le55)" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Find <Katex tex="\Pr(T\ge25\mid T\le55)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Find <Katex tex="a" /> such that <Katex tex="\Pr(T\ge a)=0.7" />, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The probability that Jennifer spends more than <Katex tex="50" /> minutes on her
          homework on any given day is <Katex tex="\tfrac{8}{25}" />. Assume that the amount
          of time spent on her homework on any day is independent of the time spent on her
          homework on any other day.
        </p>
      </div>

      <PartCard
        letter="e.i"
        marks={2}
        statement={
          <>
            Find the probability that Jennifer spends more than <Katex tex="50" /> minutes on
            her homework on more than three of seven randomly chosen days, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <Background title="A binomial on top of a continuous distribution">
          <p>
            Parts (a)–(d) are about one day and use the density function. From here on, each
            day is collapsed into a single yes/no — did she do more than 50 minutes? — and the
            seven days become a binomial.
          </p>
          <p>
            The density function's only job now is to supply the success probability. Here the
            question hands it to you as <Katex tex="\tfrac8{25}" />; in part (g)(ii) you have
            to go back and recover the cut-off from a probability.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        marks={2}
        statement={
          <>
            Find the probability that Jennifer spends more than <Katex tex="50" /> minutes on
            her homework on at least two of seven randomly chosen days, given that she spends
            more than <Katex tex="50" /> minutes on her homework on at least one of those
            days, correct to four decimal places.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Let <Katex tex="p" /> be the probability that on any given day Jennifer spends more
          than <Katex tex="d" /> minutes on her homework.
        </p>
        <p>
          Let <Katex tex="q" /> be the probability that on two or three days out of seven
          randomly chosen days she spends more than <Katex tex="d" /> minutes on her homework.
        </p>
      </div>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            Express <Katex tex="q" /> as a polynomial in terms of <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g.i"
        marks={2}
        statement={
          <>
            Find the maximum value of <Katex tex="q" />, correct to four decimal places, and
            the value of <Katex tex="p" /> for which this maximum occurs, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_GI}
      >
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="d" /> for which the maximum found in{' '}
            <strong>part g.i.</strong> occurs, correct to the nearest minute.
          </>
        }
        examinerReport={EXAM_GII}
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>
    </div>
  )
}
