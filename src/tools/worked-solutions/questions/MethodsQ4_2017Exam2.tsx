// 2017 Mathematical Methods — Exam 2, Section B, Question 4 (18 marks).
// f(x) = 2^(x+1) − 2 and its inverse, then the family gₖ(x) = 2e^(kx) − 2. The last three
// parts were the least-answered on the whole examination (0.3, 0.1 and 0.0 averages).
// Part (a) is written with a transformation matrix, which is off the current study design;
// the mathematics is an ordinary pair of translations and the skip guide already lists the
// 2017 SAQ4a matrix row as doable. Question text transcribed from the original paper; both
// figures are crops of VCAA's own artwork. Answers verified with sympy and scipy. Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2017exam2-q4-graph.png'
import pairSrc from './meth-2017exam2-q4d-pair.png'

// Dropbox share links for the tutor's video walkthrough of every part, converted to
// `raw=1` so the browser can stream them directly. All were already H.264/AAC — just
// muxed in the wrong container (.mkv) or missing the fast-start flag — so each was only
// losslessly remuxed (`ffmpeg -c copy -movflags +faststart`), no re-encoding needed.
// Part (g) covers both g.i and g.ii in one recording; part (i) is split into i.i and i.ii.
const VIDEO = {
  a: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AO91l09q9jI9cAYwDUzJ_5Y/MM%202017/SAQ4a-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  b: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/APj9lpYi0u--pZdiyA3aYk0/MM%202017/SAQ4b-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  c: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ANFPVdHzKfkREIere3wtae4/MM%202017/SAQ4c-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  d: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ABvTHN6NPdd0vXLpwhsoEl8/MM%202017/SAQ4d-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  e: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AAw0-cF9OtJchN3RkrFABgA/MM%202017/SAQ4e-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  f: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AETPYcEAPYlcV_SBqzfQclw/MM%202017/SAQ4f-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  g: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/ALv8hkfndHRlkZ2HEmk5vR8/MM%202017/SAQ4g-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  h: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AP14aDiPQmzSSgNM1VrSEoM/MM%202017/SAQ4h-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  ii: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AKs04OxDxXYlF4OCP3LIbTs/MM%202017/SAQ4i.i-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
  iii: 'https://www.dropbox.com/scl/fo/nj8fctdfyn1hpwbiqjktw/AMZfgWrKgDAgPRt677UpKD0/MM%202017/SAQ4i.ii-h264.mp4?rlkey=9vak8i9afmguex76hqb71mfv8&raw=1',
}

const EXAM_A: SAExaminerStats = {
  marks: [24, 28, 48],
  average: 1.3,
  comment: <>This question was answered reasonably well. Some students made sign errors.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 25, 64],
  average: 1.5,
  comment: (
    <>
      There are other acceptable expressions for the inverse. Some students found the rule
      but did not give the domain. Some students did not use brackets, leaving their answer
      as <Katex tex="y=\log_2 x+2-1" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [22, 10, 20, 49],
  average: 2.0,
  comment: (
    <>
      <Katex tex="\int_{-1}^{0}\bigl(f(x)-f^{-1}(x)\bigr)dx" /> and{' '}
      <Katex tex="\int_{-1}^{0}f^{-1}(x)-2^{x+1}-2\,dx" /> were common incorrect expressions.
      To avoid this type of error it is better to use the expression{' '}
      <Katex tex="\int_{-1}^{0}\bigl(f^{-1}(x)-f(x)\bigr)dx" />. An exact answer was
      required. <Katex tex="0.1196" /> was often given.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [26, 13, 62],
  average: 1.4,
  comment: <>This question was answered reasonably well.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>This question was answered reasonably well.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Some students used their answer to Question 4e.{' '}
      <Katex tex="g_k^{-1}(x)=\tfrac{1}{\log_e(2)}\log_e\!\left(\tfrac{x+2}{2}\right)" /> was
      a common incorrect response.
    </>
  ),
}

const EXAM_GI: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      Many students were unable to describe the transformation correctly, for example
      "dilation of a factor of <Katex tex="\tfrac1k" /> in the <Katex tex="y" />-axis".
      Others put their answer in terms of <Katex tex="\log_e(2)" /> instead of{' '}
      <Katex tex="k" />. Some gave two transformations.
    </>
  ),
}

