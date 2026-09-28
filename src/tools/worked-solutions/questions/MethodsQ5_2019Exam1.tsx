// 2019 Mathematical Methods — Exam 1, Question 5 (5 marks).
// f(x) = 2/(x-1)² + 1 — evaluate f(-1) and sketch f (part a), then find the area it bounds
// with the x-axis, x=-1 and x=0 (part b). Question text transcribed from the original paper;
// the blank axes in part a.ii's statement are cropped from the paper (page 7). VCAA's axes
// were blank (nothing pre-drawn to redraw), so the sketched curve in the working is this
// site's own original content — plotted with matplotlib (real graphing software, exact, not
// hand-waypointed), not cropped from anything VCAA printed.
// Interactives: a.ii builds the truncus from y = 1/x² one transformation at a time, with a
// toggle comparing the rectangular hyperbola the report says weaker students drew
// (meth-2019e1-q5aii-truncus); b sweeps a strip across the region to show the area as a 1 × 1
// square (the +1 → +x) plus a cap of area 1, with a "Drop the +1" toggle
// (meth-2019e1-q5b-square-cap). Wrong-method boxes: the hyperbola (a.ii), and the log
// antiderivative and dropped +1 (b) — all three named in the examiner's report, each computed.
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivation below (f(-1) = 3/2, area 2). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import fSketchSrc from './meth-2019e1-q5-truncus-sketch.png'
import blankAxesSrc from './meth-2019e1-q5-blank-axes.png'

const TruncusWidget = lazyWidget(() => import('../interactives/meth-2019e1-q5aii-truncus'))
const SquareCapWidget = lazyWidget(() => import('../interactives/meth-2019e1-q5b-square-cap'))

