// 2018 Specialist Mathematics — Exam 1, Question 5 (4 marks). Sketch f(x) = (x+1)/(x²−4).
// Question text transcribed from the original paper; the stem shows VCAA's blank axes, cropped
// from page 5 of the paper (spec-2018e1-q5-blank-axes.png). The finished curve is this site's own
// answer-sketch (matplotlib), drawn to VCAA's exact printed grid (−4 to 4 on both axes, gridlines
// every 0.5, labels every 2) and living in the solution rather than the stem (guide §7). Features
// checked with sympy (f′(x) = −(x²+2x+4)/(x²−4)² < 0 everywhere; f″ = 0 only at x ≈ −0.362, a
// non-stationary inflection on the middle branch; partial fractions 1/(4(x+2)) + 3/(4(x−2))), and
// against the VCAA examination report and itute's answers (which agree). Solution is original.
// Interactives: spec-2018e1-q5-signs (sign chart and near-asymptote behaviour on VCAA's grid),
// spec-2018e1-q5-ends (zoom out: y = 0 is about the ends, and the curve may cross it), and
// spec-2018e1-q5-no-flat-spot (sum of two falling hyperbolas, so no stationary point of inflection).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './spec-2018e1-q5-sketch.png'
import blankAxesSrc from './spec-2018e1-q5-blank-axes.png'

const SignsWidget = lazyWidget(() => import('../interactives/spec-2018e1-q5-signs'))
const EndsWidget = lazyWidget(() => import('../interactives/spec-2018e1-q5-ends'))
const NoFlatSpotWidget = lazyWidget(() => import('../interactives/spec-2018e1-q5-no-flat-spot'))

const EXAM: SAExaminerStats = {
  marks: [9, 21, 35, 20, 15],
  average: 2.1,
  comment: (
    <>
      Most students realised that <Katex tex="x=-2" /> and <Katex tex="x=2" /> were vertical
      asymptotes, although the horizontal asymptote <Katex tex="y=0" /> was often not stated.
      Students who found the axis intercepts were not always able to position them correctly
      on the axes. Some students showed a stationary point of inflection on their graph or
      were missing the outer branches.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x+1}{x^2-4} = \frac{x+1}{(x-2)(x+2)}" />,
    reason: (
      <>
        Factorise the denominator first. Its zeros are the only <Katex tex="x" />-values the
        function can&apos;t take, so they are the candidates for vertical asymptotes, and together
        with the numerator&apos;s zero they split the axis into the regions you will test for sign.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x^2-4=0 &\implies x=\pm 2 \\ \text{vertical asymptotes: } &\boxed{x=-2} \text{ and } \boxed{x=2} \end{aligned}"
      />
    ),
    reason: (
      <>
        Check the numerator at each one: it is <Katex tex="-1" /> at <Katex tex="x=-2" /> and{' '}
        <Katex tex="3" /> at <Katex tex="x=2" />, not <Katex tex="0" />. A non-zero number divided by
        something tiny blows up, so these are genuine asymptotes. (If the numerator were also{' '}
        <Katex tex="0" /> there, the factor would cancel and leave a hole instead.)
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \lim_{x\to\pm\infty}\frac{x+1}{x^2-4} &= \lim_{x\to\pm\infty}\frac{\frac1x+\frac1{x^2}}{1-\frac4{x^2}} = 0 \\ \text{horizontal asymptote: } &\boxed{y=0} \end{aligned}"
      />
    ),
    reason: (
      <>
        Dividing top and bottom by <Katex tex="x^2" /> shows it: the top shrinks to <Katex tex="0" />{' '}
        while the bottom tends to <Katex tex="1" />. The quick check is degrees: the denominator&apos;s
        is higher, so the asymptote is <Katex tex="y=0" />. The report says this asymptote was{' '}
        <em>often not stated</em>. It lies along the <Katex tex="x" />-axis, so it is easy to
        overlook, but &ldquo;any asymptotes&rdquo; includes it.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x)=0 \implies x+1=0 \implies \boxed{(-1,\ 0)}" />,
    reason: (
      <>
        A fraction is zero exactly when its numerator is zero (and its denominator isn&apos;t). The
        curve crosses the asymptote <Katex tex="y=0" /> here, which is allowed: a horizontal
        asymptote only describes the ends.
      </>
    ),
  },
  {
    working: <Katex display tex="f(0) = \frac{1}{-4} = -\frac14 \implies \boxed{\left(0,\ -\frac14\right)}" />,
    reason: (
      <>
        Substitute <Katex tex="x=0" /> for the vertical-axis intercept. Position it with care: the
        grid lines are <Katex tex="0.5" /> apart, so <Katex tex="-\tfrac14" /> is only half a square
        below the origin. The report notes intercepts that were found but not positioned correctly.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(x)>0 &\text{ for } -2<x<-1 \text{ and } x>2 \\ f(x)<0 &\text{ for } x<-2 \text{ and } -1<x<2 \end{aligned}"
      />
    ),
    reason: (
      <>
        No need to plot points. The values <Katex tex="x=-2,\ -1,\ 2" /> split the axis into four
        regions, and in each one the signs of <Katex tex="x+1" />, <Katex tex="x+2" /> and{' '}
        <Katex tex="x-2" /> are fixed, so the sign of <Katex tex="f" /> is too. Near an asymptote the
        sign tells you which way the branch runs off: just right of <Katex tex="x=-2" />,{' '}
        <Katex tex="f \approx \frac{-1}{\text{tiny negative}}" />, which is huge and positive, so the
        middle branch starts at <Katex tex="+\infty" />.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={sketchSrc} alt="Graph of f(x) = (x+1)/(x²−4): three branches, with vertical asymptotes at x = ±2 and horizontal asymptote y = 0, crossing the axes at (−1, 0) and (0, −1/4)" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: (
      <>
        One branch for each interval of the domain <Katex tex="R\setminus\{-2,\ 2\}" />, and all three
        must appear. The report notes graphs missing the outer ones. Left: from just below{' '}
        <Katex tex="y=0" /> down to <Katex tex="-\infty" /> at <Katex tex="x=-2" />. Middle: from{' '}
        <Katex tex="+\infty" /> through <Katex tex="(-1,0)" /> and{' '}
        <Katex tex="\left(0,-\tfrac14\right)" /> down to <Katex tex="-\infty" /> at{' '}
        <Katex tex="x=2" />. Right: from <Katex tex="+\infty" /> down to just above{' '}
        <Katex tex="y=0" />. Every branch is strictly decreasing, so there is no flat spot to draw.
      </>
    ),
  },
]

