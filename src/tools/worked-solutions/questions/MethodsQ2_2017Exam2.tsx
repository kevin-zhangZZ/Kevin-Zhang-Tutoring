// 2017 Mathematical Methods — Exam 2, Section B, Question 2 (12 marks).
// A Ferris wheel modelled by h(t) = 65 − 55cos(πt/15), then the circular path of P and a
// tangent line of sight to a boat 500 m away. Parts (f), (g) and (h) were the hardest on
// the paper — 93% and 94% scored zero on (g) and (h). Question text transcribed from the
// original paper; all three figures (the Ferris wheel in the stem, and the P₁ and P₂ diagrams)
// are crops of VCAA's own artwork — the stem figure was missing until Sept 2026. Answers
// verified with sympy/mpmath (u is exactly (60500 + 5720√157)/10169 ≈ 12.9975) and against the
// VCAA report and itute; all agree. Part h. follows the report's angle 83.737…°: the report
// reaches it as 90° − (α − θ) from triangle CP₂B, itute as (180° − α) − (90° − θ), and our
// working as θ + (90° − α) — the same angle three ways. Solution is original.
//
// Interactive diagrams (§15): part c. rides the wheel beside the graphs of h and h′, showing the
// rate is greatest level with the centre, not at the top (interactives/meth-2017e2-q2c-rate.tsx);
// part f. drags P over the top of the wheel comparing the tangent with the sight line to B, with a
// toggle for the report's "+65 left off" slip (interactives/meth-2017e2-q2f-tangent.tsx); part h.
// builds the angle at C step by step and then rides the capsule from P₁ to P₂ against the clock
// (interactives/meth-2017e2-q2h-arc.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import stemSrc from './meth-2017e2-q2-stem.png'
import p1Src from './meth-2017e2-q2-p1.png'
import p2Src from './meth-2017e2-q2-p2.png'

