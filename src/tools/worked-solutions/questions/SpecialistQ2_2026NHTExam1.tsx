// 2026 Specialist NHT — Exam 1, Question 2 (3 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. Proof by mathematical induction that n² + 5n is even for all
// n ∈ N: base case n = 1, then (k + 1)² + 5(k + 1) = (k² + 5k) + 2(k + 3). Question text transcribed
// from the original paper. Checked against the report's sample proof (same structure, with
// k² + 5k = 2m); first values 6, 14, 24, 36, … checked in Python. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\text{Let }P(n)\text{ be the statement:}\\ n^2+5n\text{ is even, for }n\in N.\end{gathered}" />,
    reason: <>Name the statement being proved, so each step can say exactly what it has shown.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}P(1):\ 1^2+5(1)=6=2\times3,\\ \text{which is even,}\\ \text{so }P(1)\text{ is true.}\end{gathered}" />,
    reason: <>Base case: check the first natural number. &ldquo;Even&rdquo; means &ldquo;equal to 2 times an integer&rdquo;, so write it that way.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Assume }P(k)\text{ is true}\\ \text{for some }k\in N:\\ k^2+5k=2m\text{ for some }m\in Z.\end{gathered}" />,
    reason: <>The inductive hypothesis. Writing &ldquo;even&rdquo; as <Katex tex="2m" /> turns the assumption into an equation we can substitute.</>,
    more: <>The report writes <Katex tex="m\in N" />; since <Katex tex="k^2+5k\ge6" /> for every <Katex tex="k\in N" />, <Katex tex="m" /> is in fact a positive integer, so either is fine.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&P(k+1):\ (k+1)^2+5(k+1)\\ &\quad=k^2+2k+1+5k+5\\ &\quad=(k^2+5k)+2k+6\\ &\quad=2m+2(k+3)\\ &\quad=2(m+k+3)\end{aligned}" />,
    reason: <>Expand, then regroup so that the expression from the assumption, <Katex tex="k^2+5k" />, appears on its own and can be replaced by <Katex tex="2m" />. What is left over, <Katex tex="2k+6" />, already has a factor of 2.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}m+k+3\in Z,\text{ so}\\ (k+1)^2+5(k+1)\text{ is even:}\\ P(k)\implies P(k+1).\end{gathered}" />,
    reason: <>The sum of integers is an integer, so the expression is 2 times an integer. Say explicitly that <Katex tex="P(k)" /> true implies <Katex tex="P(k+1)" /> true.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{By mathematical induction,}\\ n^2+5n\text{ is even}\\ \text{for all }n\in N.\end{gathered}}" />,
    reason: <>The concluding statement names the principle and the set it holds for: <Katex tex="P(1)" /> is true, and each true case makes the next one true. As required.</>,
    more: <>Quick check of the claim: <Katex tex="n=1,2,3,4" /> give 6, 14, 24, 36, all even. (A direct reason also exists: <Katex tex="n^2+5n=n(n+5)" />, and of <Katex tex="n" /> and <Katex tex="n+5" /> one is even, since they differ by an odd number. But the question asks for induction.)</>,
  },
]

export default function SpecialistQ2_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Prove by mathematical induction that the number given by <Katex tex="n^2+5n" /> is even for all{' '}
          <Katex tex="n\in N" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            An induction proof has three parts. <b>Base case</b>: show the statement is true for <Katex tex="n=1" />.{' '}
            <b>Inductive step</b>: assume it is true for some <Katex tex="n=k" /> and use that assumption to show it is
            true for <Katex tex="n=k+1" />. <b>Conclusion</b>: say that, by the principle of mathematical induction, it is
            true for all <Katex tex="n\in N" />. For a divisibility statement, the key move in the inductive step is to
            find the <Katex tex="P(k)" /> expression inside the <Katex tex="P(k+1)" /> expression.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Show the k + 1 case is even without using the assumption"
          working={<Katex display tex="\begin{gathered}(k+1)^2+5(k+1)=k^2+7k+6\\ \text{... which is even}\end{gathered}" />}
        >
          Simply asserting that <Katex tex="k^2+7k+6" /> is even is the statement you are trying to prove, so it proves
          nothing. The assumption <Katex tex="k^2+5k=2m" /> has to be used: split off <Katex tex="k^2+5k" />, replace it
          with <Katex tex="2m" />, and show the rest has a factor of 2.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
