// 2017 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 75% correct.
// Evaluating a composite from a table of values. Question text transcribed from the
// original paper; solution is original. Widget: interactives/meth-2017-mcq4-inside-out (the
// value passed through the two function "machines", in either order, for x = 2, 3, 4).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const InsideOutWidget = lazyWidget(() => import('../interactives/meth-2017-mcq4-inside-out'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 6, D: 7, E: 75 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(3)=2" />,
    reason: (
      <>
        Work from the inside out. In <Katex tex="f(g(3))" /> the function touching the <Katex tex="3" /> is{' '}
        <Katex tex="g" />, so <Katex tex="g" /> acts first; you can&apos;t apply <Katex tex="f" /> until you know
        what is inside its bracket. <Katex tex="g(3)=2" /> is one of the given values.
      </>
    ),
  },
  {
    working: <Katex display tex="f(g(3)) = f(2)" />,
    reason: (
      <>
        The output of <Katex tex="g" /> becomes the input of <Katex tex="f" />, so replace <Katex tex="g(3)" /> by{' '}
        <Katex tex="2" />. That <Katex tex="f(2)" /> is on the list is a good sign you are on the right track: the
        examiners made sure every value the correct chain needs is given.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f(g(3)) = 5}" />,
    reason: (
      <>
        Matches option <b>E</b>, reading <Katex tex="f(2)=5" /> off the list. Option A is{' '}
        <Katex tex="g(f(3))=g(4)=1" />, the composite done in the wrong order; B is <Katex tex="g(3)=2" />, only the
        first of the two steps; D is <Katex tex="f(3)=4" />, which skips <Katex tex="g" /> altogether.
      </>
    ),
  },
]

export default function MethodsQ4_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f" /> and <Katex tex="g" /> be functions such that{' '}
            <Katex tex="f(2)=5" />, <Katex tex="f(3)=4" />, <Katex tex="g(2)=5" />,{' '}
            <Katex tex="g(3)=2" /> and <Katex tex="g(4)=1" />.
          </p>
          <p>
            The value of <Katex tex="f(g(3))" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      background={
        <p>
          A composite is a chain of two functions: <Katex tex="f(g(x))" /> means put <Katex tex="x" /> into{' '}
          <Katex tex="g" />, then put the result into <Katex tex="f" />. The inside function acts first, and its
          output has to be a value <Katex tex="f" /> can accept, which is why <Katex tex="f(g(x))" /> needs the range
          of <Katex tex="g" /> to sit inside the domain of <Katex tex="f" />.
        </p>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Inside out: g acts first, then f">
            <InsideOutWidget />
          </Explore>
          <WrongMethod
            title="g(3) = 2, so the answer is 2"
            source="10% chose B"
            working={<Katex display tex="g(3)=2" />}
          >
            That is only the first link of the chain. <Katex tex="f(g(3))" /> has two function letters, so it needs
            two look-ups: <Katex tex="2" /> is the value handed <em>to</em> <Katex tex="f" />, not the final answer.
            Count the letters before you stop: one look-up per function.
          </WrongMethod>
        </>
      }
    />
  )
}
