// 2020 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). x²e^(−x), its
// stationary points, asymptote and inflections, then the general family xⁿe^(−x) and how
// many inflections it has for each integer n. Question text transcribed from the original
// paper; part c's blank axes are cropped from page 16 of the paper at 300 dpi
// (spec-2020e2-q3c-blank-axes.png), and the sketch is this site's own matplotlib drawing of the
// answer on that grid (x −5 to 5, y −3 to 3, gridlines every 1). Answers checked with sympy
// (including a numerical count of sign changes of g'' for n = −4 … 9) and against the VCAA
// examination report and itute's solutions, which agree. Solution is original.
//
// Interactive diagrams: part c — spec-2020e2-q3c-bend (a tangent slid along the curve, which
// is coloured by concavity; a toggle redraws it on VCAA's grid to show the steep second-quadrant
// branch); part e.ii — spec-2020e2-q3eii-count (step n through the integers: the graph coloured
// by the sign of g'', a sign table of the factors of g'', a zoom on the origin, and the question's
// table filling in; a toggle tries "count the values n ± √n" and shows where it fails).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import blankAxesSrc from './spec-2020e2-q3c-blank-axes.png'
import sketchSrc from './spec-2020e2-q3c-sketch.png'

const BendWidget = lazyWidget(() => import('../interactives/spec-2020e2-q3c-bend'))
const CountWidget = lazyWidget(() => import('../interactives/spec-2020e2-q3eii-count'))

