// 2024 Specialist Mathematics — Exam 1 Question 9 (4 marks). Rectilinear motion given as
// v squared against position: a speed check at the origin, then acceleration from
// d(½v²)/dx. Question text transcribed from the original paper (2024 papers are image-only,
// so read from rendered pages). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    working: <Katex display tex="\text{threshold} = 40\times1.1 = 44 \ \text{km/h}" />,
    reason: <>"10% or more above the speed limit" means <Katex tex="v\ge44" />, not <Katex tex="v>40" /> — the report notes many students incorrectly assumed a speed greater than 40 km/h would activate the device.</>,
  },
  {
    working: <Katex display tex="x = 0: \quad \arccos\!\left(\tfrac{0}{20}\right) = \arccos(0) = \frac{\pi}{2}" />,
    reason: <>The device sits at the origin, so this is the only position that matters.</>,
  },
  {
    working: <Katex display tex="v^2 = 1600+\frac{672}{\pi}\times\frac{\pi}{2} = 1600+336 = 1936" />,
    reason: <>The <Katex tex="\pi" /> cancels, which is the point of the <Katex tex="\tfrac{672}{\pi}" /> in the model.</>,
  },
  {
    working: <Katex display tex="v = \sqrt{1936} = 44 \ \text{(taking } v\ge0)" />,
    reason: <><Katex tex="44^2 = 1936" /> — a deliberately exact square.</>,
  },
  {
    working: <Katex display tex="\boxed{44 \ge 44 \implies \text{the device is activated}}" />,
    reason: <>Exactly on the threshold, and "or more" makes that enough. The question asks whether the device is activated, so finish with that conclusion in words, as the report's sample answer does.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{d}{dx}\left(\frac12v^2\right) = \frac12\cdot\frac{d\left(v^2\right)}{dx}" />,
    reason: <>The acceleration form to use when <Katex tex="v^2" /> is given as a function of position — no need to find <Katex tex="v" /> itself. The report notes the factor <Katex tex="\tfrac12" /> was occasionally ignored.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arccos\!\left(\frac{x}{20}\right) = \frac{-\tfrac{1}{20}}{\sqrt{1-\tfrac{x^2}{400}}}" />,
    reason: <>The formula-sheet derivative of <Katex tex="\arccos" />, with the chain rule supplying the <Katex tex="\tfrac{1}{20}" />. The report notes the negative sign was sometimes omitted.</>,
  },
  {
    working: <Katex display tex="= \frac{-\tfrac{1}{20}}{\tfrac{1}{20}\sqrt{400-x^2}} = \frac{-1}{\sqrt{400-x^2}}" />,
    reason: <>Pulling <Katex tex="\tfrac{1}{20}" /> out from under the root, since <Katex tex="\sqrt{1-\tfrac{x^2}{400}}=\tfrac{1}{20}\sqrt{400-x^2}" />.</>,
  },
  {
    working: <Katex display tex="\frac{d\left(v^2\right)}{dx} = \frac{672}{\pi}\times\frac{-1}{\sqrt{400-x^2}} = \frac{-672}{\pi\sqrt{400-x^2}}" />,
    reason: <>The constant 1600 differentiates to zero.</>,
  },
  {
    working: <Katex display tex="a = \frac12\times\frac{-672}{\pi\sqrt{400-x^2}} = \frac{-336}{\pi\sqrt{400-x^2}}" />,
    reason: <>Applying the half.</>,
  },
  {
    working: <Katex display tex="x = 12: \quad \sqrt{400-144} = \sqrt{256} = 16" />,
    reason: <>Another exact square — the numbers are chosen to come out cleanly.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{-336}{16\pi} = -\frac{21}{\pi} \ \text{km h}^{-2}}" />,
    reason: <>So <Katex tex="k=-21" />, an integer as the question promised. Negative: the car is slowing down as it moves past this point.</>,
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Velocity is given against <em>position</em>, not time, so the right tool is{' '}
            <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> from the formula sheet.
            It takes the given expression directly — there is no need to find{' '}
            <Katex tex="v" />, let alone <Katex tex="x(t)" />.
          </p>
          <p>
            Part a. is a reading question as much as a mathematical one. The report notes
            many students treated "10% or more above the speed limit" as though it meant
            "above the speed limit", and so never reached the 44 the question turns on.
          </p>
        </Background>
      </div>

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
