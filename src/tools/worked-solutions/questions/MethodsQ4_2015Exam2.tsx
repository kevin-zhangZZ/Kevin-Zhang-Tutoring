// 2015 Mathematical Methods (CAS) — Exam 2, Section 2 Question 4 (9 marks).
// f(x)=2sin(x), g(x)=(1/2)sin(2x), h(x)=(1/3)sin(3x) on [0,2π] — areas between curves,
// graphing, transformations, and a generalisation to k(x)=m·sin(x), q(x)=(1/n)sin(nx).
// Question text transcribed from the original paper; both diagrams are cropped from the
// original VCAA exam PDF, and part b.'s answer is an SVG overlay on the cropped figure.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
//
// (Recatalogued from an earlier, incorrect "2014 Exam 1 Q4" attribution — the real 2014
// Exam 1 Q4 is an unrelated 2-mark "solve 2^(3x-3)=8^(2-x)" question, confirmed against
// that paper. This content matches 2015 Exam 2 Q4 exactly, confirmed against both the
// source PDF and its examiner report, whose stats are now included below.)

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import shadedGraphSrc from './meth-2015e2-q4-shaded-region.png'
import fAxesSrc from './meth-2015e2-q4b-f-axes.png'

const EXAM_A: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: <>This question was not answered well. Many students wrote <Katex tex="a=2" />.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 14, 67],
  average: 1.5,
  comment: (
    <>
      Many students drew accurate graphs. Some students did not have the <Katex tex="x" />
      -intercepts and turning points in the right positions. Most students drew one continuous
      curve, without any shading.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 24, 41],
  average: 1.1,
  comment: <>Many students did not give the correct wording when describing the dilations.</>,
}

const EXAM_DI: SAExaminerStats = {
  marks: [73, 16, 12],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Many students evaluated{' '}
      <Katex tex="\int_0^{2\pi}k(x)-q(x)\,dx" />. Many did not realise that when <Katex tex="n" /> is even,{' '}
      <Katex tex="\cos(n\pi)=1" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [81, 10, 9],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Many students did not realise that when{' '}
      <Katex tex="n" /> is odd, <Katex tex="\cos(n\pi)=-1" />.
    </>
  ),
}

const rowsA: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} 2\sin x &= \tfrac12\sin 2x \\ &= \sin x\cos x \end{aligned}" />
        <Katex display tex="\implies\; \sin x(2-\cos x)=0" />
      </>
    ),
    reason: (
      <>
        Find where <Katex tex="f" /> and <Katex tex="g" /> meet. Since <Katex tex="\cos x \le 1 < 2" />, the
        factor <Katex tex="(2-\cos x)" /> is never zero, so the only meeting points are{' '}
        <Katex tex="\sin x = 0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x = 0, \pi, 2\pi \quad \text{on } [0,2\pi]" />,
  },
  {
    working: (
      <Katex
        display
        tex="\int_0^{\pi}\!\Bigl(2\sin x-\tfrac12\sin 2x\Bigr)dx = \Bigl[-2\cos x+\tfrac14\cos 2x\Bigr]_0^{\pi} = 4"
      />
    ),
    reason: <><Katex tex="f\ge g" /> on <Katex tex="(0,\pi)" />, giving one shaded region of area 4; by symmetry the region on <Katex tex="(\pi,2\pi)" /> also has area 4.</>,
  },
  {
    working: <Katex display tex="\text{Total shaded area} = 4+4 = 8" />,
  },
  {
    working: <Katex display tex="a\int_0^\pi \sin x\,dx = a[-\cos x]_0^\pi = 2a" />,
    reason: <>The total area is given in the form <Katex tex="a\displaystyle\int_0^\pi \sin x\,dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2a=8 \implies a=4}" />,
    reason: <>The common wrong answer <Katex tex="a=2" /> gives an area of 4 — only one of the two shaded regions. A sanity check on the size: each region sits inside a <Katex tex="\pi\times2" /> box of area about 6.3, and covers well over half of it.</>,
  },
]

