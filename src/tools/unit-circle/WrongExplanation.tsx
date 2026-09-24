import { useState, type ReactNode } from 'react'
import Katex from '../../components/Katex'
import type { AngleData, AngleUnit } from './data'

// After a wrong answer in Values Test: a three-step explanation using the point P on the unit
// circle, built up one step at a time.
//   1. Where is P?
//   2. Which coordinate (sin = y, cos = x, tan = gradient of OP; cosec, sec, cot are their
//      reciprocals) and its sign, read off where P is.
//   3. How big: the right-angled triangle O–(x, 0)–P has hypotenuse 1, so its height and base are
//      the sizes of sin and cos.

export type TrigFn = 'sin' | 'cos' | 'tan' | 'cosec' | 'sec' | 'cot'

const FN_TEX: Record<TrigFn, string> = {
  sin: '\\sin', cos: '\\cos', tan: '\\tan', cosec: '\\csc', sec: '\\sec', cot: '\\cot',
}

/** What each function reads off P. */
const BASE: Record<TrigFn, 'y' | 'x' | 'grad'> = {
  sin: 'y', cosec: 'y', cos: 'x', sec: 'x', tan: 'grad', cot: 'grad',
}

const COLOR = { y: 'var(--color-sin)', x: 'var(--color-cos)', grad: 'var(--color-tan)' }

const strip = (t: string) => t.replace(/^-/, '')
// Inline fractions read better text-sized in a sentence.
const inl = (t: string) => t.replace(/\\dfrac/g, '\\tfrac')
const M = ({ t }: { t: string }) => <Katex tex={inl(t)} />

const rad = (d: number) => (d * Math.PI) / 180

function refDeg(deg: number) {
  return deg <= 90 ? deg : deg <= 180 ? 180 - deg : deg <= 270 ? deg - 180 : 360 - deg
}

function refTex(ref: number, unit: AngleUnit) {
  if (unit === 'deg') return `${ref}^\\circ`
  return ref === 30 ? '\\frac{\\pi}{6}' : ref === 45 ? '\\frac{\\pi}{4}' : '\\frac{\\pi}{3}'
}

function valueTex(a: AngleData, fn: TrigFn) {
  return fn === 'sin' ? a.sinTex : fn === 'cos' ? a.cosTex : fn === 'tan' ? a.tanTex
    : fn === 'cosec' ? a.cosecTex : fn === 'sec' ? a.secTex : a.cotTex
}

const EPS = 1e-9
const onAxis = (a: AngleData) => a.deg % 90 === 0

// ── The diagram ─────────────────────────────────────────────────────────────

