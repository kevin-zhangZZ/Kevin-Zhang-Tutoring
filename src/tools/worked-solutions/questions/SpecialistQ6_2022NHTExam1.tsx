// 2022 Specialist NHT — Exam 1, Question 6 (3 marks). The NHT report gives sample answers only,
// with no statistics. Magnitude of the resultant force on a 2 kg mass at t = 4 from its position
// vector r(t) = 32√t i + 6t² j − 3e^(2t−8) k: differentiate twice, |r̈(4)| = 17, force 2 × 17 = 34 N.
// Kept under the current study design with a Background note: the only Mechanics used is R = ma,
// once; the rest is vector calculus. Question text transcribed from the original paper (read from a
// rendered page image). Answer checked with sympy and against the report's sample answer (34).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const v = (s: string) => `\\underset{\\sim}{${s}}`
const I = v('i')
const J = v('j')
const K = v('k')
const RV = v('r')

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex={`${RV}(t)=32t^{\\frac12}${I}+6t^2${J}-3e^{2t-8}${K}`} />,
    reason: <>Write <Katex tex="\sqrt t" /> as <Katex tex="t^{\frac12}" /> so the power rule applies directly.</>,
  },
  {
    working: <Katex display tex={`\\dot{${RV}}(t)=16t^{-\\frac12}${I}+12t${J}-6e^{2t-8}${K}`} />,
    reason: <>Differentiate each component separately to get the velocity. For <Katex tex="e^{2t-8}" />, the chain rule brings down the <Katex tex="2" />: <Katex tex="-3\times2=-6" />.</>,
  },
  {
    working: <Katex display tex={`\\ddot{${RV}}(t)=-8t^{-\\frac32}${I}+12${J}-12e^{2t-8}${K}`} />,
    reason: <>Differentiate again to get the acceleration: <Katex tex="16\times\left(-\tfrac12\right)t^{-\frac32}=-8t^{-\frac32}" />, and the chain rule doubles <Katex tex="-6e^{2t-8}" /> again.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned} \\ddot{${RV}}(4)&=-\\frac{8}{8}${I}+12${J}-12e^{0}${K} \\\\ &=-${I}+12${J}-12${K} \\end{aligned}`} />,
    reason: <>"After it has acted for four seconds" means <Katex tex="t=4" />. Then <Katex tex="4^{\frac32}=\left(\sqrt4\right)^3=8" /> and <Katex tex="e^{2(4)-8}=e^0=1" />.</>,
    more: <>The question was built so that <Katex tex="t=4" /> clears both awkward terms: <Katex tex="4" /> is a perfect square, and <Katex tex="2t-8" /> is zero there. If your numbers aren't simplifying this neatly, recheck the derivatives.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned} \\left|\\ddot{${RV}}(4)\\right|&=\\sqrt{(-1)^2+12^2+(-12)^2} \\\\ &=\\sqrt{289}=17 \\end{aligned}`} />,
    reason: <>The magnitude of a vector is the square root of the sum of its squared components.</>,
  },
  {
    working: <Katex display tex={`\\left|${v('F')}\\right|=m\\left|\\ddot{${RV}}(4)\\right|=2\\times17`} />,
    reason: <>Resultant force = mass × acceleration (<Katex tex={`${v('F')}=m${v('a')}`} />), so its magnitude is the mass times the magnitude of the acceleration.</>,
  },
  {
    working: <Katex display tex="\boxed{34\ \text{N}}" />,
    reason: <>An integer, as the question asks. Check: the force is <Katex tex={`2\\ddot{${RV}}(4)=-2${I}+24${J}-24${K}`} />, and <Katex tex="\sqrt{4+576+576}=\sqrt{1156}=34" /> ✓.</>,
  },
]

export default function SpecialistQ6_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (3 marks)</p>
        <p>
          Relative to a fixed origin, the position of a 2 kg mass after <Katex tex="t" /> seconds
          is given by{' '}
          <Katex tex={`${RV}(t)=32\\sqrt{t}\\,${I}+6t^2${J}-3e^{2t-8}${K}`} />,{' '}
          <Katex tex="t\ge0" />, where components are measured in metres.
        </p>
        <p>
          Find the magnitude of the resultant force, in newtons, after it has acted on the mass
          for four seconds, giving your answer as an integer.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background title="Force wording, vector calculus">
          <p>
            Mechanics is no longer an area of study in Specialist Mathematics, and this question
            uses one of its formulas, once, at the end: Newton's second law, resultant force ={' '}
            mass × acceleration (<Katex tex={`${v('F')}=m${v('a')}`} />). You can rebuild it from
            the units: a newton is <Katex tex="\text{kg m s}^{-2}" />, a mass (kg) times an
            acceleration (<Katex tex="\text{m s}^{-2}" />).
          </p>
          <p>
            Everything else is current vector calculus: differentiate the position vector
            component by component to get velocity, again to get acceleration, then take a
            magnitude.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
