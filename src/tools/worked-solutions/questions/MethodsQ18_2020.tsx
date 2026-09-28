// 2020 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 43% correct.
// Range of a hyperbola-type function on a domain split either side of its asymptote.
// Question text transcribed from the original paper (no diagram given — purely algebraic).
// Solution is original. Answer D checked with sympy (h(a) = b + 1, h(−a) = b − 1, h′(x) = −a/x² < 0)
// and against the report (D, with its example y = 2/x − 3) and itute (D, no working). The working
// follows the sketch-first route of the report and both video tutors (LMK, Mr Nie). Distractors
// verified: C is D with open brackets; A is the interval between the two endpoint heights; B and A
// are the gap the graph never enters (apart from A's endpoints), and E runs through it too.
// Interactive diagram (§15): interactives/meth-2020e2-mcq18-range.tsx draws h for sliders a and b
// (default the report's a = 2, b = −3) with its range as a bar of heights beside the graph, a toggle
// showing the tails of the full hyperbola that the domain cuts off (exactly the heights in the gap),
// and one trying option C's open brackets. This site's own explanatory figure; the report's graph
// is kept, cropped, in the report tab.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import reportGraphSrc from './meth-2020-mcq18-report-graph.png'

const RangeWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq18-range'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 8, C: 29, D: 43, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="h(x)=\dfrac ax+b" />
      <br />
      The coordinates of the endpoints are <Katex tex="(-a,\,-1+b)" /> and <Katex tex="(a,\,1+b)" />.
      <br />
      The range is <Katex tex="(-\infty,\,-1+b]\cup[b+1,\,\infty)" />.
      <br />
      An example, using the graph of <Katex tex="y=\dfrac2x-3" /> is shown below.
      <img src={reportGraphSrc} alt="The report's example: the graph of y = 2/x − 3 on [−2, 0) ∪ (0, 2], with endpoints (−a, −1 + b) and (a, 1 + b) labelled" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="h(x)=\frac{a}{x}+b, \quad a>0" />
        <Katex display tex="\text{asymptotes } x=0 \text{ and } y=b" />
      </>
    ),
    reason: (
      <>
        Sketch first: the range is the set of heights the graph reaches, and a sketch shows them at a glance.{' '}
        <Katex tex="y=\frac{a}{x}+b" /> is the hyperbola <Katex tex="y=\frac1x" /> dilated by factor <Katex tex="a" /> from
        the <Katex tex="x" />-axis and translated <Katex tex="b" /> units up (down, if <Katex tex="b<0" />). With{' '}
        <Katex tex="a>0" /> the two branches sit where <Katex tex="\frac1x" />&apos;s do: top right and bottom left of the
        point <Katex tex="(0,b)" /> where the asymptotes cross.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="h(a)=\frac{a}{a}+b=b+1" />
        <Katex display tex="h(-a)=\frac{a}{-a}+b=b-1" />
      </>
    ),
    reason: (
      <>
        Now the ends of the domain. The square brackets in <Katex tex="[-a,0)\cup(0,a]" /> mean <Katex tex="x=-a" /> and{' '}
        <Katex tex="x=a" /> are in the domain, so <Katex tex="(-a,\,b-1)" /> and <Katex tex="(a,\,b+1)" /> are points of the
        graph: closed dots. Notice the <Katex tex="a" />&apos;s cancel. The domain ends exactly where{' '}
        <Katex tex="\frac{a}{x}=\pm1" />, which is why none of the options mention <Katex tex="a" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x\in(0,a]:\ h(x) \text{ falls from } \infty \text{ to } b+1" />
        <Katex display tex="\implies h(x)\in[b+1,\,\infty)" />
      </>
    ),
    reason: (
      <>
        <Katex tex="h'(x)=-\frac{a}{x^2}<0" />, so each branch is decreasing. On the right-hand piece, as{' '}
        <Katex tex="x\to0^+" /> the fraction <Katex tex="\frac{a}{x}" /> grows without bound, so the graph climbs up the
        asymptote forever; at the other end it comes down to its closed end point, height <Katex tex="b+1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x\in[-a,0):\ h(x) \text{ falls from } b-1 \text{ to } -\infty" />
        <Katex display tex="\implies h(x)\in(-\infty,\,b-1]" />
      </>
    ),
    reason: (
      <>
        The left-hand piece starts at its closed end point, height <Katex tex="b-1" /> at <Katex tex="x=-a" />, and falls
        without bound as <Katex tex="x\to0^-" />. Nothing on either branch has a height strictly between{' '}
        <Katex tex="b-1" /> and <Katex tex="b+1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = (-\infty,\,b-1]\cup[b+1,\,\infty)}" />,
    reason: (
      <>
        Matches option <b>D</b>. Check with the report&apos;s example, <Katex tex="a=2" />, <Katex tex="b=-3" /> (
        <Katex tex="y=\frac2x-3" />): the ends are <Katex tex="(-2,-4)" /> and <Katex tex="(2,-2)" />, and the range is{' '}
        <Katex tex="(-\infty,-4]\cup[-2,\infty)" />, which is D with <Katex tex="b=-3" />. Option <b>C</b> has the right
        shape but open brackets, leaving out <Katex tex="b-1" /> and <Katex tex="b+1" />, which <Katex tex="h" /> does take
        at <Katex tex="x=-a" /> and <Katex tex="x=a" />. Options <b>A</b> and <b>B</b> are the gap itself: apart from
        A&apos;s two end values, <Katex tex="h" /> takes none of those heights. Option <b>E</b> runs through the gap too.
      </>
    ),
  },
]

