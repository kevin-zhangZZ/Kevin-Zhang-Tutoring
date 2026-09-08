// 2014 Mathematical Methods — Exam 1, Question 4 (9 marks).
// f(x)=2sin(x), g(x)=(1/2)sin(2x), h(x)=(1/3)sin(3x) on [0,2π] — areas between curves,
// graphing, transformations, and a generalisation to k(x)=m·sin(x), q(x)=(1/n)sin(nx).
// Question text transcribed from the original paper; worked solutions below are original.
// No video walkthrough yet — the tutor will record and add these later.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

export default function MethodsQ4_2014Exam1() {
  const rowsA: WorkingRow[] = [
    {
      working: <Katex display tex="2\sin x = \tfrac12\sin 2x = \sin x\cos x \;\implies\; \sin x(2-\cos x)=0" />,
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
      working: <Katex display tex="\text{Total shaded area} = 4+4=8" />,
    },
    {
      working: <Katex display tex="a\int_0^\pi \sin x\,dx = a[-\cos x]_0^\pi = 2a" />,
      reason: <>The total area is given in the form <Katex tex="a\displaystyle\int_0^\pi \sin x\,dx" />.</>,
    },
    {
      working: <Katex display tex="\boxed{2a=8 \implies a=4}" />,
    },
  ]

  const rowsB: WorkingRow[] = [
    {
      working: (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
          <SinLogoGraph showH />
        </div>
      ),
      reason: (
        <>
          <Katex tex="h(x)=\tfrac13\sin 3x" /> has amplitude <Katex tex="\tfrac13" /> and period{' '}
          <Katex tex="\tfrac{2\pi}{3}" />, so it completes 3 full cycles over <Katex tex="[0,2\pi]" />, each
          reaching only <Katex tex="\pm\tfrac13" /> — much flatter and faster than <Katex tex="f" /> or{' '}
          <Katex tex="g" />.
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
          <b>Transformations:</b> dilation of factor <Katex tex="\tfrac13" /> from the <Katex tex="y" />-axis
          (horizontal), then dilation of factor <Katex tex="\tfrac16" /> from the <Katex tex="x" />-axis
          (vertical).
        </p>
      ),
    },
  ]

  const rowsDi: WorkingRow[] = [
    {
      working: <Katex display tex="\int_0^{\pi} k(x)\,dx = \int_0^\pi m\sin x\,dx = 2m" />,
      reason: <>Same meeting-point argument as part (a) applies for any positive integer <Katex tex="n" />: <Katex tex="k" /> and <Katex tex="q" /> only meet where <Katex tex="\sin x=0" />, i.e. at <Katex tex="x=0,\pi,2\pi" />.</>,
    },
    {
      working: <Katex display tex="\int_0^\pi q(x)\,dx = \int_0^\pi \tfrac1n\sin(nx)\,dx = \frac{1}{n^2}\bigl[1-(-1)^n\bigr]" />,
    },
    {
      working: <Katex display tex="n \text{ even} \;\implies\; (-1)^n=1 \;\implies\; \int_0^\pi q(x)\,dx = 0" />,
      reason: 'For even n, q completes a whole number of full periods on (0,π), so its net signed area there is 0.',
    },
    {
      working: <Katex display tex="\text{Region on }(0,\pi) = 2m-0=2m" />,
    },
    {
      working: <Katex display tex="\text{Total area} = 2(2m) = 4m" />,
      reason: <>By the same symmetry as part (a), the region on <Katex tex="(\pi,2\pi)" /> repeats the region on <Katex tex="(0,\pi)" />.</>,
    },
    {
      working: <Katex display tex="\boxed{\text{Total Area} = 4m \quad (a=4,\ b=0)}" />,
      reason: <>Consistent with part (a): <Katex tex="m=2,\ n=2" /> (even) gives <Katex tex="4(2)=8" />. ✓</>,
    },
  ]

  const rowsDii: WorkingRow[] = [
    {
      working: <Katex display tex="n \text{ odd} \;\implies\; (-1)^n=-1 \;\implies\; \int_0^\pi q(x)\,dx = \frac{2}{n^2}" />,
      reason: 'Reuse the general result from part (d)(i) with n odd instead.',
    },
    {
      working: <Katex display tex="\text{Region on }(0,\pi) = 2m - \frac{2}{n^2}" />,
    },
    {
      working: <Katex display tex="\text{Total area} = 2\left(2m-\frac{2}{n^2}\right) = 4m - \frac{4}{n^2}" />,
    },
    {
      working: <Katex display tex="\boxed{\text{Total Area} = 4m - \dfrac{4}{n^2} \quad (a=4,\ b=-4)}" />,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (9 marks)</p>
        <p>
          Let <Katex tex="f(x)=2\sin(x)" />, <Katex tex="g(x)=\tfrac12\sin(2x)" /> and{' '}
          <Katex tex="h(x)=\tfrac13\sin(3x)" />, where <Katex tex="x \in [0,2\pi]" />.
        </p>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 mt-3 w-fit">
          <SinLogoGraph />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            The total area of the regions enclosed by the graphs of <Katex tex="f" /> and <Katex tex="g" /> (the
            shaded regions above) is given by <Katex tex="a\displaystyle\int_0^\pi \sin(x)\,dx" />. Find the
            value of <Katex tex="a" />.
          </>
        }
      >
        <WorkingTable rows={rowsA} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>On the axes above, sketch the graph of <Katex tex="h" />, labelling any endpoints with their coordinates.</>}>
        <WorkingTable rows={rowsB} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Describe a sequence of two transformations that maps the graph of <Katex tex="f" /> onto the graph of <Katex tex="h" />.</>}>
        <WorkingTable rows={rowsC} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Now let <Katex tex="k(x) = m\sin(x)" />, where <Katex tex="m \ge 2" /> is a positive integer, and let{' '}
        <Katex tex="q(x) = \tfrac1n\sin(nx)" />, where <Katex tex="n" /> is a positive integer, for{' '}
        <Katex tex="x \in [0,2\pi]" />. The total area of the regions enclosed by the graphs of <Katex tex="k" />{' '}
        and <Katex tex="q" /> can be found in a similar way to part (a).
      </div>

      <PartCard
        letter="d.i"
        marks={2}
        statement={<>If <Katex tex="n" /> is even, show that the total area is given by <Katex tex="4m + \dfrac{b}{n^2}" /> for some real number <Katex tex="b" />, and state the value of <Katex tex="b" />.</>}
      >
        <WorkingTable rows={rowsDi} />
      </PartCard>

      <PartCard letter="d.ii" marks={2} statement={<>If <Katex tex="n" /> is odd, find the total area in the same form, and give the corresponding value of <Katex tex="b" />.</>}>
        <WorkingTable rows={rowsDii} />
      </PartCard>
    </div>
  )
}

