// 2022 Mathematical Methods — Exam 2, Section B Question 3 (14 marks). Coin flips: a
// binomial, a quadratic density function fixed by three integrals, and a sample
// proportion. Question text transcribed from the original paper. Answers checked with
// sympy/scipy and against the VCAA examination report. Solution is original.
// Transcription fix (Oct 2026): part b.ii's conditions are Pr(H ≤ 2) and Pr(H ≥ 2.5) on the
// paper (previously transcribed with strict inequalities).
// Interactives: b.iii meth-2022e2-q3biii-reflect (the gap d = 3 − h reflects f, so r = −1);
// c.iii meth-2022e2-q3ciii-quadruple (halving the interval width needs four times the flips).
// Skipped (Oct 2026 review): b.i (38%) — marks were lost by integrating in terms of a, b, c instead
// of stating 1; that is a reading/definition slip one sentence fixes, nothing to manipulate. b.ii
// (34%) — the report's losses are rounding c and not finishing the CAS solve after setting up the
// integrals; the setup (each probability is an area with stated terminals) is fully in the working.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const ReflectWidget = lazyWidget(() => import('../interactives/meth-2022e2-q3biii-reflect'))
const QuadrupleWidget = lazyWidget(() => import('../interactives/meth-2022e2-q3ciii-quadruple'))

