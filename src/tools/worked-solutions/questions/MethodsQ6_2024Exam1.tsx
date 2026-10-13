// 2024 Mathematical Methods — Exam 1 Question 6 (4 marks). A log equation that becomes a
// cubic, with two roots rejected by the implied domain. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [18, 52, 8, 13, 9],
  average: 1.5,
  comment: (
    <>
      Most students demonstrated a knowledge of the logarithm laws needed to simplify this
      question; however, many did not employ the correct combination of these laws. Of those
      students who were able to use all logarithm laws effectively, many students showed good
      progress in factorising the cubic to find the quadratic factor. Some students did not
      solve the resultant cubic and subsequent quadratic equation correctly. Some students
      incorrectly identified <Katex tex="(x+1)" /> or <Katex tex="x=-1" /> as a
      factor/solution. Although some students were able to find three possible solutions, many
      students overlooked the fact that the domain of this log function must be{' '}
      <Katex tex="x>4" /> and, as a result, did not reject the two invalid solutions. Some
      students managed to engage with the implied domain of the problem.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x-4>0 \ \text{ and } \ x>0 \implies x>4" />,
    reason: <>Write the implied domain down <em>first</em>. Both logarithms need positive arguments, and the stricter condition wins. You'll use it at the end to reject solutions.</>,
  },
  {
    working: <Katex display tex="2\log_3(x-4) = \log_3\left((x-4)^2\right)" />,
    reason: <>The power law, first: it moves the coefficient 2 inside the first log, so the two logs can then be added.</>,
    more: <>The 2 belongs to <Katex tex="\log_3(x-4)" /> only. A common wrong combination is <Katex tex="2\log_3\big(x(x-4)\big)=2" />, but that equals <Katex tex="2\log_3(x-4)+2\log_3(x)" />, which doubles the <Katex tex="\log_3(x)" /> term too; it leads to the quadratic <Katex tex="x(x-4)=3" /> and the wrong answer. (On the domain <Katex tex="x>4" /> there is no absolute-value issue with the power law.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\log_3\left((x-4)^2\right)+\log_3(x) \\ &= \log_3\left(x(x-4)^2\right) = 2 \end{aligned}" />,
    reason: <>Then the addition law: logs of the same base add into a single log of a product.</>,
  },
  {
    working: <Katex display tex="x(x-4)^2 = 3^2 = 9" />,
    reason: <>Converting to index form: <Katex tex="\log_3 A = 2" /> means <Katex tex="A = 3^2" />.</>,
  },
  {
    working: <Katex display tex="x^3-8x^2+16x-9 = 0" />,
    reason: <>Expanding <Katex tex="x\left(x^2-8x+16\right)" /> and moving the 9 across.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} P(1) &= 1-8+16-9 = 0 \\ &\implies (x-1) \text{ is a factor} \end{aligned}" />,
    reason: <>Call the cubic <Katex tex="P(x)" />. The factor theorem: try the integer factors of the constant term 9 (<Katex tex="\pm1,\pm3,\pm9" />). <Katex tex="x=1" /> works first time.</>,
    more: <><Katex tex="P(-1)=-1-8-16-9=-34\ne0" />, so <Katex tex="(x+1)" /> is not a factor; the report notes some students identified <Katex tex="(x+1)" /> or <Katex tex="x=-1" /> as a factor/solution. Always substitute to check, and watch the signs: every term of <Katex tex="P(-1)" /> is negative.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x^3-8x^2+16x-9 \\ &= (x-1)\left(x^2-7x+9\right) = 0 \end{aligned}" />,
    reason: <>Divide the cubic by <Katex tex="(x-1)" />, by long division or by matching coefficients.</>,
    more: <>Matching coefficients: write <Katex tex="(x-1)\left(x^2+bx+c\right)=x^3+(b-1)x^2+(c-b)x-c" />. The constant term gives <Katex tex="-c=-9" />, so <Katex tex="c=9" />; the <Katex tex="x" /> term gives <Katex tex="c-b=16" />, so <Katex tex="b=-7" />. Check the <Katex tex="x^2" /> term: <Katex tex="b-1=-8" /> ✓.</>,
  },
  {
    working: <Katex display tex="x = 1 \quad\text{or}\quad x = \frac{7\pm\sqrt{49-36}}{2} = \frac{7\pm\sqrt{13}}{2}" />,
    reason: <>The quadratic formula on <Katex tex="x^2-7x+9=0" /> gives the other two. Since <Katex tex="3<\sqrt{13}<4" />, these lie between 1.5 and 2, and between 5 and 5.5.</>,
    more: <>The bound comes from <Katex tex="\sqrt9<\sqrt{13}<\sqrt{16}" />. Then <Katex tex="\tfrac{7-4}{2}<\tfrac{7-\sqrt{13}}{2}<\tfrac{7-3}{2}" /> and <Katex tex="\tfrac{7+3}{2}<\tfrac{7+\sqrt{13}}{2}<\tfrac{7+4}{2}" />. That is all you need to compare them with 4; no decimals required (they are about 1.70 and 5.30).</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{7+\sqrt{13}}{2}}" />,
    reason: <>Only this one satisfies <Katex tex="x>4" />. The other two make <Katex tex="\log_3(x-4)" /> undefined, so reject them in writing.</>,
    more: <>This is where most marks were lost: the report notes that many students found three possible solutions but overlooked the domain <Katex tex="x>4" /> and did not reject the two invalid ones. For example, <Katex tex="x=1" /> would need <Katex tex="\log_3(-3)" />, which does not exist.</>,
  },
]

export default function MethodsQ6_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (4 marks)</p>
        <p>
          Solve <Katex tex="2\log_3(x-4)+\log_3(x)=2" /> for <Katex tex="x" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Logarithm equations always come with a hidden domain, and this one is designed
            around it: the algebra produces three roots and two of them are impostors.
          </p>
          <p>
            The order of the log laws matters too: the report notes many students did not
            employ the correct combination of them.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={4} />
      </div>
    </div>
  )
}
