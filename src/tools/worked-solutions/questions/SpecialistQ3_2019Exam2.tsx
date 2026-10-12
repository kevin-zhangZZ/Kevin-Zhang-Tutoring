// 2019 Specialist Mathematics — Exam 2, Section B, Question 3 (9 marks).
// Exponential growth/decay dP/dt = kP with two data points, then a separable differential
// equation dQ/dt = e^(t−Q) and a proof that its solution has no point of inflection. Question
// text transcribed from the original paper (no diagram given). Cross-checked against the VCAA
// examination report and itute's independent solutions, and verified by computer algebra.
// Note on part a.ii.: itute gives only "a > b and r > s"; VCAA's published answer includes
// the second branch, "a < b and r < s", which the solution below derives. Solution is original.
// Interactives: a.ii. drag the two data points — k > 0 exactly when the later point is higher, and
// swapping the points' names turns case 1 into case 2 (spec-2019e2-q3aii-later-higher); b.ii. the
// direction field of dQ/dt = e^(t−Q) with a draggable start — each c is a different solution curve
// and Q(0) = 1 picks c = e − 1 (spec-2019e2-q3bii-field); b.iii. a sliding tangent on Q with the graph
// of d²Q/dt² beneath it, which shrinks towards 0 but never reaches it (spec-2019e2-q3biii-never-zero).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const LaterHigherWidget = lazyWidget(() => import('../interactives/spec-2019e2-q3aii-later-higher'))
const FieldWidget = lazyWidget(() => import('../interactives/spec-2019e2-q3bii-field'))
const NeverZeroWidget = lazyWidget(() => import('../interactives/spec-2019e2-q3biii-never-zero'))

const EXAM_AI: SAExaminerStats = {
  marks: [28, 21, 51],
  average: 1.3,
  comment: <>Students solved the differential equation to find the given expression for <Katex tex="k" /> by a variety of correct approaches. Common errors were to neglect a constant of integration or to make mistakes when manipulating logarithmic or exponential terms.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [60, 20, 20],
  average: 0.6,
  comment: <>A significant number of students stated only the first of the above conditions.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: <>Most students answered this correctly using the form above or an alternative such as <Katex tex="\displaystyle\int\frac{1}{e^{-Q}}\,dQ=\int e^t\,dt" />.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [27, 4, 69],
  average: 1.4,
  comment: <>Students handled this well by proceeding from the form of the differential equation given in Question 3bi. to the required solution.</>,
}

