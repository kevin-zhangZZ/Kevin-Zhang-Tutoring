// 2023 Mathematical Methods NHT — Exam 1, Question 8 (8 marks). The NHT report gives sample
// answers only, with no statistics; its notes beyond the bare answers (part a.: many correct
// reasons, with two examples; part c.: what a 'show that' needs) are quoted as those parts'
// examiner comments. f(x) = x²/3 + sin(πx) and an unknown g: why g is not f′ from the graphs, g as
// the antiderivative of f through the origin, the sum of two even functions is even, then the
// values of c making x²/3 + sin(πx − c) even. Question text transcribed from the original paper;
// the graph is cropped from the original VCAA exam PDF. Answers checked with sympy (and part d.
// numerically) and against the report's sample answers (g(x) = x³/9 − cos(πx)/π + 1/π;
// c = π/2 + kπ, k ∈ Z). Part d. uses the general solution of sin A = sin B, the second of the
// report's two routes. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2023nhte1-q8-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      There were many correct ways this question could be answered and one correct specific and clear reason needed
      to be given. Potential correct answers included:
      <br />
      Turning points of <Katex tex="f(x)" /> don&rsquo;t match <Katex tex="x" />-intercepts of <Katex tex="g(x)" />.
      <br />
      or
      <br />
      When <Katex tex="g(x)=0" /> at <Katex tex="x" />=0, it is clear that <Katex tex="f(x)" /> is increasing.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question was a &lsquo;show that&rsquo; question. As such each line of working needed to demonstrate a
      clear, logical and explicit progression. Working needs to flow from one side, <Katex tex="k(x)" />, and lead to
      the other, <Katex tex="k(-x)" />, and must only consider the general case, not a specific function.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>If <Katex tex="g=f'" />, then <Katex tex="g(x)=0" /> wherever <Katex tex="f" /> has a turning point.</>,
    reason: <>A turning point is where the tangent is horizontal, so the derivative there is zero: the graph of <Katex tex="f'" /> must cross or touch the <Katex tex="x" />-axis at every turning point of <Katex tex="f" />.</>,
  },
  {
    working: <><Katex tex="f" /> has a local minimum at about <Katex tex="x=1.4" />, but there <Katex tex="g(x)>0" />, not 0.</>,
    reason: <>Read off the graph: the solid curve dips just below the axis between 0 and 2, while the dashed curve is clearly above the axis there.</>,
    more: <>The local maximum near <Katex tex="x=0.5" /> fails the same way: the dashed curve is above the axis there too.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{The turning points of } f \text{ do not match}\\\text{the } x\text{-intercepts of } g\text{, so } g\ne f'.\end{gathered}}" />,
    reason: <>One specific, clear reason is enough for the mark.</>,
    more: <>The report&apos;s other example works the same way in reverse: <Katex tex="g(0)=0" />, but <Katex tex="f" /> is clearly increasing through the origin, so <Katex tex="f'(0)\ne0" /> (in fact <Katex tex="f'(0)=\pi\cos(0)=\pi" />). A vague answer such as &ldquo;the shapes don&apos;t match&rdquo; isn&apos;t specific enough.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)=\int\left(\frac{1}{3}x^2+\sin(\pi x)\right)dx" />,
    reason: <><Katex tex="g'(x)=f(x)" /> means <Katex tex="g" /> is an antiderivative of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="g(x)=\frac{1}{9}x^3-\frac{1}{\pi}\cos(\pi x)+c" />,
    reason: <><Katex tex="\int\tfrac13x^2\,dx=\tfrac13\cdot\tfrac{x^3}{3}=\tfrac{x^3}{9}" />, and from the formula sheet <Katex tex="\int\sin(kx)\,dx=-\tfrac1k\cos(kx)" /> with <Katex tex="k=\pi" />.</>,
    more: <>Check the trig term by differentiating: <Katex tex="\tfrac{d}{dx}\left(-\tfrac1\pi\cos(\pi x)\right)=-\tfrac1\pi\cdot\left(-\pi\sin(\pi x)\right)=\sin(\pi x)" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}g(0)=0:\quad0=0-\frac{1}{\pi}\cos(0)+c\\0=-\frac{1}{\pi}+c\implies c=\frac{1}{\pi}\end{gathered}" />,
    reason: <>The stem says both graphs pass through the origin. Note <Katex tex="\cos(0)=1" />, not 0, so <Katex tex="c" /> is not zero.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x)=\frac{1}{9}x^3-\frac{1}{\pi}\cos(\pi x)+\frac{1}{\pi}}" />,
    reason: <>Sanity check against the dashed curve: <Katex tex="g(2)=\tfrac89-\tfrac1\pi+\tfrac1\pi=\tfrac89\approx0.9" />, and the dashed curve is a little under 1 at <Katex tex="x=2" /> ✓.</>,
    more: <>Also <Katex tex="g(1)=\tfrac19+\tfrac1\pi+\tfrac1\pi\approx0.75" />, the small bump of the dashed curve between 0 and 2 ✓. And since <Katex tex="g'=f" />, <Katex tex="g" /> is increasing wherever <Katex tex="f>0" />: the dashed curve falls only where the solid curve dips below the axis.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}m(-x)=m(x)\ \text{and}\ n(-x)=n(x)\\\text{for all } x\in R\end{gathered}" />,
    reason: <>State what is given: both functions have the property.</>,
  },
  {
    working: <Katex display tex="k(-x)=m(-x)+n(-x)" />,
    reason: <>Start from one side, <Katex tex="k(-x)" />, using the definition of <Katex tex="k" /> with <Katex tex="-x" /> as the input.</>,
  },
  {
    working: <Katex display tex="=m(x)+n(x)" />,
    reason: <>Use the property of <Katex tex="m" /> and of <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="=k(x)\ \text{for all } x\in R\text{, so } k \text{ has the property.}" />,
    reason: <>The definition of <Katex tex="k" /> again, read the other way. As required.</>,
    more: <>The report stresses that the working must flow from one side to the other and consider the general case, not a specific function. Showing that, say, <Katex tex="x^2+\cos(x)" /> works proves nothing about all pairs <Katex tex="m" />, <Katex tex="n" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}h(x)=h(-x)\\\iff\frac13x^2+\sin(\pi x-c)\\=\frac13(-x)^2+\sin(-\pi x-c)\end{gathered}" />,
    reason: <>Substitute <Katex tex="-x" /> for <Katex tex="x" /> in the rule.</>,
  },
  {
    working: <Katex display tex="\iff\sin(\pi x-c)=\sin(-\pi x-c)\ \text{for all } x\in R" />,
    reason: <><Katex tex="\tfrac13(-x)^2=\tfrac13x^2" />, so the squared terms cancel: <Katex tex="\tfrac13x^2" /> already has the property, and by part c, <Katex tex="h" /> will have it if the sine term does.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\pi x-c=-\pi x-c+2k\pi\\\text{or}\\\pi x-c=\pi-(-\pi x-c)+2k\pi,\quad k\in Z\end{gathered}" />,
    reason: <>General solution: sine repeats every <Katex tex="2\pi" /> and <Katex tex="\sin(\pi-\theta)=\sin(\theta)" />, so <Katex tex="\sin(A)=\sin(B)" /> exactly when <Katex tex="A=B+2k\pi" /> or <Katex tex="A=\pi-B+2k\pi" />. Here <Katex tex="A=\pi x-c" /> and <Katex tex="B=-\pi x-c" />.</>,
  },
  {
    working: <Katex display tex="\text{First: } 2\pi x=2k\pi\implies x=k" />,
    reason: <>This only holds at integer values of <Katex tex="x" />, not for <b>all</b> <Katex tex="x" />, so it gives no value of <Katex tex="c" />. Reject it.</>,
    more: <>Why this is enough to reject it: for each <Katex tex="x" />, at least one of the two cases must hold. The first case covers only integer <Katex tex="x" />, so at every other <Katex tex="x" /> (say <Katex tex="x=\tfrac12" />) the second case must hold, and that is the case that pins down <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Second: } \pi x-c=\pi+\pi x+c+2k\pi\\\implies-2c=\pi+2k\pi\end{gathered}" />,
    reason: <>The <Katex tex="\pi x" /> terms cancel, so this condition is the same for every <Katex tex="x" />. That is what &ldquo;for all <Katex tex="x" />&rdquo; needs.</>,
  },
  {
    working: <Katex display tex="c=-\frac{\pi}{2}-k\pi,\quad k\in Z" />,
    reason: <>Divide both sides by <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c=\frac{\pi}{2}+k\pi,\ k\in Z}" />,
    reason: <>As <Katex tex="k" /> runs through all the integers, so does <Katex tex="-k-1" />, and <Katex tex="-\tfrac\pi2-k\pi=\tfrac\pi2+(-k-1)\pi" />: the same set of values. VCAA also accepts <Katex tex="c=(2k+1)\tfrac{\pi}{2},\ k\in Z" />.</>,
    more: <>Check with <Katex tex="c=\tfrac\pi2" />: <Katex tex="\sin\left(\pi x-\tfrac\pi2\right)=-\cos(\pi x)" />, and cosine is even, so <Katex tex="h(x)=\tfrac13x^2-\cos(\pi x)" /> has the property ✓. Every <Katex tex="c=\tfrac\pi2+k\pi" /> just adds whole half-turns, turning <Katex tex="-\cos(\pi x)" /> into <Katex tex="\pm\cos(\pi x)" />, still even. Any other <Katex tex="c" /> leaves a sine part, which is odd.</>,
  },
]

