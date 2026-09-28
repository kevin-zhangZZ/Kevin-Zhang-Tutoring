// 2018 Specialist Mathematics — Exam 1, Question 4 (4 marks). Mean and variance of a linear
// combination of two independent random variables, solved for integer coefficients. Question
// text transcribed from the original paper (no diagram given). Answer checked independently
// with sympy and against the VCAA examination report; itute's solution agrees (a = 2, b = 3).
// Solution is original.
//
// Interactives: spec-2018e1-q4-squares (spoiler-free, before the working: why Var(aX) = a^2 Var(X),
// with each distance from the mean drawn as a square) and spec-2018e1-q4-meet (after the working:
// the mean condition as the line a + b = 5 and the variance condition as the ellipse
// 2a^2 + 4b^2 = 44, meeting at (2, 3) and (14/3, 1/3); toggle shows the report's "squared"
// equation as a circle that never meets the ellipse). Common Mistake boxes: the report's
// "squared" equation and unrejected non-integer root (both verified), plus the unsquared
// variance rule (no source; verified to give the integers a = -12, b = 17, variance 1444).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquaresWidget = lazyWidget(() => import('../interactives/spec-2018e1-q4-squares'))
const MeetWidget = lazyWidget(() => import('../interactives/spec-2018e1-q4-meet'))

const EXAM: SAExaminerStats = {
  marks: [5, 8, 8, 36, 43],
  average: 3.0,
  comment: (
    <>
      From the information given, students needed to write down a pair of simultaneous
      equations <Katex tex="2a+2b=10" />, <Katex tex="2a^2+4b^2=44" /> and then solve for{' '}
      <Katex tex="a" /> and <Katex tex="b" />. Common problems included failing to reject the
      non-integer solution and only stating the solution with minimal or no working. Students
      are reminded that in a question worth more than one mark, appropriate working must be
      shown.
      <br />
      Algebraic errors were common, with some students having difficulty solving a quadratic
      equation. Quite a few students 'squared' both sides of the first equation to obtain{' '}
      <Katex tex="4a^2+4b^2=100" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="E(X)=2, \quad \operatorname{Var}(X)=2" />
        <Katex display tex="E(Y)=2, \quad \operatorname{Var}(Y)=4" />
      </>
    ),
    reason: <>Given. There are two unknowns, and the question gives two facts about <Katex tex="aX+bY" /> (its mean and its variance), so expect one equation from each.</>,
  },
  {
    working: (
      <>
        <Katex display tex="E(aX+bY) = aE(X)+bE(Y)" />
        <Katex display tex="= 2a+2b = 10" />
      </>
    ),
    reason: <>&ldquo;Mean of <Katex tex="aX+bY" />&rdquo; means use the linear rule for expectation: the coefficients come out exactly as they are. This rule always holds; independence is not needed for it.</>,
  },
  {
    working: <Katex display tex="a+b = 5" />,
    reason: <>Divide by <Katex tex="2" /> to keep the numbers small. This is the equation to substitute from later.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(aX+bY) = a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />,
    reason: <>&ldquo;Variance of <Katex tex="aX+bY" />&rdquo; means use the variance rule. The coefficients come out <em>squared</em> (variance is an average of squared distances from the mean; see the Explore box above), and the two variances simply add only because <Katex tex="X" /> and <Katex tex="Y" /> are independent, which is why the question says so.</>,
  },
  {
    working: <Katex display tex="2a^2+4b^2 = 44" />,
    reason: <>Substitute <Katex tex="\operatorname{Var}(X)=2" /> and <Katex tex="\operatorname{Var}(Y)=4" />. The squared coefficients make this second equation quadratic.</>,
  },
  {
    working: <Katex display tex="a^2+2b^2 = 22" />,
    reason: <>Divide by <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="a = 5-b \implies (5-b)^2+2b^2 = 22" />,
    reason: <>One linear and one quadratic equation: make one unknown the subject of the linear equation and substitute it into the quadratic, the same move as finding where a line meets a curve. Replacing <Katex tex="a" /> leaves <Katex tex="2b^2" /> alone, so only <Katex tex="(5-b)^2" /> needs expanding.</>,
  },
  {
    working: <Katex display tex="25-10b+b^2+2b^2 = 22" />,
    reason: <>Expand <Katex tex="(5-b)^2 = 25-10b+b^2" />. Don&apos;t drop the middle term <Katex tex="-10b" />.</>,
  },
  {
    working: <Katex display tex="3b^2-10b+3 = 0" />,
    reason: <>Collect like terms and move the <Katex tex="22" /> across, so the quadratic equals zero and can be factorised.</>,
  },
  {
    working: <Katex display tex="(3b-1)(b-3) = 0 \implies b = \frac13 \ \text{ or } \ b = 3" />,
    reason: <>Two numbers with product <Katex tex="3\times3=9" /> and sum <Katex tex="-10" /> are <Katex tex="-9" /> and <Katex tex="-1" />, which gives the factors. Two roots are expected: a line can cut an ellipse twice (see the graph below).</>,
  },
  {
    working: <Katex display tex="b=\frac13 \text{ rejected (not an integer)}" />,
    reason: <>This is what &ldquo;<Katex tex="a" /> and <Katex tex="b" /> are integers&rdquo; is for. State the rejection in writing: the report names failing to reject the non-integer solution as a common problem. (<Katex tex="b=\tfrac13" /> would give <Katex tex="a=\tfrac{14}{3}" />, also not an integer.)</>,
  },
  {
    working: <Katex display tex="b=3 \implies a = 5-3 = 2" />,
    reason: <>Back-substitute into the linear equation <Katex tex="a=5-b" />, the easiest one to use.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 2, \quad b = 3}" />,
    reason: <>Check both conditions: <Katex tex="2(2)+2(3)=10" /> ✓ and <Katex tex="2(4)+4(9)=8+36=44" /> ✓. The report reminds students that in a question worth more than one mark, appropriate working must be shown.</>,
  },
]

