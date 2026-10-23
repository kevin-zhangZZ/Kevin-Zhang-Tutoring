// 2025 Mathematical Methods NHT — Exam 1, Question 5 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = e^{2x}, g(x) = e^x + 2: a. the intersection, a quadratic in e^x with the negative root
// rejected; b. where f and the translated g(x − 1) have equal gradients, 2e^{2x} = e^{x−1}.
// Question text transcribed from the original paper (read from the page images — the 2025 paper
// has no text layer). Answers checked with sympy and against the VCAA report's sample answers
// (log_e(2); log_e(1/(2e)) = −log_e(2e) = −log_e(2) − 1). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>This question required the solution of a quadratic equation involving exponential terms.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved equating the derivatives of the functions <Katex tex="f(x)" /> and <Katex tex="g(x)" />. There
      were multiple ways that the equation could be solved.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=g(x) \implies e^{2x}=e^x+2" />,
    reason: <>The graphs meet where the two rules give the same value.</>,
  },
  {
    working: <Katex display tex="\left(e^x\right)^2-e^x-2=0" />,
    reason: <>
      Index law: <Katex tex="e^{2x}=\left(e^x\right)^2" />. Written this way, the equation is a quadratic in the quantity{' '}
      <Katex tex="e^x" />.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{Let } u=e^x: \\ &u^2-u-2=0 \implies (u-2)(u+1)=0 \end{aligned}" />,
    reason: <>The substitution makes the quadratic visible. Two numbers that multiply to <Katex tex="-2" /> and add to <Katex tex="-1" />: <Katex tex="-2" /> and <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="e^x=2 \quad\text{or}\quad e^x=-1\ \text{(rejected, as } e^x>0\text{)}" />,
    reason: <>Go back to <Katex tex="x" />. An exponential is always positive, so <Katex tex="e^x=-1" /> has no solution. Write the rejection down.</>,
  },
  {
    working: <Katex display tex="\boxed{x=\log_e(2)}" />,
    reason: <>
      Take <Katex tex="\log_e" /> of both sides. Check: <Katex tex="e^{2\log_e(2)}=2^2=4" /> and{' '}
      <Katex tex="e^{\log_e(2)}+2=2+2=4" /> ✓. Only one point of intersection.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x-1)=e^{x-1}+2" />,
    reason: <>Replace every <Katex tex="x" /> in <Katex tex="g" /> by <Katex tex="x-1" />: the graph of <Katex tex="g" /> translated 1 unit to the right.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}e^{2x}=2e^{2x},\qquad \frac{d}{dx}\left(e^{x-1}+2\right)=e^{x-1}" />,
    reason: <>Chain rule on each exponential: <Katex tex="\tfrac{d}{dx}e^{ax+b}=ae^{ax+b}" />. The constant 2 differentiates to 0.</>,
  },
  {
    working: <Katex display tex="2e^{2x}=e^{x-1}" />,
    reason: <>&ldquo;Equal gradients&rdquo; means equal derivatives at the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="2e^{2x}=\frac{e^x}{e} \implies 2e^x=\frac1e" />,
    reason: <><Katex tex="e^{x-1}=e^x\cdot e^{-1}" />. Divide both sides by <Katex tex="e^x" />, which is safe because <Katex tex="e^x>0" /> is never zero; <Katex tex="e^{2x}\div e^x=e^x" />.</>,
  },
  {
    working: <Katex display tex="e^x=\frac{1}{2e} \implies x=\log_e\!\left(\frac{1}{2e}\right)" />,
    reason: <>Divide by 2 and take <Katex tex="\log_e" /> of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-\log_e(2)-1}" />,
    reason: <>
      Log laws: <Katex tex="\log_e\left(\tfrac{1}{2e}\right)=-\log_e(2e)=-\left(\log_e(2)+\log_e(e)\right)" />, and{' '}
      <Katex tex="\log_e(e)=1" />. VCAA accepts <Katex tex="\log_e\left(\tfrac{1}{2e}\right)" />, <Katex tex="-\log_e(2e)" /> or any
      other equivalent form.
    </>,
    more: <>
      About <Katex tex="-1.69" />. Check: at this <Katex tex="x" />, <Katex tex="e^x=\tfrac{1}{2e}" />, so{' '}
      <Katex tex="2e^{2x}=2\cdot\tfrac{1}{4e^2}=\tfrac{1}{2e^2}" /> and <Katex tex="e^{x-1}=\tfrac{1}{2e}\cdot\tfrac1e=\tfrac{1}{2e^2}" /> ✓.
      Another route the report shows: take <Katex tex="\log_e" /> of both sides of <Katex tex="2e^{2x}=e^{x-1}" /> straight away,{' '}
      <Katex tex="\log_e(2)+2x=x-1" />, which gives the boxed form in one line.
    </>,
  },
]

export default function MethodsQ5_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=e^{2x}" /> and <Katex tex="g:R\to R,\ g(x)=e^x+2" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Exponential Equation"
        marks={2}
        statement={
          <>
            Find the <Katex tex="x" />-value of the point of intersection of the graphs of <Katex tex="y=f(x)" /> and{' '}
            <Katex tex="y=g(x)" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            An equation containing both <Katex tex="e^{2x}" /> and <Katex tex="e^x" /> can&apos;t be solved by taking logs
            straight away (<Katex tex="\log_e\left(e^x+2\right)" /> doesn&apos;t simplify). Spot that <Katex tex="e^{2x}" /> is the
            square of <Katex tex="e^x" />, and solve a quadratic in <Katex tex="e^x" /> first.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Equal Gradients"
        marks={2}
        statement={
          <>
            Find the <Katex tex="x" />-value where the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=g(x-1)" /> have equal
            gradients.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use g(x) instead of g(x − 1)"
          working={<Katex display tex="\begin{aligned} 2e^{2x}&=e^x \\ \implies e^x&=\frac12 \\ \implies x&=-\log_e(2) \end{aligned}" />}
        >
          This compares <Katex tex="f'(x)" /> with <Katex tex="g'(x)" />, the gradients of the unshifted graph. Nor can it be
          fixed by adding 1: translating <Katex tex="g" /> right leaves <Katex tex="f" /> where it is, and here the matching point
          actually moves 1 to the <em>left</em>, to <Katex tex="-\log_e(2)-1" />. Form <Katex tex="g(x-1)" /> first, then
          differentiate it.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
