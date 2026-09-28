// 2018 Specialist Mathematics — Exam 2, Section B, Question 5, parts (c)–(e) (5 of the
// question's 8 marks). A suitcase sliding down a ramp against a resistance proportional to
// speed.
//
// Parts (a) and (b) are omitted: (a) asks for a force diagram and (b) for an equation of
// motion by resolving forces parallel to the ramp — both squarely force analysis, which is
// off the current study design. Part (b)(ii) hands you the resulting acceleration
// a = (g − 2v)/2, and from there parts (c), (d) and (e) are ordinary differential-equation
// work. The skip guide already treats 2015 Exam 2 SAQ5 and 2016 Exam 2 SAQ5 the same way:
// skip the force-resolution parts, keep the rest using the supplied equation.
//
// Question text transcribed from the original paper. Answers verified numerically (sympy/scipy,
// Sept 2026: x(15) solved to v = 4.8141; ∫₀^4.5 2/(9.8 − 2v) dv = logₑ(12.25) = 2.5055, and a
// direct numerical solution of dv/dt = 4.9 − v agrees). Agrees with the report and itute.
// Solution is original.
//
// Interactives: (c) spec-2018e2-q5c-chain — slide along part c.'s v–x curve: slope dv/dx is per
// metre, times v metres per second gives a = 4.9 − v; (d) spec-2018e2-q5d-terminal — the gap up to
// v = 4.9 is the acceleration, so the speed at x = 15 is just under 4.9; (e.i) spec-2018e2-q5e-time-
// area — the time is the area under 1/a, with a toggle integrating a (the report's reciprocal error).
// WrongMethod boxes: (c) not in the required form, (e.i) the reciprocal integrand — both from the
// examiner's report.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const ChainWidget = lazyWidget(() => import('../interactives/spec-2018e2-q5c-chain'))
const TerminalWidget = lazyWidget(() => import('../interactives/spec-2018e2-q5d-terminal'))
const TimeAreaWidget = lazyWidget(() => import('../interactives/spec-2018e2-q5e-time-area'))

