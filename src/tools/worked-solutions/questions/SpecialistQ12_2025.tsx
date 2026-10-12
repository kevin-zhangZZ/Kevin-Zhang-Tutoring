// 2025 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 33% correct — the
// hardest question on the paper, with option A drawing exactly as many students as the
// correct D. This year's paper used four options (A–D) rather than five. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 33, B: 13, C: 20, D: 33 },
  answer: 'D',
  comment: (
    <>
      Use the constant acceleration formulas to find the velocity at the midpoint.
      <br />
      <em>u = intial velocity, v = final velocity at B, s = distance between points A and B.</em>
      <br />
      <Katex tex="v_m" /> <em>= velocity at midpoint between A and B</em>
      <br />
      <Katex tex="v^2=u^2+2as\ \Rightarrow 2as=v^2-u^2" />
      <br />
      <Katex tex="{v_m}^2=u^2+2a\dfrac{s}{2}" />
      <br />
      <Katex tex="{v_m}^2=u^2+\dfrac{v^2-u^2}{2}" />
      <br />
      <Katex tex="{v_m}^2=\dfrac{u^2+v^2}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v^2 = u^2+2as" />,
    reason: <>No time is given or asked for, so use the constant-acceleration formula without <Katex tex="t" />. Here <Katex tex="s" /> is the length of <Katex tex="AB" /> and <Katex tex="a" /> the acceleration.</>,
    more: <>Neither <Katex tex="a" /> nor <Katex tex="s" /> is given, and the answer options contain only <Katex tex="u" /> and <Katex tex="v" />, so the plan is to write everything in terms of <Katex tex="u" /> and <Katex tex="v" /> and let the unknowns cancel.</>,
  },
  {
    working: <Katex display tex="as = \frac{v^2-u^2}{2}" />,
    reason: <>Rearranged. We can't find <Katex tex="a" /> or <Katex tex="s" /> separately, but the product <Katex tex="as" /> is all the next step needs.</>,
  },
  {
    working: <Katex display tex="v_m^2 = u^2+2a\left(\frac{s}{2}\right) = u^2+as" />,
    reason: <>The same formula from <Katex tex="A" /> to the midpoint: same start velocity <Katex tex="u" />, same (constant) <Katex tex="a" />, but distance <Katex tex="\tfrac{s}{2}" />.</>,
  },
  {
    working: <Katex display tex="v_m^2 = u^2+\frac{v^2-u^2}{2} = \frac{u^2+v^2}{2}" />,
    reason: <>Substitute <Katex tex="as" /> from the second line. The unknown acceleration and distance both disappear.</>,
  },
  {
    working: <Katex display tex="\boxed{v_m = \sqrt{\frac{u^2+v^2}{2}}}" />,
    reason: <>Matches option <b>D</b>: the positive root, taking the direction of travel from <Katex tex="A" /> to <Katex tex="B" /> as positive.</>,
    more: (
      <>
        Quick check: if <Katex tex="a=0" /> then <Katex tex="u=v" /> and the formula gives{' '}
        <Katex tex="v_m=u" />, as it should.
        <br />
        <b>A</b> (chosen by as many students as D), <Katex tex="\tfrac{u+v}{2}" />, is the velocity
        halfway through the <em>time</em>: <Katex tex="u+a\cdot\tfrac{T}{2}=\tfrac{u+v}{2}" /> where{' '}
        <Katex tex="T" /> is the time from <Katex tex="A" /> to <Katex tex="B" /> (since{' '}
        <Katex tex="v=u+aT" />, <Katex tex="aT=v-u" />). The question asks for
        halfway along the <em>distance</em>, and these are different points. The particle
        spends more time on the slower half of <Katex tex="AB" />, so at half-time it has not yet
        reached the midpoint if speeding up (or is already past it if slowing down). Either way it is
        moving faster at the midpoint than at half-time.{' '}
        For example, <Katex tex="u=0,\ v=2" /> gives <Katex tex="v_m=\sqrt2\approx1.41" />, not{' '}
        <Katex tex="1" />.
        <br />
        <b>B</b>, <Katex tex="u+\tfrac{u+v}{2}" />, fails the check above: with <Katex tex="u=v" /> it
        gives <Katex tex="\tfrac{3u}{2}" />, not <Katex tex="u" />.
        <br />
        <b>C</b> is <Katex tex="v_m^2" />, not <Katex tex="v_m" /> — the square root was forgotten (its
        units would be m<Katex tex="^2" /> s<Katex tex="^{-2}" />, not a velocity).
      </>
    ),
  },
]

export default function SpecialistQ12_2025() {
  return (
    <MCQShell
      question={
        <p>
          A particle moves along a straight line with constant acceleration. It passes through a
          point <Katex tex="A" /> with velocity <Katex tex="u" /> m s<Katex tex="^{-1}" /> and then
          through a point <Katex tex="B" /> with velocity <Katex tex="v" /> m s<Katex tex="^{-1}" />.
          <br />
          The velocity of the particle at the midpoint of the line segment <Katex tex="AB" /> is
          given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{u+v}{2}" /> },
        { letter: 'B', content: <Katex tex="u+\dfrac{u+v}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{u^2+v^2}{2}" /> },
        { letter: 'D', content: <Katex tex="\sqrt{\dfrac{u^2+v^2}{2}}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
