// 2020 Specialist Exam 2 MCQ 9 — eliminate the options with two easy lines. From
// dy/dx = y/(x − y): along the x-axis (y = 0) the marks must be flat, and along the y-axis (x = 0)
// they must have gradient y/(−y) = −1. Pick an option and its two test strips light up on VCAA's
// own figure (the cropped option image; the strips are an SVG overlay calibrated from each crop's
// tick marks, checked with a PIL composite). Only B passes both. What each option's marks do on the
// strips was read from the figures; measuring every mark's angle (PCA on each dash, 500+ per
// figure, median error under 1°) shows the five fields are A: dy/dx = x/(x − y), B: y/(x − y),
// C: y/(y − x) (the negative of B), D: x/(y − x) (B with x and y swapped) and E: y/x.

import { useState, type ReactNode } from 'react'
import { C, M, Notice } from './kit'
import optA from '../questions/spec-2020-mcq9-optA.png'
import optB from '../questions/spec-2020-mcq9-optB.png'
import optC from '../questions/spec-2020-mcq9-optC.png'
import optD from '../questions/spec-2020-mcq9-optD.png'
import optE from '../questions/spec-2020-mcq9-optE.png'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
/** A mark's direction on a strip: its gradient, or 'v' for vertical. */
type Dir = 0 | 1 | -1 | 'v'

// Pixel calibration of each crop (300 dpi): image size, the origin (centre of the axis lines) and
// pixels per unit (from the ±1, ±2 ticks).
const FIG: Record<Letter, { src: string; w: number; h: number; ox: number; oy: number; s: number; xAxis: Dir; yAxis: Dir }> = {
  A: { src: optA, w: 663, h: 671, ox: 309, oy: 361, s: 117.4, xAxis: 1, yAxis: 0 },
  B: { src: optB, w: 645, h: 654, ox: 304, oy: 357.5, s: 112.9, xAxis: 0, yAxis: -1 },
  C: { src: optC, w: 657, h: 654, ox: 304.5, oy: 357.5, s: 112.75, xAxis: 0, yAxis: 1 },
  D: { src: optD, w: 658, h: 644, ox: 304.5, oy: 358.5, s: 112.75, xAxis: -1, yAxis: 0 },
  E: { src: optE, w: 655, h: 662, ox: 309, oy: 360.5, s: 114.5, xAxis: 0, yAxis: 'v' },
}
const NEED_X: Dir = 0
const NEED_Y: Dir = -1
const HALF = 0.19 // strip half-width in units: the row (column) of marks either side of the axis
const REACH = 2.38 // strip length either side of O, in units

const words = (d: Dir) => (d === 'v' ? 'vertical' : d === 0 ? 'flat' : `gradient ${d === 1 ? '1' : '−1'}`)

/** A little picture of a slope mark. */
function Glyph({ d, color }: { d: Dir; color: string }) {
  const [dx, dy] = d === 'v' ? [0, 7] : d === 0 ? [9, 0] : [6.4, 6.4 * d]
  return (
    <svg viewBox="-11 -9 22 18" className="inline-block w-[22px] h-[18px] align-middle" aria-hidden="true">
      <line x1={-dx} y1={dy} x2={dx} y2={-dy} stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  )
}

