// 2023 Mathematical Methods NHT — Exam 1, Question 3 (5 marks). The NHT report gives sample
// answers only, with no statistics; its notes beyond the bare answers (part b.: the variance
// formula is on the formula sheet; part c.: fraction arithmetic) are quoted as those parts'
// examiner comments. A binomial count of red first-aid kits picked with replacement over three
// days, R ~ Bi(3, 3/5): Pr(R = 3), sd(R) and a conditional probability. Question text transcribed
// from the original paper. Answers checked with sympy and against the report's sample answers
// (27/125; 3√2/5; 1/3). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_B: SAExaminerStats = {
  comment: <>The formula for variance is on the formula sheet</>,
}

const REPORT_C: SAExaminerStats = {
  comment: <>Some students found the arithmetic of the fraction calculations challenging</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="R\sim\text{Bi}\left(3,\ \tfrac{3}{5}\right)" />,
    reason: <>Three days, each an independent trial (the kit is returned, so the chances reset each day), each with the same probability <Katex tex="\tfrac35" /> of red: 3 of the 5 kits are red. <Katex tex="R" /> counts the reds, so it is binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(R=3)=\left(\frac{3}{5}\right)^3" />,
    reason: <>Red on all three days: multiply the three independent probabilities.</>,
    more: <>The binomial formula gives the same thing: <Katex tex="\binom33\left(\tfrac35\right)^3\left(\tfrac25\right)^0=\left(\tfrac35\right)^3" />, since there is only one arrangement (RRR).</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(R=3)=\frac{27}{125}}" />,
    reason: <>Sanity check: about 0.22. Red is the likelier colour, but needing it three times in a row should still be well under a half.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(R)=np(1-p)=3\times\frac{3}{5}\times\frac{2}{5}=\frac{18}{25}" />,
    reason: <>The binomial variance from the formula sheet, with <Katex tex="n=3" />, <Katex tex="p=\tfrac35" />, <Katex tex="1-p=\tfrac25" />.</>,
  },
  {
    working: <Katex display tex="\text{sd}(R)=\sqrt{\frac{18}{25}}=\frac{\sqrt{18}}{5}" />,
    reason: <>The question asks for the standard deviation: the square root of the variance.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{sd}(R)=\frac{3\sqrt{2}}{5}}" />,
    reason: <><Katex tex="\sqrt{18}=\sqrt{9\times2}=3\sqrt2" />.</>,
    more: <>About 0.85: <Katex tex="R" /> only takes the values 0 to 3, with mean <Katex tex="np=1.8" />, so a typical distance from the mean of a bit under 1 is believable. Stopping at the variance, <Katex tex="\tfrac{18}{25}" />, answers a different question.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(R=3\mid R\ge2)&=\frac{\Pr(R=3\cap R\ge2)}{\Pr(R\ge2)}\\&=\frac{\Pr(R=3)}{\Pr(R\ge2)}\end{aligned}" />,
    reason: <>Conditional probability. Getting 3 reds already means at least 2, so the event &ldquo;<Katex tex="R=3" /> and <Katex tex="R\ge2" />&rdquo; is just <Katex tex="R=3" />.</>,
  },
  {
    working: <Katex display tex="\Pr(R\ge2)=\Pr(R=2)+\Pr(R=3)" />,
    reason: <><Katex tex="R" /> can be at most 3, so &ldquo;at least 2&rdquo; means 2 or 3.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(R=2)&=\binom{3}{2}\left(\frac{3}{5}\right)^2\left(\frac{2}{5}\right)\\&=3\times\frac{9}{25}\times\frac{2}{5}=\frac{54}{125}\end{aligned}" />,
    reason: <>Two reds and one orange; the orange can come on any of the 3 days, hence <Katex tex="\binom32=3" />.</>,
  },
  {
    working: <Katex display tex="\Pr(R=3\mid R\ge2)=\frac{\frac{27}{125}}{\frac{54}{125}+\frac{27}{125}}=\frac{\frac{27}{125}}{\frac{81}{125}}" />,
    reason: <>Keep everything over the common denominator 125.</>,
    more: <>The report notes some students found the arithmetic of the fraction calculations challenging. Leaving every probability in 125ths makes the denominators cancel in the next line, so there are no awkward fractions to divide.</>,
  },
  {
    working: <Katex display tex="=\frac{27}{125}\times\frac{125}{81}=\frac{27}{81}" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(R=3\mid R\ge2)=\frac{1}{3}}" />,
    reason: <>Sanity check: a conditional probability must be at least the unconditional one (knowing <Katex tex="R\ge2" /> makes 3 reds more likely), and <Katex tex="\tfrac13>\tfrac{27}{125}\approx0.22" /> ✓.</>,
    more: <>Another way to see it: the counts 54 and 27 are in the ratio 2 : 1, so given that it is either two reds or three reds, three reds has 1 chance in 3.</>,
  },
]

export default function MethodsQ3_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          A school&rsquo;s first-aid room contains five first-aid kits. Three first-aid kits are red and two are orange.
        </p>
        <p>
          For three days in a row, one first-aid kit is selected at random for an excursion and returned at the end of the
          day.
        </p>
        <p>Each of the five first-aid kits has an equal chance of being selected each day.</p>
        <p>
          Let <Katex tex="R" /> represent the number of red first-aid kits selected over the three days.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Binomial Probability"
        marks={1}
        statement={
          <>
            Find <Katex tex="\Pr(R=3)" />, the probability that the first-aid kit selected is red on all three days.
          </>
        }
      >
        <Background>
          <p>
            A count of &ldquo;successes&rdquo; is binomial when there is a fixed number of trials, each trial has two
            outcomes, the trials are independent and the success probability is the same every time. Because the kit
            is <b>returned</b> at the end of each day, all four hold here: <Katex tex="n=3" /> days, success = red,{' '}
            <Katex tex="p=\tfrac35" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Binomial Variance"
        marks={1}
        statement={
          <>
            Find the standard deviation of the random variable <Katex tex="R" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Conditional Probability"
        marks={3}
        statement={
          <>
            Find <Katex tex="\Pr(R=3\mid R\ge2)" />.
          </>
        }
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Two reds is just (3/5)² × 2/5"
          working={<Katex display tex="\begin{gathered}\Pr(R=2)=\frac{18}{125}\\\implies\frac{\frac{27}{125}}{\frac{18}{125}+\frac{27}{125}}=\frac{27}{45}=\frac{3}{5}\end{gathered}" />}
        >
          <Katex tex="\left(\tfrac35\right)^2\tfrac25" /> is the chance of one particular order, such as red, red,
          orange. The orange kit could come on day 1, 2 or 3, so there are <Katex tex="\binom32=3" /> such orders and{' '}
          <Katex tex="\Pr(R=2)=\tfrac{54}{125}" />. A quick check that catches this: the probabilities{' '}
          <Katex tex="\Pr(R=0)" /> to <Katex tex="\Pr(R=3)" /> must add to 1.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
