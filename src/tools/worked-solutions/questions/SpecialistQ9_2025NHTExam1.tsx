// 2025 Specialist NHT — Exam 1, Question 9 (3 marks). The NHT report gives sample answers only,
// with no statistics. Integration by parts on arctan(√x) (u = arctan(√x), dv/dx = 1), then the
// definite integral from 1 to 3: the boundary term 3π/4, and ½∫√x/(1 + x) dx by the substitution
// u = √x and the split u²/(1 + u²) = 1 − 1/(1 + u²), giving 5π/6 + 1 − √3. Question text
// transcribed from the original paper (read from a rendered page image; the 2025 paper has no
// text layer). Answers checked with sympy (the derivative of x arctan(√x) and numerical
// integration, 1.88594…) and against the report's sample answers, which agree. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} u&=\arctan\left(\sqrt x\right), & \frac{dv}{dx}&=1 \\ \frac{du}{dx}&=\frac{1}{1+x}\cdot\frac{1}{2\sqrt x}, & v&=x \end{aligned}" />,
    reason: <>There is no standard antiderivative of <Katex tex="\arctan\left(\sqrt x\right)" />, but it is easy to differentiate, so treat it as a product with 1 and use integration by parts. For <Katex tex="\tfrac{du}{dx}" />, the chain rule: <Katex tex="\tfrac{d}{dw}\arctan(w)=\tfrac{1}{1+w^2}" /> with <Katex tex="w=\sqrt x" />, so <Katex tex="1+w^2=1+x" />, times <Katex tex="\tfrac{dw}{dx}=\tfrac{1}{2\sqrt x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\int\arctan\left(\sqrt x\right)dx \\ &=x\arctan\left(\sqrt x\right)-\int x\cdot\frac{1}{2\sqrt x(1+x)}\,dx \end{aligned}" />,
    reason: <>Integration by parts: <Katex tex="\int u\frac{dv}{dx}\,dx=uv-\int v\frac{du}{dx}\,dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\int\arctan\left(\sqrt x\right)dx \\ &=x\arctan\left(\sqrt x\right)-\frac12\int\frac{\sqrt x}{1+x}\,dx \end{aligned}}" />,
    reason: <>Simplify: <Katex tex="\tfrac{x}{\sqrt x}=\sqrt x" />, and take the constant <Katex tex="\tfrac12" /> outside the integral. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\int_1^3\arctan\left(\sqrt x\right)dx \\ &=\Big[x\arctan\left(\sqrt x\right)\Big]_1^3-\frac12\int_1^3\frac{\sqrt x}{1+x}\,dx \end{aligned}" />,
    reason: <>Put terminals on both parts of the result from part a.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\Big[x\arctan\left(\sqrt x\right)\Big]_1^3 \\ &=3\arctan\left(\sqrt3\right)-\arctan(1) \\ &=3\cdot\frac{\pi}{3}-\frac{\pi}{4}=\frac{3\pi}{4} \end{aligned}" />,
    reason: <>Exact values: <Katex tex="\arctan\left(\sqrt3\right)=\tfrac{\pi}{3}" /> and <Katex tex="\arctan(1)=\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} w=\sqrt x,\ \ x&=w^2,\ \ dx=2w\,dw \\ x=1:\ w=1,&\quad x=3:\ w=\sqrt3 \end{aligned}" />,
    reason: <>The remaining integral has <Katex tex="\sqrt x" /> in it, so substitute <Katex tex="w=\sqrt x" /> to get rid of the root. Then <Katex tex="x=w^2" />, so <Katex tex="\tfrac{dx}{dw}=2w" />, giving <Katex tex="dx=2w\,dw" />. The terminals are <Katex tex="x" />-values, so change each to a <Katex tex="w" />-value using <Katex tex="w=\sqrt x" />.</>,
    more: <>The report calls this variable <Katex tex="u" />; any letter works. We use <Katex tex="w" /> so it doesn&apos;t clash with the <Katex tex="u" /> of the integration by parts.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac12\int_1^3\frac{\sqrt x}{1+x}\,dx&=\frac12\int_1^{\sqrt3}\frac{w}{1+w^2}\cdot2w\,dw \\ &=\int_1^{\sqrt3}\frac{w^2}{1+w^2}\,dw \end{aligned}" />,
    reason: <>Replace <Katex tex="\sqrt x" /> by <Katex tex="w" />, <Katex tex="1+x" /> by <Katex tex="1+w^2" /> and <Katex tex="dx" /> by <Katex tex="2w\,dw" />, and use the new terminals. The <Katex tex="\tfrac12" /> and the 2 cancel.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_1^{\sqrt3}\frac{w^2}{1+w^2}\,dw&=\int_1^{\sqrt3}\left(1-\frac{1}{1+w^2}\right)dw \\ &=\Big[w-\arctan(w)\Big]_1^{\sqrt3} \end{aligned}" />,
    reason: <>The numerator has the same degree as the denominator, so divide first: <Katex tex="\tfrac{w^2}{1+w^2}=\tfrac{(1+w^2)-1}{1+w^2}=1-\tfrac{1}{1+w^2}" />. Then <Katex tex="\int\tfrac{1}{1+w^2}\,dw=\arctan(w)" />.</>,
  },
  {
    working: <Katex display tex="=\left(\sqrt3-\frac{\pi}{3}\right)-\left(1-\frac{\pi}{4}\right)=\sqrt3-1-\frac{\pi}{12}" />,
    reason: <>Upper terminal minus lower terminal, with <Katex tex="-\tfrac{\pi}{3}+\tfrac{\pi}{4}=-\tfrac{\pi}{12}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_1^3\arctan\left(\sqrt x\right)dx&=\frac{3\pi}{4}-\left(\sqrt3-1-\frac{\pi}{12}\right) \\ &=\frac{3\pi}{4}+\frac{\pi}{12}+1-\sqrt3 \end{aligned}" />,
    reason: <>Subtract the whole bracket: every sign inside flips.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_1^3\arctan\left(\sqrt x\right)dx=\frac{5\pi}{6}+1-\sqrt3}" />,
    reason: <><Katex tex="\tfrac{3\pi}{4}+\tfrac{\pi}{12}=\tfrac{9\pi}{12}+\tfrac{\pi}{12}=\tfrac{10\pi}{12}=\tfrac{5\pi}{6}" />.</>,
    more: <>Sanity check: <Katex tex="\approx2.618+1-1.732\approx1.886" />. The integrand rises from <Katex tex="\tfrac{\pi}{4}\approx0.79" /> to <Katex tex="\tfrac{\pi}{3}\approx1.05" /> over an interval of width 2, so the integral must be between about 1.57 and 2.09 ✓.</>,
  },
]