function GeoDiagram({ a, fn, step, negative, angleTex, unit, size = 190 }: {
  a: AngleData
  fn: TrigFn
  step: number
  negative: boolean
  angleTex: string
  unit: AngleUnit
  size?: number
}) {
  const S = size, c = S / 2, R = S * 0.34
  const th = rad(a.deg)
  const px = c + R * a.cosN, py = c - R * a.sinN
  const fx = px, fy = c
  const base = BASE[fn]
  const col = COLOR[base]
  const axis = onAxis(a)
  const right = a.cosN > EPS, left = a.cosN < -EPS, up = a.sinN > EPS
  const axisDeg = a.deg <= 90 ? 0 : a.deg <= 270 ? 180 : 360

  // Step 1: the turn from the positive x-axis to P (clockwise for a negative angle).
  const turn = negative ? -(360 - a.deg) : a.deg
  const r0 = 14
  const sweepEnd = [c + r0 * Math.cos(th), c - r0 * Math.sin(th)]
  const sweepPath = a.deg === 0 ? '' :
    `M${c + r0} ${c} A${r0} ${r0} 0 ${Math.abs(turn) > 180 ? 1 : 0} ${negative ? 1 : 0} ${sweepEnd[0]} ${sweepEnd[1]}`
  const mid = rad(turn / 2)

  const labels: Array<{ x: number; y: number; node: ReactNode; cls?: string; style?: React.CSSProperties; anchor?: 'left' | 'right' }> = []
  labels.push({ x: px + (a.cosN >= 0 ? 9 : -9), y: py + (a.sinN >= 0 ? -9 : 9), node: 'P', cls: 'font-sans font-bold text-blue-700 dark:text-blue-400 text-[11px]' })
  labels.push({ x: c - 8, y: c + 9, node: 'O', cls: 'font-sans font-semibold text-gray-400 text-[10px]' })
  if (step < 3 && a.deg !== 0) labels.push({ x: c + 28 * Math.cos(mid), y: c - 28 * Math.sin(mid), node: <M t={angleTex} />, cls: 'text-gray-500 dark:text-gray-400 text-[10px]' })
  if (step === 2) {
    if (base === 'y' && !(Math.abs(a.sinN) < EPS)) labels.push({ x: px + (a.cosN >= 0 ? 8 : -8), y: (py + c) / 2, node: <i>y</i>, style: { color: col }, cls: 'font-bold text-[12px]', anchor: a.cosN >= 0 ? 'left' : 'right' })
    if (base === 'x' && !(Math.abs(a.cosN) < EPS)) labels.push({ x: (c + fx) / 2, y: c + (up ? 10 : -10), node: <i>x</i>, style: { color: col }, cls: 'font-bold text-[12px]' })
    if (base === 'grad') labels.push({ x: c + R * 1.3 * a.cosN + (a.cosN >= 0 ? 6 : -6), y: c - R * 1.3 * a.sinN, node: 'OP', style: { color: col }, cls: 'font-sans font-bold text-[10px]', anchor: a.cosN >= 0 ? 'left' : 'right' })
  }
  if (step >= 3 && !axis) {
    const sinMag = strip(a.sinTex), cosMag = strip(a.cosTex)
    labels.push({ x: px + (right ? 7 : -7), y: (py + c) / 2, node: <M t={sinMag} />, style: { color: base === 'y' ? col : undefined }, cls: `text-[11px] ${base === 'y' ? 'font-bold' : 'text-amber-800 dark:text-amber-300'}`, anchor: right ? 'left' : 'right' })
    labels.push({ x: (c + fx) / 2, y: c + (up ? 12 : -12), node: <M t={cosMag} />, style: { color: base === 'x' ? col : undefined }, cls: `text-[11px] ${base === 'x' ? 'font-bold' : 'text-amber-800 dark:text-amber-300'}` })
    // Hypotenuse "1", on the side away from the triangle
    const mx = (c + px) / 2, my = (c + py) / 2
    let nx = -(py - c), ny = px - c
    const nl = Math.hypot(nx, ny); nx /= nl; ny /= nl
    if ((fx - mx) * nx + (fy - my) * ny > 0) { nx = -nx; ny = -ny }
    labels.push({ x: mx + nx * 9, y: my + ny * 9, node: '1', cls: 'text-[11px] text-amber-800 dark:text-amber-300' })
    const bis = (rad(axisDeg) + th) / 2
    labels.push({ x: c + 31 * Math.cos(bis), y: c - 31 * Math.sin(bis), node: <M t={refTex(refDeg(a.deg), unit)} />, cls: 'text-[9.5px] text-amber-700 dark:text-amber-400' })
  }
  if (step >= 3 && axis) {
    labels.push({
      x: px + (left ? -8 : 8), y: py + (up ? -18 : a.sinN < -EPS ? 18 : -14),
      node: <>(<M t={a.cosTex} />, <M t={a.sinTex} />)</>,
      cls: 'text-[11px] text-gray-700 dark:text-gray-200', anchor: left ? 'right' : 'left',
    })
  }

  const ar = 17
  const a0 = [c + ar * Math.cos(rad(axisDeg)), c - ar * Math.sin(rad(axisDeg))]
  const a1 = [c + ar * Math.cos(th), c - ar * Math.sin(th)]
  const L = R * 1.3

  return (
    <div className="relative flex-none" style={{ width: S, height: S }}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute inset-0 overflow-visible" aria-hidden>
        <line x1={S * 0.04} y1={c} x2={S * 0.96} y2={c} stroke="currentColor" strokeOpacity="0.3" />
        <line x1={c} y1={S * 0.04} x2={c} y2={S * 0.96} stroke="currentColor" strokeOpacity="0.3" />
        <text x={S * 0.96} y={c - 4} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="Inter, sans-serif">x</text>
        <text x={c + 4} y={S * 0.07} fontSize="9" fill="currentColor" fillOpacity="0.4" fontFamily="Inter, sans-serif">y</text>
        <circle cx={c} cy={c} r={R} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />

        {step >= 3 && !axis && (
          <>
            <path d={`M${c} ${c} L${fx} ${fy} L${px} ${py} Z`} fill="#FDE68A" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1" />
            <path d={`M${a0[0]} ${a0[1]} A${ar} ${ar} 0 0 ${a.deg < axisDeg ? 1 : 0} ${a1[0]} ${a1[1]}`} fill="none" stroke="#B45309" strokeWidth="1.3" />
          </>
        )}
        {step < 3 && sweepPath && <path d={sweepPath} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />}

        {step >= 2 && base === 'y' && <line x1={px} y1={py} x2={fx} y2={fy} strokeWidth="3.2" strokeLinecap="round" style={{ stroke: col }} />}
        {step >= 2 && base === 'x' && (
          <>
            <line x1={px} y1={py} x2={fx} y2={fy} stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 2" />
            <line x1={c} y1={c} x2={fx} y2={fy} strokeWidth="3.2" strokeLinecap="round" style={{ stroke: col }} />
          </>
        )}
        {step >= 2 && base === 'grad' && (
          <line x1={c - L * a.cosN} y1={c + L * a.sinN} x2={c + L * a.cosN} y2={c - L * a.sinN} strokeWidth="2.4" strokeLinecap="round" style={{ stroke: col }} />
        )}
        {!(step >= 2 && base === 'grad') && <line x1={c} y1={c} x2={px} y2={py} stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.3" />}

        <circle cx={px} cy={py} r={4} fill="#2563EB" />
        <circle cx={c} cy={c} r={2} fill="currentColor" fillOpacity="0.7" />
      </svg>
      {labels.map((l, i) => (
        <div
          key={i}
          className={`absolute whitespace-nowrap leading-none pointer-events-none ${l.cls ?? ''}`}
          style={{
            left: l.x, top: l.y,
            transform: `translate(${l.anchor === 'left' ? '0' : l.anchor === 'right' ? '-100%' : '-50%'}, -50%)`,
            ...l.style,
          }}
        >
          {l.node}
        </div>
      ))}
    </div>
  )
}

// ── The words ───────────────────────────────────────────────────────────────

function ySign(a: AngleData) {
  if (Math.abs(a.sinN) < EPS) return <>P is on the x-axis, so <i>y</i> = 0.</>
  return a.sinN > 0
    ? <>P is <b>above</b> the x-axis, so <i>y</i> is <b>positive</b>.</>
    : <>P is <b>below</b> the x-axis, so <i>y</i> is <b>negative</b>.</>
}

function xSign(a: AngleData) {
  if (Math.abs(a.cosN) < EPS) return <>P is on the y-axis, so <i>x</i> = 0.</>
  return a.cosN > 0
    ? <>P is <b>right</b> of the y-axis, so <i>x</i> is <b>positive</b>.</>
    : <>P is <b>left</b> of the y-axis, so <i>x</i> is <b>negative</b>.</>
}

function gradSign(a: AngleData) {
  if (Math.abs(a.cosN) < EPS) return <>OP is vertical, so its gradient is <b>undefined</b>.</>
  if (Math.abs(a.sinN) < EPS) return <>OP is horizontal, so its gradient is 0.</>
  return a.sinN * a.cosN > 0
    ? <>OP slopes <b>up to the right</b>, so the gradient is <b>positive</b>.</>
    : <>OP slopes <b>down to the right</b>, so the gradient is <b>negative</b>.</>
}

const AXIS_NAME = ['positive x-axis', 'positive y-axis', 'negative x-axis', 'negative y-axis']

function steps(a: AngleData, fn: TrigFn, angleTex: string, negative: boolean, unit: AngleUnit): Array<{ title: string; body: ReactNode }> {
  const base = BASE[fn]
  const q = `${FN_TEX[fn]}\\left(${angleTex}\\right)`
  const ans = valueTex(a, fn)
  const undefinedAns = ans.includes('undefined')
  const col = { color: COLOR[base] }
  const y0 = Math.abs(a.sinN) < EPS, x0 = Math.abs(a.cosN) < EPS

  // 1. Where is P?
  const place = onAxis(a) ? <>on the {AXIS_NAME[a.deg / 90]}</> : <>in <b>quadrant {Math.floor(a.deg / 90) + 1}</b></>
  const one = a.deg === 0
    ? <>An angle of 0 puts P on the positive x-axis.</>
    : negative
      ? <>Turn <M t={strip(angleTex)} /> clockwise from the positive x-axis (a negative angle turns clockwise). P is {place}.</>
      : <>Turn <M t={angleTex} /> anticlockwise from the positive x-axis. P is {place}.</>

  // 2. Which coordinate, and its sign
  let two: ReactNode
  if (fn === 'sin') two = <><b>sin</b> is the <b style={col}>y-coordinate</b> of P. {ySign(a)}</>
  else if (fn === 'cos') two = <><b>cos</b> is the <b style={col}>x-coordinate</b> of P. {xSign(a)}</>
  else if (fn === 'tan') two = <><b>tan</b> is the <b style={col}>gradient of OP</b>. {gradSign(a)}</>
  else if (fn === 'cosec') two = <><b>cosec</b> is 1 ÷ the <b style={col}>y-coordinate</b> of P. {ySign(a)} {y0 ? <>You can’t divide by 0, so cosec is <b>undefined</b> here.</> : <>So cosec has the same sign.</>}</>
  else if (fn === 'sec') two = <><b>sec</b> is 1 ÷ the <b style={col}>x-coordinate</b> of P. {xSign(a)} {x0 ? <>You can’t divide by 0, so sec is <b>undefined</b> here.</> : <>So sec has the same sign.</>}</>
  else two = <><b>cot</b> is 1 ÷ the <b style={col}>gradient of OP</b>, which is <i>x</i> ÷ <i>y</i>. {gradSign(a)} {y0 ? <><i>y</i> = 0, so cot is <b>undefined</b> here.</> : x0 ? <><i>x</i> = 0, so cot is 0.</> : <>So cot has the same sign.</>}</>

  // 3. How big is it?
  let three: ReactNode
  const so = undefinedAns ? <>So <M t={q} /> is <b>undefined</b>.</> : <>So <M t={q} /> = <b><M t={ans} /></b>.</>
  if (onAxis(a)) {
    const how =
      base === 'y' ? (fn === 'sin' ? <>sin is <i>y</i>.</> : <>cosec is 1 ÷ <i>y</i>.</>)
      : base === 'x' ? (fn === 'cos' ? <>cos is <i>x</i>.</> : <>sec is 1 ÷ <i>x</i>.</>)
      : fn === 'tan' ? <>tan is <i>y</i> ÷ <i>x</i>.</> : <>cot is <i>x</i> ÷ <i>y</i>.</>
    three = <>P is at (<M t={a.cosTex} />, <M t={a.sinTex} />), and {how} {so}</>
  } else {
    const sinMag = strip(a.sinTex), cosMag = strip(a.cosTex), ansMag = strip(ans)
    const tri = <>The triangle has angle <M t={refTex(refDeg(a.deg), unit)} /> at O and hypotenuse 1, so its height is <M t={sinMag} /> and its base is <M t={cosMag} />.</>
    const size =
      fn === 'sin' ? <>sin is the height.</>
      : fn === 'cos' ? <>cos is the base.</>
      : fn === 'tan' ? <>Rise ÷ run = <M t={sinMag} /> ÷ <M t={cosMag} /> = <M t={ansMag} />.</>
      : fn === 'cosec' ? <>1 ÷ <M t={sinMag} /> = <M t={ansMag} />.</>
      : fn === 'sec' ? <>1 ÷ <M t={cosMag} /> = <M t={ansMag} />.</>
      : <>Run ÷ rise = <M t={cosMag} /> ÷ <M t={sinMag} /> = <M t={ansMag} />.</>
    three = <>{tri} {size} With the sign from step 2: <M t={q} /> = <b><M t={ans} /></b>.</>
  }

  return [
    { title: 'Where is P?', body: one },
    { title: base === 'grad' ? 'Which way does OP slope?' : 'Which coordinate, and its sign', body: two },
    { title: 'How big is it?', body: three },
  ]
}

// ── The panel ───────────────────────────────────────────────────────────────

interface Props {
  angle: AngleData
  fn: TrigFn
  angleTex: string
  unit: AngleUnit
}

export default function WrongExplanation({ angle, fn, angleTex, unit }: Props) {
  const [step, setStep] = useState(1)
  const negative = angleTex.startsWith('-')
  const all = steps(angle, fn, angleTex, negative, unit)

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg border border-rose-100 dark:border-rose-900/60 p-3 text-left">
      <div className="flex justify-center text-gray-700 dark:text-gray-300">
        <GeoDiagram a={angle} fn={fn} step={step} negative={negative} angleTex={angleTex} unit={unit} />
      </div>
      <ol className="mt-1 flex flex-col gap-2" aria-live="polite">
        {all.slice(0, step).map((s, i) => (
          <li key={i}>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">Step {i + 1} of 3 · {s.title}</p>
            <p className="text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">{s.body}</p>
          </li>
        ))}
      </ol>
      {step < 3 && (
        <div className="flex gap-2 mt-2.5">
          <button
            onClick={() => setStep(s => s + 1)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900"
          >
            Next step
          </button>
          <button
            onClick={() => setStep(3)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  )
}
