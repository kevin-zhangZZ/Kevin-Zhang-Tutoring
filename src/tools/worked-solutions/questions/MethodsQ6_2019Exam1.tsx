// 2019 Mathematical Methods — Exam 1, Question 6 (3 marks).
// A sample proportion of faulty pegs (part a), then Pr(sample proportion in a box of 12 is
// less than the true proportion 1/6), expressed in the form a(b)ⁿ (part b). Question text
// transcribed from the original paper (no diagram given — purely algebraic). Cross-checked
// against the VCAA examination report and itute's independent solutions — both agree with
// the derivation below (17/6·(5/6)^11 ≈ 0.3813, confirmed in sympy). Solution is original.
// Part b. interactives: meth-2019e1-q6b-bars (the distribution of P̂ = X/12 as bars with a
// sliding cut-off, "≤" and sd-formula normal-curve toggles) and meth-2019e1-q6b-arrangements
// (why Pr(X = 1) carries the coefficient 12). Common mistakes: the sd formula (examiner's report)
// and using part a.'s 8/41 as p (disputed on the ATAR Notes 2019 Exam 1 thread).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BarsWidget = lazyWidget(() => import('../interactives/meth-2019e1-q6b-bars'))
const ArrangementsWidget = lazyWidget(() => import('../interactives/meth-2019e1-q6b-arrangements'))

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1.0,
  comment: <>This question was done well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 29, 12],
  average: 0.6,
  comment: (
    <>
      Most students recognised this as a binomial distribution; however, few managed to
      correctly find the two component expressions. Even fewer successfully managed to
      manipulate these expressions to the format specified by the question. Another common
      error was to apply the standard deviation formula.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \dfrac{\text{no. faulty}}{\text{sample size}} = \dfrac{8}{41}" />,
    reason: <>A sample proportion is the number in the sample with the attribute divided by the sample size. Here the attribute is &ldquo;faulty&rdquo;: <Katex tex="8" /> of the <Katex tex="41" /> pegs Fred checked.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{8}{41}}" />,
    reason: <>Leave it as a fraction: the question asks for a proportion and sets no rounding. (<Katex tex="\tfrac{8}{41}\approx0.195" /> — a shade under one peg in five was faulty in this particular sample. Part b. then tells you the company&apos;s <em>actual</em> long-run rate is <Katex tex="\tfrac16\approx0.167" />, so this sample happened to run slightly faulty; a sample proportion is an estimate, not the true value.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&X = \text{no. of faulty pegs in a box}\\ &X \sim \operatorname{Bi}\!\left(12,\ \tfrac16\right),\quad \hat P = \tfrac{X}{12}\end{aligned}"
      />
    ),
    reason: (
      <>
        <Katex tex="\hat P" /> is a proportion, but its probabilities come from a <em>count</em>. Each of the 12 pegs is
        faulty or not, with the same chance <Katex tex="\tfrac16" /> each time and independently (the company makes
        thousands of pegs, so one peg doesn&apos;t change the odds for the next): that is a binomial count, and{' '}
        <Katex tex="\hat P" /> is that count divided by 12. Use <Katex tex="p=\tfrac16" />, the <em>actual</em>{' '}
        proportion this part gives you, not part a.&apos;s <Katex tex="\tfrac{8}{41}" />, which was one
        sample&apos;s estimate. Whenever an exact probability about <Katex tex="\hat P" /> is asked for a small
        sample, rewrite it in terms of <span className="whitespace-nowrap"><Katex tex="X" />.</span>
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\Pr\!\left(\hat P<\tfrac16\right) &= \Pr\!\left(\tfrac{X}{12}<\tfrac16\right)\\ &= \Pr(X<2)\\ &= \Pr(X=0)+\Pr(X=1)\end{aligned}"
      />
    ),
    reason: (
      <>
        Multiply both sides by 12: <Katex tex="X<2" />. <Katex tex="X" /> is a whole number, so only the counts{' '}
        <Katex tex="0" /> and <Katex tex="1" /> qualify. Watch the strict inequality: a box with 2 faulty pegs
        has <Katex tex="\hat P=\tfrac{2}{12}=\tfrac16" /> exactly, which is <em>not</em> less than{' '}
        <Katex tex="\tfrac16" />. Wrongly including it (<Katex tex="\le" />) adds{' '}
        <Katex tex="\Pr(X=2)\approx0.296" /> and gives about <Katex tex="0.677" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\Pr(X=0) &= \left(\tfrac56\right)^{12}\\ \Pr(X=1) &= \binom{12}{1}\left(\tfrac16\right)\left(\tfrac56\right)^{11}\\ &= 2\left(\tfrac56\right)^{11}\end{aligned}"
      />
    ),
    reason: (
      <>
        These are the two terms the report says few students found correctly. Use{' '}
        <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" />. No faulty pegs: all twelve are good, each{' '}
        <Katex tex="\tfrac56" />, and there is only one way for that to happen. One faulty peg: one factor of{' '}
        <Katex tex="\tfrac16" /> and eleven of <Katex tex="\tfrac56" />, times{' '}
        <Katex tex="\binom{12}{1}=12" /> because the faulty peg could be any of the 12. Simplify{' '}
        <Katex tex="12\times\tfrac16=2" /> straight away to keep the next step clean.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\Pr(X<2) &= \left(\tfrac56\right)^{12}+2\left(\tfrac56\right)^{11}\\ &= \left(\tfrac56\right)^{11}\left(\tfrac56+2\right)\end{aligned}"
      />
    ),
    reason: (
      <>
        The form <Katex tex="a(b)^n" /> means one number times a <em>single</em> power, so the two terms have to
        become one. They share the base <Katex tex="\tfrac56" />, so factor out the lower power{' '}
        <Katex tex="\left(\tfrac56\right)^{11}" />: since{' '}
        <Katex tex="\left(\tfrac56\right)^{12}=\left(\tfrac56\right)^{11}\times\tfrac56" />, the first term leaves{' '}
        <Katex tex="\tfrac56" /> behind and the second leaves <Katex tex="2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\hat P<\tfrac16\right) = \dfrac{17}{6}\left(\dfrac56\right)^{11}}" />,
    reason: (
      <>
        Write <Katex tex="2=\tfrac{12}{6}" /> first: <Katex tex="\tfrac56+\tfrac{12}{6}=\tfrac{17}{6}" />. This
        is the required form with <Katex tex="a=\tfrac{17}{6}" />, <Katex tex="b=\tfrac56" />,{' '}
        <Katex tex="n=11" />. Check it&apos;s sensible: <Katex tex="\tfrac{17}{6}\left(\tfrac56\right)^{11}\approx0.381" />,
        between 0 and 1 (<Katex tex="a" /> being bigger than 1 is fine; it&apos;s only one factor). The same number
        can also be written <Katex tex="\tfrac{17}{5}\left(\tfrac56\right)^{12}" />.
      </>
    ),
  },
]

