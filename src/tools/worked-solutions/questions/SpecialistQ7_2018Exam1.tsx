// 2018 Specialist Mathematics — Exam 1, Question 7 (3 marks). Use a double angle formula to
// collapse cot(2x) + ½tan(x) to a multiple of cot(x). Question text transcribed from the
// original paper (no diagram given). Identity verified symbolically and numerically in
// sympy, and checked against the VCAA examination report (a = ½) and itute (a = ½). Solution is
// original.
//
// Widgets: spec-2018e1-q7-midpoint (cot(2x) is the average of cot(x) and −tan(x), so adding
// ½tan(x) leaves ½cot(x)) and spec-2018e1-q7-match (slide a until a·cot(x) lies on the left-hand
// side; the ratio LHS ÷ cot(x) is ½ at every x; toggle for the report's cot(2x) = 1/cos(2x) error).
// Wrong methods: cot(2x) = 1/cos(2x) and a = 2 (both named in the report; the ratios quoted for the
// first were computed in sympy: 0.672 at x = π/8, 1.321 at x = π/6).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MidpointWidget = lazyWidget(() => import('../interactives/spec-2018e1-q7-midpoint'))
const MatchWidget = lazyWidget(() => import('../interactives/spec-2018e1-q7-match'))

const EXAM: SAExaminerStats = {
  marks: [10, 6, 19, 66],
  average: 2.4,
  comment: (
    <>
      This question was answered well, with most students converting{' '}
      <Katex tex="\cot(2x)" /> into <Katex tex="\tfrac{1}{\tan(2x)}" /> and using a double
      angle formula. A number of students used <Katex tex="\sin" /> and <Katex tex="\cos" />{' '}
      but were less successful than those who used the more direct approach. A number of
      students thought that <Katex tex="\cot(2x)" /> was equal to{' '}
      <Katex tex="\tfrac{1}{\cos(2x)}" />. Some students gave their final answer as{' '}
      <Katex tex="a=2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cot(2x) = \frac{1}{\tan(2x)}" />,
    reason: (
      <>
        How would I know to start here? The right-hand side is a multiple of{' '}
        <Katex tex="\cot(x)=\tfrac{1}{\tan(x)}" />, and <Katex tex="\tfrac12\tan(x)" /> is already
        in <Katex tex="\tan" />, so aim to write everything in terms of <Katex tex="\tan(x)" />.
        Careful: <Katex tex="\cot" /> is the reciprocal of <Katex tex="\tan" />, not of{' '}
        <Katex tex="\cos" /> (that is <Katex tex="\sec" />). The report says a number of students
        made that slip.
      </>
    ),
  },
  {
    working: <Katex display tex="\tan(2x) = \frac{2\tan(x)}{1-\tan^2(x)}" />,
    reason: (
      <>
        Now the "suitable double angle formula" picks itself: the <Katex tex="\tan" /> one (on the
        formula sheet) turns <Katex tex="\tan(2x)" /> into <Katex tex="\tan(x)" />, the only
        function left in the problem.
      </>
    ),
  },
  {
    working: <Katex display tex="\cot(2x) = \frac{1-\tan^2(x)}{2\tan(x)}" />,
    reason: (
      <>
        Taking the reciprocal flips the fraction. Notice that splitting it would give{' '}
        <Katex tex="\tfrac{1}{2\tan(x)}-\tfrac{\tan(x)}{2}=\tfrac12\cot(x)-\tfrac12\tan(x)" />: a{' '}
        <Katex tex="-\tfrac12\tan(x)" /> is hiding inside <Katex tex="\cot(2x)" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\cot(2x)+\tfrac12\tan(x)\\ &=\frac{1-\tan^2(x)}{2\tan(x)} + \frac{\tan(x)}{2}\end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute into the left-hand side, writing <Katex tex="\tfrac12\tan(x)" /> as{' '}
        <Katex tex="\tfrac{\tan(x)}{2}" /> so both terms are fractions ready for a common
        denominator.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac{1-\tan^2(x)}{2\tan(x)} + \frac{\tan^2(x)}{2\tan(x)}" />,
    reason: <>Common denominator <Katex tex="2\tan(x)" />: the second term is multiplied top and bottom by <Katex tex="\tan(x)" />.</>,
  },
  {
    working: (
      <Katex display tex="\begin{aligned}&= \frac{1-\tan^2(x)+\tan^2(x)}{2\tan(x)}\\ &= \frac{1}{2\tan(x)}\end{aligned}" />
    ),
    reason: (
      <>
        The <Katex tex="\tan^2(x)" /> terms cancel exactly. That cancellation is the whole point of
        the question: the <Katex tex="+\tfrac12\tan(x)" /> was chosen to wipe out the{' '}
        <Katex tex="-\tfrac12\tan(x)" /> inside <Katex tex="\cot(2x)" />, leaving a pure multiple
        of <Katex tex="\cot(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac12\cdot\frac{1}{\tan(x)} = \frac12\cot(x)" />,
    reason: (
      <>
        Pull the constant out: the 2 is in the <b>denominator</b>, so it becomes{' '}
        <Katex tex="\tfrac12" /> in front, then <Katex tex="\tfrac{1}{\tan(x)}=\cot(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = \frac12}" />,
    reason: (
      <>
        Match with <Katex tex="a\cot(x)" />. The report notes some students gave{' '}
        <Katex tex="a=2" />, the reciprocal of the correct value. A quick check catches it:
        at <Katex tex="x=\tfrac{\pi}{4}" />, the left side is{' '}
        <Katex tex="\cot\!\left(\tfrac{\pi}{2}\right)+\tfrac12\tan\!\left(\tfrac{\pi}{4}\right)=0+\tfrac12=\tfrac12" />,
        and <Katex tex="\tfrac12\cot\!\left(\tfrac{\pi}{4}\right)=\tfrac12" /> ✓ (while{' '}
        <Katex tex="2\cot\!\left(\tfrac{\pi}{4}\right)=2" />).
      </>
    ),
  },
]

export default function SpecialistQ7_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (3 marks)</p>
        <p>
          Given that <Katex tex="\cot(2x)+\dfrac12\tan(x)=a\cot(x)" />, use a suitable double
          angle formula to find the value of <Katex tex="a" />, <Katex tex="a\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            "Given that … <Katex tex="=a\cot(x)" />" means the equation is an{' '}
            <b>identity</b>: it holds for every <Katex tex="x" /> where both sides are defined, and{' '}
            <Katex tex="a" /> is a single constant. So the job is to simplify the left-hand side
            until it is visibly (constant) <Katex tex="\times\cot(x)" />, then read off the
            constant.
          </p>
          <p>
            The instruction "use a suitable double angle formula" is a strong hint about
            route. There are three double angle formulas available, but only the{' '}
            <Katex tex="\tan" /> one keeps everything in a single trigonometric function —
            and the right-hand side is a <Katex tex="\cot" />, which is just{' '}
            <Katex tex="\tfrac{1}{\tan}" />.
          </p>
          <p>
            The report confirms this is the efficient path: students who expanded into{' '}
            <Katex tex="\sin" /> and <Katex tex="\cos" /> could get there, but were less
            successful. If you do go that way, choose{' '}
            <Katex tex="\cos(2x)=\cos^2(x)-\sin^2(x)" /> and write{' '}
            <Katex tex="\tfrac12\tan(x)=\tfrac{\sin^2(x)}{2\sin(x)\cos(x)}" />, so the{' '}
            <Katex tex="\sin^2(x)" /> terms cancel and leave{' '}
            <Katex tex="\tfrac{\cos^2(x)}{2\sin(x)\cos(x)}=\tfrac12\cot(x)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why the ½tan(x) is there: cot(2x) is halfway between cot(x) and −tan(x)">
          <MidpointWidget />
        </Explore>
        <Explore title="a is the one constant that makes a·cot(x) match the left side at every x">
          <MatchWidget />
        </Explore>
        <WrongMethod
          title="cot(2x) is 1 over cos(2x)"
          source="Examiner's report"
          working={<Katex display tex="\frac{1}{\cos(2x)}+\frac12\tan(x) = a\cot(x)" />}
        >
          <Katex tex="\cot" /> is the reciprocal of <Katex tex="\tan" />:{' '}
          <Katex tex="\cot(2x)=\tfrac{\cos(2x)}{\sin(2x)}=\tfrac{1}{\tan(2x)}" />. The reciprocal of{' '}
          <Katex tex="\cos" /> is <Katex tex="\sec" />. With this slip the left side is no longer a
          constant multiple of <Katex tex="\cot(x)" />: dividing it by <Katex tex="\cot(x)" /> gives
          about <Katex tex="0.672" /> at <Katex tex="x=\tfrac{\pi}{8}" /> but{' '}
          <Katex tex="1.321" /> at <Katex tex="x=\tfrac{\pi}{6}" />. If your algebra refuses to
          collapse to a single multiple of <Katex tex="\cot(x)" />, suspect the first line.
        </WrongMethod>
        <WrongMethod
          title="The answer is 1/(2tan x), so a = 2"
          source="Examiner's report"
          working={<Katex display tex="\frac{1}{2\tan(x)} = a\cot(x) \;\Rightarrow\; a = 2" />}
        >
          The report says some students gave <Katex tex="a=2" />. One way to get there is to read the
          2 straight off <Katex tex="\tfrac{1}{2\tan(x)}" />, but it sits in the denominator:{' '}
          <Katex tex="\tfrac{1}{2\tan(x)}=\tfrac12\cdot\tfrac{1}{\tan(x)}=\tfrac12\cot(x)" />. Catch it
          by substituting one value: at <Katex tex="x=\tfrac{\pi}{4}" /> the left side is{' '}
          <Katex tex="\tfrac12" />, but <Katex tex="2\cot\!\left(\tfrac{\pi}{4}\right)=2" />.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
