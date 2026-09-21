// 2019 Specialist Mathematics — Exam 2, Section B, Question 3 (9 marks).
// Exponential growth/decay dP/dt = kP with two data points, then a separable differential
// equation dQ/dt = e^(t−Q) and a proof that its solution has no point of inflection. Question
// text transcribed from the original paper (no diagram given). Cross-checked against the VCAA
// examination report and itute's independent solutions, and verified by computer algebra.
// Note on part (a)(ii): itute gives only "a > b and r > s"; VCAA's published answer includes
// the second branch, "a < b and r < s", which the solution below derives. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [28, 21, 51],
  average: 1.3,
  comment: <>Students solved the differential equation to find the given expression for <Katex tex="k" /> by a variety of correct approaches. Common errors were to neglect a constant of integration, or to make mistakes when manipulating logarithmic or exponential terms.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [60, 20, 20],
  average: 0.6,
  comment: <>A significant number of students stated only the first of the two conditions.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: <>Most students correctly separated the variables.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [27, 4, 69],
  average: 1.4,
  comment: <>Most students integrated correctly and used the given condition to find the constant of integration.</>,
}

const EXAM_BIII: SAExaminerStats = {
  marks: [38, 24, 38],
  average: 1.0,
  comment: <>Students needed to show that the second derivative is never zero. Some students only showed that it was non-zero at a particular value of <Katex tex="t" />.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dP}{dt} = kP \implies \dfrac{1}{P}\,dP = k\,dt" />,
    reason: <>Separate the variables.</>,
  },
  {
    working: <Katex display tex="\log_e|P| = kt + c \implies P = Ae^{kt}" />,
    reason: <>Integrate both sides and exponentiate, absorbing <Katex tex="e^c" /> into a single constant <Katex tex="A" />. (Forgetting the constant of integration is the report's most common error.)</>,
  },
  {
    working: (
      <>
        <Katex display tex="P(a)=r: \quad Ae^{ka} = r" />
        <Katex display tex="P(b)=s: \quad Ae^{kb} = s" />
      </>
    ),
    reason: <>Two equations, two unknowns (<Katex tex="A" /> and <Katex tex="k" />) — but only <Katex tex="k" /> is wanted.</>,
  },
  {
    working: <Katex display tex="\dfrac{Ae^{ka}}{Ae^{kb}} = \dfrac{r}{s} \implies e^{k(a-b)} = \dfrac{r}{s}" />,
    reason: <>Dividing eliminates the unwanted <Katex tex="A" /> in one step — much cleaner than solving for it.</>,
  },
  {
    working: <Katex display tex="k(a-b) = \log_e\!\left(\dfrac{r}{s}\right)" />,
    reason: <>Take logs of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{1}{a-b}\log_e\!\left(\dfrac{r}{s}\right)}" />,
    reason: <>As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="k = \underbrace{\dfrac{1}{a-b}}_{\text{factor 1}}\times\underbrace{\log_e\!\left(\dfrac{r}{s}\right)}_{\text{factor 2}} > 0" />,
    reason: <>A product of two factors is positive when both are positive <em>or</em> both are negative — that is where the two cases come from.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\dfrac{r}{s}\right)>0 \iff \dfrac{r}{s}>1 \iff r>s" />,
    reason: <>A logarithm is positive exactly when its argument exceeds <Katex tex="1" /> (taking <Katex tex="r,s>0" />, as they are population sizes).</>,
  },
  {
    working: <Katex display tex="\textbf{Case 1: } a-b>0 \text{ and } r>s \implies a>b \text{ and } r>s" />,
    reason: <>Both factors positive. Sensible: the later time has the larger population, so the quantity is growing.</>,
  },
  {
    working: <Katex display tex="\textbf{Case 2: } a-b<0 \text{ and } r<s \implies a<b \text{ and } r<s" />,
    reason: <>Both factors negative. Same physical situation described the other way round — the earlier time has the smaller population.</>,
  },
  {
    working: <Katex display tex="\boxed{a>b \text{ and } r>s, \quad \text{or} \quad a<b \text{ and } r<s}" />,
    reason: <>Both are required for the two marks; the report notes a significant number of students gave only the first.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dQ}{dt} = e^{t-Q} = \dfrac{e^t}{e^Q}" />,
    reason: <>Index law <Katex tex="e^{t-Q}=\tfrac{e^t}{e^Q}" /> — this is what makes the equation separable, by splitting the single exponential into a <Katex tex="t" /> part and a <Katex tex="Q" /> part.</>,
  },
  {
    working: <Katex display tex="\boxed{e^{Q}\,dQ = e^{t}\,dt}" />,
    reason: <>Multiply both sides by <Katex tex="e^Q\,dt" />, giving the requested form <Katex tex="f(Q)\,dQ=h(t)\,dt" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\int e^{Q}\,dQ = \int e^{t}\,dt \implies e^{Q} = e^{t}+c" />,
  },
  {
    working: <Katex display tex="Q=1 \text{ when } t=0: \quad e^{1} = e^{0}+c = 1+c" />,
  },
  {
    working: <Katex display tex="c = e-1" />,
  },
  {
    working: <Katex display tex="e^{Q} = e^{t}+e-1 \implies \boxed{Q = \log_e\!\left(e^{t}+e-1\right)}" />,
    reason: <>Taking logs of both sides. Valid because <Katex tex="e^t+e-1>0" /> for all <Katex tex="t\ge0" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dQ}{dt} = \dfrac{e^{t}}{e^{t}+e-1}" />,
    reason: <>Differentiating <Katex tex="Q=\log_e(e^t+e-1)" /> by the chain rule: derivative of the inside over the inside. (Or just read it off the original differential equation.)</>,
  },
  {
    working: <Katex display tex="\dfrac{d^2Q}{dt^2} = \dfrac{e^{t}\left(e^{t}+e-1\right)-e^{t}\cdot e^{t}}{\left(e^{t}+e-1\right)^2}" />,
    reason: <>Quotient rule.</>,
  },
  {
    working: <Katex display tex="= \dfrac{e^{2t}+e^{t}(e-1)-e^{2t}}{\left(e^{t}+e-1\right)^2} = \dfrac{e^{t}(e-1)}{\left(e^{t}+e-1\right)^2}" />,
    reason: <>The <Katex tex="e^{2t}" /> terms cancel, leaving a much simpler expression.</>,
  },
  {
    working: <Katex display tex="e^{t}>0 \ \text{ and } \ e-1>0 \ \text{ and } \ \left(e^{t}+e-1\right)^2>0 \implies \dfrac{d^2Q}{dt^2}>0 \ \text{ for all } t\ge0" />,
    reason: <>Every factor is strictly positive, so the whole fraction is strictly positive — it is never zero.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{No point of inflection}}" />,
    reason: <>A point of inflection requires the second derivative to change sign, which in particular requires it to be zero somewhere. It never is, so there is no inflection point. Showing it is non-zero at one specific <Katex tex="t" /> is not enough — the report flags exactly that.</>,
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

      <PartCard letter="a.i" marks={2} statement={<>Given that <Katex tex="P(a)=r" /> and <Katex tex="P(b)=s" />, where <Katex tex="P" /> is a function of <Katex tex="t" />, show that <Katex tex="k=\dfrac{1}{a-b}\log_e\!\left(\dfrac{r}{s}\right)" />.</>} examinerReport={EXAM_AI}>
        <Background>
          <p>
            <Katex tex="\tfrac{dP}{dt}=kP" /> is the classic exponential growth/decay equation —
            the rate of change is proportional to how much there is. Solving it gives{' '}
            <Katex tex="P=Ae^{kt}" />, with two unknown constants. Two data points then pin both
            down; since only <Katex tex="k" /> is wanted, dividing one equation by the other
            eliminates <Katex tex="A" /> immediately.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" marks={2} statement="Specify the condition(s) for which k > 0." examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The growth of another quantity <Katex tex="Q" /> with respect to time{' '}
          <Katex tex="t" /> is modelled by the differential equation{' '}
          <Katex tex="\dfrac{dQ}{dt}=e^{t-Q}" />, where <Katex tex="t\ge0" /> and{' '}
          <Katex tex="Q=1" /> when <Katex tex="t=0" />.
        </p>
      </div>

      <PartCard letter="b.i" marks={1} statement={<>Express this differential equation in the form <Katex tex="f(Q)\,dQ = h(t)\,dt" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" marks={2} statement={<>Hence, show that <Katex tex="Q=\log_e\!\left(e^{t}+e-1\right)" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="b.iii" marks={2} statement={<>Show that the graph of <Katex tex="Q" /> as a function of <Katex tex="t" /> does not have a point of inflection.</>} examinerReport={EXAM_BIII}>
        <Background>
          <p>
            A point of inflection is where a curve changes concavity — which requires{' '}
            <Katex tex="\tfrac{d^2Q}{dt^2}" /> to <em>change sign</em>, and in particular to pass
            through zero. So to prove there isn't one, find the second derivative and show it can
            never equal zero. Checking a single value of <Katex tex="t" /> proves nothing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>
    </div>
  )
}
