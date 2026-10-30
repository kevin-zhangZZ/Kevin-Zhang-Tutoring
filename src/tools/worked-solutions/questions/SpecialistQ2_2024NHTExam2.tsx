// 2024 Specialist NHT — Exam 2, Section B Question 2 (11 marks). The NHT report gives a sample
// answer for each part only, with no statistics and no comments. De Moivre's theorem by induction
// step (compound-angle identities), the powers z_n = (1 − i)^n in polar form, z₃ and z₄ (plotted),
// the n for which Arg(z_n) = 0, the line |z| = |z − (a + bi)| through −2i and 1 − i, and the minor
// segment it cuts from the circle z z̄ = 10. Question text transcribed from the original paper.
// The Argand diagram (with VCAA's dots for z₁, z₂, z₃) is cropped from page 15 of the original
// VCAA exam PDF at 300 dpi (spec-2024nhte2-q2d-argand.png); the part d. answer is an SVG overlay
// on it, calibrated from the tick marks measured on the crop (origin at (419.5, 473), 70.65 px per
// unit on both axes), checked with a PIL composite: the computed z₁ and z₂ sit on VCAA's dots, and
// the radius-4 circle on VCAA's fourth ring. Part g.'s circle-and-chord figure is this site's own
// explanatory matplotlib figure (spec-2024nhte2-q2g-segment.png), not something VCAA printed.
// Answers checked with sympy and against the report's sample answers, which agree: b. (√2)ⁿ
// cis(−nπ/4); c. −2 − 2i; d. (−4, 0); e. n = 8k, k ∈ Z⁺; f. a = 2, b = −2; g. 7.07 (exactly
// 5 cos⁻¹(−3/5) − 4). Our part g. finds the chord's endpoints and the angle by scalar product;
// VCAA's sample answer gets the same angle from the perpendicular distance (shown in the working).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import argandSrc from './spec-2024nhte2-q2d-argand.png'
import segmentSrc from './spec-2024nhte2-q2g-segment.png'

