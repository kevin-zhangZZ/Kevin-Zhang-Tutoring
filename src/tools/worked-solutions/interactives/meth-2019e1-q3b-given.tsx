// 2019 Methods Exam 1 Q3b — "given a head" as counting. Imagine Jo repeating the experiment 9
// times (the smallest number that makes every count whole): each coin is picked 1/3 of the time,
// so the two fair coins get 6 goes between them and the biased coin gets 3. A fair coin shows a
// head on half its goes (3 of 6), the biased coin on a third (1 of 3): 4 heads in 9 goes, part
// a.'s 4/9. Step 2 crosses out the 5 tails, which "given a head" rules out; step 3 counts the fair
// heads among the 4 that are left: 3/4 = (3/9)/(4/9). A wrong-idea toggle on the last step counts
// the 3 fair heads out of all 9 goes instead, giving 3/9 = 1/3, which is Pr(U ∩ H), not Pr(U | H).

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, StepNav, Toggle, useSteps } from './kit'

// Each go: which kind of coin was picked, and what it showed.
const FAIR = ['H', 'H', 'H', 'T', 'T', 'T']
const BIASED = ['H', 'T', 'T']
const R = 19
const GAP = 50
const X0 = 30
const ROW_FAIR = 58
const ROW_BIAS = 142
const STEPS = 3

export default function GivenHead() {
  const { step, next, back } = useSteps(STEPS)
  const [wrong, setWrong] = useState(false)
  const last = step === STEPS - 1
  const showWrong = wrong && last
  const crossTails = step >= 1 && !showWrong

  const coin = (face: string, i: number, cx: number, cy: number, color: string) => {
    const head = face === 'H'
    const out = !head && crossTails
    const hot = head && last && color === C.f && !showWrong
    return (
      <g key={i} opacity={out ? 0.28 : 1}>
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill={head ? color : 'none'}
          fillOpacity={head ? 0.35 : 0}
          stroke={color}
          strokeWidth={hot ? 4 : 2.2}
        />
        <text x={cx} y={cy + 6} fontSize={17} fontWeight={800} textAnchor="middle" fill="currentColor" opacity={head ? 1 : 0.6}>
          {face}
        </text>
        {out && <line x1={cx - R + 3} y1={cy + R - 3} x2={cx + R - 3} y2={cy - R + 3} stroke={C.bad} strokeWidth={2.4} />}
      </g>
    )
  }

  const rowCount = (heads: number, goes: number, y: number, color: string) => (
    <text x={X0 + (goes - 1) * GAP + R + 12} y={y + 5} fontSize={13} fontWeight={700} fill={color}>
      {crossTails ? `${heads} H` : `${heads} H of ${goes}`}
    </text>
  )

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        <b>Imagine Jo doing the whole thing 9 times.</b> Each coin is picked <M>{'\\tfrac13'}</M> of the time, so the two fair
        coins get 6 of the goes and the biased coin gets 3. A fair coin lands heads on half its goes (3 of 6), the biased coin
        on a third of its goes (1 of 3). That is 4 heads in 9 goes, part a.&apos;s <M>{'\\tfrac49'}</M>. Press Next to use the
        news &ldquo;she tossed a head&rdquo;.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        <b>Given a head, the 5 tails didn&apos;t happen</b>, so cross them out. The 4 heads left are now the whole story, and
        each of them is equally likely to be the go Jo actually had. That is what dividing by <M>{'\\Pr(H)'}</M> does: it makes
        the heads the new total.
      </Notice>
    )
  } else if (!showWrong) {
    notice = (
      <Notice tone="good">
        Of the 4 heads, 3 came from a fair coin: <M>{'\\Pr(U\\mid H) = \\tfrac34'}</M>. As probabilities that is{' '}
        <M>{'\\tfrac{3/9}{4/9}'}</M>, and the ninths cancel, which is why writing part a. as <M>{'\\tfrac49'}</M> makes part b.
        one line. It beats the <M>{'\\tfrac23'}</M> we started with because fair coins give heads more readily. Now try the
        wrong idea.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Counting the 3 fair heads out of <b>all 9</b> goes gives <M>{'\\tfrac39 = \\tfrac13'}</M>. That is{' '}
        <M>{'\\Pr(U\\cap H)'}</M>, &ldquo;picked a fair coin <b>and</b> got a head&rdquo;, which is only the numerator. Once we
        know she tossed a head, the 5 tails are impossible, so the denominator is the 4 heads, not the 9 goes.
      </Notice>
    )
  }

  let readouts
  if (step === 0) {
    readouts = (
      <>
        <Readout tex="\Pr(H) = \tfrac{4}{9}" color={C.violet} />
        <Readout tex="\Pr(U\cap H) = \tfrac{3}{9} = \tfrac13" color={C.f} />
      </>
    )
  } else if (step === 1) {
    readouts = <Readout tex="\text{heads left: } 3 + 1 = 4" color={C.violet} />
  } else if (!showWrong) {
    readouts = <Readout tex="\Pr(U\mid H) = \tfrac{3}{4} = \dfrac{3/9}{4/9}" color={C.good} />
  } else {
    readouts = <Readout tex="\tfrac{3}{9} = \tfrac13 = \Pr(U\cap H) \ne \Pr(U\mid H)" color={C.bad} />
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg
          viewBox={`0 0 ${X0 + 5 * GAP + R + 90} 172`}
          className="w-full max-w-[420px] mx-auto block"
          role="img"
          aria-label="Nine imagined goes: six with a fair coin (three heads, three tails) and three with the biased coin (one head, two tails)"
        >
          <text x={X0 - R} y={ROW_FAIR - R - 10} fontSize={13} fontWeight={700} fill={C.f}>
            Fair coin: 6 of the 9 goes
          </text>
          {FAIR.map((f, i) => coin(f, i, X0 + i * GAP, ROW_FAIR, C.f))}
          {rowCount(3, 6, ROW_FAIR, C.f)}
          <text x={X0 - R} y={ROW_BIAS - R - 10} fontSize={13} fontWeight={700} fill={C.g}>
            Biased coin: 3 of the 9 goes
          </text>
          {BIASED.map((f, i) => coin(f, i, X0 + i * GAP, ROW_BIAS, C.g))}
          {rowCount(1, 3, ROW_BIAS, C.g)}
        </svg>
      </div>
      <Controls>
        <Readouts>{readouts}</Readouts>
        <div className="flex flex-wrap items-center gap-2">
          <StepNav step={step} count={STEPS} onBack={back} onNext={next} />
          {last && <Toggle label="Wrong idea: out of all 9 goes" checked={wrong} onChange={setWrong} />}
        </div>
        {notice}
      </Controls>
    </div>
  )
}
