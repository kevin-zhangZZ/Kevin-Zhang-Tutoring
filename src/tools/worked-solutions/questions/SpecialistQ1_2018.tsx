// 2018 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct. The
// asymptotes of y = ½arctan(x). Question text and diagram transcribed from the original
// paper; the figure is cropped directly from the exam PDF, not a redrawing.
// Solution is original. Interactive (extras): spec-2018-mcq1-dilate — slide the dilation
// factor k and watch the asymptotes y = ±kπ/2 move with the curve; overlay options A–C to see
// why a line the curve crosses, or never approaches, is not an asymptote. WrongMethod for D.
// Note: VCAA's figure has no scale values (and Section A diagrams are "not drawn to scale"), so
// the asymptote height cannot be read off it; the solution says so rather than measuring.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './spec-2018-mcq1-arctan.png'

const DilateWidget = lazyWidget(() => import('../interactives/spec-2018-mcq1-dilate'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 4, D: 7, E: 85 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-\frac{\pi}{2} < \tan^{-1}(x) < \frac{\pi}{2} \ \text{ for all } x\in R" />,
    reason: (
      <>
        Start from the parent function: <Katex tex="\tan^{-1}(x)" /> approaches <Katex tex="\pm\tfrac{\pi}{2}" /> as{' '}
        <Katex tex="x\to\pm\infty" /> but never reaches them, so those are its horizontal asymptotes.
      </>
    ),
    more: (
      <>
        It can never get there: <Katex tex="\tan^{-1}(x)=\tfrac{\pi}{2}" /> would need{' '}
        <Katex tex="x=\tan\left(\tfrac{\pi}{2}\right)" />, which is undefined.
      </>
    ),
  },
  {
    working: <Katex display tex="y = \frac12\tan^{-1}(x) \implies -\frac{\pi}{4} < y < \frac{\pi}{4}" />,
    reason: (
      <>
        The <Katex tex="\tfrac12" /> multiplies the output (a dilation by factor <Katex tex="\tfrac12" /> from the{' '}
        <Katex tex="x" />-axis), so every height halves, including the heights the curve is heading for.
      </>
    ),
    more: (
      <>
        In symbols: multiply the whole inequality by <Katex tex="\tfrac12" />. It is positive, so the inequality signs
        stay the same way round.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y = \pm\frac{\pi}{4}}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: (
      <>
        Don&rsquo;t try to measure this off the diagram: it has no scale, and VCAA&rsquo;s diagrams are not drawn to
        scale, so the rule decides it. Option <b>D</b> <Katex tex="\left(\pm\tfrac{\pi}{2}\right)" /> forgets the
        dilation and quotes the asymptotes of <Katex tex="\tan^{-1}(x)" /> itself. Options <b>A</b> and <b>B</b> are
        heights below <Katex tex="\tfrac{\pi}{4}\approx0.785" />, which the curve passes straight through (at{' '}
        <Katex tex="x=\tan(1)\approx1.6" /> and <Katex tex="x=\tan(1.5)\approx14.1" />); option <b>C</b> is above it, a
        height the curve never comes close to.
      </>
    ),
  },
]

export default function SpecialistQ1_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Part of the graph of <Katex tex="y=\dfrac12\tan^{-1}(x)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of y = ½arctan(x): an increasing S-shaped curve through the origin, flattening towards horizontal dashed lines above and below the axis, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
          </div>
          <p className="mt-3">The equations of its asymptotes are</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\pm\dfrac12" /> },
        { letter: 'B', content: <Katex tex="y=\pm\dfrac34" /> },
        { letter: 'C', content: <Katex tex="y=\pm1" /> },
        { letter: 'D', content: <Katex tex="y=\pm\dfrac{\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="y=\pm\dfrac{\pi}{4}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Dilations move horizontal asymptotes">
          <p>
            <Katex tex="y=a\,f(x)" /> is <Katex tex="y=f(x)" /> dilated by factor <Katex tex="a" /> from the{' '}
            <Katex tex="x" />-axis: each point <Katex tex="(x,y)" /> goes to <Katex tex="(x,ay)" />. So a horizontal
            asymptote <Katex tex="y=L" /> becomes <Katex tex="y=aL" />, while anything about <Katex tex="x" /> (such as a
            vertical asymptote) is unchanged.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Halve every height and the asymptotes halve too">
            <DilateWidget />
          </Explore>
          <WrongMethod
            title="tan⁻¹ has asymptotes y = ±π/2, so this graph does too"
            source="7% chose D"
            working={<Katex display tex="y=\pm\frac{\pi}{2}" />}
          >
            Those belong to <Katex tex="y=\tan^{-1}(x)" /> itself. Whenever a function is multiplied by a constant, ask
            what that does to its range before quoting a known asymptote.
          </WrongMethod>
        </>
      }
    />
  )
}
