// 2022 Specialist NHT — Exam 2, Section B Question 3 (9 marks). The NHT report gives sample
// answers only, with no statistics. A mixing tank whose volume grows (15 L + 15 L per minute):
// the concentration, setting up the differential equation, verifying a given solution by
// substitution, and the maximum rate at which the chemical flows out. Question text transcribed
// from the original paper (no diagram). Answers checked with sympy and against the VCAA report's
// sample answers: a. x/(15 + 15t); c.i. (100 − 120 log_e(1 + t))/(1 + t)²; d. 30.8 g/min at
// t = 0.4. "Rate" in d. is the rate at which the chemical flows OUT of the tank, x/(1 + t) g/min
// (the concentration times 15 L/min), not dx/dt: its maximum is 60e^(−2/3) ≈ 30.8 at
// t = e^(1/3) − 1 ≈ 0.4, which is VCAA's answer. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'

const REPORT_B: SAExaminerStats = {
  comment: <>Convincing working leading to the result was required.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="V(t) = 15 + (30-15)t = 15+15t" />,
    reason: <>The volume is not fixed: 30 L flows in each minute but only 15 L flows out, so the tank gains 15 L every minute on top of the 15 L it started with.</>,
    more: <>This is the step most mixing-tank questions hinge on. Writing the concentration as <Katex tex="\tfrac{x}{15}" /> would treat the tank as if it never filled up, and every later part would then be wrong.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{concentration} = \frac{x}{15+15t} \ \text{g/L}}" />,
    reason: <>Concentration is amount divided by volume: <Katex tex="x" /> grams spread through <Katex tex="15+15t" /> litres.</>,
    more: <>Equivalently <Katex tex="\tfrac{x}{15(1+t)}" />, which is the form that makes part b. simplify. Check at <Katex tex="t=0" />: <Katex tex="\tfrac{20}{15}\approx1.33" /> g/L, the 20 grams dissolved in the initial 15 litres.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \text{rate in} - \text{rate out}" />,
    reason: <><Katex tex="x" /> is the amount of chemical in the tank, so its rate of change is what flows in per minute minus what flows out per minute.</>,
  },
  {
    working: <Katex display tex="\text{rate in} = \frac{4}{(1+t)^2}\times30 = \frac{120}{(1+t)^2}" />,
    reason: <>Each rate is (concentration in g/L) × (flow in L/min), which gives g/min. The incoming water has concentration <Katex tex="\tfrac{4}{(1+t)^2}" /> and arrives at 30 L/min.</>,
  },
  {
    working: <Katex display tex="\text{rate out} = \frac{x}{15(1+t)}\times15 = \frac{x}{1+t}" />,
    reason: <>The outflow carries the tank&apos;s own concentration from part a. (the stirring keeps it uniform) at 15 L/min. The 15s cancel.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \frac{120}{(1+t)^2}-\frac{x}{1+t}" />,
    reason: <>Substitute both rates.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt}+\frac{x}{1+t} = \frac{120}{(1+t)^2}" />,
    reason: <>Add <Katex tex="\tfrac{x}{1+t}" /> to both sides. As required.</>,
    more: <>The report says convincing working leading to the result was required: in a &ldquo;show that&rdquo; the marks are for the two rates, each built as concentration × flow rate, not for the final line, which is printed in the question.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x = \frac{120\log_e(1+t)}{1+t}+20(1+t)^{-1}" />,
    reason: <>Differentiate the two terms separately. The first is a quotient; rewriting the second as a power makes it a one-line chain rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dt}\!\left(\frac{120\log_e(1+t)}{1+t}\right) \\ &\quad= \frac{\frac{120}{1+t}(1+t)-120\log_e(1+t)}{(1+t)^2} \\ &\quad= \frac{120-120\log_e(1+t)}{(1+t)^2}\end{aligned}" />,
    reason: <>Quotient rule, <Katex tex="\left(\tfrac uv\right)' = \tfrac{u'v-uv'}{v^2}" />, with <Katex tex="u=120\log_e(1+t)" />, <Katex tex="u'=\tfrac{120}{1+t}" /> and <Katex tex="v=1+t" />, <Katex tex="v'=1" />.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dt}\!\left(20(1+t)^{-1}\right) = -\frac{20}{(1+t)^2}" />,
  },
  {
    working: <Katex display tex="\boxed{\frac{dx}{dt} = \frac{100-120\log_e(1+t)}{(1+t)^2}}" />,
    reason: <>Add the two over the common denominator <Katex tex="(1+t)^2" />: <Katex tex="120-20=100" />.</>,
    more: <>Check at <Katex tex="t=0" />: <Katex tex="\tfrac{dx}{dt}=100" /> g/min. From part b. directly, rate in − rate out <Katex tex="=120-\tfrac{20}{1}=100" />. The two agree.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{LHS} = \frac{dx}{dt}+\frac{x}{1+t}" />,
    reason: <>To verify by substitution, put the given <Katex tex="x" /> and the <Katex tex="\tfrac{dx}{dt}" /> from part c.i. into the left side of the differential equation and show it equals the right side.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \frac{100-120\log_e(1+t)}{(1+t)^2} \\ &\quad+\frac{120\log_e(1+t)}{(1+t)^2}+\frac{20}{(1+t)^2}\end{aligned}" />,
    reason: <>Dividing <Katex tex="x" /> by <Katex tex="1+t" /> squares each denominator: <Katex tex="\tfrac{x}{1+t}=\tfrac{120\log_e(1+t)}{(1+t)^2}+\tfrac{20}{(1+t)^2}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{120}{(1+t)^2} = \text{RHS}" />,
    reason: <>The log terms cancel and <Katex tex="100+20=120" />. So the differential equation is satisfied.</>,
  },
  {
    working: <Katex display tex="t=0: \quad x = \frac{120\log_e(1)}{1}+\frac{20}{1} = 0+20 = 20" />,
    reason: <>The initial condition is the 20 grams in the tank at the start, <Katex tex="x(0)=20" />. Use <Katex tex="\log_e(1)=0" />.</>,
    more: <>The question says <b>both</b>, and the initial condition is easy to forget. A function can satisfy the differential equation without being the right solution: <Katex tex="\tfrac{120\log_e(1+t)}{1+t}" /> alone does, but it starts at <Katex tex="x=0" />. The initial condition is what picks out this tank.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{LHS} = \text{RHS and } x(0)=20}" />,
    reason: <>Both conditions hold. As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="R(t) = \frac{x}{1+t} = \frac{120\log_e(1+t)+20}{(1+t)^2}" />,
    reason: <>The rate at which the chemical flows <em>from</em> the tank is the rate out from part b., <Katex tex="\tfrac{x}{1+t}" /> g/min. It is not <Katex tex="\tfrac{dx}{dt}" />, which is the net rate (in minus out). Substitute the given <Katex tex="x" />.</>,
    more: <>Units confirm the reading: &ldquo;grams per minute&rdquo; is a flow of chemical, and the outflow of chemical is the tank&apos;s concentration (g/L) times 15 L/min.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}R'(t) &= \frac{120-2\left(120\log_e(1+t)+20\right)}{(1+t)^3} \\ &= \frac{80-240\log_e(1+t)}{(1+t)^3}\end{aligned}" />,
    reason: <>Quotient rule with <Katex tex="u=120\log_e(1+t)+20" />, <Katex tex="u'=\tfrac{120}{1+t}" />, <Katex tex="v=(1+t)^2" />, <Katex tex="v'=2(1+t)" />: <Katex tex="R'=\tfrac{u'v-uv'}{v^2}" />, then cancel a factor of <Katex tex="1+t" /> from top and bottom.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}R'(t)=0 \implies \log_e(1+t) = \tfrac13 \\ t = e^{1/3}-1 = 0.3956\ldots\end{gathered}" />,
    reason: <>A maximum is at a stationary point. On CAS, <Cas fn="fMax" /> of <Katex tex="R(t)" /> for <Katex tex="t\ge0" /> gives the same <Katex tex="t" />.</>,
    more: <>Is it a maximum? <Katex tex="R'(t)" /> is positive while <Katex tex="\log_e(1+t)<\tfrac13" /> and negative after, so <Katex tex="R" /> rises then falls. At the endpoint, <Katex tex="R(0)=20" /> (the 20 g in 15 L leaving at 15 L/min), and <Katex tex="R\to0" /> as <Katex tex="t\to\infty" />, so the stationary value is the greatest.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}R\!\left(e^{1/3}-1\right) &= \frac{120\times\frac13+20}{e^{2/3}} \\ &= 60e^{-2/3} = 30.805\ldots\end{aligned}" />,
    reason: <>Substitute back: <Katex tex="\log_e(1+t)=\tfrac13" /> and <Katex tex="(1+t)^2=e^{2/3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{maximum rate } 30.8 \text{ g/min,} \\ \text{at } t = 0.4 \text{ minutes}\end{gathered}}" />,
    reason: <>Both values, each correct to one decimal place, as asked.</>,
    more: <>Plausible: the outflow starts at 20 g/min, and the incoming chemical (120 g/min at first, but falling fast) pushes the tank&apos;s concentration up for a short while before the dilution wins.</>,
  },
]

