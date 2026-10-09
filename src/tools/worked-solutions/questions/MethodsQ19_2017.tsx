// 2017 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 59% correct (no comment
// in the report). A probability density function supported on an interval of width 1, solved for
// its left endpoint. Question text transcribed from the original paper; answer verified with sympy
// (area = 1 + sin(k+1) - sin(k); options B and D both give area 1, only D is in 0 < k < 2) and
// agrees with itute. Solution is original.
// Widget: interactives/meth-2017-mcq19-window.tsx — slide the width-1 window; the area is the unit
// square under y = 1 plus the green/red cosine pieces, which cancel when the window is centred on
// pi/2. WrongMethod boxes for B (17%) and E (8%), both checked numerically.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const WindowWidget = lazyWidget(() => import('../interactives/meth-2017-mcq19-window'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 17, C: 9, D: 59, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_k^{k+1}\bigl(\cos(x)+1\bigr)dx = 1" />,
    reason: <>The only unknown is <Katex tex="k" />, and the one property of a density that involves <Katex tex="k" /> is total area <Katex tex="1" />. Outside <Katex tex="(k,k+1)" /> the function is zero, so only that interval contributes.</>,
  },
  {
    working: <Cas fn="solve">solve(∫(cos(x)+1, x, k, k+1) = 1, k) | 0&lt;k&lt;2</Cas>,
    reason: <>On CAS this is one line and returns <Katex tex="k=\tfrac{\pi-1}{2}" />. Keep the <Katex tex="0<k<2" /> restriction: without it CAS returns a whole family of solutions, one every <Katex tex="\pi" />. The by-hand working below shows <em>why</em> the answer is what it is.</>,
  },
  {
    working: <Katex display tex="\Bigl[\sin(x)+x\Bigr]_k^{k+1} = 1" />,
    reason: <>Antidifferentiating: <Katex tex="\sin(x)" /> for the <Katex tex="\cos(x)" />, and <Katex tex="x" /> for the <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)+(k+1)-\sin(k)-k = 1" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)-\sin(k) = 0" />,
    reason: <>The <Katex tex="k" /> terms cancel and the <Katex tex="+1" /> matches the right-hand side. That is the whole trick: under <Katex tex="y=1" /> the window is a <Katex tex="1\times1" /> square, so the "<Katex tex="+1" />" part of the density already supplies all the area. The cosine part must add up to <Katex tex="0" />, so its positive and negative pieces must cancel.</>,
    more: <>See the interactive below.</>,
  },
  {
    working: <Katex display tex="\sin(k+1)=\sin(k)" />,
    reason: <>Two angles with the same sine are either equal or supplementary (<Katex tex="\theta" /> and <Katex tex="\pi-\theta" />), each up to a multiple of <Katex tex="2\pi" />. These angles differ by <Katex tex="1" />, not a multiple of <Katex tex="2\pi" />, so they must be supplementary.</>,
  },
  {
    working: <Katex display tex="k+1 = \pi-k" />,
    reason: <>The supplementary case. The others, <Katex tex="k+1=3\pi-k" /> and so on, give <Katex tex="k" /> outside <Katex tex="0<k<2" />. In picture terms, the window's midpoint <Katex tex="\tfrac{k+(k+1)}{2}" /> is <Katex tex="\tfrac{\pi}{2}" />: the window is centred where <Katex tex="\cos(x)" /> changes sign.</>,
  },
  {
    working: <Katex display tex="2k = \pi-1 \implies \boxed{k=\frac{\pi-1}{2}}" />,
    reason: <>Matches option <b>D</b>. It is about <Katex tex="1.07" />, comfortably inside <Katex tex="0<k<2" />. Option B, <Katex tex="\tfrac{3\pi-1}{2}\approx4.21" />, also gives area <Katex tex="1" /> but lies outside that interval; option E, <Katex tex="\tfrac{\pi}{2}" />, is where the window's centre goes, not its left end.</>,
  },
]

export default function MethodsQ19_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A probability density function <Katex tex="f" /> is given by
          </p>
          <div className="mb-2">
            <Katex
              display
              tex="f(x)=\begin{cases}\cos(x)+1 & k<x<(k+1)\\ 0 & \text{elsewhere}\end{cases}"
            />
          </div>
          <p className="mb-2">
            where <Katex tex="0<k<2" />.
          </p>
          <p>
            The value of <Katex tex="k" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="\dfrac{3\pi-1}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi-1" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi-1}{2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{\pi}{2}" /> },
      ]}
      rows={ROWS}
      background={
        <Background>
          <p>
            A function is a probability density function when it is never negative and the total area under it is{' '}
            <Katex tex="1" />. Here <Katex tex="\cos(x)+1\ge0" /> for every <Katex tex="x" />, so the first condition holds
            wherever the interval is; only the area condition pins down <Katex tex="k" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why the width-1 window must be centred on π/2">
            <WindowWidget />
          </Explore>
          <WrongMethod
            title="Any solution of sin(k + 1) = sin(k) will do"
            source="17% chose B"
            working={<Katex display tex="k+1 = 3\pi-k \implies k=\frac{3\pi-1}{2}\approx4.21" />}
          >
            This <em>does</em> make the area <Katex tex="1" /> (the window is centred on <Katex tex="\tfrac{3\pi}{2}" />, the
            next place <Katex tex="\cos(x)" /> changes sign), but the question says <Katex tex="0<k<2" />. An equation with a
            trig function in it has infinitely many solutions, so always finish by checking which one lies in the stated
            domain.
          </WrongMethod>
          <WrongMethod
            title="The cosine changes sign at π/2, so k = π/2"
            source="8% chose E"
            working={<Katex display tex="\int_{\pi/2}^{\pi/2+1}\bigl(\cos(x)+1\bigr)dx = \cos(1)\approx0.54" />}
          >
            <Katex tex="k" /> is the <em>left end</em> of the interval. Putting it at <Katex tex="\tfrac{\pi}{2}" /> leaves the
            whole window where <Katex tex="\cos(x)<0" />, so the area falls well short of <Katex tex="1" />. It is the
            window&apos;s centre, <Katex tex="k+\tfrac12" />, that sits at <Katex tex="\tfrac{\pi}{2}" />. Check any candidate
            by substituting it back into the area.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
