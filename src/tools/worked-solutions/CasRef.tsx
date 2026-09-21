// Inline TI-Nspire CAS references with a click-to-open explanation popover.
//
// The authoring guide (§12.5, §13.1) requires that wherever an Exam 2 solution says
// technology is the expected tool, it gives the actual TI-Nspire CAS call — and that every
// such call carries a popup explaining that function's purpose, structure and syntax. A
// student who has never met `invNorm` shouldn't have to go and look it up elsewhere.
//
// Usage inside a WorkingRow:
//
//   <Cas fn="normCdf">normCdf(370, 375, 375, 15/√50)</Cas>
//
// `fn` picks the reference entry; the children are the concrete call for this question,
// shown in monospace. Clicking opens a small panel anchored under the call. If `children`
// is omitted the entry's generic syntax is shown instead.
//
// The panel is portalled to <body> and positioned fixed, because the working-table card it
// usually sits inside is `overflow-hidden` — an absolutely positioned panel gets clipped at
// the card edge on both axes.
//
// Adding a function: add an entry to CAS_FUNCTIONS below. Keep `purpose` to one sentence,
// `structure` to the argument list in order, and `notes` to the traps that actually cost
// marks (argument order, lower/upper bounds, degrees vs radians).

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

interface CasEntry {
  /** Generic call signature, shown as the heading of the popover. */
  syntax: string
  /** One sentence: what it is for. */
  purpose: string
  /** Each argument in order, as [name, meaning]. */
  structure: [string, string][]
  /** Gotchas worth stating — argument order, bounds, common misuse. */
  notes?: string
  /** Where it lives on the handheld, if not obvious. */
  menu?: string
}

const CAS_FUNCTIONS: Record<string, CasEntry> = {
  solve: {
    syntax: 'solve(equation, variable)',
    purpose: 'Solves an equation (or system) exactly for the named variable.',
    structure: [
      ['equation', 'the equation to solve, written with = (not :=)'],
      ['variable', 'the unknown to solve for'],
    ],
    notes:
      'Add a domain restriction with the "such that" bar to keep only the solutions you want, e.g. solve(f(x)=0, x) | 0 ≤ x ≤ 2π. Without it you may get a general solution with an arbitrary integer constant. Use "and" to solve simultaneously: solve(a+b=2 and a²+b²=10, {a,b}).',
    menu: 'menu → 3 Algebra → 1 Solve',
  },
  nSolve: {
    syntax: 'nSolve(equation, variable)',
    purpose: 'Finds one numerical solution when an exact one cannot be found.',
    structure: [
      ['equation', 'the equation to solve'],
      ['variable', 'the unknown, optionally with a starting guess or bounds'],
    ],
    notes:
      'Returns a single root only. Give bounds — nSolve(f(x)=0, x) | 10 ≤ x ≤ 20 — when the equation has several, or you may get the wrong one.',
    menu: 'menu → 3 Algebra → 1 Solve → nSolve',
  },
  normCdf: {
    syntax: 'normCdf(lower, upper, μ, σ)',
    purpose: 'The probability that a normally distributed variable lies between two values.',
    structure: [
      ['lower', 'lower bound (use −∞ for an open lower tail)'],
      ['upper', 'upper bound (use ∞ for an open upper tail)'],
      ['μ', 'the mean'],
      ['σ', 'the standard deviation — not the variance'],
    ],
    notes:
      'The bounds come first and the parameters last, which is the reverse of how the distribution is usually written. For a sample mean, σ is σ/√n, not the population σ.',
    menu: 'menu → 5 Probability → 5 Distributions → 2 Normal Cdf',
  },
  invNorm: {
    syntax: 'invNorm(area, μ, σ)',
    purpose: 'Runs a normal distribution backwards: give it an area, it returns the boundary value.',
    structure: [
      ['area', 'the probability to the LEFT of the value you want'],
      ['μ', 'the mean'],
      ['σ', 'the standard deviation'],
    ],
    notes:
      'Always a left tail. For the top 5% ask for invNorm(0.95, …); for a central 95% interval ask for invNorm(0.975, …) and use symmetry.',
    menu: 'menu → 5 Probability → 5 Distributions → 3 Inverse Normal',
  },
  binomPdf: {
    syntax: 'binomPdf(n, p, x)',
    purpose: 'The probability of exactly x successes in n independent binomial trials.',
    structure: [
      ['n', 'number of trials'],
      ['p', 'probability of success on one trial'],
      ['x', 'the exact number of successes'],
    ],
    notes: 'Use this for Pr(X = x) only. For a range of values use binomCdf.',
    menu: 'menu → 5 Probability → 5 Distributions → D Binomial Pdf',
  },
  binomCdf: {
    syntax: 'binomCdf(n, p, lowBound, upBound)',
    purpose: 'The probability that a binomial count falls in a range, inclusive of both bounds.',
    structure: [
      ['n', 'number of trials'],
      ['p', 'probability of success on one trial'],
      ['lowBound', 'smallest number of successes counted'],
      ['upBound', 'largest number of successes counted'],
    ],
    notes:
      'Both bounds are included. Pr(X ≥ 3) with n = 36 is binomCdf(36, p, 3, 36), and Pr(X ≤ 2) is binomCdf(36, p, 0, 2) — off-by-one here is a common mark-loser.',
    menu: 'menu → 5 Probability → 5 Distributions → E Binomial Cdf',
  },
  fMax: {
    syntax: 'fMax(expression, variable)',
    purpose: 'Returns the value of the variable at which an expression is greatest.',
    structure: [
      ['expression', 'the function to maximise'],
      ['variable', 'the variable to vary'],
    ],
    notes:
      'Gives the x-value, not the maximum itself — substitute back to get the maximum value. Restrict the domain with the "such that" bar when the function has several peaks. fMin works the same way.',
    menu: 'menu → 4 Calculus → 7 Function Maximum',
  },
  fMin: {
    syntax: 'fMin(expression, variable)',
    purpose: 'Returns the value of the variable at which an expression is smallest.',
    structure: [
      ['expression', 'the function to minimise'],
      ['variable', 'the variable to vary'],
    ],
    notes:
      'Gives the x-value, not the minimum itself — substitute back to get the minimum value. Restrict the domain with the "such that" bar (fMin(d(x), x) | 0 ≤ x ≤ 1) whenever the function has several troughs or the question limits the domain, otherwise the answer can come from outside the region you care about. fMax works the same way.',
    menu: 'menu → 4 Calculus → 8 Function Minimum',
  },
  nInt: {
    syntax: 'nInt(expression, variable, lower, upper)',
    purpose: 'Evaluates a definite integral numerically when no exact antiderivative exists.',
    structure: [
      ['expression', 'the integrand'],
      ['variable', 'the variable of integration'],
      ['lower', 'lower terminal'],
      ['upper', 'upper terminal'],
    ],
    notes:
      'Use the template integral (ctrl + I) for an exact answer first; fall back to nInt only when the exact form is unavailable or a decimal is what the question asks for.',
    menu: 'menu → 4 Calculus → 3 Integral',
  },
  derivative: {
    syntax: 'd/dx(expression) | x = value',
    purpose: 'Differentiates an expression, optionally evaluated at a point.',
    structure: [
      ['expression', 'the function to differentiate'],
      ['| x = value', 'optional: evaluate the derivative at this point'],
    ],
    notes:
      'Built with the derivative template (menu → 4 Calculus → 1 Derivative), not typed as "d/dx". The "such that" bar evaluates it without a separate substitution step.',
    menu: 'menu → 4 Calculus → 1 Derivative',
  },
  define: {
    syntax: 'Define f(x) = expression',
    purpose: 'Stores a function so later calls can reuse it by name.',
    structure: [
      ['f(x)', 'the name and its variable'],
      ['expression', 'the rule'],
    ],
    notes:
      'Worth doing whenever a question has several parts about one function — it removes the retyping that causes transcription errors, which examination reports flag every year.',
    menu: 'menu → 1 Actions → 1 Define',
  },
}

