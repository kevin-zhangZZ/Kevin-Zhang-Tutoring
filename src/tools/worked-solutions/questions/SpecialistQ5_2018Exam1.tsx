// 2018 Specialist Mathematics — Exam 1, Question 5 (4 marks). Sketch f(x) = (x+1)/(x²−4).
// Question text transcribed from the original paper. VCAA supplied only blank axes, so the
// finished curve is this site's own answer-sketch (matplotlib), drawn to VCAA's exact
// printed range (−4 to 4 on both axes, labels every 2) and living in the solution rather
// than the stem (guide §7). Features checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2018exam1-q5-sketch.png'

const EXAM: SAExaminerStats = {
  marks: [9, 21, 35, 20, 15],
  average: 2.1,
  comment: (
    <>
      Most students realised that <Katex tex="x=-2" /> and <Katex tex="x=2" /> were vertical
      asymptotes, although the horizontal asymptote <Katex tex="y=0" /> was often not stated.
      Students who found the axis intercepts were not always able to position them correctly
      on the axes. Some students showed a stationary point of inflection on their graph or
      were missing the outer branches.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x+1}{x^2-4} = \frac{x+1}{(x-2)(x+2)}" />,
    reason: <>Factorising the denominator exposes both vertical asymptotes at once.</>,
  },
  {
    working: <Katex display tex="x^2-4=0 \implies \boxed{x=-2} \ \text{ and } \ \boxed{x=2} \ \text{ (vertical asymptotes)}" />,
    reason: <>The numerator is non-zero at both (<Katex tex="-1" /> and <Katex tex="3" />), so these are genuine asymptotes rather than holes.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to\pm\infty}\frac{x+1}{x^2-4} = 0 \implies \boxed{y=0} \ \text{ (horizontal asymptote)}" />,
    reason: <>The denominator is one degree higher than the numerator, so the fraction is squeezed to zero at both ends. The report says this asymptote was <em>often not stated</em> — the question asks for all of them, labelled with their equations.</>,
  },
  {
    working: <Katex display tex="f(x)=0 \implies x+1=0 \implies \boxed{(-1,\ 0)}" />,
    reason: <>A fraction is zero exactly when its numerator is.</>,
  },
  {
    working: <Katex display tex="f(0) = \frac{1}{-4} = -\frac14 \implies \boxed{\left(0,\ -\frac14\right)}" />,
    reason: <>The vertical intercept. Both intercepts sit between the two vertical asymptotes, which pins the shape of the middle branch.</>,
  },
  {
    working: <Katex display tex="\text{Sign: } f>0 \text{ on } (-2,-1) \cup (2,\infty); \quad f<0 \text{ on } (-\infty,-2)\cup(-1,2)" />,
    reason: <>Checking the sign in each of the four regions tells you which way every branch runs into its asymptote, without any calculus.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={sketchSrc} alt="Graph of f(x) = (x+1)/(x²−4): three branches, with vertical asymptotes at x = ±2 and horizontal asymptote y = 0, crossing the axes at (−1, 0) and (0, −1/4)" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>Three branches, and all three must appear — the report notes graphs missing the outer ones. The middle branch falls from <Katex tex="+\infty" /> just right of <Katex tex="x=-2" />, through <Katex tex="(-1,0)" /> and <Katex tex="\left(0,-\tfrac14\right)" />, down to <Katex tex="-\infty" /> as <Katex tex="x\to2^-" />; it is strictly decreasing, so there is no stationary point of inflection to draw.</>,
  },
]

export default function SpecialistQ5_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          Sketch the graph of <Katex tex="f(x)=\dfrac{x+1}{x^2-4}" /> on the axes provided,
          labelling any asymptotes with their equations and any intercepts with their
          coordinates.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Four marks for a sketch means four identifiable features, and the question names
            them: every asymptote with its equation, and every intercept with its
            coordinates. Work through them systematically — two vertical asymptotes, one
            horizontal, two intercepts — rather than trying to draw first and annotate after.
          </p>
          <p>
            No calculus is needed. A sign test in each of the four regions the asymptotes cut
            the axis into tells you whether each branch goes up or down at each end, which is
            enough to draw it correctly.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
