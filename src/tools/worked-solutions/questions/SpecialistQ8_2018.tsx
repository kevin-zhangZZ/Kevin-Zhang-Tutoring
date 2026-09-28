// 2018 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 71% correct (no
// comment printed for this question). Rewriting a definite integral under the substitution
// u = tan(x). Question text transcribed from the original paper; VCAA printed no diagram and
// neither does the stem here (guide §7). Checked in sympy: the original integral and option E
// both equal √3/27 ≈ 0.0642; A = 2√3/45 ≈ 0.0770, D = π³/648 ≈ 0.0478. itute and the NBEASTK
// walkthrough agree (E). Distractors verified: A (14%) is tan²(x)sec²(x) rewritten in u,
// u²(1 + u²) = u⁴ + u², with dx simply renamed du; B keeps A's integrand with the terminals
// sec(0) = 1 and sec(π/6) = 2/√3; D (4%) leaves the x-terminal π/6. No clean slip found for C.
// Widget: spec-2018-mcq8-strips (six strips before and after u = tan(x), same areas; buttons
// swap in options A and D). WrongMethod: option A. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const StripsWidget = lazyWidget(() => import('../interactives/spec-2018-mcq8-strips'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 4, D: 4, E: 71 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \tan(x) \implies \frac{du}{dx} = \sec^2(x)" />,
    reason: (
      <>
        How do you know which substitution? Look for a function sitting next to its own derivative.{' '}
        <Katex tex="\sec^2(x)" /> is exactly <Katex tex="\tfrac{d}{dx}\tan(x)" />, so let{' '}
        <Katex tex="u=\tan(x)" /> and the <Katex tex="\sec^2(x)" /> will be used up by the{' '}
        <Katex tex="du" />. The options, all in <Katex tex="u" /> with terminals involving{' '}
        <Katex tex="\tfrac{1}{\sqrt3}=\tan\left(\tfrac{\pi}{6}\right)" />, confirm it.
      </>
    ),
  },
  {
    working: <Katex display tex="du = \sec^2(x)\,dx" />,
    reason: (
      <>
        This is the line that decides the question. A small step <Katex tex="dx" /> in <Katex tex="x" /> is
        a step <Katex tex="\sec^2(x)\,dx" /> in <Katex tex="u" />, so <Katex tex="dx" /> and{' '}
        <Katex tex="du" /> are <em>not</em> the same size and can&apos;t just be swapped.
      </>
    ),
  },
  {
    working: <Katex display tex="\tan^2(x)\,\underbrace{\sec^2(x)\,dx}_{du} = u^2\,du" />,
    reason: (
      <>
        The <Katex tex="\tan^2(x)" /> becomes <Katex tex="u^2" />, and the whole of{' '}
        <Katex tex="\sec^2(x)\,dx" /> becomes <Katex tex="du" />. Nothing is left over in <Katex tex="x" />,
        which is how you know the substitution worked.
      </>
    ),
  },
  {
    working: <Katex display tex="x=0 \implies u=\tan(0)=0" />,
    reason: (
      <>
        A definite integral in <Katex tex="u" /> needs <Katex tex="u" />-terminals, so put each{' '}
        <Katex tex="x" />-terminal through <Katex tex="u=\tan(x)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x=\frac{\pi}{6} \implies u=\tan\left(\frac{\pi}{6}\right)=\frac{1}{\sqrt3}" />,
    reason: (
      <>
        The exact value. Leaving the terminal as <Katex tex="\tfrac{\pi}{6}" /> gives option <b>D</b>, which
        mixes an <Katex tex="x" />-terminal with a <Katex tex="u" />-integrand.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\int_0^{1/\sqrt3} u^2\,du}" />,
    reason: (
      <>
        Matches option <b>E</b>. Option <b>A</b>, chosen by <Katex tex="14\%" />, rewrites the whole
        integrand in <Katex tex="u" /> (<Katex tex="\tan^2(x)\sec^2(x)=u^2(1+u^2)=u^4+u^2" />) and then just
        renames <Katex tex="dx" /> as <Katex tex="du" />. Option <b>B</b> has the same integrand with the
        terminals <Katex tex="\sec(0)=1" /> and <Katex tex="\sec\left(\tfrac{\pi}{6}\right)=\tfrac{2}{\sqrt3}" />,
        the values of the wrong function. A quick check in Exam 2: the original integral and option E both
        come to <Katex tex="\tfrac{\sqrt3}{27}\approx0.0642" />.
      </>
    ),
  },
]

export default function SpecialistQ8_2018() {
  return (
    <MCQShell
      question={
        <p>
          Using a suitable substitution,{' '}
          <Katex tex="\displaystyle\int_0^{\pi/6}\tan^2(x)\sec^2(x)\,dx" /> can be expressed
          as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3}\left(u^4+u^2\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_1^{2/\sqrt3}\left(u^4+u^2\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3} u\,du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\pi/6} u^2\,du" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3} u^2\,du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Three things change, not one">
          <p>
            A substitution in a <em>definite</em> integral changes the integrand, the{' '}
            <Katex tex="dx" /> and the terminals. Each of the wrong options gets at least one of those
            three wrong, so check all three before choosing.
          </p>
          <p>
            Why must <Katex tex="dx" /> change? The integral is an area made of thin strips. Moving to{' '}
            <Katex tex="u=\tan(x)" /> stretches every strip sideways by the factor{' '}
            <Katex tex="\tfrac{du}{dx}=\sec^2(x)" />. To keep each strip&apos;s area the same, its height has
            to shrink by that same factor, from <Katex tex="\tan^2(x)\sec^2(x)" /> to{' '}
            <Katex tex="\tan^2(x)=u^2" />. That is what <Katex tex="\sec^2(x)\,dx=du" /> does.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Same strips, reshaped: why sec²(x) dx becomes du">
            <StripsWidget />
          </Explore>
          <WrongMethod
            title="Write everything in terms of u, then change dx to du"
            source="14% chose A"
            working={
              <>
                <div>
                  <Katex tex="\tan^2(x)\sec^2(x)=u^2\left(1+u^2\right)=u^4+u^2" />
                </div>
                <div>
                  <Katex tex="\Rightarrow\ \int_0^{1/\sqrt3}\left(u^4+u^2\right)du" />
                </div>
              </>
            }
          >
            <Katex tex="dx" /> and <Katex tex="du" /> are different sizes:{' '}
            <Katex tex="dx=\dfrac{du}{\sec^2(x)}=\dfrac{du}{1+u^2}" />. Put that in and the{' '}
            <Katex tex="1+u^2" /> cancels, leaving <Katex tex="u^2\,du" />. Option A keeps the{' '}
            <Katex tex="\sec^2(x)" /> in the integrand <em>and</em> ignores what it does to the width, so
            its value is <Katex tex="\tfrac{2\sqrt3}{45}\approx0.077" /> instead of{' '}
            <Katex tex="0.064" />. To catch it, never write <Katex tex="du" /> until you have replaced{' '}
            <Katex tex="dx" /> using <Katex tex="\tfrac{du}{dx}" />. In Exam 2 you can also compare each
            option with the original integral:
            <div className="mt-1">
              <Cas fn="nInt">nInt((tan(x))^2·(1/cos(x))^2, x, 0, π/6)</Cas>
            </div>
          </WrongMethod>
        </>
      }
    />
  )
}
