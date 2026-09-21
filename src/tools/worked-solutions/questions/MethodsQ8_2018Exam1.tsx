// 2018 Mathematical Methods — Exam 1, Question 8 (7 marks). A show-that derivative, the value
// of k giving a single intersection of f and f′, then a bounded area that is engineered to
// collapse back onto part (a). Question text transcribed from the original paper; the figure
// is cropped directly from the original VCAA exam PDF, not a redrawing. Answers checked
// independently with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import regionSrc from './meth-2018exam1-q8-region.png'

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: <>This 'show that' question was answered well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [89, 8, 3],
  average: 0.2,
  comment: (
    <>
      Many students found this question challenging. Most students found the correct quadratic
      equation to solve but solved for <Katex tex="k" />, rather than the <Katex tex="x" />{' '}
      value that satisfied the quadratic equation. Few students realised that{' '}
      <Katex tex="x=0" /> was the unique solution. Incorrect use of the null factor law and/or
      the incorrect discriminant of the quadratic were the main sources of error.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      This question was attempted well, although students commonly left out the{' '}
      <Katex tex="dx" />, or found the sum of the two areas rather than the difference of the
      two functions.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [43, 41, 3, 13],
  average: 0.9,
  comment: (
    <>
      While students could equate their answer to part c. to <Katex tex="\tfrac{16}{k}" />,
      many students did not use their result from part a. Incorrect algebraic manipulation
      made progress difficult for some students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2e^{kx}" />,
    reason: <>A product of <Katex tex="x^2" /> and <Katex tex="e^{kx}" />, so use the product rule.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x\,e^{kx} + x^2\left(k\,e^{kx}\right)" />,
    reason: <>The derivative of <Katex tex="e^{kx}" /> is <Katex tex="k\,e^{kx}" /> — the <Katex tex="k" /> comes out by the chain rule.</>,
  },
  {
    working: <Katex display tex="= x\,e^{kx}\left(2 + kx\right)" />,
    reason: <>Factor out the common <Katex tex="x\,e^{kx}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = x\,e^{kx}(kx+2)} \quad \checkmark" />,
    reason: <>Matches the required form. On a "show that" the full factorising must be written down — you cannot leave the reader to do the last step.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = f'(x) \implies x^2e^{kx} = x\,e^{kx}(kx+2)" />,
    reason: <>The graphs intersect where the two rules agree.</>,
  },
  {
    working: <Katex display tex="x^2 = x(kx+2) \quad \left(e^{kx}>0 \text{ always}\right)" />,
    reason: <>An exponential is never zero, so it can be divided out safely — no solutions are lost or gained.</>,
  },
  {
    working: <Katex display tex="x^2 - kx^2 - 2x = 0 \implies x\bigl((1-k)x - 2\bigr) = 0" />,
    reason: <>Collecting and factorising. Note the unknown being solved for is <Katex tex="x" />, not <Katex tex="k" /> — the report says most students solved for the wrong letter here.</>,
  },
  {
    working: <Katex display tex="x = 0 \quad \text{or} \quad x = \frac{2}{1-k}" />,
    reason: <>Null factor law. There are normally <em>two</em> intersection points, so "exactly one" must mean the second root disappears.</>,
  },
  {
    working: <Katex display tex="\frac{2}{1-k} \text{ has no solution when } 1-k=0" />,
    reason: <>The second root can never equal <Katex tex="0" /> (the numerator is <Katex tex="2" />), so the only way to lose it is for it to stop existing. That happens exactly when the coefficient of <Katex tex="x^2" /> vanishes and the quadratic degenerates into the linear equation <Katex tex="-2x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 1}" />,
    reason: <>Then <Katex tex="x=0" /> is the only intersection, which is what the question wants — and <Katex tex="k=1" /> is a positive real constant as required. The report notes that few students spotted that <Katex tex="x=0" /> was the unique solution; only <Katex tex="3\%" /> scored both marks.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={regionSrc} alt="VCAA's figure: the curve f above the x-axis and g below it, both starting at the origin and diverging, with the region between them shaded from x = 0 to the vertical line x = 2" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>Read the boundaries off the figure: <Katex tex="f" /> is the upper curve, <Katex tex="g" /> the lower one, and the region runs from where they meet at <Katex tex="x=0" /> across to the line <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="A = \int_0^2 \bigl(f(x)-g(x)\bigr)\,dx" />,
    reason: <>Area between two curves is always <Katex tex="\int(\text{upper}-\text{lower})" />. The report flags students who added two separate areas instead — that double-counts nothing and mis-handles the part of <Katex tex="g" /> below the axis, where the "area" and the integral differ in sign.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \int_0^2 \left(x^2e^{kx} + \frac{2x\,e^{kx}}{k}\right)dx}" />,
    reason: <>Substituting the two rules: subtracting <Katex tex="g(x)=-\tfrac{2x e^{kx}}{k}" /> flips its sign to a plus. Keep the <Katex tex="dx" /> — the report names its omission explicitly.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = x\,e^{kx}(kx+2) = kx^2e^{kx} + 2x\,e^{kx}" />,
    reason: <>Expanding part (a)'s answer. This is the connection the question is pointing at with "using your result from part a."</>,
  },
  {
    working: <Katex display tex="\frac{1}{k}f'(x) = x^2e^{kx} + \frac{2x\,e^{kx}}{k} = f(x)-g(x)" />,
    reason: <>Dividing by <Katex tex="k" /> reproduces the integrand from part (c) <em>exactly</em>. The whole question is built around this: the awkward integral is really just <Katex tex="\tfrac1k f'" />, and the antiderivative of <Katex tex="f'" /> is <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="A = \frac{1}{k}\int_0^2 f'(x)\,dx = \frac{1}{k}\Bigl[f(x)\Bigr]_0^2" />,
    reason: <>No integration by parts needed. Without this step the integral is not doable by hand, which is why the report stresses that students who ignored part (a) struggled.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{k}\left(4e^{2k} - 0\right) = \frac{4e^{2k}}{k}" />,
    reason: <><Katex tex="f(2)=4e^{2k}" /> and <Katex tex="f(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\frac{4e^{2k}}{k} = \frac{16}{k} \implies 4e^{2k} = 16" />,
    reason: <>Multiplying both sides by <Katex tex="k" />, which is legitimate because <Katex tex="k" /> is a positive constant and so never zero. The <Katex tex="k" /> in the denominator cancels on both sides — the reason the answer comes out clean.</>,
  },
  {
    working: <Katex display tex="e^{2k} = 4 \implies 2k = \log_e(4)" />,
    reason: <>Taking the natural logarithm of both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{\log_e(4)}{2} = \log_e(2)}" />,
    reason: <><Katex tex="\log_e(4)=\log_e\left(2^2\right)=2\log_e(2)" />, so the <Katex tex="2" />s cancel. Positive, as the question requires. (<Katex tex="\log_e(2)\approx0.693" />.)</>,
  },
]