const EXAM_BIII: SAExaminerStats = {
  marks: [38, 24, 38],
  average: 1.0,
  comment: <>Most students supplied a correct second derivative but not all of them went on to reasonably justify why the graph does not have a point of inflection.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dP}{dt} = kP \implies \dfrac{1}{P}\,dP = k\,dt" />,
    reason: <>The right-hand side is a <Katex tex="P" /> part times a <Katex tex="t" /> part, so separate: <Katex tex="P" /> terms with <Katex tex="dP" />, everything else with <Katex tex="dt" />.</>,
    more: <>Flipping to <Katex tex="\tfrac{dt}{dP}=\tfrac{1}{kP}" /> and integrating with respect to <Katex tex="P" /> works equally well.</>,
  },
  {
    working: <Katex display tex="\log_e|P| = kt + c \implies P = Ae^{kt}" />,
    reason: <>Integrate both sides, then exponentiate; <Katex tex="e^c" /> becomes a single constant <Katex tex="A" />. Keep the constant: the curve must fit two data points, so it needs two free constants, <Katex tex="A" /> and <Katex tex="k" />.</>,
    more: <>The <Katex tex="\pm" /> from removing the modulus is absorbed into <Katex tex="A" /> too. The report names neglecting the constant of integration as a common error; the common mistake below shows how it breaks the question.</>,
  },
  {
    working: (
      <>
        <Katex display tex="P(a)=r: \quad Ae^{ka} = r" />
        <Katex display tex="P(b)=s: \quad Ae^{kb} = s" />
      </>
    ),
    reason: <>Each data point gives one equation; only <Katex tex="k" /> is wanted.</>,
  },
  {
    working: <Katex display tex="\dfrac{Ae^{ka}}{Ae^{kb}} = \dfrac{r}{s} \implies e^{k(a-b)} = \dfrac{r}{s}" />,
    reason: <>Divide the equations: <Katex tex="A" /> cancels, and the index law <Katex tex="\tfrac{e^{ka}}{e^{kb}}=e^{k(a-b)}" /> produces the <Katex tex="a-b" /> in the target.</>,
    more: <>In log form it is a subtraction instead: <Katex tex="\log_e r = ka + c" /> minus <Katex tex="\log_e s = kb + c" /> cancels <Katex tex="c" /> and gives <Katex tex="\log_e r-\log_e s=k(a-b)" />. Either way, only one index law or one log law is needed, which keeps clear of the log and exponential slips the report lists as common errors.</>,
  },
  {
    working: <Katex display tex="k(a-b) = \log_e\!\left(\dfrac{r}{s}\right)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides: it undoes the exponential and brings <Katex tex="k" /> down.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{1}{a-b}\log_e\!\left(\dfrac{r}{s}\right)}" />,
    reason: <>Divide by <Katex tex="a-b" />, which is non-zero because <Katex tex="a" /> and <Katex tex="b" /> are two different times. As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="k = \underbrace{\dfrac{1}{a-b}}_{\text{factor 1}}\times\underbrace{\log_e\!\left(\dfrac{r}{s}\right)}_{\text{factor 2}} > 0" />,
    reason: <>Read <Katex tex="k" /> from part a.i. as a product of two factors. A product is positive when both factors are positive <em>or</em> both are negative: expect two cases.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\dfrac{r}{s}\right)>0 \iff \dfrac{r}{s}>1 \iff r>s" />,
    reason: <>A logarithm is positive exactly when its argument exceeds <Katex tex="1" /> (with <Katex tex="r,s>0" />). Similarly <Katex tex="\tfrac{1}{a-b}>0 \iff a>b" />.</>,
    more: <>Here <Katex tex="r" /> and <Katex tex="s" /> are positive: they are values of a growing or decaying quantity <Katex tex="P=Ae^{kt}" />, and <Katex tex="\log_e\!\left(\tfrac{r}{s}\right)" /> must exist for <Katex tex="k" /> to be defined. That is what lets <Katex tex="\tfrac{r}{s}>1" /> become <Katex tex="r>s" /> without flipping the inequality.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 1: } a-b>0 \text{ and } r>s" />
        <Katex display tex="\implies a>b \text{ and } r>s" />
      </>
    ),
    reason: <>Both factors positive. Sensible: <Katex tex="a" /> is the later time and has the larger value, so the quantity is growing.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 2: } a-b<0 \text{ and } r<s" />
        <Katex display tex="\implies a<b \text{ and } r<s" />
      </>
    ),
    reason: <>Both factors negative. The question never says which of <Katex tex="a" /> and <Katex tex="b" /> is later, so this case is needed too.</>,
    more: <>Now <Katex tex="b" /> is the later time and <Katex tex="s" /> the larger value: it is the same growing curve, with the two points&apos; names swapped.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\boxed{a>b \text{ and } r>s,}" />
        <Katex display tex="\boxed{\text{or } a<b \text{ and } r<s}" />
      </>
    ),
    reason: <>State both cases. In words: <Katex tex="k>0" /> exactly when the later time has the larger value of <Katex tex="P" />.</>,
    more: <>The report notes that a significant number of students stated only the first of these conditions. That answer silently assumes <Katex tex="a" /> is the later time; the common mistake below shows a growing example it misses.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dQ}{dt} = e^{t-Q} = \dfrac{e^t}{e^Q}" />,
    reason: <>The target form <Katex tex="\int f(Q)\,dQ=\int h(t)\,dt" /> means separate the variables. The index law splits <Katex tex="e^{t-Q}" /> into a <Katex tex="t" /> part and a <Katex tex="Q" /> part.</>,
  },
  {
    working: <Katex display tex="e^{Q}\,\dfrac{dQ}{dt} = e^{t}" />,
    reason: <>Multiply both sides by <Katex tex="e^Q" /> to gather the <Katex tex="Q" /> terms on the left.</>,
  },
  {
    working: <Katex display tex="\boxed{\int e^{Q}\,dQ = \int e^{t}\,dt}" />,
    reason: <>Integrate both sides with respect to <Katex tex="t" />; on the left, <Katex tex="\int e^Q\tfrac{dQ}{dt}\,dt=\int e^Q\,dQ" />. This is the requested form.</>,
    more: <>Here <Katex tex="f(Q)=e^Q" /> and <Katex tex="h(t)=e^t" />. The report also mentions alternatives such as <Katex tex="\int\tfrac{1}{e^{-Q}}\,dQ=\int e^t\,dt" />, which is the same thing since <Katex tex="\tfrac{1}{e^{-Q}}=e^Q" />. Nothing needs integrating yet: the question only asks for the form.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\int e^{Q}\,dQ = \int e^{t}\,dt \implies e^{Q} = e^{t}+c" />,
    reason: <>&ldquo;Hence&rdquo; means start from the form in part b.i. and integrate. One constant is enough.</>,
    more: <>A constant on each side, <Katex tex="e^Q+c_1=e^t+c_2" />, would just combine into the single constant <Katex tex="c=c_2-c_1" />.</>,
  },
  {
    working: <Katex display tex="Q=1 \text{ when } t=0: \quad e^{1} = e^{0}+c = 1+c" />,
    reason: <>Substitute the initial condition now, while the equation is still the simple form <Katex tex="e^Q=e^t+c" />.</>,
    more: <>Taking logs first and substituting into <Katex tex="Q=\log_e(e^t+c)" /> gives the same <Katex tex="c" />, just with more writing.</>,
  },
  {
    working: <Katex display tex="c = e-1" />,
    reason: <>Solving for <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="e^{Q} = e^{t}+e-1 \implies \boxed{Q = \log_e\!\left(e^{t}+e-1\right)}" />,
    reason: <>Take <Katex tex="\log_e" /> of the whole right-hand side (a log of a sum does not split). As required.</>,
    more: <>The log is defined because <Katex tex="e^t+e-1>0" /> for all <Katex tex="t\ge0" />: <Katex tex="e^t\ge1" /> and <Katex tex="e-1>0" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dQ}{dt} = \dfrac{e^{t}}{e^{t}+e-1}" />,
    reason: <>Differentiate <Katex tex="Q=\log_e(e^t+e-1)" /> by the chain rule: derivative of the inside over the inside.</>,
    more: <>Or read it off the differential equation, using <Katex tex="e^Q=e^t+e-1" /> from part b.ii.: <Katex tex="e^{t-Q}=\tfrac{e^t}{e^Q}=\tfrac{e^t}{e^t+e-1}" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{d^2Q}{dt^2} = \dfrac{e^{t}\left(e^{t}+e-1\right)-e^{t}\cdot e^{t}}{\left(e^{t}+e-1\right)^2}" />,
    reason: <>Quotient rule, with <Katex tex="u=e^t" /> and <Katex tex="v=e^t+e-1" />: <Katex tex="\tfrac{u'v-uv'}{v^2}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \dfrac{e^{2t}+e^{t}(e-1)-e^{2t}}{\left(e^{t}+e-1\right)^2}" />
        <Katex display tex="= \dfrac{e^{t}(e-1)}{\left(e^{t}+e-1\right)^2}" />
      </>
    ),
    reason: <>Expand the numerator; the <Katex tex="e^{2t}" /> terms cancel. Leave it factorised so the sign of each factor can be read off.</>,
  },
  {
    working: (
      <>
        <Katex display tex="e^{t}>0, \quad e-1>0, \quad \left(e^{t}+e-1\right)^2>0" />
        <Katex display tex="\implies \dfrac{d^2Q}{dt^2}>0 \ \text{ for all } t\ge0" />
      </>
    ),
    reason: <>Name the sign of every factor: exponentials are positive, <Katex tex="e\approx2.718" /> so <Katex tex="e-1>0" />, and a non-zero square is positive. So the fraction is positive for every <Katex tex="t" />.</>,
    more: <>This factor-by-factor sign argument is the justification the question is asking for. The report notes that most students supplied a correct second derivative but not all of them went on to reasonably justify why the graph does not have a point of inflection. A quick check straight from the differential equation: differentiating <Katex tex="\tfrac{dQ}{dt}=e^{t-Q}" /> gives <Katex tex="\tfrac{d^2Q}{dt^2}=e^{t-Q}\left(1-\tfrac{dQ}{dt}\right)=\tfrac{dQ}{dt}\left(1-\tfrac{dQ}{dt}\right)" />, which is positive because the slope <Katex tex="\tfrac{e^t}{e^t+e-1}" /> from the first row lies strictly between <Katex tex="0" /> and <Katex tex="1" /> (the denominator is bigger than the numerator by <Katex tex="e-1>0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{No point of inflection}}" />,
    reason: <>An inflection needs <Katex tex="\tfrac{d^2Q}{dt^2}" /> to change sign, so to be zero somewhere. It never is: the graph is concave up for all <Katex tex="t\ge0" />.</>,
  },
]

