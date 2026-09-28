// 2020 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 70% correct.
// A double chain rule through an unknown inner function. Question text transcribed from the original paper; solution is original.
// Answer C agrees with sympy (d/dx e^{g(x²)} = 2x g′(x²) e^{g(x²)}), the VCAA report (no comment
// printed for this question) and itute (C). Distractors are named only by what they change in the
// correct form; the two WrongMethod boxes were checked numerically with g(u) = sin u at x = 1
// (curve's gradient 2.507; D gives −1.931, B gives 3.904).
// Interactive diagram (§15): interactives/meth-2020e2-mcq7-test-g.tsx tests all five options on a
// real g (sin u, or log_e(1 + u), which turns f into 1 + x²): only option C's line is the tangent
// to the curve at every x, and the Notice explains why each other option misses. This site's own
// explanatory figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TestGWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq7-test-g'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 10, C: 70, D: 11, E: 4 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = e^{g(x^2)}" />,
    reason: <>CAS can&apos;t do this one for you: <Katex tex="g" /> is an unknown function, so a calculator either treats it as a constant or leaves the derivative unevaluated. Name the layers from the inside out instead: <Katex tex="x^2" /> is fed into <Katex tex="g" />, and <Katex tex="g(x^2)" /> is fed into the exponential. The chain rule peels them off one at a time, outermost first.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}e^{u} = e^{u}\cdot\frac{du}{dx}, \quad u = g\!\left(x^2\right)" />,
    reason: <>Cover up everything in the power and call it <Katex tex="u" />. The derivative of <Katex tex="e^u" /> is <Katex tex="e^u" /> itself, so the exponential comes back <em>unchanged</em>, power and all (option E changes the power), times the derivative of the covered-up part.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}g\!\left(x^2\right) = g'\!\left(x^2\right)\times2x" />,
    reason: <>Now the covered-up part, which is <Katex tex="g" /> of something. Its derivative is <Katex tex="g'" /> of the <em>same</em> something, <Katex tex="x^2" />, because that is the input <Katex tex="g" /> actually receives, times the derivative of that something, <Katex tex="2x" />. The <Katex tex="2x" /> is its own factor: it never goes inside <Katex tex="g'" /> (that is option D).</>,
  },
  {
    working: <Katex display tex="f'(x) = e^{g\left(x^2\right)}\times g'\!\left(x^2\right)\times2x" />,
    reason: <>One factor from each layer: the exponential, then <Katex tex="g" />, then <Katex tex="x^2" />. Reorder to match the options.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2xg'\!\left(x^2\right)e^{g\left(x^2\right)}}" />,
    reason: <>Matches option <b>C</b>. Check with a simple <Katex tex="g" />: if <Katex tex="g(u)=u" />, then <Katex tex="f(x)=e^{x^2}" /> with derivative <Katex tex="2xe^{x^2}" />, and C gives <Katex tex="2x\times1\times e^{x^2}" /> ✓. Option <b>A</b> leaves out the factor <Katex tex="g'(x^2)" /> altogether; option <b>B</b> drops the prime on <Katex tex="g" />; option <b>D</b> evaluates <Katex tex="g'" /> at <Katex tex="2x" /> instead of <Katex tex="x^2" />; option <b>E</b> changes the power from <Katex tex="g(x^2)" /> to <Katex tex="g(2x)" />. (With <Katex tex="g(u)=u" />, A and D also give <Katex tex="2xe^{x^2}" />, because <Katex tex="g'" /> is 1 everywhere, so that check only rules out B and E. The diagram below uses a <Katex tex="g" /> that rules out all four.)</>,
  },
]

export default function MethodsQ7_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="f(x)=e^{g\left(x^2\right)}" />, where <Katex tex="g" /> is a
          differentiable function, then <Katex tex="f'(x)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2xe^{g\left(x^2\right)}" /> },
        { letter: 'B', content: <Katex tex="2xg\!\left(x^2\right)e^{g\left(x^2\right)}" /> },
        { letter: 'C', content: <Katex tex="2xg'\!\left(x^2\right)e^{g\left(x^2\right)}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2xg'(2x)e^{g\left(x^2\right)}" /> },
        { letter: 'E', content: <Katex tex="2xg'\!\left(x^2\right)e^{g(2x)}" /> },
      ]}
      background={
        <Background title="The chain rule, one layer at a time">
          <p>
            For a composite <Katex tex="y=h\big(k(x)\big)" />, the chain rule says
          </p>
          <Katex display tex="\frac{dy}{dx} = h'\big(k(x)\big)\times k'(x):" />
          <p>
            the outer function&apos;s derivative, evaluated at the inside <em>unchanged</em>, times the derivative of the inside. With
            three layers, apply it twice. Four of the five options here are the right shape with one detail altered, so the value is in
            naming the layers before differentiating: where the prime goes, and what each function is evaluated at.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Test the options on a real g: only option C gives the curve's gradient at every x">
            <TestGWidget />
          </Explore>
          <WrongMethod
            title="Differentiate the x² inside g′ as well"
            source="11% chose D"
            working={<Katex display tex="f'(x) = e^{g(x^2)}\times g'(2x)\times2x \quad \text{(option D)}" />}
          >
            <p>
              The inside, <Katex tex="x^2" />, is differentiated <b>once</b>, and its derivative <Katex tex="2x" /> is a separate factor.{' '}
              <Katex tex="g'" /> is evaluated at what <Katex tex="g" /> was given, <Katex tex="x^2" />: the rate of change of <Katex tex="g" />{' '}
              matters where <Katex tex="g" /> is actually being used.
            </p>
            <p>
              A real <Katex tex="g" /> exposes it. With <Katex tex="g(u)=\sin u" /> at <Katex tex="x=1" />, the curve{' '}
              <Katex tex="y=e^{\sin(x^2)}" /> is rising with gradient <Katex tex="\approx2.51" />, but D gives{' '}
              <Katex tex="2\cos(2)e^{\sin 1}\approx-1.93" />: negative on a rising curve.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Bring the power down in front, like the power rule"
            source="10% chose B"
            working={<Katex display tex="f'(x) = g(x^2)\,e^{g(x^2)}\times2x \quad \text{(option B)}" />}
          >
            <p>
              Bringing the power down is the rule for <Katex tex="x^n" />, where the variable is in the base and the power is a fixed number.
              In <Katex tex="e^{g(x^2)}" /> the variable is in the power, and the derivative of <Katex tex="e^u" /> is just{' '}
              <Katex tex="e^u" />: nothing comes down. What multiplies is the <em>derivative</em> of the power,{' '}
              <Katex tex="g'(x^2)\times2x" />. Next time, write <Katex tex="\tfrac{d}{dx}e^{u}=e^{u}\tfrac{du}{dx}" /> first and then work
              out <Katex tex="\tfrac{du}{dx}" /> as its own step.
            </p>
          </WrongMethod>
        </>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
