// 2020 Mathematical Methods — Exam 1, Question 3 (3 marks). Recovering a and b in
// y = tan(ax + b) from two labelled points. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy and against
// the VCAA examination report. Solution is original. This question has no lettered parts, so
// it uses the plain card layout rather than PartCard.
//
// Interactive diagrams (§15): interactives/meth-2020e1-q3-inside.tsx slides x along the answer
// curve and shows its angle u = ax + b moving along the standard y = tan u, so x = −1, 0, 1 land
// on −π/4, b and π/3, all on the branch through the origin; interactives/meth-2020e1-q3-angles.tsx
// lets the student pick any solution of tan u = −1 and tan u = √3 (plus the slip π/6) and shows
// which of the question's conditions each choice breaks, starting from the report's common error
// 3π/4.
//
// Sources: itute and all three tutors' videos (LMK, Dr U, Mr Nie) take the principal values, but
// on looser grounds ("the point is to the left", "choose the smallest value"). The reason given
// here is the airtight one: continuity on [−1, 1] keeps ax + b on one branch, and at x = 0 the
// angle is b ∈ (0, 1), inside (−π/2, π/2). sympy confirms every other pair of solutions breaks a
// condition — including −5π/4 with 4π/3 (a = 31π/24, b = π/24), which only continuity rules out.
// The report's sample working has two slips — "Using (1, 1)" for (−1, −1), and "√3 = a + b" for
// √3 = tan(a + b) — but its final a = 7π/24, b = π/24 agrees; the sample working isn't copied.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2020e1-q3-tan.png'

const InsideWidget = lazyWidget(() => import('../interactives/meth-2020e1-q3-inside'))
const AnglesWidget = lazyWidget(() => import('../interactives/meth-2020e1-q3-angles'))

