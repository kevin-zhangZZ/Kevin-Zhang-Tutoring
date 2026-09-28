// 2020 Specialist Mathematics — Exam 1 Question 9 (5 marks). A parametric curve whose arc
// length integrand collapses to a perfect square. Question text transcribed from the
// original paper. Answers checked with sympy (and the arc length numerically with scipy) and
// against the VCAA examination report and itute, which agree throughout. Solution is original.
// Interactive diagrams (§15), both in part b.: a point travelling along the curve with its
// velocity triangle, whose hypotenuse is the speed √((dx/dt)² + (dy/dt)²)
// (interactives/spec-2020e1-q9b-speed.tsx); and (dy/dt)² = (P − Q)² and (dx/dt)² = 4PQ, with
// P = 1/(1 + t) and Q = 1/(4(1 − t)), fitting together into the perfect square (P + Q)²
// (interactives/spec-2020e1-q9b-square.tsx). Part b.'s report comment includes the working the
// report prints inside its feedback ("If s denotes the arc length then: …"), which had been left
// out. The answer form s = log_e(m) + n log_e(p) is not unique (a point Marty Ross's blog makes):
// the solution gives the report's m = 3/2, n = 1/4, p = 2 and notes that the report's own first
// line, with n = −1/4 and p = 1/2, fits the form too.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SpeedWidget = lazyWidget(() => import('../interactives/spec-2020e1-q9b-speed'))
const SquareWidget = lazyWidget(() => import('../interactives/spec-2020e1-q9b-square'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 35, 49],
  average: 1.3,
  comment: (
    <>
      Students needed to find <Katex tex="\tfrac{dy}{dt}" /> and then square the result. As
      the result was given, students needed to show relevant working rather than just writing
      the answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 40, 5, 14],
  average: 0.9,
  comment: (
    <>
      Many students could correctly substitute <Katex tex="\tfrac{dx}{dt}" /> and{' '}
      <Katex tex="\tfrac{dy}{dt}" /> into the formula for the arc length of a curve defined
      parametrically, which is given on the formula sheet.
      <br />
      Most students who successfully answered this question were able to identify the perfect
      square, which allowed the square root in the integrand to be removed. If <Katex tex="s" />{' '}
      denotes the arc length then:
      <Katex
        display
        tex="\begin{aligned}s&=\int_0^{\frac12}\sqrt{\begin{aligned}&\frac{1}{1-t^2}+\biggl(\frac{1}{(1+t)^2}-\frac{1}{2\left(1-t^2\right)}\\&\qquad+\frac{1}{16(1-t)^2}\biggr)\end{aligned}}\,dt\\&=\int_0^{\frac12}\sqrt{\frac{1}{(1+t)^2}+\frac{1}{2\left(1-t^2\right)}+\frac{1}{16(1-t)^2}}\,dt\\&=\int_0^{\frac12}\frac{1}{1+t}+\frac{1}{4(1-t)}\,dt\end{aligned}"
      />
      Few students who tried to write the term inside the square root as a single algebraic
      fraction were able to see the problem through to the conclusion. Transcription errors were
      noted in this question. Some students confused{' '}
      <Katex tex="1-t^2" /> with <Katex tex="(1-t)^2" />, which led to incorrect results.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \log_e(1+t)+\tfrac14\log_e(1-t)" />,
    reason: (
      <>
        The target is three <em>separate</em> fractions, so the plan is: find{' '}
        <Katex tex="\tfrac{dy}{dt}" />, square it by expanding the brackets (not by combining into
        one fraction), then match each term with the given form. Each log needs the chain rule,{' '}
        <Katex tex="\tfrac{d}{dt}\log_e(u)=\tfrac{1}{u}\cdot\tfrac{du}{dt}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dt} = \frac{1}{1+t}+\frac14\cdot\frac{-1}{1-t} = \frac{1}{1+t}-\frac{1}{4(1-t)}" />,
    reason: (
      <>
        The inner derivative of <Katex tex="1-t" /> is <Katex tex="-1" />, which supplies the minus
        sign. Leave the two fractions apart. It helps to name them <Katex tex="P=\tfrac{1}{1+t}" /> and{' '}
        <Katex tex="Q=\tfrac{1}{4(1-t)}" />, so that <Katex tex="\tfrac{dy}{dt}=P-Q" /> (part b. uses
        these names too).
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\left(\frac{dy}{dt}\right)^2 &= \frac{1}{(1+t)^2}-2\cdot\frac{1}{1+t}\cdot\frac{1}{4(1-t)}\\&\quad+\frac{1}{16(1-t)^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        <Katex tex="(P-Q)^2=P^2-2PQ+Q^2" />, expanded term by term. Squaring <Katex tex="Q" /> squares
        the 4 as well: <Katex tex="\left(4(1-t)\right)^2=16(1-t)^2" />, which is where{' '}
        <Katex tex="c=16" /> comes from.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{2}{4(1+t)(1-t)} = \frac{1}{2\left(1-t^2\right)}" />,
    reason: (
      <>
        The middle term. <Katex tex="(1+t)(1-t)=1-t^2" /> is a difference of two squares. It is{' '}
        <Katex tex="1-t^2" />, not <Katex tex="(1-t)^2" />: the report notes some students confused
        the two, which led to incorrect results.
      </>
    ),
  },
  {
    working: <Katex display tex="\left(\frac{dy}{dt}\right)^2 = \frac{1}{(1+t)^2}-\frac{1}{2\left(1-t^2\right)}+\frac{1}{16(1-t)^2}" />,
    reason: <>The three terms together.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\left(\frac{dy}{dt}\right)^2 &= \frac{1}{1\cdot(1+t)^2}+\frac{1}{(-2)\left(1-t^2\right)}\\&\quad+\frac{1}{16(1-t)^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        In the given form every term is <Katex tex="+\tfrac{1}{\ldots}" />, so the minus sign has
        to go into the number in the denominator:{' '}
        <Katex tex="-\tfrac{1}{2\left(1-t^2\right)}=\tfrac{1}{(-2)\left(1-t^2\right)}" />. That is why{' '}
        <Katex tex="b" /> is negative.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = 1, \quad b = -2, \quad c = 16}" />,
    reason: (
      <>
        Reading off the three numbers. The values were given in the question, so the marks are
        for the working above: the report notes students needed to find{' '}
        <Katex tex="\tfrac{dy}{dt}" />, square it, and show that working rather than just writing
        the answer. As required.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}x = \arcsin(t) &\implies \frac{dx}{dt} = \frac{1}{\sqrt{1-t^2}}\\&\implies \left(\frac{dx}{dt}\right)^2 = \frac{1}{1-t^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        The derivative of <Katex tex="\arcsin(t)" /> is on the formula sheet. Squaring removes its
        square root and leaves <Katex tex="1-t^2" />, the same factor as in the middle term of part
        a. That is a hint that the two will combine.
      </>
    ),
  },
  {
    working: <Katex display tex="s = \int_0^{1/2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: (
      <>
        The parametric arc length formula, from the formula sheet. The square root is the
        point&apos;s speed along the curve (see the first diagram below), so <Katex tex="s" /> adds
        up speed × time.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 &= \frac{1}{1-t^2}+\frac{1}{(1+t)^2}\\&\quad-\frac{1}{2\left(1-t^2\right)}+\frac{1}{16(1-t)^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        Substituting, with <Katex tex="\left(\tfrac{dy}{dt}\right)^2" /> from part a. Keep the terms
        as separate fractions and look at what the two <Katex tex="1-t^2" /> terms can do together.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{1}{1-t^2}-\frac{1}{2\left(1-t^2\right)} = \frac{1}{2\left(1-t^2\right)}" />,
    reason: (
      <>
        Same denominator, so they combine. The minus sign from part a has become a plus, and that
        sign change is what makes a perfect square possible.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 &= \frac{1}{(1+t)^2}+\frac{1}{2\left(1-t^2\right)}\\&\quad+\frac{1}{16(1-t)^2}\end{aligned}"
      />
    ),
    reason: <>This is part a&apos;s expression with only the middle sign changed. All three terms are positive.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\left(\frac{1}{1+t}+\frac{1}{4(1-t)}\right)^2 &= \frac{1}{(1+t)^2}+\frac{2}{4\left(1-t^2\right)}\\&\quad+\frac{1}{16(1-t)^2}\end{aligned}"
      />
    ),
    reason: (
      <>
        How to spot the perfect square: part a&apos;s <Katex tex="\left(\tfrac{dy}{dt}\right)^2" />{' '}
        was <Katex tex="(P-Q)^2" />. The first and last terms are unchanged and the middle one has
        only changed sign, so try <Katex tex="(P+Q)^2" />. Expanding it confirms the match, since{' '}
        <Katex tex="\tfrac{2}{4\left(1-t^2\right)}=\tfrac{1}{2\left(1-t^2\right)}" />. Why it works:{' '}
        <Katex tex="\left(\tfrac{dx}{dt}\right)^2=\tfrac{1}{1-t^2}" /> is exactly{' '}
        <Katex tex="4PQ" />, and <Katex tex="(P-Q)^2+4PQ=(P+Q)^2" /> (the second diagram below fits
        the pieces together). The report notes that most students who answered this successfully
        identified the perfect square.
      </>
    ),
  },
  {
    working: <Katex display tex="s = \int_0^{1/2}\left(\frac{1}{1+t}+\frac{1}{4(1-t)}\right)dt" />,
    reason: (
      <>
        <Katex tex="\sqrt{(P+Q)^2}=|P+Q|" />, and both fractions are positive for{' '}
        <Katex tex="0\le t\le\tfrac12" />, so the square root is just the bracket. It had to be
        positive anyway: it is a speed.
      </>
    ),
  },
  {
    working: <Katex display tex="= \left[\log_e(1+t)-\tfrac14\log_e(1-t)\right]_0^{1/2}" />,
    reason: (
      <>
        <Katex tex="\int\tfrac{1}{4(1-t)}\,dt=-\tfrac14\log_e(1-t)" />: the inner derivative of{' '}
        <Katex tex="1-t" /> is <Katex tex="-1" /> again, so the sign flips. No absolute values are
        needed, because <Katex tex="1+t" /> and <Katex tex="1-t" /> are positive on{' '}
        <Katex tex="\left[0,\tfrac12\right]" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac32\right)-\tfrac14\log_e\!\left(\tfrac12\right)-0" />,
    reason: (
      <>
        At <Katex tex="t=\tfrac12" />: <Katex tex="1+t=\tfrac32" /> and <Katex tex="1-t=\tfrac12" />.
        At <Katex tex="t=0" /> both logs are <Katex tex="\log_e(1)=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{s = \log_e\!\left(\tfrac32\right)+\tfrac14\log_e(2)}" />,
    reason: (
      <>
        <Katex tex="-\log_e\tfrac12=\log_e(2)" />, so <Katex tex="m=\tfrac32" />,{' '}
        <Katex tex="n=\tfrac14" /> and <Katex tex="p=2" />, all rational as the form requires. The
        form is not unique: the report&apos;s own first line,{' '}
        <Katex tex="\log_e\left(\tfrac32\right)-\tfrac14\log_e\left(\tfrac12\right)" />, fits it too.
        Check: <Katex tex="s\approx0.4055+0.1733\approx0.579" />. The straight line from the start{' '}
        <Katex tex="(0,0)" /> to the end point <Katex tex="\left(\tfrac{\pi}{6},\,y\left(\tfrac12\right)\right)\approx(0.524,\,0.232)" />{' '}
        has length about <Katex tex="0.573" />. The curve bends only slightly, so its length should
        be only slightly more than that ✓.
      </>
    ),
  },
]

export default function SpecialistQ9_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (5 marks)</p>
        <p>Consider the curve defined parametrically by</p>
        <p className="py-1">
          <Katex display tex="x = \arcsin(t)" />
        </p>
        <p className="py-1">
          <Katex display tex="y = \log_e(1+t)+\tfrac14\log_e(1-t)" />
        </p>
        <p>
          where <Katex tex="t\in[0,1)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Partial Fractions"
        marks={2}
        statement={
          <>
            <Katex tex="\left(\dfrac{dy}{dt}\right)^2" /> can be written in the form{' '}
            <Katex tex="\dfrac{1}{a(1+t)^2}+\dfrac{1}{b\left(1-t^2\right)}+\dfrac{1}{c(1-t)^2}" />
            , where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are real
            numbers.
            <br />
            Show that <Katex tex="a=1" />, <Katex tex="b=-2" /> and{' '}
            <Katex tex="c=16" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Arc Length"
        marks={3}
        statement={
          <>
            Find the arc length, <Katex tex="s" />, of the curve from <Katex tex="t=0" /> to{' '}
            <Katex tex="t=\tfrac12" />. Give your answer in the form{' '}
            <Katex tex="s=\log_e(m)+n\log_e(p)" />, where <Katex tex="m,n,p\in Q" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Why the Square Root Comes Out">
          <p>
            On a technology-free paper an arc length can only be finished by hand if the square
            root in <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}" />{' '}
            disappears, so questions like this are built to make the inside a perfect square.
            Expect one, and look for it.
          </p>
          <p>
            The usual pattern: <Katex tex="\tfrac{dy}{dt}" /> is a difference <Katex tex="P-Q" />, so
            its square has a middle term <Katex tex="-2PQ" />. If{' '}
            <Katex tex="\left(\tfrac{dx}{dt}\right)^2" /> works out to be <Katex tex="4PQ" />, adding it
            turns that middle term into <Katex tex="+2PQ" />:
          </p>
          <Katex display tex="(P-Q)^2+4PQ = P^2+2PQ+Q^2 = (P+Q)^2" />
          <p>
            So after substituting, check whether the middle term has changed sign. If it has, the
            square root is <Katex tex="P+Q" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Arc length is distance travelled: the square root is the speed, by Pythagoras">
          <SpeedWidget />
        </Explore>
        <Explore title="Why the square root comes out: the two squares fit together into one perfect square">
          <SquareWidget />
        </Explore>
        <WrongMethod
          title="Square 1/√(1 − t²) and get 1/(1 − t)²"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\left(\frac{dx}{dt}\right)^2 = \frac{1}{(1-t)^2}" />
              <Katex
                display
                tex="\begin{aligned}\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 &= \frac{1}{(1+t)^2}-\frac{1}{2\left(1-t^2\right)}\\&\quad+\frac{17}{16(1-t)^2}\end{aligned}"
              />
            </>
          }
        >
          <p>
            Squaring <Katex tex="\sqrt{1-t^2}" /> gives <Katex tex="1-t^2" />, not{' '}
            <Katex tex="(1-t)^2" />. The report notes some students confused the two, which led to
            incorrect results. With the wrong square, the <Katex tex="1-t^2" /> term has nothing to
            combine with, so the middle term stays negative and there is no perfect square. For{' '}
            <Katex tex="\left(\tfrac{1}{1+t}-\tfrac{k}{1-t}\right)^2" /> the last term needs{' '}
            <Katex tex="{k^2=\tfrac{17}{16}}" /> but the middle term needs <Katex tex="{2k=\tfrac12}" />.
            Over one denominator the numerator is <Katex tex="41t^2+2t+25" />, whose discriminant is{' '}
            <Katex tex="-4096" />, so it is not the square of anything. You are left with a square
            root you can&apos;t integrate by hand.
          </p>
          <p>
            A quick check at <Katex tex="t=0" /> won&apos;t catch this slip, because{' '}
            <Katex tex="1-0^2" /> and <Katex tex="(1-0)^2" /> are both 1. Try{' '}
            <Katex tex="t=\tfrac12" />: <Katex tex="1-t^2=\tfrac34" /> but{' '}
            <Katex tex="(1-t)^2=\tfrac14" />. On an Exam 1 arc length, if no perfect square appears,
            recheck your derivatives first.
          </p>
        </WrongMethod>
        <WrongMethod
          title="Put everything over one common denominator first"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\text{common denominator } 16(1+t)^2(1-t)^2" />
              <Katex
                display
                tex="\begin{aligned}\text{numerator} &= 16\left(1-t^2\right)+16(1-t)^2\\&\quad-8\left(1-t^2\right)+(1+t)^2\\&= 9t^2-30t+25\end{aligned}"
              />
              <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 = \frac{9t^2-30t+25}{16(1+t)^2(1-t)^2}" />
            </>
          }
        >
          <p>
            None of this is wrong, but the report notes that few students who tried to write the
            term inside the square root as a single algebraic fraction were able to see the problem
            through. The expanding is long and easy to slip in, and the perfect square is now
            hidden in the numerator: <Katex tex="{9t^2-30t+25=(5-3t)^2}" /> (its discriminant is{' '}
            <Katex tex="30^2-4\times9\times25=0" />). Even after spotting that, the square root{' '}
            <Katex tex="\tfrac{5-3t}{4\left(1-t^2\right)}" /> has to be split back into partial
            fractions, <Katex tex="\tfrac{1}{1+t}+\tfrac{1}{4(1-t)}" />, before it can be
            integrated. Keeping the terms separate, as in part a, shows the square straight away.
          </p>
        </WrongMethod>
      </PartCard>
    </div>
  )
}
