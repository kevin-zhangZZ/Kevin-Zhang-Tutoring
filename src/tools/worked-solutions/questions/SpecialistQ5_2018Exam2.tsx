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
// Question text transcribed from the original paper. Answers verified numerically.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

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
    reason: <>The question wants distance as a function of <em>speed</em>, so choose the form of acceleration that involves <Katex tex="x" /> and <Katex tex="v" /> and no <Katex tex="t" />. Picking the right one of the three forms is the first mark.</>,
  },
  {
    working: <Katex display tex="v\frac{dv}{dx} = \frac{g-2v}{2}" />,
    reason: <>Substituting the acceleration given in part (b)(ii).</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dv} = \frac{2v}{g-2v}" />,
    reason: <>Inverting. This is now a straightforward integration with respect to <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="\frac{2v}{g-2v} = -1 + \frac{g}{g-2v}" />,
    reason: <>Polynomial division, in effect: <Katex tex="\tfrac{2v}{g-2v}=\tfrac{-(g-2v)+g}{g-2v}" />. Without this split the integral is not obviously doable by hand.</>,
  },
  {
    working: <Katex display tex="x = -v - \frac{g}{2}\log_e(g-2v) + c" />,
    reason: <>Integrating. The <Katex tex="-\tfrac{g}{2}" /> comes from <Katex tex="g\times\tfrac{1}{-2}" /> by the chain rule on <Katex tex="g-2v" />.</>,
  },
  {
    working: <Katex display tex="x=0 \text{ when } v=0 \implies c = \frac{g}{2}\log_e(g)" />,
    reason: <>The suitcase starts at rest at the top of the ramp, which is where <Katex tex="x" /> is measured from.</>,
  },
  {
    working: <Katex display tex="x = -v + \frac{g}{2}\log_e\!\left(\frac{g}{g-2v}\right)" />,
    reason: <>Combining the two logarithms.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -v + 4.9\log_e\!\left(\frac{4.9}{4.9-v}\right)}" />,
    reason: <>Dividing numerator and denominator inside the log by <Katex tex="2" /> puts it in the required form <Katex tex="x=bv+c\log_e\!\left(\tfrac{c}{c-v}\right)" /> with <Katex tex="b=-1" /> and <Katex tex="c=\tfrac{g}{2}=4.9" />. The report says many students solved the equation correctly and then lost the mark on the form.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="15 = -v + 4.9\log_e\!\left(\frac{4.9}{4.9-v}\right)" />,
    reason: <>The ramp is <Katex tex="15" /> m long, so set <Katex tex="x=15" /> and solve for the speed there.</>,
  },
  {
    working: <Cas fn="solve">solve(-v+4.9ln(4.9/(4.9-v)) = 15, v) | 0&lt;v&lt;4.9</Cas>,
    reason: <>Restrict to <Katex tex="0<v<4.9" />: the logarithm is undefined at <Katex tex="v=4.9" /> and beyond, and <Katex tex="4.9" /> is the terminal speed the suitcase approaches but never reaches.</>,
  },
  {
    working: <Katex display tex="\boxed{v \approx 4.81 \text{ m s}^{-1}}" />,
    reason: <>Two decimal places. Sensible: just under the terminal speed of <Katex tex="\tfrac{g}{2}=4.9" /> m s<Katex tex="^{-1}" />, which is exactly what you would expect after <Katex tex="15" /> m of a ramp where resistance is catching up with gravity.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{dv}{dt} = \frac{g-2v}{2}" />,
    reason: <>For a <em>time</em>, use the acceleration form involving <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dv} = \frac{2}{g-2v}" />,
    reason: <>Inverting. The report notes the reciprocal of this — <Katex tex="\tfrac{g-2v}{2}" /> — being integrated instead, which is the single most common error here.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \int_0^{4.5}\frac{2}{9.8-2v}\,dv}" />,
    reason: <>From rest (<Katex tex="v=0" />) to the required <Katex tex="4.5" /> m s<Katex tex="^{-1}" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\int\frac{2}{9.8-2v}\,dv = -\log_e(9.8-2v)" />,
    reason: <>The <Katex tex="2" /> on top and the <Katex tex="-2" /> from the chain rule cancel to <Katex tex="-1" />.</>,
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
    reason: <>Two decimal places. Consistent with part (d): the suitcase reaches <Katex tex="4.5" /> m s<Katex tex="^{-1}" /> in about two and a half seconds, then spends the rest of the ramp creeping the last <Katex tex="0.3" /> m s<Katex tex="^{-1}" /> towards its terminal speed.</>,
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
        <p>
          Parts (a) and (b) ask for a force diagram and an equation of motion by resolving
          forces — force analysis, which is not part of the current study design. Part
          (b)(ii) establishes that the magnitude of the acceleration down the ramp is{' '}
          <Katex tex="a=\dfrac{g-2v}{2}" />, and the remaining parts use that result.
        </p>
      </div>

      <PartCard letter="c" marks={2} statement={<>By expressing <Katex tex="a" /> in an appropriate form, find the distance <Katex tex="x" /> metres that the suitcase has slid as a function of <Katex tex="v" />. Give your answer in the form <Katex tex="x=bv+c\log_e\!\left(\dfrac{c}{c-v}\right)" />, where <Katex tex="b,c\in\mathbb{R}" />.</>} examinerReport={EXAM_C}>
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
            Part (c) asks for <Katex tex="x" /> as a function of <Katex tex="v" /> with no
            time in sight, so it is the second. Part (e) asks for a time, so it is the first.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>Find the velocity of the suitcase just before it reaches the end of the ramp. Give your answer in m s<Katex tex="^{-1}" />, correct to two decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e.i" marks={1} statement={<>Write down a definite integral that gives the time taken for the suitcase to reach a speed of <Katex tex="4.5" /> m s<Katex tex="^{-1}" />.</>} examinerReport={EXAM_EI}>
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard letter="e.ii" marks={1} statement={<>Find the time taken for the suitcase to reach a speed of <Katex tex="4.5" /> m s<Katex tex="^{-1}" />. Give your answer in seconds, correct to two decimal places.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