export default function SpecialistQ5_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          Sketch the graph of <Katex tex="f(x)=\dfrac{x+1}{x^2-4}" /> on the axes provided below,
          labelling any asymptotes with their equations and any intercepts with their
          coordinates.
        </p>
        <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={blankAxesSrc}
            alt="Blank axes from the original 2018 VCAA exam paper: x and y from −4 to 4, grid lines every 0.5, numbered every 2"
            className="w-full max-w-[360px]"
          />
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The marks for a sketch go on identifiable features, and the question names
            them: every asymptote with its equation, and every intercept with its
            coordinates. Work through them systematically (two vertical asymptotes, one
            horizontal, two intercepts) rather than trying to draw first and annotate after.
          </p>
          <p>
            For a rational function, the vertical asymptotes come from the zeros of the
            denominator, and the horizontal asymptote from comparing degrees: a higher-degree
            denominator gives <Katex tex="y=0" />; equal degrees give <Katex tex="y" /> equal to the
            ratio of the leading coefficients.
          </p>
          <p>
            No calculus is needed. A sign test in each of the four regions the asymptotes and
            the <Katex tex="x" />-intercept cut the axis into tells you whether each branch is above
            or below the axis, and so which way it runs off at each asymptote.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why each branch shoots up or down">
          <SignsWidget />
        </Explore>
        <Explore title="Why y = 0 is an asymptote even though the curve crosses it">
          <EndsWidget />
        </Explore>
        <Explore title="Why the middle branch never flattens out">
          <NoFlatSpotWidget />
        </Explore>
        <WrongMethod
          title="Only the vertical asymptotes need labelling"
          source="Examiner's report"
          working={<Katex tex="x=-2,\quad x=2" />}
        >
          The question asks for <em>any</em> asymptotes, and there is a third: as{' '}
          <Katex tex="x \to \pm\infty" /> the <Katex tex="x^2" /> in the denominator beats the{' '}
          <Katex tex="x" /> on top, so <Katex tex="f(x) \to 0" />. It is easy to miss because it lies
          along the <Katex tex="x" />-axis and the curve crosses it at <Katex tex="(-1,0)" />. To
          catch it, always ask what happens as <Katex tex="x\to\pm\infty" />, and write{' '}
          <Katex tex="y=0" /> on the sketch.
        </WrongMethod>
        <WrongMethod
          title="The middle branch flattens out as it crosses the axis"
          source="Examiner's report"
          working={<Katex tex="f'(x) = -\frac{x^2+2x+4}{(x^2-4)^2} = -\frac{(x+1)^2+3}{(x^2-4)^2} < 0" />}
        >
          A stationary point of inflection needs <Katex tex="f'(x)=0" />, but completing the square
          shows the numerator <Katex tex="(x+1)^2+3" /> is never zero, so the gradient is always
          negative. The middle branch does change from concave up to concave down (near{' '}
          <Katex tex="x \approx -0.36" />) but it is still falling there, with gradient about{' '}
          <Katex tex="-0.23" />. Catch it by asking whether anything forces the curve to level off:
          here nothing does.
        </WrongMethod>
        <WrongMethod
          title="The graph is the curve between the asymptotes"
          source="Examiner's report"
          working={<Katex tex="f(-3) = -\frac25, \quad f(3) = \frac45" />}
        >
          The domain is <Katex tex="R\setminus\{-2,\ 2\}" />, so every <Katex tex="x" /> outside{' '}
          <Katex tex="[-2, 2]" /> has a point on the graph too: these two values alone show a branch
          below the axis on the left and one above it on the right. Two vertical asymptotes cut the
          graph into three pieces; check that your sketch has all three.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