const EXAM: SAExaminerStats = {
  marks: [27, 22, 28, 23],
  average: 1.5,
  comment: (
    <>
      Most students were able to substitute from the points labelled on the graph, however,
      many did not proceed further. Many of those who did proceed used incorrect angles.
      Students are expected to know exact values for the circular functions. A common error
      was to use <Katex tex="\tfrac{3\pi}{4}" /> in the first equation or{' '}
      <Katex tex="\tfrac\pi6" /> in the second equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(-1,-1): \quad \tan(-a+b) = -1" />,
    reason: <>Two unknowns need two equations, and the graph gives exactly two labelled points. Substitute each into <Katex tex="y=\tan(ax+b)" />, starting with <Katex tex="x=-1" />, <Katex tex="y=-1" />. The report notes most students got this far but many did not proceed further: the next step is to undo the tan.</>,
  },
  {
    working: <Katex display tex="-a+b = -\tfrac\pi4" />,
    reason: <><Katex tex="\tan u=-1" /> has a solution on every branch (<Katex tex="\ldots,-\tfrac{5\pi}4,-\tfrac\pi4,\tfrac{3\pi}4,\ldots" />), so which one is <Katex tex="-a+b" />? The graph is continuous on <Katex tex="[-1,1]" />, so as <Katex tex="x" /> runs from <Katex tex="-1" /> to <Katex tex="1" /> the angle <Katex tex="ax+b" /> never reaches an asymptote: it stays on one branch. At <Katex tex="x=0" /> that angle is <Katex tex="b" />, and <Katex tex="0<b<1<\tfrac\pi2" />, so the branch is the one through the origin, <Katex tex="-\tfrac\pi2<ax+b<\tfrac\pi2" />. On it, <Katex tex="\tan u=-1" /> only at <Katex tex="-\tfrac\pi4" />. Using <Katex tex="\tfrac{3\pi}4" /> here is the report&apos;s common error (the diagrams below show why it fails).</>,
  },
  {
    working: <Katex display tex="\left(1,\sqrt3\right): \quad \tan(a+b) = \sqrt3" />,
    reason: <>The right-hand point, <Katex tex="x=1" />, <Katex tex="y=\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="a+b = \tfrac\pi3" />,
    reason: <>Same branch, so the principal value again: <Katex tex="\tan\tfrac\pi3=\sqrt3" /> (in the half-equilateral triangle with sides <Katex tex="1" />, <Katex tex="\sqrt3" />, <Katex tex="2" />, the side <Katex tex="\sqrt3" /> is opposite the <Katex tex="\tfrac\pi3" /> angle). Using <Katex tex="\tfrac\pi6" /> here is the report&apos;s other common error, since <Katex tex="\tan\tfrac\pi6=\tfrac1{\sqrt3}" />. Quick check: <Katex tex="\sqrt3>1=\tan\tfrac\pi4" />, and tan increases along a branch, so the angle must be bigger than <Katex tex="\tfrac\pi4" />.</>,
  },
  {
    working: <Katex display tex="\text{adding: } 2b = \tfrac\pi3-\tfrac\pi4 = \tfrac{4\pi-3\pi}{12}" />,
    reason: <>Two linear equations in <Katex tex="a" /> and <Katex tex="b" />. The <Katex tex="a" /> terms have opposite signs, so adding the equations eliminates <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \tfrac\pi{24}}" />,
    reason: <><Katex tex="\tfrac\pi{24}\approx0.13" />, so <Katex tex="0<b<1" /> ✓. It matches the picture too: the <Katex tex="y" />-intercept is <Katex tex="\tan\tfrac\pi{24}\approx0.13" />, and the printed curve crosses the <Katex tex="y" />-axis just above <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="a = b+\tfrac\pi4 = \tfrac\pi{24}+\tfrac{6\pi}{24}" />,
    reason: <>Rearranging the first equation, <Katex tex="-a+b=-\tfrac\pi4" />, and substituting <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac{7\pi}{24}}" />,
    reason: <>Positive ✓. Check against the picture: the asymptotes are where the angle reaches <Katex tex="\pm\tfrac\pi2" />, <Katex tex="\tfrac{7\pi}{24}x+\tfrac\pi{24}=\pm\tfrac\pi2" />, at <Katex tex="x=\tfrac{11}7\approx1.57" /> and <Katex tex="x=-\tfrac{13}7\approx-1.86" />. Both are outside <Katex tex="[-1,1]" />, so the graph is continuous there ✓, and the left asymptote is further from <Katex tex="O" /> than the right, as printed. Substituting back: <Katex tex="\tan\left(-\tfrac{7\pi}{24}+\tfrac\pi{24}\right)=\tan\left(-\tfrac\pi4\right)=-1" /> ✓ and <Katex tex="\tan\tfrac{8\pi}{24}=\tan\tfrac\pi3=\sqrt3" /> ✓.</>,
  },
]

