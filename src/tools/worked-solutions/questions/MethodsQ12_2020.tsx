// 2020 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 45% correct.
// Building a sinusoidal model for the tip of a minute hand. Question text transcribed from the original paper; the figure is a crop of VCAA's own artwork; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import clockSrc from './meth-2020-mcq12-clock.png'

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
    reason: <>The clock face has radius 15 and rests on the base, so its centre is the midline of the motion.</>,
  },
  {
    working: <Katex display tex="h \text{ oscillates between } 15-10 = 5 \text{ and } 15+10 = 25" />,
    reason: <>The tip is always 10 cm from the centre, so the amplitude is 10.</>,
  },
  {
    working: <Katex display tex="t = 0: \quad h = 25 \text{ (maximum)}" />,
    reason: <>"Both hands point vertically upwards" — so the model must start at its maximum, which a <em>cosine</em> does and a sine does not. Options A, B and C are out.</>,
  },
  {
    working: <Katex display tex="\text{period} = 60 \text{ minutes}" />,
    reason: <>A minute hand goes round once an hour. This is what separates the two survivors.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{k} = 60 \implies k = \frac{\pi}{30}" />,
    reason: <>Option D uses <Katex tex="\tfrac{\pi}{60}" />, which would take two hours per revolution.</>,
  },
  {
    working: <Katex display tex="\boxed{h(t) = 15+10\cos\!\left(\frac{\pi t}{30}\right)}" />,
    reason: <>Matches option <b>E</b>; <b>A</b>, <b>B</b> and <b>C</b> are sines and <b>D</b> has the wrong period. Check <Katex tex="t=30" /> (half past): <Katex tex="15+10\cos(\pi)=5" />, the hand pointing straight down ✓.</>,
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
        <p>
          Three decisions settle this: the midline (the centre of the clock face, 15 cm up),
          the amplitude (the hand's length, 10 cm), and whether the model starts at a maximum
          — which is what chooses cosine over sine.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="h(t)=15+10\sin\!\left(\tfrac{\pi t}{30}\right)" /> },
        { letter: 'B', content: <Katex tex="h(t)=15-10\sin\!\left(\tfrac{\pi t}{30}\right)" /> },
        { letter: 'C', content: <Katex tex="h(t)=15+10\sin\!\left(\tfrac{\pi t}{60}\right)" /> },
        { letter: 'D', content: <Katex tex="h(t)=15+10\cos\!\left(\tfrac{\pi t}{60}\right)" /> },
        { letter: 'E', content: <Katex tex="h(t)=15+10\cos\!\left(\tfrac{\pi t}{30}\right)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
