// 2024 Specialist Mathematics — Exam 1 Question 9 (4 marks). Rectilinear motion given as
// v squared against position: a speed check at the origin, then acceleration from
// d(½v²)/dx. Question text transcribed from the original paper (2024 papers are image-only,
// so read from rendered pages). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [68, 32],
  average: 0.3,
  comment: (
    <>
      Many students incorrectly assumed that the speed detection device would be activated by
      the car travelling at a speed greater than 40 km/h. Students needed to show that{' '}
      <Katex tex="44^2=1936" /> and that when <Katex tex="x=0" />, <Katex tex="v^2=1936" />.
      <br />
      Some students did not use the result that <Katex tex="\arccos(0)=\dfrac{\pi}{2}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [29, 19, 17, 35],
  average: 1.6,
  comment: (
    <>
      Using the acceleration form{' '}
      <Katex tex="\dfrac{d}{dx}\left(\dfrac{1}{2}v^2\right)" /> was the most direct approach.
      Of students who chose this method, some made errors in differentiation and the factor{' '}
      <Katex tex="\dfrac{1}{2}" /> was occasionally ignored.
      <br />
      The chain rule could be used to differentiate the{' '}
      <Katex tex="\arccos\left(\dfrac{x}{20}\right)" /> function. Alternatively, the formula
      from the formula sheet could be applied. In both instances, the negative sign was
      sometimes omitted.
      <br />
      Some students elected to work with{' '}
      <Katex tex="v=\sqrt{1600+\dfrac{672}{\pi}\arccos\left(\dfrac{x}{20}\right)}" />. Only
      a small proportion of those students who chose this solution pathway also proceeded to
      correctly substitute <Katex tex="x=12" /> into the acceleration form{' '}
      <Katex tex="a=v\dfrac{dv}{dx}" /> in order to obtain the correct final answer. Some
      students only wrote an expression for <Katex tex="\dfrac{dv}{dx}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{threshold} = 40\times1.1 = 44 \ \text{km h}^{-1}" />,
    reason: <>10% above 40 is <Katex tex="40\times1.1=44" />, and "or more" means the device fires when <Katex tex="v\ge44" /> — not merely when <Katex tex="v>40" />.</>,
    more: <>This is the trap the report names: many students assumed any speed above 40 km/h would activate the device. A car at 42 km/h, say, is over the limit but is not detected.</>,
  },
  {
    working: <Katex display tex="x = 0: \quad \arccos\!\left(\tfrac{0}{20}\right) = \arccos(0) = \frac{\pi}{2}" />,
    reason: <>The device sits at <Katex tex="x=0" />. <Katex tex="\arccos(0)=\tfrac{\pi}{2}" /> because <Katex tex="\cos\tfrac{\pi}{2}=0" /> and <Katex tex="\tfrac{\pi}{2}" /> lies in the range <Katex tex="[0,\pi]" /> of <Katex tex="\arccos" />.</>,
    more: <>The report notes some students did not use <Katex tex="\arccos(0)=\tfrac{\pi}{2}" />. It is an exact value you should know without a calculator — this is Exam 1. Note it is not <Katex tex="-\tfrac{\pi}{2}" /> (outside the range of <Katex tex="\arccos" />) and not <Katex tex="0" /> (that is <Katex tex="\arccos(1)" />).</>,
  },
  {
    working: <Katex display tex="v^2 = 1600+\frac{672}{\pi}\times\frac{\pi}{2} = 1600+336 = 1936" />,
    reason: <>Substitute into the model: the <Katex tex="\pi" /> cancels and <Katex tex="\tfrac{672}{2}=336" />.</>,
  },
  {
    working: <Katex display tex="v = \sqrt{1936} = 44 \ \text{(taking } v\ge0)" />,
    reason: <><Katex tex="44^2 = 1936" />, and the question restricts to <Katex tex="v\ge0" />, so the positive root.</>,
    more: <>The report's evidence is exactly this pair of facts: <Katex tex="44^2=1936" /> and <Katex tex="v^2=1936" /> at <Katex tex="x=0" />. You may compare <Katex tex="v^2" /> with <Katex tex="44^2" /> directly instead of square-rooting — the report does. Without a calculator, check <Katex tex="44^2=1600+2\times40\times4+16=1936" />.</>,
  },
  {
    working: <Katex display tex="\boxed{44 \ge 44 \implies \text{the device is activated}}" />,
    reason: <>Exactly on the threshold counts. The question asks whether the device is activated, so end with that conclusion in words, as the report does.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{d}{dx}\left(\frac12v^2\right) = \frac12\cdot\frac{d\left(v^2\right)}{dx}" />,
    reason: <>We are given <Katex tex="v^2" /> as a function of <Katex tex="x" />, so use the formula-sheet acceleration form <Katex tex="a=\tfrac{d}{dx}\left(\tfrac12v^2\right)" /> — no need to find <Katex tex="v" />.</>,
    more: <>
      The report notes the factor <Katex tex="\tfrac12" /> was occasionally ignored — that doubles the answer to <Katex tex="-\tfrac{42}{\pi}" />.
      <br />
      The other route is <Katex tex="a=v\tfrac{dv}{dx}" /> with <Katex tex="v=\sqrt{1600+\tfrac{672}{\pi}\arccos\left(\tfrac{x}{20}\right)}" />. It gives the same result, because <Katex tex="v\tfrac{dv}{dx}=\tfrac{d}{dx}\left(\tfrac12v^2\right)" />, but the square root makes the algebra heavier. The report notes that few students on this path finished it — some stopped at <Katex tex="\tfrac{dv}{dx}" />, which is not the acceleration until it is multiplied by <Katex tex="v" />.
    </>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arccos\!\left(\frac{x}{20}\right) = \frac{-\tfrac{1}{20}}{\sqrt{1-\tfrac{x^2}{400}}}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{dx}\arccos(u)=\tfrac{-u'}{\sqrt{1-u^2}}" /> with <Katex tex="u=\tfrac{x}{20}" />, so <Katex tex="u'=\tfrac{1}{20}" />.</>,
    more: <>
      Shortcut: the formula sheet gives <Katex tex="\tfrac{d}{dx}\arccos\left(\tfrac{x}{a}\right)=\tfrac{-1}{\sqrt{a^2-x^2}}" /> for <Katex tex="a>0" />. With <Katex tex="a=20" /> it jumps straight to the end of the next line.
      <br />
      The report notes the negative sign was sometimes omitted, whichever method was used. A check: <Katex tex="\arccos" /> is a decreasing function, so its derivative must be negative.
    </>,
  },
  {
    working: <Katex display tex="= \frac{-\tfrac{1}{20}}{\tfrac{1}{20}\sqrt{400-x^2}} = \frac{-1}{\sqrt{400-x^2}}" />,
    reason: <>Pull <Katex tex="\tfrac{1}{20}" /> out from under the root: <Katex tex="\sqrt{1-\tfrac{x^2}{400}}=\sqrt{\tfrac{400-x^2}{400}}=\tfrac{1}{20}\sqrt{400-x^2}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(v^2\right)}{dx} = \frac{672}{\pi}\times\frac{-1}{\sqrt{400-x^2}} = \frac{-672}{\pi\sqrt{400-x^2}}" />,
    reason: <>The constant 1600 differentiates to zero; the <Katex tex="\tfrac{672}{\pi}" /> is a constant multiplier.</>,
  },
  {
    working: <Katex display tex="a = \frac12\times\frac{-672}{\pi\sqrt{400-x^2}} = \frac{-336}{\pi\sqrt{400-x^2}}" />,
    reason: <>Applying the <Katex tex="\tfrac12" /> from the first line.</>,
  },
  {
    working: <Katex display tex="x = 12: \quad \sqrt{400-144} = \sqrt{256} = 16" />,
    reason: <>Substitute <Katex tex="x=12" /> (inside <Katex tex="-15\le x\le15" />); <Katex tex="400-144=256=16^2" />, an exact square.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{-336}{16\pi} = -\frac{21}{\pi} \ \text{km h}^{-2}}" />,
    reason: <>So <Katex tex="k=-21" />, an integer as required. Negative acceleration while <Katex tex="v>0" />: the car is slowing down here.</>,
    more: <>At <Katex tex="x=12" />, <Katex tex="v^2=1600+\tfrac{672}{\pi}\arccos(0.6)" /> is positive (about <Katex tex="42.4^2" />), which is why <Katex tex="v>0" /> there. Keep the minus sign in <Katex tex="k" />: <Katex tex="\tfrac{21}{\pi}" /> would be wrong, because the sign is part of <Katex tex="k" />.</>,
  },
]

