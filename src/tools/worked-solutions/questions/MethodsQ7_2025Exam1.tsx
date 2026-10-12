// 2025 Mathematical Methods — Exam 1 Question 7 (6 marks). Factorising a cubic with a
// repeated root, its intercepts, then a quartic product with a stationary point of
// inflection. Question text transcribed from the original paper; the graph is a crop of
// VCAA's own artwork (300 dpi) and the part c. answer is an SVG overlay filling its three
// blanks (positions measured from the printed brackets; checked with a PIL composite). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import graphSrc from './meth-2025e1-q7c-graph.png'

const BLANK = { fontSize: 46, fill: '#c2410c', fontFamily: '"Times New Roman", Times, serif', textAnchor: 'middle' } as const

function InterceptOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[520px]">
        <img loading="lazy" decoding="async"
          src={graphSrc}
          alt="VCAA's graph of y = f(x) with the answer written into its blanks: (−2, 0) where the curve touches the x-axis, (5, 0) where it crosses, and (0, −20) on the y-axis"
          className="w-full block"
        />
        <svg viewBox="0 0 1661 1192" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <text x={486} y={578} {...BLANK}>−2</text>
          <text x={1251} y={578} {...BLANK}>5</text>
          <text x={894} y={774} {...BLANK}>−20</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was well answered. Some students chose to use a factor theorem approach to
      ‘show that’ <Katex tex="x=5" /> was a solution and, although not necessary, this approach
      was appropriate.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [17, 8, 76],
  average: 1.6,
  comment: (
    <>
      This question was well answered, with students using a variety of valid methods such as
      long division, synthetic division, and expanding and equating coefficients to factorise{' '}
      <Katex tex="f(x)" />. However, some students gave the correct answer without showing any
      working to support the answer. Students are reminded that for any question worth more than
      one mark, working must be shown in order to be awarded full marks.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      This question was well answered. A common error was omitting the negative sign in the
      intercept coordinates, giving <Katex tex="(2,0)" /> and <Katex tex="(0,20)" /> instead of the
      correct <Katex tex="(-2,0)" /> and <Katex tex="(0,-20)" />.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      Some students gave the equation of the product curve <Katex tex="(x+2)^3(x-5)" /> as their
      answer, rather than the coordinate of the stationary point of inflection. Some students
      chose to use the expanded form of <Katex tex="f(x)" /> and then expand the product instead
      of using the result from <b>part b</b> to express the product in factorised form. This
      approach often made the question unnecessarily difficult and prevented some students from
      reaching the correct answer.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [73, 27],
  average: 0.3,
  comment: (
    <>
      This question was not well answered. Although not required, consideration of the shape of
      the graph of the equation <Katex tex="y=f(x)g(x)" /> could be used to assist with
      determining the interval required. Common incorrect answers included{' '}
      <Katex tex="(-\infty,2]\cup[5,\infty)" /> (missing a negative sign in front of 2),{' '}
      <Katex tex="[-2,5]" />, <Katex tex="[5,\infty)\cup\{-2\}" /> and, less frequently,{' '}
      <Katex tex="(-\infty,2]\cap[5,\infty)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(5) = 5^3-5^2-16(5)-20" />,
    reason: <>Substituting the given value — a verification, so no factorising is needed.</>,
  },
  {
    working: <Katex display tex="= 125-25-80-20 = 0" />,
    reason: <>Careful arithmetic is the whole mark.</>,
  },
  {
    working: <Katex display tex="\boxed{\therefore x=5 \text{ is a solution of } f(x)=0}" />,
    reason: <>As required.</>,
    more: <>Equivalently, by the factor theorem <Katex tex="x-5" /> is a factor of <Katex tex="f(x)" /> — exactly what part b. is about to use. The report accepts a factor-theorem write-up too, but plain substitution is all a “verify” needs.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x+d)^2(x-5) = \left(x^2+2dx+d^2\right)(x-5)" />,
    reason: <>Expand the target form so its coefficients can be matched with those of <Katex tex="f(x)=x^3-x^2-16x-20" />.</>,
    more: <>Long division or synthetic division of <Katex tex="f(x)" /> by <Katex tex="x-5" /> works equally well (the report lists all of these as valid); expanding the given form is the least error-prone because the answer's shape is already fixed.</>,
  },
  {
    working: <Katex display tex="= x^3+(2d-5)x^2+\left(d^2-10d\right)x-5d^2" />,
    reason: <>Collecting by degree.</>,
  },
  {
    working: <Katex display tex="2d-5 = -1 \implies d = 2" />,
    reason: <>Matching the <Katex tex="x^2" /> coefficient with the <Katex tex="-1" /> in <Katex tex="f(x)" /> — the only equation linear in <Katex tex="d" />.</>,
    more: <>Matching the constant term instead gives <Katex tex="-5d^2=-20" />, so <Katex tex="d=\pm2" />, and you would still need another coefficient to rule out <Katex tex="d=-2" />. The <Katex tex="x^2" /> coefficient gives <Katex tex="d" /> outright.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{check: } d^2-10d = 4-20 = -16 \ \checkmark \\ &\phantom{\text{check: }} -5d^2 = -20 \ \checkmark \end{aligned}" />,
    reason: <>The <Katex tex="x" /> and constant coefficients of <Katex tex="f(x)" /> are <Katex tex="-16" /> and <Katex tex="-20" />; both agree, so the form is confirmed.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = (x+2)^2(x-5)}" />,
    reason: <>Substituting <Katex tex="d=2" /> into the given form.</>,
    more: <>As a cross-check, long division of <Katex tex="f(x)" /> by <Katex tex="x-5" /> gives <Katex tex="x^2+4x+4=(x+2)^2" />. Write the expansion or division down: a bare factorised answer is not enough for a 2-mark question.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^2(x-5) = 0 \implies x = -2 \ \text{(twice)}, \ x = 5" />,
    reason: <>The <Katex tex="x" />-intercepts are the zeros of the factorised form from part b.</>,
    more: <>The squared factor is why the curve <em>touches</em> the axis at <Katex tex="x=-2" /> and crosses it at <Katex tex="x=5" />, exactly as drawn — a useful check that the factorisation matches the picture.</>,
  },
  {
    working: <Katex display tex="f(0) = (2)^2(-5) = -20" />,
    reason: <>The <Katex tex="y" />-intercept is <Katex tex="f(0)" /> — equally, the constant term <Katex tex="-20" /> of the original rule.</>,
  },
  {
    working: <Katex display tex="\boxed{(-2,\,0), \quad (5,\,0), \quad (0,\,-20)}" />,
    reason: <>Both negative signs matter: the graph shows the touching intercept left of the origin and the curve crossing the <Katex tex="y" />-axis below it.</>,
    more: <>A glance at the printed graph catches a dropped sign: neither <Katex tex="(2,0)" /> nor <Katex tex="(0,20)" /> is where the curve meets the axes.</>,
  },
  {
    working: <InterceptOverlay />,
    reason: <>The three blanks completed on the printed graph.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)g(x) = (x+2)^2(x-5)\times(x+2)" />,
    reason: <>Using the factorised form from part b. rather than expanding — <Katex tex="g(x)=x+2" /> is one of the factors already present.</>,
  },
  {
    working: <Katex display tex="= (x+2)^3(x-5)" />,
    reason: <>A quartic with a triple factor <Katex tex="(x+2)^3" />, so near <Katex tex="x=-2" /> it behaves like a cubic <Katex tex="y=a(x+2)^3" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \text{odd multiplicity} \ge 3 \text{ at } x=-2 \\ \implies \text{stationary point of inflection} \end{gathered}" />,
    reason: <>Like <Katex tex="y=x^3" /> at the origin, the graph flattens at <Katex tex="x=-2" /> but still crosses the axis: a stationary point of inflection.</>,
    more: <>A check by calculus: <Katex tex="\frac{d}{dx}\left[(x+2)^3(x-5)\right]" />{' '}<Katex tex="= 3(x+2)^2(x-5)+(x+2)^3" />{' '}<Katex tex="= (x+2)^2(4x-13)" />. This is zero at <Katex tex="x=-2" /> and <Katex tex="x=\tfrac{13}{4}" />, and the squared factor means its sign does not change at <Katex tex="x=-2" /> (negative on both sides), so the stationary point there is an inflection, not a turning point. The other stationary point, at <Katex tex="x=\tfrac{13}{4}" />, is the minimum between the two <Katex tex="x" />-intercepts.</>,
  },
  {
    working: <Katex display tex="\boxed{(-2,\,0)}" />,
    reason: <>The point is on the <Katex tex="x" />-axis, since the product is zero at <Katex tex="x=-2" />. Give coordinates, not an equation.</>,
    more: <>The question asks for coordinates, so give the point, not the curve's equation. Expanding first turns this into a quartic; part b.'s factorised form makes it a one-line question.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^3(x-5) \ge 0" />,
    reason: <>The product from part d.i.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{zeros: } x = -2 \ (\text{multiplicity }3) \\ &\phantom{\text{zeros: }} x = 5 \ (\text{multiplicity }1) \end{aligned}" />,
    reason: <>Both multiplicities are odd, so the graph crosses the axis (the sign changes) at each zero.</>,
    more: <>Contrast part c.: there <Katex tex="(x+2)^2" /> made <Katex tex="f" /> touch the axis at <Katex tex="x=-2" /> without changing sign. Multiplying by <Katex tex="g(x)=x+2" /> raises the multiplicity to 3, so the product now <em>crosses</em>. Treating <Katex tex="x=-2" /> as a touching point is what gives the report's incorrect answer <Katex tex="[5,\infty)\cup\{-2\}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x>5&: \ (+)(+) = + \\ -2<x<5&: \ (+)(-) = - \\ x<-2&: \ (-)(-) = + \end{aligned}" />,
    reason: <>Testing the sign of each factor on the three intervals; <Katex tex="(x+2)^3" /> has the same sign as <Katex tex="x+2" />.</>,
    more: <>Shape check: a quartic with positive leading coefficient rises to <Katex tex="+\infty" /> at both ends, so it is positive outside its zeros and negative between them, with a stationary point of inflection at <Katex tex="(-2,0)" /> and a minimum at <Katex tex="x=\tfrac{13}{4}" />. The report's incorrect answer <Katex tex="[-2,5]" /> is exactly the interval where the product is negative or zero, the reverse of what was asked.</>,
  },
  {
    working: <Katex display tex="\boxed{x \le -2 \ \text{ or } \ x \ge 5 \quad \text{i.e. } (-\infty,-2]\cup[5,\infty)}" />,
    reason: <>Closed at <Katex tex="-2" /> and <Katex tex="5" />, since the inequality is <Katex tex="\ge" /> and the product is zero there. The two pieces are joined by “or” (<Katex tex="\cup" />).</>,
    more: <>Of the report's other incorrect answers, <Katex tex="(-\infty,2]\cup[5,\infty)" /> drops the negative sign on <Katex tex="-2" />, and <Katex tex="(-\infty,2]\cap[5,\infty)" /> uses intersection, which would require <Katex tex="x" /> to be in both pieces at once: an empty set.</>,
  },
]

