// 2017 Mathematical Methods — Exam 1, Question 3 (4 marks).
// f : [-3, 0] → R, f(x) = (x+2)²(x-1) — expand the factorised form, then sketch f on its
// restricted domain. Question text transcribed from the original paper; the stem shows VCAA's
// own blank axes for part b, cropped from page 5 of the paper (nothing is pre-drawn on them).
// The sketched curve in part b's final row is this site's own answer on that grid — plotted
// with matplotlib (real graphing software, exact, not hand-waypointed), not cropped from
// anything VCAA printed. Solution is original; itute agrees (x³ + 3x² − 4; stationary points
// (−2, 0) and (0, −4)).
// Interactive (part b): interactives/meth-2017e1-q3b-flat-end — slide a tangent along f to see
// f'(x) = 3x(x+2) fall back to 0 at x = 0, with toggles for the two errors the examiner's report
// names (an inverted-parabola shape, and drawing the cubic over R).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import cubicSketchSrc from './meth-2017e1-q3-cubic-sketch.png'
import blankAxesSrc from './meth-2017e1-q3b-blank-axes.png'

const FlatEndWidget = lazyWidget(() => import('../interactives/meth-2017e1-q3b-flat-end'))

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well, although some students either did not fully expand the
      cubic or made notational errors by omitting the brackets on the quadratic. It should be
      noted that <Katex tex="x^2+4x+4(x-1)" /> is not equivalent to{' '}
      <Katex tex="x^3+4x^2+4x-x^2-4x-4" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 10, 43, 36],
  average: 1.6,
  comment: (
    <>
      Some very good graphs were drawn by students. Common errors included using{' '}
      <Katex tex="R" /> as the domain or graphs that looked more like an inverted parabola
      rather than a cubic, due to lack of recognition of a stationary point located at the{' '}
      <Katex tex="y" />-intercept.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^2(x-1) = (x^2+4x+4)(x-1)" />,
    reason: (
      <>
        A &ldquo;show that&rdquo; starts from one side and works to the other, so begin with the left side and
        never write the two sides as equal until you get there. Square the bracket first:{' '}
        <Katex tex="(x+2)^2=x^2+4x+4" />, and the middle term <Katex tex="2\times 2\times x=4x" /> is the one that
        is easy to drop. Keep the brackets round the quadratic, because the <em>whole</em> of it multiplies{' '}
        <Katex tex="(x-1)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= x^3+4x^2+4x-x^2-4x-4" />,
    reason: (
      <>
        Multiply each term of the quadratic by <Katex tex="x" />, then each term by <Katex tex="-1" />. Three
        terms times two terms gives six products, a quick count that none are missing.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{= x^3+3x^2-4}" />,
    reason: (
      <>
        Collect like terms: <Katex tex="4x^2-x^2=3x^2" />, and <Katex tex="4x-4x=0" />. The <Katex tex="x" /> terms
        cancel, which is why the given answer has no <Katex tex="x" /> term. This is the right-hand side. As required.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="(x+2)^2(x-1)=0" />
        <Katex display tex="x=-2 \ \text{ or } \ x=1" />
        <Katex display tex="x=1\notin[-3,0]" />
      </>
    ),
    reason: (
      <>
        Use the factorised form for <Katex tex="x" />-intercepts: a product is zero only when one of its factors
        is. Then check each solution against the domain. <Katex tex="x=1" /> is outside <Katex tex="[-3,0]" />, so
        it is not an intercept of <Katex tex="f" /> and must not appear on your graph. The factor{' '}
        <Katex tex="(x+2)" /> is squared, so <Katex tex="x=-2" /> is a repeated root: <Katex tex="(x+2)^2" /> never
        changes sign, so the curve touches the axis there instead of crossing.
      </>
    ),
  },
  {
    working: <Katex display tex="f(0)=0+0-4=-4" />,
    reason: (
      <>
        For the <Katex tex="y" />-intercept, use the expanded form from part a: at <Katex tex="x=0" /> every{' '}
        <Katex tex="x" /> term vanishes and only the constant <Katex tex="-4" /> is left.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = 3x^2+6x = 3x(x+2)" />,
    reason: (
      <>
        Stationary points are where the gradient is zero, so differentiate. The expanded form is the easy one to
        differentiate (no product rule), and factorising the result sets up <Katex tex="f'(x)=0" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f'(x)=0 \implies x=-2 \ \text{ or } \ x=0" />
        <Katex display tex="f(-2)=0,\quad f(0)=-4" />
      </>
    ),
    reason: (
      <>
        Both are in the domain. <Katex tex="(-2,0)" /> is the <Katex tex="x" />-intercept as well, which agrees
        with the repeated root. <Katex tex="(0,-4)" /> is the <Katex tex="y" />-intercept as well: <Katex tex="x=0" />{' '}
        is the right endpoint, but <Katex tex="f'(0)=0" />, so the curve arrives there <b>flat</b>. This is the
        stationary point the report says students commonly missed.
      </>
    ),
  },
  {
    working: <Katex display tex="f(-3)=(-1)^2(-4)=-4" />,
    reason: (
      <>
        The domain is closed, so find the left endpoint <Katex tex="(-3,-4)" /> and draw it as a closed dot. The
        question only asks for intercepts and stationary points, but labelling the endpoint shows exactly where the
        graph stops.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x)>0 \text{ on } (-3,-2),\quad f'(x)<0 \text{ on } (-2,0)" />,
    reason: (
      <>
        Now the shape. In <Katex tex="3x(x+2)" />: on <Katex tex="(-3,-2)" /> both <Katex tex="x" /> and{' '}
        <Katex tex="x+2" /> are negative, so <Katex tex="f'>0" /> and the curve rises; on <Katex tex="(-2,0)" />,{' '}
        <Katex tex="x<0" /> and <Katex tex="x+2>0" />, so <Katex tex="f'<0" /> and it falls. So <Katex tex="(-2,0)" />{' '}
        is a local maximum, and the curve falls from it to <Katex tex="(0,-4)" />, levelling off as it arrives. One
        extra point helps you draw the bend on VCAA&apos;s grid: <Katex tex="f(-1)=(1)^2(-2)=-2" />.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={cubicSketchSrc}
          alt="Cubic hump from (-3,-4) up to a touch point at (-2,0) and back down, levelling off at (0,-4) — this site's own sketch, not a VCAA diagram"
          className="w-full max-w-[300px]"
        />
      </div>
    ),
    reason: (
      <>
        Closed dots at <Katex tex="(-3,-4)" /> and <Katex tex="(0,-4)" />, touching the axis at{' '}
        <Katex tex="(-2,0)" />, and horizontal at <Katex tex="(0,-4)" />. The whole graph sits on or below the{' '}
        <Katex tex="x" />-axis: on <Katex tex="[-3,0]" />, <Katex tex="(x+2)^2\ge 0" /> and <Katex tex="x-1<0" />, so{' '}
        <Katex tex="f(x)\le 0" />.
      </>
    ),
  },
]

export default function MethodsQ3_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (4 marks)</p>
        <p>
          Let <Katex tex="f:[-3,0]\to R,\ f(x)=(x+2)^2(x-1)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Expansion" marks={1} statement={<>Show that <Katex tex="(x+2)^2(x-1) = x^3+3x^2-4" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Leave the brackets off the quadratic"
          source="Examiner's report"
          working={<Katex display tex="x^2+4x+4(x-1) = x^2+8x-4" />}
        >
          Without brackets, only the last term <Katex tex="4" /> multiplies <Katex tex="(x-1)" />; the{' '}
          <Katex tex="x^2" /> and <Katex tex="4x" /> are left alone. So the line as written is a quadratic, not the
          cubic you then go on to write, and the report points out that the two are not equivalent. Every line of a
          &ldquo;show that&rdquo; must equal the one before it, so the brackets are part of the proof. Quick check: a
          squared bracket times another bracket must give an <Katex tex="x^3" /> term, so a line that has lost its{' '}
          <Katex tex="x^3" /> has lost its brackets.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Cubic"
        marks={3}
        statement={
          <>
            <p className="mb-2">
              Sketch the graph of <Katex tex="f" /> on the axes below. Label the axis intercepts and any stationary points
              with their coordinates.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={blankAxesSrc}
                alt="Blank axes from the original 2017 VCAA exam paper: x from −4 to 2 and y from −6 to 6, dashed grid lines every 1 unit on x and every 2 units on y"
                className="w-full max-w-[340px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            A cubic with a squared factor, <Katex tex="y=(x-a)^2(x-b)" />, touches the <Katex tex="x" />-axis at{' '}
            <Katex tex="x=a" /> (a turning point) and crosses it at <Katex tex="x=b" />. With a positive{' '}
            <Katex tex="x^3" /> coefficient it rises to a local maximum, falls to a local minimum, then rises again. On
            a restricted domain you draw only the piece of that shape over the domain, with closed dots at the ends of a
            closed interval. Use whichever form suits the job: factorised for the <Katex tex="x" />-intercepts, expanded
            for the <Katex tex="y" />-intercept and the derivative.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the curve levels off at (0, −4) instead of running into it">
          <FlatEndWidget />
        </Explore>
        <WrongMethod
          title="Draw the whole cubic, through both x-intercepts"
          source="Examiner's report"
          working={<Katex display tex="x=-2 \ \text{ or } \ x=1" />}
        >
          This treats the domain as <Katex tex="R" />. The graph of <Katex tex="f" /> is only the piece of the cubic
          from <Katex tex="x=-3" /> to <Katex tex="x=0" />, so <Katex tex="(1,0)" /> is not on it and nothing is drawn
          to the right of the <Katex tex="y" />-axis or to the left of <Katex tex="x=-3" />. Before sketching, mark the
          two ends of the domain on your axes and draw nothing outside them.
        </WrongMethod>
        <WrongMethod
          title="Come down from (−2, 0) and run straight into (0, −4)"
          source="Examiner's report"
          working={<Katex display tex="f'(0)=3(0)(0+2)=0" />}
        >
          A curve drawn this way looks like an inverted parabola. The parabola <Katex tex="y=-(x+2)^2" /> also joins{' '}
          <Katex tex="(-2,0)" /> to <Katex tex="(0,-4)" />, but it is still falling there, with gradient{' '}
          <Katex tex="-4" />. For <Katex tex="f" />, the gradient at <Katex tex="x=0" /> is <Katex tex="0" />, so the
          curve must level off into the <Katex tex="y" />-axis. At every point you label, ask what <Katex tex="f'" /> is
          there, and make your pencil flat wherever it is zero.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
