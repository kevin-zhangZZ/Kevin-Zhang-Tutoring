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
        The numerator and denominator have the same degree, so divide first: write the numerator as{' '}
        <Katex tex="(x^2-4)" /> plus whatever is left over. This is the standard first step for finding the
        horizontal asymptote of a rational function.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{As } x\to\pm\infty,\ \frac{2x+c+4}{x^2-4}\to 0,\ \text{so } y\to 1" />,
    reason: (
      <>
        The leftover fraction has a lower-degree numerator than denominator, so it shrinks to <Katex tex="0" />. The
        same limit, <Katex tex="1" />, holds in both directions, so there is exactly <b>one</b> horizontal asymptote,{' '}
        <Katex tex="y=1" />, for every value of <Katex tex="c" />. This already rules out option B.
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
        Only when <Katex tex="c=-8" /> does <Katex tex="(x-2)" /> cancel. Then there is a hole at{' '}
        <Katex tex="\left(2,\tfrac{3}{2}\right)" /> and the only vertical asymptote is <Katex tex="x=-2" />.
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
        Only when <Katex tex="c=0" /> does <Katex tex="(x+2)" /> cancel. Then there is a hole at{' '}
        <Katex tex="\left(-2,\tfrac{1}{2}\right)" /> and the only vertical asymptote is <Katex tex="x=2" />. This is
        the examiners&apos; example.
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
        Matches option <b>E</b>. Option A (chosen by 41%) fails when <Katex tex="c=0" /> or <Katex tex="c=-8" />,
        where only one vertical asymptote is left. Option C fails when <Katex tex="c=0" />, as <Katex tex="x=-2" />{' '}
        is then a hole. Option D is true only when <Katex tex="c=0" />, not always. Option B is impossible, as there is
        only one horizontal asymptote.
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
