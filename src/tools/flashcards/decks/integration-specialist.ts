import type { Card, Deck, Face } from '../data'

// Specialist integration, following Kevin's "five questions to ask before integrating":
// 1 in the table? 2 two parts (substitution / linear substitution)? 3 polynomial over polynomial?
// 4 trig? 5 by parts. Integrals written down by inspection have the antiderivative on the back;
// the ones that need working have the method (the substitution, identity or partial-fraction form),
// and those are asked one way only.

const t = (tex: string): Face => ({ tex })

/** [id, group, front, back, traps, extra] */
type Row = [string, string, string, string, string[], Partial<Card>?]

const STD = 'Standard Forms'
const INSP = 'Inspection'
const SUB = 'Substitution'
const LSUB = 'Linear Substitution'
const TRIG = 'Trig Powers'
const PF = 'Partial Fractions'
const PARTS = 'By Parts'

const SUB_ASK = 'which substitution?'
const PF_ASK = 'which partial-fraction form?'
const DIV_ASK = 'divide first: quotient + remainder'
const PARTS_ASK = 'by parts: choose u and dv/dx'

const rows: Row[] = [
  // Question 1: in the table (formula sheet), possibly after rearranging.
  ['asin', STD, '\\int \\dfrac{1}{\\sqrt{a^2-x^2}}\\,dx', '\\sin^{-1}\\left(\\dfrac{x}{a}\\right) + c', ['\\cos^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\dfrac{1}{a}\\sin^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c'], { ask: 'a > 0' }],
  ['acos', STD, '\\int \\dfrac{-1}{\\sqrt{a^2-x^2}}\\,dx', '\\cos^{-1}\\left(\\dfrac{x}{a}\\right) + c', ['-\\cos^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\sin^{-1}\\left(\\dfrac{x}{a}\\right) + c', '-\\dfrac{1}{a}\\cos^{-1}\\left(\\dfrac{x}{a}\\right) + c'], { ask: 'a > 0' }],
  ['atan', STD, '\\int \\dfrac{a}{a^2+x^2}\\,dx', '\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', ['a\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\sin^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\log_e(a^2+x^2) + c'], { ask: 'a > 0' }],
  ['atan-1', STD, '\\int \\dfrac{1}{a^2+x^2}\\,dx', '\\dfrac{1}{a}\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', ['\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', 'a\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\dfrac{1}{2x}\\log_e(a^2+x^2) + c'], { ask: 'a > 0' }],
  ['asin-9', STD, '\\int \\dfrac{1}{\\sqrt{9-x^2}}\\,dx', '\\sin^{-1}\\left(\\dfrac{x}{3}\\right) + c', ['\\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{x}{3}\\right) + c', '\\sin^{-1}\\left(\\dfrac{x}{9}\\right) + c', '\\cos^{-1}\\left(\\dfrac{x}{3}\\right) + c'], { family: 'nine' }],
  ['asin-3-16', STD, '\\int \\dfrac{3}{\\sqrt{16-x^2}}\\,dx', '3\\sin^{-1}\\left(\\dfrac{x}{4}\\right) + c', ['\\dfrac{3}{4}\\sin^{-1}\\left(\\dfrac{x}{4}\\right) + c', '3\\sin^{-1}\\left(\\dfrac{x}{16}\\right) + c', '12\\sin^{-1}\\left(\\dfrac{x}{4}\\right) + c']],
  ['atan-9', STD, '\\int \\dfrac{1}{9+x^2}\\,dx', '\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c', ['\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c', '3\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c', '\\dfrac{1}{3}\\tan^{-1}(3x) + c'], { family: 'nine' }],
  ['asin-root-a', STD, '\\int \\dfrac{1}{\\sqrt{a-x^2}}\\,dx', '\\sin^{-1}\\left(\\dfrac{x}{\\sqrt{a}}\\right) + c', ['\\sin^{-1}\\left(\\dfrac{x}{a}\\right) + c', '\\dfrac{1}{\\sqrt{a}}\\sin^{-1}\\left(\\dfrac{x}{\\sqrt{a}}\\right) + c', '-\\sqrt{a-x^2} + c'], { ask: 'a > 0' }],
  ['atan-coef', STD, '\\int \\dfrac{1}{4x^2+9}\\,dx', '\\dfrac{1}{6}\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c', ['\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c', '\\dfrac{1}{6}\\tan^{-1}\\left(\\dfrac{3x}{2}\\right) + c', '\\dfrac{1}{8x}\\log_e(4x^2+9) + c']],
  ['atan-6', STD, '\\int \\dfrac{6}{9+4x^2}\\,dx', '\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c', ['4\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c', '\\tan^{-1}\\left(\\dfrac{3x}{2}\\right) + c', '2\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c']],
  ['asin-coef', STD, '\\int \\dfrac{1}{\\sqrt{4-9x^2}}\\,dx', '\\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{3x}{2}\\right) + c', ['\\sin^{-1}\\left(\\dfrac{3x}{2}\\right) + c', '\\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{2x}{3}\\right) + c', '\\dfrac{1}{2}\\sin^{-1}\\left(\\dfrac{3x}{2}\\right) + c']],
  ['asin-linear', STD, '\\int \\dfrac{3}{\\sqrt{4-(6x-1)^2}}\\,dx', '\\dfrac{1}{2}\\sin^{-1}\\left(\\dfrac{6x-1}{2}\\right) + c', ['3\\sin^{-1}\\left(\\dfrac{6x-1}{2}\\right) + c', '\\dfrac{1}{6}\\sin^{-1}\\left(\\dfrac{6x-1}{2}\\right) + c', '18\\sin^{-1}\\left(\\dfrac{6x-1}{2}\\right) + c']],
  ['atan-square', STD, '\\int \\dfrac{1}{x^2+2x+10}\\,dx', '\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x+1}{3}\\right) + c', ['\\tan^{-1}\\left(\\dfrac{x+1}{3}\\right) + c', '\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x+1}{9}\\right) + c', '\\log_e(x^2+2x+10) + c']],
  ['asin-square', STD, '\\int \\dfrac{1}{\\sqrt{5-4x-x^2}}\\,dx', '\\sin^{-1}\\left(\\dfrac{x+2}{3}\\right) + c', ['\\sin^{-1}\\left(\\dfrac{x-2}{3}\\right) + c', '\\dfrac{1}{3}\\sin^{-1}\\left(\\dfrac{x+2}{3}\\right) + c', '\\sin^{-1}\\left(\\dfrac{x+2}{9}\\right) + c']],
  ['log-2-x', STD, '\\int \\dfrac{1}{2-x}\\,dx', '-\\log_e|2-x| + c', ['\\log_e|2-x| + c', '-\\dfrac{1}{(2-x)^2} + c', '2\\log_e|2-x| + c']],
  ['recip-sq', STD, '\\int \\dfrac{1}{(9+x)^2}\\,dx', '-\\dfrac{1}{9+x} + c', ['\\dfrac{1}{9+x} + c', '\\log_e\\big((9+x)^2\\big) + c', '\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c']],
  ['sec-sq', STD, '\\int 8\\sec^2(3x)\\,dx', '\\dfrac{8}{3}\\tan(3x) + c', ['24\\tan(3x) + c', '8\\tan(3x) + c', '\\dfrac{8}{3}\\sec(3x)\\tan(3x) + c']],

  // Question 2 i., spotted: one part is (a multiple of) the derivative of the other.
  ['insp-power', INSP, '\\int f\'(x)\\big[f(x)\\big]^n\\,dx', '\\dfrac{\\big[f(x)\\big]^{n+1}}{n+1} + c', ['f\'(x)\\dfrac{\\big[f(x)\\big]^{n+1}}{n+1} + c', '\\big[f(x)\\big]^{n+1} + c', 'n\\,f\'(x)\\big[f(x)\\big]^{n-1} + c'], { ask: 'n ≠ −1' }],
  ['insp-log', INSP, '\\int \\dfrac{f\'(x)}{f(x)}\\,dx', '\\log_e|f(x)| + c', ['\\dfrac{1}{f(x)} + c', '\\log_e|f\'(x)| + c', '-\\dfrac{1}{\\big[f(x)\\big]^2} + c']],
  ['insp-exp', INSP, '\\int f\'(x)\\,e^{f(x)}\\,dx', 'e^{f(x)} + c', ['f\'(x)\\,e^{f(x)} + c', 'e^{f\'(x)} + c', '\\dfrac{e^{f(x)}}{f\'(x)} + c']],
  ['insp-root', INSP, '\\int \\dfrac{f\'(x)}{\\sqrt{f(x)}}\\,dx', '2\\sqrt{f(x)} + c', ['\\dfrac{1}{2}\\sqrt{f(x)} + c', '\\log_e\\big|\\sqrt{f(x)}\\big| + c', '\\dfrac{2}{3}\\big[f(x)\\big]^{\\frac{3}{2}} + c']],
  ['insp-x-9-plus-x2', INSP, '\\int \\dfrac{x}{9+x^2}\\,dx', '\\dfrac{1}{2}\\log_e(9+x^2) + c', ['\\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c', '\\log_e(9+x^2) + c', '2\\log_e(9+x^2) + c'], { family: 'nine' }],
  ['insp-x-a-x2', INSP, '\\int \\dfrac{x}{a-x^2}\\,dx', '-\\dfrac{1}{2}\\log_e|a-x^2| + c', ['\\dfrac{1}{2}\\log_e|a-x^2| + c', '-2\\log_e|a-x^2| + c', '\\sin^{-1}\\left(\\dfrac{x}{\\sqrt{a}}\\right) + c']],
  ['insp-x-root', INSP, '\\int \\dfrac{x}{\\sqrt{9-x^2}}\\,dx', '-\\sqrt{9-x^2} + c', ['\\sqrt{9-x^2} + c', '-2\\sqrt{9-x^2} + c', '\\sin^{-1}\\left(\\dfrac{x}{3}\\right) + c'], { family: 'nine' }],
  ['insp-cubic', INSP, '\\int \\dfrac{3x^2+1}{x^3+x}\\,dx', '\\log_e|x^3+x| + c', ['3\\log_e|x^3+x| + c', '\\dfrac{1}{3}\\log_e|x^3+x| + c', '\\log_e|x| + \\tan^{-1}(x) + c']],
  ['insp-quad', INSP, '\\int \\dfrac{2x-3}{x^2-3x-4}\\,dx', '\\log_e|x^2-3x-4| + c', ['2\\log_e|x^2-3x-4| + c', '\\dfrac{1}{2}\\log_e|x^2-3x-4| + c', '\\log_e|x-4| - \\log_e|x+1| + c']],
  ['insp-x2-exp', INSP, '\\int x^2 e^{x^3}\\,dx', '\\dfrac{1}{3}e^{x^3} + c', ['3e^{x^3} + c', '\\dfrac{x^3}{3}e^{x^3} + c', 'e^{x^3} + c']],
  ['insp-tan-sec', INSP, '\\int \\tan^2(x)\\sec^2(x)\\,dx', '\\dfrac{\\tan^3(x)}{3} + c', ['\\dfrac{\\sec^3(x)}{3} + c', '\\tan^3(x) + c', '\\dfrac{\\tan^3(x)\\sec^3(x)}{9} + c']],
  ['insp-sin-cos4', INSP, '\\int \\sin(x)\\cos^4(x)\\,dx', '-\\dfrac{\\cos^5(x)}{5} + c', ['\\dfrac{\\cos^5(x)}{5} + c', '-\\dfrac{\\sin^5(x)}{5} + c', '\\dfrac{\\sin^2(x)\\cos^5(x)}{10} + c']],

  // Question 2 i., worked: the substitution u = f(x).
  ['sub-root', SUB, '\\int \\dfrac{\\sin\\big(\\sqrt{x}\\big)}{\\sqrt{x}}\\,dx', 'u = \\sqrt{x}', ['u = \\sin\\big(\\sqrt{x}\\big)', 'u = \\dfrac{1}{\\sqrt{x}}', 'u = x']],
  ['sub-cos-atan', SUB, '\\int \\dfrac{\\sin(x)}{1+\\cos^2(x)}\\,dx', 'u = \\cos(x)', ['u = 1+\\cos^2(x)', 'u = \\sin(x)', 'u = \\cos^2(x)']],
  ['sub-log', SUB, '\\int \\dfrac{\\log_e(4x)}{x}\\,dx', 'u = \\log_e(4x)', ['u = 4x', 'u = \\dfrac{1}{x}', 'u = x\\log_e(4x)']],
  ['sub-sin-sin', SUB, '\\int \\cos(x)\\sin\\big(\\sin(x)\\big)\\,dx', 'u = \\sin(x)', ['u = \\cos(x)', 'u = \\sin\\big(\\sin(x)\\big)', 'u = \\cos\\big(\\sin(x)\\big)']],
  ['sub-exp', SUB, '\\int \\dfrac{e^{2x}}{e^x+2}\\,dx', 'u = e^x + 2', ['u = e^{2x}', 'u = 2x', 'u = \\dfrac{1}{e^x+2}']],
  ['sub-loglog', SUB, '\\int \\dfrac{\\log_e\\big(\\log_e(x)\\big)}{x\\log_e(x)}\\,dx', 'u = \\log_e(x)\\ \\text{or}\\ u = \\log_e\\big(\\log_e(x)\\big)', ['u = x\\log_e(x)', 'u = \\dfrac{1}{x}', 'u = \\dfrac{1}{\\log_e(x)}']],

  // Question 2 ii.: u = the linear part, and x in terms of u.
  ['lsub-x-root', LSUB, '\\int x\\sqrt{x-2}\\,dx', 'u = x-2,\\ x = u+2', ['u = x-2,\\ x = u-2', 'u = x,\\ x = u', 'u = x\\sqrt{x-2}']],
  ['lsub-x-over-root', LSUB, '\\int \\dfrac{x}{\\sqrt{a-x}}\\,dx', 'u = a-x,\\ x = a-u', ['u = a-x,\\ x = u-a', 'u = x,\\ x = u', 'u = \\dfrac{x}{a-x}']],
  ['lsub-x-sq', LSUB, '\\int \\dfrac{x}{(x+3)^2}\\,dx', 'u = x+3,\\ x = u-3', ['u = x+3,\\ x = u+3', 'u = (x+3)^2,\\ x = \\sqrt{u}-3', 'u = x^2']],
  ['lsub-3-x', LSUB, '\\int (x+1)\\sqrt{3-x}\\,dx', 'u = 3-x,\\ x = 3-u', ['u = 3-x,\\ x = u-3', 'u = x+1,\\ x = u-1', 'u = 3-x,\\ x = u+3']],
  ['lsub-1-2x', LSUB, '\\int (3x+6)\\sqrt{1-2x}\\,dx', 'u = 1-2x,\\ x = \\dfrac{1-u}{2}', ['u = 1-2x,\\ x = \\dfrac{u-1}{2}', 'u = 3x+6,\\ x = \\dfrac{u-6}{3}', 'u = 1-2x,\\ x = 1-2u']],
  ['lsub-5x-6', LSUB, '\\int \\dfrac{2x+1}{\\sqrt{5x-6}}\\,dx', 'u = 5x-6,\\ x = \\dfrac{u+6}{5}', ['u = 5x-6,\\ x = \\dfrac{u-6}{5}', 'u = 2x+1,\\ x = \\dfrac{u-1}{2}', 'u = 5x-6,\\ x = 5u+6']],
  ['lsub-3x-plus-4', LSUB, '\\int \\dfrac{2x+1}{(3x+4)^2}\\,dx', 'u = 3x+4,\\ x = \\dfrac{u-4}{3}', ['u = 3x+4,\\ x = \\dfrac{u+4}{3}', 'u = 2x+1,\\ x = \\dfrac{u-1}{2}', 'u = (3x+4)^2']],

  // Question 4: an identity turns it into a Question 1 or 2 integral.
  ['trig-sin2', TRIG, '\\int \\sin^2(x)\\,dx', '\\sin^2(x) = \\tfrac{1}{2}\\big(1-\\cos(2x)\\big)', ['\\sin^2(x) = \\tfrac{1}{2}\\big(1+\\cos(2x)\\big)', '\\sin^2(x) = 1-\\cos(2x)', '\\sin^2(x) = 1-\\cos^2(x),\\ u = \\cos(x)'], { ask: 'which identity?' }],
  ['trig-cos2-2x', TRIG, '\\int \\cos^2(2x)\\,dx', '\\cos^2(2x) = \\tfrac{1}{2}\\big(1+\\cos(4x)\\big)', ['\\cos^2(2x) = \\tfrac{1}{2}\\big(1+\\cos(2x)\\big)', '\\cos^2(2x) = \\tfrac{1}{2}\\big(1-\\cos(4x)\\big)', '\\cos^2(2x) = \\tfrac{1}{2}\\big(1+\\cos(4x^2)\\big)'], { ask: 'which identity?' }],
  ['trig-sin2cos2', TRIG, '\\int \\sin^2(x)\\cos^2(x)\\,dx', '\\tfrac{1}{4}\\sin^2(2x) = \\tfrac{1}{8}\\big(1-\\cos(4x)\\big)', ['\\tfrac{1}{2}\\sin^2(2x) = \\tfrac{1}{4}\\big(1-\\cos(4x)\\big)', '\\tfrac{1}{4}\\sin^2(2x) = \\tfrac{1}{8}\\big(1+\\cos(4x)\\big)', '\\sin(x)\\cos(x),\\ u = \\sin(x)'], { ask: 'which identity?' }],
  ['trig-sin3', TRIG, '\\int \\sin^3(x)\\,dx', '\\sin(x)\\big(1-\\cos^2(x)\\big),\\ u = \\cos(x)', ['\\sin(x)\\big(1-\\cos^2(x)\\big),\\ u = \\sin(x)', '\\sin(x)\\big(1+\\cos^2(x)\\big),\\ u = \\cos(x)', '\\sin(x)\\cdot\\tfrac{1}{2}\\big(1-\\cos(2x)\\big),\\ u = 2x'], { ask: 'which rewrite and substitution?' }],
  ['trig-cos3', TRIG, '\\int \\cos^3(x)\\,dx', '\\cos(x)\\big(1-\\sin^2(x)\\big),\\ u = \\sin(x)', ['\\cos(x)\\big(1-\\sin^2(x)\\big),\\ u = \\cos(x)', '\\cos(x)\\big(1+\\sin^2(x)\\big),\\ u = \\sin(x)', '\\cos(x)\\cdot\\tfrac{1}{2}\\big(1+\\cos(2x)\\big),\\ u = 2x'], { ask: 'which rewrite and substitution?' }],
  ['trig-sin3cos2', TRIG, '\\int \\sin^3(x)\\cos^2(x)\\,dx', '\\sin(x)\\big(1-\\cos^2(x)\\big)\\cos^2(x),\\ u = \\cos(x)', ['\\sin^3(x)\\big(1-\\sin^2(x)\\big),\\ u = \\sin(x)', '\\sin(x)\\big(1-\\cos^2(x)\\big)\\cos^2(x),\\ u = \\sin(x)', '\\tfrac{1}{4}\\sin^2(2x)\\sin(x),\\ u = 2x'], { ask: 'which rewrite and substitution?' }],
  ['trig-sin2cos3', TRIG, '\\int \\sin^2(2x)\\cos^3(2x)\\,dx', '\\sin^2(2x)\\big(1-\\sin^2(2x)\\big)\\cos(2x),\\ u = \\sin(2x)', ['\\sin^2(2x)\\big(1-\\sin^2(2x)\\big)\\cos(2x),\\ u = \\cos(2x)', '\\big(1-\\cos^2(2x)\\big)\\cos^3(2x),\\ u = \\cos(2x)', '\\tfrac{1}{4}\\sin^2(4x)\\cos(2x),\\ u = 4x'], { ask: 'which rewrite and substitution?' }],
  ['trig-cos2-sin2x', TRIG, '\\int \\cos^2(x)\\sin(2x)\\,dx', '2\\cos^3(x)\\sin(x),\\ u = \\cos(x)', ['2\\cos^3(x)\\sin(x),\\ u = \\sin(x)', '\\cos^3(x)\\sin(x),\\ u = \\cos(x)', '\\tfrac{1}{2}\\big(1+\\cos(2x)\\big)\\sin(2x),\\ u = 2x'], { ask: 'which rewrite and substitution?' }],
  ['trig-split', TRIG, '\\int \\dfrac{1+\\cos^4(2x)}{\\cos^2(2x)}\\,dx', '\\sec^2(2x) + \\cos^2(2x)', ['\\sec^2(2x) + \\cos^4(2x)', '1 + \\cos^2(2x)', '\\sec^2(2x) + \\sec^4(2x)'], { ask: 'split it first: into what?' }],
  ['trig-cos2-result', TRIG, '\\int \\cos^2(x)\\,dx', '\\dfrac{x}{2} + \\dfrac{\\sin(2x)}{4} + c', ['\\dfrac{x}{2} - \\dfrac{\\sin(2x)}{4} + c', '\\dfrac{\\cos^3(x)}{3} + c', '\\dfrac{x}{2} + \\dfrac{\\sin(2x)}{2} + c']],
  ['trig-tan2', TRIG, '\\int \\tan^2(x)\\,dx', '\\tan(x) - x + c', ['\\tan(x) + x + c', '\\dfrac{\\tan^3(x)}{3} + c', '\\sec^2(x) - x + c']],
  ['trig-2-plus-tan2', TRIG, '\\int \\big(2 + \\tan^2(x)\\big)dx', '\\tan(x) + x + c', ['\\tan(x) + 2x + c', '\\tan(x) + 3x + c', '2x + \\dfrac{\\tan^3(x)}{3} + c']],
  ['trig-cos2-def', TRIG, '\\int_0^{\\frac{\\pi}{6}} \\cos^2(3x)\\,dx', '\\dfrac{\\pi}{12}', ['\\dfrac{\\pi}{6}', '\\dfrac{\\pi}{12} + \\dfrac{1}{12}', '\\dfrac{\\pi}{24}'], { oneWay: true }],

  // Question 3: polynomial over polynomial.
  ['pf-linear', PF, '\\int \\dfrac{4x+5}{(x+1)(x+2)}\\,dx', '\\dfrac{A}{x+1} + \\dfrac{B}{x+2}', ['\\dfrac{A}{(x+1)(x+2)}', '\\dfrac{A}{x+1} + \\dfrac{B}{(x+2)^2}', '\\dfrac{Ax+B}{x+1} + \\dfrac{C}{x+2}'], { ask: PF_ASK }],
  ['pf-x-x3', PF, '\\int \\dfrac{1}{x(x+3)}\\,dx', '\\dfrac{A}{x} + \\dfrac{B}{x+3}', ['\\dfrac{A}{x} + \\dfrac{B}{x-3}', '\\dfrac{A}{x+3}', '\\dfrac{Ax+B}{x+3}'], { ask: PF_ASK }],
  ['pf-dos', PF, '\\int \\dfrac{1}{9-x^2}\\,dx', '\\dfrac{A}{3-x} + \\dfrac{B}{3+x}', ['\\dfrac{A}{3-x} + \\dfrac{B}{(3-x)^2}', '\\dfrac{A}{9-x} + \\dfrac{B}{x^2}', '\\dfrac{A}{x-3} + \\dfrac{B}{x-9}'], { ask: PF_ASK, family: 'nine' }],
  ['pf-repeated', PF, '\\int \\dfrac{3x+1}{(x+2)^2}\\,dx', '\\dfrac{A}{x+2} + \\dfrac{B}{(x+2)^2}', ['\\dfrac{A}{x+2} + \\dfrac{B}{x-2}', '\\dfrac{A}{(x+2)^2}', '\\dfrac{A}{x+2} + \\dfrac{Bx+C}{(x+2)^2}'], { ask: PF_ASK }],
  ['pf-lf-rlf', PF, '\\int \\dfrac{x+5}{(x-1)^2(x+2)}\\,dx', '\\dfrac{A}{x-1} + \\dfrac{B}{(x-1)^2} + \\dfrac{C}{x+2}', ['\\dfrac{A}{(x-1)^2} + \\dfrac{B}{x+2}', '\\dfrac{A}{x-1} + \\dfrac{B}{x+2}', '\\dfrac{Ax+B}{(x-1)^2} + \\dfrac{C}{(x+2)^2}'], { ask: PF_ASK }],
  ['pf-quad-x', PF, '\\int \\dfrac{2x^2-x+4}{x^3+4x}\\,dx', '\\dfrac{A}{x} + \\dfrac{Bx+C}{x^2+4}', ['\\dfrac{A}{x} + \\dfrac{B}{x^2+4}', '\\dfrac{A}{x} + \\dfrac{B}{x+2} + \\dfrac{C}{x-2}', '\\dfrac{A}{x} + \\dfrac{B}{x^2} + \\dfrac{C}{x^2+4}'], { ask: PF_ASK }],
  ['pf-quad-lin', PF, '\\int \\dfrac{x^2+x}{(x^2+2)(x-2)}\\,dx', '\\dfrac{A}{x-2} + \\dfrac{Bx+C}{x^2+2}', ['\\dfrac{A}{x-2} + \\dfrac{B}{x^2+2}', '\\dfrac{A}{x-2} + \\dfrac{B}{x+\\sqrt{2}} + \\dfrac{C}{x-\\sqrt{2}}', '\\dfrac{Ax+B}{x-2} + \\dfrac{C}{x^2+2}'], { ask: PF_ASK }],
  ['pf-x-quad', PF, '\\int \\dfrac{1}{x(x^2+1)}\\,dx', '\\dfrac{A}{x} + \\dfrac{Bx+C}{x^2+1}', ['\\dfrac{A}{x} + \\dfrac{B}{x^2+1}', '\\dfrac{A}{x} + \\dfrac{B}{x+1} + \\dfrac{C}{x-1}', '\\dfrac{A}{x} + \\dfrac{B}{x^2}'], { ask: PF_ASK }],
  ['div-lin', PF, '\\int \\dfrac{x^2+2}{x+1}\\,dx', 'x - 1 + \\dfrac{3}{x+1}', ['x + 1 + \\dfrac{3}{x+1}', 'x - 1 + \\dfrac{1}{x+1}', 'x + 1 + \\dfrac{1}{x+1}'], { ask: DIV_ASK }],
  ['div-nine', PF, '\\int \\dfrac{x^2}{9+x^2}\\,dx', '1 - \\dfrac{9}{9+x^2}', ['1 + \\dfrac{9}{9+x^2}', 'x - \\dfrac{9}{9+x^2}', '1 - \\dfrac{1}{9+x^2}'], { ask: DIV_ASK, family: 'nine' }],
  ['div-quartic', PF, '\\int \\dfrac{x^4+3x+1}{x^2+2}\\,dx', 'x^2 - 2 + \\dfrac{3x+5}{x^2+2}', ['x^2 + 2 + \\dfrac{3x-3}{x^2+2}', 'x^2 - 2 + \\dfrac{3x+1}{x^2+2}', 'x^2 + \\dfrac{3x+1}{x^2+2}'], { ask: DIV_ASK }],

  // Question 5: a product of two unrelated functions. u from LIATE.
  ['parts-xe2x', PARTS, '\\int x e^{2x}\\,dx', 'u = x,\\ \\dfrac{dv}{dx} = e^{2x}', ['u = e^{2x},\\ \\dfrac{dv}{dx} = x', 'u = xe^{2x},\\ \\dfrac{dv}{dx} = 1', 'u = 2x,\\ \\dfrac{dv}{dx} = x'], { ask: PARTS_ASK }],
  ['parts-xsin', PARTS, '\\int x\\sin(x)\\,dx', 'u = x,\\ \\dfrac{dv}{dx} = \\sin(x)', ['u = \\sin(x),\\ \\dfrac{dv}{dx} = x', 'u = \\cos(x),\\ \\dfrac{dv}{dx} = x', 'u = x\\sin(x),\\ \\dfrac{dv}{dx} = 1'], { ask: PARTS_ASK }],
  ['parts-x2sin', PARTS, '\\int x^2\\sin(x)\\,dx', 'u = x^2,\\ \\dfrac{dv}{dx} = \\sin(x)\\ \\text{(then parts again)}', ['u = \\sin(x),\\ \\dfrac{dv}{dx} = x^2', 'u = x,\\ \\dfrac{dv}{dx} = x\\sin(x)', 'u = x^2\\sin(x),\\ \\dfrac{dv}{dx} = 1'], { ask: PARTS_ASK }],
  ['parts-log', PARTS, '\\int \\log_e(x)\\,dx', 'u = \\log_e(x),\\ \\dfrac{dv}{dx} = 1', ['u = 1,\\ \\dfrac{dv}{dx} = \\log_e(x)', 'u = x,\\ \\dfrac{dv}{dx} = \\log_e(x)', 'u = \\log_e(x),\\ \\dfrac{dv}{dx} = x'], { ask: PARTS_ASK }],
  ['parts-asin', PARTS, '\\int \\sin^{-1}(x)\\,dx', 'u = \\sin^{-1}(x),\\ \\dfrac{dv}{dx} = 1', ['u = 1,\\ \\dfrac{dv}{dx} = \\sin^{-1}(x)', 'u = x,\\ \\dfrac{dv}{dx} = \\sin^{-1}(x)', 'u = \\sin(x),\\ \\dfrac{dv}{dx} = 1'], { ask: PARTS_ASK }],
  ['parts-atan', PARTS, '\\int \\tan^{-1}(x)\\,dx', 'u = \\tan^{-1}(x),\\ \\dfrac{dv}{dx} = 1', ['u = 1,\\ \\dfrac{dv}{dx} = \\tan^{-1}(x)', 'u = x,\\ \\dfrac{dv}{dx} = \\tan^{-1}(x)', 'u = \\tan(x),\\ \\dfrac{dv}{dx} = 1'], { ask: PARTS_ASK }],
]

