// 2026 Specialist NHT — Exam 1, Question 3 (3 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. Points of inflection of f(x) = x⁵ + x⁴ − x: f''(x) = 4x²(5x + 3)
// is zero at x = 0 and x = −3/5, but only x = −3/5 has a sign change. Question text transcribed from
// the original paper. The graph of f'' (spec-2026nhte1-q3-second-derivative.png) is this site's own
// explanatory figure; VCAA printed no graph. Answer checked with sympy and against the report's
// sample answer (x = −3/5; the report's sign table at x = −1, −3/5, −1/5, 0, 1 gives −8, 0, 8/25,
// 0, 32, all confirmed). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import fppSrc from './spec-2026nhte1-q3-second-derivative.png'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=5x^4+4x^3-1" />,
    reason: <>Power rule on each term.</>,
  },
  {
    working: <Katex display tex="f''(x)=20x^3+12x^2=4x^2(5x+3)" />,
    reason: <>Differentiate again, then factorise: <Katex tex="4x^2" /> is common to both terms. The factorised form shows straight away where <Katex tex="f''" /> is zero and what sign it has.</>,
  },
  {
    working: <Katex display tex="f''(x)=0\implies x=0\ \text{ or }\ x=-\frac35" />,
    reason: <>A point of inflection can only occur where <Katex tex="f''(x)=0" />, so these are the candidates. They still have to be tested.</>,
  },
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-sm border-collapse mx-auto">
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="x" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="-1" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="-\tfrac35" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="-\tfrac15" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="1" /></td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="f''(x)" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="-8<0" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="\tfrac{8}{25}>0" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="0" /></td>
              <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="32>0" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>Test the sign of <Katex tex="f''" /> on each side of each candidate. For example <Katex tex="f''\!\left(-\tfrac15\right)=4\cdot\tfrac{1}{25}\cdot(-1+3)=\tfrac{8}{25}" />.</>,
    more: <>Faster from the factorised form: <Katex tex="4x^2\ge0" /> always, so the sign of <Katex tex="f''" /> is the sign of <Katex tex="5x+3" />, which changes only at <Katex tex="x=-\tfrac35" />. The factor <Katex tex="x^2" /> touches zero at <Katex tex="x=0" /> without changing sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=-\tfrac35&:\ f''\text{ changes sign }(-\text{ to }+)\\ x=0&:\ f''\text{ does not change sign}\end{aligned}" />,
    reason: <>The concavity changes from down to up at <Katex tex="x=-\tfrac35" />, so that is a point of inflection. At <Katex tex="x=0" /> the graph is concave up on both sides, so it is not.</>,
    more: (
      <>
        <span className="block mb-2">The graph of <Katex tex="f''" /> shows the difference: it crosses the axis at <Katex tex="x=-\tfrac35" /> but only touches it at <Katex tex="x=0" />.</span>
        <span className="block bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={fppSrc}
            alt="This site's own graph of f''(x) = 4x²(5x + 3) for x from −1.2 to 0.6: it rises through the x-axis at (−3/5, 0), peaks, and comes back down to touch the axis at the origin (0, 0) before rising again"
            className="w-full max-w-[360px]" />
        </span>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x=-\frac35}" />,
    reason: <>The question asks for <Katex tex="x" />-coordinate(s) only, and there is exactly one. Sanity check: <Katex tex="f''(-1)=-8" /> and <Katex tex="f''(1)=32" /> have opposite signs, so there must be at least one sign change between them, and it is at <Katex tex="-\tfrac35" />.</>,
  },
]

export default function SpecialistQ3_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>
          Determine the <Katex tex="x" />-coordinate(s) of any point(s) of inflection of the graph of{' '}
          <Katex tex="f(x)=x^5+x^4-x" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A point of inflection is where the graph changes concavity: from concave down (<Katex tex="f''<0" />) to
            concave up (<Katex tex="f''>0" />), or the reverse. So <Katex tex="f''(x)=0" /> is necessary, but it is not
            enough: <Katex tex="f''" /> must actually <b>change sign</b> there. A repeated factor like <Katex tex="x^2" /> in{' '}
            <Katex tex="f''" /> is the classic warning sign of a zero without a sign change.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Every solution of f''(x) = 0 is a point of inflection"
          working={<Katex display tex="x=0\ \text{ and }\ x=-\tfrac35" />}
        >
          <Katex tex="f''(0)=0" />, but <Katex tex="f''" /> is positive just either side of 0 (both <Katex tex="f''(-\tfrac15)" /> and{' '}
          <Katex tex="f''(1)" /> are positive), so the concavity doesn&apos;t change there. Always test the sign either side.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