const EXAM_GII: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: <>Students who answered Question 4g.i. correctly tended to answer this question well.</>,
}

const EXAM_H: SAExaminerStats = {
  marks: [77, 21, 2],
  average: 0.3,
  comment: <>This question was not answered well. Some students found one answer only. Others gave approximate answers.</>,
}

const EXAM_II: SAExaminerStats = {
  marks: [95, 2, 3],
  average: 0.1,
  comment: (
    <>
      Many students tried to solve <Katex tex="g_k(x)=g_k^{-1}(x)" /> and then attempted to
      find the discriminant.
    </>
  ),
}

const EXAM_IIII: SAExaminerStats = {
  marks: [98, 2],
  average: 0.0,
  comment: (
    <>
      As the graphs of <Katex tex="g_k" /> and <Katex tex="g_k^{-1}" /> will intersect in the
      third quadrant, <Katex tex="\lim_{k\to\infty}\int_{-2}^{0}f(x)\,dx=4" />, so{' '}
      <Katex tex="b=4" />, as <Katex tex="g_k^{-1}" /> has a vertical asymptote with equation{' '}
      <Katex tex="x=-2" /> and <Katex tex="g_k" /> has a horizontal asymptote with equation{' '}
      <Katex tex="y=-2" />; the area will approach <Katex tex="4" /> as <Katex tex="k" />{' '}
      increases. This question was not answered well.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x'=x+c, \qquad y'=y+d" />,
    reason: <>Reading the matrix statement: this is a translation of <Katex tex="c" /> horizontally and <Katex tex="d" /> vertically — nothing more.</>,
  },
  {
    working: <Katex display tex="x=x'-c, \qquad y=y'-d" />,
    reason: <>Invert, so the <em>old</em> variables are written in terms of the new ones, ready to substitute.</>,
  },
  {
    working: <Katex display tex="y'-d = 2^{\,x'-c}" />,
    reason: <>Substituting into <Katex tex="y=2^x" />.</>,
  },
  {
    working: <Katex display tex="y' = 2^{\,x'-c}+d \equiv 2^{\,x'+1}-2" />,
    reason: <>This has to be the rule for <Katex tex="f" />, so match the two forms.</>,
  },
  {
    working: <Katex display tex="\boxed{c=-1, \qquad d=-2}" />,
    reason: <><Katex tex="-c=1" /> gives <Katex tex="c=-1" />: one unit <em>left</em>, two units <em>down</em>. The minus on <Katex tex="c" /> is the sign error the report flags — a translation left is a <Katex tex="+1" /> inside the function but a <Katex tex="-1" /> in the transformation.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x = 2^{\,y+1}-2" />,
    reason: <>To invert, swap <Katex tex="x" /> and <Katex tex="y" /> and then make <Katex tex="y" /> the subject.</>,
  },
  {
    working: <Katex display tex="x+2 = 2^{\,y+1}" />,
    reason: <>Isolating the power.</>,
  },
  {
    working: <Katex display tex="\log_2(x+2) = y+1" />,
    reason: <>Taking <Katex tex="\log_2" /> of both sides. The brackets matter — <Katex tex="\log_2 x+2" /> means something different, which the report calls out.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \log_2(x+2)-1}" />,
    reason: <>The rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(f^{-1}) = \text{ran}(f) = (-2,\infty)}" />,
    reason: <>The domain of an inverse is always the range of the original, and <Katex tex="2^{x+1}>0" /> means <Katex tex="f(x)>-2" /> without ever reaching it. Half the marks here were for remembering to state this.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=f^{-1}(x) \iff f(x)=x" />,
    reason: <><Katex tex="f" /> is increasing, so any intersection of a graph with its own reflection in <Katex tex="y=x" /> must lie on that line. Solving <Katex tex="f(x)=x" /> is far easier than solving <Katex tex="f(x)=f^{-1}(x)" /> directly.</>,
  },
  {
    working: <Katex display tex="2^{\,x+1}-2 = x \implies x=-1 \text{ or } x=0" />,
    reason: <>Check both: <Katex tex="f(-1)=2^0-2=-1" /> ✓ and <Katex tex="f(0)=2-2=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{-1}^{0}\bigl(x-f(x)\bigr)dx" />,
    reason: <>Between the intersections, <Katex tex="f" /> lies below <Katex tex="y=x" /> and <Katex tex="f^{-1}" /> lies the same distance above it. So the whole enclosed area is twice the strip between <Katex tex="y=x" /> and <Katex tex="f" /> — no second integral needed.</>,
  },
  {
    working: <Katex display tex="= 2\int_{-1}^{0}\bigl(x-2^{\,x+1}+2\bigr)dx" />,
    reason: <>Expanding with the bracket kept: <Katex tex="-(2^{x+1}-2)=-2^{x+1}+2" />.</>,
  },
  {
    working: <Katex display tex="= 2\left[\frac{x^2}{2}+2x-\frac{2^{\,x+1}}{\log_e 2}\right]_{-1}^{0}" />,
    reason: <>Using <Katex tex="\int a^{x}dx=\tfrac{a^{x}}{\log_e a}" />, here with <Katex tex="a=2" />.</>,
  },
  {
    working: <Katex display tex="= 2\left(-\frac{2}{\log_e2}\right)-2\left(\frac12-2-\frac{1}{\log_e2}\right)" />,
    reason: <>Substituting the terminals: <Katex tex="2^{0+1}=2" /> at the top and <Katex tex="2^{-1+1}=1" /> at the bottom.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 3-\frac{2}{\log_e 2}}" />,
    reason: <>About <Katex tex="0.1146" />. An exact answer was required — the decimal earned nothing. The report notes <Katex tex="0.1196" /> was often given, which is a rounding-in-the-middle error.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2^{\,x+1}\log_e 2" />,
    reason: <>Differentiating <Katex tex="a^{u}" /> brings down <Katex tex="\log_e a" /> and then the chain rule on <Katex tex="x+1" />, whose derivative is <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="f'(0) = 2\log_e 2" />,
    reason: <>About <Katex tex="1.386" />, so steeper than the line <Katex tex="y=x" /> at the origin — which is exactly why the two curves cross there rather than touch.</>,
  },
  {
    working: <Katex display tex="\left(f^{-1}\right)'(0) = \frac{1}{f'(0)}" />,
    reason: <>Reflecting in <Katex tex="y=x" /> turns a gradient into its reciprocal. Both curves pass through the origin, so the point corresponds to itself and no extra substitution is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(0)=2\log_e2, \qquad \left(f^{-1}\right)'(0)=\frac{1}{2\log_e2}}" />,
    reason: <>Their product is <Katex tex="1" />, which is the check.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="2e^{kx}-2 = 2^{\,x+1}-2" />,
    reason: <>Setting the two rules equal for all <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2e^{kx} = 2\cdot 2^{x} \implies e^{kx}=2^{x}" />,
    reason: <>Writing <Katex tex="2^{x+1}=2\cdot2^x" /> makes the <Katex tex="2" />s cancel.</>,
  },
  {
    working: <Katex display tex="e^{kx} = \left(e^{\log_e 2}\right)^{x} = e^{\,x\log_e 2}" />,
    reason: <>Rewrite the base <Katex tex="2" /> as <Katex tex="e^{\log_e2}" /> so both sides share a base.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \log_e 2}" />,
    reason: <>About <Katex tex="0.693" />. Every exponential is a natural exponential in disguise; <Katex tex="k" /> is just the log of the old base.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="x = 2e^{ky}-2" />,
    reason: <>Swap and solve, as in part (b). Note this is <Katex tex="g_k" /> for a general <Katex tex="k" />, not the specific <Katex tex="\log_e2" /> from part (e) — the report says using that value here was a common error.</>,
  },
  {
    working: <Katex display tex="\frac{x+2}{2} = e^{ky}" />,
    reason: <>Isolating the exponential.</>,
  },
  {
    working: <Katex display tex="\log_e\!\left(\frac{x+2}{2}\right) = ky" />,
    reason: <>Natural log of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{g_k^{-1}(x) = \frac1k\log_e\!\left(\frac{x+2}{2}\right)}" />,
    reason: <>Domain <Katex tex="(-2,\infty)" />, the range of <Katex tex="g_k" />. Check at <Katex tex="x=0" />: <Katex tex="\tfrac1k\log_e(1)=0" /> ✓, so every one of these inverses passes through the origin too.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="g_1(x)=2e^{x}-2 \;\longrightarrow\; g_k(x)=2e^{kx}-2" />,
    reason: <>Only the <Katex tex="x" /> inside has changed, so whatever happens is horizontal.</>,
  },
  {
    working: <Katex display tex="g_k(x) = g_1(kx)" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="kx" /> squashes the graph horizontally by a factor of <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dilation of factor } \tfrac1k \text{ from the } y\text{-axis}}" />,
    reason: <>The wording matters: <em>from</em> the <Katex tex="y" />-axis (equivalently, parallel to the <Katex tex="x" />-axis). The report rejects "in the <Katex tex="y" />-axis" as a description.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="g_1^{-1}(x)=\log_e\!\left(\frac{x+2}{2}\right) \;\longrightarrow\; g_k^{-1}(x)=\frac1k\log_e\!\left(\frac{x+2}{2}\right)" />,
    reason: <>This time the <Katex tex="\tfrac1k" /> multiplies the whole output, so the change is vertical.</>,
  },
  {
    working: <Katex display tex="g_k^{-1}(x) = \frac1k\,g_1^{-1}(x)" />,
    reason: <>Which is exactly the definition of a vertical dilation.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dilation of factor } \tfrac1k \text{ from the } x\text{-axis}}" />,
    reason: <>The mirror image of part (g)(i), as it must be: reflecting in <Katex tex="y=x" /> swaps horizontal dilations for vertical ones.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="g_k'(x)=2ke^{kx} \implies g_k'(0)=2k" />,
    reason: <>Both curves pass through the origin, so both tangents there pass through the origin too.</>,
  },
  {
    working: <Katex display tex="L_1: y=2kx, \qquad L_2: y=\frac{x}{2k}" />,
    reason: <>The second gradient is the reciprocal of the first, by the reflection property from part (d).</>,
  },
  {
    working: <Katex display tex="\tan(\beta)=2k, \qquad \tan(\gamma)=\frac{1}{2k}=\tan(90^\circ-\beta)" />,
    reason: <>So <Katex tex="\gamma=90^\circ-\beta" />: the two lines are equally inclined to <Katex tex="y=x" />, one above and one below.</>,
  },
  {
    working: <Katex display tex="|\beta-\gamma| = |2\beta-90^\circ| = 30^\circ" />,
    reason: <>The angle between them. The absolute value is what produces two answers — missing it is why the report says most students found only one.</>,
  },
  {
    working: <Katex display tex="\beta=60^\circ \text{ or } \beta=30^\circ" />,
    reason: <>The two cases.</>,
  },
  {
    working: <Katex display tex="2k=\tan(60^\circ)=\sqrt3 \quad\text{or}\quad 2k=\tan(30^\circ)=\frac{1}{\sqrt3}" />,
    reason: <>Back to <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k=\frac{\sqrt3}{2} \quad\text{or}\quad k=\frac{\sqrt3}{6}}" />,
    reason: <>Exact values were required. Note the two are reciprocal-related through <Katex tex="4k_1k_2=1" /> — swapping <Katex tex="k" /> for <Katex tex="\tfrac{1}{4k}" /> swaps the roles of the two tangents.</>,
  },
]