export default function SpecialistQ9_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (4 marks)</p>
        <p>
          A car is travelling along a straight, flat road. The velocity,{' '}
          <Katex tex="v" /> km h<Katex tex="^{-1}" />, of the car and its position,{' '}
          <Katex tex="x" /> kilometres, are measured from the position on the road where{' '}
          <Katex tex="x=0" />.
        </p>
        <p>
          The velocity <Katex tex="v" /> and the position <Katex tex="x" /> of the car are
          related by{' '}
          <Katex tex="v^2=1600+\dfrac{672}{\pi}\arccos\!\left(\dfrac{x}{20}\right)" />, where{' '}
          <Katex tex="-15\le x\le15" /> and <Katex tex="v\ge0" />.
        </p>
        <p>
          A speed detection device is positioned to detect the speed of a car as it passes
          the position <Katex tex="x=0" />. The speed limit on the road is{' '}
          <Katex tex="40 \text{ km h}^{-1}" />.
          <br />
          The speed detection device will be activated if the car is travelling at 10% or more
          above the speed limit.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Velocity is given against <em>position</em>, not time, so this question never
              needs <Katex tex="x(t)" /> or <Katex tex="v(t)" />: everything is worked in terms
              of <Katex tex="x" />.
            </p>
            <p>
              Part a. is a reading question as much as a mathematical one: the threshold comes
              from the wording, not the model.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Velocity"
        marks={1}
        statement={<>Determine, with evidence, whether the speed detection device will be activated.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Acceleration"
        marks={3}
        statement={
          <>
            Find the acceleration of the car, in km h<Katex tex="^{-2}" />, when{' '}
            <Katex tex="x=12" />.
            <br />
            Give your answer in the form{' '}
            <Katex tex="\dfrac{k}{\pi}" />, where <Katex tex="k\in Z" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
