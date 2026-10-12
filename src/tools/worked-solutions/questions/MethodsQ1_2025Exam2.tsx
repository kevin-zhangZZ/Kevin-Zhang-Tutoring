// 2025 Mathematical Methods — Exam 2, Section B Question 1 (13 marks). A quartic with a
// stationary point of inflection: sketch, gradient table, average value, transformations,
// and finally the same rule as a binomial probability. Question text transcribed from the
// original paper; the part b. graph is our own drawing of the answer on VCAA's axes (x and y
// from −2.5 to 2.5, ticks at the integers). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './meth-2025e2-q1b-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [2, 7, 91],
  average: 1.9,
  comment: (
    <>
      This question was answered well. Some students, however, only gave the{' '}
      <Katex tex="x" />-values. Both coordinates were required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [7, 31, 62],
  average: 1.6,
  comment: (
    <>
      Some students did not include all the coordinates.{' '}
      <Katex tex="\left(0,\dfrac{4}{3}\right)" /> was sometimes seen. Other students did not scale
      their graphs well on the axes. The <Katex tex="x" />-intercept <Katex tex="\dfrac{4}{3}" />{' '}
      was often closer to 2 than 1. Some students did not draw the stationary point of inflection
      correctly.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 19, 55],
  average: 1.3,
  comment: (
    <>
      Many students had <Katex tex="(0,0)" /> in the third column. Some students did not enter
      values in the second row. Others used <Katex tex="x" />-values which were greater than or
      equal to 1 in the fourth column. Some gave the values for <Katex tex="g(x)" /> instead of{' '}
      <Katex tex="g'(x)" /> in the second row. Some students incorrectly assumed symmetry in their
      table of values.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [25, 4, 72],
  average: 1.5,
  comment: (
    <>
      Some students worked out the average rate of change instead of the average value. Others
      evaluated <Katex tex="\displaystyle\int_0^2 g(x)\,dx" /> or{' '}
      <Katex tex="\displaystyle\frac{-1}{2-0}\int_0^2 g(x)\,dx" />. Students should check the
      values they enter into their CAS as some students had the correct definite integral but
      ended up with an incorrect answer.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [30, 41, 9, 20],
  average: 1.2,
  comment: (
    <>
      Most students were able to describe the reflection. Students were required to use the
      correct wording in their descriptions and the transformations had to be in the correct
      order. Some students had the dilation factor as <Katex tex="\dfrac{1}{2}" /> instead of 2.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [44, 11, 45],
  average: 1.0,
  comment: (
    <>
      This was a ‘show that’ question and appropriate working needed to be shown. Some students
      worked out <Katex tex="\Pr(X\le3)" /> instead of <Katex tex="\Pr(X\ge3)" />.{' '}
      <Katex tex="\Pr(X=4)" /> was sometimes omitted. Others attempted to find{' '}
      <Katex tex="1-\big(\Pr(X=0)+\Pr(X=1)+\Pr(X=2)\big)" /> but often left it incomplete or had
      ineffective use of brackets.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 4x^3-3x^4 \implies g'(x) = 12x^2-12x^3" />,
    reason: <>Stationary points are where <Katex tex="g'(x)=0" />, so differentiate term by term first.</>,
  },
  {
    working: <Katex display tex="= 12x^2(1-x) = 0 \implies x = 0 \ \text{(twice)} \ \text{ or } \ x = 1" />,
    reason: <>Factorising. The repeated factor <Katex tex="x^2" /> is the early warning that <Katex tex="x=0" /> is not an ordinary turning point.</>,
    more: <>On CAS, <Cas fn="solve" /> applied to <Katex tex="\tfrac{d}{dx}\big(g(x)\big)=0" /> gives the same two <Katex tex="x" />-values. Factorising by hand is worth it here: the squared factor is what parts b. and c. are about.</>,
  },
  {
    working: <Katex display tex="g(0) = 0, \qquad g(1) = 4-3 = 1" />,
    reason: <>The <Katex tex="y" />-coordinates come from substituting back into <Katex tex="g" />, not <Katex tex="g'" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,\,0) \ \text{ and } \ (1,\,1)}" />,
    reason: <>The question asks for coordinates, so give both points in full, not just <Katex tex="x=0" /> and <Katex tex="x=1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="4x^3-3x^4 = x^3(4-3x) = 0 \implies x = 0, \ x = \tfrac43" />,
    reason: <>Setting <Katex tex="g(x)=0" /> gives the <Katex tex="x" />-intercepts. Since <Katex tex="g(0)=0" />, the origin is also the <Katex tex="y" />-intercept.</>,
    more: <>The report notes <Katex tex="\left(0,\tfrac43\right)" /> was sometimes seen. The intercept is on the <Katex tex="x" />-axis, so it is <Katex tex="\left(\tfrac43,0\right)" />: the <Katex tex="x" />-value comes first. Also <Katex tex="\tfrac43\approx1.33" />, a third of the way from 1 to 2. The report notes it was often drawn closer to 2 than 1.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g'(x) &= 12x^2(1-x) \\ &\ge 0 \text{ near } x=0 \end{aligned}" />,
    reason: <>Near <Katex tex="x=0" />, <Katex tex="12x^2\ge0" /> and <Katex tex="1-x>0" />, so the gradient never goes negative: the curve flattens at the origin and keeps rising.</>,
    more: <>That is the shape of a stationary point of inflection: rising, momentarily horizontal at <Katex tex="(0,0)" />, then rising again. The report notes some students did not draw it correctly. A turning point (a "bump" or a "dip") at the origin would need the gradient to change sign there. In fact <Katex tex="g'(x)>0" /> for every <Katex tex="x<1" /> except 0, so the graph climbs all the way from the bottom left up to the maximum at <Katex tex="(1,1)" />.</>,
  },
  {
    working: <Katex display tex="\text{leading term } -3x^4 \implies y\to-\infty \text{ as } x\to\pm\infty" />,
    reason: <>A quartic with a negative leading coefficient, so both ends fall away.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's axes (x and y from about −2.5 to 2.5): a negative quartic rising from below, flattening through the labelled stationary point of inflection (0, 0), peaking at the labelled local maximum (1, 1), then crossing the axis at the labelled (4/3, 0) and falling steeply"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>Stationary point of inflection at <Katex tex="(0,0)" />, local maximum at <Katex tex="(1,1)" />, and the <Katex tex="x" />-intercept at <Katex tex="\left(\tfrac43,0\right)" />, all labelled with their coordinates.</>,
    more: <>Use VCAA's scale: <Katex tex="(1,1)" /> is exactly one tick across and one tick up. The report notes some graphs were not scaled well on the axes. The curve leaves the bottom of the axes (<Katex tex="y=-2.5" />) at about <Katex tex="x\approx-0.74" /> on the left and <Katex tex="x\approx1.55" /> on the right, so the right-hand side drops much more steeply after the intercept.</>,
  },
]

const GRADIENT_TABLE = (
  <div className="overflow-x-auto">
    <table className="text-[13.5px] border-collapse">
      <tbody>
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
            <Katex tex="x" />
          </th>
          {['-1', '0', '\\frac12'].map((v) => (
            <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center">
              <Katex tex={v} />
            </td>
          ))}
        </tr>
        <tr>
          <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
            <Katex tex="g'(x)" />
          </th>
          {['24', '0', '\\frac32'].map((v) => (
            <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center">
              <Katex tex={v} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
)

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{a gradient table needs } x=0 \text{ itself,} \\ &\text{and one } x\text{-value either side of it} \end{aligned}" />,
    reason: <>The top row holds three <Katex tex="x" />-values (left of 0, then 0, then right of 0); the bottom row holds <Katex tex="g'" /> at each.</>,
    more: <>The report notes many students had <Katex tex="(0,0)" /> in the third column (the middle box, counting the label column). The top row takes only the <Katex tex="x" />-value, 0. The report also notes some students did not enter values in the second row: the table is only complete with all three <Katex tex="g'(x)" /> values.</>,
  },
  {
    working: <Katex display tex="\text{the right-hand value must satisfy } 0<x<1" />,
    reason: <>For <Katex tex="x>1" /> the factor <Katex tex="1-x" /> is negative, so <Katex tex="g'(x)<0" />. That sign change belongs to the maximum at <Katex tex="x=1" />, not to <Katex tex="x=0" />.</>,
    more: <>The report notes some students used <Katex tex="x" />-values greater than or equal to 1 in the fourth column (the right-hand box). At <Katex tex="x=1" />, <Katex tex="g'(1)=0" />, and at <Katex tex="x=2" />, <Katex tex="g'(2)=-48" />: either would show the wrong pattern. On the left, any <Katex tex="x<0" /> works, since <Katex tex="g'(x)>0" /> for all negative <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g'(-1) &= 12(1)(2) = 24, \qquad g'(0) = 0, \\ g'\!\left(\tfrac12\right) &= 12\!\left(\tfrac14\right)\!\left(\tfrac12\right) = \tfrac32 \end{aligned}" />,
    reason: <>Substitute each value into <Katex tex="g'(x)=12x^2(1-x)" />, not into <Katex tex="g(x)" />. Any <Katex tex="x<0" /> and any <Katex tex="x" /> between 0 and 1 will do; these are tidy.</>,
    more: <>The report notes two traps here. Some students gave <Katex tex="g(x)" /> values instead, such as <Katex tex="g(-1)=-7" /> and <Katex tex="g\!\left(\tfrac12\right)=\tfrac{5}{16}" />, which say nothing about the gradient. Others assumed symmetry, but <Katex tex="g'" /> is not symmetric about 0: <Katex tex="g'\!\left(-\tfrac12\right)=\tfrac92" /> while <Katex tex="g'\!\left(\tfrac12\right)=\tfrac32" />. Work out each value; never copy one from the other side.</>,
  },
  {
    working: <Katex display tex="\text{positive} \to 0 \to \text{positive}" />,
    reason: <>No sign change, so <Katex tex="x=0" /> is a stationary point of inflection. That sentence is the point of the table.</>,
  },
  {
    working: GRADIENT_TABLE,
    reason: <>One possible completed table (the same one the report shows).</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b g(x)\,dx" />,
    reason: <>The average value of a function is its integral divided by the width of the interval.</>,
    more: <>Not the average <em>rate of change</em>, <Katex tex="\tfrac{g(2)-g(0)}{2-0}=\tfrac{-16}{2}=-8" />, which the report notes some students worked out instead. The report also notes students who evaluated <Katex tex="\int_0^2 g(x)\,dx=-\tfrac{16}{5}" /> (no division by the width) or put <Katex tex="\tfrac{-1}{2-0}" /> in front (a sign slip that gives <Katex tex="+\tfrac85" />).</>,
  },
  {
    working: <Katex display tex="= \frac{1}{2}\int_0^{2}\left(4x^3-3x^4\right)dx" />,
    reason: <>Here <Katex tex="a=0" /> and <Katex tex="b=2" />, so the width is 2.</>,
  },
  {
    working: <Katex display tex="= \frac12\left[x^4-\frac{3x^5}{5}\right]_0^2 = \frac12\left(16-\frac{96}{5}\right)" />,
    reason: <>Antidifferentiate, then substitute 2 and 0.</>,
    more: <>On CAS, use the definite-integral template (ctrl + I) in exact mode to get <Katex tex="-\tfrac{16}{5}" /> before halving. The report notes some students had the correct definite integral but ended up with an incorrect answer, so check what you typed into CAS: the rule <Katex tex="4x^3-3x^4" />, the terminals 0 and 2, and the <Katex tex="\tfrac12" /> in front.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12\times\left(-\frac{16}{5}\right) = -\frac85}" />,
    reason: <>Negative is believable: past <Katex tex="x=\tfrac43" /> the graph falls below the axis and reaches <Katex tex="g(2)=-16" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g&: \ \text{SPI } (0,0), \ \text{local max } (1,1) \\ h&: \ \text{SPI } (1,0), \ \text{local max } (-1,1) \end{aligned}" />,
    reason: <>Match the features: SPI to SPI, maximum to maximum. The <Katex tex="y" />-values do not change, so no vertical transformation is needed.</>,
    more: <>Horizontal transformations never change the type of a stationary point, so the SPI of <Katex tex="g" /> must become the SPI of <Katex tex="h" />, and the maximum the maximum. Since <Katex tex="y=0" /> stays 0 and <Katex tex="y=1" /> stays 1, any vertical dilation, translation or reflection would break one of them.</>,
  },
  {
    working: <Katex display tex="(x,\,y) \mapsto (ax+b,\,y): \quad 0 \mapsto 1, \ \ 1 \mapsto -1" />,
    reason: <>Reflections, dilations and translations in the <Katex tex="x" />-direction always send <Katex tex="x" /> to <Katex tex="ax+b" />. Find <Katex tex="a" /> and <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a(0)+b &= 1 \implies b = 1 \\ a(1)+1 &= -1 \implies a = -2 \end{aligned}" />,
    reason: <>Each matched pair of <Katex tex="x" />-values gives one equation.</>,
  },
  {
    working: <Katex display tex="(x,\,y) \mapsto (-2x+1,\,y)" />,
    reason: <>The minus sign means a reflection in the <Katex tex="y" />-axis; the 2 means a dilation by factor 2 (not <Katex tex="\tfrac12" />) from the <Katex tex="y" />-axis.</>,
    more: <>The report notes some students had the dilation factor as <Katex tex="\tfrac12" /> instead of 2. That comes from reading the rule rather than the mapping: <Katex tex="h(x)=g\!\left(\tfrac{1-x}{2}\right)" />, and a <Katex tex="\tfrac12" /> multiplying <Katex tex="x" /> inside <Katex tex="g" /> is a dilation by factor 2 from the <Katex tex="y" />-axis. (Check: <Katex tex="h(1)=g(0)=0" /> and <Katex tex="h(-1)=g(1)=1" />.) Thinking about points avoids the trap: the two features are 1 unit apart on <Katex tex="g" /> (<Katex tex="x=0" /> and <Katex tex="x=1" />) but 2 units apart on <Katex tex="h" /> (<Katex tex="x=1" /> and <Katex tex="x=-1" />), so horizontal distances have doubled, and the features have swapped sides, which is the reflection.</>,
  },
  {
    working: <Katex display tex="x \ \to\ -x \ \to\ -2x \ \to\ -2x+1" />,
    reason: <>Build <Katex tex="-2x+1" /> one operation at a time. Each arrow is one transformation, applied in that order. Order matters: translating last keeps the shift at 1 unit.</>,
    more: <>The report notes the transformations had to be in the correct order. Swapping steps 2 and 3 changes the result: after the reflection, translating 1 unit right and then dilating by factor 2 gives <Katex tex="2(-x+1)=-2x+2" />, which puts the SPI at <Katex tex="x=2" />. If you translate <em>before</em> dilating, the translation must be half as big: <Katex tex="-x \to -x+\tfrac12 \to 2\!\left(-x+\tfrac12\right)=-2x+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\text{1. Reflect in the } y\text{-axis.} \\ &\text{2. Dilate by factor 2 from the } y\text{-axis.} \\ &\text{3. Translate 1 unit right.} \end{aligned}}" />,
    reason: <>One of several valid sequences. Name each transformation in full: "factor 2 from the <Katex tex="y" />-axis", "1 unit right".</>,
    more: <>The report notes that students were required to use the correct wording in their descriptions. It also lists three other sequences, each giving <Katex tex="x\mapsto-2x+1" />: dilate by factor 2 from the <Katex tex="y" />-axis, translate 1 unit left, reflect in the <Katex tex="y" />-axis; reflect in the <Katex tex="y" />-axis, translate 0.5 units right, dilate by factor 2 from the <Katex tex="y" />-axis; translate 0.5 units left, dilate by factor 2 from the <Katex tex="y" />-axis, reflect in the <Katex tex="y" />-axis.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \Pr(X\ge3) &= \Pr(X=3)+\Pr(X=4) \end{aligned}" />,
    reason: <>With only 4 trials, "at least 3" means exactly 3 or exactly 4 successes.</>,
    more: <>The report notes some students worked out <Katex tex="\Pr(X\le3)" /> instead, and that <Katex tex="\Pr(X=4)" /> was sometimes omitted. The complement route, <Katex tex="1-\big(\Pr(X=0)+\Pr(X=1)+\Pr(X=2)\big)" />, also works, but it needs three terms expanded and brackets around the whole sum; the report notes it was often left incomplete or had ineffective use of brackets.</>,
  },
  {
    working: <Katex display tex="\Pr(X=3) = \binom{4}{3}p^3(1-p)^1 = 4p^3(1-p)" />,
    reason: <>The binomial formula <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" /> with <Katex tex="n=4" />, <Katex tex="x=3" />; <Katex tex="\binom{4}{3}=4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \binom{4}{4}p^4(1-p)^0 = p^4" />,
    reason: <>All four trials succeed, so there is no failure factor.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 4p^3-4p^4+p^4 = 4p^3-3p^4" />,
    reason: <>Expand <Katex tex="4p^3(1-p)" />, then collect the <Katex tex="p^4" /> terms. Every line is needed in a "show that".</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge3) = g(p) \ \text{ for all } p\in[0,1]}" />,
    reason: <>This is <Katex tex="g(x)=4x^3-3x^4" /> with <Katex tex="x" /> replaced by <Katex tex="p" />. As required.</>,
  },
]