const EXAM_AI: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was done well. An exact answer was required. Some students rounded their
      answer to 0.0313 or had their technology on the wrong float. 0.3125 was sometimes seen.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      An exact answer was required. Some students rounded their answer to 0.813. Common
      incorrect answers were <Katex tex="\tfrac12" /> or <Katex tex="\tfrac{1}{16}" />.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [14, 36, 50],
  average: 1.4,
  comment: (
    <>
      Many students had the correct denominator but evaluated{' '}
      <Katex tex="\Pr(2\le X\le5)" /> in the numerator. Some rounded their answer to 0.8065
      and others gave exact answers.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [21, 22, 57],
  average: 1.4,
  comment: (
    <>
      Many students were able to find <Katex tex="\mathrm{E}(X)" />. Some wrote down the
      variance instead of the standard deviation.
      <br />
      Common incorrect answers for the standard deviation were{' '}
      <Katex tex="\tfrac{\sqrt5}{4}" /> or 1.118. An exact answer was required.
      <br />
      Some students set up a table of values rather than using the formulas{' '}
      <Katex tex="\mathrm{E}(X)=np" /> and <Katex tex="\mathrm{sd}(X)=\sqrt{np(1-p)}" />. This
      would have been time consuming. Other students found the mean and standard deviation of
      the sample proportion.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Many students gave{' '}
      <Katex tex="\displaystyle\int_{1.5}^{3}f(h)\,dh=\frac{63a}{8}+\frac{27b}{8}+\frac{3c}{2}" /> as
      the answer.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [41, 14, 11, 34],
  average: 1.4,
  comment: (
    <>
      Exact values were required. Some students had <Katex tex="c=-2.783" />. Others set up
      the definite integrals correctly but did not find the answers.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Many students did not attempt it. Some wrote{' '}
      <Katex tex="r=1" /> and <Katex tex="s=3" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      This question was answered well. There were some rounding errors. Some students used
      the formula on the formula sheet but this was not necessary and would have been time
      consuming. Others did not give their answer as an interval.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: <>Common incorrect answers were 0, 10, 11, 50 and 101.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(5,\tfrac12\right) \implies \Pr(X=5) = \left(\tfrac12\right)^5" />,
    reason: <>All five flips must be heads, and each does so with probability <Katex tex="\tfrac12" />, independently. On CAS this is <Cas fn="binomPdf">binomPdf(5, 0.5, 5)</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{1}{32} = 0.03125}" />,
    reason: <>Exact: the exam&apos;s instructions require exact values unless told otherwise. If CAS shows <Katex tex="0.0313" />, change the float setting or ask for the fraction.</>,
    more: (
      <>
        The report also saw <Katex tex="0.3125" />, which has lost a zero. A size check catches that: <Katex tex="\tfrac{1}{32}" /> is about <Katex tex="\tfrac{1}{30}" />, a little
        over <Katex tex="0.03" />, nowhere near <Katex tex="0.3" />.
      </>
    ),
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge2) = 1-\Pr(X=0)-\Pr(X=1)" />,
    reason: <>The complement of &ldquo;at least 2 heads&rdquo; is &ldquo;0 or 1 head&rdquo;: two terms to subtract instead of four (<Katex tex="X=2,3,4,5" />) to add. On CAS: <Cas fn="binomCdf">binomCdf(5, 0.5, 2, 5)</Cas>.</>,
  },
  {
    working: <Katex display tex="= 1-\tfrac{1}{32}-\tfrac{5}{32} = \tfrac{26}{32}" />,
    reason: <><Katex tex="\Pr(X=0)=\left(\tfrac12\right)^5=\tfrac{1}{32}" /> and <Katex tex="\Pr(X=1)=\binom51\left(\tfrac12\right)^5=\tfrac{5}{32}" />: the single head can be any one of the five flips.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{13}{16} = 0.8125}" />,
    reason: <>Exact, as the instructions require (no accuracy is specified).</>,
    more: (
      <>
        The report notes some students rounded to <Katex tex="0.813" />, which is not exact. It lists{' '}
        <Katex tex="\tfrac12" /> as a common incorrect answer: <Katex tex="\tfrac12=\tfrac{16}{32}" /> is{' '}
        <Katex tex="\Pr(X\ge3)" />, which leaves out <Katex tex="X=2" />. &ldquo;At least 2&rdquo; includes 2, so
        on CAS the lower bound is 2, not 3.
      </>
    ),
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge2\mid X<5) = \frac{\Pr(2\le X\le4)}{\Pr(X\le4)}" />,
    reason: <>Conditional probability: <Katex tex="\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}" />. The numerator needs <em>both</em> conditions at once: <Katex tex="X\ge2" /> and <Katex tex="X<5" /> together is <Katex tex="2\le X\le4" />.</>,
    more: (
      <>
        The report notes that many students had the correct denominator but evaluated{' '}
        <Katex tex="\Pr(2\le X\le5)" /> in the numerator. That gives <Katex tex="\tfrac{26}{31}\approx0.839" />. It
        keeps the outcome <Katex tex="X=5" />, but we are told <Katex tex="X<5" />, so five heads cannot have
        happened: the numerator is the overlap of the two events, <Katex tex="A\cap B" />, not <Katex tex="A" /> alone.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(2\le X\le4) = \tfrac{26}{32}-\tfrac{1}{32} = \tfrac{25}{32}" />,
    reason: <>Part a.ii. minus the <Katex tex="X=5" /> term (part a.i.). On CAS: <Cas fn="binomCdf">binomCdf(5, 0.5, 2, 4)</Cas>.</>,
  },
  {
    working: <Katex display tex="\Pr(X\le4) = 1-\tfrac{1}{32} = \tfrac{31}{32}" />,
    reason: <>Everything except all five heads (part a.i.).</>,
  },
  {
    working: <Katex display tex="\frac{25/32}{31/32} = \frac{25}{31} = 0.80645\ldots" />,
    reason: <>The 32s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{0.806}" />,
    reason: <>To three decimal places, as asked.</>,
    more: (
      <>
        When a question names the accuracy, give exactly that: <Katex tex="0.8065" /> has one decimal place too
        many, and the exact <Katex tex="\tfrac{25}{31}" /> is not the three-place decimal that was asked for.
      </>
    ),
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = np = 5\times\tfrac12 = \boxed{2.5}" />,
    reason: <>The binomial mean formula, with <Katex tex="n=5" /> flips and <Katex tex="p=\tfrac12" />.</>,
    more: (
      <>
        The report notes some students set up a table of values instead of using the formulas, which would
        have been time consuming: for a binomial variable, <Katex tex="\mathrm{E}(X)=np" /> and{' '}
        <Katex tex="\mathrm{sd}(X)=\sqrt{np(1-p)}" /> do it in one line. Others found the mean and standard deviation
        of the sample proportion, <Katex tex="\tfrac{X}{5}" /> (mean <Katex tex="\tfrac12" />, standard deviation{' '}
        <Katex tex="\tfrac{\sqrt5}{10}" />). The question asks about <Katex tex="X" />, the <em>number</em> of
        heads.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = np(1-p) = 5\times\tfrac12\times\tfrac12 = \tfrac54" />,
    reason: <>This is the <em>variance</em>. The question asks for the standard deviation, its square root, so one more step is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \sqrt{\tfrac54} = \frac{\sqrt5}{2}}" />,
    reason: <>The root applies to the denominator too: <Katex tex="\sqrt{\tfrac54}=\tfrac{\sqrt5}{\sqrt4}=\tfrac{\sqrt5}{2}" />. Leave it exact.</>,
    more: (
      <>
        The report&apos;s common incorrect answers were <Katex tex="\tfrac{\sqrt5}{4}" />, which takes the root of
        the 5 but not the 4, and <Katex tex="1.118" />, a decimal where an exact answer was required.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{1.5}^{3}f(h)\,dh = \Pr(1.5\le H\le3)" />,
    reason: <>The area under a probability density function between two values is the probability that <Katex tex="H" /> lies between them. <Katex tex="f" /> is zero outside <Katex tex="1.5\le h\le3" />, so this is the <em>whole</em> area under <Katex tex="f" />.</>,
    more: (
      <>
        Every height the coin can reach lies in this interval, so <Katex tex="\Pr(1.5\le H\le3)" /> is the
        probability of something certain.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\int_{1.5}^{3}f(h)\,dh = 1}" />,
    reason: <>The total area under any probability density function is 1. &ldquo;State&rdquo; signals that no integration is needed.</>,
    more: (
      <>
        The report notes that many students gave{' '}
        <Katex tex="\tfrac{63a}{8}+\tfrac{27b}{8}+\tfrac{3c}{2}" /> as the answer. That is the integral worked out in
        terms of <Katex tex="a,b,c" />, which is not its value: it is the left side of the first equation in part
        b.ii. The value is 1 because <Katex tex="f" /> is a density, whatever <Katex tex="a" />, <Katex tex="b" />{' '}
        and <Katex tex="c" /> turn out to be.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{1.5}^{3}\left(ah^2+bh+c\right)dh = 1" />,
    reason: <>Three unknowns, so three equations are needed, and each piece of information about probability is an area under <Katex tex="f" />. The first is part b.i.: the total area is 1.</>,
  },
  {
    working: <Katex display tex="\Pr(H\le2) = \int_{1.5}^{2}\left(ah^2+bh+c\right)dh = 0.35" />,
    reason: <>The second. <Katex tex="f" /> is zero below <Katex tex="h=1.5" />, so the area &ldquo;up to 2&rdquo; starts at 1.5, not at 0.</>,
  },
  {
    working: <Katex display tex="\Pr(H\ge2.5) = \int_{2.5}^{3}\left(ah^2+bh+c\right)dh = 0.25" />,
    reason: <>The third. This is the <em>upper</em> tail, so the terminals run from 2.5 to the end of the domain, 3.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\tfrac{63}{8}a+\tfrac{27}{8}b+\tfrac32c&=1\\[2pt]\tfrac{37}{24}a+\tfrac78b+\tfrac12c&=0.35\\[2pt]\tfrac{91}{24}a+\tfrac{11}{8}b+\tfrac12c&=0.25\end{aligned}"
      />
    ),
    reason: <>Each integral evaluated: antidifferentiate to <Katex tex="\tfrac{ah^3}{3}+\tfrac{bh^2}{2}+ch" /> and substitute the terminals (CAS does this for you).</>,
    more: (
      <>
        Writing these out is optional on Exam 2, since CAS can solve the integral forms directly. They show what
        the problem really is: three simultaneous linear equations in <Katex tex="a" />, <Katex tex="b" /> and{' '}
        <Katex tex="c" />.
      </>
    ),
  },
  {
    working: <Cas fn="solve">solve(eq1 and eq2 and eq3, {'{'}a, b, c{'}'})</Cas>,
    reason: <>Type the three equations (the integral forms are fine) joined with &ldquo;and&rdquo;, and solve for all three unknowns at once.</>,
    more: (
      <>
        The report notes some students set up the definite integrals correctly but did not find the answers.
        Setting up is not the end: this one command finishes the question.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = -\tfrac45, \quad b = \tfrac{17}{5}, \quad c = -\tfrac{167}{60}}" />,
    reason: <>Exact values were required: <Katex tex="c=-\tfrac{167}{60}" />, not the decimal <Katex tex="-2.78\dot3" />.</>,
    more: (
      <>
        The report notes some students had <Katex tex="c=-2.783" />, a rounded decimal. Check that this{' '}
        <Katex tex="f" /> is a valid density: <Katex tex="f(1.5)=\tfrac{31}{60}" /> and{' '}
        <Katex tex="f(3)=\tfrac{13}{60}" /> are positive, and a parabola with <Katex tex="a<0" /> is lowest at an
        endpoint of the interval, so <Katex tex="f\ge0" /> on <Katex tex="[1.5,3]" />.
      </>
    ),
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="d = 3-h \implies h = 3-d" />,
    reason: <>The coin is closest to the ceiling at the top of its flight, when it is <Katex tex="h" /> m above the floor. The ceiling is 3 m up, so the minimum gap is <Katex tex="3-h" />. The input of <Katex tex="f" /> is a height, so rearrange to get the height in terms of <Katex tex="d" />.</>,
    more: (
      <>
        The report notes that many students did not attempt this part. The way in is the context, not the
        algebra: sketch the room, mark <Katex tex="h" /> up from the floor and <Katex tex="d" /> down from the
        3 m ceiling, and the two lengths add to 3. Once the new quantity (the gap) is linked to the old one (the
        height), the rest is substitution.
      </>
    ),
  },
  {
    working: <Katex display tex="g(d) = f(3-d) = f(-d+3)" />,
    reason: <>A gap of <Katex tex="d" /> happens exactly when the height is <Katex tex="3-d" />, so the density for the gap at <Katex tex="d" /> is the density for the height at <Katex tex="3-d" />.</>,
    more: (
      <>
        Writing <Katex tex="3-d" /> as <Katex tex="-d+3" /> puts it in the form <Katex tex="rd+s" /> that the
        question uses.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{r = -1, \quad s = 3}" />,
    reason: <>Matching <Katex tex="f(-d+3)" /> with <Katex tex="f(rd+s)" />. The <em>negative</em> <Katex tex="r" /> matters: a higher flip means a smaller gap.</>,
    more: (
      <>
        <p>
          The report notes some students wrote <Katex tex="r=1" /> and <Katex tex="s=3" />. That gives{' '}
          <Katex tex="f(d+3)" />, which is non-zero only for <Katex tex="-1.5\le d\le0" />: negative distances. It
          also keeps <Katex tex="f" />&apos;s left-to-right order, as if a higher flip left a bigger gap.
        </p>
        <p>
          As a transformation, <Katex tex="f(-d+3)=f(-(d-3))" /> reflects the graph of <Katex tex="f" /> in the
          vertical axis and then translates it 3 units right: together, a reflection in the line{' '}
          <Katex tex="h=1.5" />, which carries <Katex tex="1.5\le h\le3" /> onto <Katex tex="0\le d\le1.5" />. Those
          are sensible distances, and a reflection keeps the total area at 1.
        </p>
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{gathered}\hat P = \frac{\text{number of heads}}{25}\\[2pt] \text{number of heads} \in \{0,1,\ldots,25\}\end{gathered}"
      />
    ),
    reason: <>A count of heads divided by the fixed sample size, 25.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{Discrete: } \hat P \text{ can only take the 26 values}\\ 0,\ \tfrac{1}{25},\ \tfrac{2}{25},\ \ldots,\ 1\end{gathered}}"
      />
    ),
    reason: <>A discrete random variable takes separate values you can list (count); a continuous one can take any value in an interval. <Katex tex="\hat P" /> can never be, say, <Katex tex="0.41" />, so it is discrete.</>,
    more: <>The question says &ldquo;justify&rdquo;, so &ldquo;discrete&rdquo; on its own is not enough: the reason (the values can be listed) is needed for the mark.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = 0.4, \ n = 25 \implies x = 0.4\times25 = 10 \text{ heads}" />,
    reason: <>On CAS use <b>1-Prop z Interval</b> (menu → Statistics → Confidence Intervals), which asks for the number of successes <Katex tex="x" /> and <Katex tex="n" /> rather than <Katex tex="\hat p" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{gathered}x=10,\ n=25,\ \text{C Level}=0.95\\ \implies (0.20796\ldots,\ 0.59204\ldots)\end{gathered}"
      />
    ),
    reason: <>The CAS output.</>,
    more: (
      <>
        It is the formula-sheet interval{' '}
        <Katex tex="\hat p\pm1.96\sqrt{\tfrac{\hat p(1-\hat p)}{n}}=0.4\pm1.96\sqrt{\tfrac{0.4\times0.6}{25}}=0.4\pm0.192" />.
        Working through that formula by hand is a check, not the method: for a one-mark question, CAS is much
        quicker.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(0.208,\ 0.592)}" />,
    reason: <>To three decimal places, and written as an <em>interval</em>.</>,
    more: (
      <>
        Round each endpoint on its own: <Katex tex="0.20796\ldots\to0.208" /> and{' '}
        <Katex tex="0.59204\ldots\to0.592" />. The report notes some rounding errors, and that some students did
        not give their answer as an interval: the answer is the pair of endpoints, written in brackets.
      </>
    ),
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{width} &= 2\times1.96\sqrt{\frac{0.4\times0.6}{n}} = \frac{k}{\sqrt n}\\[2pt] \text{where } k &= 2\times1.96\sqrt{0.24}\end{aligned}"
      />
    ),
    reason: <>The interval is <Katex tex="\hat p\pm1.96\sqrt{\tfrac{\hat p(1-\hat p)}{n}}" />, so its width is twice the part after the <Katex tex="\pm" />. With <Katex tex="\hat p=0.4" /> fixed, only <Katex tex="n" /> changes; call the fixed part <Katex tex="k" />.</>,
    more: (
      <>
        Notice where <Katex tex="n" /> sits: under a square root, in the denominator.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{k}{\sqrt n} = \frac12\times\frac{k}{\sqrt{25}} \implies \sqrt n = 2\sqrt{25} = 10" />,
    reason: <>Set the new width equal to half the part c.ii. width (<Katex tex="n=25" />). The <Katex tex="k" /> cancels, so halving the width means <em>doubling</em> <Katex tex="\sqrt n" />.</>,
    more: (
      <>
        Doubling <Katex tex="\sqrt n" /> multiplies <Katex tex="n" /> by <Katex tex="2^2=4" />, not 2. Doubling the
        flips to <Katex tex="n=50" />, one of the report&apos;s common incorrect answers, only shrinks the width to{' '}
        <Katex tex="\tfrac{1}{\sqrt2}\approx71\%" /> of what it was.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{n = 10^2 = 100}" />,
    reason: <>Square <Katex tex="\sqrt n=10" /> to get <Katex tex="n" />.</>,
    more: (
      <>
        Check: <Katex tex="1.96\sqrt{\tfrac{0.24}{100}}=0.0960" />, exactly half of <Katex tex="0.1920" />. Two more of
        the report&apos;s common incorrect answers can be traced: <Katex tex="10" /> is <Katex tex="\sqrt n" />, not{' '}
        <Katex tex="n" />, and <Katex tex="101" /> probably comes from the rounded interval, since{' '}
        <Katex tex="0.592-0.208=0.384" /> leads to <Katex tex="n\approx100.04" />, which rounds up to 101. Work from
        the exact relationship instead.
      </>
    ),
  },
]

