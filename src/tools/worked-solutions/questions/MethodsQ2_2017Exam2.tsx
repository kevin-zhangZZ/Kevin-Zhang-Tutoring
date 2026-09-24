// 2017 Mathematical Methods — Exam 2, Section B, Question 2 (12 marks).
// A Ferris wheel modelled by h(t) = 65 − 55cos(πt/15), then the circular path of P and a
// tangent line of sight to a boat 500 m away. Parts (f), (g) and (h) were the hardest on
// the paper — 93% and 94% scored zero on (g) and (h). Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Answers verified
// numerically. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import p1Src from './meth-2017e2-q2-p1.png'
import p2Src from './meth-2017e2-q2-p2.png'

// Dropbox share links for the tutor's video walkthrough of parts d, f, g, h, converted to
// `raw=1` so the browser can stream them directly. All were already H.264/AAC — just
// muxed in the wrong container — so each was only losslessly remuxed
// (`ffmpeg -c copy -movflags +faststart`), no re-encoding needed.
const VIDEO = {
  d: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ALqaULFC6Uhf2HDxUit22Vc/MM%202017/Converted/SAQ2/SAQ2d-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  f: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AEzxO6rgIgIp4UDnxcFtJf0/MM%202017/Converted/SAQ2/SAQ2f-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  g: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AC0Vq2IehSDFLF-7DYgK2dw/MM%202017/Converted/SAQ2/SAQ2g-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  h: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ADhqnTXaLXCZETOHqUh4AwI/MM%202017/Converted/SAQ2/SAQ2h-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
}

const EXAM_A: SAExaminerStats = { marks: [11, 89], average: 0.9, comment: <>This question was well answered.</> }