export default function SpecialistQ9_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Integration by Parts"
        marks={1}
        statement={
          <>
            Show that{' '}
            <Katex tex="\displaystyle\int\arctan\left(\sqrt x\right)dx=x\arctan\left(\sqrt x\right)-\frac12\int\frac{\sqrt x}{1+x}\,dx" />.
          </>
        }
      >
        <Background>
          <p>
            Integration by parts, <Katex tex="\int u\tfrac{dv}{dx}\,dx=uv-\int v\tfrac{du}{dx}\,dx" />, trades an integral we
            can&apos;t do for one we can. A single inverse-trig or log function on its own is the classic case: let{' '}
            <Katex tex="u" /> be that function (its derivative is simpler, an algebraic fraction) and let{' '}
            <Katex tex="\tfrac{dv}{dx}=1" />, so <Katex tex="v=x" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Definite Integral"
        marks={2}
        statement={
          <>
            Hence, evaluate <Katex tex="\displaystyle\int_1^3\arctan\left(\sqrt x\right)dx" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Keep the old terminals after substituting"
          working={<Katex display tex="\int_1^{3}\frac{w^2}{1+w^2}\,dw" />}
        >
          After <Katex tex="w=\sqrt x" />, the terminals must be in terms of <Katex tex="w" />: <Katex tex="x=3" /> becomes{' '}
          <Katex tex="w=\sqrt3" />. Keeping 1 to 3 integrates over the wrong interval, and the nice exact value{' '}
          <Katex tex="\arctan\left(\sqrt3\right)" /> never appears, a hint that something has gone wrong.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
