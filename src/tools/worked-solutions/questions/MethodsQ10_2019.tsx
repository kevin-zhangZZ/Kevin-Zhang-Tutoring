// 2019 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 55% correct (33% chose C),
// no written comment. Which property is true for f(x) = x + sin(x). Question text transcribed
// from the original paper. VCAA printed no diagram, so the question stem here has none either
// (guide §7) — the graph is this site's own explanatory figure (matplotlib) and appears only
// inside the worked solution, where it is our explanation rather than given information. It
// would give the answer away in the stem: every option is a claim about the shape of this curve.
// Solution is original; answer D agrees with the report and itute.
// Interactives: meth-2019-mcq10-period (shift the graph by h — sin(x) lands on itself at 2π,
// x + sin(x) lands 2π lower, so it has no period) and meth-2019-mcq10-tangent (slide a tangent:
// gradient 1 + cos(x) is never negative, flat only at ±π). WrongMethod: option C.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2019-mcq10-xsinx.png'

const PeriodWidget = lazyWidget(() => import('../interactives/meth-2019-mcq10-period'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2019-mcq10-tangent'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 6, C: 33, D: 55, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of y = x + sin(x): an always-rising staircase-like curve that briefly flattens at x = ±π but never turns back down" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>With a &ldquo;which statement is true&rdquo; question about one function, graph it on CAS first: every option is a claim about this curve. <Katex tex="f" /> is the straight line <Katex tex="y=x" /> with a sine wave added on top. The line sets the overall upward drift; the sine only makes it wobble.</>,
  },
  {
    working: <Katex display tex="x-1\le x+\sin(x)\le x+1" />,
    reason: <>Option <b>A</b>. Since <Katex tex="-1\le\sin(x)\le1" />, the graph is trapped between the parallel lines <Katex tex="y=x-1" /> and <Katex tex="y=x+1" />. Both rise without bound, so <Katex tex="f(x)\to\pm\infty" /> as <Katex tex="x\to\pm\infty" /> and it never levels out to a horizontal asymptote. A is false.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(x+2\pi) = (x+2\pi)+\sin(x+2\pi)" />
        <Katex display tex="= f(x)+2\pi \ne f(x)" />
      </>
    ),
    reason: <>Option <b>C</b>. &ldquo;Period <Katex tex="2\pi" />&rdquo; means <Katex tex="f(x+2\pi)=f(x)" /> for <em>every</em> <Katex tex="x" />: shift the graph <Katex tex="2\pi" /> along and it lands on itself. The <Katex tex="\sin" /> part does repeat, but the <Katex tex="x" /> part has grown by <Katex tex="2\pi" />, so each copy of the wobble sits <Katex tex="2\pi" /> higher than the one before. C is false.</>,
  },
  {
    working: <Katex display tex="f'(x) = 1+\cos(x)" />,
    reason: <>Options <b>D</b> and <b>E</b> are both about <Katex tex="f'" />, so differentiate term by term. The <Katex tex="x" /> term contributes <Katex tex="1" />, which option <b>E</b> has lost, so E is false.</>,
  },
  {
    working: <Katex display tex="-1\le\cos(x)\le1 \implies 0\le 1+\cos(x)\le2" />,
    reason: <>To decide the sign of <Katex tex="f'(x)" />, start from the range of <Katex tex="\cos" /> and add <Katex tex="1" /> to every part. The smallest the gradient can be is <Katex tex="0" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(x)=0 \iff \cos(x)=-1" />
        <Katex display tex="\iff x=\ldots,-\pi,\pi,3\pi,\ldots" />
        <Cas fn="solve">solve(x + sin(x) = 4, x)</Cas>
        <Katex display tex="x\approx4.968 \ \text{ (one solution)}" />
      </>
    ),
    reason: <>Option <b>B</b>. The gradient is <Katex tex="0" /> only at isolated points (the flat spots on the graph, stationary points of inflection), never over an interval, so <Katex tex="f" /> is strictly increasing. A strictly increasing function takes each value exactly once, so <Katex tex="f(x)=4" /> has exactly one solution, as CAS confirms. B is false.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)\ge0 \text{ for } x\in R}" />,
    reason: <>Matches option <b>D</b>. The equals sign matters: <Katex tex="f'(x)=0" /> at <Katex tex="x=\pm\pi,\pm3\pi,\ldots" />, so <Katex tex="f'(x)>0" /> would be false, but the gradient is never negative. Option <b>C</b>, chosen by <Katex tex="33\%" />, carries the period of <Katex tex="\sin(x)" /> over to <Katex tex="f" />; the <Katex tex="+x" /> stops the graph repeating.</>,
  },
]

export default function MethodsQ10_2019() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following statements is true for <Katex tex="f:R\to R,\ f(x)=x+\sin(x)" />?
        </p>
      }
      background={
        <Background title="What “periodic” and “f′(x) ≥ 0” say about a graph">
          <p>
            A function has period <Katex tex="P" /> when <Katex tex="f(x+P)=f(x)" /> for every <Katex tex="x" />: slide the
            graph <Katex tex="P" /> units sideways and it lands exactly on itself. Repeating the same <em>shape</em> is not
            enough; it must repeat at the same <em>height</em>.
          </p>
          <p>
            <Katex tex="f'(x)\ge0" /> everywhere means the tangent never points downhill. If <Katex tex="f'(x)=0" /> only at
            isolated points, the graph just pauses there (a stationary point of inflection) and keeps rising, so it is still
            strictly increasing.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <>The graph of <Katex tex="f" /> has a horizontal asymptote</> },
        { letter: 'B', content: <>There are infinitely many solutions to <Katex tex="f(x)=4" /></> },
        { letter: 'C', content: <><Katex tex="f" /> has a period of <Katex tex="2\pi" /></> },
        { letter: 'D', content: <><Katex tex="f'(x)\ge0" /> for <Katex tex="x\in R" /></>, isAnswer: true },
        { letter: 'E', content: <><Katex tex="f'(x)=\cos(x)" /></> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Same shape, but 2π higher: why x + sin(x) has no period">
            <PeriodWidget />
          </Explore>
          <WrongMethod
            title="sin(x) has period 2π, so x + sin(x) does too"
            source="33% chose C"
            working={
              <>
                <Katex display tex="f(x+2\pi)=x+2\pi+\sin(x)" />
                <Katex display tex="=f(x)+2\pi\ne f(x)" />
              </>
            }
          >
            <p>
              Adding a periodic function to a non-periodic one does not give a periodic function. The wobble from{' '}
              <Katex tex="\sin(x)" /> repeats every <Katex tex="2\pi" />, but it rides on the line <Katex tex="y=x" />, which
              rises <Katex tex="2\pi" /> over that same stretch. To catch it, test the definition with actual numbers:{' '}
              <Katex tex="f(0)=0" /> but <Katex tex="f(2\pi)=2\pi" />, so the graph has not come back to where it started.
            </p>
          </WrongMethod>
          <Explore title="Slide the tangent: the gradient 1 + cos(x) never goes negative">
            <TangentWidget />
          </Explore>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
