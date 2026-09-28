// 2020 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 34% correct.
// Given (x+iy)^14 = a+ib, find (y-ix)^14. Question text transcribed from the original paper.
// Solution is original; the identity (y − ix)¹⁴ = −(x + iy)¹⁴ and the x = y = 1 check are verified
// with sympy. Answer A agrees with the report's working and with itute (which writes (−i)¹⁴ as
// i¹⁴ = −1). The numerical check follows a suggestion in the discussion of this paper on Marty
// Ross's blog (mathematicalcrap.com): substitute values for x and y and compare the options.
// Interactive diagram (§15, interactives/spec-2020-mcq8-quarter-turn.tsx, this site's own
// explanatory figure; VCAA printed none): on the Argand plane, y − ix is x + iy turned a
// quarter-turn clockwise; a slider raises both to the power n, so the gap becomes n quarter-turns —
// a half-turn at n = 14 — with a toggle showing option B's −i(a + ib).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const QuarterTurnWidget = lazyWidget(() => import('../interactives/spec-2020-mcq8-quarter-turn'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 29, C: 15, D: 11, E: 11 },
  answer: 'A',
  comment: <Katex tex="(y-ix)^{14} = (-i(x+iy))^{14} = (-i)^{14}(x+iy)^{14} = -(a+ib) = -a-ib" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y - ix = -i(x+iy)" />,
    reason: (
      <>
        How would you spot this? <Katex tex="y-ix" /> is built from the same two real numbers as <Katex tex="x+iy" />,
        swapped over, with a sign change. That swap is the fingerprint of multiplying by <Katex tex="i" /> or{' '}
        <Katex tex="-i" />: <Katex tex="i(x+iy)=-y+ix" /> and <Katex tex="-i(x+iy)=y-ix" />. Check by expanding:{' '}
        <Katex tex="-i(x+iy) = -ix - i^2y = y-ix" />. On an Argand diagram, multiplying by <Katex tex="-i" /> turns a
        point a quarter-turn clockwise about <Katex tex="O" />: <Katex tex="(x,y)" /> goes to <Katex tex="(y,-x)" /> (see
        the diagram below).
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="(y-ix)^{14} = \big(-i(x+iy)\big)^{14}" />
        <Katex display tex="= (-i)^{14}(x+iy)^{14}" />
      </>
    ),
    reason: (
      <>
        Now the given <Katex tex="(x+iy)^{14}" /> appears. The power belongs to everything inside the bracket, so the{' '}
        <Katex tex="-i" /> is raised to the 14th power as well, just as <Katex tex="(2x)^2=4x^2" />, not{' '}
        <Katex tex="2x^2" />. Leaving it out gives the popular wrong answer B (see below).
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="(-i)^2 = -1" />
        <Katex display tex="\implies (-i)^{14} = \big((-i)^2\big)^7 = (-1)^7 = -1" />
      </>
    ),
    reason: (
      <>
        <Katex tex="(-i)^2=i^2=-1" />, so group the fourteen factors into seven pairs. Or think in turns: fourteen
        quarter-turns clockwise is <Katex tex="3\tfrac12" /> turns, which ends where a half-turn does, and a half-turn
        about <Katex tex="O" /> is multiplication by <Katex tex="-1" />. The powers of <Katex tex="-i" /> run{' '}
        <Katex tex="-i,\,-1,\,i,\,1" /> and repeat every four; <Katex tex="14=3\times4+2" />, so{' '}
        <Katex tex="(-i)^{14}=(-i)^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="(y-ix)^{14} = -1\cdot(x+iy)^{14} = -(a+ib)" />,
    reason: <>Substitute the given <Katex tex="(x+iy)^{14}=a+ib" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=y=1\!:\ (1+i)^{14} = (2i)^7 = -128i" />
        <Katex display tex="\implies a=0,\ b=-128" />
        <Katex display tex="(1-i)^{14} = (-2i)^7 = 128i = -a-ib \ \checkmark" />
      </>
    ),
    reason: (
      <>
        A quick check: the result holds &ldquo;for all values of <Katex tex="x" /> and <Katex tex="y" />&rdquo;, so try
        some. <Katex tex="(1+i)^2=2i" /> and <Katex tex="(1-i)^2=-2i" />, and <Katex tex="i^7=-i" />. Choose values that
        make <Katex tex="b\ne0" />, or A and D can&apos;t be told apart (<Katex tex="x=1,\ y=0" /> gives <Katex tex="-1" />{' '}
        for both). With <Katex tex="x=y=1" /> only option A gives <Katex tex="128i" />: B and E give{' '}
        <Katex tex="-128" />, C gives <Katex tex="128" /> and D gives <Katex tex="-128i" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-a - ib}" />,
    reason: (
      <>
        Matches option <b>A</b>. As it should, it has the same modulus as <Katex tex="a+ib" />, since{' '}
        <Katex tex="|y-ix|=|x+iy|" />. Option <b>B</b> (29%) is <Katex tex="-i(a+ib)=b-ia" />: the <Katex tex="-i" />{' '}
        taken outside the bracket and never raised to the 14th power. Option <b>C</b> is <Katex tex="i(a+ib)=-b+ia" />,
        the same slip with <Katex tex="i" /> in place of <Katex tex="-i" /> (and since <Katex tex="i^{14}=-1" /> too, that
        sign wouldn&apos;t have mattered once the power was applied).
      </>
    ),
  },
]

export default function SpecialistQ8_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="(x+iy)^{14} = a+ib" />, where <Katex tex="x,y,a,b\in R" />,{' '}
          <Katex tex="(y-ix)^{14}" /> for all values of <Katex tex="x" /> and <Katex tex="y" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-a-ib" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="b-ia" /> },
        { letter: 'C', content: <Katex tex="-b+ia" /> },
        { letter: 'D', content: <Katex tex="-a+ib" /> },
        { letter: 'E', content: <Katex tex="b+ia" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Multiplying by −i is a quarter-turn, so the 14th powers are 14 quarter-turns apart: a half-turn">
            <QuarterTurnWidget />
          </Explore>
          <WrongMethod
            title="Take the −i out of the bracket"
            source="B 29%"
            working={
              <>
                <Katex display tex="(y-ix)^{14} = \big(-i(x+iy)\big)^{14} = -i(x+iy)^{14}" />
                <Katex display tex="= -i(a+ib) = b-ia \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              The power applies to the whole product inside the bracket, so the <Katex tex="-i" /> has to be raised to the
              14th power too: <Katex tex="(zw)^{14}=z^{14}w^{14}" />. Leaving it outside is like writing{' '}
              <Katex tex="(2x)^2=2x^2" />. In the diagram above, &ldquo;Show option B&apos;s answer&rdquo; marks where
              this lands: only one quarter-turn from <Katex tex="a+ib" />, when the true answer is fourteen quarter-turns
              away.
            </p>
            <p>
              Numbers catch it: with <Katex tex="x=y=1" />, <Katex tex="(1-i)^{14}=128i" />, but{' '}
              <Katex tex="b-ia=-128" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
