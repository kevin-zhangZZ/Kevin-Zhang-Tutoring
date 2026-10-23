// 2023 Mathematical Methods NHT — Exam 1, Question 6 (6 marks). The NHT report gives sample
// answers only, with no statistics; its notes beyond the bare answers (part a.: set-minus notation;
// part b.: how asymptotes and curves should be drawn) are quoted as those parts' examiner
// comments. The hyperbola f(x) = 3 + 2/(x − 1): maximal domain, a sketch with asymptotes and
// intercepts, then writing f as h(g(x − 1)) with g(x) = 1/x. Question text transcribed from the
// original paper. The part b. sketch is this site's own answer, drawn with matplotlib on VCAA's
// printed grid (x from −6 to 6, y from −2 to 8, step 1). Answers checked with sympy and against the
// report's sample answers (R\{1}; asymptotes x = 1, y = 3, intercepts (0, 1) and (1/3, 0);
// h(x) = 3 + 2x). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2023nhte1-q6b-sketch.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      To exclude a value from an interval, the notation needs to be a backslash <Katex tex="\backslash" />.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      Asymptotes should be marked in as dashed lines and labelled with their equation. Graph lines should be smooth,
      single stroke constructions and display appropriate asymptotic behaviour.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x-1\ne0\implies x\ne1" />,
    reason: <>The only thing that can go wrong in <Katex tex="3+\tfrac{2}{x-1}" /> is division by zero. There are no square roots or logs to restrict it further.</>,
  },
  {
    working: <Katex display tex="\boxed{D=R\setminus\{1\}}" />,
    reason: <>All real numbers except 1, written with a backslash (set minus) and braces round the excluded value.</>,
    more: <>The report notes that to exclude a value the notation needs to be a backslash. Forms like <Katex tex="R-1" />, <Katex tex="R/\{1\}" /> or <Katex tex="x\ne1" /> on its own are not set notation for a domain. <Katex tex="(-\infty,1)\cup(1,\infty)" /> describes the same set.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Vertical asymptote: } x=1" />,
    reason: <>The excluded value from part a. As <Katex tex="x\to1" />, <Katex tex="\tfrac{2}{x-1}" /> grows without bound.</>,
    more: <>Which way? Just right of 1, <Katex tex="x-1" /> is a small positive number, so <Katex tex="f\to+\infty" />; just left of 1 it is a small negative number, so <Katex tex="f\to-\infty" />.</>,
  },
  {
    working: <Katex display tex="\text{Horizontal asymptote: } y=3" />,
    reason: <>As <Katex tex="x\to\pm\infty" />, <Katex tex="\tfrac{2}{x-1}\to0" />, leaving 3.</>,
    more: <><Katex tex="f(x)=3+\tfrac{2}{x-1}" /> is the hyperbola <Katex tex="y=\tfrac1x" />, dilated by factor 2 from the <Katex tex="x" />-axis, then translated 1 right and 3 up. Its centre moves from <Katex tex="(0,0)" /> to <Katex tex="(1,3)" />, and the positive numerator keeps the branches in the same quadrants: top right and bottom left of the centre.</>,
  },
  {
    working: <Katex display tex="f(0)=3+\frac{2}{-1}=1\implies(0,\,1)" />,
    reason: <>The <Katex tex="y" />-intercept: put <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}3+\frac{2}{x-1}=0\implies\frac{2}{x-1}=-3\\\implies x-1=-\frac{2}{3}\implies x=\frac13\end{gathered}" />,
    reason: <>The <Katex tex="x" />-intercept: put <Katex tex="y=0" />. Rearranging the fraction: <Katex tex="x-1=\tfrac{2}{-3}" />.</>,
  },
  {
    working: <Katex display tex="\left(\frac13,\,0\right)" />,
    reason: <>Written as coordinates, as the question asks. Both intercepts are on the lower-left branch, as they must be: it is the one that crosses below <Katex tex="y=3" /> and down past the axes.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="Our answer on VCAA's grid (x from −6 to 6, y from −2 to 8): a hyperbola with dashed asymptotes x = 1 and y = 3; the upper-right branch falls from the top of the grid towards y = 3, the lower-left branch runs just under y = 3 from the left, then drops through (0, 1) and (1/3, 0) and down beside x = 1"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>Both asymptotes dashed and labelled with their equations, both intercepts labelled with coordinates, and each branch a single smooth curve approaching (never touching) its asymptotes.</>,
    more: <>The report asks for exactly this: asymptotes as dashed lines labelled with their equation, and smooth, single-stroke curves showing asymptotic behaviour. Two extra points help the shape: <Katex tex="f(2)=5" /> and <Katex tex="f(3)=4" /> on the upper branch.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="g(x-1)=\frac{1}{x-1}" />,
    reason: <>Replace <Katex tex="x" /> by <Katex tex="x-1" /> in <Katex tex="g(x)=\tfrac1x" />.</>,
  },
  {
    working: <Katex display tex="f(x)=3+2\cdot\frac{1}{x-1}=3+2\,g(x-1)" />,
    reason: <>Write <Katex tex="f" /> in terms of that block: <Katex tex="\tfrac{2}{x-1}" /> is 2 lots of <Katex tex="\tfrac{1}{x-1}" />.</>,
  },
  {
    working: <Katex display tex="h\bigl(g(x-1)\bigr)=3+2\,g(x-1)" />,
    reason: <>So <Katex tex="h" /> must take its input (whatever <Katex tex="g(x-1)" /> is), double it and add 3.</>,
  },
  {
    working: <Katex display tex="\boxed{h(x)=3+2x}" />,
    reason: <>Check: <Katex tex="h\bigl(g(x-1)\bigr)=3+2\cdot\tfrac{1}{x-1}=3+\tfrac{2}{x-1}=f(x)" /> ✓.</>,
    more: <>In transformation terms: <Katex tex="g(x-1)" /> does the translation 1 unit right, and <Katex tex="h" /> does the rest, a dilation by factor 2 from the <Katex tex="x" />-axis followed by a translation 3 units up. A domain for <Katex tex="h" /> isn&apos;t asked for, only its rule.</>,
  },
]

