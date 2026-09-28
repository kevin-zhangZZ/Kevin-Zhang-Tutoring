// 2020 Mathematical Methods — Exam 1, Question 4 (3 marks). A logarithm equation with a
// solution that has to be rejected. Question text transcribed from the original paper (no
// diagram given). Answer checked with sympy and against the VCAA examination report and itute
// (both give x = −1, rejecting x = −7; itute states the domain x > −5 first, as we do). Solution
// is original. This question has no lettered parts, so it uses the plain card layout rather
// than PartCard.
//
// Interactive diagram (§15): interactives/meth-2020e1-q4-branch.tsx builds the graph of the left
// side in the order of the working — as printed (exists only for x > −5), after the power law (a
// new branch appears on −9 < x < −5, because (x + 5)² is positive there), then "= 1", where the
// quadratic's second root x = −7 sits on that new branch. A probe x substitutes into both forms.
// Common mistakes: keeping x = −7 (the report's comment) after checking it in the rearranged
// equation, where it does work; and log a − log b = log(a − b), which gives x = −2 or −7 and
// survives the domain check (sympy-verified: 2log₂3 − log₂7 = log₂(9/7) ≈ 0.363 ≠ 1).

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BranchWidget = lazyWidget(() => import('../interactives/meth-2020e1-q4-branch'))

const EXAM: SAExaminerStats = {
  marks: [12, 19, 43, 26],
  average: 1.8,
  comment: (
    <>
      Students confidently attempted this question; however, many incorrect uses of the
      logarithmic laws were observed. Those who did end up with the appropriate quadratic
      equation and solved it correctly did not always check the validity of their answers;
      these students failed to reject the solution <Katex tex="x=-7" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2\log_2(x+5)-\log_2(x+9) = 1" />,
    reason: <>The plan: use the log laws to squeeze the left side into a <em>single</em> logarithm, undo that logarithm, and solve the equation that's left. Before any algebra, though, write down where the equation makes sense.</>,
  },
  {
    working: <Katex display tex="x+5>0 \text{ and } x+9>0 \implies x>-5" />,
    reason: <>Every log needs a positive input: <Katex tex="\log_2 A" /> asks &ldquo;what power of 2 gives <Katex tex="A" />?&rdquo;, and every power of 2 is positive, so <Katex tex="A\le0" /> has no answer. Both arguments must be positive at once, and any <Katex tex="x" /> bigger than <Katex tex="-5" /> is automatically bigger than <Katex tex="-9" />. Writing this down first is what lets you reject a solution later.</>,
  },
  {
    working: <Katex display tex="\log_2\!\left((x+5)^2\right)-\log_2(x+9) = 1" />,
    reason: <>Power law, <Katex tex="n\log_2 a=\log_2 a^n" />: the 2 in front becomes a power of the whole bracket. It is the product law in disguise, <Katex tex="\log_2(x+5)+\log_2(x+5)=\log_2\!\left((x+5)(x+5)\right)" />. The fine print: the law needs <Katex tex="{x+5>0}" />. This new line also makes sense when <Katex tex="x+5" /> is <em>negative</em>, because squaring makes it positive, and that is exactly where a false solution will sneak in (see the diagram below).</>,
  },
  {
    working: <Katex display tex="\log_2\!\left(\frac{(x+5)^2}{x+9}\right) = 1" />,
    reason: <>Quotient law, <Katex tex="\log_2 a-\log_2 b=\log_2\tfrac ab" />: subtracting logs divides the insides. Now the whole left side is one logarithm, which is what you need before you can undo it.</>,
  },
  {
    working: <Katex display tex="\frac{(x+5)^2}{x+9} = 2^1 = 2" />,
    reason: <>Undo the log with its definition: <Katex tex="\log_2 A=1" /> means <Katex tex="A=2^1" />. There are no logs left, just an equation in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="(x+5)^2 = 2(x+9)" />,
    reason: <>Multiplying both sides by <Katex tex="x+9" /> to clear the fraction. The bracket keeps the 2 multiplying all of <Katex tex="x+9" />.</>,
  },
  {
    working: <Katex display tex="x^2+10x+25 = 2x+18" />,
    reason: <>Expanding: <Katex tex="(x+5)^2=x^2+10x+25" />, not <Katex tex="x^2+25" /> (the middle term <Katex tex="2\times5x" /> is the one that goes missing). The report's general comments observe that students who did several manipulations in one line often confused themselves or made arithmetic errors, and that this was particularly evident in this question: one step per line.</>,
  },
  {
    working: <Katex display tex="x^2+8x+7 = 0 \implies (x+7)(x+1) = 0" />,
    reason: <>Everything to one side. Two numbers that multiply to 7 and add to 8: 7 and 1.</>,
  },
  {
    working: <Katex display tex="x = -7 \quad\text{or}\quad x = -1" />,
    reason: <>Two candidates. The quadratic came from the rearranged equation, which makes sense for more values of <Katex tex="x" /> than the one in the question, so test each against <Katex tex="{x>-5}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{reject } x=-7, \text{ as}" />
        <Katex display tex="\log_2(-7+5)=\log_2(-2) \text{ is undefined}" />
      </>
    ),
    reason: <><Katex tex="-7" /> is not greater than <Katex tex="-5" />: the printed equation would need <Katex tex="\log_2(-2)" />, and no power of 2 is negative. Careful: <Katex tex="x=-7" /> <em>does</em> satisfy the rearranged lines, <Katex tex="\tfrac{(-7+5)^2}{-7+9}=\tfrac42=2" />, because squaring hid the negative. So check in the equation as printed, and write the reason when you reject. The report notes that those who solved the quadratic correctly did not always check the validity of their answers, and so failed to reject <Katex tex="x=-7" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -1}" />,
    reason: <>The only solution. Check in the printed equation: <Katex tex="2\log_2(4)-\log_2(8) = 2\times2-3 = 1" /> ✓.</>,
  },
]

