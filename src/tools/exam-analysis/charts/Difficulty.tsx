// "What students find hard": one ridge per topic (or subtopic) — lieflat's Ridgeline. Each
// crest is how that topic's MCQs and short-answer parts spread from 0% to 100% of their marks
// (a smoothed count of VCAA averages), filled with hairlines, with a dot at the topic's
// average. Hardest first; the hardest crest is amber. A dashed line marks the 40% "hard" cut.

import { useMemo, type CSSProperties } from 'react'
import { HARD_BELOW } from '../../worked-solutions/sidebarModel'
import { itemScore, pct, statOf, type Group } from '../model'
import { isPicked, type ChartCtx } from '../view'
import { TipBody, hash01, useTip, useWidth } from './common'

/** The section's headline: the hardest topic with enough marks to count, and how much of it is hard. */
export function difficultyHeadline(ctx: ChartCtx): string {
  const total = ctx.groups.reduce((s, g) => s + g.marks, 0)
  const minMarks = Math.max(3, total * 0.02)
  const rows = ctx.groups.filter(g => g.score !== null && g.marks >= minMarks).sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
  if (!rows.length) return 'Nothing scored in these filters'
  const g = rows[0]
  const share = hardShare(g)
  const lead = rows.length > 1 ? `${g.label} is the hardest, at ${pct(g.score)} on average` : `${g.label} averages ${pct(g.score)}`
  const part = share >= 0.55 ? 'more than half' : share >= 0.45 ? 'about half' : share >= 0.3 ? 'about a third' : share >= 0.22 ? 'about a quarter' : null
  return part ? `${lead}; ${part} of its items average under ${HARD_BELOW}%` : lead
}

function scoresOf(g: Group): number[] {
  return g.itemList.map(itemScore).filter((s): s is number => s !== null)
}

function hardShare(g: Group): number {
  const s = scoresOf(g)
  return s.length ? s.filter(x => x * 100 < HARD_BELOW).length / s.length : 0
}

const NPT = 72
const BW = 0.07

/** A smoothed count of the scores at NPT points from 0 to 1, scaled to peak at 1. */
function density(scores: number[]): number[] {
  const d = Array.from({ length: NPT }, (_, k) => {
    const x = k / (NPT - 1)
    return scores.reduce((a, v) => a + Math.exp(-((x - v) ** 2) / (2 * BW * BW)), 0)
  })
  const max = Math.max(1e-9, ...d)
  return d.map(v => v / max)
}

const TICKS = [0, 0.25, 0.5, 0.75, 1]

