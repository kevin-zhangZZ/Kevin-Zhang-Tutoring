// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 3. VCAA examination report: 20% correct — the
// hardest MCQ on this paper. Identify the rule of a quartic from its graph: simple roots at b, d
// and a repeated (touching) root at c. Question text transcribed from the original paper; the
// diagram is cropped from the original VCAA exam PDF. Solution is original. Interactive
// (interactives/meth-2015-mcq3-roots.tsx): slide b < 0 and draw each option's rule, to see that
// (x + b) puts the root at −b, the trap behind option A (61%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import quarticSrc from './meth-2015-mcq3-quartic.png'

const RootsWidget = lazyWidget(() => import('../interactives/meth-2015-mcq3-roots'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 61, B: 14, C: 20, D: 2, E: 4 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      The rule for the graph is in the form <Katex tex="f(x)=a(x-b)(x-c)^2(x-d)" />, where <Katex tex="a" />{' '}
      is negative and could be <Katex tex="-2" />: <Katex tex="f(x)=-2(x-b)(x-c)^2(x-d)" />. <Katex tex="b" />{' '}
      is negative; for example if <Katex tex="b=-2" />, the factor is <Katex tex="(x-(-2))=(x+2)" />. Most
      students chose option A, <Katex tex="y=-2(x+b)(x-c)^2(x-d)" />, but the factor <Katex tex="(x+b)" /> is
      incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = k(x-b)(x-c)^2(x-d)" />,
    reason: (
      <>
        Each <Katex tex="x" />-intercept gives a factor. The curve crosses the axis at <Katex tex="b" /> and{' '}
        <Katex tex="d" /> but only touches it at <Katex tex="c" />, so <Katex tex="c" /> is a repeated root:{' '}
        <Katex tex="(x-c)^2" />.
      </>
    ),
    more: (
      <>
        A squared factor never changes sign, so the curve comes down to the axis at <Katex tex="c" /> and turns back
        without crossing; a single factor changes sign, so the curve crosses. That gives degree{' '}
        <Katex tex="1+2+1=4" />, a quartic.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x\to\pm\infty \implies y\to-\infty" />
        <Katex display tex="\implies\; k<0, \text{ e.g. } k=-2" />
      </>
    ),
    reason: (
      <>
        Both ends point down, so for a quartic the leading coefficient is negative. The graph has no scale, so take{' '}
        <Katex tex="-2" />, as the options do.
      </>
    ),
    more: (
      <>
        Expanded, the leading term is <Katex tex="kx^4" />, and <Katex tex="x^4" /> is large and positive far out on either
        side, so there <Katex tex="y" /> has the sign of <Katex tex="k" />. Any negative <Katex tex="k" /> would fit the
        graph; the question asks what the rule <em>could</em> be.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{root at } x=b \\ &\iff \text{factor } (x-b) \end{aligned}" />,
    reason: (
      <>
        A root at <Katex tex="x=b" /> needs a factor that is zero there: <Katex tex="(x-b)" />, even though{' '}
        <Katex tex="b" /> is negative. Check with <Katex tex="b=-2" />: <Katex tex="(x-b)=(x+2)" /> is zero at{' '}
        <Katex tex="-2" />.
      </>
    ),
    more: (
      <>
        This is where 61% of students went wrong, choosing option A. With <Katex tex="b=-2" />,{' '}
        <Katex tex="(x+b)=(x-2)" /> is zero at <Katex tex="x=+2" />, the mirror image of <Katex tex="b" /> on the wrong
        side of the origin. The minus sign in <Katex tex="(x-b)" /> is part of the rule; the sign of the number{' '}
        <Katex tex="b" /> takes care of itself. The interactive below lets you slide <Katex tex="b" /> and draw each
        option.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y=-2(x-b)(x-c)^2(x-d)}" />,
    reason: (
      <>
        Matches option <b>C</b>: negative leading coefficient, with factors <Katex tex="(x-b)" />,{' '}
        <Katex tex="(x-c)^2" /> and <Katex tex="(x-d)" />.
      </>
    ),
    more: (
      <>
        A (61%) has the right shape and sign but <Katex tex="(x+b)" /> puts that root at <Katex tex="-b" />, a positive
        number. B (14%) has the same wrong factor and a positive coefficient, so both ends go up. D (2%) has a single{' '}
        <Katex tex="(x-c)" />, so it is a cubic that crosses at <Katex tex="c" /> instead of touching, with ends going
        opposite ways. E (4%) makes A&apos;s slip with <Katex tex="c" /> and <Katex tex="d" />: it puts the touching point
        at <Katex tex="-c" /> and a root at <Katex tex="-d" />, both negative numbers.
      </>
    ),
  },
]

export default function MethodsQ3_2015() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-3">
            <img loading="lazy" decoding="async" src={quarticSrc} alt="Quartic graph with simple roots at b and d and a repeated (touching) root at c, from the original 2015 VCAA exam paper" className="w-full max-w-[340px]" />
          </div>
          <p>The rule for a function with the graph above could be</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'B', content: <Katex tex="y=2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'C', content: <Katex tex="y=-2(x-b)(x-c)^2(x-d)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=2(x-b)(x-c)(x-d)" /> },
        { letter: 'E', content: <Katex tex="y=-2(x-b)(x+c)^2(x+d)" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Where does (x + b) put its root when b is negative? Slide b and draw each option">
          <RootsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
