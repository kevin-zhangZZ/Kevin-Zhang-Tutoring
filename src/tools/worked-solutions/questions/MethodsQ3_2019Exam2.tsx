// 2019 Mathematical Methods — Exam 2, Question 3 (9 marks).
// f(t) = sin(πt/3) + sin(πt/6), the strength of a dual-tone telephone signal — its period,
// zeros, maximum, and the area it bounds with the axis (parts a-d), then a transformation g
// of f with the same bounded area (part e), and a rectangle of matching area (part f). The
// given graph of f is VCAA's own, cropped directly from the exam paper; the graph of the
// transformed function g in part e. is this site's own figure (matplotlib) of a function
// VCAA never printed — part e. was the second-worst-answered part of the paper (72% scored
// zero) and seeing g is what makes the choice of terminals make sense. Note the paper's first
// integral in part e. is ∫ from 2 to 0 (terminals reversed), not from −2 to 0. Question text
// transcribed from the original paper. Cross-checked against the VCAA examination report and
// itute's independent solutions — both accept a family of transformations here, and both are
// shown. Every integral confirmed exactly by computer algebra. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import ftGraphSrc from './meth-2019e2-q3-ft-graph.png'
import transformedSrc from './meth-2019e2-q3-transformed.png'

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>This question was answered well. Common incorrect answers were <Katex tex="6" />, <Katex tex="18" /> and <Katex tex="12t" />.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>This question was answered well. Some students only gave two values, either <Katex tex="0,4" /> or <Katex tex="4,6" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>This question was answered well. Common incorrect answers were <Katex tex="1.73" /> and <Katex tex="1.79" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [32, 6, 62],
  average: 1.3,
  comment: (
    <>
      The most common incorrect answer was{' '}
      <Katex tex="\displaystyle\int_0^4f(t)dt+\int_4^6f(t)dt=\tfrac{12}{\pi}" />, or{' '}
      <Katex tex="\displaystyle\int_0^6f(t)dt=\tfrac{12}{\pi}" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [72, 18, 10],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Some students attempted to describe the
      transformations but gave incorrect or no values for <Katex tex="a" />, <Katex tex="b" />,{' '}
      <Katex tex="c" /> and <Katex tex="d" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [62, 2, 36],
  average: 0.8,
  comment: (
    <>
      Many students did not double their answer from Question 3d., giving{' '}
      <Katex tex="12k=\tfrac{15}{\pi},\ k=\tfrac{5}{4\pi}" />. Other
      students had the correct method but wrote their final answer as <Katex tex="k=\tfrac{5\pi}{2}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{3}\right) \text{ has period } \dfrac{2\pi}{\pi/3}=6" />,
    reason: <>For <Katex tex="\sin(nt)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />; here <Katex tex="n=\tfrac{\pi}{3}" />, so the <Katex tex="\pi" />'s cancel.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right) \text{ has period } \dfrac{2\pi}{\pi/6}=12" />,
    reason: <>The same rule for the slower term.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 12}" />,
    reason: <>The sum repeats only once <em>both</em> pieces have come back to their starting state together — the lowest common multiple of <Katex tex="6" /> and <Katex tex="12" />, which is <Katex tex="12" />. (After <Katex tex="6" /> the fast term has reset but the slow one is only halfway, so <Katex tex="6" /> is not a period of the sum — the report lists <Katex tex="6" />, <Katex tex="18" /> and <Katex tex="12t" /> as common incorrect answers.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\sin\!\left(\dfrac{\pi t}{3}\right)+\sin\!\left(\dfrac{\pi t}{6}\right)=0" />
        <Katex display tex="2\sin\!\left(\dfrac{\pi t}{6}\right)\cos\!\left(\dfrac{\pi t}{6}\right)+\sin\!\left(\dfrac{\pi t}{6}\right)=0" />
      </>
    ),
    reason: <>The given graph shows the crossings; confirming them algebraically: <Katex tex="\tfrac{\pi t}{3}" /> is double <Katex tex="\tfrac{\pi t}{6}" />, so the double-angle rule <Katex tex="\sin(2A)=2\sin A\cos A" /> rewrites the first term in terms of the second.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right)\left[2\cos\!\left(\dfrac{\pi t}{6}\right)+1\right]=0" />,
    reason: <>Common factor. A product is zero when either factor is.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right)=0 \implies \dfrac{\pi t}{6}=0,\ \pi \implies t=0,\ 6" />
        <Katex display tex="\cos\!\left(\dfrac{\pi t}{6}\right)=-\dfrac12 \implies \dfrac{\pi t}{6}=\dfrac{2\pi}{3} \implies t=4" />
      </>
    ),
    reason: <>Keeping only the solutions inside <Katex tex="t\in[0,6]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t=0,\ 4,\ 6}" />,
    reason: <>All three are wanted — the report notes some students only gave two values, either <Katex tex="0,4" /> or <Katex tex="4,6" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Maximise } f(t)=\sin\!\left(\dfrac{\pi t}{3}\right)+\sin\!\left(\dfrac{\pi t}{6}\right)" />,
    reason: <>Technology is the expected route: <Cas fn="fMax">fMax(sin(πt/3)+sin(πt/6), t) | 0&lt;=t&lt;=12</Cas> returns the <Katex tex="t" /> value, which you then substitute back to get the strength itself. Restricting to one period <Katex tex="[0,12]" /> matters — without it the solver can return a peak from any repeat of the pattern. Graphing <Katex tex="f" /> and reading the highest point works equally well, as does solving <Katex tex="f'(t)=0" /> and testing the solutions.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum strength} \approx 1.76}" />,
    reason: <>Correct to two decimal places, as asked. Sanity check against the given graph: the tall peaks sit a little below <Katex tex="2" />. ✓</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(t)\ge0 \text{ on } [0,4], \qquad f(t)\le0 \text{ on } [4,6]" />,
    reason: <>From part b.'s zeros and the given graph: the curve is above the axis up to <Katex tex="t=4" /> and dips below it between <Katex tex="4" /> and <Katex tex="6" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_0^4 f(t)\,dt \;-\; \int_4^6 f(t)\,dt" />,
    reason: <>The second integral comes out <em>negative</em> (the region is below the axis), so subtracting it adds its size to the total. Adding the two integrals instead would let the dip cancel part of the hump — the report's most common error.</>,
  },
  {
    working: <Katex display tex="F(t) = -\dfrac{3}{\pi}\cos\!\left(\dfrac{\pi t}{3}\right)-\dfrac{6}{\pi}\cos\!\left(\dfrac{\pi t}{6}\right)" />,
    reason: <>An antiderivative, using <Katex tex="\int\sin(nt)\,dt=-\tfrac1n\cos(nt)" /> on each term: <Katex tex="\tfrac{1}{\pi/3}=\tfrac3\pi" /> and <Katex tex="\tfrac{1}{\pi/6}=\tfrac6\pi" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="F(0) = -\dfrac{3}{\pi}(1)-\dfrac{6}{\pi}(1) = -\dfrac{9}{\pi}" />
        <Katex display tex="F(4) = -\dfrac{3}{\pi}\!\left(-\dfrac12\right)-\dfrac{6}{\pi}\!\left(-\dfrac12\right) = \dfrac{9}{2\pi}" />
        <Katex display tex="F(6) = -\dfrac{3}{\pi}(1)-\dfrac{6}{\pi}(-1) = \dfrac{3}{\pi}" />
      </>
    ),
    reason: <>Using <Katex tex="\cos\tfrac{4\pi}{3}=\cos\tfrac{2\pi}{3}=-\tfrac12" />, <Katex tex="\cos2\pi=1" /> and <Katex tex="\cos\pi=-1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^4 f = F(4)-F(0) = \dfrac{9}{2\pi}+\dfrac{9}{\pi} = \dfrac{27}{2\pi}" />
        <Katex display tex="\int_4^6 f = F(6)-F(4) = \dfrac{3}{\pi}-\dfrac{9}{2\pi} = -\dfrac{3}{2\pi}" />
      </>
    ),
    reason: <>The second is negative, as expected for the dip below the axis.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \dfrac{27}{2\pi}-\left(-\dfrac{3}{2\pi}\right) = \dfrac{30}{2\pi}" />,
    reason: <>Subtracting the negative integral adds its size.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \dfrac{15}{\pi} \approx 4.77}" />,
    reason: <>Exact form: Section B requires it unless told otherwise.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="(t,\ y) \ \longmapsto \ (at+c,\ by+d)" />,
    reason: <>What the given matrix equation actually does to a point: the <Katex tex="t" />-coordinate is scaled by <Katex tex="a" /> then shifted by <Katex tex="c" />; the <Katex tex="y" />-coordinate is scaled by <Katex tex="b" /> then shifted by <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="g(t) = b\,f\!\left(\dfrac{t-c}{a}\right)+d" />,
    reason: <>The rule of the image graph — see the note above for where the "backwards" substitution comes from.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Try } a=-1,\ b=1,\ c=6,\ d=0" />
        <Katex display tex="\implies g(t)=f\!\left(\dfrac{t-6}{-1}\right)=f(6-t)" />
      </>
    ),
    reason: <>The map <Katex tex="t\mapsto 6-t" /> is a reflection of the graph in the vertical line <Katex tex="t=3" /> (equivalently: reflect in the <Katex tex="y" />-axis, then translate <Katex tex="6" /> units right).</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={transformedSrc} alt="Graph of the transformed function g(t) = f(6 − t): a dip below the axis on [0, 2] and a large hump on [2, 6], both shaded — this site's own explanatory figure" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>Why this works: the reflection carries <Katex tex="f" />'s big positive hump on <Katex tex="[0,4]" /> across to <Katex tex="[2,6]" />, and <Katex tex="f" />'s dip on <Katex tex="[4,6]" /> onto <Katex tex="[0,2]" />. The first integral runs <em>backwards</em>, from <Katex tex="2" /> down to <Katex tex="0" />, and reversing the terminals flips its sign — so the dip, which is below the axis, contributes a positive amount.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_2^6 g(t)\,dt \;\overset{u=6-t}{=}\; \int_0^4 f(u)\,du = \dfrac{27}{2\pi}" />
        <Katex display tex="\int_2^0 g(t)\,dt = -\int_0^2 g(t)\,dt \;\overset{u=6-t}{=}\; -\int_4^6 f(u)\,du = \dfrac{3}{2\pi}" />
      </>
    ),
    reason: <>Substituting <Katex tex="u=6-t" /> turns each integral of <Katex tex="g" /> back into an integral of <Katex tex="f" /> from part d.</>,
  },
  {
    working: <Katex display tex="\int_2^0 g + \int_2^6 g = \dfrac{3}{2\pi}+\dfrac{27}{2\pi} = \dfrac{30}{2\pi} = \dfrac{15}{\pi}" />,
    reason: <>Exactly part d.'s area, as required.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-1,\quad b=1,\quad c=6,\quad d=0}" />,
    reason: <>One answer of several. The report also gives <Katex tex="c=6+12n" /> for <Katex tex="n\in Z^+\cup\{0\}" /> (shifting by a whole period of <Katex tex="12" /> changes nothing), and the alternative <Katex tex="a=1,\ b=-1,\ c=-6+12n" /> for <Katex tex="n\in Z^-\cup\{0\}" />, <Katex tex="d=0" />: that gives <Katex tex="g(t)=-f(t+6)" />, which simplifies to the same function <Katex tex="\sin\!\left(\tfrac{\pi t}{6}\right)-\sin\!\left(\tfrac{\pi t}{3}\right)" />. "There are other solutions," as the report says.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Rectangle: width } 12, \text{ height } k \implies \text{area} = 12k" />,
    reason: <>It runs from <Katex tex="x=0" /> to <Katex tex="x=12" /> between the axis and the line <Katex tex="y=k" />.</>,
  },
  {
    working: <Katex display tex="f(12-t) = \sin\!\left(4\pi-\dfrac{\pi t}{3}\right)+\sin\!\left(2\pi-\dfrac{\pi t}{6}\right) = -f(t)" />,
    reason: <>Using <Katex tex="\sin(2k\pi - A)=-\sin A" />. This says the second half of a period is the first half turned upside down — so the graph on <Katex tex="[6,12]" /> is the graph on <Katex tex="[0,6]" /> rotated <Katex tex="180^\circ" /> about the point <Katex tex="(6,0)" />, and therefore traps exactly the same amount of area.</>,
  },
  {
    working: <Katex display tex="\text{Area over one period } [0,12] = 2\times\dfrac{15}{\pi} = \dfrac{30}{\pi}" />,
    reason: <>Twice part d.'s answer — the report says many students did not double.</>,
  },
  {
    working: <Katex display tex="12k = \dfrac{30}{\pi}" />,
    reason: <>Equating the two areas.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{30}{12\pi} = \dfrac{5}{2\pi}}" />,
    reason: <>Note <Katex tex="\tfrac{5}{2\pi}\approx0.80" />, not <Katex tex="\tfrac{5\pi}{2}\approx7.85" /> — the report flags students who wrote the <Katex tex="\pi" /> on the wrong side of the fraction.</>,
  },
]

