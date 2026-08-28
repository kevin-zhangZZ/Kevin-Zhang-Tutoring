export interface AngleData {
  // Numeric values
  rad: number
  cosN: number
  sinN: number
  // Fraction of π: angle = (piN / piD) * π
  piN: number
  piD: number
  deg: number

  // Unicode display (used in SVG labels)
  radLabel: string      // e.g. "π/6"
  negRadLabel: string   // e.g. "–11π/6"
  degLabel: string      // e.g. "30°"
  cosLabel: string      // e.g. "√3/2"
  sinLabel: string      // e.g. "1/2"
  tanLabel: string      // e.g. "√3/3" | "undef"
  cosecLabel: string    // e.g. "2"
  secLabel: string      // e.g. "2√3/3"
  cotLabel: string      // e.g. "√3"

  // LaTeX strings (used in KaTeX for test mode)
  cosTex: string
  sinTex: string
  tanTex: string
  cosecTex: string
  secTex: string
  cotTex: string
}

const UNDEF     = 'undef'
const UNDEF_TEX = '\\text{undefined}'

export const angles: AngleData[] = [
  {
    rad: 0, cosN: 1, sinN: 0, piN: 0, piD: 1, deg: 0,
    radLabel: '0', negRadLabel: '0', degLabel: '0°',
    cosLabel: '1', sinLabel: '0', tanLabel: '0',
    cosecLabel: UNDEF, secLabel: '1', cotLabel: UNDEF,
    cosTex: '1', sinTex: '0', tanTex: '0',
    cosecTex: UNDEF_TEX, secTex: '1', cotTex: UNDEF_TEX,
  },
  {
    rad: Math.PI / 6, cosN: Math.sqrt(3) / 2, sinN: 0.5, piN: 1, piD: 6, deg: 30,
    radLabel: 'π/6', negRadLabel: '–11π/6', degLabel: '30°',
    cosLabel: '√3/2', sinLabel: '1/2', tanLabel: '√3/3',
    cosecLabel: '2', secLabel: '2√3/3', cotLabel: '√3',
    cosTex: '\\dfrac{\\sqrt{3}}{2}', sinTex: '\\dfrac{1}{2}', tanTex: '\\dfrac{\\sqrt{3}}{3}',
    cosecTex: '2', secTex: '\\dfrac{2\\sqrt{3}}{3}', cotTex: '\\sqrt{3}',
  },
  {
    rad: Math.PI / 4, cosN: Math.SQRT2 / 2, sinN: Math.SQRT2 / 2, piN: 1, piD: 4, deg: 45,
    radLabel: 'π/4', negRadLabel: '–7π/4', degLabel: '45°',
    cosLabel: '√2/2', sinLabel: '√2/2', tanLabel: '1',
    cosecLabel: '√2', secLabel: '√2', cotLabel: '1',
    cosTex: '\\dfrac{\\sqrt{2}}{2}', sinTex: '\\dfrac{\\sqrt{2}}{2}', tanTex: '1',
    cosecTex: '\\sqrt{2}', secTex: '\\sqrt{2}', cotTex: '1',
  },
  {
    rad: Math.PI / 3, cosN: 0.5, sinN: Math.sqrt(3) / 2, piN: 1, piD: 3, deg: 60,
    radLabel: 'π/3', negRadLabel: '–5π/3', degLabel: '60°',
    cosLabel: '1/2', sinLabel: '√3/2', tanLabel: '√3',
    cosecLabel: '2√3/3', secLabel: '2', cotLabel: '√3/3',
    cosTex: '\\dfrac{1}{2}', sinTex: '\\dfrac{\\sqrt{3}}{2}', tanTex: '\\sqrt{3}',
    cosecTex: '\\dfrac{2\\sqrt{3}}{3}', secTex: '2', cotTex: '\\dfrac{\\sqrt{3}}{3}',
  },
  {
    rad: Math.PI / 2, cosN: 0, sinN: 1, piN: 1, piD: 2, deg: 90,
    radLabel: 'π/2', negRadLabel: '–3π/2', degLabel: '90°',
    cosLabel: '0', sinLabel: '1', tanLabel: UNDEF,
    cosecLabel: '1', secLabel: UNDEF, cotLabel: '0',
    cosTex: '0', sinTex: '1', tanTex: UNDEF_TEX,
    cosecTex: '1', secTex: UNDEF_TEX, cotTex: '0',
  },
  {
    rad: 2 * Math.PI / 3, cosN: -0.5, sinN: Math.sqrt(3) / 2, piN: 2, piD: 3, deg: 120,
    radLabel: '2π/3', negRadLabel: '–4π/3', degLabel: '120°',
    cosLabel: '–1/2', sinLabel: '√3/2', tanLabel: '–√3',
    cosecLabel: '2√3/3', secLabel: '–2', cotLabel: '–√3/3',
    cosTex: '-\\dfrac{1}{2}', sinTex: '\\dfrac{\\sqrt{3}}{2}', tanTex: '-\\sqrt{3}',
    cosecTex: '\\dfrac{2\\sqrt{3}}{3}', secTex: '-2', cotTex: '-\\dfrac{\\sqrt{3}}{3}',
  },
  {
    rad: 3 * Math.PI / 4, cosN: -Math.SQRT2 / 2, sinN: Math.SQRT2 / 2, piN: 3, piD: 4, deg: 135,
    radLabel: '3π/4', negRadLabel: '–5π/4', degLabel: '135°',
    cosLabel: '–√2/2', sinLabel: '√2/2', tanLabel: '–1',
    cosecLabel: '√2', secLabel: '–√2', cotLabel: '–1',
    cosTex: '-\\dfrac{\\sqrt{2}}{2}', sinTex: '\\dfrac{\\sqrt{2}}{2}', tanTex: '-1',
    cosecTex: '\\sqrt{2}', secTex: '-\\sqrt{2}', cotTex: '-1',
  },
  {
    rad: 5 * Math.PI / 6, cosN: -Math.sqrt(3) / 2, sinN: 0.5, piN: 5, piD: 6, deg: 150,
    radLabel: '5π/6', negRadLabel: '–7π/6', degLabel: '150°',
    cosLabel: '–√3/2', sinLabel: '1/2', tanLabel: '–√3/3',
    cosecLabel: '2', secLabel: '–2√3/3', cotLabel: '–√3',
    cosTex: '-\\dfrac{\\sqrt{3}}{2}', sinTex: '\\dfrac{1}{2}', tanTex: '-\\dfrac{\\sqrt{3}}{3}',
    cosecTex: '2', secTex: '-\\dfrac{2\\sqrt{3}}{3}', cotTex: '-\\sqrt{3}',
  },
  {
    rad: Math.PI, cosN: -1, sinN: 0, piN: 1, piD: 1, deg: 180,
    radLabel: 'π', negRadLabel: '–π', degLabel: '180°',
    cosLabel: '–1', sinLabel: '0', tanLabel: '0',
    cosecLabel: UNDEF, secLabel: '–1', cotLabel: UNDEF,
    cosTex: '-1', sinTex: '0', tanTex: '0',
    cosecTex: UNDEF_TEX, secTex: '-1', cotTex: UNDEF_TEX,
  },
  {
    rad: 7 * Math.PI / 6, cosN: -Math.sqrt(3) / 2, sinN: -0.5, piN: 7, piD: 6, deg: 210,
    radLabel: '7π/6', negRadLabel: '–5π/6', degLabel: '210°',
    cosLabel: '–√3/2', sinLabel: '–1/2', tanLabel: '√3/3',
    cosecLabel: '–2', secLabel: '–2√3/3', cotLabel: '√3',
    cosTex: '-\\dfrac{\\sqrt{3}}{2}', sinTex: '-\\dfrac{1}{2}', tanTex: '\\dfrac{\\sqrt{3}}{3}',
    cosecTex: '-2', secTex: '-\\dfrac{2\\sqrt{3}}{3}', cotTex: '\\sqrt{3}',
  },
  {
    rad: 5 * Math.PI / 4, cosN: -Math.SQRT2 / 2, sinN: -Math.SQRT2 / 2, piN: 5, piD: 4, deg: 225,
    radLabel: '5π/4', negRadLabel: '–3π/4', degLabel: '225°',
    cosLabel: '–√2/2', sinLabel: '–√2/2', tanLabel: '1',
    cosecLabel: '–√2', secLabel: '–√2', cotLabel: '1',
    cosTex: '-\\dfrac{\\sqrt{2}}{2}', sinTex: '-\\dfrac{\\sqrt{2}}{2}', tanTex: '1',
    cosecTex: '-\\sqrt{2}', secTex: '-\\sqrt{2}', cotTex: '1',
  },
  {
    rad: 4 * Math.PI / 3, cosN: -0.5, sinN: -Math.sqrt(3) / 2, piN: 4, piD: 3, deg: 240,
    radLabel: '4π/3', negRadLabel: '–2π/3', degLabel: '240°',
    cosLabel: '–1/2', sinLabel: '–√3/2', tanLabel: '√3',
    cosecLabel: '–2√3/3', secLabel: '–2', cotLabel: '√3/3',
    cosTex: '-\\dfrac{1}{2}', sinTex: '-\\dfrac{\\sqrt{3}}{2}', tanTex: '\\sqrt{3}',
    cosecTex: '-\\dfrac{2\\sqrt{3}}{3}', secTex: '-2', cotTex: '\\dfrac{\\sqrt{3}}{3}',
  },
  {
    rad: 3 * Math.PI / 2, cosN: 0, sinN: -1, piN: 3, piD: 2, deg: 270,
    radLabel: '3π/2', negRadLabel: '–π/2', degLabel: '270°',
    cosLabel: '0', sinLabel: '–1', tanLabel: UNDEF,
    cosecLabel: '–1', secLabel: UNDEF, cotLabel: '0',
    cosTex: '0', sinTex: '-1', tanTex: UNDEF_TEX,
    cosecTex: '-1', secTex: UNDEF_TEX, cotTex: '0',
  },
  {
    rad: 5 * Math.PI / 3, cosN: 0.5, sinN: -Math.sqrt(3) / 2, piN: 5, piD: 3, deg: 300,
    radLabel: '5π/3', negRadLabel: '–π/3', degLabel: '300°',
    cosLabel: '1/2', sinLabel: '–√3/2', tanLabel: '–√3',
    cosecLabel: '–2√3/3', secLabel: '2', cotLabel: '–√3/3',
    cosTex: '\\dfrac{1}{2}', sinTex: '-\\dfrac{\\sqrt{3}}{2}', tanTex: '-\\sqrt{3}',
    cosecTex: '-\\dfrac{2\\sqrt{3}}{3}', secTex: '2', cotTex: '-\\dfrac{\\sqrt{3}}{3}',
  },
  {
    rad: 7 * Math.PI / 4, cosN: Math.SQRT2 / 2, sinN: -Math.SQRT2 / 2, piN: 7, piD: 4, deg: 315,
    radLabel: '7π/4', negRadLabel: '–π/4', degLabel: '315°',
    cosLabel: '√2/2', sinLabel: '–√2/2', tanLabel: '–1',
    cosecLabel: '–√2', secLabel: '√2', cotLabel: '–1',
    cosTex: '\\dfrac{\\sqrt{2}}{2}', sinTex: '-\\dfrac{\\sqrt{2}}{2}', tanTex: '-1',
    cosecTex: '-\\sqrt{2}', secTex: '\\sqrt{2}', cotTex: '-1',
  },
  {
    rad: 11 * Math.PI / 6, cosN: Math.sqrt(3) / 2, sinN: -0.5, piN: 11, piD: 6, deg: 330,
    radLabel: '11π/6', negRadLabel: '–π/6', degLabel: '330°',
    cosLabel: '√3/2', sinLabel: '–1/2', tanLabel: '–√3/3',
    cosecLabel: '–2', secLabel: '2√3/3', cotLabel: '–√3',
    cosTex: '\\dfrac{\\sqrt{3}}{2}', sinTex: '-\\dfrac{1}{2}', tanTex: '-\\dfrac{\\sqrt{3}}{3}',
    cosecTex: '-2', secTex: '\\dfrac{2\\sqrt{3}}{3}', cotTex: '-\\sqrt{3}',
  },
]

