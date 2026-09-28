// 2019 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 38% correct.
// Combining two given definite integrals to evaluate a third. Question text transcribed from
// the original paper. Solution is original; answer E agrees with the report and itute.
// Interactive: meth-2019-mcq12-areas (the given integrals as signed areas in three steps, with a
// "reshape f" slider that changes f but none of the areas). WrongMethods: options B and A/D.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AreasWidget = lazyWidget(() => import('../interactives/meth-2019-mcq12-areas'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 26, C: 13, D: 13, E: 38 },
  answer: 'E',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\displaystyle\int_1^4 f(x)\,dx=4,\ \int_2^4 f(x)\,dx=-2" />
      <br />
      <Katex tex="\displaystyle\int_1^2\bigl(f(x)+x\bigr)dx=\int_1^2 f(x)\,dx+\int_1^2 (x)\,dx" />
      <br />
      <Katex tex="\displaystyle=\int_1^2 f(x)\,dx+\left[\frac{x^2}{2}\right]_1^2=\int_1^2 f(x)\,dx+\frac32" />
      <br />
      <Katex tex="\displaystyle\int_1^4 f(x)\,dx=\int_1^2 f(x)\,dx+\int_2^4 f(x)\,dx" />
      <br />
      <Katex tex="\displaystyle=\int_1^2 f(x)\,dx-2=6-2=4" />
      <br />
      <Katex tex="\displaystyle\int_1^2 f(x)\,dx+\frac32=6+\frac32=\frac{15}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^4 f(x)\,dx = 4 \qquad \int_2^4 f(x)\,dx = -2" />,
    reason: <>Given information. We know nothing about <Katex tex="f" /> itself, only these two signed areas, so the answer has to be built from them.</>,
  },
  {
    working: <Katex display tex="\int_1^4 f(x)\,dx = \int_1^2 f(x)\,dx + \int_2^4 f(x)\,dx" />,
    reason: <>How would I know to split here? The integral we need runs over <Katex tex="[1,2]" />, and the two given ones share the end point <Katex tex="4" />: <Katex tex="[1,2]" /> is what is left of <Katex tex="[1,4]" /> once <Katex tex="[2,4]" /> is taken away. The whole is the sum of its pieces.</>,
  },
  {
    working: (
      <>
        <Katex display tex="4 = \int_1^2 f(x)\,dx + (-2)" />
        <Katex display tex="\int_1^2 f(x)\,dx = 6" />
      </>
    ),
    reason: <>Substitute the given values and solve. Sense check: the <Katex tex="[2,4]" /> piece is negative, so it cancels part of the <Katex tex="[1,2]" /> piece. For the total to still be <Katex tex="4" />, the <Katex tex="[1,2]" /> piece must be <em>more</em> than <Katex tex="4" />, not <Katex tex="4+(-2)=2" />.</>,
  },
  {
    working: <Katex display tex="\int_1^2 \big(f(x)+x\big)\,dx = \int_1^2 f(x)\,dx + \int_1^2 x\,dx" />,
    reason: <>The integral of a sum is the sum of the integrals. We know <Katex tex="\int_1^2 f(x)\,dx" /> but cannot integrate <Katex tex="f" /> itself, so separate it from the <Katex tex="x" /> term, which we can integrate directly.</>,
  },
  {
    working: <Katex display tex="\int_1^2 x\,dx = \left[\frac{x^2}{2}\right]_1^2 = 2-\tfrac12 = \tfrac32" />,
    reason: <>An antiderivative of <Katex tex="x" /> is <Katex tex="\tfrac{x^2}{2}" />. As a picture, this is the trapezium under <Katex tex="y=x" /> from <Katex tex="1" /> to <Katex tex="2" />: parallel sides <Katex tex="1" /> and <Katex tex="2" />, width <Katex tex="1" />, area <Katex tex="\tfrac{1+2}{2}\times1=\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\boxed{6+\tfrac32 = \tfrac{15}{2}}" />,
    reason: <>Matches option <b>E</b>. Option <b>B</b> (<Katex tex="6" />), chosen by <Katex tex="26\%" />, is <Katex tex="\int_1^2 f(x)\,dx" /> alone, with the <Katex tex="+x" /> left out. Options <b>A</b> (<Katex tex="2" />) and <b>D</b> <Katex tex="\left(\tfrac72\right)" /> use <Katex tex="4+(-2)=2" /> for <Katex tex="\int_1^2 f(x)\,dx" />, adding the given integrals instead of subtracting: A then also leaves out the <Katex tex="+x" />, while D adds the <Katex tex="\tfrac32" />.</>,
  },
]

export default function MethodsQ12_2019() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^4 f(x)\,dx = 4" /> and <Katex tex="\displaystyle\int_2^4 f(x)\,dx = -2" />,
          then <Katex tex="\displaystyle\int_1^2 \big(f(x)+x\big)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="6" /> },
        { letter: 'C', content: <Katex tex="8" /> },
        { letter: 'D', content: <Katex tex="\tfrac72" /> },
        { letter: 'E', content: <Katex tex="\tfrac{15}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Signed areas: why the piece from 1 to 2 is 6, and what the + x adds">
            <AreasWidget />
          </Explore>
          <WrongMethod
            title="Once I have ∫₁² f(x) dx, that's the answer"
            source="26% chose B"
            working={<Katex display tex="\int_1^2\big(f(x)+x\big)\,dx = \int_1^2 f(x)\,dx = 6" />}
          >
            <p>
              The <Katex tex="x" /> is part of the integrand, so it has an area of its own. At every point the graph of{' '}
              <Katex tex="y=f(x)+x" /> sits <Katex tex="x" /> units above <Katex tex="y=f(x)" />, and that extra band has the
              area of the trapezium under <Katex tex="y=x" />, <Katex tex="\tfrac32" />. To catch it, look back at the integral
              you were asked for and check every term of the integrand has been dealt with.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Add the two given integrals to get the one from 1 to 2"
            source="10% chose A, 13% chose D"
            working={
              <>
                <Katex display tex="\int_1^2 f(x)\,dx = 4+(-2) = 2" />
                <Katex display tex="\text{with the } x\text{: } 2+\tfrac32=\tfrac72 \ \text{(D)}" />
                <Katex display tex="\text{without it: } 2 \ \text{(A)}" />
              </>
            }
          >
            <p>
              <Katex tex="\int_1^4" /> is the whole, not a piece. Adding <Katex tex="\int_2^4" /> to it counts the stretch from{' '}
              <Katex tex="2" /> to <Katex tex="4" /> twice instead of removing it. Write the whole as the sum of its pieces
              first, <Katex tex="\int_1^4=\int_1^2+\int_2^4" />, then substitute: the unknown piece is found by subtracting.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
