// 2023 Specialist Mathematics — Exam 2, Section B Question 2 (10 marks). The seventh roots
// of unity: listing them, plotting them, a ray between two of them, and the identity their
// real parts satisfy. Question text transcribed from the original paper; the Argand diagram
// is a crop of VCAA's own artwork (300 dpi), and the part c. and d.i. answers are SVG overlays
// on it (never a redrawing). Calibration measured from the crop: origin at (512, 535.5),
// radius 330.5 px; checked with a PIL composite — the calibrated unit circle and the rays at
// multiples of π/7 lie exactly on VCAA's printed ones. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Widgets: d.ii spec-2023e2-q2dii-ray-angle (turn the ray from z = 1 in steps of π/14: Arg is
// measured from the positive real direction, so the triangle's 5π/14 misses and 9π/14 hits);
// f.ii spec-2023e2-q2fii-conjugate-pairs (step through pairing each power of w with its conjugate,
// each pair summing to 2cos(2kπ/7) on the real axis, the three sums reaching −1).
// Concise/Detailed review (Oct 2026): report commentary, checks and longer explanations moved
// into each row's `more`; both widgets audited and kept (they show exactly the report's errors).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import type { ReactNode } from 'react'
import argandSrc from './spec-2023e2-q2-argand.png'

const RayAngle = lazyWidget(() => import('../interactives/spec-2023e2-q2dii-ray-angle'))
const ConjugatePairs = lazyWidget(() => import('../interactives/spec-2023e2-q2fii-conjugate-pairs'))

const AX = 512
const AY = 535.5
const R = 330.5
const px = (x: number) => AX + x * R
const py = (y: number) => AY - y * R
const ORANGE = '#f97316'
const LABEL = { fontSize: 34, fill: '#c2410c', stroke: 'white', strokeWidth: 9, paintOrder: 'stroke' } as const
const ROOTS = [
  { label: 'cis(0)', lx: 1.07, ly: 0.1, anchor: 'start' },
  { label: 'cis(2π/7)', lx: 0.72, ly: 0.95, anchor: 'start' },
  { label: 'cis(4π/7)', lx: -0.3, ly: 1.25, anchor: 'end' },
  { label: 'cis(6π/7)', lx: -1.06, ly: 0.5, anchor: 'end' },
  { label: 'cis(8π/7)', lx: -1.06, ly: -0.58, anchor: 'end' },
  { label: 'cis(10π/7)', lx: -0.3, ly: -1.28, anchor: 'end' },
  { label: 'cis(12π/7)', lx: 0.7, ly: -1.02, anchor: 'start' },
] as const
const RAY_ANGLE = (9 * Math.PI) / 14

function ArgandFrame({ alt, children }: { alt: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img src={argandSrc} alt={alt} className="w-full block" />
        <svg viewBox="0 0 1140 1014" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {children}
        </svg>
      </div>
    </div>
  )
}

// Part c.: the seven roots plotted on VCAA's own Argand diagram.
function RootsOverlay() {
  return (
    <ArgandFrame alt="VCAA's Argand diagram with the answer drawn over it: seven points evenly spaced around the unit circle, at cis(0) = 1 and at cis(2π/7) through cis(12π/7), each on one of the printed rays">
      {ROOTS.map((r, k) => {
        const t = (2 * Math.PI * k) / 7
        return (
          <g key={r.label}>
            <circle cx={px(Math.cos(t))} cy={py(Math.sin(t))} r={12} fill={ORANGE} />
            <text x={px(r.lx)} y={py(r.ly) + 12} textAnchor={r.anchor} {...LABEL}>{r.label}</text>
          </g>
        )
      })}
    </ArgandFrame>
  )
}

// Part d.i.: the ray from the real root through cis(2π/7), on VCAA's own Argand diagram.
function RayOverlay() {
  const c = Math.cos(RAY_ANGLE)
  const s = Math.sin(RAY_ANGLE)
  return (
    <ArgandFrame alt="VCAA's Argand diagram with the answer drawn over it: a ray starting at an open circle at 1 on the real axis and passing up and to the left through cis(2π/7) on the unit circle">
      <line x1={px(1 + 0.04 * c)} y1={py(0.04 * s)} x2={px(1 + 1.64 * c)} y2={py(1.64 * s)} stroke={ORANGE} strokeWidth={6} />
      <circle cx={px(1)} cy={py(0)} r={13} fill="white" stroke={ORANGE} strokeWidth={5} />
      <circle cx={px(Math.cos((2 * Math.PI) / 7))} cy={py(Math.sin((2 * Math.PI) / 7))} r={10} fill={ORANGE} />
    </ArgandFrame>
  )
}

