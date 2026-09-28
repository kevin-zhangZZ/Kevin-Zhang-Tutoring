// 2018 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 49% correct.
// Set up the defining equation for the median of a given probability density function.
// Question text transcribed from the original paper; solution is original. Checked with sympy:
// E's root in [0, 2] is m = √(8 − 2√10) ≈ 1.294 with area exactly 1/2; A ⇔ area 1/8, B has no real
// root, C ⇔ area 0, D ⇔ area 23.5/48 ≈ 0.490. itute agrees (E).
// Widget (in extras): interactives/meth-2018-mcq15-median — each option jumps m to its root and
// shades the area it really asks for, using m⁴ − 16m² + 24 = 24 − 48 × (area up to m).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MedianWidget = lazyWidget(() => import('../interactives/meth-2018-mcq15-median'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 9, C: 12, D: 19, E: 49 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\displaystyle\int_0^m f(x)\,dx=\frac12" />
      <br />
      <Katex tex="-\dfrac{m^4}{48}+\dfrac{m^2}{3}-\dfrac12=0" />
      <br />
      <Katex tex="m^4-16m^2+24=0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^m f(x)\,dx = \frac12" />,
    reason: <>The median <Katex tex="m" /> is the value with half the probability below it: <Katex tex="\Pr(X\le m)=\tfrac12" />. For a continuous random variable probability is area under the pdf, so the area from the start of the domain up to <Katex tex="m" /> must be <Katex tex="\tfrac12" />. Start the integral at <Katex tex="0" />, because <Katex tex="f" /> is zero to the left of <Katex tex="0" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^m \frac{1}{12}\bigl(8x-x^3\bigr)dx = \frac{1}{12}\left[4x^2-\frac{x^4}{4}\right]_0^m" />
        <Katex display tex="= \frac{1}{12}\left(4m^2-\frac{m^4}{4}\right)" />
      </>
    ),
    reason: <>Antidifferentiate term by term (<Katex tex="8x\to4x^2" />, <Katex tex="x^3\to\tfrac{x^4}{4}" />) and substitute the terminals. The lower terminal <Katex tex="0" /> contributes nothing, one reason starting the area at <Katex tex="0" /> is convenient.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{1}{12}\left(4m^2-\frac{m^4}{4}\right) = \frac12" />
        <Katex display tex="\implies\; 4m^2-\frac{m^4}{4} = 6" />
      </>
    ),
    reason: <>Look at the options before going further: they are equations with whole-number coefficients, not values of <Katex tex="m" />. So the job is to clear every fraction and rearrange until one of them appears. First multiply both sides by <Katex tex="12" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="16m^2-m^4 = 24" />
        <Katex display tex="\implies\; m^4-16m^2+24=0" />
      </>
    ),
    reason: <>Multiply by <Katex tex="4" />, <em>both</em> sides, then move everything to one side so the <Katex tex="m^4" /> coefficient is <Katex tex="+1" />, as in options C to E. The <Katex tex="\tfrac12" /> from the first line has now become the <Katex tex="24" /> (<Katex tex="\tfrac12\times48" />), so the right-hand side is <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m^4-16m^2+24=0}" />,
    reason: <>Matches option <b>E</b>. Option <b>D</b>, chosen by <Katex tex="19\%" />, uses the <Katex tex="\tfrac12" /> twice: it is already inside the <Katex tex="24" />, so the right-hand side must be <Katex tex="0" />. Option <b>A</b> is the <Katex tex="4m^2-\tfrac{m^4}{4}=6" /> line with only the left side multiplied by <Katex tex="4" />. Option <b>C</b> sets the integral equal to <Katex tex="0" /> instead of <Katex tex="\tfrac12" />.</>,
  },
]

export default function MethodsQ15_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A probability density function, <Katex tex="f" />, is given by
          </p>
          <Katex display tex="f(x) = \begin{cases} \tfrac{1}{12}(8x-x^3) & 0\le x\le2 \\ 0 & \text{elsewhere} \end{cases}" className="my-2" />
          <p>The median, <Katex tex="m" />, of this function satisfies the equation</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="-m^4+16m^2-6=0" /> },
        { letter: 'B', content: <Katex tex="-m^4+4m^2-6=0" /> },
        { letter: 'C', content: <Katex tex="m^4-16m^2=0" /> },
        { letter: 'D', content: <Katex tex="m^4-16m^2+24=0.5" /> },
        { letter: 'E', content: <Katex tex="m^4-16m^2+24=0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="The median of a pdf, and why CAS alone doesn't finish this">
          <p>
            For a continuous random variable, <Katex tex="\Pr(X\le m)" /> is the area under the pdf to the
            left of <Katex tex="m" />, so the median is where that area reaches <Katex tex="\tfrac12" />:{' '}
            <Katex tex="\int_a^m f(x)\,dx=\tfrac12" />, with <Katex tex="a" /> the left end of the domain.
          </p>
          <p>
            Here the options are equations, so the task is algebra: build the equation and rearrange it into
            one of theirs. A CAS can still check your choice. <Cas fn="solve" /> the integral equation for{' '}
            <Katex tex="m" /> with <Katex tex="0\le m\le2" /> gives <Katex tex="m\approx1.294" />, and only
            option E is true at that value.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Every option is really “the area up to m equals something”">
            <MedianWidget />
          </Explore>
          <WrongMethod
            title="The median means 0.5, so the equation should equal 0.5"
            source="19% chose D"
            working={
              <>
                <Katex display tex="m^4-16m^2+24=24-48\int_0^m f(x)\,dx" />
                <Katex display tex="=0.5 \implies \int_0^m f(x)\,dx=\tfrac{23.5}{48}\approx0.49" />
              </>
            }
          >
            The <Katex tex="\tfrac12" /> belongs in the <em>first</em> equation, area <Katex tex="=\tfrac12" />.
            Clearing fractions multiplied it by <Katex tex="48" />, and it became the <Katex tex="24" />. Writing{' '}
            <Katex tex="0.5" /> on the right as well uses it twice, and the equation then asks for an area of
            about <Katex tex="0.49" />, just short of half. To catch it, trace where each number in your final
            line came from: once a constant from the right-hand side has been moved across, the right-hand side
            is <Katex tex="0" />.
          </WrongMethod>
          <WrongMethod
            title="Clear the fraction by multiplying the left side by 4"
            source="11% chose A"
            working={
              <>
                <Katex display tex="4m^2-\tfrac{m^4}{4}=6" />
                <Katex display tex="\to\ 16m^2-m^4=6 \implies -m^4+16m^2-6=0" />
              </>
            }
          >
            Multiplying only one side changes the equation. This one says the area up to <Katex tex="m" /> is{' '}
            <Katex tex="\tfrac{6}{48}=\tfrac18" />, only a quarter of the half that the median needs.
            Whatever you do to one side, do to the other: <Katex tex="16m^2-m^4=24" />.
          </WrongMethod>
        </>
      }
    />
  )
}
