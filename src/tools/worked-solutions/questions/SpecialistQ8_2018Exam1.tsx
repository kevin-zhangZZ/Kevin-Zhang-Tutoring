// 2018 Specialist Mathematics — Exam 1, Question 8 (4 marks). A salt-tank mixing problem:
// set up the differential equation, then solve it. Question text transcribed from the
// original paper (no diagram given). Answer checked independently with sympy (dsolve with
// the initial condition returns 8√2/(t + 8)^{3/2}, the same function as 32/(16 + 2t)^{3/2}), and
// against the VCAA examination report and itute (which solves b with definite integrals from
// (0, 0.5) instead of a constant — mentioned in part b's Background). Solution is original.
//
// Widgets: part a, a tank run by a time slider that keeps the litres account (V = 16 + 2t) and
// the salt account (in 5 × 0, out 3 × Q/V) side by side, with a toggle for "ignore the pure-water
// inflow" (V = 16 − 3t empties the tank at t = 16/3); part b, the direction field of the DE with a
// draggable start, showing the + c picks one curve of the family A/(16 + 2t)^{3/2}, with toggles
// for the no-constant answer (starts at 1/64) and the forgotten-½ answer 2048/(16 + 2t)^3 (right
// start, twice the slope — ratio checked with sympy). Wrong methods verified with sympy.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TankWidget = lazyWidget(() => import('../interactives/spec-2018e1-q8a-tank'))
const FamilyWidget = lazyWidget(() => import('../interactives/spec-2018e1-q8b-family'))

const EXAM_A: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      This problem required students to recognise a difference of rates. The most common
      error was a failure to explicitly note that the rate in was zero.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 12, 38, 23],
  average: 1.6,
  comment: (
    <>
      The majority of students realised that this was a separable differential equation, but
      many made errors in the subsequent integration with the arbitrary constant of
      integration frequently missing. Some students made transcription errors that
      fundamentally changed the problem. Others encountered arithmetic or algebraic issues.
      Many students took the common factor of <Katex tex="2" /> from the{' '}
      <Katex tex="16+2t" /> expression and evaluated{' '}
      <Katex tex="\dfrac12\displaystyle\int\dfrac{1}{8+t}\,dt" />. This unnecessary
      manipulation made subsequent calculations more difficult for these students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \text{rate in} - \text{rate out}" />,
    reason: <><Katex tex="Q" /> counts kilograms of salt, so this is a salt account: the amount changes by what arrives each minute minus what leaves each minute. Every mixing problem starts from this line. Each rate is (litres per minute) × (kilograms per litre), which gives kilograms per minute.</>,
  },
  {
    working: <Katex display tex="\text{Rate in} = 5\times 0 = 0 \ \text{kg/min}" />,
    reason: <>The inflow is <em>pure</em> water: <Katex tex="5" /> litres a minute, each carrying <Katex tex="0" /> kg of salt. Write this line even though it is zero. The report says leaving it out was the most common error, and it is the step that explains why the equation has no &ldquo;in&rdquo; term.</>,
  },
  {
    working: <Katex display tex="V = 16 + 5t - 3t = 16+2t \ \text{ litres}" />,
    reason: <>Now the litres account, which is separate from the salt. The pure water brings no salt, but it does bring liquid: <Katex tex="5" /> L in and <Katex tex="3" /> L out each minute is a net gain of <Katex tex="2" /> L a minute, starting from <Katex tex="16" /> L. The volume is not constant, and that is where <Katex tex="16+2t" /> comes from.</>,
  },
  {
    working: <Katex display tex="\text{Concentration} = \frac{Q}{16+2t} \ \text{ kg/L}" />,
    reason: <>&ldquo;Stirred continuously&rdquo; means the salt is spread evenly, so every litre in the tank holds the same amount, including each litre that flows out. That phrase is your signal that concentration = amount ÷ volume.</>,
  },
  {
    working: <Katex display tex="\text{Rate out} = 3\times\frac{Q}{16+2t} = \frac{3Q}{16+2t}" />,
    reason: <><Katex tex="3" /> litres leave each minute, each carrying <Katex tex="\tfrac{Q}{16+2t}" /> kg: flow rate times concentration, as in the first line.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dQ}{dt} = 0 - \frac{3Q}{16+2t} = -\frac{3Q}{16+2t}}" />,
    reason: <>Substituting both rates. The derivative is negative for every <Katex tex="t\ge0" />, which makes sense: with no salt coming in, the amount can only fall. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{Q}\,dQ = -\frac{3}{16+2t}\,dt" />,
    reason: <>How would I know to separate? The right-hand side is a function of <Katex tex="Q" /> times a function of <Katex tex="t" />: <Katex tex="Q\times\left(-\tfrac{3}{16+2t}\right)" />. That product is the sign of a separable DE, so put every <Katex tex="Q" /> with <Katex tex="dQ" /> and every <Katex tex="t" /> with <Katex tex="dt" />. Dividing by <Katex tex="Q" /> is safe because <Katex tex="Q>0" />: there is always some salt left.</>,
  },
  {
    working: <Katex display tex="\int\frac{1}{Q}\,dQ = -3\int\frac{1}{16+2t}\,dt" />,
    reason: <>Integrating both sides. One constant, added on the <Katex tex="t" /> side, is enough.</>,
  },
  {
    working: <Katex display tex="\log_e(Q) = -\frac32\log_e(16+2t) + c" />,
    reason: <>
      <Katex tex="\int\tfrac{1}{16+2t}\,dt=\tfrac12\log_e(16+2t)" />: differentiating <Katex tex="\log_e(16+2t)" /> gives <Katex tex="\tfrac{2}{16+2t}" /> by the chain rule, so the <Katex tex="\tfrac12" /> cancels that <Katex tex="2" />. Then <Katex tex="-3\times\tfrac12=-\tfrac32" />. No modulus is needed, since <Katex tex="Q>0" /> and <Katex tex="16+2t>0" /> for <Katex tex="t\ge0" />. Keep <Katex tex="16+2t" /> in one piece: the required form uses it, and the report says taking out the <Katex tex="2" /> made later steps harder. Add <Katex tex="+\,c" /> now, at the moment you integrate. The report says it was frequently missing, and without it there is nothing for the initial condition to find.
    </>,
  },
  {
    working: <Katex display tex="Q = e^c(16+2t)^{-3/2} = \frac{A}{(16+2t)^{3/2}}" />,
    reason: <>The log law <Katex tex="k\log_e(x)=\log_e(x^k)" /> moves the <Katex tex="-\tfrac32" /> into a power; then exponentiate both sides. <Katex tex="e^c" /> is just an unknown positive constant, so call it <Katex tex="A" />. This is already the shape the question asks for.</>,
  },
  {
    working: <Katex display tex="t=0,\ Q=0.5: \quad \frac12 = \frac{A}{16^{3/2}} = \frac{A}{64}" />,
    reason: <>&ldquo;Initially holds <Katex tex="0.5" /> kg&rdquo; means <Katex tex="Q=0.5" /> when <Katex tex="t=0" />. For <Katex tex="16^{3/2}" />, take the square root first and then cube: <Katex tex="\left(\sqrt{16}\right)^3=4^3=64" />.</>,
  },
  {
    working: <Katex display tex="A = 32" />,
    reason: <>Multiplying both sides by <Katex tex="64" />. Every value of <Katex tex="A" /> gives a curve that satisfies the DE; the initial condition is what picks this one.</>,
    more: <>Drag the start point in the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = \frac{32}{(16+2t)^{3/2}}}" />,
    reason: <>The required form <Katex tex="\tfrac{a}{(16+2t)^{b/c}}" /> with <Katex tex="a=32" />, <Katex tex="b=3" />, <Katex tex="c=2" />, all positive integers. Two checks: at <Katex tex="t=0" />, <Katex tex="Q=\tfrac{32}{64}=0.5" /> ✓, and <Katex tex="Q\to0" /> as <Katex tex="t\to\infty" />, which is right since fresh water keeps flushing salt out.</>,
  },
]

