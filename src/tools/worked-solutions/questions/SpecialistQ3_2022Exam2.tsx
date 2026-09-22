// 2022 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A separable
// differential equation whose solution involves arctan, its limiting behaviour, and a second
// particle chasing the first. Question text transcribed from the original paper; the sketch
// is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2022e2-q3b-sketch.png'

const EXAM_AI: SAExaminerStats = { marks: [15, 85], average: 0.9 }

const EXAM_AII: SAExaminerStats = {
  marks: [17, 10, 73],
  average: 1.6,
  comment: (
    <>
      This question was generally well responded to. Errors involving fractions in the initial
      integration were apparent.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      Relatively few students gave a correct response. Common incorrect responses were{' '}
      <Katex tex="x=1" /> and <Katex tex="y=\log_e\!\left(\tfrac\pi2+1\right)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [19, 50, 31],
  average: 1.1,
  comment: <>A significant number of responses lacked the required precision.</>,
}

const EXAM_C: SAExaminerStats = { marks: [21, 79], average: 0.8 }

const EXAM_D: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      Alternatively, many students correctly substituted <Katex tex="t=6" /> into the two
      expressions, quickly verifying the required result.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [27, 12, 50],
  average: 1.1,
  comment: <>A variety of correct equivalent expressions were seen depending on CAS tools used.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{2e^{-x}}{1+4t^2}" />,
    reason: 'Separable: the right-hand side is a function of x times a function of t.',
  },
  {
    working: <Katex display tex="\boxed{e^{x}\,dx = \frac{2}{1+4t^2}\,dt}" />,
    reason: <>Multiplying both sides by <Katex tex="e^{x}\,dt" />. Note <Katex tex="\tfrac{1}{e^{-x}}=e^{x}" />, so the negative exponent disappears.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int e^{x}\,dx = \int\frac{2}{1+4t^2}\,dt" />,
    reason: 'Integrate the separated equation.',
  },
  {
    working: <Katex display tex="\frac{2}{1+4t^2} = \frac{2}{4\left(t^2+\tfrac14\right)} = \frac{1}{2}\cdot\frac{1}{t^2+\left(\tfrac12\right)^2}" />,
    reason: <>Forcing the formula-sheet shape <Katex tex="\tfrac{1}{a^2+t^2}" /> with <Katex tex="a=\tfrac12" />. The report's "errors involving fractions" live here.</>,
  },
  {
    working: <Katex display tex="\int\frac{2}{1+4t^2}\,dt = \frac12\cdot\frac{1}{\tfrac12}\arctan\!\left(\frac{t}{\tfrac12}\right) = \arctan(2t)" />,
    reason: <>The two halves cancel exactly, which is why the answer is so clean.</>,
  },
  {
    working: <Katex display tex="e^{x} = \arctan(2t)+c" />,
    reason: 'Both sides integrated.',
  },
  {
    working: <Katex display tex="t=0,\ x=0: \quad e^{0} = \arctan(0)+c \implies c = 1" />,
    reason: 'The given initial condition.',
  },
  {
    working: <Katex display tex="\boxed{x = \log_e\bigl(\arctan(2t)+1\bigr)} \ \checkmark" />,
    reason: <>Taking logs of <Katex tex="e^{x}=\arctan(2t)+1" />. The bracket is positive for <Katex tex="t\ge0" />, so the log is defined.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="t\to\infty \implies \arctan(2t)\to\frac\pi2" />,
    reason: <>The limiting behaviour of <Katex tex="\arctan" /> — the report lists this as a cohort-wide area of weakness. It approaches <Katex tex="\tfrac\pi2" />, it does not reach it.</>,
  },
  {
    working: <Katex display tex="x \to \log_e\!\left(\frac\pi2+1\right)" />,
    reason: 'The log is continuous, so the limit passes straight inside it.',
  },
  {
    working: <Katex display tex="\boxed{x = \log_e\!\left(\frac\pi2+1\right)} \approx 0.944" />,
    reason: <>The variable is <Katex tex="x" />, not <Katex tex="y" /> — writing <Katex tex="y=\ldots" /> was a named wrong answer, as was <Katex tex="x=1" /> (which is <Katex tex="e^{x}\to\tfrac\pi2+1" /> misread).</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="t=0: \ x = \log_e(0+1) = 0" />,
    reason: 'The curve starts at the origin, matching the initial condition.',
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{2}{\left(1+4t^2\right)\bigl(\arctan(2t)+1\bigr)} > 0" />,
    reason: 'Always positive, so the curve rises throughout and never turns.',
  },
  {
    working: <Katex display tex="t=10: \ x = \log_e\bigl(\arctan(20)+1\bigr) = 0.9246\ldots" />,
    reason: 'The point the question asks to be plotted and labelled.',
  },
  {
    working: <Katex display tex="\boxed{(10,\,0.92)} \ \text{plotted, with the asymptote } x=\log_e\!\left(\tfrac\pi2+1\right) \text{ drawn}" />,
    reason: <>Both pieces are required. The point sits just <em>below</em> the asymptote (0.9246 against 0.9442) — the report's "lacked the required precision" is about graphs that ran into or over the asymptote.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{speed} = \left|\frac{dx}{dt}\right| = \frac{2}{\left(1+4t^2\right)\bigl(\arctan(2t)+1\bigr)}" />,
    reason: <>Differentiating the rule from part a.ii., or equivalently using <Katex tex="\tfrac{dx}{dt}=2e^{-x}/(1+4t^2)" /> with <Katex tex="e^{x}=\arctan(2t)+1" />. It is positive, so speed equals velocity here.</>,
  },
  {
    working: <Katex display tex="t=3: \quad \frac{2}{\left(1+36\right)\bigl(\arctan(6)+1\bigr)} = \frac{2}{37\times2.4056}" />,
    reason: <><Katex tex="\arctan(6)\approx1.4056" /> radians.</>,
  },
  {
    working: <Katex display tex="\boxed{0.02 \ \mathrm{ms^{-1}}}" />,
    reason: <>The exact value is <Katex tex="0.02247" />, so two decimal places gives <Katex tex="0.02" /> — the particle has all but stopped, which fits the flattening graph in part b.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e\bigl(\arctan(2t)+1\bigr) = \log_e\bigl(\arctan(3t-6)+1\bigr)" />,
    reason: 'Same distance from O means the same value of x.',
  },
  {
    working: <Katex display tex="\arctan(2t) = \arctan(3t-6) \implies 2t = 3t-6" />,
    reason: <>Both <Katex tex="\log_e" /> and <Katex tex="\arctan" /> are one-to-one, so they can be peeled off.</>,
  },
  {
    working: <Katex display tex="t = 6 \ \checkmark" />,
    reason: 'The required verification.',
  },
  {
    working: <Katex display tex="t=6: \ 2(6)=12 \ \text{ and } \ 3(6)-6=12 \implies x = \log_e\bigl(\arctan(12)+1\bigr) \approx 0.9113" />,
    reason: 'Or simply substitute and see both expressions give the same number — the report says most students did it this way, and it is fully acceptable for a "verify".',
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="v_1 = \frac{dx_1}{dt} = \frac{2}{\left(1+4t^2\right)\bigl(\arctan(2t)+1\bigr)}" />,
    reason: 'The first particle, as in part c.',
  },
  {
    working: <Katex display tex="v_2 = \frac{dx_2}{dt} = \frac{3}{\left(1+(3t-6)^2\right)\bigl(\arctan(3t-6)+1\bigr)}" />,
    reason: <>Chain rule on the second rule: the inner derivative is 3, not 2.</>,
  },
  {
    working: <Katex display tex="t=6: \quad 2t = 12 \ \text{ and } \ 3t-6 = 12" />,
    reason: 'From part d., this is where the particles coincide. Both arctan terms are therefore identical.',
  },
  {
    working: <Katex display tex="v_1 = \frac{2}{145\bigl(\arctan(12)+1\bigr)}, \qquad v_2 = \frac{3}{145\bigl(\arctan(12)+1\bigr)}" />,
    reason: <><Katex tex="1+4(36)=145" /> and <Katex tex="1+12^2=145" /> — the denominators match exactly.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{v_1}{v_2} = \frac{2}{3}}" />,
    reason: 'Everything cancels except the chain-rule factors 2 and 3 — which is the whole design of the question. No decimals are needed at any point.',
  },
]

