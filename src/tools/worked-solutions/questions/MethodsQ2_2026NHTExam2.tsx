// 2026 Mathematical Methods NHT — Exam 2, Section B Question 2 (15 marks). The NHT report gives
// sample answers only, with no statistics. f(x) = x/(x² + 1): stationary points, the area from
// x = −1 to 1 (split at the origin because the curve changes sign), tangents at the origin and with
// gradient −1/8, a show-that for the average rate of change over [a, b] and its use to solve
// f(a) = f(b), then the family g(x) = x/(x² + k): stationary points, when g is decreasing for
// x ≥ 1, and the area between g and the line through its stationary points (log_e(2) − 1/2 for
// every k). Question text transcribed from the original paper; the graph of f is cropped from the
// original VCAA exam PDF. The figure in part f.iii. is this site's own explanatory graph (k = 1),
// something VCAA never printed. Answers checked with sympy and against the VCAA report's sample
// answers: a. (−1, −1/2), (1, 1/2); b. log_e(2); c. y = x; d. y = −x/8 ∓ 3√3/8; e.ii. a = 1/b;
// f.i. ±√k; f.ii. 0 < k ≤ 1; f.iii. log_e(2) − 1/2. The WrongMethod in b. (integrating straight
// across gives 0) is a verified slip, not taken from the report, which has no comments. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2026nhte2-q2-graph.png'
import regionSrc from './meth-2026nhte2-q2fiii-region.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{(x^2+1)(1) - x(2x)}{(x^2+1)^2} = \frac{1-x^2}{(x^2+1)^2}" />,
    reason: <><Katex tex="f" /> is a quotient, so use <Katex tex="\left(\tfrac uv\right)'=\tfrac{u'v-uv'}{v^2}" /> with <Katex tex="u=x" />, <Katex tex="v=x^2+1" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0 \ \Rightarrow\ 1 - x^2 = 0 \ \Rightarrow\ x = \pm1" />,
    reason: <>A fraction is zero only when its numerator is; the denominator is never zero.</>,
  },
  {
    working: <Katex display tex="f(1) = \tfrac12, \qquad f(-1) = -\tfrac12" />,
  },
  {
    working: <Katex display tex="\boxed{(-1, -\tfrac12) \text{ and } (1, \tfrac12)}" />,
    reason: <>A local minimum and a local maximum, matching the graph: the trough is left of the origin and the peak right of it, at the same height either side.</>,
    more: <>With only one mark, VCAA expects these to be read straight from CAS or a quick derivative; the derivative is shown because parts c. and d. need it anyway.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A = -\int_{-1}^{0} f(x)\,dx + \int_{0}^{1} f(x)\,dx" />,
    reason: <>The curve is below the <Katex tex="x" />-axis on <Katex tex="[-1,0]" /> and above it on <Katex tex="[0,1]" />. An integral counts area below the axis as negative, so split at the <Katex tex="x" />-intercept and negate the left piece.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{0}^{1} \frac{x}{x^2+1}\,dx" />,
    reason: <><Katex tex="f(-x)=-f(x)" />, so <Katex tex="f" /> is odd: its graph has point symmetry about the origin, and the two regions have equal area.</>,
  },
  {
    working: <Katex display tex="= \Big[\log_e(x^2+1)\Big]_0^1" />,
    reason: <>The numerator <Katex tex="x" /> is half the derivative of the denominator <Katex tex="x^2+1" />, so this is the <Katex tex="\tfrac{f'}{f}" /> form: <Katex tex="\int\tfrac{x}{x^2+1}dx=\tfrac12\log_e(x^2+1)" />. The factor 2 cancels the <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="= \log_e(2) - \log_e(1)" />,
  },
  {
    working: <Katex display tex="\boxed{\log_e(2)}" />,
    reason: <>Exact, as the instructions require when no rounding is asked for. Sanity check: <Katex tex="\log_e(2)\approx0.69" />, and the region is two humps about 1 wide and at most <Katex tex="\tfrac12" /> tall, so a total under 1 is right.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(0) = \frac{1-0}{(0+1)^2} = 1" />,
    reason: <>The gradient at the origin, from <Katex tex="f'(x)" /> in part a.</>,
  },
  {
    working: <Katex display tex="y - 0 = 1(x - 0)" />,
    reason: <>The point is <Katex tex="(0,0)" />, since <Katex tex="f(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x}" />,
    reason: <>Matches the graph: through the origin the curve climbs at roughly 45°.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-x^2}{(x^2+1)^2} = -\frac18" />,
    reason: <>Tangents with gradient <Katex tex="-\tfrac18" /> touch the curve where <Katex tex="f'(x)=-\tfrac18" />.</>,
    more: <>On CAS: <Cas fn="solve">solve(d/dx(f(x)) = −1/8, x)</Cas></>,
  },
  {
    working: <Katex display tex="\begin{aligned} 8(1-x^2) &= -(x^2+1)^2 \\ x^4 - 6x^2 + 9 &= 0 \\ (x^2-3)^2 &= 0 \end{aligned}" />,
    reason: <>By hand: cross-multiply and expand <Katex tex="(x^2+1)^2=x^4+2x^2+1" />. The quartic is a perfect square in <Katex tex="x^2" />.</>,
  },
  {
    working: <Katex display tex="x = \pm\sqrt3, \qquad f(\pm\sqrt3) = \pm\frac{\sqrt3}{4}" />,
    reason: <>Two points, symmetric about the origin, since <Katex tex="f" /> is odd.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=\sqrt3:&\quad y - \tfrac{\sqrt3}{4} = -\tfrac18\left(x - \sqrt3\right) \\ x=-\sqrt3:&\quad y + \tfrac{\sqrt3}{4} = -\tfrac18\left(x + \sqrt3\right) \end{aligned}" />,
    reason: <>Point-gradient form <Katex tex="y-y_1=m(x-x_1)" /> at each point.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac18x + \frac{3\sqrt3}{8} \ \text{ and } \ y = -\frac18x - \frac{3\sqrt3}{8}}" />,
    reason: <>Expanding: <Katex tex="\tfrac{\sqrt3}{8}+\tfrac{\sqrt3}{4}=\tfrac{3\sqrt3}{8}" />. Both lines are needed for the two marks.</>,
    more: <>Sanity check: the curve is falling gently for <Katex tex="x>1" /> and <Katex tex="x<-1" />, which is where a small negative gradient like <Katex tex="-\tfrac18" /> belongs, and <Katex tex="\sqrt3\approx1.73" /> is out there.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{f(b)-f(a)}{b-a} = \frac{1}{b-a}\left(\frac{b}{b^2+1} - \frac{a}{a^2+1}\right)" />,
    reason: <>The average rate of change over <Katex tex="[a,b]" /> is the gradient of the chord: rise over run.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{b-a}\cdot\frac{b(a^2+1) - a(b^2+1)}{(a^2+1)(b^2+1)}" />,
    reason: <>Put the two fractions over the common denominator <Katex tex="(a^2+1)(b^2+1)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{b-a}\cdot\frac{a^2b - ab^2 + b - a}{(a^2+1)(b^2+1)}" />,
  },
  {
    working: <Katex display tex="= \frac{1}{b-a}\cdot\frac{ab(a-b) + (b-a)}{(a^2+1)(b^2+1)}" />,
    reason: <>Group the terms: <Katex tex="a^2b-ab^2=ab(a-b)" />. The aim is a factor of <Katex tex="b-a" /> to cancel the one outside.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{b-a}\cdot\frac{(b-a)(1-ab)}{(a^2+1)(b^2+1)}" />,
    reason: <><Katex tex="ab(a-b)=-ab(b-a)" />, so <Katex tex="b-a" /> is a common factor: <Katex tex="(b-a)(-ab+1)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{1-ab}{(a^2+1)(b^2+1)}" />,
    reason: <>Cancel <Katex tex="b-a" />, which is not zero because <Katex tex="a<b" />. As required.</>,
    more: <>&ldquo;Using algebra&rdquo; means every line must be shown; a CAS simplification alone would not earn the marks.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="f(a) = f(b) \ \Leftrightarrow\ \frac{f(b)-f(a)}{b-a} = 0" />,
    reason: <>Equal heights at <Katex tex="a" /> and <Katex tex="b" /> means the chord is horizontal: average rate of change zero. This is the &ldquo;hence&rdquo;.</>,
  },
  {
    working: <Katex display tex="\frac{1-ab}{(a^2+1)(b^2+1)} = 0 \ \Rightarrow\ 1 - ab = 0" />,
    reason: <>The denominator is always positive, so only the numerator can be zero.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac1b}" />,
    reason: <>Solving <Katex tex="f(a)=f(b)" /> directly on CAS gives <Katex tex="a=\tfrac1b" /> or <Katex tex="a=b" />; the second is rejected because <Katex tex="a<b" />.</>,
    more: <>For <Katex tex="a=\tfrac1b" /> to be less than <Katex tex="b" />, <Katex tex="b" /> must be greater than 1. That makes sense on the graph: a horizontal line meets the right half of the curve once either side of the peak at <Katex tex="x=1" />, at <Katex tex="x=\tfrac1b" /> and <Katex tex="x=b" />. Check with <Katex tex="b=2" />: <Katex tex="f(2)=\tfrac25" /> and <Katex tex="f(\tfrac12)=\tfrac{1/2}{5/4}=\tfrac25" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = \frac{(x^2+k)(1) - x(2x)}{(x^2+k)^2} = \frac{k-x^2}{(x^2+k)^2}" />,
    reason: <>The same quotient rule as part a., with <Katex tex="k" /> in place of 1.</>,
  },
  {
    working: <Katex display tex="g'(x) = 0 \ \Rightarrow\ x^2 = k" />,
    reason: <>The denominator is positive because <Katex tex="k>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \pm\sqrt k}" />,
    reason: <>Real because <Katex tex="k>0" />. With <Katex tex="k=1" /> this gives <Katex tex="\pm1" />, agreeing with part a.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) < 0 \ \Leftrightarrow\ x^2 > k \ \Leftrightarrow\ x > \sqrt k \ \text{ (for } x > 0)" />,
    reason: <>The sign of <Katex tex="g'" /> is the sign of <Katex tex="k-x^2" />. Like <Katex tex="f" />, <Katex tex="g" /> has a local maximum at <Katex tex="x=\sqrt k" /> and decreases to the right of it.</>,
  },
  {
    working: <Katex display tex="\sqrt k \le 1 \ \Rightarrow\ k \le 1" />,
    reason: <>For <Katex tex="g" /> to be strictly decreasing on all of <Katex tex="[1,\infty)" />, the peak at <Katex tex="x=\sqrt k" /> can&apos;t be to the right of 1. It may sit exactly at 1: a function is still strictly decreasing on an interval that starts at its maximum.</>,
    more: <>VCAA&apos;s reasoning: <Katex tex="g" /> must not have a turning point where <Katex tex="x>1" />. If <Katex tex="\sqrt k>1" />, then <Katex tex="g" /> is still rising between 1 and <Katex tex="\sqrt k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0 < k \le 1}" />,
    reason: <>Combined with the given <Katex tex="k\in(0,\infty)" />. Include <Katex tex="k=1" />, with <Katex tex="\le" />.</>,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\sqrt k, \tfrac{1}{2\sqrt k}\right), \quad \left(-\sqrt k, -\tfrac{1}{2\sqrt k}\right)" />,
    reason: <><Katex tex="g(\sqrt k)=\tfrac{\sqrt k}{k+k}=\tfrac{1}{2\sqrt k}" />, and <Katex tex="g" /> is odd, so the other point is the negative.</>,
  },
  {
    working: <Katex display tex="L:\ y = \frac{x}{2k}" />,
    reason: <>The two points are symmetric about the origin, so <Katex tex="L" /> passes through <Katex tex="(0,0)" />, with gradient <Katex tex="\tfrac{1/(2\sqrt k)}{\sqrt k}=\tfrac1{2k}" />.</>,
  },
  {
    working: <Katex display tex="g(x) - \frac{x}{2k} = \frac{x\left(k - x^2\right)}{2k\left(x^2+k\right)}" />,
    reason: <>Which is on top? Subtract: for <Katex tex="0<x<\sqrt k" /> this is positive (curve above <Katex tex="L" />), and for <Katex tex="-\sqrt k<x<0" /> it is negative (curve below <Katex tex="L" />). They cross at the origin.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A &= \int_{-\sqrt k}^{0} \left(\frac{x}{2k} - g(x)\right)dx \\ &\quad + \int_{0}^{\sqrt k} \left(g(x) - \frac{x}{2k}\right)dx \end{aligned}" />,
    reason: <>Two regions, each top minus bottom, split at the crossing <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{0}^{\sqrt k} \left(\frac{x}{x^2+k} - \frac{x}{2k}\right)dx" />,
    reason: <>Both <Katex tex="g" /> and <Katex tex="L" /> are odd, so the two regions are congruent (a half-turn about the origin).</>,
  },
  {
    working: <Katex display tex="= 2\left[\tfrac12\log_e(x^2+k) - \frac{x^2}{4k}\right]_0^{\sqrt k}" />,
    reason: <>The first term is the <Katex tex="\tfrac{f'}{f}" /> form again, as in part b.</>,
  },
  {
    working: <Katex display tex="= \log_e(2k) - \log_e(k) - \tfrac12 = \log_e\!\left(\tfrac{2k}{k}\right) - \tfrac12" />,
    reason: <>Substitute: at <Katex tex="\sqrt k" />, <Katex tex="x^2=k" />, so the bracket is <Katex tex="\tfrac12\log_e(2k)-\tfrac14" />; at 0 it is <Katex tex="\tfrac12\log_e(k)" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-3">
        <Katex display tex="\boxed{A = \log_e(2) - \frac12}" />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={regionSrc}
            alt="This site's own graph for k = 1: the curve y = x/(x² + 1) in blue and the line y = x/2 in orange meet at (−1, −1/2), the origin and (1, 1/2); the two thin regions between them are shaded"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>
    ),
    reason: <>The <Katex tex="k" /> cancels: every member of the family encloses the same area, about 0.19. VCAA writes it as <Katex tex="\tfrac{2\log_e(2)-1}{2}" />. The graph (ours, for <Katex tex="k=1" />) shows the two shaded regions.</>,
    more: <>That the answer doesn&apos;t depend on <Katex tex="k" /> is no accident: changing <Katex tex="k" /> stretches the whole picture by <Katex tex="\sqrt k" /> horizontally and by <Katex tex="\tfrac1{\sqrt k}" /> vertically, and those two dilations leave areas unchanged. On CAS, you can check one case with <Cas fn="nInt">nInt(x/(x²+1) − x/2, x, 0, 1)</Cas>, which gives 0.0966…, half the total.</>,
  },
]

