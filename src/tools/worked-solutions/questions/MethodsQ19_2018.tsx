// 2018 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 41% correct.
// Total area of the (four-region, alternating-sign) shaded area between f(x)=cos(πx/2) and
// g(x)=sin(πx) on [0,3]. Question text transcribed from the original paper; the diagram is
// cropped directly from the original VCAA exam PDF, not a redrawing. Solution is original.
//
// Widgets (after the working): meth-2018-mcq19-signed-strips sweeps a strip across the four
// regions to show that f − g is negative wherever g is on top (hence the minus signs in C), with
// a toggle counting every strip as f − g; meth-2018-mcq19-option-recipes shows how many times
// each option counts each region (+1, ×2, 0, −1) and its value against 6/π. WrongMethod: E's
// last term (42% chose E). All five option values checked in sympy: A 4/π, B 9/π, C 6/π,
// D 10/π, E −3/π; itute also gives C.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2018-mcq19-fg-areas.png'

const StripsWidget = lazyWidget(() => import('../interactives/meth-2018-mcq19-signed-strips'))
const RecipesWidget = lazyWidget(() => import('../interactives/meth-2018-mcq19-option-recipes'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 4, C: 41, D: 9, E: 42 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      Area =
      <br />
      <Katex tex="\displaystyle\int_0^{\frac13}\bigl(f(x)-g(x)\bigr)dx-2\int_{\frac13}^{1}\bigl(f(x)-g(x)\bigr)dx-\int_{\frac53}^{3}\bigl(f(x)-g(x)\bigr)dx" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi x}{2}\right) = \sin(\pi x) = 2\sin\!\left(\frac{\pi x}{2}\right)\cos\!\left(\frac{\pi x}{2}\right)" />,
    reason: (
      <>
        An area between two curves has to be split wherever the top curve changes, and that can only happen where the curves
        meet. The diagram marks <Katex tex="\tfrac13" /> and <Katex tex="\tfrac53" />, but confirm them. The double-angle
        identity writes <Katex tex="\sin(\pi x)" /> in terms of <Katex tex="\tfrac{\pi x}{2}" />, the same angle as{' '}
        <Katex tex="f" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi x}{2}\right)\left[1-2\sin\!\left(\frac{\pi x}{2}\right)\right] = 0" />,
    reason: (
      <>
        Factorise rather than divide by <Katex tex="\cos\left(\tfrac{\pi x}{2}\right)" />: it is zero at some of the crossings,
        and dividing by it would lose them.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\cos\!\left(\tfrac{\pi x}{2}\right)=0 &\implies x=1,\ 3\\ \sin\!\left(\tfrac{\pi x}{2}\right)=\tfrac12 &\implies x=\tfrac13,\ \tfrac53\end{aligned}"
      />
    ),
    reason: <>Within <Katex tex="[0,3]" />, this gives four crossings: <Katex tex="x=\tfrac13,\,1,\,\tfrac53,\,3" /> — matching the diagram's dashed lines and the visible crossings at <Katex tex="x=1" /> and <Katex tex="x=3" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}f>g &\text{ on } \left(0,\tfrac13\right)\cup\left(1,\tfrac53\right)\\ g>f &\text{ on } \left(\tfrac13,1\right)\cup\left(\tfrac53,3\right)\end{aligned}"
      />
    ),
    reason: (
      <>
        Between consecutive crossings <Katex tex="f-g" /> cannot change sign, so one test point per region settles which
        curve is on top: at <Katex tex="x=\tfrac16" />, <Katex tex="f\approx0.97" /> and <Katex tex="g=\tfrac12" />; at{' '}
        <Katex tex="x=\tfrac12" />, <Katex tex="f\approx0.71" /> and <Katex tex="g=1" />; at <Katex tex="x=\tfrac43" />,{' '}
        <Katex tex="f=-\tfrac12" /> and <Katex tex="g\approx-0.87" />; at <Katex tex="x=2" />, <Katex tex="f=-1" /> and{' '}
        <Katex tex="g=0" />. The third region lies below the <Katex tex="x" />-axis, yet <Katex tex="f" /> is still the top
        curve there: for an area between curves, only which curve is higher matters, not where the axis is.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}h(x) &= \int\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx\\ &= \frac{2}{\pi}\sin\!\left(\frac{\pi x}{2}\right) + \frac{1}{\pi}\cos(\pi x)\end{aligned}"
      />
    ),
    reason: (
      <>
        Every option is built from integrals of <Katex tex="f-g" /> (or <Katex tex="g-f" />), so one antiderivative lets us
        find each region's signed integral and see its sign.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&h(0)=\tfrac1\pi,\quad h\!\left(\tfrac13\right)=\tfrac{3}{2\pi},\quad h(1)=\tfrac1\pi\\ &h\!\left(\tfrac53\right)=\tfrac{3}{2\pi},\quad h(3)=-\tfrac3\pi\end{aligned}"
      />
    ),
    reason: <>Evaluating the antiderivative at each crossing.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}R_1&=\int_0^{1/3}\!(f-g)\,dx=\tfrac{1}{2\pi}\\ R_2&=\int_{1/3}^{1}\!(f-g)\,dx=-\tfrac{1}{2\pi}\\ R_3&=\int_{1}^{5/3}\!(f-g)\,dx=\tfrac{1}{2\pi}\\ R_4&=\int_{5/3}^{3}\!(f-g)\,dx=-\tfrac{9}{2\pi}\end{aligned}"
      />
    ),
    reason: (
      <>
        Each region's signed integral is <Katex tex="h" /> at its right end minus <Katex tex="h" /> at its left end. The
        signs follow the previous step exactly: <Katex tex="R_2" /> and <Katex tex="R_4" /> are negative because{' '}
        <Katex tex="g" /> is on top there, so every strip has a negative height <Katex tex="f-g" />.
      </>
    ),
  },
  {
    working: <Katex display tex="R_3 = -R_2 \quad \left(\text{both} = \tfrac{1}{2\pi}\text{ in size}\right)" />,
    reason: <>Not a coincidence: <Katex tex="f(2-x)=-f(x)" /> and <Katex tex="g(2-x)=-g(x)" />, so <Katex tex="f-g" /> has point symmetry about <Katex tex="(1,0)" /> and the regions on <Katex tex="\left(\tfrac13,1\right)" /> and <Katex tex="\left(1,\tfrac53\right)" /> are congruent. That is what lets the total collapse to three terms instead of four.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{Total area} &= R_1 - R_2 + R_3 - R_4\\ &= R_1 - 2R_2 - R_4\end{aligned}"
      />
    ),
    reason: (
      <>
        Where <Katex tex="g" /> is on top the area is <em>minus</em> the integral of <Katex tex="f-g" />, so{' '}
        <Katex tex="R_2" /> and <Katex tex="R_4" /> are subtracted. Then <Katex tex="R_3=-R_2" /> combines the two middle
        regions into <Katex tex="-2R_2" />. A minus sign in front of an integral of <Katex tex="f-g" /> is the tell-tale
        sign of a region with <Katex tex="g" /> on top.
      </>
    ),
  },
  {
    working: <Katex display tex="= \tfrac{1}{2\pi} - 2\!\left(-\tfrac{1}{2\pi}\right) - \left(-\tfrac{9}{2\pi}\right) = \tfrac{6}{\pi}" />,
    reason: <>Not asked for, but a positive total confirms every sign.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{aligned}&\int_0^{1/3}\!(f-g)\,dx - 2\!\int_{1/3}^{1}\!(f-g)\,dx\\ &\quad - \int_{5/3}^{3}\!(f-g)\,dx\end{aligned}}"
      />
    ),
    reason: (
      <>
        Matches option <b>C</b>, with <Katex tex="f-g=\cos\left(\tfrac{\pi x}{2}\right)-\sin(\pi x)" />. Option <b>E</b>, the
        most popular answer at <Katex tex="42\%" />, differs only in its last term, <Katex tex="+\int_{5/3}^{3}(f-g)\,dx" />,
        which equals <Katex tex="-\tfrac{9}{2\pi}" /> because <Katex tex="g" /> is on top there; its value is{' '}
        <Katex tex="\tfrac{1}{2\pi}+\tfrac{1}{\pi}-\tfrac{9}{2\pi}=-\tfrac{3}{\pi}" />, which cannot be an area. <b>A</b>{' '}
        integrates <Katex tex="g-f" /> straight across and subtracts the two regions where <Katex tex="f" /> is on top (
        <Katex tex="\tfrac4\pi" />). <b>B</b> counts only the last region, twice (<Katex tex="\tfrac9\pi" />). <b>D</b> leaves
        out the first region and doubles the last (<Katex tex="\tfrac{10}\pi" />).
      </>
    ),
  },
]

