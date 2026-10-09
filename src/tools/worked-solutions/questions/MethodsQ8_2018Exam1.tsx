// 2018 Mathematical Methods — Exam 1, Question 8 (7 marks). A show-that derivative, the value
// of k giving a single intersection of f and f′, then a bounded area that is engineered to
// collapse back onto part (a). Question text transcribed from the original paper; the figure
// is cropped directly from the original VCAA exam PDF, not a redrawing. Answers checked
// independently with sympy and against the VCAA examination report. Solution is original.
// Interactives: 8b — f = f′ divided by e^{kx} becomes two parabolas y = x² and y = x(kx + 2); slide k
// and the second crossing x = 2/(1 − k) runs off to infinity at k = 1 (toggle: Δ = 4 for every k).
// 8c — strips of height f − g, with a toggle for the report's slip ∫f + ∫g (= −4 at k = 1).
// 8d — the area swept from 0 to t always equals f(t)/k, because the strip height is f′/k; then set
// A = 16/k with a k slider. WrongMethod boxes: solving for k and Δ = 0 in 8b (examiner's report),
// dividing by x in 8b, f + g in 8c (report), dropping the 1/k in 8d.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import regionSrc from './meth-2018e1-q8-region.png'

const ParabolasWidget = lazyWidget(() => import('../interactives/meth-2018e1-q8b-parabolas'))
const StripsWidget = lazyWidget(() => import('../interactives/meth-2018e1-q8c-strips'))
const AreaWidget = lazyWidget(() => import('../interactives/meth-2018e1-q8d-area-is-f-over-k'))

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: <>This 'show that' question was answered well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [89, 8, 3],
  average: 0.2,
  comment: (
    <>
      Many students found this question challenging. Most students found the correct quadratic
      equation to solve but solved for <Katex tex="k" />, rather than the <Katex tex="x" />{' '}
      value that satisfied the quadratic equation. Few students realised that{' '}
      <Katex tex="x=0" /> was the unique solution. Incorrect use of the null factor law and/or
      the incorrect discriminant of the quadratic were the main sources of error.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      This question was attempted well, although students commonly left out the{' '}
      <Katex tex="dx" />, or found the sum of the integral of <Katex tex="f(x)" /> and{' '}
      <Katex tex="g(x)" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [43, 41, 3, 13],
  average: 0.9,
  comment: (
    <>
      While students could equate their answer to part c. to <Katex tex="\tfrac{16}{k}" />,
      many students did not use their result from part a. Incorrect algebraic manipulation
      made progress difficult for some students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2e^{kx}" />,
    reason: <>A product of <Katex tex="x^2" /> and <Katex tex="e^{kx}" />, so use the product rule.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x\,e^{kx} + x^2\left(k\,e^{kx}\right)" />,
    reason: <>The derivative of <Katex tex="e^{kx}" /> is <Katex tex="k\,e^{kx}" /> — the <Katex tex="k" /> comes out by the chain rule.</>,
  },
  {
    working: <Katex display tex="= x\,e^{kx}\left(2 + kx\right)" />,
    reason: <>Factor out the common <Katex tex="x\,e^{kx}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = x\,e^{kx}(kx+2)}" />,
    reason: <>As required. On a "show that" the full factorising must be written down — you cannot leave the reader to do the last step.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = f'(x) \implies x^2e^{kx} = x\,e^{kx}(kx+2)" />,
    reason: <>The graphs meet where the two rules give the same <Katex tex="y" />-value, so solve <Katex tex="f(x)=f'(x)" />. This is an equation <em>in <Katex tex="x" /></em>; <Katex tex="k" /> is a constant we get to choose. The question is really: which <Katex tex="k" /> leaves only one solution <Katex tex="x" />?</>,
  },
  {
    working: <Katex display tex="x^2 = x(kx+2) \quad \left(e^{kx}>0 \text{ always}\right)" />,
    reason: <>An exponential is never zero, so dividing by <Katex tex="e^{kx}" /> loses and gains no solutions: the crossings of <Katex tex="f" /> and <Katex tex="f'" /> are at exactly the same <Katex tex="x" />-values as those of the parabolas <Katex tex="y=x^2" /> and <Katex tex="y=x(kx+2)" />. Do not divide by <Katex tex="x" /> as well — it can be zero.</>,
  },
  {
    working: <Katex display tex="x^2 - kx^2 - 2x = 0 \implies x\bigl((1-k)x - 2\bigr) = 0" />,
    reason: <>Bring everything to one side and factor out the common <Katex tex="x" />. The unknown being solved for is <Katex tex="x" />, not <Katex tex="k" /> — the report says most students solved for the wrong letter here.</>,
  },
  {
    working: <Katex display tex="x = 0 \quad \text{or} \quad x = \frac{2}{1-k}" />,
    reason: <>Null factor law. <Katex tex="x=0" /> is a solution for <em>every</em> <Katex tex="k" />: both graphs pass through the origin, since <Katex tex="f(0)=f'(0)=0" />. So there is always at least one intersection, and "exactly one" means the second root must disappear.</>,
  },
  {
    working: <Katex display tex="\frac{2}{1-k} \text{ has no solution when } 1-k=0" />,
    reason: <>The second root can never equal <Katex tex="0" /> (the numerator is <Katex tex="2" />), so the only way to lose it is for it to stop existing. That happens exactly when the coefficient of <Katex tex="x^2" /> vanishes and the quadratic degenerates into the linear equation <Katex tex="-2x=0" />. For any other <Katex tex="k" /> there are two intersections — for <Katex tex="k>1" /> the second is at a negative <Katex tex="x" />, which still counts because the domain is <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 1}" />,
    reason: <>Then <Katex tex="x=0" /> is the only intersection, which is what the question wants — and <Katex tex="k=1" /> is a positive real constant as required. The report notes that few students spotted that <Katex tex="x=0" /> was the unique solution; only <Katex tex="3\%" /> scored both marks.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^2 \bigl(f(x)-g(x)\bigr)\,dx" />,
    reason: <>Read the boundaries off the figure: <Katex tex="f" /> is the upper curve, <Katex tex="g" /> the lower one, and the region runs from where they meet at <Katex tex="x=0" /> across to the line <Katex tex="x=2" />. You can confirm the order from the rules: <Katex tex="x^2e^{kx}\ge0" />, while <Katex tex="-\tfrac{2xe^{kx}}{k}\le0" /> for <Katex tex="x\ge0" />. Each thin strip of the region has height <Katex tex="\text{upper}-\text{lower}" />, so the area is <Katex tex="\int(\text{upper}-\text{lower})\,dx" /> — whichever side of the axis the curves are on.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \int_0^2 \left(x^2e^{kx} + \frac{2x\,e^{kx}}{k}\right)dx}" />,
    reason: <>Substituting the two rules: subtracting <Katex tex="g(x)=-\tfrac{2x e^{kx}}{k}" /> flips its sign to a plus. Keep the <Katex tex="dx" /> — the report says students commonly left it out.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = x\,e^{kx}(kx+2) = kx^2e^{kx} + 2x\,e^{kx}" />,
    reason: <>How would I know to start here? "Using your result from part a." is the hint, and part a. was a <em>derivative</em> — so the plan is to make the integrand look like <Katex tex="f'(x)" />. Expanding part a.'s answer shows its two terms, <Katex tex="x^2e^{kx}" /> and <Katex tex="xe^{kx}" />: the same ingredients as the integrand in part c.</>,
  },
  {
    working: <Katex display tex="\frac{1}{k}f'(x) = x^2e^{kx} + \frac{2x\,e^{kx}}{k} = f(x)-g(x)" />,
    reason: <>Compare term by term: each term of the integrand is <Katex tex="\tfrac1k" /> times the matching term of <Katex tex="f'(x)" />, so dividing by <Katex tex="k" /> reproduces the integrand <em>exactly</em>. The whole question is built around this: the awkward integral is really just <Katex tex="\tfrac1k f'" />, and the antiderivative of <Katex tex="f'" /> is <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="A = \frac{1}{k}\int_0^2 f'(x)\,dx = \frac{1}{k}\Bigl[f(x)\Bigr]_0^2" />,
    reason: <>Antidifferentiating by recognition — the report's general comments call it using "the inverse process" of part a. No integration by parts is needed (it is not part of Methods anyway). The report says many students did not use their result from part a.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{k}\left(4e^{2k} - 0\right) = \frac{4e^{2k}}{k}" />,
    reason: <><Katex tex="f(2)=4e^{2k}" /> and <Katex tex="f(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\frac{4e^{2k}}{k} = \frac{16}{k} \implies 4e^{2k} = 16" />,
    reason: <>Multiplying both sides by <Katex tex="k" />, which is legitimate because <Katex tex="k" /> is a positive constant and so never zero. The <Katex tex="k" /> in the denominator cancels on both sides — the reason the answer comes out clean.</>,
  },
  {
    working: <Katex display tex="e^{2k} = 4 \implies 2k = \log_e(4)" />,
    reason: <>Taking the natural logarithm of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{\log_e(4)}{2} = \log_e(2)}" />,
    reason: <><Katex tex="\log_e(4)=\log_e\left(2^2\right)=2\log_e(2)" />, so the <Katex tex="2" />s cancel. Positive, as the question requires. (<Katex tex="\log_e(2)\approx0.693" />.)</>,
  },
]

