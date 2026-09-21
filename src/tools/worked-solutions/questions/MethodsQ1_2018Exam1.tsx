// 2018 Mathematical Methods — Exam 1, Question 1 (3 marks). A chain-rule derivative, then a
// quotient-rule derivative evaluated at x = π. Question text transcribed from the original
// paper (no diagram given). Answers checked independently with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Students generally recognised the need to deploy the chain rule; however, a significant
      number of students could not be awarded the mark. Poor use of brackets (or lack of
      brackets) resulted in an incorrect expression. For example, the expression{' '}
      <Katex tex="3\left(-3x^3+x^2-64\right)^2\,9x^2-2x" /> is not equivalent to{' '}
      <Katex tex="3\left(-3x^3+x^2-64\right)^2\left(-9x^2+2x\right)" />. Transcription errors
      (especially with exponents) and arithmetic errors with unnecessary expansions were also
      observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [10, 39, 51],
  average: 1.4,
  comment: (
    <>
      Students competently applied the quotient rule; however, many were unable to carry out
      the required evaluation, often omitting it completely. Students who opted to use the
      product and chain rules tended to make little progress due to confusion with negative
      signs or negative exponents. Students should take care with legibility, for example, to
      distinguish clearly the variable <Katex tex="x" /> and the multiplication sign.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \left(-3x^3+x^2-64\right)^3" />,
    reason: <>A power of a function — chain rule. Take the <em>outside</em> as "something cubed" and the <em>inside</em> as <Katex tex="-3x^3+x^2-64" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 3\left(-3x^3+x^2-64\right)^2 \times \frac{d}{dx}\left(-3x^3+x^2-64\right)" />,
    reason: <>Derivative of the outside (leaving the inside alone) times the derivative of the inside.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 3\left(-3x^3+x^2-64\right)^2\left(-9x^2+2x\right)}" />,
    reason: <>Leave it factorised — expanding is not asked for and, as the report notes, is where the arithmetic errors crept in. The brackets around <Katex tex="-9x^2+2x" /> are not optional: without them the expression means something else entirely, and that alone cost the mark for many students.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{e^x}{\cos(x)}" />,
    reason: <>A quotient, so use the quotient rule with <Katex tex="u=e^x" /> and <Katex tex="v=\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{u'v-uv'}{v^2} = \frac{e^x\cos(x)-e^x\bigl(-\sin(x)\bigr)}{\cos^2(x)}" />,
    reason: <>The derivative of <Katex tex="\cos(x)" /> is <Katex tex="-\sin(x)" />, and subtracting it flips the sign — this double negative is the step most often mishandled.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{e^x\bigl(\cos(x)+\sin(x)\bigr)}{\cos^2(x)}" />,
    reason: <>Factorising out <Katex tex="e^x" /> tidies the substitution that follows.</>,
  },
  {
    working: <Katex display tex="f'(\pi) = \frac{e^{\pi}\bigl(\cos(\pi)+\sin(\pi)\bigr)}{\cos^2(\pi)} = \frac{e^{\pi}(-1+0)}{(-1)^2}" />,
    reason: <>Substituting the exact values <Katex tex="\cos(\pi)=-1" /> and <Katex tex="\sin(\pi)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(\pi) = -e^{\pi}}" />,
    reason: <>The question says <em>evaluate</em>, so stopping at the derivative scores nothing — the report notes this omission was common. (<Katex tex="-e^{\pi}\approx-23.1" />: strongly negative, which fits a curve whose denominator is near its most negative value at <Katex tex="x=\pi" />.)</>,
  },
]

export default function MethodsQ1_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>If <Katex tex="y=\left(-3x^3+x^2-64\right)^3" />, find <Katex tex="\dfrac{dy}{dx}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Let <Katex tex="f(x)=\dfrac{e^x}{\cos(x)}" />. Evaluate <Katex tex="f'(\pi)" />.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Two marks for one derivative and one substitution tells you where they are: one for
            the rule, one for the evaluation. The report singles out students who produced a
            correct <Katex tex="f'(x)" /> and then stopped — on an "evaluate" instruction that
            is half the question thrown away.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