export default function MethodsQ6_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (6 marks)</p>
        <p>
          Consider the function <Katex tex="f" />, where <Katex tex="f:D\to R,\ f(x)=3+\dfrac{2}{x-1}" />, where{' '}
          <Katex tex="D" /> is the maximal domain of <Katex tex="f" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Maximal Domain"
        marks={1}
        statement={
          <>
            State <Katex tex="D" />, the maximal domain of <Katex tex="f" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Hyperbola"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" />. Label any asymptotes with their equation and the axial intercepts
            with their coordinates.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Composite Functions"
        marks={2}
        statement={
          <>
            Let <Katex tex="g:R\setminus\{0\}\to R,\ g(x)=\dfrac{1}{x}" />.
            <br />
            Determine the rule of the function <Katex tex="h" /> such that the graph of{' '}
            <Katex tex="y=h\bigl(g(x-1)\bigr)" /> is identical to the graph of <Katex tex="y=f(x)" />.
          </>
        }
      >
        <Background>
          <p>
            In <Katex tex="h\bigl(g(x-1)\bigr)" />, the function <Katex tex="g" /> acts first and <Katex tex="h" /> acts on
            its output. So rewrite <Katex tex="f(x)" /> so that the expression <Katex tex="\tfrac{1}{x-1}" /> (which is{' '}
            <Katex tex="g(x-1)" />) appears as a single block; whatever is done to that block is <Katex tex="h" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Put x − 1 into h as well"
          working={<Katex display tex="h(x)=3+\frac{2}{x-1}" />}
        >
          The shift by 1 is already inside <Katex tex="g(x-1)" />. With this <Katex tex="h" />,{' '}
          <Katex tex="h\bigl(g(x-1)\bigr)=3+\tfrac{2}{\frac{1}{x-1}-1}" />, which is not <Katex tex="f(x)" />. Always
          substitute your <Katex tex="h" /> back into <Katex tex="h\bigl(g(x-1)\bigr)" /> to check.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
