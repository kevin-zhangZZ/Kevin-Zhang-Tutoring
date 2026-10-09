// 2017 Mathematical Methods — Exam 1, Question 7 (5 marks).
// Composite functions: when does a composition exist, and what is its range. Parts (b)(ii)
// and (c) were answered poorly (80% and 70% of students scored zero).
// Question text transcribed from the original paper (no diagram given); the parabola sketch
// in part b.i. is this site's own explanatory figure, plotted with matplotlib. Answers verified
// with sympy, and agree with the VCAA report, itute and LMKMaths' video walkthrough. Solution
// is original.
// Interactive diagrams (§15): part b.i. slides the end c of g's domain and shows the range of g
// spilling below 0 as soon as c passes −3, with a button for the tempting c = −1
// (interactives/meth-2017e1-q7bi-domain.tsx); parts b.ii. and c. follow one x through the chain
// x → inner function → u → f → y on f's graph, showing which inputs f is actually fed
// (interactives/meth-2017e1-q7bii-chain.tsx, and meth-2017e1-q7c-chain.tsx, which reuses it with
// h, a comparison with g, and a test of the wrong answer [1, ∞)).
// Common mistakes: a. — brackets (the report's comment) and [0, ∞) from ignoring the stated
// domain (a student on the ATAR Notes 2017 Methods Exam 1 discussion thread, Nov 2017, said they
// "forgot about the restriction and put the range as [0, ∞)"); b.i. — c = −1, the other root
// (asked on the same thread); b.ii. — √((x+2)²) = x + 2, giving (−∞, −1] (no source claimed;
// shown because it is the slip the rule-based check invites); c. — carrying over part b.ii.'s
// "range of f" shortcut (no source claimed; the report's b.ii. comment says "in this case", and
// it is the contrast the question is built on).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import parabolaSrc from './meth-2017e1-q7-parabola.png'

const DomainWidget = lazyWidget(() => import('../interactives/meth-2017e1-q7bi-domain'))
const ChainGWidget = lazyWidget(() => import('../interactives/meth-2017e1-q7bii-chain'))
const ChainHWidget = lazyWidget(() => import('../interactives/meth-2017e1-q7c-chain'))

