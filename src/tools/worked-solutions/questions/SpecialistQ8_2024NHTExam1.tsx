// 2024 Specialist NHT — Exam 1, Question 8 (4 marks). The NHT report gives sample answers only,
// with no statistics. Proof by mathematical induction that 1×7 + 2×15 + 3×23 + … + n(8n − 1) =
// (1/6)n(n + 1)(16n + 5) for all n ∈ N: base case n = 1, then the inductive step factorises
// (k + 1)[k(16k + 5) + 6(8k + 7)]/6 = (1/6)(k + 1)(k + 2)(16k + 21). Question text transcribed from
// the original paper (read from a rendered page image). Identity checked with sympy (the closed form
// of Σ k(8k − 1)) and the step against the VCAA report's sample answer, which follows the same route.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&P(n): \\ &1\times7+2\times15+\ldots+n(8n-1) \\ &\quad=\tfrac16n(n+1)(16n+5)\end{aligned}" />,
    reason: <>Name the statement so you can refer to it. The <Katex tex="n" />th term is <Katex tex="n(8n-1)" />: <Katex tex="n=1,2,3" /> give <Katex tex="1\times7,\ 2\times15,\ 3\times23" />, matching the printed terms.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}n=1:\quad&\text{LHS}=1\times7=7 \\ &\text{RHS}=\tfrac16(1)(2)(21)=7\end{aligned}" />,
    reason: <><b>Base case.</b> Show both sides separately and that they agree, so <Katex tex="P(1)" /> is true.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Assume }P(k): \\ &1\times7+2\times15+\ldots+k(8k-1) \\ &\quad=\tfrac16k(k+1)(16k+5)\end{aligned}" />,
    reason: <><b>Inductive hypothesis.</b> Assume the statement is true for some <Katex tex="k\in N" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &n=k+1: \\ &\text{LHS}=\underbrace{1\times7+\ldots+k(8k-1)}_{\text{use }P(k)} \\ &\qquad+(k+1)\left(8(k+1)-1\right) \\ &=\tfrac16k(k+1)(16k+5) \\ &\qquad+(k+1)(8k+7) \end{aligned}"
      />
    ),
    reason: <><b>Inductive step.</b> The sum to <Katex tex="k+1" /> terms is the sum to <Katex tex="k" /> terms plus the next term, <Katex tex="(k+1)(8(k+1)-1)=(k+1)(8k+7)" />. Replace the first <Katex tex="k" /> terms using the hypothesis.</>,
  },
  {
    working: <Katex display tex="=\tfrac16(k+1)\left[k(16k+5)+6(8k+7)\right]" />,
    reason: <>Take out the common factor <Katex tex="\tfrac16(k+1)" /> straight away rather than expanding everything, since the target also has a factor <Katex tex="(k+1)" />. To take <Katex tex="\tfrac16" /> out of the second term, write it as <Katex tex="(k+1)(8k+7)=\tfrac16(k+1)\times6(8k+7)" />.</>,
  },
  {
    working: <Katex display tex="=\tfrac16(k+1)\left(16k^2+53k+42\right)" />,
    reason: <>Expand inside the bracket and collect like terms: <Katex tex="k(16k+5)+6(8k+7)=16k^2+5k+48k+42=16k^2+53k+42" />.</>,
  },
  {
    working: <Katex display tex="=\tfrac16(k+1)(k+2)(16k+21)" />,
    reason: <>Factorise the quadratic, knowing what to aim for: the target <Katex tex="\tfrac16(k+1)\big((k+1)+1\big)\big(16(k+1)+5\big)" /> has factors <Katex tex="(k+2)" /> and <Katex tex="(16k+21)" />. Check: <Katex tex="(k+2)(16k+21)=16k^2+21k+32k+42=16k^2+53k+42" /> ✓.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=\tfrac16(k+1)\big((k+1)+1\big)\big(16(k+1)+5\big) \\ &=\text{RHS of }P(k+1)\end{aligned}" />,
    reason: <>So if <Katex tex="P(k)" /> is true, then <Katex tex="P(k+1)" /> is true.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{By mathematical induction,} \\ &P(n)\text{ is true for all }n\in N\end{aligned}}" />,
    reason: <><Katex tex="P(1)" /> is true, and each true case makes the next one true, so the statement holds for every natural number. As required.</>,
    more: <>Extra check, <Katex tex="n=2" />: <Katex tex="7+30=37" /> and <Katex tex="\tfrac16(2)(3)(37)=37" /> ✓.</>,
  },
]

export default function SpecialistQ8_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>Prove by mathematical induction that</p>
        <Katex display tex="\begin{aligned}&1\times7+2\times15+3\times23+\ \ldots\ +n(8n-1) \\ &\quad=\frac16n(n+1)(16n+5)\ \text{ for all }n\in N.\end{aligned}" />
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A proof by induction has three parts, and each earns marks: show the statement is true for{' '}
            <Katex tex="n=1" /> (base case); assume it is true for <Katex tex="n=k" /> (inductive hypothesis); and use that
            assumption to show it is true for <Katex tex="n=k+1" /> (inductive step). Then write the conclusion.
          </p>
          <p>
            For a sum, the inductive step always starts the same way: the sum to <Katex tex="k+1" /> terms is the sum to{' '}
            <Katex tex="k" /> terms (which the hypothesis replaces) plus the <Katex tex="(k+1)" />th term. Write down
            the target, the right-hand side with <Katex tex="n=k+1" />, before you start, so you know which factors to
            look for.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
