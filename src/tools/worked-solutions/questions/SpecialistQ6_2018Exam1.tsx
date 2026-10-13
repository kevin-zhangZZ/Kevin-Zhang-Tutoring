// 2018 Specialist Mathematics — Exam 1, Question 6 (3 marks). Change in momentum of a
// particle whose position vector is given, between two times.
//
// The word "momentum" is mechanics vocabulary, but the mathematics is vector calculus:
// differentiate a position vector, evaluate at two times, subtract. The only mechanics
// content is the one-line definition p = mv, supplied here. Guide §13.7 — judge the
// question's mathematics, not its vocabulary; the skip guide carries a row recording that
// reading, as it does for 2019 Exam 2 MCQ 13.
//
// The paper asks for the change in momentum "in kg ms⁻²" — a VCAA slip (momentum is in
// kg m s⁻¹); the report says students who answered with the average rate of change of
// momentum instead, to match the units, were awarded marks accordingly.
//
// Question text transcribed from the original paper (no diagram given). Answer checked
// independently with sympy, against the VCAA examination report (2(−i + j + πk)) and against
// itute (−2i + 2j + 2πk kg ms⁻¹). Solution is original.
//
// Interactive: interactives/spec-2018e1-q6-tip-to-tip — the momentum's horizontal part swings
// clockwise round a circle of radius 2 while its k-part climbs a number line; Δp is the arrow from
// the start tip to the end tip, and a toggle shows that the horizontal sizes never change even
// though the momentum does (why the answer must be a vector). WrongMethods: giving the magnitude
// (report: "Some students thought that a scalar result was required") and the −(−j) sign slip.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TipToTipWidget = lazyWidget(() => import('../interactives/spec-2018e1-q6-tip-to-tip'))

const EXAM: SAExaminerStats = {
  marks: [12, 14, 42, 31],
  average: 1.9,
  comment: (
    <>
      The majority of students correctly differentiated <Katex tex="\underset{\sim}{r}(t)" /> to
      find{' '}
      <Katex tex="\dot{\underset{\sim}{r}}(t)=\cos(t)\,\underset{\sim}{i}-\sin(t)\,\underset{\sim}{j}+2t\,\underset{\sim}{k}" />{' '}
      and substituted <Katex tex="t=\tfrac{\pi}{2}" /> and <Katex tex="t=\pi" />. Some students
      made errors in their arithmetic when attempting to evaluate{' '}
      <Katex tex="2\left(\dot{\underset{\sim}{r}}(\pi)-\dot{\underset{\sim}{r}}\left(\tfrac{\pi}{2}\right)\right)" />.
      A number of students were unable to evaluate the trigonometric expressions correctly.
      Some students thought that a scalar result was required.
      <br />
      Students who interpreted this question as asking for the average rate of change of
      momentum to be dimensionally consistent with the units and did this correctly were
      awarded marks accordingly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = \sin(t)\,\underset{\sim}{i} + \cos(t)\,\underset{\sim}{j} + t^2\,\underset{\sim}{k}" />,
    reason: <>Given. Velocity is the derivative of position, so the plan is: differentiate, then evaluate at the two times.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \dot{\underset{\sim}{r}}(t) = \cos(t)\,\underset{\sim}{i} - \sin(t)\,\underset{\sim}{j} + 2t\,\underset{\sim}{k}" />,
    reason: <>Differentiate each component on its own (<Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" />, <Katex tex="\underset{\sim}{k}" /> are fixed directions). Watch the sign: <Katex tex="\cos" /> differentiates to <Katex tex="-\sin" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{p}(t) = m\underset{\sim}{v}(t) = 2\dot{\underset{\sim}{r}}(t)" />,
    reason: <>Momentum <Katex tex="=" /> mass <Katex tex="\times" /> velocity, with <Katex tex="m=2" /> kg. Velocity is a vector, so momentum is a vector too.</>,
    more: <>Momentum points the way the particle is moving, and its length is mass <Katex tex="\times" /> speed.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}\!\left(\frac{\pi}{2}\right) = 0\,\underset{\sim}{i} - 1\,\underset{\sim}{j} + \pi\,\underset{\sim}{k} = -\underset{\sim}{j} + \pi\,\underset{\sim}{k}" />,
    reason: <>Substitute <Katex tex="t=\tfrac{\pi}{2}" />: <Katex tex="\cos\tfrac{\pi}{2}=0" /> and <Katex tex="\sin\tfrac{\pi}{2}=1" /> (the top of the unit circle, <Katex tex="(0,1)" />).</>,
    more: <><Katex tex="\cos t" /> and <Katex tex="\sin t" /> are the <Katex tex="x" />- and <Katex tex="y" />-coordinates of the point at angle <Katex tex="t" /> on the unit circle. Picture check, looking down on the <Katex tex="\underset{\sim}{i}" />–<Katex tex="\underset{\sim}{j}" /> plane: the particle itself is at <Katex tex="(\sin t,\cos t)" />, the unit-circle coordinates swapped, so at <Katex tex="t=\tfrac{\pi}{2}" /> it is at <Katex tex="(1,0)" />, not <Katex tex="(0,1)" />. It goes clockwise round its circle, so from <Katex tex="(1,0)" /> it is heading in the <Katex tex="-\underset{\sim}{j}" /> direction, matching the working.</>,
  },
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(\pi) = -1\,\underset{\sim}{i} - 0\,\underset{\sim}{j} + 2\pi\,\underset{\sim}{k} = -\underset{\sim}{i} + 2\pi\,\underset{\sim}{k}" />,
    reason: <>Substitute <Katex tex="t=\pi" />: <Katex tex="\cos\pi=-1" /> and <Katex tex="\sin\pi=0" /> (the point <Katex tex="(-1,0)" /> on the unit circle).</>,
    more: <>Now the <Katex tex="\underset{\sim}{j}" /> component vanishes instead. Picture check: the particle is at <Katex tex="(\sin\pi,\cos\pi)=(0,-1)" />, still going clockwise, so it is heading in the <Katex tex="-\underset{\sim}{i}" /> direction.</>,
  },
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = 2\left(\dot{\underset{\sim}{r}}(\pi) - \dot{\underset{\sim}{r}}\!\left(\frac{\pi}{2}\right)\right)" />,
    reason: <>Change <Katex tex="=" /> final <Katex tex="-" /> initial, and <Katex tex="t=\pi" /> is the final time. The mass is constant, so the <Katex tex="2" /> factors out: <Katex tex="\Delta\underset{\sim}{p} = m\,\Delta\underset{\sim}{v}" />.</>,
    more: <>It is the same as a change in temperature: new value minus old value. Subtracting the other way round flips every sign of the answer.</>,
  },
  {
    working: <Katex display tex="= 2\left(\left(-\underset{\sim}{i}+2\pi\,\underset{\sim}{k}\right) - \left(-\underset{\sim}{j}+\pi\,\underset{\sim}{k}\right)\right)" />,
    reason: <>Keep the brackets: the minus sign applies to <em>every</em> component of <Katex tex="\dot{\underset{\sim}{r}}\left(\tfrac{\pi}{2}\right)" />.</>,
  },
  {
    working: <Katex display tex="= 2\left(-\underset{\sim}{i}+\underset{\sim}{j}+\pi\,\underset{\sim}{k}\right)" />,
    reason: <>Component by component. <Katex tex="\underset{\sim}{i}" />: <Katex tex="-1-0=-1" />. <Katex tex="\underset{\sim}{j}" />: <Katex tex="0-(-1)=+1" />, subtracting a negative. <Katex tex="\underset{\sim}{k}" />: <Katex tex="2\pi-\pi=\pi" />.</>,
    more: <>The report notes arithmetic errors at this step; the <Katex tex="\underset{\sim}{j}" /> part is where they hide.</>,
  },
  {
    working: <Katex display tex="\boxed{\Delta\underset{\sim}{p} = -2\underset{\sim}{i} + 2\underset{\sim}{j} + 2\pi\,\underset{\sim}{k}}" />,
    reason: <>Leave it as a vector: a change in momentum has a direction as well as a size. Its units are really kg m s<Katex tex="^{-1}" />; the paper&apos;s &ldquo;kg ms<Katex tex="^{-2}" />&rdquo; is a slip.</>,
    more: <>On the units: the report says students who instead found the average rate of change of momentum, to match the printed kg ms<Katex tex="^{-2}" />, were awarded marks accordingly. That average rate is the change divided by the time taken,{' '}<Katex tex="\Delta\underset{\sim}{p}\div\tfrac{\pi}{2}=-\tfrac{4}{\pi}\underset{\sim}{i}+\tfrac{4}{\pi}\underset{\sim}{j}+4\underset{\sim}{k}" /> kg m s<Katex tex="^{-2}" />.</>,
  },
]

