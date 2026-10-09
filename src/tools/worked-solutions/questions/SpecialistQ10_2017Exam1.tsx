// 2017 Specialist Mathematics — Exam 1, Question 10 (7 marks). A show-that derivative,
// the domain and range of √(arccos(x/2)), and a volume of revolution where the square root
// cancels and part (a) becomes the antiderivative. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report; itute agrees ([−2, 2], [0, √π], 2π²). Solution is original.
//
// Interactive widgets: (b) f built inside out — arccos sets the domain, the square root squeezes
// the range (interactives/spec-2017e1-q10b-root); (c) the solid as a stack of discs of area
// π·arccos(x/2) from x = −2 to 2 (spec-2017e1-q10c-discs), and the half-turn symmetry of
// y = arccos(x/2) that makes the integral exactly 2π (spec-2017e1-q10c-half).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RootWidget = lazyWidget(() => import('../interactives/spec-2017e1-q10b-root'))
const DiscsWidget = lazyWidget(() => import('../interactives/spec-2017e1-q10c-discs'))
const HalfWidget = lazyWidget(() => import('../interactives/spec-2017e1-q10c-half'))

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      The majority of students answered this question well. A number of students showed
      insufficient working to enable the mark to be awarded; some students simply wrote the
      answer as given. Some students gave a different answer from that given.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 25, 40],
  average: 1.1,
  comment: (
    <>
      This question was not particularly well answered. The most common errors were to state
      the domain as <Katex tex="(-2,2)" /> or <Katex tex="[0,2]" /> or other variations; the
      range was frequently given as <Katex tex="[0,\pi]" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 21, 19, 8, 14],
  average: 1.4,
  comment: (
    <>
      Many students found this question quite challenging. Typical errors included:
      <ul className="list-disc pl-5 my-1">
        <li>trying to find the area rather than the volume of revolution</li>
        <li>forgetting the <Katex tex="\pi" /></li>
        <li>sign errors when attempting to use the result given in part a.</li>
        <li>
          integrating from <Katex tex="-2" /> to <Katex tex="0" /> was common or from{' '}
          <Katex tex="-2" /> to <Katex tex="\pi" />, which was less common.
        </li>
      </ul>
      There were many poor attempts to integrate <Katex tex="\tfrac{x}{\sqrt{4-x^2}}" /> where
      arcsin expressions and incorrect constants or incorrect signs were common. Some students
      attempted to integrate the correct integral expression by turning it into the integration
      of a cos function, finding the area to the <Katex tex="y" />-axis and subtracting from the
      surrounding rectangle. This was occasionally done successfully.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\frac{d}{dx}\left(x\arccos\!\left(\frac{x}{a}\right)\right)\\&\quad= 1\cdot\arccos\!\left(\frac{x}{a}\right)+x\cdot\frac{d}{dx}\arccos\!\left(\frac{x}{a}\right)\end{aligned}"
      />
    ),
    reason: (
      <>
        The bracket is a product, <Katex tex="x" /> times <Katex tex="\arccos\!\left(\tfrac{x}{a}\right)" />, so
        use the product rule: (derivative of the first) × second + first × (derivative of the second). In a
        &ldquo;show that&rdquo; this line is part of the evidence, so write it down.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arccos\!\left(\frac{x}{a}\right) = \frac{-1}{\sqrt{1-\frac{x^2}{a^2}}}\times\frac1a" />,
    reason: (
      <>
        The formula sheet gives <Katex tex="\tfrac{d}{dx}\cos^{-1}(x)=\tfrac{-1}{\sqrt{1-x^2}}" />. Here the input
        is <Katex tex="\tfrac{x}{a}" />, so the chain rule multiplies by its derivative, <Katex tex="\tfrac1a" />.
        The minus sign is there because <Katex tex="\arccos" /> is a decreasing function.
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt{1-\frac{x^2}{a^2}} = \sqrt{\frac{a^2-x^2}{a^2}} = \frac{\sqrt{a^2-x^2}}{a}" />,
    reason: (
      <>
        How would I know to do this? The target has <Katex tex="\sqrt{a^2-x^2}" />, so aim for it: put{' '}
        <Katex tex="1-\tfrac{x^2}{a^2}" /> over the common denominator <Katex tex="a^2" /> and root the top and
        bottom separately. <Katex tex="\sqrt{a^2}=a" /> (rather than <Katex tex="|a|" />) only because the
        question says <Katex tex="a>0" />, which is why that condition is there.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{-1}{\frac{\sqrt{a^2-x^2}}{a}}\times\frac1a = \frac{-a}{a\sqrt{a^2-x^2}} = \frac{-1}{\sqrt{a^2-x^2}}" />,
    reason: (
      <>
        Dividing by <Katex tex="\tfrac{\sqrt{a^2-x^2}}{a}" /> is multiplying by{' '}
        <Katex tex="\tfrac{a}{\sqrt{a^2-x^2}}" />, and that <Katex tex="a" /> cancels the{' '}
        <Katex tex="\tfrac1a" /> from the chain rule.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\ =\ \arccos\!\left(\frac{x}{a}\right)-\frac{x}{\sqrt{a^2-x^2}}}" />,
    reason: (
      <>
        Substitute into the product-rule line:{' '}
        <Katex tex="1\cdot\arccos\!\left(\tfrac{x}{a}\right)+x\cdot\tfrac{-1}{\sqrt{a^2-x^2}}" />. The report says
        some students lost the mark by simply writing the given answer; the lines in between are what is being
        assessed. As required.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\frac{x}{2}\le1 \implies -2\le x\le 2" />,
    reason: (
      <>
        Work from the inside out. The innermost function is <Katex tex="\arccos" />, whose input must lie in{' '}
        <Katex tex="[-1,1]" />, endpoints included (<Katex tex="\arccos(1)=0" /> and{' '}
        <Katex tex="\arccos(-1)=\pi" /> both exist). Here the input is <Katex tex="\tfrac{x}{2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\arccos\!\left(\frac{x}{2}\right)\ge0 \text{ for all such } x" />,
    reason: (
      <>
        Next layer out: the square root needs what is <em>inside</em> it to be <Katex tex="\ge 0" />. The inside
        is <Katex tex="\arccos\!\left(\tfrac{x}{2}\right)" />, not <Katex tex="x" />, and <Katex tex="\arccos" />{' '}
        never gives a negative value, so the root adds no new restriction.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(f) = [-2,2]}" />,
    reason: (
      <>
        Closed at both ends: at <Katex tex="x=\pm2" /> we take <Katex tex="\sqrt0" /> and{' '}
        <Katex tex="\sqrt\pi" />, both fine.
      </>
    ),
    more: (
      <>
        In the diagram below, drag <Katex tex="x" /> past <Katex tex="\pm2" /> to see where <Katex tex="f" />{' '}
        stops existing.
      </>
    ),
  },
  {
    working: <Katex display tex="0\le\arccos\!\left(\frac{x}{2}\right)\le\pi" />,
    reason: (
      <>
        For the range, inside out again. As <Katex tex="x" /> runs over <Katex tex="[-2,2]" />,{' '}
        <Katex tex="\tfrac{x}{2}" /> runs over <Katex tex="[-1,1]" />, so the inside takes every value in{' '}
        <Katex tex="[0,\pi]" />: <Katex tex="\pi" /> at <Katex tex="x=-2" /> and <Katex tex="0" /> at{' '}
        <Katex tex="x=2" /> (<Katex tex="\arccos" /> is decreasing).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f) = \left[0,\sqrt{\pi}\,\right]}" />,
    reason: (
      <>
        The square root is applied last. It is increasing, so it sends the smallest value to the smallest and the
        largest to the largest: <Katex tex="\sqrt0=0" /> and <Katex tex="\sqrt\pi\approx1.77" />. Stopping at{' '}
        <Katex tex="[0,\pi]" />, which the report says was frequent, gives the range of the inside only.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{-2}^{2}\bigl(f(x)\bigr)^2\,dx" />,
    reason: (
      <>
        Rotating about the <Katex tex="x" />-axis turns each thin slice into a disc of radius{' '}
        <Katex tex="y=f(x)" /> and area <Katex tex="\pi y^2" />, so <Katex tex="V=\pi\int y^2\,dx" />. For the
        limits, read the boundaries: <Katex tex="x=-2" /> is the left end, and there is no right-hand line, so the
        region runs until the curve itself meets <Katex tex="y=0" />, at <Katex tex="x=2" /> (
        <Katex tex="\arccos(1)=0" />). The <Katex tex="y" />-axis is not a boundary.
      </>
    ),
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = \arccos\!\left(\frac{x}{2}\right)" />,
    reason: (
      <>
        Squaring removes the square root. That is why the question built <Katex tex="f" /> with a root: the
        volume integral is far nicer than the area one.
      </>
    ),
  },
  {
    working: <Katex display tex="V = \pi\int_{-2}^{2}\arccos\!\left(\frac{x}{2}\right)dx" />,
    reason: (
      <>
        <Katex tex="\arccos" /> has no antiderivative on the formula sheet. How would I know what to do? Part (a)
        with <Katex tex="a=2" /> is a derivative containing <Katex tex="\arccos\!\left(\tfrac{x}{2}\right)" />,
        and a &ldquo;show that&rdquo; is usually a tool for the next part.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\arccos\!\left(\frac{x}{2}\right) = \frac{d}{dx}\left(x\arccos\!\left(\frac{x}{2}\right)\right)+\frac{x}{\sqrt{4-x^2}}"
      />
    ),
    reason: (
      <>
        Part (a) with <Katex tex="a=2" />, rearranged to make <Katex tex="\arccos\!\left(\tfrac{x}{2}\right)" /> the
        subject: the <Katex tex="\tfrac{x}{\sqrt{4-x^2}}" /> term moves across and becomes <b>+</b>. The report
        lists sign errors at exactly this point, so write this line out rather than doing it in your head.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\arccos\!\left(\frac{x}{2}\right)dx = x\arccos\!\left(\frac{x}{2}\right)+\int\frac{x}{\sqrt{4-x^2}}\,dx" />,
    reason: <>Antidifferentiate both sides. Antidifferentiating a derivative gives back the function.</>,
  },
  {
    working: <Katex display tex="\int\frac{x}{\sqrt{4-x^2}}\,dx = -\sqrt{4-x^2}" />,
    reason: (
      <>
        The <Katex tex="x" /> on top is the signal: it is <Katex tex="-\tfrac12" /> times the derivative of{' '}
        <Katex tex="4-x^2" />, the expression under the root. So this is a reverse chain rule (
        <Katex tex="u=4-x^2" />), not an arcsin. Check:{' '}
        <Katex tex="\tfrac{d}{dx}\left(-\sqrt{4-x^2}\right)=\tfrac{2x}{2\sqrt{4-x^2}}=\tfrac{x}{\sqrt{4-x^2}}" /> ✓.
      </>
    ),
  },
  {
    working: <Katex display tex="V = \pi\left[x\arccos\!\left(\frac{x}{2}\right)-\sqrt{4-x^2}\right]_{-2}^{2}" />,
    reason: <>Put the two pieces together inside <Katex tex="\pi\left[\ \right]" />.</>,
  },
  {
    working: <Katex display tex="x=2:\quad 2\arccos(1)-\sqrt{0} = 0" />,
    reason: (
      <>
        <Katex tex="\arccos(1)=0" /> and <Katex tex="\sqrt{4-4}=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x=-2:\quad -2\arccos(-1)-\sqrt{0} = -2\pi" />,
    reason: (
      <>
        <Katex tex="\arccos(-1)=\pi" />, and the root is <Katex tex="0" /> again.
      </>
    ),
  },
  {
    working: <Katex display tex="V = \pi\bigl(0-(-2\pi)\bigr)" />,
    reason: (
      <>
        Top limit minus bottom limit. The <Katex tex="\sqrt{4-x^2}" /> term was <Katex tex="0" /> at both ends
        (equivalently, <Katex tex="\tfrac{x}{\sqrt{4-x^2}}" /> is odd, so its integral over{' '}
        <Katex tex="[-2,2]" /> is <Katex tex="0" />). So a sign slip with that term happens not to change the
        number here, but the working is still wrong, and on any other interval the answer would be too.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{V = 2\pi^2}" />,
    reason: (
      <>
        About <Katex tex="19.7" /> cubic units. A check: the solid fits inside a cylinder of radius{' '}
        <Katex tex="\sqrt\pi" /> and length <Katex tex="4" />, volume <Katex tex="4\pi^2\approx39.5" />, and fills
        exactly half of it.
      </>
    ),
    more: <>The second diagram below shows why.</>,
  },
]

export default function SpecialistQ10_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (7 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Show that{' '}
            <Katex tex="\dfrac{d}{dx}\left(x\arccos\!\left(\dfrac{x}{a}\right)\right)=\arccos\!\left(\dfrac{x}{a}\right)-\dfrac{x}{\sqrt{a^2-x^2}}" />
            , where <Katex tex="a>0" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Domain & Range"
        marks={2}
        statement={
          <>
            State the maximal domain and the range of{' '}
            <Katex tex="f(x)=\sqrt{\arccos\!\left(\dfrac{x}{2}\right)}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Inside out: arccos sets the domain, then the square root squeezes the range to [0, √π]">
          <RootWidget />
        </Explore>
        <WrongMethod
          title="The endpoints make it undefined, so the domain is (−2, 2)"
          source="Examiner's report"
          working={<Katex display tex="\text{dom}(f)=(-2,2)" />}
        >
          Test the endpoints instead of guessing: <Katex tex="f(2)=\sqrt{\arccos(1)}=\sqrt0=0" /> and{' '}
          <Katex tex="f(-2)=\sqrt{\arccos(-1)}=\sqrt\pi" />. Both exist. Open endpoints come from dividing by zero
          (like the <Katex tex="\sqrt{a^2-x^2}" /> in the denominator in part (a)), not from the square root of zero.
        </WrongMethod>
        <WrongMethod
          title="A square root needs x ≥ 0, so the domain is [0, 2]"
          source="Examiner's report"
          working={<Katex display tex="\text{dom}(f)=[0,2]" />}
        >
          The square root needs its <em>inside</em> to be non-negative, and the inside is{' '}
          <Katex tex="\arccos\!\left(\tfrac{x}{2}\right)" />, which never is negative. For example,{' '}
          <Katex tex="f(-1)=\sqrt{\arccos\!\left(-\tfrac12\right)}=\sqrt{\tfrac{2\pi}{3}}\approx1.45" /> is perfectly
          well defined.
        </WrongMethod>
        <WrongMethod
          title="The range of arccos is [0, π], so that's the range"
          source="Examiner's report"
          working={<Katex display tex="\text{ran}(f)=[0,\pi]" />}
        >
          That is the range of the inside. The square root is applied last and is increasing, so it sends{' '}
          <Katex tex="[0,\pi]" /> to <Katex tex="\left[0,\sqrt\pi\,\right]" />. Catch it by evaluating at the
          endpoint that gives the largest value: <Katex tex="f(-2)=\sqrt\pi\approx1.77" />, not <Katex tex="\pi" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Volume of Revolution"
        marks={4}
        statement={
          <>
            Find the volume of the solid of revolution generated when the region bounded by
            the graph of <Katex tex="y=f(x)" />, and the lines <Katex tex="x=-2" /> and{' '}
            <Katex tex="y=0" />, is rotated about the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Why part (a) is the key">
          <p>
            Rotating a region about the <Katex tex="x" />-axis turns every thin vertical slice of width{' '}
            <Katex tex="\delta x" /> into a disc of radius <Katex tex="y" />, with volume about{' '}
            <Katex tex="\pi y^2\,\delta x" />. Adding the discs gives <Katex tex="V=\pi\int_a^b y^2\,dx" />, and
            squaring <Katex tex="\sqrt{\arccos(x/2)}" /> leaves a plain <Katex tex="\arccos(x/2)" />.
          </p>
          <p>
            Antidifferentiating <Katex tex="\arccos" /> is not on the formula sheet, which is
            precisely why part (a) handed you{' '}
            <Katex tex="\tfrac{d}{dx}\left(x\arccos\!\left(\tfrac{x}{a}\right)\right)" />.
            Reading a "show that" result as a tool for the next part, rather than as an
            isolated exercise, is the habit this question rewards.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Each slice is a disc of area π·arccos(x/2), and the discs run all the way to x = 2">
          <DiscsWidget />
        </Explore>
        <Explore title="Why the integral is exactly half its box: 2π, so V = 2π²">
          <HalfWidget />
        </Explore>
        <WrongMethod
          title="The region stops at the y-axis, so integrate from −2 to 0"
          source="Examiner's report"
          working={<Katex display tex="\pi\int_{-2}^{0}\arccos\!\left(\frac{x}{2}\right)dx = 2\pi^2-2\pi" />}
        >
          The region has only three boundaries: the curve, <Katex tex="x=-2" /> and <Katex tex="y=0" />. The{' '}
          <Katex tex="y" />-axis isn&apos;t one of them. A quick sketch shows the curve still at height{' '}
          <Katex tex="\sqrt{\pi/2}\approx1.25" /> as it crosses <Katex tex="x=0" />; the region only closes where the
          curve meets <Katex tex="y=0" />, at <Katex tex="x=2" />. The report also saw an upper limit of{' '}
          <Katex tex="\pi" />, which isn&apos;t even in the domain: <Katex tex="f" /> doesn&apos;t exist past{' '}
          <Katex tex="x=2" /> (part (b)). <Katex tex="\pi" /> is a height, the top of the range of{' '}
          <Katex tex="\arccos" />, not an <Katex tex="x" />-value.
        </WrongMethod>
        <WrongMethod
          title="Integrate y (the area), or integrate y² but leave out the π"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\int_{-2}^{2}\sqrt{\arccos\!\left(\frac{x}{2}\right)}\,dx" />
              <Katex display tex="\int_{-2}^{2}\arccos\!\left(\frac{x}{2}\right)dx = 2\pi" />
            </>
          }
        >
          The first is the area of the region, not the volume, and it has no antiderivative you can find by hand,
          which is itself a sign the integral is set up wrongly. The second is the area under{' '}
          <Katex tex="y=\arccos\!\left(\tfrac{x}{2}\right)" />. A volume adds up discs, and every disc&apos;s area
          is <Katex tex="\pi r^2" />, so the <Katex tex="\pi" /> belongs in every slice:{' '}
          <Katex tex="V=\pi\times2\pi=2\pi^2" />.
        </WrongMethod>
        <WrongMethod
          title="It has √(4 − x²) in the denominator, so it integrates to an arcsin"
          source="Examiner's report"
          working={<Katex display tex="\int\frac{x}{\sqrt{4-x^2}}\,dx = \arcsin\!\left(\frac{x}{2}\right)" />}
        >
          Differentiate to check: <Katex tex="\tfrac{d}{dx}\arcsin\!\left(\tfrac{x}{2}\right)=\tfrac{1}{\sqrt{4-x^2}}" />,
          with no <Katex tex="x" /> on top. The arcsin formula needs a constant numerator. When the numerator is a
          multiple of the derivative of what is under the root (here <Katex tex="x=-\tfrac12(-2x)" />), substitute{' '}
          <Katex tex="u=4-x^2" /> instead, which gives <Katex tex="-\sqrt{4-x^2}" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
