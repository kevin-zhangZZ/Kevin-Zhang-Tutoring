// 2025 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). A classic mixing
// tank: setting up the differential equation, Euler's method, solving it by separation, the
// long-run limit, and a final twist where the outflow is shut off so the volume starts
// growing. Question text transcribed from the original paper. Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

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
    working: <Katex display tex="\begin{aligned}\text{initial concentration} &= \frac{5}{3000} = \frac{1}{600} \\ &\approx 0.00167 \text{ kg/litre}\end{aligned}" />,
    reason: <>Salt already in the tank divided by the volume it is dissolved in.</>,
  },
  {
    working: <Katex display tex="\text{incoming concentration} = 0.1 \text{ kg/litre}" />,
    reason: <>Stated in the question.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{600} < 0.1 \implies \text{the quantity of salt increases}}" />,
    reason: <>Equal volumes flow in and out, so saltier inflow means more salt arrives than leaves. The tank never gets saltier than the inflow, so this continues.</>,
    more: (
      <>
        In numbers: each minute 20 litres arrive carrying <Katex tex="0.1\times20=2" /> kg, while 20
        litres leave carrying only <Katex tex="\tfrac{1}{600}\times20=\tfrac{1}{30}" /> kg, so the
        salt goes up. The question says &ldquo;by considering concentration&rdquo;, so the mark
        needs both concentrations written down and compared &mdash; only about one student in
        five did this. A
        sentence such as &ldquo;salty water is flowing in&rdquo; is not enough: salt also flows
        out. Part e. confirms the tank only ever approaches 0.1 kg per litre (300 kg in 3000
        litres), never passing it.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = (\text{rate in})-(\text{rate out})" />,
    reason: <>The salt in the tank changes by what flows in minus what flows out each minute.</>,
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
    more: (
      <>
        Writing the given equation down earns nothing. The mark needs both
        rates built from the information in the stem &mdash; 2 kg/min in and{' '}
        <Katex tex="\tfrac{Q}{3000}\times20" /> out &mdash; before the given form appears.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="Q_{n+1} = Q_n+h\,\frac{300-Q_n}{150}, \qquad h = 15" />,
    reason: <>Euler&rsquo;s method: new value = old value + step size × gradient at the old value. Two steps of 15 minutes reach <Katex tex="t=30" />.</>,
    more: (
      <>
        The general formula is <Katex tex="y_{n+1}=y_n+h\,f(x_n,y_n)" />, where{' '}
        <Katex tex="f" /> is the right-hand side of the differential equation. Here that is{' '}
        <Katex tex="\tfrac{300-Q}{150}" />, which depends only on <Katex tex="Q" />, so each
        step just needs the current amount of salt. Don&rsquo;t take a single step of 30
        minutes: the question fixes <Katex tex="h=15" />, so two steps are needed.
      </>
    ),
  },
  {
    working: <Katex display tex="Q_0 = 5" />,
    reason: <>The tank starts with 5 kg of salt.</>,
  },
  {
    working: <Katex display tex="Q_1 = 5+15\times\frac{300-5}{150} = 5+29.5 = 34.5" />,
    reason: <>This is <Katex tex="Q(15)" />: the gradient at <Katex tex="Q=5" /> is <Katex tex="\tfrac{295}{150}" /> kg/min, held for 15 minutes.</>,
    more: (
      <>
        Write this intermediate value down: it is the evidence that Euler&rsquo;s method was
        used, and a bare final answer loses marks.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}Q_2 &= 34.5+15\times\frac{300-34.5}{150} \\ &= 34.5+26.55 = 61.05\end{aligned}" />,
    reason: <>This is <Katex tex="Q(30)" />: the gradient is now recalculated at <Katex tex="Q=34.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{Q(30) \approx 61.05 \text{ kg}}" />,
    reason: <>Two decimal places, as asked.</>,
    more: (
      <>
        A check: the exact solution from part d. gives <Katex tex="Q(30)\approx58.47" /> kg, so
        Euler overshoots by about 4%. That is expected here &mdash; the gradient{' '}
        <Katex tex="\tfrac{300-Q}{150}" /> shrinks as <Katex tex="Q" /> grows, and Euler holds
        each step at the steeper gradient from the start of the step.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \frac{300-Q}{150} \implies \frac{dt}{dQ} = \frac{150}{300-Q}" />,
    reason: <>The right-hand side involves only <Katex tex="Q" />, so flip both sides to get <Katex tex="\tfrac{dt}{dQ}" /> and integrate with respect to <Katex tex="Q" />.</>,
  },
  {
    working: <Katex display tex="t = \int\frac{150}{300-Q}\,dQ = -150\log_e|300-Q|+c" />,
    reason: <>Use <Katex tex="\int\frac{1}{ax+b}\,dx=\tfrac{1}{a}\log_e|ax+b|" />. Here the inside is <Katex tex="300-Q" />, so <Katex tex="a=-1" /> and the 150 becomes <Katex tex="-150" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&t = 0, \ Q = 5: \quad 0 = -150\log_e(295)+c \\ &\implies c = 150\log_e(295)\end{aligned}" />,
    reason: <>The tank starts with 5 kg of salt, so <Katex tex="Q=5" /> when <Katex tex="t=0" />; this fixes <Katex tex="c" />.</>,
    more: (
      <>
        Without <Katex tex="c" /> the answer is a whole family of curves, not this tank. The
        definite-integral version the report accepts is{' '}
        <Katex tex="t=\int_5^Q\frac{150}{300-u}\,du" />, which builds the starting value in.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}t &= 150\log_e(295)-150\log_e(300-Q) \\ &= 150\log_e\left(\frac{295}{300-Q}\right)\end{aligned}" />,
    reason: <>Substitute <Katex tex="c" />, then combine with <Katex tex="\log_e a-\log_e b=\log_e\tfrac{a}{b}" />. <Katex tex="Q" /> starts at 5, and <Katex tex="\tfrac{dQ}{dt}=0" /> at <Katex tex="Q=300" />, so <Katex tex="Q" /> never passes 300: <Katex tex="300-Q>0" />, so drop the modulus.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{t}{150} = \log_e\left(\frac{295}{300-Q}\right) \\ &\implies e^{\frac{t}{150}} = \frac{295}{300-Q} \\ &\implies 300-Q = 295e^{-\frac{t}{150}}\end{aligned}" />,
    reason: <>Divide by 150, then raise <Katex tex="e" /> to the power of both sides to undo the logarithm. Then flip both sides (so <Katex tex="e^{\frac{t}{150}}" /> becomes <Katex tex="e^{-\frac{t}{150}}" />) and multiply by 295.</>,
    more: (
      <>
        The steps that must appear: separating, integrating, finding <Katex tex="c" />, and
        rearranging. A CAS answer on its own does not earn the marks.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{Q = 300-295e^{-\frac{t}{150}}}" />,
    reason: <>Check: <Katex tex="Q(0)=300-295=5" /> ✓.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="e^{-\frac{t}{150}} \to 0 \text{ as } t\to\infty" />,
    reason: <>A negative exponent: as <Katex tex="t" /> grows, <Katex tex="e^{-t/150}" /> shrinks towards 0.</>,
  },
  {
    working: <Katex display tex="\lim_{t\to\infty}\left(300-295e^{-\frac{t}{150}}\right) = 300" />,
    reason: <>So the <Katex tex="295e^{-t/150}" /> term disappears in the long run.</>,
    more: (
      <>
        Another way to see it, straight from the differential equation: the salt stops
        changing when <Katex tex="\tfrac{dQ}{dt}=\tfrac{300-Q}{150}=0" />, that is, at{' '}
        <Katex tex="Q=300" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{300 \text{ kg}}" />,
    reason: <>A sense check: 3000 litres at the incoming 0.1 kg per litre is 300 kg, so the tank ends up as salty as the inflow.</>,
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
    reason: <>Give the exact form: the exam instructions require an exact answer unless the question says otherwise.</>,
    more: (
      <>
        The decimal 58.3 is fine to add after the exact answer, but not instead of it.
      </>
    ),
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{when the tap closes:} \\ &Q = 100 \text{ kg in } 3000 \text{ litres}\end{aligned}" />,
    reason: <>The tap closes when the salt reaches 100 kg (part f.). Until then the volume has stayed at 3000 litres.</>,
    more: (
      <>
        We use <Katex tex="s" /> for the minutes since the tap closed, so it isn&rsquo;t confused
        with <Katex tex="t" /> from parts b.&ndash;f.; the report&rsquo;s equation writes this
        restarted time as <Katex tex="t" />. The question asks for the time after the tap is
        turned off, so don&rsquo;t add on the 58.3 minutes from part f.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{after } s \text{ further minutes: } Q = 100+2s" />,
    reason: <>Salt still arrives at 0.1 × 20 = 2 kg per minute, and none now leaves.</>,
  },
  {
    working: <Katex display tex="\text{volume} = 3000+20s" />,
    reason: <>The key step: with the tap shut, 20 litres per minute still flow in and none drain out, so the volume grows too.</>,
    more: (
      <>
        The report&rsquo;s most common error was 25, which is what you get by keeping the volume
        at 3000: <Katex tex="\tfrac{100+2s}{3000}=\tfrac{1}{20}" /> gives{' '}
        <Katex tex="s=25" />. Only 18% scored this mark. The question hints at it &mdash;
        &ldquo;assume that the tank does not overflow&rdquo; only matters if the tank is filling up.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{100+2s}{3000+20s} = \frac{1}{20}" />,
    reason: <>Concentration equals mass over volume.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}20(100+2s) &= 3000+20s \\ 2000+40s &= 3000+20s\end{aligned}" />,
    reason: <>Cross-multiplying.</>,
  },
  {
    working: <Katex display tex="20s = 1000 \implies \boxed{s = 50 \text{ minutes}}" />,
    reason: <>By <Cas fn="solve" />, or by hand as above.</>,
    more: (
      <>
        Check: after 50 minutes the tank holds <Katex tex="100+2(50)=200" /> kg in{' '}
        <Katex tex="3000+20(50)=4000" /> litres, and{' '}
        <Katex tex="\tfrac{200}{4000}=\tfrac{1}{20}" /> ✓.
      </>
    ),
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Inflow and outflow being equal is what keeps this manageable: the volume stays at
              3000 litres, so the concentration draining out is always{' '}
              <Katex tex="\tfrac{Q}{3000}" />, which is what gives the simple differential equation
              in part b.
            </p>
            <p>
              Part g. quietly removes that assumption. With the tap shut the tank keeps filling,
              so both the salt <em>and</em> the volume grow with time.
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