const EXAM_C: SAExaminerStats = {
  marks: [28, 49, 23],
  average: 1.0,
  comment: (
    <>
      Most students set up a differential equation using the appropriate derivative form of
      acceleration. Many students who successfully solved the equation, by a variety of
      suitable means, did not give the solution in the required form.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [74, 26],
  average: 0.3,
  comment: <>Difficulty with Question 5c. led to many students not answering this question successfully.</>,
}

const EXAM_EI: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: <>An incorrect integrand, typically the reciprocal of the correct integrand, was common.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      Correct definite integrals in the previous question generally resulted in correct
      responses for this one.
    </>
  ),
}

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>How would I know? The answer has to link <Katex tex="x" /> and <Katex tex="v" /> with no <Katex tex="t" />, and <Katex tex="v\tfrac{dv}{dx}" /> is the form of acceleration containing exactly those two. It is the chain rule, <Katex tex="\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}" />: speed gained per metre, times metres travelled per second. The report says most students chose the appropriate form.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{dx} = \frac{g-2v}{2}" />,
    reason: <>Substituting the acceleration given in part b.ii.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{2v}{g-2v}" />,
    reason: <>Why flip? You can&apos;t integrate <Katex tex="\tfrac{dv}{dx}=\tfrac{g-2v}{2v}" /> with respect to <Katex tex="x" />, because you don&apos;t yet know <Katex tex="v" /> in terms of <Katex tex="x" />. The right-hand side involves only <Katex tex="v" />, so write <Katex tex="\tfrac{dx}{dv}" /> instead and integrate with respect to <Katex tex="v" />: that gives <Katex tex="x" /> as a function of <Katex tex="v" />, which is exactly what is asked for.</>,
  },
  {
    working: <Katex display tex="\frac{2v}{g-2v} = -1 + \frac{g}{g-2v}" />,
    reason: <>Top and bottom have the same degree in <Katex tex="v" />, so divide first: <Katex tex="\tfrac{2v}{g-2v}=\tfrac{-(g-2v)+g}{g-2v}" />. Without this split the integral is not obviously doable by hand.</>,
  },
  {
    working: <Katex display tex="x = -v - \frac{g}{2}\log_e(g-2v) + c" />,
    reason: <>Integrating. The <Katex tex="-\tfrac{g}{2}" /> comes from <Katex tex="g\times\tfrac{1}{-2}" /> by the chain rule on <Katex tex="g-2v" />. No absolute value is needed: starting from rest, <Katex tex="g-2v>0" /> throughout, since the speed never reaches <Katex tex="\tfrac{g}{2}" /> (see part d.).</>,
  },
  {
    working: <Katex display tex="x=0 \text{ when } v=0 \implies c = \frac{g}{2}\log_e(g)" />,
    reason: <>The suitcase starts at rest at the top of the ramp, which is where <Katex tex="x" /> is measured from.</>,
  },
  {
    working: <Katex display tex="x = -v + \frac{g}{2}\log_e\!\left(\frac{g}{g-2v}\right)" />,
    reason: <>Combining the two logarithms with <Katex tex="\log_e A-\log_e B=\log_e\tfrac{A}{B}" />, because the required form has a single log.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -v + 4.9\log_e\!\left(\frac{4.9}{4.9-v}\right)}" />,
    reason: <>Dividing numerator and denominator inside the log by <Katex tex="2" /> puts it in the required form <Katex tex="x=bv+c\log_e\!\left(\tfrac{c}{c-v}\right)" /> with <Katex tex="b=-1" /> and <Katex tex="c=\tfrac{g}{2}=4.9" />. The report says many students who solved the equation correctly did not give the solution in the required form.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="15 = -v + 4.9\log_e\!\left(\frac{4.9}{4.9-v}\right)" />,
    reason: <><Katex tex="x" /> is the distance slid from the top, so the end of the <Katex tex="15" /> m ramp is <Katex tex="x=15" />. Part c. gives <Katex tex="x" /> in terms of <Katex tex="v" />; now run it backwards and ask which <Katex tex="v" /> gives <Katex tex="x=15" />. That is why this part depended so heavily on part c.</>,
  },
  {
    working: <Cas fn="solve">solve(-v+4.9ln(4.9/(4.9-v)) = 15, v) | 0&lt;v&lt;4.9</Cas>,
    reason: <>A mix of <Katex tex="v" /> and <Katex tex="\log_e" /> can&apos;t be rearranged by hand, so solve numerically. Restrict to <Katex tex="0<v<4.9" />: the logarithm is undefined at <Katex tex="v=4.9" /> and beyond, and <Katex tex="4.9" /> is the terminal speed the suitcase approaches but never reaches.</>,
  },
  {
    working: <Katex display tex="\boxed{v \approx 4.81 \text{ m s}^{-1}}" />,
    reason: <>Two decimal places. Sensible: just under the terminal speed of <Katex tex="\tfrac{g}{2}=4.9" /> m s<Katex tex="^{-1}" />, which is what you would expect after <Katex tex="15" /> m of a ramp where resistance is catching up with gravity.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt} = \frac{g-2v}{2}" />,
    reason: <>For a <em>time</em>, use the form of acceleration that contains <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{2}{g-2v}" />,
    reason: <>Flip both sides, for the same reason as in part c.: the right-hand side involves only <Katex tex="v" />. Read <Katex tex="\tfrac{dt}{dv}=\tfrac1a" /> as &ldquo;seconds per unit of speed gained&rdquo;, which is large when the acceleration is small. The report says integrating the reciprocal, <Katex tex="\tfrac{g-2v}{2}" />, was common.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \int_0^{4.5}\frac{2}{9.8-2v}\,dv}" />,
    reason: <>Integrate from rest (<Katex tex="v=0" /> when <Katex tex="t=0" />) up to the required <Katex tex="4.5" /> m s<Katex tex="^{-1}" />, with <Katex tex="g=9.8" />. The integrand is defined on the whole interval because <Katex tex="4.5<4.9" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\int\frac{2}{9.8-2v}\,dv = -\log_e(9.8-2v)" />,
    reason: <>The <Katex tex="2" /> on top and the <Katex tex="-2" /> from the chain rule cancel to <Katex tex="-1" />. (On CAS, just evaluate the integral from e.i.)</>,
  },
  {
    working: <Katex display tex="t = \Bigl[-\log_e(9.8-2v)\Bigr]_0^{4.5} = -\log_e(0.8)+\log_e(9.8)" />,
    reason: <><Katex tex="9.8-9=0.8" /> at the upper terminal.</>,
  },
  {
    working: <Katex display tex="= \log_e\!\left(\frac{9.8}{0.8}\right) = \log_e(12.25)" />,
    reason: <>Combining.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 2.51 \text{ seconds}}" />,
    reason: <>Two decimal places. Consistent with part d.: putting <Katex tex="v=4.5" /> into part c. shows the suitcase has slid only about <Katex tex="7.8" /> m by then, so it spends the remaining <Katex tex="7.2" /> m (about another <Katex tex="1.5" /> s) gaining just <Katex tex="0.31" /> m s<Katex tex="^{-1}" /> more, reaching <Katex tex="4.81" /> m s<Katex tex="^{-1}" /> at the bottom.</>,
  },
]

