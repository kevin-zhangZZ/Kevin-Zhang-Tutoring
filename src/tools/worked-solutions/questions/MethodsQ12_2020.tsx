// 2020 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 45% correct.
// Building a sinusoidal model for the tip of a minute hand. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.
// Answer E checked with sympy (h at t = 0, 15, 30, 45, 60 is 25, 15, 5, 15, 25), against the VCAA
// report (its comment is transcribed below) and itute (E). Distractors checked with sympy: A, B and
// C all give h(0) = 15 (the midline), not 25; A (20%, the most-chosen wrong answer) is the true
// curve 15 minutes late, since sin(πt/30) = cos(π(t − 15)/30); D's π/60 is what period = π/n = 60
// gives, and makes the period 120 minutes.
// Interactive diagram (§15): interactives/meth-2020e2-mcq12-clock.tsx turns the minute hand beside
// a graph of h against t on the same height scale, with the right triangle at the centre showing
// the height above the centre is 10cos θ for an angle θ measured from the vertical; toggles
// overlay each option's curve. This site's own explanatory figure, not a redrawing of VCAA's.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import clockSrc from './meth-2020-mcq12-clock.png'

const ClockWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq12-clock'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 9, C: 11, D: 15, E: 45 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      The maximum height is 25 cm at <Katex tex="t=0" />. Hence <b>options D</b> or <b>E</b>.
      <br />
      The period is 60 minutes. Hence <b>option E</b>.
      <br />
      <Katex tex="h(t)=15+10\cos\!\left(\dfrac{\pi t}{30}\right)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{centre of the clock} = 15 \text{ cm above the base}" />,
    reason: <>The clock face has radius 15 and rests on the base, so its centre is 15 cm up. The tip goes round the centre, so its height swings evenly above and below 15: that is the midline of the model, the <Katex tex="15" /> in every option.</>,
  },
  {
    working: (
      <>
        <Katex display tex="h_{\max} = 15+10 = 25" />
        <Katex display tex="h_{\min} = 15-10 = 5" />
      </>
    ),
    reason: <>The tip is always 10 cm from the centre, so it is at most 10 cm above it (hand straight up) and at most 10 cm below it (hand straight down). The amplitude is 10. All five options have this right, so it doesn&apos;t separate them.</>,
  },
  {
    working: <Katex display tex="t = 0: \quad h = 25 \text{ (maximum)}" />,
    reason: <>&ldquo;Both hands point vertically upwards&rdquo; at noon, so the model must <em>start at its maximum</em>. <Katex tex="\cos0=1" /> starts at the top, while <Katex tex="\sin0=0" /> starts on the midline: options A, B and C all give <Katex tex="h(0)=15" />, so they are out. (Underneath this: the hand&apos;s angle is measured from the vertical, so the height above the centre is <Katex tex="10\cos\theta" />.)</>,
    more: <>See the Background above.</>,
  },
  {
    working: <Katex display tex="\text{period} = 60 \text{ minutes}" />,
    reason: <>A minute hand goes round once an hour, so the height repeats every 60 minutes. This is what separates the two survivors, D and E.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{n} = 60 \implies n = \frac{\pi}{30}" />,
    reason: <>The period of <Katex tex="\cos(nt)" /> is <Katex tex="\tfrac{2\pi}{n}" />: one full cycle is <Katex tex="2\pi" /> radians, and the angle grows at <Katex tex="n" /> radians per minute. Here the hand turns <Katex tex="2\pi" /> in 60 minutes, so <Katex tex="n=\tfrac{2\pi}{60}=\tfrac{\pi}{30}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h(t) = 15+10\cos\!\left(\frac{\pi t}{30}\right)}" />,
    reason: <>Matches option <b>E</b>. Check <Katex tex="t=30" /> (half past): <Katex tex="15+10\cos\pi=5" />, the hand pointing straight down ✓. Options <b>A</b>, <b>B</b> and <b>C</b> are sines, which start on the midline (A is the right curve 15 minutes late, a hand that started at 9 o&apos;clock). Option <b>D</b> has <Katex tex="n=\tfrac{\pi}{60}" />, which is what you get from using <Katex tex="\tfrac{\pi}{n}" /> for the period; its period is <Katex tex="2\pi\div\tfrac{\pi}{60}=120" /> minutes, two hours per revolution.</>,
  },
]

export default function MethodsQ12_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A clock has a minute hand that is 10 cm long and a clock face with a radius of
            15 cm, as shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={clockSrc}
              alt="A clock face of radius 15 cm resting on a horizontal base, with the 10 cm minute hand from the centre and the height h measured from the base up to the tip of the hand — from the original 2020 VCAA exam paper"
              className="w-full max-w-[430px]"
            />
          </div>
          <p className="mb-2">
            At 12.00 noon, both hands of the clock point vertically upwards and the tip of the
            minute hand is at its maximum distance above the base of the clock face.
          </p>
          <p>
            The height, <Katex tex="h" /> centimetres, of the tip of the minute hand above the
            base of the clock face <Katex tex="t" /> minutes after 12.00 noon is given by
          </p>
        </>
      }
      background={
        <Background title="Why a clock gives a cosine, not a sine">
          <p>
            Three things fix the model: the midline (the centre of the clock, 15 cm up), the amplitude (the hand&apos;s
            length, 10 cm), and where it starts. The last one decides between sine and cosine.
          </p>
          <p>
            On the unit circle the angle is measured from the <em>horizontal</em> (the positive <Katex tex="x" />-axis), so
            the height is the side opposite the angle: <Katex tex="\sin\theta" />. A clock hand&apos;s angle is measured from
            12 o&apos;clock, the <em>vertical</em>. After turning through <Katex tex="\theta" /> the tip&apos;s height above
            the centre is the side <em>next to</em> the angle, <Katex tex="10\cos\theta" />, so
          </p>
          <Katex display tex="h = 15 + 10\cos\theta." />
          <p>
            The quick check is <Katex tex="t=0" />: the tip starts at the top, and cosine is the one that starts at its maximum.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="h(t)=15+10\sin\!\left(\tfrac{\pi t}{30}\right)" /> },
        { letter: 'B', content: <Katex tex="h(t)=15-10\sin\!\left(\tfrac{\pi t}{30}\right)" /> },
        { letter: 'C', content: <Katex tex="h(t)=15+10\sin\!\left(\tfrac{\pi t}{60}\right)" /> },
        { letter: 'D', content: <Katex tex="h(t)=15+10\cos\!\left(\tfrac{\pi t}{60}\right)" /> },
        { letter: 'E', content: <Katex tex="h(t)=15+10\cos\!\left(\tfrac{\pi t}{30}\right)" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The hand's angle is measured from the vertical, so the tip's height above the centre is 10cos θ">
            <ClockWidget />
          </Explore>
          <WrongMethod
            title="It goes round in a circle, so the height is a sine"
            source="20% chose A"
            working={
              <>
                <Katex display tex="h(t) = 15+10\sin\!\left(\tfrac{\pi t}{30}\right) \quad \text{(option A)}" />
                <Katex display tex="h(0) = 15+10\sin 0 = 15" />
              </>
            }
          >
            <p>
              &ldquo;Height = sine&rdquo; is true on the unit circle, where the angle starts from the horizontal. This hand
              starts pointing straight up, so its height above the centre is <Katex tex="10\cos\theta" />. Option A gives{' '}
              <Katex tex="h(0)=15" />, a tip level with the centre (pointing at 9 o&apos;clock), but at noon the tip is at the
              top, 25 cm up. Substituting <Katex tex="t=0" /> into each option catches this in seconds.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
