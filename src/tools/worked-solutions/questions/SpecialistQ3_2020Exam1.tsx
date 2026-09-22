// 2020 Specialist Mathematics — Exam 1 Question 3 (3 marks). Cube roots of a complex number
// on the unit circle, by de Moivre. Question text transcribed from the original paper.
// Answer checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 30, 10, 37],
  average: 1.6,
  comment: (
    <>
      Students should be able to express{' '}
      <Katex tex="z=\tfrac{1}{\sqrt2}-\tfrac{1}{\sqrt2}i" /> in polar form{' '}
      <Katex tex="\operatorname{cis}\!\left(-\tfrac\pi4\right)" /> by recognition (possibly
      with the aid of a small diagram). Some students had difficulty with this first step and
      gave an incorrect argument or modulus. Some students neglected to give the arguments
      for their final answers using principal values as required by the question. Some
      students found the cube of <Katex tex="z" /> rather than the cube roots.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = \sqrt{\left(\tfrac{1}{\sqrt2}\right)^2+\left(-\tfrac{1}{\sqrt2}\right)^2} = \sqrt{\tfrac12+\tfrac12} = 1" />,
    reason: <>On the unit circle, so the cube roots are too — only the argument has to be divided.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(z) = -\tfrac\pi4" />,
    reason: <>Equal real and imaginary parts with the imaginary part negative puts <Katex tex="z" /> halfway into the fourth quadrant. A quick sketch settles it faster than <Katex tex="\tan^{-1}" />.</>,
  },
  {
    working: <Katex display tex="z = \operatorname{cis}\!\left(-\tfrac\pi4\right) = \operatorname{cis}\!\left(-\tfrac\pi4+2k\pi\right), \ k\in Z" />,
    reason: <>Adding full turns changes nothing about <Katex tex="z" /> but is what produces three <em>different</em> cube roots.</>,
  },
  {
    working: <Katex display tex="z^{1/3} = \operatorname{cis}\!\left(\frac{-\tfrac\pi4+2k\pi}{3}\right) = \operatorname{cis}\!\left(-\tfrac{\pi}{12}+\tfrac{2k\pi}{3}\right)" />,
    reason: <>De Moivre with index <Katex tex="\tfrac13" />. The modulus stays 1.</>,
  },
  {
    working: <Katex display tex="k=0: \ \operatorname{cis}\!\left(-\tfrac{\pi}{12}\right)" />,
    reason: <>Already a principal value.</>,
  },
  {
    working: <Katex display tex="k=1: \ \operatorname{cis}\!\left(-\tfrac{\pi}{12}+\tfrac{2\pi}{3}\right) = \operatorname{cis}\!\left(\tfrac{7\pi}{12}\right)" />,
    reason: <><Katex tex="-\tfrac{\pi}{12}+\tfrac{8\pi}{12}=\tfrac{7\pi}{12}" />, inside <Katex tex="(-\pi,\pi]" /> ✓.</>,
  },
  {
    working: <Katex display tex="k=-1: \ \operatorname{cis}\!\left(-\tfrac{\pi}{12}-\tfrac{2\pi}{3}\right) = \operatorname{cis}\!\left(-\tfrac{3\pi}{4}\right)" />,
    reason: <>Taking <Katex tex="k=-1" /> rather than <Katex tex="k=2" /> lands the third root in the principal range directly — <Katex tex="k=2" /> would give <Katex tex="\tfrac{5\pi}{4}" />, which then needs <Katex tex="2\pi" /> subtracted.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{cis}\!\left(-\tfrac{3\pi}{4}\right), \ \operatorname{cis}\!\left(-\tfrac{\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{7\pi}{12}\right)}" />,
    reason: <>Three roots, all of modulus 1, spaced <Katex tex="\tfrac{2\pi}{3}" /> apart around the unit circle — a useful final check.</>,
  },
]

export default function SpecialistQ3_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p>
          Find the cube roots of{' '}
          <Katex tex="\dfrac{1}{\sqrt2}-\dfrac{1}{\sqrt2}i" />. Express your answers in polar
          form using principal values of the argument.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            "Principal values" means every argument you write down must lie in{' '}
            <Katex tex="(-\pi,\pi]" />. That is not a formatting detail — the report says
            students lost marks for leaving an argument outside the range, so choose the{' '}
            <Katex tex="k" /> values that land there rather than taking{' '}
            <Katex tex="k=0,1,2" /> mechanically.
          </p>
          <p>
            The modulus here is 1, which removes the usual cube-root-of-the-modulus step.
            Spotting that early turns a three-mark question into a one-line application of de
            Moivre.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
