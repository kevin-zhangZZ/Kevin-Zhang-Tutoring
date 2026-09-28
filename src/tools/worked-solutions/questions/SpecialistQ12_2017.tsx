// 2017 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 49% correct (no comment).
// When a parametric path is a circle rather than an ellipse. Question text transcribed
// from the original paper; answer checked with sympy ((x−1)²/a + b²(y−1)² = 1). itute agrees (A).
// Solution is original.
// Widget: interactives/spec-2017-mcq12-circle — sliders for a and b draw the path with its two
// semi-axes; locking b to option A's condition keeps it a circle for every a, while B's and D's
// conditions give a circle only at a = 1.
// WrongMethod: option B (21%) — undoing the square root by rooting the other side
// (√a = 1/b ⇒ a = 1/√b) lands exactly on a²b = 1. The report gives no reason; this is one
// verified route to B, labelled as such.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CircleWidget = lazyWidget(() => import('../interactives/spec-2017-mcq12-circle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 21, C: 10, D: 11, E: 7 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1-\sqrt a\sin(t), \qquad y = 1-\frac1b\cos(t)" />,
    reason: (
      <>
        To find the shape of a path, get its cartesian equation: eliminate <Katex tex="t" />. When <Katex tex="\sin(t)" /> and{' '}
        <Katex tex="\cos(t)" /> of the same <Katex tex="t" /> appear, the tool for that is{' '}
        <Katex tex="\sin^2(t)+\cos^2(t)=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin(t) = \frac{1-x}{\sqrt a}, \qquad \cos(t) = b(1-y)" />,
    reason: <>Make <Katex tex="\sin(t)" /> and <Katex tex="\cos(t)" /> the subjects, so squaring leaves exactly <Katex tex="\sin^2(t)" /> and <Katex tex="\cos^2(t)" />.</>,
  },
  {
    working: <Katex display tex="\frac{(x-1)^2}{a}+b^2(y-1)^2 = 1" />,
    reason: (
      <>
        Square and add: the left sides add to <Katex tex="\sin^2(t)+\cos^2(t)=1" />. Note <Katex tex="(\sqrt a)^2=a" /> and{' '}
        <Katex tex="(1-x)^2=(x-1)^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{(x-1)^2}{\left(\sqrt a\right)^2}+\frac{(y-1)^2}{\left(\frac1b\right)^2} = 1" />,
    reason: (
      <>
        Written in standard form, this is an ellipse centred at <Katex tex="(1,1)" /> with horizontal semi-axis{' '}
        <Katex tex="\sqrt a" /> and vertical semi-axis <Katex tex="\tfrac1b" />: the two numbers multiplying{' '}
        <Katex tex="\sin(t)" /> and <Katex tex="\cos(t)" /> in the rule.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{circle} \iff \sqrt a = \frac1b" />,
    reason: (
      <>
        A circle is an ellipse stretched by the same amount both ways, so the two semi-axes must be equal (equivalently, the
        coefficients <Katex tex="\tfrac1a" /> and <Katex tex="b^2" /> must be equal). Both are positive since{' '}
        <Katex tex="a,b\in R^+" />, so there are no signs to worry about.
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt a\,b = 1 \implies ab^2 = 1" />,
    reason: (
      <>
        Multiply by <Katex tex="b" />, then square <em>both whole sides</em>: <Katex tex="(\sqrt a\,b)^2=ab^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{ab^2 = 1}" />,
    reason: (
      <>
        Matches option <b>A</b>. &ldquo;Always&rdquo; matters: with <Katex tex="ab^2=1" /> the path is a circle of radius{' '}
        <Katex tex="\sqrt a" /> for every value of <Katex tex="a" /> (e.g. <Katex tex="a=4" />, <Katex tex="b=\tfrac12" /> gives
        radius <Katex tex="2" />), and <Katex tex="t\ge0" /> runs on forever, so the whole circle is traced. Option D,{' '}
        <Katex tex="ab=1" />, is what you get by dropping the square root (<Katex tex="a=\tfrac1b" />); like B, it gives a
        circle only when <Katex tex="a=b=1" />.
      </>
    ),
  },
]

export default function SpecialistQ12_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let{' '}
            <Katex tex="\underset{\sim}{r}(t)=\bigl(1-\sqrt a\sin(t)\bigr)\underset{\sim}{i}+\left(1-\tfrac1b\cos(t)\right)\underset{\sim}{j}" />{' '}
            for <Katex tex="t\ge0" /> and <Katex tex="a,b\in R^+" /> be the path of a
            particle moving in the cartesian plane.
          </p>
          <p>The path of the particle will always be a circle if</p>
        </>
      }
      background={
        <p>
          A path <Katex tex="x=h+p\sin(t)" />, <Katex tex="y=k+q\cos(t)" /> (or with <Katex tex="\sin" /> and{' '}
          <Katex tex="\cos" /> swapped) is the ellipse{' '}
          <Katex tex="\frac{(x-h)^2}{p^2}+\frac{(y-k)^2}{q^2}=1" />: centre <Katex tex="(h,k)" />, stretched{' '}
          <Katex tex="|p|" /> sideways and <Katex tex="|q|" /> up and down. It is a circle exactly when{' '}
          <Katex tex="|p|=|q|" />. The signs, and which of <Katex tex="\sin" /> and <Katex tex="\cos" /> goes with{' '}
          <Katex tex="x" />, only change where the particle starts and which way it goes round, never the shape.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="ab^2=1" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="a^2b=1" /> },
        { letter: 'C', content: <Katex tex="ab^2\ne1" /> },
        { letter: 'D', content: <Katex tex="ab=1" /> },
        { letter: 'E', content: <Katex tex="a^2b\ne1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="A circle needs the sideways and upward stretches to match">
            <CircleWidget />
          </Explore>
          <WrongMethod
            title="To undo the root on a, take the root of the other side"
            source="21% chose B"
            working={<Katex display tex="\sqrt a=\frac1b \implies a=\frac{1}{\sqrt b} \implies a^2b=1" />}
          >
            This is one slip that lands exactly on B. To undo a square root you <em>square</em> both sides:{' '}
            <Katex tex="a=\tfrac{1}{b^2}" />. Taking the root of the right-hand side does the opposite of what is needed. Catch
            it by testing a pair that satisfies your answer: <Katex tex="a^2b=1" /> allows <Katex tex="a=4" />,{' '}
            <Katex tex="b=\tfrac1{16}" />, which gives semi-axes <Katex tex="\sqrt4=2" /> and <Katex tex="\tfrac1b=16" />, a
            long thin ellipse, not a circle.
          </WrongMethod>
        </>
      }
    />
  )
}
