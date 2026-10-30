// 2024 Specialist NHT — Exam 1, Question 9 (6 marks). The NHT report gives sample answers only,
// with no statistics; its notes beyond the bare answer (parts a. and d.: "Equivalent answers were
// acceptable.") are quoted as those parts' examiner comments. Logistic model dP/dt = 0.05P(10 − P/50),
// P(0) = 100: d²P/dt² by the chain rule, the meaning of the inflection point (maximum growth rate, at
// half the carrying capacity), the solution t = 2log_e(4P/(500 − P)) by separation and partial
// fractions, and A = (log_e(16), 250). Question text transcribed from the original paper; the graph
// of P against t is cropped from page 8 of the original VCAA exam PDF at 300 dpi
// (spec-2024nhte1-q9-graph.png). Answers checked with sympy (d²P/dt² = P(P − 250)(P − 500)/500000;
// dt/dP of the given solution equals the reciprocal of the DE; t(100) = 0, t(250) = log_e 16 ≈ 2.77,
// matching A on the printed graph) and against the VCAA report's sample answers, which agree.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2024nhte1-q9-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: <>Equivalent answers were acceptable.</>,
}

const REPORT_D: SAExaminerStats = {
  comment: <>Equivalent answers were acceptable.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dP}{dt}=0.05P\left(10-\frac{P}{50}\right)=0.5P-0.001P^2" />,
    reason: <>Expanding makes the derivative with respect to <Katex tex="P" /> easy: <Katex tex="0.05\times10=0.5" /> and <Katex tex="0.05\times\tfrac1{50}=0.001" />.</>,
  },
  {
    working: <Katex display tex="\frac{d^2P}{dt^2}=\frac{d}{dt}\left(\frac{dP}{dt}\right)=\frac{d}{dP}\left(\frac{dP}{dt}\right)\cdot\frac{dP}{dt}" />,
    reason: <><Katex tex="\tfrac{dP}{dt}" /> is given as a function of <Katex tex="P" />, not <Katex tex="t" />, and <Katex tex="P" /> depends on <Katex tex="t" />. So differentiate with respect to <Katex tex="P" /> and multiply by <Katex tex="\tfrac{dP}{dt}" /> (chain rule, the same idea as implicit differentiation).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{d}{dP}\left(0.5P-0.001P^2\right) \\ &=0.5-0.002P=\frac12-\frac{P}{500}\end{aligned}" />,
    reason: <>Differentiate term by term with respect to <Katex tex="P" />: <Katex tex="\tfrac{d}{dP}(0.5P)=0.5" /> and <Katex tex="\tfrac{d}{dP}(0.001P^2)=0.002P" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2P}{dt^2}=0.05P\left(10-\frac{P}{50}\right)\left(\frac12-\frac{P}{500}\right)}" />,
    reason: <>Multiply the derivative just found by <Katex tex="\tfrac{dP}{dt}" />, kept in its given factorised form, as the chain rule above says. This is VCAA&apos;s form. Equivalent forms are accepted, for example <Katex tex="\dfrac{P(P-250)(P-500)}{500\,000}" />.</>,
    more: <>Check the sign: for <Katex tex="100\le P<250" /> the last factor is positive, so the graph is concave up (the growth is speeding up), and for <Katex tex="250<P<500" /> it is negative (concave down). That matches the printed graph either side of <Katex tex="A" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d^2P}{dt^2}=0\ \text{at }A\implies\frac{dP}{dt}\text{ is at its maximum}" />,
    reason: <>At a point of inflection the gradient <Katex tex="\tfrac{dP}{dt}" /> stops increasing and starts decreasing: it is greatest there. Here <Katex tex="\tfrac{dP}{dt}" /> is the rate at which the population grows.</>,
  },
  {
    working: <><b>A is when the kangaroo population is growing at its fastest rate (when the population is 250, half of the carrying capacity of 500).</b></>,
    reason: <>The question says &ldquo;in the context of the growth of the kangaroo population&rdquo;, so the answer must talk about the rate of growth of the population, not just &ldquo;the concavity changes&rdquo;. The 250 comes from part a.: <Katex tex="\tfrac{d^2P}{dt^2}=0" /> when <Katex tex="\tfrac12-\tfrac P{500}=0" />, that is <Katex tex="P=250" />. The carrying capacity, 500, is the population where <Katex tex="\tfrac{dP}{dt}=0" />, so the population levels off there.</>,
    more: <>VCAA&apos;s sample answer: the rate of growth is at a maximum, or half the carrying capacity is reached.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dP}{dt}=0.05P\cdot\frac{500-P}{50}=\frac{P(500-P)}{1000}" />,
    reason: <>Write the right side as one fraction: <Katex tex="10-\tfrac P{50}=\tfrac{500-P}{50}" />, and <Katex tex="\tfrac{0.05}{50}=\tfrac1{1000}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{dt}{dP}=\frac{1000}{P(500-P)} \\ &\implies t=\int\frac{1000}{P(500-P)}\,dP\end{aligned}" />,
    reason: <>The right side depends only on <Katex tex="P" />, so invert: <Katex tex="\tfrac{dt}{dP}=1\div\tfrac{dP}{dt}" />, then integrate with respect to <Katex tex="P" />. (Equivalently, separate the variables.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{1000}{P(500-P)}=\frac{A}{P}+\frac{B}{500-P} \\ &\implies 1000=A(500-P)+BP\end{aligned}" />,
    reason: <>Partial fractions: the denominator is a product of two distinct linear factors.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}P=0:&\ \ 1000=500A\Rightarrow A=2 \\ P=500:&\ \ 1000=500B\Rightarrow B=2\end{aligned}" />,
    reason: <>Substitute the value of <Katex tex="P" /> that makes each bracket zero.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t&=2\int\left(\frac1P+\frac1{500-P}\right)dP \\ &=2\left(\log_e(P)-\log_e(500-P)\right)+c\end{aligned}" />,
    reason: <><Katex tex="\int\tfrac1{500-P}\,dP=-\log_e(500-P)" />: the <Katex tex="-P" /> inside brings a factor of <Katex tex="-1" />. No absolute values are needed because <Katex tex="P\in[100,500)" /> makes both <Katex tex="P" /> and <Katex tex="500-P" /> positive.</>,
    more: <>Forgetting that <Katex tex="-1" /> gives <Katex tex="2\log_e\big(P(500-P)\big)" />, which can never become the required <Katex tex="\log_e" /> of a quotient. Differentiating <Katex tex="\log_e(500-P)" /> by the chain rule gives <Katex tex="\tfrac{-1}{500-P}" />, a quick way to check the sign.</>,
  },
  {
    working: <Katex display tex="t=2\log_e\!\left(\frac{P}{500-P}\right)+c" />,
    reason: <>Log law: <Katex tex="\log_e a-\log_e b=\log_e\tfrac ab" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&t=0,\ P=100: \\ &0=2\log_e\!\left(\frac{100}{400}\right)+c \\ &\implies c=-2\log_e\!\left(\frac14\right)=2\log_e(4)\end{aligned}" />,
    reason: <>The initial population was 100 at <Katex tex="t=0" />. <Katex tex="-\log_e\tfrac14=\log_e4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}t&=2\log_e\!\left(\frac{P}{500-P}\right)+2\log_e(4) \\ &=2\log_e\!\left(\frac{4P}{500-P}\right)\end{aligned}" />,
    reason: <>Combine with <Katex tex="\log_e a+\log_e b=\log_e(ab)" />. This is the given result. As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="P=250" />,
    reason: <>From part b. (or part a.: <Katex tex="\tfrac{d^2P}{dt^2}=0" /> when <Katex tex="\tfrac12-\tfrac P{500}=0" />), the inflection point is at half the carrying capacity.</>,
  },
  {
    working: <Katex display tex="t=2\log_e\!\left(\frac{4\times250}{500-250}\right)=2\log_e(4)=\log_e(16)" />,
    reason: <>&ldquo;Hence&rdquo;: use part c.&apos;s formula, which gives <Katex tex="t" /> directly from <Katex tex="P" />. <Katex tex="2\log_e4=\log_e\left(4^2\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A\left(\log_e(16),\ 250\right)}" />,
    reason: <>The <Katex tex="t" />-coordinate comes first, then <Katex tex="P" />. Equivalent forms such as <Katex tex="\left(2\log_e(4),250\right)" /> or <Katex tex="\left(4\log_e(2),250\right)" /> are equally correct.</>,
    more: <>Graph check: <Katex tex="\log_e16\approx2.77" />, and <Katex tex="A" /> is printed a little before <Katex tex="t=3" />, at <Katex tex="P=250" /> ✓.</>,
  },
]

