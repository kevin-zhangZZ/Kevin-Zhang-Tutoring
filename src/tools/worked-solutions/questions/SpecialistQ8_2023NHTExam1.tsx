// 2023 Specialist NHT — Exam 1, Question 8 (4 marks). The NHT report gives sample answers only,
// with no statistics; its note on part a. ("Other approaches may also be used.") is quoted as that
// part's examiner comment. Part a. differentiates log_e(sec(x) + tan(x)) to get sec(x); part b. uses
// that antiderivative for the area under y = 1/cos(x) − 1 on [0, π/3], log_e(2 + √3) − π/3.
// Question text transcribed from the original paper; the part b. figure is cropped from the
// original VCAA exam PDF (spec-2023nhte1-q8b-region.png). Answers checked with sympy (derivative
// minus sec(x) simplifies to 0; the area ≈ 0.2698 numerically) and against the report's sample
// answers. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import regionSrc from './spec-2023nhte1-q8b-region.png'

const REPORT_A: SAExaminerStats = {
  comment: <>Other approaches may also be used.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\tfrac{d}{dx}\sec(x)&=\sec(x)\tan(x)\\ \tfrac{d}{dx}\tan(x)&=\sec^2(x)\end{aligned}" />,
    reason: <>The two derivatives needed inside the chain rule. The first comes from writing <Katex tex="\sec(x)=(\cos(x))^{-1}" />: <Katex tex="-(\cos(x))^{-2}\times(-\sin(x))=\tfrac{1}{\cos(x)}\cdot\tfrac{\sin(x)}{\cos(x)}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{\sec(x)\tan(x)+\sec^2(x)}{\sec(x)+\tan(x)}" />,
    reason: <>Chain rule for a logarithm: <Katex tex="\tfrac{d}{dx}\log_e(u)=\tfrac{u'}{u}" />, with <Katex tex="u=\sec(x)+\tan(x)" />.</>,
  },
  {
    working: <Katex display tex="=\frac{\sec(x)\left(\tan(x)+\sec(x)\right)}{\sec(x)+\tan(x)}" />,
    reason: <>Take out the common factor <Katex tex="\sec(x)" /> in the numerator. What is left in the bracket is exactly the denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=\sec(x)}" />,
    reason: <>Cancel the bracket (it is non-zero wherever <Katex tex="y" /> is defined, since the log needs <Katex tex="\sec(x)+\tan(x)>0" />). As required.</>,
    more: <>This is the reason the result matters: it says <Katex tex="\log_e(\sec(x)+\tan(x))" /> is an antiderivative of <Katex tex="\sec(x)" />, a function you can&apos;t integrate with the standard rules. Part b. uses exactly that.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}A&=\int_0^{\frac{\pi}{3}}\left(\frac{1}{\cos(x)}-1\right)dx\\ &=\int_0^{\frac{\pi}{3}}\left(\sec(x)-1\right)dx\end{aligned}" />,
    reason: <>The curve is on or above the <Katex tex="x" />-axis from <Katex tex="0" /> to <Katex tex="\tfrac{\pi}{3}" /> (on this interval <Katex tex="0<\cos(x)\le1" />, so <Katex tex="\tfrac{1}{\cos(x)}\ge1" />), so the area is the plain definite integral. And <Katex tex="\tfrac{1}{\cos(x)}" /> is <Katex tex="\sec(x)" />.</>,
  },
  {
    working: <Katex display tex="=\Big[\log_e\left(\sec(x)+\tan(x)\right)-x\Big]_0^{\frac{\pi}{3}}" />,
    reason: <>From part a., an antiderivative of <Katex tex="\sec(x)" /> is <Katex tex="\log_e(\sec(x)+\tan(x))" />. The antiderivative of <Katex tex="-1" /> is <Katex tex="-x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&=\left(\log_e\!\left(\sec\tfrac{\pi}{3}+\tan\tfrac{\pi}{3}\right)-\tfrac{\pi}{3}\right)\\ &\quad-\left(\log_e\left(\sec0+\tan0\right)-0\right)\end{aligned}" />,
    reason: <>Substitute the terminals, upper minus lower.</>,
  },
  {
    working: <Katex display tex="=\left(\log_e\!\left(2+\sqrt3\right)-\tfrac{\pi}{3}\right)-\log_e(1)" />,
    reason: <>Exact values: <Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" /> so <Katex tex="\sec\tfrac{\pi}{3}=2" />, and <Katex tex="\tan\tfrac{\pi}{3}=\sqrt3" />. At 0, <Katex tex="\sec(0)=1" /> and <Katex tex="\tan(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A=\log_e\!\left(2+\sqrt3\right)-\frac{\pi}{3}}" />,
    reason: <><Katex tex="\log_e(1)=0" />. Sanity check: <Katex tex="\log_e(3.73\ldots)\approx1.317" /> and <Katex tex="\tfrac{\pi}{3}\approx1.047" />, so <Katex tex="A\approx0.27" />. The shaded region is a thin sliver under a curve rising from 0 to 1 at <Katex tex="x=\tfrac{\pi}{3}\approx1.05" />, so it should be well under half of <Katex tex="1.05\times1" />: 0.27 is plausible, and positive ✓.</>,
  },
]

export default function SpecialistQ8_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Chain Rule"
        marks={2}
        statement={
          <>
            Show that <Katex tex="\dfrac{dy}{dx}=\sec(x)" />, given that{' '}
            <Katex tex="y=\log_e\left(\sec(x)+\tan(x)\right)" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Area Under a Curve"
        marks={2}
        statement={
          <>
            Part of the curve with equation <Katex tex="y=\dfrac{1}{\cos(x)}-1" /> is shown below.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async" src={regionSrc}
                alt="Figure from the original VCAA exam paper: the curve rises from the origin O, increasingly steeply, to the vertical line x = π/3; the region between the curve, the x-axis and that line is shaded"
                className="w-full max-w-[260px]" />
            </div>
            Find the shaded area, which is bounded by the curve, the <Katex tex="x" />-axis and the line{' '}
            <Katex tex="x=\dfrac{\pi}{3}" />.
          </>
        }
      >
        <Background>
          <p>
            A &ldquo;show that&rdquo; part followed by an area is usually a hint: part a. hands you an
            antiderivative you would not otherwise know. Since{' '}
            <Katex tex="\tfrac{d}{dx}\log_e(\sec(x)+\tan(x))=\sec(x)" />, it follows that{' '}
            <Katex tex="\int\sec(x)\,dx=\log_e(\sec(x)+\tan(x))+c" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod title="Forget the −1 in the integrand" working={<Katex display tex="\int_0^{\frac{\pi}{3}}\sec(x)\,dx=\log_e\!\left(2+\sqrt3\right)" />}>
          That is the area under <Katex tex="y=\sec(x)" />, which sits one unit higher than the shaded
          curve. The <Katex tex="-1" /> moves the curve down onto the origin and removes a{' '}
          <Katex tex="\tfrac{\pi}{3}\times1" /> rectangle.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