export function DotStrip({ ctx }: { ctx: ChartCtx }) {
  const tip = useTip()
  const [ref, width] = useWidth<HTMLDivElement>()
  const rows = useMemo(
    () =>
      ctx.groups
        .filter(g => g.score !== null)
        .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
        .map(g => {
          const s = scoresOf(g)
          return { g, n: s.length, dens: s.length >= 3 ? density(s) : null }
        }),
    [ctx.groups],
  )
  const overall = statOf(ctx.items).score

  const narrow = width < 560
  const labelW = narrow ? 104 : 196
  const X0 = labelW + 8
  const X1 = Math.max(X0 + 120, width - 16)
  const gap = rows.length > 10 ? 30 : narrow ? 36 : 42
  const lift = gap * 1.3
  const top = lift + 26
  const height = top + (rows.length - 1) * gap + 28
  const x = (s: number) => X0 + s * (X1 - X0)

  return (
    <div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2">
        Each crest shows how a topic’s MCQs and short-answer parts spread out, by their VCAA averages; the dot is the topic’s average. Hardest first. Click a
        topic to {ctx.level === 'sub' ? 'list its questions' : 'see its subtopics'}.
      </p>
      <div ref={tip.wrapRef} className="relative">
        <div ref={ref}>
          {width > 0 && (
            <svg width={width} height={height} className="block" role="group" aria-label="Spread of scores in each topic">
              {/* The "hard" cut and the average of everything in view. */}
              <line x1={x(HARD_BELOW / 100)} x2={x(HARD_BELOW / 100)} y1={4} y2={height - 24} stroke="var(--ea-lost)" strokeOpacity={0.55} strokeDasharray="2 4" />
              <text x={x(HARD_BELOW / 100) - 5} y={12} textAnchor="end" fontSize={11} fontWeight={600} className="fill-amber-700 dark:fill-amber-400">
                Hard
              </text>
              {overall !== null && (
                <>
                  <line x1={x(overall)} x2={x(overall)} y1={4} y2={height - 24} stroke="var(--ea-ref)" strokeDasharray="2 3" />
                  <text x={x(overall) + 5} y={12} fontSize={11} fontWeight={600} className="fill-gray-500 dark:fill-gray-400">
                    All {pct(overall)}
                  </text>
                </>
              )}
              {rows.map(({ g, n, dens }, i) => {
                const y0 = top + i * gap
                const hero = i === 0 && rows.length > 1
                const pts = dens?.map((d, k) => [x(k / (NPT - 1)), y0 - d * lift] as const)
                const crest = pts ? 'M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ') : ''
                const avgK = Math.round((g.score ?? 0) * (NPT - 1))
                const ay = pts ? pts[avgK][1] : y0 - 4
                const ax = x(g.score ?? 0)
                const body = (
                  <TipBody
                    value={`${pct(g.score)} average`}
                    label={g.label}
                    lines={[`${n} ${n === 1 ? 'item' : 'items'} · ${pct(hardShare(g))} of them under ${HARD_BELOW}%`, `Click to ${ctx.level === 'sub' ? 'list its questions' : 'see its subtopics'}`]}
                  />
                )
                return (
                  <g
                    key={g.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${g.label}: ${pct(g.score)} average`}
                    className="cursor-pointer outline-none group"
                    onClick={() => ctx.onGroup(g.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), ctx.onGroup(g.id))}
                    onPointerMove={e => tip.show(e, body)}
                    onPointerLeave={tip.hide}
                    onFocus={e => tip.show(e, body)}
                    onBlur={tip.hide}
                  >
                    <rect x={0} y={y0 - gap} width={width} height={gap} fill="transparent" />
                    {pts && (
                      <>
                        {/* A surface-coloured slab so each ridge hides the one behind it. */}
                        <path d={`${crest} L${X1} ${y0} L${X0} ${y0} Z`} fill="var(--ea-surface)" fillOpacity={0.96} />
                        {pts.map(([px, py], k) =>
                          k % 2 ? null : (
                            <line
                              key={k}
                              className="ea-fade"
                              style={{ '--d': i * 90 + k * 4 } as CSSProperties}
                              x1={px}
                              x2={px}
                              y1={y0}
                              y2={py}
                              stroke={hero ? 'var(--ea-lost)' : 'var(--ea-hair)'}
                              strokeWidth={0.6}
                              opacity={0.35 + hash01(`${g.id}:${k}`) * 0.3}
                            />
                          ),
                        )}
                        <path
                          d={crest}
                          pathLength={1}
                          className={`ea-draw ${hero ? '' : 'stroke-gray-800 dark:stroke-gray-200'}`}
                          style={{ '--d': 100 + i * 90 } as CSSProperties}
                          fill="none"
                          stroke={hero ? 'var(--ea-lost)' : undefined}
                          strokeWidth={hero ? 1.6 : 1.1}
                        />
                      </>
                    )}
                    <line x1={X0} x2={X1} y1={y0} y2={y0} stroke="var(--ea-grid)" />
                    <circle
                      cx={ax}
                      cy={ay}
                      r={3.2}
                      className={`ea-pop ${hero ? '' : 'fill-gray-900 dark:fill-white'}`}
                      style={{ '--d': 500 + i * 90 } as CSSProperties}
                      fill={hero ? 'var(--ea-lost)' : undefined}
                    />
                    <text
                      x={ax + 7}
                      y={ay - 3}
                      fontSize={11.5}
                      fontWeight={800}
                      paintOrder="stroke"
                      stroke="var(--ea-surface)"
                      strokeWidth={3}
                      className={hero ? 'fill-amber-700 dark:fill-amber-400' : 'fill-gray-900 dark:fill-gray-100'}
                    >
                      {pct(g.score)}
                    </text>
                    <text
                      x={labelW}
                      y={y0 - 4}
                      textAnchor="end"
                      fontSize={narrow ? 11.5 : 12.5}
                      fontWeight={isPicked(ctx, g.id) ? 700 : 500}
                      className={`${isPicked(ctx, g.id) ? 'fill-gray-900 dark:fill-white' : 'fill-gray-700 dark:fill-gray-300'} group-hover:underline group-focus-visible:underline`}
                    >
                      {g.label.length * (narrow ? 6.2 : 6.8) > labelW ? `${g.label.slice(0, Math.floor(labelW / (narrow ? 6.2 : 6.8)) - 1)}…` : g.label}
                    </text>
                  </g>
                )
              })}
              {TICKS.map(t => (
                <text
                  key={t}
                  x={x(t)}
                  y={height - 6}
                  textAnchor={t === 0 ? 'start' : t === 1 ? 'end' : 'middle'}
                  fontSize={11}
                  className="fill-gray-500 dark:fill-gray-400"
                >
                  {t * 100}%
                </text>
              ))}
            </svg>
          )}
        </div>
        {tip.node}
      </div>
    </div>
  )
}