// Generates the LaTeX string for a base angle shifted by 2kπ.
// base: (piN, piD) where angle = piN/piD * π, k: integer shift
export function shiftedAngleTex(piN: number, piD: number, k: number): string {
  const newN = piN + 2 * k * piD
  if (newN === 0) return '0'
  const neg = newN < 0
  const absN = Math.abs(newN)
  const sign = neg ? '-' : ''
  if (piD === 1) {
    return absN === 1 ? `${sign}\\pi` : `${sign}${absN}\\pi`
  }
  if (absN === 1) return `${sign}\\dfrac{\\pi}{${piD}}`
  return `${sign}\\dfrac{${absN}\\pi}{${piD}}`
}

// Generates the LaTeX string for a base angle (in degrees) shifted by 360k degrees.
export function shiftedAngleDegTex(deg: number, k: number): string {
  const shifted = deg + 360 * k
  if (shifted === 0) return '0'
  return `${shifted}^\\circ`
}

// Shared between Locate Test and Values Test: radians vs degrees, and how the
// angle-range toggle should label itself for each unit.
export type AngleUnit = 'rad' | 'deg'

export const RANGE_LABEL: Record<AngleUnit, Record<'pos' | 'neg' | 'both', string>> = {
  rad: { pos: '[0, 2π]', neg: '[−2π, 0]', both: '[−2π, 2π]' },
  deg: { pos: '[0°, 360°]', neg: '[−360°, 0°]', both: '[−360°, 360°]' },
}

