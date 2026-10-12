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
    reason: <>Start from the <em>stated</em> domain <Katex tex="x\ge0" /> and push it through the rule one operation at a time.</>,
    more: <>The stated domain <Katex tex="[0,\infty)" /> is narrower than the implied domain <Katex tex="[-1,\infty)" /> that <Katex tex="\sqrt{x+1}" /> would allow on its own, and it is the stated one that counts.</>,
  },
  {
    working: <Katex display tex="\sqrt{x+1}\ge\sqrt{1}=1" />,
    reason: <>Square root is increasing (a bigger input gives a bigger output), so taking the root keeps the <Katex tex="\ge" />.</>,
    more: <>In pictures: <Katex tex="y=\sqrt{x}" /> shifted 1 left would start at <Katex tex="(-1,0)" />, but the domain cuts it off at <Katex tex="x=0" />, so the graph starts at <Katex tex="(0,1)" /> and rises forever.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f)=[1,\infty)}" />,
    reason: <>Square bracket at <Katex tex="1" />, since <Katex tex="f(0)=1" /> is actually reached; round bracket at <Katex tex="\infty" />, which never is.</>,
    more: <>The report notes some students made incorrect use of square or round brackets. Check: <Katex tex="f(3)=2" /> and <Katex tex="f(8)=3" />, both at least <Katex tex="1" />.</>,
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
    reason: <>&ldquo;Range of <Katex tex="g" /> is a subset of the domain of <Katex tex="f" />&rdquo; means every output of <Katex tex="g" /> must be a number <Katex tex="f" /> accepts, here <Katex tex="g(x)\ge0" />.</>,
    more: <>As in part a, it is the <em>stated</em> domain <Katex tex="[0,\infty)" /> of <Katex tex="f" /> that counts, not the implied <Katex tex="[-1,\infty)" />.</>,
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
    reason: <>The turning point is halfway between the roots. <Katex tex="g(-2)=-1" />, so between <Katex tex="-3" /> and <Katex tex="-1" /> the outputs are negative: the danger.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={parabolaSrc}
          alt="This site's sketch of the parabola y = x squared plus 4x plus 3 with x-intercepts at (−3, 0) and (−1, 0) and turning point (−2, −1); the branch to the left of x = −3, where the parabola is at or above the x-axis, is drawn thicker in orange"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Sketch it. The domain <Katex tex="(-\infty,c]" /> starts far left, where <Katex tex="g" /> is large and positive, and runs right until it stops at <Katex tex="c" />. Orange: the branch <Katex tex="x\le-3" />, where <Katex tex="g\ge0" />.</>,
    more: <>The report notes that students who solved this used the equation, a graph or both.</>,
  },
  {
    working: <Katex display tex="g(x)\ge0 \iff x\le-3 \ \text{ or } \ x\ge-1" />,
    reason: <>An upright parabola is on or above the axis outside its roots, and below it between them.</>,
  },
  {
    working: <Katex display tex="(-\infty,c]\subseteq(-\infty,-3] \implies c\le-3" />,
    reason: <>The whole domain must sit where <Katex tex="g\ge0" />. Once <Katex tex="c" /> passes <Katex tex="-3" />, the domain includes points just right of <Katex tex="-3" />, where <Katex tex="g" /> is negative.</>,
    more: <>A left-hand interval <Katex tex="(-\infty,c]" /> can&apos;t jump over the gap <Katex tex="(-3,-1)" />. So only the left piece <Katex tex="x\le-3" /> is usable; the right piece <Katex tex="x\ge-1" /> can&apos;t be reached without passing through the dip.</>,
  },
  {
    working: <Katex display tex="\boxed{c=-3}" />,
    reason: <>The largest value allowed, and it satisfies <Katex tex="c<0" />.</>,
    more: <>Check: on <Katex tex="(-\infty,-3]" />, <Katex tex="g" /> falls from very large values down to <Katex tex="g(-3)=0" />, so its range is <Katex tex="[0,\infty)" />, inside <Katex tex="\text{dom}(f)" />. Push <Katex tex="c" /> to <Katex tex="-2.5" /> and <Katex tex="g(-2.5)=-0.75" /> is not in <Katex tex="[0,\infty)" />. Slide <Katex tex="c" /> yourself in the diagram below.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dom}(g)=(-\infty,-3]" />,
    reason: <><Katex tex="f(g(x))" /> puts <Katex tex="x" /> into <Katex tex="g" /> first, so the <Katex tex="x" />-values are <Katex tex="g" />&apos;s domain, with <Katex tex="c=-3" /> from part b.i.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=[0,\infty)" />,
    reason: <>Left of the turning point <Katex tex="x=-2" />, <Katex tex="g" /> is decreasing: <Katex tex="g(-3)=0" />, and <Katex tex="g" /> grows without bound as <Katex tex="x\to-\infty" />.</>,
    more: <>So every value from <Katex tex="0" /> up is hit exactly once: this is what <Katex tex="g" /> hands over to <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=[0,\infty)=\text{dom}(f)" />,
    reason: <><Katex tex="g" /> hands <Katex tex="f" /> every input <Katex tex="f" /> accepts, none missing. Careful: <Katex tex="[0,\infty)" /> is what goes <em>into</em> <Katex tex="f" />, not the answer.</>,
    more: <>That is no accident, since part b.i chose <Katex tex="c" /> to make the fit exact.</>,
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
    reason: <>A check from the rule: <Katex tex="g(x)+1=(x+2)^2" />. Since <Katex tex="x+2<0" /> here and a root is never negative, <Katex tex="\sqrt{(x+2)^2}=-(x+2)" />, not <Katex tex="x+2" />, and that is at least <Katex tex="1" />.</>,
    more: <>For example, at <Katex tex="x=-5" />: <Katex tex="\sqrt{(-3)^2}=\sqrt9=3=-(-3)" />. The smallest value, <Katex tex="-(x+2)=1" />, happens at <Katex tex="x=-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(g(x)))=\text{ran}(f)=[1,\infty)}" />,
    reason: <>Since <Katex tex="g" /> delivers <em>all</em> of <Katex tex="\text{dom}(f)" />, the composite reaches everything <Katex tex="f" /> can: part a&apos;s answer, as the check agrees.</>,
    more: <>This is what the report&apos;s &ldquo;in this case&rdquo; refers to. Follow <Katex tex="x" /> through both functions in the diagram below.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(h)=[3,\infty) \subseteq [0,\infty)=\text{dom}(f)" />,
    reason: <>First check the composite exists, as in part b.i: <Katex tex="x^2\ge0" /> gives <Katex tex="h(x)\ge3" />, inside <Katex tex="\text{dom}(f)" />, so <Katex tex="f(h(x))" /> is defined for all <Katex tex="x\in R" />.</>,
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
    reason: <>As in part a, push <Katex tex="x" /> through the rule: <Katex tex="x^2" /> is smallest (<Katex tex="0" />) at <Katex tex="x=0" />, and grows without bound as <Katex tex="|x|" /> grows.</>,
    more: <>So the inside is smallest at <Katex tex="4" /> and the root at <Katex tex="2" />, with no upper limit. Always ask where the inside of the root is smallest.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(h(x)))=[2,\infty)}" />,
    reason: <>Square bracket: <Katex tex="2" /> is reached, at <Katex tex="x=0" />. Not <Katex tex="\text{ran}(f)" />: <Katex tex="h" /> only feeds <Katex tex="f" /> inputs from <Katex tex="3" /> up, so outputs start at <Katex tex="f(3)=2" />.</>,
    more: <>Check: <Katex tex="f(h(1))=\sqrt5\approx2.24" />, which is at least <Katex tex="2" />.</>,
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
