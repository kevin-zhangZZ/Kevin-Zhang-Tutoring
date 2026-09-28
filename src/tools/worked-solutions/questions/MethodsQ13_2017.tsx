// 2017 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 46% correct.
// Four algebraic identities involving h(x) = 1/(x-1) hold for every x; one doesn't. The working
// first tests x = 0 (E fails: 1 ≠ −1), then checks A–D algebraically, then gives the general
// reason E fails: (h(x))² > 0 but h(x²) < 0 on (−1, 1).
// Question text transcribed from the original paper; solution is original. Answer E agrees with
// the report and itute; all five statements checked with sympy.
// Interactive: meth-2017-mcq13-identity-graphs (graph both sides of the chosen statement on
// (−1, 1): they coincide for A–D and split either side of the x-axis for E).
// WrongMethods: (x − 1)² = x² − 1, which makes E look true; and the sign slip h(−x) = 1/(x + 1),
// which makes A, B and D look false (computed; no report evidence, so no source line).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const IdentityWidget = lazyWidget(() => import('../interactives/meth-2017-mcq13-identity-graphs'))

const EXAMINER_COMMENT = (
  <>
    <Katex tex="h(x)=\dfrac{1}{x-1}" />
    <br />
    <Katex tex="\left(h(x)\right)^2\ne h\!\left(x^2\right)" />
    <br />
    <Katex tex="\left(\dfrac{1}{x-1}\right)^2=\dfrac{1}{x^2-2x+1}\ne\dfrac{1}{x^2-1}" />
  </>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 14, C: 17, D: 10, E: 46 },
  answer: 'E',
  noAnswer: 1,
  comment: EXAMINER_COMMENT,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} h(-x) &= \frac{1}{-x-1} = -\frac{1}{x+1} \\ h(x^2) &= \frac{1}{x^2-1} = \frac{1}{(x-1)(x+1)} \\ h(0) &= -1 \end{aligned}"
      />
    ),
    reason: (
      <>
        Every option is built from <Katex tex="h(x)" />, <Katex tex="h(-x)" />, <Katex tex="h(x^2)" /> and{' '}
        <Katex tex="h(0)" />, so work these out once. Each one means &ldquo;replace the <Katex tex="x" /> in the rule by
        the new input&rdquo;: for <Katex tex="h(-x)" /> the denominator becomes <Katex tex="-x-1=-(x+1)" />, and that
        minus sign is where slips happen. Factorising <Katex tex="x^2-1" /> shows <Katex tex="h(x^2)" /> shares a factor
        with both <Katex tex="h(x)" /> and <Katex tex="h(-x)" />, which is why they can combine into it.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} x=0:\ \ (h(0))^2 &= (-1)^2 = 1 \\ h(0^2) &= h(0) = -1 \\ 1 &\ne -1 \end{aligned}"
      />
    ),
    reason: (
      <>
        A statement that is not true only needs <b>one</b> <Katex tex="x" /> where it fails, so try an easy value
        first. <Katex tex="x=0" /> is in <Katex tex="(-1,1)" /> and gives <Katex tex="h(0)=-1" />. At{' '}
        <Katex tex="x=0" />, A gives <Katex tex="1=1" />, B gives <Katex tex="-2=-2" />, and C and D give{' '}
        <Katex tex="0=0" />, but E gives <Katex tex="1" /> on the left and <Katex tex="-1" /> on the right, so E is
        false. Passing at one value doesn&apos;t prove A&ndash;D, so the next rows check them for every{' '}
        <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{A: } h(x)h(-x) &= \frac{1}{x-1}\cdot\frac{1}{-x-1} \\ &= \frac{-1}{x^2-1} \\ &= -h(x^2) \ \checkmark \end{aligned}" />,
    reason: (
      <>
        Multiply the fractions: <Katex tex="(x-1)(-x-1)=-(x-1)(x+1)=-(x^2-1)" />. True for every <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{B: } h(x)+h(-x) &= \frac{1}{x-1}-\frac{1}{x+1} \\ &= \frac{2}{x^2-1} \\ &= 2h(x^2) \ \checkmark \end{aligned}" />,
    reason: (
      <>
        Over the common denominator <Katex tex="(x-1)(x+1)=x^2-1" />, the numerator is{' '}
        <Katex tex="(x+1)-(x-1)=2" />. True.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{C: } h(x)-h(0) &= \frac{1}{x-1}+1 \\ &= \frac{x}{x-1} \\ &= x\,h(x) \ \checkmark \end{aligned}" />,
    reason: (
      <>
        Since <Katex tex="h(0)=-1" />, subtracting it adds <Katex tex="1=\tfrac{x-1}{x-1}" />, and the numerator becomes{' '}
        <Katex tex="1+(x-1)=x" />. True.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{D: } h(x)-h(-x) &= \frac{1}{x-1}+\frac{1}{x+1} \\ &= \frac{2x}{x^2-1} \\ &= 2x\,h(x^2) \ \checkmark \end{aligned}" />,
    reason: (
      <>
        The same common denominator as B, but now the numerator is <Katex tex="(x+1)+(x-1)=2x" />. True. On CAS,{' '}
        <Cas fn="define">Define h(x)=1/(x-1)</Cas>, then enter each statement: A&ndash;D each return{' '}
        <Katex tex="\text{true}" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{E: } (h(x))^2 &= \frac{1}{(x-1)^2} > 0 \\ h(x^2) &= \frac{1}{x^2-1} < 0 \end{aligned}"
      />
    ),
    reason: (
      <>
        Why E fails everywhere, not just at <Katex tex="0" />: a square is positive, but for every <Katex tex="x" /> in{' '}
        <Katex tex="(-1,1)" />, <Katex tex="x^2<1" />, so <Katex tex="x^2-1<0" /> and <Katex tex="h(x^2)" /> is
        negative. The algebra says the same, as the examiner&apos;s report shows:{' '}
        <Katex tex="(x-1)^2=x^2-2x+1" />, not <Katex tex="x^2-1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(h(x))^2 \ne h(x^2)}" />,
    reason: (
      <>
        Matches option <b>E</b>, the statement that is <em>not</em> true. A, B, C and D hold for every{' '}
        <Katex tex="x" /> in the domain; the sign slip <Katex tex="h(-x)=\tfrac{1}{x+1}" /> (below) makes A, B and D
        all look false.
      </>
    ),
  },
]

export default function MethodsQ13_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="h:(-1,1)\to R" />, <Katex tex="h(x) = \dfrac{1}{x-1}" />.
          </p>
          <p>Which one of the following statements about <Katex tex="h" /> is <b>not</b> true?</p>
        </>
      }
      background={
        <Background title="Inside or outside: h(x²), h(−x) and (h(x))²">
          <p>
            <Katex tex="h(x^2)" /> changes the <b>input</b>: replace every <Katex tex="x" /> in the rule by{' '}
            <Katex tex="x^2" />, giving <Katex tex="\tfrac{1}{x^2-1}" />. <Katex tex="(h(x))^2" /> changes the{' '}
            <b>output</b>: work out <Katex tex="h(x)" /> first, then square it, giving <Katex tex="\tfrac{1}{(x-1)^2}" />.
            Squaring before the rule and squaring after it are different operations, and they almost never agree.
          </p>
          <p>
            In the same way <Katex tex="h(-x)" /> replaces <Katex tex="x" /> by <Katex tex="-x" />:{' '}
            <Katex tex="\tfrac{1}{-x-1}" />, which is not the same as <Katex tex="-h(x)" /> or{' '}
            <Katex tex="\tfrac{1}{x+1}" />. An identity is a statement that holds for <em>every</em> <Katex tex="x" /> in
            the domain, so one value where it fails is enough to show it is not true.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="h(x)h(-x) = -h(x^2)" /> },
        { letter: 'B', content: <Katex tex="h(x)+h(-x) = 2h(x^2)" /> },
        { letter: 'C', content: <Katex tex="h(x)-h(0) = xh(x)" /> },
        { letter: 'D', content: <Katex tex="h(x)-h(-x) = 2xh(x^2)" /> },
        { letter: 'E', content: <Katex tex="(h(x))^2 = h(x^2)" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="An identity means both sides are the same graph: only E comes apart">
            <IdentityWidget />
          </Explore>
          <WrongMethod
            title="(x − 1)² is x² − 1, so (h(x))² = h(x²)"
            working={<Katex display tex="\left(\frac{1}{x-1}\right)^2 = \frac{1}{x^2-1} = h(x^2)" />}
          >
            <p>
              Squaring a bracket is not squaring each term: <Katex tex="(x-1)^2=x^2-2x+1" />. The{' '}
              <Katex tex="-2x" /> cross term is what gets lost. With it, E becomes{' '}
              <Katex tex="\tfrac{1}{x^2-2x+1}" /> on the left against <Katex tex="\tfrac{1}{x^2-1}" /> on the right. To
              catch it, check signs: the left side is a square, so it is positive, while{' '}
              <Katex tex="x^2-1" /> is negative on <Katex tex="(-1,1)" />. Or test <Katex tex="x=0" />: <Katex tex="1" />{' '}
              against <Katex tex="-1" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="h(−x) is just 1/(x + 1)"
            working={
              <Katex
                display
                tex="\begin{aligned} h(-x) &= \frac{1}{x+1}\ ? \\ h(x)h(-x) &= \frac{1}{x^2-1} = +h(x^2) \end{aligned}"
              />
            }
          >
            <p>
              Replacing <Katex tex="x" /> by <Katex tex="-x" /> in <Katex tex="x-1" /> gives <Katex tex="-x-1" />, which is{' '}
              <Katex tex="-(x+1)" />: the minus sign stays. Drop it and A comes out as <Katex tex="+h(x^2)" />, B as{' '}
              <Katex tex="\tfrac{2x}{x^2-1}" /> and D as <Katex tex="\tfrac{2}{x^2-1}" />, so three true statements
              all look false. To catch it, test <Katex tex="x=0" />: <Katex tex="h(-0)" /> must equal{' '}
              <Katex tex="h(0)=-1" />, but <Katex tex="\tfrac{1}{0+1}=1" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