const EXAM_B: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: <>A common incorrect answer was 15 minutes.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [29, 42, 29],
  average: 1.0,
  comment: (
    <>
      Most students were able to find the derivative. There were occasions when{' '}
      <Katex tex="\tfrac{y_2-y_1}{x_2-x_1}" /> was attempted (average rate of change). Some
      students had their technology in degree instead of radian mode, giving{' '}
      <Katex tex="h'(t)=\dfrac{11\pi^2\sin\!\left(\frac{\pi t}{15}\right)}{540}" />. Many could not
      find the maximum rate of change. A common incorrect answer was 15 minutes. Many found the
      value of <Katex tex="t" /> for the maximum value of <Katex tex="h" />. Others gave a
      general solution or two <Katex tex="t" /> values.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Many students knew to get <Katex tex="\tan^{-1}\!\left(\tfrac{65}{500}\right)" /> but
      they did not specify 'degree' for their technology. A common incorrect answer was{' '}
      <Katex tex="\theta=\tan^{-1}\!\left(\tfrac{55}{500}\right)=6.28^\circ" />. Some used{' '}
      <Katex tex="\theta=\tan\!\left(\tfrac{65}{500}\right)" /> instead of{' '}
      <Katex tex="\theta=\tan^{-1}\!\left(\tfrac{65}{500}\right)" />. Others used{' '}
      <Katex tex="\theta=\sin^{-1}\!\left(\tfrac{65}{500}\right)" />.
      <br />
      <br />
      Students should be familiar with the relevant functionality for the context and select it
      appropriately.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [10, 91],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Some students wrote{' '}
      <Katex tex="\dfrac{dy}{dx}=\dfrac{x}{\sqrt{3025-x^2}}" />. There was no need to rationalise
      the denominator.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [67, 21, 4, 8],
  average: 0.5,
  comment: (
    <>
      Many students were able to find the gradient of the line segment in terms of{' '}
      <Katex tex="u" />, using their answer from Question 2e. Others used{' '}
      <Katex tex="h(t)" /> or <Katex tex="y=\sqrt{3025-x^2}" /> instead of{' '}
      <Katex tex="y=\sqrt{3025-x^2}+65" />. Many students were unable to find the second
      gradient expression where they were required to use rise over run for the line segment{' '}
      <Katex tex="P_2B" />.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [93, 7],
  average: 0.1,
  comment: <>Some students used radians instead of degrees.</>,
}

const EXAM_H: SAExaminerStats = {
  marks: [94, 5, 2],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Some students wrote 7 minutes without showing any
      working. As indicated in the instructions on the examination, for questions worth more
      than one mark, appropriate working must be shown.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\cos\!\left(\frac{\pi t}{15}\right)\le1" />,
    reason: <>The cosine is the only thing that varies.</>,
  },
  {
    working: <Katex display tex="65-55(1) = 10, \qquad 65-55(-1) = 120" />,
    reason: <>Because of the minus sign, the <em>maximum</em> of <Katex tex="h" /> happens when the cosine is at its <em>minimum</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 10 \text{ m},\ \text{maximum } 120 \text{ m}}" />,
    reason: <>Consistent with the picture: the centre is at <Katex tex="65" /> m and the radius is <Katex tex="55" /> m.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/15} = 30" />,
    reason: <>Sammy exits after <em>one complete rotation</em>, which is one full period of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\boxed{30 \text{ minutes}}" />,
    reason: <>The report's common wrong answer, 15 minutes, is half a rotation — the time from the bottom to the top.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dh}{dt} = -55\times\left(-\frac{\pi}{15}\right)\sin\!\left(\frac{\pi t}{15}\right)" />,
    reason: <>Chain rule. The derivative of <Katex tex="\cos" /> is <Katex tex="-\sin" />, and the two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{11\pi}{3}\sin\!\left(\frac{\pi t}{15}\right)}" />,
    reason: <>Since <Katex tex="\tfrac{55\pi}{15}=\tfrac{11\pi}{3}" />, about <Katex tex="11.5" /> m per minute at its peak.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\frac{\pi t}{15}\right)=1 \implies \frac{\pi t}{15}=\frac{\pi}{2}" />,
    reason: <>The rate is greatest when the sine hits its maximum of <Katex tex="1" />, not when <Katex tex="h" /> is greatest. The report notes many students found the time of maximum height instead.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 7.5 \text{ minutes}}" />,
    reason: <>A quarter of the way round — level with the centre, where the capsule is moving straight up. At the top and the bottom it is moving sideways, so the vertical rate is zero there.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) = \frac{OC}{OB} = \frac{65}{500}" />,
    reason: <>Triangle <Katex tex="OCB" /> is right-angled at <Katex tex="O" />. The opposite side is the height of the centre, <Katex tex="65" /> m — not the radius <Katex tex="55" />, which gives the report's common incorrect answer, 6.28°.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}\!\left(\frac{65}{500}\right)" />,
    reason: <>Inverse tangent, with the calculator in <strong>degree</strong> mode for this part.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 7.41^\circ}" />,
    reason: <>A very shallow angle, which fits: the boat is nearly ten times further away horizontally than the centre is high.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y = (3025-x^2)^{\frac12}+65" />,
    reason: <>Rewriting the surd as a power so the chain rule applies directly.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac12(3025-x^2)^{-\frac12}\times(-2x)" />,
    reason: <>Chain rule; the derivative of the inside is <Katex tex="-2x" />, and the constant <Katex tex="65" /> vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-x}{\sqrt{3025-x^2}}}" />,
    reason: <>The <Katex tex="\tfrac12" /> and the <Katex tex="2" /> cancel. Negative for <Katex tex="x>0" />, as expected — the top half of the wheel falls away to the right.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\text{tangent}} = \frac{-u}{\sqrt{3025-u^2}}" />,
    reason: <>Part (e) evaluated at <Katex tex="x=u" />. This is one expression for the gradient of <Katex tex="P_2B" />, because that line <em>is</em> the tangent at <Katex tex="P_2" />.</>,
  },
  {
    working: <Katex display tex="m_{P_2B} = \frac{v-0}{u-500} = \frac{\sqrt{3025-u^2}+65}{u-500}" />,
    reason: <>Rise over run between <Katex tex="P_2(u,v)" /> and <Katex tex="B(500,0)" />, with <Katex tex="v" /> replaced using the path equation. The report says many students could not find this second expression.</>,
  },
  {
    working: <Katex display tex="\frac{-u}{\sqrt{3025-u^2}} = \frac{\sqrt{3025-u^2}+65}{u-500}" />,
    reason: <>Two names for the same gradient — one equation, one unknown.</>,
  },
  {
    working: <Cas fn="solve">solve(-u/√(3025-u²) = (√(3025-u²)+65)/(u-500), u) | 0&lt;u&lt;55</Cas>,
    reason: <>Restrict to the domain of the path. Without the restriction the CAS also returns the tangent point on the far side of the wheel.</>,
  },
  {
    working: <Katex display tex="u \approx 12.9975, \qquad v = \sqrt{3025-u^2}+65 \approx 118.4421" />,
    reason: <>Substituting back into the path equation.</>,
  },
  {
    working: <Katex display tex="\boxed{P_2 \approx (13.00,\ 118.44)}" />,
    reason: <>Two decimal places. Sensible: <Katex tex="P_2" /> is near the top of the wheel (maximum height <Katex tex="120" /> m) and just to the right of the vertical axis, exactly as the figure shows.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\alpha) = \left|m_{P_2B}\right| = \frac{u}{\sqrt{3025-u^2}}" />,
    reason: <><Katex tex="\alpha" /> is the angle the sight line makes with the horizontal at <Katex tex="B" />. The gradient is negative because the line falls as it goes right, but the angle itself is positive, so take the magnitude.</>,
  },
  {
    working: <Katex display tex="\alpha = \tan^{-1}\!\left(\frac{12.9975\ldots}{\sqrt{3025-12.9975\ldots^2}}\right)" />,
    reason: <>Use the unrounded <Katex tex="u" /> from part (f), not <Katex tex="13.00" /> — rounding early can shift the second decimal place.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha \approx 13.67^\circ}" />,
    reason: <>Degree mode again.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\angle(CP_1 \text{ below horizontal}) = \theta \approx 7.41^\circ" />,
    reason: <><Katex tex="P_1" /> lies on the line <Katex tex="CB" />, so the radius <Katex tex="CP_1" /> points from the centre towards <Katex tex="B" /> — that is, <Katex tex="\theta" /> below the horizontal.</>,
  },
  {
    working: <Katex display tex="CP_2 \perp P_2B \implies \angle(CP_2 \text{ above horizontal}) = 90^\circ-\alpha" />,
    reason: <>A tangent is perpendicular to the radius at the point of contact — the right angle marked on the figure. Since <Katex tex="P_2B" /> sits <Katex tex="\alpha" /> below the horizontal, the radius to <Katex tex="P_2" /> sits <Katex tex="90^\circ-\alpha" /> above it.</>,
  },
  {
    working: <Katex display tex="\text{arc } P_1P_2 = \theta + (90^\circ-\alpha) \approx 7.4069+76.3307" />,
    reason: <>One radius points below the horizontal and the other above it, so the angle swept between them is the sum.</>,
  },
  {
    working: <Katex display tex="\approx 83.74^\circ" />,
    reason: <>The angle at the centre through which the capsule turns while the boat is in view.</>,
  },
  {
    working: <Katex display tex="t = \frac{83.7376}{360}\times 30" />,
    reason: <>The wheel turns <Katex tex="360^\circ" /> in <Katex tex="30" /> minutes at a constant rate, so time is proportional to angle.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 7 \text{ minutes}}" />,
    reason: <><Katex tex="6.978" /> minutes to the nearest minute. The report notes students who wrote "7 minutes" with no working — a two-mark question needs the angle and the proportion shown.</>,
  },
]

