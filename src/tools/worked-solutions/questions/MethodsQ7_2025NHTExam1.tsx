// 2025 Mathematical Methods NHT — Exam 1, Question 7 (7 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = x² + bx − 6: a. the roots differ by 5 (√(b² + 24) = 5, b = ±1); b.i. why f restricted to
// (0, ∞) has no inverse when b < 0 (the turning point x = −b/2 lies inside); b.ii. the inverse of
// f on (−∞, 0), taking the negative branch of the square root; c. the b for which g∘f, with
// g(x) = log_e(−x − 2), has maximal domain (−2, 2). Question text transcribed from the original
// paper (read from the page images — the 2025 paper has no text layer). The b.i. graph (drawn for
// b = −4) is this site's own explanatory figure (matplotlib), not VCAA's. Answers checked with
// sympy and against the VCAA report's sample answers (b = ±1; f⁻¹(x) = −b/2 − √(x + (b² + 24)/4),
// x > −6; b = 0). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2025nhte1-q7bi-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: <>There were multiple methods that students could use for this question.</>,
}

const REPORT_BI: SAExaminerStats = {
  comment: (
    <>
      This question required students to explain why the particular function <Katex tex="f" /> does not have an inverse
      function when restricted to the domain <Katex tex="(0,\infty)" />. The explanation needed to include the fact that the
      turning point lies in the interval <Katex tex="(0,\infty)" /> and thus the function is not one-to-one (or is
      many-to-one).
      <br />
      Alternatively, a diagram may be utilised to explain that <Katex tex="f(x)" /> is many-to-one over{' '}
      <Katex tex="x\in(0,\infty)" />, and therefore the inverse does not exist.
    </>
  ),
}

