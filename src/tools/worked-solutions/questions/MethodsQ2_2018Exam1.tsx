// 2018 Mathematical Methods — Exam 1, Question 2 (3 marks). Antidifferentiate a given f′ and
// pin the constant with f(2) = 0. Question text transcribed from the original paper (no
// diagram given). Answer checked independently with sympy, against the VCAA examination
// report (which leaves the answer unsimplified) and against itute (which antidifferentiates
// 1/(2x−2) as ½log_e(x−1) and gets c = −1 directly; same f). Solution is original.
// Interactive: meth-2018e1-q2-family (the family of antiderivatives, sliding c until the curve
// passes through (2, 0), with a toggle showing the missing-½ error failing the slope check).
// WrongMethod boxes: the missing ½ and stopping at c (both named in the report).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FamilyWidget = lazyWidget(() => import('../interactives/meth-2018e1-q2-family'))

const EXAM: SAExaminerStats = {
  marks: [19, 16, 35, 30],
  average: 1.8,
  comment: (
    <>
      This question was attempted well. A common misconception was that{' '}
      <Katex tex="\displaystyle\int\frac{1}{2x-2}\,dx = \log_e(2x-2)+c" />, which was
      incorrect. Some students found a value of <Katex tex="c" /> but did not substitute it
      back into the final answer to state <Katex tex="f(x)" />. Some poor notation was
      observed, for example, <Katex tex="\dfrac{1}{2x}" /> is not the same as{' '}
      <Katex tex="\dfrac{x}{2}" />, and notation for the natural logarithm is{' '}
      <Katex tex="\log_e" /> not <Katex tex="\mathrm{loge}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac12 - \frac{1}{2x-2}" />,
    reason: <>Given. <Katex tex="f'" /> tells us the slope of <Katex tex="f" /> at every <Katex tex="x" />, but not how high the graph sits. So antidifferentiate term by term to get the shape (plus a constant <Katex tex="c" />), then use <Katex tex="f(2)=0" /> to fix the height.</>,
  },
  {
    working: <Katex display tex="\int \frac{1}{2x-2}\,dx = \frac12\log_e(2x-2)+c" />,
    reason: <>The inside <Katex tex="2x-2" /> has derivative <Katex tex="2" />, so a <Katex tex="\tfrac12" /> must appear out the front to undo it. Dropping that <Katex tex="\tfrac12" /> is the common misconception the report names. How would I know I have it right? Differentiate back: <Katex tex="\tfrac{d}{dx}\,\tfrac12\log_e(2x-2) = \tfrac12\cdot\tfrac{2}{2x-2} = \tfrac{1}{2x-2}" /> ✓. No absolute value is needed: the domain is <Katex tex="(1,\infty)" />, so <Katex tex="2x-2>0" /> throughout.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{2} - \frac12\log_e(2x-2) + c" />,
    reason: <>The antiderivative of the constant <Katex tex="\tfrac12" /> is <Katex tex="\tfrac{x}{2}" /> (write it that way: the report notes that <Katex tex="\tfrac{1}{2x}" /> is not the same thing). Every value of <Katex tex="c" /> gives a curve with exactly these slopes; changing <Katex tex="c" /> only slides the graph up or down. That is why one known point is needed to pick out <Katex tex="f" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(2) = 1 - \tfrac12\log_e(2) + c &= 0 \\ c &= \tfrac12\log_e(2) - 1 \end{aligned}"
      />
    ),
    reason: <><Katex tex="f(2)=0" /> says the point <Katex tex="(2,\,0)" /> is on the graph. Substituting <Katex tex="x=2" />: <Katex tex="\tfrac22=1" /> and <Katex tex="2(2)-2=2" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{x}{2} - \frac12\log_e(2x-2) + \frac12\log_e(2) - 1" />,
    reason: <>Put the constant back in: the question asks for <Katex tex="f(x)" />, not <Katex tex="c" />, and the report flags students who found <Katex tex="c" /> and then never used it. The report&apos;s own sample answer stops at this line, so the simplification below is optional, but it makes checking easier.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = \frac{x}{2} - \frac12\log_e(x-1) - 1}" />,
    reason: <>The two logarithms combine: <Katex tex="-\tfrac12\log_e(2x-2)+\tfrac12\log_e(2) = -\tfrac12\log_e\!\left(\tfrac{2x-2}{2}\right) = -\tfrac12\log_e(x-1)" />. (A shortcut lands here directly: <Katex tex="\tfrac{1}{2x-2} = \tfrac12\cdot\tfrac{1}{x-1}" /> antidifferentiates to <Katex tex="\tfrac12\log_e(x-1)" />, which differs from <Katex tex="\tfrac12\log_e(2x-2)" /> only by the constant <Katex tex="\tfrac12\log_e(2)" />, so <Katex tex="c" /> absorbs it and comes out as <Katex tex="-1" />.) Worth a check: <Katex tex="f(2)=1-\tfrac12\log_e(1)-1=0" /> ✓, and differentiating gives back <Katex tex="\tfrac12-\tfrac{1}{2(x-1)}=\tfrac12-\tfrac{1}{2x-2}" /> ✓.</>,
  },
]