export default function MethodsQ2_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (12 marks)</p>
        <p className="mb-2">
          Sammy visits a giant Ferris wheel. Sammy enters a capsule on the Ferris wheel from a
          platform above the ground. The Ferris wheel is rotating anticlockwise. The capsule
          is attached to the Ferris wheel at point <Katex tex="P" />. The height of{' '}
          <Katex tex="P" /> above the ground, <Katex tex="h" />, is modelled by{' '}
          <Katex tex="h(t)=65-55\cos\!\left(\tfrac{\pi t}{15}\right)" />, where{' '}
          <Katex tex="t" /> is the time in minutes after Sammy enters the capsule and{' '}
          <Katex tex="h" /> is measured in metres.
        </p>
        <p>Sammy exits the capsule after one complete rotation of the Ferris wheel.</p>
      </div>

      <PartCard
        letter="a"
        topic="Max & Min"
        marks={1}
        statement={
          <>
            State the minimum and maximum heights of <Katex tex="P" /> above the ground.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Period" marks={1} statement={<>For how much time is Sammy in the capsule?</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Rate of Change"
        marks={2}
        statement={
          <>
            Find the rate of change of <Katex tex="h" /> with respect to <Katex tex="t" /> and,
            hence, state the value of <Katex tex="t" /> at which the rate of change of{' '}
            <Katex tex="h" /> is at its maximum.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          As the Ferris wheel rotates, a stationary boat at <Katex tex="B" />, on a nearby
          river, first becomes visible at point <Katex tex="P_1" />. <Katex tex="B" /> is{' '}
          <Katex tex="500" /> m horizontally from the vertical axis through the centre{' '}
          <Katex tex="C" /> of the Ferris wheel and angle <Katex tex="CBO=\theta" />, as shown
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={p1Src}
            alt="The Ferris wheel as a circle centred at C above the origin O, with a straight line drawn from C through a point P1 on the circle down to B on the x-axis 500 m away; the angle theta is marked at B — from the original 2017 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Trig Ratio"
        marks={1}
        statement={
          <>
            Find <Katex tex="\theta" /> in degrees, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_D}
        videoSrc={VIDEO.d}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Part of the path of <Katex tex="P" /> is given by{' '}
          <Katex tex="y=\sqrt{3025-x^2}+65" />, <Katex tex="x\in[-55,55]" />, where{' '}
          <Katex tex="x" /> and <Katex tex="y" /> are in metres.
        </p>
      </div>

      <PartCard letter="e" topic="Derivative" marks={1} statement={<>Find <Katex tex="\dfrac{dy}{dx}" />.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          As the Ferris wheel continues to rotate, the boat at <Katex tex="B" /> is no longer
          visible from the point <Katex tex="P_2(u,v)" /> onwards. The line through{' '}
          <Katex tex="B" /> and <Katex tex="P_2" /> is tangent to the path of{' '}
          <Katex tex="P" />, where angle <Katex tex="OBP_2=\alpha" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={p2Src}
            alt="The same circle with a line from B on the x-axis touching the circle at P2 near the top, the radius CP2 drawn dashed with a right angle marked at P2, and the angle alpha marked at B — from the original 2017 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="f"
        topic="Tangent Line"
        marks={3}
        statement={
          <>
            Find the gradient of the line segment <Katex tex="P_2B" /> in terms of{' '}
            <Katex tex="u" /> and, hence, find the coordinates of <Katex tex="P_2" />, correct
            to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
        videoSrc={VIDEO.f}
      >
        <Background title="Two expressions for one gradient">
          <p>
            The whole of part (f) rests on saying the same number two different ways. The
            segment <Katex tex="P_2B" /> is a tangent, so its gradient equals the derivative
            of the path at <Katex tex="P_2" />. It is also an ordinary line segment between
            two known points, so its gradient is rise over run.
          </p>
          <p>
            Setting those two expressions equal gives one equation in <Katex tex="u" /> — and
            that is the whole question. This "tangent, so gradient equals both the derivative
            and the chord" move shows up in every year's tangent-from-an-external-point
            question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Angle"
        marks={1}
        statement={
          <>
            Find <Katex tex="\alpha" /> in degrees, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_G}
        videoSrc={VIDEO.g}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Time Interval"
        marks={2}
        statement={
          <>
            Hence or otherwise, find the length of time, to the nearest minute, during which
            the boat at <Katex tex="B" /> is visible.
          </>
        }
        examinerReport={EXAM_H}
        videoSrc={VIDEO.h}
      >
        <Background title="Turning an angle into a time">
          <p>
            The capsule is visible from <Katex tex="P_1" /> to <Katex tex="P_2" />, so the
            question is really: what angle does the wheel turn through between those two
            points?
          </p>
          <p>
            Measure both radii from the horizontal through <Katex tex="C" />.{' '}
            <Katex tex="CP_1" /> points straight at <Katex tex="B" />, so it is{' '}
            <Katex tex="\theta" /> <em>below</em> horizontal. <Katex tex="CP_2" /> is
            perpendicular to the tangent, so it is <Katex tex="90^\circ-\alpha" />{' '}
            <em>above</em> horizontal. Add them.
          </p>
          <p>
            Then convert: a full <Katex tex="360^\circ" /> takes <Katex tex="30" /> minutes,
            so multiply the angle by <Katex tex="\tfrac{30}{360}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