export default function MethodsQ6_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Fred owns a company that produces thousands of pegs each day. He randomly selects 41
          pegs that are produced on one day and finds eight faulty pegs.
        </p>
      </div>

      <PartCard letter="a" topic="Sample Proportion" marks={1} statement={<>What is the proportion of faulty pegs in this sample?</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            Pegs are packed each day in boxes. Each box holds 12 pegs. Let <Katex tex="\hat P" />{' '}
            be the random variable that represents the proportion of faulty pegs in a box. The
            actual proportion of faulty pegs produced by the company each day is{' '}
            <Katex tex="\tfrac16" />. Find <Katex tex="\Pr\!\left(\hat P<\tfrac16\right)" />.
            Express your answer in the form <Katex tex="a(b)^n" />, where <Katex tex="a" /> and{' '}
            <Katex tex="b" /> are positive rational numbers and <Katex tex="n" /> is a positive
            integer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="A sample proportion is a count in disguise">
          <p>
            Take a sample of size <Katex tex="n" /> from a population with proportion <Katex tex="p" />. The number
            in the sample with the attribute is <Katex tex="X\sim\operatorname{Bi}(n,p)" />, and the sample
            proportion is <Katex tex="\hat P=\tfrac{X}{n}" />. So <Katex tex="\hat P" /> can only take the values{' '}
            <Katex tex="0,\ \tfrac1n,\ \tfrac2n,\ \ldots,\ 1" />, and{' '}
            <Katex tex="\Pr\!\left(\hat P=\tfrac kn\right)=\Pr(X=k)" />.
          </p>
          <p>
            <Katex tex="\hat P" /> has mean <Katex tex="p" /> and standard deviation{' '}
            <Katex tex="\sqrt{\tfrac{p(1-p)}{n}}" />. Those tell you where <Katex tex="\hat P" /> is centred and how
            spread out it is; they are not probabilities. For an exact probability, turn the{' '}
            <Katex tex="\hat P" /> event into an <Katex tex="X" /> event and use the binomial distribution.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="P̂ only lands on multiples of 1/12, so P̂ < 1/6 is just two bars">
          <BarsWidget />
        </Explore>
        <Explore title="Why Pr(X = 1) has a 12 in front">
          <ArrangementsWidget />
        </Explore>
        <WrongMethod
          title="Use the standard deviation formula √(p(1 − p)/n)"
          source="Examiner's report"
          working={<Katex display tex="\operatorname{sd}\!\left(\hat P\right)=\sqrt{\frac{\frac16\times\frac56}{12}}=\frac{\sqrt{15}}{36}\approx0.108" />}
        >
          That number is the <em>spread</em> of <Katex tex="\hat P" /> (how far a box&apos;s proportion typically
          sits from <Katex tex="\tfrac16" />), not the probability of anything. Pushing on with a normal curve
          doesn&apos;t rescue it: a normal curve centred at <Katex tex="\tfrac16" /> puts half its area below{' '}
          <Katex tex="\tfrac16" />, giving <Katex tex="0.5" />, not <Katex tex="0.381" />, because a box of 12 can
          only give <Katex tex="\hat P=0,\tfrac1{12},\tfrac2{12},\ldots" /> and a whole bar of probability sits exactly
          on <Katex tex="\tfrac16" />. The form <Katex tex="a(b)^n" /> is the giveaway: a power like{' '}
          <Katex tex="\left(\tfrac56\right)^{11}" /> only comes out of the binomial formula.
        </WrongMethod>
        <WrongMethod
          title="Use p = 8/41 from part a."
          source="ATAR Notes forum"
          working={<Katex display tex="\begin{aligned}&X\sim\operatorname{Bi}\!\left(12,\tfrac{8}{41}\right)\\ &\Pr(X<2)=\tfrac{129}{41}\left(\tfrac{33}{41}\right)^{11}\approx0.289\end{aligned}" />}
        >
          <Katex tex="\tfrac{8}{41}" /> was one sample&apos;s estimate. Part b. states the <em>actual</em> proportion
          of faulty pegs, <Katex tex="\tfrac16" />, and a probability model for a box uses the true{' '}
          <Katex tex="p" />. When a question says &ldquo;the actual proportion is&rdquo;, that is your{' '}
          <Katex tex="p" />; an earlier sample&apos;s proportion plays no part.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