const rowsB: WorkingRow[] = [
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <LogoOverlay />
      </div>
    ),
    reason: (
      <>
        <Katex tex="h(x)=\tfrac13\sin 3x" /> has amplitude <Katex tex="\tfrac13" /> and period{' '}
        <Katex tex="\tfrac{2\pi}{3}" />, so it completes 3 full cycles over <Katex tex="[0,2\pi]" />, each
        reaching only <Katex tex="\pm\tfrac13" /> — much flatter and faster than <Katex tex="f" /> (shown
        in orange, on top of the real exam figure with <Katex tex="f" /> already drawn).
      </>
    ),
  },
]

const rowsC: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=2\sin x \;\xrightarrow{\ \times \frac13 \text{ horizontally}\ }\; 2\sin(3x)" />,
    reason: <>Dilation of factor <Katex tex="\tfrac13" /> from the <Katex tex="y" />-axis: replace <Katex tex="x" /> with <Katex tex="3x" />, compressing the period from <Katex tex="2\pi" /> to <Katex tex="\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="2\sin(3x) \;\xrightarrow{\ \times \frac16 \text{ vertically}\ }\; \tfrac13\sin(3x) = h(x)" />,
    reason: <>Dilation of factor <Katex tex="\tfrac16" /> from the <Katex tex="x" />-axis: multiply the output by <Katex tex="\tfrac16" />, shrinking the amplitude from 2 to <Katex tex="\tfrac13" />.</>,
  },
  {
    working: (
      <p>
        <b>Transformations:</b> a dilation of factor <Katex tex="\tfrac16" /> from the{' '}
        <Katex tex="x" />-axis, and a dilation of factor <Katex tex="\tfrac13" /> from the{' '}
        <Katex tex="y" />-axis.
      </p>
    ),
  },
]

const rowsDi: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = 2\int_0^\pi \bigl(k(x)-q(x)\bigr)\,dx" />,
    reason: <>Same meeting-point argument as part (a) applies for any positive integer <Katex tex="n" />: <Katex tex="k" /> and <Katex tex="q" /> only meet where <Katex tex="\sin x=0" />, i.e. at <Katex tex="x=0,\pi,2\pi" />, and the region on <Katex tex="(\pi,2\pi)" /> repeats the region on <Katex tex="(0,\pi)" />.</>,
  },
  {
    working: <Katex display tex="\int_0^\pi m\sin x\,dx = 2m, \qquad \int_0^\pi \tfrac1n\sin(nx)\,dx = \frac{1-\cos(n\pi)}{n^2}" />,
  },
  {
    working: <Katex display tex="n \text{ even} \;\implies\; \cos(n\pi)=1 \;\implies\; \int_0^\pi q(x)\,dx = 0" />,
    reason: 'For even n, q completes a whole number of full periods on (0,π), so its net signed area there is 0.',
  },
  {
    working: <Katex display tex="\text{Area} = 2\bigl(2m - 0\bigr) = 4m" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 4m + \dfrac{0}{n^2} \quad (b=0)}" />,
    reason: <>Consistent with part (a): <Katex tex="m=2,\ n=2" /> (even) gives <Katex tex="4(2)=8" />. ✓</>,
  },
]

const rowsDii: WorkingRow[] = [
  {
    working: <Katex display tex="n \text{ odd} \;\implies\; \cos(n\pi)=-1 \;\implies\; \int_0^\pi q(x)\,dx = \frac{2}{n^2}" />,
    reason: 'Reuse the general result from part (d)(i) with n odd instead.',
  },
  {
    working: <Katex display tex="\text{Area} = 2\left(2m-\frac{2}{n^2}\right) = 4m - \frac{4}{n^2}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 4m - \dfrac{4}{n^2} \quad (b=-4)}" />,
    reason: <>Check with <Katex tex="m=2" />, <Katex tex="n=3" /> (the design from part b.): <Katex tex="8-\tfrac49\approx7.6" />, a little less than part a.'s 8 because <Katex tex="h" /> now bulges slightly into the region above the axis on <Katex tex="(0,\pi)" />.</>,
  },
]