/**
 * An inline TI-Nspire CAS call with a click-to-open explanation.
 * `fn` must be a key of CAS_FUNCTIONS; `children` is the concrete call for this question.
 */
export function Cas({ fn, children }: { fn: keyof typeof CAS_FUNCTIONS; children?: ReactNode }) {
  const entry = CAS_FUNCTIONS[fn]
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<CSSProperties>()
  const wrapRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()

  // Anchor the panel to the trigger in viewport coordinates, flipping above when there is
  // more room up there, and clamping to the window so it never runs off an edge.
  const place = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const width = Math.min(384, window.innerWidth - 16)
    const left = Math.max(8, Math.min(r.left, window.innerWidth - width - 8))
    const below = window.innerHeight - r.bottom - 14
    const above = r.top - 14
    setStyle(
      below < 200 && above > below
        ? { left, width, bottom: window.innerHeight - r.top + 6, maxHeight: above }
        : { left, width, top: r.bottom + 6, maxHeight: below },
    )
  }, [])

  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  // Close on outside click or Esc — a popover that traps the page is worse than no popover.
  // Scrolling any ancestor moves the trigger, so reposition rather than leaving it stranded.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!wrapRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open, place])

  return (
    <span className="inline-block" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        title={`What does ${fn} do?`}
        className="font-mono text-[12.5px] px-1.5 py-0.5 rounded-md border border-violet-200 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors cursor-pointer"
      >
        {children ?? entry.syntax}
        <span className="ml-1 text-[10px] align-super opacity-70">?</span>
      </button>

      {open &&
        style &&
        createPortal(
          <div
            id={panelId}
            role="dialog"
            ref={panelRef}
            style={style}
            className="fixed z-50 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-4 text-left"
          >
            <p className="font-mono text-[12.5px] font-semibold text-violet-800 dark:text-violet-200 mb-1.5">
              {entry.syntax}
            </p>
            <p className="text-[12.5px] leading-relaxed text-gray-700 dark:text-gray-200 mb-2.5">
              {entry.purpose}
            </p>
            <p className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              Arguments
            </p>
            <div className="mb-2.5">
              {entry.structure.map(([name, meaning]) => (
                <div key={name} className="flex gap-2 text-[12px] leading-relaxed mb-0.5">
                  <span className="font-mono text-gray-800 dark:text-gray-100 flex-none">{name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{meaning}</span>
                </div>
              ))}
            </div>
            {entry.notes && (
              <p className="text-[12px] leading-relaxed text-gray-600 dark:text-gray-300 mb-2">
                {entry.notes}
              </p>
            )}
            {entry.menu && (
              <p className="text-[11.5px] text-gray-400 dark:text-gray-500">{entry.menu}</p>
            )}
          </div>,
          document.body,
        )}
    </span>
  )
}
