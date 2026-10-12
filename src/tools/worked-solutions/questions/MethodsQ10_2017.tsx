// 2017 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 47% correct.
// A transformation written as a matrix, applied to y = 3sin(2(x + π/4)). Transformation
// matrices are no longer on the study design, but the mathematics here — dilations from
// the axes applied to a graph, and a sine-to-cosine shift — is entirely current, so the
// question is included with a note on reading the matrix. See the skip guide. Question
// text transcribed from the original paper; solution is original.
// Checked in sympy: the image is cos(x) (D), agreeing with the report and itute. Every option has
// amplitude 1 and period 2π; they differ only in phase: A = −sin x, B = C = −cos x, E = sin x.
// Interactive: meth-2017-mcq10-dilate (the two dilations one step at a time with a draggable point;
// the original's maximum (0, 3) stays on the y-axis and lands on (0, 1); option B overlaid as −cos x).
// WrongMethod: option B (23%) — sin(x − π/2) is −cos(x), not cos(x).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DilateWidget = lazyWidget(() => import('../interactives/meth-2017-mcq10-dilate'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 23, C: 6, D: 47, E: 14 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />
      <br />
      <Katex tex="x'=2x,\ x=\tfrac{x'}{2}" />
      <br />
      <Katex tex="y'=\tfrac13y,\ y=3y'" />
      <br />
      <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />
      <br />
      <Katex tex="3y'=3\sin\!\left(2\left(\tfrac{x'}{2}+\tfrac{\pi}{4}\right)\right)" />
      <br />
      <Katex tex="y'=\sin\!\left(x'+\tfrac{\pi}{2}\right)" />
      <br />
      <Katex tex="y'=\cos(x')" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x'=2x, \qquad y'=\tfrac13y" />,
    reason: <>Multiply out the matrix row by row. This is a dilation by factor <Katex tex="2" /> from the <Katex tex="y" />-axis and by factor <Katex tex="\tfrac13" /> from the <Katex tex="x" />-axis.</>,
    more: <>The first row gives <Katex tex="x'=2x+0y" />, the second <Katex tex="y'=0x+\tfrac13y" />.</>,
  },
  {
    working: <Katex display tex="x=\frac{x'}{2}, \qquad y=3y'" />,
    reason: <>The rule we know uses the <em>old</em> <Katex tex="x" /> and <Katex tex="y" />, so write them in terms of the new ones, ready to substitute.</>,
    more: <>Getting this backwards (<Katex tex="x=2x'" />) is the usual slip.</>,
  },
  {
    working: <Katex display tex="3y' = 3\sin\!\left(2\left(\frac{x'}{2}+\frac{\pi}{4}\right)\right)" />,
    reason: <>Replace every <Katex tex="x" /> by <Katex tex="\tfrac{x'}{2}" /> and <Katex tex="y" /> by <Katex tex="3y'" /> in <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />. Keep the bracket: the <Katex tex="2" /> multiplies both terms inside it.</>,
  },
  {
    working: <Katex display tex="3y' = 3\sin\!\left(x'+\frac{\pi}{2}\right)" />,
    reason: <>Expanding: <Katex tex="2\times\tfrac{x'}{2}=x'" /> and <Katex tex="2\times\tfrac{\pi}{4}=\tfrac{\pi}{2}" />.</>,
    more: <>The shift doubles too, because a dilation from the <Katex tex="y" />-axis doubles <em>every</em> horizontal distance, including the <Katex tex="\tfrac{\pi}{4}" /> gap.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y' = \sin\!\left(x'+\frac{\pi}{2}\right)" />
        <Katex display tex="= \cos(x')" />
      </>
    ),
    reason: <>Divide both sides by <Katex tex="3" />, then use <Katex tex="\sin\!\left(\theta+\tfrac{\pi}{2}\right)=\cos(\theta)" />.</>,
    more: <>Dividing by <Katex tex="3" /> is exactly what the dilation by factor <Katex tex="\tfrac13" /> from the <Katex tex="x" />-axis does to the amplitude. The identity holds because a sine shifted a quarter-period <em>left</em> starts at its maximum, just like cosine.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\cos(x)}" />,
    reason: <>Matches option <b>D</b> (writing the image with <Katex tex="x" /> and <Katex tex="y" /> again).</>,
    more: <>A check without algebra: the original has its maximum <Katex tex="3\sin\!\left(\tfrac{\pi}{2}\right)=3" /> at <Katex tex="x=0" />. The dilation from the <Katex tex="y" />-axis keeps points with <Katex tex="x=0" /> at <Katex tex="x=0" />, and the dilation from the <Katex tex="x" />-axis only changes heights, so the peak <Katex tex="(0,3)" /> goes to <Katex tex="(0,1)" />: the image has its maximum <Katex tex="1" /> at <Katex tex="x=0" /> — a cosine. Putting <Katex tex="x=0" /> into each option: A gives <Katex tex="0" />, B and C give <Katex tex="-1" />, E gives <Katex tex="0" />; only D gives <Katex tex="1" />. In fact A is <Katex tex="-\sin(x)" />, B and C are both <Katex tex="-\cos(x)" /> (two options that are the same function cannot be the single correct answer), and E is <Katex tex="\sin(x)" /> in disguise. Option B (23%) is the Common Mistake below.</>,
  },
]