const NOTES: Record<Letter, ReactNode> = {
  A: (
    <>
      <b>Option A fails both tests.</b> Along the <M>x</M>-axis its marks climb at <M>45^\circ</M> (gradient <M>1</M>)
      instead of lying flat, and along the <M>y</M>-axis they are flat instead of sloping at <M>-1</M>. (Its marks fit{' '}
      <M>{'\\tfrac{dy}{dx} = \\tfrac{x}{x - y}'}</M>.)
    </>
  ),
  B: (
    <>
      <b>Option B passes both.</b> Flat marks all along the <M>x</M>-axis, gradient <M>-1</M> all along the <M>y</M>-axis.
      One more check for free: in the first and third quadrants its marks turn vertical along the diagonal <M>y = x</M>,
      where <M>{'\\tfrac{y}{x - y}'}</M> is undefined. This is the field of <M>{'\\tfrac{dy}{dx} = \\tfrac{y}{x - y}'}</M>.
    </>
  ),
  C: (
    <>
      <b>Option C passes the <M>x</M>-axis test but fails the <M>y</M>-axis test:</b> its marks there climb at gradient{' '}
      <M>+1</M>, not <M>-1</M>. C is the field of <M>{'\\tfrac{dy}{dx} = \\tfrac{y}{y - x}'}</M>, exactly the negative of
      the right one, which is what a single sign slip gives. The <M>x</M>-axis test alone can&apos;t catch it (zero is its
      own negative), so always use both lines.
    </>
  ),
  D: (
    <>
      <b>Option D fails both tests</b>, the wrong way round: gradient <M>-1</M> along the <M>x</M>-axis (it should be
      flat) and flat along the <M>y</M>-axis (it should be <M>-1</M>). Its marks fit{' '}
      <M>{'\\tfrac{dy}{dx} = \\tfrac{x}{y - x}'}</M>, the right rule with <M>x</M> and <M>y</M> swapped.
    </>
  ),
  E: (
    <>
      <b>Option E passes the <M>x</M>-axis test but fails the <M>y</M>-axis test:</b> its marks there are vertical. Every
      mark in E points straight out from <M>O</M>: it is <M>{'\\tfrac{dy}{dx} = \\tfrac{y}{x}'}</M>, the gradient of{' '}
      <M>OP</M>, as if the tangent went through <M>O</M> instead of through <M>Q(y, 0)</M>.
    </>
  ),
}

export default function TestLines() {
  const [letter, setLetter] = useState<Letter>('A')
  const f = FIG[letter]
  const okX = f.xAxis === NEED_X
  const okY = f.yAxis === NEED_Y
  const half = HALF * f.s
  const reach = REACH * f.s

  const row = (name: ReactNode, need: Dir, got: Dir, ok: boolean, color: string) => (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-gray-700 dark:text-gray-300">
      <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: color, opacity: 0.6 }} />
      <span className="min-w-[8.5rem]">{name}</span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-gray-500 dark:text-gray-400">
        need <Glyph d={need} color={C.good} /> {words(need)};
      </span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <span className="text-gray-500 dark:text-gray-400">{letter} has</span>
        <Glyph d={got} color={ok ? C.good : C.bad} />
        <span className={ok ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
          {words(got)} {ok ? '✓' : '✗'}
        </span>
      </span>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[12.5px] text-gray-500 dark:text-gray-400 mr-1">Option</span>
        {(Object.keys(FIG) as Letter[]).map(L => (
          <button
            key={L}
            type="button"
            onClick={() => setLetter(L)}
            aria-pressed={L === letter}
            className={`w-9 text-[13px] font-semibold py-1.5 rounded-full border transition-colors ${
              L === letter
                ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-gray-950'
                : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
            }`}
          >
            {L}
          </button>
        ))}
      </div>
      <div className="relative w-full max-w-[340px] mx-auto bg-white rounded-lg">
        <img src={f.src} alt={`Option ${letter}'s slope field, cropped from the VCAA paper, with the strips along the x-axis and y-axis highlighted`} className="block w-full h-auto" />
        <svg viewBox={`0 0 ${f.w} ${f.h}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
          <rect
            x={f.ox - reach}
            y={f.oy - half}
            width={2 * reach}
            height={2 * half}
            fill={C.f}
            fillOpacity={0.2}
            stroke={okX ? C.good : C.bad}
            strokeWidth={4}
            rx={6}
          />
          <rect
            x={f.ox - half}
            y={f.oy - reach}
            width={2 * half}
            height={2 * reach}
            fill={C.g}
            fillOpacity={0.2}
            stroke={okY ? C.good : C.bad}
            strokeWidth={4}
            rx={6}
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        {row(<>Along the <M>x</M>-axis:</>, NEED_X, f.xAxis, okX, C.f)}
        {row(<>Along the <M>y</M>-axis:</>, NEED_Y, f.yAxis, okY, C.g)}
      </div>
      <Notice tone={okX && okY ? 'good' : 'warn'}>{NOTES[letter]}</Notice>
      <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
        The strips cover the row (and column) of marks either side of each axis: VCAA draws no marks on the axes
        themselves, so these are the marks to read. Near <M>O</M> itself every field is crowded and unreliable; read the
        strips away from the origin.
      </p>
    </div>
  )
}