export default function SpecialistQ4_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p className="mb-2">
          <Katex tex="X" /> and <Katex tex="Y" /> are independent random variables. The mean
          and the variance of <Katex tex="X" /> are both <Katex tex="2" />, while the mean and
          the variance of <Katex tex="Y" /> are <Katex tex="2" /> and <Katex tex="4" />{' '}
          respectively.
        </p>
        <p>
          Given that <Katex tex="a" /> and <Katex tex="b" /> are integers, find the values of{' '}
          <Katex tex="a" /> and <Katex tex="b" /> if the mean and the variance of{' '}
          <Katex tex="aX+bY" /> are <Katex tex="10" /> and <Katex tex="44" /> respectively.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two rules do all the work, and the difference between them is the whole question:
          </p>
          <p>
            <Katex tex="E(aX+bY)=aE(X)+bE(Y)" /> — coefficients come out as they are.
          </p>
          <p>
            <Katex tex="\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />{' '}
            — coefficients come out <em>squared</em>, and this form needs{' '}
            <Katex tex="X" /> and <Katex tex="Y" /> independent.
          </p>
          <p>
            Why squared? Variance is the average <em>squared</em> distance from the mean.
            Multiplying <Katex tex="X" /> by <Katex tex="a" /> multiplies every distance from the
            mean by <Katex tex="|a|" />, so every squared distance by <Katex tex="a^2" />.
          </p>
          <p>
            One linear equation and one quadratic can have two solutions, so the stated condition
            that <Katex tex="a" /> and <Katex tex="b" /> are integers is doing real work — it
            is there to be used, and the rejected root should be written down.
          </p>
        </Background>
        <Explore title="Why the coefficient comes out squared in a variance" spoilerFree>
          <SquaresWidget />
        </Explore>
        <WorkingTable rows={ROWS} />
        <Explore title="Two conditions, two meeting points, and only one pair of integers">
          <MeetWidget />
        </Explore>
        <WrongMethod
          title={<>&ldquo;Square both sides of <Katex tex="2a+2b=10" /> to get the second equation.&rdquo;</>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="4a^2+4b^2=100" />
              <Katex display tex="\text{with } 2a^2+4b^2=44: \quad b^2=-3" />
            </>
          }
        >
          Two mistakes in one. First, <Katex tex="(2a+2b)^2 = 4a^2+8ab+4b^2" />, not{' '}
          <Katex tex="4a^2+4b^2" />. Second, squaring the mean equation tells you nothing about the
          variance: the <Katex tex="44" /> is a separate fact, and it needs the variance rule. You can
          catch it: paired with the variance equation it gives <Katex tex="b^2=-3" />, which is
          impossible (the red circle in the graph never meets the ellipse), and paired with{' '}
          <Katex tex="a+b=5" /> it gives <Katex tex="(5,0)" /> or <Katex tex="(0,5)" />, whose
          variances are <Katex tex="50" /> and <Katex tex="100" />, not <Katex tex="44" />.
        </WrongMethod>
        <WrongMethod
          title={<>&ldquo;Both roots are answers, so <Katex tex="a=\tfrac{14}{3},\ b=\tfrac13" /> as well.&rdquo;</>}
          source="Examiner's report"
          working={<Katex display tex="b=\tfrac13 \implies a = 5-\tfrac13 = \tfrac{14}{3}" />}
        >
          This pair really does satisfy both equations:{' '}
          <Katex tex="2\left(\tfrac{14}{3}+\tfrac13\right)=10" /> and{' '}
          <Katex tex="2\left(\tfrac{196}{9}\right)+4\left(\tfrac19\right)=\tfrac{396}{9}=44" />.
          That is why it is tempting. But the question says <Katex tex="a" /> and{' '}
          <Katex tex="b" /> are integers, so it must be rejected, in writing. When a question states a
          restriction like this, expect to need it.
        </WrongMethod>
        <WrongMethod
          title={<>&ldquo;<Katex tex="\operatorname{Var}(aX+bY) = a\operatorname{Var}(X)+b\operatorname{Var}(Y)" />, no squares.&rdquo;</>}
          working={
            <>
              <Katex display tex="2a+4b=44 \text{ and } 2a+2b=10" />
              <Katex display tex="\implies b=17,\ a=-12" />
            </>
          }
        >
          This one is dangerous because it lands on integers. Check with the correct rule:{' '}
          <Katex tex="2(-12)^2+4(17)^2=288+1156=1444" />, not <Katex tex="44" />. Scaling a random
          variable scales every distance from the mean, and variance averages squared distances, so
          the coefficient must be squared (the first Explore box shows this). The wrong rule would
          also give a negative &ldquo;variance&rdquo; <Katex tex="2a=-24" /> from the{' '}
          <Katex tex="aX" /> part, which is impossible.
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
