// 2016 Specialist Mathematics — Exam 2, Question 3 (11 marks).
// Two-tank mixing problem solved by a first-order linear differential equation.
// Question text transcribed from the original paper; worked solutions below are original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAMINER_A: SAExaminerStats = {
  marks: [29, 16, 13, 42],
  average: 1.7,
  comment:
    'A range of errors prevented students from achieving full marks for this question. There were many instances where students did not separate variables correctly. Some students did not write down or evaluate the constant. Errors with constants were common among students who added a constant to both sides of the expression before attempting to find its value. A small number of students used definite integrals from 0 to t and 20 to x on the sides.',
}

const EXAMINER_B: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      Many students did not demonstrate an understanding of what was required by this question. Students
      frequently found an expression for <Katex tex="\dfrac{dy}{dt}" /> rather than the concentration at
      time <Katex tex="t" />.
    </>
  ),
}

const EXAMINER_C: SAExaminerStats = {
  marks: [51, 9, 40],
  average: 0.9,
  comment: (
    <>
      This 'show that' question required students to obtain the expression{' '}
      <Katex tex="\dfrac{dy}{dt}=\dfrac13-\dfrac{y}{10+t}" /> by logical steps. Some students incorrectly
      started with the given expression with no explanation of its origin. Students frequently did not seem
      to realise that work done for part (b) was useful here.
    </>
  ),
}

const EXAMINER_D: SAExaminerStats = {
  marks: [41, 20, 22, 17],
  average: 1.2,
  comment:
    'Most students were able to find a correct expression for the derivative. It was not always clear how expressions for the left side simplified to the right side. Verification that the given solution satisfied the initial conditions was often absent.',
}

const EXAMINER_E: SAExaminerStats = {
  marks: [69, 8, 23],
  average: 0.6,
  comment: (
    <>
      Many students did not attempt this question. It was common to see <Katex tex="\dfrac{dy}{dt}=0.095" />{' '}
      rather than using the concentration in the equation.
    </>
  ),
}

// Dropbox share links for the tutor's video walkthrough of each part, converted to `raw=1`
// so the browser can stream them directly (Dropbox re-signs the redirect on every request,
// so this stays valid even though the resolved CDN URL is time-limited).
//
// Parts a-d point at `*-h264.mp4` — re-encoded locally from the tutor's original HEVC (h.265)
// recordings (`ffmpeg -c:v libx264 -crf 20 -c:a aac -movflags +faststart`), since HEVC isn't
// decodable by most desktop browsers, including stock Chrome on Windows (the file loads fine
// but plays back as a black frame with no sound). Part e's original was already H.264/AAC —
// just muxed as .mkv, which the browser's native <video> element won't reliably open — so
// that one was only remuxed into an .mp4 container (`ffmpeg -c copy`, instant, no
// re-encoding, identical quality). Originals are kept alongside in Dropbox.
const VIDEO = {
  a: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/AJ3S_a1D0X0pluAFSVBermo/SAQ3a-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  b: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ANTJtcJqXZ0_hFJrJ2SGLOs/SAQ3b-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  c: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ANvMSeh8zPfysFrcGcQ-haM/SAQ3c-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  d: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ANRTMZqrSSj-8C7XCT3IbR8/SAQ3d-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
  e: 'https://www.dropbox.com/scl/fo/x672xwjrtj2j9xu7i61hm/ADbe9Ndd7W_QuzOCq-K07do/SAQ3e-h264.mp4?rlkey=5hew4el0gbyauzhc3y9aqdda2&raw=1',
}