export default function MethodsQ3_2020Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (3 marks)" always>
        <p>
          Shown below is part of the graph of a period of the function of the form{' '}
          <Katex tex="y=\tan(ax+b)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="One branch of a tangent curve rising between two dashed vertical asymptotes, passing through the marked points (−1, −1) and (1, √3) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p>
          The graph is continuous for <Katex tex="x\in[-1,1]" />. Find the value of{' '}
          <Katex tex="a" /> and the value of <Katex tex="b" />, where <Katex tex="a>0" /> and{' '}
          <Katex tex="0<b<1" />.
        </p>
      </Background>
      <Background title="Before You Start">
        <p>
          The graph of <Katex tex="y=\tan u" /> is a row of identical <b>branches</b>, one every{' '}
          <Katex tex="\pi" />. Each rises from <Katex tex="-\infty" /> to <Katex tex="\infty" /> between two
          vertical asymptotes, at <Katex tex="u=\pm\tfrac\pi2,\ \pm\tfrac{3\pi}2,\ \ldots;" /> the branch through
          the origin is the one on <Katex tex="-\tfrac\pi2<u<\tfrac\pi2" />.
        </p>
        <p>
          So an equation like <Katex tex="\tan u=\sqrt3" /> has one solution on every branch,{' '}
          <Katex tex="u=\tfrac\pi3,\ \tfrac\pi3\pm\pi,\ \ldots," /> and the real work is choosing which one. The exact
          values come from the two special triangles: <Katex tex="\tan\tfrac\pi6=\tfrac1{\sqrt3}" />,{' '}
          <Katex tex="\tan\tfrac\pi4=1" />, <Katex tex="\tan\tfrac\pi3=\sqrt3" />, and{' '}
          <Katex tex="\tan(-u)=-\tan u" />.
        </p>
        <p>
          In <Katex tex="y=\tan(ax+b)" /> the angle is <Katex tex="u=ax+b" />. The graph in the question is one
          branch of <Katex tex="\tan u" />, dilated and translated (one period of tan is one branch), and
          &ldquo;continuous for <Katex tex="x\in[-1,1]" />&rdquo; means the angle <Katex tex="ax+b" /> stays on a
          single branch for every <Katex tex="x" /> in that interval.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="The angle inside the tan: as x runs from −1 to 1, ax + b stays on the branch through the origin">
        <InsideWidget />
      </Explore>
      <WrongMethod
        title="tan u = −1, so the angle is 3π/4"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="-a+b=\tfrac{3\pi}4,\quad a+b=\tfrac\pi3" />
            <Katex display tex="2b=\tfrac{13\pi}{12} \implies b=\tfrac{13\pi}{24},\ a=-\tfrac{5\pi}{24}" />
          </>
        }
      >
        <p>
          <Katex tex="\tfrac{3\pi}4" /> is a solution of <Katex tex="\tan u=-1" />, but on the next branch along, not
          the branch this graph is on. The answer gives itself away twice: <Katex tex="a=-\tfrac{5\pi}{24}" /> is
          negative and <Katex tex="b=\tfrac{13\pi}{24}\approx1.70" /> is bigger than <Katex tex="1" />, breaking both
          conditions the question set.
        </p>
        <p>
          The curve <Katex tex="y=\tan\left(-\tfrac{5\pi}{24}x+\tfrac{13\pi}{24}\right)" /> does pass through both
          points, but between them its angle falls from <Katex tex="\tfrac{3\pi}4" /> to <Katex tex="\tfrac\pi3" />{' '}
          and passes <Katex tex="\tfrac\pi2" />, so it has an asymptote at <Katex tex="x=\tfrac15" />: not the unbroken
          branch shown. When an answer breaks a stated condition, go back to the step where you undid the tan.
        </p>
      </WrongMethod>
      <WrongMethod
        title="tan(π/6) = √3"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="-a+b=-\tfrac\pi4,\quad a+b=\tfrac\pi6" />
            <Katex display tex="2b=-\tfrac\pi{12} \implies b=-\tfrac\pi{24},\ a=\tfrac{5\pi}{24}" />
          </>
        }
      >
        <p>
          <Katex tex="\tfrac\pi6" /> and <Katex tex="\tfrac\pi3" /> have been swapped:{' '}
          <Katex tex="\tan\tfrac\pi6=\tfrac1{\sqrt3}\approx0.58" />, so this curve passes through{' '}
          <Katex tex="\left(1,\tfrac1{\sqrt3}\right)" />, not <Katex tex="\left(1,\sqrt3\right)" />. Draw the
          half-equilateral triangle with sides <Katex tex="1" />, <Katex tex="\sqrt3" />, <Katex tex="2" />: tan is
          opposite over adjacent, and the side <Katex tex="\sqrt3" /> is opposite the <Katex tex="\tfrac\pi3" /> angle,
          so <Katex tex="\tan\tfrac\pi3=\tfrac{\sqrt3}1" />.
        </p>
        <p>
          Two quick checks catch the slip: <Katex tex="\sqrt3>1=\tan\tfrac\pi4" />, so the angle must be bigger than{' '}
          <Katex tex="\tfrac\pi4" />; and <Katex tex="b=-\tfrac\pi{24}" /> comes out negative, breaking{' '}
          <Katex tex="0<b<1" />.
        </p>
      </WrongMethod>
      <Explore title="Why −π/4 and π/3? Try the other solutions — each one breaks a condition the question set">
        <AnglesWidget />
      </Explore>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
