// 2018 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 20% correct, and the
// correct option was not the most popular (B drew 26%). Which diagonal transformation carries one probability density function to another
// with a prescribed derivative at the median.
//
// The options are written as matrices, but a diagonal matrix is just two dilations, and the
// mathematics is the standard "how do dilations change a gradient" result plus the condition
// that a pdf encloses unit area. Guide §13.7 — judge the mathematics, not the vocabulary.
// The skip guide carries a row recording that reading.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither does
// the stem here (guide §7). All five options tested against both conditions in sympy
// (A: gradient −1, area 1; B: −1, −1; C: +1, 1; D: −16, 1; E: −16, −1); itute also gives A.
// Solution is original.
//
// Widget (after the working): meth-2018-mcq20-two-conditions — pick an option or drag P and Q to
// see g(x) = Q f(x/P) for a sample pdf with median 0 and f′(0) = 4, the rise/run triangle on the
// tangent (run × P, rise × Q, so gradient × Q/P) and the area |P|Q. WrongMethods: B's reflection
// in the x-axis (26% chose B) and D's upside-down gradient rule (21% chose D).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoConditionsWidget = lazyWidget(() => import('../interactives/meth-2018-mcq20-two-conditions'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 26, C: 21, D: 21, E: 11 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Gradient = <Katex tex="m=4" />
      <br />
      reflect in the <Katex tex="y" />-axis: <Katex tex="m=-4" />.
      <br />
      Dilate by a factor of <Katex tex="2" /> from the <Katex tex="y" />-axis:
      <br />
      <Katex tex="m=-\tfrac42=-2" />.
      <br />
      Dilate by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis:{' '}
      <Katex tex="m=-1" />.
      <br />
      The matrix <Katex tex="\begin{bmatrix}-2&0\\0&\tfrac12\end{bmatrix}" /> represents this
      transformation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}P&0\\0&Q\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix} \implies \begin{cases}x' = Px\\ y' = Qy\end{cases}" />,
    reason: <>Every option is a <em>diagonal</em> matrix, so it is just two independent scalings: horizontal by <Katex tex="P" />, vertical by <Katex tex="Q" />. No matrix algebra is needed beyond reading off these two equations.</>,
  },
  {
    working: <Katex display tex="g(x) = Q\,f\!\left(\frac{x}{P}\right)" />,
    reason: <>The image curve: a point <Katex tex="(x,f(x))" /> moves to <Katex tex="(Px,\ Qf(x))" />, so to find <Katex tex="g" /> at a given <Katex tex="x" /> you undo the horizontal scaling and apply the vertical one.</>,
  },
  {
    working: <Katex display tex="g'(x) = \frac{Q}{P}f'\!\left(\frac{x}{P}\right) \implies g'(0) = \frac{Q}{P}f'(0)" />,
    reason: (
      <>
        Chain rule. It makes sense as rise over run: the horizontal factor <Katex tex="P" /> multiplies every run and the
        vertical factor <Katex tex="Q" /> every rise, so every gradient is multiplied by <Katex tex="\tfrac QP" />. The point{' '}
        <Katex tex="x=0" /> stays put (<Katex tex="P\times0=0" />), so the median stays at <Katex tex="0" /> for every option
        and the two derivatives are compared at the same place. The median condition rules nothing out; the other two
        conditions do the work.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{Q}{P}(4) = -1 \implies \frac{Q}{P} = -\frac14" />,
    reason: <>The first condition. The negative sign says <Katex tex="P" /> and <Katex tex="Q" /> have opposite signs — a reflection is involved somewhere.</>,
  },
  {
    working: <Katex display tex="\int_{-\infty}^{\infty} g(x)\,dx = |P|\,Q = 1" />,
    reason: <>The second condition, and the one that separates A from B: <Katex tex="g" /> must itself be a probability density function, so it still encloses unit area. Scaling horizontally by <Katex tex="|P|" /> and vertically by <Katex tex="Q" /> multiplies the area by <Katex tex="|P|Q" />, and that product has to stay <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="g(x)\ge0 \implies Q>0 \implies P<0" />,
    reason: <>A density is never negative, so the vertical scale factor cannot flip the curve. The reflection must therefore be horizontal.</>,
  },
  {
    working: <Katex display tex="Q = -\frac{P}{4} \ \text{ and } \ |P|Q = 1 \implies |P|\left(-\frac{P}{4}\right) = 1" />,
    reason: <>Combining the two conditions. With <Katex tex="P<0" />, <Katex tex="|P|=-P" />, so this becomes <Katex tex="\tfrac{P^2}{4}=1" />.</>,
  },
  {
    working: <Katex display tex="P^2 = 4, \ P<0 \implies P = -2, \quad Q = \frac12" />,
    reason: <>Both conditions satisfied simultaneously.</>,
  },
  {
    working: <Katex display tex="\textbf{B}: \ \frac{Q}{P} = \frac{-1/2}{2} = -\frac14 \ \checkmark, \quad |P|Q = -1 \ \times" />,
    reason: <>Ruling out <b>B</b>, the most popular answer at <Katex tex="26\%" /> — more than chose the correct option. It gets the gradient exactly right and fails the area test: a negative <Katex tex="Q" /> turns the density upside down, so <Katex tex="g" /> is not a pdf at all. The derivative condition on its own cannot separate <b>A</b> from <b>B</b>.</>,
  },
  {
    working: <Katex display tex="\textbf{C}, \textbf{D}, \textbf{E}: \ \frac{Q}{P} = \frac14, \ -4, \ -4" />,
    reason: <>Ruling out the rest: none gives <Katex tex="\tfrac{Q}{P}=-\tfrac14" />. <b>C</b> has no reflection at all; <b>D</b> and <b>E</b> have the two scale factors the wrong way round, dividing where they should multiply.</>,
  },
  {
    working: <Katex display tex="\boxed{T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right) = \begin{bmatrix}-2&0\\[2pt]0&\tfrac12\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}}" />,
    reason: (
      <>
        Matches option <b>A</b>. <b>B</b> (<Katex tex="26\%" />) passes the gradient test but flips the density under the
        axis. <b>C</b> is <b>A</b> without the reflection, so <Katex tex="g'(0)=+1" />. <b>D</b> has <b>A</b>&apos;s scale factors
        swapped between the axes (<Katex tex="\tfrac12" /> across, <Katex tex="2" /> up), giving{' '}
        <Katex tex="g'(0)=-16" />; <b>E</b> does the same and also flips the density under the axis.
      </>
    ),
  },
]