export default function SpecialistQ9_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          In a population, the number of kangaroos, <Katex tex="P" />, is modelled by the logistic differential equation{' '}
          <Katex tex="\dfrac{dP}{dt}=0.05P\left(10-\dfrac{P}{50}\right)" />, where <Katex tex="P\in[100,500)" /> and where{' '}
          <Katex tex="t" /> is the time in years after the population was established.
        </p>
        <p>The initial number of kangaroos in the population was 100.</p>
      </div>

      <PartCard
        letter="a"
        topic="Second Derivative"
        marks={1}
        statement={<>Find <Katex tex="\dfrac{d^2P}{dt^2}" /> in terms of <Katex tex="P" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod title="Differentiate the right-hand side with respect to P and stop" working={<Katex display tex="\frac{d^2P}{dt^2}=0.5-0.002P" />}>
          That is <Katex tex="\tfrac{d}{dP}\left(\tfrac{dP}{dt}\right)" />, a derivative with respect to <Katex tex="P" />.
          The second derivative is with respect to <Katex tex="t" />, so the chain rule needs the extra factor{' '}
          <Katex tex="\tfrac{dP}{dt}" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Part of the graph of <Katex tex="P" /> against <Katex tex="t" /> is shown below. The graph contains a single
          point of inflection, labelled <Katex tex="A" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={graphSrc} alt="Graph from the original VCAA exam paper: P against t, with P from 0 to 500 marked every 100 and t marked at 2, 4 and 6 on a grid. The curve starts at (0, 100), rises with increasing steepness to the point of inflection A at about (2.8, 250), then continues rising less steeply to about (6, 410)." className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Logistic Growth"
        marks={1}
        statement={
          <>
            In the context of the growth of the kangaroo population, what does the point of inflection at{' '}
            <Katex tex="A" /> represent?
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Logistic Equation"
        marks={3}
        statement={
          <>
            Solve the logistic differential equation to show that{' '}
            <Katex tex="t=2\log_e\!\left(\dfrac{4P}{500-P}\right)" />.
          </>
        }
      >
        <Background>
          <p>
            A differential equation of the form <Katex tex="\tfrac{dP}{dt}=f(P)" /> (no <Katex tex="t" /> on the right)
            is solved by flipping both sides, <Katex tex="\tfrac{dt}{dP}=\tfrac1{f(P)}" />, and integrating with respect
            to <Katex tex="P" />. For a logistic equation <Katex tex="\tfrac1{f(P)}" /> has two linear factors in its
            denominator, so partial fractions turn it into two logarithms. The initial condition then fixes the
            constant.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Point of Inflection"
        marks={1}
        statement={<>Hence, or otherwise, find the coordinates of point <Katex tex="A" />.</>}
        examinerReport={REPORT_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
