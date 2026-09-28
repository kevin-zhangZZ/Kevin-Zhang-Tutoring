// 2020 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 70% correct. The
// y-intercept of a rational function is also a stationary point. Question text transcribed
// from the original paper. Solution is original.
// Answer D checked with sympy (f′(0) = (5a − 6)/4; at a = 6/5 the stationary points are x = 0
// and x = 4, and f″(0) = −1, so (0, 9/5) is a local maximum), against the VCAA report (no comment
// printed for this question) and itute (D, by the quotient rule on the unexpanded numerator).
// Options checked: a = 0 (C) is what f(0) = 0 gives; a = 2 (E) cancels the factor x − 2, leaving
// y = x + 3 with no stationary point; a = −6/5 (B) gives f′(0) = −3.
// Interactive diagram (§15): interactives/spec-2020-mcq1-flat.tsx — slide a and watch the tangent
// at the y-intercept, flat only at a = 6/5, while the graph's turning point slides onto the y-axis;
// buttons jump to each option. This site's own explanatory figure; VCAA printed no diagram.
// WrongMethod box for option C (6%): f(0) = 0 gives a = 0, the intercept on the x-axis, not a
// stationary point (checked: f(0) = 3a/2, and at a = 0, f′(0) = −3/2). No box for E (11%): the
// report gives no reason for it and no slip we tried produces a = 2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const FlatWidget = lazyWidget(() => import('../interactives/spec-2020-mcq1-flat'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 8, C: 6, D: 70, E: 11 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="y\text{-intercept: } x=0" />
        <Katex display tex="\text{stationary point: } f'(x)=0" />
        <Katex display tex="\implies f'(0)=0" />
      </>
    ),
    reason: <>Translate each phrase into maths before doing anything. The <Katex tex="y" />-intercept is the point where <Katex tex="x=0" />; a stationary point is where the gradient <Katex tex="f'(x)" /> is zero. Both at once means the gradient <em>at <Katex tex="x=0" /></em> is zero. (It is not <Katex tex="f(0)=0" />: that would put the <Katex tex="y" />-intercept on the <Katex tex="x" />-axis, which says nothing about the gradient.)</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{(x-a)(x+3)}{x-2} = \frac{x^2+(3-a)x-3a}{x-2}" />,
    reason: <>Expanding the numerator first makes the quotient rule far less messy than differentiating the factorised form.</>,
  },
  {
    working: (
      <>
        <Katex display tex="u = x^2+(3-a)x-3a, \quad u' = 2x+3-a" />
        <Katex display tex="v = x-2, \quad v' = 1" />
        <Katex display tex="f'(x) = \frac{u'v-uv'}{v^2}" />
      </>
    ),
    reason: <><Katex tex="f" /> is one function of <Katex tex="x" /> divided by another, so use the quotient rule with <Katex tex="u" /> the numerator and <Katex tex="v" /> the denominator. The <Katex tex="a" /> is just a constant here.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(0) = \frac{(3-a)(-2)-(-3a)(1)}{(-2)^2}" />
        <Katex display tex="= \frac{-6+2a+3a}{4}" />
      </>
    ),
    reason: <>Only <Katex tex="x=0" /> is needed, so substitute straight away rather than simplifying the general expression: at <Katex tex="x=0" />, <Katex tex="u'=3-a" />, <Katex tex="v=-2" />, <Katex tex="u=-3a" /> and <Katex tex="v'=1" />. Watch the signs: <Katex tex="(3-a)(-2)=-6+2a" />, and subtracting <Katex tex="-3a" /> adds <Katex tex="3a" />.</>,
  },
  {
    working: <Katex display tex="\frac{5a-6}{4} = 0" />,
    reason: <>The condition from the first line: the gradient at the <Katex tex="y" />-intercept is zero. On CAS the whole question is one line once <Katex tex="f" /> is stored with <Cas fn="define">Define f(x) = (x-a)(x+3)/(x-2)</Cas>: <Cas fn="solve">solve(d/dx(f(x)) = 0, a) | x = 0</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac65}" />,
    reason: <>Matches option <b>D</b>. Check: with <Katex tex="a=\tfrac65" /> the <Katex tex="y" />-intercept is <Katex tex="f(0)=\tfrac{(-6/5)(3)}{-2}=\tfrac95" />, safely away from the asymptote at <Katex tex="x=2" />, and it is a local maximum (the tangent there is flat in the diagram below). Option <b>C</b>, <Katex tex="a=0" />, is what <Katex tex="f(0)=0" /> gives: the graph then passes through the origin, but with gradient <Katex tex="f'(0)=-\tfrac32" />. Option <b>E</b>, <Katex tex="a=2" />, cancels the factor <Katex tex="x-2" /> and leaves the straight line <Katex tex="y=x+3" />, which has no stationary point at all. Option <b>B</b> gives <Katex tex="f'(0)=-3" />.</>,
  },
]

export default function SpecialistQ1_2020() {
  return (
    <MCQShell
      question={
        <p>
          The <Katex tex="y" />-intercept of the graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f(x)=\dfrac{(x-a)(x+3)}{x-2}" />, is also a stationary point when{' '}
          <Katex tex="a" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-\tfrac65" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="\tfrac65" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Slide a until the tangent at the y-intercept goes flat: f′(0) = 0, not f(0) = 0">
            <FlatWidget />
          </Explore>
          <WrongMethod
            title="Stationary means the graph is at zero, so set f(0) = 0"
            source="6% chose C"
            working={
              <>
                <Katex display tex="f(0)=\frac{(-a)(3)}{-2}=\frac{3a}{2}=0" />
                <Katex display tex="\implies a=0 \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              That makes the <Katex tex="y" />-intercept sit on the <Katex tex="x" />-axis: the graph passes through the
              origin. But &ldquo;stationary&rdquo; is about the <em>gradient</em>, not the height. With{' '}
              <Katex tex="a=0" />, <Katex tex="f'(0)=\tfrac{5(0)-6}{4}=-\tfrac32" />, so the graph cuts through the origin
              sloping downwards; it doesn&apos;t level out there.
            </p>
            <p>
              Next time, translate the words one at a time: <em>stationary point</em> means <Katex tex="f'(x)=0" />,{' '}
              <em><Katex tex="x" />-intercept</em> means <Katex tex="f(x)=0" />. Only the first is asked for, and it is
              asked for at <Katex tex="x=0" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
