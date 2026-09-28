// 2017 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 32% correct (29% chose D).
// Find the condition on p for a quadratic (in disguise) to have no real roots.
// Question text transcribed from the original paper; solution is original. Answer B agrees with
// the report and itute.
// Interactive: meth-2017-mcq7-discriminant (slide p: the parabola (p − 1)x² + 4x + (p − 5) lifts
// off the x-axis exactly when Δ < 0; below it, Δ ÷ 4 and p² − 6p + 1 are mirror images in the
// p-axis, which is the inequality flip; a toggle shades option D's region, where it crosses twice).
// WrongMethod: option D (dividing by −4 without reversing the inequality) — verified to give D.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const DiscriminantWidget = lazyWidget(() => import('../interactives/meth-2017-mcq7-discriminant'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 32, C: 12, D: 29, E: 7 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="(p-1)x^2+4x=5-p" />
      <br />
      <Katex tex="(p-1)x^2+4x-5+p=0" />
      <br />
      The discriminant is negative for no real solutions.
      <br />
      <Katex tex="16-4(p-1)(p-5)<0" />
      <br />
      <Katex tex="-4p^2+24p-4<0" />
      <br />
      Divide by <Katex tex="-4" /> and change the inequality.
      <br />
      <Katex tex="p^2-6p+1>0" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="(p-1)x^2+4x=5-p" />
        <Katex display tex="\implies\; (p-1)x^2+4x+(p-5)=0" />
      </>
    ),
    reason: (
      <>
        The discriminant test only works on <Katex tex="ax^2+bx+c=0" />, so first get everything on one side. Moving{' '}
        <Katex tex="5-p" /> across makes it <Katex tex="-(5-p)=p-5" />.
      </>
    ),
  },
  {
    working: <Katex display tex="a=p-1, \quad b=4, \quad c=p-5" />,
    reason: (
      <>
        For any one value of <Katex tex="p" /> this is an ordinary quadratic in <Katex tex="x" />; <Katex tex="p" /> just
        sits inside the coefficients. So treat <Katex tex="p" /> as a number and read off <Katex tex="a" />,{' '}
        <Katex tex="b" /> and <Katex tex="c" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \Delta &= b^2-4ac \\ &= 16-4(p-1)(p-5) \end{aligned}" />,
    reason: (
      <>
        The roots are where the parabola meets the <Katex tex="x" />-axis. <Katex tex="\Delta" /> is the part under the
        square root in the quadratic formula: if it is negative there is no real square root, so no{' '}
        <Katex tex="x" />-intercepts. &ldquo;No real roots&rdquo; therefore means <Katex tex="\Delta<0" />. (It also needs{' '}
        <Katex tex="a\ne0" />, i.e. <Katex tex="p\ne1" />; at <Katex tex="p=1" /> the equation is linear with a root, and{' '}
        <Katex tex="p=1" /> fails the final inequality anyway.)
      </>
    ),
  },
  {
    working: <Katex display tex="(p-1)(p-5) = p^2-6p+5" />,
    reason: <>Expand the product first; then the <Katex tex="-4" /> multiplies all three terms.</>,
  },
  {
    working: (
      <>
        <Katex display tex="16-4(p^2-6p+5) < 0" />
        <Katex display tex="\implies\; 16-4p^2+24p-20<0" />
        <Katex display tex="\implies\; -4p^2+24p-4<0" />
      </>
    ),
    reason: (
      <>
        Every option has <Katex tex="p^2" /> with coefficient <Katex tex="1" />, which tells you the last step is to
        divide by <Katex tex="-4" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{p^2-6p+1>0}" />,
    reason: (
      <>
        Matches option <b>B</b>. Dividing both sides by a negative number reverses the inequality (<Katex tex="2<3" />, but{' '}
        <Katex tex="-2>-3" />). Option D (29%) is the same inequality without the flip. Check with <Katex tex="p=7" />:{' '}
        <Katex tex="6x^2+4x+2=0" /> has <Katex tex="\Delta=16-48<0" />, and <Katex tex="49-42+1=8>0" />.
      </>
    ),
  },
]

export default function MethodsQ7_2017() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="(p-1)x^2+4x=5-p" /> has no real roots when
        </p>
      }
      background={
        <Background title="The discriminant, and inequalities with negatives">
          <p>
            For <Katex tex="ax^2+bx+c=0" />, the quadratic formula has <Katex tex="\Delta=b^2-4ac" /> under the square
            root. <Katex tex="\Delta>0" />: two real roots (the parabola crosses the <Katex tex="x" />-axis twice).{' '}
            <Katex tex="\Delta=0" />: one root (it touches). <Katex tex="\Delta<0" />: no real roots (it misses the axis).
          </p>
          <p>
            Multiplying or dividing both sides of an inequality by a negative number reverses the sign, because it swaps
            which side is bigger.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="p^2-6p+6<0" /> },
        { letter: 'B', content: <Katex tex="p^2-6p+1>0" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="p^2-6p-6<0" /> },
        { letter: 'D', content: <Katex tex="p^2-6p+1<0" /> },
        { letter: 'E', content: <Katex tex="p^2-6p+6>0" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Slide p: the parabola lifts off the axis exactly when Δ < 0">
            <DiscriminantWidget />
          </Explore>
          <WrongMethod
            title="Divide by −4 and keep the < sign"
            source="29% chose D"
            working={
              <>
                <Katex display tex="-4p^2+24p-4<0" />
                <Katex display tex="\implies p^2-6p+1<0" />
              </>
            }
          >
            <p>
              <Katex tex="p^2-6p+1<0" /> holds for <Katex tex="3-2\sqrt2<p<3+2\sqrt2" />, which is exactly where{' '}
              <Katex tex="\Delta>0" />: the values of <Katex tex="p" /> that give <em>two</em> roots, the opposite of what
              was asked. To catch it, test one value. At <Katex tex="p=3" />, option D says{' '}
              <Katex tex="9-18+1=-8<0" />, so &ldquo;no roots&rdquo;; but the equation becomes{' '}
              <Katex tex="2x^2+4x-2=0" />, with roots <Katex tex="x=-1\pm\sqrt2" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
