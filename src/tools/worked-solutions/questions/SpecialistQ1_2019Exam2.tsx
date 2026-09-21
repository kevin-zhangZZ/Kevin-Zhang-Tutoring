// 2019 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks).
// A parametric curve x = sec(t)+1, y = tan(t) — converting to cartesian form, its domain and
// range, dy/dx in terms of sin(t) and its limiting value, a sketch, and a volume of revolution
// integral. Question text transcribed from the original paper. VCAA's axes for part (d) were
// blank, so the sketched curve is this site's own answer, plotted with matplotlib; it matches
// the sketch published in the examination report. Cross-checked against the VCAA examination
// report and itute's independent solutions, and verified by computer algebra.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2019exam2-q1d-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [17, 7, 76],
  average: 1.6,
  comment: <>Most students used the Pythagorean identity to eliminate the parameter. Some did not show enough working for a "show that" question.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 42, 38],
  average: 1.2,
  comment: <>Many students gave the domain and range of the full relation rather than of the curve traced out by the given parameter restriction.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [27, 12, 61],
  average: 1.4,
  comment: <>Most students used the chain rule correctly. The answer had to be expressed in terms of <Katex tex="\sin(t)" />.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>Students who had part (c)(i) correct generally obtained this mark.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [4, 12, 84],
  average: 1.8,
  comment: <>This was generally well done, with most students labelling the endpoints with coordinates as required. Students are advised to set viewing windows on technology to a scale that closely matches the scale provided on the examination.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [79, 19, 3],
  average: 0.3,
  comment: <>This question was not well done. Many students did not convert the terminals to values of <Katex tex="t" />, or used <Katex tex="dx" /> rather than <Katex tex="dy" /> when rotating about the <Katex tex="y" />-axis.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sec^2(t) = 1+\tan^2(t)" />,
    reason: <>The Pythagorean identity that links <Katex tex="\sec" /> and <Katex tex="\tan" /> — exactly the two functions in the parametric equations, which is the signal to use it to eliminate <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="x = \sec(t)+1 \implies \sec(t) = x-1, \qquad y=\tan(t)" />,
    reason: <>Make each trigonometric function the subject.</>,
  },
  {
    working: <Katex display tex="(x-1)^2 = 1+y^2" />,
    reason: <>Substitute both into the identity.</>,
  },
  {
    working: <Katex display tex="y^2 = (x-1)^2-1 = x^2-2x+1-1" />,
  },
  {
    working: <Katex display tex="\boxed{y^2 = x^2-2x}" />,
    reason: <>As required. For a "show that", every line above needs to be visible — jumping from the identity to the answer doesn't earn the marks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t\in\left[0,\dfrac{\pi}{2}\right) \implies \sec(t)\in[1,\infty)" />,
    reason: <><Katex tex="\cos(t)" /> falls from <Katex tex="1" /> to <Katex tex="0^+" /> across this interval, so its reciprocal climbs from <Katex tex="1" /> without bound.</>,
  },
  {
    working: <Katex display tex="x = \sec(t)+1 \in [2,\infty)" />,
  },
  {
    working: <Katex display tex="y = \tan(t) \in [0,\infty)" />,
    reason: <><Katex tex="\tan(0)=0" /> and <Katex tex="\tan(t)\to\infty" /> as <Katex tex="t\to\tfrac{\pi}{2}^-" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } [2,\infty), \qquad \text{range } [0,\infty)}" />,
    reason: <>Note this is the domain and range of the piece of the curve the <em>parameter</em> traces out — only the upper half of the full relation <Katex tex="y^2=x^2-2x" />, and only its right-hand branch. The report notes many students gave the whole relation's domain and range instead.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{dx}{dt} = \sec(t)\tan(t), \qquad \dfrac{dy}{dt} = \sec^2(t)" />,
    reason: <>Standard derivatives: <Katex tex="\tfrac{d}{dt}\sec(t)=\sec(t)\tan(t)" /> and <Katex tex="\tfrac{d}{dt}\tan(t)=\sec^2(t)" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt} = \dfrac{\sec^2(t)}{\sec(t)\tan(t)} = \dfrac{\sec(t)}{\tan(t)}" />,
    reason: <>The chain rule in parametric form — no need to go back to <Katex tex="x" /> and <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="= \dfrac{1}{\cos(t)}\times\dfrac{\cos(t)}{\sin(t)}" />,
    reason: <>Write both in terms of <Katex tex="\sin" /> and <Katex tex="\cos" />; the <Katex tex="\cos(t)" /> cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{1}{\sin(t)}}" />,
    reason: <>Equivalently <Katex tex="\operatorname{cosec}(t)" />, but the question asked for it in terms of <Katex tex="\sin(t)" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{As } t\to\dfrac{\pi}{2}^-: \quad \sin(t)\to1" />,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} \to 1}" />,
    reason: <>So far out along the curve the gradient settles at <Katex tex="1" /> — the curve approaches the asymptote <Katex tex="y=x-1" /> of the hyperbola <Katex tex="(x-1)^2-y^2=1" />, which has gradient <Katex tex="1" />. ✓</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="y^2 = x^2-2x \ \text{ with } y\ge0 \implies y = \sqrt{x^2-2x}" />,
    reason: <>From part (b) the range is <Katex tex="[0,\infty)" />, so only the <em>upper</em> branch is drawn — not both halves of the full relation.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=2: \ y=\sqrt{4-4}=0" />
        <Katex display tex="x=4: \ y=\sqrt{16-8}=\sqrt8=2\sqrt2" />
      </>
    ),
    reason: <>The two endpoints, which the question requires to be labelled with their coordinates.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={sketchSrc} alt="Upper branch of y² = x² − 2x from (2,0) rising to (4, 2√2), drawn on axes from −4 to 4" className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>Starting at <Katex tex="(2,0)" /> with a vertical tangent (the gradient <Katex tex="\tfrac{1}{\sin t}" /> is undefined at <Katex tex="t=0" />) and flattening towards gradient <Katex tex="1" /> as it climbs — exactly what parts (c)(i) and (c)(ii) predicted.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{y_1}^{y_2} x^2\,dy" />,
    reason: <>Rotation about the <Katex tex="y" />-axis, so the radius of each circular slice is <Katex tex="x" /> and the slices stack along <Katex tex="y" />. Using <Katex tex="dx" /> here is the most common error.</>,
  },
  {
    working: <Katex display tex="dy = \dfrac{dy}{dt}\,dt = \sec^2(t)\,dt" />,
    reason: <>Change the variable of integration from <Katex tex="y" /> to <Katex tex="t" />, since the question wants the answer in terms of <Katex tex="t" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x=2 \implies \sec(t)=1 \implies t=0" />
        <Katex display tex="x=4 \implies \sec(t)=3 \implies t=\cos^{-1}\!\left(\tfrac13\right)" />
      </>
    ),
    reason: <>The terminals must be converted to <Katex tex="t" /> values too. Equivalently the upper terminal is <Katex tex="\tan^{-1}\!\left(2\sqrt2\right)" />, since <Katex tex="\sec t=3" /> gives <Katex tex="\tan t=\sqrt{9-1}=2\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^{\cos^{-1}(1/3)} \bigl(\sec(t)+1\bigr)^2\sec^2(t)\,dt}" />,
    reason: <>The question says to write it down but not evaluate it, so stop here — substituting <Katex tex="x=\sec(t)+1" /> and <Katex tex="dy=\sec^2(t)\,dt" /> is the whole task.</>,
  },
]

