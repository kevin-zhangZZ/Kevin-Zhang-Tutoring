// 2020 Specialist Mathematics — Exam 1 Question 2 (4 marks). A definite integral that a
// linear substitution turns into two power rules. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report and
// itute (all three agree: 8√2/3 − 10/3 ≈ 0.438). Solution is original. The required form
// a√b + c with a, b, c ∈ R is met by any real number (a point made in a teacher's blog
// critique of this paper), so the solution simply gives the natural a = 8/3, b = 2,
// c = −10/3, as VCAA's own answer does. Interactive diagrams (§15), both this site's own:
// interactives/spec-2020e1-q2-flip.tsx sweeps x across the original region while its
// partner u = 1 − x sweeps the mirror-image region backwards — why the terminals reverse, why
// the areas are equal, and (toggle) what dropping the minus sign in du = −dx does;
// interactives/spec-2020e1-q2-split.tsx builds up (2 − u)/√u = 2u^(−1/2) − u^(1/2) as the gap
// between two power curves, with bounding boxes that catch the wrong power rule (the report
// notes "various errors with exponents").

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FlipWidget = lazyWidget(() => import('../interactives/spec-2020e1-q2-flip'))
const SplitWidget = lazyWidget(() => import('../interactives/spec-2020e1-q2-split'))