export default function MethodsQ2_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (15 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=\dfrac{x}{x^2+1}" />.
        </p>
        <p>
          The graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The graph of y = x/(x² + 1): it passes through the origin, rises to a peak to the right of the y-axis and falls to a trough to the left, flattening towards the x-axis at both ends — from the original 2026 NHT VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f" /> is an <em>odd</em> function: <Katex tex="f(-x)=-f(x)" />, so its graph
              is unchanged by a half-turn about the origin. That symmetry does real work in this
              question: it halves the area in part b., pairs up the two tangents in part d., and
              makes the two regions in part f.iii. identical.
            </p>
            <p>
              The other tool used twice is the <Katex tex="\tfrac{f'}{f}" /> form:{' '}
              <Katex tex="\int\tfrac{x}{x^2+c}\,dx=\tfrac12\log_e(x^2+c)" />, because the top is half
              the derivative of the bottom.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={1}
        statement={<>State the coordinates of both stationary points of <Katex tex="f" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find the area bounded by the graph of <Katex tex="y=f(x)" />, the line{' '}
            <Katex tex="x=-1" />, the line <Katex tex="x=1" /> and the <Katex tex="x" />-axis.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Integrate from −1 to 1 in one go"
          working={<Katex display tex="\int_{-1}^{1}\frac{x}{x^2+1}\,dx = \tfrac12\log_e(2) - \tfrac12\log_e(2) = 0" />}
        >
          An area can&apos;t be zero when the graph clearly encloses two regions. The integral counts
          the left region (below the axis) as negative, and here it cancels the right one exactly.
          Split at <Katex tex="x=0" /> and add the sizes.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the equation of the tangent line to the graph of <Katex tex="y=f(x)" /> at the
            origin.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Line"
        marks={2}
        statement={
          <>
            Find the equations of the tangent lines to the graph of <Katex tex="y=f(x)" /> that
            have a gradient of <Katex tex="-\tfrac18" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Let <Katex tex="a,b\in R" />, where <Katex tex="0<a<b" />.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Average Rate of Change"
        marks={3}
        statement={
          <>
            Show, using algebra, that the average rate of change of <Katex tex="f" /> over the
            interval <Katex tex="[a,b]" /> is given by{' '}
            <Katex tex="\dfrac{1-ab}{(a^2+1)(b^2+1)}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Solve Equation"
        marks={1}
        statement={
          <>
            Hence, or otherwise, find <Katex tex="a" /> in terms of <Katex tex="b" /> such that{' '}
            <Katex tex="f(a)=f(b)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">f.</p>
        <p>
          Let <Katex tex="g:R\to R,\ g(x)=\dfrac{x}{x^2+k}" />, where <Katex tex="k\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Stationary Points"
        marks={1}
        statement={
          <>
            Find the <Katex tex="x" />-values of the stationary points of <Katex tex="g" /> in terms
            of <Katex tex="k" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Strictly Decreasing"
        marks={1}
        statement={
          <>
            Find all values of <Katex tex="k" /> such that <Katex tex="g" /> is strictly decreasing
            for <Katex tex="x\ge1" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="f.iii"
        topic="Area Between Curves"
        marks={3}
        statement={
          <>
            Let <Katex tex="L" /> be the straight line passing through the stationary points of{' '}
            <Katex tex="g" />.
            <br />
            Find the total area of the regions bounded by the graph of <Katex tex="y=g(x)" /> and
            the line <Katex tex="L" />, between the stationary points of <Katex tex="g" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FIII} />
      </PartCard>
    </div>
  )
}