const EXAM_A: SAExaminerStats = {
  marks: [1, 7, 91],
  average: 1.9,
  comment: (
    <>
      Students handled this question very well. Students who did not score well stated the
      derivative only and did not give the coordinates of the stationary points.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 73],
  average: 0.7,
  comment: (
    <>
      Some students incorrectly gave an additional vertical asymptote such as{' '}
      <Katex tex="x=0" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [3, 11, 41, 45],
  average: 2.3,
  comment: (
    <>
      This question was done quite well, with the turning point almost universally correctly
      labelled and the points of inflection usually correctly labelled. However, students lost marks either for sketching a poor shape in the second
      quadrant or for incorrectly labelling points of inflection, including having the{' '}
      <Katex tex="x" />-value of the left-most point of inflection rounded to 0.58 instead of
      0.59.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>Students responded with a variety of correct forms for the second derivative, with the two above being the most common.</>,
}

const EXAM_EI: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Students generally handled this question well.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [84, 14, 2],
  average: 0.2,
  comment: (
    <>
      Some students gave intervals of real numbers for <Katex tex="n" />. The majority of
      responses indicated <Katex tex="n<0" /> gave zero points of inflection and{' '}
      <Katex tex="n=0" /> gave one point. However, very few students were able to distinguish
      between even and odd values of <Katex tex="n" /> when considering multiple points of
      inflection.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2e^{-x}" />,
    reason: <>A product of <Katex tex="x^2" /> and <Katex tex="e^{-x}" />, so the product rule. On CAS, <Cas fn="define">Define f(x)=x^2·e^(−x)</Cas> first: parts b. and c. use the same function.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f'(x) &= 2xe^{-x}+x^2\left(-e^{-x}\right) \\ &= \left(2x-x^2\right)e^{-x} \end{aligned}" />,
    reason: <>By the chain rule the derivative of <Katex tex="e^{-x}" /> is <Katex tex="-e^{-x}" />, which is where the minus sign comes from. Taking out the common factor <Katex tex="e^{-x}" /> now makes the next step easy.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0: \ x(2-x)e^{-x} = 0" />,
    reason: <><Katex tex="e^{-x}>0" /> for every <Katex tex="x" />, so it can never be the factor that is zero. Only <Katex tex="x(2-x)" /> can vanish.</>,
  },
  {
    working: <Katex display tex="x = 0 \text{ or } x = 2" />,
    reason: <>Because <Katex tex="e^{-x}>0" />, the sign of <Katex tex="f'" /> is the sign of <Katex tex="x(2-x)" />: negative, then positive, then negative. So the graph falls into a local minimum at <Katex tex="x=0" />, rises to a local maximum at <Katex tex="x=2" />, and falls again. That is the shape part c. needs.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\ 0) \ \text{ and } \ \left(2,\ \tfrac{4}{e^2}\right)}" />,
    reason: <>Coordinates, not just <Katex tex="x" />-values — the report notes students who did not score well stated the derivative only and did not give the coordinates. <Katex tex="\tfrac{4}{e^2}\approx0.54" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x\to\infty: \ f(x) = \frac{x^2}{e^x} \to 0^+" />,
    reason: <>Write <Katex tex="e^{-x}" /> as division by <Katex tex="e^x" />. The top grows like a power and the bottom grows exponentially, and the exponential always wins: <Katex tex="f(10)\approx0.0045" />, <Katex tex="f(20)\approx8\times10^{-7}" />. Since <Katex tex="f(x)\ge0" />, the curve comes down onto <Katex tex="y=0" /> from above.</>,
  },
  {
    working: <Katex display tex="x\to-\infty: \ x^2e^{-x}\to+\infty" />,
    reason: <>On the left both factors grow: <Katex tex="x^2\to\infty" /> and <Katex tex="e^{-x}=e^{|x|}\to\infty" />. Nothing levels off, so there is no asymptote on this side.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 0}" />,
    reason: <>One horizontal asymptote and nothing else. There is no vertical asymptote: <Katex tex="f(x)=\frac{x^2}{e^x}" /> never divides by zero because <Katex tex="e^x>0" />, so <Katex tex="f" /> is defined and finite at every real <Katex tex="x" />, including <Katex tex="x=0" />, where the graph passes through the origin.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f''(x) &= \left(2-2x\right)e^{-x}-\left(2x-x^2\right)e^{-x} \\ &= \left(x^2-4x+2\right)e^{-x} \end{aligned}" />,
    reason: <>A point of inflection is where the curve changes from bending up to bending down (or back), which is where <Katex tex="f''" /> changes sign. So differentiate part a.&apos;s answer once more, with the product rule again.</>,
  },
  {
    working: <Katex display tex="x^2-4x+2 = 0 \implies x = 2\pm\sqrt2" />,
    reason: <>So <Katex tex="x=0.5857\ldots" /> and <Katex tex="x=3.4142\ldots" />. Since <Katex tex="e^{-x}>0" />, the sign of <Katex tex="f''" /> is the sign of the upright parabola <Katex tex="x^2-4x+2" />: positive, negative, positive. It really does change sign at both roots, so both are points of inflection. (A zero of <Katex tex="f''" /> on its own is not enough; part e. turns on exactly that.) On CAS, <Cas fn="solve">solve(x^2−4x+2=0, x)</Cas> gives the same.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f\left(2-\sqrt2\right) &= 0.1910\ldots \\ f\left(2+\sqrt2\right) &= 0.3835\ldots \end{aligned}" />,
    reason: <>Rounding to two decimal places gives <Katex tex="(0.59,0.19)" /> and <Katex tex="(3.41,0.38)" /> — and <Katex tex="0.5857" /> rounds <em>up</em> to 0.59, the slip the report calls out.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="Graph of y = x²e^(−x) on VCAA's grid: falling steeply from the top left to a minimum at the origin, rising to the local maximum (2, 0.54), then decaying towards the x-axis, with the points of inflection (0.59, 0.19) and (3.41, 0.38) labelled"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: <>The second-quadrant branch climbs steeply off the top of the grid just left of <Katex tex="x=-1" /> (<Katex tex="f(-1)=e\approx2.72" />), so draw it steep, not flat; the report notes marks were lost for a poor shape there. The question asks for three labelled points: the local maximum and the two points of inflection.</>,
    more: <>Slide the tangent in the diagram below to see the curve change its bend at each inflection.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x^ne^{-x} \implies g'(x) = nx^{n-1}e^{-x}-x^ne^{-x}" />,
    reason: <>Product rule, keeping the index general. The power rule <Katex tex="\frac{d}{dx}\left(x^n\right)=nx^{n-1}" /> holds for every integer <Katex tex="n" />, negative ones included. On CAS, <Cas fn="define">Define g(x)=x^n·e^(−x)</Cas>, then apply the derivative template twice, <Cas fn="derivative">d/dx(d/dx(g(x)))</Cas>, and factor the result.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g''(x) &= n(n-1)x^{n-2}e^{-x}-nx^{n-1}e^{-x} \\ &\quad -nx^{n-1}e^{-x}+x^ne^{-x} \end{aligned}" />,
    reason: <>Differentiating each of the two terms; the middle contribution appears twice, which is where the <Katex tex="-2n" /> comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{g''(x) = x^{n-2}\left(x^2-2nx+n(n-1)\right)e^{-x}}" />,
    reason: <>Factoring out the lowest power. Leaving it expanded as <Katex tex="\left(n(n-1)x^{n-2}-2nx^{n-1}+x^n\right)e^{-x}" /> is equally acceptable — but the factored form is what makes part e. easy.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="g''(x) = 0, \ x\ne0 \implies x^2-2nx+n(n-1) = 0" />,
    reason: <>The <Katex tex="x^{n-2}" /> factor and <Katex tex="e^{-x}" /> are set aside, which is exactly what "non-zero values" signals.</>,
  },
  {
    working: <Katex display tex="x = \frac{2n\pm\sqrt{4n^2-4n(n-1)}}{2} = n\pm\sqrt{n}" />,
    reason: <>The discriminant collapses beautifully: <Katex tex="4n^2-4n^2+4n=4n" />. Completing the square is quicker still: <Katex tex="x^2-2nx+n(n-1)=(x-n)^2-n" />, so <Katex tex="(x-n)^2=n" />. That form also shows at a glance that there are no real solutions when <Katex tex="n<0" />, which part ii. needs.</>,
  },
  {
    working: <Katex display tex="\boxed{x = n-\sqrt n \ \text{ and } \ x = n+\sqrt n}" />,
    reason: <>Real only when <Katex tex="n\ge0" />; and <Katex tex="n-\sqrt n" /> is itself non-zero only for <Katex tex="n\ge2" />. (The report notes the restrictions were not required.)</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="g''(x) = x^{n-2}\left((x-n)^2-n\right)e^{-x}" />,
    reason: <>Part d.&apos;s answer with the square completed. A point of inflection needs <Katex tex="g''" /> to <em>change sign</em> at a point on the graph. <Katex tex="e^{-x}>0" /> never changes sign, so watch the other two factors: the quadratic changes sign at <Katex tex="n\pm\sqrt n" /> (when <Katex tex="n>0" />), and <Katex tex="x^{n-2}" /> can only change sign at <Katex tex="x=0" />. Test each kind of <Katex tex="n" /> in turn.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n<0: \ & (x-n)^2-n>0 \text{ for all } x \\ & x=0 \text{ is not in the domain of } g \end{aligned}" />,
    reason: <>With <Katex tex="n<0" />, <Katex tex="-n>0" />, so the quadratic is a square plus a positive number and has no roots. The only possible sign change is at <Katex tex="x=0" /> (for odd <Katex tex="n" />, <Katex tex="x^{n-2}" /> is an odd power), but <Katex tex="g(0)=0^n" /> is undefined for <Katex tex="n<0" />: <Katex tex="x=0" /> is a vertical asymptote, so there is no point on the graph there. For example <Katex tex="n=-1" />: <Katex tex="g''=x^{-3}\left(x^2+2x+2\right)e^{-x}" /> changes sign only across the asymptote. <b>0 points of inflection.</b></>,
  },
  {
    working: <Katex display tex="n=0: \ g(x)=e^{-x}, \ g''(x)=e^{-x}>0" />,
    reason: <>The formula <Katex tex="n\pm\sqrt n" /> gives <Katex tex="x=0" /> here, but at <Katex tex="n=0" /> the quadratic is just <Katex tex="x^2" />, and it cancels the <Katex tex="x^{-2}" /> in front. The curve bends up everywhere: <b>0 points of inflection</b>. So the 0 row is all of <Katex tex="n\le0" />.</>,
  },
  {
    working: <Katex display tex="n=1: \ g''(x) = x^{-1}\cdot x(x-2)e^{-x} = (x-2)e^{-x}" />,
    reason: <>The root <Katex tex="n-\sqrt n=0" /> cancels against <Katex tex="x^{n-2}=x^{-1}" />, leaving just <Katex tex="x=2" />, where <Katex tex="g''" /> goes from negative to positive. <b>1 point of inflection.</b></>,
  },
  {
    working: <Katex display tex="\begin{aligned} n=2,4,6,\ldots: \ & x^{n-2} \text{ is an even power,} \\ & \text{no sign change at } x=0 \end{aligned}" />,
    reason: <>For <Katex tex="n\ge2" />, <Katex tex="n-\sqrt n" /> and <Katex tex="n+\sqrt n" /> are distinct and positive, and each is a single root of the quadratic, so <Katex tex="g''" /> changes sign at both. At <Katex tex="x=0" />, <Katex tex="x^{n-2}\ge0" /> on both sides: even where <Katex tex="g''(0)=0" /> (<Katex tex="n\ge4" />), the origin is a minimum, not an inflection. <b>2 points of inflection</b>, e.g. <Katex tex="n=4" />: <Katex tex="g''=x^2(x-2)(x-6)e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} n=3,5,7,\ldots: \ & x^{n-2} \text{ is an odd power,} \\ & g'' \text{ changes sign at } x=0 \end{aligned}" />,
    reason: <>That adds the origin, which is on the graph since <Katex tex="g(0)=0" />, to the two points at <Katex tex="n\pm\sqrt n" />. As <Katex tex="g'(0)=0" /> too, it is a stationary point of inflection. <b>3 points of inflection</b>, e.g. <Katex tex="n=3" />: <Katex tex="g''=x\left(x^2-6x+6\right)e^{-x}" />.</>,
  },
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-[13.5px] border-collapse">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                Number of points of inflection
              </th>
              <th className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                Value(s) of <Katex tex="n" /> (where <Katex tex="n\in Z" />)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">0</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n\le0" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">1</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=1" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">2</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=2,4,6,\ldots" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">3</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=3,5,7,\ldots" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>The completed table. Only 2% of students scored both marks, and the report says very few distinguished between even and odd values of <Katex tex="n" />. Answer with integers, since <Katex tex="n\in Z" />: the report notes some students gave intervals of real numbers instead.</>,
  },
]