export default function SpecialistQ5_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (parts c–e)</p>
        <p className="mb-2">
          Luggage at an airport is delivered to its owners via a <Katex tex="15" /> m ramp
          that is inclined at <Katex tex="30^\circ" /> to the horizontal. A <Katex tex="20" />{' '}
          kg suitcase, initially at rest at the top of the ramp, slides down the ramp against
          a resistance of <Katex tex="v" /> newtons per kilogram, where <Katex tex="v" /> m
          s<Katex tex="^{-1}" /> is the speed of the suitcase.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background title="Why only parts c.–e.">
          <p>
            Parts a. and b. ask for a force diagram and an equation of motion by resolving
            forces — force analysis, which is not part of the current study design. Part b.ii.
            establishes that the magnitude of the acceleration, <Katex tex="a" /> m s
            <Katex tex="^{-2}" />, of the suitcase down the ramp is{' '}
            <Katex tex="a=\dfrac{g-2v}{2}" />, and the remaining parts use that result.
          </p>
        </Background>
      </div>

      <PartCard letter="c" topic="Velocity-Distance DE" marks={2} statement={<>By expressing <Katex tex="a" /> in an appropriate form, find the distance <Katex tex="x" /> metres that the suitcase has slid as a function of <Katex tex="v" />. Give your answer in the form <Katex tex="x=bv+c\log_e\!\left(\dfrac{c}{c-v}\right)" />, where <Katex tex="b,c\in R" />.</>} examinerReport={EXAM_C}>
        <Background title="Which form of acceleration?">
          <p>
            Acceleration can be written three ways, and choosing the right one is most of the
            work in questions like this:
          </p>
          <p>
            <Katex tex="a=\dfrac{dv}{dt}" /> — when you want <em>time</em>.{' '}
            <Katex tex="a=v\dfrac{dv}{dx}" /> — when you want <em>distance</em> in terms of
            speed. <Katex tex="a=\dfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> — the same thing
            in a form that is sometimes tidier.
          </p>
          <p>
            Part c. asks for <Katex tex="x" /> as a function of <Katex tex="v" /> with no
            time in sight, so it is the second. Part e. asks for a time, so it is the first.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why a = v dv/dx: speed per metre, times metres per second">
          <ChainWidget />
        </Explore>
        <WrongMethod
          title="I've solved the DE, so any correct expression for x will do"
          source="Examiner's report"
          working={<Katex display tex="x = -v - 4.9\log_e(9.8-2v) + 4.9\log_e(9.8)" />}
        >
          This is a correct solution, but it is not in the form{' '}
          <Katex tex="x=bv+c\log_e\!\left(\tfrac{c}{c-v}\right)" /> the question asked for, and the report says many
          students who solved the equation did not give the solution in the required form. Combine the logs into one, then divide top and bottom
          inside it by <Katex tex="2" /> so the number in the log matches the number in front. Check: you should be
          able to read <Katex tex="b=-1" /> and <Katex tex="c=4.9" /> straight off your final line.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Velocity" marks={1} statement={<>Find the velocity of the suitcase just before it reaches the end of the ramp. Give your answer in m s<Katex tex="^{-1}" />, correct to two decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Why the speed at the bottom is just under 4.9">
          <TerminalWidget />
        </Explore>
      </PartCard>

      <PartCard letter="e.i" topic="Time Integral" marks={1} statement={<>Write down a definite integral that gives the time taken for the suitcase to reach a speed of <Katex tex="4.5" /> m s<Katex tex="^{-1}" />.</>} examinerReport={EXAM_EI}>
        <WorkingTable rows={ROWS_EI} />
        <Explore title="Time is the area under 1/a, not under a">
          <TimeAreaWidget />
        </Explore>
        <WrongMethod
          title="Time comes from integrating the acceleration"
          source="Examiner's report"
          working={<Katex display tex="t = \int_0^{4.5}\frac{9.8-2v}{2}\,dv = 11.925" />}
        >
          This integrates <Katex tex="a=\tfrac{dv}{dt}" /> itself, the reciprocal of the right integrand, which the
          report says was common. Integrating with respect to <Katex tex="v" /> needs{' '}
          <Katex tex="\tfrac{dt}{dv}" />, and <Katex tex="\tfrac{dt}{dv}=\tfrac{1}{dv/dt}=\tfrac1a" />. Two quick checks
          catch it: units (<Katex tex="\text{m s}^{-2}\times\text{m s}^{-1}" /> is not seconds), and behaviour
          (the integrand should be <em>large</em> near <Katex tex="v=4.9" />, where speed is gained slowly, not largest
          at the start).
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.ii" topic="Time Integral" marks={1} statement={<>Find the time taken for the suitcase to reach a speed of <Katex tex="4.5" /> m s<Katex tex="^{-1}" />. Give your answer in seconds, correct to two decimal places.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