const RateWidget = lazyWidget(() => import('../interactives/meth-2017e2-q2c-rate'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2017e2-q2f-tangent'))
const ArcWidget = lazyWidget(() => import('../interactives/meth-2017e2-q2h-arc'))

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
    reason: <>The cosine is the only part of <Katex tex="h(t)" /> that changes with <Katex tex="t" />, and a cosine always lies between <Katex tex="-1" /> and <Katex tex="1" />. So the extreme heights come from its extreme values.</>,
  },
  {
    working: (
      <>
        <Katex display tex="65-55(1) = 10" />
        <Katex display tex="65-55(-1) = 120" />
      </>
    ),
    reason: <>Because of the minus sign, the <em>maximum</em> of <Katex tex="h" /> happens when the cosine is at its <em>minimum</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 10 \text{ m},\ \text{maximum } 120 \text{ m}}" />,
    reason: <>Read it off the model: <Katex tex="65" /> is the midline (the height of the centre) and the amplitude <Katex tex="55" /> is the radius, so P swings <Katex tex="55" /> m either side of <Katex tex="65" /> m. Both values are needed for the one mark. VCAA writes this as the range <Katex tex="[10,120]" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/15} = 30" />,
    reason: <>Sammy exits after <em>one complete rotation</em>, which is one full period of <Katex tex="h" />. For <Katex tex="\cos(nt)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />, here with <Katex tex="n=\tfrac{\pi}{15}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{30 \text{ minutes}}" />,
    reason: <>The report's common wrong answer, 15 minutes, is half a rotation — the time from the bottom to the top.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dh}{dt} = -55\times\left(-\frac{\pi}{15}\right)\sin\!\left(\frac{\pi t}{15}\right)" />,
    reason: <>"Rate of change of <Katex tex="h" /> with respect to <Katex tex="t" />" means the derivative <Katex tex="h'(t)" />, not rise over run between two points. Chain rule: the derivative of <Katex tex="\cos" /> is <Katex tex="-\sin" />, times the derivative of the inside, <Katex tex="\tfrac{\pi}{15}" />, and the two minus signs cancel. On a calculator, use radian mode — the report notes some students were in degree mode and got a different expression.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{11\pi}{3}\sin\!\left(\frac{\pi t}{15}\right)}" />,
    reason: <>Since <Katex tex="\tfrac{55\pi}{15}=\tfrac{11\pi}{3}" />. This is the first thing the question asks for, before the "hence".</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\frac{\pi t}{15}\right)=1 \implies \frac{\pi t}{15}=\frac{\pi}{2}" />,
    reason: <><Katex tex="h'" /> is itself a sine wave with amplitude <Katex tex="\tfrac{11\pi}{3}" /> (about <Katex tex="11.5" /> m per minute), so its greatest value is reached where the sine equals <Katex tex="1" />. We want the maximum of <Katex tex="h'" />, not where <Katex tex="h'=0" /> — the report notes many students found the time of maximum height instead. For <Katex tex="0\le t\le30" />, <Katex tex="\tfrac{\pi t}{15}" /> runs from <Katex tex="0" /> to <Katex tex="2\pi" />, so there is exactly one such time, not a general solution.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 7.5 \text{ minutes}}" />,
    reason: <>A quarter of a period. Here P is level with the centre on the way up, moving straight up, so all of its speed goes into height; at the top and the bottom it moves sideways, so <Katex tex="h'=0" /> there. Setting <Katex tex="h''(t)=\tfrac{11\pi^2}{45}\cos\!\left(\tfrac{\pi t}{15}\right)=0" /> also works, but it gives <Katex tex="t=7.5" /> and <Katex tex="t=22.5" />; at <Katex tex="22.5" /> the rate is <Katex tex="-\tfrac{11\pi}{3}" />, the fastest <em>fall</em>, so reject it.</>,
    more: <>Ride the wheel in the diagram below.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\theta) = \frac{OC}{OB} = \frac{65}{500}" />,
    reason: <>Triangle <Katex tex="OCB" /> is right-angled at <Katex tex="O" /> (the small square on the figure). The side opposite <Katex tex="\theta" /> is <Katex tex="OC" />, from the ground up to the centre: the midline of <Katex tex="h" />, <Katex tex="65" /> m. The side next to it is <Katex tex="OB=500" /> m. Opposite and adjacent, so tangent.</>,
  },
  {
    working: <Katex display tex="\theta = \tan^{-1}\!\left(\frac{65}{500}\right)" />,
    reason: <>Inverse tangent to get the angle back from the ratio — not <Katex tex="\tan\!\left(\tfrac{65}{500}\right)" /> or <Katex tex="\sin^{-1}\!\left(\tfrac{65}{500}\right)" />, both of which the report lists. The question asks for degrees, so switch the calculator to <strong>degree</strong> mode for this part; the report notes many students did not.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta \approx 7.41^\circ}" />,
    reason: <>A very shallow angle, which fits: the boat is nearly ten times further away horizontally than the centre is high. (Radian mode would give <Katex tex="0.13" />, the same angle in radians.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y = (3025-x^2)^{\frac12}+65" />,
    reason: <>This is the top half of the wheel: a circle of radius <Katex tex="\sqrt{3025}=55" /> centred at <Katex tex="(0,65)" />. Rewriting the surd as a power so the chain rule applies directly.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac12(3025-x^2)^{-\frac12}\times(-2x)" />,
    reason: <>Chain rule; the derivative of the inside is <Katex tex="-2x" />, and the constant <Katex tex="65" /> vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-x}{\sqrt{3025-x^2}}}" />,
    reason: <>The <Katex tex="\tfrac12" /> and the <Katex tex="2" /> cancel. Keep the minus sign (the report notes some students wrote <Katex tex="\tfrac{x}{\sqrt{3025-x^2}}" />): for <Katex tex="x>0" /> the top half of the wheel falls away to the right, so the gradient must be negative. No need to rationalise.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{m_{P_2B} = \frac{-u}{\sqrt{3025-u^2}}}" />,
    reason: <>The line <Katex tex="P_2B" /> touches the path at <Katex tex="P_2" /> — it <em>is</em> the tangent there — and a tangent's gradient is the derivative at the point of contact. So this is part (e) at <Katex tex="x=u" />: the gradient in terms of <Katex tex="u" />, the first thing asked for.</>,
  },
  {
    working: (
      <>
        <Katex display tex="m_{P_2B} = \frac{v-0}{u-500}" />
        <Katex display tex="= \frac{\sqrt{3025-u^2}+65}{u-500}" />
      </>
    ),
    reason: <>But <Katex tex="P_2B" /> is also an ordinary line through two points we can write down, <Katex tex="P_2(u,v)" /> and <Katex tex="B(500,0)" />, so its gradient is also rise over run. <Katex tex="P_2" /> is on the path, so <Katex tex="v=\sqrt{3025-u^2}+65" /> — with the <Katex tex="+65" />; the report notes some students used <Katex tex="h(t)" /> or <Katex tex="y=\sqrt{3025-x^2}" /> instead. The report says many students could not find this second expression. VCAA writes it as <Katex tex="\tfrac{-\sqrt{3025-u^2}-65}{500-u}" />, the same fraction with top and bottom multiplied by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\frac{-u}{\sqrt{3025-u^2}} = \frac{\sqrt{3025-u^2}+65}{u-500}" />,
    reason: <>Two expressions for the same gradient, so they must be equal: one equation in one unknown. This is the "hence". Only at <Katex tex="P_2" /> is the line to <Katex tex="B" /> also the tangent.</>,
    more: <>Drag P in the diagram below and see the two lines coincide only there.</>,
  },
  {
    working: <Cas fn="solve">solve(-u/√(3025-u²) = (√(3025-u²)+65)/(u-500), u) | 0&lt;u&lt;55</Cas>,
    reason: <><Katex tex="P_2" /> is just right of the <Katex tex="y" />-axis in the figure, so restrict to <Katex tex="0<u<55" />. The equation has only this one solution anyway: the other tangent from <Katex tex="B" /> touches the wheel near the bottom, at about <Katex tex="(-1.10,\ 10.01)" />, which is not on the top-half path.</>,
  },
  {
    working: (
      <>
        <Katex display tex="u \approx 12.9975" />
        <Katex display tex="v = \sqrt{3025-u^2}+65 \approx 118.4421" />
      </>
    ),
    reason: <>Substituting the unrounded <Katex tex="u" /> back into the path equation.</>,
  },
  {
    working: <Katex display tex="\boxed{P_2 \approx (13.00,\ 118.44)}" />,
    reason: <>Two decimal places, so write <Katex tex="13.00" />, not <Katex tex="13" />. Sensible: <Katex tex="P_2" /> is near the top of the wheel (maximum height <Katex tex="120" /> m) and just to the right of the vertical axis, exactly as the figure shows.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(\alpha) = \left|m_{P_2B}\right| = \frac{u}{\sqrt{3025-u^2}}" />,
    reason: <>A line's gradient, rise over run, is the tangent of the angle it makes with the horizontal, and <Katex tex="P_2B" /> meets the ground at <Katex tex="\alpha" />. The gradient from part (f) is negative because the line falls to the right, but <Katex tex="\alpha" /> is an angle in a triangle, so use its size. (Or straight from the right-angled triangle under the sight line: opposite <Katex tex="v" />, adjacent <Katex tex="500-u" />, so <Katex tex="\tan(\alpha)=\tfrac{v}{500-u}" /> gives the same angle.)</>,
  },
  {
    working: <Katex display tex="\alpha = \tan^{-1}\!\left(\frac{12.9975\ldots}{\sqrt{3025-12.9975\ldots^2}}\right)" />,
    reason: <>Use the unrounded <Katex tex="u" /> from part (f), not <Katex tex="13.00" /> — here both give <Katex tex="13.67^\circ" />, but rounding early is how marks are lost. Taking <Katex tex="\tan^{-1}" /> of the negative gradient gives <Katex tex="-13.67^\circ" />, measured clockwise from the positive <Katex tex="x" />-axis; <Katex tex="\alpha" /> is its size.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha \approx 13.67^\circ}" />,
    reason: <>Degree mode again — the report notes some students used radians (<Katex tex="0.24" />). Check: steeper than <Katex tex="\theta\approx7.41^\circ" />, as it must be: <Katex tex="P_2" /> is both higher than <Katex tex="C" /> and closer to <Katex tex="B" />, so the line from <Katex tex="B" /> to it climbs more steeply.</>,
    more: <>The diagram in part (h) shows <Katex tex="\alpha" /> copied at <Katex tex="P_2" />.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\angle(CP_1 \text{ below horizontal})" />
        <Katex display tex="= \theta \approx 7.41^\circ" />
      </>
    ),
    reason: <>The boat is visible while the capsule travels from <Katex tex="P_1" /> to <Katex tex="P_2" />, so find the angle the wheel turns between them, measuring both radii from the horizontal through <Katex tex="C" />. <Katex tex="P_1" /> lies on the line <Katex tex="CB" />, so the radius <Katex tex="CP_1" /> points straight at <Katex tex="B" />. The horizontal through <Katex tex="C" /> is parallel to the ground, so <Katex tex="CB" /> dips below it by the same <Katex tex="\theta" /> it makes with the ground at <Katex tex="B" /> (alternate angles).</>,
  },
  {
    working: (
      <>
        <Katex display tex="CP_2 \perp P_2B \implies" />
        <Katex display tex="\angle(CP_2 \text{ above horizontal}) = 90^\circ-\alpha" />
      </>
    ),
    reason: <>A tangent is perpendicular to the radius at the point of contact — the right angle marked on the figure. <Katex tex="P_2B" /> falls at <Katex tex="\alpha" /> below the horizontal, so the radius to <Katex tex="P_2" />, turned <Katex tex="90^\circ" /> from it, rises <Katex tex="90^\circ-\alpha" /> above the horizontal.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\angle P_1CP_2 = \theta + (90^\circ-\alpha)" />
        <Katex display tex="\approx 7.4069^\circ+76.3307^\circ" />
      </>
    ),
    reason: <>One radius points below the horizontal and the other above it, so the angle between them is the sum. Use the unrounded <Katex tex="\theta" /> and <Katex tex="\alpha" />.</>,
  },
  {
    working: <Katex display tex="\approx 83.74^\circ" />,
    reason: <>The angle at the <em>centre</em> through which the capsule turns while the boat is in view — not the <Katex tex="6.26^\circ" /> between the two sight lines at <Katex tex="B" />. VCAA reaches the same number from the right-angled triangle <Katex tex="CP_2B" />: its angle at <Katex tex="B" /> is <Katex tex="\alpha-\theta" />, so its angle at <Katex tex="C" /> is <Katex tex="90^\circ-(\alpha-\theta)=83.737\ldots^\circ" />.</>,
  },
  {
    working: <Katex display tex="t = \frac{83.7376}{360}\times 30" />,
    reason: <>The wheel turns <Katex tex="360^\circ" /> in <Katex tex="30" /> minutes at a constant rate (<Katex tex="12^\circ" /> a minute), so time is proportional to angle.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 7 \text{ minutes}}" />,
    reason: <><Katex tex="6.978" /> minutes to the nearest minute. Check with <Katex tex="h(t)" />: the capsule reaches <Katex tex="P_1" />'s height of <Katex tex="57.91" /> m at <Katex tex="t\approx6.88" /> and <Katex tex="P_2" />'s at <Katex tex="t\approx13.86" />, <Katex tex="6.98" /> minutes apart. The report notes students who wrote "7 minutes" with no working — a two-mark question needs the angle and the proportion shown.</>,
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
        <p className="mb-3">Sammy exits the capsule after one complete rotation of the Ferris wheel.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={stemSrc}
            alt="A drawing of the giant Ferris wheel with its capsules, standing on a platform; the point P is marked on the rim level with the centre on the right, and a bracket shows its height h above the ground — from the original 2017 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
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
        <Explore title="The height climbs fastest level with the centre, not at the top">
          <RateWidget />
        </Explore>
        <WrongMethod
          title={'The rate of change is greatest where h′⁠(t) = 0'}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{11\pi}{3}\sin\!\left(\frac{\pi t}{15}\right)=0" />
              <Katex display tex="\implies t = 15 \ \ (\text{or } 0,\ 30)" />
            </>
          }
        >
          <Katex tex="h'(t)=0" /> finds where the height stops changing — the top of the wheel, where{' '}
          <Katex tex="h" /> is greatest and the rate is <em>zero</em>. That answers "when is{' '}
          <Katex tex="h" /> at its maximum?", not "when is <Katex tex="h'" /> at its maximum?". To
          maximise a rate, look at the rate's own graph: <Katex tex="h'" /> is a sine wave, so it
          peaks where the sine is <Katex tex="1" /> (or solve <Katex tex="h''(t)=0" /> and keep the
          maximum). Quick check: at the top the capsule is moving sideways, so it can't be gaining height
          fastest there.
        </WrongMethod>
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
          <img loading="lazy" decoding="async"
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
        <WrongMethod
          title="Use the radius: tan θ = 55/500"
          source="Examiner's report"
          working={<Katex display tex="\theta=\tan^{-1}\!\left(\frac{55}{500}\right)\approx6.28^\circ" />}
        >
          <Katex tex="55" /> is the radius, but no side of triangle <Katex tex="OCB" /> is a radius.
          Its vertical side runs from the ground at <Katex tex="O" /> up to the centre{' '}
          <Katex tex="C" />, and the centre is <Katex tex="65" /> m up — the midline of{' '}
          <Katex tex="h(t)" />, halfway between <Katex tex="10" /> and <Katex tex="120" />. Before
          using a trig ratio, name the triangle and check which lengths are its sides.
        </WrongMethod>
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
          <img loading="lazy" decoding="async"
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
            and rise over run to the outside point" move is the standard way into any
            tangent-from-an-external-point question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Two gradients, one line: slide P until the sight line just grazes the wheel">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="Use y = √(3025 − x²) for the height of P₂"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{-u}{\sqrt{3025-u^2}} = \frac{\sqrt{3025-u^2}}{u-500}" />
              <Katex display tex="-u(u-500) = 3025-u^2" />
              <Katex display tex="500u = 3025 \implies u = 6.05" />
            </>
          }
        >
          Without the <Katex tex="+65" />, the rule is the top half of a circle centred at the{' '}
          <em>origin</em>: the same wheel sunk <Katex tex="65" /> m into the ground. The equation then
          finds the tangent from <Katex tex="B" /> to that wheel, at <Katex tex="(6.05,\ 54.67)" />. A
          quick look at the figure catches it: <Katex tex="P_2" /> is near the top of the wheel, over{' '}
          <Katex tex="100" /> m up, and <Katex tex="54.67" /> m is below the centre. <Katex tex="v" /> is
          a height above the ground, so it needs the <Katex tex="+65" />. (Turn on "What if I leave off
          the +65?" in the diagram above.)
        </WrongMethod>
        <WrongMethod
          title="Write the tangent at P₂, then substitute P₂ into it"
          source="Raised on the ATAR Notes forum"
          working={
            <>
              <Katex display tex="y-v=m(x-u)" />
              <Katex display tex="(x,y)=(u,v):\quad 0=0" />
            </>
          }
        >
          Every line passes through the point it was built from, so this is true for every{' '}
          <Katex tex="u" /> and tells you nothing. The extra information is that the tangent also passes
          through <Katex tex="B(500,0)" />. Substitute <em>that</em> point:{' '}
          <Katex tex="0-v=m(500-u)" />, which rearranges to exactly the equation in the working,{' '}
          <Katex tex="m=\tfrac{v}{u-500}" />.
        </WrongMethod>
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
            points? That is an angle at the <em>centre</em> <Katex tex="C" />, between the
            radii <Katex tex="CP_1" /> and <Katex tex="CP_2" />.
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
        <Explore title="The boat is in view while the wheel turns 83.74° — about 7 of its 30 minutes">
          <ArcWidget />
        </Explore>
        <WrongMethod
          title="Use the angle at B, α − θ ≈ 6.26°, as the turn"
          working={
            <>
              <Katex display tex="\frac{13.67^\circ-7.41^\circ}{360^\circ}\times30\approx0.52\ \text{min}" />
              <Katex display tex="\approx1\ \text{minute}" />
            </>
          }
        >
          <Katex tex="\alpha-\theta" /> is the angle between the two sight lines as seen from the boat.
          The time depends on how far the <em>wheel</em> turns, and the wheel turns about its centre,
          so the angle you need is at <Katex tex="C" />, between the radii <Katex tex="CP_1" /> and{' '}
          <Katex tex="CP_2" />. The boat is 500 m away, so a big turn of the wheel looks like a small
          angle from there. In triangle <Katex tex="CP_2B" /> the right angle at <Katex tex="P_2" />{' '}
          converts one into the other: the angle at <Katex tex="C" /> is{' '}
          <Katex tex="90^\circ-(\alpha-\theta)\approx83.74^\circ" />. Sanity check: the arc from{' '}
          <Katex tex="P_1" /> (just below the centre, on the right) to <Katex tex="P_2" /> (near the
          top) is nearly a quarter of the wheel, far more than the <Katex tex="12^\circ" /> the wheel
          turns in one minute.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
