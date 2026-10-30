// 2025 Specialist NHT — Exam 1, Question 5 (5 marks). The NHT report gives sample answers only,
// with no statistics. Logistic differential equation dB/dt = 0.03B(1 − B/500), B(0) = 200: solve by
// separating variables and partial fractions to show t = (100/3) log_e(3B/(1000 − 2B)), then the
// time of fastest growth, when B = 250 (half the carrying capacity): t = (100/3) log_e(3/2).
// Question text transcribed from the original paper (read from a rendered page image; the 2025
// paper has no text layer). Answers checked with sympy (the derivative of the given t(B) is the
// reciprocal of 0.03B(1 − B/500), t(200) = 0, partial fractions) and against the report's sample
// answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dB}{dt}=\frac{3}{100}B\cdot\frac{500-B}{500}=\frac{3B(500-B)}{50\,000}" />,
    reason: <>Write the right-hand side as a single fraction: <Katex tex="0.03=\tfrac{3}{100}" /> and <Katex tex="1-\tfrac{B}{500}=\tfrac{500-B}{500}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dt}{dB}=\frac{50\,000}{3B(500-B)}" />,
    reason: <>The right side depends only on <Katex tex="B" />, so flip both sides: <Katex tex="\tfrac{dt}{dB}=1\Big/\tfrac{dB}{dt}" />. Integrating with respect to <Katex tex="B" /> will then give <Katex tex="t" /> as a function of <Katex tex="B" />, which is the form we are asked for.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{1}{B(500-B)}&=\frac{\alpha}{B}+\frac{\beta}{500-B} \\ 1&=\alpha(500-B)+\beta B \\ B=0&:\ \alpha=\tfrac{1}{500} \\ B=500&:\ \beta=\tfrac{1}{500} \end{aligned}" />,
    reason: <>The denominator is a product of two distinct linear factors, so split it into partial fractions. Then substitute <Katex tex="B=0" /> and <Katex tex="B=500" />: each makes one bracket zero, leaving one unknown at a time. (Greek letters, so as not to clash with the population <Katex tex="B" />.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t&=\frac{50\,000}{3\times500}\int\left(\frac{1}{B}+\frac{1}{500-B}\right)dB \\ &=\frac{100}{3}\int\left(\frac{1}{B}+\frac{1}{500-B}\right)dB \end{aligned}" />,
    reason: <><Katex tex="\tfrac{50\,000}{3\times500}=\tfrac{100}{3}" />, which matches the coefficient in the target, a good sign.</>,
  },
  {
    working: <Katex display tex="t=\frac{100}{3}\Big(\log_e|B|-\log_e|500-B|\Big)+c" />,
    reason: <><Katex tex="\int\tfrac1B\,dB=\log_e|B|" />. For the second term, the inside <Katex tex="500-B" /> has derivative <Katex tex="-1" />, so <Katex tex="\int\tfrac{1}{500-B}\,dB=-\log_e|500-B|" />.</>,
    more: <>That minus sign is the step most worth checking: differentiate <Katex tex="-\log_e|500-B|" /> and you get <Katex tex="-\tfrac{-1}{500-B}=\tfrac{1}{500-B}" /> ✓.</>,
  },
  {
    working: <Katex display tex="t=\frac{100}{3}\log_e\left(\frac{B}{500-B}\right)+c,\quad 0<B<500" />,
    reason: <>Combine with the log law <Katex tex="\log_e(a)-\log_e(b)=\log_e\left(\tfrac ab\right)" />. The population starts at 200 and grows towards 500 (the carrying capacity, where <Katex tex="\tfrac{dB}{dt}=0" /> again) without reaching it, so <Katex tex="B" /> and <Katex tex="500-B" /> are both positive and the absolute value bars can go.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t=0,\ B=200:\quad 0&=\frac{100}{3}\log_e\left(\frac{200}{300}\right)+c \\ \implies c&=-\frac{100}{3}\log_e\left(\frac23\right) \end{aligned}" />,
    reason: <>Use the initial condition <Katex tex="B_0=200" /> to find the constant.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t&=\frac{100}{3}\left(\log_e\left(\frac{B}{500-B}\right)-\log_e\left(\frac23\right)\right) \\ &=\frac{100}{3}\log_e\left(\frac{B}{500-B}\times\frac32\right) \end{aligned}" />,
    reason: <>Subtracting a log is dividing inside it: dividing by <Katex tex="\tfrac23" /> is multiplying by <Katex tex="\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac{100}{3}\log_e\left(\frac{3B}{1000-2B}\right)}" />,
    reason: <><Katex tex="\tfrac{3B}{2(500-B)}=\tfrac{3B}{1000-2B}" />. As required.</>,
    more: <>Check: at <Katex tex="B=200" />, <Katex tex="\tfrac{600}{1000-400}=1" /> and <Katex tex="\log_e(1)=0" />, so <Katex tex="t=0" /> ✓. And as <Katex tex="B\to500" />, the denominator <Katex tex="\to0" /> and <Katex tex="t\to\infty" />: the population approaches 500 but never reaches it, as a logistic model should.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dB}{dt}=0.03\left(B-\frac{B^2}{500}\right)" />,
    reason: <>The growth rate is a quadratic in <Katex tex="B" /> with a negative <Katex tex="B^2" /> coefficient: an inverted parabola with zeros at <Katex tex="B=0" /> and <Katex tex="B=500" />.</>,
  },
  {
    working: <Katex display tex="\text{maximum at } B=\frac{0+500}{2}=250" />,
    reason: <>The turning point of a parabola is midway between its zeros. So the population grows fastest when it is half the carrying capacity.</>,
    more: <>By calculus: <Katex tex="\tfrac{d}{dB}\left(B-\tfrac{B^2}{500}\right)=1-\tfrac{B}{250}=0" /> at <Katex tex="B=250" />. The population does reach 250, since it rises continuously from 200 towards 500.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t&=\frac{100}{3}\log_e\left(\frac{3\times250}{1000-500}\right) \\ &=\frac{100}{3}\log_e\left(\frac{750}{500}\right) \end{aligned}" />,
    reason: <>Substitute <Katex tex="B=250" /> into the result of part a.</>,
  },
  {
    working: <Katex display tex="\boxed{t=\frac{100}{3}\log_e\left(\frac32\right)\text{ weeks}}" />,
    reason: <>Exact answer, as Exam 1 requires. Sanity check: <Katex tex="\log_e(1.5)\approx0.405" />, so <Katex tex="t\approx13.5" /> weeks, positive and fairly soon, since the population starts not far below 250.</>,
  },
]