const EXAM_A: SAExaminerStats = {
  marks: [35, 65],
  average: 0.6,
  comment: <>Some students made incorrect use of square or round brackets.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [53, 18, 29],
  average: 0.4,
  comment: <>Students who successfully solved this question used the equation, a graph or both.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Since <Katex tex="(-\infty,-3]" /> is the domain of{' '}
      <Katex tex="g" />, the range of <Katex tex="g" /> is the same as the domain of{' '}
      <Katex tex="f" />. Hence, in this case, the range of <Katex tex="f(g(x))" /> is the same
      as the range of <Katex tex="f" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      Domain of <Katex tex="f(h(x))" /> is <Katex tex="R" />, and{' '}
      <Katex tex="f(h(x))=\sqrt{x^2+4}" />. Most students could identify the composite
      function but struggled with determining its range.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x\ge0 \implies x+1\ge1" />,
    reason: <>For a range on a restricted domain, start from what <Katex tex="x" /> is allowed to be and push it through the rule one operation at a time. The domain is <Katex tex="[0,\infty)" /> — stated in the question, and narrower than the implied domain <Katex tex="[-1,\infty)" /> that <Katex tex="\sqrt{x+1}" /> would allow on its own.</>,
  },
  {
    working: <Katex display tex="\sqrt{x+1}\ge\sqrt{1}=1" />,
    reason: <>Square root is increasing (a bigger input always gives a bigger output), so taking the root keeps the <Katex tex="\ge" />. In pictures: <Katex tex="y=\sqrt{x}" /> shifted 1 left would start at <Katex tex="(-1,0)" />, but the domain cuts it off at <Katex tex="x=0" />, so the graph starts at <Katex tex="(0,1)" /> and rises forever.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f)=[1,\infty)}" />,
    reason: <>Square bracket at <Katex tex="1" /> because <Katex tex="f(0)=1" /> is actually reached; round bracket at <Katex tex="\infty" /> because infinity never is. The report notes some students made incorrect use of square or round brackets. Check: <Katex tex="f(3)=2" /> and <Katex tex="f(8)=3" />, both at least <Katex tex="1" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{dom}(f)=[0,\infty)" />
        <Katex display tex="\text{need } g(x)\ge0 \text{ for all } x\in(-\infty,c]" />
      </>
    ),
    reason: <>Translate the condition into something you can check. &ldquo;The range of <Katex tex="g" /> is a subset of the domain of <Katex tex="f" />&rdquo; means every output of <Katex tex="g" /> must be a number <Katex tex="f" /> accepts. That is exactly what makes <Katex tex="f(g(x))" /> possible, since <Katex tex="g" />&apos;s outputs are fed into <Katex tex="f" />. Use the <em>stated</em> domain <Katex tex="[0,\infty)" />, not the <Katex tex="[-1,\infty)" /> that the square root alone would allow.</>,
  },
  {
    working: <Katex display tex="g(x)=x^2+4x+3=(x+1)(x+3)" />,
    reason: <>Factorise to find where <Katex tex="g" /> changes sign: <Katex tex="x" />-intercepts <Katex tex="-3" /> and <Katex tex="-1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{turning point at } x=-2" />
        <Katex display tex="g(-2)=4-8+3=-1" />
      </>
    ),
    reason: <>The turning point is halfway between the roots, at <Katex tex="x=-2" />. So between <Katex tex="-3" /> and <Katex tex="-1" /> the parabola dips below the <Katex tex="x" />-axis, down to <Katex tex="-1" />, and those negative outputs are the danger.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={parabolaSrc}
          alt="This site's sketch of the parabola y = x squared plus 4x plus 3 with x-intercepts at (−3, 0) and (−1, 0) and turning point (−2, −1); the branch to the left of x = −3, where the parabola is at or above the x-axis, is drawn thicker in orange"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>A quick sketch shows the whole problem. The domain <Katex tex="(-\infty,c]" /> starts far out on the left, where <Katex tex="g" /> is large and positive, and runs right until it stops at <Katex tex="c" />. The report notes that students who solved this used the equation, a graph or both.</>,
  },
  {
    working: <Katex display tex="g(x)\ge0 \iff x\le-3 \ \text{ or } \ x\ge-1" />,
    reason: <>An upright parabola is on or above the axis outside its roots, and below it between them.</>,
  },
  {
    working: <Katex display tex="(-\infty,c]\subseteq(-\infty,-3] \implies c\le-3" />,
    reason: <>The whole domain has to sit where <Katex tex="g\ge0" />. A left-hand interval <Katex tex="(-\infty,c]" /> can&apos;t jump over the gap <Katex tex="(-3,-1)" />: as soon as <Katex tex="c" /> passes <Katex tex="-3" />, the domain includes <Katex tex="x" />-values just right of <Katex tex="-3" />, where <Katex tex="g" /> is negative. So only the left piece <Katex tex="x\le-3" /> is usable; the right piece <Katex tex="x\ge-1" /> can&apos;t be reached without passing through the dip.</>,
  },
  {
    working: <Katex display tex="\boxed{c=-3}" />,
    reason: <>The largest value allowed, and it satisfies <Katex tex="c<0" />. Check: on <Katex tex="(-\infty,-3]" />, <Katex tex="g" /> falls from very large values down to <Katex tex="g(-3)=0" />, so its range is <Katex tex="[0,\infty)" />, inside <Katex tex="\text{dom}(f)" />. Push <Katex tex="c" /> to <Katex tex="-2.5" /> and <Katex tex="g(-2.5)=-0.75" /> is not in <Katex tex="[0,\infty)" />.</>,
    more: <>Slide <Katex tex="c" /> yourself in the diagram below.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dom}(g)=(-\infty,-3]" />,
    reason: <>Start at the beginning of the chain. <Katex tex="f(g(x))" /> takes <Katex tex="x" />, puts it into <Katex tex="g" />, then puts <Katex tex="g" />&apos;s output into <Katex tex="f" />. So the <Katex tex="x" />-values are exactly <Katex tex="g" />&apos;s domain, with <Katex tex="c=-3" /> from part b.i.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=[0,\infty)" />,
    reason: <>What does <Katex tex="g" /> hand over to <Katex tex="f" />? On <Katex tex="(-\infty,-3]" /> we are left of the turning point <Katex tex="x=-2" />, so <Katex tex="g" /> is decreasing: it takes the value <Katex tex="0" /> at <Katex tex="x=-3" /> and grows without bound as <Katex tex="x\to-\infty" />. Every value from <Katex tex="0" /> up is hit exactly once.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=[0,\infty)=\text{dom}(f)" />,
    reason: <>The same set: <Katex tex="g" /> hands <Katex tex="f" /> every input <Katex tex="f" /> accepts, with none missing. That is no accident, since part b.i chose <Katex tex="c" /> to make the fit exact. Careful: <Katex tex="[0,\infty)" /> is the <em>middle</em> of the chain (what goes into <Katex tex="f" />), not the answer.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(g(x))=\sqrt{x^2+4x+4}" />
        <Katex display tex="=\sqrt{(x+2)^2}" />
        <Katex display tex="x\le-3 \implies x+2\le-1<0" />
        <Katex display tex="\implies f(g(x))=-(x+2)\ge1" />
      </>
    ),
    reason: <>A check from the rule itself: <Katex tex="f(g(x))=\sqrt{g(x)+1}" />, and <Katex tex="g(x)+1" /> is a perfect square. Careful: <Katex tex="\sqrt{(x+2)^2}" /> is not simply <Katex tex="x+2" />, because a square root is never negative and here <Katex tex="x+2" /> is. For a negative number <Katex tex="a" />, <Katex tex="\sqrt{a^2}=-a" /> (try <Katex tex="a=-3" />: <Katex tex="\sqrt9=3" />), so <Katex tex="f(g(x))=-(x+2)" />, which is at least <Katex tex="1" />, with equality at <Katex tex="x=-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(g(x)))=\text{ran}(f)=[1,\infty)}" />,
    reason: <>Because <Katex tex="g" /> delivers <em>all</em> of the domain of <Katex tex="f" />, the composite reaches everything <Katex tex="f" /> can reach: part a&apos;s answer, with no new work, and the check above agrees. This only works because <Katex tex="\text{ran}(g)" /> is the <em>whole</em> of <Katex tex="\text{dom}(f)" /> (the report&apos;s &ldquo;in this case&rdquo;); part c is the counterexample.</>,
    more: <>Follow <Katex tex="x" /> through both functions in the diagram below.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(h)=[3,\infty) \subseteq [0,\infty)=\text{dom}(f)" />,
    reason: <>First check the composite exists: the same test as part b.i. Since <Katex tex="x^2\ge0" />, <Katex tex="h(x)=x^2+3\ge3" /> for all real <Katex tex="x" />, and <Katex tex="[3,\infty)" /> sits inside the domain of <Katex tex="f" />, so <Katex tex="f(h(x))" /> is defined for every <Katex tex="x\in R" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(h(x)) = \sqrt{(x^2+3)+1}" />
        <Katex display tex="= \sqrt{x^2+4}" />
      </>
    ),
    reason: <>Substitute <Katex tex="h(x)" /> for the input of <Katex tex="f(u)=\sqrt{u+1}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x^2\ge0 \implies x^2+4\ge4" />
        <Katex display tex="\implies \sqrt{x^2+4}\ge\sqrt4=2" />
      </>
    ),
    reason: <>The same method as part a: start from what you know about <Katex tex="x" /> and push it through the rule. <Katex tex="x^2" /> is smallest (<Katex tex="0" />) at <Katex tex="x=0" />, so the inside is smallest at <Katex tex="4" /> and the root at <Katex tex="2" />. As <Katex tex="|x|" /> grows the value grows without bound. The report notes most students could identify the composite function but struggled with determining its range, so this is the step to take slowly.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(h(x)))=[2,\infty)}" />,
    reason: <>Square bracket: <Katex tex="2" /> is reached, at <Katex tex="x=0" />. This is <em>not</em> the range of <Katex tex="f" />. Here <Katex tex="h" /> only feeds <Katex tex="f" /> the inputs from <Katex tex="3" /> up, so the outputs start at <Katex tex="f(3)=2" />, not at <Katex tex="f(0)=1" />. That is the difference between this part and part b.ii. Check: <Katex tex="f(h(1))=\sqrt5\approx2.24" />, which is at least <Katex tex="2" />.</>,
  },
]