export default function MethodsQ10_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A transformation <Katex tex="T:R^2\to R^2" /> with rule{' '}
            <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />{' '}
            maps the graph of{' '}
            <Katex tex="y=3\sin\!\left(2\left(x+\tfrac{\pi}{4}\right)\right)" />
          </p>
          <p>onto the graph of</p>
        </>
      }
      background={
        <Background title="On the matrix notation">
          <p>
            Transformation matrices were dropped
            from Mathematical Methods, so you will not be asked to read one in a current
            exam. Everything else in this question is core material, which is why it is
            here rather than in the skip list.
          </p>
          <p>
            The matrix <Katex tex="\begin{bmatrix}2&0\\0&\tfrac13\end{bmatrix}" /> says
            nothing more than <Katex tex="x'=2x" /> and <Katex tex="y'=\tfrac13y" /> — a
            dilation of factor <Katex tex="2" /> from the <Katex tex="y" />-axis and a
            dilation of factor <Katex tex="\tfrac13" /> from the <Katex tex="x" />-axis. A
            current paper would describe those two dilations in words, and the working from
            there is identical.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\sin(x+\pi)" /> },
        { letter: 'B', content: <Katex tex="y=\sin\!\left(x-\tfrac{\pi}{2}\right)" /> },
        { letter: 'C', content: <Katex tex="y=\cos(x+\pi)" /> },
        { letter: 'D', content: <Katex tex="y=\cos(x)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="y=\cos\!\left(x-\tfrac{\pi}{2}\right)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The peak never leaves the y-axis">
            <DilateWidget />
          </Explore>
          <WrongMethod
            title="A shift of π/2 is a shift of π/2 — the sign doesn't matter, so B"
            source="23% chose B"
            working={
              <>
                <Katex display tex="\sin\!\left(0-\tfrac{\pi}{2}\right)=-1" />
                <Katex display tex="\sin\!\left(0+\tfrac{\pi}{2}\right)=1" />
                <Katex display tex="\sin\!\left(x-\tfrac{\pi}{2}\right)=-\cos(x)" />
              </>
            }
          >
            The sign says which way the graph moves. <Katex tex="x-\tfrac{\pi}{2}" /> moves the sine{' '}
            <Katex tex="\tfrac{\pi}{2}" /> to the <em>right</em>, which brings its minimum (at{' '}
            <Katex tex="x=-\tfrac{\pi}{2}" />) onto the <Katex tex="y" />-axis, so option B is the correct
            graph flipped upside down. The working needs <Katex tex="+\tfrac{\pi}{2}" />, a shift to the{' '}
            <em>left</em>, which brings the maximum onto the <Katex tex="y" />-axis instead.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
