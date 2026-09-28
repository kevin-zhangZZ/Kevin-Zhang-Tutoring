// 2019 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 59% correct. The set of
// k for which a quadratic has two real solutions, via the discriminant. Question text
// transcribed from the original paper (no diagram). Solution is original; answer B agrees with
// the VCAA report and itute. The report has no comment on this question. Widget:
// meth-2019-mcq2-line rewrites the equation as x² + 2x = k and slides the line y = k past the
// parabola y = x² + 2x: two crossings above the vertex (−1, −1), one touching point at k = −1,
// none below (option C's set).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LineWidget = lazyWidget(() => import('../interactives/meth-2019-mcq2-line'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 59, C: 15, D: 6, E: 9 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a=1, \quad b=2, \quad c=-k" />,
    reason: <>&ldquo;How many real solutions&rdquo; for a quadratic is a discriminant question, so start by matching <Katex tex="x^2+2x-k=0" /> to <Katex tex="ax^2+bx+c=0" />. Watch the sign: the constant term is <Katex tex="-k" />, so <Katex tex="c=-k" />, not <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\Delta = b^2-4ac = 2^2-4(1)(-k) = 4+4k" />,
    reason: <>The two minus signs in <Katex tex="-4(1)(-k)" /> make <Katex tex="+4k" />. Keep brackets round <Katex tex="-k" /> when substituting so the sign can&apos;t go missing.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Delta>0" />
        <Katex display tex="4+4k>0" />
        <Katex display tex="4k>-4" />
        <Katex display tex="k>-1" />
      </>
    ),
    reason: <>&ldquo;Two real solutions&rdquo; means two <em>different</em> ones, so <Katex tex="\Delta" /> must be strictly positive. Dividing by <Katex tex="+4" /> keeps the inequality the same way round: it only flips when you multiply or divide by a negative. The boundary <Katex tex="k=-1" /> gives <Katex tex="\Delta=0" />, a single repeated solution, so it is excluded.</>,
  },
  {
    working: <Katex display tex="\boxed{k\in(-1,\infty)}" />,
    reason: <>Matches option <b>B</b>. The round bracket does the excluding: option <b>E</b>, <Katex tex="[-1,\infty)" />, is <Katex tex="\Delta\ge0" />, which lets in <Katex tex="k=-1" /> and its one solution. Option <b>D</b>, <Katex tex="\{-1\}" />, is the solution of <Katex tex="\Delta=0" />, the one-solution case. Option <b>C</b>, <Katex tex="(-\infty,-1)" />, is exactly where <Katex tex="\Delta<0" />: no real solutions at all.</>,
  },
]

export default function MethodsQ2_2019() {
  return (
    <MCQShell
      question={
        <p>
          The set of values of <Katex tex="k" /> for which <Katex tex="x^2+2x-k=0" /> has two
          real solutions is
        </p>
      }
      background={
        <Background title="Why the discriminant counts the solutions">
          <p>
            The quadratic formula is <Katex tex="x=\dfrac{-b\pm\sqrt{\Delta}}{2a}" /> with{' '}
            <Katex tex="\Delta=b^2-4ac" />. If <Katex tex="\Delta>0" />, the <Katex tex="\pm" /> gives two different real
            values: two solutions. If <Katex tex="\Delta=0" />, <Katex tex="\pm0" /> gives the same value twice: one
            (repeated) solution, where the parabola just touches the axis. If <Katex tex="\Delta<0" />, there is no real
            square root: no real solutions.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="\{-1,1\}" /> },
        { letter: 'B', content: <Katex tex="(-1,\infty)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-\infty,-1)" /> },
        { letter: 'D', content: <Katex tex="\{-1\}" /> },
        { letter: 'E', content: <Katex tex="[-1,\infty)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Two solutions means the line y = k cuts the parabola twice">
            <LineWidget />
          </Explore>
          <WrongMethod
            title="There's a negative on the right, so flip the inequality"
            source="15% chose C"
            working={
              <>
                <Katex display tex="4+4k>0 \implies 4k>-4" />
                <Katex display tex="\implies k<-1 \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              An inequality flips only when you multiply or divide both sides by a <em>negative</em> number. Here you divide
              by <Katex tex="+4" />; the <Katex tex="-4" /> on the right is just being divided, so the sign stays:{' '}
              <Katex tex="k>-1" />. Test one value to catch it: <Katex tex="k=-2" /> is in option C, but it gives{' '}
              <Katex tex="x^2+2x+2=0" /> with <Katex tex="\Delta=4-8=-4<0" />, no solutions at all. Option C is exactly
              the set of <Katex tex="k" /> with <Katex tex="\Delta<0" />, the opposite of what was asked.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
