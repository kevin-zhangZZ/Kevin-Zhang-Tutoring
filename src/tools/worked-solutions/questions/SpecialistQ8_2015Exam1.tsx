// 2015 Specialist Mathematics — Exam 1, Question 8 (7 marks). A show-that antiderivative of
// tan(2x), the asymptotes and inverse of f(x) = arctan(x)/2, and the area under f found by
// integrating the inverse. Question text transcribed from the original paper; the graph in
// the stem is a crop of VCAA's own artwork, while the sketch for part b(ii) and the area
// diagram are this site's own matplotlib figures (VCAA printed only blank answer axes).
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2015e1-q8-graph.png'
import inverseSrc from './spec-2015e1-q8b-inverse.png'
import areaSrc from './spec-2015e1-q8d-area.png'

const EXAM_A: SAExaminerStats = {
  marks: [44, 9, 47],
  average: 1.1,
  comment: (
    <>
      There were many instances of poor choices of substitution, such as{' '}
      <Katex tex="u=\sin(2x)" />, <Katex tex="u=\tan(2x)" /> or <Katex tex="u=\sec(2x)" />,
      rather than <Katex tex="u=\cos(2x)" />. These attempts led to a more complicated
      solution and were rarely successful. Some students who used the correct substitution
      then made sign or arithmetical errors, or did not use a modulus sign at the integration
      stage. There were some unconvincing arguments, often due to insufficient steps shown.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Most students answered this question correctly. Some gave{' '}
      <Katex tex="y=\pm\tfrac\pi2" />. Others gave <Katex tex="\pm\tfrac\pi4" /> rather than
      equations.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Students were expected to be able to reflect the given graph in the line{' '}
      <Katex tex="y=x" />, or find the equation <Katex tex="y=\tan(2x)" /> and sketch that
      directly. Typical errors included poor attempts at the shape of the inverse (sometimes
      graphed as <Katex tex="y=-\tan(2x)" />), poor positioning of the vertical asymptotes,
      and either not labelling or incorrectly labelling them — for example{' '}
      <Katex tex="y=\pm\tfrac\pi4" /> — and drawing the graph beyond its domain.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      This question was well answered. The main errors seen were <Katex tex="\tfrac\pi3" />{' '}
      and <Katex tex="\tfrac\pi{12}" />, with some students not knowing the exact values.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [26, 52, 23],
  average: 1,
  comment: (
    <>
      Only a small proportion of students answered this question correctly. Many gave an
      incorrect (incomplete) expression for the area in terms of the inverse, omitting{' '}
      <Katex tex="\tfrac{\sqrt3\,\pi}6" />, or used incorrect terminals. Some tried to
      integrate <Katex tex="\tan(2y)" /> rather than using the information contained in part
      a. A number of students found the wrong area and obtained{' '}
      <Katex tex="\tfrac12\log_e(2)" />. Using a diagram would have been helpful for many
      students.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int\tan(2x)\,dx = \int\frac{\sin(2x)}{\cos(2x)}\,dx" />,
    reason: <>Rewrite in terms of sine and cosine — the numerator is then almost the derivative of the denominator.</>,
  },
  {
    working: <Katex display tex="u = \cos(2x) \implies \frac{du}{dx} = -2\sin(2x)" />,
    reason: <>The substitution the report says students kept getting wrong. Take the <em>denominator</em>, because that is what makes the integral a <Katex tex="\tfrac{f'}{f}" /> form.</>,
  },
  {
    working: <Katex display tex="\sin(2x)\,dx = -\tfrac12\,du" />,
    reason: <>Rearranging the differential.</>,
  },
  {
    working: <Katex display tex="\int\frac{\sin(2x)}{\cos(2x)}\,dx = -\frac12\int\frac{1}{u}\,du" />,
    reason: <>Substituting throughout.</>,
  },
  {
    working: <Katex display tex="= -\tfrac12\log_e|u|+c = -\tfrac12\log_e\bigl|\cos(2x)\bigr|+c" />,
    reason: <>The modulus is required — <Katex tex="\cos(2x)" /> changes sign.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e\bigl|\cos(2x)\bigr|^{-1}+c = \tfrac12\log_e\bigl|\sec(2x)\bigr|+c" />,
    reason: <>A negative coefficient in front of a logarithm is the logarithm of the reciprocal, and <Katex tex="\sec = \tfrac1{\cos}" />. That is the given form, so the result is shown.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="-\tfrac\pi2 < \arctan(x) < \tfrac\pi2 \quad\text{for all } x\in R" />,
    reason: <>The range of <Katex tex="\arctan" /> is the source of both asymptotes.</>,
  },
  {
    working: <Katex display tex="f(x) = \tfrac12\arctan(x) \implies -\tfrac\pi4 < f(x) < \tfrac\pi4" />,
    reason: <>Halving the whole range.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \tfrac\pi4 \ \text{ and }\ y = -\tfrac\pi4}" />,
    reason: <>Write them as <em>equations</em> of horizontal lines; <Katex tex="\pm\tfrac\pi4" /> on its own does not answer the question.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="y = \tfrac12\arctan(x) \implies x = \tan(2y)" />,
    reason: <>Swapping <Katex tex="x" /> and <Katex tex="y" /> and making the new <Katex tex="y" /> the subject gives the inverse directly.</>,
  },
  {
    working: <Katex display tex="f^{-1}(x) = \tan(2x),\quad x\in\left(-\tfrac\pi4,\tfrac\pi4\right)" />,
    reason: <>The domain of the inverse is the range of <Katex tex="f" />, which part b(i) just established — this is what stops the sketch running past the asymptotes.</>,
  },
  {
    working: <Katex display tex="\text{asymptotes: } x = \tfrac\pi4,\ x = -\tfrac\pi4" />,
    reason: <>The horizontal asymptotes of <Katex tex="f" /> become vertical asymptotes of <Katex tex="f^{-1}" />. Labelling them <Katex tex="y=\pm\tfrac\pi4" /> was the report's most common labelling error.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={inverseSrc}
          alt="The graph of y = f(x) = arctan(x)/2 flattening towards the horizontal asymptotes y = ±π/4, together with its reflection in the line y = x: y = f inverse of x = tan(2x), rising steeply between the vertical asymptotes x = ±π/4"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>The reflection of the printed curve in <Katex tex="y=x" /> (shown dotted). It passes through the origin and is increasing, so <Katex tex="-\tan(2x)" /> — the report's common wrong shape — is upside down.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(\sqrt3) = \tfrac12\arctan(\sqrt3)" />,
    reason: <>Straight substitution.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(\tfrac\pi3\right) = \sqrt3 \implies \arctan(\sqrt3) = \tfrac\pi3" />,
    reason: <>An exact value worth knowing cold; <Katex tex="\tfrac\pi3" /> lies in <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" />, so it is the principal value.</>,
  },
  {
    working: <Katex display tex="\boxed{f(\sqrt3) = \tfrac\pi6}" />,
    reason: <>Halving. Answering <Katex tex="\tfrac\pi3" /> forgets the <Katex tex="\tfrac12" />; <Katex tex="\tfrac\pi{12}" /> halves twice.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={areaSrc}
          alt="The curve y = arctan(x)/2 with the region A between it and the x-axis from the origin to x = √3 shaded, the point (√3, π/6) marked, and the region B above the curve completing the rectangle"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>The region <Katex tex="A" /> asked for, inside the rectangle <Katex tex="\sqrt3\times\tfrac\pi6" /> fixed by part c. Region <Katex tex="B" /> above the curve is the one that part a. can integrate.</>,
  },
  {
    working: <Katex display tex="A + B = \sqrt3\times\tfrac\pi6 = \tfrac{\sqrt3\,\pi}6" />,
    reason: <>The rectangle has width <Katex tex="\sqrt3" /> and height <Katex tex="f(\sqrt3)=\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="B = \int_0^{\pi/6}f^{-1}(y)\,dy = \int_0^{\pi/6}\tan(2y)\,dy" />,
    reason: <>Region <Katex tex="B" /> is bounded on the left by the <Katex tex="y" />-axis, so integrating <em>along the </em><Katex tex="y" /><em>-axis</em> turns it into the integral part a. handed you.</>,
  },
  {
    working: <Katex display tex="B = \left[\tfrac12\log_e\bigl|\sec(2y)\bigr|\right]_0^{\pi/6}" />,
    reason: <>Exactly the antiderivative shown in part a. — that is what part a. was for.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e\!\left|\sec\!\left(\tfrac\pi3\right)\right| - \tfrac12\log_e\bigl|\sec(0)\bigr|" />,
    reason: <>Substituting the terminals.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\log_e(2) - \tfrac12\log_e(1) = \tfrac12\log_e(2)" />,
    reason: <><Katex tex="\sec\!\left(\tfrac\pi3\right)=\tfrac1{\cos(\pi/3)}=2" /> and <Katex tex="\log_e(1)=0" />. This value alone is region <Katex tex="B" />, and handing it in was the report's common wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3\,\pi}{6} - \frac12\log_e(2)}" />,
    reason: <>Numerically <Katex tex="0.907-0.347\approx0.56" />, which is plausible for a region roughly <Katex tex="1.7" /> wide and a little under <Katex tex="0.5" /> tall.</>,
  },
]

export default function SpecialistQ8_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (7 marks)</p>
        <p>
          The four parts are one chain: part a. supplies an antiderivative, part b. supplies
          the inverse function, part c. supplies a terminal, and part d. needs all three at
          once. There is no elementary antiderivative of <Katex tex="\arctan(x)" /> available
          on Exam 1, so part d. has to be turned on its side and integrated in{' '}
          <Katex tex="y" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Show that{' '}
            <Katex tex="\displaystyle\int\tan(2x)\,dx = \tfrac12\log_e\bigl|\sec(2x)\bigr|+c" />
            .
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The graph of <Katex tex="f(x)=\tfrac12\arctan(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An increasing S-shaped curve through the origin flattening out towards two horizontal dashed asymptotes, on a gridded set of axes — from the original 2015 VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        marks={1}
        statement={<>Write down the equations of the asymptotes.</>}
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            On the axes above, sketch the graph of <Katex tex="f^{-1}" />, labelling any
            asymptotes with their equations.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="c" marks={1} statement={<>Find <Katex tex="f(\sqrt3)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Find the area enclosed by the graph of <Katex tex="f" />, the{' '}
            <Katex tex="x" />-axis and the line <Katex tex="x=\sqrt3" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