// f=2sin(x) (blue), g=(1/2)sin(2x) (purple), and — when showH — h=(1/3)sin(3x) (orange) on [0,2π].
// viewBox mapping: x_svg = 40 + 13.333·(x in units of π/4 steps... ), y_svg = 100 − value×35.
function SinLogoGraph({ showH = false }: { showH?: boolean }) {
  return (
    <svg viewBox="0 0 400 200" width={340} height={170}>
      <line x1={40} y1={100} x2={360} y2={100} stroke="#9ca3af" strokeWidth={1.2} />
      <line x1={40} y1={30} x2={40} y2={170} stroke="#9ca3af" strokeWidth={1.2} />
      <text x={365} y={104} fontSize={11} className="fill-gray-600 dark:fill-gray-400">x</text>
      <text x={44} y={26} fontSize={11} className="fill-gray-600 dark:fill-gray-400">y</text>
      <text x={196} y={112} fontSize={10} className="fill-gray-500 dark:fill-gray-400">π</text>
      <text x={352} y={112} fontSize={10} className="fill-gray-500 dark:fill-gray-400">2π</text>

      {/* f(x) = 2 sin x */}
      <polyline
        points="40,100 80,50.5 120,30 160,50.5 200,100 240,149.5 280,170 320,149.5 360,100"
        fill="none" stroke="#0ea5e9" strokeWidth={2.2}
      />
      {/* g(x) = 1/2 sin 2x */}
      <polyline
        points="40,100 60,91.25 80,73.75 100,56.25 120,47.5 140,56.25 160,73.75 180,91.25 200,100 220,108.75 240,126.25 260,143.75 280,152.5 300,143.75 320,126.25 340,108.75 360,100"
        fill="none" stroke="#a855f7" strokeWidth={2}
      />
      {showH && (
        <polyline
          points="40,100 66.67,88.33 93.33,100 120,111.67 146.67,100 173.33,88.33 200,100 226.67,111.67 253.33,100 280,88.33 306.67,100 333.33,111.67 360,100"
          fill="none" stroke="#f97316" strokeWidth={2}
        />
      )}

      <g fontSize={11}>
        <line x1={230} y1={20} x2={244} y2={20} stroke="#0ea5e9" strokeWidth={2.2} />
        <text x={248} y={24} className="fill-gray-700 dark:fill-gray-300">f(x)=2sin(x)</text>
        <line x1={230} y1={34} x2={244} y2={34} stroke="#a855f7" strokeWidth={2} />
        <text x={248} y={38} className="fill-gray-700 dark:fill-gray-300">g(x)=½sin(2x)</text>
        {showH && (
          <>
            <line x1={230} y1={48} x2={244} y2={48} stroke="#f97316" strokeWidth={2} />
            <text x={248} y={52} className="fill-gray-700 dark:fill-gray-300">h(x)=⅓sin(3x)</text>
          </>
        )}
      </g>
    </svg>
  )
}
