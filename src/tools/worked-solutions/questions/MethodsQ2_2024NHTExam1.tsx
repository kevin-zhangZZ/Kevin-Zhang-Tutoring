// 2024 Mathematical Methods NHT — Exam 1, Question 2 (5 marks). The NHT report gives sample
// answers only, with no statistics; its notes on parts a. (several methods) and b. (set notation
// for excluded values) are quoted as those parts' examiner comments. A parameter in a pair of
// simultaneous linear equations: infinitely many solutions, a unique solution, and perpendicular
// lines. Solved by elimination, which settles every value of a at once; the report's Method 4
// (matrix/determinant) is not used, as matrices are not in the current Methods study design.
// Question text transcribed from the original paper. Answers checked with sympy and against the
// VCAA report's sample answers (a = −2; R \ {−2, 1}; a = 0 or a = 3). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>There were multiple methods that could be employed to approach this question.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      To exclude values from an interval a backslash \ is needed together with set brackets for the particular
      values. Curved brackets, as in <Katex tex="R\setminus(-2,1)" />, changes the meaning of the answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} ax+(2-a)y &= 3 &&(1)\\ ax+a^2y &= \frac{2a^2+a}{2} &&(2)\end{aligned}" />,
    reason: <>Eliminate <Katex tex="x" />: keep the first equation as (1), and multiply the second by <Katex tex="a" /> to get (2), so both have <Katex tex="ax" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}(1)-(2):\quad \left(2-a-a^2\right)y &= 3-\frac{2a^2+a}{2}\\ \left(2-a-a^2\right)y &= \frac{6-a-2a^2}{2}\end{aligned}" />,
    reason: <>Subtracting removes <Katex tex="x" />, leaving one equation in <Katex tex="y" /> whose coefficient depends on <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="-(a+2)(a-1)\,y = -\frac{(a+2)(2a-3)}{2}" />,
    reason: <>Factorise both sides: <Katex tex="2-a-a^2=-(a^2+a-2)" /> and <Katex tex="6-a-2a^2=-(2a^2+a-6)" />.</>,
    more: <>Check: <Katex tex="(a+2)(a-1)=a^2+a-2" /> and <Katex tex="(a+2)(2a-3)=2a^2+a-6" />.</>,
  },
  {
    working: <Katex display tex="\text{Coefficient of } y = 0 \iff a=-2 \ \text{ or } \ a=1" />,
    reason: <>An equation <Katex tex="ky=c" /> has one solution when <Katex tex="k\neq0" />. When <Katex tex="k=0" /> it has infinitely many solutions if <Katex tex="c=0" /> as well (<Katex tex="0=0" />), and none if <Katex tex="c\neq0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a=-2:&\quad 0\cdot y = 0 \ \text{(true for all } y)\\ a=1:&\quad 0\cdot y = \tfrac32 \ \text{(never true)}\end{aligned}" />,
    reason: <>At <Katex tex="a=-2" /> the right side is also zero; at <Katex tex="a=1" /> it is <Katex tex="-\tfrac{(3)(-1)}{2}=\tfrac32" />.</>,
    more: <>Directly: at <Katex tex="a=-2" /> the equations are <Katex tex="-2x+4y=3" /> and <Katex tex="x-2y=-\tfrac32" />, and the second times <Katex tex="-2" /> is the first, so they are the same line. At <Katex tex="a=1" /> they are <Katex tex="x+y=3" /> and <Katex tex="x+y=\tfrac32" />: parallel lines that never meet, so no solution.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-2}" />,
    reason: <>The only value making the two equations the same line, so infinitely many solutions.</>,
    more: <>The report shows five methods. Equating gradients, <Katex tex="-\tfrac{a}{2-a}=-\tfrac1a" />, also gives <Katex tex="a=1" /> or <Katex tex="a=-2" />, and then the <Katex tex="y" />-intercepts, <Katex tex="\tfrac{3}{2-a}=\tfrac{2a+1}{2a}" />, give <Katex tex="a=\tfrac12" /> or <Katex tex="a=-2" />. Only <Katex tex="a=-2" /> satisfies both, so only it gives the same line. Finding <Katex tex="a=1" /> or <Katex tex="a=-2" /> and stopping there is not enough: one of them gives no solution.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="a\neq-2,\ a\neq1 \implies y = \frac{2a-3}{2(a-1)}" />,
    reason: <>From part a., when the coefficient <Katex tex="-(a+2)(a-1)" /> is not zero, divide by it: exactly one <Katex tex="y" />, and then the second equation gives exactly one <Katex tex="x" />.</>,
    more: <>This includes <Katex tex="a=0" />, where the method multiplied by zero: the equations are then <Katex tex="2y=3" /> and <Katex tex="x=\tfrac12" />, which still have the single solution <Katex tex="\left(\tfrac12,\tfrac32\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a\in R\setminus\{-2,\,1\}}" />,
    reason: <>Every real number except the two values found in part a. Set braces, not round brackets, around the excluded values.</>,
    more: <>The report notes that <Katex tex="R\setminus(-2,1)" /> changes the meaning: it removes the whole interval between <Katex tex="-2" /> and <Katex tex="1" />, not just the two numbers.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="m_1 = -\frac{a}{2-a},\qquad m_2 = -\frac1a" />,
    reason: <>Rearrange each equation into <Katex tex="y=mx+c" /> to read off the gradients (for <Katex tex="a\neq2" /> and <Katex tex="a\neq0" />).</>,
  },
  {
    working: <Katex display tex="\begin{gathered}m_1m_2 = -1 \implies \frac{1}{2-a} = -1\\ \implies 2-a=-1\end{gathered}" />,
    reason: <>Lines meet at right angles when the product of their gradients is <Katex tex="-1" />. The <Katex tex="a" /> cancels: <Katex tex="\left(-\tfrac{a}{2-a}\right)\left(-\tfrac1a\right)=\tfrac1{2-a}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a=3}" />,
    reason: <>The question asks for <b>a</b> value. VCAA also accepts <Katex tex="a=0" />: there the gradient formula fails, but the equations become <Katex tex="2y=3" /> (horizontal) and <Katex tex="x=\tfrac12" /> (vertical), which are perpendicular.</>,
    more: <>Check <Katex tex="a=3" />: the lines are <Katex tex="3x-y=3" /> (gradient 3) and <Katex tex="x+3y=\tfrac72" /> (gradient <Katex tex="-\tfrac13" />), and <Katex tex="3\times\left(-\tfrac13\right)=-1" />.</>,
  },
]