export default function SpecialistQ8_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p>
          A tank initially holds <Katex tex="16" /> L of water in which <Katex tex="0.5" /> kg
          of salt has been dissolved. Pure water then flows into the tank at a rate of{' '}
          <Katex tex="5" /> L per minute. The mixture is stirred continuously and flows out of
          the tank at a rate of <Katex tex="3" /> L per minute.
        </p>
      </div>

      <PartCard letter="a" topic="Mixing Problem" marks={1} statement={<>Show that the differential equation for <Katex tex="Q" />, the number of kilograms of salt in the tank after <Katex tex="t" /> minutes, is given by <Katex tex="\dfrac{dQ}{dt}=-\dfrac{3Q}{16+2t}" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            A mixing problem keeps two separate accounts: the salt, in kilograms, and the
            liquid, in litres. The differential equation is about the salt:{' '}
            <Katex tex="\tfrac{dQ}{dt}=\text{rate in}-\text{rate out}" />, where each rate is a
            flow rate (L/min) times a concentration (kg/L). The litres matter because the
            concentration in the tank is the amount of salt divided by the volume.
          </p>
          <p>
            Two details make this problem the shape it is. The water coming in is{' '}
            <em>pure</em>, so the rate of salt entering is zero; say so explicitly, because the report
            says leaving it out was the most common error. And the inflow exceeds the outflow, so the volume grows steadily rather
            than staying at <Katex tex="16" /> L; that growing volume is what puts{' '}
            <Katex tex="16+2t" /> into the equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Litres and kilograms: pure water adds no salt, but it still fills the tank">
          <TankWidget />
        </Explore>
        <WrongMethod
          title={<>Go straight to the outflow and write down the given equation</>}
          source="Examiner's report"
          working={<Katex display tex="\frac{dQ}{dt} = -\frac{Q}{16+2t}\times 3 = -\frac{3Q}{16+2t}" />}
        >
          <p>
            The equation is right, but in a &ldquo;show that&rdquo; the result is given, so the marks are for
            the steps that lead to it. Those steps start from rate in minus rate out, and the report
            says the most common error was not stating that the rate in is zero. Write{' '}
            <Katex tex="\text{rate in}=5\times0=0" /> kg/min: it shows you used the fact that the
            incoming water is pure, which is why the first term vanishes.
          </p>
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Separable DE" marks={3} statement={<>Solve the differential equation given in part a. to find <Katex tex="Q" /> as a function of <Katex tex="t" />. Express your answer in the form <Katex tex="Q=\dfrac{a}{(16+2t)^{b/c}}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are positive integers.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            A differential equation of the form <Katex tex="\tfrac{dy}{dx}=f(x)\,g(y)" /> is{' '}
            <em>separable</em>: <Katex tex="\displaystyle\int\tfrac{1}{g(y)}\,dy=\int f(x)\,dx" />, with a
            constant of integration on one side. The integral this question needs is{' '}
            <Katex tex="\displaystyle\int\tfrac{1}{ax+b}\,dx=\tfrac1a\log_e|ax+b|+c" />.
          </p>
          <p>
            The constant is not a formality. Integrating gives a whole family of curves that all obey
            the DE; the initial condition picks one. Another way to use the initial condition is to
            integrate with limits from the starting values, which needs no constant:{' '}
            <Katex tex="\displaystyle\int_{0.5}^{Q}\tfrac1u\,du=\int_0^t-\tfrac{3}{16+2s}\,ds" />, giving{' '}
            <Katex tex="\log_e(2Q)=-\tfrac32\log_e\!\left(\tfrac{16+2t}{16}\right)" /> and the same
            answer.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The + c picks one curve from the family, and only one starts at 0.5 kg">
          <FamilyWidget />
        </Explore>
        <WrongMethod
          title={<>Integrate both sides and leave out the <Katex tex="+\,c" /></>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\log_e(Q) = -\frac32\log_e(16+2t)" />
              <Katex display tex="Q = \frac{1}{(16+2t)^{3/2}}" />
            </>
          }
        >
          <p>
            Without a constant this is one particular solution, and the wrong one: at{' '}
            <Katex tex="t=0" /> it gives <Katex tex="Q=\tfrac{1}{64}" />, not <Katex tex="0.5" />. There is
            nothing left to adjust, so the initial condition can&apos;t be used. Add{' '}
            <Katex tex="+\,c" /> the moment you integrate. To catch it, substitute{' '}
            <Katex tex="t=0" /> into your final answer: you must get back the <Katex tex="0.5" /> kg you
            started with.
          </p>
        </WrongMethod>
        <WrongMethod
          title={<>Write <Katex tex="\int\frac{1}{16+2t}\,dt=\log_e(16+2t)" /> and forget the <Katex tex="\tfrac12" /></>}
          working={
            <>
              <Katex display tex="\log_e(Q) = -3\log_e(16+2t) + c" />
              <Katex display tex="Q = \frac{A}{(16+2t)^3},\quad \frac12=\frac{A}{16^3}" />
              <Katex display tex="Q = \frac{2048}{(16+2t)^3}" />
            </>
          }
        >
          <p>
            Differentiating <Katex tex="\log_e(16+2t)" /> gives <Katex tex="\tfrac{2}{16+2t}" />, twice
            too much, so the antiderivative needs a <Katex tex="\tfrac12" />. This slip is hard to spot
            because the initial condition still works: <Katex tex="\tfrac{2048}{16^3}=0.5" />. Check the
            DE instead. At <Katex tex="t=0" /> this answer falls at <Katex tex="\tfrac{3}{16}" /> kg/min,
            but the DE says <Katex tex="\tfrac{dQ}{dt}=-\tfrac{3(0.5)}{16}=-\tfrac{3}{32}" />. The form{' '}
            <Katex tex="\tfrac{a}{(16+2t)^{b/c}}" /> in the question is also a strong hint that the power
            is a fraction.
          </p>
        </WrongMethod>
        <WrongMethod
          title={<>Take out the common factor of <Katex tex="2" /> first</>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="-3\int\frac{1}{16+2t}\,dt = -\frac32\int\frac{1}{8+t}\,dt" />
              <Katex display tex="Q = \frac{A}{(8+t)^{3/2}},\quad \frac12 = \frac{A}{8^{3/2}}" />
              <Katex display tex="Q = \frac{8\sqrt2}{(8+t)^{3/2}}" />
            </>
          }
        >
          <p>
            Nothing here is false (it is the same function), but it is not in the form asked for:{' '}
            <Katex tex="a" /> must be a positive integer and the bracket must be <Katex tex="16+2t" />.
            Getting there needs <Katex tex="(8+t)^{3/2}=\tfrac{(16+2t)^{3/2}}{2^{3/2}}=\tfrac{(16+2t)^{3/2}}{2\sqrt2}" />,
            so <Katex tex="Q=\tfrac{8\sqrt2\times2\sqrt2}{(16+2t)^{3/2}}=\tfrac{32}{(16+2t)^{3/2}}" />.
            On the way, <Katex tex="8^{3/2}=16\sqrt2" /> is messier than <Katex tex="16^{3/2}=64" />. The
            report says this unnecessary step made later calculations harder for many students. When the
            question shows you the bracket it wants, keep that bracket.
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