// All unique exact values for sin/cos answers (sorted: neg → 0 → pos)
export const sinCosAnswers: Array<{ label: string; tex: string }> = [
  { label: '–1',    tex: '-1' },
  { label: '–√3/2', tex: '-\\dfrac{\\sqrt{3}}{2}' },
  { label: '–√2/2', tex: '-\\dfrac{\\sqrt{2}}{2}' },
  { label: '–1/2',  tex: '-\\dfrac{1}{2}' },
  { label: '0',     tex: '0' },
  { label: '1/2',   tex: '\\dfrac{1}{2}' },
  { label: '√2/2',  tex: '\\dfrac{\\sqrt{2}}{2}' },
  { label: '√3/2',  tex: '\\dfrac{\\sqrt{3}}{2}' },
  { label: '1',     tex: '1' },
]

// All unique exact values for tan answers
export const tanAnswers: Array<{ label: string; tex: string }> = [
  { label: 'undef', tex: '\\text{undefined}' },
  { label: '–√3',   tex: '-\\sqrt{3}' },
  { label: '–1',    tex: '-1' },
  { label: '–√3/3', tex: '-\\dfrac{\\sqrt{3}}{3}' },
  { label: '0',     tex: '0' },
  { label: '√3/3',  tex: '\\dfrac{\\sqrt{3}}{3}' },
  { label: '1',     tex: '1' },
  { label: '√3',    tex: '\\sqrt{3}' },
]
