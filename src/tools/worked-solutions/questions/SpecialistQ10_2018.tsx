// 2018 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Matching a direction field to its differential equation. Question text and diagram
// transcribed from the original paper; the figure is cropped directly from the exam PDF,
// not a redrawing. Solution is original; every option's gradient at the test points and its
// flat/vertical lines confirmed in sympy.
// Widget (extras): spec-2018-mcq10-flat-vertical — pick an option to draw its field, with its
// flat line (numerator zero) and vertical line (denominator zero) compared with the diagram's.
// WrongMethod: the sign-only axis check, which E (12%) passes as well as A.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import fieldSrc from './spec-2018-mcq10-dirfield.png'

const FlatVerticalWidget = lazyWidget(() => import('../interactives/spec-2018-mcq10-flat-vertical'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 7, C: 9, D: 6, E: 12 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{At } (1,0)\text{: field slopes down}" />
        <Katex display tex="\textbf{A}: \tfrac{2}{-2}=-1, \quad \textbf{B}: \tfrac{1}{2}, \quad \textbf{C}: \tfrac{2}{1}=2" />
        <Katex display tex="\textbf{D}: \tfrac{1}{-2}=-\tfrac12, \quad \textbf{E}: \tfrac{2}{-1}=-2" />
        <Katex display tex="\therefore\ \textbf{B}, \textbf{C} \text{ out}" />
      </>
    ),
    reason: (
      <>
        Test points on an axis: one variable is zero, so each option collapses to a single number. Just right
        of <Katex tex="O" /> the marks slope down, so a positive gradient there is out.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{At } (0,1)\text{: field slopes up}" />
        <Katex display tex="\textbf{A}: \tfrac{1}{1}=1, \quad \textbf{D}: \tfrac{-2}{1}=-2, \quad \textbf{E}: \tfrac{1}{2}" />
        <Katex display tex="\therefore\ \textbf{D} \text{ out}" />
      </>
    ),
    reason: (
      <>
        Just above <Katex tex="O" /> the marks slope up. Only the three survivors need checking. <b>A</b> and{' '}
        <b>E</b> both pass, so signs alone can&apos;t finish the job.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Vertical marks along } y=2x \text{, e.g. } (2,4)" />
        <Katex display tex="\textbf{A}: \ y-2x=0 \text{ on } y=2x \ \checkmark" />
        <Katex display tex="\textbf{E}: \ 2y-x=0 \text{ on } y=\tfrac{x}{2} \ \times" />
      </>
    ),
    reason: (
      <>
        Marks stand vertical where the gradient is undefined, i.e. where the denominator is zero. In the diagram
        that is along <Katex tex="y=2x" />, through <Katex tex="(2,4)" /> and <Katex tex="(4,8)" />: <b>A</b>&apos;s
        denominator, not <b>E</b>&apos;s.
      </>
    ),
    more: (
      <>
        <b>E</b>&apos;s denominator <Katex tex="2y-x" /> vanishes on <Katex tex="y=\tfrac{x}{2}" /> instead, through{' '}
        <Katex tex="(4,2)" />, where the diagram&apos;s marks slope down steeply rather than stand up.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{2x+y}{y-2x}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        As a final check, <b>A</b>&apos;s numerator <Katex tex="2x+y" /> is zero on <Katex tex="y=-2x" />, and the
        diagram&apos;s marks are flat through <Katex tex="(-2,4)" /> and <Katex tex="(-4,8)" />. <b>E</b>, chosen
        by <Katex tex="12\%" />, is the trap: it survives both sign tests, and only the vertical line rules it out.
      </>
    ),
  },
]

export default function SpecialistQ10_2018() {
  return (
    <MCQShell
      question={<p>The differential equation that best represents the direction field above is</p>}
      diagram={<img loading="lazy" decoding="async" src={fieldSrc} alt="Direction field for the differential equation, from the original 2018 VCAA exam paper" className="w-full max-w-[300px]" />}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x+y}{y-2x}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{x+2y}{2x-y}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x-y}{x+2y}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{x-2y}{y-2x}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x+y}{2y-x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Test points, then look for the flat and vertical lines">
          <p>
            Matching a direction field is a process of elimination, not of recognition. Pick
            two or three points where the arithmetic is trivial — usually on the axes, where
            one variable is zero — work out what each option predicts there, and discard the
            ones that disagree with the picture.
          </p>
          <p>
            For a gradient written as a fraction <Katex tex="\tfrac{dy}{dx}=\tfrac{N}{D}" />, two features are
            easy to spot. The marks are <b>flat</b> where the numerator <Katex tex="N=0" />, and{' '}
            <b>vertical</b> where the denominator <Katex tex="D=0" /> (the gradient is undefined there).
            Finding the line of vertical marks in the diagram usually identifies the denominator at once.
          </p>
          <p>
            In this question every term in every option has degree 1, so each gradient depends only on the
            ratio <Katex tex="\tfrac{y}{x}" />. That means the marks are identical all the way along any line
            through <Katex tex="O" />, which is why the flat and vertical marks line up along straight lines
            through the origin.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Flat where the top is zero, vertical where the bottom is zero">
            <FlatVerticalWidget />
          </Explore>
          <WrongMethod
            title="The signs on both axes match, so E will do"
            source="12% chose E"
            working={
              <>
                <Katex display tex="\textbf{E} \text{ at } (1,0): \ \tfrac{2}{-1}=-2<0 \ \checkmark" />
                <Katex display tex="\textbf{E} \text{ at } (0,1): \ \tfrac{1}{2}>0 \ \checkmark" />
              </>
            }
          >
            Passing the sign checks doesn&apos;t make <b>E</b> right. The size of the gradient also gives it away: along the positive{' '}
            <Katex tex="x" />-axis the diagram&apos;s marks sit at about <Katex tex="45^\circ" /> (gradient{' '}
            <Katex tex="-1" />), whereas <b>E</b> predicts <Katex tex="-2" />, twice as steep. Pick <b>E</b> in the
            widget above to see its vertical line land on <Katex tex="y=\tfrac{x}{2}" />, away from the
            diagram&apos;s.
          </WrongMethod>
        </>
      }
    />
  )
}