export default function MethodsQ8_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (7 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=x^2e^{kx}" />, where{' '}
          <Katex tex="k" /> is a positive real constant.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Show that <Katex tex="f'(x)=x\,e^{kx}(kx+2)" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find the value of <Katex tex="k" /> for which the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=f'(x)" /> have exactly one point of intersection.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Only <Katex tex="3\%" /> of the state scored both marks, and the report says why:
            the equation has two unknowns in it, and it is easy to solve for the wrong one.
            Set <Katex tex="f=f'" />, and what you get is a quadratic <em>in{' '}
            <Katex tex="x" /></em> whose coefficients involve <Katex tex="k" />. Solve for{' '}
            <Katex tex="x" />, then ask what <Katex tex="k" /> has to be for only one root to
            survive.
          </p>
          <p>
            The usual "one solution" trick — set the discriminant to zero — is a trap here.
            That would make the two roots <em>equal</em>, but one root is pinned at{' '}
            <Katex tex="x=0" /> and the other can never reach it. The single root arrives the
            other way: the quadratic stops being a quadratic.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g(x)=-\dfrac{2x\,e^{kx}}{k}" />. The diagram below shows sections of
          the graphs of <Katex tex="f" /> and <Katex tex="g" /> for <Katex tex="x\ge0" />. Let{' '}
          <Katex tex="A" /> be the area of the region bounded by the curves{' '}
          <Katex tex="y=f(x)" />, <Katex tex="y=g(x)" /> and the line <Katex tex="x=2" />.
        </p>
        <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={regionSrc} alt="Sections of the graphs of f and g for x ≥ 0 with the enclosed region shaded, from the original 2018 VCAA exam paper" className="w-full max-w-[460px]" />
        </div>
      </div>

      <PartCard
        letter="c"
        marks={1}
        statement={<>Write down a definite integral that gives the value of <Katex tex="A" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={<>Using your result from <b>part a.</b>, or otherwise, find the value of <Katex tex="k" /> such that <Katex tex="A=\dfrac{16}{k}" />.</>}
        examinerReport={EXAM_D}
      >
        <Background>
          <p>
            "Using your result from part a." is not a suggestion. The integrand in part (c)
            has no elementary antiderivative you could reach by hand on Exam 1 — unless you
            notice it is a multiple of <Katex tex="f'" />, in which case the integral is just{' '}
            <Katex tex="f" /> evaluated at the terminals. The question was built backwards
            from that identity.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