// Fill-the-gap versions: the coefficient or sign most often got wrong.
const gaps: Record<string, [string, string[]]> = {
  'atan-1': ['\\int \\dfrac{1}{a^2+x^2}\\,dx = \\gap\\,\\tan^{-1}\\left(\\dfrac{x}{a}\\right) + c', ['1/a']],
  'asin-9': ['\\int \\dfrac{1}{\\sqrt{9-x^2}}\\,dx = \\sin^{-1}\\left(\\dfrac{x}{\\gap}\\right) + c', ['3']],
  'atan-9': ['\\int \\dfrac{1}{9+x^2}\\,dx = \\gap\\,\\tan^{-1}\\left(\\dfrac{x}{3}\\right) + c', ['1/3']],
  'atan-coef': ['\\int \\dfrac{1}{4x^2+9}\\,dx = \\gap\\,\\tan^{-1}\\left(\\dfrac{2x}{3}\\right) + c', ['1/6']],
  'asin-coef': ['\\int \\dfrac{1}{\\sqrt{4-9x^2}}\\,dx = \\gap\\,\\sin^{-1}\\left(\\dfrac{3x}{2}\\right) + c', ['1/3']],
  'asin-linear': ['\\int \\dfrac{3}{\\sqrt{4-(6x-1)^2}}\\,dx = \\gap\\,\\sin^{-1}\\left(\\dfrac{6x-1}{2}\\right) + c', ['1/2', '0.5']],
  'atan-square': ['\\int \\dfrac{1}{x^2+2x+10}\\,dx = \\dfrac{1}{3}\\tan^{-1}\\left(\\dfrac{x+\\gap}{3}\\right) + c', ['1']],
  'log-2-x': ['\\int \\dfrac{1}{2-x}\\,dx = \\gap\\log_e|2-x| + c', ['-']],
  'sec-sq': ['\\int 8\\sec^2(3x)\\,dx = \\gap\\,\\tan(3x) + c', ['8/3']],
  'insp-root': ['\\int \\dfrac{f\'(x)}{\\sqrt{f(x)}}\\,dx = \\gap\\sqrt{f(x)} + c', ['2']],
  'insp-x-9-plus-x2': ['\\int \\dfrac{x}{9+x^2}\\,dx = \\gap\\,\\log_e(9+x^2) + c', ['1/2', '0.5']],
  'insp-x-a-x2': ['\\int \\dfrac{x}{a-x^2}\\,dx = \\gap\\,\\log_e|a-x^2| + c', ['-1/2', '-0.5']],
  'insp-x-root': ['\\int \\dfrac{x}{\\sqrt{9-x^2}}\\,dx = \\gap\\sqrt{9-x^2} + c', ['-', '-1']],
  'insp-x2-exp': ['\\int x^2 e^{x^3}\\,dx = \\gap\\,e^{x^3} + c', ['1/3']],
  'insp-sin-cos4': ['\\int \\sin(x)\\cos^4(x)\\,dx = \\gap\\dfrac{\\cos^5(x)}{5} + c', ['-']],
  'lsub-x-root': ['u = x-2,\\ x = u \\gap 2', ['+']],
  'lsub-x-sq': ['u = x+3,\\ x = u \\gap 3', ['-']],
  'trig-sin2': ['\\sin^2(x) = \\tfrac{1}{2}\\big(1 \\gap \\cos(2x)\\big)', ['-']],
  'trig-cos2-2x': ['\\cos^2(2x) = \\tfrac{1}{2}\\big(1+\\cos(\\gap x)\\big)', ['4']],
  'trig-cos2-result': ['\\int \\cos^2(x)\\,dx = \\dfrac{x}{2} \\gap \\dfrac{\\sin(2x)}{4} + c', ['+']],
  'trig-tan2': ['\\int \\tan^2(x)\\,dx = \\tan(x) \\gap x + c', ['-']],
  'div-lin': ['\\dfrac{x^2+2}{x+1} = x - 1 + \\dfrac{\\gap}{x+1}', ['3']],
}

