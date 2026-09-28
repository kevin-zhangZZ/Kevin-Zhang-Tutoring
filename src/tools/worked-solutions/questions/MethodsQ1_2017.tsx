// 2017 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 92% correct.
// Period and range of 5sin(2x) − 1. Question text transcribed from the original paper;
// solution is original. The report has no comment on this question.
// Widget: meth-2017-mcq1-build — builds the graph from y = sin(x) one transformation at a time,
// showing that the 2 only changes the period and the 5 and −1 only change the range.
// WrongMethod: option A, the range [c, c + a] (as if sine's lowest value were 0).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BuildWidget = lazyWidget(() => import('../interactives/meth-2017-mcq1-build'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 1, C: 92, D: 2, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = a\sin(nx)+c \implies \text{period}=\frac{2\pi}{n}" />,
    reason: (
      <>
        Sine completes one cycle as its <em>input</em> runs from <Katex tex="0" /> to <Katex tex="2\pi" />. Here the
        input is <Katex tex="2x" />, which gets to <Katex tex="2\pi" /> when <Katex tex="x" /> is only{' '}
        <Katex tex="\pi" />: the graph is squeezed to half its width (a dilation by factor{' '}
        <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis).
      </>
    ),
  },
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{2} = \pi" />,
    reason: (
      <>
        Only the <Katex tex="n" /> inside the sine affects the period; the <Katex tex="5" /> and the{' '}
        <Katex tex="-1" /> change heights, not widths. This already leaves only A and C.
      </>
    ),
  },
  {
    working: <Katex display tex="-1\le\sin(2x)\le1" />,
    reason: (
      <>
        For the range, start from what sine can do: whatever is inside it, sine never leaves this band, and it
        reaches both ends.
      </>
    ),
  },
  {
    working: <Katex display tex="-5\le 5\sin(2x)\le 5" />,
    reason: (
      <>
        Multiply every part of the inequality by the amplitude <Katex tex="5" /> (positive, so the signs stay the
        same way round). This is the dilation by factor <Katex tex="5" /> from the <Katex tex="x" />-axis.
      </>
    ),
  },
  {
    working: <Katex display tex="-6\le 5\sin(2x)-1\le 4" />,
    reason: (
      <>
        Subtract <Katex tex="1" /> from every part: the whole band slides down one unit, centred on the midline{' '}
        <Katex tex="y=-1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\pi \text{ and } [-6,4]}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option A (4%) runs from the shift <Katex tex="-1" /> up to{' '}
        <Katex tex="-1+5=4" />, as if sine's lowest value were <Katex tex="0" />. Options D and E have the range
        right but the period wrong: <Katex tex="2\pi" /> ignores the <Katex tex="2" /> inside, and{' '}
        <Katex tex="4\pi" /> multiplies by it instead of dividing. A quick check: the midpoint of{' '}
        <Katex tex="[-6,4]" /> is <Katex tex="-1" />, the vertical shift, and its half-width is <Katex tex="5" />,
        the amplitude.
      </>
    ),
  },
]

export default function MethodsQ1_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=5\sin(2x)-1" />.
          </p>
          <p>The period and range of this function are respectively</p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\pi" /> and <Katex tex="[-1,4]" /></> },
        { letter: 'B', content: <><Katex tex="2\pi" /> and <Katex tex="[-1,5]" /></> },
        { letter: 'C', content: <><Katex tex="\pi" /> and <Katex tex="[-6,4]" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="2\pi" /> and <Katex tex="[-6,4]" /></> },
        { letter: 'E', content: <><Katex tex="4\pi" /> and <Katex tex="[-6,4]" /></> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Build 5sin(2x) − 1 one step at a time: which number moves what">
            <BuildWidget />
          </Explore>
          <WrongMethod
            title="The graph is shifted to −1 and has amplitude 5, so it goes from −1 up to 4"
            source="4% chose A"
            working={<Katex display tex="\text{range} = [-1,\ -1+5] = [-1,4]" />}
          >
            <p>
              This treats <Katex tex="y=-1" /> as the bottom of the graph, but it is the <em>middle</em>. The amplitude
              is measured from the midline both ways, because <Katex tex="\sin(2x)" /> goes down to{' '}
              <Katex tex="-1" /> just as far as it goes up to <Katex tex="1" />. To catch it, find an actual minimum:
              at <Katex tex="x=\tfrac{3\pi}{4}" />, <Katex tex="\sin\left(\tfrac{3\pi}{2}\right)=-1" />, so{' '}
              <Katex tex="f\left(\tfrac{3\pi}{4}\right)=-5-1=-6" />, well below <Katex tex="-1" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
