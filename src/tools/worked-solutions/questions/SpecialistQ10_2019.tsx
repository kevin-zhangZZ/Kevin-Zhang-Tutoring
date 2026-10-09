// 2019 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 58% correct.
// Related rates: height of a growing conical sand pile. Question text and diagram transcribed
// from the original paper (the diagram is the actual VCAA figure, cropped from the official
// exam PDF, not a redrawing). Solution is original. Interactive: spec-2019-mcq10-slab, the new sand
// as a thin disc under the old pile, so dV/dh = πr² (the base area) and dh/dt = (dV/dt) ÷ πr².
// WrongMethod boxes for E (multiplying by dV/dh) and A (no 1/3). No verified slip found for B (0.31)
// or D (3.82 = 12/π); they are not explained.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import coneSrc from './spec-2019-mcq10-cone.png'

const SlabWidget = lazyWidget(() => import('../interactives/spec-2019-mcq10-slab'))

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img
      src={coneSrc}
      alt="A cone of sand with semi-vertex angle 60 degrees and height h, marked with a right angle from the apex down to the centre of the circular base"
      className="w-full max-w-[300px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 58, D: 14, E: 7 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(60^\circ) = \frac{r}{h} \;\implies\; r = h\tan(60^\circ) = \sqrt3\,h" />,
    reason: (
      <>
        We are given <Katex tex="\tfrac{dV}{dt}" /> and want <Katex tex="\tfrac{dh}{dt}" />, so the plan is to write{' '}
        <Katex tex="V" /> in terms of <Katex tex="h" /> alone. The cone has two dimensions, <Katex tex="r" /> and{' '}
        <Katex tex="h" />, so first link them. The semi-vertex angle is measured from the vertical axis at the apex: in
        the right triangle apex, centre, edge, <Katex tex="r" /> is opposite the <Katex tex="60^\circ" /> and{' '}
        <Katex tex="h" /> is adjacent. The angle stays <Katex tex="60^\circ" /> as the pile grows, so this holds at every
        instant.
      </>
    ),
  },
  {
    working: <Katex display tex="V = \frac13\pi r^2 h = \frac13\pi \left(\sqrt3\,h\right)^2 h = \pi h^3" />,
    reason: (
      <>
        Substitute <Katex tex="r = \sqrt3\,h" /> into the cone volume formula (on the formula sheet). Now{' '}
        <Katex tex="V" /> depends on <Katex tex="h" /> only.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dV}{dh} = 3\pi h^2" />
        <Katex display tex="\frac{dh}{dt} = \frac{dh}{dV}\times\frac{dV}{dt} = \frac{1}{3\pi h^2}\times\frac{dV}{dt}" />
      </>
    ),
    reason: (
      <>
        Chain rule, arranged so the <Katex tex="dV" />s cancel: <Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of{' '}
        <Katex tex="\tfrac{dV}{dh}" />. Notice <Katex tex="3\pi h^2 = \pi(\sqrt3\,h)^2 = \pi r^2" />, the area of the
        base: the height rises at (rate of volume) ÷ (area of the base).
      </>
    ),
    more: <>The interactive below shows why.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt} = \frac{1}{3\pi(0.5)^2}\times 1.5 = \frac{1.5}{0.75\pi}" />,
    reason: (
      <>
        Substitute <Katex tex="\tfrac{dV}{dt}=1.5" /> and <Katex tex="h=0.5" /> only now, after differentiating.{' '}
        <Katex tex="h" /> is changing, so putting <Katex tex="h = 0.5" /> in before differentiating would make{' '}
        <Katex tex="V" /> a constant.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{2}{\pi} \approx 0.64}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>A</b>, <Katex tex="\tfrac{2}{3\pi}\approx0.21" />, is what you get by leaving
        the <Katex tex="\tfrac13" /> out of the cone's volume. Option <b>E</b>,{' '}
        <Katex tex="1.5\times 3\pi(0.5)^2 \approx 3.53" />, multiplies by <Katex tex="\tfrac{dV}{dh}" /> instead of
        dividing.
      </>
    ),
  },
]

export default function SpecialistQ10_2019() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3">{DIAGRAM}</div>
          <p>
            Sand falls from a chute to form a pile in the shape of a right circular cone with semi-vertex angle{' '}
            <Katex tex="60^\circ" />. Sand is added to the pile at a rate of <Katex tex="1.5\text{ m}^3" /> per minute.
          </p>
          <p className="mt-2">
            The rate at which the height <Katex tex="h" /> metres of the pile is increasing, in metres per minute,
            when the height of the pile is <Katex tex="0.5" /> m, correct to two decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.21" /> },
        { letter: 'B', content: <Katex tex="0.31" /> },
        { letter: 'C', content: <Katex tex="0.64" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3.82" /> },
        { letter: 'E', content: <Katex tex="3.53" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Why the height rises at (rate of volume) ÷ (area of the base)">
            <SlabWidget />
          </Explore>
          <WrongMethod
            title="Chain rule: dh/dt = dV/dt × dV/dh"
            source="7% chose E"
            working={<Katex display tex="\frac{dh}{dt} = 1.5\times 3\pi(0.5)^2 \approx 3.53" />}
          >
            The chain rule needs the <Katex tex="dV" />s to cancel: <Katex tex="\tfrac{dh}{dt} = \tfrac{dh}{dV}\times\tfrac{dV}{dt}" />,
            and <Katex tex="\tfrac{dh}{dV}" /> is <Katex tex="1 \div \tfrac{dV}{dh}" />. Writing{' '}
            <Katex tex="\tfrac{dV}{dt}\times\tfrac{dV}{dh}" /> gives units of m³/min × m², not m/min.
            A quick sense check catches it too: 1.5 m³ of sand a minute spread over a base of about 2.4 m² cannot lift the
            pile 3.5 m a minute.
          </WrongMethod>
          <WrongMethod
            title="Volume of the pile: V = πr²h"
            source="7% chose A"
            working={
              <>
                <Katex display tex="V = \pi(\sqrt3\,h)^2h = 3\pi h^3" />
                <Katex display tex="\frac{dh}{dt} = \frac{1.5}{9\pi(0.5)^2} \approx 0.21" />
              </>
            }
          >
            <Katex tex="\pi r^2 h" /> is a cylinder. A cone is a third of the cylinder around it,{' '}
            <Katex tex="V = \tfrac13\pi r^2h" />, which is on the formula sheet. Missing the{' '}
            <Katex tex="\tfrac13" /> makes the pile three times too big, so the height comes out rising three times too
            slowly.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
