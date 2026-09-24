// 2025 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A classic mixing
// tank: setting up the differential equation, Euler's method, solving it by separation, the
// long-run limit, and a final twist where the outflow is shut off so the volume starts
// growing. Question text transcribed from the original paper. Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [79.57, 20.43],
  average: 0.2,
  comment: (
    <>
      Many responses did not quote the concentrations as required by the question.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38.45, 61.55],
  average: 0.61,
  comment: (
    <>
      A &lsquo;show that&rsquo; question, so development of the given formula was required. Many
      responses did not show sufficient development of the formula to be awarded the method
      marks.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [46.55, 14.52, 38.93],
  average: 0.92,
  comment: (
    <>
      Euler&rsquo;s method needed to be shown in some form to be awarded both marks. Several
      responses simply included the answer and did not show the development. A tabulated approach
      was acceptable as long as both <Katex tex="Q(15)" /> and the final answer were shown.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [11.24, 12.17, 17.3, 59.3],
  average: 2.24,
  comment: (
    <>
      &lsquo;Use calculus&rsquo; means students are required to show the steps needed to find the
      solution to gain all 3 marks. Some responses used a definite integral instead of finding{' '}
      <Katex tex="c" />, which was acceptable. A frequently seen error was not using the initial
      condition to find the constant of integration.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [20.54, 79.46],
  average: 0.79,
  comment: (
    <>
      This can be found by taking the limit as <Katex tex="t" /> approaches infinity of the answer
      to Question 3d. It could also be seen using the fact that an exponential function raised to
      a negative power is a decreasing function.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [39.3, 60.7],
  average: 0.6,
  comment: (
    <>
      This question was well responded to by students who were able to solve the differential
      equation in part d.
      <br />
      Several responses left the answer as a decimal, rather than in exact form as required by
      the question.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [81.95, 18.05],
  average: 0.18,
  comment: (
    <>
      This can be found by equating the concentration to the given value{' '}
      <Katex tex="\dfrac{2t+100}{3000+20t}=\dfrac{1}{20}" />.
      <br />
      The most common error was 25.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{initial concentration} = \frac{5}{3000} = \frac{1}{600} \approx 0.00167 \text{ kg/litre}" />,
    reason: <>Salt already in the tank divided by the volume it is dissolved in.</>,
  },
  {
    working: <Katex display tex="\text{incoming concentration} = 0.1 \text{ kg/litre}" />,
    reason: <>Stated in the question.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{600} < 0.1 \implies \text{the quantity of salt increases}}" />,
    reason: <>The water arriving is far saltier than what is already there, and inflow and outflow rates are equal, so salt accumulates. The report notes many responses did not quote the concentrations as required; only about one student in five scored this mark.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = (\text{rate in})-(\text{rate out})" />,
    reason: <>The standard set-up for a mixing problem.</>,
  },
  {
    working: <Katex display tex="\text{rate in} = 0.1 \times 20 = 2 \text{ kg/min}" />,
    reason: <>Concentration of the incoming solution times its flow rate.</>,
  },
  {
    working: <Katex display tex="\text{volume stays at } 3000 \text{ litres}" />,
    reason: <>Inflow and outflow are both 20 litres per minute, so the volume never changes — this is what makes the next line valid.</>,
  },
  {
    working: <Katex display tex="\text{rate out} = \frac{Q}{3000}\times20 = \frac{Q}{150} \text{ kg/min}" />,
    reason: <>The tank is thoroughly mixed, so the draining solution carries the current tank concentration.</>,
  },
  {
    working: <Katex display tex="\frac{dQ}{dt} = 2-\frac{Q}{150} = \frac{300-Q}{150}" />,
    reason: <>Putting the two over a common denominator gives exactly the form asked for. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Q_{n+1} = Q_n+h\,\frac{300-Q_n}{150}, \qquad h = 15" />,
    reason: <>Euler&rsquo;s method: <Katex tex="y_{n+1}=y_n+h\,f(x_n,y_n)" />. Two steps of 15 minutes reach t = 30.</>,
  },
  {
    working: <Katex display tex="Q_0 = 5" />,
    reason: <>The tank starts with 5 kg of salt.</>,
  },
  {
    working: <Katex display tex="Q_1 = 5+15\times\frac{300-5}{150} = 5+29.5 = 34.5" />,
    reason: <>After 15 minutes. The report accepts a table, as long as both <Katex tex="Q(15)" /> and the final answer are shown.</>,
  },
  {
    working: <Katex display tex="Q_2 = 34.5+15\times\frac{300-34.5}{150} = 34.5+26.55 = 61.05" />,
    reason: <>After 30 minutes.</>,
  },
  {
    working: <Katex display tex="\boxed{Q(30) \approx 61.05 \text{ kg}}" />,
    reason: <>Two decimal places. The exact solution from part d. gives 58.47 kg, so Euler with such a coarse step overshoots by more than 4%.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \frac{300-Q}{150} \implies \frac{dt}{dQ} = \frac{150}{300-Q}" />,
    reason: <>Inverting, so the variables can be separated cleanly.</>,
  },
  {
    working: <Katex display tex="t = \int\frac{150}{300-Q}\,dQ = -150\log_e|300-Q|+c" />,
    reason: <>The <Katex tex="-150" /> comes from the derivative of the inside being <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="t = 0, \ Q = 5: \quad 0 = -150\log_e(295)+c \implies c = 150\log_e(295)" />,
    reason: <>The initial condition. The report lists not using it to find the constant as a frequently seen error.</>,
  },
  {
    working: <Katex display tex="t = 150\log_e\left(\frac{295}{300-Q}\right)" />,
    reason: <>Combining the logarithms. <Katex tex="Q<300" /> throughout, so the modulus signs can be dropped.</>,
  },
  {
    working: <Katex display tex="\frac{t}{150} = \log_e\left(\frac{295}{300-Q}\right) \implies 300-Q = 295e^{-\frac{t}{150}}" />,
    reason: <>Exponentiating and inverting the fraction.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = 300-295e^{-\frac{t}{150}}}" />,
    reason: <>Check: <Katex tex="Q(0)=300-295=5" /> ✓.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="e^{-\frac{t}{150}} \to 0 \text{ as } t\to\infty" />,
    reason: <>A decaying exponential.</>,
  },
  {
    working: <Katex display tex="\lim_{t\to\infty}\left(300-295e^{-\frac{t}{150}}\right) = 300" />,
    reason: <>Equivalently, the steady state is where <Katex tex="\tfrac{dQ}{dt}=0" />, which needs <Katex tex="Q=300" />.</>,
  },
  {
    working: <Katex display tex="\boxed{300 \text{ kg}}" />,
    reason: <>Which is 3000 litres at the incoming concentration of 0.1 kg per litre — the tank eventually matches the inflow.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="300-295e^{-\frac{t}{150}} = 100" />,
    reason: <>Setting the quantity of salt to 100 kg.</>,
  },
  {
    working: <Katex display tex="295e^{-\frac{t}{150}} = 200 \implies e^{-\frac{t}{150}} = \frac{200}{295} = \frac{40}{59}" />,
    reason: <>Rearranging and simplifying the fraction.</>,
  },
  {
    working: <Katex display tex="-\frac{t}{150} = \log_e\left(\frac{40}{59}\right) \implies t = 150\log_e\left(\frac{59}{40}\right)" />,
    reason: <>Taking logarithms; flipping the fraction absorbs the minus sign.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 150\log_e\left(\frac{59}{40}\right) \text{ minutes} \approx 58.3 \text{ minutes}}" />,
    reason: <>Exact form, since Section B requires exact answers unless otherwise specified — the report notes several responses left the answer as a decimal.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{at the moment the tap closes: } Q = 100 \text{ kg in } 3000 \text{ litres}" />,
    reason: <>From part f. Until now the volume has been constant.</>,
  },
  {
    working: <Katex display tex="\text{after } s \text{ further minutes: } Q = 100+2s" />,
    reason: <>Salt still arrives at 0.1 × 20 = 2 kg per minute, and none now leaves.</>,
  },
  {
    working: <Katex display tex="\text{volume} = 3000+20s" />,
    reason: <>The key step: with the tap shut the tank fills at 20 litres per minute, so the denominator grows too. Treating the volume as fixed gives the common wrong answer of 25.</>,
  },
  {
    working: <Katex display tex="\frac{100+2s}{3000+20s} = \frac{1}{20}" />,
    reason: <>Concentration equals mass over volume.</>,
  },
  {
    working: <Katex display tex="20(100+2s) = 3000+20s \implies 2000+40s = 3000+20s" />,
    reason: <>Cross-multiplying.</>,
  },
  {
    working: <Katex display tex="20s = 1000 \implies \boxed{s = 50 \text{ minutes}}" />,
    reason: <>By <Cas fn="solve" />, or by hand as above.</>,
  },
]

export default function SpecialistQ3_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A tank initially contains 5 kg of salt dissolved in 3000 litres of water. Salty water
          that contains 0.1 kg of salt per litre of water enters the tank at a rate of 20 litres
          per minute. The solution is kept thoroughly mixed and drains from the tank via a tap
          at the same rate of 20 litres per minute.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Inflow and outflow being equal is what keeps this manageable: the volume stays at
            3000 litres, so the concentration draining out is always{' '}
            <Katex tex="\tfrac{Q}{3000}" /> and the differential equation is linear.
          </p>
          <p>
            Part g. quietly removes that assumption. With the tap shut the tank keeps filling,
            so both the salt <em>and</em> the volume grow with time — and the answer 25, which
            comes from holding the volume at 3000, was the error the report singled out. Only
            18% of the cohort scored this mark.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Concentration"
        marks={1}
        statement={
          <>
            By considering concentration, explain whether the quantity of salt in the tank
            increases with time.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Mixing Problem"
        marks={1}
        statement={
          <>
            Let <Katex tex="Q" /> denote the quantity of salt, in kilograms, in the tank at time{' '}
            <Katex tex="t" /> minutes.
            <br />
            Show that <Katex tex="Q" /> satisfies the differential equation{' '}
            <Katex tex="\dfrac{dQ}{dt} = \dfrac{300-Q}{150}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Euler's Method"
        marks={2}
        statement={
          <>
            Using Euler&rsquo;s method with a step size of 15 minutes, find{' '}
            <Katex tex="Q(30)" />, the approximate quantity of salt in the tank after 30
            minutes.
            <br />
            Give your answer in kilograms, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Separable DE"
        marks={3}
        statement={
          <>
            Use calculus to solve the differential equation{' '}
            <Katex tex="\dfrac{dQ}{dt} = \dfrac{300-Q}{150}" />, expressing <Katex tex="Q" /> in
            terms of <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Limiting Value"
        marks={1}
        statement={
          <>
            What value does the quantity of salt in the tank approach as time approaches
            infinity?
            <br />
            Give your answer in kilograms.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Solve for Time"
        marks={1}
        statement={<>Find the time taken for the quantity of salt in the tank to reach 100 kg.</>}
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Mixing Problem"
        marks={1}
        statement={
          <>
            When the quantity of salt in the tank reaches 100 kg, the tap draining the tank is
            turned off. Assume that the tank does not overflow and there is no change to the
            inflow rate.
            <br />
            After the tap is turned off, how many minutes does it take for the concentration of salt in the tank to reach{' '}
            <Katex tex="\tfrac{1}{20}" /> kg L<Katex tex="^{-1}" />?
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