const REPORT_BII: SAExaminerStats = {
  comment: (
    <>
      There were multiple methods that could be employed to find the inverse function. It was important to note that the
      domain was restricted to <Katex tex="(-\infty,0)" />, as this affected the choice of the branch of the square root in the
      inverse function. Common methods included completing the square or using the quadratic formula.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      There were multiple ways in which this question could be explored. For these types of questions, students are
      encouraged to sketch a graph to assist in developing their solutions.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+bx-6=0 \implies x=\frac{-b\pm\sqrt{b^2+24}}{2}" />,
    reason: <>
      Quadratic formula with <Katex tex="a=1" />, <Katex tex="c=-6" />: the discriminant is{' '}
      <Katex tex="b^2-4(1)(-6)=b^2+24" />. It is always positive, so there are always two solutions, whatever <Katex tex="b" /> is.
    </>,
  },
  {
    working: <Katex display tex="\frac{-b+\sqrt{b^2+24}}{2}-\frac{-b-\sqrt{b^2+24}}{2}=\sqrt{b^2+24}" />,
    reason: <>Larger solution minus smaller. The <Katex tex="-\tfrac b2" /> parts cancel, leaving twice <Katex tex="\tfrac{\sqrt{b^2+24}}{2}" />.</>,
    more: <>In general the two roots of a quadratic sit symmetrically either side of the axis of symmetry, each <Katex tex="\tfrac{\sqrt\Delta}{2a}" /> away, so their distance apart is <Katex tex="\tfrac{\sqrt\Delta}{a}" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{b^2+24}=5 \implies b^2+24=25 \implies b^2=1" />,
    reason: <>Set the difference equal to 5 and square both sides (both are positive).</>,
  },
  {
    working: <Katex display tex="\boxed{b=-1\ \text{or}\ b=1}" />,
    reason: <>
      Both signs work. Check: <Katex tex="b=1" /> gives <Katex tex="x^2+x-6=(x+3)(x-2)" />, roots <Katex tex="-3" /> and{' '}
      <Katex tex="2" />, a difference of 5 ✓; <Katex tex="b=-1" /> gives <Katex tex="(x-3)(x+2)" />, roots <Katex tex="3" /> and{' '}
      <Katex tex="-2" /> ✓.
    </>,
    more: <>
      Another route the report shows: call the roots <Katex tex="\alpha" /> and <Katex tex="\alpha-5" />. Their product is the
      constant term, <Katex tex="\alpha(\alpha-5)=-6" />, so <Katex tex="\alpha^2-5\alpha+6=0" /> and <Katex tex="\alpha=2" /> or{' '}
      <Katex tex="3" />, giving the two factorisations above.
    </>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Turning point at } x=-\frac b2" />,
    reason: <>
      An upright parabola <Katex tex="x^2+bx+c" /> has its axis of symmetry at <Katex tex="x=-\tfrac{b}{2}" /> (from{' '}
      <Katex tex="f'(x)=2x+b=0" />, or completing the square).
    </>,
  },
  {
    working: <Katex display tex="b<0 \implies -\frac b2>0" />,
    reason: <>A negative number divided by <Katex tex="-2" /> is positive, so the turning point lies inside the interval <Katex tex="(0,\infty)" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-3">
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="This site's own graph of f(x) = x² − 4x − 6 (b = −4): the part with x > 0 drawn solid, starting from an open circle at (0, −6), falling to the turning point at x = 2 and rising again; the horizontal line y = −8 cuts this part twice"
            className="w-full max-w-[360px]"
          />
        </div>
        <span>
          The turning point lies in <Katex tex="(0,\infty)" />, so <Katex tex="f" /> is many-to-one (not one-to-one) there,
          and so an inverse function does not exist.
        </span>
      </div>
    ),
    reason: <>
      A function has an inverse only if it is one-to-one. Restricted to <Katex tex="(0,\infty)" />, <Katex tex="f" /> falls to the
      turning point and then rises, so some horizontal lines cross it twice: two <Katex tex="x" />-values share a{' '}
      <Katex tex="y" />-value, and the inverse wouldn&apos;t know which to send that <Katex tex="y" /> back to.
    </>,
    more: <>
      The graph is drawn for <Katex tex="b=-4" />, where the turning point is at <Katex tex="x=2" /> and{' '}
      <Katex tex="y=-8" /> meets the curve at <Katex tex="x=2\pm\sqrt2" />, both positive. Any negative <Katex tex="b" /> gives the
      same picture with the turning point somewhere else to the right of the <Katex tex="y" />-axis. The report also accepts a
      diagram like this as the explanation.
    </>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Inverse: } x=y^2+by-6" />,
    reason: <>
      On <Katex tex="(-\infty,0)" /> the whole domain lies left of the turning point <Katex tex="x=-\tfrac b2>0" />, so{' '}
      <Katex tex="f" /> is strictly decreasing there and one-to-one: the inverse exists. Swap <Katex tex="x" /> and{' '}
      <Katex tex="y" /> and solve for <Katex tex="y" />.
    </>,
  },
  {
    working: <Katex display tex="x=\left(y+\frac b2\right)^2-\frac{b^2+24}{4}" />,
    reason: <>Complete the square: <Katex tex="y^2+by=\left(y+\tfrac b2\right)^2-\tfrac{b^2}{4}" />, and <Katex tex="-\tfrac{b^2}{4}-6=-\tfrac{b^2+24}{4}" />.</>,
  },
  {
    working: <Katex display tex="y+\frac b2=\pm\sqrt{x+\frac{b^2+24}{4}}" />,
    reason: <>Move the constant across and take the square root: both signs for now.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &y<0 \text{ and } \frac b2<0 \implies y+\frac b2<0 \\ &\implies \text{take the negative root} \end{aligned}" />,
    reason: <>
      The range of <Katex tex="f^{-1}" /> is the domain of <Katex tex="f" />, <Katex tex="(-\infty,0)" />, so <Katex tex="y<0" />.
      Adding the negative <Katex tex="\tfrac b2" /> keeps it negative, so <Katex tex="y+\tfrac b2" /> equals the{' '}
      <b>negative</b> square root.
    </>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x)=-\frac b2-\sqrt{x+\frac{b^2+24}{4}}}" />,
    reason: <>
      Equivalently <Katex tex="f^{-1}(x)=-\tfrac12\left(b+\sqrt{b^2+4x+24}\right)" />, the quadratic-formula form the report also
      gives. Its domain is the range of <Katex tex="f" /> on <Katex tex="(-\infty,0)" />, which is <Katex tex="(-6,\infty)" />:
      as <Katex tex="x" /> runs from <Katex tex="-\infty" /> up to 0, <Katex tex="f(x)" /> falls from <Katex tex="\infty" /> towards{' '}
      <Katex tex="f(0)=-6" />, which is not reached since 0 is excluded.
    </>,
    more: <>
      Check the branch with <Katex tex="b=-3" />:{' '}
      <Katex tex="f^{-1}(0)=\tfrac32-\tfrac{\sqrt{33}}{2}\approx-1.37" />, negative as it must be, and{' '}
      <Katex tex="f(-1.37)\approx1.88+4.11-6\approx0" /> ✓.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g(f(x))&=\log_e\!\left(-f(x)-2\right) \\ &=\log_e\!\left(-x^2-bx+4\right) \end{aligned}" />,
    reason: <>Substitute <Katex tex="f(x)" /> for the <Katex tex="x" /> in <Katex tex="g" />: <Katex tex="-\left(x^2+bx-6\right)-2=-x^2-bx+4" />.</>,
  },
  {
    working: <Katex display tex="-x^2-bx+4>0 \iff x^2+bx-4<0" />,
    reason: <>
      A log is defined only for a positive argument. (Equivalently: <Katex tex="g" /> needs <Katex tex="-x-2>0" />, so{' '}
      <Katex tex="f(x)<-2" />.) Multiply by <Katex tex="-1" /> and reverse the inequality.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x^2+bx-4<0 \text{ exactly on } (-2,2) \\ &\implies x^2+bx-4=(x+2)(x-2) \end{aligned}" />,
    reason: <>
      An upright parabola is negative exactly between its two roots. For that interval to be <Katex tex="(-2,2)" />, the roots
      must be <Katex tex="-2" /> and <Katex tex="2" />.
    </>,
  },
  {
    working: <Katex display tex="(x+2)(x-2)=x^2-4 \implies \boxed{b=0}" />,
    reason: <>
      Compare the <Katex tex="x" /> coefficients. Check: with <Katex tex="b=0" />, <Katex tex="-x^2+4>0 \iff x^2<4 \iff -2<x<2" /> ✓.
      The constant term <Katex tex="-4" /> already matches, which is why the question has an answer at all.
    </>,
    more: <>
      Part c. allows any real <Katex tex="b" />; the condition <Katex tex="b<0" /> belonged to part b. only. A sketch shows the
      same thing: <Katex tex="y=f(x)" /> must lie below <Katex tex="y=-2" /> exactly on <Katex tex="(-2,2)" />, so{' '}
      <Katex tex="f(-2)=f(2)=-2" />, and a parabola taking equal values at <Katex tex="\pm2" /> is symmetric about the{' '}
      <Katex tex="y" />-axis, so <Katex tex="b=0" />.
    </>,
  },
]