export default function MethodsQ1_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (13 marks)</p>
        <p>
          Let <Katex tex="g:R\to R" /> be defined by{' '}
          <Katex tex="g(x)=4x^3-3x^4" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Everything follows from the factorisation{' '}
              <Katex tex="g'(x)=12x^2(1-x)" />. The squared factor means the gradient touches
              zero at <Katex tex="x=0" /> without changing sign — a stationary point of
              inflection — while the simple factor at <Katex tex="x=1" /> gives an ordinary
              local maximum.
            </p>
            <p>
              Part f is the twist: the same quartic is the binomial probability{' '}
              <Katex tex="\Pr(X\ge3)" /> for <Katex tex="X\sim\text{Bi}(4,p)" />. That is why{' '}
              <Katex tex="g(1)=1" /> exactly — a certainty when{' '}
              <Katex tex="p=1" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the coordinates of both stationary points of <Katex tex="g" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=g(x)" /> on the axes below, labelling the
            stationary points and axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Gradient Table"
        marks={2}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Complete the following gradient table with appropriate values of <Katex tex="x" />{' '}
              and <Katex tex="g'(x)" /> to show that <Katex tex="g" /> has a stationary point of
              inflection.
            </p>
            <div className="overflow-x-auto">
              <table className="text-[13.5px] border-collapse">
                <tbody>
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal"><Katex tex="x" /></th>
                    {[0, 1, 2].map((i) => <td key={i} className="border border-gray-300 dark:border-gray-700 px-8 py-1.5" />)}
                  </tr>
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal"><Katex tex="g'(x)" /></th>
                    {[0, 1, 2].map((i) => <td key={i} className="border border-gray-300 dark:border-gray-700 px-8 py-1.5" />)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average value of <Katex tex="g" /> between <Katex tex="x=0" /> and{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Transformations"
        marks={3}
        statement={
          <>
            Let <Katex tex="h" /> be the result after applying a sequence of transformations
            to <Katex tex="g" />, such that <Katex tex="h" /> has a stationary point of
            inflection at <Katex tex="(1,0)" /> and a local maximum at{' '}
            <Katex tex="(-1,1)" />.
            <br />
            Write down a possible sequence of three transformations to map from{' '}
            <Katex tex="g" /> to <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Let <Katex tex="X\sim\text{Bi}(4,p)" /> be a binomial random variable.
            <br />
            Show that{' '}
            <Katex tex="\Pr(X\ge3)=g(p)" /> for all <Katex tex="p\in[0,1]" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
