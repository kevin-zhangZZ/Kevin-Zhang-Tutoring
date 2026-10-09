// 2023 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 28% correct. Volume of
// a cylinder rolled from a rectangular sheet with two circular end-caps cut from it. Question
// text transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Solution is original.
// Checked in sympy: r = y/(2π), h = x − 4r = x − 2y/π, V = πr²h = (πxy² − 2y³)/(4π²) (B), agreeing
// with the report. C = −B, D = πrh (r not squared), E = −D.
// No interactive: the wrong options are sign-flipped (C, E) or have r unsquared (D, E), which a
// positivity and units check in the working catches better than a manipulable picture.
// Oct 2026 Concise/Detailed pass: skip re-confirmed (C = πr²(4r − x), A = πr²h with r = x, h = y,
// checked in sympy). Rolling picture added to row 2's `more`; option analysis moved to the last row's `more`.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2023-mcq17-cylinder-sheet.png'

const DIAGRAM = <img loading="lazy" decoding="async" src={diagramSrc} alt="Rectangular metal sheet of length x and width y, with two circular end-caps of radius r cut out, leaving a middle strip of width h, from the original 2023 VCAA exam paper" className="w-full max-w-[320px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 28, C: 26, D: 26, E: 13 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The base of the cylinder has a circumference of <Katex tex="2\pi r" /> units.
      <br />
      <Katex tex="y=2\pi r" />, <Katex tex="r=\tfrac{y}{2\pi}" />
      <br />
      <Katex tex="h=x-4r" />, <Katex tex="h=x-\tfrac{2y}{\pi}" />
      <br />
      The formula for volume of the cylinder is <Katex tex="V=\pi r^2h" />
      <br />
      <Katex tex="V=\pi\left(\tfrac{y}{2\pi}\right)^2\left(x-\tfrac{2y}{\pi}\right)=\tfrac{\pi xy^2-2y^3}{4\pi^2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>Picture the build: the shaded middle strip (<Katex tex="h" /> wide, <Katex tex="y" /> tall) rolls up into the cylinder&apos;s curved side, and the two circles of radius <Katex tex="r" /> become its top and bottom.</>,
  },
  {
    working: <Katex display tex="y = 2\pi r \;\implies\; r = \frac{y}{2\pi}" />,
    reason: <>The cylinder&apos;s height is <Katex tex="h" />, the strip&apos;s width, so it is the strip&apos;s other side, of length <Katex tex="y" />, that wraps round into each circular end. Each lid of radius <Katex tex="r" /> must fit one of those circles exactly, so <Katex tex="y" /> equals the lid&apos;s circumference, <Katex tex="2\pi r" />.</>,
    more: (
      <>
        Step by step: bend the shaded strip until its top and bottom edges (each <Katex tex="h" /> long) meet in
        a seam. That makes a tube <Katex tex="h" /> long, and its two open ends are the strip&apos;s dashed sides, each{' '}
        <Katex tex="y" /> long, now bent into circles. The two cut-out discs cap those ends. So the circumference comes
        from <Katex tex="y" />, not <Katex tex="x" />: <Katex tex="x" /> is the length of the whole sheet, end pieces
        included.
      </>
    ),
  },
  {
    working: <Katex display tex="x = 2r + h + 2r \;\implies\; h = x - 4r" />,
    reason: <>Along the sheet&apos;s length <Katex tex="x" />: end piece, strip, end piece. Each circle fits exactly across its end piece (it touches the sheet&apos;s edge and the dashed line), so each end piece is one diameter, <Katex tex="2r" />, wide.</>,
  },
  {
    working: <Katex display tex="h = x - 4\cdot\frac{y}{2\pi} = x - \frac{2y}{\pi}" />,
    reason: <>Substitute <Katex tex="r=\tfrac{y}{2\pi}" />, since the answer must be in terms of <Katex tex="x" /> and <Katex tex="y" /> only.</>,
  },
  {
    working: <Katex display tex="V = \pi r^2 h = \pi\left(\frac{y}{2\pi}\right)^2\left(x-\frac{2y}{\pi}\right)" />,
    reason: <>Volume of a cylinder: area of the circular base, <Katex tex="\pi r^2" />, times the height <Katex tex="h" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="= \pi\cdot\frac{y^2}{4\pi^2}\left(x - \frac{2y}{\pi}\right) = \frac{y^2}{4\pi}\left(x - \frac{2y}{\pi}\right)" />
        <Katex display tex="= \frac{xy^2}{4\pi} - \frac{2y^3}{4\pi^2}" />
      </>
    ),
    reason: <>Square the bracket (square both the top and the bottom), cancel one <Katex tex="\pi" />, then expand.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\pi xy^2 - 2y^3}{4\pi^2}}" />,
    reason: <>Matches option <b>B</b>, after writing <Katex tex="\tfrac{xy^2}{4\pi}=\tfrac{\pi xy^2}{4\pi^2}" /> over the common denominator.</>,
    more: (
      <>
        Two quick checks rule out the other options without redoing the algebra. <b>Sign:</b> a real cylinder needs{' '}
        <Katex tex="h=x-\tfrac{2y}{\pi}>0" />, so the volume is positive. B is positive; C is exactly{' '}
        <Katex tex="-B" />, which is what writing the height as <Katex tex="4r-x" /> instead of{' '}
        <Katex tex="x-4r" /> gives, so C is negative. <b>Dimensions:</b> a volume is length &times; length &times;
        length. D and E have only two lengths multiplied on top (<Katex tex="xy" />, <Katex tex="y^2" />), so they are
        areas: D is <Katex tex="\pi r h" />, what you get if you forget to square <Katex tex="r" /> in{' '}
        <Katex tex="\pi r^2h" />, and E is <Katex tex="-D" />. Option A, <Katex tex="\pi x^2y" />, is{' '}
        <Katex tex="\pi r^2h" /> with the sheet&apos;s length used as the radius and its width as the height.
      </>
    ),
  },
]

export default function MethodsQ17_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A cylinder of height <Katex tex="h" /> and radius <Katex tex="r" /> is formed from a thin rectangular
            sheet of metal of length <Katex tex="x" /> and width <Katex tex="y" />, by cutting along the dashed
            lines shown below.
          </p>
          <p>The volume of the cylinder, in terms of <Katex tex="x" /> and <Katex tex="y" />, is given by</p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\pi x^2 y" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi xy^2-2y^3}{4\pi^2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{2y^3-\pi xy^2}{4\pi^2}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi xy-2y^2}{2\pi}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{2y^2-\pi xy}{2\pi}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