export default function MethodsQ8_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (8 marks)</p>
        <p>
          Consider the function <Katex tex="f" />, where <Katex tex="f:R\to R,\ f(x)=\dfrac{1}{3}x^2+\sin(\pi x)" />,
        </p>
        <p>
          and a function <Katex tex="g" />, where the domain of <Katex tex="g" /> is <Katex tex="R" /> but the equation of{' '}
          <Katex tex="g" /> is not known.
        </p>
        <p>
          Part of the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" /> are shown below. Both functions pass
          through the origin.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="VCAA's graph: the solid curve y = f(x), a parabola-like shape with wiggles, and the dashed curve y = g(x), a cubic-like curve rising from the bottom left, both passing through the origin; x from about −5 to 10, y from about −3 to 11"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Derivative Graphs"
        marks={1}
        statement={
          <>
            Based on the graphs above, state one reason why the graph of <Katex tex="y=g(x)" /> is not the graph of{' '}
            <Katex tex="y=f'(x)" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Antiderivatives"
        marks={3}
        statement={
          <>
            Determine the equation of <Katex tex="g(x)" /> given that <Katex tex="g'(x)=f(x)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Assume c = 0 because the graph goes through the origin"
          working={<Katex display tex="g(x)=\frac{1}{9}x^3-\frac{1}{\pi}\cos(\pi x)" />}
        >
          Then <Katex tex="g(0)=-\tfrac1\pi\cos(0)=-\tfrac1\pi\ne0" />. The constant has to cancel the{' '}
          <Katex tex="-\tfrac1\pi" /> that the cosine term gives at <Katex tex="x=0" />. Always substitute the known point
          rather than guessing the constant.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Even Functions"
        marks={1}
        statement={
          <>
            Some functions have the property <Katex tex="f(x)=f(-x)" /> for all <Katex tex="x\in R" />.
            <br />
            Show that when two functions, <Katex tex="m" /> and <Katex tex="n" />, have this property, the function{' '}
            <Katex tex="k(x)=m(x)+n(x)" /> also has this property.
          </>
        }
        examinerReport={REPORT_C}
      >
        <Background>
          <p>
            Functions with <Katex tex="f(x)=f(-x)" /> for all <Katex tex="x" /> are called <b>even</b>: their graphs are
            symmetric about the <Katex tex="y" />-axis (<Katex tex="x^2" />, <Katex tex="\cos(x)" />). To show{' '}
            <Katex tex="k" /> is even, start with <Katex tex="k(-x)" /> and turn it into <Katex tex="k(x)" /> one justified
            step at a time.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Even Functions"
        marks={3}
        statement={
          <>
            Consider the function <Katex tex="h" />, where <Katex tex="h(x)=\dfrac{1}{3}x^2+\sin(\pi x-c),\ c\in R" />.
            <br />
            Find all values of <Katex tex="c" /> for which <Katex tex="h(x)=h(-x)" />, for all <Katex tex="x\in R" />.
          </>
        }
      >
        <Background>
          <p>
            <Katex tex="y=\sin(\pi x)" /> is odd, not even, which is why <Katex tex="f" /> in the stem isn&apos;t symmetric.
            Shifting the sine wave sideways by the right amount turns it into a (negative) cosine wave, which is even. The
            question is which shifts <Katex tex="c" /> do that. Since <Katex tex="\sin(\pi x-c)=\sin\left(\pi\left(x-\tfrac{c}{\pi}\right)\right)" />,
            the shift is <Katex tex="\tfrac{c}{\pi}" /> units right; the wave has period 2, so shifts differing by whole
            periods give the same graph.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="Give only c = π/2"
          working={<Katex display tex="c=\frac{\pi}{2}" />}
        >
          This value works, but the question asks for <b>all</b> values. Shifting the sine wave by any further whole
          number of half-periods (<Katex tex="c" /> changing by <Katex tex="\pi" />) also gives <Katex tex="\pm\cos(\pi x)" />,
          which is even, so the answer is the whole family <Katex tex="c=\tfrac\pi2+k\pi" />, <Katex tex="k\in Z" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
