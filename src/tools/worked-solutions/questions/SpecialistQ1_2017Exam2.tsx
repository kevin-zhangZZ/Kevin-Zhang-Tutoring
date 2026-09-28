// 2017 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks).
// f(x) = x/(1 + x³): asymptotes, stationary point, point of inflection, the graph, then
// splitting a solid of revolution into two equal halves. Question text transcribed from
// the original paper. Part b.'s blank axes (x from −3 to 3, y from −2 to 2) are cropped from
// page 11 of the paper (spec-2017e2-q1b-blank-axes.png); the finished sketch is this site's own
// matplotlib figure on that grid. Answers verified with sympy and scipy (including the exact
// total π∫₀³ f² dx = 9π/28 and both wrong-method values of a); they agree with the report and
// itute. Solution is original.
// Interactive widgets: a.i. zoom out to see both tails flatten onto y = 0 (f ≈ 1/x² far out);
// a.iii. slide a tangent with the curve coloured by concavity over a graph of f'', which touches
// zero at x = 0 but crosses at x = ∛2; c.ii. slide the cut x = a until the two volumes balance,
// with a toggle for the report's "forgot to square" error, which halves the area instead.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './spec-2017e2-q1b-graph.png'
import blankAxesSrc from './spec-2017e2-q1b-blank-axes.png'

const FarOutWidget = lazyWidget(() => import('../interactives/spec-2017e2-q1ai-far-out'))
const ConcavityWidget = lazyWidget(() => import('../interactives/spec-2017e2-q1aiii-concavity'))
const HalfVolumeWidget = lazyWidget(() => import('../interactives/spec-2017e2-q1c-half-volume'))