export default function SpecialistSAQ3_2016() {
  const rowsA: WorkingRow[] = [
    {
      working: <Katex display tex="\frac{dx}{x} = -\frac{dt}{20+t}" />,
      reason: 'Separate the variables.',
    },
    {
      working: <Katex display tex="\ln|x| = -\ln(20+t) + c \quad\implies\quad x = \frac{A}{20+t}" />,
      reason: 'Integrate both sides.',
    },
    {
      working: <Katex display tex="20 = \frac{A}{20} \implies A = 400" />,
      reason: <>Apply the initial condition — at <Katex tex="t=0" />, <Katex tex="x=20" />.</>,
    },
    {
      working: <Katex display tex="\boxed{x = \dfrac{400}{20+t}}" />,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: <Katex display tex="\text{volume}(t) = 100 + 10t = 10(10+t)\ \text{L}" />,
      reason: 'Tank 2 gains 20 L/min and loses 10 L/min, so its volume grows at 10 L/min.',
    },
    {
      working: <Katex display tex="\boxed{\text{concentration} = \dfrac{y}{10(10+t)}\ \text{kg/L}}" />,
      reason: 'Concentration is salt divided by volume.',
    },
  ]

  const rowsC: WorkingRow[] = [
    {
      working: <Katex display tex="\text{rate in} = \frac{1}{60}\times 20 = \frac{1}{3}\ \text{kg/min}" />,
      reason: 'Salt flows in at the fixed inflow concentration times the inflow rate.',
    },
    {
      working: <Katex display tex="\text{rate out} = \frac{y}{10(10+t)}\times 10 = \frac{y}{10+t}" />,
      reason: "Salt flows out at the tank's own concentration (part b) times the outflow rate.",
    },
    {
      working: <Katex display tex="\boxed{\dfrac{dy}{dt} + \dfrac{y}{10+t} = \dfrac{1}{3}}" />,
      reason: <><Katex tex="\dfrac{dy}{dt}" /> is rate in minus rate out.</>,
    },
  ]

  const rowsD: WorkingRow[] = [
    {
      working: (
        <Katex display tex="\frac{dy}{dt} = \frac{(2t+20)\cdot 6(10+t) - (t^2+20t+900)\cdot 6}{[6(10+t)]^2} = \frac{t^2+20t-700}{6(10+t)^2}" />
      ),
      reason: <>Differentiate with the quotient rule, <Katex tex="N = t^2+20t+900" />, <Katex tex="D = 6(10+t)" />.</>,
    },
    {
      working: (
        <Katex
          display
          tex="\frac{dy}{dt} + \frac{y}{10+t} = \frac{t^2+20t-700}{6(10+t)^2} + \frac{t^2+20t+900}{6(10+t)^2} = \frac{2(t+10)^2}{6(10+t)^2} = \frac{1}{3}"
        />
      ),
      reason: "Matches the right side of part (c)'s equation — verified.",
    },
    {
      working: <Katex display tex="y(0) = \frac{900}{6(10)} = \frac{900}{60} = 15 \quad\checkmark" />,
      reason: 'Initial condition — the second tank starts with 15 kg.',
    },
  ]

  const rowsE: WorkingRow[] = [
    {
      working: (
        <Katex display tex="\text{concentration}(t) = \frac{y}{10(10+t)} = \frac{t^2+20t+900}{60(10+t)^2}" />
      ),
      reason: <>Using <Katex tex="y" /> from part (d).</>,
    },
    {
      working: <Katex display tex="\frac{u^2+800}{60u^2} = 0.095 \implies u^2+800 = 5.7u^2 \implies u^2 = \frac{800}{4.7}" />,
      reason: (
        <>
          Substitute <Katex tex="u = 10+t" />, so <Katex tex="t^2+20t+900 = (t+10)^2+800 = u^2+800" />, and set the
          concentration to 0.095.
        </>
      ),
    },
    {
      working: <Katex display tex="u = \sqrt{\tfrac{800}{4.7}} \approx 13.0466 \quad\implies\quad t = u - 10 \approx \boxed{3.05\ \text{minutes}}" />,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (11 marks)</p>
          <p className="mb-3">
            A tank initially has 20&nbsp;kg of salt dissolved in 100&nbsp;L of water. Pure water flows into the
            tank at a rate of 10&nbsp;L/min. The solution of salt and water, which is kept uniform by stirring,
            flows out of the tank at a rate of 5&nbsp;L/min.
          </p>
          <p>
            If <Katex tex="x" /> kilograms is the amount of salt in the tank after <Katex tex="t" /> minutes, it
            can be shown that the differential equation relating <Katex tex="x" /> and <Katex tex="t" /> is
          </p>
          <Katex display tex="\frac{dx}{dt} + \frac{x}{20+t} = 0." className="my-2" />
        </div>
      </div>

      <PartCard letter="a" marks={3} videoSrc={VIDEO.a} statement="Solve this differential equation to find x in terms of t." examinerReport={EXAMINER_A}>
        <WorkingTable rows={rowsA} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A second tank initially has 15&nbsp;kg of salt dissolved in 100&nbsp;L of water. A solution of{' '}
          <Katex tex="\tfrac{1}{60}" /> kg of salt per litre flows into the tank at a rate of 20&nbsp;L/min. The
          solution of salt and water, which is kept uniform by stirring, flows out of the tank at a rate of
          10&nbsp;L/min.
        </p>
      </div>

      <PartCard
        letter="b"
        marks={1}
        videoSrc={VIDEO.b}
        statement="If y kilograms is the amount of salt in the tank after t minutes, write down an expression for the concentration, in kg/L, of salt in the second tank at time t."
        examinerReport={EXAMINER_B}
      >
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        videoSrc={VIDEO.c}
        statement={
          <>
            Show that the differential equation relating <Katex tex="y" /> and <Katex tex="t" /> is{' '}
            <Katex tex="\dfrac{dy}{dt} + \dfrac{y}{10+t} = \dfrac{1}{3}" />.
          </>
        }
        examinerReport={EXAMINER_C}
      >
        <WorkingTable rows={rowsC} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        videoSrc={VIDEO.d}
        statement={
          <>
            Verify by differentiation and substitution into the left side that{' '}
            <Katex tex="y = \dfrac{t^2+20t+900}{6(10+t)}" /> satisfies the differential equation in part c. Verify
            that the given solution for <Katex tex="y" /> also satisfies the initial condition.
          </>
        }
        examinerReport={EXAMINER_D}
      >
        <WorkingTable rows={rowsD} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        videoSrc={VIDEO.e}
        statement="Find when the concentration of salt in the second tank reaches 0.095 kg/L. Give your answer in minutes, correct to two decimal places."
        examinerReport={EXAMINER_E}
      >
        <WorkingTable rows={rowsE} />
      </PartCard>
    </div>
  )
}
