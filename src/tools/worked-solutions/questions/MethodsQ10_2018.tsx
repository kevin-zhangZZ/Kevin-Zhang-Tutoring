// 2018 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 74% correct. Which
// rule satisfies the functional equation f(x + f(x)) = f(2x). Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Every option tested symbolically in sympy; answer C agrees with the report and itute. Solution is
// original: every option is a sloping line (one-to-one), so equal outputs force equal inputs,
// x + f(x) = 2x, giving f(x) = x directly; the other options are then checked and fail.
// Interactive: meth-2018-mcq10-inputs (the two inputs x + f(x) and 2x on the graph of each option;
// they coincide for every x only for C, and at a single x for A and E). No WrongMethod: the report
// has no comment and no distractor slip could be verified.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const InputsWidget = lazyWidget(() => import('../interactives/meth-2018-mcq10-inputs'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 74, D: 8, E: 5 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="f \text{ linear, non-constant}" /><Katex display tex="\implies f \text{ one-to-one}" />
        <Katex display tex="f\bigl(x+f(x)\bigr) = f(2x)" /><Katex display tex="\implies x+f(x) = 2x" />
      </>
    ),
    reason: <>Every option is a sloping straight line, which never gives two different inputs the same output. So equal outputs need equal <em>inputs</em>: strip the <Katex tex="f" /> off both sides.</>,
    more: (
      <>
        How would you know to start here? Both sides of the equation are <Katex tex="f" /> of something, so
        ask when two outputs of <Katex tex="f" /> can be equal. For a one-to-one function, only when the inputs are.
      </>
    ),
  },
  {
    working: <Katex display tex="\implies f(x) = x" />,
    reason: <>Subtract <Katex tex="x" /> from both sides. This points to option <b>C</b>; the next rows confirm C works and check that the others fail.</>,
  },
  {
    working: <Katex display tex="\textbf{C}: \ f\bigl(x+x\bigr) = f(2x) \ \checkmark" />,
    reason: <>Substitute <Katex tex="f(x)=x" />: the inner bracket becomes <Katex tex="2x" />, so both sides are <Katex tex="f(2x)=2x" /> for every <Katex tex="x" />.</>,
  },
  {
    working: <><Katex display tex="\textbf{A}: \ f\bigl(x+(1-x)\bigr) = f(1) = 0" /><Katex display tex="f(2x) = 1-2x" /></>,
    reason: <>Ruling out <b>A</b>: the left side is the constant <Katex tex="0" /> but the right side depends on <Katex tex="x" />, so they agree only at <Katex tex="x=\tfrac12" />.</>,
    more: (
      <>
        Had you tested only <Katex tex="x=\tfrac12" />, A would have looked right.
      </>
    ),
  },
  {
    working: <><Katex display tex="\textbf{B}: \ f\bigl(x+(x-1)\bigr) = 2x-2" /><Katex display tex="f(2x) = 2x-1" /></>,
    reason: <>Ruling out <b>B</b>: the two sides differ by <Katex tex="1" /> everywhere.</>,
  },
  {
    working: <><Katex display tex="\textbf{D}: \ f\!\left(x+\tfrac{x}{2}\right) = \tfrac{3x}{4}" /><Katex display tex="f(2x) = x" /></>,
    reason: <>Ruling out <b>D</b>: equal only at <Katex tex="x=0" />, which the question excludes anyway.</>,
  },
  {
    working: <><Katex display tex="\textbf{E}: \ f\!\left(x+\tfrac{1-x}{2}\right) = \tfrac{1-x}{4}" /><Katex display tex="f(2x) = \tfrac{1-2x}{2}" /></>,
    reason: <>Ruling out <b>E</b>: the two sides have different gradients, so they agree only where the lines cross, at <Katex tex="x=\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x}" />,
    reason: <>Matches option <b>C</b>, the only option where the two sides agree for every non-zero <Katex tex="x" />.</>,
  },
]

export default function MethodsQ10_2018() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f" /> has the property{' '}
          <Katex tex="f\bigl(x+f(x)\bigr)=f(2x)" /> for all non-zero real numbers{' '}
          <Katex tex="x" />. Which one of the following is a possible rule for the function?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=1-x" /> },
        { letter: 'B', content: <Katex tex="f(x)=x-1" /> },
        { letter: 'C', content: <Katex tex="f(x)=x" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=\dfrac{x}{2}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\dfrac{1-x}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Testing a functional equation">
          <p>
            The condition must hold <em>for all</em> non-zero <Katex tex="x" />, so it is not
            enough to find one value that works — and conversely, one value that fails kills
            an option outright. A quick screen: at <Katex tex="x=1" />, options A, B, D and E
            all fail and only C survives.
          </p>
          <p>
            The mechanical approach always works: for each candidate, compute{' '}
            <Katex tex="f(x)" />, add it to <Katex tex="x" />, feed the result back into{' '}
            <Katex tex="f" />, and compare with <Katex tex="f(2x)" />. Since every option
            here is linear, both sides come out linear and you only need the gradients and
            intercepts to match.
          </p>
          <p>
            The quicker route uses <em>one-to-one</em>: if <Katex tex="f" /> never repeats an
            output, then <Katex tex="f(p)=f(q)" /> forces <Katex tex="p=q" />. (A constant
            function would also satisfy the property, since both sides equal the constant, but
            none of the options is constant.)
          </p>
        </Background>
      }
      extras={
        <Explore title="Same output needs the same input: x + f(x) must equal 2x">
          <InputsWidget />
        </Explore>
      }
    />
  )
}
