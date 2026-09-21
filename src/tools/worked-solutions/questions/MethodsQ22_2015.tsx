// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 22. VCAA examination report: 35% correct.
// Composing two graphs read off a diagram. Question text transcribed from the original
// paper; both figures are crops of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import fgSrc from './meth-2015-mcq22-fg.png'
import optionsSrc from './meth-2015-mcq22-options.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 35, C: 15, D: 26, E: 11 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Let <Katex tex="g(x)=\tan(x)" /> and <Katex tex="f(x)=-|x|" />. Then{' '}
      <Katex tex="g(-f(x))=\tan(|x|)" />; sketching this, the graph should be symmetrical
      about the <Katex tex="y" />-axis.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -|x| \implies -f(x) = |x|" />,
    reason: <>The graph of <Katex tex="f" /> is an inverted V with its vertex at the origin, so negating it gives the ordinary <Katex tex="|x|" />.</>,
  },
  {
    working: <Katex display tex="g(-f(x)) = g\bigl(|x|\bigr)" />,
    reason: <>The inner function is the whole point: whatever <Katex tex="g" /> is, it is being fed <Katex tex="|x|" />.</>,
  },
  {
    working: <Katex display tex="|-x| = |x| \implies g(|-x|) = g(|x|)" />,
    reason: <>So the composite is an <em>even</em> function — its graph is symmetric about the <Katex tex="y" />-axis, whatever <Katex tex="g" /> does. That single observation settles the question.</>,
  },
  {
    working: <Katex display tex="x\ge0 \implies g(|x|) = g(x)" />,
    reason: <>On the right of the axis the composite is just <Katex tex="g" /> itself: passing through the origin and rising steeply, as the first figure shows.</>,
  },
  {
    working: <Katex display tex="x<0 \implies g(|x|) = g(-x)" />,
    reason: <>The left half is the mirror image of the right, not a continuation of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{B}}" />,
    reason: <>The only option whose graph is symmetric about the <Katex tex="y" />-axis, touches the axis at the origin, and rises on both sides. Options A and C fall instead of rising, which would need <Katex tex="-g" />; D and E are not symmetric.</>,
  },
]

export default function MethodsQ22_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graphs of the functions with rules <Katex tex="f(x)" /> and{' '}
            <Katex tex="g(x)" /> are shown below.
          </p>
          <p>
            Which one of the following best represents the graph of the function with rule{' '}
            <Katex tex="g(-f(x))" />?
          </p>
        </>
      }
      diagram={
        <div className="flex flex-col gap-3">
          <img
            src={fgSrc}
            alt="Two graphs: y = g(x), an increasing curve through the origin rising steeply on both sides, and y = f(x), an inverted V with its vertex at the origin falling away on both sides — from the original 2015 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
          <img
            src={optionsSrc}
            alt="The five options A to E, each a small sketch on x and y axes, from the original 2015 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      }
      background={
        <p>
          Composing with <Katex tex="|x| " /> always produces an even function: since{' '}
          <Katex tex="|-x|=|x|" />, the output at <Katex tex="-x" /> is identical to the
          output at <Katex tex="x" />. So the answer must be symmetric about the{' '}
          <Katex tex="y" />-axis, and it will be the right-hand half of{' '}
          <Katex tex="g" /> reflected across.
        </p>
      }
      options={[
        { letter: 'A', content: <>the sketch labelled A above</> },
        { letter: 'B', content: <>the sketch labelled B above</>, isAnswer: true },
        { letter: 'C', content: <>the sketch labelled C above</> },
        { letter: 'D', content: <>the sketch labelled D above</> },
        { letter: 'E', content: <>the sketch labelled E above</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
