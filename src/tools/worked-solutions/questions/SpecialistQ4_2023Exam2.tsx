// 2023 Specialist Mathematics — Exam 2, Section B Question 4 (10 marks). Two logistic fish
// populations: partial fractions, the constant of integration, the inflection where growth
// peaks, and a harvesting term. Question text transcribed from the original paper; the graph
// is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2023e2-q4f-sketch.png'

const EXAM_A: SAExaminerStats = { marks: [52, 48], average: 0.5 }
const EXAM_B: SAExaminerStats = { marks: [43, 57], average: 0.6 }
const EXAM_C: SAExaminerStats = { marks: [21, 79], average: 0.8 }
const EXAM_D: SAExaminerStats = { marks: [15, 85], average: 0.9 }

const EXAM_EI: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: (
    <>
      A variety of correct equivalent forms were seen.
      <br />
      A common error involved not recognising the need to use the chain rule when
      differentiating <Katex tex="Q" /> with respect to <Katex tex="t" />. Some students did
      not express their answers in terms of <Katex tex="Q" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [32, 11, 57],
  average: 1.3,
  comment: (
    <>
      Most students correctly eliminated <Katex tex="Q=1\text{ and }1000" /> to give the
      correct answer. Some students gave the maximum rate as their final answer.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [30, 28, 43],
  average: 1.1,
  comment: (
    <>
      Many students incorrectly labelled the asymptote with the equation{' '}
      <Katex tex="y=1000" /> and some students did not follow the instruction to label the{' '}
      <Katex tex="Q" />-intercept with its coordinate. Most students sketched the shape of the
      logistic curve well.
    </>
  ),
}

const EXAM_G: SAExaminerStats = { marks: [60, 40], average: 0.4 }

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{P\left(1-\frac{P}{1000}\right)} = \frac AP+\frac{B}{1-\frac{P}{1000}}" />,
    reason: <>Separating the logistic equation puts this on the left; partial fractions is how it gets integrated.</>,
  },
  {
    working: <Katex display tex="1 = A\left(1-\frac{P}{1000}\right)+BP" />,
    reason: <>Multiplying through by the denominator.</>,
  },
  {
    working: <Katex display tex="P=0: \ 1 = A \implies A = 1" />,
    reason: <>The convenient substitution.</>,
  },
  {
    working: <Katex display tex="P=1000: \ 1 = 1000B \implies B = \frac{1}{1000}" />,
    reason: <>The other one.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 1, \quad B = \frac{1}{1000}}" />,
    reason: <>Check by combining: <Katex tex="\tfrac1P+\tfrac{1/1000}{1-P/1000}" /> does return the original ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="P = \frac{1000}{1+De^{-t}}" />,
    reason: <>The given form of the solution.</>,
  },
  {
    working: <Katex display tex="t=0: \ P = 200 \implies \frac{1000}{1+D} = 200" />,
    reason: <>"200 fish into a pond that originally contained no fish" — the release happens at t = 0.</>,
  },
  {
    working: <Katex display tex="1+D = 5 \implies \boxed{D = 4}" />,
    reason: <>Note the pattern: <Katex tex="D=\tfrac{1000}{P_0}-1" />, which part c. reuses.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Q = \frac{1000}{1+9e^{-1.1t}}" />,
    reason: <>The model for pond 2.</>,
  },
  {
    working: <Katex display tex="t=0: \ Q = \frac{1000}{1+9e^{0}} = \frac{1000}{10}" />,
    reason: <><Katex tex="e^0=1" />, so the initial population is just <Katex tex="\tfrac{1000}{1+9}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 100}" />,
    reason: <>Consistent with part b.: <Katex tex="9=\tfrac{1000}{100}-1" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="Q(6) = \frac{1000}{1+9e^{-1.1(6)}} = \frac{1000}{1+9e^{-6.6}}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="e^{-6.6} = 0.001360\ldots \implies Q = \frac{1000}{1.012245}" />,
    reason: <>The exponential is already tiny, so the population is close to its ceiling.</>,
  },
  {
    working: <Katex display tex="\boxed{Q \approx 988}" />,
    reason: <>To the nearest integer. Six years in, pond 2 is within 2% of its carrying capacity of 1000.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \frac{11}{10}Q\left(1-\frac{Q}{1000}\right)" />,
    reason: <>Given.</>,
  },
  {
    working: <Katex display tex="\frac{d^2Q}{dt^2} = \frac{d}{dQ}\left[\frac{dQ}{dt}\right]\cdot\frac{dQ}{dt}" />,
    reason: <>The chain rule — <Katex tex="\tfrac{dQ}{dt}" /> is a function of <Katex tex="Q" />, and <Katex tex="Q" /> is a function of <Katex tex="t" />. The report notes a common error was not recognising the need for the chain rule.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dQ}\left[\frac{11}{10}Q-\frac{11Q^2}{10\,000}\right] = \frac{11}{10}-\frac{11Q}{5000} = \frac{11}{10}\left(1-\frac{Q}{500}\right)" />,
    reason: <>Differentiating the quadratic in Q.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2Q}{dt^2} = \frac{121}{100}\,Q\left(1-\frac{Q}{500}\right)\left(1-\frac{Q}{1000}\right)}" />,
    reason: <>Equivalently <Katex tex="\tfrac{121\,Q(Q-1000)(Q-500)}{5\times10^7}" />. In terms of <Katex tex="Q" /> only, as asked.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d^2Q}{dt^2} = 0 \implies Q = 0, \ 500 \ \text{ or } \ 1000" />,
    reason: <>The rate of growth is greatest where its derivative vanishes.</>,
  },
  {
    working: <Katex display tex="Q=0 \text{ and } Q=1000 \text{ give } \frac{dQ}{dt} = 0" />,
    reason: <>Both are equilibria, where the population is not growing at all — minima of the growth rate, not maxima. (The report prints "eliminated <Katex tex="Q=1" /> and 1000"; the equilibrium is <Katex tex="Q=0" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{Q = 500}" />,
    reason: <>Half the carrying capacity — always where a logistic model grows fastest.</>,
  },
  {
    working: <Katex display tex="\frac{1000}{1+9e^{-1.1t}} = 500 \implies 9e^{-1.1t} = 1" />,
    reason: <>Now find when it happens.</>,
  },
  {
    working: <Katex display tex="t = \frac{\log_e(9)}{1.1} = 1.997\ldots \implies \boxed{t \approx 2 \text{ years}}" />,
    reason: <>To the nearest year. The question asks for both the population and the time, so give both — the report notes some students gave the maximum <em>rate</em> as their final answer.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="Q(0) = 100 \implies \text{intercept } (0,\,100)" />,
    reason: <>From part c. — and the question asks for the coordinates, not just a mark on the axis.</>,
  },
  {
    working: <Katex display tex="t\to\infty \implies 9e^{-1.1t}\to0 \implies Q\to1000" />,
    reason: <>The carrying capacity.</>,
  },
  {
    working: <Katex display tex="\text{Asymptote: } Q = 1000" />,
    reason: <>The vertical variable here is <Katex tex="Q" />, not <Katex tex="y" /> — the report notes many students incorrectly labelled it <Katex tex="y=1000" />.</>,
  },
  {
    working: <Katex display tex="\text{Inflection at } (2,\,500) \text{ from part e.ii}" />,
    reason: <>The curve is concave up below 500 and concave down above it — the S-shape.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={graphSrc}
          alt="The answer on VCAA's grid (t from 0 to 6.4 in steps of 0.2, Q up to 1050 in steps of 50): a logistic S-curve rising from the labelled intercept (0, 100) and flattening towards the dashed asymptote labelled Q = 1000"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Only what the question asks is labelled: the <Katex tex="Q" />-intercept with its coordinates and the asymptote with its equation.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \frac{11}{10}Q\left(1-\frac{Q}{1000}\right)-0.055Q" />,
    reason: <>The modified model: logistic growth less a 5.5% annual harvest.</>,
  },
  {
    working: <Katex display tex="\text{Maximum sustainable population} \iff \frac{dQ}{dt} = 0" />,
    reason: <>The new equilibrium — the level the population settles at, and cannot exceed.</>,
  },
  {
    working: <Katex display tex="Q\left[\frac{11}{10}-\frac{11Q}{10\,000}-0.055\right] = 0" />,
    reason: <>Factorising out <Katex tex="Q" />. The root <Katex tex="Q=0" /> is extinction, not a maximum.</>,
  },
  {
    working: <Katex display tex="1.045 = \frac{11Q}{10\,000} \implies Q = \frac{10\,450}{11}" />,
    reason: <><Katex tex="1.1-0.055=1.045" />.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = 950}" />,
    reason: <>Harvesting 5.5% a year costs the pond 50 fish of capacity — a 5% reduction, close to the harvest rate itself.</>,
  },
]