const EXAM_AI: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      The majority of students stated the vertical asymptote but significantly fewer stated
      the horizontal asymptote. Various incorrect attempts at partial fraction forms were
      made.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [2, 17, 81],
  average: 1.8,
  comment: (
    <>
      This question was generally answered well. Some students did not give the coordinates
      of the stationary point in the required form.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [10, 77, 13],
  average: 1.0,
  comment: (
    <>
      The majority of students provided the correct inflection point. A common error was to
      erroneously include the point <Katex tex="(0,0)" />, which is another point where{' '}
      <Katex tex="f''(x)=0" />, but it is not a point of inflection as there is no change of
      concavity; <Katex tex="f''(x)" /> does not change sign.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [3, 9, 24, 64],
  average: 2.5,
  comment: (
    <>
      Graphing was generally completed to a reasonable standard. In some cases the shape of
      the graph was poor and the required points were not marked clearly or were not placed
      in the correct position.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [17, 13, 71],
  average: 1.6,
  comment: (
    <>
      This question was answered well. Other equivalent correct forms were presented. A
      common error was a failure to square <Katex tex="f(x)" /> or including{' '}
      <Katex tex="\pi" /> on only one side of the equation above.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      The majority of students who answered Question 1ci. correctly were also able to answer
      this question correctly.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="1+x^3 = 0 \implies x = -1" />,
    reason: (
      <>
        First question for any fraction: where is the bottom zero? At <Katex tex="x=-1" /> the
        denominator vanishes but the numerator is <Katex tex="-1\neq0" />, so the values blow up —
        a vertical asymptote. It also fixes the maximal domain <Katex tex="D=R\setminus\{-1\}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{1+x^3} = \frac{\frac1{x^2}}{\frac1{x^3}+1}" />,
    reason: (
      <>
        Second question, the one that finds the other asymptote: what happens as{' '}
        <Katex tex="x\to\pm\infty" />? Divide top and bottom by <Katex tex="x^3" />, the highest
        power, so that every term except the <Katex tex="1" /> shrinks to zero.
      </>
    ),
  },
  {
    working: <Katex display tex="x\to\pm\infty \implies f(x)\to\frac{0}{0+1}=0" />,
    reason: (
      <>
        The bottom's degree (3) is higher than the top's (1), so the bottom wins and the curve
        flattens onto the <Katex tex="x" />-axis. With the top's degree lower there is no
        polynomial part to find, so no partial fractions are needed — the report notes various
        incorrect attempts at partial fraction forms.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x=-1 \text{ and } y=0}" />,
    reason: <>One vertical, one horizontal. The report says significantly fewer students stated the horizontal one.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{(1+x^3)(1)-x(3x^2)}{(1+x^3)^2}" />,
    reason: (
      <>
        Quotient rule: bottom times the top's derivative, minus top times the bottom's derivative,
        all over the bottom squared. The question says &ldquo;find <Katex tex="f'(x)" />&rdquo;, so
        write it down, simplified.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{1-2x^3}{(1+x^3)^2}}" />,
    reason: <>Numerator: <Katex tex="1+x^3-3x^3=1-2x^3" />.</>,
  },
  {
    working: <Katex display tex="1-2x^3=0 \implies x = \sqrt[3]{\tfrac12}\approx0.7937" />,
    reason: (
      <>
        A fraction is zero only when its numerator is, and the denominator is a square so it never
        changes sign — the derivative's sign is entirely the numerator's. A cubic{' '}
        <Katex tex="x^3=\tfrac12" /> has one real root, so there is exactly one stationary point.
      </>
    ),
  },
  {
    working: <Katex display tex="f(0.7937\ldots) = \frac{0.7937\ldots}{1.5} \approx 0.5291" />,
    reason: <>Note <Katex tex="x^3=\tfrac12" /> exactly, so the denominator is exactly <Katex tex="\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.79,\ 0.53)}" />,
    reason: (
      <>
        It's a local maximum: <Katex tex="1-2x^3" /> is positive just left of{' '}
        <Katex tex="0.79" /> and negative just right, so <Katex tex="f" /> rises then falls.
        Give it as a coordinate pair to two decimal places — the report notes some students did
        not give the coordinates in the required form.
      </>
    ),
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(d²/dx²(x/(1+x^3)) = 0, x)</Cas>,
    reason: (
      <>
        Inflection points can only occur where <Katex tex="f''(x)=0" />, so find those first.
        This is the technology-active paper, so let the CAS do the second derivative.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f''(x) &= \frac{6x^2(x^3-2)}{(1+x^3)^3} = 0 \\ \implies x &= 0 \ \text{ or } \ x=\sqrt[3]{2} \end{aligned}"
      />
    ),
    reason: (
      <>
        These are only <em>candidates</em>. An inflection needs the concavity to change, so{' '}
        <Katex tex="f''" /> must change sign there. Test a value either side of each.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f''(-0.5) &\approx -4.76 < 0 \\ f''(0.5) &\approx -1.98 < 0 \end{aligned}"
      />
    ),
    reason: (
      <>
        No sign change at <Katex tex="x=0" />: concave down on both sides. You could predict this
        from the factor <Katex tex="x^2" />, which is zero at <Katex tex="0" /> but never negative.
        So <Katex tex="(0,0)" /> is not an inflection — including it is the common error the
        report lists.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f''(1) &= -0.75 < 0 \\ f''(2) &\approx 0.20 > 0 \end{aligned}"
      />
    ),
    reason: (
      <>
        Sign change at <Katex tex="x=\sqrt[3]{2}" />: the factor <Katex tex="x^3-2" /> goes from
        negative to positive (and <Katex tex="(1+x^3)^3>0" /> for <Katex tex="x>-1" />). Concave
        down becomes concave up, so this one is a genuine inflection.
      </>
    ),
  },
  {
    working: <Katex display tex="f\!\left(\sqrt[3]{2}\right) = \frac{\sqrt[3]{2}}{1+2} \approx 0.42" />,
    reason: <>The cube is exact: <Katex tex="\left(\sqrt[3]2\right)^3=2" />, so the denominator is <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(1.26,\ 0.42)}" />,
    reason: <>One point of inflection only.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{asymptotes } x=-1,\ y=0" />,
    reason: <>Draw these first, dashed and labelled with their equations — they frame everything else.</>,
  },
  {
    working: <Katex display tex="\text{intercept } (0,0)" />,
    reason: <><Katex tex="f(x)=0" /> only when <Katex tex="x=0" />, so the curve meets both axes at the origin and nowhere else.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &\text{stationary point } (0.79,\ 0.53) \\ &\text{inflection } (1.26,\ 0.42) \end{aligned}"
      />
    ),
    reason: <>From parts a.ii. and a.iii. Mark them with their coordinates — the question asks for labels.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x\to-1^-&: \ f\to+\infty \\ x\to-1^+&: \ f\to-\infty \end{aligned}"
      />
    ),
    reason: (
      <>
        Just left of <Katex tex="-1" />, <Katex tex="1+x^3<0" /> and <Katex tex="x<0" />, so the
        quotient is positive. Just right, the denominator flips sign but the numerator doesn't.
        That decides which way each branch runs.
      </>
    ),
  },
  {
    working: <Katex display tex="x\to\pm\infty: \ f\to0^+" />,
    reason: (
      <>
        Both tails approach <Katex tex="y=0" /> from <em>above</em>: for large <Katex tex="x" /> top
        and bottom are positive, and for <Katex tex="x<-1" /> both are negative. At the ends of the
        window, <Katex tex="f(-3)=\tfrac{3}{26}\approx0.12" /> and{' '}
        <Katex tex="f(3)=\tfrac{3}{28}\approx0.11" />.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={graphSrc}
          alt="Graph of y = x/(1+x³) from x = −3 to 3: a branch approaching the x-axis from above on the far left and rising to +∞ at the asymptote x = −1, then a branch coming up from −∞ just right of x = −1 through the origin to a maximum at (0.79, 0.53), an inflection at (1.26, 0.42), and a slow decay back towards y = 0"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: (
      <>
        Concavity from part a.iii.: concave up left of <Katex tex="x=-1" />, concave down from the
        asymptote through the origin to <Katex tex="(1.26,\ 0.42)" />, then concave up. Near the
        origin the curve hugs <Katex tex="y=x" /> (the gradient there is <Katex tex="f'(0)=1" />),
        so draw it passing smoothly through — no kink and no bend-change at <Katex tex="(0,0)" />.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int \bigl(f(x)\bigr)^2 dx" />,
    reason: (
      <>
        The solid is a stack of thin discs. The disc at <Katex tex="x" /> has radius{' '}
        <Katex tex="f(x)" />, so its volume is <Katex tex="\pi\bigl(f(x)\bigr)^2\,\delta x" />; the
        integral adds them up. The <Katex tex="f(x)" /> must be <em>squared</em> — the report lists
        forgetting this as a common error.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{aligned} &\pi\int_0^{a}\bigl(f(x)\bigr)^2 dx \\ &\quad= \pi\int_{a}^{3}\bigl(f(x)\bigr)^2 dx \end{aligned}}"
      />
    ),
    reason: (
      <>
        The piece from <Katex tex="0" /> to <Katex tex="a" /> and the piece from{' '}
        <Katex tex="a" /> to <Katex tex="3" /> generate equal volumes, so set the two integrals
        equal. Put <Katex tex="\pi" /> on both sides or neither — including it on one side only is
        the other flagged error. An equivalent form says the first piece is half the whole:{' '}
        <Katex tex="\int_0^{a}\bigl(f(x)\bigr)^2 dx = \tfrac12\int_0^{3}\bigl(f(x)\bigr)^2 dx" />.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(∫((x/(1+x³))², x, 0, a) = ∫((x/(1+x³))², x, a, 3), a) | 0&lt;a&lt;3</Cas>,
    reason: <>Straight from part c.i.; the <Katex tex="\pi" /> cancels. Restrict to the given <Katex tex="0<a<3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx 0.98}" />,
    reason: (
      <>
        Two decimal places. Sanity check: it sits well left of the midpoint <Katex tex="1.5" />,
        which is right — the curve is tallest near <Katex tex="x=0.8" />, and squaring makes those
        tall discs count extra, so half the volume is reached early.
      </>
    ),
  },
]

export default function SpecialistQ1_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:D\to R" />, <Katex tex="f(x)=\dfrac{x}{1+x^3}" />, where{' '}
          <Katex tex="D" /> is the maximal domain of <Katex tex="f" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Asymptotes"
        marks={1}
        statement={<>Find the equations of any asymptotes of the graph of <Katex tex="f" />.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="Where the asymptotes of a fraction come from">
          <p>
            <b>Vertical:</b> where the denominator is zero and the numerator isn&apos;t.{' '}
            <b>Horizontal (or oblique):</b> what the function does as <Katex tex="x\to\pm\infty" />,
            which depends on the degrees. Top&apos;s degree lower than the bottom&apos;s: the
            asymptote is <Katex tex="y=0" />. Equal degrees: <Katex tex="y=" /> the ratio of the
            leading coefficients. Top&apos;s degree one higher: an oblique line, found by division.
          </p>
          <p>
            Every rational function needs both checks. The denominator only ever tells you about
            the vertical ones.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <Explore title="Why y = 0 is an asymptote: far out, f(x) behaves like 1/x²">
          <FarOutWidget />
        </Explore>
        <WrongMethod
          title="Asymptotes are where the denominator is zero, so it's just x = −1"
          source="Examiner's report"
          working={<Katex tex="1+x^3=0 \implies x=-1 \ \text{ (only)}" />}
        >
          That rule only finds <em>vertical</em> asymptotes, and the mark needed both. The other
          check is what <Katex tex="f" /> does as <Katex tex="x\to\pm\infty" />: here it tends to{' '}
          <Katex tex="0" />, so <Katex tex="y=0" /> is an asymptote too. Quick catch: whenever the
          top&apos;s degree is lower than the bottom&apos;s, <Katex tex="y=0" /> is an asymptote.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Stationary Points"
        marks={2}
        statement={
          <>
            Find <Katex tex="f'(x)" /> and state the coordinates of any stationary points of
            the graph of <Katex tex="f" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Find the coordinates of any points of inflection of the graph of{' '}
            <Katex tex="f" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <Background title="Zero second derivative is not enough">
          <p>
            A point of inflection needs the concavity to <em>change</em>, which means{' '}
            <Katex tex="f''" /> must change <em>sign</em> — not merely reach zero. A factor with an
            even power, like <Katex tex="x^2" />, is zero at its root but has the same sign on
            both sides, so it can&apos;t produce a sign change.
          </p>
          <p>
            The quickest check on a CAS is to graph <Katex tex="f''" /> and look for a
            crossing rather than a touch. By hand, test a value either side.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
        <Explore title="f″ = 0 twice, but the concavity only changes once">
          <ConcavityWidget />
        </Explore>
        <WrongMethod
          title="Solve f″(x) = 0 and list every solution as an inflection"
          source="Examiner's report"
          working={<Katex tex="f''(x)=0 \implies (0,\ 0),\ (1.26,\ 0.42)" />}
        >
          Solving <Katex tex="f''(x)=0" /> only finds candidates. At <Katex tex="x=0" /> the curve
          is concave down on both sides, so nothing changes and <Katex tex="(0,0)" /> is not an
          inflection. Catch it by testing the sign of <Katex tex="f''" /> either side of every
          root, or by spotting a squared factor in <Katex tex="f''" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="f(x)=\dfrac{x}{1+x^3}" /> from{' '}
              <Katex tex="x=-3" /> to <Katex tex="x=3" /> on the axes provided below, marking all
              stationary points, points of inflection and intercepts with axes, labelling them
              with their coordinates. Show any asymptotes and label them with their equations.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={blankAxesSrc}
                alt="Blank axes from the original 2017 VCAA exam paper: x from −3 to 3 and y from −2 to 2, with grid lines every 1"
                className="w-full max-w-[400px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The region <Katex tex="S" />, bounded by the graph of <Katex tex="f" />, the{' '}
          <Katex tex="x" />-axis and the line <Katex tex="x=3" />, is rotated about the{' '}
          <Katex tex="x" />-axis to form a solid of revolution. The line{' '}
          <Katex tex="x=a" />, where <Katex tex="0<a<3" />, divides the region{' '}
          <Katex tex="S" /> into two regions such that, when the two regions are rotated about
          the <Katex tex="x" />-axis, they generate solids of equal volume.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Write down an equation involving definite integrals that can be used to determine{' '}
            <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
        <WrongMethod
          title="Split the region into two equal parts: ∫ f(x) dx on each side"
          source="Examiner's report"
          working={<Katex tex="\int_0^{a} f(x)\,dx=\int_{a}^{3} f(x)\,dx \implies a\approx1.14" />}
        >
          Without the square this halves the <em>area</em> of <Katex tex="S" />, not the volume. A
          disc&apos;s volume is <Katex tex="\pi r^2" /> times its thickness with{' '}
          <Katex tex="r=f(x)" />, so tall slices count far more, and the volume balances further
          left at <Katex tex="a\approx0.98" />. Catch it: a volume of revolution always has a{' '}
          <Katex tex="\pi" /> and a square in it.
        </WrongMethod>
        <WrongMethod
          title="Put π in front of the first integral only"
          source="Examiner's report"
          working={<Katex tex="\pi\int_0^{a}\bigl(f(x)\bigr)^2dx=\int_{a}^{3}\bigl(f(x)\bigr)^2dx \implies a\approx0.67" />}
        >
          Each side is a volume, so each needs its <Katex tex="\pi" />. With it on one side only
          the <Katex tex="\pi" /> no longer cancels, and the equation compares a volume with a
          volume divided by <Katex tex="\pi" />, giving the wrong cut. Write it on both sides, or
          leave it off both.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Hence, find the value of <Katex tex="a" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Half the volume is not half the length, or half the area">
          <HalfVolumeWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