export default function MethodsQ3_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (14 marks)</p>
        <p>
          Mika is flipping a coin. The unbiased coin has a probability of{' '}
          <Katex tex="\tfrac12" /> of landing on heads and <Katex tex="\tfrac12" /> of
          landing on tails.
          <br />
          Let <Katex tex="X" /> be the binomial random variable representing the number of
          times that the coin lands on heads.
          <br />
          Mika flips the coin five times.
        </p>
      </div>

      <PartCard letter="a.i" topic="Binomial Distribution" marks={1} statement={<>Find <Katex tex="\Pr(X=5)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" topic="Binomial Distribution" marks={1} statement={<>Find <Katex tex="\Pr(X\ge2)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Conditional Binomial"
        marks={2}
        statement={
          <>
            Find <Katex tex="\Pr(X\ge2\mid X<5)" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="a.iv"
        topic="Mean & SD"
        marks={2}
        statement={
          <>
            Find the expected value and the standard deviation for <Katex tex="X" />.
          </>
        }
        examinerReport={EXAM_AIV}
      >
        <WorkingTable rows={ROWS_AIV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The height reached by each of Mika's coin flips is given by a continuous random
          variable, <Katex tex="H" />, with the probability density function
        </p>
        <p className="py-1">
          <Katex
            display
            tex="f(h)=\begin{cases}ah^2+bh+c & 1.5\le h\le3\\[4pt] 0 & \text{elsewhere}\end{cases}"
          />
        </p>
        <p>
          where <Katex tex="h" /> is the vertical height reached by the coin flip, in metres,
          between the coin and the floor, and <Katex tex="a" />, <Katex tex="b" /> and{' '}
          <Katex tex="c" /> are real constants.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            State the value of the definite integral{' '}
            <Katex tex="\displaystyle\int_{1.5}^{3}f(h)\,dh" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Find Parameters"
        marks={3}
        statement={
          <>
            Given that <Katex tex="\Pr(H\le2)=0.35" /> and <Katex tex="\Pr(H\ge2.5)=0.25" />,
            find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Transformed PDF"
        marks={1}
        statement={
          <>
            The ceiling of Mika's room is 3 m above the floor. The minimum distance between
            the coin and the ceiling is a continuous random variable, <Katex tex="D" />, with
            probability density function <Katex tex="g" />.
            <br />
            The function <Katex tex="g" /> is a transformation of the function{' '}
            <Katex tex="f" /> given by <Katex tex="g(d)=f(rd+s)" />, where <Katex tex="d" /> is
            the minimum distance between the coin and the ceiling, and <Katex tex="r" /> and{' '}
            <Katex tex="s" /> are real constants.
            <br />
            Find the values of <Katex tex="r" /> and <Katex tex="s" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
        <Explore title="A higher flip means a smaller gap, so g is f reflected">
          <ReflectWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Mika's sister Bella also has a coin. On each flip, Bella's coin has a probability
          of <Katex tex="p" /> of landing on heads and <Katex tex="(1-p)" /> of landing on
          tails, where <Katex tex="p" /> is a constant value between 0 and 1.
          <br />
          Bella flips her coin 25 times in order to estimate <Katex tex="p" />.
          <br />
          Let <Katex tex="\hat P" /> be the random variable
          representing the proportion of times that Bella's coin lands on heads in her
          sample.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Sample Proportion"
        marks={1}
        statement={
          <>
            Is the random variable <Katex tex="\hat P" /> discrete or continuous? Justify
            your answer.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            If <Katex tex="\hat p=0.4" />, find an approximate 95% confidence interval for{' '}
            <Katex tex="p" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Sample Size"
        marks={1}
        statement={
          <>
            Bella knows that she can decrease the width of a 95% confidence interval by using a
            larger sample of coin flips.
            <br />
            If <Katex tex="\hat p=0.4" />, how many coin flips would be required to halve the
            width of the confidence interval found in part c.ii.?
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
        <Explore title="Halving the width takes four times the flips">
          <QuadrupleWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