// Calibration of VCAA's Argand diagram in the crop's own pixels (970 × 900).
const OX = 419.5
const OY = 473
const S = 70.65
const px = (x: number) => OX + x * S
const py = (y: number) => OY - y * S
const ORANGE = '#f97316'
const LABEL = { fontSize: 46, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

function ArgandAnswer() {
  const x = px(-4)
  const y = py(0)
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[400px]">
        <img loading="lazy" decoding="async" src={argandSrc}
          alt="VCAA's Argand diagram with the answer drawn over it: the point z₄ = −4 plotted on the negative real axis, on the fourth circle, beside VCAA's dots for z₁ = 1 − i, z₂ = −2i and z₃ = −2 − 2i"
          className="w-full block" />
        <svg viewBox="0 0 970 900" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx={x} cy={y} r={17} fill={ORANGE} />
          <text x={x + 6} y={y - 34} textAnchor="middle" {...LABEL}>z₄</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\big(\cos(\theta)+i\sin(\theta)\big)^{n+1} \\ &= \big(\cos(\theta)+i\sin(\theta)\big)^{n} \\ &\quad\times\big(\cos(\theta)+i\sin(\theta)\big) \end{aligned}" />,
    reason: <>Split off one factor (index laws), so that the given result for the power <Katex tex="n" /> can be used.</>,
  },
  {
    working: <Katex display tex="= \big(\cos(n\theta)+i\sin(n\theta)\big)\big(\cos(\theta)+i\sin(\theta)\big)" />,
    reason: <>The given result.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \cos(n\theta)\cos(\theta)+i\cos(n\theta)\sin(\theta) \\ &\quad + i\sin(n\theta)\cos(\theta)+i^2\sin(n\theta)\sin(\theta) \end{aligned}" />,
    reason: <>Expand the brackets term by term.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \big(\cos(n\theta)\cos(\theta)-\sin(n\theta)\sin(\theta)\big) \\ &\quad + i\big(\sin(n\theta)\cos(\theta)+\cos(n\theta)\sin(\theta)\big) \end{aligned}" />,
    reason: <>Use <Katex tex="i^2=-1" /> and collect the real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \cos(n\theta+\theta)+i\sin(n\theta+\theta) \\ &= \cos\big((n+1)\theta\big)+i\sin\big((n+1)\theta\big) \end{aligned}" />,
    reason: <>The compound-angle identities <Katex tex="\cos(A+B)=\cos A\cos B-\sin A\sin B" /> and <Katex tex="\sin(A+B)=\sin A\cos B+\cos A\sin B" />, with <Katex tex="A=n\theta" />, <Katex tex="B=\theta" />. These are the &ldquo;appropriate trigonometric identities&rdquo; the question asks for. As required.</>,
    more: <>This is the inductive step in a proof of de Moivre&apos;s theorem: true for <Katex tex="n" /> implies true for <Katex tex="n+1" />, and it is obviously true for <Katex tex="n=1" />. The marks are for showing the expansion and naming the identities, so don&apos;t skip the line where the real and imaginary parts are collected.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} |1-i| = \sqrt{1+1} = \sqrt2 \\ \operatorname{Arg}(1-i) = -\frac{\pi}{4} \end{gathered}" />,
    reason: <><Katex tex="1-i" /> is in the fourth quadrant (real part positive, imaginary part negative), at <Katex tex="45^\circ" /> below the real axis.</>,
  },
  {
    working: <Katex display tex="1-i = \sqrt2\,\text{cis}\left(-\frac{\pi}{4}\right)" />,
    reason: <>Polar form <Katex tex="r\,\text{cis}(\theta)" />, with modulus <Katex tex="r=\sqrt2" /> and argument <Katex tex="\theta=-\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z_n = \left(\sqrt2\right)^n\text{cis}\left(-\frac{n\pi}{4}\right)}" />,
    reason: <>De Moivre&apos;s theorem (part a.): raising to the power <Katex tex="n" /> raises the modulus to the power <Katex tex="n" /> and multiplies the argument by <Katex tex="n" />.</>,
    more: <><Katex tex="-\tfrac{n\pi}{4}" /> is an argument of <Katex tex="z_n" />, not always the principal one: for <Katex tex="n=5" /> it is <Katex tex="-\tfrac{5\pi}{4}" />, whose principal value is <Katex tex="\tfrac{3\pi}{4}" />. That is fine here, because polar form only needs <em>an</em> argument. Also fine: <Katex tex="2^{n/2}" /> for the modulus.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} z_3 &= 2\sqrt2\,\text{cis}\left(-\frac{3\pi}{4}\right) \\ &= 2\sqrt2\left(-\frac{1}{\sqrt2}-\frac{1}{\sqrt2}i\right) \end{aligned}" />,
    reason: <>Part b. with <Katex tex="n=3" />. <Katex tex="-\tfrac{3\pi}{4}" /> is in the third quadrant, so cosine and sine are both <Katex tex="-\tfrac{1}{\sqrt2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z_3 = -2-2i}" />,
    reason: <>Check by multiplying out: <Katex tex="(1-i)^2=1-2i+i^2=-2i" />, and <Katex tex="-2i(1-i)=-2i+2i^2=-2-2i" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="z_4 = \left(\sqrt2\right)^4\text{cis}\left(-\pi\right) = 4\times(-1) = -4" />,
    reason: <>Part b. with <Katex tex="n=4" />: modulus 4, argument <Katex tex="-\pi" />, which points along the negative real axis.</>,
    more: <>Each power multiplies the modulus by <Katex tex="\sqrt2" /> and turns <Katex tex="45^\circ" /> clockwise: <Katex tex="z_1" />, <Katex tex="z_2" />, <Katex tex="z_3" /> on the diagram step round that way, and <Katex tex="z_4" /> is the next step. Or directly: <Katex tex="z_4=(z_2)^2=(-2i)^2=-4" />.</>,
  },
  {
    working: <ArgandAnswer />,
    reason: <>Plot <Katex tex="z_4" /> at <Katex tex="(-4,0)" />: on the negative real axis, on the fourth circle out.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z_n)=0 \iff -\frac{n\pi}{4} = 2\pi k, \quad k\in Z" />,
    reason: <><Katex tex="\operatorname{Arg}" /> is the principal argument, the one in <Katex tex="(-\pi,\pi]" />. <Katex tex="\operatorname{Arg}(z_n)=0" /> means <Katex tex="z_n" /> is on the positive real axis. The argument from part b., <Katex tex="-\tfrac{n\pi}{4}" />, need not be principal, so it must be a whole number of turns, a multiple of <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="n = -8k" />,
    reason: <>Multiply both sides by <Katex tex="-\tfrac{4}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 8m, \ m\in Z^+, \ \text{that is, } n = 8, 16, 24, \ldots}" />,
    reason: <>Since <Katex tex="n\in Z^+" />, only the negative <Katex tex="k" /> give an allowed <Katex tex="n" />. Writing <Katex tex="m=-k" /> (a positive integer) gives <Katex tex="n=8m" />, a positive multiple of 8. Check: <Katex tex="z_8=\left(\sqrt2\right)^8\text{cis}(-2\pi)=16" />, a positive real number.</>,
    more: <>VCAA&apos;s sample answer writes this as <Katex tex="n=8k" /> where <Katex tex="k\in Z^+" />, or lists <Katex tex="8,16,24,\ldots" />. Notice that <Katex tex="n=4" /> does not work: <Katex tex="z_4=-4" /> is real but negative, and its argument is <Katex tex="\pi" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = |z-(a+bi)|" />,
    reason: <>Every point the same distance from <Katex tex="0" /> and from <Katex tex="w=a+bi" />: the perpendicular bisector of the segment from <Katex tex="O" /> to <Katex tex="w" />. So <Katex tex="w" /> is the mirror image of <Katex tex="O" /> in the line <Katex tex="L" />.</>,
  },
  {
    working: <Katex display tex="L \text{ through } (0,-2) \text{ and } (1,-1): \quad y = x-2" />,
    reason: <>Gradient <Katex tex="\tfrac{-1-(-2)}{1-0}=1" />, <Katex tex="y" />-intercept <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="y=-x \ \text{ meets } \ y=x-2 \ \text{ at } \ (1,-1)" />,
    reason: <>The perpendicular from <Katex tex="O" /> to <Katex tex="L" /> has gradient <Katex tex="-1" />. Solving <Katex tex="-x=x-2" /> gives <Katex tex="x=1" />. That foot of the perpendicular is the midpoint of <Katex tex="O" /> and <Katex tex="w" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} w = 2\times(1-i) = 2-2i \\ \boxed{a=2, \quad b=-2} \end{gathered}" />,
    reason: <>The midpoint is halfway, so <Katex tex="w" /> is twice as far along. Check: <Katex tex="|-2i|=2" /> and <Katex tex="|-2i-(2-2i)|=|-2|=2" />; <Katex tex="|1-i|=\sqrt2" /> and <Katex tex="|(1-i)-(2-2i)|=|-1+i|=\sqrt2" />.</>,
    more: <>Algebraic route: both points satisfy <Katex tex="|z|^2=|z-w|^2" />, giving <Katex tex="a^2+(b+2)^2=4" /> and <Katex tex="(1-a)^2+(1+b)^2=2" />. Subtracting gives <Katex tex="b=-a" />, then <Katex tex="2a^2-4a=0" />. Reject <Katex tex="a=0" />: then <Katex tex="w=0" /> and <Katex tex="|z|=|z|" /> is the whole plane, not a line.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="z\overline{z} = |z|^2 = 10 \implies |z| = \sqrt{10}" />,
    reason: <><Katex tex="z\overline{z}=x^2+y^2" />, so this is the circle centred at <Katex tex="O" /> with radius <Katex tex="\sqrt{10}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x^2+(x-2)^2=10 \\ &\implies 2x^2-4x-6=0 \\ &\implies (x-3)(x+1)=0 \end{aligned}" />,
    reason: <>Find where <Katex tex="L" /> (<Katex tex="y=x-2" /> from part f.) cuts the circle <Katex tex="x^2+y^2=10" />: these are the ends of the chord.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{chord from } 3+i \text{ to } -1-3i" />
        <div className="mt-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={segmentSrc}
            alt="This site's own explanatory figure: the circle of radius √10 centred at the origin, the line L cutting it at 3 + i and −1 − 3i, dashed radii to both points with the angle θ between them at the origin, and the minor segment below and to the right of L shaded"
            className="w-full max-w-[340px]"
          />
        </div>
      </>
    ),
    reason: <><Katex tex="x=3" /> gives <Katex tex="y=1" />; <Katex tex="x=-1" /> gives <Katex tex="y=-3" />. The minor segment is the smaller piece, on the side of <Katex tex="L" /> away from the centre.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{(3,1)\cdot(-1,-3)}{\sqrt{10}\,\sqrt{10}} = \frac{-3-3}{10} = -\frac35" />,
    reason: <>The angle <Katex tex="\theta" /> at the centre between the two radii, by the scalar product. It is obtuse but less than <Katex tex="\pi" />, so it is the angle of the minor segment.</>,
    more: <>VCAA&apos;s route: the foot of the perpendicular from <Katex tex="O" /> to <Katex tex="L" /> is <Katex tex="1-i" /> (part f.), at distance <Katex tex="\sqrt2" />, so half the angle satisfies <Katex tex="\cos\left(\tfrac{\theta}{2}\right)=\tfrac{\sqrt2}{\sqrt{10}}" /> and <Katex tex="\theta=2\cos^{-1}\left(\tfrac{\sqrt2}{\sqrt{10}}\right)" />. Same angle.</>,
  },
  {
    working: <Katex display tex="\theta = \cos^{-1}\left(-\frac35\right) = 2.2142\ldots, \qquad \sin(\theta) = \frac45" />,
    reason: <><Katex tex="\theta" /> is between <Katex tex="\tfrac{\pi}{2}" /> and <Katex tex="\pi" />, so its sine is positive: <Katex tex="\sqrt{1-\tfrac{9}{25}}=\tfrac45" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A &= \tfrac12r^2\theta-\tfrac12r^2\sin(\theta) \\ &= 5\left(\theta-\tfrac45\right) \\ &= 5\cos^{-1}\left(-\tfrac35\right)-4 \end{aligned}" />,
    reason: <>Segment = sector − triangle. The sector is <Katex tex="\tfrac12r^2\theta" /> (with <Katex tex="\theta" /> in radians) and the triangle formed by the two radii and the chord is <Katex tex="\tfrac12r^2\sin(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 7.07}" />,
    reason: <><Katex tex="7.0714\ldots" />, correct to two decimal places. Keep <Katex tex="\theta" /> unrounded until the end.</>,
    more: <>Sanity check: the whole circle is <Katex tex="10\pi\approx31.4" />. The chord passes <Katex tex="\sqrt2\approx1.41" /> from the centre, less than half the radius 3.16, so the minor segment is a sizeable piece, a bit under a quarter of the circle.</>,
  },
]

