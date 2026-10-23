// 2026 Specialist NHT — Exam 1, Question 10 (4 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. P(z) = z⁴ + bz³ + cz² + dz + 1 with real coefficients and
// P(i) = 0: by the conjugate root theorem z² + 1 is a factor; three distinct solutions force the
// other quadratic factor to be a perfect square (z − a)², and the constant term gives a² = 1. So
// (b, c, d) = (−2, 2, −2) or (2, 2, 2). Question text transcribed from the original paper. Answers
// checked with sympy (both expansions) and against the report's sample answer. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="b,c,d\in R\implies P(-i)=0" />,
    reason: <>Conjugate root theorem: a polynomial with real coefficients has its non-real roots in conjugate pairs. So <Katex tex="-i" /> is also a root.</>,
  },
  {
    working: <Katex display tex="(z-i)(z+i)=z^2+1\ \text{ is a factor of }P(z)" />,
    reason: <>Factor theorem, using both roots: their product is a real quadratic factor.</>,
  },
  {
    working: <Katex display tex="P(z)=\left(z^2+1\right)(z-a)^2,\quad a\in R" />,
    reason: <>The other factor is a monic quadratic with real coefficients. A quartic has four roots counted with repetition, so &ldquo;three distinct solutions&rdquo; means exactly one root is repeated. It can&apos;t be <Katex tex="\pm i" /> repeated (a real quadratic with root <Katex tex="i" /> is <Katex tex="z^2+1" /> again, leaving only two distinct solutions), so the other quadratic must have a repeated real root <Katex tex="a" />.</>,
    more: <>The repeated root must be real: if a real quadratic has equal roots, its discriminant is 0 and the root is <Katex tex="-\tfrac{\beta}{2}" />, a real number. And it can&apos;t be <Katex tex="\pm i" />, so <Katex tex="i" />, <Katex tex="-i" />, <Katex tex="a" /> really are three distinct solutions.</>,
  },
  {
    working: <Katex display tex="\text{constant term: }1\times a^2=1\implies a=\pm1" />,
    reason: <>Compare constant terms: the constant in <Katex tex="P(z)" /> is 1, and in the factorised form it is <Katex tex="1\times(-a)^2=a^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a=1:\ P(z)&=\left(z^2+1\right)\left(z^2-2z+1\right)\\ &=z^4-2z^3+2z^2-2z+1\end{aligned}" />,
    reason: <>Expand and read off the coefficients: <Katex tex="b=-2" />, <Katex tex="c=2" />, <Katex tex="d=-2" />.</>,
    more: <>The <Katex tex="z^2" /> coefficient comes from <Katex tex="z^2\cdot1+1\cdot z^2=2z^2" />; the <Katex tex="z^3" /> and <Katex tex="z" /> terms from <Katex tex="z^2\cdot(-2z)" /> and <Katex tex="1\cdot(-2z)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a=-1:\ P(z)&=\left(z^2+1\right)\left(z^2+2z+1\right)\\ &=z^4+2z^3+2z^2+2z+1\end{aligned}" />,
    reason: <>The same with the sign of the middle term flipped: <Katex tex="b=2" />, <Katex tex="c=2" />, <Katex tex="d=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}b=-2,\ c=2,\ d=-2\\ \text{or}\\ b=2,\ c=2,\ d=2\end{gathered}}" />,
    reason: <>The question asks for <b>all</b> combinations, so give both. Sanity check with <Katex tex="b=c=d=2" />: <Katex tex="P(i)=i^4+2i^3+2i^2+2i+1=1-2i-2+2i+1=0" /> ✓, and <Katex tex="P(-1)=1-2+2-2+1=0" /> ✓.</>,
  },
]

export default function SpecialistQ10_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (4 marks)</p>
        <p>
          Consider the family of complex polynomials <Katex tex="P(z)=z^4+bz^3+cz^2+dz+1" />, where{' '}
          <Katex tex="b,c,d\in R" />.
        </p>
        <p>
          Given that <Katex tex="P(i)=0" />, and that <Katex tex="P(z)=0" /> has three distinct solutions, find all
          combinations of the values of <Katex tex="b" />, <Katex tex="c" /> and <Katex tex="d" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two facts do the work. The <b>conjugate root theorem</b>: if a polynomial has real coefficients and{' '}
            <Katex tex="z_0" /> is a root, so is <Katex tex="\overline{z_0}" />. And <b>counting roots</b>: a polynomial of
            degree 4 has exactly four roots over <Katex tex="C" /> when repeated roots are counted as many times as they
            repeat. Three distinct solutions out of four means one of them is a double root.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Stop at one answer"
          working={<Katex display tex="\begin{gathered}P(z)=\left(z^2+1\right)(z-1)^2\\ \implies b=-2,\ c=2,\ d=-2\end{gathered}" />}
        >
          <Katex tex="a^2=1" /> has two solutions, and both give valid polynomials with three distinct roots. &ldquo;Find
          all combinations&rdquo; is the hint that there is more than one.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