const EXAM_AI: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: <>This question was done well.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [9, 22, 69],
  average: 1.6,
  comment: (
    <>
      Most students correctly recognised that a truncus shape was required and most of these
      students located it correctly. Again, curvature was an issue for some, with graphs
      'turning away' from the asymptotes or crossing them. Students who made use of their
      answer to part a., and found a <Katex tex="y" />-intercept were most successful in
      producing a correct graph. Those who did not recognise the truncus tended to draw a
      rectangular hyperbola with correct asymptotes.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 40, 32],
  average: 1.1,
  comment: (
    <>
      Students were generally able to set up the correct definite integral, but often did not
      find the correct anti-derivative or evaluated it incorrectly. The most common errors were
      an anti-derivative that involved a log component or overlooking the{' '}
      <Katex tex="+1" /> constant when anti-differentiating.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(-1) = \dfrac{2}{(-1-1)^2}+1 = \dfrac{2}{4}+1" />,
    reason: (
      <>
        Substitute <Katex tex="x=-1" />, keeping <Katex tex="(-1-1)" /> in brackets before squaring:{' '}
        <Katex tex="(-2)^2=4" />, which is positive. That square is positive for every{' '}
        <Katex tex="x\ne1" />, so every value of <Katex tex="f" /> is more than <Katex tex="1" /> — worth
        noticing before part a.ii.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f(-1) = \dfrac32}" />,
    reason: (
      <>
        Keep this: <Katex tex="(-1,\tfrac32)" /> is a point on the graph for part a.ii. The report
        says students who made use of it, and found a <Katex tex="y" />-intercept, were most
        successful with the sketch.
      </>
    ),
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Vertical asymptote: } x=1" />
        <Katex display tex="\text{Horizontal asymptote: } y=1" />
      </>
    ),
    reason: (
      <>
        Read them off the form <Katex tex="y=\dfrac{a}{(x-h)^2}+k" /> with <Katex tex="h=1" />,{' '}
        <Katex tex="k=1" />. The denominator <Katex tex="(x-1)^2" /> is <Katex tex="0" /> at{' '}
        <Katex tex="x=1" />, so <Katex tex="f" /> blows up there; and{' '}
        <Katex tex="\dfrac{2}{(x-1)^2}\to0" /> as <Katex tex="x\to\pm\infty" />, leaving{' '}
        <Katex tex="f\to1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f(0) = \dfrac{2}{1}+1 = 3,\qquad f(-1)=\tfrac32" />
        <Katex display tex="\text{By symmetry in } x=1\text{: } (2,3),\ (3,\tfrac32)" />
      </>
    ),
    reason: (
      <>
        The <Katex tex="y" />-intercept and part a.i give two exact points on the left branch. A
        truncus is symmetric about its vertical asymptote: <Katex tex="x=0" /> and{' '}
        <Katex tex="x=2" /> are both 1 unit from <Katex tex="x=1" />, so <Katex tex="(x-1)^2" /> and
        hence <Katex tex="f" /> are the same there. That gives two free points on the right branch.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={fSketchSrc}
          alt="Truncus on VCAA's grid (x from −5 to 5, y from −4 to 6) with dashed asymptotes x = 1 and y = 1, passing through (−1, 3/2) and (0, 3) — this site's own sketch"
          className="w-full max-w-[320px]"
        />
      </div>
    ),
    reason: (
      <>
        Two branches, both <b>above</b> <Katex tex="y=1" /> (because{' '}
        <Katex tex="\tfrac{2}{(x-1)^2}>0" />), mirror images in <Katex tex="x=1" />. Each shoots up
        beside <Katex tex="x=1" /> and flattens towards <Katex tex="y=1" /> as{' '}
        <Katex tex="x\to\pm\infty" />, getting ever closer to both asymptotes: never turning away or
        crossing them (the curvature problems the report describes). Label both asymptotes with
        their equations, as the question asks.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \int_{-1}^{0} \left(\dfrac{2}{(x-1)^2}+1\right) dx" />,
    reason: (
      <>
        From the sketch in part a.ii, the graph is above the <Katex tex="x" />-axis (in fact above{' '}
        <Katex tex="y=1" />) for all of <Katex tex="-1\le x\le0" />, so the area is just this definite
        integral, with no splitting or sign changes.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\int 2(x-1)^{-2}\,dx = \dfrac{2(x-1)^{-1}}{-1}" />
        <Katex display tex="= -\dfrac{2}{x-1}" />
      </>
    ),
    reason: (
      <>
        Write the fraction as a power, <Katex tex="2(x-1)^{-2}" />. The power is{' '}
        <Katex tex="-2" />, so use the power rule: add one to the power (<Katex tex="-2\to-1" />) and
        divide by the new power (<Katex tex="-1" />). A logarithm only comes from a power of exactly{' '}
        <Katex tex="-1" />, such as <Katex tex="\tfrac{1}{x-1}" />; using one here was one of the
        report's most common errors.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Area} = \left[-\dfrac{2}{x-1}+x\right]_{-1}^{0}" />,
    reason: (
      <>
        The <Katex tex="+1" /> antidifferentiates to <Katex tex="+x" />. It isn't a throwaway
        constant: under the curve sits a <Katex tex="1\times1" /> square below <Katex tex="y=1" />, and
        the <Katex tex="x" /> is what counts it. Overlooking it was the other most common error in the report.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="= \left(-\dfrac{2}{-1}+0\right) - \left(-\dfrac{2}{-2}+(-1)\right)" />
        <Katex display tex="= 2 - (1-1)" />
      </>
    ),
    reason: (
      <>
        Upper limit minus lower limit. At <Katex tex="x=0" />: <Katex tex="-\tfrac{2}{-1}=2" />. At{' '}
        <Katex tex="x=-1" />: <Katex tex="-\tfrac{2}{-2}=1" />, then <Katex tex="1+(-1)=0" />. Bracket each
        substitution so the minus signs can't get lost.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2}" />,
    reason: (
      <>
        Square units. Check with the picture: the unit square under <Katex tex="y=1" /> (area{' '}
        <Katex tex="1" />) plus the cap above it (<Katex tex="\left[-\tfrac{2}{x-1}\right]_{-1}^{0}=2-1=1" />)
        makes <Katex tex="2" />. Also sensible: the curve rises from <Katex tex="\tfrac32" /> to{' '}
        <Katex tex="3" /> over a width of <Katex tex="1" />, so the area must be between{' '}
        <Katex tex="1.5" /> and <Katex tex="3" />.
      </>
    ),
  },
]

export default function MethodsQ5_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (5 marks)</p>
        <p>
          Let <Katex tex="f:R\setminus\{1\}\to R,\ f(x)=\dfrac{2}{(x-1)^2}+1" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Function Value" marks={1} statement={<>Evaluate <Katex tex="f(-1)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Sketch Truncus"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              Sketch the graph of <Katex tex="f" /> on the axes below, labelling all asymptotes with their equations.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={blankAxesSrc}
                alt="Blank axes from the original 2019 VCAA exam paper: x from −5 to 5 and y from −4 to 6, grid squares of 1 unit"
                className="w-full max-w-[420px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_AII}
      >
        <Background title="Truncus or hyperbola? Look at the power">
          <p>
            <Katex tex="y=\dfrac{a}{(x-h)^2}+k" /> is a <b>truncus</b>: asymptotes <Katex tex="x=h" /> and{' '}
            <Katex tex="y=k" />, symmetric about <Katex tex="x=h" />. The square is never negative, so for{' '}
            <Katex tex="a>0" /> both branches lie above <Katex tex="y=k" />.
          </p>
          <p>
            <Katex tex="y=\dfrac{a}{x-h}+k" /> is a <b>rectangular hyperbola</b>: same kind of asymptotes, but{' '}
            <Katex tex="x-h" /> changes sign at <Katex tex="x=h" />, so its branches sit in opposite corners, one above{' '}
            <Katex tex="y=k" /> and one below.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <Explore title="Build the truncus one transformation at a time — and why it isn't a hyperbola">
          <TruncusWidget />
        </Explore>
        <WrongMethod
          title="Asymptotes x = 1 and y = 1, so draw a hyperbola"
          source="Examiner's report"
          working={<Katex display tex="y=\dfrac{2}{x-1}+1:\quad y(-1)=0,\ \ y(0)=-1" />}
        >
          That is the graph of <Katex tex="y=\tfrac{2}{x-1}+1" />, whose left branch dips below{' '}
          <Katex tex="y=1" />, through <Katex tex="(-1,0)" /> and <Katex tex="(0,-1)" />. The asymptotes alone
          don't decide the shape; the squared denominator does, because it keeps{' '}
          <Katex tex="\tfrac{2}{(x-1)^2}" /> positive on both sides. Catch it by plotting part a.i:{' '}
          <Katex tex="f(-1)=\tfrac32" /> is above <Katex tex="y=1" />, so the left branch must be too.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Area Under Curve" marks={2} statement={<>Find the area bounded by the graph of <Katex tex="f" />, the <Katex tex="x" />-axis, the line <Katex tex="x=-1" /> and the line <Katex tex="x=0" />.</>} examinerReport={EXAM_B}>
        <Background title="Antidifferentiating a power of (ax + b)">
          <p>
            From the formula sheet, <Katex tex="\displaystyle\int (ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+c" /> for{' '}
            <Katex tex="n\ne-1" />. Only the power <Katex tex="n=-1" /> gives a logarithm:{' '}
            <Katex tex="\displaystyle\int\frac{1}{ax+b}\,dx=\frac1a\log_e|ax+b|+c" />. So before reaching for{' '}
            <Katex tex="\log_e" />, rewrite the fraction as a power and check it is exactly <Katex tex="-1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Where the +1 goes: a 1 × 1 square under the curve">
          <SquareCapWidget />
        </Explore>
        <WrongMethod
          title="There's an (x − 1) on the bottom, so it integrates to a log"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\left[2\log_e|x-1|+x\right]_{-1}^{0}" />
              <Katex display tex="= 1-2\log_e 2 \approx -0.39" />
            </>
          }
        >
          A log comes only from a power of exactly <Katex tex="-1" />; here{' '}
          <Katex tex="\tfrac{2}{(x-1)^2}=2(x-1)^{-2}" />, a power of <Katex tex="-2" />, so the power rule applies.
          The negative answer is the giveaway: the region is above the <Katex tex="x" />-axis, so its area
          must be positive (at least <Katex tex="\tfrac32" />, since the curve never drops below{' '}
          <Katex tex="\tfrac32" /> on a width of <Katex tex="1" />).
        </WrongMethod>
        <WrongMethod
          title="Integrate the fraction; the +1 is just a constant"
          source="Examiner's report"
          working={<Katex display tex="\left[-\dfrac{2}{x-1}\right]_{-1}^{0} = 2-1 = 1" />}
        >
          A <Katex tex="+1" /> inside the integral is not the <Katex tex="+c" />: it antidifferentiates to{' '}
          <Katex tex="+x" />, and here it is worth a whole unit of area, the square under{' '}
          <Katex tex="y=1" /> (turn on &ldquo;Drop the +1&rdquo; above). Size check: the curve is at least{' '}
          <Katex tex="\tfrac32" /> high across a width of <Katex tex="1" />, so an area of <Katex tex="1" /> is too
          small.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
