// 2015 Specialist Mathematics — Exam 2, MCQ 6.
// Complex numbers: which statement about the Argand-diagram parallelogram is not true?

import { useState, ReactNode } from 'react'

type Tab = 'solution' | 'video'

export default function SpecialistMCQ6() {
  const [tab, setTab] = useState<Tab>('solution')

  return (
    <div>
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 mb-6">
        The points corresponding to the four complex numbers z<sub>1</sub> = 2&nbsp;cis(π/3), z<sub>2</sub> = cis(3π/4),
        z<sub>3</sub> = 2&nbsp;cis(−2π/3), z<sub>4</sub> = cis(−π/4) are the vertices of a parallelogram in the complex
        plane. Which one of the following statements is <strong className="text-gray-900 dark:text-white">not</strong> true?
      </div>

      <div className="flex gap-6 mb-6 flex-col sm:flex-row">
        <div className="flex-none w-full sm:w-56 flex items-center justify-center bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-2">
          <ArgandDiagram />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Option letter="A" correct text="The acute angle between the diagonals of the parallelogram is 5π/12." />
          <Option letter="B" correct text="The diagonals of the parallelogram have lengths 2 and 4." />
          <Option
            letter="C"
            correct={false}
            text="If z1, z2, z3 and z4 are four solutions of a polynomial equation, then the polynomial equation must have the form zⁿ + a = 0."
            flag="Not true — this is the answer"
          />
          <Option letter="D" correct text="z1 + z2 = −z3 − z4" />
          <Option letter="E" correct text="1 ≤ |z| ≤ 2 for all four of z1, z2, z3, z4." />
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-fit mb-5">
        <TabButton active={tab === 'solution'} onClick={() => setTab('solution')}>Worked solution</TabButton>
        <TabButton active={tab === 'video'} onClick={() => setTab('video')}>Video walkthrough</TabButton>
      </div>

      {tab === 'solution' ? (
        <ol className="flex flex-col gap-3.5 list-none p-0 m-0">
          <Step n={1}>
            The diagonals run z2→z4 and z1→z3. <b>arg(z1) − arg(z2) = π/3 − 3π/4 = −5π/12</b>, so the acute angle
            between them is 5π/12 — <b>A is true</b>.
          </Step>
          <Step n={2}>
            |z1| = |z3| = 2 and |z2| = |z4| = 1, so the diagonals have lengths 2|z1| = 4 and 2|z2| = 2 — <b>B is true</b>.
          </Step>
          <Step n={3}>
            z3 = −z1 and z4 = −z2 (same modulus, angle shifted by π), so z1 + z2 = −z3 − z4 holds for <i>any</i>{' '}
            parallelogram like this — <b>D is true</b>, sub in and check.
          </Step>
          <Step n={4}>
            |z1| = |z3| = 2 and |z2| = |z4| = 1, so 1 ≤ |z| ≤ 2 for all four — <b>E is true</b>.
          </Step>
          <Step n={5}>
            For roots of zⁿ + a = 0, every root must share the <i>same</i> modulus |a|^(1/n) — but here |z1| = 2 ≠ 1 = |z2|.{' '}
            <b>C is not true — that's the answer.</b>
          </Step>
        </ol>
      ) : (
        <div className="border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-7 py-9 text-center text-[13.5px] leading-relaxed text-gray-400 dark:text-gray-500">
          Video walkthrough coming soon.
        </div>
      )}
    </div>
  )
}

function Option({ letter, text, correct, flag }: { letter: string; text: string; correct: boolean; flag?: string }) {
  return (
    <div
      className={`flex gap-2.5 items-start px-3 py-2.5 rounded-xl border ${
        correct
          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900'
          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'
      }`}
    >
      <span
        className={`flex-none w-5 h-5 rounded-full flex items-center justify-center font-display text-[11.5px] font-bold mt-0.5 ${
          correct
            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
        }`}
      >
        {letter}
      </span>
      <div>
        <span className="text-[13.5px] text-gray-700 dark:text-gray-300 leading-snug">{text}</span>
        {flag && <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 mt-1">{flag}</div>}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-colors ${
        active
          ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex-none w-[22px] h-[22px] rounded-full bg-sky-500 text-white font-display text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">{children}</span>
    </li>
  )
}

// Argand diagram: z1 = 2cis(60°), z2 = cis(135°), z3 = 2cis(-120°), z4 = cis(-45°) —
// plotted on unit-radius-1 and radius-2 circles, diagonals z1–z3 and z2–z4 drawn in orange.
function ArgandDiagram() {
  return (
    <svg viewBox="0 0 240 240" width={204} height={204}>
      <line x1={8} y1={120} x2={232} y2={120} stroke="#7dd3fc" strokeWidth={1.5} />
      <line x1={120} y1={8} x2={120} y2={232} stroke="#7dd3fc" strokeWidth={1.5} />
      <circle cx={120} cy={120} r={45} fill="none" stroke="#7dd3fc" strokeWidth={1.5} />
      <circle cx={120} cy={120} r={90} fill="none" stroke="#7dd3fc" strokeWidth={1.5} />
      <line x1={165} y1={42.06} x2={75} y2={197.94} stroke="#fb923c" strokeWidth={2} />
      <line x1={88.18} y1={88.18} x2={151.82} y2={151.82} stroke="#fb923c" strokeWidth={2} />
      <circle cx={165} cy={42.06} r={4.5} fill="#f97316" />
      <circle cx={88.18} cy={88.18} r={4.5} fill="#f97316" />
      <circle cx={75} cy={197.94} r={4.5} fill="#f97316" />
      <circle cx={151.82} cy={151.82} r={4.5} fill="#f97316" />
      <text x={170} y={38} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z1</text>
      <text x={56} y={84} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z2</text>
      <text x={48} y={207} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z3</text>
      <text x={157} y={165} fontSize={12} className="fill-gray-700 dark:fill-gray-300">z4</text>
      <path d="M 133 106 A 17 17 0 0 1 123 129" fill="none" stroke="#ef4444" strokeWidth={1.5} />
      <text x={136} y={110} fontSize={10} className="fill-rose-600 dark:fill-rose-400">5π/12</text>
    </svg>
  )
}
