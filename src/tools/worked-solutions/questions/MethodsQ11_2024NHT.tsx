// 2024 Mathematical Methods NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment and a graph for this question (graph taken from the
// report's own file, meth-2024nht-mcq11-report-graph.png). Trig modelling: counting whole days on
// which h(t) ≥ 11. Question text transcribed from the original paper. Solution is original; the
// answer E (222) agrees with the report's key, and a direct count over t = 1, …, 365 confirms it.
// Report slip kept verbatim: its graph labels the curve with 2π/360 where the rule has 2π/365; the
// crossing points it marks (103.492 and 246.508) are those of the correct rule.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2024nht-mcq11-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'E',
  comment: (
    <>
      <Katex tex="h(t)=12-3\cos\left(\dfrac{2\pi}{365}(t-175)\right)" /> where <Katex tex="t\in Z^+" />.
      <br />
      The number of days with at least 11 hours of daylight during one year, 365 days, is{' '}
      <Katex tex="103+(365-246)=222" /> days.
      <br />
      The graphs of <Katex tex="y=h(t)=12-3\cos\left(\dfrac{2\pi}{365}(t-175)\right)" /> where{' '}
      <Katex tex="t\in R" /> and <Katex tex="y=11" /> are shown below.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = h(t) for t from 0 to 365, a cosine curve starting near 15, dipping to 9 near t = 175 and rising back to 15, with the line y = 11 crossing it at (103.492, 11) and (246.508, 11)" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="12-3\cos\left(\tfrac{2\pi}{365}(t-175)\right)\ge 11" />,
    reason: <>&ldquo;At least 11 hours&rdquo; means <Katex tex="h(t)\ge 11" />. Find where the curve crosses <Katex tex="y=11" />, then count the whole days on the right side of each crossing.</>,
    more: <>The model has a minimum of <Katex tex="12-3=9" /> hours at <Katex tex="t=175" /> (mid-winter in this southern-hemisphere model) and a maximum of 15 hours at the ends of the year. So daylight drops below 11 hours only in a block of days around <Katex tex="t=175" />.</>,
  },
  {
    working: <Katex display tex="\cos\left(\tfrac{2\pi}{365}(t-175)\right)=\tfrac13" />,
    reason: <>Set <Katex tex="h(t)=11" /> to find the boundary days: <Katex tex="3\cos(\ldots)=1" />.</>,
  },
  {
    working: <Katex display tex="t\approx 103.49\quad\text{or}\quad t\approx 246.51" />,
    reason: <>The two solutions in <Katex tex="0\le t\le 365" />, either side of the minimum at 175 (and symmetric about it: <Katex tex="175\mp 71.508\ldots" />).</>,
    more: <>On CAS: <Cas fn="solve">solve(12−3cos(2π/365·(t−175))=11, t) | 0≤t≤365</Cas>. By hand, <Katex tex="\tfrac{2\pi}{365}(t-175)=\pm\cos^{-1}\!\left(\tfrac13\right)" />, so <Katex tex="t=175\mp\tfrac{365}{2\pi}\cos^{-1}\!\left(\tfrac13\right)=175\mp 71.508\ldots" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&h(t)\ge 11\ \text{for}\\ &t\le 103.49\ldots\ \text{or}\ t\ge 246.51\ldots\end{aligned}" />,
    reason: <>The curve is above 11 outside the two crossings and below it between them (the dip around <Katex tex="t=175" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&t=1,\dots,103:\ 103\text{ days}\\ &t=247,\dots,365:\ 119\text{ days}\end{aligned}" />,
    reason: <><Katex tex="t" /> is a whole number of days (<Katex tex="t\in Z^+" />), so round <b>inwards</b> into the region where <Katex tex="h\ge 11" />: day 103 qualifies but day 104 doesn&apos;t; day 247 qualifies but day 246 doesn&apos;t.</>,
    more: <>Check the boundary days directly: <Katex tex="h(103)\approx 11.02" /> and <Katex tex="h(104)\approx 10.98" />; by symmetry about <Katex tex="t=175" />, <Katex tex="h(246)\approx 10.98" /> and <Katex tex="h(247)\approx 11.02" />. The count from 247 to 365 inclusive is <Katex tex="365-247+1=119" />, which is the report&apos;s <Katex tex="365-246" />.</>,
  },
  {
    working: <Katex display tex="\boxed{103+119=222\ \text{days}}" />,
    reason: <>Matches option <b>E</b>. Sanity check: about 61% of the year, which fits a curve that spends only its dip below 11.</>,
    more: <>Option <b>B</b> (143) counts the days with <b>less</b> than 11 hours, days 104 to 246, the complement of the answer: <Katex tex="365-222=143" />. Option <b>D</b> (221) is <Katex tex="365-144" />, which comes from counting one extra day in the gap (103 to 246 inclusive is 144 days). The report&apos;s graph labels the rule with <Katex tex="\tfrac{2\pi}{360}" />; that is a slip for <Katex tex="\tfrac{2\pi}{365}" />, and the crossings it marks are those of the correct rule.</>,
  },
]

export default function MethodsQ11_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>In a certain location, the number of hours, <Katex tex="h" />, of daylight per day is modelled by</p>
          <p className="text-center"><Katex tex="h(t)=12-3\cos\left(\dfrac{2\pi}{365}(t-175)\right)" />, where <Katex tex="t\in Z^+" /></p>
          <p>
            where <Katex tex="t" /> represents the day of the year. Note that <Katex tex="t=1" /> represents 1 January.
          </p>
          <p>
            According to this model, during one year of 365 days, the number of days for which there are at least
            11 hours of daylight is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="142" /> },
        { letter: 'B', content: <Katex tex="143" /> },
        { letter: 'C', content: <Katex tex="144" /> },
        { letter: 'D', content: <Katex tex="221" /> },
        { letter: 'E', content: <Katex tex="222" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