export default function SpecialistQ5_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (5 marks)</p>
        <p>
          The growth of a population of bees is modelled by the logistic differential equation{' '}
          <Katex tex="\dfrac{dB}{dt}=0.03B\left(1-\dfrac{B}{500}\right)" />, where <Katex tex="B" /> is the number of bees
          after <Katex tex="t" /> weeks.
        </p>
        <p>
          The initial population is <Katex tex="B_0=200" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Logistic Equation"
        marks={4}
        statement={
          <>
            Use integration to show that <Katex tex="t=\dfrac{100}{3}\log_e\left(\dfrac{3B}{1000-2B}\right)" />.
          </>
        }
      >
        <Background>
          <p>
            When <Katex tex="\tfrac{dB}{dt}" /> depends only on <Katex tex="B" />, invert it:{' '}
            <Katex tex="\tfrac{dt}{dB}=\tfrac{1}{f(B)}" />, and integrate with respect to <Katex tex="B" />. That gives{' '}
            <Katex tex="t" /> in terms of <Katex tex="B" /> directly, which is what this question wants. For the logistic
            equation, <Katex tex="\tfrac{1}{f(B)}" /> has two linear factors in its denominator, so partial fractions turn
            it into two logs.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Logistic Equation"
        marks={1}
        statement={<>Find the value of <Katex tex="t" /> for which the population is increasing most rapidly.</>}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Maximise B instead of dB/dt"
          working={<Katex display tex="B\to500\implies t\to\infty" />}
        >
          &ldquo;Increasing most rapidly&rdquo; is about the <i>rate</i>, <Katex tex="\tfrac{dB}{dt}" />, not the size of
          the population. The population is largest at the end, but by then it has almost stopped growing. The rate is
          largest at the inflection point of the <Katex tex="B" />–<Katex tex="t" /> curve, at <Katex tex="B=250" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