export default function MethodsQ19_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graphs <Katex tex="f:R\to R,\ f(x)=\cos\!\left(\tfrac{\pi x}{2}\right)" />{' '}
            and <Katex tex="g:R\to R,\ g(x)=\sin(\pi x)" /> are shown in the
            diagram below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
            <img
              src={graphSrc}
              alt="Graphs of f(x)=cos(πx/2) and g(x)=sin(πx) on [0,3], with the regions between them shaded, from the original 2018 VCAA exam paper"
              className="w-full max-w-[380px]"
            />
          </div>
          <p>An integral expression that gives the total area of the shaded regions is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^3\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx" /> },
        { letter: 'B', content: <Katex tex="\displaystyle 2\!\int_{5/3}^3\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx" /> },
        {
          letter: 'C',
          content: (
            <Katex tex="\displaystyle\int_0^{1/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - 2\!\int_{1/3}^{1}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - \int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
          isAnswer: true,
        },
        {
          letter: 'D',
          content: (
            <Katex tex="\displaystyle 2\!\int_1^{5/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx - 2\!\int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
        },
        {
          letter: 'E',
          content: (
            <Katex tex="\displaystyle\int_0^{1/3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx + 2\!\int_{1/3}^{1}\!\left(\sin(\pi x)-\cos\tfrac{\pi x}{2}\right)dx + \int_{5/3}^{3}\!\left(\cos\tfrac{\pi x}{2}-\sin(\pi x)\right)dx" />
          ),
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Area between curves: top minus bottom">
          <p>
            An integral <Katex tex="\int_a^b\bigl(f(x)-g(x)\bigr)dx" /> adds up thin strips of height{' '}
            <Katex tex="f(x)-g(x)" />. Where <Katex tex="f" /> is on top that height is positive, so the integral is the area.
            Where <Katex tex="g" /> is on top the height is negative, so the integral is <em>minus</em> the area.
          </p>
          <p>
            So a total area is found region by region: split at every crossing, and in each region integrate top minus bottom
            (or put a minus sign in front of an integral of bottom minus top). Where the <Katex tex="x" />-axis is makes no
            difference; only which curve is higher does.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why a region with g on top gets a minus sign">
            <StripsWidget />
          </Explore>
          <Explore title="What each option actually adds up, region by region">
            <RecipesWidget />
          </Explore>
          <WrongMethod
            title="The last region's area is the integral of f − g from 5/3 to 3"
            source="42% chose E"
            working={
              <Katex
                display
                tex="\begin{aligned}&\int_0^{1/3}\!(f-g)\,dx+2\!\int_{1/3}^{1}\!(g-f)\,dx\\ &\quad+\int_{5/3}^{3}\!(f-g)\,dx\\ &=\tfrac{1}{2\pi}+\tfrac{1}{\pi}-\tfrac{9}{2\pi}=-\tfrac{3}{\pi}\end{aligned}"
              />
            }
          >
            On <Katex tex="\left(\tfrac53,3\right)" /> it is <Katex tex="g" /> that is on top (at <Katex tex="x=2" />,{' '}
            <Katex tex="f=-1" /> is below <Katex tex="g=0" />), so <Katex tex="f-g" /> is negative there and the last integral
            is <Katex tex="-\tfrac{9}{2\pi}" />: the biggest region is subtracted instead of added. A negative total is the
            giveaway. To catch it, test one <Katex tex="x" />-value in every region and write top minus bottom, or put a minus
            sign in front wherever the order is reversed.
          </WrongMethod>
        </>
      }
    />
  )
}