const tips: Record<string, string> = {
  'asin': 'Formula sheet. The a under the root goes into the argument, not out the front.',
  'acos': 'The same as sin⁻¹ but with a minus on top.',
  'atan': 'The a on top is part of the formula; without it you get 1/a out the front.',
  'atan-9': 'k² + x² with a constant on top → tan⁻¹.',
  'asin-root-a': 'The a in the formula is √a here.',
  'atan-coef': 'Take out the coefficient of x²: 4(x² + 9/4).',
  'atan-6': 'Take out 4: (6/4) · 1/(x² + 9/4), then (3/2) · (2/3)tan⁻¹(2x/3).',
  'asin-coef': 'Take out the 9: 1/(3√(4/9 − x²)).',
  'asin-linear': 'Divide by 6, the derivative of the inside 6x − 1.',
  'atan-square': 'Complete the square: (x + 1)² + 9.',
  'asin-square': 'Complete the square: 9 − (x + 2)².',
  'recip-sq': 'A power, (9 + x)⁻², not a log or tan⁻¹.',
  'insp-log': 'Top is the derivative of the bottom.',
  'insp-x-9-plus-x2': 'x on top with x² underneath: substitution first, not tan⁻¹.',
  'insp-x-root': 'u = 9 − x², du/dx = −2x.',
  'insp-quad': 'The top is the derivative of the bottom, so skip partial fractions.',
  'insp-x2-exp': 'Or u = x³, du/dx = 3x².',
  'insp-tan-sec': 'sec²(x) is the derivative of tan(x): no identity needed.',
  'insp-sin-cos4': 'u = cos(x), du/dx = −sin(x).',
  'sub-root': 'd/dx √x = 1/(2√x), which is there.',
  'sub-cos-atan': 'Gives −∫1/(1 + u²) du = −tan⁻¹(cos(x)) + c.',
  'sub-exp': 'Then eˣ = u − 2 and du = eˣ dx.',
  'sub-loglog': 'u = logₑ(x) leaves ∫logₑ(u)/u du; u = logₑ(logₑ(x)) leaves ∫u du.',
  'lsub-x-root': 'Let u be the linear part and write x in terms of u.',
  'lsub-x-sq': 'Partial fractions with a repeated factor also works.',
  'trig-sin2': 'Even powers: double angle.',
  'trig-sin3': 'Odd power: take one sin(x) out, convert the rest with sin² + cos² = 1.',
  'trig-cos3': 'Odd power: take one cos(x) out, convert the rest.',
  'trig-sin3cos2': 'Save one factor of the odd power for du.',
  'trig-sin2cos3': 'du = 2cos(2x) dx.',
  'trig-cos2-sin2x': 'sin(2x) = 2sin(x)cos(x) first.',
  'trig-split': 'Then integrate sec²(2x) from the table and cos²(2x) by double angle.',
  'trig-tan2': 'tan²(x) = sec²(x) − 1.',
  'trig-2-plus-tan2': '2 + tan²(x) = 1 + sec²(x).',
  'trig-cos2-def': '½[x + sin(6x)/6] from 0 to π/6, and sin(π) = 0.',
  'pf-linear': 'Check first: the top is not a multiple of 2x + 3, the derivative of the bottom.',
  'pf-dos': '9 − x² gives logs; 9 + x² gives tan⁻¹; √(9 − x²) gives sin⁻¹.',
  'pf-repeated': 'A repeated factor needs both powers.',
  'pf-quad-x': 'x² + 4 doesn’t factor: it takes Bx + C on top.',
  'pf-quad-lin': 'x² + 2 doesn’t factor over the rationals: Bx + C on top.',
  'div-lin': 'Degree of top ≥ degree of bottom: long division first.',
  'div-nine': 'Then x − 3tan⁻¹(x/3) + c.',
  'parts-xe2x': 'LIATE: algebraic before exponential.',
  'parts-x2sin': 'x² × trig needs parts twice.',
  'parts-log': 'dv/dx = 1 when there is only one function.',
  'parts-asin': 'Inverse circular comes first in LIATE.',
}

export const integrationSpecialistDeck: Deck = {
  id: 'integration-specialist',
  title: 'Integration',
  blurb: 'Which technique, and the answer when it can be written straight down: standard forms, inspection, substitution, trig powers, partial fractions and by parts.',
  groups: [STD, INSP, SUB, LSUB, TRIG, PF, PARTS],
  cards: rows.map(([id, group, front, back, traps, extra]) => ({
    id,
    group,
    front: t(front),
    back: t(back),
    traps: traps.map(t),
    // A method can't be asked backwards: the substitution doesn't pin down the integral.
    oneWay: [SUB, LSUB, PF, PARTS].includes(group) || (group === TRIG && !!extra?.ask) || undefined,
    ask: [SUB, LSUB].includes(group) ? SUB_ASK : undefined,
    tip: tips[id],
    gap: gaps[id] && { tex: gaps[id][0], answers: gaps[id][1] },
    ...extra,
  })),
  directionLabel: { fwd: 'Integrate', rev: 'Differentiate' },
  promptLabel: { fwd: 'Find', rev: 'Which integral gives this?' },
  maxTraps: 3,
  source: 'Kevin’s 2026 Specialist integration lectures',
}