export default function SpecialistQ3_2022NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (9 marks)</p>
        <p>
          A tank initially contains 15 L of water with 20 grams of a dissolved chemical. Water that
          contains a variable concentration of the chemical, <Katex tex="\dfrac{4}{(1+t)^2}" /> grams
          per litre, where <Katex tex="t\ge0" />, flows into the tank at the rate of{' '}
          <Katex tex="30\ \text{L min}^{-1}" />.
          <br />
          The solution of water and chemical, which is kept uniform by stirring, flows out of the
          tank at the rate of <Katex tex="15\ \text{L min}^{-1}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every mixing-tank question rests on one balance:{' '}
              <Katex tex="\tfrac{dx}{dt}=\text{rate in}-\text{rate out}" />, where each rate of
              chemical is a concentration (g/L) multiplied by a flow rate (L/min). The incoming
              concentration is given; the outgoing concentration is the tank&apos;s own,{' '}
              <Katex tex="\tfrac{\text{amount}}{\text{volume}}" />, because stirring keeps it
              uniform.
            </p>
            <p>
              Here more flows in than out, so the volume grows, and that is why the concentration in
              part a. has <Katex tex="15+15t" /> in the denominator rather than 15.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Concentration"
        marks={1}
        statement={
          <>
            If <Katex tex="x" /> grams of the chemical are present in the tank at time{' '}
            <Katex tex="t" /> minutes, write down, in terms of <Katex tex="x" /> and{' '}
            <Katex tex="t" />, an expression for the concentration of chemical in the tank, in
            grams per litre, at time <Katex tex="t" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Setting Up a DE"
        marks={2}
        statement={
          <>
            Show that the differential equation relating <Katex tex="x" /> to <Katex tex="t" /> is{' '}
            <Katex tex="\dfrac{dx}{dt}+\dfrac{x}{1+t}=\dfrac{120}{(1+t)^2}" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          It can be shown that{' '}
          <Katex tex="x=\dfrac{120\log_e(1+t)}{(1+t)}+\dfrac{20}{(1+t)}" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Quotient Rule"
        marks={1}
        statement={
          <>
            Find <Katex tex="\dfrac{dx}{dt}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Verifying a Solution"
        marks={3}
        statement={
          <>
            Verify by substitution that{' '}
            <Katex tex="x=\dfrac{120\log_e(1+t)}{(1+t)}+\dfrac{20}{(1+t)}" /> satisfies{' '}
            <b>both</b> the differential equation and the initial condition.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Maximum Rate"
        marks={2}
        statement={
          <>
            Find, in grams per minute, the maximum rate at which the chemical flows from the tank
            and the time, in minutes, at which this occurs. Give your answers correct to one
            decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="Maximise dx/dt, the rate of change of the amount in the tank"
          working={<Katex display tex="\begin{gathered}\frac{dx}{dt}=\frac{100-120\log_e(1+t)}{(1+t)^2} \\ \text{is greatest at } t=0\text{: } 100 \text{ g/min}\end{gathered}" />}
        >
          <Katex tex="\tfrac{dx}{dt}" /> is the <em>net</em> rate, inflow minus outflow, so it measures
          how fast the tank&apos;s contents change, not how fast chemical leaves. The question asks for
          the flow <em>from</em> the tank: the outflow term <Katex tex="\tfrac{x}{1+t}" /> on its own.
          A quick check catches it: at <Katex tex="t=0" /> the tank holds 20 g in 15 L and 15 L leave
          each minute, so chemical is leaving at 20 g/min, not 100.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
