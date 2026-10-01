// 2021 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 23% correct.
// The possible arguments of z when z² is real. Question text transcribed from the original
// paper. Solution is original. Widget: interactives/spec-2021-mcq6-doubling.tsx (drag z round
// the circle; z² turns twice as fast and is real at all four axis directions).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DoublingWidget = lazyWidget(() => import('../interactives/spec-2021-mcq6-doubling'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 23, B: 15, C: 30, D: 24, E: 8 },
  answer: 'A',
  comment: <>The square of any <Katex tex="z" /> with the argument given in option A will be real.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = r\,\mathrm{cis}(\theta),\quad r>0" />,
    reason: (
      <>
        Write <Katex tex="z" /> in polar form, where <Katex tex="\theta=\arg(z)" />. Because <Katex tex="z\neq0" />, the
        modulus <Katex tex="r" /> is positive and <Katex tex="\arg(z)" /> exists.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}z^2 &= r^2\,\mathrm{cis}(2\theta)\\ &= r^2\cos(2\theta) + r^2\sin(2\theta)\,i\end{aligned}"
      />
    ),
    reason: (
      <>
        De Moivre&apos;s theorem: squaring squares the modulus and doubles the argument. Writing{' '}
        <Katex tex="\mathrm{cis}(2\theta)=\cos(2\theta)+i\sin(2\theta)" /> separates the real and imaginary parts.
      </>
    ),
  },
  {
    working: <Katex display tex="z^2\in R \iff r^2\sin(2\theta)=0 \iff \sin(2\theta)=0" />,
    reason: (
      <>
        A complex number is real exactly when its imaginary part is zero. Since <Katex tex="r>0" />,{' '}
        <Katex tex="r^2\neq0" />, so the sine must be zero.
      </>
    ),
  },
  {
    working: <Katex display tex="2\theta = k\pi \implies \theta = \frac{k\pi}{2},\quad k\in Z" />,
    reason: (
      <>
        <Katex tex="\sin" /> is zero at every integer multiple of <Katex tex="\pi" />; then divide by 2. In words:{' '}
        <Katex tex="z^2" /> is real when its argument <Katex tex="2\theta" /> points along the real axis.
      </>
    ),
  },
  {
    working: <Katex display tex="\theta\in\left\{-\tfrac{\pi}{2},\ 0,\ \tfrac{\pi}{2},\ \pi\right\}" />,
    reason: (
      <>
        The same values listed in <Katex tex="(-\pi,\pi]" /> (other values of <Katex tex="k" /> just add or subtract{' '}
        <Katex tex="2\pi" />, the same direction). So <Katex tex="z" /> can lie on <b>either</b> axis:{' '}
        <Katex tex="\theta=0,\pi" /> means <Katex tex="z" /> is real and <Katex tex="z^2=r^2>0" />;{' '}
        <Katex tex="\theta=\pm\tfrac{\pi}{2}" /> means <Katex tex="z" /> is purely imaginary and{' '}
        <Katex tex="z^2=-r^2<0" />. Both kinds give a real <Katex tex="z^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\arg(z) = \frac{k\pi}{2},\quad k\in Z}" />,
    reason: (
      <>
        Matches option <b>A</b>, the only option containing all four directions. The other options each give some of
        the values but not all: B (<Katex tex="k\pi" />) gives only <Katex tex="0" /> and <Katex tex="\pi" /> (real{' '}
        <Katex tex="z" />); C gives only <Katex tex="\pm\tfrac{\pi}{2}" /> (purely imaginary <Katex tex="z" />); D
        gives only <Katex tex="\tfrac{\pi}{2}" /> and E only <Katex tex="-\tfrac{\pi}{2}" />.
      </>
    ),
  },
]

export default function SpecialistQ6_2021() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="z\in C" />, <Katex tex="z\neq0" /> and <Katex tex="z^2\in R" />, then the possible
          values of <Katex tex="\arg(z)" /> are
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac{k\pi}{2}" />, <Katex tex="k\in Z" /></>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="k\pi" />, <Katex tex="k\in Z" /></> },
        { letter: 'C', content: <><Katex tex="\dfrac{(2k+1)\pi}{2}" />, <Katex tex="k\in Z" /></> },
        { letter: 'D', content: <><Katex tex="\dfrac{(4k+1)\pi}{2}" />, <Katex tex="k\in Z" /></> },
        { letter: 'E', content: <><Katex tex="\dfrac{(4k-1)\pi}{2}" />, <Katex tex="k\in Z" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Squaring doubles the argument, so z² is real when z is on either axis">
          <DoublingWidget />
        </Explore>
      }
    />
  )
}
