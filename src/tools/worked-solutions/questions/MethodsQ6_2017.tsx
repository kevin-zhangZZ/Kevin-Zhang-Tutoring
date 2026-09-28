// 2017 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 88% correct.
// Picking the graph of the inverse from five options. Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Solution is original.
// Widget: interactives/meth-2017-mcq6-reflect (drag P along a curve shaped like f and watch its
// mirror image P′ in y = x, with gradient m becoming 1/m; a toggle shows option A as y = −f(x)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2017-mcq6-graph.png'
import optASrc from './meth-2017-mcq6-optA.png'
import optBSrc from './meth-2017-mcq6-optB.png'
import optCSrc from './meth-2017-mcq6-optC.png'
import optDSrc from './meth-2017-mcq6-optD.png'
import optESrc from './meth-2017-mcq6-optE.png'

const ReflectWidget = lazyWidget(() => import('../interactives/meth-2017-mcq6-reflect'))

function OptionGraph({ src, letter }: { src: string; letter: string }) {
  return <img src={src} alt={`Option ${letter}: a small sketch on x and y axes, from the original 2017 VCAA exam paper`} className="w-full max-w-[180px]" />
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 3, C: 88, D: 3, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(a,b)\in f \iff (b,a)\in f^{-1}" />,
    reason: (
      <>
        An inverse swaps inputs and outputs, so every point of <Katex tex="f" /> has its coordinates swapped.
        Swapping <Katex tex="x" /> and <Katex tex="y" /> is the same as reflecting in the line{' '}
        <Katex tex="y=x" />. That is why the question says the same scale is used on both axes: only then does
        the reflection look like a mirror image.
      </>
    ),
  },
  {
    working: <Katex display tex="f \text{ increasing} \implies f^{-1} \text{ increasing}" />,
    reason: (
      <>
        Swapping coordinates keeps the order: bigger outputs of <Katex tex="f" /> came from bigger inputs, so
        bigger inputs of <Katex tex="f^{-1}" /> give bigger outputs. The graph of <Katex tex="f" /> rises from
        bottom left to top right, so its inverse must rise too. A, B and D fall from left to right, and both
        branches of E fall, so only C is left.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{gradient } m \;\longrightarrow\; \text{gradient } \tfrac{1}{m}" />,
    reason: (
      <>
        Don&apos;t just take the last one standing: check the shape. Reflecting in <Katex tex="y=x" /> swaps
        each rise with its run, so a gradient <Katex tex="m" /> becomes <Katex tex="\tfrac1m" />. The steep
        lower-left piece of <Katex tex="f" /> becomes a gentle piece on the left, and the gentle straight piece
        becomes a steep straight piece on the right. C is gentle then steep.
      </>
    ),
  },
  {
    working: <Katex display tex="(p,0)\to(0,p),\quad (0,-q)\to(-q,0)" />,
    reason: (
      <>
        The intercepts swap too (here <Katex tex="p,\,q>0" />). <Katex tex="f" /> cuts the <Katex tex="x" />-axis
        just right of the origin and the <Katex tex="y" />-axis below it, so <Katex tex="f^{-1}" /> cuts the{' '}
        <Katex tex="y" />-axis just above the origin and the <Katex tex="x" />-axis to the left of it. C does both.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{C}}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option A is <Katex tex="f" /> reflected in the <Katex tex="x" />-axis, the graph
        of <Katex tex="y=-f(x)" />, rather than in <Katex tex="y=x" />.
      </>
    ),
  },
]

export default function MethodsQ6_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of the function <Katex tex="f" /> is shown below. The same scale
            has been used on both axes.
          </p>
          <p>
            The corresponding part of the graph of the inverse function{' '}
            <Katex tex="f^{-1}" /> is best represented by
          </p>
        </>
      }
      diagram={
        <img
          src={graphSrc}
          alt="Part of the graph of f: an increasing curve, steep just left of the origin, flattening where it meets the x-axis, then rising gently to the right, from the original 2017 VCAA exam paper"
          className="w-full max-w-[200px]"
        />
      }
      background={
        <p>
          Two facts settle almost every pick-the-inverse question without any algebra.
          Reflecting in <Katex tex="y=x" /> preserves whether a curve is increasing or
          decreasing, and it turns a gradient of <Katex tex="m" /> into{' '}
          <Katex tex="\tfrac1m" /> — so steep becomes shallow and shallow becomes steep.
        </p>
      }
      options={[
        { letter: 'A', content: <OptionGraph src={optASrc} letter="A" /> },
        { letter: 'B', content: <OptionGraph src={optBSrc} letter="B" /> },
        { letter: 'C', content: <OptionGraph src={optCSrc} letter="C" />, isAnswer: true },
        { letter: 'D', content: <OptionGraph src={optDSrc} letter="D" /> },
        { letter: 'E', content: <OptionGraph src={optESrc} letter="E" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Reflecting in y = x: steep becomes gentle, uphill stays uphill">
            <ReflectWidget />
          </Explore>
          <WrongMethod
            title="Flip the graph over the x-axis"
            source="5% chose A"
            working={<Katex display tex="y=-f(x)" />}
          >
            Option A is <Katex tex="f" /> reflected in the <Katex tex="x" />-axis, which changes the sign of
            every output. That is the graph of <Katex tex="-f" />, not of the inverse. <Katex tex="f^{-1}" /> undoes{' '}
            <Katex tex="f" />, which means swapping <Katex tex="x" /> and <Katex tex="y" />: the mirror is the line{' '}
            <Katex tex="y=x" />, not an axis. The quick catch: <Katex tex="f" /> is increasing, so its inverse must
            be increasing, and A falls.
          </WrongMethod>
        </>
      }
    />
  )
}