export default function MethodsQ20_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The differentiable function <Katex tex="f:R\to R" /> is a
            probability density function. It is known that the median of the probability
            density function <Katex tex="f" /> is at <Katex tex="x=0" /> and{' '}
            <Katex tex="f'(0)=4" />.
          </p>
          <p className="mb-2">
            The transformation <Katex tex="T:R^2\to R^2" /> maps the graph of{' '}
            <Katex tex="f" /> to the graph of <Katex tex="g" />, where{' '}
            <Katex tex="g:R\to R" /> is a probability density function with a
            median at <Katex tex="x=0" /> and <Katex tex="g'(0)=-1" />.
          </p>
          <p>The transformation <Katex tex="T" /> could be given by</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}-2&0\\[2pt]0&\tfrac12\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\[2pt]0&-\tfrac12\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" /> },
        { letter: 'C', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}2&0\\[2pt]0&\tfrac12\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" /> },
        { letter: 'D', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}-\tfrac12&0\\[2pt]0&2\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" /> },
        { letter: 'E', content: <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}\tfrac12&0\\[2pt]0&-2\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Two conditions, not one">
          <p>
            Only <Katex tex="20\%" /> of the state got this, and the pattern of wrong answers
            says why: the derivative condition alone does not pin the transformation down.
            Options <b>A</b> and <b>B</b> both satisfy it. What separates them is that{' '}
            <Katex tex="g" /> is stated to be a <em>probability density function</em>, which
            forces the area under it to stay <Katex tex="1" /> and forces it to stay
            non-negative.
          </p>
          <p>
            Reading the matrix: a diagonal matrix <Katex tex="\begin{bmatrix}P&0\\0&Q\end{bmatrix}" />{' '}
            stretches horizontally by <Katex tex="P" /> and vertically by{' '}
            <Katex tex="Q" />, with a negative factor adding a reflection. Gradients get
            multiplied by <Katex tex="\tfrac{Q}{P}" /> and areas by{' '}
            <Katex tex="|P|Q" /> — those two facts are the whole question.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="A diagonal matrix multiplies gradients by Q/P and areas by |P|Q">
            <TwoConditionsWidget />
          </Explore>
          <WrongMethod
            title="The gradient has to change sign, so reflect in the x-axis"
            source="26% chose B"
            working={
              <Katex
                display
                tex="\begin{aligned}&\begin{bmatrix}2&0\\0&-\tfrac12\end{bmatrix}:\ g(x)=-\tfrac12 f\!\left(\tfrac x2\right)\\ &g'(0)=\tfrac{-1/2}{2}\times4=-1\ \checkmark\end{aligned}"
              />
            }
          >
            The gradient does come out right, but every <Katex tex="y" />-value is multiplied by <Katex tex="-\tfrac12" />, so{' '}
            <Katex tex="g(x)\le0" /> everywhere and <Katex tex="\int g(x)\,dx=-1" />. That is not a probability density
            function. A reflection in either axis flips the sign of the gradient, but only the reflection in the{' '}
            <Katex tex="y" />-axis keeps the curve above the axis. Once you have a candidate, ask: is <Katex tex="g" /> still{' '}
            <Katex tex="\ge0" />, and does it still enclose area <Katex tex="1" />?
          </WrongMethod>
          <WrongMethod
            title="Stretching sideways by a factor k multiplies the gradient by k"
            source="21% chose D"
            working={
              <Katex
                display
                tex="\begin{aligned}&\begin{bmatrix}-\tfrac12&0\\0&2\end{bmatrix}:\ \tfrac PQ\times4=\tfrac{-1/2}{2}\times4=-1\ ?\\ &\text{actually } g'(0)=\tfrac QP\times4=\tfrac{2}{-1/2}\times4=-16\end{aligned}"
              />
            }
          >
            The rule is upside down. Stretching sideways makes a curve <em>flatter</em>: a dilation by factor{' '}
            <Katex tex="k" /> from the <Katex tex="y" />-axis multiplies every run by <Katex tex="k" /> and leaves every rise
            alone, so it <em>divides</em> the gradient by <Katex tex="k" />. Quick check with a line: dilating{' '}
            <Katex tex="y=4x" /> by factor <Katex tex="2" /> from the <Katex tex="y" />-axis gives{' '}
            <Katex tex="y=4\left(\tfrac x2\right)=2x" />, which is less steep.
          </WrongMethod>
        </>
      }
    />
  )
}