export default function SpecialistQ3_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (9 marks)</p>
        <p>
          The growth and decay of a quantity <Katex tex="P" /> with respect to time{' '}
          <Katex tex="t" /> is modelled by the differential equation{' '}
          <Katex tex="\dfrac{dP}{dt}=kP" />, where <Katex tex="t\ge0" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Exponential Growth" marks={2} statement={<>Given that <Katex tex="P(a)=r" /> and <Katex tex="P(b)=s" />, where <Katex tex="P" /> is a function of <Katex tex="t" />, show that <Katex tex="k=\dfrac{1}{a-b}\log_e\!\left(\dfrac{r}{s}\right)" />.</>} examinerReport={EXAM_AI}>
        <Background>
          <p>
            <Katex tex="\tfrac{dP}{dt}=kP" /> is the classic exponential growth/decay equation —
            the rate of change is proportional to how much there is. Solving it gives{' '}
            <Katex tex="P=Ae^{kt}" />, with two unknown constants, and two data points then pin
            both down.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <WrongMethod
          title="Integrate to log_e P = kt, so P = e^(kt)"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\log_e P = kt \implies P = e^{kt}" />
              <Katex display tex="P(a)=r:\ \ k=\tfrac{\log_e r}{a}" />
              <Katex display tex="P(b)=s:\ \ k=\tfrac{\log_e s}{b}" />
            </>
          }
        >
          Without the constant, <Katex tex="P(0)=e^0=1" /> is forced, so in general the curve can&apos;t go
          through both points and the two data points give two <em>different</em> values of <Katex tex="k" />. For
          example, with <Katex tex="a=1,\ r=3" /> and <Katex tex="b=2,\ s=6" />:{' '}
          <Katex tex="\log_e 3\approx1.10" /> but <Katex tex="\tfrac12\log_e 6\approx0.90" />, while the true{' '}
          <Katex tex="k" /> is <Katex tex="\log_e 2\approx0.69" />. Catch it by counting: fitting a curve through
          two given points needs two free constants, here <Katex tex="A" /> and <Katex tex="k" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="a.ii" topic="Growth Condition" marks={2} statement={<>Specify the condition(s) for which <Katex tex="k>0" />.</>} examinerReport={EXAM_AII}>
        <Background>
          <p>
            With <Katex tex="A>0" />, <Katex tex="P=Ae^{kt}" /> is increasing when <Katex tex="k>0" /> and
            decreasing when <Katex tex="k<0" />. So &ldquo;<Katex tex="k>0" />&rdquo; really asks: when do the two
            data points describe <em>growth</em>? The algebra below arrives at the same answer through the signs of two factors.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <Explore title="k > 0 means the later point is higher, whichever one you call a">
          <LaterHigherWidget />
        </Explore>
        <WrongMethod
          title="Both factors positive: a > b and r > s. Done."
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\tfrac{1}{a-b}>0 \text{ and } \log_e\!\left(\tfrac{r}{s}\right)>0\\&\implies a>b \text{ and } r>s\end{aligned}" />}
        >
          That is only one of the two ways a product can be positive. Try <Katex tex="a=1,\ r=2" /> and <Katex tex="b=3,\ s=8" />: then{' '}
          <Katex tex="\tfrac{1}{a-b}=-\tfrac12" /> and <Katex tex="\log_e\tfrac14<0" />, so{' '}
          <Katex tex="k=\tfrac12\log_e 4=\log_e 2>0" />. That is growth, yet the first condition fails. Whenever a
          product must be positive, write both sign cases, then check that your answer doesn&apos;t change if you
          swap the names of the two points.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The growth of another quantity <Katex tex="Q" /> with respect to time{' '}
          <Katex tex="t" /> is modelled by the differential equation{' '}
          <Katex tex="\dfrac{dQ}{dt}=e^{t-Q}" />, where <Katex tex="t\ge0" /> and{' '}
          <Katex tex="Q=1" /> when <Katex tex="t=0" />.
        </p>
      </div>

      <PartCard letter="b.i" topic="Separable DE" marks={1} statement={<>Express this differential equation in the form <Katex tex="\displaystyle\int f(Q)\,dQ = \int h(t)\,dt" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Separable DE" marks={2} statement={<>Hence, show that <Katex tex="Q=\log_e\!\left(e^{t}+e-1\right)" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Each value of c is a different solution curve; Q = 1 at t = 0 picks c = e − 1">
          <FieldWidget />
        </Explore>
      </PartCard>

      <PartCard letter="b.iii" topic="No Inflection" marks={2} statement={<>Show that the graph of <Katex tex="Q" /> as a function of <Katex tex="t" /> does not have a point of inflection.</>} examinerReport={EXAM_BIII}>
        <Background>
          <p>
            A point of inflection is where a curve changes concavity, from concave up to concave
            down or the reverse. To prove there isn&apos;t one, show that the second derivative keeps
            one sign for <em>every</em> <Katex tex="t" />; checking a single value of{' '}
            <Katex tex="t" /> proves nothing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
        <Explore title="Why the curve never changes its bend: d²Q/dt² stays above zero">
          <NeverZeroWidget />
        </Explore>
        <WrongMethod
          title="I've found d²Q/dt², so there's no inflection"
          source="Examiner's report"
          working={<Katex display tex="\dfrac{d^2Q}{dt^2}=\dfrac{e^{t}(e-1)}{\left(e^{t}+e-1\right)^2}\ \therefore\ \text{no inflection}" />}
        >
          The formula on its own proves nothing: the question wants the <em>reason</em> it can never be zero or
          change sign. Substituting a few values of <Katex tex="t" />, or seeing{' '}
          <Cas fn="solve" /> return &ldquo;false&rdquo; for <Katex tex="\tfrac{d^2Q}{dt^2}=0" />, is a good check,
          but only the factor-by-factor sign argument covers every <Katex tex="t" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
