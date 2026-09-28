// 2019 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 70% correct. Setting
// up the arc-length integral for a curve given parametrically. Question text transcribed from
// the original paper (no diagram). Note this is arc length from *parametric* equations, which
// is still on the current study design — only arc length from a cartesian rule y = f(x) was
// removed. Solution is original. Interactive (extras): spec-2019-mcq7-chords — the half-ellipse
// cut into n chords, each the hypotenuse √(Δx² + Δy²), whose total climbs to L ≈ 11.05; a toggle
// shows option A's integrand going negative. WrongMethod: option A's (−4sin t)² = −16sin²t slip
// (19% chose A). The report has no comment on this question beyond the statistics.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ChordsWidget = lazyWidget(() => import('../interactives/spec-2019-mcq7-chords'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 70, C: 5, D: 2, E: 5 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\dfrac{dx}{dt}\right)^2+\left(\dfrac{dy}{dt}\right)^2}\ dt" />,
    reason: <>&ldquo;Length of the curve&rdquo; with <Katex tex="x" /> and <Katex tex="y" /> both given in terms of <Katex tex="t" /> is the parametric arc-length formula from the formula sheet, with <Katex tex="t" /> running from <Katex tex="0" /> to <Katex tex="\pi" />. Both derivatives are <em>squared</em> and then <em>added</em>, because each tiny piece of curve is a hypotenuse (see Background). That already rules out option <b>D</b>, which has no squares or root at all.</>,
  },
  {
    working: <Katex display tex="\dfrac{dx}{dt} = 3\cos(t), \qquad \dfrac{dy}{dt} = -4\sin(t)" />,
    reason: <>Differentiating each parametric equation with respect to <Katex tex="t" />. The derivative of <Katex tex="\cos(t)" /> is <Katex tex="-\sin(t)" />, so <Katex tex="\tfrac{dy}{dt}" /> is negative: the curve is heading down.</>,
  },
  {
    working: <Katex display tex="\left(\dfrac{dx}{dt}\right)^2+\left(\dfrac{dy}{dt}\right)^2 = 9\cos^2(t)+16\sin^2(t)" />,
    reason: <>Square the whole derivative, sign included: <Katex tex="(-4\sin(t))^2 = (-4)^2\sin^2(t) = 16\sin^2(t)" />. A leg pointing downwards still has a positive length. Keeping the minus here is exactly the slip behind option <b>A</b>.</>,
  },
  {
    working: <Katex display tex="= 9\left(1-\sin^2(t)\right)+16\sin^2(t)" />,
    reason: <>No option shows <Katex tex="9\cos^2(t)+16\sin^2(t)" /> as it stands, and options B and C use only <Katex tex="\sin^2(t)" />, so aim for that form: replace <Katex tex="\cos^2(t)" /> with <Katex tex="1-\sin^2(t)" />.</>,
  },
  {
    working: <Katex display tex="= 9-9\sin^2(t)+16\sin^2(t) = 9+7\sin^2(t)" />,
    reason: <>Collecting the <Katex tex="\sin^2(t)" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_0^{\pi}\sqrt{9+7\sin^2(t)}\ dt}" />,
    reason: <>Matches option <b>B</b>. Option <b>A</b> subtracts inside the root, which goes negative for most of the interval (at <Katex tex="t=\tfrac{\pi}{2}" /> it is <Katex tex="\sqrt{-16}" />). Option <b>E</b> writes <Katex tex="(3\cos(t))^2" /> as <Katex tex="3\cos^2(t)" />, forgetting to square the coefficients. Option <b>D</b> adds the derivatives without squaring and evaluates to <Katex tex="-8" />, a negative &ldquo;length&rdquo;. Option <b>C</b> is <Katex tex="\sqrt{1+\left(\tfrac{dy}{dt}\right)^2}" />, the cartesian formula <Katex tex="\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}" /> with the wrong derivative in it.</>,
  },
]

export default function SpecialistQ7_2019() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve defined by the parametric equations <Katex tex="x=3\sin(t)" />{' '}
          and <Katex tex="y=4\cos(t)" /> for <Katex tex="0\le t\le\pi" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{9\cos^2(t)-16\sin^2(t)}\,dt" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{9+7\sin^2(t)}\,dt" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{1+16\sin^2(t)}\,dt" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\pi}\bigl(3\cos(t)-4\sin(t)\bigr)\,dt" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{\pi}\sqrt{3\cos^2(t)+4\sin^2(t)}\,dt" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Where the Arc-Length Formula Comes From">
          <p>
            Cut the curve into tiny pieces. Over a small step <Katex tex="\Delta t" />, the point moves across by{' '}
            <Katex tex="\Delta x" /> and up (or down) by <Katex tex="\Delta y" />, and the piece is very nearly the
            hypotenuse of a right triangle with those legs: <Katex tex="\sqrt{\Delta x^2+\Delta y^2}" />. Writing{' '}
            <Katex tex="\Delta x \approx \tfrac{dx}{dt}\Delta t" /> and <Katex tex="\Delta y \approx \tfrac{dy}{dt}\Delta t" />{' '}
            makes each piece <Katex tex="\sqrt{\left(\tfrac{dx}{dt}\right)^2+\left(\tfrac{dy}{dt}\right)^2}\,\Delta t" />, and
            adding the pieces as <Katex tex="\Delta t \to 0" /> is the integral. Pythagoras adds squares, so the direction
            of each leg never matters.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Arc length is a sum of tiny hypotenuses">
            <ChordsWidget />
          </Explore>
          <WrongMethod
            title={<>&ldquo;<Katex tex="(-4\sin(t))^2" /> is <Katex tex="-16\sin^2(t)" />&rdquo;</>}
            source="19% chose A"
            working={
              <>
                <Katex display tex="\sqrt{(3\cos(t))^2+(-4\sin(t))^2}" />
                <Katex display tex="\to \sqrt{9\cos^2(t)-16\sin^2(t)}" />
              </>
            }
          >
            The minus sign belongs inside the bracket that is squared, so it is squared too:{' '}
            <Katex tex="(-4)^2 = +16" />. You can catch the slip without redoing the algebra: at{' '}
            <Katex tex="t = \tfrac{\pi}{2}" /> option A&apos;s integrand is <Katex tex="\sqrt{0-16}" />, which does not
            exist. In fact <Katex tex="9\cos^2(t)-16\sin^2(t)" /> is negative for every <Katex tex="t" /> between
            about <Katex tex="0.64" /> and <Katex tex="2.50" />, most of the curve. The quantity under an arc-length root
            is a sum of squares, so it can never be negative.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