export default function MethodsQ8_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (7 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=x^2e^{kx}" />, where{' '}
          <Katex tex="k" /> is a positive real constant.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={<>Show that <Katex tex="f'(x)=x\,e^{kx}(kx+2)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Intersections"
        marks={2}
        statement={<>Find the value of <Katex tex="k" /> for which the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=f'(x)" /> have exactly one point of intersection.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Only <Katex tex="3\%" /> of the state scored both marks, and the report says why:
            the equation has two unknowns in it, and it is easy to solve for the wrong one.
            Set <Katex tex="f=f'" />, and what you get is a quadratic <em>in{' '}
            <Katex tex="x" /></em> whose coefficients involve <Katex tex="k" />. Solve for{' '}
            <Katex tex="x" />, then ask what <Katex tex="k" /> has to be for only one root to
            survive.
          </p>
          <p>
            An equation <Katex tex="ax^2+bx+c=0" /> can have exactly one solution in two ways:{' '}
            <Katex tex="a\ne0" /> with <Katex tex="\Delta=0" /> (the two roots merge into a
            repeated root), or <Katex tex="a=0" /> with <Katex tex="b\ne0" /> (it was never a
            quadratic — it is linear). The usual "set the discriminant to zero" trick only finds
            the first kind. Here one root is pinned at <Katex tex="x=0" /> and the other can
            never reach it, so the single root has to arrive the second way.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why k = 1: the second crossing runs off to infinity">
          <ParabolasWidget />
        </Explore>
        <WrongMethod
          title="Solve x² = x(kx + 2) for k"
          source="Examiner's report"
          working={<Katex display tex="x^2 = kx^2 + 2x \implies k = \frac{x^2-2x}{x^2} = 1-\frac{2}{x}" />}
        >
          This gives a different <Katex tex="k" /> for every <Katex tex="x" />, so it is not "the
          value of <Katex tex="k" />" — it answers "which <Katex tex="k" /> puts a crossing at this{' '}
          <Katex tex="x" />?". In an intersection question the unknown is <Katex tex="x" />; solve
          for it, then choose <Katex tex="k" />. (This line can be rescued: <Katex tex="1-\tfrac2x" />{' '}
          takes every value <em>except</em> <Katex tex="1" />, so <Katex tex="k=1" /> is the only
          value that no non-zero <Katex tex="x" /> can produce — the same answer.)
        </WrongMethod>
        <WrongMethod
          title="Exactly one solution means Δ = 0"
          source="Examiner's report"
          working={<Katex display tex="\begin{gathered}(1-k)x^2-2x=0\\ \Delta = (-2)^2-4(1-k)(0) = 4\end{gathered}" />}
        >
          <Katex tex="\Delta" /> is <Katex tex="4" /> whatever <Katex tex="k" /> is, so{' '}
          <Katex tex="\Delta=0" /> never happens and this route finds no <Katex tex="k" /> at all (the
          report lists an incorrect discriminant among the main sources of error).{' '}
          <Katex tex="\Delta=0" /> tests for the two roots of a genuine quadratic merging; here the
          roots are <Katex tex="0" /> and <Katex tex="\tfrac{2}{1-k}" />, which are never equal. The
          one-root case is <Katex tex="a=1-k=0" />, where the equation is not a quadratic and the
          discriminant does not apply.
        </WrongMethod>
        <WrongMethod
          title="Divide both sides by x"
          working={<Katex display tex="\begin{aligned}x^2 &= x(kx+2)\\ \implies x &= kx+2\\ \implies x &= \frac{2}{1-k}\end{aligned}" />}
        >
          Dividing by <Katex tex="x" /> quietly assumes <Katex tex="x\ne0" />, so it throws away{' '}
          <Katex tex="x=0" /> — which is an intersection for every <Katex tex="k" />. Now it looks as
          though every <Katex tex="k\ne1" /> gives exactly one intersection and <Katex tex="k=1" />{' '}
          gives none: the exact opposite of the truth. Bring everything to one side and factorise
          instead; only divide by things that can never be zero, like <Katex tex="e^{kx}" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g(x)=-\dfrac{2x\,e^{kx}}{k}" />. The diagram below shows sections of
          the graphs of <Katex tex="f" /> and <Katex tex="g" /> for <Katex tex="x\ge0" />. Let{' '}
          <Katex tex="A" /> be the area of the region bounded by the curves{' '}
          <Katex tex="y=f(x)" />, <Katex tex="y=g(x)" /> and the line <Katex tex="x=2" />.
        </p>
        <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={regionSrc} alt="Sections of the graphs of f and g for x ≥ 0 with the enclosed region shaded, from the original 2018 VCAA exam paper" className="w-full max-w-[460px]" />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Definite Integral"
        marks={1}
        statement={<>Write down a definite integral that gives the value of <Katex tex="A" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Top minus bottom: subtracting a negative g adds its area">
          <StripsWidget />
        </Explore>
        <WrongMethod
          title="Add the integrals of f and g"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\int_0^2\bigl(f(x)+g(x)\bigr)dx\\ &\quad= \int_0^2\left(x^2e^{kx}-\frac{2x\,e^{kx}}{k}\right)dx\end{aligned}" />}
        >
          <Katex tex="g" /> is below the <Katex tex="x" />-axis, so <Katex tex="\int g(x)\,dx" /> is
          negative: adding it <em>subtracts</em> the lower part of the region instead of including
          it. With <Katex tex="k=1" />, for instance, this gives{' '}
          <Katex tex="\int_0^2(x^2-2x)e^x\,dx=-4" />, a negative "area", while the region is about{' '}
          <Katex tex="29.6" />. For a region between two curves, each strip's height is top minus
          bottom, <Katex tex="f(x)-g(x)" />, wherever the axis happens to be.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Area"
        marks={3}
        statement={<>Using your result from <b>part a.</b>, or otherwise, find the value of <Katex tex="k" /> such that <Katex tex="A=\dfrac{16}{k}" />.</>}
        examinerReport={EXAM_D}
      >
        <Background>
          <p>
            "Using your result from part a." is not a suggestion. The integrand in part c. has
            no antiderivative you can find with Methods techniques — unless you notice it is a multiple of <Katex tex="f'" />, in which case the integral is just{' '}
            <Katex tex="f" /> evaluated at the terminals. The question was built backwards
            from that identity.
          </p>
          <p>
            The fact being used is the fundamental theorem:{' '}
            <Katex tex="\int_a^b F'(x)\,dx = F(b)-F(a)" />. Once you recognise the integrand as a
            derivative, you never have to find an antiderivative from scratch.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The strips are f′/k tall, so the area so far is f/k">
          <AreaWidget />
        </Explore>
        <WrongMethod
          title="The integrand is f′(x), so A = f(2) − f(0)"
          working={<Katex display tex="A = \Bigl[x^2e^{kx}\Bigr]_0^2 = 4e^{2k} = \frac{16}{k} \implies ke^{2k} = 4" />}
        >
          <Katex tex="f'(x) = kx^2e^{kx}+2xe^{kx}" /> has an extra factor of <Katex tex="k" />{' '}
          compared with the integrand, so the integrand is <Katex tex="\tfrac1k f'(x)" />, not{' '}
          <Katex tex="f'(x)" />. The warning sign is the equation left at the end:{' '}
          <Katex tex="ke^{2k}=4" /> cannot be solved exactly by hand (its solution is{' '}
          <Katex tex="k\approx0.80" />, not <Katex tex="\log_e(2)" />), which is rarely what a
          technology-free question intends. Check any antiderivative by differentiating it back
          to the integrand.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
