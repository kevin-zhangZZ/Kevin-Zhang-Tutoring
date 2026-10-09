// 2020 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 61% correct.
// Recovering the shape of f from the graph of its derivative. Question text transcribed from the original paper; the graph of f' and the five option graphs are crops of VCAA's own artwork (option letters masked); solution is original.
// Answer B checked against the VCAA report (no comment printed for this question) and itute (B: "f′(x) = 0
// at two values of x < 0"). Option A (19%) has the rise–fall–rise pattern but its minimum is right of the
// y-axis and it is falling as it crosses the y-axis, where f′(0) > 0.
// Interactive diagram (§15): interactives/meth-2020e2-mcq6-slope.tsx stacks f above f′ on a shared x, so
// sliding P along f shows its tangent's gradient as the height of Q on f′, with the two zeros (turning
// points, both at negative x) and the dip that stays positive (a bend, not a turning point). Its curves
// are one polynomial f′ with the printed graph's features (the paper gives no scale) and f = ∫₀ˣ f′ — this
// site's own explanatory figure, never a replacement for the cropped graph in the stem.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import fprimeSrc from './meth-2020-mcq6-fprime.png'
import optASrc from './meth-2020-mcq6-optA.png'
import optBSrc from './meth-2020-mcq6-optB.png'
import optCSrc from './meth-2020-mcq6-optC.png'
import optDSrc from './meth-2020-mcq6-optD.png'
import optESrc from './meth-2020-mcq6-optE.png'

const SlopeWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq6-slope'))

const opt = (src: string, alt: string) => <img src={src} alt={alt} className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 61, C: 6, D: 5, E: 8 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 0 \text{ at exactly two points}" />,
    reason: <>The height of the <Katex tex="f'" /> graph at any <Katex tex="x" /> is the gradient of <Katex tex="f" /> there, so the stationary points of <Katex tex="f" /> are where the printed curve meets the <Katex tex="x" />-axis. It crosses twice. The later dip is a local minimum of <Katex tex="f'" /> that stays <em>above</em> the axis: the gradient of <Katex tex="f" /> gets smaller there but never reaches 0, so it is not a third zero.</>,
  },
  {
    working: <Katex display tex="f'>0,\ \text{then } f'<0,\ \text{then } f'>0" />,
    reason: <>Reading the sign left to right: above the axis, below it, then above it for good.</>,
  },
  {
    working: <Katex display tex="\text{so } f \text{ rises, falls, then rises}" />,
    reason: <>A positive gradient means rising, a negative one falling. So <Katex tex="f" /> has a local maximum at the first zero (rise, then fall) and a local minimum at the second (fall, then rise).</>,
  },
  {
    working: <Katex display tex="\text{the local max comes } \textbf{first}" />,
    reason: <>This eliminates options <b>C</b> and <b>D</b>, which have a minimum before a maximum, and option <b>E</b>, which has two maximums.</>,
  },
  {
    working: <Katex display tex="\text{both zeros of } f' \text{ are left of the } y\text{-axis}" />,
    reason: <>Where the turning points are matters as well as what they are: both zeros of <Katex tex="f'" /> are at negative <Katex tex="x" />, so both turning points of <Katex tex="f" /> are too. Option <b>A</b> has the right rise–fall–rise pattern, but its minimum is to the <em>right</em> of the <Katex tex="y" />-axis, so it is out. (A second check: <Katex tex="f'(0)>0" />, so <Katex tex="f" /> must be rising where it crosses the <Katex tex="y" />-axis, and in A it is falling there.)</>,
  },
  {
    working: (
      <>
        <Katex display tex="f' \text{ never returns to zero}" />
        <Katex display tex="\text{after the second crossing}" />
      </>
    ),
    reason: <>So <Katex tex="f" /> keeps increasing to the right. The dip in <Katex tex="f'" /> means the gradient of <Katex tex="f" /> shrinks for a while and then grows again: <Katex tex="f" /> climbs less steeply, then more steeply. That is a bend (a change of concavity), not a turning point. It is option <b>B</b>: a small hump, then a minimum, both left of the <Katex tex="y" />-axis, then a rise that flattens briefly before steepening.</>,
    more: <>Slide along the curves in the diagram below to see each stage.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{B}}" />,
    reason: <>Matches option <b>B</b>. The method: find the zeros of <Katex tex="f'" />, note <em>where</em> they are, and read the sign between them; the turning points of <Katex tex="f" /> follow. Then use what&apos;s left (here the dip) to check the finer shape.</>,
  },
]

export default function MethodsQ6_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Part of the graph of <Katex tex="y=f'(x)" /> is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={fprimeSrc}
              alt="A curve descending from the upper left, crossing the x-axis, reaching a minimum below it, crossing back up just left of the y-axis, then a small local maximum and local minimum above the axis before rising steeply — from the original 2020 VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>
            The corresponding part of the graph of <Katex tex="y=f(x)" /> is best represented
            by
          </p>
        </>
      }
      background={
        <Background title="Reading f from the graph of f′">
          <p>
            The graph of <Katex tex="f'" /> is a graph of gradients: its height at any <Katex tex="x" /> is the gradient of{' '}
            <Katex tex="f" /> at that <Katex tex="x" />. So where <Katex tex="f'" /> is above the axis, <Katex tex="f" /> is rising;
            below it, falling; and where <Katex tex="f'" /> crosses the axis, <Katex tex="f" /> has a turning point.
          </p>
          <p>
            The things that matter most are where <Katex tex="f'" /> crosses the axis and what sign it takes between crossings. A
            dip that stays above the axis changes how steeply <Katex tex="f" /> rises (its <em>concavity</em>) but not its
            direction.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="The height of f′ is the gradient of f: slide along and watch the tangent follow it">
            <SlopeWidget />
          </Explore>
          <WrongMethod
            title="f′ goes +, −, +, so f rises, falls, rises: that's A"
            source="19% chose A"
            working={
              <>
                <Katex display tex="f': \ +,\ -,\ + \implies f: \ \nearrow,\ \searrow,\ \nearrow" />
                <Katex display tex="\implies \text{option A}" />
              </>
            }
          >
            <p>
              The pattern is right, but it is only half the information. The turning points of <Katex tex="f" /> sit exactly where{' '}
              <Katex tex="f'=0" />, and both of those are at <b>negative</b> <Katex tex="x" />. A&apos;s minimum is at a positive{' '}
              <Katex tex="x" />, which would need <Katex tex="f'=0" /> to the right of the <Katex tex="y" />-axis, where the printed{' '}
              <Katex tex="f'" /> is well above the axis.
            </p>
            <p>
              A second check that catches it: <Katex tex="f'(0)" /> is positive (the printed curve cuts the <Katex tex="y" />-axis above
              the origin), so <Katex tex="f" /> must be rising as it crosses the <Katex tex="y" />-axis. In A it is falling there.
            </p>
          </WrongMethod>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'A cubic-like curve rising to a maximum left of the y-axis, falling through the y-axis to a minimum right of it, then rising steeply') },
        { letter: 'B', content: opt(optBSrc, 'A curve with a small maximum and then a minimum, both left of the y-axis, passing through the origin and rising with a brief flattening before steepening'), isAnswer: true },
        { letter: 'C', content: opt(optCSrc, 'A curve falling to a minimum left of the y-axis, rising to a maximum right of it, then falling steeply') },
        { letter: 'D', content: opt(optDSrc, 'A curve falling from the upper left through the origin to a minimum, then a small maximum, then falling, all right of the y-axis after the origin') },
        { letter: 'E', content: opt(optESrc, 'A symmetric curve with two maximums either side of a flat section on the y-axis') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