const ROWS_II: WorkingRow[] = [
  {
    working: <Katex display tex="g_k(x)=g_k^{-1}(x) \iff g_k(x)=x" />,
    reason: <><Katex tex="g_k" /> is increasing for every <Katex tex="k>0" />, so all intersections lie on <Katex tex="y=x" />. The report says many students went after a discriminant instead, which does not apply to an exponential.</>,
  },
  {
    working: <Katex display tex="h(x) = 2e^{kx}-2-x, \qquad h(0)=0" />,
    reason: <>The origin is always a solution, whatever <Katex tex="k" /> is. The question is whether there are others.</>,
  },
  {
    working: <Katex display tex="h'(x) = 2ke^{kx}-1, \qquad h'(0)=2k-1" />,
    reason: <><Katex tex="h" /> is convex (<Katex tex="h''=2k^2e^{kx}>0" />), so it has one turning point and at most two zeros. There is exactly one zero precisely when the turning point <em>is</em> the zero at the origin.</>,
  },
  {
    working: <Katex display tex="2k-1=0" />,
    reason: <>Equivalently: the tangent to <Katex tex="g_k" /> at the origin has gradient <Katex tex="2k" />, and it must equal the gradient <Katex tex="\tfrac{1}{2k}" /> of the inverse's tangent — the two curves touch instead of crossing.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \frac12}" />,
    reason: <>For <Katex tex="k>\tfrac12" /> the curve is steeper than <Katex tex="y=x" /> at the origin and dips below it to the left, picking up a second crossing; for <Katex tex="k<\tfrac12" /> it dips below to the right instead. Only at <Katex tex="k=\tfrac12" /> is the origin the sole solution.</>,
  },
]

