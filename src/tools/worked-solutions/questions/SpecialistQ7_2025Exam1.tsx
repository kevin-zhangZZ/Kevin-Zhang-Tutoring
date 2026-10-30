// 2025 Specialist Mathematics — Exam 1 Question 7 (4 marks). Proof by mathematical
// induction of a closed form for a sum of squares. Question text transcribed from the
// original paper. Checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [11, 8, 18, 34, 29],
  average: 2.6,
  comment: (
    <>
      This question was not answered well. Some common errors included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Not properly verifying the base case <Katex tex="P(1)" />.
        </li>
        <li>
          Misstating the assumption. For example,
          <div className="pl-5 my-1">
            Suppose the proposition is true for <Katex tex="n=k" />. Then{' '}
            <Katex tex="(k+1)^2=\dfrac{1}{6}k\left(2k^2+9k+1\right)" />.
          </div>
        </li>
        <li>
          Assuming equality at the beginning of the inductive step
          <div className="pl-5 my-1">
            <Katex tex="2^2+3^2+4^2+\ldots+(k+1)^2+(k+2)^2=\dfrac{1}{6}(k+1)\left(2(k+1)^2+9(k+1)+13\right)" />.
          </div>
        </li>
      </ul>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(n): \quad \sum_{i=1}^{n}(i+1)^2 = \tfrac16 n\left(2n^2+9n+13\right)" />,
    reason: <>Name the proposition, so you can refer to <Katex tex="P(1)" />, <Katex tex="P(k)" /> and <Katex tex="P(k+1)" /> below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}P(1)\!:\ \text{LHS} &= (1+1)^2 = 4 \\ \text{RHS} &= \tfrac16(1)(2+9+13) = \tfrac{24}{6} = 4\end{aligned}" />,
    reason: <>Base case: put <Katex tex="n=1" /> into each side separately and show both equal 4.</>,
    more: <>The report lists not properly verifying the base case among the common errors. Writing "<Katex tex="\text{LHS}=\text{RHS}" />" or "true for <Katex tex="n=1" />" without computing both sides is not a verification. When <Katex tex="n=1" /> the sum has a single term, <Katex tex="(1+1)^2=2^2" />, the first term of <Katex tex="2^2+3^2+4^2+\ldots" />.</>,
  },
  {
    working: <Katex display tex="\therefore P(1) \text{ is true}" />,
    reason: <>The base case, stated as a conclusion.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Assume } P(k) \text{ true for some } k\in N\!: \\ &\sum_{i=1}^{k}(i+1)^2 = \tfrac16 k\left(2k^2+9k+13\right)\end{aligned}" />,
    reason: <>Assume the whole statement for one particular <Katex tex="k" />: the full sum on the left, <Katex tex="n" /> replaced by <Katex tex="k" /> everywhere.</>,
    more: <>The report's example of a misstated assumption is <Katex tex="(k+1)^2=\tfrac16k\left(2k^2+9k+1\right)" />: the sum has been replaced by its last term alone (and the constant 13 appears as 1). Also assume it for <em>some</em> <Katex tex="k" />, not for all <Katex tex="n" />, since assuming it for all <Katex tex="n" /> is assuming the very thing being proved.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Need: } \sum_{i=1}^{k+1}(i+1)^2 = \\ &\tfrac16(k+1)\left(2(k+1)^2+9(k+1)+13\right)\end{aligned}" />,
    reason: <>Replace <Katex tex="n" /> by <Katex tex="k+1" /> in <Katex tex="P(n)" /> to see the target. This is only the goal: the proof works on its left side alone.</>,
    more: <>The report lists assuming equality at the beginning of the inductive step among the common errors, that is, writing this equation as if it were already true and working from it. That assumes what you are trying to prove. Label it as the goal (or keep it in your head), then transform the left side until it becomes the right side.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{LHS} &= \sum_{i=1}^{k+1}(i+1)^2 \\ &= \sum_{i=1}^{k}(i+1)^2+\bigl((k+1)+1\bigr)^2\end{aligned}" />,
    reason: <>Start from the left side of <Katex tex="P(k+1)" />: the sum to <Katex tex="k+1" /> is the sum to <Katex tex="k" /> plus its last term, <Katex tex="i=k+1" />.</>,
    more: <>Splitting off the last term is the key move: what is left, <Katex tex="\sum_{i=1}^{k}(i+1)^2" />, is exactly the left side of <Katex tex="P(k)" />, so the assumption can now be used.</>,
  },
  {
    working: <Katex display tex="= \tfrac16 k\left(2k^2+9k+13\right)+(k+2)^2" />,
    reason: <>Replace the sum to <Katex tex="k" /> using the assumption <Katex tex="P(k)" />; also <Katex tex="(k+1)+1=k+2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \tfrac16\bigl[2k^3+9k^2+13k \\ &\qquad +6\left(k^2+4k+4\right)\bigr] \\ &= \tfrac16\left(2k^3+15k^2+37k+24\right)\end{aligned}" />,
    reason: <>Take out <Katex tex="\tfrac16" /> (so <Katex tex="(k+2)^2" /> becomes <Katex tex="6(k+2)^2" />), then expand and collect like terms.</>,
  },
  {
    working: <Katex display tex="= \tfrac16(k+1)\left(2k^2+13k+24\right)" />,
    reason: <>The target has a factor <Katex tex="k+1" />, so look for it here: at <Katex tex="k=-1" /> the cubic is <Katex tex="-2+15-37+24=0" />, so <Katex tex="k+1" /> is a factor; match coefficients (or divide) to get the quadratic.</>,
    more: <>To find the quadratic factor, write <Katex tex="2k^3+15k^2+37k+24=(k+1)\left(2k^2+bk+24\right)" /> (the 2 and the 24 are forced by the <Katex tex="k^3" /> and constant terms). Matching <Katex tex="k^2" /> terms gives <Katex tex="b+2=15" />, so <Katex tex="b=13" />; check the <Katex tex="k" /> terms: <Katex tex="24+13=37" />. Polynomial long division gives the same quadratic.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&2(k+1)^2+9(k+1)+13 \\ &= 2k^2+4k+2+9k+9+13 \\ &= 2k^2+13k+24\end{aligned}" />,
    reason: <>Expand the bracket in the target: it is <Katex tex="2k^2+13k+24" />, exactly the quadratic just found.</>,
    more: <>The report's sample proof (not reproduced here) goes the other way, rewriting <Katex tex="2k^2" /> as <Katex tex="2(k+1)^2-4k-2" />, so the quadratic becomes <Katex tex="2(k+1)^2+9k+22=2(k+1)^2+9(k+1)+13" />. Either direction is fine, as long as the two expressions are shown to be equal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\therefore \text{LHS} \\ &= \tfrac16(k+1)\left(2(k+1)^2+9(k+1)+13\right) \\ &= \text{RHS of } P(k+1)\end{aligned}" />,
    reason: <>So the left side of <Katex tex="P(k+1)" /> has become its right side: <Katex tex="P(k+1)" /> is true whenever <Katex tex="P(k)" /> is.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}P(1) \text{ true and } P(k) \Rightarrow P(k+1), \\ \therefore P(n) \text{ true for all } n\in N\end{gathered}}" />,
    reason: <>The conclusion must name both parts: the base case and the inductive step.</>,
    more: <>Together they give <Katex tex="P(1)\Rightarrow P(2)\Rightarrow P(3)\Rightarrow\ldots" />: each true statement makes the next one true, so every natural number is reached.</>,
  },
]

export default function SpecialistQ7_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (4 marks)</p>
        <p>Use mathematical induction to prove that</p>
        <div className="py-1">
          <Katex display tex="\sum_{i=1}^{n}(i+1)^2 = \frac16 n\left(2n^2+9n+13\right) \ \text{ for } n\in N," />
        </div>
        <p>
          where{' '}
          <Katex tex="\displaystyle\sum_{i=1}^{n}(i+1)^2 = 2^2+3^2+4^2+\ldots+(n+1)^2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Induction proves a statement for every <Katex tex="n\in N" /> in two steps. The{' '}
            <em>base case</em> shows it is true for <Katex tex="n=1" />. The{' '}
            <em>inductive step</em> shows that if it is true for some <Katex tex="n=k" />, it
            must also be true for <Katex tex="n=k+1" />.
          </p>
          <p>
            The algebra here is one expansion and one factorisation. The three common errors
            the report lists are all about how the proof is written (the base case, the
            assumption, the inductive step), not about the algebra.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={4} />
      </div>
    </div>
  )
}