export default function MethodsQ7_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (6 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=x^3-x^2-16x-20" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part b. pays for everything after it. Once <Katex tex="f(x)=(x+2)^2(x-5)" /> is
              in hand, part c. is reading off roots, and part d. is noticing that{' '}
              <Katex tex="g(x)=x+2" /> is <em>already one of the factors</em>, so the product
              is <Katex tex="(x+2)^3(x-5)" /> without any expanding.
            </p>
            <p>
              From there, the triple factor drives part d.i. and the sign of each factor
              drives part d.ii.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Verify Root"
        marks={1}
        statement={<>Verify that <Katex tex="x=5" /> is a solution of <Katex tex="f(x)=0" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Factorisation"
        marks={2}
        statement={
          <>
            Express <Katex tex="f(x)" /> in the form <Katex tex="(x+d)^2(x-5)" />, where{' '}
            <Katex tex="d\in R" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Intercepts"
        marks={1}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Consider the graph of <Katex tex="y=f(x)" />, as shown below.
              <br />
              Complete the coordinate pairs of all axial intercepts of <Katex tex="y=f(x)" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={graphSrc}
                alt="A cubic curve labelled y = f(x), touching the x-axis at a negative value, falling through the negative y-axis to a minimum and rising to cross the x-axis at a positive value, with the coordinate pairs ( , 0), ( , 0) and (0, ) left blank — from the original 2025 VCAA exam paper"
                className="w-full max-w-[520px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">d.</span> Let{' '}
          <Katex tex="g:R\to R" />, <Katex tex="g(x)=x+2" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Inflection Point"
        marks={1}
        statement={
          <>
            State the coordinates of the stationary point of inflection for the graph of{' '}
            <Katex tex="y=f(x)g(x)" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Inequality"
        marks={1}
        statement={
          <>
            Write down the values of <Katex tex="x" /> for which{' '}
            <Katex tex="f(x)g(x)\ge0" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
