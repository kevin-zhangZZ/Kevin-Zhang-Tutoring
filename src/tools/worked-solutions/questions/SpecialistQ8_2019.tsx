// 2019 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 75% correct. Rewriting
// a definite integral under the substitution u = 2x + 1, including transforming the terminals.
// Question text transcribed from the original paper (no diagram). Solution is original.
// Interactive (extras): spec-2019-mcq8-stretch — the area under the x-integrand morphs into the
// u-picture: the base [1, 5] doubles to [3, 11] and every height halves, same area (≈ 56.29); a
// toggle shows option D's ×2 making it 4 times too big. WrongMethod: dx = 2du (13% chose D).
// The report has no comment on this question beyond the statistics.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const StretchWidget = lazyWidget(() => import('../interactives/spec-2019-mcq8-stretch'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 5, C: 4, D: 13, E: 75 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 2x+1 \implies \dfrac{du}{dx}=2 \implies dx = \dfrac{du}{2}" />,
    reason: <>Every option contains <Katex tex="u^{1/2}" />, so let <Katex tex="u" /> be what is under the square root. Then <Katex tex="du = 2\,dx" />, so <Katex tex="dx" /> is <em>half</em> of <Katex tex="du" />.</>,
  },
  {
    working: <Katex display tex="u = 2x+1 \implies 2x-1 = u-2" />,
    reason: <>No <Katex tex="x" /> may be left after substituting, so rewrite this factor in <Katex tex="u" /> too: <Katex tex="2x=u-1" />, so <Katex tex="2x-1=u-2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=1 \implies u = 2(1)+1 = 3" />
        <Katex display tex="x=5 \implies u = 2(5)+1 = 11" />
      </>
    ),
    reason: <>The terminals are <Katex tex="x" /> values and the new integral is in <Katex tex="u" />, so convert them with <Katex tex="u=2x+1" />.</>,
  },
  {
    working: <Katex display tex="\int_1^5 (2x-1)\sqrt{2x+1}\ dx = \int_3^{11}(u-2)\sqrt{u}\ \dfrac{du}{2}" />,
    reason: <>Replace every piece: the integrand, <Katex tex="dx" /> and the terminals.</>,
  },
  {
    working: <Katex display tex="= \dfrac12\int_3^{11}\left(u\cdot u^{1/2}-2u^{1/2}\right)du" />,
    reason: <>Take the constant <Katex tex="\tfrac12" /> outside and expand the bracket, so each term is a plain power of <Katex tex="u" /> like the options.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac12\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option <b>D</b> has <Katex tex="2" /> outside instead of <Katex tex="\tfrac12" />, the result of multiplying by <Katex tex="\tfrac{du}{dx}" /> rather than dividing. Options <b>A</b> and <b>B</b> have <Katex tex="u^{3/2}+u^{1/2}=(u+1)\sqrt u" />, which would need <Katex tex="2x-1" /> to be <Katex tex="u+1" /> instead of <Katex tex="u-2" />, and <b>A</b> also keeps the old terminals <Katex tex="1" /> and <Katex tex="5" />. Option <b>C</b> has the <Katex tex="2" /> outside and the old terminals.</>,
  },
]

export default function SpecialistQ8_2019() {
  return (
    <MCQShell
      question={<p>With a suitable substitution, <Katex tex="\displaystyle\int_1^5 (2x-1)\sqrt{2x+1}\ dx" /> can be expressed as</p>}
      options={[
        { letter: 'A', content: <Katex tex="\tfrac12\displaystyle\int_1^5\left(u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'B', content: <Katex tex="2\displaystyle\int_3^{11}\left(u^{3/2}+u^{1/2}\right)du" /> },
        { letter: 'C', content: <Katex tex="2\displaystyle\int_1^5\left(u^{3/2}-2u^{1/2}\right)du" /> },
        { letter: 'D', content: <Katex tex="2\displaystyle\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du" /> },
        { letter: 'E', content: <Katex tex="\tfrac12\displaystyle\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Widths double, so heights must halve: where the ½ comes from">
            <StretchWidget />
          </Explore>
          <WrongMethod
            title={<>&ldquo;<Katex tex="\tfrac{du}{dx} = 2" />, so <Katex tex="dx = 2\,du" />&rdquo;</>}
            source="13% chose D"
            working={<Katex display tex="\int_3^{11}(u-2)\sqrt u\cdot 2\,du = 2\int_3^{11}\left(u^{3/2}-2u^{1/2}\right)du" />}
          >
            Rearranging <Katex tex="\tfrac{du}{dx} = 2" /> gives <Katex tex="du = 2\,dx" />, so{' '}
            <Katex tex="dx = \tfrac12\,du" />: divide, don&apos;t multiply. A quick sense check: as <Katex tex="u" /> runs
            from <Katex tex="3" /> to <Katex tex="11" /> (8 units), <Katex tex="x" /> runs only from <Katex tex="1" /> to{' '}
            <Katex tex="5" /> (4 units), so each bit of <Katex tex="x" /> is half a bit of <Katex tex="u" />. Multiplying
            makes the integral 4 times too big: about <Katex tex="225.15" /> instead of <Katex tex="56.29" />.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