const EXAM_A: SAExaminerStats = { marks: [37, 63], average: 0.6 }

const EXAM_B: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      Most students were able to give at least some of the required solutions. Omitting{' '}
      <Katex tex="z=1" /> was a common error.
      <br />
      A range of equivalent polar forms were seen and accepted.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 12, 53],
  average: 1.2,
  comment: (
    <>
      The majority of students were aware that the roots of unity are evenly spaced around the
      unit circle. Those who answered Question 2b. correctly were usually able to do well
      here. Some students failed to recognise that the sectors shown had angles of{' '}
      <Katex tex="\tfrac\pi7" /> and incorrectly estimated the required locations.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = { marks: [58, 42], average: 0.4 }

const EXAM_DII: SAExaminerStats = {
  marks: [82, 18],
  average: 0.2,
  comment: (
    <>
      While many students correctly identified that <Katex tex="z_0=1" />, finding the correct
      angle was a challenge for most. A common incorrect angle was{' '}
      <Katex tex="\tfrac{5\pi}{14}" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [46, 54],
  average: 0.5,
  comment: (
    <>
      Most students expanded the brackets to attempt to show the resulting expression
      simplified to <Katex tex="z^7-1" />. A significant proportion of students attempted
      polynomial long division. While some were successful, many did not see the process
      through to completion.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [53, 47],
  average: 0.5,
  comment: (
    <>
      There were a range of approaches to this question. Most successful students correctly
      applied prior work, recognising equivalent trigonometric expressions. Students who
      appeared to use technology were sometimes unsuccessful in converting{' '}
      <Katex tex="2\sin\!\left(\tfrac{3\pi}{14}\right)" /> to a cosine equivalent.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [85, 8, 7],
  average: 0.2,
  comment: (
    <>
      This question was not well done. Many students were able to express the given equation
      in terms of powers of <Katex tex="w" /> but most students did not 'show that' the
      required result arose through a series of logical steps.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="w^7 = \left[\mathrm{cis}\!\left(\frac{2\pi}{7}\right)\right]^7 = \mathrm{cis}\!\left(\frac{14\pi}{7}\right)" />,
    reason: <>De Moivre's theorem: <Katex tex="\left[\mathrm{cis}(\theta)\right]^n = \mathrm{cis}(n\theta)" />, so multiply the argument by 7.</>,
  },
  {
    working: <Katex display tex="= \mathrm{cis}(2\pi) = \cos(2\pi)+i\sin(2\pi) = 1" />,
    reason: <>An argument of <Katex tex="2\pi" /> is one full turn, which lands back on 1.</>,
  },
  {
    working: <Katex display tex="\boxed{w^7-1 = 1-1 = 0}" />,
    reason: <>Substituting <Katex tex="z=w" /> makes <Katex tex="z^7-1" /> equal 0, so <Katex tex="w" /> is a root. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}z^7 &= 1 = \mathrm{cis}(2k\pi)\\ \implies z &= \mathrm{cis}\!\left(\frac{2k\pi}{7}\right),\\ k &= 0,1,\ldots,6\end{aligned}" />,
    reason: <>Write 1 in polar form: modulus 1, argument 0 plus any whole number of full turns, <Katex tex="2k\pi" />. Taking the 7th root (De Moivre) keeps the modulus at 1 and divides the argument by 7; <Katex tex="k=0" /> to <Katex tex="6" /> give seven different roots (<Katex tex="k=7" /> gives <Katex tex="\mathrm{cis}(2\pi)=1" /> again).</>,
    more: (
      <>
        Consecutive roots are <Katex tex="\tfrac{2\pi}{7}" /> apart, so they are evenly spaced round the unit circle.
        Every <Katex tex="k" /> beyond 6 repeats a root already found, and a degree-7 equation has exactly seven
        roots, so the list is complete.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{1,\ \mathrm{cis}\!\left(\tfrac{4\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{6\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{8\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{10\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{12\pi}{7}\right)}" />,
    reason: <>Every root except <Katex tex="w" /> itself (<Katex tex="k=1" />), including <Katex tex="k=0" />, which gives <Katex tex="z=1" />.</>,
    more: (
      <>
        The report notes omitting <Katex tex="z=1" /> was a common error. It is easy to miss because it does not look
        like a cis expression, but <Katex tex="\mathrm{cis}(0)=1" /> is one of the seven roots: <Katex tex="1^7=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Equivalently } 1,\ \mathrm{cis}\!\left(-\tfrac{2\pi}{7}\right),\\ &\mathrm{cis}\!\left(\pm\tfrac{4\pi}{7}\right),\ \mathrm{cis}\!\left(\pm\tfrac{6\pi}{7}\right)\end{aligned}" />,
    reason: <>The same six roots with principal arguments in <Katex tex="(-\pi,\pi]" />: subtract <Katex tex="2\pi" /> from each argument above <Katex tex="\pi" />, for example <Katex tex="\tfrac{12\pi}{7}-2\pi=-\tfrac{2\pi}{7}" />.</>,
    more: (
      <>
        The report notes a range of equivalent polar forms were seen and accepted, so either list is fine. This form
        is worth knowing: together with{' '}
        <Katex tex="w=\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" />, it shows the roots in the conjugate pairs{' '}
        <Katex tex="\mathrm{cis}(\pm\theta)" /> that part f. uses.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&|z| = 1 \text{ for every root}\\ &\implies \text{all on the unit circle}\end{aligned}" />,
    reason: <>Each root has modulus 1, from part b.</>,
  },
  {
    working: <Katex display tex="\text{Consecutive arguments differ by } \frac{2\pi}{7} = 2\times\frac{\pi}{7}" />,
    reason: <>Count the printed lines through <Katex tex="O" />: they make 14 equal sectors round the full turn, so each sector is <Katex tex="\tfrac{2\pi}{14}=\tfrac{\pi}{7}" />. Each root is therefore two lines round from the one before.</>,
    more: (
      <>
        The report notes some students failed to recognise that the sectors shown had angles of{' '}
        <Katex tex="\tfrac{\pi}{7}" /> and estimated the positions by eye instead. Counting lines puts every root
        exactly on a printed line, with nothing to estimate.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Start at } 1 \text{ and step round: } \tfrac{2\pi}{7},\ \tfrac{4\pi}{7},\ \ldots,\ \tfrac{12\pi}{7}" />,
    reason: <>The seven points form a regular heptagon inscribed in the unit circle, with one vertex at 1. Label every point with the root it represents.</>,
    more: (
      <>
        The question says &ldquo;plot <em>and label</em>&rdquo;: the report&apos;s general comments list part c. among the
        places where some students did not label the points meaningfully. Write the root itself next to each dot, as
        below; a dot alone does not say which root it is.
      </>
    ),
  },
  {
    working: <RootsOverlay />,
    reason: <>Plotted and labelled on the printed diagram: every root sits exactly where one of the printed lines meets the circle.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The real root is } z = 1" />,
    reason: <>From part b., the only root on the real axis.</>,
    more: (
      <>
        Check: <Katex tex="z=-1" /> is not a root, since <Katex tex="(-1)^7-1=-2" />. With an odd number of roots
        evenly spaced from 1, none lands on the negative real axis.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Ray from } 1 \text{ through } \mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" />,
    reason: <>It starts at 1, drawn as an open circle because 1 itself is not on the ray, and passes through the next root anticlockwise.</>,
    more: (
      <>
        Why open: the ray will be written <Katex tex="\mathrm{Arg}(z-1)=\theta" /> in part d.ii. At{' '}
        <Katex tex="z=1" />, <Katex tex="z-1=0" /> and <Katex tex="\mathrm{Arg}(0)" /> is undefined, so the starting
        point itself is not on the ray.
      </>
    ),
  },
  {
    working: <RayOverlay />,
    reason: <>Drawn on the printed diagram. A ray does not stop at <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" />: it continues beyond it, up and to the left.</>,
    more: (
      <>
        A ray has exactly one end point and goes on forever in one direction. Stopping at{' '}
        <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" /> draws a line segment, continuing back past 1 draws a
        whole line, and starting at <Katex tex="O" /> draws a different ray: none of these is what was asked.
      </>
    ),
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}(z-z_0) = \theta \ \text{ is a ray starting at } z_0 \implies z_0 = 1" />,
    reason: <>The ray in part d.i. starts at the real root, 1. Here <Katex tex="\theta" /> is the direction of the ray, measured anticlockwise from the positive real direction (pointing right) at <Katex tex="z_0" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\frac{2\pi}{7}\right)-1 = \left(\cos\tfrac{2\pi}{7}-1\right)+i\sin\tfrac{2\pi}{7}" />,
    reason: <>The step from 1 to <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" /> gives the direction of the ray. Its real part is negative (<Katex tex="\cos\tfrac{2\pi}{7}<1" />) and its imaginary part is positive, so the ray points up and to the left: <Katex tex="\tfrac{\pi}{2}<\theta<\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Triangle } O,\ 1,\ \mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)\text{:}\\ &\text{two sides of length 1,}\\ &\text{angle } \tfrac{2\pi}{7} \text{ at } O\end{aligned}" />,
    reason: <>To find the exact angle, draw in the centre <Katex tex="O" />. Both sides from <Katex tex="O" /> are radii, so the triangle is isosceles and its other two angles are equal.</>,
  },
  {
    working: <Katex display tex="\text{Angle at } 1 = \frac{\pi-\tfrac{2\pi}{7}}{2} = \frac{5\pi}{14}" />,
    reason: <>The angles of a triangle add to <Katex tex="\pi" />. This is the angle between the ray and the segment from 1 back to <Katex tex="O" />, which points in the <em>negative</em> real direction.</>,
  },
  {
    working: <Katex display tex="\theta = \pi-\frac{5\pi}{14} = \frac{9\pi}{14}" />,
    reason: <>Arg is measured from the <em>positive</em> real direction. That direction and the one back to <Katex tex="O" /> form a straight line (<Katex tex="\pi" />), so <Katex tex="\theta" /> is what is left of <Katex tex="\pi" />.</>,
    more: (
      <>
        The report notes <Katex tex="\tfrac{5\pi}{14}" /> was a common incorrect angle. That is the triangle&apos;s
        angle at 1, but it is measured from the line back to <Katex tex="O" /> (pointing left), not from the positive
        real direction (pointing right). It also fails the direction check above: <Katex tex="\tfrac{5\pi}{14}" /> is less
        than <Katex tex="\tfrac{\pi}{2}" />, so a ray at that angle would point up and to the right, away from{' '}
        <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" />. Turn the ray in the interactive below to see both
        angles.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Arg}(z-1) = \frac{9\pi}{14}}" />,
    reason: <>In the form asked for: <Katex tex="z_0=1" /> and <Katex tex="\theta=\tfrac{9\pi}{14}" />.</>,
    more: (
      <>
        Check numerically: <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)-1=-0.377+0.782i" />, a
        second-quadrant number with argument{' '}
        <Katex tex="\pi-\tan^{-1}\!\left(\tfrac{0.782}{0.377}\right)\approx2.020" />, and{' '}
        <Katex tex="\tfrac{9\pi}{14}\approx2.020" /> ✓.
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)" />,
    reason: <>Expand the left side and simplify it to <Katex tex="z^7-1" />.</>,
    more: (
      <>
        Expanding is quicker and safer than dividing <Katex tex="z^7-1" /> by <Katex tex="z-1" />: the report notes a
        significant proportion of students attempted polynomial long division and, while some were successful, many did
        not see the process through to completion.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}&= z^7+z^6+z^5+z^4+z^3+z^2+z\\ &\quad-z^6-z^5-z^4-z^3-z^2-z-1\end{aligned}" />,
    reason: <>Multiply every term of the bracket by <Katex tex="z" /> (first line), then by <Katex tex="-1" /> (second line).</>,
  },
  {
    working: <Katex display tex="\boxed{= z^7-1}" />,
    reason: <>Each of <Katex tex="z^6,z^5,\ldots,z" /> appears once with a plus and once with a minus, so they cancel, leaving <Katex tex="z^7-1" />. So <Katex tex="z^7-1=0" /> can be written as <Katex tex="(z-1)\left(z^6+\cdots+z+1\right)=0" />. As required.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\frac{12\pi}{7}\right) = \mathrm{cis}\!\left(\frac{12\pi}{7}-2\pi\right) = \mathrm{cis}\!\left(-\frac{2\pi}{7}\right)" />,
    reason: <>Taking away a full turn (<Katex tex="2\pi" />) does not move the point. Now the two terms have arguments <Katex tex="\pm\tfrac{2\pi}{7}" />: they are conjugates.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\mathrm{cis}(\theta)+\mathrm{cis}(-\theta)\\ &= \cos\theta+i\sin\theta\\ &\quad+\cos\theta-i\sin\theta\\ &= 2\cos\theta\end{aligned}" />,
    reason: <>Using <Katex tex="\cos(-\theta)=\cos\theta" /> and <Katex tex="\sin(-\theta)=-\sin\theta" />, the imaginary parts cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{cis}\!\left(\frac{2\pi}{7}\right)+\mathrm{cis}\!\left(\frac{12\pi}{7}\right) = 2\cos\!\left(\frac{2\pi}{7}\right)}" />,
    reason: <>With <Katex tex="\theta=\tfrac{2\pi}{7}" />, this is <Katex tex="A\cos(B\pi)" /> with <Katex tex="A=2" /> and <Katex tex="B=\tfrac27" />, both positive as required.</>,
    more: (
      <>
        The report notes students who appeared to use technology were sometimes unsuccessful in converting{' '}
        <Katex tex="2\sin\!\left(\tfrac{3\pi}{14}\right)" /> (the form a CAS may give) to a cosine equivalent. Use{' '}
        <Katex tex="\sin x=\cos\!\left(\tfrac{\pi}{2}-x\right)" />:{' '}
        <Katex tex="\sin\tfrac{3\pi}{14}=\cos\!\left(\tfrac{7\pi}{14}-\tfrac{3\pi}{14}\right)=\cos\tfrac{4\pi}{14}=\cos\tfrac{2\pi}{7}" />.
        Working by hand from the conjugate pair, as above, avoids the conversion altogether.
      </>
    ),
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="w \ne 1 \implies w^6+w^5+w^4+w^3+w^2+w+1 = 0" />,
    reason: <>We are given <Katex tex="(w-1)\left(w^6+\cdots+w+1\right)=0" />. Since <Katex tex="w=\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)\ne1" />, the first factor is not 0, so by the null factor law the second factor is 0.</>,
  },
  {
    working: <Katex display tex="w^k = \left[\mathrm{cis}\!\left(\frac{2\pi}{7}\right)\right]^k = \mathrm{cis}\!\left(\frac{2k\pi}{7}\right)" />,
    reason: <>De Moivre's theorem, as the question asks: this turns each power of <Katex tex="w" /> into a cis expression.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\mathrm{cis}\!\left(\tfrac{12\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{10\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{8\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{6\pi}{7}\right)\\&\quad+\mathrm{cis}\!\left(\tfrac{4\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)+1 = 0\end{aligned}"
      />
    ),
    reason: <>Replace each power <Katex tex="w^k" /> in <Katex tex="w^6+\cdots+w+1=0" /> by <Katex tex="\mathrm{cis}\!\left(\tfrac{2k\pi}{7}\right)" />, for <Katex tex="k=6,5,\ldots,1" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\left[\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{12\pi}{7}\right)\right]+\left[\mathrm{cis}\!\left(\tfrac{4\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{10\pi}{7}\right)\right]\\&\quad+\left[\mathrm{cis}\!\left(\tfrac{6\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{8\pi}{7}\right)\right] = -1\end{aligned}"
      />
    ),
    reason: <>The target has cosines, and part f.i. showed a root plus its conjugate is <Katex tex="2\cos\theta" />, so group each root with its conjugate: <Katex tex="\tfrac{12\pi}{7}=2\pi-\tfrac{2\pi}{7}" />, <Katex tex="\tfrac{10\pi}{7}=2\pi-\tfrac{4\pi}{7}" /> and <Katex tex="\tfrac{8\pi}{7}=2\pi-\tfrac{6\pi}{7}" />. Move the 1 to the right side.</>,
    more: (
      <>
        The root 1 is left unpaired: it lies on the real axis, so it is its own conjugate. That is why the right side
        becomes <Katex tex="-1" /> rather than 0.
      </>
    ),
  },
  {
    working: <Katex display tex="2\cos\!\left(\frac{2\pi}{7}\right)+2\cos\!\left(\frac{4\pi}{7}\right)+2\cos\!\left(\frac{6\pi}{7}\right) = -1" />,
    reason: <>Each bracket is <Katex tex="\mathrm{cis}(\theta)+\mathrm{cis}(2\pi-\theta)=\mathrm{cis}(\theta)+\mathrm{cis}(-\theta)=2\cos\theta" />, the same working as part f.i.</>,
    more: (
      <>
        On the Argand diagram, each pair added as vectors lands on the real axis, because the imaginary parts cancel.
        Step through the three pairs in the interactive below to see where each lands and how the three add to{' '}
        <Katex tex="-1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\cos\!\left(\frac{2\pi}{7}\right)+\cos\!\left(\frac{4\pi}{7}\right)+\cos\!\left(\frac{6\pi}{7}\right) = -\frac12}" />,
    reason: <>Divide both sides by 2. As required.</>,
    more: (
      <>
        The report notes many students were able to express the given equation in terms of powers of{' '}
        <Katex tex="w" />, but most did not show that the required result arose through a series of logical steps.
        The steps that carry the argument from there are De Moivre, pairing each root with its conjugate, and turning
        each pair into <Katex tex="2\cos\theta" />: each needs to be written down. A numerical check
        such as <Katex tex="0.6235-0.2225-0.9010=-0.5" /> confirms the result but does not show it.
      </>
    ),
  },
]

export default function SpecialistQ2_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
        <p>
          Let <Katex tex="w=\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The solutions of <Katex tex="z^n=1" /> (the <Katex tex="n" />th roots of unity) sit
              at the corners of a regular <Katex tex="n" />-sided polygon on the unit circle, one
              of them at <Katex tex="z=1" />. Two facts drive this question. They come in
              conjugate pairs, mirror images in the real axis (except <Katex tex="z=1" />). And
              for <Katex tex="z^7=1" /> they add to zero: part e. shows every root other than 1
              satisfies <Katex tex="z^6+z^5+\cdots+z+1=0" />, and with <Katex tex="z=w" /> the
              terms <Katex tex="1,w,w^2,\ldots,w^6" /> are exactly the seven roots (part b.), so
              the seven roots add to zero.
            </p>
            <p>Part f. uses both facts to turn the sum of the roots into a sum of cosines.</p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Roots of Unity"
        marks={1}
        statement={<>Verify that <Katex tex="w" /> is a root of <Katex tex="z^7-1=0" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Roots of Unity"
        marks={1}
        statement={
          <>
            List the other roots of <Katex tex="z^7-1=0" /> in polar form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Argand Diagram"
        marks={2}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              On the Argand diagram below, plot and label the points that represent all the
              roots of <Katex tex="z^7-1=0" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={argandSrc}
                alt="An Argand diagram with the unit circle and rays through the origin every π/7 — from the original 2023 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Ray Locus"
        marks={1}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              On the Argand diagram below, sketch the ray that originates at the real root of{' '}
              <Katex tex="z^7-1=0" /> and passes through the point represented by{' '}
              <Katex tex="\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={argandSrc}
                alt="An Argand diagram with the unit circle and rays through the origin every π/7 — from the original 2023 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Ray Equation"
        marks={1}
        statement={
          <>
            Find the equation of this ray in the form{' '}
            <Katex tex="\mathrm{Arg}(z-z_0)=\theta" />, where{' '}
            <Katex tex="z_0\in C" />, and <Katex tex="\theta" /> is measured in
            radians in terms of <Katex tex="\pi" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Arg is measured from the positive real direction, not from the line back to O">
          <RayAngle />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Factorisation"
        marks={1}
        statement={
          <>
            Verify that the equation <Katex tex="z^7-1=0" /> can be expressed in the form{' '}
            <Katex tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)=0" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f.i"
        topic="Sum of Roots"
        marks={1}
        statement={
          <>
            Express{' '}
            <Katex tex="\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)+\mathrm{cis}\!\left(\dfrac{12\pi}{7}\right)" />{' '}
            in the form <Katex tex="A\cos(B\pi)" />, where{' '}
            <Katex tex="A,B\in R^+" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="De Moivre's Theorem"
        marks={2}
        statement={
          <>
            Given that <Katex tex="w=\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" /> satisfies{' '}
            <Katex tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)=0" />, use De Moivre's
            theorem to show that{' '}
            <Katex tex="\cos\!\left(\dfrac{2\pi}{7}\right)+\cos\!\left(\dfrac{4\pi}{7}\right)+\cos\!\left(\dfrac{6\pi}{7}\right)=-\dfrac12" />
            .
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
        <Explore title="Each root plus its conjugate is real: the three pairs add to −1">
          <ConjugatePairs />
        </Explore>
      </PartCard>
    </div>
  )
}
