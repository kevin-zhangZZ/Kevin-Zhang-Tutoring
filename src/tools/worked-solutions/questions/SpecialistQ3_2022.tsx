// 2022 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 38% correct.
// Which asymptote behaviour a family of rational functions will ALWAYS have. Question text
// transcribed from the original paper. Solution is original.
// Interactive: spec-2022-mcq3-holes (slide c: at c = 0 or c = -8 one vertical asymptote becomes a
// hole, but y = 1 and at least one vertical asymptote always remain).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const HolesWidget = lazyWidget(() => import('../interactives/spec-2022-mcq3-holes'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 5, C: 8, D: 8, E: 38 },
  answer: 'E',
  comment: (
    <>
      If <Katex tex="c=0,\ y = 1+\dfrac{2x+4}{(x-2)(x+2)} = 1+\dfrac{2}{x-2}" />
      <br />
      so only one vertical asymptote in this instance.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="y = \frac{(x^2-4) + 2x + c + 4}{x^2-4}" />
        <Katex display tex="= 1 + \frac{2x + c + 4}{x^2-4}" />
      </>
    ),
    reason: (
      <>
        The numerator and denominator have the same degree, so divide first to find the horizontal asymptote: write
        the numerator as <Katex tex="(x^2-4)" /> plus whatever is left over.
      </>
    ),
    more: (
      <>
        Adding and subtracting <Katex tex="4" /> turns <Katex tex="x^2+2x+c" /> into <Katex tex="(x^2-4)+(2x+c+4)" />, and the{' '}
        <Katex tex="(x^2-4)" /> part divides exactly to give <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{As } x\to\pm\infty,\ \frac{2x+c+4}{x^2-4}\to 0,\ \text{so } y\to 1" />,
    reason: (
      <>
        The leftover fraction has a lower-degree numerator than denominator, so it shrinks to <Katex tex="0" /> in
        both directions. So there is exactly <b>one</b> horizontal asymptote, <Katex tex="y=1" />, whatever the value
        of <Katex tex="c" />.
      </>
    ),
    more: (
      <>
        Two different horizontal asymptotes need two different limits, one as <Katex tex="x\to\infty" /> and another
        as <Katex tex="x\to-\infty" /> (as with an inverse tangent graph). Here both limits are <Katex tex="1" />, so
        that cannot happen for any value of <Katex tex="c" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2-4=(x-2)(x+2)=0 \iff x=\pm2" />,
    reason: (
      <>
        A zero of the denominator gives a vertical asymptote <b>unless the numerator is also zero there</b>. If it
        is, that factor cancels and the graph has a hole (one missing point) instead. So check the numerator at{' '}
        <Katex tex="x=2" /> and <Katex tex="x=-2" />.
      </>
    ),
    more: (
      <>
        Skipping this check leads to the most popular wrong answer. Solving <Katex tex="x^2-4=0" /> and stopping
        there gives two zeros of the denominator, so two vertical asymptotes: option A (chosen by 41%). That is true
        for most values of <Katex tex="c" />, but the question asks what is <b>always</b> true, so a single value of{' '}
        <Katex tex="c" /> where it fails is enough to rule it out.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x=2:\ \ 4+4+c=0 \iff c=-8" />
        <Katex display tex="c=-8:\ \ y=\frac{(x+4)(x-2)}{(x-2)(x+2)}=\frac{x+4}{x+2},\ x\neq2" />
      </>
    ),
    reason: (
      <>
        Only when <Katex tex="c=-8" /> does <Katex tex="(x-2)" /> cancel. Then <Katex tex="x=2" /> gives a hole, not
        an asymptote, and the only vertical asymptote is <Katex tex="x=-2" />.
      </>
    ),
    more: (
      <>
        The hole is at <Katex tex="\left(2,\tfrac{3}{2}\right)" />: substitute <Katex tex="x=2" /> into the simplified
        rule, <Katex tex="\frac{2+4}{2+2}=\frac{3}{2}" />. The original rule is undefined at <Katex tex="x=2" />, so that
        single point is missing from the graph, but the curve does not shoot off to infinity there.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x=-2:\ \ 4-4+c=0 \iff c=0" />
        <Katex display tex="c=0:\ \ y=\frac{x(x+2)}{(x-2)(x+2)}=\frac{x}{x-2},\ x\neq-2" />
      </>
    ),
    reason: (
      <>
        Only when <Katex tex="c=0" /> does <Katex tex="(x+2)" /> cancel. Then <Katex tex="x=-2" /> gives a hole, not
        an asymptote, and the only vertical asymptote is <Katex tex="x=2" />.
      </>
    ),
    more: (
      <>
        This is the case the examiner&apos;s report uses. With <Katex tex="c=0" /> the leftover fraction from the first
        line is <Katex tex="\frac{2x+4}{(x-2)(x+2)}=\frac{2}{x-2}" />, so <Katex tex="y=1+\frac{2}{x-2}" />: a
        hyperbola with one vertical asymptote, <Katex tex="x=2" />. The hole is at{' '}
        <Katex tex="\left(-2,\tfrac{1}{2}\right)" />, again from the simplified rule:{' '}
        <Katex tex="\frac{-2}{-2-2}=\frac{1}{2}" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex tex="c" /> cannot equal both <Katex tex="-8" /> and <Katex tex="0" />, so at least one of{' '}
        <Katex tex="x=2" />, <Katex tex="x=-2" /> is always a vertical asymptote.
      </>
    ),
    reason: (
      <>
        For every other value of <Katex tex="c" /> neither factor cancels, so there are two. The number of vertical
        asymptotes is therefore two, or one (when <Katex tex="c=0" /> or <Katex tex="c=-8" />), but never zero.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{Always: } y=1 \text{ and}\\ \text{at least one vertical asymptote}\end{gathered}}"
      />
    ),
    reason: (
      <>
        Matches option <b>E</b>, the only option true for every value of <Katex tex="c" />.
      </>
    ),
    more: (
      <>
        Option A fails when <Katex tex="c=0" /> or <Katex tex="c=-8" />, where only one vertical
        asymptote is left. Option C fails when <Katex tex="c=0" />, as <Katex tex="x=-2" /> is then a hole. Option D
        is true only when <Katex tex="c=0" />, not always. Option B is impossible, as there is only one horizontal
        asymptote.
      </>
    ),
  },
]

export default function SpecialistQ3_2022() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{x^2+2x+c}{x^2-4}" />, where <Katex tex="c\in R" />, will{' '}
          <b>always</b> have
        </p>
      }
      options={[
        { letter: 'A', content: 'two vertical asymptotes and one horizontal asymptote.' },
        { letter: 'B', content: 'two horizontal asymptotes and one vertical asymptote.' },
        { letter: 'C', content: <>a vertical asymptote with equation <Katex tex="x=-2" /> and one horizontal asymptote with equation <Katex tex="y=1" />.</> },
        { letter: 'D', content: <>one horizontal asymptote with equation <Katex tex="y=1" /> and only one vertical asymptote with equation <Katex tex="x=2" />.</> },
        { letter: 'E', content: <>a horizontal asymptote with equation <Katex tex="y=1" /> and at least one vertical asymptote.</>, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Slide c: at c = 0 or c = −8 one vertical asymptote becomes a hole">
          <HolesWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