export default function MethodsQ4_2020Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 4 (3 marks)">
        <p>
          Solve the equation <Katex tex="2\log_2(x+5)-\log_2(x+9)=1" />.
        </p>
      </Background>
      <Background title="Before You Start">
        <p>
          <b>What a logarithm is.</b> <Katex tex="\log_2 A" /> is the power you raise 2 to in
          order to get <Katex tex="A" />: <Katex tex="\log_2 8=3" /> because <Katex tex="2^3=8" />.
          Every power of 2 is positive, so <Katex tex="\log_2 A" /> only exists when{' '}
          <Katex tex="A>0" />; <Katex tex="\log_2 0" /> and <Katex tex="\log_2(-2)" /> have no
          value.
        </p>
        <p>
          <b>The laws used here</b>, each true when <Katex tex="a,b>0" />:{' '}
          <Katex tex="\log a+\log b=\log(ab)" />, <Katex tex="\log a-\log b=\log\tfrac ab" /> and{' '}
          <Katex tex="n\log a=\log a^n" />. They change how an expression looks, but they can also
          quietly change <em>where</em> it is defined: <Katex tex="(x+5)^2" /> is positive even
          when <Katex tex="x+5" /> isn&apos;t. That is why every answer to a log equation is checked
          against the domain of the equation as it was printed.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Where x = −7 comes from: the power law adds a branch the printed equation doesn't have">
        <BranchWidget />
      </Explore>
      <WrongMethod
        title="Keep x = −7, because it checks out"
        source="Examiner's report"
        working={
          <>
            <Katex display tex="\log_2\!\left(\frac{(-7+5)^2}{-7+9}\right) = \log_2\!\left(\tfrac42\right)" />
            <Katex display tex="= \log_2 2 = 1" />
            <Katex display tex="\therefore\ x=-7 \ \text{or}\ x=-1" />
          </>
        }
      >
        The check was done in the rearranged equation, not the one in the question. Squaring turned{' '}
        <Katex tex="x+5=-2" /> into <Katex tex="4" />, so the rearranged form has a value at{' '}
        <Katex tex="x=-7" />, but the printed equation doesn&apos;t: its first term is{' '}
        <Katex tex="\log_2(-2)" />. A negative inside a log isn&apos;t rescued by a square that only
        appears later. In the diagram above, <Katex tex="x=-7" /> is on the extra orange branch the
        power law created. Test every root against the domain <Katex tex="{x>-5}" />, written down
        before you start.
      </WrongMethod>
      <WrongMethod
        title={<>Subtract the insides: log₂a − log₂b = <span className="whitespace-nowrap">log₂(a − b)</span></>}
        working={
          <>
            <Katex display tex="\log_2\!\left((x+5)^2-(x+9)\right) = 1" />
            <Katex display tex="(x+5)^2-(x+9) = 2" />
            <Katex display tex="x^2+9x+14 = (x+2)(x+7) = 0" />
            <Katex display tex="x=-2 \ \text{or}\ x=-7" />
            <Katex display tex="x>-5, \text{ so } x=-2" />
          </>
        }
      >
        The report notes many incorrect uses of the logarithmic laws on this question, without
        listing them; this is a tempting one. Logs turn multiplication into addition, <Katex tex="\log_2(ab)=\log_2a+\log_2b" />,
        so subtracting logs undoes a <em>division</em>. There is no law for{' '}
        <Katex tex="\log_2(a-b)" />. Try it on numbers: <Katex tex="\log_2 8-\log_2 4=3-2=1" />, but{' '}
        <Katex tex="\log_2(8-4)=2" />. This wrong answer even survives the domain check, since{' '}
        <Katex tex="{-2>-5}" />. Substituting into the printed equation catches it:{' '}
        <Katex tex="2\log_2 3-\log_2 7=\log_2\tfrac97" />, which is not 1.
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
      </div>
    </div>
  )
}
