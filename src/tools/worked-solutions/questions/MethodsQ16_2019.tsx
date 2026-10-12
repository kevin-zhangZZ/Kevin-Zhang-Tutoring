// 2019 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 63% correct. Given
// part of the graph of f, identify the matching part of the graph of f'. Question text
// transcribed from the original paper; the stem graph and all five option graphs are cropped
// directly from the original VCAA exam PDF, not redrawings. Solution is original.
// Interactive: interactives/meth-2019-mcq16-slope-trace.tsx (slide a tangent along a curve with
// the same features and watch f' traced from its slope; overlay option E's curve). WrongMethod:
// E's crossing at f's x-intercept (14% chose E).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import stemSrc from './meth-2019-mcq16-stem.png'
import optASrc from './meth-2019-mcq16-optA.png'
import optBSrc from './meth-2019-mcq16-optB.png'
import optCSrc from './meth-2019-mcq16-optC.png'
import optDSrc from './meth-2019-mcq16-optD.png'
import optESrc from './meth-2019-mcq16-optE.png'

const SlopeTrace = lazyWidget(() => import('../interactives/meth-2019-mcq16-slope-trace'))

const OPT_A = <img loading="lazy" decoding="async" src={optASrc} alt="Option A: negative everywhere except a touch at zero near the origin, dipping to a trough and crossing up through zero at x = 5" className="w-full max-w-[220px]" />
const OPT_B = <img loading="lazy" decoding="async" src={optBSrc} alt="Option B: rises to a positive hump between the origin and x = 5, then plunges steeply negative after 5" className="w-full max-w-[220px]" />
const OPT_C = <img loading="lazy" decoding="async" src={optCSrc} alt="Option C: a downward parabola through the origin, positive until it crosses to negative at about x = 6" className="w-full max-w-[220px]" />
const OPT_D = <img loading="lazy" decoding="async" src={optDSrc} alt="Option D: rising from the origin to a positive hump, falling to cross zero at x = 5, dipping just below the axis until x = 6, then rising steeply" className="w-full max-w-[220px]" />
const OPT_E = <img loading="lazy" decoding="async" src={optESrc} alt="Option E: the same shape as option A but crossing up through zero at x = 6 instead of x = 5" className="w-full max-w-[220px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 7, C: 7, D: 9, E: 14 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\text{Features of } f\text{:} \\ \text{flat at } O,\ \text{minimum at } x=5\end{gathered}" />,
    reason: <><Katex tex="f'" /> records the <em>slope</em> of <Katex tex="f" />, so read off where <Katex tex="f" /> is flat and where it rises or falls. The <Katex tex="x" />-intercept at <Katex tex="x=6" /> is about height, not slope.</>,
  },
  {
    working: <Katex display tex="x<0:\ f \text{ decreasing} \implies f'(x)<0" />,
    reason: <>The curve comes down from the top left, so its tangent slopes steeply downwards: <Katex tex="f'" /> starts well below the axis.</>,
  },
  {
    working: <Katex display tex="x=0:\ f \text{ flat} \implies f'(0)=0" />,
    reason: <><Katex tex="f" /> is falling on both sides of <Katex tex="x=0" />: it flattens without turning (a stationary point of inflection). So <Katex tex="f'" /> touches zero there but does not change sign.</>,
  },
  {
    working: <Katex display tex="0<x<5:\ f \text{ decreasing} \implies f'(x)<0" />,
    reason: <>A falling graph has a negative gradient, however close to the axis it is.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}x=5:\ \text{minimum} \implies f'(5)=0 \\ f' \text{ changes from } - \text{ to } +\end{gathered}" />,
    reason: <>The one genuine sign change happens at the <em>turning point</em>, where the tangent is horizontal and <Katex tex="f" /> switches from falling to rising.</>,
  },
  {
    working: <Katex display tex="x>5:\ f \text{ increasing} \implies f'(x)>0" />,
    reason: <>That includes <Katex tex="5<x<6" />, where <Katex tex="f" /> is still <em>below</em> the axis but rising. The sign of <Katex tex="f'" /> comes from the direction of <Katex tex="f" />, not its height.</>,
  },
  {
    working: <Katex display tex="\begin{array}{c|ccccc} x & x<0 & 0 & 0<x<5 & 5 & x>5 \\ \hline f'(x) & - & 0 & - & 0 & + \end{array}" />,
    reason: <>Collect the signs: <Katex tex="f'" /> is negative everywhere except a touch at <Katex tex="0" />, and crosses up through the axis once, at <Katex tex="x=5" />. Each option must fit this.</>,
  },
  {
    working: <Katex display tex="\textbf{B}, \textbf{C}, \textbf{D}: \ f'>0 \text{ just right of } O" />,
    reason: <>Each of these is positive between the origin and <Katex tex="x=5" />, which would mean <Katex tex="f" /> is <em>rising</em> there. The given graph is falling.</>,
  },
  {
    working: <Katex display tex="\textbf{E}: \ \text{crosses at } x=6" />,
    reason: <>E has the right shape, but it crosses zero at <Katex tex="x=6" />, where <Katex tex="f" /> crosses the axis, and is still negative at <Katex tex="x=5" />, where <Katex tex="f" /> has a horizontal tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option A}}" />,
    reason: <>Matches option <b>A</b>, the only graph with the sign pattern in the table.</>,
  },
]

export default function MethodsQ16_2019() {
  return (
    <MCQShell
      question={<p>Part of the graph of <Katex tex="y=f(x)" /> is shown below. The corresponding part of the graph of <Katex tex="y=f'(x)" /> is best represented by</p>}
      diagram={<img loading="lazy" decoding="async" src={stemSrc} alt="Graph of y = f(x): falling steeply from the upper left, flattening at the origin, continuing down to a minimum at x = 5, then rising steeply through the axis at x = 6" className="w-full max-w-[300px]" />}
      options={[
        { letter: 'A', content: OPT_A, isAnswer: true },
        { letter: 'B', content: OPT_B },
        { letter: 'C', content: OPT_C },
        { letter: 'D', content: OPT_D },
        { letter: 'E', content: OPT_E },
      ]}
      background={
        <Background title="Reading f′ off the graph of f">
          <p>
            <Katex tex="f'(x)" /> is the gradient of <Katex tex="f" /> at <Katex tex="x" />. So where <Katex tex="f" /> is
            rising, <Katex tex="f'" /> is above the axis; where <Katex tex="f" /> is falling, <Katex tex="f'" /> is below it;
            and where <Katex tex="f" /> is flat (a stationary point), <Katex tex="f'=0" />. At a turning point <Katex tex="f'" />{' '}
            crosses the axis, because the direction reverses. At a stationary point of inflection it only touches the axis,
            because <Katex tex="f" /> carries on in the same direction.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="Slide along f and watch f′ being drawn from its slope">
            <SlopeTrace />
          </Explore>
          <WrongMethod
            title="f′ crosses the axis where f does, at x = 6"
            source="14% chose E"
            working={<Katex display tex="f(6)=0 \implies f'(6)=0 \quad \text{(option E)}" />}
          >
            <p>
              At <Katex tex="x=6" /> the curve is climbing steeply through the axis, so <Katex tex="f'(6)" /> is large and
              positive. <Katex tex="f'" /> is zero and changes sign where <Katex tex="f" /> stops falling and starts rising: the
              minimum at <Katex tex="x=5" />. To catch it, check each candidate at the turning point of <Katex tex="f" />: the
              tangent there is horizontal, so <Katex tex="f'" /> must be on the axis. E is still below the axis at{' '}
              <Katex tex="x=5" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
