// 2026 Mathematical Methods NHT — Exam 2, Section B Question 1 (13 marks). The NHT report gives
// sample answers only, with no statistics. A glass of water cooling in a refrigerator,
// f(t) = 6 + 27e^(−kt): initial temperature, asymptote, finding k = log_e(3) and rewriting f as
// 6 + 3^(3−t), solving f(t) = 8.5, then a piecewise model h once the door opens (finding g by
// antidifferentiation and continuity, and showing h has a corner at t = 3), and the Fahrenheit
// conversion as two orders of transformations. Question text transcribed from the original paper
// (no diagram). The graph of h in part e. is this site's own explanatory figure (matplotlib),
// something VCAA never printed. Answers checked with sympy and against the VCAA report's sample
// answers: a. 33 °C; b. y = 6; c. k = log_e(3); d. 2.17 h; e.i. g(t) = −14e^(−t) + 14e^(−3) + 7;
// e.ii. left derivative −log_e(3), right derivative 14e^(−3); f.i. dilation 9/5 from the t-axis then
// 32 up; f.ii. 160/9 up then dilation 9/5. The report writes h′(t) on 0 ≤ t < 3 (closed at 0);
// the working follows it. The WrongMethod in f.ii. is a verified slip (it gives +57.6, not +32),
// not taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import cornerSrc from './meth-2026nhte2-q1e-corner.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 6 + 27e^{0} = 6 + 27" />,
    reason: <>&ldquo;Initial&rdquo; means the moment it goes in, <Katex tex="t=0" />. Since <Katex tex="e^{0}=1" />, the value of <Katex tex="k" /> doesn&apos;t matter here.</>,
  },
  {
    working: <Katex display tex="\boxed{33\ ^\circ\text{C}}" />,
    reason: <>A glass of water at 33 °C is warm but plausible, and it is above the 9 °C reading two hours later, as a cooling glass should be.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{As } t\to\infty,\quad 27e^{-kt}\to 0" />,
    reason: <>The water cools (part c. shows <Katex tex="k>0" />), so the exponential term dies away and only the constant 6 is left.</>,
    more: <>Physically, 6 °C is the temperature inside the refrigerator: the water approaches it but never quite reaches it.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 6}" />,
    reason: <>An asymptote is a line, so give it as an equation, not just &ldquo;6&rdquo;. It is horizontal because the graph is <Katex tex="y=f(t)" /> against <Katex tex="t" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(2) = 9:\quad 6 + 27e^{-2k} = 9" />,
    reason: <>&ldquo;Two hours after … the temperature is 9 °C&rdquo; is the one data point that pins down <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="e^{-2k} = \frac{3}{27} = \frac19" />,
  },
  {
    working: <Katex display tex="-2k = \log_e\!\left(\tfrac19\right) = -2\log_e(3)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides; <Katex tex="\tfrac19=3^{-2}" />, so its log is <Katex tex="-2\log_e(3)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \log_e(3)}" />,
    reason: <>Positive, as a cooling model needs.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(t) &= 6 + 27e^{-\log_e(3)\,t} \\ &= 6 + 27\left(e^{\log_e(3)}\right)^{-t} \\ &= 6 + 3^{3}\times 3^{-t} \end{aligned}" />,
    reason: <>The key fact is <Katex tex="e^{\log_e(3)}=3" />, so <Katex tex="e^{-\log_e(3)\,t}=3^{-t}" />. Then write 27 as <Katex tex="3^3" /> so both factors have base 3.</>,
    more: <>VCAA writes the middle step as <Katex tex="e^{\log_e(3^{-t})}" />, which is the same idea: a log law moves the <Katex tex="-t" /> inside the log.</>,
  },
  {
    working: <Katex display tex="f(t) = 6 + 3^{3-t}" />,
    reason: <>Add the indices: <Katex tex="3^3\times3^{-t}=3^{3-t}" />. As required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="6 + 3^{3-t} = 8.5 \ \Rightarrow\ 3^{3-t} = 2.5" />,
    reason: <>Use the base-3 form from part c.: it isolates nicely.</>,
  },
  {
    working: <Katex display tex="3 - t = \frac{\log_e(2.5)}{\log_e(3)} \ \Rightarrow\ t = 3 - \frac{\log_e(2.5)}{\log_e(3)}" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides and bring the index down: <Katex tex="(3-t)\log_e(3)=\log_e(2.5)" />.</>,
    more: <>
      On CAS: <Cas fn="solve">solve(6 + 3^(3 − t) = 8.5, t)</Cas>
    </>,
  },
  {
    working: <Katex display tex="t = 2.1659\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{t \approx 2.17 \text{ hours}}" />,
    reason: <>Two decimal places, as asked. Sanity check: 8.5 °C is a little below the 9 °C reached at <Katex tex="t=2" />, so the time should be a little after 2 hours.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="g(t) = \int 14e^{-t}\,dt = -14e^{-t} + c" />,
    reason: <>The question gives the <em>rate</em> <Katex tex="g'(t)" />, so the temperature itself is an antiderivative. The antiderivative of <Katex tex="e^{-t}" /> is <Katex tex="-e^{-t}" />.</>,
  },
  {
    working: <Katex display tex="g(3) = f(3) = 6 + 3^{0} = 7" />,
    reason: <>The constant <Katex tex="c" /> comes from continuity: <Katex tex="h" /> is continuous, so the new piece must start where the old one finished at <Katex tex="t=3" />.</>,
    more: <>The water doesn&apos;t jump in temperature when the door opens; it only starts changing at a different rate. That is what &ldquo;continuous&rdquo; is telling you.</>,
  },
  {
    working: <Katex display tex="-14e^{-3} + c = 7 \ \Rightarrow\ c = 7 + 14e^{-3}" />,
  },
  {
    working: <Katex display tex="\boxed{g(t) = -14e^{-t} + 14e^{-3} + 7}" />,
    reason: <>Check: <Katex tex="g(3)=-14e^{-3}+14e^{-3}+7=7" />, and <Katex tex="g'(t)=14e^{-t}" />.</>,
    more: <>As <Katex tex="t\to\infty" />, <Katex tex="g(t)\to7+14e^{-3}\approx7.70" />: the water warms slightly and levels off. The figure in part e.ii. shows this.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dt}\left(3^{3-t}\right) = -\log_e(3)\,3^{3-t} = -27\log_e(3)\,3^{-t}" />,
    reason: <>For an exponential with base 3, <Katex tex="\tfrac{d}{dt}\,3^{u}=\log_e(3)\,3^{u}\,\tfrac{du}{dt}" />; here <Katex tex="u=3-t" />, so <Katex tex="\tfrac{du}{dt}=-1" />.</>,
    more: <>If base 3 feels unfamiliar, differentiate the original form instead: <Katex tex="\tfrac{d}{dt}\left(27e^{-\log_e(3)\,t}\right)=-27\log_e(3)\,e^{-\log_e(3)\,t}" />, which is the same thing.</>,
  },
  {
    working: <Katex display tex="h'(t) = \begin{cases} -27\log_e(3)\,3^{-t} & 0 \le t < 3 \\[4pt] 14e^{-t} & t > 3 \end{cases}" />,
    reason: <>Differentiate each piece on its own interval. <Katex tex="t=3" /> is left out of both: that is the point being tested.</>,
    more: <>This is the form VCAA gives. Some teachers would write <Katex tex="0<t<3" /> for the first piece, since a derivative at the end of a domain is only one-sided.</>,
  },
  {
    working: <Katex display tex="\text{Left: }\ -27\log_e(3)\,3^{-3} = -\log_e(3) \approx -1.10" />,
    reason: <>The gradient as <Katex tex="t" /> approaches 3 from the left, using the <Katex tex="f" /> piece: <Katex tex="27\times3^{-3}=1" />.</>,
  },
  {
    working: <Katex display tex="\text{Right: }\ 14e^{-3} \approx 0.70" />,
    reason: <>The gradient as <Katex tex="t" /> approaches 3 from the right, using the <Katex tex="g" /> piece.</>,
  },
  {
    working: <Katex display tex="-\log_e(3) \ne 14e^{-3}" />,
    reason: <>A function is differentiable at a point only if the left and right gradients agree there (as well as being continuous).</>,
  },
  {
    working: (
      <div className="flex flex-col gap-3">
        <Katex display tex="\boxed{h \text{ is not differentiable at } t = 3}" />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={cornerSrc}
            alt="This site's own graph of h: the blue curve f(t) = 6 + 3^(3−t) falls from (0, 33) to (3, 7), then the orange curve g(t) rises gently and levels off just under 8, meeting it at a sharp corner at (3, 7)"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>
    ),
    reason: <>One gradient is negative (cooling) and the other positive (warming), so the graph of <Katex tex="h" /> has a sharp corner at <Katex tex="(3,7)" />: continuous, but not smooth. As required.</>,
    more: <>The graph is ours, not VCAA&apos;s. Note that &ldquo;verify&rdquo; needs both one-sided values written down and compared, not just the statement.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="p(t) = \tfrac95\,h(t) + 32" />,
    reason: <>Read the rule from the inside out: first <Katex tex="h(t)" /> is multiplied by <Katex tex="\tfrac95" />, then 32 is added. Both act on the <Katex tex="y" />-values only.</>,
  },
  {
    working: (
      <ol className="list-decimal pl-5 flex flex-col gap-1">
        <li>Dilation by a factor of <Katex tex="\tfrac95" /> from the <Katex tex="t" />-axis</li>
        <li>Translation of 32 units in the positive <Katex tex="y" /> direction</li>
      </ol>
    ),
    reason: <>Multiplying the output by <Katex tex="\tfrac95" /> stretches the graph away from the <Katex tex="t" />-axis; adding 32 then moves it up. In this order: <Katex tex="h\to\tfrac95h\to\tfrac95h+32" />.</>,
    more: <>Say <em>from the t-axis</em> (the horizontal axis here): a dilation &ldquo;by factor <Katex tex="\tfrac95" />&rdquo; with no axis named is incomplete. VCAA writes the translation as &ldquo;32 units up&rdquo;.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\tfrac95\,h(t) + 32 = \tfrac95\left(h(t) + \tfrac{160}{9}\right)" />,
    reason: <>For the translation to come first, factor out the <Katex tex="\tfrac95" />: <Katex tex="32\div\tfrac95=32\times\tfrac59=\tfrac{160}{9}" />.</>,
  },
  {
    working: (
      <ol className="list-decimal pl-5 flex flex-col gap-1">
        <li>Translation of <Katex tex="\tfrac{160}{9}" /> units in the positive <Katex tex="y" /> direction</li>
        <li>Dilation by a factor of <Katex tex="\tfrac95" /> from the <Katex tex="t" />-axis</li>
      </ol>
    ),
    reason: <>Now the order is <Katex tex="h\to h+\tfrac{160}{9}\to\tfrac95\left(h+\tfrac{160}{9}\right)" />, which is <Katex tex="p" />.</>,
    more: <>Check by expanding: <Katex tex="\tfrac95\times\tfrac{160}{9}=32" />. The translation is smaller than 32 because the dilation afterwards stretches it.</>,
  },
]