export default function MethodsQ18_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="a\in(0,\infty)" /> and <Katex tex="b\in R" />.
          <br />
          Consider the function <Katex tex="h:[-a,0)\cup(0,a]\to R,\ h(x)=\dfrac{a}{x}+b" />.
          <br />
          The range of <Katex tex="h" /> is
        </p>
      }
      background={
        <Background title="Reading a Range from a Graph">
          <p>
            The range is the set of <Katex tex="y" />-values the graph actually reaches. Sketch the graph over the given
            domain <em>only</em>, then look sideways: which heights have a point of the graph level with them?
          </p>
          <p>
            An end point whose <Katex tex="x" /> is in the domain (a square bracket) is a point of the graph, so its height
            goes in the range with a square bracket. A branch that runs up or down an asymptote goes on for ever, and{' '}
            <Katex tex="\infty" /> always takes a round bracket.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="[b-1,\,b+1]" /> },
        { letter: 'B', content: <Katex tex="(b-1,\,b+1)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,\,b-1)\cup(b+1,\,\infty)" /> },
        { letter: 'D', content: <Katex tex="(-\infty,\,b-1]\cup[b+1,\,\infty)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[b-1,\,\infty)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The domain stops exactly where a/x = ±1, so the graph ends at heights b ± 1 and never visits the heights in between">
            <RangeWidget />
          </Explore>
          <WrongMethod
            title="Leave b − 1 and b + 1 out, with round brackets"
            source="29% chose C"
            working={
              <>
                <Katex display tex="\text{Range} = (-\infty,\,b-1)\cup(b+1,\,\infty)" />
                <Katex display tex="\text{(option C)}" />
              </>
            }
          >
            <p>
              The only <Katex tex="x" /> missing from the domain is <Katex tex="0" />, the vertical asymptote. There the
              graph has no end point at all: it runs off to <Katex tex="\pm\infty" />, which is why <Katex tex="\infty" />{' '}
              gets a round bracket. The other two ends, <Katex tex="x=-a" /> and <Katex tex="x=a" />, are in the domain
              (square brackets), so <Katex tex="h(-a)=b-1" /> and <Katex tex="h(a)=b+1" /> are values <Katex tex="h" />{' '}
              really takes.
            </p>
            <p>
              Next time, before reading off a range, mark each end of your sketch as a closed or open dot from the
              domain&apos;s brackets. Press <b>Try option C</b> in the diagram above.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The graph ends at heights b − 1 and b + 1, so the range is everything between them"
            source="13% chose A"
            working={
              <>
                <Katex display tex="h(-a)=b-1, \quad h(a)=b+1" />
                <Katex display tex="\implies \text{Range} = [b-1,\,b+1] \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              &ldquo;Between the end values&rdquo; only works for a graph with no break, such as a line on a closed
              interval. This graph breaks at <Katex tex="x=0" />, and each branch runs <em>away</em> from its end point: the
              right one up to <Katex tex="\infty" />, the left one down to <Katex tex="-\infty" />. The heights between{' '}
              <Katex tex="b-1" /> and <Katex tex="b+1" /> are exactly the ones it never reaches; the horizontal line{' '}
              <Katex tex="y=b" />, in the middle of A&apos;s interval, is the asymptote, which the graph never touches.
            </p>
            <p>Next time, sketch the graph over its domain before reading a range from its end points.</p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
