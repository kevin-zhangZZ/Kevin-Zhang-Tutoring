// 2019 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 86% correct. The
// asymptotes of a rational function whose numerator has higher degree than its denominator.
// Question text transcribed from the original paper (no diagram). Solution is original.
//
// Interactive (extras): interactives/spec-2019-mcq2-oblique — slide a probe along the curve and
// compare the gap to y = x/2 + 2 (the remainder 17/(2x − 8), shrinking to 0) with the gap to
// option B's y = x/2 (shrinking only to 2). The wrong-method box shows option B (9%) coming from
// dividing the leading terms only. Answer C confirmed with sympy (apart gives
// x/2 + 2 + 17/(2(x − 4))) and agrees with itute.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ObliqueWidget = lazyWidget(() => import('../interactives/spec-2019-mcq2-oblique'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 86, D: 1, E: 0 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x-8=0 \implies x=4" />,
    reason: <>Vertical asymptotes come from the denominator being zero. Check the numerator there too: <Katex tex="4^2+1=17\ne0" />, so the function really blows up at <Katex tex="x=4" /> (if the numerator were also zero, it could be a hole instead).</>,
  },
  {
    working: <Katex display tex="\deg(\text{numerator}) = 2 > 1 = \deg(\text{denominator})" />,
    reason: <>For large <Katex tex="x" /> the top grows like <Katex tex="x^2" /> and the bottom only like <Katex tex="x" />, so <Katex tex="f(x)" /> grows roughly like a multiple of <Katex tex="x" />: no horizontal asymptote, but a slanted (oblique) one. To find its exact equation, divide.</>,
  },
  {
    working: <Katex display tex="x^2+1 = (2x-8)\left(\dfrac{x}{2}+2\right)+17" />,
    reason: <>Polynomial division, one term at a time. <Katex tex="\tfrac{x}{2}" /> times <Katex tex="2x-8" /> gives <Katex tex="x^2-4x" />, leaving <Katex tex="4x+1" />; then <Katex tex="2" /> times <Katex tex="2x-8" /> gives <Katex tex="4x-8" />, leaving <Katex tex="17" />. Check by expanding: <Katex tex="(2x-8)\left(\tfrac{x}{2}+2\right)+17=x^2-16+17=x^2+1" /> ✓</>,
  },
  {
    working: <Katex display tex="f(x) = \dfrac{x}{2}+2+\dfrac{17}{2x-8}" />,
    reason: <>Dividing the identity above through by <Katex tex="2x-8" />. This form splits <Katex tex="f" /> into a straight line plus a remainder fraction whose top is a constant.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{As } x\to\pm\infty: \ \dfrac{17}{2x-8}\to0" />
        <Katex display tex="\implies f(x)\to\dfrac{x}{2}+2" />
      </>
    ),
    reason: <>A constant over something growing without bound goes to <Katex tex="0" />. So the vertical gap between the curve and the line <Katex tex="y=\tfrac{x}{2}+2" /> shrinks to nothing at both ends: that line is the asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x=4 \ \text{ and } \ y=\dfrac{x}{2}+2}" />,
    reason: <>Matches option <b>C</b>. Option <b>B</b> drops the <Katex tex="+2" />: it is what you get by dividing only the leading terms. <b>A</b> misses the oblique asymptote entirely, and <b>D</b> and <b>E</b> put the vertical asymptote at <Katex tex="x=8" />, where the denominator is <Katex tex="8\ne0" />.</>,
    more: <>See the Common Mistake below for option B.</>,
  },
]

export default function SpecialistQ2_2019() {
  return (
    <MCQShell
      question={<p>The asymptote(s) of the graph of <Katex tex="f(x)=\dfrac{x^2+1}{2x-8}" /> has equation(s)</p>}
      background={
        <Background title="Where an Oblique Asymptote Comes From">
          <p>
            When the numerator&apos;s degree is exactly one more than the denominator&apos;s, division writes the function as
            a straight line plus a remainder: <Katex tex="f(x)=mx+c+\tfrac{r}{\text{denominator}}" />. The remainder fraction
            tends to <Katex tex="0" /> as <Katex tex="x\to\pm\infty" />, so the graph approaches the whole line{' '}
            <Katex tex="y=mx+c" />, constant term included.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=4" /> },
        { letter: 'B', content: <Katex tex="x=4 \text{ and } y=\tfrac{x}{2}" /> },
        { letter: 'C', content: <Katex tex="x=4 \text{ and } y=\tfrac{x}{2}+2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="x=8 \text{ and } y=\tfrac{x}{2}" /> },
        { letter: 'E', content: <Katex tex="x=8 \text{ and } y=2x+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the asymptote is y = x/2 + 2, not y = x/2">
            <ObliqueWidget />
          </Explore>
          <WrongMethod
            title="Divide the leading terms: x² ÷ 2x = x/2, so the oblique asymptote is y = x/2"
            source="9% chose B"
            working={
              <>
                <Katex display tex="\dfrac{x^2}{2x}=\dfrac{x}{2} \implies y=\dfrac{x}{2}" />
                <Katex display tex="\text{with } x=4 \implies \text{option B}" />
              </>
            }
          >
            <p>
              The leading terms give the <em>slope</em> of the asymptote, <Katex tex="\tfrac{1}{2}" />, but not its height.
              The constant comes from the next step of the division, when the <Katex tex="-8" /> in the denominator acts on
              the <Katex tex="\tfrac{x}{2}" />. The line <Katex tex="y=\tfrac{x}{2}" /> is parallel to the true asymptote but
              always about <Katex tex="2" /> units below the curve: <Katex tex="f(x)-\tfrac{x}{2}=2+\tfrac{17}{2x-8}\to2" />, not{' '}
              <Katex tex="0" />.
            </p>
            <p>
              To catch it, test a large <Katex tex="x" />: <Katex tex="f(1000)=\tfrac{1\,000\,001}{1992}\approx502.01" />,
              while <Katex tex="\tfrac{1000}{2}=500" /> is 2 short and <Katex tex="\tfrac{1000}{2}+2=502" /> is spot on.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