export default function MethodsQ3_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (9 marks)</p>
        <p>
          During a telephone call, a phone uses a dual-tone frequency electrical signal to
          communicate with the telephone exchange. The strength, <Katex tex="f" />, of a simple
          dual-tone frequency signal is given by the function{' '}
          <Katex tex="f(t) = \sin\left(\dfrac{\pi t}{3}\right)+\sin\left(\dfrac{\pi t}{6}\right)" />
          , where <Katex tex="t" /> is a measure of time and <Katex tex="t\ge0" />.
        </p>
        <p className="mt-2 mb-3">Part of the graph of <Katex tex="y=f(t)" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={ftGraphSrc} alt="Graph of y = f(t) for t from 0 to about 25, oscillating between about −1.76 and 1.76 and crossing the axis at t = 0, 4, 6, 8, 12, 16, 18, 20 and 24, from the original 2019 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="a" topic="Period" marks={1} statement="State the period of the function." examinerReport={EXAM_A}>
        <Background>
          <p>
            "Dual-tone" means two sine waves of different frequencies added together — which is
            literally what a telephone keypad sends down the line when you press a button. The
            sum repeats only when both waves have simultaneously returned to where they started,
            so its period is the <b>lowest common multiple</b> of the two individual periods.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Zeros" marks={1} statement={<>Find the values of <Katex tex="t" /> where <Katex tex="f(t)=0" /> for the interval <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Maximum Value" marks={1} statement="Find the maximum strength of the dual-tone frequency signal, correct to two decimal places." examinerReport={EXAM_C}>
        <Background>
          <p>
            It's tempting to say the maximum is <Katex tex="1+1=2" />, but the two waves peak at{' '}
            <em>different</em> times — <Katex tex="\sin\!\left(\tfrac{\pi t}{3}\right)" /> peaks at{' '}
            <Katex tex="t=1.5" />, <Katex tex="\sin\!\left(\tfrac{\pi t}{6}\right)" /> at{' '}
            <Katex tex="t=3" /> — so they never both hit <Katex tex="1" /> at once and the true
            maximum falls short of <Katex tex="2" />. There's no neat exact form, so this is a
            straight technology question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" topic="Area Under Curve" marks={2} statement={<>Find the area between the graph of <Katex tex="f" /> and the horizontal axis for <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            <b>Area is never negative, but integrals can be.</b> When a curve crosses the axis
            inside the interval, a single integral across the whole interval subtracts the
            below-axis part from the above-axis part. To get <em>area</em>, split the interval at
            every crossing and make each piece count positively — either by subtracting the
            integrals that come out negative, or by integrating <Katex tex="|f(t)|" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Let <Katex tex="g" /> be the function obtained by applying the transformation{' '}
          <Katex tex="T" /> to the function <Katex tex="f" />, where{' '}
          <Katex tex="T\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}a&0\\0&b\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}c\\d\end{bmatrix}" />{' '}
          and <Katex tex="a,b,c" /> and <Katex tex="d" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Transformations"
        marks={2}
        statement={<>Find the values of <Katex tex="a,b,c" /> and <Katex tex="d" /> given that <Katex tex="\displaystyle\int_{2}^{0}g(t)dt+\int_{2}^{6}g(t)dt" /> has the same area calculated in <b>part d.</b></>}
        examinerReport={EXAM_E}
      >
        <Background>
          <p>
            <b>How a transformation acts on a graph.</b> The matrix statement says a point{' '}
            <Katex tex="(t,y)" /> moves to <Katex tex="(at+c,\ by+d)" />. So a point on the graph
            of <Katex tex="f" />, which looks like <Katex tex="\bigl(t,\ f(t)\bigr)" />, lands at{' '}
            <Katex tex="\bigl(at+c,\ b\,f(t)+d\bigr)" />.
          </p>
          <p>
            To get the <em>rule</em> of the new graph, call the image point{' '}
            <Katex tex="(T,\ Y)" />. Then <Katex tex="T=at+c" />, so <Katex tex="t=\tfrac{T-c}{a}" />
            , and <Katex tex="Y=b\,f(t)+d" /> becomes{' '}
            <Katex tex="Y = b\,f\!\left(\tfrac{T-c}{a}\right)+d" />. That backwards-looking
            substitution is the key step: the rule of the image uses the{' '}
            <em>inverse</em> of what the transformation does to <Katex tex="t" />, which is easy to
            get backwards.
          </p>
          <p>
            There is no single right answer here — VCAA accepted several — so the job is to
            find <em>any</em> transformation that lands the right pieces of the graph on{' '}
            <Katex tex="[0,2]" /> and <Katex tex="[2,6]" />. The given terminals are the clue —
            including the fact that the first integral runs from <Katex tex="2" /> <em>down</em>{' '}
            to <Katex tex="0" />, which makes a region below the axis count positively.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Average Value"
        marks={2}
        statement={<>The rectangle bounded by the line <Katex tex="y=k,\ k\in R^+" />, the horizontal axis, and the lines <Katex tex="x=0" /> and <Katex tex="x=12" /> has the same area as the area between the graph of <Katex tex="f" /> and the horizontal axis for one period of the dual-tone frequency signal. Find the value of <Katex tex="k" />.</>}
        examinerReport={EXAM_F}
      >
        <Background>
          <p>
            One period is <Katex tex="12" /> units long (part a), but part d. only measured the
            area over the <em>first half</em> of it, <Katex tex="[0,6]" />. So the first job is to
            get from half a period to a whole one — and the symmetry of the signal makes that a
            doubling rather than a fresh integral.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
