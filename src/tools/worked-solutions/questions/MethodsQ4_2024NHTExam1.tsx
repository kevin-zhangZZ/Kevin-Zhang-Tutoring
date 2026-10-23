// 2024 Mathematical Methods NHT — Exam 1, Question 4 (3 marks). The NHT report gives sample
// answers only, with no statistics, and no notes beyond them. A composite g∘h of a logarithm and
// an exponential: showing it is defined for all real x (range of h inside the domain of g), then
// its range. Question text transcribed from the original paper. Answers checked with sympy and
// against the VCAA report's sample answers (both of its routes for part a.; range (0, ∞)).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="e^{3x}>0 \implies e^{3x}+2>2 \implies \operatorname{ran} h=(2,\,\infty)" />,
    reason: <>An exponential is always positive and takes every positive value, so adding 2 gives every number above 2.</>,
  },
  {
    working: <Katex display tex="\operatorname{dom} g=\left(\tfrac32,\,\infty\right)" />,
    reason: <>Given in the definition of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="(2,\,\infty)\subseteq\left(\tfrac32,\,\infty\right)\implies\operatorname{ran} h\subseteq\operatorname{dom} g" />,
    reason: <><Katex tex="g\circ h" /> means &ldquo;apply <Katex tex="h" /> first, then <Katex tex="g" />&rdquo;, so every output of <Katex tex="h" /> must be an allowed input of <Katex tex="g" />. Every number above 2 is above <Katex tex="\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="\operatorname{dom}(g\circ h)=\operatorname{dom} h=R" />,
    reason: <>Since the range condition holds, <Katex tex="g\circ h" /> is defined for every <Katex tex="x" /> that <Katex tex="h" /> accepts, which is all of <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\begin{aligned}(g\circ h)(x)&=\log_e\left(2\left(e^{3x}+2\right)-3\right)\\ &=\log_e\left(2e^{3x}+1\right)\end{aligned}\\ \boxed{\begin{gathered}g\circ h \text{ is defined}\\ \text{for all } x\in R\end{gathered}}\end{gathered}" />,
    reason: <>The rule confirms it: <Katex tex="2e^{3x}+1>1>0" /> for every real <Katex tex="x" />, so the log always has a positive argument. As required.</>,
    more: <>VCAA shows both routes: the range-inside-domain argument, and simplifying the rule to <Katex tex="\log_e\left(2e^{3x}+1\right)" /> and noting the argument is always positive. Either one is a complete answer; a &ldquo;show that&rdquo; needs the reason stated, not just the rule.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="e^{3x}\in(0,\infty)\implies 2e^{3x}+1\in(1,\,\infty)" />,
    reason: <>As <Katex tex="x" /> runs over <Katex tex="R" />, <Katex tex="e^{3x}" /> takes every positive value, so <Katex tex="2e^{3x}+1" /> takes every value above 1 (approaching 1 as <Katex tex="x\to-\infty" />, never reaching it).</>,
  },
  {
    working: <Katex display tex="\log_e(1)=0,\quad \log_e(u)\to\infty \text{ as } u\to\infty" />,
    reason: <><Katex tex="\log_e" /> is increasing, so the inputs <Katex tex="(1,\infty)" /> give the outputs from <Katex tex="\log_e(1)=0" /> (not included) upward without bound.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{ran}(g\circ h)=(0,\,\infty)}" />,
    reason: <>VCAA also accepts <Katex tex="R^+" />. The left end is open because <Katex tex="2e^{3x}+1" /> never actually equals 1.</>,
    more: <>Another way to see it: <Katex tex="g" /> is applied to the inputs <Katex tex="(2,\infty)" /> (the range of <Katex tex="h" />), and <Katex tex="g(2)=\log_e(1)=0" />. Note the range is not the range of <Katex tex="g" /> on its whole domain, which would be all of <Katex tex="R" />.</>,
  },
]

export default function MethodsQ4_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (3 marks)</p>
        <p>
          Let <Katex tex="g:\left(\tfrac32,\infty\right)\to R,\ g(x)=\log_e(2x-3)" /> and{' '}
          <Katex tex="h:R\to R,\ h(x)=e^{3x}+2" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Composite Function"
        marks={2}
        statement={
          <>
            Show that <Katex tex="g\circ h" /> is defined for all <Katex tex="x\in R" />.
          </>
        }
      >
        <Background>
          <p>
            A composite <Katex tex="g\circ h" /> exists when the range of the inner function, <Katex tex="h" />, is a
            subset of the domain of the outer function, <Katex tex="g" />. Its domain is then the domain of{' '}
            <Katex tex="h" />. The usual route: find <Katex tex="\operatorname{ran} h" />, compare it with{' '}
            <Katex tex="\operatorname{dom} g" />, and conclude.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Range"
        marks={1}
        statement={
          <>
            Find the range of <Katex tex="g\circ h" />, given the domain of <Katex tex="g\circ h" /> is{' '}
            <Katex tex="x\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