export default function SpecialistQ2_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts a. to e. are about powers of one complex number. In polar form, multiplying
              multiplies the moduli and adds the arguments, so <Katex tex="(1-i)^n" /> is a spiral of
              points: each one <Katex tex="\sqrt2" /> times further out and a further{' '}
              <Katex tex="45^\circ" /> clockwise.
            </p>
            <p>
              Parts f. and g. switch to loci. <Katex tex="|z-w_1|=|z-w_2|" /> is the perpendicular
              bisector of <Katex tex="w_1" /> and <Katex tex="w_2" />, and{' '}
              <Katex tex="z\overline{z}=r^2" /> is a circle of radius <Katex tex="r" /> about the origin.
              Converting both to Cartesian form turns part g. into a coordinate geometry question.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="De Moivre's Theorem"
        marks={2}
        statement={
          <>
            Given <Katex tex="\big(\cos(\theta)+i\sin(\theta)\big)^n=\cos(n\theta)+i\sin(n\theta)" /> for{' '}
            <Katex tex="n\in Z^+" />, show, using appropriate trigonometric identities, that
            <br />
            <Katex tex="\big(\cos(\theta)+i\sin(\theta)\big)^{n+1}=\cos\big((n+1)\theta\big)+i\sin\big((n+1)\theta\big)" /> for{' '}
            <Katex tex="n\in Z^+" />
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="z_n=(1-i)^n,\ n\in Z^+" />
        </p>
      </div>

      <PartCard letter="b" topic="Polar Form" marks={1} statement={<>Express <Katex tex="z_n" /> in polar form.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Cartesian Form"
        marks={1}
        statement={<>Express <Katex tex="z_3" /> in the form <Katex tex="a+bi" />, where <Katex tex="a,b\in R" />.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The points representing <Katex tex="z_1" />, <Katex tex="z_2" /> and <Katex tex="z_3" /> are
          shown on the Argand diagram below.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Argand Diagram"
        marks={1}
        statement={
          <>
            <p>
              Plot the point that represents <Katex tex="z_4" />.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={argandSrc}
                alt="Argand diagram from the original VCAA exam paper: circles of radius 1 to 5 about the origin, the lines y = x and y = −x, real axis numbered −4, −2, 2, 4, and dots at z₁ = 1 − i, z₂ = −2i and z₃ = −2 − 2i"
                className="w-full max-w-[380px]"
              />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Argument"
        marks={2}
        statement={
          <>
            For what values of <Katex tex="n" /> will <Katex tex="\operatorname{Arg}(z_n)=0" /> where{' '}
            <Katex tex="z_n=(1-i)^n,\ n\in Z^+" />?
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Set the argument equal to 0"
          working={<Katex display tex="-\frac{n\pi}{4}=0 \implies n=0" />}
        >
          <Katex tex="n=0" /> is not a positive integer, and this misses every real answer. The
          argument <Katex tex="-\tfrac{n\pi}{4}" /> from part b. grows with <Katex tex="n" />, so it
          is not the principal argument; <Katex tex="\operatorname{Arg}(z_n)=0" /> needs it to be any
          whole number of turns, <Katex tex="2\pi k" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-1">
        <p>
          Let <Katex tex="L" /> be the line defined by{' '}
          <Katex tex="L:\{z: |z|=|z-(a+bi)|,\ z\in C \text{ and } a,b\in R\}" />.
        </p>
        <p>
          <Katex tex="L" /> passes through the points that represent <Katex tex="-2i" /> and{' '}
          <Katex tex="1-i" />.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Line Locus"
        marks={1}
        statement={<>Find the values of <Katex tex="a" /> and <Katex tex="b" />.</>}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Area of a Segment"
        marks={3}
        statement={
          <>
            Find the area of the minor segment bounded by the circle <Katex tex="z\overline{z}=10" /> and
            the line <Katex tex="L" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