const EXAM: SAExaminerStats = {
  marks: [26, 14, 17, 16, 28],
  average: 2.1,
  comment: (
    <>
      The most straightforward way to evaluate this integral was to use the linear substitution{' '}
      <Katex tex="u=1-x" /> leading to the integral{' '}
      <Katex tex="\displaystyle-\int_2^1\frac{2-u}{\sqrt u}\,du=\int_1^2\frac{2-u}{\sqrt u}\,du" />
      <br />
      Other substitutions were possible (for example, <Katex tex="u=\sqrt{1-x}" />) but were not
      often carried out correctly by students.
      <br />
      A number of students split the integral into two:{' '}
      <Katex tex="\displaystyle\int_{-1}^0\frac{1}{\sqrt{1-x}}\,dx+\int_{-1}^0\frac{x}{\sqrt{1-x}}\,dx" />.
      <br />
      This does not simplify the problem and a substitution is still required in this case.
      Various errors with exponents and with arithmetic were observed. Students are reminded to include a '<Katex tex="dx" />' or{' '}
      '<Katex tex="du" />' as appropriate in the integral.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } u = 1-x, \text{ so } x = 1-u \text{ and } \frac{du}{dx} = -1" />,
    reason: (
      <>
        The awkward part is the <Katex tex="\sqrt{1-x}" /> in the denominator, so let <Katex tex="u" /> be
        what is under the root: it becomes <Katex tex="\sqrt u" />, a plain power.
      </>
    ),
    more: (
      <>
        Because <Katex tex="1-x" /> is <em>linear</em>, <Katex tex="\tfrac{du}{dx}" /> is just a constant,
        so nothing extra has to cancel. That is the signal to look for: a linear expression inside a root,
        with a polynomial on top.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="du = -dx" />
        <Katex display tex="1+x = 1+(1-u) = 2-u" />
      </>
    ),
    reason: (
      <>
        Everything must be in terms of <Katex tex="u" />: the <Katex tex="dx" />, and the numerator too,
        using <Katex tex="x=1-u" />.
      </>
    ),
    more: (
      <>
        An integral with both <Katex tex="x" /> and <Katex tex="u" /> in it can't be evaluated.
        Rearranging <Katex tex="u=1-x" /> to <Katex tex="x=1-u" /> is what lets the numerator be
        rewritten.
      </>
    ),
  },
  {
    working: <Katex display tex="x = -1 \Rightarrow u = 2; \qquad x = 0 \Rightarrow u = 1" />,
    reason: (
      <>
        Change the terminals to <Katex tex="u" />-values, so there is no substituting back at the end.
        They come out reversed because <Katex tex="u=1-x" /> goes <em>down</em> as <Katex tex="x" /> goes up.
      </>
    ),
    more: (
      <>
        Keep the old terminals by mistake and you would be integrating <Katex tex="\sqrt u" /> over
        negative <Katex tex="u" />, which is not even defined.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\int_{-1}^{0}\frac{1+x}{\sqrt{1-x}}\,dx = \int_{2}^{1}\frac{2-u}{\sqrt u}\,(-du)" />
        <Katex display tex="= \int_{1}^{2}\frac{2-u}{\sqrt u}\,du" />
      </>
    ),
    reason: (
      <>
        Replace <Katex tex="dx" /> with <Katex tex="-du" />. Swapping the terminals of an integral
        changes its sign, so <Katex tex="-\int_2^1=\int_1^2" />.
      </>
    ),
    more: (
      <>
        The minus sign and the reversed terminals are the same fact seen twice (<Katex tex="u" /> runs
        backwards as <Katex tex="x" /> runs forwards), so they cancel. This is the line the report writes
        out, and it ends in <Katex tex="du" />: the report reminds students to include the{' '}
        <Katex tex="dx" /> or <Katex tex="du" /> in every integral. The first diagram below shows the new
        region is the old one flipped end to end, with the same area.
      </>
    ),
  },
  {
    working: <Katex display tex="= \int_1^2\left(2u^{-1/2}-u^{1/2}\right)du" />,
    reason: (
      <>
        The denominator is a single term, so divide each term of the numerator by it:{' '}
        <Katex tex="\tfrac{2}{u^{1/2}}=2u^{-1/2}" /> and <Katex tex="\tfrac{u}{u^{1/2}}=u^{1/2}" />.
      </>
    ),
    more: (
      <>
        One fraction with no known antiderivative becomes two powers of <Katex tex="u" />, and the power
        rule does the rest.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left[4u^{1/2}-\tfrac23u^{3/2}\right]_1^2" />,
    reason: (
      <>
        Add one to the power, then <b>divide</b> by the new power:{' '}
        <Katex tex="2\cdot\frac{u^{1/2}}{1/2}=4u^{1/2}" /> and{' '}
        <Katex tex="\frac{u^{3/2}}{3/2}=\tfrac23u^{3/2}" />.
      </>
    ),
    more: (
      <>
        Dividing by <Katex tex="\tfrac12" /> doubles; dividing by <Katex tex="\tfrac32" /> is multiplying
        by <Katex tex="\tfrac23" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left(4\sqrt2-\tfrac23\cdot2\sqrt2\right)-\left(4-\tfrac23\right)" />,
    reason: (
      <>
        Upper terminal minus lower, with a bracket around the <em>whole</em> lower value.{' '}
        <Katex tex="2^{3/2}=2\cdot2^{1/2}=2\sqrt2" />, and any power of <Katex tex="1" /> is <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= 4\sqrt2-\tfrac{4\sqrt2}{3}-\tfrac{10}{3} = \tfrac{12\sqrt2-4\sqrt2}{3}-\tfrac{10}{3}" />,
    reason: <>Collect the surd terms over the common denominator 3; the rational part is <Katex tex="4-\tfrac23=\tfrac{10}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\sqrt2}{3}-\frac{10}{3}}" />,
    reason: (
      <>
        The required form <Katex tex="a\sqrt b+c" />, with <Katex tex="a=\tfrac83" />,{' '}
        <Katex tex="b=2" />, <Katex tex="c=-\tfrac{10}{3}" />.
      </>
    ),
    more: (
      <>
        Sanity check: this is about <Katex tex="0.44" />. On <Katex tex="[-1,0]" /> the integrand rises
        from <Katex tex="0" /> to <Katex tex="1" />, and since <Katex tex="\sqrt{1-x}\ge1" /> there, it sits
        below the line <Katex tex="y=1+x" />, whose triangle has area <Katex tex="\tfrac12" />. So the
        answer must be positive and under <Katex tex="\tfrac12" />; a negative answer or one bigger than{' '}
        <Katex tex="\tfrac12" /> means a slip somewhere.
      </>
    ),
  },
]

export default function SpecialistQ2_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_{-1}^{0}\frac{1+x}{\sqrt{1-x}}\,dx" />. Give
          your answer in the form <Katex tex="a\sqrt b+c" />, where{' '}
          <Katex tex="a,b,c\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            There is no antiderivative to recognise as it stands, so the whole question is choosing a
            substitution and carrying it through cleanly. A substitution changes three things at once:
            every <Katex tex="x" /> in the integrand, the <Katex tex="dx" />, and the two terminals.
            Miss any one of them and the integral is wrong.
          </p>
          <p>
            The denominator is the only difficult feature, so it is the thing to substitute for.
            Splitting the integral into <Katex tex="\int\frac{1}{\sqrt{1-x}}\,dx" /> and{' '}
            <Katex tex="\int\frac{x}{\sqrt{1-x}}\,dx" /> first is a false economy: the second
            piece still needs the same substitution, and you now do the work twice.
          </p>
          <p>
            The report mentions <Katex tex="u=\sqrt{1-x}" /> as another route. It works:{' '}
            <Katex tex="x=1-u^2" />, <Katex tex="dx=-2u\,du" />, and the integral becomes{' '}
            <Katex tex="\int_1^{\sqrt2}\left(4-2u^2\right)du" />, which gives the same answer. But there are
            more steps to get wrong, and the report notes it was not often carried out correctly.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="u = 1 − x flips the region end to end: same area, reversed terminals, and the minus sign turns them back">
          <FlipWidget />
        </Explore>
        <WrongMethod
          title="Drop the minus sign from du = −dx"
          working={
            <>
              <Katex display tex="\int_{-1}^{0}\frac{1+x}{\sqrt{1-x}}\,dx = \int_2^1\frac{2-u}{\sqrt u}\,du" />
              <Katex display tex="= \frac{10}{3}-\frac{8\sqrt2}{3}" />
            </>
          }
        >
          <p>
            About <Katex tex="-0.44" />: a negative answer for a positive integrand gives it away. Quietly
            dropping the negative sign at the end gives the right number from wrong working. In the diagram above, turn on &ldquo;What if I drop the minus
            sign?&rdquo; to watch the region count as negative.
          </p>
        </WrongMethod>
        <Explore title="Splitting the fraction turns one area into a big power-rule area minus a smaller one">
          <SplitWidget />
        </Explore>
        <WrongMethod
          title="Multiply by the new power instead of dividing by it"
          source="Report: “various errors with exponents”"
          working={
            <>
              <Katex display tex="\int_1^2\left(2u^{-1/2}-u^{1/2}\right)du" />
              <Katex display tex="= \left[u^{1/2}-\tfrac32u^{3/2}\right]_1^2" />
              <Katex display tex="= \left(\sqrt2-3\sqrt2\right)-\left(1-\tfrac32\right) = \tfrac12-2\sqrt2" />
            </>
          }
        >
          <p>
            About <Katex tex="-2.33" />: negative, for a region above the axis. The power rule{' '}
            <em>divides</em> by the new power, <Katex tex="\int u^n\,du=\frac{u^{n+1}}{n+1}" />, so{' '}
            <Katex tex="\int2u^{-1/2}\,du=4u^{1/2}" /> and <Katex tex="\int u^{1/2}\,du=\tfrac23u^{3/2}" />.
          </p>
          <p>
            Catch it by differentiating back: <Katex tex="\tfrac{d}{du}\left(\tfrac32u^{3/2}\right)=\tfrac94u^{1/2}" />,
            not <Katex tex="u^{1/2}" />. Or by size: the area under <Katex tex="\sqrt u" /> on{' '}
            <Katex tex="[1,2]" /> must lie between <Katex tex="1" /> and <Katex tex="\sqrt2" /> (step 4 of
            the diagram above), and <Katex tex="3\sqrt2-\tfrac32\approx2.74" /> does not.
          </p>
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
