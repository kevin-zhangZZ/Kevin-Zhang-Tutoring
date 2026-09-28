// 2017 Methods Exam 1 Q5c — "on the second or third attempt" counted out of all 125 Jacs. Same
// 125-dot picture as the part a. widget (block = 1st attempt, row = 2nd, column = 3rd): the event
// is the 30 who got in on the 2nd go plus the 18 on the 3rd, 48/125, which is also part (b)'s
// 98 minus the 50 who got in first go (the report's shortcut). Two wrong ideas the report names:
// "given the first attempt failed" (conditional probability) throws the 50 out of the
// denominator, giving 48/75 = 16/25; "every route has three attempts" (the binomial habit, not
// realising Jac stops) splits the 30 into 18 F S F + 12 F S S and keeps only F S F, giving 36/125.

import { useState } from 'react'
import { C, M, Notice, Readout, Readouts, Toggle } from './kit'
import { BLOCK_W, Caption, GRID_H, GRID_TOP, IN_COLOUR, JacGrid, attemptIn, blockX, type DotLook } from './meth-2017e1-q5a-attempts'

type Mode = 'b' | 'c' | 'cond' | 'fsf'

export default function Count() {
  const [mode, setMode] = useState<Mode>('c')

  const look = (b: number, r: number, c: number): DotLook => {
    const o = attemptIn(b, r, c)
    const colour = IN_COLOUR[o]
    if (mode === 'b') return o === 0 ? { fill: colour, opacity: 0.22 } : { fill: colour }
    if (mode === 'c') return o === 2 || o === 3 ? { fill: colour } : { fill: colour, opacity: 0.22 }
    if (mode === 'cond') {
      if (o === 1) return { stroke: C.guide, opacity: 0.35 }
      return o === 0 ? { fill: colour, opacity: 0.2 } : { fill: colour }
    }
    // 'fsf': F S F counted (2nd-go Jacs in columns 2–4), F S S dropped (columns 0–1), F F S counted.
    if (o === 2 && c < 2) return { stroke: C.bad, dashed: true }
    return o === 2 || o === 3 ? { fill: colour } : { fill: colour, opacity: 0.22 }
  }

  const overlay =
    mode === 'b' ? (
      <>
        <Caption from={0} to={1} color={C.good}>50 in on 1st go</Caption>
        <Caption from={2} to={4}>30 on 2nd + 18 on 3rd (27 never)</Caption>
      </>
    ) : mode === 'c' ? (
      <>
        <Caption from={0} to={1}>not in the event</Caption>
        <Caption from={2} to={4} color={C.f}>30 + 18 = 48 of all 125</Caption>
      </>
    ) : mode === 'cond' ? (
      <>
        <Caption from={0} to={1} color={C.bad}>thrown away</Caption>
        <Caption from={2} to={4} color={C.g}>48 of only these 75</Caption>
        <rect
          x={blockX(2) - 3}
          y={GRID_TOP - 1.5}
          width={blockX(4) + BLOCK_W - blockX(2) + 6}
          height={GRID_H + 3}
          rx={3}
          fill="none"
          stroke={C.g}
          strokeWidth={1.3}
          strokeDasharray="4 3"
        />
      </>
    ) : (
      <Caption from={2} to={4} color={C.bad}>18 FSF + 18 FFS, 12 FSS dropped</Caption>
    )

  const readouts = {
    b: [
      <Readout key="1" tex="\Pr(\text{logs on}) = \frac{50+30+18}{125} = \frac{98}{125}" color={C.good} />,
      <Readout key="2" tex="= 1-\frac{27}{125}" color={C.bad} />,
    ],
    c: [
      <Readout key="1" tex="\Pr(\text{2nd or 3rd}) = \frac{30+18}{125} = \frac{48}{125}" color={C.f} />,
      <Readout key="2" tex="= \frac{98-50}{125}" color={C.good} />,
    ],
    cond: [
      <Readout key="1" tex="\frac{30+18}{75} = \frac{16}{25}" color={C.g} />,
      <Readout key="2" tex="\ne \frac{48}{125}" color={C.bad} />,
    ],
    fsf: [
      <Readout key="1" tex="\frac{18+18}{125} = \frac{36}{125}" color={C.violet} />,
      <Readout key="2" tex="\text{missing } FSS: \tfrac{12}{125}" color={C.bad} />,
    ],
  }[mode]

  const notice = {
    c: (
      <Notice tone="good">
        &ldquo;Logs on at the 2nd or 3rd attempt&rdquo; is the <b>blue</b> dots (30 got in on the 2nd go) plus the{' '}
        <b>violet</b> dots (18 on the 3rd): <M>{'\\tfrac{48}{125}'}</M>. The green 50 who got in first go are not in
        the event, but they still count in the 125 — they are one of the ways things could have gone. Try the two
        wrong ideas to see what each one changes.
      </Notice>
    ),
    b: (
      <Notice>
        Logging on at all is every dot except the red ones: <M>50+30+18=98</M>. Quicker: count the one red group,
        27, and take it from 125 — that&apos;s the complement in part (b). Part (c) is this picture without the
        green 50, so <M>98-50=48</M>, the report&apos;s shortcut.
      </Notice>
    ),
    cond: (
      <Notice tone="warn">
        &ldquo;Given the first attempt failed&rdquo; throws the 50 green Jacs out of the count, so the denominator
        shrinks to 75: <M>{'\\tfrac{48}{75}=\\tfrac{16}{25}'}</M>. That answers a different question — of the Jacs
        who got the first attempt wrong, what fraction got in later? Part (c) has no &ldquo;given&rdquo;: it is asked
        before Jac types anything, so the denominator stays 125.
      </Notice>
    ),
    fsf: (
      <Notice tone="warn">
        Writing every route with three attempts makes the 30 who got in on the 2nd go type a third, pointless time:
        2 in 5 of them (12, dashed) would get it right again{' '}
        <span className="whitespace-nowrap">(<M>FSS</M>)</span> and 18 wrong{' '}
        <span className="whitespace-nowrap">(<M>FSF</M>)</span>. Counting only{' '}
        <M>FSF</M> drops those 12 Jacs, who really did log on at attempt 2, so <M>{'\\tfrac{36}{125}'}</M> is{' '}
        <M>{'\\tfrac{12}{125}'}</M> short. Once Jac is in, the branch stops: <M>FS</M> is the whole route.
      </Notice>
    ),
  }[mode]

  const pick = (m: Mode, label: string) => <Toggle label={label} checked={mode === m} onChange={() => setMode(m)} />

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {pick('c', '2nd or 3rd (c)')}
        {pick('b', 'Logs on at all (b)')}
        {pick('cond', 'Wrong: given 1st failed')}
        {pick('fsf', 'Wrong: FSF + FFS')}
      </div>
      <JacGrid look={look} overlay={overlay} label="125 dots in five blocks of 25; the highlighted dots are the Jacs in the chosen event" />
      <Readouts>{readouts}</Readouts>
      {notice}
    </div>
  )
}