export default function MethodsQ2_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (5 marks)</p>
        <p>Consider the simultaneous linear equations</p>
        <div className="py-1">
          <Katex display tex="\begin{aligned} ax+(2-a)y &= 3\\ x+ay &= \frac{2a+1}{2}\end{aligned}" />
        </div>
        <p>
          where <Katex tex="a\in R" /> and <Katex tex="x,y\in R" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Infinite Solutions"
        marks={3}
        statement={<>Find the value of <Katex tex="a" /> for which there are infinitely many solutions.</>}
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            Two linear equations are two straight lines, and only three things can happen: they cross once (a
            unique solution), they are parallel and distinct (no solution), or they are the same line (infinitely
            many solutions). Equal gradients rule out the first case; the intercepts then decide between the other
            two.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Equal gradients is enough for infinitely many solutions"
          working={<Katex display tex="-\frac{a}{2-a}=-\frac1a \implies a=1\ \text{ or }\ a=-2" />}
        >
          Equal gradients only makes the lines parallel. At <Katex tex="a=1" /> the lines are{' '}
          <Katex tex="x+y=3" /> and <Katex tex="x+y=\tfrac32" />, parallel but distinct, so there is no solution at
          all. Always test each root to see whether the lines coincide.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Unique Solution"
        marks={1}
        statement={<>Find the values of <Katex tex="a" /> for which there is a unique solution.</>}
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Perpendicular Lines"
        marks={1}
        statement={<>Find a value of <Katex tex="a" /> such that the lines meet at right angles.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