export default function MethodsQ7_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (7 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=x^2+bx-6" />, where <Katex tex="b\in R" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Quadratic Roots"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="b" /> for which the two solutions of <Katex tex="f(x)=0" /> have a difference of 5.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Let <Katex tex="b<0" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Existence of Inverse"
        marks={1}
        statement={
          <>
            Explain why an inverse function does not exist when <Katex tex="f" /> is restricted to the domain{' '}
            <Katex tex="(0,\infty)" />.
          </>
        }
        examinerReport={REPORT_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Inverse Function"
        marks={2}
        statement={
          <>
            Find a rule for the inverse function of <Katex tex="f" /> when <Katex tex="f" /> is restricted to the domain{' '}
            <Katex tex="(-\infty,0)" />.
          </>
        }
        examinerReport={REPORT_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <WrongMethod
          title="Take the positive square root"
          working={<Katex display tex="f^{-1}(x)=-\frac b2+\sqrt{x+\frac{b^2+24}{4}}" />}
        >
          This is the inverse of the <b>other</b> half of the parabola, the part right of the turning point. Its outputs are
          all at least <Katex tex="-\tfrac b2>0" />, so they can&apos;t be <Katex tex="x" />-values from <Katex tex="(-\infty,0)" />.
          The restricted domain of <Katex tex="f" /> decides the sign, as the report stresses.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Composite Domain"
        marks={2}
        statement={
          <>
            Let <Katex tex="g" /> be a function with maximal domain and the rule <Katex tex="g(x)=\log_e(-x-2)" />.
            <br />
            Find the value of <Katex tex="b" /> for which the maximal domain of the composite function{' '}
            <Katex tex="g\circ f" /> is <Katex tex="(-2,2)" />.
          </>
        }
        examinerReport={REPORT_C}
      >
        <Background>
          <p>
            The maximal domain of <Katex tex="g\circ f" /> is every <Katex tex="x" /> in the domain of <Katex tex="f" /> for which{' '}
            <Katex tex="f(x)" /> lands in the domain of <Katex tex="g" />. Here <Katex tex="f" /> is defined everywhere, and{' '}
            <Katex tex="g" /> needs a positive log argument, <Katex tex="-x-2>0" />, i.e. an input less than <Katex tex="-2" />.
            So the domain of <Katex tex="g\circ f" /> is where <Katex tex="f(x)<-2" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
