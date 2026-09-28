// 2020 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 60% correct.
// Recovering a standard deviation from a standardised probability. Question text transcribed from the original paper; solution is original.
// Answer C checked with sympy (9/σ = 3/2 ⟹ σ = 6) and scipy (Pr(X < 259) with σ = 6 equals
// Φ(1.5) = 0.93319). The VCAA report prints no comment for this question; itute agrees (C).
// Distractors: A (1.5) is the z-value itself; D (9, the most-chosen wrong answer at 15%) is the
// gap 259 − 250, which would put 259 one standard deviation above the mean (Pr = Φ(1) = 0.841).
// No clean slip was found for B (3) or E (12), so they are not named.
// Interactive diagram (§15): interactives/meth-2020e2-mcq11-twin-scales.tsx draws one bell curve
// over two aligned number lines, Z and X (in mm, z = k at 250 + kσ); a σ slider and one button per
// option move the X labels until 259 lines up with z = 1.5. This site's own explanatory figure;
// VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwinScalesWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq11-twin-scales'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 60, D: 15, E: 4 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="1-\Pr(Z>1.5) = \Pr(Z<1.5)" />,
    reason: <>The total area under the curve is 1, so one minus the tail to the right of 1.5 is everything to its left. Rewriting the right-hand side as a &ldquo;less than&rdquo; makes it the same shape as <Katex tex="\Pr(X<259)" />, so the two can be compared directly.</>,
  },
  {
    working: <Katex display tex="\Pr(X<259) = \Pr(Z<1.5)" />,
    reason: <>Two &ldquo;less than&rdquo; areas that are equal must be cut off at the same place on the curve. So 259 on the <Katex tex="X" /> scale is the same point as 1.5 on the <Katex tex="Z" /> scale: 259 is 1.5 standard deviations above the mean.</>,
  },
  {
    working: <Katex display tex="\frac{259-250}{\sigma} = 1.5" />,
    reason: <>Standardise with <Katex tex="z=\tfrac{x-\mu}{\sigma}" /> and <Katex tex="\mu=250" />: the <Katex tex="z" />-value of 259 must be 1.5.</>,
  },
  {
    working: <Katex display tex="\frac{9}{\sigma} = 1.5" />,
    reason: <>259 is 9 mm above the mean, and that 9 mm is 1.5 standard deviations.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma = \frac{9}{1.5} = 6\ \text{mm}}" />,
    reason: <>If 1.5 standard deviations are 9 mm, one is <Katex tex="9\div1.5=6" /> mm. Check: <Katex tex="250+1.5\times6=259" /> ✓. Matches option <b>C</b>. Option <b>A</b> is the <Katex tex="z" />-value itself, and option <b>D</b> is the 9 mm gap, which would put 259 only <em>one</em> standard deviation above the mean (see below). Both stop a step short.</>,
  },
]

export default function MethodsQ11_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The lengths of plastic pipes that are cut by a particular machine are a normally
            distributed random variable, <Katex tex="X" />, with a mean of 250 mm.
          </p>
          <p className="mb-2"><Katex tex="Z" /> is the standard normal random variable.</p>
          <p>
            If <Katex tex="\Pr(X<259)=1-\Pr(Z>1.5)" />, then the standard deviation of the
            lengths of plastic pipes, in millimetres, is
          </p>
        </>
      }
      background={
        <Background title="What Z measures">
          <p>
            The standard normal variable <Katex tex="Z" /> counts <em>standard deviations from the mean</em>. Standardising,{' '}
            <Katex tex="z=\tfrac{x-\mu}{\sigma}" />, turns &ldquo;how many millimetres above the mean&rdquo; into &ldquo;how
            many standard deviations above the mean&rdquo;. The bell curve is the same shape either way; only the labels on the
            axis change. So <Katex tex="\Pr(X<259)=\Pr(Z<1.5)" /> says that 259 mm and <Katex tex="z=1.5" /> are the same
            point on the curve, labelled two ways.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.5" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="9" /> },
        { letter: 'E', content: <Katex tex="12" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Standardising only relabels the axis: 259 mm must sit exactly under z = 1.5">
            <TwinScalesWidget />
          </Explore>
          <WrongMethod
            title="259 is 9 mm above the mean, so the standard deviation is 9"
            source="15% chose D"
            working={<Katex display tex="\sigma = 259-250 = 9 \quad \text{(option D)}" />}
          >
            <p>
              That makes 259 exactly <em>one</em> standard deviation above the mean, so it would give{' '}
              <Katex tex="\Pr(X<259)=\Pr(Z<1)\approx0.841" />. The question says <Katex tex="\Pr(Z<1.5)\approx0.933" />: the 9 mm
              is one and a half standard deviations, so divide it by 1.5. The <Katex tex="z" />-value tells you how many
              standard deviations a gap is worth. Press &ldquo;D: σ = 9&rdquo; in the diagram above to see 259 land under{' '}
              <Katex tex="z=1" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
