// 2017 Mathematical Methods — Exam 1, Question 6 (3 marks).
// A factorised trig equation, then a "hence" that requires spotting the difference of two
// squares. 75% of students scored zero on part (a). Question text
// transcribed from the original paper (no diagram given). Answers verified with sympy
// ({π/4, π/3, 2π/3} on [0, π]); they agree with the examiner's report and itute.
// Solution is original.
// Widgets: (a) meth-2017e1-q6a-slopes — tan(θ) as the slope of the radius, so each factor is zero
// on one line through O (y = x, y = √3x, y = −√3x), with a toggle testing the wrong value 1/√3;
// (b) meth-2017e1-q6b-semicircle — sin²θ = 3cos²θ is the pair of lines y = ±√3x, and each line
// crosses the top half of the unit circle once, with a toggle showing the tan(θ) = √3-only slip.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SlopesWidget = lazyWidget(() => import('../interactives/meth-2017e1-q6a-slopes'))
const SemicircleWidget = lazyWidget(() => import('../interactives/meth-2017e1-q6b-semicircle'))

const EXAM_A: SAExaminerStats = {
  marks: [75, 25],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Students struggled to find solutions beyond{' '}
      <Katex tex="\tan(\theta)=1" />. Students are urged to read the question carefully so as
      to recognise what is required. A number of students attempted to find values of{' '}
      <Katex tex="\theta" />, which was not required. Some students who managed to obtain{' '}
      <Katex tex="1" /> and <Katex tex="\sqrt3" /> gave the third value as{' '}
      <Katex tex="\tfrac{1}{\sqrt3}" /> instead of <Katex tex="-\sqrt3" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 34, 25],
  average: 0.5,
  comment: (
    <>
      This question was not handled well. Many students did not follow the instruction
      "Hence", in that they did not connect this equation to part a, but still managed to find
      some solutions.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta)-1=0 \implies \tan(\theta)=1" />,
    reason: (
      <>
        A product is zero when one of its factors is zero, so take the three factors one at a time. The question
        asks for values of <Katex tex="\tan(\theta)" />, so the aim for every factor is a line of the form{' '}
        <Katex tex="\tan(\theta)=\text{number}" />. The first factor is already there.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\sin(\theta)-\sqrt3\cos(\theta)&=0\\ \sin(\theta)&=\sqrt3\cos(\theta)\end{aligned}" />,
    reason: (
      <>
        Second factor zero; move the cosine term across. How would I know what to do next? Only{' '}
        <Katex tex="\tan(\theta)" /> is wanted, and <Katex tex="\tfrac{\sin}{\cos}=\tan" />, so divide both sides
        by <Katex tex="\cos(\theta)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{\sin(\theta)}{\cos(\theta)}=\sqrt3 \implies \tan(\theta)=\sqrt3" />,
    reason: (
      <>
        Dividing by <Katex tex="\cos(\theta)" /> loses nothing: where <Katex tex="\cos(\theta)=0" />,{' '}
        <Katex tex="\sin(\theta)=\pm1" /> and this factor isn&apos;t zero. On the unit circle,{' '}
        <Katex tex="\sin(\theta)=\sqrt3\cos(\theta)" /> says the point <Katex tex="(\cos\theta,\sin\theta)" /> is
        on the line <Katex tex="y=\sqrt3x" />, whose gradient is <Katex tex="\sqrt3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\sin(\theta)+\sqrt3\cos(\theta)&=0\\ \sin(\theta)&=-\sqrt3\cos(\theta)\end{aligned}" />,
    reason: <>Third factor zero, same move. Moving <Katex tex="\sqrt3\cos(\theta)" /> across makes it negative.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=-\sqrt3" />,
    reason: (
      <>
        Divide by <Katex tex="\cos(\theta)" />. Sign check: <Katex tex="\sin(\theta)+\sqrt3\cos(\theta)" /> can
        only be zero if <Katex tex="\sin(\theta)" /> and <Katex tex="\cos(\theta)" /> have opposite signs, so{' '}
        <Katex tex="\tan(\theta)" /> must be negative.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\tan(\theta)=1,\ \sqrt3,\ -\sqrt3}" />,
    reason: (
      <>
        Three values, and stop there. Part (a) gives no domain for <Katex tex="\theta" />, so there are
        infinitely many angles, but only three values of <Katex tex="\tan(\theta)" />: that is why the question
        asks for <Katex tex="\tan(\theta)" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\sin^2(\theta)-3\cos^2(\theta)\\ &=\sin^2(\theta)-\bigl(\sqrt3\cos(\theta)\bigr)^2\end{aligned}"
      />
    ),
    reason: (
      <>
        &ldquo;Hence&rdquo; says use part (a), so put the two equations side by side. The factor{' '}
        <Katex tex="\tan(\theta)-1" /> is the same; the only difference is <Katex tex="\sin^2(\theta)-3\cos^2(\theta)" />{' '}
        in place of part (a)&apos;s last two brackets. Writing <Katex tex="3" /> as <Katex tex="(\sqrt3)^2" /> makes
        it a difference of two squares.
      </>
    ),
  },
  {
    working: <Katex display tex="=\bigl(\sin(\theta)-\sqrt3\cos(\theta)\bigr)\bigl(\sin(\theta)+\sqrt3\cos(\theta)\bigr)" />,
    reason: (
      <>
        <Katex tex="a^2-b^2=(a-b)(a+b)" /> with <Katex tex="a=\sin(\theta)" /> and{' '}
        <Katex tex="b=\sqrt3\cos(\theta)" />. The equation in part (b) is now exactly the equation in part (a).
      </>
    ),
  },
  {
    working: <Katex display tex="\therefore\ \tan(\theta)=1,\ \sqrt3,\ -\sqrt3" />,
    reason: (
      <>
        Straight from part (a). Only the angles are left. <Katex tex="\tan" /> repeats every <Katex tex="\pi" />,
        so on <Katex tex="0\le\theta\le\pi" /> each non-zero value of <Katex tex="\tan(\theta)" /> occurs exactly
        once: expect exactly three solutions.
      </>
    ),
  },
  {
    working: <Katex display tex="\tan(\theta)=1 \implies \theta=\frac{\pi}{4}" />,
    reason: (
      <>
        <Katex tex="\tan" /> is positive, so first quadrant. The other angle with <Katex tex="\tan(\theta)=1" /> in
        a full turn, <Katex tex="\tfrac{5\pi}{4}" />, is outside the domain.
      </>
    ),
  },
  {
    working: <Katex display tex="\tan(\theta)=\sqrt3 \implies \theta=\frac{\pi}{3}" />,
    reason: (
      <>
        The exact value from the <Katex tex="30" />–<Katex tex="60" />–<Katex tex="90" /> triangle with sides{' '}
        <Katex tex="1,\ \sqrt3,\ 2" />: at the <Katex tex="60^\circ" /> angle, opposite ÷ adjacent{' '}
        <Katex tex="=\tfrac{\sqrt3}{1}" />.
      </>
    ),
  },
  {
    working: (
      <Katex display tex="\begin{aligned}\tan(\theta)&=-\sqrt3\\ \theta&=\pi-\frac{\pi}{3}=\frac{2\pi}{3}\end{aligned}" />
    ),
    reason: (
      <>
        <Katex tex="\tan" /> is negative, and the only part of <Katex tex="[0,\pi]" /> where that happens is the
        second quadrant. The reference angle is still <Katex tex="\tfrac{\pi}{3}" /> (because{' '}
        <Katex tex="\tan\tfrac{\pi}{3}=\sqrt3" />), so <Katex tex="\theta=\pi-\tfrac{\pi}{3}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\theta=\frac{\pi}{4},\ \frac{\pi}{3},\ \frac{2\pi}{3}}" />,
    reason: (
      <>
        Three solutions in <Katex tex="0\le\theta\le\pi" />, one for each value of <Katex tex="\tan(\theta)" />.
        Note <Katex tex="\theta=\tfrac{\pi}{2}" /> can never be a solution: <Katex tex="\tan" /> is undefined
        there, so the left side has no value.
      </>
    ),
  },
]

export default function MethodsQ6_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Let{' '}
          <Katex tex="\bigl(\tan(\theta)-1\bigr)\bigl(\sin(\theta)-\sqrt3\cos(\theta)\bigr)\bigl(\sin(\theta)+\sqrt3\cos(\theta)\bigr)=0" />
          .
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={1}
        statement={
          <>
            State all possible values of <Katex tex="\tan(\theta)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Turning a sin–cos factor into a tan statement">
          <p>
            Any equation of the form <Katex tex="a\sin(\theta)+b\cos(\theta)=0" /> is secretly
            a statement about <Katex tex="\tan" />: divide through by{' '}
            <Katex tex="\cos(\theta)" /> and it becomes{' '}
            <Katex tex="a\tan(\theta)+b=0" />, so <Katex tex="\tan(\theta)=-\tfrac{b}{a}" />.
          </p>
          <p>
            (Dividing by <Katex tex="\cos(\theta)" /> is safe here: if{' '}
            <Katex tex="\cos(\theta)" /> were zero then <Katex tex="\sin(\theta)=\pm1" /> and
            the factor could not be zero anyway.)
          </p>
          <p>
            The picture behind it: on the unit circle the point for <Katex tex="\theta" /> is{' '}
            <Katex tex="(\cos\theta,\sin\theta)" />, so the radius to it rises <Katex tex="\sin\theta" /> over a run
            of <Katex tex="\cos\theta" />. Its gradient is <Katex tex="\tfrac{\sin\theta}{\cos\theta}=\tan\theta" />.
            An equation like <Katex tex="\sin(\theta)=\sqrt3\cos(\theta)" /> just fixes that gradient.
          </p>
          <p>
            That one move turns the last two factors into <Katex tex="\tan(\theta)=\sqrt3" />{' '}
            and <Katex tex="\tan(\theta)=-\sqrt3" /> in a line each. Three-quarters of students
            scored zero here; the report says students struggled to go beyond{' '}
            <Katex tex="\tan(\theta)=1" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="tan(θ) is the slope of the radius, so each factor is zero on one line">
          <SlopesWidget />
        </Explore>
        <WrongMethod
          title={<>The third factor gives <Katex tex="\tan(\theta)=\tfrac{1}{\sqrt3}" /></>}
          source="Examiner's report"
          working={<Katex tex="\tan(\theta)=1,\ \sqrt3,\ \tfrac{1}{\sqrt3}" />}
        >
          The report notes students who found <Katex tex="1" /> and <Katex tex="\sqrt3" /> and then gave the third
          value as <Katex tex="\tfrac{1}{\sqrt3}" />. The third factor differs from the second only in a sign, so its{' '}
          <Katex tex="\tan" /> value differs only in sign: <Katex tex="\sin(\theta)=-\sqrt3\cos(\theta)" /> gives{' '}
          <Katex tex="-\sqrt3" />. Catch it by substituting back: <Katex tex="\tan(\theta)=\tfrac{1}{\sqrt3}" /> at{' '}
          <Katex tex="\theta=\tfrac{\pi}{6}" />, where the third factor is{' '}
          <Katex tex="\sin\tfrac{\pi}{6}+\sqrt3\cos\tfrac{\pi}{6}=\tfrac12+\tfrac32=2" />, not <Katex tex="0" />.
        </WrongMethod>
        <WrongMethod
          title={<>Solve for the angles: <Katex tex="\theta=\tfrac{\pi}{4},\ \tfrac{\pi}{3},\ \tfrac{2\pi}{3}" /></>}
          source="Examiner's report"
        >
          The report says a number of students found values of <Katex tex="\theta" />, which was not required. Part
          (a) gives no domain, so the angles never stop (<Katex tex="\tfrac{\pi}{4}+k\pi" />, and so on), but the
          values of <Katex tex="\tan(\theta)" /> are just three numbers. Answer the question asked: underline what
          it wants a value of before you start.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Equation"
        marks={2}
        statement={
          <>
            Hence, find all possible solutions for{' '}
            <Katex tex="\bigl(\tan(\theta)-1\bigr)\bigl(\sin^2(\theta)-3\cos^2(\theta)\bigr)=0" />
            , where <Katex tex="0\le\theta\le\pi" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="What “Hence” is pointing at">
          <p>
            &ldquo;Hence&rdquo; means the previous part does most of the work. Compare the two equations: part (b)
            keeps <Katex tex="\tan(\theta)-1" /> and replaces part (a)&apos;s other two brackets with{' '}
            <Katex tex="\sin^2(\theta)-3\cos^2(\theta)" />. Multiply those two brackets out and they give exactly
            that, so the two equations are the same equation.
          </p>
          <p>
            Once you know the values of <Katex tex="\tan(\theta)" />, each one gives exactly one angle in{' '}
            <Katex tex="0\le\theta\le\pi" />, because <Katex tex="\tan" /> repeats every <Katex tex="\pi" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Three lines through the origin, each crossing the top half of the circle once">
          <SemicircleWidget />
        </Explore>
        <WrongMethod
          title={<>Skip part (a): <Katex tex="\tan^2(\theta)=3" />, so <Katex tex="\tan(\theta)=\sqrt3" /></>}
          source="Examiner's report (“Hence” ignored)"
          working={
            <Katex tex="\begin{aligned}\tan^2(\theta)&=3\\ \tan(\theta)&=\sqrt3\\ \theta&=\tfrac{\pi}{4},\ \tfrac{\pi}{3}\ \text{only}\end{aligned}" />
          }
        >
          The report says many students did not connect this equation to part (a), but still found some solutions.
          Solving from scratch is where solutions go missing: <Katex tex="\tan^2(\theta)=3" /> has two square
          roots, <Katex tex="\tan(\theta)=\pm\sqrt3" />, and dropping the negative one loses{' '}
          <Katex tex="\theta=\tfrac{2\pi}{3}" />. Check: <Katex tex="\sin^2\tfrac{2\pi}{3}-3\cos^2\tfrac{2\pi}{3}=\tfrac34-\tfrac34=0" />.
          Part (a) already lists <Katex tex="-\sqrt3" /> as a separate value, so using it avoids the slip.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