export default function MethodsQ1_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (13 marks)</p>
        <p>
          A glass of water is placed in a refrigerator. The temperature of the water, in degrees
          Celsius, <Katex tex="t" /> hours after it is placed in the refrigerator is given by the
          function
        </p>
        <div className="py-1">
          <Katex display tex="\begin{gathered} f:[0,\infty)\to R,\ f(t)=6+27e^{-kt}, \\ \text{where } k \text{ is a real number.} \end{gathered}" />
        </div>
        <p>Two hours after being placed in the refrigerator, the temperature of the water is 9 °C.</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f(t)=6+27e^{-kt}" /> is a cooling curve: it starts at <Katex tex="6+27" /> and
              decays towards 6, the temperature of the fridge. Parts a.–d. are about reading and
              solving this one function.
            </p>
            <p>
              Part e. joins a second rule onto it at <Katex tex="t=3" />. Two different ideas are
              tested there: <em>continuity</em> (the pieces meet, which fixes the constant of
              integration) and <em>differentiability</em> (the pieces also meet with the same
              gradient, which they don&apos;t).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Initial Value"
        marks={1}
        statement={<>State the initial temperature of the water, in degrees Celsius.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Asymptote"
        marks={1}
        statement={<>State the equation of the asymptote for the graph of <Katex tex="y=f(t)" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Exponential Equation"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="k" /> and, hence, show that <Katex tex="f(t)" /> can be
            expressed in the form <Katex tex="f(t)=6+3^{3-t}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Solve Equation"
        marks={1}
        statement={
          <>
            How long after being placed in the refrigerator does it take the water temperature to
            reach 8.5 °C?
            <br />
            Give your answer in hours, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Three hours after the water is placed in the refrigerator (that is, when{' '}
          <Katex tex="t=3" />), the refrigerator door is opened. The temperature of the water then
          increases at a rate of <Katex tex="g'(t)=14e^{-t}" /> degrees Celsius per hour.
        </p>
        <p>
          Let <Katex tex="h" /> be a continuous piecewise function representing the temperature of
          the water, in degrees Celsius, <Katex tex="t" /> hours after the water is placed in the
          refrigerator.
        </p>
        <div className="py-1">
          <Katex display tex="h(t)=\begin{cases} f(t) & 0\le t\le 3 \\[4pt] g(t) & t>3 \end{cases}" />
        </div>
      </div>

      <PartCard
        letter="e.i"
        topic="Antiderivative"
        marks={2}
        statement={<>Find <Katex tex="g(t)" />.</>}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Differentiability"
        marks={3}
        statement={
          <>
            Find <Katex tex="h'(t)" /> for <Katex tex="t\ne3" /> and verify that the function{' '}
            <Katex tex="h" /> is not differentiable at <Katex tex="t=3" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">f.</p>
        <p>Temperature can also be measured in degrees Fahrenheit.</p>
        <p>The temperature of the water in degrees Fahrenheit is given by the equation</p>
        <div className="py-1">
          <Katex display tex="p(t)=\frac95h(t)+32." />
        </div>
      </div>

      <PartCard
        letter="f.i"
        topic="Transformations"
        marks={2}
        statement={
          <>
            State a sequence of two transformations, a dilation followed by a translation, that
            will map the graph of <Katex tex="y=h(t)" /> to the graph of <Katex tex="y=p(t)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Transformations"
        marks={1}
        statement={
          <>
            State a sequence of two transformations, a translation followed by a dilation, that
            will map the graph of <Katex tex="y=h(t)" /> to the graph of <Katex tex="y=p(t)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FII} />
        <WrongMethod
          title="Keep the same two steps and just swap the order"
          working={<Katex display tex="h\ \to\ h+32\ \to\ \tfrac95\left(h+32\right)=\tfrac95h+57.6" />}
        >
          Translating by 32 first and dilating second stretches the 32 as well, so the graph ends up
          57.6 units too high instead of 32. When the dilation comes last, the translation before it
          has to be pre-shrunk: <Katex tex="32\div\tfrac95=\tfrac{160}{9}" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
