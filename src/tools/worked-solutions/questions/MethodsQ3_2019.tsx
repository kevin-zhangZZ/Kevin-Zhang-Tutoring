// 2019 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 80% correct. The
// average rate of change of a hyperbola-type function over a given interval. Question text
// transcribed from the original paper (no diagram). Solution is original; answer E agrees with
// the VCAA report and itute. The report has no comment on this question. Widget:
// meth-2019-mcq3-chord shows the chord from (6, a/2) to (8, a/4) with its rise/run triangle as a
// varies, and a toggle overlays the area a·log_e(2) (option A) and average value
// (a/2)·log_e(2) (option B) that come from confusing average rate of change with average value.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const ChordWidget = lazyWidget(() => import('../interactives/meth-2019-mcq3-chord'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 2, D: 5, E: 80 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Average rate of change} = \dfrac{f(8)-f(6)}{8-6}" />,
    reason: <>&ldquo;Average rate of change&rdquo; is the gradient of the straight line (the chord) joining the two points on the curve: rise over run. No calculus is needed, because an <em>average</em> rate only ever looks at the two endpoints. Don&apos;t confuse it with average <em>value</em>, which is the one that needs an integral.</>,
  },
  {
    working: <Katex display tex="f(6) = \dfrac{a}{6-4} = \dfrac{a}{2}, \qquad f(8) = \dfrac{a}{8-4} = \dfrac{a}{4}" />,
    reason: <>Evaluate the function at the two endpoints, keeping <Katex tex="a" /> as a letter since the options are in terms of <Katex tex="a" />. On CAS: <Cas fn="define">Define f(x) = a/(x−4)</Cas>, then enter (f(8) − f(6))/(8 − 6).</>,
  },
  {
    working: <Katex display tex="= \dfrac{\tfrac{a}{4}-\tfrac{a}{2}}{2} = \dfrac{-\tfrac{a}{4}}{2}" />,
    reason: <>Common denominator for the rise: <Katex tex="\tfrac{a}{4}-\tfrac{a}{2}=\tfrac{a}{4}-\tfrac{2a}{4}=-\tfrac{a}{4}" />. Then divide by the run, <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\dfrac{a}{8}}" />,
    reason: <>Matches option <b>E</b>. The negative sign is worth a sanity check: <Katex tex="a>0" /> and the denominator <Katex tex="x-4" /> is growing, so <Katex tex="f" /> is shrinking across <Katex tex="[6,8]" />, and a falling graph must have a negative average rate of change. Option <b>D</b>, <Katex tex="-\tfrac{a}{4}" />, is the rise without dividing by the run <Katex tex="2" />. Option <b>A</b>, <Katex tex="a\log_e(2)" />, is the area <Katex tex="\int_6^8 f(x)\,dx" />, and option <b>B</b> is that area divided by <Katex tex="2" />, the average value.</>,
  },
]

export default function MethodsQ3_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\setminus\{4\}\to R,\ f(x)=\dfrac{a}{x-4}" />, where{' '}
          <Katex tex="a>0" />. The average rate of change of <Katex tex="f" /> from{' '}
          <Katex tex="x=6" /> to <Katex tex="x=8" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a\log_e(2)" /> },
        { letter: 'B', content: <Katex tex="\dfrac{a}{2}\log_e(2)" /> },
        { letter: 'C', content: <Katex tex="2a" /> },
        { letter: 'D', content: <Katex tex="-\dfrac{a}{4}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{a}{8}" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="An average rate of change is the slope of the chord, not an average height">
            <ChordWidget />
          </Explore>
          <WrongMethod
            title="Average rate of change is an average, so integrate and divide by the width"
            source="9% chose B"
            working={
              <>
                <Katex display tex="\dfrac{1}{8-6}\int_6^8 \dfrac{a}{x-4}\,dx = \dfrac{a}{2}\Big[\log_e(x-4)\Big]_6^8" />
                <Katex display tex="= \dfrac{a}{2}\log_e(2) \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              That formula is the average <em>value</em> of <Katex tex="f" />: the curve&apos;s average height over{' '}
              <Katex tex="[6,8]" />. The average <em>rate of change</em> is how fast <Katex tex="f" /> changes on average:
              change in <Katex tex="f" /> over change in <Katex tex="x" />, the chord&apos;s gradient. The sign catches the
              mix-up: <Katex tex="f" /> is positive on <Katex tex="[6,8]" />, so its average value is positive, but it is
              falling, so its rate of change must be negative. Leaving off the <Katex tex="\tfrac12" /> gives the plain
              area, option A.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