export default function SpecialistQ3_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          Let <Katex tex="f(x)=x^2e^{-x}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={2}
        statement={
          <>
            Find an expression for <Katex tex="f'(x)" /> and state the coordinates of the
            stationary points of <Katex tex="f(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            State the equation(s) of any asymptotes of <Katex tex="f(x)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Background title="What Makes a Vertical Asymptote">
          <p>
            The line <Katex tex="x=a" /> is a vertical asymptote when <Katex tex="f(x)\to\pm\infty" /> as{' '}
            <Katex tex="x\to a" />. Something has to blow up at a finite <Katex tex="x" />: usually division by zero (like{' '}
            <Katex tex="\frac1x" /> at 0) or <Katex tex="\log_e" /> of something heading to 0. A polynomial times an
            exponential has neither, so it has no vertical asymptotes.
          </p>
          <p>
            A steep curve is not an asymptote. Here <Katex tex="f(-1)=e\approx2.7" /> and{' '}
            <Katex tex="f(-2)=4e^2\approx30" />: very steep, but finite at every <Katex tex="x" />.
          </p>
        </Background>
        <WrongMethod
          title="There's a vertical asymptote at x = 0 as well"
          source="Examiner's report"
          working={<Katex display tex="\text{Asymptotes: } y=0 \text{ and } x=0" />}
        >
          <Katex tex="f(0)=0^2e^0=0" />, so the graph passes <em>through</em> the origin. It can&apos;t also shoot off to
          infinity there. The left branch is very steep, and on a CAS window it can look almost vertical, but it never
          blows up at a finite <Katex tex="x" />. Before writing <Katex tex="x=a" />, check that <Katex tex="f(x)" /> really
          becomes infinite as <Katex tex="x\to a" />; here <Katex tex="f(x)\to0" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes provided below, labelling the
            local maximum stationary point and all points of inflection with their
            coordinates, correct to two decimal places.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img loading="lazy" decoding="async"
                src={blankAxesSrc}
                alt="Blank axes with gridlines every 1, x from −5 to 5 and y from −3 to 3 — from the original 2020 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Slide the tangent: the curve bends up, then down, then up again">
          <BendWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g(x)=x^ne^{-x}" />, where <Katex tex="n\in Z" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Second Derivative"
        marks={1}
        statement={
          <>
            Write down an expression for <Katex tex="g''(x)" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Inflection Points"
        marks={1}
        statement={
          <>
            Find the non-zero values of <Katex tex="x" /> for which{' '}
            <Katex tex="g''(x)=0" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Inflection Count"
        marks={2}
        statement={
          <>
            Complete the following table by stating the value(s) of <Katex tex="n" /> for which
            the graph of <Katex tex="g(x)" /> has the given number of points of inflection.
            <table className="mt-2 text-[13px] border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 font-normal text-left">Number of points of inflection</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 font-normal text-left">Value(s) of <Katex tex="n" /> (where <Katex tex="n\in Z" />)</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3].map((k) => (
                  <tr key={k}>
                    <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">{k}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
        examinerReport={EXAM_EII}
      >
        <Background title="What Counts as a Point of Inflection">
          <p>
            A point of inflection is a point <em>on the graph</em> where the concavity changes, so the second derivative
            changes sign as you pass through it. Two things follow. <Katex tex="g''(a)=0" /> is not enough on its own:{' '}
            <Katex tex="y=x^4" /> has <Katex tex="y''=12x^2" />, zero at the origin but positive on both sides, so the
            origin is a minimum. And the point has to exist: a sign change across a vertical asymptote doesn&apos;t count.
          </p>
          <p>
            A factor <Katex tex="x^k" /> changes sign at 0 when <Katex tex="k" /> is odd (like <Katex tex="x^3" />) and
            doesn&apos;t when <Katex tex="k" /> is even (like <Katex tex="x^2" />). This whole part rests on that.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EII} />
        <Explore title="Why odd n gets an extra inflection: step n and watch the sign of g''">
          <CountWidget />
        </Explore>
        <WrongMethod
          title="n = 0 gives one point of inflection, at x = n ± √n = 0"
          source="Examiner's report"
          working={<Katex display tex="n=0: \ x=0\pm\sqrt0=0 \implies 1 \text{ point}" />}
        >
          At <Katex tex="n=0" />, <Katex tex="g(x)=x^0e^{-x}=e^{-x}" /> and <Katex tex="g''(x)=e^{-x}" />, which is positive
          everywhere, including at 0. The &ldquo;root&rdquo; <Katex tex="x=0" /> came from the quadratic{' '}
          <Katex tex="x^2" />, which cancels the <Katex tex="x^{-2}" /> in front. Whenever a formula hands you a candidate,
          check that <Katex tex="g''" /> actually changes sign there. In the diagram, set <Katex tex="n=0" /> with
          &ldquo;Just count x = n ± √n&rdquo; on.
        </WrongMethod>
        <WrongMethod
          title="Every n ≥ 2 gives two points of inflection, at n ± √n"
          source="Examiner's report"
          working={<Katex display tex="n\ge2: \ x=n\pm\sqrt n \implies 2 \text{ points}" />}
        >
          Right for even <Katex tex="n" />, wrong for odd <Katex tex="n" />. When <Katex tex="n\ge3" /> is odd,{' '}
          <Katex tex="x^{n-2}" /> is an odd power, so <Katex tex="g''" /> also changes sign at <Katex tex="x=0" />. For{' '}
          <Katex tex="n=3" />, <Katex tex="g''(x)=x\left(x^2-6x+6\right)e^{-x}" /> is negative just left of 0 and positive
          just right of it. That makes <Katex tex="(0,0)" /> a third, stationary, point of inflection. The catch: after
          solving <Katex tex="g''=0" />, look at every factor, including the power of <Katex tex="x" /> set aside in e.i.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