export default function MethodsQ7_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Let <Katex tex="f:[0,\infty)\to R" />, <Katex tex="f(x)=\sqrt{x+1}" />.
        </p>
      </div>

      <DetailOnly>
        <div className="text-[13px] leading-relaxed">
          <Background title="Before You Start">
            <p>
              Picture a composite as two machines in a row: <Katex tex="x" /> goes into{' '}
              <Katex tex="g" />, and whatever comes out is fed into <Katex tex="f" />. So{' '}
              <Katex tex="f(g(x))" /> exists only when{' '}
              <Katex tex="\text{ran}(g)\subseteq\text{dom}(f)" />: every output of the inner
              function has to be something the outer function can accept.
            </p>
            <p>
              The range of the composite then depends on <em>how much</em> of{' '}
              <Katex tex="\text{dom}(f)" /> the inner function delivers. If it hands over all of
              it, the composite has the same range as <Katex tex="f" /> (part b.ii). If it hands
              over only part of it, the composite reaches less (part c). The whole question is that
              one distinction, asked twice.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Range" marks={1} statement={<>State the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Get the brackets the wrong way round"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\text{ran}(f)=(1,\infty)" />
              <Katex display tex="\text{or}\quad \text{ran}(f)=[1,\infty]" />
            </>
          }
        >
          A round bracket says the end value is <em>not</em> reached; a square bracket says it is.
          Since <Katex tex="x=0" /> is in the domain (square bracket in <Katex tex="[0,\infty)" />),{' '}
          <Katex tex="f(0)=1" /> is an actual output, so <Katex tex="1" /> belongs in the range:{' '}
          <Katex tex="[1" />. Infinity is not a number and is never reached, so it always takes a
          round bracket: <Katex tex="\infty)" />. The check: substitute each end of the domain and
          ask whether that value really comes out.
        </WrongMethod>
        <WrongMethod
          title="A square root is never negative, so ran f = [0, ∞)"
          source="ATAR Notes forum"
          working={
            <>
              <Katex display tex="\sqrt{x+1}\ge0" />
              <Katex display tex="\implies \text{ran}(f)=[0,\infty)" />
            </>
          }
        >
          <Katex tex="[0,\infty)" /> is the range of <Katex tex="\sqrt{x+1}" /> on its{' '}
          <em>implied</em> domain <Katex tex="[-1,\infty)" />, where the output <Katex tex="0" />{' '}
          comes from <Katex tex="x=-1" />. But this <Katex tex="f" /> is defined on{' '}
          <Katex tex="[0,\infty)" />, so <Katex tex="x=-1" /> is not allowed: the smallest input is{' '}
          <Katex tex="0" /> and the smallest output is <Katex tex="f(0)=1" />. The check: before
          finding a range, read the domain in the function&apos;s definition and substitute its
          endpoint.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Let <Katex tex="g:(-\infty,c]\to R" />, <Katex tex="g(x)=x^2+4x+3" />, where{' '}
          <Katex tex="c<0" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Composite Function"
        marks={2}
        statement={
          <>
            Find the largest possible value of <Katex tex="c" /> such that the range of{' '}
            <Katex tex="g" /> is a subset of the domain of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Why c stops at −3: go any further right and g has negative outputs, which f can't accept">
          <DomainWidget />
        </Explore>
        <WrongMethod
          title="Both roots make g(c) = 0, so take the larger one: c = −1"
          source="ATAR Notes forum"
          working={
            <>
              <Katex display tex="x^2+4x+3=0" />
              <Katex display tex="\implies x=-3 \text{ or } x=-1" />
              <Katex display tex="\text{largest root} \implies c=-1" />
            </>
          }
        >
          <Katex tex="g(-1)=0" /> is fine, but the range of <Katex tex="g" /> depends on{' '}
          <em>every</em> <Katex tex="x" /> in the domain <Katex tex="(-\infty,-1]" />, not just the
          endpoint. That interval contains the whole dip between the roots, including{' '}
          <Katex tex="x=-2" />, where <Katex tex="g(-2)=-1" />. So with <Katex tex="c=-1" /> the
          range is <Katex tex="[-1,\infty)" />, which is not a subset of <Katex tex="[0,\infty)" />.
          The check: sketch <Katex tex="g" /> over the whole domain and make sure no part of it lies
          below the <Katex tex="x" />-axis. Press &ldquo;c = −1&rdquo; in the diagram above to see it.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Range"
        marks={1}
        statement={
          <>
            For the value of <Katex tex="c" /> found in <strong>part b.i.</strong>, state the
            range of <Katex tex="f(g(x))" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Follow x through both functions: g hands f every input it accepts, so f(g(x)) reaches all of f's range">
          <ChainGWidget />
        </Explore>
        <WrongMethod
          title="The square and the square root cancel, so f(g(x)) = x + 2"
          working={
            <>
              <Katex display tex="f(g(x))=\sqrt{(x+2)^2}=x+2" />
              <Katex display tex="x\le-3 \implies x+2\le-1" />
              <Katex display tex="\text{ran}(f(g(x)))=(-\infty,-1]" />
            </>
          }
        >
          A square root whose range is all negative numbers is an instant red flag: a square root is
          never negative. <Katex tex="\sqrt{a^2}=a" /> only when <Katex tex="a\ge0" />; when{' '}
          <Katex tex="a" /> is negative it is <Katex tex="-a" />. Here <Katex tex="x+2\le-1" /> is
          negative, so <Katex tex="\sqrt{(x+2)^2}=-(x+2)\ge1" />, giving <Katex tex="[1,\infty)" />.
          The check: whenever you simplify the square root of a square, ask whether the thing being
          squared can be negative on the domain.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Range"
        marks={1}
        statement={
          <>
            Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=x^2+3" />.
            <br />
            State the range of <Katex tex="f(h(x))" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="h only feeds f inputs from 3 up, so the outputs start at f(3) = 2, not 1">
          <ChainHWidget />
        </Explore>
        <WrongMethod
          title="It's f on the outside again, so the range is the range of f, [1, ∞)"
          working={<Katex display tex="\text{ran}(f(h(x)))=\text{ran}(f)=[1,\infty)" />}
        >
          That shortcut worked in part b.ii only because <Katex tex="g" />&apos;s range was the{' '}
          <em>whole</em> of <Katex tex="\text{dom}(f)" />. Here <Katex tex="h" />&apos;s range is{' '}
          <Katex tex="[3,\infty)" />, only part of it. Test a value to see it fail: an output of{' '}
          <Katex tex="1.5" /> would need <Katex tex="\sqrt{x^2+4}=1.5" />, so{' '}
          <Katex tex="x^2=-1.75" />, which has no solution. Before quoting the range of{' '}
          <Katex tex="f" />, always ask which of <Katex tex="f" />&apos;s inputs actually arrive.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
