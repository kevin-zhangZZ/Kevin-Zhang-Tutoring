// 2025 Specialist NHT — Exam 1, Question 8 (4 marks). The NHT report gives a sample answer only,
// with no statistics. Curved surface area when the quarter-astroid x = 4cos³(θ), y = 4sin³(θ),
// θ ∈ [0, π/2], is rotated about the y-axis: S = 2π∫x√((dx/dθ)² + (dy/dθ)²) dθ = 96π∫cos⁴(θ)sin(θ) dθ
// = 96π/5. Question text transcribed from the original paper (read from a rendered page image; the
// 2025 paper has no text layer); the curve is cropped from page 12 of the original VCAA exam PDF
// at 300 dpi (spec-2025nhte1-q8-curve.png). Answer checked by numerical integration (60.3185…
// = 96π/5) and against the report's sample answer, which agrees. The report labels the derivatives
// dx/dt and dy/dt although the parameter is θ (a slip; noted in the working). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import curveSrc from './spec-2025nhte1-q8-curve.png'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{dx}{d\theta}&=-12\cos^2(\theta)\sin(\theta) \\ \frac{dy}{d\theta}&=12\sin^2(\theta)\cos(\theta) \end{aligned}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{d}{d\theta}\cos^3(\theta)=3\cos^2(\theta)\cdot(-\sin(\theta))" /> and <Katex tex="\tfrac{d}{d\theta}\sin^3(\theta)=3\sin^2(\theta)\cos(\theta)" />, each times 4.</>,
    more: <>The report writes these as <Katex tex="\tfrac{dx}{dt}" /> and <Katex tex="\tfrac{dy}{dt}" />, a slip: the parameter here is <Katex tex="\theta" />, not <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\left(\frac{dx}{d\theta}\right)^2+\left(\frac{dy}{d\theta}\right)^2 \\ &=144\cos^4(\theta)\sin^2(\theta)+144\sin^4(\theta)\cos^2(\theta) \\ &=144\sin^2(\theta)\cos^2(\theta)\left(\cos^2(\theta)+\sin^2(\theta)\right) \\ &=144\sin^2(\theta)\cos^2(\theta) \end{aligned}" />,
    reason: <>Factor out the common <Katex tex="144\sin^2(\theta)\cos^2(\theta)" />; what is left is <Katex tex="\cos^2(\theta)+\sin^2(\theta)=1" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{\left(\frac{dx}{d\theta}\right)^2+\left(\frac{dy}{d\theta}\right)^2}=12\sin(\theta)\cos(\theta)" />,
    reason: <>On <Katex tex="\left[0,\tfrac{\pi}{2}\right]" /> both <Katex tex="\sin(\theta)" /> and <Katex tex="\cos(\theta)" /> are non-negative, so the square root is <Katex tex="12\sin(\theta)\cos(\theta)" /> with no absolute value needed.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} S&=2\pi\int_0^{\frac{\pi}{2}}x\sqrt{\left(\frac{dx}{d\theta}\right)^2+\left(\frac{dy}{d\theta}\right)^2}\,d\theta \\ &=2\pi\int_0^{\frac{\pi}{2}}4\cos^3(\theta)\cdot12\sin(\theta)\cos(\theta)\,d\theta \end{aligned}" />,
    reason: <>This is the formula-sheet surface area for a parametric curve rotated about the <Katex tex="y" />-axis. Each point of the curve travels round a circle of radius <Katex tex="x" />, so the radius is <Katex tex="x=4\cos^3(\theta)" /> (not <Katex tex="y" />), and the terminals are the given interval <Katex tex="\theta\in\left[0,\tfrac{\pi}{2}\right]" />.</>,
  },
  {
    working: <Katex display tex="S=96\pi\int_0^{\frac{\pi}{2}}\cos^4(\theta)\sin(\theta)\,d\theta" />,
    reason: <><Katex tex="2\pi\times4\times12=96\pi" />, and <Katex tex="\cos^3(\theta)\cos(\theta)=\cos^4(\theta)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} u=\cos(\theta),\ \ \frac{du}{d\theta}&=-\sin(\theta) \\ \theta=0:\ u=1,\quad \theta=\tfrac{\pi}{2}&:\ u=0 \end{aligned}" />,
    reason: <>The integrand is a power of <Katex tex="\cos(\theta)" /> times its derivative (up to sign), so substitute <Katex tex="u=\cos(\theta)" /> and change the terminals.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} S&=96\pi\int_1^0u^4\,(-du)=96\pi\int_0^1u^4\,du \\ &=96\pi\left[\frac{u^5}{5}\right]_0^1 \end{aligned}" />,
    reason: <><Katex tex="\sin(\theta)\,d\theta=-du" />. Swapping the terminals of an integral changes its sign, so the minus sign is absorbed by flipping <Katex tex="\int_1^0" /> to <Katex tex="\int_0^1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S=\frac{96\pi}{5}\text{ square units}}" />,
    reason: <><Katex tex="96\pi\left(\tfrac15-0\right)" />, left exact since Exam 1 is technology-free.</>,
    more: <>Sanity check: <Katex tex="\tfrac{96\pi}{5}\approx60.3" />. The curve has length <Katex tex="\int_0^{\pi/2}12\sin(\theta)\cos(\theta)\,d\theta=6" />, and 60.3 is what a band of width 6 at an average radius of about 1.6 gives (<Katex tex="2\pi\times1.6\times6\approx60.3" />). That is plausible for a curve running from <Katex tex="x=0" /> to <Katex tex="x=4" />: it bows in towards the origin, so half its length (<Katex tex="\theta" /> from <Katex tex="\tfrac{\pi}{4}" /> to <Katex tex="\tfrac{\pi}{2}" />) lies at <Katex tex="x\le\sqrt2" />.</>,
  },
]

export default function SpecialistQ8_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>Consider the curve shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={curveSrc}
            alt="Graph from the original VCAA exam paper: a curve in the first quadrant from (0, 4) on the y-axis, bending down to (4, 0) on the x-axis, with x from −4 to 4 and y from −1 to 4 marked"
            className="w-full max-w-[440px]"
          />
        </div>
        <p>The parametric equations for this curve are</p>
        <p className="pl-6">
          <Katex tex="x=4\cos^3(\theta)" /> and <Katex tex="y=4\sin^3(\theta)" />, where{' '}
          <Katex tex="\theta\in\left[0,\dfrac{\pi}{2}\right]" />.
        </p>
        <p>The curve is rotated about the <Katex tex="y" />-axis to form a surface of revolution.</p>
        <p>Find the area of this surface.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The formula sheet gives the curved surface area of revolution for a parametric curve. About the{' '}
            <Katex tex="y" />-axis it is <Katex tex="S=2\pi\int x\sqrt{\left(\tfrac{dx}{d\theta}\right)^2+\left(\tfrac{dy}{d\theta}\right)^2}\,d\theta" />:
            a short piece of curve of length <Katex tex="ds=\sqrt{\left(\tfrac{dx}{d\theta}\right)^2+\left(\tfrac{dy}{d\theta}\right)^2}\,d\theta" />{' '}
            sweeps out a thin band of circumference <Katex tex="2\pi x" />.
          </p>
          <p>
            With cubes of sine and cosine, the expression under the square root nearly always collapses using{' '}
            <Katex tex="\sin^2(\theta)+\cos^2(\theta)=1" />, and what&apos;s left is a power of one trig function times the
            other, ready for a substitution.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