export default function SpecialistQ1_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          A curve is defined parametrically by <Katex tex="x=\sec(t)+1" />,{' '}
          <Katex tex="y=\tan(t)" />, where <Katex tex="t\in\left[0,\dfrac{\pi}{2}\right)" />.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Show that the curve can be represented in cartesian form by the rule <Katex tex="y^2=x^2-2x" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            Converting a parametric curve to cartesian form means <b>eliminating the
            parameter</b>. When the two equations involve a matched pair of trigonometric
            functions, the tool is almost always a Pythagorean identity — here{' '}
            <Katex tex="\sec^2(t)=1+\tan^2(t)" />, which turns "<Katex tex="x" /> in terms of{' '}
            <Katex tex="\sec" />, <Katex tex="y" /> in terms of <Katex tex="\tan" />" into a
            single equation in <Katex tex="x" /> and <Katex tex="y" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>State the domain and range of the relation given by <Katex tex="y^2=x^2-2x" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c.i" marks={2} statement={<>Express <Katex tex="\dfrac{dy}{dx}" /> in terms of <Katex tex="\sin(t)" />.</>} examinerReport={EXAM_CI}>
        <Background>
          <p>
            For a parametric curve you never need the cartesian rule to differentiate — use{' '}
            <Katex tex="\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}" />, which is just the chain rule
            rearranged. Differentiate each coordinate with respect to the parameter and divide.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" marks={1} statement={<>State the limiting value of <Katex tex="\dfrac{dy}{dx}" /> as <Katex tex="t" /> approaches <Katex tex="\dfrac{\pi}{2}" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>Sketch the curve <Katex tex="y^2=x^2-2x" /> on the axes below for <Katex tex="x\in[2,4]" />, labelling the endpoints with their coordinates.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>The portion of the curve given by <Katex tex="y^2=x^2-2x" /> for <Katex tex="x\in[2,4]" /> is rotated about the <Katex tex="y" />-axis to form a solid of revolution. Write down, but do not evaluate, a definite integral in terms of <Katex tex="t" /> that gives the volume of the solid formed.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Two things change when you rotate about the <Katex tex="y" />-axis instead of the{' '}
            <Katex tex="x" />-axis: the radius of a slice is <Katex tex="x" /> (not{' '}
            <Katex tex="y" />), and you integrate with respect to <Katex tex="y" /> (not{' '}
            <Katex tex="x" />). So <Katex tex="V=\pi\int x^2\,dy" />. Because the answer is
            wanted in terms of <Katex tex="t" />, both the integrand <em>and</em> the terminals
            then have to be converted to the parameter.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