export default function MethodsQ4_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (9 marks)</p>
        <p className="mb-2">
          An electronics company is designing a new logo, based initially on the graphs of the
          functions <Katex tex="f(x)=2\sin(x)" /> and <Katex tex="g(x)=\tfrac12\sin(2x)" />, for{' '}
          <Katex tex="0 \le x \le 2\pi" />.
        </p>
        <p className="mb-2">
          These graphs are shown in the diagram below, in which the measurements in the{' '}
          <Katex tex="x" /> and <Katex tex="y" /> directions are in metres.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 mt-3 w-fit">
          <img
            src={shadedGraphSrc}
            alt="Graphs of f(x)=2sin(x) and g(x)=(1/2)sin(2x) on [0,2π], with the regions enclosed between them shaded, from the original 2015 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
        <p className="mt-3">
          The logo is to be painted onto a large sign, with the area enclosed by the graphs of the
          two functions (shaded in the diagram) to be painted red.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            The total area of the shaded regions, in square metres, can be calculated as{' '}
            <Katex tex="a\displaystyle\int_0^\pi \sin(x)\,dx" />. What is the value of{' '}
            <Katex tex="a" />?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={rowsA} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The electronics company considers changing the circular functions used in the design of
        the logo. Its next attempt uses the graphs of the functions <Katex tex="f(x)=2\sin(x)" />{' '}
        and <Katex tex="h(x)=\tfrac13\sin(3x)" />, for <Katex tex="0 \le x \le 2\pi" />.
      </div>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              On the axes below, the graph of <Katex tex="y=f(x)" /> has been drawn. On the same
              axes, draw the graph of <Katex tex="y=h(x)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={fAxesSrc}
                alt="Axes with y=2sin(x) already drawn on them, from the original 2015 VCAA exam paper"
                className="w-full max-w-[300px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" topic="Transformations" marks={2} statement={<>State a sequence of two transformations that maps the graph of <Katex tex="y=f(x)" /> to the graph of <Katex tex="y=h(x)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        The electronics company now considers using the graphs of the functions{' '}
        <Katex tex="k(x) = m\sin(x)" /> and <Katex tex="q(x) = \tfrac1n\sin(nx)" />, where{' '}
        <Katex tex="m" /> and <Katex tex="n" /> are positive integers with <Katex tex="m \ge 2" />{' '}
        and <Katex tex="0 \le x \le 2\pi" />.
      </div>

      <PartCard
        letter="d.i"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graphs of <Katex tex="y=k(x)" /> and{' '}
            <Katex tex="y=q(x)" /> in terms of <Katex tex="m" /> and <Katex tex="n" /> if{' '}
            <Katex tex="n" /> is even. Give your answer in the form <Katex tex="am+\dfrac{b}{n^2}" />, where <Katex tex="a" /> and <Katex tex="b" /> are integers.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={rowsDi} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graphs of <Katex tex="y=k(x)" /> and{' '}
            <Katex tex="y=q(x)" /> in terms of <Katex tex="m" /> and <Katex tex="n" /> if{' '}
            <Katex tex="n" /> is odd. Give your answer in the same form.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={rowsDii} />
      </PartCard>
    </div>
  )
}

// Overlays h(x)=(1/3)sin(3x) (orange, computed exactly via functionToPath) on top of the
// *real* cropped VCAA figure, which already has f(x)=2sin(x) drawn on it — rather than
// redrawing f itself. Pixel calibration (ox, oy, scaleX, scaleY) was measured directly off
// the real image: ox/oy from where the printed x- and y-axis lines cross, scaleX/scaleY
// cross-checked against the printed curve's own peak (π/2, 2) and trough (3π/2, −2) pixels
// — both agree to within ~1px, so the overlay lines up with the real image, not an
// approximation of it.
function LogoOverlay() {
  const ox = 116.5
  const oy = 544
  const scaleX = 167.75
  const scaleY = 251.5
  const toSvgX = (x: number) => ox + x * scaleX
  const toSvgY = (y: number) => oy - y * scaleY
  const h = (x: number) => (1 / 3) * Math.sin(3 * x)
  return (
    <div className="relative w-full max-w-[340px]">
      <img
        src={fAxesSrc}
        alt="Axes with y=2sin(x) already drawn on them, from the original 2015 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 1358 1091" className="absolute inset-0 w-full h-full">
        <path d={functionToPath(h, 0, 2 * Math.PI, toSvgX, toSvgY)} fill="none" stroke="#f97316" strokeWidth={5} />
      </svg>
    </div>
  )
}