export default function SpecialistQ6_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p className="mb-2">
          A particle of mass <Katex tex="2" /> kg moves under a force{' '}
          <Katex tex="\underset{\sim}{F}" /> so that its position vector{' '}
          <Katex tex="\underset{\sim}{r}" /> at any time <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}=\sin(t)\,\underset{\sim}{i}+\cos(t)\,\underset{\sim}{j}+t^2\,\underset{\sim}{k}" />.
          Distances are measured in metres and time is measured in seconds.
        </p>
        <p>
          Find the change in momentum, in kg ms<Katex tex="^{-2}" />, from{' '}
          <Katex tex="t=\dfrac{\pi}{2}" /> to <Katex tex="t=\pi" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background title="Mechanics wording, vector-calculus question">
          <p>
            Force and momentum are not on the current Specialist study design, so this
            question <em>looks</em> like one to skip. It is not. The only physics involved is
            the definition <Katex tex="\underset{\sim}{p}=m\underset{\sim}{v}" /> — momentum
            is mass times velocity — which you need to know. Everything after
            it is differentiating a vector function and substituting, which is squarely
            current content.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Change in momentum is final minus initial, drawn tip to tip">
          <TipToTipWidget />
        </Explore>
        <WrongMethod
          title="The answer should be a number, so give its magnitude"
          source="Examiner's report"
          working={<Katex display tex="|\Delta\underset{\sim}{p}| = 2\sqrt{(-1)^2+1^2+\pi^2} = 2\sqrt{2+\pi^2}" />}
        >
          The report says some students thought a scalar result was required. But &ldquo;change in
          momentum&rdquo; is a vector: it says which way the particle was pushed, not just how hard.
          The magnitude answers a different question. Only reduce a vector to a number when the
          question asks for it, with a word like &ldquo;magnitude&rdquo;, &ldquo;speed&rdquo; or
          &ldquo;distance&rdquo;.
        </WrongMethod>
        <WrongMethod
          title="Getting −j instead of +j"
          working={<Katex display tex="2\left(-\underset{\sim}{i}-\underset{\sim}{j}+\pi\,\underset{\sim}{k}\right) = -2\underset{\sim}{i}-2\underset{\sim}{j}+2\pi\,\underset{\sim}{k}" />}
        >
          The <Katex tex="\underset{\sim}{j}" /> part of{' '}
          <Katex tex="\dot{\underset{\sim}{r}}\left(\tfrac{\pi}{2}\right)" /> is{' '}
          <Katex tex="-1" />, so subtracting it <em>adds</em> 1: <Katex tex="0-(-1)=+1" />. Write
          each component&apos;s subtraction out with brackets.
        </WrongMethod>
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