export default function SpecialistQ3_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A particle moves in a straight line so that its distance, <Katex tex="x" /> metres,
          from a fixed origin <Katex tex="O" /> after time <Katex tex="t" /> seconds is given
          by the differential equation{' '}
          <Katex tex="\dfrac{dx}{dt}=\dfrac{2e^{-x}}{1+4t^2}" />, where{' '}
          <Katex tex="x=0" /> when <Katex tex="t=0" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            A <Katex tex="1+4t^2" /> in a denominator is an <Katex tex="\arctan" />, and an{' '}
            <Katex tex="\arctan" /> is bounded — that single observation drives parts b.i.,
            b.ii. and c. The particle can never travel further than{' '}
            <Katex tex="\log_e\!\left(\tfrac\pi2+1\right)\approx0.944" /> metres, no matter how
            long it runs.
          </p>
          <p>
            Rewriting <Katex tex="\tfrac{2}{1+4t^2}" /> as{' '}
            <Katex tex="\tfrac12\cdot\tfrac{1}{t^2+\left(\frac12\right)^2}" /> before
            integrating is worth the extra line; guessing the constant that comes out of the
            dilation is where the marks were lost.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a.i"
        marks={1}
        statement={
          <>
            Express the differential equation in the form{' '}
            <Katex tex="\displaystyle\int g(x)\,dx=\int f(t)\,dt" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        marks={2}
        statement={
          <>
            Hence, show that <Katex tex="x=\log_e\bigl(\arctan(2t)+1\bigr)" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            The graph of <Katex tex="x=\log_e\bigl(\arctan(2t)+1\bigr)" /> has a horizontal
            asymptote. Write down the equation of this asymptote.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="x=\log_e\bigl(\arctan(2t)+1\bigr)" /> and the
            horizontal asymptote on the axes provided. Using coordinates, plot and label the
            point where <Katex tex="t=10" />, giving the value of <Katex tex="x" /> correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="A curve rising steeply from the origin and flattening towards the dashed horizontal asymptote x = log_e(π/2 + 1), with the point (10, 0.92) marked just below it"
            className="w-full max-w-[520px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Find the speed of the particle when <Katex tex="t=3" />. Give your answer in
            metres per second, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Two seconds after the first particle passed through <Katex tex="O" />, a second
          particle passes through <Katex tex="O" />. Its distance <Katex tex="x" /> metres from{' '}
          <Katex tex="O" />, <Katex tex="t" /> seconds after the first particle passed through{' '}
          <Katex tex="O" />, is given by{' '}
          <Katex tex="x=\log_e\bigl(\arctan(3t-6)+1\bigr)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Verify that the particles are the same distance from <Katex tex="O" /> when{' '}
            <Katex tex="t=6" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Find the ratio of the speed of the first particle to the speed of the second
            particle when the particles are at the same distance from <Katex tex="O" />. Give
            your answer as <Katex tex="\dfrac ab" /> in simplest form, where{' '}
            <Katex tex="a" /> and <Katex tex="b" /> are positive integers.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
