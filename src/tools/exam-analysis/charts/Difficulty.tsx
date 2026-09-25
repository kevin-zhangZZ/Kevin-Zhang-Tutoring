// "What students find hard": one 0–100% strip per topic (or subtopic), with every MCQ and
// short-answer part as a dot at its VCAA average and a line at the topic's average. Hardest
// topic first; a dot opens its worked solution.

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questionPath } from '../../worked-solutions/routes'
import { fmt, itemLabel, itemScore, pct, type Group, type Item } from '../model'
import { isPicked, yearCount, type ChartCtx } from '../view'
import { BAND_FILL, BandKey, TipBody, bandOf, useTip, useWidth } from './common'

function itemTip(i: Item) {
  const s = itemScore(i)
  return (
    <TipBody
      value={s === null ? 'No VCAA average' : `${pct(s)} average`}
      label={`${itemLabel(i)} · ${i.marks} ${i.marks === 1 ? 'mark' : 'marks'}`}
      lines={[i.question.topic.split('—')[1]?.trim() ?? i.question.topic, 'Click to open the worked solution']}
    />
  )
}

function groupScoreTip(ctx: ChartCtx, g: Group) {
  return (
    <TipBody
      value={`${pct(g.score)} average`}
      label={g.label}
      lines={[`${g.marks} marks over ${g.items} ${g.items === 1 ? 'item' : 'items'} · ${fmt(g.marks / yearCount(ctx))} a year`]}
    />
  )
}

/** A stable pseudo-random 0–1 from a string, so dots keep their jitter between renders. */
function jitter(key: string): number {
  let h = 2166136261
  for (let k = 0; k < key.length; k++) h = Math.imul(h ^ key.charCodeAt(k), 16777619)
  return ((h >>> 0) % 1000) / 1000
}

const TICKS = [0, 0.25, 0.5, 0.75, 1]

function StripRow({ ctx, g, width, onItem }: { ctx: ChartCtx; g: Group; width: number; onItem: (i: Item) => void }) {
  const tip = useTip()
  const h = 30
  const pad = 6
  const x = (s: number) => pad + s * (width - 2 * pad)
  const dots = useMemo(
    () =>
      g.itemList
        .map(i => ({ i, s: itemScore(i) }))
        .filter((d): d is { i: Item; s: number } => d.s !== null)
        .map(d => ({ ...d, cx: x(d.s), cy: 6 + jitter(d.i.key) * (h - 12) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g.itemList, width],
  )
  const [hover, setHover] = useState<string | null>(null)

  // The pointer only has to be near a dot, not on it.
  const nearest = (px: number, py: number) => {
    let best: (typeof dots)[number] | null = null
    let bd = 14 * 14
    for (const d of dots) {
      const dd = (d.cx - px) ** 2 + (d.cy - py) ** 2
      if (dd < bd) {
        bd = dd
        best = d
      }
    }
    return best
  }

  return (
    <div ref={tip.wrapRef} className="relative">
      <svg
        width={width}
        height={h}
        className="block cursor-pointer"
        role="img"
        aria-label={`${g.label}: ${dots.length} items, average ${pct(g.score)}`}
        onPointerMove={e => {
          const box = e.currentTarget.getBoundingClientRect()
          const d = nearest(e.clientX - box.left, e.clientY - box.top)
          setHover(d?.i.key ?? null)
          tip.show(e, d ? itemTip(d.i) : groupScoreTip(ctx, g))
        }}
        onPointerLeave={() => {
          setHover(null)
          tip.hide()
        }}
        onClick={e => {
          const box = e.currentTarget.getBoundingClientRect()
          const d = nearest(e.clientX - box.left, e.clientY - box.top)
          if (d) onItem(d.i)
          else ctx.onGroup(g.id)
        }}
      >
        {TICKS.map(t => (
          <line key={t} x1={x(t)} x2={x(t)} y1={0} y2={h} stroke="var(--ea-grid)" />
        ))}
        {dots.map(d => (
          <circle
            key={d.i.key}
            cx={d.cx}
            cy={d.cy}
            r={hover === d.i.key ? 5.5 : 4}
            fill={BAND_FILL[bandOf(d.s)]}
            stroke="var(--ea-surface)"
            strokeWidth={1.5}
          />
        ))}
        {g.score !== null && (
          <line x1={x(g.score)} x2={x(g.score)} y1={3} y2={h - 3} strokeWidth={2.5} strokeLinecap="round" className="stroke-gray-900 dark:stroke-white" />
        )}
      </svg>
      {tip.node}
    </div>
  )
}

export function DotStrip({ ctx }: { ctx: ChartCtx }) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const navigate = useNavigate()
  const rows = ctx.groups.filter(g => g.score !== null).sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
  const labelW = width < 560 ? 104 : 200
  const valueW = 44
  const stripW = Math.max(120, width - labelW - valueW - 16)
  const pad = 6
  return (
    <div ref={ref}>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mb-2 flex flex-wrap gap-x-4 gap-y-1">
        <span>
          Each dot is one MCQ or short-answer part, placed at its VCAA average; the dark line is the topic’s average. Hardest first. Click a dot to open
          its solution.
        </span>
        <BandKey />
      </p>
      {width > 0 && (
        <div className="flex flex-col">
          {rows.map(g => (
            <div key={g.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => ctx.onGroup(g.id)}
                style={{ width: labelW }}
                className={`flex-none text-left text-[13px] leading-tight truncate hover:underline underline-offset-2 ${isPicked(ctx, g.id) ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                title={g.label}
              >
                {g.label}
              </button>
              <StripRow ctx={ctx} g={g} width={stripW} onItem={i => navigate(questionPath(i.question))} />
              <span style={{ width: valueW }} className="flex-none text-right text-[12.5px] font-semibold tabular-nums text-gray-800 dark:text-gray-200">
                {pct(g.score)}
              </span>
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            <span style={{ width: labelW }} className="flex-none" />
            <svg width={stripW} height={16} className="block" aria-hidden>
              {TICKS.map(t => (
                <text key={t} x={pad + t * (stripW - 2 * pad)} y={12} textAnchor={t === 0 ? 'start' : t === 1 ? 'end' : 'middle'} fontSize={11} className="fill-gray-400 dark:fill-gray-500">
                  {t * 100}%
                </text>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