export default function SpecialistQ4_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          A fish farmer releases 200 fish into a pond that originally contained no fish. The
          fish population, <Katex tex="P" />, grows according to the logistic model,{' '}
          <Katex tex="\dfrac{dP}{dt}=P\left(1-\dfrac{P}{1000}\right)" />, where{' '}
          <Katex tex="t" /> is the time in years after the release of the 200 fish.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            A logistic curve always has the same three features, and this question walks
            through all of them: a carrying capacity (the horizontal asymptote), an{' '}
            <Katex tex="S" />-shape, and an inflection at exactly <em>half</em> the
            carrying capacity, where growth is fastest.
          </p>
          <p>
            Part e.i. is the one that catches people. <Katex tex="\tfrac{dQ}{dt}" /> is given
            as a function of <Katex tex="Q" />, so differentiating it with respect to{' '}
            <Katex tex="t" /> needs the chain rule:{' '}
            <Katex tex="\tfrac{d^2Q}{dt^2}=\tfrac{d}{dQ}\!\left(\tfrac{dQ}{dt}\right)\cdot\tfrac{dQ}{dt}" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Partial Fractions"
        marks={1}
        statement={
          <div className="flex flex-col gap-2">
            <p>The above logistic differential equation can be expressed as</p>
            <Katex display tex="\int\frac AP+\frac{B}{1-\frac{P}{1000}}\,dP=\int dt, \ \text{where } A,B\in R." />
            <p>
              Find the values of <Katex tex="A" /> and <Katex tex="B" />.
            </p>
          </div>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          One form of the solution for <Katex tex="P" /> is{' '}
          <Katex tex="P=\dfrac{1000}{1+De^{-t}}" />, where <Katex tex="D" /> is a real
          constant.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Logistic Solution"
        marks={1}
        statement={
          <>Find the value of <Katex tex="D" />.</>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The farmer releases a batch of <Katex tex="n" /> fish into a second pond, pond 2,
          which originally contained no fish. The population, <Katex tex="Q" />, of fish in
          pond 2 can be modelled by{' '}
          <Katex tex="Q=\dfrac{1000}{1+9e^{-1.1t}}" />, where <Katex tex="t" /> is the time in
          years after the <Katex tex="n" /> fish are released.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Find Parameter"
        marks={1}
        statement={<>Find the value of <Katex tex="n" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Logistic Model"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="Q" /> when <Katex tex="t=6" />.
            <br />
            Give your answer correct to the nearest integer.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Second Derivative"
        marks={1}
        statement={
          <>
            Given that{' '}
            <Katex tex="\dfrac{dQ}{dt}=\dfrac{11}{10}Q\left(1-\dfrac{Q}{1000}\right)" />,
            express <Katex tex="\dfrac{d^2Q}{dt^2}" /> in terms of <Katex tex="Q" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Maximum Growth"
        marks={2}
        statement={
          <>
            Hence or otherwise, find the size of the fish population in pond 2 and the value
            of <Katex tex="t" /> when the rate of growth of the population is a maximum. Give
            your answer for <Katex tex="t" /> correct to the nearest year.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Sketch Logistic"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="Q" /> versus <Katex tex="t" /> on the set of axes
            below. Label any axis intercepts and any asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The farmer wishes to take 5.5% of the fish from pond 2 each year. The modified
          logistic differential equation that would model the fish population,{' '}
          <Katex tex="Q" />, in pond 2 after <Katex tex="t" /> years in this situation is
        </p>
        <Katex display tex="\frac{dQ}{dt}=\frac{11}{10}Q\left(1-\frac{Q}{1000}\right)-0.055Q." />
      </div>

      <PartCard
        letter="g"
        topic="Harvesting"
        marks={1}
        statement={
          <>
            Find the maximum number of fish that could be supported in pond 2 in this
            situation.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
