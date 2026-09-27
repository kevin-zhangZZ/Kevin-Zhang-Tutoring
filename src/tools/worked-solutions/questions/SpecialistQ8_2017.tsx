// 2017 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 29% correct —
// the most popular answer (D, 52%) was wrong. Where the gradient of x³ − mx² + 4 is strictly increasing. Question text
// transcribed from the original paper; solution is original. Answer B checked against the VCAA
// report and itute (both via f''(x) = 6x − 2m ≥ 0); the vertex-of-the-parabola check is the
// visual route one tutor's video walkthrough takes. Interactive diagram (§15,
// interactives/spec-2017-mcq8-gradient.tsx, this site's own explanatory figure): f with a
// draggable tangent above its gradient function f′, with a slider for m, the band x ≥ m/3 where
// f′ climbs, and a toggle shading where f′ ≥ 0 (option D's idea).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GradientWidget = lazyWidget(() => import('../interactives/spec-2017-mcq8-gradient'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 29, C: 7, D: 52, E: 7 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="f''(x)=6x-2m\ge0" /> when <Katex tex="x\ge\tfrac{m}{3}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the gradient of } f \text{ is } f'(x)" />,
    reason: (
      <>
        Read the question twice. It asks where the <em>gradient</em> is increasing, not where <Katex tex="f" /> is
        increasing. So the function that has to be increasing is <Katex tex="f'" />, and a function is increasing where{' '}
        <em>its</em> derivative is positive. The derivative of <Katex tex="f'" /> is <Katex tex="f''" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = 3x^2-2mx" />,
    reason: (
      <>
        Differentiating <Katex tex="f(x)=x^3-mx^2+4" /> term by term (<Katex tex="m" /> is a constant). This is the
        gradient function. Solving <Katex tex="f'(x)\ge0" /> now would answer a different question, where{' '}
        <Katex tex="f" /> is increasing; that is how the popular wrong answer D arises (see below).
      </>
    ),
  },
  {
    working: <Katex display tex="f''(x) = 6x-2m" />,
    reason: <>Differentiating again: <Katex tex="f''" /> is the rate at which the gradient is changing.</>,
  },
  {
    working: <Katex display tex="6x-2m\ge0 \implies x\ge\frac{m}{3}" />,
    reason: (
      <>
        The gradient increases where <Katex tex="f''\ge0" />. Dividing by <Katex tex="6" /> (positive, so the inequality
        keeps its direction): <Katex tex="\tfrac{2m}{6}=\tfrac{m}{3}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = 3\left(x-\frac{m}{3}\right)^2-\frac{m^2}{3}" />,
    reason: (
      <>
        A check by picture, without <Katex tex="f''" />: completing the square shows that <Katex tex="y=f'(x)" /> is an
        upward parabola with its vertex at <Katex tex="x=\tfrac{m}{3}" />, halfway between its zeros <Katex tex="0" /> and{' '}
        <Katex tex="\tfrac{2m}{3}" />. An upward parabola falls to the left of its vertex and rises to the right of it,
        whether <Katex tex="m" /> is positive or negative. So the gradient rises for <Katex tex="x\ge\tfrac{m}{3}" />. The
        diagram below plots this parabola under the graph of <Katex tex="f" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x\ge\frac{m}{3}}" />,
    reason: (
      <>
        Matches option <b>B</b>. The endpoint is included: <Katex tex="f''\left(\tfrac{m}{3}\right)=0" /> at that single
        point only, and <Katex tex="f'" /> still rises across the whole of <Katex tex="\left[\tfrac{m}{3},\infty\right)" />.
        One point of zero second derivative does not make a flat stretch. Option D (52%) is the right-hand piece of
        where <Katex tex="f'(x)\ge0" /> for <Katex tex="m>0" />, which is where <Katex tex="f" /> is increasing, not its
        gradient. Option C (7%) has the inequality the wrong way round: <Katex tex="x\le\tfrac{m}{3}" /> is where the
        gradient is decreasing.
      </>
    ),
  },
]

export default function SpecialistQ8_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f(x)=x^3-mx^2+4" />, where <Katex tex="m,x\in R" />.
          </p>
          <p>
            The <strong>gradient</strong> of <Katex tex="f" /> will always be strictly
            increasing for
          </p>
        </>
      }
      background={
        <Background title="Increasing Versus Gradient Increasing">
          <p>
            &ldquo;The function is increasing&rdquo; and &ldquo;the gradient is increasing&rdquo; are different statements
            about different derivatives. The first is <Katex tex="f'>0" /> and describes going uphill; the second is{' '}
            <Katex tex="f''>0" /> and describes the curve being concave up. More than half of all students chose option D,
            which is the right-hand piece of where <Katex tex="f" /> itself is increasing (for <Katex tex="m>0" />).
          </p>
          <p>
            A gradient can be negative and still increasing. If the slope of a hill path goes <Katex tex="-3" />, then{' '}
            <Katex tex="-2" />, then <Katex tex="-1" />, you are still walking downhill, but the path is getting less steep:
            the gradient is increasing.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="x\ge0" /> },
        { letter: 'B', content: <Katex tex="x\ge\dfrac{m}{3}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="x\le\dfrac{m}{3}" /> },
        { letter: 'D', content: <Katex tex="x\ge\dfrac{2m}{3}" /> },
        { letter: 'E', content: <Katex tex="x\le\dfrac{2m}{3}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The gradient can be increasing while f goes downhill: watch the tangent's slope, not the curve's height">
            <GradientWidget />
          </Explore>
          <WrongMethod
            title="The gradient is increasing where f′(x) ≥ 0"
            source="52% chose D"
            working={
              <>
                <Katex display tex="f'(x)=3x^2-2mx\ge0" />
                <Katex display tex="x(3x-2m)\ge0" />
                <Katex display tex="\implies x\le0 \ \text{ or } \ x\ge\tfrac{2m}{3} \quad (m>0)" />
              </>
            }
          >
            <p>
              Option D is the right-hand piece of this. But <Katex tex="f'(x)\ge0" /> says the gradient is{' '}
              <em>positive</em>, i.e. <Katex tex="f" /> is going uphill. It says nothing about whether the gradient is
              getting bigger. Test it with <Katex tex="m=3" />: at{' '}
              <Katex tex="x=1.5" /> the gradient is <Katex tex="f'(1.5)=-2.25" />, and a little further on it is{' '}
              <Katex tex="f'(1.75)=-1.3125" />. The gradient is going up, even though it is negative, yet{' '}
              <Katex tex="x=1.5" /> fails <Katex tex="x\ge\tfrac{2m}{3}=2" />.
            </p>
            <p>
              &ldquo;Increasing&rdquo; applies to whatever it describes. Here that is the gradient{' '}
              <Katex tex="f'" />, so differentiate <Katex tex="f'" /> and ask where <em>that</em> is positive.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