const ROWS_IIII: WorkingRow[] = [
  {
    working: <Katex display tex="y=-2 \text{ is the asymptote of } g_k, \qquad x=-2 \text{ is the asymptote of } g_k^{-1}" />,
    reason: <>Reflections of each other in <Katex tex="y=x" />, and neither moves as <Katex tex="k" /> changes — only the steepness does.</>,
  },
  {
    working: <Katex display tex="k\to\infty \implies g_k(x)\to-2 \text{ for } x<0" />,
    reason: <>A larger <Katex tex="k" /> makes the exponential collapse faster, so the curve hugs its asymptote sooner and the second intersection slides towards <Katex tex="(-2,-2)" />.</>,
  },
  {
    working: <Katex display tex="A(k) \to \text{area of the square with corners } (-2,-2) \text{ and } (0,0)" />,
    reason: <>In the limit the two curves become the two asymptotes, enclosing a <Katex tex="2\times2" /> square with the origin.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 4}" />,
    reason: <><Katex tex="A(k)" /> increases with <Katex tex="k" /> and approaches <Katex tex="4" /> without reaching it — <Katex tex="A(2)\approx2.04" />, <Katex tex="A(5)\approx3.20" />, <Katex tex="A(20)\approx3.80" /> — so <Katex tex="4" /> is the smallest bound that works.</>,
  },
]