export default function MethodsQ2_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          The derivative with respect to <Katex tex="x" /> of the function{' '}
          <Katex tex="f:(1,\infty)\to R" /> has the rule{' '}
          <Katex tex="f'(x)=\dfrac12-\dfrac{1}{2x-2}" />. Given that <Katex tex="f(2)=0" />,
          find <Katex tex="f(x)" /> in terms of <Katex tex="x" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Antidifferentiating <Katex tex="\dfrac{1}{ax+b}" /> gives{' '}
            <Katex tex="\dfrac{1}{a}\log_e(ax+b)" />, not <Katex tex="\log_e(ax+b)" />. The{' '}
            <Katex tex="\tfrac1a" /> is there because differentiating the log brings the{' '}
            <Katex tex="a" /> back out by the chain rule, and it has to be cancelled.
          </p>
          <p>
            Knowing <Katex tex="f'(x)" /> fixes the <em>slope</em> of the graph at every{' '}
            <Katex tex="x" />, but not its height: <Katex tex="F(x)+c" /> has the same derivative
            for every <Katex tex="c" />, and the graphs are vertical translations of one another.
            One known point, here <Katex tex="f(2)=0" />, picks out the single member of that family
            that is <Katex tex="f" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why f′ gives a family of curves, and f(2) = 0 picks one">
          <FamilyWidget />
        </Explore>
        <WrongMethod
          title={<>The antiderivative of <Katex tex="\tfrac{1}{2x-2}" /> is <Katex tex="\log_e(2x-2)" /></>}
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned} f(x) &= \tfrac{x}{2} - \log_e(2x-2) + c \\ c &= \log_e(2) - 1 \\ f(x) &= \tfrac{x}{2} - \log_e(x-1) - 1 \end{aligned}"
            />
          }
        >
          Differentiating <Katex tex="\log_e(2x-2)" /> gives <Katex tex="\tfrac{2}{2x-2}=\tfrac{1}{x-1}" />: the
          chain rule brings the <Katex tex="2" /> out from the inside, so this is <em>twice</em> the term you
          started with. Nothing looks wrong at the constant step (the curve still passes through{' '}
          <Katex tex="(2,\,0)" />), which is why the error survives to the final answer. Catch it by
          differentiating your answer: you get <Katex tex="\tfrac12-\tfrac{1}{x-1}" />, not{' '}
          <Katex tex="\tfrac12-\tfrac{1}{2x-2}" />. At <Katex tex="x=2" /> the given{' '}
          <Katex tex="f'(2)=0" />, but this answer has slope <Katex tex="-\tfrac12" /> there.
        </WrongMethod>
        <WrongMethod
          title="Once I've found c, I'm done"
          source="Examiner's report"
          working={<Katex display tex="c = \tfrac12\log_e(2) - 1" />}
        >
          The question asks for <Katex tex="f(x)" /> in terms of <Katex tex="x" />, so the constant is only a
          step on the way. Before moving on, reread the last line of the question and check your final line
          answers it: substitute <Katex tex="c" /> back and write out the whole rule.
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