export default function MethodsQ4_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (18 marks)</p>
        <p className="mb-3">
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=2^{\,x+1}-2" />. Part of the graph of{' '}
          <Katex tex="f" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Graph of y = 2^(x+1) − 2 rising through the origin, with a dashed horizontal asymptote at y = −2, from the original 2017 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            The transformation <Katex tex="T:R^2\to R^2" />,{' '}
            <Katex tex="T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}c\\d\end{bmatrix}" />{' '}
            maps the graph of <Katex tex="y=2^{x}" /> onto the graph of <Katex tex="f" />.
            State the values of <Katex tex="c" /> and <Katex tex="d" />.
          </>
        }
        examinerReport={EXAM_A}
        videoSrc={VIDEO.a}
      >
        <Background title="On the matrix notation">
          <p>
            Transformation matrices are no longer on the study design. This one adds a fixed
            vector to every point, which is just a translation: <Katex tex="c" /> across and{' '}
            <Katex tex="d" /> up. A current paper would say "the graph of{' '}
            <Katex tex="y=2^x" /> is translated <Katex tex="c" /> units horizontally and{' '}
            <Katex tex="d" /> units vertically" and the working would be identical. The skip
            guide lists this part as doable for exactly that reason.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the rule and domain for <Katex tex="f^{-1}" />, the inverse function of{' '}
            <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_B}
        videoSrc={VIDEO.b}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Find the area bounded by the graphs of <Katex tex="f" /> and{' '}
            <Katex tex="f^{-1}" />.
          </>
        }
        examinerReport={EXAM_C}
        videoSrc={VIDEO.c}
      >
        <Background title="The y = x shortcut">
          <p>
            A function and its inverse are mirror images in <Katex tex="y=x" />. Two
            consequences run through the rest of this question.
          </p>
          <p>
            First, if the function is <em>increasing</em>, then every intersection of the two
            graphs lies on <Katex tex="y=x" /> — so solve <Katex tex="f(x)=x" />, never the
            messier <Katex tex="f(x)=f^{-1}(x)" />.
          </p>
          <p>
            Second, the region between them is symmetric about <Katex tex="y=x" />, so the
            area is twice the area between <Katex tex="y=x" /> and either one of the curves.
            That halves the work and removes the bracket errors the report complains about.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the graphs of <Katex tex="f" /> and <Katex tex="f^{-1}" /> are shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={pairSrc}
            alt="The graphs of f and its inverse crossing at the origin and again in the third quadrant, with dashed asymptotes at y = −2 and x = −2, from the original 2017 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Find the gradient of <Katex tex="f" /> and the gradient of <Katex tex="f^{-1}" />{' '}
            at <Katex tex="x=0" />.
          </>
        }
        examinerReport={EXAM_D}
        videoSrc={VIDEO.d}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The functions <Katex tex="g_k" />, where <Katex tex="k\in R^+" />, are defined with
          domain <Katex tex="R" /> such that <Katex tex="g_k(x)=2e^{kx}-2" />.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="k" /> such that <Katex tex="g_k(x)=f(x)" />.
          </>
        }
        examinerReport={EXAM_E}
        videoSrc={VIDEO.e}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={1}
        statement={
          <>
            Find the rule for the inverse functions <Katex tex="g_k^{-1}" /> of{' '}
            <Katex tex="g_k" />, where <Katex tex="k\in R^+" />.
          </>
        }
        examinerReport={EXAM_F}
        videoSrc={VIDEO.f}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g.i"
        marks={1}
        statement={
          <>
            Describe the transformation that maps the graph of <Katex tex="g_1" /> onto the
            graph of <Katex tex="g_k" />.
          </>
        }
        examinerReport={EXAM_GI}
        videoSrc={VIDEO.g}
      >
        <WorkingTable rows={ROWS_GI} />
      </PartCard>

      <PartCard
        letter="g.ii"
        marks={1}
        statement={
          <>
            Describe the transformation that maps the graph of <Katex tex="g_1^{-1}" /> onto
            the graph of <Katex tex="g_k^{-1}" />.
          </>
        }
        examinerReport={EXAM_GII}
        videoSrc={VIDEO.g}
      >
        <WorkingTable rows={ROWS_GII} />
      </PartCard>

      <PartCard
        letter="h"
        marks={2}
        statement={
          <>
            The lines <Katex tex="L_1" /> and <Katex tex="L_2" /> are the tangents at the
            origin to the graphs of <Katex tex="g_k" /> and <Katex tex="g_k^{-1}" />{' '}
            respectively. Find the value(s) of <Katex tex="k" /> for which the angle between{' '}
            <Katex tex="L_1" /> and <Katex tex="L_2" /> is <Katex tex="30^\circ" />.
          </>
        }
        examinerReport={EXAM_H}
        videoSrc={VIDEO.h}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>

      <PartCard
        letter="i.i"
        marks={2}
        statement={
          <>
            Let <Katex tex="p" /> be the value of <Katex tex="k" /> for which{' '}
            <Katex tex="g_k(x)=g_k^{-1}(x)" /> has only one solution. Find <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_II}
        videoSrc={VIDEO.ii}
      >
        <WorkingTable rows={ROWS_II} />
        <div>
          <p className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            On CAS the whole part is one line once you have set it up:
          </p>
          <div className="mt-2">
            <Cas fn="solve">solve(2k = 1/(2k), k) | k&gt;0</Cas>
          </div>
        </div>
      </PartCard>

      <PartCard
        letter="i.ii"
        marks={1}
        statement={
          <>
            Let <Katex tex="A(k)" /> be the area bounded by the graphs of <Katex tex="g_k" />{' '}
            and <Katex tex="g_k^{-1}" /> for all <Katex tex="k>p" />. State the smallest value
            of <Katex tex="b" /> such that <Katex tex="A(k)<b" />.
          </>
        }
        examinerReport={EXAM_IIII}
        videoSrc={VIDEO.iii}
      >
        <Background title="A limit, not an integral">
          <p>
            Only <Katex tex="2\%" /> of students scored this mark, and the reason is that it
            looks like an area question and is not. There is no <Katex tex="k" /> to
            integrate for — the answer is what the area tends towards as{' '}
            <Katex tex="k" /> grows.
          </p>
          <p>
            Both asymptotes are fixed at <Katex tex="-2" />, and a bigger <Katex tex="k" />{' '}
            only makes each curve reach its asymptote sooner. So the enclosed region fills
            out, but can never escape, the square with corners <Katex tex="(-2,-2)" /> and{' '}
            <Katex tex="(0,0)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_IIII} />
      </PartCard>
    </div>
  )
}
